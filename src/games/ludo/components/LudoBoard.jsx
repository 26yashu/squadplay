import { useMemo, useRef, useState, useEffect } from 'react';
import { generatePerimeterPath, generateHomeStretch, generateBasePositions } from '../utils/boardCoordinates';
import { Token } from './Token';
import { Star } from 'lucide-react';

export function LudoBoard({ tokens, legalMoves, onMoveToken }) {
  const containerRef = useRef(null);
  const [boardSize, setBoardSize] = useState(300);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setBoardSize(Math.min(width, height));
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const cellSize = boardSize / 15;

  const perimeterPath = useMemo(() => generatePerimeterPath(), []);
  const homeStretch = useMemo(() => generateHomeStretch(), []);
  const basePositions = useMemo(() => generateBasePositions(), []);

  const safeCells = [0, 8, 13, 21, 26, 34, 39, 47];

  const renderCell = (x, y, colorClass, isSafe = false, isStar = false) => {
    return (
      <rect
        key={`${x}-${y}`}
        x={x * cellSize}
        y={y * cellSize}
        width={cellSize}
        height={cellSize}
        className={`stroke-white/10 stroke-1 ${colorClass}`}
        rx={2}
      />
    );
  };

  // Base background areas
  const bases = [
    { x: 0, y: 0, w: 6, h: 6, color: 'fill-red-500/20 stroke-red-500/50' },
    { x: 9, y: 0, w: 6, h: 6, color: 'fill-green-500/20 stroke-green-500/50' },
    { x: 9, y: 9, w: 6, h: 6, color: 'fill-yellow-400/20 stroke-yellow-500/50' },
    { x: 0, y: 9, w: 6, h: 6, color: 'fill-blue-500/20 stroke-blue-500/50' }
  ];

  return (
    <div ref={containerRef} className="w-full h-full max-w-[500px] max-h-[500px] mx-auto flex items-center justify-center">
      <div 
        className="relative bg-white/5 backdrop-blur-md rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden p-2"
        style={{ width: boardSize + 16, height: boardSize + 16 }} // +16 for padding
      >
        <svg width={boardSize} height={boardSize} className="relative z-0">
          {/* Main 15x15 Grid - just the perimeter and home stretches */}
          {perimeterPath.map((pos, i) => {
            let color = 'fill-black/40';
            if (i === 0) color = 'fill-red-500/30';
            if (i === 13) color = 'fill-green-500/30';
            if (i === 26) color = 'fill-yellow-400/30';
            if (i === 39) color = 'fill-blue-500/30';
            
            return renderCell(pos.x, pos.y, color, safeCells.includes(i), safeCells.includes(i) && ![0, 13, 26, 39].includes(i));
          })}
          
          {/* Stars */}
          {safeCells.map(i => {
             const pos = perimeterPath[i];
             return (
               <Star 
                 key={`star-${i}`} 
                 x={pos.x * cellSize + cellSize/2 - 8} 
                 y={pos.y * cellSize + cellSize/2 - 8} 
                 width={16} 
                 height={16} 
                 className="text-white/30" 
                 strokeWidth={1.5}
               />
             );
          })}

          {/* Home Stretches */}
          {Object.entries(homeStretch).map(([pIdx, path]) => {
             const colors = ['fill-red-500/30', 'fill-green-500/30', 'fill-yellow-400/30', 'fill-blue-500/30'];
             return path.map(pos => renderCell(pos.x, pos.y, colors[pIdx]));
          })}
          
          {/* Bases */}
          {bases.map((b, i) => (
            <rect
              key={`base-${i}`}
              x={b.x * cellSize}
              y={b.y * cellSize}
              width={b.w * cellSize}
              height={b.h * cellSize}
              className={`stroke-2 ${b.color} rx-4`}
              rx={cellSize}
            />
          ))}

          {/* Base Inner Circles */}
          {bases.map((b, i) => (
            <rect
              key={`base-inner-${i}`}
              x={(b.x + 1) * cellSize}
              y={(b.y + 1) * cellSize}
              width={(b.w - 2) * cellSize}
              height={(b.h - 2) * cellSize}
              className="fill-black/20"
              rx={cellSize / 2}
            />
          ))}

          {/* Center Finish */}
          <polygon 
             points={`
               ${6*cellSize},${6*cellSize} 
               ${9*cellSize},${6*cellSize} 
               ${9*cellSize},${9*cellSize} 
               ${6*cellSize},${9*cellSize}
             `}
             className="fill-white/10 stroke-white/20 stroke-1"
          />
          {/* Triangles inside center */}
          <polygon points={`${6*cellSize},${6*cellSize} ${9*cellSize},${6*cellSize} ${7.5*cellSize},${7.5*cellSize}`} className="fill-green-500/30" />
          <polygon points={`${9*cellSize},${6*cellSize} ${9*cellSize},${9*cellSize} ${7.5*cellSize},${7.5*cellSize}`} className="fill-yellow-400/30" />
          <polygon points={`${9*cellSize},${9*cellSize} ${6*cellSize},${9*cellSize} ${7.5*cellSize},${7.5*cellSize}`} className="fill-blue-500/30" />
          <polygon points={`${6*cellSize},${9*cellSize} ${6*cellSize},${6*cellSize} ${7.5*cellSize},${7.5*cellSize}`} className="fill-red-500/30" />
        </svg>

        {/* Tokens Overlay */}
        <div className="absolute top-2 left-2 right-2 bottom-2 pointer-events-none">
          {tokens.map(t => {
            let x = 0; let y = 0;
            let path = undefined;

            const mapLogicalToPixel = (state, position, pIdx, tIdx) => {
              if (state === 'base') return basePositions[pIdx][tIdx];
              if (state === 'active') return perimeterPath[position];
              if (state === 'home_stretch') return homeStretch[pIdx][position];
              if (state === 'finished') return { x: 7.5, y: 7.5 }; // Center
              return undefined;
            };

            const currentPos = mapLogicalToPixel(t.state, t.position, t.playerIndex, t.tokenIndex);
            
            if (!currentPos) {
              console.error(`Invalid token position:\nToken ID: ${t.id}\nPlayer: ${t.playerId}\nPosition: ${t.position}`);
              return null;
            }
            
            x = currentPos.x; y = currentPos.y;

            if (t.logicalPath && t.logicalPath.length > 0) {
              path = t.logicalPath.map(step => mapLogicalToPixel(step.state, step.position, t.playerIndex, t.tokenIndex));
            }

            const isLegal = legalMoves?.some(m => m.tokenId === t.id);

            return (
              <Token 
                key={t.id} 
                token={t} 
                x={x} 
                y={y} 
                path={path}
                cellSize={cellSize}
                boardSize={boardSize}
                isLegalMove={isLegal}
                onClick={() => isLegal && onMoveToken(t.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

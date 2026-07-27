import { motion } from 'framer-motion';

export function Token({ token, x, y, path, boardSize, cellSize, isLegalMove, onClick }) {
  const pixelX = x * cellSize;
  const pixelY = y * cellSize;
  
  // If path is provided, convert logical grid coords to pixel coords
  // Defensive validation:
  let isValidPath = true;
  if (path) {
    for (let p of path) {
      if (!p || typeof p.x !== 'number' || typeof p.y !== 'number') {
        console.error(`Invalid token position:\nToken ID: ${token.id}\nPlayer: ${token.playerId}\nPosition: ${token.position}`);
        isValidPath = false;
        break;
      }
    }
  }

  const animateX = (path && isValidPath) ? path.map(p => p.x * cellSize) : pixelX;
  const animateY = (path && isValidPath) ? path.map(p => p.y * cellSize) : pixelY;
  
  const colors = [
    'bg-red-500 shadow-red-500/50',
    'bg-green-500 shadow-green-500/50',
    'bg-yellow-400 shadow-yellow-500/50',
    'bg-blue-500 shadow-blue-500/50',
  ];
  
  const colorClass = colors[token.playerIndex] || colors[0];
  
  return (
    <motion.div
      layoutId={token.id}
      initial={false}
      animate={{
        x: animateX,
        y: animateY,
        scale: isLegalMove ? 1.1 : 1,
      }}
      transition={{ 
        x: { duration: path ? path.length * 0.15 : 0.3, ease: 'linear' },
        y: { duration: path ? path.length * 0.15 : 0.3, ease: 'linear' },
        scale: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      onClick={isLegalMove ? onClick : undefined}
      className={`absolute w-6 h-6 -ml-3 -mt-3 rounded-full border-2 border-white/80 shadow-lg cursor-${isLegalMove ? 'pointer' : 'default'} ${colorClass} ${isLegalMove ? 'ring-2 ring-white ring-offset-2 ring-offset-black animate-pulse pointer-events-auto' : 'pointer-events-auto'}`}
      style={{ left: cellSize/2, top: cellSize/2, zIndex: isLegalMove ? 50 : 40 }}
    />
  );
}

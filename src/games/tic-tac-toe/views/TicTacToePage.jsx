import { useState } from 'react';
import { useTicTacToe } from '../hooks/useTicTacToe';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { Board } from '../components/Board';
import { PlayerIndicator } from '../components/PlayerIndicator';
import { GameControls } from '../components/GameControls';
import { WinnerModal } from '../components/WinnerModal';
import { ResultsPage } from './ResultsPage';
import { getGameById } from '../../../registry/gameRegistry';

export function TicTacToePage() {
  const game = useTicTacToe();
  const gameConfig = getGameById('tic-tac-toe');
  const [showResults, setShowResults] = useState(false);

  if (game.state === 'idle') {
    return null;
  }

  const handleRestart = () => {
    setShowResults(false);
    game.restart();
  };

  if (showResults) {
    return <ResultsPage 
      winner={game.winner} 
      moves={game.moves} 
      duration={game.duration}
      onRestart={handleRestart} 
    />;
  }

  return (
    <ScreenWrapper className="pb-4 flex flex-col h-full min-h-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-xl">{gameConfig.title}</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center relative">
        <PlayerIndicator player={game.currentPlayer} />
        
        <Board 
          grid={game.grid}
          size={game.boardSize}
          onCellClick={game.makeMove}
          winningLine={game.winningLine}
          disabled={game.state !== 'playing'}
        />

        <GameControls 
          onUndo={game.undo} 
          onRestart={handleRestart}
          canUndo={game.moveHistory && game.moveHistory.length > 0} 
        />
        
        {game.state === 'finished' && (
          <WinnerModal 
            winner={game.winner} 
            onRestart={handleRestart}
            onResults={() => setShowResults(true)}
          />
        )}
      </div>
    </ScreenWrapper>
  );
}

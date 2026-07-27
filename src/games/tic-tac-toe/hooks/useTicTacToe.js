import { useState, useEffect, useRef } from 'react';
import { TicTacToeManager } from '../engine/ticTacToeManager';
import { useGameSession } from '../../../hooks/useGameSession';
import { usePlayers } from '../../../hooks/usePlayers';

export function useTicTacToe() {
  const { session } = useGameSession();
  const { players } = usePlayers();
  
  const [gameState, setGameState] = useState({ state: 'idle' });
  const managerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    const initializeGame = async () => {
      const manager = new TicTacToeManager(session, players);
      manager.onStateChange = (m) => {
        if (!isMounted) return;
        setGameState({
          state: m.state,
          grid: [...m.board.grid],
          boardSize: m.boardSize,
          currentPlayer: m.players[m.currentPlayerIndex],
          winner: m.winner,
          winningLine: m.winningLine,
          moveHistory: [...m.board.moveHistory],
          players: m.players,
          duration: m.endTime ? Math.floor((m.endTime - m.startTime) / 1000) : null,
          moves: m.board.moveHistory.length
        });
      };
      
      managerRef.current = manager;
      await manager.initialize();
    };
    
    initializeGame();
    
    return () => { 
      isMounted = false;
      if (managerRef.current) managerRef.current.destroy();
    };
  }, [session, players]);

  return {
    ...gameState,
    makeMove: (index) => managerRef.current?.makeMove(index),
    undo: () => managerRef.current?.undo(),
    restart: () => managerRef.current?.restart()
  };
}

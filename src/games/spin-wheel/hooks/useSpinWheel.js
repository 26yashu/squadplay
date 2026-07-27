import { useState, useEffect, useRef } from 'react';
import { SpinWheelManager } from '../engine/spinWheelManager';
import { useGameSession } from '../../../hooks/useGameSession';
import { usePlayers } from '../../../hooks/usePlayers';

export function useSpinWheel() {
  const { session } = useGameSession();
  const { players } = usePlayers();
  
  const [gameState, setGameState] = useState({ state: 'idle' });
  const managerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    const initializeGame = async () => {
      const manager = new SpinWheelManager(session, players);
      manager.onStateChange = (m) => {
        if (!isMounted) return;
        setGameState({
          state: m.state,
          items: m.items,
          currentRotation: m.currentRotation,
          lastWinner: m.lastWinner,
          roundsPlayed: m.roundsPlayed,
          maxRounds: m.maxRounds,
          duration: m.physics.duration,
          results: m.state === 'finished' ? m.getResults() : null
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
    spin: () => managerRef.current?.start(),
    nextRound: () => managerRef.current?.nextRound(),
    finish: () => managerRef.current?.finish()
  };
}

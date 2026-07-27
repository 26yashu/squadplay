import { useState, useEffect, useRef } from 'react';
import { TruthOrDareManager } from '../engine/truthOrDareManager';
import { useGameSession } from '../../../hooks/useGameSession';
import { usePlayers } from '../../../hooks/usePlayers';

export function useTruthOrDare() {
  const { session } = useGameSession();
  const { players } = usePlayers();
  
  const [gameState, setGameState] = useState({ state: 'idle' });
  const managerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    const initialize = async () => {
      const manager = new TruthOrDareManager(session, players);
      manager.onStateChange = (m) => {
        if (!isMounted) return;
        setGameState({
          state: m.state,
          currentPlayer: m.currentPlayer,
          currentPrompt: m.currentPrompt,
          currentChoice: m.currentChoice,
          stats: m.stats.getStats(),
          results: m.state === 'finished' ? m.getResults() : null
        });
      };
      
      managerRef.current = manager;
      await manager.loadPrompts();
    };
    
    initialize();
    
    return () => { isMounted = false; };
  }, [session, players]);

  return {
    ...gameState,
    startChoice: () => managerRef.current?.startChoice(),
    selectChoice: (c) => managerRef.current?.selectChoice(c),
    completePrompt: () => managerRef.current?.completePrompt(),
    skipPrompt: () => managerRef.current?.skipPrompt(),
    pause: () => managerRef.current?.pause(),
    resume: () => managerRef.current?.resume(),
    quit: () => managerRef.current?.quit()
  };
}

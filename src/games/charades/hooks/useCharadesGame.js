import { useState, useEffect, useRef } from 'react';
import { CharadesManager } from '../engine/charadesManager';
import { useGameSession } from '../../../hooks/useGameSession';
import { usePlayers } from '../../../hooks/usePlayers';

export function useCharadesGame() {
  const { session } = useGameSession();
  const { players } = usePlayers();
  
  const [gameState, setGameState] = useState({ state: 'idle' });
  const managerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    const initialize = async () => {
      const manager = new CharadesManager(session, players);
      manager.onStateChange = (m) => {
        if (!isMounted) return;
        setGameState({
          state: m.state,
          currentTurn: m.currentTurn,
          currentWord: m.currentWord,
          timeRemaining: Math.ceil(m.timer.timeRemaining / 1000),
          duration: Math.ceil(m.timer.durationMs / 1000),
          turnStats: m.turnStats,
          results: m.state === 'finished' ? m.getResults() : null,
          teamA: m.roundManager.teamA,
          teamB: m.roundManager.teamB,
          mode: m.roundManager.teamsMode
        });
      };
      
      managerRef.current = manager;
      await manager.load();
    };
    
    initialize();
    
    return () => { 
      isMounted = false;
      if (managerRef.current) managerRef.current.timer.stop();
    };
  }, [session, players]);

  return {
    ...gameState,
    startTurn: () => managerRef.current?.startTurn(),
    markCorrect: () => managerRef.current?.markCorrect(),
    passWord: () => managerRef.current?.passWord(),
    pause: () => managerRef.current?.pause(),
    resume: () => managerRef.current?.resume(),
    quit: () => managerRef.current?.quit()
  };
}

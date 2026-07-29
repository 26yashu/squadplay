import { useState, useEffect, useRef, useCallback } from 'react';
import { GameManager } from '../../../engine/quiz';

export function useQuizGame(session, players) {
  const [gameState, setGameState] = useState({ state: 'idle' });
  const gameManagerRef = useRef(null);

  useEffect(() => {
    const manager = new GameManager(session, players);
    manager.onStateChange = (m) => {
      if (gameManagerRef.current && gameManagerRef.current !== m) return;
      
      setGameState({
        state: m.state,
        currentQuestion: m.currentQuestion,
        currentPlayer: m.turnManager?.getCurrentPlayer(),
        questionsAnswered: m.turnManager?.questionsAnsweredByCurrent || 0,
        totalQuestions: m.turnManager?.questionsPerPlayer || 10,
        results: m.state === 'finished' ? m.getResults() : null,
        liveStats: m.scoreManager?.stats || {},
      });
    };
    
    gameManagerRef.current = manager;
    manager.initialize();
    
    return () => {
      gameManagerRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnswer = useCallback((answer, timeMs) => {
    return gameManagerRef.current?.answerCurrent(answer, timeMs);
  }, []);

  const next = useCallback(() => {
    gameManagerRef.current?.next();
  }, []);
  
  const start = useCallback(() => {
    gameManagerRef.current?.start();
  }, []);

  const pause = useCallback(() => {
    gameManagerRef.current?.pause();
  }, []);

  const resume = useCallback(() => {
    gameManagerRef.current?.resume();
  }, []);

  return {
    ...gameState,
    handleAnswer,
    next,
    start,
    pause,
    resume
  };
}

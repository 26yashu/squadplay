import { useState, useEffect, useRef, useCallback } from 'react';
import { QuestionManager, ScoreManager, TurnManager, TimerManager } from '../../../engine/quiz';
import { eventBus } from '../../../events/eventBus';

export function useRapidFireGame(session, players) {
  const [gameState, setGameState] = useState({ state: 'idle' });
  const managersRef = useRef({});
  const getNextQuestionRef = useRef(null);

  const handleTurnEnd = useCallback(() => {
    const { tm, timer, sm } = managersRef.current;
    if (!tm) return;
    
    timer?.stop();
    const isSwitch = tm.nextTurn();
    
    if (tm.isGameOver) {
      const results = sm.getAllResults();
      const topScore = session.mode === 'individual' ? results[0]?.stats?.score : results.stats?.score;
      const isWin = topScore > 0;

      eventBus.publish('GAME_COMPLETED', {
        gameId: 'rapid-fire',
        mode: session.mode,
        results: results,
        isWin,
        winner: isWin ? (session.mode === 'individual' ? results[0].player : 'Squad') : null
      });
      setGameState(s => ({ ...s, state: 'finished', results: results }));
    } else if (isSwitch && session.mode === 'individual') {
      timer?.reset();
      setGameState(s => ({
        ...s,
        state: 'player_transition',
        currentPlayer: tm.getCurrentPlayer(),
        timeRemaining: timer.duration,
        questionsAnswered: 0,
        currentQuestion: null
      }));
    }
  }, [session.mode]);

  useEffect(() => {
    let isMounted = true;
    const initialize = async () => {
      setGameState(s => ({ ...s, state: 'loading' }));
      
      const qm = new QuestionManager();
      try {
        await qm.loadQuestions(session.category, session.difficulty);
      } catch (e) {
        console.error(`[RapidFire] Failed to load data:`, e.message);
        if (isMounted) setGameState(s => ({ ...s, state: 'error' }));
        return;
      }
      if (!isMounted) return;

      const duration = session.timer ? parseInt(session.timer) : 60;
      
      const sm = new ScoreManager(session.mode, players);
      const tm = new TurnManager(session.mode, players, 1);

      // Initialize timer immediately so start() doesn't fail
      const timer = new TimerManager(
        duration,
        (rem) => setGameState(s => ({ ...s, timeRemaining: rem })),
        () => handleTurnEnd()
      );

      managersRef.current = { qm, sm, tm, timer };
      getNextQuestionRef.current = qm.getInfiniteQuestionStream();
      
      setGameState({
        state: 'player_ready',
        currentPlayer: tm.getCurrentPlayer(),
        duration,
        timeRemaining: duration,
        results: null,
        liveStats: sm.stats,
        questionsAnswered: 0,
        currentQuestion: null
      });
    };
    
    initialize();
    
    return () => { 
      isMounted = false; 
      managersRef.current.timer?.stop();
    };
  }, [session, players, handleTurnEnd]);

  const start = useCallback(() => {
    if (!managersRef.current.timer) return;
    const nextQ = getNextQuestionRef.current();
    managersRef.current.timer.start();
    setGameState(s => ({ ...s, state: 'playing', currentQuestion: nextQ }));
  }, []);

  const handleAnswer = useCallback((answer, timeMs) => {
    const { sm, tm } = managersRef.current;
    if (!sm || gameState.state !== 'playing') return false;
    
    const pId = tm.getCurrentPlayer()?.id;
    const isCorrect = answer === gameState.currentQuestion?.correctAnswer;
    
    // Custom Rapid Fire scoring logic
    const targetId = session.mode === 'individual' ? pId : 'squad';
    let newStreak = isCorrect ? (gameState.currentStreak || 0) + 1 : 0;
    let newBestStreak = Math.max(gameState.bestStreak || 0, newStreak);
    
    // Speed Bonus Calculation: 
    // If answered in under 2 seconds, gain bonus points
    let speedBonusPoints = 0;
    if (isCorrect && timeMs < 2000) {
      speedBonusPoints = Math.floor((2000 - timeMs) / 100);
    }
    
    // Base score in ScoreManager
    sm.recordAnswer(pId, isCorrect, timeMs);
    
    // Inject custom stats directly into the score manager stats object
    sm.stats[targetId].bestStreak = newBestStreak;
    sm.stats[targetId].speedBonus = (sm.stats[targetId].speedBonus || 0) + speedBonusPoints;
    sm.stats[targetId].score += speedBonusPoints; // add to actual score
    
    const qAnswered = sm.stats[targetId].correct + sm.stats[targetId].wrong;
    
    setGameState(s => ({ 
      ...s, 
      questionsAnswered: qAnswered,
      currentStreak: newStreak,
      bestStreak: newBestStreak,
      liveStats: { ...sm.stats } 
    }));
    
    return isCorrect;
  }, [gameState.currentQuestion, gameState.state, session.mode, gameState.currentStreak, gameState.bestStreak]);

  const nextQuestion = useCallback(() => {
    if (gameState.state !== 'playing') return;
    const nextQ = getNextQuestionRef.current();
    setGameState(s => ({ ...s, currentQuestion: nextQ }));
  }, [gameState.state]);

  const pause = useCallback(() => {
    if (gameState.state === 'playing') {
      managersRef.current.timer?.stop();
      setGameState(s => ({ ...s, state: 'paused' }));
    }
  }, [gameState.state]);

  const resume = useCallback(() => {
    if (gameState.state === 'paused') {
      managersRef.current.timer?.start();
      setGameState(s => ({ ...s, state: 'playing' }));
    }
  }, [gameState.state]);

  return {
    ...gameState,
    start,
    handleAnswer,
    nextQuestion,
    pause,
    resume
  };
}

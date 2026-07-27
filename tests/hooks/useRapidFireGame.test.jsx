import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useRapidFireGame } from '../../src/games/rapid-fire/hooks/useRapidFireGame';
import { eventBus } from '../../src/events/eventBus';

// Mock engines
vi.mock('../../src/engine/quiz', () => {
  return {
    QuestionManager: class {
      async loadQuestions() {}
      getInfiniteQuestionStream() {
        let i = 0;
        return () => ({ id: i++, prompt: `Q${i}`, correctAnswer: 'A' });
      }
    },
    ScoreManager: class {
      constructor() {
        this.stats = { p1: { score: 0, correct: 0, wrong: 0, speedBonus: 0 } };
      }
      recordAnswer() {
        this.stats.p1.correct++;
        this.stats.p1.score++;
      }
      getAllResults() { return [{ player: { id: 'p1' }, stats: this.stats.p1 }]; }
    },
    TurnManager: class {
      constructor() { this.isGameOver = false; }
      getCurrentPlayer() { return { id: 'p1', name: 'Player 1' }; }
      nextTurn() { this.isGameOver = true; return true; }
    },
    TimerManager: class {
      constructor(duration, onTick, onComplete) {
        this.duration = duration;
        this.onComplete = onComplete;
      }
      start() {}
      stop() {}
      reset() {}
      triggerComplete() { this.onComplete(); }
    }
  };
});

describe('useRapidFireGame', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes game successfully', async () => {
    const { result } = renderHook(() => 
      useRapidFireGame({ mode: 'individual', category: 'general', difficulty: 'easy', timer: 60 }, [{ id: 'p1' }])
    );
    
    expect(result.current.state).toBe('loading');
    
    await waitFor(() => {
      expect(result.current.state).toBe('player_ready');
    });
    
    expect(result.current.currentPlayer).toBeDefined();
    expect(result.current.timeRemaining).toBe(60);
  });

  it('starts game and handles answers', async () => {
    const { result } = renderHook(() => 
      useRapidFireGame({ mode: 'individual', category: 'general', difficulty: 'easy', timer: 60 }, [{ id: 'p1' }])
    );
    
    await waitFor(() => {
      expect(result.current.state).toBe('player_ready');
    });
    
    act(() => {
      result.current.start();
    });
    
    expect(result.current.state).toBe('playing');
    expect(result.current.currentQuestion).toBeDefined();
    
    act(() => {
      result.current.handleAnswer('A', 1000);
    });
    
    expect(result.current.questionsAnswered).toBe(1);
    expect(result.current.currentStreak).toBe(1);
    expect(result.current.bestStreak).toBe(1);
  });
});

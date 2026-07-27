import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useQuizGame } from '../../src/games/quiz-battle/hooks/useQuizGame';
import { eventBus } from '../../src/events/eventBus';
import { GameManager } from '../../src/engine/quiz/gameManager';

vi.mock('../../src/engine/quiz', () => {
  return {
    GameManager: class {
      constructor() {
        this.state = 'idle';
        this.currentQuestion = null;
        this.turnManager = { getCurrentPlayer: () => ({ id: 'p1' }), questionsAnsweredByCurrent: 0, questionsPerPlayer: 10 };
        this.scoreManager = { stats: {} };
      }
      async initialize() {
        this.state = 'loading';
        this.onStateChange(this);
        await Promise.resolve();
        this.state = 'player_ready';
        this.onStateChange(this);
      }
      start() {
        this.state = 'playing';
        this.currentQuestion = { id: 1, prompt: 'Q1', correctAnswer: 'A' };
        this.onStateChange(this);
      }
      answerCurrent(answer, time) {
        return answer === 'A';
      }
      next() {
        this.currentQuestion = { id: 2, prompt: 'Q2', correctAnswer: 'A' };
        this.onStateChange(this);
      }
      quit() {}
      getResults() { return []; }
    }
  };
});

describe('useQuizGame', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes game successfully', async () => {
    const { result } = renderHook(() => 
      useQuizGame({ mode: 'individual', category: 'general', difficulty: 'easy' }, [{ id: 'p1' }])
    );
    
    expect(result.current.state).toBe('loading');
    
    await waitFor(() => {
      expect(result.current.state).toBe('player_ready');
    });
  });

  it('starts game and handles answers', async () => {
    const { result } = renderHook(() => 
      useQuizGame({ mode: 'individual', category: 'general', difficulty: 'easy' }, [{ id: 'p1' }])
    );
    
    await waitFor(() => {
      expect(result.current.state).toBe('player_ready');
    });
    
    act(() => {
      result.current.start();
    });
    
    expect(result.current.state).toBe('playing');
    expect(result.current.currentQuestion).toBeDefined();
    
    let isCorrect;
    act(() => {
      isCorrect = result.current.handleAnswer('A', 1000);
    });
    
    expect(isCorrect).toBe(true);
  });
});

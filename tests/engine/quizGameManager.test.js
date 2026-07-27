import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { GameManager } from '../../src/engine/quiz/gameManager';
import { eventBus } from '../../src/events/eventBus';

vi.mock('../../src/engine/quiz/questionManager', () => {
  return {
    QuestionManager: class {
      async loadQuestions() {}
      getQuestionsForGame(num) {
        return Array(num).fill(0).map((_, i) => ({ id: i, prompt: `Q${i}`, correctAnswer: 'A' }));
      }
    }
  };
});

describe('Quiz GameManager', () => {
  let manager;
  
  beforeEach(() => {
    manager = new GameManager(
      { category: 'general', difficulty: 'easy', mode: 'individual' },
      [{ id: 'p1', name: 'P1' }, { id: 'p2', name: 'P2' }]
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes and moves to player_ready', async () => {
    await manager.initialize();
    expect(manager.state).toBe('player_ready');
    expect(manager.gameQuestions.length).toBeGreaterThan(0);
  });

  it('starts playing', async () => {
    await manager.initialize();
    manager.start();
    expect(manager.state).toBe('playing');
    expect(manager.currentQuestion).toBeDefined();
  });

  it('records correct answer', async () => {
    await manager.initialize();
    manager.start();
    
    const isCorrect = manager.answerCurrent('A', 1000); // 1000ms
    expect(isCorrect).toBe(true);
  });

  it('transitions players correctly', async () => {
    await manager.initialize();
    manager.start();
    
    // Play 10 questions for player 1 (default per player in individual)
    for (let i = 0; i < 10; i++) {
      manager.answerCurrent('A', 1000);
      manager.next();
    }
    
    // Next state should be player_transition since player 1 is done
    expect(manager.state).toBe('player_transition');
    
    // Resume starts player 2
    manager.start();
    expect(manager.state).toBe('playing');
  });
});

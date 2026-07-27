import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { CharadesManager } from '../../src/games/charades/engine/CharadesManager';

vi.mock('../../src/engine/core/dataLoader', () => {
  return {
    DataLoader: class {
      constructor() {}
      async loadData() {
        this.items = [
          { id: '1', word: 'Movie 1' },
          { id: '2', word: 'Movie 2' },
          { id: '3', word: 'Movie 3' },
        ];
        this.activePool = [...this.items];
      }
      getNextItem() {
        return this.activePool.pop();
      }
    }
  };
});

describe('CharadesManager', () => {
  let manager;

  beforeEach(() => {
    manager = new CharadesManager(
      { timePerRound: 30, rounds: 2, category: 'movies', teams: 'ffa' },
      [{ id: 'p1', name: 'Player 1' }, { id: 'p2', name: 'Player 2' }]
    );
    manager.roundManager = {
      getNextTurnInfo: vi.fn().mockReturnValueOnce({ actor: { id: 'p1' } }).mockReturnValueOnce({ actor: { id: 'p2' } }).mockReturnValue(null),
      teamsMode: 'ffa'
    };
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('loads and starts correctly', async () => {
    await manager.load();
    expect(manager.state).toBe('round_start');
    
    manager.startTurn();
    expect(manager.state).toBe('acting');
    expect(manager.currentWord).toBeDefined();
  });

  it('records correct word and fetches next', async () => {
    await manager.load();
    manager.startTurn();
    
    const initialWord = manager.currentWord;
    manager.markCorrect();
    
    expect(manager.turnStats.correct).toBe(1);
    expect(manager.currentWord).not.toBe(initialWord);
  });

  it('expires timer and moves to round_start for next turn', async () => {
    await manager.load();
    manager.startTurn();
    
    vi.advanceTimersByTime(61000); // default timer is 60s without session.timer overrides correctly mapped in ms
    
    expect(manager.state).toBe('round_start');
  });

  it('finishes game after max rounds', async () => {
    await manager.load(); // p1 turn
    manager.startTurn();
    vi.advanceTimersByTime(61000); // Next turn (p2)
    manager.startTurn();
    vi.advanceTimersByTime(61000); // No more turns from mock
    
    expect(manager.state).toBe('finished');
  });
});

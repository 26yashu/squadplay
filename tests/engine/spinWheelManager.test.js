import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SpinWheelManager } from '../../src/games/spin-wheel/engine/SpinWheelManager';
import { DataLoader } from '../../src/engine/core/dataLoader';

vi.mock('../../src/engine/core/dataLoader', () => {
  return {
    DataLoader: class {
      constructor() {}
      async loadData() {
        this.items = [
          { id: '1', title: 'Task 1' },
          { id: '2', title: 'Task 2' },
        ];
        this.activePool = [...this.items];
      }
      getNextItem() {
        return this.activePool.pop();
      }
    }
  };
});

describe('SpinWheelManager', () => {
  let manager;

  beforeEach(() => {
    manager = new SpinWheelManager(
      { rounds: 2, wheelType: 'challenges', category: 'custom' },
      [{ id: 'p1', name: 'P1' }, { id: 'p2', name: 'P2' }]
    );
    manager.physics = {
      calculateSpin: vi.fn().mockReturnValue({ finalAngle: 90, duration: 1000, segmentIndex: 0 })
    };
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('initializes and starts correctly', async () => {
    await manager.initialize();
    expect(manager.items.length).toBeGreaterThan(0);
    
    manager.start();
    expect(manager.state).toBe('spinning');
  });

  it('rejects invalid setup without throwing (it handles in UI or fallback)', () => {
    const mgr = new SpinWheelManager({}, []);
    expect(mgr.state).toBe('idle');
  });

  it('spins and lands on a segment', async () => {
    await manager.initialize();
    manager.start();
    
    expect(manager.state).toBe('spinning');
    
    vi.advanceTimersByTime(1100); // Wait for physics duration (1000)
    
    expect(manager.state).toBe('reveal');
    expect(manager.lastWinner).toBeDefined();
  });

  it('finishes game after max rounds', async () => {
    await manager.initialize();
    
    for (let i = 0; i < 2; i++) {
      manager.start();
      vi.advanceTimersByTime(1100);
      manager.nextRound();
    }
    
    expect(manager.state).toBe('finished');
  });
});

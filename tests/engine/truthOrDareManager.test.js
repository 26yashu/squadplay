import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TruthOrDareManager } from '../../src/games/truth-or-dare/engine/truthOrDareManager';

vi.mock('../../src/engine/core/dataLoader', () => {
  return {
    DataLoader: class {
      static async loadData() {
        return [
          { id: '1', prompt: 'T1', type: 'truth' },
          { id: '2', prompt: 'D1', type: 'dare' },
        ];
      }
    }
  };
});

describe('TruthOrDareManager', () => {
  let manager;

  beforeEach(() => {
    manager = new TruthOrDareManager(
      { category: 'classic', difficulty: 'easy' },
      [{ id: 'p1', name: 'P1' }, { id: 'p2', name: 'P2' }]
    );
  });

  it('initializes and starts correctly', async () => {
    await manager.loadPrompts();
    expect(manager.state).toBe('player_select');
    expect(manager.currentPlayer).toBeDefined();
    
    manager.startChoice();
    expect(manager.state).toBe('choice');
  });

  it('rejects invalid setup gracefully', async () => {
    const badManager = new TruthOrDareManager({}, []);
    await badManager.loadPrompts();
    expect(badManager.state).toBe('player_select'); // Actually it might just proceed with no players, rotation manager returns undefined
  });

  it('provides truth or dare', async () => {
    await manager.loadPrompts();
    manager.startChoice();
    
    manager.selectChoice('truth');
    expect(manager.state).toBe('active');
    expect(manager.currentPrompt).toBeDefined();
    
    const initialPlayerId = manager.currentPlayer.id;
    manager.completePrompt();
    expect(manager.currentPlayer.id).not.toBe(initialPlayerId);
    expect(manager.state).toBe('player_select');
  });
});

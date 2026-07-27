import { describe, it, expect, beforeEach } from 'vitest';
import { TicTacToeManager } from '../../src/games/tic-tac-toe/engine/TicTacToeManager';

describe('TicTacToeManager', () => {
  let manager;

  beforeEach(() => {
    manager = new TicTacToeManager(
      { boardSize: 3, winningLength: 3 },
      [{ id: 'p1', name: 'P1', symbol: 'X' }, { id: 'p2', name: 'P2', symbol: 'O' }]
    );
  });

  it('initializes and starts correctly', () => {
    manager.initialize();
    manager.start();
    
    expect(manager.state).toBe('playing');
    expect(manager.players[0].id).toBe('p1');
    expect(manager.board.grid).toEqual([null, null, null, null, null, null, null, null, null]);
  });

  it('handles invalid setup without crashing', () => {
    const mgr = new TicTacToeManager({}, []);
    expect(mgr.state).toBe('idle');
  });

  it('handles making a move and switching turns', () => {
    manager.initialize();
    manager.start();
    
    const success = manager.makeMove(0); // P1 moves at 0
    expect(success).toBe(true);
    expect(manager.board.grid[0]).toBe('X');
    expect(manager.currentPlayerIndex).toBe(1);
    expect(manager.board.moveHistory.length).toBe(1);
  });

  it('detects a win correctly', () => {
    manager.initialize();
    manager.start();
    
    manager.makeMove(0); // P1
    manager.makeMove(3); // P2
    manager.makeMove(1); // P1
    manager.makeMove(4); // P2
    manager.makeMove(2); // P1 wins row 1
    
    expect(manager.state).toBe('finished');
    expect(manager.winner.id).toBe('p1');
  });

  it('detects a draw correctly', () => {
    manager.initialize();
    manager.start();
    
    // Draw pattern for 3x3:
    manager.makeMove(0); // P1
    manager.makeMove(1); // P2
    manager.makeMove(2); // P1
    manager.makeMove(4); // P2
    manager.makeMove(3); // P1
    manager.makeMove(5); // P2
    manager.makeMove(7); // P1
    manager.makeMove(6); // P2
    manager.makeMove(8); // P1
    
    expect(manager.state).toBe('finished');
    expect(manager.winner).toBe('draw');
  });

  it('restarts correctly', () => {
    manager.initialize();
    manager.start();
    manager.makeMove(0);
    
    manager.restart();
    expect(manager.state).toBe('playing');
    expect(manager.board.grid[0]).toBe(null);
  });
});

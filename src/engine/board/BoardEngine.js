export class BoardEngine {
  constructor(size = 3) {
    this.size = size;
    // We represent the grid as a 1D array for simplicity
    this.grid = Array(size * size).fill(null);
    this.moveHistory = [];
    this.status = 'idle'; // idle, playing, finished
  }

  initialize() {
    this.grid = Array(this.size * this.size).fill(null);
    this.moveHistory = [];
    this.status = 'playing';
  }

  isValidMove(index) {
    return this.status === 'playing' && index >= 0 && index < this.grid.length && this.grid[index] === null;
  }

  makeMove(index, symbol) {
    if (!this.isValidMove(index)) return false;
    
    this.grid[index] = symbol;
    this.moveHistory.push({ index, symbol });
    
    return true;
  }

  undoMove() {
    if (this.moveHistory.length === 0) return false;
    
    const lastMove = this.moveHistory.pop();
    this.grid[lastMove.index] = null;
    
    // If the game was finished, undoing resumes it
    if (this.status === 'finished') {
      this.status = 'playing';
    }
    
    return true;
  }

  isFull() {
    return this.moveHistory.length === this.grid.length;
  }

  getGrid2D() {
    const grid2D = [];
    for (let i = 0; i < this.size; i++) {
      grid2D.push(this.grid.slice(i * this.size, i * this.size + this.size));
    }
    return grid2D;
  }

  serialize() {
    return {
      size: this.size,
      grid: this.grid,
      moveHistory: this.moveHistory,
      status: this.status
    };
  }

  deserialize(data) {
    this.size = data.size;
    this.grid = [...data.grid];
    this.moveHistory = [...data.moveHistory];
    this.status = data.status;
  }
}

import { shuffleArray } from '../../../engine/core/randomManager';

export class RotationManager {
  constructor(players, mode = 'sequential') {
    this.players = players;
    this.mode = mode; // 'sequential' or 'random'
    this.currentIndex = -1;
    this.randomPool = [];
    this.currentPlayer = null;
  }

  getNextPlayer() {
    if (this.players.length === 0) return null;
    
    if (this.mode === 'sequential') {
      this.currentIndex = (this.currentIndex + 1) % this.players.length;
      this.currentPlayer = this.players[this.currentIndex];
      return this.currentPlayer;
    } else {
      if (this.randomPool.length === 0) {
        this.randomPool = shuffleArray(this.players);
        // Avoid same player twice in a row if possible
        if (this.randomPool.length > 1 && this.currentPlayer?.id === this.randomPool[0].id) {
          this.randomPool.push(this.randomPool.shift());
        }
      }
      this.currentPlayer = this.randomPool.shift();
      return this.currentPlayer;
    }
  }
}

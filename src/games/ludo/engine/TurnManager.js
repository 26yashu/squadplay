export class TurnManager {
  constructor(players) {
    this.players = players;
    this.turnIndex = 0;
    this.finishedPlayers = new Set();
  }

  getCurrentPlayer() {
    return this.players[this.turnIndex];
  }

  markPlayerFinished(playerId) {
    this.finishedPlayers.add(playerId);
  }

  nextTurn() {
    if (this.isGameOver()) return;
    
    let nextIdx = (this.turnIndex + 1) % this.players.length;
    while (this.finishedPlayers.has(this.players[nextIdx].id) && !this.isGameOver()) {
      nextIdx = (nextIdx + 1) % this.players.length;
    }
    
    this.turnIndex = nextIdx;
    return this.getCurrentPlayer();
  }

  isGameOver() {
    return this.finishedPlayers.size >= this.players.length - 1;
  }
}

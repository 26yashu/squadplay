export class TurnManager {
  constructor(mode, players, questionsPerPlayer = 10) {
    this.mode = mode;
    this.players = players;
    this.questionsPerPlayer = questionsPerPlayer;
    
    this.currentPlayerIndex = 0;
    this.questionsAnsweredByCurrent = 0;
    this.isGameOver = false;
  }

  getCurrentPlayer() {
    if (this.mode === 'individual') {
      return this.players[this.currentPlayerIndex];
    }
    return null; // squad mode is collaborative
  }

  nextTurn() {
    this.questionsAnsweredByCurrent++;

    if (this.mode === 'individual') {
      if (this.questionsAnsweredByCurrent >= this.questionsPerPlayer) {
        this.currentPlayerIndex++;
        this.questionsAnsweredByCurrent = 0;
        
        if (this.currentPlayerIndex >= this.players.length) {
          this.isGameOver = true;
        }
        return true; // Indicates player transition or game over
      }
    } else {
      // Squad mode
      if (this.questionsAnsweredByCurrent >= this.questionsPerPlayer) {
        this.isGameOver = true;
      }
    }
    
    return false; // No transition needed
  }
}

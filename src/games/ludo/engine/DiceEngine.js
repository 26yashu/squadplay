export class DiceEngine {
  constructor() {
    this.history = [];
    this.consecutiveSixes = 0;
  }

  roll() {
    // Generate a random number between 1 and 6
    const result = Math.floor(Math.random() * 6) + 1;
    
    this.history.push(result);
    
    if (result === 6) {
      this.consecutiveSixes++;
    } else {
      this.consecutiveSixes = 0;
    }
    
    let penalty = false;
    if (this.consecutiveSixes === 3) {
      penalty = true;
      this.consecutiveSixes = 0; // Reset after penalty
    }

    return { result, penalty, consecutiveSixes: this.consecutiveSixes };
  }

  resetStreak() {
    this.consecutiveSixes = 0;
  }
}

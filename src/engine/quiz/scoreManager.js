export class ScoreManager {
  constructor(mode, players) {
    this.mode = mode;
    this.players = players;
    
    // individual: { [playerId]: { score, correct, wrong, times: [] } }
    // squad: { squad: { score, correct, wrong, times: [] } }
    this.stats = {};
    
    if (mode === 'individual') {
      players.forEach(p => {
        this.stats[p.id] = { score: 0, correct: 0, wrong: 0, times: [], currentCombo: 0, highestCombo: 0, fastestAnswer: Infinity };
      });
    } else {
      this.stats['squad'] = { score: 0, correct: 0, wrong: 0, times: [], currentCombo: 0, highestCombo: 0, fastestAnswer: Infinity };
    }
  }

  recordAnswer(playerId, isCorrect, responseTimeMs) {
    const targetId = this.mode === 'individual' ? playerId : 'squad';
    const target = this.stats[targetId];
    if (!target) return;
    
    if (isCorrect) {
      // Base points + speed bonus
      target.score += 100 + Math.max(0, 50 - Math.floor(responseTimeMs / 100)); 
      target.correct += 1;
      target.currentCombo += 1;
      if (target.currentCombo > target.highestCombo) target.highestCombo = target.currentCombo;
      if (responseTimeMs < target.fastestAnswer) target.fastestAnswer = responseTimeMs;
    } else {
      target.wrong += 1;
      target.currentCombo = 0;
    }
    
    target.times.push(responseTimeMs);
  }

  getStats(playerId) {
    const targetId = this.mode === 'individual' ? playerId : 'squad';
    const stat = this.stats[targetId];
    if (!stat) return null;
    
    const total = stat.correct + stat.wrong;
    const accuracy = total > 0 ? Math.round((stat.correct / total) * 100) : 0;
    const avgTime = stat.times.length > 0 
      ? Math.round(stat.times.reduce((a, b) => a + b, 0) / stat.times.length) 
      : 0;
      
    return {
      ...stat,
      accuracy,
      avgTime
    };
  }
  
  getAllResults() {
    if (this.mode === 'individual') {
      return this.players.map(p => ({
        player: p,
        stats: this.getStats(p.id)
      })).sort((a, b) => b.stats.score - a.stats.score);
    } else {
      return {
        stats: this.getStats('squad')
      };
    }
  }
}

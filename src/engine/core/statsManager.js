export class StatsManager {
  constructor(storageKey = null) {
    this.storageKey = storageKey;
    this.stats = this.loadStats();
  }

  loadStats() {
    if (!this.storageKey) return {};
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveStats() {
    if (this.storageKey) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.stats));
    }
  }

  increment(key, amount = 1) {
    this.stats[key] = (this.stats[key] || 0) + amount;
    this.saveStats();
  }

  set(key, value) {
    this.stats[key] = value;
    this.saveStats();
  }
  
  max(key, value) {
    this.stats[key] = Math.max(this.stats[key] || 0, value);
    this.saveStats();
  }
  
  min(key, value) {
    this.stats[key] = Math.min(this.stats[key] === undefined ? Infinity : this.stats[key], value);
    this.saveStats();
  }

  getStats() {
    // Dynamic calculations
    const truths = this.stats.truthsCompleted || 0;
    const dares = this.stats.daresCompleted || 0;
    const skips = this.stats.skips || 0;
    const total = truths + dares + skips;
    
    let completionRate = 0;
    if (total > 0) {
      completionRate = Math.round(((truths + dares) / total) * 100);
    }

    const wins = this.stats.wins || 0;
    const losses = this.stats.losses || 0;
    const draws = this.stats.draws || 0;
    const gamesPlayed = this.stats.gamesPlayed || (wins + losses + draws);
    const winRate = gamesPlayed > 0 ? Math.round((wins / gamesPlayed) * 100) : 0;
    
    const accuracy = this.stats.accuracy || 0;
    const totalPlayTime = this.stats.totalPlayTime || 0;
    const longestStreak = this.stats.longestStreak || 0;
    const currentStreak = this.stats.currentStreak || 0;

    return { 
      ...this.stats, 
      completionRate,
      winRate,
      gamesPlayed,
      accuracy,
      totalPlayTime,
      longestStreak,
      currentStreak
    };
  }

  // Legacy support
  recordAction(type, completed) {
    this.increment('turnsPlayed');
    if (completed) {
      if (type === 'truth') this.increment('truthsCompleted');
      if (type === 'dare') this.increment('daresCompleted');
      if (type === 'spins') this.increment('spins');
      if (type === 'round_complete') this.increment('roundsPlayed');
      this.increment('currentStreak');
      this.max('longestStreak', this.stats.currentStreak);
    } else {
      this.increment('skips');
      this.set('currentStreak', 0);
    }
  }
}

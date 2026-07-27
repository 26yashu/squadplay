import { BaseStorage } from './baseStorage';
import { eventBus } from '../events/eventBus';

const INITIAL_STATS = {
  gamesPlayed: 0,
  wins: 0,
  losses: 0,
  draws: 0,
  longestStreak: 0,
  currentStreak: 0,
  perfectGames: 0,
  playTime: 0, // minutes
};

class StatsStorage extends BaseStorage {
  constructor() {
    super('squadplay_stats', INITIAL_STATS, 1);
    
    eventBus.subscribe('GAME_COMPLETED', (data) => {
      this.recordMatchStats(data);
    });
  }

  recordMatchStats(data) {
    const stats = { ...this.data };
    stats.gamesPlayed++;
    
    if (data.isWin) {
      stats.wins++;
      stats.currentStreak++;
      stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
    } else if (data.isLoss) {
      stats.losses++;
      stats.currentStreak = 0;
    } else if (data.isDraw) {
      stats.draws++;
      stats.currentStreak = 0;
    }

    if (data.isPerfect) {
      stats.perfectGames++;
    }

    if (data.duration) {
      stats.playTime += Math.round(data.duration / 60);
    }

    this.save(stats);
  }
  
  increment(key, amount = 1) {
    const stats = { ...this.data };
    stats[key] = (stats[key] || 0) + amount;
    this.save(stats);
  }
}

export const statsStorage = new StatsStorage();

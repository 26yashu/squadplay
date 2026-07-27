import { BaseStorage } from './baseStorage';
import { eventBus } from '../events/eventBus';
import { xpEngine } from '../engine/core/xpEngine';
import { getGameById } from '../registry/gameRegistry';

const INITIAL_XP = {
  totalXp: 0,
  level: 1,
  dailyXp: 0,
  lastPlayedDate: new Date().toDateString()
};

class XpStorage extends BaseStorage {
  constructor() {
    super('squadplay_xp', INITIAL_XP, 1);
    
    eventBus.subscribe('XP_EARNED', ({ amount, reason }) => {
      this.addXp(amount, reason);
    });

    eventBus.subscribe('GAME_COMPLETED', (data) => {
      const game = getGameById(data.gameId);
      if (game && game.xpRewards) {
        if (data.isWin && game.xpRewards.win) {
          this.addXp(game.xpRewards.win, 'win');
        } else if (game.xpRewards.play) {
          this.addXp(game.xpRewards.play, 'play');
        }
      }
    });
  }

  addXp(amount, reason) {
    const today = new Date().toDateString();
    let currentDaily = this.data.dailyXp;
    
    if (this.data.lastPlayedDate !== today) {
      currentDaily = 0;
    }

    const newTotal = (this.data.totalXp || 0) + amount;
    const newDaily = currentDaily + amount;
    
    // Check level up
    const newLevel = xpEngine.calculateLevel(newTotal);
    const leveledUp = newLevel > this.data.level;

    this.save({
      totalXp: newTotal,
      level: newLevel,
      dailyXp: newDaily,
      lastPlayedDate: today
    });

    if (leveledUp) {
      eventBus.publish('LEVEL_UP', { newLevel, totalXp: newTotal });
    }
  }
}

export const xpStorage = new XpStorage();

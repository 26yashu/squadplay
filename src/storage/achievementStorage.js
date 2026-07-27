import { BaseStorage } from './baseStorage';

class AchievementStorage extends BaseStorage {
  constructor() {
    super('squadplay_achievements', { unlocked: [], progress: {} }, 1);
  }

  unlock(id) {
    if (!this.data.unlocked.includes(id)) {
      this.save({
        ...this.data,
        unlocked: [...this.data.unlocked, id]
      });
      return true;
    }
    return false;
  }

  updateProgress(id, amount) {
    const current = this.data.progress[id] || 0;
    this.save({
      ...this.data,
      progress: {
        ...this.data.progress,
        [id]: current + amount
      }
    });
  }
}

export const achievementStorage = new AchievementStorage();

import { eventBus } from '../events/eventBus';
import { soundManager } from '../audio/SoundManager';
import { hapticsManager } from '../haptics/HapticsManager';

class NotificationManager {
  constructor() {
    this.queue = [];
    this.active = false;
    this.onNotification = () => {};
    this.initialized = false;
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;
    eventBus.subscribe('ACHIEVEMENT_UNLOCKED', (data) => {
      this.queueNotification({
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: data.title,
        icon: data.icon,
        duration: 4000
      });
    });

    eventBus.subscribe('DAILY_LOGIN_REWARD', (data) => {
      this.queueNotification({
        type: 'success',
        title: 'Daily Login Reward!',
        message: `+${data.xpAwarded} XP (${data.streak} Day Streak 🔥)`,
        duration: 5000
      });
    });

    eventBus.subscribe('MISSION_COMPLETED', (data) => {
      this.queueNotification({
        type: 'success',
        title: 'Mission Completed!',
        message: `${data.title} (+${data.xpReward} XP)`,
        duration: 4000
      });
    });
  }

  queueNotification(notification) {
    this.queue.push({ id: Date.now() + Math.random(), ...notification });
    this.processQueue();
  }

  processQueue() {
    if (this.active || this.queue.length === 0) return;
    this.active = true;
    const next = this.queue.shift();
    
    // Play sounds/haptics based on type
    if (next.type === 'achievement') {
      soundManager.playAchievement();
      hapticsManager.playAchievement();
    } else if (next.type === 'error') {
      soundManager.playError();
      hapticsManager.playError();
    } else if (next.type === 'success' || next.type === 'xp') {
      soundManager.playSuccess();
      hapticsManager.playSuccess();
    } else {
      soundManager.playClick();
    }

    this.onNotification(next, () => {
      this.active = false;
      this.processQueue();
    });
  }
}

export const notificationManager = new NotificationManager();

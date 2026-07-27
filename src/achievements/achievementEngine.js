import { eventBus } from '../events/eventBus';
import { ACHIEVEMENTS } from './achievementRegistry';
import { hasAchievement, saveUnlockedAchievement } from './achievementStorage';

class AchievementEngine {
  constructor() {
    this.initialized = false;
  }

  initialize(statsManager) {
    if (this.initialized) return;
    this.initialized = true;
    this.statsManager = statsManager;

    // Listen to ALL events (eventBus was modified to publish everything to 'ANY')
    eventBus.subscribe('ANY', (eventPayload) => {
      this.evaluateAchievements(eventPayload.type, eventPayload.data);
    });
  }

  evaluateAchievements(eventType, data) {
    const stats = this.statsManager ? this.statsManager.getStats() : {};
    
    ACHIEVEMENTS.forEach(achievement => {
      if (!hasAchievement(achievement.id)) {
        try {
          if (achievement.condition(eventType, data, stats)) {
            this.unlockAchievement(achievement);
          }
        } catch (e) {
          console.error(`Error evaluating achievement ${achievement.id}:`, e);
        }
      }
    });
  }

  unlockAchievement(achievement) {
    saveUnlockedAchievement(achievement.id);
    
    // Notify the UI/EventBus
    eventBus.publish('ACHIEVEMENT_UNLOCKED', {
      id: achievement.id,
      title: achievement.title,
      description: achievement.description,
      icon: achievement.icon
    });
  }
}

export const achievementEngine = new AchievementEngine();

// Hack the eventBus to route all events to 'ANY' as well
const originalPublish = eventBus.publish.bind(eventBus);
eventBus.publish = (event, data = {}) => {
  originalPublish(event, data);
  if (event !== 'ANY' && event !== 'ACHIEVEMENT_UNLOCKED') {
    originalPublish('ANY', { type: event, data });
  }
};

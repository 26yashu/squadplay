import { BaseStorage } from './baseStorage';
import { eventBus } from '../events/eventBus';
import { xpStorage } from './xpStorage';

const INITIAL_PROFILE = {
  name: 'Player 1',
  avatar: 'user', // default icon
  preferredColor: 'text-hyper-pink',
  favoriteGame: null,
  recentMatches: [],
  joinedAt: new Date().toISOString(),
  lastLoginDate: null,
  currentStreak: 0,
  longestLoginStreak: 0,
};

class ProfileStorage extends BaseStorage {
  constructor() {
    super('squadplay_profile', INITIAL_PROFILE, 1);
  }

  updateProfile(updates) {
    const newData = { ...this.data, ...updates };
    this.save(newData);
    eventBus.publish('PROFILE_UPDATED', newData);
  }

  addRecentMatch(matchId) {
    const matches = [matchId, ...(this.data.recentMatches || [])].slice(0, 10);
    this.updateProfile({ recentMatches: matches });
  }

  processDailyLogin() {
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = this.data.lastLoginDate;

    if (lastLogin === today) return false; // Already logged in today

    let newStreak = 1;
    if (lastLogin) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastLogin === yesterday) {
        newStreak = (this.data.currentStreak || 0) + 1;
      }
    }

    const longestStreak = Math.max(newStreak, this.data.longestLoginStreak || 0);

    this.updateProfile({
      lastLoginDate: today,
      currentStreak: newStreak,
      longestLoginStreak: longestStreak
    });

    // Award Daily XP
    const streakBonus = Math.min(newStreak * 10, 100);
    const dailyXp = 50 + streakBonus;
    xpStorage.addXp(dailyXp, 'DAILY_LOGIN');

    eventBus.publish('DAILY_LOGIN_REWARD', { xpAwarded: dailyXp, streak: newStreak });

    return { streak: newStreak, xpAwarded: dailyXp };
  }
}

export const profileStorage = new ProfileStorage();

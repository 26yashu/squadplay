import { profileStorage } from '../storage/profileStorage';
import { xpStorage } from '../storage/xpStorage';
import { leaderboardStorage } from '../storage/leaderboardStorage';
import { historyStorage } from '../storage/historyStorage';
import * as achievementStorage from '../achievements/achievementStorage';
import { getSettings, saveSettings } from '../storage/settingsStorage';

export const exportData = () => {
  const data = {
    profile: profileStorage.data,
    xp: xpStorage.data,
    leaderboard: leaderboardStorage.data,
    history: historyStorage.data,
    achievements: achievementStorage.getUnlockedAchievements(),
    settings: getSettings()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `squadplay_backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importData = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validation check
        if (!data || typeof data !== 'object') throw new Error('Invalid backup file');
        
        if (data.profile) localStorage.setItem('squadplay_profile', JSON.stringify(data.profile));
        if (data.xp) localStorage.setItem('squadplay_xp', JSON.stringify(data.xp));
        if (data.leaderboard) localStorage.setItem('squadplay_leaderboard', JSON.stringify(data.leaderboard));
        if (data.history) localStorage.setItem('squadplay_history', JSON.stringify(data.history));
        if (data.achievements) localStorage.setItem('squadplay_achievements', JSON.stringify(data.achievements));
        if (data.settings) saveSettings(data.settings);
        
        resolve(true);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

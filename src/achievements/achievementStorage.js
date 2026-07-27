const STORAGE_KEY = 'squadplay_achievements';

let cachedAchievements = null;

export const getUnlockedAchievements = () => {
  if (cachedAchievements) return cachedAchievements;
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    cachedAchievements = data ? JSON.parse(data) : [];
    return cachedAchievements;
  } catch (e) {
    console.error('Failed to parse achievements:', e);
    return [];
  }
};

export const saveUnlockedAchievement = (id) => {
  try {
    const unlocked = getUnlockedAchievements();
    if (!unlocked.includes(id)) {
      unlocked.push(id);
      cachedAchievements = unlocked;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
    }
  } catch (e) {
    console.error('Failed to save achievement:', e);
  }
};

export const hasAchievement = (id) => {
  return getUnlockedAchievements().includes(id);
};

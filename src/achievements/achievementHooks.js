import { useState, useEffect } from 'react';
import { getUnlockedAchievements } from './achievementStorage';
import { ACHIEVEMENTS } from './achievementRegistry';
import { eventBus } from '../events/eventBus';

export function useAchievements() {
  const [unlocked, setUnlocked] = useState(getUnlockedAchievements());

  useEffect(() => {
    const unsubscribe = eventBus.subscribe('ACHIEVEMENT_UNLOCKED', (data) => {
      setUnlocked(prev => [...prev, data.id]);
    });
    return unsubscribe;
  }, []);

  const unlockedDetails = ACHIEVEMENTS.filter(a => unlocked.includes(a.id));
  const lockedDetails = ACHIEVEMENTS.filter(a => !unlocked.includes(a.id));

  return {
    unlocked,
    unlockedDetails,
    lockedDetails
  };
}

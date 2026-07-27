export class XPEngine {
  constructor() {
    this.BASE_XP = 100;
    this.MULTIPLIER = 1.5;
  }

  calculateLevel(totalXp) {
    // Formula: level = Math.floor(sqrt(totalXp / 50)) + 1
    // e.g. 50 XP -> Lvl 2. 200 XP -> Lvl 3. 450 XP -> Lvl 4.
    if (totalXp < 0) return 1;
    return Math.floor(Math.sqrt(totalXp / 50)) + 1;
  }

  xpForNextLevel(currentLevel) {
    return Math.pow(currentLevel, 2) * 50;
  }

  xpForCurrentLevel(currentLevel) {
    if (currentLevel <= 1) return 0;
    return Math.pow(currentLevel - 1, 2) * 50;
  }

  getProgress(totalXp) {
    const level = this.calculateLevel(totalXp);
    const currentLevelXp = this.xpForCurrentLevel(level);
    const nextLevelXp = this.xpForNextLevel(level);
    
    const xpInThisLevel = totalXp - currentLevelXp;
    const requiredForNext = nextLevelXp - currentLevelXp;
    
    const percentage = requiredForNext === 0 ? 100 : (xpInThisLevel / requiredForNext) * 100;
    
    return {
      level,
      totalXp,
      xpInThisLevel,
      requiredForNext,
      percentage: Math.min(Math.max(percentage, 0), 100)
    };
  }
}

export const xpEngine = new XPEngine();

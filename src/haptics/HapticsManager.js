class HapticsManager {
  constructor() {
    this.enabled = true; // Will be synced with AppConfig
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  _vibrate(pattern) {
    if (!this.enabled) return;
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      try {
        window.navigator.vibrate(pattern);
      } catch (e) {
        // Ignore, some browsers might block it without user interaction
      }
    }
  }

  playClick() {
    this._vibrate(10);
  }

  playSuccess() {
    this._vibrate([30, 50, 30]);
  }

  playError() {
    this._vibrate([50, 100, 50]);
  }

  playAchievement() {
    this._vibrate([30, 50, 30, 50, 50]);
  }

  playCountdown() {
    this._vibrate(20);
  }
}

export const hapticsManager = new HapticsManager();

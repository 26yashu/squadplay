class SoundManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true; // Will be synced with AppConfig
  }

  init() {
    if (!this.audioContext && window.AudioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  setEnabled(enabled) {
    this.enabled = enabled;
  }

  _playTone(freq, type, duration, vol = 0.1) {
    if (!this.enabled) return;
    this.init();
    if (!this.audioContext) return;
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(vol, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playClick() {
    this._playTone(400, 'sine', 0.1, 0.05);
  }

  playSuccess() {
    this._playTone(600, 'sine', 0.1, 0.1);
    setTimeout(() => this._playTone(800, 'sine', 0.2, 0.1), 100);
  }

  playError() {
    this._playTone(300, 'square', 0.1, 0.05);
    setTimeout(() => this._playTone(250, 'square', 0.2, 0.05), 100);
  }

  playCountdown() {
    this._playTone(440, 'sine', 0.1, 0.1);
  }

  playTimerEnd() {
    this._playTone(880, 'sine', 0.5, 0.15);
  }

  playAchievement() {
    this._playTone(523.25, 'sine', 0.1, 0.1); // C5
    setTimeout(() => this._playTone(659.25, 'sine', 0.1, 0.1), 100); // E5
    setTimeout(() => this._playTone(783.99, 'sine', 0.3, 0.1), 200); // G5
  }

  playLevelUp() {
    this.playAchievement();
    setTimeout(() => this._playTone(1046.50, 'sine', 0.4, 0.1), 350); // C6
  }
}

export const soundManager = new SoundManager();

// Handles audio playback with graceful fallback to silence
export class AudioManager {
  constructor() {
    this.sounds = {};
    this.enabled = true; // Could be hooked into global settings
    this.audioContext = null;
    
    // Attempt to preload sounds, fail silently
    this.loadSound('roll', '/audio/ludo/dice-roll.mp3');
    this.loadSound('move', '/audio/ludo/token-move.mp3');
    this.loadSound('capture', '/audio/ludo/capture.mp3');
    this.loadSound('win', '/audio/ludo/win.mp3');
    this.loadSound('button', '/audio/ludo/button.mp3');
  }

  loadSound(key, url) {
    try {
      const audio = new Audio(url);
      audio.preload = 'auto';
      
      // Catch load errors so it doesn't crash
      audio.onerror = () => {
        // console.warn(`Failed to load audio: ${url}`);
      };
      
      this.sounds[key] = audio;
    } catch (e) {
      // Ignore
    }
  }

  setMuted(isMuted) {
    this.enabled = !isMuted;
  }

  play(key) {
    if (!this.enabled) return;
    
    try {
      const sound = this.sounds[key];
      if (sound) {
        // Clone node to allow overlapping playback (e.g. rapid token steps)
        const clone = sound.cloneNode();
        clone.volume = 0.5; // Default volume
        const playPromise = clone.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play policy blocked, or file missing
            // Fail silently
          });
        }
      }
    } catch (e) {
      // Graceful failure
    }
  }
}

export const ludoAudio = new AudioManager();

export class TimerManager {
  constructor(durationSeconds, onTick, onComplete) {
    this.duration = durationSeconds;
    this.remaining = durationSeconds;
    this.onTick = onTick;
    this.onComplete = onComplete;
    this.interval = null;
  }
  
  start() {
    if (this.interval) clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.remaining--;
      if (this.onTick) this.onTick(this.remaining);
      
      if (this.remaining <= 0) {
        this.stop();
        if (this.onComplete) this.onComplete();
      }
    }, 1000);
  }
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  
  reset() {
    this.stop();
    this.remaining = this.duration;
  }
}

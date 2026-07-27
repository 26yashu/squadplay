export class Timer {
  constructor(durationMs, tickMs = 1000) {
    this.durationMs = durationMs;
    this.tickMs = tickMs;
    this.timeRemaining = durationMs;
    this.intervalId = null;
    this.onTick = () => {};
    this.onComplete = () => {};
  }
  
  start() {
    if (this.intervalId) return;
    this.timeRemaining = this.durationMs;
    this.resume();
  }
  
  resume() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => {
      this.timeRemaining -= this.tickMs;
      if (this.timeRemaining <= 0) {
        this.timeRemaining = 0;
        this.stop();
        this.onComplete();
      } else {
        this.onTick(this.timeRemaining);
      }
    }, this.tickMs);
  }
  
  pause() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  stop() {
    this.pause();
    this.timeRemaining = this.durationMs;
  }
}

import { GameEngine } from '../../../engine/core/GameEngine';
import { DataLoader } from '../../../engine/core/dataLoader';
import { WheelPhysics } from './wheelPhysics';
import { StatsManager } from '../../../engine/core/statsManager';
import { eventBus } from '../../../events/eventBus';

export class SpinWheelManager extends GameEngine {
  constructor(session, players) {
    super();
    this.session = session;
    this.players = players;
    
    this.stats = new StatsManager();
    // Default physics for Spin Wheel
    this.physics = new WheelPhysics({ duration: 5000, minSpins: 4, maxSpins: 10 });
    this.dataLoader = new DataLoader('spin-wheel', session.category || 'custom', 'none');
    
    this.state = 'idle'; // idle, loading, ready, spinning, reveal, finished
    this.items = [];
    
    // Wheel state
    this.currentRotation = 0;
    this.lastWinner = null;
    
    this.roundsPlayed = 0;
    this.maxRounds = session.rounds || 5;

    this.onStateChange = () => {};
  }
  
  async initialize() {
    this.state = 'loading';
    this.notify();
    
    if (this.session.wheelType === 'player') {
      // Create wheel directly from players
      this.items = this.players.map((p, i) => ({
        id: p.id,
        text: p.name,
        color: `hsl(${(i * 360) / this.players.length}, 70%, 60%)`
      }));
      this.state = 'ready';
      this.notify();
    } else {
      try {
        await this.dataLoader.loadData();
        this.items = [...this.dataLoader.items];
        // Generate colors if missing
        this.items.forEach((item, i) => {
          if (!item.color) {
            item.color = `hsl(${(i * 360) / this.items.length}, 70%, 60%)`;
          }
        });
        this.state = 'ready';
        this.notify();
      } catch (e) {
        console.error(`[SpinWheelManager] Failed to load data:`, e.message);
        this.state = 'error';
        this.notify();
      }
    }
  }
  
  start() {
    // This is the trigger to spin
    if (this.state !== 'ready') return;
    
    const { finalAngle, duration, segmentIndex } = this.physics.calculateSpin(this.items.length, this.currentRotation);
    
    this.currentRotation = finalAngle;
    this.state = 'spinning';
    this.notify();
    
    this.stats.recordAction('spins', true);
    
    // Wait for physics animation to complete
    setTimeout(() => {
      this.lastWinner = this.items[segmentIndex];
      this.state = 'reveal';
      this.roundsPlayed++;
      
      // Add points if it's a player wheel
      if (this.session.wheelType === 'player' && this.lastWinner) {
        const player = this.players.find(p => p.id === this.lastWinner.id);
        if (player) {
          player.score = (player.score || 0) + 1;
        }
      }
      
      this.stats.recordAction('round_complete', true);
      this.notify();
    }, duration);
  }
  
  nextRound() {
    // Prevent duplicates by removing the last winner
    if (this.lastWinner && this.items.length > 1) {
      this.items = this.items.filter(i => i.id !== this.lastWinner.id);
      // Re-adjust colors
      this.items.forEach((item, i) => {
        item.color = `hsl(${(i * 360) / this.items.length}, 70%, 60%)`;
      });
    }

    if (this.roundsPlayed >= this.maxRounds || this.items.length === 0) {
      this.finish();
    } else {
      this.state = 'ready';
      this.lastWinner = null;
      this.notify();
    }
  }

  finish() {
    if (this.state === 'finished') return;
    this.state = 'finished';
    eventBus.publish('GAME_COMPLETED', {
      gameId: 'spin-wheel',
      mode: this.session.wheelType,
      results: this.getResults(),
      isWin: true // always grant play XP for finishing
    });
    this.notify();
  }
  
  pause() {}
  resume() {}
  restart() {}
  save() {}
  load() {}
  destroy() {}

  getResults() {
    return {
      stats: this.stats.getStats(),
      roundsPlayed: this.roundsPlayed
    };
  }

  notify() {
    this.onStateChange(this);
  }
}

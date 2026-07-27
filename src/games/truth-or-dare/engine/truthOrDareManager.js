import { shuffleArray } from '../../../engine/core/randomManager';
import { StatsManager } from '../../../engine/core/statsManager';
import { RotationManager } from './rotationManager';
import { DataLoader } from '../../../engine/core/dataLoader';
import { eventBus } from '../../../events/eventBus';


export class TruthOrDareManager {
  constructor(session, players) {
    this.session = session;
    this.players = players;
    
    this.stats = new StatsManager();
    this.rotation = new RotationManager(players, session.rotation || 'sequential');
    
    this.pools = { truth: [], dare: [] };
    this.activePools = { truth: [], dare: [] };
    
    this.state = 'idle'; // loading, player_select, choice, active, paused, finished
    this.currentPlayer = null;
    this.currentPrompt = null;
    this.currentChoice = null;
    this.onStateChange = () => {};
  }
  
  async loadPrompts() {
    this.state = 'loading';
    this.notify();
    
    const pack = this.session.category || 'classic';
    const diff = (this.session.difficulty || 'Medium').toLowerCase();

    try {
      const data = await DataLoader.loadData({
        game: 'truth-or-dare',
        category: pack,
        difficulty: diff,
        allowDuplicates: false
      });
      
      this.pools.truth = data.filter(item => item.type === 'truth');
      this.pools.dare = data.filter(item => item.type === 'dare');
      
    } catch (e) {
      console.error(`[TruthOrDareManager] Failed to load prompts:`, e.message);
      this.state = 'error';
      this.notify();
      return;
    }
    
    this.activePools.truth = shuffleArray([...this.pools.truth]);
    this.activePools.dare = shuffleArray([...this.pools.dare]);
    
    this.nextPlayer();
  }
  
  nextPlayer() {
    this.currentPlayer = this.rotation.getNextPlayer();
    this.currentPrompt = null;
    this.currentChoice = null;
    this.state = 'player_select';
    this.notify();
  }

  startChoice() {
    this.state = 'choice';
    this.notify();
  }
  
  selectChoice(choice) {
    this.currentChoice = choice;
    
    if (this.activePools[choice].length === 0) {
      this.activePools[choice] = shuffleArray([...this.pools[choice]]);
    }
    
    this.currentPrompt = this.activePools[choice].pop();
    this.state = 'active';
    this.notify();
  }
  
  completePrompt() {
    this.stats.recordAction(this.currentChoice, true);
    this.nextPlayer();
  }
  
  skipPrompt() {
    this.stats.recordAction(this.currentChoice, false);
    this.nextPlayer();
  }
  
  pause() {
    this.state = 'paused';
    this.notify();
  }
  
  resume() {
    this.state = this.currentPrompt ? 'active' : (this.currentPlayer ? 'choice' : 'player_select');
    this.notify();
  }
  
  quit() {
    this.finish();
  }

  finish() {
    if (this.state === 'finished') return;
    this.state = 'finished';
    
    eventBus.publish('GAME_COMPLETED', {
      gameId: 'truth-or-dare',
      mode: this.session.mode || 'individual',
      results: this.getResults(),
      isWin: true // Party games always grant XP for completion
    });
    
    this.notify();
  }

  getResults() {
    return this.stats.getStats();
  }

  notify() {
    this.onStateChange(this);
  }
}

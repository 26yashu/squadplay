import { DataLoader } from '../../../engine/core/dataLoader';
import { RoundManager } from './roundManager';
import { StatsManager } from '../../../engine/core/statsManager';
import { Timer } from '../../../engine/core/timer';
import { eventBus } from '../../../events/eventBus';

export class CharadesManager {
  constructor(session, players) {
    this.session = session;
    this.players = players;
    
    this.stats = new StatsManager();
    this.roundManager = new RoundManager(players, session.teams || 'ffa', session.rounds || 3);
    this.wordLoader = new DataLoader('charades', session.category || 'mixed', session.difficulty);
    // session.timer is typically round time in seconds, we need ms
    this.timer = new Timer((session.timer || 60) * 1000, 1000);
    
    this.state = 'idle'; // loading, round_start, acting, paused, finished
    this.currentTurn = null;
    this.currentWord = null;
    
    this.turnStats = { correct: 0, passed: 0 };
    
    this.timer.onTick = (ms) => this.notify();
    this.timer.onComplete = () => {
      this.state = 'round_start';
      this.stats.recordAction('time_up', false);
      this.setupNextTurn();
    };

    this.onStateChange = () => {};
  }
  
  async load() {
    this.state = 'loading';
    this.notify();
    try {
      await this.wordLoader.loadData();
      this.setupNextTurn();
    } catch (e) {
      console.error(`[CharadesManager] Failed to load data:`, e.message);
      this.state = 'error';
      this.notify();
    }
  }

  
  setupNextTurn() {
    const turn = this.roundManager.getNextTurnInfo();
    if (!turn) {
      this.finish();
      return;
    }
    
    this.currentTurn = turn;
    this.turnStats = { correct: 0, passed: 0 };
    this.state = 'round_start';
    this.notify();
  }
  
  startTurn() {
    this.currentWord = this.wordLoader.getNextItem();
    this.state = 'acting';
    this.timer.start();
    this.notify();
  }
  
  markCorrect() {
    this.stats.recordAction('correct', true);
    this.turnStats.correct++;
    
    if (this.currentTurn.team) {
      this.currentTurn.team.score++;
    } else {
      this.currentTurn.actor.score = (this.currentTurn.actor.score || 0) + 1;
    }
    
    this.currentWord = this.wordLoader.getNextItem();
    this.notify();
  }
  
  passWord() {
    this.stats.recordAction('passed', false);
    this.turnStats.passed++;
    this.currentWord = this.wordLoader.getNextItem();
    this.notify();
  }
  
  pause() {
    if (this.state === 'acting') {
      this.timer.pause();
      this.state = 'paused';
      this.notify();
    }
  }
  
  resume() {
    if (this.state === 'paused') {
      this.timer.resume();
      this.state = 'acting';
      this.notify();
    }
  }
  
  quit() {
    this.timer.stop();
    this.finish();
  }

  finish() {
    if (this.state === 'finished') return;
    this.state = 'finished';
    
    const results = this.getResults();
    let topScore = 0;
    let winner = null;
    if (this.roundManager.teamsMode === 'teams') {
       if (this.roundManager.teamA.score > this.roundManager.teamB.score) { winner = 'Team A'; topScore = this.roundManager.teamA.score; }
       else if (this.roundManager.teamB.score > this.roundManager.teamA.score) { winner = 'Team B'; topScore = this.roundManager.teamB.score; }
    } else {
       const sorted = [...this.players].sort((a,b) => (b.score||0) - (a.score||0));
       topScore = sorted[0]?.score || 0;
       winner = sorted[0];
    }
    const isWin = topScore > 0;
    
    eventBus.publish('GAME_COMPLETED', {
      gameId: 'charades',
      mode: this.roundManager.teamsMode,
      results,
      isWin,
      winner: isWin ? winner : null
    });
    this.notify();
  }

  getResults() {
    return {
      stats: this.stats.getStats(),
      players: this.players,
      teamA: this.roundManager.teamA,
      teamB: this.roundManager.teamB,
      mode: this.roundManager.teamsMode
    };
  }

  notify() {
    this.onStateChange(this);
  }
}

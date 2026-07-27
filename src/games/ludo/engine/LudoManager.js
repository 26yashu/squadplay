import { TokenEngine } from './TokenEngine';
import { DiceEngine } from './DiceEngine';
import { TurnManager } from './TurnManager';
import { WinDetector } from './WinDetector';
import { eventBus } from '../../../events/eventBus';

import { BotEngine } from './BotEngine';
import { ludoAudio } from './AudioManager';

const ENABLE_GAMEPLAY = true;
const ENABLE_XP = true;
const ENABLE_AI = true;

export class LudoManager {
  constructor(session, players) {
    this.session = session;
    this.players = players;
    
    this.tokenEngine = new TokenEngine(players);
    this.diceEngine = new DiceEngine();
    this.turnManager = new TurnManager(players);
    this.winDetector = new WinDetector(players);
    this.botEngine = new BotEngine(this);
    
    this.state = 'idle'; // idle, rolling, moving, finished
    this.currentRoll = null;
    this.legalMoves = [];
    this.stats = this.initializeStats();
    
    this.startTime = Date.now();
    this.totalTurns = 0;
    
    this.onStateChange = () => {};
    
    this._botTimer = null;
    this._timeouts = new Set();
    this.isDestroyed = false;
  }

  initializeStats() {
    const stats = {};
    this.players.forEach(p => {
      stats[p.id] = { captures: 0, finished: 0, score: 0 };
    });
    return stats;
  }

  start() {
    if (this.state === 'idle') {
      this.state = 'rolling';
      this.notify();
      
      if (ENABLE_AI && this.turnManager.getCurrentPlayer().isBot) {
        this._botTimer = this._setTimeout(() => {
          this.rollDice();
        }, Math.random() * 300 + 500);
      }
    }
  }

  rollDice() {
    if (this.state !== 'rolling') return;
    
    this._clearTimeout(this._botTimer);
    ludoAudio.play('roll');
    
    const currentPlayer = this.turnManager.getCurrentPlayer();
    const { result, penalty, consecutiveSixes } = this.diceEngine.roll();
    this.currentRoll = { result, consecutiveSixes };
    
    if (!ENABLE_GAMEPLAY) {
      // Just visually roll the dice and end turn immediately
      this.state = 'moving';
      this.notify();
      this._setTimeout(() => {
        this.endTurn();
      }, 1000);
      return;
    }

    if (penalty) {
      // 3 sixes = loose turn
      this.endTurn();
      return;
    }
    
    this.legalMoves = this.tokenEngine.getLegalMoves(currentPlayer.id, result);
    
    if (this.legalMoves.length === 0) {
      // No legal moves, turn ends after short delay for UI
      this.state = 'moving';
      this.notify();
      
      this._setTimeout(() => {
        this.endTurn();
      }, 1000);
    } else {
      this.state = 'moving';
      this.notify();
      
      if (ENABLE_AI && currentPlayer.isBot) {
        this.triggerBotMove();
      }
    }
  }

  triggerBotMove() {
    const currentPlayer = this.turnManager.getCurrentPlayer();
    const bestTokenId = this.botEngine.getOptimalMove(currentPlayer, this.legalMoves, this.currentRoll.result);
    
    // Simulate thinking time
    this._botTimer = this._setTimeout(() => {
      if (bestTokenId) {
        this.moveToken(bestTokenId);
      }
    }, 600);
  }

  moveToken(tokenId) {
    if (!ENABLE_GAMEPLAY) return;
    if (this.state !== 'moving') return;
    const isLegal = this.legalMoves.find(m => m.tokenId === tokenId);
    if (!isLegal) return;
    
    const currentPlayer = this.turnManager.getCurrentPlayer();
    const { success, capture, finished } = this.tokenEngine.moveToken(tokenId, this.currentRoll.result);
    
    if (success) {
      ludoAudio.play('move');
      this.totalTurns++;

      if (capture) {
        ludoAudio.play('capture');
        this.stats[currentPlayer.id].captures += capture.length;
        this.stats[currentPlayer.id].score += capture.length * 50;
      }
      
      if (finished) {
        this.stats[currentPlayer.id].finished++;
        this.stats[currentPlayer.id].score += 100;
        
        const hasWon = this.winDetector.recordFinishedToken(currentPlayer.id);
        if (hasWon) {
          ludoAudio.play('win');
          this.turnManager.markPlayerFinished(currentPlayer.id);
          this.stats[currentPlayer.id].score += 500; // Win bonus
        }
      }
      
      this.legalMoves = [];
      this.notify();
      
      const animationDuration = (this.currentRoll.result * 150) + 200;

      // Delay to let animation finish before deciding next turn
      this._setTimeout(() => {
        if (this.winDetector.getRankings().length >= this.players.length - 1) {
          this.finishGame();
        } else if (this.currentRoll.result === 6 || capture || finished) {
          // Extra turn!
          this.state = 'rolling';
          this.notify();
        } else {
          this.endTurn();
        }
      }, animationDuration); // Dynamic buffer based on steps
    }
  }

  endTurn() {
    this.diceEngine.resetStreak();
    this.currentRoll = null;
    
    if (!this.turnManager.isGameOver()) {
      this.turnManager.nextTurn();
      this.state = 'rolling';
      this.notify();
      
      if (ENABLE_AI && this.turnManager.getCurrentPlayer().isBot) {
        this._botTimer = this._setTimeout(() => {
          this.rollDice();
        }, Math.random() * 300 + 500); // 500-800ms bot delay
      }
    } else {
      this.finishGame();
    }
  }

  finishGame() {
    this.state = 'finished';
    
    // Auto-finish the last player
    const lastPlayer = this.players.find(p => !this.winDetector.hasPlayerWon(p.id));
    if (lastPlayer) {
      this.winDetector.rankings.push(lastPlayer.id);
    }
    
    const results = this.winDetector.getRankings().map(pid => {
      const p = this.players.find(x => x.id === pid);
      return {
        player: p,
        stats: this.stats[pid]
      };
    });
    
    this.results = results;
    
    if (!ENABLE_XP) {
      this.notify();
      return;
    }

    eventBus.publish('GAME_COMPLETED', {
      gameId: 'ludo',
      mode: this.session.mode,
      results,
      isWin: true, // Assuming someone won
      winner: results[0].player,
      duration: Math.round((Date.now() - this.startTime) / 1000),
      totalTurns: this.totalTurns
    });
    
    this.notify();
  }

  notify() {
    this.onStateChange(this);
  }

  _setTimeout(fn, delay) {
    if (this.isDestroyed) return null;
    const id = setTimeout(() => {
      this._timeouts.delete(id);
      if (!this.isDestroyed) fn();
    }, delay);
    this._timeouts.add(id);
    return id;
  }

  _clearTimeout(id) {
    clearTimeout(id);
    if (id) this._timeouts.delete(id);
  }

  destroy() {
    if (this.isDestroyed) return;
    this.isDestroyed = true;
    this.state = 'idle';
    this.onStateChange = () => {};
    
    this._clearTimeout(this._botTimer);
    this._timeouts.forEach(id => clearTimeout(id));
    this._timeouts.clear();
  }
}

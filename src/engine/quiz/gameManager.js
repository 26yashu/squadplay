import { QuestionManager } from './questionManager';
import { ScoreManager } from './scoreManager';
import { TurnManager } from './turnManager';
import { eventBus } from '../../events/eventBus';

export class GameManager {
  constructor(session, players) {
    this.session = session;
    this.players = players;
    
    this.questionManager = new QuestionManager();
    
    this.state = 'idle'; // idle, loading, player_ready, playing, player_transition, paused, finished
    this.currentQuestion = null;
    this.gameQuestions = [];
    this.questionQueueIndex = 0;
    
    this.onStateChange = () => {};
  }

  async initialize() {
    this.state = 'loading';
    this.notify();
    
    // 4. Validate all session values before using them
    const category = this.session?.category || 'general';
    const difficulty = this.session?.difficulty || 'easy';
    
    try {
      await this.questionManager.loadQuestions(category, difficulty);
      
      let totalQuestions = 10;
      if (this.session?.mode === 'squad') {
        const pCount = Array.isArray(this.players) ? this.players.length : 0;
        if (pCount === 3) totalQuestions = 15;
        if (pCount >= 4) totalQuestions = 20;
      }
      
      this.scoreManager = new ScoreManager(this.session.mode, this.players);
      this.turnManager = new TurnManager(this.session.mode, this.players, totalQuestions);
      
      const requiredQuestions = this.session.mode === 'individual' ? totalQuestions * this.players.length : totalQuestions;
      this.gameQuestions = this.questionManager.getQuestionsForGame(requiredQuestions);
      this.questionQueueIndex = 0;
      
      this.state = 'player_ready';
      this.notify();
    } catch (e) {
      console.error(`[GameManager] Failed to load data:`, e.message);
      this.state = 'error';
      this.notify();
    }
  }

  start() {
    // 5. Add defensive guards inside GameManager.start()
    if (this.state !== 'player_ready' && this.state !== 'loading' && this.state !== 'player_transition') return;
    
    this.nextQuestion();
    this.state = 'playing';
    this.notify();
  }

  answerCurrent(answer, timeMs) {
    if (this.state !== 'playing' || !this.currentQuestion) return false;
    
    const isCorrect = answer === this.currentQuestion.correctAnswer;
    const pId = this.turnManager.getCurrentPlayer()?.id;
    
    this.scoreManager.recordAnswer(pId, isCorrect, timeMs);
    
    return isCorrect;
  }

  next() {
    if (this.state === 'finished') return;
    
    const isPlayerSwitch = this.turnManager.nextTurn();
    const isOutOfQuestions = this.questionQueueIndex >= this.gameQuestions.length;
    
    if (this.turnManager.isGameOver || isOutOfQuestions) {
      this.finish();
      return;
    }
    
    if (isPlayerSwitch && this.session.mode === 'individual') {
      this.state = 'player_transition';
      this.notify();
      return;
    }
    
    this.nextQuestion();
    this.notify();
  }

  finish() {
    if (this.state === 'finished') return;
    
    if (import.meta.env.DEV) {
      console.log(`Final score calculated. Winner determined. Results created. Navigating to Results`);
    }
    this.state = 'finished';
    
    const results = this.scoreManager.getAllResults();
    const topScore = this.session.mode === 'individual' ? results[0]?.stats?.score : results.stats?.score;
    const isWin = topScore > 0;
    
    eventBus.publish('GAME_COMPLETED', {
      gameId: 'quiz-battle',
      mode: this.session.mode,
      results,
      isWin,
      winner: isWin ? (this.session.mode === 'individual' ? results[0].player : 'Squad') : null
    });
    
    this.notify();
  }

  quit() {
    this.finish();
  }

  nextQuestion() {
    // 5. Add defensive guards inside nextQuestion()
    // 3. If no questions exist, gracefully return an Empty State instead of crashing.
    if (!this.gameQuestions || !Array.isArray(this.gameQuestions) || this.gameQuestions.length === 0) {
      this.currentQuestion = null;
      return;
    }

    // 1. Prevent any index from ever becoming NaN
    let idx = Number(this.questionQueueIndex);
    if (isNaN(idx)) {
      idx = 0;
    }

    // 2. We should never hit this due to isOutOfQuestions check in next(), but just in case
    if (idx >= this.gameQuestions.length) {
      this.currentQuestion = null;
      return;
    }

    this.currentQuestion = this.gameQuestions[idx];
    this.questionQueueIndex = idx + 1;
  }

  getResults() {
    return this.scoreManager.getAllResults();
  }
  
  pause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      this.notify();
    }
  }
  
  resume() {
    if (this.state === 'paused') {
      this.state = 'playing';
      this.notify();
    }
  }

  notify() {
    this.onStateChange(this);
  }
}

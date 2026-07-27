import { GameEngine } from '../../../engine/core/GameEngine';
import { BoardEngine } from '../../../engine/board/BoardEngine';
import { WinDetector } from './winDetector';
import { StatsManager } from '../../../engine/core/statsManager';
import { eventBus } from '../../../events/eventBus';

export class TicTacToeManager extends GameEngine {
  constructor(session, players) {
    super();
    this.session = session;
    this.boardSize = parseInt(session.boardSize) || 3;
    this.winningLength = parseInt(session.winningLength) || this.boardSize;

    // The user selects the symbol for player 1 during setup (session.symbol)
    const p1Symbol = session.symbol || 'X';
    const p2Symbol = p1Symbol === 'X' ? 'O' : 'X';
    
    this.players = [
      { ...players[0], symbol: p1Symbol },
      { ...players[1], symbol: p2Symbol }
    ];
    
    this.board = new BoardEngine(this.boardSize);
    this.stats = new StatsManager();
    
    this.state = 'idle'; // idle, playing, finished
    this.currentPlayerIndex = 0;
    
    this.winner = null;
    this.winningLine = null;
    this.startTime = null;
    this.endTime = null;
    
    this.onStateChange = () => {};
  }
  
  async initialize() {
    this.board.initialize();
    this.state = 'playing';
    this.currentPlayerIndex = 0;
    this.winner = null;
    this.winningLine = null;
    this.startTime = Date.now();
    this.endTime = null;
    eventBus.publish('GAME_STARTED', { game: 'tic-tac-toe' });
    this.notify();
  }
  
  start() {
    this.initialize();
  }
  
  makeMove(index) {
    if (this.state !== 'playing') return false;
    
    const currentPlayer = this.players[this.currentPlayerIndex];
    // Symbol is assigned during setup, e.g., 'X' or 'O'
    const symbol = currentPlayer.symbol || (this.currentPlayerIndex === 0 ? 'X' : 'O');
    
    if (this.board.makeMove(index, symbol)) {
      this.checkGameState();
      if (this.state === 'playing') {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
      }
      this.notify();
      return true;
    }
    return false;
  }
  
  checkGameState() {
    const winResult = WinDetector.checkWin(this.board.grid, this.boardSize, this.winningLength);
    
    if (winResult) {
      this.winningLine = winResult.line;
      this.winner = this.players.find(p => p.symbol === winResult.symbol || (p.symbol === undefined && ((winResult.symbol === 'X' && this.players.indexOf(p) === 0) || (winResult.symbol === 'O' && this.players.indexOf(p) === 1))));
      this.finish(true, false);
      return;
    }
    
    if (this.board.isFull()) {
      this.winner = 'draw';
      this.finish(false, true);
    }
  }

  undo() {
    if ((this.state !== 'playing' && this.state !== 'finished') || this.board.moveHistory.length === 0) return;
    this.board.undoMove();
    this.state = 'playing';
    this.winner = null;
    this.winningLine = null;
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    this.notify();
  }
  
  pause() {}
  resume() {}
  
  restart() {
    this.initialize();
  }

  finish(isWin = false, isDraw = false) {
    if (this.state === 'finished') return;
    this.state = 'finished';
    this.endTime = Date.now();
    const duration = Math.floor((this.endTime - this.startTime) / 1000);
    const moves = this.board.moveHistory.length;

    // Track xp and achievements by letting the system know we finished
    eventBus.publish('GAME_COMPLETED', {
      gameId: 'tic-tac-toe',
      winner: this.winner,
      isWin,
      isDraw,
      duration,
      moves
    });

    this.notify();
  }
  
  save() {}
  load() {}
  destroy() {
    this.state = 'idle';
  }

  notify() {
    this.onStateChange(this);
  }
}

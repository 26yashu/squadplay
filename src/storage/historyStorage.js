import { BaseStorage } from './baseStorage';
import { eventBus } from '../events/eventBus';

class HistoryStorage extends BaseStorage {
  constructor() {
    super('squadplay_history', { matches: [] }, 1);

    eventBus.subscribe('GAME_COMPLETED', (data) => {
      this.addMatch({
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
        gameId: data.gameId,
        winner: data.winner || null,
        score: data.score || 0,
        players: data.players || [],
        mode: data.mode || 'classic',
        duration: data.duration || 0, // seconds
      });
    });
  }

  addMatch(match) {
    const matches = [match, ...this.data.matches].slice(0, 100); // Keep last 100
    this.save({ matches });
    eventBus.publish('MATCH_FINISHED', match);
  }
  
  getRecentMatches(limit = 5) {
    return this.data.matches.slice(0, limit);
  }
}

export const historyStorage = new HistoryStorage();

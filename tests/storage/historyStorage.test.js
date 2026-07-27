import { describe, it, expect, beforeEach } from 'vitest';
import { historyStorage } from '../../src/storage/historyStorage';

describe('historyStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    historyStorage.data.matches = [];
  });

  it('handles empty local storage gracefully', () => {
    const history = historyStorage.get().matches;
    expect(history).toEqual([]);
  });

  it('recovers from corrupted JSON', () => {
    localStorage.setItem('squadplay_history', 'undefined_or_bad_json');
    const history = historyStorage.load().matches;
    expect(history).toEqual([]);
  });

  it('adds a new match to history', () => {
    historyStorage.addMatch({
      gameId: 'quiz-battle',
      players: ['P1', 'P2'],
      winner: 'P1',
      duration: 30
    });

    const history = historyStorage.get().matches;
    expect(history.length).toBe(1);
    expect(history[0].gameId).toBe('quiz-battle');
    expect(history[0].winner).toBe('P1');
  });

  it('clears history correctly', () => {
    historyStorage.addMatch({ gameId: 'rapid-fire' });
    expect(historyStorage.get().matches.length).toBe(1);

    historyStorage.save({ matches: [] });
    expect(historyStorage.get().matches.length).toBe(0);
  });
});

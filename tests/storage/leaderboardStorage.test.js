import { describe, it, expect, beforeEach, vi } from 'vitest';
import { leaderboardStorage } from '../../src/storage/leaderboardStorage';
import { profileStorage } from '../../src/storage/profileStorage';
import { xpStorage } from '../../src/storage/xpStorage';

vi.mock('../../src/storage/profileStorage', () => ({
  profileStorage: { get: () => ({ name: 'TestUser', avatar: '👾' }) }
}));

vi.mock('../../src/storage/xpStorage', () => ({
  xpStorage: { get: () => ({ totalXp: 99999 }) }
}));

describe('leaderboardStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('combines mock players and local user, sorts by xp', () => {
    const board = leaderboardStorage.getOverallLeaderboard();
    expect(board.length).toBeGreaterThan(0);
    expect(board[0].id).toBe('local_user');
    expect(board[0].name).toBe('TestUser');
    expect(board[0].xp).toBe(99999);
    expect(board[0].rank).toBe(1);
  });

  it('recovers from corrupted JSON and still returns board', () => {
    localStorage.setItem('squadplay_leaderboard', '{invalid-json');
    const board = leaderboardStorage.getOverallLeaderboard();
    expect(board.length).toBeGreaterThan(0);
  });

  it('calculates local user rank correctly', () => {
    const rank = leaderboardStorage.getLocalUserRank();
    expect(rank).toBe(1); // Because they have 99999 XP
  });
});

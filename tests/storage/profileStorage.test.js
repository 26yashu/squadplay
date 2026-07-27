import { describe, it, expect, beforeEach, vi } from 'vitest';
import { profileStorage } from '../../src/storage/profileStorage';

vi.mock('../../src/storage/xpStorage', () => ({
  xpStorage: { addXp: vi.fn() }
}));

describe('profileStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    profileStorage.data = { ...profileStorage.initialData };
  });

  it('provides a default profile if local storage is empty', () => {
    const profile = profileStorage.get();
    expect(profile.name).toBe('Player 1');
    expect(profile.avatar).toBe('user');
  });

  it('recovers from corrupted JSON', () => {
    localStorage.setItem('squadplay_profile', 'invalid}{');
    const profile = profileStorage.load();
    expect(profile.name).toBe('Player 1'); // defaults
  });

  it('updates profile fields', () => {
    profileStorage.updateProfile({ name: 'ProGamer', avatar: '😎' });
    const profile = profileStorage.get();
    expect(profile.name).toBe('ProGamer');
    expect(profile.avatar).toBe('😎');
  });

  it('processes daily login correctly', () => {
    const result = profileStorage.processDailyLogin();
    expect(result.streak).toBe(1);
    expect(result.xpAwarded).toBe(60); // 50 base + 10 streak
    
    // Attempt second time same day
    const result2 = profileStorage.processDailyLogin();
    expect(result2).toBe(false);
  });
});

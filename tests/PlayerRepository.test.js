import { describe, it, expect, beforeEach } from 'vitest';
import { playerRepository } from '../src/repositories/PlayerRepository';

describe('PlayerRepository', () => {
  beforeEach(async () => {
    localStorage.clear();
    await playerRepository.clear();
  });

  it('should get default profile initially', async () => {
    const profile = await playerRepository.get();
    expect(profile.name).toBe('Player 1');
    expect(profile.avatar).toBe('user');
    expect(profile.currentStreak).toBe(0);
  });

  it('should update profile', async () => {
    const profile = await playerRepository.get();
    profile.name = 'Alice';
    profile.avatar = '😎';
    await playerRepository.save(profile);

    const savedData = await playerRepository.get();
    expect(savedData.name).toBe('Alice');
    expect(savedData.avatar).toBe('😎');
  });

  it('should clear profile correctly', async () => {
    const profile = await playerRepository.get();
    profile.name = 'Bob';
    await playerRepository.save(profile);
    
    await playerRepository.clear();
    const clearedData = await playerRepository.get();
    expect(clearedData.name).toBe('Player 1');
  });
});

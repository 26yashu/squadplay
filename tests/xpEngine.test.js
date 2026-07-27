import { describe, it, expect, beforeEach } from 'vitest';
import { xpEngine } from '../src/engine/core/xpEngine';
import { xpStorage } from '../src/storage/xpStorage';

describe('xpEngine', () => {
  beforeEach(() => {
    localStorage.clear();
    xpStorage.save(xpStorage.initialData);
  });

  it('should initialize with default data', () => {
    const data = xpEngine.getProgress(0);
    expect(data.level).toBe(1);
    expect(data.totalXp).toBe(0);
    expect(data.xpInThisLevel).toBe(0);
  });

  it('should add XP and calculate progress correctly', () => {
    const data = xpEngine.getProgress(500);
    expect(data.totalXp).toBe(500);
    expect(data.level).toBe(4); 
  });

  it('should get correct XP for next level', () => {
    const required = xpEngine.xpForNextLevel(1);
    expect(required).toBe(50);
  });
});

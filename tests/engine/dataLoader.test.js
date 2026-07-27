import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DataLoader } from '../../src/engine/core/dataLoader';

describe('DataLoader', () => {
  let mockFetch;

  beforeEach(() => {
    mockFetch = vi.fn();
    global.fetch = mockFetch;
    
    // Clear global state to ensure tests are isolated
    // We will reset the module cache for this file if needed, 
    // but we can just use new categories to bypass cache
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('loads and caches datasets successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 'q1', prompt: 'test?' }, { id: 'q2', prompt: 'test 2?' }]
    });

    const data = await DataLoader.loadData({ game: 'quiz', category: 'general123' });
    expect(data.length).toBe(2);
    expect(mockFetch).toHaveBeenCalledTimes(1);

    // Second load should use cache, but since allowDuplicates is false by default, it will be exhausted
    const data2 = await DataLoader.loadData({ game: 'quiz', category: 'general123' });
    // When consumedIds exhausts the list, it resets, returning 2 items again
    expect(data2.length).toBe(2); 
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('throws on duplicate IDs in dataset', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 'dup', prompt: 'a' }, { id: 'dup', prompt: 'b' }]
    });

    await expect(DataLoader.loadData({ game: 'quiz', category: 'dups' }))
      .rejects.toThrow(/Duplicate ID/);
  });

  it('throws on missing text field', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: '1', missing: 'text' }]
    });

    await expect(DataLoader.loadData({ game: 'quiz', category: 'invalid' }))
      .rejects.toThrow(/Missing primary text field/);
  });

  it('throws on empty array', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    await expect(DataLoader.loadData({ game: 'quiz', category: 'empty' }))
      .rejects.toThrow(/completely empty/);
  });

  it('filters by difficulty', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: '1', prompt: 'a', difficulty: 'easy' },
        { id: '2', prompt: 'b', difficulty: 'hard' }
      ]
    });

    const data = await DataLoader.loadData({ game: 'quiz', category: 'diff', difficulty: 'easy' });
    expect(data.length).toBe(1);
    expect(data[0].id).toBe('1');
  });
});

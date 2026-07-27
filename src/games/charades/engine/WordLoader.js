import { shuffleArray } from '../../../engine/core/randomManager';

export class WordLoader {
  constructor(pack, difficulty) {
    this.pack = pack;
    this.difficulty = difficulty?.toLowerCase();
    this.words = [];
    this.activePool = [];
  }

  async load() {
    try {
      const response = await fetch(`/data/charades/${this.pack}/words.json`);
      if (!response.ok) throw new Error('Pack not found');
      const data = await response.json();
      
      let filtered = data;
      if (this.difficulty) {
        filtered = data.filter(w => !w.difficulty || w.difficulty.toLowerCase() === this.difficulty);
        if (filtered.length === 0) filtered = data;
      }
      this.words = filtered;
    } catch (e) {
      console.warn(`Falling back to mock data for ${this.pack}.`);
      this.words = Array.from({ length: 30 }).map((_, i) => ({
        id: `${this.pack}-${i}`,
        word: `Mock ${this.pack} ${i + 1}`,
        difficulty: this.difficulty || 'medium',
        category: this.pack,
        tags: ['mock']
      }));
    }
    
    this.activePool = shuffleArray([...this.words]);
  }

  getNextWord() {
    if (this.activePool.length === 0) {
      this.activePool = shuffleArray([...this.words]);
    }
    return this.activePool.pop();
  }
}

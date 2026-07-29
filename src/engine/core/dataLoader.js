import { shuffleArray } from './randomManager';

const globalCache = new Map();
const consumedIds = new Set();

class DataLoaderError extends Error {
  constructor(message) {
    super(message);
    this.name = "DataLoaderError";
  }
}

export class DataLoader {
  constructor(gameId, category, difficulty) {
    this.gameId = gameId;
    this.category = category;
    this.difficulty = difficulty?.toLowerCase();
    this.items = [];
    this.activePool = [];
  }

  static async loadData({ game, category, difficulty, limit, allowDuplicates = false }) {
    if (game === 'quiz') game = 'quiz-battle';
    
    let folder = game;
    if (game === 'quiz-battle' || game === 'rapid-fire') folder = 'quiz';

    let catFileName = 'general';
    if (category && category !== 'any' && category !== 'mixed' && category !== 'custom') {
      catFileName = category.toLowerCase().replace(/\s+/g, '-');
    } else {
      if (folder === 'charades') catFileName = 'movies';
      if (folder === 'spin-wheel') catFileName = 'challenges';
      if (folder === 'truth-or-dare') catFileName = 'classic';
      if (folder === 'quiz') catFileName = 'general';
    }
    
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    let fetchPath = `${baseUrl}${import.meta.env.BASE_URL || '/'}data/${folder}/${catFileName}.json`.replace(/([^:]\/)\/+/g, "$1");
    let cacheKey = `${folder}-${catFileName}`;

    let data;

    if (globalCache.has(cacheKey)) {
      data = globalCache.get(cacheKey);
    } else {
      try {
        const response = await fetch(fetchPath);
        if (!response.ok) throw new DataLoaderError(`HTTP ${response.status} - Dataset not found at ${fetchPath}`);
        data = await response.json();
        
        if (!Array.isArray(data)) throw new DataLoaderError(`Data at ${fetchPath} is not a valid JSON array.`);
        if (data.length === 0) throw new DataLoaderError(`Data at ${fetchPath} is completely empty.`);
        
        const idSet = new Set();
        for (const item of data) {
          if (!item.id) throw new DataLoaderError(`Missing 'id' field in item at ${fetchPath}`);
          if (idSet.has(item.id)) throw new DataLoaderError(`Duplicate ID found: ${item.id} in ${fetchPath}`);
          idSet.add(item.id);
          
          if (!item.prompt && !item.question && !item.word && !item.title && !item.text) {
             throw new DataLoaderError(`Missing primary text field (prompt/question/word/title/text) in item ${item.id}`);
          }
          if (item.difficulty && !['easy', 'medium', 'hard', 'none'].includes(item.difficulty.toLowerCase())) {
             throw new DataLoaderError(`Invalid difficulty '${item.difficulty}' in item ${item.id}`);
          }
        }

        if (import.meta.env.DEV) {
          console.log(`Loaded ${fetchPath.split('/').pop()} (${data.length} items)`);
        }

        globalCache.set(cacheKey, data);
      } catch (e) {
        console.error(`[DataLoader] Failed to load production dataset:`, e.message);
        throw e;
      }
    }

    let filtered = data;

    // 4. Filter by Difficulty
    if (difficulty && difficulty !== 'any' && difficulty !== 'none') {
      const targetDiff = difficulty.toLowerCase();
      const diffFiltered = filtered.filter(item => !item.difficulty || item.difficulty.toLowerCase() === targetDiff);
      if (diffFiltered.length > 0) {
        filtered = diffFiltered;
      }
    }

    // 5. Duplicate Prevention (Tracking across sessions using Sets)
    if (!allowDuplicates) {
      let unconsumed = filtered.filter(item => !consumedIds.has(item.id));
      
      // If we've exhausted all questions for this criteria, reset tracking for this specific subset
      if (unconsumed.length === 0) {
        filtered.forEach(item => consumedIds.delete(item.id));
        unconsumed = filtered;
      }
      filtered = unconsumed;
    }

    // 6. Shuffle & Limit
    const shuffled = shuffleArray([...filtered]);
    const selected = limit ? shuffled.slice(0, limit) : shuffled;
    
    // Mark as consumed
    if (!allowDuplicates) {
      selected.forEach(item => consumedIds.add(item.id));
    }
    
    return selected;
  }

  async loadData() {
    this.items = await DataLoader.loadData({
      game: this.gameId,
      category: this.category,
      difficulty: this.difficulty,
      allowDuplicates: false
    });
    this.activePool = [...this.items];
  }

  getNextItem() {
    if (this.activePool.length === 0) {
      this.activePool = shuffleArray([...this.items]);
    }
    return this.activePool.pop();
  }
}

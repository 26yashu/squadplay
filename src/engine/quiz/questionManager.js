import { shuffleArray } from '../../games/quiz-battle/utils/shuffle';
import { DataLoader } from '../core/dataLoader';

export class QuestionManager {
  constructor() {
    this.questions = [];
  }

  async loadQuestions(category, difficulty) {
    const rawQuestions = await DataLoader.loadData({
      game: 'quiz-battle',
      category: category,
      difficulty: difficulty
    });
    
    // The production JSON uses correctAnswer directly, so we just pass it through
    this.questions = rawQuestions;
  }

  getQuestionsForGame(count) {
    if (this.questions.length === 0) return [];
    
    const shuffled = shuffleArray(this.questions);
    const selected = shuffled.slice(0, Math.min(count, this.questions.length));
    
    return selected.map(q => {
      // options are already provided in the new schema, we just need to shuffle them
      const options = q.options ? shuffleArray([...q.options]) : [];
      return {
        ...q,
        options
      };
    });
  }

  getInfiniteQuestionStream() {
    if (this.questions.length === 0) return () => null;
    
    let index = 0;
    let pool = shuffleArray(this.questions);

    return () => {
      if (index >= pool.length) {
        pool = shuffleArray(this.questions);
        index = 0;
      }
      const q = pool[index++];
      const options = q.options ? shuffleArray([...q.options]) : [];
      return { ...q, options };
    };
  }
}

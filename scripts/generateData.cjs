const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../public/data');

const categories = {
  quiz: ['general', 'science', 'technology', 'geography', 'sports', 'movies', 'history'],
  'truth-or-dare': ['classic', 'funny', 'party', 'family'],
  charades: ['movies', 'animals', 'food', 'objects', 'actions', 'celebrities', 'sports'],
  'spin-wheel': ['challenges', 'punishments', 'random-tasks', 'mini-games', 'lucky-rewards']
};

// Ensure directories exist
Object.keys(categories).forEach(dir => {
  const dirPath = path.join(DATA_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Utility to write JSON
function writeJSON(dir, file, data) {
  fs.writeFileSync(path.join(DATA_DIR, dir, `${file}.json`), JSON.stringify(data, null, 2));
}

// 1. Generate Quiz
categories.quiz.forEach(category => {
  const data = [];
  for (let i = 1; i <= 200; i++) {
    const diff = i % 3 === 0 ? 'hard' : (i % 2 === 0 ? 'medium' : 'easy');
    data.push({
      id: `quiz_${category}_${i}`,
      question: `This is a generated ${diff} question about ${category} #${i}?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 'Option A',
      difficulty: diff,
      category: category,
      explanation: `Explanation for ${category} question #${i}.`
    });
  }
  writeJSON('quiz', category, data);
});

// 2. Generate Truth or Dare
categories['truth-or-dare'].forEach(category => {
  const data = [];
  for (let i = 1; i <= 300; i++) {
    const type = i % 2 === 0 ? 'truth' : 'dare';
    data.push({
      id: `tod_${category}_${i}`,
      type: type,
      text: `This is a generated ${type} prompt for the ${category} pack #${i}.`,
      difficulty: 'medium'
    });
  }
  writeJSON('truth-or-dare', category, data);
});

// 3. Generate Charades
categories.charades.forEach(category => {
  const data = [];
  for (let i = 1; i <= 200; i++) {
    const diff = i % 3 === 0 ? 'hard' : (i % 2 === 0 ? 'medium' : 'easy');
    data.push({
      id: `charades_${category}_${i}`,
      word: `${category} Word ${i}`,
      difficulty: diff
    });
  }
  writeJSON('charades', category, data);
});

// 4. Generate Spin Wheel
categories['spin-wheel'].forEach(category => {
  const data = [];
  for (let i = 1; i <= 50; i++) {
    data.push({
      id: `spin_${category}_${i}`,
      text: `Spin Wheel ${category} Action ${i}`,
      color: `hsl(${(i * 360) / 50}, 70%, 60%)`,
      weight: 1
    });
  }
  writeJSON('spin-wheel', category, data);
});

console.log('Successfully generated all production JSON datasets.');

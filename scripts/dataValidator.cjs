const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../public/data');

const categories = {
  quiz: ['general', 'science', 'technology', 'geography', 'sports', 'movies', 'history'],
  'truth-or-dare': ['classic', 'funny', 'party', 'family'],
  charades: ['movies', 'animals', 'food', 'objects', 'actions', 'celebrities', 'sports'],
  'spin-wheel': ['challenges', 'punishments', 'random-tasks', 'mini-games', 'lucky-rewards']
};

let totalErrors = 0;
let totalValid = 0;

function validateFile(game, category) {
  const filePath = path.join(DATA_DIR, game, `${category}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`[ERROR] Missing file: ${game}/${category}.json`);
    totalErrors++;
    return;
  }

  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawData);

    if (!Array.isArray(data)) {
      console.error(`[ERROR] ${game}/${category}.json is not an array.`);
      totalErrors++;
      return;
    }

    const ids = new Set();
    data.forEach((item, idx) => {
      // 1. Check ID
      if (!item.id) {
        console.error(`[ERROR] ${game}/${category}.json at index ${idx} is missing an ID.`);
        totalErrors++;
      } else if (ids.has(item.id)) {
        console.error(`[ERROR] ${game}/${category}.json has duplicate ID: ${item.id}`);
        totalErrors++;
      } else {
        ids.add(item.id);
      }

      // 2. Game specific checks
      if (game === 'quiz') {
        if (!item.question || !item.options || item.options.length < 2 || !item.answer) {
          console.error(`[ERROR] Quiz item ${item.id} has invalid structure.`);
          totalErrors++;
        }
      } else if (game === 'truth-or-dare') {
        if (!item.text || !item.type) {
          console.error(`[ERROR] ToD item ${item.id} has invalid structure.`);
          totalErrors++;
        }
      } else if (game === 'charades') {
        if (!item.word) {
          console.error(`[ERROR] Charades item ${item.id} has invalid structure.`);
          totalErrors++;
        }
      } else if (game === 'spin-wheel') {
        if (!item.text) {
          console.error(`[ERROR] Spin Wheel item ${item.id} has invalid structure.`);
          totalErrors++;
        }
      }
    });
    
    totalValid += data.length;

  } catch (e) {
    console.error(`[ERROR] ${game}/${category}.json is malformed JSON.`, e);
    totalErrors++;
  }
}

console.log('Starting validation...');

Object.keys(categories).forEach(game => {
  categories[game].forEach(cat => {
    validateFile(game, cat);
  });
});

console.log(`\nValidation complete.`);
console.log(`Total valid items: ${totalValid}`);
console.log(`Total errors found: ${totalErrors}`);

if (totalErrors > 0) {
  process.exit(1);
}

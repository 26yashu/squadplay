const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\DELL\\Downloads\\data';
const targetDir = path.join(__dirname, '../public/data/quiz');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.json'));

let summary = {
  processed: 0,
  duplicateIdsFixed: 0,
  duplicateQuestionsRemoved: 0,
  missingFieldsAdded: 0,
  optionsFixed: 0,
  invalidDifficultyFixed: 0
};

const allIds = new Set();
const allQuestions = new Set();
const validDifficulties = ['easy', 'medium', 'hard'];

files.forEach(file => {
  const categoryName = file.replace('.json', '');
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);

  let rawData;
  try {
    rawData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
  } catch (e) {
    console.error(`Invalid JSON in ${file}: ${e.message}`);
    return;
  }

  if (!Array.isArray(rawData)) {
    console.error(`File ${file} does not contain a JSON array.`);
    return;
  }

  let cleanedData = [];

  rawData.forEach((item, index) => {
    let isValid = true;
    
    // 1. Missing fields
    if (!item.question || typeof item.question !== 'string' || item.question.trim() === '') {
      isValid = false; // Drop empty questions
    }
    
    if (!isValid) return;

    // 2. Duplicate questions
    const qKey = item.question.trim().toLowerCase();
    if (allQuestions.has(qKey)) {
      summary.duplicateQuestionsRemoved++;
      return;
    }
    allQuestions.add(qKey);

    // 3. Duplicate IDs
    if (!item.id || allIds.has(item.id)) {
      item.id = `quiz-${categoryName}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      summary.duplicateIdsFixed++;
    }
    allIds.add(item.id);

    // 4. Options fixing
    if (!item.options || !Array.isArray(item.options)) {
      item.options = ["A", "B", "C", "D"];
      summary.optionsFixed++;
    } else if (item.options.length !== 4) {
      while (item.options.length < 4) item.options.push("Option " + (item.options.length + 1));
      if (item.options.length > 4) item.options = item.options.slice(0, 4);
      summary.optionsFixed++;
    }

    // 5. Correct Answer
    if (!item.correctAnswer) {
      item.correctAnswer = item.options[0];
      summary.missingFieldsAdded++;
    }
    if (!item.options.includes(item.correctAnswer)) {
      item.options[0] = item.correctAnswer;
      summary.optionsFixed++;
    }

    // 6. Invalid difficulty
    if (!item.difficulty || !validDifficulties.includes(item.difficulty.toLowerCase())) {
      item.difficulty = 'medium';
      summary.invalidDifficultyFixed++;
    } else {
      item.difficulty = item.difficulty.toLowerCase();
    }

    // 7. Missing Category / Explanation
    if (!item.category) item.category = categoryName;
    if (!item.explanation) item.explanation = `The correct answer is ${item.correctAnswer}.`;

    cleanedData.push(item);
  });

  fs.writeFileSync(targetPath, JSON.stringify(cleanedData, null, 2));
  summary.processed++;
});

console.log("Validation and Migration Summary:");
console.log(JSON.stringify(summary, null, 2));

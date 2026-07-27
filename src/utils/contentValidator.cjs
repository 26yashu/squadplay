const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../../public/data');

const validateQuiz = (data, filename) => {
  let errors = [];
  const ids = new Set();
  
  data.forEach((item, i) => {
    if (!item.id) errors.push(`[${filename}] Entry ${i} missing ID.`);
    else if (ids.has(item.id)) errors.push(`[${filename}] Duplicate ID found: ${item.id}`);
    else ids.add(item.id);

    if (!item.question) errors.push(`[${filename}] Entry ${item.id} missing question.`);
    if (!item.options || !Array.isArray(item.options) || item.options.length < 2) errors.push(`[${filename}] Entry ${item.id} invalid options.`);
    if (!item.answer) errors.push(`[${filename}] Entry ${item.id} missing answer.`);
    if (!item.options.includes(item.answer)) errors.push(`[${filename}] Entry ${item.id} answer not in options.`);
    if (!item.category) errors.push(`[${filename}] Entry ${item.id} missing category.`);
    if (!item.difficulty || !['easy', 'medium', 'hard'].includes(item.difficulty)) errors.push(`[${filename}] Entry ${item.id} invalid difficulty.`);
  });
  
  return errors;
};

const validateTruthOrDare = (data, filename) => {
  let errors = [];
  const ids = new Set();

  data.forEach((item, i) => {
    if (!item.id) errors.push(`[${filename}] Entry ${i} missing ID.`);
    else if (ids.has(item.id)) errors.push(`[${filename}] Duplicate ID found: ${item.id}`);
    else ids.add(item.id);

    if (!item.text) errors.push(`[${filename}] Entry ${item.id} missing text.`);
    if (!item.type || !['truth', 'dare'].includes(item.type)) errors.push(`[${filename}] Entry ${item.id} invalid type.`);
    if (!item.category) errors.push(`[${filename}] Entry ${item.id} missing category.`);
    if (!item.difficulty || !['easy', 'medium', 'hard'].includes(item.difficulty)) errors.push(`[${filename}] Entry ${item.id} invalid difficulty.`);
  });

  return errors;
};

const validateCharades = (data, filename) => {
  let errors = [];
  const ids = new Set();

  data.forEach((item, i) => {
    if (!item.id) errors.push(`[${filename}] Entry ${i} missing ID.`);
    else if (ids.has(item.id)) errors.push(`[${filename}] Duplicate ID found: ${item.id}`);
    else ids.add(item.id);

    if (!item.word) errors.push(`[${filename}] Entry ${item.id} missing word.`);
    if (!item.category) errors.push(`[${filename}] Entry ${item.id} missing category.`);
    if (!item.difficulty || !['easy', 'medium', 'hard'].includes(item.difficulty)) errors.push(`[${filename}] Entry ${item.id} invalid difficulty.`);
  });

  return errors;
};

const validateSpinWheel = (data, filename) => {
  let errors = [];
  const ids = new Set();

  data.forEach((item, i) => {
    if (!item.id) errors.push(`[${filename}] Entry ${i} missing ID.`);
    else if (ids.has(item.id)) errors.push(`[${filename}] Duplicate ID found: ${item.id}`);
    else ids.add(item.id);

    if (!item.text) errors.push(`[${filename}] Entry ${item.id} missing text.`);
    if (!item.type || !['challenge', 'category'].includes(item.type)) errors.push(`[${filename}] Entry ${item.id} invalid type.`);
    if (!item.difficulty || !['easy', 'medium', 'hard'].includes(item.difficulty)) errors.push(`[${filename}] Entry ${item.id} invalid difficulty.`);
  });

  return errors;
};

const validateAll = () => {
  let allErrors = [];
  const dirs = fs.readdirSync(DATA_DIR);

  dirs.forEach(gameDir => {
    const p = path.join(DATA_DIR, gameDir);
    if (!fs.statSync(p).isDirectory()) return;

    const files = fs.readdirSync(p);
    files.forEach(file => {
      const filePath = path.join(p, file);
      try {
        const raw = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(raw);
        
        let errors = [];
        if (gameDir === 'quiz') errors = validateQuiz(data, `${gameDir}/${file}`);
        if (gameDir === 'truth-or-dare') errors = validateTruthOrDare(data, `${gameDir}/${file}`);
        if (gameDir === 'charades') errors = validateCharades(data, `${gameDir}/${file}`);
        if (gameDir === 'spin-wheel') errors = validateSpinWheel(data, `${gameDir}/${file}`);
        
        allErrors.push(...errors);
        if (errors.length === 0) {
          console.log(`✓ ${gameDir}/${file} loaded successfully with ${data.length} entries. No errors.`);
        }
      } catch (e) {
        allErrors.push(`[${gameDir}/${file}] Malformed JSON or read error: ${e.message}`);
      }
    });
  });

  if (allErrors.length > 0) {
    console.error('Validation failed with the following errors:');
    allErrors.forEach(err => console.error(err));
    process.exit(1);
  } else {
    console.log('\nAll databases validated successfully.');
  }
};

validateAll();

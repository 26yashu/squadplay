const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../public/data');
const files = ['quiz.json', 'truth-or-dare.json', 'charades.json', 'spin-wheel.json'];

let metadata = {
  lastGenerated: new Date().toISOString(),
  datasets: {}
};

let allErrors = [];

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    allErrors.push(`File missing: ${file}`);
    return;
  }
  
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    allErrors.push(`Broken JSON in ${file}: ${e.message}`);
    return;
  }
  
  if (!Array.isArray(data)) {
    allErrors.push(`Invalid schema in ${file}: Root must be an array`);
    return;
  }

  const ids = new Set();
  const texts = new Set();
  
  let stats = {
    totalEntries: data.length,
    easy: 0,
    medium: 0,
    hard: 0,
    duplicatesRemoved: 0
  };

  const validDifficulties = ['easy', 'medium', 'hard'];

  const cleanedData = [];

  data.forEach((item, idx) => {
    let hasError = false;
    
    // 1. Missing ID
    if (!item.id) {
      allErrors.push(`[${file}] Item at index ${idx} missing 'id'`);
      hasError = true;
    } else {
      if (ids.has(item.id)) {
        allErrors.push(`[${file}] Duplicate ID found: ${item.id}`);
        hasError = true;
      }
      ids.add(item.id);
    }
    
    // 2. Identify content field
    let contentField = item.question || item.text || item.word;
    if (!contentField || typeof contentField !== 'string' || contentField.trim() === '') {
      allErrors.push(`[${file}] Empty string content at ID: ${item.id}`);
      hasError = true;
    } else {
      if (texts.has(contentField.toLowerCase())) {
        allErrors.push(`[${file}] Duplicate content found: "${contentField}"`);
        stats.duplicatesRemoved++;
        hasError = true; // Mark as error to drop duplicate
      } else {
        texts.add(contentField.toLowerCase());
      }
    }
    
    // 3. Invalid difficulty (ignore for Spin Wheel)
    if (file !== 'spin-wheel.json') {
      if (!item.difficulty || !validDifficulties.includes(item.difficulty.toLowerCase())) {
        allErrors.push(`[${file}] Invalid difficulty '${item.difficulty}' at ID: ${item.id}`);
      } else {
        stats[item.difficulty.toLowerCase()]++;
      }
    }
    
    // 4. Missing Answers (Quiz only)
    if (file === 'quiz.json') {
      if (!item.correctAnswer || !item.options || item.options.length < 2) {
        allErrors.push(`[${file}] Missing correct answer or options at ID: ${item.id}`);
        hasError = true;
      }
    }
    
    // 5. Missing Category
    if (file === 'quiz.json' || file === 'charades.json' || file === 'spin-wheel.json') {
      if (!item.category) {
        allErrors.push(`[${file}] Missing category at ID: ${item.id}`);
        hasError = true;
      }
    }
    
    if (!hasError) {
      cleanedData.push(item);
    }
  });
  
  // Save cleaned data back if there were duplicates
  if (data.length !== cleanedData.length) {
    fs.writeFileSync(filePath, JSON.stringify(cleanedData, null, 2));
    stats.totalEntries = cleanedData.length;
  }

  metadata.datasets[file] = stats;
});

// Save metadata
fs.writeFileSync(path.join(dataDir, 'metadata.json'), JSON.stringify(metadata, null, 2));

// Generate Report
const reportPath = path.join(dataDir, 'validation-report.txt');
let reportContent = `SquadPlay Content Validation Report\nGenerated: ${new Date().toISOString()}\n\n`;

if (allErrors.length === 0) {
  reportContent += "✅ SUCCESS: No errors found. All content is production-ready.\n";
} else {
  reportContent += `❌ FOUND ${allErrors.length} ERRORS:\n\n`;
  allErrors.forEach(err => reportContent += `- ${err}\n`);
}

reportContent += "\n\nMETADATA SUMMARY:\n" + JSON.stringify(metadata, null, 2);

fs.writeFileSync(reportPath, reportContent);

console.log(`Validation complete. Found ${allErrors.length} errors (some may be auto-resolved duplicates).`);
console.log(`Report saved to ${reportPath}`);

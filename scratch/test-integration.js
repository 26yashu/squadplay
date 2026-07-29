import fs from 'fs';
import { DataLoader } from './src/engine/core/dataLoader.js';
import { QuestionManager } from './src/engine/quiz/questionManager.js';
import { GameManager } from './src/engine/quiz/gameManager.js';

// Mock fetch for local testing
global.fetch = async (url) => {
  const path = 'public' + url;
  if (!fs.existsSync(path)) return { ok: false, status: 404 };
  const text = fs.readFileSync(path, 'utf8');
  return {
    ok: true,
    json: async () => JSON.parse(text)
  };
};

const session = {
  mode: 'individual',
  category: 'general',
  difficulty: 'easy'
};

const players = [
  { id: '1', name: 'Player 1' },
  { id: '2', name: 'Player 2' }
];

async function run() {
  const manager = new GameManager(session, players);
  manager.onStateChange = (m) => {
    console.log(`State: ${m.state}, currentQuestion: ${m.currentQuestion ? m.currentQuestion.id : null}`);
    if (m.currentQuestion) {
      console.log(`Options:`, m.currentQuestion.options);
    }
  };

  await manager.initialize();
  console.log("Init done.");
  manager.start();
}

run().catch(console.error);

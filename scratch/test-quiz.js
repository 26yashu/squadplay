import { GameManager } from './src/engine/quiz/gameManager.js';

const session = {
  mode: 'individual',
  category: 'general',
  difficulty: 'easy'
};

const players = [
  { id: '1', name: 'Player 1' },
  { id: '2', name: 'Player 2' }
];

async function test() {
  const manager = new GameManager(session, players);
  
  manager.onStateChange = (m) => {
    console.log(`State changed to: ${m.state}, currentQuestion: ${m.currentQuestion ? m.currentQuestion.id : null}`);
  };

  console.log("Starting initialize...");
  // Simulate what the React component does
  const initPromise = manager.initialize();
  
  // What if start is called immediately?
  manager.start();
  
  await initPromise;
  
  console.log("After initialize finished, calling start again...");
  manager.start();
}

test();

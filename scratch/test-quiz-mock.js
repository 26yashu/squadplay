import { GameManager } from './src/engine/quiz/gameManager.js';
import { DataLoader } from './src/engine/core/dataLoader.js';

DataLoader.loadData = async () => {
  return [
    { id: '1', question: 'Q1', options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' },
    { id: '2', question: 'Q2', options: ['A', 'B', 'C', 'D'], correctAnswer: 'B' },
    { id: '3', question: 'Q3', options: ['A', 'B', 'C', 'D'], correctAnswer: 'C' },
    { id: '4', question: 'Q4', options: ['A', 'B', 'C', 'D'], correctAnswer: 'D' },
    { id: '5', question: 'Q5', options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' },
    { id: '6', question: 'Q6', options: ['A', 'B', 'C', 'D'], correctAnswer: 'B' },
    { id: '7', question: 'Q7', options: ['A', 'B', 'C', 'D'], correctAnswer: 'C' },
    { id: '8', question: 'Q8', options: ['A', 'B', 'C', 'D'], correctAnswer: 'D' },
    { id: '9', question: 'Q9', options: ['A', 'B', 'C', 'D'], correctAnswer: 'A' },
    { id: '10', question: 'Q10', options: ['A', 'B', 'C', 'D'], correctAnswer: 'B' },
    { id: '11', question: 'Q11', options: ['A', 'B', 'C', 'D'], correctAnswer: 'C' },
    { id: '12', question: 'Q12', options: ['A', 'B', 'C', 'D'], correctAnswer: 'D' },
  ];
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

async function test() {
  const manager = new GameManager(session, players);
  
  manager.onStateChange = (m) => {
    console.log(`State changed to: ${m.state}, currentQuestion: ${m.currentQuestion ? m.currentQuestion.id : null}`);
  };

  console.log("Starting initialize...");
  const initPromise = manager.initialize();
  await initPromise;
  
  console.log("After initialize finished, calling start...");
  manager.start();
}

test();

import { Swords } from 'lucide-react';

export const quizBattle = {
  id: 'quiz-battle',
  title: 'Quiz Battle',
  subtitle: 'The ultimate trivia showdown',
  icon: Swords,
  accentColor: 'text-neon-indigo',
  bgImage: '/images/quiz_battle_bg.jpg',
  glowClass: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]',
  available: true,
  setupSteps: ['player', 'mode', 'category', 'ready'],
  tags: ['Party', 'Brain'],
  xpRewards: { play: 10, win: 50, correctAnswer: 10, perfectGame: 100 },
  supportsCategory: true,
  supportsMode: true,
  supportsTimer: false,
  supportsDifficulty: true,
  supportsWheelOptions: false,
  minPlayers: 1,
  maxPlayers: 4,
};

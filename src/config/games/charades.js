import { Theater } from 'lucide-react';

export const charades = {
  id: 'charades',
  title: 'Charades',
  subtitle: 'Act it out',
  icon: Theater,
  
  bgImage: '/images/charades_bg.jpg',
  glowClass: 'hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]',
  available: true,
  setupSteps: ['player', 'teams', 'category', 'difficulty', 'timer', 'rounds', 'ready'],
  tags: ['Party', 'Casual'],
  xpRewards: { play: 10, win: 30, correctAnswer: 10 },
  supportsCategory: true,
  supportsMode: false,
  supportsTimer: true,
  supportsDifficulty: true,
  supportsWheelOptions: false,
  minPlayers: 2,
  maxPlayers: 4,
};

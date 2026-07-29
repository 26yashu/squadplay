import { Zap } from 'lucide-react';

export const rapidFire = {
  id: 'rapid-fire',
  title: 'Rapid Fire',
  subtitle: 'Speed trivia round',
  icon: Zap,
  
  bgImage: '/images/rapid_fire_bg.jpg',
  glowClass: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]',
  available: true,
  setupSteps: ['player', 'category', 'difficulty', 'timer', 'ready'],
  tags: ['Quick', 'Brain'],
  xpRewards: { play: 10, win: 40, correctAnswer: 5 },
  supportsCategory: true,
  supportsMode: false,
  supportsTimer: true,
  supportsDifficulty: true,
  supportsWheelOptions: false,
  minPlayers: 1,
};

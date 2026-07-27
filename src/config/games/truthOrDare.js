import { HelpCircle } from 'lucide-react';

export const truthOrDare = {
  id: 'truth-or-dare',
  title: 'Truth or Dare',
  subtitle: 'Spill the tea',
  icon: HelpCircle,
  
  bgImage: '/images/truth_or_dare_bg.jpg',
  glowClass: 'hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]',
  available: true,
  setupSteps: ['player', 'category', 'difficulty', 'rotation', 'ready'],
  tags: ['Party', 'Casual'],
  xpRewards: { play: 10, participation: 5, bonus: 20 },
  supportsCategory: true,
  supportsMode: false,
  supportsTimer: false,
  supportsDifficulty: true,
  supportsWheelOptions: false,
  minPlayers: 2,
  maxPlayers: 4,
};

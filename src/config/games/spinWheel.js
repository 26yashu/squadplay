import { CircleDashed } from 'lucide-react';

export const spinWheel = {
  id: 'spin-wheel',
  title: 'Spin Wheel',
  subtitle: 'Test your luck',
  icon: CircleDashed,
  
  bgImage: '/images/spin_wheel_bg.jpg',
  glowClass: 'hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]',
  available: true,
  setupSteps: ['player', 'wheelType', 'category', 'rounds', 'ready'],
  tags: ['Casual', 'Quick'],
  xpRewards: { play: 5, participation: 5 },
  supportsCategory: false,
  supportsMode: false,
  supportsTimer: false,
  supportsDifficulty: false,
  supportsWheelOptions: false,
  minPlayers: 1,
  maxPlayers: 4,
};

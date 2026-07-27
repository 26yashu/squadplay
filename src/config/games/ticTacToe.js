import { Grid3x3 } from 'lucide-react';

export const ticTacToe = {
  id: 'tic-tac-toe',
  title: 'Tic Tac Toe',
  subtitle: 'Classic grid battle',
  icon: Grid3x3,
  
  bgImage: '/images/tic_tac_toe_bg.jpg',
  glowClass: 'hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]',
  available: true,
  setupSteps: ['player', 'symbol', 'boardSize', 'ready'],
  tags: ['Brain', 'Quick'],
  xpRewards: { play: 10, win: 40 },
  supportsCategory: false,
  supportsMode: false,
  supportsTimer: false,
  supportsDifficulty: false,
  minPlayers: 2,
  maxPlayers: 2,
};

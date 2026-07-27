import { Users } from 'lucide-react';

export const ludo = {
  id: 'ludo',
  title: 'Ludo',
  subtitle: 'Board game classic',
  comingSoon: false,
  tags: ['Party', 'Casual'],
  icon: Users,
  accentColor: 'text-amber-400',
  glowClass: 'shadow-[0_0_15px_rgba(251,191,36,0.3)]',
  available: true,
  setupSteps: ['ludoPlayer', 'ready'],
  supportsCategory: false,
  supportsMode: false,
  supportsTimer: false,
  supportsDifficulty: false,
  supportsWheelOptions: false,
  minPlayers: 2,
  maxPlayers: 4,
};

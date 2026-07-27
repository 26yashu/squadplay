import { gameRegistry } from './src/registry/gameRegistry.js';
console.log('gameRegistry length:', gameRegistry.length);
gameRegistry.forEach(game => {
  console.log(game.id, 'available:', game.available, 'comingSoon:', game.comingSoon);
});

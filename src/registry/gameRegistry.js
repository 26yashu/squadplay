import { quizBattle } from '../config/games/quizBattle';
import { rapidFire } from '../config/games/rapidFire';
import { truthOrDare } from '../config/games/truthOrDare';
import { charades } from '../config/games/charades';
import { ticTacToe } from '../config/games/ticTacToe';
import { spinWheel } from '../config/games/spinWheel';
import { ludo } from '../config/games/ludo';
import { validateGameConfig } from './gameConfigValidator';

const allIds = new Set();

export const gameRegistry = [
  quizBattle,
  rapidFire,
  truthOrDare,
  charades,
  ticTacToe,
  spinWheel,
  ludo
].map(config => validateGameConfig(config, allIds));

export const getGameById = (id) => gameRegistry.find(g => g.id === id);

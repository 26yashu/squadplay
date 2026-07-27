import { LudoManager } from './src/games/ludo/engine/LudoManager.js';

const mockSession = { mode: 'ffa' };
const mockPlayers = [
  { id: 'p1', name: 'Player 1' },
  { id: 'p2', name: 'Player 2' },
  { id: 'p3', name: 'Player 3' },
  { id: 'p4', name: 'Player 4' }
];

console.log("Starting Ludo Engine Simulation...");

const manager = new LudoManager(mockSession, mockPlayers);

manager.onStateChange = (m) => {
  if (m.state === 'moving' && m.legalMoves.length > 0) {
     // automatically pick a legal move
     const move = m.legalMoves[0];
     // console.log(`[BOT] Player ${m.turnManager.getCurrentPlayer().name} moving token ${move.tokenId}`);
     m.moveToken(move.tokenId);
  }
};

manager.start();

let turns = 0;
while (manager.state !== 'finished' && turns < 2000) {
  if (manager.state === 'rolling') {
    manager.rollDice();
  }
  turns++;
}

console.log(`Simulation finished in ${turns} loops.`);
console.log(`Game State: ${manager.state}`);

if (manager.state === 'finished') {
  console.log("WINNERS / RANKINGS:");
  manager.results.forEach((r, i) => {
    console.log(`#${i + 1} - ${r.player.name} (Score: ${r.stats.score}, Captures: ${r.stats.captures})`);
  });
  console.log("GAME_COMPLETED payload looks valid if results are populated above.");
} else {
  console.error("Game did not finish properly or stuck in infinite loop.");
}

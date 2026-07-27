export class BotEngine {
  constructor(manager) {
    this.manager = manager;
  }

  // Expects bot difficulty to be 'easy', 'medium', or 'hard'
  getOptimalMove(player, legalMoves, rollResult) {
    if (!legalMoves || legalMoves.length === 0) return null;
    if (legalMoves.length === 1) return legalMoves[0].tokenId;

    const difficulty = player.botDifficulty || 'medium';

    if (difficulty === 'easy') {
      return this.getRandomMove(legalMoves);
    }
    
    if (difficulty === 'medium') {
      return this.getMediumMove(legalMoves, rollResult, player);
    }
    
    if (difficulty === 'hard') {
      return this.getHardMove(legalMoves, rollResult, player);
    }

    return this.getRandomMove(legalMoves);
  }

  getRandomMove(legalMoves) {
    const idx = Math.floor(Math.random() * legalMoves.length);
    return legalMoves[idx].tokenId;
  }

  getMediumMove(legalMoves, rollResult, player) {
    // 1. Capture
    const captureMove = legalMoves.find(m => m.captures && m.captures.length > 0);
    if (captureMove) return captureMove.tokenId;

    // 2. Leave base
    if (rollResult === 6) {
      const leaveBaseMove = legalMoves.find(m => {
        const t = this.manager.tokenEngine.getToken(m.tokenId);
        return t && t.state === 'base';
      });
      if (leaveBaseMove) return leaveBaseMove.tokenId;
    }

    // 3. Advance closest token (token with the highest steps taken)
    let bestToken = null;
    let maxSteps = -1;
    
    legalMoves.forEach(m => {
      const t = this.manager.tokenEngine.getToken(m.tokenId);
      if (t && t.state === 'active') {
        const steps = this.manager.tokenEngine.getStepsTaken(t);
        if (steps > maxSteps) {
          maxSteps = steps;
          bestToken = m.tokenId;
        }
      }
    });
    
    if (bestToken) return bestToken;

    // 4. Random
    return this.getRandomMove(legalMoves);
  }

  getHardMove(legalMoves, rollResult, player) {
    // 1. Winning move
    const winningMove = legalMoves.find(m => {
      const t = this.manager.tokenEngine.getToken(m.tokenId);
      return t && t.state === 'home_stretch' && t.position + rollResult === 5;
    });
    if (winningMove) return winningMove.tokenId;

    // 2. Capture
    const captureMove = legalMoves.find(m => m.captures && m.captures.length > 0);
    if (captureMove) return captureMove.tokenId;

    // 3. Safe cell
    const safeCells = [0, 8, 13, 21, 26, 34, 39, 47];
    const safeMove = legalMoves.find(m => {
      const t = this.manager.tokenEngine.getToken(m.tokenId);
      if (t && t.state === 'active') {
        const nextPos = (t.position + rollResult) % 52;
        return safeCells.includes(nextPos);
      }
      return false;
    });
    if (safeMove) return safeMove.tokenId;

    // 4. Home stretch entry
    const homeStretchMove = legalMoves.find(m => {
      const t = this.manager.tokenEngine.getToken(m.tokenId);
      if (t && t.state === 'active') {
        const steps = this.manager.tokenEngine.getStepsTaken(t);
        return steps + rollResult > 50;
      }
      return false;
    });
    if (homeStretchMove) return homeStretchMove.tokenId;

    // 5. Leave base
    if (rollResult === 6) {
      const leaveBaseMove = legalMoves.find(m => {
        const t = this.manager.tokenEngine.getToken(m.tokenId);
        return t && t.state === 'base';
      });
      if (leaveBaseMove) return leaveBaseMove.tokenId;
    }

    // 6. Longest progress
    let bestToken = null;
    let maxSteps = -1;
    legalMoves.forEach(m => {
      const t = this.manager.tokenEngine.getToken(m.tokenId);
      if (t && t.state !== 'base') {
        let steps = t.state === 'home_stretch' ? 51 + t.position : this.manager.tokenEngine.getStepsTaken(t);
        if (steps > maxSteps) {
          maxSteps = steps;
          bestToken = m.tokenId;
        }
      }
    });
    if (bestToken) return bestToken;

    return this.getRandomMove(legalMoves);
  }
}

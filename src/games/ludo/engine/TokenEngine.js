export class TokenEngine {
  constructor(players) {
    this.players = players;
    this.playerMap = {};
    players.forEach((p, idx) => {
      this.playerMap[p.id] = { index: idx, colorClass: p.colorClass };
    });

    this.tokens = [];
    this.initializeTokens();

    this.safeCells = [0, 8, 13, 21, 26, 34, 39, 47];
    
    this.startCells = {
      0: 0,
      1: 13,
      2: 26,
      3: 39
    };
    
    this.endCells = {
      0: 50,
      1: 11,
      2: 24,
      3: 37
    };
  }

  initializeTokens() {
    this.players.forEach((p) => {
      const pIdx = this.playerMap[p.id].index;
      for (let i = 0; i < 4; i++) {
        this.tokens.push({
          id: `${p.id}_t${i}`,
          playerId: p.id,
          playerIndex: pIdx,
          tokenIndex: i,
          state: 'base',
          position: -1,
        });
      }
    });
  }

  getTokens() {
    return this.tokens;
  }

  getLegalMoves(playerId, rollResult) {
    const pTokens = this.tokens.filter(t => t.playerId === playerId && t.state !== 'finished');
    const legalMoves = [];

    pTokens.forEach(t => {
      if (t.state === 'base') {
        if (rollResult === 6) {
          legalMoves.push({ tokenId: t.id, action: 'spawn' });
        }
      } else if (t.state === 'active') {
        const stepsTaken = this.getStepsTaken(t);
        if (stepsTaken + rollResult <= 56) {
          legalMoves.push({ tokenId: t.id, action: 'move', steps: rollResult });
        }
      } else if (t.state === 'home_stretch') {
        if (t.position + rollResult <= 5) {
          legalMoves.push({ tokenId: t.id, action: 'move_home', steps: rollResult });
        }
      }
    });

    return legalMoves;
  }

  getStepsTaken(token) {
    if (token.state === 'base') return 0;
    if (token.state === 'home_stretch') return 51 + token.position;
    
    const startCell = this.startCells[token.playerIndex];
    if (token.position >= startCell) {
      return token.position - startCell;
    } else {
      return (52 - startCell) + token.position;
    }
  }

  moveToken(tokenId, rollResult) {
    const token = this.tokens.find(t => t.id === tokenId);
    if (!token) return { success: false };

    const pIdx = token.playerIndex;
    let capture = null;
    let finished = false;

    if (token.state === 'base' && rollResult === 6) {
      token.state = 'active';
      token.position = this.startCells[pIdx];
      token.logicalPath = [{ state: 'active', position: token.position }];
    } 
    else if (token.state === 'active') {
      const stepsTaken = this.getStepsTaken(token);
      let newSteps = stepsTaken;
      token.logicalPath = [];
      
      let currPos = token.position;
      let currState = token.state;
      
      for (let i = 1; i <= rollResult; i++) {
        newSteps++;
        if (newSteps > 55) {
          currState = 'finished';
          currPos = -1;
        } else if (newSteps > 50) {
          currState = 'home_stretch';
          currPos = newSteps - 51;
        } else {
          currPos = (currPos + 1) % 52;
        }
        token.logicalPath.push({ state: currState, position: currPos });
      }
      
      token.state = currState;
      token.position = currPos;
      
      if (token.state === 'finished') {
        finished = true;
      }
    } 
    else if (token.state === 'home_stretch') {
      token.logicalPath = [];
      let p = token.position;
      for (let i = 1; i <= rollResult; i++) {
        p++;
        if (p === 5) {
          token.logicalPath.push({ state: 'finished', position: -1 });
        } else {
          token.logicalPath.push({ state: 'home_stretch', position: p });
        }
      }
      token.position = p;
      
      if (token.position === 5) {
        token.state = 'finished';
        token.position = -1;
        finished = true;
      }
    }

    if (token.state === 'active' && !this.safeCells.includes(token.position)) {
      const victims = this.tokens.filter(t => 
        t.playerId !== token.playerId && 
        t.state === 'active' && 
        t.position === token.position
      );

      if (victims.length > 0) {
        victims.forEach(v => {
          v.state = 'base';
          v.position = -1;
          v.logicalPath = [];
        });
        capture = victims;
      }
    }

    return { success: true, capture, finished, token };
  }
}

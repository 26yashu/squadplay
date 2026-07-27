export class WinDetector {
  constructor(players) {
    this.players = players;
    this.finishedCounts = {};
    players.forEach(p => {
      this.finishedCounts[p.id] = 0;
    });
    this.rankings = [];
  }

  recordFinishedToken(playerId) {
    this.finishedCounts[playerId]++;
    if (this.finishedCounts[playerId] === 4) {
      this.rankings.push(playerId);
      return true; // Player just won
    }
    return false;
  }

  hasPlayerWon(playerId) {
    return this.finishedCounts[playerId] === 4;
  }

  getRankings() {
    return this.rankings;
  }
}

export class RoundManager {
  constructor(players, teamsMode, maxRounds) {
    this.players = players;
    this.teamsMode = teamsMode; // 'ffa' or '2-teams'
    this.maxRounds = maxRounds || 3;
    this.currentRound = 1;
    this.playerIndex = 0;
    
    if (this.teamsMode === '2-teams') {
      this.teamA = { id: 'teamA', name: 'Team A', score: 0, color: 'text-blue-400' };
      this.teamB = { id: 'teamB', name: 'Team B', score: 0, color: 'text-red-400' };
      // Assign players simply by alternating
      this.players.forEach((p, i) => p.teamId = i % 2 === 0 ? 'teamA' : 'teamB');
    }
  }

  getNextTurnInfo() {
    if (this.playerIndex >= this.players.length) {
      this.playerIndex = 0;
      this.currentRound++;
    }
    
    if (this.currentRound > this.maxRounds) {
      return null; // Game Over
    }

    const player = this.players[this.playerIndex];
    const team = this.teamsMode === '2-teams' 
      ? (player.teamId === 'teamA' ? this.teamA : this.teamB)
      : null;
    
    this.playerIndex++;
    
    return {
      round: this.currentRound,
      maxRounds: this.maxRounds,
      actor: player,
      team
    };
  }
}

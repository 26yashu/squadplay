import { BaseStorage } from './baseStorage';
import { xpStorage } from './xpStorage';
import { profileStorage } from './profileStorage';

// Generates mock data for leaderboard, mixes in local user
const MOCK_PLAYERS = [
  { id: 'mock1', name: 'Alex', avatar: 'user', xp: 15400, winRate: 68 },
  { id: 'mock2', name: 'Sarah', avatar: 'user', xp: 12200, winRate: 72 },
  { id: 'mock3', name: 'John_Doe', avatar: 'user', xp: 9800, winRate: 54 },
  { id: 'mock4', name: 'GamerGirl99', avatar: 'user', xp: 18500, winRate: 81 },
  { id: 'mock5', name: 'ProSlayer', avatar: 'user', xp: 22000, winRate: 85 },
];

class LeaderboardStorage extends BaseStorage {
  constructor() {
    super('squadplay_leaderboard', { cached: [] }, 1);
  }

  getOverallLeaderboard() {
    const localUser = {
      id: 'local_user',
      name: profileStorage.get().name || 'Player 1',
      avatar: profileStorage.get().avatar || 'user',
      xp: xpStorage.get().totalXp || 0,
      isLocal: true,
    };

    const combined = [...MOCK_PLAYERS, localUser];
    combined.sort((a, b) => b.xp - a.xp);
    
    // Add rank
    return combined.map((player, index) => ({ ...player, rank: index + 1 }));
  }
  
  getLocalUserRank() {
    const board = this.getOverallLeaderboard();
    const user = board.find(p => p.isLocal);
    return user ? user.rank : '-';
  }
}

export const leaderboardStorage = new LeaderboardStorage();

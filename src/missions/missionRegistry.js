export const MISSIONS = [
  {
    id: 'daily_win',
    title: 'Daily Champion',
    description: 'Win 1 match today.',
    type: 'daily',
    target: 1,
    xpReward: 50,
    condition: (event, data) => event === 'MATCH_COMPLETED' && data.isWin
  },
  {
    id: 'daily_play',
    title: 'Active Player',
    description: 'Play 3 matches today.',
    type: 'daily',
    target: 3,
    xpReward: 30,
    condition: (event, data) => event === 'MATCH_COMPLETED'
  },
  {
    id: 'weekly_streak',
    title: 'Weekly Warrior',
    description: 'Win 10 matches this week.',
    type: 'weekly',
    target: 10,
    xpReward: 200,
    condition: (event, data) => event === 'MATCH_COMPLETED' && data.isWin
  },
  {
    id: 'monthly_xp',
    title: 'Grinder',
    description: 'Earn 5000 XP this month.',
    type: 'monthly',
    target: 5000,
    xpReward: 1000,
    condition: (event, data) => event === 'XP_EARNED',
    valueExtractor: (data) => data.amount || 0
  },
  {
    id: 'special_ludo',
    title: 'Ludo Master',
    description: 'Win a Ludo match.',
    type: 'special',
    target: 1,
    xpReward: 300,
    condition: (event, data) => event === 'MATCH_COMPLETED' && data.gameId === 'ludo' && data.isWin
  },
  {
    id: 'special_quiz',
    title: 'Brainiac',
    description: 'Answer 50 questions correctly.',
    type: 'special',
    target: 50,
    xpReward: 250,
    condition: (event, data) => event === 'QUESTION_ANSWERED' && data.isCorrect,
    valueExtractor: () => 1
  }
];

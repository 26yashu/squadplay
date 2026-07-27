import { Trophy, Star, Zap, Crown, Flame, Target, BookOpen, Calendar, Clock, Smile, Crosshair, Users, Activity, Sparkles, Diamond, TrendingUp, Gamepad2 } from 'lucide-react';

export const ACHIEVEMENTS = [
  // 🏆 GLOBAL
  { id: 'first_blood', title: 'First Victory', description: 'Win your first game.', icon: Trophy, category: 'global', condition: (event, data, stats) => stats.wins === 1 },
  { id: 'five_wins', title: 'Winner', description: 'Win 5 games.', icon: Trophy, category: 'global', condition: (event, data, stats) => stats.wins === 5 },
  { id: 'ten_wins', title: 'Champion', description: 'Win 10 games.', icon: Crown, category: 'global', condition: (event, data, stats) => stats.wins === 10 },
  { id: 'twenty_five_wins', title: 'Grandmaster', description: 'Win 25 games.', icon: Diamond, category: 'global', condition: (event, data, stats) => stats.wins === 25 },
  { id: 'fifty_wins', title: 'Legend', description: 'Win 50 games.', icon: Crown, category: 'global', condition: (event, data, stats) => stats.wins === 50 },
  
  // 🔥 STREAKS
  { id: 'streak_3', title: 'Heating Up', description: 'Achieve a winning streak of 3 games.', icon: Flame, category: 'global', condition: (event, data, stats) => stats.currentStreak >= 3 },
  { id: 'streak_5', title: 'On Fire', description: 'Achieve a winning streak of 5 games.', icon: Flame, category: 'global', condition: (event, data, stats) => stats.currentStreak >= 5 },
  { id: 'streak_10', title: 'Unstoppable', description: 'Achieve a winning streak of 10 games.', icon: Flame, category: 'global', condition: (event, data, stats) => stats.currentStreak >= 10 },
  
  // 📚 QUIZ BATTLE
  { id: 'quiz_novice', title: 'Quiz Novice', description: 'Play your first Quiz Battle.', icon: BookOpen, category: 'quiz-battle', condition: (event, data, stats) => event === 'GAME_COMPLETED' && data.gameId === 'quiz-battle' && stats.gamesPlayed >= 1 },
  { id: 'quiz_master', title: 'Quiz Master', description: 'Play 5 Quiz Battle games.', icon: BookOpen, category: 'quiz-battle', condition: (event, data, stats) => event === 'GAME_COMPLETED' && data.gameId === 'quiz-battle' && stats.gamesPlayed >= 5 },
  { id: 'quiz_god', title: 'Quiz God', description: 'Play 25 Quiz Battle games.', icon: Crown, category: 'quiz-battle', condition: (event, data, stats) => event === 'GAME_COMPLETED' && data.gameId === 'quiz-battle' && stats.gamesPlayed >= 25 },
  { id: 'first_correct', title: 'First Correct Answer', description: 'Answer your first question correctly.', icon: Star, category: 'quiz-battle', condition: (event, data, stats) => event === 'XP_EARNED' && stats.totalAnswers === 1 },
  { id: 'ten_correct', title: 'Rising Star', description: 'Answer 10 questions correctly.', icon: Sparkles, category: 'quiz-battle', condition: (event, data, stats) => event === 'XP_EARNED' && stats.totalAnswers === 10 },
  { id: 'fifty_correct', title: 'Trivia Expert', description: 'Answer 50 questions correctly.', icon: Target, category: 'quiz-battle', condition: (event, data, stats) => event === 'XP_EARNED' && stats.totalAnswers === 50 },
  { id: 'hundred_correct', title: 'Trivia God', description: 'Answer 100 questions correctly.', icon: Crown, category: 'quiz-battle', condition: (event, data, stats) => event === 'XP_EARNED' && stats.totalAnswers === 100 },

  // ⚡ RAPID FIRE
  { id: 'rapid_novice', title: 'Fast Thinker', description: 'Play your first Rapid Fire game.', icon: Zap, category: 'rapid-fire', condition: (event, data, stats) => event === 'GAME_COMPLETED' && data.gameId === 'rapid-fire' && stats.gamesPlayed >= 1 },
  { id: 'rapid_veteran', title: 'Speed Demon', description: 'Play 10 Rapid Fire games.', icon: Zap, category: 'rapid-fire', condition: (event, data, stats) => event === 'GAME_COMPLETED' && data.gameId === 'rapid-fire' && stats.gamesPlayed >= 10 },
  { id: 'rapid_fire_legend', title: 'Lightning Round', description: 'Score over 1000 points in Rapid Fire.', icon: Zap, category: 'rapid-fire', condition: (event, data) => event === 'RAPID_FIRE_SCORE' && data.score >= 1000 },
  
  // 🎡 SPIN WHEEL
  { id: 'first_spin', title: 'Lucky Spin', description: 'Take your first spin.', icon: Star, category: 'spin-wheel', condition: (event, data, stats) => event === 'SPIN_COMPLETED' && stats.roundsPlayed === 1 },
  { id: 'spin_master', title: 'Spin Master', description: 'Complete 10 rounds of Spin Wheel.', icon: Star, category: 'spin-wheel', condition: (event, data, stats) => event === 'SPIN_COMPLETED' && stats.roundsPlayed >= 10 },
  { id: 'spin_addict', title: 'Wheel Addict', description: 'Complete 50 rounds of Spin Wheel.', icon: Star, category: 'spin-wheel', condition: (event, data, stats) => event === 'SPIN_COMPLETED' && stats.roundsPlayed >= 50 },

  // 🎭 CHARADES
  { id: 'charades_novice', title: 'Actor', description: 'Play Charades for the first time.', icon: Users, category: 'charades', condition: (event, data, stats) => event === 'GAME_COMPLETED' && data.gameId === 'charades' && stats.gamesPlayed >= 1 },
  { id: 'charades_master', title: 'Hollywood Star', description: 'Play 10 Charades games.', icon: Users, category: 'charades', condition: (event, data, stats) => event === 'GAME_COMPLETED' && data.gameId === 'charades' && stats.gamesPlayed >= 10 },

  // ⭕ TIC TAC TOE
  { id: 'ttt_first', title: 'Tic Tac Novice', description: 'Play your first Tic Tac Toe game.', icon: Crosshair, category: 'tic-tac-toe', condition: (event, data, stats) => event === 'GAME_COMPLETED' && data.gameId === 'tic-tac-toe' && stats.gamesPlayed >= 1 },
  { id: 'ttt_master', title: 'Tic Tac Master', description: 'Play 10 Tic Tac Toe games.', icon: Crosshair, category: 'tic-tac-toe', condition: (event, data, stats) => event === 'GAME_COMPLETED' && data.gameId === 'tic-tac-toe' && stats.gamesPlayed >= 10 },
  { id: 'ttt_draw', title: 'Stalemate', description: 'Tie a game of Tic Tac Toe.', icon: Activity, category: 'tic-tac-toe', condition: (event, data) => event === 'GAME_COMPLETED' && data.gameId === 'tic-tac-toe' && data.isDraw },

  // 😈 TRUTH OR DARE
  { id: 'tod_first', title: 'Brave Soul', description: 'Play Truth or Dare for the first time.', icon: Flame, category: 'truth-or-dare', condition: (event, data, stats) => event === 'GAME_COMPLETED' && data.gameId === 'truth-or-dare' && stats.gamesPlayed >= 1 },
  { id: 'tod_master', title: 'Daredevil', description: 'Play 10 Truth or Dare games.', icon: Flame, category: 'truth-or-dare', condition: (event, data, stats) => event === 'GAME_COMPLETED' && data.gameId === 'truth-or-dare' && stats.gamesPlayed >= 10 },

  // 📅 DAILY REWARDS
  { id: 'daily_first', title: 'Welcome Back', description: 'Claim your first daily login reward.', icon: Calendar, category: 'global', condition: (event) => event === 'DAILY_LOGIN_REWARD' },
  { id: 'daily_streak_3', title: 'Consistent', description: 'Maintain a 3-day login streak.', icon: Calendar, category: 'global', condition: (event, data) => event === 'DAILY_LOGIN_REWARD' && data.streak >= 3 },
  { id: 'daily_streak_7', title: 'Dedicated', description: 'Maintain a 7-day login streak.', icon: Calendar, category: 'global', condition: (event, data) => event === 'DAILY_LOGIN_REWARD' && data.streak >= 7 },
  { id: 'daily_streak_30', title: 'Addicted', description: 'Maintain a 30-day login streak.', icon: Calendar, category: 'global', condition: (event, data) => event === 'DAILY_LOGIN_REWARD' && data.streak >= 30 },

  // ⬆️ PROGRESSION
  { id: 'level_5', title: 'Level 5', description: 'Reach Level 5.', icon: TrendingUp, category: 'global', condition: (event, data) => event === 'LEVEL_UP' && data.level >= 5 },
  { id: 'level_10', title: 'Level 10', description: 'Reach Level 10.', icon: TrendingUp, category: 'global', condition: (event, data) => event === 'LEVEL_UP' && data.level >= 10 },
  { id: 'level_25', title: 'Level 25', description: 'Reach Level 25.', icon: TrendingUp, category: 'global', condition: (event, data) => event === 'LEVEL_UP' && data.level >= 25 },
  { id: 'level_50', title: 'Level 50', description: 'Reach Level 50.', icon: Diamond, category: 'global', condition: (event, data) => event === 'LEVEL_UP' && data.level >= 50 },
  { id: 'level_100', title: 'Max Level', description: 'Reach Level 100.', icon: Crown, category: 'global', condition: (event, data) => event === 'LEVEL_UP' && data.level >= 100 },

  // 🎉 MILESTONES
  { id: 'play_1', title: 'Just Starting', description: 'Play 1 game.', icon: Gamepad2, category: 'global', condition: (event, data, stats) => stats.gamesPlayed >= 1 },
  { id: 'play_10', title: 'Warming Up', description: 'Play 10 games.', icon: Gamepad2, category: 'global', condition: (event, data, stats) => stats.gamesPlayed >= 10 },
  { id: 'play_50', title: 'Gamer', description: 'Play 50 games.', icon: Gamepad2, category: 'global', condition: (event, data, stats) => stats.gamesPlayed >= 50 },
  { id: 'play_100', title: 'Hardcore Gamer', description: 'Play 100 games.', icon: Gamepad2, category: 'global', condition: (event, data, stats) => stats.gamesPlayed >= 100 },
  
  // 🏆 SPECIAL
  { id: 'flawless_victory', title: 'Perfect Game', description: 'Win a game flawlessly.', icon: Crown, category: 'global', condition: (event, data, stats) => stats.perfectGames >= 1 },
  { id: 'first_achievement', title: 'Achievement Hunter', description: 'Unlock your first achievement.', icon: Trophy, category: 'global', condition: (event, data, stats) => event === 'ACHIEVEMENT_UNLOCKED' && data.totalUnlocked === 1 },
  { id: 'twenty_achievements', title: 'Overachiever', description: 'Unlock 20 achievements.', icon: Star, category: 'global', condition: (event, data, stats) => event === 'ACHIEVEMENT_UNLOCKED' && data.totalUnlocked === 20 }
];

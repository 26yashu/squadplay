import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Flame, Gamepad2, Settings, Star, TrendingUp, Trophy, Edit3, Target, Clock, Medal, Image as ImageIcon } from 'lucide-react';
import { playerRepository } from '../repositories/PlayerRepository';
import { xpStorage } from '../storage/xpStorage';
import { statsRepository } from '../repositories/StatsRepository';
import { historyRepository } from '../repositories/HistoryRepository';
import { getGameById } from '../registry/gameRegistry';
import { xpEngine } from '../engine/core/xpEngine';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { PremiumEmptyState } from '../components/ui/PremiumEmptyState';

const AVATARS = ['😎', '👽', '👾', '🚀', '🔥', '👑', '🦊', '🐉', '👻', '🤖', '💀', '🤡'];

export function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const xp = xpStorage.get();

  useEffect(() => {
    const loadData = async () => {
      const p = await playerRepository.get();
      const s = await statsRepository.get();
      const hData = await historyRepository.get();
      
      setProfile(p);
      setStats(s);
      
      const recent = (hData?.matches || []).sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
      setHistory(recent);
      setNewName(p?.name || 'Player 1');
    };
    loadData();
  }, []);

  if (!profile || !stats) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-hyper-pink border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const progress = xpEngine.getProgress(xp.totalXp);
  const winRate = stats.gamesPlayed > 0 ? Math.round((stats.wins / stats.gamesPlayed) * 100) : 0;
  
  const circumference = 2 * Math.PI * 46;
  const strokeDashoffset = circumference - (progress.percentage / 100) * circumference;

  const handleSaveName = async () => {
    if (newName.trim()) {
      await playerRepository.save({ ...profile, name: newName.trim() });
      setProfile(prev => ({ ...prev, name: newName.trim() }));
    }
    setIsEditingName(false);
  };

  const handleSelectAvatar = async (avatar) => {
    await playerRepository.save({ ...profile, avatar });
    setProfile(prev => ({ ...prev, avatar }));
    setIsAvatarModalOpen(false);
  };

  return (
    <ScreenWrapper>
      <div className="flex items-center justify-between mb-8 z-10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold tracking-widest uppercase">Profile</h1>
        <button onClick={() => navigate('/settings')} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <Settings size={24} />
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center mb-10 relative z-10"
      >
        <div className="relative mb-6 cursor-pointer group" onClick={() => setIsAvatarModalOpen(true)}>
          <svg className="w-32 h-32 transform -rotate-90">
            <circle cx="64" cy="64" r="46" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
            <motion.circle 
              cx="64" cy="64" r="46" 
              stroke="var(--color-hyper-pink)" 
              strokeWidth="6" fill="none"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-hyper-pink to-cyber-teal p-1 shadow-[0_0_30px_rgba(236,72,153,0.6)] group-hover:scale-105 transition-transform overflow-hidden relative">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl overflow-hidden relative z-10">
                <img src="/images/xp_illustration.jpg" alt="XP" className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-50" />
                <span className="relative z-10">{profile.avatar === 'user' ? '😎' : profile.avatar}</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-hyper-pink text-white text-xs font-black px-3 py-1 rounded-full border-2 border-black flex items-center gap-1">
            <Star size={12} className="fill-white" /> LVL {xp.level}
          </div>
          <div className="absolute -top-2 -right-2 bg-white/10 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ImageIcon size={16} />
          </div>
        </div>

        {isEditingName ? (
          <div className="flex items-center gap-2 mb-4">
            <input 
              type="text" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-full px-4 py-1 text-center text-xl font-black text-white focus:outline-none focus:ring-2 focus:ring-hyper-pink"
              autoFocus
            />
            <button onClick={handleSaveName} className="p-2 bg-hyper-pink rounded-full">
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-4 cursor-pointer group" onClick={() => setIsEditingName(true)}>
            <h2 className="text-3xl font-black">{profile.name}</h2>
            <Edit3 size={16} className="text-white/30 group-hover:text-white transition-colors" />
          </div>
        )}
        
        <p className="text-white/60 mb-2 font-medium flex items-center gap-2">
          <Medal size={16} className="text-amber-400" /> Rank: <span className="text-white">Gold III</span>
        </p>

        <div className="w-full max-w-sm flex justify-between text-xs text-white/60 mt-4 px-4">
          <span>{progress.xpInThisLevel} XP</span>
          <span>{progress.requiredForNext} XP to Lvl {progress.level + 1}</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 z-10 relative">
        <div className="bg-white/5 p-4 rounded-3xl border border-white/10 flex flex-col items-center">
          <Gamepad2 className="text-neon-indigo mb-2" size={24} />
          <span className="text-xl font-black">{stats.gamesPlayed}</span>
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Games</span>
        </div>
        <div className="bg-white/5 p-4 rounded-3xl border border-white/10 flex flex-col items-center">
          <Trophy className="text-amber-400 mb-2" size={24} />
          <span className="text-xl font-black">{stats.wins}</span>
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Wins</span>
        </div>
        <div className="bg-white/5 p-4 rounded-3xl border border-white/10 flex flex-col items-center">
          <TrendingUp className="text-emerald-400 mb-2" size={24} />
          <span className="text-xl font-black">{winRate}%</span>
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Win Rate</span>
        </div>
        <div className="bg-white/5 p-4 rounded-3xl border border-white/10 flex flex-col items-center">
          <Flame className="text-hyper-pink mb-2" size={24} />
          <span className="text-xl font-black">{profile.longestLoginStreak || 0}</span>
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Max Streak</span>
        </div>
        <div className="bg-white/5 p-4 rounded-3xl border border-white/10 flex flex-col items-center">
          <Target className="text-cyber-teal mb-2" size={24} />
          <span className="text-xl font-black">{stats.accuracy ? Math.round(stats.accuracy) + '%' : 'N/A'}</span>
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Accuracy</span>
        </div>
        <div className="bg-white/5 p-4 rounded-3xl border border-white/10 flex flex-col items-center">
          <Clock className="text-cosmic-purple mb-2" size={24} />
          <span className="text-xl font-black">{stats.totalPlayTime ? Math.round(stats.totalPlayTime / 60) + 'm' : '0m'}</span>
          <span className="text-[10px] text-white/50 uppercase tracking-wider font-bold">Play Time</span>
        </div>
      </div>

      <div className="mb-8 z-10 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2"><Star size={20} className="text-amber-400" /> Recent Matches</h3>
          <button onClick={() => navigate('/history')} className="text-sm text-white/50 hover:text-white flex items-center transition-colors font-bold">
            View All <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {history.length === 0 ? (
            <PremiumEmptyState 
              icon={Gamepad2}
              title="No Matches Yet"
              message="Play your first game to see history here."
              actionLabel="Play Now"
              actionRoute="/"
            />
          ) : (
            history.map(match => {
              const game = getGameById(match.gameId);
              return (
                <div key={match.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-black/40 ${game?.accentColor || 'text-white'}`}>
                      {game && <game.icon size={20} />}
                    </div>
                    <div>
                      <div className="font-bold">{game?.title || 'Unknown Game'}</div>
                      <div className="text-xs text-white/50">{new Date(match.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-black tracking-wider ${match.isWin ? 'text-emerald-400' : match.isDraw ? 'text-amber-400' : 'text-red-400'}`}>
                      {match.isWin ? 'VICTORY' : match.isDraw ? 'DRAW' : 'DEFEAT'}
                    </div>
                    <div className="text-xs text-white/50">+{match.xpEarned || 0} XP</div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Modal isOpen={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)} title="Choose Avatar">
        <div className="grid grid-cols-4 gap-4 py-4">
          {AVATARS.map(avatar => (
            <button 
              key={avatar}
              onClick={() => handleSelectAvatar(avatar)}
              className={`text-4xl p-3 rounded-2xl transition-all ${profile.avatar === avatar ? 'bg-hyper-pink/20 border-2 border-hyper-pink scale-110' : 'bg-white/5 border-2 border-transparent hover:bg-white/10 hover:scale-105'}`}
            >
              {avatar}
            </button>
          ))}
        </div>
        <Button variant="secondary" className="w-full mt-4" onClick={() => setIsAvatarModalOpen(false)}>Cancel</Button>
      </Modal>
    </ScreenWrapper>
  );
}

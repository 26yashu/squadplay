import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Lock, Trophy } from 'lucide-react';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { useAchievements } from '../achievements/achievementHooks';
import { ACHIEVEMENTS } from '../achievements/achievementRegistry';
import { Card } from '../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

export function AchievementsPage() {
  const navigate = useNavigate();
  const { unlockedDetails } = useAchievements();
  const unlockedIds = unlockedDetails.map(a => a.id);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, unlocked, locked

  const filteredAchievements = ACHIEVEMENTS.filter(ach => {
    const matchesSearch = ach.title.toLowerCase().includes(searchTerm.toLowerCase()) || ach.description.toLowerCase().includes(searchTerm.toLowerCase());
    const isUnlocked = unlockedIds.includes(ach.id);
    
    if (!matchesSearch) return false;
    if (filter === 'unlocked' && !isUnlocked) return false;
    if (filter === 'locked' && isUnlocked) return false;
    
    return true;
  });

  const totalXP = unlockedDetails.reduce((sum, ach) => sum + ach.xpReward, 0);

  return (
    <ScreenWrapper>
      <div className="flex items-center justify-between mb-8 z-10 sticky top-0 bg-theme-bg/80 backdrop-blur-xl pb-4 pt-4 -mx-4 px-4 border-b border-theme-border/50">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full glass-panel hover:bg-white/10 transition">
          <ArrowLeft size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-xl font-black uppercase tracking-widest text-theme-text">Trophy Room</h1>
          <p className="text-xs text-theme-accent font-bold">{unlockedIds.length} / {ACHIEVEMENTS.length} Unlocked</p>
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-full glass-panel border border-amber-500/30 text-amber-400 font-black shadow-[0_0_10px_rgba(245,158,11,0.2)]">
          <Trophy size={20} />
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6 z-10 relative">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-text-muted" />
          <input 
            type="text" 
            placeholder="Search achievements..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-theme-border/50 rounded-2xl py-3 pl-11 pr-4 text-theme-text placeholder-theme-text-muted focus:outline-none focus:border-theme-accent transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          {['all', 'unlocked', 'locked'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border ${filter === f ? 'bg-theme-accent border-theme-accent text-white' : 'glass-panel text-theme-text-muted hover:text-theme-text'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 z-10 relative pb-20">
        {filteredAchievements.length === 0 ? (
          <div className="text-center py-20 opacity-50 flex flex-col items-center">
            <Trophy size={48} className="mb-4 text-theme-text-muted" />
            <p>No achievements found.</p>
          </div>
        ) : (
          <AnimatePresence>
            {filteredAchievements.map((ach, i) => {
              const isUnlocked = unlockedIds.includes(ach.id);
              const Icon = isUnlocked ? ach.icon : Lock;
              
              return (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className={`p-4 flex items-center gap-4 border ${isUnlocked ? 'border-theme-accent/50 bg-theme-accent/10 shadow-[0_0_20px_rgba(var(--theme-accent),0.1)]' : 'border-theme-border/50 bg-theme-card opacity-70'}`}>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${isUnlocked ? 'border-theme-accent bg-theme-accent/20 text-theme-accent' : 'border-white/10 bg-black/40 text-theme-text-muted'}`}>
                      <Icon size={24} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-black ${isUnlocked ? 'text-theme-text' : 'text-theme-text-muted'}`}>{ach.title}</h3>
                      <p className="text-xs text-theme-text-muted leading-snug">{ach.description}</p>
                      
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm ${isUnlocked ? 'bg-theme-accent text-white' : 'bg-white/10 text-theme-text-muted'}`}>
                          +{ach.xpReward} XP
                        </span>
                        {isUnlocked && (
                          <span className="text-[10px] text-theme-text-muted font-medium ml-auto">Unlocked</span>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </ScreenWrapper>
  );
}

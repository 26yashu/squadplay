import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profileStorage } from '../../storage/profileStorage';
import { xpStorage } from '../../storage/xpStorage';
import { useEffect, useState } from 'react';
import { eventBus } from '../../events/eventBus';
import { Settings, Bell } from 'lucide-react';
import { NotificationCenter } from '../ui/NotificationCenter';
import { notificationStorage } from '../../storage/notificationStorage';
import { motionVariants } from '../../lib/motion';

export function Header({ showBack = false, title = 'SquadPlay' }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: 'Player 1', avatar: 'user' });
  const [xpData, setXpData] = useState({ level: 1, xp: 0, currentTierXp: 0, nextTierXp: 100 });
  const [greeting, setGreeting] = useState('Welcome Back');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const update = () => {
      setProfile(profileStorage.get());
      setXpData(xpStorage.get());
      
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');

      setUnreadCount(notificationStorage.get().unread || 0);
    };
    update();
    const unsub1 = eventBus.subscribe('PROFILE_UPDATED', update);
    const unsub2 = eventBus.subscribe('LEVEL_UP', update);
    const unsub3 = eventBus.subscribe('XP_EARNED', update);
    
    // Listen for new notifications to update dot
    const interval = setInterval(() => {
      setUnreadCount(notificationStorage.get().unread || 0);
    }, 2000);

    return () => { unsub1(); unsub2(); unsub3(); clearInterval(interval); };
  }, []);

  const progressPercent = Math.min(100, Math.max(0, ((xpData.xp - xpData.currentTierXp) / (xpData.nextTierXp - xpData.currentTierXp)) * 100));

  return (
    <motion.header 
      variants={motionVariants.fadeDown}
      initial="initial"
      animate="animate"
      className="flex flex-col gap-5 py-4 mb-8"
    >
      <div className="flex items-center justify-between px-2">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="text-white font-medium hover:text-theme-accent transition-colors flex items-center">
            <span className="mr-2 text-xl">&larr;</span> Back
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="relative group">
              <button onClick={() => navigate('/profile')} className="w-14 h-14 rounded-full bg-theme-surface flex items-center justify-center border-2 border-theme-accent hover:border-white transition-all duration-300 cursor-pointer overflow-hidden shadow-[0_0_20px_var(--theme-glow)]">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatar}`} alt="avatar" className="w-12 h-12 group-hover:scale-110 transition-transform duration-300" />
              </button>
              <div className="absolute -bottom-1 -right-1 bg-theme-accent text-white text-xs font-black w-6 h-6 flex items-center justify-center rounded-full border-[3px] border-theme-bg shadow-lg">
                {xpData.level}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm text-theme-text-muted font-bold tracking-wide uppercase mb-0.5">{greeting}</p>
              <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 drop-shadow-sm">
                {profile.name}
              </h1>
            </div>
          </div>
        )}
        
        {!showBack && (
          <div className="flex gap-3 items-center z-50">
            <button onClick={() => setIsNotifOpen(true)} className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:scale-105 transition-all cursor-pointer relative shadow-lg">
              <Bell size={22} />
              {unreadCount > 0 && (
                <div className="absolute top-3 right-3 w-3 h-3 bg-theme-accent rounded-full border-2 border-theme-surface shadow-[0_0_10px_var(--theme-glow)] animate-pulse"></div>
              )}
            </button>
            <button onClick={() => navigate('/settings')} className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 hover:scale-105 transition-all cursor-pointer shadow-lg">
              <Settings size={22} />
            </button>
          </div>
        )}
      </div>

      {!showBack && (
        <div className="mx-2">
          <div className="w-full glass-panel rounded-[24px] p-4 flex flex-col gap-3 shadow-xl border-t border-white/20">
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-[10px] text-theme-text-muted font-bold uppercase tracking-widest mb-1">Current Rank</span>
                <span className="text-theme-accent font-black text-lg drop-shadow-[0_0_8px_var(--theme-glow)]">Gold III</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-theme-text-muted font-bold uppercase tracking-widest mb-1">XP to next</span>
                <span className="text-white font-bold">{xpData.xp} / {xpData.nextTierXp}</span>
              </div>
            </div>
            <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-gradient-to-r from-theme-accent to-theme-pink relative"
              >
                <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)', backgroundSize: '200% 100%' }}></div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </motion.header>
  );
}

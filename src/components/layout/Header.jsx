import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profileStorage } from '../../storage/profileStorage';
import { xpStorage } from '../../storage/xpStorage';
import { useEffect, useState } from 'react';
import { eventBus } from '../../events/eventBus';
import { Settings, Bell } from 'lucide-react';
import { NotificationCenter } from '../ui/NotificationCenter';
import { notificationStorage } from '../../storage/notificationStorage';

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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col gap-4 py-4 mb-6"
    >
      <div className="flex items-center justify-between">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="text-white font-medium hover:text-theme-accent transition-colors flex items-center">
            <span className="mr-2 text-xl">&larr;</span> Back
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => navigate('/profile')} className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border-2 border-theme-accent hover:bg-white/20 transition cursor-pointer overflow-hidden shadow-[0_0_15px_rgba(var(--theme-accent),0.5)]">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatar}`} alt="avatar" className="w-10 h-10" />
              </button>
              <div className="absolute -bottom-1 -right-1 bg-theme-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-black shadow-lg">
                {xpData.level}
              </div>
            </div>
            <div>
              <p className="text-xs text-theme-text-muted font-medium mb-0.5">{greeting},</p>
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-theme-text to-theme-text-muted drop-shadow-md">
                {profile.name}
              </h1>
            </div>
          </div>
        )}
        
        {!showBack && (
          <div className="flex gap-2 items-center z-50">
            <button onClick={() => setIsNotifOpen(true)} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer relative group">
              <Bell size={20} />
              {unreadCount > 0 && (
                <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-theme-accent rounded-full border border-black shadow-[0_0_8px_var(--theme-accent)]"></div>
              )}
            </button>
            <button onClick={() => navigate('/settings')} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition cursor-pointer">
              <Settings size={20} />
            </button>
          </div>
        )}
      </div>

      {!showBack && (
        <div className="w-full glass-panel rounded-2xl p-3 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs font-medium">
            <span className="text-theme-text-muted">Rank: <span className="text-theme-accent font-bold">Gold III</span></span>
            <span className="text-theme-text-muted">{xpData.xp} / {xpData.nextTierXp} XP</span>
          </div>
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-theme-accent to-theme-accent-hover relative"
            >
              <div className="absolute inset-0 bg-white/20 w-full animate-shimmer" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', backgroundSize: '200% 100%' }}></div>
            </motion.div>
          </div>
        </div>
      )}

      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </motion.header>
  );
}

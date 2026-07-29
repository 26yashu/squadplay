import { motion } from 'framer-motion';
import { Home, Gamepad2, Trophy, User, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import { motionVariants } from '../../lib/motion';

const TABS = [
  { id: 'home', icon: Home, label: 'Home', path: '/' },
  { id: 'games', icon: Gamepad2, label: 'Games', path: '/games' },
  { id: 'leaderboard', icon: Trophy, label: 'Rank', path: '/leaderboard' },
  { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
  { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
];

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith('/games')) return 'games';
    if (path.startsWith('/leaderboard')) return 'leaderboard';
    if (path.startsWith('/profile')) return 'profile';
    if (path.startsWith('/settings')) return 'settings';
    return 'home';
  }, [location.pathname]);

  const handleNav = useCallback((tab) => {
    if (activeTab === tab.id) return;
    navigate(tab.path);
  }, [activeTab, navigate]);

  const handleKeyDown = useCallback((e, tab) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNav(tab);
    }
  }, [handleNav]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe pt-6 bg-gradient-to-t from-theme-bg via-theme-bg/80 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto pb-6">
        <div className="glass-panel rounded-full p-2 shadow-2xl flex justify-between items-center relative overflow-hidden border-t border-white/20">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <motion.button
                key={tab.id}
                variants={motionVariants.buttonPress}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleNav(tab)}
                onKeyDown={(e) => handleKeyDown(e, tab)}
                role="button"
                aria-label={tab.label}
                tabIndex={0}
                className="relative flex-1 py-3 rounded-full flex flex-col items-center justify-center transition-all outline-none group"
              >
                <div className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-theme-accent' : 'text-theme-text-muted group-hover:text-white'}`}>
                  <tab.icon size={22} className={isActive ? 'drop-shadow-[0_0_8px_var(--theme-glow)]' : ''} />
                </div>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-theme-accent/20 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

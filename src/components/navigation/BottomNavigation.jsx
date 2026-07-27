import { motion } from 'framer-motion';
import { Home, Gamepad2, Trophy, User, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

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
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-safe pt-2 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto pb-4">
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.05)] flex justify-between items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => handleNav(tab)}
                onKeyDown={(e) => handleKeyDown(e, tab)}
                role="button"
                aria-label={tab.label}
                tabIndex={0}
                className="relative flex-1 py-3 rounded-full flex flex-col items-center justify-center transition-all outline-none group"
              >
                <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'text-white scale-110' : 'text-gray-500 group-hover:text-gray-300 group-hover:scale-105'}`}>
                  <tab.icon size={22} className={isActive ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''} />
                </div>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/10 rounded-[1.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

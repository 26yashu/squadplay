import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, ChevronRight } from 'lucide-react';
import { leaderboardStorage } from '../../../storage/leaderboardStorage';
import { Card } from '../../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { HorizontalCarousel } from '../../../components/ui/HorizontalCarousel';

export function LeaderboardPreviewSection() {
  const [topPlayers, setTopPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app this would fetch global leaderboards.
    // For now, we mock top players or get from local storage if available.
    const localTop = leaderboardStorage.data?.entries || [];
    if (localTop.length >= 3) {
      setTopPlayers(localTop.slice(0, 3));
    } else {
      setTopPlayers([
        { id: '1', name: 'Alex', score: 14500, avatar: '🐉', colorClass: 'text-hyper-pink' },
        { id: '2', name: 'Sam', score: 12200, avatar: '🦊', colorClass: 'text-orange-500' },
        { id: '3', name: 'Jordan', score: 9800, avatar: '🐼', colorClass: 'text-emerald-400' }
      ]);
    }
  }, []);

  if (topPlayers.length < 3) return null;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6 px-4">
        <h3 className="text-2xl font-black">Top Players</h3>
        <button 
          className="text-gray-400 hover:text-white flex items-center text-sm font-bold transition-colors"
          onClick={() => navigate('/leaderboard')}
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      <HorizontalCarousel>
        <div className="flex items-end justify-center gap-2 h-48 mb-4 min-w-max mx-auto px-4 pointer-events-none">
          {/* 2nd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center w-28 shrink-0 pointer-events-auto"
          >
            <div className="text-3xl mb-2 relative">
              {topPlayers[1].avatar}
              <div className="absolute -top-3 -right-3 bg-gray-300 rounded-full p-0.5 text-black">
                <Medal size={14} />
              </div>
            </div>
            <div className="w-full bg-white/5 border border-white/10 rounded-t-lg h-24 flex flex-col items-center justify-end pb-2 backdrop-blur-md">
              <span className="font-bold text-sm text-gray-300 truncate w-full text-center px-1">{topPlayers[1].name}</span>
              <span className="text-xs font-black text-white">{topPlayers[1].score}</span>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center w-32 shrink-0 z-10 pointer-events-auto"
          >
            <div className="text-4xl mb-2 relative">
              {topPlayers[0].avatar}
              <div className="absolute -top-4 -right-3 text-yellow-400 animate-pulse">
                <Trophy size={20} className="drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
              </div>
            </div>
            <div className="w-full bg-gradient-to-t from-yellow-500/20 to-white/10 border border-yellow-500/30 rounded-t-lg h-32 flex flex-col items-center justify-end pb-3 backdrop-blur-md shadow-[0_-5px_20px_rgba(250,204,21,0.15)]">
              <span className="font-black text-md text-yellow-400 truncate w-full text-center px-1 drop-shadow-md">{topPlayers[0].name}</span>
              <span className="text-sm font-black text-white">{topPlayers[0].score}</span>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center w-28 shrink-0 pointer-events-auto"
          >
            <div className="text-2xl mb-2 relative">
              {topPlayers[2].avatar}
              <div className="absolute -top-3 -right-3 bg-amber-700 rounded-full p-0.5 text-white">
                <Medal size={14} />
              </div>
            </div>
            <div className="w-full bg-white/5 border border-white/10 rounded-t-lg h-20 flex flex-col items-center justify-end pb-2 backdrop-blur-md">
              <span className="font-bold text-sm text-gray-400 truncate w-full text-center px-1">{topPlayers[2].name}</span>
              <span className="text-xs font-black text-white">{topPlayers[2].score}</span>
            </div>
          </motion.div>
        </div>
      </HorizontalCarousel>
    </div>
  );
}

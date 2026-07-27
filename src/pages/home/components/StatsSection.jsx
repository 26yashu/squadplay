import { Target, Flame, Zap, Crown } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { motion } from 'framer-motion';
import { statsStorage } from '../../../storage/statsStorage';
import { xpStorage } from '../../../storage/xpStorage';
import { useEffect, useState } from 'react';
import { eventBus } from '../../../events/eventBus';

export function StatsSection() {
  const [stats, setStats] = useState({
    level: 1,
    xp: 0,
    gamesPlayed: 0,
    currentStreak: 0,
    highestScore: 0
  });

  useEffect(() => {
    const update = () => {
      const data = statsStorage.data || {};
      const xpData = xpStorage.data || {};
      
      setStats({
        level: xpData.level || 1,
        xp: xpData.totalXp || 0,
        gamesPlayed: data.gamesPlayed || 0,
        currentStreak: data.currentStreak || 0,
        highestScore: data.highestScore || 0 // assuming highestScore might exist or default to 0
      });
    };
    
    update();
    
    const unsubscribeStats = eventBus.subscribe('MATCH_FINISHED', update);
    const unsubscribeXp = eventBus.subscribe('XP_EARNED', update);
    
    return () => {
      unsubscribeStats();
      unsubscribeXp();
    };
  }, []);

  const items = [
    { icon: Crown, label: "Level", value: stats.level, color: "text-yellow-400" },
    { icon: Zap, label: "Total XP", value: stats.xp.toLocaleString(), color: "text-hyper-pink" },
    { icon: Target, label: "Matches", value: stats.gamesPlayed, color: "text-emerald-400" },
    { icon: Flame, label: "Streak", value: stats.currentStreak, color: "text-orange-500" },
  ];

  return (
    <div className="px-2 mb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((stat, i) => (
          <Card key={i} className="p-4 flex flex-col items-center justify-center text-center bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 backdrop-blur-xl relative overflow-hidden group shadow-lg">
            <div className={`absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 + i }}
            >
              <stat.icon size={28} className={`${stat.color} mb-3 drop-shadow-md`} />
            </motion.div>
            
            <motion.span 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * i, type: "spring" }}
              className="text-3xl font-black mb-1 drop-shadow-lg"
            >
              {stat.value}
            </motion.span>
            
            <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">{stat.label}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

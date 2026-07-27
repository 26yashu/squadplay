import { Target, Flame, Zap, Crown, Clock, Percent, Award, Play } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { motion } from 'framer-motion';
import { statsStorage } from '../../../storage/statsStorage';
import { xpStorage } from '../../../storage/xpStorage';
import { useEffect, useState } from 'react';
import { eventBus } from '../../../events/eventBus';
import { AnimatedCounter } from '../../../components/ui/AnimatedCounter';
import { CircularProgress } from '../../../components/ui/CircularProgress';

export function DashboardWidgets() {
  const [stats, setStats] = useState({
    level: 1,
    xp: 0,
    gamesPlayed: 0,
    currentStreak: 0,
    playTimeMins: 0,
    accuracy: 0,
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
        playTimeMins: Math.floor((data.totalPlayTime || 0) / 60),
        accuracy: data.totalQuestions > 0 ? Math.round((data.correctAnswers / data.totalQuestions) * 100) : 0,
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

  return (
    <div className="px-2 mb-10 flex flex-col gap-4">
      {/* Featured Challenges & Goals */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 flex items-center justify-between glass-panel relative overflow-hidden group">
          <div className="flex flex-col z-10">
            <span className="text-xs text-theme-text-muted font-bold uppercase tracking-wider mb-1">Daily XP</span>
            <span className="text-xl font-black text-theme-text"><AnimatedCounter value={Math.min(500, stats.xp % 500)} /> / 500</span>
          </div>
          <CircularProgress progress={Math.min(100, ((stats.xp % 500) / 500) * 100)} size={48} strokeWidth={4}>
            <Zap size={16} className="text-theme-accent" />
          </CircularProgress>
        </Card>

        <Card className="p-4 flex items-center justify-between glass-panel relative overflow-hidden group">
          <div className="flex flex-col z-10">
            <span className="text-xs text-theme-text-muted font-bold uppercase tracking-wider mb-1">Accuracy</span>
            <span className="text-xl font-black text-theme-text"><AnimatedCounter value={stats.accuracy} />%</span>
          </div>
          <CircularProgress progress={stats.accuracy} size={48} strokeWidth={4} color="#10B981">
            <Percent size={16} className="text-emerald-500" />
          </CircularProgress>
        </Card>
      </div>

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-4 gap-2">
        <StatMini icon={Target} value={<AnimatedCounter value={stats.gamesPlayed} />} label="Matches" color="text-theme-accent" />
        <StatMini icon={Flame} value={<AnimatedCounter value={stats.currentStreak} />} label="Streak" color="text-orange-500" />
        <StatMini icon={Clock} value={<><AnimatedCounter value={stats.playTimeMins} />m</>} label="Play Time" color="text-blue-400" />
        <StatMini icon={Crown} value={stats.level} label="Level" color="text-yellow-400" />
      </div>

      {/* Random Game Banner */}
      <Card className="p-0 overflow-hidden relative border border-theme-border/50 shadow-lg cursor-pointer hover:scale-[1.02] transition-transform">
        <div className="absolute inset-0 bg-gradient-to-r from-theme-accent to-theme-accent-hover opacity-20" />
        <div className="p-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-theme-accent/20 flex items-center justify-center">
              <Play size={20} className="text-theme-accent ml-1" />
            </div>
            <div>
              <h3 className="font-bold text-theme-text">Play Random Game</h3>
              <p className="text-xs text-theme-text-muted">Feeling lucky? Jump right in.</p>
            </div>
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="opacity-50">
            🎲
          </motion.div>
        </div>
      </Card>
    </div>
  );
}

function StatMini({ icon: Icon, value, label, color }) {
  return (
    <div className="glass-panel rounded-xl p-3 flex flex-col items-center justify-center text-center gap-1 border border-white/5 shadow-sm">
      <Icon size={16} className={`${color} mb-1 opacity-80`} />
      <span className="font-bold text-sm text-theme-text leading-none">{value}</span>
      <span className="text-[9px] uppercase tracking-wider text-theme-text-muted font-bold">{label}</span>
    </div>
  );
}

import { Card } from '../../../components/ui/Card';
import { motion } from 'framer-motion';

export function RapidScoreBoard({ player, stats, mode }) {
  const score = stats?.score || 0;
  const combo = stats?.currentStreak || 0;
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        {mode === 'individual' && player ? (
          <>
            <div className={`w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-xl border border-white/20 ring-1 ${player.colorClass}`}>
              {player.avatar}
            </div>
            <div>
              <div className="text-xs text-gray-400">Player</div>
              <div className="font-bold leading-tight">{player.name}</div>
              {combo > 2 && <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-xs text-amber-500 font-bold mt-1">{combo}x Combo!</motion.div>}
            </div>
          </>
        ) : (
          <div>
            <div className="text-xs text-gray-400">Squad Mode</div>
            <div className="font-bold text-lg leading-tight">Team Score</div>
            {combo > 2 && <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-xs text-amber-500 font-bold mt-1">{combo}x Combo!</motion.div>}
          </div>
        )}
      </div>
      
      <Card className="px-4 py-2 bg-black/60 border-orange-500/30 text-orange-500 text-2xl font-black shadow-[0_0_15px_rgba(249,115,22,0.3)]">
        {score}
      </Card>
    </div>
  );
}

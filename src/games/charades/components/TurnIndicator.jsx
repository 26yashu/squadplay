import { motion } from 'framer-motion';

export function TurnIndicator({ turn, mode }) {
  if (!turn) return null;
  const isTeam = mode === '2-teams' && turn.team;
  
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-center mb-6"
    >
      <div className="text-sm text-gray-400 font-bold mb-2 tracking-widest uppercase">
        Round {turn.round} / {turn.maxRounds}
      </div>
      <div className="flex items-center justify-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-black/40 border-2 ${isTeam ? turn.team.color.replace('text-', 'border-') : turn.actor.colorClass.replace('ring-', 'border-')}`}>
          {turn.actor.avatar}
        </div>
        <div className="text-left">
          <div className="font-black text-2xl leading-none">{turn.actor.name}</div>
          {isTeam && <div className={`text-sm font-bold ${turn.team.color}`}>{turn.team.name}</div>}
        </div>
      </div>
    </motion.div>
  );
}

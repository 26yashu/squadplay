import { motion } from 'framer-motion';

export function PlayerCard({ name, avatar, isActive = false, score, colorClass = 'ring-neon-indigo' }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div 
        animate={isActive ? { scale: 1.1 } : { scale: 1 }}
        className={`w-16 h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center text-2xl border-2 ${isActive ? `border-transparent ring-2 ring-offset-2 ring-offset-deep-void ${colorClass}` : 'border-white/20'}`}
      >
        {avatar || name.charAt(0).toUpperCase()}
      </motion.div>
      <div className="text-center">
        <div className="text-sm font-medium text-white">{name}</div>
        {score !== undefined && (
          <div className="text-xs text-neon-indigo font-bold">{score} pts</div>
        )}
      </div>
    </div>
  );
}

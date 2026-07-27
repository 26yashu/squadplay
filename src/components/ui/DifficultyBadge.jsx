import { motion } from 'framer-motion';

export function DifficultyBadge({ difficulty = 'medium', className = '' }) {
  const colors = {
    easy: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    medium: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    hard: 'text-rose-400 border-rose-400/30 bg-rose-400/10'
  };
  
  return (
    <motion.span 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`px-3 py-1 text-xs font-black uppercase tracking-widest rounded-full border backdrop-blur-md shadow-sm ${colors[difficulty] || colors.medium} ${className}`}
    >
      {difficulty}
    </motion.span>
  );
}

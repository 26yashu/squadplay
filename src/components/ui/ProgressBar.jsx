import { motion } from 'framer-motion';

export function ProgressBar({ progress, color = 'bg-neon-indigo', className = '' }) {
  const percentage = Math.max(0, Math.min(100, progress));
  
  return (
    <div className={`w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/5 shadow-inner ${className}`}>
      <motion.div 
        className={`h-full ${color} shadow-[0_0_10px_currentColor]`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      />
    </div>
  );
}

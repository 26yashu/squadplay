import { motion } from 'framer-motion';

export function ProgressBar({ current, total, colorClass = 'bg-neon-indigo' }) {
  const percent = total > 0 ? (current / total) * 100 : 0;
  return (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-6">
      <motion.div 
        className={`h-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

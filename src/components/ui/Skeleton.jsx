import { motion } from 'framer-motion';

export function Skeleton({ className = '', style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      className={`bg-white/10 rounded-xl overflow-hidden relative ${className}`}
      style={style}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </motion.div>
  );
}

import { motion } from 'framer-motion';

export function Pointer({ isSpinning }) {
  // Simple pointer that points downwards (180deg rotation of custom triangle)
  return (
    <motion.div
      className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
      animate={isSpinning ? { y: [0, -5, 0] } : { y: 0 }}
      transition={{ repeat: isSpinning ? Infinity : 0, duration: 0.1 }}
    >
      <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="black" strokeWidth="2" className="rotate-180 drop-shadow-xl text-yellow-400">
        <path d="M12 2L2 22h20L12 2z" />
      </svg>
    </motion.div>
  );
}

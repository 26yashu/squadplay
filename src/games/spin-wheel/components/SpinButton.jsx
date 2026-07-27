import { motion } from 'framer-motion';

export function SpinButton({ onClick, disabled }) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-40 h-16 mt-8 rounded-full font-black text-xl uppercase tracking-widest transition-all
        ${disabled 
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
          : 'bg-yellow-400 text-black shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:bg-yellow-300'}
      `}
    >
      Spin
    </motion.button>
  );
}

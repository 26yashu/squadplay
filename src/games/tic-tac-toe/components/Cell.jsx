import { motion } from 'framer-motion';
import { boardAnimations } from '../../../animations/boardAnimations';

export function Cell({ value, onClick, isWinningCell, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      className={`
        relative w-full aspect-square flex items-center justify-center text-4xl sm:text-6xl font-black rounded-lg transition-all
        ${value ? 'cursor-default' : 'cursor-pointer hover:bg-white/10'}
        ${isWinningCell ? 'bg-teal-500/20 shadow-[0_0_20px_rgba(45,212,191,0.5)]' : 'bg-white/5'}
      `}
    >
      {value && (
        <motion.div
          {...boardAnimations.cellPop}
          className={value === 'X' ? 'text-teal-400' : 'text-purple-400'}
        >
          {value}
        </motion.div>
      )}
    </button>
  );
}

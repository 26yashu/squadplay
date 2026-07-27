import { motion } from 'framer-motion';

export function OptionButton({ option, isSelected, status, onClick, disabled }) {
  // status can be null, 'correct', 'wrong'
  let borderClass = 'border-white/10 hover:border-white/30';
  let bgClass = 'bg-black/30 hover:bg-white/5';
  let textClass = 'text-white';
  
  if (isSelected && !status) {
    borderClass = 'border-neon-indigo';
    bgClass = 'bg-neon-indigo/10';
  } else if (status === 'correct') {
    borderClass = 'border-emerald-success';
    bgClass = 'bg-emerald-success/20';
    textClass = 'text-emerald-success font-bold';
  } else if (status === 'wrong') {
    borderClass = 'border-crimson-error';
    bgClass = 'bg-crimson-error/20';
    textClass = 'text-crimson-error font-bold';
  }
  
  return (
    <motion.button 
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${borderClass} ${bgClass}`}
    >
      <span className={`text-lg font-medium ${textClass}`}>{option}</span>
    </motion.button>
  );
}

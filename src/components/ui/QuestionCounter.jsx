import { motion, AnimatePresence } from 'framer-motion';

export function QuestionCounter({ current, total, className = '' }) {
  return (
    <div className={`flex items-center gap-2 text-sm font-bold text-gray-300 ${className}`}>
      <span className="text-gray-500 uppercase tracking-widest text-[10px]">Question</span>
      <div className="flex items-center bg-white/5 px-3 py-1 rounded-full border border-white/10 shadow-inner">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-white text-base mr-1"
          >
            {current}
          </motion.span>
        </AnimatePresence>
        <span className="text-gray-500">/</span>
        <span className="text-gray-400 ml-1">{total}</span>
      </div>
    </div>
  );
}

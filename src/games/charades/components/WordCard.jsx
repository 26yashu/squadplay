import { motion, AnimatePresence } from 'framer-motion';

export function WordCard({ wordObj }) {
  return (
    <AnimatePresence mode="wait">
      {wordObj && (
        <motion.div 
          key={wordObj.id}
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: -90, opacity: 0 }}
          transition={{ duration: 0.2, type: 'tween' }}
          className="flex-1 flex flex-col items-center justify-center p-8 bg-emerald-success/10 border-4 border-emerald-success rounded-3xl shadow-[0_0_40px_rgba(16,185,129,0.3)] mb-6"
        >
          <div className="text-sm font-bold text-emerald-success uppercase tracking-widest mb-4">
            {wordObj.category}
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-center text-white break-words">
            {wordObj.word}
          </h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

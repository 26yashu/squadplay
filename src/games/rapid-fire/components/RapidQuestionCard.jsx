import { motion } from 'framer-motion';

export function RapidQuestionCard({ question }) {
  return (
    <motion.div 
      key={question}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="bg-black/40 border border-white/10 rounded-2xl p-6 text-center mb-6 shadow-xl"
    >
      <h2 className="text-2xl font-bold leading-tight">{question}</h2>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { QuestionCounter } from '../../../components/ui/QuestionCounter';
import { CategoryBadge } from '../../../components/ui/CategoryBadge';
import { DifficultyBadge } from '../../../components/ui/DifficultyBadge';

export function QuestionCard({ question, current, total, category, difficulty }) {
  return (
    <motion.div 
      key={`q-${current}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center mb-6 shadow-2xl backdrop-blur-md relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <CategoryBadge category={category} />
        <DifficultyBadge difficulty={difficulty} />
      </div>

      <div className="flex justify-center mb-6 relative z-10">
        <QuestionCounter current={current} total={total} />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 relative z-10">
        {question}
      </h2>
    </motion.div>
  );
}

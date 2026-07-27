import { motion } from 'framer-motion';

export function PromptCard({ prompt, onComplete, onSkip }) {
  if (!prompt) return null;
  const isTruth = prompt.type === 'truth';
  
  return (
    <motion.div 
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className={`flex flex-col flex-1 p-8 rounded-3xl border-4 text-center justify-center bg-black/60 shadow-2xl
        ${isTruth ? 'border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.3)]' : 'border-hyper-pink shadow-[0_0_40px_rgba(236,72,153,0.3)]'}`}
    >
      <div className={`text-sm font-bold uppercase tracking-widest mb-6 ${isTruth ? 'text-blue-400' : 'text-hyper-pink'}`}>
        {prompt.type}
      </div>
      
      <h2 className="text-3xl font-bold leading-relaxed mb-12">
        {prompt.prompt || prompt.text}
      </h2>
      
      <div className="mt-auto flex gap-4 w-full">
        <button 
          onClick={onSkip}
          className="flex-1 py-4 rounded-xl font-bold text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          Skip
        </button>
        <button 
          onClick={onComplete}
          className={`flex-[2] py-4 rounded-xl font-bold text-white border-2 hover:bg-white/10 transition-colors
            ${isTruth ? 'bg-blue-500/20 border-blue-500' : 'bg-hyper-pink/20 border-hyper-pink'}`}
        >
          Completed!
        </button>
      </div>
    </motion.div>
  );
}

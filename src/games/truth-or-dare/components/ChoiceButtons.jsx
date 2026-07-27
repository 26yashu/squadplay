import { motion } from 'framer-motion';

export function ChoiceButtons({ onSelect }) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto flex-1 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect('truth')}
        className="w-full py-12 rounded-3xl bg-blue-500/20 border-4 border-blue-500 text-blue-400 font-black text-4xl uppercase tracking-widest shadow-[0_0_30px_rgba(59,130,246,0.3)]"
      >
        Truth
      </motion.button>
      
      <div className="text-center font-bold text-gray-500 text-xl">OR</div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect('dare')}
        className="w-full py-12 rounded-3xl bg-hyper-pink/20 border-4 border-hyper-pink text-hyper-pink font-black text-4xl uppercase tracking-widest shadow-[0_0_30px_rgba(236,72,153,0.3)]"
      >
        Dare
      </motion.button>
    </div>
  );
}

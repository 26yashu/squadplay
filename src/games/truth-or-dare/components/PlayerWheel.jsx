import { motion } from 'framer-motion';

export function PlayerWheel({ player, onReady }) {
  if (!player) return null;
  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="flex flex-col items-center justify-center flex-1"
    >
      <h2 className="text-3xl font-black mb-8 text-hyper-pink tracking-widest uppercase">Next Up</h2>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`w-32 h-32 rounded-full flex items-center justify-center text-6xl border-4 ring-4 ring-offset-8 ring-offset-deep-void mb-8 bg-black/40 ${player.colorClass.replace('ring-', 'border-')}`}
      >
        {player.avatar}
      </motion.div>
      <h3 className="text-4xl font-bold mb-12">{player.name}</h3>
      <button 
        onClick={onReady}
        className="px-12 py-4 bg-hyper-pink hover:bg-pink-600 text-white font-bold rounded-full text-xl shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
      >
        Let's Go!
      </button>
    </motion.div>
  );
}

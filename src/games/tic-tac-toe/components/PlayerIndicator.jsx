import { motion, AnimatePresence } from 'framer-motion';

export function PlayerIndicator({ player }) {
  if (!player) return null;

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Current Turn</div>
      <AnimatePresence mode="wait">
        <motion.div
          key={player.id}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          className={`px-6 py-2 rounded-full border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-3 bg-black/40`}
        >
          <div className="font-black text-2xl" style={{ color: player.symbol === 'X' ? '#2dd4bf' : '#c084fc' }}>
            {player.symbol}
          </div>
          <div className="font-bold text-lg">{player.name}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

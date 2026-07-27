import { motion } from 'framer-motion';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export function WinnerCard({ winner, onNext }) {
  if (!winner) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
    >
      <Card className="w-full max-w-sm p-8 text-center flex flex-col items-center border-t-8 shadow-2xl relative overflow-hidden" style={{ borderColor: winner.color }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundColor: winner.color }} />
        
        <h3 className="text-xl font-bold text-gray-400 mb-2">The Wheel has spoken!</h3>
        <h2 className="text-4xl font-black text-white mb-8 break-words leading-tight drop-shadow-lg">
          {winner.text || winner.title || winner.word || winner.prompt || winner.name}
        </h2>
        
        <Button onClick={onNext} className="w-full py-4 text-xl" style={{ backgroundColor: winner.color, color: '#000' }}>
          Continue
        </Button>
      </Card>
    </motion.div>
  );
}

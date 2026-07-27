import { motion } from 'framer-motion';
import { boardAnimations } from '../../../animations/boardAnimations';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Trophy } from 'lucide-react';

export function WinnerModal({ winner, onRestart, onResults }) {
  if (!winner) return null;

  const isDraw = winner === 'draw';

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
      <motion.div {...boardAnimations.modalEntry} className="w-full max-w-sm">
        <Card className="p-8 text-center flex flex-col items-center border-t-8 border-teal-500 shadow-2xl relative overflow-hidden">
          <Trophy size={48} className="text-teal-400 mb-4" />
          
          {isDraw ? (
            <>
              <h2 className="text-3xl font-black text-white mb-2">It's a Draw!</h2>
              <p className="text-gray-400 mb-8">Nobody wins this round.</p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-bold text-gray-400 mb-2">Winner!</h3>
              <h2 className="text-4xl font-black text-white mb-8">{winner.name}</h2>
            </>
          )}

          <div className="flex flex-col gap-3 w-full">
            <Button onClick={onRestart} className="w-full bg-teal-500 hover:bg-teal-400 text-black font-bold">
              Play Again
            </Button>
            <Button onClick={onResults} variant="secondary" className="w-full border-white/10">
              View Results
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

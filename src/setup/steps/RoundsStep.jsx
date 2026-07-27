import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useGameSession } from '../../hooks/useGameSession';

const ROUND_OPTIONS = [3, 5, 10];

export function RoundsStep({ game, onNext }) {
  const { session, updateSession } = useGameSession();
  const rounds = session.rounds;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">Total Rounds</h3>
        <p className="text-gray-400 mb-6">How long is the game?</p>

        <div className="flex flex-col gap-3">
          {ROUND_OPTIONS.map(r => (
            <Card 
              key={r}
              onClick={() => updateSession({ rounds: r })}
              className={`p-4 cursor-pointer transition-all text-center ${rounds === r ? 'ring-2 ring-white bg-white/10' : 'border-white/5 hover:bg-white/5'}`}
            >
              <span className="font-bold text-xl">{r} Rounds</span>
            </Card>
          ))}
        </div>
      </div>
      <Button onClick={onNext} disabled={!rounds} className="w-full mt-4">
        Continue
      </Button>
    </motion.div>
  );
}

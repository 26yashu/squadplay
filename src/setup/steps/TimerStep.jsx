import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useGameSession } from '../../hooks/useGameSession';

const TIMES = [30, 60, 90];

export function TimerStep({ game, onNext }) {
  const { session, updateSession } = useGameSession();
  const selectedTimer = session.timer;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">Timer Length</h3>
        <p className="text-gray-400 mb-6">How long should the timer run?</p>

        <div className="flex flex-col gap-3">
          {TIMES.map(t => (
            <Card 
              key={t}
              onClick={() => updateSession({ timer: t })}
              className={`p-4 cursor-pointer transition-all text-center ${selectedTimer === t ? 'ring-2 ring-white bg-white/10' : 'border-white/5 hover:bg-white/5'}`}
              role="button"
              tabIndex={0}
            >
              <span className="font-bold text-xl">{t} Seconds</span>
            </Card>
          ))}
        </div>
      </div>
      <Button onClick={onNext} disabled={!selectedTimer} className="w-full mt-4">
        Continue
      </Button>
    </motion.div>
  );
}

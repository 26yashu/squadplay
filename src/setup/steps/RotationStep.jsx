import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useGameSession } from '../../hooks/useGameSession';
import { Shuffle, ArrowRightCircle } from 'lucide-react';

export function RotationStep({ game, onNext }) {
  const { session, updateSession } = useGameSession();
  const rotation = session.rotation;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">Player Rotation</h3>
        <p className="text-gray-400 mb-6">How should players take turns?</p>

        <div className="flex flex-col gap-4">
          <Card 
            className={`p-5 cursor-pointer transition-all ${rotation === 'sequential' ? `ring-2 ring-white bg-white/10` : 'border-white/5 hover:bg-white/5'}`}
            onClick={() => updateSession({ rotation: 'sequential' })}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-black/40 ${rotation === 'sequential' ? game.accentColor : 'text-gray-400'}`}>
                <ArrowRightCircle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Sequential</h4>
                <p className="text-sm text-gray-400">Play in order one by one.</p>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-5 cursor-pointer transition-all ${rotation === 'random' ? `ring-2 ring-white bg-white/10` : 'border-white/5 hover:bg-white/5'}`}
            onClick={() => updateSession({ rotation: 'random' })}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-black/40 ${rotation === 'random' ? game.accentColor : 'text-gray-400'}`}>
                <Shuffle size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Random</h4>
                <p className="text-sm text-gray-400">The game randomly picks the next victim.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Button onClick={onNext} disabled={!rotation} className="w-full mt-4">
        Continue
      </Button>
    </motion.div>
  );
}

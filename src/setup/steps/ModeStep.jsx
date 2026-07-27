import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Users, User } from 'lucide-react';
import { useGameSession } from '../../hooks/useGameSession';

export function ModeStep({ game, onNext }) {
  const { session, updateSession } = useGameSession();
  const selectedMode = session.mode;

  const handleNext = () => {
    if (selectedMode) onNext();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">Game Mode</h3>
        <p className="text-gray-400 mb-6">How do you want to play?</p>

        <div className="flex flex-col gap-4">
          <Card 
            className={`p-5 cursor-pointer transition-all ${selectedMode === 'individual' ? 'ring-2 ring-white bg-white/10' : 'border-white/5 hover:bg-white/5'}`}
            onClick={() => updateSession({ mode: 'individual' })}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-black/40 ${selectedMode === 'individual' ? game.accentColor : 'text-gray-400'}`}>
                <User size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Individual Mode</h4>
                <p className="text-sm text-gray-400">Every player answers separately. Compete for the highest score.</p>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-5 cursor-pointer transition-all ${selectedMode === 'squad' ? 'ring-2 ring-white bg-white/10' : 'border-white/5 hover:bg-white/5'}`}
            onClick={() => updateSession({ mode: 'squad' })}
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-black/40 ${selectedMode === 'squad' ? game.accentColor : 'text-gray-400'}`}>
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Squad Mode</h4>
                <p className="text-sm text-gray-400">Collaborate together as one team to beat the game.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Button onClick={handleNext} disabled={!selectedMode} className="w-full mt-4">
        Continue
      </Button>
    </motion.div>
  );
}

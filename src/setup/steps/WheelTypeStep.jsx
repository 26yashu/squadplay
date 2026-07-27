import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useGameSession } from '../../hooks/useGameSession';

const WHEEL_TYPES = [
  { id: 'player', label: 'Player Wheel', desc: 'Pick a random player' },
  { id: 'challenge', label: 'Challenge Wheel', desc: 'Perform random challenges' },
  { id: 'category', label: 'Category Wheel', desc: 'Select random categories' }
];

export function WheelTypeStep({ game, onNext }) {
  const { session, updateSession } = useGameSession();
  
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">Wheel Type</h3>
        <p className="text-gray-400 mb-6">What do you want to spin?</p>

        <div className="flex flex-col gap-4">
          {WHEEL_TYPES.map(type => (
            <Card 
              key={type.id}
              onClick={() => updateSession({ wheelType: type.id })}
              className={`p-4 cursor-pointer transition-all ${session.wheelType === type.id ? 'ring-2 ring-white bg-white/10' : 'border-white/5 hover:bg-white/5'}`}
            >
              <div className="font-bold text-lg">{type.label}</div>
              <div className="text-sm text-gray-400">{type.desc}</div>
            </Card>
          ))}
        </div>
      </div>
      <Button onClick={onNext} disabled={!session.wheelType} className="w-full mt-4">
        Continue
      </Button>
    </motion.div>
  );
}

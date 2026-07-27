import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useGameSession } from '../../hooks/useGameSession';

const SIZES = [
  { id: '3', label: '3 × 3', desc: 'Classic Mode (Connect 3)' },
  { id: '4', label: '4 × 4', desc: 'Extended Grid (Connect 4)' },
  { id: '5', label: '5 × 5', desc: 'Large Grid (Connect 5)' }
];

export function BoardSizeStep({ game, onNext }) {
  const { session, updateSession } = useGameSession();
  
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">Board Size</h3>
        <p className="text-gray-400 mb-6">Choose the dimensions of the grid.</p>

        <div className="flex flex-col gap-4">
          {SIZES.map(size => (
            <Card 
              key={size.id}
              onClick={() => updateSession({ boardSize: size.id })}
              className={`p-4 cursor-pointer transition-all ${session.boardSize === size.id ? 'ring-2 ring-white bg-white/10' : 'border-white/5 hover:bg-white/5'}`}
            >
              <div className="font-bold text-lg">{size.label}</div>
              <div className="text-sm text-gray-400">{size.desc}</div>
            </Card>
          ))}
        </div>
      </div>
      <Button onClick={onNext} disabled={!session.boardSize} className="w-full mt-4">
        Continue
      </Button>
    </motion.div>
  );
}

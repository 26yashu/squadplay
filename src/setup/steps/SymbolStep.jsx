import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useGameSession } from '../../hooks/useGameSession';
import { usePlayers } from '../../hooks/usePlayers';

export function SymbolStep({ game, onNext }) {
  const { session, updateSession } = useGameSession();
  const { players } = usePlayers();
  
  const player1 = players[0];
  const symbol = session.symbol;

  const selectSymbol = (sym) => {
    updateSession({ symbol: sym });
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col h-full flex-1">
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">Choose Symbol</h3>
        <p className="text-gray-400 mb-6">{player1.name}, choose your symbol.</p>

        <div className="grid grid-cols-2 gap-4">
          <Card 
            onClick={() => selectSymbol('X')}
            className={`p-6 cursor-pointer text-center transition-all ${symbol === 'X' ? 'ring-2 ring-white bg-white/10' : 'border-white/5 hover:bg-white/5'}`}
          >
            <div className="text-6xl font-black mb-2">X</div>
            <div className="text-sm text-gray-400">Play as X</div>
          </Card>

          <Card 
            onClick={() => selectSymbol('O')}
            className={`p-6 cursor-pointer text-center transition-all ${symbol === 'O' ? 'ring-2 ring-white bg-white/10' : 'border-white/5 hover:bg-white/5'}`}
          >
            <div className="text-6xl font-black mb-2">O</div>
            <div className="text-sm text-gray-400">Play as O</div>
          </Card>
        </div>
      </div>
      <Button onClick={onNext} disabled={!symbol} className="w-full mt-4">
        Continue
      </Button>
    </motion.div>
  );
}

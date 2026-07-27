import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { usePlayers } from '../../hooks/usePlayers';
import { useGameSession } from '../../hooks/useGameSession';
import { useNavigate } from 'react-router-dom';

export function ReadyStep({ game }) {
  const { players } = usePlayers();
  const { session } = useGameSession();
  const navigate = useNavigate();

  const isValid = () => {
    if (players.length < (game?.minPlayers || 1)) return false;
    if (game?.supportsMode && !session?.mode) return false;
    if (game?.supportsCategory && !session?.category) return false;
    if (game?.supportsDifficulty && !session?.difficulty) return false;
    if (game?.supportsTimer && !session?.timer) return false;
    if (game?.supportsWheelOptions && !session?.wheelPreset) return false;
    return true;
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col h-full flex-1">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className={`mb-6 p-6 rounded-full bg-white/10 ${game?.accentColor}`}>
          {game?.icon && <game.icon size={64} />}
        </div>
        
        <h3 className="text-3xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Ready to Start!
        </h3>
        <p className="text-gray-300 mb-8">{game?.title}</p>
        
        <Card className="w-full text-left bg-black/40 border-white/10 p-5 mb-8">
          <div className="flex justify-between border-b border-white/10 pb-3 mb-3">
            <span className="text-gray-400">Players</span>
            <span className="font-bold">{players.length}</span>
          </div>
          {game?.supportsMode && (
            <div className="flex justify-between border-b border-white/10 pb-3 mb-3">
              <span className="text-gray-400">Mode</span>
              <span className="font-bold capitalize">{session?.mode}</span>
            </div>
          )}
          {game?.supportsCategory && (
            <div className="flex justify-between border-b border-white/10 pb-3 mb-3">
              <span className="text-gray-400">Category</span>
              <span className="font-bold capitalize">{session?.category}</span>
            </div>
          )}
          {game?.supportsTimer && (
            <div className="flex justify-between border-b border-white/10 pb-3 mb-3">
              <span className="text-gray-400">Timer</span>
              <span className="font-bold">{session?.timer}s</span>
            </div>
          )}
          {game?.supportsDifficulty && (
            <div className="flex justify-between border-b border-white/10 pb-3 mb-3">
              <span className="text-gray-400">Difficulty</span>
              <span className="font-bold">{session?.difficulty}</span>
            </div>
          )}
          {game?.supportsWheelOptions && (
            <div className="flex justify-between border-b border-white/10 pb-3 mb-3">
              <span className="text-gray-400">Options</span>
              <span className="font-bold capitalize">{session?.wheelPreset}</span>
            </div>
          )}
        </Card>
      </div>

      <Button onClick={() => navigate(`/game/${game?.id}`)} disabled={!isValid()} className="w-full py-4 text-lg">
        Start Game
      </Button>
    </motion.div>
  );
}

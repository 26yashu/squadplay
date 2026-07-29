import { motion } from 'framer-motion';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { usePlayers } from '../../hooks/usePlayers';
import { useGameSession } from '../../hooks/useGameSession';
import { useNavigate } from 'react-router-dom';
import { motionVariants } from '../../lib/motion';

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
    <motion.div variants={motionVariants.fadeUp} initial="initial" animate="animate" className="flex flex-col h-full flex-1">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className={`mb-6 p-6 rounded-[28px] bg-theme-accent/20 border-2 border-theme-accent/40 shadow-[0_0_30px_rgba(var(--theme-glow),0.3)] text-theme-accent`}>
          {game?.icon && <game.icon size={64} />}
        </div>
        
        <h3 className="text-4xl font-black mb-2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          Ready to Start!
        </h3>
        <p className="text-theme-accent mb-8 font-bold text-lg uppercase tracking-widest">{game?.title}</p>
        
        <Card className="w-full text-left glass-panel border border-white/20 p-6 mb-8 rounded-[28px] shadow-2xl">
          <div className="flex justify-between border-b border-white/10 pb-4 mb-4">
            <span className="text-theme-text-muted font-bold text-sm uppercase tracking-wider">Players</span>
            <span className="font-black text-white text-lg">{players.length}</span>
          </div>
          {game?.supportsMode && (
            <div className="flex justify-between border-b border-white/10 pb-4 mb-4">
              <span className="text-theme-text-muted font-bold text-sm uppercase tracking-wider">Mode</span>
              <span className="font-black text-white text-lg capitalize">{session?.mode}</span>
            </div>
          )}
          {game?.supportsCategory && (
            <div className="flex justify-between border-b border-white/10 pb-4 mb-4">
              <span className="text-theme-text-muted font-bold text-sm uppercase tracking-wider">Category</span>
              <span className="font-black text-white text-lg capitalize">{session?.category}</span>
            </div>
          )}
          {game?.supportsTimer && (
            <div className="flex justify-between border-b border-white/10 pb-4 mb-4">
              <span className="text-theme-text-muted font-bold text-sm uppercase tracking-wider">Timer</span>
              <span className="font-black text-white text-lg">{session?.timer}s</span>
            </div>
          )}
          {game?.supportsDifficulty && (
            <div className="flex justify-between border-b border-white/10 pb-4 mb-4">
              <span className="text-theme-text-muted font-bold text-sm uppercase tracking-wider">Difficulty</span>
              <span className="font-black text-white text-lg capitalize">{session?.difficulty}</span>
            </div>
          )}
          {game?.supportsWheelOptions && (
            <div className="flex justify-between border-b border-white/10 pb-4 mb-4">
              <span className="text-theme-text-muted font-bold text-sm uppercase tracking-wider">Options</span>
              <span className="font-black text-white text-lg capitalize">{session?.wheelPreset}</span>
            </div>
          )}
        </Card>
      </div>

      <Button onClick={() => navigate(`/game/${game?.id}`)} disabled={!isValid()} className="w-full py-5 text-xl font-black bg-gradient-to-r from-theme-accent to-theme-pink hover:scale-[1.02] active:scale-95 shadow-[0_0_20px_rgba(var(--theme-glow),0.5)] border-0">
        Start Game
      </Button>
    </motion.div>
  );
}

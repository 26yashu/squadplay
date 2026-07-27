import { motion, AnimatePresence } from 'framer-motion';
import { useSpinWheel } from '../hooks/useSpinWheel';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { SpinWheel } from '../components/SpinWheel';
import { WinnerCard } from '../components/WinnerCard';
import { ResultsPage } from './ResultsPage';
import { getGameById } from '../../../registry/gameRegistry';
import { ContentEmptyState } from '../../../components/ui/ContentEmptyState';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function SpinWheelPage() {
  const game = useSpinWheel();
  const gameConfig = getGameById('spin-wheel');
  const navigate = useNavigate();

  if (game.state === 'idle' || game.state === 'loading') {
    return (
      <ScreenWrapper className="flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full" />
      </ScreenWrapper>
    );
  }

  if (game.state === 'error') {
    return (
      <ScreenWrapper className="flex flex-col items-center justify-center p-4">
        <ContentEmptyState 
          title="Content Unavailable" 
          message="The requested dataset is missing or invalid. Please select a different pack or try again." 
          actionLabel="Change Pack"
          onAction={() => navigate(-1)}
        />
        <Button onClick={() => navigate('/')} variant="ghost" className="mt-4 text-gray-400">Return Home</Button>
      </ScreenWrapper>
    );
  }

  if (game.state === 'finished' && game.results) {
    return <ResultsPage results={game.results} gameConfig={gameConfig} />;
  }

  return (
    <ScreenWrapper className="pb-4 flex flex-col h-full min-h-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-xl">{gameConfig.title}</h1>
      </div>
      
      <div className="text-center">
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-2">Round {game.roundsPlayed + 1} / {game.maxRounds}</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <SpinWheel 
          items={game.items} 
          currentRotation={game.currentRotation} 
          duration={game.duration} 
          onSpin={game.spin} 
          isSpinning={game.state === 'spinning'} 
        />
        
        <AnimatePresence>
          {game.state === 'reveal' && (
            <WinnerCard winner={game.lastWinner} onNext={game.nextRound} />
          )}
        </AnimatePresence>
      </div>
    </ScreenWrapper>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { useCharadesGame } from '../hooks/useCharadesGame';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { Button } from '../../../components/ui/Button';
import { WordCard } from '../components/WordCard';
import { CountdownTimer } from '../components/CountdownTimer';
import { TeamScoreBoard } from '../components/TeamScoreBoard';
import { TurnIndicator } from '../components/TurnIndicator';
import { PauseMenu } from '../components/PauseMenu';
import { ResultsPage } from './ResultsPage';
import { getGameById } from '../../../registry/gameRegistry';
import { Pause, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ContentEmptyState } from '../../../components/ui/ContentEmptyState';

export function CharadesPage() {
  const game = useCharadesGame();
  const gameConfig = getGameById('charades');
  const navigate = useNavigate();

  if (game.state === 'idle' || game.state === 'loading') {
    return (
      <ScreenWrapper className="flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-4 border-emerald-success border-t-transparent rounded-full" />
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
    <ScreenWrapper className="pb-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-xl">{gameConfig.title}</h1>
        <button onClick={game.pause} className="p-2 text-gray-400 hover:text-white" aria-label="Pause Game">
          <Pause size={24} />
        </button>
      </div>

      <TeamScoreBoard teamA={game.teamA} teamB={game.teamB} mode={game.mode} />
      
      <div className="flex-1 flex flex-col relative min-h-0 justify-center">
        <AnimatePresence mode="wait">
          {game.state === 'round_start' && game.currentTurn && (
            <motion.div key="ready" className="text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}>
              <TurnIndicator turn={game.currentTurn} mode={game.mode} />
              <Button onClick={game.startTurn} className="w-full max-w-sm mx-auto py-4 text-xl bg-emerald-success text-black hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                Ready!
              </Button>
            </motion.div>
          )}

          {game.state === 'acting' && (
            <motion.div key="acting" className="flex-1 flex flex-col h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CountdownTimer timeRemaining={game.timeRemaining} duration={game.duration} />
              <WordCard wordObj={game.currentWord} />
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <Button onClick={game.passWord} variant="secondary" className="py-6 text-xl border-crimson-error/30 hover:bg-crimson-error/20 text-crimson-error">
                  <X size={28} className="mr-2 inline" /> Pass
                </Button>
                <Button onClick={game.markCorrect} className="py-6 text-xl bg-emerald-success text-black hover:bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <Check size={28} className="mr-2 inline" /> Correct
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {game.state === 'paused' && <PauseMenu onResume={game.resume} onQuit={() => { game.quit(); navigate('/'); }} />}
      </AnimatePresence>
    </ScreenWrapper>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { useTruthOrDare } from '../hooks/useTruthOrDare';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { PlayerWheel } from '../components/PlayerWheel';
import { ChoiceButtons } from '../components/ChoiceButtons';
import { PromptCard } from '../components/PromptCard';
import { PauseMenu } from '../components/PauseMenu';
import { ResultsPage } from './ResultsPage';
import { getGameById } from '../../../config/games';
import { Pause } from 'lucide-react';

import { ContentEmptyState } from '../../../components/ui/ContentEmptyState';
import { Button } from '../../../components/ui/Button';

export function TruthOrDarePage() {
  const game = useTruthOrDare();
  const gameConfig = getGameById('truth-or-dare');

  if (game.state === 'idle' || game.state === 'loading') {
    return (
      <ScreenWrapper className="flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-4 border-hyper-pink border-t-transparent rounded-full" />
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
          onAction={() => window.history.back()}
        />
        <Button onClick={() => window.location.href = '/'} variant="ghost" className="mt-4 text-gray-400">Return Home</Button>
      </ScreenWrapper>
    );
  }

  if (game.state === 'finished') {
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

      <div className="flex-1 flex flex-col relative min-h-0">
        <AnimatePresence mode="wait">
          {game.state === 'player_select' && (
            <motion.div key="player" className="flex-1 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PlayerWheel player={game.currentPlayer} onReady={game.startChoice} />
            </motion.div>
          )}

          {game.state === 'choice' && (
            <motion.div key="choice" className="flex-1 flex flex-col" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}>
              <ChoiceButtons onSelect={game.selectChoice} />
            </motion.div>
          )}

          {game.state === 'active' && game.currentPrompt && (
            <motion.div key="active" className="flex-1 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <PromptCard prompt={game.currentPrompt} onComplete={game.completePrompt} onSkip={game.skipPrompt} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {game.state === 'paused' && <PauseMenu onResume={game.resume} onQuit={game.quit} />}
      </AnimatePresence>
    </ScreenWrapper>
  );
}

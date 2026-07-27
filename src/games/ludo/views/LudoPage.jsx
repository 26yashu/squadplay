import { useState } from 'react';
import { useGameSession } from '../../../hooks/useGameSession';
import { usePlayers } from '../../../hooks/usePlayers';
import { useLudoGame } from '../hooks/useLudoGame';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { getGameById } from '../../../config/games';
import { LudoBoard } from '../components/LudoBoard';
import { Dice } from '../components/Dice';
import { PlayerPanel } from '../components/PlayerPanel';
import { ResultsPage } from './ResultsPage';
import { Button } from '../../../components/ui/Button';
import { ContentEmptyState } from '../../../components/ui/ContentEmptyState';
import { AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LudoPage() {
  const { session, clearSession } = useGameSession();
  const { players } = usePlayers();
  const gameConfig = getGameById('ludo');
  const navigate = useNavigate();

  const handleQuit = () => {
    if (clearSession) clearSession();
    navigate('/');
  };
  
  const {
    state,
    tokens,
    legalMoves,
    currentRoll,
    currentPlayer,
    stats,
    rankings,
    results,
    isRollingDice,
    handleRollDice,
    handleMoveToken,
    hasError,
    errorMessage
  } = useLudoGame(session, players);

  if (hasError) {
    return (
      <ScreenWrapper className="flex items-center justify-center">
        <ContentEmptyState 
          icon={AlertCircle}
          title="Engine Initialization Failed"
          description={errorMessage || "The Ludo engine encountered a critical error. Please return to the home screen and try again."}
          actionLabel="Go Back"
          onAction={handleQuit}
        />
      </ScreenWrapper>
    );
  }

  if (state === 'idle') return <ScreenWrapper className="flex items-center justify-center"><div className="animate-spin w-12 h-12 border-4 border-neon-indigo border-t-transparent rounded-full" /></ScreenWrapper>;

  if (state === 'finished') {
    return <ResultsPage results={results} gameConfig={gameConfig} />; 
  }

  const pColorClass = currentPlayer?.colorClass?.replace('ring-', 'text-') || 'text-white';
  const pBgClass = currentPlayer?.colorClass?.replace('ring-', 'bg-') || 'bg-gray-800';

  return (
    <ScreenWrapper className="pb-4 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-xl">{gameConfig.title}</h1>
        <Button variant="secondary" onClick={handleQuit} className="text-sm px-3 py-1 bg-white/5 border border-white/10 hover:bg-white/10">Quit</Button>
      </div>

      {/* Status Bar */}
      <PlayerPanel currentPlayer={currentPlayer} stats={stats} />

      {/* Board */}
      <div className="flex-1 min-h-0 mb-8 relative">
        <LudoBoard 
          tokens={tokens || []} 
          legalMoves={legalMoves || []} 
          onMoveToken={handleMoveToken} 
        />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center mt-auto">
        {state === 'rolling' && (
           <h3 className={`text-xl font-bold mb-6 animate-pulse ${pColorClass}`}>
             Tap dice to roll!
           </h3>
        )}
        
        {state === 'moving' && currentRoll && (
          <h3 className="text-xl font-bold mb-6">
            Rolled a <span className={`text-3xl font-black mx-2 ${pColorClass}`}>{currentRoll.result}</span>
            {legalMoves?.length === 0 ? <span className="text-gray-400 block text-sm mt-2">No legal moves...</span> : 'Select a token to move!'}
          </h3>
        )}

        <Dice 
          rollResult={currentRoll?.result} 
          isRolling={isRollingDice}
          disabled={state !== 'rolling'}
          onClick={handleRollDice}
          colorClass={pBgClass}
        />
      </div>
    </ScreenWrapper>
  );
}

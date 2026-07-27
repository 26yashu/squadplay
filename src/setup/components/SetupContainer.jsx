import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { getGameById } from '../../config/games';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { SetupHeader } from './SetupHeader';
import { SetupStepper } from './SetupStepper';
import { PlayerStep } from '../steps/PlayerStep';
import { LudoPlayerStep } from '../steps/LudoPlayerStep';
import { ModeStep } from '../steps/ModeStep';
import { CategoryStep } from '../steps/CategoryStep';
import { TimerStep } from '../steps/TimerStep';
import { DifficultyStep } from '../steps/DifficultyStep';
import { WheelOptionsStep } from '../steps/WheelOptionsStep';
import { WheelTypeStep } from '../steps/WheelTypeStep';
import { RotationStep } from '../steps/RotationStep';
import { TeamsStep } from '../steps/TeamsStep';
import { RoundsStep } from '../steps/RoundsStep';
import { ReadyStep } from '../steps/ReadyStep';
import { SymbolStep } from '../steps/SymbolStep';
import { BoardSizeStep } from '../steps/BoardSizeStep';
import { useGameSession } from '../../hooks/useGameSession';

export function SetupContainer() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const game = getGameById(gameId);
  const { updateSession, session, clearSession } = useGameSession();
  
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (!game) {
      navigate('/', { replace: true });
    } else {
      if (!session || typeof session !== 'object' || Array.isArray(session)) {
        clearSession();
      }
      updateSession({ gameId: game.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]); 

  if (!game) {
    return (
      <ScreenWrapper className="flex flex-col items-center justify-center h-full">
        <Loader2 className="w-12 h-12 animate-spin text-neon-indigo mb-4" />
        <h2 className="text-xl font-bold text-gray-300">Loading Configuration...</h2>
      </ScreenWrapper>
    );
  }

  const steps = game.setupSteps;
  const currentStepId = steps[currentStepIndex];

  const goNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(i => i + 1);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(i => i - 1);
    } else {
      navigate('/');
    }
  };

  const renderStep = () => {
    const props = { game, onNext: goNext };
    switch(currentStepId) {
      case 'player': return <PlayerStep {...props} />;
      case 'ludoPlayer': return <LudoPlayerStep {...props} />;
      case 'mode': return <ModeStep {...props} />;
      case 'category': return <CategoryStep {...props} />;
      case 'timer': return <TimerStep {...props} />;
      case 'difficulty': return <DifficultyStep {...props} />;
      case 'wheelOptions': return <WheelOptionsStep {...props} />;
      case 'wheelType': return <WheelTypeStep {...props} />;
      case 'rotation': return <RotationStep {...props} />;
      case 'teams': return <TeamsStep {...props} />;
      case 'rounds': return <RoundsStep {...props} />;
      case 'symbol': return <SymbolStep {...props} />;
      case 'boardSize': return <BoardSizeStep {...props} />;
      case 'ready': return <ReadyStep {...props} />;
      default: return <div>Unknown Step</div>;
    }
  };

  return (
    <ScreenWrapper>
      {game.bgImage && (
        <div className="fixed inset-0 bg-cover bg-center z-[-1] opacity-10 mix-blend-screen pointer-events-none transition-opacity duration-1000" style={{ backgroundImage: `url(${game.bgImage})` }} />
      )}
      <SetupHeader title={game.title} icon={game.icon} onBack={goBack} />
      <SetupStepper steps={steps} currentIndex={currentStepIndex} colorClass={game.accentColor} />
      
      <div className="flex-1 mt-6 relative h-full flex flex-col">
        {renderStep()}
      </div>
    </ScreenWrapper>
  );
}

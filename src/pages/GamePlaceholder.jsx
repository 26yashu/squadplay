import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { Header } from '../components/layout/Header';
import { usePlayers } from '../hooks/usePlayers';
import { useGameSession } from '../hooks/useGameSession';
import { useParams } from 'react-router-dom';
import { getGameById } from '../registry/gameRegistry';
import { Card } from '../components/ui/Card';
import { lazy, Suspense } from 'react';

const QuizBattlePage = lazy(() => import('../games/quiz-battle/views/QuizBattlePage').then(m => ({ default: m.QuizBattlePage })));
const RapidFirePage = lazy(() => import('../games/rapid-fire/views/RapidFirePage').then(m => ({ default: m.RapidFirePage })));
const TruthOrDarePage = lazy(() => import('../games/truth-or-dare/views/TruthOrDarePage').then(m => ({ default: m.TruthOrDarePage })));
const CharadesPage = lazy(() => import('../games/charades/views/CharadesPage').then(m => ({ default: m.CharadesPage })));
const SpinWheelPage = lazy(() => import('../games/spin-wheel/views/SpinWheelPage').then(m => ({ default: m.SpinWheelPage })));
const TicTacToePage = lazy(() => import('../games/tic-tac-toe/views/TicTacToePage').then(m => ({ default: m.TicTacToePage })));
const LudoPage = lazy(() => import('../games/ludo/views/LudoPage').then(m => ({ default: m.LudoPage })));

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="w-12 h-12 border-4 border-hyper-pink border-t-transparent rounded-full animate-spin"></div>
    </div>
  }>
    {children}
  </Suspense>
);

export function GamePlaceholder() {
  const { gameId } = useParams();
  const game = getGameById(gameId);
  const { players } = usePlayers();
  const { session } = useGameSession();
  
  if (gameId === 'quiz-battle') {
    return <SuspenseWrapper><QuizBattlePage /></SuspenseWrapper>;
  }
  
  if (gameId === 'rapid-fire') {
    return <SuspenseWrapper><RapidFirePage /></SuspenseWrapper>;
  }

  if (gameId === 'truth-or-dare') {
    return <SuspenseWrapper><TruthOrDarePage /></SuspenseWrapper>;
  }

  if (gameId === 'charades') {
    return <SuspenseWrapper><CharadesPage /></SuspenseWrapper>;
  }

  if (gameId === 'spin-wheel') {
    return <SuspenseWrapper><SpinWheelPage /></SuspenseWrapper>;
  }

  if (gameId === 'ludo') {
    return <SuspenseWrapper><LudoPage /></SuspenseWrapper>;
  }

  if (gameId === 'tic-tac-toe') {
    return <SuspenseWrapper><TicTacToePage /></SuspenseWrapper>;
  }

  if (!game) return null;

  return (
    <ScreenWrapper>
      <Header showBack title={game.title} />
      <div className="flex-1 flex flex-col items-center justify-center text-center w-full">
        <h2 className="text-3xl font-bold mb-6 text-neon-indigo">Ready to Play!</h2>
        
        <Card className="w-full max-w-sm bg-black/40 border-neon-indigo/30 p-6 text-left mx-auto">
          <h3 className="font-bold text-xl mb-4 border-b border-white/10 pb-2">{game.title}</h3>
          
          <div className="mb-4">
            <span className="text-gray-400 block mb-1">Players ({players.length})</span>
            <div className="flex flex-wrap gap-2">
              {players.map(p => (
                <div key={p.id} className={`flex items-center gap-1 bg-white/10 px-2 py-1 rounded border-l-2 ${p.colorClass.replace('ring-', 'border-')}`}>
                  {p.avatar} <span className="text-sm font-medium">{p.name}</span>
                </div>
              ))}
            </div>
          </div>

          {game.supportsMode && (
            <div className="mb-4">
              <span className="text-gray-400 block mb-1">Mode</span>
              <span className="font-bold capitalize">{session.mode || 'N/A'}</span>
            </div>
          )}

          {game.supportsCategory && (
            <div className="mb-4">
              <span className="text-gray-400 block mb-1">Category</span>
              <span className="font-bold capitalize">{session.category || 'N/A'}</span>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t border-white/10 text-center text-gray-500 text-sm">
            [Game Logic Not Implemented Yet]
          </div>
        </Card>
      </div>
    </ScreenWrapper>
  );
}

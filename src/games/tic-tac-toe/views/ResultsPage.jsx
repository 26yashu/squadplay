import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Button';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { Card } from '../../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { Trophy, Home, RotateCcw } from 'lucide-react';
import { getGameById } from '../../../registry/gameRegistry';

export function ResultsPage({ winner, moves, duration, onRestart }) {
  const navigate = useNavigate();
  const gameConfig = getGameById('tic-tac-toe');
  const isDraw = winner === 'draw';

  return (
    <ScreenWrapper className="pb-4 flex flex-col overflow-y-auto h-full">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 mt-4">
        <Trophy size={64} className={`mx-auto mb-4 ${gameConfig.accentColor}`} />
        <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-500">
          Match Over
        </h1>
        <p className="text-gray-400">Tic Tac Toe Results</p>
      </motion.div>

      <div className="flex flex-col gap-6 mb-8 flex-1 justify-center items-center">
        <Card className="p-8 border-teal-500/50 bg-teal-500/10 text-center shadow-[0_0_30px_rgba(45,212,191,0.2)] w-full max-w-sm">
          {isDraw ? (
            <h2 className="text-3xl font-black text-white">Draw</h2>
          ) : (
            <>
              <h2 className="text-gray-400 mb-2">Winner</h2>
              <div className="text-5xl font-black text-white mb-2">{winner?.name}</div>
              <div className="text-teal-400 font-bold text-xl mb-6">{winner?.symbol}</div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-teal-500/20 pt-6">
            <div>
              <div className="text-gray-400 text-sm">Moves</div>
              <div className="text-2xl font-bold text-white">{moves || 0}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm">Time</div>
              <div className="text-2xl font-bold text-white">{duration || 0}s</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <Button onClick={onRestart} className="w-full py-4 text-lg bg-teal-500 hover:bg-teal-400 text-black">
          <RotateCcw size={20} className="mr-2 inline" /> Play Again
        </Button>
        <Button onClick={() => navigate('/')} variant="secondary" className="w-full border-white/10 hover:bg-white/5 text-white">
          <Home size={20} className="mr-2 inline" /> Return Home
        </Button>
      </div>
    </ScreenWrapper>
  );
}

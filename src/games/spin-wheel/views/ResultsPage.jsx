import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Button';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { Card } from '../../../components/ui/Card';
import { ResultsCard } from '../components/ResultsCard';
import { useNavigate } from 'react-router-dom';
import { Sparkles, RefreshCw, Home } from 'lucide-react';

export function ResultsPage({ results, gameConfig }) {
  const navigate = useNavigate();
  const { stats, roundsPlayed } = results;

  return (
    <ScreenWrapper className="pb-4 flex flex-col overflow-y-auto h-full">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 mt-4">
        <Sparkles size={64} className={`mx-auto mb-4 ${gameConfig.accentColor}`} />
        <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
          Session Over
        </h1>
        <p className="text-gray-400">Spin Wheel Results</p>
      </motion.div>

      <div className="flex flex-col gap-6 mb-8 flex-1">
        <Card className="p-6 border-yellow-400/50 bg-yellow-400/10 text-center shadow-[0_0_30px_rgba(250,204,21,0.2)]">
          <h2 className="text-gray-400 mb-2">Spins</h2>
          <div className="text-6xl font-black text-white mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]">
            {stats.spins || 0}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <ResultsCard title="Rounds" value={roundsPlayed} />
          </div>
        </Card>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <Button onClick={() => window.location.reload()} className="w-full py-4 text-lg bg-yellow-400 hover:bg-yellow-500 text-black">
          <RefreshCw size={20} className="mr-2 inline" /> Spin Again
        </Button>
        <Button onClick={() => navigate('/')} variant="secondary" className="w-full border-white/10 hover:bg-white/5 text-white">
          <Home size={20} className="mr-2 inline" /> Return Home
        </Button>
      </div>
    </ScreenWrapper>
  );
}

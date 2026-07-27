import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Button';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { Card } from '../../../components/ui/Card';
import { ResultsCard } from '../components/ResultsCard';
import { useNavigate } from 'react-router-dom';
import { Sparkles, RefreshCw, Home } from 'lucide-react';

export function ResultsPage({ results, gameConfig }) {
  const navigate = useNavigate();

  return (
    <ScreenWrapper className="pb-4 flex flex-col overflow-y-auto h-full">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 mt-4">
        <Sparkles size={64} className={`mx-auto mb-4 ${gameConfig.accentColor}`} />
        <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-hyper-pink">
          Session Over
        </h1>
        <p className="text-gray-400">Truth or Dare Results</p>
      </motion.div>

      <div className="flex flex-col gap-6 mb-8 flex-1">
        <Card className="p-6 border-hyper-pink/50 bg-hyper-pink/10 text-center shadow-[0_0_30px_rgba(236,72,153,0.2)]">
          <h2 className="text-gray-400 mb-2">Turns Played</h2>
          <div className="text-6xl font-black text-white mb-6 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            {results.turnsPlayed}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <ResultsCard title="Truths" value={results.truthsCompleted} />
            <ResultsCard title="Dares" value={results.daresCompleted} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <ResultsCard title="Skips" value={results.skips} />
            <ResultsCard title="Acc." value={`${results.completionRate}%`} />
            <ResultsCard title="Streak" value={results.longestStreak} />
          </div>
        </Card>
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <Button onClick={() => window.location.reload()} className="w-full py-4 text-lg bg-hyper-pink hover:bg-pink-600 text-white">
          <RefreshCw size={20} className="mr-2 inline" /> Play Again
        </Button>
        <Button onClick={() => navigate('/')} variant="secondary" className="w-full border-white/10 hover:bg-white/5 text-white">
          <Home size={20} className="mr-2 inline" /> Return Home
        </Button>
      </div>
    </ScreenWrapper>
  );
}

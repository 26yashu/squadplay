import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Button';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { Card } from '../../../components/ui/Card';
import { ResultsCard } from '../../quiz-battle/components/ResultsCard';
import { useNavigate } from 'react-router-dom';
import { Trophy, RefreshCw, Home } from 'lucide-react';

export function ResultsPage({ results, gameConfig }) {
  const navigate = useNavigate();

  return (
    <ScreenWrapper className="pb-4 flex flex-col overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 mt-4">
        <Trophy size={64} className={`mx-auto mb-4 ${gameConfig.accentColor}`} />
        <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          Game Over!
        </h1>
        <p className="text-gray-400">Here are the final rankings.</p>
      </motion.div>

      <div className="flex flex-col gap-6 mb-8">
        {results?.map((r, i) => (
          <motion.div 
            key={r.player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`p-5 flex flex-col border-2 ${i === 0 ? 'border-amber-warning bg-amber-warning/10' : 'border-white/5 bg-black/40'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-black text-gray-500 w-6">#{i + 1}</span>
                  <div className={`w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-xl ring-2 ${r.player.colorClass}`}>
                    {r.player.avatar}
                  </div>
                  <span className="font-bold text-lg">{r.player.name}</span>
                </div>
                <span className="text-2xl font-black text-neon-indigo">{r.stats.score}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <ResultsCard title="Captures" value={r.stats.captures} />
                <ResultsCard title="Tokens Finished" value={r.stats.finished} />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-4">
        <Button onClick={() => window.location.reload()} className="w-full py-4 text-lg">
          <RefreshCw size={20} className="mr-2 inline" /> Play Again
        </Button>
        <Button onClick={() => navigate('/')} variant="secondary" className="w-full border-white/10 hover:bg-white/5">
          <Home size={20} className="mr-2 inline" /> Return Home
        </Button>
      </div>
    </ScreenWrapper>
  );
}

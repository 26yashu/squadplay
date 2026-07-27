import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Button';
import { ScreenWrapper } from '../../../components/layout/ScreenWrapper';
import { Card } from '../../../components/ui/Card';
import { ResultsCard } from '../components/ResultsCard';
import { useNavigate } from 'react-router-dom';
import { Flame, RefreshCw, Home } from 'lucide-react';

export function ResultsPage({ results, mode, gameConfig }) {
  const navigate = useNavigate();

  return (
    <ScreenWrapper className="pb-4 flex flex-col overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 mt-4">
        <Flame size={64} className={`mx-auto mb-4 ${gameConfig.accentColor}`} />
        <h1 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
          Time's Up!
        </h1>
        <p className="text-gray-400">Rapid Fire Results</p>
      </motion.div>

      {mode === 'individual' ? (
        <div className="flex flex-col gap-6 mb-8">
          {results.map((r, i) => (
            <motion.div 
              key={r.player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={`p-5 flex flex-col border-2 ${i === 0 ? 'border-orange-500 bg-orange-500/10' : 'border-white/5 bg-black/40'}`}>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-gray-500 w-6">#{i + 1}</span>
                    <div className={`w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-xl ring-2 ${r.player.colorClass}`}>
                      {r.player.avatar}
                    </div>
                    <span className="font-bold text-lg">{r.player.name}</span>
                  </div>
                  <span className="text-3xl font-black text-orange-500">{r.stats.score}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <ResultsCard title="Answered" value={r.stats.correct + r.stats.wrong} subtitle={`${r.stats.accuracy}% Acc`} />
                  <ResultsCard title="Correct" value={r.stats.correct} subtitle={`${r.stats.bestStreak || 0} Best Streak`} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <ResultsCard title="Avg Time" value={`${(r.stats.avgTime / 1000).toFixed(1)}s`} />
                  <ResultsCard title="Speed Bonus" value={`+${r.stats.speedBonus || 0} XP`} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6 mb-8">
          <Card className="p-6 border-orange-500/50 bg-orange-500/10 text-center shadow-[0_0_30px_rgba(249,115,22,0.2)]">
            <h2 className="text-gray-400 mb-2">Squad Score</h2>
            <div className="text-6xl font-black text-white mb-6 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
              {results.stats.score}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ResultsCard title="Answered" value={results.stats.correct + results.stats.wrong} subtitle={`${results.stats.accuracy}% Acc`} />
              <ResultsCard title="Correct" value={results.stats.correct} subtitle={`${results.stats.bestStreak || 0} Best Streak`} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <ResultsCard title="Avg Time" value={`${(results.stats.avgTime / 1000).toFixed(1)}s`} />
              <ResultsCard title="Speed Bonus" value={`+${results.stats.speedBonus || 0} XP`} />
            </div>
          </Card>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-4">
        <Button onClick={() => window.location.reload()} className="w-full py-4 text-lg bg-orange-500 hover:bg-orange-600 text-black">
          <RefreshCw size={20} className="mr-2 inline" /> Play Again
        </Button>
        <Button onClick={() => navigate('/')} variant="secondary" className="w-full border-white/10 hover:bg-white/5">
          <Home size={20} className="mr-2 inline" /> Return Home
        </Button>
      </div>
    </ScreenWrapper>
  );
}

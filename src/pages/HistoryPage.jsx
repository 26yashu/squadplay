import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Calendar, Clock, Trophy } from 'lucide-react';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { historyRepository } from '../repositories/HistoryRepository';
import { getGameById } from '../registry/gameRegistry';
import { Skeleton } from '../components/ui/Skeleton';
import { PremiumEmptyState } from '../components/ui/PremiumEmptyState';

export function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'wins', 'losses'
  
  useEffect(() => {
    historyRepository.get().then(data => {
      setHistory(data.matches || []);
      setLoading(false);
    });
  }, []);
  
  const filteredHistory = useMemo(() => {
    return history.filter(match => {
      const game = getGameById(match.gameId);
      const gameName = game?.title?.toLowerCase() || '';
      
      const matchesSearch = gameName.includes(search.toLowerCase());
      const matchesFilter = 
        filterMode === 'all' ? true :
        filterMode === 'wins' ? match.isWin :
        filterMode === 'losses' ? (!match.isWin && !match.isDraw) : true;
        
      return matchesSearch && matchesFilter;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [history, search, filterMode]);

  return (
    <ScreenWrapper>
      <div className="flex items-center justify-between mb-6 z-10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold tracking-widest uppercase drop-shadow-md">Match History</h1>
        <div className="p-2 rounded-full opacity-0 pointer-events-none"><ArrowLeft size={24} /></div>
      </div>

      <div className="flex gap-2 mb-6 z-10 relative">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
          <input 
            type="text" 
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-neon-indigo transition-all backdrop-blur-md"
          />
        </div>
        <div className="flex bg-white/10 p-1 rounded-full border border-white/20 backdrop-blur-md">
          {['all', 'wins', 'losses'].map(mode => (
            <button
              key={mode}
              onClick={() => setFilterMode(mode)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all ${filterMode === mode ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 z-10 relative pb-10">
        {loading ? (
          <>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </>
        ) : filteredHistory.length === 0 ? (
          <PremiumEmptyState 
            icon={Trophy}
            title="No Matches Found" 
            message="We couldn't find any match history for this criteria. Start playing some games!"
            actionLabel="Play Now"
            actionRoute="/"
          />
        ) : (
          filteredHistory.map((match, index) => {
            const game = getGameById(match.gameId);
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={match.id} 
                className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl bg-black/40 ${game?.accentColor || 'text-white'} shadow-inner`}>
                      {game ? <game.icon size={24} /> : <Trophy size={24} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{game?.title || 'Unknown Game'}</h3>
                      <div className="flex items-center gap-2 text-xs text-white/50 font-medium">
                        <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(match.date).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> {new Date(match.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider shadow-sm ${
                    match.isWin ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                    match.isDraw ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {match.isWin ? 'VICTORY' : match.isDraw ? 'DRAW' : 'DEFEAT'}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm bg-black/20 p-3 rounded-2xl">
                  <div className="flex flex-col">
                    <span className="text-white/40 text-xs">Score</span>
                    <span className="font-bold text-white">{match.score || 0}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/40 text-xs">Players</span>
                    <span className="font-bold text-white">{match.players?.length || 1}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/40 text-xs">Difficulty</span>
                    <span className="font-bold text-white capitalize">{match.settings?.difficulty || 'Normal'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white/40 text-xs">Duration</span>
                    <span className="font-bold text-white">{match.duration || '< 1m'}</span>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </ScreenWrapper>
  );
}

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { leaderboardStorage } from '../storage/leaderboardStorage';
import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { PremiumEmptyState } from '../components/ui/PremiumEmptyState';

export function LeaderboardPage() {
  const navigate = useNavigate();
  const board = leaderboardStorage.getOverallLeaderboard();
  const [search, setSearch] = useState('');
  
  const filteredBoard = useMemo(() => {
    return board.filter(player => player.name.toLowerCase().includes(search.toLowerCase()));
  }, [board, search]);

  const top3 = search === '' ? board.slice(0, 3) : [];
  const rest = search === '' ? board.slice(3) : filteredBoard;

  return (
    <ScreenWrapper>
      <div className="flex items-center justify-between mb-6 z-10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold tracking-widest uppercase">Global Ranks</h1>
        <div className="p-2 rounded-full bg-white/10 opacity-0 pointer-events-none">
          <ArrowLeft size={24} />
        </div>
      </div>

      <div className="mb-8 z-10 relative">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input 
              type="text" 
              placeholder="Search players..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all backdrop-blur-md"
            />
          </div>
          
          <div className="flex gap-2 w-full">
            <div className="flex flex-1 bg-white/10 p-1 rounded-full border border-white/20 backdrop-blur-md">
              {['Global', 'Local'].map(mode => (
                <button
                  key={mode}
                  className={`flex-1 py-2 rounded-full text-xs font-bold uppercase transition-all ${mode === 'Global' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="flex flex-1 bg-white/10 p-1 rounded-full border border-white/20 backdrop-blur-md">
              {['All Time', 'Weekly', 'Daily'].map(mode => (
                <button
                  key={mode}
                  className={`flex-1 py-2 rounded-full text-xs font-bold uppercase transition-all ${mode === 'All Time' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Podium */}
      {top3.length > 0 && (
        <div className="flex justify-center items-end gap-2 sm:gap-4 mb-12 h-48 z-10 relative">
          {/* Second Place */}
          {top3[1] && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col items-center flex-1 max-w-[100px]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-300 p-1 mb-2 relative">
                <div className="absolute inset-0 bg-[url('/images/xp_illustration.jpg')] bg-cover mix-blend-screen opacity-50 rounded-full blur-md"></div>
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xl relative z-10">🥈</div>
              </div>
              <div className="w-full h-24 bg-gradient-to-t from-white/10 to-gray-400/30 rounded-t-lg border-t-4 border-gray-300 flex flex-col items-center justify-start pt-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/xp_illustration.jpg')] bg-cover bg-center opacity-30 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                <span className="font-bold text-sm truncate w-full text-center px-1 relative z-10">{top3[1].name}</span>
                <span className="text-xs text-white/60 relative z-10">{top3[1].xp} XP</span>
              </div>
            </motion.div>
          )}

          {/* First Place */}
          {top3[0] && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col items-center flex-1 max-w-[110px] z-10">
              <div className="absolute -top-6 text-yellow-400 animate-bounce"><Crown size={24} /></div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-yellow-400 p-1 mb-2 shadow-[0_0_30px_rgba(250,204,21,0.4)] relative">
                <div className="absolute inset-0 bg-[url('/images/xp_illustration.jpg')] bg-cover mix-blend-screen opacity-60 rounded-full blur-md"></div>
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-2xl relative z-10">🥇</div>
              </div>
              <div className="w-full h-32 bg-gradient-to-t from-white/10 to-yellow-400/30 rounded-t-lg border-t-4 border-yellow-400 flex flex-col items-center justify-start pt-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/xp_illustration.jpg')] bg-cover bg-center opacity-40 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                <span className="font-bold text-sm sm:text-base truncate w-full text-center px-1 relative z-10">{top3[0].name}</span>
                <span className="text-xs text-white/60 relative z-10">{top3[0].xp} XP</span>
              </div>
            </motion.div>
          )}

          {/* Third Place */}
          {top3[2] && (
            <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="flex flex-col items-center flex-1 max-w-[100px]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-600 p-1 mb-2 relative">
                <div className="absolute inset-0 bg-[url('/images/xp_illustration.jpg')] bg-cover mix-blend-screen opacity-40 rounded-full blur-md"></div>
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xl relative z-10">🥉</div>
              </div>
              <div className="w-full h-20 bg-gradient-to-t from-white/10 to-amber-600/30 rounded-t-lg border-t-4 border-amber-600 flex flex-col items-center justify-start pt-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/xp_illustration.jpg')] bg-cover bg-center opacity-30 mix-blend-screen" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
                <span className="font-bold text-sm truncate w-full text-center px-1 relative z-10">{top3[2].name}</span>
                <span className="text-xs text-white/60 relative z-10">{top3[2].xp} XP</span>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-3 z-10 relative">
        {rest.length === 0 ? (
          <PremiumEmptyState 
            icon={Search}
            title="No Players Found" 
            message="No one matches that search. Try a different query."
            actionLabel="Clear Search"
            onAction={() => setSearch('')}
          />
        ) : (
          rest.map((player) => (
            <motion.div 
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-2xl border flex items-center justify-between ${player.isLocal ? 'bg-hyper-pink/10 border-hyper-pink/30' : 'bg-white/5 border-white/10'}`}
            >
              <div className="flex items-center gap-4">
                <div className="text-lg font-black text-white/50 w-6">{player.rank}</div>
                <div className="font-bold">{player.name} {player.isLocal && <span className="text-xs bg-hyper-pink text-white px-2 py-0.5 rounded-full ml-2">YOU</span>}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-cyber-blue">{player.xp} XP</div>
                <div className="text-xs text-white/50">{player.winRate}% Win</div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </ScreenWrapper>
  );
}

function Crown({ size }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="2 4 6 16 12 8 18 16 22 4 22 20 2 20 2 4"></polygon></svg>;
}

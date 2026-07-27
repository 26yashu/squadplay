import { memo } from 'react';
import { motion } from 'framer-motion';
import { Card } from './Card';
import { useNavigate } from 'react-router-dom';
import { Lock, Users, Zap } from 'lucide-react';

export const GameCard = memo(function GameCard({ game }) {
  const navigate = useNavigate();
  const disabled = game.comingSoon || game.available === false;
  
  const bgClass = game.accentColor?.replace('text-', 'bg-') || 'bg-white';
  const fromClass = game.accentColor?.replace('text-', 'from-') || 'from-white/20';

  console.log(`[GameCard] Rendering ${game.id}, disabled: ${disabled}`);

  return (
    <motion.div 
      whileHover={!disabled ? { y: -8, scale: 1.03 } : {}} 
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`h-full relative group ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={() => !disabled && navigate(`/setup/${game.id}`)}
    >
      {!disabled && (
        <div className={`absolute -inset-1 ${bgClass}/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
      )}
      
      <Card 
        className={`h-full flex flex-col relative overflow-hidden transition-all duration-500 p-0
          ${!disabled ? `bg-black/60 border-white/10 hover:border-white/30 backdrop-blur-2xl shadow-xl` : 'border-white/5 bg-black/80'}
        `}
      >
        {/* Full bleed artwork / gradient */}
        {game.bgImage ? (
          <>
            <div className="absolute inset-0 bg-cover bg-center z-0 opacity-60 mix-blend-screen" style={{ backgroundImage: `url(${game.bgImage})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />
            <div className={`absolute inset-0 bg-gradient-to-br ${fromClass}/40 to-transparent z-0`} />
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${fromClass}/30 to-black z-0`} />
        )}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay z-0" />
        
        {/* Icon in Background */}
        <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 pointer-events-none z-0">
          {game.icon && <game.icon size={160} className={disabled ? 'text-gray-500' : game.accentColor} />}
        </div>
        
        <div className="relative z-10 flex flex-col h-full p-4">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 shadow-lg ${disabled ? 'text-gray-400' : game.accentColor}`}>
               {disabled ? <Lock size={24} /> : game.icon && <game.icon size={24} />}
            </div>
            
            {!disabled && (
              <div className="flex flex-col gap-2 items-end">
                {game.xpRewards?.win && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-black text-hyper-pink border border-white/10">
                    <Zap size={10} className="fill-current" /> {game.xpRewards.win}
                  </span>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-auto">
            <h3 className="font-black text-xl leading-tight mb-1 text-white drop-shadow-md">{game.title}</h3>
            <p className="text-xs text-gray-400 font-medium mb-3 line-clamp-2">{game.subtitle}</p>
            
            <div className="flex items-center gap-2">
              {disabled ? (
                <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold text-gray-400 uppercase tracking-wider">Coming Soon</span>
              ) : (
                <>
                  {game.minPlayers && (
                    <span className="px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded flex items-center gap-1 text-[10px] font-bold text-gray-300">
                      <Users size={12} />
                      {game.minPlayers}{game.maxPlayers ? `-${game.maxPlayers}` : '+'}
                    </span>
                  )}
                  {game.tags && game.tags[0] && (
                    <span className={`px-2 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold ${game.accentColor}`}>
                      {game.tags[0]}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

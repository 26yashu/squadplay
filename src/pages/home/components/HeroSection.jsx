import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function HeroSection({ game }) {
  const navigate = useNavigate();

  if (!game) return null;

  return (
    <div className="relative mb-8 mt-2 px-2">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl min-h-[360px] flex flex-col justify-end p-6 border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.2)]"
      >
        {/* Animated Background Gradients & Glow */}
        {game.bgImage ? (
          <>
            <div className="absolute inset-0 bg-cover bg-center z-0 opacity-80 mix-blend-screen" style={{ backgroundImage: `url(${game.bgImage})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-0" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-black to-fuchsia-600/20 z-0" />
        )}
        <motion.div 
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-500/40 rounded-full blur-[80px] pointer-events-none z-0"
        />
        <motion.div 
          animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-64 h-64 bg-fuchsia-500/30 rounded-full blur-[80px] pointer-events-none z-0"
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay z-0 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-white/10 backdrop-blur-md rounded border border-white/20 text-[10px] font-black text-white uppercase tracking-wider shadow-lg">
              Featured
            </span>
            {game.tags?.[0] && (
              <span className="px-2 py-1 bg-black/40 backdrop-blur-md rounded border border-white/10 text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                {game.tags[0]}
              </span>
            )}
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black mb-2 leading-tight drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-gray-300">
            {game.title}
          </h2>
          
          <p className="text-gray-300 mb-6 font-medium text-sm sm:text-base max-w-[85%] leading-relaxed drop-shadow-md">
            {game.subtitle || "Experience the ultimate showdown with friends and family."}
          </p>

          <Button 
            onClick={() => navigate(`/setup/${game.id}`)} 
            className="w-full sm:w-auto px-10 py-4 text-lg font-black bg-white hover:bg-gray-100 text-black border-none relative overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            <div className="flex items-center justify-center gap-2">
              {game.icon && <game.icon size={20} />}
              PLAY NOW
            </div>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

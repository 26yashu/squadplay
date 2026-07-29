import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { motionVariants } from '../../../lib/motion';

export function HeroSection({ game }) {
  const navigate = useNavigate();

  if (!game) return null;

  return (
    <div className="relative mb-8 mt-2 px-2">
      <motion.div 
        variants={motionVariants.scaleIn}
        initial="initial"
        animate="animate"
        className="relative overflow-hidden rounded-[32px] min-h-[400px] flex flex-col justify-end p-8 border border-white/10 shadow-2xl group"
      >
        {/* Animated Background Gradients & Glow */}
        {game.bgImage ? (
          <>
            <div className="absolute inset-0 bg-cover bg-center z-0 opacity-80 mix-blend-screen transition-transform duration-[2s] ease-out group-hover:scale-105" style={{ backgroundImage: `url(${game.bgImage})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/60 to-transparent z-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-theme-bg/80 to-transparent z-0" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-theme-accent/30 via-theme-bg to-theme-secondary/20 z-0" />
        )}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay z-0 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1.5 bg-theme-accent/20 backdrop-blur-xl rounded-lg border border-theme-accent/50 text-[10px] font-black text-theme-accent uppercase tracking-widest shadow-[0_0_15px_var(--theme-glow)]">
              Featured
            </span>
            {game.tags?.[0] && (
              <span className="px-3 py-1.5 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 text-[10px] font-bold text-gray-200 uppercase tracking-widest">
                {game.tags[0]}
              </span>
            )}
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-black mb-3 leading-tight drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">
            {game.title}
          </h2>
          
          <p className="text-theme-text-muted mb-8 font-medium text-sm sm:text-base max-w-[85%] leading-relaxed drop-shadow-md">
            {game.subtitle || "Experience the ultimate showdown with friends and family."}
          </p>

          <Button 
            onClick={() => navigate(`/setup/${game.id}`)} 
            variant="primary"
            className="w-full sm:w-auto px-10 py-4 text-lg !rounded-[24px]"
          >
            <div className="flex items-center justify-center gap-2">
              {game.icon && <game.icon size={22} />}
              PLAY NOW
            </div>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

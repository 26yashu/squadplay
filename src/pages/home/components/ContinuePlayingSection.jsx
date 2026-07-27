import { motion } from 'framer-motion';
import { HorizontalCarousel } from '../../../components/ui/HorizontalCarousel';
import { Play } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useGameSession } from '../../../hooks/useGameSession';
import { getGameById } from '../../../registry/gameRegistry';
import { useNavigate } from 'react-router-dom';

export function ContinuePlayingSection() {
  const { session } = useGameSession();
  const navigate = useNavigate();

  if (!session || !session.gameId) {
    return null;
  }

  const game = getGameById(session.gameId);
  if (!game) return null;

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-black mb-6 px-4 text-white">Continue Playing</h3>
      
      <HorizontalCarousel>
        <Card className="p-0 bg-white/5 hover:bg-white/10 transition-colors border-white/10 backdrop-blur-xl min-w-[320px] flex-shrink-0 snap-start relative group shadow-xl pointer-events-auto overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${game.accentColor.replace('text-', 'from-').replace('-500', '-600')}/20 to-transparent opacity-50 z-0 pointer-events-none`} />
          
          <div className="p-5 flex items-center justify-between relative z-10 pointer-events-none">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center ${game.accentColor} shadow-inner`}>
                <game.icon size={28} className="drop-shadow-md" />
              </div>
              <div>
                <h4 className="font-bold text-xl leading-tight mb-1 text-white">{game.title}</h4>
                <p className="text-xs font-bold text-gray-400 tracking-wide uppercase">Match in progress</p>
              </div>
            </div>
            <Button 
              onClick={(e) => { e.stopPropagation(); navigate(`/play/${game.id}`); }} 
              className={`w-12 h-12 rounded-full p-0 flex items-center justify-center ${game.accentColor.replace('text-', 'bg-')} text-white hover:scale-110 transition-transform shadow-lg border-none pointer-events-auto`}
            >
              <Play size={20} className="fill-current ml-1" />
            </Button>
          </div>
          
          <div className="h-1.5 w-full bg-black/40 relative z-10 pointer-events-none">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              className={`h-full shadow-[0_0_10px_currentColor] ${game.accentColor.replace('text-', 'bg-')}`} 
            />
          </div>
        </Card>
      </HorizontalCarousel>
    </div>
  );
}

import { Lock, Trophy } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { HorizontalCarousel } from '../../../components/ui/HorizontalCarousel';
import { useAchievements } from '../../../achievements/achievementHooks';
import { ACHIEVEMENTS } from '../../../achievements/achievementRegistry';
import { useNavigate } from 'react-router-dom';

export function AchievementsSection() {
  const { unlockedDetails } = useAchievements();
  const navigate = useNavigate();
  
  const recentAchievements = unlockedDetails.slice(0, 5);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between px-4 mb-4">
        <h3 className="text-xl font-black text-theme-text flex items-center gap-2">
          <Trophy size={20} className="text-amber-400" /> Recent Achievements
        </h3>
        <button onClick={() => navigate('/achievements')} className="text-sm text-theme-text-muted hover:text-theme-text font-bold transition-colors">
          View All &rarr;
        </button>
      </div>
      
      <HorizontalCarousel>
        {recentAchievements.length === 0 ? (
          <Card className="p-6 min-w-[280px] bg-white/5 border-white/10 flex flex-col items-center justify-center text-center opacity-70">
            <Lock size={32} className="mb-3 text-theme-text-muted" />
            <h4 className="font-bold text-theme-text">Locked</h4>
            <p className="text-xs text-theme-text-muted">Play games to unlock achievements!</p>
          </Card>
        ) : (
          recentAchievements.map((ach) => (
            <Card key={ach.id} className="p-4 min-w-[260px] flex-shrink-0 flex items-center gap-4 bg-theme-accent/10 border-theme-accent/30 backdrop-blur-xl shadow-lg relative overflow-hidden group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="p-2 rounded-full bg-theme-accent/20 text-theme-accent shadow-inner">
                  <ach.icon size={16} />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-black text-sm text-theme-text mb-0.5">{ach.title}</h4>
                <p className="text-[10px] text-theme-text-muted font-medium leading-tight">{ach.description}</p>
              </div>
            </Card>
          ))
        )}
      </HorizontalCarousel>
    </div>
  );
}

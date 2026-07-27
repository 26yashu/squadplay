import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { Header } from '../components/layout/Header';
import { motion } from 'framer-motion';
import { gameRegistry } from '../registry/gameRegistry';

// Sections
import { HeroSection } from './home/components/HeroSection';
import { DashboardWidgets } from './home/components/DashboardWidgets';
import { ContinuePlayingSection } from './home/components/ContinuePlayingSection';
import { GameGridSection } from './home/components/GameGridSection';
import { MissionsSection } from './home/components/MissionsSection';
import { AchievementsSection } from './home/components/AchievementsSection';
import { LeaderboardPreviewSection } from './home/components/LeaderboardPreviewSection';
import { ComingSoonSection } from './home/components/ComingSoonSection';

export function Home() {
  const featuredGame = gameRegistry.find(g => g.id === 'quiz-battle') || gameRegistry[0];

  return (
    <ScreenWrapper className="bg-black text-white relative">
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden bg-black">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-[radial-gradient(circle,rgba(99,102,241,0.4),transparent_70%)] blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 -right-20 w-80 h-80 bg-[radial-gradient(circle,rgba(236,72,153,0.3),transparent_70%)] blur-3xl" 
        />
        <motion.div 
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.2),transparent_70%)] blur-3xl" 
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex flex-col pb-40">
        <Header title="SquadPlay" showBack={false} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <HeroSection game={featuredGame} />
          <DashboardWidgets />
          <ContinuePlayingSection />
          <GameGridSection />
          <MissionsSection />
          <AchievementsSection />
          <LeaderboardPreviewSection />
          <ComingSoonSection />
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}

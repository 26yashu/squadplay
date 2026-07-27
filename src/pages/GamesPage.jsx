import { ScreenWrapper } from '../components/layout/ScreenWrapper';
import { Header } from '../components/layout/Header';
import { motion } from 'framer-motion';
import { GameGridSection } from './home/components/GameGridSection';
import { ComingSoonSection } from './home/components/ComingSoonSection';

export function GamesPage() {
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
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
      </div>

      <div className="relative z-10 flex flex-col pb-40">
        <Header title="Games" showBack={false} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-6 pt-4"
        >
          <div className="px-4 mb-2">
            <h2 className="text-3xl font-black text-white drop-shadow-md">Choose a game</h2>
            <p className="text-gray-400 text-sm mt-1">Select a game to start playing with your squad.</p>
          </div>
          
          <GameGridSection />
          <ComingSoonSection />
        </motion.div>
      </div>
    </ScreenWrapper>
  );
}

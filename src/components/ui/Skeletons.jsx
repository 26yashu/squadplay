import { motion } from 'framer-motion';

export function Shimmer({ className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-white/5 rounded-xl ${className}`}>
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2"
      />
    </div>
  );
}

export function GameCardSkeleton() {
  return (
    <div className="relative rounded-[28px] glass-panel border border-white/10 overflow-hidden p-0 h-[220px]">
      <div className="absolute inset-0 z-0 opacity-50">
        <Shimmer className="w-full h-full rounded-none" />
      </div>
      <div className="relative z-10 h-full p-5 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <Shimmer className="w-14 h-14 rounded-2xl bg-black/40 border border-white/5" />
          <Shimmer className="w-20 h-6 rounded-full bg-black/40" />
        </div>
        <div className="mt-auto">
          <Shimmer className="w-3/4 h-7 mb-2 bg-black/40" />
          <Shimmer className="w-1/2 h-4 mb-4 bg-black/40" />
          <div className="flex gap-2">
            <Shimmer className="w-16 h-6 rounded-md bg-black/40" />
            <Shimmer className="w-16 h-6 rounded-md bg-black/40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-[28px] min-h-[360px] p-6 glass-panel border-t border-white/20 flex flex-col justify-end shadow-2xl">
      <Shimmer className="absolute inset-0 w-full h-full rounded-none opacity-50" />
      <div className="relative z-10 w-full max-w-md">
        <div className="flex gap-3 mb-4">
          <Shimmer className="w-20 h-8 rounded-lg bg-black/40" />
          <Shimmer className="w-24 h-8 rounded-lg bg-black/40" />
        </div>
        <Shimmer className="w-3/4 h-14 mb-4 bg-black/40 rounded-xl" />
        <Shimmer className="w-full h-20 mb-8 bg-black/40 rounded-xl" />
        <Shimmer className="w-48 h-14 rounded-full bg-theme-accent/20 border border-theme-accent/30" />
      </div>
    </div>
  );
}

export function QuestionSkeleton() {
  return (
    <div className="flex flex-col h-full space-y-6">
      <Shimmer className="w-1/3 h-6 mx-auto rounded-full bg-white/10" />
      <Shimmer className="w-full h-48 rounded-[28px] glass-panel bg-white/5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
        <Shimmer className="w-full h-16 rounded-[22px] bg-white/10" />
        <Shimmer className="w-full h-16 rounded-[22px] bg-white/10" />
        <Shimmer className="w-full h-16 rounded-[22px] bg-white/10" />
        <Shimmer className="w-full h-16 rounded-[22px] bg-white/10" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <Shimmer className="w-32 h-32 rounded-full glass-panel border-4 border-white/10" />
      <Shimmer className="w-48 h-10 rounded-full bg-white/10" />
      <Shimmer className="w-32 h-5 rounded-full bg-white/5" />
      
      <div className="w-full grid grid-cols-2 gap-4 mt-8">
        <Shimmer className="w-full h-28 rounded-[28px] glass-panel bg-white/5" />
        <Shimmer className="w-full h-28 rounded-[28px] glass-panel bg-white/5" />
      </div>
    </div>
  );
}

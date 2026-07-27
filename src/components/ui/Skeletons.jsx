import { motion } from 'framer-motion';

export function Shimmer({ className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-white/5 rounded-xl ${className}`}>
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent w-1/2"
      />
    </div>
  );
}

export function GameCardSkeleton() {
  return (
    <div className="relative rounded-3xl bg-white/5 border border-white/5 overflow-hidden p-0 h-[220px]">
      <div className="absolute inset-0 z-0">
        <Shimmer className="w-full h-full rounded-none" />
      </div>
      <div className="relative z-10 h-full p-4 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <Shimmer className="w-12 h-12 rounded-2xl" />
          <Shimmer className="w-16 h-6 rounded-full" />
        </div>
        <div className="mt-auto">
          <Shimmer className="w-3/4 h-6 mb-2" />
          <Shimmer className="w-1/2 h-4 mb-4" />
          <div className="flex gap-2">
            <Shimmer className="w-16 h-6 rounded-md" />
            <Shimmer className="w-16 h-6 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl min-h-[360px] p-6 border border-white/5 bg-white/5 flex flex-col justify-end">
      <Shimmer className="absolute inset-0 w-full h-full rounded-none" />
      <div className="relative z-10 w-full max-w-md">
        <div className="flex gap-2 mb-4">
          <Shimmer className="w-16 h-6 rounded" />
          <Shimmer className="w-20 h-6 rounded" />
        </div>
        <Shimmer className="w-3/4 h-12 mb-4" />
        <Shimmer className="w-full h-16 mb-8" />
        <Shimmer className="w-40 h-14 rounded-2xl" />
      </div>
    </div>
  );
}

export function QuestionSkeleton() {
  return (
    <div className="flex flex-col h-full space-y-6">
      <Shimmer className="w-1/3 h-6 mx-auto rounded-full" />
      <Shimmer className="w-full h-40 rounded-3xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
        <Shimmer className="w-full h-16 rounded-2xl" />
        <Shimmer className="w-full h-16 rounded-2xl" />
        <Shimmer className="w-full h-16 rounded-2xl" />
        <Shimmer className="w-full h-16 rounded-2xl" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <Shimmer className="w-32 h-32 rounded-full" />
      <Shimmer className="w-48 h-8 rounded-full" />
      <Shimmer className="w-32 h-4 rounded-full" />
      
      <div className="w-full grid grid-cols-2 gap-4 mt-8">
        <Shimmer className="w-full h-24 rounded-2xl" />
        <Shimmer className="w-full h-24 rounded-2xl" />
      </div>
    </div>
  );
}

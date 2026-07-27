import { motion } from 'framer-motion';
import { ArchiveX } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({ title, message, actionLabel, onAction, icon: Icon = ArchiveX }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-10 text-center bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-hyper-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="w-48 h-48 mb-6 relative z-10 flex items-center justify-center">
        <img src="/images/empty_state_illustration.jpg" alt="Empty" className="absolute inset-0 w-full h-full object-cover rounded-[2rem] opacity-80 mix-blend-screen shadow-[0_0_40px_rgba(236,72,153,0.3)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-[2rem]" />
        <Icon size={32} className="text-white/80 relative z-10 drop-shadow-lg" />
      </div>
      <h3 className="text-2xl font-black mb-3 text-white tracking-wide relative z-10">{title}</h3>
      <p className="text-sm text-white/50 mb-8 max-w-xs leading-relaxed relative z-10">{message}</p>
      
      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction} className="text-sm py-3 px-6 relative z-10 shadow-lg border-white/20 hover:border-hyper-pink/50 transition-colors">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}

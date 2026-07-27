import { motion } from 'framer-motion';
import { DatabaseZap } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export function ContentEmptyState({ title = 'No Content Found', message = 'We could not load any content for this selection.', actionLabel = 'Go Back', onAction, icon: Icon = DatabaseZap, colorClass = 'text-hyper-pink', fromColor = 'from-hyper-pink/20', shadowColor = 'shadow-[0_0_30px_rgba(236,72,153,0.2)]' }) {
  const navigate = useNavigate();
  const handleAction = onAction || (() => navigate(-1));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex flex-col items-center justify-center p-8 text-center min-h-[40vh] bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-2xl shadow-2xl overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${fromColor} to-transparent opacity-30 z-0 pointer-events-none`} />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay z-0 pointer-events-none" />

      <div className="relative z-10">
        <div className={`w-64 h-64 mx-auto mb-8 relative flex items-center justify-center`}>
          <img src="/images/empty_state_illustration.jpg" alt="Empty Content" className="absolute inset-0 w-full h-full object-cover rounded-[3rem] opacity-90 mix-blend-screen shadow-[0_0_50px_rgba(236,72,153,0.4)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-[3rem]" />
          <Icon size={48} className={`${colorClass} relative z-10 drop-shadow-2xl`} />
        </div>
        <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-3 drop-shadow-sm">{title}</h3>
        <p className="text-gray-400 font-medium mb-8 max-w-sm leading-relaxed">{message}</p>
        
        <Button onClick={handleAction} variant="primary" className={`px-10 py-4 shadow-lg ${shadowColor} text-lg`}>
          {actionLabel}
        </Button>
      </div>
    </motion.div>
  );
}

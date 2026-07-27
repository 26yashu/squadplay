import { motion } from 'framer-motion';
import { Card } from './Card';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

export function PremiumEmptyState({ icon: Icon, title, message, actionLabel = "Go Home", actionRoute, onAction }) {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (actionRoute) {
      navigate(actionRoute);
    } else {
      navigate('/');
    }
  };

  return (
    <Card className="flex flex-col items-center justify-center py-20 px-6 text-center border-theme-border/50 bg-theme-card/50 overflow-hidden relative group">
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
        className="relative z-10"
      >
        <div className="w-24 h-24 rounded-full bg-theme-accent/10 border-2 border-theme-accent/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(var(--theme-accent),0.2)]">
          <Icon size={48} className="text-theme-accent opacity-80" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 flex flex-col items-center"
      >
        <h2 className="text-2xl font-black text-theme-text mb-2 tracking-wide uppercase">{title}</h2>
        <p className="text-theme-text-muted mb-8 max-w-[250px] leading-relaxed">{message}</p>
        
        {actionLabel && (
          <Button variant="primary" onClick={handleAction}>
            {actionLabel}
          </Button>
        )}
      </motion.div>
    </Card>
  );
}

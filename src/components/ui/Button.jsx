import { memo } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';
import { hapticsManager } from '../../haptics/HapticsManager';

export const Button = memo(function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading = false,
  disabled = false,
  onClick,
  ...props 
}) {
  const baseClasses = 'relative rounded-full font-bold transition-all duration-300 flex items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50';
  
  const variants = {
    primary: 'bg-gradient-to-r from-neon-indigo to-cosmic-purple text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] py-3 px-8',
    secondary: 'bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 hover:border-white/20 py-3 px-8',
    danger: 'bg-gradient-to-r from-crimson-error to-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] py-3 px-8',
    icon: 'bg-white/10 backdrop-blur-md text-white p-3 border border-white/10 hover:bg-white/20 hover:border-white/20 rounded-full'
  };

  const isDisabled = disabled || isLoading;

  const handleClick = (e) => {
    if (isDisabled) return;
    soundManager.playClick();
    hapticsManager.playClick();
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileTap={!isDisabled ? { scale: 0.94 } : {}}
      whileHover={!isDisabled && variant !== 'icon' ? { scale: 1.02 } : {}}
      className={`${baseClasses} ${variants[variant]} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className} group`}
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    >
      {!isDisabled && variant !== 'icon' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      )}
      
      <div className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span className="opacity-80">Loading...</span>
          </>
        ) : (
          children
        )}
      </div>
    </motion.button>
  );
});

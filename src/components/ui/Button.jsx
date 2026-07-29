import { memo } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { soundManager } from '../../audio/SoundManager';
import { hapticsManager } from '../../haptics/HapticsManager';
import { motionVariants } from '../../lib/motion';

export const Button = memo(function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  isLoading = false,
  disabled = false,
  onClick,
  ...props 
}) {
  const baseClasses = 'relative font-bold transition-colors duration-300 flex items-center justify-center overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-btn';
  
  const variants = {
    primary: 'bg-theme-accent text-white shadow-[0_0_20px_var(--theme-glow)] hover:shadow-[0_0_30px_var(--theme-glow)] py-3 px-8',
    secondary: 'bg-white/10 backdrop-blur-2xl text-white border border-white/10 hover:bg-white/15 hover:border-white/20 py-3 px-8',
    ghost: 'bg-transparent text-white hover:bg-white/10 py-3 px-8',
    danger: 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] py-3 px-8',
    icon: 'bg-white/10 backdrop-blur-2xl text-white p-3 border border-white/10 hover:bg-white/15 hover:border-white/20 !rounded-full',
    floating: 'bg-theme-accent text-white shadow-lg hover:shadow-xl p-4 !rounded-full shadow-[0_0_20px_var(--theme-glow)]'
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
      variants={motionVariants.buttonPress}
      initial="initial"
      whileHover={!isDisabled && variant !== 'icon' ? "hover" : ""}
      whileTap={!isDisabled ? "tap" : ""}
      className={`${baseClasses} ${variants[variant]} ${isDisabled ? 'opacity-50 cursor-not-allowed grayscale-[0.5]' : ''} ${className} group`}
      disabled={isDisabled}
      onClick={handleClick}
      {...props}
    >
      {!isDisabled && (variant === 'primary' || variant === 'danger' || variant === 'floating') && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      )}
      
      <div className="relative z-10 flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {variant !== 'icon' && variant !== 'floating' && <span className="opacity-90">Loading...</span>}
          </>
        ) : (
          children
        )}
      </div>
    </motion.button>
  );
});

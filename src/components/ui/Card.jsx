import { memo } from 'react';

export const Card = memo(function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`glass-panel rounded-card p-5 relative overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

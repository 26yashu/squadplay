import { memo } from 'react';

export const Card = memo(function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl rounded-3xl p-6 relative overflow-hidden transition-all duration-300 ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

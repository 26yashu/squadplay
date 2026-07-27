import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Dice({ rollResult, isRolling, disabled, onClick, colorClass = 'bg-neon-indigo' }) {
  const [dots, setDots] = useState([1]);
  
  // Create faces based on result
  useEffect(() => {
    if (!isRolling && rollResult) {
      setDots(Array.from({ length: rollResult }, (_, i) => i));
    }
  }, [isRolling, rollResult]);

  useEffect(() => {
    let interval;
    if (isRolling) {
      interval = setInterval(() => {
        const randomRoll = Math.floor(Math.random() * 6) + 1;
        setDots(Array.from({ length: randomRoll }, (_, i) => i));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRolling]);

  return (
    <motion.button
      onClick={!disabled && !isRolling ? onClick : undefined}
      animate={{
        scale: isRolling ? [1, 1.2, 0.9, 1.1, 1] : 1,
        rotate: isRolling ? [0, 90, 180, 270, 360] : 0,
        y: isRolling ? [0, -20, 0, -10, 0] : 0,
      }}
      transition={{ duration: 0.6, type: 'spring' }}
      className={`relative w-16 h-16 rounded-xl flex items-center justify-center p-2 shadow-2xl border-2 border-white/20 transition-all ${
        disabled ? 'opacity-50 cursor-not-allowed grayscale bg-gray-700' : `cursor-pointer hover:scale-105 ${colorClass}`
      }`}
      style={{
        boxShadow: !disabled ? '0 0 20px rgba(255,255,255,0.2), inset 0 0 10px rgba(0,0,0,0.5)' : 'none'
      }}
    >
      <div className="absolute inset-0 bg-white/10 rounded-xl" />
      
      <div className={`grid gap-1 w-full h-full p-1 ${dots.length > 3 ? 'grid-cols-2 grid-rows-3' : 'grid-cols-1 grid-rows-3'} place-items-center`}>
        {dots.length === 1 && (
          <div className="w-3 h-3 bg-white rounded-full row-start-2 col-start-1" />
        )}
        
        {dots.length === 2 && (
          <>
            <div className="w-3 h-3 bg-white rounded-full row-start-1 col-start-1 self-start justify-self-start" />
            <div className="w-3 h-3 bg-white rounded-full row-start-3 col-start-1 self-end justify-self-end" />
          </>
        )}
        
        {dots.length === 3 && (
          <>
            <div className="w-3 h-3 bg-white rounded-full row-start-1 col-start-1 self-start justify-self-start" />
            <div className="w-3 h-3 bg-white rounded-full row-start-2 col-start-1 self-center justify-self-center" />
            <div className="w-3 h-3 bg-white rounded-full row-start-3 col-start-1 self-end justify-self-end" />
          </>
        )}

        {dots.length === 4 && (
          <>
            <div className="w-3 h-3 bg-white rounded-full row-start-1 col-start-1" />
            <div className="w-3 h-3 bg-white rounded-full row-start-1 col-start-2" />
            <div className="w-3 h-3 bg-white rounded-full row-start-3 col-start-1" />
            <div className="w-3 h-3 bg-white rounded-full row-start-3 col-start-2" />
          </>
        )}
        
        {dots.length === 5 && (
          <>
            <div className="w-3 h-3 bg-white rounded-full row-start-1 col-start-1" />
            <div className="w-3 h-3 bg-white rounded-full row-start-1 col-start-2" />
            <div className="w-3 h-3 bg-white rounded-full row-start-2 col-span-2 place-self-center" />
            <div className="w-3 h-3 bg-white rounded-full row-start-3 col-start-1" />
            <div className="w-3 h-3 bg-white rounded-full row-start-3 col-start-2" />
          </>
        )}
        
        {dots.length === 6 && (
          <>
            <div className="w-3 h-3 bg-white rounded-full row-start-1 col-start-1" />
            <div className="w-3 h-3 bg-white rounded-full row-start-1 col-start-2" />
            <div className="w-3 h-3 bg-white rounded-full row-start-2 col-start-1" />
            <div className="w-3 h-3 bg-white rounded-full row-start-2 col-start-2" />
            <div className="w-3 h-3 bg-white rounded-full row-start-3 col-start-1" />
            <div className="w-3 h-3 bg-white rounded-full row-start-3 col-start-2" />
          </>
        )}
      </div>
    </motion.button>
  );
}

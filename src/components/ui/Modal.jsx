import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { soundManager } from '../../audio/SoundManager';
import { hapticsManager } from '../../haptics/HapticsManager';

export function Modal({ isOpen, onClose, title, children, hideCloseButton = false }) {
  useEffect(() => {
    if (isOpen) {
      soundManager.playClick();
      hapticsManager.playClick();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden max-h-[90vh] mt-auto sm:mt-0"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/40 pointer-events-none" />

            <div className="relative z-10 p-6 flex flex-col h-full max-h-full">
              <div className="flex justify-between items-center mb-6">
                {title && <h2 className="text-2xl font-black text-white drop-shadow-md">{title}</h2>}
                {!hideCloseButton && (
                  <button 
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <div className="overflow-y-auto flex-1 custom-scrollbar -mx-6 px-6">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

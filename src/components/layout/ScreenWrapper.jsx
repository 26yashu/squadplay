import { motion } from 'framer-motion';

export function ScreenWrapper({ children, className = '' }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`min-h-screen overflow-y-auto overflow-x-hidden text-white p-4 sm:p-6 md:p-8 flex flex-col max-w-md mx-auto relative pb-32 ${className}`}
    >
      {children}
    </motion.div>
  );
}

import { motion } from 'framer-motion';

export function SetupStepper({ steps, currentIndex, colorClass }) {
  const bgClass = colorClass ? colorClass.replace('text-', 'bg-') : 'bg-white';

  return (
    <div className="flex items-center w-full gap-1">
      {steps.map((step, idx) => (
        <div key={step} className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: idx <= currentIndex ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
            className={`h-full ${bgClass} shadow-[0_0_8px_currentColor]`}
          />
        </div>
      ))}
    </div>
  );
}

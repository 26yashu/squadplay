import { motion } from 'framer-motion';

export function CountdownTimer({ timeRemaining, duration }) {
  const percent = duration > 0 ? (timeRemaining / duration) * 100 : 0;
  
  let colorClass = 'text-emerald-success border-emerald-success';
  let pulse = false;
  
  if (percent <= 10) {
    colorClass = 'text-crimson-error border-crimson-error shadow-[0_0_20px_rgba(255,71,87,0.6)]';
    pulse = true;
  } else if (percent <= 50) {
    colorClass = 'text-amber-warning border-amber-warning shadow-[0_0_15px_rgba(255,165,2,0.4)]';
  } else {
    colorClass += ' shadow-[0_0_15px_rgba(46,213,115,0.4)]';
  }

  return (
    <motion.div 
      animate={pulse ? { scale: [1, 1.1, 1] } : { scale: 1 }}
      transition={{ repeat: pulse ? Infinity : 0, duration: 0.5 }}
      className={`flex items-center justify-center w-20 h-20 rounded-full border-4 ${colorClass} bg-black/60 mx-auto mb-6`}
    >
      <span className="text-3xl font-black">{timeRemaining}</span>
    </motion.div>
  );
}

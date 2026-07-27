import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

export function CategoryBadge({ category, className = '' }) {
  if (!category) return null;
  
  const formatted = category.replace(/([A-Z])/g, ' $1').trim();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-gray-200 tracking-wide backdrop-blur-md shadow-sm ${className}`}
    >
      <Tag size={12} className="text-neon-indigo" />
      <span className="capitalize">{formatted}</span>
    </motion.div>
  );
}

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function HorizontalCarousel({ children, className = '' }) {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [children]);

  return (
    <motion.div 
      ref={carouselRef} 
      className={`px-4 ${className}`}
      style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' }}
    >
      <motion.div 
        drag="x" 
        dragConstraints={{ right: 0, left: -width || -1000 }} 
        dragElastic={0.1}
        whileTap={{ cursor: "grabbing" }}
        className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

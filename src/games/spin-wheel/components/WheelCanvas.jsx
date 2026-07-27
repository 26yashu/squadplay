import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function WheelCanvas({ items, currentRotation, duration }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current || !items || items.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const center = size / 2;
    const radius = center - 10;
    
    ctx.clearRect(0, 0, size, size);
    
    const segmentAngle = (2 * Math.PI) / items.length;
    
    // The wheel drawing starts at 0 degrees (3 o'clock)
    // We rotate the context by -90 degrees so the first segment starts exactly at the top center.
    ctx.translate(center, center);
    ctx.rotate(-Math.PI / 2);
    
    items.forEach((item, i) => {
      const startAngle = i * segmentAngle;
      const endAngle = startAngle + segmentAngle;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(0, 0);
      if (items.length === 1) {
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      } else {
        ctx.arc(0, 0, radius, startAngle, endAngle);
      }
      ctx.fillStyle = item.color || '#444';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw text
      ctx.save();
      // Rotate to the center of the segment
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFF';
      ctx.font = `bold ${Math.max(12, 24 - items.length)}px Inter, sans-serif`;
      ctx.shadowColor = 'rgba(0,0,0,0.8)';
      ctx.shadowBlur = 4;
      
      // Truncate text if it's too long
      let text = item.text || item.title || item.word || item.prompt || item.name || 'Item';
      if (text.length > 15) text = text.substring(0, 15) + '...';
      
      ctx.fillText(text, radius - 20, 5);
      ctx.restore();
    });
    
    // Reset transform
    ctx.resetTransform();
    
    // Draw center peg
    ctx.beginPath();
    ctx.arc(center, center, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 3;
    ctx.stroke();
    
  }, [items]);

  return (
    <motion.div
      animate={{ rotate: currentRotation }}
      transition={{ 
        duration: duration / 1000, 
        ease: [0.1, 0.9, 0.2, 1], // Custom deceleration curve
      }}
      className="relative rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black"
    >
      <canvas 
        ref={canvasRef} 
        width={350} 
        height={350} 
        className="block"
      />
    </motion.div>
  );
}

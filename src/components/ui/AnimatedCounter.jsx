import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function AnimatedCounter({ value, duration = 2 }) {
  const [hasMounted, setHasMounted] = useState(false);
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (current) => Math.round(current).toLocaleString());

  useEffect(() => {
    setHasMounted(true);
    springValue.set(value);
  }, [value, springValue]);

  if (!hasMounted) return <span>{value}</span>;

  return <motion.span>{displayValue}</motion.span>;
}

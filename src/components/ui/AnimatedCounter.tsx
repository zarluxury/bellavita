'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  className = ''
}) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(from + (to - from) * progress));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [from, to, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {prefix}{count}{suffix}
    </motion.div>
  );
};

export default AnimatedCounter;

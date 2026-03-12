'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface ScrollRevealProps extends MotionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  direction = 'up',
  className = '',
  ...props 
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 };
      case 'down':
        return { opacity: 0, y: -50 };
      case 'left':
        return { opacity: 0, x: 50 };
      case 'right':
        return { opacity: 0, x: -50 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
      viewport={{ once: true, margin: "-100px" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

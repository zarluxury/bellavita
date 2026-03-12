'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface FloatingElementProps extends MotionProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
  children, 
  duration = 3,
  delay = 0,
  distance = 10,
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;

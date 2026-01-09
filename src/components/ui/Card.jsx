import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  glass = true,
  padding = 'p-6',
  ...props 
}) => {
  const baseClasses = `rounded-2xl border transition-all duration-300 ${padding}`;
  const glassClasses = glass 
    ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-white/20 dark:border-gray-700/50 shadow-xl' 
    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg';
  
  const hoverClasses = hover 
    ? 'hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02]' 
    : '';
  
  const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${className}`;
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={classes}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card = ({ children, className = '', hover = false, onClick }: CardProps) => {
  const baseClasses = 'bg-white dark:bg-neutral-800 rounded-xl shadow-apple overflow-hidden transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-apple-lg hover:translate-y-[-2px]' : '';
  
  const card = (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
  
  if (hover && onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {card}
      </motion.div>
    );
  }
  
  return card;
};

export default Card;
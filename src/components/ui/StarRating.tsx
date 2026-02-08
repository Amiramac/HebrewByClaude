'use client';

import { motion } from 'framer-motion';

interface StarRatingProps {
  stars: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const sizeMap = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
};

export default function StarRating({
  stars,
  maxStars = 3,
  size = 'md',
  animated = true,
}: StarRatingProps) {
  return (
    <div className="flex gap-2 justify-center" dir="ltr">
      {Array.from({ length: maxStars }).map((_, i) => {
        const isFilled = i < stars;
        return (
          <motion.span
            key={i}
            className={`${sizeMap[size]} ${
              isFilled ? 'text-star-gold' : 'text-gray-300'
            }`}
            initial={animated && isFilled ? { scale: 0, rotate: -180 } : {}}
            animate={animated && isFilled ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 300 }}
          >
            {isFilled ? '\u2605' : '\u2606'}
          </motion.span>
        );
      })}
    </div>
  );
}

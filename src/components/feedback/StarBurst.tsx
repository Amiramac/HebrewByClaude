'use client';

import { motion, AnimatePresence } from 'framer-motion';
import StarRating from '@/components/ui/StarRating';

interface StarBurstProps {
  stars: number;
  show: boolean;
  onComplete?: () => void;
}

export default function StarBurst({ stars, show, onComplete }: StarBurstProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            setTimeout(() => onComplete?.(), 1500);
          }}
        >
          <motion.div
            className="bg-white/95 rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-4 pointer-events-auto"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <motion.div
              className="text-6xl"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {stars === 3 ? '\uD83C\uDF1F' : stars === 2 ? '\u2B50' : '\uD83D\uDCAB'}
            </motion.div>
            <StarRating stars={stars} size="lg" animated />
            <motion.p
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {stars === 3 ? '!מושלם' : stars === 2 ? '!כל הכבוד' : '!יפה מאוד'}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

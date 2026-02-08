'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';

interface ConfettiProps {
  show: boolean;
}

const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#4A90D9', '#FF9F43', '#A55EEA'];
const SHAPES = ['\u2605', '\u2764', '\u25CF', '\u25C6'];

export default function Confetti({ show }: ConfettiProps) {
  const pieces = useMemo(() =>
    Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[i % COLORS.length],
      shape: SHAPES[i % SHAPES.length],
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random() * 1,
      rotation: Math.random() * 360,
    })),
  []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute text-2xl"
              style={{
                left: `${piece.x}%`,
                color: piece.color,
                top: -20,
              }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{
                y: '110vh',
                opacity: 0,
                rotate: piece.rotation,
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'easeIn',
              }}
            >
              {piece.shape}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

interface VowelIntroProps {
  videoSrc: string;   // kept for future real-video support
  vowelName: string;  // e.g. 'קָמַץ'
  vowelSound: string; // e.g. 'אָ'
  letter: string;     // demonstration letter e.g. 'א'
  vowelChar: string;  // the actual unicode vowel char e.g. '\u05B8'
  onContinue: () => void;
}

// SVG drawing of the kamatz diacritic (T-shape: horizontal bar + short vertical below center)
function KamatzShape({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.svg
          key="kamatz"
          width="72"
          height="28"
          viewBox="0 0 72 28"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ overflow: 'visible' }}
        >
          {/* Horizontal bar */}
          <motion.rect
            x="4" y="4" width="64" height="10" rx="5"
            fill="#E53E3E"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ transformOrigin: 'center' }}
          />
          {/* Vertical stem below center */}
          <motion.rect
            x="31" y="14" width="10" height="12" rx="4"
            fill="#E53E3E"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3, delay: 0.35, ease: 'easeOut' }}
            style={{ transformOrigin: 'top center' }}
          />
        </motion.svg>
      )}
    </AnimatePresence>
  );
}

export default function VowelIntro({
  vowelName,
  vowelSound,
  letter,
  onContinue,
}: VowelIntroProps) {
  const [phase, setPhase] = useState<'letter' | 'vowel' | 'label' | 'done'>('letter');

  // Auto-advance phases
  const advance = (next: typeof phase, delay: number) => {
    setTimeout(() => setPhase(next), delay);
  };

  // Kick off the sequence on mount
  const started = useRef(false);
  if (!started.current) {
    started.current = true;
    advance('vowel', 900);
    advance('label', 1700);
    advance('done', 2800);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 px-6 py-10 min-h-[60vh]">
      {/* Animated letter + vowel display */}
      <div className="flex flex-col items-center gap-2">
        <motion.div
          className="text-9xl font-bold text-gray-800 leading-none select-none"
          style={{ fontFamily: 'serif', direction: 'rtl' }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          {letter}
        </motion.div>

        {/* Kamatz diacritic drawn below the letter */}
        <div className="mt-1">
          <KamatzShape visible={phase !== 'letter'} />
        </div>
      </div>

      {/* Label: vowel name and sound */}
      <AnimatePresence>
        {(phase === 'label' || phase === 'done') && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-3xl font-bold text-red-500 mb-1">{vowelName}</p>
            <p className="text-xl text-gray-500">
              = &nbsp;<span className="text-4xl font-bold text-gray-700">{vowelSound}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Button onClick={onContinue}>{'בואו נתרגל ←'}</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

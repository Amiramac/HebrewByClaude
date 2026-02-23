'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from '@/types/levels';
import { useActivity } from '@/hooks/useActivity';
import { useAudio } from '@/hooks/useAudio';
import { useAppStore } from '@/store/appStore';
import ProgressBar from '@/components/ui/ProgressBar';
import StarBurst from '@/components/feedback/StarBurst';
import EncourageToast from '@/components/feedback/EncourageToast';
import { shuffle } from '@/lib/hebrew';

interface WordPictureMatchProps {
  activity: Activity;
  onComplete: (stars: number) => void;
}

export default function WordPictureMatch({ activity, onComplete }: WordPictureMatchProps) {
  const { addWordToReinforce } = useAppStore();

  const {
    currentItem,
    progress,
    isComplete,
    stars,
    lastAnswerCorrect,
    lastAnswer,
    feedbackKey,
    submitAnswer,
  } = useActivity(activity, addWordToReinforce);

  const { play, playCorrect, playEncourage } = useAudio();
  const [showStars, setShowStars] = useState(false);
  const [showEncourage, setShowEncourage] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [shakenOption, setShakenOption] = useState<string | null>(null);
  const encourageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reshuffle options when item changes
  useEffect(() => {
    if (currentItem) {
      setShuffledOptions(shuffle(currentItem.options));
      setShakenOption(null);
    }
  }, [currentItem?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle feedback after each answer
  useEffect(() => {
    if (feedbackKey === 0) return;
    if (encourageTimer.current) clearTimeout(encourageTimer.current);

    if (lastAnswerCorrect === true) {
      setShowEncourage(false);
      playCorrect();
      // Play the word audio AFTER correct — reinforces silent reading
      if (currentItem?.promptAudio) {
        const timer = setTimeout(() => play(currentItem.promptAudio!), 600);
        return () => clearTimeout(timer);
      }
    } else if (lastAnswerCorrect === false) {
      // Shake the wrong card, encourage — but NO word audio
      setShakenOption(lastAnswer ?? null);
      playEncourage();
      setShowEncourage(true);
      encourageTimer.current = setTimeout(() => {
        setShowEncourage(false);
        setShakenOption(null);
      }, 2000);
    }
  }, [feedbackKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isComplete) setShowStars(true);
  }, [isComplete]);

  if (!currentItem) return null;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto px-4">
      <ProgressBar progress={progress} />

      {/* Hebrew word — big, centered, no audio hint */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          className="text-center py-4"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <p className="text-8xl font-bold leading-tight" dir="rtl" lang="he">
            {currentItem.prompt}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Emoji options — 2×2 grid */}
      <motion.div
        className="grid grid-cols-2 gap-5 w-full"
        key={`options-${currentItem.id}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {shuffledOptions.map((option) => {
          const isShaking = shakenOption === option;
          return (
            <motion.button
              key={`${currentItem.id}-${option}`}
              className={`
                aspect-square rounded-3xl bg-white shadow-lg border-4 text-6xl
                flex items-center justify-center
                transition-colors active:scale-95
                ${isShaking ? 'border-red-400 bg-red-50' : 'border-gray-100 hover:border-primary/40'}
              `}
              animate={
                isShaking
                  ? { x: [0, -12, 12, -8, 8, -4, 4, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.4 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => !isComplete && submitAnswer(option)}
              disabled={isComplete}
            >
              {option}
            </motion.button>
          );
        })}
      </motion.div>

      <EncourageToast show={showEncourage} />
      <StarBurst
        stars={stars}
        show={showStars}
        onComplete={() => onComplete(stars)}
      />
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from '@/types/levels';
import { useActivity } from '@/hooks/useActivity';
import { useAudio } from '@/hooks/useAudio';
import { useAppStore } from '@/store/appStore';
import { useProgressStore } from '@/store/progressStore';
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
  const { gender } = useProgressStore();

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

  const { play, playWithCallback, playCorrect, playEncourage } = useAudio();
  const [showStars, setShowStars] = useState(false);
  const [showEncourage, setShowEncourage] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [shakenOption, setShakenOption] = useState<string | null>(null);
  // successOption: the emoji the child just tapped correctly — shows green while audio plays
  const [successOption, setSuccessOption] = useState<string | null>(null);
  const encourageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reshuffle and clear visual state when the word changes
  useEffect(() => {
    if (currentItem) {
      setShuffledOptions(shuffle(currentItem.options));
      setShakenOption(null);
      setSuccessOption(null);
    }
  }, [currentItem?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Wrong-answer feedback only — correct answers are fully handled in handleTap
  useEffect(() => {
    if (feedbackKey === 0 || lastAnswerCorrect !== false) return;
    if (encourageTimer.current) clearTimeout(encourageTimer.current);

    setShakenOption(lastAnswer ?? null);
    const wrongAudio = activity.optionMeta?.[lastAnswer ?? '']?.wrongAudio;
    if (wrongAudio) {
      play(wrongAudio);
    } else {
      playEncourage();
    }
    setShowEncourage(true);
    encourageTimer.current = setTimeout(() => {
      setShowEncourage(false);
      setShakenOption(null);
    }, 2500);
  }, [feedbackKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isComplete) setShowStars(true);
  }, [isComplete]);

  const handleTap = (option: string) => {
    // Block taps while success audio is playing or activity is done
    if (isComplete || successOption !== null) return;

    if (option === currentItem?.correct) {
      // Phase 1: show green border immediately
      setSuccessOption(option);

      // Derive gendered audio: /audio/word-correct/ima.mp3 → ima-m.mp3 or ima-f.mp3
      // Explicit niqqud (הִצְלַחְתָּ / הִצְלַחְתְּ) prevents ElevenLabs from guessing gender.
      const baseAudio = currentItem.correctFeedbackAudio;
      const genderSuffix = gender === 'girl' ? '-f' : '-m';
      const audio = baseAudio ? baseAudio.replace('.mp3', `${genderSuffix}.mp3`) : null;
      if (audio) {
        // Phase 2: advance ONLY after audio finishes — screen stays on current word
        playWithCallback(audio, () => {
          setSuccessOption(null);
          submitAnswer(option);
        });
      } else {
        playCorrect();
        // No audio configured — short visual pause then advance
        setTimeout(() => {
          setSuccessOption(null);
          submitAnswer(option);
        }, 800);
      }
    } else {
      // Wrong tap: submit immediately (stays on same item, feedback via useEffect above)
      submitAnswer(option);
    }
  };

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
          const isSuccess = successOption === option;

          return (
            <motion.button
              key={`${currentItem.id}-${option}`}
              className={`
                aspect-square rounded-3xl bg-white shadow-lg border-4 text-6xl
                flex items-center justify-center transition-colors
                ${isSuccess
                  ? 'border-green-400 bg-green-50'
                  : isShaking
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-100 hover:border-primary/40'}
              `}
              animate={
                isSuccess
                  ? { scale: [1, 1.1, 1.05] }
                  : isShaking
                    ? { x: [0, -12, 12, -8, 8, -4, 4, 0] }
                    : { x: 0, scale: 1 }
              }
              transition={{ duration: 0.4 }}
              whileTap={successOption === null ? { scale: 0.92 } : {}}
              onClick={() => handleTap(option)}
              disabled={isComplete || successOption !== null}
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

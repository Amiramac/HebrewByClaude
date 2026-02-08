'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity } from '@/types/levels';
import { useActivity } from '@/hooks/useActivity';
import { useAudio } from '@/hooks/useAudio';
import LetterCard from '@/components/hebrew/LetterCard';
import ProgressBar from '@/components/ui/ProgressBar';
import StarBurst from '@/components/feedback/StarBurst';
import EncourageToast from '@/components/feedback/EncourageToast';
import { shuffle } from '@/lib/hebrew';

interface TapTheLetterProps {
  activity: Activity;
  onComplete: (stars: number) => void;
}

export default function TapTheLetter({ activity, onComplete }: TapTheLetterProps) {
  const {
    currentItem,
    progress,
    isComplete,
    stars,
    lastAnswerCorrect,
    submitAnswer,
  } = useActivity(activity);

  const { playCorrect, playEncourage } = useAudio();
  const [showEncourage, setShowEncourage] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    if (currentItem) {
      setShuffledOptions(shuffle(currentItem.options));
    }
  }, [currentItem]);

  useEffect(() => {
    if (lastAnswerCorrect === true) {
      playCorrect();
    } else if (lastAnswerCorrect === false) {
      playEncourage();
      setShowEncourage(true);
      setTimeout(() => setShowEncourage(false), 1200);
    }
  }, [lastAnswerCorrect, playCorrect, playEncourage]);

  useEffect(() => {
    if (isComplete) {
      setShowStars(true);
    }
  }, [isComplete]);

  if (!currentItem) return null;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto px-4">
      <ProgressBar progress={progress} />

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xl text-gray-600 mb-2">{activity.instruction}</p>
        <div className="hebrew-letter text-[100px] leading-none my-4">
          {currentItem.prompt}
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-4 w-full"
        key={currentItem.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {shuffledOptions.map((option) => (
          <LetterCard
            key={`${currentItem.id}-${option}`}
            character={option}
            onSelect={submitAnswer}
            disabled={isComplete}
          />
        ))}
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

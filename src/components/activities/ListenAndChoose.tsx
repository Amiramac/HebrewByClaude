'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity } from '@/types/levels';
import { useActivity } from '@/hooks/useActivity';
import { useAudio } from '@/hooks/useAudio';
import { useAppStore } from '@/store/appStore';
import LetterCard from '@/components/hebrew/LetterCard';
import ProgressBar from '@/components/ui/ProgressBar';
import StarBurst from '@/components/feedback/StarBurst';
import EncourageToast from '@/components/feedback/EncourageToast';
import Button from '@/components/ui/Button';
import { shuffle, getLetterFeedbackAudio } from '@/lib/hebrew';

interface ListenAndChooseProps {
  activity: Activity;
  onComplete: (stars: number) => void;
}

export default function ListenAndChoose({ activity, onComplete }: ListenAndChooseProps) {
  const { difficulty, addWordToReinforce } = useAppStore();

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
  const [showEncourage, setShowEncourage] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const encourageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const instructionPlayedRef = useRef(false);

  const firstItemId = activity.items[0]?.id;

  useEffect(() => {
    if (!currentItem) return;

    setShuffledOptions(shuffle(currentItem.options));

    // Easy: auto-play prompt. Medium/Hard: don't auto-play.
    if (difficulty !== 'easy') return;

    const isFirstItem = currentItem.id === firstItemId;

    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isFirstItem && activity.instructionAudio && !instructionPlayedRef.current) {
      instructionPlayedRef.current = true;
      play(activity.instructionAudio);
      if (currentItem.promptAudio) {
        timer = setTimeout(() => play(currentItem.promptAudio!), 2500);
      }
    } else if (currentItem.promptAudio) {
      const delay = isFirstItem && instructionPlayedRef.current ? 2500
        : isFirstItem ? 400
        : 1800;
      timer = setTimeout(() => play(currentItem.promptAudio!), delay);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentItem, play, activity.instructionAudio, firstItemId, difficulty]);

  useEffect(() => {
    if (feedbackKey === 0) return;

    if (encourageTimer.current) clearTimeout(encourageTimer.current);

    if (lastAnswerCorrect === true) {
      setShowEncourage(false);
      if (difficulty !== 'hard') playCorrect();
    } else if (lastAnswerCorrect === false) {
      if (difficulty !== 'hard') {
        const feedbackSrc = lastAnswer ? getLetterFeedbackAudio(lastAnswer) : null;
        if (feedbackSrc) {
          play(feedbackSrc);
        } else {
          playEncourage();
        }
        // Medium: also replay the prompt after feedback
        if (difficulty === 'medium' && currentItem?.promptAudio) {
          setTimeout(() => play(currentItem.promptAudio!), 2000);
        }
      }
      setShowEncourage(true);
      encourageTimer.current = setTimeout(() => setShowEncourage(false), 2500);
    }
  }, [feedbackKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isComplete) setShowStars(true);
  }, [isComplete]);

  if (!currentItem) return null;

  const handleReplay = () => {
    if (difficulty === 'hard') return;
    if (currentItem.promptAudio) play(currentItem.promptAudio);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-lg mx-auto px-4">
      <ProgressBar progress={progress} />

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-xl text-gray-600 mb-4">{activity.instruction}</p>

        {currentItem.promptAudio && difficulty !== 'hard' && (
          <Button onClick={handleReplay} variant="secondary" size="lg">
            <span className="text-4xl">{'\uD83D\uDD0A'}</span>
            <span className="mr-2">שמע שוב</span>
          </Button>
        )}
        {difficulty === 'hard' && (
          <p className="text-2xl font-bold hebrew-letter">{currentItem.prompt}</p>
        )}
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

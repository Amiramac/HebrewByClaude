'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity } from '@/types/levels';
import { useActivity } from '@/hooks/useActivity';
import { useAudio } from '@/hooks/useAudio';
import { useProgressStore } from '@/store/progressStore';
import LetterCard from '@/components/hebrew/LetterCard';
import ProgressBar from '@/components/ui/ProgressBar';
import StarBurst from '@/components/feedback/StarBurst';
import EncourageToast from '@/components/feedback/EncourageToast';
import Button from '@/components/ui/Button';
import { shuffle, getLetterFeedbackAudio, getLetterIdentifyAudio } from '@/lib/hebrew';

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
    lastAnswer,
    feedbackKey,
    submitAnswer,
  } = useActivity(activity);

  const { play, playCorrect, playEncourage } = useAudio();
  const { gender } = useProgressStore();
  const [showEncourage, setShowEncourage] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const encourageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const instructionPlayedRef = useRef(false);

  // Resolve audio: use explicit promptAudio (syllables), else identify audio (bare letters)
  const promptAudio = currentItem?.promptAudio ?? getLetterIdentifyAudio(currentItem?.prompt ?? '', gender);

  // Deterministic first-item check (works in Strict Mode unlike mutable counter)
  const firstItemId = activity.items[0]?.id;

  useEffect(() => {
    if (!currentItem) return;

    setShuffledOptions(shuffle(currentItem.options));
    const src = currentItem.promptAudio ?? getLetterIdentifyAudio(currentItem.prompt, gender);
    const isFirstItem = currentItem.id === firstItemId;

    let timer: ReturnType<typeof setTimeout> | null = null;

    if (isFirstItem && activity.instructionAudio && !instructionPlayedRef.current) {
      // First item with instruction: play instruction, then prompt after it finishes
      instructionPlayedRef.current = true;
      play(activity.instructionAudio);
      if (src) {
        timer = setTimeout(() => play(src), 2500);
      }
    } else if (src) {
      // Strict Mode re-fire after instruction: keep the 2500ms delay
      // First item without instruction: 400ms
      // Subsequent items: 1800ms (wait for "כל הכבוד" to finish)
      const delay = isFirstItem && instructionPlayedRef.current ? 2500
        : isFirstItem ? 400
        : 1800;
      timer = setTimeout(() => play(src), delay);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentItem, play, gender, activity.instructionAudio, firstItemId]);

  const handleReplay = () => {
    if (promptAudio) {
      play(promptAudio);
    }
  };

  // feedbackKey changes on EVERY answer, so this always fires
  useEffect(() => {
    if (feedbackKey === 0) return; // skip initial render

    if (encourageTimer.current) {
      clearTimeout(encourageTimer.current);
    }

    if (lastAnswerCorrect === true) {
      setShowEncourage(false);
      playCorrect();
    } else if (lastAnswerCorrect === false) {
      // Play "זו האות X, נסה שוב" if feedback audio exists, else generic
      const feedbackSrc = lastAnswer ? getLetterFeedbackAudio(lastAnswer) : null;
      if (feedbackSrc) {
        play(feedbackSrc);
      } else {
        playEncourage();
      }
      setShowEncourage(true);
      encourageTimer.current = setTimeout(() => setShowEncourage(false), 2500);
    }
  }, [feedbackKey]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <Button onClick={handleReplay} variant="secondary" size="lg">
          <span className="text-4xl">
            {'\uD83D\uDD0A'}
          </span>
          <span className="mr-2">שמע שוב</span>
        </Button>
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

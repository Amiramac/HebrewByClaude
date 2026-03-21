'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lesson } from '@/types/levels';
import ActivityShell from './ActivityShell';
import Button from '@/components/ui/Button';
import StarRating from '@/components/ui/StarRating';
import Confetti from '@/components/feedback/Confetti';
import { useAudio } from '@/hooks/useAudio';
import { logLearningSession } from '@/lib/supabase';

interface LessonShellProps {
  lesson: Lesson;
  levelNumber: number;
  levelName?: string;
  levelColor: string;
  onComplete: (totalStars: number) => void;
  onBack: () => void;
}

export default function LessonShell({ lesson, levelNumber, levelName, levelColor, onComplete, onBack }: LessonShellProps) {
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [activityStars, setActivityStars] = useState<number[]>([]);
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const { playCelebrate } = useAudio();
  const activityStartTime = useRef(Date.now());

  const currentActivity = lesson.activities[currentActivityIndex];
  const totalActivities = lesson.activities.length;

  const handleActivityComplete = (stars: number) => {
    const duration = Math.round((Date.now() - activityStartTime.current) / 1000);
    const activity = lesson.activities[currentActivityIndex];
    const itemsTotal = activity.items?.length ?? 0;
    const itemsCorrect = Math.round((stars / (activity.maxStars || 3)) * itemsTotal);

    logLearningSession({
      level_number: levelNumber,
      level_name: levelName,
      activity_type: activity.type,
      duration_seconds: duration,
      items_correct: itemsCorrect,
      items_total: itemsTotal,
    });

    activityStartTime.current = Date.now();
    const newStars = [...activityStars, stars];
    setActivityStars(newStars);

    if (currentActivityIndex >= totalActivities - 1) {
      const total = newStars.reduce((sum, s) => sum + s, 0);
      playCelebrate();
      setIsLessonComplete(true);
      setTimeout(() => onComplete(total), 3000);
    } else {
      setTimeout(() => {
        setCurrentActivityIndex(i => i + 1);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4" style={{ borderBottom: `3px solid ${levelColor}` }}>
        <button
          onClick={onBack}
          className="tap-target text-3xl text-gray-400 hover:text-gray-600"
        >
          {'\u2192'}
        </button>
        <div className="text-center">
          <h2 className="text-lg font-bold">{lesson.titleHebrew}</h2>
          <p className="text-sm text-gray-500">
            {currentActivityIndex + 1} / {totalActivities}
          </p>
        </div>
        <div className="w-12" />
      </div>

      {/* Activity area */}
      <div className="flex-1 flex items-center justify-center py-8">
        <AnimatePresence mode="wait">
          {currentActivity && !isLessonComplete && (
            <motion.div
              key={currentActivity.id}
              className="w-full"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <ActivityShell
                activity={currentActivity}
                onComplete={handleActivityComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {isLessonComplete && (
          <motion.div
            className="text-center flex flex-col items-center gap-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <h2 className="text-4xl font-bold">{lesson.titleHebrew}</h2>
            <p className="text-2xl text-gray-600">!סיימת את השיעור</p>
            <StarRating
              stars={Math.round(activityStars.reduce((s, v) => s + v, 0) / totalActivities)}
              size="lg"
              animated
            />
            <Button onClick={() => onComplete(activityStars.reduce((s, v) => s + v, 0))}>
              {'המשך \u2192'}
            </Button>
          </motion.div>
        )}
      </div>

      <Confetti show={isLessonComplete} />
    </div>
  );
}

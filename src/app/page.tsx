'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LevelMap from '@/components/layout/LevelMap';
import LessonShell from '@/components/layout/LessonShell';
import { getLevelById } from '@/data/levels';
import { useProgressStore } from '@/store/progressStore';
import { Lesson } from '@/types/levels';
import { Gender } from '@/types/progress';
import Button from '@/components/ui/Button';

type View =
  | { screen: 'map' }
  | { screen: 'level'; levelId: number }
  | { screen: 'lesson'; levelId: number; lesson: Lesson };

function WelcomeScreen({ onSelectGender }: { onSelectGender: (g: Gender) => void }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-10 px-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-7xl mb-4">{'\u2728'}</div>
        <h1 className="text-4xl font-bold mb-2">!שלום</h1>
        <p className="text-2xl text-gray-500">?מי לומד היום</p>
      </motion.div>

      <motion.div
        className="flex gap-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          className="flex flex-col items-center gap-3 bg-blue-50 rounded-3xl p-8 shadow-lg border-3 border-blue-200"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSelectGender('boy')}
        >
          <span className="text-8xl">{'\uD83D\uDC66'}</span>
          <span className="text-2xl font-bold text-blue-600">בן</span>
        </motion.button>

        <motion.button
          className="flex flex-col items-center gap-3 bg-pink-50 rounded-3xl p-8 shadow-lg border-3 border-pink-200"
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSelectGender('girl')}
        >
          <span className="text-8xl">{'\uD83D\uDC67'}</span>
          <span className="text-2xl font-bold text-pink-500">בת</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<View>({ screen: 'map' });
  const { gender, setGender, completeLesson, addLetter, addVowel, completedLessons } = useProgressStore();

  const handleSelectLevel = (levelId: number) => {
    setView({ screen: 'level', levelId });
  };

  const handleSelectLesson = (levelId: number, lesson: Lesson) => {
    setView({ screen: 'lesson', levelId, lesson });
  };

  const handleLessonComplete = (levelId: number, lesson: Lesson, totalStars: number) => {
    const avgStars = Math.round(totalStars / Math.max(lesson.activities.length, 1));
    completeLesson(lesson.id, avgStars);

    const level = getLevelById(levelId);
    if (level?.letters) {
      level.letters.forEach(l => addLetter(l));
    }
    if (level?.vowels) {
      level.vowels.forEach(v => addVowel(v));
    }

    setView({ screen: 'level', levelId });
  };

  if (!gender) {
    return <WelcomeScreen onSelectGender={setGender} />;
  }

  return (
    <AnimatePresence mode="wait">
      {view.screen === 'map' && (
        <motion.div
          key="map"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LevelMap onSelectLevel={handleSelectLevel} />
        </motion.div>
      )}

      {view.screen === 'level' && (
        <motion.div
          key={`level-${view.levelId}`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          className="min-h-screen bg-background"
        >
          <LevelDetail
            levelId={view.levelId}
            completedLessons={completedLessons}
            onBack={() => setView({ screen: 'map' })}
            onSelectLesson={(lesson) => handleSelectLesson(view.levelId, lesson)}
          />
        </motion.div>
      )}

      {view.screen === 'lesson' && (
        <motion.div
          key={`lesson-${view.lesson.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LessonShell
            lesson={view.lesson}
            levelColor={getLevelById(view.levelId)?.color || '#4A90D9'}
            onComplete={(stars) => handleLessonComplete(view.levelId, view.lesson, stars)}
            onBack={() => setView({ screen: 'level', levelId: view.levelId })}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LevelDetail({
  levelId,
  completedLessons,
  onBack,
  onSelectLesson,
}: {
  levelId: number;
  completedLessons: Record<string, { stars: number }>;
  onBack: () => void;
  onSelectLesson: (lesson: Lesson) => void;
}) {
  const level = getLevelById(levelId);
  if (!level) return null;

  return (
    <div className="py-6 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="tap-target text-3xl text-gray-400">
          {'\u2192'}
        </button>
        <div>
          <h1 className="text-3xl font-bold">{level.titleHebrew}</h1>
        </div>
        <span className="text-4xl mr-auto">{level.icon}</span>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-lg">{level.description}</p>

      {/* Letters being taught */}
      {level.letters && (
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-400 mb-2">:האותיות בשלב הזה</h3>
          <div className="flex gap-3 flex-wrap" dir="rtl">
            {level.letters.map((letter) => (
              <span key={letter} className="hebrew-letter text-4xl bg-white rounded-xl p-3 shadow-sm">
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Lessons list */}
      <div className="flex flex-col gap-3">
        {level.lessons.map((lesson, index) => {
          const result = completedLessons[lesson.id];
          const isCompleted = !!result;

          return (
            <motion.button
              key={lesson.id}
              className={`w-full text-right rounded-2xl p-5 shadow-md transition-all ${
                isCompleted
                  ? 'bg-success/10 border-2 border-success'
                  : 'bg-card-bg border-2 border-gray-100 hover:border-primary/30'
              }`}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectLesson(lesson)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
                  isCompleted ? 'bg-success text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {isCompleted ? '\u2713' : index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{lesson.titleHebrew}</h3>
                  <p className="text-sm text-gray-500">{lesson.description}</p>
                </div>
                {isCompleted && (
                  <div className="flex gap-0.5">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${i < (result?.stars || 0) ? 'text-star-gold' : 'text-gray-300'}`}
                      >
                        {'\u2605'}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Back button */}
      <div className="mt-8 text-center">
        <Button variant="secondary" onClick={onBack}>
          {'\u2192 חזרה למפה'}
        </Button>
      </div>
    </div>
  );
}

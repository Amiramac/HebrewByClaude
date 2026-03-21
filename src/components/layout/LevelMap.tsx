'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEVELS } from '@/data/levels';
import { useProgressStore } from '@/store/progressStore';
import { useAppStore } from '@/store/appStore';
import StarRating from '@/components/ui/StarRating';

interface LevelMapProps {
  onSelectLevel: (levelId: number) => void;
}

export default function LevelMap({ onSelectLevel }: LevelMapProps) {
  const { totalStars, completedLessons } = useProgressStore();
  const { disabledLevels, forceUnlockedLevels, parentPassword, forceUnlockLevel } = useAppStore();

  const [unlockingLevelId, setUnlockingLevelId] = useState<number | null>(null);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleLevelTap = (levelId: number, isUnlocked: boolean) => {
    if (isUnlocked) {
      onSelectLevel(levelId);
    } else {
      setUnlockingLevelId(levelId);
      setPin('');
      setPinError(false);
    }
  };

  const handlePinSubmit = () => {
    if (pin === parentPassword && unlockingLevelId !== null) {
      forceUnlockLevel(unlockingLevelId);
      onSelectLevel(unlockingLevelId);
      setUnlockingLevelId(null);
      setPin('');
    } else {
      setPinError(true);
      setPin('');
      setTimeout(() => setPinError(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h1
          className="text-4xl font-bold hebrew-letter mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          עברית עם קלוד
        </motion.h1>
        <motion.div
          className="flex items-center justify-center gap-2 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-star-gold text-2xl">{'\u2605'}</span>
          <span className="font-bold">{totalStars}</span>
        </motion.div>
      </div>

      {/* Level nodes */}
      <div className="max-w-md mx-auto flex flex-col items-center gap-6">
        {LEVELS.map((level, index) => {
          const isDisabled = disabledLevels.includes(level.id);
          const isUnlocked = !isDisabled && (totalStars >= level.requiredStars || forceUnlockedLevels.includes(level.id));
          const lessonKeys = level.lessons.map(l => l.id);
          const completedCount = lessonKeys.filter(k => completedLessons[k]).length;
          const levelStars = lessonKeys.reduce(
            (sum, k) => sum + (completedLessons[k]?.stars || 0),
            0
          );
          const maxStars = level.lessons.length * 3;
          const isComplete = completedCount === level.lessons.length && level.lessons.length > 0;

          return (
            <motion.div
              key={level.id}
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Connector line */}
              {index > 0 && (
                <div className="w-1 h-6 bg-gray-200 mx-auto mb-2 rounded-full" />
              )}

              <motion.button
                className={`w-full rounded-3xl p-6 shadow-lg transition-all ${
                  isUnlocked
                    ? 'bg-card-bg cursor-pointer hover:shadow-xl'
                    : 'bg-gray-100 cursor-pointer opacity-60 hover:opacity-80'
                } ${isComplete ? 'ring-3 ring-success' : ''}`}
                style={isUnlocked ? { borderRight: `6px solid ${level.color}` } : {}}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleLevelTap(level.id, isUnlocked)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ backgroundColor: isUnlocked ? `${level.color}20` : '#e5e7eb' }}
                  >
                    {isUnlocked ? level.icon : '\uD83D\uDD12'}
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="text-xl font-bold">{level.titleHebrew}</h3>
                    {isUnlocked && (
                      <div className="mt-1">
                        <StarRating
                          stars={Math.min(3, Math.round((levelStars / maxStars) * 3))}
                          size="sm"
                          animated={false}
                        />
                      </div>
                    )}
                  </div>
                  {isUnlocked && (
                    <div className="text-sm text-gray-400">
                      {completedCount}/{level.lessons.length}
                    </div>
                  )}
                </div>
                {!isUnlocked && (
                  <p className="text-xs text-gray-400 mt-2">
                    {'\u2605'} {level.requiredStars - totalStars} כוכבים נדרשים
                  </p>
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Parent password modal for locked levels */}
      <AnimatePresence>
        {unlockingLevelId !== null && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setUnlockingLevelId(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={pinError ? { scale: 1, x: [0, -10, 10, -10, 10, 0] } : { scale: 1, x: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={pinError ? { duration: 0.4 } : { type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-4xl mb-3">🔐</div>
              <h2 className="text-xl font-bold mb-1">פתיחת פרק</h2>
              <p className="text-sm text-gray-500 mb-5">הכנס סיסמת הורה לפתיחת הפרק</p>
              <input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                placeholder="••••"
                className={`w-full text-center text-2xl tracking-widest border-2 rounded-xl py-3 px-4 mb-4 outline-none transition-colors ${
                  pinError ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'
                }`}
                autoFocus
              />
              <button
                onClick={handlePinSubmit}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                פתח
              </button>
              <button
                onClick={() => setUnlockingLevelId(null)}
                className="w-full mt-2 text-gray-400 text-sm py-2"
              >
                ביטול
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { LEVELS } from '@/data/levels';
import { useProgressStore } from '@/store/progressStore';
import StarRating from '@/components/ui/StarRating';

interface LevelMapProps {
  onSelectLevel: (levelId: number) => void;
}

export default function LevelMap({ onSelectLevel }: LevelMapProps) {
  const { totalStars, completedLessons } = useProgressStore();

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
          const isUnlocked = totalStars >= level.requiredStars;
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
                    : 'bg-gray-100 cursor-not-allowed opacity-60'
                } ${isComplete ? 'ring-3 ring-success' : ''}`}
                style={isUnlocked ? { borderRight: `6px solid ${level.color}` } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                whileHover={isUnlocked ? { scale: 1.02 } : {}}
                onClick={() => isUnlocked && onSelectLevel(level.id)}
                disabled={!isUnlocked}
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
                    <p className="text-sm text-gray-500">{level.title}</p>
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
                    {level.requiredStars - totalStars} stars needed {'\u2605'}
                  </p>
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

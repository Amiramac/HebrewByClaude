'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress, LessonResult, DEFAULT_PROGRESS } from '@/types/progress';

interface ProgressStore extends UserProgress {
  completeLesson: (lessonId: string, stars: number) => void;
  addLetter: (letter: string) => void;
  addVowel: (vowel: string) => void;
  addBadge: (badgeId: string) => void;
  updateStreak: () => void;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_PROGRESS,

      completeLesson: (lessonId: string, stars: number) => {
        const state = get();
        const existing = state.completedLessons[lessonId];
        const bestStars = existing ? Math.max(existing.stars, stars) : stars;
        const starDiff = existing ? Math.max(0, stars - existing.stars) : stars;

        set({
          completedLessons: {
            ...state.completedLessons,
            [lessonId]: {
              lessonId,
              stars: bestStars,
              completedAt: new Date().toISOString(),
              attempts: (existing?.attempts || 0) + 1,
            },
          },
          totalStars: state.totalStars + starDiff,
        });
      },

      addLetter: (letter: string) => {
        const state = get();
        if (!state.knownLetters.includes(letter)) {
          set({ knownLetters: [...state.knownLetters, letter] });
        }
      },

      addVowel: (vowel: string) => {
        const state = get();
        if (!state.knownVowels.includes(vowel)) {
          set({ knownVowels: [...state.knownVowels, vowel] });
        }
      },

      addBadge: (badgeId: string) => {
        const state = get();
        if (!state.badges.includes(badgeId)) {
          set({ badges: [...state.badges, badgeId] });
        }
      },

      updateStreak: () => {
        const state = get();
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        if (state.lastPlayedDate === today) return;

        const newStreak = state.lastPlayedDate === yesterday
          ? state.streakDays + 1
          : 1;

        set({
          streakDays: newStreak,
          lastPlayedDate: today,
        });
      },

      resetProgress: () => set(DEFAULT_PROGRESS),
    }),
    {
      name: 'hebrew-by-claude-progress',
    }
  )
);

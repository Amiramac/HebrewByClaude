'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Difficulty = 'easy' | 'medium' | 'hard';

interface AppState {
  // Child
  childName: string;
  hasSeenWelcome: boolean;

  // Parent settings
  parentPassword: string;
  timerMinutes: number;
  difficulty: Difficulty;
  disabledLevels: number[];
  forceUnlockedLevels: number[];

  // Timer runtime
  timerRemainingSeconds: number;
  isTimerLocked: boolean;

  // Analytics
  wordsToReinforce: string[];
  todayStudySeconds: number;
  lastStudyDate: string;

  // Actions
  setChildName: (name: string) => void;
  setHasSeenWelcome: (v: boolean) => void;
  setParentPassword: (pw: string) => void;
  setTimerMinutes: (mins: number) => void;
  setDifficulty: (d: Difficulty) => void;
  toggleLevel: (levelId: number) => void;
  forceUnlockLevel: (levelId: number) => void;
  decrementTimer: () => void;
  lockTimer: () => void;
  unlockTimer: () => void;
  resetTimer: () => void;
  addWordToReinforce: (word: string) => void;
  clearWordsToReinforce: () => void;
  incrementStudyTime: () => void;
  resetTimerForToday: (timerMins?: number) => void;
}

const DEFAULT_TIMER_MINUTES = 30;
const today = () => new Date().toISOString().split('T')[0];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      childName: '',
      hasSeenWelcome: false,
      parentPassword: '1234',
      timerMinutes: DEFAULT_TIMER_MINUTES,
      difficulty: 'easy',
      disabledLevels: [],
      forceUnlockedLevels: [],
      timerRemainingSeconds: DEFAULT_TIMER_MINUTES * 60,
      isTimerLocked: false,
      wordsToReinforce: [],
      todayStudySeconds: 0,
      lastStudyDate: '',

      setChildName: (name) => set({ childName: name }),
      setHasSeenWelcome: (v) => set({ hasSeenWelcome: v }),
      setParentPassword: (pw) => set({ parentPassword: pw }),

      setTimerMinutes: (mins) =>
        set({ timerMinutes: mins, timerRemainingSeconds: mins * 60, isTimerLocked: false }),

      setDifficulty: (d) => set({ difficulty: d }),

      toggleLevel: (levelId) => {
        const { disabledLevels } = get();
        if (disabledLevels.includes(levelId)) {
          set({ disabledLevels: disabledLevels.filter((id) => id !== levelId) });
        } else {
          set({ disabledLevels: [...disabledLevels, levelId] });
        }
      },

      forceUnlockLevel: (levelId) => {
        const { forceUnlockedLevels } = get();
        if (!forceUnlockedLevels.includes(levelId)) {
          set({ forceUnlockedLevels: [...forceUnlockedLevels, levelId] });
        }
      },

      decrementTimer: () => {
        const { timerRemainingSeconds, isTimerLocked } = get();
        if (isTimerLocked || timerRemainingSeconds <= 0) return;
        const next = timerRemainingSeconds - 1;
        if (next <= 0) {
          set({ timerRemainingSeconds: 0, isTimerLocked: true });
        } else {
          set({ timerRemainingSeconds: next });
        }
      },

      lockTimer: () => set({ isTimerLocked: true, timerRemainingSeconds: 0 }),

      unlockTimer: () => set({ isTimerLocked: false }),

      resetTimer: () => {
        const { timerMinutes } = get();
        set({ timerRemainingSeconds: timerMinutes * 60, isTimerLocked: false });
      },

      addWordToReinforce: (word) => {
        if (!word.trim()) return;
        const { wordsToReinforce } = get();
        if (!wordsToReinforce.includes(word)) {
          set({ wordsToReinforce: [...wordsToReinforce, word] });
        }
      },

      clearWordsToReinforce: () => set({ wordsToReinforce: [] }),

      incrementStudyTime: () => {
        const state = get();
        const todayStr = today();
        if (state.lastStudyDate !== todayStr) {
          set({ todayStudySeconds: 1, lastStudyDate: todayStr });
        } else {
          set({ todayStudySeconds: state.todayStudySeconds + 1 });
        }
      },

      resetTimerForToday: (timerMins?: number) => {
        const state = get();
        const mins = timerMins ?? state.timerMinutes;
        const todayStr = today();
        if (state.lastStudyDate !== todayStr) {
          set({
            timerRemainingSeconds: mins * 60,
            isTimerLocked: false,
            todayStudySeconds: 0,
            lastStudyDate: todayStr,
          });
        }
      },
    }),
    {
      name: 'hebrew-by-claude-app',
      skipHydration: true,
    }
  )
);

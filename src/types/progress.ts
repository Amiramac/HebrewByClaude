export type Gender = 'boy' | 'girl';

export interface LessonResult {
  lessonId: string;
  stars: number;
  completedAt: string;
  attempts: number;
}

export interface Badge {
  id: string;
  name: string;
  nameHebrew: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export interface UserProgress {
  currentLevel: number;
  completedLessons: Record<string, LessonResult>;
  totalStars: number;
  badges: string[];
  knownLetters: string[];
  knownVowels: string[];
  streakDays: number;
  lastPlayedDate: string;
  gender: Gender | null;
}

export const DEFAULT_PROGRESS: UserProgress = {
  currentLevel: 1,
  completedLessons: {},
  totalStars: 0,
  badges: [],
  knownLetters: [],
  knownVowels: [],
  streakDays: 0,
  lastPlayedDate: '',
  gender: null,
};

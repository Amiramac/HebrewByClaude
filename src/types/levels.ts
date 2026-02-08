export type LessonType =
  | 'letter-intro'
  | 'letter-recognition'
  | 'vowel-intro'
  | 'syllable-reading'
  | 'visual-discrimination'
  | 'word-reading'
  | 'sentence-reading'
  | 'review';

export type ActivityType =
  | 'tap-the-letter'
  | 'match-pairs'
  | 'drag-to-match'
  | 'listen-and-choose'
  | 'build-syllable'
  | 'read-aloud'
  | 'word-picture-match'
  | 'find-the-letter';

export interface Activity {
  id: string;
  type: ActivityType;
  instruction: string;
  instructionAudio?: string;
  items: ActivityItem[];
  maxStars: number;
}

export interface ActivityItem {
  id: string;
  prompt: string;
  promptAudio?: string;
  correct: string;
  options: string[];
  image?: string;
}

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  titleHebrew: string;
  description: string;
  activities: Activity[];
}

export interface Level {
  id: number;
  slug: string;
  title: string;
  titleHebrew: string;
  description: string;
  icon: string;
  color: string;
  requiredStars: number;
  letters?: string[];
  vowels?: string[];
  lessons: Lesson[];
}

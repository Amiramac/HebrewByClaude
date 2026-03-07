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

export interface OptionMeta {
  description: string;      // Hebrew label, e.g. 'כלב'
  wrongAudio?: string;      // "זה כלב, נסה שוב" — played when this option is tapped incorrectly
}

export interface Activity {
  id: string;
  type: ActivityType;
  instruction: string;
  instructionAudio?: string;
  items: ActivityItem[];
  maxStars: number;
  optionMeta?: Record<string, OptionMeta>; // emoji → metadata, shared across all items in activity
}

export interface ActivityItem {
  id: string;
  prompt: string;
  promptAudio?: string;
  correct: string;
  options: string[];
  image?: string;
  correctFeedbackAudio?: string; // "[word], קראת נכון!" — played after correct tap
}

export interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  titleHebrew: string;
  description: string;
  categoryIcon?: string;
  activities: Activity[];
  introVideo?: string; // e.g. '/videos/vowels/kamatz.mp4' — shown before first activity
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

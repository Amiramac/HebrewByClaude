import { Level } from '@/types/levels';
import level01 from './level-01';
import level02 from './level-02';
import level03 from './level-03';

export const LEVELS: Level[] = [
  level01,
  level02,
  level03,
  // Future levels will be added here:
  // level04 — Remaining Letters
  // level05 — More Vowels
  // level06 — Complete the Aleph-Bet
  // level07 — All the Vowels
  // level08 — Simple Words
  // level09 — The Tricky Shva
  // level10 — I Can Read!
];

export function getLevelById(id: number): Level | undefined {
  return LEVELS.find(l => l.id === id);
}

export function getLevelBySlug(slug: string): Level | undefined {
  return LEVELS.find(l => l.slug === slug);
}

export function isLevelUnlocked(levelId: number, totalStars: number): boolean {
  const level = getLevelById(levelId);
  if (!level) return false;
  return totalStars >= level.requiredStars;
}

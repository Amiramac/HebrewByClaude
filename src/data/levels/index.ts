import { Level } from '@/types/levels';
import level01 from './level-01';
import level02 from './level-02';
import level03 from './level-03';
import level04 from './level-04';
import level05 from './level-05';
import level06 from './level-06';

export const LEVELS: Level[] = [
  level01,
  level02,
  level03,
  level04,
  level05,
  level06,
  // Future levels will be added here:
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

import { Level } from '@/types/levels';
import level01 from './level-01';
import level02 from './level-02';
import level03 from './level-03';
import level04 from './level-04';
import level05 from './level-05';
import level06 from './level-06';
import level07 from './level-07';
import level08 from './level-08';

export const LEVELS: Level[] = [
  level01,
  level02,
  level03,
  level04,
  level05,
  level06,
  level07,
  level08,
  // Future levels will be added here:
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

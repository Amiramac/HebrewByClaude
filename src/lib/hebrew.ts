/**
 * Combine a Hebrew consonant with a nikkud mark.
 */
export function combineSyllable(consonant: string, vowel: string): string {
  return consonant + vowel;
}

/**
 * Shuffle an array (Fisher-Yates).
 */
export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Pick N random items from an array.
 */
export function pickRandom<T>(array: T[], n: number): T[] {
  return shuffle(array).slice(0, n);
}

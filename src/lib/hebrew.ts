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

/**
 * Map a Hebrew character to its wrong-answer feedback audio path.
 * Returns path like '/audio/feedback/alef-wrong.mp3', or null if unknown.
 */
const CHAR_TO_SLUG: Record<string, string> = {
  'א': 'alef', 'שׁ': 'shin', 'ש': 'shin', 'ל': 'lamed', 'מ': 'mem', 'ב': 'bet',
  'ד': 'dalet', 'ה': 'he', 'י': 'yod', 'ת': 'tav', 'ר': 'resh',
  'ח': 'chet', 'כ': 'kaf', 'נ': 'nun', 'ע': 'ayin', 'פ': 'pe',
  'ג': 'gimel', 'ז': 'zayin', 'ו': 'vav',
  'ט': 'tet', 'ס': 'samekh', 'ק': 'kuf', 'צ': 'tsadi',
};

export function getLetterFeedbackAudio(char: string): string | null {
  const slug = CHAR_TO_SLUG[char];
  return slug ? `/audio/feedback/${slug}-wrong.mp3` : null;
}

/**
 * Map a Hebrew character to its identify-prompt audio path.
 * Returns path like '/audio/identify/alef.mp3', or null if unknown.
 */
export function getLetterIdentifyAudio(char: string): string | null {
  const slug = CHAR_TO_SLUG[char];
  return slug ? `/audio/identify/${slug}.mp3` : null;
}

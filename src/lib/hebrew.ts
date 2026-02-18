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
 * Strip nikkud (vowel marks, dagesh, shin/sin dots) to get the base consonant.
 * e.g. 'בָּ' → 'ב', 'שׁ' → 'שׁ' (shin-dot preserved since it's in the map)
 */
function stripNikkud(char: string): string {
  // Remove vowels (U+05B0-05BD) and dagesh (U+05BC) but keep shin/sin dots (U+05C1-05C2)
  return char.replace(/[\u05B0-\u05BD]/g, '');
}

/**
 * Map a Hebrew character to its slug. Strips nikkud first so syllables like בָּ → ב → 'bet'.
 */
const CHAR_TO_SLUG: Record<string, string> = {
  'א': 'alef', 'שׁ': 'shin', 'ש': 'shin', 'ל': 'lamed', 'מ': 'mem', 'ב': 'bet',
  'ד': 'dalet', 'ה': 'he', 'י': 'yod', 'ת': 'tav', 'ר': 'resh',
  'ח': 'chet', 'כ': 'kaf', 'נ': 'nun', 'ע': 'ayin', 'פ': 'pe',
  'ג': 'gimel', 'ז': 'zayin', 'ו': 'vav',
  'ט': 'tet', 'ס': 'samekh', 'ק': 'kuf', 'צ': 'tsadi',
};

function charToSlug(char: string): string | undefined {
  return CHAR_TO_SLUG[char] ?? CHAR_TO_SLUG[stripNikkud(char)];
}

/**
 * Map a Hebrew character to its wrong-answer feedback audio path.
 * Returns path like '/audio/feedback/alef-wrong.mp3', or null if unknown.
 */
export function getLetterFeedbackAudio(char: string): string | null {
  const slug = charToSlug(char);
  return slug ? `/audio/feedback/${slug}-wrong.mp3` : null;
}

/**
 * Map a Hebrew character to its identify-prompt audio path.
 * Gender determines masculine ("זהה") vs feminine ("זהי") form.
 * Returns path like '/audio/identify/alef.mp3' or '/audio/identify-f/alef.mp3'.
 */
export function getLetterIdentifyAudio(char: string, gender?: 'boy' | 'girl' | null): string | null {
  const slug = charToSlug(char);
  if (!slug) return null;
  const dir = gender === 'girl' ? 'identify-f' : 'identify';
  return `/audio/${dir}/${slug}.mp3`;
}

import { NikkudMark } from '@/types/hebrew';

export const NIKKUD_MARKS: NikkudMark[] = [
  // Level 3 — The First Vowel (/a/ sound)
  { character: '\u05B8', name: 'Kamatz', nameHebrew: 'קָמַץ', sound: 'a', position: 'below', audioFile: '/audio/vowels/kamatz.mp3', level: 3 },
  { character: '\u05B7', name: 'Patach', nameHebrew: 'פַּתָח', sound: 'a', position: 'below', audioFile: '/audio/vowels/patach.mp3', level: 3 },

  // Level 5 — More Vowels
  { character: '\u05B4', name: 'Chirik', nameHebrew: 'חִירִיק', sound: 'i', position: 'below', audioFile: '/audio/vowels/chirik.mp3', level: 5 },
  { character: '\u05B6', name: 'Segol', nameHebrew: 'סֶגוֹל', sound: 'e', position: 'below', audioFile: '/audio/vowels/segol.mp3', level: 5 },

  // Level 7 — All the Vowels
  { character: '\u05B5', name: 'Tzereh', nameHebrew: 'צֵרֵה', sound: 'e', position: 'below', audioFile: '/audio/vowels/tzereh.mp3', level: 7 },
  { character: '\u05B9', name: 'Cholam', nameHebrew: 'חוֹלָם', sound: 'o', position: 'above', audioFile: '/audio/vowels/cholam.mp3', level: 7 },
  { character: '\u05BB', name: 'Kubutz', nameHebrew: 'קוּבּוּץ', sound: 'u', position: 'below', audioFile: '/audio/vowels/kubutz.mp3', level: 7 },
  { character: '\u05BC', name: 'Shuruk', nameHebrew: 'שׁוּרוּק', sound: 'u', position: 'inside', audioFile: '/audio/vowels/shuruk.mp3', level: 7 },

  // Level 9 — The Tricky Shva
  { character: '\u05B0', name: 'Shva', nameHebrew: 'שְׁוָא', sound: '(e/silent)', position: 'below', audioFile: '/audio/vowels/shva.mp3', level: 9 },
];

export function getVowelsByLevel(level: number): NikkudMark[] {
  return NIKKUD_MARKS.filter(v => v.level === level);
}

export function getVowelsUpToLevel(level: number): NikkudMark[] {
  return NIKKUD_MARKS.filter(v => v.level <= level);
}

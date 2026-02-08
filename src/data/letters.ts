import { HebrewLetter } from '@/types/hebrew';

export const HEBREW_LETTERS: HebrewLetter[] = [
  // Level 1 — "Meet the Letters" (First Friends)
  { character: 'א', name: 'Alef', nameHebrew: 'אָלֶף', sound: '(silent)', audioFile: '/audio/letters/alef.mp3', level: 1, mnemonicHint: 'The quiet leader' },
  { character: 'שׁ', name: 'Shin', nameHebrew: 'שִׁין', sound: 'sh', audioFile: '/audio/letters/shin.mp3', level: 1, mnemonicHint: 'Three branches like a tree' },
  { character: 'ל', name: 'Lamed', nameHebrew: 'לָמֶד', sound: 'l', audioFile: '/audio/letters/lamed.mp3', level: 1, mnemonicHint: 'The tall one reaching up' },
  { character: 'מ', name: 'Mem', nameHebrew: 'מֵם', sound: 'm', audioFile: '/audio/letters/mem.mp3', level: 1, finalForm: 'ם', mnemonicHint: 'Maayan starts with Mem!' },
  { character: 'ב', name: 'Bet', nameHebrew: 'בֵּית', sound: 'b', audioFile: '/audio/letters/bet.mp3', level: 1, confusableWith: ['כ'], mnemonicHint: 'A little house (bayit)' },

  // Level 2 — "More Friends" (Second Group)
  { character: 'ד', name: 'Dalet', nameHebrew: 'דָלֶת', sound: 'd', audioFile: '/audio/letters/dalet.mp3', level: 2, confusableWith: ['ר'], mnemonicHint: 'Sharp corner like a door' },
  { character: 'ה', name: 'He', nameHebrew: 'הֵא', sound: 'h', audioFile: '/audio/letters/he.mp3', level: 2, confusableWith: ['ח'], mnemonicHint: 'Has a gap on the left' },
  { character: 'י', name: 'Yod', nameHebrew: 'יוֹד', sound: 'y', audioFile: '/audio/letters/yod.mp3', level: 2, mnemonicHint: 'The smallest letter' },
  { character: 'ת', name: 'Tav', nameHebrew: 'תָּו', sound: 't', audioFile: '/audio/letters/tav.mp3', level: 2, mnemonicHint: 'A foot stepping forward' },
  { character: 'ר', name: 'Resh', nameHebrew: 'רֵישׁ', sound: 'r', audioFile: '/audio/letters/resh.mp3', level: 2, confusableWith: ['ד'], mnemonicHint: 'Smooth curve, no corner' },

  // Level 4 — "Remaining Letters" (Third Group)
  { character: 'ח', name: 'Chet', nameHebrew: 'חֵית', sound: 'ch', audioFile: '/audio/letters/chet.mp3', level: 4, confusableWith: ['ה'], mnemonicHint: 'Closed on both sides' },
  { character: 'כ', name: 'Kaf', nameHebrew: 'כַּף', sound: 'k', audioFile: '/audio/letters/kaf.mp3', level: 4, finalForm: 'ך', confusableWith: ['ב'], mnemonicHint: 'Open like a palm (kaf)' },
  { character: 'נ', name: 'Nun', nameHebrew: 'נוּן', sound: 'n', audioFile: '/audio/letters/nun.mp3', level: 4, finalForm: 'ן', mnemonicHint: 'A little bend' },
  { character: 'ע', name: 'Ayin', nameHebrew: 'עַיִן', sound: '(guttural)', audioFile: '/audio/letters/ayin.mp3', level: 4, mnemonicHint: 'Maayan has Ayin too!' },
  { character: 'פ', name: 'Pe', nameHebrew: 'פֵּא', sound: 'p', audioFile: '/audio/letters/pe.mp3', level: 4, finalForm: 'ף', mnemonicHint: 'A mouth (pe) speaking' },
  { character: 'ג', name: 'Gimel', nameHebrew: 'גִימֶל', sound: 'g', audioFile: '/audio/letters/gimel.mp3', level: 4, mnemonicHint: 'A camel walking' },
  { character: 'ז', name: 'Zayin', nameHebrew: 'זַיִן', sound: 'z', audioFile: '/audio/letters/zayin.mp3', level: 4, confusableWith: ['ו'], mnemonicHint: 'Has a crown on top' },
  { character: 'ו', name: 'Vav', nameHebrew: 'וָו', sound: 'v', audioFile: '/audio/letters/vav.mp3', level: 4, confusableWith: ['ז'], mnemonicHint: 'A straight hook' },

  // Level 6 — "Complete the Aleph-Bet"
  { character: 'ט', name: 'Tet', nameHebrew: 'טֵית', sound: 't', audioFile: '/audio/letters/tet.mp3', level: 6, mnemonicHint: 'A basket curling in' },
  { character: 'ס', name: 'Samekh', nameHebrew: 'סָמֶך', sound: 's', audioFile: '/audio/letters/samekh.mp3', level: 6, confusableWith: ['מ'], mnemonicHint: 'A closed circle' },
  { character: 'ק', name: 'Kuf', nameHebrew: 'קוּף', sound: 'k', audioFile: '/audio/letters/kuf.mp3', level: 6, mnemonicHint: 'A leg hanging down' },
  { character: 'צ', name: 'Tsadi', nameHebrew: 'צָדִי', sound: 'ts', audioFile: '/audio/letters/tsadi.mp3', level: 6, finalForm: 'ץ', mnemonicHint: 'A person on their side' },
];

export const FINAL_FORMS: Record<string, string> = {
  'כ': 'ך',
  'מ': 'ם',
  'נ': 'ן',
  'פ': 'ף',
  'צ': 'ץ',
};

export function getLettersByLevel(level: number): HebrewLetter[] {
  return HEBREW_LETTERS.filter(l => l.level === level);
}

export function getLettersUpToLevel(level: number): HebrewLetter[] {
  return HEBREW_LETTERS.filter(l => l.level <= level);
}

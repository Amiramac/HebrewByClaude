import { HebrewWord } from '@/types/hebrew';

export const HEBREW_WORDS: HebrewWord[] = [
  // Level 5 words (first real words with /a/, /i/, /e/ vowels)
  { word: 'אִמָּא', translation: 'Mom', transliteration: 'ima', audioFile: '/audio/words/ima.mp3', imageFile: '/images/vocabulary/ima.png', level: 5 },
  { word: 'אַבָּא', translation: 'Dad', transliteration: 'aba', audioFile: '/audio/words/aba.mp3', imageFile: '/images/vocabulary/aba.png', level: 5 },
  { word: 'בַּיִת', translation: 'House', transliteration: 'bayit', audioFile: '/audio/words/bayit.mp3', imageFile: '/images/vocabulary/bayit.png', level: 5 },
  { word: 'יַד', translation: 'Hand', transliteration: 'yad', audioFile: '/audio/words/yad.mp3', imageFile: '/images/vocabulary/yad.png', level: 5 },
  { word: 'דָג', translation: 'Fish', transliteration: 'dag', audioFile: '/audio/words/dag.mp3', imageFile: '/images/vocabulary/dag.png', level: 5 },

  // Level 8 words (simple CVC/CVCV words)
  { word: 'שָׁלוֹם', translation: 'Hello/Peace', transliteration: 'shalom', audioFile: '/audio/words/shalom.mp3', imageFile: '/images/vocabulary/shalom.png', level: 8 },
  { word: 'יֶלֶד', translation: 'Boy', transliteration: 'yeled', audioFile: '/audio/words/yeled.mp3', imageFile: '/images/vocabulary/yeled.png', level: 8 },
  { word: 'יַלְדָה', translation: 'Girl', transliteration: 'yalda', audioFile: '/audio/words/yalda.mp3', imageFile: '/images/vocabulary/yalda.png', level: 8 },
  { word: 'סֵפֶר', translation: 'Book', transliteration: 'sefer', audioFile: '/audio/words/sefer.mp3', imageFile: '/images/vocabulary/sefer.png', level: 8 },
  { word: 'כֶּלֶב', translation: 'Dog', transliteration: 'kelev', audioFile: '/audio/words/kelev.mp3', imageFile: '/images/vocabulary/kelev.png', level: 8 },
  { word: 'חָתוּל', translation: 'Cat', transliteration: 'chatul', audioFile: '/audio/words/chatul.mp3', imageFile: '/images/vocabulary/chatul.png', level: 8 },
  { word: 'מַיִם', translation: 'Water', transliteration: 'mayim', audioFile: '/audio/words/mayim.mp3', imageFile: '/images/vocabulary/mayim.png', level: 8 },
  { word: 'לֶחֶם', translation: 'Bread', transliteration: 'lechem', audioFile: '/audio/words/lechem.mp3', imageFile: '/images/vocabulary/lechem.png', level: 8 },
  { word: 'שֶׁמֶשׁ', translation: 'Sun', transliteration: 'shemesh', audioFile: '/audio/words/shemesh.mp3', imageFile: '/images/vocabulary/shemesh.png', level: 8 },
  { word: 'יָרֵחַ', translation: 'Moon', transliteration: 'yareach', audioFile: '/audio/words/yareach.mp3', imageFile: '/images/vocabulary/yareach.png', level: 8 },
];

export function getWordsByLevel(level: number): HebrewWord[] {
  return HEBREW_WORDS.filter(w => w.level === level);
}

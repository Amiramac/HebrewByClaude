export interface HebrewLetter {
  character: string;
  name: string;
  nameHebrew: string;
  sound: string;
  audioFile: string;
  level: number;
  finalForm?: string;
  confusableWith?: string[];
  mnemonicHint?: string;
}

export interface NikkudMark {
  character: string;
  name: string;
  nameHebrew: string;
  sound: string;
  position: 'below' | 'above' | 'inside';
  audioFile: string;
  level: number;
  videoSrc?: string; // e.g. '/videos/vowels/kamatz.mp4' — intro video shown before practice
}

export interface Syllable {
  consonant: string;
  vowel: string;
  combined: string;
  sound: string;
  audioFile: string;
}

export interface HebrewWord {
  word: string;
  translation: string;
  transliteration: string;
  audioFile: string;
  imageFile?: string;
  level: number;
}

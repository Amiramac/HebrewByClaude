import { Level } from '@/types/levels';

const level03: Level = {
  id: 3,
  slug: 'the-first-vowel',
  title: 'The First Vowel',
  titleHebrew: 'הַתְּנוּעָה הָרִאשׁוֹנָה',
  description: 'Learn your first vowel sound and read your first syllables!',
  icon: '✨',
  color: '#4ECDC4',
  requiredStars: 16,
  vowels: ['ָ', 'ַ'],
  lessons: [
    {
      id: 'l3-intro-kamatz',
      type: 'vowel-intro',
      title: 'Meet Kamatz',
      titleHebrew: 'הכירו את קָמַץ',
      description: 'The little T-shape under a letter says "ah"!',
      activities: [
        {
          id: 'l3-kamatz-find',
          type: 'find-the-letter',
          instruction: 'Find the letter with the Kamatz (ah) sound!',
          items: [
            { id: 'k1', prompt: 'בָּ', correct: 'בָּ', options: ['בָּ', 'ב', 'שׁ', 'ל'] },
            { id: 'k2', prompt: 'מָ', correct: 'מָ', options: ['מ', 'מָ', 'ב', 'א'] },
            { id: 'k3', prompt: 'לָ', correct: 'לָ', options: ['ל', 'שׁ', 'לָ', 'מ'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l3-first-syllables',
      type: 'syllable-reading',
      title: 'First Syllables!',
      titleHebrew: 'הצירופים הראשונים!',
      description: 'A letter + a vowel = a syllable you can read!',
      activities: [
        {
          id: 'l3-syllable-listen',
          type: 'listen-and-choose',
          instruction: 'Listen to the sound and tap the right syllable!',
          items: [
            { id: 'sl1', prompt: 'ba', promptAudio: '/audio/syllables/ba.mp3', correct: 'בָּ', options: ['בָּ', 'מָ', 'לָ', 'שָׁ'] },
            { id: 'sl2', prompt: 'ma', promptAudio: '/audio/syllables/ma.mp3', correct: 'מָ', options: ['בָּ', 'מָ', 'דָ', 'רָ'] },
            { id: 'sl3', prompt: 'sha', promptAudio: '/audio/syllables/sha.mp3', correct: 'שָׁ', options: ['שָׁ', 'לָ', 'תָּ', 'הָ'] },
            { id: 'sl4', prompt: 'la', promptAudio: '/audio/syllables/la.mp3', correct: 'לָ', options: ['בָּ', 'לָ', 'רָ', 'מָ'] },
            { id: 'sl5', prompt: 'da', promptAudio: '/audio/syllables/da.mp3', correct: 'דָ', options: ['דָ', 'רָ', 'הָ', 'תָּ'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l3-build-syllables',
      type: 'syllable-reading',
      title: 'Build Syllables!',
      titleHebrew: 'בנו צירופים!',
      description: 'Put a letter and a vowel together!',
      activities: [
        {
          id: 'l3-build',
          type: 'build-syllable',
          instruction: 'Build the syllable you hear!',
          items: [
            { id: 'bs1', prompt: 'ba', promptAudio: '/audio/syllables/ba.mp3', correct: 'בָּ', options: ['ב', 'מ', 'ל', 'שׁ'] },
            { id: 'bs2', prompt: 'ma', promptAudio: '/audio/syllables/ma.mp3', correct: 'מָ', options: ['ב', 'מ', 'ד', 'ר'] },
            { id: 'bs3', prompt: 'sha', promptAudio: '/audio/syllables/sha.mp3', correct: 'שָׁ', options: ['שׁ', 'ל', 'ת', 'ה'] },
            { id: 'bs4', prompt: 'ta', promptAudio: '/audio/syllables/ta.mp3', correct: 'תָּ', options: ['ד', 'ר', 'ת', 'ה'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l3-read-mama',
      type: 'syllable-reading',
      title: 'Read Your First Word!',
      titleHebrew: 'קראו את המילה הראשונה!',
      description: 'מָ + מָ = מָמָא (Mama!)',
      activities: [
        {
          id: 'l3-mama',
          type: 'listen-and-choose',
          instruction: 'Which syllables make "mama"?',
          items: [
            { id: 'mm1', prompt: 'What is the first syllable in mama?', correct: 'מָ', options: ['בָּ', 'מָ', 'לָ', 'שָׁ'] },
            { id: 'mm2', prompt: 'What is the second syllable in mama?', correct: 'מָ', options: ['דָ', 'מָ', 'רָ', 'הָ'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l3-syllable-review',
      type: 'review',
      title: 'Syllable Review',
      titleHebrew: 'חזרה על צירופים',
      description: 'Practice all the syllables you learned!',
      activities: [
        {
          id: 'l3-review-match',
          type: 'match-pairs',
          instruction: 'Match each syllable to its sound!',
          items: [
            { id: 'rm1', prompt: 'בָּ (ba)', correct: 'בָּ', options: ['בָּ', 'מָ', 'שָׁ', 'לָ', 'דָ'] },
            { id: 'rm2', prompt: 'מָ (ma)', correct: 'מָ', options: ['בָּ', 'מָ', 'שָׁ', 'לָ', 'דָ'] },
            { id: 'rm3', prompt: 'שָׁ (sha)', correct: 'שָׁ', options: ['בָּ', 'מָ', 'שָׁ', 'לָ', 'דָ'] },
            { id: 'rm4', prompt: 'לָ (la)', correct: 'לָ', options: ['בָּ', 'מָ', 'שָׁ', 'לָ', 'דָ'] },
            { id: 'rm5', prompt: 'דָ (da)', correct: 'דָ', options: ['בָּ', 'מָ', 'שָׁ', 'לָ', 'דָ'] },
          ],
          maxStars: 3,
        },
      ],
    },
  ],
};

export default level03;

import { Level } from '@/types/levels';

const level02: Level = {
  id: 2,
  slug: 'more-friends',
  title: 'More Friends',
  titleHebrew: 'עוד חברים',
  description: 'Learn 5 more letters and practice telling similar letters apart!',
  icon: '🎈',
  color: '#FF6B6B',
  requiredStars: 8,
  letters: ['ד', 'ה', 'י', 'ת', 'ר'],
  lessons: [
    {
      id: 'l2-intro-dalet',
      type: 'letter-intro',
      title: 'Meet Dalet',
      titleHebrew: 'הכירו את דָלֶת',
      description: 'Sharp corner like a door (delet)!',
      activities: [
        {
          id: 'l2-dalet-tap',
          type: 'tap-the-letter',
          instruction: 'Tap the letter Dalet!',
          items: [
            { id: 'd1', prompt: 'ד', correct: 'ד', options: ['ד', 'ר', 'ה', 'ב'] },
            { id: 'd2', prompt: 'ד', correct: 'ד', options: ['א', 'ד', 'ל', 'מ'] },
            { id: 'd3', prompt: 'ד', correct: 'ד', options: ['שׁ', 'ר', 'ד', 'ת'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l2-intro-he',
      type: 'letter-intro',
      title: 'Meet He',
      titleHebrew: 'הכירו את הֵא',
      description: 'Has a gap on the left side!',
      activities: [
        {
          id: 'l2-he-tap',
          type: 'tap-the-letter',
          instruction: 'Tap the letter He!',
          items: [
            { id: 'h1', prompt: 'ה', correct: 'ה', options: ['ה', 'ד', 'ר', 'ב'] },
            { id: 'h2', prompt: 'ה', correct: 'ה', options: ['א', 'ה', 'ל', 'מ'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l2-intro-yod',
      type: 'letter-intro',
      title: 'Meet Yod',
      titleHebrew: 'הכירו את יוֹד',
      description: 'The smallest letter in the whole alphabet!',
      activities: [
        {
          id: 'l2-yod-tap',
          type: 'tap-the-letter',
          instruction: 'Tap the letter Yod!',
          items: [
            { id: 'y1', prompt: 'י', correct: 'י', options: ['י', 'ד', 'ר', 'ו'] },
            { id: 'y2', prompt: 'י', correct: 'י', options: ['א', 'י', 'ל', 'מ'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l2-intro-tav',
      type: 'letter-intro',
      title: 'Meet Tav',
      titleHebrew: 'הכירו את תָּו',
      description: 'A foot stepping forward!',
      activities: [
        {
          id: 'l2-tav-tap',
          type: 'tap-the-letter',
          instruction: 'Tap the letter Tav!',
          items: [
            { id: 't1', prompt: 'ת', correct: 'ת', options: ['ת', 'ד', 'ר', 'ב'] },
            { id: 't2', prompt: 'ת', correct: 'ת', options: ['א', 'ת', 'ל', 'מ'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l2-intro-resh',
      type: 'letter-intro',
      title: 'Meet Resh',
      titleHebrew: 'הכירו את רֵישׁ',
      description: 'Smooth curve — no sharp corner!',
      activities: [
        {
          id: 'l2-resh-tap',
          type: 'tap-the-letter',
          instruction: 'Tap the letter Resh!',
          items: [
            { id: 'r1', prompt: 'ר', correct: 'ר', options: ['ד', 'ר', 'ה', 'ב'] },
            { id: 'r2', prompt: 'ר', correct: 'ר', options: ['א', 'ר', 'ל', 'מ'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l2-discrimination',
      type: 'visual-discrimination',
      title: 'Dalet or Resh?',
      titleHebrew: 'ד או ר?',
      description: 'Sharp corner = Dalet! Smooth curve = Resh!',
      activities: [
        {
          id: 'l2-dalet-resh',
          type: 'listen-and-choose',
          instruction: 'Which one is it? Look carefully!',
          items: [
            { id: 'dr1', prompt: 'Dalet (sharp corner)', promptAudio: '/audio/letters/dalet.mp3', correct: 'ד', options: ['ד', 'ר'] },
            { id: 'dr2', prompt: 'Resh (smooth curve)', promptAudio: '/audio/letters/resh.mp3', correct: 'ר', options: ['ד', 'ר'] },
            { id: 'dr3', prompt: 'Dalet', promptAudio: '/audio/letters/dalet.mp3', correct: 'ד', options: ['ד', 'ר'] },
            { id: 'dr4', prompt: 'Resh', promptAudio: '/audio/letters/resh.mp3', correct: 'ר', options: ['ד', 'ר'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l2-review-all10',
      type: 'review',
      title: 'All 10 Letters!',
      titleHebrew: 'כל 10 האותיות!',
      description: 'Review all the letters you know!',
      activities: [
        {
          id: 'l2-listen-all',
          type: 'listen-and-choose',
          instruction: 'Listen and tap the right letter!',
          items: [
            { id: 'ra1', prompt: 'Alef', promptAudio: '/audio/letters/alef.mp3', correct: 'א', options: ['א', 'ד', 'ה', 'ת'] },
            { id: 'ra2', prompt: 'Shin', promptAudio: '/audio/letters/shin.mp3', correct: 'שׁ', options: ['שׁ', 'ר', 'י', 'מ'] },
            { id: 'ra3', prompt: 'Dalet', promptAudio: '/audio/letters/dalet.mp3', correct: 'ד', options: ['ד', 'ר', 'ב', 'ל'] },
            { id: 'ra4', prompt: 'Mem', promptAudio: '/audio/letters/mem.mp3', correct: 'מ', options: ['ת', 'מ', 'ה', 'א'] },
            { id: 'ra5', prompt: 'Yod', promptAudio: '/audio/letters/yod.mp3', correct: 'י', options: ['ל', 'ב', 'י', 'שׁ'] },
          ],
          maxStars: 3,
        },
      ],
    },
  ],
};

export default level02;

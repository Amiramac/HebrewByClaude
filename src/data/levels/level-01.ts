import { Level } from '@/types/levels';

const level01: Level = {
  id: 1,
  slug: 'meet-the-letters',
  title: 'Meet the Letters',
  titleHebrew: 'פגישה עם האותיות',
  description: 'Learn your first 5 Hebrew letters and discover right-to-left reading!',
  icon: '🌟',
  color: '#4A90D9',
  requiredStars: 0,
  letters: ['א', 'שׁ', 'ל', 'מ', 'ב'],
  lessons: [
    {
      id: 'l1-intro-alef',
      type: 'letter-intro',
      title: 'Meet Alef',
      titleHebrew: 'הכירו את אָלֶף',
      description: 'The first letter of the Aleph-Bet — the quiet leader!',
      activities: [
        {
          id: 'l1-alef-tap',
          type: 'tap-the-letter',
          instruction: 'Tap the letter Alef!',
          items: [
            { id: 'a1', prompt: 'א', correct: 'א', options: ['א', 'ב', 'ל', 'מ'] },
            { id: 'a2', prompt: 'א', correct: 'א', options: ['שׁ', 'א', 'ד', 'ר'] },
            { id: 'a3', prompt: 'א', correct: 'א', options: ['ב', 'ל', 'א', 'ת'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l1-intro-shin',
      type: 'letter-intro',
      title: 'Meet Shin',
      titleHebrew: 'הכירו את שִׁין',
      description: 'Three branches like a tree!',
      activities: [
        {
          id: 'l1-shin-tap',
          type: 'tap-the-letter',
          instruction: 'Tap the letter Shin!',
          items: [
            { id: 's1', prompt: 'שׁ', correct: 'שׁ', options: ['א', 'שׁ', 'ל', 'מ'] },
            { id: 's2', prompt: 'שׁ', correct: 'שׁ', options: ['שׁ', 'ב', 'ד', 'ר'] },
            { id: 's3', prompt: 'שׁ', correct: 'שׁ', options: ['ב', 'ל', 'שׁ', 'ת'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l1-intro-lamed',
      type: 'letter-intro',
      title: 'Meet Lamed',
      titleHebrew: 'הכירו את לָמֶד',
      description: 'The tallest letter — reaching for the sky!',
      activities: [
        {
          id: 'l1-lamed-tap',
          type: 'tap-the-letter',
          instruction: 'Tap the letter Lamed!',
          items: [
            { id: 'la1', prompt: 'ל', correct: 'ל', options: ['א', 'שׁ', 'ל', 'מ'] },
            { id: 'la2', prompt: 'ל', correct: 'ל', options: ['ל', 'ב', 'ד', 'ר'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l1-intro-mem',
      type: 'letter-intro',
      title: 'Meet Mem',
      titleHebrew: 'הכירו את מֵם',
      description: "Maayan starts with Mem!",
      activities: [
        {
          id: 'l1-mem-tap',
          type: 'tap-the-letter',
          instruction: 'Tap the letter Mem!',
          items: [
            { id: 'm1', prompt: 'מ', correct: 'מ', options: ['א', 'שׁ', 'ל', 'מ'] },
            { id: 'm2', prompt: 'מ', correct: 'מ', options: ['מ', 'ב', 'ד', 'ר'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l1-intro-bet',
      type: 'letter-intro',
      title: 'Meet Bet',
      titleHebrew: 'הכירו את בֵּית',
      description: 'A little house — Bayit means house!',
      activities: [
        {
          id: 'l1-bet-tap',
          type: 'tap-the-letter',
          instruction: 'Tap the letter Bet!',
          items: [
            { id: 'b1', prompt: 'ב', correct: 'ב', options: ['א', 'שׁ', 'ל', 'ב'] },
            { id: 'b2', prompt: 'ב', correct: 'ב', options: ['ב', 'מ', 'ד', 'ר'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l1-review-match',
      type: 'review',
      title: 'Match the Letters!',
      titleHebrew: 'התאימו את האותיות!',
      description: 'Can you find the matching pairs?',
      activities: [
        {
          id: 'l1-match',
          type: 'match-pairs',
          instruction: 'Match each letter to its twin!',
          items: [
            { id: 'mp1', prompt: 'א', correct: 'א', options: ['א', 'שׁ', 'ל', 'מ', 'ב'] },
            { id: 'mp2', prompt: 'שׁ', correct: 'שׁ', options: ['א', 'שׁ', 'ל', 'מ', 'ב'] },
            { id: 'mp3', prompt: 'ל', correct: 'ל', options: ['א', 'שׁ', 'ל', 'מ', 'ב'] },
            { id: 'mp4', prompt: 'מ', correct: 'מ', options: ['א', 'שׁ', 'ל', 'מ', 'ב'] },
            { id: 'mp5', prompt: 'ב', correct: 'ב', options: ['א', 'שׁ', 'ל', 'מ', 'ב'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l1-review-listen',
      type: 'review',
      title: 'Listen & Choose',
      titleHebrew: 'הקשיבו ובחרו',
      description: 'Hear the letter name, tap the right one!',
      activities: [
        {
          id: 'l1-listen',
          type: 'listen-and-choose',
          instruction: 'Listen and tap the right letter!',
          items: [
            { id: 'lc1', prompt: 'Alef', promptAudio: '/audio/letters/alef.mp3', correct: 'א', options: ['א', 'שׁ', 'ל', 'מ'] },
            { id: 'lc2', prompt: 'Shin', promptAudio: '/audio/letters/shin.mp3', correct: 'שׁ', options: ['א', 'שׁ', 'ב', 'מ'] },
            { id: 'lc3', prompt: 'Lamed', promptAudio: '/audio/letters/lamed.mp3', correct: 'ל', options: ['א', 'ל', 'ב', 'מ'] },
            { id: 'lc4', prompt: 'Mem', promptAudio: '/audio/letters/mem.mp3', correct: 'מ', options: ['שׁ', 'ל', 'ב', 'מ'] },
            { id: 'lc5', prompt: 'Bet', promptAudio: '/audio/letters/bet.mp3', correct: 'ב', options: ['א', 'שׁ', 'ל', 'ב'] },
          ],
          maxStars: 3,
        },
      ],
    },
  ],
};

export default level01;

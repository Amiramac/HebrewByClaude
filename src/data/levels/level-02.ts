import { Level } from '@/types/levels';

const level02: Level = {
  id: 2,
  slug: 'more-friends',
  title: 'עוד חברים',
  titleHebrew: 'עוד חברים',
  description: 'למדו עוד 5 אותיות ותרגלו להבדיל ביניהן!',
  icon: '\uD83C\uDF88',
  color: '#FF6B6B',
  requiredStars: 8,
  letters: ['ד', 'ה', 'י', 'ת', 'ר'],
  lessons: [
    {
      id: 'l2-intro-dalet',
      type: 'letter-intro',
      title: 'הכירו את דָלֶת',
      titleHebrew: 'הכירו את דָלֶת',
      description: 'פינה חדה כמו דלת!',
      activities: [
        {
          id: 'l2-dalet-tap',
          type: 'tap-the-letter',
          instruction: 'מצאו את האות דלת!',
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
      title: 'הכירו את הֵא',
      titleHebrew: 'הכירו את הֵא',
      description: 'יש לה פתח בצד שמאל!',
      activities: [
        {
          id: 'l2-he-tap',
          type: 'tap-the-letter',
          instruction: 'מצאו את האות הא!',
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
      title: 'הכירו את יוֹד',
      titleHebrew: 'הכירו את יוֹד',
      description: 'האות הכי קטנה באלף-בית!',
      activities: [
        {
          id: 'l2-yod-tap',
          type: 'tap-the-letter',
          instruction: 'מצאו את האות יוד!',
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
      title: 'הכירו את תָּו',
      titleHebrew: 'הכירו את תָּו',
      description: 'רגל שצועדת קדימה!',
      activities: [
        {
          id: 'l2-tav-tap',
          type: 'tap-the-letter',
          instruction: 'מצאו את האות תו!',
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
      title: 'הכירו את רֵישׁ',
      titleHebrew: 'הכירו את רֵישׁ',
      description: 'עיגול חלק — בלי פינה!',
      activities: [
        {
          id: 'l2-resh-tap',
          type: 'tap-the-letter',
          instruction: 'מצאו את האות ריש!',
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
      title: 'ד או ר?',
      titleHebrew: 'ד או ר?',
      description: 'פינה חדה = דלת! עיגול חלק = ריש!',
      activities: [
        {
          id: 'l2-dalet-resh',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על האות הנכונה!',
          items: [
            { id: 'dr1', prompt: 'דלת', promptAudio: '/audio/letters/dalet.mp3', correct: 'ד', options: ['ד', 'ר'] },
            { id: 'dr2', prompt: 'ריש', promptAudio: '/audio/letters/resh.mp3', correct: 'ר', options: ['ד', 'ר'] },
            { id: 'dr3', prompt: 'דלת', promptAudio: '/audio/letters/dalet.mp3', correct: 'ד', options: ['ד', 'ר'] },
            { id: 'dr4', prompt: 'ריש', promptAudio: '/audio/letters/resh.mp3', correct: 'ר', options: ['ד', 'ר'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l2-review-all10',
      type: 'review',
      title: 'כל 10 האותיות!',
      titleHebrew: 'כל 10 האותיות!',
      description: 'חזרו על כל האותיות שלמדתם!',
      activities: [
        {
          id: 'l2-listen-all',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על האות הנכונה!',
          items: [
            { id: 'ra1', prompt: 'אלף', promptAudio: '/audio/letters/alef.mp3', correct: 'א', options: ['א', 'ד', 'ה', 'ת'] },
            { id: 'ra2', prompt: 'שין', promptAudio: '/audio/letters/shin.mp3', correct: 'שׁ', options: ['שׁ', 'ר', 'י', 'מ'] },
            { id: 'ra3', prompt: 'דלת', promptAudio: '/audio/letters/dalet.mp3', correct: 'ד', options: ['ד', 'ר', 'ב', 'ל'] },
            { id: 'ra4', prompt: 'מם', promptAudio: '/audio/letters/mem.mp3', correct: 'מ', options: ['ת', 'מ', 'ה', 'א'] },
            { id: 'ra5', prompt: 'יוד', promptAudio: '/audio/letters/yod.mp3', correct: 'י', options: ['ל', 'ב', 'י', 'שׁ'] },
          ],
          maxStars: 3,
        },
      ],
    },
  ],
};

export default level02;

import { Level } from '@/types/levels';

const level01: Level = {
  id: 1,
  slug: 'meet-the-letters',
  title: 'פגישה עם האותיות',
  titleHebrew: 'פגישה עם האותיות',
  description: 'למדו את 5 האותיות הראשונות!',
  icon: '\uD83C\uDF1F',
  color: '#4A90D9',
  requiredStars: 0,
  letters: ['א', 'שׁ', 'ל', 'מ', 'ב'],
  lessons: [
    {
      id: 'l1-intro-alef',
      type: 'letter-intro',
      title: 'הכירו את אָלֶף',
      titleHebrew: 'הכירו את אָלֶף',
      description: 'האות הראשונה באלף-בית!',
      activities: [
        {
          id: 'l1-alef-tap',
          type: 'tap-the-letter',
          instruction: 'מצאו את האות אלף!',
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
      title: 'הכירו את שִׁין',
      titleHebrew: 'הכירו את שִׁין',
      description: 'שלושה ענפים כמו עץ!',
      activities: [
        {
          id: 'l1-shin-tap',
          type: 'tap-the-letter',
          instruction: 'מצאו את האות שין!',
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
      title: 'הכירו את לָמֶד',
      titleHebrew: 'הכירו את לָמֶד',
      description: 'האות הכי גבוהה!',
      activities: [
        {
          id: 'l1-lamed-tap',
          type: 'tap-the-letter',
          instruction: 'מצאו את האות למד!',
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
      title: 'הכירו את מֵם',
      titleHebrew: 'הכירו את מֵם',
      description: 'השם מעיין מתחיל במם!',
      activities: [
        {
          id: 'l1-mem-tap',
          type: 'tap-the-letter',
          instruction: 'מצאו את האות מם!',
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
      title: 'הכירו את בֵּית',
      titleHebrew: 'הכירו את בֵּית',
      description: 'בית קטן — בַּיִת!',
      activities: [
        {
          id: 'l1-bet-tap',
          type: 'tap-the-letter',
          instruction: 'מצאו את האות בית!',
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
      title: 'התאימו את האותיות!',
      titleHebrew: 'התאימו את האותיות!',
      description: 'מצאו את הזוגות!',
      activities: [
        {
          id: 'l1-match',
          type: 'match-pairs',
          instruction: 'התאימו כל אות לתאומה שלה!',
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
      title: 'הקשיבו ובחרו',
      titleHebrew: 'הקשיבו ובחרו',
      description: 'שמעו את שם האות ולחצו עליה!',
      activities: [
        {
          id: 'l1-listen',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על האות הנכונה!',
          items: [
            { id: 'lc1', prompt: 'אלף', promptAudio: '/audio/letters/alef.mp3', correct: 'א', options: ['א', 'שׁ', 'ל', 'מ'] },
            { id: 'lc2', prompt: 'שין', promptAudio: '/audio/letters/shin.mp3', correct: 'שׁ', options: ['א', 'שׁ', 'ב', 'מ'] },
            { id: 'lc3', prompt: 'למד', promptAudio: '/audio/letters/lamed.mp3', correct: 'ל', options: ['א', 'ל', 'ב', 'מ'] },
            { id: 'lc4', prompt: 'מם', promptAudio: '/audio/letters/mem.mp3', correct: 'מ', options: ['שׁ', 'ל', 'ב', 'מ'] },
            { id: 'lc5', prompt: 'בית', promptAudio: '/audio/letters/bet.mp3', correct: 'ב', options: ['א', 'שׁ', 'ל', 'ב'] },
          ],
          maxStars: 3,
        },
      ],
    },
  ],
};

export default level01;

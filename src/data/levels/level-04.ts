import { Level } from '@/types/levels';

const level04: Level = {
  id: 4,
  slug: 'more-letters',
  title: 'עוד אותיות',
  titleHebrew: 'עוד אותיות',
  description: 'למדו עוד 8 אותיות חדשות!',
  icon: '\uD83C\uDF1F',
  color: '#FF8C42',
  requiredStars: 28,
  letters: ['\u05D7', '\u05DB', '\u05E0', '\u05E2', '\u05E4', '\u05D2', '\u05D6', '\u05D5'],
  lessons: [
    {
      id: 'l4-intro-chet',
      type: 'letter-intro',
      title: '\u05D7\u05B4\u05D9\u05EA',
      titleHebrew: '\u05D7\u05B4\u05D9\u05EA',
      description: 'סגורה משני הצדדים!',
      activities: [
        {
          id: 'l4-chet-tap',
          type: 'tap-the-letter',
          instruction: '\u05DE\u05E6\u05D0\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D5\u05EA \u05D7\u05D9\u05EA!',
          items: [
            { id: 'c1', prompt: '\u05D7', correct: '\u05D7', options: ['\u05D7', '\u05D4', '\u05EA', '\u05D1'] },
            { id: 'c2', prompt: '\u05D7', correct: '\u05D7', options: ['\u05DE', '\u05D7', '\u05DC', '\u05D0'] },
            { id: 'c3', prompt: '\u05D7', correct: '\u05D7', options: ['\u05E8', '\u05D3', '\u05D9', '\u05D7'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l4-intro-kaf',
      type: 'letter-intro',
      title: '\u05DB\u05BC\u05B8\u05E3',
      titleHebrew: '\u05DB\u05BC\u05B8\u05E3',
      description: 'דומה לבית אבל פתוחה!',
      activities: [
        {
          id: 'l4-kaf-tap',
          type: 'tap-the-letter',
          instruction: '\u05DE\u05E6\u05D0\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D5\u05EA \u05DB\u05E3!',
          items: [
            { id: 'kf1', prompt: '\u05DB', correct: '\u05DB', options: ['\u05DB', '\u05D1', '\u05DC', '\u05DE'] },
            { id: 'kf2', prompt: '\u05DB', correct: '\u05DB', options: ['\u05D4', '\u05EA', '\u05DB', '\u05E8'] },
            { id: 'kf3', prompt: '\u05DB', correct: '\u05DB', options: ['\u05D3', '\u05DB', '\u05D0', '\u05E9\u05C1'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l4-intro-nun',
      type: 'letter-intro',
      title: '\u05E0\u05D5\u05DF',
      titleHebrew: '\u05E0\u05D5\u05DF',
      description: 'עומדת ישר כמו חייל!',
      activities: [
        {
          id: 'l4-nun-tap',
          type: 'tap-the-letter',
          instruction: '\u05DE\u05E6\u05D0\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D5\u05EA \u05E0\u05D5\u05DF!',
          items: [
            { id: 'n1', prompt: '\u05E0', correct: '\u05E0', options: ['\u05E0', '\u05D2', '\u05DC', '\u05D9'] },
            { id: 'n2', prompt: '\u05E0', correct: '\u05E0', options: ['\u05EA', '\u05D7', '\u05E0', '\u05D1'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l4-intro-ayin',
      type: 'letter-intro',
      title: '\u05E2\u05B7\u05D9\u05DF',
      titleHebrew: '\u05E2\u05B7\u05D9\u05DF',
      description: '\u05D2\u05DD \u05D1\u05DE\u05E2\u05D9\u05DF \u05D9\u05E9 \u05E2\u05D9\u05DF!',
      activities: [
        {
          id: 'l4-ayin-tap',
          type: 'tap-the-letter',
          instruction: '\u05DE\u05E6\u05D0\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D5\u05EA \u05E2\u05D9\u05DF!',
          items: [
            { id: 'ay1', prompt: '\u05E2', correct: '\u05E2', options: ['\u05E2', '\u05E6', '\u05D0', '\u05E9\u05C1'] },
            { id: 'ay2', prompt: '\u05E2', correct: '\u05E2', options: ['\u05DB', '\u05E2', '\u05D7', '\u05DE'] },
            { id: 'ay3', prompt: '\u05E2', correct: '\u05E2', options: ['\u05D4', '\u05E8', '\u05D3', '\u05E2'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l4-intro-pe',
      type: 'letter-intro',
      title: '\u05E4\u05B5\u05D0',
      titleHebrew: '\u05E4\u05B5\u05D0',
      description: 'פה פתוח!',
      activities: [
        {
          id: 'l4-pe-tap',
          type: 'tap-the-letter',
          instruction: '\u05DE\u05E6\u05D0\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D5\u05EA \u05E4\u05D0!',
          items: [
            { id: 'pe1', prompt: '\u05E4', correct: '\u05E4', options: ['\u05E4', '\u05DB', '\u05D1', '\u05EA'] },
            { id: 'pe2', prompt: '\u05E4', correct: '\u05E4', options: ['\u05D7', '\u05E0', '\u05E4', '\u05DC'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l4-intro-gimel-zayin-vav',
      type: 'letter-intro',
      title: '\u05D2\u05D9\u05DE\u05DC, \u05D6\u05D9\u05DF, \u05D5\u05D5',
      titleHebrew: '\u05D2\u05D9\u05DE\u05DC, \u05D6\u05D9\u05DF, \u05D5\u05D5',
      description: 'שלוש אותיות חדשות!',
      activities: [
        {
          id: 'l4-gzv-tap',
          type: 'tap-the-letter',
          instruction: '\u05DE\u05E6\u05D0\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D5\u05EA!',
          items: [
            { id: 'g1', prompt: '\u05D2', correct: '\u05D2', options: ['\u05D2', '\u05E0', '\u05DB', '\u05DC'] },
            { id: 'z1', prompt: '\u05D6', correct: '\u05D6', options: ['\u05D5', '\u05D6', '\u05D9', '\u05E8'] },
            { id: 'v1', prompt: '\u05D5', correct: '\u05D5', options: ['\u05D6', '\u05D3', '\u05D5', '\u05EA'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l4-discrimination',
      type: 'visual-discrimination',
      title: 'אותיות דומות',
      titleHebrew: 'אותיות דומות',
      description: 'ח vs ה, כ vs ב, ז vs ו - הקשיבו היטב!',
      activities: [
        {
          id: 'l4-disc',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על האות הנכונה!',
          items: [
            { id: 'disc1', prompt: '\u05D7', promptAudio: '/audio/letters/chet.mp3', correct: '\u05D7', options: ['\u05D7', '\u05D4'] },
            { id: 'disc2', prompt: '\u05D4', promptAudio: '/audio/letters/he.mp3', correct: '\u05D4', options: ['\u05D4', '\u05D7'] },
            { id: 'disc3', prompt: '\u05DB', promptAudio: '/audio/letters/kaf.mp3', correct: '\u05DB', options: ['\u05DB', '\u05D1'] },
            { id: 'disc4', prompt: '\u05D1', promptAudio: '/audio/letters/bet.mp3', correct: '\u05D1', options: ['\u05D1', '\u05DB'] },
            { id: 'disc5', prompt: '\u05D6', promptAudio: '/audio/letters/zayin.mp3', correct: '\u05D6', options: ['\u05D6', '\u05D5'] },
            { id: 'disc6', prompt: '\u05D5', promptAudio: '/audio/letters/vav.mp3', correct: '\u05D5', options: ['\u05D5', '\u05D6'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l4-review',
      type: 'review',
      title: 'חזרה על כל האותיות',
      titleHebrew: 'חזרה על כל האותיות',
      description: 'תרגלו את כל 8 האותיות החדשות!',
      activities: [
        {
          id: 'l4-review-listen',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על האות הנכונה!',
          items: [
            { id: 'rv1', prompt: '\u05D7', promptAudio: '/audio/letters/chet.mp3', correct: '\u05D7', options: ['\u05D7', '\u05E2', '\u05D2', '\u05E4'] },
            { id: 'rv2', prompt: '\u05DB', promptAudio: '/audio/letters/kaf.mp3', correct: '\u05DB', options: ['\u05E0', '\u05DB', '\u05D6', '\u05D5'] },
            { id: 'rv3', prompt: '\u05E2', promptAudio: '/audio/letters/ayin.mp3', correct: '\u05E2', options: ['\u05E4', '\u05D7', '\u05E2', '\u05D2'] },
            { id: 'rv4', prompt: '\u05D2', promptAudio: '/audio/letters/gimel.mp3', correct: '\u05D2', options: ['\u05D2', '\u05E0', '\u05D5', '\u05D6'] },
            { id: 'rv5', prompt: '\u05E4', promptAudio: '/audio/letters/pe.mp3', correct: '\u05E4', options: ['\u05DB', '\u05D7', '\u05E4', '\u05E2'] },
            { id: 'rv6', prompt: '\u05D6', promptAudio: '/audio/letters/zayin.mp3', correct: '\u05D6', options: ['\u05D6', '\u05D5', '\u05E0', '\u05D2'] },
          ],
          maxStars: 3,
        },
      ],
    },
  ],
};

export default level04;

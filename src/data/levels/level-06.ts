import { Level } from '@/types/levels';

const level06: Level = {
  id: 6,
  slug: 'complete-alefbet',
  title: 'משלימים את הא-ב',
  titleHebrew: 'משלימים את הא-ב',
  description: 'ארבע אותיות אחרונות - ואתם יודעים את כולן!',
  icon: '\uD83C\uDFC6',
  color: '#27AE60',
  requiredStars: 56,
  letters: ['\u05D8', '\u05E1', '\u05E7', '\u05E6'],
  lessons: [
    {
      id: 'l6-intro-tet',
      type: 'letter-intro',
      title: '\u05D8\u05B5\u05D9\u05EA',
      titleHebrew: '\u05D8\u05B5\u05D9\u05EA',
      description: 'סלסול מתוק!',
      activities: [
        {
          id: 'l6-tet-tap',
          type: 'tap-the-letter',
          instruction: '\u05DE\u05E6\u05D0\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D5\u05EA \u05D8\u05D9\u05EA!',
          items: [
            { id: 'tt1', prompt: '\u05D8', correct: '\u05D8', options: ['\u05D8', '\u05DE', '\u05E1', '\u05E7'] },
            { id: 'tt2', prompt: '\u05D8', correct: '\u05D8', options: ['\u05EA', '\u05D8', '\u05D7', '\u05E2'] },
            { id: 'tt3', prompt: '\u05D8', correct: '\u05D8', options: ['\u05DB', '\u05E0', '\u05E4', '\u05D8'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l6-intro-samekh',
      type: 'letter-intro',
      title: '\u05E1\u05B8\u05DE\u05B6\u05DA',
      titleHebrew: '\u05E1\u05B8\u05DE\u05B6\u05DA',
      description: 'עיגול שלם!',
      activities: [
        {
          id: 'l6-samekh-tap',
          type: 'tap-the-letter',
          instruction: '\u05DE\u05E6\u05D0\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D5\u05EA \u05E1\u05DE\u05DA!',
          items: [
            { id: 'sm1', prompt: '\u05E1', correct: '\u05E1', options: ['\u05E1', '\u05DE', '\u05D1', '\u05DC'] },
            { id: 'sm2', prompt: '\u05E1', correct: '\u05E1', options: ['\u05D7', '\u05E1', '\u05D2', '\u05E0'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l6-intro-kuf',
      type: 'letter-intro',
      title: '\u05E7\u05D5\u05E3',
      titleHebrew: '\u05E7\u05D5\u05E3',
      description: 'רגל יורדת למטה!',
      activities: [
        {
          id: 'l6-kuf-tap',
          type: 'tap-the-letter',
          instruction: '\u05DE\u05E6\u05D0\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D5\u05EA \u05E7\u05D5\u05E3!',
          items: [
            { id: 'ku1', prompt: '\u05E7', correct: '\u05E7', options: ['\u05E7', '\u05DB', '\u05E4', '\u05D4'] },
            { id: 'ku2', prompt: '\u05E7', correct: '\u05E7', options: ['\u05E6', '\u05D8', '\u05E7', '\u05E1'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l6-intro-tsadi',
      type: 'letter-intro',
      title: '\u05E6\u05B7\u05D3\u05B4\u05D9',
      titleHebrew: '\u05E6\u05B7\u05D3\u05B4\u05D9',
      description: 'צד שמאל עולה למעלה!',
      activities: [
        {
          id: 'l6-tsadi-tap',
          type: 'tap-the-letter',
          instruction: '\u05DE\u05E6\u05D0\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D5\u05EA \u05E6\u05D3\u05D9!',
          items: [
            { id: 'ts1', prompt: '\u05E6', correct: '\u05E6', options: ['\u05E6', '\u05E2', '\u05D8', '\u05E7'] },
            { id: 'ts2', prompt: '\u05E6', correct: '\u05E6', options: ['\u05E1', '\u05DB', '\u05E6', '\u05D2'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l6-discrimination',
      type: 'visual-discrimination',
      title: 'אותיות דומות',
      titleHebrew: 'אותיות דומות',
      description: 'ט vs ת, ס vs מ - הקשיבו היטב!',
      activities: [
        {
          id: 'l6-disc',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על האות הנכונה!',
          items: [
            { id: 'dc1', prompt: '\u05D8', promptAudio: '/audio/letters/tet.mp3', correct: '\u05D8', options: ['\u05D8', '\u05EA'] },
            { id: 'dc2', prompt: '\u05EA', promptAudio: '/audio/letters/tav.mp3', correct: '\u05EA', options: ['\u05EA', '\u05D8'] },
            { id: 'dc3', prompt: '\u05E1', promptAudio: '/audio/letters/samekh.mp3', correct: '\u05E1', options: ['\u05E1', '\u05DE'] },
            { id: 'dc4', prompt: '\u05DE', promptAudio: '/audio/letters/mem.mp3', correct: '\u05DE', options: ['\u05DE', '\u05E1'] },
            { id: 'dc5', prompt: '\u05D8', promptAudio: '/audio/letters/tet.mp3', correct: '\u05D8', options: ['\u05D8', '\u05EA', '\u05E1', '\u05DE'] },
            { id: 'dc6', prompt: '\u05E1', promptAudio: '/audio/letters/samekh.mp3', correct: '\u05E1', options: ['\u05D8', '\u05EA', '\u05E1', '\u05DE'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l6-review',
      type: 'review',
      title: 'כל הא-ב שלי!',
      titleHebrew: 'כל הא-ב שלי!',
      description: 'אתם יודעים את כל 22 האותיות!',
      activities: [
        {
          id: 'l6-review-match',
          type: 'match-pairs',
          instruction: 'התאימו את האותיות!',
          items: [
            { id: 'rm1', prompt: '\u05D8', correct: '\u05D8', options: ['\u05D8', '\u05E1', '\u05E7', '\u05E6'] },
            { id: 'rm2', prompt: '\u05E1', correct: '\u05E1', options: ['\u05D8', '\u05E1', '\u05E7', '\u05E6'] },
            { id: 'rm3', prompt: '\u05E7', correct: '\u05E7', options: ['\u05D8', '\u05E1', '\u05E7', '\u05E6'] },
            { id: 'rm4', prompt: '\u05E6', correct: '\u05E6', options: ['\u05D8', '\u05E1', '\u05E7', '\u05E6'] },
          ],
          maxStars: 3,
        },
        {
          id: 'l6-review-all',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על האות הנכונה!',
          items: [
            { id: 'ra1', prompt: '\u05D8', promptAudio: '/audio/letters/tet.mp3', correct: '\u05D8', options: ['\u05D8', '\u05E6', '\u05E7', '\u05E1'] },
            { id: 'ra2', prompt: '\u05E7', promptAudio: '/audio/letters/kuf.mp3', correct: '\u05E7', options: ['\u05DB', '\u05E7', '\u05E4', '\u05D2'] },
            { id: 'ra3', prompt: '\u05E6', promptAudio: '/audio/letters/tsadi.mp3', correct: '\u05E6', options: ['\u05E6', '\u05D8', '\u05E1', '\u05E2'] },
            { id: 'ra4', prompt: '\u05E1', promptAudio: '/audio/letters/samekh.mp3', correct: '\u05E1', options: ['\u05E1', '\u05DE', '\u05D7', '\u05E0'] },
          ],
          maxStars: 3,
        },
      ],
    },
  ],
};

export default level06;

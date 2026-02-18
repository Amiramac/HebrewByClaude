import { Level } from '@/types/levels';

const level03: Level = {
  id: 3,
  slug: 'the-first-vowel',
  title: 'התנועה הראשונה',
  titleHebrew: 'התנועה הראשונה',
  description: 'למדו את התנועה הראשונה וקראו צירופים!',
  icon: '\u2728',
  color: '#4ECDC4',
  requiredStars: 16,
  vowels: ['\u05B8', '\u05B7'],
  lessons: [
    {
      id: 'l3-intro-kamatz',
      type: 'vowel-intro',
      title: 'הכירו את קָמַץ',
      titleHebrew: 'הכירו את קָמַץ',
      description: 'הצורה הקטנה מתחת לאות אומרת "אָ"!',
      activities: [
        {
          id: 'l3-kamatz-find',
          type: 'find-the-letter',
          instruction: 'מצאו את האות עם הקמץ!',
          items: [
            { id: 'k1', prompt: '\u05D1\u05BC\u05B8', promptAudio: '/audio/syllables/ba.mp3', correct: '\u05D1\u05BC\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05D1', '\u05E9\u05C1', '\u05DC'] },
            { id: 'k2', prompt: '\u05DE\u05B8', promptAudio: '/audio/syllables/ma.mp3', correct: '\u05DE\u05B8', options: ['\u05DE', '\u05DE\u05B8', '\u05D1', '\u05D0'] },
            { id: 'k3', prompt: '\u05DC\u05B8', promptAudio: '/audio/syllables/la.mp3', correct: '\u05DC\u05B8', options: ['\u05DC', '\u05E9\u05C1', '\u05DC\u05B8', '\u05DE'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l3-first-syllables',
      type: 'syllable-reading',
      title: 'הצירופים הראשונים!',
      titleHebrew: 'הצירופים הראשונים!',
      description: 'אות + תנועה = צירוף שאפשר לקרוא!',
      activities: [
        {
          id: 'l3-syllable-listen',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על הצירוף הנכון!',
          items: [
            { id: 'sl1', prompt: '\u05D1\u05BC\u05B8', promptAudio: '/audio/syllables/ba.mp3', correct: '\u05D1\u05BC\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05DE\u05B8', '\u05DC\u05B8', '\u05E9\u05C1\u05B8'] },
            { id: 'sl2', prompt: '\u05DE\u05B8', promptAudio: '/audio/syllables/ma.mp3', correct: '\u05DE\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05DE\u05B8', '\u05D3\u05B8', '\u05E8\u05B8'] },
            { id: 'sl3', prompt: '\u05E9\u05C1\u05B8', promptAudio: '/audio/syllables/sha.mp3', correct: '\u05E9\u05C1\u05B8', options: ['\u05E9\u05C1\u05B8', '\u05DC\u05B8', '\u05EA\u05BC\u05B8', '\u05D4\u05B8'] },
            { id: 'sl4', prompt: '\u05DC\u05B8', promptAudio: '/audio/syllables/la.mp3', correct: '\u05DC\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05DC\u05B8', '\u05E8\u05B8', '\u05DE\u05B8'] },
            { id: 'sl5', prompt: '\u05D3\u05B8', promptAudio: '/audio/syllables/da.mp3', correct: '\u05D3\u05B8', options: ['\u05D3\u05B8', '\u05E8\u05B8', '\u05D4\u05B8', '\u05EA\u05BC\u05B8'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l3-build-syllables',
      type: 'syllable-reading',
      title: 'בנו צירופים!',
      titleHebrew: 'בנו צירופים!',
      description: 'חברו אות ותנועה ביחד!',
      activities: [
        {
          id: 'l3-build',
          type: 'build-syllable',
          instruction: 'בנו את הצירוף שאתם שומעים!',
          items: [
            { id: 'bs1', prompt: '\u05D1\u05BC\u05B8', promptAudio: '/audio/syllables/ba.mp3', correct: '\u05D1\u05BC\u05B8', options: ['\u05D1', '\u05DE', '\u05DC', '\u05E9\u05C1'] },
            { id: 'bs2', prompt: '\u05DE\u05B8', promptAudio: '/audio/syllables/ma.mp3', correct: '\u05DE\u05B8', options: ['\u05D1', '\u05DE', '\u05D3', '\u05E8'] },
            { id: 'bs3', prompt: '\u05E9\u05C1\u05B8', promptAudio: '/audio/syllables/sha.mp3', correct: '\u05E9\u05C1\u05B8', options: ['\u05E9\u05C1', '\u05DC', '\u05EA', '\u05D4'] },
            { id: 'bs4', prompt: '\u05EA\u05BC\u05B8', promptAudio: '/audio/syllables/ta.mp3', correct: '\u05EA\u05BC\u05B8', options: ['\u05D3', '\u05E8', '\u05EA', '\u05D4'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l3-read-mama',
      type: 'syllable-reading',
      title: 'קראו את המילה הראשונה!',
      titleHebrew: 'קראו את המילה הראשונה!',
      description: '\u05DE\u05B8 + \u05DE\u05B8 = \u05DE\u05B8\u05DE\u05B8\u05D0 (אמא!)',
      activities: [
        {
          id: 'l3-mama',
          type: 'listen-and-choose',
          instruction: 'איזה צירופים יוצרים "אמא"?',
          items: [
            { id: 'mm1', prompt: 'מה הצירוף הראשון?', correct: '\u05DE\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05DE\u05B8', '\u05DC\u05B8', '\u05E9\u05C1\u05B8'] },
            { id: 'mm2', prompt: 'מה הצירוף השני?', correct: '\u05DE\u05B8', options: ['\u05D3\u05B8', '\u05DE\u05B8', '\u05E8\u05B8', '\u05D4\u05B8'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l3-syllable-review',
      type: 'review',
      title: 'חזרה על צירופים',
      titleHebrew: 'חזרה על צירופים',
      description: 'תרגלו את כל הצירופים שלמדתם!',
      activities: [
        {
          id: 'l3-review-match',
          type: 'match-pairs',
          instruction: 'התאימו כל צירוף לצליל שלו!',
          items: [
            { id: 'rm1', prompt: '\u05D1\u05BC\u05B8', correct: '\u05D1\u05BC\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05DE\u05B8', '\u05E9\u05C1\u05B8', '\u05DC\u05B8', '\u05D3\u05B8'] },
            { id: 'rm2', prompt: '\u05DE\u05B8', correct: '\u05DE\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05DE\u05B8', '\u05E9\u05C1\u05B8', '\u05DC\u05B8', '\u05D3\u05B8'] },
            { id: 'rm3', prompt: '\u05E9\u05C1\u05B8', correct: '\u05E9\u05C1\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05DE\u05B8', '\u05E9\u05C1\u05B8', '\u05DC\u05B8', '\u05D3\u05B8'] },
            { id: 'rm4', prompt: '\u05DC\u05B8', correct: '\u05DC\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05DE\u05B8', '\u05E9\u05C1\u05B8', '\u05DC\u05B8', '\u05D3\u05B8'] },
            { id: 'rm5', prompt: '\u05D3\u05B8', correct: '\u05D3\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05DE\u05B8', '\u05E9\u05C1\u05B8', '\u05DC\u05B8', '\u05D3\u05B8'] },
          ],
          maxStars: 3,
        },
      ],
    },
  ],
};

export default level03;

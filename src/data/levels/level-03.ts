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
      introVowel: 'Kamatz',
      introVideo: '/videos/vowels/kamatz.mp4',
      activities: [
        {
          id: 'l3-kamatz-find',
          type: 'find-the-letter',
          instruction: 'מצאו את האות עם הקמץ!',
          instructionAudio: '/audio/narration/find-with-kamatz.mp3',
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
      id: 'l3-intro-patach',
      type: 'vowel-intro',
      title: 'הכירו את פַּתָח',
      titleHebrew: 'הכירו את פַּתָח',
      description: 'הקו הדק מתחת לאות — גם אומר "אַ"!',
      introVowel: 'Patach',
      activities: [
        {
          id: 'l3-patach-find',
          type: 'find-the-letter',
          instruction: 'מצאו את האות עם הפתח!',
          instructionAudio: '/audio/narration/find-with-patach.mp3',
          items: [
            { id: 'pa1', prompt: '\u05E9\u05C1\u05B7', promptAudio: '/audio/syllables/sha.mp3', correct: '\u05E9\u05C1\u05B7', options: ['\u05E9\u05C1\u05B7', '\u05E9\u05C1\u05B8', '\u05E9\u05C1', '\u05DC'] },
            { id: 'pa2', prompt: '\u05D3\u05B7', promptAudio: '/audio/syllables/da.mp3', correct: '\u05D3\u05B7', options: ['\u05D3', '\u05D3\u05B7', '\u05DE', '\u05D0'] },
            { id: 'pa3', prompt: '\u05E8\u05B7', promptAudio: '/audio/syllables/ra.mp3', correct: '\u05E8\u05B7', options: ['\u05E8', '\u05E9\u05C1', '\u05E8\u05B7', '\u05DE'] },
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
          instructionAudio: '/audio/narration/listen-choose-syllable.mp3',
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
      id: 'l3-hear-letter',
      type: 'syllable-reading',
      title: 'איזו אות שומעים?',
      titleHebrew: 'איזו אות שומעים?',
      description: 'שמעו את הצליל ומצאו את האות!',
      activities: [
        {
          id: 'l3-hear',
          type: 'listen-and-choose',
          instruction: 'שמעו את הצליל ומצאו את האות!',
          instructionAudio: '/audio/narration/hear-find-letter.mp3',
          items: [
            { id: 'hl1', prompt: '\u05D1\u05BC\u05B8', promptAudio: '/audio/syllables/ba.mp3', correct: '\u05D1', options: ['\u05D1', '\u05DE', '\u05DC', '\u05E9\u05C1'] },
            { id: 'hl2', prompt: '\u05DE\u05B8', promptAudio: '/audio/syllables/ma.mp3', correct: '\u05DE', options: ['\u05D1', '\u05DE', '\u05D3', '\u05E8'] },
            { id: 'hl3', prompt: '\u05E9\u05C1\u05B8', promptAudio: '/audio/syllables/sha.mp3', correct: '\u05E9\u05C1', options: ['\u05E9\u05C1', '\u05DC', '\u05EA', '\u05D4'] },
            { id: 'hl4', prompt: '\u05EA\u05BC\u05B8', promptAudio: '/audio/syllables/ta.mp3', correct: '\u05EA', options: ['\u05D3', '\u05E8', '\u05EA', '\u05D4'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l3-build-words',
      type: 'syllable-reading',
      title: 'בנו מילים!',
      titleHebrew: 'בנו מילים!',
      description: 'שמעו את הצליל ומצאו את הצירוף!',
      activities: [
        {
          id: 'l3-words',
          type: 'listen-and-choose',
          instruction: 'שמעו ומצאו את הצירופים!',
          instructionAudio: '/audio/narration/build-words.mp3',
          items: [
            // אמא = מָ + מָ
            { id: 'w1', prompt: '\u05DE\u05B8', promptAudio: '/audio/syllables/ma.mp3', correct: '\u05DE\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05DE\u05B8', '\u05DC\u05B8', '\u05E9\u05C1\u05B8'] },
            { id: 'w2', prompt: '\u05DE\u05B8', promptAudio: '/audio/syllables/ma.mp3', correct: '\u05DE\u05B8', options: ['\u05D3\u05B8', '\u05DE\u05B8', '\u05E8\u05B8', '\u05D4\u05B8'] },
            // אבא = אָ + בָּ
            { id: 'w3', prompt: '\u05D0\u05B8', promptAudio: '/audio/syllables/a.mp3', correct: '\u05D0\u05B8', options: ['\u05D0\u05B8', '\u05D1\u05BC\u05B8', '\u05DE\u05B8', '\u05DC\u05B8'] },
            { id: 'w4', prompt: '\u05D1\u05BC\u05B8', promptAudio: '/audio/syllables/ba.mp3', correct: '\u05D1\u05BC\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05D3\u05B8', '\u05E9\u05C1\u05B8', '\u05E8\u05B8'] },
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
          instructionAudio: '/audio/narration/match-syllable-pairs.mp3',
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

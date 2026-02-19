import { Level } from '@/types/levels';

// Chirik = \u05B4 (/i/), Segol = \u05B6 (/e/)
const level05: Level = {
  id: 5,
  slug: 'new-vowels',
  title: 'תנועות חדשות',
  titleHebrew: 'תנועות חדשות',
  description: 'למדו חיריק וסגול וקראו מילים!',
  icon: '\uD83D\uDCD6',
  color: '#9B59B6',
  requiredStars: 44,
  vowels: ['\u05B4', '\u05B6'],
  lessons: [
    // ── Chirik (/i/) ────────────────────────────────────────
    {
      id: 'l5-intro-chirik',
      type: 'vowel-intro',
      title: 'הכירו את חִירִיק',
      titleHebrew: 'הכירו את חִירִיק',
      description: 'הנקודה הקטנה מתחת לאות אומרת "אִי"!',
      activities: [
        {
          id: 'l5-chirik-find',
          type: 'find-the-letter',
          instruction: 'מצאו את האות עם החיריק!',
          instructionAudio: '/audio/narration/find-with-chirik.mp3',
          items: [
            { id: 'ci1', prompt: '\u05D1\u05BC\u05B4', promptAudio: '/audio/syllables/bi.mp3', correct: '\u05D1\u05BC\u05B4', options: ['\u05D1\u05BC\u05B4', '\u05D1', '\u05E9\u05C1', '\u05DC'] },
            { id: 'ci2', prompt: '\u05DC\u05B4', promptAudio: '/audio/syllables/li.mp3', correct: '\u05DC\u05B4', options: ['\u05DE', '\u05DC\u05B4', '\u05D1', '\u05D0'] },
            { id: 'ci3', prompt: '\u05DE\u05B4', promptAudio: '/audio/syllables/mi.mp3', correct: '\u05DE\u05B4', options: ['\u05DC', '\u05E9\u05C1', '\u05DE\u05B4', '\u05D3'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l5-chirik-syllables',
      type: 'syllable-reading',
      title: 'צירופים עם חיריק',
      titleHebrew: 'צירופים עם חיריק',
      description: 'הקשיבו לצליל וזהו את הצירוף!',
      activities: [
        {
          id: 'l5-chirik-listen',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על הצירוף הנכון!',
          instructionAudio: '/audio/narration/listen-choose-syllable.mp3',
          items: [
            { id: 'cs1', prompt: '\u05D1\u05BC\u05B4', promptAudio: '/audio/syllables/bi.mp3', correct: '\u05D1\u05BC\u05B4', options: ['\u05D1\u05BC\u05B4', '\u05DE\u05B4', '\u05DC\u05B4', '\u05E9\u05C1\u05B4'] },
            { id: 'cs2', prompt: '\u05E9\u05C1\u05B4', promptAudio: '/audio/syllables/shi.mp3', correct: '\u05E9\u05C1\u05B4', options: ['\u05E9\u05C1\u05B4', '\u05DC\u05B4', '\u05D3\u05B4', '\u05E8\u05B4'] },
            { id: 'cs3', prompt: '\u05DC\u05B4', promptAudio: '/audio/syllables/li.mp3', correct: '\u05DC\u05B4', options: ['\u05D1\u05BC\u05B4', '\u05DC\u05B4', '\u05DE\u05B4', '\u05EA\u05BC\u05B4'] },
            { id: 'cs4', prompt: '\u05D3\u05B4', promptAudio: '/audio/syllables/di.mp3', correct: '\u05D3\u05B4', options: ['\u05D3\u05B4', '\u05E8\u05B4', '\u05D4\u05B4', '\u05D1\u05BC\u05B4'] },
            { id: 'cs5', prompt: '\u05EA\u05BC\u05B4', promptAudio: '/audio/syllables/ti.mp3', correct: '\u05EA\u05BC\u05B4', options: ['\u05DE\u05B4', '\u05EA\u05BC\u05B4', '\u05E9\u05C1\u05B4', '\u05DC\u05B4'] },
          ],
          maxStars: 3,
        },
      ],
    },
    // ── Segol (/e/) ────────────────────────────────────────
    {
      id: 'l5-intro-segol',
      type: 'vowel-intro',
      title: 'הכירו את סֶגוֹל',
      titleHebrew: 'הכירו את סֶגוֹל',
      description: 'שלוש נקודות מתחת לאות אומרות "אֶ"!',
      activities: [
        {
          id: 'l5-segol-find',
          type: 'find-the-letter',
          instruction: 'מצאו את האות עם הסגול!',
          instructionAudio: '/audio/narration/find-with-segol.mp3',
          items: [
            { id: 'se1', prompt: '\u05D1\u05BC\u05B6', promptAudio: '/audio/syllables/be.mp3', correct: '\u05D1\u05BC\u05B6', options: ['\u05D1\u05BC\u05B6', '\u05D1', '\u05DE', '\u05DC'] },
            { id: 'se2', prompt: '\u05DC\u05B6', promptAudio: '/audio/syllables/le.mp3', correct: '\u05DC\u05B6', options: ['\u05E9\u05C1', '\u05DC\u05B6', '\u05D0', '\u05D3'] },
            { id: 'se3', prompt: '\u05E8\u05B6', promptAudio: '/audio/syllables/re.mp3', correct: '\u05E8\u05B6', options: ['\u05D4', '\u05EA', '\u05E8\u05B6', '\u05D9'] },
          ],
          maxStars: 3,
        },
      ],
    },
    {
      id: 'l5-segol-syllables',
      type: 'syllable-reading',
      title: 'צירופים עם סגול',
      titleHebrew: 'צירופים עם סגול',
      description: 'הקשיבו לצליל וזהו את הצירוף!',
      activities: [
        {
          id: 'l5-segol-listen',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על הצירוף הנכון!',
          instructionAudio: '/audio/narration/listen-choose-syllable.mp3',
          items: [
            { id: 'ss1', prompt: '\u05D1\u05BC\u05B6', promptAudio: '/audio/syllables/be.mp3', correct: '\u05D1\u05BC\u05B6', options: ['\u05D1\u05BC\u05B6', '\u05DE\u05B6', '\u05DC\u05B6', '\u05E9\u05C1\u05B6'] },
            { id: 'ss2', prompt: '\u05DE\u05B6', promptAudio: '/audio/syllables/me.mp3', correct: '\u05DE\u05B6', options: ['\u05D1\u05BC\u05B6', '\u05DE\u05B6', '\u05D3\u05B6', '\u05E8\u05B6'] },
            { id: 'ss3', prompt: '\u05DC\u05B6', promptAudio: '/audio/syllables/le.mp3', correct: '\u05DC\u05B6', options: ['\u05E9\u05C1\u05B6', '\u05DC\u05B6', '\u05EA\u05BC\u05B6', '\u05D4\u05B6'] },
            { id: 'ss4', prompt: '\u05E9\u05C1\u05B6', promptAudio: '/audio/syllables/she.mp3', correct: '\u05E9\u05C1\u05B6', options: ['\u05E9\u05C1\u05B6', '\u05E8\u05B6', '\u05D3\u05B6', '\u05D1\u05BC\u05B6'] },
            { id: 'ss5', prompt: '\u05D3\u05B6', promptAudio: '/audio/syllables/de.mp3', correct: '\u05D3\u05B6', options: ['\u05D3\u05B6', '\u05D4\u05B6', '\u05DE\u05B6', '\u05EA\u05BC\u05B6'] },
          ],
          maxStars: 3,
        },
      ],
    },
    // ── Mixed vowel practice ───────────────────────────────
    {
      id: 'l5-vowel-mix',
      type: 'syllable-reading',
      title: 'איזו תנועה?',
      titleHebrew: 'איזו תנועה?',
      description: 'קמץ, חיריק, או סגול? הקשיבו!',
      activities: [
        {
          id: 'l5-mix-listen',
          type: 'listen-and-choose',
          instruction: 'שמעו את הצליל ומצאו את הצירוף!',
          instructionAudio: '/audio/narration/listen-choose-syllable.mp3',
          items: [
            { id: 'mx1', prompt: '\u05D1\u05BC\u05B8', promptAudio: '/audio/syllables/ba.mp3', correct: '\u05D1\u05BC\u05B8', options: ['\u05D1\u05BC\u05B8', '\u05D1\u05BC\u05B4', '\u05D1\u05BC\u05B6'] },
            { id: 'mx2', prompt: '\u05DE\u05B4', promptAudio: '/audio/syllables/mi.mp3', correct: '\u05DE\u05B4', options: ['\u05DE\u05B8', '\u05DE\u05B4', '\u05DE\u05B6'] },
            { id: 'mx3', prompt: '\u05DC\u05B6', promptAudio: '/audio/syllables/le.mp3', correct: '\u05DC\u05B6', options: ['\u05DC\u05B8', '\u05DC\u05B4', '\u05DC\u05B6'] },
            { id: 'mx4', prompt: '\u05E9\u05C1\u05B4', promptAudio: '/audio/syllables/shi.mp3', correct: '\u05E9\u05C1\u05B4', options: ['\u05E9\u05C1\u05B6', '\u05E9\u05C1\u05B8', '\u05E9\u05C1\u05B4'] },
            { id: 'mx5', prompt: '\u05D3\u05B8', promptAudio: '/audio/syllables/da.mp3', correct: '\u05D3\u05B8', options: ['\u05D3\u05B4', '\u05D3\u05B8', '\u05D3\u05B6'] },
            { id: 'mx6', prompt: '\u05E8\u05B6', promptAudio: '/audio/syllables/re.mp3', correct: '\u05E8\u05B6', options: ['\u05E8\u05B8', '\u05E8\u05B6', '\u05E8\u05B4'] },
          ],
          maxStars: 3,
        },
      ],
    },
    // ── First Words ───────────────────────────────────────
    {
      id: 'l5-first-words',
      type: 'word-reading',
      title: 'מילים ראשונות!',
      titleHebrew: 'מילים ראשונות!',
      description: 'שמעו מילה ומצאו אותה!',
      activities: [
        {
          id: 'l5-words',
          type: 'listen-and-choose',
          instruction: 'שמעו את המילה ומצאו אותה!',
          instructionAudio: '/audio/narration/hear-find-word.mp3',
          items: [
            { id: 'wd1', prompt: '\u05D9\u05B7\u05D3', promptAudio: '/audio/words/yad.mp3', correct: '\u05D9\u05B7\u05D3', options: ['\u05D9\u05B7\u05D3', '\u05D3\u05B8\u05D2', '\u05D0\u05B7\u05D1'] },
            { id: 'wd2', prompt: '\u05D3\u05B8\u05D2', promptAudio: '/audio/words/dag.mp3', correct: '\u05D3\u05B8\u05D2', options: ['\u05D9\u05B7\u05D3', '\u05D3\u05B8\u05D2', '\u05D1\u05BC\u05B7\u05D9\u05B4\u05EA'] },
            { id: 'wd3', prompt: '\u05D1\u05BC\u05B7\u05D9\u05B4\u05EA', promptAudio: '/audio/words/bayit.mp3', correct: '\u05D1\u05BC\u05B7\u05D9\u05B4\u05EA', options: ['\u05D3\u05B8\u05D2', '\u05D1\u05BC\u05B7\u05D9\u05B4\u05EA', '\u05D9\u05B7\u05D3'] },
          ],
          maxStars: 3,
        },
      ],
    },
  ],
};

export default level05;

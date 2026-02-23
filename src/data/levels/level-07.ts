import { Level } from '@/types/levels';

// Level 7 — Words & Pictures review
// All word audio already exists. Options are emoji strings rendered as pictures via LetterCard.
// Activity pattern: hear word → tap matching emoji (listen-and-choose)

const level07: Level = {
  id: 7,
  slug: 'words-and-pictures',
  title: 'מילים ותמונות',
  titleHebrew: 'מילים ותמונות',
  description: 'שמעו מילה ומצאו את התמונה הנכונה!',
  icon: '\uD83D\uDDBC\uFE0F',
  color: '#3498DB',
  requiredStars: 70,
  lessons: [

    // ── Family ──────────────────────────────────────────────────
    {
      id: 'l7-family',
      type: 'word-reading',
      title: '\uD83D\uDC68 משפחה',
      titleHebrew: 'משפחה',
      description: 'שמעו את המילה ומצאו את התמונה!',
      activities: [
        {
          id: 'l7-family-match',
          type: 'listen-and-choose',
          instruction: 'שמעו את המילה ומצאו את התמונה!',
          instructionAudio: '/audio/narration/hear-find-word.mp3',
          items: [
            {
              id: 'f1',
              prompt: '\u05D0\u05B4\u05DE\u05BC\u05B8\u05D0',
              promptAudio: '/audio/words/ima.mp3',
              correct: '\uD83D\uDC69',
              options: ['\uD83D\uDC69', '\uD83D\uDC68', '\uD83D\uDC66', '\uD83D\uDC67'],
            },
            {
              id: 'f2',
              prompt: '\u05D0\u05B7\u05D1\u05BC\u05B8\u05D0',
              promptAudio: '/audio/words/aba.mp3',
              correct: '\uD83D\uDC68',
              options: ['\uD83D\uDC69', '\uD83D\uDC68', '\uD83D\uDC66', '\uD83D\uDC67'],
            },
            {
              id: 'f3',
              prompt: '\u05D9\u05B6\u05DC\u05B6\u05D3',
              promptAudio: '/audio/words/yeled.mp3',
              correct: '\uD83D\uDC66',
              options: ['\uD83D\uDC67', '\uD83D\uDC68', '\uD83D\uDC66', '\uD83D\uDC69'],
            },
            {
              id: 'f4',
              prompt: '\u05D9\u05B7\u05DC\u05B0\u05D3\u05BC\u05B8\u05D4',
              promptAudio: '/audio/words/yalda.mp3',
              correct: '\uD83D\uDC67',
              options: ['\uD83D\uDC66', '\uD83D\uDC69', '\uD83D\uDC67', '\uD83D\uDC68'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    // ── Animals ─────────────────────────────────────────────────
    {
      id: 'l7-animals',
      type: 'word-reading',
      title: '\uD83D\uDC20 חיות',
      titleHebrew: 'חיות',
      description: 'שמעו את המילה ומצאו את התמונה!',
      activities: [
        {
          id: 'l7-animals-match',
          type: 'listen-and-choose',
          instruction: 'שמעו את המילה ומצאו את התמונה!',
          instructionAudio: '/audio/narration/hear-find-word.mp3',
          items: [
            {
              id: 'a1',
              prompt: '\u05D3\u05B8\u05D2',
              promptAudio: '/audio/words/dag.mp3',
              correct: '\uD83D\uDC1F',
              options: ['\uD83D\uDC1F', '\uD83D\uDC15', '\uD83D\uDC08', '\uD83D\uDC26'],
            },
            {
              id: 'a2',
              prompt: '\u05DB\u05BC\u05B6\u05DC\u05B6\u05D1',
              promptAudio: '/audio/words/kelev.mp3',
              correct: '\uD83D\uDC15',
              options: ['\uD83D\uDC08', '\uD83D\uDC15', '\uD83D\uDC1F', '\uD83D\uDC26'],
            },
            {
              id: 'a3',
              prompt: '\u05D7\u05B8\u05EA\u05D5\u05BC\u05DC',
              promptAudio: '/audio/words/chatul.mp3',
              correct: '\uD83D\uDC08',
              options: ['\uD83D\uDC15', '\uD83D\uDC1F', '\uD83D\uDC08', '\uD83D\uDC26'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    // ── Nature & body ────────────────────────────────────────────
    {
      id: 'l7-nature',
      type: 'word-reading',
      title: '\u2600\uFE0F טבע',
      titleHebrew: 'טבע',
      description: 'שמעו את המילה ומצאו את התמונה!',
      activities: [
        {
          id: 'l7-nature-match',
          type: 'listen-and-choose',
          instruction: 'שמעו את המילה ומצאו את התמונה!',
          instructionAudio: '/audio/narration/hear-find-word.mp3',
          items: [
            {
              id: 'n1',
              prompt: '\u05E9\u05C1\u05B6\u05DE\u05B6\u05E9\u05C1',
              promptAudio: '/audio/words/shemesh.mp3',
              correct: '\u2600\uFE0F',
              options: ['\u2600\uFE0F', '\uD83C\uDF19', '\uD83D\uDCA7', '\u270B'],
            },
            {
              id: 'n2',
              prompt: '\u05D9\u05B8\u05E8\u05B5\u05D7\u05B7',
              promptAudio: '/audio/words/yareach.mp3',
              correct: '\uD83C\uDF19',
              options: ['\u2600\uFE0F', '\uD83C\uDF19', '\uD83D\uDCA7', '\u270B'],
            },
            {
              id: 'n3',
              prompt: '\u05DE\u05B7\u05D9\u05B4\u05DD',
              promptAudio: '/audio/words/mayim.mp3',
              correct: '\uD83D\uDCA7',
              options: ['\uD83C\uDF19', '\u270B', '\uD83D\uDCA7', '\u2600\uFE0F'],
            },
            {
              id: 'n4',
              prompt: '\u05D9\u05B8\u05D3',
              promptAudio: '/audio/words/yad.mp3',
              correct: '\u270B',
              options: ['\uD83D\uDCA7', '\uD83C\uDF19', '\u2600\uFE0F', '\u270B'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    // ── Things ───────────────────────────────────────────────────
    {
      id: 'l7-things',
      type: 'word-reading',
      title: '\uD83C\uDFE0 דברים',
      titleHebrew: 'דברים',
      description: 'שמעו את המילה ומצאו את התמונה!',
      activities: [
        {
          id: 'l7-things-match',
          type: 'listen-and-choose',
          instruction: 'שמעו את המילה ומצאו את התמונה!',
          instructionAudio: '/audio/narration/hear-find-word.mp3',
          items: [
            {
              id: 't1',
              prompt: '\u05D1\u05BC\u05B7\u05D9\u05B4\u05EA',
              promptAudio: '/audio/words/bayit.mp3',
              correct: '\uD83C\uDFE0',
              options: ['\uD83C\uDFE0', '\uD83D\uDCDA', '\uD83C\uDF5E', '\uD83D\uDC4B'],
            },
            {
              id: 't2',
              prompt: '\u05E1\u05B5\u05E4\u05B6\u05E8',
              promptAudio: '/audio/words/sefer.mp3',
              correct: '\uD83D\uDCDA',
              options: ['\uD83C\uDFE0', '\uD83D\uDCDA', '\uD83C\uDF5E', '\uD83D\uDC4B'],
            },
            {
              id: 't3',
              prompt: '\u05DC\u05B6\u05D7\u05B6\u05DD',
              promptAudio: '/audio/words/lechem.mp3',
              correct: '\uD83C\uDF5E',
              options: ['\uD83D\uDCDA', '\uD83C\uDF5E', '\uD83D\uDC4B', '\uD83C\uDFE0'],
            },
            {
              id: 't4',
              prompt: '\u05E9\u05C1\u05B8\u05DC\u05D5\u05B9\u05DD',
              promptAudio: '/audio/words/shalom.mp3',
              correct: '\uD83D\uDC4B',
              options: ['\uD83C\uDF5E', '\uD83C\uDFE0', '\uD83D\uDC4B', '\uD83D\uDCDA'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    // ── Big mixed review ─────────────────────────────────────────
    {
      id: 'l7-review',
      type: 'review',
      title: '\uD83C\uDF1F סיכום גדול',
      titleHebrew: 'סיכום גדול',
      description: 'כל המילים ביחד!',
      activities: [
        {
          id: 'l7-review-match',
          type: 'listen-and-choose',
          instruction: 'שמעו את המילה ומצאו את התמונה!',
          instructionAudio: '/audio/narration/hear-find-word.mp3',
          items: [
            {
              id: 'r1',
              prompt: '\u05D0\u05B4\u05DE\u05BC\u05B8\u05D0',
              promptAudio: '/audio/words/ima.mp3',
              correct: '\uD83D\uDC69',
              options: ['\uD83D\uDC69', '\uD83C\uDFE0', '\uD83D\uDC1F', '\u2600\uFE0F'],
            },
            {
              id: 'r2',
              prompt: '\u05D7\u05B8\u05EA\u05D5\u05BC\u05DC',
              promptAudio: '/audio/words/chatul.mp3',
              correct: '\uD83D\uDC08',
              options: ['\uD83D\uDC15', '\uD83D\uDC08', '\uD83D\uDC66', '\uD83D\uDCDA'],
            },
            {
              id: 'r3',
              prompt: '\u05E9\u05C1\u05B6\u05DE\u05B6\u05E9\u05C1',
              promptAudio: '/audio/words/shemesh.mp3',
              correct: '\u2600\uFE0F',
              options: ['\uD83D\uDCA7', '\uD83C\uDF5E', '\u2600\uFE0F', '\uD83D\uDC67'],
            },
            {
              id: 'r4',
              prompt: '\u05D1\u05BC\u05B7\u05D9\u05B4\u05EA',
              promptAudio: '/audio/words/bayit.mp3',
              correct: '\uD83C\uDFE0',
              options: ['\uD83C\uDFE0', '\uD83D\uDC4B', '\uD83C\uDF19', '\uD83D\uDC66'],
            },
            {
              id: 'r5',
              prompt: '\u05DB\u05BC\u05B6\u05DC\u05B6\u05D1',
              promptAudio: '/audio/words/kelev.mp3',
              correct: '\uD83D\uDC15',
              options: ['\uD83D\uDC1F', '\uD83D\uDC15', '\uD83C\uDF5E', '\u270B'],
            },
            {
              id: 'r6',
              prompt: '\u05D9\u05B8\u05E8\u05B5\u05D7\u05B7',
              promptAudio: '/audio/words/yareach.mp3',
              correct: '\uD83C\uDF19',
              options: ['\u2600\uFE0F', '\uD83C\uDF19', '\uD83D\uDCDA', '\uD83D\uDC08'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

  ],
};

export default level07;

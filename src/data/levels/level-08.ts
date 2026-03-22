import { Level } from '@/types/levels';

// Tzereh  = \u05B5 (/e/ — same sound as segol, different mark)
// Cholam  = \u05B9 (/o/)
// Kubutz  = \u05BB (/u/)
// Shuruk  = vav + dagesh \u05D5\u05BC (/u/ — same sound as kubutz)

const level08: Level = {
  id: 8,
  slug: 'all-vowels',
  title: 'כל התנועות',
  titleHebrew: 'כל התנועות',
  description: 'צרה, חולם, קובוץ ושורוק — ועכשיו אתם יודעים הכל!',
  icon: '\uD83C\uDF08',
  color: '#E67E22',
  requiredStars: 85,
  vowels: ['\u05B5', '\u05B9', '\u05BB'],
  lessons: [

    // ── Tzereh (ֵ /e/) ──────────────────────────────────────────
    {
      id: 'l7-intro-tzereh',
      type: 'vowel-intro',
      title: 'הכירו את צֵרֵה',
      titleHebrew: 'הכירו את צֵרֵה',
      description: 'שתי נקודות עם קו — גם אומר "אֵ"!',
      introVowel: 'Tzereh',
      activities: [
        {
          // Hear /e/, visually identify the tzereh mark (vs segol/chirik/kamatz)
          id: 'l7-tzereh-find',
          type: 'find-the-letter',
          instruction: 'מצאו את הצירוף עם הצרה!',
          instructionAudio: '/audio/narration/find-with-tzereh.mp3',
          items: [
            {
              id: 'tz1',
              prompt: '\u05D1\u05BC\u05B5',
              promptAudio: '/audio/syllables/be.mp3',
              correct: '\u05D1\u05BC\u05B5',
              options: ['\u05D1\u05BC\u05B5', '\u05D1\u05BC\u05B6', '\u05D1\u05BC\u05B8', '\u05D1\u05BC\u05B4'],
            },
            {
              id: 'tz2',
              prompt: '\u05DC\u05B5',
              promptAudio: '/audio/syllables/le.mp3',
              correct: '\u05DC\u05B5',
              options: ['\u05DC\u05B8', '\u05DC\u05B5', '\u05DC\u05B4', '\u05DC\u05B6'],
            },
            {
              id: 'tz3',
              prompt: '\u05DE\u05B5',
              promptAudio: '/audio/syllables/me.mp3',
              correct: '\u05DE\u05B5',
              options: ['\u05DE\u05B6', '\u05DE\u05B8', '\u05DE\u05B5', '\u05DE\u05B4'],
            },
            {
              id: 'tz4',
              prompt: '\u05E8\u05B5',
              promptAudio: '/audio/syllables/re.mp3',
              correct: '\u05E8\u05B5',
              options: ['\u05E8\u05B5', '\u05E8\u05B6', '\u05E8\u05B4', '\u05E8\u05B8'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    {
      id: 'l7-tzereh-syllables',
      type: 'syllable-reading',
      title: 'צירופים עם צרה',
      titleHebrew: 'צירופים עם צרה',
      description: 'הקשיבו לצליל וזהו את הצרה!',
      activities: [
        {
          id: 'l7-tzereh-listen',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על הצירוף הנכון!',
          instructionAudio: '/audio/narration/listen-choose-syllable.mp3',
          items: [
            // hear /e/, pick the tzereh syllable (vs segol/chirik/kamatz forms)
            {
              id: 'tl1',
              prompt: '\u05D1\u05BC\u05B5',
              promptAudio: '/audio/syllables/be.mp3',
              correct: '\u05D1\u05BC\u05B5',
              options: ['\u05D1\u05BC\u05B5', '\u05D1\u05BC\u05B6', '\u05D1\u05BC\u05B4', '\u05D1\u05BC\u05B8'],
            },
            {
              id: 'tl2',
              prompt: '\u05DC\u05B5',
              promptAudio: '/audio/syllables/le.mp3',
              correct: '\u05DC\u05B5',
              options: ['\u05DC\u05B6', '\u05DC\u05B5', '\u05DC\u05B8', '\u05DC\u05B4'],
            },
            {
              id: 'tl3',
              prompt: '\u05DE\u05B5',
              promptAudio: '/audio/syllables/me.mp3',
              correct: '\u05DE\u05B5',
              options: ['\u05DE\u05B4', '\u05DE\u05B8', '\u05DE\u05B6', '\u05DE\u05B5'],
            },
            {
              id: 'tl4',
              prompt: '\u05E9\u05C1\u05B5',
              promptAudio: '/audio/syllables/she.mp3',
              correct: '\u05E9\u05C1\u05B5',
              options: ['\u05E9\u05C1\u05B5', '\u05E9\u05C1\u05B6', '\u05E9\u05C1\u05B8', '\u05E9\u05C1\u05B4'],
            },
            {
              id: 'tl5',
              prompt: '\u05E8\u05B5',
              promptAudio: '/audio/syllables/re.mp3',
              correct: '\u05E8\u05B5',
              options: ['\u05E8\u05B8', '\u05E8\u05B4', '\u05E8\u05B5', '\u05E8\u05B6'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    // ── Cholam (ֹ /o/) ──────────────────────────────────────────
    {
      id: 'l7-intro-cholam',
      type: 'vowel-intro',
      title: 'הכירו את חוֹלָם',
      titleHebrew: 'הכירו את חוֹלָם',
      description: 'נקודה מעל האות אומרת "אוֹ"!',
      introVowel: 'Cholam',
      activities: [
        {
          id: 'l7-cholam-find',
          type: 'find-the-letter',
          instruction: 'מצאו את הצירוף עם החולם!',
          instructionAudio: '/audio/narration/find-with-cholam.mp3',
          items: [
            {
              id: 'co1',
              prompt: '\u05DC\u05B9',
              promptAudio: '/audio/syllables/lo.mp3',
              correct: '\u05DC\u05B9',
              options: ['\u05DC\u05B9', '\u05DC\u05B8', '\u05DC\u05B4', '\u05DC\u05B6'],
            },
            {
              id: 'co2',
              prompt: '\u05DE\u05B9',
              promptAudio: '/audio/syllables/mo.mp3',
              correct: '\u05DE\u05B9',
              options: ['\u05DE\u05B8', '\u05DE\u05B9', '\u05DE\u05B4', '\u05DE\u05B5'],
            },
            {
              id: 'co3',
              prompt: '\u05E8\u05B9',
              promptAudio: '/audio/syllables/ro.mp3',
              correct: '\u05E8\u05B9',
              options: ['\u05E8\u05B6', '\u05E8\u05B8', '\u05E8\u05B9', '\u05E8\u05B4'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    {
      id: 'l7-cholam-syllables',
      type: 'syllable-reading',
      title: 'צירופים עם חולם',
      titleHebrew: 'צירופים עם חולם',
      description: 'הצליל "אוֹ" — הקשיבו!',
      activities: [
        {
          id: 'l7-cholam-listen',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על הצירוף הנכון!',
          instructionAudio: '/audio/narration/listen-choose-syllable.mp3',
          items: [
            {
              id: 'cl1',
              prompt: '\u05D1\u05BC\u05B9',
              promptAudio: '/audio/syllables/bo.mp3',
              correct: '\u05D1\u05BC\u05B9',
              options: ['\u05D1\u05BC\u05B9', '\u05D1\u05BC\u05B8', '\u05D1\u05BC\u05B4', '\u05D1\u05BC\u05B6'],
            },
            {
              id: 'cl2',
              prompt: '\u05DC\u05B9',
              promptAudio: '/audio/syllables/lo.mp3',
              correct: '\u05DC\u05B9',
              options: ['\u05DC\u05B9', '\u05DC\u05B8', '\u05DC\u05B5', '\u05DC\u05BB'],
            },
            {
              id: 'cl3',
              prompt: '\u05E9\u05C1\u05B9',
              promptAudio: '/audio/syllables/sho.mp3',
              correct: '\u05E9\u05C1\u05B9',
              options: ['\u05E9\u05C1\u05B8', '\u05E9\u05C1\u05B9', '\u05E9\u05C1\u05B4', '\u05E9\u05C1\u05BB'],
            },
            {
              id: 'cl4',
              prompt: '\u05DE\u05B9',
              promptAudio: '/audio/syllables/mo.mp3',
              correct: '\u05DE\u05B9',
              options: ['\u05DE\u05B6', '\u05DE\u05B9', '\u05DE\u05B8', '\u05DE\u05BB'],
            },
            {
              id: 'cl5',
              prompt: '\u05E8\u05B9',
              promptAudio: '/audio/syllables/ro.mp3',
              correct: '\u05E8\u05B9',
              options: ['\u05E8\u05B9', '\u05E8\u05B8', '\u05E8\u05B6', '\u05E8\u05B5'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    // ── Kubutz (ֻ /u/) + Shuruk (וּ /u/) ───────────────────────
    {
      id: 'l7-intro-kubutz',
      type: 'vowel-intro',
      title: 'הכירו את קֻבּוּץ',
      titleHebrew: 'הכירו את קֻבּוּץ',
      description: 'שלוש נקודות מתחת לאות אומרות "אוּ"!',
      introVowel: 'Kubutz',
      activities: [
        {
          id: 'l7-kubutz-find',
          type: 'find-the-letter',
          instruction: 'מצאו את הצירוף עם הקובוץ!',
          instructionAudio: '/audio/narration/find-with-kubutz.mp3',
          items: [
            {
              id: 'ku1',
              prompt: '\u05DC\u05BB',
              promptAudio: '/audio/syllables/lu.mp3',
              correct: '\u05DC\u05BB',
              options: ['\u05DC\u05BB', '\u05DC\u05B9', '\u05DC\u05B8', '\u05DC\u05B4'],
            },
            {
              id: 'ku2',
              prompt: '\u05DE\u05BB',
              promptAudio: '/audio/syllables/mu.mp3',
              correct: '\u05DE\u05BB',
              options: ['\u05DE\u05B9', '\u05DE\u05BB', '\u05DE\u05B6', '\u05DE\u05B8'],
            },
            {
              id: 'ku3',
              prompt: '\u05E8\u05BB',
              promptAudio: '/audio/syllables/ru.mp3',
              correct: '\u05E8\u05BB',
              options: ['\u05E8\u05B8', '\u05E8\u05B9', '\u05E8\u05B4', '\u05E8\u05BB'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    {
      id: 'l7-kubutz-syllables',
      type: 'syllable-reading',
      title: 'צירופים עם קובוץ',
      titleHebrew: 'צירופים עם קובוץ',
      description: 'הצליל "אוּ" — הקשיבו!',
      activities: [
        {
          id: 'l7-kubutz-listen',
          type: 'listen-and-choose',
          instruction: 'הקשיבו ולחצו על הצירוף הנכון!',
          instructionAudio: '/audio/narration/listen-choose-syllable.mp3',
          items: [
            {
              id: 'kl1',
              prompt: '\u05D1\u05BC\u05BB',
              promptAudio: '/audio/syllables/bu.mp3',
              correct: '\u05D1\u05BC\u05BB',
              options: ['\u05D1\u05BC\u05BB', '\u05D1\u05BC\u05B9', '\u05D1\u05BC\u05B8', '\u05D1\u05BC\u05B4'],
            },
            {
              id: 'kl2',
              prompt: '\u05DC\u05BB',
              promptAudio: '/audio/syllables/lu.mp3',
              correct: '\u05DC\u05BB',
              options: ['\u05DC\u05B9', '\u05DC\u05BB', '\u05DC\u05B6', '\u05DC\u05B8'],
            },
            {
              id: 'kl3',
              prompt: '\u05E9\u05C1\u05BB',
              promptAudio: '/audio/syllables/shu.mp3',
              correct: '\u05E9\u05C1\u05BB',
              options: ['\u05E9\u05C1\u05B9', '\u05E9\u05C1\u05B8', '\u05E9\u05C1\u05BB', '\u05E9\u05C1\u05B4'],
            },
            {
              id: 'kl4',
              prompt: '\u05DE\u05BB',
              promptAudio: '/audio/syllables/mu.mp3',
              correct: '\u05DE\u05BB',
              options: ['\u05DE\u05BB', '\u05DE\u05B9', '\u05DE\u05B5', '\u05DE\u05B8'],
            },
            {
              id: 'kl5',
              prompt: '\u05E8\u05BB',
              promptAudio: '/audio/syllables/ru.mp3',
              correct: '\u05E8\u05BB',
              options: ['\u05E8\u05B8', '\u05E8\u05B9', '\u05E8\u05BB', '\u05E8\u05B4'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    // ── Shuruk (וּ /u/) ──────────────────────────────────────────
    {
      id: 'l7-intro-shuruk',
      type: 'vowel-intro',
      title: 'הכירו את שׁוּרוּק',
      titleHebrew: 'הכירו את שׁוּרוּק',
      description: 'נקודה בתוך ו — גם אומרת "אוּ"!',
      introVowel: 'Shuruk',
      activities: [
        {
          id: 'l7-shuruk-find',
          type: 'find-the-letter',
          instruction: 'מצאו את הצירוף עם השורוק!',
          instructionAudio: '/audio/narration/find-with-shuruk.mp3',
          items: [
            {
              id: 'sh1',
              prompt: '\u05DC\u05D5\u05BC',
              promptAudio: '/audio/syllables/lu.mp3',
              correct: '\u05DC\u05D5\u05BC',
              options: ['\u05DC\u05D5\u05BC', '\u05DC\u05BB', '\u05DC\u05B9', '\u05DC\u05B8'],
            },
            {
              id: 'sh2',
              prompt: '\u05DE\u05D5\u05BC',
              promptAudio: '/audio/syllables/mu.mp3',
              correct: '\u05DE\u05D5\u05BC',
              options: ['\u05DE\u05BB', '\u05DE\u05D5\u05BC', '\u05DE\u05B9', '\u05DE\u05B8'],
            },
            {
              id: 'sh3',
              prompt: '\u05E8\u05D5\u05BC',
              promptAudio: '/audio/syllables/ru.mp3',
              correct: '\u05E8\u05D5\u05BC',
              options: ['\u05E8\u05B8', '\u05E8\u05B9', '\u05E8\u05BB', '\u05E8\u05D5\u05BC'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    // ── Mixed vowels review ──────────────────────────────────────
    {
      id: 'l7-all-vowels',
      type: 'syllable-reading',
      title: 'כל חמש התנועות!',
      titleHebrew: 'כל חמש התנועות!',
      description: 'אָ אִ אֶ אוֹ אוּ — הקשיבו ומצאו!',
      activities: [
        {
          id: 'l7-mixed-listen',
          type: 'listen-and-choose',
          instruction: 'שמעו את הצליל ומצאו את הצירוף!',
          instructionAudio: '/audio/narration/listen-choose-syllable.mp3',
          items: [
            // /a/ vs /e/ vs /o/ vs /u/ vs /i/
            {
              id: 'av1',
              prompt: '\u05DC\u05B8',
              promptAudio: '/audio/syllables/la.mp3',
              correct: '\u05DC\u05B8',
              options: ['\u05DC\u05B8', '\u05DC\u05B5', '\u05DC\u05B9', '\u05DC\u05BB'],
            },
            {
              id: 'av2',
              prompt: '\u05DE\u05B9',
              promptAudio: '/audio/syllables/mo.mp3',
              correct: '\u05DE\u05B9',
              options: ['\u05DE\u05B8', '\u05DE\u05B4', '\u05DE\u05B9', '\u05DE\u05BB'],
            },
            {
              id: 'av3',
              prompt: '\u05D1\u05BC\u05BB',
              promptAudio: '/audio/syllables/bu.mp3',
              correct: '\u05D1\u05BC\u05BB',
              options: ['\u05D1\u05BC\u05B9', '\u05D1\u05BC\u05BB', '\u05D1\u05BC\u05B8', '\u05D1\u05BC\u05B5'],
            },
            {
              id: 'av4',
              prompt: '\u05E9\u05C1\u05B4',
              promptAudio: '/audio/syllables/shi.mp3',
              correct: '\u05E9\u05C1\u05B4',
              options: ['\u05E9\u05C1\u05B8', '\u05E9\u05C1\u05B9', '\u05E9\u05C1\u05B4', '\u05E9\u05C1\u05BB'],
            },
            {
              id: 'av5',
              prompt: '\u05E8\u05B5',
              promptAudio: '/audio/syllables/re.mp3',
              correct: '\u05E8\u05B5',
              options: ['\u05E8\u05B8', '\u05E8\u05BB', '\u05E8\u05B9', '\u05E8\u05B5'],
            },
            {
              id: 'av6',
              prompt: '\u05DC\u05B9',
              promptAudio: '/audio/syllables/lo.mp3',
              correct: '\u05DC\u05B9',
              options: ['\u05DC\u05B4', '\u05DC\u05B9', '\u05DC\u05BB', '\u05DC\u05B6'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

    // ── Words with new vowels ────────────────────────────────────
    {
      id: 'l7-words',
      type: 'word-reading',
      title: 'מילים עם תנועות חדשות',
      titleHebrew: 'מילים עם תנועות חדשות',
      description: 'שמעו מילה ומצאו אותה!',
      activities: [
        {
          id: 'l7-words-listen',
          type: 'listen-and-choose',
          instruction: 'שמעו את המילה ומצאו אותה!',
          instructionAudio: '/audio/narration/hear-find-word.mp3',
          items: [
            // shalom = cholam (וֹ), chatul = shuruk (וּ), or = cholam, yom = cholam
            {
              id: 'lw1',
              prompt: '\u05E9\u05C1\u05B8\u05DC\u05D5\u05B9\u05DD',
              promptAudio: '/audio/words/shalom.mp3',
              correct: '\u05E9\u05C1\u05B8\u05DC\u05D5\u05B9\u05DD',
              options: ['\u05E9\u05C1\u05B8\u05DC\u05D5\u05B9\u05DD', '\u05D7\u05B8\u05EA\u05D5\u05BC\u05DC', '\u05D0\u05D5\u05B9\u05E8'],
            },
            {
              id: 'lw2',
              prompt: '\u05D7\u05B8\u05EA\u05D5\u05BC\u05DC',
              promptAudio: '/audio/words/chatul.mp3',
              correct: '\u05D7\u05B8\u05EA\u05D5\u05BC\u05DC',
              options: ['\u05E9\u05C1\u05B8\u05DC\u05D5\u05B9\u05DD', '\u05D7\u05B8\u05EA\u05D5\u05BC\u05DC', '\u05D9\u05D5\u05B9\u05DD'],
            },
            {
              id: 'lw3',
              prompt: '\u05D0\u05D5\u05B9\u05E8',
              promptAudio: '/audio/words/or.mp3',
              correct: '\u05D0\u05D5\u05B9\u05E8',
              options: ['\u05D9\u05D5\u05B9\u05DD', '\u05D0\u05D5\u05B9\u05E8', '\u05E9\u05C1\u05B8\u05DC\u05D5\u05B9\u05DD'],
            },
            {
              id: 'lw4',
              prompt: '\u05D9\u05D5\u05B9\u05DD',
              promptAudio: '/audio/words/yom.mp3',
              correct: '\u05D9\u05D5\u05B9\u05DD',
              options: ['\u05D0\u05D5\u05B9\u05E8', '\u05D7\u05B8\u05EA\u05D5\u05BC\u05DC', '\u05D9\u05D5\u05B9\u05DD'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

  ],
};

export default level08;

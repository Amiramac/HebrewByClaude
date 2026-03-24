import { Level } from '@/types/levels';

// Level 7 — Read First, Listen Later
// Child reads the Hebrew word silently, then taps the matching emoji.
// On correct tap → "[word], קראת נכון!" plays as reinforcement.
// On wrong tap  → "זה [description], נסה שוב" plays for the tapped image.

const level07: Level = {
  id: 7,
  slug: 'words-and-pictures',
  title: 'מילים ותמונות',
  titleHebrew: 'מילים ותמונות',
  description: 'קראו את המילה ומצאו את התמונה הנכונה!',
  icon: '🗺️',
  color: '#3498DB',
  requiredStars: 70,
  lessons: [

    // ── Family ──────────────────────────────────────────────────
    {
      id: 'l7-family',
      type: 'word-reading',
      title: 'משפחה',
      titleHebrew: 'משפחה',
      description: 'קראו את המילה ומצאו את התמונה!',
      categoryIcon: '👨‍👩‍👧',
      activities: [
        {
          id: 'l7-family-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          maxStars: 3,
          optionMeta: {
            '👩': { description: 'אמא',  wrongAudio: '/audio/word-wrong/ima.mp3' },
            '👨': { description: 'אבא',  wrongAudio: '/audio/word-wrong/aba.mp3' },
            '👦': { description: 'ילד',  wrongAudio: '/audio/word-wrong/yeled.mp3' },
            '👧': { description: 'ילדה', wrongAudio: '/audio/word-wrong/yalda.mp3' },
          },
          items: [
            {
              id: 'f1',
              prompt: 'אִמָּא',
              promptAudio: '/audio/words/ima.mp3',
              correctFeedbackAudio: '/audio/word-correct/ima.mp3',
              correct: '👩',
              options: ['👩', '👨', '👦', '👧'],
            },
            {
              id: 'f2',
              prompt: 'אַבָּא',
              promptAudio: '/audio/words/aba.mp3',
              correctFeedbackAudio: '/audio/word-correct/aba.mp3',
              correct: '👨',
              options: ['👩', '👨', '👦', '👧'],
            },
            {
              id: 'f3',
              prompt: 'יֶלֶד',
              promptAudio: '/audio/words/yeled.mp3',
              correctFeedbackAudio: '/audio/word-correct/yeled.mp3',
              correct: '👦',
              options: ['👧', '👨', '👦', '👩'],
            },
            {
              id: 'f4',
              prompt: 'יַלְדָּה',
              promptAudio: '/audio/words/yalda.mp3',
              correctFeedbackAudio: '/audio/word-correct/yalda.mp3',
              correct: '👧',
              options: ['👦', '👩', '👧', '👨'],
            },
          ],
        },
      ],
    },

    // ── Animals ─────────────────────────────────────────────────
    {
      id: 'l7-animals',
      type: 'word-reading',
      title: 'חיות',
      titleHebrew: 'חיות',
      description: 'קראו את המילה ומצאו את התמונה!',
      categoryIcon: '🐾',
      activities: [
        {
          id: 'l7-animals-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          maxStars: 3,
          optionMeta: {
            '🐟': { description: 'דג',    wrongAudio: '/audio/word-wrong/dag.mp3' },
            '🐶': { description: 'כלב',   wrongAudio: '/audio/word-wrong/kelev.mp3' },
            '🐱': { description: 'חתול',  wrongAudio: '/audio/word-wrong/chatul.mp3' },
            '🐦': { description: 'ציפור', wrongAudio: '/audio/word-wrong/tzipor.mp3' },
          },
          items: [
            {
              id: 'a1',
              prompt: 'דָּג',
              promptAudio: '/audio/words/dag.mp3',
              correctFeedbackAudio: '/audio/word-correct/dag.mp3',
              correct: '🐟',
              options: ['🐟', '🐶', '🐱', '🐦'],
            },
            {
              id: 'a2',
              prompt: 'כֶּלֶב',
              promptAudio: '/audio/words/kelev.mp3',
              correctFeedbackAudio: '/audio/word-correct/kelev.mp3',
              correct: '🐶',
              options: ['🐱', '🐶', '🐟', '🐦'],
            },
            {
              id: 'a3',
              prompt: 'חָתוּל',
              promptAudio: '/audio/words/chatul.mp3',
              correctFeedbackAudio: '/audio/word-correct/chatul.mp3',
              correct: '🐱',
              options: ['🐶', '🐟', '🐱', '🐦'],
            },
          ],
        },
      ],
    },

    // ── Nature & body ────────────────────────────────────────────
    {
      id: 'l7-nature',
      type: 'word-reading',
      title: 'טֶבַע',
      titleHebrew: 'טֶבַע',
      description: 'קראו את המילה ומצאו את התמונה!',
      categoryIcon: '🌿',
      activities: [
        {
          id: 'l7-nature-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          maxStars: 3,
          optionMeta: {
            '☀️': { description: 'שמש',  wrongAudio: '/audio/word-wrong/shemesh.mp3' },
            '🌙': { description: 'ירח',  wrongAudio: '/audio/word-wrong/yareach.mp3' },
            '💧': { description: 'מים',  wrongAudio: '/audio/word-wrong/mayim.mp3' },
            '✋': { description: 'יד',   wrongAudio: '/audio/word-wrong/yad.mp3' },
          },
          items: [
            {
              id: 'n1',
              prompt: 'שֶׁמֶשׁ',
              promptAudio: '/audio/words/shemesh.mp3',
              correctFeedbackAudio: '/audio/word-correct/shemesh.mp3',
              correct: '☀️',
              options: ['☀️', '🌙', '💧', '✋'],
            },
            {
              id: 'n2',
              prompt: 'יָרֵחַ',
              promptAudio: '/audio/words/yareach.mp3',
              correctFeedbackAudio: '/audio/word-correct/yareach.mp3',
              correct: '🌙',
              options: ['☀️', '🌙', '💧', '✋'],
            },
            {
              id: 'n3',
              prompt: 'מַיִם',
              promptAudio: '/audio/words/mayim.mp3',
              correctFeedbackAudio: '/audio/word-correct/mayim.mp3',
              correct: '💧',
              options: ['🌙', '✋', '💧', '☀️'],
            },
            {
              id: 'n4',
              prompt: 'יָד',
              promptAudio: '/audio/words/yad.mp3',
              correctFeedbackAudio: '/audio/word-correct/yad.mp3',
              correct: '✋',
              options: ['💧', '🌙', '☀️', '✋'],
            },
          ],
        },
      ],
    },

    // ── Things ───────────────────────────────────────────────────
    {
      id: 'l7-things',
      type: 'word-reading',
      title: 'דְּבָרִים',
      titleHebrew: 'דְּבָרִים',
      description: 'קראו את המילה ומצאו את התמונה!',
      categoryIcon: '🏠',
      activities: [
        {
          id: 'l7-things-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          maxStars: 3,
          optionMeta: {
            '🏠': { description: 'בית',  wrongAudio: '/audio/word-wrong/bayit.mp3' },
            '📚': { description: 'ספר',  wrongAudio: '/audio/word-wrong/sefer.mp3' },
            '🍞': { description: 'לחם',  wrongAudio: '/audio/word-wrong/lechem.mp3' },
            '👋': { description: 'שלום', wrongAudio: '/audio/word-wrong/shalom.mp3' },
          },
          items: [
            {
              id: 't1',
              prompt: 'בַּיִת',
              promptAudio: '/audio/words/bayit.mp3',
              correctFeedbackAudio: '/audio/word-correct/bayit.mp3',
              correct: '🏠',
              options: ['🏠', '📚', '🍞', '👋'],
            },
            {
              id: 't2',
              prompt: 'סֵפֶר',
              promptAudio: '/audio/words/sefer.mp3',
              correctFeedbackAudio: '/audio/word-correct/sefer.mp3',
              correct: '📚',
              options: ['🏠', '📚', '🍞', '👋'],
            },
            {
              id: 't3',
              prompt: 'לֶחֶם',
              promptAudio: '/audio/words/lechem.mp3',
              correctFeedbackAudio: '/audio/word-correct/lechem.mp3',
              correct: '🍞',
              options: ['📚', '🍞', '👋', '🏠'],
            },
            {
              id: 't4',
              prompt: 'שָׁלוֹם',
              promptAudio: '/audio/words/shalom.mp3',
              correctFeedbackAudio: '/audio/word-correct/shalom.mp3',
              correct: '👋',
              options: ['🍞', '🏠', '👋', '📚'],
            },
          ],
        },
      ],
    },

    // ── Phase 2: Food ────────────────────────────────────────────
    {
      id: 'l7-food',
      type: 'word-reading',
      title: 'אוֹכֶל',
      titleHebrew: 'אוֹכֶל',
      description: 'קראו את המילה ומצאו את התמונה!',
      categoryIcon: '🍎',
      activities: [
        {
          id: 'l7-food-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          maxStars: 3,
          optionMeta: {
            '🍎': { description: 'תפוח',  wrongAudio: '/audio/word-wrong/tapuach.mp3' },
            '🥚': { description: 'ביצה',  wrongAudio: '/audio/word-wrong/beytza.mp3' },
            '🥛': { description: 'חלב',   wrongAudio: '/audio/word-wrong/chalav.mp3' },
            '🎂': { description: 'עוגה',  wrongAudio: '/audio/word-wrong/uga.mp3' },
          },
          items: [
            {
              id: 'fo1',
              prompt: 'תַּפּוּחַ',
              promptAudio: '/audio/words/tapuach.mp3',
              correctFeedbackAudio: '/audio/word-correct/tapuach.mp3',
              correct: '🍎',
              options: ['🍎', '🥚', '🥛', '🎂'],
            },
            {
              id: 'fo2',
              prompt: 'בֵּיצָה',
              promptAudio: '/audio/words/beytza.mp3',
              correctFeedbackAudio: '/audio/word-correct/beytza.mp3',
              correct: '🥚',
              options: ['🎂', '🥚', '🍎', '🥛'],
            },
            {
              id: 'fo3',
              prompt: 'חָלָב',
              promptAudio: '/audio/words/chalav.mp3',
              correctFeedbackAudio: '/audio/word-correct/chalav.mp3',
              correct: '🥛',
              options: ['🥚', '🥛', '🎂', '🍎'],
            },
            {
              id: 'fo4',
              prompt: 'עוּגָה',
              promptAudio: '/audio/words/uga.mp3',
              correctFeedbackAudio: '/audio/word-correct/uga.mp3',
              correct: '🎂',
              options: ['🥛', '🍎', '🥚', '🎂'],
            },
          ],
        },
      ],
    },

    // ── Phase 2: Body ─────────────────────────────────────────────
    {
      id: 'l7-body',
      type: 'word-reading',
      title: 'גּוּף',
      titleHebrew: 'גּוּף',
      description: 'קראו את המילה ומצאו את התמונה!',
      categoryIcon: '👁️',
      activities: [
        {
          id: 'l7-body-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          maxStars: 3,
          optionMeta: {
            '👁️': { description: 'עין',  wrongAudio: '/audio/word-wrong/ayin.mp3' },
            '👂': { description: 'אוזן', wrongAudio: '/audio/word-wrong/ozen.mp3' },
            '🦵': { description: 'רגל',  wrongAudio: '/audio/word-wrong/regel.mp3' },
            '❤️': { description: 'לב',   wrongAudio: '/audio/word-wrong/lev.mp3' },
          },
          items: [
            {
              id: 'bo1',
              prompt: 'עַיִן',
              promptAudio: '/audio/words/ayin.mp3',
              correctFeedbackAudio: '/audio/word-correct/ayin.mp3',
              correct: '👁️',
              options: ['👁️', '👂', '🦵', '❤️'],
            },
            {
              id: 'bo2',
              prompt: 'אֹזֶן',
              promptAudio: '/audio/words/ozen.mp3',
              correctFeedbackAudio: '/audio/word-correct/ozen.mp3',
              correct: '👂',
              options: ['❤️', '👂', '👁️', '🦵'],
            },
            {
              id: 'bo3',
              prompt: 'רֶגֶל',
              promptAudio: '/audio/words/regel.mp3',
              correctFeedbackAudio: '/audio/word-correct/regel.mp3',
              correct: '🦵',
              options: ['👂', '🦵', '❤️', '👁️'],
            },
            {
              id: 'bo4',
              prompt: 'לֵב',
              promptAudio: '/audio/words/lev.mp3',
              correctFeedbackAudio: '/audio/word-correct/lev.mp3',
              correct: '❤️',
              options: ['🦵', '👁️', '❤️', '👂'],
            },
          ],
        },
      ],
    },

    // ── Phase 2: Colors ───────────────────────────────────────────
    {
      id: 'l7-colors',
      type: 'word-reading',
      title: 'צְבָעִים',
      titleHebrew: 'צְבָעִים',
      description: 'קראו את המילה ומצאו את הצבע!',
      categoryIcon: '🎨',
      activities: [
        {
          id: 'l7-colors-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את הצבע!',
          maxStars: 3,
          optionMeta: {
            '🔴': { description: 'אדום',  wrongAudio: '/audio/word-wrong/adom.mp3' },
            '🔵': { description: 'כחול',  wrongAudio: '/audio/word-wrong/kachol.mp3' },
            '🟢': { description: 'ירוק',  wrongAudio: '/audio/word-wrong/yarok.mp3' },
            '🟡': { description: 'צהוב',  wrongAudio: '/audio/word-wrong/tzahov.mp3' },
          },
          items: [
            {
              id: 'co1',
              prompt: 'אָדֹם',
              promptAudio: '/audio/words/adom.mp3',
              correctFeedbackAudio: '/audio/word-correct/adom.mp3',
              correct: '🔴',
              options: ['🔴', '🔵', '🟢', '🟡'],
            },
            {
              id: 'co2',
              prompt: 'כָּחֹל',
              promptAudio: '/audio/words/kachol.mp3',
              correctFeedbackAudio: '/audio/word-correct/kachol.mp3',
              correct: '🔵',
              options: ['🟡', '🔵', '🔴', '🟢'],
            },
            {
              id: 'co3',
              prompt: 'יָרֹק',
              promptAudio: '/audio/words/yarok.mp3',
              correctFeedbackAudio: '/audio/word-correct/yarok.mp3',
              correct: '🟢',
              options: ['🔵', '🟢', '🟡', '🔴'],
            },
            {
              id: 'co4',
              prompt: 'צָהֹב',
              promptAudio: '/audio/words/tzahov.mp3',
              correctFeedbackAudio: '/audio/word-correct/tzahov.mp3',
              correct: '🟡',
              options: ['🟢', '🔴', '🟡', '🔵'],
            },
          ],
        },
      ],
    },

    // ── Phase 2: Toys ─────────────────────────────────────────────
    {
      id: 'l7-toys',
      type: 'word-reading',
      title: 'צַעֲצוּעִים',
      titleHebrew: 'צַעֲצוּעִים',
      description: 'קראו את המילה ומצאו את התמונה!',
      categoryIcon: '🧸',
      activities: [
        {
          id: 'l7-toys-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          maxStars: 3,
          optionMeta: {
            '⚽': { description: 'כדור',  wrongAudio: '/audio/word-wrong/kadur.mp3' },
            '🪆': { description: 'בובה',  wrongAudio: '/audio/word-wrong/buba.mp3' },
            '🚗': { description: 'רכב',   wrongAudio: '/audio/word-wrong/rechev.mp3' },
            '🐴': { description: 'סוס',   wrongAudio: '/audio/word-wrong/sus.mp3' },
          },
          items: [
            {
              id: 'to1',
              prompt: 'כַּדּוּר',
              promptAudio: '/audio/words/kadur.mp3',
              correctFeedbackAudio: '/audio/word-correct/kadur.mp3',
              correct: '⚽',
              options: ['⚽', '🪆', '🚗', '🐴'],
            },
            {
              id: 'to2',
              prompt: 'בֻּבָּה',
              promptAudio: '/audio/words/buba.mp3',
              correctFeedbackAudio: '/audio/word-correct/buba.mp3',
              correct: '🪆',
              options: ['🚗', '🪆', '⚽', '🐴'],
            },
            {
              id: 'to3',
              prompt: 'רֶכֶב',
              promptAudio: '/audio/words/rechev.mp3',
              correctFeedbackAudio: '/audio/word-correct/rechev.mp3',
              correct: '🚗',
              options: ['🐴', '🚗', '🪆', '⚽'],
            },
            {
              id: 'to4',
              prompt: 'סוּס',
              promptAudio: '/audio/words/sus.mp3',
              correctFeedbackAudio: '/audio/word-correct/sus.mp3',
              correct: '🐴',
              options: ['⚽', '🐴', '🚗', '🪆'],
            },
          ],
        },
      ],
    },

    // ── Big mixed review ─────────────────────────────────────────
    {
      id: 'l7-review',
      type: 'review',
      title: 'סיכום גדול',
      titleHebrew: 'סיכום גדול',
      description: 'כל המילים ביחד!',
      categoryIcon: '🌟',
      activities: [
        {
          id: 'l7-review-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          maxStars: 3,
          optionMeta: {
            '👩': { description: 'אמא',  wrongAudio: '/audio/word-wrong/ima.mp3' },
            '👦': { description: 'ילד',  wrongAudio: '/audio/word-wrong/yeled.mp3' },
            '👧': { description: 'ילדה', wrongAudio: '/audio/word-wrong/yalda.mp3' },
            '🐟': { description: 'דג',   wrongAudio: '/audio/word-wrong/dag.mp3' },
            '🐶': { description: 'כלב',  wrongAudio: '/audio/word-wrong/kelev.mp3' },
            '🐱': { description: 'חתול', wrongAudio: '/audio/word-wrong/chatul.mp3' },
            '☀️': { description: 'שמש',  wrongAudio: '/audio/word-wrong/shemesh.mp3' },
            '🌙': { description: 'ירח',  wrongAudio: '/audio/word-wrong/yareach.mp3' },
            '💧': { description: 'מים',  wrongAudio: '/audio/word-wrong/mayim.mp3' },
            '🏠': { description: 'בית',  wrongAudio: '/audio/word-wrong/bayit.mp3' },
            '📚': { description: 'ספר',  wrongAudio: '/audio/word-wrong/sefer.mp3' },
            '🍞': { description: 'לחם',  wrongAudio: '/audio/word-wrong/lechem.mp3' },
            '👋': { description: 'שלום', wrongAudio: '/audio/word-wrong/shalom.mp3' },
          },
          items: [
            {
              id: 'r1',
              prompt: 'אִמָּא',
              promptAudio: '/audio/words/ima.mp3',
              correctFeedbackAudio: '/audio/word-correct/ima.mp3',
              correct: '👩',
              options: ['👩', '🏠', '🐟', '☀️'],
            },
            {
              id: 'r2',
              prompt: 'חָתוּל',
              promptAudio: '/audio/words/chatul.mp3',
              correctFeedbackAudio: '/audio/word-correct/chatul.mp3',
              correct: '🐱',
              options: ['🐶', '🐱', '👦', '📚'],
            },
            {
              id: 'r3',
              prompt: 'שֶׁמֶשׁ',
              promptAudio: '/audio/words/shemesh.mp3',
              correctFeedbackAudio: '/audio/word-correct/shemesh.mp3',
              correct: '☀️',
              options: ['💧', '🍞', '☀️', '👧'],
            },
            {
              id: 'r4',
              prompt: 'בַּיִת',
              promptAudio: '/audio/words/bayit.mp3',
              correctFeedbackAudio: '/audio/word-correct/bayit.mp3',
              correct: '🏠',
              options: ['🏠', '👋', '🌙', '👦'],
            },
            {
              id: 'r5',
              prompt: 'כֶּלֶב',
              promptAudio: '/audio/words/kelev.mp3',
              correctFeedbackAudio: '/audio/word-correct/kelev.mp3',
              correct: '🐶',
              options: ['🐟', '🐶', '🍞', '☀️'],
            },
            {
              id: 'r6',
              prompt: 'יָרֵחַ',
              promptAudio: '/audio/words/yareach.mp3',
              correctFeedbackAudio: '/audio/word-correct/yareach.mp3',
              correct: '🌙',
              options: ['☀️', '🌙', '📚', '🐱'],
            },
          ],
        },
      ],
    },

  ],
};

export default level07;

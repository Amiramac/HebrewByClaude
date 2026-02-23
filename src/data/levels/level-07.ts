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

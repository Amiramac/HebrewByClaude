import { Level } from '@/types/levels';

// Level 7 — Read First, Listen Later
// Child reads the written Hebrew word (with Nikkud) silently, then taps the matching emoji.
// Audio plays ONLY after a correct answer — as positive reinforcement, not as a hint.
// Words use only letters from levels 1–6 and Kamatz/Patach/Segol/Hirik vowels.

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
          items: [
            {
              id: 'f1',
              prompt: 'אִמָּא',
              promptAudio: '/audio/words/ima.mp3',
              correct: '👩',
              options: ['👩', '👨', '👦', '👧'],
            },
            {
              id: 'f2',
              prompt: 'אַבָּא',
              promptAudio: '/audio/words/aba.mp3',
              correct: '👨',
              options: ['👩', '👨', '👦', '👧'],
            },
            {
              id: 'f3',
              prompt: 'יֶלֶד',
              promptAudio: '/audio/words/yeled.mp3',
              correct: '👦',
              options: ['👧', '👨', '👦', '👩'],
            },
            {
              id: 'f4',
              prompt: 'יַלְדָּה',
              promptAudio: '/audio/words/yalda.mp3',
              correct: '👧',
              options: ['👦', '👩', '👧', '👨'],
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
      title: 'חיות',
      titleHebrew: 'חיות',
      description: 'קראו את המילה ומצאו את התמונה!',
      categoryIcon: '🐾',
      activities: [
        {
          id: 'l7-animals-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          items: [
            {
              id: 'a1',
              prompt: 'דָּג',
              promptAudio: '/audio/words/dag.mp3',
              correct: '🐟',
              options: ['🐟', '🐶', '🐱', '🐦'],
            },
            {
              id: 'a2',
              prompt: 'כֶּלֶב',
              promptAudio: '/audio/words/kelev.mp3',
              correct: '🐶',
              options: ['🐱', '🐶', '🐟', '🐦'],
            },
            {
              id: 'a3',
              prompt: 'חָתוּל',
              promptAudio: '/audio/words/chatul.mp3',
              correct: '🐱',
              options: ['🐶', '🐟', '🐱', '🐦'],
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
      title: 'טֶבַע',
      titleHebrew: 'טֶבַע',
      description: 'קראו את המילה ומצאו את התמונה!',
      categoryIcon: '🌿',
      activities: [
        {
          id: 'l7-nature-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          items: [
            {
              id: 'n1',
              prompt: 'שֶׁמֶשׁ',
              promptAudio: '/audio/words/shemesh.mp3',
              correct: '☀️',
              options: ['☀️', '🌙', '💧', '✋'],
            },
            {
              id: 'n2',
              prompt: 'יָרֵחַ',
              promptAudio: '/audio/words/yareach.mp3',
              correct: '🌙',
              options: ['☀️', '🌙', '💧', '✋'],
            },
            {
              id: 'n3',
              prompt: 'מַיִם',
              promptAudio: '/audio/words/mayim.mp3',
              correct: '💧',
              options: ['🌙', '✋', '💧', '☀️'],
            },
            {
              id: 'n4',
              prompt: 'יָד',
              promptAudio: '/audio/words/yad.mp3',
              correct: '✋',
              options: ['💧', '🌙', '☀️', '✋'],
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
      title: 'דְּבָרִים',
      titleHebrew: 'דְּבָרִים',
      description: 'קראו את המילה ומצאו את התמונה!',
      categoryIcon: '🏠',
      activities: [
        {
          id: 'l7-things-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          items: [
            {
              id: 't1',
              prompt: 'בַּיִת',
              promptAudio: '/audio/words/bayit.mp3',
              correct: '🏠',
              options: ['🏠', '📚', '🍞', '👋'],
            },
            {
              id: 't2',
              prompt: 'סֵפֶר',
              promptAudio: '/audio/words/sefer.mp3',
              correct: '📚',
              options: ['🏠', '📚', '🍞', '👋'],
            },
            {
              id: 't3',
              prompt: 'לֶחֶם',
              promptAudio: '/audio/words/lechem.mp3',
              correct: '🍞',
              options: ['📚', '🍞', '👋', '🏠'],
            },
            {
              id: 't4',
              prompt: 'שָׁלוֹם',
              promptAudio: '/audio/words/shalom.mp3',
              correct: '👋',
              options: ['🍞', '🏠', '👋', '📚'],
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
      title: 'סיכום גדול',
      titleHebrew: 'סיכום גדול',
      description: 'כל המילים ביחד!',
      categoryIcon: '🌟',
      activities: [
        {
          id: 'l7-review-match',
          type: 'word-picture-match',
          instruction: 'קראו את המילה ומצאו את התמונה!',
          items: [
            {
              id: 'r1',
              prompt: 'אִמָּא',
              promptAudio: '/audio/words/ima.mp3',
              correct: '👩',
              options: ['👩', '🏠', '🐟', '☀️'],
            },
            {
              id: 'r2',
              prompt: 'חָתוּל',
              promptAudio: '/audio/words/chatul.mp3',
              correct: '🐱',
              options: ['🐶', '🐱', '👦', '📚'],
            },
            {
              id: 'r3',
              prompt: 'שֶׁמֶשׁ',
              promptAudio: '/audio/words/shemesh.mp3',
              correct: '☀️',
              options: ['💧', '🍞', '☀️', '👧'],
            },
            {
              id: 'r4',
              prompt: 'בַּיִת',
              promptAudio: '/audio/words/bayit.mp3',
              correct: '🏠',
              options: ['🏠', '👋', '🌙', '👦'],
            },
            {
              id: 'r5',
              prompt: 'כֶּלֶב',
              promptAudio: '/audio/words/kelev.mp3',
              correct: '🐶',
              options: ['🐟', '🐶', '🍞', '✋'],
            },
            {
              id: 'r6',
              prompt: 'יָרֵחַ',
              promptAudio: '/audio/words/yareach.mp3',
              correct: '🌙',
              options: ['☀️', '🌙', '📚', '🐱'],
            },
          ],
          maxStars: 3,
        },
      ],
    },

  ],
};

export default level07;

# Hebrew by Claude - עברית עם קלוד

A Hebrew literacy app for Maayan (age 4), teaching Hebrew reading from zero knowledge to full word reading using research-backed pedagogy.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) on a tablet browser for the best experience.

## Architecture

- **Next.js 16** + TypeScript + Tailwind CSS
- **Framer Motion** for child-friendly animations
- **Zustand** for progress persistence (localStorage)
- **Howler.js** for audio playback
- RTL-native layout with Hebrew-optimized typography

## Learning Levels (Phase 1 MVP)

1. **Meet the Letters** - First 5 letters (א שׁ ל מ ב)
2. **More Friends** - Next 5 letters (ד ה י ת ר) + visual discrimination
3. **The First Vowel** - Kamatz/Patach + first syllable reading

See [MASTER_PLAN.md](./MASTER_PLAN.md) for the full 10-level pedagogical plan.

## Adding Content

Levels are data-driven. To add a new level:
1. Create `src/data/levels/level-XX.ts`
2. Register it in `src/data/levels/index.ts`
3. Add audio files to `public/audio/`

No component changes needed.

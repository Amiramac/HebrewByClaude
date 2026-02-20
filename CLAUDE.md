# HebrewByClaude - Project Guide

## What Is This
Hebrew literacy app for 4-year-old Maayan. Teaches reading via the Tzerufim method (syllable units, not phoneme blending).

## Tech Stack
- Next.js 16 + TypeScript + Tailwind CSS + Framer Motion + Zustand + Howler.js
- RTL-native (`dir="rtl"` on `<html>`)
- System fonts (no Google Fonts — network restricted in dev env)
- Zustand + localStorage for progress (no backend)
- Audio: ElevenLabs V3 API (Arabella voice), files in `/public/audio/`

## Architecture
- **Data-driven**: levels are TS data files in `src/data/levels/`, NOT hardcoded UI
- Activity components are generic: TapTheLetter, MatchPairs, ListenAndChoose
- Adding a level = adding a data file + registering in `src/data/levels/index.ts`

## Current State (as of Feb 2026)
- **Levels 1-6 complete**: all 22 Hebrew letters + kamatz/chirik/segol vowels + first words
- **3 activity types working**: TapTheLetter, MatchPairs, ListenAndChoose
- **Planned next**: Level 7 "word-picture-match" with emoji images
- **Levels 7-10 not built yet**: remaining vowels, words, shva, free reading

## Server Deployment (GCE)
- VM: `dev-hebrew-app` in `europe-west1-b`, project `hebrewapp-487809`
- External IP: `34.77.51.224`
- Domain: `hebrew-app.live` (DNS via Squarespace)
- Caddy reverse proxy on ports 80/443 → localhost:3000
- Next.js production (`next start -H 0.0.0.0`) on port 3000
- SSL via Let's Encrypt (auto-managed by Caddy)
- GCE firewall rule `allow-http`: tcp:80,443, Apply to all, 0.0.0.0/0

## Key Files
- `src/types/levels.ts` — Level, Lesson, Activity, ActivityItem types
- `src/data/levels/` — level-01.ts through level-06.ts + index.ts
- `src/data/letters.ts, vowels.ts, words.ts` — Hebrew data
- `src/components/activities/` — TapTheLetter, MatchPairs, ListenAndChoose
- `src/hooks/useAudio.ts, useActivity.ts` — audio playback + activity state
- `src/store/progressStore.ts` — Zustand progress store
- `src/lib/hebrew.ts` — shuffle, stripNikkud, charToSlug, audio path helpers
- `scripts/generate-audio.ts` — ElevenLabs audio generation script

## React Strict Mode Gotcha
- Next.js dev enables Strict Mode -> effects fire twice (mount/cleanup/remount)
- NEVER use `ref++` in effects for "first time" detection
- Fix: deterministic data comparison (`currentItem.id === items[0].id`)
- Always add cleanup `return () => clearTimeout(timer)` to timer effects

## Audio Generation
```bash
npx tsx scripts/generate-audio.ts
```
Requires `.env.local` with `ELEVENLABS_API_KEY`. Script skips existing files.

## Branch
- Development: `claude/hebrew-literacy-app-OBVBe`
- Can only push to `claude/` prefixed branches (git proxy restriction)
- User merges to main manually

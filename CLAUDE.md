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

## Current State (as of Mar 2026)
- **Levels 1-8 complete**: all 22 letters + all vowels + first words + word-picture matching
- **4 activity types**: TapTheLetter, MatchPairs, ListenAndChoose, WordPictureMatch
- **AppShell**: WelcomeScreen, TimerGuard (daily limit), ParentDashboard
- **Supabase**: learning sessions logged to `learning_sessions` table
- **Levels 9-10 not built yet**: shva, free reading

## Server Deployment (Oracle Cloud)
- VM: Oracle Cloud, IP `151.145.86.195`, user `opc`
- SSH: `ssh oracle` (alias in ~/.ssh/config) — has RemoteCommand for tmux, bypasses commands
- SSH for scripting: `ssh -i ~/.ssh/ssh-key-2026-02-24.key -o RequestTTY=no opc@151.145.86.195 "cmd"`
- Domain: `hebrew-app.live`
- **Docker Compose** at `~/deployments/HebrewByClaude/docker-compose.yml` (NOT in git — server-only)
  - `hebrew-prod` → port 3000 (production)
  - `hebrew-test` → port 3001
  - `hebrew-dev`  → port 3002
- Audio files served from Oracle Object Storage (not from public/)
- **Deploy command**: `cd ~/deployments/HebrewByClaude && git pull && docker compose build app-prod && docker compose up -d app-prod`
- `docker-compose.yml` is NOT committed to git — if lost, recreate with Oracle Object Storage URL:
  `https://objectstorage.il-jerusalem-1.oraclecloud.com/n/axnsxk4cnhih/b/hebrew-audio-files/o`

## Key Files
- `src/types/levels.ts` — Level, Lesson, Activity, ActivityItem types
- `src/data/levels/` — level-01.ts through level-08.ts + index.ts
- `src/data/letters.ts, vowels.ts, words.ts` — Hebrew data
- `src/components/activities/` — TapTheLetter, MatchPairs, ListenAndChoose, WordPictureMatch, VowelVideoPlayer
- `src/components/shell/` — AppShell, WelcomeScreen, TimerGuard
- `src/hooks/useAudio.ts, useActivity.ts` — audio playback + activity state
- `src/store/progressStore.ts, appStore.ts` — Zustand stores
- `src/lib/hebrew.ts` — shuffle, stripNikkud, charToSlug, audio path helpers
- `src/lib/supabase.ts` — Supabase client + logLearningSession()
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

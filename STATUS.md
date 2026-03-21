# HebrewByClaude — Session Status (2026-03-21)

## Project Overview

Hebrew literacy app for 4-year-old Maayan.
Teaches reading via the **Tzerufim method** (syllable units, not phoneme blending).

**Repository:** https://github.com/Amiramac/HebrewByClaude
**Main dev branch:** `claude/hebrew-literacy-app-OBVBe`
**Full project guide:** [`CLAUDE.md`](https://github.com/Amiramac/HebrewByClaude/blob/claude/hebrew-literacy-app-OBVBe/CLAUDE.md)

---

## Infrastructure

| Item | Status |
|------|--------|
| Public IP | `151.145.86.195` |
| DNS `hebrew-app.live` | ✓ Points to 151.145.86.195 |
| DNS `test.hebrew-app.live` | ✓ Points to 151.145.86.195 |
| Nginx reverse proxy | ✓ Port 80 routes to containers |
| Firewall (OS + Oracle Cloud) | ✓ Ports 80, 3000, 3001, 3002 open |

## URLs

| Environment | URL | Port |
|-------------|-----|------|
| Prod | http://hebrew-app.live | 80 → 3000 |
| Test | http://test.hebrew-app.live | 80 → 3001 |
| Dev | http://dev.hebrew-app.live | 80 → 3002 |

## Containers

```
hebrew-prod   Up   0.0.0.0:3000->3000/tcp
hebrew-test   Up   0.0.0.0:3001->3000/tcp
hebrew-dev    Up   0.0.0.0:3002->3000/tcp
```

---

## App State (as of 2026-03-21)

### Levels

| Level | Content | Status |
|-------|---------|--------|
| 1 | First 5 letters (א ב ג ד ה) — TapTheLetter | ✓ Done |
| 2 | Letters 6–11 (ו ז ח ט י כ) — TapTheLetter | ✓ Done |
| 3 | Vowels intro: Kamatz, Patach, Chirik, Segol, Tzere — with animation + audio | ✓ Done |
| 4 | Letters 12–17 (ל מ נ ס ע פ) — TapTheLetter | ✓ Done |
| 5 | Letters 18–22 (צ ק ר ש ת) + MatchPairs | ✓ Done |
| 6 | First words (bayit, kelev, etc.) — ListenAndChoose | ✓ Done |
| 7 | Word-picture matching — WordPictureMatch (100+ audio assets) | ✓ Done |
| 8 | Listening & reading activities | ✓ Done |
| 9 | Remaining vowels: shva, kubutz | ✗ Not built |
| 10 | Free reading mode | ✗ Not built |

### Activity Types

| Component | Description |
|-----------|-------------|
| `TapTheLetter` | Hear a letter name, tap the correct one |
| `MatchPairs` | Match letter pairs (regular + final forms) |
| `ListenAndChoose` | Listen to a word/syllable, choose the correct answer |
| `WordPictureMatch` | Match written words to pictures |

### Features

- **Parental controls**: ParentDashboard, TimerGuard, ParentGate, WelcomeScreen — all working
- **Audio**: ElevenLabs V3 (Arabella voice), served from Oracle Cloud Object Storage CDN
- **Progress**: Zustand + localStorage (no backend, no database)
- **Gender selection**: Gendered audio (male/female) for instructions and feedback
- **Vowel intro animation**: Generic video player backed by `NikkudMark` data (Level 3)

---

## Recent Changes (since 2026-03-07)

| Commit | Change |
|--------|--------|
| `a4e0857` | Refactor vowel intro: generic video player backed by NikkudMark data |
| `7c583d0` | Enhance Kamatz intro: add audio + 3 cycling letter examples |
| `01a0f6a` | Add Kamatz vowel intro animation for Level 3 (test only) |
| `44b99bb` | Fix client-side crash for returning users (Zustand SSR hydration mismatch) |
| `fe8ebd8` | Add specific audio feedback for Level 7 word-picture matching |

---

## Deployment Repos

| Path | Role |
|------|------|
| `/home/opc/HebrewByClaude/` | Source / dev repo (this repo) |
| `/home/opc/deployments/HebrewByClaude/` | Deployment repo (has Dockerfile, docker-compose, .env.local) |

**Sync command:** rsync source → deployment (see `CLAUDE.md` for exact command + exclusion rules)
**Never overwrite:** `next.config.ts`, `Dockerfile`, `docker-compose.yml`, `.env.local`

---

## Next Priorities

1. **Build agents** — Use Claude to build autonomous agents that can work on the project
2. **Levels 9–10** — Remaining vowels (shva, kubutz) + free reading mode
3. **HTTPS / SSL** — Let's Encrypt cert via certbot + nginx
4. **Branch reconciliation** — `claude/test` has diverged from `claude/hebrew-literacy-app-OBVBe`

## Known Issues / Notes

- `CLAUDE.md` has full "Never Overwrite" rules for rsync
- "Failed to find Server Action" after redeploy is benign — clears on hard-refresh
- React Strict Mode fires effects twice in dev — use deterministic comparisons, not ref counters
- `claude/test` branch is currently ahead of main dev branch (unmerged work)

/**
 * Audio Generation Script for HebrewByClaude
 * Uses ElevenLabs V3 API with Liam voice to generate Hebrew audio files.
 *
 * Usage: npx tsx scripts/generate-audio.ts
 *
 * Requires .env.local with:
 *   ELEVENLABS_API_KEY=...
 *   ELEVENLABS_VOICE_ID=TX3LPaxmHKxFdv7VOQHJ
 *   ELEVENLABS_MODEL_ID=eleven_v3
 */

import fs from 'fs';
import path from 'path';

// ── Load .env.local ─────────────────────────────────────────────
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

// ── Config ──────────────────────────────────────────────────────
const API_KEY = process.env.ELEVENLABS_API_KEY!;
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'TX3LPaxmHKxFdv7VOQHJ';
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_v3';
const BASE_URL = 'https://api.elevenlabs.io/v1/text-to-speech';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio');

// Slow, clear speech for a 4-year-old learner
const VOICE_SETTINGS = {
  stability: 0.7,
  similarity_boost: 0.75,
  style: 0.0,
  speed: 0.85, // slightly slower for clarity
};

// ── Audio Entries ───────────────────────────────────────────────
interface AudioEntry {
  filename: string;    // relative to public/audio/
  text: string;        // Hebrew text to speak
  description: string; // for logging
}

const LETTER_AUDIO: AudioEntry[] = [
  // Level 1
  { filename: 'letters/alef.mp3', text: 'אָלֶף', description: 'Letter Alef' },
  { filename: 'letters/shin.mp3', text: 'שִׁין', description: 'Letter Shin' },
  { filename: 'letters/lamed.mp3', text: 'לָמֶד', description: 'Letter Lamed' },
  { filename: 'letters/mem.mp3', text: 'מֵם', description: 'Letter Mem' },
  { filename: 'letters/bet.mp3', text: 'בֵּית', description: 'Letter Bet' },
  // Level 2
  { filename: 'letters/dalet.mp3', text: 'דָלֶת', description: 'Letter Dalet' },
  { filename: 'letters/he.mp3', text: 'הֵא', description: 'Letter He' },
  { filename: 'letters/yod.mp3', text: 'יוֹד', description: 'Letter Yod' },
  { filename: 'letters/tav.mp3', text: 'תָּו', description: 'Letter Tav' },
  { filename: 'letters/resh.mp3', text: 'רֵישׁ', description: 'Letter Resh' },
  // Level 4
  { filename: 'letters/chet.mp3', text: 'חֵית', description: 'Letter Chet' },
  { filename: 'letters/kaf.mp3', text: 'כַּף', description: 'Letter Kaf' },
  { filename: 'letters/nun.mp3', text: 'נוּן', description: 'Letter Nun' },
  { filename: 'letters/ayin.mp3', text: 'עַיִן', description: 'Letter Ayin' },
  { filename: 'letters/pe.mp3', text: 'פֵּא', description: 'Letter Pe' },
  { filename: 'letters/gimel.mp3', text: 'גִימֶל', description: 'Letter Gimel' },
  { filename: 'letters/zayin.mp3', text: 'זַיִן', description: 'Letter Zayin' },
  { filename: 'letters/vav.mp3', text: 'וָו', description: 'Letter Vav' },
  // Level 6
  { filename: 'letters/tet.mp3', text: 'טֵית', description: 'Letter Tet' },
  { filename: 'letters/samekh.mp3', text: 'סָמֶך', description: 'Letter Samekh' },
  { filename: 'letters/kuf.mp3', text: 'קוּף', description: 'Letter Kuf' },
  { filename: 'letters/tsadi.mp3', text: 'צָדִי', description: 'Letter Tsadi' },
];

const VOWEL_AUDIO: AudioEntry[] = [
  { filename: 'vowels/kamatz.mp3', text: 'קָמַץ. אָ', description: 'Vowel Kamatz' },
  { filename: 'vowels/patach.mp3', text: 'פַּתָח. אַ', description: 'Vowel Patach' },
  { filename: 'vowels/chirik.mp3', text: 'חִירִיק. אִי', description: 'Vowel Chirik' },
  { filename: 'vowels/segol.mp3', text: 'סֶגוֹל. אֶ', description: 'Vowel Segol' },
  { filename: 'vowels/tzereh.mp3', text: 'צֵרֵה. אֵ', description: 'Vowel Tzereh' },
  { filename: 'vowels/cholam.mp3', text: 'חוֹלָם. אוֹ', description: 'Vowel Cholam' },
  { filename: 'vowels/kubutz.mp3', text: 'קוּבּוּץ. אוּ', description: 'Vowel Kubutz' },
  { filename: 'vowels/shuruk.mp3', text: 'שׁוּרוּק. אוּ', description: 'Vowel Shuruk' },
  { filename: 'vowels/shva.mp3', text: 'שְׁוָא', description: 'Vowel Shva' },
];

// Syllables: consonant + kamatz (/a/ sound) for Level 3
const LEVEL3_CONSONANTS = ['ב', 'שׁ', 'ל', 'מ', 'א', 'ד', 'ה', 'י', 'ת', 'ר'];
const SYLLABLE_AUDIO: AudioEntry[] = LEVEL3_CONSONANTS.map(c => {
  const names: Record<string, string> = {
    'ב': 'ba', 'שׁ': 'sha', 'ל': 'la', 'מ': 'ma', 'א': 'a',
    'ד': 'da', 'ה': 'ha', 'י': 'ya', 'ת': 'ta', 'ר': 'ra',
  };
  const syllableTexts: Record<string, string> = {
    'ב': 'בָּ', 'שׁ': 'שָׁ', 'ל': 'לָ', 'מ': 'מָ', 'א': 'אָ',
    'ד': 'דָ', 'ה': 'הָ', 'י': 'יָ', 'ת': 'תָּ', 'ר': 'רָ',
  };
  const name = names[c] || c;
  return {
    filename: `syllables/${name}.mp3`,
    text: syllableTexts[c] || c,
    description: `Syllable ${name}`,
  };
});

const WORD_AUDIO: AudioEntry[] = [
  { filename: 'words/ima.mp3', text: 'אִמָּא', description: 'Word: ima (mom)' },
  { filename: 'words/aba.mp3', text: 'אַבָּא', description: 'Word: aba (dad)' },
  { filename: 'words/bayit.mp3', text: 'בַּיִת', description: 'Word: bayit (house)' },
  { filename: 'words/yad.mp3', text: 'יַד', description: 'Word: yad (hand)' },
  { filename: 'words/dag.mp3', text: 'דָג', description: 'Word: dag (fish)' },
  { filename: 'words/shalom.mp3', text: 'שָׁלוֹם', description: 'Word: shalom' },
  { filename: 'words/yeled.mp3', text: 'יֶלֶד', description: 'Word: yeled (boy)' },
  { filename: 'words/yalda.mp3', text: 'יַלְדָה', description: 'Word: yalda (girl)' },
  { filename: 'words/sefer.mp3', text: 'סֵפֶר', description: 'Word: sefer (book)' },
  { filename: 'words/kelev.mp3', text: 'כֶּלֶב', description: 'Word: kelev (dog)' },
  { filename: 'words/chatul.mp3', text: 'חָתוּל', description: 'Word: chatul (cat)' },
  { filename: 'words/mayim.mp3', text: 'מַיִם', description: 'Word: mayim (water)' },
  { filename: 'words/lechem.mp3', text: 'לֶחֶם', description: 'Word: lechem (bread)' },
  { filename: 'words/shemesh.mp3', text: 'שֶׁמֶשׁ', description: 'Word: shemesh (sun)' },
  { filename: 'words/yareach.mp3', text: 'יָרֵחַ', description: 'Word: yareach (moon)' },
];

const UI_AUDIO: AudioEntry[] = [
  { filename: 'ui/correct.mp3', text: 'כָּל הַכָּבוֹד!', description: 'UI: correct answer' },
  { filename: 'ui/encourage.mp3', text: 'נַסֶּה שׁוּב!', description: 'UI: try again' },
  { filename: 'ui/celebrate.mp3', text: 'מְצוּיָן! סִיַּמְתָּ!', description: 'UI: celebration' },
  { filename: 'ui/tap.mp3', text: 'הֵי!', description: 'UI: tap feedback' },
];

const NARRATION_AUDIO: AudioEntry[] = [
  { filename: 'narration/welcome.mp3', text: 'שָׁלוֹם מַעְיָן! בּוֹאִי נִלְמַד אוֹתִיּוֹת!', description: 'Welcome Maayan' },
  { filename: 'narration/tap-the-letter.mp3', text: 'לִחְצִי עַל הָאוֹת הַנְּכוֹנָה!', description: 'Tap the right letter' },
  { filename: 'narration/listen-and-choose.mp3', text: 'הַקְשִׁיבִי וּבַחֲרִי!', description: 'Listen and choose' },
  { filename: 'narration/match-pairs.mp3', text: 'מִצְאִי אֶת הַזּוּגוֹת!', description: 'Find the pairs' },
  { filename: 'narration/first-vowel.mp3', text: 'הַיּוֹם נִלְמַד אֶת הַתְּנוּעָה הָרִאשׁוֹנָה! קָמָץ אוֹמֵר אָ!', description: 'First vowel intro' },
  { filename: 'narration/great-job.mp3', text: 'עָשִׂית עֲבוֹדָה מְצוּיֶנֶת!', description: 'Great job' },
  { filename: 'narration/level-complete.mp3', text: 'כָּל הַכָּבוֹד! סִיַּמְתְּ אֶת הַשָּׁלָב!', description: 'Level complete' },
];

// ── API Call ─────────────────────────────────────────────────────

async function generateAudio(entry: AudioEntry): Promise<boolean> {
  const outputPath = path.join(OUTPUT_DIR, entry.filename);
  const dir = path.dirname(outputPath);

  // Skip if file already exists and has content
  if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 1000) {
    console.log(`  SKIP  ${entry.description} (already exists)`);
    return true;
  }

  fs.mkdirSync(dir, { recursive: true });

  try {
    const response = await fetch(`${BASE_URL}/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: entry.text,
        model_id: MODEL_ID,
        language_code: 'he',
        voice_settings: VOICE_SETTINGS,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`  FAIL  ${entry.description}: ${response.status} ${errorText}`);
      return false;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(outputPath, buffer);
    console.log(`  OK    ${entry.description} → ${entry.filename} (${buffer.length} bytes)`);
    return true;
  } catch (err) {
    console.error(`  ERR   ${entry.description}: ${err}`);
    return false;
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Main ────────────────────────────────────────────────────────

async function main() {
  if (!API_KEY) {
    console.error('Missing ELEVENLABS_API_KEY. Set it in .env.local');
    process.exit(1);
  }

  const allEntries: AudioEntry[] = [
    ...LETTER_AUDIO,
    ...VOWEL_AUDIO,
    ...SYLLABLE_AUDIO,
    ...WORD_AUDIO,
    ...UI_AUDIO,
    ...NARRATION_AUDIO,
  ];

  console.log(`\nHebrewByClaude Audio Generator`);
  console.log(`Voice: Liam (${VOICE_ID})`);
  console.log(`Model: ${MODEL_ID}`);
  console.log(`Language: Hebrew (he)`);
  console.log(`Total entries: ${allEntries.length}\n`);

  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (const entry of allEntries) {
    const outputPath = path.join(OUTPUT_DIR, entry.filename);
    if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 1000) {
      skipped++;
      console.log(`  SKIP  ${entry.description}`);
      continue;
    }

    const ok = await generateAudio(entry);
    if (ok) success++;
    else failed++;

    // Rate limiting: ElevenLabs allows ~10 req/s, but be gentle
    await sleep(350);
  }

  console.log(`\nDone! Generated: ${success} | Skipped: ${skipped} | Failed: ${failed}`);
  console.log(`Total audio files: ${success + skipped}/${allEntries.length}`);
}

main();

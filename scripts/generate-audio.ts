/**
 * Audio Generation Script for HebrewByClaude
 * Uses ElevenLabs V3 API with Arabella voice to generate Hebrew audio files.
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
const VOICE_ID = 'Z3R5wn05IrDiVCyEkUrK'; // Arabella
const MODEL_ID = 'eleven_v3';
const BASE_URL = 'https://api.elevenlabs.io/v1/text-to-speech';
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'audio');

// Clear, warm speech for a 4-year-old learner
const VOICE_SETTINGS = {
  stability: 1.0,
  similarity_boost: 0.75,
  style: 0.0,
  use_speaker_boost: false,
};

// ── Audio Entries ───────────────────────────────────────────────
interface AudioEntry {
  filename: string;    // relative to public/audio/
  text: string;        // Hebrew text to speak
  description: string; // for logging
}

const LETTER_AUDIO: AudioEntry[] = [
  // Level 1 — minimal nikkud only where name is ambiguous without it
  { filename: 'letters/alef.mp3', text: 'אלף', description: 'Letter Alef' },
  { filename: 'letters/shin.mp3', text: 'שין', description: 'Letter Shin' },
  { filename: 'letters/lamed.mp3', text: 'לָמד', description: 'Letter Lamed' },
  { filename: 'letters/mem.mp3', text: 'מם', description: 'Letter Mem' },
  { filename: 'letters/bet.mp3', text: 'בֵית', description: 'Letter Bet' },
  // Level 2
  { filename: 'letters/dalet.mp3', text: 'דָלת', description: 'Letter Dalet' },
  { filename: 'letters/he.mp3', text: 'הא', description: 'Letter He' },
  { filename: 'letters/yod.mp3', text: 'יוד', description: 'Letter Yod' },
  { filename: 'letters/tav.mp3', text: 'תו', description: 'Letter Tav' },
  { filename: 'letters/resh.mp3', text: 'ריש', description: 'Letter Resh' },
  // Level 4
  { filename: 'letters/chet.mp3', text: 'חית', description: 'Letter Chet' },
  { filename: 'letters/kaf.mp3', text: 'כף', description: 'Letter Kaf' },
  { filename: 'letters/nun.mp3', text: 'נון', description: 'Letter Nun' },
  { filename: 'letters/ayin.mp3', text: 'עין', description: 'Letter Ayin' },
  { filename: 'letters/pe.mp3', text: 'פא', description: 'Letter Pe' },
  { filename: 'letters/gimel.mp3', text: 'גימל', description: 'Letter Gimel' },
  { filename: 'letters/zayin.mp3', text: 'זין', description: 'Letter Zayin' },
  { filename: 'letters/vav.mp3', text: 'וו', description: 'Letter Vav' },
  // Level 6
  { filename: 'letters/tet.mp3', text: 'טית', description: 'Letter Tet' },
  { filename: 'letters/samekh.mp3', text: 'סָמך', description: 'Letter Samekh' },
  { filename: 'letters/kuf.mp3', text: 'קוף', description: 'Letter Kuf' },
  { filename: 'letters/tsadi.mp3', text: 'צדי', description: 'Letter Tsadi' },
];

const VOWEL_AUDIO: AudioEntry[] = [
  { filename: 'vowels/kamatz.mp3', text: 'קמץ. אה.', description: 'Vowel Kamatz' },
  { filename: 'vowels/patach.mp3', text: 'פתח. אה.', description: 'Vowel Patach' },
  { filename: 'vowels/chirik.mp3', text: 'חיריק. אי.', description: 'Vowel Chirik' },
  { filename: 'vowels/segol.mp3', text: 'סגול. אה.', description: 'Vowel Segol' },
  { filename: 'vowels/tzereh.mp3', text: 'צרה. אה.', description: 'Vowel Tzereh' },
  { filename: 'vowels/cholam.mp3', text: 'חולם. או.', description: 'Vowel Cholam' },
  { filename: 'vowels/kubutz.mp3', text: 'קובוץ. או.', description: 'Vowel Kubutz' },
  { filename: 'vowels/shuruk.mp3', text: 'שורוק. או.', description: 'Vowel Shuruk' },
  { filename: 'vowels/shva.mp3', text: 'שווא', description: 'Vowel Shva' },
];

// Syllables: consonant + kamatz (/a/ sound) for Level 3
const LEVEL3_CONSONANTS = ['ב', 'שׁ', 'ל', 'מ', 'א', 'ד', 'ה', 'י', 'ת', 'ר'];
const SYLLABLE_A_AUDIO: AudioEntry[] = LEVEL3_CONSONANTS.map(c => {
  const names: Record<string, string> = {
    'ב': 'ba', 'שׁ': 'sha', 'ל': 'la', 'מ': 'ma', 'א': 'a',
    'ד': 'da', 'ה': 'ha', 'י': 'ya', 'ת': 'ta', 'ר': 'ra',
  };
  // Natural phonetic text — the syllable sound spoken aloud
  const syllableTexts: Record<string, string> = {
    'ב': 'בא', 'שׁ': 'שא', 'ל': 'לא', 'מ': 'מא', 'א': 'אא',
    'ד': 'דא', 'ה': 'הא', 'י': 'יא', 'ת': 'תא', 'ר': 'רא',
  };
  const name = names[c] || c;
  return {
    filename: `syllables/${name}.mp3`,
    text: syllableTexts[c] || c,
    description: `Syllable ${name}`,
  };
});

// Syllables: consonant + chirik (/i/ sound) for Level 5
const SYLLABLE_I_AUDIO: AudioEntry[] = [
  { filename: 'syllables/bi.mp3', text: 'בי', description: 'Syllable bi' },
  { filename: 'syllables/shi.mp3', text: 'שִׁ', description: 'Syllable shi' },
  { filename: 'syllables/li.mp3', text: 'לי', description: 'Syllable li' },
  { filename: 'syllables/mi.mp3', text: 'מי', description: 'Syllable mi' },
  { filename: 'syllables/di.mp3', text: 'דִּ', description: 'Syllable di' },
  { filename: 'syllables/ti.mp3', text: 'תי', description: 'Syllable ti' },
  { filename: 'syllables/ri.mp3', text: 'רי', description: 'Syllable ri' },
  { filename: 'syllables/hi.mp3', text: 'הי', description: 'Syllable hi' },
];

// Syllables: consonant + segol (/e/ sound) for Level 5
const SYLLABLE_E_AUDIO: AudioEntry[] = [
  { filename: 'syllables/be.mp3', text: 'בֶּה', description: 'Syllable be' },
  { filename: 'syllables/me.mp3', text: 'מֶה', description: 'Syllable me' },
  { filename: 'syllables/le.mp3', text: 'לֶה', description: 'Syllable le' },
  { filename: 'syllables/she.mp3', text: 'שֶׁה', description: 'Syllable she' },
  { filename: 'syllables/de.mp3', text: 'דֶה', description: 'Syllable de' },
  { filename: 'syllables/re.mp3', text: 'רֶה', description: 'Syllable re' },
  { filename: 'syllables/he2.mp3', text: 'הֶה', description: 'Syllable he (segol)' },
  { filename: 'syllables/te.mp3', text: 'תֶּה', description: 'Syllable te' },
];

const SYLLABLE_AUDIO: AudioEntry[] = [...SYLLABLE_A_AUDIO, ...SYLLABLE_I_AUDIO, ...SYLLABLE_E_AUDIO];

const WORD_AUDIO: AudioEntry[] = [
  { filename: 'words/ima.mp3', text: 'אימא', description: 'Word: ima (mom)' },
  { filename: 'words/aba.mp3', text: 'אבא', description: 'Word: aba (dad)' },
  { filename: 'words/bayit.mp3', text: 'בית', description: 'Word: bayit (house)' },
  { filename: 'words/yad.mp3', text: 'יד', description: 'Word: yad (hand)' },
  { filename: 'words/dag.mp3', text: 'דג', description: 'Word: dag (fish)' },
  { filename: 'words/shalom.mp3', text: 'שלום', description: 'Word: shalom' },
  { filename: 'words/yeled.mp3', text: 'ילד', description: 'Word: yeled (boy)' },
  { filename: 'words/yalda.mp3', text: 'ילדה', description: 'Word: yalda (girl)' },
  { filename: 'words/sefer.mp3', text: 'ספר', description: 'Word: sefer (book)' },
  { filename: 'words/kelev.mp3', text: 'כלב', description: 'Word: kelev (dog)' },
  { filename: 'words/chatul.mp3', text: 'חתול', description: 'Word: chatul (cat)' },
  { filename: 'words/mayim.mp3', text: 'מים', description: 'Word: mayim (water)' },
  { filename: 'words/lechem.mp3', text: 'לחם', description: 'Word: lechem (bread)' },
  { filename: 'words/shemesh.mp3', text: 'שמש', description: 'Word: shemesh (sun)' },
  { filename: 'words/yareach.mp3', text: 'ירח', description: 'Word: yareach (moon)' },
];

const UI_AUDIO: AudioEntry[] = [
  { filename: 'ui/correct.mp3', text: 'כל הכבוד!', description: 'UI: correct answer' },
  { filename: 'ui/encourage.mp3', text: 'נסה שוב!', description: 'UI: try again' },
  { filename: 'ui/celebrate.mp3', text: 'מצוין! סיימת!', description: 'UI: celebration' },
  { filename: 'ui/tap.mp3', text: 'היי!', description: 'UI: tap feedback' },
];

const NARRATION_AUDIO: AudioEntry[] = [
  { filename: 'narration/welcome.mp3', text: 'שלום מעיין! בואי נלמד אותיות!', description: 'Welcome Maayan' },
  { filename: 'narration/tap-the-letter.mp3', text: 'לחצי על האות הנכונה!', description: 'Tap the right letter' },
  { filename: 'narration/listen-and-choose.mp3', text: 'הקשיבי ובחרי!', description: 'Listen and choose' },
  { filename: 'narration/match-pairs.mp3', text: 'מצאי את הזוגות!', description: 'Find the pairs' },
  { filename: 'narration/first-vowel.mp3', text: 'היום נלמד את התנועה הראשונה! קמץ אומר אה!', description: 'First vowel intro' },
  { filename: 'narration/great-job.mp3', text: 'עשית עבודה מצוינת!', description: 'Great job' },
  { filename: 'narration/level-complete.mp3', text: 'כל הכבוד! סיימת את השלב!', description: 'Level complete' },
  // Level 3 instruction audio
  { filename: 'narration/find-with-kamatz.mp3', text: 'מצאו את האות עם הקמץ!', description: 'Instruction: find with kamatz' },
  { filename: 'narration/listen-choose-syllable.mp3', text: 'הקשיבו ולחצו על הצירוף הנכון!', description: 'Instruction: listen choose syllable' },
  { filename: 'narration/hear-find-letter.mp3', text: 'שמעו את הצליל ומצאו את האות!', description: 'Instruction: hear and find letter' },
  { filename: 'narration/build-words.mp3', text: 'שמעו ומצאו את הצירופים!', description: 'Instruction: build words' },
  { filename: 'narration/match-syllable-pairs.mp3', text: 'התאימו כל צירוף לצליל שלו!', description: 'Instruction: match syllable pairs' },
  // Level 5 instruction audio
  { filename: 'narration/find-with-chirik.mp3', text: 'מצאו את האות עם החיריק!', description: 'Instruction: find with chirik' },
  { filename: 'narration/find-with-segol.mp3', text: 'מצאו את האות עם הסגול!', description: 'Instruction: find with segol' },
  { filename: 'narration/hear-find-word.mp3', text: 'שמעו את המילה ומצאו אותה!', description: 'Instruction: hear and find word' },
];

// Per-letter wrong-answer feedback: "זו האות X, נסה שוב"
const LETTER_FEEDBACK_AUDIO: AudioEntry[] = [
  // Level 1
  { filename: 'feedback/alef-wrong.mp3', text: 'זו האות אלף, נסה שוב', description: 'Feedback: Alef' },
  { filename: 'feedback/shin-wrong.mp3', text: 'זו האות שין, נסה שוב', description: 'Feedback: Shin' },
  { filename: 'feedback/lamed-wrong.mp3', text: 'זו האות לָמד, נסה שוב', description: 'Feedback: Lamed' },
  { filename: 'feedback/mem-wrong.mp3', text: 'זו האות מם, נסה שוב', description: 'Feedback: Mem' },
  { filename: 'feedback/bet-wrong.mp3', text: 'זו האות בֵית, נסה שוב', description: 'Feedback: Bet' },
  // Level 2
  { filename: 'feedback/dalet-wrong.mp3', text: 'זו האות דָלת, נסה שוב', description: 'Feedback: Dalet' },
  { filename: 'feedback/he-wrong.mp3', text: 'זו האות הא, נסה שוב', description: 'Feedback: He' },
  { filename: 'feedback/yod-wrong.mp3', text: 'זו האות יוד, נסה שוב', description: 'Feedback: Yod' },
  { filename: 'feedback/tav-wrong.mp3', text: 'זו האות תו, נסה שוב', description: 'Feedback: Tav' },
  { filename: 'feedback/resh-wrong.mp3', text: 'זו האות ריש, נסה שוב', description: 'Feedback: Resh' },
  // Level 4
  { filename: 'feedback/chet-wrong.mp3', text: 'זו האות חית, נסה שוב', description: 'Feedback: Chet' },
  { filename: 'feedback/kaf-wrong.mp3', text: 'זו האות כף, נסה שוב', description: 'Feedback: Kaf' },
  { filename: 'feedback/nun-wrong.mp3', text: 'זו האות נון, נסה שוב', description: 'Feedback: Nun' },
  { filename: 'feedback/ayin-wrong.mp3', text: 'זו האות עין, נסה שוב', description: 'Feedback: Ayin' },
  { filename: 'feedback/pe-wrong.mp3', text: 'זו האות פא, נסה שוב', description: 'Feedback: Pe' },
  { filename: 'feedback/gimel-wrong.mp3', text: 'זו האות גימל, נסה שוב', description: 'Feedback: Gimel' },
  { filename: 'feedback/zayin-wrong.mp3', text: 'זו האות זין, נסה שוב', description: 'Feedback: Zayin' },
  { filename: 'feedback/vav-wrong.mp3', text: 'זו האות וו, נסה שוב', description: 'Feedback: Vav' },
  // Level 6
  { filename: 'feedback/tet-wrong.mp3', text: 'זו האות טית, נסה שוב', description: 'Feedback: Tet' },
  { filename: 'feedback/samekh-wrong.mp3', text: 'זו האות סָמך, נסה שוב', description: 'Feedback: Samekh' },
  { filename: 'feedback/kuf-wrong.mp3', text: 'זו האות קוף, נסה שוב', description: 'Feedback: Kuf' },
  { filename: 'feedback/tsadi-wrong.mp3', text: 'זו האות צדי, נסה שוב', description: 'Feedback: Tsadi' },
];

// Per-letter identify prompt: "זַהֵה את האות X."
const LETTER_IDENTIFY_AUDIO: AudioEntry[] = [
  // Level 1
  { filename: 'identify/alef.mp3', text: 'זַהֵה את האות אלף.', description: 'Identify: Alef' },
  { filename: 'identify/shin.mp3', text: 'זַהֵה את האות שין.', description: 'Identify: Shin' },
  { filename: 'identify/lamed.mp3', text: 'זַהֵה את האות לָמד.', description: 'Identify: Lamed' },
  { filename: 'identify/mem.mp3', text: 'זַהֵה את האות מם.', description: 'Identify: Mem' },
  { filename: 'identify/bet.mp3', text: 'זַהֵה את האות בֵית.', description: 'Identify: Bet' },
  // Level 2
  { filename: 'identify/dalet.mp3', text: 'זַהֵה את האות דָלת.', description: 'Identify: Dalet' },
  { filename: 'identify/he.mp3', text: 'זַהֵה את האות הא.', description: 'Identify: He' },
  { filename: 'identify/yod.mp3', text: 'זַהֵה את האות יוד.', description: 'Identify: Yod' },
  { filename: 'identify/tav.mp3', text: 'זַהֵה את האות תו.', description: 'Identify: Tav' },
  { filename: 'identify/resh.mp3', text: 'זַהֵה את האות ריש.', description: 'Identify: Resh' },
  // Level 4
  { filename: 'identify/chet.mp3', text: 'זַהֵה את האות חית.', description: 'Identify: Chet' },
  { filename: 'identify/kaf.mp3', text: 'זַהֵה את האות כף.', description: 'Identify: Kaf' },
  { filename: 'identify/nun.mp3', text: 'זַהֵה את האות נון.', description: 'Identify: Nun' },
  { filename: 'identify/ayin.mp3', text: 'זַהֵה את האות עין.', description: 'Identify: Ayin' },
  { filename: 'identify/pe.mp3', text: 'זַהֵה את האות פא.', description: 'Identify: Pe' },
  { filename: 'identify/gimel.mp3', text: 'זַהֵה את האות גימל.', description: 'Identify: Gimel' },
  { filename: 'identify/zayin.mp3', text: 'זַהֵה את האות זין.', description: 'Identify: Zayin' },
  { filename: 'identify/vav.mp3', text: 'זַהֵה את האות וו.', description: 'Identify: Vav' },
  // Level 6
  { filename: 'identify/tet.mp3', text: 'זַהֵה את האות טית.', description: 'Identify: Tet' },
  { filename: 'identify/samekh.mp3', text: 'זַהֵה את האות סָמך.', description: 'Identify: Samekh' },
  { filename: 'identify/kuf.mp3', text: 'זַהֵה את האות קוף.', description: 'Identify: Kuf' },
  { filename: 'identify/tsadi.mp3', text: 'זַהֵה את האות צדי.', description: 'Identify: Tsadi' },
];

// Per-letter identify prompt (feminine): "זַהִי את האות X."
const LETTER_IDENTIFY_F_AUDIO: AudioEntry[] = [
  // Level 1
  { filename: 'identify-f/alef.mp3', text: 'זַהִי את האות אלף.', description: 'Identify-F: Alef' },
  { filename: 'identify-f/shin.mp3', text: 'זַהִי את האות שין.', description: 'Identify-F: Shin' },
  { filename: 'identify-f/lamed.mp3', text: 'זַהִי את האות לָמד.', description: 'Identify-F: Lamed' },
  { filename: 'identify-f/mem.mp3', text: 'זַהִי את האות מם.', description: 'Identify-F: Mem' },
  { filename: 'identify-f/bet.mp3', text: 'זַהִי את האות בֵית.', description: 'Identify-F: Bet' },
  // Level 2
  { filename: 'identify-f/dalet.mp3', text: 'זַהִי את האות דָלת.', description: 'Identify-F: Dalet' },
  { filename: 'identify-f/he.mp3', text: 'זַהִי את האות הא.', description: 'Identify-F: He' },
  { filename: 'identify-f/yod.mp3', text: 'זַהִי את האות יוד.', description: 'Identify-F: Yod' },
  { filename: 'identify-f/tav.mp3', text: 'זַהִי את האות תו.', description: 'Identify-F: Tav' },
  { filename: 'identify-f/resh.mp3', text: 'זַהִי את האות ריש.', description: 'Identify-F: Resh' },
  // Level 4
  { filename: 'identify-f/chet.mp3', text: 'זַהִי את האות חית.', description: 'Identify-F: Chet' },
  { filename: 'identify-f/kaf.mp3', text: 'זַהִי את האות כף.', description: 'Identify-F: Kaf' },
  { filename: 'identify-f/nun.mp3', text: 'זַהִי את האות נון.', description: 'Identify-F: Nun' },
  { filename: 'identify-f/ayin.mp3', text: 'זַהִי את האות עין.', description: 'Identify-F: Ayin' },
  { filename: 'identify-f/pe.mp3', text: 'זַהִי את האות פא.', description: 'Identify-F: Pe' },
  { filename: 'identify-f/gimel.mp3', text: 'זַהִי את האות גימל.', description: 'Identify-F: Gimel' },
  { filename: 'identify-f/zayin.mp3', text: 'זַהִי את האות זין.', description: 'Identify-F: Zayin' },
  { filename: 'identify-f/vav.mp3', text: 'זַהִי את האות וו.', description: 'Identify-F: Vav' },
  // Level 6
  { filename: 'identify-f/tet.mp3', text: 'זַהִי את האות טית.', description: 'Identify-F: Tet' },
  { filename: 'identify-f/samekh.mp3', text: 'זַהִי את האות סָמך.', description: 'Identify-F: Samekh' },
  { filename: 'identify-f/kuf.mp3', text: 'זַהִי את האות קוף.', description: 'Identify-F: Kuf' },
  { filename: 'identify-f/tsadi.mp3', text: 'זַהִי את האות צדי.', description: 'Identify-F: Tsadi' },
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
    ...LETTER_FEEDBACK_AUDIO,
    ...LETTER_IDENTIFY_AUDIO,
    ...LETTER_IDENTIFY_F_AUDIO,
  ];

  console.log(`\nHebrewByClaude Audio Generator`);
  console.log(`Voice: Arabella (${VOICE_ID})`);
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

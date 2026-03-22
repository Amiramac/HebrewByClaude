'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NikkudMark } from '@/types/hebrew';
import Button from '@/components/ui/Button';
import VowelIntro, { VowelExample } from './VowelIntro';

// ─── Data for each vowel's animated intro ─────────────────────────────────────

const VOWEL_EXAMPLES: Record<string, VowelExample[]> = {
  Kamatz: [
    { letter: 'א', syllable: 'אָ', audio: '/audio/syllables/a.mp3' },
    { letter: 'בּ', syllable: 'בָּ', audio: '/audio/syllables/ba.mp3' },
    { letter: 'מ', syllable: 'מָ', audio: '/audio/syllables/ma.mp3' },
  ],
  Patach: [
    { letter: 'שׁ', syllable: 'שַׁ', audio: '/audio/syllables/sha.mp3' },
    { letter: 'ד', syllable: 'דַ', audio: '/audio/syllables/da.mp3' },
    { letter: 'ר', syllable: 'רַ', audio: '/audio/syllables/ra.mp3' },
  ],
  Chirik: [
    { letter: 'מ', syllable: 'מִ', audio: '/audio/syllables/mi.mp3' },
    { letter: 'בּ', syllable: 'בִּ', audio: '/audio/syllables/bi.mp3' },
    { letter: 'ל', syllable: 'לִ', audio: '/audio/syllables/li.mp3' },
  ],
  Segol: [
    { letter: 'ב', syllable: 'בֶ', audio: '/audio/syllables/be.mp3' },
    { letter: 'מ', syllable: 'מֶ', audio: '/audio/syllables/me.mp3' },
    { letter: 'ר', syllable: 'רֶ', audio: '/audio/syllables/re.mp3' },
  ],
  Tzereh: [
    { letter: 'ל', syllable: 'לֵ', audio: '/audio/syllables/le.mp3' },
    { letter: 'ד', syllable: 'דֵ', audio: '/audio/syllables/de.mp3' },
    { letter: 'ר', syllable: 'רֵ', audio: '/audio/syllables/re.mp3' },
  ],
  Cholam: [
    { letter: 'מ', syllable: 'מוֹ', audio: '/audio/syllables/mo.mp3' },
    { letter: 'בּ', syllable: 'בּוֹ', audio: '/audio/syllables/bo.mp3' },
    { letter: 'ל', syllable: 'לוֹ', audio: '/audio/syllables/lo.mp3' },
  ],
  Kubutz: [
    { letter: 'מ', syllable: 'מֻ', audio: '/audio/syllables/mu.mp3' },
    { letter: 'בּ', syllable: 'בֻּ', audio: '/audio/syllables/bu.mp3' },
    { letter: 'ל', syllable: 'לֻ', audio: '/audio/syllables/lu.mp3' },
  ],
  Shuruk: [
    { letter: 'מ', syllable: 'מוּ', audio: '/audio/syllables/mu.mp3' },
    { letter: 'בּ', syllable: 'בּוּ', audio: '/audio/syllables/bu.mp3' },
    { letter: 'ל', syllable: 'לוּ', audio: '/audio/syllables/lu.mp3' },
  ],
};

// Display sound shown as "= אָ" in the intro label
const VOWEL_DISPLAY_SOUND: Record<string, string> = {
  Kamatz: 'אָ',
  Patach: 'אַ',
  Chirik: 'אִ',
  Segol:  'אֶ',
  Tzereh: 'אֵ',
  Cholam: 'אוֹ',
  Kubutz: 'אֻ',
  Shuruk: 'אוּ',
};

// The big letter shown in the intro phase
const VOWEL_INTRO_LETTER: Record<string, string> = {
  Shuruk: 'ו',   // Shuruk lives on a Vav
};

// ─── Component ────────────────────────────────────────────────────────────────

interface VowelVideoPlayerProps {
  vowel: NikkudMark;
  onContinue: () => void;
}

export default function VowelVideoPlayer({ vowel, onContinue }: VowelVideoPlayerProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play on mount
  useEffect(() => {
    videoRef.current?.play().catch(() => setVideoFailed(true));
  }, []);

  // If no videoSrc, go straight to animation
  if (!vowel.videoSrc || videoFailed) {
    const examples = VOWEL_EXAMPLES[vowel.name] ?? VOWEL_EXAMPLES.Kamatz;
    return (
      <VowelIntro
        shapeName={vowel.name}
        vowelName={vowel.nameHebrew}
        vowelSound={VOWEL_DISPLAY_SOUND[vowel.name] ?? vowel.nameHebrew}
        vowelAudio={vowel.audioFile}
        position={vowel.position}
        introLetter={VOWEL_INTRO_LETTER[vowel.name] ?? 'א'}
        examples={examples}
        onContinue={onContinue}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Video */}
      <video
        ref={videoRef}
        src={vowel.videoSrc}
        className="w-full h-full object-contain"
        playsInline
        onEnded={() => setVideoEnded(true)}
        onError={() => setVideoFailed(true)}
      />

      {/* Vowel name overlay — top center */}
      <motion.div
        className="absolute top-6 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="bg-black/50 rounded-2xl px-6 py-2 text-center">
          <p className="text-white text-2xl font-bold">{vowel.nameHebrew}</p>
          <p className="text-white/70 text-lg">= {VOWEL_DISPLAY_SOUND[vowel.name] ?? vowel.nameHebrew}</p>
        </div>
      </motion.div>

      {/* Skip button — always visible */}
      <button
        onClick={onContinue}
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white
          rounded-full px-4 py-2 text-sm font-medium transition-colors backdrop-blur-sm"
      >
        דלג ◀
      </button>

      {/* Continue button — appears when video ends */}
      <AnimatePresence>
        {videoEnded && (
          <motion.div
            className="absolute bottom-12"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Button onClick={onContinue}>
              {'!התחל ←'}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

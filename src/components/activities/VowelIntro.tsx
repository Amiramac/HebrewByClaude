'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

interface VowelIntroProps {
  videoSrc: string;   // kept for future real-video support
  vowelName: string;  // e.g. 'קָמַץ'
  vowelSound: string; // e.g. 'אָ'
  letter: string;     // first demonstration letter e.g. 'א'
  vowelChar: string;  // the actual unicode vowel char
  onContinue: () => void;
}

// Three example letters shown with kamatz
const EXAMPLES = [
  { letter: 'א', syllable: 'אָ', audio: '/audio/syllables/a.mp3' },
  { letter: 'בּ', syllable: 'בָּ', audio: '/audio/syllables/ba.mp3' },
  { letter: 'מ', syllable: 'מָ', audio: '/audio/syllables/ma.mp3' },
];

function playAudio(src: string) {
  try {
    const audio = new Audio(src);
    audio.play().catch(() => {});
    return audio;
  } catch {
    return null;
  }
}

// SVG drawing of kamatz diacritic: horizontal bar + short vertical stem below center
function KamatzShape({ visible, scale = 1 }: { visible: boolean; scale?: number }) {
  const w = 72 * scale;
  const h = 28 * scale;
  return (
    <AnimatePresence>
      {visible && (
        <motion.svg
          key="kamatz"
          width={w} height={h}
          viewBox="0 0 72 28"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{ overflow: 'visible' }}
        >
          <motion.rect
            x="4" y="4" width="64" height="10" rx="5"
            fill="#E53E3E"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ transformOrigin: 'center' }}
          />
          <motion.rect
            x="31" y="14" width="10" height="12" rx="4"
            fill="#E53E3E"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3, delay: 0.35, ease: 'easeOut' }}
            style={{ transformOrigin: 'top center' }}
          />
        </motion.svg>
      )}
    </AnimatePresence>
  );
}

type Phase = 'letter' | 'vowel' | 'label' | 'examples' | 'done';

export default function VowelIntro({ vowelName, vowelSound, onContinue }: VowelIntroProps) {
  const [phase, setPhase] = useState<Phase>('letter');
  const [exampleIndex, setExampleIndex] = useState(0);
  const [showExampleKamatz, setShowExampleKamatz] = useState(false);
  const started = useRef(false);

  // Main intro sequence
  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // letter appears → kamatz draws in → label fades → transition to examples
    const t1 = setTimeout(() => setPhase('vowel'), 800);
    const t2 = setTimeout(() => {
      playAudio('/audio/vowels/kamatz.mp3');
      setPhase('label');
    }, 1600);
    const t3 = setTimeout(() => {
      setPhase('examples');
      setExampleIndex(0);
      setShowExampleKamatz(false);
    }, 3200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Cycle through examples with audio
  useEffect(() => {
    if (phase !== 'examples') return;

    const ex = EXAMPLES[exampleIndex];
    setShowExampleKamatz(false);

    // letter appears → kamatz draws → play syllable audio → next example
    const t1 = setTimeout(() => setShowExampleKamatz(true), 400);
    const t2 = setTimeout(() => playAudio(ex.audio), 900);
    const t3 = setTimeout(() => {
      if (exampleIndex < EXAMPLES.length - 1) {
        setExampleIndex(i => i + 1);
      } else {
        setPhase('done');
      }
    }, 2200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase, exampleIndex]);

  const currentExample = EXAMPLES[exampleIndex];

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-6 py-8 min-h-[60vh]">

      {/* ── Intro phase: single big א ── */}
      {(phase === 'letter' || phase === 'vowel' || phase === 'label') && (
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="text-[120px] font-bold text-gray-800 leading-none select-none"
            style={{ fontFamily: 'serif' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            א
          </motion.div>

          <KamatzShape visible={phase !== 'letter'} />

          <AnimatePresence>
            {phase === 'label' && (
              <motion.div
                className="text-center mt-2"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-4xl font-bold text-red-500">{vowelName}</p>
                <p className="text-2xl text-gray-500 mt-1">
                  = <span className="text-4xl font-bold text-gray-700">{vowelSound}</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── Examples phase: 3 letters cycling ── */}
      {(phase === 'examples' || phase === 'done') && (
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Section title */}
          <motion.p
            className="text-xl text-gray-500 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            :לדוגמה
          </motion.p>

          {/* All 3 examples shown as a row; active one is highlighted */}
          <div className="flex gap-6 justify-center items-end" dir="rtl">
            {EXAMPLES.map((ex, i) => {
              const isActive = phase === 'examples' && i === exampleIndex;
              const isDone = phase === 'done' || i < exampleIndex;
              return (
                <motion.div
                  key={ex.letter}
                  className={`flex flex-col items-center gap-1 rounded-2xl p-4 transition-all ${
                    isActive ? 'bg-red-50 shadow-lg scale-110' : isDone ? 'opacity-70' : 'opacity-30'
                  }`}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <span
                    className="font-bold text-gray-800 leading-none select-none"
                    style={{ fontFamily: 'serif', fontSize: '72px' }}
                  >
                    {ex.letter}
                  </span>
                  <KamatzShape visible={isDone || (isActive && showExampleKamatz)} scale={0.85} />
                  <AnimatePresence>
                    {(isDone || isActive) && (
                      <motion.span
                        className="text-2xl font-bold text-red-500 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {ex.syllable}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Continue button ── */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 }}
          >
            <Button onClick={onContinue}>{'בואו נתרגל ←'}</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

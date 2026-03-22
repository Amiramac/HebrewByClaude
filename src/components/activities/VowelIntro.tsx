'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

export interface VowelExample {
  letter: string;
  syllable: string;
  audio: string;
}

interface VowelIntroProps {
  shapeName: string;                        // English: 'Kamatz', 'Patach', etc.
  vowelName: string;                        // Hebrew: 'קָמַץ'
  vowelSound: string;                       // Display sound: 'אָ'
  vowelAudio: string;                       // '/audio/vowels/kamatz.mp3'
  position: 'below' | 'above' | 'inside';  // where the mark lives relative to the letter
  introLetter: string;                      // big letter shown in intro phase ('א' or 'ו')
  examples: VowelExample[];                 // 3 example letters
  onContinue: () => void;
}

function playAudio(src: string) {
  try {
    const audio = new Audio(src);
    audio.play().catch(() => {});
    return audio;
  } catch {
    return null;
  }
}

// ─── SVG vowel mark shapes ────────────────────────────────────────────────────

function VowelShape({ shapeName, visible, scale = 1 }: { shapeName: string; visible: boolean; scale?: number }) {
  const color = '#E53E3E';

  if (!visible) return null;

  // Kamatz — horizontal bar + vertical stub below center
  if (shapeName === 'Kamatz') {
    const w = 72 * scale, h = 28 * scale;
    return (
      <motion.svg width={w} height={h} viewBox="0 0 72 28"
        initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }} style={{ overflow: 'visible' }}>
        <motion.rect x="4" y="4" width="64" height="10" rx="5" fill={color}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }} style={{ transformOrigin: 'center' }} />
        <motion.rect x="31" y="14" width="10" height="12" rx="4" fill={color}
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.35, ease: 'easeOut' }} style={{ transformOrigin: 'top center' }} />
      </motion.svg>
    );
  }

  // Patach — horizontal bar only (no stem)
  if (shapeName === 'Patach') {
    const w = 72 * scale, h = 18 * scale;
    return (
      <motion.svg width={w} height={h} viewBox="0 0 72 18"
        initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}>
        <motion.rect x="4" y="4" width="64" height="10" rx="5" fill={color}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }} style={{ transformOrigin: 'center' }} />
      </motion.svg>
    );
  }

  // Chirik — single dot below
  if (shapeName === 'Chirik') {
    const s = 28 * scale;
    return (
      <motion.svg width={s} height={s} viewBox="0 0 28 28">
        <motion.circle cx="14" cy="14" r="9" fill={color}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{ transformOrigin: '14px 14px' }} />
      </motion.svg>
    );
  }

  // Segol — triangle of 3 dots: 2 on bottom, 1 on top center
  if (shapeName === 'Segol') {
    const w = 72 * scale, h = 40 * scale;
    const dots = [
      { cx: 12, cy: 30, delay: 0 },
      { cx: 60, cy: 30, delay: 0.1 },
      { cx: 36, cy: 8,  delay: 0.2 },
    ];
    return (
      <motion.svg width={w} height={h} viewBox="0 0 72 40">
        {dots.map(({ cx, cy, delay }) => (
          <motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="9" fill={color}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay }}
            style={{ transformOrigin: `${cx}px ${cy}px` }} />
        ))}
      </motion.svg>
    );
  }

  // Tzereh — two dots side by side
  if (shapeName === 'Tzereh') {
    const w = 72 * scale, h = 28 * scale;
    return (
      <motion.svg width={w} height={h} viewBox="0 0 72 28">
        {[{ cx: 20, delay: 0 }, { cx: 52, delay: 0.15 }].map(({ cx, delay }) => (
          <motion.circle key={cx} cx={cx} cy="14" r="9" fill={color}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay }}
            style={{ transformOrigin: `${cx}px 14px` }} />
        ))}
      </motion.svg>
    );
  }

  // Cholam — single dot (goes above the letter)
  if (shapeName === 'Cholam') {
    const s = 28 * scale;
    return (
      <motion.svg width={s} height={s} viewBox="0 0 28 28">
        <motion.circle cx="14" cy="14" r="9" fill={color}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{ transformOrigin: '14px 14px' }} />
      </motion.svg>
    );
  }

  // Kubutz — three diagonal dots (bottom-left to top-right)
  if (shapeName === 'Kubutz') {
    const w = 72 * scale, h = 40 * scale;
    const dots = [
      { cx: 16, cy: 32, delay: 0 },
      { cx: 36, cy: 20, delay: 0.1 },
      { cx: 56, cy: 8,  delay: 0.2 },
    ];
    return (
      <motion.svg width={w} height={h} viewBox="0 0 72 40">
        {dots.map(({ cx, cy, delay }) => (
          <motion.circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="8" fill={color}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay }}
            style={{ transformOrigin: `${cx}px ${cy}px` }} />
        ))}
      </motion.svg>
    );
  }

  // Shuruk — single dot (lives inside the ו)
  if (shapeName === 'Shuruk') {
    const s = 28 * scale;
    return (
      <motion.svg width={s} height={s} viewBox="0 0 28 28">
        <motion.circle cx="14" cy="14" r="9" fill={color}
          initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          style={{ transformOrigin: '14px 14px' }} />
      </motion.svg>
    );
  }

  return null;
}

// ─── Main component ───────────────────────────────────────────────────────────

type Phase = 'letter' | 'vowel' | 'label' | 'examples' | 'done';

export default function VowelIntro({
  shapeName,
  vowelName,
  vowelSound,
  vowelAudio,
  position,
  introLetter,
  examples,
  onContinue,
}: VowelIntroProps) {
  const [phase, setPhase] = useState<Phase>('letter');
  const [exampleIndex, setExampleIndex] = useState(0);
  const [showExampleMark, setShowExampleMark] = useState(false);
  const started = useRef(false);

  // Main intro sequence
  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const t1 = setTimeout(() => setPhase('vowel'), 800);
    const t2 = setTimeout(() => {
      playAudio(vowelAudio);
      setPhase('label');
    }, 1600);
    const t3 = setTimeout(() => {
      setPhase('examples');
      setExampleIndex(0);
      setShowExampleMark(false);
    }, 3200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [vowelAudio]);

  // Cycle through examples with audio
  useEffect(() => {
    if (phase !== 'examples') return;

    const ex = examples[exampleIndex];
    setShowExampleMark(false);

    const t1 = setTimeout(() => setShowExampleMark(true), 400);
    const t2 = setTimeout(() => playAudio(ex.audio), 900);
    const t3 = setTimeout(() => {
      if (exampleIndex < examples.length - 1) {
        setExampleIndex(i => i + 1);
      } else {
        setPhase('done');
      }
    }, 2200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [phase, exampleIndex, examples]);

  const currentExample = examples[exampleIndex];
  const markVisible = phase !== 'letter';

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-6 py-8 min-h-[60vh]">

      {/* ── Intro phase: big letter with vowel mark ── */}
      {(phase === 'letter' || phase === 'vowel' || phase === 'label') && (
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Cholam dot goes ABOVE the letter */}
          {position === 'above' && (
            <VowelShape shapeName={shapeName} visible={markVisible} />
          )}

          <motion.div
            className="text-[120px] font-bold text-gray-800 leading-none select-none"
            style={{ fontFamily: 'serif' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            {introLetter}
          </motion.div>

          {/* All other vowels go below (or inside) the letter */}
          {position !== 'above' && (
            <VowelShape shapeName={shapeName} visible={markVisible} />
          )}

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
          <motion.p
            className="text-xl text-gray-500 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            :לדוגמה
          </motion.p>

          <div className="flex gap-6 justify-center items-end" dir="rtl">
            {examples.map((ex, i) => {
              const isActive = phase === 'examples' && i === exampleIndex;
              const isDone = phase === 'done' || i < exampleIndex;
              const showMark = isDone || (isActive && showExampleMark);

              return (
                <motion.div
                  key={ex.letter}
                  className={`flex flex-col items-center gap-1 rounded-2xl p-4 transition-all ${
                    isActive ? 'bg-red-50 shadow-lg scale-110' : isDone ? 'opacity-70' : 'opacity-30'
                  }`}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  {/* Cholam goes above */}
                  {position === 'above' && (
                    <VowelShape shapeName={shapeName} visible={showMark} scale={0.85} />
                  )}

                  <span
                    className="font-bold text-gray-800 leading-none select-none"
                    style={{ fontFamily: 'serif', fontSize: '72px' }}
                  >
                    {ex.letter}
                  </span>

                  {/* All others go below */}
                  {position !== 'above' && (
                    <VowelShape shapeName={shapeName} visible={showMark} scale={0.85} />
                  )}

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

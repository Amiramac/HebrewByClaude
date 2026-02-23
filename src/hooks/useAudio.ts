'use client';

import { useCallback, useRef } from 'react';
import { Howl } from 'howler';

const audioCache = new Map<string, Howl>();

function getOrCreateHowl(src: string): Howl {
  if (audioCache.has(src)) {
    return audioCache.get(src)!;
  }
  const howl = new Howl({ src: [src], preload: true });
  audioCache.set(src, howl);
  return howl;
}

export function useAudio() {
  const currentRef = useRef<Howl | null>(null);

  const play = useCallback((src: string) => {
    if (currentRef.current) {
      currentRef.current.stop();
    }
    try {
      const howl = getOrCreateHowl(src);
      currentRef.current = howl;
      howl.play();
    } catch {
      // Audio not available — fail silently for missing files during development
    }
  }, []);

  const playCorrect = useCallback(() => {
    play('/audio/ui/correct.mp3');
  }, [play]);

  const playEncourage = useCallback(() => {
    play('/audio/ui/encourage.mp3');
  }, [play]);

  const playCelebrate = useCallback(() => {
    play('/audio/ui/celebrate.mp3');
  }, [play]);

  const playTap = useCallback(() => {
    play('/audio/ui/tap.mp3');
  }, [play]);

  /**
   * Play audio and invoke onEnd exactly once when it finishes.
   * Also calls onEnd on load/play errors so the caller never gets stuck.
   */
  const playWithCallback = useCallback((src: string, onEnd: () => void) => {
    if (currentRef.current) {
      currentRef.current.stop();
    }
    try {
      const howl = getOrCreateHowl(src);
      currentRef.current = howl;
      let called = false;
      const done = () => { if (!called) { called = true; onEnd(); } };
      howl.once('end', done);
      howl.once('playerror', done);
      howl.once('loaderror', done);
      howl.play();
    } catch {
      onEnd();
    }
  }, []);

  return { play, playWithCallback, playCorrect, playEncourage, playCelebrate, playTap };
}

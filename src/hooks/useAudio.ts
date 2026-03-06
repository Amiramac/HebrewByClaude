'use client';

import { useCallback, useRef } from 'react';
import { Howl } from 'howler';
import { resolveAudioUrl } from '@/lib/audioUrl';

const audioCache = new Map<string, Howl>();

function getOrCreateHowl(src: string): Howl {
  const url = resolveAudioUrl(src);
  if (audioCache.has(url)) {
    return audioCache.get(url)!;
  }
  const howl = new Howl({ src: [url], preload: true });
  audioCache.set(url, howl);
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

  return { play, playCorrect, playEncourage, playCelebrate, playTap };
}

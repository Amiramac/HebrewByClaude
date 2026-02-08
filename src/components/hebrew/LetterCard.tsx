'use client';

import { motion } from 'framer-motion';
import { useAudio } from '@/hooks/useAudio';

interface LetterCardProps {
  character: string;
  name?: string;
  audioFile?: string;
  selected?: boolean;
  correct?: boolean | null;
  disabled?: boolean;
  onSelect?: (character: string) => void;
}

export default function LetterCard({
  character,
  name,
  audioFile,
  selected = false,
  correct = null,
  disabled = false,
  onSelect,
}: LetterCardProps) {
  const { play, playTap } = useAudio();

  const handleTap = () => {
    if (disabled) return;
    playTap();
    if (audioFile) play(audioFile);
    onSelect?.(character);
  };

  const borderColor =
    correct === true
      ? 'border-success bg-success/10'
      : correct === false
      ? 'border-accent/50 bg-accent/5'
      : selected
      ? 'border-primary bg-primary/10'
      : 'border-gray-200 bg-card-bg';

  return (
    <motion.button
      className={`tap-target no-select rounded-2xl border-3 p-4 shadow-md transition-colors ${borderColor} ${
        disabled ? 'opacity-50' : ''
      }`}
      style={{ minWidth: 80, minHeight: 80 }}
      whileTap={disabled ? {} : { scale: 0.9 }}
      whileHover={disabled ? {} : { scale: 1.05 }}
      onTap={handleTap}
      disabled={disabled}
      layout
    >
      <span className="hebrew-letter text-5xl block">{character}</span>
      {name && (
        <span className="text-sm text-gray-500 mt-1 block">{name}</span>
      )}
    </motion.button>
  );
}

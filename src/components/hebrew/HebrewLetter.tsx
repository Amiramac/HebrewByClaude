'use client';

import { motion } from 'framer-motion';
import { useAudio } from '@/hooks/useAudio';

interface HebrewLetterProps {
  character: string;
  audioFile?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showNikkud?: boolean;
  highlighted?: boolean;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'text-4xl',
  md: 'text-6xl',
  lg: 'text-8xl',
  xl: 'text-[120px]',
};

export default function HebrewLetter({
  character,
  audioFile,
  size = 'lg',
  highlighted = false,
  onClick,
}: HebrewLetterProps) {
  const { play, playTap } = useAudio();

  const handleTap = () => {
    playTap();
    if (audioFile) {
      play(audioFile);
    }
    onClick?.();
  };

  return (
    <motion.div
      className={`hebrew-letter tap-target no-select inline-flex items-center justify-center rounded-2xl ${sizeClasses[size]} ${
        highlighted
          ? 'bg-primary/10 ring-4 ring-primary shadow-lg'
          : ''
      }`}
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.05 }}
      onTap={handleTap}
      style={{ cursor: 'pointer', padding: '8px 16px' }}
    >
      {character}
    </motion.div>
  );
}

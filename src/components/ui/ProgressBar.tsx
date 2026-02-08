'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
}

export default function ProgressBar({ progress, color }: ProgressBarProps) {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden" dir="ltr">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color || 'var(--primary)' }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(progress * 100, 100)}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

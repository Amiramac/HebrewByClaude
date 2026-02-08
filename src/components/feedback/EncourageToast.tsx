'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface EncourageToastProps {
  show: boolean;
  message?: string;
}

const MESSAGES = [
  '!נסה שוב',
  '!כמעט',
  '!אתה יכול',
  '!עוד פעם',
];

export default function EncourageToast({ show, message }: EncourageToastProps) {
  const displayMessage = message || MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-8 left-1/2 z-40"
          initial={{ x: '-50%', y: 20, opacity: 0 }}
          animate={{ x: '-50%', y: 0, opacity: 1 }}
          exit={{ x: '-50%', y: -20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="bg-primary-light text-white px-8 py-4 rounded-2xl shadow-lg text-2xl font-bold">
            {displayMessage}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import { useAppStore } from '@/store/appStore';

export default function WelcomeScreen() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { setChildName, setHasSeenWelcome, resetTimerForToday } = useAppStore();

  const handleStart = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setLoading(true);

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `שלום ${trimmed}, בהצלחה!` }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const sound = new Howl({ src: [url], format: ['mp3'] });
        sound.play();
        sound.once('end', () => URL.revokeObjectURL(url));
      }
    } catch {
      // Fail silently — don't block the child from entering the app
    }

    setChildName(trimmed);
    resetTimerForToday();
    setHasSeenWelcome(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 px-6"
      style={{ background: 'linear-gradient(135deg, #FFF9C4 0%, #FFE0B2 50%, #F8BBD0 100%)' }}>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-8xl mb-4">✨</div>
        <h1 className="text-5xl font-bold text-purple-700 mb-3">!שלום</h1>
        <p className="text-2xl text-orange-600 font-semibold">?מה שמך</p>
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-6 w-full max-w-xs"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          placeholder="שם הילד/ה"
          dir="rtl"
          autoFocus
          className="w-full text-center text-3xl font-bold rounded-3xl px-6 py-4
            border-4 border-purple-300 bg-white shadow-lg outline-none
            focus:border-purple-500 transition-colors placeholder:text-gray-300"
        />

        <motion.button
          onClick={handleStart}
          disabled={!name.trim() || loading}
          className="w-full py-5 rounded-3xl text-2xl font-bold text-white shadow-xl
            disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          style={{ background: 'linear-gradient(135deg, #9C27B0, #E91E63)' }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
        >
          {loading ? '...' : '!בואו נלמד 🚀'}
        </motion.button>
      </motion.div>

      <motion.div
        className="flex gap-4 text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {'🌟⭐🌟'.split('').map((c, i) => (
          <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.4}s` }}>{c}</span>
        ))}
      </motion.div>
    </div>
  );
}

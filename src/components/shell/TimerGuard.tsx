'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ParentDashboard from './ParentDashboard';

export default function TimerGuard() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 px-6"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>

      <motion.div
        className="text-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <div className="text-9xl mb-6">🌙</div>
        <h1 className="text-4xl font-bold text-white mb-4">!הזמן נגמר</h1>
        <p className="text-2xl text-blue-300">!להתראות מחר</p>
      </motion.div>

      <motion.div
        className="flex gap-3 text-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {'⭐🌟⭐'.split('').map((c, i) => (
          <span key={i} className="animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{c}</span>
        ))}
      </motion.div>

      <motion.button
        onClick={() => setShowDashboard(true)}
        className="text-blue-400 text-sm underline opacity-60 hover:opacity-100 transition-opacity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
      >
        כניסת הורים
      </motion.button>

      {showDashboard && <ParentDashboard onClose={() => setShowDashboard(false)} />}
    </div>
  );
}

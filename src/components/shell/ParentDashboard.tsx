'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, Difficulty } from '@/store/appStore';
import { useProgressStore } from '@/store/progressStore';
import { LEVELS } from '@/data/levels';

interface ParentDashboardProps {
  onClose: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function ParentDashboard({ onClose }: ParentDashboardProps) {
  const [phase, setPhase] = useState<'password' | 'dashboard'>('password');
  const [pin, setPin] = useState('');
  const [pinError, setPin_error] = useState(false);

  const {
    childName, setChildName, parentPassword, setParentPassword,
    timerMinutes, setTimerMinutes,
    timerRemainingSeconds, resetTimer, unlockTimer,
    difficulty, setDifficulty,
    disabledLevels, toggleLevel,
    wordsToReinforce, clearWordsToReinforce,
    todayStudySeconds,
  } = useAppStore();

  const { resetProgress } = useProgressStore();

  // Password gate
  const handlePinSubmit = () => {
    if (pin === parentPassword) {
      setPhase('dashboard');
      setPin('');
    } else {
      setPin_error(true);
      setPin('');
      setTimeout(() => setPin_error(false), 600);
    }
  };

  // Change password state
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [pwMsg, setPwMsg] = useState('');

  const handleChangePw = () => {
    if (oldPw !== parentPassword) { setPwMsg('סיסמא שגויה'); return; }
    if (newPw.length < 4) { setPwMsg('לפחות 4 ספרות'); return; }
    setParentPassword(newPw);
    setOldPw(''); setNewPw('');
    setPwMsg('✓ הסיסמא שונתה');
    setTimeout(() => setPwMsg(''), 2000);
  };

  // Child name edit state
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(childName);

  const handleSaveName = () => {
    const trimmed = nameInput.trim();
    if (trimmed) {
      setChildName(trimmed);
    }
    setEditingName(false);
  };

  // Timer edit state
  const [timerInput, setTimerInput] = useState(timerMinutes.toString());

  const handleSaveTimer = () => {
    const mins = parseInt(timerInput);
    if (!isNaN(mins) && mins >= 1 && mins <= 120) {
      setTimerMinutes(mins);
    }
  };

  const handleUnlockAndReset = () => {
    unlockTimer();
    resetTimer();
    onClose();
  };

  const handleResetAll = () => {
    if (confirm('לאפס את כל ההתקדמות?')) {
      resetProgress();
      clearWordsToReinforce();
    }
  };

  const difficultyOptions: { value: Difficulty; label: string; desc: string }[] = [
    { value: 'easy', label: 'קל 🌱', desc: 'הקראה מיידית' },
    { value: 'medium', label: 'בינוני 🌟', desc: 'הקראה אחרי טעות' },
    { value: 'hard', label: 'קשה 💪', desc: 'ויזואלי בלבד' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" dir="rtl">
      <motion.div
        className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            {phase === 'password' ? '🔐 כניסת הורים' : '⚙️ הגדרות הורים'}
          </h2>
          <button onClick={onClose} className="text-3xl text-gray-400 tap-target">✕</button>
        </div>

        <AnimatePresence mode="wait">
          {/* ── PHASE 1: Password ── */}
          {phase === 'password' && (
            <motion.div
              key="pw"
              className="p-6 flex flex-col items-center gap-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <p className="text-gray-500 text-lg">הזינו את הסיסמא להמשך</p>
              <motion.input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                placeholder="סיסמא"
                dir="ltr"
                autoFocus
                className="text-center text-2xl font-bold w-40 border-4 border-gray-200 rounded-2xl px-4 py-3 outline-none focus:border-purple-400"
                animate={pinError ? { x: [-8, 8, -8, 8, 0] } : {}}
                transition={{ duration: 0.3 }}
              />
              <button
                onClick={handlePinSubmit}
                className="bg-purple-500 text-white text-xl font-bold rounded-2xl px-8 py-3 w-full"
              >
                כניסה
              </button>
            </motion.div>
          )}

          {/* ── PHASE 2: Dashboard ── */}
          {phase === 'dashboard' && (
            <motion.div
              key="dash"
              className="p-6 flex flex-col gap-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              {/* Child info */}
              <Section title="👧 הילד/ה">
                {editingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      autoFocus
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveName();
                        if (e.key === 'Escape') setEditingName(false);
                      }}
                      className="text-xl font-bold text-purple-700 border-2 border-purple-300 rounded-xl px-3 py-1 w-full outline-none focus:border-purple-500"
                    />
                    <button onClick={handleSaveName}
                      className="bg-purple-500 text-white rounded-xl px-3 py-1 text-sm font-bold shrink-0">
                      שמור
                    </button>
                    <button onClick={() => setEditingName(false)}
                      className="text-gray-400 text-xl shrink-0">✕</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <p className="text-xl font-bold text-purple-700">{childName}</p>
                    <button
                      onClick={() => { setNameInput(childName); setEditingName(true); }}
                      className="text-sm text-gray-400 underline"
                    >
                      ✏️ שנה שם
                    </button>
                  </div>
                )}
              </Section>

              {/* Timer */}
              <Section title="⏱️ מגבלת זמן">
                <div className="flex items-center gap-3 mb-2">
                  <label className="text-gray-600">דקות:</label>
                  <input
                    type="number" min={1} max={120}
                    value={timerInput}
                    onChange={(e) => setTimerInput(e.target.value)}
                    dir="ltr"
                    className="w-20 text-center text-xl border-2 border-gray-200 rounded-xl px-2 py-1"
                  />
                  <button onClick={handleSaveTimer}
                    className="bg-blue-500 text-white rounded-xl px-3 py-1 text-sm font-bold">
                    שמור
                  </button>
                </div>
                <p className="text-sm text-gray-500">
                  זמן שנותר: <span className="font-bold text-blue-600">{formatTime(timerRemainingSeconds)}</span>
                </p>
                <button onClick={handleUnlockAndReset}
                  className="mt-2 text-sm text-orange-500 underline">
                  אפס טיימר והמשך
                </button>
              </Section>

              {/* Difficulty */}
              <Section title="🎯 רמת קושי">
                <div className="flex flex-col gap-2">
                  {difficultyOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setDifficulty(opt.value)}
                      className={`flex justify-between items-center rounded-2xl px-4 py-3 border-2 transition-colors ${
                        difficulty === opt.value
                          ? 'border-purple-400 bg-purple-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <span className="font-bold text-lg">{opt.label}</span>
                      <span className="text-sm text-gray-500">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </Section>

              {/* Chapters */}
              <Section title="📚 פרקים פעילים">
                <div className="flex flex-col gap-2">
                  {LEVELS.map((level) => (
                    <label key={level.id} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!disabledLevels.includes(level.id)}
                        onChange={() => toggleLevel(level.id)}
                        className="w-5 h-5 accent-purple-500"
                      />
                      <span className="text-lg">{level.icon} {level.titleHebrew}</span>
                    </label>
                  ))}
                </div>
              </Section>

              {/* Change password */}
              <Section title="🔑 שינוי סיסמא">
                <div className="flex flex-col gap-2">
                  <input type="password" value={oldPw} onChange={(e) => setOldPw(e.target.value)}
                    placeholder="סיסמא נוכחית" dir="ltr"
                    className="border-2 border-gray-200 rounded-xl px-3 py-2 text-center" />
                  <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)}
                    placeholder="סיסמא חדשה" dir="ltr"
                    className="border-2 border-gray-200 rounded-xl px-3 py-2 text-center" />
                  <button onClick={handleChangePw}
                    className="bg-gray-700 text-white rounded-xl px-4 py-2 font-bold">
                    שנה סיסמא
                  </button>
                  {pwMsg && <p className="text-center text-sm text-green-600">{pwMsg}</p>}
                </div>
              </Section>

              {/* Progress report */}
              <Section title="📊 דוח התקדמות">
                <p className="text-gray-600 mb-2">
                  זמן לימוד היום: <span className="font-bold text-blue-600">{formatTime(todayStudySeconds)}</span>
                </p>
                <p className="font-bold text-gray-700 mb-2">
                  מילים לחיזוק ({wordsToReinforce.length}):
                </p>
                {wordsToReinforce.length === 0 ? (
                  <p className="text-gray-400 text-sm">אין מילים לחיזוק 🎉</p>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {wordsToReinforce.map((word, i) => (
                        <span key={i}
                          className="bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-lg font-bold hebrew-letter">
                          {word}
                        </span>
                      ))}
                    </div>
                    <button onClick={clearWordsToReinforce}
                      className="text-sm text-red-400 underline">
                      נקה רשימה
                    </button>
                  </>
                )}
              </Section>

              {/* Reset all */}
              <div className="border-t border-gray-100 pt-4">
                <button onClick={handleResetAll}
                  className="w-full bg-red-50 text-red-500 border-2 border-red-200 rounded-2xl py-3 font-bold">
                  🗑️ אפס את כל ההתקדמות
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <h3 className="font-bold text-gray-700 mb-3 text-lg">{title}</h3>
      {children}
    </div>
  );
}

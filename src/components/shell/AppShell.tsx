'use client';

import { useEffect, useState } from 'react';
import { useAppStore } from '@/store/appStore';
import WelcomeScreen from './WelcomeScreen';
import TimerGuard from './TimerGuard';
import ParentDashboard from './ParentDashboard';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const {
    childName,
    hasSeenWelcome,
    isTimerLocked,
    decrementTimer,
    incrementStudyTime,
    resetTimerForToday,
  } = useAppStore();

  const [showDashboard, setShowDashboard] = useState(false);

  // Reset timer on new day (runs once on mount)
  useEffect(() => {
    resetTimerForToday();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 1-second interval: tick down timer and log study time
  useEffect(() => {
    if (!hasSeenWelcome || !childName || isTimerLocked) return;

    const interval = setInterval(() => {
      decrementTimer();
      incrementStudyTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [hasSeenWelcome, childName, isTimerLocked, decrementTimer, incrementStudyTime]);

  // Show welcome screen on first visit or if name was cleared
  if (!hasSeenWelcome || !childName) {
    return <WelcomeScreen />;
  }

  // Show timer lock screen
  if (isTimerLocked) {
    return <TimerGuard />;
  }

  return (
    <>
      {children}

      {/* Fixed parent lock button */}
      <button
        onClick={() => setShowDashboard(true)}
        className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-white/80 shadow-lg
          flex items-center justify-center text-xl opacity-40 hover:opacity-100
          transition-opacity tap-target"
        aria-label="Parent Dashboard"
      >
        🔒
      </button>

      {showDashboard && <ParentDashboard onClose={() => setShowDashboard(false)} />}
    </>
  );
}

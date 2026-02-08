'use client';

import { useState, useCallback } from 'react';
import { Activity } from '@/types/levels';

interface ActivityState {
  currentItemIndex: number;
  correctCount: number;
  attempts: number;
  isComplete: boolean;
  stars: number;
  lastAnswerCorrect: boolean | null;
}

export function useActivity(activity: Activity) {
  const [state, setState] = useState<ActivityState>({
    currentItemIndex: 0,
    correctCount: 0,
    attempts: 0,
    isComplete: false,
    stars: 0,
    lastAnswerCorrect: null,
  });

  const currentItem = activity.items[state.currentItemIndex] || null;
  const totalItems = activity.items.length;
  const progress = totalItems > 0 ? state.currentItemIndex / totalItems : 0;

  const submitAnswer = useCallback((answer: string) => {
    const item = activity.items[state.currentItemIndex];
    if (!item || state.isComplete) return;

    const isCorrect = answer === item.correct;
    const newCorrectCount = isCorrect ? state.correctCount + 1 : state.correctCount;
    const newAttempts = state.attempts + 1;
    const isLastItem = state.currentItemIndex >= activity.items.length - 1;

    if (isCorrect && isLastItem) {
      // Calculate stars: 3 for perfect, 2 for >70%, 1 for completion
      const accuracy = newCorrectCount / activity.items.length;
      const stars = accuracy >= 1 ? 3 : accuracy >= 0.7 ? 2 : 1;

      setState({
        ...state,
        correctCount: newCorrectCount,
        attempts: newAttempts,
        isComplete: true,
        stars: Math.min(stars, activity.maxStars),
        lastAnswerCorrect: true,
      });
    } else if (isCorrect) {
      setState({
        ...state,
        currentItemIndex: state.currentItemIndex + 1,
        correctCount: newCorrectCount,
        attempts: newAttempts,
        lastAnswerCorrect: true,
      });
    } else {
      setState({
        ...state,
        attempts: newAttempts,
        lastAnswerCorrect: false,
      });
    }
  }, [activity, state]);

  const reset = useCallback(() => {
    setState({
      currentItemIndex: 0,
      correctCount: 0,
      attempts: 0,
      isComplete: false,
      stars: 0,
      lastAnswerCorrect: null,
    });
  }, []);

  return {
    ...state,
    currentItem,
    totalItems,
    progress,
    submitAnswer,
    reset,
  };
}

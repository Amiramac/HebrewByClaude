'use client';

import { useState, useCallback, useRef } from 'react';
import { Activity } from '@/types/levels';

interface ActivityState {
  currentItemIndex: number;
  correctCount: number;
  attempts: number;
  isComplete: boolean;
  stars: number;
  lastAnswerCorrect: boolean | null;
  lastAnswer: string | null;
  feedbackKey: number;
}

export function useActivity(activity: Activity) {
  const [state, setState] = useState<ActivityState>({
    currentItemIndex: 0,
    correctCount: 0,
    attempts: 0,
    isComplete: false,
    stars: 0,
    lastAnswerCorrect: null,
    lastAnswer: null,
    feedbackKey: 0,
  });

  // Ref avoids stale closure in submitAnswer
  const stateRef = useRef(state);
  stateRef.current = state;

  const currentItem = activity.items[state.currentItemIndex] || null;
  const totalItems = activity.items.length;
  const progress = totalItems > 0 ? state.currentItemIndex / totalItems : 0;

  const submitAnswer = useCallback((answer: string) => {
    const s = stateRef.current;
    const item = activity.items[s.currentItemIndex];
    if (!item || s.isComplete) return;

    const isCorrect = answer === item.correct;
    const newCorrectCount = isCorrect ? s.correctCount + 1 : s.correctCount;
    const newAttempts = s.attempts + 1;
    const newFeedbackKey = s.feedbackKey + 1;
    const isLastItem = s.currentItemIndex >= activity.items.length - 1;

    if (isCorrect && isLastItem) {
      const accuracy = newCorrectCount / activity.items.length;
      const stars = accuracy >= 1 ? 3 : accuracy >= 0.7 ? 2 : 1;

      setState({
        currentItemIndex: s.currentItemIndex,
        correctCount: newCorrectCount,
        attempts: newAttempts,
        isComplete: true,
        stars: Math.min(stars, activity.maxStars),
        lastAnswerCorrect: true,
        lastAnswer: answer,
        feedbackKey: newFeedbackKey,
      });
    } else if (isCorrect) {
      setState({
        currentItemIndex: s.currentItemIndex + 1,
        correctCount: newCorrectCount,
        attempts: newAttempts,
        isComplete: false,
        stars: 0,
        lastAnswerCorrect: true,
        lastAnswer: answer,
        feedbackKey: newFeedbackKey,
      });
    } else {
      setState({
        ...s,
        attempts: newAttempts,
        lastAnswerCorrect: false,
        lastAnswer: answer,
        feedbackKey: newFeedbackKey,
      });
    }
  }, [activity]);

  const reset = useCallback(() => {
    setState({
      currentItemIndex: 0,
      correctCount: 0,
      attempts: 0,
      isComplete: false,
      stars: 0,
      lastAnswerCorrect: null,
      lastAnswer: null,
      feedbackKey: 0,
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

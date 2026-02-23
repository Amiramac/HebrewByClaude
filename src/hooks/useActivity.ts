'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Activity } from '@/types/levels';

const SLOW_ANSWER_THRESHOLD_MS = 7000;

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

export function useActivity(activity: Activity, onReinforceWord?: (word: string) => void) {
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

  const onReinforceWordRef = useRef(onReinforceWord);
  onReinforceWordRef.current = onReinforceWord;

  const currentItem = activity.items[state.currentItemIndex] || null;
  const totalItems = activity.items.length;
  const progress = totalItems > 0 ? state.currentItemIndex / totalItems : 0;

  // 7-second slow-answer timer: resets on each new item and on any answer (feedbackKey change)
  useEffect(() => {
    if (!currentItem || state.isComplete) return;

    const timer = setTimeout(() => {
      onReinforceWordRef.current?.(currentItem.prompt);
    }, SLOW_ANSWER_THRESHOLD_MS);

    return () => clearTimeout(timer);
  }, [currentItem?.id, state.feedbackKey, state.isComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  const submitAnswer = useCallback((answer: string) => {
    const s = stateRef.current;
    const item = activity.items[s.currentItemIndex];
    if (!item || s.isComplete) return;

    const isCorrect = answer === item.correct;
    const newCorrectCount = isCorrect ? s.correctCount + 1 : s.correctCount;
    const newAttempts = s.attempts + 1;
    const newFeedbackKey = s.feedbackKey + 1;
    const isLastItem = s.currentItemIndex >= activity.items.length - 1;

    // Track wrong answers for reinforcement
    if (!isCorrect) {
      onReinforceWordRef.current?.(item.prompt);
    }

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

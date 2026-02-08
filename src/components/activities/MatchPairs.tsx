'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity } from '@/types/levels';
import { useAudio } from '@/hooks/useAudio';
import LetterCard from '@/components/hebrew/LetterCard';
import ProgressBar from '@/components/ui/ProgressBar';
import StarBurst from '@/components/feedback/StarBurst';
import { shuffle } from '@/lib/hebrew';

interface MatchPairsProps {
  activity: Activity;
  onComplete: (stars: number) => void;
}

interface CardState {
  id: string;
  character: string;
  pairId: string;
  flipped: boolean;
  matched: boolean;
}

export default function MatchPairs({ activity, onComplete }: MatchPairsProps) {
  const { playCorrect, playEncourage, playTap, playCelebrate } = useAudio();

  const cards = useMemo(() => {
    const pairs: CardState[] = [];
    activity.items.forEach((item) => {
      pairs.push(
        { id: `${item.id}-a`, character: item.prompt, pairId: item.id, flipped: false, matched: false },
        { id: `${item.id}-b`, character: item.correct, pairId: item.id, flipped: false, matched: false }
      );
    });
    return shuffle(pairs);
  }, [activity.items]);

  const [cardStates, setCardStates] = useState<CardState[]>(cards);
  const [selected, setSelected] = useState<string | null>(null);
  const [matchCount, setMatchCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showStars, setShowStars] = useState(false);

  const totalPairs = activity.items.length;
  const isComplete = matchCount >= totalPairs;

  useEffect(() => {
    if (isComplete) {
      playCelebrate();
      setTimeout(() => setShowStars(true), 500);
    }
  }, [isComplete, playCelebrate]);

  const handleSelect = (cardId: string) => {
    const card = cardStates.find(c => c.id === cardId);
    if (!card || card.matched || card.flipped) return;

    playTap();

    if (!selected) {
      setSelected(cardId);
      setCardStates(prev =>
        prev.map(c => c.id === cardId ? { ...c, flipped: true } : c)
      );
    } else {
      const firstCard = cardStates.find(c => c.id === selected);
      if (!firstCard) return;

      setAttempts(a => a + 1);
      setCardStates(prev =>
        prev.map(c => c.id === cardId ? { ...c, flipped: true } : c)
      );

      if (firstCard.pairId === card.pairId) {
        playCorrect();
        setMatchCount(m => m + 1);
        setCardStates(prev =>
          prev.map(c =>
            c.pairId === card.pairId ? { ...c, matched: true, flipped: true } : c
          )
        );
        setSelected(null);
      } else {
        playEncourage();
        setTimeout(() => {
          setCardStates(prev =>
            prev.map(c =>
              c.id === cardId || c.id === selected
                ? { ...c, flipped: false }
                : c
            )
          );
          setSelected(null);
        }, 800);
      }
    }
  };

  const stars = isComplete
    ? attempts <= totalPairs ? 3 : attempts <= totalPairs * 2 ? 2 : 1
    : 0;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4">
      <ProgressBar progress={matchCount / totalPairs} />

      <p className="text-xl text-gray-600">{activity.instruction}</p>

      <div className="grid grid-cols-3 gap-3 w-full">
        {cardStates.map((card) => (
          <motion.div key={card.id} layout>
            {card.flipped || card.matched ? (
              <LetterCard
                character={card.character}
                selected={card.id === selected}
                correct={card.matched ? true : null}
                onSelect={() => handleSelect(card.id)}
                disabled={card.matched}
              />
            ) : (
              <motion.button
                className="tap-target w-full rounded-2xl border-3 border-primary/30 bg-primary/10 p-4 shadow-md"
                style={{ minHeight: 80 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(card.id)}
              >
                <span className="text-3xl">?</span>
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      <StarBurst
        stars={stars}
        show={showStars}
        onComplete={() => onComplete(stars)}
      />
    </div>
  );
}

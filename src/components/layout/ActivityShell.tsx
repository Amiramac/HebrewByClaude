'use client';

import { Activity } from '@/types/levels';
import TapTheLetter from '@/components/activities/TapTheLetter';
import MatchPairs from '@/components/activities/MatchPairs';
import ListenAndChoose from '@/components/activities/ListenAndChoose';

interface ActivityShellProps {
  activity: Activity;
  onComplete: (stars: number) => void;
}

export default function ActivityShell({ activity, onComplete }: ActivityShellProps) {
  switch (activity.type) {
    case 'tap-the-letter':
    case 'find-the-letter':
      return <TapTheLetter activity={activity} onComplete={onComplete} />;
    case 'match-pairs':
      return <MatchPairs activity={activity} onComplete={onComplete} />;
    case 'listen-and-choose':
      return <ListenAndChoose activity={activity} onComplete={onComplete} />;
    case 'build-syllable':
      // For MVP, build-syllable uses the same UI as listen-and-choose
      return <ListenAndChoose activity={activity} onComplete={onComplete} />;
    default:
      return (
        <div className="text-center p-8">
          <p className="text-xl text-gray-500">
            !בקרוב
          </p>
        </div>
      );
  }
}

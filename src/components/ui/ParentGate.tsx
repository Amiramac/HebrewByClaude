'use client';

import { useState } from 'react';
import Button from './Button';

interface ParentGateProps {
  onPass: () => void;
  onCancel: () => void;
}

export default function ParentGate({ onPass, onCancel }: ParentGateProps) {
  const [answer, setAnswer] = useState('');
  const [a] = useState(() => Math.floor(Math.random() * 10) + 5);
  const [b] = useState(() => Math.floor(Math.random() * 10) + 5);

  const handleSubmit = () => {
    if (parseInt(answer) === a + b) {
      onPass();
    } else {
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center" dir="ltr">
        <h2 className="text-xl font-bold mb-2">אימות הורים</h2>
        <p className="text-gray-600 mb-6">
          :פתרו כדי להמשיך
        </p>
        <p className="text-3xl font-bold mb-4">
          {a} + {b} = ?
        </p>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-24 text-center text-2xl border-2 border-gray-300 rounded-xl p-2 mb-4"
          autoFocus
        />
        <div className="flex gap-3 justify-center mt-4">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            ביטול
          </Button>
          <Button size="sm" onClick={handleSubmit}>
            אישור
          </Button>
        </div>
      </div>
    </div>
  );
}

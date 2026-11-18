import confetti from 'canvas-confetti';
import React, { useEffect } from 'react';

interface RewardBurstProps {
  visible: boolean;
  message?: string;
}

export const RewardBurst: React.FC<RewardBurstProps> = ({ visible, message = 'Great job!' }) => {
  useEffect(() => {
    if (!visible) return;
    try {
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#FFB84D', '#4CC38A', '#5B8DEF', '#EC4899', '#FACC15'],
      });
    } catch {
      // Ignore confetti canvas error in headless tests
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-24 z-40 flex justify-center px-4">
      <div className="animate-kid-pop px-6 py-3 rounded-full bg-amber-400 text-white font-kid font-extrabold text-2xl sm:text-3xl shadow-xl border-4 border-white flex items-center gap-2">
        <span>⭐</span>
        <span>{message}</span>
        <span>⭐</span>
      </div>
    </div>
  );
};

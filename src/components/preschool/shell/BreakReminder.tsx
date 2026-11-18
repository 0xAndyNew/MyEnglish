import React, { useEffect, useState } from 'react';
import { BigButton } from '../ui/BigButton';
import { Mascot } from './Mascot';

interface BreakReminderProps {
  visible: boolean;
  onDone: () => void;
}

export const BreakReminder: React.FC<BreakReminderProps> = ({ visible, onDone }) => {
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    if (!visible) return;
    setSecondsLeft(30);
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#E8F7F0] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-[36px] border-4 border-emerald-200 p-8 shadow-xl space-y-5">
        <div className="flex justify-center">
          <Mascot pose="sleep" size="lg" />
        </div>
        <h2 className="font-kid font-extrabold text-3xl text-slate-800">
          Bé nghỉ mắt một chút nhé! 👀
        </h2>
        <p className="text-sm font-semibold text-slate-600 leading-relaxed">
          Gấu Bo đang ngáp rồi nè! Bé hãy nhìn ra xa cửa sổ, uống ngụm nước hoặc vươn vai cùng bố mẹ trong{' '}
          <strong className="text-emerald-700">{secondsLeft} giây</strong> nhé.
        </p>

        <div className="pt-2">
          <BigButton color="#4CC38A" shadowColor="#2E9E68" size="lg" onClick={onDone}>
            {secondsLeft === 0 ? 'Chơi tiếp thôi! 🌟' : `Tiếp tục (${secondsLeft}s)`}
          </BigButton>
        </div>
      </div>
    </div>
  );
};

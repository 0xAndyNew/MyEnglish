import { Lock, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface ParentGateProps {
  isOpen: boolean;
  onUnlock: () => void;
  onClose: () => void;
}

/**
 * Two-step child-safe gate:
 * 1) Press & hold for 2.5 seconds (toddlers tap and release quickly)
 * 2) Solve a tiny adult arithmetic sum (e.g. 6 + 7 = ?)
 */
export const ParentGate: React.FC<ParentGateProps> = ({ isOpen, onUnlock, onClose }) => {
  const [holdProgress, setHoldProgress] = useState(0);
  const [holdPassed, setHoldPassed] = useState(false);
  const [nums, setNums] = useState<[number, number]>([4, 5]);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setHoldProgress(0);
    setHoldPassed(false);
    setAnswer('');
    setError(false);
    const a = 3 + Math.floor(Math.random() * 6);
    const b = 3 + Math.floor(Math.random() * 6);
    setNums([a, b]);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const startHold = () => {
    if (holdPassed || timerRef.current) return;
    const started = Date.now();
    const duration = 2200;
    timerRef.current = window.setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - started) / duration) * 100));
      setHoldProgress(pct);
      if (pct >= 100) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = null;
        setHoldPassed(true);
      }
    }, 50);
  };

  const stopHold = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (!holdPassed) setHoldProgress(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(answer.trim()) === nums[0] + nums[1]) {
      onUnlock();
    } else {
      setError(true);
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-3xl border-4 border-amber-200 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-extrabold text-base">
            <Lock className="w-5 h-5 text-amber-600" />
            <span>Cổng Phụ Huynh</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500">
          Khu vực này dành cho bố mẹ xem lịch học tuần, đổi lớp hoặc thoát chế độ bé.
        </p>

        {!holdPassed ? (
          <div className="space-y-3 text-center pt-1">
            <button
              type="button"
              onMouseDown={startHold}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={startHold}
              onTouchEnd={stopHold}
              onTouchCancel={stopHold}
              className="relative w-full py-5 rounded-2xl bg-amber-100 hover:bg-amber-200 border-2 border-amber-400 font-bold text-amber-900 overflow-hidden select-none"
            >
              <div
                className="absolute inset-y-0 left-0 bg-amber-400/55 transition-all"
                style={{ width: `${holdProgress}%` }}
              />
              <span className="relative z-10 text-sm">
                Nhấn và giữ 2 giây để tiếp tục ({holdProgress}%)
              </span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="text-xs font-bold text-slate-500 mb-1">Xác nhận người lớn:</div>
              <div className="text-2xl font-black text-slate-800">
                {nums[0]} + {nums[1]} = ?
              </div>
            </div>
            <input
              type="number"
              inputMode="numeric"
              autoFocus
              value={answer}
              onChange={(e) => {
                setError(false);
                setAnswer(e.target.value);
              }}
              placeholder="Nhập kết quả..."
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 outline-none text-center text-lg font-bold"
            />
            {error && <p className="text-xs font-bold text-rose-600 text-center">Chưa đúng, bố mẹ thử lại nhé.</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm"
            >
              Mở Khu Phụ Huynh
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

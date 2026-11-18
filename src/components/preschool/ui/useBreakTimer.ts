import { useEffect, useState } from 'react';

/**
 * Tracks active kid session time and triggers a gentle eye-rest reminder
 * after `limitMinutes` (e.g. 7 / 12 / 15 minutes).
 */
export function useBreakTimer(limitMinutes: number, paused: boolean) {
  const [elapsedSec, setElapsedSec] = useState(0);
  const [breakDue, setBreakDue] = useState(false);

  useEffect(() => {
    if (paused || breakDue) return;
    const id = window.setInterval(() => {
      setElapsedSec((prev) => {
        const next = prev + 1;
        if (next >= limitMinutes * 60) {
          setBreakDue(true);
        }
        return next;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [limitMinutes, paused, breakDue]);

  const dismissBreak = () => {
    setBreakDue(false);
    setElapsedSec(0);
  };

  const triggerBreakNow = () => setBreakDue(true);

  return { elapsedSec, breakDue, dismissBreak, triggerBreakNow };
}

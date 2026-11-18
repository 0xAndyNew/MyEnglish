import React, { useMemo, useState } from 'react';
import type { ScheduleEntry } from '../../../data/preschool/schedule';

interface ScheduleViewProps {
  schedule: ScheduleEntry[];
  totalTerms: number;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ schedule, totalTerms }) => {
  const [activeTerm, setActiveTerm] = useState<number>(1);

  const termSummaries = useMemo(() => {
    return Array.from({ length: totalTerms }, (_, i) => {
      const term = (i + 1) as 1 | 2 | 3;
      const items = schedule.filter((s) => s.term === term && !s.isReviewWeek);
      const done = items.filter((s) => s.status === 'done').length;
      const pct = items.length ? Math.round((done / items.length) * 100) : 0;
      return { term, total: items.length, done, pct };
    });
  }, [schedule, totalTerms]);

  const termEntries = useMemo(
    () => schedule.filter((s) => s.term === activeTerm),
    [schedule, activeTerm]
  );

  const weeks = useMemo(() => {
    const map = new Map<number, ScheduleEntry[]>();
    for (const item of termEntries) {
      const list = map.get(item.week) || [];
      list.push(item);
      map.set(item.week, list);
    }
    return Array.from(map.entries());
  }, [termEntries]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {termSummaries.map((t) => {
          const active = activeTerm === t.term;
          return (
            <button
              key={t.term}
              type="button"
              onClick={() => setActiveTerm(t.term)}
              className={`p-3 rounded-2xl border text-left transition ${
                active
                  ? 'border-amber-500 bg-amber-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
                <span>TERM {t.term}</span>
                <span>
                  {t.done}/{t.total} buổi
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${t.pct}%` }} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {weeks.map(([weekNum, items]) => (
          <div key={weekNum} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-extrabold text-slate-700">
              <span>Tuần {weekNum}</span>
              <span className="text-slate-400">
                {items[0]?.dateStr.slice(5).split('-').reverse().join('/')} –{' '}
                {items[items.length - 1]?.dateStr.slice(5).split('-').reverse().join('/')}
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {items.map((item) => {
                const badge =
                  item.status === 'done'
                    ? '✅ Đã học'
                    : item.status === 'today'
                    ? '🟡 Hôm nay'
                    : item.status === 'overdue'
                    ? '⏰ Học bù'
                    : item.status === 'review_week'
                    ? '🔁 Tuần ôn tập'
                    : '⚪ Sắp tới';

                return (
                  <div
                    key={item.id}
                    className={`px-4 py-2.5 flex items-center justify-between gap-2 text-xs ${
                      item.status === 'today' ? 'bg-amber-50/70' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-bold text-slate-500 w-20 shrink-0">
                        {item.weekdayVi} ({item.dateStr.slice(8)}/{item.dateStr.slice(5, 7)})
                      </span>
                      {item.isReviewWeek ? (
                        <span className="font-bold text-indigo-700">
                          Ôn tập lại các bài hát & truyện Term {item.term}
                        </span>
                      ) : (
                        <span className="font-bold text-slate-800 truncate">
                          {item.unitEmoji} {item.unitTitle} · {item.lesson?.titleVi}
                        </span>
                      )}
                    </div>
                    <span className="shrink-0 font-extrabold text-slate-600">{badge}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

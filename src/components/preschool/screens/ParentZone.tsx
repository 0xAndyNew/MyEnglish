import { ArrowLeft, Calendar, LogOut, Sliders } from 'lucide-react';
import React, { useState } from 'react';
import {
  PRESCHOOL_LEVELS,
  PRESCHOOL_LEVEL_ORDER,
  WEEKDAY_LABELS_VI,
} from '../../../data/preschool/levels';
import type { ScheduleEntry } from '../../../data/preschool/schedule';
import type { PreschoolLevelId, PreschoolProgress, PreschoolUnit } from '../../../data/preschool/types';
import type { LearnerProfile } from '../../../types/audience';
import { ScheduleView } from './ScheduleView';

interface ParentZoneProps {
  profile: LearnerProfile;
  units: PreschoolUnit[];
  schedule: ScheduleEntry[];
  progress: PreschoolProgress;
  isAdmin?: boolean;
  isPreview?: boolean;
  onBackToKid: () => void;
  onSaveProfile: (next: LearnerProfile) => Promise<void> | void;
  onOpenProfileModal: () => void;
  onExitPreview?: () => void;
  onLogout: () => void;
}

const WEEK_OPTIONS = [1, 2, 3, 4, 5, 6, 0];

export const ParentZone: React.FC<ParentZoneProps> = ({
  profile,
  units,
  schedule,
  progress,
  isAdmin = false,
  isPreview = false,
  onBackToKid,
  onSaveProfile,
  onOpenProfileModal,
  onExitPreview,
  onLogout,
}) => {
  const currentLevelId: PreschoolLevelId = profile.preschool?.levelId || 'explorer';
  const levelMeta = PRESCHOOL_LEVELS[currentLevelId];
  const [childName, setChildName] = useState(profile.preschool?.childName || '');
  const [studyDays, setStudyDays] = useState<number[]>(profile.preschool?.studyDays || [2, 4]);
  const [saving, setSaving] = useState(false);
  const [expandedUnitId, setExpandedUnitId] = useState<string>(units[0]?.id || '');

  const updatePreschool = async (patch: Partial<NonNullable<LearnerProfile['preschool']>>) => {
    setSaving(true);
    try {
      await onSaveProfile({
        ...profile,
        preschool: {
          ageBand: profile.preschool?.ageBand || levelMeta.ageBand,
          levelId: profile.preschool?.levelId || currentLevelId,
          childName,
          studyDays,
          startDate: profile.preschool?.startDate || new Date().toISOString().slice(0, 10),
          parentConfirmed: true,
          ...patch,
        },
        updatedAt: new Date().toISOString(),
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleDay = async (d: number) => {
    const next = studyDays.includes(d)
      ? studyDays.filter((x) => x !== d)
      : [...studyDays, d].sort((a, b) => a - b);
    const safeNext = next.length ? next : [d];
    setStudyDays(safeNext);
    await updatePreschool({ studyDays: safeNext });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToKid}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-white font-extrabold text-sm shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về chế độ bé</span>
          </button>

          <div className="text-center">
            <div className="text-sm font-black text-slate-800">
              Khu Phụ Huynh · {levelMeta.emoji} {levelMeta.name} ({levelMeta.ageLabel})
            </div>
            <div className="text-[11px] font-semibold text-slate-500">
              Đã xong {progress.completedLessonIds.length}/{units.length * 4} buổi · {progress.stickers.length} sticker
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isPreview && onExitPreview && (
              <button
                type="button"
                onClick={onExitPreview}
                className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Thoát Preview Admin
              </button>
            )}
            {isAdmin && (
              <button
                type="button"
                onClick={onOpenProfileModal}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Đổi nhóm học</span>
              </button>
            )}
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Settings Card */}
        <section className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-sm">
          <h2 className="text-sm font-black text-slate-800">Cài đặt lớp & lịch học của bé</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PRESCHOOL_LEVEL_ORDER.map((id) => {
              const lv = PRESCHOOL_LEVELS[id];
              const active = id === currentLevelId;
              return (
                <button
                  key={id}
                  type="button"
                  disabled={saving}
                  onClick={() => updatePreschool({ levelId: id, ageBand: lv.ageBand })}
                  className={`p-3 rounded-2xl border-2 text-left transition ${
                    active ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="text-xs font-black text-slate-900">
                    {lv.emoji} {lv.name} ({lv.ageLabel})
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{lv.focusVi}</div>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Tên gọi của bé</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Bin, Bông..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                />
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => updatePreschool({ childName })}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold"
                >
                  Lưu
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                Ngày học trong tuần (hiện {studyDays.length} buổi/tuần)
              </label>
              <div className="grid grid-cols-7 gap-1">
                {WEEK_OPTIONS.map((d) => {
                  const active = studyDays.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDay(d)}
                      className={`py-2 rounded-xl text-xs font-extrabold border transition ${
                        active
                          ? 'bg-emerald-500 text-white border-emerald-500'
                          : 'bg-slate-50 text-slate-600 border-slate-200'
                      }`}
                    >
                      {WEEKDAY_LABELS_VI[d]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Center-style Schedule */}
        <section className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-black text-slate-800">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>Lịch học theo Term – Tuần – Buổi học</span>
          </div>
          <ScheduleView schedule={schedule} totalTerms={levelMeta.terms} />
        </section>

        {/* Syllabus & At-home parent tips */}
        <section className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-sm">
          <h2 className="text-sm font-black text-slate-800">
            Nội dung từng Unit & Gợi ý bố mẹ ôn ở nhà
          </h2>
          <div className="space-y-2">
            {units.map((u) => {
              const open = expandedUnitId === u.id;
              return (
                <div key={u.id} className="rounded-2xl border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpandedUnitId(open ? '' : u.id)}
                    className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left"
                  >
                    <span className="text-xs font-extrabold text-slate-800">
                      {u.emoji} Term {u.term} · Unit {u.order}: {u.title} ({u.titleVi})
                    </span>
                    <span className="text-xs font-bold text-slate-400">{open ? '▲' : '▼'}</span>
                  </button>
                  {open && (
                    <div className="p-4 text-xs space-y-2 bg-white">
                      <div>
                        <strong>Từ vựng:</strong>{' '}
                        {u.words.map((w) => `${w.word} (${w.meaningVi})`).join(', ')}
                      </div>
                      {u.pattern && (
                        <div>
                          <strong>Mẫu câu:</strong> {u.pattern.en} ({u.pattern.vi})
                        </div>
                      )}
                      {u.phonics && u.phonics.letters.length > 0 && (
                        <div>
                          <strong>Phonics:</strong> {u.phonics.letters.join(', ').toUpperCase()}
                          {u.phonics.cvc?.length ? ` · Ghép âm: ${u.phonics.cvc.join(', ')}` : ''}
                        </div>
                      )}
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                        💡 <strong>Ở nhà cùng bé:</strong> {u.parentTipVi}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};

import React, { useState } from 'react';
import { CheckCircle2, RefreshCw, ShieldCheck, Sliders, X } from 'lucide-react';
import { AUDIENCE_TRACKS } from '../config/audienceTracks';
import { PRACTICAL_CATEGORIES } from '../data/practicalCategories';
import {
  AUDIENCE_METADATA,
  AudienceId,
  createDefaultProfile,
  EXAM_METADATA,
  ExamType,
  getAudienceMeta,
  getExamMeta,
  LearnerProfile,
} from '../types/audience';
import { CefrLevel } from '../types/learning';

interface LearnerProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
  profile: LearnerProfile | null;
  onSaveProfile: (nextProfile: LearnerProfile) => Promise<void> | void;
  xp: number;
  savedWordsCount: number;
}

export const LearnerProfilePanel: React.FC<LearnerProfilePanelProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  xp,
  savedWordsCount,
}) => {
  const [draft, setDraft] = useState<LearnerProfile>(() => profile || createDefaultProfile('worker'));
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setDraft(profile || createDefaultProfile('worker'));
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const currentMeta = getAudienceMeta(draft.audience);
  const trackInfo = AUDIENCE_TRACKS[draft.audience];

  const handleSwitchAudience = (aud: AudienceId) => {
    const base = createDefaultProfile(aud);
    setDraft((prev) => ({
      ...base,
      preschool: prev.preschool || base.preschool,
      kids: prev.kids || base.kids,
      teen: prev.teen || base.teen,
      university: prev.university || base.university,
      worker: prev.worker || base.worker,
      exam: prev.exam || base.exam,
      startLevel: aud === 'kids' || aud === 'preschool' ? 'A0' : prev.startLevel,
      dailyMinutes: prev.dailyMinutes,
    }));
  };

  const toggleCategory = (listKey: 'worker' | 'university', cat: string) => {
    setDraft((prev) => {
      if (listKey === 'worker') {
        const cur = prev.worker?.industries || [];
        const next = cur.includes(cat) ? cur.filter((c) => c !== cat) : [...cur, cat];
        return {
          ...prev,
          worker: { ...(prev.worker || { industries: [], goal: 'work' }), industries: next.length ? next : [cat] },
        };
      }
      const cur = prev.university?.majorCategories || [];
      const next = cur.includes(cat) ? cur.filter((c) => c !== cat) : [...cur, cat];
      return {
        ...prev,
        university: {
          ...(prev.university || { year: 2, majorCategories: [], goal: 'graduation' }),
          majorCategories: next.length ? next : [cat],
        },
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSaveProfile({ ...draft, updatedAt: new Date().toISOString() });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Hồ Sơ Đối Tượng & Lộ Trình Học Tập
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Đổi nhóm đối tượng bất cứ lúc nào — bảo toàn 100% dữ liệu học
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Preservation Guarantee Banner */}
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Chuyển nhóm đối tượng sẽ tự động cập nhật lại giao diện & bài học phù hợp, đồng thời{' '}
              <strong>giữ nguyên {xp} XP và {savedWordsCount} từ vựng SRS</strong> của bạn.
            </span>
          </div>

          {/* Audience Switcher */}
          <div>
            <label className="text-xs font-extrabold uppercase text-slate-600 dark:text-slate-300 block mb-2">
              Nhóm đối tượng học tập
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {AUDIENCE_METADATA.map((item) => {
                const selected = draft.audience === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => handleSwitchAudience(item.id)}
                    className={`p-3 rounded-xl border-2 text-left transition flex items-center gap-2.5 ${
                      selected
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40'
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{item.ageRange}</div>
                    </div>
                    {selected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-profile controls */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-extrabold text-slate-800 dark:text-white">
              Tùy chỉnh chi tiết ({currentMeta.emoji} {currentMeta.shortLabel})
            </div>

            {draft.audience === 'preschool' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Tên gọi ở nhà của bé</label>
                  <input
                    type="text"
                    value={draft.preschool?.childName || ''}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        preschool: {
                          ...(p.preschool || {
                            ageBand: '3-4',
                            levelId: 'explorer',
                            studyDays: [2, 4],
                            startDate: new Date().toISOString().slice(0, 10),
                          }),
                          childName: e.target.value,
                        },
                      }))
                    }
                    placeholder="Ví dụ: Bin, Bông..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Độ tuổi & Lớp</label>
                  <select
                    value={draft.preschool?.ageBand || '3-4'}
                    onChange={(e) => {
                      const ageBand = e.target.value as '1-2' | '3-4' | '5-6';
                      const levelId = ageBand === '1-2' ? 'tiny' : ageBand === '5-6' ? 'star' : 'explorer';
                      setDraft((p) => ({
                        ...p,
                        preschool: {
                          ...(p.preschool || {
                            ageBand,
                            levelId,
                            studyDays: [2, 4],
                            startDate: new Date().toISOString().slice(0, 10),
                          }),
                          ageBand,
                          levelId,
                        },
                      }));
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  >
                    <option value="1-2">1–2 tuổi (Tiny Tots)</option>
                    <option value="3-4">3–4 tuổi (Little Explorers)</option>
                    <option value="5-6">5–6 tuổi (Bright Stars)</option>
                  </select>
                </div>
              </div>
            )}

            {draft.audience === 'kids' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Độ tuổi</label>
                  <select
                    value={draft.kids?.ageBand || '6-7'}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        kids: { ...(p.kids || { ageBand: '6-7', goal: 'intro' }), ageBand: e.target.value as '6-7' | '8-10' },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  >
                    <option value="6-7">6–7 tuổi (Lớp 1–2)</option>
                    <option value="8-10">8–10 tuổi (Lớp 3–5)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Mục tiêu</label>
                  <select
                    value={draft.kids?.goal || 'intro'}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        kids: { ...(p.kids || { ageBand: '6-7', goal: 'intro' }), goal: e.target.value as any },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  >
                    <option value="intro">Làm quen vui nhộn</option>
                    <option value="primary">Chương trình Tiểu học</option>
                    <option value="yle">Luyện thi Cambridge YLE</option>
                  </select>
                </div>
                {draft.kids?.goal === 'yle' && (
                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Cấp độ Cambridge YLE</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { id: 'starters', label: '🌱 Starters' },
                          { id: 'movers', label: '🚲 Movers' },
                          { id: 'flyers', label: '🪁 Flyers' },
                        ] as const
                      ).map((lv) => {
                        const active = (draft.kids?.yleLevel || 'starters') === lv.id;
                        return (
                          <button
                            type="button"
                            key={lv.id}
                            onClick={() =>
                              setDraft((p) => ({
                                ...p,
                                kids: { ...(p.kids || { ageBand: '6-7', goal: 'yle' }), yleLevel: lv.id },
                              }))
                            }
                            className={`px-2 py-2 rounded-xl border text-xs font-bold transition ${
                              active
                                ? 'bg-amber-500 text-white border-amber-500'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-300'
                            }`}
                          >
                            {lv.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                <label className="sm:col-span-2 flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draft.kids?.parentConfirmed ?? true}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        kids: { ...(p.kids || { ageBand: '6-7', goal: 'intro' }), parentConfirmed: e.target.checked },
                      }))
                    }
                    className="w-4 h-4 accent-amber-500"
                  />
                  Phụ huynh đã xác nhận và đồng hành cùng bé
                </label>
              </div>
            )}

            {draft.audience === 'teen' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Khối lớp</label>
                  <select
                    value={draft.teen?.grade || 9}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        teen: { ...(p.teen || { grade: 9, goal: 'school' }), grade: Number(e.target.value) as any },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  >
                    {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                      <option key={g} value={g}>
                        Lớp {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1">Mục tiêu</label>
                  <select
                    value={draft.teen?.goal || 'school'}
                    onChange={(e) =>
                      setDraft((p) => ({
                        ...p,
                        teen: { ...(p.teen || { grade: 9, goal: 'school' }), goal: e.target.value as any },
                      }))
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  >
                    <option value="school">Học tốt SGK trên lớp</option>
                    <option value="entrance10">Ôn thi vào lớp 10</option>
                    <option value="thpt">Ôn thi Tốt nghiệp THPT</option>
                    <option value="communication">Giao tiếp học đường</option>
                  </select>
                </div>
              </div>
            )}

            {draft.audience === 'university' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Năm học (1–4)</label>
                    <select
                      value={draft.university?.year || 2}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          university: {
                            ...(p.university || { year: 2, majorCategories: ['IT / Kỹ thuật'], goal: 'graduation', graduationExam: 'vstep' }),
                            year: Number(e.target.value) as 1 | 2 | 3 | 4,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    >
                      {([1, 2, 3, 4] as const).map((yr) => (
                        <option key={yr} value={yr}>
                          Sinh viên Năm {yr}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Mục tiêu chính</label>
                    <select
                      value={draft.university?.goal || 'graduation'}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          university: {
                            ...(p.university || { year: 2, majorCategories: ['IT / Kỹ thuật'], goal: 'graduation', graduationExam: 'vstep' }),
                            goal: e.target.value as 'graduation' | 'academic' | 'communication',
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    >
                      <option value="graduation">Chuẩn đầu ra ĐH</option>
                      <option value="academic">Học thuật & Nghiên cứu</option>
                      <option value="communication">Giao tiếp & Thực tập</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Chứng chỉ chuẩn đầu ra</label>
                    <select
                      value={draft.university?.graduationExam || 'vstep'}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          university: {
                            ...(p.university || { year: 2, majorCategories: ['IT / Kỹ thuật'], goal: 'graduation' }),
                            graduationExam: e.target.value as ExamType,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    >
                      {EXAM_METADATA.map((ex) => (
                        <option key={ex.id} value={ex.id}>
                          {ex.shortLabel} ({ex.defaultScore})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 block">
                    Chuyên ngành / Lĩnh vực ưu tiên
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PRACTICAL_CATEGORIES.map((cat) => {
                      const list = draft.university?.majorCategories || [];
                      const active = list.includes(cat);
                      return (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => toggleCategory('university', cat)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                            active
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {draft.audience === 'worker' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 block mb-1.5">Mục tiêu chính trong công việc</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        { id: 'work', label: '💼 Công việc chung' },
                        { id: 'email', label: '✉️ Email & Chat' },
                        { id: 'interview', label: '🎯 Phỏng vấn' },
                        { id: 'travel', label: '✈️ Du lịch công tác' },
                      ] as const
                    ).map((g) => {
                      const active = (draft.worker?.goal || 'work') === g.id;
                      return (
                        <button
                          type="button"
                          key={g.id}
                          onClick={() =>
                            setDraft((p) => ({
                              ...p,
                              worker: {
                                ...(p.worker || { industries: ['Văn phòng & Email'], goal: 'work' }),
                                goal: g.id,
                              },
                            }))
                          }
                          className={`px-2.5 py-2 rounded-xl border text-xs font-bold transition ${
                            active
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                          }`}
                        >
                          {g.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 block">
                    Ngành nghề / Lĩnh vực ưu tiên
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PRACTICAL_CATEGORIES.map((cat) => {
                      const list = draft.worker?.industries || [];
                      const active = list.includes(cat);
                      return (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => toggleCategory('worker', cat)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                            active
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {draft.audience === 'exam' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Kỳ thi chứng chỉ</label>
                    <select
                      value={draft.exam?.examType || 'ielts'}
                      onChange={(e) => {
                        const nextType = e.target.value as ExamType;
                        const meta = getExamMeta(nextType);
                        setDraft((p) => ({
                          ...p,
                          exam: {
                            ...(p.exam || { examType: nextType, targetScore: meta.defaultScore }),
                            examType: nextType,
                            targetScore: meta.defaultScore,
                            cambridgeLevel: p.exam?.cambridgeLevel || 'pet',
                          },
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    >
                      {EXAM_METADATA.map((ex) => (
                        <option key={ex.id} value={ex.id}>
                          {ex.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Điểm mục tiêu</label>
                    <select
                      value={draft.exam?.targetScore || getExamMeta(draft.exam?.examType || 'ielts').defaultScore}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          exam: { ...(p.exam || { examType: 'ielts', targetScore: '6.5' }), targetScore: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    >
                      {getExamMeta(draft.exam?.examType || 'ielts').scoreOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1">Ngày dự thi dự kiến</label>
                    <input
                      type="date"
                      value={draft.exam?.examDate || ''}
                      onChange={(e) =>
                        setDraft((p) => ({
                          ...p,
                          exam: { ...(p.exam || { examType: 'ielts', targetScore: '6.5' }), examDate: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    />
                  </div>
                </div>

                {draft.exam?.examType === 'cambridge' && (
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 block mb-1.5">Cấp độ Cambridge (KET / PET / FCE)</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { id: 'ket', label: '📘 KET (A2 Key)', score: 'A2 Key (KET)' },
                          { id: 'pet', label: '📗 PET (B1 Prelim)', score: 'B1 Preliminary (PET)' },
                          { id: 'fce', label: '📙 FCE (B2 First)', score: 'B2 First (FCE)' },
                        ] as const
                      ).map((lv) => {
                        const active = (draft.exam?.cambridgeLevel || 'pet') === lv.id;
                        return (
                          <button
                            type="button"
                            key={lv.id}
                            onClick={() =>
                              setDraft((p) => ({
                                ...p,
                                exam: {
                                  ...(p.exam || { examType: 'cambridge', targetScore: lv.score }),
                                  cambridgeLevel: lv.id,
                                  targetScore: lv.score,
                                },
                              }))
                            }
                            className={`px-2.5 py-2 rounded-xl border text-xs font-bold transition ${
                              active
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-400'
                            }`}
                          >
                            {lv.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Trình độ xuất phát</label>
                <select
                  value={draft.startLevel}
                  onChange={(e) => setDraft((p) => ({ ...p, startLevel: e.target.value as CefrLevel }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                >
                  {(['A0', 'A1', 'A2', 'B1', 'B2', 'C1'] as CefrLevel[]).map((lv) => (
                    <option key={lv} value={lv}>
                      Cấp {lv}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">Thời lượng / ngày</label>
                <select
                  value={draft.dailyMinutes}
                  onChange={(e) => setDraft((p) => ({ ...p, dailyMinutes: Number(e.target.value) as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                >
                  {[10, 20, 30, 60].map((m) => (
                    <option key={m} value={m}>
                      {m} phút / ngày
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Preview of Track Steps */}
          <div className="space-y-2">
            <div className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
              Các trang sẽ hiển thị với lộ trình này ({trackInfo.steps.length} bước):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {trackInfo.steps.map((st) => (
                <span
                  key={st.code}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {st.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${saving ? 'animate-spin' : ''}`} />
            {saving ? 'Đang cập nhật...' : 'Áp dụng lộ trình này'}
          </button>
        </div>
      </div>
    </div>
  );
};

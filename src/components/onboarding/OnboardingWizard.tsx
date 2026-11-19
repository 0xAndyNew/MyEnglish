import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Target,
  UserCheck,
} from 'lucide-react';
import { AUDIENCE_TRACKS } from '../../config/audienceTracks';
import { PRACTICAL_CATEGORIES } from '../../data/practicalCategories';
import { evaluatePlacementScore, PLACEMENT_QUIZ } from '../../data/placementQuiz';
import {
  AUDIENCE_METADATA,
  AudienceId,
  createDefaultProfile,
  EXAM_METADATA,
  ExamType,
  getAudienceMeta,
  getExamMeta,
  LearnerProfile,
} from '../../types/audience';
import { CefrLevel } from '../../types/learning';
import { AUDIENCE_IMAGE_MAP } from '../../utils/flashcardMedia';

interface OnboardingWizardProps {
  displayName: string;
  initialAudience?: AudienceId;
  initialProfile?: LearnerProfile | null;
  onComplete: (profile: LearnerProfile) => Promise<void> | void;
  onCancel?: () => void;
}

const LEVEL_OPTIONS: { level: CefrLevel; title: string; desc: string }[] = [
  { level: 'A0', title: 'A0 — Mới bắt đầu (Từ con số 0)', desc: 'Chưa nhớ bảng chữ cái, phát âm hoặc mới biết vài từ đơn lẻ.' },
  { level: 'A1', title: 'A1 — Căn bản', desc: 'Biết chào hỏi, từ vựng quen thuộc, ghép được câu ngắn đơn giản.' },
  { level: 'A2', title: 'A2 — Sơ cấp', desc: 'Đọc hiểu đoạn ngắn, giao tiếp cơ bản hàng ngày và chia các thì chính.' },
  { level: 'B1', title: 'B1 — Trung cấp', desc: 'Tự tin trao đổi công việc/học tập, viết đoạn văn & đọc tin tức.' },
  { level: 'B2', title: 'B2 — Trung cao cấp', desc: 'Thảo luận trôi chảy, viết luận & làm bài thi học thuật / chuyên môn.' },
  { level: 'C1', title: 'C1 — Cao cấp (Học thuật & Chuyên gia)', desc: 'Sử dụng tiếng Anh linh hoạt, chuẩn xác trong nghiên cứu, đàm phán & thi band cao.' },
];

const DAILY_MINUTES_OPTIONS: (10 | 20 | 30 | 60)[] = [10, 20, 30, 60];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  displayName,
  initialAudience,
  initialProfile,
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(() =>
    initialProfile || initialAudience ? 2 : 1
  );
  const [profile, setProfile] = useState<LearnerProfile>(() => {
    if (initialProfile) return initialProfile;
    return createDefaultProfile(initialAudience || 'worker');
  });

  // Placement mini quiz state
  const [useQuickTest, setUseQuickTest] = useState(false);
  const [quizPageIdx, setQuizPageIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const selectAudience = (audience: AudienceId) => {
    const base = createDefaultProfile(audience);
    setProfile((prev) => ({
      ...base,
      preschool: prev.preschool || base.preschool,
      kids: prev.kids || base.kids,
      teen: prev.teen || base.teen,
      university: prev.university || base.university,
      worker: prev.worker || base.worker,
      exam: prev.exam || base.exam,
      startLevel: audience === 'kids' || audience === 'preschool' ? 'A0' : prev.startLevel,
      dailyMinutes: audience === 'kids' || audience === 'preschool' ? 10 : prev.dailyMinutes,
    }));
  };

  const quizCorrectCount = useMemo(() => {
    return PLACEMENT_QUIZ.reduce((acc, q) => (quizAnswers[q.id] === q.correctIndex ? acc + 1 : acc), 0);
  }, [quizAnswers]);

  const handleFinishQuiz = () => {
    const detected = evaluatePlacementScore(quizCorrectCount);
    setProfile((prev) => ({ ...prev, startLevel: detected }));
    setQuizSubmitted(true);
  };

  const trackConfig = AUDIENCE_TRACKS[profile.audience];
  const audienceMeta = getAudienceMeta(profile.audience);

  const canProceedStep2 = (() => {
    if (profile.audience === 'preschool') {
      return Boolean(profile.preschool?.parentConfirmed) && (profile.preschool?.studyDays?.length || 0) >= 1;
    }
    if (profile.audience === 'kids') {
      return Boolean(profile.kids?.parentConfirmed);
    }
    if (profile.audience === 'worker') {
      return (profile.worker?.industries?.length || 0) > 0;
    }
    if (profile.audience === 'university') {
      return (profile.university?.majorCategories?.length || 0) > 0;
    }
    return true;
  })();

  const handleConfirm = async () => {
    setSaving(true);
    try {
      await onComplete({
        ...profile,
        updatedAt: new Date().toISOString(),
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleCategory = (listKey: 'worker' | 'university', cat: string) => {
    setProfile((prev) => {
      if (listKey === 'worker') {
        const cur = prev.worker?.industries || [];
        const exists = cur.includes(cat);
        const next = exists ? cur.filter((c) => c !== cat) : [...cur, cat];
        return {
          ...prev,
          worker: { ...(prev.worker || { industries: [], goal: 'work' }), industries: next },
        };
      }
      const cur = prev.university?.majorCategories || [];
      const exists = cur.includes(cat);
      const next = exists ? cur.filter((c) => c !== cat) : [...cur, cat];
      return {
        ...prev,
        university: {
          ...(prev.university || { year: 2, majorCategories: [], goal: 'graduation' }),
          majorCategories: next,
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 py-6 px-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Top Progress Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Cá nhân hóa lộ trình học • Bước {step}/4
            </span>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
              Xin chào {displayName}! Hãy chọn hồ sơ học tập của bạn
            </h1>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step
                    ? 'w-8 bg-indigo-600'
                    : s < step
                    ? 'w-4 bg-emerald-500'
                    : 'w-4 bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* STEP 1: Audience Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  1. Bạn thuộc nhóm đối tượng học tập nào?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Hệ thống sẽ tự động thiết lập giáo trình, phương pháp giảng giải và <strong>chỉ hiển thị các trang phù hợp</strong> với lựa chọn của bạn.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AUDIENCE_METADATA.map((item) => {
                  const selected = profile.audience === item.id;
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => selectAudience(item.id)}
                      className={`text-left p-4 rounded-2xl border-2 transition flex items-start gap-3 ${
                        selected
                          ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <img
                        src={AUDIENCE_IMAGE_MAP[item.id]}
                        alt={item.shortLabel}
                        className="w-12 h-12 rounded-2xl bg-white p-1 border border-slate-200 object-contain shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                            {item.label}
                          </span>
                          {selected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                        </div>
                        <span className="inline-block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                          {item.ageRange}
                        </span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Sub-profile per audience */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{audienceMeta.emoji}</span>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    2. Chi tiết mục tiêu cho nhóm: {audienceMeta.shortLabel}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Thông tin này giúp ưu tiên đúng bài học, chủ đề và đề luyện tập phù hợp nhất.
                  </p>
                </div>
              </div>

              {profile.audience === 'preschool' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      1. Độ tuổi & Lớp của bé
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { ageBand: '1-2' as const, levelId: 'tiny' as const, label: '🐣 1–2 tuổi', sub: 'Tiny Tots (5–7 phút)' },
                        { ageBand: '3-4' as const, levelId: 'explorer' as const, label: '🐥 3–4 tuổi', sub: 'Little Explorers (10–12 phút)' },
                        { ageBand: '5-6' as const, levelId: 'star' as const, label: '⭐ 5–6 tuổi', sub: 'Bright Stars (12–15 phút)' },
                      ].map((opt) => {
                        const active = (profile.preschool?.ageBand || '3-4') === opt.ageBand;
                        return (
                          <button
                            type="button"
                            key={opt.ageBand}
                            onClick={() =>
                              setProfile((p) => ({
                                ...p,
                                preschool: {
                                  ...(p.preschool || {
                                    ageBand: opt.ageBand,
                                    levelId: opt.levelId,
                                    studyDays: [2, 4],
                                    startDate: new Date().toISOString().slice(0, 10),
                                    parentConfirmed: true,
                                  }),
                                  ageBand: opt.ageBand,
                                  levelId: opt.levelId,
                                },
                              }))
                            }
                            className={`p-3 rounded-xl border text-left transition ${
                              active
                                ? 'border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200'
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <div className="text-xs font-extrabold">{opt.label}</div>
                            <div className="text-[11px] opacity-80 mt-0.5">{opt.sub}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      2. Tên gọi ở nhà của bé (để Gấu Bo chào bé)
                    </label>
                    <input
                      type="text"
                      value={profile.preschool?.childName || ''}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          preschool: {
                            ...(p.preschool || {
                              ageBand: '3-4',
                              levelId: 'explorer',
                              studyDays: [2, 4],
                              startDate: new Date().toISOString().slice(0, 10),
                              parentConfirmed: true,
                            }),
                            childName: e.target.value,
                          },
                        }))
                      }
                      placeholder="Ví dụ: Bin, Bông, Sóc..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                      3. Lịch học hàng tuần (chọn 2–3 ngày/tuần giống lịch trung tâm)
                    </label>
                    <div className="grid grid-cols-7 gap-1.5">
                      {[
                        { d: 1, label: 'T2' },
                        { d: 2, label: 'T3' },
                        { d: 3, label: 'T4' },
                        { d: 4, label: 'T5' },
                        { d: 5, label: 'T6' },
                        { d: 6, label: 'T7' },
                        { d: 0, label: 'CN' },
                      ].map((day) => {
                        const days = profile.preschool?.studyDays || [2, 4];
                        const active = days.includes(day.d);
                        return (
                          <button
                            type="button"
                            key={day.d}
                            onClick={() => {
                              const nextDays = active
                                ? days.filter((x) => x !== day.d)
                                : [...days, day.d].sort((a, b) => a - b);
                              setProfile((p) => ({
                                ...p,
                                preschool: {
                                  ...(p.preschool || {
                                    ageBand: '3-4',
                                    levelId: 'explorer',
                                    studyDays: [2, 4],
                                    startDate: new Date().toISOString().slice(0, 10),
                                    parentConfirmed: true,
                                  }),
                                  studyDays: nextDays.length ? nextDays : [day.d],
                                },
                              }));
                            }}
                            className={`py-2 rounded-xl border text-xs font-extrabold transition ${
                              active
                                ? 'border-emerald-500 bg-emerald-500 text-white'
                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {day.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(profile.preschool?.parentConfirmed)}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          preschool: {
                            ...(p.preschool || {
                              ageBand: '3-4',
                              levelId: 'explorer',
                              studyDays: [2, 4],
                              startDate: new Date().toISOString().slice(0, 10),
                            }),
                            parentConfirmed: e.target.checked,
                          },
                        }))
                      }
                      className="mt-0.5 rounded text-amber-600"
                    />
                    <span className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                      Tôi là phụ huynh / người lớn đồng hành cùng bé (trẻ 1–2 tuổi cần bố mẹ ngồi chơi cùng, mỗi buổi 5–7 phút).
                    </span>
                  </label>
                </div>
              )}

              {profile.audience === 'kids' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      Độ tuổi của bé
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { id: '6-7' as const, label: '6–7 tuổi (Lớp 1–2)' },
                        { id: '8-10' as const, label: '8–10 tuổi (Lớp 3–5)' },
                      ].map((age) => (
                        <button
                          type="button"
                          key={age.id}
                          onClick={() =>
                            setProfile((p) => ({
                              ...p,
                              kids: { ...(p.kids || { ageBand: '6-7', goal: 'intro' }), ageBand: age.id },
                            }))
                          }
                          className={`p-3 rounded-xl border text-xs font-bold transition ${
                            profile.kids?.ageBand === age.id
                              ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {age.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      Mục tiêu cho bé
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'intro' as const, label: 'Làm quen vui nhộn' },
                        { id: 'primary' as const, label: 'Theo chương trình Tiểu học' },
                        { id: 'yle' as const, label: 'Thi Cambridge YLE' },
                      ].map((g) => (
                        <button
                          type="button"
                          key={g.id}
                          onClick={() =>
                            setProfile((p) => ({
                              ...p,
                              kids: { ...(p.kids || { ageBand: '6-7', goal: 'intro' }), goal: g.id },
                            }))
                          }
                          className={`p-3 rounded-xl border text-xs font-bold transition ${
                            profile.kids?.goal === g.id
                              ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {profile.kids?.goal === 'yle' && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                        Cấp độ Cambridge YLE
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['starters', 'movers', 'flyers'] as const).map((lv) => (
                          <button
                            type="button"
                            key={lv}
                            onClick={() =>
                              setProfile((p) => ({
                                ...p,
                                kids: { ...(p.kids || { ageBand: '8-10', goal: 'yle' }), yleLevel: lv },
                              }))
                            }
                            className={`p-2.5 rounded-xl border text-xs font-bold uppercase ${
                              (profile.kids?.yleLevel || 'starters') === lv
                                ? 'border-amber-500 bg-amber-50 text-amber-800'
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {lv}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(profile.kids?.parentConfirmed)}
                      onChange={(e) =>
                        setProfile((p) => ({
                          ...p,
                          kids: { ...(p.kids || { ageBand: '6-7', goal: 'intro' }), parentConfirmed: e.target.checked },
                        }))
                      }
                      className="mt-0.5 rounded text-amber-600"
                    />
                    <span className="text-xs font-semibold text-amber-900 dark:text-amber-200">
                      Tôi là phụ huynh hoặc người giám hộ hỗ trợ đăng ký & đồng hành cùng bé học tập.
                    </span>
                  </label>
                </div>
              )}

              {profile.audience === 'teen' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      Bạn đang học lớp mấy?
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {([6, 7, 8, 9, 10, 11, 12] as const).map((gr) => (
                        <button
                          type="button"
                          key={gr}
                          onClick={() =>
                            setProfile((p) => ({
                              ...p,
                              teen: { ...(p.teen || { grade: 9, goal: 'school' }), grade: gr },
                            }))
                          }
                          className={`py-2.5 rounded-xl border text-xs font-extrabold transition ${
                            profile.teen?.grade === gr
                              ? 'border-sky-600 bg-sky-600 text-white'
                              : 'border-slate-200 dark:border-slate-700 hover:border-sky-400'
                          }`}
                        >
                          Lớp {gr}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      Mục tiêu trọng tâm
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'school' as const, label: 'Học tốt SGK trên lớp' },
                        { id: 'entrance10' as const, label: 'Ôn thi vào lớp 10' },
                        { id: 'thpt' as const, label: 'Ôn thi Tốt nghiệp THPT' },
                        { id: 'communication' as const, label: 'Cải thiện nghe nói giao tiếp' },
                      ].map((g) => (
                        <button
                          type="button"
                          key={g.id}
                          onClick={() =>
                            setProfile((p) => ({
                              ...p,
                              teen: { ...(p.teen || { grade: 9, goal: 'school' }), goal: g.id },
                            }))
                          }
                          className={`p-3 rounded-xl border text-left text-xs font-bold transition ${
                            profile.teen?.goal === g.id
                              ? 'border-sky-600 bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300'
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {profile.audience === 'university' && (
                <div className="space-y-4">
                  {profile.exam?.examType === 'cambridge' && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                        Cấp độ Cambridge (KET / PET / FCE)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(
                          [
                            { id: 'ket', label: '📘 KET (A2 Key)', score: 'A2 Key (KET)' },
                            { id: 'pet', label: '📗 PET (B1 Prelim)', score: 'B1 Preliminary (PET)' },
                            { id: 'fce', label: '📙 FCE (B2 First)', score: 'B2 First (FCE)' },
                          ] as const
                        ).map((lv) => {
                          const active = (profile.exam?.cambridgeLevel || 'pet') === lv.id;
                          return (
                            <button
                              type="button"
                              key={lv.id}
                              onClick={() =>
                                setProfile((p) => ({
                                  ...p,
                                  exam: {
                                    ...(p.exam || { examType: 'cambridge', targetScore: lv.score }),
                                    cambridgeLevel: lv.id,
                                    targetScore: lv.score,
                                  },
                                }))
                              }
                              className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                                active
                                  ? 'border-rose-600 bg-rose-600 text-white'
                                  : 'border-slate-200 dark:border-slate-700 hover:border-rose-400'
                              }`}
                            >
                              {lv.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                        Sinh viên năm thứ
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {([1, 2, 3, 4] as const).map((yr) => (
                          <button
                            type="button"
                            key={yr}
                            onClick={() =>
                              setProfile((p) => ({
                                ...p,
                                university: {
                                  ...(p.university || { year: 2, majorCategories: [], goal: 'graduation' }),
                                  year: yr,
                                },
                              }))
                            }
                            className={`py-2 rounded-xl border text-xs font-bold ${
                              profile.university?.year === yr
                                ? 'border-violet-600 bg-violet-600 text-white'
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            Năm {yr}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                        Mục tiêu chính
                      </label>
                      <select
                        value={profile.university?.goal || 'graduation'}
                        onChange={(e) =>
                          setProfile((p) => ({
                            ...p,
                            university: {
                              ...(p.university || { year: 2, majorCategories: [], goal: 'graduation', graduationExam: 'vstep' }),
                              goal: e.target.value as any,
                            },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                      >
                        <option value="graduation">Đạt chuẩn đầu ra ĐH (VSTEP / TOEIC / IELTS)</option>
                        <option value="academic">Học thuật, nghiên cứu & du học</option>
                        <option value="communication">Giao tiếp, thuyết trình & xin thực tập</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      Chứng chỉ chuẩn đầu ra trường bạn yêu cầu
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {EXAM_METADATA.map((ex) => {
                        const active = (profile.university?.graduationExam || 'vstep') === ex.id;
                        return (
                          <button
                            type="button"
                            key={ex.id}
                            onClick={() =>
                              setProfile((p) => ({
                                ...p,
                                university: {
                                  ...(p.university || { year: 2, majorCategories: [], goal: 'graduation' }),
                                  graduationExam: ex.id,
                                },
                              }))
                            }
                            className={`px-2.5 py-2 rounded-xl border text-xs font-bold transition ${
                              active
                                ? 'bg-violet-600 text-white border-violet-600'
                                : 'border-slate-200 dark:border-slate-700 hover:border-violet-400'
                            }`}
                          >
                            {ex.emoji} {ex.shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      Lĩnh vực / Chuyên ngành quan tâm (chọn ít nhất 1)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRACTICAL_CATEGORIES.map((cat) => {
                        const active = profile.university?.majorCategories?.includes(cat);
                        return (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => toggleCategory('university', cat)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                              active
                                ? 'bg-violet-600 text-white border-violet-600'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
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

              {profile.audience === 'worker' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      Mục tiêu ưu tiên trong công việc
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'work' as const, label: 'Giao tiếp công sở' },
                        { id: 'email' as const, label: 'Viết Email & Báo cáo' },
                        { id: 'interview' as const, label: 'Phỏng vấn xin việc' },
                        { id: 'travel' as const, label: 'Công tác & Du lịch' },
                      ].map((g) => (
                        <button
                          type="button"
                          key={g.id}
                          onClick={() =>
                            setProfile((p) => ({
                              ...p,
                              worker: { ...(p.worker || { industries: [], goal: 'work' }), goal: g.id },
                            }))
                          }
                          className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                            profile.worker?.goal === g.id
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                              : 'border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      Chọn ngành nghề / chủ đề của bạn (chọn ít nhất 1 để sắp xếp bài học lên đầu)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRACTICAL_CATEGORIES.map((cat) => {
                        const active = profile.worker?.industries?.includes(cat);
                        return (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => toggleCategory('worker', cat)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                              active
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
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

              {profile.audience === 'exam' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                      Chọn chứng chỉ bạn đang luyện thi
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {EXAM_METADATA.map((ex) => {
                        const selected = profile.exam?.examType === ex.id;
                        return (
                          <button
                            type="button"
                            key={ex.id}
                            onClick={() =>
                              setProfile((p) => ({
                                ...p,
                                exam: {
                                  ...(p.exam || { examType: ex.id, targetScore: ex.defaultScore }),
                                  examType: ex.id,
                                  targetScore: ex.defaultScore,
                                },
                              }))
                            }
                            className={`p-3 rounded-xl border-2 text-left transition flex items-start gap-2.5 ${
                              selected
                                ? 'border-rose-600 bg-rose-50/70 dark:bg-rose-950/40'
                                : 'border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <span className="text-xl">{ex.emoji}</span>
                            <div>
                              <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                                {ex.label}
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                {ex.description}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {profile.exam?.examType === 'cambridge' && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                        Cấp độ Cambridge (KET / PET / FCE)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(
                          [
                            { id: 'ket', label: '📘 KET (A2 Key)', score: 'A2 Key (KET)' },
                            { id: 'pet', label: '📗 PET (B1 Prelim)', score: 'B1 Preliminary (PET)' },
                            { id: 'fce', label: '📙 FCE (B2 First)', score: 'B2 First (FCE)' },
                          ] as const
                        ).map((lv) => {
                          const active = (profile.exam?.cambridgeLevel || 'pet') === lv.id;
                          return (
                            <button
                              type="button"
                              key={lv.id}
                              onClick={() =>
                                setProfile((p) => ({
                                  ...p,
                                  exam: {
                                    ...(p.exam || { examType: 'cambridge', targetScore: lv.score }),
                                    cambridgeLevel: lv.id,
                                    targetScore: lv.score,
                                  },
                                }))
                              }
                              className={`p-2.5 rounded-xl border text-xs font-bold transition ${
                                active
                                  ? 'border-rose-600 bg-rose-600 text-white'
                                  : 'border-slate-200 dark:border-slate-700 hover:border-rose-400'
                              }`}
                            >
                              {lv.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Điểm / Mức mục tiêu
                      </label>
                      <select
                        value={profile.exam?.targetScore || getExamMeta(profile.exam?.examType || 'ielts').defaultScore}
                        onChange={(e) =>
                          setProfile((p) => ({
                            ...p,
                            exam: { ...(p.exam || { examType: 'ielts', targetScore: '6.5' }), targetScore: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold"
                      >
                        {getExamMeta(profile.exam?.examType || 'ielts').scoreOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            Mục tiêu: {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                        Ngày dự kiến thi (tùy chọn)
                      </label>
                      <input
                        type="date"
                        value={profile.exam?.examDate || ''}
                        onChange={(e) =>
                          setProfile((p) => ({
                            ...p,
                            exam: { ...(p.exam || { examType: 'ielts', targetScore: '6.5' }), examDate: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Starting CEFR Level + Daily Minutes */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                    3. Trình độ hiện tại & Thời lượng học mỗi ngày
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Nếu trình độ từ A2/B1 trở lên, các bước nền tảng (Chữ cái, IPA) sẽ tự động đánh dấu đã qua.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setUseQuickTest(!useQuickTest)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {useQuickTest ? 'Tự chọn trình độ' : 'Làm bài Test nhanh 10 câu'}
                </button>
              </div>

              {!useQuickTest ? (
                <div className="space-y-2">
                  {LEVEL_OPTIONS.map((opt) => (
                    <button
                      type="button"
                      key={opt.level}
                      onClick={() => setProfile((p) => ({ ...p, startLevel: opt.level }))}
                      className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between gap-3 ${
                        profile.startLevel === opt.level
                          ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40'
                          : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-extrabold text-slate-900 dark:text-white">{opt.title}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{opt.desc}</div>
                      </div>
                      {profile.startLevel === opt.level && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-[420px] overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/60 dark:bg-slate-800/30">
                  {/* Question Stepper 1..10 */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/70 dark:border-slate-700/70">
                    <div className="flex flex-wrap gap-1">
                      {PLACEMENT_QUIZ.map((q, idx) => {
                        const answered = quizAnswers[q.id] !== undefined;
                        const isRight = quizAnswers[q.id] === q.correctIndex;
                        const active = quizPageIdx === idx;
                        return (
                          <button
                            key={q.id}
                            type="button"
                            onClick={() => setQuizPageIdx(idx)}
                            className={`w-7 h-7 rounded-lg text-[11px] font-extrabold border transition ${
                              active
                                ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-300'
                                : quizSubmitted
                                ? isRight
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                                  : 'bg-rose-100 text-rose-800 border-rose-400'
                                : answered
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-300 dark:bg-indigo-950/50 dark:text-indigo-300'
                                : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">
                      Đã chọn {Object.keys(quizAnswers).length}/{PLACEMENT_QUIZ.length} câu
                    </span>
                  </div>

                  {/* Active Question Card (1 at a time) */}
                  {(() => {
                    const q = PLACEMENT_QUIZ[quizPageIdx] || PLACEMENT_QUIZ[0];
                    return (
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-extrabold">
                            Câu {quizPageIdx + 1}/{PLACEMENT_QUIZ.length} • Cấp {q.level}
                          </span>
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                          {q.prompt}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {q.options.map((opt, optIdx) => {
                            const picked = quizAnswers[q.id] === optIdx;
                            const isCorrect = optIdx === q.correctIndex;
                            return (
                              <button
                                type="button"
                                key={optIdx}
                                onClick={() => {
                                  setQuizSubmitted(false);
                                  setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                                  if (quizPageIdx < PLACEMENT_QUIZ.length - 1) {
                                    setTimeout(() => setQuizPageIdx((p) => Math.min(PLACEMENT_QUIZ.length - 1, p + 1)), 180);
                                  }
                                }}
                                className={`px-3 py-2.5 rounded-xl border text-left text-xs font-bold transition ${
                                  quizSubmitted
                                    ? isCorrect
                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                                      : picked
                                      ? 'bg-rose-50 border-rose-400 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                                      : 'border-slate-200 dark:border-slate-700 opacity-70'
                                    : picked
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {quizSubmitted && (
                          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
                            💡 {q.explanationVi}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Paging + Submit Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={quizPageIdx === 0}
                        onClick={() => setQuizPageIdx((p) => Math.max(0, p - 1))}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold disabled:opacity-40"
                      >
                        ← Câu trước
                      </button>
                      <button
                        type="button"
                        disabled={quizPageIdx >= PLACEMENT_QUIZ.length - 1}
                        onClick={() => setQuizPageIdx((p) => Math.min(PLACEMENT_QUIZ.length - 1, p + 1))}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold disabled:opacity-40"
                      >
                        Câu tiếp →
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {quizSubmitted && (
                        <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                          Kết quả: {quizCorrectCount}/{PLACEMENT_QUIZ.length} đúng → Cấp {profile.startLevel}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={handleFinishQuiz}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                      >
                        Chấm điểm & Xếp trình độ
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  Thời lượng học mục tiêu mỗi ngày
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {DAILY_MINUTES_OPTIONS.map((mins) => (
                    <button
                      type="button"
                      key={mins}
                      onClick={() => setProfile((p) => ({ ...p, dailyMinutes: mins }))}
                      className={`py-2.5 rounded-xl border text-xs font-extrabold transition ${
                        profile.dailyMinutes === mins
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {mins} phút
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Preview Personalized Track */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-90">
                  <UserCheck className="w-4 h-4" />
                  Hồ sơ học tập của bạn đã sẵn sàng
                </div>
                <h2 className="text-lg font-black mt-1">
                  {audienceMeta.emoji} {trackConfig.title}
                </h2>
                <p className="text-xs opacity-90 mt-1">{trackConfig.subtitle}</p>
                <div className="flex flex-wrap gap-2 mt-3 text-[11px] font-bold">
                  <span className="px-2.5 py-1 rounded-lg bg-white/20">Trình độ: {profile.startLevel}</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/20">Mỗi ngày: {profile.dailyMinutes} phút</span>
                  {profile.audience === 'teen' && (
                    <span className="px-2.5 py-1 rounded-lg bg-white/20">Lớp {profile.teen?.grade}</span>
                  )}
                  {profile.audience === 'exam' && (
                    <span className="px-2.5 py-1 rounded-lg bg-white/20">
                      Kỳ thi {getExamMeta(profile.exam?.examType || 'ielts').shortLabel} • Mục tiêu {profile.exam?.targetScore}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <div className="text-xs font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-indigo-500" />
                    Các trang & bước hiển thị riêng cho bạn
                  </div>
                  <div className="space-y-1.5">
                    {trackConfig.steps.map((st) => (
                      <div
                        key={st.code}
                        className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70"
                      >
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{st.label}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">{st.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-extrabold text-slate-800 dark:text-white">
                    Phân bổ tỷ trọng kỹ năng khuyến nghị
                  </div>
                  <div className="space-y-2">
                    {trackConfig.skillDistribution.map((sk) => (
                      <div key={sk.skill} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
                          <span>{sk.skill}</span>
                          <span>{sk.percent}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className={`h-full rounded-full ${sk.color}`} style={{ width: `${sk.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                    Các trang không thuộc nhóm <strong>{audienceMeta.shortLabel}</strong> sẽ được ẩn gọn. Bạn có thể thay đổi nhóm bất cứ lúc nào trong mục <em>Hồ sơ học tập</em>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex items-center justify-between gap-3">
          <div>
            {step > 1 ? (
              <button
                type="button"
                onClick={() =>
                  setStep((s) => {
                    if (s === 4 && profile.audience === 'preschool') return 2;
                    return (s - 1) as 1 | 2 | 3 | 4;
                  })
                }
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 inline-flex items-center gap-1.5 hover:bg-white dark:hover:bg-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Quay lại
              </button>
            ) : onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600"
              >
                Đóng
              </button>
            ) : null}
          </div>

          <div>
            {step < 4 ? (
              <button
                type="button"
                disabled={step === 2 && !canProceedStep2}
                onClick={() =>
                  setStep((s) => {
                    if (s === 2 && profile.audience === 'preschool') return 4;
                    return (s + 1) as 1 | 2 | 3 | 4;
                  })
                }
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
              >
                Tiếp tục
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={saving}
                onClick={handleConfirm}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                {saving ? 'Đang lưu lộ trình...' : 'Lưu hồ sơ & Bắt đầu học ngay'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

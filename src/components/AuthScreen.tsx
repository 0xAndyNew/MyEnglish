import React, { useState } from 'react';
import { BookOpenCheck, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PRACTICAL_CATEGORIES } from '../data/practicalCategories';
import {
  AUDIENCE_METADATA,
  AudienceId,
  createDefaultProfile,
  EXAM_METADATA,
  ExamType,
  getExamMeta,
  LearnerProfile,
} from '../types/audience';
import { UserAccount, UserProgress } from '../types/learning';
import { loginAccount, registerAccount } from '../utils/storage';

interface AuthScreenProps {
  onAuthSuccess: (
    user: UserAccount,
    progress: UserProgress,
    pendingAudience?: AudienceId,
    pendingDraftProfile?: LearnerProfile
  ) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAudience, setSelectedAudience] = useState<AudienceId>('worker');
  const [kidsAgeBand, setKidsAgeBand] = useState<'6-7' | '8-10'>('6-7');
  const [teenGrade, setTeenGrade] = useState<6 | 7 | 8 | 9 | 10 | 11 | 12>(9);
  const [uniYear, setUniYear] = useState<1 | 2 | 3 | 4>(2);
  const [workerIndustry, setWorkerIndustry] = useState<string>(PRACTICAL_CATEGORIES[3]);
  const [examType, setExamType] = useState<ExamType>('ielts');
  const [openWizardAfter, setOpenWizardAfter] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const buildDraftProfile = (): LearnerProfile => {
    const base = createDefaultProfile(selectedAudience);
    if (selectedAudience === 'kids') {
      base.kids = { ...(base.kids || { ageBand: kidsAgeBand, goal: 'intro' }), ageBand: kidsAgeBand, parentConfirmed: true };
    } else if (selectedAudience === 'teen') {
      base.teen = { grade: teenGrade, goal: teenGrade >= 10 ? 'thpt' : teenGrade === 9 ? 'entrance10' : 'school' };
    } else if (selectedAudience === 'university') {
      base.university = { ...(base.university || { year: uniYear, majorCategories: ['IT / Kỹ thuật'], goal: 'graduation' }), year: uniYear };
    } else if (selectedAudience === 'worker') {
      base.worker = { industries: [workerIndustry], goal: 'work' };
    } else if (selectedAudience === 'exam') {
      const meta = getExamMeta(examType);
      base.exam = { examType, targetScore: meta.defaultScore };
    }
    return base;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const draftProfile = buildDraftProfile();
      const quickProfile = mode === 'register' && !openWizardAfter ? draftProfile : undefined;
      const res =
        mode === 'register'
          ? await registerAccount(email, displayName, password, quickProfile)
          : await loginAccount(email, password);
      if (res.ok) {
        onAuthSuccess(
          res.user,
          res.progress,
          mode === 'register' && openWizardAfter ? selectedAudience : undefined,
          mode === 'register' && openWizardAfter ? draftProfile : undefined
        );
      } else {
        setError(res.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50/50 to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 px-4 py-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg">
            <BookOpenCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">MyEnglish</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Đăng nhập để lưu tiến độ học tập, từ vựng và lộ trình cá nhân của bạn.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`py-2 rounded-lg text-xs font-bold transition ${
              mode === 'login'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`py-2 rounded-lg text-xs font-bold transition ${
              mode === 'register'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            Đăng ký tài khoản mới
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 block">
                  Tên hiển thị của bạn
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ví dụ: Xuân Hiếu"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5 block">
                  Đối tượng học tập (để chọn giáo trình & trang phù hợp)
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {AUDIENCE_METADATA.map((item) => {
                    const active = selectedAudience === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setSelectedAudience(item.id)}
                        className={`p-2 rounded-xl border text-left transition flex items-center justify-between gap-2 ${
                          active
                            ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50'
                            : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-lg leading-none">{item.emoji}</span>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">{item.ageRange}</div>
                          </div>
                        </div>
                        {active && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Quick sub-detail matching selected audience */}
                <div className="mt-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
                  {selectedAudience === 'kids' && (
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-600 dark:text-slate-300">Độ tuổi của bé:</span>
                      <select
                        value={kidsAgeBand}
                        onChange={(e) => setKidsAgeBand(e.target.value as '6-7' | '8-10')}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold"
                      >
                        <option value="6-7">6–7 tuổi (Lớp 1–2)</option>
                        <option value="8-10">8–10 tuổi (Lớp 3–5)</option>
                      </select>
                    </div>
                  )}
                  {selectedAudience === 'teen' && (
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-600 dark:text-slate-300">Khối lớp:</span>
                      <select
                        value={teenGrade}
                        onChange={(e) => setTeenGrade(Number(e.target.value) as any)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold"
                      >
                        {[6, 7, 8, 9, 10, 11, 12].map((g) => (
                          <option key={g} value={g}>
                            Lớp {g}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {selectedAudience === 'university' && (
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-600 dark:text-slate-300">Sinh viên năm:</span>
                      <select
                        value={uniYear}
                        onChange={(e) => setUniYear(Number(e.target.value) as any)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold"
                      >
                        {[1, 2, 3, 4].map((y) => (
                          <option key={y} value={y}>
                            Năm {y}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {selectedAudience === 'worker' && (
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-600 dark:text-slate-300">Ngành chính:</span>
                      <select
                        value={workerIndustry}
                        onChange={(e) => setWorkerIndustry(e.target.value)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold max-w-[200px]"
                      >
                        {PRACTICAL_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {selectedAudience === 'exam' && (
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-600 dark:text-slate-300">Kỳ thi chứng chỉ:</span>
                      <select
                        value={examType}
                        onChange={(e) => setExamType(e.target.value as ExamType)}
                        className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 font-bold"
                      >
                        {EXAM_METADATA.map((ex) => (
                          <option key={ex.id} value={ex.id}>
                            {ex.emoji} {ex.shortLabel}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <label className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={openWizardAfter}
                    onChange={(e) => setOpenWizardAfter(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  Thiết lập chi tiết mục tiêu &amp; Test trình độ sau khi tạo tài khoản
                </label>
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 block">
              {mode === 'register' ? 'Địa chỉ Gmail' : 'Tài khoản (Gmail hoặc admin)'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={mode === 'register' ? 'email' : 'text'}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={mode === 'register' ? 'tenban@gmail.com' : 'tenban@gmail.com hoặc admin'}
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-1 block">
              Mật khẩu (ít nhất 6 ký tự)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50"
          >
            <span>
              {loading
                ? 'Đang xác thực...'
                : mode === 'register'
                ? 'Tạo tài khoản & Bắt đầu Bước 1'
                : 'Đăng nhập & Tiếp tục học'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Flame,
  Trophy,
  Sun,
  Moon,
  Download,
  Loader2,
  BookOpenCheck,
  Lock,
  Unlock,
  CheckCircle2,
  LogOut,
  Shield,
  Sliders,
  Eye,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Settings,
  Sparkles,
} from 'lucide-react';
import { AudienceTrackConfig, isStepAutoPassed, TrackStep } from '../../config/audienceTracks';
import {
  AUDIENCE_METADATA,
  AudienceId,
  AudienceMetadataItem,
  LearnerProfile,
} from '../../types/audience';
import { UserAccount, UserProgress } from '../../types/learning';
import { AUDIENCE_IMAGE_MAP } from '../../utils/flashcardMedia';

export interface AppShellProps {
  currentUser: UserAccount;
  effectiveProfile: LearnerProfile;
  audienceMeta: AudienceMetadataItem;
  audienceSubTag: string;
  activeTrackConfig: AudienceTrackConfig;
  activeTrackSteps: TrackStep[];
  safeStepIdx: number;
  currentStep: TrackStep;
  currentAudienceUnlock: number;
  progress: UserProgress;
  darkMode: boolean;
  devUnlockAll: boolean;
  isAdminUser: boolean;
  isDevUser: boolean;
  adminPreviewAudience: AudienceId | null;
  searchQuery: string;
  searchLoading: boolean;
  onSearchQueryChange: (q: string) => void;
  onGlobalSearch: (e: React.FormEvent) => void;
  onSelectStep: (idx: number) => void;
  onQuickSwitchAudience: (aud: AudienceId) => void;
  onOpenProfileModal: () => void;
  onOpenAdminModal: () => void;
  onToggleAccent: () => void;
  onToggleDarkMode: () => void;
  onToggleDevUnlock: () => void;
  onChangeAdminPreview: (aud: AudienceId | null) => void;
  onExportData: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentUser,
  effectiveProfile,
  audienceMeta,
  audienceSubTag,
  activeTrackConfig,
  activeTrackSteps,
  safeStepIdx,
  currentStep,
  currentAudienceUnlock,
  progress,
  darkMode,
  devUnlockAll,
  isAdminUser,
  isDevUser,
  adminPreviewAudience,
  searchQuery,
  searchLoading,
  onSearchQueryChange,
  onGlobalSearch,
  onSelectStep,
  onQuickSwitchAudience,
  onOpenProfileModal,
  onOpenAdminModal,
  onToggleAccent,
  onToggleDarkMode,
  onToggleDevUnlock,
  onChangeAdminPreview,
  onExportData,
  onLogout,
  children,
}) => {
  const [showAudienceMenu, setShowAudienceMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);

  const audienceMenuRef = useRef<HTMLDivElement | null>(null);
  const settingsMenuRef = useRef<HTMLDivElement | null>(null);

  const isKidsAudience = effectiveProfile.audience === 'kids';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        audienceMenuRef.current &&
        !audienceMenuRef.current.contains(event.target as Node)
      ) {
        setShowAudienceMenu(false);
      }
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target as Node)
      ) {
        setShowSettingsMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unlockedCount = activeTrackSteps.filter((st) => {
    const autoPassed = isStepAutoPassed(st, effectiveProfile);
    return devUnlockAll || st.idx <= currentAudienceUnlock || autoPassed;
  }).length;

  const progressPercent = Math.min(
    100,
    Math.round((Math.max(1, unlockedCount) / Math.max(1, activeTrackSteps.length)) * 100)
  );

  return (
    <div
      className={`min-h-screen flex flex-col text-slate-900 dark:text-slate-100 ${
        isKidsAudience
          ? 'bg-gradient-to-b from-amber-50/70 via-sky-50/40 to-pink-50/40 dark:from-slate-950 dark:to-slate-900'
          : 'bg-slate-50 dark:bg-slate-950'
      }`}
    >
      {/* SINGLE COMPACT TOPBAR (56px / h-14) */}
      <header className="sticky top-0 z-30 h-14 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1440px] h-full mx-auto px-3 sm:px-5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Mobile Drawer Button + Brand + Smart Audience Pill */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setShowMobileDrawer(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              title="Mở danh sách bước lộ trình"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 min-w-0">
              <div
                className={`w-8 h-8 rounded-xl bg-gradient-to-br ${audienceMeta.accentGradient} text-white flex items-center justify-center shadow-sm shrink-0`}
              >
                <BookOpenCheck className="w-4 h-4" />
              </div>
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 dark:text-white hidden sm:inline">
                MyEnglish
              </span>
            </div>

            {/* Smart Audience Pill (interactive switcher for Admin only; read-only badge for regular users) */}
            {isAdminUser ? (
              <div className="relative" ref={audienceMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowAudienceMenu((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold border transition hover:shadow-sm ${audienceMeta.badgeColor}`}
                  title="Quản trị: Đổi nhóm đối tượng hoặc tùy chỉnh mục tiêu học tập"
                >
                  <img
                    src={AUDIENCE_IMAGE_MAP[audienceMeta.id]}
                    alt={audienceMeta.shortLabel}
                    className="w-5 h-5 rounded-md bg-white p-0.5 object-contain shrink-0"
                  />
                  <span className="truncate max-w-[96px] sm:max-w-none">{audienceMeta.shortLabel}</span>
                  <span className="opacity-80 hidden md:inline">• {audienceSubTag}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-75 shrink-0" />
                </button>

                {showAudienceMenu && (
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50 space-y-2.5">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Chọn đối tượng học tập
                      </span>
                      <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                        {audienceSubTag}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {AUDIENCE_METADATA.map((aud) => {
                        const isSelected = effectiveProfile.audience === aud.id;
                        return (
                          <button
                            key={aud.id}
                            type="button"
                            onClick={() => {
                              onQuickSwitchAudience(aud.id);
                              setShowAudienceMenu(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
                              isSelected
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <img
                                src={AUDIENCE_IMAGE_MAP[aud.id]}
                                alt={aud.shortLabel}
                                className="w-5 h-5 rounded-md bg-white p-0.5 object-contain shrink-0"
                              />
                              <span>{aud.label}</span>
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAudienceMenu(false);
                          onOpenProfileModal();
                        }}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Tùy chỉnh Lớp / Ngành / Kỳ thi ({audienceSubTag})</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold border ${audienceMeta.badgeColor}`}
                title="Hồ sơ học tập của bạn"
              >
                <span>{audienceMeta.emoji}</span>
                <span className="truncate max-w-[96px] sm:max-w-none">{audienceMeta.shortLabel}</span>
                <span className="opacity-80 hidden md:inline">• {audienceSubTag}</span>
              </div>
            )}
          </div>

          {/* Center: Quick Dictionary Search (Hidden for Kids) */}
          {!isKidsAudience && (
            <form
              onSubmit={onGlobalSearch}
              className="hidden md:block flex-1 max-w-xs lg:max-w-sm mx-2"
            >
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
                <input
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  placeholder="Tra từ điển nhanh..."
                  className="w-full pl-8 pr-12 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  disabled={searchLoading}
                  className="absolute right-1 px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white text-[11px] font-bold hover:bg-indigo-700"
                >
                  {searchLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Tra'}
                </button>
              </div>
            </form>
          )}

          {/* Right: Compact Stats + Primary Actions + Settings Popover */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{progress.streakDays}d</span>
            </div>

            <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
              <Trophy className="w-3.5 h-3.5 text-indigo-500" />
              <span>{progress.xp} XP</span>
            </div>

            <button
              type="button"
              onClick={onToggleAccent}
              className="px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold hover:border-indigo-400 transition"
              title="Đổi giọng phát âm Anh-Mỹ (US) / Anh-Anh (UK)"
            >
              {progress.accent === 'en-US' ? '🇺🇸 US' : '🇬🇧 UK'}
            </button>

            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 transition"
              title="Chế độ Sáng / Tối"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {isDevUser && (
              <button
                type="button"
                onClick={onOpenAdminModal}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-300 transition"
                title="Mở bảng quản trị Admin (API Key, Bài học & Tài khoản)"
              >
                <Shield className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Quản trị</span>
              </button>
            )}

            {/* Unified Account & Tools Menu */}
            <div className="relative" ref={settingsMenuRef}>
              <button
                type="button"
                onClick={() => setShowSettingsMenu((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-400 transition"
                title="Tài khoản, Cài đặt & Công cụ"
              >
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline truncate max-w-[110px]">
                  {currentUser.displayName}
                </span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {showSettingsMenu && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50 space-y-2.5">
                  <div className="px-2 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/70">
                    <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100 truncate">
                      {currentUser.displayName}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {currentUser.email}
                    </p>
                  </div>

                  {/* Mobile search bar inside menu if on small screen */}
                  {!isKidsAudience && (
                    <form
                      onSubmit={(e) => {
                        onGlobalSearch(e);
                        setShowSettingsMenu(false);
                      }}
                      className="md:hidden"
                    >
                      <div className="relative flex items-center">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5" />
                        <input
                          value={searchQuery}
                          onChange={(e) => onSearchQueryChange(e.target.value)}
                          placeholder="Tra từ điển nhanh..."
                          className="w-full pl-8 pr-12 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 outline-none"
                        />
                        <button
                          type="submit"
                          className="absolute right-1 px-2 py-0.5 rounded-lg bg-indigo-600 text-white text-[10px] font-bold"
                        >
                          Tra
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-1">
                    {isAdminUser && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowSettingsMenu(false);
                          onOpenProfileModal();
                        }}
                        className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      >
                        <Sliders className="w-4 h-4 text-indigo-500" />
                        <span>Hồ sơ & Tùy chỉnh lộ trình ({audienceSubTag})</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setShowSettingsMenu(false);
                        onExportData();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <Download className="w-4 h-4 text-emerald-500" />
                      <span>Sao lưu dữ liệu học tập (JSON)</span>
                    </button>
                  </div>

                  {isDevUser && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      <p className="px-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        Công cụ Quản trị / Dev
                      </p>

                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/70 dark:bg-violet-950/40 text-xs font-bold text-violet-700 dark:text-violet-300">
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                        <select
                          value={adminPreviewAudience || ''}
                          onChange={(e) => {
                            const val = (e.target.value || null) as AudienceId | null;
                            onChangeAdminPreview(val);
                          }}
                          className="bg-transparent outline-none text-xs font-bold cursor-pointer w-full"
                        >
                          <option value="">Xem như: Hồ sơ gốc</option>
                          {AUDIENCE_METADATA.map((aud) => (
                            <option key={aud.id} value={aud.id}>
                              {aud.emoji} Xem như: {aud.shortLabel}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="button"
                        onClick={onToggleDevUnlock}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold border transition ${
                          devUnlockAll
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                            : 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {devUnlockAll ? (
                            <Unlock className="w-3.5 h-3.5" />
                          ) : (
                            <Lock className="w-3.5 h-3.5" />
                          )}
                          <span>{devUnlockAll ? 'Dev: Đang mở hết các bước' : 'Chế độ khóa tuần tự'}</span>
                        </span>
                      </button>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setShowSettingsMenu(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất tài khoản</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE COMPACT 1-ROW STEP BAR (< lg) */}
      <div className="lg:hidden sticky top-14 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {activeTrackSteps.map((st) => {
            const autoPassed = isStepAutoPassed(st, effectiveProfile);
            const isLocked = !devUnlockAll && st.idx > currentAudienceUnlock && !autoPassed;
            const isDone = st.idx < currentAudienceUnlock || autoPassed;
            const isActive = safeStepIdx === st.idx;
            return (
              <button
                key={st.code}
                type="button"
                disabled={isLocked}
                onClick={() => onSelectStep(st.idx)}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border shrink-0 transition ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : isLocked
                    ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                {isLocked ? (
                  <Lock className="w-3 h-3 shrink-0" />
                ) : isDone ? (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isActive ? 'text-emerald-300' : 'text-emerald-500'
                    }`}
                  />
                ) : null}
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MOBILE SLIDE-OVER DRAWER */}
      {showMobileDrawer && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
            onClick={() => setShowMobileDrawer(false)}
          />
          <aside className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full overflow-y-auto p-4 flex flex-col justify-between z-10 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{audienceMeta.emoji}</span>
                  <div>
                    <p className="text-xs font-black text-slate-900 dark:text-white">
                      {audienceMeta.label}
                    </p>
                    <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                      {audienceSubTag}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowMobileDrawer(false)}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
                  Lộ trình từng bước ({unlockedCount}/{activeTrackSteps.length})
                </p>
                {activeTrackSteps.map((st) => {
                  const autoPassed = isStepAutoPassed(st, effectiveProfile);
                  const isLocked = !devUnlockAll && st.idx > currentAudienceUnlock && !autoPassed;
                  const isDone = st.idx < currentAudienceUnlock || autoPassed;
                  const isActive = safeStepIdx === st.idx;
                  return (
                    <button
                      key={st.code}
                      type="button"
                      disabled={isLocked}
                      onClick={() => {
                        onSelectStep(st.idx);
                        setShowMobileDrawer(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-2xl border transition flex items-start gap-2.5 ${
                        isActive
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : isLocked
                          ? 'bg-slate-50 dark:bg-slate-800/40 text-slate-400 border-slate-200/60 dark:border-slate-800 cursor-not-allowed'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                      }`}
                    >
                      <span
                        className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : isDone
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isLocked ? (
                          <Lock className="w-3 h-3" />
                        ) : isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          st.code
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-extrabold leading-snug">{st.label}</p>
                        <p
                          className={`text-[11px] mt-0.5 line-clamp-2 ${
                            isActive ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {st.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1">
                Đổi nhanh đối tượng
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {AUDIENCE_METADATA.map((aud) => {
                  const isSelected = effectiveProfile.audience === aud.id;
                  return (
                    <button
                      key={aud.id}
                      type="button"
                      onClick={() => {
                        onQuickSwitchAudience(aud.id);
                        setShowMobileDrawer(false);
                      }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span>{aud.emoji}</span>
                      <span className="truncate">{aud.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowMobileDrawer(false);
                  onOpenProfileModal();
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Tùy chỉnh Lớp / Ngành / Kỳ thi</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* MAIN 2-COLUMN WORKSPACE (Desktop Left Sidebar + Focused Learning Area) */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto flex items-start gap-5 px-3 sm:px-5 py-4 sm:py-5">
        {/* DESKTOP LEFT SIDEBAR (w-64 xl:w-72) */}
        <aside className="hidden lg:flex lg:w-64 xl:w-72 shrink-0 flex-col gap-3 sticky top-[4.5rem] max-h-[calc(100vh-5.5rem)] overflow-y-auto pr-1">
          {/* Active Track Summary Card */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={AUDIENCE_IMAGE_MAP[audienceMeta.id]}
                  alt={audienceMeta.shortLabel}
                  className="w-9 h-9 rounded-xl bg-white p-1 border border-slate-200 object-contain shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                      {audienceMeta.label}
                    </span>
                  </div>
                  <span className="inline-block text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400">
                    {audienceSubTag}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenProfileModal}
                title="Tùy chỉnh lớp, chuyên ngành hoặc kỳ thi mục tiêu"
                className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-indigo-600 hover:border-indigo-300 transition shrink-0"
              >
                <Sliders className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
              {activeTrackConfig.title}
            </p>

            {/* Track Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
                <span>Tiến độ mở khóa lộ trình</span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {unlockedCount}/{activeTrackSteps.length} mục ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${audienceMeta.accentGradient} transition-all duration-300`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Compact Skill Distribution */}
            <div className="flex flex-wrap gap-1 pt-0.5">
              {activeTrackConfig.skillDistribution.slice(0, 4).map((sk) => (
                <span
                  key={sk.skill}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${sk.color}`} />
                  {sk.skill} {sk.percent}%
                </span>
              ))}
            </div>
          </div>

          {/* Step-by-Step Navigation List */}
          <nav
            aria-label="Lộ trình học tập theo từng mục"
            className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1"
          >
            <div className="px-2 py-1 flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Các mục học tuần tự
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                Bước {safeStepIdx + 1}/{activeTrackSteps.length}
              </span>
            </div>

            {activeTrackSteps.map((st) => {
              const autoPassed = isStepAutoPassed(st, effectiveProfile);
              const isLocked = !devUnlockAll && st.idx > currentAudienceUnlock && !autoPassed;
              const isDone = st.idx < currentAudienceUnlock || autoPassed;
              const isActive = safeStepIdx === st.idx;

              return (
                <button
                  key={st.code}
                  type="button"
                  disabled={isLocked}
                  onClick={() => onSelectStep(st.idx)}
                  className={`w-full text-left px-2.5 py-2.5 rounded-xl transition flex items-start gap-2.5 group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : isLocked
                      ? 'text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-75'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 transition ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isLocked
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        : isDone
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                        : 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400'
                    }`}
                  >
                    {isLocked ? (
                      <Lock className="w-3 h-3" />
                    ) : isDone ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      st.code
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-extrabold leading-snug">{st.label}</span>
                      {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-80" />}
                    </div>
                    {isActive && (
                      <p className="text-[11px] text-indigo-100 mt-1 leading-relaxed">
                        {st.description}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Quick Audience Switcher Card at Bottom of Sidebar (Admin only) */}
          {isAdminUser && (
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  Đổi đối tượng học
                </span>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                  1-Click
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {AUDIENCE_METADATA.map((aud) => {
                  const isSelected = effectiveProfile.audience === aud.id;
                  return (
                    <button
                      key={aud.id}
                      type="button"
                      onClick={() => onQuickSwitchAudience(aud.id)}
                      className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-[11px] font-bold border transition ${
                        isSelected
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700'
                          : 'bg-slate-50/70 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <span>{aud.emoji}</span>
                      <span className="truncate">{aud.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={onOpenProfileModal}
                className="w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition"
              >
                <Sliders className="w-3 h-3" />
                <span className="truncate">Tùy chỉnh ({audienceSubTag})</span>
              </button>
            </div>
          )}
        </aside>

        {/* FOCUSED MAIN CONTENT AREA */}
        <main className="flex-1 min-w-0 w-full space-y-5">
          {/* Compact Focused Step Context Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <span
                className={`px-2.5 py-1 rounded-lg text-xs font-black bg-gradient-to-r ${audienceMeta.accentGradient} text-white shrink-0`}
              >
                {currentStep.code}
              </span>
              <div className="min-w-0">
                <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
                  {currentStep.label}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {currentStep.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {safeStepIdx > 0 && (
                <button
                  type="button"
                  onClick={() => onSelectStep(safeStepIdx - 1)}
                  className="px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:border-indigo-400 transition"
                >
                  ← Mục trước
                </button>
              )}
              {safeStepIdx < activeTrackSteps.length - 1 && (
                <button
                  type="button"
                  disabled={
                    !devUnlockAll &&
                    safeStepIdx + 1 > currentAudienceUnlock &&
                    !isStepAutoPassed(activeTrackSteps[safeStepIdx + 1], effectiveProfile)
                  }
                  onClick={() => onSelectStep(safeStepIdx + 1)}
                  className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold hover:bg-indigo-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Mục tiếp →
                </button>
              )}
            </div>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  BookOpenCheck,
  Download,
  Eye,
  Flame,
  Lock,
  LogOut,
  Moon,
  Shield,
  Sliders,
  Sparkles,
  Sun,
  Trophy,
  Unlock,
  Volume2,
} from 'lucide-react';
import {
  AUDIENCE_METADATA,
  type AudienceId,
  type AudienceMetadataItem,
  type LearnerProfile,
} from '../../../types/audience';
import type { UserAccount, UserProgress } from '../../../types/learning';
import { AUDIENCE_IMAGE_MAP } from '../../../utils/flashcardMedia';
import { ParentGate } from '../../preschool/shell/ParentGate';
import type { AgeTier } from '../theme/ageTiers';
import { AppButton } from '../ui/Button';
import { AppCard } from '../ui/Card';
import { ListItem } from '../ui/ListItem';

export interface MeScreenProps {
  tier: AgeTier;
  currentUser: UserAccount;
  effectiveProfile: LearnerProfile;
  audienceMeta: AudienceMetadataItem;
  audienceSubTag: string;
  progress: UserProgress;
  darkMode: boolean;
  devUnlockAll: boolean;
  isAdminUser: boolean;
  isDevUser: boolean;
  adminPreviewAudience: AudienceId | null;
  onToggleAccent: () => void;
  onToggleDarkMode: () => void;
  onToggleDevUnlock: () => void;
  onQuickSwitchAudience: (aud: AudienceId) => void;
  onChangeAdminPreview: (aud: AudienceId | null) => void;
  onOpenProfileModal: () => void;
  onOpenWorkbookStudio: () => void;
  onOpenAdminModal: () => void;
  onExportData: () => void;
  onLogout: () => void;
}

export const MeScreen: React.FC<MeScreenProps> = ({
  tier,
  currentUser,
  effectiveProfile,
  audienceMeta,
  audienceSubTag,
  progress,
  darkMode,
  devUnlockAll,
  isAdminUser,
  isDevUser,
  adminPreviewAudience,
  onToggleAccent,
  onToggleDarkMode,
  onToggleDevUnlock,
  onQuickSwitchAudience,
  onChangeAdminPreview,
  onOpenProfileModal,
  onOpenWorkbookStudio,
  onOpenAdminModal,
  onExportData,
  onLogout,
}) => {
  const isPlayful = tier === 'playful';
  const [parentGateOpen, setParentGateOpen] = useState(false);
  const [parentUnlocked, setParentUnlocked] = useState(!isPlayful || isAdminUser);
  const [showExtraTools, setShowExtraTools] = useState(false);
  const [showAdminTools, setShowAdminTools] = useState(false);

  const avgPronunciation =
    progress.pronunciationScores.length > 0
      ? Math.round(
          progress.pronunciationScores.reduce((a, b) => a + b, 0) /
            progress.pronunciationScores.length
        )
      : null;

  return (
    <div className="space-y-5">
      {/* Profile Card */}
      <AppCard tier={tier} className="p-5 flex items-center gap-4">
        <img
          src={AUDIENCE_IMAGE_MAP[audienceMeta.id]}
          alt={audienceMeta.shortLabel}
          className="w-16 h-16 rounded-2xl bg-brand-soft p-1.5 object-contain shrink-0 border border-slate-200 dark:border-slate-700"
        />
        <div className="min-w-0 flex-1">
          <h2
            className={`text-lg font-extrabold truncate ${
              isPlayful ? 'text-[#123A6F]' : 'text-slate-900 dark:text-white'
            }`}
          >
            {currentUser.displayName}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {currentUser.email}
          </p>
          <div className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft text-brand text-xs font-extrabold">
            <span>{audienceMeta.emoji}</span>
            <span>{audienceMeta.shortLabel}</span>
            <span>· {audienceSubTag}</span>
          </div>
        </div>
      </AppCard>

      {/* Compact Stats */}
      <div className="grid grid-cols-3 gap-2.5"> {/* ui-ok: 3-stat strip */}
        <AppCard tier={tier} className="p-3.5 text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-black text-brand">
            <Trophy className="w-4 h-4" />
            <span>{progress.xp}</span>
          </div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">Điểm XP</p>
        </AppCard>

        <AppCard tier={tier} className="p-3.5 text-center">
          <div className="flex items-center justify-center gap-1 text-lg font-black text-orange-500">
            <Flame className="w-4 h-4" />
            <span>{progress.streakDays}d</span>
          </div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">Chuỗi ngày</p>
        </AppCard>

        <AppCard tier={tier} className="p-3.5 text-center">
          <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            {avgPronunciation !== null ? `${avgPronunciation}%` : progress.savedWords.length}
          </div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
            {avgPronunciation !== null ? 'Phát âm TB' : 'Từ đã lưu'}
          </p>
        </AppCard>
      </div>

      {/* Kids Parent Gate for settings & account tools */}
      {isPlayful && !parentUnlocked ? (
        <AppCard tier="playful" className="p-5 text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FFF3B8] text-[#9A5600] flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#123A6F]">
              Khu vực dành cho Phụ huynh
            </h3>
            <p className="text-xs font-bold text-[#486B94] mt-0.5">
              Chỉnh mục tiêu học, xuất sách PDF hoặc đăng xuất tài khoản.
            </p>
          </div>
          <AppButton tier="playful" onClick={() => setParentGateOpen(true)}>
            Mở khóa Phụ huynh
          </AppButton>
        </AppCard>
      ) : (
        <>
          {/* Learning Settings */}
          <section className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 px-1">
              Học tập & Giao diện
            </h3>
            <AppCard tier={tier} className="divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
              {(isAdminUser || isPlayful) && (
                <ListItem
                  icon={<Sliders className="w-5 h-5" />}
                  title="Tùy chỉnh mục tiêu & lộ trình"
                  subtitle={`Hiện tại: ${audienceMeta.shortLabel} (${audienceSubTag})`}
                  onClick={onOpenProfileModal}
                />
              )}

              <ListItem
                icon={<Volume2 className="w-5 h-5" />}
                iconBg="bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400"
                title="Giọng phát âm"
                subtitle="Chuyển đổi giữa Anh-Mỹ và Anh-Anh"
                value={progress.accent === 'en-US' ? '🇺🇸 US' : '🇬🇧 UK'}
                onClick={onToggleAccent}
              />

              {!isPlayful && (
                <ListItem
                  icon={darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  iconBg="bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400"
                  title="Giao diện Sáng / Tối"
                  subtitle={darkMode ? 'Đang bật chế độ tối' : 'Đang bật chế độ sáng'}
                  value={darkMode ? 'Tối' : 'Sáng'}
                  onClick={onToggleDarkMode}
                />
              )}
            </AppCard>
          </section>

          {/* Optional Study Utilities (collapsed by default so main menu stays clean) */}
          <AppCard tier={tier} className="overflow-hidden">
            <button
              type="button"
              onClick={() => setShowExtraTools((v) => !v)}
              className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
            >
              <span>Tiện ích &amp; Sao lưu dữ liệu</span>
              <span className="text-brand">{showExtraTools ? 'Thu gọn' : 'Mở'}</span>
            </button>
            {showExtraTools && (
              <div className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800">
                <ListItem
                  icon={<BookOpenCheck className="w-5 h-5" />}
                  iconBg="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                  title="Xuất Sách Bài Tập PDF"
                  subtitle="Tạo vở bài tập in A4 kèm đáp án"
                  onClick={onOpenWorkbookStudio}
                />
                <ListItem
                  icon={<Download className="w-5 h-5" />}
                  iconBg="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"
                  title="Sao lưu dữ liệu (JSON)"
                  subtitle="Tải về tiến độ và từ vựng đã lưu"
                  onClick={onExportData}
                />
              </div>
            )}
          </AppCard>

          {/* Admin / Dev Tools (collapsed until toggled) */}
          {(isAdminUser || isDevUser) && (
            <AppCard tier={tier} className="overflow-hidden">
              <button
                type="button"
                onClick={() => setShowAdminTools((v) => !v)}
                className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between text-left text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand" />
                  <span>Công cụ Quản trị</span>
                </span>
                <span className="text-brand">{showAdminTools ? 'Thu gọn' : 'Mở'}</span>
              </button>
              {showAdminTools && (
                <div className="p-4 pt-3 space-y-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Đổi nhanh đối tượng học
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {AUDIENCE_METADATA.map((aud) => {
                        const active = effectiveProfile.audience === aud.id;
                        return (
                          <button
                            key={aud.id}
                            type="button"
                            onClick={() => onQuickSwitchAudience(aud.id)}
                            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 transition ${
                              active
                                ? 'bg-brand text-white border-brand shadow-xs'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <span>{aud.emoji}</span>
                            <span className="truncate">{aud.shortLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {isDevUser && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/70 dark:bg-violet-950/40">
                        <Eye className="w-4 h-4 text-violet-600 dark:text-violet-300 shrink-0" />
                        <select
                          value={adminPreviewAudience || ''}
                          onChange={(e) =>
                            onChangeAdminPreview((e.target.value || null) as AudienceId | null)
                          }
                          className="bg-transparent outline-none text-xs font-bold text-violet-800 dark:text-violet-200 w-full cursor-pointer"
                        >
                          <option value="">Xem như: Hồ sơ gốc</option>
                          {AUDIENCE_METADATA.map((aud) => (
                            <option key={aud.id} value={aud.id}>
                              {aud.emoji} Xem như: {aud.shortLabel}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={onToggleDevUnlock}
                          className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 transition ${
                            devUnlockAll
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                              : 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300'
                          }`}
                        >
                          {devUnlockAll ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                          <span>{devUnlockAll ? 'Đang mở hết lộ trình' : 'Mở khóa từng bước'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={onOpenAdminModal}
                          className="min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center gap-2"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Bảng quản trị Admin</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </AppCard>
          )}

          {/* Account */}
          <AppCard tier={tier} className="overflow-hidden">
            <ListItem
              icon={<LogOut className="w-5 h-5" />}
              iconBg="bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400"
              title="Đăng xuất tài khoản"
              danger
              onClick={onLogout}
            />
          </AppCard>
        </>
      )}

      <ParentGate
        isOpen={parentGateOpen}
        onClose={() => setParentGateOpen(false)}
        onUnlock={() => {
          setParentGateOpen(false);
          setParentUnlocked(true);
        }}
      />
    </div>
  );
};

import React, { useState } from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  RefreshCw,
  RotateCcw,
  Shield,
  Sparkles,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { UserAccount } from '../types/learning';
import { callGeminiTextWithMeta } from '../utils/geminiClient';
import {
  deleteUserAccount,
  getAccounts,
  isDevAccount,
  loadProgress,
  resetUserPassword,
  resetUserProgress,
  saveGlobalApiKey,
} from '../utils/storage';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  globalApiKey: string;
  onApiKeyChange: (key: string) => void;
  currentEmail: string;
  onResetCurrentProgress: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  globalApiKey,
  onApiKeyChange,
  currentEmail,
  onResetCurrentProgress,
}) => {
  const [keyDraft, setKeyDraft] = useState(globalApiKey);
  const [showKey, setShowKey] = useState(false);
  const [accounts, setAccounts] = useState<UserAccount[]>(() => getAccounts());
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [testingKey, setTestingKey] = useState(false);

  if (!isOpen) return null;

  const refreshAccounts = () => setAccounts(getAccounts());

  const handleSaveKey = () => {
    const clean = keyDraft.trim();
    saveGlobalApiKey(clean);
    onApiKeyChange(clean);
    setStatusMsg(
      clean
        ? '✅ Đã lưu Gemini API Key dùng chung cho toàn bộ hệ thống.'
        : 'ℹ️ Đã xóa Gemini API Key dùng chung.'
    );
  };

  const handleTestKey = async () => {
    const clean = keyDraft.trim();
    if (!clean) {
      setStatusMsg('⚠️ Hãy nhập API Key trước khi kiểm tra.');
      return;
    }
    setTestingKey(true);
    setStatusMsg(null);
    try {
      const { text, model } = await callGeminiTextWithMeta(clean, 'Reply ONLY with: OK');
      setStatusMsg(`✅ Kết nối thành công tới Gemini AI (${model})! Phản hồi: "${text.slice(0, 60)}"`);
    } catch (err: any) {
      setStatusMsg(`❌ Lỗi kết nối Key: ${err?.message || 'Không xác định'}`);
    } finally {
      setTestingKey(false);
    }
  };

  const handleResetProgress = (email: string) => {
    resetUserProgress(email);
    if (email.toLowerCase() === currentEmail.toLowerCase()) {
      onResetCurrentProgress();
    }
    refreshAccounts();
    setStatusMsg(`✅ Đã reset toàn bộ tiến độ học của tài khoản "${email}".`);
  };

  const handleResetPassword = async (email: string) => {
    const ok = await resetUserPassword(email, '123456');
    if (ok) {
      setStatusMsg(`🔑 Đã đặt lại mật khẩu của "${email}" thành: 123456`);
    }
  };

  const handleDeleteAccount = (email: string) => {
    if (deleteUserAccount(email)) {
      refreshAccounts();
      setStatusMsg(`🗑️ Đã xóa tài khoản "${email}".`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Quản Trị Hệ Thống (Admin Dev)
              </h2>
              <p className="text-xs text-slate-500">
                Cấu hình Gemini API Key dùng chung & quản lý reset tài khoản học viên
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {statusMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Section 1: Global API Key */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4" /> Cấu hình Gemini API Key dùng chung
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                globalApiKey
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {globalApiKey ? 'Đã gán Key' : 'Chưa cấu hình'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[220px]">
              <input
                type={showKey ? 'text' : 'password'}
                value={keyDraft}
                onChange={(e) => setKeyDraft(e.target.value)}
                placeholder="Nhập Gemini API Key (AIza...) để gán cho toàn bộ app"
                className="w-full pr-9 pl-3.5 py-2 rounded-xl border border-indigo-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                title={showKey ? 'Ẩn API Key' : 'Hiện API Key'}
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button
              onClick={handleSaveKey}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
            >
              Lưu & Gán API Key
            </button>
            <button
              onClick={handleTestKey}
              disabled={testingKey}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              {testingKey ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              Kiểm tra kết nối Key
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            Học viên ở giao diện học sẽ chỉ thấy các nút tính năng AI (chấm bài, tạo đề theo nghề nghiệp) mà không thấy ô nhập API Key.
          </p>
        </div>

        {/* Section 2: User Account Management & Reset */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Danh sách tài khoản trên hệ thống ({accounts.length})
            </span>
            <button
              onClick={refreshAccounts}
              className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1 hover:underline"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Làm mới
            </button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {accounts.map((acc) => {
              const p = loadProgress(acc.email);
              const isAdmin = isDevAccount(acc.email);
              return (
                <div
                  key={acc.email}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs sm:text-sm text-slate-900 dark:text-white">
                        {acc.displayName}
                      </strong>
                      {isAdmin && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-700">
                          ADMIN DEV
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {acc.email} • Bước mở khóa: <strong>{p.unlockedStepIndex}</strong> • {p.xp} XP • {p.completedLessons.length} bài từ vựng
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      onClick={() => handleResetProgress(acc.email)}
                      className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold inline-flex items-center gap-1"
                      title="Đưa tiến độ học về Bước 1A ban đầu"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset tiến độ
                    </button>
                    {!isAdmin && (
                      <>
                        <button
                          onClick={() => handleResetPassword(acc.email)}
                          className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-[11px] font-bold"
                          title="Đặt lại mật khẩu về 123456"
                        >
                          Reset MK (123456)
                        </button>
                        <button
                          onClick={() => handleDeleteAccount(acc.email)}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                          title="Xóa tài khoản này"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

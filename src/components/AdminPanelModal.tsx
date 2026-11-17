import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Database,
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
import {
  adminDeleteUser,
  adminResetUserPassword,
  adminResetUserProgress,
  AdminUserSummary,
  fetchAdminOverview,
  isDevAccount,
  saveAdminApiKey,
  testAdminApiKey,
} from '../utils/storage';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  hasApiKey: boolean;
  onApiKeyStatusChange: (hasKey: boolean) => void;
  currentEmail: string;
  onResetCurrentProgress: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  hasApiKey,
  onApiKeyStatusChange,
  currentEmail,
  onResetCurrentProgress,
}) => {
  const [keyDraft, setKeyDraft] = useState('');
  const [maskedKey, setMaskedKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [users, setUsers] = useState<AdminUserSummary[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [testingKey, setTestingKey] = useState(false);

  const loadOverview = async () => {
    setLoadingList(true);
    try {
      const data = await fetchAdminOverview();
      setUsers(data.users);
      setMaskedKey(data.maskedApiKey);
      onApiKeyStatusChange(data.hasApiKey);
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Không tải được dữ liệu SQLite Admin.'}`);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadOverview();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveKey = async () => {
    try {
      const clean = keyDraft.trim();
      const res = await saveAdminApiKey(clean);
      setMaskedKey(res.maskedApiKey);
      onApiKeyStatusChange(res.hasApiKey);
      setKeyDraft('');
      setStatusMsg(
        res.hasApiKey
          ? `✅ Đã lưu an toàn Gemini API Key (${res.maskedApiKey}) vào SQLite Server.`
          : 'ℹ️ Đã xóa Gemini API Key khỏi SQLite Server.'
      );
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Lưu API Key thất bại.'}`);
    }
  };

  const handleTestKey = async () => {
    setTestingKey(true);
    setStatusMsg(null);
    try {
      const res = await testAdminApiKey(keyDraft.trim());
      setStatusMsg(`✅ Kết nối thành công từ Server tới Gemini AI (${res.model})! Phản hồi: "${res.text.slice(0, 60)}"`);
    } catch (err: any) {
      setStatusMsg(`❌ Lỗi kết nối Key: ${err?.message || 'Không xác định'}`);
    } finally {
      setTestingKey(false);
    }
  };

  const handleResetProgress = async (email: string) => {
    try {
      await adminResetUserProgress(email);
      if (email.toLowerCase() === currentEmail.toLowerCase()) {
        onResetCurrentProgress();
      }
      await loadOverview();
      setStatusMsg(`✅ Đã reset toàn bộ tiến độ SQLite của "${email}" về Bước 1A.`);
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Reset tiến độ thất bại.'}`);
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      await adminResetUserPassword(email, '123456');
      setStatusMsg(`🔑 Đã đặt lại mật khẩu SQLite của "${email}" thành: 123456`);
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Reset mật khẩu thất bại.'}`);
    }
  };

  const handleDeleteAccount = async (email: string) => {
    try {
      await adminDeleteUser(email);
      await loadOverview();
      setStatusMsg(`🗑️ Đã xóa tài khoản "${email}" và dữ liệu liên quan khỏi SQLite.`);
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Xóa tài khoản thất bại.'}`);
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
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Quản Trị Hệ Thống (SQLite Admin)</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                  <Database className="w-3 h-3" /> SQLite DB
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                API Key được lưu bảo mật trên Server & quản lý trực tiếp bảng tài khoản SQL
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

        {/* Section 1: Global Server API Key */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-extrabold uppercase text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4" /> Cấu hình Gemini API Key (Bảo mật Server)
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                hasApiKey
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {hasApiKey ? `Đã gán Key (${maskedKey})` : 'Chưa cấu hình'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative w-full sm:flex-1 sm:min-w-[220px]">
              <input
                type={showKey ? 'text' : 'password'}
                value={keyDraft}
                onChange={(e) => setKeyDraft(e.target.value)}
                placeholder={
                  hasApiKey
                    ? 'Nhập Key mới để thay đổi (hoặc để trống rồi bấm Lưu để xóa)'
                    : 'Nhập Gemini API Key để lưu trên Server SQLite'
                }
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
              Lưu vào SQLite
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
            API Key được lưu trong bảng <code>app_settings</code> của SQLite và gọi qua proxy <code>/api/ai/generate</code> — trình duyệt học viên không bao giờ thấy được Key này.
          </p>
        </div>

        {/* Section 2: SQLite Users Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Bảng Tài khoản SQLite ({users.length})
            </span>
            <button
              onClick={loadOverview}
              disabled={loadingList}
              className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1 hover:underline"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingList ? 'animate-spin' : ''}`} /> Làm mới
            </button>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {users.map((acc) => {
              const isAdmin = acc.role === 'admin' || isDevAccount(acc.email);
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
                      {acc.email} • Bước mở khóa: <strong>{acc.unlockedStepIndex}</strong> • {acc.xp} XP • {acc.completedLessonsCount} bài từ vựng
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
                          title="Xóa tài khoản này khỏi SQLite"
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

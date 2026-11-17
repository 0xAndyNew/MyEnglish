import React, { useEffect, useState } from 'react';
import {
  BookPlus,
  CheckCircle2,
  Database,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  PlusCircle,
  RefreshCw,
  RotateCcw,
  Shield,
  Sparkles,
  Trash2,
  Users,
  X,
} from 'lucide-react';
import { CefrLevel } from '../types/learning';
import { callGeminiText } from '../utils/geminiClient';
import {
  adminCreateCustomLesson,
  adminDeleteCustomLesson,
  adminDeleteUser,
  adminResetUserPassword,
  adminResetUserProgress,
  AdminUserSummary,
  CustomLessonKind,
  CustomLessonRecord,
  fetchAdminOverview,
  fetchCustomLessons,
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
  onCustomLessonsChange?: (lessons: CustomLessonRecord[]) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  hasApiKey,
  onApiKeyStatusChange,
  currentEmail,
  onResetCurrentProgress,
  onCustomLessonsChange,
}) => {
  const [activeTab, setActiveTab] = useState<'system' | 'lessons'>('system');

  // Tab 1: API Key & Users
  const [keyDraft, setKeyDraft] = useState('');
  const [maskedKey, setMaskedKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [users, setUsers] = useState<AdminUserSummary[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [testingKey, setTestingKey] = useState(false);

  // Tab 2: Custom Lessons Manager
  const [customLessons, setCustomLessons] = useState<CustomLessonRecord[]>([]);
  const [lessonKind, setLessonKind] = useState<CustomLessonKind>('sentence');
  const [lessonLevel, setLessonLevel] = useState<CefrLevel>('A2');
  const [savingLesson, setSavingLesson] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiFilling, setAiFilling] = useState(false);

  // Shared fields by kind
  const [titleInput, setTitleInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('Giao tiếp & Công việc');
  const [viInput, setViInput] = useState('');
  const [enInput, setEnInput] = useState('');
  const [hintInput, setHintInput] = useState('');
  // Listening quiz fields
  const [quizQ, setQuizQ] = useState('');
  const [quizOptA, setQuizOptA] = useState('');
  const [quizOptB, setQuizOptB] = useState('');
  const [quizOptC, setQuizOptC] = useState('');
  const [quizCorrect, setQuizCorrect] = useState(0);
  // Roleplay fields
  const [contextInput, setContextInput] = useState('');

  const loadAllAdminData = async () => {
    setLoadingList(true);
    try {
      const [overview, lessons] = await Promise.all([fetchAdminOverview(), fetchCustomLessons()]);
      setUsers(overview.users);
      setMaskedKey(overview.maskedApiKey);
      onApiKeyStatusChange(overview.hasApiKey);
      setCustomLessons(lessons);
      onCustomLessonsChange?.(lessons);
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Không tải được dữ liệu SQLite Admin.'}`);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAllAdminData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const clearLessonForm = () => {
    setTitleInput('');
    setViInput('');
    setEnInput('');
    setHintInput('');
    setQuizQ('');
    setQuizOptA('');
    setQuizOptB('');
    setQuizOptC('');
    setQuizCorrect(0);
    setContextInput('');
  };

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
      setStatusMsg(`✅ Kết nối thành công tới Gemini AI (${res.model})! Phản hồi: "${res.text.slice(0, 60)}"`);
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
      await loadAllAdminData();
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
      await loadAllAdminData();
      setStatusMsg(`🗑️ Đã xóa tài khoản "${email}" khỏi SQLite.`);
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Xóa tài khoản thất bại.'}`);
    }
  };

  const handleAiAutoFillLesson = async () => {
    if (!hasApiKey) {
      setStatusMsg('⚠️ Hãy cấu hình Gemini API Key ở tab "API Key & Tài khoản" trước để dùng AI tạo nhanh!');
      return;
    }
    const topic = aiTopic.trim() || 'Giao tiếp công việc & đời sống';
    setAiFilling(true);
    setStatusMsg(null);
    try {
      let prompt = '';
      if (lessonKind === 'sentence') {
        prompt = `Tạo 1 bài ghép câu tiếng Anh trình độ ${lessonLevel} về chủ đề "${topic}". Trả về JSON thuần: {"vi":"Câu tiếng Việt","en":"English sentence without ending punctuation","hint":"Gợi ý ngắn bằng tiếng Việt"}`;
      } else if (lessonKind === 'listening') {
        prompt = `Tạo 1 bài Nghe & Đọc trình độ ${lessonLevel} về chủ đề "${topic}". Trả về JSON thuần: {"title":"Tiêu đề tiếng Việt","transcript":"Đoạn tiếng Anh 3 câu","translation":"Bản dịch tiếng Việt","q":"Câu hỏi tiếng Anh","options":["Đáp án A","Đáp án B","Đáp án C"],"correctIdx":0}`;
      } else if (lessonKind === 'roleplay') {
        prompt = `Tạo 1 tình huống hội thoại giao tiếp trình độ ${lessonLevel} về chủ đề "${topic}". Trả về JSON thuần: {"title":"Tên tình huống ngắn","context":"Mô tả ngữ cảnh tiếng Việt","aiEn":"Câu người đối thoại nói bằng tiếng Anh","aiVi":"Nghĩa tiếng Việt","replyEn":"Câu gợi ý người học đáp lại bằng tiếng Anh","replyVi":"Nghĩa câu đáp tiếng Việt"}`;
      } else {
        prompt = `Tạo 1 bài luyện viết song ngữ Việt-Anh trình độ ${lessonLevel} cho công việc "${topic}". Trả về JSON thuần: {"title":"Tiêu đề ngắn","vi":"Đoạn tiếng Việt 2 câu","en":"Bản dịch tiếng Anh chuẩn 2 câu"}`;
      }
      const raw = await callGeminiText('SERVER', prompt);
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) throw new Error('AI không trả về đúng JSON.');
      const parsed = JSON.parse(match[0]);

      if (lessonKind === 'sentence') {
        setViInput(parsed.vi || '');
        setEnInput(parsed.en || '');
        setHintInput(parsed.hint || '');
      } else if (lessonKind === 'listening') {
        setTitleInput(parsed.title || '');
        setEnInput(parsed.transcript || '');
        setViInput(parsed.translation || '');
        setQuizQ(parsed.q || '');
        setQuizOptA(parsed.options?.[0] || '');
        setQuizOptB(parsed.options?.[1] || '');
        setQuizOptC(parsed.options?.[2] || '');
        setQuizCorrect(Number(parsed.correctIdx || 0));
      } else if (lessonKind === 'roleplay') {
        setTitleInput(parsed.title || '');
        setContextInput(parsed.context || '');
        setEnInput(parsed.aiEn || '');
        setViInput(parsed.aiVi || '');
        setQuizOptA(parsed.replyEn || '');
        setQuizOptB(parsed.replyVi || '');
      } else {
        setTitleInput(parsed.title || '');
        setViInput(parsed.vi || '');
        setEnInput(parsed.en || '');
      }
      setStatusMsg('✨ AI đã điền sẵn nội dung bài học! Bạn có thể chỉnh sửa rồi bấm "Lưu bài học vào SQLite".');
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Không tạo được mẫu bằng AI.'}`);
    } finally {
      setAiFilling(false);
    }
  };

  const handleSaveCustomLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingLesson(true);
    setStatusMsg(null);
    try {
      let payload: Record<string, any> = {};
      if (lessonKind === 'sentence') {
        if (!viInput.trim() || !enInput.trim()) {
          throw new Error('Vui lòng nhập đủ câu tiếng Việt và câu tiếng Anh.');
        }
        payload = {
          level: lessonLevel,
          topic: categoryInput || 'Giao tiếp & Công việc',
          vi: viInput.trim(),
          en: enInput.trim().replace(/[.!?]+$/, ''),
          hint: hintInput.trim() || 'Ghép theo trật tự S + V + O chuẩn.',
        };
      } else if (lessonKind === 'listening') {
        if (!titleInput.trim() || !enInput.trim()) {
          throw new Error('Vui lòng nhập Tiêu đề và Nội dung tiếng Anh.');
        }
        payload = {
          level: lessonLevel,
          category: categoryInput === 'Bài đọc cơ bản' || categoryInput === 'Hội thoại đời sống'
            ? categoryInput
            : 'Giao tiếp công việc',
          title: `⭐ ${titleInput.trim()}`,
          sourceStyle: 'Admin Custom • SQLite',
          transcript: enInput.trim(),
          translation: viInput.trim() || 'Bản dịch tự bổ sung.',
          keyPhrases: [],
          question: {
            q: quizQ.trim() || 'Did you understand the audio?',
            options: [
              quizOptA.trim() || 'Yes, clearly',
              quizOptB.trim() || 'Need another listen',
              quizOptC.trim() || 'Not mentioned',
            ],
            correctIdx: quizCorrect,
          },
        };
      } else if (lessonKind === 'roleplay') {
        if (!titleInput.trim() || !enInput.trim() || !quizOptA.trim()) {
          throw new Error('Vui lòng nhập Tên tình huống, Câu AI nói và Câu gợi ý đáp lại.');
        }
        payload = {
          title: `⭐ ${titleInput.trim()}`,
          level: lessonLevel,
          context: contextInput.trim() || 'Tình huống hội thoại giao tiếp thực tế do Admin thêm.',
          turns: [
            {
              speaker: 'AI',
              en: enInput.trim(),
              ipa: '',
              vi: viInput.trim() || '',
              suggestedReplies: [
                {
                  en: quizOptA.trim(),
                  ipa: '',
                  vi: quizOptB.trim() || '',
                },
              ],
            },
          ],
        };
      } else {
        if (!titleInput.trim() || !viInput.trim() || !enInput.trim()) {
          throw new Error('Vui lòng nhập Tiêu đề, Đoạn tiếng Việt và Đoạn tiếng Anh.');
        }
        const wordsEn = enInput
          .trim()
          .toLowerCase()
          .replace(/[^a-z\s]/g, '')
          .split(/\s+/)
          .filter((w) => w.length >= 4)
          .slice(0, 6);
        const wordsVi = viInput
          .trim()
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w.length >= 3)
          .slice(0, 5);
        payload = {
          level: lessonLevel,
          category:
            categoryInput === 'IT / Kỹ thuật' ||
            categoryInput === 'Kinh doanh & CSKH' ||
            categoryInput === 'Phỏng vấn & Nhân sự' ||
            categoryInput === 'Dịch vụ & Đời sống'
              ? categoryInput
              : 'Văn phòng & Email',
          title: `⭐ ${titleInput.trim()}`,
          vi: viInput.trim(),
          en: enInput.trim(),
          keywordsEn: wordsEn,
          keywordsVi: wordsVi,
        };
      }

      await adminCreateCustomLesson(lessonKind, payload);
      clearLessonForm();
      await loadAllAdminData();
      setStatusMsg('✅ Đã lưu bài học mới vào SQLite! Bài học đã hiển thị ngay ở giao diện học.');
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Không lưu được bài học.'}`);
    } finally {
      setSavingLesson(false);
    }
  };

  const handleDeleteCustomLesson = async (id: string) => {
    try {
      await adminDeleteCustomLesson(id);
      await loadAllAdminData();
      setStatusMsg('🗑️ Đã xóa bài học tùy chỉnh khỏi SQLite.');
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Xóa bài học thất bại.'}`);
    }
  };

  const kindLabels: Record<CustomLessonKind, string> = {
    sentence: '🧩 Lab Ghép Câu',
    listening: '🎧 Nghe & Đọc',
    roleplay: '💬 Hội thoại',
    writing: '✍️ Viết Song Ngữ',
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-4xl w-full max-h-[92vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-4 sm:p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                <span>Quản Trị Hệ Thống</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                  <Database className="w-3 h-3" /> SQLite DB
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Quản lý API Key, Tài khoản học viên & Thêm bài học mới trực tiếp vào CSDL
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
              <button
                onClick={() => setActiveTab('system')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === 'system'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                ⚙️ API Key & Tài khoản
              </button>
              <button
                onClick={() => setActiveTab('lessons')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition inline-flex items-center gap-1 ${
                  activeTab === 'lessons'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <BookPlus className="w-3.5 h-3.5" /> Thêm Bài Học ({customLessons.length})
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {statusMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* TAB 1: API KEY & USERS */}
        {activeTab === 'system' && (
          <div className="space-y-5">
            {/* Global Server API Key */}
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
            </div>

            {/* SQLite Users Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> Bảng Tài khoản SQLite ({users.length})
                </span>
                <button
                  onClick={loadAllAdminData}
                  disabled={loadingList}
                  className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1 hover:underline"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingList ? 'animate-spin' : ''}`} /> Làm mới
                </button>
              </div>

              <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
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
                        >
                          <RotateCcw className="w-3 h-3" /> Reset tiến độ
                        </button>
                        {!isAdmin && (
                          <>
                            <button
                              onClick={() => handleResetPassword(acc.email)}
                              className="px-2.5 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-[11px] font-bold"
                            >
                              Reset MK (123456)
                            </button>
                            <button
                              onClick={() => handleDeleteAccount(acc.email)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
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
        )}

        {/* TAB 2: ADD & MANAGE CUSTOM LESSONS IN SQLITE */}
        {activeTab === 'lessons' && (
          <div className="space-y-5">
            <form onSubmit={handleSaveCustomLesson} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(kindLabels) as CustomLessonKind[]).map((k) => (
                    <button
                      type="button"
                      key={k}
                      onClick={() => {
                        setLessonKind(k);
                        clearLessonForm();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        lessonKind === k
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {kindLabels[k]}
                    </button>
                  ))}
                </div>

                <select
                  value={lessonLevel}
                  onChange={(e) => setLessonLevel(e.target.value as CefrLevel)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                >
                  {(['A1', 'A2', 'B1', 'B2'] as CefrLevel[]).map((lv) => (
                    <option key={lv} value={lv}>
                      Cấp {lv}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional AI Quick Fill */}
              <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 flex flex-wrap gap-2">
                <input
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  placeholder="Nhập chủ đề (vd: Phỏng vấn Sales, Đặt vé máy bay...) để AI điền nhanh mẫu"
                  className="w-full sm:flex-1 px-3 py-1.5 rounded-lg border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAiAutoFillLesson}
                  disabled={aiFilling}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  {aiFilling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  AI Soạn Nhanh
                </button>
              </div>

              {/* Kind-specific form inputs */}
              {lessonKind === 'sentence' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    value={viInput}
                    onChange={(e) => setViInput(e.target.value)}
                    placeholder="Nghĩa tiếng Việt (bắt buộc)"
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <input
                    value={enInput}
                    onChange={(e) => setEnInput(e.target.value)}
                    placeholder="Câu tiếng Anh chuẩn (không dấu câu cuối)"
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <input
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    placeholder="Chủ đề (vd: Giao tiếp & Công việc)"
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <input
                    value={hintInput}
                    onChange={(e) => setHintInput(e.target.value)}
                    placeholder="Gợi ý cấu trúc ngữ pháp"
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
              )}

              {lessonKind === 'listening' && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      placeholder="Tiêu đề bài Nghe & Đọc (bắt buộc)"
                      className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                    <select
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    >
                      <option value="Hội thoại đời sống">Hội thoại đời sống</option>
                      <option value="Bài đọc cơ bản">Bài đọc cơ bản</option>
                      <option value="Giao tiếp công việc">Giao tiếp công việc</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    value={enInput}
                    onChange={(e) => setEnInput(e.target.value)}
                    placeholder="Nội dung đoạn tiếng Anh để nghe & đọc (bắt buộc)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <textarea
                    rows={2}
                    value={viInput}
                    onChange={(e) => setViInput(e.target.value)}
                    placeholder="Bản dịch tiếng Việt"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <input
                      value={quizQ}
                      onChange={(e) => setQuizQ(e.target.value)}
                      placeholder="Câu hỏi hiểu bài (Anh)"
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                    <input
                      value={quizOptA}
                      onChange={(e) => setQuizOptA(e.target.value)}
                      placeholder="Đáp án A (đúng)"
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                    <input
                      value={quizOptB}
                      onChange={(e) => setQuizOptB(e.target.value)}
                      placeholder="Đáp án B"
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                    <input
                      value={quizOptC}
                      onChange={(e) => setQuizOptC(e.target.value)}
                      placeholder="Đáp án C"
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>
                </div>
              )}

              {lessonKind === 'roleplay' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    value={titleInput}
                    onChange={(e) => setTitleInput(e.target.value)}
                    placeholder="Tên tình huống hội thoại (bắt buộc)"
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <input
                    value={contextInput}
                    onChange={(e) => setContextInput(e.target.value)}
                    placeholder="Ngữ cảnh giao tiếp (tiếng Việt)"
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <input
                    value={enInput}
                    onChange={(e) => setEnInput(e.target.value)}
                    placeholder="Câu đối thoại tiếng Anh (bắt buộc)"
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <input
                    value={viInput}
                    onChange={(e) => setViInput(e.target.value)}
                    placeholder="Nghĩa câu đối thoại (Việt)"
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <input
                    value={quizOptA}
                    onChange={(e) => setQuizOptA(e.target.value)}
                    placeholder="Câu gợi ý người học đáp (Anh, bắt buộc)"
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <input
                    value={quizOptB}
                    onChange={(e) => setQuizOptB(e.target.value)}
                    placeholder="Nghĩa câu gợi ý đáp (Việt)"
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
              )}

              {lessonKind === 'writing' && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      value={titleInput}
                      onChange={(e) => setTitleInput(e.target.value)}
                      placeholder="Tiêu đề bài viết song ngữ (bắt buộc)"
                      className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                    <select
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    >
                      <option value="Văn phòng & Email">Văn phòng & Email</option>
                      <option value="IT / Kỹ thuật">IT / Kỹ thuật</option>
                      <option value="Kinh doanh & CSKH">Kinh doanh & CSKH</option>
                      <option value="Phỏng vấn & Nhân sự">Phỏng vấn & Nhân sự</option>
                      <option value="Dịch vụ & Đời sống">Dịch vụ & Đời sống</option>
                    </select>
                  </div>
                  <textarea
                    rows={2}
                    value={viInput}
                    onChange={(e) => setViInput(e.target.value)}
                    placeholder="Đoạn văn mẫu Tiếng Việt (bắt buộc)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                  <textarea
                    rows={2}
                    value={enInput}
                    onChange={(e) => setEnInput(e.target.value)}
                    placeholder="Bản dịch Tiếng Anh chuẩn tương ứng (bắt buộc)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingLesson}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  {savingLesson ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5" />}
                  💾 Lưu bài học vào SQLite
                </button>
              </div>
            </form>

            {/* Saved Custom Lessons List */}
            <div className="space-y-2">
              <div className="text-xs font-extrabold uppercase text-slate-600 dark:text-slate-300">
                Bài học Admin đã thêm trong SQLite ({customLessons.length})
              </div>
              {customLessons.length === 0 ? (
                <p className="text-xs text-slate-400">Chưa có bài học tùy chỉnh nào trong SQLite.</p>
              ) : (
                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                  {customLessons.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 text-indigo-700">
                            {kindLabels[item.kind]}
                          </span>
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {item.payload?.title || item.payload?.vi}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {item.payload?.en || item.payload?.transcript || ''}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteCustomLesson(item.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 shrink-0"
                        title="Xóa bài này khỏi SQLite"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

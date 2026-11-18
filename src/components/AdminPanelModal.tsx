import React, { useEffect, useState } from 'react';
import {
  BookPlus,
  CheckCircle2,
  Database,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Mic,
  Music,
  PlusCircle,
  RefreshCw,
  RotateCcw,
  Shield,
  Sparkles,
  Trash2,
  Upload,
  Users,
  Video,
  X,
} from 'lucide-react';
import {
  AUDIENCE_METADATA,
  AudienceId,
  createDefaultProfile,
  getAudienceMeta,
} from '../types/audience';
import { CefrLevel } from '../types/learning';
import { KIDS_UNITS } from '../data/kids/kidsCurriculumData';
import { extractYouTubeVideoId } from '../utils/kidsSongPlayer';
import { callGeminiText } from '../utils/geminiClient';
import { blobToBase64 } from '../utils/audioRecorder';
import { setServerSttProvider } from '../utils/speechEngine';
import {
  adminCreateCustomLesson,
  adminDeleteCustomLesson,
  adminDeleteKidsSongMedia,
  adminDeleteUser,
  adminResetUserPassword,
  adminResetUserProgress,
  adminSaveKidsSongMedia,
  adminUpdateSttSettings,
  adminUpdateUserProfile,
  adminWarmupSttModel,
  AdminUserSummary,
  CustomLessonKind,
  CustomLessonRecord,
  fetchAdminOverview,
  fetchCustomLessons,
  fetchKidsSongsMedia,
  isDevAccount,
  KidsSongMediaEntry,
  LocalSttStatus,
  saveAdminApiKey,
  SttProviderMode,
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
  const [sttProvider, setSttProvider] = useState<SttProviderMode>('auto');
  const [sttModel, setSttModel] = useState('Xenova/whisper-tiny.en');
  const [allowedSttModels, setAllowedSttModels] = useState<string[]>([
    'Xenova/whisper-tiny.en',
    'Xenova/whisper-base.en',
  ]);
  const [localStt, setLocalStt] = useState<LocalSttStatus | null>(null);
  const [savingStt, setSavingStt] = useState(false);
  const [warmingStt, setWarmingStt] = useState(false);

  // Kids Song Media Manager (Vocal MP3 / Audio URL / YouTube Kids)
  const [kidsSongsMedia, setKidsSongsMedia] = useState<Record<string, KidsSongMediaEntry>>({});
  const [selectedSongUnitId, setSelectedSongUnitId] = useState<string>(KIDS_UNITS[0]?.id || 'colors');
  const [songAudioUrlDraft, setSongAudioUrlDraft] = useState('');
  const [songYoutubeDraft, setSongYoutubeDraft] = useState('');
  const [songFileDraft, setSongFileDraft] = useState<{
    base64: string;
    fileName: string;
    mimeType: string;
    sizeKb: number;
  } | null>(null);
  const [savingSongMedia, setSavingSongMedia] = useState(false);

  // Tab 2: Custom Lessons Manager
  const [customLessons, setCustomLessons] = useState<CustomLessonRecord[]>([]);
  const [lessonKind, setLessonKind] = useState<CustomLessonKind>('sentence');
  const [lessonLevel, setLessonLevel] = useState<CefrLevel>('A2');
  const [lessonAudiences, setLessonAudiences] = useState<AudienceId[]>([]);
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
      const [overview, lessons, songsMedia] = await Promise.all([
        fetchAdminOverview(),
        fetchCustomLessons(),
        fetchKidsSongsMedia(),
      ]);
      setUsers(overview.users);
      setMaskedKey(overview.maskedApiKey);
      onApiKeyStatusChange(overview.hasApiKey);
      setSttProvider(overview.sttProvider || 'auto');
      setSttModel(overview.sttModel || 'Xenova/whisper-tiny.en');
      if (Array.isArray(overview.allowedSttModels) && overview.allowedSttModels.length > 0) {
        setAllowedSttModels(overview.allowedSttModels);
      }
      setLocalStt(overview.localStt || null);
      setServerSttProvider(overview.sttProvider || 'auto');
      setCustomLessons(lessons);
      onCustomLessonsChange?.(lessons);
      setKidsSongsMedia(songsMedia);
      const currentSong = songsMedia[selectedSongUnitId];
      setSongAudioUrlDraft(currentSong?.audioUrl || '');
      setSongYoutubeDraft(currentSong?.youtubeId || '');
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Không tải được dữ liệu SQLite Admin.'}`);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    const entry = kidsSongsMedia[selectedSongUnitId];
    setSongAudioUrlDraft(entry?.audioUrl || '');
    setSongYoutubeDraft(entry?.youtubeId || '');
    setSongFileDraft(null);
  }, [selectedSongUnitId]);

  useEffect(() => {
    if (isOpen) {
      loadAllAdminData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectSongFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 8.5 * 1024 * 1024) {
      setStatusMsg('❌ File nhạc bài hát quá lớn (vui lòng chọn file MP3/WAV <= 8.5 MB).');
      return;
    }
    try {
      const base64 = await blobToBase64(file);
      setSongFileDraft({
        base64,
        fileName: file.name,
        mimeType: file.type || 'audio/mpeg',
        sizeKb: Math.max(1, Math.round(file.size / 1024)),
      });
      setStatusMsg(`🎵 Đã chọn file "${file.name}" (${Math.round(file.size / 1024)} KB). Bấm "Lưu bài hát này" để tải lên.`);
    } catch {
      setStatusMsg('❌ Không đọc được file âm thanh đã chọn.');
    }
  };

  const handleSaveSongMedia = async () => {
    setSavingSongMedia(true);
    try {
      const res = await adminSaveKidsSongMedia({
        unitId: selectedSongUnitId,
        audioBase64: songFileDraft?.base64,
        fileName: songFileDraft?.fileName,
        mimeType: songFileDraft?.mimeType,
        audioUrl: songFileDraft ? undefined : songAudioUrlDraft.trim(),
        youtubeId: songYoutubeDraft.trim(),
      });
      setKidsSongsMedia(res.media);
      setSongAudioUrlDraft(res.entry?.audioUrl || '');
      setSongYoutubeDraft(res.entry?.youtubeId || '');
      setSongFileDraft(null);
      setStatusMsg(`✅ Đã lưu nhạc bài hát thật cho chủ đề "${selectedSongUnitId}".`);
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Lưu nhạc bài hát thất bại.'}`);
    } finally {
      setSavingSongMedia(false);
    }
  };

  const handleDeleteSongMedia = async (unitId: string) => {
    setSavingSongMedia(true);
    try {
      const res = await adminDeleteKidsSongMedia(unitId);
      setKidsSongsMedia(res.media);
      if (unitId === selectedSongUnitId) {
        setSongAudioUrlDraft('');
        setSongYoutubeDraft('');
        setSongFileDraft(null);
      }
      setStatusMsg(`ℹ️ Đã xóa nhạc ngoài của "${unitId}" (sử dụng lại nhạc đệm giai điệu gốc).`);
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Không thể xóa nhạc bài hát.'}`);
    } finally {
      setSavingSongMedia(false);
    }
  };

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

  const handleSaveSttSettings = async () => {
    setSavingStt(true);
    setStatusMsg(null);
    try {
      const res = await adminUpdateSttSettings(sttProvider, sttModel);
      setLocalStt(res.localStt);
      setServerSttProvider(res.sttProvider);
      setStatusMsg(
        `✅ Đã lưu cấu hình nhận diện giọng nói đa trình duyệt (${res.sttProvider} / ${res.sttModel}).`
      );
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Lưu cấu hình giọng nói thất bại.'}`);
    } finally {
      setSavingStt(false);
    }
  };

  const handleWarmupStt = async () => {
    setWarmingStt(true);
    setStatusMsg('⏳ Đang tải & khởi tạo model Whisper offline trên server (chỉ tải 1 lần)...');
    try {
      await adminUpdateSttSettings(sttProvider, sttModel);
      setServerSttProvider(sttProvider);
      const res = await adminWarmupSttModel(sttModel);
      setLocalStt(res.localStt);
      setStatusMsg(`✅ Model Whisper (${sttModel}) đã sẵn sàng chạy offline trên mọi trình duyệt!`);
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Không tải được model Whisper.'}`);
    } finally {
      setWarmingStt(false);
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

  const handleChangeUserAudience = async (email: string, nextAud: AudienceId) => {
    try {
      await adminUpdateUserProfile(email, createDefaultProfile(nextAud));
      await loadAllAdminData();
      const meta = getAudienceMeta(nextAud);
      setStatusMsg(`✅ Đã cập nhật nhóm đối tượng của "${email}" thành: ${meta.emoji} ${meta.label}`);
    } catch (err: any) {
      setStatusMsg(`❌ ${err?.message || 'Đổi nhóm đối tượng thất bại.'}`);
    }
  };

  const toggleLessonAudience = (aud: AudienceId) => {
    setLessonAudiences((prev) =>
      prev.includes(aud) ? prev.filter((a) => a !== aud) : [...prev, aud]
    );
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

      await adminCreateCustomLesson(lessonKind, payload, lessonAudiences);
      clearLessonForm();
      setLessonAudiences([]);
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

            {/* Cross-Browser Speech-to-Text Engine */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-900/50 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-extrabold uppercase text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  <Mic className="w-4 h-4" /> Nhận Diện Giọng Nói Đa Trình Duyệt (Local Whisper Offline)
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    localStt?.isLoaded
                      ? 'bg-emerald-100 text-emerald-800'
                      : localStt?.isTargetCached
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {localStt?.isLoaded
                    ? 'Đang chạy sẵn trên Server'
                    : localStt?.isTargetCached
                    ? 'Đã tải cache trên ổ đĩa'
                    : 'Chưa tải model (~41–75 MB lần đầu)'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Hỗ trợ Edge, Brave, Firefox, Safari và trình duyệt nhúng không cần Gemini API Key.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Chế độ nhận diện</label>
                  <select
                    value={sttProvider}
                    onChange={(e) => setSttProvider(e.target.value as SttProviderMode)}
                    className="w-full px-3 py-2 rounded-xl border border-emerald-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                  >
                    <option value="auto">Tự động (Chrome realtime, trình duyệt khác dùng Whisper)</option>
                    <option value="local">Luôn dùng Local Whisper Offline (mọi trình duyệt)</option>
                    <option value="gemini">Ưu tiên Gemini AI (lùi về Whisper khi lỗi/hết quota)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Model Whisper Offline</label>
                  <select
                    value={sttModel}
                    onChange={(e) => setSttModel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-emerald-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                  >
                    {allowedSttModels.map((m) => (
                      <option key={m} value={m}>
                        {m === 'Xenova/whisper-tiny.en'
                          ? 'Xenova/whisper-tiny.en (~41 MB — Rất nhanh)'
                          : 'Xenova/whisper-base.en (~75 MB — Chuẩn từ đơn hơn)'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleSaveSttSettings}
                  disabled={savingStt}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold disabled:opacity-50"
                >
                  {savingStt ? 'Đang lưu...' : 'Lưu cấu hình giọng nói'}
                </button>
                <button
                  onClick={handleWarmupStt}
                  disabled={warmingStt}
                  className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  {warmingStt ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  Tải trước & Khởi động model
                </button>
              </div>
            </div>

            {/* Kids Songs Real Vocal / YouTube Media Manager */}
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-900/50 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-extrabold uppercase text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <Music className="w-4 h-4" /> Nhạc Bài Hát Thiếu Nhi (12 Chủ Đề — Vocal MP3 / YouTube)
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/80 dark:bg-slate-900 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800">
                  Đã gắn giọng hát: {Object.keys(kidsSongsMedia).length}/{KIDS_UNITS.length} bài
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Mặc định ứng dụng đã tích hợp sẵn 12 bản nhạc đệm giai điệu gốc (Twinkle Twinkle, Old MacDonald, ABC Song...). Admin có thể tải lên file MP3/WAV có ca sĩ hát hoặc gắn link YouTube Kids cho từng bài.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
                {KIDS_UNITS.map((u) => {
                  const media = kidsSongsMedia[u.id];
                  const hasCustom = Boolean(media?.audioUrl || media?.youtubeId);
                  const selected = selectedSongUnitId === u.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => setSelectedSongUnitId(u.id)}
                      className={`px-2.5 py-2 rounded-xl text-left text-xs font-bold border transition flex items-center justify-between gap-1 ${
                        selected
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-amber-200/80 dark:border-slate-700 hover:bg-amber-100/60'
                      }`}
                    >
                      <span className="truncate">
                        {u.emoji} {u.title}
                      </span>
                      {hasCustom && (
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            selected ? 'bg-white' : 'bg-emerald-500'
                          }`}
                          title="Đã gắn nhạc giọng hát / YouTube"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {(() => {
                const activeSongUnit = KIDS_UNITS.find((u) => u.id === selectedSongUnitId) || KIDS_UNITS[0];
                const currentEntry = kidsSongsMedia[activeSongUnit.id];
                const parsedYtId = extractYouTubeVideoId(songYoutubeDraft);
                return (
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-700 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {activeSongUnit.emoji} {activeSongUnit.songChantTitle}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Giai điệu gốc: <strong>{activeSongUnit.originalTuneName || 'Nhạc thiếu nhi'}</strong>
                        </div>
                      </div>
                      {currentEntry?.audioUrl || currentEntry?.youtubeId ? (
                        <button
                          type="button"
                          onClick={() => handleDeleteSongMedia(activeSongUnit.id)}
                          disabled={savingSongMedia}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Xóa nhạc ngoài
                        </button>
                      ) : (
                        <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                          Đang dùng nhạc đệm Karaoke tích hợp sẵn
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300">
                          1. Tải file MP3/WAV ca sĩ hát (tối đa 8.5 MB)
                        </label>
                        <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-dashed border-amber-400 bg-amber-50/50 dark:bg-amber-950/20 text-xs font-bold text-amber-800 dark:text-amber-200 cursor-pointer hover:bg-amber-100/60">
                          <Upload className="w-4 h-4" />
                          <span>
                            {songFileDraft
                              ? `${songFileDraft.fileName} (${songFileDraft.sizeKb} KB)`
                              : currentEntry?.isUploaded
                              ? 'Thay thế file MP3/WAV hiện có'
                              : 'Chọn file MP3 / WAV / M4A từ máy'}
                          </span>
                          <input
                            type="file"
                            accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/mp4,.mp3,.wav,.m4a,.ogg"
                            onChange={handleSelectSongFile}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300">
                          2. Hoặc nhập Link file Audio trực tiếp (.mp3/.wav)
                        </label>
                        <input
                          type="text"
                          value={songAudioUrlDraft}
                          onChange={(e) => {
                            setSongAudioUrlDraft(e.target.value);
                            if (songFileDraft) setSongFileDraft(null);
                          }}
                          placeholder="https://.../song.mp3"
                          className="w-full px-3 py-2 rounded-xl border border-amber-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1">
                        <Video className="w-3.5 h-3.5 text-rose-500" /> 3. Link Video YouTube bài hát gốc (tùy chọn)
                      </label>
                      <input
                        type="text"
                        value={songYoutubeDraft}
                        onChange={(e) => setSongYoutubeDraft(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=... hoặc YouTube Video ID"
                        className="w-full px-3 py-2 rounded-xl border border-amber-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      {songYoutubeDraft.trim() && (
                        <div className="text-[11px] font-semibold">
                          {parsedYtId ? (
                            <span className="text-emerald-600">✓ Video ID hợp lệ: {parsedYtId}</span>
                          ) : (
                            <span className="text-rose-600">✗ Link/ID YouTube chưa đúng định dạng</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveSongMedia}
                        disabled={savingSongMedia}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {savingSongMedia ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Music className="w-3.5 h-3.5" />}
                        Lưu bài hát này
                      </button>
                      {songFileDraft && (
                        <button
                          type="button"
                          onClick={() => setSongFileDraft(null)}
                          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300"
                        >
                          Bỏ file đang chọn
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}
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
                  const audMeta = acc.audience ? getAudienceMeta(acc.audience) : null;
                  return (
                    <div
                      key={acc.email}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <strong className="text-xs sm:text-sm text-slate-900 dark:text-white">
                            {acc.displayName}
                          </strong>
                          {isAdmin && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-700">
                              ADMIN DEV
                            </span>
                          )}
                          {audMeta ? (
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${audMeta.badgeColor}`}>
                              {audMeta.emoji} {audMeta.shortLabel}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                              Chưa chọn đối tượng
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {acc.email} • Bước mở khóa: <strong>{acc.unlockedStepIndex}</strong> • {acc.xp} XP • {acc.completedLessonsCount} bài từ vựng
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <select
                          value={acc.audience || ''}
                          onChange={(e) => {
                            if (e.target.value) {
                              handleChangeUserAudience(acc.email, e.target.value as AudienceId);
                            }
                          }}
                          className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px] font-bold"
                          title="Đổi nhóm đối tượng cho học viên"
                        >
                          <option value="" disabled>
                            Đổi đối tượng...
                          </option>
                          {AUDIENCE_METADATA.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.emoji} {m.shortLabel}
                            </option>
                          ))}
                        </select>
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

              {/* Audience Target Filter for Custom Lesson */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-500 mr-1">
                  Hiển thị cho đối tượng:
                </span>
                <button
                  type="button"
                  onClick={() => setLessonAudiences([])}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                    lessonAudiences.length === 0
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-slate-900 text-slate-600 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Tất cả nhóm
                </button>
                {AUDIENCE_METADATA.map((aud) => {
                  const active = lessonAudiences.includes(aud.id);
                  return (
                    <button
                      type="button"
                      key={aud.id}
                      onClick={() => toggleLessonAudience(aud.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                        active
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {aud.emoji} {aud.shortLabel}
                    </button>
                  );
                })}
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

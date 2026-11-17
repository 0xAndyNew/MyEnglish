import React, { useMemo, useState } from 'react';
import {
  Headphones,
  Play,
  Square,
  Eye,
  EyeOff,
  Volume2,
  CheckCircle2,
  Mic,
  Turtle,
  MessageSquare,
  Sparkles,
  Loader2,
  BookOpen,
  ArrowRight,
  PlusCircle,
} from 'lucide-react';
import { LISTENING_READING_LESSONS, ListeningReadingLesson } from '../data/listeningReadingLessons';
import { ROLEPLAY_SCENARIOS } from '../data/curriculumData';
import { AccentMode, RoleplayScenario, WordEntry } from '../types/learning';
import { analyzeWordFull } from '../utils/wordAnalyzer';
import { callGeminiText } from '../utils/geminiClient';
import {
  isSpeechRecognitionSupported,
  PronunciationScoreResult,
  recordAudioClip,
  scorePronunciation,
  speakText,
  startSpeechRecognition,
} from '../utils/speechEngine';
import { WordAnatomyCard } from './WordAnatomyCard';

interface ListeningSpeakingLabProps {
  accent: AccentMode;
  geminiApiKey?: string;
  savedWords: WordEntry[];
  onSaveWord: (word: WordEntry) => void;
  onPronunciationScore: (score: number) => void;
  onAddXp: (amount: number) => void;
  isNextUnlocked?: boolean;
  onUnlockNext?: () => void;
}

const PRACTICE_SENTENCES = [
  { en: 'Hello, my name is Minh and I am learning English every day.', vi: 'Xin chào, tên tôi là Minh và tôi đang học tiếng Anh mỗi ngày.' },
  { en: 'Could you please speak a little bit more slowly?', vi: 'Bạn có thể nói chậm hơn một chút được không?' },
  { en: 'I would like a medium iced coffee and a cheese sandwich, please.', vi: 'Cho tôi một ly cà phê đá cỡ vừa và một bánh mì kẹp phô mai.' },
  { en: 'Excuse me, could you show me the way to the train station?', vi: 'Xin lỗi, bạn có thể chỉ cho tôi đường ra ga tàu không?' },
  { en: 'How much is this blue jacket, and do you have a medium size?', vi: 'Chiếc áo khoác xanh này bao nhiêu tiền và bạn có cỡ vừa không?' },
  { en: 'I have a reservation under the name Tuan Nguyen for three nights.', vi: 'Tôi có đặt phòng dưới tên Tuấn Nguyễn trong 3 đêm.' },
  { en: 'I have had a sore throat and a mild headache since yesterday.', vi: 'Tôi bị đau họng và đau đầu nhẹ từ hôm qua.' },
  { en: 'I need more information about the flight schedule and departure gate.', vi: 'Tôi cần thêm thông tin về lịch trình chuyến bay và cổng khởi hành.' },
  { en: 'Could we reschedule our meeting to tomorrow morning at ten AM?', vi: 'Chúng ta có thể dời lịch họp sang 10 giờ sáng mai được không?' },
  { en: 'We have finished the first stage on schedule and are ready for review.', vi: 'Chúng tôi đã hoàn thành giai đoạn đầu đúng tiến độ và sẵn sàng kiểm tra.' },
  { en: 'I worked as a customer support specialist for three years.', vi: 'Tôi đã làm chuyên viên hỗ trợ khách hàng trong 3 năm.' },
  { en: 'My greatest strength is communicating clearly under high pressure.', vi: 'Điểm mạnh lớn nhất của tôi là giao tiếp rõ ràng dưới áp lực cao.' },
  { en: 'Thank you for your patience while we checked the new system.', vi: 'Cảm ơn sự kiên nhẫn của bạn trong lúc chúng tôi kiểm tra hệ thống mới.' },
  { en: 'Clear communication builds trust and opens new opportunities.', vi: 'Giao tiếp rõ ràng xây dựng niềm tin và mở ra nhiều cơ hội mới.' },
  { en: 'Consistency leads to a major breakthrough in fluency.', vi: 'Sự đều đặn dẫn đến bước đột phá lớn về độ trôi chảy.' },
];

export const ListeningSpeakingLab: React.FC<ListeningSpeakingLabProps> = ({
  accent,
  geminiApiKey,
  savedWords,
  onSaveWord,
  onPronunciationScore,
  onAddXp,
  isNextUnlocked = false,
  onUnlockNext,
}) => {
  const [subTab, setSubTab] = useState<'listen_read' | 'shadowing' | 'roleplay'>('listen_read');

  // AI generated custom items
  const [customLessons, setCustomLessons] = useState<ListeningReadingLesson[]>([]);
  const [customSentences, setCustomSentences] = useState<{ en: string; vi: string }[]>([]);
  const [customScenarios, setCustomScenarios] = useState<RoleplayScenario[]>([]);
  const [aiTopicInput, setAiTopicInput] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiGenError, setAiGenError] = useState<string | null>(null);

  // Tab 1: Listen & Read state
  const [catFilter, setCatFilter] = useState<string>('Tất cả');
  const [lessonIdx, setLessonIdx] = useState(0);
  const [rate, setRate] = useState<number>(0.9);
  const [showTranscript, setShowTranscript] = useState(true);
  const [showVi, setShowVi] = useState(false);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [lookedUpWord, setLookedUpWord] = useState<WordEntry | null>(null);
  const [lookupLoading, setLookupLoading] = useState(false);

  // Inline Shadowing on current lesson sentence
  const [shadowSentenceIdx, setShadowSentenceIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [scoreResult, setScoreResult] = useState<PronunciationScoreResult | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [recordingSelf, setRecordingSelf] = useState(false);
  const [selfAudioUrl, setSelfAudioUrl] = useState<string | null>(null);

  // Tab 2: Standalone Speaking sentences
  const allSentences = useMemo(
    () => [...customSentences, ...PRACTICE_SENTENCES],
    [customSentences]
  );
  const [targetSentence, setTargetSentence] = useState(PRACTICE_SENTENCES[0].en);
  const [customInput, setCustomInput] = useState('');

  // Tab 3: Roleplay
  const allScenarios = useMemo(
    () => [...customScenarios, ...ROLEPLAY_SCENARIOS],
    [customScenarios]
  );
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [turnIdx, setTurnIdx] = useState(0);
  const [roleplayFeedback, setRoleplayFeedback] = useState<PronunciationScoreResult | null>(null);

  const allLessons = useMemo(
    () => [...customLessons, ...LISTENING_READING_LESSONS],
    [customLessons]
  );

  const filteredLessons = useMemo(() => {
    if (catFilter === 'Tất cả') return allLessons;
    const list = allLessons.filter((l) => l.category === catFilter);
    return list.length > 0 ? list : allLessons;
  }, [allLessons, catFilter]);

  const currentLesson = filteredLessons[lessonIdx % filteredLessons.length] || allLessons[0];
  const lessonSentences = useMemo(
    () =>
      currentLesson.transcript
        .split(/(?<=[.!?])\s+/)
        .map((s) => s.trim())
        .filter(Boolean),
    [currentLesson]
  );
  const activeLessonSentence = lessonSentences[shadowSentenceIdx % lessonSentences.length] || currentLesson.transcript;

  const handleSelectLesson = (idx: number) => {
    window.speechSynthesis?.cancel();
    setLessonIdx(idx);
    setSelectedAns(null);
    setShadowSentenceIdx(0);
    setScoreResult(null);
    setSpeechError(null);
    setLookedUpWord(null);
  };

  const handleWordClick = async (rawToken: string) => {
    const clean = rawToken.replace(/[^a-zA-Z'-]/g, '').toLowerCase();
    if (!clean) return;
    speakText(clean, accent, 0.9);
    setLookupLoading(true);
    try {
      const entry = await analyzeWordFull(clean);
      setLookedUpWord(entry);
    } finally {
      setLookupLoading(false);
    }
  };

  const handleAnswerQuiz = (oIdx: number) => {
    setSelectedAns(oIdx);
    if (oIdx === currentLesson.question.correctIdx && !completedIds.includes(currentLesson.id)) {
      setCompletedIds((prev) => [...prev, currentLesson.id]);
      onAddXp(20);
    }
  };

  const runMicCheck = (expectedText: string, onSuccess?: (res: PronunciationScoreResult) => void) => {
    if (!isSpeechRecognitionSupported()) {
      setSpeechError('Trình duyệt chưa hỗ trợ nhận diện giọng nói. Vui lòng dùng Chrome hoặc Edge.');
      return;
    }
    setSpeechError(null);
    setScoreResult(null);
    setRoleplayFeedback(null);
    setIsListening(true);
    startSpeechRecognition(
      accent,
      (transcript) => {
        const res = scorePronunciation(expectedText, transcript);
        if (onSuccess) onSuccess(res);
        else setScoreResult(res);
        onPronunciationScore(res.score);
      },
      (err) => setSpeechError(err),
      () => setIsListening(false)
    );
  };

  const currentScenario = allScenarios[scenarioIdx % allScenarios.length];
  const currentTurn = currentScenario.turns[turnIdx] || currentScenario.turns[0];

  const handleRecordSelf = async () => {
    setSpeechError(null);
    setRecordingSelf(true);
    try {
      const { url } = await recordAudioClip(4000);
      setSelfAudioUrl(url);
    } catch (err: any) {
      setSpeechError(err?.message || 'Không thể mở Micro để tự ghi âm.');
    } finally {
      setRecordingSelf(false);
    }
  };

  const callGeminiJson = async (promptText: string) => {
    const key = (geminiApiKey || '').trim();
    if (!key) {
      setAiGenError('Tính năng AI chưa được Admin cấu hình API Key. Bạn hãy học kho 30 bài có sẵn nhé!');
      return null;
    }
    setAiGenError(null);
    setAiGenerating(true);
    try {
      const raw = await callGeminiText(key, promptText);
      const jsonMatch = raw.match(/[\[{][\s\S]*[\]}]/);
      if (!jsonMatch) throw new Error('Dữ liệu AI trả về chưa đúng định dạng JSON.');
      return JSON.parse(jsonMatch[0]);
    } catch (err: any) {
      setAiGenError(`Lỗi kết nối AI: ${err?.message || 'Admin hãy kiểm tra lại Gemini API Key.'}`);
      return null;
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAiCreateLesson = async () => {
    const topic = aiTopicInput.trim() || 'Giao tiếp hàng ngày & công việc';
    const parsed = await callGeminiJson(
      `Tạo 1 bài luyện Nghe & Đọc tiếng Anh trình độ A2-B1 về chủ đề: "${topic}". Trả về JSON thuần theo cấu trúc:
{"title":"✨ Tiêu đề ngắn tiếng Việt","level":"A2","category":"Giao tiếp công việc","transcript":"Đoạn tiếng Anh 3-4 câu rõ ràng tự nhiên","translation":"Bản dịch tiếng Việt chuẩn","keyPhrases":[{"en":"cụm từ 1","vi":"nghĩa 1"},{"en":"cụm từ 2","vi":"nghĩa 2"}],"question":{"q":"Câu hỏi đọc hiểu ngắn bằng tiếng Anh","options":["Đáp án A","Đáp án B","Đáp án C"],"correctIdx":0}}`
    );
    if (!parsed || !parsed.transcript) return;
    const newLesson: ListeningReadingLesson = {
      id: `ai-lr-${Date.now()}`,
      level: parsed.level || 'A2',
      category: parsed.category || 'Giao tiếp công việc',
      title: parsed.title || `✨ Bài AI: ${topic}`,
      sourceStyle: 'Gemini AI • Thực hành tùy chỉnh',
      transcript: parsed.transcript,
      translation: parsed.translation || '',
      keyPhrases: Array.isArray(parsed.keyPhrases) ? parsed.keyPhrases : [],
      question: parsed.question || { q: 'Did you understand the passage?', options: ['Yes', 'No', 'Maybe'], correctIdx: 0 },
    };
    setCustomLessons((prev) => [newLesson, ...prev]);
    setCatFilter('Tất cả');
    handleSelectLesson(0);
    setAiTopicInput('');
  };

  const handleAiCreateSentences = async () => {
    const topic = aiTopicInput.trim() || 'Giao tiếp công sở & đời sống';
    const parsed = await callGeminiJson(
      `Tạo 3 câu tiếng Anh thực tế để luyện nói theo chủ đề "${topic}" (trình độ A2-B1). Trả về mảng JSON thuần: [{"en":"English sentence","vi":"Nghĩa tiếng Việt"}]`
    );
    if (!Array.isArray(parsed) || parsed.length === 0) return;
    const valid = parsed.filter((x) => x?.en && x?.vi);
    if (valid.length === 0) return;
    setCustomSentences((prev) => [...valid, ...prev]);
    setTargetSentence(valid[0].en);
    setScoreResult(null);
    setAiTopicInput('');
  };

  const handleAiCreateScenario = async () => {
    const topic = aiTopicInput.trim() || 'Họp với khách hàng & giới thiệu sản phẩm';
    const parsed = await callGeminiJson(
      `Tạo 1 kịch bản hội thoại tiếng Anh 3 lượt theo tình huống "${topic}" (trình độ A2-B1). Trả về JSON thuần:
{"title":"✨ Tên tình huống ngắn","level":"B1","context":"Mô tả ngắn tiếng Việt","turns":[{"speaker":"AI","en":"Câu AI nói","ipa":"","vi":"Nghĩa tiếng Việt","suggestedReplies":[{"en":"Câu người học đáp","ipa":"","vi":"Nghĩa câu đáp"}]}]}`
    );
    if (!parsed || !Array.isArray(parsed.turns) || parsed.turns.length === 0) return;
    const newScenario: RoleplayScenario = {
      id: `ai-rp-${Date.now()}`,
      title: parsed.title || `✨ ${topic}`,
      level: parsed.level || 'B1',
      context: parsed.context || topic,
      turns: parsed.turns,
    };
    setCustomScenarios((prev) => [newScenario, ...prev]);
    setScenarioIdx(0);
    setTurnIdx(0);
    setRoleplayFeedback(null);
    setAiTopicInput('');
  };

  return (
    <div className="space-y-5">
      {/* Header + Sub-tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
            <Headphones className="w-4 h-4" /> Bước 3 • Luyện Nghe, Đọc & Nói Tích Hợp
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            Phòng Luyện Nghe – Đọc – Nói (British Council / VOA / BBC)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Nghe audio chuẩn, đọc bài & tra từ trực tiếp, sau đó bật Mic đọc nhại (Shadowing) ngay tại chỗ.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'listen_read', label: `🎧 Nghe & Đọc Cơ Bản (${allLessons.length} bài)` },
            { id: 'shadowing', label: '🎙️ Luyện Nói & Chấm Điểm' },
            { id: 'roleplay', label: '💬 Hội Thoại Tình Huống' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                window.speechSynthesis?.cancel();
                setSubTab(t.id as 'listen_read' | 'shadowing' | 'roleplay');
                setScoreResult(null);
                setSpeechError(null);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                subTab === t.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: LISTEN & READ + INLINE SHADOWING */}
      {subTab === 'listen_read' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Lesson list */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 h-fit">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-slate-500">
                Kho bài Nghe & Đọc ({completedIds.length}/{allLessons.length})
              </span>
            </div>

            {/* AI Generate Listening Lesson */}
            <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-2">
              <input
                value={aiTopicInput}
                onChange={(e) => setAiTopicInput(e.target.value)}
                placeholder="Nhập chủ đề muốn AI tạo bài nghe..."
                className="w-full px-2.5 py-1.5 rounded-lg border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
              />
              <button
                onClick={handleAiCreateLesson}
                disabled={aiGenerating}
                className="w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {aiGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5" />}
                ✨ AI Tạo Bài Nghe Mới
              </button>
              {aiGenError && <p className="text-[11px] text-rose-600 font-semibold">{aiGenError}</p>}
            </div>

            <div className="flex flex-wrap gap-1">
              {['Tất cả', 'Hội thoại đời sống', 'Bài đọc cơ bản', 'Giao tiếp công việc'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCatFilter(cat);
                    handleSelectLesson(0);
                  }}
                  className={`px-2 py-1 rounded-lg text-[11px] font-semibold ${
                    catFilter === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-1.5 max-h-52 lg:max-h-[480px] overflow-y-auto pr-1">
              {filteredLessons.map((item, idx) => {
                const active = item.id === currentLesson.id;
                const done = completedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectLesson(idx)}
                    className={`w-full text-left p-2.5 rounded-xl border transition flex items-start justify-between gap-2 ${
                      active
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 text-indigo-900 dark:text-indigo-200'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-indigo-300'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{item.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.level} • {item.category}
                      </div>
                    </div>
                    {done && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Active Lesson Player + Reader + Quiz + Shadowing */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700">
                    Cấp {currentLesson.level} • {currentLesson.sourceStyle}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1.5">
                    {currentLesson.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {[0.75, 0.9, 1.0].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRate(r)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        rate === r
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {r}x
                    </button>
                  ))}
                  <button
                    onClick={() => speakText(currentLesson.transcript, accent, rate)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5" /> Nghe cả bài
                  </button>
                  <button
                    onClick={() => window.speechSynthesis?.cancel()}
                    className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600"
                    title="Dừng đọc"
                  >
                    <Square className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Transcript & Translation toggles */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowTranscript((v) => !v)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showTranscript ? 'Ẩn bài đọc (Luyện nghe chay)' : 'Hiện bài đọc'}
                </button>
                <button
                  onClick={() => setShowVi((v) => !v)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" /> {showVi ? 'Ẩn dịch tiếng Việt' : 'Xem dịch tiếng Việt'}
                </button>
              </div>

              {showTranscript && (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400">
                    Bấm vào bất kỳ từ nào để nghe phát âm & tra nghĩa:
                  </div>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
                    {currentLesson.transcript.split(/\s+/).map((tok, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleWordClick(tok)}
                        className="inline-block mr-1.5 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:text-indigo-700 rounded px-0.5 transition"
                      >
                        {tok}
                      </button>
                    ))}
                  </p>
                </div>
              )}

              {showVi && (
                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong>Dịch nghĩa:</strong> {currentLesson.translation}
                </div>
              )}

              {/* Key Phrases */}
              <div className="flex flex-wrap gap-1.5">
                {currentLesson.keyPhrases.map((kp) => (
                  <button
                    key={kp.en}
                    onClick={() => speakText(kp.en, accent, 0.9)}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs inline-flex items-center gap-1.5 hover:border-indigo-400"
                  >
                    <Volume2 className="w-3 h-3 text-indigo-500" />
                    <strong className="text-indigo-900 dark:text-indigo-200">{kp.en}</strong>
                    <span className="text-slate-500">({kp.vi})</span>
                  </button>
                ))}
              </div>

              {/* Word Lookup Card */}
              {lookupLoading && (
                <div className="text-xs text-indigo-600 flex items-center gap-1.5">
                  <Loader2 className="w-4 h-4 animate-spin" /> Đang tra từ...
                </div>
              )}
              {lookedUpWord && (
                <WordAnatomyCard
                  wordEntry={lookedUpWord}
                  accent={accent}
                  isSaved={savedWords.some((w) => w.word === lookedUpWord.word)}
                  onSaveWord={onSaveWord}
                  onPronunciationScore={onPronunciationScore}
                />
              )}

              {/* Comprehension Quiz */}
              <div className="p-4 rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/50 space-y-2.5">
                <div className="text-xs font-extrabold uppercase text-sky-700 dark:text-sky-300">
                  📝 Kiểm tra Nghe & Đọc hiểu
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{currentLesson.question.q}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentLesson.question.options.map((opt, oIdx) => {
                    const picked = selectedAns === oIdx;
                    const isCorrect = oIdx === currentLesson.question.correctIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleAnswerQuiz(oIdx)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition ${
                          selectedAns !== null
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                              : picked
                              ? 'bg-rose-100 border-rose-500 text-rose-900'
                              : 'bg-white dark:bg-slate-900 border-slate-200 opacity-60'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Inline Shadowing Practice on THIS lesson */}
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-extrabold uppercase text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                    <Mic className="w-4 h-4" /> Luyện Nói / Đọc Nhại (Shadowing) từng câu trong bài
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {lessonSentences.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setShadowSentenceIdx(idx);
                          setScoreResult(null);
                          setSpeechError(null);
                        }}
                        className={`px-2 py-0.5 rounded-lg text-[11px] font-bold ${
                          shadowSentenceIdx % lessonSentences.length === idx
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white dark:bg-slate-800 text-slate-600 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        Câu {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  "{activeLessonSentence}"
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => speakText(activeLessonSentence, accent, 0.85)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Turtle className="w-3.5 h-3.5 text-indigo-500" /> Nghe mẫu câu này
                  </button>
                  <button
                    onClick={() => runMicCheck(activeLessonSentence)}
                    disabled={isListening}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold text-white inline-flex items-center gap-1.5 ${
                      isListening ? 'bg-rose-500 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" /> {isListening ? 'Đang nghe bạn đọc...' : 'Bấm Mic để đọc nhại'}
                  </button>
                  <button
                    onClick={handleRecordSelf}
                    disabled={recordingSelf}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold inline-flex items-center gap-1.5"
                    title="Thu âm 4 giây không cần server Web Speech"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    {recordingSelf ? 'Đang ghi 4s...' : 'Thu âm tự nghe lại'}
                  </button>
                  {selfAudioUrl && (
                    <button
                      onClick={() => new Audio(selfAudioUrl).play()}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold inline-flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe lại giọng bạn
                    </button>
                  )}
                </div>

                {speechError && <p className="text-xs text-rose-600 font-semibold">{speechError}</p>}
                {scoreResult && (
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 text-xs space-y-1">
                    <div className="font-extrabold text-emerald-700 dark:text-emerald-300">
                      Điểm phát âm: {scoreResult.score}/100
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      Bạn vừa đọc: "{scoreResult.transcript}"
                    </div>
                  </div>
                )}
              </div>

              {onUnlockNext && !isNextUnlocked && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={onUnlockNext}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    Mở khóa Bước 4: Đọc, Viết & SRS <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STANDALONE SHADOWING & MIC SCORING */}
      {subTab === 'shadowing' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
          {/* AI Create Speaking Sentences Bar */}
          <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-2">
            <div className="flex flex-wrap gap-2">
              <input
                value={aiTopicInput}
                onChange={(e) => setAiTopicInput(e.target.value)}
                placeholder="Nhập công việc / tình huống để AI tạo thêm câu luyện nói (vd: Kế toán, Y tá, Bán hàng)..."
                className="w-full sm:flex-1 sm:min-w-[220px] px-3 py-1.5 rounded-xl border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
              />
              <button
                onClick={handleAiCreateSentences}
                disabled={aiGenerating}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
              >
                {aiGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5" />}
                ✨ AI Tạo Câu Nói Mới
              </button>
            </div>
            {aiGenError && <p className="text-xs text-rose-600 font-semibold">{aiGenError}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {allSentences.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTargetSentence(item.en);
                  setScoreResult(null);
                  setSpeechError(null);
                }}
                className={`text-left p-3 rounded-xl border transition ${
                  targetSentence === item.en
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">{item.en}</div>
                <div className="text-[11px] text-slate-500 mt-1">{item.vi}</div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <input
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Hoặc tự nhập một câu tiếng Anh bất kỳ để luyện đọc..."
              className="w-full sm:flex-1 sm:min-w-[220px] px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
            />
            <button
              onClick={() => {
                if (customInput.trim()) {
                  setTargetSentence(customInput.trim());
                  setScoreResult(null);
                }
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Dùng câu này
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-3">
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">"{targetSentence}"</div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => speakText(targetSentence, accent, 0.8)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Turtle className="w-4 h-4 text-indigo-500" /> Nghe chậm (0.8x)
              </button>
              <button
                onClick={() => speakText(targetSentence, accent, 1.0)}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4 text-indigo-500" /> Nghe chuẩn (1.0x)
              </button>
              <button
                onClick={() => runMicCheck(targetSentence)}
                disabled={isListening}
                className={`px-5 py-2 rounded-xl text-xs font-bold text-white inline-flex items-center gap-1.5 ${
                  isListening ? 'bg-rose-500 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <Mic className="w-4 h-4" /> {isListening ? 'Đang nghe...' : 'Bấm Mic & Đọc to'}
              </button>
              <button
                onClick={handleRecordSelf}
                disabled={recordingSelf}
                className="px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold inline-flex items-center gap-1.5"
              >
                <Mic className="w-4 h-4" /> {recordingSelf ? 'Đang ghi 4s...' : 'Thu âm tự nghe lại'}
              </button>
              {selfAudioUrl && (
                <button
                  onClick={() => new Audio(selfAudioUrl).play()}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-indigo-300 text-indigo-700 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" /> Nghe lại giọng bạn
                </button>
              )}
            </div>
            {speechError && <p className="text-xs text-rose-600 font-semibold">{speechError}</p>}
            {scoreResult && (
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 text-sm">
                <strong className="text-emerald-700">Điểm: {scoreResult.score}/100</strong> — Bạn đọc: "{scoreResult.transcript}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ROLEPLAY SITUATIONS */}
      {subTab === 'roleplay' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
          {/* AI Create Roleplay Scenario Bar */}
          <div className="p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-2">
            <div className="flex flex-wrap gap-2">
              <input
                value={aiTopicInput}
                onChange={(e) => setAiTopicInput(e.target.value)}
                placeholder="Nhập tình huống hội thoại muốn AI tạo kịch bản mới (vd: Phỏng vấn IT, Đặt phòng khách sạn)..."
                className="w-full sm:flex-1 sm:min-w-[220px] px-3 py-1.5 rounded-xl border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
              />
              <button
                onClick={handleAiCreateScenario}
                disabled={aiGenerating}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
              >
                {aiGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5" />}
                ✨ AI Tạo Hội Thoại Mới
              </button>
            </div>
            {aiGenError && <p className="text-xs text-rose-600 font-semibold">{aiGenError}</p>}
          </div>

          <div className="flex flex-wrap gap-2">
            {allScenarios.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => {
                  setScenarioIdx(idx);
                  setTurnIdx(0);
                  setRoleplayFeedback(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
                  scenarioIdx === idx
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 inline mr-1" /> {sc.title}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600">
                Lượt {turnIdx + 1}/{currentScenario.turns.length} • {currentScenario.context}
              </span>
              <button
                onClick={() => speakText(currentTurn.en, accent, 0.9)}
                className="text-xs font-bold text-indigo-600 inline-flex items-center gap-1"
              >
                <Volume2 className="w-4 h-4" /> Nghe câu này
              </button>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-bold text-slate-400 uppercase">
                {currentTurn.speaker === 'AI' ? 'Người đối thoại nói:' : 'Lượt của bạn:'}
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{currentTurn.en}</div>
              <div className="text-xs text-slate-500 mt-0.5">{currentTurn.vi}</div>
            </div>

            {(() => {
              const targetReply = currentTurn.suggestedReplies?.[0]?.en ?? currentTurn.en;
              return (
                <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Câu gợi ý bạn đáp lại / luyện nói:
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{targetReply}</div>
                  {currentTurn.suggestedReplies?.[0]?.vi && (
                    <div className="text-xs text-slate-500">{currentTurn.suggestedReplies[0].vi}</div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      onClick={() => speakText(targetReply, accent, 0.9)}
                      className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 text-xs font-bold"
                    >
                      🔊 Nghe mẫu câu đáp
                    </button>
                    <button
                      onClick={() => runMicCheck(targetReply, (res) => setRoleplayFeedback(res))}
                      disabled={isListening}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
                    >
                      {isListening ? 'Đang nghe...' : '🎙️ Bấm Mic nói câu đáp'}
                    </button>
                    <button
                      onClick={handleRecordSelf}
                      disabled={recordingSelf}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold"
                    >
                      {recordingSelf ? 'Đang ghi 4s...' : 'Thu âm tự nghe lại'}
                    </button>
                    {selfAudioUrl && (
                      <button
                        onClick={() => new Audio(selfAudioUrl).play()}
                        className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 text-indigo-700 text-xs font-bold"
                      >
                        🔊 Nghe lại giọng bạn
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setTurnIdx((t) => (t + 1) % currentScenario.turns.length);
                        setRoleplayFeedback(null);
                      }}
                      className="ml-auto px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
                    >
                      Lượt tiếp →
                    </button>
                  </div>
                  {roleplayFeedback && (
                    <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 pt-1">
                      Điểm phản xạ: {roleplayFeedback.score}/100 — "{roleplayFeedback.transcript}"
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

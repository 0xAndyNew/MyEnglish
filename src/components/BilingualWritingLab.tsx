import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeftRight,
  CheckCircle2,
  Loader2,
  PenTool,
  PlusCircle,
  Search,
  Sparkles,
  Volume2,
} from 'lucide-react';
import {
  BILINGUAL_WRITING_PROMPTS,
  BilingualPrompt,
  JOB_CATEGORIES,
  JobCategory,
} from '../data/bilingualWritingPrompts';
import { LearnerProfile } from '../types/audience';
import { AccentMode, CefrLevel } from '../types/learning';
import { filterAndSortByProfile, getAllowedCategoriesForProfile } from '../utils/audienceFilter';
import { callGeminiText } from '../utils/geminiClient';
import { speakText } from '../utils/speechEngine';

interface BilingualWritingLabProps {
  accent: AccentMode;
  geminiApiKey?: string;
  extraPrompts?: BilingualPrompt[];
  onAddXp: (amount: number) => void;
  learnerProfile?: LearnerProfile | null;
}

interface GradeResult {
  score: number;
  feedback: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestedVersion: string;
}

function gradeOffline(
  userText: string,
  prompt: BilingualPrompt,
  direction: 'vi2en' | 'en2vi'
): GradeResult {
  const trimmed = userText.trim();
  const lower = trimmed.toLowerCase();
  const keywords = direction === 'vi2en' ? prompt.keywordsEn : prompt.keywordsVi;
  const matchedKeywords = keywords.filter((kw) => lower.includes(kw.toLowerCase()));
  const missingKeywords = keywords.filter((kw) => !lower.includes(kw.toLowerCase()));

  const keywordRatio = keywords.length > 0 ? matchedKeywords.length / keywords.length : 1;
  const wordCount = trimmed.split(/\s+/).filter(Boolean).length;
  const targetWordCount = (direction === 'vi2en' ? prompt.en : prompt.vi).split(/\s+/).length;
  const lengthRatio = Math.min(1, wordCount / Math.max(5, targetWordCount * 0.65));

  let grammarPenalty = 0;
  const feedback: string[] = [];

  if (direction === 'vi2en') {
    if (trimmed && !/^[A-Z]/.test(trimmed)) {
      feedback.push('⚠️ Chữ cái đầu câu tiếng Anh nên viết HOA.');
      grammarPenalty += 5;
    }
    if (trimmed && !/[.!?]$/.test(trimmed)) {
      feedback.push('⚠️ Cuối câu nên có dấu chấm (.), chấm hỏi (?) hoặc chấm than (!).');
      grammarPenalty += 5;
    }
    if (/\bi\b/.test(trimmed)) {
      feedback.push('⚠️ Đại từ "I" (tôi) luôn luôn phải viết HOA.');
      grammarPenalty += 6;
    }
    if (/\bI\s+is\b/i.test(trimmed) || /\bI\s+are\b/i.test(trimmed)) {
      feedback.push('❌ Lỗi "to be": Chủ ngữ "I" phải đi với "am" (I am).');
      grammarPenalty += 10;
    }
    if (/\balthough\b.*\bbut\b/i.test(trimmed)) {
      feedback.push('❌ Không dùng cả "although" và "but" trong cùng một câu.');
      grammarPenalty += 10;
    }
  } else {
    if (wordCount < 6) {
      feedback.push('💡 Bản dịch tiếng Việt hơi ngắn, hãy diễn đạt đầy đủ ý của câu gốc.');
    }
  }

  const rawScore = Math.round(keywordRatio * 65 + lengthRatio * 35 - grammarPenalty);
  const score = Math.max(25, Math.min(100, rawScore));

  if (matchedKeywords.length === keywords.length && grammarPenalty === 0) {
    feedback.unshift('✅ Rất tốt! Bạn đã truyền tải đầy đủ ý chính và từ khóa quan trọng.');
  } else if (missingKeywords.length > 0) {
    feedback.push(
      `💡 Gợi ý bổ sung ý/từ khóa: ${missingKeywords.join(', ')}.`
    );
  }

  return {
    score,
    feedback,
    matchedKeywords,
    missingKeywords,
    suggestedVersion: direction === 'vi2en' ? prompt.en : prompt.vi,
  };
}

export const BilingualWritingLab: React.FC<BilingualWritingLabProps> = ({
  accent,
  geminiApiKey,
  extraPrompts = [],
  onAddXp,
  learnerProfile,
}) => {
  const [direction, setDirection] = useState<'vi2en' | 'en2vi'>('vi2en');
  const [catFilter, setCatFilter] = useState<'Tất cả' | JobCategory>('Tất cả');
  const [levelFilter, setLevelFilter] = useState<'ALL' | CefrLevel>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [promptPage, setPromptPage] = useState(0);
  const [customPrompts, setCustomPrompts] = useState<BilingualPrompt[]>([]);
  const [promptIdx, setPromptIdx] = useState(0);
  const [userText, setUserText] = useState('');
  const [showSample, setShowSample] = useState(false);
  const [offlineResult, setOfflineResult] = useState<GradeResult | null>(null);

  // AI state
  const [aiJobTopic, setAiJobTopic] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiReview, setAiReview] = useState<string | null>(null);
  const [aiGrading, setAiGrading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const allPrompts = useMemo(
    () =>
      filterAndSortByProfile(
        [...customPrompts, ...extraPrompts, ...BILINGUAL_WRITING_PROMPTS],
        learnerProfile
      ),
    [customPrompts, extraPrompts, learnerProfile]
  );

  const allowedCategories = useMemo(
    () => [
      'Tất cả' as const,
      ...(getAllowedCategoriesForProfile(
        JOB_CATEGORIES.filter((c) => c !== 'Tất cả'),
        learnerProfile
      ) as JobCategory[]),
    ],
    [learnerProfile]
  );

  const availableLevels = useMemo(
    () =>
      learnerProfile?.audience === 'kids'
        ? (['ALL', 'A1'] as const)
        : (['ALL', 'A1', 'A2', 'B1', 'B2'] as const),
    [learnerProfile]
  );

  useEffect(() => {
    if (!allowedCategories.includes(catFilter)) {
      setCatFilter('Tất cả');
      setPromptIdx(0);
    }
  }, [allowedCategories, catFilter]);

  useEffect(() => {
    if (learnerProfile?.audience === 'kids' && levelFilter !== 'ALL' && levelFilter !== 'A1') {
      setLevelFilter('ALL');
      setPromptIdx(0);
    }
  }, [learnerProfile, levelFilter]);

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = allPrompts.filter((p) => {
      const okCat = catFilter === 'Tất cả' || p.category === catFilter;
      const okLevel = levelFilter === 'ALL' || p.level === levelFilter;
      const okQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.vi.toLowerCase().includes(q) ||
        p.en.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return okCat && okLevel && okQuery;
    });
    return list.length > 0 ? list : allPrompts;
  }, [allPrompts, catFilter, levelFilter, searchQuery]);

  const safePromptIdx = promptIdx % Math.max(1, filteredPrompts.length);
  const currentPrompt =
    filteredPrompts[safePromptIdx] || allPrompts[0] || BILINGUAL_WRITING_PROMPTS[0];

  const handleSelectPrompt = (idx: number) => {
    setPromptIdx(idx);
    setPromptPage(Math.floor(idx / 20));
    setUserText('');
    setShowSample(false);
    setOfflineResult(null);
    setAiReview(null);
    setAiError(null);
  };

  const handleCheckOffline = () => {
    if (!userText.trim()) return;
    const res = gradeOffline(userText, currentPrompt, direction);
    setOfflineResult(res);
    if (res.score >= 75) {
      onAddXp(25);
    }
  };

  const handleAiGeneratePrompt = async () => {
    const key = (geminiApiKey || '').trim();
    if (!key) {
      setAiError(`Tính năng AI chưa được Admin cấu hình API Key. Hãy chọn từ ${allPrompts.length} bài mẫu có sẵn bên dưới nhé!`);
      return;
    }
    setAiError(null);
    setAiGenerating(true);
    try {
      const topic = aiJobTopic.trim() || 'Giao tiếp văn phòng & bán hàng';
      const rawText = await callGeminiText(
        key,
        `Tạo 1 bài luyện viết song ngữ Việt-Anh thực tế cho công việc/chủ đề: "${topic}".
Trả về ĐÚNG JSON thuần (không markdown) theo format:
{"title":"Tiêu đề ngắn tiếng Việt","level":"A2","vi":"Đoạn văn tiếng Việt 2-3 câu tự nhiên","en":"Bản dịch tiếng Anh chuẩn tương ứng 2-3 câu","keywordsEn":["w1","w2","w3","w4"],"keywordsVi":["t1","t2","t3","t4"]}`
      );
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Không đọc được JSON từ AI.');
      const parsed = JSON.parse(jsonMatch[0]);
      const newItem: BilingualPrompt = {
        id: `ai-${Date.now()}`,
        level: parsed.level || (learnerProfile?.audience === 'kids' ? 'A1' : 'B1'),
        category:
          learnerProfile?.audience === 'kids' || learnerProfile?.audience === 'teen'
            ? 'Đời sống & Giao tiếp'
            : 'Văn phòng & Email',
        title: `✨ ${parsed.title || topic}`,
        vi: parsed.vi,
        en: parsed.en,
        keywordsEn: Array.isArray(parsed.keywordsEn) ? parsed.keywordsEn : [],
        keywordsVi: Array.isArray(parsed.keywordsVi) ? parsed.keywordsVi : [],
      };
      setCustomPrompts((prev) => [newItem, ...prev]);
      setCatFilter('Tất cả');
      handleSelectPrompt(0);
      setAiJobTopic('');
    } catch (err: any) {
      setAiError(`Không thể tạo bài từ AI: ${err?.message || 'Kiểm tra lại API Key hoặc thử lại.'}`);
    } finally {
      setAiGenerating(false);
    }
  };

  const handleAiGrade = async () => {
    const key = (geminiApiKey || '').trim();
    if (!key) {
      setAiError('Tính năng AI chưa được Admin cấu hình API Key. Bạn hãy dùng nút "Chấm điểm Offline (0–100)" nhé!');
      return;
    }
    if (!userText.trim()) return;
    setAiError(null);
    setAiGrading(true);
    try {
      const taskDesc =
        direction === 'vi2en'
          ? `Người học dịch từ tiếng Việt sang tiếng Anh.\nĐề tiếng Việt: "${currentPrompt.vi}"\nMẫu tham khảo: "${currentPrompt.en}"\nBài viết tiếng Anh của học viên: "${userText}"`
          : `Người học dịch từ tiếng Anh sang tiếng Việt.\nĐề tiếng Anh: "${currentPrompt.en}"\nMẫu tham khảo: "${currentPrompt.vi}"\nBài dịch tiếng Việt của học viên: "${userText}"`;

      const reply = await callGeminiText(
        key,
        `Bạn là giáo viên tiếng Anh. Hãy chấm điểm bài làm sau trên thang 100 và nhận xét ngắn gọn bằng tiếng Việt (gồm: 1. Điểm số /100; 2. Lỗi sai hoặc chỗ chưa tự nhiên; 3. Phiên bản gợi ý hay nhất).\n\n${taskDesc}`
      );
      setAiReview(reply);
      onAddXp(30);
    } catch (err: any) {
      setAiError(`Lỗi kết nối Gemini AI: ${err?.message || 'Hãy dùng nút Chấm điểm Offline miễn phí bên cạnh.'}`);
    } finally {
      setAiGrading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header & Direction Switch */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
            <PenTool className="w-4 h-4" /> Luyện Viết Song Ngữ Thực Chiến
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
            Phòng Luyện Viết Việt ↔ Anh & Chấm Điểm Chi Tiết
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Thực hành viết 2 chiều theo nhiều tình huống công việc thực tế để thuần thục cả viết Anh và dịch Việt.
          </p>
        </div>

        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
          <button
            onClick={() => {
              setDirection('vi2en');
              setUserText('');
              setOfflineResult(null);
              setAiReview(null);
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              direction === 'vi2en'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            🇻🇳 Mẫu Tiếng Việt → Viết Tiếng Anh
          </button>
          <button
            onClick={() => {
              setDirection('en2vi');
              setUserText('');
              setOfflineResult(null);
              setAiReview(null);
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
              direction === 'en2vi'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            🇬🇧 Mẫu Tiếng Anh → Dịch Tiếng Việt
          </button>
        </div>
      </div>

      {/* Category Filter + Search + AI Generator Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSelectPrompt(0);
              }}
              placeholder={`Tìm trong ${allPrompts.length} bài luyện viết thực chiến...`}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {availableLevels.map((lv) => (
              <button
                key={lv}
                onClick={() => {
                  setLevelFilter(lv);
                  handleSelectPrompt(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  levelFilter === lv
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {lv === 'ALL' ? 'Mọi cấp' : lv}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 mr-1">Thể loại / Ngành nghề:</span>
          {allowedCategories.map((cat) => {
            const isPreferred =
              learnerProfile?.audience === 'worker' &&
              learnerProfile.worker?.industries?.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => {
                  setCatFilter(cat);
                  handleSelectPrompt(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                  catFilter === cat
                    ? 'bg-indigo-600 text-white'
                    : isPreferred
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {isPreferred ? `⭐ ${cat}` : cat}
              </button>
            );
          })}
        </div>

        {/* AI Custom Topic + Optional API Key */}
        <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <input
            value={aiJobTopic}
            onChange={(e) => setAiJobTopic(e.target.value)}
            placeholder="Nhập công việc của bạn để AI tạo bài mẫu (vd: Kế toán, Sale bất động sản, DevOps...)"
            className="w-full sm:flex-1 sm:min-w-[220px] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
          />
          <button
            onClick={handleAiGeneratePrompt}
            disabled={aiGenerating}
            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50"
          >
            {aiGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <PlusCircle className="w-3.5 h-3.5" />}
            ✨ AI Tạo Đề Mới
          </button>
        </div>
        {aiError && <p className="text-xs text-rose-600 font-semibold">{aiError}</p>}
      </div>

      {/* Main 2-column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Paginated Prompt list */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2 h-fit lg:sticky lg:top-28">
          {(() => {
            const PAGE_SIZE = 20;
            const totalPages = Math.max(1, Math.ceil(filteredPrompts.length / PAGE_SIZE));
            const safePage = Math.min(promptPage, totalPages - 1);
            const pagePrompts = filteredPrompts.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);
            return (
              <>
                <div className="flex items-center justify-between text-xs font-extrabold uppercase text-slate-500 pb-1 border-b border-slate-100 dark:border-slate-800">
                  <span>Danh sách bài mẫu ({filteredPrompts.length} bài)</span>
                  {totalPages > 1 && (
                    <span className="text-[11px] font-bold">
                      Trang {safePage + 1}/{totalPages}
                    </span>
                  )}
                </div>
                <div className="space-y-2 max-h-56 lg:max-h-[430px] overflow-y-auto pr-1">
                  {pagePrompts.map((p, offset) => {
                    const idx = safePage * PAGE_SIZE + offset;
                    const active = p.id === currentPrompt.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPrompt(idx)}
                        className={`w-full text-left p-3 rounded-xl border transition ${
                          active
                            ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 text-indigo-900 dark:text-indigo-200'
                            : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-indigo-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{idx + 1}. {p.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Cấp {p.level} • {p.category}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold">
                    <button
                      type="button"
                      disabled={safePage <= 0}
                      onClick={() => setPromptPage((p) => Math.max(0, p - 1))}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                    >
                      ← Trước
                    </button>
                    <span className="text-slate-500">
                      {safePage + 1} / {totalPages}
                    </span>
                    <button
                      type="button"
                      disabled={safePage >= totalPages - 1}
                      onClick={() => setPromptPage((p) => Math.min(totalPages - 1, p + 1))}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40"
                    >
                      Sau →
                    </button>
                  </div>
                )}
              </>
            );
          })()}
        </div>

        {/* Right: Active Writing Exercise + Grading */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-700">
                Cấp {currentPrompt.level} • {currentPrompt.category}
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                {currentPrompt.title}
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              {direction === 'vi2en' ? 'Việt → Anh' : 'Anh → Việt'}
            </span>
          </div>

          {/* Source Prompt Box */}
          <div className="p-4 rounded-xl bg-sky-50/80 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-sky-700 dark:text-sky-300">
                {direction === 'vi2en'
                  ? '🇻🇳 Đề bài mẫu Tiếng Việt (Hãy viết lại bằng Tiếng Anh):'
                  : '🇬🇧 Đoạn văn mẫu Tiếng Anh (Hãy dịch sang Tiếng Việt chuẩn xác):'}
              </span>
              {direction === 'en2vi' && (
                <button
                  onClick={() => speakText(currentPrompt.en, accent, 0.9)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-sky-300 text-xs font-bold text-sky-700 inline-flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Nghe đoạn Anh
                </button>
              )}
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              {direction === 'vi2en' ? currentPrompt.vi : currentPrompt.en}
            </p>
            <div className="flex flex-wrap gap-1 pt-1">
              <span className="text-[11px] font-semibold text-slate-500 mr-1">Từ khóa gợi ý:</span>
              {(direction === 'vi2en' ? currentPrompt.keywordsEn : currentPrompt.keywordsVi).map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-800 text-[11px] font-bold text-sky-800 dark:text-sky-200"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* User Answer Textarea */}
          <div className="space-y-2">
            <textarea
              rows={4}
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder={
                direction === 'vi2en'
                  ? 'Nhập bài viết tiếng Anh của bạn tại đây...'
                  : 'Nhập bản dịch tiếng Việt tự nhiên của bạn tại đây...'
              }
              className="w-full p-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:border-indigo-500 outline-none"
            />

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCheckOffline}
                disabled={!userText.trim()}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold disabled:opacity-40 inline-flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> Chấm điểm Offline (0–100)
              </button>
              <button
                onClick={handleAiGrade}
                disabled={!userText.trim() || aiGrading}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold disabled:opacity-40 inline-flex items-center gap-1.5"
              >
                {aiGrading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                AI Chấm & Sửa Chi Tiết
              </button>
              <button
                onClick={() => setShowSample((v) => !v)}
                className="ml-auto px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold"
              >
                {showSample ? 'Ẩn đáp án mẫu' : '👁️ Xem đáp án mẫu chuẩn'}
              </button>
            </div>
          </div>

          {showSample && (
            <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                  ✅ Đáp án mẫu chuẩn:
                </span>
                <button
                  onClick={() => speakText(currentPrompt.en, accent, 0.9)}
                  className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Nghe bản Anh
                </button>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {direction === 'vi2en' ? currentPrompt.en : currentPrompt.vi}
              </p>
            </div>
          )}

          {offlineResult && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                  📊 Kết quả chấm điểm
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-black ${
                    offlineResult.score >= 80
                      ? 'bg-emerald-100 text-emerald-800'
                      : offlineResult.score >= 60
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {offlineResult.score}/100 điểm
                </span>
              </div>
              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {offlineResult.feedback.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
                <span className="font-bold text-slate-500">Đối chiếu bản chuẩn: </span>
                <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                  {offlineResult.suggestedVersion}
                </span>
              </div>
            </div>
          )}

          {aiReview && (
            <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-1.5">
              <div className="text-xs font-extrabold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Nhận xét & Chấm điểm từ Gemini AI
              </div>
              <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                {aiReview}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

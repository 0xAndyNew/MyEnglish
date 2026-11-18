import React, { useEffect, useMemo, useState } from 'react';
import { Search, Volume2, BookOpen, Sparkles, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { CORE_VOCABULARY, CoreVocabItem, VOCAB_TOPICS } from '../data/coreVocabulary';
import { LearnerProfile } from '../types/audience';
import { AccentMode, CefrLevel, WordEntry } from '../types/learning';
import { filterAndSortByProfile, getAllowedCategoriesForProfile } from '../utils/audienceFilter';
import { analyzeWordFull } from '../utils/wordAnalyzer';
import { speakText } from '../utils/speechEngine';
import { WordAnatomyCard } from './WordAnatomyCard';

interface VocabularyLibraryProps {
  accent: AccentMode;
  savedWords: WordEntry[];
  onSaveWord: (word: WordEntry) => void;
  onPronunciationScore: (score: number) => void;
  learnerProfile?: LearnerProfile | null;
}

const LEVELS: ('ALL' | CefrLevel)[] = ['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'];
const PAGE_SIZE = 30;

export const VocabularyLibrary: React.FC<VocabularyLibraryProps> = ({
  accent,
  savedWords,
  onSaveWord,
  onPronunciationScore,
  learnerProfile,
}) => {
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'ALL' | CefrLevel>('ALL');
  const [topicFilter, setTopicFilter] = useState<string>('ALL');
  const [page, setPage] = useState(1);

  const [selectedWord, setSelectedWord] = useState<WordEntry | null>(null);
  const [loadingWord, setLoadingWord] = useState(false);

  const profileVocab = useMemo(
    () => filterAndSortByProfile(CORE_VOCABULARY, learnerProfile),
    [learnerProfile]
  );

  const availableTopics = useMemo(() => {
    if (!learnerProfile) return VOCAB_TOPICS;
    const presentTopics = new Set(profileVocab.map((item) => item.topic));
    const baseTopics = VOCAB_TOPICS.filter((t) => presentTopics.has(t));
    // Giữ thứ tự hợp lý; với người đi làm/học sinh vẫn đảm bảo không bị lọc rỗng danh mục đơn giản
    return learnerProfile.audience === 'kids'
      ? baseTopics
      : getAllowedCategoriesForProfile(baseTopics, learnerProfile);
  }, [learnerProfile, profileVocab]);

  const availableLevels = useMemo(
    () =>
      learnerProfile?.audience === 'kids'
        ? (['ALL', 'A1'] as ('ALL' | CefrLevel)[])
        : LEVELS,
    [learnerProfile]
  );

  useEffect(() => {
    if (topicFilter !== 'ALL' && !availableTopics.includes(topicFilter)) {
      setTopicFilter('ALL');
      setPage(1);
    }
  }, [availableTopics, topicFilter]);

  useEffect(() => {
    if (!availableLevels.includes(levelFilter)) {
      setLevelFilter('ALL');
      setPage(1);
    }
  }, [availableLevels, levelFilter]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return profileVocab.filter((item) => {
      if (levelFilter !== 'ALL' && item.level !== levelFilter) return false;
      if (topicFilter !== 'ALL' && item.topic !== topicFilter) return false;
      if (q && !item.word.toLowerCase().includes(q) && !item.meaningVi.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [profileVocab, query, levelFilter, topicFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleSelectItem = async (item: CoreVocabItem) => {
    setLoadingWord(true);
    speakText(item.word, accent, 0.95);
    try {
      const analyzed = await analyzeWordFull(item.word);
      setSelectedWord({
        ...analyzed,
        level: item.level,
        pos: item.pos,
        meaningVi: item.meaningVi,
      });
    } finally {
      setLoadingWord(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <span>
              Kho Từ Vựng Cốt Lõi ({profileVocab.length} từ thông dụng{' '}
              {learnerProfile?.audience === 'kids' ? 'A1' : 'A1 → C1'})
            </span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Lọc theo cấp độ, chủ đề hoặc tìm nhanh — bấm vào bất kỳ từ nào để xem giải phẫu mặt chữ, IPA, mẹo nhớ và luyện nói!
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Tìm theo từ tiếng Anh hoặc nghĩa tiếng Việt..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <select
            value={topicFilter}
            onChange={(e) => {
              setTopicFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
          >
            <option value="ALL">Tất cả chủ đề ({availableTopics.length})</option>
            {availableTopics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {availableLevels.map((lv) => (
              <button
                key={lv}
                onClick={() => {
                  setLevelFilter(lv);
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  levelFilter === lv
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {lv === 'ALL' ? 'Tất cả cấp độ' : `Cấp ${lv}`}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-500">
            Tìm thấy <strong>{filtered.length}</strong> từ phù hợp
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Word Grid */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            {pageItems.map((item) => {
              const active = selectedWord?.word.toLowerCase() === item.word.toLowerCase();
              return (
                <div
                  key={item.word}
                  onClick={() => handleSelectItem(item)}
                  className={`p-3.5 flex items-center justify-between gap-2 cursor-pointer transition ${
                    active
                      ? 'bg-indigo-50 dark:bg-indigo-950/40'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-base">{item.word}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {item.level}
                      </span>
                      <span className="text-[11px] text-slate-400">({item.pos})</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">{item.meaningVi}</p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(item.word, accent, 0.9);
                    }}
                    className="p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 shrink-0"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-2">
            <button
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" /> Trước
            </button>
            <span className="text-xs text-slate-500">
              Trang <strong>{safePage}</strong> / {totalPages}
            </span>
            <button
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold disabled:opacity-40"
            >
              Sau <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Anatomy Card */}
        <div className="lg:col-span-7">
          {loadingWord ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 flex flex-col items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
              <p className="text-sm font-medium">Đang giải phẫu mặt chữ & tải phiên âm chuẩn...</p>
            </div>
          ) : selectedWord ? (
            <WordAnatomyCard
              wordEntry={selectedWord}
              accent={accent}
              isSaved={savedWords.some((w) => w.word.toLowerCase() === selectedWord.word.toLowerCase())}
              onSaveWord={onSaveWord}
              onPronunciationScore={onPronunciationScore}
            />
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center text-slate-500">
              <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Chọn một từ ở danh sách bên trái
              </p>
              <p className="text-xs mt-1">
                Hệ thống sẽ tách âm tiết, tô màu nguyên âm/phụ âm, hiển thị IPA, mẹo nhớ và cho phép bạn bấm Micro đọc thử ngay.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

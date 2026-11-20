import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookmarkCheck,
  BookmarkPlus,
  BookOpen,
  Search,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { CORE_VOCABULARY } from '../../data/coreVocabulary';
import { EXAM_ORDER, EXAM_PREP_DATA } from '../../data/exam/examPrepData';
import { getExamMeta, type ExamType, type LearnerProfile } from '../../types/audience';
import type { AccentMode, CefrLevel, SrsCardState, WordEntry } from '../../types/learning';
import { EXAM_IMAGE_MAP } from '../../utils/flashcardMedia';
import { speakText } from '../../utils/speechEngine';
import { PaginationBar, usePagination } from '../common/PaginationBar';
import { MemoryGamesSRS } from '../MemoryGamesSRS';
import { WritingGrammarLab } from '../WritingGrammarLab';
import {
  buildExamWordEntry,
  EXAM_PREF_EVENT,
  getPreferredExam,
  setPreferredExam,
} from './examPreferences';

export interface ExamVocabGrammarHubProps {
  accent: AccentMode;
  profile: LearnerProfile;
  geminiApiKey?: string;
  initialSub?: 'vocab' | 'grammar' | 'srs';
  savedWords: WordEntry[];
  srsCards: Record<string, SrsCardState>;
  savedCompletedGrammarIds?: string[];
  onSaveWord: (word: WordEntry) => void;
  onRateSrs: (wordId: string, quality: 0 | 2 | 4 | 5) => void;
  onCompleteGrammarId?: (id: string) => void;
  onAddXp: (amount: number) => void;
}

interface ExamVocabCardItem {
  id: string;
  phrase: string;
  meaningVi: string;
  level: CefrLevel;
  sourceTag: string;
  sourceKind: 'exam-key' | 'core-b1c1';
  tip?: string;
}

export const ExamVocabGrammarHub: React.FC<ExamVocabGrammarHubProps> = ({
  accent,
  profile,
  geminiApiKey,
  initialSub = 'vocab',
  savedWords,
  srsCards,
  savedCompletedGrammarIds,
  onSaveWord,
  onRateSrs,
  onCompleteGrammarId,
  onAddXp,
}) => {
  const [subTab, setSubTab] = useState<'vocab' | 'grammar' | 'srs'>(initialSub);
  const [selectedExam, setSelectedExam] = useState<ExamType>(() => getPreferredExam(profile));

  const [sourceFilter, setSourceFilter] = useState<'all' | 'exam-key' | 'core-b1c1'>('all');
  const [levelFilter, setLevelFilter] = useState<'ALL' | 'B1' | 'B2' | 'C1'>('ALL');
  const [query, setQuery] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSubTab(initialSub);
  }, [initialSub]);

  useEffect(() => {
    const sync = () => {
      setSelectedExam(getPreferredExam(profile));
    };
    window.addEventListener(EXAM_PREF_EVENT, sync);
    return () => window.removeEventListener(EXAM_PREF_EVENT, sync);
  }, [profile]);

  const savedWordSet = useMemo(
    () => new Set(savedWords.map((w) => w.word.trim().toLowerCase())),
    [savedWords]
  );

  const handleChangeExam = (ex: ExamType) => {
    setSelectedExam(ex);
    setPreferredExam(ex);
  };

  const examMeta = getExamMeta(selectedExam);

  const allVocabItems = useMemo<ExamVocabCardItem[]>(() => {
    const data = EXAM_PREP_DATA[selectedExam] || EXAM_PREP_DATA.ielts;
    const seen = new Set<string>();
    const items: ExamVocabCardItem[] = [];

    const pushUnique = (item: ExamVocabCardItem) => {
      const key = item.phrase.trim().toLowerCase();
      if (!key || seen.has(key)) return;
      seen.add(key);
      items.push(item);
    };

    data.skillPractice.writing.forEach((w) => {
      w.highBandKeywords.forEach((kw, i) => {
        pushUnique({
          id: `${selectedExam}-w-${w.id}-${i}`,
          phrase: kw.phrase,
          meaningVi: kw.meaningVi,
          level: 'B2',
          sourceTag: `Writing · ${w.taskLabel}`,
          sourceKind: 'exam-key',
          tip: kw.usageTip,
        });
      });
    });

    data.skillPractice.speaking.forEach((sp) => {
      sp.highScoreVocab.forEach((v, i) => {
        pushUnique({
          id: `${selectedExam}-sp-${sp.id}-${i}`,
          phrase: v.phrase,
          meaningVi: v.meaningVi,
          level: 'B2',
          sourceTag: `Speaking · ${sp.partLabel}`,
          sourceKind: 'exam-key',
        });
      });
    });

    data.skillPractice.reading.forEach((rd) => {
      rd.keyPhrases?.forEach((kp, i) => {
        pushUnique({
          id: `${selectedExam}-rd-${rd.id}-${i}`,
          phrase: kp.en,
          meaningVi: kp.vi,
          level: rd.level,
          sourceTag: `Reading · ${rd.partLabel}`,
          sourceKind: 'exam-key',
        });
      });
    });

    data.skillPractice.listening.forEach((ls) => {
      ls.keyPhrases?.forEach((kp, i) => {
        pushUnique({
          id: `${selectedExam}-ls-${ls.id}-${i}`,
          phrase: kp.en,
          meaningVi: kp.vi,
          level: ls.level,
          sourceTag: `Listening · ${ls.partLabel}`,
          sourceKind: 'exam-key',
        });
      });
    });

    CORE_VOCABULARY.filter(
      (c) => c.level === 'B1' || c.level === 'B2' || c.level === 'C1'
    ).forEach((c, idx) => {
      pushUnique({
        id: `core-${c.level}-${idx}`,
        phrase: c.word,
        meaningVi: `${c.meaningVi} (${c.pos})`,
        level: c.level,
        sourceTag: c.topic,
        sourceKind: 'core-b1c1',
      });
    });

    return items;
  }, [selectedExam]);

  const filteredVocab = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allVocabItems.filter((it) => {
      if (sourceFilter !== 'all' && it.sourceKind !== sourceFilter) return false;
      if (levelFilter !== 'ALL' && it.level !== levelFilter) return false;
      if (
        q &&
        !it.phrase.toLowerCase().includes(q) &&
        !it.meaningVi.toLowerCase().includes(q) &&
        !it.sourceTag.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  }, [allVocabItems, sourceFilter, levelFilter, query]);

  const pagination = usePagination(filteredVocab, 12, {
    resetKey: `${selectedExam}-${sourceFilter}-${levelFilter}-${query}`,
  });

  const examKeyCount = useMemo(
    () => allVocabItems.filter((i) => i.sourceKind === 'exam-key').length,
    [allVocabItems]
  );

  return (
    <div className="space-y-3.5">
      {/* Combined Exam Selector + 3 Tabs in one clean strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-3 py-2">
        <div className="flex items-center gap-2 shrink-0">
          <img
            src={EXAM_IMAGE_MAP[selectedExam] || '/img/art/exam-ielts.webp'}
            alt={examMeta.shortLabel}
            className="w-7 h-7 rounded-lg bg-slate-50 p-0.5 object-contain shrink-0"
          />
          <select
            value={selectedExam}
            onChange={(e) => handleChangeExam(e.target.value as ExamType)}
            aria-label="Chọn kỳ thi"
            className="min-h-[38px] px-2.5 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs sm:text-sm font-extrabold text-rose-700 dark:text-rose-300 outline-none cursor-pointer"
          >
            {EXAM_ORDER.map((exId) => (
              <option key={exId} value={exId}>
                {getExamMeta(exId).shortLabel}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'vocab', label: `Từ vựng (${allVocabItems.length})` },
              { id: 'grammar', label: 'Ngữ pháp thi' },
              { id: 'srs', label: `Ôn SRS (${savedWords.length})` },
            ] as const
          ).map((tab) => {
            const active = subTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSubTab(tab.id)}
                className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-extrabold shrink-0 transition ${
                  active
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {subTab === 'vocab' && (
        <div ref={listRef} className="space-y-3.5">
          {/* Compact Single-Row Search & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Tìm từ khóa ${examMeta.shortLabel} hoặc nghĩa...`}
                className="w-full min-h-[40px] pl-9 pr-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value as 'all' | 'exam-key' | 'core-b1c1')}
                aria-label="Nguồn từ vựng"
                className="min-h-[40px] px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value="all">Tất cả nguồn ({allVocabItems.length})</option>
                <option value="exam-key">Từ ăn điểm {examMeta.shortLabel} ({examKeyCount})</option>
                <option value="core-b1c1">Từ cốt lõi B1–C1</option>
              </select>

              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as 'ALL' | 'B1' | 'B2' | 'C1')}
                aria-label="Cấp độ CEFR"
                className="min-h-[40px] px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
              >
                <option value="ALL">Mọi cấp</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
                <option value="C1">C1</option>
              </select>
            </div>
          </div>

          {/* 2-Column Vocab Cards */}
          {pagination.pageItems.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
              <BookOpen className="w-7 h-7 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                Không tìm thấy từ khóa nào khớp bộ lọc.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pagination.pageItems.map((item) => {
                const isSaved = savedWordSet.has(item.phrase.trim().toLowerCase());
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-2.5"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold ${
                            item.sourceKind === 'exam-key'
                              ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300'
                              : 'bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300'
                          }`}
                        >
                          {item.sourceTag}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-black">
                          {item.level}
                        </span>
                      </div>

                      <div className="text-base font-black text-slate-900 dark:text-white leading-snug">
                        {item.phrase}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.meaningVi}
                      </p>
                      {item.tip && (
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 flex items-start gap-1">
                          <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{item.tip}</span>
                        </p>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => speakText(item.phrase, accent, 0.9)}
                        className="min-h-[38px] px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-xs font-extrabold text-slate-700 dark:text-slate-200 inline-flex items-center gap-1.5"
                      >
                        <Volume2 className="w-4 h-4 text-indigo-600" />
                        <span>Nghe phát âm</span>
                      </button>

                      <button
                        type="button"
                        disabled={isSaved}
                        onClick={() =>
                          onSaveWord(
                            buildExamWordEntry({
                              phrase: item.phrase,
                              meaningVi: item.meaningVi,
                              examType: selectedExam,
                              level: item.level,
                              note: item.tip || item.sourceTag,
                            })
                          )
                        }
                        className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 transition ${
                          isSaved
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-rose-600 hover:bg-rose-700 text-white'
                        }`}
                      >
                        {isSaved ? (
                          <>
                            <BookmarkCheck className="w-4 h-4" /> Đã lưu SRS
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="w-4 h-4" /> Lưu SRS
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredVocab.length > 12 && (
            <PaginationBar
              page={pagination.page}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              startIdx={pagination.startIdx}
              endIdx={pagination.endIdx}
              onPageChange={pagination.setPage}
              itemLabel="từ vựng"
              scrollTargetRef={listRef}
            />
          )}
        </div>
      )}

      {subTab === 'grammar' && (
        <WritingGrammarLab
          accent={accent}
          learnerProfile={profile}
          geminiApiKey={geminiApiKey}
          onAddXp={onAddXp}
          devUnlockAll={true}
          savedCompletedGrammarIds={savedCompletedGrammarIds ?? []}
          onCompleteGrammarId={onCompleteGrammarId}
        />
      )}

      {subTab === 'srs' && (
        <MemoryGamesSRS
          accent={accent}
          savedWords={savedWords}
          srsCards={srsCards}
          onRateSrs={onRateSrs}
          onAddXp={onAddXp}
        />
      )}
    </div>
  );
};

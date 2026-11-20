import React, { useState } from 'react';
import { Loader2, Search, Sparkles } from 'lucide-react';
import type { AccentMode, WordEntry } from '../../types/learning';
import { analyzeWordFull } from '../../utils/wordAnalyzer';
import { WordAnatomyCard } from '../WordAnatomyCard';
import { BottomSheet } from './ui/BottomSheet';
import { AppButton } from './ui/Button';
import type { AgeTier } from './theme/ageTiers';

export interface SearchSheetProps {
  open: boolean;
  onClose: () => void;
  tier: AgeTier;
  accent: AccentMode;
  savedWords: WordEntry[];
  onSaveWord: (word: WordEntry) => void;
  onPronunciationScore: (score: number) => void;
}

const QUICK_SUGGESTIONS = ['resilient', 'collaborate', 'deadline', 'negotiate', 'hypothesis'];

export const SearchSheet: React.FC<SearchSheetProps> = ({
  open,
  onClose,
  tier,
  accent,
  savedWords,
  onSaveWord,
  onPronunciationScore,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WordEntry | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runSearch = async (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setLoading(true);
    setError(null);
    try {
      const res = await analyzeWordFull(clean);
      setResult(res);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Không thể phân tích từ này.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch(query);
  };

  return (
    <BottomSheet open={open} onClose={onClose} title="Tra từ điển thông minh">
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nhập từ tiếng Anh cần tra..."
              className="w-full min-h-[46px] pl-10 pr-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <AppButton tier={tier} type="submit" disabled={loading || !query.trim()}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Tra'}
          </AppButton>
        </form>

        {!result && !loading && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              Gợi ý tra nhanh
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_SUGGESTIONS.map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => {
                    setQuery(w);
                    runSearch(w);
                  }}
                  className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-brand-soft hover:text-brand transition"
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-sm font-semibold text-rose-700 dark:text-rose-300">
            {error}
          </div>
        )}

        {result && (
          <WordAnatomyCard
            wordEntry={result}
            accent={accent}
            isSaved={savedWords.some((w) => w.word.toLowerCase() === result.word.toLowerCase())}
            onSaveWord={onSaveWord}
            onPronunciationScore={onPronunciationScore}
          />
        )}
      </div>
    </BottomSheet>
  );
};

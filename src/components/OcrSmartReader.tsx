import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Camera, FileText, Volume2, Sparkles, Loader2, Upload, Eye } from 'lucide-react';
import { READING_PASSAGES } from '../data/curriculumData';
import { AccentMode, WordEntry } from '../types/learning';
import { analyzeWordFull } from '../utils/wordAnalyzer';
import { speakText } from '../utils/speechEngine';
import { WordAnatomyCard } from './WordAnatomyCard';

interface OcrSmartReaderProps {
  accent: AccentMode;
  savedWords: WordEntry[];
  onSaveWord: (word: WordEntry) => void;
  onPronunciationScore: (score: number) => void;
}

export const OcrSmartReader: React.FC<OcrSmartReaderProps> = ({
  accent,
  savedWords,
  onSaveWord,
  onPronunciationScore,
}) => {
  const [text, setText] = useState(READING_PASSAGES[0].content);
  const [translation, setTranslation] = useState<string | null>(READING_PASSAGES[0].translation);
  const [showTranslation, setShowTranslation] = useState(false);

  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [ocrPreview, setOcrPreview] = useState<string | null>(null);

  const [selectedWord, setSelectedWord] = useState<WordEntry | null>(null);
  const [wordLoading, setWordLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    const url = URL.createObjectURL(file);
    setOcrPreview(url);
    setOcrLoading(true);
    setOcrProgress(0);
    setTranslation(null);

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text' && typeof m.progress === 'number') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        },
      });
      const extracted = result.data.text.trim();
      setText(extracted || 'Không nhận diện được chữ tiếng Anh rõ nét trong ảnh. Vui lòng thử ảnh rõ hơn.');
    } catch {
      setText('Có lỗi xảy ra khi quét ảnh. Vui lòng thử lại.');
    } finally {
      setOcrLoading(false);
    }
  };

  const handleTapWord = async (rawToken: string) => {
    const clean = rawToken.replace(/[^a-zA-Z'-]/g, '');
    if (!clean) return;
    setWordLoading(true);
    try {
      const analyzed = await analyzeWordFull(clean);
      setSelectedWord(analyzed);
      speakText(analyzed.word, accent, 0.95, analyzed.audioUrl);
    } finally {
      setWordLoading(false);
    }
  };

  const tokens = text.split(/(\s+)/);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Quét Chữ Từ Ảnh (OCR) & Đọc Văn Bản Tương Tác
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Tải ảnh chụp sách/tài liệu hoặc chọn bài đọc mẫu. <strong>Chạm vào bất kỳ từ nào</strong> để xem tách âm tiết, tô màu mặt chữ, nghĩa tiếng Việt và nghe đọc!
        </p>
      </div>

      {/* Source Bar: Passages + Upload Image */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" /> Bài đọc phân cấp:
          </span>
          {READING_PASSAGES.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setText(p.content);
                setTranslation(p.translation);
                setOcrPreview(null);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-300 transition"
            >
              [{p.level}] {p.title}
            </button>
          ))}
        </div>

        <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer shadow-sm transition">
          <Camera className="w-4 h-4" />
          <span>Quét chữ từ Ảnh (OCR)</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImageUpload(f);
            }}
          />
        </label>
      </div>

      {ocrLoading && (
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-indigo-900 dark:text-indigo-200">
              Đang nhận diện mặt chữ từ hình ảnh... ({ocrProgress}%)
            </div>
            <div className="w-full h-2 bg-indigo-200 dark:bg-indigo-900 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-indigo-600 transition-all" style={{ width: `${ocrProgress}%` }} />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Tap-to-Analyze Reader */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Chạm vào từng chữ bên dưới để phân tích
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakText(text, accent, 0.9)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-semibold"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Đọc cả đoạn
                </button>
                {translation && (
                  <button
                    onClick={() => setShowTranslation(!showTranslation)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5" /> {showTranslation ? 'Ẩn dịch' : 'Xem dịch'}
                  </button>
                )}
              </div>
            </div>

            {ocrPreview && (
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-48 flex justify-center bg-slate-100 dark:bg-slate-800">
                <img src={ocrPreview} alt="Ảnh đã tải lên" className="object-contain max-h-48" />
              </div>
            )}

            <div className="text-lg leading-loose text-slate-800 dark:text-slate-100 select-none">
              {tokens.map((tok, i) => {
                if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
                const clean = tok.replace(/[^a-zA-Z'-]/g, '').toLowerCase();
                const isSelected = selectedWord?.word.toLowerCase() === clean;
                return (
                  <button
                    key={i}
                    onClick={() => handleTapWord(tok)}
                    className={`inline px-1 py-0.5 rounded-md transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-indigo-700 dark:hover:text-amber-300'
                    }`}
                  >
                    {tok}
                  </button>
                );
              })}
            </div>

            {showTranslation && translation && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300">
                <strong>Bản dịch tham khảo:</strong> {translation}
              </div>
            )}

            {/* Paste custom text */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <label className="text-xs font-semibold text-slate-500 flex items-center gap-1 mb-1.5">
                <Upload className="w-3.5 h-3.5" /> Hoặc dán đoạn văn tiếng Anh bất kỳ vào đây:
              </label>
              <textarea
                rows={3}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setTranslation(null);
                }}
                className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Right: Word Anatomy Inspector */}
        <div className="lg:col-span-6">
          {wordLoading ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 flex flex-col items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
              <p className="text-sm font-medium">Đang phân tích mặt chữ, tách âm tiết & tra từ điển...</p>
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
                Chạm vào bất kỳ từ tiếng Anh nào ở bên trái
              </p>
              <p className="text-xs mt-1">
                Hệ thống sẽ tách âm tiết, tô màu nguyên âm/phụ âm, giải thích quy tắc đọc và phát âm chuẩn cho bạn.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

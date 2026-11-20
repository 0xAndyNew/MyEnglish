import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Turtle, Mic, Square, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { IPA_PHONEMES } from '../data/ipaData';
import { AccentMode, IpaCategory, PhonemeIPA } from '../types/learning';
import {
  isSpeechRecognitionSupported,
  playLoudAudioUrl,
  scorePronunciation,
  speakText,
  startSpeechRecognition,
} from '../utils/speechEngine';
import { AlphabetFoundation } from './AlphabetFoundation';

interface IpaPhonicsLabProps {
  accent: AccentMode;
  masteredPhonemes: string[];
  onToggleMastered: (id: string) => void;
  defaultSubStep?: 'alphabet' | 'vowels' | 'consonants' | 'all';
  isStepCompleted?: boolean;
  onCompleteStep1B?: () => void;
  savedPassedPairs?: string[];
  onPassPair?: (pairId: string) => void;
}

const CATEGORY_LABELS: { id: 'all' | IpaCategory; label: string; color: string }[] = [
  { id: 'all', label: 'Tất cả (44 âm)', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200' },
  { id: 'monophthong', label: '12 Nguyên âm đơn', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300' },
  { id: 'diphthong', label: '8 Nguyên âm đôi', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
  { id: 'voiceless_consonant', label: 'Phụ âm Vô thanh (Bật hơi)', color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300' },
  { id: 'voiced_consonant', label: 'Phụ âm Hữu thanh (Rung cổ)', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
];

export const IpaPhonicsLab: React.FC<IpaPhonicsLabProps> = ({
  accent,
  masteredPhonemes,
  onToggleMastered,
  defaultSubStep = 'vowels',
  isStepCompleted = false,
  onCompleteStep1B,
  savedPassedPairs,
  onPassPair,
}) => {
  const [subStep, setSubStep] = useState<'alphabet' | 'vowels' | 'consonants' | 'all'>(defaultSubStep);
  const [filter, setFilter] = useState<'all' | IpaCategory>('all');
  const [selected, setSelected] = useState<PhonemeIPA>(IPA_PHONEMES[0]);
  const [testingWord, setTestingWord] = useState<string | null>(null);
  const [micInterim, setMicInterim] = useState('');
  const [micError, setMicError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ word: string; score: number; heard: string; audioUrl?: string } | null>(null);
  const stopMicRef = useRef<((abort?: boolean) => void) | null>(null);

  useEffect(() => {
    return () => {
      stopMicRef.current?.(true);
      stopMicRef.current = null;
    };
  }, []);

  useEffect(() => {
    const url = testResult?.audioUrl;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [testResult?.audioUrl]);

  // IPA & Ending sound listening quiz (12 pairs: Vowels + Consonants/Ending sounds)
  const [ipaQuizSeed, setIpaQuizSeed] = useState(0);
  const [ipaQuizPick, setIpaQuizPick] = useState<string | null>(null);
  const [localPassedPairs, setLocalPassedPairs] = useState<string[]>([]);
  const passedPairs = savedPassedPairs ?? localPassedPairs;

  const IPA_LISTENING_QUIZ = [
    { id: 'p1', target: 'nice', other: 'nine', ipa: '/naɪs/', note: 'Âm cuối xì hơi /s/' },
    { id: 'p2', target: 'sheep', other: 'ship', ipa: '/ʃiːp/', note: 'Nguyên âm i dài /iː/' },
    { id: 'p3', target: 'life', other: 'live', ipa: '/laɪf/', note: 'Âm cuối thổi hơi /f/' },
    { id: 'p4', target: 'bed', other: 'bad', ipa: '/bed/', note: 'Nguyên âm e ngắn /e/' },
    { id: 'p5', target: 'cap', other: 'cat', ipa: '/kæp/', note: 'Âm cuối mím môi bật /p/' },
    { id: 'p6', target: 'rise', other: 'rice', ipa: '/raɪz/', note: 'Âm cuối rung cổ /z/' },
    { id: 'p7', target: 'leave', other: 'live', ipa: '/liːv/', note: 'Nguyên âm i dài /iː/' },
    { id: 'p8', target: 'pool', other: 'pull', ipa: '/puːl/', note: 'Nguyên âm u dài tròn môi /uː/' },
    { id: 'p9', target: 'man', other: 'men', ipa: '/mæn/', note: 'Nguyên âm e bẹt /æ/' },
    { id: 'p10', target: 'cut', other: 'cat', ipa: '/kʌt/', note: 'Nguyên âm á ngắn /ʌ/' },
    { id: 'p11', target: 'bag', other: 'back', ipa: '/bæɡ/', note: 'Âm cuối rung cuống lưỡi /ɡ/' },
    { id: 'p12', target: 'had', other: 'hat', ipa: '/hæd/', note: 'Âm cuối rung nhẹ /d/' },
  ];

  const remainingPairs = IPA_LISTENING_QUIZ.filter((p) => !passedPairs.includes(p.id));
  const currentIpaQuiz =
    (remainingPairs.length > 0 ? remainingPairs : IPA_LISTENING_QUIZ)[
      ipaQuizSeed % (remainingPairs.length > 0 ? remainingPairs.length : IPA_LISTENING_QUIZ.length)
    ];

  const effectiveFilter =
    subStep === 'vowels'
      ? (p: PhonemeIPA) => p.category === 'monophthong' || p.category === 'diphthong'
      : subStep === 'consonants'
      ? (p: PhonemeIPA) => p.category === 'voiceless_consonant' || p.category === 'voiced_consonant'
      : filter === 'all'
      ? () => true
      : (p: PhonemeIPA) => p.category === filter;

  const filtered = IPA_PHONEMES.filter(effectiveFilter);

  const getTileColor = (cat: IpaCategory, isSelected: boolean) => {
    if (isSelected) return 'ring-2 ring-indigo-600 bg-indigo-600 text-white shadow-md scale-[1.03]';
    switch (cat) {
      case 'monophthong':
        return 'bg-orange-50 hover:bg-orange-100 text-orange-900 border-orange-200 dark:bg-orange-950/30 dark:text-orange-200 dark:border-orange-900/50';
      case 'diphthong':
        return 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950/30 dark:text-amber-200 dark:border-amber-900/50';
      case 'voiceless_consonant':
        return 'bg-sky-50 hover:bg-sky-100 text-sky-900 border-sky-200 dark:bg-sky-950/30 dark:text-sky-200 dark:border-sky-900/50';
      case 'voiced_consonant':
        return 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-200 dark:border-emerald-900/50';
    }
  };

  const handleTestExample = (word: string) => {
    if (testingWord === word) {
      stopMicRef.current?.(false);
      return;
    }
    if (!isSpeechRecognitionSupported()) {
      setMicError('Trình duyệt không hỗ trợ thu âm Micro.');
      return;
    }
    stopMicRef.current?.(true);
    setTestingWord(word);
    setMicError(null);
    setMicInterim('');
    setTestResult(null);
    stopMicRef.current = startSpeechRecognition(
      accent,
      (transcript, meta) => {
        const res = scorePronunciation(word, transcript);
        setTestResult({ word, score: res.score, heard: transcript, audioUrl: meta?.audioUrl });
      },
      (err) => setMicError(err),
      () => {
        setTestingWord(null);
        setMicInterim('');
        stopMicRef.current = null;
      },
      {
        onInterim: (text) => setMicInterim(text),
      }
    );
  };

  const isMastered = masteredPhonemes.includes(selected.id);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold">
          Đã thuộc {masteredPhonemes.length}/44 âm IPA
        </span>

        <div className="flex overflow-x-auto no-scrollbar bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1 w-full sm:w-auto">
          {[
            { id: 'vowels', label: '20 Nguyên âm' },
            { id: 'consonants', label: '24 Phụ âm' },
            { id: 'all', label: 'Tất cả 44' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setSubStep(tab.id as any);
                if (tab.id === 'vowels') setSelected(IPA_PHONEMES[0]);
                if (tab.id === 'consonants') setSelected(IPA_PHONEMES[20]);
              }}
              className={`min-h-[40px] px-3.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition ${
                subStep === tab.id
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 1B Unlock Banner */}
      {onCompleteStep1B && (
        <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
            <strong>🎯 Nhiệm vụ mở khóa Bước 2A (Nạp Từ Vựng 133 bài):</strong>{' '}
            Nghe & phân biệt chính xác cả 12 cặp âm IPA / Âm cuối bên dưới ({isStepCompleted ? 12 : passedPairs.length}/12 cặp âm).
          </div>
          {isStepCompleted || passedPairs.length >= IPA_LISTENING_QUIZ.length ? (
            <button
              onClick={onCompleteStep1B}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition"
            >
              🎉 Đạt chuẩn 12/12! Mở khóa Bước 2A: Nạp Từ Vựng →
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold text-slate-500 border border-slate-200 dark:border-slate-700">
              🔒 Còn {IPA_LISTENING_QUIZ.length - passedPairs.length} cặp âm để mở khóa
            </span>
          )}
        </div>
      )}

      {subStep === 'alphabet' ? (
        <AlphabetFoundation accent={accent} />
      ) : (
        <>
          {subStep === 'all' && (
            <div className="flex flex-wrap gap-2">
              {CATEGORY_LABELS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                    filter === cat.id
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 ' + cat.color
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 44 IPA Grid */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {filtered.map((item) => {
              const active = item.id === selected.id;
              const mastered = masteredPhonemes.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelected(item);
                    speakText(item.examples[0]?.word || item.symbol, accent, 0.85);
                  }}
                  className={`relative flex flex-col items-center justify-center p-2.5 rounded-xl border transition ${getTileColor(
                    item.category,
                    active
                  )}`}
                >
                  {mastered && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 absolute top-1 right-1" />
                  )}
                  <span className="font-mono text-xl font-bold">/{item.symbol}/</span>
                  <span className="text-[10px] mt-0.5 opacity-80 truncate max-w-full">
                    {item.examples[0]?.word}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Mouth Shape & Phonics Inspector */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-mono text-3xl font-extrabold shadow-md">
                /{selected.symbol}/
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{selected.nameVi}</h3>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                  {selected.vietApprox}
                </p>
              </div>
            </div>

            <button
              onClick={() => onToggleMastered(selected.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                isMastered
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isMastered ? 'Đã thuộc âm này' : 'Đánh dấu đã thuộc'}</span>
            </button>
          </div>

          {/* Mouth & Tongue guide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-xs font-bold text-slate-500 uppercase mb-1">👄 Khẩu hình miệng</div>
              <p className="text-slate-800 dark:text-slate-200">{selected.mouthShape}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <div className="text-xs font-bold text-slate-500 uppercase mb-1">👅 Vị trí lưỡi</div>
              <p className="text-slate-800 dark:text-slate-200">{selected.tonguePos}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold">
              🎙️ Thanh quản: {selected.vocalCord}
            </span>
          </div>

          {/* Spelling Patterns (Nhận diện mặt chữ) */}
          <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/25 border border-sky-100 dark:border-sky-900/50">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Nhận diện mặt chữ: Khi thấy chữ nào thì đọc âm /{selected.symbol}/?</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.spellingPatterns.map((pat, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-sky-200 dark:border-sky-800"
                >
                  {pat}
                </span>
              ))}
            </div>
          </div>

          {/* Common mistake */}
          <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/25 border border-amber-200/70 dark:border-amber-900/50 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200">
              <strong>Lỗi người Việt hay mắc:</strong> {selected.commonMistake}
            </p>
          </div>

          {/* Examples */}
          <div>
            <div className="text-xs font-bold uppercase text-slate-500 mb-2">Từ mẫu luyện tập (Bấm nghe hoặc thử đọc)</div>
            <div className="space-y-2">
              {selected.examples.map((ex, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"
                >
                  <div>
                    <span className="font-bold text-base text-slate-900 dark:text-white">{ex.word}</span>
                    <span className="ml-2 font-mono text-xs text-indigo-600 dark:text-indigo-400">{ex.ipa}</span>
                    <span className="ml-2 text-xs text-slate-500">— {ex.meaning}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => speakText(ex.word, accent, 1.0)}
                      className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:text-indigo-600"
                      title="Nghe 1.0x"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => speakText(ex.word, accent, 0.55)}
                      className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:text-amber-600"
                      title="Nghe chậm"
                    >
                      <Turtle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleTestExample(ex.word)}
                      className={`p-2 rounded-lg border transition ${
                        testingWord === ex.word
                          ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                          : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                      }`}
                      title={testingWord === ex.word ? 'Dừng & chấm điểm' : 'Đọc thử vào Micro'}
                    >
                      {testingWord === ex.word ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {testingWord && micInterim && (
              <div className="mt-2 p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                ● {micInterim}
              </div>
            )}
            {micError && (
              <div className="mt-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300">
                {micError}
              </div>
            )}
            {testResult && (
              <div className="mt-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs flex flex-wrap items-center justify-between gap-2">
                <span>
                  Từ <strong>{testResult.word}</strong>: Điểm <strong>{testResult.score}%</strong> (Máy nghe: "{testResult.heard}")
                </span>
                {testResult.audioUrl && (
                  <button
                    type="button"
                    onClick={() => playLoudAudioUrl(testResult.audioUrl!, { gain: 1.4 })}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold inline-flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Nghe lại giọng bạn
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Minimal Pair */}
          {selected.minimalPair && (
            <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20">
              <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1.5">
                ⚖️ Cặp từ dễ nhầm (Minimal Pair)
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => speakText(selected.minimalPair!.wordA, accent, 0.85)}
                  className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold hover:border-indigo-500"
                >
                  🔊 {selected.minimalPair.wordA}{' '}
                  <span className="font-mono text-xs text-indigo-500">{selected.minimalPair.ipaA}</span>
                </button>
                <span className="text-xs text-slate-400">vs</span>
                <button
                  onClick={() => speakText(selected.minimalPair!.wordB, accent, 0.85)}
                  className="px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold hover:border-indigo-500"
                >
                  🔊 {selected.minimalPair.wordB}{' '}
                  <span className="font-mono text-xs text-indigo-500">{selected.minimalPair.ipaB}</span>
                </button>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5">{selected.minimalPair.note}</p>
            </div>
          )}
        </div>
      </div>

      {/* Ending Sounds Drill (Bước 1 chuẩn hóa âm cuối) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            🎯 Luyện Âm Cuối (Ending Sounds) & Trọng Âm — Tránh Nói Nhầm Nghĩa
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            Tiếng Anh phân biệt nghĩa nhờ âm đuôi (ví dụ <strong>nine</strong> /n/ vs <strong>nice</strong> /s/). Bấm nghe từng cặp và bấm Micro đọc thử!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { a: 'nine', ipaA: '/naɪn/', viA: 'số 9', b: 'nice', ipaB: '/naɪs/', viB: 'tốt đẹp', tip: 'Ngân âm mũi /n/ vs xì hơi /s/' },
            { a: 'live', ipaA: '/lɪv/', viA: 'sống', b: 'life', ipaB: '/laɪf/', viB: 'cuộc sống', tip: 'Rung môi /v/ vs thổi hơi /f/' },
            { a: 'cap', ipaA: '/kæp/', viA: 'mũ lưỡi trai', b: 'cat', ipaB: '/kæt/', viB: 'con mèo', tip: 'Mím môi bật /p/ vs đầu lưỡi bật /t/' },
            { a: 'bag', ipaA: '/bæɡ/', viA: 'cái túi', b: 'back', ipaB: '/bæk/', viB: 'lưng / quay lại', tip: 'Rung cuống lưỡi /ɡ/ vs bật hơi /k/' },
            { a: 'rice', ipaA: '/raɪs/', viA: 'cơm, gạo', b: 'rise', ipaB: '/raɪz/', viB: 'tăng lên, mọc', tip: 'Xì /s/ vô thanh vs rung /z/ hữu thanh' },
            { a: 'hat', ipaA: '/hæt/', viA: 'cái mũ', b: 'had', ipaB: '/hæd/', viB: 'đã có', tip: 'Bật hơi /t/ vs rung nhẹ /d/' },
          ].map((pair, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => speakText(pair.a, accent, 0.85)}
                  className="flex-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left hover:border-indigo-400"
                >
                  <div className="font-bold text-sm text-slate-900 dark:text-white">🔊 {pair.a}</div>
                  <div className="font-mono text-[11px] text-indigo-500">{pair.ipaA}</div>
                  <div className="text-[11px] text-slate-500">{pair.viA}</div>
                </button>
                <span className="text-xs font-bold text-slate-400">vs</span>
                <button
                  onClick={() => speakText(pair.b, accent, 0.85)}
                  className="flex-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-left hover:border-indigo-400"
                >
                  <div className="font-bold text-sm text-slate-900 dark:text-white">🔊 {pair.b}</div>
                  <div className="font-mono text-[11px] text-indigo-500">{pair.ipaB}</div>
                  <div className="text-[11px] text-slate-500">{pair.viB}</div>
                </button>
              </div>
              <p className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">💡 {pair.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive IPA & Ending Sound Listening Test */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-extrabold text-indigo-700 dark:text-indigo-300">
              🎧 Kiểm Tra Nhanh: Nghe & Phân Biệt Âm IPA / Âm Cuối
            </h3>
            <p className="text-xs text-slate-500">
              Bấm nghe từ máy đọc và chọn đúng mặt chữ bạn vừa nghe được!
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300">
            Đã phân biệt đúng: {passedPairs.length}/{IPA_LISTENING_QUIZ.length} cặp âm
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => speakText(currentIpaQuiz.target, accent, 0.85)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
          >
            <Volume2 className="w-4 h-4" /> Nghe từ cần phân biệt
          </button>

          {[currentIpaQuiz.target, currentIpaQuiz.other].sort().map((opt) => {
            const picked = ipaQuizPick === opt;
            const isRight = opt === currentIpaQuiz.target;
            let cls = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
            if (ipaQuizPick) {
              if (isRight) cls = 'bg-emerald-100 border-emerald-500 text-emerald-900';
              else if (picked) cls = 'bg-rose-100 border-rose-500 text-rose-900';
            }
            return (
              <button
                key={opt}
                disabled={Boolean(ipaQuizPick)}
                onClick={() => {
                  setIpaQuizPick(opt);
                  if (isRight) {
                    setLocalPassedPairs((prev) =>
                      prev.includes(currentIpaQuiz.id) ? prev : [...prev, currentIpaQuiz.id]
                    );
                    onPassPair?.(currentIpaQuiz.id);
                  }
                }}
                className={`px-5 py-2 rounded-xl border font-bold text-sm transition ${cls}`}
              >
                {opt}
              </button>
            );
          })}

          {ipaQuizPick && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-600 dark:text-slate-300">
                Đáp án: <strong>{currentIpaQuiz.target}</strong> ({currentIpaQuiz.ipa} — {currentIpaQuiz.note})
              </span>
              <button
                onClick={() => {
                  setIpaQuizPick(null);
                  setIpaQuizSeed((s) => s + 1);
                }}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Câu tiếp theo →
              </button>
            </div>
          )}
        </div>
      </div>
        </>
      )}
    </div>
  );
};

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Home,
  Sparkles,
  Turtle,
  Volume2,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { LEW_OBSERVATION_META, type LewAgeLevelMeta } from '../../data/preschool/lewLevels';
import { LEW_TOPICS } from '../../data/preschool/lewTopics';
import type {
  LewChildProfile,
  LewObservationCode,
  LewTopic,
} from '../../data/preschool/lewTypes';
import { unitCoverUrl, wordImageUrl } from '../../data/preschool/types';
import { LewGames } from './LewGames';
import { RewardBurst } from './ui/RewardBurst';
import type { useKidAudio } from './ui/useKidAudio';

export type LessonStepId = 1 | 2 | 3 | 4 | 5 | 6;

const STEP_META: { id: LessonStepId; shortVi: string; titleVi: string }[] = [
  { id: 1, shortVi: '1. Khởi động', titleVi: 'Warm-up · Chào hỏi & Làm quen' },
  { id: 2, shortVi: '2. Từ & Câu', titleVi: 'Input · Hình ảnh, Phát âm & Câu mẫu' },
  { id: 3, shortVi: '3. Nghe hiểu', titleVi: 'Listening · Nghe & Chọn hình đúng' },
  { id: 4, shortVi: '4. Trò chơi', titleVi: 'Game · Tương tác vui theo độ tuổi' },
  { id: 5, shortVi: '5. Cùng cha mẹ', titleVi: 'Parent Activity · Hoạt động ngoài màn hình' },
  { id: 6, shortVi: '6. Hoàn thành', titleVi: 'Review & Complete · Nhận Sticker & Ghi nhận' },
];

interface LessonFlowProps {
  topic: LewTopic;
  child: LewChildProfile;
  levelMeta: LewAgeLevelMeta;
  initialStep?: LessonStepId;
  audio: ReturnType<typeof useKidAudio>;
  onFinishLesson: (observations: LewObservationCode[], parentNote: string) => void;
  onExit: () => void;
}

export const LessonFlow: React.FC<LessonFlowProps> = ({
  topic,
  child,
  levelMeta,
  initialStep,
  audio,
  onFinishLesson,
  onExit,
}) => {
  const variant = topic.levels[levelMeta.id];
  const activeWords = topic.words.slice(0, variant.wordCount);

  // Always start at Step 1 (Khởi động) when entering a lesson unless parent explicitly picks Step 5 Guide
  const [step, setStep] = useState<LessonStepId>(initialStep || 1);
  const [wordIdx, setWordIdx] = useState(0);
  const [listenIdx, setListenIdx] = useState(0);
  const [listenPraised, setListenPraised] = useState(false);
  const [storyIdx, setStoryIdx] = useState(0);

  // Step 6 observation state
  const [selectedObs, setSelectedObs] = useState<LewObservationCode[]>(['recognized']);
  const [parentNote, setParentNote] = useState('');

  const currentWord = activeWords[wordIdx % activeWords.length] || activeWords[0];
  const listenTarget = activeWords[listenIdx % activeWords.length] || activeWords[0];

  useEffect(() => {
    if (step === 1) {
      audio.speak(`Hello ${child.name}! Let's learn about ${topic.titleEn}!`, 0.85);
    } else if (step === 2 && currentWord) {
      audio.speak(currentWord.word, 0.82);
    } else if (step === 3 && listenTarget) {
      setListenPraised(false);
      audio.speak(`Where is ${listenTarget.word}?`, 0.82);
    } else if (step === 6) {
      audio.playSfx('celebrate');
      audio.speak(`Great job ${child.name}! You earned a sticker!`, 0.85);
    }
  }, [step, wordIdx, listenIdx]);

  const toggleObs = (code: LewObservationCode) => {
    setSelectedObs((prev) =>
      prev.includes(code) ? prev.filter((x) => x !== code) : [...prev, code]
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col font-kid">
      {/* Top Navigation & Free Step Selector */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b-2 border-amber-100 px-3 sm:px-6 py-2.5 shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              audio.stopAll();
              onExit();
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm transition"
          >
            <Home className="w-4 h-4" />
            <span>{LEW_TOPICS.length} Chủ đề</span>
          </button>

          {/* 6 clickable step pills — never locked, skip/jump anytime */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {STEP_META.map((s) => {
              const active = step === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    audio.stopAll();
                    setStep(s.id);
                  }}
                  style={active ? { backgroundColor: topic.color } : undefined}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-extrabold transition ${
                    active
                      ? 'text-white shadow-sm scale-105'
                      : 'bg-slate-100 text-slate-600 hover:bg-amber-100'
                  }`}
                >
                  {s.shortVi}
                </button>
              );
            })}
          </div>

          <div
            className="px-3 py-1 rounded-full text-xs font-extrabold text-white hidden md:inline-block"
            style={{ backgroundColor: levelMeta.color }}
          >
            {levelMeta.code} · {levelMeta.shortAgeVi}
          </div>
        </div>
      </header>

      {/* Parent-led Mode Banner for 1–2 years old */}
      {levelMeta.isParentLed && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs font-bold text-amber-900">
          👶 <strong>Chế độ Cha Mẹ Dẫn Dắt (1–2 tuổi):</strong> Cha mẹ mở âm thanh mẫu, xem kịch bản gợi ý và chơi trực tiếp với bé bằng đồ vật thật.
        </div>
      )}

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5 flex flex-col justify-between gap-6">
        {/* STEP 1: WARM-UP */}
        {step === 1 && (
          <div className="my-auto bg-white rounded-[36px] border-4 border-amber-100 p-6 sm:p-10 text-center space-y-6 shadow-md">
            <div className="mx-auto max-w-md h-52 sm:h-60 rounded-[28px] overflow-hidden border-2 border-slate-100 bg-white p-2 shadow-sm flex items-center justify-center">
              <img
                src={unitCoverUrl(topic.coverSlug)}
                alt={topic.titleEn}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold">
                Chủ đề {topic.code} · {levelMeta.name} ({levelMeta.ageRangeVi})
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {topic.titleEn} — {topic.titleVi}
              </h1>
              <p className="text-sm font-bold text-slate-600 max-w-xl mx-auto">
                🎯 <strong>Mục tiêu hôm nay:</strong> {variant.objectiveVi}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  audio.speak(
                    `Hello ${child.name}! Today we play with ${topic.titleEn}!`,
                    0.85
                  )
                }
                className="px-5 py-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-base inline-flex items-center gap-2"
              >
                <Volume2 className="w-5 h-5" />
                <span>Nghe Benny chào bé</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                style={{ backgroundColor: topic.color }}
                className="kid-btn-3d px-8 py-4 rounded-full text-white font-extrabold text-xl inline-flex items-center gap-2 shadow-md"
              >
                <span>Khám phá từ mới</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: INPUT (VOCABULARY & SAMPLE SENTENCES) */}
        {step === 2 && currentWord && (
          <div className="space-y-5">
            {/* Word selector thumbnails */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {activeWords.map((w, idx) => {
                const active = idx === wordIdx;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWordIdx(idx)}
                    className={`px-3 py-1.5 rounded-2xl border-2 flex items-center gap-2 transition ${
                      active
                        ? 'bg-amber-400 text-slate-900 border-amber-500 font-extrabold shadow-xs scale-105'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300 font-bold'
                    }`}
                  >
                    <img
                      src={wordImageUrl(w.imageSlug)}
                      alt={w.word}
                      className="w-9 h-9 rounded-full object-contain bg-white p-0.5 border border-slate-100 shrink-0"
                    />
                    <span className="text-sm">{w.word}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Giant Vocabulary Flashcard (Centered on pure white, zero cropping) */}
            <div className="bg-white rounded-[36px] border-4 border-amber-100 p-5 sm:p-7 shadow-md flex flex-col md:flex-row items-center gap-6">
              <button
                type="button"
                onClick={() => audio.speak(currentWord.word, 0.85)}
                className="w-64 h-64 sm:w-80 sm:h-80 rounded-[32px] overflow-hidden border-2 border-slate-100 bg-white p-3 shadow-sm flex items-center justify-center shrink-0 hover:scale-[1.02] active:scale-95 transition"
              >
                <img
                  src={wordImageUrl(currentWord.imageSlug)}
                  alt={currentWord.word}
                  className="w-full h-full object-contain"
                />
              </button>

              <div className="flex-1 text-center md:text-left space-y-4">
                <div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
                    Từ {wordIdx + 1} / {activeWords.length}
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mt-0.5">
                    {currentWord.word}
                  </h2>
                  <div className="text-base font-bold text-slate-500 mt-1">
                    {currentWord.ipa} · <span className="text-slate-700">{currentWord.meaningVi}</span>
                  </div>
                </div>

                {/* Audio buttons: Normal & Slow */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                  <button
                    type="button"
                    onClick={() => audio.speak(currentWord.word, 0.9)}
                    className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-base inline-flex items-center gap-2 shadow-xs"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>Nghe chuẩn</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => audio.speak(currentWord.word, 0.65)}
                    className="px-4 py-3 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-extrabold text-sm inline-flex items-center gap-2"
                  >
                    <Turtle className="w-5 h-5" />
                    <span>Nghe chậm</span>
                  </button>
                </div>

                {/* Sample sentence box */}
                <button
                  type="button"
                  onClick={() => audio.speak(currentWord.sampleEn, 0.82)}
                  className="w-full text-left p-4 rounded-2xl bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 transition space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg font-extrabold text-slate-800">
                      💬 &ldquo;{currentWord.sampleEn}&rdquo;
                    </span>
                    <Volume2 className="w-5 h-5 text-amber-600 shrink-0" />
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    Cha mẹ nói cùng bé: {currentWord.sampleVi}
                  </div>
                </button>
              </div>
            </div>

            {/* Prev / Next word or Next step */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={wordIdx === 0}
                onClick={() => setWordIdx((i) => Math.max(0, i - 1))}
                className="px-5 py-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-extrabold text-sm disabled:opacity-40 inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Từ trước</span>
              </button>

              {wordIdx < activeWords.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setWordIdx((i) => i + 1)}
                  style={{ backgroundColor: topic.color }}
                  className="px-7 py-3.5 rounded-full text-white font-extrabold text-lg inline-flex items-center gap-2 shadow-md"
                >
                  <span>Từ tiếp theo</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  style={{ backgroundColor: topic.color }}
                  className="px-7 py-3.5 rounded-full text-white font-extrabold text-lg inline-flex items-center gap-2 shadow-md"
                >
                  <span>Sang bước 3: Nghe & Chọn hình</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: LISTENING (LISTEN & FIND) */}
        {step === 3 && listenTarget && (
          <div className="bg-white rounded-[36px] border-4 border-sky-100 p-6 sm:p-8 text-center space-y-5 shadow-md">
            <div className="space-y-1">
              <div className="text-xs font-extrabold uppercase text-sky-600">
                Bước 3 · Nghe hiểu ({listenIdx + 1}/{activeWords.length})
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Bé nghe và chỉ/chạm vào hình đúng nhé!
              </h2>
            </div>

            <button
              type="button"
              onClick={() => audio.speak(`Where is ${listenTarget.word}?`, 0.8)}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xl inline-flex items-center gap-2 shadow-sm"
            >
              <Volume2 className="w-6 h-6" />
              <span>Where is &ldquo;{listenTarget.word}&rdquo;?</span>
            </button>

            {listenPraised && (
              <div className="text-emerald-700 font-extrabold text-lg animate-kid-pop">
                🎉 Giỏi quá! Đúng là {listenTarget.word} ({listenTarget.meaningVi}) rồi!
              </div>
            )}

            <div
              className={`grid gap-4 max-w-2xl mx-auto ${
                levelMeta.maxChoices === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
              }`}
            >
              {[
                listenTarget,
                ...activeWords
                  .filter((w) => w.id !== listenTarget.id)
                  .slice(0, levelMeta.maxChoices - 1),
              ]
                .sort((a, b) => a.id.localeCompare(b.id))
                .map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      if (opt.id === listenTarget.id) {
                        setListenPraised(true);
                        audio.playSfx('ding');
                        audio.speak(`Yes! ${opt.word}!`, 0.85);
                        window.setTimeout(() => {
                          setListenPraised(false);
                          if (listenIdx < activeWords.length - 1) setListenIdx((i) => i + 1);
                          else setStep(4);
                        }, 850);
                      } else {
                        audio.playSfx('tap');
                        audio.speak(`Try again! Where is ${listenTarget.word}?`, 0.8);
                      }
                    }}
                    className="rounded-3xl bg-white hover:bg-sky-50 border-4 border-slate-100 hover:border-sky-400 overflow-hidden flex flex-col items-center shadow-md active:scale-95 transition"
                  >
                    <div className="w-full h-44 sm:h-52 bg-white p-3 flex items-center justify-center">
                      <img
                        src={wordImageUrl(opt.imageSlug)}
                        alt={opt.word}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="py-2.5 text-lg font-extrabold text-slate-800">{opt.word}</span>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* STEP 4: GAME ACTIVITY */}
        {step === 4 && (
          <LewGames
            topic={topic}
            words={activeWords}
            levelMeta={levelMeta}
            audio={audio}
            onCompleteGame={() => setStep(5)}
          />
        )}

        {/* STEP 5: PARENT ACTIVITY & STORY TIME */}
        {step === 5 && (
          <div className="space-y-5">
            {/* Parent Co-play Guide Card (Section 6 Table Format) */}
            <div className="bg-white rounded-[32px] border-4 border-emerald-100 p-6 space-y-4 shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                    👨‍👩‍👧 Giáo án cho Cha Mẹ tại nhà
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                    Cùng bé thực hành: {topic.titleEn} ({topic.titleVi})
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                  <div className="font-extrabold text-amber-900">1. Từ mục tiêu & Chuẩn bị</div>
                  <p className="text-xs font-bold text-slate-700">
                    <strong>Từ vựng:</strong> {topic.parentGuide.targetWordsSummaryVi}
                  </p>
                  <p className="text-xs font-bold text-slate-700">
                    <strong>Chuẩn bị đồ thật:</strong> {topic.parentGuide.materialsVi}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
                  <div className="font-extrabold text-emerald-900">
                    2. Hoạt động ngoài màn hình (Không cần điện thoại)
                  </div>
                  <p className="text-xs font-bold text-slate-700 leading-relaxed">
                    {topic.parentGuide.offlineGameVi}
                  </p>
                </div>
              </div>

              {/* What parents say (with 1-tap audio!) */}
              <div className="space-y-2">
                <div className="text-sm font-extrabold text-slate-800">
                  3. Cha mẹ nói câu gì cùng bé? (Bấm loa để nghe mẫu)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {topic.parentGuide.sampleSentences.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => audio.speak(s.en, 0.82)}
                      className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 text-left transition flex flex-col justify-between gap-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">&ldquo;{s.en}&rdquo;</span>
                        <Volume2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{s.vi}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step-by-step instructions */}
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-1.5">
                <div className="text-sm font-extrabold text-sky-900">
                  4. Các bước hướng dẫn bé (3 phút):
                </div>
                <ol className="list-decimal list-inside text-xs font-bold text-slate-700 space-y-1">
                  {topic.parentGuide.howToGuideVi.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Interactive Picture Story Time */}
            {variant.storyPages.length > 0 && (
              <div className="bg-white rounded-[32px] border-4 border-pink-100 p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-extrabold text-lg text-slate-800">
                    <BookOpen className="w-5 h-5 text-pink-500" />
                    <span>
                      Truyện tranh cùng đọc ({storyIdx + 1}/{variant.storyPages.length})
                    </span>
                  </div>
                </div>

                {(() => {
                  const pg = variant.storyPages[storyIdx] || variant.storyPages[0];
                  return (
                    <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-pink-50/40 border border-pink-100">
                      <img
                        src={wordImageUrl(pg.imageSlug)}
                        alt={pg.en}
                        className="w-44 h-44 bg-white p-2.5 object-contain rounded-2xl border-2 border-pink-100 shadow-sm shrink-0"
                      />
                      <div className="flex-1 text-center sm:text-left space-y-2">
                        <button
                          type="button"
                          onClick={() => audio.speak(pg.en, 0.82)}
                          className="inline-flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-slate-900 hover:text-pink-600"
                        >
                          <span>{pg.en}</span>
                          <Volume2 className="w-5 h-5 text-pink-500 shrink-0" />
                        </button>
                        <div className="text-xs font-bold text-slate-500">{pg.vi}</div>
                        <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                          <button
                            type="button"
                            disabled={storyIdx === 0}
                            onClick={() => setStoryIdx((i) => Math.max(0, i - 1))}
                            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold disabled:opacity-40"
                          >
                            ← Trang trước
                          </button>
                          <button
                            type="button"
                            disabled={storyIdx >= variant.storyPages.length - 1}
                            onClick={() =>
                              setStoryIdx((i) => Math.min(variant.storyPages.length - 1, i + 1))
                            }
                            className="px-3 py-1.5 rounded-xl bg-pink-500 text-white text-xs font-bold disabled:opacity-40"
                          >
                            Trang sau →
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(6)}
                style={{ backgroundColor: topic.color }}
                className="px-7 py-3.5 rounded-full text-white font-extrabold text-lg inline-flex items-center gap-2 shadow-md"
              >
                <span>Sang bước 6: Nhận Sticker & Ghi nhận</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW, STICKER REWARD & PARENT OBSERVATION */}
        {step === 6 && (
          <div className="bg-white rounded-[36px] border-4 border-amber-200 p-6 sm:p-8 space-y-6 shadow-lg">
            <RewardBurst visible message={`Sticker ${topic.titleEn}!`} />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-left">
              <img
                src={unitCoverUrl(topic.coverSlug)}
                alt={topic.titleEn}
                className="w-28 h-28 rounded-full border-4 border-amber-400 bg-amber-50 p-2 object-contain shadow-md animate-kid-pop"
              />
              <div className="space-y-1">
                <div className="text-xs font-extrabold uppercase text-amber-600">
                  🎉 Hoàn thành chủ đề {topic.code}
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Tuyệt vời lắm, {child.name} ơi!
                </h2>
                <p className="text-xs font-bold text-slate-500">
                  Bé đã nhận được Sticker chủ đề <strong>{topic.titleEn}</strong> ({topic.titleVi}).
                </p>
              </div>
            </div>

            {/* Parent Observation Check (Section 6 & 13) */}
            <div className="p-5 rounded-3xl bg-slate-50 border-2 border-slate-200 space-y-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-800">
                  📝 Ghi nhận nhanh của Cha Mẹ (Không chấm điểm bé)
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  Hôm nay cha mẹ quan sát thấy bé có biểu hiện nào dưới đây? (Có thể chọn nhiều mục)
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(Object.keys(LEW_OBSERVATION_META) as LewObservationCode[]).map((code) => {
                  const meta = LEW_OBSERVATION_META[code];
                  const active = selectedObs.includes(code);
                  return (
                    <button
                      key={code}
                      type="button"
                      onClick={() => toggleObs(code)}
                      className={`p-3 rounded-2xl border-2 text-left transition flex items-start gap-2.5 ${
                        active
                          ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                          : 'bg-white border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 shrink-0 mt-0.5 ${
                          active ? 'text-emerald-600' : 'text-slate-300'
                        }`}
                      />
                      <div>
                        <div className="text-xs font-extrabold text-slate-800">{meta.labelVi}</div>
                        <div className="text-[11px] font-semibold text-slate-500">{meta.descVi}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <input
                type="text"
                value={parentNote}
                onChange={(e) => setParentNote(e.target.value)}
                placeholder="Ghi chú thêm của cha mẹ (ví dụ: Bé rất thích từ Dog và vỗ tay theo bài hát)..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => onFinishLesson(selectedObs, parentNote)}
                style={{ backgroundColor: topic.color }}
                className="kid-btn-3d px-8 py-4 rounded-full text-white font-extrabold text-xl inline-flex items-center gap-2 shadow-md"
              >
                <Sparkles className="w-6 h-6" />
                <span>Lưu tiến độ & Về Thế giới {LEW_TOPICS.length} Chủ đề</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

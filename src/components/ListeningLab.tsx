import React, { useEffect, useRef, useState } from 'react';
import {
  Headphones,
  Play,
  Square,
  Eye,
  EyeOff,
  Repeat,
  Volume2,
  CheckCircle2,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { AccentMode, CefrLevel, WordEntry } from '../types/learning';
import { analyzeWordFull } from '../utils/wordAnalyzer';
import { speakText } from '../utils/speechEngine';
import { WordAnatomyCard } from './WordAnatomyCard';

interface ListeningLabProps {
  accent: AccentMode;
  savedWords: WordEntry[];
  onSaveWord: (word: WordEntry) => void;
  onPronunciationScore: (score: number) => void;
  onAddXp: (amount: number) => void;
  isStep4Unlocked?: boolean;
  onUnlockStep4?: () => void;
}

interface ListeningTrack {
  id: string;
  level: CefrLevel;
  title: string;
  sourceStyle: string;
  transcript: string;
  translation: string;
  question: {
    q: string;
    options: string[];
    correctIdx: number;
  };
}

const LISTENING_TRACKS: ListeningTrack[] = [
  {
    id: 'listen-1',
    level: 'A1',
    title: 'Morning Coffee & Daily Plan',
    sourceStyle: 'Hội thoại chậm (VOA Style)',
    transcript:
      'Good morning! Every day, I wake up at six thirty and drink a glass of warm water. Then I make a cup of coffee and listen to English for twenty minutes. Small daily habits help me feel confident and ready for work.',
    translation:
      'Chào buổi sáng! Mỗi ngày, tôi thức dậy lúc sáu giờ rưỡi và uống một cốc nước ấm. Sau đó tôi pha một tách cà phê và nghe tiếng Anh trong hai mươi phút. Những thói quen nhỏ hàng ngày giúp tôi cảm thấy tự tin và sẵn sàng làm việc.',
    question: {
      q: 'How long does the speaker listen to English every morning?',
      options: ['Ten minutes', 'Twenty minutes', 'One hour'],
      correctIdx: 1,
    },
  },
  {
    id: 'listen-2',
    level: 'A2',
    title: 'At the Airport Check-in',
    sourceStyle: 'Giao tiếp du lịch thực tế',
    transcript:
      'Excuse me, could you tell me where the check-in desk for flight VN102 is? Please show me your passport and ticket. Your flight is on schedule, and you can pick up your luggage at gate five when you arrive.',
    translation:
      'Xin lỗi, bạn có thể cho tôi biết quầy làm thủ tục cho chuyến bay VN102 ở đâu không? Vui lòng đưa tôi xem hộ chiếu và vé của bạn. Chuyến bay của bạn đúng lịch trình, và bạn có thể lấy hành lý ở cửa số 5 khi đến nơi.',
    question: {
      q: 'What is the status of the flight?',
      options: ['It is delayed', 'It is on schedule', 'It is cancelled'],
      correctIdx: 1,
    },
  },
  {
    id: 'listen-3',
    level: 'B1',
    title: 'Why Pronunciation Matters First',
    sourceStyle: 'BBC 6 Minute English Style',
    transcript:
      'Many learners try to memorize thousands of difficult words before learning basic sounds. However, when you master the forty-four IPA sounds and ending sounds like nine and nice, your listening improves naturally and you feel much more confident when speaking.',
    translation:
      'Nhiều người học cố gắng ghi nhớ hàng nghìn từ khó trước khi học các âm cơ bản. Tuy nhiên, khi bạn làm chủ 44 âm IPA và các âm cuối như nine và nice, kỹ năng nghe của bạn sẽ cải thiện tự nhiên và bạn cảm thấy tự tin hơn nhiều khi nói.',
    question: {
      q: 'What helps listening improve naturally according to the audio?',
      options: ['Memorizing rare words', 'Mastering IPA and ending sounds', 'Reading silently'],
      correctIdx: 1,
    },
  },
  {
    id: 'listen-4',
    level: 'B2',
    title: 'Building Sustainable Focus at Work',
    sourceStyle: 'Podcast Công sở & Phát triển bản thân',
    transcript:
      'In a fast-changing digital economy, effective communication and resilience are crucial. Instead of rushing through complex tasks, successful teams prioritize clear milestones, collaborate openly, and verify accurate information before making decisions.',
    translation:
      'Trong một nền kinh tế số thay đổi nhanh chóng, giao tiếp hiệu quả và sự kiên cường là tối quan trọng. Thay vì vội vã làm các nhiệm vụ phức tạp, các đội nhóm thành công ưu tiên các cột mốc rõ ràng, hợp tác cởi mở và xác minh thông tin chính xác trước khi ra quyết định.',
    question: {
      q: 'What do successful teams do before making decisions?',
      options: ['Rush through tasks', 'Verify accurate information', 'Work alone'],
      correctIdx: 1,
    },
  },
];

export const ListeningLab: React.FC<ListeningLabProps> = ({
  accent,
  savedWords,
  onSaveWord,
  onPronunciationScore,
  onAddXp,
  isStep4Unlocked = false,
  onUnlockStep4,
}) => {
  const [trackIdx, setTrackIdx] = useState(0);
  const [completedTrackIds, setCompletedTrackIds] = useState<string[]>([]);
  const [rate, setRate] = useState<number>(0.85);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [pickedOption, setPickedOption] = useState<number | null>(null);

  // Passive Listening ("Tắm ngôn ngữ" auto-loop)
  const [isAutoLoop, setIsAutoLoop] = useState(false);
  const autoLoopRef = useRef(false);

  // Tap word to analyze
  const [tappedWord, setTappedWord] = useState<WordEntry | null>(null);
  const [wordLoading, setWordLoading] = useState(false);

  const track = LISTENING_TRACKS[trackIdx];

  useEffect(() => {
    autoLoopRef.current = isAutoLoop;
    return () => {
      autoLoopRef.current = false;
      window.speechSynthesis?.cancel();
    };
  }, []);

  const playCurrentTrack = (customRate?: number) => {
    speakText(track.transcript, accent, customRate ?? rate);
  };

  const stopAudio = () => {
    setIsAutoLoop(false);
    autoLoopRef.current = false;
    window.speechSynthesis?.cancel();
  };

  const startLanguageBath = () => {
    if (isAutoLoop) {
      stopAudio();
      return;
    }
    setIsAutoLoop(true);
    autoLoopRef.current = true;

    let currentIdx = trackIdx;
    const playNextInLoop = () => {
      if (!autoLoopRef.current || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        return;
      }
      window.speechSynthesis.cancel();
      const item = LISTENING_TRACKS[currentIdx % LISTENING_TRACKS.length];
      setTrackIdx(currentIdx % LISTENING_TRACKS.length);
      const utt = new SpeechSynthesisUtterance(item.transcript);
      utt.lang = accent;
      utt.rate = rate;
      utt.onend = () => {
        if (autoLoopRef.current) {
          currentIdx = (currentIdx + 1) % LISTENING_TRACKS.length;
          setTimeout(playNextInLoop, 1200);
        }
      };
      window.speechSynthesis.speak(utt);
    };

    playNextInLoop();
  };

  const handleTapWord = async (rawToken: string) => {
    const clean = rawToken.replace(/[^a-zA-Z'-]/g, '');
    if (!clean) return;
    setWordLoading(true);
    try {
      const analyzed = await analyzeWordFull(clean);
      setTappedWord(analyzed);
      speakText(analyzed.word, accent, 0.95);
    } finally {
      setWordLoading(false);
    }
  };

  const tokens = track.transcript.split(/(\s+)/);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Headphones className="w-6 h-6 text-indigo-600" />
            <span>Bước 3: Luyện Nghe Chủ Động & Tắm Ngôn Ngữ (Input)</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Quy trình chuẩn: <strong>Lần 1: Ẩn chữ nghe chay</strong> → <strong>Lần 2: Mở Transcript nhặt từ mới</strong> → <strong>Lần 3: Ẩn chữ nghe lại</strong>.
          </p>
        </div>

        <button
          onClick={startLanguageBath}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition ${
            isAutoLoop
              ? 'bg-rose-600 text-white animate-pulse'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          <Repeat className="w-4 h-4" />
          <span>{isAutoLoop ? 'Đang Tắm Ngôn Ngữ (Bấm để dừng)' : 'Bật Nghe Thụ Động (Tắm ngôn ngữ)'}</span>
        </button>
      </div>

      {/* Step 4 Unlock Banner */}
      {onUnlockStep4 && (
        <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
            <strong>🎯 Nhiệm vụ mở khóa Bước 4 (Luyện Nói Shadowing):</strong>{' '}
            Nghe và trả lời đúng câu hỏi nghe hiểu của ít nhất 2 bài ({Math.min(2, completedTrackIds.length)}/2 bài).
          </div>
          {isStep4Unlocked || completedTrackIds.length >= 2 ? (
            <button
              onClick={onUnlockStep4}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm"
            >
              🎉 Đạt chuẩn! Mở khóa Bước 4: Luyện Nói →
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold text-slate-500 border border-slate-200 dark:border-slate-700">
              🔒 Hoàn thành 2 bài nghe hiểu để mở khóa
            </span>
          )}
        </div>
      )}

      {/* Track selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {LISTENING_TRACKS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => {
              stopAudio();
              setTrackIdx(i);
              setPickedOption(null);
              setShowTranscript(false);
              setShowTranslation(false);
            }}
            className={`text-left p-3.5 rounded-2xl border transition ${
              trackIdx === i
                ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300'
            }`}
          >
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
              {t.level} • {t.sourceStyle}
            </span>
            <div className="font-bold text-sm text-slate-900 dark:text-white mt-1.5">{t.title}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Audio Player + Transcript Toggle + Quiz */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playCurrentTrack()}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold"
                >
                  <Play className="w-4 h-4" /> Nghe bài này
                </button>
                <button
                  onClick={stopAudio}
                  className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                >
                  <Square className="w-3.5 h-3.5" /> Dừng
                </button>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {[0.7, 0.85, 1.0].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRate(r)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      rate === r ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {r}x
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold"
              >
                {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showTranscript ? 'Ẩn Transcript (Nghe lại không nhìn chữ)' : 'Hiện Transcript (Nhặt từ mới)'}</span>
              </button>

              {showTranscript && (
                <button
                  onClick={() => setShowTranslation(!showTranslation)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                >
                  {showTranslation ? 'Ẩn dịch Việt' : 'Xem dịch Việt'}
                </button>
              )}
            </div>

            {showTranscript ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <p className="text-xs font-bold text-indigo-600">
                  💡 Chạm vào bất kỳ từ nào bên dưới để xem giải phẫu mặt chữ & lưu từ mới:
                </p>
                <div className="text-base leading-loose text-slate-900 dark:text-slate-100">
                  {tokens.map((tok, i) => {
                    if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
                    return (
                      <button
                        key={i}
                        onClick={() => handleTapWord(tok)}
                        className="inline px-1 py-0.5 rounded hover:bg-amber-100 dark:hover:bg-amber-900/40 hover:text-indigo-700 transition cursor-pointer"
                      >
                        {tok}
                      </button>
                    );
                  })}
                </div>
                {showTranslation && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <strong>Dịch nghĩa:</strong> {track.translation}
                  </p>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-dashed border-slate-300 dark:border-slate-700 text-center">
                <Volume2 className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Transcript đang ẩn để rèn tai nghe chủ động
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Hãy bấm "Nghe bài này" ở tốc độ 0.85x trước, sau đó mới mở Transcript để kiểm tra!
                </p>
              </div>
            )}

            {/* Quick listening comprehension check */}
            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-2.5">
              <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase">
                Kiểm tra nghe hiểu: {track.question.q}
              </div>
              <div className="space-y-1.5">
                {track.question.options.map((opt, idx) => {
                  const picked = pickedOption === idx;
                  const isCorrect = idx === track.question.correctIdx;
                  let cls = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700';
                  if (pickedOption !== null) {
                    if (isCorrect) cls = 'bg-emerald-100 border-emerald-500 text-emerald-900';
                    else if (picked) cls = 'bg-rose-100 border-rose-500 text-rose-900';
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setPickedOption(idx);
                        if (isCorrect) {
                          onAddXp(15);
                          setCompletedTrackIds((prev) =>
                            prev.includes(track.id) ? prev : [...prev, track.id]
                          );
                        }
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between ${cls}`}
                    >
                      <span>{opt}</span>
                      {pickedOption !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Tapped Word Anatomy */}
        <div className="lg:col-span-6">
          {wordLoading ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 flex flex-col items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-3" />
              <p className="text-sm font-medium">Đang phân tích từ mới bạn vừa nhặt...</p>
            </div>
          ) : tappedWord ? (
            <WordAnatomyCard
              wordEntry={tappedWord}
              accent={accent}
              isSaved={savedWords.some((w) => w.word.toLowerCase() === tappedWord.word.toLowerCase())}
              onSaveWord={onSaveWord}
              onPronunciationScore={onPronunciationScore}
            />
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center text-slate-500">
              <Sparkles className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Mở Transcript và chạm vào từ chưa biết
              </p>
              <p className="text-xs mt-1">
                Từ mới sẽ hiện đầy đủ tách âm tiết, IPA, nghĩa Việt và nút lưu vào Sổ tay SRS (1-3-7-30 ngày).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

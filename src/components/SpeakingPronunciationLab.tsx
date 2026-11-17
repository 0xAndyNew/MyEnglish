import React, { useRef, useState } from 'react';
import {
  Mic,
  Square,
  Volume2,
  Turtle,
  Play,
  ArrowLeftRight,
  MessageSquare,
  Send,
  Sparkles,
  KeyRound,
} from 'lucide-react';
import { ROLEPLAY_SCENARIOS } from '../data/curriculumData';
import { AccentMode } from '../types/learning';
import { callGeminiText } from '../utils/geminiClient';
import {
  isSpeechRecognitionSupported,
  PronunciationScoreResult,
  scorePronunciation,
  speakText,
  startSpeechRecognition,
} from '../utils/speechEngine';

interface SpeakingPronunciationLabProps {
  accent: AccentMode;
  geminiApiKey?: string;
  onSaveApiKey: (key: string) => void;
  onPronunciationScore: (score: number) => void;
  isStep5Unlocked?: boolean;
  onUnlockStep5?: () => void;
}

const PRACTICE_SENTENCES = [
  { en: 'Hello, my name is Hieu and I am learning English every day.', vi: 'Xin chào, tên tôi là Hiếu và tôi đang học tiếng Anh mỗi ngày.' },
  { en: 'Could you please speak a little bit more slowly?', vi: 'Bạn có thể nói chậm hơn một chút được không?' },
  { en: 'I need more information about the flight schedule.', vi: 'Tôi cần thêm thông tin về lịch trình chuyến bay.' },
  { en: 'Clear communication builds trust and opens new opportunities.', vi: 'Giao tiếp rõ ràng xây dựng niềm tin và mở ra nhiều cơ hội mới.' },
  { en: 'Consistency leads to a major breakthrough in fluency.', vi: 'Sự đều đặn dẫn đến bước đột phá lớn về độ trôi chảy.' },
];

export const SpeakingPronunciationLab: React.FC<SpeakingPronunciationLabProps> = ({
  accent,
  geminiApiKey,
  onSaveApiKey,
  onPronunciationScore,
  isStep5Unlocked = false,
  onUnlockStep5,
}) => {
  const [subTab, setSubTab] = useState<'shadowing' | 'recorder' | 'roleplay'>('shadowing');

  // Tab 1: Shadowing & Scoring
  const [targetSentence, setTargetSentence] = useState(PRACTICE_SENTENCES[0].en);
  const [customInput, setCustomInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [scoreResult, setScoreResult] = useState<PronunciationScoreResult | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Tab 2: Voice Recorder & Compare
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [waveformBars, setWaveformBars] = useState<number[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Tab 3: Roleplay & AI
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [turnIdx, setTurnIdx] = useState(0);
  const [roleplayFeedback, setRoleplayFeedback] = useState<PronunciationScoreResult | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState(geminiApiKey || '');
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const handleStartShadowing = () => {
    if (!isSpeechRecognitionSupported()) {
      setSpeechError('Trình duyệt chưa hỗ trợ nhận diện giọng nói. Vui lòng dùng Chrome hoặc Edge.');
      return;
    }
    setSpeechError(null);
    setScoreResult(null);
    setIsListening(true);
    startSpeechRecognition(
      accent,
      (transcript) => {
        const res = scorePronunciation(targetSentence, transcript);
        setScoreResult(res);
        onPronunciationScore(res.score);
      },
      (err) => setSpeechError(err),
      () => setIsListening(false)
    );
  };

  const startRecording = async () => {
    try {
      setSpeechError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        stream.getTracks().forEach((t) => t.stop());

        // Tạo sóng âm trực quan từ buffer
        try {
          const arrayBuffer = await blob.arrayBuffer();
          const audioCtx = new AudioContext();
          const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
          const rawData = audioBuffer.getChannelData(0);
          const samples = 40;
          const blockSize = Math.floor(rawData.length / samples);
          const peaks: number[] = [];
          for (let i = 0; i < samples; i++) {
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
              sum += Math.abs(rawData[i * blockSize + j] || 0);
            }
            peaks.push(Math.min(100, Math.max(12, Math.round((sum / blockSize) * 350))));
          }
          setWaveformBars(peaks);
          audioCtx.close();
        } catch {
          setWaveformBars(Array.from({ length: 40 }, () => Math.floor(Math.random() * 60) + 20));
        }
      };
      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setSpeechError('Không thể mở Micro. Vui lòng kiểm tra quyền Micro của trình duyệt.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const playDualCompare = () => {
    speakText(targetSentence, accent, 0.95);
    if (recordedUrl) {
      const approxDurationMs = Math.max(1800, targetSentence.split(' ').length * 420);
      setTimeout(() => {
        const audio = new Audio(recordedUrl);
        audio.play();
      }, approxDurationMs);
    }
  };

  const currentScenario = ROLEPLAY_SCENARIOS[scenarioIdx];
  const currentTurn = currentScenario.turns[turnIdx] || currentScenario.turns[0];

  const handleRoleplayMic = (expectedReply: string) => {
    if (!isSpeechRecognitionSupported()) return;
    setIsListening(true);
    setRoleplayFeedback(null);
    startSpeechRecognition(
      accent,
      (transcript) => {
        const res = scorePronunciation(expectedReply, transcript);
        setRoleplayFeedback(res);
        onPronunciationScore(res.score);
      },
      (err) => setSpeechError(err),
      () => setIsListening(false)
    );
  };

  const sendToGeminiTutor = async () => {
    if (!aiPrompt.trim() || !geminiApiKey) return;
    const userMsg = aiPrompt.trim();
    setAiPrompt('');
    setAiMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setAiLoading(true);
    try {
      const reply = await callGeminiText(
        geminiApiKey,
        `You are a friendly English speaking tutor for a Vietnamese learner. Respond naturally in simple English (2-3 sentences), then briefly give 1 Vietnamese tip or correction if needed. Learner says: "${userMsg}"`
      );
      setAiMessages((prev) => [...prev, { role: 'ai', text: reply || 'Sorry, I could not generate a response.' }]);
      speakText(reply.split('\n')[0], accent, 0.95);
    } catch {
      setAiMessages((prev) => [...prev, { role: 'ai', text: 'Lỗi kết nối Gemini API. Vui lòng kiểm tra lại API Key.' }]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Phòng Lab Luyện Nói & Chấm Điểm Phát Âm
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Nghe mẫu tốc độ chậm, đọc vào Micro để chấm điểm từng từ, ghi âm đối chiếu sóng âm và đóng vai hội thoại.
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl self-start">
          {[
            { id: 'shadowing', label: '🎯 Chấm điểm từng từ' },
            { id: 'recorder', label: '🎙️ Ghi âm & So sánh' },
            { id: 'roleplay', label: '💬 Hội thoại & AI' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                subTab === t.id
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {speechError && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-sm text-rose-700 dark:text-rose-300">
          {speechError}
        </div>
      )}

      {/* Step 5 Unlock Banner */}
      {onUnlockStep5 && (
        <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
            <strong>🎯 Nhiệm vụ mở khóa Bước 5 (Đọc OCR, Viết Nhật Ký & Ôn SRS):</strong>{' '}
            Thực hành đọc câu Shadowing đạt ≥ 60% hoặc ghi âm giọng của bạn để đối chiếu.
          </div>
          {isStep5Unlocked ||
          (scoreResult && scoreResult.score >= 60) ||
          Boolean(recordedUrl) ||
          (roleplayFeedback && roleplayFeedback.score >= 60) ? (
            <button
              onClick={onUnlockStep5}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm"
            >
              🎉 Đạt chuẩn! Mở khóa Bước 5: Đọc, Viết & Ôn SRS →
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold text-slate-500 border border-slate-200 dark:border-slate-700">
              🔒 Thực hành nói hoặc ghi âm để mở khóa
            </span>
          )}
        </div>
      )}

      {/* TAB 1: SHADOWING & WORD-LEVEL SCORING */}
      {subTab === 'shadowing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
              <div className="text-xs font-bold uppercase text-slate-500">Chọn câu mẫu luyện nói</div>
              {PRACTICE_SENTENCES.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTargetSentence(s.en);
                    setScoreResult(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition ${
                    targetSentence === s.en
                      ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{s.en}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.vi}</p>
                </button>
              ))}

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Hoặc tự nhập câu tiếng Anh bất kỳ để luyện:
                </label>
                <div className="flex gap-2 mt-1.5">
                  <input
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Ví dụ: Nice to meet you!"
                    className="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                  <button
                    onClick={() => {
                      if (customInput.trim()) {
                        setTargetSentence(customInput.trim());
                        setScoreResult(null);
                      }
                    }}
                    className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700"
                  >
                    Dùng câu này
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">Câu đang luyện</span>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 leading-relaxed">
                {targetSentence}
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => speakText(targetSentence, accent, 1.0)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold"
              >
                <Volume2 className="w-4 h-4" /> Nghe chuẩn (1.0x)
              </button>
              <button
                onClick={() => speakText(targetSentence, accent, 0.6)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-sm font-semibold"
              >
                <Turtle className="w-4 h-4" /> Nghe chậm (0.6x)
              </button>
              <button
                onClick={handleStartShadowing}
                disabled={isListening}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition ${
                  isListening ? 'bg-rose-600 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <Mic className="w-4 h-4" /> {isListening ? 'Đang nghe bạn đọc...' : 'Bấm Micro để đọc'}
              </button>
            </div>

            {scoreResult && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Đánh giá tổng quan</div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{scoreResult.feedback}</p>
                  </div>
                  <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{scoreResult.score}%</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-500 mb-2">
                    Phân tích từng từ (Bấm vào từ màu vàng/đỏ để nghe chậm lại từ đó):
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {scoreResult.wordResults.map((wr, i) => (
                      <button
                        key={i}
                        onClick={() => speakText(wr.word, accent, 0.55)}
                        className={`px-3 py-1.5 rounded-xl text-sm font-bold border transition ${
                          wr.status === 'correct'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300'
                            : wr.status === 'close'
                            ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300'
                            : 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-900/40 dark:text-rose-300'
                        }`}
                        title="Bấm để nghe chậm từ này"
                      >
                        {wr.word}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  Máy nhận diện được: <span className="font-mono text-slate-700 dark:text-slate-300">"{scoreResult.transcript}"</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: RECORDER & WAVEFORM COMPARE */}
      {subTab === 'recorder' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5">
          <div>
            <div className="text-xs font-bold uppercase text-slate-500">Câu mẫu để ghi âm đối chiếu</div>
            <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">{targetSentence}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => speakText(targetSentence, accent, 0.95)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
            >
              <Volume2 className="w-4 h-4" /> 1. Nghe giọng bản xứ
            </button>

            {!isRecording ? (
              <button
                onClick={startRecording}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700"
              >
                <Mic className="w-4 h-4" /> 2. Bắt đầu ghi âm giọng bạn
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold animate-pulse"
              >
                <Square className="w-4 h-4" /> Dừng ghi âm
              </button>
            )}

            {recordedUrl && (
              <button
                onClick={playDualCompare}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
              >
                <ArrowLeftRight className="w-4 h-4" /> 3. Nghe đối chiếu (Bản xứ → Bạn)
              </button>
            )}
          </div>

          {recordedUrl && (
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase">Biểu đồ sóng âm giọng đọc của bạn</div>
              <div className="flex items-end gap-1 h-20 px-2">
                {waveformBars.map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 bg-indigo-500/80 rounded-full transition-all"
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <audio controls src={recordedUrl} className="w-full h-10" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ROLEPLAY & AI TUTOR */}
      {subTab === 'roleplay' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Offline Roleplay */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 dark:text-white">Đóng vai Tình huống Thực tế</h3>
              </div>
              <div className="flex gap-1.5">
                {ROLEPLAY_SCENARIOS.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setScenarioIdx(idx);
                      setTurnIdx(0);
                      setRoleplayFeedback(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      scenarioIdx === idx
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {sc.level}: {sc.title}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
              🎭 <strong>Bối cảnh:</strong> {currentScenario.context}
            </p>

            {/* AI Turn */}
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Bước {turnIdx + 1}/{currentScenario.turns.length} — Đối tác nói:
                </span>
                <button
                  onClick={() => speakText(currentTurn.en, accent, 0.95)}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-indigo-200"
                >
                  <Play className="w-3.5 h-3.5" /> Nghe
                </button>
              </div>
              <p className="text-base font-bold text-slate-900 dark:text-white">{currentTurn.en}</p>
              <p className="text-xs font-mono text-indigo-500">{currentTurn.ipa}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">{currentTurn.vi}</p>
            </div>

            {/* Suggested Replies */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase">Gợi ý câu trả lời của bạn (Nghe hoặc bấm Mic nói):</div>
              {currentTurn.suggestedReplies?.map((rep, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{rep.en}</p>
                    <p className="text-xs font-mono text-indigo-500">{rep.ipa}</p>
                    <p className="text-xs text-slate-500">{rep.vi}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => speakText(rep.en, accent, 0.85)}
                      className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600"
                      title="Nghe mẫu"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRoleplayMic(rep.en)}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                    >
                      <Mic className="w-3.5 h-3.5" /> Nói câu này
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {roleplayFeedback && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-xs">
                Điểm phát âm: <strong>{roleplayFeedback.score}%</strong> — "{roleplayFeedback.transcript}"
              </div>
            )}

            <div className="flex justify-between pt-2">
              <button
                disabled={turnIdx === 0}
                onClick={() => {
                  setTurnIdx((t) => Math.max(0, t - 1));
                  setRoleplayFeedback(null);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 disabled:opacity-40"
              >
                ← Lượt trước
              </button>
              <button
                onClick={() => {
                  setTurnIdx((t) => (t + 1) % currentScenario.turns.length);
                  setRoleplayFeedback(null);
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {turnIdx + 1 < currentScenario.turns.length ? 'Tiếp tục hội thoại →' : 'Học lại từ đầu ↻'}
              </button>
            </div>
          </div>

          {/* Optional Gemini AI Free Tutor */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">Gia Sư AI Giao Tiếp Tự Do (Tùy chọn)</h3>
              </div>
              <p className="text-xs text-slate-500">
                Nhập Gemini API Key (miễn phí tại Google AI Studio) để trò chuyện tự do và được AI sửa lỗi ngữ pháp tức thì.
              </p>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <KeyRound className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    value={apiKeyInput}
                    onChange={(e) => setApiKeyInput(e.target.value)}
                    placeholder="Dán Gemini API Key (tùy chọn)..."
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <button
                  onClick={() => onSaveApiKey(apiKeyInput.trim())}
                  className="px-3 py-2 rounded-xl bg-slate-900 dark:bg-indigo-600 text-white text-xs font-semibold"
                >
                  Lưu Key
                </button>
              </div>

              <div className="h-56 overflow-y-auto space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                {aiMessages.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center mt-16">
                    Hãy gõ câu tiếng Anh bất kỳ bên dưới để trò chuyện với Gia sư AI.
                  </p>
                ) : (
                  aiMessages.map((m, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-xl text-xs whitespace-pre-wrap ${
                        m.role === 'user'
                          ? 'bg-indigo-600 text-white ml-6'
                          : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 mr-6'
                      }`}
                    >
                      {m.text}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendToGeminiTutor()}
                placeholder={geminiApiKey ? 'Nói gì đó bằng tiếng Anh...' : 'Cần nhập API Key ở trên trước'}
                disabled={!geminiApiKey || aiLoading}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 disabled:opacity-50"
              />
              <button
                onClick={sendToGeminiTutor}
                disabled={!geminiApiKey || aiLoading}
                className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { AccentMode } from '../types/learning';
import { transcribeAudioWithGemini } from './geminiClient';

let serverHasGeminiKey = false;
export function setServerHasGeminiKey(flag: boolean): void {
  serverHasGeminiKey = flag;
}

export interface WordMatchResult {
  word: string;
  displayWord: string;
  status: 'correct' | 'close' | 'wrong';
  spokenWord?: string;
  reason: 'matched' | 'mispronounced' | 'substituted' | 'missing';
}

export interface PronunciationScoreResult {
  score: number; // 0 - 100
  transcript: string;
  wordResults: WordMatchResult[];
  feedback: string;
  correctCount: number;
  closeCount: number;
  wrongCount: number;
  totalWords: number;
  wrongWords: string[];
  extraWords: string[];
}

export interface SpeechRecognitionOptions {
  continuous?: boolean;
  onInterim?: (transcript: string) => void;
  maxDurationMs?: number;
}

/**
 * Phát âm văn bản tiếng Anh chuẩn qua Web Speech API (hỗ trợ US/UK & tốc độ chậm 0.5x - 1.0x).
 */
export function speakText(
  text: string,
  accent: AccentMode = 'en-US',
  rate: number = 1.0,
  audioUrl?: string
): void {
  if (rate === 1.0 && audioUrl) {
    const audio = new Audio(audioUrl);
    audio.play().catch(() => fallbackTTS(text, accent, rate));
    return;
  }
  fallbackTTS(text, accent, rate);
}

function fallbackTTS(text: string, accent: AccentMode, rate: number): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = accent;
  utterance.rate = rate;

  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => v.lang === accent && (v.name.includes('Natural') || v.name.includes('Google'))) ||
    voices.find((v) => v.lang.startsWith(accent)) ||
    voices.find((v) => v.lang.startsWith('en'));

  if (preferred) {
    utterance.voice = preferred;
  }

  window.speechSynthesis.speak(utterance);
}

export function startControllableAudioRecording(durationMs = 4000): {
  promise: Promise<{ blob: Blob; url: string; mimeType: string }>;
  stop: () => void;
} {
  let activeRecorder: MediaRecorder | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const stop = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (activeRecorder && activeRecorder.state !== 'inactive') {
      try {
        activeRecorder.stop();
      } catch {
        // ignore
      }
    }
  };

  const promise = new Promise<{ blob: Blob; url: string; mimeType: string }>((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      reject(new Error('Trình duyệt không hỗ trợ ghi âm Micro.'));
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        activeRecorder = recorder;
        const chunks: Blob[] = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };
        recorder.onerror = () => {
          if (timer) clearTimeout(timer);
          stream.getTracks().forEach((t) => t.stop());
          reject(new Error('Không thể ghi âm từ Micro.'));
        };
        recorder.onstop = () => {
          if (timer) clearTimeout(timer);
          stream.getTracks().forEach((t) => t.stop());
          const mimeType = recorder.mimeType || 'audio/webm';
          const blob = new Blob(chunks, { type: mimeType });
          const url = URL.createObjectURL(blob);
          resolve({ blob, url, mimeType });
        };

        recorder.start();
        timer = setTimeout(() => {
          stop();
        }, durationMs);
      })
      .catch((err) => {
        reject(err instanceof Error ? err : new Error('Không thể mở Micro để ghi âm.'));
      });
  });

  return { promise, stop };
}

export async function recordAudioClip(durationMs = 4000): Promise<{ blob: Blob; url: string; mimeType: string }> {
  return startControllableAudioRecording(durationMs).promise;
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const base64 = result.split(',')[1] || '';
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('Lỗi đọc dữ liệu âm thanh.'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Kiểm tra trình duyệt có hỗ trợ nhận diện giọng nói hoặc ghi âm Micro không.
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean(
    (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition ||
      navigator.mediaDevices?.getUserMedia
  );
}

/**
 * Bắt đầu thu giọng nói bằng Web Speech API (hỗ trợ đọc liên tục cả đoạn văn và tự dự phòng sang MediaRecorder + Gemini AI).
 */
export function startSpeechRecognition(
  accent: AccentMode,
  onResult: (transcript: string) => void,
  onError: (msg: string) => void,
  onEnd?: () => void,
  options?: SpeechRecognitionOptions
): () => void {
  const isContinuous = Boolean(options?.continuous);
  const maxDurationMs = options?.maxDurationMs ?? (isContinuous ? 25000 : 4200);
  let fallbackStopper: (() => void) | null = null;
  let cancelledByError = false;

  const runGeminiVoiceFallback = async () => {
    try {
      const recording = startControllableAudioRecording(maxDurationMs);
      fallbackStopper = recording.stop;
      const { blob, mimeType } = await recording.promise;
      const base64 = await blobToBase64(blob);
      const text = await transcribeAudioWithGemini('SERVER', base64, mimeType);
      if (!text) {
        onError('Không nghe thấy giọng nói rõ ràng. Hãy nói to và rõ hơn gần Micro nhé!');
      } else {
        onResult(text);
      }
    } catch (err: any) {
      onError(err?.message || 'Không thể thu âm hoặc kết nối Gemini AI để chấm giọng nói.');
    } finally {
      fallbackStopper = null;
      onEnd?.();
    }
  };

  const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRec) {
    if (serverHasGeminiKey && Boolean(navigator.mediaDevices?.getUserMedia)) {
      runGeminiVoiceFallback();
      return () => {
        fallbackStopper?.();
      };
    }
    onError('Trình duyệt chưa hỗ trợ Web Speech API. Hãy dùng Google Chrome hoặc nhờ Admin gán Gemini API Key.');
    onEnd?.();
    return () => {};
  }

  let handedOffToFallback = false;
  let latestTranscript = '';
  let deliveredResult = false;
  const recognition = new SpeechRec();
  recognition.lang = accent;
  recognition.continuous = isContinuous;
  recognition.interimResults = Boolean(isContinuous || options?.onInterim);
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    if (isContinuous) {
      const finals: string[] = [];
      const interims: string[] = [];
      for (let i = 0; i < (event.results?.length || 0); i++) {
        const res = event.results[i];
        const piece = res?.[0]?.transcript || '';
        if (!piece) continue;
        if (res.isFinal) finals.push(piece.trim());
        else interims.push(piece.trim());
      }
      latestTranscript = [...finals, ...interims].join(' ').trim();
      options?.onInterim?.(latestTranscript);
      return;
    }

    const res = event.results?.[0];
    const transcript = res?.[0]?.transcript || '';
    if (res && !res.isFinal) {
      options?.onInterim?.(transcript);
      return;
    }
    deliveredResult = true;
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    if (event.error === 'aborted') {
      return;
    }
    if (event.error === 'not-allowed') {
      cancelledByError = true;
      onError('Bạn chưa cấp quyền Micro. Vui lòng bấm cho phép Micro trên thanh địa chỉ trình duyệt.');
    } else if (event.error === 'no-speech') {
      if (!isContinuous || !latestTranscript.trim()) {
        cancelledByError = true;
        onError('Không nghe thấy giọng nói. Hãy nói to và rõ hơn gần Micro nhé!');
      }
    } else if (event.error === 'network') {
      if (serverHasGeminiKey && Boolean(navigator.mediaDevices?.getUserMedia)) {
        handedOffToFallback = true;
        runGeminiVoiceFallback();
        return;
      }
      cancelledByError = true;
      onError(
        'Lỗi kết nối máy chủ nhận diện giọng nói (network — hay gặp trên Edge/Brave/trình duyệt nhúng). Hãy mở bằng Google Chrome hoặc bấm "Thu âm tự nghe lại" (hoặc nhờ Admin gán Gemini API Key)!'
      );
    } else {
      cancelledByError = true;
      onError(`Lỗi nhận diện giọng nói: ${event.error}`);
    }
  };

  recognition.onend = () => {
    if (handedOffToFallback) return;
    if (isContinuous && !deliveredResult && !cancelledByError) {
      const cleaned = latestTranscript.trim();
      if (cleaned) {
        deliveredResult = true;
        onResult(cleaned);
      } else {
        onError('Chưa thu được câu nào rõ ràng. Hãy thử đọc lại to hơn gần Micro nhé!');
      }
    }
    onEnd?.();
  };

  recognition.start();
  return () => {
    if (fallbackStopper) {
      fallbackStopper();
      return;
    }
    try {
      recognition.stop();
    } catch {
      // ignore
    }
  };
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function normalizeSingleWord(token: string): string {
  return token.toLowerCase().replace(/[^a-z0-9']/g, '');
}

function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function wordSimilarity(a: string, b: string): number {
  if (a === b) return 1;
  const dist = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  return maxLen === 0 ? 1 : (maxLen - dist) / maxLen;
}

/**
 * Chấm điểm phát âm theo thứ tự từ trong câu/đoạn văn (Dynamic Programming sequence alignment).
 * Phân biệt rõ: Đúng (correct), Gần đúng/Lệch âm (close), Sai hoặc Bỏ sót (wrong), và Từ đọc dư (extraWords).
 */
export function scorePronunciation(expected: string, spoken: string): PronunciationScoreResult {
  const expectedItems = expected
    .trim()
    .split(/[\s—–-]+/)
    .map((displayWord) => ({
      displayWord,
      word: normalizeSingleWord(displayWord),
    }))
    .filter((item) => item.word.length > 0);

  const spokenWords = normalizeWords(spoken);
  const n = expectedItems.length;
  const m = spokenWords.length;

  if (n === 0) {
    return {
      score: 0,
      transcript: spoken,
      wordResults: [],
      feedback: 'Không có câu/đoạn văn mẫu.',
      correctCount: 0,
      closeCount: 0,
      wrongCount: 0,
      totalWords: 0,
      wrongWords: [],
      extraWords: [],
    };
  }

  // Dynamic programming alignment matrix
  const GAP_PENALTY = -0.5;
  const dp: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
  const trace: ('diag' | 'up' | 'left')[][] = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill('up')
  );

  for (let i = 1; i <= n; i++) {
    dp[i][0] = dp[i - 1][0] + GAP_PENALTY;
    trace[i][0] = 'up';
  }
  for (let j = 1; j <= m; j++) {
    dp[0][j] = dp[0][j - 1] + GAP_PENALTY;
    trace[0][j] = 'left';
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const sim = wordSimilarity(expectedItems[i - 1].word, spokenWords[j - 1]);
      const pairScore = sim === 1 ? 2.0 : sim >= 0.55 ? sim * 1.4 : -0.6;

      const diagScore = dp[i - 1][j - 1] + pairScore;
      const upScore = dp[i - 1][j] + GAP_PENALTY;
      const leftScore = dp[i][j - 1] + GAP_PENALTY;

      if (diagScore >= upScore && diagScore >= leftScore) {
        dp[i][j] = diagScore;
        trace[i][j] = 'diag';
      } else if (upScore >= leftScore) {
        dp[i][j] = upScore;
        trace[i][j] = 'up';
      } else {
        dp[i][j] = leftScore;
        trace[i][j] = 'left';
      }
    }
  }

  // Backtrack to obtain ordered wordResults and extraWords
  const wordResultsReversed: WordMatchResult[] = [];
  const extraWordsReversed: string[] = [];
  let totalCredit = 0;

  let i = n;
  let j = m;
  while (i > 0 || j > 0) {
    const dir = trace[i][j];
    if (i > 0 && j > 0 && dir === 'diag') {
      const exp = expectedItems[i - 1];
      const sp = spokenWords[j - 1];
      const sim = wordSimilarity(exp.word, sp);

      if (sim >= 0.85) {
        totalCredit += sim;
        wordResultsReversed.push({
          word: exp.word,
          displayWord: exp.displayWord,
          status: 'correct',
          spokenWord: sp,
          reason: 'matched',
        });
      } else if (sim >= 0.55) {
        totalCredit += sim;
        wordResultsReversed.push({
          word: exp.word,
          displayWord: exp.displayWord,
          status: 'close',
          spokenWord: sp,
          reason: 'mispronounced',
        });
      } else {
        wordResultsReversed.push({
          word: exp.word,
          displayWord: exp.displayWord,
          status: 'wrong',
          spokenWord: sp,
          reason: 'substituted',
        });
      }
      i--;
      j--;
    } else if (i > 0 && (j === 0 || dir === 'up')) {
      const exp = expectedItems[i - 1];
      wordResultsReversed.push({
        word: exp.word,
        displayWord: exp.displayWord,
        status: 'wrong',
        reason: 'missing',
      });
      i--;
    } else {
      extraWordsReversed.push(spokenWords[j - 1]);
      j--;
    }
  }

  const wordResults = wordResultsReversed.reverse();
  const extraWords = extraWordsReversed.reverse();

  const correctCount = wordResults.filter((w) => w.status === 'correct').length;
  const closeCount = wordResults.filter((w) => w.status === 'close').length;
  const wrongCount = wordResults.filter((w) => w.status === 'wrong').length;
  const wrongWords = Array.from(
    new Set(wordResults.filter((w) => w.status !== 'correct').map((w) => w.word))
  );

  const rawScore = Math.round((totalCredit / n) * 100);
  const extraPenalty = extraWords.length > 2 ? Math.min(10, (extraWords.length - 2) * 2) : 0;
  const finalScore = Math.max(0, Math.min(100, rawScore - extraPenalty));

  let feedback = '';
  if (finalScore >= 90 && wrongCount === 0 && closeCount === 0) {
    feedback = 'Xuất sắc! Bạn phát âm chuẩn xác từng chữ một.';
  } else if (finalScore >= 85) {
    feedback =
      wrongCount > 0
        ? 'Rất tốt! Hãy chú ý các từ màu vàng/đỏ (sai hoặc bỏ sót) bên dưới để đạt chuẩn 100%.'
        : 'Rất tốt! Hãy chú ý chỉnh nhẹ các từ màu vàng để đạt chuẩn 100%.';
  } else if (finalScore >= 65) {
    feedback =
      'Khá tốt! Hãy bấm vào từng từ màu vàng/đỏ bên dưới để nghe chậm và đọc sửa lại chỗ sai nhé.';
  } else if (finalScore >= 40) {
    feedback =
      'Cần luyện thêm: một số chữ bị đọc lệch hoặc bỏ sót (màu đỏ). Bấm vào chữ sai để nghe mẫu 0.65x rồi đọc lại.';
  } else {
    feedback = 'Chưa khớp với bài mẫu — thử nghe chậm từng cụm từ và đọc to rõ hơn gần Micro nhé!';
  }

  return {
    score: finalScore,
    transcript: spoken,
    wordResults,
    feedback,
    correctCount,
    closeCount,
    wrongCount,
    totalWords: n,
    wrongWords,
    extraWords,
  };
}

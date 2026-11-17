import { AccentMode } from '../types/learning';
import { transcribeAudioWithGemini } from './geminiClient';

let serverHasGeminiKey = false;
export function setServerHasGeminiKey(flag: boolean): void {
  serverHasGeminiKey = flag;
}

export interface WordMatchResult {
  word: string;
  status: 'correct' | 'close' | 'wrong';
}

export interface PronunciationScoreResult {
  score: number; // 0 - 100
  transcript: string;
  wordResults: WordMatchResult[];
  feedback: string;
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

export async function recordAudioClip(durationMs = 4000): Promise<{ blob: Blob; url: string; mimeType: string }> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    throw new Error('Trình duyệt không hỗ trợ ghi âm Micro.');
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);
  const chunks: Blob[] = [];

  return new Promise((resolve, reject) => {
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onerror = () => {
      stream.getTracks().forEach((t) => t.stop());
      reject(new Error('Không thể ghi âm từ Micro.'));
    };
    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      const mimeType = recorder.mimeType || 'audio/webm';
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      resolve({ blob, url, mimeType });
    };
    recorder.start();
    setTimeout(() => {
      if (recorder.state !== 'inactive') {
        recorder.stop();
      }
    }, durationMs);
  });
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
 * Bắt đầu thu giọng nói bằng Web Speech API (tự động dự phòng sang MediaRecorder + Gemini AI nếu bị lỗi network).
 */
export function startSpeechRecognition(
  accent: AccentMode,
  onResult: (transcript: string) => void,
  onError: (msg: string) => void,
  onEnd?: () => void
): () => void {
  const runGeminiVoiceFallback = async () => {
    try {
      const { blob, mimeType } = await recordAudioClip(4200);
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
      onEnd?.();
    }
  };

  const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRec) {
    if (serverHasGeminiKey && Boolean(navigator.mediaDevices?.getUserMedia)) {
      runGeminiVoiceFallback();
      return () => {};
    }
    onError('Trình duyệt chưa hỗ trợ Web Speech API. Hãy dùng Google Chrome hoặc nhờ Admin gán Gemini API Key.');
    onEnd?.();
    return () => {};
  }

  let handedOffToFallback = false;
  const recognition = new SpeechRec();
  recognition.lang = accent;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    const transcript = event.results?.[0]?.[0]?.transcript || '';
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    if (event.error === 'not-allowed') {
      onError('Bạn chưa cấp quyền Micro. Vui lòng bấm cho phép Micro trên thanh địa chỉ trình duyệt.');
    } else if (event.error === 'no-speech') {
      onError('Không nghe thấy giọng nói. Hãy nói to và rõ hơn gần Micro nhé!');
    } else if (event.error === 'network') {
      if (serverHasGeminiKey && Boolean(navigator.mediaDevices?.getUserMedia)) {
        handedOffToFallback = true;
        runGeminiVoiceFallback();
        return;
      }
      onError(
        'Lỗi kết nối máy chủ nhận diện giọng nói (network — hay gặp trên Edge/Brave/trình duyệt nhúng). Hãy mở bằng Google Chrome hoặc bấm "Thu âm tự nghe lại" (hoặc nhờ Admin gán Gemini API Key)!'
      );
    } else {
      onError(`Lỗi nhận diện giọng nói: ${event.error}`);
    }
  };

  recognition.onend = () => {
    if (!handedOffToFallback) {
      onEnd?.();
    }
  };

  recognition.start();
  return () => {
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

function normalizeWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

/**
 * Chấm điểm phát âm từng từ (Xanh = chuẩn, Vàng = gần đúng, Đỏ = sai).
 */
export function scorePronunciation(expected: string, spoken: string): PronunciationScoreResult {
  const expectedWords = normalizeWords(expected);
  const spokenWords = normalizeWords(spoken);

  if (expectedWords.length === 0) {
    return { score: 0, transcript: spoken, wordResults: [], feedback: 'Không có câu mẫu.' };
  }

  let totalScore = 0;
  const wordResults: WordMatchResult[] = expectedWords.map((expWord, idx) => {
    // Tìm từ khớp nhất trong câu người dùng nói
    let bestSim = 0;
    const candidates = spokenWords.length > 0 ? spokenWords : [];
    for (const sp of candidates) {
      const dist = levenshtein(expWord, sp);
      const maxLen = Math.max(expWord.length, sp.length);
      const sim = maxLen === 0 ? 1 : (maxLen - dist) / maxLen;
      if (sim > bestSim) bestSim = sim;
    }

    // Ưu tiên khớp đúng vị trí nếu gần bằng nhau
    if (spokenWords[idx] === expWord) bestSim = 1;

    totalScore += bestSim;
    const status: WordMatchResult['status'] =
      bestSim >= 0.85 ? 'correct' : bestSim >= 0.55 ? 'close' : 'wrong';

    return { word: expWord, status };
  });

  const finalScore = Math.round((totalScore / expectedWords.length) * 100);
  let feedback = '';
  if (finalScore >= 90) feedback = 'Xuất sắc! Phát âm rất chuẩn và rõ ràng.';
  else if (finalScore >= 70) feedback = 'Khá tốt! Hãy chú ý các từ màu vàng/đỏ và bật rõ âm cuối nhé.';
  else if (finalScore >= 45) feedback = 'Cần luyện thêm: hãy bấm nghe chậm 0.6x từng từ màu đỏ rồi đọc lại.';
  else feedback = 'Chưa khớp lắm — thử nghe chậm từng âm tiết và nói to rõ hơn nhé!';

  return {
    score: finalScore,
    transcript: spoken,
    wordResults,
    feedback,
  };
}

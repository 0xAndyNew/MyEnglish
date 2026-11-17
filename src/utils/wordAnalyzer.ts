import { ALL_CURRICULUM_WORDS } from '../data/curriculumData';
import { WordEntry } from '../types/learning';

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y']);

/**
 * Tách âm tiết thông minh cho từ tiếng Anh bất kỳ.
 */
export function splitSyllables(rawWord: string): string[] {
  const word = rawWord.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return [rawWord];

  // Xử lý một số hậu tố phổ biến để tách đẹp hơn
  const chunks = word.match(/[^aeiouy]*[aeiouy]+(?:[^aeiouy](?![aeiouy]))*/gi);
  if (!chunks || chunks.length === 0) return [rawWord];

  // Nếu mảnh cuối chỉ là chữ "e" câm (như mak + e -> make), gộp lại vào âm tiết trước
  if (chunks.length > 1 && chunks[chunks.length - 1] === 'e') {
    const last = chunks.pop()!;
    chunks[chunks.length - 1] += last;
  }

  return chunks;
}

/**
 * Phát hiện chỉ số các chữ cái câm (silent letters) phổ biến.
 */
export function detectSilentIndices(rawWord: string): number[] {
  const w = rawWord.toLowerCase();
  const silent: number[] = [];

  if (w.startsWith('kn') && w.length > 2) silent.push(0); // k in know, knife
  if (w.startsWith('wr') && w.length > 2) silent.push(0); // w in write, wrong
  if (w.endsWith('mb') && w.length > 3) silent.push(w.length - 1); // b in climb, comb
  if (w.includes('sten') && w.length > 4) silent.push(w.indexOf('t')); // t in listen, fasten
  if (w.endsWith('gh') && w.length > 4) {
    silent.push(w.length - 2, w.length - 1);
  }
  // Silent trailing 'e' (nhưng không phải từ 2-3 chữ cái kiểu "be", "he", "the")
  if (w.endsWith('e') && w.length > 3 && !w.endsWith('ee') && !w.endsWith('le')) {
    silent.push(w.length - 1);
  }

  return Array.from(new Set(silent));
}

/**
 * Tự động suy luận quy tắc ghép vần (Phonics) và gợi ý đọc bồi.
 */
export function detectPhonicsHint(word: string): { rule: string; vietApprox: string } {
  const w = word.toLowerCase();
  const rules: string[] = [];

  if (w.endsWith('tion')) rules.push('Đuôi "-tion" luôn đọc là /ʃən/ ("sần"), trọng âm rơi vào âm tiết ngay trước nó.');
  if (w.endsWith('sion')) rules.push('Đuôi "-sion" thường đọc là /ʒən/ hoặc /ʃən/, trọng âm rơi ngay trước nó.');
  if (w.startsWith('kn')) rules.push('Cụm "kn-" đầu từ: chữ "k" câm hoàn toàn, chỉ đọc từ chữ "n".');
  if (w.startsWith('wr')) rules.push('Cụm "wr-" đầu từ: chữ "w" câm hoàn toàn, chỉ đọc từ chữ "r".');
  if (w.includes('ph')) rules.push('Cụm "ph" luôn đọc thành âm /f/ (răng trên chạm môi dưới).');
  if (w.includes('sh')) rules.push('Cụm "sh" đọc là /ʃ/ (chu tròn môi như suỵt).');
  if (w.includes('ch')) rules.push('Cụm "ch" thường đọc bật hơi là /tʃ/.');
  if (w.includes('th')) rules.push('Cụm "th" cần đặt đầu lưỡi giữa hai hàm răng (/θ/ hoặc /ð/).');
  if (w.includes('ee') || w.includes('ea')) rules.push('Cụm "ee / ea" thường đọc kéo dài thành âm /iː/.');
  if (w.includes('oo')) rules.push('Cụm "oo" thường đọc là /uː/ (food) hoặc /ʊ/ (book).');
  if (w.endsWith('e') && w.length > 3 && !w.endsWith('ee')) {
    rules.push('Chữ "e" ở cuối từ thường câm (Magic E), giúp nguyên âm đứng trước đọc kéo dài.');
  }

  const rule =
    rules.length > 0
      ? rules.join(' ')
      : 'Phân tách theo từng âm tiết (nguyên âm màu cam, phụ âm màu xanh) và nhấn rõ âm tiết có dấu trọng âm (ˈ).';

  const syllables = splitSyllables(w);
  const vietApprox = syllables.join(' - ');

  return { rule, vietApprox };
}

export function isVowelChar(ch: string): boolean {
  return VOWELS.has(ch.toLowerCase());
}

/**
 * Tra cứu và phân tích toàn diện bất kỳ từ tiếng Anh nào.
 * Ưu tiên kho bài học chuẩn -> sau đó tra từ điển online miễn phí + dịch nghĩa Việt.
 */
export async function analyzeWordFull(rawInput: string): Promise<WordEntry> {
  const clean = rawInput.trim().toLowerCase().replace(/[^a-z'-]/g, '');
  if (!clean) {
    throw new Error('Vui lòng nhập một từ tiếng Anh hợp lệ.');
  }

  // 1. Kiểm tra trong kho dữ liệu biên soạn sẵn
  const localMatch = ALL_CURRICULUM_WORDS.find((w) => w.word.toLowerCase() === clean);
  if (localMatch) return localMatch;

  // 2. Phân tích cấu trúc mặt chữ động
  const syllables = splitSyllables(clean);
  const silentIndices = detectSilentIndices(clean);
  const { rule, vietApprox } = detectPhonicsHint(clean);

  let ipaUS = `/${syllables.join('.')}/`;
  let ipaUK = ipaUS;
  let pos = 'Từ vựng';
  let meaningVi = 'Đang tra nghĩa tiếng Việt...';
  let examples: { en: string; vi: string }[] = [];
  let synonyms: string[] = [];
  let antonyms: string[] = [];
  let audioUrl: string | undefined;

  // 3. Gọi Free Dictionary API + MyMemory Translate song song (timeout nhanh)
  const dictPromise = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`)
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);

  const transPromise = fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=en|vi`
  )
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);

  const [dictData, transData] = await Promise.all([dictPromise, transPromise]);

  if (Array.isArray(dictData) && dictData[0]) {
    const entry = dictData[0];
    if (entry.phonetic) {
      ipaUS = entry.phonetic;
      ipaUK = entry.phonetic;
    }
    if (Array.isArray(entry.phonetics)) {
      const usPh = entry.phonetics.find((p: any) => p.text && p.audio?.includes('-us'));
      const ukPh = entry.phonetics.find((p: any) => p.text && p.audio?.includes('-uk'));
      const anyPh = entry.phonetics.find((p: any) => p.text);
      const anyAudio = entry.phonetics.find((p: any) => p.audio);
      if (usPh?.text) ipaUS = usPh.text;
      else if (anyPh?.text) ipaUS = anyPh.text;
      if (ukPh?.text) ipaUK = ukPh.text;
      if (usPh?.audio) audioUrl = usPh.audio;
      else if (anyAudio?.audio) audioUrl = anyAudio.audio;
    }

    if (Array.isArray(entry.meanings) && entry.meanings.length > 0) {
      const firstMeaning = entry.meanings[0];
      pos = firstMeaning.partOfSpeech || pos;
      const defs = firstMeaning.definitions || [];
      examples = defs
        .filter((d: any) => d.example)
        .slice(0, 2)
        .map((d: any) => ({ en: d.example, vi: d.definition }));
      if (examples.length === 0 && defs[0]?.definition) {
        examples = [{ en: `${clean}: ${defs[0].definition}`, vi: 'Định nghĩa tiếng Anh chuẩn' }];
      }
      synonyms = (firstMeaning.synonyms || []).slice(0, 4);
      antonyms = (firstMeaning.antonyms || []).slice(0, 4);
    }
  }

  if (transData?.responseData?.translatedText) {
    meaningVi = transData.responseData.translatedText;
  } else {
    meaningVi = '(Không có kết nối mạng để dịch tự động — bạn vẫn có thể nghe & xem phân tích mặt chữ)';
  }

  // Ước lượng vị trí trọng âm
  let stressIndex = 0;
  if (clean.endsWith('tion') || clean.endsWith('sion')) {
    stressIndex = Math.max(0, syllables.length - 2);
  }

  return {
    id: `dyn-${clean}`,
    word: clean,
    syllables,
    stressIndex,
    silentIndices,
    ipaUS,
    ipaUK,
    vietPhonetic: vietApprox,
    phonicsRule: rule,
    pos,
    level: 'A2',
    meaningVi,
    mnemonic: `Hãy chia nhỏ "${clean}" thành ${syllables.length} nhịp (${syllables.join(' · ')}) và đọc chậm từng nhịp trước khi ghép nhanh.`,
    synonyms: synonyms.length > 0 ? synonyms : undefined,
    antonyms: antonyms.length > 0 ? antonyms : undefined,
    examples: examples.length > 0 ? examples : [{ en: `I am learning the word "${clean}".`, vi: `Tôi đang học từ "${clean}".` }],
    audioUrl,
  };
}

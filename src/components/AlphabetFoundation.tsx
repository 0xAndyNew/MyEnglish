import React, { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Turtle, Mic, Square, Sparkles, CheckCircle2, Headphones, RotateCw } from 'lucide-react';
import { AccentMode } from '../types/learning';
import {
  isSpeechRecognitionSupported,
  playLoudAudioUrl,
  scorePronunciation,
  speakText,
  startSpeechRecognition,
} from '../utils/speechEngine';

interface AlphabetExample {
  word: string;
  ipa: string;
  meaning: string;
  note?: string;
}

interface AlphabetItem {
  letter: string;
  ipa: string;
  vietHint: string;
  inWordSound: string;
  examples: AlphabetExample[];
  isVowel: boolean;
}

const ALPHABET_DATA: AlphabetItem[] = [
  {
    letter: 'A',
    ipa: '/eɪ/',
    vietHint: 'ây',
    inWordSound: 'Hay đọc thành /æ/ (cat) hoặc /eɪ/ (make), /ɑː/ (car)',
    isVowel: true,
    examples: [
      { word: 'apple', ipa: '/ˈæp.əl/', meaning: 'quả táo', note: 'âm /æ/' },
      { word: 'make', ipa: '/meɪk/', meaning: 'làm, chế tạo', note: 'âm /eɪ/' },
      { word: 'car', ipa: '/kɑːr/', meaning: 'xe hơi', note: 'âm /ɑː/' },
      { word: 'water', ipa: '/ˈwɔː.tər/', meaning: 'nước', note: 'âm /ɔː/' },
    ],
  },
  {
    letter: 'B',
    ipa: '/biː/',
    vietHint: 'bi',
    inWordSound: 'Âm /b/ mím môi rung cổ',
    isVowel: false,
    examples: [
      { word: 'book', ipa: '/bʊk/', meaning: 'quyển sách' },
      { word: 'baby', ipa: '/ˈbeɪ.bi/', meaning: 'em bé' },
      { word: 'table', ipa: '/ˈteɪ.bəl/', meaning: 'cái bàn' },
      { word: 'job', ipa: '/dʒɒb/', meaning: 'công việc' },
    ],
  },
  {
    letter: 'C',
    ipa: '/siː/',
    vietHint: 'xi',
    inWordSound: 'Đọc là /k/ (cat) hoặc /s/ trước e, i, y (city)',
    isVowel: false,
    examples: [
      { word: 'cat', ipa: '/kæt/', meaning: 'con mèo', note: 'đọc /k/' },
      { word: 'city', ipa: '/ˈsɪt.i/', meaning: 'thành phố', note: 'đọc /s/' },
      { word: 'coffee', ipa: '/ˈkɒf.i/', meaning: 'cà phê', note: 'đọc /k/' },
      { word: 'nice', ipa: '/naɪs/', meaning: 'đẹp, dễ chịu', note: 'đọc /s/' },
    ],
  },
  {
    letter: 'D',
    ipa: '/diː/',
    vietHint: 'đi',
    inWordSound: 'Âm /d/ đầu lưỡi chạm lợi trên',
    isVowel: false,
    examples: [
      { word: 'day', ipa: '/deɪ/', meaning: 'ngày' },
      { word: 'door', ipa: '/dɔːr/', meaning: 'cánh cửa' },
      { word: 'friend', ipa: '/frend/', meaning: 'bạn bè' },
      { word: 'read', ipa: '/riːd/', meaning: 'đọc sách' },
    ],
  },
  {
    letter: 'E',
    ipa: '/iː/',
    vietHint: 'i',
    inWordSound: 'Hay đọc là /e/ (egg), /iː/ (see) hoặc câm ở cuối từ (make)',
    isVowel: true,
    examples: [
      { word: 'egg', ipa: '/eɡ/', meaning: 'quả trứng', note: 'âm /e/' },
      { word: 'English', ipa: '/ˈɪŋ.ɡlɪʃ/', meaning: 'tiếng Anh', note: 'âm /ɪ/' },
      { word: 'see', ipa: '/siː/', meaning: 'nhìn thấy', note: 'âm /iː/' },
      { word: 'make', ipa: '/meɪk/', meaning: 'làm, tạo', note: 'e câm cuối' },
    ],
  },
  {
    letter: 'F',
    ipa: '/ef/',
    vietHint: 'ép-f',
    inWordSound: 'Răng trên chạm môi dưới thổi hơi /f/',
    isVowel: false,
    examples: [
      { word: 'food', ipa: '/fuːd/', meaning: 'thức ăn' },
      { word: 'family', ipa: '/ˈfæm.əl.i/', meaning: 'gia đình' },
      { word: 'coffee', ipa: '/ˈkɒf.i/', meaning: 'cà phê' },
      { word: 'leaf', ipa: '/liːf/', meaning: 'chiếc lá' },
    ],
  },
  {
    letter: 'G',
    ipa: '/dʒiː/',
    vietHint: 'dji',
    inWordSound: 'Đọc /ɡ/ (go, good) hoặc /dʒ/ trước e, i, y (orange)',
    isVowel: false,
    examples: [
      { word: 'good', ipa: '/ɡʊd/', meaning: 'tốt', note: 'đọc /ɡ/' },
      { word: 'go', ipa: '/ɡoʊ/', meaning: 'đi', note: 'đọc /ɡ/' },
      { word: 'orange', ipa: '/ˈɒr.ɪndʒ/', meaning: 'quả cam', note: 'đọc /dʒ/' },
      { word: 'bag', ipa: '/bæɡ/', meaning: 'cái túi', note: 'đọc /ɡ/' },
    ],
  },
  {
    letter: 'H',
    ipa: '/eɪtʃ/',
    vietHint: 'ây-ch',
    inWordSound: 'Thở hắt hơi nhẹ /h/ (thỉnh thoảng câm như: hour)',
    isVowel: false,
    examples: [
      { word: 'hello', ipa: '/həˈloʊ/', meaning: 'xin chào', note: 'đọc /h/' },
      { word: 'house', ipa: '/haʊs/', meaning: 'ngôi nhà', note: 'đọc /h/' },
      { word: 'happy', ipa: '/ˈhæp.i/', meaning: 'vui vẻ', note: 'đọc /h/' },
      { word: 'hour', ipa: '/aʊər/', meaning: 'giờ đồng hồ', note: 'h câm' },
    ],
  },
  {
    letter: 'I',
    ipa: '/aɪ/',
    vietHint: 'ai',
    inWordSound: 'Hay đọc là /ɪ/ (sit) hoặc /aɪ/ (ice, time)',
    isVowel: true,
    examples: [
      { word: 'ice', ipa: '/aɪs/', meaning: 'nước đá', note: 'âm /aɪ/' },
      { word: 'sit', ipa: '/sɪt/', meaning: 'ngồi', note: 'âm /ɪ/' },
      { word: 'time', ipa: '/taɪm/', meaning: 'thời gian', note: 'âm /aɪ/' },
      { word: 'fish', ipa: '/fɪʃ/', meaning: 'con cá', note: 'âm /ɪ/' },
    ],
  },
  {
    letter: 'J',
    ipa: '/dʒeɪ/',
    vietHint: 'dây',
    inWordSound: 'Chu môi bật rung cổ /dʒ/',
    isVowel: false,
    examples: [
      { word: 'job', ipa: '/dʒɒb/', meaning: 'công việc' },
      { word: 'juice', ipa: '/dʒuːs/', meaning: 'nước ép' },
      { word: 'jacket', ipa: '/ˈdʒæk.ɪt/', meaning: 'áo khoác' },
      { word: 'enjoy', ipa: '/ɪnˈdʒɔɪ/', meaning: 'tận hưởng' },
    ],
  },
  {
    letter: 'K',
    ipa: '/keɪ/',
    vietHint: 'kây',
    inWordSound: 'Bật hơi /k/ (câm khi đứng trước n: know)',
    isVowel: false,
    examples: [
      { word: 'key', ipa: '/kiː/', meaning: 'chìa khóa', note: 'đọc /k/' },
      { word: 'kitchen', ipa: '/ˈkɪtʃ.ɪn/', meaning: 'nhà bếp', note: 'đọc /k/' },
      { word: 'book', ipa: '/bʊk/', meaning: 'quyển sách', note: 'đọc /k/' },
      { word: 'know', ipa: '/noʊ/', meaning: 'biết', note: 'k câm' },
    ],
  },
  {
    letter: 'L',
    ipa: '/el/',
    vietHint: 'eo-l',
    inWordSound: 'Uốn đầu lưỡi chạm lợi trên /l/',
    isVowel: false,
    examples: [
      { word: 'love', ipa: '/lʌv/', meaning: 'yêu thương' },
      { word: 'learn', ipa: '/lɜːrn/', meaning: 'học hỏi' },
      { word: 'apple', ipa: '/ˈæp.əl/', meaning: 'quả táo' },
      { word: 'school', ipa: '/skuːl/', meaning: 'trường học' },
    ],
  },
  {
    letter: 'M',
    ipa: '/em/',
    vietHint: 'em',
    inWordSound: 'Mím hai môi đẩy âm qua mũi /m/',
    isVowel: false,
    examples: [
      { word: 'man', ipa: '/mæn/', meaning: 'đàn ông' },
      { word: 'morning', ipa: '/ˈmɔːr.nɪŋ/', meaning: 'buổi sáng' },
      { word: 'music', ipa: '/ˈmjuː.zɪk/', meaning: 'âm nhạc' },
      { word: 'name', ipa: '/neɪm/', meaning: 'tên' },
    ],
  },
  {
    letter: 'N',
    ipa: '/en/',
    vietHint: 'en',
    inWordSound: 'Đầu lưỡi chạm lợi trên đẩy qua mũi /n/',
    isVowel: false,
    examples: [
      { word: 'name', ipa: '/neɪm/', meaning: 'tên' },
      { word: 'new', ipa: '/njuː/', meaning: 'mới' },
      { word: 'sunny', ipa: '/ˈsʌn.i/', meaning: 'có nắng' },
      { word: 'pen', ipa: '/pen/', meaning: 'cây bút' },
    ],
  },
  {
    letter: 'O',
    ipa: '/oʊ/',
    vietHint: 'âu',
    inWordSound: 'Hay đọc là /ɒ/ (orange, hot) hoặc /oʊ/ (open, home)',
    isVowel: true,
    examples: [
      { word: 'orange', ipa: '/ˈɒr.ɪndʒ/', meaning: 'quả cam', note: 'âm /ɒ/' },
      { word: 'open', ipa: '/ˈoʊ.pən/', meaning: 'mở ra', note: 'âm /oʊ/' },
      { word: 'hot', ipa: '/hɒt/', meaning: 'nóng', note: 'âm /ɒ/' },
      { word: 'home', ipa: '/hoʊm/', meaning: 'ngôi nhà', note: 'âm /oʊ/' },
    ],
  },
  {
    letter: 'P',
    ipa: '/piː/',
    vietHint: 'pi',
    inWordSound: 'Mím môi bật hơi mạnh không rung cổ /p/',
    isVowel: false,
    examples: [
      { word: 'pen', ipa: '/pen/', meaning: 'cây bút' },
      { word: 'paper', ipa: '/ˈpeɪ.pər/', meaning: 'tờ giấy' },
      { word: 'happy', ipa: '/ˈhæp.i/', meaning: 'vui vẻ' },
      { word: 'cup', ipa: '/kʌp/', meaning: 'cái cốc' },
    ],
  },
  {
    letter: 'Q',
    ipa: '/kjuː/',
    vietHint: 'kiu',
    inWordSound: 'Thường đi với u (qu) đọc là /kw/',
    isVowel: false,
    examples: [
      { word: 'quick', ipa: '/kwɪk/', meaning: 'nhanh' },
      { word: 'question', ipa: '/ˈkwes.tʃən/', meaning: 'câu hỏi' },
      { word: 'quiet', ipa: '/ˈkwaɪ.ət/', meaning: 'yên tĩnh' },
      { word: 'queen', ipa: '/kwiːn/', meaning: 'nữ hoàng' },
    ],
  },
  {
    letter: 'R',
    ipa: '/ɑːr/',
    vietHint: 'a-r',
    inWordSound: 'Cuộn lưỡi vào trong, không rung lưỡi /r/',
    isVowel: false,
    examples: [
      { word: 'red', ipa: '/red/', meaning: 'màu đỏ' },
      { word: 'rain', ipa: '/reɪn/', meaning: 'cơn mưa' },
      { word: 'friend', ipa: '/frend/', meaning: 'bạn bè' },
      { word: 'car', ipa: '/kɑːr/', meaning: 'xe hơi' },
    ],
  },
  {
    letter: 'S',
    ipa: '/es/',
    vietHint: 'ét-s',
    inWordSound: 'Xì hơi nhẹ /s/ (sun) hoặc rung /z/ (music)',
    isVowel: false,
    examples: [
      { word: 'sun', ipa: '/sʌn/', meaning: 'mặt trời', note: 'đọc /s/' },
      { word: 'school', ipa: '/skuːl/', meaning: 'trường học', note: 'đọc /s/' },
      { word: 'music', ipa: '/ˈmjuː.zɪk/', meaning: 'âm nhạc', note: 'đọc /z/' },
      { word: 'bus', ipa: '/bʌs/', meaning: 'xe buýt', note: 'đọc /s/' },
    ],
  },
  {
    letter: 'T',
    ipa: '/tiː/',
    vietHint: 'ti',
    inWordSound: 'Bật hơi mạnh đầu lưỡi /t/',
    isVowel: false,
    examples: [
      { word: 'time', ipa: '/taɪm/', meaning: 'thời gian' },
      { word: 'tea', ipa: '/tiː/', meaning: 'trà' },
      { word: 'water', ipa: '/ˈwɔː.tər/', meaning: 'nước' },
      { word: 'cat', ipa: '/kæt/', meaning: 'con mèo' },
    ],
  },
  {
    letter: 'U',
    ipa: '/juː/',
    vietHint: 'iu',
    inWordSound: 'Hay đọc là /ʌ/ (cup, umbrella) hoặc /juː/ (use), /uː/ (blue)',
    isVowel: true,
    examples: [
      { word: 'use', ipa: '/juːz/', meaning: 'sử dụng', note: 'âm /juː/' },
      { word: 'cup', ipa: '/kʌp/', meaning: 'cái cốc', note: 'âm /ʌ/' },
      { word: 'blue', ipa: '/bluː/', meaning: 'màu xanh dương', note: 'âm /uː/' },
      { word: 'umbrella', ipa: '/ʌmˈbrel.ə/', meaning: 'cái ô (dù)', note: 'âm /ʌ/' },
    ],
  },
  {
    letter: 'V',
    ipa: '/viː/',
    vietHint: 'vi',
    inWordSound: 'Răng trên chạm môi dưới rung cổ /v/',
    isVowel: false,
    examples: [
      { word: 'very', ipa: '/ˈver.i/', meaning: 'rất' },
      { word: 'visit', ipa: '/ˈvɪz.ɪt/', meaning: 'đến thăm' },
      { word: 'voice', ipa: '/vɔɪs/', meaning: 'giọng nói' },
      { word: 'love', ipa: '/lʌv/', meaning: 'yêu thương' },
    ],
  },
  {
    letter: 'W',
    ipa: '/ˈdʌb.əl.juː/',
    vietHint: 'đắp-bờ-liu',
    inWordSound: 'Chu môi tròn nhỏ rồi mở ra /w/ (câm trước r: write)',
    isVowel: false,
    examples: [
      { word: 'water', ipa: '/ˈwɔː.tər/', meaning: 'nước', note: 'đọc /w/' },
      { word: 'work', ipa: '/wɜːrk/', meaning: 'làm việc', note: 'đọc /w/' },
      { word: 'window', ipa: '/ˈwɪn.doʊ/', meaning: 'cửa sổ', note: 'đọc /w/' },
      { word: 'write', ipa: '/raɪt/', meaning: 'viết', note: 'w câm' },
    ],
  },
  {
    letter: 'X',
    ipa: '/eks/',
    vietHint: 'éc-x',
    inWordSound: 'Đọc là /ks/ (box, taxi) hoặc /ɡz/ (exam)',
    isVowel: false,
    examples: [
      { word: 'box', ipa: '/bɒks/', meaning: 'cái hộp', note: 'đọc /ks/' },
      { word: 'taxi', ipa: '/ˈtæk.si/', meaning: 'xe taxi', note: 'đọc /ks/' },
      { word: 'six', ipa: '/sɪks/', meaning: 'số 6', note: 'đọc /ks/' },
      { word: 'exam', ipa: '/ɪɡˈzæm/', meaning: 'kỳ thi', note: 'đọc /ɡz/' },
    ],
  },
  {
    letter: 'Y',
    ipa: '/waɪ/',
    vietHint: 'oai',
    inWordSound: 'Đọc /j/ đầu từ (yes), /i/ cuối từ (happy) hoặc /aɪ/ (fly)',
    isVowel: false,
    examples: [
      { word: 'yes', ipa: '/jes/', meaning: 'có, vâng', note: 'đọc /j/' },
      { word: 'year', ipa: '/jɪər/', meaning: 'năm', note: 'đọc /j/' },
      { word: 'happy', ipa: '/ˈhæp.i/', meaning: 'hạnh phúc', note: 'đọc /i/' },
      { word: 'fly', ipa: '/flaɪ/', meaning: 'bay', note: 'đọc /aɪ/' },
    ],
  },
  {
    letter: 'Z',
    ipa: '/ziː/',
    vietHint: 'di / dét',
    inWordSound: 'Xì rung cổ họng như ong kêu /z/',
    isVowel: false,
    examples: [
      { word: 'zoo', ipa: '/zuː/', meaning: 'sở thú' },
      { word: 'zero', ipa: '/ˈzɪə.roʊ/', meaning: 'số không' },
      { word: 'amazing', ipa: '/əˈmeɪ.zɪŋ/', meaning: 'tuyệt vời' },
      { word: 'size', ipa: '/saɪz/', meaning: 'kích cỡ' },
    ],
  },
];

function renderHighlightedWord(word: string, letter: string, isVowel: boolean) {
  const target = letter.toLowerCase();
  const highlightClass = isVowel
    ? 'text-orange-600 dark:text-orange-400 underline decoration-2 underline-offset-2'
    : 'text-indigo-600 dark:text-indigo-400 underline decoration-2 underline-offset-2';

  return word.split('').map((ch, idx) =>
    ch.toLowerCase() === target ? (
      <span key={idx} className={highlightClass}>
        {ch}
      </span>
    ) : (
      <span key={idx}>{ch}</span>
    )
  );
}

const KIDS_WORD_EMOJI: Record<string, string> = {
  apple: '🍎', make: '🛠️', car: '🚗', water: '💧', book: '📖', baby: '👶', table: '🪑', job: '💼',
  cat: '🐱', city: '🏙️', coffee: '☕', nice: '✨', day: '☀️', door: '🚪', friend: '🤝', read: '📚',
  egg: '🥚', English: '🇬🇧', see: '👀', food: '🍔', family: '👨‍👩‍👧‍👦', leaf: '🍃', good: '👍', go: '🏃',
  orange: '🍊', bag: '🎒', hello: '👋', house: '🏠', happy: '😊', hour: '⏰', ice: '🧊', sit: '🪑',
  time: '⏱️', fish: '🐟', juice: '🧃', jacket: '🧥', enjoy: '🎉', key: '🔑', kitchen: '🍳', know: '💡',
  love: '❤️', learn: '🎓', school: '🏫', man: '👨', morning: '🌅', music: '🎵', name: '🏷️', new: '✨',
  sunny: '☀️', pen: '🖊️', open: '📂', hot: '🔥', home: '🏡', paper: '📄', cup: '🥤', quick: '⚡',
  question: '❓', quiet: '🤫', queen: '👑', red: '🔴', rain: '🌧️', sun: '☀️', bus: '🚌', tea: '🍵',
  use: '🛠️', blue: '🔵', umbrella: '☂️', very: '🌟', visit: '✈️', voice: '🗣️', work: '💼', window: '🪟',
  write: '✏️', box: '📦', taxi: '🚕', six: '6️⃣', exam: '📝', yes: '👍', year: '📅', fly: '🦋',
  zoo: '🦁', zero: '0️⃣', amazing: '🤩', size: '📏',
};

const KIDS_PRAISES = [
  '🎉 Tuyệt vời quá bé ơi! Bé chọn đúng chữ',
  '🌟 Siêu sao nhí xuất sắc! Chuẩn chữ',
  '🦁 Bé giỏi lắm luôn! Đúng ngay chữ',
  '🎈 Hoan hô bé yêu! Tìm trúng chữ',
];

export interface AlphabetFoundationProps {
  accent: AccentMode;
  isStepCompleted?: boolean;
  onCompleteStep1A?: () => void;
  savedPassedLetters?: string[];
  onPassLetter?: (letter: string) => void;
  kidsMode?: boolean;
}

export const AlphabetFoundation: React.FC<AlphabetFoundationProps> = ({
  accent,
  isStepCompleted = false,
  onCompleteStep1A,
  savedPassedLetters,
  onPassLetter,
  kidsMode = false,
}) => {
  const [selected, setSelected] = useState<AlphabetItem>(ALPHABET_DATA[0]);
  const [kidsCardFlipped, setKidsCardFlipped] = useState(false);
  const [listeningWord, setListeningWord] = useState<string | null>(null);
  const [micInterim, setMicInterim] = useState('');
  const [micError, setMicError] = useState<string | null>(null);
  const [micResult, setMicResult] = useState<{
    word: string;
    score: number;
    heard: string;
    audioUrl?: string;
  } | null>(null);
  const [kidsPraise, setKidsPraise] = useState<{ ok: boolean; text: string } | null>(null);
  const stopMicRef = useRef<((abort?: boolean) => void) | null>(null);

  useEffect(() => {
    return () => {
      stopMicRef.current?.(true);
      stopMicRef.current = null;
    };
  }, []);

  useEffect(() => {
    const url = micResult?.audioUrl;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [micResult?.audioUrl]);

  // Listen & Pick Letter Quiz covering all 26 letters
  const [localPassedLetters, setLocalPassedLetters] = useState<string[]>([]);
  const passedLetters = savedPassedLetters ?? localPassedLetters;
  const [quizSeed, setQuizSeed] = useState(0);
  const [quizChoice, setQuizChoice] = useState<string | null>(null);

  const remainingLetters = useMemo(
    () => ALPHABET_DATA.filter((item) => !passedLetters.includes(item.letter)),
    [passedLetters]
  );

  const quizTarget = useMemo(() => {
    const pool = remainingLetters.length > 0 ? remainingLetters : ALPHABET_DATA;
    return pool[quizSeed % pool.length];
  }, [remainingLetters, quizSeed]);

  const quizOptions = useMemo(() => {
    const targetIdx = ALPHABET_DATA.findIndex((a) => a.letter === quizTarget.letter);
    const others = [
      ALPHABET_DATA[(targetIdx + 4) % ALPHABET_DATA.length],
      ALPHABET_DATA[(targetIdx + 11) % ALPHABET_DATA.length],
      ALPHABET_DATA[(targetIdx + 19) % ALPHABET_DATA.length],
    ];
    return [quizTarget, ...others].sort((a, b) => a.letter.localeCompare(b.letter));
  }, [quizTarget]);

  const handleSelect = (item: AlphabetItem) => {
    stopMicRef.current?.(true);
    stopMicRef.current = null;
    setListeningWord(null);
    setMicInterim('');
    setMicError(null);
    setSelected(item);
    setKidsCardFlipped(false);
    setMicResult(null);
    speakText(item.letter.toLowerCase(), accent, 0.85);
  };

  const handleMic = (wordToPractice: string) => {
    if (listeningWord === wordToPractice) {
      stopMicRef.current?.(false);
      return;
    }
    if (listeningWord) {
      stopMicRef.current?.(true);
      stopMicRef.current = null;
    }
    if (!isSpeechRecognitionSupported()) {
      setMicError('Trình duyệt không hỗ trợ thu âm Micro.');
      return;
    }
    setListeningWord(wordToPractice);
    setMicError(null);
    setMicInterim('');
    setMicResult(null);
    stopMicRef.current = startSpeechRecognition(
      accent,
      (transcript, meta) => {
        const res = scorePronunciation(wordToPractice, transcript);
        setMicResult({ word: wordToPractice, score: res.score, heard: transcript, audioUrl: meta?.audioUrl });
      },
      (err) => setMicError(err),
      () => {
        setListeningWord(null);
        setMicInterim('');
        stopMicRef.current = null;
      },
      {
        onInterim: (text) => setMicInterim(text),
      }
    );
  };

  const canUnlockNext = isStepCompleted || passedLetters.length >= ALPHABET_DATA.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Kid-Friendly Bright Banner */}
      {kidsMode && (
        <div className="lg:col-span-12 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 p-5 sm:p-6 text-white shadow-lg flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              🎨 Vườn Chữ Cái Vui Nhộn Cho Bé
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-white/95">
              Chạm vào từng ô chữ đầy màu sắc để nghe đọc to rõ, xem từ ví dụ dễ thương và gom đủ 26 ngôi sao nhé! 🌈
            </p>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white text-orange-600 font-black text-xs sm:text-sm shadow-sm">
            ⭐ Đã gom: {passedLetters.length}/26 chữ cái
          </div>
        </div>
      )}

      {/* Step 1A Unlock Banner */}
      {onCompleteStep1A && (
        <div className="lg:col-span-12 p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-200">
            {kidsMode ? (
              <>
                <strong>🌟 Nhiệm vụ mở khóa K2 (Từ Vựng Qua Tranh):</strong>{' '}
                Bé hãy chơi Nghe âm → Chạm đúng Chữ cái cho cả 26 chữ ({isStepCompleted ? 26 : passedLetters.length}/26 ngôi sao).
              </>
            ) : (
              <>
                <strong>🎯 Nhiệm vụ mở khóa Bước 1B (44 Âm IPA):</strong>{' '}
                Hoàn thành bài kiểm tra Nghe âm → Chọn đúng Chữ cái cho cả 26 chữ ({isStepCompleted ? 26 : passedLetters.length}/26 chữ cái).
              </>
            )}
          </div>
          {canUnlockNext ? (
            <button
              onClick={onCompleteStep1A}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition"
            >
              {kidsMode
                ? '🎉 Giỏi quá! Mở khóa K2: Từ Vựng Qua Tranh →'
                : '🎉 Hoàn thành 26/26 chữ cái! Mở khóa Bước 1B →'}
            </button>
          ) : (
            <span className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 text-xs font-bold text-slate-500 border border-slate-200 dark:border-slate-700">
              🔒 Còn {ALPHABET_DATA.length - passedLetters.length} chữ cái để mở khóa
            </span>
          )}
        </div>
      )}

      {/* Left: 26 Letters Grid */}
      <div
        className={`lg:col-span-7 bg-white dark:bg-slate-900 border ${
          kidsMode
            ? 'rounded-3xl border-2 border-amber-200 dark:border-slate-800 p-5 space-y-4'
            : 'rounded-2xl border-slate-200 dark:border-slate-800 p-4 sm:p-5 space-y-3'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className={`${kidsMode ? 'text-lg font-black' : 'text-base font-extrabold'} text-slate-900 dark:text-white`}>
            {kidsMode
              ? '🌈 Bảng 26 Chữ Cái Kỳ Diệu (Chạm để nghe)'
              : 'Bảng 26 Chữ Cái Tiếng Anh (Bấm từng chữ để nghe)'}
          </h3>
          <div className="flex items-center gap-3 text-[11px] font-semibold">
            <span className="inline-flex items-center gap-1 text-orange-600">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />{' '}
              {kidsMode ? '5 Chữ Cam (A, E, I, O, U)' : '5 Nguyên âm (A, E, I, O, U)'}
            </span>
            <span className="inline-flex items-center gap-1 text-sky-600">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> {kidsMode ? '21 Chữ Xanh' : '21 Phụ âm'}
            </span>
          </div>
        </div>

        <div className={kidsMode ? 'grid grid-cols-4 sm:grid-cols-6 gap-2.5' : 'grid grid-cols-5 sm:grid-cols-7 gap-2'}>
          {ALPHABET_DATA.map((item) => {
            const active = item.letter === selected.letter;
            const passed = passedLetters.includes(item.letter);
            return (
              <button
                key={item.letter}
                onClick={() => handleSelect(item)}
                className={`relative flex flex-col items-center justify-center transition ${
                  kidsMode ? 'p-3.5 sm:p-4 rounded-2xl border-2' : 'p-2.5 rounded-xl border'
                } ${
                  active
                    ? kidsMode
                      ? 'bg-gradient-to-br from-pink-500 to-orange-500 text-white border-transparent shadow-lg scale-[1.06]'
                      : 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.04]'
                    : item.isVowel
                    ? 'bg-orange-50 hover:bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-900/50'
                    : 'bg-sky-50/70 hover:bg-sky-100 text-slate-800 border-sky-200/80 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
                }`}
              >
                {passed && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 absolute top-1.5 right-1.5 ${active ? 'text-emerald-200' : 'text-emerald-500'}`}
                  />
                )}
                <span className={kidsMode ? 'text-2xl sm:text-3xl font-black leading-none' : 'text-xl font-black leading-none'}>
                  {kidsMode ? `${item.letter}${item.letter.toLowerCase()}` : item.letter}
                </span>
                {!kidsMode && (
                  <span className={`text-[10px] font-mono mt-1 ${active ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {item.ipa}
                  </span>
                )}
                {kidsMode && (
                  <span className={`text-[11px] font-bold mt-1 ${active ? 'text-white/95' : 'text-slate-500 dark:text-slate-400'}`}>
                    {item.vietHint}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Selected Letter Detail (3D Flippable Card in Kids Mode) */}
      <div className="lg:col-span-5 space-y-3">
        {kidsMode ? (
          <div
            onClick={() => setKidsCardFlipped((v) => !v)}
            className="perspective-1200 cursor-pointer select-none"
          >
            <div
              className={`relative w-full min-h-[430px] transition-transform duration-500 transform-style-3d ${
                kidsCardFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* Front of 3D Alphabet Card */}
              <div className={`absolute inset-0 backface-hidden rounded-3xl border-4 border-white dark:border-slate-700 bg-gradient-to-br from-amber-50 via-white to-sky-50 dark:from-slate-900 dark:to-slate-800 kids-card-shadow p-6 flex flex-col justify-between text-center ${kidsCardFlipped ? 'pointer-events-none' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black ${
                      selected.isVowel
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-sky-100 text-sky-700'
                    }`}
                  >
                    {selected.isVowel ? '🌟 Chữ Nguyên Âm' : '🎈 Chữ Phụ Âm'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-extrabold text-slate-600 dark:text-slate-300">
                    <RotateCw className="w-3 h-3 text-pink-500" /> Chạm lật 3D
                  </span>
                </div>

                <div className="my-auto space-y-4 py-2">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(selected.letter.toLowerCase(), accent, 0.8);
                      }}
                      className={`w-28 h-28 rounded-3xl flex items-center justify-center font-black text-5xl text-white shadow-xl border-4 border-white hover:scale-105 active:scale-95 transition ${
                        selected.isVowel
                          ? 'bg-gradient-to-br from-orange-400 to-rose-500'
                          : 'bg-gradient-to-br from-sky-400 to-indigo-600'
                      }`}
                      title="Bấm nghe tên chữ cái"
                    >
                      {selected.letter}
                      {selected.letter.toLowerCase()}
                    </button>
                    {selected.examples[0] && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakText(selected.examples[0].word, accent, 0.85);
                        }}
                        className="w-24 h-28 rounded-3xl bg-white dark:bg-slate-800 border-2 border-amber-200 dark:border-slate-700 shadow-lg flex flex-col items-center justify-center gap-1 hover:scale-105 transition"
                        title="Nghe từ minh họa"
                      >
                        <span className="text-4xl">
                          {KIDS_WORD_EMOJI[selected.examples[0].word] || '🌟'}
                        </span>
                        <span className="text-xs font-black text-slate-800 dark:text-white">
                          {selected.examples[0].word}
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-black text-sm shadow-sm">
                    🗣️ Bé đọc là: “{selected.vietHint}”
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-amber-200/60">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakText(selected.letter.toLowerCase(), accent, 0.8);
                    }}
                    className="px-4 py-2 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-black text-xs sm:text-sm inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <Volume2 className="w-4 h-4" /> Nghe chữ {selected.letter}
                  </button>
                  <span className="text-xs font-extrabold text-pink-600 dark:text-pink-400">
                    👆 Chạm thẻ để xem {selected.examples.length} từ mẫu!
                  </span>
                </div>
              </div>

              {/* Back of 3D Alphabet Card */}
              <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl border-4 border-white dark:border-slate-700 bg-white dark:bg-slate-900 kids-card-shadow p-5 flex flex-col justify-between gap-3 ${!kidsCardFlipped ? 'pointer-events-none' : ''}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-pink-600 dark:text-pink-400">
                    🌟 {selected.examples.length} Từ vựng có chữ {selected.letter}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-extrabold text-slate-600 dark:text-slate-300">
                    <RotateCw className="w-3 h-3" /> Lật lại
                  </span>
                </div>

                <div className="space-y-2 my-auto">
                  {selected.examples.map((ex) => {
                    const isMicActive = listeningWord === ex.word;
                    const wordEmoji = KIDS_WORD_EMOJI[ex.word] || '🌟';
                    return (
                      <div
                        key={ex.word}
                        onClick={(e) => e.stopPropagation()}
                        className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex items-center gap-2.5">
                          <span className="text-2xl shrink-0">{wordEmoji}</span>
                          <div className="min-w-0">
                            <div className="text-base font-black text-slate-900 dark:text-white">
                              {renderHighlightedWord(ex.word, selected.letter, selected.isVowel)}
                            </div>
                            <div className="text-xs font-semibold text-slate-500 dark:text-slate-300">
                              {ex.meaning}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => speakText(ex.word, accent, 1.0)}
                            className="p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-indigo-400"
                            title={`Nghe từ ${ex.word}`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => speakText(ex.word, accent, 0.55)}
                            className="p-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-indigo-400"
                            title={`Nghe chậm ${ex.word}`}
                          >
                            <Turtle className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMic(ex.word)}
                            className={`p-2 rounded-xl text-white transition ${
                              isMicActive ? 'bg-rose-600 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'
                            }`}
                            title={isMicActive ? 'Dừng & chấm điểm' : `Đọc thử từ ${ex.word}`}
                          >
                            {isMicActive ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border rounded-2xl border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center justify-center font-black text-white shadow-md w-16 h-16 rounded-2xl text-4xl ${
                    selected.isVowel ? 'bg-orange-500' : 'bg-indigo-600'
                  }`}
                >
                  {selected.letter}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-slate-400">
                    {selected.isVowel ? 'Nguyên âm (Vowel)' : 'Phụ âm (Consonant)'}
                  </div>
                  <div className="font-mono text-xl font-bold text-indigo-600 dark:text-indigo-400">
                    {selected.ipa}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    Đọc tên chữ cái: <strong>"{selected.vietHint}"</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => speakText(selected.letter.toLowerCase(), accent, 0.8)}
                className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                title="Nghe tên chữ cái"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/50">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-300 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Cách đọc khi ghép vào từ
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">{selected.inWordSound}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-slate-400 uppercase font-bold">
                  Từ ví dụ minh họa ({selected.examples.length} từ)
                </span>
                <span className="text-[11px] font-medium text-slate-400">Nghe • Chậm • Đọc thử</span>
              </div>

              <div className="space-y-2">
                {selected.examples.map((ex) => {
                  const isMicActive = listeningWord === ex.word;
                  return (
                    <div
                      key={ex.word}
                      className="px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-base font-extrabold text-slate-900 dark:text-white">
                            {renderHighlightedWord(ex.word, selected.letter, selected.isVowel)}
                          </span>
                          <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">{ex.ipa}</span>
                          {ex.note && (
                            <span className="px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-[10px] font-bold">
                              {ex.note}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{ex.meaning}</div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => speakText(ex.word, accent, 1.0)}
                          className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-indigo-400"
                          title={`Nghe từ ${ex.word}`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => speakText(ex.word, accent, 0.55)}
                          className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:border-indigo-400"
                          title={`Nghe chậm ${ex.word}`}
                        >
                          <Turtle className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMic(ex.word)}
                          className={`p-2 rounded-lg text-white transition ${
                            isMicActive ? 'bg-rose-600 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-700'
                          }`}
                          title={isMicActive ? 'Dừng & chấm điểm' : `Đọc thử từ ${ex.word}`}
                        >
                          {isMicActive ? <Square className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {listeningWord && micInterim && (
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            ● ({listeningWord}) {micInterim}
          </div>
        )}
        {micError && (
          <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 text-xs font-semibold text-rose-700 dark:text-rose-300">
            {micError}
          </div>
        )}
        {micResult && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 text-xs flex flex-wrap items-center justify-between gap-2">
            <span>
              {kidsMode && micResult.score >= 70 ? '🌟 Giỏi quá bé ơi! ' : ''}
              Điểm đọc từ <strong>{micResult.word}</strong>: <strong>{micResult.score}%</strong> (Nghe: "{micResult.heard}")
            </span>
            {micResult.audioUrl && (
              <button
                type="button"
                onClick={() => playLoudAudioUrl(micResult.audioUrl!, { gain: 1.4 })}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold inline-flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Nghe lại giọng bạn
              </button>
            )}
          </div>
        )}
      </div>

      {/* Practice: Listen & Pick Letter Quiz (Must pass all 26 letters) */}
      <div
        className={`lg:col-span-12 bg-white dark:bg-slate-900 border ${
          kidsMode
            ? 'rounded-3xl border-2 border-emerald-300 dark:border-emerald-800 p-5 sm:p-6 space-y-4'
            : 'rounded-2xl border-emerald-200 dark:border-emerald-900/60 p-5 space-y-4'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-emerald-700 dark:text-emerald-300">
            <Headphones className="w-5 h-5" />
            <span>
              {kidsMode
                ? '🎮 Trò Chơi Săn Chữ Cái: Nghe & Chạm Đúng Chữ Nhé!'
                : 'Thực hành: Nghe âm → Chọn đúng Chữ cái (Hoàn thành đủ 26/26 chữ cái)'}
            </span>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
            {kidsMode ? `⭐ Đã gom: ${passedLetters.length}/26 ngôi sao` : `Đã thuộc: ${passedLetters.length}/26 chữ cái`}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => speakText(quizTarget.letter.toLowerCase(), accent, 0.8)}
            className={`inline-flex items-center gap-1.5 text-white font-bold shadow-sm ${
              kidsMode
                ? 'px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-sm sm:text-base font-black'
                : 'px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs sm:text-sm'
            }`}
          >
            <Volume2 className="w-4 h-4" /> {kidsMode ? 'Nghe Chữ Bí Mật 🔊' : 'Nghe chữ cái cần tìm'}
          </button>

          {quizChoice && (
            <button
              onClick={() => {
                setQuizChoice(null);
                setKidsPraise(null);
                setQuizSeed((s) => s + 1);
              }}
              className={`${
                kidsMode
                  ? 'px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black'
                  : 'px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold'
              }`}
            >
              {kidsMode ? 'Chữ Tiếp Theo 🚀' : 'Chữ tiếp theo →'}
            </button>
          )}
        </div>

        {kidsMode && kidsPraise && (
          <div
            className={`p-3.5 rounded-2xl border-2 text-sm sm:text-base font-black ${
              kidsPraise.ok
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-200'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-800 dark:text-amber-200'
            }`}
          >
            {kidsPraise.text}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quizOptions.map((opt) => {
            const isPicked = quizChoice === opt.letter;
            const isRight = opt.letter === quizTarget.letter;
            let cls = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-emerald-400';
            if (quizChoice) {
              if (isRight) cls = 'bg-emerald-100 border-emerald-500 text-emerald-900';
              else if (isPicked) cls = 'bg-rose-100 border-rose-500 text-rose-900';
            }
            return (
              <button
                key={opt.letter}
                disabled={Boolean(quizChoice)}
                onClick={() => {
                  setQuizChoice(opt.letter);
                  if (isRight) {
                    const nextPassed = passedLetters.includes(opt.letter)
                      ? passedLetters
                      : [...passedLetters, opt.letter];
                    setLocalPassedLetters(nextPassed);
                    onPassLetter?.(opt.letter);
                    if (kidsMode) {
                      if (nextPassed.length === ALPHABET_DATA.length) {
                        setKidsPraise({
                          ok: true,
                          text: '👑 Hoan hô! Bé đã chinh phục trọn vẹn 26/26 ngôi sao chữ cái rồi!!',
                        });
                        confetti({ particleCount: 80, spread: 75 });
                      } else {
                        const praisePrefix = KIDS_PRAISES[quizSeed % KIDS_PRAISES.length];
                        setKidsPraise({
                          ok: true,
                          text: `${praisePrefix} ${opt.letter}! (+1 ⭐)`,
                        });
                        confetti({ particleCount: 28, spread: 55, origin: { y: 0.72 } });
                      }
                    } else if (nextPassed.length === ALPHABET_DATA.length) {
                      confetti({ particleCount: 70, spread: 70 });
                    }
                  } else if (kidsMode) {
                    setKidsPraise({
                      ok: false,
                      text: `🎈 Suýt trúng rồi! Ô vừa chọn là chữ ${opt.letter}, đáp án đúng là ${quizTarget.letter} đó bé!`,
                    });
                  }
                }}
                className={`${
                  kidsMode
                    ? 'py-5 rounded-2xl border-4 font-black text-3xl sm:text-4xl'
                    : 'py-3.5 rounded-xl border-2 font-black text-2xl'
                } transition ${cls}`}
              >
                {kidsMode ? `${opt.letter}${opt.letter.toLowerCase()}` : opt.letter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

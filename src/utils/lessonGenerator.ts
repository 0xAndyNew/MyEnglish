import { CORE_VOCABULARY, CoreVocabItem } from '../data/coreVocabulary';
import { LESSON_MODULES } from '../data/curriculumData';
import { CefrLevel, LessonModule, WordEntry } from '../types/learning';
import { detectPhonicsHint, detectSilentIndices, splitSyllables } from './wordAnalyzer';

const TOPIC_GRAMMAR: Record<
  string,
  { title: string; formula: string; explanation: string; sampleEn: string; sampleVi: string }
> = {
  'Giao tiếp': {
    title: 'Cách diễn đạt Giao tiếp Tự nhiên & Lịch sự',
    formula: 'Could you + V...? | I would like to + V... | What do you think about...?',
    explanation: 'Trong giao tiếp hàng ngày, hãy dùng câu mở đầu lịch sự thay vì nói cộc lốc động từ.',
    sampleEn: 'Could you explain that again, please?',
    sampleVi: 'Bạn có thể giải thích lại điều đó giúp tôi được không?',
  },
  'Con người': {
    title: 'Giới thiệu Con người, Gia đình & Mối quan hệ',
    formula: 'S + have/has + ... | He/She works as a + Nghề nghiệp',
    explanation: 'Lưu ý chia động từ "has" cho ngôi số ít (He/She/My brother) và thêm mạo từ "a/an" trước nghề nghiệp.',
    sampleEn: 'My colleague is very helpful and friendly.',
    sampleVi: 'Đồng nghiệp của tôi rất nhiệt tình và thân thiện.',
  },
  'Thời gian': {
    title: 'Diễn đạt Thời gian & Tần suất chuẩn xác',
    formula: 'at + giờ | on + thứ/ngày | in + tháng/năm/buổi',
    explanation: 'Dùng đúng giới từ chỉ thời gian (at 7 AM, on Monday, in the morning) và đặt trạng từ tần suất (always, usually) trước động từ thường.',
    sampleEn: 'I usually study English for thirty minutes in the evening.',
    sampleVi: 'Tôi thường học tiếng Anh ba mươi phút vào buổi tối.',
  },
  'Số đếm': {
    title: 'Cách dùng Số đếm, Số lượng & Tỷ lệ',
    formula: 'How many + Danh từ số nhiều | How much + Danh từ không đếm được',
    explanation: 'Nhớ bật âm cuối /s/ hoặc /z/ ở danh từ số nhiều đứng sau các số từ 2 trở lên.',
    sampleEn: 'There are ten important lessons in this stage.',
    sampleVi: 'Có mười bài học quan trọng trong chặng này.',
  },
  'Nhà cửa': {
    title: 'Mô tả Không gian & Đồ vật với "There is / There are"',
    formula: 'There is + Danh từ số ít | There are + Danh từ số nhiều + in/on/near...',
    explanation: 'Dùng "There is/are" để giới thiệu sự tồn tại của đồ vật trong phòng hoặc ngôi nhà.',
    sampleEn: 'There is a small lamp on the table near the window.',
    sampleVi: 'Có một chiếc đèn nhỏ trên bàn gần cửa sổ.',
  },
  'Ẩm thực': {
    title: 'Gọi món & Diễn đạt Khẩu vị tại Nhà hàng',
    formula: 'I would like + món ăn, please | Can I have the menu?',
    explanation: 'Dùng "would like" thay cho "want" để câu gọi món lịch sự và tự nhiên hơn.',
    sampleEn: 'I would like a cup of coffee without sugar, please.',
    sampleVi: 'Cho tôi một tách cà phê không đường nhé.',
  },
  'Hành động': {
    title: 'Ghép Động từ Hành động theo Thì (Hiện tại - Quá khứ - Tương lai)',
    formula: 'S + V(s/es) [Hiện tại] | S + V2/ed [Quá khứ] | S + will + V [Tương lai]',
    explanation: 'Luôn xác định mốc thời gian trước khi chọn dạng động từ.',
    sampleEn: 'We started early and finished the project on time.',
    sampleVi: 'Chúng tôi đã bắt đầu sớm và hoàn thành dự án đúng hạn.',
  },
  'Du lịch': {
    title: 'Hỏi đường, Đặt vé & Giao tiếp khi Di chuyển',
    formula: 'Where is the...? | How long does it take to get to...?',
    explanation: 'Nắm chắc cấu trúc hỏi đường và thời gian di chuyển để tự tin khi đi du lịch nước ngoài.',
    sampleEn: 'Excuse me, how long does it take to get to the airport?',
    sampleVi: 'Xin lỗi, mất bao lâu để đi tới sân bay vậy?',
  },
  'Mua sắm': {
    title: 'Hỏi giá, Đàm phán & Thanh toán',
    formula: 'How much is this? | Do you have a discount? | Can I pay by card?',
    explanation: 'Dùng "is this" cho 1 món đồ và "are these" cho nhiều món đồ (như shoes, clothes).',
    sampleEn: 'How much is this shirt and can I pay by card?',
    sampleVi: 'Chiếc áo này giá bao nhiêu và tôi có thể trả bằng thẻ không?',
  },
  'Công việc': {
    title: 'Văn phong Công sở, Họp hành & Báo cáo Tiến độ',
    formula: 'We need to prioritize... | Let us collaborate on... | On schedule',
    explanation: 'Sử dụng động từ hành động mạnh và các cụm từ cố định (Collocations) để câu văn chuyên nghiệp.',
    sampleEn: 'We need to prioritize this milestone to stay on schedule.',
    sampleVi: 'Chúng ta cần ưu tiên cột mốc này để bám sát tiến độ.',
  },
  'Công nghệ': {
    title: 'Diễn đạt về Công nghệ, Hệ thống & Dữ liệu',
    formula: 'S + helps us + V | We use + công cụ + to + mục đích',
    explanation: 'Kết hợp động từ công nghệ (optimize, integrate, encrypt) với cụm chỉ mục đích "to + V".',
    sampleEn: 'We optimize the system to protect user data securely.',
    sampleVi: 'Chúng tôi tối ưu hệ thống để bảo vệ dữ liệu người dùng an toàn.',
  },
  'Học thuật': {
    title: 'Lập luận, Phân tích & Đọc hiểu Thông tin Chuyên sâu',
    formula: 'Based on the evidence, ... | From an objective perspective, ...',
    explanation: 'Khi trình bày thông tin hoặc viết bài phân tích, hãy mở đầu bằng cụm dẫn chứng rõ ràng.',
    sampleEn: 'We should verify the evidence before making a conclusion.',
    sampleVi: 'Chúng ta nên xác minh bằng chứng trước khi đưa ra kết luận.',
  },
};

function getStageIdForLevel(level: CefrLevel): string {
  if (level === 'A0') return 'stage-a0';
  if (level === 'A1') return 'stage-a1';
  if (level === 'A2') return 'stage-a2';
  if (level === 'B1') return 'stage-b1';
  return 'stage-b2c1';
}

function toWordEntry(item: CoreVocabItem): WordEntry {
  const syllables = splitSyllables(item.word);
  const silentIndices = detectSilentIndices(item.word);
  const { rule, vietApprox } = detectPhonicsHint(item.word);
  const grammar = TOPIC_GRAMMAR[item.topic];

  return {
    id: `core-${item.word.toLowerCase()}`,
    word: item.word,
    syllables,
    stressIndex: item.word.endsWith('tion') || item.word.endsWith('sion') ? Math.max(0, syllables.length - 2) : 0,
    silentIndices,
    ipaUS: `/${syllables.join('.')}/`,
    ipaUK: `/${syllables.join('.')}/`,
    vietPhonetic: vietApprox,
    phonicsRule: rule,
    pos: item.pos,
    level: item.level,
    meaningVi: item.meaningVi,
    mnemonic: `Chia "${item.word}" thành ${syllables.length} nhịp (${syllables.join(' · ')}), gắn với chủ đề "${item.topic}" để nhớ nhanh.`,
    examples: [
      {
        en: grammar ? grammar.sampleEn : `I practice using the word "${item.word}" in daily sentences.`,
        vi: grammar ? grammar.sampleVi : `Tôi luyện dùng từ "${item.word}" (${item.meaningVi}) trong câu hàng ngày.`,
      },
    ],
  };
}

/**
 * Sinh toàn bộ danh sách bài học đầy đủ phủ kín 980+ từ vựng từ A0 -> C1
 */
export function getAllStructuredLessons(): LessonModule[] {
  // 1. Tạo map ưu tiên các từ đã biên soạn siêu sâu từ LESSON_MODULES
  const curatedMap = new Map<string, { word: WordEntry; stageId: string; topic: string }>();
  for (const mod of LESSON_MODULES) {
    for (const w of mod.words) {
      const key = w.word.toLowerCase();
      if (!curatedMap.has(key)) {
        curatedMap.set(key, { word: w, stageId: mod.stageId, topic: mod.title });
      }
    }
  }

  // 2. Gom toàn bộ từ vựng theo từng chặng (ưu tiên giữ bản curated nếu trùng)
  const stageBuckets: Record<string, { word: WordEntry; topic: string }[]> = {
    'stage-a0': [],
    'stage-a1': [],
    'stage-a2': [],
    'stage-b1': [],
    'stage-b2c1': [],
  };

  const addedKeys = new Set<string>();

  for (const [key, entry] of curatedMap.entries()) {
    addedKeys.add(key);
    const sid = stageBuckets[entry.stageId] ? entry.stageId : 'stage-a1';
    stageBuckets[sid].push({ word: entry.word, topic: entry.topic });
  }

  for (const item of CORE_VOCABULARY) {
    const key = item.word.toLowerCase();
    if (addedKeys.has(key)) continue;
    addedKeys.add(key);
    const sid = getStageIdForLevel(item.level);
    stageBuckets[sid].push({ word: toWordEntry(item), topic: item.topic });
  }

  // Đảm bảo stage-a0 có đủ 10 từ (lấy thêm từ đầu stage-a1 nếu thiếu)
  while (stageBuckets['stage-a0'].length < 10 && stageBuckets['stage-a1'].length > 0) {
    stageBuckets['stage-a0'].push(stageBuckets['stage-a1'].shift()!);
  }

  // 3. Cắt đều từng chặng thành các bài học ĐÚNG 10 TỪ/BÀI
  const CHUNK_SIZE = 10;
  const stageOrder: { id: string; level: CefrLevel }[] = [
    { id: 'stage-a0', level: 'A0' },
    { id: 'stage-a1', level: 'A1' },
    { id: 'stage-a2', level: 'A2' },
    { id: 'stage-b1', level: 'B1' },
    { id: 'stage-b2c1', level: 'B2' },
  ];

  const allLessons: LessonModule[] = [];
  let lessonCounter = 1;

  for (const st of stageOrder) {
    const items = stageBuckets[st.id];
    const totalChunks = Math.ceil(items.length / CHUNK_SIZE);

    for (let c = 0; c < totalChunks; c++) {
      const slice = items.slice(c * CHUNK_SIZE, (c + 1) * CHUNK_SIZE);
      const words = slice.map((s) => s.word);
      const mainTopic = slice[0]?.topic.replace(/^Bài \d+:\s*/i, '') || 'Từ vựng cốt lõi';
      const grammar = TOPIC_GRAMMAR[mainTopic];

      allLessons.push({
        id: `lesson-${st.id}-${c + 1}`,
        stageId: st.id,
        level: words[0]?.level || st.level,
        title: `Bài ${lessonCounter}: ${mainTopic}`,
        subtitle: `${words.length} từ vựng trọng tâm (${st.level})`,
        description: `Học & kiểm tra chính tả 100% cho ${words.length} từ vựng chủ đề ${mainTopic}.`,
        grammarNote: grammar
          ? {
              title: grammar.title,
              formula: grammar.formula,
              explanation: grammar.explanation,
              examples: [{ en: grammar.sampleEn, vi: grammar.sampleVi }],
            }
          : undefined,
        words,
        practiceSentences: [
          grammar
            ? { en: grammar.sampleEn, vi: grammar.sampleVi }
            : {
                en: `Learning "${words[0]?.word}" helps me understand more English.`,
                vi: `Học từ "${words[0]?.word}" giúp tôi hiểu tiếng Anh nhiều hơn.`,
              },
        ],
      });
      lessonCounter++;
    }
  }

  return allLessons;
}

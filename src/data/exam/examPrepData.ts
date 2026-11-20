import { ExamType } from '../../types/audience';
import { CefrLevel } from '../../types/learning';
import { IELTS_EXTRA } from './ieltsExtra';
import { TOEIC_EXTRA } from './toeicExtra';
import { VSTEP_EXTRA } from './vstepExtra';
import { CAMBRIDGE_EXTRA } from './cambridgeExtra';
import { TOEFL_EXTRA } from './toeflExtra';

export interface ExamCefrRow {
  cefr: string;
  scoreRange: string;
  description: string;
}

export interface ExamSectionGuide {
  id: string;
  skill: 'Listening' | 'Reading' | 'Writing' | 'Speaking' | 'Use of English';
  partName: string;
  duration: string;
  tasksOrQuestions: string;
  strategies: string[];
  commonTraps: string[];
}

export interface ExamMcqQuestion {
  id: string;
  skill: 'listening' | 'reading' | 'grammar' | 'vocab';
  partLabel: string;
  audioScript?: string;
  passage?: string;
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

export interface ExamReadingSet {
  id: string;
  partLabel: string;
  title: string;
  level: CefrLevel;
  sourceGroup?: 'exam-format' | 'foundation';
  passage: string;
  viSummary: string;
  keyPhrases?: { en: string; vi: string }[];
  questions: {
    id: string;
    questionType: string;
    question: string;
    options: string[];
    correctIdx: number;
    explanation: string;
  }[];
}

export interface ExamListeningSet {
  id: string;
  partLabel: string;
  title: string;
  level: CefrLevel;
  sourceGroup?: 'exam-format' | 'foundation';
  speakerContext: string;
  audioScript: string;
  viSummary: string;
  keyPhrases?: { en: string; vi: string }[];
  questions: {
    id: string;
    question: string;
    options: string[];
    correctIdx: number;
    explanation: string;
  }[];
}

export interface ExamWritingTask {
  id: string;
  taskLabel: string;
  title: string;
  sourceGroup?: 'exam-format' | 'foundation';
  recommendedMinutes: number;
  wordCountRange: string;
  minWords: number;
  prompt: string;
  promptVi: string;
  outline: string[];
  scoringCriteriaFocus: string[];
  highBandKeywords: { phrase: string; meaningVi: string; usageTip?: string }[];
  modelAnswer: string;
  modelNotesVi: string;
}

export interface ExamSpeakingTask {
  id: string;
  partLabel: string;
  title: string;
  sourceGroup?: 'exam-format' | 'foundation';
  prepTimeText: string;
  speakTimeText: string;
  prompt: string;
  cuePoints?: string[];
  promptVi: string;
  sampleAnswer: string;
  highScoreVocab: { phrase: string; meaningVi: string }[];
  deliveryTips: string[];
}

export interface ExamRubricCriterion {
  id: string;
  appliesTo: 'writing' | 'speaking' | 'both';
  name: string;
  nameVi: string;
  weightText: string;
  description: string;
  highScoreBenchmarks: string[];
}

export interface ExamMockTest {
  title: string;
  description: string;
  durationMinutes: number;
  questions: ExamMcqQuestion[];
}

export interface ExamPrepProfile {
  examType: ExamType;
  title: string;
  subtitle: string;
  badgeEmoji: string;
  totalDurationText: string;
  scoreScale: string;
  disclaimerNote: string;
  cefrMapping: ExamCefrRow[];
  sections: ExamSectionGuide[];
  diagnosticQuestions: ExamMcqQuestion[];
  skillPractice: {
    reading: ExamReadingSet[];
    listening: ExamListeningSet[];
    writing: ExamWritingTask[];
    speaking: ExamSpeakingTask[];
  };
  mockTest: ExamMockTest;
  mockTests?: ExamMockTest[];
  rubricCriteria: ExamRubricCriterion[];
}

export const EXAM_DISCLAIMER =
  'Lưu ý: Toàn bộ đề chẩn đoán, bài luyện kỹ năng, đề thi thử và bài mẫu dưới đây được biên soạn gốc, mô phỏng theo chuẩn cấu trúc và tiêu chí chấm của từng kỳ thi để phục vụ ôn luyện.';

export const EXAM_ORDER: ExamType[] = ['ielts', 'toeic', 'vstep', 'cambridge', 'toefl'];

export function estimateExamScore(
  examType: ExamType,
  correctCount: number,
  totalCount: number
): {
  estimatedScore: string;
  cefr: CefrLevel;
  commentVi: string;
  accuracyPercent: number;
} {
  const safeTotal = Math.max(1, totalCount);
  const pct = Math.round((correctCount / safeTotal) * 100);

  switch (examType) {
    case 'ielts': {
      if (pct >= 88) {
        return {
          estimatedScore: 'Band 7.5 – 8.0',
          cefr: 'C1',
          accuracyPercent: pct,
          commentVi: 'Nền tảng học thuật rất vững! Tập trung tinh chỉnh Paraphrase tinh tế và Speaking Part 3 để giữ ổn định Band 7.5+.',
        };
      }
      if (pct >= 72) {
        return {
          estimatedScore: 'Band 6.5 – 7.0',
          cefr: 'B2',
          accuracyPercent: pct,
          commentVi: 'Khả năng đọc hiểu và xử lý bẫy tốt. Cần trau dồi thêm từ vựng học thuật C1 và tránh lỗi Not Given / False.',
        };
      }
      if (pct >= 55) {
        return {
          estimatedScore: 'Band 5.5 – 6.0',
          cefr: 'B2',
          accuracyPercent: pct,
          commentVi: 'Đạt mức trung khá. Hãy luyện tốc độ Skimming/Scanning và viết câu phức chuẩn xác hơn.',
        };
      }
      if (pct >= 38) {
        return {
          estimatedScore: 'Band 4.5 – 5.0',
          cefr: 'B1',
          accuracyPercent: pct,
          commentVi: 'Đang ở mức nền B1. Cần củng cố từ vựng học thuật thiết yếu, nghe bắt ý thay đổi và thì ngữ pháp cốt lõi.',
        };
      }
      return {
        estimatedScore: 'Band 3.5 – 4.0',
        cefr: 'A2',
        accuracyPercent: pct,
        commentVi: 'Nền tảng còn mỏng. Nên ôn chắc từ vựng B1, cấu trúc câu đơn/ghép và nghe chậm 0.85x trước khi tăng tốc.',
      };
    }

    case 'toeic': {
      if (pct >= 88) {
        return {
          estimatedScore: '850 – 935 điểm (L&R)',
          cefr: 'C1',
          accuracyPercent: pct,
          commentVi: 'Phản xạ tiếng Anh công sở xuất sắc! Có thể chinh phục mốc 900+ và luyện thêm TOEIC Speaking & Writing.',
        };
      }
      if (pct >= 72) {
        return {
          estimatedScore: '710 – 830 điểm (L&R)',
          cefr: 'B2',
          accuracyPercent: pct,
          commentVi: 'Đủ sức đáp ứng chuẩn công ty đa quốc gia. Chú ý tối ưu thời gian Part 7 đa đoạn và bẫy đồng âm Part 2.',
        };
      }
      if (pct >= 55) {
        return {
          estimatedScore: '560 – 690 điểm (L&R)',
          cefr: 'B1',
          accuracyPercent: pct,
          commentVi: 'Đạt mức chuẩn đầu ra phổ biến của nhiều trường ĐH. Hãy tăng tốc Part 5 từ loại & luyện nghe Part 3–4 theo cụm.',
        };
      }
      if (pct >= 38) {
        return {
          estimatedScore: '420 – 540 điểm (L&R)',
          cefr: 'A2',
          accuracyPercent: pct,
          commentVi: 'Đã nắm được ý chính đơn giản. Cần ôn lại các dạng từ loại, thì động từ và từ vựng văn phòng cốt lõi.',
        };
      }
      return {
        estimatedScore: '250 – 390 điểm (L&R)',
        cefr: 'A2',
        accuracyPercent: pct,
        commentVi: 'Nên bắt đầu từ Part 1–2 nghe bắt từ khóa và củng cố ngữ pháp cơ bản Part 5 để vượt mốc 450+.',
      };
    }

    case 'vstep': {
      if (pct >= 85) {
        return {
          estimatedScore: '8.5 – 9.2 / 10 (C1 – Bậc 5)',
          cefr: 'C1',
          accuracyPercent: pct,
          commentVi: 'Năng lực xử lý câu suy luận và từ vựng học thuật đạt chuẩn C1. Hãy luyện thêm Task 2 essay phản biện sâu.',
        };
      }
      if (pct >= 68) {
        return {
          estimatedScore: '6.5 – 8.0 / 10 (B2 – Bậc 4)',
          cefr: 'B2',
          accuracyPercent: pct,
          commentVi: 'Vững chuẩn B2! Chú ý câu quy chiếu đại từ, câu hỏi EXCEPT và cấu trúc Speaking Part 2–3 để bứt phá.',
        };
      }
      if (pct >= 48) {
        return {
          estimatedScore: '4.5 – 5.5 / 10 (B1 – Bậc 3)',
          cefr: 'B1',
          accuracyPercent: pct,
          commentVi: 'Tiếp cận tốt ngưỡng B1. Hãy luyện thêm kỹ năng đọc tìm chi tiết và viết thư Task 1 đúng văn phong.',
        };
      }
      return {
        estimatedScore: '3.0 – 4.0 / 10 (A2 – Bậc 2)',
        cefr: 'A2',
        accuracyPercent: pct,
        commentVi: 'Cần củng cố từ vựng B1 và kỹ năng nghe thông báo ngắn để chắc chắn vượt ngưỡng B1 (4.0+).',
      };
    }

    case 'cambridge': {
      if (pct >= 85) {
        return {
          estimatedScore: '165 – 178 (B2 First / FCE)',
          cefr: 'B2',
          accuracyPercent: pct,
          commentVi: 'Xử lý Use of English (Word Formation & Key Word Transformation) rất sắc bén! Sẵn sàng cho mục tiêu FCE Grade A/B.',
        };
      }
      if (pct >= 65) {
        return {
          estimatedScore: '145 – 162 (B1 PET / cận FCE)',
          cefr: 'B1',
          accuracyPercent: pct,
          commentVi: 'Vững trình độ B1 Preliminary (PET). Hãy luyện thêm Collocations và biến đổi câu để tiến lên B2 First (FCE).',
        };
      }
      if (pct >= 45) {
        return {
          estimatedScore: '126 – 142 (A2 Key / cận PET)',
          cefr: 'A2',
          accuracyPercent: pct,
          commentVi: 'Đạt chuẩn A2 Key (KET). Tiếp tục mở rộng cụm động từ (Phrasal Verbs) và viết Email/Story mạch lạc để lên PET.',
        };
      }
      return {
        estimatedScore: '105 – 122 (Nền tảng KET)',
        cefr: 'A2',
        accuracyPercent: pct,
        commentVi: 'Cần ôn kỹ từ vựng giao tiếp đời sống, biển báo ngắn và cấu trúc câu thì hiện tại/quá khứ cho bài thi KET.',
      };
    }

    case 'toefl':
    default: {
      if (pct >= 88) {
        return {
          estimatedScore: '96 – 112 / 120',
          cefr: 'C1',
          accuracyPercent: pct,
          commentVi: 'Tư duy đọc hiểu học thuật Bắc Mỹ và tổng hợp bài giảng rất ấn tượng! Rất phù hợp mục tiêu học bổng & sau ĐH.',
        };
      }
      if (pct >= 72) {
        return {
          estimatedScore: '78 – 94 / 120',
          cefr: 'B2',
          accuracyPercent: pct,
          commentVi: 'Đủ chuẩn tuyển sinh của nhiều trường ĐH quốc tế. Hãy luyện thêm câu hỏi Rhetorical Purpose & Speaking Integrated.',
        };
      }
      if (pct >= 52) {
        return {
          estimatedScore: '56 – 74 / 120',
          cefr: 'B1',
          accuracyPercent: pct,
          commentVi: 'Hiểu được khung ý học thuật cơ bản. Cần tăng vốn từ học thuật theo ngữ cảnh và tốc độ ghi chú (note-taking) khi nghe.',
        };
      }
      return {
        estimatedScore: '36 – 52 / 120',
        cefr: 'A2',
        accuracyPercent: pct,
        commentVi: 'Nên xây nền tảng ngữ pháp học thuật, luyện paraphrase câu dài và nghe bài giảng ngắn với tốc độ 0.85x.',
      };
    }
  }
}

const BASE_EXAM_PREP_DATA: Record<ExamType, ExamPrepProfile> = {
  ielts: {
    examType: 'ielts',
    title: 'IELTS (Academic & General Training)',
    subtitle: 'Hệ thống kiểm tra Anh ngữ Quốc tế 4 kỹ năng chuẩn du học, học thuật & định cư.',
    badgeEmoji: '🇬🇧',
    totalDurationText: 'Khoảng 2 giờ 45 phút (Listening 30p • Reading 60p • Writing 60p • Speaking 11–14p)',
    scoreScale: 'Band 0.0 – 9.0 (làm tròn 0.5)',
    disclaimerNote: EXAM_DISCLAIMER,
    cefrMapping: [
      { cefr: 'A2', scoreRange: 'Band 3.0 – 3.5', description: 'Giao tiếp đơn giản trong tình huống quen thuộc, vốn từ cơ bản.' },
      { cefr: 'B1', scoreRange: 'Band 4.0 – 5.0', description: 'Hiểu được ý chính chủ đề phổ thông, viết đoạn đơn giản.' },
      { cefr: 'B2', scoreRange: 'Band 5.5 – 6.5', description: 'Ngưỡng chuẩn phổ biến cho đầu vào Đại học quốc tế & xét tốt nghiệp.' },
      { cefr: 'C1', scoreRange: 'Band 7.0 – 8.0', description: 'Sử dụng ngôn ngữ học thuật linh hoạt, lập luận sắc sảo & ít lỗi.' },
    ],
    sections: [
      {
        id: 'ielts-l',
        skill: 'Listening',
        partName: 'Listening (Parts 1 – 4)',
        duration: '30 phút nghe + chuyển đáp án',
        tasksOrQuestions: '40 câu hỏi (10 câu/Part)',
        strategies: [
          'Đọc trước câu hỏi trong 30 giây chờ để gạch chân từ khóa và dự đoán loại từ cần điền (số, ngày, danh từ số ít/nhiều, tên riêng).',
          'Part 1 & 2 chú ý thông tin đời sống, bản đồ (Map Labelling: xác định điểm xuất phát và các mốc cố định trước khi nghe).',
          'Part 3 & 4 chú ý tín hiệu chuyển ý như "actually", "on second thought", "however" để nhận diện ý chốt cuối cùng.',
        ],
        commonTraps: [
          'Bẫy tự sửa thông tin (Self-correction): người nói đưa ra một giờ/giá/địa điểm rồi lập tức đính chính lại.',
          'Bẫy đồng nghĩa (Distractors): từ khóa trong câu hỏi được đọc nguyên văn ở phương án nhiễu, còn đáp án đúng lại dùng Paraphrase.',
          'Mất điểm ngớ ngẩn vì sai số nhiều (-s/-es), sai chính tả hoặc viết vượt quá giới hạn từ (NO MORE THAN TWO WORDS AND/OR A NUMBER).',
        ],
      },
      {
        id: 'ielts-r',
        skill: 'Reading',
        partName: 'Reading (3 Passages)',
        duration: '60 phút (không có thời gian bù chuyển đáp án)',
        tasksOrQuestions: '40 câu hỏi (Academic 3 bài dài; General tăng dần độ khó)',
        strategies: [
          'Phân bổ thời gian thông minh: Passage 1 (~15p), Passage 2 (~20p), Passage 3 (~25p).',
          'Với True / False / Not Given: tách từng mệnh đề (Chủ ngữ – Động từ – Tân ngữ – Trạng từ mức độ) để đối chiếu với bài đọc.',
          'Với Matching Headings: đọc câu chủ đề (topic sentence) và câu kết đoạn, tóm ý chính trước khi nhìn danh sách tiêu đề.',
        ],
        commonTraps: [
          'Nhầm lẫn giữa FALSE (thông tin trong bài TRÁI NGƯỢC trực tiếp với câu hỏi) và NOT GIVEN (bài đọc KHÔNG ĐỀ CẬP hoặc không đủ dữ kiện kết luận).',
          'Bẫy từ định lượng tuyệt đối: "all", "always", "never", "only", "solely" làm thay đổi hoàn toàn nghĩa so với "some", "often", "mainly" trong bài.',
          'Dùng kiến thức nền bên ngoài để suy đoán thay vì bám 100% văn bản.',
        ],
      },
      {
        id: 'ielts-w1',
        skill: 'Writing',
        partName: 'Writing Task 1 (Report / Letter)',
        duration: '20 phút (chiếm 1/3 điểm Writing)',
        tasksOrQuestions: 'Tối thiểu 150 từ (Academic: biểu đồ/quy trình/bản đồ; General: thư)',
        strategies: [
          'Cấu trúc chuẩn 4 đoạn: Introduction (paraphrase đề) → Overview (2–3 xu hướng/điểm nổi bật nhất, KHÔNG đưa số liệu lẻ) → Body 1 → Body 2.',
          'Nhóm số liệu theo xu hướng tăng/giảm hoặc mức độ lớn/nhỏ để tạo tính so sánh liên tục thay vì liệt kê từng năm rời rạc.',
          'Đa dạng hóa cấu trúc mô tả số liệu: động từ + trạng từ, there was a + adj + noun, witnessed/experienced a surge.',
        ],
        commonTraps: [
          'Thiếu đoạn Overview rõ ràng khiến điểm Task Achievement bị khống chế tối đa Band 5.0.',
          'Đưa quan điểm cá nhân hoặc giải thích nguyên nhân ngoài biểu đồ ("maybe because the economy grew").',
          'Sai thì động từ khi biểu đồ có dữ liệu quá khứ kết hợp dự báo tương lai.',
        ],
      },
      {
        id: 'ielts-w2',
        skill: 'Writing',
        partName: 'Writing Task 2 (Academic Essay)',
        duration: '40 phút (chiếm 2/3 điểm Writing)',
        tasksOrQuestions: 'Tối thiểu 250 từ (Opinion, Discussion, Causes-Solutions, Two-part)',
        strategies: [
          'Dành 5 phút lập dàn ý trước khi viết: xác định lập trường rõ ràng ngay từ Mở bài (Thesis Statement).',
          'Mỗi đoạn Thân bài triển khai theo công thức PEEL: Point (luận điểm) → Explanation (giải thích tại sao) → Example (ví dụ cụ thể) → Link.',
          'Dùng từ nối mạch lạc tự nhiên (Consequently, In contrast, Admittedly) thay vì lạm dụng "Firstly, Secondly, Last but not least" máy móc.',
        ],
        commonTraps: [
          'Lạc đề hoặc trả lời lệch trọng tâm (ví dụ đề hỏi Discuss both views AND give your opinion nhưng quên nêu ý kiến cá nhân).',
          'Viết câu quá dài, nhồi nhét từ vựng hiếm không tự nhiên gây sai collocation và mất mạch lạc.',
          'Viết dưới 250 từ bị trừ điểm nặng tiêu chí Task Response.',
        ],
      },
      {
        id: 'ielts-s12',
        skill: 'Speaking',
        partName: 'Speaking Part 1 & Part 2 (Cue Card)',
        duration: '4–5 phút (Part 1) + 3–4 phút (Part 2)',
        tasksOrQuestions: 'Part 1: 8–12 câu hỏi quen thuộc • Part 2: 1p chuẩn bị + 2p độc thoại',
        strategies: [
          'Part 1: Trả lời trực tiếp trong 1 câu + mở rộng 1–2 câu (lý do, tần suất hoặc ví dụ ngắn) — tránh trả lời cộc lốc "Yes/No".',
          'Part 2: Tận dụng 1 phút ghi chú theo trục Thời gian / Cảm xúc / Chi tiết câu chuyện (Quá khứ → Trải nghiệm → Bài học) để nói đủ 1.5–2 phút.',
          'Luôn kiểm soát thì quá khứ khi kể lại trải nghiệm trong Cue Card.',
        ],
        commonTraps: [
          'Học thuộc lòng bài mẫu khiến ngữ điệu bị đều đều, thiếu cảm xúc và lạc hướng khi giám khảo đổi câu hỏi.',
          'Dừng nói quá sớm ở giây thứ 45 trong Part 2 hoặc nói quá nhanh làm nuốt âm cuối (-s, -ed).',
        ],
      },
      {
        id: 'ielts-s3',
        skill: 'Speaking',
        partName: 'Speaking Part 3 (Discussion)',
        duration: '4–5 phút',
        tasksOrQuestions: '4–6 câu hỏi thảo luận trừu tượng mở rộng từ chủ đề Part 2',
        strategies: [
          'Chuyển góc nhìn từ cá nhân ("I think...") sang xã hội/xu hướng ("Generally speaking, younger generations tend to...").',
          'Áp dụng cấu trúc A.R.E.A: Answer (Quan điểm) → Reason (Lý do) → Example (Ví dụ xã hội) → Alternative (Góc nhìn ngược lại/ngoại lệ).',
          'Dùng cụm câu câu giờ tự nhiên nếu gặp câu hỏi khó: "That’s an intriguing question; I suppose from an economic standpoint..."',
        ],
        commonTraps: [
          'Tiếp tục kể chuyện cá nhân dài dòng giống Part 1–2 thay vì phân tích vấn đề ở tầm xã hội.',
          'Trả lời quá ngắn (1 câu) khiến giám khảo không đánh giá được khả năng phát triển ý phức tạp.',
        ],
      },
    ],
    diagnosticQuestions: [
      {
        id: 'ielts-diag-1',
        skill: 'listening',
        partLabel: 'Listening Part 1',
        audioScript:
          'Receptionist: Good morning, Riverside Sports Club. How can I help? Caller: Hi, I would like to register for the evening swimming class on Tuesdays. Receptionist: Well, we used to run the beginner swimming group on Tuesdays at 6 PM, but starting this month we moved it to Thursdays at 6:30 PM because of pool maintenance. The monthly fee is 45 dollars, or 40 dollars if you bring a student ID.',
        question: 'When does the beginner evening swimming class take place now?',
        options: [
          'Tuesdays at 6:00 PM',
          'Thursdays at 6:00 PM',
          'Thursdays at 6:30 PM',
          'Tuesdays at 6:30 PM',
        ],
        correctIdx: 2,
        explanation:
          'Nhân viên lễ tân nhắc lớp từng học vào Thứ Ba 6:00 PM ("used to"), nhưng từ tháng này đã chuyển sang Thứ Năm lúc 6:30 PM ("moved it to Thursdays at 6:30 PM"). Đây là bẫy thay đổi lịch kinh điển của IELTS Listening Part 1.',
      },
      {
        id: 'ielts-diag-2',
        skill: 'listening',
        partLabel: 'Listening Part 3',
        audioScript:
          'Mia: Should we use a 50-question online survey for our urban transport research? Leo: That might take too long to analyze, and respondents often drop out halfway. What about short 10-minute interviews with commuters? Mia: Interviews give rich details, though we only have four days before the deadline. How about combining a brief 8-question digital poll with five focused interviews? Leo: That balances breadth and depth without overwhelming our schedule. Let us go with that.',
        question: 'What research method do the students finally agree to use?',
        options: [
          'A 50-question online survey only',
          'Only short 10-minute commuter interviews',
          'A short digital poll combined with five interviews',
          'Extending the project deadline by four days',
        ],
        correctIdx: 2,
        explanation:
          'Cả hai phương án ban đầu (khảo sát 50 câu và chỉ phỏng vấn) đều bị bác bỏ. Cuối cùng Mia đề xuất kết hợp "a brief 8-question digital poll with five focused interviews" và Leo đồng ý ("Let us go with that").',
      },
      {
        id: 'ielts-diag-3',
        skill: 'reading',
        partLabel: 'Reading (True / False / Not Given)',
        passage:
          'Vertical farming—growing crops in stacked indoor layers—uses up to 95 percent less water than conventional open-field agriculture because moisture is captured and recycled. However, high electricity bills for artificial LED lighting currently limit its profitability mostly to fast-growing leafy greens and herbs rather than staple grains like wheat or rice.',
        question: 'Statement: Vertical farms are currently more profitable for growing wheat than leafy greens.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctIdx: 1,
        explanation:
          'Đáp án là FALSE vì đoạn văn khẳng định chi phí điện cao khiến nông trại thẳng đứng hiện chỉ có lợi nhuận chủ yếu ở rau ăn lá và thảo mộc ("leafy greens and herbs"), chứ không phải ngũ cốc thiết yếu như lúa mì ("rather than staple grains like wheat").',
      },
      {
        id: 'ielts-diag-4',
        skill: 'reading',
        partLabel: 'Reading (True / False / Not Given)',
        passage:
          'A recent survey across twelve European universities noted that students who took handwritten notes during lectures recalled conceptual relationships better than peers who typed verbatim on laptops. The researchers suggested that summarizing ideas by hand forces deeper cognitive processing.',
        question: 'Statement: Most European universities plan to ban laptops from lecture halls next year.',
        options: ['TRUE', 'FALSE', 'NOT GIVEN'],
        correctIdx: 2,
        explanation:
          'Đáp án là NOT GIVEN. Đoạn văn chỉ nêu kết quả khảo sát về khả năng ghi nhớ khi viết tay so với đánh máy, hoàn toàn không đề cập việc các trường đại học có kế hoạch cấm laptop hay không.',
      },
      {
        id: 'ielts-diag-5',
        skill: 'reading',
        partLabel: 'Reading (Main Idea)',
        passage:
          'While urban bicycle-sharing schemes are often praised for cutting short car journeys, city planners stress that ridership depends heavily on protected lanes. Without physically separated bike paths, casual riders feel unsafe alongside heavy buses and quickly abandon the service.',
        question: 'What is the main factor that determines whether casual riders keep using bike-sharing schemes?',
        options: [
          'The rental price of bicycles',
          'Physically separated and safe bike lanes',
          'The restriction of heavy buses in city centers',
          'Weather conditions during winter months',
        ],
        correctIdx: 1,
        explanation:
          'Văn bản nhấn mạnh "ridership depends heavily on protected lanes" và thiếu "physically separated bike paths" khiến người đi xe cảm thấy mất an toàn và bỏ dịch vụ.',
      },
      {
        id: 'ielts-diag-6',
        skill: 'vocab',
        partLabel: 'Writing Task 2 Collocation',
        question: 'Choose the most natural academic verb to complete the sentence: "Expanding affordable public transit can help _____ traffic congestion in rapidly growing cities."',
        options: ['alleviate', 'abolish completely', 'exaggerate', 'shrink down'],
        correctIdx: 0,
        explanation:
          '"Alleviate traffic congestion" (giảm bớt ùn tắc giao thông) là collocation chuẩn học thuật Band 7.0+ trong IELTS Writing Task 2.',
      },
      {
        id: 'ielts-diag-7',
        skill: 'grammar',
        partLabel: 'Grammar Range (Band 7.0+)',
        question: 'Which sentence uses inversion correctly for formal emphasis in an essay?',
        options: [
          'Not only public investment creates jobs, it also improves infrastructure.',
          'Not only does public investment create jobs, but it also upgrades local infrastructure.',
          'Not only public investment does create jobs, but also infrastructure upgrades.',
          'Does not only public investment create jobs, it also improves infrastructure.',
        ],
        correctIdx: 1,
        explanation:
          'Khi đặt "Not only" ở đầu câu, mệnh đề thứ nhất bắt buộc phải đảo ngữ ("Not only + trợ động từ does + S + V nguyên mẫu...").',
      },
      {
        id: 'ielts-diag-8',
        skill: 'grammar',
        partLabel: 'Writing Task 1 Precision',
        question: 'Select the accurate Task 1 sentence: "From 2015 to 2022, solar power output rose from 20 GW to 60 GW."',
        options: [
          'Solar power output was increased by 60 GW between 2015 and 2022.',
          'Solar power output tripled, reaching 60 GW by 2022.',
          'Solar power output rose to 40 GW from 2015 to 2022.',
          'Solar power output had a dramatically increase to 60 GW.',
        ],
        correctIdx: 1,
        explanation:
          'Từ 20 GW lên 60 GW tức là tăng gấp 3 lần ("tripled") và đạt mức 60 GW ("reaching 60 GW"). Câu A sai vì "by 60 GW" nghĩa là tăng thêm 60 (thành 80), câu D sai ngữ pháp ("dramatically" là trạng từ không đứng trước danh từ "increase").',
      },
    ],
    skillPractice: {
      reading: [
        {
          id: 'ielts-read-1',
          partLabel: 'Academic Reading — Passage 1',
          title: 'Micro-Forests in Dense Megacities',
          level: 'B2',
          passage:
            'Over the past decade, urban ecologists have increasingly championed "micro-forests"—compact woodland plots no larger than a tennis court, planted tightly with native tree species. Unlike conventional city parks that rely on manicured lawns and widely spaced ornamental trees, micro-forests mimic natural ecological succession. By placing three to five saplings per square meter, young trees compete gently for sunlight, accelerating vertical growth while shading out invasive weeds.\n\nProponents argue that these miniature ecosystems deliver measurable cooling benefits during heatwaves, lowering surrounding pavement temperatures by up to two degrees Celsius. Critics, however, caution that micro-forests are not a substitute for large regional watersheds or wildlife corridors. Furthermore, because soil preparation and dense planting require intensive manual labor during the first two years, initial establishment costs per square meter often exceed those of traditional turf parks, even though long-term maintenance drops sharply once the canopy closes.',
          viSummary:
            'Đoạn văn phân tích mô hình "rừng siêu nhỏ" (micro-forests) trong đô thị lớn: trồng dày các loài cây bản địa trên diện tích nhỏ giúp cây vươn cao nhanh, giảm nhiệt vỉa hè tới 2°C. Tuy nhiên giới chuyên môn lưu ý mô hình này không thay thế được hành lang sinh thái lớn và chi phí ban đầu cao trong 2 năm đầu.',
          questions: [
            {
              id: 'ielts-r1-q1',
              questionType: 'True / False / Not Given',
              question: 'Micro-forests require less financial investment during their very first year than conventional grass parks.',
              options: ['TRUE', 'FALSE', 'NOT GIVEN'],
              correctIdx: 1,
              explanation:
                'FALSE. Đoạn 2 nêu rõ: "initial establishment costs per square meter often exceed those of traditional turf parks" (chi phí thiết lập ban đầu thường cao hơn công viên thảm cỏ truyền thống).',
            },
            {
              id: 'ielts-r1-q2',
              questionType: 'Detail',
              question: 'Why are saplings planted very closely together in a micro-forest?',
              options: [
                'To make mowing grass easier for park workers',
                'To encourage upward growth and naturally block invasive weeds',
                'To replace large regional wildlife corridors completely',
                'To reduce the variety of native species needed',
              ],
              correctIdx: 1,
              explanation:
                'Đoạn 1 giải thích: trồng 3–5 cây/m² khiến cây non cạnh tranh ánh sáng nhẹ nhàng, thúc đẩy mọc thẳng ("accelerating vertical growth") và che bóng làm cỏ dại không mọc được ("shading out invasive weeds").',
            },
            {
              id: 'ielts-r1-q3',
              questionType: 'True / False / Not Given',
              question: 'Tokyo has built more micro-forests than any other megacity in Asia.',
              options: ['TRUE', 'FALSE', 'NOT GIVEN'],
              correctIdx: 2,
              explanation:
                'NOT GIVEN. Bài đọc không hề nhắc đến Tokyo hay so sánh số lượng micro-forests giữa các thành phố châu Á.',
            },
          ],
        },
        {
          id: 'ielts-read-2',
          partLabel: 'Academic Reading — Passage 2',
          title: 'The Economics of Attention & Digital Minimalism',
          level: 'C1',
          passage:
            'In modern knowledge economies, human attention has evolved from a private cognitive resource into a fiercely contested marketplace. Software platforms routinely deploy variable reward schedules—unpredictable notifications and endlessly refreshing feeds—to prolong user engagement. Yet a growing body of organizational research indicates that fragmented attention carries steep hidden costs: employees who check messaging apps every few minutes require substantially longer recovery intervals before regaining deep analytical focus.\n\nIn response, several forward-thinking technology firms have experimented with "asynchronous core hours," blocking off uninterrupted morning periods free from internal chat expectations. Early internal audits reveal a paradox: reducing real-time responsiveness did not delay client deliveries; instead, error rates declined because staff completed complex coding and drafting tasks in single, sustained sessions.',
          viSummary:
            'Kinh tế chú ý khiến sự tập trung bị phân mảnh bởi thông báo liên tục, làm tăng thời gian hồi phục tư duy sâu. Một số công ty thử nghiệm "khung giờ làm việc bất đồng bộ" không chat nội bộ vào buổi sáng và ghi nhận tỷ lệ lỗi giảm đáng kể mà tiến độ giao hàng không bị chậm.',
          questions: [
            {
              id: 'ielts-r2-q1',
              questionType: 'Inference',
              question: 'What did the internal audits of "asynchronous core hours" demonstrate?',
              options: [
                'Clients became dissatisfied with slower instant chat replies.',
                'Workers produced more accurate output without delaying project deadlines.',
                'Employees spent more total hours checking notifications at night.',
                'Software platforms stopped using variable reward notifications.',
              ],
              correctIdx: 1,
              explanation:
                'Đoạn 2 chỉ rõ nghịch lý: giảm phản hồi tức thì không làm trễ giao hàng cho khách ("did not delay client deliveries"), trái lại tỷ lệ lỗi giảm xuống ("error rates declined") nhờ làm việc tập trung liên tục.',
            },
            {
              id: 'ielts-r2-q2',
              questionType: 'Vocabulary in Context',
              question: 'In paragraph 1, the word "contested" is closest in meaning to:',
              options: ['ignored', 'competed over', 'regulated', 'simplified'],
              correctIdx: 1,
              explanation:
                '"Fiercely contested marketplace" mang nghĩa một thị trường bị cạnh tranh khốc liệt ("competed over") bởi các nền tảng nhằm giành sự chú ý của người dùng.',
            },
            {
              id: 'ielts-r2-q3',
              questionType: 'Writer’s Claim',
              question: 'Why do frequent message checks reduce workplace efficiency according to paragraph 1?',
              options: [
                'Messaging software consumes too much computer memory.',
                'Workers need significant time to rebuild deep concentration afterward.',
                'Managers forbid employees from writing long emails.',
                'Variable rewards cause software crashes.',
              ],
              correctIdx: 1,
              explanation:
                'Bài đọc nêu: nhân viên kiểm tra tin nhắn mỗi vài phút "require substantially longer recovery intervals before regaining deep analytical focus" (cần khoảng thời gian phục hồi lâu hơn để lấy lại sự tập trung phân tích sâu).',
            },
          ],
        },
      ],
      listening: [
        {
          id: 'ielts-listen-1',
          partLabel: 'Listening Part 1 Simulation',
          title: 'Booking an Eco-Tour Bike Rental',
          level: 'B1',
          speakerContext: 'Hội thoại giữa khách hàng (Emma) và nhân viên cho thuê xe đạp du lịch (Mark).',
          audioScript:
            'Mark: Good afternoon, GreenWheel Rentals, Mark speaking. How can I assist you? Emma: Hi Mark, I would like to reserve two electric bicycles for Saturday morning. Mark: Sure. For Saturday, our standard city bike is 18 dollars per day, while the electric model is 32 dollars. Wait—let me check our weekend promotion. Actually, because Saturday is part of our Earth Week campaign, the electric model drops from 32 to 26 dollars per bike, including helmets and a lock. Emma: That sounds great! Should we pick them up at the Central Station kiosk? Mark: Our Central Station kiosk is being repainted this weekend, so please collect them at the Harbour Gate office instead, right next to the ferry terminal. Also, please bring a physical photo ID—we cannot accept digital copies on your phone for the deposit.',
          viSummary:
            'Emma đặt thuê 2 xe đạp điện vào sáng thứ Bảy. Giá gốc xe điện là 32 USD nhưng dịp Earth Week giảm còn 26 USD/xe. Điểm nhận xe đổi từ Central Station sang Harbour Gate (cạnh bến phà) và khách phải mang theo giấy tờ tùy thân bản cứng.',
          questions: [
            {
              id: 'ielts-l1-q1',
              question: 'How much will Emma pay per electric bike on Saturday?',
              options: ['$18', '$26', '$32'],
              correctIdx: 1,
              explanation:
                'Giá niêm yết $32 được giảm xuống $26 ("drops from 32 to 26 dollars per bike") nhờ chương trình Earth Week. $18 là giá xe đạp thường.',
            },
            {
              id: 'ielts-l1-q2',
              question: 'Where must Emma collect the bicycles?',
              options: [
                'At the Central Station kiosk',
                'At the Harbour Gate office',
                'Inside the ferry boat',
              ],
              correctIdx: 1,
              explanation:
                'Quầy Central Station đang sơn sửa nên khách phải đến văn phòng Harbour Gate ("please collect them at the Harbour Gate office instead").',
            },
            {
              id: 'ielts-l1-q3',
              question: 'What is required when picking up the bikes?',
              options: [
                'A digital ID photo on a smartphone',
                'Buying a helmet separately',
                'A physical photo identification card',
              ],
              correctIdx: 2,
              explanation:
                'Mark nhấn mạnh: "please bring a physical photo ID—we cannot accept digital copies on your phone".',
            },
          ],
        },
        {
          id: 'ielts-listen-2',
          partLabel: 'Listening Part 3 Simulation',
          title: 'Designing a Campus Recycling Campaign',
          level: 'B2',
          speakerContext: 'Hai sinh viên (Noah và Linh) trao đổi với nhau về đồ án truyền thông tái chế trong trường.',
          audioScript:
            'Linh: Noah, Dr. Patel reviewed our recycling campaign proposal yesterday. She liked our colorful posters, but she pointed out that students rarely stop to read long bullet lists near dining hall bins. Noah: That makes sense. When people carry food trays, they decide which bin to use in less than two seconds. Should we replace text posters with visual icons showing actual coffee cups and food containers? Linh: Yes! And I thought we could also place a transparent sample bin next to the recycling station so people immediately see what belongs inside. Noah: Wait, wouldn’t food waste smell bad in a clear display bin? Linh: Good point. Let us stick to laminated 3D photo boards above the bins instead, and measure contamination rates for two weeks before presenting our final report.',
          viSummary:
            'Linh và Noah điều chỉnh chiến dịch tái chế theo góp ý của cô Patel: bỏ áp phích nhiều chữ vì sinh viên chỉ mất chưa đầy 2 giây chọn thùng rác. Họ loại bỏ ý tưởng thùng mẫu trong suốt vì sợ mùi đồ ăn và chốt dùng bảng ảnh 3D ép nhựa, đo lường trong 2 tuần.',
          questions: [
            {
              id: 'ielts-l2-q1',
              question: 'What criticism did Dr. Patel give about the students’ initial posters?',
              options: [
                'The colors were too dull to notice.',
                'The text lists were too long for busy students to read.',
                'They were placed too far from the library.',
              ],
              correctIdx: 1,
              explanation:
                'Linh nói cô Patel nhận xét sinh viên hiếm khi dừng lại đọc danh sách chữ dài gần thùng rác nhà ăn ("rarely stop to read long bullet lists").',
            },
            {
              id: 'ielts-l2-q2',
              question: 'Why did the students reject the idea of a transparent sample bin?',
              options: [
                'It would cost too much to manufacture.',
                'Trapped food residue could create unpleasant odors.',
                'University rules forbid plastic containers.',
              ],
              correctIdx: 1,
              explanation:
                'Noah cảnh báo rác thực phẩm có thể bốc mùi khó chịu trong thùng mẫu ("wouldn’t food waste smell bad"), và Linh đồng ý chuyển sang bảng ảnh 3D ép nhựa.',
            },
          ],
        },
      ],
      writing: [
        {
          id: 'ielts-w-task1',
          taskLabel: 'Writing Task 1 (Academic)',
          title: 'Renewable Electricity Share in Three Nations (2010 vs 2025)',
          recommendedMinutes: 20,
          wordCountRange: '150 – 190 từ',
          minWords: 140,
          prompt:
            'The bar chart data below compares the percentage of electricity generated from renewable sources in three countries (Country A, Country B, and Country C) in 2010 and 2025.\n• Country A: 2010 = 18%, 2025 = 46%\n• Country B: 2010 = 42%, 2025 = 58%\n• Country C: 2010 = 12%, 2025 = 24%\nSummarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
          promptVi:
            'Viết báo cáo học thuật mô tả số liệu tỷ trọng điện năng từ nguồn tái tạo tại 3 quốc gia (A, B, C) giữa năm 2010 và 2025. Cần nêu tổng quan xu hướng nổi bật và so sánh có chọn lọc.',
          outline: [
            'Introduction (1–2 câu): Paraphrase đề bài — biểu đồ so sánh tỷ lệ điện tái tạo tại 3 nước A, B, C vào năm 2010 và 2025.',
            'Overview (2–3 câu): Cả 3 nước đều tăng tỷ trọng; Country B dẫn đầu ở cả hai mốc, nhưng Country A có bước nhảy vọt mạnh nhất.',
            'Body 1 (Country B & A): Trình bày Country B tăng từ 42% lên 58% (vượt mốc quá nửa); Country A tăng hơn gấp đôi từ 18% lên 46%.',
            'Body 2 (Country C & so sánh): Country C vẫn thấp nhất dù tăng gấp đôi từ 12% lên 24%, cho thấy khoảng cách đáng kể so với B.',
          ],
          scoringCriteriaFocus: [
            'Task Achievement: Phải có đoạn Overview tách biệt, nêu đúng số liệu và không suy diễn nguyên nhân ngoài dữ liệu.',
            'Coherence & Cohesion: Nhóm thông tin logic theo thứ hạng hoặc tốc độ tăng trưởng.',
            'Lexical Resource: Dùng động từ tăng/so sánh chính xác ("accounted for", "surpassed", "doubled", "lagged behind").',
          ],
          highBandKeywords: [
            { phrase: 'accounted for', meaningVi: 'chiếm tỷ trọng (bao nhiêu %)', usageTip: 'Renewable energy accounted for 42% of total output.' },
            { phrase: 'experienced a dramatic surge', meaningVi: 'trải qua một đợt tăng mạnh', usageTip: 'Country A experienced a dramatic surge from 18% to 46%.' },
            { phrase: 'remained the frontrunner', meaningVi: 'vẫn giữ vị trí dẫn đầu' },
            { phrase: 'more than doubled', meaningVi: 'tăng hơn gấp đôi' },
            { phrase: 'lagged considerably behind', meaningVi: 'tụt lại khá xa phía sau' },
            { phrase: 'respectively', meaningVi: 'tương ứng theo thứ tự' },
          ],
          modelAnswer:
            'The chart illustrates the proportion of electricity produced from renewable sources across three nations—Country A, Country B, and Country C—in 2010 and 2025.\n\nOverall, all three countries witnessed upward trends in clean power adoption over the fifteen-year period. Notably, Country B remained the frontrunner at both points in time, whereas Country A recorded the steepest growth.\n\nLooking closely at the leading producers, renewable energy in Country B accounted for 42% of total electricity generation in 2010 and climbed steadily to 58% by 2025, crossing the halfway mark. Country A started much lower at just 18% in 2010; however, it experienced a dramatic surge of 28 percentage points, more than doubling to reach 46% in 2025.\n\nIn contrast, Country C lagged considerably behind its counterparts throughout the timeframe. Although its clean energy share doubled from 12% to 24%, the 2025 figure still stood at less than half of Country B’s proportion.',
          modelNotesVi:
            'Bài mẫu dài ~165 từ, có Overview tách rõ không nhồi số liệu, dùng chính xác "percentage points" (điểm phần trăm) khi tính hiệu số (46% - 18% = 28 điểm phần trăm) — chi tiết giúp ghi điểm Band 7.5+.',
        },
        {
          id: 'ielts-w-task2',
          taskLabel: 'Writing Task 2 (Essay)',
          title: 'Remote Work: Productivity Freedom vs Workplace Isolation',
          recommendedMinutes: 40,
          wordCountRange: '250 – 300 từ',
          minWords: 230,
          prompt:
            'Many companies now allow employees to work remotely from home rather than commuting to a central office every day. Do the advantages of this trend outweigh the disadvantages? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.',
          promptVi:
            'Nhiều doanh nghiệp cho phép nhân viên làm việc từ xa thay vì đến văn phòng mỗi ngày. Lợi ích của xu hướng này có vượt trội hơn bất lợi không?',
          outline: [
            'Introduction: Paraphrase hiện tượng làm việc từ xa + Thesis statement khẳng định lợi ích vượt trội nếu kết hợp quản lý phù hợp.',
            'Body 1 (Disadvantages - Nhượng bộ): Thừa nhận rủi ro cô lập xã hội, khó gắn kết đồng đội và ranh giới công việc – đời sống bị mờ nhạt.',
            'Body 2 (Advantages - Trọng tâm): Tiết kiệm hàng giờ di chuyển, giảm kiệt sức và phát thải giao thông; đồng thời doanh nghiệp tiếp cận nhân tài toàn cầu và giảm chi phí mặt bằng.',
            'Conclusion: Tóm lại hai vế và khẳng định lợi ích dài hạn vượt trội hơn thách thức (có thể gợi ý mô hình hybrid).',
          ],
          scoringCriteriaFocus: [
            'Task Response: Trả lời trực tiếp câu hỏi "outweigh" (bên nào nặng ký hơn) xuyên suốt bài.',
            'Coherence & Cohesion: Chuyển đoạn mượt bằng nhượng bộ ("Admittedly", "Nevertheless").',
            'Lexical & Grammar: Dùng mệnh đề quan hệ, câu điều kiện và collocation tự nhiên.',
          ],
          highBandKeywords: [
            { phrase: 'commuting fatigue', meaningVi: 'sự mệt mỏi vì đi lại hàng ngày' },
            { phrase: 'work-life boundaries', meaningVi: 'ranh giới giữa công việc và cuộc sống' },
            { phrase: 'team camaraderie', meaningVi: 'tình đồng đội gắn kết' },
            { phrase: 'geographical constraints', meaningVi: 'rào cản về khoảng cách địa lý' },
            { phrase: 'mitigate social isolation', meaningVi: 'giảm thiểu sự cô lập xã hội' },
            { phrase: 'outweigh the drawbacks', meaningVi: 'vượt trội hơn các mặt hạn chế' },
          ],
          modelAnswer:
            'In recent years, remote work has transitioned from an emergency measure into a mainstream corporate policy. While working from home presents genuine interpersonal challenges, I firmly believe that its economic and personal advantages substantially outweigh the drawbacks.\n\nAdmittedly, reducing face-to-face contact can erode team camaraderie and leave new employees feeling disconnected. Without casual corridor conversations, spontaneous mentorship becomes harder to cultivate. Furthermore, when a bedroom doubles as an office, work-life boundaries often blur, tempting staff to answer emails late at night and risking burnout.\n\nNevertheless, these limitations can be mitigated through structured check-ins and outweigh neither the time savings nor the productivity gains of flexible work. Eliminating daily commuting fatigue frees up hours each week for exercise, family care, and continuous learning, while simultaneously reducing urban traffic emissions. For organizations, dropping rigid geographical constraints enables managers to recruit specialized talent across regions and lower overhead expenses on sprawling office spaces. For instance, many software firms adopting hybrid schedules report higher staff retention alongside steady project delivery.\n\nIn conclusion, although remote work demands deliberate communication habits to counter isolation, the substantial benefits for employee well-being, environmental sustainability, and corporate agility clearly tip the balance in its favor.',
          modelNotesVi:
            'Bài viết cấu trúc 4 đoạn chuẩn, giải quyết trực tiếp câu hỏi "outweigh", từ vựng chính xác và tự nhiên ("erode team camaraderie", "blur work-life boundaries", "tip the balance").',
        },
      ],
      speaking: [
        {
          id: 'ielts-s-p1',
          partLabel: 'Speaking Part 1',
          title: 'Daily Routines & Concentration',
          prepTimeText: 'Trả lời ngay',
          speakTimeText: '20 – 30 giây / câu',
          prompt:
            '1. What part of the day do you feel most productive?\n2. How do you usually organize your daily tasks?\n3. Has your daily routine changed much compared to two years ago?',
          promptVi:
            'Trả lời tự nhiên 2–3 câu cho mỗi câu hỏi: nêu ý chính + lý do + một chi tiết thực tế.',
          sampleAnswer:
            'I am definitely a morning person, so my focus peaks between seven and eleven a.m. before emails and meetings start piling up. To keep my day structured, I jot down three priority tasks on a sticky note the night before rather than relying on a messy to-do list. Compared to two years ago, my schedule has become far more disciplined because I now set aside thirty minutes every evening strictly for English practice and reading.',
          highScoreVocab: [
            { phrase: 'morning person', meaningVi: 'người làm việc hiệu quả vào buổi sáng' },
            { phrase: 'focus peaks', meaningVi: 'sự tập trung đạt đỉnh' },
            { phrase: 'jot down priority tasks', meaningVi: 'ghi nhanh các việc ưu tiên' },
            { phrase: 'set aside time for', meaningVi: 'dành riêng thời gian cho' },
          ],
          deliveryTips: [
            'Nhấn trọng âm vào các từ mang nghĩa ("definitely", "peaks", "structured", "disciplined").',
            'Không dừng sau câu đầu tiên; hãy mở rộng bằng "because" hoặc so sánh quá khứ - hiện tại.',
          ],
        },
        {
          id: 'ielts-s-p2',
          partLabel: 'Speaking Part 2 (Cue Card)',
          title: 'A Useful Practical Skill You Learned Outside School',
          prepTimeText: '1 phút chuẩn bị',
          speakTimeText: '1.5 – 2 phút nói liên tục',
          prompt: 'Describe a practical skill you learned outside school or university that proved useful.',
          cuePoints: [
            'What the skill is',
            'When and how you learned it',
            'What difficulties you faced at first',
            'And explain why it has been valuable to you',
          ],
          promptVi: 'Dựa vào 4 gợi ý Cue Card, kể một câu chuyện mạch lạc với thì quá khứ và hiện tại hoàn thành.',
          sampleAnswer:
            'A practical skill that has proved surprisingly valuable in my life is touch-typing without looking at the keyboard. I picked it up about three years ago during a busy summer internship when I noticed how slowly I was drafting emails compared to my colleagues. Instead of enrolling in a formal class, I spent fifteen minutes every night using a free online typing trainer that gradually hid the letters on screen. At the beginning, it was genuinely frustrating—my typing speed actually dropped by half, and my fingers felt clumsy whenever I reached for punctuation marks. However, after roughly three weeks of consistent drills, muscle memory finally kicked in. Today, being able to type smoothly lets me capture ideas during live meetings without breaking eye contact, and it saves me considerable time whenever I write reports or essays under tight deadlines.',
          highScoreVocab: [
            { phrase: 'picked it up', meaningVi: 'học được một cách tự nhiên/tự mày mò' },
            { phrase: 'genuinely frustrating', meaningVi: 'thực sự gây nản lòng' },
            { phrase: 'muscle memory kicked in', meaningVi: 'phản xạ cơ bắp bắt đầu hình thành' },
            { phrase: 'under tight deadlines', meaningVi: 'dưới áp lực thời hạn gấp' },
          ],
          deliveryTips: [
            'Dùng cụm chuyển tiếp mạch lạc: "At the beginning...", "However, after roughly three weeks...", "Today...".',
            'Kể 1 chi tiết khó khăn cụ thể ("my typing speed dropped by half") để bài nói chân thực như người bản xứ.',
          ],
        },
        {
          id: 'ielts-s-p3',
          partLabel: 'Speaking Part 3 (Discussion)',
          title: 'Lifelong Learning & Workplace Adaptation',
          prepTimeText: 'Trả lời ngay',
          speakTimeText: '40 – 60 giây',
          prompt:
            'Why do some adults find it harder to acquire new skills compared to younger learners, and how can employers encourage continuous learning?',
          promptVi:
            'Phân tích ở góc độ xã hội: nêu nguyên nhân (áp lực thời gian, sợ sai) và giải pháp từ phía doanh nghiệp.',
          sampleAnswer:
            'I think the main barrier for adults is rarely cognitive decline; rather, it is a combination of time scarcity and fear of looking inexperienced. Working adults juggle family duties alongside full-time jobs, leaving little mental energy for deliberate practice, and many feel self-conscious about making beginner mistakes in front of peers. To counter this, forward-looking employers can subsidize short micro-courses and, more importantly, normalize a learning culture by allocating a couple of paid hours each month specifically for skill development.',
          highScoreVocab: [
            { phrase: 'time scarcity', meaningVi: 'sự thiếu hụt thời gian' },
            { phrase: 'self-conscious about', meaningVi: 'e ngại / tự ti về' },
            { phrase: 'subsidize micro-courses', meaningVi: 'trợ cấp các khóa học ngắn' },
            { phrase: 'normalize a learning culture', meaningVi: 'bình thường hóa văn hóa học hỏi' },
          ],
          deliveryTips: [
            'Mở đầu bằng nhận định sắc bén ("rarely...; rather, it is...") để thể hiện tư duy phản biện.',
            'Giữ tốc độ vừa phải, ngắt nghỉ đúng cụm chủ-vị để tránh ậm ừ "uhm/ah".',
          ],
        },
      ],
    },
    mockTest: {
      title: 'IELTS Mini Mock Test (Listening & Reading — 12 Câu)',
      description: 'Mô phỏng kết hợp Listening Parts 1–4 & Academic Reading (T/F/NG, Detail, Vocab, Inference) có đồng hồ bấm giờ.',
      durationMinutes: 16,
      questions: [
        {
          id: 'ielts-mock-1',
          skill: 'listening',
          partLabel: 'Listening Part 1',
          audioScript:
            'Agent: Welcome to Oakridge Community Center. Are you signing up for the weekend ceramics workshop? Visitor: Yes, my name is Claire Donovan. Agent: Could you spell your surname for me? Visitor: Sure, it is D-O-N-O-V-A-N. And do I pay the 35-dollar material fee today? Agent: You can pay 35 dollars on the first day of class, or 30 dollars if you pay online before Friday.',
          question: 'How much does the material fee cost if Claire pays online before Friday?',
          options: ['$25', '$30', '$35', '$40'],
          correctIdx: 1,
          explanation: 'Nhân viên nói rõ: trả tại lớp ngày đầu là $35, nhưng nếu thanh toán online trước thứ Sáu chỉ còn $30.',
        },
        {
          id: 'ielts-mock-2',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Tour Update)',
          audioScript:
            'Guide: Before we enter the Botanical Conservatory, please note one change to today’s route. The Orchid Pavilion on the east side is closed until 2 PM for irrigation repairs. Instead of starting there, we will walk straight through the Bamboo Courtyard to the Cactus Dome, and visit the Orchid Pavilion last.',
          question: 'Where will the tour group go FIRST today?',
          options: [
            'The Orchid Pavilion',
            'The East Irrigation Room',
            'The Cactus Dome via Bamboo Courtyard',
            'The Botanical Café',
          ],
          correctIdx: 2,
          explanation: 'Orchid Pavilion bị đóng đến 2 giờ chiều nên đoàn sẽ đi thẳng qua Bamboo Courtyard tới Cactus Dome trước, rồi mới ghé Orchid Pavilion sau cùng.',
        },
        {
          id: 'ielts-mock-3',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Discussion)',
          audioScript:
            'Student A: Our presentation on coastal erosion has twelve slides, which feels fine for ten minutes. Student B: Twelve slides is okay, though slide four has an enormous data table that nobody at the back can read. Let us turn that table into a simple line graph and trim two background slides so we have room for Q&A.',
          question: 'What problem does Student B identify on slide four?',
          options: [
            'The color contrast is too bright.',
            'The data table is too large and hard to read from afar.',
            'It contains outdated statistics.',
            'There are too many questions on it.',
          ],
          correctIdx: 1,
          explanation: 'Student B nhận xét slide 4 có "an enormous data table that nobody at the back can read" và đề xuất chuyển thành biểu đồ đường.',
        },
        {
          id: 'ielts-mock-4',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Lecture)',
          audioScript:
            'Lecturer: Today we examine why deep-sea hydrothermal vents support thriving ecosystems without sunlight. Unlike surface food webs powered by photosynthesis, vent bacteria perform chemosynthesis—converting toxic hydrogen sulfide from volcanic fissures into usable chemical energy, which sustains giant tube worms and blind shrimp.',
          question: 'How do bacteria near hydrothermal vents generate energy?',
          options: [
            'Through sunlight filtering down from the ocean surface',
            'By consuming giant tube worms',
            'By converting hydrogen sulfide chemically',
            'By absorbing cold Arctic currents',
          ],
          correctIdx: 2,
          explanation: 'Bài giảng nêu vi khuẩn thực hiện hóa tổng hợp (chemosynthesis): chuyển hóa khí hydrogen sulfide thành năng lượng hóa học.',
        },
        {
          id: 'ielts-mock-5',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Lecture Detail)',
          audioScript:
            'Lecturer: Interestingly, scientists originally assumed the extreme heat and pressure near volcanic ocean vents would sterilize the surrounding seabed. The 1977 discovery of dense animal colonies forced biologists to revise textbook definitions of where life can exist—not only on Earth, but potentially beneath icy moons elsewhere in the solar system.',
          question: 'Why was the 1977 discovery considered scientifically significant?',
          options: [
            'It proved ocean temperatures were dropping rapidly.',
            'It overturned the assumption that extreme vents could not support life.',
            'It showed that icy moons already contain fish colonies.',
            'It helped fishermen locate deeper waters.',
          ],
          correctIdx: 1,
          explanation: 'Trước 1977, giới khoa học giả định nhiệt và áp suất cực đoan khiến vùng này vô trùng ("sterilize"), nên phát hiện này buộc họ viết lại định nghĩa về môi trường sự sống.',
        },
        {
          id: 'ielts-mock-6',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q6–Q9)',
          passage:
            'For centuries, architects in arid Middle Eastern cities engineered passive cooling long before mechanical air conditioning existed. Traditional windcatchers—tall rooftop towers oriented toward prevailing breezes—funnel cooler upper-level air downward into living quarters while allowing warm indoor air to escape through high courtyard vents. Thick mud-brick walls further stabilize indoor temperatures by absorbing daytime solar heat slowly and releasing it only after sunset.',
          question: 'TRUE / FALSE / NOT GIVEN: Windcatchers require small electric fans inside rooftop towers to push air downward.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctIdx: 1,
          explanation: 'FALSE. Đoạn văn nói kiến trúc sư thiết kế "passive cooling long before mechanical air conditioning existed" — hệ thống hoạt động tự nhiên theo hướng gió, không cần quạt điện.',
        },
        {
          id: 'ielts-mock-7',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q6–Q9)',
          passage:
            'For centuries, architects in arid Middle Eastern cities engineered passive cooling long before mechanical air conditioning existed. Traditional windcatchers—tall rooftop towers oriented toward prevailing breezes—funnel cooler upper-level air downward into living quarters while allowing warm indoor air to escape through high courtyard vents. Thick mud-brick walls further stabilize indoor temperatures by absorbing daytime solar heat slowly and releasing it only after sunset.',
          question: 'How do thick mud-brick walls help regulate indoor comfort?',
          options: [
            'They reflect 100% of sunlight immediately back into the sky.',
            'They absorb heat gradually during the day and release it at night.',
            'They block prevailing breezes from entering courtyards.',
            'They generate moisture inside living rooms.',
          ],
          correctIdx: 1,
          explanation: 'Tường gạch bùn dày hấp thụ nhiệt mặt trời chậm rãi ban ngày và chỉ giải phóng sau khi mặt trời lặn ("only after sunset").',
        },
        {
          id: 'ielts-mock-8',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q6–Q9)',
          passage:
            'For centuries, architects in arid Middle Eastern cities engineered passive cooling long before mechanical air conditioning existed. Traditional windcatchers—tall rooftop towers oriented toward prevailing breezes—funnel cooler upper-level air downward into living quarters while allowing warm indoor air to escape through high courtyard vents. Thick mud-brick walls further stabilize indoor temperatures by absorbing daytime solar heat slowly and releasing it only after sunset.',
          question: 'TRUE / FALSE / NOT GIVEN: Modern skyscraper builders in Europe now use mud-brick walls in every apartment block.',
          options: ['TRUE', 'FALSE', 'NOT GIVEN'],
          correctIdx: 2,
          explanation: 'NOT GIVEN. Văn bản không nhắc đến các tòa nhà chọc trời hiện đại ở châu Âu.',
        },
        {
          id: 'ielts-mock-9',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q9–Q12)',
          passage:
            'Public libraries have undergone a quiet transformation in the twenty-first century. While book lending remains central, many branches now operate as civic hubs offering tool-lending libraries, free digital literacy workshops, and quiet co-working desks. Critics occasionally question whether non-book services dilute a library’s scholarly mission, yet municipal surveys show that multi-purpose branches attract nearly twice as many first-time young visitors—many of whom subsequently borrow printed books as well.',
          question: 'What does the word "dilute" most nearly mean in the passage?',
          options: ['strengthen', 'weaken or reduce the focus of', 'modernize rapidly', 'document carefully'],
          correctIdx: 1,
          explanation: '"Dilute a library’s scholarly mission" nghĩa là làm loãng / làm suy giảm trọng tâm học thuật của thư viện.',
        },
        {
          id: 'ielts-mock-10',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q9–Q12)',
          passage:
            'Public libraries have undergone a quiet transformation in the twenty-first century. While book lending remains central, many branches now operate as civic hubs offering tool-lending libraries, free digital literacy workshops, and quiet co-working desks. Critics occasionally question whether non-book services dilute a library’s scholarly mission, yet municipal surveys show that multi-purpose branches attract nearly twice as many first-time young visitors—many of whom subsequently borrow printed books as well.',
          question: 'How do municipal surveys counter the critics’ concern?',
          options: [
            'By showing that tool lending produces high profits',
            'By proving young visitors drawn by new services often end up borrowing books too',
            'By recommending libraries stop buying printed novels',
            'By demonstrating that co-working desks are always empty',
          ],
          correctIdx: 1,
          explanation: 'Khảo sát cho thấy các chi nhánh đa chức năng thu hút gần gấp đôi bạn trẻ lần đầu đến, và nhiều người sau đó cũng mượn sách giấy ("subsequently borrow printed books as well").',
        },
        {
          id: 'ielts-mock-11',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q9–Q12)',
          passage:
            'Public libraries have undergone a quiet transformation in the twenty-first century. While book lending remains central, many branches now operate as civic hubs offering tool-lending libraries, free digital literacy workshops, and quiet co-working desks. Critics occasionally question whether non-book services dilute a library’s scholarly mission, yet municipal surveys show that multi-purpose branches attract nearly twice as many first-time young visitors—many of whom subsequently borrow printed books as well.',
          question: 'Which statement best summarizes the main idea of the passage?',
          options: [
            'Printed books are disappearing from modern public libraries.',
            'Adding community services has broadened libraries’ appeal without harming book lending.',
            'Critics have successfully closed digital workshops in city branches.',
            'Public libraries should charge fees for co-working desks.',
          ],
          correctIdx: 1,
          explanation: 'Đoạn văn chỉ ra thư viện mở rộng sang dịch vụ cộng đồng giúp thu hút thêm nhiều khách trẻ mà vẫn giữ vững việc mượn sách.',
        },
        {
          id: 'ielts-mock-12',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Vocab & Grammar Check)',
          passage:
            'Public libraries have undergone a quiet transformation in the twenty-first century. While book lending remains central, many branches now operate as civic hubs offering tool-lending libraries, free digital literacy workshops, and quiet co-working desks. Critics occasionally question whether non-book services dilute a library’s scholarly mission, yet municipal surveys show that multi-purpose branches attract nearly twice as many first-time young visitors—many of whom subsequently borrow printed books as well.',
          question: 'In the final clause ("many of whom subsequently borrow printed books"), what does "whom" refer to?',
          options: [
            'Critics',
            'Municipal surveys',
            'First-time young visitors',
            'Digital literacy workshops',
          ],
          correctIdx: 2,
          explanation: '"Whom" thay thế trực tiếp cho cụm danh từ đứng ngay trước dấu gạch ngang là "first-time young visitors".',
        },
      ],
    },
    rubricCriteria: [
      {
        id: 'ielts-rub-ta',
        appliesTo: 'writing',
        name: 'Task Achievement / Task Response',
        nameVi: 'Mức độ hoàn thành yêu cầu đề bài',
        weightText: '25% Writing',
        description: 'Đánh giá việc trả lời đầy đủ mọi phần của đề bài, quan điểm rõ ràng, phát triển luận điểm có dẫn chứng (Task 2) hoặc có Overview chính xác (Task 1).',
        highScoreBenchmarks: ['Đạt tối thiểu 150 từ (Task 1) / 250 từ (Task 2)', 'Có lập trường nhất quán & không bỏ sót vế nào của đề'],
      },
      {
        id: 'ielts-rub-cc',
        appliesTo: 'writing',
        name: 'Coherence & Cohesion',
        nameVi: 'Tính mạch lạc & Liên kết đoạn',
        weightText: '25% Writing',
        description: 'Mỗi đoạn thân bài tập trung 1 ý chính rõ ràng, sử dụng từ nối và phép quy chiếu (this, such trends, consequently) tự nhiên.',
        highScoreBenchmarks: ['Chia đoạn logic (4–5 đoạn)', 'Tránh lạm dụng máy móc "Firstly / Secondly" đầu mọi câu'],
      },
      {
        id: 'ielts-rub-lr',
        appliesTo: 'both',
        name: 'Lexical Resource',
        nameVi: 'Vốn từ vựng & Độ chính xác Collocation',
        weightText: '25% W & S',
        description: 'Khả năng paraphrase linh hoạt, sử dụng collocation học thuật chuẩn xác thay vì lặp từ đơn giản.',
        highScoreBenchmarks: ['Dùng đúng ngữ cảnh (register) học thuật hoặc tự nhiên', 'Ít lỗi chính tả và ít lặp từ khóa đề bài'],
      },
      {
        id: 'ielts-rub-gra',
        appliesTo: 'both',
        name: 'Grammatical Range & Accuracy',
        nameVi: 'Độ đa dạng & Chính xác ngữ pháp',
        weightText: '25% W & S',
        description: 'Kết hợp nhuần nhuyễn câu đơn, câu ghép, câu phức (mệnh đề quan hệ, câu điều kiện, bị động, đảo ngữ) với tỷ lệ câu đúng cao.',
        highScoreBenchmarks: ['Kiểm soát tốt thì động từ, hòa hợp chủ-vị và mạo từ', 'Đa dạng cấu trúc câu mà vẫn dễ đọc'],
      },
      {
        id: 'ielts-rub-fc',
        appliesTo: 'speaking',
        name: 'Fluency & Coherence',
        nameVi: 'Độ trôi chảy & Mạch lạc khi nói',
        weightText: '25% Speaking',
        description: 'Nói liền mạch không ngập ngừng kéo dài để tìm từ, biết mở rộng ý và dùng từ nối tự nhiên.',
        highScoreBenchmarks: ['Phát triển ý theo chuỗi Lý do → Ví dụ', 'Dùng discourse markers tự nhiên ("Actually", "That said")'],
      },
      {
        id: 'ielts-rub-pr',
        appliesTo: 'speaking',
        name: 'Pronunciation',
        nameVi: 'Phát âm, Trọng âm & Ngữ điệu',
        weightText: '25% Speaking',
        description: 'Phát âm rõ các âm cuối, nhấn đúng trọng âm từ/câu và ngữ điệu lên xuống giúp người nghe dễ hiểu.',
        highScoreBenchmarks: ['Rõ âm cuối (-s, -ed, -t, -d)', 'Nhấn giọng vào từ khóa thông tin mới'],
      },
    ],
  },

  toeic: {
    examType: 'toeic',
    title: 'TOEIC (Listening & Reading + Speaking & Writing)',
    subtitle: 'Chứng chỉ tiếng Anh giao tiếp môi trường công sở & doanh nghiệp quốc tế.',
    badgeEmoji: '💼',
    totalDurationText: 'L&R: 120 phút (Listening 45p • Reading 75p) | S&W bổ sung: ~80 phút',
    scoreScale: 'L&R: 10 – 990 điểm | S&W: 0 – 400 điểm',
    disclaimerNote: EXAM_DISCLAIMER,
    cefrMapping: [
      { cefr: 'A2', scoreRange: '225 – 545 (L&R)', description: 'Hiểu giao tiếp cơ bản văn phòng, câu đơn giản & thông báo ngắn.' },
      { cefr: 'B1', scoreRange: '550 – 780 (L&R)', description: 'Chuẩn đầu ra phổ biến của nhiều trường Đại học và tuyển dụng nhân viên.' },
      { cefr: 'B2', scoreRange: '785 – 940 (L&R)', description: 'Đọc báo cáo, email, hội họp và trao đổi công việc quốc tế thành thạo.' },
      { cefr: 'C1', scoreRange: '945 – 990 (L&R)', description: 'Sử dụng tiếng Anh thương mại chuẩn xác gần như tuyệt đối.' },
    ],
    sections: [
      {
        id: 'toeic-p12',
        skill: 'Listening',
        partName: 'Listening Part 1 (Tranh) & Part 2 (Hỏi – Đáp)',
        duration: '~15 phút đầu bài Listening',
        tasksOrQuestions: 'Part 1: 6 câu • Part 2: 25 câu',
        strategies: [
          'Part 1: Quan sát nhanh danh từ (người, đồ vật, vị trí) và phân biệt trạng thái đang làm ("is being stacked") vs kết quả ("are stacked").',
          'Part 2: Bắt chặt 2 chữ đầu tiên (Who, Where, When, Why, How, Yes/No, Choice) — đáp án đúng thường trả lời gián tiếp ("Let me ask Sarah", "It’s still under review").',
        ],
        commonTraps: [
          'Bẫy lặp lại từ hoặc đồng âm (Homophones/Similar sounds): "copy" vs "coffee", "write" vs "right", hoặc lặp lại chính danh từ trong câu hỏi ở phương án nhiễu.',
          'Câu hỏi Yes/No nhưng đáp án đúng lại bắt đầu bằng thông tin thực tế chứ không có "Yes" hay "No".',
        ],
      },
      {
        id: 'toeic-p34',
        skill: 'Listening',
        partName: 'Listening Part 3 (Hội thoại) & Part 4 (Bài nói ngắn)',
        duration: '~30 phút',
        tasksOrQuestions: 'Part 3: 39 câu (13 đoạn) • Part 4: 30 câu (10 bài nói)',
        strategies: [
          'Đọc trước 3 câu hỏi của đoạn tiếp theo ngay khi băng đang đọc phần giới thiệu hoặc câu cuối đoạn trước.',
          'Chú ý câu hỏi ngụ ý ("What does the speaker mean when he says...") — nghe ngữ điệu và câu ngay trước/sau câu trích dẫn.',
          'Với câu hỏi bảng biểu/biểu đồ (Graphic questions): nhìn cột khác biệt (giá, ngày, mã phòng) để đối chiếu thông tin nghe được.',
        ],
        commonTraps: [
          'Đáp án nằm ở người nói kia (ví dụ câu hỏi hỏi người phụ nữ sẽ làm gì nhưng người đàn ông đề nghị làm giúp).',
          'Thông tin bảng biểu có 2 cột liên quan; phải ghép đúng tiêu chí nghe được với cột tương ứng.',
        ],
      },
      {
        id: 'toeic-p56',
        skill: 'Reading',
        partName: 'Reading Part 5 & Part 6 (Ngữ pháp & Điền đoạn)',
        duration: 'Mục tiêu hoàn thành trong 18–22 phút',
        tasksOrQuestions: 'Part 5: 30 câu • Part 6: 16 câu (4 đoạn)',
        strategies: [
          'Part 5: Nhìn 4 đáp án trước! Nếu là 4 biến thể cùng gốc từ (Word family) → xét vị trí từ loại quanh chỗ trống trong 10 giây, không cần dịch hết câu.',
          'Nếu 4 đáp án khác nghĩa hoàn toàn → đọc cả câu để chọn Collocation / Giới từ / Liên từ phù hợp ngữ cảnh.',
          'Part 6: Với câu điền cả 1 câu hoàn chỉnh vào đoạn văn, đọc kỹ câu ngay trước và câu ngay sau chỗ trống để giữ mạch logic.',
        ],
        commonTraps: [
          'Nhầm giữa tính từ đuôi -ed (chỉ cảm xúc/bị động) và -ing (tính chất chủ động), hoặc danh từ ghép ("safety inspection" vs "safe inspection").',
          'Nhầm giới từ chỉ thời gian ("during + danh từ" vs "while + mệnh đề", "despite + N" vs "although + S+V").',
        ],
      },
      {
        id: 'toeic-p7',
        skill: 'Reading',
        partName: 'Reading Part 7 (Đọc hiểu Đơn / Kép / Ba đoạn)',
        duration: '50–55 phút',
        tasksOrQuestions: '54 câu hỏi (Single, Double & Triple Passages)',
        strategies: [
          'Đọc tiêu đề & loại văn bản (Email, Invoice, Memo, Chat Thread) để nắm bối cảnh trong 5 giây.',
          'Với Double/Triple Passages, ít nhất 1–2 câu yêu cầu đối chiếu chéo dữ liệu giữa hai văn bản (ví dụ: ngày trong Email + mã đơn trong Hóa đơn).',
          'Làm câu hỏi cụ thể trước, để câu hỏi NOT/TRUE và câu hỏi chèn câu "[1][2][3][4]" làm sau khi đã nắm toàn bài.',
        ],
        commonTraps: [
          'Từ khóa trùng y hệt nhưng thuộc về người nhận hoặc mặt hàng khác trong hóa đơn.',
          'Đọc thiếu dòng ghi chú nhỏ ("Note:", "*Offer excludes...") ở cuối quảng cáo hoặc thông báo.',
        ],
      },
      {
        id: 'toeic-sw',
        skill: 'Speaking',
        partName: 'TOEIC Speaking & Writing (4 Kỹ Năng Toàn Diện)',
        duration: 'Speaking 20p (11 câu) • Writing 60p (8 câu)',
        tasksOrQuestions: 'Đọc to, Mô tả tranh, Trả lời thông tin, Viết câu, Trả lời Email & Opinion Essay',
        strategies: [
          'Speaking Q1–2 (Read aloud): Ngắt nhịp ở dấu phẩy/chấm và lên giọng nhẹ ở liệt kê để ghi điểm Intonation.',
          'Speaking Q7–9 (Respond using info): Đọc nhanh tiêu đề bảng lịch trình trong 45s chuẩn bị để trả lời đúng chi tiết trong 15–30s.',
          'Writing Q6–7 (Email): Đọc kỹ 2–3 yêu cầu bắt buộc (ví dụ: Ask 2 questions / Make 1 suggestion) và trả lời đủ mọi gạch đầu dòng.',
        ],
        commonTraps: [
          'Trả lời Email hay nói rất dài nhưng thiếu mất 1 yêu cầu nhỏ trong đề bài khiến điểm Task Completion bị tụt mạnh.',
          'Nói quá nhanh làm mất âm cuối hoặc ngắt sai cụm từ trong phần Read Aloud.',
        ],
      },
    ],
    diagnosticQuestions: [
      {
        id: 'toeic-diag-1',
        skill: 'listening',
        partLabel: 'Listening Part 2',
        audioScript: 'Question: Has the regional sales manager reviewed the Q3 budget draft yet?',
        question: 'Choose the most appropriate response to the audio question.',
        options: [
          'Yes, she is flying to Singapore next month.',
          'She asked me to send it to her again this afternoon.',
          'The accounting office is on the third floor.',
        ],
        correctIdx: 1,
        explanation:
          'Câu trả lời gián tiếp "Cô ấy nhờ tôi gửi lại vào chiều nay" ngụ ý rằng cô ấy chưa xem xong bản nháp. Đáp án A và C là bẫy lặp/lệch chủ đề.',
      },
      {
        id: 'toeic-diag-2',
        skill: 'listening',
        partLabel: 'Listening Part 3',
        audioScript:
          'Woman: Tom, the printer on the fourth floor is jamming again, and we need fifty copies of the client contract before two o’clock. Man: Let me call IT support right now. In the meantime, why don’t you use the high-speed copier inside the conference annex? Woman: Good idea, thanks!',
        question: 'What will the woman probably do next?',
        options: [
          'Contact the IT support desk',
          'Use the copier in the conference annex',
          'Postpone the client meeting until tomorrow',
          'Order new printer paper',
        ],
        correctIdx: 1,
        explanation:
          'Tom sẽ gọi IT ("Let me call IT support"), còn người phụ nữ đồng ý lời khuyên dùng máy photocopy ở khu phòng họp phụ ("Good idea, thanks!").',
      },
      {
        id: 'toeic-diag-3',
        skill: 'grammar',
        partLabel: 'Reading Part 5 (Word Family)',
        question: 'Ms. Lin handled the supplier delay _____ , keeping every client informed throughout the week.',
        options: ['profession', 'professional', 'professionally', 'professionalism'],
        correctIdx: 2,
        explanation:
          'Cần một trạng từ ("professionally") để bổ nghĩa cho động từ "handled" (xử lý một cách chuyên nghiệp).',
      },
      {
        id: 'toeic-diag-4',
        skill: 'grammar',
        partLabel: 'Reading Part 5 (Conjunction vs Preposition)',
        question: '_____ the heavy rainstorm earlier this morning, all freight shipments departed on schedule.',
        options: ['Although', 'Despite', 'Even though', 'Because'],
        correctIdx: 1,
        explanation:
          'Phía sau chỗ trống là một cụm danh từ ("the heavy rainstorm..."), nên phải dùng giới từ "Despite" (mặc dù). "Although / Even though / Because" cần một mệnh đề S + V.',
      },
      {
        id: 'toeic-diag-5',
        skill: 'vocab',
        partLabel: 'Reading Part 5 (Business Vocabulary)',
        question: 'Employees who complete the annual safety workshop are _____ for a complimentary wellness voucher.',
        options: ['eligible', 'reluctant', 'obsolete', 'adjacent'],
        correctIdx: 0,
        explanation:
          '"Be eligible for + N" nghĩa là đủ điều kiện nhận cái gì — cấu trúc cực kỳ phổ biến trong đề thi TOEIC.',
      },
      {
        id: 'toeic-diag-6',
        skill: 'reading',
        partLabel: 'Reading Part 6 (Cohesion)',
        passage:
          'Dear Team, Our cloud storage upgrade will take place this Sunday from 1:00 AM to 5:00 AM. During this window, shared folders will be temporarily unavailable. _____, please save any urgent files locally before leaving the office on Friday.',
        question: 'Choose the best transition word for the blank:',
        options: ['However', 'Therefore', 'Otherwise', 'Nevertheless'],
        correctIdx: 1,
        explanation:
          'Câu trước nêu sự việc thư mục sẽ tạm ngưng truy cập -> Câu sau nêu hành động kết quả phải lưu file trước -> dùng "Therefore" (Vì vậy).',
      },
      {
        id: 'toeic-diag-7',
        skill: 'reading',
        partLabel: 'Reading Part 7 (Memo Detail)',
        passage:
          'NOTICE: Effective May 1, employees traveling on business must submit hotel receipts within 10 business days of returning to be reimbursed. Meals above $45 per day require itemized receipts and manager pre-approval.',
        question: 'Under the new rule, what must staff submit if a daily meal costs $52?',
        options: [
          'Only a credit card summary within 30 days',
          'Itemized receipts plus prior approval from a manager',
          'A hotel confirmation number',
          'Nothing, because meals under $60 are automatic',
        ],
        correctIdx: 1,
        explanation:
          'Bữa ăn vượt quá $45/ngày (ở đây là $52) yêu cầu hóa đơn chi tiết ("itemized receipts") và sự phê duyệt trước của quản lý ("manager pre-approval").',
      },
      {
        id: 'toeic-diag-8',
        skill: 'reading',
        partLabel: 'Reading Part 7 (Inference)',
        passage:
          'From: customer.care@northstar.com | Subject: Order #8841\nThank you for letting us know that two ceramic mugs arrived chipped. We have already dispatched a replacement pair via express courier at no extra cost, and you do not need to return the damaged items.',
        question: 'What is indicated about the customer?',
        options: [
          'They must pay return shipping for the chipped mugs.',
          'They reported damaged merchandise from Order #8841.',
          'They asked for a full cash refund instead of replacements.',
          'They work at the express courier company.',
        ],
        correctIdx: 1,
        explanation:
          '"Thank you for letting us know that two ceramic mugs arrived chipped" suy ra khách hàng đã phản hồi về việc hàng giao bị sứt mẻ.',
      },
    ],
    skillPractice: {
      reading: [
        {
          id: 'toeic-read-1',
          partLabel: 'Reading Part 6–7 (Internal IT Notice)',
          title: 'Scheduled Server Migration & Access Guidelines',
          level: 'B1',
          passage:
            'To: All Staff\nFrom: Information Technology Department\nSubject: Weekend Server Migration\n\nPlease be advised that the IT team will migrate our internal payroll and leave-request portal to a faster cloud server starting Friday at 8:00 PM until Sunday at 6:00 PM. Throughout this period, staff will not be able to log into the HR portal or submit time-off requests.\n\nIf you plan to take leave during the first week of next month, you must submit your online form no later than 4:00 PM this Friday. Once the upgrade concludes on Sunday evening, employees will receive an automated link to reset their portal passwords for enhanced security.',
          viSummary:
            'Phòng IT thông báo nâng cấp hệ thống lương & nghỉ phép từ 20:00 Thứ Sáu đến 18:00 Chủ Nhật. Nhân viên muốn xin nghỉ tuần đầu tháng sau phải nộp đơn trước 16:00 Thứ Sáu và sẽ nhận link đặt lại mật khẩu sau bảo trì.',
          questions: [
            {
              id: 'toeic-r1-q1',
              questionType: 'Purpose',
              question: 'Why was this notice sent to employees?',
              options: [
                'To announce a new holiday bonus schedule',
                'To inform staff about temporary downtime of the HR portal',
                'To hire new technicians for the IT department',
                'To cancel all leave requests for next month',
              ],
              correctIdx: 1,
              explanation: 'Email thông báo việc chuyển đổi server làm hệ thống HR tạm ngưng hoạt động cuối tuần.',
            },
            {
              id: 'toeic-r1-q2',
              questionType: 'Deadline Detail',
              question: 'By when must employees submit early leave requests for next month?',
              options: ['Friday at 4:00 PM', 'Friday at 8:00 PM', 'Sunday at 6:00 PM', 'Monday at 9:00 AM'],
              correctIdx: 0,
              explanation: '"you must submit your online form no later than 4:00 PM this Friday".',
            },
            {
              id: 'toeic-r1-q3',
              questionType: 'Future Action',
              question: 'What will happen after the server upgrade is completed?',
              options: [
                'Employees will receive an automated password-reset link.',
                'Payroll payments will be moved to Monday.',
                'Paper forms will permanently replace online forms.',
                'The IT department will close for repairs.',
              ],
              correctIdx: 0,
              explanation: 'Câu cuối nêu nhân viên sẽ nhận đường dẫn tự động để đặt lại mật khẩu ("reset their portal passwords").',
            },
          ],
        },
        {
          id: 'toeic-read-2',
          partLabel: 'Reading Part 7 (Double-Context Correspondence)',
          title: 'Corporate Catering Order Revision',
          level: 'B2',
          passage:
            '[Email 1 — From: David Park, Event Coordinator]\nHi Maya, We booked your catering package for our annual shareholder lunch on June 18 (Order #CT-204). Initially we requested 60 vegetarian bento boxes, but registrations surged yesterday. Could we increase the order to 85 boxes and add two trays of gluten-free pastries?\n\n[Email 2 — From: Maya Tran, GreenBite Catering]\nDear David, Thank you for the update! We can easily accommodate 85 bento boxes. However, because our gluten-free bakery partner requires 72 hours’ notice and June 18 is only two days away, we can instead supply two large platters of fresh seasonal fruit at the same price. Please confirm by 3:00 PM today so our kitchen can adjust prep quantities.',
          viSummary:
            'David xin tăng đơn cơm hộp từ 60 lên 85 suất và thêm bánh ngọt không gluten cho ngày 18/6. Maya đồng ý tăng 85 suất nhưng không kịp làm bánh không gluten (cần báo trước 72 giờ trong khi chỉ còn 2 ngày) nên đề xuất đổi sang 2 khay hoa quả tươi đồng giá.',
          questions: [
            {
              id: 'toeic-r2-q1',
              questionType: 'Cross-Reference Detail',
              question: 'On what date is David most likely writing these emails?',
              options: ['June 10', 'June 16', 'June 18', 'June 21'],
              correctIdx: 1,
              explanation: 'Maya nói "June 18 is only two days away" → ngày trao đổi là 16/6. Đây là dạng câu suy luận ngày tháng điển hình của TOEIC Part 7.',
            },
            {
              id: 'toeic-r2-q2',
              questionType: 'Reason / Constraint',
              question: 'Why can GreenBite Catering NOT provide gluten-free pastries?',
              options: [
                'They stopped selling pastries last month.',
                'There is not enough advance notice for their bakery partner.',
                'The shareholder lunch does not allow desserts.',
                'The budget is insufficient for 85 boxes.',
              ],
              correctIdx: 1,
              explanation: 'Đối tác làm bánh cần báo trước 72 giờ nhưng sự kiện chỉ còn 2 ngày nữa (48 giờ).',
            },
            {
              id: 'toeic-r2-q3',
              questionType: 'Action Required',
              question: 'What does Maya ask David to do before 3:00 PM?',
              options: [
                'Pay an extra surcharge for the fruit platters',
                'Confirm the menu adjustment',
                'Pick up the boxes at the bakery',
                'Cancel Order #CT-204',
              ],
              correctIdx: 1,
              explanation: 'Maya đề nghị: "Please confirm by 3:00 PM today so our kitchen can adjust prep quantities" (xác nhận thay đổi thực đơn).',
            },
          ],
        },
      ],
      listening: [
        {
          id: 'toeic-listen-1',
          partLabel: 'Listening Part 3 (Office Conversation)',
          title: 'Relocating a Client Presentation',
          level: 'B1',
          speakerContext: 'Hội thoại giữa Elena và Daniel tại văn phòng về việc chuẩn bị phòng họp.',
          audioScript:
            'Elena: Daniel, have you tested the projector in Room 3B for this morning’s client presentation? Daniel: Yes, I checked it ten minutes ago, and unfortunately the audio cable is malfunctioning. Technicians won’t have a spare cable until noon. Elena: That is a problem—our clients arrive at ten thirty! Is Boardroom A available? Daniel: Let me check the booking calendar. Boardroom A is free until twelve thirty, and its screen and speakers work perfectly. I will carry the handouts over there right now while you greet the clients at reception.',
          viSummary:
            'Máy chiếu phòng 3B hỏng cáp âm thanh mà 10:30 khách đã tới. Daniel kiểm tra lịch thấy phòng Boardroom A trống tới 12:30 nên chuyển tài liệu sang đó, còn Elena ra quầy lễ tân đón khách.',
          questions: [
            {
              id: 'toeic-l1-q1',
              question: 'What is wrong with Room 3B?',
              options: [
                'It has already been booked by another team.',
                'The projector’s audio cable is not working properly.',
                'There are not enough chairs for the clients.',
              ],
              correctIdx: 1,
              explanation: 'Daniel nói "the audio cable is malfunctioning" (cáp âm thanh đang bị lỗi).',
            },
            {
              id: 'toeic-l1-q2',
              question: 'What time are the clients expected to arrive?',
              options: ['At 10:00 AM', 'At 10:30 AM', 'At 12:30 PM'],
              correctIdx: 1,
              explanation: 'Elena nhắc: "our clients arrive at ten thirty!" (10:30).',
            },
            {
              id: 'toeic-l1-q3',
              question: 'What will Elena do next?',
              options: [
                'Wait for a spare cable from technicians',
                'Carry printed handouts to Boardroom A',
                'Welcome the clients at the reception desk',
              ],
              correctIdx: 2,
              explanation: 'Daniel nói anh sẽ mang tài liệu đi, "while you greet the clients at reception".',
            },
          ],
        },
        {
          id: 'toeic-listen-2',
          partLabel: 'Listening Part 4 (Recorded Announcement)',
          title: 'Logistics Warehouse Safety Briefing',
          level: 'B2',
          speakerContext: 'Thông báo nội bộ gửi nhân viên kho vận trước đợt kiểm tra an toàn.',
          audioScript:
            'Attention all Oakwood Logistics warehouse personnel. Next Wednesday, external inspectors will conduct our annual fire and equipment safety audit between nine AM and three PM. Please make sure all loading bays remain completely clear of empty wooden pallets by Tuesday evening. Additionally, remember to wear high-visibility vests at all times inside Zone C, even during brief inventory checks. Supervisors will distribute replacement vests at Gate Two starting tomorrow morning.',
          viSummary:
            'Thông báo kiểm tra an toàn thiết bị & PCCC vào thứ Tư tuần sau (9:00–15:00). Nhân viên cần dọn sạch pallet gỗ ở khu bốc dỡ trước tối thứ Ba, luôn mặc áo phản quang ở Khu C và có thể nhận áo mới tại Cổng 2 từ sáng mai.',
          questions: [
            {
              id: 'toeic-l2-q1',
              question: 'Who is the intended audience for this announcement?',
              options: [
                'External fire inspectors',
                'Warehouse staff at Oakwood Logistics',
                'Delivery truck customers',
              ],
              correctIdx: 1,
              explanation: 'Mở đầu thông báo gọi trực tiếp: "Attention all Oakwood Logistics warehouse personnel".',
            },
            {
              id: 'toeic-l2-q2',
              question: 'What must be cleared from the loading bays by Tuesday evening?',
              options: ['Delivery vans', 'Empty wooden pallets', 'Safety vests'],
              correctIdx: 1,
              explanation: '"make sure all loading bays remain completely clear of empty wooden pallets by Tuesday evening".',
            },
            {
              id: 'toeic-l2-q3',
              question: 'Where can workers obtain replacement safety vests?',
              options: ['At Gate Two', 'Inside Zone C', 'At the main reception'],
              correctIdx: 0,
              explanation: '"Supervisors will distribute replacement vests at Gate Two starting tomorrow morning."',
            },
          ],
        },
      ],
      writing: [
        {
          id: 'toeic-w-email',
          taskLabel: 'Writing Part 2 (Respond to a Written Request)',
          title: 'Replying to a Vendor Invoice Discrepancy Email',
          recommendedMinutes: 10,
          wordCountRange: '80 – 130 từ',
          minWords: 65,
          prompt:
            'Read the email below from an office supplier and write a reply:\n"Dear Ms. Lan, Thank you for your order of 20 ergonomic office chairs (#INV-509). We noticed payment has not arrived yet. Please let us know when you expect to settle the balance."\nDirections: Respond to the supplier. In your email, give ONE explanation for the delay, provide ONE specific payment date, and make ONE request regarding an updated receipt.',
          promptVi:
            'Trả lời email nhà cung cấp: nêu 1 lý do chậm thanh toán (ví dụ sai số lượng/thiếu mã số thuế trên hóa đơn), đưa 1 ngày thanh toán cụ thể và yêu cầu gửi lại biên lai cập nhật.',
          outline: [
            'Salutation & Thanks: Chào lịch sự và cảm ơn lời nhắc.',
            'Explanation: Giải thích hóa đơn #INV-509 thiếu mã số thuế công ty nên bộ phận kế toán chưa duyệt chi.',
            'Payment Date: Cam kết hoàn tất chuyển khoản vào ngày cụ thể (ví dụ thứ Sáu ngày 24/5) sau khi nhận bản sửa.',
            'Request & Closing: Đề nghị gửi lại hóa đơn cập nhật + biên lai xác nhận sau thanh toán.',
          ],
          scoringCriteriaFocus: [
            'Hoàn thành ĐỦ 3 yêu cầu đề bài: 1 lý do + 1 ngày cụ thể + 1 yêu cầu biên lai.',
            'Giọng văn thương mại chuyên nghiệp, lịch sự và ngắn gọn rõ ý.',
          ],
          highBandKeywords: [
            { phrase: 'with reference to', meaningVi: 'liên quan đến / về việc' },
            { phrase: 'process the payment', meaningVi: 'xử lý khoản thanh toán' },
            { phrase: 'tax identification number', meaningVi: 'mã số thuế doanh nghiệp' },
            { phrase: 'settle the outstanding balance', meaningVi: 'thanh toán số dư còn nợ' },
            { phrase: 'updated receipt', meaningVi: 'biên lai đã cập nhật' },
            { phrase: 'at your earliest convenience', meaningVi: 'ngay khi thuận tiện nhất' },
          ],
          modelAnswer:
            'Dear Mr. Carter,\n\nThank you for your follow-up regarding Invoice #INV-509 for the 20 ergonomic office chairs.\n\nThe payment has been slightly delayed because our accounting team noticed that our company tax identification number was omitted from the original invoice, which is required for internal approval. Could you please reissue an updated invoice and send us an official payment receipt once the transaction is verified?\n\nAs soon as we receive the revised document, we will settle the outstanding balance via bank transfer no later than Friday, May 24.\n\nThank you for your cooperation and prompt assistance.\n\nBest regards,\nLan Nguyen',
          modelNotesVi:
            'Đáp ứng trọn vẹn 3 yêu cầu trong chưa đầy 110 từ, từ vựng văn phòng chuẩn xác ("omitted", "reissue", "settle the outstanding balance").',
        },
        {
          id: 'toeic-w-essay',
          taskLabel: 'Writing Part 3 (Opinion Essay)',
          title: 'Four-Day Workweek vs Standard Five-Day Schedule',
          recommendedMinutes: 30,
          wordCountRange: '250 – 320 từ',
          minWords: 220,
          prompt:
            'Some businesses are considering switching from a traditional five-day workweek to a four-day workweek without reducing employee pay. Do you agree or disagree that this change benefits both employees and employers? Support your opinion with specific reasons and examples.',
          promptVi:
            'Một số doanh nghiệp cân nhắc chuyển sang tuần làm việc 4 ngày mà vẫn giữ nguyên lương. Bạn đồng ý hay không đồng ý rằng thay đổi này có lợi cho cả nhân viên lẫn doanh nghiệp?',
          outline: [
            'Introduction: Nêu bối cảnh tuần làm việc 4 ngày + Khẳng định quan điểm đồng ý/có điều kiện rõ ràng.',
            'Body 1 (Lợi ích cho nhân viên): Tăng thời gian nghỉ ngơi, xử lý việc cá nhân và giảm kiệt sức tinh thần.',
            'Body 2 (Lợi ích cho doanh nghiệp): Nhân viên tập trung cao hơn, giảm họp hành vô bổ, tăng tỷ lệ giữ chân nhân tài và giảm chi phí vận hành văn phòng.',
            'Conclusion: Khẳng định hiệu quả tích cực nếu doanh nghiệp tối ưu hóa quy trình làm việc.',
          ],
          scoringCriteriaFocus: [
            'Lập luận cân đối cả hai đối tượng được hỏi (employees AND employers).',
            'Ví dụ công sở thực tế, từ nối rõ ràng và cấu trúc câu đa dạng.',
          ],
          highBandKeywords: [
            { phrase: 'employee morale', meaningVi: 'tinh thần làm việc của nhân viên' },
            { phrase: 'streamline internal meetings', meaningVi: 'tinh gọn các cuộc họp nội bộ' },
            { phrase: 'talent retention', meaningVi: 'khả năng giữ chân nhân tài' },
            { phrase: 'overhead operating costs', meaningVi: 'chi phí vận hành cố định' },
            { phrase: 'burnout prevention', meaningVi: 'phòng ngừa kiệt sức' },
          ],
          modelAnswer:
            'As modern companies look for smarter ways to organize labor, the four-day workweek has gained serious attention. In my view, adopting a shorter workweek without cutting salaries creates substantial advantages for both employees and employers when workflows are properly managed.\n\nFirst, employees clearly benefit from having an extra day off to recover and handle personal errands. With three consecutive days of rest or family time, workers return to their desks refreshed rather than exhausted. Because routine errands like medical appointments or banking can be scheduled on the free weekday, staff experience lower stress levels and stronger employee morale.\n\nSecond, employers stand to gain measurable productivity and cost savings. Knowing they have four focused days to meet weekly targets encourages teams to streamline internal meetings and minimize workplace distractions. Moreover, closing the physical office one extra day per week reduces utility bills and overhead operating costs. Perhaps most importantly, progressive schedules significantly boost talent retention, saving companies substantial recruitment and training expenses.\n\nOf course, customer-facing teams may need staggered shifts so clients still receive support five days a week. Overall, however, a well-planned four-day workweek fosters healthier staff, sharper focus, and stronger long-term business performance.',
          modelNotesVi:
            'Bài viết phân tích đủ cả hai vế nhân viên và doanh nghiệp, đồng thời bổ sung góc nhìn thực tế ("staggered shifts" - chia ca xen kẽ cho bộ phận chăm sóc khách hàng).',
        },
      ],
      speaking: [
        {
          id: 'toeic-s-read',
          partLabel: 'Speaking Q1–2 (Read a Text Aloud)',
          title: 'Business Shuttle & Conference Welcome Announcement',
          prepTimeText: '45 giây đọc nhẩm',
          speakTimeText: '45 giây đọc to',
          prompt:
            'Good morning, delegates, and welcome to the Asia Pacific Logistics Summit. Before our keynote session begins at nine fifteen, please pick up your conference badge and printed program at the registration counter near Entrance B. Complimentary shuttle buses to the exhibition hall will depart every twenty minutes outside the main lobby.',
          promptVi:
            'Đọc to rõ ràng, nhấn đúng trọng âm từ dài ("delegates", "Logistics", "complimentary", "exhibition") và ngắt nhẹ ở dấu phẩy.',
          sampleAnswer:
            'Good morning, delegates, and welcome to the Asia Pacific Logistics Summit. Before our keynote session begins at nine fifteen, please pick up your conference badge and printed program at the registration counter near Entrance B. Complimentary shuttle buses to the exhibition hall will depart every twenty minutes outside the main lobby.',
          highScoreVocab: [
            { phrase: 'keynote session', meaningVi: 'phiên phát biểu chính' },
            { phrase: 'registration counter', meaningVi: 'quầy đăng ký' },
            { phrase: 'complimentary shuttle buses', meaningVi: 'xe buýt đưa đón miễn phí' },
          ],
          deliveryTips: [
            'Phát âm rõ đuôi /s/ trong "delegates", "buses", "minutes".',
            'Lên giọng nhẹ trước dấu phẩy sau "Before our keynote session begins at nine fifteen," rồi hạ giọng ở cuối câu.',
          ],
        },
        {
          id: 'toeic-s-info',
          partLabel: 'Speaking Q7–9 (Respond Using Provided Info)',
          title: 'Answering Staff Questions About a Training Schedule',
          prepTimeText: '45 giây xem lịch',
          speakTimeText: '15–30 giây trả lời',
          prompt:
            'Schedule Info:\n• 9:00–10:30 AM: Excel Data Pivot Tables (Room 204, Trainer: Minh Le)\n• 10:45–12:00 PM: Client Email Etiquette (Room 301, Trainer: Sarah Kim)\n• Note: Laptops are provided; bring a notebook.\nQuestion: "I saw two workshops on the morning schedule. Could you tell me when the Client Email session starts, who teaches it, and whether I need to bring my own laptop?"',
          promptVi:
            'Trả lời chính xác toàn bộ 3 chi tiết được hỏi theo bảng lịch trình trong vòng 20–30 giây.',
          sampleAnswer:
            'Certainly! The Client Email Etiquette workshop begins at ten forty-five AM and runs until noon in Room three-oh-one. It will be led by Sarah Kim. As for equipment, you do not need to bring your own laptop because laptops are provided at the venue—just remember to bring a notebook.',
          highScoreVocab: [
            { phrase: 'runs until noon', meaningVi: 'kéo dài đến 12 giờ trưa' },
            { phrase: 'will be led by', meaningVi: 'được hướng dẫn bởi' },
            { phrase: 'as for equipment', meaningVi: 'về phần thiết bị' },
          ],
          deliveryTips: [
            'Gạch nhanh 3 ý cần trả lời: 10:45 AM (Room 301), Sarah Kim, Không cần mang laptop (chỉ cần sổ tay).',
            'Nói gãy gọn, rõ ràng từng con số giờ và số phòng.',
          ],
        },
        {
          id: 'toeic-s-opinion',
          partLabel: 'Speaking Q11 (Express an Opinion)',
          title: 'Large Corporation vs Small Startup for Career Growth',
          prepTimeText: '30 giây chuẩn bị',
          speakTimeText: '60 giây trả lời',
          prompt:
            'Some graduates prefer starting their careers at a large multinational corporation, while others prefer a small startup company. Which do you think is better for a recent graduate, and why?',
          promptVi:
            'Nêu rõ lựa chọn ngay câu đầu + 2 lý do kèm ví dụ ngắn trong 60 giây.',
          sampleAnswer:
            'In my opinion, starting at a large multinational corporation is generally better for recent graduates. First, big firms offer structured training programs and experienced mentors, which help newcomers build solid professional habits early on. For example, standardized feedback cycles teach graduates how to manage international clients properly. Second, working in a well-known corporation builds credibility on a resume, opening up diverse career paths later—whether someone chooses to stay or eventually launch their own business.',
          highScoreVocab: [
            { phrase: 'structured training programs', meaningVi: 'chương trình đào tạo bài bản' },
            { phrase: 'build credibility on a resume', meaningVi: 'tạo uy tín trên hồ sơ xin việc' },
            { phrase: 'open up diverse career paths', meaningVi: 'mở ra nhiều hướng phát triển nghề nghiệp' },
          ],
          deliveryTips: [
            'Dùng cấu trúc First... For example... Second... để giám khảo dễ theo dõi suốt 60 giây.',
            'Cố gắng nói đều nhịp tới giây 50–55, kết thúc bằng 1 câu chốt ngắn.',
          ],
        },
      ],
    },
    mockTest: {
      title: 'TOEIC Mini Mock Test (L&R — 12 Câu)',
      description: 'Đề mô phỏng kết hợp Listening Parts 2–4 & Reading Parts 5–7 có đồng hồ đếm ngược.',
      durationMinutes: 14,
      questions: [
        {
          id: 'toeic-mock-1',
          skill: 'listening',
          partLabel: 'Listening Part 2',
          audioScript: 'Question: Where should I store the extra boxes of promotional brochures?',
          question: 'Choose the best reply to the question.',
          options: [
            'The brochure design won an award.',
            'In the supply closet down the hall.',
            'We printed three hundred copies.',
          ],
          correctIdx: 1,
          explanation: 'Câu hỏi "Where" (ở đâu) khớp chính xác với vị trí "In the supply closet down the hall" (trong tủ vật tư cuối hành lang).',
        },
        {
          id: 'toeic-mock-2',
          skill: 'listening',
          partLabel: 'Listening Part 2',
          audioScript: 'Question: Would you prefer to meet with the architect on Wednesday or wait until Friday?',
          question: 'Choose the best reply to the question.',
          options: [
            'Wednesday morning works much better for my schedule.',
            'Yes, the building renovation started last month.',
            'He designed the new branch downtown.',
          ],
          correctIdx: 0,
          explanation: 'Câu hỏi lựa chọn (Wednesday or Friday) được trả lời bằng việc chọn "Wednesday morning works much better...".',
        },
        {
          id: 'toeic-mock-3',
          skill: 'listening',
          partLabel: 'Listening Part 3',
          audioScript:
            'Man: Ms. Rivera, our shipment of winter jackets arrived from Busan, but ten boxes were mistakenly delivered to our Eastside warehouse instead of the Main Depot. Woman: Thanks for flagging that quickly. Let us send our local van to retrieve those ten boxes before noon so the weekend store display isn’t delayed.',
          question: 'What problem is discussed in the conversation?',
          options: [
            'The jackets were damaged during shipping.',
            'Part of a shipment went to the wrong warehouse.',
            'The delivery van broke down near Busan.',
            'Store employees forgot to prepare the weekend display.',
          ],
          correctIdx: 1,
          explanation: '10 thùng hàng bị giao nhầm tới kho Eastside thay vì Main Depot ("mistakenly delivered to our Eastside warehouse").',
        },
        {
          id: 'toeic-mock-4',
          skill: 'listening',
          partLabel: 'Listening Part 3',
          audioScript:
            'Man: Ms. Rivera, our shipment of winter jackets arrived from Busan, but ten boxes were mistakenly delivered to our Eastside warehouse instead of the Main Depot. Woman: Thanks for flagging that quickly. Let us send our local van to retrieve those ten boxes before noon so the weekend store display isn’t delayed.',
          question: 'What does Ms. Rivera propose doing before noon?',
          options: [
            'Ordering ten replacement boxes from Busan',
            'Dispatching a local van to pick up the misplaced boxes',
            'Postponing the weekend promotion',
            'Closing the Eastside warehouse',
          ],
          correctIdx: 1,
          explanation: 'Cô Rivera đề nghị điều xe tải nội bộ đi lấy 10 thùng hàng đó trước trưa ("send our local van to retrieve those ten boxes before noon").',
        },
        {
          id: 'toeic-mock-5',
          skill: 'listening',
          partLabel: 'Listening Part 4',
          audioScript:
            'Good evening, passengers aboard Express Train 408 to Harbor City. Due to track maintenance ahead, we will make a brief five-minute stop at Oak Station before continuing to our final destination. Dining car service remains open in Car Four until nine PM.',
          question: 'Why will the train stop briefly at Oak Station?',
          options: [
            'To change dining car staff',
            'Because of track maintenance ahead',
            'To pick up passengers from a canceled flight',
            'Because the train reached its final destination',
          ],
          correctIdx: 1,
          explanation: '"Due to track maintenance ahead, we will make a brief five-minute stop at Oak Station".',
        },
        {
          id: 'toeic-mock-6',
          skill: 'grammar',
          partLabel: 'Reading Part 5',
          question: 'By the time the quarterly audit begins next Monday, the finance department _____ all expense records.',
          options: ['verified', 'will have verified', 'verifies', 'was verifying'],
          correctIdx: 1,
          explanation: '"By the time + Hiện tại đơn (next Monday)" đi với mệnh đề chính chia Thì Tương lai hoàn thành ("will have verified").',
        },
        {
          id: 'toeic-mock-7',
          skill: 'vocab',
          partLabel: 'Reading Part 5',
          question: 'Customer service agents must remain courteous _____ when responding to frustrated callers.',
          options: ['at all times', 'in advance', 'on purpose', 'by accident'],
          correctIdx: 0,
          explanation: '"At all times" (mọi lúc) phù hợp ngữ nghĩa yêu cầu nhân viên giữ thái độ lịch sự.',
        },
        {
          id: 'toeic-mock-8',
          skill: 'grammar',
          partLabel: 'Reading Part 5',
          question: 'The revised employee handbook provides clearer guidelines _____ remote-work reimbursement.',
          options: ['regarding', 'regards', 'regarded', 'regard'],
          correctIdx: 0,
          explanation: '"Regarding" đóng vai trò giới từ mang nghĩa "liên quan tới / về việc".',
        },
        {
          id: 'toeic-mock-9',
          skill: 'reading',
          partLabel: 'Reading Part 6 (Memo)',
          passage:
            'MEMO: Beginning July 1, Oakleaf Publishing will introduce a flexible lunch hour between 11:30 AM and 2:00 PM. Staff may choose any 60-minute slot within this range. _____, at least two team members in each department must remain available during peak client hours from noon to 1:00 PM.',
          question: 'Choose the best sentence/connector logic for the blank:',
          options: ['Consequently', 'However', 'For instance', 'Previously'],
          correctIdx: 1,
          explanation: 'Câu trước cho phép chọn khung giờ ăn trưa linh hoạt, câu sau đặt ra điều kiện ràng buộc đối lập (vẫn phải có ít nhất 2 người trực) → dùng "However".',
        },
        {
          id: 'toeic-mock-10',
          skill: 'reading',
          partLabel: 'Reading Part 7 (Q10–Q12)',
          passage:
            'SILVERLINE DESIGN STUDIO — Job Opening: Junior UX Researcher\nLocation: Hybrid (3 days/week in Da Nang Office)\nRequirements: Bachelor’s degree in Design, Psychology, or related field; 1+ year of usability testing experience; proficiency in Figma.\nBenefits: Health insurance, $500 annual learning stipend, 15 paid vacation days.\nHow to Apply: Send your CV and a PDF portfolio link to careers@silverline.example before October 20. Do NOT attach video files exceeding 5 MB.',
          question: 'Which qualification is explicitly required for applicants?',
          options: [
            'A Master’s degree in Computer Science',
            'At least one year of usability testing experience',
            'Five years of remote team management',
            'Fluency in three European languages',
          ],
          correctIdx: 1,
          explanation: 'Mục Requirements ghi rõ: "1+ year of usability testing experience; proficiency in Figma".',
        },
        {
          id: 'toeic-mock-11',
          skill: 'reading',
          partLabel: 'Reading Part 7 (Q10–Q12)',
          passage:
            'SILVERLINE DESIGN STUDIO — Job Opening: Junior UX Researcher\nLocation: Hybrid (3 days/week in Da Nang Office)\nRequirements: Bachelor’s degree in Design, Psychology, or related field; 1+ year of usability testing experience; proficiency in Figma.\nBenefits: Health insurance, $500 annual learning stipend, 15 paid vacation days.\nHow to Apply: Send your CV and a PDF portfolio link to careers@silverline.example before October 20. Do NOT attach video files exceeding 5 MB.',
          question: 'What is NOT included in the job benefits?',
          options: [
            'Medical insurance',
            'An annual allowance for learning',
            'Fifteen days of paid vacation',
            'A company-leased car',
          ],
          correctIdx: 3,
          explanation: 'Các quyền lợi gồm bảo hiểm sức khỏe, trợ cấp học tập $500/năm và 15 ngày phép có lương — không có xe công ty.',
        },
        {
          id: 'toeic-mock-12',
          skill: 'reading',
          partLabel: 'Reading Part 7 (Q10–Q12)',
          passage:
            'SILVERLINE DESIGN STUDIO — Job Opening: Junior UX Researcher\nLocation: Hybrid (3 days/week in Da Nang Office)\nRequirements: Bachelor’s degree in Design, Psychology, or related field; 1+ year of usability testing experience; proficiency in Figma.\nBenefits: Health insurance, $500 annual learning stipend, 15 paid vacation days.\nHow to Apply: Send your CV and a PDF portfolio link to careers@silverline.example before October 20. Do NOT attach video files exceeding 5 MB.',
          question: 'What instruction must candidates follow when applying?',
          options: [
            'Apply in person at the Da Nang office',
            'Avoid attaching large video files over 5 MB',
            'Submit applications after October 20',
            'Call the HR manager before sending a CV',
          ],
          correctIdx: 1,
          explanation: 'Mục How to Apply cảnh báo: "Do NOT attach video files exceeding 5 MB".',
        },
      ],
    },
    rubricCriteria: [
      {
        id: 'toeic-rub-comp',
        appliesTo: 'writing',
        name: 'Task Completeness & Tone',
        nameVi: 'Đầy đủ yêu cầu & Văn phong công sở',
        weightText: 'Trọng tâm Email & Essay',
        description: 'Trả lời đủ toàn bộ các điểm được hỏi trong Email (lý do, ngày giờ, đề xuất) và giữ giọng văn lịch sự, chuyên nghiệp.',
        highScoreBenchmarks: ['Không sót bất kỳ gạch đầu dòng nào trong đề', 'Xưng hô & kết thư chuẩn mực thương mại'],
      },
      {
        id: 'toeic-rub-org',
        appliesTo: 'writing',
        name: 'Organization & Coherence',
        nameVi: 'Tổ chức ý & Tính mạch lạc',
        weightText: 'Trọng tâm Opinion Essay',
        description: 'Ý tưởng được sắp xếp theo đoạn logic, có câu chủ đề và dẫn chứng công việc thuyết phục.',
        highScoreBenchmarks: ['Liên kết tự nhiên giữa luận điểm và ví dụ', 'Tránh lặp lại ý giữa hai đoạn thân bài'],
      },
      {
        id: 'toeic-rub-lang',
        appliesTo: 'both',
        name: 'Grammar & Business Vocabulary',
        nameVi: 'Ngữ pháp & Từ vựng thương mại',
        weightText: 'Writing & Speaking',
        description: 'Độ chính xác về thì động từ, giới từ, từ loại và vốn từ công sở phù hợp ngữ cảnh.',
        highScoreBenchmarks: ['Ít lỗi ngữ pháp gây hiểu nhầm thông tin', 'Sử dụng collocations thương mại chính xác'],
      },
      {
        id: 'toeic-rub-deliv',
        appliesTo: 'speaking',
        name: 'Pronunciation, Intonation & Stress',
        nameVi: 'Phát âm, Ngữ điệu & Trọng âm',
        weightText: 'Trọng tâm Speaking Q1–11',
        description: 'Đọc to rõ ràng, ngắt cụm hợp lý, nhấn trọng âm tự nhiên ở các từ khóa quan trọng.',
        highScoreBenchmarks: ['Ngắt nghỉ đúng dấu câu khi đọc thông báo', 'Tốc độ ổn định, không nuốt âm cuối'],
      },
      {
        id: 'toeic-rub-rel',
        appliesTo: 'speaking',
        name: 'Relevance & Completeness of Content',
        nameVi: 'Độ chính xác & Đầy đủ thông tin trả lời',
        weightText: 'Trọng tâm Q7–11',
        description: 'Trích xuất đúng số liệu từ bảng lịch trình và đưa ra lập luận sát với câu hỏi quan điểm.',
        highScoreBenchmarks: ['Trả lời trọn vẹn câu hỏi trong khung thời gian 15–60s', 'Nêu được lý do + ví dụ cụ thể'],
      },
    ],
  },

  vstep: {
    examType: 'vstep',
    title: 'VSTEP (Khung Năng Lực Ngoại Ngữ 6 Bậc Việt Nam)',
    subtitle: 'Kỳ thi chuẩn đầu ra Đại học, Sau Đại học, Cao học & Viên chức (B1 – B2 – C1).',
    badgeEmoji: '🇻🇳',
    totalDurationText: 'Khoảng 172 phút (Listening 40p • Reading 60p • Writing 60p • Speaking 12p)',
    scoreScale: 'Thang 10.0 mỗi kỹ năng (4.0–5.5: B1 | 6.0–8.0: B2 | 8.5–10.0: C1)',
    disclaimerNote: EXAM_DISCLAIMER,
    cefrMapping: [
      { cefr: 'A2 (Bậc 2)', scoreRange: 'Dưới 4.0 / 10', description: 'Chưa đạt chuẩn B1; cần củng cố nền tảng từ vựng & cấu trúc cơ bản.' },
      { cefr: 'B1 (Bậc 3)', scoreRange: '4.0 – 5.5 / 10', description: 'Chuẩn đầu ra phổ biến Đại học không chuyên & đầu vào Thạc sĩ.' },
      { cefr: 'B2 (Bậc 4)', scoreRange: '6.0 – 8.0 / 10', description: 'Chuẩn đầu ra Nghiên cứu sinh, giáo viên phổ thông & chuyên viên.' },
      { cefr: 'C1 (Bậc 5)', scoreRange: '8.5 – 10.0 / 10', description: 'Chuẩn giảng viên chuyên ngành ngôn ngữ & nghiên cứu chuyên sâu.' },
    ],
    sections: [
      {
        id: 'vstep-l',
        skill: 'Listening',
        partName: 'Listening (3 Parts — 35 câu)',
        duration: '40 phút (chỉ được nghe 1 LẦN duy nhất)',
        tasksOrQuestions: 'Part 1: 8 thông báo/hướng dẫn • Part 2: 12 hội thoại • Part 3: 15 bài giảng',
        strategies: [
          'Part 1: Đọc nhanh 4 phương án A–B–C–D trong thời gian trống để đoán tình huống (sân bay, thư viện, lớp học, thông báo thời gian/giá).',
          'Part 2: Theo dõi quan điểm của TỪNG người nói và ghi chú nhanh câu hỏi về thái độ/quyết định cuối cùng.',
          'Part 3: Tận dụng câu dẫn đầu bài giảng để nắm chủ đề chính, nghe các dấu hiệu chuyển ý ("First", "Another reason", "In contrast").',
        ],
        commonTraps: [
          'Đề VSTEP chỉ phát âm thanh 1 LẦN; mất tập trung ở 1 câu cần bỏ qua ngay để không lỡ cả cụm 3–4 câu tiếp theo.',
          'Bẫy số liệu hoặc giờ cũ/giờ mới khi nhân vật bàn bạc điều chỉnh lịch hẹn.',
        ],
      },
      {
        id: 'vstep-r',
        skill: 'Reading',
        partName: 'Reading (4 Passages — 40 câu)',
        duration: '60 phút (~15 phút/bài đọc)',
        tasksOrQuestions: '4 bài đọc hiểu học thuật/xã hội x 10 câu/bài',
        strategies: [
          'Ưu tiên làm câu hỏi từ vựng đồng nghĩa (Word in Context) và câu quy chiếu đại từ ("it", "they", "which", "such policies") trước để tiết kiệm thời gian.',
          'Với câu hỏi EXCEPT / NOT true: quét từng đáp án so ngược lại vào đoạn tương ứng để loại trừ 3 ý đúng.',
          'Để câu hỏi Ý chính toàn bài (Main Idea) hoặc Giọng điệu tác giả (Tone) làm cuối cùng sau khi đã đọc lướt hết các đoạn.',
        ],
        commonTraps: [
          'Chọn nghĩa quen thuộc nhất của từ vựng mà quên kiểm tra ngữ cảnh cụ thể của câu trong bài.',
          'Nhầm đối tượng quy chiếu của "them/these" với danh từ gần nhất thay vì danh từ chủ ngữ đúng về mặt ngữ nghĩa.',
        ],
      },
      {
        id: 'vstep-w1',
        skill: 'Writing',
        partName: 'Writing Task 1 (Letter / Email — 1/3 Điểm)',
        duration: '20 phút (tối thiểu 120 từ)',
        tasksOrQuestions: 'Viết thư thân mật (bạn bè) hoặc trang trọng (nhà trường, quản lý, dịch vụ)',
        strategies: [
          'Xác định ngay văn phong (Informal vs Formal) ở câu mở đầu và kết thư ("Best wishes," vs "Yours sincerely/faithfully,").',
          'Đọc kỹ tất cả 3–4 câu hỏi/yêu cầu trong đề bài và trả lời mỗi ý thành 1 đoạn ngắn rõ ràng.',
          'Không để quá giờ sang Task 2 vì Task 2 chiếm tới 2/3 tổng điểm Writing.',
        ],
        commonTraps: [
          'Trộn lẫn văn phong suồng sã ("Gonna", "Thanks a bunch") vào thư trang trọng gửi hiệu trưởng hoặc khách sạn.',
          'Quên không trả lời hết các câu hỏi phụ ẩn trong bức thư đề bài.',
        ],
      },
      {
        id: 'vstep-w2',
        skill: 'Writing',
        partName: 'Writing Task 2 (Essay — 2/3 Điểm)',
        duration: '40 phút (tối thiểu 250 từ)',
        tasksOrQuestions: 'Advantages-Disadvantages, Opinion, Causes-Solutions hoặc Discuss Both Views',
        strategies: [
          'Cấu trúc chuẩn 4 đoạn: Mở bài (bối cảnh + thesis) → Thân bài 1 → Thân bài 2 → Kết bài.',
          'Mỗi luận điểm cần có lý giải nhân-quả ("This is primarily because...") và 1 ví dụ cụ thể thay vì liệt kê ý suông.',
          'Để mục tiêu B2–C1, kết hợp câu phức nhượng bộ ("Although", "While"), mệnh đề quan hệ và từ vựng học thuật phù hợp.',
        ],
        commonTraps: [
          'Lạm dụng mẫu câu học thuộc lòng dài dòng ("Nowadays, with the rapid development of society...") nhưng thân bài nghèo ý và lặp từ.',
          'Viết sai các cặp liên từ tiếng Việt hay mắc ("Although... but", "Because... so").',
        ],
      },
      {
        id: 'vstep-s',
        skill: 'Speaking',
        partName: 'Speaking (3 Parts — 12 phút)',
        duration: 'Part 1 (3p) • Part 2 (4p) • Part 3 (5p)',
        tasksOrQuestions: 'Tương tác xã hội → Thảo luận giải pháp (chọn 1/3) → Phát triển chủ đề (Mindmap)',
        strategies: [
          'Part 1: Trả lời tự nhiên 2–3 câu cho mỗi câu hỏi của 2 chủ đề quen thuộc.',
          'Part 2 (Solution Discussion — Đặc trưng VSTEP): Nêu lựa chọn tốt nhất + 2 lý do thuyết phục + giải thích ngắn tại sao KHÔNG chọn 2 phương án còn lại.',
          'Part 3 (Topic Development): Mở rộng đầy đủ 3 nhánh trong sơ đồ Mindmap + thêm 1 ý kiến cá nhân + trả lời tự tin 2–3 câu hỏi mở rộng cuối.',
        ],
        commonTraps: [
          'Ở Part 2 chỉ nói lý do chọn phương án A mà quên giải thích vì sao loại bỏ B và C.',
          'Ở Part 3 chỉ đọc lại đúng 3 cụm từ trong Mindmap mà không giải thích chi tiết.',
        ],
      },
    ],
    diagnosticQuestions: [
      {
        id: 'vstep-diag-1',
        skill: 'listening',
        partLabel: 'Listening Part 1 (Announcement)',
        audioScript:
          'Attention students. Due to a guest lecture on environmental engineering, the main university library reading room on the second floor will close at 4:30 PM today instead of 8:00 PM. Students needing quiet study space after 4:30 may use Room 105 in the Science Wing.',
        question: 'Where should students go to study quietly after 4:30 PM today?',
        options: [
          'The second-floor reading room',
          'Room 105 in the Science Wing',
          'The environmental engineering hall',
          'The campus cafeteria',
        ],
        correctIdx: 1,
        explanation:
          'Phòng đọc tầng 2 đóng sớm lúc 4:30 chiều nên sinh viên cần chỗ học yên tĩnh sau giờ này chuyển sang Room 105 ở tòa Science Wing.',
      },
      {
        id: 'vstep-diag-2',
        skill: 'listening',
        partLabel: 'Listening Part 2 (Conversation)',
        audioScript:
          'Nam: Lan, have you submitted your summer internship form yet? The career office closes at five today. Lan: I filled out everything except my professor’s signature. She told me she will be in her office after two PM, so I am dropping by right after lunch.',
        question: 'Why has Lan NOT submitted her internship form yet?',
        options: [
          'The career office is closed today.',
          'She forgot her student ID card.',
          'She still needs her professor’s signature.',
          'She decided not to apply for the internship.',
        ],
        correctIdx: 2,
        explanation:
          'Lan đã điền hết thông tin nhưng còn thiếu chữ ký của giáo sư ("except my professor’s signature").',
      },
      {
        id: 'vstep-diag-3',
        skill: 'reading',
        partLabel: 'Reading (Reference)',
        passage:
          'Community gardens transform empty urban lots into productive green spaces. Not only do they supply fresh vegetables to local residents, but such initiatives also strengthen neighborhood friendships across age groups.',
        question: 'In the passage, what does the pronoun "they" refer to?',
        options: [
          'Empty urban lots',
          'Community gardens',
          'Fresh vegetables',
          'Local residents',
        ],
        correctIdx: 1,
        explanation:
          '"They" là chủ ngữ của vế đảo ngữ "Not only do they supply...", thay thế cho chủ ngữ câu ngay trước đó là "Community gardens".',
      },
      {
        id: 'vstep-diag-4',
        skill: 'reading',
        partLabel: 'Reading (Vocabulary in Context)',
        passage:
          'To ensure rural tourism remains viable without damaging fragile mountain trails, local authorities introduced a daily visitor cap and trained villagers as certified eco-guides.',
        question: 'The word "viable" in the sentence is closest in meaning to:',
        options: ['temporary', 'sustainable and workable', 'expensive', 'forbidden'],
        correctIdx: 1,
        explanation:
          '"Viable" trong ngữ cảnh phát triển du lịch lâu dài không phá hủy môi trường có nghĩa là khả thi và bền vững ("sustainable and workable").',
      },
      {
        id: 'vstep-diag-5',
        skill: 'reading',
        partLabel: 'Reading (EXCEPT Question)',
        passage:
          'Museums are increasingly adopting interactive touchscreens, multilingual audio apps, and virtual reality reconstructions to help younger audiences connect with historical artifacts. However, curators emphasize that digital displays cannot fully replace the emotional impact of seeing authentic objects in person.',
        question: 'According to the passage, museums are using ALL of the following EXCEPT:',
        options: [
          'Interactive touchscreens',
          'Multilingual audio apps',
          'Virtual reality reconstructions',
          'Free printed textbooks for every visitor',
        ],
        correctIdx: 3,
        explanation:
          'Bài đọc liệt kê touchscreens, audio apps và virtual reality; không hề nhắc đến sách giáo khoa in miễn phí.',
      },
      {
        id: 'vstep-diag-6',
        skill: 'grammar',
        partLabel: 'Writing Task 1 (Formal Register)',
        question: 'You are writing a formal complaint letter to a hotel manager whom you do not know by name. Which salutation and sign-off pair is most appropriate?',
        options: [
          'Hey Manager, ... / Best buddy,',
          'Dear Sir or Madam, ... / Yours faithfully,',
          'Dear Mr. Hotel, ... / Love,',
          'Hi there, ... / Yours sincerely,',
        ],
        correctIdx: 1,
        explanation:
          'Khi không biết tên người nhận trong thư trang trọng, dùng "Dear Sir or Madam," và kết thư bằng "Yours faithfully,".',
      },
      {
        id: 'vstep-diag-7',
        skill: 'grammar',
        partLabel: 'Writing Task 2 (B2 Grammar)',
        question: 'Which sentence is grammatically accurate for a VSTEP B2–C1 essay?',
        options: [
          'Although university tuition is rising, but many students still pursue higher degrees.',
          'Because flexible schedules reduce stress, so employees become more productive.',
          'Despite the initial cost, investing in public parks brings long-term health benefits.',
          'People who lives in big cities often face severe noise pollution.',
        ],
        correctIdx: 2,
        explanation:
          'Câu C dùng chuẩn cấu trúc "Despite + Cụm danh từ, S + V". Câu A sai "Although... but", B sai "Because... so", D sai hòa hợp động từ ("People who live").',
      },
      {
        id: 'vstep-diag-8',
        skill: 'vocab',
        partLabel: 'Speaking Part 2 Strategy',
        question: 'In VSTEP Speaking Part 2 (Solution Discussion with 3 options), what structure earns the highest score?',
        options: [
          'Reading the prompt word for word and choosing quickly without reasons',
          'Selecting one best option, giving clear reasons, and explaining why the other two are less suitable',
          'Saying all three options are equally good without making a final choice',
          'Talking only about your favorite hobby instead of the options',
        ],
        correctIdx: 1,
        explanation:
          'Chiến thuật chuẩn VSTEP Part 2 là chốt 1 lựa chọn tối ưu, nêu lý do ủng hộ, đồng thời phân tích nhược điểm của 2 phương án còn lại.',
      },
    ],
    skillPractice: {
      reading: [
        {
          id: 'vstep-read-1',
          partLabel: 'VSTEP Reading — Passage 1 (B1–B2)',
          title: 'Urban Green Corridors and Student Well-Being',
          level: 'B2',
          passage:
            'Many rapidly expanding universities are redesigning concrete pathways between lecture halls into "green corridors"—shaded walkways lined with native shrubs, rainwater gardens, and wooden benches. Environmental psychologists studying two Asian campuses found that students walking through leafy routes for just ten minutes between classes reported noticeably lower mental fatigue than peers crossing bare asphalt plazas.\n\nInterestingly, these landscaped paths also serve a practical ecological purpose. By channeling seasonal monsoon rain into sunken soil beds rather than concrete drains, green corridors reduce campus flooding while nurturing local bird and butterfly populations. University administrators initially worried about maintenance expenses, yet student environmental clubs have stepped in to organize monthly clean-up and planting sessions, turning campus upkeep into a collaborative learning experience.',
          viSummary:
            'Các hành lang xanh trong khuôn viên đại học giúp sinh viên giảm mệt mỏi tinh thần khi đi giữa các tiết học, đồng thời thoát nước mưa chống ngập và tạo môi trường cho chim bướm. Sinh viên cũng tham gia dọn dẹp, chăm sóc cùng nhà trường.',
          questions: [
            {
              id: 'vstep-r1-q1',
              questionType: 'Main Idea',
              question: 'What is the main topic of the passage?',
              options: [
                'How concrete plazas can increase university revenue',
                'The psychological, ecological, and community benefits of campus green corridors',
                'Why monsoon seasons damage wooden benches',
                'Methods for building underground lecture halls',
              ],
              correctIdx: 1,
              explanation: 'Bài đọc đề cập lợi ích giảm căng thẳng cho sinh viên (tâm lý), thoát nước và sinh thái (sinh thái), và sinh viên cùng chăm sóc (cộng đồng).',
            },
            {
              id: 'vstep-r1-q2',
              questionType: 'Detail',
              question: 'How do green corridors help manage heavy seasonal rain?',
              options: [
                'They pump water back into dormitory showers.',
                'They direct rainwater into sunken soil beds instead of concrete drains.',
                'They cover walkways with plastic roofs.',
                'They cancel outdoor classes during storms.',
              ],
              correctIdx: 1,
              explanation: '"By channeling seasonal monsoon rain into sunken soil beds rather than concrete drains, green corridors reduce campus flooding".',
            },
            {
              id: 'vstep-r1-q3',
              questionType: 'Inference',
              question: 'What helped ease administrators’ initial concern about maintenance costs?',
              options: [
                'Student clubs volunteered to assist with regular care and planting.',
                'The university raised tuition fees by ten percent.',
                'Native shrubs require zero water throughout the year.',
                'Local city workers replaced campus staff.',
              ],
              correctIdx: 0,
              explanation: 'Các CLB môi trường của sinh viên đã tham gia dọn dẹp và trồng cây hàng tháng ("stepped in to organize monthly clean-up and planting sessions").',
            },
          ],
        },
        {
          id: 'vstep-read-2',
          partLabel: 'VSTEP Reading — Passage 2 (B2–C1)',
          title: 'Preserving Traditional Craft Villages in the Digital Age',
          level: 'C1',
          passage:
            'For generations, traditional lacquerware and handwoven silk villages near major Vietnamese cities struggled to retain young apprentices, who often migrated to industrial zones in search of steadier factory wages. Without younger artisans to inherit intricate techniques, several heritage crafts risked fading within two decades.\n\nRecently, however, a quiet revival has emerged through digital storytelling and modular product design. Rather than relying exclusively on bulky ceremonial items aimed at older buyers, younger craftspeople are collaborating with contemporary designers to create laptop sleeves, ceramic travel mugs, and minimalist home accessories that appeal to urban professionals. By filming short behind-the-scenes videos showing natural dyes and patient handcrafting, village workshops have built direct online customer bases—cutting out middlemen and raising artisan incomes significantly.',
          viSummary:
            'Các làng nghề thủ công truyền thống từng thiếu người trẻ kế nghiệp do thu nhập thấp. Nhờ kết hợp thiết kế sản phẩm hiện đại (túi laptop, cốc du lịch) và quay video kể chuyện bán trực tiếp qua mạng, thu nhập nghệ nhân trẻ đã cải thiện rõ rệt.',
          questions: [
            {
              id: 'vstep-r2-q1',
              questionType: 'Cause & Effect',
              question: 'Why did traditional craft villages previously struggle to keep young workers?',
              options: [
                'Young workers preferred steadier wages in industrial factories.',
                'Raw silk and clay became illegal to harvest.',
                'Urban customers disliked handmade goods.',
                'Workshops refused to hire anyone under thirty.',
              ],
              correctIdx: 0,
              explanation: 'Thế hệ trẻ thường rời làng đi làm tại các khu công nghiệp để có mức lương nhà máy ổn định hơn ("steadier factory wages").',
            },
            {
              id: 'vstep-r2-q2',
              questionType: 'Vocabulary in Context',
              question: 'The phrase "cutting out middlemen" in paragraph 2 refers to:',
              options: [
                'Hiring extra retail distributors',
                'Selling products directly to buyers without intermediary traders',
                'Reducing the size of ceramic workshops',
                'Stopping online video marketing',
              ],
              correctIdx: 1,
              explanation: 'Bán trực tiếp qua mạng cho khách hàng giúp loại bỏ các khâu trung gian ("without intermediary traders"), nhờ đó tăng thu nhập cho thợ thủ công.',
            },
            {
              id: 'vstep-r2-q3',
              questionType: 'EXCEPT Question',
              question: 'Which strategy is NOT mentioned as helping revive craft villages?',
              options: [
                'Partnering with modern designers on everyday items',
                'Sharing short videos about crafting processes online',
                'Reaching buyers directly without intermediaries',
                'Moving all village workshops inside urban shopping malls',
              ],
              correctIdx: 3,
              explanation: 'Bài đọc chỉ nói họ bán trực tiếp online cho khách thành thị, không nói chuyển toàn bộ xưởng vào trung tâm thương mại.',
            },
          ],
        },
      ],
      listening: [
        {
          id: 'vstep-listen-1',
          partLabel: 'VSTEP Listening Part 1 & 2',
          title: 'Campus Volunteer Fair Registration',
          level: 'B1',
          speakerContext: 'Cuộc trao đổi giữa Minh và cố vấn hoạt động sinh viên (Cô An) tại hội chợ tình nguyện.',
          audioScript:
            'Ms. An: Hi Minh, are you thinking of joining one of our community volunteer teams this semester? Minh: Yes, Ms. An! I originally wanted to sign up for the weekend beach clean-up, but my Saturday English club overlaps with it. Is there anything on Sunday mornings? Ms. An: Absolutely. Our Reading Buddy program visits a local primary school every Sunday from eight thirty to eleven. We still need two volunteers who feel comfortable reading English storybooks aloud. Minh: That sounds perfect for me! Do I need to submit a paper application? Ms. An: Just scan the QR code at the front table by Thursday evening, and attend a short orientation briefing on Friday afternoon.',
          viSummary:
            'Minh không đi dọn rác bãi biển thứ Bảy được vì trùng lịch CLB tiếng Anh, nên cô An giới thiệu chương trình đọc truyện thiếu nhi vào sáng Chủ Nhật (8:30–11:00). Minh cần quét mã QR đăng ký trước tối thứ Năm và dự buổi hướng dẫn chiều thứ Sáu.',
          questions: [
            {
              id: 'vstep-l1-q1',
              question: 'Why cannot Minh join the beach clean-up team?',
              options: [
                'The team has already reached full capacity.',
                'It conflicts with his Saturday English club.',
                'He dislikes outdoor activities.',
              ],
              correctIdx: 1,
              explanation: 'Minh nói: "my Saturday English club overlaps with it" (bị trùng lịch với CLB tiếng Anh sáng thứ Bảy).',
            },
            {
              id: 'vstep-l1-q2',
              question: 'When does the Reading Buddy program take place?',
              options: [
                'Every Friday afternoon',
                'Every Saturday from 8:30 to 11:00',
                'Every Sunday from 8:30 to 11:00',
              ],
              correctIdx: 2,
              explanation: '"visits a local primary school every Sunday from eight thirty to eleven".',
            },
            {
              id: 'vstep-l1-q3',
              question: 'What is the deadline to scan the registration QR code?',
              options: ['Thursday evening', 'Friday afternoon', 'Sunday morning'],
              correctIdx: 0,
              explanation: '"scan the QR code at the front table by Thursday evening".',
            },
          ],
        },
        {
          id: 'vstep-listen-2',
          partLabel: 'VSTEP Listening Part 3 (Academic Talk)',
          title: 'Why Bilingual Note-Taking Boosts Retention',
          level: 'B2',
          speakerContext: 'Trích đoạn bài giảng về kỹ năng học tập của giảng viên tâm lý giáo dục.',
          audioScript:
            'Today let us discuss a common dilemma among university learners: when reading textbooks in a second language, should you copy definitions word for word, or summarize key concepts using a mix of English terminology and short native-language notes? Cognitive studies indicate that verbatim copying creates an illusion of productivity without deep understanding. By contrast, translating an abstract principle into concise personal notes while retaining exact English terms forces the brain to actively connect new knowledge with existing memory networks. However, during exam preparation weeks, learners should gradually shift toward writing full English explanations so they can retrieve academic phrasing smoothly under test conditions.',
          viSummary:
            'Chép nguyên văn định nghĩa tạo cảm giác học giả tạo. Kết hợp thuật ngữ tiếng Anh với ghi chú tóm tắt bằng tiếng mẹ đẻ giúp não liên kết kiến thức sâu hơn, nhưng sát tuần thi nên chuyển sang diễn đạt hoàn toàn bằng tiếng Anh để tạo phản xạ viết.',
          questions: [
            {
              id: 'vstep-l2-q1',
              question: 'What problem is associated with copying definitions word for word?',
              options: [
                'It ruins handwriting speed.',
                'It creates a false sense of productivity without deep comprehension.',
                'It takes less time than summarizing.',
              ],
              correctIdx: 1,
              explanation: '"verbatim copying creates an illusion of productivity without deep understanding".',
            },
            {
              id: 'vstep-l2-q2',
              question: 'Why does mixed-language summarizing help memory?',
              options: [
                'It avoids learning English terms altogether.',
                'It actively links new ideas to existing knowledge networks.',
                'It shortens textbooks by half.',
              ],
              correctIdx: 1,
              explanation: '"forces the brain to actively connect new knowledge with existing memory networks".',
            },
            {
              id: 'vstep-l2-q3',
              question: 'What does the speaker advise before exam weeks?',
              options: [
                'Stop taking any written notes',
                'Switch toward writing full English explanations',
                'Translate the entire exam into Vietnamese',
              ],
              correctIdx: 1,
              explanation: 'Gần tuần thi nên chuyển dần sang viết giải thích hoàn toàn bằng tiếng Anh để nhớ mượt cụm từ học thuật khi làm bài.',
            },
          ],
        },
      ],
      writing: [
        {
          id: 'vstep-w-task1',
          taskLabel: 'Writing Task 1 (Letter — 1/3 điểm)',
          title: 'Giving Advice to a Foreign Friend Visiting Your City',
          recommendedMinutes: 20,
          wordCountRange: '120 – 160 từ',
          minWords: 110,
          prompt:
            'You received an email from your English friend, Oliver, who plans to visit your hometown for five days next month:\n"I am excited to visit your city! Could you recommend the best weather season or clothes to pack, suggest two places I shouldn’t miss, and let me know what local dish we must try together?"\nWrite a reply to Oliver. Write at least 120 words.',
          promptVi:
            'Viết thư thân mật cho người bạn Oliver sắp đến thăm thành phố của bạn: tư vấn trang phục theo thời tiết, gợi ý 2 địa điểm nên đến và 1 món đặc sản nên ăn cùng nhau.',
          outline: [
            'Mở thư (Informal): Hỏi thăm & bày tỏ niềm vui khi Oliver sắp đến thăm.',
            'Đoạn 1 (Thời tiết & Trang phục): Nêu thời tiết tháng tới và khuyên mang áo nhẹ, giày đi bộ thoải mái, áo mưa nhỏ.',
            'Đoạn 2 (2 địa điểm + 1 món ăn): Đề xuất 2 điểm nổi bật (khu phố cổ/bảo tàng & chợ đêm/hồ) + hẹn đi ăn đặc sản địa phương.',
            'Kết thư: Hẹn đón ở sân bay/bến xe và chúc chuyến bay tốt đẹp.',
          ],
          scoringCriteriaFocus: [
            'Task Fulfillment: Trả lời đủ 3 yêu cầu (quần áo/thời tiết, 2 địa điểm, 1 món ăn).',
            'Văn phong thân mật tự nhiên (Informal tone: "I’m thrilled to hear...", "Warm wishes,").',
          ],
          highBandKeywords: [
            { phrase: 'thrilled to hear', meaningVi: 'rất vui khi nghe tin' },
            { phrase: 'lightweight breathable clothes', meaningVi: 'quần áo mỏng nhẹ thoáng mát' },
            { phrase: 'comfortable walking shoes', meaningVi: 'giày đi bộ êm chân' },
            { phrase: 'well worth visiting', meaningVi: 'rất đáng để ghé thăm' },
            { phrase: 'must-try local specialty', meaningVi: 'món đặc sản nhất định phải thử' },
          ],
          modelAnswer:
            'Dear Oliver,\n\nIt was wonderful to hear from you! I am thrilled that you are finally coming to visit my city for five days next month.\n\nSince next month is usually warm with occasional afternoon showers, you should pack lightweight breathable clothes, a compact umbrella, and a pair of comfortable walking shoes. That way, we can explore comfortably all day.\n\nThere are two places you really must see. First, the historic Old Quarter is well worth visiting in the early morning for its charming architecture and lively street cafés. Second, I would love to take you to the Riverside Botanical Park at sunset, where locals gather to relax and enjoy cool breezes. As for food, you cannot leave without trying our famous grilled pork noodles—a must-try local specialty that I will treat you to on your first evening!\n\nLet me know your flight arrival time so I can meet you at the airport.\n\nWarm wishes,\nMinh',
          modelNotesVi:
            'Thư dài ~160 từ, giọng điệu tự nhiên thân thiện, giải quyết trọn vẹn cả 3 câu hỏi và chia đoạn gọn gàng.',
        },
        {
          id: 'vstep-w-task2',
          taskLabel: 'Writing Task 2 (Essay — 2/3 điểm)',
          title: 'Online Learning vs Traditional Classroom Education',
          recommendedMinutes: 40,
          wordCountRange: '250 – 300 từ',
          minWords: 230,
          prompt:
            'Nowadays, many universities offer online degree courses alongside traditional face-to-face classes. Discuss the advantages and disadvantages of online learning for university students, and state your own opinion. Write at least 250 words.',
          promptVi:
            'Phân tích ưu điểm và nhược điểm của học trực tuyến đối với sinh viên đại học, đồng thời nêu quan điểm cá nhân.',
          outline: [
            'Mở bài: Giới thiệu sự phổ biến của học online tại ĐH + Nêu quan điểm (học online mang lại sự linh hoạt lớn nhưng cần kết hợp tương tác trực tiếp).',
            'Thân bài 1 (Ưu điểm): Tiết kiệm chi phí đi lại/sinh hoạt, xem lại bài giảng nhiều lần, học song song với việc làm thêm.',
            'Thân bài 2 (Nhược điểm): Giảm tương tác trực tiếp với giảng viên/bạn bè, dễ xao nhãng tại nhà, thiếu thực hành phòng thí nghiệm.',
            'Kết bài: Tóm tắt hai mặt và khẳng định mô hình kết hợp (blended learning) là hướng tối ưu.',
          ],
          scoringCriteriaFocus: [
            'Task Fulfillment: Trình bày đủ ưu điểm, nhược điểm và quan điểm cá nhân.',
            'Organization & Grammar: Liên kết ý mạch lạc, không dùng lặp cấu trúc câu đơn giản.',
          ],
          highBandKeywords: [
            { phrase: 'geographical flexibility', meaningVi: 'sự linh hoạt về địa lý' },
            { phrase: 'revisit recorded lectures', meaningVi: 'xem lại các bài giảng đã ghi hình' },
            { phrase: 'self-discipline', meaningVi: 'tính tự giác kỷ luật bản thân' },
            { phrase: 'interpersonal interaction', meaningVi: 'sự tương tác trực tiếp giữa người với người' },
            { phrase: 'blended learning model', meaningVi: 'mô hình học tập kết hợp' },
          ],
          modelAnswer:
            'Digital technology has reshaped higher education, enabling universities to deliver full courses over the internet. While online learning offers unmatched convenience, it also presents notable drawbacks that make a balanced approach essential.\n\nOn the one hand, virtual classes provide significant flexibility and financial relief for university students. Learners living in distant provinces can attend lectures without paying high urban accommodation or commuting costs. Furthermore, the ability to revisit recorded lectures at one’s own pace helps students grasp complex theories more thoroughly, while also allowing them to balance part-time internships with academic deadlines.\n\nOn the other hand, relying exclusively on online instruction carries clear limitations. Studying behind a screen reduces spontaneous interpersonal interaction with professors and classmates, which is vital for developing teamwork and communication skills. In addition, learners without strong self-discipline are easily distracted by household noise or social media. Certain fields such as engineering, medicine, or chemistry also require hands-on laboratory experiments that virtual simulations cannot completely replace.\n\nIn my opinion, online learning is an invaluable complement rather than a total replacement for traditional classrooms. Adopting a blended learning model—combining digital lectures for theoretical input with in-person seminars for discussion and practice—offers students the strongest educational outcomes.',
          modelNotesVi:
            'Cấu trúc 4 đoạn cân bằng, từ vựng chuẩn mức B2–C1 ("financial relief", "at one’s own pace", "hands-on laboratory experiments"), chốt quan điểm sắc nét.',
        },
      ],
      speaking: [
        {
          id: 'vstep-s-p1',
          partLabel: 'Speaking Part 1 (Social Interaction)',
          title: 'Hometown & Free-Time Reading Habits',
          prepTimeText: 'Trả lời ngay',
          speakTimeText: '30 giây / câu',
          prompt:
            '1. What do you like most about your hometown?\n2. How do you usually spend your weekends?\n3. Do you prefer reading e-books or printed books? Why?',
          promptVi: 'Trả lời thân thiện, tự nhiên mỗi câu 2–3 ý rõ ràng.',
          sampleAnswer:
            'What I appreciate most about my hometown is its peaceful atmosphere and friendly neighbors. Even though it is developing rapidly, we still have tree-lined streets and fresh local markets. On weekends, I usually catch up on sleep in the morning and then meet friends at a quiet coffee shop. When it comes to reading, I still prefer printed books because turning real pages helps me relax away from bright screens before bedtime.',
          highScoreVocab: [
            { phrase: 'tree-lined streets', meaningVi: 'những con đường rợp bóng cây' },
            { phrase: 'catch up on sleep', meaningVi: 'ngủ bù' },
            { phrase: 'away from bright screens', meaningVi: 'tránh xa màn hình điện tử sáng' },
          ],
          deliveryTips: [
            'Mỉm cười khi nói Part 1 để ngữ điệu tự nhiên và tạo thiện cảm với giám khảo.',
          ],
        },
        {
          id: 'vstep-s-p2',
          partLabel: 'Speaking Part 2 (Solution Discussion)',
          title: 'Choosing a Farewell Gift for Your Foreign Teacher',
          prepTimeText: '1 phút chuẩn bị',
          speakTimeText: '2–3 phút trình bày',
          prompt:
            'Your class wants to buy a farewell gift for your foreign English teacher who is returning home. Three options are suggested:\n1. A handmade traditional painting\n2. A set of specialty Vietnamese tea\n3. A printed class photo album\nWhich one do you think is the best choice, and why?',
          promptVi:
            'Chọn 1 phương án tốt nhất + đưa 2 lý do + giải thích vì sao 2 phương án còn lại kém phù hợp hơn (bắt buộc để đạt điểm B2–C1 VSTEP Part 2).',
          sampleAnswer:
            'If my class had to select a farewell gift for our foreign teacher, I believe a printed class photo album would be the most meaningful option. First, unlike consumable gifts, a photo album captures real memories from our lessons, field trips, and celebrations together, accompanied by personal handwritten messages from every student. Second, it is lightweight and easy to pack in a suitcase without worrying about customs restrictions or breakage.\n\nOn the other hand, while a handmade painting is culturally rich, a large framed piece can be bulky and fragile during an international flight. Similarly, specialty Vietnamese tea is thoughtful, yet we might not know the teacher’s exact flavor preference, and the tea will eventually run out. Therefore, a personalized photo album clearly offers the greatest lasting emotional value.',
          highScoreVocab: [
            { phrase: 'consumable gifts', meaningVi: 'quà tặng dùng rồi hết (như đồ ăn/trà)' },
            { phrase: 'customs restrictions or breakage', meaningVi: 'quy định hải quan hoặc sợ vỡ' },
            { phrase: 'lasting emotional value', meaningVi: 'giá trị tinh thần bền lâu' },
          ],
          deliveryTips: [
            'Nhớ 3 bước vàng: Chốt phương án → 2 lý do chọn → Lý do loại 2 phương án kia ("On the other hand...", "Similarly...").',
          ],
        },
        {
          id: 'vstep-s-p3',
          partLabel: 'Speaking Part 3 (Topic Development)',
          title: 'Benefits of Student Volunteering Activities',
          prepTimeText: '1 phút chuẩn bị',
          speakTimeText: '3–4 phút trình bày + hỏi đáp',
          prompt:
            'Topic: "University students should actively participate in volunteering activities."\nMindmap branches:\n• Communication & Teamwork skills\n• Practical social awareness\n• Career readiness & CV value\n• [Your own idea]\nFollow-up: Should volunteering be compulsory for graduation?',
          promptVi:
            'Phát triển lần lượt 3 nhánh Mindmap + thêm 1 ý riêng (ví dụ: mở rộng mạng lưới bạn bè) và trả lời câu hỏi phụ cuối.',
          sampleAnswer:
            'Volunteering plays a vital role in shaping well-rounded university students. To begin with, working in community projects sharpens communication and teamwork skills because students must coordinate with people from diverse ages and backgrounds. Second, volunteering deepens practical social awareness; helping disadvantaged children or joining environmental clean-ups teaches empathy that textbooks rarely provide. Third, employers value candidates with real initiative, so documented community work strengthens a fresh graduate’s CV. Additionally, from my own perspective, volunteering helps students relieve academic pressure and build lifelong friendships.\n\nRegarding whether it should be mandatory for graduation, I think encouraging it with extra credits is better than forcing everyone, because true enthusiasm creates genuine community impact.',
          highScoreVocab: [
            { phrase: 'well-rounded students', meaningVi: 'sinh viên phát triển toàn diện' },
            { phrase: 'practical social awareness', meaningVi: 'nhận thức xã hội thực tế' },
            { phrase: 'documented community work', meaningVi: 'hoạt động cộng đồng có ghi nhận' },
          ],
          deliveryTips: [
            'Dùng cụm nối rõ giữa các nhánh Mindmap ("To begin with...", "Second...", "Third...", "Additionally...").',
          ],
        },
      ],
    },
    mockTest: {
      title: 'VSTEP Mini Mock Test (Listening & Reading — 12 Câu)',
      description: 'Mô phỏng kết hợp VSTEP Listening (Parts 1–3) và Reading (Main idea, Reference, Vocab, EXCEPT, Inference) có bấm giờ.',
      durationMinutes: 15,
      questions: [
        {
          id: 'vstep-mock-1',
          skill: 'listening',
          partLabel: 'Listening Part 1',
          audioScript:
            'Passengers traveling on Flight VN214 to Hue are kindly informed that boarding will now begin at Gate 12 instead of Gate 8. Please have your boarding pass and identification ready.',
          question: 'Which gate should passengers for Flight VN214 go to?',
          options: ['Gate 4', 'Gate 8', 'Gate 12', 'Gate 14'],
          correctIdx: 2,
          explanation: 'Thông báo đổi từ Gate 8 sang Gate 12 ("now begin at Gate 12 instead of Gate 8").',
        },
        {
          id: 'vstep-mock-2',
          skill: 'listening',
          partLabel: 'Listening Part 1',
          audioScript:
            'Reminder to all museum visitors: flash photography is strictly prohibited inside the Ancient Textiles Hall to prevent fabric fading, though non-flash photos are welcome in the Sculpture Courtyard.',
          question: 'Where are visitors allowed to take photos without flash?',
          options: [
            'Inside the Ancient Textiles Hall',
            'In the Sculpture Courtyard',
            'Everywhere with flash turned on',
            'Nowhere inside the museum',
          ],
          correctIdx: 1,
          explanation: '"non-flash photos are welcome in the Sculpture Courtyard".',
        },
        {
          id: 'vstep-mock-3',
          skill: 'listening',
          partLabel: 'Listening Part 2',
          audioScript:
            'Mai: Phong, did you finish designing the poster for our Science Day? Phong: Almost! I chose the blue background, and I just need Professor Tuan to approve the final schedule text before I send it to the print shop tomorrow morning.',
          question: 'What is Phong waiting for before printing the poster?',
          options: [
            'Selecting a background color',
            'Approval of the schedule text from Professor Tuan',
            'Money from the print shop',
            'Help from Mai to translate the title',
          ],
          correctIdx: 1,
          explanation: 'Phong chỉ còn chờ thầy Tuấn duyệt nội dung lịch trình ("need Professor Tuan to approve the final schedule text").',
        },
        {
          id: 'vstep-mock-4',
          skill: 'listening',
          partLabel: 'Listening Part 2',
          audioScript:
            'Huy: Are we taking the bus to the botanical research station? Linh: The bus schedule takes nearly ninety minutes with morning traffic. My cousin offered to drive us there in thirty-five minutes if we leave at seven.',
          question: 'How will Huy and Linh most likely travel to the research station?',
          options: ['By city bus', 'By train', 'By car with Linh’s cousin', 'By bicycle'],
          correctIdx: 2,
          explanation: 'Xe buýt mất 90 phút nên họ có phương án đi ô tô cùng anh/chị họ của Linh chỉ mất 35 phút.',
        },
        {
          id: 'vstep-mock-5',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Lecture)',
          audioScript:
            'Lecturer: Sleep researchers emphasize that checking bright smartphone screens immediately before bed tricks the brain into suppressing melatonin, a hormone that signals nighttime rest. Even twenty minutes of scrolling can delay deep restorative sleep, leaving students noticeably less attentive during morning seminars.',
          question: 'According to the speaker, what happens when people use bright phones right before sleeping?',
          options: [
            'Melatonin production is suppressed, delaying deep sleep.',
            'Morning seminars become easier to remember.',
            'The brain enters restorative sleep twice as fast.',
            'Phone batteries drain faster at night.',
          ],
          correctIdx: 0,
          explanation: 'Ánh sáng màn hình đánh lừa não ức chế hormone melatonin, làm chậm giấc ngủ sâu phục hồi.',
        },
        {
          id: 'vstep-mock-6',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q6–Q8)',
          passage:
            'Over the past five years, several coastal towns in Central Vietnam have introduced "plastic-free market mornings" every Saturday. Shoppers who bring reusable cloth bags or bamboo baskets receive small discounts from participating food vendors. Initially, some stall owners feared extra inconvenience, yet municipal surveys later showed that weekend foot traffic rose by eighteen percent because families enjoyed the cleaner aisles and festive community atmosphere.',
          question: 'What reward do shoppers receive when bringing reusable bags on Saturday mornings?',
          options: [
            'Free parking tickets',
            'Small discounts from participating vendors',
            'Plastic containers at no charge',
            'Cash prizes from the mayor',
          ],
          correctIdx: 1,
          explanation: 'Người đi chợ mang túi vải/giỏ tre sẽ được tiểu thương giảm giá nhẹ ("receive small discounts").',
        },
        {
          id: 'vstep-mock-7',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q6–Q8)',
          passage:
            'Over the past five years, several coastal towns in Central Vietnam have introduced "plastic-free market mornings" every Saturday. Shoppers who bring reusable cloth bags or bamboo baskets receive small discounts from participating food vendors. Initially, some stall owners feared extra inconvenience, yet municipal surveys later showed that weekend foot traffic rose by eighteen percent because families enjoyed the cleaner aisles and festive community atmosphere.',
          question: 'Why did stall owners’ initial concern turn out to be unfounded?',
          options: [
            'Customer visits on weekends actually increased by 18%.',
            'Vendors stopped selling fresh food.',
            'The markets closed earlier on Saturdays.',
            'Tourists paid double prices for plastic bags.',
          ],
          correctIdx: 0,
          explanation: 'Dù ban đầu lo bất tiện, khảo sát cho thấy lượng khách cuối tuần tăng thêm 18% nhờ lối đi sạch đẹp.',
        },
        {
          id: 'vstep-mock-8',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q6–Q8)',
          passage:
            'Over the past five years, several coastal towns in Central Vietnam have introduced "plastic-free market mornings" every Saturday. Shoppers who bring reusable cloth bags or bamboo baskets receive small discounts from participating food vendors. Initially, some stall owners feared extra inconvenience, yet municipal surveys later showed that weekend foot traffic rose by eighteen percent because families enjoyed the cleaner aisles and festive community atmosphere.',
          question: 'The word "aisles" in the passage is closest in meaning to:',
          options: ['islands', 'walkways between stalls', 'storage warehouses', 'plastic roofs'],
          correctIdx: 1,
          explanation: '"Cleaner aisles" trong ngữ cảnh khu chợ nghĩa là lối đi giữa các gian hàng sạch sẽ hơn.',
        },
        {
          id: 'vstep-mock-9',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q9–Q12)',
          passage:
            'In modern workplace studies, "psychological safety" refers to a shared team belief that members can raise questions, admit errors, or propose unconventional ideas without fear of humiliation. Research led by organizational scholars demonstrates that teams with high psychological safety detect product flaws earlier than strictly hierarchical groups, where junior staff often stay silent to protect their reputation. Crucially, psychological safety does not mean lowering performance standards; rather, it pairs candid feedback with mutual respect.',
          question: 'What is the best definition of "psychological safety" in the passage?',
          options: [
            'Avoiding all difficult performance evaluations',
            'Freedom to speak up and admit mistakes without fear of ridicule',
            'Working alone without team managers',
            'Offering higher salaries to senior managers',
          ],
          correctIdx: 1,
          explanation: 'Đoạn văn định nghĩa rõ: niềm tin chung rằng thành viên có thể đặt câu hỏi, nhận lỗi hoặc nêu ý tưởng mới mà không sợ bị bẽ mặt ("without fear of humiliation").',
        },
        {
          id: 'vstep-mock-10',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q9–Q12)',
          passage:
            'In modern workplace studies, "psychological safety" refers to a shared team belief that members can raise questions, admit errors, or propose unconventional ideas without fear of humiliation. Research led by organizational scholars demonstrates that teams with high psychological safety detect product flaws earlier than strictly hierarchical groups, where junior staff often stay silent to protect their reputation. Crucially, psychological safety does not mean lowering performance standards; rather, it pairs candid feedback with mutual respect.',
          question: 'In strictly hierarchical groups, why do junior employees often remain silent?',
          options: [
            'They lack technical computers.',
            'They want to protect their reputation.',
            'They already solved all product flaws.',
            'They prefer emailing clients directly.',
          ],
          correctIdx: 1,
          explanation: '"where junior staff often stay silent to protect their reputation".',
        },
        {
          id: 'vstep-mock-11',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q9–Q12)',
          passage:
            'In modern workplace studies, "psychological safety" refers to a shared team belief that members can raise questions, admit errors, or propose unconventional ideas without fear of humiliation. Research led by organizational scholars demonstrates that teams with high psychological safety detect product flaws earlier than strictly hierarchical groups, where junior staff often stay silent to protect their reputation. Crucially, psychological safety does not mean lowering performance standards; rather, it pairs candid feedback with mutual respect.',
          question: 'The word "candid" in the final sentence is closest in meaning to:',
          options: ['dishonest', 'open and honest', 'delayed', 'secretive'],
          correctIdx: 1,
          explanation: '"Candid feedback" nghĩa là góp ý thẳng thắn, chân thành ("open and honest").',
        },
        {
          id: 'vstep-mock-12',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q9–Q12)',
          passage:
            'In modern workplace studies, "psychological safety" refers to a shared team belief that members can raise questions, admit errors, or propose unconventional ideas without fear of humiliation. Research led by organizational scholars demonstrates that teams with high psychological safety detect product flaws earlier than strictly hierarchical groups, where junior staff often stay silent to protect their reputation. Crucially, psychological safety does not mean lowering performance standards; rather, it pairs candid feedback with mutual respect.',
          question: 'What misconception about psychological safety does the author correct at the end?',
          options: [
            'That it only works in hospitals',
            'That it means lowering work quality standards',
            'That junior workers cannot join meetings',
            'That hierarchical teams detect flaws faster',
          ],
          correctIdx: 1,
          explanation: 'Tác giả nhấn mạnh: "Crucially, psychological safety does not mean lowering performance standards".',
        },
      ],
    },
    rubricCriteria: [
      {
        id: 'vstep-rub-tf',
        appliesTo: 'writing',
        name: 'Task Fulfillment',
        nameVi: 'Mức độ hoàn thành yêu cầu đề bài',
        weightText: '25% Writing',
        description: 'Giải quyết đầy đủ mọi câu hỏi trong thư (Task 1) hoặc lập luận đủ sâu cho chủ đề bài luận (Task 2), đúng văn phong và độ dài.',
        highScoreBenchmarks: ['Đủ ≥120 từ (Task 1) / ≥250 từ (Task 2)', 'Không sót ý hỏi phụ trong Task 1'],
      },
      {
        id: 'vstep-rub-org',
        appliesTo: 'writing',
        name: 'Organization',
        nameVi: 'Tổ chức bố cục & Liên kết',
        weightText: '25% Writing',
        description: 'Chia đoạn hợp lý, câu chủ đề rõ ràng và sử dụng từ nối tự nhiên giữa các luận điểm.',
        highScoreBenchmarks: ['Cấu trúc Mở – Thân – Kết mạch lạc', 'Liên kết câu bằng đại từ quy chiếu và liên từ đa dạng'],
      },
      {
        id: 'vstep-rub-voc',
        appliesTo: 'writing',
        name: 'Vocabulary',
        nameVi: 'Từ vựng & Diễn đạt',
        weightText: '25% Writing',
        description: 'Vốn từ tương xứng trình độ mục tiêu B1/B2/C1, biết paraphrase và ít lỗi chính tả.',
        highScoreBenchmarks: ['Sử dụng từ nối và cụm từ học thuật tự nhiên', 'Tránh lặp lại từ khóa đề bài quá nhiều lần'],
      },
      {
        id: 'vstep-rub-gram',
        appliesTo: 'writing',
        name: 'Grammar',
        nameVi: 'Ngữ pháp & Cấu trúc câu',
        weightText: '25% Writing',
        description: 'Độ chính xác thì động từ, hòa hợp chủ-vị và khả năng viết câu ghép/câu phức ở bậc B2–C1.',
        highScoreBenchmarks: ['Không mắc lỗi cơ bản ("Although... but", thiếu động từ chính)', 'Kết hợp câu đơn và câu phức mượt mà'],
      },
      {
        id: 'vstep-rub-sgv',
        appliesTo: 'speaking',
        name: 'Grammar & Vocabulary (Speaking)',
        nameVi: 'Ngữ pháp & Từ vựng khi nói',
        weightText: '25% Speaking',
        description: 'Dùng từ ngữ linh hoạt theo tình huống giao tiếp (Part 1), tranh luận phương án (Part 2) và trình bày chủ đề (Part 3).',
        highScoreBenchmarks: ['Dùng chuẩn cụm so sánh loại trừ ở Part 2', 'Có từ vựng chủ đề mở rộng ở Part 3'],
      },
      {
        id: 'vstep-rub-dm',
        appliesTo: 'speaking',
        name: 'Discourse Management',
        nameVi: 'Quản lý diễn ngôn & Phát triển ý',
        weightText: '25% Speaking',
        description: 'Khả năng duy trì lời nói trôi chảy, phát triển đủ các nhánh Mindmap mà không bị cạn ý sớm.',
        highScoreBenchmarks: ['Trình bày có mở đầu – giải thích – ví dụ – kết luận', 'Tốc độ tự nhiên, ít ngừng nghỉ quá lâu'],
      },
      {
        id: 'vstep-rub-spr',
        appliesTo: 'speaking',
        name: 'Pronunciation & Interactive Communication',
        nameVi: 'Phát âm & Khả năng tương tác',
        weightText: '50% Speaking',
        description: 'Phát âm rõ ràng dễ hiểu, nhấn trọng âm đúng và phản xạ trả lời tốt các câu hỏi mở rộng cuối giờ.',
        highScoreBenchmarks: ['Rõ âm cuối và trọng âm câu', 'Phản hồi trực diện câu hỏi Follow-up của giám khảo'],
      },
    ],
  },

  cambridge: {
    examType: 'cambridge',
    title: 'Cambridge English (KET A2 • PET B1 • FCE B2)',
    subtitle: 'Hệ thống chứng chỉ quốc tế trọn đời từ Cambridge Assessment (Từ A2 Key đến B2 First).',
    badgeEmoji: '📘',
    totalDurationText: 'KET ~110p • PET ~140p • FCE ~210p (Reading/Use of English, Writing, Listening, Speaking)',
    scoreScale: 'Cambridge Scale 82–230 (KET: 120–139 | PET: 140–159 | FCE: 160–179)',
    disclaimerNote: EXAM_DISCLAIMER,
    cefrMapping: [
      { cefr: 'A2 (KET)', scoreRange: 'Scale 120 – 139', description: 'Đọc biển báo ngắn, viết tin nhắn/email 25–35 từ, giao tiếp hàng ngày.' },
      { cefr: 'B1 (PET)', scoreRange: 'Scale 140 – 159', description: 'Đọc bài báo đời sống, viết Email/Article/Story ~100 từ, diễn đạt quan điểm.' },
      { cefr: 'B2 (FCE)', scoreRange: 'Scale 160 – 179', description: 'Làm chủ Use of English (biến đổi từ/câu), viết Essay 140–190 từ, thảo luận tranh ảnh.' },
      { cefr: 'C1 (Vượt chuẩn FCE)', scoreRange: 'Scale 180 – 190+', description: 'Đạt hạng xuất sắc (Grade A) ở kỳ thi B2 First được cấp nhận diện mức C1.' },
    ],
    sections: [
      {
        id: 'cam-uoe',
        skill: 'Use of English',
        partName: 'Reading & Use of English (KET / PET / FCE)',
        duration: 'KET 60p • PET 45p • FCE 75p (gồm Parts 1–7)',
        tasksOrQuestions: 'Trắc nghiệm điền từ, Open Cloze, Word Formation (FCE), Key Word Transformation (FCE)',
        strategies: [
          'Multiple-choice Cloze: kiểm tra Collocation, Phrasal Verbs và từ nối đi liền trước/sau chỗ trống (ví dụ: "keen ON", "make a decision").',
          'Open Cloze (điền 1 từ không có gợi ý): 80% đáp án rơi vào từ chức năng (giới từ, đại từ quan hệ, trợ động từ, liên từ, mạo từ).',
          'Key Word Transformation (FCE Part 4): không thay đổi từ khóa cho sẵn, viết từ 2–5 từ và kiểm tra kỹ thì động từ + giới từ.',
        ],
        commonTraps: [
          'Word Formation: quên thêm tiền tố phủ định ("un-", "in-", "dis-") hoặc quên chia danh từ số nhiều.',
          'Key Word Transformation: viết quá 5 từ (contractions như "didn’t" được tính là 2 từ!) hoặc biến đổi dạng của từ khóa gợi ý.',
        ],
      },
      {
        id: 'cam-read',
        skill: 'Reading',
        partName: 'Reading Comprehension (Signs, Gapped Text, Multiple Matching)',
        duration: 'Tích hợp trong phần Reading & Use of English',
        tasksOrQuestions: 'Đọc biển báo/tin nhắn (KET/PET), Ghép câu vào đoạn trống, Đọc hiểu chi tiết',
        strategies: [
          'Đọc biển báo & tin nhắn ngắn: xác định người gửi, người nhận và mục đích hành động (cảnh báo, đổi giờ, đề nghị).',
          'Gapped Text (điền câu bị thiếu vào đoạn văn): đối chiếu đại từ quy chiếu ("this idea", "they", "however") cả trước lẫn sau ô trống.',
        ],
        commonTraps: [
          'Chọn phương án có chứa đúng từ vựng xuất hiện trong biển báo nhưng nghĩa lại ngược với quy định thực tế.',
        ],
      },
      {
        id: 'cam-w',
        skill: 'Writing',
        partName: 'Writing (Email, Essay, Article, Story, Review)',
        duration: 'KET 25p • PET 45p • FCE 80p (2 bài)',
        tasksOrQuestions: 'KET: Email + Picture Story • PET: Email + Article/Story • FCE: Compulsory Essay + Choice',
        strategies: [
          'Bám sát tiêu chí Content: gạch chân toàn bộ các ý bắt buộc và các ghi chú bên lề email.',
          'Áp dụng đúng giọng văn theo thể loại (Communicative Achievement): Email bạn bè thân mật, Article thu hút người đọc, Essay trang trọng.',
          'Với FCE Essay: đề luôn cho 2 gợi ý sẵn và yêu cầu thêm 1 ý thứ 3 của riêng bạn — đừng bao giờ quên ý thứ 3!',
        ],
        commonTraps: [
          'Viết FCE Essay quên mất ý thứ 3 ("your own idea") khiến điểm Content bị trừ nặng.',
          'Viết Article nhưng khô khan như Essay, thiếu tiêu đề hấp dẫn và câu hỏi tương tác với độc giả.',
        ],
      },
      {
        id: 'cam-l',
        skill: 'Listening',
        partName: 'Listening (4 Parts — Nghe 2 LẦN)',
        duration: 'KET 30p • PET 30p • FCE 40p',
        tasksOrQuestions: 'Tranh chọn đáp án, Điền 1 từ/số (Gap-fill), Phỏng vấn & Multiple Matching',
        strategies: [
          'Khác VSTEP, Cambridge Listening được phát 2 LẦN: Lần 1 bắt ý và chọn/điền nháp; Lần 2 kiểm tra lại bẫy thay đổi ý và chính tả.',
          'Gap-fill: giữ nguyên từ nghe được trong băng, không tự ý đổi thì hoặc đổi sang từ đồng nghĩa.',
        ],
        commonTraps: [
          'Người nói nhắc cả 3 bức tranh/lựa chọn trong băng nhưng chỉ có 1 cái thực sự được chọn ở cuối hội thoại.',
          'Viết sai chính tả tên riêng hoặc thiếu đơn vị/ngày tháng ở bài điền từ.',
        ],
      },
      {
        id: 'cam-s',
        skill: 'Speaking',
        partName: 'Speaking (Thi cặp đôi 2 thí sinh + 2 giám khảo)',
        duration: 'KET 8–10p • PET 12–17p • FCE 14p',
        tasksOrQuestions: 'Interview • Photo Description / Long Turn • Collaborative Task • Discussion',
        strategies: [
          'Điểm đặc trưng Cambridge là Interactive Communication: biết lắng nghe, phản hồi ý của bạn thi cặp ("That’s a great point, and I’d also add...") và mời bạn cùng nói ("What do you think?").',
          'FCE Part 2 (1 phút so sánh 2 bức ảnh): dành 30–40 giây đầu SO SÁNH điểm giống/khác của 2 ảnh ("Whereas the first picture shows..., the second depicts...") rồi dành 20 giây trả lời câu hỏi phía trên ảnh — không mô tả rời từng ảnh một.',
        ],
        commonTraps: [
          'Nói độc thoại hết giờ trong phần Collaborative Task (Part 3) mà không tương tác hỏi ý kiến bạn thi cùng.',
          'Chỉ liệt kê đồ vật trong tranh thay vì so sánh và suy đoán cảm xúc/tình huống.',
        ],
      },
    ],
    diagnosticQuestions: [
      {
        id: 'cam-diag-1',
        skill: 'listening',
        partLabel: 'KET / PET Listening',
        audioScript:
          'Boy: Hi Maya, are we still meeting at the sports hall at three o’clock for badminton? Girl: Actually, the coach texted to say court two is being cleaned until three thirty, so let us meet outside the juice bar at three fifteen first, and walk over together.',
        question: 'Where and when will the two friends meet first?',
        options: [
          'At the sports hall at 3:00',
          'Outside the juice bar at 3:15',
          'On court two at 3:30',
        ],
        correctIdx: 1,
        explanation:
          'Sân cầu lông dọn tới 3:30 nên hai bạn hẹn gặp nhau trước quầy nước ép lúc 3:15 ("outside the juice bar at three fifteen first").',
      },
      {
        id: 'cam-diag-2',
        skill: 'listening',
        partLabel: 'FCE Listening (Attitude)',
        audioScript:
          'Interviewer: Leo, when your neighborhood photography club exhibition attracted four hundred guests on opening night, were you surprised? Leo: Honestly, given how hard everyone worked on social media, I expected a good turnout—what really caught me off guard was how many local teenagers asked to join our beginner workshop the very next week.',
        question: 'What surprised Leo most about the exhibition?',
        options: [
          'The number of people who attended on opening night',
          'How effectively social media promoted the event',
          'The strong interest from local teenagers in joining future workshops',
        ],
        correctIdx: 2,
        explanation:
          'Leo không ngạc nhiên về 400 khách vì đã quảng bá kỹ; điều làm anh bất ngờ ("caught me off guard") là rất nhiều bạn trẻ xin tham gia workshop cho người mới.',
      },
      {
        id: 'cam-diag-3',
        skill: 'vocab',
        partLabel: 'Use of English Part 1 (Multiple-choice Cloze)',
        question: 'Although Anna had never played chess before, she was _____ to learn the basic moves quickly.',
        options: ['keen', 'fond', 'interested', 'capable'],
        correctIdx: 0,
        explanation:
          'Chỉ có "keen" đi với "to + V nguyên mẫu" ("keen to learn"). "Fond of", "interested in", "capable of" đều đi với V-ing.',
      },
      {
        id: 'cam-diag-4',
        skill: 'grammar',
        partLabel: 'Use of English Part 2 (Open Cloze)',
        question: 'Complete the gap with ONE word: "The mountain village _____ my grandparents grew up has changed dramatically over the last thirty years."',
        options: ['which', 'where', 'that', 'whom'],
        correctIdx: 1,
        explanation:
          'Chỗ trống thay thế cho trạng ngữ chỉ nơi chốn ("in that village") trước mệnh đề đầy đủ "my grandparents grew up", nên dùng trạng từ quan hệ "where".',
      },
      {
        id: 'cam-diag-5',
        skill: 'vocab',
        partLabel: 'FCE Part 3 (Word Formation)',
        question: 'Choose the correct form of the base word "RELY" to fit the sentence: "Solar batteries have improved in _____ , allowing rural clinics to store power safely."',
        options: ['reliably', 'reliability', 'unreliable', 'relying'],
        correctIdx: 1,
        explanation:
          'Sau giới từ "in" cần một danh từ -> "reliability" (độ tin cậy).',
      },
      {
        id: 'cam-diag-6',
        skill: 'grammar',
        partLabel: 'FCE Part 4 (Key Word Transformation)',
        question: 'Rewrite keeping the meaning: "It is a pity we didn’t book the museum tickets in advance." (WISH) → "I _____ the museum tickets in advance."',
        options: [
          'wish we booked',
          'wish we had booked',
          'wish we would book',
          'wish booking',
        ],
        correctIdx: 1,
        explanation:
          'Tiếc nuối một việc ĐÃ KHÔNG làm trong quá khứ ("didn’t book") → dùng "wish + S + had + V3/ed" ("wish we had booked").',
      },
      {
        id: 'cam-diag-7',
        skill: 'reading',
        partLabel: 'KET / PET Short Notice Reading',
        passage:
          'NOTICE — BIKE SHED:\nStudents may leave bicycles here free of charge during school hours, but the gate locks automatically at 6:00 PM. Any bikes left overnight will be moved to the caretaker’s office.',
        question: 'What does the notice tell students?',
        options: [
          'Students must pay a daily fee to park bikes.',
          'The bike shed stays open 24 hours a day.',
          'Bicycles must be collected before 6:00 PM.',
        ],
        correctIdx: 2,
        explanation:
          'Cổng nhà xe tự động khóa lúc 6 giờ chiều và xe để qua đêm sẽ bị chuyển đi → học sinh phải lấy xe trước 6:00 PM.',
      },
      {
        id: 'cam-diag-8',
        skill: 'reading',
        partLabel: 'PET / FCE Reading Inference',
        passage:
          'When Elena moved into an old stone cottage, her friends warned her that renovating a drafty house alone would test her patience. Six months later, despite scraped knuckles and countless trips to hardware stores, she described stripping away decades of peeling wallpaper as oddly therapeutic.',
        question: 'How does Elena feel about renovating her cottage?',
        options: [
          'She regrets not listening to her friends’ advice.',
          'She finds the physical restoration surprisingly calming and rewarding.',
          'She refuses to visit hardware stores anymore.',
        ],
        correctIdx: 1,
        explanation:
          'Dù tay trầy xước và vất vả, cô mô tả công việc sửa nhà là "oddly therapeutic" (mang lại cảm giác thư thái/chữa lành lạ kỳ).',
      },
    ],
    skillPractice: {
      reading: [
        {
          id: 'cam-read-1',
          partLabel: 'PET (B1) Reading Practice',
          title: 'The Coastal Youth Cycling Trail',
          level: 'B1',
          passage:
            'Last spring, twelve teenagers from Seaside High volunteered to map out a safe weekend cycling trail linking the town harbor to Pinewood Park. Previously, young cyclists avoided the route because heavy delivery vans often parked along the narrow main road. Working with town engineers, the students identified quieter residential lanes and painted bright green bicycle symbols at every crossing.\n\nSince opening in July, the eight-kilometer trail has proved popular not only with students but also with older residents out for morning exercise. Local bakeries along the route even installed outdoor bike racks after noticing a steady rise in weekend customers stopping for fresh fruit pastries.',
          viSummary:
            'Nhóm học sinh trường Seaside High đã thiết kế tuyến đường đạp xe cuối tuần dài 8 km nối bến cảng với công viên Pinewood qua các ngõ dân cư yên tĩnh thay cho đường lớn nhiều xe tải. Tuyến đường thu hút cả người cao tuổi và giúp các tiệm bánh dọc đường đắt khách hơn.',
          questions: [
            {
              id: 'cam-r1-q1',
              questionType: 'Detail',
              question: 'Why did young cyclists avoid the previous route to Pinewood Park?',
              options: [
                'It was more than twenty kilometers long.',
                'Delivery vans frequently blocked the narrow road.',
                'Bicycles were banned near the town harbor.',
              ],
              correctIdx: 1,
              explanation: 'Trước kia đường hẹp và xe tải giao hàng thường đỗ dọc đường ("heavy delivery vans often parked along the narrow main road").',
            },
            {
              id: 'cam-r1-q2',
              questionType: 'Result',
              question: 'How did local bakeries respond to the new cycling trail?',
              options: [
                'They asked town engineers to close the bike lanes.',
                'They set up outdoor bicycle racks for weekend riders.',
                'They stopped opening on Saturday mornings.',
              ],
              correctIdx: 1,
              explanation: '"Local bakeries along the route even installed outdoor bike racks" để đón khách đạp xe cuối tuần.',
            },
            {
              id: 'cam-r1-q3',
              questionType: 'Main Purpose',
              question: 'What is the writer doing in this article?',
              options: [
                'Warning cyclists about dangerous road crossings',
                'Describing how a student-led cycling project benefited the whole community',
                'Advertising a bicycle repair shop near the park',
              ],
              correctIdx: 1,
              explanation: 'Bài viết thuật lại dự án đường đạp xe do học sinh khởi xướng đã mang lại lợi ích chung cho cộng đồng và hàng quán.',
            },
          ],
        },
        {
          id: 'cam-read-2',
          partLabel: 'FCE (B2) Reading & Use of English',
          title: 'Neighborhood Repair Cafés',
          level: 'B2',
          passage:
            'Across dozens of cities, community halls are transforming once a month into "Repair Cafés"—free pop-up workshops where residents bring broken toasters, torn jackets, or wobbly wooden chairs instead of throwing them into landfills. Retired electricians, tailors, and hobbyist carpenters sit beside visitors over cups of tea, guiding owners step by step through diagnosing faults and replacing worn parts.\n\nOrganizers stress that the movement is about far more than saving a few euros on household appliances. In an era when sleek electronic gadgets are often glued shut to discourage home repairs, learning how a simple switch or zipper works restores a sense of agency. Many first-time visitors arrive unsure how to hold a screwdriver and leave proud of having rescued a cherished family item—often returning the following month as volunteers themselves.',
          viSummary:
            'Mô hình "Repair Café" hàng tháng tập hợp thợ điện, thợ may về hưu hướng dẫn người dân tự sửa đồ gia dụng hỏng thay vì vứt bỏ, vừa giảm rác thải vừa khơi lại cảm giác tự chủ khi hiểu đồ vật vận hành thế nào.',
          questions: [
            {
              id: 'cam-r2-q1',
              questionType: 'Detail',
              question: 'How do volunteers at Repair Cafés interact with visitors?',
              options: [
                'They fix items behind closed doors while owners wait outside.',
                'They teach owners side by side how to diagnose and mend their items.',
                'They sell brand-new appliances at discounted prices.',
              ],
              correctIdx: 1,
              explanation: 'Tình nguyện viên ngồi cùng và hướng dẫn chủ đồ từng bước sửa chữa ("guiding owners step by step").',
            },
            {
              id: 'cam-r2-q2',
              questionType: 'Phrase Meaning',
              question: 'What does "restores a sense of agency" mean in paragraph 2?',
              options: [
                'Helps people open a real repair business',
                'Gives people confidence and control over fixing everyday objects',
                'Forces factories to change their warranties',
              ],
              correctIdx: 1,
              explanation: 'Tự biết cách công tắc hay khóa kéo hoạt động trả lại cho người dùng cảm giác chủ động, tự tin kiểm soát đồ đạc của mình.',
            },
            {
              id: 'cam-r2-q3',
              questionType: 'Inference',
              question: 'What commonly happens to people who successfully repair an item?',
              options: [
                'They complain about the lack of free glue.',
                'Many come back later to volunteer and help others.',
                'They throw away their old screwdrivers.',
              ],
              correctIdx: 1,
              explanation: 'Câu cuối nêu nhiều người sau khi sửa được đồ quý giá của gia đình đã quay lại vào tháng sau với tư cách tình nguyện viên.',
            },
          ],
        },
      ],
      listening: [
        {
          id: 'cam-listen-1',
          partLabel: 'PET Listening Practice',
          title: 'Joining a Weekend Pottery Workshop',
          level: 'B1',
          speakerContext: 'Sinh viên Ben gọi điện cho cô Clara hỏi thông tin lớp làm gốm cuối tuần.',
          audioScript:
            'Clara: Hello, Clayworks Studio, Clara speaking. Ben: Hi Clara, I saw your poster about Saturday’s beginner pottery class. Are there still places left? Clara: Yes, we have two spots open for the afternoon group from two to four thirty. The morning class is already full. Ben: Afternoon works well. Do I need to buy clay separately? Clara: No, clay and glazing are included in the twenty-pound fee. Just wear an old shirt you don’t mind getting dusty—we provide aprons too, though clay can splash onto sleeves. Ben: Got it! Where is the studio entrance? Clara: Walk past the post office on Market Street and turn into the courtyard beside the green bookshop.',
          viSummary:
            'Lớp gốm buổi sáng đã kín, chỉ còn 2 chỗ buổi chiều (14:00–16:30). Học phí 20 bảng đã gồm đất sét và men; học viên nên mặc áo cũ vì dễ bắn vào tay áo. Lối vào xưởng nằm trong sân cạnh hiệu sách màu xanh trên phố Market.',
          questions: [
            {
              id: 'cam-l1-q1',
              question: 'Which pottery session still has open spaces?',
              options: [
                'The morning session',
                'The afternoon session (2:00 – 4:30)',
                'The Sunday evening session',
              ],
              correctIdx: 1,
              explanation: 'Lớp sáng đã đầy ("already full"), chỉ còn 2 suất lớp chiều từ 2:00 đến 4:30.',
            },
            {
              id: 'cam-l1-q2',
              question: 'What does Clara advise Ben to wear?',
              options: [
                'Formal trousers',
                'An old shirt that can get dusty',
                'His own heavy apron only',
              ],
              correctIdx: 1,
              explanation: 'Cô khuyên mặc áo cũ ("wear an old shirt") vì đất sét có thể bắn lên tay áo.',
            },
            {
              id: 'cam-l1-q3',
              question: 'Where is the studio entrance located?',
              options: [
                'Opposite the train station',
                'Inside the courtyard beside the green bookshop',
                'Directly above the post office',
              ],
              correctIdx: 1,
              explanation: 'Đi qua bưu điện trên phố Market và rẽ vào sân cạnh hiệu sách màu xanh ("turn into the courtyard beside the green bookshop").',
            },
          ],
        },
        {
          id: 'cam-listen-2',
          partLabel: 'FCE Listening (Multiple Choice Interview)',
          title: 'Interview with an Urban Tree Planner',
          level: 'B2',
          speakerContext: 'Cuộc phỏng vấn phát thanh với kiến trúc sư cảnh quan Hannah về cây xanh đường phố.',
          audioScript:
            'Host: Hannah, residents often ask why city planners don’t simply plant fast-growing trees everywhere along pavements. Hannah: It is tempting when neighborhoods want instant shade! However, fast-growing varieties often develop shallow roots that crack sidewalks and snap easily in summer storms. We prefer mixing hardy native oaks with medium-height maples that adapt better to compact urban soil. Host: And what is the biggest misconception citizens have about street trees? Hannah: Many assume once a sapling is planted in spring, rain takes care of everything. In reality, newly planted urban trees face reflected heat from asphalt, so consistent watering by local residents during the first two summers makes the biggest difference to survival.',
          viSummary:
            'Cây mọc nhanh dễ nông rễ, làm nứt vỉa hè và gãy đổ khi bão, nên Hannah ưu tiên kết hợp cây bản địa khỏe. Hiểu lầm lớn nhất của người dân là nghĩ nước mưa tự lo hết, trong khi cây mới trồng cần người dân tưới đều trong 2 mùa hè đầu vì hơi nóng từ mặt đường nhựa.',
          questions: [
            {
              id: 'cam-l2-q1',
              question: 'Why does Hannah avoid planting only fast-growing tree varieties along sidewalks?',
              options: [
                'They never produce enough summer shade.',
                'Their shallow roots can damage pavements and break in storms.',
                'They cost three times more than native oaks.',
              ],
              correctIdx: 1,
              explanation: 'Cây lớn nhanh hay có rễ nông làm nứt vỉa hè ("crack sidewalks") và dễ gãy trong bão hè.',
            },
            {
              id: 'cam-l2-q2',
              question: 'What helps newly planted street trees survive their first two summers?',
              options: [
                'Regular watering from local residents',
                'Removing surrounding asphalt pavements',
                'Planting them strictly in winter snow',
              ],
              correctIdx: 0,
              explanation: 'Do hơi nóng phản xạ từ nhựa đường, việc người dân tưới nước đều đặn trong 2 mùa hè đầu quyết định tỷ lệ sống của cây.',
            },
          ],
        },
      ],
      writing: [
        {
          id: 'cam-w-email',
          taskLabel: 'PET / KET Writing Part 1 (Informal Email)',
          title: 'Organizing a Class Farewell Picnic with a Friend',
          recommendedMinutes: 20,
          wordCountRange: '90 – 120 từ',
          minWords: 80,
          prompt:
            'Read this email from your English friend Alex:\n"Hi! Let’s organize a class picnic next Saturday to celebrate finishing our exams! Which park should we choose? What food should I bring, and what games can we play together?"\nWrite an email to Alex answering all his questions (around 100 words).',
          promptVi:
            'Viết email cho Alex trả lời đủ 3 ý: chọn công viên nào, Alex nên mang đồ ăn gì và cả nhóm chơi trò gì.',
          outline: [
            'Mở đầu thân thiện: Hào hứng hưởng ứng ý tưởng picnic.',
            'Ý 1 (Địa điểm): Đề xuất công viên có bãi cỏ rộng và bóng mát (ví dụ Riverside Park).',
            'Ý 2 (Đồ ăn): Đề xuất Alex mang trái cây/bánh sandwich vì mình sẽ mang đồ uống.',
            'Ý 3 (Trò chơi): Gợi ý mang bóng chuyền hoặc bài Uno/đố vui âm nhạc.',
          ],
          scoringCriteriaFocus: [
            'Content: Phải trả lời cả 3 câu hỏi của Alex.',
            'Communicative Achievement: Giọng văn bạn bè thân mật, tự nhiên.',
          ],
          highBandKeywords: [
            { phrase: 'count me in', meaningVi: 'cho mình tham gia với / nhất trí luôn' },
            { phrase: 'shady lawn', meaningVi: 'bãi cỏ râm mát' },
            { phrase: 'how about bringing', meaningVi: 'bạn mang ... thì sao nhỉ?' },
            { phrase: 'can’t wait to catch up', meaningVi: 'rất mong sớm được gặp trò chuyện' },
          ],
          modelAnswer:
            'Hi Alex,\n\nCount me in—celebrating the end of exams with a picnic is a brilliant idea!\n\nI think Riverside Park would be the best spot because it has a huge shady lawn near the lake and is easy for everyone to reach by bus. Since I am bringing homemade lemonade and paper cups, how about bringing some fresh fruit and cheese sandwiches? Don’t worry about dessert, because Mia promised to bake chocolate brownies.\n\nFor entertainment, let’s bring a frisbee and a pack of board cards so everyone can join in after lunch.\n\nSee you next Saturday at ten!\n\nBest,\nHieu',
          modelNotesVi:
            'Độ dài ~103 từ chuẩn format PET, trả lời tự nhiên cả 3 câu hỏi và dùng cấu trúc gợi ý chuẩn B1 ("how about bringing...", "Count me in").',
        },
        {
          id: 'cam-w-essay',
          taskLabel: 'FCE (B2 First) Part 1 Compulsory Essay',
          title: 'Should Schools Replace Printed Textbooks with Digital Tablets?',
          recommendedMinutes: 40,
          wordCountRange: '140 – 190 từ',
          minWords: 135,
          prompt:
            'In your English class, you have been talking about modern education. Now your teacher has asked you to write an essay:\n"Should schools replace printed textbooks with digital tablets for all students?"\nNotes — Write about:\n1. Cost and portability\n2. Concentration and eyesight\n3. [Your own idea]\nWrite 140–190 words.',
          promptVi:
            'Viết bài luận FCE (140–190 từ) phân tích đủ 2 gợi ý của đề (chi phí & sự gọn nhẹ; khả năng tập trung & thị lực) cộng thêm 1 ý thứ 3 của riêng bạn (ví dụ: cập nhật kiến thức/môi trường).',
          outline: [
            'Introduction: Nêu bối cảnh chuyển đổi số trường học + câu mở đầu dẫn vào luận điểm.',
            'Body 1 (Portability & Up-to-date content — Ý 1 + Ý tự thêm): Máy tính bảng nhẹ hơn mang nhiều sách nặng và cập nhật tài liệu mới nhanh chóng.',
            'Body 2 (Concentration & Cost — Ý 2): Tuy nhiên màn hình dễ gây mỏi mắt, xao nhãng thông báo và chi phí bảo trì cao.',
            'Conclusion: Kết luận nên dùng song song cả hai thay vì xóa bỏ hoàn toàn sách giấy.',
          ],
          scoringCriteriaFocus: [
            'Content: Phải xuất hiện đủ cả 3 điểm (2 notes đề bài + 1 own idea).',
            'Language: Từ vựng chuẩn B2, kiểm soát giới hạn 140–190 từ sắc gọn.',
          ],
          highBandKeywords: [
            { phrase: 'lighten heavy backpacks', meaningVi: 'giảm nhẹ ba lô nặng nề' },
            { phrase: 'instant content updates', meaningVi: 'cập nhật nội dung tức thì' },
            { phrase: 'digital eye strain', meaningVi: 'mỏi mắt do màn hình điện tử' },
            { phrase: 'pop-up notifications', meaningVi: 'thông báo bật lên gây mất tập trung' },
            { phrase: 'strike a healthy balance', meaningVi: 'đạt sự cân bằng hợp lý' },
          ],
          modelAnswer:
            'Digital tablets are becoming common in classrooms, prompting debate over whether schools should completely abandon printed textbooks. Although tablets offer practical convenience, replacing paper books altogether may not be wise.\n\nOn the positive side, a single tablet can store dozens of manuals, which helps lighten heavy backpacks for younger learners. Moreover, an important advantage is instant content updates: digital science or geography resources can be corrected immediately without reprinting thousands of pages, saving paper in the long run.\n\nNevertheless, relying solely on screens raises serious concerns regarding cost and concentration. Purchasing and repairing devices places a heavy financial burden on families and school budgets. Equally worrying, prolonged reading causes digital eye strain, while pop-up notifications frequently distract teenagers from deep study.\n\nIn conclusion, schools should strike a healthy balance by using tablets for interactive exercises while keeping printed textbooks for focused reading.',
          modelNotesVi:
            'Độ dài ~158 từ nằm gọn trong khung 140–190 từ của FCE, bao quát đủ 2 gợi ý của đề + 1 ý riêng ("instant content updates & saving paper").',
        },
      ],
      speaking: [
        {
          id: 'cam-s-p1',
          partLabel: 'Speaking Part 1 (Interview — KET/PET)',
          title: 'Daily Travel & Favorite Weekend Places',
          prepTimeText: 'Trả lời ngay',
          speakTimeText: '20–30 giây / câu',
          prompt:
            '1. How do you usually travel to school or work?\n2. Tell us about a place in your town where you enjoy spending time with friends.',
          promptVi: 'Nói tự nhiên, mở rộng bằng 1 chi tiết thời gian hoặc cảm xúc.',
          sampleAnswer:
            'I usually take the public bus to work because the stop is only five minutes from my apartment, and listening to short podcasts makes the twenty-minute ride fly by. On weekends, my friends and I love hanging out at a small lakeside park near the city library. We often grab iced coffee, sit on the benches, and catch up on our week in the fresh air.',
          highScoreVocab: [
            { phrase: 'makes the ride fly by', meaningVi: 'khiến chuyến đi trôi qua rất nhanh' },
            { phrase: 'hanging out at', meaningVi: 'tụ tập thư giãn tại' },
            { phrase: 'catch up on our week', meaningVi: 'kể cho nhau nghe chuyện trong tuần' },
          ],
          deliveryTips: ['Trả lời trọn vẹn trong 2–3 câu; tránh trả lời chỉ 1 cụm ngắn.'],
        },
        {
          id: 'cam-s-p2',
          partLabel: 'Speaking Part 2 (FCE Photo Comparison — 1 Minute Long Turn)',
          title: 'Comparing Two Study Environments: Library vs Café',
          prepTimeText: 'Nói ngay khi nhận ảnh',
          speakTimeText: '1 phút nói liên tục',
          prompt:
            'Compare two photographs:\n• Photo A: A student studying quietly alone among tall shelves in a university library.\n• Photo B: Two students sharing laptops and smiling over drinks at a sunlit café table.\nQuestion: "Why might people choose to study in these different places?"',
          promptVi:
            'So sánh trực tiếp điểm giống/khác của hai bức ảnh trong 35 giây, rồi trả lời lý do lựa chọn trong 25 giây.',
          sampleAnswer:
            'Both photographs show young people focused on academic work using laptops, yet the atmospheres are completely different. In the first picture, a student is working alone in a quiet library surrounded by bookshelves, whereas the second photo depicts two friends collaborating together in a lively café. People might choose the library when they need absolute silence to prepare for difficult exams or avoid distractions. In contrast, a café is ideal for casual group projects because students can discuss ideas aloud, enjoy coffee, and feel energized by natural daylight without disturbing anyone.',
          highScoreVocab: [
            { phrase: 'whereas the second photo depicts', meaningVi: 'trong khi bức ảnh thứ hai miêu tả' },
            { phrase: 'need absolute silence', meaningVi: 'cần sự yên tĩnh tuyệt đối' },
            { phrase: 'feel energized by', meaningVi: 'cảm thấy tràn đầy năng lượng nhờ' },
          ],
          deliveryTips: [
            'Dùng cấu trúc tương phản ngay câu 2 ("whereas", "while", "on the other hand").',
            'Nhớ trả lời trực tiếp câu hỏi phía trên ảnh ("Why might people choose..."), không tả chi tiết màu áo quá lâu.',
          ],
        },
        {
          id: 'cam-s-p3',
          partLabel: 'Speaking Part 3 (Collaborative Task — Interaction)',
          title: 'Choosing New Facilities for a Community Youth Center',
          prepTimeText: '15 giây đọc sơ đồ',
          speakTimeText: '2 phút thảo luận + 1 phút chốt',
          prompt:
            'A town council wants to improve a youth center. Discuss the benefits of: (1) A coding lab, (2) An indoor climbing wall, (3) A music rehearsal room, (4) A quiet reading lounge — and decide which ONE would attract the most teenagers.',
          promptVi:
            'Tập cách trao đổi tương tác: nêu nhận xét + hỏi ý kiến bạn cùng thi + đi tới thống nhất.',
          sampleAnswer:
            'Shall we start with the coding lab? I think it is fantastic for teenagers who want practical tech skills, though some students already spend all day staring at screens. What is your view on the indoor climbing wall? Personally, I feel an active space like a climbing wall or a music rehearsal room brings teenagers together socially much better than a quiet reading lounge. So if we had to pick just one crowd-pleaser, I would lean toward the music rehearsal room because bands and solo singers could share it all week—do you agree?',
          highScoreVocab: [
            { phrase: 'what is your view on', meaningVi: 'quan điểm của bạn về ... thế nào?' },
            { phrase: 'crowd-pleaser', meaningVi: 'lựa chọn được đông đảo mọi người thích' },
            { phrase: 'lean toward', meaningVi: 'nghiêng về lựa chọn' },
          ],
          deliveryTips: [
            'Luôn chèn câu mời đối tác ("What do you think?", "Do you agree?") để đạt điểm cao mục Interactive Communication.',
          ],
        },
      ],
    },
    mockTest: {
      title: 'Cambridge Mini Mock Test (PET/FCE Level — 12 Câu)',
      description: 'Mô phỏng kết hợp Cambridge Listening, Use of English (Cloze, Word Formation, Key Word Transformation) & Reading.',
      durationMinutes: 15,
      questions: [
        {
          id: 'cam-mock-1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (KET/PET)',
          audioScript:
            'Woman: Have you bought your ticket for the photography exhibition yet? Man: I tried online, where student tickets are eight pounds, but the website crashed. Woman: Oh, at the door it is ten pounds—unless you bring your student card before noon, which drops it back to six pounds!',
          question: 'How much will the man pay if he brings his student card before 12:00 PM?',
          options: ['£6', '£8', '£10'],
          correctIdx: 0,
          explanation: 'Mua trực tiếp trước trưa kèm thẻ sinh viên giá giảm còn £6.',
        },
        {
          id: 'cam-mock-2',
          skill: 'listening',
          partLabel: 'Listening Part 2 (PET Monologue)',
          audioScript:
            'Announcement: Thanks for joining our annual river rowing competition! Please note that due to light wind this morning, the junior race will start at nine forty-five instead of nine thirty. Refreshments are served inside the boathouse.',
          question: 'What time will the junior rowing race begin?',
          options: ['9:15 AM', '9:30 AM', '9:45 AM'],
          correctIdx: 2,
          explanation: '"the junior race will start at nine forty-five instead of nine thirty".',
        },
        {
          id: 'cam-mock-3',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Travel Plan)',
          audioScript:
            'Tom: Did you end up taking the coastal train to Brighton? Lisa: The train tickets sold out early, so I hopped on an express coach. It took twenty minutes longer, yet the cliff views along the highway were stunning!',
          question: 'How did Lisa feel about her coach journey?',
          options: [
            'Annoyed because the scenery was dull',
            'Pleased because she enjoyed the views along the way',
            'Disappointed that coaches cost more than trains',
          ],
          correctIdx: 1,
          explanation: 'Dù lâu hơn 20 phút nhưng cô thấy cảnh vách đá dọc đường rất tuyệt ("the cliff views along the highway were stunning!").',
        },
        {
          id: 'cam-mock-4',
          skill: 'listening',
          partLabel: 'Listening Part 4 (FCE Interview)',
          audioScript:
            'Host: What made you switch from writing novels to composing video game soundtracks? Composer: Writing novels felt quite solitary, whereas scoring games lets me collaborate daily with visual artists and programmers—watching a scene come alive when music hits is unbeatable.',
          question: 'What motivated the composer to write video game music?',
          options: [
            'Novels took too many years to publish.',
            'She enjoys daily teamwork with artists and programmers.',
            'Game studios paid twice as much.',
          ],
          correctIdx: 1,
          explanation: '"scoring games lets me collaborate daily with visual artists and programmers".',
        },
        {
          id: 'cam-mock-5',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Opinion)',
          audioScript:
            'Host: Do you think artificial intelligence tools will replace human sound designers? Composer: They can generate quick background loops, certainly, yet understanding subtle emotional pacing in a story still requires a human ear.',
          question: 'What is the composer’s opinion about AI in sound design?',
          options: [
            'AI will completely replace human composers soon.',
            'AI helps with quick loops, but human judgment remains essential for emotion.',
            'AI is unable to create any background music.',
          ],
          correctIdx: 1,
          explanation: 'AI tạo được vòng lặp nhạc nền nhanh, nhưng cảm nhận nhịp điệu cảm xúc vẫn cần đôi tai con người.',
        },
        {
          id: 'cam-mock-6',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Cloze)',
          question: 'During the trek, our guide warned us to _____ an eye on weather clouds gathering over the ridge.',
          options: ['make', 'keep', 'take', 'put'],
          correctIdx: 1,
          explanation: 'Thành ngữ/Collocation chuẩn: "keep an eye on" (để mắt, theo dõi cẩn thận).',
        },
        {
          id: 'cam-mock-7',
          skill: 'grammar',
          partLabel: 'Use of English Part 2 (Open Cloze)',
          question: 'Choose ONE missing word: "Hardly had the outdoor concert begun _____ a sudden summer shower sent everyone running for cover."',
          options: ['than', 'when', 'while', 'after'],
          correctIdx: 1,
          explanation: 'Cấu trúc đảo ngữ FCE kinh điển: "Hardly had + S + V3 ... when + S + V2" (No sooner đi với than; Hardly/Scarcely đi với when).',
        },
        {
          id: 'cam-mock-8',
          skill: 'vocab',
          partLabel: 'Use of English Part 3 (Word Formation)',
          question: 'Transform the word "PATIENT" to fit the sentence: "Waiting two hours at the delayed ferry terminal tested everyone’s _____ ."',
          options: ['patiently', 'impatient', 'patience', 'impatiently'],
          correctIdx: 2,
          explanation: 'Sau sở hữu cách "everyone’s" cần một danh từ -> "patience" (sự kiên nhẫn).',
        },
        {
          id: 'cam-mock-9',
          skill: 'grammar',
          partLabel: 'Use of English Part 4 (Key Word Transformation)',
          question: '"People believe that ancient sailors used star charts to cross the bay." (BELIEVED) → "Ancient sailors _____ star charts to cross the bay."',
          options: [
            'are believed to have used',
            'are believed using',
            'believed to use',
            'were believing to use',
          ],
          correctIdx: 0,
          explanation: 'Bị động kép cho hành động quá khứ ("used"): "S + are believed + to have + V3/ed".',
        },
        {
          id: 'cam-mock-10',
          skill: 'reading',
          partLabel: 'Reading (PET Sign)',
          passage:
            'SWIMMING POOL NOTICE:\nLockers require a £1 coin, which is returned when you unlock the door. Please do not leave valuables unattended on poolside benches.',
          question: 'What happens to the £1 coin used in the locker?',
          options: [
            'The pool keeps it as a rental fee.',
            'You get it back after unlocking your locker.',
            'You exchange it for a towel at reception.',
          ],
          correctIdx: 1,
          explanation: '"which is returned when you unlock the door" (xu sẽ được trả lại khi mở khóa tủ).',
        },
        {
          id: 'cam-mock-11',
          skill: 'reading',
          partLabel: 'Reading (FCE Paragraph Q11–Q12)',
          passage:
            'When archaeologist Dr. Priya Nair uncovered fragments of Roman glass beads in an ancient coastal trading post in southern India, she initially assumed they had arrived via overland caravans. Chemical testing of the sand composition, however, matched Mediterranean workshops, pointing instead to direct monsoon-driven maritime voyages nearly two thousand years ago.',
          question: 'What changed Dr. Nair’s initial theory about how the glass beads arrived?',
          options: [
            'Written caravan diaries found nearby',
            'Laboratory analysis matching Mediterranean sand chemistry',
            'Wooden shipwrecks discovered in the mountains',
          ],
          correctIdx: 1,
          explanation: 'Phân tích hóa học thành phần cát ("Chemical testing of the sand composition") trùng khớp xưởng Địa Trung Hải chứng minh tuyến hàng hải trực tiếp.',
        },
        {
          id: 'cam-mock-12',
          skill: 'reading',
          partLabel: 'Reading (FCE Paragraph Q11–Q12)',
          passage:
            'When archaeologist Dr. Priya Nair uncovered fragments of Roman glass beads in an ancient coastal trading post in southern India, she initially assumed they had arrived via overland caravans. Chemical testing of the sand composition, however, matched Mediterranean workshops, pointing instead to direct monsoon-driven maritime voyages nearly two thousand years ago.',
          question: 'What does "pointing instead to" imply about the ancient trade?',
          options: [
            'Overland caravans were completely imaginary.',
            'Direct sea routes played a key role in carrying those goods.',
            'Glass beads were made exclusively in southern India.',
          ],
          correctIdx: 1,
          explanation: 'Bằng chứng hướng tới việc giao thương qua các chuyến hải hành trực tiếp nhờ gió mùa ("monsoon-driven maritime voyages").',
        },
      ],
    },
    rubricCriteria: [
      {
        id: 'cam-rub-cont',
        appliesTo: 'writing',
        name: 'Content',
        nameVi: 'Nội dung & Đủ ý yêu cầu',
        weightText: 'Thang 0–5 (Writing)',
        description: 'Bao phủ toàn bộ các điểm nội dung được yêu cầu trong đề bài (kể cả ý thứ 3 tự thêm trong FCE Essay).',
        highScoreBenchmarks: ['Trả lời mọi câu hỏi phụ trong Email', 'FCE Essay đủ 2 ý cho sẵn + 1 ý mới'],
      },
      {
        id: 'cam-rub-ca',
        appliesTo: 'writing',
        name: 'Communicative Achievement',
        nameVi: 'Hiệu quả giao tiếp & Văn phong thể loại',
        weightText: 'Thang 0–5 (Writing)',
        description: 'Dùng đúng giọng văn phù hợp thể loại (Email thân mật, Article cuốn hút, Essay trang trọng) và giữ sự chú ý của người đọc.',
        highScoreBenchmarks: ['Không trộn văn phong suồng sã vào Essay trang trọng', 'Thể hiện quan điểm rõ ràng'],
      },
      {
        id: 'cam-rub-org',
        appliesTo: 'writing',
        name: 'Organisation',
        nameVi: 'Tổ chức đoạn & Liên kết',
        weightText: 'Thang 0–5 (Writing)',
        description: 'Sắp xếp đoạn mạch lạc, sử dụng từ nối và phép liên kết đa dạng phù hợp bậc A2/B1/B2.',
        highScoreBenchmarks: ['Dùng đa dạng linking words ("Whereas", "Consequently")', 'Phân đoạn hợp lý'],
      },
      {
        id: 'cam-rub-lang',
        appliesTo: 'both',
        name: 'Language (Grammar & Vocabulary)',
        nameVi: 'Ngữ pháp & Từ vựng (Use of English)',
        weightText: 'Thang 0–5 (W & S)',
        description: 'Độ đa dạng collocation, cụm động từ (phrasal verbs), cấu trúc câu phức và độ chính xác ngữ pháp.',
        highScoreBenchmarks: ['Sử dụng từ vựng chính xác theo ngữ cảnh', 'Kiểm soát lỗi thì và hòa hợp chủ-vị'],
      },
      {
        id: 'cam-rub-dm',
        appliesTo: 'speaking',
        name: 'Discourse Management & Pronunciation',
        nameVi: 'Phát triển lời nói & Phát âm',
        weightText: 'Thang 0–5 (Speaking)',
        description: 'Khả năng so sánh 2 ảnh mạch lạc trong 1 phút (FCE) và phát âm rõ trọng âm, ngữ điệu.',
        highScoreBenchmarks: ['Không ngập ngừng quá lâu khi so sánh ảnh', 'Phát âm rõ các phụ âm cuối'],
      },
      {
        id: 'cam-rub-int',
        appliesTo: 'speaking',
        name: 'Interactive Communication',
        nameVi: 'Kỹ năng tương tác cặp đôi',
        weightText: 'Thang 0–5 (Speaking)',
        description: 'Khả năng khởi xướng trao đổi, phản hồi ý của bạn thi cặp và cùng thống nhất quyết định.',
        highScoreBenchmarks: ['Biết mời bạn nói và mở rộng ý của bạn', 'Không độc chiếm hoặc im lặng thụ động'],
      },
    ],
  },

  toefl: {
    examType: 'toefl',
    title: 'TOEFL iBT (Chuẩn Học Thuật Bắc Mỹ)',
    subtitle: 'Đánh giá năng lực sử dụng tiếng Anh học thuật đại học qua các bài đọc, bài giảng & tổng hợp thông tin.',
    badgeEmoji: '🎓',
    totalDurationText: 'Khoảng 1 giờ 56 phút (Reading 35p • Listening 36p • Speaking 16p • Writing 29p)',
    scoreScale: '0 – 120 điểm (Mỗi kỹ năng 0 – 30 điểm)',
    disclaimerNote: EXAM_DISCLAIMER,
    cefrMapping: [
      { cefr: 'A2', scoreRange: '0 – 41 / 120', description: 'Mức nền tảng; cần phát triển từ vựng học thuật và cấu trúc câu dài.' },
      { cefr: 'B1', scoreRange: '42 – 71 / 120', description: 'Hiểu ý chính bài giảng đơn giản và trình bày ý kiến cơ bản.' },
      { cefr: 'B2', scoreRange: '72 – 94 / 120', description: 'Đạt yêu cầu đầu vào phổ biến của các trường Đại học quốc tế.' },
      { cefr: 'C1', scoreRange: '95 – 120 / 120', description: 'Năng lực học thuật xuất sắc cho học bổng, nghiên cứu & bậc Sau Đại học.' },
    ],
    sections: [
      {
        id: 'toefl-r',
        skill: 'Reading',
        partName: 'Reading (2 Academic Passages — 20 câu)',
        duration: '35 phút',
        tasksOrQuestions: '2 bài đọc học thuật dài ~700 từ (10 câu/bài)',
        strategies: [
          'Nắm chắc 9 dạng câu hỏi TOEFL: Factual, Negative Factual (EXCEPT), Inference, Rhetorical Purpose ("Why does the author mention..."), Vocab in Context, Sentence Simplification, Insert Text, Prose Summary.',
          'Sentence Simplification: tách các ý chính (nguyên nhân – kết quả – nhượng bộ) của câu được tô đậm rồi loại phương án bóp méo quan hệ logic hoặc bỏ sót ý chính.',
          'Prose Summary (chọn 3/6 câu cuối bài): loại các câu chỉ là chi tiết nhỏ lẻ hoặc sai lệch thông tin văn bản.',
        ],
        commonTraps: [
          'Đáp án Sentence Simplification trông đúng ngữ pháp nhưng đảo ngược nguyên nhân – kết quả của câu gốc.',
          'Câu hỏi Rhetorical Purpose hỏi TẠI SAO tác giả nêu ví dụ chứ không hỏi ví dụ đó là gì.',
        ],
      },
      {
        id: 'toefl-l',
        skill: 'Listening',
        partName: 'Listening (Lectures & Campus Conversations — 28 câu)',
        duration: '36 phút (không hiển thị câu hỏi trước khi nghe)',
        tasksOrQuestions: '3 Academic Lectures (6 câu/bài) + 2 Campus Conversations (5 câu/bài)',
        strategies: [
          'Luyện kỹ năng Note-taking theo cột (Khái niệm – Ví dụ – Thái độ giảng viên) vì bạn KHÔNG thấy câu hỏi trước khi băng chạy.',
          'Chú ý tín hiệu chuyển phần của giáo sư ("Now, turning to...", "Let me illustrate with...", "Surprisingly, though...") — câu hỏi hay rơi ngay vào đoạn chuyển ý và ví dụ.',
          'Nghe câu hỏi Function / Replay ("Why does the professor say this?") bằng cách nhớ lại ngữ cảnh cảm xúc ngay trước câu nói đó.',
        ],
        commonTraps: [
          'Ghi chép quá chi tiết từng chữ khiến lỡ mất mạch lập luận chính của bài giảng.',
          'Nhầm giữa lý thuyết cũ mà bài giảng nhắc tới để bác bỏ với kết luận mới của giáo sư.',
        ],
      },
      {
        id: 'toefl-s',
        skill: 'Speaking',
        partName: 'Speaking (4 Tasks — 16 phút)',
        duration: 'Task 1 Independent (15s/45s) • Tasks 2–4 Integrated (30s/60s)',
        tasksOrQuestions: 'Task 1 Quan điểm • Task 2 Đời sống Campus • Task 3 Khái niệm học thuật • Task 4 Tóm tắt Lecture',
        strategies: [
          'Task 1 (45s): Dùng khung 1-2-3 siêu gọn: Câu 1 chốt lựa chọn → 15s đầu cho Lý do 1 + ví dụ → 20s sau cho Lý do 2 + ví dụ.',
          'Task 2 (Campus): Dành 15s tóm tắt thông báo trường → 45s thuật lại quan điểm + 2 lý do của người nói chính trong hội thoại.',
          'Task 3 & 4 (Academic): Định nghĩa thuật ngữ trong 15s đầu rồi dùng phần thời gian còn lại giải thích thật chi tiết ví dụ của giáo sư.',
        ],
        commonTraps: [
          'Task 2–4 đưa ý kiến cá nhân vào bài nói — các bài Integrated CHỈ chấm khả năng tổng hợp trung thực nguồn đọc và nghe!',
          'Mất 20 giây để giới thiệu dài dòng khiến thiếu thời gian giải thích ví dụ cốt lõi ở phần cuối.',
        ],
      },
      {
        id: 'toefl-w',
        skill: 'Writing',
        partName: 'Writing (2 Tasks — 29 phút)',
        duration: 'Task 1 Integrated (20p) • Task 2 Academic Discussion (10p)',
        tasksOrQuestions: 'Task 1: Tổng hợp Bài đọc vs Bài giảng (150–225 từ) • Task 2: Thảo luận diễn đàn học thuật (≥100 từ)',
        strategies: [
          'Task 1 Integrated: Không nêu quan điểm cá nhân! Trình bày lần lượt 3 luận điểm của Bài đọc và cách Bài giảng phản bác (hoặc bổ trợ) từng điểm đó.',
          'Task 2 Academic Discussion (format mới): Chỉ có 10 phút — đọc nhanh câu hỏi giáo sư và ý 2 sinh viên mẫu, sau đó viết 1 đoạn sắc nét (~120–150 từ) đóng góp góc nhìn mới hoặc phản biện có dẫn chứng rõ.',
        ],
        commonTraps: [
          'Chép lại nguyên văn câu trong Reading ở Task 1 hoặc quên mất nội dung phản bác trong Listening Lecture.',
          'Task 2 Academic Discussion viết quá ngắn dưới 100 từ hoặc chỉ nhắc lại y hệt ý của một bạn sinh viên mà không phát triển thêm lập luận mới.',
        ],
      },
    ],
    diagnosticQuestions: [
      {
        id: 'toefl-diag-1',
        skill: 'listening',
        partLabel: 'Campus Conversation',
        audioScript:
          'Student: Professor Miller, I was hoping to switch my research paper topic from urban rooftop gardens to desalination plants. Professor: Well, desalination is fascinating, Maya, though we are already in week eight and your literature outline is due next Tuesday. Finding twenty peer-reviewed sources in five days might stretch you thin. Why don’t you focus on water-saving rooftop irrigation instead, which builds directly on the articles you have already gathered?',
        question: 'Why does Professor Miller advise Maya against changing her topic to desalination plants?',
        options: [
          'The topic is unrelated to environmental science.',
          'There is too little time left before next Tuesday’s outline deadline.',
          'The university library has no books on water issues.',
          'Another student already selected rooftop irrigation.',
        ],
        correctIdx: 1,
        explanation:
          'Giáo sư lưu ý đang là tuần 8 và thứ Ba tới đã phải nộp dàn ý tài liệu ("already in week eight and your literature outline is due next Tuesday"), tìm 20 nguồn mới trong 5 ngày sẽ quá tải.',
      },
      {
        id: 'toefl-diag-2',
        skill: 'listening',
        partLabel: 'Academic Lecture (Rhetorical Function)',
        audioScript:
          'Professor: When studying coral reefs, marine biologists talk about symbiosis. Think of cleaner wrasse—tiny fish that swim right inside the mouths of huge groupers to eat parasites. Now, why wouldn’t the hungry grouper simply swallow that little cleaner fish? Because having parasites removed keeps the grouper healthy far longer than one tiny snack ever would.',
        question: 'Why does the professor mention cleaner wrasse and groupers?',
        options: [
          'To explain why groupers migrate to colder waters',
          'To illustrate a mutually beneficial relationship in reef ecosystems',
          'To show that small fish frequently harm larger predators',
          'To criticize how divers feed reef animals',
        ],
        correctIdx: 1,
        explanation:
          'Giáo sư đưa ví dụ cá nhỏ ăn ký sinh trùng trong miệng cá mú lớn để minh họa khái niệm cộng sinh đôi bên cùng có lợi ("symbiosis").',
      },
      {
        id: 'toefl-diag-3',
        skill: 'reading',
        partLabel: 'Reading (Vocabulary in Context)',
        passage:
          'Although early nineteenth-century telegraph cables suffered frequent signal loss under ocean pressure, later engineers introduced gutta-percha insulation, which rendered transatlantic messages remarkably reliable.',
        question: 'The word "rendered" in the passage is closest in meaning to:',
        options: ['delayed', 'made', 'canceled', 'copied'],
        correctIdx: 1,
        explanation:
          'Cấu trúc "render + O + adj" có nghĩa tương đương "make + O + adj" (làm cho thông điệp xuyên Đại Tây Dương trở nên đáng tin cậy).',
      },
      {
        id: 'toefl-diag-4',
        skill: 'reading',
        partLabel: 'Reading (Negative Factual)',
        passage:
          'Archaeologists excavating Bronze Age settlements in Anatolia uncovered clay storage jars, obsidian cutting blades, and bronze sewing needles. Surprisingly, despite the proximity to coastal trade routes, no seashell jewelry appeared anywhere in the upper residential layers.',
        question: 'According to the passage, ALL of the following were discovered at the excavation site EXCEPT:',
        options: [
          'Clay storage jars',
          'Obsidian cutting blades',
          'Bronze sewing needles',
          'Seashell jewelry in upper layers',
        ],
        correctIdx: 3,
        explanation:
          'Câu thứ hai nói rõ: "no seashell jewelry appeared anywhere in the upper residential layers" (không thấy trang sức vỏ sò).',
      },
      {
        id: 'toefl-diag-5',
        skill: 'reading',
        partLabel: 'Reading (Rhetorical Purpose)',
        passage:
          'Desert succulents such as cacti survive months without rainfall by storing water inside thick stems and opening their leaf pores only at night. By opening pores in cooler darkness rather than midday heat, these plants cut evaporation loss dramatically while still absorbing carbon dioxide.',
        question: 'Why does the author mention "cooler darkness" in sentence 2?',
        options: [
          'To explain how night pore-opening reduces water evaporation',
          'To argue that desert nights are too cold for plant growth',
          'To compare cacti stems with tropical tree trunks',
          'To show why carbon dioxide disappears during the day',
        ],
        correctIdx: 0,
        explanation:
          'Chi tiết mở lỗ khí vào ban đêm mát mẻ giải thích cơ chế giúp cây giảm thiểu mất nước do bay hơi.',
      },
      {
        id: 'toefl-diag-6',
        skill: 'reading',
        partLabel: 'Reading (Sentence Simplification)',
        passage:
          'Target sentence: "While early steam locomotives consumed vast amounts of coal to pull modest freight loads, compound-expansion engines reused pressurized steam across two cylinders, doubling hauling efficiency without enlarging the boiler."',
        question: 'Which sentence best expresses the essential information in the highlighted sentence?',
        options: [
          'Compound-expansion engines required much larger boilers to double coal consumption.',
          'Unlike inefficient early locomotives, compound-expansion engines doubled hauling efficiency by reusing steam across two cylinders.',
          'Early steam locomotives pulled heavier freight than compound-expansion engines.',
          'Pressurized steam damaged two-cylinder boilers when hauling coal.',
        ],
        correctIdx: 1,
        explanation:
          'Phương án B giữ trọn 2 ý cốt lõi: đối lập với đầu máy đời đầu tốn than, động cơ giãn nở kép tái sử dụng hơi nước qua 2 xi-lanh giúp tăng gấp đôi hiệu suất kéo mà không cần tăng kích thước nồi hơi.',
      },
      {
        id: 'toefl-diag-7',
        skill: 'vocab',
        partLabel: 'Writing Task 2 (Academic Discussion)',
        question: 'In TOEFL Writing Task 2 (Academic Discussion — 10 minutes), what earns the highest score?',
        options: [
          'Writing a 5-paragraph memorized introduction without answering the professor’s prompt',
          'Repeating one classmate’s opinion word for word',
          'Stating a clear position, adding a fresh idea with concrete reasoning, and engaging with the discussion thread naturally',
          'Listing bullet fragments without complete sentences',
        ],
        correctIdx: 2,
        explanation:
          'Task 2 chấm cao nhất khi đóng góp được quan điểm rõ ràng, phát triển ý tưởng mới có lập luận/ví dụ và kết nối tự nhiên với luồng thảo luận lớp học.',
      },
      {
        id: 'toefl-diag-8',
        skill: 'grammar',
        partLabel: 'Academic Grammar & Precision',
        question: 'Choose the sentence with accurate academic structure for TOEFL Integrated Writing:',
        options: [
          'The lecturer challenges the reading’s claim by pointing out that ancient ships lacked iron nails.',
          'The lecturer disagree with reading because ships no have iron nails.',
          'In my personal opinion, the reading passage is totally wrong about iron nails.',
          'Whereas the reading states ships used nails, so the lecturer thinks differently.',
        ],
        correctIdx: 0,
        explanation:
          'Integrated Writing cần văn phong khách quan thuật lại ("challenges the reading’s claim by pointing out that...") và chuẩn ngữ pháp mệnh đề danh ngữ.',
      },
    ],
    skillPractice: {
      reading: [
        {
          id: 'toefl-read-1',
          partLabel: 'Academic Reading — Environmental Science',
          title: 'Geothermal Energy in Tectonically Active Regions',
          level: 'C1',
          passage:
            'Beneath Earth’s crust, pockets of molten rock heat underground aquifers, creating reservoirs of high-pressure steam and superheated water. In tectonically active nations such as Iceland and New Zealand, engineers tap these geothermal reservoirs through deep wells to drive electricity turbines continuously. Unlike wind turbines or solar panels, which fluctuate with passing clouds and calm afternoons, geothermal plants deliver steady baseload power twenty-four hours a day regardless of weather.\n\nNevertheless, harnessing geothermal energy is not free of constraints. Drilling kilometers into volcanic bedrock demands substantial upfront capital before a single kilowatt reaches consumers, and only regions positioned near geological plate boundaries possess shallow heat gradients economical for electricity generation. Furthermore, extracted underground steam sometimes carries dissolved hydrogen sulfide gas, requiring closed-loop reinjection systems to prevent local air odor and maintain reservoir pressure over decades.',
          viSummary:
            'Năng lượng địa nhiệt tạo điện nền ổn định 24/7 không phụ thuộc thời tiết như điện gió/mặt trời. Tuy nhiên chi phí khoan sâu ban đầu rất lớn, phụ thuộc vị trí gần ranh giới mảng kiến tạo và cần hệ thống bơm hoàn nguyên khép kín để xử lý khí H2S và giữ áp suất bể chứa.',
          questions: [
            {
              id: 'toefl-r1-q1',
              questionType: 'Factual Comparison',
              question: 'What advantage do geothermal plants have over solar and wind power according to paragraph 1?',
              options: [
                'They require zero upfront drilling investment.',
                'They provide constant baseload electricity independent of weather changes.',
                'They can be built cheaply anywhere far from plate boundaries.',
                'They operate only during sunny afternoons.',
              ],
              correctIdx: 1,
              explanation: 'Đoạn 1 nhấn mạnh: khác điện gió/mặt trời thay đổi theo thời tiết, địa nhiệt cung cấp "steady baseload power twenty-four hours a day regardless of weather".',
            },
            {
              id: 'toefl-r1-q2',
              questionType: 'Negative Factual',
              question: 'According to paragraph 2, all of the following are challenges of geothermal power EXCEPT:',
              options: [
                'High initial capital required for deep drilling',
                'Dependence on proximity to geological plate boundaries',
                'Dissolved hydrogen sulfide gas in extracted steam',
                'Inability to generate electricity at night',
              ],
              correctIdx: 3,
              explanation: 'Địa nhiệt chạy 24/7 kể cả ban đêm, nên D hoàn toàn sai với thông tin bài đọc.',
            },
            {
              id: 'toefl-r1-q3',
              questionType: 'Vocabulary in Context',
              question: 'The word "constraints" in paragraph 2 is closest in meaning to:',
              options: ['advantages', 'limitations', 'forecasts', 'turbines'],
              correctIdx: 1,
              explanation: '"Not free of constraints" nghĩa là không tránh khỏi những hạn chế/ràng buộc ("limitations").',
            },
          ],
        },
        {
          id: 'toefl-read-2',
          partLabel: 'Academic Reading — History & Technology',
          title: 'Mechanical Clocks and Medieval Guild Schedules',
          level: 'B2',
          passage:
            'Before mechanical tower clocks appeared in European market squares around the early fourteenth century, daily labor followed "variable hours" measured by sundials: a daytime hour lasted longer in midsummer than in December. While natural sunlight worked well for seasonal farming, expanding textile guilds needed uniform units to coordinate weavers, dyers, and merchants arriving from distant towns.\n\nOnce weight-driven escapement clocks began striking twenty-four equal hours from cathedral towers, urban workshops standardized shift bells and wage contracts around fixed clock time. Historians note that mechanical timekeeping did not merely record existing routines; by separating work schedules from sunset and sunrise, it gradually fostered modern expectations of punctuality and synchronized commerce.',
          viSummary:
            'Trước đồng hồ cơ thế kỷ 14, giờ ban ngày co giãn theo mùa. Khi các phường hội dệt may mở rộng, đồng hồ tháp đánh 24 giờ bằng nhau giúp chuẩn hóa ca làm, hợp đồng lương và định hình văn hóa đúng giờ trong thương mại hiện đại.',
          questions: [
            {
              id: 'toefl-r2-q1',
              questionType: 'Detail',
              question: 'Why were sundial-measured hours inconvenient for expanding textile guilds?',
              options: [
                'Sundials broke whenever weights were attached.',
                'The length of each daytime hour varied across seasons.',
                'Merchants refused to work before noon.',
                'Cathedral towers blocked all summer sunlight.',
              ],
              correctIdx: 1,
              explanation: 'Đồng hồ mặt trời chia giờ ban ngày dài hơn vào mùa hè và ngắn hơn vào mùa đông ("variable hours"), gây khó khăn cho việc điều phối thợ dệt và thương nhân.',
            },
            {
              id: 'toefl-r2-q2',
              questionType: 'Rhetorical Purpose',
              question: 'Why does the author state that mechanical clocks "did not merely record existing routines"?',
              options: [
                'To show that tower bells were often inaccurate by several hours',
                'To emphasize that fixed clock time actively reshaped work culture and punctuality',
                'To prove farmers stopped harvesting crops at sunrise',
                'To argue that sundials were invented after the fourteenth century',
              ],
              correctIdx: 1,
              explanation: 'Tác giả nhấn mạnh đồng hồ cơ không chỉ đo thời gian thụ động mà còn chủ động kiến tạo khái niệm đúng giờ và thương mại đồng bộ.',
            },
            {
              id: 'toefl-r2-q3',
              questionType: 'Vocabulary in Context',
              question: 'In paragraph 2, the word "fostered" is closest in meaning to:',
              options: ['prevented', 'encouraged and developed', 'replaced suddenly', 'disguised'],
              correctIdx: 1,
              explanation: '"Fostered modern expectations of punctuality" = nuôi dưỡng, thúc đẩy kỳ vọng hiện đại về sự đúng giờ.',
            },
          ],
        },
      ],
      listening: [
        {
          id: 'toefl-listen-1',
          partLabel: 'Campus Conversation',
          title: 'Requesting Access to the University Archive Room',
          level: 'B2',
          speakerContext: 'Sinh viên Daniel nói chuyện với thủ thư (Ms. Gomez) về việc mượn báo cũ cho luận văn lịch sử.',
          audioScript:
            'Daniel: Excuse me, Ms. Gomez, I need to examine local newspapers from the 1960s for my senior history thesis, but the online catalog lists them as non-circulating. Ms. Gomez: That is right, Daniel—bound newspapers from that era are kept in our Special Collections vault because the paper is brittle. You cannot check them out overnight, though you may inspect them inside the supervised reading room. Daniel: Oh, great! Can I reserve a folder for tomorrow morning? Ms. Gomez: Before your first visit, you just need to submit a short request form signed by your thesis advisor and leave backpacks inside a hallway locker. Pencils and laptops are allowed, though pens and flash photography are strictly prohibited.',
          viSummary:
            'Báo những năm 1960 giòn nên không cho mượn mang về mà chỉ xem tại phòng đọc giám sát (Special Collections). Daniel cần nộp đơn có chữ ký giảng viên hướng dẫn, gửi ba lô ngoài tủ hành lang, chỉ được mang bút chì và laptop (cấm bút mực và chụp đèn flash).',
          questions: [
            {
              id: 'toefl-l1-q1',
              question: 'Why are the 1960s newspapers marked as non-circulating?',
              options: [
                'They are currently being scanned into PDF files.',
                'The old newsprint paper is fragile and easily damaged.',
                'Only graduate professors are allowed to touch them.',
              ],
              correctIdx: 1,
              explanation: 'Cô Gomez giải thích: "the paper is brittle" (giấy báo cũ rất giòn dễ rách).',
            },
            {
              id: 'toefl-l1-q2',
              question: 'What must Daniel obtain before his first archive session?',
              options: [
                'A handwritten pass from the library director',
                'A request form signed by his thesis advisor',
                'A refundable $20 locker key deposit',
              ],
              correctIdx: 1,
              explanation: '"submit a short request form signed by your thesis advisor".',
            },
            {
              id: 'toefl-l1-q3',
              question: 'Which items are permitted inside the supervised reading room?',
              options: [
                'Ink pens and backpacks',
                'Flash cameras and snacks',
                'Pencils and laptops',
              ],
              correctIdx: 2,
              explanation: '"Pencils and laptops are allowed, though pens and flash photography are strictly prohibited."',
            },
          ],
        },
        {
          id: 'toefl-listen-2',
          partLabel: 'Academic Lecture (Biology)',
          title: 'How Migratory Songbirds Navigate Across Continents',
          level: 'C1',
          speakerContext: 'Bài giảng ngắn môn Sinh thái học hành vi về cơ chế định hướng của chim di cư.',
          audioScript:
            'Professor: Every autumn, tiny songbirds weighing less than twenty grams fly thousands of kilometers at night to reach tropical wintering grounds. For decades, researchers wondered how birds stay on course under overcast skies when stars are hidden. Experiments in planetarium chambers revealed a remarkable redundancy system. When skies are clear, young birds calibrate their internal compass using star rotation around the North Star. Yet when thick cloud cover blocks celestial cues, specialized light-sensitive proteins in their retinas appear to detect subtle inclinations in Earth’s magnetic field—essentially letting the birds "see" directional lines overlaid on their vision.',
          viSummary:
            'Chim di cư bay đêm hàng nghìn km dùng hệ thống định vị dự phòng kép: khi trời quang chúng hiệu chỉnh theo chòm sao quay quanh Sao Bắc Đẩu; khi mây mù che khuất, protein nhạy sáng trong võng mạc giúp chúng cảm nhận góc nghiêng từ trường Trái Đất.',
          questions: [
            {
              id: 'toefl-l2-q1',
              question: 'What puzzle did migratory bird researchers try to solve?',
              options: [
                'Why songbirds weigh less than twenty grams',
                'How birds navigate accurately at night even under thick cloud cover',
                'How tropical forests produce winter food',
              ],
              correctIdx: 1,
              explanation: 'Các nhà khoa học thắc mắc làm sao chim giữ đúng hướng khi bay đêm dưới bầu trời mây che khuất các vì sao.',
            },
            {
              id: 'toefl-l2-q2',
              question: 'When clouds hide the stars, what mechanism guides the birds?',
              options: [
                'Following warm highway lights below',
                'Retinal proteins sensing Earth’s magnetic field inclinations',
                'Listening to ocean wave echoes',
              ],
              correctIdx: 1,
              explanation: 'Protein nhạy sáng ở võng mạc ("specialized light-sensitive proteins in their retinas") phát hiện độ nghiêng từ trường Trái Đất.',
            },
          ],
        },
      ],
      writing: [
        {
          id: 'toefl-w-disc',
          taskLabel: 'Writing Task 2 (Academic Discussion — 10 phút)',
          title: 'Compulsory Community Service for University Students',
          recommendedMinutes: 10,
          wordCountRange: '110 – 150 từ',
          minWords: 100,
          prompt:
            'Your professor posted a question on the course discussion board:\n"Should universities require all undergraduate students to complete at least one semester of unpaid community service before graduating? Why or why not?"\nStudent A (Claire) argues it builds civic empathy and teamwork.\nStudent B (Ryan) argues it creates financial strain for working students.\nWrite a post responding to the professor’s question, contributing your own perspective (at least 100 words).',
          promptVi:
            'Tham gia diễn đàn thảo luận học thuật (10 phút, ≥100 từ): nêu quan điểm đồng ý hay phản đối việc bắt buộc sinh viên làm công tác xã hội 1 học kỳ, đồng thời phản hồi tự nhiên ý của Claire hoặc Ryan.',
          outline: [
            'Mở đầu (1 câu): Kết nối nhanh với ý của Ryan/Claire và chốt quan điểm (ví dụ: ủng hộ khuyến khích hoặc tích hợp vào tín chỉ thực tập thay vì bắt buộc không lương).',
            'Phát triển ý mới (3–4 câu): Giải thích tác động tài chính lên sinh viên tự trang trải học phí + đề xuất giải pháp "credit-bearing service courses" (tính tín chỉ môn học).',
            'Kết thúc (1 câu): Chốt lại lợi ích giữ được tinh thần cộng đồng mà không gây quá tải.',
          ],
          scoringCriteriaFocus: [
            'Đóng góp lập luận mới có lý giải sâu, không sao chép y nguyên ý của Claire hay Ryan.',
            'Viết trôi chảy, từ vựng học thuật chính xác trong phạm vi 110–150 từ.',
          ],
          highBandKeywords: [
            { phrase: 'align with ...’s concern', meaningVi: 'đồng tình với mối lo ngại của ...' },
            { phrase: 'disproportionate financial burden', meaningVi: 'gánh nặng tài chính không cân xứng' },
            { phrase: 'civic engagement', meaningVi: 'sự gắn kết trách nhiệm công dân' },
            { phrase: 'credit-bearing curriculum', meaningVi: 'chương trình có tính tín chỉ học phần' },
            { phrase: 'intrinsic motivation', meaningVi: 'động lực tự thân bên trong' },
          ],
          modelAnswer:
            'While I appreciate Claire’s emphasis on civic engagement, my view aligns closer to Ryan’s concern: making unpaid community service mandatory for an entire semester could place a disproportionate financial burden on low-income undergraduates. Many students rely on part-time jobs after lectures simply to cover rent and tuition; adding mandatory unpaid hours would force them to sacrifice essential income or delay graduation.\n\nInstead of an unfunded requirement, universities could integrate community projects directly into credit-bearing curriculum courses—for instance, allowing engineering majors to design solar water filters for rural schools as part of their capstone grade. That way, students gain real-world empathy and teamwork experience without losing paid work hours, while preserving genuine intrinsic motivation rather than turning service into a mechanical checkbox.',
          modelNotesVi:
            'Độ dài ~130 từ, tham chiếu tinh tế cả hai sinh viên mẫu ("Claire’s emphasis... Ryan’s concern...") rồi đưa giải pháp thực tế mới mẻ ("capstone credit-bearing courses").',
        },
        {
          id: 'toefl-w-int',
          taskLabel: 'Writing Task 1 (Integrated Synthesis — 20 phút)',
          title: 'Evaluating Virtual Science Labs vs Physical Campus Laboratories',
          recommendedMinutes: 20,
          wordCountRange: '160 – 225 từ',
          minWords: 150,
          prompt:
            'Summarize the points made in the lecture notes below, being sure to explain how they challenge the claims in the reading.\n[Reading Claims]: (1) Virtual 3D chemistry labs eliminate chemical waste and safety accidents. (2) Simulations save universities money on expensive lab glassware. (3) Students can repeat experiments instantly at home.\n[Lecture Counterpoints]: (1) Zero accident risk leaves graduates unprepared for handling real hazardous reagents in industry jobs. (2) High-end software licenses and VR headsets require steep annual subscription fees. (3) Instant resets hide real-world experimental noise and calibration delays, weakening troubleshooting skills.',
          promptVi:
            'Tổng hợp khách quan 3 luận điểm phản bác từ Bài giảng đối với 3 luận điểm của Bài đọc (tuyệt đối KHÔNG thêm quan điểm cá nhân).',
          outline: [
            'Introduction (2 câu): Nêu chủ đề chung (phòng thí nghiệm ảo) và khẳng định giảng viên phản bác cả 3 lợi ích mà bài đọc nêu ra.',
            'Body 1 (Safety vs Readiness): Bài đọc khen giảm tai nạn, nhưng giảng viên chỉ ra sinh viên thiếu kỹ năng xử lý hóa chất nguy hiểm ngoài thực tế.',
            'Body 2 (Cost): Bài đọc nói tiết kiệm dụng cụ thủy tinh, nhưng giảng viên phản bác phí bản quyền phần mềm & thiết bị VR hàng năm rất tốn kém.',
            'Body 3 (Instant Reset vs Troubleshooting): Việc bấm nút làm lại tức thì che khuất sai số đo đạc thực tế, làm yếu năng lực xử lý sự cố.',
          ],
          scoringCriteriaFocus: [
            'Bám sát đối chiếu từng cặp điểm 1–1 giữa Lecture và Reading.',
            'Không dùng "I think / In my opinion"; dùng động từ tường thuật ("casts doubt on", "counters", "contends").',
          ],
          highBandKeywords: [
            { phrase: 'casts doubt on', meaningVi: 'đặt nghi vấn / phản bác luận điểm' },
            { phrase: 'contrary to the passage’s claim', meaningVi: 'trái ngược với tuyên bố của bài đọc' },
            { phrase: 'recurring subscription fees', meaningVi: 'phí thuê bao định kỳ lặp lại' },
            { phrase: 'experimental anomalies', meaningVi: 'các sai số / bất thường trong thực nghiệm' },
            { phrase: 'troubleshooting competence', meaningVi: 'năng lực xử lý sự cố kỹ thuật' },
          ],
          modelAnswer:
            'The reading passage highlights three major advantages of virtual science laboratories, yet the lecturer casts doubt on each of these points by emphasizing practical educational trade-offs.\n\nFirst, although the reading argues that digital simulations eliminate chemical spills and safety accidents, the lecturer counters that total insulation from physical risk leaves graduates poorly prepared for industrial laboratories. Handling real volatile reagents requires calm precision that screen simulations cannot cultivate.\n\nSecond, contrary to the passage’s claim that virtual labs reduce equipment spending on fragile glassware, the speaker points out that universities still face steep recurring subscription fees for specialized simulation software and virtual-reality hardware maintenance.\n\nFinally, while the reading praises students’ ability to reset failed virtual trials instantaneously at home, the lecturer contends that effortless resets hide genuine experimental anomalies and instrument calibration delays. Consequently, students miss crucial opportunities to build troubleshooting competence when real experiments unexpectedly go wrong.',
          modelNotesVi:
            'Cấu trúc chuẩn mực tuyệt đối cho TOEFL Integrated Writing (163 từ), sử dụng đúng động từ tổng hợp khách quan và đối chiếu trọn vẹn cả 3 cặp luận điểm.',
        },
      ],
      speaking: [
        {
          id: 'toefl-s-t1',
          partLabel: 'Speaking Task 1 (Independent Choice)',
          title: 'Studying Independently vs Joining a Small Study Group',
          prepTimeText: '15 giây chuẩn bị',
          speakTimeText: '45 giây trả lời',
          prompt:
            'Some college students prefer studying alone in a quiet room, while others prefer studying in a small group of classmates. Which approach do you prefer and why?',
          promptVi: 'Nói nhanh gọn trong 45 giây: 1 câu chọn lập trường + 2 lý do kèm ví dụ ngắn.',
          sampleAnswer:
            'Personally, I strongly prefer studying in a small group of three or four classmates rather than studying completely alone. First, discussing complex concepts aloud forces everyone to clarify their thinking; for instance, last semester my biology group caught several misunderstandings before our midterm simply by quizzing each other. Second, scheduled group sessions create positive accountability, making it much harder to procrastinate on social media when tired.',
          highScoreVocab: [
            { phrase: 'clarify their thinking', meaningVi: 'làm sáng tỏ tư duy của mình' },
            { phrase: 'positive accountability', meaningVi: 'trách nhiệm thúc đẩy lẫn nhau tích cực' },
            { phrase: 'procrastinate on', meaningVi: 'trì hoãn việc gì' },
          ],
          deliveryTips: [
            'Trong 15 giây chuẩn bị, chỉ ghi 2 từ khóa lý do ("clarify ideas" + "accountability"), tuyệt đối không viết cả câu.',
          ],
        },
        {
          id: 'toefl-s-t2',
          partLabel: 'Speaking Task 2 (Integrated Campus Summary)',
          title: 'Library 24-Hour Quiet Zone Proposal',
          prepTimeText: '30 giây chuẩn bị',
          speakTimeText: '60 giây trả lời',
          prompt:
            '[Reading Notice]: Campus library proposes keeping the third floor open 24 hours with a strict zero-talking policy during exam month.\n[Audio Student Opinion]: Sofia strongly supports this because noisy dormitories keep her awake when writing essays late at night, and even though hiring night security costs money, the student union offered to cover staffing from its unused events budget.',
          promptVi:
            'Tổng hợp ngắn thông báo trường trong 15s đầu, sau đó trình bày 2 lý do của Sofia trong 45s còn lại (không nêu ý kiến cá nhân).',
          sampleAnswer:
            'The university library plans to keep its third floor open around the clock as a strict silent zone during finals month. In the conversation, Sofia strongly favors this proposal for two reasons. First, she explains that noisy dormitories often disrupt students trying to write late-night essays, so having a guaranteed quiet refuge on campus will boost academic focus. Second, regarding administrative concerns about extra night-shift security expenses, she points out that the student union has already volunteered to fund staff coverage using leftover event money.',
          highScoreVocab: [
            { phrase: 'around the clock', meaningVi: 'suốt 24/24 giờ' },
            { phrase: 'strongly favors this proposal', meaningVi: 'ủng hộ mạnh mẽ đề xuất này' },
            { phrase: 'guaranteed quiet refuge', meaningVi: 'nơi trú ẩn yên tĩnh được đảm bảo' },
          ],
          deliveryTips: [
            'Dùng cụm "In the conversation, the woman favors/opposes..." để cho giám khảo thấy rõ bạn đang thuật lại nguồn nghe.',
          ],
        },
        {
          id: 'toefl-s-t3',
          partLabel: 'Speaking Task 3 (Integrated Academic Concept)',
          title: 'Explaining "Choice Architecture" via a Cafeteria Example',
          prepTimeText: '30 giây chuẩn bị',
          speakTimeText: '60 giây trả lời',
          prompt:
            '[Concept]: Choice Architecture — designing how options are physically arranged to subtly steer human decisions without banning any choice.\n[Lecture Example]: A university dining hall placed fresh fruit bowls at eye level near cash registers while moving sugary desserts to a lower back shelf. Fruit sales jumped 35% even though desserts remained available.',
          promptVi:
            'Định nghĩa ngắn khái niệm "Choice Architecture" rồi giải thích ví dụ căng-tin của giáo sư.',
          sampleAnswer:
            'The reading introduces the concept of choice architecture, which means organizing how options are displayed so people naturally pick better choices without forbidding alternatives. To illustrate this, the professor describes an experiment in a campus dining hall. Staff placed colorful bowls of fresh apples and berries right at eye level beside the checkout line, while shifting pastries and cakes onto a lower shelf at the back. Even though sugary desserts were never banned and prices stayed identical, simply changing physical visibility caused fruit consumption to rise by thirty-five percent.',
          highScoreVocab: [
            { phrase: 'without forbidding alternatives', meaningVi: 'mà không cấm đoán các lựa chọn khác' },
            { phrase: 'right at eye level', meaningVi: 'ngay ngang tầm mắt' },
            { phrase: 'changing physical visibility', meaningVi: 'thay đổi mức độ dễ nhìn thấy' },
          ],
          deliveryTips: [
            'Đừng dành quá 15 giây cho định nghĩa; 45 giây còn lại phải dành trọn cho chi tiết thực nghiệm căng-tin.',
          ],
        },
      ],
    },
    mockTest: {
      title: 'TOEFL iBT Mini Mock Test (Listening & Reading — 12 Câu)',
      description: 'Đề mô phỏng kết hợp Campus Conversation, Academic Lecture & TOEFL Reading (Vocab, Negative Factual, Rhetorical Purpose, Simplification).',
      durationMinutes: 16,
      questions: [
        {
          id: 'toefl-mock-1',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q2)',
          audioScript:
            'Student: Hi, I signed up for the weekend robotics workshop, but I didn’t get the supply kit email yet. Coordinator: Oh, we sent welcome instructions yesterday, though because our supplier delayed shipping circuit boards, kits will be handed out directly at Lab 202 on Saturday morning instead of Friday afternoon.',
          question: 'Why did the coordinator change how supply kits are distributed?',
          options: [
            'The workshop moved to a different building.',
            'The supplier delayed delivery of the circuit boards.',
            'Too few students registered for Friday afternoon.',
            'The welcome email server crashed.',
          ],
          correctIdx: 1,
          explanation: 'Nhà cung cấp giao chậm bảng mạch ("our supplier delayed shipping circuit boards") nên bộ kit sẽ phát trực tiếp sáng thứ Bảy.',
        },
        {
          id: 'toefl-mock-2',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q2)',
          audioScript:
            'Student: Hi, I signed up for the weekend robotics workshop, but I didn’t get the supply kit email yet. Coordinator: Oh, we sent welcome instructions yesterday, though because our supplier delayed shipping circuit boards, kits will be handed out directly at Lab 202 on Saturday morning instead of Friday afternoon.',
          question: 'Where should the student pick up the supply kit?',
          options: [
            'At the campus post office on Friday',
            'At Lab 202 on Saturday morning',
            'At the supplier’s downtown store',
            'Inside the student union lounge',
          ],
          correctIdx: 1,
          explanation: '"kits will be handed out directly at Lab 202 on Saturday morning".',
        },
        {
          id: 'toefl-mock-3',
          skill: 'listening',
          partLabel: 'Academic Lecture (Q3–Q5)',
          audioScript:
            'Professor: Look at how Arctic foxes survive temperatures below minus thirty degrees Celsius. Unlike southern mammals with large ears that radiate body heat outward, Arctic foxes evolved tiny rounded ears and compact muzzles. This minimizes surface area exposed to freezing wind. Plus, thick winter fur coats even the soles of their paws like natural snow boots.',
          question: 'What is the main topic of the professor’s talk?',
          options: [
            'Migration distances of southern mammals',
            'Physical adaptations helping Arctic foxes conserve heat',
            'Seasonal diet changes during polar summers',
            'Why polar winds melt winter snow',
          ],
          correctIdx: 1,
          explanation: 'Giáo sư phân tích các đặc điểm hình thể (tai nhỏ tròn, mõm gọn, lông dày dưới bàn chân) giúp cáo Bắc Cực giữ nhiệt.',
        },
        {
          id: 'toefl-mock-4',
          skill: 'listening',
          partLabel: 'Academic Lecture (Q3–Q5)',
          audioScript:
            'Professor: Look at how Arctic foxes survive temperatures below minus thirty degrees Celsius. Unlike southern mammals with large ears that radiate body heat outward, Arctic foxes evolved tiny rounded ears and compact muzzles. This minimizes surface area exposed to freezing wind. Plus, thick winter fur coats even the soles of their paws like natural snow boots.',
          question: 'Why does the professor contrast Arctic foxes with southern mammals?',
          options: [
            'To show how ear size relates to heat loss versus heat conservation',
            'To argue that southern mammals have thicker winter fur',
            'To explain why foxes hunt southern rabbits',
            'To prove Arctic foxes cannot live below zero degrees',
          ],
          correctIdx: 0,
          explanation: 'So sánh thú phương Nam tai to để tản nhiệt với cáo Bắc Cực tai nhỏ để hạn chế diện tích mất nhiệt.',
        },
        {
          id: 'toefl-mock-5',
          skill: 'listening',
          partLabel: 'Academic Lecture Detail',
          audioScript:
            'Professor: Look at how Arctic foxes survive temperatures below minus thirty degrees Celsius. Unlike southern mammals with large ears that radiate body heat outward, Arctic foxes evolved tiny rounded ears and compact muzzles. This minimizes surface area exposed to freezing wind. Plus, thick winter fur coats even the soles of their paws like natural snow boots.',
          question: 'What unusual feature protects the fox’s feet on snow and ice?',
          options: [
            'Hard scales along its claws',
            'Thick fur covering the soles of its paws',
            'Extra-long legs above the snowline',
            'Seasonal hibernation inside caves',
          ],
          correctIdx: 1,
          explanation: '"thick winter fur coats even the soles of their paws like natural snow boots".',
        },
        {
          id: 'toefl-mock-6',
          skill: 'reading',
          partLabel: 'Academic Reading 1 (Q6–Q8)',
          passage:
            'Coral polyps, the tiny marine animals responsible for building vast limestone reefs, obtain most of their energy from microscopic algae called zooxanthellae living inside their translucent tissues. In return for shelter and nutrients, the algae photosynthesize sunlight into sugars that feed the coral host. However, when ocean temperatures remain elevated by just one or two degrees Celsius for several weeks, coral polyps expel these colorful algae—a stress response known as "coral bleaching" that turns reefs bone-white and leaves them vulnerable to starvation unless waters cool promptly.',
          question: 'According to the passage, what benefit do zooxanthellae provide to coral polyps?',
          options: [
            'Hard limestone shells against predators',
            'Sugars produced through photosynthesis',
            'Cooler deep-ocean water currents',
            'Protection from freezing Arctic storms',
          ],
          correctIdx: 1,
          explanation: 'Tảo cộng sinh quang hợp ánh sáng mặt trời tạo ra đường nuôi dưỡng vật chủ san hô ("photosynthesize sunlight into sugars that feed the coral host").',
        },
        {
          id: 'toefl-mock-7',
          skill: 'reading',
          partLabel: 'Academic Reading 1 (Q6–Q8)',
          passage:
            'Coral polyps, the tiny marine animals responsible for building vast limestone reefs, obtain most of their energy from microscopic algae called zooxanthellae living inside their translucent tissues. In return for shelter and nutrients, the algae photosynthesize sunlight into sugars that feed the coral host. However, when ocean temperatures remain elevated by just one or two degrees Celsius for several weeks, coral polyps expel these colorful algae—a stress response known as "coral bleaching" that turns reefs bone-white and leaves them vulnerable to starvation unless waters cool promptly.',
          question: 'The word "vulnerable" in the passage is closest in meaning to:',
          options: ['resistant', 'exposed and susceptible', 'identical', 'independent'],
          correctIdx: 1,
          explanation: '"Vulnerable to starvation" = dễ bị tổn thương / có nguy cơ chết đói cao ("exposed and susceptible").',
        },
        {
          id: 'toefl-mock-8',
          skill: 'reading',
          partLabel: 'Academic Reading 1 (Q6–Q8)',
          passage:
            'Coral polyps, the tiny marine animals responsible for building vast limestone reefs, obtain most of their energy from microscopic algae called zooxanthellae living inside their translucent tissues. In return for shelter and nutrients, the algae photosynthesize sunlight into sugars that feed the coral host. However, when ocean temperatures remain elevated by just one or two degrees Celsius for several weeks, coral polyps expel these colorful algae—a stress response known as "coral bleaching" that turns reefs bone-white and leaves them vulnerable to starvation unless waters cool promptly.',
          question: 'What happens immediately when water remains unusually warm for weeks?',
          options: [
            'Algae multiply twice as fast inside coral skeletons.',
            'Coral polyps eject their symbiotic algae, turning white.',
            'Limestone reefs sink into deeper sea trenches.',
            'Polyps start hunting larger reef fish.',
          ],
          correctIdx: 1,
          explanation: 'San hô đẩy tảo đầy màu sắc ra ngoài ("expel these colorful algae") khiến rạn san hô chuyển sang màu trắng.',
        },
        {
          id: 'toefl-mock-9',
          skill: 'reading',
          partLabel: 'Academic Reading 2 (Q9–Q12)',
          passage:
            'Until the late nineteenth century, painters relied on fragile glass tubes or pig bladders to store oil pigments, forcing artists to mix colors indoors inside their studios. The invention of collapsible tin paint tubes by John Goffe Rand in 1841 revolutionized outdoor painting. Because tin tubes sealed pigments airtight yet opened easily with a screw cap, Impressionist artists could carry vibrant ready-made oils straight into sunlit meadows and shifting coastal light, capturing fleeting atmospheric moments directly onto canvas.',
          question: 'The word "fleeting" in the final sentence is closest in meaning to:',
          options: ['permanent', 'brief and fast-changing', 'artificial', 'colorless'],
          correctIdx: 1,
          explanation: '"Fleeting atmospheric moments" = những khoảnh khắc ánh sáng/khí quyển thoáng qua nhanh chóng ("brief and fast-changing").',
        },
        {
          id: 'toefl-mock-10',
          skill: 'reading',
          partLabel: 'Academic Reading 2 (Q9–Q12)',
          passage:
            'Until the late nineteenth century, painters relied on fragile glass tubes or pig bladders to store oil pigments, forcing artists to mix colors indoors inside their studios. The invention of collapsible tin paint tubes by John Goffe Rand in 1841 revolutionized outdoor painting. Because tin tubes sealed pigments airtight yet opened easily with a screw cap, Impressionist artists could carry vibrant ready-made oils straight into sunlit meadows and shifting coastal light, capturing fleeting atmospheric moments directly onto canvas.',
          question: 'Why did painters previously work mostly indoors before 1841?',
          options: [
            'Outdoor sunlight ruined tin caps.',
            'Pigment containers were fragile and inconvenient to carry outside.',
            'Impressionist artists disliked coastal landscapes.',
            'Oil paints had not yet been invented.',
          ],
          correctIdx: 1,
          explanation: 'Ống thủy tinh dễ vỡ hoặc bong bóng lợn bất tiện khiến họa sĩ buộc phải pha màu trong xưởng vẽ ("forcing artists to mix colors indoors").',
        },
        {
          id: 'toefl-mock-11',
          skill: 'reading',
          partLabel: 'Academic Reading 2 (Negative Factual)',
          passage:
            'Until the late nineteenth century, painters relied on fragile glass tubes or pig bladders to store oil pigments, forcing artists to mix colors indoors inside their studios. The invention of collapsible tin paint tubes by John Goffe Rand in 1841 revolutionized outdoor painting. Because tin tubes sealed pigments airtight yet opened easily with a screw cap, Impressionist artists could carry vibrant ready-made oils straight into sunlit meadows and shifting coastal light, capturing fleeting atmospheric moments directly onto canvas.',
          question: 'Which of the following is NOT mentioned as a feature or benefit of collapsible tin paint tubes?',
          options: [
            'They sealed oil pigments airtight.',
            'They opened conveniently with a screw cap.',
            'They enabled painters to work outdoors in natural light.',
            'They automatically mixed two colors inside one cap.',
          ],
          correctIdx: 3,
          explanation: 'Đoạn văn không nói ống thiếc tự động trộn hai màu với nhau.',
        },
        {
          id: 'toefl-mock-12',
          skill: 'reading',
          partLabel: 'Academic Reading 2 (Sentence Simplification)',
          passage:
            'Target: "Because tin tubes sealed pigments airtight yet opened easily with a screw cap, Impressionist artists could carry vibrant ready-made oils straight into sunlit meadows and shifting coastal light."',
          question: 'Which option accurately paraphrases the relationship in the target sentence?',
          options: [
            'Airtight and resealable tin tubes allowed Impressionists to take vivid paints directly outdoors.',
            'Impressionists invented screw caps because coastal light dried out glass tubes.',
            'Ready-made oils lost vibrancy whenever carried into sunlit meadows.',
            'Tin tubes prevented painters from opening paints outside their studios.',
          ],
          correctIdx: 0,
          explanation: 'Phương án A tóm gọn đúng quan hệ nhân–quả: thiết kế kín khí và nắp vặn tiện lợi của ống thiếc đã cho phép họa sĩ Ấn tượng mang màu ra vẽ trực tiếp ngoài trời.',
        },
      ],
    },
    rubricCriteria: [
      {
        id: 'toefl-rub-dev',
        appliesTo: 'writing',
        name: 'Task Relevance & Source Integration',
        nameVi: 'Mức độ hoàn thành & Tổng hợp nguồn (Writing)',
        weightText: 'Thang 0–5 (Writing)',
        description: 'Task 1 đối chiếu chính xác bài đọc và bài giảng (không thêm ý riêng); Task 2 đóng góp lập luận sắc bén mới cho thảo luận lớp học.',
        highScoreBenchmarks: ['Task 1 đầy đủ 3 điểm phản bác từ bài giảng', 'Task 2 có luận điểm mới + dẫn chứng rõ ràng'],
      },
      {
        id: 'toefl-rub-worg',
        appliesTo: 'writing',
        name: 'Organization & Progression',
        nameVi: 'Tổ chức ý & Mạch lập luận',
        weightText: 'Thang 0–5 (Writing)',
        description: 'Tiến triển ý logic, liên kết mạch lạc giữa câu chủ đề, lập luận và ví dụ học thuật.',
        highScoreBenchmarks: ['Dùng chuẩn động từ tường thuật ("counters", "casts doubt on")', 'Chuyển ý mượt mà'],
      },
      {
        id: 'toefl-rub-lang',
        appliesTo: 'both',
        name: 'Language Use (Academic Grammar & Vocabulary)',
        nameVi: 'Ngữ pháp & Từ vựng học thuật Bắc Mỹ',
        weightText: 'Writing & Speaking',
        description: 'Kiểm soát tốt câu phức, mệnh đề quan hệ/danh ngữ và vốn từ học thuật chính xác theo ngữ cảnh.',
        highScoreBenchmarks: ['Độ chính xác ngữ pháp cao, ít lỗi làm tối nghĩa', 'Từ vựng đa dạng đúng văn phong đại học'],
      },
      {
        id: 'toefl-rub-del',
        appliesTo: 'speaking',
        name: 'Delivery (Pace, Clarity & Intonation)',
        nameVi: 'Truyền đạt, Tốc độ & Ngữ điệu',
        weightText: 'Thang 0–4 (Speaking)',
        description: 'Phát âm rõ ràng, nhịp nói ổn định trong 45–60 giây, ngắt nghỉ tự nhiên và ít ậm ừ.',
        highScoreBenchmarks: ['Hoàn thành đủ ý trước khi hết đồng hồ 45s/60s', 'Nhấn trọng âm từ khóa thông tin'],
      },
      {
        id: 'toefl-rub-td',
        appliesTo: 'speaking',
        name: 'Topic Development',
        nameVi: 'Phát triển nội dung & Tổng hợp ý nói',
        weightText: 'Thang 0–4 (Speaking)',
        description: 'Task 1 phát triển đủ lý do + ví dụ; Task 2–4 thuật lại chính xác nội dung chính của đọc và nghe mà không bỏ sót ví dụ.',
        highScoreBenchmarks: ['Nêu rõ định nghĩa + ví dụ chi tiết ở Task 3', 'Không thêm ý cá nhân vào bài Integrated'],
      },
    ],
  },
};

interface ExamExtraBundle {
  diagnosticQuestions: ExamMcqQuestion[];
  reading: ExamReadingSet[];
  listening: ExamListeningSet[];
  writing: ExamWritingTask[];
  speaking: ExamSpeakingTask[];
  mockTests: ExamMockTest[];
}

function mergeExamExtra(base: ExamPrepProfile, extra: ExamExtraBundle): ExamPrepProfile {
  return {
    ...base,
    diagnosticQuestions: [...base.diagnosticQuestions, ...extra.diagnosticQuestions],
    skillPractice: {
      reading: [...base.skillPractice.reading, ...extra.reading],
      listening: [...base.skillPractice.listening, ...extra.listening],
      writing: [...base.skillPractice.writing, ...extra.writing],
      speaking: [...base.skillPractice.speaking, ...extra.speaking],
    },
    mockTests: [base.mockTest, ...extra.mockTests],
  };
}

export const EXAM_PREP_DATA: Record<ExamType, ExamPrepProfile> = {
  ielts: mergeExamExtra(BASE_EXAM_PREP_DATA.ielts, IELTS_EXTRA),
  toeic: mergeExamExtra(BASE_EXAM_PREP_DATA.toeic, TOEIC_EXTRA),
  vstep: mergeExamExtra(BASE_EXAM_PREP_DATA.vstep, VSTEP_EXTRA),
  cambridge: mergeExamExtra(BASE_EXAM_PREP_DATA.cambridge, CAMBRIDGE_EXTRA),
  toefl: mergeExamExtra(BASE_EXAM_PREP_DATA.toefl, TOEFL_EXTRA),
};

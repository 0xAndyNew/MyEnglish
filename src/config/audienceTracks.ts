import { AudienceId, LearnerProfile, PageKey } from '../types/audience';
import { CefrLevel } from '../types/learning';

export interface TrackStep {
  idx: number;
  code: string;
  label: string;
  description: string;
  page: PageKey;
  subView?: string;
  autoSkipIfLevelAtLeast?: CefrLevel;
}

export interface AudienceTrackConfig {
  title: string;
  subtitle: string;
  theme: 'kids' | 'default';
  skillDistribution: { skill: string; percent: number; color: string }[];
  steps: TrackStep[];
}

const CEFR_ORDER: Record<CefrLevel, number> = {
  A0: 0,
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
};

export function isLevelAtLeast(level: CefrLevel | undefined, target: CefrLevel): boolean {
  const currentRank = CEFR_ORDER[level || 'A0'] ?? 0;
  const targetRank = CEFR_ORDER[target] ?? 0;
  return currentRank >= targetRank;
}

export const AUDIENCE_TRACKS: Record<AudienceId, AudienceTrackConfig> = {
  preschool: {
    title: 'Lớp Tiếng Anh Mầm Non (1–6 Tuổi)',
    subtitle: 'Học như ở trung tâm: Term – Unit – Buổi học, bé chạm & nghe, bố mẹ đồng hành',
    theme: 'kids',
    skillDistribution: [
      { skill: 'Nghe & nhận biết', percent: 35, color: 'bg-amber-500' },
      { skill: 'Bài hát & vận động', percent: 20, color: 'bg-pink-500' },
      { skill: 'Trò chơi chạm-là-học', percent: 20, color: 'bg-emerald-500' },
      { skill: 'Truyện tranh', percent: 10, color: 'bg-sky-500' },
      { skill: 'Nói theo & Phonics', percent: 10, color: 'bg-violet-500' },
      { skill: 'Tô màu & tô chữ', percent: 5, color: 'bg-orange-500' },
    ],
    steps: [
      {
        idx: 0,
        code: 'P1',
        label: 'P1: Lớp học của bé',
        description: 'Bản đồ phiêu lưu, buổi học hôm nay, bài hát, truyện, sticker & lịch học.',
        page: 'preschool',
      },
    ],
  },

  kids: {
    title: 'Lộ Trình Tiếng Anh Vui Nhộn Cho Bé (6–10 Tuổi)',
    subtitle: 'Học qua hình ảnh, âm thanh, truyện kể & trò chơi — không công thức ngữ pháp khô khan',
    theme: 'kids',
    skillDistribution: [
      { skill: 'Nghe (Listening)', percent: 25, color: 'bg-amber-500' },
      { skill: 'Nói (Speaking)', percent: 20, color: 'bg-orange-500' },
      { skill: 'Từ vựng tranh', percent: 20, color: 'bg-emerald-500' },
      { skill: 'Phonics / Game', percent: 15, color: 'bg-pink-500' },
      { skill: 'Đọc truyện', percent: 10, color: 'bg-sky-500' },
      { skill: 'Mẫu câu & Viết', percent: 10, color: 'bg-violet-500' },
    ],
    steps: [
      {
        idx: 0,
        code: 'K1',
        label: 'K1: Từ Vựng Qua Tranh (12 Chủ đề)',
        description: '12 chủ đề gần gũi (Động vật, Màu sắc, Gia đình, Đồ ăn...) kèm emoji & đọc to.',
        page: 'kids',
        subView: 'vocab',
      },
      {
        idx: 1,
        code: 'K2',
        label: 'K2: Chữ Cái & Phonics Vui',
        description: 'Làm quen 26 chữ cái A–Z, nghe âm vui nhộn & tập vẽ nét chữ cho bé.',
        page: 'alphabet',
        subView: 'kids',
      },
      {
        idx: 2,
        code: 'K3',
        label: 'K3: Truyện Kể & Bài Hát',
        description: 'Nghe truyện ngắn tương tác & bài hát nhịp điệu giúp bé nhớ câu tự nhiên.',
        page: 'kids',
        subView: 'stories',
      },
      {
        idx: 3,
        code: 'K4',
        label: 'K4: Mẫu Câu Đầu Tiên',
        description: 'Học cụm câu giao tiếp ngắn (chunks): chào hỏi, xin phép, giới thiệu bản thân.',
        page: 'kids',
        subView: 'sentences',
      },
      {
        idx: 4,
        code: 'K5',
        label: 'K5: Trò Chơi & Cambridge YLE',
        description: 'Chơi game ghép tranh, nghe chọn hình & thử thách Starters / Movers / Flyers.',
        page: 'kids',
        subView: 'games',
      },
    ],
  },

  teen: {
    title: 'Lộ Trình Học Sinh THCS & THPT (Lớp 6–12)',
    subtitle: 'Bám sát SGK Global Success từng khối lớp, vững ngữ pháp & luyện đề Thi vào 10 / THPT',
    theme: 'default',
    skillDistribution: [
      { skill: 'Ngữ pháp SGK', percent: 20, color: 'bg-indigo-500' },
      { skill: 'Đọc hiểu & Đề thi', percent: 20, color: 'bg-sky-500' },
      { skill: 'Từ vựng Unit', percent: 15, color: 'bg-emerald-500' },
      { skill: 'Nghe (Listening)', percent: 15, color: 'bg-cyan-500' },
      { skill: 'Viết câu / Luận', percent: 15, color: 'bg-violet-500' },
      { skill: 'Nói & Phát âm', percent: 15, color: 'bg-amber-500' },
    ],
    steps: [
      {
        idx: 0,
        code: 'T1',
        label: 'T1: Bài Học SGK Lớp 6–12',
        description: 'Học từ vựng & ngữ pháp trọng tâm từng Unit theo đúng khối lớp của bạn.',
        page: 'school',
        subView: 'units',
      },
      {
        idx: 1,
        code: 'T2',
        label: 'T2: Luyện Đề Thi Vào 10 & THPT',
        description: 'Ngân hàng đề mô phỏng Thi vào lớp 10 & Thi Tốt nghiệp THPT có giải thích chi tiết.',
        page: 'school',
        subView: 'exams',
      },
      {
        idx: 2,
        code: 'T3',
        label: 'T3: Ngữ Pháp Hệ Thống',
        description: '14 chuyên đề ngữ pháp + phân tích câu theo màu + bài thi tổng hợp.',
        page: 'grammar',
      },
      {
        idx: 3,
        code: 'T4',
        label: 'T4: Lab Ghép Câu Học Đường',
        description: 'Thực hành ghép câu chuẩn cấu trúc theo trình độ và chủ đề học sinh.',
        page: 'sentence',
      },
      {
        idx: 4,
        code: 'T5',
        label: 'T5: Nghe & Nói Học Đường',
        description: 'Luyện nghe, đọc nhại Shadowing và hội thoại đời sống – trường học.',
        page: 'listenSpeak',
      },
      {
        idx: 5,
        code: 'T6',
        label: 'T6: Phát Âm & Trọng Âm IPA',
        description: 'Làm chủ 44 âm IPA & quy tắc trọng âm — nền tảng ăn điểm phần Ngữ âm đề thi.',
        page: 'ipa',
        autoSkipIfLevelAtLeast: 'B1',
      },
    ],
  },

  university: {
    title: 'Lộ Trình Sinh Viên Đại Học & Chuẩn Đầu Ra',
    subtitle: 'Tiếng Anh Học thuật (EAP), từ vựng AWL, thuyết trình Seminar, viết Email/CV & chuẩn đầu ra',
    theme: 'default',
    skillDistribution: [
      { skill: 'Nghe học thuật', percent: 20, color: 'bg-violet-500' },
      { skill: 'Nói & Thuyết trình', percent: 20, color: 'bg-fuchsia-500' },
      { skill: 'Đọc nghiên cứu', percent: 20, color: 'bg-sky-500' },
      { skill: 'Viết Essay / CV', percent: 20, color: 'bg-indigo-500' },
      { skill: 'Từ vựng AWL', percent: 10, color: 'bg-emerald-500' },
      { skill: 'Ngữ pháp & IPA', percent: 10, color: 'bg-amber-500' },
    ],
    steps: [
      {
        idx: 0,
        code: 'U1',
        label: 'U1: Từ Vựng Học Thuật (AWL)',
        description: 'Kho Academic Word List, Collocations & từ vựng chuyên ngành đại học.',
        page: 'academic',
        subView: 'awl',
      },
      {
        idx: 1,
        code: 'U2',
        label: 'U2: Thuyết Trình & Seminar',
        description: 'Khung mẫu câu trình bày slide, thảo luận nhóm, phản biện & đọc bài báo học thuật.',
        page: 'academic',
        subView: 'presentation',
      },
      {
        idx: 2,
        code: 'U3',
        label: 'U3: Viết Học Thuật, Email & CV',
        description: 'Viết Email cho giảng viên, Academic Essay, CV & Cover Letter thực tập (AI chấm).',
        page: 'academic',
        subView: 'writing',
      },
      {
        idx: 3,
        code: 'U4',
        label: 'U4: Chuẩn Đầu Ra & Hồ Sơ ATS',
        description: 'Lộ trình chuẩn đầu ra ĐH (VSTEP/IELTS/TOEIC) & hướng dẫn viết CV chuẩn ATS.',
        page: 'academic',
        subView: 'career',
      },
      {
        idx: 4,
        code: 'U5',
        label: 'U5: Ngữ Pháp Học Thuật',
        description: 'Cấu trúc câu phức, mệnh đề quan hệ, câu bị động & điều kiện cho viết luận.',
        page: 'grammar',
      },
      {
        idx: 5,
        code: 'U6',
        label: 'U6: Đọc Tài Liệu OCR & Ôn SRS',
        description: 'Quét giáo trình tiếng Anh bằng OCR, tra cứu tức thì & ôn từ bằng SRS.',
        page: 'ocr',
      },
    ],
  },

  worker: {
    title: 'Lộ Trình Người Đi Làm & Công Sở Theo Ngành',
    subtitle: 'Giao tiếp thực chiến theo 10 ngành nghề, họp hành, đàm phán, phỏng vấn & viết Email',
    theme: 'default',
    skillDistribution: [
      { skill: 'Nói & Phản xạ', percent: 30, color: 'bg-emerald-500' },
      { skill: 'Nghe công việc', percent: 25, color: 'bg-teal-500' },
      { skill: 'Viết Email / Chat', percent: 15, color: 'bg-indigo-500' },
      { skill: 'Đọc & Tài liệu', percent: 10, color: 'bg-sky-500' },
      { skill: 'Từ vựng ngành', percent: 10, color: 'bg-amber-500' },
      { skill: 'Ngữ pháp & IPA', percent: 10, color: 'bg-violet-500' },
    ],
    steps: [
      {
        idx: 0,
        code: 'W1',
        label: 'W1: Tình Huống Công Sở Theo Ngành',
        description: 'Họp Daily Standup, báo cáo tiến độ, đàm phán & phỏng vấn STAR theo ngành nghề.',
        page: 'workplace',
      },
      {
        idx: 1,
        code: 'W2',
        label: 'W2: Nạp Từ Vựng & SRS Công Việc',
        description: '133 bài từ vựng cốt lõi + Kho 980+ từ & ôn tập ngắt quãng SRS 1-3-7-30 ngày.',
        page: 'roadmap',
      },
      {
        idx: 2,
        code: 'W3',
        label: 'W3: Ngữ Pháp & Lab Ghép Câu',
        description: 'Luyện ghép 360+ mẫu câu thực tế ưu tiên theo ngành nghề đã chọn.',
        page: 'sentence',
      },
      {
        idx: 3,
        code: 'W4',
        label: 'W4: Nghe & Hội Thoại Công Việc',
        description: 'Luyện nghe-đọc, Shadowing & Roleplay hội thoại văn phòng, IT, kinh doanh, CSKH.',
        page: 'listenSpeak',
      },
      {
        idx: 4,
        code: 'W5',
        label: 'W5: Viết Email Song Ngữ & OCR',
        description: 'Luyện viết Email/báo cáo Việt ↔ Anh có AI chấm điểm & quét tài liệu OCR.',
        page: 'writing',
      },
      {
        idx: 5,
        code: 'W6',
        label: 'W6: Chuẩn Hóa Phát Âm IPA',
        description: 'Chuẩn hóa 44 âm IPA để nghe rõ đối tác quốc tế & nói chuẩn trọng âm.',
        page: 'ipa',
        autoSkipIfLevelAtLeast: 'A2',
      },
    ],
  },

  exam: {
    title: 'Lộ Trình Luyện Thi Chứng Chỉ Quốc Tế & VSTEP',
    subtitle: 'Chẩn đoán trình độ → Chiến thuật từng Part → Luyện kỹ năng → Thi thử bấm giờ & Chấm Rubric',
    theme: 'default',
    skillDistribution: [
      { skill: 'Luyện kỹ năng / Part', percent: 35, color: 'bg-rose-500' },
      { skill: 'Thi thử (Mock Test)', percent: 25, color: 'bg-amber-500' },
      { skill: 'Chiến thuật làm bài', percent: 20, color: 'bg-indigo-500' },
      { skill: 'Từ vựng & Collocations', percent: 10, color: 'bg-emerald-500' },
      { skill: 'Chẩn đoán & Sửa lỗi', percent: 10, color: 'bg-violet-500' },
    ],
    steps: [
      {
        idx: 0,
        code: 'E1',
        label: 'E1: Chẩn Đoán & Cấu Trúc Đề Thi',
        description: 'Nắm cấu trúc đề thi, thang điểm & làm bài test chẩn đoán điểm hiện tại.',
        page: 'exam',
        subView: 'diagnostic',
      },
      {
        idx: 1,
        code: 'E2',
        label: 'E2: Chiến Thuật & Mẹo Từng Part',
        description: 'Chiến thuật làm bài, phân bổ thời gian & tránh bẫy cho từng Part của kỳ thi.',
        page: 'exam',
        subView: 'strategies',
      },
      {
        idx: 2,
        code: 'E3',
        label: 'E3: Luyện Tập 4 Kỹ Năng',
        description: 'Ngân hàng câu hỏi luyện sâu từng kỹ năng Nghe – Đọc – Viết – Nói theo format.',
        page: 'exam',
        subView: 'practice',
      },
      {
        idx: 3,
        code: 'E4',
        label: 'E4: Phòng Thi Thử Bấm Giờ',
        description: 'Mini Mock Test bấm giờ thực tế & chấm điểm Writing/Speaking theo Rubric chuẩn.',
        page: 'exam',
        subView: 'mock',
      },
      {
        idx: 4,
        code: 'E5',
        label: 'E5: Chấm Writing & Speaking Rubric',
        description: 'Chấm bài viết & bài nói theo tiêu chí Rubric chuẩn của kỳ thi (AI & Offline).',
        page: 'exam',
        subView: 'rubric',
      },
      {
        idx: 5,
        code: 'E6',
        label: 'E6: Bổ Trợ Từ Vựng & Ngữ Pháp Thi',
        description: 'Kho từ vựng B1–C1 cốt lõi & sổ từ SRS để nâng band điểm nhanh chóng.',
        page: 'vocab',
      },
    ],
  },
};

export const PAGE_VISIBILITY: Record<PageKey, (profile?: LearnerProfile | null) => boolean> = {
  alphabet: (p) => {
    const aud = p?.audience || 'worker';
    if (aud === 'kids') return true;
    if (aud === 'exam') return false;
    return !isLevelAtLeast(p?.startLevel, 'A2');
  },
  ipa: (p) => (p?.audience || 'worker') !== 'kids',
  roadmap: (p) => {
    const aud = p?.audience || 'worker';
    return aud === 'worker' || aud === 'university' || aud === 'teen';
  },
  vocab: (p) => (p?.audience || 'worker') !== 'kids',
  srs: () => true,
  grammar: (p) => (p?.audience || 'worker') !== 'kids',
  sentence: (p) => {
    const aud = p?.audience || 'worker';
    return aud === 'teen' || aud === 'university' || aud === 'worker';
  },
  listenSpeak: (p) => {
    const aud = p?.audience || 'worker';
    return aud === 'teen' || aud === 'university' || aud === 'worker';
  },
  writing: (p) => {
    const aud = p?.audience || 'worker';
    return aud === 'teen' || aud === 'university' || aud === 'worker';
  },
  ocr: (p) => {
    const aud = p?.audience || 'worker';
    return aud === 'teen' || aud === 'university' || aud === 'worker';
  },
  kids: (p) => (p?.audience || 'worker') === 'kids',
  preschool: (p) => (p?.audience || 'worker') === 'preschool',
  school: (p) => (p?.audience || 'worker') === 'teen',
  academic: (p) => (p?.audience || 'worker') === 'university',
  workplace: (p) => (p?.audience || 'worker') === 'worker',
  exam: (p) => {
    const aud = p?.audience || 'worker';
    if (aud === 'exam') return true;
    if (aud === 'kids' && p?.kids?.goal === 'yle') return true;
    if (aud === 'teen' && (p?.teen?.goal === 'entrance10' || p?.teen?.goal === 'thpt')) return true;
    if (aud === 'university' && p?.university?.goal === 'graduation') return true;
    return false;
  },
  workbook: () => true,
  profile: () => true,
};

export function resolveTrack(profile?: LearnerProfile | null): TrackStep[] {
  const audience: AudienceId = profile?.audience || 'worker';
  const track = AUDIENCE_TRACKS[audience] || AUDIENCE_TRACKS.worker;

  return track.steps.map((step, idx) => {
    if (audience === 'kids' && step.code === 'K5' && profile?.kids?.goal === 'yle') {
      return {
        ...step,
        idx,
        subView: 'yle',
      };
    }
    return {
      ...step,
      idx,
    };
  });
}

export function canViewPage(page: PageKey, profile?: LearnerProfile | null): boolean {
  // Preschool learners live entirely inside the full-screen Kid Mode.
  if (profile?.audience === 'preschool') return page === 'preschool' || page === 'profile';
  const checker = PAGE_VISIBILITY[page];
  return checker ? checker(profile) : false;
}

export function isStepAutoPassed(step: TrackStep, profile?: LearnerProfile | null): boolean {
  if (!step.autoSkipIfLevelAtLeast || !profile) return false;
  return isLevelAtLeast(profile.startLevel, step.autoSkipIfLevelAtLeast);
}

export function getInitialUnlockedStepForTrack(steps: TrackStep[], _profile?: LearnerProfile | null): number {
  return Math.max(0, steps.length - 1);
}

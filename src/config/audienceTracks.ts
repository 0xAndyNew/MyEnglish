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
  /** Short mobile-friendly title, e.g. "Từ vựng", "Thi thử" */
  shortLabel?: string;
  /** One-line mobile subtitle */
  shortDesc?: string;
  emoji?: string;
  /** Illustration used on mobile tiles */
  image?: string;
  /** Shown in the "Ôn tập / Thi thử / Trò chơi" tab */
  practice?: boolean;
  /** Hidden from the main "Học" list (lives in Practice/Exam tab) */
  practiceOnly?: boolean;
}

/** Mobile UI metadata per step code (merged in resolveTrack) */
export const STEP_UI_META: Record<
  string,
  Pick<TrackStep, 'shortLabel' | 'shortDesc' | 'emoji' | 'image' | 'practice' | 'practiceOnly'>
> = {
  // Kids 6–10
  K1: { shortLabel: 'Từ vựng qua tranh', shortDesc: '24 chủ đề có hình & giọng đọc', emoji: '🐶', image: '/preschool/img/kids-ui/dog-cutout.webp' },
  K2: { shortLabel: 'Chữ cái & Phonics', shortDesc: 'A–Z, âm vui & tập viết', emoji: '🔤', image: '/preschool/img/kids-ui/robot-cutout.webp' },
  K3: { shortLabel: 'Truyện & Bài hát', shortDesc: 'Nghe truyện, hát theo nhạc', emoji: '📖', image: '/preschool/img/kids-ui/rabbit-cutout.webp' },
  K4: { shortLabel: 'Mẫu câu đầu tiên', shortDesc: 'Chào hỏi, xin phép, giới thiệu', emoji: '💬', image: '/preschool/img/kids-ui/girl-cutout.webp' },
  K5: { shortLabel: 'Trò chơi & YLE', shortDesc: 'Ghép tranh, nghe chọn hình', emoji: '🎮', image: '/preschool/img/kids-ui/trophy-cutout.webp', practice: true, practiceOnly: true },
  // Teen
  T1: { shortLabel: 'Bài học SGK 6–12', shortDesc: 'Từ vựng, ngữ pháp & bài tập Unit', emoji: '📗', image: '/img/art/concept-writing.webp' },
  T2: { shortLabel: 'Luyện đề 10 & THPT', shortDesc: 'Đề thi thử có giải thích chi tiết', emoji: '📝', image: '/img/art/concept-target.webp', practice: true, practiceOnly: true },
  T3: { shortLabel: 'Ngữ pháp trọng tâm', shortDesc: '14 chuyên đề + bài tổng hợp', emoji: '📐', image: '/img/art/concept-lightbulb.webp' },
  T4: { shortLabel: 'Ghép câu', shortDesc: 'Thực hành cấu trúc câu', emoji: '🧩', image: '/img/art/concept-tools.webp' },
  T5: { shortLabel: 'Nghe & Nói', shortDesc: 'Shadowing, hội thoại trường học', emoji: '🎧', image: '/img/art/concept-headphones.webp' },
  T6: { shortLabel: 'Phát âm IPA', shortDesc: '44 âm & quy tắc trọng âm', emoji: '🗣️', image: '/img/art/concept-speech.webp' },
  // University
  U1: { shortLabel: 'Từ vựng AWL', shortDesc: 'Academic Word List & collocations', emoji: '📚', image: '/img/art/concept-brain.webp' },
  U2: { shortLabel: 'Thuyết trình & Seminar', shortDesc: 'Mẫu câu thuyết trình, phản biện', emoji: '🎤', image: '/img/art/concept-meeting.webp' },
  U3: { shortLabel: 'Viết Email, Essay & CV', shortDesc: 'Viết học thuật & hồ sơ (AI chấm)', emoji: '✍️', image: '/img/art/concept-writing.webp' },
  U4: { shortLabel: 'Chuẩn đầu ra ĐH', shortDesc: 'VSTEP/IELTS/TOEIC & CV ATS', emoji: '🎓', image: '/img/art/concept-graduation.webp', practice: true, practiceOnly: true },
  U5: { shortLabel: 'Ngữ pháp học thuật', shortDesc: 'Câu phức, bị động, điều kiện', emoji: '📐', image: '/img/art/concept-lightbulb.webp' },
  U6: { shortLabel: 'Đọc OCR & Ôn từ', shortDesc: 'Quét tài liệu, ôn SRS', emoji: '📷', image: '/img/art/concept-camera.webp' },
  // Worker
  W1: { shortLabel: 'Công sở thực chiến', shortDesc: 'Họp, Email/Slack, phỏng vấn STAR', emoji: '💼', image: '/img/art/concept-office.webp' },
  W2: { shortLabel: 'Từ vựng cốt lõi', shortDesc: '133 bài theo chủ đề + kho 980 từ', emoji: '📚', image: '/img/art/concept-brain.webp' },
  W3: { shortLabel: 'Ghép câu & Ngữ pháp', shortDesc: '360+ mẫu câu theo ngành', emoji: '🧩', image: '/img/art/concept-tools.webp' },
  W4: { shortLabel: 'Nghe & Hội thoại', shortDesc: 'Shadowing & roleplay văn phòng', emoji: '🎧', image: '/img/art/concept-headphones.webp' },
  W5: { shortLabel: 'Viết Email', shortDesc: 'Song ngữ, AI chấm & OCR', emoji: '✉️', image: '/img/art/concept-contract.webp' },
  W6: { shortLabel: 'Phát âm chuẩn IPA', shortDesc: '44 âm, nói chuẩn trọng âm', emoji: '🗣️', image: '/img/art/concept-speech.webp' },
  // Exam
  E1: { shortLabel: 'Bản đồ đề thi & Tiêu chí', shortDesc: 'Cấu trúc các Part, CEFR & thang điểm', emoji: '🗺️', image: '/img/art/concept-search.webp' },
  E2: { shortLabel: 'Chiến thuật từng Part', shortDesc: 'Quy trình làm bài, né bẫy & áp dụng', emoji: '🧭', image: '/img/art/concept-compass.webp', practiceOnly: true },
  E3: { shortLabel: 'Luyện 4 kỹ năng', shortDesc: 'Nghe – Đọc – Viết – Nói & Lưu từ SRS', emoji: '🎯', image: '/img/art/concept-target.webp' },
  E4: { shortLabel: 'Thi thử bấm giờ', shortDesc: 'Mock test bấm giờ thực tế', emoji: '⏱️', image: '/img/art/concept-clock.webp', practice: true, practiceOnly: true },
  E5: { shortLabel: 'Chấm Rubric W&S', shortDesc: 'Chấm Writing & Speaking theo tiêu chí', emoji: '📊', image: '/img/art/concept-chart.webp', practice: true, practiceOnly: true },
  E6: { shortLabel: 'Từ vựng & Ngữ pháp thi', shortDesc: 'Từ khóa theo chứng chỉ, ngữ pháp & SRS', emoji: '📚', image: '/img/art/concept-brain.webp' },
};

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
        code: 'T5',
        label: 'T5: Nghe & Nói Học Đường',
        description: 'Luyện nghe, đọc nhại Shadowing và hội thoại đời sống – trường học.',
        page: 'listenSpeak',
      },
      {
        idx: 4,
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
        label: 'W2: Nạp Từ Vựng Công Việc',
        description: '133 bài từ vựng cốt lõi + Kho 980+ từ thông dụng theo cấp độ.',
        page: 'roadmap',
      },
      {
        idx: 2,
        code: 'W4',
        label: 'W4: Nghe & Hội Thoại Công Việc',
        description: 'Luyện nghe-đọc, Shadowing & Roleplay hội thoại văn phòng, IT, kinh doanh, CSKH.',
        page: 'listenSpeak',
      },
      {
        idx: 3,
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
    subtitle: 'Bản đồ đề thi & tiêu chí → Luyện 4 kỹ năng → Từ vựng & Ngữ pháp thi',
    theme: 'default',
    skillDistribution: [
      { skill: 'Luyện kỹ năng / Part', percent: 35, color: 'bg-rose-500' },
      { skill: 'Thi thử (Mock Test)', percent: 25, color: 'bg-amber-500' },
      { skill: 'Chiến thuật làm bài', percent: 20, color: 'bg-indigo-500' },
      { skill: 'Từ vựng & Collocations', percent: 10, color: 'bg-emerald-500' },
      { skill: 'Bản đồ đề & Tiêu chí', percent: 10, color: 'bg-violet-500' },
    ],
    steps: [
      {
        idx: 0,
        code: 'E1',
        label: 'E1: Bản Đồ Đề Thi & Tiêu Chí Điểm',
        description: 'Hiểu cấu trúc từng phần thi, thời lượng, thang quy đổi CEFR và tiêu chí chấm Rubric.',
        page: 'exam',
        subView: 'diagnostic',
      },
      {
        idx: 1,
        code: 'E2',
        label: 'E2: Chiến Thuật & Quy Trình Từng Part',
        description: 'Quy trình làm bài, tránh bẫy theo từng Part và chuyển thẳng sang bài áp dụng.',
        page: 'exam',
        subView: 'strategies',
      },
      {
        idx: 2,
        code: 'E3',
        label: 'E3: Thư Viện 4 Kỹ Năng & Bài Mẫu',
        description: 'Nghe – Đọc – Viết – Nói phân rõ chuẩn đề thi / bổ trợ, kèm nút lưu từ SRS.',
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
        label: 'E6: Từ Vựng & Ngữ Pháp Trọng Tâm Thi',
        description: 'Từ khóa ăn điểm theo từng chứng chỉ, ngữ pháp trọng tâm ra thi & ôn SRS.',
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
    const ui = STEP_UI_META[step.code] || {};
    if (audience === 'kids' && step.code === 'K5' && profile?.kids?.goal === 'yle') {
      return {
        ...ui,
        ...step,
        idx,
        subView: 'yle',
      };
    }
    return {
      ...ui,
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

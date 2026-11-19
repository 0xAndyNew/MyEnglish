import type { LewAgeLevelId, LewAvatarId, LewObservationCode } from './lewTypes';

export interface LewAgeLevelMeta {
  id: LewAgeLevelId;
  code: string;
  name: string;
  ageRangeVi: string;
  shortAgeVi: string;
  color: string;
  softBg: string;
  borderHex: string;
  isParentLed: boolean;
  maxChoices: 2 | 3 | 4;
  recommendedSessionVi: string;
  mainGoalVi: string;
  interactionSummaryVi: string;
  skillsVi: {
    listening: string;
    speaking: string;
    vocabulary: string;
    literacy: string;
  };
}

export const LEW_AGE_LEVELS: Record<LewAgeLevelId, LewAgeLevelMeta> = {
  level1: {
    id: 'level1',
    code: 'Level 1',
    name: 'Little Listener',
    ageRangeVi: '1–2 tuổi',
    shortAgeVi: '1–2 tuổi',
    color: '#F59E0B',
    softBg: '#FFFBEB',
    borderHex: '#FDE68A',
    isParentLed: true,
    maxChoices: 2,
    recommendedSessionVi: '3–5 phút (Cha mẹ dẫn dắt)',
    mainGoalVi: 'Làm quen âm thanh và ngôn ngữ qua người chăm sóc.',
    interactionSummaryVi:
      'Cha mẹ dùng audio, tranh lớn, đồ vật thật, bài hát và vận động. Không để bé tự học một mình trên màn hình.',
    skillsVi: {
      listening: 'Quen âm thanh tiếng Anh, nhận ra từ rất gần gũi.',
      speaking: 'Không ép nói; chấp nhận phản hồi bằng nhìn, chỉ tay, vỗ tay hoặc cử chỉ.',
      vocabulary: '3–4 từ rất gần gũi mỗi chủ đề (người thân, đồ vật thật quanh bé).',
      literacy: 'Nghe nhịp điệu bài hát và xem tranh lớn cùng cha mẹ.',
    },
  },
  level2: {
    id: 'level2',
    code: 'Level 2',
    name: 'Little Explorer',
    ageRangeVi: '2–3 tuổi',
    shortAgeVi: '2–3 tuổi',
    color: '#10B981',
    softBg: '#ECFDF5',
    borderHex: '#A7F3D0',
    isParentLed: false,
    maxChoices: 2,
    recommendedSessionVi: '5–8 phút cùng cha mẹ',
    mainGoalVi: 'Nhận biết từ đơn, hiểu chỉ dẫn ngắn và bắt đầu dùng từ/cụm từ.',
    interactionSummaryVi:
      'Chạm chọn 1 trong 2 hình lớn cùng cha mẹ, nghe và tìm đồ vật, bắt chước hành động.',
    skillsVi: {
      listening: 'Hiểu từ đơn và câu chỉ dẫn ngắn ("Find the dog!").',
      speaking: 'Bắt đầu bắt chước tiếng kêu, từ đơn hoặc cụm 2 từ.',
      vocabulary: '4 từ cơ bản mỗi chủ đề (màu sắc, con vật, trái cây, đồ chơi, cơ thể).',
      literacy: 'Xem tranh truyện ngắn và nghe vần điệu.',
    },
  },
  level3: {
    id: 'level3',
    code: 'Level 3',
    name: 'Little Speaker',
    ageRangeVi: '3–4 tuổi',
    shortAgeVi: '3–4 tuổi',
    color: '#3B82F6',
    softBg: '#EFF6FF',
    borderHex: '#BFDBFE',
    isParentLed: false,
    maxChoices: 3,
    recommendedSessionVi: '8–10 phút',
    mainGoalVi: 'Hiểu câu đơn giản, nói từ và câu ngắn trong tình huống quen thuộc.',
    interactionSummaryVi:
      'Nghe – chọn trong 3 hình – ghép cặp – trả lời câu hỏi ngắn; đóng vai và kể chuyện tranh cùng cha mẹ.',
    skillsVi: {
      listening: 'Hiểu câu hỏi và câu lệnh quen thuộc ("What’s this?", "Where is...?").',
      speaking: 'Nói cụm từ và câu ngắn ("It’s a dog.", "I like apples.").',
      vocabulary: '5 từ theo chủ đề và hành động quen thuộc.',
      literacy: 'Nhận biết hình ảnh và ký hiệu; chưa yêu cầu đọc chữ.',
    },
  },
  level4: {
    id: 'level4',
    code: 'Level 4',
    name: 'Little Communicator',
    ageRangeVi: '4–5 tuổi',
    shortAgeVi: '4–5 tuổi',
    color: '#8B5CF6',
    softBg: '#F5F3FF',
    borderHex: '#DDD6FE',
    isParentLed: false,
    maxChoices: 3,
    recommendedSessionVi: '10–12 phút',
    mainGoalVi: 'Diễn đạt ý tưởng, miêu tả đơn giản và tham gia hội thoại ngắn.',
    interactionSummaryVi:
      'Trò chơi phân loại, tìm hình biến mất, kể chuyện theo chuỗi tranh và hội thoại tình huống.',
    skillsVi: {
      listening: 'Hiểu hội thoại ngắn và câu miêu tả có ngữ cảnh.',
      speaking: 'Miêu tả đồ vật (to/nhỏ, màu sắc) và trả lời về sở thích.',
      vocabulary: '6 từ mở rộng kèm tính từ và hành động.',
      literacy: 'Làm quen chữ cái và âm đầu qua trò chơi nhẹ nhàng.',
    },
  },
  level5: {
    id: 'level5',
    code: 'Level 5',
    name: 'Little English Star',
    ageRangeVi: '5–6 tuổi',
    shortAgeVi: '5–6 tuổi',
    color: '#EC4899',
    softBg: '#FDF2F8',
    borderHex: '#FBCFE8',
    isParentLed: false,
    maxChoices: 4,
    recommendedSessionVi: '10–15 phút',
    mainGoalVi: 'Giao tiếp cơ bản và chuẩn bị nền tảng ngôn ngữ đầu tiểu học.',
    interactionSummaryVi:
      'Đóng vai, kể lại truyện 4 tranh, phân loại, làm quen âm/chữ (Phonics) qua trò chơi vui — không biến thành luyện thi.',
    skillsVi: {
      listening: 'Hiểu hướng dẫn và truyện ngắn 4 trang.',
      speaking: 'Hội thoại ngắn và kể lại nội dung đơn giản theo tranh.',
      vocabulary: '6–8 từ mở rộng theo tình huống gia đình, trường học, thiên nhiên.',
      literacy: 'Nhận biết âm đầu (Phonics) và từ ngắn theo mức sẵn sàng.',
    },
  },
};

export const LEW_LEVEL_ORDER: LewAgeLevelId[] = ['level1', 'level2', 'level3', 'level4', 'level5'];

export const LEW_AVATARS: { id: LewAvatarId; name: string; roleVi: string; img: string; bg: string }[] = [
  {
    id: 'benny',
    name: 'Benny',
    roleVi: 'Gấu nhỏ ấm áp',
    img: '/preschool/img/mascot/hello.webp',
    bg: '#FEF3C7',
  },
  {
    id: 'toto',
    name: 'Toto',
    roleVi: 'Gà con tinh nghịch',
    img: '/preschool/img/words/duck.webp',
    bg: '#FEF9C3',
  },
  {
    id: 'bunny',
    name: 'Mimi',
    roleVi: 'Thỏ trắng đáng yêu',
    img: '/preschool/img/words/rabbit.webp',
    bg: '#FCE7F3',
  },
  {
    id: 'kitty',
    name: 'Kiki',
    roleVi: 'Mèo con vui vẻ',
    img: '/preschool/img/words/cat.webp',
    bg: '#FFEDD5',
  },
];

export const LEW_OBSERVATION_META: Record<
  LewObservationCode,
  { code: LewObservationCode; labelVi: string; descVi: string; badgeBg: string; badgeText: string }
> = {
  recognized: {
    code: 'recognized',
    labelVi: 'Nhận diện được hình',
    descVi: 'Bé nhìn, chỉ tay hoặc chạm đúng hình khi nghe từ',
    badgeBg: '#DBEAFE',
    badgeText: '#1E40AF',
  },
  understood: {
    code: 'understood',
    labelVi: 'Hiểu chỉ dẫn ngắn',
    descVi: 'Bé hiểu câu hỏi hoặc làm theo động tác cùng cha mẹ',
    badgeBg: '#D1FAE5',
    badgeText: '#065F46',
  },
  spoke: {
    code: 'spoke',
    labelVi: 'Thử phát âm / nói từ',
    descVi: 'Bé bật âm, nói theo từ đơn hoặc câu ngắn',
    badgeBg: '#FCE7F3',
    badgeText: '#9D174D',
  },
  real_life: {
    code: 'real_life',
    labelVi: 'Dùng với đồ vật thật',
    descVi: 'Bé chỉ hoặc gọi tên đồ vật thật trong nhà',
    badgeBg: '#FEF3C7',
    badgeText: '#92400E',
  },
  needs_review: {
    code: 'needs_review',
    labelVi: 'Cần gặp lại',
    descVi: 'Nên ôn lại nhẹ nhàng vào buổi sau',
    badgeBg: '#FFEDD5',
    badgeText: '#9A3412',
  },
  not_observed: {
    code: 'not_observed',
    labelVi: 'Chưa quan sát được',
    descVi: 'Hôm nay bé chỉ nghe, chưa phản hồi rõ ràng',
    badgeBg: '#F1F5F9',
    badgeText: '#475569',
  },
};

export function ageBandToLewLevel(ageBand?: '1-2' | '3-4' | '5-6'): LewAgeLevelId {
  if (ageBand === '1-2') return 'level1';
  if (ageBand === '5-6') return 'level5';
  return 'level3';
}

export const PRACTICAL_CATEGORIES = [
  'Đời sống & Giao tiếp',
  'Du lịch & Khách sạn',
  'Ẩm thực & Mua sắm',
  'Văn phòng & Email',
  'IT / Kỹ thuật',
  'Kinh doanh & CSKH',
  'Phỏng vấn & Nhân sự',
  'Y tế & Sức khỏe',
  'Tài chính & Logistics',
  'Giáo dục & Xã hội',
] as const;

export type PracticalCategory = (typeof PRACTICAL_CATEGORIES)[number];

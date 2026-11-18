import { AudienceId, LearnerProfile } from '../types/audience';
import { CefrLevel } from '../types/learning';

export interface AudienceTaggableItem {
  level?: CefrLevel;
  category?: string;
  topic?: string;
  audiences?: AudienceId[];
}

const WORKER_ONLY_CATEGORIES = new Set([
  'Văn phòng & Email',
  'IT / Kỹ thuật',
  'Kinh doanh & CSKH',
  'Tài chính & Logistics',
  'Phỏng vấn & Nhân sự',
  'Giao tiếp công việc',
  'Công việc & Phỏng vấn',
  'Giao tiếp & Công việc',
]);

const GENERAL_LIFE_CATEGORIES = new Set([
  'Đời sống & Giao tiếp',
  'Ẩm thực & Mua sắm',
  'Du lịch & Khách sạn',
  'Hội thoại đời sống',
  'Bài đọc cơ bản',
  'Đời sống & Du lịch',
  'Giao tiếp cơ bản',
  'Dịch vụ & Đời sống',
]);

const TEEN_ALLOWED_CATEGORIES = new Set([
  'Đời sống & Giao tiếp',
  'Ẩm thực & Mua sắm',
  'Du lịch & Khách sạn',
  'Y tế & Sức khỏe',
  'Giáo dục & Xã hội',
  'Hội thoại đời sống',
  'Bài đọc cơ bản',
  'Đời sống & Du lịch',
  'Giao tiếp cơ bản',
  'Dịch vụ & Đời sống',
  // Teen core vocabulary & grammar topics
  'Gia đình',
  'Trường học',
  'Thiên nhiên',
  'Động vật',
  'Đồ ăn',
  'Thời gian',
  'Cảm xúc',
  'Hành động',
  'Mô tả',
  'Nhà cửa',
  'Màu sắc',
  'Số đếm',
  'Câu đơn & Hiện tại đơn',
  'Hiện tại tiếp diễn',
  'Quá khứ đơn & Tiếp diễn',
  'Từ loại & Mạo từ',
  'Câu hỏi & Nhờ vả',
]);

const UNIVERSITY_ALLOWED_CATEGORIES = new Set([
  'IT / Kỹ thuật',
  'Giáo dục & Xã hội',
  'Phỏng vấn & Nhân sự',
  'Công việc & Phỏng vấn',
  'Y tế & Sức khỏe',
  'Kinh doanh & CSKH',
  'Tài chính & Logistics',
  'Học thuật',
  'Công nghệ',
  'Xã hội',
  'Kinh tế',
  'Khoa học',
  'Tương lai & Hoàn thành',
  'Từ nối & Điều kiện',
]);

const EXAM_ALLOWED_TOPICS = new Set([
  'Học thuật',
  'Xã hội',
  'Kinh tế',
  'Môi trường',
  'Công nghệ',
  'Sức khỏe',
  'Giáo dục',
  'Giáo dục & Xã hội',
  'Y tế & Sức khỏe',
  'Mô tả',
  'Cảm xúc',
  'Hành động',
]);

/**
 * Suy luận nhóm đối tượng phù hợp cho các bài học sẵn có chưa khai báo trường `audiences`.
 */
export function inferAudiences(item: AudienceTaggableItem): AudienceId[] {
  if (Array.isArray(item.audiences) && item.audiences.length > 0) {
    return item.audiences;
  }

  const tag = (item.category || item.topic || '').trim();
  const level = item.level;

  if (WORKER_ONLY_CATEGORIES.has(tag)) {
    if (tag === 'IT / Kỹ thuật' || tag === 'Phỏng vấn & Nhân sự' || tag === 'Công việc & Phỏng vấn') {
      return ['worker', 'university'];
    }
    return ['worker'];
  }

  if (tag === 'Y tế & Sức khỏe' || tag === 'Giáo dục & Xã hội') {
    if (level === 'B2' || level === 'C1') {
      return ['university', 'exam', 'worker'];
    }
    return ['teen', 'university', 'exam'];
  }

  if (GENERAL_LIFE_CATEGORIES.has(tag)) {
    if (level === 'A0' || level === 'A1') {
      return ['kids', 'teen', 'worker'];
    }
    if (level === 'A2' || level === 'B1') {
      return ['teen', 'worker'];
    }
    return ['worker', 'university'];
  }

  if (EXAM_ALLOWED_TOPICS.has(tag) && (level === 'B1' || level === 'B2' || level === 'C1')) {
    return ['exam', 'university'];
  }

  if (level === 'A0' || level === 'A1') {
    return ['kids', 'teen', 'worker'];
  }
  if (level === 'A2' || level === 'B1') {
    return ['teen', 'worker', 'university'];
  }
  return ['university', 'exam', 'worker'];
}

export function isItemVisibleForProfile(
  item: AudienceTaggableItem,
  profile?: LearnerProfile | null
): boolean {
  if (!profile) return true;
  const targetAudience = profile.audience;
  const audiences = inferAudiences(item);
  if (!audiences.includes(targetAudience)) return false;

  const tag = (item.category || item.topic || '').trim();

  if (targetAudience === 'kids') {
    return !item.level || item.level === 'A0' || item.level === 'A1';
  }

  if (targetAudience === 'teen') {
    if (item.level === 'B2' || item.level === 'C1') return false;
    if (WORKER_ONLY_CATEGORIES.has(tag)) return false;
    if (tag && !TEEN_ALLOWED_CATEGORIES.has(tag) && !tag.includes('Đời sống') && !tag.includes('Câu')) {
      return item.level === 'A1' || item.level === 'A2';
    }
    return true;
  }

  if (targetAudience === 'university') {
    if (item.level === 'A0' || item.level === 'A1') return false;
    if (tag && UNIVERSITY_ALLOWED_CATEGORIES.has(tag)) return true;
    return item.level === 'B1' || item.level === 'B2' || item.level === 'C1';
  }

  if (targetAudience === 'exam') {
    return !item.level || item.level === 'B1' || item.level === 'B2' || item.level === 'C1';
  }

  if (targetAudience === 'worker') {
    const selectedIndustries = profile.worker?.industries || [];
    // Nếu người đi làm có chọn ngành riêng và item thuộc một ngành chuyên biệt khác -> ẩn ngành không chọn
    if (
      selectedIndustries.length > 0 &&
      WORKER_ONLY_CATEGORIES.has(tag) &&
      !selectedIndustries.includes(tag) &&
      tag !== 'Giao tiếp công việc' &&
      tag !== 'Giao tiếp & Công việc' &&
      tag !== 'Công việc & Phỏng vấn'
    ) {
      return false;
    }
    return true;
  }

  return true;
}

export function getAllowedCategoriesForProfile(
  allCategories: readonly string[],
  profile?: LearnerProfile | null
): string[] {
  if (!profile) return [...allCategories];
  const aud = profile.audience;

  let filtered: string[];
  if (aud === 'teen') {
    filtered = allCategories.filter(
      (cat) => !WORKER_ONLY_CATEGORIES.has(cat) && (TEEN_ALLOWED_CATEGORIES.has(cat) || !cat.includes('Công việc'))
    );
  } else if (aud === 'kids') {
    filtered = allCategories.filter((cat) => GENERAL_LIFE_CATEGORIES.has(cat));
  } else if (aud === 'university') {
    filtered = allCategories.filter(
      (cat) => UNIVERSITY_ALLOWED_CATEGORIES.has(cat) || !GENERAL_LIFE_CATEGORIES.has(cat)
    );
  } else if (aud === 'exam') {
    filtered = allCategories.filter((cat) => EXAM_ALLOWED_TOPICS.has(cat));
  } else if (aud === 'worker') {
    const selectedIndustries = profile.worker?.industries || [];
    if (selectedIndustries.length > 0) {
      filtered = allCategories.filter(
        (cat) =>
          !WORKER_ONLY_CATEGORIES.has(cat) ||
          selectedIndustries.includes(cat) ||
          cat === 'Giao tiếp công việc' ||
          cat === 'Giao tiếp & Công việc' ||
          cat === 'Công việc & Phỏng vấn'
      );
    } else {
      filtered = [...allCategories];
    }
  } else {
    filtered = [...allCategories];
  }

  // Ưu tiên các ngành học viên đã chọn lên đầu
  const preferred =
    aud === 'worker'
      ? profile.worker?.industries || []
      : aud === 'university'
      ? profile.university?.majorCategories || []
      : [];

  if (preferred.length === 0) return filtered;

  const preferredSet = new Set(preferred);
  return [
    ...filtered.filter((c) => preferredSet.has(c)),
    ...filtered.filter((c) => !preferredSet.has(c)),
  ];
}

export function filterAndSortByProfile<T extends AudienceTaggableItem>(
  items: T[],
  profile?: LearnerProfile | null
): T[] {
  if (!profile) return items;

  const visible = items.filter((item) => isItemVisibleForProfile(item, profile));
  const safeVisible = visible.length > 0 ? visible : items;
  const preferredTags = new Set(
    profile.audience === 'worker'
      ? profile.worker?.industries || []
      : profile.audience === 'university'
      ? profile.university?.majorCategories || []
      : []
  );

  if (preferredTags.size === 0) {
    return safeVisible;
  }

  return [...safeVisible].sort((a, b) => {
    const aTag = (a.category || a.topic || '').trim();
    const bTag = (b.category || b.topic || '').trim();
    const aScore = preferredTags.has(aTag) ? 1 : 0;
    const bScore = preferredTags.has(bTag) ? 1 : 0;
    return bScore - aScore;
  });
}

export interface ExamplePart {
  token: string;
  role: string;
  color: 'blue' | 'orange' | 'green' | 'purple' | 'amber';
}

export interface ExampleAnalysis {
  tenseNote: string;
  parts: ExamplePart[];
}

export const EXAMPLE_BREAKDOWNS: Record<string, ExampleAnalysis[]> = {
  'gl-noun': [
    {
      tenseNote: 'Nhận biết các Danh từ (N) trong câu — gọi tên người, vật, nơi chốn',
      parts: [
        { token: 'teacher', role: 'Danh từ (N) • Chỉ người', color: 'blue' },
        { token: 'book', role: 'Danh từ (N) • Chỉ đồ vật', color: 'green' },
        { token: 'office', role: 'Danh từ (N) • Chỉ nơi chốn', color: 'amber' },
      ],
    },
    {
      tenseNote: 'Nhận biết Danh từ không đếm được (chỉ khái niệm)',
      parts: [
        { token: 'Communication', role: 'Danh từ (N) • Đuôi -tion (không đếm được)', color: 'blue' },
        { token: 'trust', role: 'Danh từ (N) • Khái niệm trừu tượng', color: 'green' },
      ],
    },
  ],
  'gl-verb': [
    {
      tenseNote: 'Nhận biết Động từ (V) chỉ hành động trong câu',
      parts: [
        { token: 'learn', role: 'Động từ hành động (V) • Học', color: 'orange' },
        { token: 'practice', role: 'Động từ hành động (V) • Luyện tập', color: 'orange' },
      ],
    },
    {
      tenseNote: 'Nhận biết Động từ (V) có đuôi -ate',
      parts: [
        { token: 'collaborate', role: 'Động từ hành động (V) • Đuôi -ate (hợp tác)', color: 'orange' },
        { token: 'closely', role: 'Trạng từ đi kèm bổ nghĩa cách hợp tác', color: 'purple' },
      ],
    },
  ],
  'gl-article': [
    {
      tenseNote: 'Nhận biết Mạo từ "a" (trước phụ âm) & "an" (trước nguyên âm u, e, o, a, i)',
      parts: [
        { token: 'a new book', role: 'Mạo từ "a" + cụm Danh từ (bắt đầu phụ âm)', color: 'amber' },
        { token: 'an umbrella', role: 'Mạo từ "an" + Danh từ (bắt đầu nguyên âm u)', color: 'purple' },
      ],
    },
    {
      tenseNote: 'Nhận biết Mạo từ "The" khi Danh từ đã được xác định rõ',
      parts: [
        { token: 'The book', role: 'Mạo từ "The" + Danh từ đã xác định (trên bàn)', color: 'amber' },
        { token: 'the table', role: 'Mạo từ "the" + Danh từ xác định (cái bàn đó)', color: 'green' },
      ],
    },
  ],
  'gl-adj': [
    {
      tenseNote: 'Nhận biết Tính từ (Adj) đứng TRƯỚC Danh từ',
      parts: [
        { token: 'comfortable', role: 'Tính từ (Adj) • Đuôi -able, đứng trước N', color: 'purple' },
        { token: 'chair', role: 'Danh từ (N) được mô tả', color: 'green' },
      ],
    },
    {
      tenseNote: 'Nhận biết Tính từ (Adj) đứng SAU động từ "to be" (is)',
      parts: [
        { token: 'is', role: 'Động từ "to be"', color: 'orange' },
        { token: 'confident', role: 'Tính từ (Adj) • Đuôi -ent, đứng sau "to be"', color: 'purple' },
      ],
    },
  ],
  'gl-adv': [
    {
      tenseNote: 'Nhận biết Trạng từ (Adv) đuôi -ly bổ nghĩa cho Động từ',
      parts: [
        { token: 'learns', role: 'Động từ (V) được bổ nghĩa', color: 'orange' },
        { token: 'quickly', role: 'Trạng từ (Adv) • Đuôi -ly (một cách nhanh chóng)', color: 'purple' },
      ],
    },
    {
      tenseNote: 'Nhận biết Trạng từ (Adv) "carefully" đứng sau Động từ "listen"',
      parts: [
        { token: 'listen', role: 'Động từ (V) được bổ nghĩa', color: 'orange' },
        { token: 'carefully', role: 'Trạng từ (Adv) • Đuôi -ly (một cách cẩn thận)', color: 'purple' },
      ],
    },
  ],
  'gl-2': [
    {
      tenseNote: 'Câu đơn chuẩn: S + V + O + Nơi chốn + Thời gian',
      parts: [
        { token: 'I', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'learn', role: 'Động từ (V)', color: 'orange' },
        { token: 'English', role: 'Tân ngữ (O) • Danh từ', color: 'green' },
        { token: 'at home', role: 'Nơi chốn (đặt trước Thời gian)', color: 'purple' },
        { token: 'every evening', role: 'Thời gian (cuối câu)', color: 'amber' },
      ],
    },
    {
      tenseNote: 'Câu đơn với "to be" + Tính từ',
      parts: [
        { token: 'They', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'are', role: 'Động từ to be (V)', color: 'orange' },
        { token: 'very friendly', role: 'Trạng từ + Tính từ (Adj)', color: 'purple' },
      ],
    },
  ],
  'gl-3': [
    {
      tenseNote: 'Thì Hiện tại đơn — Dấu hiệu: "every day" (thói quen hàng ngày)',
      parts: [
        { token: 'I', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'practice', role: 'Động từ (V) • Nguyên mẫu (đi với I)', color: 'orange' },
        { token: 'English', role: 'Tân ngữ (O) • Danh từ', color: 'green' },
        { token: 'every day', role: 'Dấu hiệu Hiện tại đơn', color: 'amber' },
      ],
    },
    {
      tenseNote: 'Thì Hiện tại đơn — Ngôi số ít "He" nên động từ thêm -s ("works")',
      parts: [
        { token: 'He', role: 'Chủ ngữ số ít (S)', color: 'blue' },
        { token: 'works', role: 'Động từ (V) • Thêm -s', color: 'orange' },
        { token: 'at a software company', role: 'Nơi chốn • Cụm Danh từ', color: 'green' },
      ],
    },
  ],
  'gl-4': [
    {
      tenseNote: 'Thì Hiện tại tiếp diễn — Dấu hiệu: "right now" (đang xảy ra ngay lúc nói)',
      parts: [
        { token: 'I', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'am listening', role: 'am + V-ing • Hiện tại tiếp diễn', color: 'orange' },
        { token: 'to an English podcast', role: 'Tân ngữ (O) • Cụm Danh từ', color: 'green' },
        { token: 'right now', role: 'Dấu hiệu Hiện tại tiếp diễn', color: 'amber' },
      ],
    },
    {
      tenseNote: 'Thì Hiện tại tiếp diễn — Dấu hiệu: "at the moment"',
      parts: [
        { token: 'They', role: 'Chủ ngữ số nhiều (S)', color: 'blue' },
        { token: 'are having', role: 'are + V-ing • Hiện tại tiếp diễn', color: 'orange' },
        { token: 'a meeting', role: 'Tân ngữ (O) • Danh từ', color: 'green' },
        { token: 'at the moment', role: 'Dấu hiệu Hiện tại tiếp diễn', color: 'amber' },
      ],
    },
  ],
  'gl-5': [
    {
      tenseNote: 'Thì Quá khứ đơn — Dấu hiệu: "last month" (đã kết thúc trong quá khứ)',
      parts: [
        { token: 'We', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'visited', role: 'V-ed • Quá khứ đơn', color: 'orange' },
        { token: 'Hanoi', role: 'Tân ngữ (O) • Danh từ riêng', color: 'green' },
        { token: 'last month', role: 'Dấu hiệu Quá khứ đơn', color: 'amber' },
      ],
    },
    {
      tenseNote: 'Thì Quá khứ đơn phủ định — Dùng "did not + V nguyên mẫu (sleep)"',
      parts: [
        { token: 'I', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'did not sleep', role: 'didn\'t + V nguyên mẫu', color: 'orange' },
        { token: 'well', role: 'Trạng từ (Adv)', color: 'purple' },
        { token: 'last night', role: 'Dấu hiệu Quá khứ đơn', color: 'amber' },
      ],
    },
  ],
  'gl-6': [
    {
      tenseNote: 'Thì Quá khứ tiếp diễn (đang đọc) + Quá khứ đơn (xen vào: called)',
      parts: [
        { token: 'I', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'was reading', role: 'was + V-ing • Quá khứ tiếp diễn', color: 'orange' },
        { token: 'a book', role: 'Tân ngữ (O) • Danh từ', color: 'green' },
        { token: 'when you called me', role: 'Hành động xen vào • Quá khứ đơn', color: 'amber' },
      ],
    },
    {
      tenseNote: 'Thì Quá khứ tiếp diễn — Giờ cụ thể trong quá khứ: "At 9 AM yesterday"',
      parts: [
        { token: 'At 9 AM yesterday', role: 'Dấu hiệu Quá khứ tiếp diễn', color: 'amber' },
        { token: 'they', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'were working', role: 'were + V-ing • Quá khứ tiếp diễn', color: 'orange' },
        { token: 'in the office', role: 'Nơi chốn • Danh từ', color: 'green' },
      ],
    },
  ],
  'gl-7': [
    {
      tenseNote: 'Thì Tương lai đơn — Dấu hiệu: "tomorrow morning"',
      parts: [
        { token: 'I', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'will call', role: 'will + V nguyên mẫu • Tương lai đơn', color: 'orange' },
        { token: 'you back', role: 'Tân ngữ (O)', color: 'green' },
        { token: 'tomorrow morning', role: 'Dấu hiệu Tương lai đơn', color: 'amber' },
      ],
    },
    {
      tenseNote: 'Thì Tương lai đơn — Lời hứa "I promise"',
      parts: [
        { token: 'I promise', role: 'Dấu hiệu lời hứa', color: 'amber' },
        { token: 'I', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'will practice', role: 'will + V nguyên mẫu • Tương lai đơn', color: 'orange' },
        { token: 'every day', role: 'Tần suất', color: 'purple' },
      ],
    },
  ],
  'gl-8': [
    {
      tenseNote: 'Thì Hiện tại hoàn thành — Nhấn mạnh kết quả đã đạt được tới hiện tại',
      parts: [
        { token: 'We', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'have improved', role: 'have + V3/ed • Hiện tại hoàn thành', color: 'orange' },
        { token: 'our English', role: 'Tân ngữ (O) • Danh từ', color: 'green' },
        { token: 'significantly', role: 'Trạng từ (Adv)', color: 'purple' },
      ],
    },
    {
      tenseNote: 'Thì Hiện tại hoàn thành — Dấu hiệu: "since 2020" (từ 2020 đến nay)',
      parts: [
        { token: 'I', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'have lived', role: 'have + V3/ed • Hiện tại hoàn thành', color: 'orange' },
        { token: 'here', role: 'Trạng từ nơi chốn', color: 'purple' },
        { token: 'since 2020', role: 'Dấu hiệu Hiện tại hoàn thành', color: 'amber' },
      ],
    },
  ],
  'gl-9': [
    {
      tenseNote: 'Câu nhờ vả lịch sự: Could you + V nguyên mẫu',
      parts: [
        { token: 'Could', role: 'Trợ động từ lịch sự', color: 'amber' },
        { token: 'you', role: 'Chủ ngữ (S)', color: 'blue' },
        { token: 'speak', role: 'Động từ (V) • Nguyên mẫu', color: 'orange' },
        { token: 'a little more slowly', role: 'Cụm Trạng từ (Adv)', color: 'purple' },
      ],
    },
    {
      tenseNote: 'Câu hỏi Hiện tại đơn: Từ hỏi + does + S + V nguyên mẫu',
      parts: [
        { token: 'What time', role: 'Từ hỏi thời gian', color: 'amber' },
        { token: 'does', role: 'Trợ động từ (đi với meeting)', color: 'orange' },
        { token: 'the meeting', role: 'Danh từ • Chủ ngữ (S)', color: 'blue' },
        { token: 'start', role: 'Động từ (V) • Nguyên mẫu', color: 'green' },
      ],
    },
  ],
  'gl-10': [
    {
      tenseNote: 'Câu phức dùng từ nối "because" (nêu nguyên nhân)',
      parts: [
        { token: 'I practice every day', role: 'Mệnh đề kết quả (Hiện tại đơn)', color: 'blue' },
        { token: 'because', role: 'Từ nối chỉ nguyên nhân', color: 'amber' },
        { token: 'I want to speak fluently', role: 'Mệnh đề nguyên nhân (V + Adv)', color: 'green' },
      ],
    },
    {
      tenseNote: 'Câu điều kiện loại 1: If + Hiện tại đơn, S + will + V',
      parts: [
        { token: 'If', role: 'Từ nối điều kiện', color: 'amber' },
        { token: 'we collaborate closely', role: 'Mệnh đề If • Hiện tại đơn', color: 'blue' },
        { token: 'we will achieve', role: 'Mệnh đề chính • Tương lai đơn (will + V)', color: 'orange' },
        { token: 'our goal', role: 'Tân ngữ (O) • Danh từ', color: 'green' },
      ],
    },
  ],
};

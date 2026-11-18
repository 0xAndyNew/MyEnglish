import { CefrLevel } from '../types/learning';

export interface PlacementQuestion {
  id: string;
  level: CefrLevel;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
}

export const PLACEMENT_QUIZ: PlacementQuestion[] = [
  {
    id: 'pq-1',
    level: 'A0',
    prompt: 'Chọn nghĩa đúng của từ: "apple"',
    options: ['Quả táo', 'Quyển sách', 'Cái bàn', 'Con mèo'],
    correctIndex: 0,
    explanationVi: '"Apple" nghĩa là quả táo.',
  },
  {
    id: 'pq-2',
    level: 'A1',
    prompt: 'Hello! How ___ you today?',
    options: ['is', 'am', 'are', 'be'],
    correctIndex: 2,
    explanationVi: 'Chủ ngữ "you" đi với động từ to be "are".',
  },
  {
    id: 'pq-3',
    level: 'A1',
    prompt: 'She ___ to school by bus every morning.',
    options: ['go', 'goes', 'going', 'went'],
    correctIndex: 1,
    explanationVi: 'Thì Hiện tại đơn với "She" và thói quen hàng ngày ("every morning") chia "goes".',
  },
  {
    id: 'pq-4',
    level: 'A2',
    prompt: 'Yesterday, we ___ a very interesting movie at the cinema.',
    options: ['watch', 'watching', 'watched', 'will watch'],
    correctIndex: 2,
    explanationVi: 'Có trạng từ quá khứ "Yesterday" nên dùng thì Quá khứ đơn "watched".',
  },
  {
    id: 'pq-5',
    level: 'A2',
    prompt: 'This laptop is ___ than the one I used last year.',
    options: ['more fast', 'faster', 'fastest', 'most fast'],
    correctIndex: 1,
    explanationVi: 'So sánh hơn với tính từ ngắn "fast" dùng "faster".',
  },
  {
    id: 'pq-6',
    level: 'B1',
    prompt: 'I have lived in Ho Chi Minh City ___ five years.',
    options: ['since', 'for', 'during', 'from'],
    correctIndex: 1,
    explanationVi: 'Khoảng thời gian "five years" trong thì Hiện tại hoàn thành đi với "for".',
  },
  {
    id: 'pq-7',
    level: 'B1',
    prompt: 'If it rains tomorrow, we ___ the outdoor meeting.',
    options: ['cancel', 'cancelled', 'will cancel', 'would cancel'],
    correctIndex: 2,
    explanationVi: 'Câu điều kiện loại 1 (có thật ở tương lai): If + S + V(s/es), S + will + V.',
  },
  {
    id: 'pq-8',
    level: 'B2',
    prompt: 'The report ___ by the marketing team before Friday afternoon.',
    options: ['must complete', 'must be completed', 'has completing', 'completes'],
    correctIndex: 1,
    explanationVi: 'Câu bị động với động từ khuyết thiếu: must + be + V3/ed ("must be completed").',
  },
  {
    id: 'pq-9',
    level: 'B2',
    prompt: '___ the tight deadline, the engineers delivered the product on time.',
    options: ['Although', 'Because', 'Despite', 'However'],
    correctIndex: 2,
    explanationVi: 'Trước cụm danh từ ("the tight deadline") để chỉ sự tương phản dùng "Despite".',
  },
  {
    id: 'pq-10',
    level: 'C1',
    prompt: 'Not only ___ the presentation clearly, but she also answered every question fluently.',
    options: ['she delivered', 'did she deliver', 'was she deliver', 'delivered she'],
    correctIndex: 1,
    explanationVi: 'Đảo ngữ với "Not only" ở đầu câu: Not only + trợ động từ (did) + S + V.',
  },
];

export function evaluatePlacementScore(correctCount: number): CefrLevel {
  if (correctCount <= 2) return 'A0';
  if (correctCount <= 4) return 'A1';
  if (correctCount <= 6) return 'A2';
  if (correctCount <= 8) return 'B1';
  if (correctCount === 9) return 'B2';
  return 'C1';
}

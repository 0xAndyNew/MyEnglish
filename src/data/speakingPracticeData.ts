import { CefrLevel } from '../types/learning';
import { PRACTICAL_CATEGORIES } from './practicalCategories';
import { SPEAKING_BANK_EXTRA } from './speakingBankExtra';

export interface SpeakingPracticeItem {
  id: string;
  level: CefrLevel;
  topic: string;
  en: string;
  vi: string;
}

export const SPEAKING_TOPICS = [
  'Tất cả',
  ...PRACTICAL_CATEGORIES,
  'Giao tiếp cơ bản',
  'Đời sống & Du lịch',
  'Công việc & Phỏng vấn',
] as const;

export const BASE_PRACTICE_SENTENCES: SpeakingPracticeItem[] = [
  { id: 'sp-1', level: 'A1', topic: 'Giao tiếp cơ bản', en: 'Hello, my name is Minh and I am learning English every day.', vi: 'Xin chào, tên tôi là Minh và tôi đang học tiếng Anh mỗi ngày.' },
  { id: 'sp-2', level: 'A1', topic: 'Giao tiếp cơ bản', en: 'Could you please speak a little bit more slowly?', vi: 'Bạn có thể nói chậm hơn một chút được không?' },
  { id: 'sp-3', level: 'A1', topic: 'Đời sống & Du lịch', en: 'I would like a medium iced coffee and a cheese sandwich, please.', vi: 'Cho tôi một ly cà phê đá cỡ vừa và một bánh mì kẹp phô mai.' },
  { id: 'sp-4', level: 'A2', topic: 'Đời sống & Du lịch', en: 'Excuse me, could you show me the way to the train station?', vi: 'Xin lỗi, bạn có thể chỉ cho tôi đường ra ga tàu không?' },
  { id: 'sp-5', level: 'A2', topic: 'Đời sống & Du lịch', en: 'How much is this blue jacket, and do you have a medium size?', vi: 'Chiếc áo khoác xanh này bao nhiêu tiền và bạn có cỡ vừa không?' },
  { id: 'sp-6', level: 'A2', topic: 'Đời sống & Du lịch', en: 'I have a reservation under the name Tuan Nguyen for three nights.', vi: 'Tôi có đặt phòng dưới tên Tuấn Nguyễn trong 3 đêm.' },
  { id: 'sp-7', level: 'A2', topic: 'Đời sống & Du lịch', en: 'I have had a sore throat and a mild headache since yesterday.', vi: 'Tôi bị đau họng và đau đầu nhẹ từ hôm qua.' },
  { id: 'sp-8', level: 'A2', topic: 'Đời sống & Du lịch', en: 'I need more information about the flight schedule and departure gate.', vi: 'Tôi cần thêm thông tin về lịch trình chuyến bay và cổng khởi hành.' },
  { id: 'sp-9', level: 'B1', topic: 'Công việc & Phỏng vấn', en: 'Could we reschedule our meeting to tomorrow morning at ten AM?', vi: 'Chúng ta có thể dời lịch họp sang 10 giờ sáng mai được không?' },
  { id: 'sp-10', level: 'B1', topic: 'Công việc & Phỏng vấn', en: 'We have finished the first stage on schedule and are ready for review.', vi: 'Chúng tôi đã hoàn thành giai đoạn đầu đúng tiến độ và sẵn sàng kiểm tra.' },
  { id: 'sp-11', level: 'B1', topic: 'Công việc & Phỏng vấn', en: 'I worked as a customer support specialist for three years.', vi: 'Tôi đã làm chuyên viên hỗ trợ khách hàng trong 3 năm.' },
  { id: 'sp-12', level: 'B1', topic: 'Công việc & Phỏng vấn', en: 'My greatest strength is communicating clearly under high pressure.', vi: 'Điểm mạnh lớn nhất của tôi là giao tiếp rõ ràng dưới áp lực cao.' },
  { id: 'sp-13', level: 'B1', topic: 'Công việc & Phỏng vấn', en: 'Thank you for your patience while we checked the new system.', vi: 'Cảm ơn sự kiên nhẫn của bạn trong lúc chúng tôi kiểm tra hệ thống mới.' },
  { id: 'sp-14', level: 'B1', topic: 'Giao tiếp cơ bản', en: 'Clear communication builds trust and opens new opportunities.', vi: 'Giao tiếp rõ ràng xây dựng niềm tin và mở ra nhiều cơ hội mới.' },
  { id: 'sp-15', level: 'B2', topic: 'Giao tiếp cơ bản', en: 'Consistency leads to a major breakthrough in fluency.', vi: 'Sự đều đặn dẫn đến bước đột phá lớn về độ trôi chảy.' },
  { id: 'sp-16', level: 'A2', topic: 'Đời sống & Du lịch', en: 'Would you like to pay by card or in cash today?', vi: 'Hôm nay bạn muốn thanh toán bằng thẻ hay tiền mặt ạ?' },
  { id: 'sp-17', level: 'B1', topic: 'Công việc & Phỏng vấn', en: 'Sorry, I think you are muted. Could you unmute your microphone?', vi: 'Xin lỗi, hình như bạn đang tắt mic. Bạn bật lại micro nhé?' },
  { id: 'sp-18', level: 'A2', topic: 'Đời sống & Du lịch', en: 'May I exchange this shirt for a larger size, please?', vi: 'Tôi có thể đổi chiếc áo sơ mi này sang cỡ lớn hơn không ạ?' },
  { id: 'sp-19', level: 'B1', topic: 'Công việc & Phỏng vấn', en: 'Let me share my screen so we can walk through the project plan.', vi: 'Để tôi chia sẻ màn hình để chúng ta cùng xem kế hoạch dự án.' },
  { id: 'sp-20', level: 'B1', topic: 'Công việc & Phỏng vấn', en: 'I sincerely apologize for the delay in delivering your package.', vi: 'Tôi thành thật xin lỗi vì sự chậm trễ trong việc giao kiện hàng của bạn.' },
  { id: 'sp-21', level: 'A2', topic: 'Đời sống & Du lịch', en: 'What is the purpose of your visit and how long will you stay?', vi: 'Mục đích chuyến đi của bạn là gì và bạn sẽ lưu trú bao lâu?' },
  { id: 'sp-22', level: 'A2', topic: 'Giao tiếp cơ bản', en: 'Please arrive ten minutes early to complete the registration form.', vi: 'Vui lòng đến sớm 10 phút để hoàn tất phiếu đăng ký.' },
  { id: 'sp-23', level: 'B2', topic: 'Công việc & Phỏng vấn', en: 'Listening carefully helps prevent unnecessary misunderstandings at work.', vi: 'Lắng nghe kỹ giúp tránh những hiểu lầm không đáng có trong công việc.' },
  { id: 'sp-24', level: 'B2', topic: 'Công việc & Phỏng vấn', en: 'Given my five years of experience, could we discuss the salary package?', vi: 'Với 5 năm kinh nghiệm, chúng ta có thể trao đổi thêm về gói lương không?' },
  { id: 'sp-25', level: 'B2', topic: 'Công việc & Phỏng vấn', en: 'We look forward to building a successful long-term partnership.', vi: 'Chúng tôi mong muốn xây dựng mối quan hệ hợp tác lâu dài thành công.' },
];

export const PRACTICE_SENTENCES: SpeakingPracticeItem[] = [
  ...BASE_PRACTICE_SENTENCES,
  ...SPEAKING_BANK_EXTRA,
];

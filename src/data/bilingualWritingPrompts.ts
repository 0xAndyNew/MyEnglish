import { CefrLevel } from '../types/learning';

export type JobCategory =
  | 'Văn phòng & Email'
  | 'IT / Kỹ thuật'
  | 'Kinh doanh & CSKH'
  | 'Phỏng vấn & Nhân sự'
  | 'Dịch vụ & Đời sống';

export const JOB_CATEGORIES: ('Tất cả' | JobCategory)[] = [
  'Tất cả',
  'Văn phòng & Email',
  'IT / Kỹ thuật',
  'Kinh doanh & CSKH',
  'Phỏng vấn & Nhân sự',
  'Dịch vụ & Đời sống',
];

export interface BilingualPrompt {
  id: string;
  level: CefrLevel;
  category: JobCategory;
  title: string;
  vi: string;
  en: string;
  keywordsEn: string[];
  keywordsVi: string[];
}

export const BILINGUAL_WRITING_PROMPTS: BilingualPrompt[] = [
  {
    id: 'bw-1',
    level: 'A1',
    category: 'Văn phòng & Email',
    title: 'Email xin phép đến văn phòng muộn',
    vi: 'Chào anh Nam, sáng nay đường rất kẹt xe nên em sẽ đến văn phòng muộn khoảng 15 phút. Em xin lỗi vì sự bất tiện này.',
    en: 'Hi Nam, the traffic is very heavy this morning, so I will arrive at the office about 15 minutes late. I apologize for the inconvenience.',
    keywordsEn: ['traffic', 'arrive', 'office', 'minutes', 'late', 'apologize'],
    keywordsVi: ['kẹt xe', 'văn phòng', 'muộn', '15 phút', 'xin lỗi'],
  },
  {
    id: 'bw-2',
    level: 'A2',
    category: 'Văn phòng & Email',
    title: 'Hẹn lịch họp ngắn với đồng nghiệp',
    vi: 'Chào Minh, chúng ta có thể có một cuộc họp ngắn lúc 10 giờ sáng mai để thảo luận về tiến độ dự án mới không?',
    en: 'Hi Minh, could we have a short meeting at 10 AM tomorrow morning to discuss the progress of our new project?',
    keywordsEn: ['could', 'meeting', 'tomorrow', 'discuss', 'progress', 'project'],
    keywordsVi: ['cuộc họp', 'sáng mai', 'thảo luận', 'tiến độ', 'dự án'],
  },
  {
    id: 'bw-3',
    level: 'B1',
    category: 'Văn phòng & Email',
    title: 'Báo cáo hoàn thành công việc đúng hạn',
    vi: 'Tôi viết email này để cập nhật rằng nhóm chúng tôi đã hoàn thành giai đoạn đầu tiên đúng tiến độ và sẵn sàng cho bước tiếp theo.',
    en: 'I am writing to update you that our team has finished the first stage on schedule and is ready for the next step.',
    keywordsEn: ['writing', 'update', 'team', 'finished', 'schedule', 'ready'],
    keywordsVi: ['cập nhật', 'nhóm', 'hoàn thành', 'đúng tiến độ', 'bước tiếp theo'],
  },
  {
    id: 'bw-4',
    level: 'A2',
    category: 'IT / Kỹ thuật',
    title: 'Báo cáo lỗi hệ thống cho lập trình viên',
    vi: 'Chào đội kỹ thuật, nút đăng nhập không hoạt động trên điện thoại từ sáng nay. Vui lòng kiểm tra và sửa lỗi này sớm nhất có thể.',
    en: 'Hi technical team, the login button has not worked on mobile phones since this morning. Please check and fix this bug as soon as possible.',
    keywordsEn: ['login', 'button', 'mobile', 'check', 'fix', 'bug'],
    keywordsVi: ['đăng nhập', 'điện thoại', 'kiểm tra', 'sửa lỗi', 'sớm'],
  },
  {
    id: 'bw-5',
    level: 'B1',
    category: 'IT / Kỹ thuật',
    title: 'Cập nhật tiến độ phát triển tính năng mới',
    vi: 'Chúng tôi đang tối ưu hóa tốc độ tải trang và dự kiến sẽ phát hành phiên bản mới vào thứ Sáu tuần này.',
    en: 'We are currently optimizing the page loading speed and expect to release the new version this Friday.',
    keywordsEn: ['optimizing', 'speed', 'release', 'new', 'version', 'Friday'],
    keywordsVi: ['tối ưu', 'tốc độ', 'phát hành', 'phiên bản', 'thứ Sáu'],
  },
  {
    id: 'bw-6',
    level: 'B2',
    category: 'IT / Kỹ thuật',
    title: 'Đề xuất giải pháp sao lưu dữ liệu',
    vi: 'Để tránh mất dữ liệu quan trọng, chúng ta nên tự động sao lưu hệ thống mỗi đêm và lưu trữ bản sao ở một máy chủ an toàn.',
    en: 'To avoid losing important data, we should automatically back up the system every night and store copies on a secure server.',
    keywordsEn: ['avoid', 'data', 'automatically', 'back up', 'system', 'secure'],
    keywordsVi: ['tránh', 'dữ liệu', 'tự động', 'sao lưu', 'an toàn'],
  },
  {
    id: 'bw-7',
    level: 'A2',
    category: 'Kinh doanh & CSKH',
    title: 'Phản hồi & Xin lỗi khách hàng về giao hàng chậm',
    vi: 'Chúng tôi thành thật xin lỗi vì đơn hàng của bạn bị giao chậm hai ngày. Chúng tôi sẽ gửi tặng bạn một mã giảm giá cho lần mua tiếp theo.',
    en: 'We sincerely apologize that your order was delivered two days late. We will send you a discount voucher for your next purchase.',
    keywordsEn: ['apologize', 'order', 'delivered', 'late', 'discount', 'next'],
    keywordsVi: ['xin lỗi', 'đơn hàng', 'chậm', 'giảm giá', 'lần mua'],
  },
  {
    id: 'bw-8',
    level: 'B1',
    category: 'Kinh doanh & CSKH',
    title: 'Giới thiệu gói dịch vụ cho khách hàng mới',
    vi: 'Cảm ơn bạn đã quan tâm đến sản phẩm của chúng tôi. Gói tiêu chuẩn giúp doanh nghiệp tiết kiệm chi phí và hỗ trợ khách hàng 24/7.',
    en: 'Thank you for your interest in our product. The standard package helps businesses save costs and supports customers 24/7.',
    keywordsEn: ['interest', 'product', 'package', 'save', 'costs', 'customers'],
    keywordsVi: ['quan tâm', 'sản phẩm', 'gói', 'tiết kiệm', 'khách hàng'],
  },
  {
    id: 'bw-9',
    level: 'B2',
    category: 'Kinh doanh & CSKH',
    title: 'Thương lượng giá & Chiết khấu hợp đồng',
    vi: 'Nếu công ty bạn ký hợp đồng một năm ngay trong tháng này, chúng tôi có thể giảm giá 15 phần trăm trên tổng giá trị đơn hàng.',
    en: 'If your company signs a one-year contract this month, we can offer a 15 percent discount on the total order value.',
    keywordsEn: ['company', 'contract', 'month', 'offer', 'discount', 'total'],
    keywordsVi: ['công ty', 'hợp đồng', 'tháng này', 'giảm giá', 'tổng'],
  },
  {
    id: 'bw-10',
    level: 'A2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Tự giới thiệu bản thân trong buổi phỏng vấn',
    vi: 'Xin chào, tôi tên là Lan. Tôi có ba năm kinh nghiệm làm kế toán và tôi rất thích làm việc trong một môi trường chuyên nghiệp.',
    en: 'Hello, my name is Lan. I have three years of experience working as an accountant, and I really enjoy working in a professional environment.',
    keywordsEn: ['name', 'experience', 'accountant', 'enjoy', 'professional', 'environment'],
    keywordsVi: ['tên', 'kinh nghiệm', 'kế toán', 'môi trường', 'chuyên nghiệp'],
  },
  {
    id: 'bw-11',
    level: 'B1',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Nêu điểm mạnh khi ứng tuyển công việc',
    vi: 'Điểm mạnh lớn nhất của tôi là khả năng giao tiếp rõ ràng và quản lý thời gian hiệu quả ngay cả khi có nhiều áp lực.',
    en: 'My greatest strength is the ability to communicate clearly and manage time effectively even under high pressure.',
    keywordsEn: ['strength', 'communicate', 'clearly', 'manage', 'effectively', 'pressure'],
    keywordsVi: ['điểm mạnh', 'giao tiếp', 'quản lý thời gian', 'hiệu quả', 'áp lực'],
  },
  {
    id: 'bw-12',
    level: 'B2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Thư cảm ơn sau buổi phỏng vấn xin việc',
    vi: 'Cảm ơn anh chị đã dành thời gian phỏng vấn em hôm nay. Em rất hào hứng với vị trí này và hy vọng có cơ hội đóng góp cho công ty.',
    en: 'Thank you for taking the time to interview me today. I am very excited about this position and hope to have the opportunity to contribute to the company.',
    keywordsEn: ['thank', 'interview', 'excited', 'position', 'opportunity', 'contribute'],
    keywordsVi: ['cảm ơn', 'phỏng vấn', 'hào hứng', 'vị trí', 'đóng góp'],
  },
  {
    id: 'bw-13',
    level: 'A1',
    category: 'Dịch vụ & Đời sống',
    title: 'Đặt bàn ăn tối tại nhà hàng',
    vi: 'Xin chào, tôi muốn đặt một bàn cho bốn người vào lúc bảy giờ tối nay. Chúng tôi muốn ngồi gần cửa sổ.',
    en: 'Hello, I would like to book a table for four people at seven o’clock tonight. We would like to sit near the window.',
    keywordsEn: ['book', 'table', 'four', 'tonight', 'sit', 'window'],
    keywordsVi: ['đặt', 'bàn', 'bốn người', 'tối nay', 'cửa sổ'],
  },
  {
    id: 'bw-14',
    level: 'A2',
    category: 'Dịch vụ & Đời sống',
    title: 'Hỏi thông tin nhận phòng khách sạn',
    vi: 'Xin chào, tôi đã đặt một phòng đôi trong hai đêm. Bữa sáng được phục vụ từ mấy giờ và mật khẩu wifi là gì ạ?',
    en: 'Hello, I booked a double room for two nights. What time is breakfast served, and what is the Wi-Fi password?',
    keywordsEn: ['booked', 'double', 'nights', 'breakfast', 'served', 'password'],
    keywordsVi: ['đặt', 'phòng đôi', 'hai đêm', 'bữa sáng', 'mật khẩu'],
  },
  {
    id: 'bw-15',
    level: 'A1',
    category: 'Dịch vụ & Đời sống',
    title: 'Chia sẻ thói quen học tiếng Anh mỗi ngày',
    vi: 'Mỗi buổi tối tôi dành hai mươi phút để nghe tiếng Anh và viết lại ba câu mới vào sổ tay của mình.',
    en: 'Every evening, I spend twenty minutes listening to English and writing three new sentences in my notebook.',
    keywordsEn: ['evening', 'spend', 'minutes', 'listening', 'writing', 'notebook'],
    keywordsVi: ['buổi tối', 'hai mươi phút', 'nghe', 'viết', 'sổ tay'],
  },
  {
    id: 'bw-16',
    level: 'B1',
    category: 'Dịch vụ & Đời sống',
    title: 'Nhắn tin hẹn gặp bạn cũ cuối tuần',
    vi: 'Chào Hùng, lâu rồi chúng ta chưa gặp nhau. Nếu cuối tuần này bạn rảnh, chúng ta đi uống cà phê vào sáng Chủ nhật nhé.',
    en: 'Hi Hung, we have not met for a long time. If you are free this weekend, let’s grab a coffee on Sunday morning.',
    keywordsEn: ['met', 'long time', 'free', 'weekend', 'coffee', 'Sunday'],
    keywordsVi: ['lâu rồi', 'chưa gặp', 'rảnh', 'cuối tuần', 'cà phê'],
  },
];

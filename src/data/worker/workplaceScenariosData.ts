import { CefrLevel } from '../../types/learning';
import { PracticalCategory } from '../practicalCategories';
import { WORKPLACE_MEETING_EXTRA, WORKPLACE_EMAIL_EXTRA } from './workplaceExtra';
import { WORKPLACE_STAR_EXTRA, WORKPLACE_CASE_EXTRA } from './workplaceExtra2';
export { WORKPLACE_VOCAB_DRILLS } from './workplaceDrills';
export type { WorkplaceDrillItem } from './workplaceDrills';

export type MeetingPhraseSubType =
  | 'Daily Standup'
  | 'Báo cáo tiến độ'
  | 'Xin ý kiến'
  | 'Trì hoãn deadline'
  | 'Đàm phán';

export const MEETING_SUBTYPES: readonly MeetingPhraseSubType[] = [
  'Daily Standup',
  'Báo cáo tiến độ',
  'Xin ý kiến',
  'Trì hoãn deadline',
  'Đàm phán',
];

export interface WorkplaceMeetingPhrase {
  id: string;
  industry: PracticalCategory;
  subType: MeetingPhraseSubType;
  level: CefrLevel;
  en: string;
  ipa: string;
  vi: string;
  context: string;
  politenessTip: string;
}

export interface EmailStructureNote {
  label: string;
  phrase: string;
  noteVi: string;
}

export interface WorkplaceEmailTemplate {
  id: string;
  industry: PracticalCategory;
  channel: 'Email' | 'Slack / Teams';
  purpose: string;
  level: CefrLevel;
  title: string;
  subject?: string;
  enBody: string;
  viSummary: string;
  structureNotes: EmailStructureNote[];
}

export interface WorkplaceStarQuestion {
  id: string;
  industry: PracticalCategory;
  level: CefrLevel;
  questionEn: string;
  questionVi: string;
  focusSkill: string;
  starOutline: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  sampleAnswerEn: string;
  sampleAnswerVi: string;
  powerPhrases: string[];
}

export interface WorkplaceCaseOption {
  id: string;
  textEn: string;
  textVi: string;
  tone: string;
  isBest: boolean;
  explanationVi: string;
}

export interface WorkplaceCaseSituation {
  id: string;
  industry: PracticalCategory;
  level: CefrLevel;
  title: string;
  scenarioVi: string;
  promptEn: string;
  promptVi: string;
  options: WorkplaceCaseOption[];
}

const BASE_WORKPLACE_MEETING_PHRASES: WorkplaceMeetingPhrase[] = [
  // 1. Văn phòng & Email
  {
    id: 'wm-1',
    industry: 'Văn phòng & Email',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Yesterday I wrapped up the quarterly slides, and today I am preparing the client agenda.',
    ipa: '/ˈjestərdeɪ aɪ ræpt ʌp ðə ˈkwɔːrtərli slaɪdz ænd təˈdeɪ aɪ æm prɪˈperɪŋ ðə ˈklaɪənt əˈdʒendə/',
    vi: 'Hôm qua tôi đã hoàn tất bộ slide quý, và hôm nay tôi đang chuẩn bị chương trình họp với khách hàng.',
    context: 'Cập nhật nhanh công việc đầu ngày trong buổi họp nhóm 15 phút.',
    politenessTip: 'Dùng "wrapped up" thay cho "finished" nghe tự nhiên và chuẩn văn phong công sở hơn.',
  },
  {
    id: 'wm-2',
    industry: 'Văn phòng & Email',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'To ensure accuracy, could we push the deadline back to Thursday afternoon?',
    ipa: '/tuː ɪnˈʃʊr ˈækjərəsi kʊd wi pʊʃ ðə ˈdedlaɪn bæk tuː ˈθɜːrzdeɪ ˌæftərˈnuːn/',
    vi: 'Để đảm bảo độ chính xác, chúng ta có thể dời hạn chót sang chiều thứ Năm được không?',
    context: 'Xin gia hạn deadline khi cần thêm thời gian rà soát tài liệu quan trọng.',
    politenessTip: 'Luôn nêu lý do tích cực ("to ensure accuracy/quality") trước khi đề nghị dời hạn.',
  },
  {
    id: 'wm-3',
    industry: 'Văn phòng & Email',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Before we finalize the schedule, does anyone have any concerns or suggestions?',
    ipa: '/bɪˈfɔːr wi ˈfaɪnəlaɪz ðə ˈskedʒuːl dʌz ˈeniwʌn hæv ˈeni kənˈsɜːrnz ɔːr səˈdʒestʃənz/',
    vi: 'Trước khi chốt lịch trình, có ai có băn khoăn hay góp ý nào thêm không?',
    context: 'Chủ trì cuộc họp và mời đồng nghiệp đóng góp ý kiến trước khi quyết định.',
    politenessTip: 'Dùng "concerns or suggestions" để tạo không khí cởi mở thay vì hỏi cụt lủn "Any questions?".',
  },

  // 2. IT / Kỹ thuật
  {
    id: 'wm-4',
    industry: 'IT / Kỹ thuật',
    subType: 'Daily Standup',
    level: 'B1',
    en: 'I finished the API integration, and I am currently blocked by missing staging credentials.',
    ipa: '/aɪ ˈfɪnɪʃt ði ˌeɪpiːˈaɪ ˌɪntɪˈɡreɪʃn ænd aɪ æm ˈkɜːrəntli blɑːkt baɪ ˈmɪsɪŋ ˈsteɪdʒɪŋ krəˈdenʃlz/',
    vi: 'Tôi đã xong phần tích hợp API, hiện đang bị vướng vì thiếu thông tin đăng nhập môi trường staging.',
    context: 'Báo cáo blocker (điểm nghẽn) trong Daily Standup của team Dev/QA.',
    politenessTip: 'Dùng cấu trúc "I am blocked by..." giúp Tech Lead biết ngay cần hỗ trợ gì.',
  },
  {
    id: 'wm-5',
    industry: 'IT / Kỹ thuật',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'We have resolved the memory leak in production, and system latency is back to normal.',
    ipa: '/wi hæv rɪˈzɑːlvd ðə ˈmeməri liːk ɪn prəˈdʌkʃn ænd ˈsɪstəm ˈleɪtənsi ɪz bæk tuː ˈnɔːrml/',
    vi: 'Chúng tôi đã xử lý xong lỗi tràn bộ nhớ trên bản production, độ trễ hệ thống đã trở lại bình thường.',
    context: 'Báo cáo sau khi khắc phục sự cố kỹ thuật trong buổi họp review hoặc post-mortem.',
    politenessTip: 'Nhấn mạnh cả hành động đã xong lẫn chỉ số hồi phục thực tế.',
  },
  {
    id: 'wm-6',
    industry: 'IT / Kỹ thuật',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'An unexpected security vulnerability came up during testing, so we need two extra days before release.',
    ipa: '/æn ˌʌnɪkˈspektɪd sɪˈkjʊrəti ˌvʌlnərəˈbɪləti keɪm ʌp ˈdʊrɪŋ ˈtestɪŋ soʊ wi niːd tuː ˈekstrə deɪz bɪˈfɔːr rɪˈliːs/',
    vi: 'Một lỗ hổng bảo mật phát sinh ngoài dự kiến lúc kiểm thử, nên chúng tôi cần thêm 2 ngày trước khi phát hành.',
    context: 'Thông báo lùi lịch release phần mềm cho Product Manager hoặc khách hàng.',
    politenessTip: 'Giải thích rõ nguyên nhân kỹ thuật + số ngày cần thêm cụ thể.',
  },

  // 3. Kinh doanh & CSKH
  {
    id: 'wm-7',
    industry: 'Kinh doanh & CSKH',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'If you commit to an annual subscription, we can offer a twelve percent volume discount.',
    ipa: '/ɪf juː kəˈmɪt tuː æn ˈænjuəl səbˈskrɪpʃn wi kæn ˈɔːfər ə twelv pərˈsent ˈvɑːljuːm ˈdɪskaʊnt/',
    vi: 'Nếu quý công ty cam kết gói theo năm, chúng tôi có thể áp dụng mức chiết khấu 12% theo số lượng.',
    context: 'Đàm phán giá hợp đồng B2B với khách hàng doanh nghiệp.',
    politenessTip: 'Dùng cấu trúc "If you commit to..., we can offer..." để trao đổi điều kiện đôi bên cùng có lợi.',
  },
  {
    id: 'wm-8',
    industry: 'Kinh doanh & CSKH',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'Customer satisfaction rose by eight percent this month after we shortened our response time.',
    ipa: '/ˈkʌstəmər ˌsætɪsˈfækʃn roʊz baɪ eɪt pərˈsent ðɪs mʌnθ ˈæftər wi ˈʃɔːrtnd ˈaʊər rɪˈspɑːns taɪm/',
    vi: 'Mức độ hài lòng của khách hàng tăng 8% tháng này sau khi chúng tôi rút ngắn thời gian phản hồi.',
    context: 'Báo cáo KPI bộ phận CSKH hoặc Sales trong cuộc họp tháng.',
    politenessTip: 'Gắn con số phần trăm với nguyên nhân cụ thể giúp báo cáo thuyết phục hơn.',
  },
  {
    id: 'wm-9',
    industry: 'Kinh doanh & CSKH',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'What is your top priority for this partnership over the next six months?',
    ipa: '/wʌt ɪz jʊr tɑːp praɪˈɔːrəti fɔːr ðɪs ˈpɑːrtnərʃɪp ˈoʊvər ðə nekst sɪks mʌnθs/',
    vi: 'Ưu tiên hàng đầu của anh/chị cho sự hợp tác này trong 6 tháng tới là gì ạ?',
    context: 'Hỏi nhu cầu cốt lõi của khách hàng trước khi đề xuất gói giải pháp.',
    politenessTip: 'Đặt câu hỏi mở với "top priority" để khách hàng tự nói ra điểm đau của họ.',
  },

  // 4. Tài chính & Logistics
  {
    id: 'wm-10',
    industry: 'Tài chính & Logistics',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'Could we adjust the payment terms from thirty days to forty-five days net?',
    ipa: '/kʊd wi əˈdʒʌst ðə ˈpeɪmənt tɜːrmz frʌm ˈθɜːrti deɪz tuː ˈfɔːrti faɪv deɪz net/',
    vi: 'Chúng ta có thể điều chỉnh điều khoản thanh toán từ 30 ngày lên 45 ngày sau hóa đơn được không?',
    context: 'Thương lượng công nợ và điều khoản thanh toán với nhà cung cấp.',
    politenessTip: 'Dùng "adjust the payment terms" nghe nhẹ nhàng và chuyên nghiệp hơn "delay payment".',
  },
  {
    id: 'wm-11',
    industry: 'Tài chính & Logistics',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'All customs documents have been cleared, and the shipment is scheduled to arrive on Friday.',
    ipa: '/ɔːl ˈkʌstəmz ˈdɑːkjumənts hæv bɪn klɪrd ænd ðə ˈʃɪpmənt ɪz ˈskedʒuːld tuː əˈraɪv ɑːn ˈfraɪdeɪ/',
    vi: 'Toàn bộ chứng từ hải quan đã thông quan, và lô hàng dự kiến cập bến vào thứ Sáu.',
    context: 'Cập nhật tình trạng vận chuyển xuất nhập khẩu cho quản lý và khách hàng.',
    politenessTip: 'Nắm chắc cụm "customs clearance / cleared" và "scheduled to arrive".',
  },
  {
    id: 'wm-12',
    industry: 'Tài chính & Logistics',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'Due to port congestion, delivery will be delayed by forty-eight hours; we have already arranged backup transport.',
    ipa: '/duː tuː pɔːrt kənˈdʒestʃən dɪˈlɪvəri wɪl bi dɪˈleɪd baɪ ˈfɔːrti eɪt ˈaʊərz/',
    vi: 'Do ùn tắc tại cảng, việc giao hàng sẽ chậm 48 giờ; chúng tôi đã bố trí phương án vận chuyển dự phòng.',
    context: 'Thông báo chậm tiến độ giao hàng kèm phương án xử lý.',
    politenessTip: 'Luôn đi kèm giải pháp ("arranged backup transport") khi báo tin chậm trễ.',
  },

  // 5. Phỏng vấn & Nhân sự
  {
    id: 'wm-13',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'How would you describe the team culture and the main expectations for the first ninety days?',
    ipa: '/haʊ wʊd juː dɪˈskraɪb ðə tiːm ˈkʌltʃər ænd ðə meɪn ˌekspekˈteɪʃnz fɔːr ðə fɜːrst ˈnaɪnti deɪz/',
    vi: 'Anh/chị có thể chia sẻ về văn hóa đội ngũ và kỳ vọng chính trong 90 ngày đầu tiên không ạ?',
    context: 'Câu hỏi thông minh dành cho nhà tuyển dụng cuối buổi phỏng vấn hoặc họp nhân sự.',
    politenessTip: 'Hỏi về "first ninety days" cho thấy bạn có tư duy chủ động và thực tế.',
  },
  {
    id: 'wm-14',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'Based on my experience and market benchmarks, I was hoping for a base salary closer to this range.',
    ipa: '/beɪst ɑːn maɪ ɪkˈspɪriəns ænd ˈmɑːrkɪt ˈbentʃmɑːrks aɪ wʌz ˈhoʊpɪŋ fɔːr ə beɪs ˈsæləri ˈkloʊsər tuː ðɪs reɪndʒ/',
    vi: 'Dựa trên kinh nghiệm và mặt bằng thị trường, tôi mong muốn mức lương cơ bản gần với khoảng này hơn.',
    context: 'Đàm phán mức lương và phúc lợi với HR sau khi nhận Offer.',
    politenessTip: 'Tránh đòi hỏi gay gắt; dùng "Based on... I was hoping for..." giữ thiện cảm hai bên.',
  },

  // 6. Du lịch & Khách sạn
  {
    id: 'wm-15',
    industry: 'Du lịch & Khách sạn',
    subType: 'Báo cáo tiến độ',
    level: 'A2',
    en: 'Room occupancy is at ninety percent this weekend, and all VIP suites are ready for check-in.',
    ipa: '/ruːm ˈɑːkjəpənsi ɪz æt ˈnaɪnti pərˈsent ðɪs ˈwiːkend/',
    vi: 'Công suất phòng cuối tuần này đạt 90%, và toàn bộ phòng VIP đã sẵn sàng đón khách nhận phòng.',
    context: 'Họp giao ca (shift briefing) buổi sáng tại khách sạn/resort.',
    politenessTip: 'Cụm từ chuyên ngành hữu ích: "occupancy rate" (tỷ lệ lấp đầy phòng).',
  },
  {
    id: 'wm-16',
    industry: 'Du lịch & Khách sạn',
    subType: 'Đàm phán',
    level: 'B1',
    en: 'If your group books ten rooms or more, we can include complimentary airport pickup.',
    ipa: '/ɪf jʊr ɡruːp bʊks ten ruːmz ɔːr mɔːr wi kæn ɪnˈkluːd ˌkɑːmplɪˈmentri ˈerpɔːrt ˈpɪkʌp/',
    vi: 'Nếu đoàn của anh/chị đặt từ 10 phòng trở lên, chúng tôi có thể tặng kèm dịch vụ đón sân bay miễn phí.',
    context: 'Thương lượng giá và ưu đãi cho đoàn du lịch hoặc công ty lữ hành.',
    politenessTip: 'Dùng "complimentary" thay cho "free" tạo cảm giác sang trọng trong ngành dịch vụ.',
  },

  // 7. Ẩm thực & Mua sắm
  {
    id: 'wm-17',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Today we are running low on fresh salmon, so please remind staff to recommend the grilled chicken special.',
    ipa: '/təˈdeɪ wi ɑːr ˈrʌnɪŋ loʊ ɑːn freʃ ˈsæmən/',
    vi: 'Hôm nay cá hồi tươi sắp hết, mọi người nhớ nhắc nhân viên gợi ý món gà nướng đặc biệt cho khách nhé.',
    context: 'Họp đầu ca tại nhà hàng hoặc cửa hàng bán lẻ.',
    politenessTip: '"Running low on..." là cụm tự nhiên để báo sắp hết nguyên liệu/tồn kho.',
  },
  {
    id: 'wm-18',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Đàm phán',
    level: 'B1',
    en: 'Can you match our current supplier price if we double our monthly order quantity?',
    ipa: '/kæn juː mætʃ ˈaʊər ˈkɜːrənt səˈplaɪər praɪs ɪf wi ˈdʌbl ˈaʊər ˈmʌnθli ˈɔːrdər ˈkwɑːntəti/',
    vi: 'Anh/chị có thể giữ ngang mức giá nhà cung cấp hiện tại nếu chúng tôi tăng gấp đôi sản lượng hàng tháng không?',
    context: 'Đàm phán giá nhập hàng với nhà phân phối hoặc nhà cung cấp thực phẩm.',
    politenessTip: '"Match the price" là cách nói chuẩn khi thương lượng giá cạnh tranh.',
  },

  // 8. Y tế & Sức khỏe
  {
    id: 'wm-19',
    industry: 'Y tế & Sức khỏe',
    subType: 'Daily Standup',
    level: 'B1',
    en: 'During the night shift, two post-op patients remained stable and their vitals were checked every two hours.',
    ipa: '/ˈdʊrɪŋ ðə naɪt ʃɪft tuː poʊst ɑːp ˈpeɪʃnts rɪˈmeɪnd ˈsteɪbl/',
    vi: 'Trong ca đêm, hai bệnh nhân hậu phẫu đều ổn định và chỉ số sinh tồn được kiểm tra mỗi 2 giờ.',
    context: 'Họp bàn giao ca (handover briefing) giữa bác sĩ và điều dưỡng.',
    politenessTip: 'Dùng thuật ngữ chuẩn xác và súc tích ("remained stable", "vitals").',
  },
  {
    id: 'wm-20',
    industry: 'Y tế & Sức khỏe',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Before we update the clinic protocol, I would appreciate the nursing team feedback on patient flow.',
    ipa: '/bɪˈfɔːr wi ʌpˈdeɪt ðə ˈklɪnɪk ˈproʊtəkɑːl aɪ wʊd əˈpriːʃieɪt ðə ˈnɜːrsɪŋ tiːm ˈfiːdbæk/',
    vi: 'Trước khi cập nhật quy trình phòng khám, tôi rất mong nhận được góp ý từ đội điều dưỡng về luồng đón bệnh nhân.',
    context: 'Xin ý kiến chuyên môn liên phòng ban tại bệnh viện/phòng khám.',
    politenessTip: '"I would appreciate [someone] feedback on..." thể hiện sự tôn trọng chuyên môn đồng nghiệp.',
  },

  // 9. Giáo dục & Xã hội
  {
    id: 'wm-21',
    industry: 'Giáo dục & Xã hội',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'Attendance improved by fifteen percent this term, and we are piloting interactive speaking workshops.',
    ipa: '/əˈtendəns ɪmˈpruːvd baɪ ˌfɪfˈtiːn pərˈsent ðɪs tɜːrm/',
    vi: 'Tỷ lệ chuyên cần học kỳ này tăng 15%, và chúng tôi đang thí điểm các buổi thực hành nói tương tác.',
    context: 'Báo cáo kết quả đào tạo trong cuộc họp hội đồng hoặc trung tâm.',
    politenessTip: '"Piloting" nghĩa là triển khai thí điểm quy mô nhỏ trước khi nhân rộng.',
  },
  {
    id: 'wm-22',
    industry: 'Giáo dục & Xã hội',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'To give participants enough time to submit quality projects, let us extend the registration deadline by three days.',
    ipa: '/tuː ɡɪv pɑːrˈtɪsɪpənts ɪˈnʌf taɪm tuː səbˈmɪt ˈkwɑːləti ˈprɑːdʒekts/',
    vi: 'Để học viên có đủ thời gian nộp dự án chất lượng, chúng ta hãy gia hạn đăng ký thêm 3 ngày nhé.',
    context: 'Đề xuất gia hạn nộp bài/đăng ký chương trình đào tạo hoặc sự kiện cộng đồng.',
    politenessTip: 'Đặt lợi ích của học viên/người tham gia lên đầu câu đề xuất.',
  },

  // 10. Đời sống & Giao tiếp
  {
    id: 'wm-23',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Good morning everyone! Today I am working remotely and available on chat if you need quick support.',
    ipa: '/ɡʊd ˈmɔːrnɪŋ ˈevriwʌn təˈdeɪ aɪ æm ˈwɜːrkɪŋ rɪˈmoʊtli/',
    vi: 'Chào buổi sáng mọi người! Hôm nay tôi làm việc từ xa và luôn online trên chat nếu mọi người cần hỗ trợ nhanh.',
    context: 'Chào hỏi và báo trạng thái làm việc từ xa đầu ngày với đồng nghiệp.',
    politenessTip: 'Báo rõ kênh liên lạc ("available on chat") giúp đồng đội dễ phối hợp.',
  },
  {
    id: 'wm-24',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Xin ý kiến',
    level: 'A2',
    en: 'Sorry to interrupt, could you clarify what you meant by the second point?',
    ipa: '/ˈsɑːri tuː ˌɪntəˈrʌpt kʊd juː ˈklærəfaɪ wʌt juː ment baɪ ðə ˈsekənd pɔɪnt/',
    vi: 'Xin lỗi đã ngắt lời, bạn có thể làm rõ ý của bạn ở điểm thứ hai vừa rồi không?',
    context: 'Xin phép hỏi lại lịch sự khi chưa nghe rõ hoặc muốn xác nhận lại trong cuộc họp.',
    politenessTip: 'Mở đầu bằng "Sorry to interrupt" hoặc "Quick question" để ngắt lời thật khéo léo.',
  },
  {
    id: 'wm-25',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Trì hoãn deadline',
    level: 'A2',
    en: 'I am afraid I need a bit more time on this task; I will send it over by 4 PM today.',
    ipa: '/aɪ æm əˈfreɪd aɪ niːd ə bɪt mɔːr taɪm ɑːn ðɪs tæsk/',
    vi: 'Tôi e là mình cần thêm chút thời gian cho việc này; tôi sẽ gửi lại trước 4 giờ chiều nay.',
    context: 'Xin khất thời hạn hoàn thành ngắn trong ngày với đồng nghiệp hoặc quản lý.',
    politenessTip: 'Dùng "I am afraid..." kèm giờ cam kết cụ thể ("by 4 PM today") tạo sự tin cậy.',
  },
];

const BASE_WORKPLACE_EMAIL_TEMPLATES: WorkplaceEmailTemplate[] = [
  // 1. Xin nghỉ phép
  {
    id: 'we-1',
    industry: 'Văn phòng & Email',
    channel: 'Email',
    purpose: 'Xin nghỉ phép',
    level: 'A2',
    title: 'Email xin nghỉ phép có bàn giao công việc',
    subject: 'Annual Leave Request – [Your Name] ([Start Date] to [End Date])',
    enBody: `Dear [Manager's Name],

I am writing to request annual leave from [Start Date] to [End Date] due to [personal/family matters]. I will return to the office on [Return Date].

Before leaving, I will complete all urgent tasks and hand over ongoing work to [Colleague's Name]. I will also have limited access to email in case of emergencies.

Thank you for your understanding and approval.

Best regards,
[Your Name]`,
    viSummary: 'Thư xin nghỉ phép trang trọng gửi quản lý, nêu rõ thời gian nghỉ, ngày quay lại và kế hoạch bàn giao công việc.',
    structureNotes: [
      { label: 'Tiêu đề (Subject)', phrase: 'Annual Leave Request – [Name] ([Dates])', noteVi: 'Ghi rõ mục đích, họ tên và ngày nghỉ ngay ở tiêu đề để sếp duyệt nhanh.' },
      { label: 'Mở đầu', phrase: 'I am writing to request annual leave from... to...', noteVi: 'Đi thẳng vào lý do viết email một cách lịch sự.' },
      { label: 'Bàn giao', phrase: 'I will hand over ongoing work to [Colleague].', noteVi: 'Luôn cho thấy bạn có trách nhiệm với công việc trước khi nghỉ.' },
      { label: 'Kết thư', phrase: 'Thank you for your understanding and approval.', noteVi: 'Cảm ơn sự thông cảm và phê duyệt từ cấp trên.' },
    ],
  },
  // 2. Follow-up khách hàng
  {
    id: 'we-2',
    industry: 'Kinh doanh & CSKH',
    channel: 'Email',
    purpose: 'Follow-up khách hàng',
    level: 'B1',
    title: 'Email hỏi thăm & thúc đẩy phản hồi sau khi gửi đề xuất',
    subject: 'Following up on our proposal for [Project / Company Name]',
    enBody: `Hi [Client's Name],

I hope your week is going well. I am writing to follow up on the proposal I sent over on [Date] regarding [Service/Product].

Have you and your team had a chance to review it? I would be happy to schedule a quick 15-minute call this week to walk through any questions or tailor the package to your budget.

Looking forward to hearing from you.

Warm regards,
[Your Name]`,
    viSummary: 'Email nhắc khéo khách hàng xem đề xuất/báo giá mà không tạo cảm giác thúc ép.',
    structureNotes: [
      { label: 'Chào hỏi ấm áp', phrase: 'I hope your week is going well.', noteVi: 'Tạo thiện cảm nhẹ nhàng trước khi nhắc việc.' },
      { label: 'Nhắc lại ngữ cảnh', phrase: 'I am writing to follow up on the proposal I sent on [Date]', noteVi: 'Giúp khách hàng nhớ ngay họ đã nhận tài liệu nào.' },
      { label: 'Đề nghị hỗ trợ', phrase: 'I would be happy to schedule a quick 15-minute call', noteVi: 'Đưa ra bước tiếp theo dễ đồng ý (chỉ mất 15 phút).' },
    ],
  },
  // 3. Báo cáo sự cố IT
  {
    id: 'we-3',
    industry: 'IT / Kỹ thuật',
    channel: 'Slack / Teams',
    purpose: 'Báo cáo sự cố IT',
    level: 'B1',
    title: 'Tin nhắn Slack/Teams báo cáo sự cố hệ thống khẩn cấp',
    enBody: `🚨 [Incident Update] Payment Checkout Error (Severity: High)

• What happened: Users are seeing a 504 timeout error when clicking "Pay Now" on mobile.
• Impact: Affects approx. 15% of checkout requests since 09:20 AM.
• Current action: @backend-team is investigating the database connection pool and preparing a hotfix.
• Next update: We will share a status update in 20 minutes or as soon as the fix is deployed.`,
    viSummary: 'Mẫu tin nhắn báo cáo sự cố IT chuẩn mực trên Slack/Teams theo cấu trúc: Chuyện gì xảy ra → Mức ảnh hưởng → Đang xử lý gì → Khi nào cập nhật tiếp.',
    structureNotes: [
      { label: 'Tiêu đề cảnh báo', phrase: '[Incident Update] + Tên lỗi + Severity', noteVi: 'Giúp team nhận diện ngay mức độ nghiêm trọng.' },
      { label: 'What happened & Impact', phrase: 'Users are seeing... / Affects approx...', noteVi: 'Mô tả triệu chứng rõ ràng và phạm vi ảnh hưởng.' },
      { label: 'Next update', phrase: 'We will share a status update in 20 minutes', noteVi: 'Cam kết thời điểm cập nhật để các bên liên quan yên tâm.' },
    ],
  },
  // 4. Gửi báo giá / hóa đơn
  {
    id: 'we-4',
    industry: 'Tài chính & Logistics',
    channel: 'Email',
    purpose: 'Gửi báo giá / Hóa đơn',
    level: 'B1',
    title: 'Email gửi báo giá hoặc hóa đơn thanh toán chuyên nghiệp',
    subject: 'Quotation / Invoice #[Number] for [Project or Order Name]',
    enBody: `Dear [Client's Name],

Thank you for choosing [Your Company]. Please find attached the [quotation / invoice] (#[Number]) for [Service / Shipment details].

• Total amount: [Amount & Currency]
• Due date / Validity: [Date]
• Payment method: Bank transfer (details included in the attached PDF)

Please let me know if you need any clarification or updated billing details. Once confirmed, we will proceed immediately.

Best regards,
[Your Name]`,
    viSummary: 'Email đính kèm báo giá hoặc hóa đơn thanh toán có tóm tắt số tiền, hạn thanh toán và thông tin chuyển khoản.',
    structureNotes: [
      { label: 'Báo đính kèm', phrase: 'Please find attached the quotation / invoice (#[Number])', noteVi: 'Cụm kinh điển khi gửi kèm file PDF.' },
      { label: 'Tóm tắt con số', phrase: 'Total amount / Due date / Payment method', noteVi: 'Gạch đầu dòng giúp kế toán đối tác xử lý cực nhanh.' },
      { label: 'Xác nhận bước kế tiếp', phrase: 'Once confirmed, we will proceed immediately.', noteVi: 'Khuyến khích đối tác phản hồi để triển khai sớm.' },
    ],
  },
  // 5. Xác nhận lịch họp
  {
    id: 'we-5',
    industry: 'Văn phòng & Email',
    channel: 'Email',
    purpose: 'Xác nhận lịch họp',
    level: 'A2',
    title: 'Email xác nhận lịch họp & gửi Agenda trước buổi họp',
    subject: 'Meeting Confirmation: [Topic] on [Date] at [Time]',
    enBody: `Hi [Name / Team],

This is a quick note to confirm our meeting scheduled for [Day, Date] at [Time] (GMT+7) via [Zoom / Google Meet / Room 302].

Agenda:
1. Quick review of last week's progress (10 mins)
2. Discussion on [Main Topic] (15 mins)
3. Next action items & owners (5 mins)

Please let me know if this time still works for you or if you would like to add anything to the agenda.

Best regards,
[Your Name]`,
    viSummary: 'Email xác nhận lại thời gian, link/phòng họp và 3 đầu mục nội dung họp để mọi người chuẩn bị trước.',
    structureNotes: [
      { label: 'Xác nhận rõ ràng', phrase: 'This is a quick note to confirm our meeting scheduled for...', noteVi: 'Chốt lại ngày, giờ, múi giờ và link họp tránh nhầm lẫn.' },
      { label: 'Agenda có thời lượng', phrase: '1. Review (10 mins) / 2. Discussion (15 mins)', noteVi: 'Ghi rõ số phút cho từng phần giúp cuộc họp đi đúng trọng tâm.' },
      { label: 'Mở rộng linh hoạt', phrase: 'Please let me know if this time still works for you', noteVi: 'Cách hỏi xác nhận lại lịch cực kỳ lịch sự.' },
    ],
  },
  // 6. Slack / Teams xin xác nhận nhanh (Đời sống & Giao tiếp)
  {
    id: 'we-6',
    industry: 'Đời sống & Giao tiếp',
    channel: 'Slack / Teams',
    purpose: 'Nhắn đồng nghiệp xin phản hồi nhanh',
    level: 'A2',
    title: 'Tin nhắn Slack/Teams nhờ đồng nghiệp kiểm tra tài liệu',
    enBody: `Hi [Name] 👋 Hope you're having a smooth morning!

When you have 5 minutes, could you take a quick look at the updated file here: [Link]?
Specifically, I'd love your double-check on section 2 before I send it to the client at 3 PM.

Thanks a ton in advance! 🙏`,
    viSummary: 'Tin nhắn chat nội bộ thân thiện, nêu rõ việc cần nhờ, mất bao lâu và mốc thời gian cần phản hồi.',
    structureNotes: [
      { label: 'Tôn trọng thời gian', phrase: 'When you have 5 minutes, could you take a quick look...', noteVi: 'Báo trước chỉ mất 5 phút khiến đồng nghiệp sẵn lòng giúp hơn.' },
      { label: 'Nêu rõ phần cần xem', phrase: 'Specifically, I’d love your double-check on section 2', noteVi: 'Chỉ đích danh chỗ cần kiểm tra kèm deadline 3 PM.' },
    ],
  },
  // 7. Du lịch & Khách sạn
  {
    id: 'we-7',
    industry: 'Du lịch & Khách sạn',
    channel: 'Email',
    purpose: 'Xác nhận đặt phòng & yêu cầu đặc biệt',
    level: 'B1',
    title: 'Email xác nhận booking khách sạn & gợi ý dịch vụ cho khách',
    subject: 'Booking Confirmation #[Code] – Welcome to [Hotel Name]',
    enBody: `Dear [Guest's Name],

Thank you for reserving your stay with us at [Hotel Name]. We are delighted to confirm your reservation as follows:

• Check-in: [Date] (from 2:00 PM) | Check-out: [Date] (until 12:00 PM)
• Room type: [Deluxe Ocean View] – Non-smoking
• Special request noted: [Early check-in / Airport transfer]

If you need assistance arranging airport pickup or local tours, simply reply to this email. We look forward to welcoming you!

Warm regards,
[Your Name] | Front Desk Team`,
    viSummary: 'Email lễ tân/điều hành tour xác nhận thông tin nhận phòng, yêu cầu đặc biệt và chào đón khách.',
    structureNotes: [
      { label: 'Thể hiện sự hiếu khách', phrase: 'We are delighted to confirm your reservation', noteVi: 'Từ "delighted" mang sắc thái nồng hậu chuẩn ngành Hospitality.' },
      { label: 'Ghi nhận yêu cầu riêng', phrase: 'Special request noted: ...', noteVi: 'Cho khách thấy yêu cầu riêng của họ đã được lưu ý.' },
    ],
  },
  // 8. Ẩm thực & Mua sắm
  {
    id: 'we-8',
    industry: 'Ẩm thực & Mua sắm',
    channel: 'Email',
    purpose: 'Phản hồi & đền bù đơn hàng cho khách',
    level: 'B1',
    title: 'Email xử lý khiếu nại đơn hàng giao thiếu hoặc hỏng',
    subject: 'Regarding Your Order #[Order ID] – Replacement & Apology',
    enBody: `Dear [Customer's Name],

Thank you for reaching out and bringing this to our attention. We sincerely apologize that [item name] arrived damaged.

We have already shipped a brand-new replacement at no extra charge (Tracking: #[Tracking]). In addition, please accept a 15% discount code [SORRY15] for your next order as a token of our apology.

Thank you for your patience, and please let us know once the replacement arrives safely.

Sincerely,
[Your Name] | Customer Care`,
    viSummary: 'Email CSKH ngành bán lẻ/F&B xin lỗi khéo léo, thông báo gửi bù hàng ngay và tặng voucher giữ chân khách.',
    structureNotes: [
      { label: 'Xin lỗi chân thành', phrase: 'We sincerely apologize that [item] arrived damaged.', noteVi: 'Nhận trách nhiệm trực tiếp thay vì đổ lỗi cho đơn vị vận chuyển.' },
      { label: 'Hành động khắc phục ngay', phrase: 'We have already shipped a replacement at no extra charge', noteVi: 'Cho khách thấy vấn đề ĐÃ được xử lý xong trước khi họ kịp bực mình.' },
    ],
  },
  // 9. Phỏng vấn & Nhân sự
  {
    id: 'we-9',
    industry: 'Phỏng vấn & Nhân sự',
    channel: 'Email',
    purpose: 'Thư cảm ơn sau phỏng vấn',
    level: 'B1',
    title: 'Email cảm ơn nhà tuyển dụng sau buổi phỏng vấn (Thank-you Note)',
    subject: 'Thank you – [Job Title] Interview ([Your Name])',
    enBody: `Dear [Interviewer's Name],

Thank you very much for taking the time to speak with me today about the [Job Title] position at [Company Name].

I truly enjoyed learning more about your team's upcoming goals for [specific project discussed]. Our conversation further confirmed my enthusiasm for contributing my skills in [your key skill] to your team.

Please feel free to reach out if you need any additional information. I look forward to hearing about the next steps.

Best regards,
[Your Name]`,
    viSummary: 'Thư cảm ơn gửi trong vòng 24 giờ sau phỏng vấn, nhắc lại một chi tiết cụ thể trong buổi nói chuyện để tạo dấu ấn.',
    structureNotes: [
      { label: 'Nhắc chi tiết buổi phỏng vấn', phrase: 'I truly enjoyed learning more about [specific project discussed]', noteVi: 'Chứng minh bạn lắng nghe kỹ và thực sự quan tâm tới công việc.' },
      { label: 'Khẳng định giá trị', phrase: 'contributing my skills in [key skill] to your team', noteVi: 'Nhắc lại nhẹ nhàng thế mạnh của bạn.' },
    ],
  },
  // 10. Y tế & Sức khỏe
  {
    id: 'we-10',
    industry: 'Y tế & Sức khỏe',
    channel: 'Slack / Teams',
    purpose: 'Bàn giao ca & theo dõi bệnh nhân',
    level: 'B1',
    title: 'Tin nhắn nội bộ bàn giao ca trực phòng khám / bệnh viện',
    enBody: `📋 Shift Handover Note – Ward [B] ([Date] – Afternoon Shift)

• Patient [Mr. T. Nguyen, Bed 4]: Blood pressure checked at 2 PM (125/80 mmHg). Medication administered on schedule.
• Watch item: [Ms. L. Tran, Bed 7] reported mild dizziness; doctor notified and follow-up test scheduled at 4:30 PM.
• Supplies note: Pediatric masks restocked; please reorder blood glucose test strips tomorrow morning.

Have a smooth evening shift!`,
    viSummary: 'Mẫu tin nhắn bàn giao ca ngắn gọn, chính xác thông số và nhắc những ca cần theo dõi đặc biệt.',
    structureNotes: [
      { label: 'Watch item', phrase: 'reported mild dizziness; doctor notified', noteVi: 'Đánh dấu rõ ca cần chú ý để ca sau xử lý kịp thời.' },
      { label: 'Supplies note', phrase: 'please reorder [item] tomorrow morning', noteVi: 'Nhắc bổ sung vật tư y tế tránh thiếu hụt.' },
    ],
  },
  // 11. Giáo dục & Xã hội
  {
    id: 'we-11',
    industry: 'Giáo dục & Xã hội',
    channel: 'Email',
    purpose: 'Gửi tài liệu & nhắc lịch học viên',
    level: 'B1',
    title: 'Email tổng kết buổi học / workshop và gửi tài liệu đính kèm',
    subject: 'Recap & Slides: [Workshop / Course Name] – Session [Number]',
    enBody: `Dear Learners,

Thank you for your active participation in today's session on [Topic]. Please find attached the presentation slides and the practice worksheet for this week.

Key action items before next Tuesday:
• Review pages 4–6 of the handout.
• Submit your 200-word reflection on the portal by Sunday evening.

Feel free to reply if you have any questions while practicing. See you next week!

Best regards,
[Your Name]`,
    viSummary: 'Email gửi slide, bài tập và nhắc deadline nộp bài cho học viên hoặc người tham dự hội thảo.',
    structureNotes: [
      { label: 'Ghi nhận sự tham gia', phrase: 'Thank you for your active participation', noteVi: 'Khích lệ tinh thần học tập ngay câu đầu tiên.' },
      { label: 'Action items rõ ràng', phrase: 'Key action items before [Day]:', noteVi: 'Liệt kê ngắn gọn để học viên không sót bài tập.' },
    ],
  },
  // 12. IT / Kỹ thuật (Email báo cáo bug / deploy)
  {
    id: 'we-12',
    industry: 'IT / Kỹ thuật',
    channel: 'Slack / Teams',
    purpose: 'Thông báo phát hành bản cập nhật (Release)',
    level: 'B1',
    title: 'Tin nhắn thông báo deploy bản cập nhật thành công lên kênh chung',
    enBody: `🚀 Release v2.4.0 Deployed to Production

• New features: Single Sign-On (SSO) login and faster CSV report export.
• Bug fixes: Fixed invoice date formatting on Safari and Chrome.
• Monitoring: Error rate is 0.01% over the first 30 minutes; @qa-team please run smoke checks on the billing page.

Let me know in this thread if you spot anything unusual!`,
    viSummary: 'Tin nhắn thông báo release tính năng mới, lỗi đã sửa và phân công kiểm tra nhanh sau khi lên production.',
    structureNotes: [
      { label: 'Phân loại rõ ràng', phrase: 'New features / Bug fixes / Monitoring', noteVi: 'Các team Sales, CSKH, QA đều nắm được thông tin chỉ trong 10 giây.' },
    ],
  },
];

const BASE_WORKPLACE_STAR_QUESTIONS: WorkplaceStarQuestion[] = [
  {
    id: 'star-1',
    industry: 'Phỏng vấn & Nhân sự',
    level: 'B1',
    questionEn: 'Tell me about a time you worked under a very tight deadline and how you managed it.',
    questionVi: 'Hãy kể về một lần bạn phải làm việc dưới áp lực deadline rất gấp và cách bạn xử lý.',
    focusSkill: 'Quản lý thời gian & Sắp xếp ưu tiên',
    starOutline: {
      situation: 'Tháng trước khách hàng lớn yêu cầu giao báo cáo sớm hơn 3 ngày so với kế hoạch.',
      task: 'Tôi chịu trách nhiệm tổng hợp số liệu từ 3 phòng ban và hoàn thiện bản thuyết trình.',
      action: 'Lập danh sách việc ưu tiên, chia nhỏ mốc kiểm tra mỗi sáng, tự động hóa bảng Excel và nhờ đồng nghiệp rà lỗi chéo.',
      result: 'Nộp báo cáo trước hạn 4 tiếng, khách hàng đánh giá cao và gia hạn hợp đồng thêm 1 năm.',
    },
    sampleAnswerEn:
      'Last quarter, a key client moved our quarterly review forward by three days, leaving us only 48 hours to prepare. As the project coordinator, I needed to consolidate data from three departments into one final deck. First, I broke the deliverables into critical milestones and agreed on strict hourly check-ins with each lead. I also created a shared template so everyone could input figures simultaneously without version conflicts. As a result, we submitted the polished presentation four hours ahead of the revised deadline, and the client renewed their annual contract.',
    sampleAnswerVi:
      'Quý trước, một khách hàng lớn đẩy lịch họp tổng kết sớm hơn 3 ngày, khiến nhóm chỉ còn 48 giờ chuẩn bị. Với vai trò điều phối dự án, tôi cần tổng hợp số liệu từ 3 phòng ban vào một bộ slide duy nhất. Đầu tiên, tôi chia nhỏ đầu việc theo các mốc then chốt và thống nhất giờ kiểm tra tiến độ với từng trưởng nhóm. Tôi cũng tạo mẫu bảng chung để mọi người nhập liệu song song mà không bị xung đột phiên bản. Kết quả là chúng tôi nộp bài thuyết trình hoàn chỉnh trước hạn mới 4 tiếng và khách hàng đã gia hạn hợp đồng năm.',
    powerPhrases: ['moved ... forward by', 'broke the deliverables into', 'ahead of the revised deadline'],
  },
  {
    id: 'star-2',
    industry: 'IT / Kỹ thuật',
    level: 'B2',
    questionEn: 'Describe a critical bug or production issue you solved and what you learned from it.',
    questionVi: 'Mô tả một lỗi nghiêm trọng trên hệ thống thực tế mà bạn đã giải quyết và bài học rút ra.',
    focusSkill: 'Xử lý sự cố & Tư duy hệ thống',
    starOutline: {
      situation: 'Hệ thống thanh toán bị chậm đột ngột vào giờ cao điểm thứ Sáu, tỷ lệ lỗi tăng 12%.',
      task: 'Tôi được phân công tìm nguyên nhân gốc rễ và khôi phục dịch vụ trong thời gian ngắn nhất.',
      action: 'Kiểm tra log server, phát hiện truy vấn database thiếu index khi lượng truy cập tăng, triển khai hotfix và bổ sung cache.',
      result: 'Thời gian phản hồi giảm từ 4 giây xuống 180ms trong vòng 35 phút và không mất đơn hàng nào thêm.',
    },
    sampleAnswerEn:
      'During a Friday peak sale, our checkout API suddenly spiked to a 12 percent timeout rate. My task as the on-call backend engineer was to identify the root cause and restore stability immediately. I traced the slow logs and discovered an unindexed database query that locked the orders table under heavy load. I applied a safe index migration on a replica first, deployed the hotfix, and added Redis caching for repeated lookups. Within 35 minutes, response time dropped from four seconds to 180 milliseconds, preventing further revenue loss, and we added automated load tests to our CI pipeline.',
    sampleAnswerVi:
      'Trong đợt sale cao điểm thứ Sáu, API thanh toán bất ngờ tăng tỷ lệ lỗi timeout lên 12%. Nhiệm vụ của tôi với vai trò kỹ sư trực là tìm nguyên nhân gốc rễ và khôi phục ổn định ngay lập tức. Tôi kiểm tra slow logs và phát hiện một truy vấn thiếu index khiến bảng đơn hàng bị khóa khi tải cao. Tôi thử nghiệm tạo index trên bản replica trước, phát hành bản vá nóng và bổ sung cache Redis. Trong vòng 35 phút, thời gian phản hồi giảm từ 4 giây xuống còn 180ms, ngăn chặn thất thoát doanh thu và nhóm đã thêm kiểm thử tải tự động vào quy trình CI.',
    powerPhrases: ['identify the root cause', 'restore stability', 'under heavy load'],
  },
  {
    id: 'star-3',
    industry: 'Kinh doanh & CSKH',
    level: 'B1',
    questionEn: 'Tell me about a time you dealt with an angry or disappointed customer and turned the situation around.',
    questionVi: 'Kể về một lần bạn xử lý khách hàng đang giận dữ/thất vọng và xoay chuyển được tình thế.',
    focusSkill: 'Lắng nghe thấu cảm & Xử lý khiếu nại',
    starOutline: {
      situation: 'Một khách hàng VIP nhận sai mẫu sản phẩm ngay trước ngày diễn ra sự kiện của công ty họ.',
      task: 'Xoa dịu khách hàng, tìm phương án giao đúng hàng trong ngày và giữ mối quan hệ lâu dài.',
      action: 'Lắng nghe không ngắt lời, xin lỗi chân thành, tự phối hợp kho gửi giao hỏa tốc trong 3 giờ và chủ động cập nhật từng chặng.',
      result: 'Khách nhận hàng kịp sự kiện, gửi email khen ngợi và đặt thêm 2 đơn lớn trong quý sau.',
    },
    sampleAnswerEn:
      'A VIP client once received the wrong product batch just one day before their company launch event and called in very upset. My responsibility was to de-escalate the situation and deliver the correct items before the next morning. First, I listened patiently without interrupting, acknowledged the urgency, and apologized sincerely. I then coordinated directly with our warehouse supervisor to dispatch an express courier within three hours and sent the client live tracking updates every hour. They received everything on time, wrote a glowing thank-you note, and placed two larger orders the following quarter.',
    sampleAnswerVi:
      'Một khách hàng VIP từng nhận nhầm lô hàng chỉ 1 ngày trước sự kiện ra mắt của họ và gọi điện trong tâm trạng rất bức xúc. Trách nhiệm của tôi là hạ nhiệt tình huống và giao đúng hàng trước sáng hôm sau. Đầu tiên, tôi kiên nhẫn lắng nghe không ngắt lời, xác nhận mức độ khẩn cấp và xin lỗi chân thành. Sau đó tôi làm việc trực tiếp với quản lý kho để điều xe giao hỏa tốc trong 3 giờ và nhắn cập nhật hành trình cho khách mỗi tiếng. Họ nhận đủ hàng đúng giờ, gửi thư cảm ơn và đặt thêm 2 đơn lớn hơn vào quý tiếp theo.',
    powerPhrases: ['de-escalate the situation', 'acknowledged the urgency', 'live tracking updates'],
  },
  {
    id: 'star-4',
    industry: 'Phỏng vấn & Nhân sự',
    level: 'B1',
    questionEn: 'Give an example of a disagreement with a teammate and how you resolved it professionally.',
    questionVi: 'Hãy nêu ví dụ về một lần bạn bất đồng quan điểm với đồng nghiệp và cách giải quyết chuyên nghiệp.',
    focusSkill: 'Giao tiếp phi bạo lực & Hợp tác',
    starOutline: {
      situation: 'Tôi và bạn thiết kế bất đồng về việc chọn giao diện tối giản hay nhiều thông tin cho trang chủ mới.',
      task: 'Tìm ra phương án tốt nhất cho người dùng mà vẫn giữ tinh thần hợp tác trong nhóm.',
      action: 'Đề xuất họp riêng ngắn, lắng nghe lý do của bạn, thống nhất làm A/B testing trên 500 người dùng thật trong 1 tuần.',
      result: 'Số liệu cho thấy kết hợp hai ý tưởng tăng tỷ lệ đăng ký thêm 18%, cả hai đều hài lòng.',
    },
    sampleAnswerEn:
      'During a website redesign, a teammate and I disagreed on whether the landing page should show detailed pricing tables or stay minimal. My goal was to align on the best user experience without hurting team harmony. I invited him for a quick one-on-one chat to understand his perspective, and I realized he had valid concerns about enterprise buyers. Instead of arguing opinions, I suggested running a one-week A/B test with a hybrid layout. The test data showed a hybrid section boosted sign-ups by 18 percent, so we adopted it together and built stronger trust.',
    sampleAnswerVi:
      'Trong đợt thiết kế lại website, tôi và một đồng nghiệp bất đồng về việc trang đích nên hiển thị bảng giá chi tiết hay giữ tối giản. Mục tiêu của tôi là thống nhất trải nghiệm người dùng tốt nhất mà không làm sứt mẻ tinh thần nhóm. Tôi mời bạn trao đổi riêng 1-1 để hiểu góc nhìn của bạn và nhận ra bạn có lý khi nghĩ cho khách doanh nghiệp. Thay vì tranh luận cảm tính, tôi đề xuất chạy thử nghiệm A/B trong 1 tuần với phương án kết hợp. Số liệu cho thấy bố cục kết hợp tăng 18% lượt đăng ký, cả hai cùng áp dụng và thêm tin tưởng nhau.',
    powerPhrases: ['without hurting team harmony', 'understand his perspective', 'instead of arguing opinions'],
  },
  {
    id: 'star-5',
    industry: 'Tài chính & Logistics',
    level: 'B2',
    questionEn: 'Tell me about a time you spotted an error or discrepancy that others missed.',
    questionVi: 'Kể về một lần bạn phát hiện ra sai sót hoặc chênh lệch số liệu mà người khác bỏ qua.',
    focusSkill: 'Tỉ mỉ, chính xác & Kiểm soát rủi ro',
    starOutline: {
      situation: 'Khi rà soát chứng từ xuất khẩu cuối tháng, tôi thấy mã HS và đơn vị tính trên hóa đơn lệch so với vận đơn.',
      task: 'Chặn sai sót trước khi hàng ra cảng để tránh bị phạt hải quan và chậm thanh toán.',
      action: 'Đối chiếu lại hợp đồng gốc, báo ngay cho bộ phận chứng từ và khách hàng để điều chỉnh trong 2 giờ.',
      result: 'Lô hàng thông quan suôn sẻ đúng lịch, tránh được phí lưu kho bãi ước tính 3.000 USD.',
    },
    sampleAnswerEn:
      'While reviewing monthly export documents, I noticed a mismatch between the HS code on a commercial invoice and the packing list that had already passed initial checks. My task was to prevent customs penalties and shipment delays before the container left port. I cross-checked the original sales contract, flagged the discrepancy to our documentation lead immediately, and coordinated an amended invoice within two hours. Consequently, the shipment cleared customs smoothly on schedule, saving the company an estimated 3,000 dollars in storage and penalty fees.',
    sampleAnswerVi:
      'Khi rà soát bộ chứng từ xuất khẩu hàng tháng, tôi phát hiện sự chênh lệch mã HS giữa hóa đơn thương mại và phiếu đóng gói dù hồ sơ đã qua vòng kiểm tra đầu. Nhiệm vụ của tôi là ngăn án phạt hải quan và trễ lịch tàu trước khi container rời cảng. Tôi đối chiếu lại hợp đồng gốc, báo ngay cho trưởng nhóm chứng từ và phối hợp sửa hóa đơn trong 2 giờ. Nhờ vậy lô hàng thông quan thuận lợi đúng lịch, giúp công ty tránh khoản phí lưu bãi và tiền phạt ước tính 3.000 USD.',
    powerPhrases: ['noticed a mismatch', 'cross-checked', 'cleared customs smoothly'],
  },
  {
    id: 'star-6',
    industry: 'Văn phòng & Email',
    level: 'B1',
    questionEn: 'Tell me about a time you improved an existing process to save time or cost.',
    questionVi: 'Kể về một lần bạn cải tiến quy trình làm việc giúp tiết kiệm thời gian hoặc chi phí.',
    focusSkill: 'Tư duy cải tiến & Hiệu suất',
    starOutline: {
      situation: 'Nhóm mất hơn 4 tiếng mỗi tuần để tổng hợp báo cáo thủ công từ nhiều file Excel gửi qua email.',
      task: 'Giảm thời gian tổng hợp và hạn chế lỗi copy-paste sai số liệu.',
      action: 'Thiết kế biểu mẫu Google Sheets chuẩn hóa có công thức tự động cộng gộp và hướng dẫn 6 đồng nghiệp dùng.',
      result: 'Thời gian làm báo cáo giảm từ 4 tiếng xuống 25 phút mỗi tuần, sai sót giảm về 0.',
    },
    sampleAnswerEn:
      'Previously, our team spent over four hours every Friday manually merging six separate Excel files sent by email. I wanted to eliminate copy-paste errors and free up time for analysis. I built a centralized cloud spreadsheet with standardized drop-down fields and automated summary formulas, then ran a 20-minute walkthrough for the team. Within two weeks, weekly reporting time dropped from four hours to just 25 minutes with zero data entry mistakes.',
    sampleAnswerVi:
      'Trước đây, nhóm tôi mất hơn 4 tiếng mỗi thứ Sáu để ghép thủ công 6 file Excel gửi qua email. Tôi muốn loại bỏ lỗi sao chép nhầm và dành thời gian cho việc phân tích. Tôi đã xây dựng một bảng tính dùng chung trên cloud có sẵn danh sách chọn chuẩn hóa và công thức tổng hợp tự động, rồi hướng dẫn nhóm trong 20 phút. Sau 2 tuần, thời gian làm báo cáo hàng tuần giảm từ 4 tiếng xuống chỉ còn 25 phút và không còn sai sót nhập liệu.',
    powerPhrases: ['eliminate copy-paste errors', 'centralized', 'dropped from ... to ...'],
  },
  {
    id: 'star-7',
    industry: 'Y tế & Sức khỏe',
    level: 'B1',
    questionEn: 'Describe a stressful situation where clear communication helped ensure patient or client safety.',
    questionVi: 'Mô tả một tình huống căng thẳng mà giao tiếp rõ ràng đã giúp đảm bảo an toàn cho bệnh nhân/khách hàng.',
    focusSkill: 'Giao tiếp chính xác dưới áp lực',
    starOutline: {
      situation: 'Một bệnh nhân lớn tuổi nói tiếng Anh hạn chế tỏ ra lo lắng và chưa hiểu liều dùng hai loại thuốc mới.',
      task: 'Đảm bảo bệnh nhân hiểu đúng lịch uống thuốc để tránh uống nhầm liều tại nhà.',
      action: 'Nói chậm từng câu ngắn, dùng bảng biểu tượng sáng/trưa/tối và nhờ bệnh nhân nhắc lại theo phương pháp teach-back.',
      result: 'Bệnh nhân tự tin nhắc lại đúng 100% liều dùng và tuân thủ điều trị tốt ở lần tái khám.',
    },
    sampleAnswerEn:
      'An elderly patient with limited English proficiency looked anxious about taking two newly prescribed medications at home. My priority was ensuring complete medication safety before discharge. I spoke calmly in plain language, drew simple morning-noon-night icons on the schedule sheet, and used the teach-back method so she could confirm the dosage in her own words. She smiled with relief, repeated every instruction accurately, and followed the regimen without any issues at her follow-up visit.',
    sampleAnswerVi:
      'Một bệnh nhân lớn tuổi hạn chế tiếng Anh tỏ ra rất lo lắng về việc uống hai loại thuốc mới kê đơn tại nhà. Ưu tiên của tôi là đảm bảo an toàn dùng thuốc tuyệt đối trước khi xuất viện. Tôi nói chuyện điềm tĩnh bằng ngôn ngữ đơn giản, vẽ ký hiệu sáng-trưa-tối lên tờ hướng dẫn và áp dụng phương pháp hỏi lại (teach-back) để cô tự xác nhận liều dùng. Cô mỉm cười nhẹ nhõm, nhắc lại chính xác từng hướng dẫn và tuân thủ phác đồ rất tốt trong buổi tái khám.',
    powerPhrases: ['plain language', 'teach-back method', 'confirm in her own words'],
  },
  {
    id: 'star-8',
    industry: 'Du lịch & Khách sạn',
    level: 'B1',
    questionEn: 'Tell me about a time an unexpected problem happened for a guest or traveler and how you fixed it.',
    questionVi: 'Kể về một lần khách du lịch/khách sạn gặp sự cố ngoài dự kiến và bạn đã xử lý ra sao.',
    focusSkill: 'Phản ứng nhanh & Hiếu khách',
    starOutline: {
      situation: 'Do mưa bão, phòng hướng biển khách đặt bị thấm nước nhẹ ngay buổi tối khách vừa đáp chuyến bay muộn.',
      task: 'Bố trí chỗ ở thoải mái ngay lập tức để không làm hỏng kỳ nghỉ của gia đình khách.',
      action: 'Chủ động nâng hạng miễn phí sang phòng Suite yên tĩnh hơn, chuẩn bị trà ấm và tặng voucher bữa sáng hôm sau.',
      result: 'Gia đình khách rất cảm kích và chấm điểm 5 sao cùng lời khen đích danh trên TripAdvisor.',
    },
    sampleAnswerEn:
      'During a heavy storm, a family arrived late at night only to find a minor window leak in their booked ocean-view room. My goal was to protect their vacation experience right away. I immediately apologized, upgraded them at no charge to a quiet suite on a higher floor, and arranged warm tea while our bellboy moved their luggage. I also added a complimentary breakfast voucher for the next morning. The family was deeply touched and left a five-star review praising our team’s hospitality.',
    sampleAnswerVi:
      'Trong một đêm mưa bão lớn, một gia đình nhận phòng muộn nhưng phòng hướng biển của họ bị thấm nước nhẹ ở cửa sổ. Mục tiêu của tôi là giữ trọn trải nghiệm kỳ nghỉ cho họ ngay lập tức. Tôi lập tức xin lỗi, nâng hạng miễn phí lên phòng Suite yên tĩnh ở tầng cao hơn và chuẩn bị trà ấm trong lúc nhân viên chuyển hành lý giúp khách. Tôi cũng tặng thêm phiếu ăn sáng miễn phí hôm sau. Gia đình khách rất xúc động và để lại đánh giá 5 sao khen ngợi sự chu đáo của đội ngũ.',
    powerPhrases: ['right away', 'upgraded at no charge', 'protect their experience'],
  },
  {
    id: 'star-9',
    industry: 'Giáo dục & Xã hội',
    level: 'B1',
    questionEn: 'Describe a time you mentored or coached someone who was struggling to learn a new skill.',
    questionVi: 'Mô tả một lần bạn hướng dẫn hoặc kèm cặp một người đang gặp khó khăn khi học kỹ năng mới.',
    focusSkill: 'Hướng dẫn, kiên nhẫn & Truyền động lực',
    starOutline: {
      situation: 'Một nhân viên mới/học viên gặp khó khăn khi thuyết trình bằng tiếng Anh và mất tự tin.',
      task: 'Giúp bạn nắm cấu trúc bài nói và tự tin hoàn thành buổi báo cáo sau 2 tuần.',
      action: 'Chia nhỏ bài nói thành 3 phần cố định, luyện tập 15 phút mỗi ngày và ghi nhận tiến bộ từng bước.',
      result: 'Bạn trình bày trôi chảy trong buổi họp thật và nhận lời khen từ trưởng bộ phận.',
    },
    sampleAnswerEn:
      'A junior team member was nervous about delivering her first English product demo to overseas stakeholders. I offered to coach her over the two weeks leading up to the meeting. Instead of giving a long checklist, I helped her structure the demo into three simple signposts and practiced 15 minutes a day using real customer questions. By building her confidence step by step, she delivered a clear, calm presentation and received positive feedback from the regional director.',
    sampleAnswerVi:
      'Một bạn nhân viên mới rất lo lắng trước buổi demo sản phẩm đầu tiên bằng tiếng Anh với đối tác nước ngoài. Tôi đề nghị đồng hành luyện tập cùng bạn trong 2 tuần trước buổi họp. Thay vì đưa danh sách yêu cầu dài dòng, tôi giúp bạn chia bài demo thành 3 mốc rõ ràng và luyện 15 phút mỗi ngày với các câu hỏi thực tế. Nhờ xây dựng sự tự tin từng bước, bạn đã trình bày rõ ràng, bình tĩnh và nhận lời khen từ giám đốc khu vực.',
    powerPhrases: ['structure into three signposts', 'building confidence step by step', 'positive feedback'],
  },
  {
    id: 'star-10',
    industry: 'Ẩm thực & Mua sắm',
    level: 'A2',
    questionEn: 'Tell me about a very busy rush hour at work and how you maintained service quality.',
    questionVi: 'Kể về một khung giờ cao điểm cực kỳ đông khách và cách bạn giữ vững chất lượng phục vụ.',
    focusSkill: 'Bình tĩnh, phối hợp nhóm & Tốc độ',
    starOutline: {
      situation: 'Cuối tuần lễ có hơn 80 khách tới quán/cửa hàng cùng lúc khi một nhân viên bị ốm nghỉ đột xuất.',
      task: 'Đảm bảo đơn hàng/món ăn ra đúng thứ tự và khách không phải chờ quá lâu trong bực bội.',
      action: 'Phân chia lại vị trí rõ ràng (1 người nhận order, 1 người đóng gói/thanh toán), thông báo trước thời gian chờ cho khách.',
      result: 'Phục vụ trọn vẹn giờ cao điểm, doanh thu tăng 25% và không có đánh giá tiêu cực nào.',
    },
    sampleAnswerEn:
      'During a holiday weekend rush, we suddenly had a full house with over 80 guests while one teammate called in sick. My job was to keep orders accurate and prevent customer frustration. I quickly suggested splitting duties so one person focused solely on taking orders while I handled packing and payment, and I politely gave waiting guests an honest 10-minute estimate plus free iced water. Everyone stayed calm, we served every table smoothly, and weekend sales grew by 25 percent with zero complaints.',
    sampleAnswerVi:
      'Vào giờ cao điểm cuối tuần lễ, quán đột ngột đón hơn 80 khách cùng lúc trong khi một bạn xin nghỉ ốm đột xuất. Nhiệm vụ của tôi là giữ đơn chính xác và tránh để khách sốt ruột. Tôi nhanh chóng đề xuất chia lại việc: một người chuyên nhận món còn tôi phụ trách đóng gói và thanh toán, đồng thời chủ động báo trước thời gian chờ khoảng 10 phút kèm nước mát miễn phí. Cả nhóm giữ được bình tĩnh, phục vụ suôn sẻ, doanh thu tăng 25% mà không có phàn nàn nào.',
    powerPhrases: ['called in sick', 'splitting duties', 'honest estimate'],
  },
  {
    id: 'star-11',
    industry: 'Đời sống & Giao tiếp',
    level: 'A2',
    questionEn: 'Tell me about a time a miscommunication happened and how you fixed it.',
    questionVi: 'Kể về một lần xảy ra hiểu lầm trong giao tiếp và cách bạn khắc phục.',
    focusSkill: 'Xác nhận thông tin & Chịu trách nhiệm',
    starOutline: {
      situation: 'Do chỉ trao đổi nhanh qua chat, đồng nghiệp hiểu nhầm ngày gửi tài liệu cho đối tác.',
      task: 'Làm rõ lại mốc thời gian và hoàn thành đúng kỳ vọng chung.',
      action: 'Gọi nhanh 5 phút để thống nhất, sau đó gửi tin nhắn tóm tắt lại 3 gạch đầu dòng xác nhận.',
      result: 'Hai bên hoàn thành đúng giờ và nhóm áp dụng thói quen chốt xác nhận bằng văn bản sau mọi cuộc trao đổi.',
    },
    sampleAnswerEn:
      'Once, a colleague and I misread each other’s chat messages about whether a file was due on Tuesday or Thursday. As soon as I noticed the confusion, I jumped on a five-minute call to align without blaming anyone, and then posted a short three-bullet recap in our group channel. We finished the file on time, and since then our team always closes discussions with a clear written confirmation of dates and owners.',
    sampleAnswerVi:
      'Có lần tôi và một đồng nghiệp đọc hiểu nhầm tin nhắn chat về hạn nộp file là thứ Ba hay thứ Năm. Ngay khi nhận ra sự nhầm lẫn, tôi gọi nhanh 5 phút để thống nhất lại mà không đổ lỗi cho ai, rồi nhắn tóm tắt 3 gạch đầu dòng lên nhóm chung. Chúng tôi hoàn thành file đúng hạn, và từ đó cả nhóm luôn có thói quen chốt xác nhận rõ ngày và người phụ trách bằng văn bản.',
    powerPhrases: ['jumped on a five-minute call', 'without blaming anyone', 'written confirmation'],
  },
  {
    id: 'star-12',
    industry: 'Phỏng vấn & Nhân sự',
    level: 'B2',
    questionEn: 'Tell me about a time you had to adapt quickly to a major change at work.',
    questionVi: 'Kể về một lần bạn phải thích nghi nhanh với một thay đổi lớn trong công việc.',
    focusSkill: 'Thích nghi linh hoạt & Học hỏi nhanh',
    starOutline: {
      situation: 'Công ty chuyển toàn bộ quy trình làm việc sang phần mềm quản lý mới chỉ trong 1 tuần.',
      task: 'Làm quen công cụ mới nhanh chóng để không gián đoạn tiến độ dự án đang chạy.',
      action: 'Dành 30 phút mỗi tối xem tài liệu hướng dẫn, lập bảng phím tắt cho bản thân và chia sẻ cho cả phòng.',
      result: 'Chuyển đổi mượt mà đúng ngày ra mắt, giúp cả nhóm rút ngắn thời gian làm quen còn một nửa.',
    },
    sampleAnswerEn:
      'When my previous company switched all project tracking to a brand-new software platform within one week, many teammates felt overwhelmed. My priority was keeping our active client projects on track during the transition. I spent 30 minutes each evening testing the new workflows, created a one-page cheat sheet of common shortcuts, and shared it with my department. As a result, our team migrated 100 percent of tasks before the deadline and cut onboarding time in half.',
    sampleAnswerVi:
      'Khi công ty cũ chuyển toàn bộ hệ thống theo dõi dự án sang phần mềm mới chỉ trong 1 tuần, nhiều đồng nghiệp khá choáng ngợp. Ưu tiên của tôi là giữ các dự án khách hàng không bị gián đoạn. Tôi dành 30 phút mỗi tối thử trước các luồng thao tác mới, soạn một trang tóm tắt phím tắt thông dụng và chia sẻ cho cả phòng. Nhờ đó, nhóm chuyển đổi 100% đầu việc trước hạn và giảm một nửa thời gian làm quen hệ thống mới.',
    powerPhrases: ['keep ... on track', 'one-page cheat sheet', 'cut ... in half'],
  },
];

const BASE_WORKPLACE_CASE_SITUATIONS: WorkplaceCaseSituation[] = [
  // 1. Văn phòng & Email
  {
    id: 'wc-1',
    industry: 'Văn phòng & Email',
    level: 'B1',
    title: 'Sếp yêu cầu gấp một báo cáo khi bạn đang quá tải việc khác',
    scenarioVi: 'Bạn đang hoàn tất bảng ngân sách phải nộp lúc 4 giờ chiều thì quản lý nhắn hỏi thêm một báo cáo phân tích trong ngày hôm nay.',
    promptEn: 'Hi, could you prepare the Q3 competitor summary and send it to me by 3 PM today?',
    promptVi: 'Chào bạn, bạn làm giúp mình bản tóm tắt đối thủ Q3 và gửi trước 3 giờ chiều nay nhé?',
    options: [
      {
        id: 'a',
        textEn: 'No, I am too busy right now. Ask someone else to do it.',
        textVi: 'Không, giờ tôi bận lắm. Nhờ người khác làm đi.',
        tone: 'Quá thẳng & thiếu hợp tác',
        isBest: false,
        explanationVi: 'Từ chối thẳng thừng dễ gây ấn tượng thiếu chuyên nghiệp và không đưa ra phương án thay thế.',
      },
      {
        id: 'b',
        textEn: 'I would be happy to help! Since I am finalizing the Q3 budget due at 4 PM, which one should I prioritize first—the budget or the competitor summary?',
        textVi: 'Em sẵn sàng hỗ trợ ạ! Vì hiện em đang hoàn thiện bảng ngân sách Q3 nộp lúc 4 giờ chiều, anh/chị muốn em ưu tiên hoàn thành phần nào trước ạ?',
        tone: 'Chuyên nghiệp & chủ động quản lý kỳ vọng',
        isBest: true,
        explanationVi: 'Rất chuẩn mực! Bạn thể hiện thiện chí, báo rõ đầu việc đang kẹt kèm deadline và nhờ sếp chốt thứ tự ưu tiên.',
      },
      {
        id: 'c',
        textEn: 'Okay, I will try my best, maybe it will be ready tonight.',
        textVi: 'Dạ vâng, để em cố gắng, chắc tối nay sẽ xong.',
        tone: 'Mơ hồ về thời gian',
        isBest: false,
        explanationVi: 'Đồng ý mơ hồ khi biết mình quá tải dễ dẫn đến trễ cả hai việc mà sếp không nắm được rủi ro.',
      },
    ],
  },
  // 2. IT / Kỹ thuật
  {
    id: 'wc-2',
    industry: 'IT / Kỹ thuật',
    level: 'B1',
    title: 'Khách hàng báo lỗi mơ hồ qua email trước buổi demo',
    scenarioVi: 'Khách hàng nhắn "Hệ thống bị hỏng rồi, không vào được!" nhưng chưa gửi ảnh chụp màn hình hay bước tái hiện lỗi.',
    promptEn: 'The system is completely broken! Nothing works when I try to open the dashboard!',
    promptVi: 'Hệ thống hỏng hoàn toàn rồi! Chẳng mở được dashboard gì cả!',
    options: [
      {
        id: 'a',
        textEn: 'It works fine on my computer. Please check your internet connection.',
        textVi: 'Trên máy tôi vẫn chạy bình thường. Bạn kiểm tra lại mạng đi.',
        tone: 'Phòng thủ & thiếu đồng cảm',
        isBest: false,
        explanationVi: 'Câu nói "trên máy tôi vẫn chạy" dễ khiến khách hàng tức giận thêm.',
      },
      {
        id: 'b',
        textEn: 'I understand how frustrating this is right before the demo. Could you share a quick screenshot or the exact error message? Meanwhile, our team is checking the server logs right now.',
        textVi: 'Tôi hiểu sự bất tiện này ngay trước buổi demo. Bạn có thể gửi giúp tôi ảnh chụp màn hình hoặc thông báo lỗi cụ thể không? Song song đó, team kỹ thuật đang kiểm tra log máy chủ ngay đây ạ.',
        tone: 'Trấn an & thu thập thông tin nhanh',
        isBest: true,
        explanationVi: 'Xuất sắc: vừa đồng cảm, vừa hỏi đúng dữ kiện cần để debug, vừa cho khách biết bạn đã bắt tay kiểm tra ngay.',
      },
      {
        id: 'c',
        textEn: 'Please submit a formal ticket in Jira and wait 48 hours.',
        textVi: 'Vui lòng tạo ticket trên Jira và chờ 48 giờ.',
        tone: 'Máy móc, cứng nhắc',
        isBest: false,
        explanationVi: 'Đòi quy trình cứng nhắc trong tình huống khẩn cấp trước buổi demo làm giảm trải nghiệm khách hàng.',
      },
    ],
  },
  // 3. Kinh doanh & CSKH
  {
    id: 'wc-3',
    industry: 'Kinh doanh & CSKH',
    level: 'B2',
    title: 'Khách hàng đòi giảm giá 40% vượt quá thẩm quyền cho phép',
    scenarioVi: 'Đối tác mới muốn ký hợp đồng nhưng yêu cầu giảm 40% giá niêm yết, trong khi hạn mức chiết khấu tối đa của bạn là 15%.',
    promptEn: 'Your competitor offered us a much lower rate. Give us 40% off or we walk away.',
    promptVi: 'Đối thủ của bạn báo giá thấp hơn nhiều. Giảm cho chúng tôi 40% không thì chúng tôi dừng.',
    options: [
      {
        id: 'a',
        textEn: '40% is impossible. Take it or leave it.',
        textVi: '40% là không thể. Chịu thì ký không thì thôi.',
        tone: 'Cứng nhắc, làm đứt gãy đàm phán',
        isBest: false,
        explanationVi: 'Phản ứng đối đầu làm mất ngay cơ hội thương lượng giá trị gia tăng.',
      },
      {
        id: 'b',
        textEn: 'I appreciate your transparency about your budget. While 40% goes beyond our cost structure, we can offer a 15% discount plus free onboarding training if you sign a 12-month plan.',
        textVi: 'Tôi rất trân trọng sự thẳng thắn về ngân sách của anh/chị. Dù mức 40% vượt quá khung chi phí, chúng tôi có thể áp dụng chiết khấu 15% kèm gói đào tạo miễn phí nếu anh/chị chọn gói 12 tháng.',
        tone: 'Khéo léo & giữ giá trị sản phẩm',
        isBest: true,
        explanationVi: 'Chuẩn đàm phán win-win: từ chối khéo mức vô lý nhưng đưa ra phương án thay thế hấp dẫn có điều kiện đi kèm.',
      },
      {
        id: 'c',
        textEn: 'Okay, I will secretly give you 40% off without telling my manager.',
        textVi: 'Được thôi, tôi sẽ lén giảm 40% mà không báo quản lý.',
        tone: 'Vi phạm quy định công ty',
        isBest: false,
        explanationVi: 'Tự ý phá giá vượt thẩm quyền gây rủi ro kỷ luật và thua lỗ cho doanh nghiệp.',
      },
    ],
  },
  // 4. Phỏng vấn & Nhân sự
  {
    id: 'wc-4',
    industry: 'Phỏng vấn & Nhân sự',
    level: 'B1',
    title: 'Ứng viên hỏi mức lương hoặc nhà tuyển dụng hỏi điểm yếu lớn nhất',
    scenarioVi: 'Trong buổi phỏng vấn, nhà tuyển dụng hỏi: "Điểm yếu lớn nhất của bạn là gì?"',
    promptEn: 'What would you say is your biggest weakness at work?',
    promptVi: 'Theo bạn, điểm yếu lớn nhất của bạn trong công việc là gì?',
    options: [
      {
        id: 'a',
        textEn: 'I do not have any weaknesses. I am a perfectionist and work too hard.',
        textVi: 'Tôi chẳng có điểm yếu nào cả. Tôi quá cầu toàn và làm việc quá chăm chỉ.',
        tone: 'Sáo rỗng, thiếu chân thực',
        isBest: false,
        explanationVi: 'Nhà tuyển dụng nghe câu "perfectionist" quá nhiều lần và đánh giá bạn thiếu tự nhận thức.',
      },
      {
        id: 'b',
        textEn: 'I sometimes hesitate to delegate small tasks because I want everything right. Recently, I started using shared checklists to trust teammates more and focus on high-impact work.',
        textVi: 'Trước đây đôi khi tôi hơi ngại giao việc nhỏ cho người khác vì muốn tự tay kiểm soát. Gần đây, tôi dùng checklist chung để tin tưởng đồng đội hơn và tập trung vào đầu việc trọng tâm.',
        tone: 'Trung thực & cho thấy sự cải thiện',
        isBest: true,
        explanationVi: 'Điểm yếu thật, không chí mạng cho vị trí, và quan trọng nhất là đi kèm hành động khắc phục cụ thể!',
      },
      {
        id: 'c',
        textEn: 'I am always late for morning meetings and forget deadlines.',
        textVi: 'Tôi hay đi họp sáng muộn và thường quên deadline.',
        tone: 'Gây báo động đỏ (Red flag)',
        isBest: false,
        explanationVi: 'Nêu điểm yếu về kỷ luật cơ bản (đi muộn, quên deadline) sẽ khiến bạn bị loại ngay.',
      },
    ],
  },
  // 5. Tài chính & Logistics
  {
    id: 'wc-5',
    industry: 'Tài chính & Logistics',
    level: 'B2',
    title: 'Khách hàng giục lô hàng đang bị giữ kiểm tra hải quan',
    scenarioVi: 'Lô hàng nhập khẩu đang bị hải quan kiểm tra ngẫu nhiên (luồng đỏ), mất thêm 1–2 ngày, khách hàng đang gọi hỏi gấp.',
    promptEn: 'Where is our container? Your tracking still says "Pending Customs" since yesterday!',
    promptVi: 'Container của chúng tôi đâu rồi? Hệ thống vẫn báo "Đang chờ hải quan" từ hôm qua!',
    options: [
      {
        id: 'a',
        textEn: 'Customs is very slow, it is not our fault, so just wait.',
        textVi: 'Hải quan làm chậm lắm, không phải lỗi bên tôi đâu, cứ chờ đi.',
        tone: 'Đổ lỗi & bị động',
        isBest: false,
        explanationVi: 'Đổ lỗi mà không cập nhật mốc thời gian hay hành động khiến khách mất niềm tin.',
      },
      {
        id: 'b',
        textEn: 'Your container was selected for a routine customs inspection. All paperwork is complete, our broker is on-site today, and we expect clearance by tomorrow noon. I will update you at 4 PM.',
        textVi: 'Container của anh/chị được chọn kiểm tra hải quan ngẫu nhiên. Toàn bộ giấy tờ đã đầy đủ, nhân viên khai báo của chúng tôi đang trực tiếp xử lý tại cảng hôm nay và dự kiến thông quan trưa mai. Tôi sẽ cập nhật lại lúc 4 giờ chiều nay.',
        tone: 'Minh bạch, trấn an & có mốc báo lại',
        isBest: true,
        explanationVi: 'Chuyên nghiệp tuyệt đối: giải thích nguyên nhân khách quan, xác nhận hồ sơ ổn và cam kết giờ cập nhật.',
      },
      {
        id: 'c',
        textEn: 'Don’t worry, it will definitely arrive in two hours.',
        textVi: 'Đừng lo, chắc chắn 2 tiếng nữa hàng tới nơi.',
        tone: 'Hứa liều không có cơ sở',
        isBest: false,
        explanationVi: 'Hứa hẹn sai thực tế sẽ làm vỡ kế hoạch kho bãi của khách và mất uy tín nặng nề.',
      },
    ],
  },
  // 6. Du lịch & Khách sạn
  {
    id: 'wc-6',
    industry: 'Du lịch & Khách sạn',
    level: 'A2',
    title: 'Khách check-in sớm hơn 3 tiếng khi phòng chưa dọn xong',
    scenarioVi: 'Khách đến quầy lễ tân lúc 11 giờ sáng, trong khi giờ nhận phòng tiêu chuẩn là 2 giờ chiều và phòng đang được dọn.',
    promptEn: 'We just had a long flight and want to check into our room right now.',
    promptVi: 'Chúng tôi vừa bay chuyến dài rất mệt và muốn nhận phòng ngay bây giờ.',
    options: [
      {
        id: 'a',
        textEn: 'Check-in time is 2 PM. Please sit over there and wait three hours.',
        textVi: 'Giờ nhận phòng là 2 giờ chiều. Ra kia ngồi chờ 3 tiếng nữa nhé.',
        tone: 'Lạnh lùng, thiếu tinh tế',
        isBest: false,
        explanationVi: 'Trả lời cứng nhắc theo nội quy khiến khách đang mệt cảm thấy không được chào đón.',
      },
      {
        id: 'b',
        textEn: 'Welcome! I completely understand you must be tired after your flight. Your room is being prioritized by housekeeping now—would you like us to store your luggage and enjoy a welcome drink at our lounge while we notify you as soon as it is ready?',
        textVi: 'Chào mừng anh/chị! Tôi hiểu anh/chị đang rất mệt sau chuyến bay. Bộ phận buồng phòng đang ưu tiên dọn phòng cho anh/chị ngay—anh/chị để bên em giữ hành lý và mời dùng nước chào mừng tại sảnh trong lúc chờ nhé ạ?',
        tone: 'Hiếu khách & giải pháp chu đáo',
        isBest: true,
        explanationVi: 'Chuẩn mực ngành dịch vụ 5 sao: đồng cảm + ưu tiên xử lý + đề nghị giữ hành lý và đồ uống miễn phí.',
      },
      {
        id: 'c',
        textEn: 'You have to pay an extra 50 dollars if you want to sit in the lobby.',
        textVi: 'Muốn ngồi ở sảnh chờ thì phải trả thêm 50 đô la.',
        tone: 'Vô lý, gây phản cảm',
        isBest: false,
        explanationVi: 'Không bao giờ tính phí ngồi sảnh chờ với khách đã đặt phòng.',
      },
    ],
  },
  // 7. Ẩm thực & Mua sắm
  {
    id: 'wc-7',
    industry: 'Ẩm thực & Mua sắm',
    level: 'A2',
    title: 'Khách hàng muốn trả lại sản phẩm không còn tem nhãn hoặc đã quá hạn đổi',
    scenarioVi: 'Khách hàng mang áo đến đổi kích cỡ nhưng đã cắt tem mác, trong khi chính sách cửa hàng chỉ đổi khi còn nguyên tem.',
    promptEn: 'I bought this shirt yesterday, but it is too tight. Can I exchange it for a larger size?',
    promptVi: 'Hôm qua tôi mua cái áo này nhưng mặc hơi chật. Tôi đổi sang cỡ lớn hơn được không?',
    options: [
      {
        id: 'a',
        textEn: 'No tag, no exchange. That is our strict rule.',
        textVi: 'Mất tem là không đổi. Quy định cứng rồi.',
        tone: 'Cụt lủn, dễ gây tranh cãi',
        isBest: false,
        explanationVi: 'Từ chối cộc lốc mà không giải thích hoặc hỗ trợ phương án thay thế khiến khách không quay lại.',
      },
      {
        id: 'b',
        textEn: 'I’d be happy to check! Our standard policy requires the original tag for an exchange, so let me ask my store manager if we can make a one-time exception or offer you a store voucher.',
        textVi: 'Để tôi kiểm tra giúp anh/chị ngay! Theo quy định chuẩn thì sản phẩm cần còn nguyên tem để đổi, nên để tôi hỏi quản lý cửa hàng xem có thể hỗ trợ ngoại lệ một lần hoặc tặng mã ưu đãi cho anh/chị không nhé.',
        tone: 'Mềm mỏng, tôn trọng quy định & tìm hướng hỗ trợ',
        isBest: true,
        explanationVi: 'Vừa nhắc khéo quy định một cách nhẹ nhàng, vừa thể hiện nỗ lực đứng về phía khách hàng.',
      },
      {
        id: 'c',
        textEn: 'Why did you cut the tag? You should have tried it on before.',
        textVi: 'Sao anh lại cắt tem đi? Lẽ ra phải thử trước chứ.',
        tone: 'Trách móc khách hàng',
        isBest: false,
        explanationVi: 'Trách khách hàng là điều tối kỵ trong dịch vụ bán lẻ.',
      },
    ],
  },
  // 8. Y tế & Sức khỏe
  {
    id: 'wc-8',
    industry: 'Y tế & Sức khỏe',
    level: 'B1',
    title: 'Bệnh nhân lo lắng hỏi xin đơn thuốc kháng sinh khi không cần thiết',
    scenarioVi: 'Bệnh nhân bị cảm siêu vi nhẹ và yêu cầu bác sĩ/dược sĩ kê kháng sinh mạnh để nhanh khỏi.',
    promptEn: 'I need to recover by Monday. Can you just prescribe me strong antibiotics today?',
    promptVi: 'Tôi cần khỏi trước thứ Hai. Anh/chị kê luôn kháng sinh liều mạnh cho tôi hôm nay được không?',
    options: [
      {
        id: 'a',
        textEn: 'Antibiotics will not help your cold. Do not ask for them.',
        textVi: 'Kháng sinh không chữa được cảm đâu. Đừng có xin nữa.',
        tone: 'Cứng nhắc, thiếu giải thích y khoa',
        isBest: false,
        explanationVi: 'Bệnh nhân sẽ thấy bị gạt bỏ lo lắng và dễ tự ý ra ngoài mua thuốc sai cách.',
      },
      {
        id: 'b',
        textEn: 'I understand you want to feel better quickly for Monday. Since your symptoms point to a viral cold, antibiotics won’t speed up recovery and may cause side effects. Let’s focus on targeted symptom relief and hydration so you bounce back safely.',
        textVi: 'Tôi hiểu anh/chị muốn khỏe nhanh để kịp thứ Hai. Vì các triệu chứng hiện tại giống cảm siêu vi, kháng sinh sẽ không giúp khỏi nhanh hơn mà còn dễ gây tác dụng phụ. Mình hãy tập trung giảm đúng triệu chứng và bù nước để hồi phục an toàn nhé.',
        tone: 'Thấu cảm, giải thích rõ ràng & an toàn',
        isBest: true,
        explanationVi: 'Kết hợp thấu cảm + giải thích lý do khoa học dễ hiểu + đưa ra giải pháp chăm sóc cụ thể.',
      },
      {
        id: 'c',
        textEn: 'Sure, if you insist, I will give you antibiotics just in case.',
        textVi: 'Vâng, nếu anh/chị nằng nặc đòi thì tôi kê kháng sinh phòng hờ vậy.',
        tone: 'Thiếu trách nhiệm chuyên môn',
        isBest: false,
        explanationVi: 'Chiều theo yêu cầu sai chuyên môn gây hại sức khỏe và kháng kháng sinh.',
      },
    ],
  },
  // 9. Giáo dục & Xã hội
  {
    id: 'wc-9',
    industry: 'Giáo dục & Xã hội',
    level: 'B1',
    title: 'Học viên/Phụ huynh phàn nàn bài tập khó hoặc tiến bộ chậm',
    scenarioVi: 'Một học viên trưởng thành nhắn tin nói cảm thấy nản vì học 3 tuần rồi vẫn chưa nói trôi chảy trong cuộc họp.',
    promptEn: 'I have studied for three weeks, but I still freeze during English meetings. Maybe this course is too hard.',
    promptVi: 'Mình học 3 tuần rồi mà vào họp tiếng Anh vẫn bị đơ. Chắc khóa học này khó quá với mình.',
    options: [
      {
        id: 'a',
        textEn: 'Three weeks is nothing. Just memorize more grammar rules.',
        textVi: '3 tuần đã ăn thua gì. Về học thuộc thêm ngữ pháp đi.',
        tone: 'Gây nản lòng',
        isBest: false,
        explanationVi: 'Hạ thấp nỗ lực của người học và khuyên học vẹt khiến họ dễ bỏ cuộc.',
      },
      {
        id: 'b',
        textEn: 'It is completely normal to feel that way after three weeks—real meetings move fast! Let’s focus on five core meeting phrases this week and practice them in 10-minute roleplays so you feel confident right away.',
        textVi: 'Cảm giác đó sau 3 tuần là hoàn toàn bình thường vì họp thật nói rất nhanh! Tuần này mình hãy tập trung đúng 5 mẫu câu họp cốt lõi và luyện hội thoại 10 phút mỗi ngày để bạn tự tin ngay nhé.',
        tone: 'Động viên & chia nhỏ mục tiêu thực tế',
        isBest: true,
        explanationVi: 'Công nhận cảm xúc, giải tỏa áp lực và đưa ra kế hoạch nhỏ khả thi ngay lập tức.',
      },
      {
        id: 'c',
        textEn: 'You are right, maybe you should stop and try again next year.',
        textVi: 'Đúng rồi đấy, hay bạn tạm nghỉ sang năm học lại nhé.',
        tone: 'Thiếu hỗ trợ sư phạm',
        isBest: false,
        explanationVi: 'Không giúp học viên tìm ra nguyên nhân hay phương pháp phù hợp.',
      },
    ],
  },
  // 10. Đời sống & Giao tiếp
  {
    id: 'wc-10',
    industry: 'Đời sống & Giao tiếp',
    level: 'A2',
    title: 'Bạn lỡ quên trả lời tin nhắn quan trọng của đồng nghiệp suốt cả buổi sáng',
    scenarioVi: 'Đến 2 giờ chiều bạn mới thấy tin nhắn hỏi tài liệu từ đồng nghiệp gửi lúc 9 giờ sáng.',
    promptEn: 'Hey, did you get a chance to see my message this morning? I need the slide deck soon.',
    promptVi: 'Này, sáng nay bạn xem tin nhắn của mình chưa? Mình sắp cần bộ slide rồi.',
    options: [
      {
        id: 'a',
        textEn: 'Why didn’t you call me if it was urgent?',
        textVi: 'Nếu gấp sao bạn không gọi điện luôn đi?',
        tone: 'Đổ lỗi ngược',
        isBest: false,
        explanationVi: 'Đổ lỗi cho người hỏi khiến không khí làm việc căng thẳng.',
      },
      {
        id: 'b',
        textEn: 'So sorry for the late reply—I missed your ping during my morning meetings! Here is the slide deck link right now; please let me know if you need any quick edits.',
        textVi: 'Xin lỗi bạn nhiều vì trả lời muộn—mình bị sót tin nhắn lúc họp sáng nay! Gửi bạn ngay link bộ slide đây nhé; cần chỉnh nhanh chỗ nào cứ nhắn mình liền nha.',
        tone: 'Lịch sự, nhận lỗi nhanh & giải quyết ngay',
        isBest: true,
        explanationVi: 'Xin lỗi ngắn gọn, đưa ngay thứ đồng nghiệp cần (link slide) và sẵn sàng hỗ trợ tiếp.',
      },
      {
        id: 'c',
        textEn: 'Seen. Will check later.',
        textVi: 'Đã xem. Để lúc khác kiểm tra.',
        tone: 'Quá cộc lốc, thiếu tôn trọng',
        isBest: false,
        explanationVi: 'Trả lời cộc lốc khi người khác đang cần gấp gây mất điểm trong giao tiếp công sở.',
      },
    ],
  },
  // 11. Văn phòng & Email (Extra)
  {
    id: 'wc-11',
    industry: 'Văn phòng & Email',
    level: 'B1',
    title: 'Bạn phát hiện bản thân lỡ quên bật mic hoặc chia sẻ nhầm màn hình khi họp Zoom',
    scenarioVi: 'Trong cuộc họp với đối tác nước ngoài, đồng nghiệp nhắc bạn đang bị tắt tiếng (muted) hoặc màn hình chưa hiển thị slide.',
    promptEn: 'Sorry, we cannot see your slides yet, and your audio cut out for a second.',
    promptVi: 'Xin lỗi, bên mình vẫn chưa thấy slide của bạn và âm thanh vừa bị mất một chút.',
    options: [
      {
        id: 'a',
        textEn: 'Wait, why is Zoom always so bad? Hold on!',
        textVi: 'Ủa sao Zoom cứ dở chứng hoài vậy? Đợi tí!',
        tone: 'Mất bình tĩnh trước đối tác',
        isBest: false,
        explanationVi: 'Than vãn về công cụ trước mặt đối tác làm giảm tính chuyên nghiệp của buổi họp.',
      },
      {
        id: 'b',
        textEn: 'Thanks for letting me know! Let me re-share my screen right now—can you hear me clearly and see the first slide now?',
        textVi: 'Cảm ơn anh/chị đã báo giúp! Để em chia sẻ lại màn hình ngay đây—mọi người đã nghe rõ và thấy slide đầu tiên chưa ạ?',
        tone: 'Bình tĩnh, tự tin & kiểm tra xác nhận',
        isBest: true,
        explanationVi: 'Xử lý sự cố họp online cực kỳ gọn ghẽ, chuyên nghiệp và xác nhận lại hai chiều.',
      },
      {
        id: 'c',
        textEn: 'Let’s cancel the meeting and send the PDF later.',
        textVi: 'Thôi hủy cuộc họp đi rồi lát gửi file PDF sau.',
        tone: 'Bỏ cuộc quá sớm',
        isBest: false,
        explanationVi: 'Sự cố nhỏ chia sẻ màn hình có thể sửa trong 5 giây, không nên hủy họp.',
      },
    ],
  },
  // 12. IT / Kỹ thuật (Extra)
  {
    id: 'wc-12',
    industry: 'IT / Kỹ thuật',
    level: 'B2',
    title: 'Product Manager hỏi ước lượng thời gian (Estimate) cho một tính năng mới chưa rõ yêu cầu',
    scenarioVi: 'Trong buổi họp Sprint Planning, PM muốn bạn chốt ngay ngày hoàn thành một tính năng tích hợp bên thứ 3 mà bạn chưa từng xem tài liệu API.',
    promptEn: 'Can your team finish the third-party payment integration by this Friday?',
    promptVi: 'Team bạn có làm xong tích hợp cổng thanh toán bên thứ 3 trước thứ Sáu này không?',
    options: [
      {
        id: 'a',
        textEn: 'Sure, Friday is easy!',
        textVi: 'Được chứ, thứ Sáu dễ ợt!',
        tone: 'Chủ quan, rủi ro trễ hạn cao',
        isBest: false,
        explanationVi: 'Cam kết khi chưa đọc tài liệu kỹ thuật rất dễ dẫn đến vỡ tiến độ và làm việc quá giờ.',
      },
      {
        id: 'b',
        textEn: 'I want to give you an accurate estimate rather than guess. Could I spend two hours reviewing their API docs today and confirm a realistic timeline by 4 PM?',
        textVi: 'Tôi muốn đưa ra ước lượng chính xác thay vì đoán mò. Cho tôi 2 tiếng đọc tài liệu API của họ hôm nay và xác nhận mốc thời gian khả thi trước 4 giờ chiều được không?',
        tone: 'Chuyên nghiệp, quản trị rủi ro tốt',
        isBest: true,
        explanationVi: 'Thể hiện trách nhiệm kỹ thuật: không hứa suông, xin thời gian ngắn hợp lý để khảo sát và cam kết giờ trả lời rõ ràng.',
      },
      {
        id: 'c',
        textEn: 'Ask the third-party vendor, not me.',
        textVi: 'Đi mà hỏi bên thứ 3 ấy, đừng hỏi tôi.',
        tone: 'Thoái thác trách nhiệm',
        isBest: false,
        explanationVi: 'Thiếu tinh thần đồng đội và không giải quyết bài toán của sản phẩm.',
      },
    ],
  },
];

export const WORKPLACE_MEETING_PHRASES: WorkplaceMeetingPhrase[] = [
  ...BASE_WORKPLACE_MEETING_PHRASES,
  ...WORKPLACE_MEETING_EXTRA,
];

export const WORKPLACE_EMAIL_TEMPLATES: WorkplaceEmailTemplate[] = [
  ...BASE_WORKPLACE_EMAIL_TEMPLATES,
  ...WORKPLACE_EMAIL_EXTRA,
];

export const WORKPLACE_STAR_QUESTIONS: WorkplaceStarQuestion[] = [
  ...BASE_WORKPLACE_STAR_QUESTIONS,
  ...WORKPLACE_STAR_EXTRA,
];

export const WORKPLACE_CASE_SITUATIONS: WorkplaceCaseSituation[] = [
  ...BASE_WORKPLACE_CASE_SITUATIONS,
  ...WORKPLACE_CASE_EXTRA,
];

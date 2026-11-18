import { AWL_WORDS_EXTRA } from './awlExtra';
import { AWL_WORDS_EXTRA_2, AWL_DRILLS } from './awlExtra2';
import { ACADEMIC_ABSTRACTS_EXTRA, ACADEMIC_WRITING_EXTRA } from './academicExtra';
import {
  ACADEMIC_WRITING_EXTRA_2,
  PRESENTATION_PHRASES_EXTRA,
  SEMINAR_PHRASES_EXTRA,
  GRADUATION_QUIZ_EXTRA,
} from './academicExtra2';
export { AWL_DRILLS };

export type AwlDomain =
  | 'Nghiên cứu & Phân tích'
  | 'Kinh tế & Quản trị'
  | 'Công nghệ & Kỹ thuật'
  | 'Xã hội & Giáo dục'
  | 'Lập luận & Học thuật';

export const AWL_DOMAINS: AwlDomain[] = [
  'Nghiên cứu & Phân tích',
  'Kinh tế & Quản trị',
  'Công nghệ & Kỹ thuật',
  'Xã hội & Giáo dục',
  'Lập luận & Học thuật',
];

export interface AwlWordItem {
  id: string;
  word: string;
  pos: string;
  ipa: string;
  ipaUK: string;
  syllables: string[];
  stressIndex: number;
  vietPhonetic: string;
  phonicsRule: string;
  level: 'B1' | 'B2' | 'C1';
  domain: AwlDomain;
  meaningVi: string;
  collocations: string[];
  wordFamily: string[];
  academicExampleEn: string;
  academicExampleVi: string;
  mnemonic: string;
}

const BASE_AWL_WORDS: AwlWordItem[] = [
  // =========================================================
  // 1. NGHIÊN CỨU & PHÂN TÍCH (10 từ)
  // =========================================================
  {
    id: 'awl-analyze',
    word: 'analyze',
    pos: 'v',
    ipa: '/ˈæn.ə.laɪz/',
    ipaUK: '/ˈæn.əl.aɪz/',
    syllables: ['an', 'a', 'lyze'],
    stressIndex: 0,
    vietPhonetic: 'Á-nờ-lai-z',
    phonicsRule: 'Trọng âm rơi vào âm tiết đầu; đuôi "-yze" đọc là /aɪz/.',
    level: 'B1',
    domain: 'Nghiên cứu & Phân tích',
    meaningVi: 'phân tích, mổ xẻ chi tiết dữ liệu hoặc vấn đề',
    collocations: ['analyze data', 'analyze the findings', 'critically analyze'],
    wordFamily: ['analysis (n)', 'analyst (n)', 'analytical (adj)', 'analytically (adv)'],
    academicExampleEn: 'Researchers carefully analyze survey data before drawing any conclusions.',
    academicExampleVi: 'Các nhà nghiên cứu phân tích kỹ lưỡng dữ liệu khảo sát trước khi rút ra bất kỳ kết luận nào.',
    mnemonic: 'A-na-lyze = tách từng mảnh ("lyse") ra để xem xét.',
  },
  {
    id: 'awl-hypothesis',
    word: 'hypothesis',
    pos: 'n',
    ipa: '/haɪˈpɑː.θə.sɪs/',
    ipaUK: '/haɪˈpɒθ.ə.sɪs/',
    syllables: ['hy', 'poth', 'e', 'sis'],
    stressIndex: 1,
    vietPhonetic: 'hai-PÓT-thờ-xịt-x',
    phonicsRule: 'Chữ "th" vô thanh (/θ/) đặt đầu lưỡi giữa hai hàm răng; trọng âm ở âm tiết thứ 2.',
    level: 'B2',
    domain: 'Nghiên cứu & Phân tích',
    meaningVi: 'giả thuyết nghiên cứu (cần kiểm chứng bằng thực nghiệm)',
    collocations: ['test a hypothesis', 'formulate a hypothesis', 'null hypothesis'],
    wordFamily: ['hypothesize (v)', 'hypothetical (adj)', 'hypothetically (adv)'],
    academicExampleEn: 'The experiment was designed to test the hypothesis that sleep deprivation impairs memory.',
    academicExampleVi: 'Thí nghiệm được thiết kế để kiểm chứng giả thuyết rằng thiếu ngủ làm suy giảm trí nhớ.',
    mnemonic: 'Hypo- (dưới/chưa chắc) + thesis (luận điểm) = luận điểm tạm thời chờ chứng minh.',
  },
  {
    id: 'awl-methodology',
    word: 'methodology',
    pos: 'n',
    ipa: '/ˌmeθ.əˈdɑː.lə.dʒi/',
    ipaUK: '/ˌmeθ.əˈdɒl.ə.dʒi/',
    syllables: ['meth', 'od', 'ol', 'o', 'gy'],
    stressIndex: 2,
    vietPhonetic: 'me-thờ-ĐÓ-lờ-gi',
    phonicsRule: 'Từ có đuôi "-ology" luôn nhấn trọng âm ngay trước nó ("-ol-").',
    level: 'C1',
    domain: 'Nghiên cứu & Phân tích',
    meaningVi: 'phương pháp luận, hệ thống phương pháp nghiên cứu',
    collocations: ['research methodology', 'qualitative methodology', 'adopt a methodology'],
    wordFamily: ['method (n)', 'methodological (adj)', 'methodically (adv)'],
    academicExampleEn: 'Chapter three outlines the quantitative methodology used in this longitudinal study.',
    academicExampleVi: 'Chương ba trình bày khái quát phương pháp luận định lượng được sử dụng trong nghiên cứu dài hạn này.',
    mnemonic: 'Method (phương pháp) + -ology (khoa học/học thuyết) = khoa học về phương pháp nghiên cứu.',
  },
  {
    id: 'awl-empirical',
    word: 'empirical',
    pos: 'adj',
    ipa: '/ɪmˈpɪr.ɪ.kəl/',
    ipaUK: '/ɪmˈpɪr.ɪ.kəl/',
    syllables: ['em', 'pir', 'i', 'cal'],
    stressIndex: 1,
    vietPhonetic: 'im-PÍ-ri-cồl',
    phonicsRule: 'Đuôi "-ical" kéo trọng âm rơi vào âm tiết ngay trước nó ("pir").',
    level: 'C1',
    domain: 'Nghiên cứu & Phân tích',
    meaningVi: 'mang tính thực nghiệm, dựa trên quan sát và số liệu thực tế',
    collocations: ['empirical evidence', 'empirical study', 'empirical data'],
    wordFamily: ['empirically (adv)', 'empiricism (n)', 'empiricist (n)'],
    academicExampleEn: 'Without empirical evidence, theoretical claims remain purely speculative.',
    academicExampleVi: 'Nếu không có bằng chứng thực nghiệm, các tuyên bố lý thuyết vẫn chỉ dừng ở mức suy đoán.',
    mnemonic: 'Em-piri-cal: liên tưởng "experience" (trải nghiệm thực tế, không chỉ trên giấy).',
  },
  {
    id: 'awl-correlate',
    word: 'correlate',
    pos: 'v',
    ipa: '/ˈkɔːr.ə.leɪt/',
    ipaUK: '/ˈkɒr.ə.leɪt/',
    syllables: ['cor', 're', 'late'],
    stressIndex: 0,
    vietPhonetic: 'KO-rờ-lết',
    phonicsRule: 'Tiền tố "cor-" kết hợp "relate"; động từ nhấn âm 1 hoặc âm 3, chuẩn Mỹ phổ biến nhấn âm 1.',
    level: 'C1',
    domain: 'Nghiên cứu & Phân tích',
    meaningVi: 'có mối tương quan, liên hệ mật thiết với nhau',
    collocations: ['correlate strongly with', 'positively correlated', 'statistical correlation'],
    wordFamily: ['correlation (n)', 'correlative (adj)'],
    academicExampleEn: 'Higher study hours often correlate positively with improved academic performance.',
    academicExampleVi: 'Số giờ tự học nhiều hơn thường có tương quan thuận với kết quả học tập tốt hơn.',
    mnemonic: 'Cor- (cùng nhau) + relate (liên hệ) = hai biến số thay đổi liên hệ cùng nhau.',
  },
  {
    id: 'awl-variable',
    word: 'variable',
    pos: 'n',
    ipa: '/ˈver.i.ə.bəl/',
    ipaUK: '/ˈveə.ri.ə.bəl/',
    syllables: ['var', 'i', 'a', 'ble'],
    stressIndex: 0,
    vietPhonetic: 'VE-ri-ờ-bồl',
    phonicsRule: 'Âm đầu /ˈver/ (US) hay /ˈveə/ (UK); đuôi "-ble" đọc nhẹ /bəl/.',
    level: 'B2',
    domain: 'Nghiên cứu & Phân tích',
    meaningVi: 'biến số; yếu tố có thể thay đổi',
    collocations: ['independent variable', 'dependent variable', 'control for variables'],
    wordFamily: ['vary (v)', 'variation (n)', 'variability (n)', 'invariably (adv)'],
    academicExampleEn: 'Researchers must control external variables to ensure valid experimental results.',
    academicExampleVi: 'Các nhà nghiên cứu phải kiểm soát các biến ngoại lai để đảm bảo kết quả thí nghiệm hợp lệ.',
    mnemonic: 'Vary (thay đổi) + -able (có thể) = đại lượng có thể biến đổi (biến số).',
  },
  {
    id: 'awl-evaluate',
    word: 'evaluate',
    pos: 'v',
    ipa: '/ɪˈvæl.ju.eɪt/',
    ipaUK: '/ɪˈvæl.ju.eɪt/',
    syllables: ['e', 'val', 'u', 'ate'],
    stressIndex: 1,
    vietPhonetic: 'i-VÉO-liu-ết',
    phonicsRule: 'Động từ đuôi "-ate" có 3+ âm tiết thường nhấn trọng âm ở âm tiết thứ 3 từ cuối lên ("val").',
    level: 'B2',
    domain: 'Nghiên cứu & Phân tích',
    meaningVi: 'đánh giá, thẩm định giá trị hoặc hiệu quả',
    collocations: ['evaluate the effectiveness', 'critically evaluate', 'evaluation criteria'],
    wordFamily: ['evaluation (n)', 'evaluative (adj)', 'evaluator (n)'],
    academicExampleEn: 'The committee will evaluate each research proposal based on originality and feasibility.',
    academicExampleVi: 'Hội đồng sẽ đánh giá từng đề cương nghiên cứu dựa trên tính mới và tính khả thi.',
    mnemonic: 'E-value-ate: rút ra "value" (giá trị) của một sự vật = đánh giá.',
  },
  {
    id: 'awl-synthesize',
    word: 'synthesize',
    pos: 'v',
    ipa: '/ˈsɪn.θə.saɪz/',
    ipaUK: '/ˈsɪn.θə.saɪz/',
    syllables: ['syn', 'the', 'size'],
    stressIndex: 0,
    vietPhonetic: 'XIN-thờ-xai-z',
    phonicsRule: 'Âm /θ/ ở giữa từ không rung cổ họng; đuôi "-ize" đọc là /aɪz/.',
    level: 'C1',
    domain: 'Nghiên cứu & Phân tích',
    meaningVi: 'tổng hợp, kết hợp nhiều nguồn thông tin thành chỉnh thể mới',
    collocations: ['synthesize findings', 'synthesize information', 'literature synthesis'],
    wordFamily: ['synthesis (n)', 'synthetic (adj)', 'synthetically (adv)'],
    academicExampleEn: 'A strong literature review does not merely summarize sources; it synthesizes them.',
    academicExampleVi: 'Một phần tổng quan tài liệu tốt không chỉ tóm tắt từng nguồn mà còn tổng hợp kết nối chúng lại.',
    mnemonic: 'Syn- (gộp chung) + thesis (luận điểm) = tổng hợp nhiều ý thành luận điểm chung.',
  },
  {
    id: 'awl-phenomenon',
    word: 'phenomenon',
    pos: 'n',
    ipa: '/fəˈnɑː.mə.nən/',
    ipaUK: '/fəˈnɒm.ɪ.nən/',
    syllables: ['phe', 'nom', 'e', 'non'],
    stressIndex: 1,
    vietPhonetic: 'phờ-NÓ-mơ-nần',
    phonicsRule: 'Cụm "ph" luôn đọc là /f/; số nhiều bất quy tắc là "phenomena".',
    level: 'B2',
    domain: 'Nghiên cứu & Phân tích',
    meaningVi: 'hiện tượng (tự nhiên, xã hội hoặc tâm lý)',
    collocations: ['social phenomenon', 'widespread phenomenon', 'observe a phenomenon'],
    wordFamily: ['phenomena (plural n)', 'phenomenal (adj)', 'phenomenally (adv)'],
    academicExampleEn: 'Remote work has evolved from a temporary measure into a global economic phenomenon.',
    academicExampleVi: 'Làm việc từ xa đã phát triển từ một biện pháp tạm thời thành một hiện tượng kinh tế toàn cầu.',
    mnemonic: 'Số ít "-on" (phenomenon), số nhiều "-a" (phenomena) giống criterion -> criteria.',
  },
  {
    id: 'awl-validity',
    word: 'validity',
    pos: 'n',
    ipa: '/vəˈlɪd.ə.ti/',
    ipaUK: '/vəˈlɪd.ə.ti/',
    syllables: ['va', 'lid', 'i', 'ty'],
    stressIndex: 1,
    vietPhonetic: 'vờ-LÍ-đờ-ti',
    phonicsRule: 'Từ có đuôi "-ity" luôn nhấn trọng âm vào âm tiết ngay trước nó ("lid").',
    level: 'C1',
    domain: 'Nghiên cứu & Phân tích',
    meaningVi: 'tính hợp lệ, độ giá trị, tính xác đáng của nghiên cứu/lập luận',
    collocations: ['internal validity', 'external validity', 'question the validity of'],
    wordFamily: ['valid (adj)', 'validate (v)', 'validation (n)', 'invalid (adj)'],
    academicExampleEn: 'A small sample size may threaten the external validity of the survey findings.',
    academicExampleVi: 'Cỡ mẫu quá nhỏ có thể đe dọa tính giá trị ngoại suy của kết quả khảo sát.',
    mnemonic: 'Valid (hợp lệ) + -ity (danh từ hóa) = độ tin cậy/tính hợp lệ.',
  },

  // =========================================================
  // 2. KINH TẾ & QUẢN TRỊ (10 từ)
  // =========================================================
  {
    id: 'awl-allocate',
    word: 'allocate',
    pos: 'v',
    ipa: '/ˈæl.ə.keɪt/',
    ipaUK: '/ˈæl.ə.keɪt/',
    syllables: ['al', 'lo', 'cate'],
    stressIndex: 0,
    vietPhonetic: 'Á-lờ-kết',
    phonicsRule: 'Trọng âm rơi vào âm tiết đầu; chữ "c" trước "a" đọc cứng là /k/.',
    level: 'B2',
    domain: 'Kinh tế & Quản trị',
    meaningVi: 'phân bổ, cấp phát (ngân sách, nguồn lực, thời gian)',
    collocations: ['allocate resources', 'allocate funds to', 'resource allocation'],
    wordFamily: ['allocation (n)', 'reallocate (v)', 'allocative (adj)'],
    academicExampleEn: 'Universities must allocate sufficient funding to laboratory equipment and student scholarships.',
    academicExampleVi: 'Các trường đại học cần phân bổ đủ ngân sách cho trang thiết bị phòng thí nghiệm và học bổng sinh viên.',
    mnemonic: 'Al- (tới) + locate (vị trí) = đặt nguồn lực vào đúng vị trí cần thiết.',
  },
  {
    id: 'awl-revenue',
    word: 'revenue',
    pos: 'n',
    ipa: '/ˈrev.ə.nuː/',
    ipaUK: '/ˈrev.ə.njuː/',
    syllables: ['rev', 'e', 'nue'],
    stressIndex: 0,
    vietPhonetic: 'RÉ-vơ-niu',
    phonicsRule: 'Trọng âm rơi vào âm tiết đầu; âm cuối đọc /nuː/ (US) hoặc /njuː/ (UK).',
    level: 'B2',
    domain: 'Kinh tế & Quản trị',
    meaningVi: 'doanh thu, nguồn thu (của doanh nghiệp hoặc chính phủ)',
    collocations: ['generate revenue', 'annual revenue', 'tax revenue'],
    wordFamily: ['revenues (plural n)'],
    academicExampleEn: 'Digital subscription models helped the media firm diversify its annual revenue streams.',
    academicExampleVi: 'Mô hình đăng ký trả phí kỹ thuật số đã giúp công ty truyền thông đa dạng hóa các nguồn doanh thu hàng năm.',
    mnemonic: 'Re- (trở lại) + venue (đến) = dòng tiền chảy về công ty.',
  },
  {
    id: 'awl-fluctuate',
    word: 'fluctuate',
    pos: 'v',
    ipa: '/ˈflʌk.tʃu.eɪt/',
    ipaUK: '/ˈflʌk.tʃu.eɪt/',
    syllables: ['fluc', 'tu', 'ate'],
    stressIndex: 0,
    vietPhonetic: 'FLẮC-chu-ết',
    phonicsRule: 'Cụm "tu" trước nguyên âm trong từ này đọc là /tʃu/; nhấn âm tiết đầu.',
    level: 'B2',
    domain: 'Kinh tế & Quản trị',
    meaningVi: 'dao động, biến động lên xuống liên tục (giá cả, tỷ giá)',
    collocations: ['fluctuate wildly', 'fluctuate between', 'price fluctuations'],
    wordFamily: ['fluctuation (n)', 'fluctuating (adj)'],
    academicExampleEn: 'Global commodity prices tend to fluctuate sharply during periods of geopolitical instability.',
    academicExampleVi: 'Giá hàng hóa toàn cầu có xu hướng biến động mạnh trong các giai đoạn bất ổn địa chính trị.',
    mnemonic: 'Fluctu- (sóng) = lên xuống nhấp nhô như con sóng trên biểu đồ.',
  },
  {
    id: 'awl-incentive',
    word: 'incentive',
    pos: 'n',
    ipa: '/ɪnˈsen.tɪv/',
    ipaUK: '/ɪnˈsen.tɪv/',
    syllables: ['in', 'cen', 'tive'],
    stressIndex: 1,
    vietPhonetic: 'in-XEN-tiv',
    phonicsRule: 'Chữ "c" đứng trước "e" đọc nhẹ thành /s/; đuôi "-ive" luôn đọc /ɪv/ không nhấn.',
    level: 'B2',
    domain: 'Kinh tế & Quản trị',
    meaningVi: 'động lực, chính sách khuyến khích / ưu đãi',
    collocations: ['financial incentive', 'provide an incentive', 'tax incentives'],
    wordFamily: ['incentivize (v)', 'disincentive (n)'],
    academicExampleEn: 'Performance bonuses serve as a strong financial incentive for employees to exceed quarterly targets.',
    academicExampleVi: 'Tiền thưởng hiệu suất đóng vai trò là động lực tài chính mạnh mẽ để nhân viên vượt chỉ tiêu quý.',
    mnemonic: 'In-cent-ive: thêm vài "cent" (tiền) để tạo động lực làm việc.',
  },
  {
    id: 'awl-sustainable',
    word: 'sustainable',
    pos: 'adj',
    ipa: '/səˈsteɪ.nə.bəl/',
    ipaUK: '/səˈsteɪ.nə.bəl/',
    syllables: ['sus', 'tain', 'a', 'ble'],
    stressIndex: 1,
    vietPhonetic: 'xờ-XTÂY-nờ-bồl',
    phonicsRule: 'Âm "sus-" đọc lướt /sə/; trọng âm rơi vào "-tain-" đọc là /teɪn/.',
    level: 'B2',
    domain: 'Kinh tế & Quản trị',
    meaningVi: 'bền vững, có thể duy trì lâu dài mà không làm cạn kiệt tài nguyên',
    collocations: ['sustainable development', 'environmentally sustainable', 'sustainable growth'],
    wordFamily: ['sustain (v)', 'sustainability (n)', 'unsustainable (adj)'],
    academicExampleEn: 'Businesses are increasingly adopting sustainable supply chains to reduce carbon emissions.',
    academicExampleVi: 'Các doanh nghiệp đang ngày càng áp dụng chuỗi cung ứng bền vững để giảm lượng khí thải carbon.',
    mnemonic: 'Sustain (duy trì) + -able (có thể) = có thể giữ vững lâu dài.',
  },
  {
    id: 'awl-inflation',
    word: 'inflation',
    pos: 'n',
    ipa: '/ɪnˈfleɪ.ʃən/',
    ipaUK: '/ɪnˈfleɪ.ʃən/',
    syllables: ['in', 'fla', 'tion'],
    stressIndex: 1,
    vietPhonetic: 'in-FLÂY-sần',
    phonicsRule: 'Đuôi "-tion" đọc là /ʃən/ và kéo trọng âm rơi vào âm tiết ngay trước nó ("fla").',
    level: 'B2',
    domain: 'Kinh tế & Quản trị',
    meaningVi: 'lạm phát (mức giá chung tăng làm giảm sức mua của tiền tệ)',
    collocations: ['curb inflation', 'inflation rate', 'rising inflation'],
    wordFamily: ['inflate (v)', 'inflationary (adj)', 'deflation (n)'],
    academicExampleEn: 'Central banks often raise interest rates to curb persistent inflation.',
    academicExampleVi: 'Các ngân hàng trung ương thường tăng lãi suất để kiềm chế lạm phát kéo dài.',
    mnemonic: 'Inflate (thổi phồng) = giá cả bị thổi phồng lên.',
  },
  {
    id: 'awl-commodity',
    word: 'commodity',
    pos: 'n',
    ipa: '/kəˈmɑː.də.ti/',
    ipaUK: '/kəˈmɒd.ə.ti/',
    syllables: ['com', 'mod', 'i', 'ty'],
    stressIndex: 1,
    vietPhonetic: 'cơ-MÓ-đờ-ti',
    phonicsRule: 'Đuôi "-ity" kéo trọng âm vào "-mod-"; âm đầu "com-" đọc lướt /kə/.',
    level: 'C1',
    domain: 'Kinh tế & Quản trị',
    meaningVi: 'hàng hóa, mặt hàng giao dịch (nông sản, kim loại, năng lượng)',
    collocations: ['agricultural commodity', 'commodity market', 'scarce commodity'],
    wordFamily: ['commodities (plural n)', 'commodify (v)', 'commodification (n)'],
    academicExampleEn: 'Coffee and rice remain vital export commodities for several Southeast Asian economies.',
    academicExampleVi: 'Cà phê và gạo vẫn là những mặt hàng xuất khẩu thiết yếu của nhiều nền kinh tế Đông Nam Á.',
    mnemonic: 'Com-mod-ity: những món hàng hóa thiết yếu mua bán trên sàn giao dịch.',
  },
  {
    id: 'awl-strategic',
    word: 'strategic',
    pos: 'adj',
    ipa: '/strəˈtiː.dʒɪk/',
    ipaUK: '/strəˈtiː.dʒɪk/',
    syllables: ['stra', 'te', 'gic'],
    stressIndex: 1,
    vietPhonetic: 'xtrờ-TI-jịc',
    phonicsRule: 'Từ đuôi "-ic" luôn nhấn trọng âm ngay trước nó ("te"); lưu ý danh từ "strategy" nhấn âm 1.',
    level: 'B1',
    domain: 'Kinh tế & Quản trị',
    meaningVi: 'mang tính chiến lược, dài hạn và có tầm ảnh hưởng lớn',
    collocations: ['strategic planning', 'strategic partnership', 'strategic advantage'],
    wordFamily: ['strategy (n)', 'strategist (n)', 'strategically (adv)'],
    academicExampleEn: 'Forming a strategic partnership allowed the startup to enter international markets faster.',
    academicExampleVi: 'Việc thiết lập quan hệ đối tác chiến lược đã giúp công ty khởi nghiệp thâm nhập thị trường quốc tế nhanh hơn.',
    mnemonic: 'Strategy (nhấn 1) -> Strategic (nhấn 2 trước "-ic").',
  },
  {
    id: 'awl-acquisition',
    word: 'acquisition',
    pos: 'n',
    ipa: '/ˌæk.wɪˈzɪʃ.ən/',
    ipaUK: '/ˌæk.wɪˈzɪʃ.ən/',
    syllables: ['ac', 'qui', 'si', 'tion'],
    stressIndex: 2,
    vietPhonetic: 'ắc-qui-DI-sần',
    phonicsRule: 'Cụm "qu" đọc là /kw/; đuôi "-tion" kéo trọng âm vào âm tiết "-si-" ngay trước nó.',
    level: 'C1',
    domain: 'Kinh tế & Quản trị',
    meaningVi: 'sự thu nhận, mua lại (doanh nghiệp M&A) hoặc tiếp thu (kiến thức/ngôn ngữ)',
    collocations: ['mergers and acquisitions', 'talent acquisition', 'language acquisition'],
    wordFamily: ['acquire (v)', 'acquired (adj)', 'acquisitive (adj)'],
    academicExampleEn: 'The acquisition of the logistics startup expanded the conglomerate’s delivery network.',
    academicExampleVi: 'Thương vụ mua lại công ty khởi nghiệp logistics đã mở rộng mạng lưới giao vận của tập đoàn.',
    mnemonic: 'Acquire (có được) -> Acquisition (việc thâu tóm / tiếp thu).',
  },
  {
    id: 'awl-productivity',
    word: 'productivity',
    pos: 'n',
    ipa: '/ˌproʊ.dʌkˈtɪv.ə.ti/',
    ipaUK: '/ˌprɒd.ʌkˈtɪv.ə.ti/',
    syllables: ['pro', 'duc', 'tiv', 'i', 'ty'],
    stressIndex: 2,
    vietPhonetic: 'prô-đắc-TÍ-vơ-ti',
    phonicsRule: 'Đuôi "-ity" kéo trọng âm rơi vào âm tiết ngay trước nó ("tiv").',
    level: 'B2',
    domain: 'Kinh tế & Quản trị',
    meaningVi: 'năng suất lao động, hiệu suất tạo ra sản phẩm/giá trị',
    collocations: ['boost productivity', 'labor productivity', 'productivity growth'],
    wordFamily: ['produce (v)', 'product (n)', 'productive (adj)', 'productively (adv)'],
    academicExampleEn: 'Automation tools can significantly boost labor productivity when paired with staff training.',
    academicExampleVi: 'Các công cụ tự động hóa có thể nâng cao đáng kể năng suất lao động khi đi kèm đào tạo nhân sự.',
    mnemonic: 'Product (sản phẩm) -> Productive (năng suất) -> Productivity (tính năng suất).',
  },

  // =========================================================
  // 3. CÔNG NGHỆ & KỸ THUẬT (10 từ)
  // =========================================================
  {
    id: 'awl-algorithm',
    word: 'algorithm',
    pos: 'n',
    ipa: '/ˈæl.ɡə.rɪ.ðəm/',
    ipaUK: '/ˈæl.ɡə.rɪ.ðəm/',
    syllables: ['al', 'go', 'rithm'],
    stressIndex: 0,
    vietPhonetic: 'EO-gơ-ri-đầm',
    phonicsRule: 'Trọng âm rơi vào âm tiết đầu; chữ "th" ở cuối đọc hữu thanh rung cổ họng (/ð/).',
    level: 'B2',
    domain: 'Công nghệ & Kỹ thuật',
    meaningVi: 'thuật toán (tập hợp quy tắc từng bước để máy tính giải quyết bài toán)',
    collocations: ['machine learning algorithm', 'design an algorithm', 'algorithmic bias'],
    wordFamily: ['algorithmic (adj)', 'algorithmically (adv)'],
    academicExampleEn: 'Recommendation algorithms analyze user behavior to personalize content feeds.',
    academicExampleVi: 'Các thuật toán gợi ý phân tích hành vi người dùng để cá nhân hóa bảng tin nội dung.',
    mnemonic: 'Đặt tên theo nhà toán học Ba Tư Al-Khwarizmi -> Algorithm.',
  },
  {
    id: 'awl-automate',
    word: 'automate',
    pos: 'v',
    ipa: '/ˈɔː.tə.meɪt/',
    ipaUK: '/ˈɔː.tə.meɪt/',
    syllables: ['au', 'to', 'mate'],
    stressIndex: 0,
    vietPhonetic: 'O-tơ-mết',
    phonicsRule: 'Cụm "au" đọc là /ɔː/; động từ đuôi "-ate" 3 âm tiết nhấn âm tiết đầu.',
    level: 'B2',
    domain: 'Công nghệ & Kỹ thuật',
    meaningVi: 'tự động hóa (quy trình hoặc tác vụ)',
    collocations: ['automate repetitive tasks', 'fully automated', 'process automation'],
    wordFamily: ['automation (n)', 'automated (adj)', 'automatic (adj)'],
    academicExampleEn: 'Software engineers automate regression testing to detect defects early in development.',
    academicExampleVi: 'Các kỹ sư phần mềm tự động hóa kiểm thử hồi quy để phát hiện lỗi sớm trong quá trình phát triển.',
    mnemonic: 'Auto (tự động) + mate = biến thành tự vận hành.',
  },
  {
    id: 'awl-infrastructure',
    word: 'infrastructure',
    pos: 'n',
    ipa: '/ˈɪn.frə.strʌk.tʃər/',
    ipaUK: '/ˈɪn.frə.strʌk.tʃər/',
    syllables: ['in', 'fra', 'struc', 'ture'],
    stressIndex: 0,
    vietPhonetic: 'IN-frờ-xtrắc-chờ',
    phonicsRule: 'Trọng âm chính nằm ở âm tiết đầu "in-"; đuôi "-ture" đọc là /tʃər/.',
    level: 'B2',
    domain: 'Công nghệ & Kỹ thuật',
    meaningVi: 'cơ sở hạ tầng (mạng lưới giao thông, điện lực, CNTT, đám mây)',
    collocations: ['digital infrastructure', 'cloud infrastructure', 'invest in infrastructure'],
    wordFamily: ['infrastructural (adj)'],
    academicExampleEn: 'Reliable cloud infrastructure is essential for scaling real-time educational platforms.',
    academicExampleVi: 'Hạ tầng đám mây đáng tin cậy là yếu tố thiết yếu để mở rộng các nền tảng giáo dục thời gian thực.',
    mnemonic: 'Infra- (bên dưới/nền móng) + structure (cấu trúc) = cấu trúc nền tảng (hạ tầng).',
  },
  {
    id: 'awl-optimize',
    word: 'optimize',
    pos: 'v',
    ipa: '/ˈɑːp.tə.maɪz/',
    ipaUK: '/ˈɒp.tɪ.maɪz/',
    syllables: ['op', 'ti', 'mize'],
    stressIndex: 0,
    vietPhonetic: 'ÓP-ti-mai-z',
    phonicsRule: 'Trọng âm ở âm tiết đầu; đuôi "-ize" đọc rõ /aɪz/.',
    level: 'B2',
    domain: 'Công nghệ & Kỹ thuật',
    meaningVi: 'tối ưu hóa (làm cho hiệu quả nhất trong giới hạn tài nguyên)',
    collocations: ['optimize performance', 'optimize efficiency', 'search engine optimization'],
    wordFamily: ['optimization (n)', 'optimal (adj)', 'optimally (adv)'],
    academicExampleEn: 'Database indexing helps optimize query response times under heavy traffic.',
    academicExampleVi: 'Đánh chỉ mục cơ sở dữ liệu giúp tối ưu hóa thời gian phản hồi truy vấn khi lưu lượng truy cập cao.',
    mnemonic: 'Optimum (tốt nhất) + -ize (làm cho) = làm cho đạt mức tối ưu.',
  },
  {
    id: 'awl-protocol',
    word: 'protocol',
    pos: 'n',
    ipa: '/ˈproʊ.tə.kɑːl/',
    ipaUK: '/ˈprəʊ.tə.kɒl/',
    syllables: ['pro', 'to', 'col'],
    stressIndex: 0,
    vietPhonetic: 'PRÔ-tờ-kôn',
    phonicsRule: 'Trọng âm rơi vào âm tiết đầu "pro-"; âm cuối /kɑːl/ (US) hoặc /kɒl/ (UK).',
    level: 'C1',
    domain: 'Công nghệ & Kỹ thuật',
    meaningVi: 'giao thức (mạng/truyền thông) hoặc quy trình chuẩn mực chính thức',
    collocations: ['security protocol', 'communication protocol', 'follow strict protocols'],
    wordFamily: ['protocols (plural n)'],
    academicExampleEn: 'Encryption protocols protect sensitive user credentials during data transmission.',
    academicExampleVi: 'Các giao thức mã hóa bảo vệ thông tin xác thực nhạy cảm của người dùng trong quá trình truyền dữ liệu.',
    mnemonic: 'Proto- (đầu tiên/quy ước gốc) = bộ quy ước chuẩn để hai hệ thống giao tiếp với nhau.',
  },
  {
    id: 'awl-simulate',
    word: 'simulate',
    pos: 'v',
    ipa: '/ˈsɪm.jə.leɪt/',
    ipaUK: '/ˈsɪm.jə.leɪt/',
    syllables: ['sim', 'u', 'late'],
    stressIndex: 0,
    vietPhonetic: 'XIM-miu-lết',
    phonicsRule: 'Chữ "u" sau "m" tạo âm lướt /jə/; trọng âm rơi vào âm tiết đầu.',
    level: 'B2',
    domain: 'Công nghệ & Kỹ thuật',
    meaningVi: 'mô phỏng, tái hiện mô hình thực tế trên máy tính/phòng lab',
    collocations: ['simulate real-world conditions', 'computer simulation', 'simulate scenarios'],
    wordFamily: ['simulation (n)', 'simulator (n)', 'simulated (adj)'],
    academicExampleEn: 'Aerospace engineers use wind-tunnel software to simulate extreme flight conditions.',
    academicExampleVi: 'Các kỹ sư hàng không dùng phần mềm hầm gió để mô phỏng những điều kiện bay khắc nghiệt.',
    mnemonic: 'Similar (giống) -> Simulate (làm giả lập giống hệt thực tế để thử nghiệm).',
  },
  {
    id: 'awl-scalable',
    word: 'scalable',
    pos: 'adj',
    ipa: '/ˈskeɪ.lə.bəl/',
    ipaUK: '/ˈskeɪ.lə.bəl/',
    syllables: ['sca', 'la', 'ble'],
    stressIndex: 0,
    vietPhonetic: 'XKÂY-lờ-bồl',
    phonicsRule: 'Cụm "sc-" phát âm /sk/; nguyên âm "a" đọc dài thành âm đôi /eɪ/.',
    level: 'C1',
    domain: 'Công nghệ & Kỹ thuật',
    meaningVi: 'có khả năng mở rộng quy mô linh hoạt (hệ thống, kiến trúc, mô hình)',
    collocations: ['scalable architecture', 'highly scalable', 'scalable solution'],
    wordFamily: ['scale (v, n)', 'scalability (n)'],
    academicExampleEn: 'Microservices allow teams to build scalable applications that handle sudden spikes in demand.',
    academicExampleVi: 'Kiến trúc microservices cho phép các nhóm xây dựng ứng dụng có khả năng mở rộng đáp ứng nhu cầu tăng đột biến.',
    mnemonic: 'Scale (quy mô) + -able (có thể) = có thể tăng/giảm quy mô dễ dàng.',
  },
  {
    id: 'awl-parameter',
    word: 'parameter',
    pos: 'n',
    ipa: '/pəˈræm.ə.tər/',
    ipaUK: '/pəˈræm.ɪ.tər/',
    syllables: ['pa', 'ram', 'e', 'ter'],
    stressIndex: 1,
    vietPhonetic: 'pờ-RAM-mơ-tờ',
    phonicsRule: 'Trọng âm rơi vào âm tiết thứ 2 "-ram-"; âm đầu đọc lướt /pə/.',
    level: 'C1',
    domain: 'Công nghệ & Kỹ thuật',
    meaningVi: 'tham số, thông số giới hạn của mô hình hoặc hệ thống',
    collocations: ['model parameters', 'define parameters', 'within strict parameters'],
    wordFamily: ['parametric (adj)', 'parameterize (v)'],
    academicExampleEn: 'Tuning model parameters is a critical step in training accurate neural networks.',
    academicExampleVi: 'Tinh chỉnh các tham số mô hình là bước then chốt khi huấn luyện mạng nơ-ron chính xác.',
    mnemonic: 'Para- (bên cạnh/giới hạn) + meter (đo lường) = thông số đo giới hạn.',
  },
  {
    id: 'awl-integrate',
    word: 'integrate',
    pos: 'v',
    ipa: '/ˈɪn.tə.ɡreɪt/',
    ipaUK: '/ˈɪn.tɪ.ɡreɪt/',
    syllables: ['in', 'te', 'grate'],
    stressIndex: 0,
    vietPhonetic: 'IN-tờ-grết',
    phonicsRule: 'Trọng âm ở âm tiết đầu; chữ "g" giữ âm cứng /ɡ/.',
    level: 'B2',
    domain: 'Công nghệ & Kỹ thuật',
    meaningVi: 'tích hợp, hợp nhất nhiều thành phần vào một hệ thống chung',
    collocations: ['integrate into', 'seamlessly integrate', 'system integration'],
    wordFamily: ['integration (n)', 'integrated (adj)', 'integral (adj)'],
    academicExampleEn: 'The university aims to integrate AI literacy modules into all undergraduate curricula.',
    academicExampleVi: 'Trường đại học đặt mục tiêu tích hợp các học phần năng lực AI vào toàn bộ chương trình bậc cử nhân.',
    mnemonic: 'Integral (toàn vẹn) -> Integrate (ghép lại thành một khối thống nhất).',
  },
  {
    id: 'awl-innovate',
    word: 'innovate',
    pos: 'v',
    ipa: '/ˈɪn.ə.veɪt/',
    ipaUK: '/ˈɪn.ə.veɪt/',
    syllables: ['in', 'no', 'vate'],
    stressIndex: 0,
    vietPhonetic: 'IN-nờ-vết',
    phonicsRule: 'Trọng âm rơi vào âm tiết đầu "in-"; đuôi "-ate" đọc là /eɪt/.',
    level: 'B1',
    domain: 'Công nghệ & Kỹ thuật',
    meaningVi: 'đổi mới sáng tạo, cải tiến công nghệ hoặc phương pháp',
    collocations: ['innovate continuously', 'technological innovation', 'foster innovation'],
    wordFamily: ['innovation (n)', 'innovative (adj)', 'innovator (n)'],
    academicExampleEn: 'Companies must continually innovate to remain competitive in rapidly evolving industries.',
    academicExampleVi: 'Các doanh nghiệp phải liên tục đổi mới sáng tạo để duy trì sức cạnh tranh trong những ngành biến đổi nhanh.',
    mnemonic: 'In- (vào trong) + nov (mới, như novel) = đưa cái mới vào quy trình.',
  },

  // =========================================================
  // 4. XÃ HỘI & GIÁO DỤC (10 từ)
  // =========================================================
  {
    id: 'awl-curriculum',
    word: 'curriculum',
    pos: 'n',
    ipa: '/kəˈrɪk.jə.ləm/',
    ipaUK: '/kəˈrɪk.jə.ləm/',
    syllables: ['cur', 'ric', 'u', 'lum'],
    stressIndex: 1,
    vietPhonetic: 'cơ-RÍ-kiu-lầm',
    phonicsRule: 'Trọng âm ở âm tiết thứ 2 "-ric-"; số nhiều học thuật là "curricula".',
    level: 'B1',
    domain: 'Xã hội & Giáo dục',
    meaningVi: 'chương trình đào tạo, khung chương trình môn học',
    collocations: ['design a curriculum', 'national curriculum', 'extracurricular activities'],
    wordFamily: ['curricula (plural n)', 'curricular (adj)'],
    academicExampleEn: 'A modern higher education curriculum increasingly emphasizes interdisciplinary problem-solving.',
    academicExampleVi: 'Một chương trình giáo dục đại học hiện đại ngày càng nhấn mạnh khả năng giải quyết vấn đề liên ngành.',
    mnemonic: 'Curri- (đường chạy/lộ trình) = lộ trình các môn học cần hoàn thành để tốt nghiệp.',
  },
  {
    id: 'awl-demographic',
    word: 'demographic',
    pos: 'adj',
    ipa: '/ˌdem.əˈɡræf.ɪk/',
    ipaUK: '/ˌdem.əˈɡræf.ɪk/',
    syllables: ['dem', 'o', 'graph', 'ic'],
    stressIndex: 2,
    vietPhonetic: 'đe-mơ-GRÁ-fịc',
    phonicsRule: 'Đuôi "-ic" luôn kéo trọng âm chính rơi vào âm tiết ngay trước nó ("graph").',
    level: 'C1',
    domain: 'Xã hội & Giáo dục',
    meaningVi: 'thuộc về nhân khẩu học (độ tuổi, giới tính, dân số)',
    collocations: ['demographic shift', 'demographic profile', 'aging demographic'],
    wordFamily: ['demographics (n)', 'demography (n)', 'demographer (n)'],
    academicExampleEn: 'Rapid demographic shifts are reshaping pension policies and university enrollment trends.',
    academicExampleVi: 'Những chuyển dịch nhân khẩu học nhanh chóng đang định hình lại chính sách hưu trí và xu hướng tuyển sinh đại học.',
    mnemonic: 'Demo- (dân cư) + graph (ghi chép/biểu đồ) = thống kê đặc điểm dân cư.',
  },
  {
    id: 'awl-disparity',
    word: 'disparity',
    pos: 'n',
    ipa: '/dɪˈspær.ə.ti/',
    ipaUK: '/dɪˈspær.ə.ti/',
    syllables: ['dis', 'par', 'i', 'ty'],
    stressIndex: 1,
    vietPhonetic: 'đị-XPÁ-rơ-ti',
    phonicsRule: 'Đuôi "-ity" kéo trọng âm vào "-par-"; phân biệt nghĩa bất bình đẳng lớn.',
    level: 'C1',
    domain: 'Xã hội & Giáo dục',
    meaningVi: 'sự chênh lệch, bất bình đẳng rõ rệt (thu nhập, tiếp cận giáo dục)',
    collocations: ['income disparity', 'bridge the disparity', 'regional disparities'],
    wordFamily: ['disparate (adj)', 'parity (n)'],
    academicExampleEn: 'Targeted scholarships can help reduce the educational disparity between urban and rural students.',
    academicExampleVi: 'Các học bổng mục tiêu có thể giúp thu hẹp sự chênh lệch giáo dục giữa sinh viên thành thị và nông thôn.',
    mnemonic: 'Dis- (không) + parity (ngang bằng) = không ngang bằng, có sự chênh lệch.',
  },
  {
    id: 'awl-pedagogy',
    word: 'pedagogy',
    pos: 'n',
    ipa: '/ˈped.ə.ɡɑː.dʒi/',
    ipaUK: '/ˈped.ə.ɡɒdʒ.i/',
    syllables: ['ped', 'a', 'go', 'gy'],
    stressIndex: 0,
    vietPhonetic: 'PÉ-đơ-go-gi',
    phonicsRule: 'Chữ "g" thứ nhất đọc cứng /ɡ/, chữ "g" thứ hai trước "y" đọc mềm /dʒ/.',
    level: 'C1',
    domain: 'Xã hội & Giáo dục',
    meaningVi: 'phương pháp sư phạm, khoa học giảng dạy',
    collocations: ['student-centered pedagogy', 'innovative pedagogy', 'pedagogical approach'],
    wordFamily: ['pedagogical (adj)', 'pedagogically (adv)', 'pedagogue (n)'],
    academicExampleEn: 'Active-learning pedagogy encourages undergraduates to debate ideas rather than memorize slides.',
    academicExampleVi: 'Phương pháp sư phạm học tập chủ động khuyến khích sinh viên tranh luận ý tưởng thay vì học thuộc lòng slide.',
    mnemonic: 'Gốc Hy Lạp "paidagogos" = người dẫn dắt trẻ em đi học -> khoa học giảng dạy.',
  },
  {
    id: 'awl-cognitive',
    word: 'cognitive',
    pos: 'adj',
    ipa: '/ˈkɑːɡ.nə.tɪv/',
    ipaUK: '/ˈkɒɡ.nə.tɪv/',
    syllables: ['cog', 'ni', 'tive'],
    stressIndex: 0,
    vietPhonetic: 'KÓC-nơ-tiv',
    phonicsRule: 'Trọng âm rơi vào âm tiết đầu "cog-"; đuôi "-tive" đọc nhẹ /tɪv/.',
    level: 'B2',
    domain: 'Xã hội & Giáo dục',
    meaningVi: 'thuộc về nhận thức (tư duy, trí nhớ, tiếp nhận thông tin)',
    collocations: ['cognitive load', 'cognitive development', 'cognitive bias'],
    wordFamily: ['cognition (n)', 'cognitively (adv)', 'recognize (v)'],
    academicExampleEn: 'Spaced repetition reduces cognitive load and strengthens long-term vocabulary retention.',
    academicExampleVi: 'Phương pháp lặp lại ngắt quãng giúp giảm tải nhận thức và củng cố khả năng ghi nhớ từ vựng dài hạn.',
    mnemonic: 'Cog-ni- (nhận biết, giống recognize) = thuộc về hoạt động nhận thức của não.',
  },
  {
    id: 'awl-marginalize',
    word: 'marginalize',
    pos: 'v',
    ipa: '/ˈmɑːr.dʒɪ.nəl.aɪz/',
    ipaUK: '/ˈmɑː.dʒɪ.nəl.aɪz/',
    syllables: ['mar', 'gin', 'al', 'ize'],
    stressIndex: 0,
    vietPhonetic: 'MA-gi-nồ-lai-z',
    phonicsRule: 'Chữ "g" trước "i" đọc là /dʒ/; trọng âm giữ ở âm tiết đầu như từ gốc "margin".',
    level: 'C1',
    domain: 'Xã hội & Giáo dục',
    meaningVi: 'đẩy ra bên lề xã hội, khiến một nhóm người bị gạt ra ngoài lề',
    collocations: ['marginalized communities', 'economically marginalized', 'social marginalization'],
    wordFamily: ['marginal (adj)', 'marginalization (n)', 'marginalized (adj)'],
    academicExampleEn: 'Inclusive policies ensure that marginalized communities have equal access to higher education.',
    academicExampleVi: 'Các chính sách hòa nhập đảm bảo những cộng đồng yếu thế bên lề có cơ hội tiếp cận giáo dục đại học bình đẳng.',
    mnemonic: 'Margin (lề giấy) + -ize = đẩy ai đó ra ngoài lề, không ở trung tâm.',
  },
  {
    id: 'awl-literacy',
    word: 'literacy',
    pos: 'n',
    ipa: '/ˈlɪt.ər.ə.si/',
    ipaUK: '/ˈlɪt.ər.ə.si/',
    syllables: ['lit', 'er', 'a', 'cy'],
    stressIndex: 0,
    vietPhonetic: 'LÍ-tơ-rơ-xi',
    phonicsRule: 'Trọng âm rơi vào âm tiết đầu "lit-"; đuôi "-cy" đọc là /si/.',
    level: 'B2',
    domain: 'Xã hội & Giáo dục',
    meaningVi: 'năng lực đọc viết, hoặc trình độ hiểu biết chuyên môn (digital/media literacy)',
    collocations: ['digital literacy', 'financial literacy', 'literacy rate'],
    wordFamily: ['literate (adj)', 'illiterate (adj)', 'illiteracy (n)'],
    academicExampleEn: 'Critical media literacy equips university students to verify sources and detect misinformation.',
    academicExampleVi: 'Năng lực hiểu biết truyền thông phản biện trang bị cho sinh viên kỹ năng kiểm chứng nguồn tin và phát hiện tin giả.',
    mnemonic: 'Letter (chữ cái) -> Literacy (khả năng đọc hiểu chữ và tri thức thời đại số).',
  },
  {
    id: 'awl-urbanization',
    word: 'urbanization',
    pos: 'n',
    ipa: '/ˌɜːr.bə.nəˈzeɪ.ʃən/',
    ipaUK: '/ˌɜː.bə.naɪˈzeɪ.ʃən/',
    syllables: ['ur', 'ban', 'i', 'za', 'tion'],
    stressIndex: 3,
    vietPhonetic: 'ơ-bơ-nai-ZÂY-sần',
    phonicsRule: 'Đuôi "-tion" kéo trọng âm chính rơi vào âm tiết ngay trước nó ("-za-").',
    level: 'B2',
    domain: 'Xã hội & Giáo dục',
    meaningVi: 'quá trình đô thị hóa',
    collocations: ['rapid urbanization', 'urbanization trend', 'sustainable urbanization'],
    wordFamily: ['urban (adj)', 'urbanize (v)', 'rural (antonym)'],
    academicExampleEn: 'Rapid urbanization places immense pressure on public transit and affordable housing.',
    academicExampleVi: 'Đô thị hóa nhanh chóng tạo ra áp lực lớn lên hệ thống giao thông công cộng và nhà ở giá hợp lý.',
    mnemonic: 'Urban (đô thị) + -ization (quá trình hóa) = quá trình chuyển dịch thành đô thị.',
  },
  {
    id: 'awl-autonomous',
    word: 'autonomous',
    pos: 'adj',
    ipa: '/ɔːˈtɑː.nə.məs/',
    ipaUK: '/ɔːˈtɒn.ə.məs/',
    syllables: ['au', 'ton', 'o', 'mous'],
    stressIndex: 1,
    vietPhonetic: 'o-TÓ-nơ-mớt-x',
    phonicsRule: 'Trọng âm ở âm tiết thứ 2 "-ton-"; đuôi "-ous" đọc nhẹ /əs/.',
    level: 'C1',
    domain: 'Xã hội & Giáo dục',
    meaningVi: 'tự chủ, tự lập (học tập tự chủ, tự trị đại học, xe tự hành)',
    collocations: ['autonomous learner', 'university autonomy', 'autonomous systems'],
    wordFamily: ['autonomy (n)', 'autonomously (adv)'],
    academicExampleEn: 'Becoming an autonomous learner is crucial for succeeding in university seminar courses.',
    academicExampleVi: 'Trở thành người học tự chủ là yếu tố then chốt để học tốt các môn seminar ở bậc đại học.',
    mnemonic: 'Auto (tự mình) + nomos (luật lệ) = tự quản lý theo nguyên tắc của chính mình.',
  },
  {
    id: 'awl-diversity',
    word: 'diversity',
    pos: 'n',
    ipa: '/daɪˈvɜːr.sə.ti/',
    ipaUK: '/daɪˈvɜː.sə.ti/',
    syllables: ['di', 'ver', 'si', 'ty'],
    stressIndex: 1,
    vietPhonetic: 'đai-VƠ-xơ-ti',
    phonicsRule: 'Đuôi "-ity" kéo trọng âm rơi vào "-ver-"; có thể đọc /daɪ-/ hoặc /dɪ-/.',
    level: 'B2',
    domain: 'Xã hội & Giáo dục',
    meaningVi: 'sự đa dạng (văn hóa, sinh học, quan điểm)',
    collocations: ['cultural diversity', 'embrace diversity', 'diversity and inclusion'],
    wordFamily: ['diverse (adj)', 'diversify (v)', 'diversification (n)'],
    academicExampleEn: 'Cultural diversity on campus enriches classroom discussions with multiple global perspectives.',
    academicExampleVi: 'Sự đa dạng văn hóa trong khuôn viên trường làm phong phú các buổi thảo luận lớp với nhiều góc nhìn toàn cầu.',
    mnemonic: 'Di- (nhiều hướng) + verse (xoay) = nhiều khía cạnh đa dạng.',
  },

  // =========================================================
  // 5. LẬP LUẬN & HỌC THUẬT (10 từ)
  // =========================================================
  {
    id: 'awl-coherent',
    word: 'coherent',
    pos: 'adj',
    ipa: '/koʊˈhɪr.ənt/',
    ipaUK: '/kəʊˈhɪə.rənt/',
    syllables: ['co', 'her', 'ent'],
    stressIndex: 1,
    vietPhonetic: 'cô-HIA-rần-t',
    phonicsRule: 'Chữ "h" được phát âm rõ; trọng âm ở âm tiết thứ 2 "-her-".',
    level: 'B2',
    domain: 'Lập luận & Học thuật',
    meaningVi: 'mạch lạc, logic và gắn kết chặt chẽ',
    collocations: ['coherent argument', 'coherent structure', 'logically coherent'],
    wordFamily: ['coherence (n)', 'coherently (adv)', 'incoherent (adj)'],
    academicExampleEn: 'Clear transition phrases help students construct a coherent academic essay.',
    academicExampleVi: 'Các cụm từ chuyển tiếp rõ ràng giúp sinh viên xây dựng một bài luận học thuật mạch lạc.',
    mnemonic: 'Co- (cùng) + here (dính kết) = các ý dính kết logic với nhau (tiêu chí Coherence trong IELTS/VSTEP).',
  },
  {
    id: 'awl-substantiate',
    word: 'substantiate',
    pos: 'v',
    ipa: '/səbˈstæn.ʃi.eɪt/',
    ipaUK: '/səbˈstæn.ʃi.eɪt/',
    syllables: ['sub', 'stan', 'ti', 'ate'],
    stressIndex: 1,
    vietPhonetic: 'xập-XTEN-si-ết',
    phonicsRule: 'Trọng âm rơi vào "-stan-"; cụm "ti" trước nguyên âm đọc là /ʃi/.',
    level: 'C1',
    domain: 'Lập luận & Học thuật',
    meaningVi: 'chứng minh, củng cố bằng dẫn chứng cụ thể',
    collocations: ['substantiate a claim', 'unsubstantiated allegation', 'substantiated by data'],
    wordFamily: ['substantiation (n)', 'substantial (adj)', 'unsubstantiated (adj)'],
    academicExampleEn: 'Authors must substantiate every major claim with peer-reviewed citations or data.',
    academicExampleVi: 'Tác giả phải chứng minh mọi nhận định lớn bằng trích dẫn bình duyệt hoặc dữ liệu thực tế.',
    mnemonic: 'Substance (chất liệu/nội dung thật) -> Substantiate (làm cho luận điểm có "chất" bằng chứng cứ).',
  },
  {
    id: 'awl-implication',
    word: 'implication',
    pos: 'n',
    ipa: '/ˌɪm.pləˈkeɪ.ʃən/',
    ipaUK: '/ˌɪm.plɪˈkeɪ.ʃən/',
    syllables: ['im', 'pli', 'ca', 'tion'],
    stressIndex: 2,
    vietPhonetic: 'im-pli-KÂY-sần',
    phonicsRule: 'Đuôi "-tion" kéo trọng âm vào "-ca-".',
    level: 'B2',
    domain: 'Lập luận & Học thuật',
    meaningVi: 'hàm ý, hệ quả sâu xa hoặc tác động gián tiếp',
    collocations: ['practical implications', 'policy implications', 'far-reaching implications'],
    wordFamily: ['imply (v)', 'implicit (adj)', 'implicitly (adv)'],
    academicExampleEn: 'The study explores the ethical implications of automated grading systems in higher education.',
    academicExampleVi: 'Nghiên cứu khám phá các hệ quả đạo đức của hệ thống chấm điểm tự động trong giáo dục đại học.',
    mnemonic: 'Imply (ngụ ý) -> Implication (hệ quả / ý nghĩa hàm ẩn rút ra từ nghiên cứu).',
  },
  {
    id: 'awl-ambiguous',
    word: 'ambiguous',
    pos: 'adj',
    ipa: '/æmˈbɪɡ.ju.əs/',
    ipaUK: '/æmˈbɪɡ.ju.əs/',
    syllables: ['am', 'big', 'u', 'ous'],
    stressIndex: 1,
    vietPhonetic: 'em-BÍ-giu-ớt-x',
    phonicsRule: 'Trọng âm rơi vào âm tiết thứ 2 "-big-"; chữ "u" sau "g" tạo âm /ju/.',
    level: 'C1',
    domain: 'Lập luận & Học thuật',
    meaningVi: 'mơ hồ, đa nghĩa, chưa rõ ràng dứt khoát',
    collocations: ['ambiguous wording', 'morally ambiguous', 'avoid ambiguity'],
    wordFamily: ['ambiguity (n)', 'unambiguous (adj)', 'ambiguously (adv)'],
    academicExampleEn: 'Survey questions should never be ambiguous, as respondents may interpret them differently.',
    academicExampleVi: 'Câu hỏi khảo sát không bao giờ nên mơ hồ vì người trả lời có thể hiểu theo nhiều cách khác nhau.',
    mnemonic: 'Ambi- (hai phía, như ambidextrous) = hiểu theo hai nghĩa nên bị mơ hồ.',
  },
  {
    id: 'awl-paradigm',
    word: 'paradigm',
    pos: 'n',
    ipa: '/ˈper.ə.daɪm/',
    ipaUK: '/ˈpær.ə.daɪm/',
    syllables: ['par', 'a', 'digm'],
    stressIndex: 0,
    vietPhonetic: 'PE-rờ-đaim',
    phonicsRule: 'Chữ "g" trong đuôi "-igm" hoàn toàn CÂM, đọc là /daɪm/.',
    level: 'C1',
    domain: 'Lập luận & Học thuật',
    meaningVi: 'hệ mẫu, mô hình tư duy chủ đạo trong một ngành khoa học',
    collocations: ['paradigm shift', 'dominant paradigm', 'new paradigm'],
    wordFamily: ['paradigmatic (adj)'],
    academicExampleEn: 'Open-access publishing triggered a paradigm shift in how academic knowledge is shared.',
    academicExampleVi: 'Xuất bản truy cập mở đã tạo ra một bước chuyển hệ mẫu trong cách tri thức học thuật được chia sẻ.',
    mnemonic: 'Nhớ cụm "paradigm shift" (chuyển dịch mô hình tư duy) và chữ "g" bị câm!',
  },
  {
    id: 'awl-consensus',
    word: 'consensus',
    pos: 'n',
    ipa: '/kənˈsen.səs/',
    ipaUK: '/kənˈsen.səs/',
    syllables: ['con', 'sen', 'sus'],
    stressIndex: 1,
    vietPhonetic: 'cần-XEN-xớt-x',
    phonicsRule: 'Âm đầu "con-" đọc lướt /kən/; trọng âm ở âm tiết thứ 2 "-sen-".',
    level: 'B2',
    domain: 'Lập luận & Học thuật',
    meaningVi: 'sự đồng thuận chung (giữa các nhà khoa học hoặc thành viên nhóm)',
    collocations: ['scientific consensus', 'reach a consensus', 'broad consensus'],
    wordFamily: ['consensual (adj)'],
    academicExampleEn: 'There is a broad scientific consensus regarding the urgent need to cut greenhouse gas emissions.',
    academicExampleVi: 'Đang có sự đồng thuận khoa học rộng rãi về nhu cầu cấp thiết phải cắt giảm khí thải nhà kính.',
    mnemonic: 'Con- (cùng) + sense (cảm nhận/ý kiến) = cùng chung một ý kiến (đồng thuận).',
  },
  {
    id: 'awl-contradict',
    word: 'contradict',
    pos: 'v',
    ipa: '/ˌkɑːn.trəˈdɪkt/',
    ipaUK: '/ˌkɒn.trəˈdɪkt/',
    syllables: ['con', 'tra', 'dict'],
    stressIndex: 2,
    vietPhonetic: 'con-trờ-ĐÍCT',
    phonicsRule: 'Động từ chứa gốc "-dict" (nói) thường nhấn trọng âm ngay tại "-dict".',
    level: 'B2',
    domain: 'Lập luận & Học thuật',
    meaningVi: 'mâu thuẫn với, bác bỏ hoặc nói ngược lại',
    collocations: ['contradict earlier findings', 'directly contradict', 'self-contradictory'],
    wordFamily: ['contradiction (n)', 'contradictory (adj)'],
    academicExampleEn: 'Recent longitudinal data appear to contradict earlier assumptions about screen time.',
    academicExampleVi: 'Dữ liệu dài hạn gần đây dường như mâu thuẫn với các giả định trước đây về thời gian dùng màn hình.',
    mnemonic: 'Contra- (chống lại) + dict (nói, như dictionary) = nói ngược lại, mâu thuẫn.',
  },
  {
    id: 'awl-preliminary',
    word: 'preliminary',
    pos: 'adj',
    ipa: '/prɪˈlɪm.ə.ner.i/',
    ipaUK: '/prɪˈlɪm.ɪ.nər.i/',
    syllables: ['pre', 'lim', 'i', 'nar', 'y'],
    stressIndex: 1,
    vietPhonetic: 'pri-LÍ-mơ-ne-ri',
    phonicsRule: 'Trọng âm chính nằm ở âm tiết thứ 2 "-lim-"; âm Mỹ đọc rõ "-nery", âm Anh đọc lướt "-nəri".',
    level: 'B2',
    domain: 'Lập luận & Học thuật',
    meaningVi: 'sơ bộ, ban đầu, mang tính mở đầu trước khi đi vào chính thức',
    collocations: ['preliminary findings', 'preliminary stage', 'preliminary results'],
    wordFamily: ['preliminaries (n)', 'preliminarily (adv)'],
    academicExampleEn: 'Preliminary findings indicate that peer mentoring significantly lowers freshman dropout rates.',
    academicExampleVi: 'Các kết quả sơ bộ cho thấy cố vấn đồng đẳng giúp giảm đáng kể tỷ lệ bỏ học của sinh viên năm nhất.',
    mnemonic: 'Pre- (trước) + limen (ngưỡng cửa) = bước sơ bộ ngay trước ngưỡng cửa chính.',
  },
  {
    id: 'awl-inherent',
    word: 'inherent',
    pos: 'adj',
    ipa: '/ɪnˈhɪr.ənt/',
    ipaUK: '/ɪnˈher.ənt/',
    syllables: ['in', 'her', 'ent'],
    stressIndex: 1,
    vietPhonetic: 'in-HIA-rần-t',
    phonicsRule: 'Chữ "h" phát âm rõ; trọng âm ở âm tiết thứ 2 "-her-"; đi với giới từ "in".',
    level: 'C1',
    domain: 'Lập luận & Học thuật',
    meaningVi: 'vốn có, cố hữu, gắn liền từ bản chất',
    collocations: ['inherent risk', 'inherent limitation', 'inherent in'],
    wordFamily: ['inherently (adv)', 'inhere (v)'],
    academicExampleEn: 'Self-reported questionnaires carry an inherent risk of social desirability bias.',
    academicExampleVi: 'Bảng hỏi tự báo cáo mang theo rủi ro cố hữu là thiên lệch mong muốn xã hội.',
    mnemonic: 'In- (bên trong) + here (dính chặt) = tính chất bám chặt sẵn bên trong sự vật.',
  },
  {
    id: 'awl-furthermore',
    word: 'furthermore',
    pos: 'adv',
    ipa: '/ˌfɜːr.ðərˈmɔːr/',
    ipaUK: '/ˌfɜː.ðəˈmɔːr/',
    syllables: ['fur', 'ther', 'more'],
    stressIndex: 2,
    vietPhonetic: 'phơ-đờ-MO',
    phonicsRule: 'Chữ "th" hữu thanh (/ð/); nhấn mạnh ở âm tiết cuối "-more" hoặc đầu "fur-".',
    level: 'B1',
    domain: 'Lập luận & Học thuật',
    meaningVi: 'hơn nữa, vả lại (từ nối trang trọng bổ sung luận điểm đồng hướng)',
    collocations: ['Furthermore, research shows...', 'Moreover and furthermore'],
    wordFamily: ['further (adv, adj)'],
    academicExampleEn: 'Online lectures offer flexible scheduling; furthermore, they allow students to revisit complex explanations.',
    academicExampleVi: 'Bài giảng trực tuyến mang lại lịch học linh hoạt; hơn nữa, chúng cho phép sinh viên xem lại các phần giải thích phức tạp.',
    mnemonic: 'Further (xa hơn) + more (thêm nữa) = từ nối học thuật thay cho "also/besides" ở đầu câu.',
  },
];

// =========================================================
// 2. KỸ NĂNG THUYẾT TRÌNH 5 GIAI ĐOẠN & SEMINAR
// =========================================================

export type PresentationStageId =
  | 'Opening'
  | 'Signposting'
  | 'Explaining Data/Visuals'
  | 'Handling Q&A'
  | 'Concluding';

export interface PresentationStageMeta {
  id: PresentationStageId;
  titleVi: string;
  goalVi: string;
  durationHint: string;
}

export const PRESENTATION_STAGES: PresentationStageMeta[] = [
  {
    id: 'Opening',
    titleVi: '1. Mở đầu & Thu hút (Opening)',
    goalVi: 'Chào hội đồng/lớp, nêu chủ đề, lý do chọn đề tài (hook) và bố cục bài nói.',
    durationHint: '30–45 giây',
  },
  {
    id: 'Signposting',
    titleVi: '2. Điều hướng & Chuyển ý (Signposting)',
    goalVi: 'Giúp người nghe theo dõi mạch logic khi chuyển phần hoặc nhấn mạnh ý trọng tâm.',
    durationHint: 'Xuyên suốt bài nói',
  },
  {
    id: 'Explaining Data/Visuals',
    titleVi: '3. Diễn giải Số liệu & Slide (Data/Visuals)',
    goalVi: 'Hướng sự chú ý vào biểu đồ, mô tả xu hướng tăng/giảm và giải thích ý nghĩa số liệu.',
    durationHint: 'Phần thân bài',
  },
  {
    id: 'Handling Q&A',
    titleVi: '4. Xử lý Hỏi – Đáp (Handling Q&A)',
    goalVi: 'Cảm ơn câu hỏi, câu giờ tinh tế khi cần suy nghĩ, làm rõ và phản hồi có dẫn chứng.',
    durationHint: '2–5 phút cuối',
  },
  {
    id: 'Concluding',
    titleVi: '5. Tổng kết & Kết bài (Concluding)',
    goalVi: 'Tóm tắt 2–3 thông điệp cốt lõi, nêu hàm ý ứng dụng và mời đặt câu hỏi.',
    durationHint: '30 giây cuối',
  },
];

export interface PresentationPhrase {
  id: string;
  stage: PresentationStageId;
  en: string;
  vi: string;
  usageTip: string;
  level: 'B1' | 'B2' | 'C1';
}

const BASE_PRESENTATION_PHRASES: PresentationPhrase[] = [
  // Opening
  {
    id: 'pres-open-1',
    stage: 'Opening',
    en: 'Good morning, everyone. Today, I would like to examine the impact of artificial intelligence on undergraduate study habits.',
    vi: 'Chào buổi sáng mọi người. Hôm nay, tôi muốn phân tích tác động của trí tuệ nhân tạo lên thói quen học tập của sinh viên đại học.',
    usageTip: 'Dùng "examine" hoặc "explore" thay vì "talk about" để nâng văn phong học thuật.',
    level: 'B1',
  },
  {
    id: 'pres-open-2',
    stage: 'Opening',
    en: 'Before we begin, let me share a striking statistic: over seventy percent of university students now use digital tools daily.',
    vi: 'Trước khi bắt đầu, hãy để tôi chia sẻ một con số ấn tượng: hơn 70% sinh viên đại học hiện sử dụng công cụ số mỗi ngày.',
    usageTip: 'Mở đầu bằng một con số thống kê (Hook) giúp thu hút sự chú ý ngay 10 giây đầu.',
    level: 'B2',
  },
  {
    id: 'pres-open-3',
    stage: 'Opening',
    en: 'I have divided my presentation into three main sections: current challenges, empirical findings, and practical recommendations.',
    vi: 'Tôi chia bài thuyết trình thành ba phần chính: thách thức hiện tại, kết quả thực nghiệm và các đề xuất thực tiễn.',
    usageTip: 'Nêu rõ 3 phần ngay đầu bài giúp giảng viên và người nghe dễ nắm lộ trình.',
    level: 'B2',
  },
  {
    id: 'pres-open-4',
    stage: 'Opening',
    en: 'The primary objective of this presentation is to evaluate whether hybrid learning improves student autonomy.',
    vi: 'Mục tiêu chính của bài thuyết trình này là đánh giá xem học tập kết hợp có giúp cải thiện tính tự chủ của sinh viên hay không.',
    usageTip: 'Rất phù hợp khi bảo vệ đồ án môn học hoặc báo cáo nghiên cứu khoa học sinh viên.',
    level: 'C1',
  },

  // Signposting
  {
    id: 'pres-sign-1',
    stage: 'Signposting',
    en: 'Having outlined the research background, let us now move on to our methodology.',
    vi: 'Sau khi đã phác thảo bối cảnh nghiên cứu, bây giờ chúng ta hãy chuyển sang phần phương pháp thực hiện.',
    usageTip: 'Cấu trúc "Having + V3, let us move on to..." nối mượt mà giữa phần cũ và phần mới.',
    level: 'B2',
  },
  {
    id: 'pres-sign-2',
    stage: 'Signposting',
    en: 'This brings me directly to my second point regarding cost-effectiveness.',
    vi: 'Điều này dẫn tôi trực tiếp đến luận điểm thứ hai về tính hiệu quả chi phí.',
    usageTip: 'Tạo liên kết nguyên nhân – kết quả tự nhiên giữa hai slide liên tiếp.',
    level: 'B1',
  },
  {
    id: 'pres-sign-3',
    stage: 'Signposting',
    en: 'I would like to emphasize that correlation does not necessarily imply causation.',
    vi: 'Tôi muốn nhấn mạnh rằng sự tương quan không nhất thiết đồng nghĩa với quan hệ nhân quả.',
    usageTip: 'Dùng "I would like to emphasize that..." trước kết luận quan trọng để người nghe tập trung.',
    level: 'C1',
  },
  {
    id: 'pres-sign-4',
    stage: 'Signposting',
    en: 'If we take a step back and look at the broader picture, a clear pattern emerges.',
    vi: 'Nếu lùi lại một bước và nhìn bức tranh tổng thể, một quy luật rõ ràng sẽ hiện ra.',
    usageTip: 'Dùng để chuyển từ chi tiết kỹ thuật sang góc nhìn khái quát.',
    level: 'B2',
  },

  // Explaining Data/Visuals
  {
    id: 'pres-data-1',
    stage: 'Explaining Data/Visuals',
    en: 'As you can see from this bar chart, student participation rose steadily between twenty twenty and twenty twenty-four.',
    vi: 'Như bạn có thể thấy từ biểu đồ cột này, sự tham gia của sinh viên đã tăng đều đặn từ năm 2020 đến 2024.',
    usageTip: 'Nhìn hướng về slide khi nói "As you can see from...", rồi quay lại giao tiếp mắt với khán giả.',
    level: 'B1',
  },
  {
    id: 'pres-data-2',
    stage: 'Explaining Data/Visuals',
    en: 'What stands out in this graph is the sharp contrast between the control group and the experimental group.',
    vi: 'Điểm nổi bật trên đồ thị này là sự tương phản rõ rệt giữa nhóm đối chứng và nhóm thực nghiệm.',
    usageTip: 'Tránh đọc từng con số khô khan; hãy chỉ ra điểm bất thường hoặc sự tương phản (sharp contrast).',
    level: 'B2',
  },
  {
    id: 'pres-data-3',
    stage: 'Explaining Data/Visuals',
    en: 'The vertical axis represents the average score, while the horizontal axis indicates study duration in weeks.',
    vi: 'Trục tung biểu thị điểm số trung bình, trong khi trục hoành thể hiện thời lượng học tính theo tuần.',
    usageTip: 'Luôn giới thiệu trục tung (vertical axis) và trục hoành (horizontal axis) trước khi phân tích biểu đồ.',
    level: 'B2',
  },
  {
    id: 'pres-data-4',
    stage: 'Explaining Data/Visuals',
    en: 'These figures substantiate our initial hypothesis that timely feedback accelerates skill acquisition.',
    vi: 'Những số liệu này chứng minh giả thuyết ban đầu của chúng tôi rằng phản hồi kịp thời thúc đẩy việc tiếp thu kỹ năng.',
    usageTip: 'Kết thúc phần mô tả biểu đồ bằng câu chốt ý nghĩa nghiên cứu.',
    level: 'C1',
  },

  // Handling Q&A
  {
    id: 'pres-qa-1',
    stage: 'Handling Q&A',
    en: 'Thank you for raising that insightful question. Let me address it from two perspectives.',
    vi: 'Cảm ơn bạn đã nêu câu hỏi rất sâu sắc đó. Hãy để tôi giải đáp từ hai góc độ.',
    usageTip: 'Khen ngắn câu hỏi ("insightful/great question") vừa lịch sự vừa giúp bạn có thêm 2 giây suy nghĩ.',
    level: 'B2',
  },
  {
    id: 'pres-qa-2',
    stage: 'Handling Q&A',
    en: 'Just to make sure I understood correctly, are you asking about the sample size or the selection criteria?',
    vi: 'Để chắc chắn tôi hiểu đúng ý, bạn đang hỏi về cỡ mẫu hay về tiêu chí chọn mẫu vậy ạ?',
    usageTip: 'Khi nghe chưa rõ câu hỏi của giám khảo/bạn học, hãy kiểm tra lại bằng "Just to make sure I understood correctly...".',
    level: 'B1',
  },
  {
    id: 'pres-qa-3',
    stage: 'Handling Q&A',
    en: 'That lies slightly beyond the scope of our current study, yet it would be an excellent direction for future research.',
    vi: 'Vấn đề đó nằm hơi ngoài phạm vi nghiên cứu hiện tại của chúng tôi, tuy nhiên đó sẽ là hướng rất hay cho nghiên cứu tiếp theo.',
    usageTip: 'Cách trả lời chuyên nghiệp khi gặp câu hỏi ngoài phạm vi đề tài mà không bị lúng túng.',
    level: 'C1',
  },
  {
    id: 'pres-qa-4',
    stage: 'Handling Q&A',
    en: 'I do not have the exact figure with me right now, but I would be happy to follow up with you after the session.',
    vi: 'Hiện tại tôi không có con số chính xác ở đây, nhưng tôi rất sẵn lòng gửi bổ sung cho bạn ngay sau buổi thuyết trình.',
    usageTip: 'Thà thừa nhận trung thực và hẹn phản hồi sau còn hơn đoán bừa số liệu trước hội đồng.',
    level: 'B2',
  },

  // Concluding
  {
    id: 'pres-conc-1',
    stage: 'Concluding',
    en: 'To summarize, integrating peer feedback into writing courses improves both clarity and critical thinking.',
    vi: 'Tóm lại, việc tích hợp phản hồi đồng đẳng vào môn viết giúp cải thiện cả tính rõ ràng lẫn tư duy phản biện.',
    usageTip: 'Không lặp lại y nguyên toàn bộ slide; chỉ cô đọng lại thông điệp giá trị nhất.',
    level: 'B2',
  },
  {
    id: 'pres-conc-2',
    stage: 'Concluding',
    en: 'If there is one key takeaway from today’s talk, it is that consistent practice outweighs passive cramming.',
    vi: 'Nếu có một thông điệp cốt lõi từ buổi trình bày hôm nay, đó là việc luyện tập đều đặn hiệu quả hơn nhiều so với học nhồi nhét thụ động.',
    usageTip: 'Cụm "key takeaway" giúp khán giả nhớ ngay điều quan trọng nhất sau khi bạn rời bục.',
    level: 'B2',
  },
  {
    id: 'pres-conc-3',
    stage: 'Concluding',
    en: 'Thank you very much for your attention. I would now welcome any questions or comments from the floor.',
    vi: 'Xin chân thành cảm ơn sự chú ý lắng nghe của quý vị. Bây giờ tôi rất hoan nghênh mọi câu hỏi hoặc góp ý từ hội trường.',
    usageTip: 'Kết thúc dứt khoát, mở phần hỏi đáp chuyên nghiệp.',
    level: 'B1',
  },
  {
    id: 'pres-conc-4',
    stage: 'Concluding',
    en: 'In light of these implications, we recommend piloting this model at the faculty level next semester.',
    vi: 'Xét trên những hàm ý này, chúng tôi kiến nghị triển khai thí điểm mô hình ở cấp khoa vào học kỳ tới.',
    usageTip: 'Rất hiệu quả cho phần kết bài báo cáo dự án hoặc đề xuất cải tiến.',
    level: 'C1',
  },
];

export interface SeminarPhrase {
  id: string;
  category: 'Đồng tình & Phát triển ý' | 'Phản biện lịch sự' | 'Hỏi làm rõ & Đào sâu' | 'Dẫn chứng & Điều phối';
  en: string;
  vi: string;
  toneTip: string;
}

const BASE_SEMINAR_PHRASES: SeminarPhrase[] = [
  {
    id: 'sem-1',
    category: 'Đồng tình & Phát triển ý',
    en: 'Building on what Lan mentioned earlier, I would add that funding constraints also play a major role.',
    vi: 'Phát triển thêm từ ý mà Lan đã đề cập trước đó, tôi xin bổ sung rằng hạn chế về kinh phí cũng đóng vai trò lớn.',
    toneTip: 'Gọi tên bạn học trước khi nối ý thể hiện kỹ năng lắng nghe chủ động trong seminar.',
  },
  {
    id: 'sem-2',
    category: 'Đồng tình & Phát triển ý',
    en: 'That aligns closely with the findings in our assigned reading, particularly regarding student motivation.',
    vi: 'Điều đó khớp rất sát với các kết quả trong bài đọc được giao của chúng ta, đặc biệt ở khía cạnh động lực sinh viên.',
    toneTip: 'Liên kết ý kiến thảo luận với tài liệu môn học được giảng viên đánh giá rất cao.',
  },
  {
    id: 'sem-3',
    category: 'Đồng tình & Phát triển ý',
    en: 'You raise a compelling point; in fact, a similar trend can be observed in Southeast Asian startups.',
    vi: 'Bạn nêu ra một luận điểm rất thuyết phục; thực tế là một xu hướng tương tự cũng được quan sát thấy ở các startup Đông Nam Á.',
    toneTip: 'Mở rộng ví dụ thực tế để làm giàu phần thảo luận nhóm.',
  },
  {
    id: 'sem-4',
    category: 'Phản biện lịch sự',
    en: 'I see where you are coming from; however, the data might also be interpreted from an alternative angle.',
    vi: 'Tôi hiểu góc nhìn của bạn; tuy nhiên, dữ liệu này cũng có thể được lý giải theo một khía cạnh khác.',
    toneTip: 'Công nhận ý người nói trước ("I see where you are coming from") giúp phản biện mềm mỏng, không đối đầu.',
  },
  {
    id: 'sem-5',
    category: 'Phản biện lịch sự',
    en: 'While I agree with your premise in theory, I wonder if it holds true under resource-limited conditions.',
    vi: 'Dù tôi đồng ý với tiền đề của bạn trên lý thuyết, tôi băn khoăn liệu điều đó có còn đúng trong điều kiện thiếu nguồn lực hay không.',
    toneTip: 'Dùng "While I agree..., I wonder if..." để đặt câu hỏi phản biện đầy tôn trọng.',
  },
  {
    id: 'sem-6',
    category: 'Phản biện lịch sự',
    en: 'To play devil’s advocate for a moment, what happens if users deliberately bypass this verification step?',
    vi: 'Thử đặt góc nhìn phản biện một chút nhé, điều gì sẽ xảy ra nếu người dùng cố tình bỏ qua bước xác minh này?',
    toneTip: 'Cụm "To play devil’s advocate" báo hiệu bạn đang đặt giả thuyết trái chiều để kiểm tra độ vững của ý tưởng.',
  },
  {
    id: 'sem-7',
    category: 'Phản biện lịch sự',
    en: 'I am not entirely convinced that this single policy explains the entire drop in attendance.',
    vi: 'Tôi chưa hoàn toàn bị thuyết phục rằng chỉ riêng chính sách này có thể lý giải toàn bộ sự sụt giảm tỷ lệ đi học.',
    toneTip: 'Thay vì nói "You are wrong", hãy dùng "I am not entirely convinced that...".',
  },
  {
    id: 'sem-8',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'Could you elaborate on how your team defined "academic engagement" in the survey?',
    vi: 'Bạn có thể nói rõ hơn về cách nhóm bạn định nghĩa "mức độ gắn kết học thuật" trong bảng khảo sát không?',
    toneTip: 'Trong thảo luận học thuật, hỏi về định nghĩa khái niệm luôn là câu hỏi sắc bén.',
  },
  {
    id: 'sem-9',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'If I follow your argument correctly, you are suggesting that grades matter less than portfolio projects.',
    vi: 'Nếu tôi theo đúng mạch lập luận của bạn, bạn đang cho rằng điểm số ít quan trọng hơn các dự án hồ sơ năng lực.',
    toneTip: 'Diễn đạt lại (Paraphrase) ý người khác giúp tránh hiểu nhầm trong tranh luận.',
  },
  {
    id: 'sem-10',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'What evidence led you to conclude that the intervention had a long-term effect?',
    vi: 'Bằng chứng nào đã dẫn bạn đến kết luận rằng biện pháp can thiệp mang lại hiệu quả dài hạn?',
    toneTip: 'Hỏi thẳng vào nguồn bằng chứng giúp cuộc thảo luận đi vào thực chất khoa học.',
  },
  {
    id: 'sem-11',
    category: 'Dẫn chứng & Điều phối',
    en: 'May I jump in briefly here? According to the OECD report, graduate employability depends heavily on soft skills.',
    vi: 'Tôi xin phép xen ngang nhanh chỗ này một chút nhé? Theo báo cáo của OECD, khả năng có việc làm của sinh viên phụ thuộc lớn vào kỹ năng mềm.',
    toneTip: 'Dùng "May I jump in briefly here?" khi thảo luận nhóm diễn ra sôi nổi và cần xen ý.',
  },
  {
    id: 'sem-12',
    category: 'Dẫn chứng & Điều phối',
    en: 'To keep our discussion on track, perhaps we should hear from someone who has not spoken yet.',
    vi: 'Để giữ cuộc thảo luận đúng trọng tâm, có lẽ chúng ta nên lắng nghe ý kiến từ một bạn chưa phát biểu.',
    toneTip: 'Mẫu câu cực hay nếu bạn làm trưởng nhóm (moderator) điều phối seminar.',
  },
];

export interface AbstractQuestion {
  id: string;
  focusSkill: 'Luận điểm chính (Main Argument)' | 'Phương pháp (Methodology)' | 'Bằng chứng & Kết quả (Findings)' | 'Suy luận & Hàm ý (Inference)';
  questionEn: string;
  questionVi: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
}

export interface AcademicAbstract {
  id: string;
  title: string;
  domain: AwlDomain;
  level: 'B1' | 'B2' | 'C1';
  publicationContext: string;
  abstractEn: string;
  translationVi: string;
  keyTerms: string[];
  questions: AbstractQuestion[];
}

const BASE_ACADEMIC_ABSTRACTS: AcademicAbstract[] = [
  {
    id: 'abs-1',
    title: 'Active Recall vs. Passive Re-reading in Undergraduate Exam Preparation',
    domain: 'Nghiên cứu & Phân tích',
    level: 'B1',
    publicationContext: 'Journal of Higher Education Pedagogy • Research Abstract',
    abstractEn:
      'Many undergraduate students rely heavily on passive re-reading and highlighting when preparing for midterms, despite cognitive studies questioning their efficiency. This empirical study compared two study strategies among 120 second-year biology students over an eight-week semester. Participants were randomly assigned to either a passive review group or an active recall group using spaced flashcards. Preliminary and final exam scores were analyzed to evaluate long-term retention. Results indicated that the active recall cohort outperformed the passive group by an average of 18 percent, particularly on conceptual application questions. Furthermore, students using spaced retrieval reported lower pre-exam anxiety. These findings suggest that universities should integrate explicit study-skill workshops into first-year orientation curricula.',
    translationVi:
      'Nhiều sinh viên đại học phụ thuộc nặng nề vào việc đọc lại thụ động và tô màu ghi chú khi ôn thi giữa kỳ, mặc dù các nghiên cứu nhận thức đặt nghi vấn về hiệu quả của chúng. Nghiên cứu thực nghiệm này so sánh hai chiến lược học tập ở 120 sinh viên năm hai ngành sinh học trong một học kỳ 8 tuần. Người tham gia được phân ngẫu nhiên vào nhóm ôn tập thụ động hoặc nhóm gợi nhớ chủ động dùng flashcard lặp lại ngắt quãng. Điểm thi sơ bộ và cuối kỳ được phân tích để đánh giá khả năng ghi nhớ dài hạn. Kết quả chỉ ra nhóm gợi nhớ chủ động vượt trội hơn nhóm thụ động trung bình 18%, đặc biệt ở các câu hỏi vận dụng khái niệm. Hơn nữa, sinh viên dùng phương pháp truy xuất ngắt quãng báo cáo mức độ lo âu trước kỳ thi thấp hơn. Những phát hiện này gợi ý rằng các trường đại học nên tích hợp các buổi hướng dẫn kỹ năng học tập bài bản vào chương trình định hướng năm nhất.',
    keyTerms: ['empirical', 'evaluate', 'cohort', 'furthermore', 'curricula'],
    questions: [
      {
        id: 'abs-1-q1',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How were the 120 biology students divided in the experiment?',
        questionVi: '120 sinh viên ngành sinh học được chia nhóm như thế nào trong thí nghiệm?',
        options: [
          'They chose their preferred study method freely.',
          'They were randomly assigned to a passive review group or an active recall group.',
          'High-scoring students were placed in the active recall group.',
          'They were divided by their pre-exam anxiety levels.',
        ],
        correctIndex: 1,
        explanationVi: 'Đoạn văn nêu rõ: "Participants were randomly assigned to either a passive review group or an active recall group..." (phân nhóm ngẫu nhiên).',
      },
      {
        id: 'abs-1-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'In which type of questions did the active recall group show particular advantage?',
        questionVi: 'Nhóm gợi nhớ chủ động vượt trội đặc biệt ở dạng câu hỏi nào?',
        options: [
          'True/False vocabulary definitions',
          'Conceptual application questions',
          'Open-book essay summaries',
          'Multiple-choice memorization items',
        ],
        correctIndex: 1,
        explanationVi: 'Câu 5 ghi rõ: "...outperformed the passive group by an average of 18 percent, particularly on conceptual application questions."',
      },
      {
        id: 'abs-1-q3',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What policy recommendation do the authors draw from their findings?',
        questionVi: 'Các tác giả rút ra kiến nghị chính sách gì từ kết quả nghiên cứu?',
        options: [
          'Eliminating midterm exams for second-year students',
          'Banning highlighters from university libraries',
          'Including formal study-skill workshops during first-year orientation',
          'Making biology courses entirely online',
        ],
        correctIndex: 2,
        explanationVi: 'Câu cuối kết luận: "universities should integrate explicit study-skill workshops into first-year orientation curricula."',
      },
    ],
  },
  {
    id: 'abs-2',
    title: 'Green Supply Chain Incentives and SME Competitiveness',
    domain: 'Kinh tế & Quản trị',
    level: 'B2',
    publicationContext: 'Asian Business & Management Review • Abstract',
    abstractEn:
      'Small and medium-sized enterprises (SMEs) frequently hesitate to adopt sustainable manufacturing practices due to high upfront capital costs. This paper investigates whether targeted government tax incentives accelerate green transition without eroding short-term profitability. Using panel data from 340 Vietnamese export manufacturers between 2019 and 2024, our analysis correlates green capital allocation with export revenue growth. The empirical evidence demonstrates that while compliance costs caused profit margins to fluctuate during the first twelve months, firms receiving green tax credits achieved a 14 percent productivity gain by year three through lower energy waste and stronger access to European buyers. Consequently, well-structured fiscal incentives transform environmental compliance from a regulatory burden into a strategic market advantage.',
    translationVi:
      'Các doanh nghiệp vừa và nhỏ (SME) thường ngần ngại áp dụng quy trình sản xuất bền vững do chi phí vốn ban đầu cao. Bài báo này khảo sát xem các ưu đãi thuế có mục tiêu của chính phủ có thúc đẩy chuyển đổi xanh mà không làm xói mòn lợi nhuận ngắn hạn hay không. Sử dụng dữ liệu bảng từ 340 doanh nghiệp xuất khẩu Việt Nam giai đoạn 2019–2024, phân tích của chúng tôi đối chiếu mức phân bổ vốn xanh với tăng trưởng doanh thu xuất khẩu. Bằng chứng thực nghiệm chứng minh rằng dù chi phí tuân thủ làm biên lợi nhuận biến động trong 12 tháng đầu, các doanh nghiệp nhận ưu đãi thuế xanh đạt mức tăng năng suất 14% vào năm thứ ba nhờ giảm lãng phí năng lượng và tiếp cận tốt hơn với khách hàng châu Âu. Do đó, các ưu đãi tài khóa được thiết kế hợp lý biến việc tuân thủ môi trường từ gánh nặng quy định thành lợi thế chiến lược trên thị trường.',
    keyTerms: ['sustainable', 'incentives', 'allocate', 'fluctuate', 'productivity', 'strategic'],
    questions: [
      {
        id: 'abs-2-q1',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What central problem does this study aim to investigate?',
        questionVi: 'Vấn đề trung tâm mà nghiên cứu này muốn khảo sát là gì?',
        options: [
          'Whether European buyers prefer large corporations over SMEs',
          'Whether targeted tax incentives help SMEs go green without hurting long-term profitability',
          'Why energy costs fluctuated globally in 2019',
          'How to replace human workers with automation in export factories',
        ],
        correctIndex: 1,
        explanationVi: 'Câu 2 nêu rõ: "investigates whether targeted government tax incentives accelerate green transition without eroding short-term profitability."',
      },
      {
        id: 'abs-2-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What happened to the firms receiving green tax credits by the third year?',
        questionVi: 'Điều gì xảy ra với các doanh nghiệp nhận ưu đãi thuế xanh vào năm thứ ba?',
        options: [
          'Their export revenue dropped by 14 percent.',
          'They exited European markets due to strict rules.',
          'They achieved a 14 percent gain in productivity.',
          'Their profit margins continued to fall sharply.',
        ],
        correctIndex: 2,
        explanationVi: 'Bài viết ghi rõ: "...firms receiving green tax credits achieved a 14 percent productivity gain by year three..."',
      },
      {
        id: 'abs-2-q3',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What does the phrase "from a regulatory burden into a strategic market advantage" imply?',
        questionVi: 'Cụm "từ gánh nặng quy định thành lợi thế chiến lược trên thị trường" ngụ ý điều gì?',
        options: [
          'Environmental rules should be removed completely.',
          'Green practices can become profitable and boost competitiveness with the right support.',
          'Only large firms benefit from environmental regulations.',
          'Short-term profit fluctuation means green policies fail.',
        ],
        correctIndex: 1,
        explanationVi: 'Với chính sách hỗ trợ phù hợp, sản xuất xanh không chỉ để đối phó quy định mà trở thành lợi thế cạnh tranh sinh lời.',
      },
    ],
  },
  {
    id: 'abs-3',
    title: 'Latency Optimization in Scalable Edge-Cloud Learning Systems',
    domain: 'Công nghệ & Kỹ thuật',
    level: 'C1',
    publicationContext: 'IEEE Systems & EdTech Proceedings • Excerpt',
    abstractEn:
      'Real-time speech assessment tools require low network latency to deliver immediate feedback during language practice. Traditional centralized cloud architectures often struggle to remain responsive when thousands of students connect simultaneously during peak examination hours. To address this bottleneck, we propose a hybrid edge-cloud protocol that executes lightweight acoustic preprocessing locally on client devices before transmitting compressed feature parameters to regional servers. We simulated concurrent traffic spikes ranging from 500 to 10,000 users across diverse campus bandwidth profiles. Compared with conventional monolithic servers, the proposed scalable architecture reduced median response latency by 42 percent and lowered server bandwidth consumption by one-third without compromising transcription accuracy.',
    translationVi:
      'Các công cụ đánh giá phát âm thời gian thực đòi hỏi độ trễ mạng thấp để phản hồi tức thì trong lúc luyện nói. Kiến trúc đám mây tập trung truyền thống thường gặp khó khăn trong việc duy trì độ phản hồi nhanh khi hàng nghìn sinh viên kết nối đồng thời vào giờ thi cao điểm. Để giải quyết nút thắt này, chúng tôi đề xuất một giao thức kết hợp biên-đám mây (edge-cloud), thực thi tiền xử lý âm thanh gọn nhẹ ngay trên thiết bị người dùng trước khi truyền các tham số đặc trưng đã nén tới máy chủ khu vực. Chúng tôi mô phỏng các đợt tăng đột biến lưu lượng đồng thời từ 500 đến 10.000 người dùng trên nhiều cấu hình băng thông khuôn viên trường khác nhau. So với máy chủ nguyên khối truyền thống, kiến trúc có khả năng mở rộng được đề xuất giúp giảm độ trễ phản hồi trung vị 42% và giảm một phần ba lượng tiêu thụ băng thông máy chủ mà không làm suy giảm độ chính xác chuyển giọng nói thành văn bản.',
    keyTerms: ['protocol', 'parameters', 'simulated', 'scalable', 'optimize'],
    questions: [
      {
        id: 'abs-3-q1',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What limitation of centralized cloud architectures is highlighted in the excerpt?',
        questionVi: 'Hạn chế nào của kiến trúc đám mây tập trung được nêu ra trong đoạn trích?',
        options: [
          'They cannot store audio recordings securely.',
          'They struggle to stay responsive during simultaneous peak-hour usage.',
          'They only work on desktop browsers.',
          'They require expensive client-side GPUs.',
        ],
        correctIndex: 1,
        explanationVi: 'Câu 2 nêu rõ: "Traditional centralized cloud architectures often struggle to remain responsive when thousands of students connect simultaneously..."',
      },
      {
        id: 'abs-3-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How did the researchers evaluate their proposed edge-cloud protocol?',
        questionVi: 'Các nhà nghiên cứu đã đánh giá giao thức đề xuất bằng cách nào?',
        options: [
          'By interviewing 500 university network administrators',
          'By simulating concurrent user traffic spikes from 500 to 10,000 users',
          'By replacing campus Wi-Fi hardware with fiber optics',
          'By limiting user sessions to two minutes',
        ],
        correctIndex: 1,
        explanationVi: 'Câu 4: "We simulated concurrent traffic spikes ranging from 500 to 10,000 users across diverse campus bandwidth profiles."',
      },
      {
        id: 'abs-3-q3',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'Did reducing bandwidth consumption negatively affect speech transcription accuracy?',
        questionVi: 'Việc giảm tiêu thụ băng thông có làm giảm độ chính xác nhận diện giọng nói không?',
        options: [
          'Yes, accuracy dropped by one-third.',
          'Yes, accuracy fell during peak hours.',
          'No, transcription accuracy remained uncompromised.',
          'The excerpt does not mention accuracy.',
        ],
        correctIndex: 2,
        explanationVi: 'Câu cuối khẳng định: "...without compromising transcription accuracy" (không làm suy giảm độ chính xác).',
      },
    ],
  },
  {
    id: 'abs-4',
    title: 'Bridging the Digital Literacy Gap Among First-Generation University Students',
    domain: 'Xã hội & Giáo dục',
    level: 'B2',
    publicationContext: 'Studies in Higher Education & Equity • Abstract',
    abstractEn:
      'Although young adults are frequently labeled "digital natives," recent sociological surveys contradict the assumption that all incoming freshmen possess equal academic technology skills. First-generation university students from under-resourced regions often experience an initial disparity in academic digital literacy—such as evaluating scholarly databases, managing citations, and navigating learning management systems. This study tracked 280 first-year students across three public universities using a mixed-method design combining skills diagnostics and semi-structured interviews. Students who joined peer-led digital mentoring workshops during their first semester reported substantially higher confidence and stronger autonomous learning habits. Ensuring equitable technical onboarding is therefore vital to prevent vulnerable learners from becoming marginalized in technology-intensive degree programs.',
    translationVi:
      'Mặc dù người trẻ thường được gắn nhãn "công dân số bản địa", các khảo sát xã hội học gần đây bác bỏ giả định rằng mọi tân sinh viên đều sở hữu kỹ năng công nghệ học thuật ngang nhau. Sinh viên thế hệ đầu trong gia đình vào đại học đến từ các vùng thiếu thốn nguồn lực thường gặp sự chênh lệch ban đầu về năng lực số học thuật—như đánh giá cơ sở dữ liệu khoa học, quản lý trích dẫn và sử dụng hệ thống quản lý học tập. Nghiên cứu này theo dõi 280 sinh viên năm nhất tại ba trường đại học công lập theo thiết kế kết hợp giữa bài kiểm tra kỹ năng và phỏng vấn bán cấu trúc. Những sinh viên tham gia các buổi cố vấn kỹ năng số do bạn đồng đẳng dẫn dắt trong học kỳ đầu tiên ghi nhận sự tự tin cao hơn rõ rệt và thói quen học tập tự chủ vững hơn. Do đó, đảm bảo quy trình hỗ trợ kỹ thuật công bằng là điều thiết yếu để ngăn người học yếu thế bị đẩy ra bên lề trong các chương trình đào tạo ứng dụng công nghệ cao.',
    keyTerms: ['contradict', 'disparity', 'literacy', 'autonomous', 'marginalized'],
    questions: [
      {
        id: 'abs-4-q1',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What common assumption do recent sociological surveys challenge?',
        questionVi: 'Các khảo sát xã hội học gần đây bác bỏ giả định phổ biến nào?',
        options: [
          'First-generation students prefer printed textbooks.',
          'All incoming university freshmen possess equal academic technology skills.',
          'Public universities lack learning management systems.',
          'Peer mentoring is less effective than online videos.',
        ],
        correctIndex: 1,
        explanationVi: 'Câu đầu tiên chỉ ra: "...contradict the assumption that all incoming freshmen possess equal academic technology skills."',
      },
      {
        id: 'abs-4-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'What research design was used to study the 280 first-year students?',
        questionVi: 'Nghiên cứu đã dùng thiết kế phương pháp nào để theo dõi 280 sinh viên năm nhất?',
        options: [
          'A purely quantitative multiple-choice test',
          'A mixed-method design combining skills diagnostics and interviews',
          'A historical document analysis from 1990',
          'An anonymous social media poll',
        ],
        correctIndex: 1,
        explanationVi: 'Câu 3: "...using a mixed-method design combining skills diagnostics and semi-structured interviews."',
      },
      {
        id: 'abs-4-q3',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'Why is early technical onboarding described as vital?',
        questionVi: 'Vì sao việc hỗ trợ định hướng kỹ thuật sớm được coi là thiết yếu?',
        options: [
          'To replace standard academic subjects in semester one',
          'To prevent disadvantaged students from falling behind and being marginalized',
          'To reduce university tuition fees',
          'To encourage students to switch majors',
        ],
        correctIndex: 1,
        explanationVi: 'Câu cuối: "...to prevent vulnerable learners from becoming marginalized in technology-intensive degree programs."',
      },
    ],
  },
  {
    id: 'abs-5',
    title: 'Evaluating Consensus and Inherent Bias in Automated Essay Scoring',
    domain: 'Lập luận & Học thuật',
    level: 'C1',
    publicationContext: 'Assessment & Evaluation in Higher Education • Excerpt',
    abstractEn:
      'As university enrollment expands, Automated Essay Scoring (AES) systems are increasingly deployed to assist instructors with large-scale formative feedback. While advocates emphasize rapid turnaround and scoring consistency, critics highlight inherent limitations in how algorithms evaluate rhetorical nuance and original argumentation. In this comparative study, 450 undergraduate argumentative essays were graded independently by two human raters and a commercial language model. Although the AES engine achieved moderate consensus with human graders on grammar and mechanical accuracy, discrepancies widened sharply whenever essays employed unconventional yet coherent persuasive structures. Consequently, rather than replacing human assessment, AES tools should serve strictly as preliminary drafting aids that free educators to focus on higher-order critical reasoning.',
    translationVi:
      'Khi quy mô tuyển sinh đại học mở rộng, các hệ thống Chấm điểm Bài luận Tự động (AES) ngày càng được triển khai để hỗ trợ giảng viên phản hồi quá trình ở quy mô lớn. Trong khi những người ủng hộ nhấn mạnh tốc độ trả kết quả nhanh và tính nhất quán, giới phê bình chỉ ra những hạn chế cố hữu trong cách thuật toán đánh giá sắc thái tu từ và lập luận sáng tạo. Trong nghiên cứu đối chiếu này, 450 bài luận nghị luận của sinh viên được chấm độc lập bởi hai giám khảo con người và một mô hình ngôn ngữ thương mại. Mặc dù công cụ AES đạt sự đồng thuận ở mức vừa phải với giám khảo người ở tiêu chí ngữ pháp và chính tả, sự chênh lệch tăng vọt bất cứ khi nào bài luận sử dụng cấu trúc thuyết phục mới mẻ nhưng vẫn mạch lạc. Do vậy, thay vì thay thế hoàn toàn đánh giá của con người, công cụ AES chỉ nên đóng vai trò công cụ hỗ trợ bản nháp sơ bộ để giải phóng giảng viên tập trung vào tư duy phản biện bậc cao.',
    keyTerms: ['inherent', 'consensus', 'coherent', 'preliminary', 'evaluate'],
    questions: [
      {
        id: 'abs-5-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'Where did the AES system align best with human graders?',
        questionVi: 'Hệ thống chấm luận tự động đạt mức đồng thuận tốt nhất với giám khảo người ở khía cạnh nào?',
        options: [
          'Original persuasive structures',
          'Grammar and mechanical accuracy',
          'Rhetorical nuance and humor',
          'Unconventional essay openings',
        ],
        correctIndex: 1,
        explanationVi: 'Bài đọc nêu rõ: "...achieved moderate consensus with human graders on grammar and mechanical accuracy..."',
      },
      {
        id: 'abs-5-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'When did scoring discrepancies between AI and humans increase sharply?',
        questionVi: 'Khi nào sự chênh lệch điểm số giữa AI và con người tăng mạnh?',
        options: [
          'When essays were shorter than 200 words',
          'When essays used creative, unconventional yet coherent structures',
          'When essays contained technical IT vocabulary',
          'When human raters disagreed on punctuation',
        ],
        correctIndex: 1,
        explanationVi: 'Câu 4: "...discrepancies widened sharply whenever essays employed unconventional yet coherent persuasive structures."',
      },
      {
        id: 'abs-5-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What role do the authors conclude AES tools should play in universities?',
        questionVi: 'Tác giả kết luận công cụ AES nên đóng vai trò gì ở trường đại học?',
        options: [
          'Complete replacement for human instructors',
          'Final pass/fail gatekeeper for graduation theses',
          'Preliminary drafting aids supporting human instructors',
          'Tools used only for multiple-choice grammar quizzes',
        ],
        correctIndex: 2,
        explanationVi: 'Câu cuối: "...AES tools should serve strictly as preliminary drafting aids that free educators to focus on higher-order critical reasoning."',
      },
    ],
  },
];

// =========================================================
// 3. VIẾT HỌC THUẬT & CHUẨN BỊ SỰ NGHIỆP (9 ĐỀ THỰC TẾ)
// =========================================================

export type AcademicWritingType =
  | 'Email giảng viên'
  | 'Email xin thực tập'
  | 'Essay: Cause-Effect'
  | 'Essay: Argumentative'
  | 'Essay: Problem-Solution'
  | 'Personal Statement'
  | 'Cover Letter'
  | 'CV Summary';

export interface AcademicWritingPrompt {
  id: string;
  type: AcademicWritingType;
  title: string;
  level: 'B1' | 'B2' | 'C1';
  recommendedWords: number;
  promptVi: string;
  promptEn: string;
  keywordsEn: string[];
  structureOutline: string[];
  sampleBandHigh: string;
  gradingChecklistVi: string[];
}

const BASE_ACADEMIC_WRITING_PROMPTS: AcademicWritingPrompt[] = [
  {
    id: 'aw-email-prof',
    type: 'Email giảng viên',
    title: 'Email xin hẹn gặp Giảng viên hướng dẫn đồ án / khóa luận',
    level: 'B1',
    recommendedWords: 120,
    promptVi:
      'Bạn là sinh viên năm 3/năm 4 muốn xin hẹn gặp giảng viên (Dr. Nguyen) vào giờ tiếp sinh viên (office hours) để thảo luận 2 ý tưởng đề tài nghiên cứu/khóa luận. Hãy viết một email trang trọng, rõ ràng, ngắn gọn.',
    promptEn:
      'Write a polite, formal email to your academic advisor (Dr. Nguyen) requesting a 15-minute meeting during office hours next week to discuss two potential capstone research topics and attach a brief outline.',
    keywordsEn: ['Dear Dr.', 'office hours', 'research topic', 'attached', 'appreciate', 'Sincerely'],
    structureOutline: [
      'Subject Line: Rõ mã môn/mục đích (VD: Request for Meeting: Capstone Topic Consultation – [Student Name, ID])',
      'Salutation: Kính gửi trang trọng ("Dear Dr. Nguyen," hoặc "Dear Professor Nguyen,")',
      'Opening: Giới thiệu tên, mã sinh viên, lớp/học phần đang theo học',
      'Body: Nêu rõ 2 hướng đề tài ngắn gọn + đính kèm đề cương 1 trang + đề xuất 2 khung giờ trống',
      'Closing: Cảm ơn thời gian của thầy/cô + "Sincerely," + Họ tên & SĐT/MSSV',
    ],
    sampleBandHigh: `Subject: Meeting Request: Capstone Research Topic Consultation – Minh Tran (ID: 20241088)

Dear Dr. Nguyen,

I hope this email finds you well. My name is Minh Tran, a third-year Computer Science student currently enrolled in your Research Methods seminar.

I am writing to respectfully request a brief 15-minute meeting during your office hours next week to seek your guidance on my upcoming capstone project. I have narrowed my interests down to two potential research topics regarding automated feedback in language learning and have attached a one-page preliminary outline for your reference.

Would you be available on Tuesday between 2:00 PM and 3:30 PM, or Thursday morning? If neither slot works, I would be glad to adjust to your schedule.

Thank you very much for your time and consideration. I look forward to hearing from you.

Sincerely,
Minh Tran
Student ID: 20241088`,
    gradingChecklistVi: [
      'Có dòng tiêu đề (Subject) súc tích, đủ thông tin sinh viên',
      'Dùng xưng hô học thuật chuẩn ("Dear Dr./Professor...") thay vì "Hi teacher"',
      'Nêu rõ mục đích, đính kèm tài liệu và gợi ý khung giờ cụ thể',
      'Kết thư lịch sự ("Sincerely," / "Best regards,")',
    ],
  },
  {
    id: 'aw-email-intern',
    type: 'Email xin thực tập',
    title: 'Email ứng tuyển vị trí Thực tập sinh (Internship Application)',
    level: 'B1',
    recommendedWords: 140,
    promptVi:
      'Viết email gửi bộ phận Tuyển dụng (HR) ứng tuyển vị trí Thực tập sinh (Data Analyst / Software / Marketing Intern). Nêu rõ trường đang học, 1 dự án/kỹ năng nổi bật và thời gian có thể đi làm.',
    promptEn:
      'Write a professional internship application email to a hiring manager. Mention your current university major, one relevant academic project or technical skill, your availability, and reference your attached CV.',
    keywordsEn: ['applying for', 'undergraduate', 'relevant experience', 'attached my CV', 'contribute', 'interview'],
    structureOutline: [
      'Subject: Application for [Role] Intern – [Your Full Name] – [University]',
      'Salutation: Dear Hiring Manager / Dear [Name],',
      'Paragraph 1: Vị trí ứng tuyển, biết thông tin từ đâu, đang là sinh viên năm mấy ngành gì',
      'Paragraph 2: 1–2 kỹ năng hoặc dự án môn học chứng minh năng lực sát mô tả công việc',
      'Paragraph 3: Thời gian sẵn sàng thực tập (VD: full-time/part-time từ tháng...), đính kèm CV & lời cảm ơn',
    ],
    sampleBandHigh: `Subject: Application for Business Analyst Intern – Linh Pham (FTU)

Dear Hiring Manager,

I am writing to express my strong interest in applying for the Business Analyst Intern position at Horizon Tech, as advertised on your careers portal. I am currently a final-year undergraduate majoring in Management Information Systems, maintaining a GPA of 3.6/4.0.

Through my coursework and a recent university capstone project, I gained hands-on relevant experience using SQL, Excel, and Power BI to analyze customer retention datasets and present actionable insights. I am eager to apply these analytical skills and contribute effectively to your product analytics team.

I have attached my CV for your review and am available for a full-time three-month internship starting next month. Thank you very much for considering my application, and I would welcome the opportunity to discuss my fit in an interview.

Best regards,
Linh Pham`,
    gradingChecklistVi: [
      'Tiêu đề email ghi rõ vị trí ứng tuyển và họ tên',
      'Nhấn mạnh giá trị/dự án thực tế thay vì chỉ nói "em rất chăm chỉ"',
      'Nêu rõ thời gian có thể bắt đầu thực tập và đính kèm CV',
    ],
  },
  {
    id: 'aw-email-rec',
    type: 'Email giảng viên',
    title: 'Email nhờ Giảng viên viết Thư giới thiệu học bổng (Recommendation Letter)',
    level: 'B2',
    recommendedWords: 150,
    promptVi:
      'Bạn sắp nộp hồ sơ học bổng trao đổi sinh viên (Exchange Scholarship). Hãy viết email trang trọng nhờ giảng viên từng dạy bạn môn chuyên ngành viết giúp Thư giới thiệu trước hạn nộp 3 tuần.',
    promptEn:
      'Write a courteous email to a professor who taught you last semester, politely asking if they would be willing to write a letter of recommendation for your exchange scholarship application, noting the deadline.',
    keywordsEn: ['letter of recommendation', 'scholarship', 'coursework', 'deadline', 'hesitate', 'grateful'],
    structureOutline: [
      'Subject: Request for Letter of Recommendation – [Scholarship Name] – [Your Name]',
      'Opening: Nhắc lại môn học & học kỳ bạn từng học thầy/cô để thầy/cô nhớ ngay',
      'Request: Nêu tên học bổng, trường/tổ chức và hỏi khéo xem thầy/cô có thuận tiện nhận lời không',
      'Support details: Nêu rõ deadline, đính kèm CV, bảng điểm & bản nháp mục tiêu cá nhân để thầy/cô dễ viết',
      'Closing: Biết ơn và tạo lối thoát lịch sự nếu thầy/cô bận',
    ],
    sampleBandHigh: `Subject: Request for Letter of Recommendation – ASEAN Exchange Scholarship – Huy Nguyen

Dear Professor Le,

I hope you are having a productive semester. I am Huy Nguyen, and I took your Macroeconomics Policy course last spring, where I completed a term paper on green fiscal incentives.

I am currently applying for the ASEAN Undergraduate Exchange Scholarship, and I am writing to ask whether you would feel comfortable writing a strong letter of recommendation on my behalf. Having greatly valued your mentorship during the seminar, I believe your perspective on my analytical work would add tremendous weight to my application.

The submission deadline is November 30. Should you agree, I have attached my updated CV, academic transcript, and a summary of my study plan for your convenience. Please do not hesitate to let me know if your schedule does not permit this.

I am deeply grateful for your time and continued support.

Sincerely,
Huy Nguyen`,
    gradingChecklistVi: [
      'Nhắc lại cụ thể môn học/dự án từng làm với giảng viên',
      'Hỏi lịch sự ("would feel comfortable writing...") thay vì mặc định ép buộc',
      'Gửi trước deadline ít nhất 2–3 tuần và đính kèm sẵn CV/bảng điểm',
    ],
  },
  {
    id: 'aw-essay-cause',
    type: 'Essay: Cause-Effect',
    title: 'Academic Essay (Cause–Effect): Tác động của AI tạo sinh tới việc học Đại học',
    level: 'B2',
    recommendedWords: 240,
    promptVi:
      'Viết bài luận học thuật (khoảng 220–260 từ) phân tích nguyên nhân khiến sinh viên phụ thuộc vào công cụ AI tạo sinh và hai hệ quả chính đối với tư duy phản biện lẫn quy trình đánh giá của nhà trường.',
    promptEn:
      'Write an academic cause-and-effect essay (220–260 words) analyzing why undergraduates increasingly rely on generative AI tools and the major effects this trend has on critical thinking and university assessment.',
    keywordsEn: ['proliferation', 'consequently', 'furthermore', 'critical thinking', 'mitigate', 'implications'],
    structureOutline: [
      'Introduction: Bối cảnh phổ biến của AI ở ĐH + Thesis statement nêu rõ nguyên nhân & hệ quả',
      'Body 1 (Causes): Áp lực điểm số/thời hạn + sự tiện lợi tức thì của công cụ tạo sinh',
      'Body 2 (Effects): Hệ quả tích cực/tiêu cực (nguy cơ xói mòn tư duy phản biện, đạo văn vs đòi hỏi đổi mới cách đánh giá)',
      'Conclusion: Tóm lại luận điểm + khuyến nghị tích hợp AI có trách nhiệm',
    ],
    sampleBandHigh: `The rapid proliferation of generative artificial intelligence has transformed how undergraduate students research, draft, and revise academic assignments. While intense academic deadlines and the immediate convenience of automated drafting drive widespread adoption, this reliance carries profound implications for both student cognition and institutional assessment.

Two primary factors explain why students turn to AI tools. First, heavy coursework loads combined with part-time jobs often create severe time pressure, tempting learners to prioritize speed over deep comprehension. Second, accessible chatbots provide instant summaries and polished prose, lowering the perceived effort required to complete complex tasks.

Consequently, uncritical dependence on AI produces significant effects. On an individual level, bypassing the struggle of outlining and revising can erode students' independent critical thinking and writing fluency. At the institutional level, traditional take-home essays can no longer reliably measure genuine mastery, forcing faculties to redesign rubrics toward oral defenses, process portfolios, and in-class problem-solving. Furthermore, universities face heightened ethical challenges in distinguishing legitimate brainstorming from academic dishonesty.

In conclusion, although time pressure fuels reliance on generative AI, its long-term impact depends on pedagogical adaptation. By teaching transparent AI literacy and emphasizing authentic assessment, universities can mitigate cognitive dependency while preparing graduates for an AI-augmented workplace.`,
    gradingChecklistVi: [
      'Mở bài có Thesis Statement chỉ rõ cả Nguyên nhân (Causes) và Hệ quả (Effects)',
      'Sử dụng từ nối học thuật chuẩn (Consequently, Furthermore, In conclusion)',
      'Tránh văn nói (không viết tắt don’t/can’t, không dùng "I think a lot of kids")',
    ],
  },
  {
    id: 'aw-essay-arg',
    type: 'Essay: Argumentative',
    title: 'Academic Essay (Argumentative): Kỹ năng thực hành vs. Nền tảng lý thuyết ở ĐH',
    level: 'B2',
    recommendedWords: 250,
    promptVi:
      'Một số người cho rằng chương trình đại học nên tập trung hoàn toàn vào kỹ năng nghề nghiệp thực hành, trong khi số khác đề cao nền tảng lý thuyết chuyên sâu. Hãy viết bài luận nghị luận trình bày quan điểm cân bằng và có lập luận phản biện (counter-argument).',
    promptEn:
      'Some argue that university curricula should focus primarily on practical job-ready skills, whereas others maintain that strong theoretical foundations remain essential. Write an argumentative essay defending your position.',
    keywordsEn: ['curriculum', 'empirical', 'paradigm', 'counterargument', 'sustainable', 'nevertheless'],
    structureOutline: [
      'Introduction: Giới thiệu tranh luận + Luận điểm chính (Thesis)',
      'Body 1: Lý do kỹ năng thực hành quan trọng cho khả năng có việc làm ngay sau tốt nghiệp',
      'Body 2 (Counter-argument & Rebuttal): Tại sao chỉ học kỹ năng ngắn hạn dễ lỗi thời; nền tảng lý thuyết giúp thích ứng dài hạn',
      'Conclusion: Tổng hợp giải pháp dung hòa (applied theory + capstone projects)',
    ],
    sampleBandHigh: `As industries evolve at an unprecedented pace, educators frequently debate whether higher education curricula should prioritize immediate vocational skills or enduring theoretical foundations. Although hands-on competence facilitates smoother campus-to-career transitions, I contend that universities must preserve rigorous theoretical training alongside practical application to ensure sustainable career adaptability.

Admittedly, practical skills such as software tooling, laboratory protocols, and project management directly enhance graduate employability. Employers increasingly expect entry-level candidates to contribute immediately without lengthy onboarding. Integrating internships and industry capstone projects into degree programs therefore addresses a legitimate labor-market demand.

Nevertheless, reducing university education solely to technical training is shortsighted. Specific tools and software frameworks undergo rapid paradigm shifts; what is standard during a freshman year may become obsolete by graduation. Strong theoretical grounding in mathematics, economics, or scientific methodology equips students with transferable analytical habits, enabling them to master emerging technologies independently. To illustrate, an engineer grounded in core algorithmic principles adapts far faster to new programming languages than one trained purely on syntax shortcuts.

In summary, theory and practice should not be framed as mutually exclusive opposites. By embedding empirical projects within a solid conceptual curriculum, universities can graduate professionals who are both immediately productive and intellectually resilient.`,
    gradingChecklistVi: [
      'Nêu quan điểm rõ ràng ngay ở câu cuối mở bài (Thesis Statement)',
      'Có đoạn thừa nhận ý đối lập rồi phản biện lại (Admittedly... Nevertheless...)',
      'Ví dụ minh họa mang tính học thuật/chuyên ngành thuyết phục',
    ],
  },
  {
    id: 'aw-essay-prob',
    type: 'Essay: Problem-Solution',
    title: 'Academic Essay (Problem–Solution): Thu hẹp khoảng cách kỹ năng từ Giảng đường tới Doanh nghiệp',
    level: 'C1',
    recommendedWords: 240,
    promptVi:
      'Nhiều cử nhân mới ra trường gặp khó khăn đáp ứng yêu cầu doanh nghiệp dù có điểm số tốt. Hãy phân tích nguyên nhân của khoảng cách kỹ năng này và đề xuất 2 giải pháp khả thi cho nhà trường và sinh viên.',
    promptEn:
      'Write a problem-solution essay examining the skills gap between university graduates and industry expectations, and propose two feasible solutions involving both institutions and students.',
    keywordsEn: ['disparity', 'employability', 'curriculum', 'integrate', 'collaborative', 'preliminary'],
    structureOutline: [
      'Introduction: Thực trạng nghịch lý bằng giỏi nhưng thiếu kỹ năng thực tế + định hướng bài viết',
      'Body 1 (Problems): Chương trình nặng lý thuyết đơn lẻ, thiếu làm việc nhóm liên ngành & giao tiếp chuyên nghiệp',
      'Body 2 (Solutions): (1) Nhà trường tích hợp dự án doanh nghiệp & đánh giá portfolio; (2) Sinh viên chủ động thực tập sớm & CLB học thuật',
      'Conclusion: Khẳng định trách nhiệm song phương để nâng cao năng lực sẵn sàng nghề nghiệp',
    ],
    sampleBandHigh: `Despite achieving strong academic grades, a growing number of recent university graduates struggle to meet workplace expectations during their initial months of employment. This skills disparity stems largely from outdated assessment formats and limited real-world exposure, yet it can be effectively narrowed through coordinated institutional reform and proactive student engagement.

The primary root of the mismatch lies in conventional university instruction that isolates disciplines and rewards rote memorization. When coursework relies exclusively on individual written exams, students rarely practice cross-functional teamwork, stakeholder communication, or solving ambiguous open-ended problems. Consequently, graduates may understand abstract concepts without knowing how to apply them under business constraints.

Addressing this challenge requires a dual approach. First, faculties should integrate industry-sponsored capstone projects and simulated case studies into senior-year curricula, allowing undergraduates to receive preliminary feedback from practicing mentors. Second, students themselves must become autonomous learners by pursuing summer internships, undergraduate research labs, or leadership roles in campus organizations to build verifiable project portfolios before graduation.

Ultimately, closing the campus-to-industry gap is a shared responsibility. When modernized curricula intersect with proactive experiential learning, graduates enter the workforce with both conceptual rigor and practical confidence.`,
    gradingChecklistVi: [
      'Phân tích trúng nguyên nhân cốt lõi chứ không chỉ liệt kê chung chung',
      'Giải pháp cụ thể cho cả hai phía (Nhà trường & Sinh viên) kèm cơ chế thực thi',
      'Vốn từ học thuật chính xác (disparity, integrate, preliminary, autonomous)',
    ],
  },
  {
    id: 'aw-ps',
    type: 'Personal Statement',
    title: 'Personal Statement xin Học bổng Trao đổi / Sau đại học',
    level: 'C1',
    recommendedWords: 220,
    promptVi:
      'Viết đoạn Personal Statement (khoảng 200–240 từ) giải thích động lực học tập, thành tích/dự án tiêu biểu và lý do bạn phù hợp với học bổng trao đổi sinh viên quốc tế.',
    promptEn:
      'Write a compelling Personal Statement (200–240 words) for an international exchange scholarship, highlighting your academic motivation, a concrete research or leadership experience, and how the program aligns with your future goals.',
    keywordsEn: ['motivated', 'interdisciplinary', 'empirical', 'contribute', 'perspective', 'long-term'],
    structureOutline: [
      'Hook & Motivation: Câu chuyện hoặc câu hỏi chuyên môn khơi nguồn đam mê ngành học',
      'Academic Evidence: 1 dự án nghiên cứu / ngoại khóa chứng minh năng lực & phẩm chất',
      'Why this Program/Host: Lý do chọn trường/học bổng đó & đóng góp bạn mang lại cho cộng đồng',
      'Future Impact: Kế hoạch áp dụng kiến thức sau khi trở về Việt Nam',
    ],
    sampleBandHigh: `My interest in sustainable urban mobility began during a freshman field survey in Ho Chi Minh City, where I observed how inefficient bus routing disproportionately affects low-income commuters. That experience motivated me to bridge civil engineering with data analytics throughout my undergraduate studies.

During my sophomore year, I led a four-student research team analyzing public transit GPS datasets. Despite preliminary setbacks in cleaning noisy sensor logs, we designed a predictive demand model that won second prize at our university's annual science conference. Beyond technical rigor, coordinating teammates across different majors taught me how to synthesize diverse perspectives into coherent, actionable recommendations.

Participating in the Global Exchange Program at your institution represents a vital step toward my long-term goal of designing equitable smart-city infrastructure in Vietnam. I am particularly eager to enroll in your Urban Informatics seminar and collaborate with professors pioneering open-data transit protocols. In return, I hope to enrich classroom discussions by sharing empirical case studies from rapidly urbanizing Southeast Asian megacities.

Ultimately, this exchange will equip me with interdisciplinary frameworks that I intend to apply to sustainable public transportation initiatives upon returning home.`,
    gradingChecklistVi: [
      'Áp dụng nguyên tắc "Show, don’t tell" (nêu dự án/kết quả cụ thể thay vì tự khen suông)',
      'Thể hiện sự tìm hiểu về chương trình/trường tiếp nhận và đóng góp hai chiều',
      'Mạch kết nối rõ ràng giữa Quá khứ (Kinh nghiệm) → Hiện tại (Học bổng) → Tương lai',
    ],
  },
  {
    id: 'aw-cover-letter',
    type: 'Cover Letter',
    title: 'Cover Letter chuẩn quốc tế ứng tuyển Thực tập sinh / Fresher',
    level: 'B2',
    recommendedWords: 200,
    promptVi:
      'Viết một Cover Letter ngắn gọn, thuyết phục (180–220 từ) ứng tuyển vị trí Thực tập sinh tại một tập đoàn đa quốc gia. Nhấn mạnh sự phù hợp văn hóa công ty và 1 thành tích định lượng được.',
    promptEn:
      'Write a tailored Cover Letter (180–220 words) for an internship at a multinational firm. Demonstrate knowledge of the company, highlight one quantified achievement from university or club work, and close with a call to action.',
    keywordsEn: ['enthusiasm', 'quantifiable', 'collaborated', 'aligns with', 'internship', 'sincerely'],
    structureOutline: [
      'Header & Salutation: Dear Recruitment Team / Dear Ms. [Name],',
      'Opening: Nêu vị trí, lý do hứng thú cụ thể với sứ mệnh/sản phẩm của công ty',
      'Body (Value Proposition): 1–2 thành tích có số liệu (tăng %, tiết kiệm thời gian, quy mô sự kiện)',
      'Closing: Kết nối mục tiêu phát triển bản thân + lời mời trao đổi phỏng vấn',
    ],
    sampleBandHigh: `Dear Recruitment Team,

I am writing to apply for the Product Operations Intern role at NovaPay. Having followed NovaPay's recent expansion of contactless campus payment solutions, I admire how your team simplifies everyday transactions for Vietnamese students—a mission that closely aligns with my passion for user-centered fintech.

As Vice President of the University FinTech Club, I collaborated with five peers to organize an inter-university case competition attracting over 350 participants. By redesigning our digital registration workflow and automating confirmation emails, I reduced manual processing time by 40 percent and improved participant satisfaction scores. Additionally, my coursework in database systems and business analytics has equipped me to translate user feedback into structured product reports.

I am eager to bring this analytical mindset, strong cross-team communication, and eagerness to learn to NovaPay's operations team during a full-time summer internship. Thank you for considering my application; I look forward to the opportunity to discuss how I can contribute to your upcoming initiatives.

Sincerely,
An Nguyen`,
    gradingChecklistVi: [
      'Thể hiện đã tìm hiểu công ty cụ thể chứ không rải thư đại trà',
      'Có số liệu định lượng cụ thể (350 participants, reduced by 40%)',
      'Ngắn gọn dưới 1 trang, súc tích, không lặp lại nguyên xi CV',
    ],
  },
  {
    id: 'aw-cv-summary',
    type: 'CV Summary',
    title: 'Viết CV Summary & Bullet Points chuẩn ATS (Công thức XYZ)',
    level: 'B2',
    recommendedWords: 110,
    promptVi:
      'Viết phần Career Summary (3 câu) ở đầu CV tiếng Anh kèm 3 gạch đầu dòng (Bullet points) mô tả kinh nghiệm dự án/CLB theo công thức Google XYZ: "Accomplished [X] as measured by [Y], by doing [Z]".',
    promptEn:
      'Write an ATS-friendly CV Professional Summary (3 lines) followed by 3 achievement bullet points describing your academic project or student club experience using strong action verbs and quantified impact (XYZ formula).',
    keywordsEn: ['final-year', 'proficient in', 'spearheaded', 'optimized', 'resulting in', 'cross-functional'],
    structureOutline: [
      'Professional Summary (2–3 câu): Năm học/ngành + Kỹ năng cốt lõi + Mục tiêu giá trị mang lại cho doanh nghiệp',
      'Bullet 1 (Technical/Academic Project): Động từ mạnh + Công nghệ/Phương pháp + Kết quả đo lường',
      'Bullet 2 (Teamwork/Leadership): Phối hợp bao nhiêu người + Quy mô đạt được',
      'Bullet 3 (Process Improvement): Tối ưu/Cải thiện quy trình gì + Con số % hoặc thời gian tiết kiệm',
    ],
    sampleBandHigh: `PROFESSIONAL SUMMARY
Detail-oriented final-year Information Technology undergraduate (GPA: 3.55/4.0) proficient in Python, SQL, and React. Demonstrated ability to build scalable web applications through capstone projects and peer-mentoring leadership. Seeking a Software Engineer Intern role to contribute clean, well-tested code to agile product teams.

PROJECT & LEADERSHIP HIGHLIGHTS
• Engineered an automated campus shuttle tracking web app using React and REST APIs, reducing student wait-time uncertainty by 30% across 200+ beta testers.
• Spearheaded a cross-functional team of 5 students to deliver an e-commerce analytics dashboard two weeks ahead of the academic deadline.
• Streamlined weekly club workshop onboarding by creating standardized Notion templates, cutting volunteer preparation time by 4 hours per event.`,
    gradingChecklistVi: [
      'Summary không dùng đại từ "I/My", bắt đầu trực tiếp bằng tính từ/danh từ chuyên môn',
      'Mỗi bullet point bắt đầu bằng Action Verb mạnh (Engineered, Spearheaded, Streamlined)',
      'Mỗi bullet có số liệu định lượng rõ ràng (30%, 200+, 5 students, 4 hours)',
    ],
  },
];

// =========================================================
// 4. GÓC CHUẨN ĐẦU RA ĐH & HƯỚNG DẪN CV CHUẨN ATS
// =========================================================

export interface GraduationStandardRow {
  id: string;
  examName: string;
  cefrTarget: string;
  commonThreshold: string;
  advancedThreshold: string;
  validity: string;
  universityUseCaseVi: string;
  studyTipVi: string;
}

export const GRADUATION_STANDARDS: GraduationStandardRow[] = [
  {
    id: 'std-vstep',
    examName: 'VSTEP (Khung 6 bậc VN)',
    cefrTarget: 'Bậc 3 (B1) – Bậc 4 (B2)',
    commonThreshold: 'B1 (4.0 – 5.5 / 10)',
    advancedThreshold: 'B2 (6.0 – 8.0 / 10)',
    validity: 'Thường 2 năm (theo quy định từng trường)',
    universityUseCaseVi: 'Chuẩn đầu ra phổ biến nhất cho SV không chuyên (B1) và chương trình chất lượng cao / sư phạm / cao học (B2).',
    studyTipVi: 'Luyện chắc mẫu viết thư & luận 250 từ (chiếm 2/3 điểm Writing) và phản xạ 3 phần Speaking (Tương tác xã hội, Thảo luận giải pháp, Phát triển chủ đề).',
  },
  {
    id: 'std-toeic',
    examName: 'TOEIC (L&R / 4 Kỹ năng)',
    cefrTarget: 'B1 – B2',
    commonThreshold: '450 – 550+ (L&R)',
    advancedThreshold: '600 – 750+ (hoặc kèm S&W 250+)',
    validity: '2 năm (ETS Quốc tế)',
    universityUseCaseVi: 'Được nhiều trường ĐH Kỹ thuật, Kinh tế & Doanh nghiệp lớn chấp nhận xét tốt nghiệp và tuyển thực tập.',
    studyTipVi: 'Kiểm tra kỹ trường bạn yêu cầu TOEIC 2 kỹ năng (L&R) hay bắt buộc 4 kỹ năng (L&R + S&W) trước khi đăng ký thi.',
  },
  {
    id: 'std-ielts',
    examName: 'IELTS Academic',
    cefrTarget: 'B1 – C1',
    commonThreshold: '5.0 – 5.5',
    advancedThreshold: '6.0 – 6.5+',
    validity: '2 năm',
    universityUseCaseVi: 'Miễn học phần tiếng Anh, chuẩn đầu ra chương trình tiên tiến/tiếng Anh toàn phần, điều kiện xét học bổng & du học.',
    studyTipVi: 'Chú trọng từ vựng AWL, Collocations và cấu trúc câu phức để vượt ngưỡng 6.0+ ở Writing Task 2 và Speaking Part 3.',
  },
  {
    id: 'std-toefl',
    examName: 'TOEFL iBT / Cambridge',
    cefrTarget: 'B1 – B2+',
    commonThreshold: 'TOEFL 45–60 | PET (B1)',
    advancedThreshold: 'TOEFL 72–94 | FCE (B2)',
    validity: 'TOEFL 2 năm | Cambridge trọn đời',
    universityUseCaseVi: 'Phù hợp sinh viên định hướng du học Bắc Mỹ (TOEFL) hoặc cần chứng chỉ không hết hạn (Cambridge B1 PET / B2 FCE).',
    studyTipVi: 'Luyện kỹ năng ghi chú (note-taking) nghe bài giảng học thuật dài và đọc hiểu suy luận.',
  },
];

export interface YearRoadmapTip {
  year: 1 | 2 | 3 | 4;
  focusTitle: string;
  recommendedScoreTarget: string;
  milestones: string[];
}

export const UNIVERSITY_YEAR_ROADMAP: YearRoadmapTip[] = [
  {
    year: 1,
    focusTitle: 'Năm 1: Xây nền IPA, Ngữ pháp & Miễn học phần',
    recommendedScoreTarget: 'A2+ → B1 (VSTEP 4.0 / TOEIC 450+)',
    milestones: [
      'Chuẩn hóa phát âm IPA để nghe hiểu bài giảng và không ngại nói tiếng Anh trên lớp.',
      'Hoàn thành 500–800 từ vựng nền tảng + bắt đầu làm quen nhóm từ AWL cơ bản.',
      'Đặt mục tiêu đạt chuẩn miễn các học phần tiếng Anh đại cương nếu trường áp dụng.',
    ],
  },
  {
    year: 2,
    focusTitle: 'Năm 2: Đọc tài liệu chuyên ngành & Tăng tốc Chuẩn đầu ra',
    recommendedScoreTarget: 'B1+ → B2 (VSTEP B1–B2 / TOEIC 550–650 / IELTS 5.5)',
    milestones: [
      'Đọc lướt Abstracts tiếng Anh môn chuyên ngành & trích xuất từ khóa bằng OCR/AWL.',
      'Thực hành thuyết trình nhóm và phản biện ngắn trong các buổi Seminar.',
      'Thi thử để xác định khoảng cách với chuẩn đầu ra của trường.',
    ],
  },
  {
    year: 3,
    focusTitle: 'Năm 3: Thi chứng chỉ Đầu ra & Sẵn sàng Thực tập',
    recommendedScoreTarget: 'B2 (TOEIC 650–750+ / IELTS 6.0–6.5 / VSTEP B2)',
    milestones: [
      'Hoàn thành chứng chỉ chuẩn đầu ra ngay trong năm 3 để năm 4 tập trung đồ án & đi làm.',
      'Hoàn thiện CV tiếng Anh chuẩn ATS + Cover Letter + Email xin thực tập.',
      'Luyện viết bài luận / báo cáo học thuật phục vụ nghiên cứu khoa học sinh viên.',
    ],
  },
  {
    year: 4,
    focusTitle: 'Năm 4: Khóa luận, Phỏng vấn Fresher & Học bổng',
    recommendedScoreTarget: 'B2+ → C1 (IELTS 6.5+ / TOEIC 750+)',
    milestones: [
      'Viết Tóm tắt khóa luận (Abstract) và bảo vệ đồ án bằng tiếng Anh tự tin.',
      'Luyện trả lời phỏng vấn hành vi STAR và thương lượng offer thực tập/fresher.',
      'Chuẩn bị Personal Statement & Email xin thư giới thiệu nếu xét học bổng cao học.',
    ],
  },
];

export interface AtsSectionGuide {
  id: string;
  sectionTitle: string;
  doList: string[];
  avoidList: string[];
  sampleLineEn: string;
}

export const ATS_CV_GUIDES: AtsSectionGuide[] = [
  {
    id: 'ats-layout',
    sectionTitle: '1. Bố cục & Định dạng chuẩn máy lọc ATS',
    doList: [
      'Dùng bố cục 1 cột rõ ràng, font phổ biến (Inter, Arial, Calibri, Roboto) cỡ 10.5–11.5pt.',
      'Xuất file PDF dạng text chọn được chữ (không xuất ảnh JPEG/PNG dán vào PDF).',
      'Đặt tên file chuyên nghiệp: FullName_Role_CV.pdf (VD: MinhTran_DataIntern_CV.pdf).',
    ],
    avoidList: [
      'Tránh bảng biểu phức tạp (multi-column tables), icon thanh % kỹ năng tự chấm (VD: "English: 4/5 sao").',
      'Tránh header/footer chứa thông tin liên hệ quan trọng vì một số hệ thống ATS bỏ qua vùng này.',
    ],
    sampleLineEn: 'Minh Tran | Ho Chi Minh City | minh.tran@email.com | linkedin.com/in/minhtran | github.com/minhtran',
  },
  {
    id: 'ats-edu',
    sectionTitle: '2. Học vấn (Education) dành cho Sinh viên chưa nhiều kinh nghiệm',
    doList: [
      'Đặt mục Education lên trên cùng (ngay sau Summary) nếu bạn đang là sinh viên hoặc mới tốt nghiệp.',
      'Ghi GPA (nếu từ 3.2/4.0 trở lên), học bổng đã đạt, và 3–4 môn chuyên ngành liên quan (Relevant Coursework).',
    ],
    avoidList: [
      'Không cần liệt kê cấp 1, cấp 2 hay các môn đại cương không liên quan vị trí ứng tuyển.',
    ],
    sampleLineEn: 'B.S. in Computer Science, University of Science (Expected Jun 2026) | GPA: 3.62/4.0 | Relevant Coursework: Data Structures, Machine Learning, Database Systems',
  },
  {
    id: 'ats-exp',
    sectionTitle: '3. Kinh nghiệm & Dự án theo công thức Action Verb + Task + Result (XYZ)',
    doList: [
      'Mỗi gạch đầu dòng bắt đầu bằng động từ hành động mạnh (Developed, Analyzed, Coordinated) ở thì quá khứ (hoặc hiện tại nếu đang làm).',
      'Lượng hóa kết quả bằng con số (%, số người dùng, thời gian tiết kiệm, quy mô dữ liệu).',
      'Lặp lại tự nhiên các từ khóa kỹ năng có trong Mô tả công việc (JD).',
    ],
    avoidList: [
      'Tránh viết chung chung kiểu nhiệm vụ thụ động ("Responsible for helping with marketing", "Hard-working team player").',
    ],
    sampleLineEn: 'Analyzed 15,000+ survey responses using Python (Pandas) and built an interactive Power BI dashboard, cutting weekly reporting time by 35%.',
  },
];

export interface ActionVerbGroup {
  category: string;
  verbs: string[];
  exampleBulletEn: string;
  exampleBulletVi: string;
}

export const CV_ACTION_VERB_GROUPS: ActionVerbGroup[] = [
  {
    category: 'Kỹ thuật & Xây dựng sản phẩm',
    verbs: ['Engineered', 'Architected', 'Automated', 'Optimized', 'Integrated', 'Deployed'],
    exampleBulletEn: 'Automated regression test suites with Playwright, reducing pre-release QA time by 45%.',
    exampleBulletVi: 'Tự động hóa bộ kiểm thử hồi quy bằng Playwright, giảm 45% thời gian QA trước khi phát hành.',
  },
  {
    category: 'Nghiên cứu & Phân tích dữ liệu',
    verbs: ['Analyzed', 'Evaluated', 'Synthesized', 'Modeled', 'Validated', 'Forecasted'],
    exampleBulletEn: 'Evaluated credit-risk variables across 8,000 customer records, improving model precision by 12%.',
    exampleBulletVi: 'Đánh giá các biến rủi ro tín dụng trên 8.000 hồ sơ khách hàng, cải thiện độ chính xác mô hình thêm 12%.',
  },
  {
    category: 'Lãnh đạo, Dự án & Hoạt động CLB',
    verbs: ['Spearheaded', 'Coordinated', 'Facilitated', 'Mentored', 'Initiated', 'Streamlined'],
    exampleBulletEn: 'Spearheaded a 10-member organizing committee for an academic hackathon attracting 240 students.',
    exampleBulletVi: 'Dẫn dắt ban tổ chức 10 thành viên cho cuộc thi hackathon học thuật thu hút 240 sinh viên tham dự.',
  },
];

export interface GraduationQuizQuestion {
  id: string;
  category: 'Quy đổi chuẩn đầu ra' | 'Chiến thuật thi' | 'CV chuẩn ATS' | 'Văn phong học thuật';
  question: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
}

const BASE_GRADUATION_QUICK_QUIZ: GraduationQuizQuestion[] = [
  {
    id: 'gq-1',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Theo Khung năng lực ngoại ngữ 6 bậc dùng cho Việt Nam, chứng chỉ VSTEP bậc 3 tương ứng với trình độ CEFR nào?',
    options: ['A2 (Sơ cấp)', 'B1 (Trung cấp — chuẩn đầu ra ĐH phổ biến)', 'B2 (Trung cao cấp)', 'C1 (Cao cấp)'],
    correctIndex: 1,
    explanationVi: 'Khung 6 bậc VN quy định: Bậc 1 = A1, Bậc 2 = A2, Bậc 3 = B1, Bậc 4 = B2, Bậc 5 = C1, Bậc 6 = C2.',
  },
  {
    id: 'gq-2',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Điểm VSTEP từ 6.0 đến 8.0/10 tương ứng với mức chuẩn nào?',
    options: ['B1', 'B2', 'C1', 'Chưa đạt B1'],
    correctIndex: 1,
    explanationVi: 'Thang điểm 10 của VSTEP quy đổi: 4.0–5.5 đạt B1; 6.0–8.0 đạt B2; 8.5–10.0 đạt C1.',
  },
  {
    id: 'gq-3',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Khi trường ĐH yêu cầu chuẩn đầu ra "TOEIC 600+", bạn cần lưu ý điều gì quan trọng nhất trước khi đăng ký thi?',
    options: [
      'TOEIC chỉ có phần thi Đọc hiểu',
      'Kiểm tra xem trường yêu cầu TOEIC 2 kỹ năng (L&R) hay bắt buộc đủ 4 kỹ năng (L&R + S&W)',
      'Điểm TOEIC có giá trị vĩnh viễn suốt đời',
      'TOEIC 600 tương đương IELTS 8.0',
    ],
    correctIndex: 1,
    explanationVi: 'Nhiều trường ĐH gần đây đã chuyển từ chỉ xét TOEIC 2 kỹ năng (Nghe–Đọc) sang yêu cầu đủ 4 kỹ năng (thêm Nói–Viết). Chứng chỉ TOEIC cũng có hạn 2 năm.',
  },
  {
    id: 'gq-4',
    category: 'CV chuẩn ATS',
    question: 'Yếu tố nào sau đây dễ khiến hệ thống lọc CV tự động (ATS) đọc lỗi hồ sơ của bạn?',
    options: [
      'Dùng font Arial hoặc Calibri 11pt',
      'Xuất file PDF từ Canva có nhiều cột, bảng phức tạp và thanh % tự chấm kỹ năng bằng hình ảnh',
      'Đặt tiêu đề các mục chuẩn như Education, Experience, Skills',
      'Ghi rõ GPA và các môn học liên quan',
    ],
    correctIndex: 1,
    explanationVi: 'ATS thường đọc văn bản theo thứ tự từ trái sang phải, trên xuống dưới. Bố cục nhiều cột phức tạp hoặc chữ lưu dưới dạng ảnh/thanh icon dễ làm mất dữ liệu khi trích xuất text.',
  },
  {
    id: 'gq-5',
    category: 'CV chuẩn ATS',
    question: 'Cách viết gạch đầu dòng nào trong CV chuẩn công thức XYZ (tác động định lượng) nhất?',
    options: [
      'Responsible for social media posts and helped the team every week.',
      'Good at Python, Excel, and teamwork in university clubs.',
      'Redesigned the club newsletter layout and scheduled posts, growing student readership by 42% over one semester.',
      'I worked hard to manage many events for students.',
    ],
    correctIndex: 2,
    explanationVi: 'Câu C bắt đầu bằng động từ mạnh ("Redesigned"), nêu hành động cụ thể và có con số đo lường kết quả ("growing student readership by 42%").',
  },
  {
    id: 'gq-6',
    category: 'Văn phong học thuật',
    question: 'Khi viết Email gửi giảng viên Việt Nam hoặc nước ngoài bằng tiếng Anh, cách mở đầu nào chuyên nghiệp nhất?',
    options: [
      'Hi teacher,',
      'Dear Mr./Ms. Teacher,',
      'Dear Dr. Nguyen, / Dear Professor Nguyen,',
      'Hey prof, I need your help',
    ],
    correctIndex: 2,
    explanationVi: 'Trong môi trường đại học quốc tế, luôn gọi đúng học vị/chức danh kèm họ: "Dear Dr. [Họ]," (Tiến sĩ) hoặc "Dear Professor [Họ],". Tránh dùng "Hi teacher".',
  },
  {
    id: 'gq-7',
    category: 'Văn phong học thuật',
    question: 'Trong bài luận học thuật (Academic Essay) hoặc báo cáo nghiên cứu, câu nào có văn phong phù hợp nhất?',
    options: [
      'A lot of kids don’t wanna read boring textbooks anymore.',
      'Empirical evidence suggests that passive reading yields lower retention than active recall.',
      'I think this problem is super bad and we gotta fix it ASAP.',
      'Stuff like AI is kinda changing everything in school.',
    ],
    correctIndex: 1,
    explanationVi: 'Văn phong học thuật (Academic Register) tránh viết tắt (don’t), tiếng lóng (wanna/gotta/kinda/stuff) và ưu tiên cấu trúc khách quan kèm từ vựng AWL.',
  },
  {
    id: 'gq-8',
    category: 'Chiến thuật thi',
    question: 'Chứng chỉ nào sau đây có giá trị sử dụng vĩnh viễn (không hết hạn sau 2 năm)?',
    options: ['IELTS Academic', 'TOEIC L&R', 'TOEFL iBT', 'Cambridge English (B1 Preliminary / B2 First)'],
    correctIndex: 3,
    explanationVi: 'Các chứng chỉ của Cambridge Assessment English (KET, PET, FCE, CAE...) có giá trị trọn đời, trong khi IELTS, TOEIC, TOEFL iBT thường có hiệu lực 2 năm.',
  },
];

export const AWL_WORDS: AwlWordItem[] = [
  ...BASE_AWL_WORDS,
  ...AWL_WORDS_EXTRA,
  ...AWL_WORDS_EXTRA_2,
];

export const PRESENTATION_PHRASES: PresentationPhrase[] = [
  ...BASE_PRESENTATION_PHRASES,
  ...PRESENTATION_PHRASES_EXTRA,
];

export const SEMINAR_PHRASES: SeminarPhrase[] = [
  ...BASE_SEMINAR_PHRASES,
  ...SEMINAR_PHRASES_EXTRA,
];

export const ACADEMIC_ABSTRACTS: AcademicAbstract[] = [
  ...BASE_ACADEMIC_ABSTRACTS,
  ...ACADEMIC_ABSTRACTS_EXTRA,
];

export const ACADEMIC_WRITING_PROMPTS: AcademicWritingPrompt[] = [
  ...BASE_ACADEMIC_WRITING_PROMPTS,
  ...ACADEMIC_WRITING_EXTRA,
  ...ACADEMIC_WRITING_EXTRA_2,
];

export const GRADUATION_QUICK_QUIZ: GraduationQuizQuestion[] = [
  ...BASE_GRADUATION_QUICK_QUIZ,
  ...GRADUATION_QUIZ_EXTRA,
];

import {
  WorkplaceMeetingPhrase,
  WorkplaceEmailTemplate,
  WorkplaceStarQuestion,
  WorkplaceCaseSituation,
} from './workplaceScenariosData';

export const WORKPLACE_MEETING_EXTRA: WorkplaceMeetingPhrase[] = [
  // 1. Đời sống & Giao tiếp (13)
  {
    id: 'wm-ex-1',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Good morning everyone, I am covering the front desk schedule today and coordinating with the admin team.',
    ipa: '/ɡʊd ˈmɔːrnɪŋ ˈevriwʌn aɪ æm ˈkʌvərɪŋ ðə frʌnt desk ˈskedʒuːl təˈdeɪ ænd koʊˈɔːrdɪneɪtɪŋ wɪð ði ˈædmɪn tiːm/',
    vi: 'Chào buổi sáng mọi người, hôm nay tôi phụ trách lịch quầy lễ tân và phối hợp với nhóm hành chính.',
    context: 'Mở đầu buổi họp ngắn đầu ngày khi giới thiệu đầu việc cá nhân.',
    politenessTip: 'Dùng "covering" nghe chuyên nghiệp hơn "doing" khi nói về ca trực hoặc đầu việc.',
  },
  {
    id: 'wm-ex-2',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'We have completed ninety percent of the venue setup, and the remaining signage will be ready by noon.',
    ipa: '/wi hæv kəmˈpliːtɪd ˈnaɪnti pərˈsent əv ðə ˈvenjuː ˈsetʌp ænd ðə rɪˈmeɪnɪŋ ˈsaɪnɪdʒ wɪl bi ˈredi baɪ nuːn/',
    vi: 'Chúng tôi đã hoàn tất 90% khâu chuẩn bị địa điểm, phần biển chỉ dẫn còn lại sẽ xong trước trưa.',
    context: 'Báo cáo tiến độ chuẩn bị sự kiện nội bộ hoặc đón tiếp đối tác.',
    politenessTip: 'Nêu tỷ lệ phần trăm và mốc giờ cụ thể giúp người nghe dễ nắm bắt tình hình.',
  },
  {
    id: 'wm-ex-3',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Would anyone prefer a different time slot for our weekly team catch-up?',
    ipa: '/wʊd ˈeniwʌn prɪˈfɜːr ə ˈdɪfrənt taɪm slɑːt fɔːr ˈaʊər ˈwiːkli tiːm ˈkætʃʌp/',
    vi: 'Có ai muốn đổi sang khung giờ khác cho buổi họp ngắn hàng tuần của nhóm không?',
    context: 'Hỏi ý kiến đồng nghiệp về lịch họp định kỳ sao cho thuận tiện nhất.',
    politenessTip: 'Cấu trúc "Would anyone prefer..." rất lịch sự và tôn trọng lịch trình chung.',
  },
  {
    id: 'wm-ex-4',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'Since two speakers are still confirming their travel times, could we move the announcement to Friday?',
    ipa: '/sɪns tuː ˈspiːkərz ɑːr stɪl kənˈfɜːrmɪŋ ðer ˈtrævl taɪmz kʊd wi muːv ði əˈnaʊnsmənt tuː ˈfraɪdeɪ/',
    vi: 'Vì hai diễn giả vẫn đang xác nhận giờ di chuyển, chúng ta có thể dời thông báo sang thứ Sáu không?',
    context: 'Xin dời lịch thông báo sự kiện công ty do yếu tố khách quan.',
    politenessTip: 'Nêu rõ nguyên nhân khách quan trước khi đề xuất ngày mới.',
  },
  {
    id: 'wm-ex-5',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'If we share the conference room on alternate days, both teams can host their workshops smoothly.',
    ipa: '/ɪf wi ʃer ðə ˈkɑːnfərəns ruːm ɑːn ˈɔːltərnət deɪz boʊθ tiːmz kæn hoʊst ðer ˈwɜːrkʃɑːps ˈsmuːðli/',
    vi: 'Nếu chúng ta chia sẻ phòng hội thảo theo ngày xen kẽ, cả hai nhóm đều có thể tổ chức workshop suôn sẻ.',
    context: 'Thương lượng sử dụng phòng họp chung giữa hai phòng ban.',
    politenessTip: 'Đưa ra giải pháp đôi bên cùng có lợi (win-win) giúp dễ đạt đồng thuận.',
  },
  {
    id: 'wm-ex-6',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Yesterday I welcomed the new interns, and today I am walking them through our office tools.',
    ipa: '/ˈjestərdeɪ aɪ ˈwelkəmd ðə nuː ˈɪntɜːrnz ænd təˈdeɪ aɪ æm ˈwɔːkɪŋ ðem θruː ˈaʊər ˈɔːfɪs tuːlz/',
    vi: 'Hôm qua tôi đã đón các bạn thực tập sinh mới, hôm nay tôi đang hướng dẫn các bạn dùng công cụ văn phòng.',
    context: 'Cập nhật công việc hỗ trợ nhân sự mới trong buổi họp sáng.',
    politenessTip: 'Cụm "walk someone through" nghĩa là hướng dẫn từng bước rất tự nhiên.',
  },
  {
    id: 'wm-ex-7',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'All catering quotes have been collected, and we are currently comparing the menu options.',
    ipa: '/ɔːl ˈkeɪtərɪŋ kwoʊts hæv bɪn kəˈlektɪd ænd wi ɑːr ˈkɜːrəntli kəmˈperɪŋ ðə ˈmenjuː ˈɑːpʃnz/',
    vi: 'Tất cả báo giá tiệc đã được thu thập, và chúng tôi hiện đang so sánh các lựa chọn thực đơn.',
    context: 'Báo cáo tiến độ chuẩn bị hậu cần cho buổi liên hoan hoặc hội thảo.',
    politenessTip: 'Dùng thể bị động "have been collected" giúp câu báo cáo trang trọng hơn.',
  },
  {
    id: 'wm-ex-8',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Xin ý kiến',
    level: 'B2',
    en: 'How do you feel about switching our monthly town hall to a hybrid format?',
    ipa: '/haʊ duː juː fiːl əˈbaʊt ˈswɪtʃɪŋ ˈaʊər ˈmʌnθli taʊn hɔːl tuː ə ˈhaɪbrɪd ˈfɔːrmæt/',
    vi: 'Mọi người thấy sao về việc chuyển buổi họp toàn công ty hàng tháng sang hình thức kết hợp trực tiếp và trực tuyến?',
    context: 'Tham khảo ý kiến đồng nghiệp về cách thức tổ chức họp chung.',
    politenessTip: '"How do you feel about + V-ing?" là cách hỏi ý kiến mềm mỏng, khuyến khích chia sẻ.',
  },
  {
    id: 'wm-ex-9',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'I need one extra day to double-check the guest list so nobody is left off the invitation.',
    ipa: '/aɪ niːd wʌn ˈekstrə deɪ tuː ˌdʌblˈtʃek ðə ɡest lɪst soʊ ˈnoʊbɑːdi ɪz left ɔːf ði ˌɪnvɪˈteɪʃn/',
    vi: 'Tôi cần thêm một ngày để rà soát lại danh sách khách mời nhằm tránh bỏ sót ai.',
    context: 'Xin thêm thời gian kiểm tra danh sách trước khi gửi thư mời.',
    politenessTip: 'Nhấn mạnh mục đích tránh sai sót giúp người quản lý yên tâm cho gia hạn.',
  },
  {
    id: 'wm-ex-10',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'Could we keep the morning session strictly to thirty minutes so everyone has time for lunch?',
    ipa: '/kʊd wi kiːp ðə ˈmɔːrnɪŋ ˈseʃn ˈstrɪktli tuː ˈθɜːrti ˈmɪnɪts soʊ ˈevriwʌn hæz taɪm fɔːr lʌntʃ/',
    vi: 'Chúng ta có thể giữ phiên họp sáng đúng 30 phút để mọi người kịp giờ ăn trưa không?',
    context: 'Thương lượng thời lượng cuộc họp để bảo vệ giờ nghỉ của cả nhóm.',
    politenessTip: 'Dùng "so everyone has time for..." thể hiện sự quan tâm đến tập thể.',
  },
  {
    id: 'wm-ex-11',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'No blockers on my end today; I am ready to support anyone who needs help with the welcome pack.',
    ipa: '/noʊ ˈblɑːkərz ɑːn maɪ end təˈdeɪ aɪ æm ˈredi tuː səˈpɔːrt ˈeniwʌn huː niːdz help wɪð ðə ˈwelkəm pæk/',
    vi: 'Hôm nay phía tôi không có vướng mắc gì; tôi sẵn sàng hỗ trợ ai cần giúp phần bộ quà chào mừng.',
    context: 'Báo cáo nhanh trạng thái sẵn sàng hỗ trợ đồng đội trong standup.',
    politenessTip: '"On my end" là cụm rất phổ biến trong họp trực tuyến để nói về phần việc của mình.',
  },
  {
    id: 'wm-ex-12',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Báo cáo tiến độ',
    level: 'B2',
    en: 'Feedback from the pilot orientation was overwhelmingly positive, with ninety-five percent satisfaction.',
    ipa: '/ˈfiːdbæk frʌm ðə ˈpaɪlət ˌɔːriənˈteɪʃn wʌz ˌoʊvərˈwelmɪŋli ˈpɑːzətɪv wɪð ˈnaɪnti faɪv pərˈsent ˌsætɪsˈfækʃn/',
    vi: 'Phản hồi từ buổi định hướng thử nghiệm rất tích cực, đạt mức độ hài lòng 95%.',
    context: 'Báo cáo kết quả khảo sát sau hoạt động nội bộ.',
    politenessTip: 'Kết hợp tính từ mạnh ("overwhelmingly positive") với số liệu cụ thể tăng tính thuyết phục.',
  },
  {
    id: 'wm-ex-13',
    industry: 'Đời sống & Giao tiếp',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Before I send out the survey, could someone review the questions for clarity?',
    ipa: '/bɪˈfɔːr aɪ send aʊt ðə ˈsɜːrveɪ kʊd ˈsʌmwʌn rɪˈvjuː ðə ˈkwestʃənz fɔːr ˈklerəti/',
    vi: 'Trước khi tôi gửi bảng khảo sát, có ai xem giúp các câu hỏi xem đã rõ ràng chưa được không?',
    context: 'Nhờ đồng nghiệp rà soát nội dung trước khi phát hành chính thức.',
    politenessTip: 'Nêu rõ mục đích "for clarity" giúp người hỗ trợ biết cần tập trung kiểm tra gì.',
  },

  // 2. Du lịch & Khách sạn (13)
  {
    id: 'wm-ex-14',
    industry: 'Du lịch & Khách sạn',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'Because the airline updated the group flight schedule, we need until tomorrow to reissue the itinerary.',
    ipa: '/bɪˈkɔːz ði ˈerlaɪn ʌpˈdeɪtɪd ðə ɡruːp flaɪt ˈskedʒuːl wi niːd ənˈtɪl təˈmɑːroʊ tuː ˌriːˈɪʃuː ði aɪˈtɪnəreri/',
    vi: 'Do hãng hàng không vừa cập nhật lịch bay đoàn, chúng tôi cần đến ngày mai để xuất lại lịch trình.',
    context: 'Thông báo dời thời hạn gửi lịch trình tour cho khách đoàn.',
    politenessTip: 'Giải thích rõ nguyên nhân từ phía đối tác vận chuyển để giữ uy tín dịch vụ.',
  },
  {
    id: 'wm-ex-15',
    industry: 'Du lịch & Khách sạn',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'If we guarantee twenty room nights per month, would the hotel waive the early check-in fee?',
    ipa: '/ɪf wi ˌɡærənˈtiː ˈtwenti ruːm naɪts pɜːr mʌnθ wʊd ðə hoʊˈtel weɪv ði ˈɜːrli ˈtʃekɪn fiː/',
    vi: 'Nếu chúng tôi cam kết 20 đêm phòng mỗi tháng, khách sạn có thể miễn phí nhận phòng sớm không?',
    context: 'Đàm phán điều khoản hợp tác với đối tác khách sạn.',
    politenessTip: 'Đưa ra cam kết sản lượng trước khi đề nghị ưu đãi ("waive the fee") là kỹ thuật đàm phán hiệu quả.',
  },
  {
    id: 'wm-ex-16',
    industry: 'Du lịch & Khách sạn',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Today we have thirty-five check-ins, and I am coordinating airport pickups for two VIP guests.',
    ipa: '/təˈdeɪ wi hæv ˈθɜːrti faɪv ˈtʃekɪnz ænd aɪ æm koʊˈɔːrdɪneɪtɪŋ ˈerpɔːrt ˈpɪkʌps fɔːr tuː ˌviːaɪˈpiː ɡests/',
    vi: 'Hôm nay chúng ta có 35 lượt nhận phòng, và tôi đang điều phối xe đón sân bay cho hai khách VIP.',
    context: 'Họp giao ban đầu ca tại bộ phận lễ tân khách sạn.',
    politenessTip: 'Nêu số lượng khách và trường hợp đặc biệt ngay đầu ca giúp cả đội chuẩn bị chu đáo.',
  },
  {
    id: 'wm-ex-17',
    industry: 'Du lịch & Khách sạn',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'Housekeeping has finished turning over all deluxe rooms ahead of the two o’clock arrival.',
    ipa: '/ˈhaʊskiːpɪŋ hæz ˈfɪnɪʃt ˈtɜːrnɪŋ ˈoʊvər ɔːl dɪˈlʌks ruːmz əˈhed əv ðə tuː əˈklɑːk əˈraɪvl/',
    vi: 'Bộ phận buồng phòng đã dọn xong toàn bộ phòng Deluxe trước giờ khách đến lúc 2 giờ.',
    context: 'Báo cáo tình trạng sẵn sàng phòng trước giờ cao điểm check-in.',
    politenessTip: 'Thuật ngữ "turn over rooms" nghĩa là dọn phòng sẵn sàng cho khách mới.',
  },
  {
    id: 'wm-ex-18',
    industry: 'Du lịch & Khách sạn',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Should we offer a complimentary welcome drink to guests affected by the pool maintenance?',
    ipa: '/ʃʊd wi ˈɔːfər ə ˌkɑːmplɪˈmentəri ˈwelkəm drɪŋk tuː ɡests əˈfektɪd baɪ ðə puːl ˈmeɪntənəns/',
    vi: 'Chúng ta có nên tặng đồ uống chào mừng miễn phí cho khách bị ảnh hưởng bởi việc bảo trì hồ bơi không?',
    context: 'Xin ý kiến quản lý về phương án xoa dịu trải nghiệm khách hàng.',
    politenessTip: 'Dùng "complimentary" thay cho "free" trong ngành dịch vụ khách sạn nghe sang trọng hơn.',
  },
  {
    id: 'wm-ex-19',
    industry: 'Du lịch & Khách sạn',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'Due to heavy rain at the harbor, we propose postponing the boat excursion by two hours for safety.',
    ipa: '/duː tuː ˈhevi reɪn æt ðə ˈhɑːrbər wi prəˈpoʊz poʊstˈpoʊnɪŋ ðə boʊt ɪkˈskɜːrʒn baɪ tuː ˈaʊərz fɔːr ˈseɪfti/',
    vi: 'Do mưa lớn tại bến cảng, chúng tôi đề xuất hoãn chuyến tham quan bằng tàu thêm 2 tiếng để đảm bảo an toàn.',
    context: 'Họp điều hành tour khi thời tiết xấu.',
    politenessTip: 'Luôn đặt yếu tố an toàn ("for safety") làm lý do ưu tiên khi điều chỉnh lịch trình.',
  },
  {
    id: 'wm-ex-20',
    industry: 'Du lịch & Khách sạn',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'We can match the competitor’s group rate if the booking is confirmed before the end of this week.',
    ipa: '/wi kæn mætʃ ðə kəmˈpetɪtərz ɡruːp reɪt ɪf ðə ˈbʊkɪŋ ɪz kənˈfɜːrmd bɪˈfɔːr ði end əv ðɪs wiːk/',
    vi: 'Chúng tôi có thể áp dụng mức giá đoàn tương đương đối thủ nếu đơn đặt phòng được chốt trước cuối tuần này.',
    context: 'Đàm phán giá đoàn với công ty lữ hành.',
    politenessTip: 'Gắn ưu đãi với điều kiện thời gian cụ thể tạo động lực chốt đơn nhanh.',
  },
  {
    id: 'wm-ex-21',
    industry: 'Du lịch & Khách sạn',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Yesterday we resolved the shuttle delay, and today I am updating the reception desk signage.',
    ipa: '/ˈjestərdeɪ wi rɪˈzɑːlvd ðə ˈʃʌtl dɪˈleɪ ænd təˈdeɪ aɪ æm ʌpˈdeɪtɪŋ ðə rɪˈsepʃn desk ˈsaɪnɪdʒ/',
    vi: 'Hôm qua chúng tôi đã xử lý xong việc trễ xe đưa đón, hôm nay tôi đang cập nhật bảng thông báo tại quầy lễ tân.',
    context: 'Báo cáo nhanh công việc vận hành khách sạn.',
    politenessTip: 'Nhắc lại việc đã giải quyết xong giúp quản lý yên tâm về chất lượng dịch vụ.',
  },
  {
    id: 'wm-ex-22',
    industry: 'Du lịch & Khách sạn',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'Our summer brochure translation is complete and currently undergoing final proofreading.',
    ipa: '/ˈaʊər ˈsʌmər broʊˈʃʊr trænzˈleɪʃn ɪz kəmˈpliːt ænd ˈkɜːrəntli ˌʌndərˈɡoʊɪŋ ˈfaɪnl ˈpruːfriːdɪŋ/',
    vi: 'Bản dịch tập san du lịch mùa hè đã hoàn tất và hiện đang trong bước hiệu đính cuối cùng.',
    context: 'Cập nhật tiến độ ấn phẩm quảng bá tour.',
    politenessTip: 'Cụm "undergoing final proofreading" nghe chuyên nghiệp khi nói về tài liệu sắp xuất bản.',
  },
  {
    id: 'wm-ex-23',
    industry: 'Du lịch & Khách sạn',
    subType: 'Xin ý kiến',
    level: 'B2',
    en: 'What are your thoughts on partnering with a local bike rental shop for our eco-tour package?',
    ipa: '/wʌt ɑːr jʊr θɔːts ɑːn ˈpɑːrtnərɪŋ wɪð ə ˈloʊkl baɪk ˈrentl ʃɑːp fɔːr ˈaʊər ˈiːkoʊ tʊr ˈpækɪdʒ/',
    vi: 'Mọi người nghĩ sao về việc hợp tác với cửa hàng thuê xe đạp địa phương cho gói tour sinh thái của mình?',
    context: 'Đề xuất ý tưởng sản phẩm mới trong cuộc họp team sản phẩm du lịch.',
    politenessTip: '"What are your thoughts on..." mở ra thảo luận cởi mở cho ý tưởng mới.',
  },
  {
    id: 'wm-ex-24',
    industry: 'Du lịch & Khách sạn',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'The visa agency requested additional documents, so we need to push the submission to Wednesday.',
    ipa: '/ðə ˈviːzə ˈeɪdʒənsi rɪˈkwestɪd əˈdɪʃənl ˈdɑːkjumənts soʊ wi niːd tuː pʊʃ ðə səbˈmɪʃn tuː ˈwenzdeɪ/',
    vi: 'Đơn vị làm thị thực yêu cầu bổ sung giấy tờ nên chúng ta cần dời ngày nộp hồ sơ sang thứ Tư.',
    context: 'Thông báo điều chỉnh tiến độ hồ sơ cho đoàn khách quốc tế.',
    politenessTip: 'Dùng "push the submission to..." rất tự nhiên khi nói về việc dời lịch nộp hồ sơ.',
  },
  {
    id: 'wm-ex-25',
    industry: 'Du lịch & Khách sạn',
    subType: 'Đàm phán',
    level: 'C1',
    en: 'While we cannot reduce the peak-season rate, we can include complimentary breakfast and late checkout.',
    ipa: '/waɪl wi ˈkænɑːt rɪˈduːs ðə ˈpiːk siːzn reɪt wi kæn ɪnˈkluːd ˌkɑːmplɪˈmentəri ˈbrekfəst ænd leɪt ˈtʃekaʊt/',
    vi: 'Mặc dù không thể giảm giá mùa cao điểm, chúng tôi có thể tặng kèm bữa sáng và trả phòng muộn.',
    context: 'Đàm phán giữ giá nhưng tăng giá trị gia tăng cho đối tác.',
    politenessTip: 'Cấu trúc "While we cannot..., we can..." giúp từ chối khéo léo mà vẫn giữ được thiện chí.',
  },
  {
    id: 'wm-ex-26',
    industry: 'Du lịch & Khách sạn',
    subType: 'Daily Standup',
    level: 'B1',
    en: 'I am waiting on confirmation from the coach company before I finalize tomorrow’s departure list.',
    ipa: '/aɪ æm ˈweɪtɪŋ ɑːn ˌkɑːnfərˈmeɪʃn frʌm ðə koʊtʃ ˈkʌmpəni bɪˈfɔːr aɪ ˈfaɪnəlaɪz təˈmɑːroʊz dɪˈpɑːrtʃər lɪst/',
    vi: 'Tôi đang chờ xác nhận từ nhà xe trước khi chốt danh sách khởi hành ngày mai.',
    context: 'Nêu điểm phụ thuộc (dependency) trong họp điều phối tour.',
    politenessTip: 'Nói rõ đang chờ ai giúp trưởng nhóm hỗ trợ nhắc bên liên quan kịp thời.',
  },

  // 3. Ẩm thực & Mua sắm (13)
  {
    id: 'wm-ex-27',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Báo cáo tiến độ',
    level: 'A2',
    en: 'We have restocked all best-selling beverages and updated the seasonal menu boards.',
    ipa: '/wi hæv ˌriːˈstɑːkt ɔːl ˈbest selɪŋ ˈbevrɪdʒɪz ænd ʌpˈdeɪtɪd ðə ˈsiːzənl ˈmenjuː bɔːrdz/',
    vi: 'Chúng tôi đã bổ sung đầy đủ các đồ uống bán chạy và cập nhật bảng thực đơn theo mùa.',
    context: 'Báo cáo chuẩn bị quầy hàng trước giờ mở cửa.',
    politenessTip: 'Dùng động từ chuyên ngành "restocked" ngắn gọn và chính xác hơn "put more items back".',
  },
  {
    id: 'wm-ex-28',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Do you think placing the new snack display near the checkout counter will boost impulse buys?',
    ipa: '/duː juː θɪŋk ˈpleɪsɪŋ ðə nuː snæk dɪˈspleɪ nɪr ðə ˈtʃekaʊt ˈkaʊntər wɪl buːst ˈɪmpʌls baɪz/',
    vi: 'Bạn có nghĩ đặt kệ đồ ăn vặt mới gần quầy thanh toán sẽ giúp tăng lượng mua ngẫu hứng không?',
    context: 'Thảo luận cách trưng bày sản phẩm trong cửa hàng bán lẻ.',
    politenessTip: 'Thuật ngữ "impulse buys" rất hay dùng trong bán lẻ và F&B.',
  },
  {
    id: 'wm-ex-29',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'Our organic produce supplier delayed delivery, so the new salad launch will move to Monday.',
    ipa: '/ˈaʊər ɔːrˈɡænɪk ˈprɑːduːs səˈplaɪər dɪˈleɪd dɪˈlɪvəri soʊ ðə nuː ˈsæləd lɔːntʃ wɪl muːv tuː ˈmʌndeɪ/',
    vi: 'Nhà cung cấp rau hữu cơ giao hàng trễ nên lịch ra mắt món salad mới sẽ chuyển sang thứ Hai.',
    context: 'Thông báo dời ngày ra mắt món mới do thiếu nguyên liệu.',
    politenessTip: 'Nêu rõ lý do chuỗi cung ứng để các bộ phận marketing và phục vụ điều chỉnh kịp.',
  },
  {
    id: 'wm-ex-30',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'If we order three hundred units weekly, can you offer a ten percent bulk discount?',
    ipa: '/ɪf wi ˈɔːrdər θriː ˈhʌndrəd ˈjuːnɪts ˈwiːkli kæn juː ˈɔːfər ə ten pərˈsent bʌlk ˈdɪskaʊnt/',
    vi: 'Nếu chúng tôi đặt 300 đơn vị mỗi tuần, bên anh có thể chiết khấu 10% theo số lượng lớn không?',
    context: 'Thương lượng giá nhập hàng với nhà cung cấp.',
    politenessTip: 'Nhấn mạnh tần suất đặt hàng ("weekly") giúp nhà cung cấp dễ chấp nhận chiết khấu.',
  },
  {
    id: 'wm-ex-31',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Today I am training two part-time cashiers on our loyalty app and refund policy.',
    ipa: '/təˈdeɪ aɪ æm ˈtreɪnɪŋ tuː ˈpɑːrt taɪm kæˈʃɪrz ɑːn ˈaʊər ˈlɔɪəlti æp ænd ˈriːfʌnd ˈpɑːləsi/',
    vi: 'Hôm nay tôi sẽ đào tạo hai thu ngân bán thời gian về ứng dụng tích điểm và chính sách hoàn tiền.',
    context: 'Họp đầu ca tại cửa hàng bán lẻ hoặc chuỗi F&B.',
    politenessTip: 'Nêu rõ chủ đề đào tạo giúp quản lý sắp xếp ca đứng quầy phù hợp.',
  },
  {
    id: 'wm-ex-32',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'Inventory count for the dry goods storage is ninety percent done and matches our POS records.',
    ipa: '/ˈɪnvəntɔːri kaʊnt fɔːr ðə draɪ ɡʊdz ˈstɔːrɪdʒ ɪz ˈnaɪnti pərˈsent dʌn ænd ˈmætʃɪz ˈaʊər ˌpiːoʊˈes ˈrekərdz/',
    vi: 'Việc kiểm kê kho hàng khô đã xong 90% và khớp với dữ liệu trên hệ thống bán hàng.',
    context: 'Báo cáo kết quả kiểm kho định kỳ.',
    politenessTip: 'Xác nhận số liệu khớp với POS giúp tăng độ tin cậy cho báo cáo.',
  },
  {
    id: 'wm-ex-33',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Which packaging design do you think customers will find easier to carry for takeout orders?',
    ipa: '/wɪtʃ ˈpækɪdʒɪŋ dɪˈzaɪn duː juː θɪŋk ˈkʌstəmərz wɪl faɪnd ˈiːziər tuː ˈkæri fɔːr ˈteɪkaʊt ˈɔːrdərz/',
    vi: 'Mọi người thấy mẫu bao bì nào khách hàng sẽ dễ mang đi hơn cho các đơn mang về?',
    context: 'Lấy ý kiến nhóm về trải nghiệm đóng gói sản phẩm.',
    politenessTip: 'Đặt góc nhìn khách hàng vào câu hỏi giúp thảo luận đi đúng trọng tâm.',
  },
  {
    id: 'wm-ex-34',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'We need an extra forty-eight hours to test the new oven settings before rolling out the pastry line.',
    ipa: '/wi niːd ən ˈekstrə ˈfɔːrti eɪt ˈaʊərz tuː test ðə nuː ˈʌvn ˈsetɪŋz bɪˈfɔːr ˈroʊlɪŋ aʊt ðə ˈpeɪstri laɪn/',
    vi: 'Chúng tôi cần thêm 48 giờ để thử nghiệm thông số lò mới trước khi tung dòng bánh ngọt.',
    context: 'Xin dời lịch ra mắt sản phẩm để đảm bảo chất lượng đồng đều.',
    politenessTip: 'Cụm "rolling out" rất chuẩn khi nói về việc triển khai sản phẩm mới.',
  },
  {
    id: 'wm-ex-35',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'Could we split the shipping cost if we schedule all deliveries on Tuesdays and Fridays?',
    ipa: '/kʊd wi splɪt ðə ˈʃɪpɪŋ kɔːst ɪf wi ˈskedʒuːl ɔːl dɪˈlɪvəriz ɑːn ˈtuːzdeɪz ænd ˈfraɪdeɪz/',
    vi: 'Chúng ta có thể chia đôi phí vận chuyển nếu gom toàn bộ lịch giao hàng vào thứ Ba và thứ Sáu không?',
    context: 'Đàm phán tối ưu chi phí giao nhận với nhà phân phối.',
    politenessTip: 'Đề xuất gom lịch giao giúp đối tác tiết kiệm tuyến xe nên dễ đồng ý chia phí.',
  },
  {
    id: 'wm-ex-36',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Yesterday we sold out of the matcha latte early, so I doubled today’s prep batch.',
    ipa: '/ˈjestərdeɪ wi soʊld aʊt əv ðə ˈmɑːtʃə ˈlɑːteɪ ˈɜːrli soʊ aɪ ˈdʌbld təˈdeɪz prep bætʃ/',
    vi: 'Hôm qua món matcha latte hết hàng sớm nên hôm nay tôi đã chuẩn bị gấp đôi mẻ nguyên liệu.',
    context: 'Cập nhật điều chỉnh vận hành hàng ngày tại quán cà phê.',
    politenessTip: 'Thể hiện sự chủ động rút kinh nghiệm từ số bán hôm trước.',
  },
  {
    id: 'wm-ex-37',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Báo cáo tiến độ',
    level: 'B2',
    en: 'Our weekend flash sale drove a twenty-two percent increase in average basket size.',
    ipa: '/ˈaʊər ˈwiːkend flæʃ seɪl droʊv ə ˈtwenti tuː pərˈsent ˈɪnkriːs ɪn ˈævrɪdʒ ˈbæskɪt saɪz/',
    vi: 'Chương trình giảm giá nhanh cuối tuần đã giúp giá trị giỏ hàng trung bình tăng 22%.',
    context: 'Báo cáo hiệu quả chiến dịch khuyến mãi bán lẻ.',
    politenessTip: 'Thuật ngữ "average basket size" là chỉ số chuẩn trong ngành bán lẻ.',
  },
  {
    id: 'wm-ex-38',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Should we keep the weekend brunch hours until three PM based on last month’s foot traffic?',
    ipa: '/ʃʊd wi kiːp ðə ˈwiːkend brʌntʃ ˈaʊərz ənˈtɪl θriː piː em beɪst ɑːn læst mʌnθs fʊt ˈtræfɪk/',
    vi: 'Dựa trên lượng khách tháng trước, chúng ta có nên kéo dài giờ phục vụ brunch cuối tuần đến 3 giờ chiều không?',
    context: 'Tham khảo ý kiến quản lý dựa trên dữ liệu thực tế.',
    politenessTip: 'Dùng "based on..." giúp đề xuất có cơ sở dữ liệu rõ ràng.',
  },
  {
    id: 'wm-ex-39',
    industry: 'Ẩm thực & Mua sắm',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'The label printer is undergoing repair, so the bottled sauce batch will ship one day later.',
    ipa: '/ðə ˈleɪbl ˈprɪntər ɪz ˌʌndərˈɡoʊɪŋ rɪˈper soʊ ðə ˈbɑːtld sɔːs bætʃ wɪl ʃɪp wʌn deɪ ˈleɪtər/',
    vi: 'Máy in nhãn đang được sửa chữa nên lô nước sốt đóng chai sẽ giao muộn hơn một ngày.',
    context: 'Thông báo chậm tiến độ đóng gói hàng hóa.',
    politenessTip: 'Báo sớm ngay khi có sự cố thiết bị giúp bộ phận bán hàng thông báo khách kịp thời.',
  },

  // 4. Văn phòng & Email (13)
  {
    id: 'wm-ex-40',
    industry: 'Văn phòng & Email',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'Could we agree on a single shared folder for all client contracts to avoid duplicate versions?',
    ipa: '/kʊd wi əˈɡriː ɑːn ə ˈsɪŋɡl ʃerd ˈfoʊldər fɔːr ɔːl ˈklaɪənt ˈkɑːntrækts tuː əˈvɔɪd ˈduːplɪkət ˈvɜːrʒnz/',
    vi: 'Chúng ta có thể thống nhất dùng một thư mục chung cho mọi hợp đồng khách hàng để tránh trùng lặp phiên bản không?',
    context: 'Thương lượng quy trình lưu trữ tài liệu giữa các nhóm.',
    politenessTip: 'Nêu rõ lợi ích chung ("to avoid duplicate versions") giúp mọi người dễ đồng thuận.',
  },
  {
    id: 'wm-ex-41',
    industry: 'Văn phòng & Email',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Yesterday I cleared the pending invoices, and today I am drafting the monthly admin summary.',
    ipa: '/ˈjestərdeɪ aɪ klɪrd ðə ˈpendɪŋ ˈɪnvɔɪsɪz ænd təˈdeɪ aɪ æm ˈdræftɪŋ ðə ˈmʌnθli ˈædmɪn ˈsʌməri/',
    vi: 'Hôm qua tôi đã xử lý xong các hóa đơn tồn đọng, hôm nay tôi đang soạn bản tóm tắt hành chính tháng.',
    context: 'Cập nhật nhanh công việc văn phòng hàng ngày.',
    politenessTip: '"Cleared the pending..." nghe gọn và thể hiện hiệu suất công việc tốt.',
  },
  {
    id: 'wm-ex-42',
    industry: 'Văn phòng & Email',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'The board meeting deck is eighty percent finalized; I only need the updated Q4 forecast slide.',
    ipa: '/ðə bɔːrd ˈmiːtɪŋ dek ɪz ˈeɪti pərˈsent ˈfaɪnəlaɪzd aɪ ˈoʊnli niːd ði ʌpˈdeɪtɪd kjuː fɔːr ˈfɔːrkæst slaɪd/',
    vi: 'Bộ slide họp ban giám đốc đã hoàn thiện 80%; tôi chỉ cần thêm slide dự báo quý 4 đã cập nhật.',
    context: 'Báo cáo tiến độ chuẩn bị tài liệu họp cấp cao.',
    politenessTip: 'Chỉ rõ phần còn thiếu giúp người liên quan gửi bổ sung ngay.',
  },
  {
    id: 'wm-ex-43',
    industry: 'Văn phòng & Email',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Is everyone comfortable with the action items and owners listed in the meeting minutes?',
    ipa: '/ɪz ˈevriwʌn ˈkʌmftəbl wɪð ði ˈækʃn ˈaɪtəmz ænd ˈoʊnərz ˈlɪstɪd ɪn ðə ˈmiːtɪŋ ˈmɪnɪts/',
    vi: 'Mọi người đều thấy ổn với các đầu việc và người phụ trách được ghi trong biên bản cuộc họp chứ?',
    context: 'Xác nhận lại phân công công việc cuối cuộc họp.',
    politenessTip: 'Luôn xác nhận "action items and owners" trước khi kết thúc họp để tránh hiểu nhầm.',
  },
  {
    id: 'wm-ex-44',
    industry: 'Văn phòng & Email',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'To incorporate legal’s latest edits, may we extend the policy rollout by two business days?',
    ipa: '/tuː ɪnˈkɔːrpəreɪt ˈliːɡlz ˈleɪtɪst ˈedɪts meɪ wi ɪkˈstend ðə ˈpɑːləsi ˈroʊlaʊt baɪ tuː ˈbɪznəs deɪz/',
    vi: 'Để đưa các chỉnh sửa mới nhất của bộ phận pháp chế vào tài liệu, chúng ta có thể lùi ngày ban hành chính sách thêm 2 ngày làm việc không?',
    context: 'Xin gia hạn phát hành quy trình nội bộ.',
    politenessTip: 'Dùng "business days" thay vì "days" giúp mốc thời gian rõ ràng, chuyên nghiệp.',
  },
  {
    id: 'wm-ex-45',
    industry: 'Văn phòng & Email',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'If we send a concise weekly digest instead of daily emails, we can cut inbox clutter significantly.',
    ipa: '/ɪf wi send ə kənˈsaɪs ˈwiːkli ˈdaɪdʒest ɪnˈsted əv ˈdeɪli ˈiːmeɪlz wi kæn kʌt ˈɪnbɑːks ˈklʌtər sɪɡˈnɪfɪkəntli/',
    vi: 'Nếu chúng ta gửi bản tin tóm tắt hàng tuần thay vì email hàng ngày, chúng ta sẽ giảm đáng kể tình trạng quá tải hộp thư.',
    context: 'Đề xuất cải tiến giao tiếp nội bộ trong cuộc họp.',
    politenessTip: 'Đề xuất giải pháp thay thế cụ thể ("instead of...") thuyết phục hơn chỉ phàn nàn.',
  },
  {
    id: 'wm-ex-46',
    industry: 'Văn phòng & Email',
    subType: 'Daily Standup',
    level: 'B1',
    en: 'I am waiting for sign-off on the travel reimbursement form before I close this month’s expenses.',
    ipa: '/aɪ æm ˈweɪtɪŋ fɔːr ˈsaɪn ɔːf ɑːn ðə ˈtrævl ˌriːɪmˈbɜːrsmənt fɔːrm bɪˈfɔːr aɪ kloʊz ðɪs mʌnθs ɪkˈspensɪz/',
    vi: 'Tôi đang chờ phê duyệt phiếu hoàn công tác phí trước khi chốt chi phí tháng này.',
    context: 'Nêu đầu việc đang chờ duyệt trong buổi họp nhóm hành chính.',
    politenessTip: '"Sign-off" là từ ngắn gọn, tự nhiên cho việc phê duyệt chính thức.',
  },
  {
    id: 'wm-ex-47',
    industry: 'Văn phòng & Email',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'All signed NDAs have been archived in the compliance drive and indexed by vendor name.',
    ipa: '/ɔːl saɪnd ˌendiːˈeɪz hæv bɪn ˈɑːrkaɪvd ɪn ðə kəmˈplaɪəns draɪv ænd ˈɪndekst baɪ ˈvendər neɪm/',
    vi: 'Toàn bộ thỏa thuận bảo mật đã ký đã được lưu trữ trên ổ tuân thủ và sắp xếp theo tên nhà cung cấp.',
    context: 'Báo cáo hoàn tất công việc lưu trữ hồ sơ pháp lý.',
    politenessTip: 'Nêu rõ nơi lưu và cách sắp xếp giúp đồng nghiệp tự tìm khi cần.',
  },
  {
    id: 'wm-ex-48',
    industry: 'Văn phòng & Email',
    subType: 'Xin ý kiến',
    level: 'B2',
    en: 'Would it make sense to automate our meeting reminders through Slack rather than manual emails?',
    ipa: '/wʊd ɪt meɪk sens tuː ˈɔːtəmeɪt ˈaʊər ˈmiːtɪŋ rɪˈmaɪndərz θruː slæk ˈræðər ðæn ˈmænjuəl ˈiːmeɪlz/',
    vi: 'Việc tự động hóa nhắc lịch họp qua Slack thay vì gửi email thủ công có hợp lý không mọi người?',
    context: 'Hỏi ý kiến cải tiến quy trình làm việc văn phòng.',
    politenessTip: '"Would it make sense to..." là mẫu câu cực kỳ tự nhiên của người bản xứ khi gợi ý cải tiến.',
  },
  {
    id: 'wm-ex-49',
    industry: 'Văn phòng & Email',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'Because the printer vendor has not confirmed delivery, we will postpone the office move by one week.',
    ipa: '/bɪˈkɔːz ðə ˈprɪntər ˈvendər hæz nɑːt kənˈfɜːrmd dɪˈlɪvəri wi wɪl poʊstˈpoʊn ði ˈɔːfɪs muːv baɪ wʌn wiːk/',
    vi: 'Vì nhà cung cấp máy in chưa xác nhận lịch giao hàng, chúng ta sẽ lùi lịch chuyển văn phòng một tuần.',
    context: 'Thông báo điều chỉnh kế hoạch hành chính.',
    politenessTip: 'Chốt luôn thời gian lùi cụ thể ("by one week") để các bộ phận sắp xếp lại lịch.',
  },
  {
    id: 'wm-ex-50',
    industry: 'Văn phòng & Email',
    subType: 'Đàm phán',
    level: 'C1',
    en: 'Let us lock in the core agenda today and leave optional topics for an offline email thread.',
    ipa: '/let ʌs lɑːk ɪn ðə kɔːr əˈdʒendə təˈdeɪ ænd liːv ˈɑːpʃənl ˈtɑːpɪks fɔːr ən ˌɔːfˈlaɪn ˈiːmeɪl θred/',
    vi: 'Hãy chốt các nội dung cốt lõi hôm nay và để những chủ đề phụ sang trao đổi qua chuỗi email sau.',
    context: 'Điều phối cuộc họp đi đúng trọng tâm khi thời gian có hạn.',
    politenessTip: 'Cụm "offline email thread" chỉ việc bàn tiếp qua email sau cuộc họp.',
  },
  {
    id: 'wm-ex-51',
    industry: 'Văn phòng & Email',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Today I am scheduling Q2 performance reviews and sending calendar invites to all managers.',
    ipa: '/təˈdeɪ aɪ æm ˈskedʒuːlɪŋ kjuː tuː pərˈfɔːrməns rɪˈvjuːz ænd ˈsendɪŋ ˈkælɪndər ˈɪnvaɪts tuː ɔːl ˈmænɪdʒərz/',
    vi: 'Hôm nay tôi đang lên lịch đánh giá hiệu suất quý 2 và gửi thư mời lịch cho tất cả quản lý.',
    context: 'Cập nhật đầu việc điều phối lịch họp trong team.',
    politenessTip: 'Dùng "calendar invites" chuẩn xác hơn "meeting letters".',
  },
  {
    id: 'wm-ex-52',
    industry: 'Văn phòng & Email',
    subType: 'Báo cáo tiến độ',
    level: 'B2',
    en: 'We reduced monthly stationery spending by fifteen percent after switching to bulk procurement.',
    ipa: '/wi rɪˈduːst ˈmʌnθli ˈsteɪʃəneri ˈspendɪŋ baɪ ˌfɪfˈtiːn pərˈsent ˈæftər ˈswɪtʃɪŋ tuː bʌlk prəˈkjʊrmənt/',
    vi: 'Chúng tôi đã giảm 15% chi phí văn phòng phẩm hàng tháng sau khi chuyển sang mua sắm tập trung.',
    context: 'Báo cáo kết quả tối ưu chi phí vận hành văn phòng.',
    politenessTip: 'Nêu rõ kết quả trước, giải pháp sau giúp báo cáo súc tích.',
  },

  // 5. IT / Kỹ thuật (13)
  {
    id: 'wm-ex-53',
    industry: 'IT / Kỹ thuật',
    subType: 'Xin ý kiến',
    level: 'B2',
    en: 'Should we roll out the database migration behind a feature flag before enabling it for all users?',
    ipa: '/ʃʊd wi roʊl aʊt ðə ˈdeɪtəbeɪs maɪˈɡreɪʃn bɪˈhaɪnd ə ˈfiːtʃər flæɡ bɪˈfɔːr ɪˈneɪblɪŋ ɪt fɔːr ɔːl ˈjuːzərz/',
    vi: 'Chúng ta có nên triển khai chuyển đổi cơ sở dữ liệu sau feature flag trước khi bật cho toàn bộ người dùng không?',
    context: 'Thảo luận chiến lược triển khai an toàn trong buổi họp kỹ thuật.',
    politenessTip: 'Đề xuất phương án giảm rủi ro giúp team kỹ thuật đánh giá cao tư duy hệ thống.',
  },
  {
    id: 'wm-ex-54',
    industry: 'IT / Kỹ thuật',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'Regression testing uncovered a memory leak in the worker service, so we need one more day before release.',
    ipa: '/rɪˈɡreʃn ˈtestɪŋ ʌnˈkʌvərd ə ˈmeməri liːk ɪn ðə ˈwɜːrkər ˈsɜːrvɪs soʊ wi niːd wʌn mɔːr deɪ bɪˈfɔːr rɪˈliːs/',
    vi: 'Kiểm thử hồi quy phát hiện lỗi rò rỉ bộ nhớ ở worker service nên chúng ta cần thêm một ngày trước khi phát hành.',
    context: 'Xin dời lịch release phần mềm khi phát hiện lỗi nghiêm trọng.',
    politenessTip: 'Nêu tên lỗi kỹ thuật cụ thể giúp Product Manager hiểu lý do bắt buộc phải hoãn.',
  },
  {
    id: 'wm-ex-55',
    industry: 'IT / Kỹ thuật',
    subType: 'Đàm phán',
    level: 'C1',
    en: 'If we defer the analytics export to the next sprint, we can guarantee zero-downtime deployment this Friday.',
    ipa: '/ɪf wi dɪˈfɜːr ði ˌænəˈlɪtɪks ˈekspɔːrt tuː ðə nekst sprɪnt wi kæn ˌɡærənˈtiː ˈzɪroʊ ˈdaʊntaɪm dɪˈplɔɪmənt ðɪs ˈfraɪdeɪ/',
    vi: 'Nếu dời tính năng xuất báo cáo sang sprint sau, chúng tôi có thể cam kết triển khai không gián đoạn vào thứ Sáu này.',
    context: 'Thương lượng phạm vi (scope) sprint với Product Owner.',
    politenessTip: 'Đánh đổi phạm vi lấy sự ổn định là lập luận đàm phán rất thuyết phục trong Agile.',
  },
  {
    id: 'wm-ex-56',
    industry: 'IT / Kỹ thuật',
    subType: 'Daily Standup',
    level: 'B1',
    en: 'Yesterday I reviewed three pull requests, and today I am writing unit tests for the payment webhook.',
    ipa: '/ˈjestərdeɪ aɪ rɪˈvjuːd θriː pʊl rɪˈkwests ænd təˈdeɪ aɪ æm ˈraɪtɪŋ ˈjuːnɪt tests fɔːr ðə ˈpeɪmənt ˈwebhʊk/',
    vi: 'Hôm qua tôi đã duyệt ba pull request, hôm nay tôi đang viết unit test cho webhook thanh toán.',
    context: 'Cập nhật công việc hằng ngày của lập trình viên trong Daily Standup.',
    politenessTip: 'Ngắn gọn theo đúng 3 ý: hôm qua làm gì, hôm nay làm gì, có vướng gì không.',
  },
  {
    id: 'wm-ex-57',
    industry: 'IT / Kỹ thuật',
    subType: 'Báo cáo tiến độ',
    level: 'B2',
    en: 'API latency dropped by forty percent after we added Redis caching to the search endpoint.',
    ipa: '/ˌeɪpiːˈaɪ ˈleɪtənsi drɑːpt baɪ ˈfɔːrti pərˈsent ˈæftər wi ˈædɪd ˈredɪs ˈkæʃɪŋ tuː ðə sɜːrtʃ ˈendpɔɪnt/',
    vi: 'Độ trễ API đã giảm 40% sau khi chúng tôi bổ sung bộ nhớ đệm Redis cho endpoint tìm kiếm.',
    context: 'Báo cáo kết quả tối ưu hiệu năng hệ thống.',
    politenessTip: 'Dùng số liệu trước và sau tối ưu giúp người không chuyên kỹ thuật cũng thấy rõ giá trị.',
  },
  {
    id: 'wm-ex-58',
    industry: 'IT / Kỹ thuật',
    subType: 'Xin ý kiến',
    level: 'B2',
    en: 'Does anyone see any edge cases with allowing guest users to save items to their cart?',
    ipa: '/dʌz ˈeniwʌn siː ˈeni edʒ ˈkeɪsɪz wɪð əˈlaʊɪŋ ɡest ˈjuːzərz tuː seɪv ˈaɪtəmz tuː ðer kɑːrt/',
    vi: 'Có ai thấy trường hợp ngoại lệ nào khi cho phép khách chưa đăng nhập lưu sản phẩm vào giỏ hàng không?',
    context: 'Review thiết kế tính năng mới cùng team Dev và QA.',
    politenessTip: 'Thuật ngữ "edge cases" giúp mọi người chủ động rà soát các tình huống hiếm gặp.',
  },
  {
    id: 'wm-ex-59',
    industry: 'IT / Kỹ thuật',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'Because the third-party sandbox is down, we cannot complete integration testing until tomorrow morning.',
    ipa: '/bɪˈkɔːz ðə θɜːrd ˈpɑːrti ˈsændbɑːks ɪz daʊn wi ˈkænɑːt kəmˈpliːt ˌɪntɪˈɡreɪʃn ˈtestɪŋ ənˈtɪl təˈmɑːroʊ ˈmɔːrnɪŋ/',
    vi: 'Do môi trường thử nghiệm của bên thứ ba đang gặp sự cố, chúng tôi chưa thể hoàn tất kiểm thử tích hợp trước sáng mai.',
    context: 'Báo cáo chậm tiến độ do phụ thuộc hạ tầng đối tác.',
    politenessTip: 'Phân biệt rõ lỗi từ bên thứ ba và nêu mốc thời gian kiểm tra lại.',
  },
  {
    id: 'wm-ex-60',
    industry: 'IT / Kỹ thuật',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'Can we dedicate twenty percent of next sprint to paying down technical debt in the auth module?',
    ipa: '/kæn wi ˈdedɪkeɪt ˈtwenti pərˈsent əv nekst sprɪnt tuː ˈpeɪɪŋ daʊn ˈteknɪkl det ɪn ði ɔːθ ˈmɑːdʒuːl/',
    vi: 'Chúng ta có thể dành 20% thời lượng sprint tới để xử lý nợ kỹ thuật ở module xác thực không?',
    context: 'Thương lượng với PM để cân bằng giữa tính năng mới và bảo trì code.',
    politenessTip: 'Đề xuất tỷ lệ phần trăm cụ thể (20%) dễ được duyệt hơn là xin "thêm thời gian chung chung".',
  },
  {
    id: 'wm-ex-61',
    industry: 'IT / Kỹ thuật',
    subType: 'Daily Standup',
    level: 'B1',
    en: 'I am pairing with QA this afternoon to reproduce the intermittent iOS crash.',
    ipa: '/aɪ æm ˈperɪŋ wɪð ˌkjuːˈeɪ ðɪs ˌæftərˈnuːn tuː ˌriːprəˈduːs ði ˌɪntərˈmɪtənt ˌaɪoʊˈes kræʃ/',
    vi: 'Chiều nay tôi sẽ phối hợp trực tiếp với QA để tái hiện lỗi văng ứng dụng thỉnh thoảng xảy ra trên iOS.',
    context: 'Thông báo kế hoạch phối hợp xử lý lỗi trong standup.',
    politenessTip: 'Từ "pairing with" chỉ việc hai người cùng ngồi kiểm tra một vấn đề rất phổ biến trong IT.',
  },
  {
    id: 'wm-ex-62',
    industry: 'IT / Kỹ thuật',
    subType: 'Báo cáo tiến độ',
    level: 'B2',
    en: 'Automated test coverage for the billing service has reached eighty-five percent, with all pipelines green.',
    ipa: '/ˈɔːtəmeɪtɪd test ˈkʌvərɪdʒ fɔːr ðə ˈbɪlɪŋ ˈsɜːrvɪs hæz riːtʃt ˈeɪti faɪv pərˈsent wɪð ɔːl ˈpaɪplaɪnz ɡriːn/',
    vi: 'Độ phủ kiểm thử tự động cho dịch vụ thanh toán đã đạt 85%, và toàn bộ pipeline đều xanh.',
    context: 'Báo cáo chất lượng code trước khi phát hành.',
    politenessTip: '"All pipelines green" là cách nói ngắn gọn nghĩa là mọi bước build và test đều đạt.',
  },
  {
    id: 'wm-ex-63',
    industry: 'IT / Kỹ thuật',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Before I merge this branch, could a backend lead take a quick look at the schema change?',
    ipa: '/bɪˈfɔːr aɪ mɜːrdʒ ðɪs bræntʃ kʊd ə ˈbækend liːd teɪk ə kwɪk lʊk æt ðə ˈskiːmə tʃeɪndʒ/',
    vi: 'Trước khi tôi gộp nhánh này, trưởng nhóm backend có thể xem nhanh phần thay đổi cấu trúc bảng được không?',
    context: 'Nhờ review phần thay đổi nhạy cảm trước khi merge code.',
    politenessTip: 'Luôn xin review kỹ với thay đổi database schema để tránh ảnh hưởng dữ liệu.',
  },
  {
    id: 'wm-ex-64',
    industry: 'IT / Kỹ thuật',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'Security audit flagged two medium-risk dependencies, so we are holding the release until patches pass.',
    ipa: '/sɪˈkjʊrəti ˈɔːdɪt flæɡd tuː ˈmiːdiəm rɪsk dɪˈpendənsiz soʊ wi ɑːr ˈhoʊldɪŋ ðə rɪˈliːs ənˈtɪl ˈpætʃɪz pæs/',
    vi: 'Kiểm tra bảo mật cảnh báo hai thư viện có rủi ro trung bình nên chúng tôi tạm hoãn phát hành tới khi bản vá đạt.',
    context: 'Hoãn phát hành vì lý do bảo mật.',
    politenessTip: 'Nhấn mạnh yếu tố bảo mật giúp các bên liên quan đồng thuận ngay.',
  },
  {
    id: 'wm-ex-65',
    industry: 'IT / Kỹ thuật',
    subType: 'Đàm phán',
    level: 'C1',
    en: 'Rather than building a custom tool from scratch, integrating an existing SDK will save three weeks.',
    ipa: '/ˈræðər ðæn ˈbɪldɪŋ ə ˈkʌstəm tuːl frʌm skrætʃ ˈɪntɪɡreɪtɪŋ ən ɪɡˈzɪstɪŋ ˌesdiːˈkeɪ wɪl seɪv θriː wiːks/',
    vi: 'Thay vì tự xây dựng công cụ từ đầu, việc tích hợp một SDK có sẵn sẽ giúp tiết kiệm 3 tuần.',
    context: 'Đề xuất giải pháp kỹ thuật tối ưu thời gian và chi phí.',
    politenessTip: 'So sánh trực tiếp thời gian tiết kiệm được ("save three weeks") rất thuyết phục.',
  },

  // 6. Kinh doanh & CSKH (12)
  {
    id: 'wm-ex-66',
    industry: 'Kinh doanh & CSKH',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Today I am following up with six enterprise leads and closing two renewal quotes.',
    ipa: '/təˈdeɪ aɪ æm ˈfɑːloʊɪŋ ʌp wɪð sɪks ˈentərpraɪz liːdz ænd ˈkloʊzɪŋ tuː rɪˈnuːəl kwoʊts/',
    vi: 'Hôm nay tôi sẽ theo sát 6 khách hàng doanh nghiệp tiềm năng và chốt 2 báo giá gia hạn.',
    context: 'Báo cáo đầu ngày của nhóm kinh doanh.',
    politenessTip: 'Nêu số lượng lead và báo giá cụ thể giúp quản lý theo dõi pipeline dễ dàng.',
  },
  {
    id: 'wm-ex-67',
    industry: 'Kinh doanh & CSKH',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'Our customer support queue is down to four open tickets, with an average response time under fifteen minutes.',
    ipa: '/ˈaʊər ˈkʌstəmər səˈpɔːrt kjuː ɪz daʊn tuː fɔːr ˈoʊpən ˈtɪkɪts wɪð ən ˈævrɪdʒ rɪˈspɑːns taɪm ˈʌndər ˌfɪfˈtiːn ˈmɪnɪts/',
    vi: 'Hàng chờ hỗ trợ khách hàng chỉ còn 4 yêu cầu mở, với thời gian phản hồi trung bình dưới 15 phút.',
    context: 'Báo cáo hiệu suất bộ phận CSKH trong cuộc họp vận hành.',
    politenessTip: 'Kết hợp số lượng tồn đọng và SLA phản hồi cho thấy chất lượng dịch vụ tốt.',
  },
  {
    id: 'wm-ex-68',
    industry: 'Kinh doanh & CSKH',
    subType: 'Xin ý kiến',
    level: 'B2',
    en: 'Would you recommend offering a thirty-day trial extension to retain accounts considering cancellation?',
    ipa: '/wʊd juː ˌrekəˈmend ˈɔːfərɪŋ ə ˈθɜːrti deɪ ˈtraɪəl ɪkˈstenʃn tuː rɪˈteɪn əˈkaʊnts kənˈsɪdərɪŋ ˌkænsəˈleɪʃn/',
    vi: 'Mọi người có đề xuất tặng thêm 30 ngày dùng thử để giữ chân các tài khoản đang cân nhắc hủy dịch vụ không?',
    context: 'Thảo luận phương án giữ chân khách hàng (retention).',
    politenessTip: 'Dùng "retain accounts" thay cho "keep customers" chuẩn văn phong B2B.',
  },
  {
    id: 'wm-ex-69',
    industry: 'Kinh doanh & CSKH',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'The client asked to revise the service scope, so I will submit the updated proposal tomorrow morning.',
    ipa: '/ðə ˈklaɪənt æskt tuː rɪˈvaɪz ðə ˈsɜːrvɪs skoʊp soʊ aɪ wɪl səbˈmɪt ði ʌpˈdeɪtɪd prəˈpoʊzl təˈmɑːroʊ ˈmɔːrnɪŋ/',
    vi: 'Khách hàng yêu cầu điều chỉnh phạm vi dịch vụ nên tôi sẽ nộp bản đề xuất cập nhật vào sáng mai.',
    context: 'Báo cáo dời thời gian gửi proposal do khách hàng thay đổi yêu cầu.',
    politenessTip: 'Nêu rõ hành động tiếp theo và thời điểm hoàn thành mới.',
  },
  {
    id: 'wm-ex-70',
    industry: 'Kinh doanh & CSKH',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'We can provide dedicated onboarding support if your team commits to an annual billing cycle.',
    ipa: '/wi kæn prəˈvaɪd ˈdedɪkeɪtɪd ˈɑːnbɔːrdɪŋ səˈpɔːrt ɪf jʊr tiːm kəˈmɪts tuː ən ˈænjuəl ˈbɪlɪŋ ˈsaɪkl/',
    vi: 'Chúng tôi có thể hỗ trợ triển khai riêng nếu phía anh/chị cam kết chu kỳ thanh toán theo năm.',
    context: 'Đàm phán điều kiện hợp đồng với khách hàng doanh nghiệp.',
    politenessTip: 'Trao đổi quyền lợi dịch vụ lấy cam kết thanh toán năm giúp tối ưu dòng tiền.',
  },
  {
    id: 'wm-ex-71',
    industry: 'Kinh doanh & CSKH',
    subType: 'Daily Standup',
    level: 'B1',
    en: 'Yesterday I resolved an escalated billing complaint, and today I am reviewing our FAQ macros.',
    ipa: '/ˈjestərdeɪ aɪ rɪˈzɑːlvd ən ˈeskəleɪtɪd ˈbɪlɪŋ kəmˈpleɪnt ænd təˈdeɪ aɪ æm rɪˈvjuːɪŋ ˈaʊər ˌefeɪˈkjuː ˈmækroʊz/',
    vi: 'Hôm qua tôi đã xử lý xong khiếu nại thanh toán cấp độ cao, hôm nay tôi đang rà soát lại các mẫu trả lời nhanh.',
    context: 'Họp đầu ngày của nhóm chăm sóc khách hàng.',
    politenessTip: '"Escalated complaint" chỉ những khiếu nại đã được chuyển lên cấp cao hơn.',
  },
  {
    id: 'wm-ex-72',
    industry: 'Kinh doanh & CSKH',
    subType: 'Báo cáo tiến độ',
    level: 'B2',
    en: 'We have hit eighty-two percent of our monthly sales quota with five working days remaining.',
    ipa: '/wi hæv hɪt ˈeɪti tuː pərˈsent əv ˈaʊər ˈmʌnθli seɪlz ˈkwoʊtə wɪð faɪv ˈwɜːrkɪŋ deɪz rɪˈmeɪnɪŋ/',
    vi: 'Chúng tôi đã đạt 82% chỉ tiêu doanh số tháng khi vẫn còn 5 ngày làm việc.',
    context: 'Báo cáo tiến độ doanh số cuối tháng.',
    politenessTip: 'Nhấn mạnh số ngày còn lại giúp đội ngũ thấy mục tiêu khả thi.',
  },
  {
    id: 'wm-ex-73',
    industry: 'Kinh doanh & CSKH',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'How should we prioritize inbound demo requests from smaller startups versus enterprise inquiries?',
    ipa: '/haʊ ʃʊd wi praɪˈɔːrətaɪz ˈɪnbaʊnd ˈdemoʊ rɪˈkwests frʌm ˈsmɔːlər ˈstɑːrtʌps ˈvɜːrsəs ˈentərpraɪz ˈɪnkwəriz/',
    vi: 'Chúng ta nên ưu tiên thế nào giữa các yêu cầu demo từ startup nhỏ và yêu cầu từ doanh nghiệp lớn?',
    context: 'Xin ý kiến phân bổ nguồn lực tư vấn bán hàng.',
    politenessTip: 'Đặt câu hỏi so sánh rõ hai nhóm đối tượng giúp sếp đưa ra tiêu chí nhanh.',
  },
  {
    id: 'wm-ex-74',
    industry: 'Kinh doanh & CSKH',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'Because the prospect’s procurement team requested a security questionnaire, closing will shift to next week.',
    ipa: '/bɪˈkɔːz ðə ˈprɑːspekts prəˈkjʊrmənt tiːm rɪˈkwestɪd ə sɪˈkjʊrəti ˌkwestʃəˈner ˈkloʊzɪŋ wɪl ʃɪft tuː nekst wiːk/',
    vi: 'Do bộ phận mua hàng của khách yêu cầu điền bảng khảo sát bảo mật, thời điểm chốt hợp đồng sẽ dời sang tuần sau.',
    context: 'Giải thích lý do lùi ngày ký hợp đồng trong cuộc họp forecast.',
    politenessTip: 'Dùng "shift to next week" nghe tự nhiên trong báo cáo bán hàng.',
  },
  {
    id: 'wm-ex-75',
    industry: 'Kinh doanh & CSKH',
    subType: 'Đàm phán',
    level: 'C1',
    en: 'Rather than discounting the base license, we can add two complimentary admin seats for the first year.',
    ipa: '/ˈræðər ðæn ˈdɪskaʊntɪŋ ðə beɪs ˈlaɪsns wi kæn æd tuː ˌkɑːmplɪˈmentəri ˈædmɪn siːts fɔːr ðə fɜːrst jɪr/',
    vi: 'Thay vì giảm giá gói bản quyền cơ bản, chúng tôi có thể tặng thêm 2 tài khoản quản trị trong năm đầu tiên.',
    context: 'Đàm phán bảo vệ mức giá chuẩn trong hợp đồng SaaS.',
    politenessTip: 'Tặng thêm tài khoản ("admin seats") giữ được giá trị hợp đồng cho kỳ gia hạn sau.',
  },
  {
    id: 'wm-ex-76',
    industry: 'Kinh doanh & CSKH',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'I am preparing the Q3 customer satisfaction slides and need the latest churn figures from ops.',
    ipa: '/aɪ æm prɪˈperɪŋ ðə kjuː θriː ˈkʌstəmər ˌsætɪsˈfækʃn slaɪdz ænd niːd ðə ˈleɪtɪst tʃɜːrn ˈfɪɡjərz frʌm ɑːps/',
    vi: 'Tôi đang chuẩn bị slide mức độ hài lòng khách hàng quý 3 và cần số liệu rời bỏ mới nhất từ bộ phận vận hành.',
    context: 'Cập nhật đầu việc và nêu dữ liệu cần phối hợp.',
    politenessTip: '"Churn figures" là thuật ngữ chuẩn chỉ tỷ lệ khách hàng ngừng sử dụng.',
  },
  {
    id: 'wm-ex-77',
    industry: 'Kinh doanh & CSKH',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'All twenty onboarding calls for this week have been scheduled and assigned to account managers.',
    ipa: '/ɔːl ˈtwenti ˈɑːnbɔːrdɪŋ kɔːlz fɔːr ðɪs wiːk hæv bɪn ˈskedʒuːld ænd əˈsaɪnd tuː əˈkaʊnt ˈmænɪdʒərz/',
    vi: 'Toàn bộ 20 cuộc gọi hướng dẫn ban đầu trong tuần này đã được lên lịch và phân công cho các quản lý tài khoản.',
    context: 'Báo cáo tiến độ bàn giao khách hàng mới.',
    politenessTip: 'Xác nhận đã phân công cụ thể giúp tránh bỏ sót khách hàng mới.',
  },

  // 7. Phỏng vấn & Nhân sự (12)
  {
    id: 'wm-ex-78',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Xin ý kiến',
    level: 'B2',
    en: 'Do the hiring managers prefer a take-home assignment or a live case study for the second round?',
    ipa: '/duː ðə ˈhaɪərɪŋ ˈmænɪdʒərz prɪˈfɜːr ə ˈteɪk hoʊm əˈsaɪnmənt ɔːr ə laɪv keɪs ˈstʌdi fɔːr ðə ˈsekənd raʊnd/',
    vi: 'Các trưởng bộ phận tuyển dụng thích bài kiểm tra làm ở nhà hay giải tình huống trực tiếp cho vòng hai hơn?',
    context: 'Thống nhất quy trình phỏng vấn với bộ phận chuyên môn.',
    politenessTip: 'Đưa ra hai phương án rõ ràng giúp người quyết định chọn nhanh.',
  },
  {
    id: 'wm-ex-79',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'Two panelists are out sick today, so we need to reschedule Friday’s final interviews to Monday.',
    ipa: '/tuː ˈpænəlɪsts ɑːr aʊt sɪk təˈdeɪ soʊ wi niːd tuː ˌriːˈskedʒuːl ˈfraɪdeɪz ˈfaɪnl ˈɪntərvjuːz tuː ˈmʌndeɪ/',
    vi: 'Hai thành viên hội đồng phỏng vấn hôm nay bị ốm nên chúng ta cần dời lịch phỏng vấn vòng cuối sang thứ Hai.',
    context: 'Thông báo đổi lịch phỏng vấn ứng viên.',
    politenessTip: 'Dùng "panelists" chỉ các thành viên tham gia hội đồng phỏng vấn.',
  },
  {
    id: 'wm-ex-80',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Đàm phán',
    level: 'C1',
    en: 'While the base salary is at the top of our band, we can offer a sign-on bonus to bridge the gap.',
    ipa: '/waɪl ðə beɪs ˈsæləri ɪz æt ðə tɑːp əv ˈaʊər bænd wi kæn ˈɔːfər ə ˈsaɪn ɑːn ˈboʊnəs tuː brɪdʒ ðə ɡæp/',
    vi: 'Dù mức lương cơ bản đã ở trần khung lương, chúng tôi có thể đề xuất thưởng gia nhập để thu hẹp khoảng cách kỳ vọng.',
    context: 'Thương lượng gói đãi ngộ (offer) với ứng viên cấp cao.',
    politenessTip: '"Bridge the gap" là cụm rất khéo khi thương lượng chênh lệch mức lương.',
  },
  {
    id: 'wm-ex-81',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Yesterday I screened twelve resumes, and today I am conducting four phone interviews for the analyst role.',
    ipa: '/ˈjestərdeɪ aɪ skriːnd twelv ˈrezumeɪz ænd təˈdeɪ aɪ æm kənˈdʌktɪŋ fɔːr foʊn ˈɪntərvjuːz fɔːr ði ˈænəlɪst roʊl/',
    vi: 'Hôm qua tôi đã sàng lọc 12 hồ sơ, hôm nay tôi sẽ phỏng vấn qua điện thoại 4 ứng viên cho vị trí chuyên viên phân tích.',
    context: 'Họp đầu ngày của nhóm tuyển dụng (TA/HR).',
    politenessTip: 'Động từ "screened" chuẩn xác cho bước lọc hồ sơ ứng viên.',
  },
  {
    id: 'wm-ex-82',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'Offer acceptance rate this quarter reached eighty-eight percent, up ten points from last quarter.',
    ipa: '/ˈɔːfər əkˈseptəns reɪt ðɪs ˈkwɔːrtər riːtʃt ˈeɪti eɪt pərˈsent ʌp ten pɔɪnts frʌm læst ˈkwɔːrtər/',
    vi: 'Tỷ lệ nhận thư mời làm việc quý này đạt 88%, tăng 10 điểm phần trăm so với quý trước.',
    context: 'Báo cáo chỉ số tuyển dụng định kỳ.',
    politenessTip: 'So sánh với quý trước ("up ten points") làm nổi bật sự cải thiện.',
  },
  {
    id: 'wm-ex-83',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Xin ý kiến',
    level: 'B2',
    en: 'Should we widen the job description to allow remote candidates from neighboring cities?',
    ipa: '/ʃʊd wi ˈwaɪdn ðə dʒɑːb dɪˈskrɪpʃn tuː əˈlaʊ rɪˈmoʊt ˈkændɪdeɪts frʌm ˈneɪbərɪŋ ˈsɪtiz/',
    vi: 'Chúng ta có nên mở rộng mô tả công việc để đón nhận ứng viên làm từ xa ở các thành phố lân cận không?',
    context: 'Đề xuất mở rộng nguồn ứng viên khi vị trí khó tuyển.',
    politenessTip: 'Dùng "widen the job description" khi muốn nới lỏng điều kiện tuyển dụng.',
  },
  {
    id: 'wm-ex-84',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'Background checks are taking longer than expected, so the candidate’s start date will move to the fifteenth.',
    ipa: '/ˈbækɡraʊnd tʃeks ɑːr ˈteɪkɪŋ ˈlɔːŋɡər ðæn ɪkˈspektɪd soʊ ðə ˈkændɪdeɪts stɑːrt deɪt wɪl muːv tuː ðə ˌfɪfˈtiːnθ/',
    vi: 'Bước xác minh lý lịch đang lâu hơn dự kiến nên ngày nhận việc của ứng viên sẽ chuyển sang ngày 15.',
    context: 'Cập nhật ngày onboarding của nhân sự mới.',
    politenessTip: 'Báo sớm cho bộ phận IT và quản lý trực tiếp để điều chỉnh lịch chuẩn bị máy tính.',
  },
  {
    id: 'wm-ex-85',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'If the engineering team can commit to forty-eight-hour feedback, we will lose far fewer top candidates.',
    ipa: '/ɪf ði ˌendʒɪˈnɪrɪŋ tiːm kæn kəˈmɪt tuː ˈfɔːrti eɪt ˈaʊər ˈfiːdbæk wi wɪl luːz fɑːr ˈfjuːər tɑːp ˈkændɪdeɪts/',
    vi: 'Nếu nhóm kỹ thuật cam kết trả kết quả phỏng vấn trong 48 giờ, chúng ta sẽ ít bị mất ứng viên giỏi hơn nhiều.',
    context: 'Thương lượng SLA chấm phỏng vấn giữa HR và Hiring Manager.',
    politenessTip: 'Gắn cam kết quy trình với kết quả giữ chân nhân tài giúp tăng tính hợp tác.',
  },
  {
    id: 'wm-ex-86',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Daily Standup',
    level: 'B1',
    en: 'I am finalizing the onboarding checklist for Monday’s five new hires and confirming their buddy assignments.',
    ipa: '/aɪ æm ˈfaɪnəlaɪzɪŋ ði ˈɑːnbɔːrdɪŋ ˈtʃeklɪst fɔːr ˈmʌndeɪz faɪv nuː ˈhaɪərz ænd kənˈfɜːrmɪŋ ðer ˈbʌdi əˈsaɪnmənts/',
    vi: 'Tôi đang hoàn tất danh sách đón nhân sự mới cho 5 bạn vào thứ Hai và xác nhận người hướng dẫn đồng hành.',
    context: 'Cập nhật công tác chuẩn bị tiếp nhận nhân viên mới.',
    politenessTip: '"Buddy assignments" là cách gọi thân thiện người đồng hành hỗ trợ nhân viên mới.',
  },
  {
    id: 'wm-ex-87',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Báo cáo tiến độ',
    level: 'B2',
    en: 'Ninety-four percent of employees have completed the annual compliance training ahead of Friday’s cutoff.',
    ipa: '/ˈnaɪnti fɔːr pərˈsent əv ɪmˈplɔɪiːz hæv kəmˈpliːtɪd ði ˈænjuəl kəmˈplaɪəns ˈtreɪnɪŋ əˈhed əv ˈfraɪdeɪz ˈkʌtɔːf/',
    vi: '94% nhân viên đã hoàn thành khóa đào tạo tuân thủ hàng năm trước hạn chót thứ Sáu.',
    context: 'Báo cáo tiến độ đào tạo nội bộ toàn công ty.',
    politenessTip: 'Từ "cutoff" dùng rất tự nhiên để chỉ mốc thời gian khóa sổ.',
  },
  {
    id: 'wm-ex-88',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Which benefits perk should we highlight most prominently in our campus recruitment campaign?',
    ipa: '/wɪtʃ ˈbenɪfɪts pɜːrk ʃʊd wi ˈhaɪlaɪt moʊst ˈprɑːmɪnəntli ɪn ˈaʊər ˈkæmpəs rɪˈkruːtmənt kæmˈpeɪn/',
    vi: 'Chúng ta nên nhấn mạnh phúc lợi nào nổi bật nhất trong chiến dịch tuyển dụng sinh viên sắp tới?',
    context: 'Thảo luận thông điệp truyền thông tuyển dụng.',
    politenessTip: '"Employer branding" hiệu quả khi chọn đúng phúc lợi phù hợp đối tượng ứng viên.',
  },
  {
    id: 'wm-ex-89',
    industry: 'Phỏng vấn & Nhân sự',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'Because several departments are still calibrating ratings, we will publish the promotion list next Wednesday.',
    ipa: '/bɪˈkɔːz ˈsevrəl dɪˈpɑːrtmənts ɑːr stɪl ˈkælɪbreɪtɪŋ ˈreɪtɪŋz wi wɪl ˈpʌblɪʃ ðə prəˈmoʊʃn lɪst nekst ˈwenzdeɪ/',
    vi: 'Do một số phòng ban vẫn đang cân chỉnh điểm đánh giá, chúng tôi sẽ công bố danh sách thăng chức vào thứ Tư tuần sau.',
    context: 'Thông báo dời lịch công bố kết quả đánh giá năng lực.',
    politenessTip: 'Thuật ngữ "calibrating ratings" chỉ quá trình họp cân chỉnh đánh giá giữa các quản lý.',
  },

  // 8. Y tế & Sức khỏe (12)
  {
    id: 'wm-ex-90',
    industry: 'Y tế & Sức khỏe',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'If we stagger nurse shift handovers by fifteen minutes, we can cut patient wait times during peak hours.',
    ipa: '/ɪf wi ˈstæɡər nɜːrs ʃɪft ˈhændoʊvərz baɪ ˌfɪfˈtiːn ˈmɪnɪts wi kæn kʌt ˈpeɪʃnt weɪt taɪmz ˈdjʊrɪŋ piːk ˈaʊərz/',
    vi: 'Nếu chúng ta bố trí bàn giao ca điều dưỡng lệch nhau 15 phút, ta có thể giảm thời gian chờ của bệnh nhân giờ cao điểm.',
    context: 'Đề xuất điều chỉnh lịch trực tại phòng khám hoặc bệnh viện.',
    politenessTip: 'Động từ "stagger" nghĩa là sắp xếp lệch giờ nhau, rất hữu ích khi tối ưu ca trực.',
  },
  {
    id: 'wm-ex-91',
    industry: 'Y tế & Sức khỏe',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Today our clinic has forty-two scheduled appointments, and I am overseeing triage at station two.',
    ipa: '/təˈdeɪ ˈaʊər ˈklɪnɪk hæz ˈfɔːrti tuː ˈskedʒuːld əˈpɔɪntmənts ænd aɪ æm ˌoʊvərˈsiːɪŋ triˈɑːʒ æt ˈsteɪʃn tuː/',
    vi: 'Hôm nay phòng khám có 42 lịch hẹn, và tôi phụ trách phân loại bệnh nhân tại bàn số 2.',
    context: 'Họp giao ban đầu ca tại cơ sở y tế.',
    politenessTip: 'Từ "triage" chỉ khâu sàng lọc, phân loại mức độ ưu tiên bệnh nhân.',
  },
  {
    id: 'wm-ex-92',
    industry: 'Y tế & Sức khỏe',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'All cold-chain vaccine storage logs passed this morning’s temperature inspection without variance.',
    ipa: '/ɔːl koʊld tʃeɪn vækˈsiːn ˈstɔːrɪdʒ lɔːɡz pæst ðɪs ˈmɔːrnɪŋz ˈtemprətʃər ɪnˈspekʃn wɪˈðaʊt ˈveriəns/',
    vi: 'Toàn bộ nhật ký bảo quản vắc-xin chuỗi lạnh đều đạt kiểm tra nhiệt độ sáng nay mà không có sai lệch.',
    context: 'Báo cáo kiểm tra an toàn y tế hàng ngày.',
    politenessTip: '"Without variance" khẳng định thông số chuẩn xác 100%, không dao động ngoài ngưỡng.',
  },
  {
    id: 'wm-ex-93',
    industry: 'Y tế & Sức khỏe',
    subType: 'Xin ý kiến',
    level: 'B2',
    en: 'Would the clinical team support adding automated SMS reminders twenty-four hours before lab visits?',
    ipa: '/wʊd ðə ˈklɪnɪkl tiːm səˈpɔːrt ˈædɪŋ ˈɔːtəmeɪtɪd ˌesemˈes rɪˈmaɪndərz ˈtwenti fɔːr ˈaʊərz bɪˈfɔːr læb ˈvɪzɪts/',
    vi: 'Đội ngũ lâm sàng có ủng hộ việc thêm tin nhắn SMS nhắc lịch tự động trước 24 giờ cho các buổi xét nghiệm không?',
    context: 'Xin ý kiến cải thiện tỷ lệ bệnh nhân đến đúng hẹn.',
    politenessTip: 'Nêu rõ thời điểm nhắc lịch ("24 hours before") giúp đánh giá tính khả thi ngay.',
  },
  {
    id: 'wm-ex-94',
    industry: 'Y tế & Sức khỏe',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'Because the lab analyzer needs recalibration, non-urgent blood panel results will be delayed by four hours.',
    ipa: '/bɪˈkɔːz ðə læb ˈænəlaɪzər niːdz ˌriːkælɪˈbreɪʃn nɑːn ˈɜːrdʒənt blʌd ˈpænl rɪˈzʌlts wɪl bi dɪˈleɪd baɪ fɔːr ˈaʊərz/',
    vi: 'Do máy phân tích xét nghiệm cần hiệu chuẩn lại, kết quả xét nghiệm máu không khẩn cấp sẽ chậm hơn 4 giờ.',
    context: 'Thông báo điều chỉnh thời gian trả kết quả xét nghiệm.',
    politenessTip: 'Phân biệt rõ "non-urgent" để đảm bảo các ca cấp cứu vẫn được ưu tiên.',
  },
  {
    id: 'wm-ex-95',
    industry: 'Y tế & Sức khỏe',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'Can the medical supplier guarantee same-day replacement if any diagnostic kit arrives with broken seals?',
    ipa: '/kæn ðə ˈmedɪkl səˈplaɪər ˌɡærənˈtiː seɪm deɪ rɪˈpleɪsmənt ɪf ˈeni ˌdaɪəɡˈnɑːstɪk kɪt əˈraɪvz wɪð ˈbroʊkən siːlz/',
    vi: 'Nhà cung cấp vật tư y tế có thể cam kết đổi trả trong ngày nếu bộ kit chẩn đoán bị rách niêm phong khi giao tới không?',
    context: 'Thương lượng điều khoản chất lượng với nhà cung cấp thiết bị y tế.',
    politenessTip: 'Đặt điều kiện rõ ràng về niêm phong ("broken seals") bảo vệ an toàn chuyên môn.',
  },
  {
    id: 'wm-ex-96',
    industry: 'Y tế & Sức khỏe',
    subType: 'Daily Standup',
    level: 'B1',
    en: 'Yesterday I updated patient consent forms, and today I am auditing the pharmacy restock list.',
    ipa: '/ˈjestərdeɪ aɪ ʌpˈdeɪtɪd ˈpeɪʃnt kənˈsent fɔːrmz ænd təˈdeɪ aɪ æm ˈɔːdɪtɪŋ ðə ˈfɑːrməsi ˈriːstɑːk lɪst/',
    vi: 'Hôm qua tôi đã cập nhật mẫu phiếu đồng thuận bệnh nhân, hôm nay tôi đang kiểm tra danh sách bổ sung thuốc.',
    context: 'Cập nhật công việc hành chính - dược trong buổi họp sáng.',
    politenessTip: '"Patient consent forms" là thuật ngữ chuẩn cho phiếu cam kết/đồng thuận điều trị.',
  },
  {
    id: 'wm-ex-97',
    industry: 'Y tế & Sức khỏe',
    subType: 'Báo cáo tiến độ',
    level: 'B2',
    en: 'Patient portal adoption rose to sixty-eight percent after we placed QR guides at reception.',
    ipa: '/ˈpeɪʃnt ˈpɔːrtl əˈdɑːpʃn roʊz tuː ˈsɪksti eɪt pərˈsent ˈæftər wi pleɪst kjuː ɑːr ɡaɪdz æt rɪˈsepʃn/',
    vi: 'Tỷ lệ bệnh nhân sử dụng cổng thông tin trực tuyến tăng lên 68% sau khi chúng tôi đặt hướng dẫn mã QR tại quầy lễ tân.',
    context: 'Báo cáo kết quả chuyển đổi số trải nghiệm bệnh nhân.',
    politenessTip: 'Gắn số liệu tăng trưởng với hành động cụ thể giúp dễ nhân rộng mô hình.',
  },
  {
    id: 'wm-ex-98',
    industry: 'Y tế & Sức khỏe',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Should we reserve two morning slots daily for walk-in urgent follow-ups?',
    ipa: '/ʃʊd wi rɪˈzɜːrv tuː ˈmɔːrnɪŋ slɑːts ˈdeɪli fɔːr ˈwɔːkɪn ˈɜːrdʒənt ˈfɑːloʊʌps/',
    vi: 'Chúng ta có nên giữ lại hai khung giờ sáng mỗi ngày cho các ca tái khám khẩn không đặt trước không?',
    context: 'Xin ý kiến bác sĩ trưởng về lịch khám linh hoạt.',
    politenessTip: '"Walk-in" chỉ bệnh nhân đến trực tiếp không hẹn trước.',
  },
  {
    id: 'wm-ex-99',
    industry: 'Y tế & Sức khỏe',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'Pending the ethics committee’s sign-off, we will push the wellness workshop launch to next month.',
    ipa: '/ˈpendɪŋ ði ˈeθɪks kəˈmɪtiz ˈsaɪn ɔːf wi wɪl pʊʃ ðə ˈwelnəs ˈwɜːrkʃɑːp lɔːntʃ tuː nekst mʌnθ/',
    vi: 'Trong lúc chờ phê duyệt của hội đồng đạo đức, chúng tôi sẽ dời buổi hội thảo chăm sóc sức khỏe sang tháng sau.',
    context: 'Thông báo lùi lịch chương trình sức khỏe cộng đồng.',
    politenessTip: 'Cụm "Pending + danh từ" mở đầu câu báo cáo rất chuyên nghiệp.',
  },
  {
    id: 'wm-ex-100',
    industry: 'Y tế & Sức khỏe',
    subType: 'Đàm phán',
    level: 'C1',
    en: 'We can extend evening physiotherapy hours if administrative intake closes thirty minutes earlier.',
    ipa: '/wi kæn ɪkˈstend ˈiːvnɪŋ ˌfɪzioʊˈθerəpi ˈaʊərz ɪf ədˈmɪnɪstreɪtɪv ˈɪnteɪk ˈkloʊzɪz ˈθɜːrti ˈmɪnɪts ˈɜːrliər/',
    vi: 'Chúng tôi có thể kéo dài giờ vật lý trị liệu buổi tối nếu khâu tiếp nhận hồ sơ hành chính đóng sớm hơn 30 phút.',
    context: 'Thương lượng cân đối giờ làm việc giữa khối chuyên môn và hành chính.',
    politenessTip: 'Đề xuất điều kiện cân bằng giúp nhân viên không bị quá tải cuối ca.',
  },
  {
    id: 'wm-ex-101',
    industry: 'Y tế & Sức khỏe',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'I am coordinating with the imaging unit to ensure all afternoon referrals have completed charts.',
    ipa: '/aɪ æm koʊˈɔːrdɪneɪtɪŋ wɪð ði ˈɪmɪdʒɪŋ ˈjuːnɪt tuː ɪnˈʃʊr ɔːl ˌæftərˈnuːn rɪˈfɜːrlz hæv kəmˈpliːtɪd tʃɑːrts/',
    vi: 'Tôi đang phối hợp với khoa chẩn đoán hình ảnh để đảm bảo mọi ca chuyển tuyến buổi chiều đều đủ hồ sơ bệnh án.',
    context: 'Họp phối hợp liên khoa đầu ngày.',
    politenessTip: '"Completed charts" là cụm từ chuẩn chỉ hồ sơ bệnh án đã điền đầy đủ.',
  },

  // 9. Tài chính & Logistics (12)
  {
    id: 'wm-ex-102',
    industry: 'Tài chính & Logistics',
    subType: 'Báo cáo tiến độ',
    level: 'B2',
    en: 'Month-end bank reconciliation is ninety-five percent complete, with only three foreign wire entries pending.',
    ipa: '/mʌnθ end bæŋk ˌrekənsɪliˈeɪʃn ɪz ˈnaɪnti faɪv pərˈsent kəmˈpliːt wɪð ˈoʊnli θriː ˈfɔːrən ˈwaɪər ˈentriz ˈpendɪŋ/',
    vi: 'Đối chiếu ngân hàng cuối tháng đã xong 95%, chỉ còn ba giao dịch chuyển khoản quốc tế đang chờ khớp.',
    context: 'Báo cáo tiến độ khóa sổ kế toán cuối tháng.',
    politenessTip: 'Thuật ngữ "bank reconciliation" chuẩn xác cho nghiệp vụ đối chiếu sổ phụ ngân hàng.',
  },
  {
    id: 'wm-ex-103',
    industry: 'Tài chính & Logistics',
    subType: 'Xin ý kiến',
    level: 'B2',
    en: 'Should we route peak-season shipments through the southern port to avoid customs congestion?',
    ipa: '/ʃʊd wi ruːt ˈpiːk siːzn ˈʃɪpmənts θruː ðə ˈsʌðərn pɔːrt tuː əˈvɔɪd ˈkʌstəmz kənˈdʒestʃən/',
    vi: 'Chúng ta có nên điều hướng các lô hàng mùa cao điểm qua cảng phía Nam để tránh ùn tắc hải quan không?',
    context: 'Hỏi ý kiến điều phối tuyến vận chuyển quốc tế.',
    politenessTip: 'Nêu rõ lợi ích tránh rủi ro ("avoid customs congestion") giúp dễ ra quyết định.',
  },
  {
    id: 'wm-ex-104',
    industry: 'Tài chính & Logistics',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'Because the customs broker requested an updated packing list, container clearance will shift by one day.',
    ipa: '/bɪˈkɔːz ðə ˈkʌstəmz ˈbroʊkər rɪˈkwestɪd ən ʌpˈdeɪtɪd ˈpækɪŋ lɪst kənˈteɪnər ˈklɪrəns wɪl ʃɪft baɪ wʌn deɪ/',
    vi: 'Do đại lý hải quan yêu cầu bảng kê đóng gói cập nhật, thời gian thông quan container sẽ lùi lại một ngày.',
    context: 'Thông báo chậm thông quan hàng hóa xuất nhập khẩu.',
    politenessTip: 'Dùng "container clearance" chính xác cho nghiệp vụ thông quan.',
  },
  {
    id: 'wm-ex-105',
    industry: 'Tài chính & Logistics',
    subType: 'Đàm phán',
    level: 'C1',
    en: 'If we move to net-forty-five payment terms, we will need a two percent early-settlement discount.',
    ipa: '/ɪf wi muːv tuː net ˈfɔːrti faɪv ˈpeɪmənt tɜːrmz wi wɪl niːd ə tuː pərˈsent ˈɜːrli ˈsetlmənt ˈdɪskaʊnt/',
    vi: 'Nếu chuyển sang điều khoản thanh toán 45 ngày, chúng tôi sẽ cần mức chiết khấu thanh toán sớm 2%.',
    context: 'Đàm phán điều khoản công nợ (payment terms) với đối tác.',
    politenessTip: 'Thuật ngữ "net-forty-five" và "early-settlement discount" rất chuẩn trong tài chính thương mại.',
  },
  {
    id: 'wm-ex-106',
    industry: 'Tài chính & Logistics',
    subType: 'Daily Standup',
    level: 'B1',
    en: 'Yesterday I cleared twelve customs declarations, and today I am tracking three air-freight arrivals.',
    ipa: '/ˈjestərdeɪ aɪ klɪrd twelv ˈkʌstəmz ˌdekləˈreɪʃnz ænd təˈdeɪ aɪ æm ˈtrækɪŋ θriː er freɪt əˈraɪvlz/',
    vi: 'Hôm qua tôi đã hoàn tất 12 tờ khai hải quan, hôm nay tôi đang theo dõi 3 lô hàng vận chuyển đường hàng không.',
    context: 'Họp giao ban đầu ngày của đội ngũ xuất nhập khẩu.',
    politenessTip: 'Phân biệt rõ "customs declarations" và "air-freight arrivals" giúp báo cáo mạch lạc.',
  },
  {
    id: 'wm-ex-107',
    industry: 'Tài chính & Logistics',
    subType: 'Báo cáo tiến độ',
    level: 'B2',
    en: 'Freight cost per pallet dropped by eight percent after we consolidated regional warehouse dispatches.',
    ipa: '/freɪt kɔːst pɜːr ˈpælɪt drɑːpt baɪ eɪt pərˈsent ˈæftər wi kənˈsɑːlɪdeɪtɪd ˈriːdʒənl ˈwerhaʊs dɪˈspætʃɪz/',
    vi: 'Chi phí vận tải trên mỗi pallet đã giảm 8% sau khi chúng tôi gom chuyến xuất kho theo khu vực.',
    context: 'Báo cáo hiệu quả tối ưu chi phí kho vận.',
    politenessTip: 'Đo lường theo đơn vị "cost per pallet" giúp ban lãnh đạo thấy hiệu quả rõ rệt.',
  },
  {
    id: 'wm-ex-108',
    industry: 'Tài chính & Logistics',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Would finance prefer receiving vendor invoices weekly or batched on the twentieth of each month?',
    ipa: '/wʊd ˈfaɪnæns prɪˈfɜːr rɪˈsiːvɪŋ ˈvendər ˈɪnvɔɪsɪz ˈwiːkli ɔːr bætʃt ɑːn ðə ˈtwentiəθ əv iːtʃ mʌnθ/',
    vi: 'Phòng tài chính muốn nhận hóa đơn nhà cung cấp hàng tuần hay gom theo đợt vào ngày 20 mỗi tháng?',
    context: 'Phối hợp quy trình thanh toán giữa bộ phận mua hàng và kế toán.',
    politenessTip: 'Chủ động hỏi lịch thuận tiện cho phòng kế toán giúp giảm sai sót chứng từ.',
  },
  {
    id: 'wm-ex-109',
    industry: 'Tài chính & Logistics',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'Since two regional subsidiaries have not submitted tax receipts, the consolidated audit will wrap up Friday.',
    ipa: '/sɪns tuː ˈriːdʒənl səbˈsɪdieriz hæv nɑːt səbˈmɪtɪd tæks rɪˈsiːts ðə kənˈsɑːlɪdeɪtɪd ˈɔːdɪt wɪl ræp ʌp ˈfraɪdeɪ/',
    vi: 'Vì hai công ty con khu vực chưa nộp chứng từ thuế, báo cáo kiểm toán hợp nhất sẽ hoàn tất vào thứ Sáu.',
    context: 'Giải thích lý do lùi hạn báo cáo tài chính hợp nhất.',
    politenessTip: '"Consolidated audit" là thuật ngữ chuẩn cho kiểm toán hợp nhất.',
  },
  {
    id: 'wm-ex-110',
    industry: 'Tài chính & Logistics',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'We can absorb the fuel surcharge this quarter if the carrier guarantees ninety-eight percent on-time delivery.',
    ipa: '/wi kæn əbˈzɔːrb ðə ˈfjuːəl ˈsɜːrtʃɑːrdʒ ðɪs ˈkwɔːrtər ɪf ðə ˈkæriər ˌɡærənˈtiːz ˈnaɪnti eɪt pərˈsent ɑːn taɪm dɪˈlɪvəri/',
    vi: 'Chúng tôi có thể chấp nhận phụ phí nhiên liệu quý này nếu đơn vị vận tải cam kết tỷ lệ giao đúng hẹn 98%.',
    context: 'Đàm phán hợp đồng vận tải với nhà xe/hãng tàu.',
    politenessTip: 'Gắn chi phí tăng thêm với KPI cam kết chất lượng dịch vụ.',
  },
  {
    id: 'wm-ex-111',
    industry: 'Tài chính & Logistics',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Today I am verifying freight bills against signed delivery notes before approving payouts.',
    ipa: '/təˈdeɪ aɪ æm ˈverɪfaɪɪŋ freɪt bɪlz əˈɡenst saɪnd dɪˈlɪvəri noʊts bɪˈfɔːr əˈpruːvɪŋ ˈpeɪaʊts/',
    vi: 'Hôm nay tôi đang đối chiếu hóa đơn vận chuyển với biên bản giao nhận đã ký trước khi duyệt chi.',
    context: 'Báo cáo đầu ngày của kế toán công nợ phải trả.',
    politenessTip: '"Delivery notes" là biên bản giao nhận hàng hóa.',
  },
  {
    id: 'wm-ex-112',
    industry: 'Tài chính & Logistics',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'Warehouse pick-and-pack accuracy reached ninety-nine point four percent following the barcode scanner upgrade.',
    ipa: '/ˈwerhaʊs pɪk ænd pæk ˈækjərəsi riːtʃt ˈnaɪnti naɪn pɔɪnt fɔːr pərˈsent ˈfɑːloʊɪŋ ðə ˈbɑːrkoʊd ˈskænər ˈʌpɡreɪd/',
    vi: 'Độ chính xác khâu lấy và đóng gói hàng tại kho đạt 99,4% sau khi nâng cấp máy quét mã vạch.',
    context: 'Báo cáo chất lượng vận hành kho hàng.',
    politenessTip: '"Pick-and-pack accuracy" là chỉ số cốt lõi trong quản lý kho.',
  },
  {
    id: 'wm-ex-113',
    industry: 'Tài chính & Logistics',
    subType: 'Xin ý kiến',
    level: 'B2',
    en: 'Should we hedge fifty percent of next quarter’s foreign currency exposure given recent exchange swings?',
    ipa: '/ʃʊd wi hedʒ ˈfɪfti pərˈsent əv nekst ˈkwɔːrtərz ˈfɔːrən ˈkɜːrənsi ɪkˈspoʊʒər ˈɡɪvn ˈriːsnt ɪksˈtʃeɪndʒ swɪŋz/',
    vi: 'Chúng ta có nên phòng ngừa rủi ro tỷ giá cho 50% lượng ngoại tệ quý tới trước biến động gần đây không?',
    context: 'Xin ý kiến ban tài chính về quản trị rủi ro tỷ giá.',
    politenessTip: 'Thuật ngữ "hedge... foreign currency exposure" chuẩn văn phong tài chính doanh nghiệp.',
  },

  // 10. Giáo dục & Xã hội (12)
  {
    id: 'wm-ex-114',
    industry: 'Giáo dục & Xã hội',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'Because two partner schools requested syllabus adjustments, we will release the final timetable on Thursday.',
    ipa: '/bɪˈkɔːz tuː ˈpɑːrtnər skuːlz rɪˈkwestɪd ˈsɪləbəs əˈdʒʌstmənts wi wɪl rɪˈliːs ðə ˈfaɪnl ˈtaɪmteɪbl ɑːn ˈθɜːrzdeɪ/',
    vi: 'Do hai trường đối tác đề nghị điều chỉnh đề cương, chúng tôi sẽ công bố thời khóa biểu chính thức vào thứ Năm.',
    context: 'Thông báo dời lịch công bố thời khóa biểu đào tạo.',
    politenessTip: 'Nêu rõ lý do phối hợp với đối tác để giảng viên và học viên thông cảm.',
  },
  {
    id: 'wm-ex-115',
    industry: 'Giáo dục & Xã hội',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'If the community center provides the auditorium, our team can deliver the weekend career workshops free of charge.',
    ipa: '/ɪf ðə kəˈmjuːnəti ˈsentər prəˈvaɪdz ði ˌɔːdɪˈtɔːriəm ˈaʊər tiːm kæn dɪˈlɪvər ðə ˈwiːkend kəˈrɪr ˈwɜːrkʃɑːps friː əv tʃɑːrdʒ/',
    vi: 'Nếu trung tâm cộng đồng hỗ trợ hội trường, nhóm chúng tôi có thể tổ chức miễn phí các buổi hướng nghiệp cuối tuần.',
    context: 'Thương lượng hợp tác tổ chức sự kiện giáo dục cộng đồng.',
    politenessTip: 'Đề xuất trao đổi nguồn lực ("provides the auditorium") giúp đôi bên tiết kiệm ngân sách.',
  },
  {
    id: 'wm-ex-116',
    industry: 'Giáo dục & Xã hội',
    subType: 'Daily Standup',
    level: 'A2',
    en: 'Today I am grading the midterm essays and preparing feedback notes for afternoon tutoring.',
    ipa: '/təˈdeɪ aɪ æm ˈɡreɪdɪŋ ðə ˈmɪdtɜːrm ˈeseɪz ænd prɪˈperɪŋ ˈfiːdbæk noʊts fɔːr ˌæftərˈnuːn ˈtuːtərɪŋ/',
    vi: 'Hôm nay tôi đang chấm bài luận giữa kỳ và chuẩn bị nhận xét cho buổi phụ đạo chiều nay.',
    context: 'Cập nhật công việc hàng ngày của giảng viên/trợ giảng.',
    politenessTip: 'Dùng "grading" và "feedback notes" ngắn gọn, đúng ngữ cảnh học thuật.',
  },
  {
    id: 'wm-ex-117',
    industry: 'Giáo dục & Xã hội',
    subType: 'Báo cáo tiến độ',
    level: 'B1',
    en: 'Enrollment for the autumn coding cohort reached ninety-two percent of capacity three weeks ahead of launch.',
    ipa: '/ɪnˈroʊlmənt fɔːr ði ˈɔːtəm ˈkoʊdɪŋ ˈkoʊhɔːrt riːtʃt ˈnaɪnti tuː pərˈsent əv kəˈpæsəti θriː wiːks əˈhed əv lɔːntʃ/',
    vi: 'Số lượng ghi danh khóa lập trình mùa thu đã đạt 92% sức chứa trước ngày khai giảng 3 tuần.',
    context: 'Báo cáo tuyển sinh khóa học.',
    politenessTip: '"Cohort" là từ chuẩn để chỉ một khóa/đợt học viên học cùng nhau.',
  },
  {
    id: 'wm-ex-118',
    industry: 'Giáo dục & Xã hội',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Would parents prefer receiving student progress reports via our app or during monthly video check-ins?',
    ipa: '/wʊd ˈperənts prɪˈfɜːr rɪˈsiːvɪŋ ˈstuːdnt ˈprɑːɡres rɪˈpɔːrts ˈvaɪə ˈaʊər æp ɔːr ˈdjʊrɪŋ ˈmʌnθli ˈvɪdioʊ ˈtʃekɪnz/',
    vi: 'Phụ huynh thích nhận báo cáo tiến độ học tập qua ứng dụng hay qua buổi trao đổi video hàng tháng hơn?',
    context: 'Lấy ý kiến cải thiện kênh liên lạc giữa nhà trường và gia đình.',
    politenessTip: 'Đưa ra hai kênh cụ thể giúp thảo luận tập trung vào trải nghiệm phụ huynh.',
  },
  {
    id: 'wm-ex-119',
    industry: 'Giáo dục & Xã hội',
    subType: 'Trì hoãn deadline',
    level: 'B2',
    en: 'To allow extra time for peer review, we are extending the scholarship application window until Sunday night.',
    ipa: '/tuː əˈlaʊ ˈekstrə taɪm fɔːr pɪr rɪˈvjuː wi ɑːr ɪkˈstendɪŋ ðə ˈskɑːlərʃɪp ˌæplɪˈkeɪʃn ˈwɪndoʊ ənˈtɪl ˈsʌndeɪ naɪt/',
    vi: 'Để có thêm thời gian đánh giá chéo hồ sơ, chúng tôi gia hạn thời gian nộp đơn học bổng đến tối Chủ nhật.',
    context: 'Thông báo gia hạn nhận hồ sơ chương trình giáo dục.',
    politenessTip: '"Application window" nghĩa là khung thời gian mở đơn đăng ký.',
  },
  {
    id: 'wm-ex-120',
    industry: 'Giáo dục & Xã hội',
    subType: 'Đàm phán',
    level: 'B2',
    en: 'Can we cap class size at sixteen learners so every student receives sufficient speaking practice?',
    ipa: '/kæn wi kæp klæs saɪz æt ˌsɪksˈtiːn ˈlɜːrnərz soʊ ˈevri ˈstuːdnt rɪˈsiːvz səˈfɪʃnt ˈspiːkɪŋ ˈpræktɪs/',
    vi: 'Chúng ta có thể giới hạn sĩ số lớp ở mức 16 học viên để mỗi bạn đều được thực hành nói đầy đủ không?',
    context: 'Thương lượng sĩ số lớp với bộ phận vận hành đào tạo.',
    politenessTip: 'Đặt chất lượng đầu ra của học viên làm lý do chính khi đề xuất giới hạn sĩ số.',
  },
  {
    id: 'wm-ex-121',
    industry: 'Giáo dục & Xã hội',
    subType: 'Daily Standup',
    level: 'B1',
    en: 'Yesterday I briefed five volunteer mentors, and today I am testing the livestream setup for the seminar.',
    ipa: '/ˈjestərdeɪ aɪ briːft faɪv ˌvɑːlənˈtɪr ˈmentɔːrz ænd təˈdeɪ aɪ æm ˈtestɪŋ ðə ˈlaɪvstriːm ˈsetʌp fɔːr ðə ˈsemɪnɑːr/',
    vi: 'Hôm qua tôi đã phổ biến thông tin cho 5 cố vấn tình nguyện, hôm nay tôi đang kiểm tra hệ thống phát trực tiếp cho hội thảo.',
    context: 'Họp nhanh chuẩn bị sự kiện cộng đồng.',
    politenessTip: 'Động từ "briefed" rất gọn khi nói về việc truyền đạt thông tin đầu việc.',
  },
  {
    id: 'wm-ex-122',
    industry: 'Giáo dục & Xã hội',
    subType: 'Báo cáo tiến độ',
    level: 'B2',
    en: 'Course completion rates climbed by eighteen percent after we introduced weekly micro-quizzes.',
    ipa: '/kɔːrs kəmˈpliːʃn reɪts klaɪmd baɪ ˌeɪˈtiːn pərˈsent ˈæftər wi ˌɪntrəˈduːst ˈwiːkli ˈmaɪkroʊ ˈkwɪzɪz/',
    vi: 'Tỷ lệ hoàn thành khóa học đã tăng 18% sau khi chúng tôi bổ sung các bài kiểm tra ngắn hàng tuần.',
    context: 'Báo cáo hiệu quả cải tiến phương pháp giảng dạy.',
    politenessTip: 'Kết hợp chỉ số hoàn thành và giải pháp sư phạm tạo báo cáo thuyết phục.',
  },
  {
    id: 'wm-ex-123',
    industry: 'Giáo dục & Xã hội',
    subType: 'Xin ý kiến',
    level: 'B1',
    en: 'Should we translate the parent handbook into both English and Vietnamese before orientation day?',
    ipa: '/ʃʊd wi trænzˈleɪt ðə ˈperənt ˈhændbʊk ˈɪntuː boʊθ ˈɪŋɡlɪʃ ænd ˌvjetnəˈmiːz bɪˈfɔːr ˌɔːriənˈteɪʃn deɪ/',
    vi: 'Chúng ta có nên dịch sổ tay phụ huynh sang cả tiếng Anh và tiếng Việt trước ngày định hướng không?',
    context: 'Hỏi ý kiến chuẩn bị tài liệu song ngữ cho phụ huynh.',
    politenessTip: 'Chủ động đề xuất giải pháp hỗ trợ đa ngôn ngữ thể hiện sự chu đáo.',
  },
  {
    id: 'wm-ex-124',
    industry: 'Giáo dục & Xã hội',
    subType: 'Trì hoãn deadline',
    level: 'B1',
    en: 'Because the guest lecturer’s flight was delayed, we will swap the morning and afternoon seminar slots.',
    ipa: '/bɪˈkɔːz ðə ɡest ˈlektʃərərz flaɪt wʌz dɪˈleɪd wi wɪl swɑːp ðə ˈmɔːrnɪŋ ænd ˌæftərˈnuːn ˈsemɪnɑːr slɑːts/',
    vi: 'Do chuyến bay của diễn giả khách mời bị trễ, chúng tôi sẽ đổi chỗ khung giờ hội thảo buổi sáng và buổi chiều.',
    context: 'Điều phối lịch hội thảo khi có sự cố di chuyển.',
    politenessTip: 'Đưa ngay phương án hoán đổi ("swap...") giúp sự kiện không bị gián đoạn.',
  },
  {
    id: 'wm-ex-125',
    industry: 'Giáo dục & Xã hội',
    subType: 'Đàm phán',
    level: 'C1',
    en: 'If we co-brand the youth literacy drive, both organizations can share outreach costs and media coverage.',
    ipa: '/ɪf wi koʊ brænd ðə juːθ ˈlɪtərəsi draɪv boʊθ ˌɔːrɡənəˈzeɪʃnz kæn ʃer ˈaʊtriːtʃ kɔːsts ænd ˈmiːdiə ˈkʌvərɪdʒ/',
    vi: 'Nếu chúng ta đồng thương hiệu chiến dịch đọc sách cho thanh thiếu niên, cả hai tổ chức có thể chia sẻ chi phí và độ phủ truyền thông.',
    context: 'Đàm phán hợp tác tài trợ dự án xã hội.',
    politenessTip: '"Co-brand" nhấn mạnh lợi ích hình ảnh cho cả hai bên tài trợ.',
  },
];

export const WORKPLACE_EMAIL_EXTRA: WorkplaceEmailTemplate[] = [
  // 1. Đời sống & Giao tiếp (5)
  {
    id: 'we-ex-1',
    industry: 'Đời sống & Giao tiếp',
    channel: 'Email',
    purpose: 'Mời tham gia sự kiện nội bộ',
    level: 'A2',
    title: 'Email mời đồng nghiệp tham gia tiệc chào mừng nhân sự mới',
    subject: 'Invitation: Team Welcome Lunch for [New Hire Name] – [Date]',
    enBody: `Hi everyone,

Please join us for a team welcome lunch to greet [New Hire Name], who joined our [Department] team this week.

- Date & Time: [Day, Date] at [Time]
- Location: [Restaurant / Meeting Room]

Kindly reply by [Deadline] so I can confirm the table reservation.

Best,
[Your Name]`,
    viSummary: 'Thư mời đồng nghiệp tham dự bữa trưa chào đón nhân sự mới, nêu rõ thời gian, địa điểm và hạn xác nhận.',
    structureNotes: [
      { label: 'Mở đầu', phrase: 'Please join us for a team welcome lunch to greet...', noteVi: 'Lời mời thân thiện, nêu rõ nhân vật chính của buổi tiệc.' },
      { label: 'Thông tin chính', phrase: 'Date & Time / Location', noteVi: 'Trình bày bằng gạch đầu dòng để mọi người đọc lướt nhanh.' },
      { label: 'Kêu gọi phản hồi', phrase: 'Kindly reply by [Deadline] so I can confirm...', noteVi: 'Nêu rõ lý do cần phản hồi sớm để chốt chỗ.' },
    ],
  },
  {
    id: 'we-ex-2',
    industry: 'Đời sống & Giao tiếp',
    channel: 'Slack / Teams',
    purpose: 'Nhắc giữ vệ sinh khu vực chung',
    level: 'A2',
    title: 'Tin nhắn Slack nhắc nhẹ giữ gọn gàng phòng họp & khu bếp',
    enBody: `Hi team! Quick friendly reminder to please wipe down tables, push in chairs, and clear coffee cups after using Meeting Room B and the pantry. Thanks so much for keeping our shared space welcoming for everyone!`,
    viSummary: 'Tin nhắn nhắc nhở nhẹ nhàng trên kênh chung về việc dọn dẹp phòng họp và khu vực pantry sau khi sử dụng.',
    structureNotes: [
      { label: 'Giọng điệu nhẹ nhàng', phrase: 'Quick friendly reminder...', noteVi: 'Tránh giọng điệu ra lệnh bằng cách dùng "friendly reminder".' },
      { label: 'Hành động cụ thể', phrase: 'wipe down tables, push in chairs, and clear coffee cups', noteVi: 'Nêu rõ việc cần làm thay vì nói chung chung.' },
      { label: 'Cảm ơn tích cực', phrase: 'Thanks so much for keeping our shared space welcoming...', noteVi: 'Nhấn mạnh lợi ích chung của cả tập thể.' },
    ],
  },
  {
    id: 'we-ex-3',
    industry: 'Đời sống & Giao tiếp',
    channel: 'Email',
    purpose: 'Xin lỗi vì nhầm lẫn lịch họp',
    level: 'B1',
    title: 'Email xin lỗi và gửi lại lịch họp đã điều chỉnh',
    subject: 'Correction: Updated Time for [Meeting Name]',
    enBody: `Hi [Name/Team],

Apologies for the confusion—the previous calendar invite listed the wrong time zone. I have just sent an updated invite for [New Date & Time] ([Time Zone]).

Please let me know if this revised slot no longer works for you.

Thanks for your patience,
[Your Name]`,
    viSummary: 'Email xin lỗi vì gửi nhầm múi giờ lịch họp và thông báo đã gửi lại lịch mới.',
    structureNotes: [
      { label: 'Tiêu đề rõ ràng', phrase: 'Correction: Updated Time for...', noteVi: 'Đặt từ "Correction" đầu tiêu đề để người nhận chú ý ngay.' },
      { label: 'Nhận lỗi ngắn gọn', phrase: 'Apologies for the confusion—the previous invite listed...', noteVi: 'Giải thích ngắn gọn nguyên nhân và đi thẳng vào cách khắc phục.' },
      { label: 'Kiểm tra lại', phrase: 'Please let me know if this revised slot no longer works...', noteVi: 'Thể hiện sự tôn trọng lịch trình của người nhận.' },
    ],
  },
  {
    id: 'we-ex-4',
    industry: 'Đời sống & Giao tiếp',
    channel: 'Slack / Teams',
    purpose: 'Thông báo làm việc từ xa đột xuất',
    level: 'A2',
    title: 'Tin nhắn báo làm việc tại nhà (WFH) trong ngày',
    enBody: `Good morning team, I will be working remotely today due to [a home repair / a mild cold] and will remain fully reachable on Slack and email during regular hours. Let me know if anything needs my immediate attention!`,
    viSummary: 'Thông báo làm việc từ xa trong ngày và khẳng định vẫn trực tuyến đầy đủ qua Slack/email.',
    structureNotes: [
      { label: 'Thông báo rõ', phrase: 'I will be working remotely today due to...', noteVi: 'Báo ngắn gọn lý do mà không cần đi vào chi tiết riêng tư.' },
      { label: 'Cam kết liên lạc', phrase: 'will remain fully reachable on Slack and email', noteVi: 'Giúp đồng nghiệp yên tâm vẫn có thể phối hợp bình thường.' },
    ],
  },
  {
    id: 'we-ex-5',
    industry: 'Đời sống & Giao tiếp',
    channel: 'Email',
    purpose: 'Cảm ơn đồng nghiệp hỗ trợ',
    level: 'B1',
    title: 'Email cảm ơn đồng nghiệp đã hỗ trợ hoàn thành sự kiện',
    subject: 'Thank you for your help with [Event/Project Name]!',
    enBody: `Hi [Colleague's Name],

Thank you so much for stepping in yesterday to help coordinate [specific task]. Your calm support made a huge difference in keeping the event on track.

I truly appreciate your teamwork, and please let me know whenever I can return the favor.

Warm regards,
[Your Name]`,
    viSummary: 'Thư cảm ơn chân thành gửi đồng nghiệp đã hỗ trợ xử lý công việc kịp tiến độ.',
    structureNotes: [
      { label: 'Ghi nhận cụ thể', phrase: 'Thank you so much for stepping in yesterday to...', noteVi: 'Nêu rõ việc họ đã giúp khiến lời cảm ơn chân thành hơn.' },
      { label: 'Nêu tác động', phrase: 'Your calm support made a huge difference...', noteVi: 'Cho thấy đóng góp của họ thực sự có giá trị.' },
      { label: 'Sẵn sàng hỗ trợ lại', phrase: 'please let me know whenever I can return the favor.', noteVi: 'Xây dựng mối quan hệ đồng nghiệp gắn kết.' },
    ],
  },

  // 2. Du lịch & Khách sạn (5)
  {
    id: 'we-ex-6',
    industry: 'Du lịch & Khách sạn',
    channel: 'Email',
    purpose: 'Xác nhận đặt phòng & dịch vụ đón sân bay',
    level: 'B1',
    title: 'Email xác nhận đặt phòng khách sạn kèm yêu cầu đặc biệt',
    subject: 'Booking Confirmation #[Ref] – [Guest Name] ([Check-in Date])',
    enBody: `Dear [Guest Name],

Thank you for choosing [Hotel Name]. We are pleased to confirm your reservation for a [Room Type] from [Check-in Date] to [Check-out Date].

As requested, we have arranged a non-smoking room on a high floor and scheduled your airport pickup for [Flight Number] at [Time].

Should your travel plans change, please reply to this email or call our front desk at [Phone].

We look forward to welcoming you!
Best regards,
[Your Name]`,
    viSummary: 'Email xác nhận đặt phòng, nhắc lại các yêu cầu đặc biệt và thông tin đón sân bay.',
    structureNotes: [
      { label: 'Xác nhận chính', phrase: 'We are pleased to confirm your reservation...', noteVi: 'Mở đầu trang trọng, thân thiện chuẩn ngành hiếu khách.' },
      { label: 'Nhắc lại yêu cầu', phrase: 'As requested, we have arranged...', noteVi: 'Giúp khách yên tâm yêu cầu riêng đã được ghi nhận.' },
      { label: 'Hỗ trợ thay đổi', phrase: 'Should your travel plans change, please reply...', noteVi: 'Cấu trúc đảo ngữ "Should..." rất lịch sự trong tiếng Anh dịch vụ.' },
    ],
  },
  {
    id: 'we-ex-7',
    industry: 'Du lịch & Khách sạn',
    channel: 'Email',
    purpose: 'Thông báo thay đổi lịch trình tour do thời tiết',
    level: 'B2',
    title: 'Email thông báo điều chỉnh lịch trình tham quan an toàn',
    subject: 'Important Itinerary Update – [Tour Name] on [Date]',
    enBody: `Dear [Guest/Group Leader Name],

Due to forecasted coastal storms on [Date], local port authorities have suspended afternoon boat departures. To ensure your safety and comfort, we have rearranged your itinerary as follows:

- Morning: [Indoor Museum / Cultural Workshop]
- Afternoon: [Alternative Scenic Visit]
- Boat Excursion: Rescheduled to [New Date & Time]

Please let us know if you have any questions or dietary preferences for the adjusted lunch stop.

Sincerely,
[Your Name]`,
    viSummary: 'Thư thông báo điều chỉnh lịch trình tour vì thời tiết xấu và đưa ra phương án thay thế cụ thể.',
    structureNotes: [
      { label: 'Lý do an toàn', phrase: 'To ensure your safety and comfort, we have rearranged...', noteVi: 'Đặt an toàn của khách lên hàng đầu giúp khách dễ chấp nhận thay đổi.' },
      { label: 'Phương án thay thế', phrase: 'we have rearranged your itinerary as follows:', noteVi: 'Trình bày rõ lịch mới thay vì chỉ báo hủy.' },
    ],
  },
  {
    id: 'we-ex-8',
    industry: 'Du lịch & Khách sạn',
    channel: 'Slack / Teams',
    purpose: 'Bàn giao yêu cầu khách VIP giữa các ca lễ tân',
    level: 'B1',
    title: 'Tin nhắn bàn giao ca lễ tân cho khách VIP sắp đến',
    enBody: `Shift handover for afternoon team: VIP guest in Suite 802 (Mr. Tanaka) arrives at 3:30 PM. Welcome fruit platter is already placed in the room, and he requested a late checkout on Sunday (approved until 2:00 PM). Please prioritize his check-in at the lounge.`,
    viSummary: 'Tin nhắn bàn giao thông tin khách VIP, tiện ích đã chuẩn bị và quyền lợi đã duyệt cho ca chiều.',
    structureNotes: [
      { label: 'Thông tin định danh', phrase: 'VIP guest in Suite 802 (Mr. Tanaka) arrives at...', noteVi: 'Nêu rõ số phòng, tên khách và giờ đến.' },
      { label: 'Trạng thái chuẩn bị', phrase: 'Welcome fruit platter is already placed...', noteVi: 'Báo rõ việc đã làm xong để tránh làm trùng.' },
    ],
  },
  {
    id: 'we-ex-9',
    industry: 'Du lịch & Khách sạn',
    channel: 'Email',
    purpose: 'Xin lỗi khách về sự cố phòng và tặng ưu đãi',
    level: 'B2',
    title: 'Email xin lỗi khách hàng sau sự cố điều hòa / tiếng ồn',
    subject: 'Our Sincere Apologies – Room #[Number] Stay Experience',
    enBody: `Dear [Guest Name],

Thank you for bringing the air-conditioning issue in Room [Number] to our attention. We sincerely apologize for the inconvenience during your first night with us.

Our engineering team has completed the repair, and we would be delighted to offer you complimentary breakfast for two throughout the remainder of your stay.

Please reach out to me directly if there is anything else we can do to make your visit memorable.

Warm regards,
[Your Name]`,
    viSummary: 'Thư xin lỗi khách lưu trú về sự cố kỹ thuật, thông báo đã khắc phục và tặng quyền lợi bù đắp.',
    structureNotes: [
      { label: 'Cảm ơn phản hồi', phrase: 'Thank you for bringing ... to our attention.', noteVi: 'Cách mở đầu chuyên nghiệp khi tiếp nhận phàn nàn.' },
      { label: 'Hành động khắc phục', phrase: 'Our engineering team has completed the repair...', noteVi: 'Khẳng định vấn đề đã được xử lý dứt điểm.' },
      { label: 'Bù đắp thiện chí', phrase: 'we would be delighted to offer you complimentary...', noteVi: 'Tặng kèm dịch vụ giúp khôi phục thiện cảm của khách.' },
    ],
  },
  {
    id: 'we-ex-10',
    industry: 'Du lịch & Khách sạn',
    channel: 'Email',
    purpose: 'Gửi báo giá đoàn cho công ty lữ hành',
    level: 'B2',
    title: 'Email gửi bảng giá phòng đoàn mùa cao điểm cho đối tác',
    subject: 'Group Rate Proposal – [Agency Name] ([Travel Dates])',
    enBody: `Dear [Partner Name],

Thank you for your inquiry regarding accommodation for your group of [Number] guests from [Start Date] to [End Date].

Please find attached our tailored group rate proposal, which includes daily buffet breakfast, complimentary coach parking, and one free room for the tour leader.

These rates are held on a tentative basis until [Hold Expiry Date]. Please let me know if you would like to proceed with a contract.

Best regards,
[Your Name]`,
    viSummary: 'Thư gửi báo giá phòng đoàn cho công ty du lịch, nêu rõ quyền lợi đi kèm và thời hạn giữ giá.',
    structureNotes: [
      { label: 'Tóm tắt quyền lợi', phrase: 'includes daily buffet breakfast, complimentary...', noteVi: 'Liệt kê các điểm cộng ngay trong nội dung email.' },
      { label: 'Hạn giữ giá', phrase: 'These rates are held on a tentative basis until...', noteVi: 'Tạo sự khẩn trương nhẹ nhàng để đối tác chốt sớm.' },
    ],
  },

  // 3. Ẩm thực & Mua sắm (5)
  {
    id: 'we-ex-11',
    industry: 'Ẩm thực & Mua sắm',
    channel: 'Email',
    purpose: 'Đặt hàng nguyên liệu bổ sung khẩn cấp',
    level: 'B1',
    title: 'Email đặt hàng gấp với nhà cung cấp thực phẩm',
    subject: 'Urgent Restock Order #PO-[Number] – Delivery Requested for [Date]',
    enBody: `Hi [Supplier Name],

We experienced higher-than-expected weekend traffic and need to place an urgent restock order as detailed below:

- [Item A]: [Quantity]
- [Item B]: [Quantity]

Could you please confirm whether your team can deliver these items to our [Branch Name] store by [Time] tomorrow?

Thank you for your quick support!
Best regards,
[Your Name]`,
    viSummary: 'Email đặt bổ sung hàng gấp gửi nhà cung cấp, liệt kê số lượng và hỏi xác nhận giờ giao.',
    structureNotes: [
      { label: 'Nêu tính khẩn cấp', phrase: 'Urgent Restock Order #PO-...', noteVi: 'Ghi rõ mã đơn và chữ Urgent ở tiêu đề để được ưu tiên xử lý.' },
      { label: 'Yêu cầu xác nhận', phrase: 'Could you please confirm whether your team can deliver...', noteVi: 'Hỏi rõ khả năng giao đúng giờ để chủ động phương án dự phòng.' },
    ],
  },
  {
    id: 'we-ex-12',
    industry: 'Ẩm thực & Mua sắm',
    channel: 'Email',
    purpose: 'Phản hồi khiếu nại đơn hàng giao thiếu món',
    level: 'B1',
    title: 'Email xin lỗi khách và hoàn tiền / gửi bù món giao thiếu',
    subject: 'Regarding Your Order #[Order Number] – Our Apologies',
    enBody: `Dear [Customer Name],

Thank you for letting us know that [Missing Item] was left out of your delivery today. We sincerely apologize for this oversight.

We have immediately issued a full refund for the missing item to your original payment method, which will appear within 2–3 business days. We have also added a [Discount Code] voucher to your account for your next order.

Thank you for giving us the chance to make this right.

Warm regards,
[Your Name]`,
    viSummary: 'Thư xin lỗi khách hàng vì giao thiếu món, thông báo đã hoàn tiền và tặng mã giảm giá.',
    structureNotes: [
      { label: 'Nhận trách nhiệm', phrase: 'We sincerely apologize for this oversight.', noteVi: '"Oversight" nghĩa là sơ suất, nghe chuyên nghiệp và chân thành.' },
      { label: 'Giải pháp ngay lập tức', phrase: 'We have immediately issued a full refund...', noteVi: 'Thông báo tiền đã được hoàn giúp khách an tâm.' },
    ],
  },
  {
    id: 'we-ex-13',
    industry: 'Ẩm thực & Mua sắm',
    channel: 'Slack / Teams',
    purpose: 'Cập nhật tình trạng hết hàng (86 list) cho thu ngân & bếp',
    level: 'A2',
    title: 'Tin nhắn báo tạm hết nguyên liệu trong ca bán hàng',
    enBody: `Heads up floor & counter team: We are temporarily out of oat milk and blueberry muffins for the rest of today’s shift. Please suggest almond milk or banana bread as alternatives and update the POS status. Thanks!`,
    viSummary: 'Thông báo nhanh cho nhân viên quầy về các món tạm hết và gợi ý món thay thế cho khách.',
    structureNotes: [
      { label: 'Cảnh báo nhanh', phrase: 'Heads up floor & counter team:', noteVi: '"Heads up" là cách mở đầu tin nhắn nội bộ cực kỳ tự nhiên.' },
      { label: 'Gợi ý thay thế', phrase: 'Please suggest ... as alternatives', noteVi: 'Giúp nhân viên biết cách tư vấn khách thay vì chỉ nói "hết rồi".' },
    ],
  },
  {
    id: 'we-ex-14',
    industry: 'Ẩm thực & Mua sắm',
    channel: 'Email',
    purpose: 'Thông báo chương trình khuyến mãi cho khách hàng thân thiết',
    level: 'B1',
    title: 'Email mời thành viên VIP trải nghiệm thực đơn mới',
    subject: 'Exclusive Early Access: Taste Our New [Season] Menu First!',
    enBody: `Hi [Customer Name],

As one of our valued loyalty members, you are invited to enjoy early access to our new [Season] collection before it launches to the public on [Date].

Show this email at any store between [Start Date] and [End Date] to receive [20% off / a complimentary drink] with your purchase.

We hope to see you soon!
Best,
[Brand Name] Team`,
    viSummary: 'Email gửi khách hàng thân thiết mời trải nghiệm sớm bộ sưu tập/thực đơn mới kèm ưu đãi.',
    structureNotes: [
      { label: 'Tạo cảm giác đặc quyền', phrase: 'As one of our valued loyalty members, you are invited...', noteVi: 'Khiến khách hàng cảm thấy được trân trọng.' },
      { label: 'Hướng dẫn sử dụng', phrase: 'Show this email at any store between...', noteVi: 'Nêu rõ cách nhận ưu đãi và thời hạn áp dụng.' },
    ],
  },
  {
    id: 'we-ex-15',
    industry: 'Ẩm thực & Mua sắm',
    channel: 'Email',
    purpose: 'Báo cáo hàng lỗi cho nhà cung cấp để đổi trả',
    level: 'B2',
    title: 'Email yêu cầu đổi lô hàng bao bì bị lỗi in ấn',
    subject: 'Quality Issue Report – Batch #[Batch Number] Packaging Defect',
    enBody: `Dear [Vendor Name],

During our incoming quality check today, we found that approximately [Number] boxes in Batch #[Batch Number] had smudged barcode labels that cannot be scanned at checkout.

I have attached photos of the affected cartons for your reference. Could you please arrange a replacement pickup and delivery by [Date]?

Thank you for your prompt attention to this matter.

Best regards,
[Your Name]`,
    viSummary: 'Thư báo cáo lô hàng lỗi bao bì kèm ảnh minh họa và yêu cầu nhà cung cấp đổi hàng.',
    structureNotes: [
      { label: 'Mô tả lỗi cụ thể', phrase: 'had smudged barcode labels that cannot be scanned', noteVi: 'Nêu rõ lỗi và tác động thực tế tới vận hành.' },
      { label: 'Bằng chứng đính kèm', phrase: 'I have attached photos of the affected cartons...', noteVi: 'Đính kèm ảnh giúp đối tác xử lý đổi trả nhanh chóng.' },
    ],
  },

  // 4. Văn phòng & Email (5)
  {
    id: 'we-ex-16',
    industry: 'Văn phòng & Email',
    channel: 'Email',
    purpose: 'Gửi biên bản cuộc họp và danh sách đầu việc',
    level: 'B1',
    title: 'Email tổng hợp biên bản họp (Meeting Minutes) & Action Items',
    subject: 'Meeting Recap & Action Items – [Meeting Name] ([Date])',
    enBody: `Hi everyone,

Thank you for joining today’s [Meeting Name]. Below is a quick summary of our key decisions and next steps:

Key Decisions:
- [Decision 1]
- [Decision 2]

Action Items:
- [Task 1] – Owner: [Name] | Due: [Date]
- [Task 2] – Owner: [Name] | Due: [Date]

Please let me know if I missed anything.

Best regards,
[Your Name]`,
    viSummary: 'Email tổng hợp nhanh các quyết định chính và phân công đầu việc sau cuộc họp.',
    structureNotes: [
      { label: 'Tách rõ mục', phrase: 'Key Decisions / Action Items', noteVi: 'Giúp người bận rộn nắm bắt ngay phần việc của mình.' },
      { label: 'Rõ người rõ hạn', phrase: 'Owner: [Name] | Due: [Date]', noteVi: 'Luôn gắn người chịu trách nhiệm và hạn chót cho mỗi đầu việc.' },
    ],
  },
  {
    id: 'we-ex-17',
    industry: 'Văn phòng & Email',
    channel: 'Email',
    purpose: 'Nhắc nhẹ đồng nghiệp phản hồi email quá hạn',
    level: 'B1',
    title: 'Email nhắc nhẹ (gentle follow-up) khi chưa nhận được phản hồi',
    subject: 'Following up: [Original Subject]',
    enBody: `Hi [Name],

I hope your week is going well. I am gently following up on my email below regarding [Topic], as we need your input to finalize [Deliverable] by [Date].

Could you please share your feedback by [Time/Day]?

Thanks in advance for your help!
Best regards,
[Your Name]`,
    viSummary: 'Thư nhắc lịch sự khi đồng nghiệp chưa phản hồi yêu cầu trước đó, nhấn mạnh mốc thời gian cần chốt.',
    structureNotes: [
      { label: 'Mở đầu lịch sự', phrase: 'I am gently following up on my email below...', noteVi: 'Tránh trách móc, giữ không khí hợp tác.' },
      { label: 'Nêu rõ hạn chót', phrase: 'Could you please share your feedback by...', noteVi: 'Đặt mốc giờ cụ thể để người nhận dễ sắp xếp.' },
    ],
  },
  {
    id: 'we-ex-18',
    industry: 'Văn phòng & Email',
    channel: 'Slack / Teams',
    purpose: 'Xin phép nghỉ sớm vài tiếng vì việc cá nhân',
    level: 'A2',
    title: 'Tin nhắn xin phép quản lý về sớm xử lý việc riêng',
    enBody: `Hi [Manager's Name], would it be alright if I logged off at 3:30 PM today for a personal appointment? I have already finished [Priority Task] and will make up the remaining hour tomorrow morning.`,
    viSummary: 'Tin nhắn xin phép về sớm, báo cáo đã xong việc ưu tiên và đề xuất làm bù giờ.',
    structureNotes: [
      { label: 'Hỏi xin lịch sự', phrase: 'would it be alright if I logged off at...', noteVi: 'Dùng "would it be alright if..." rất mềm mỏng.' },
      { label: 'Chủ động cam kết', phrase: 'I have already finished... and will make up...', noteVi: 'Cho thấy tinh thần trách nhiệm với công việc.' },
    ],
  },
  {
    id: 'we-ex-19',
    industry: 'Văn phòng & Email',
    channel: 'Email',
    purpose: 'Giới thiệu hai đồng nghiệp/đối tác làm việc với nhau',
    level: 'B2',
    title: 'Email kết nối hai bên phụ trách dự án (Introduction Email)',
    subject: 'Introduction: [Person A] <> [Person B] – [Project Name]',
    enBody: `Hi [Person A] and [Person B],

I would like to introduce the two of you regarding [Project Name].

- [Person A] leads our [Team/Function] and will oversee [Scope A].
- [Person B] is our [Role] from [Company/Team] handling [Scope B].

I will let you two take it from here to coordinate the kickoff call. Feel free to keep me copied if you need anything from my end.

Best,
[Your Name]`,
    viSummary: 'Email giới thiệu vai trò của hai người phụ trách để họ trực tiếp làm việc với nhau.',
    structureNotes: [
      { label: 'Giới thiệu vai trò', phrase: '[Person A] leads... / [Person B] is handling...', noteVi: 'Giúp hai bên biết rõ phạm vi phụ trách của nhau.' },
      { label: 'Chuyển giao trao đổi', phrase: 'I will let you two take it from here...', noteVi: 'Cụm tự nhiên để bàn giao quyền chủ động cho hai bên.' },
    ],
  },
  {
    id: 'we-ex-20',
    industry: 'Văn phòng & Email',
    channel: 'Email',
    purpose: 'Thiết lập thư trả lời tự động khi đi công tác/nghỉ phép',
    level: 'B1',
    title: 'Mẫu Out-of-Office (OOO) chuyên nghiệp khi nghỉ phép',
    subject: 'Out of Office: [Your Name] (Returning [Return Date])',
    enBody: `Thank you for your email. I am currently out of the office on annual leave and will return on [Return Date], with limited access to email.

For urgent matters regarding [Area A], please contact [Colleague Name] at [Email]. For [Area B], please reach out to [Backup Name] at [Email].

I will respond to your message as soon as I return.

Best regards,
[Your Name]`,
    viSummary: 'Mẫu email trả lời tự động khi nghỉ phép, ghi rõ ngày quay lại và người liên hệ thay thế khi khẩn cấp.',
    structureNotes: [
      { label: 'Thông báo vắng mặt', phrase: 'I am currently out of the office... with limited access...', noteVi: 'Quản lý kỳ vọng về tốc độ phản hồi.' },
      { label: 'Người thay thế', phrase: 'For urgent matters regarding..., please contact...', noteVi: 'Đảm bảo công việc không bị gián đoạn khi bạn nghỉ.' },
    ],
  },

  // 5. IT / Kỹ thuật (5)
  {
    id: 'we-ex-21',
    industry: 'IT / Kỹ thuật',
    channel: 'Slack / Teams',
    purpose: 'Thông báo sự cố hệ thống (Incident Alert) nội bộ',
    level: 'B2',
    title: 'Tin nhắn Slack báo cáo sự cố production đang được xử lý',
    enBody: `[INCIDENT UPDATE] We are investigating elevated 502 errors on the checkout API (started at 10:12 AM). Impact: ~15% of payment requests failing. @backend-oncall is currently rolling back release v2.14.3. Next update in 15 minutes.`,
    viSummary: 'Thông báo sự cố kỹ thuật ngắn gọn gồm thời điểm bắt đầu, mức độ ảnh hưởng, người xử lý và mốc cập nhật tiếp theo.',
    structureNotes: [
      { label: 'Gắn nhãn rõ', phrase: '[INCIDENT UPDATE]', noteVi: 'Giúp mọi người nhận diện mức độ ưu tiên ngay lập tức.' },
      { label: 'Nêu tác động & hành động', phrase: 'Impact: ~15%... / Next update in 15 minutes.', noteVi: 'Tránh việc nhiều người hỏi dồn dập trong lúc đội kỹ thuật đang sửa lỗi.' },
    ],
  },
  {
    id: 'we-ex-22',
    industry: 'IT / Kỹ thuật',
    channel: 'Email',
    purpose: 'Thông báo lịch bảo trì hệ thống định kỳ cho người dùng/khách hàng',
    level: 'B2',
    title: 'Email thông báo bảo trì nâng cấp cơ sở dữ liệu',
    subject: 'Scheduled Maintenance Notice – [System Name] on [Date]',
    enBody: `Dear [Customer/Team],

We will perform scheduled database maintenance on [System Name] on [Date] from [Start Time] to [End Time] ([Time Zone]).

During this 30-minute window, the dashboard will be temporarily unavailable. No data will be lost, and all services will resume automatically once maintenance is complete.

Thank you for your understanding. If you experience issues afterward, please contact [Support Email].

Best regards,
[Engineering Team]`,
    viSummary: 'Thư thông báo trước lịch bảo trì hệ thống, nêu rõ thời gian gián đoạn và cam kết an toàn dữ liệu.',
    structureNotes: [
      { label: 'Khung giờ & múi giờ', phrase: 'from [Start Time] to [End Time] ([Time Zone])', noteVi: 'Luôn ghi rõ múi giờ với người dùng ở nhiều khu vực.' },
      { label: 'Trấn an dữ liệu', phrase: 'No data will be lost, and all services will resume...', noteVi: 'Giảm lo lắng cho khách hàng trong thời gian bảo trì.' },
    ],
  },
  {
    id: 'we-ex-23',
    industry: 'IT / Kỹ thuật',
    channel: 'Slack / Teams',
    purpose: 'Nhờ đồng nghiệp review Pull Request gấp',
    level: 'B1',
    title: 'Tin nhắn nhờ review code PR trên kênh kỹ thuật',
    enBody: `Hi @team, could someone please review PR #418 (fixes the mobile login redirect bug)? It is a small 40-line diff with unit tests passing. Would love to get this merged before today’s 4 PM release cut. Thanks!`,
    viSummary: 'Tin nhắn nhờ đồng nghiệp xem và duyệt Pull Request nhỏ trước giờ chốt bản phát hành.',
    structureNotes: [
      { label: 'Mô tả độ lớn PR', phrase: 'It is a small 40-line diff with unit tests passing.', noteVi: 'Cho biết PR ngắn và đã pass test giúp đồng nghiệp sẵn sàng review nhanh.' },
      { label: 'Nêu hạn chót', phrase: 'before today’s 4 PM release cut', noteVi: 'Giúp ưu tiên đúng thời điểm phát hành.' },
    ],
  },
  {
    id: 'we-ex-24',
    industry: 'IT / Kỹ thuật',
    channel: 'Email',
    purpose: 'Gửi báo cáo nguyên nhân gốc rễ sau sự cố (Post-mortem)',
    level: 'C1',
    title: 'Email tóm tắt báo cáo Post-mortem gửi quản lý & đối tác',
    subject: 'Post-Mortem Summary: [Incident Name] on [Date]',
    enBody: `Hi everyone,

Following Tuesday’s service interruption, our engineering team has completed the root cause analysis:

- Root Cause: A misconfigured connection pool limit triggered timeouts under peak load.
- Resolution: Increased pool capacity and added auto-scaling alerts.
- Preventive Action: Automated load tests are now mandatory in our CI pipeline before major releases.

Please find the full technical report attached.

Best regards,
[Your Name]`,
    viSummary: 'Email báo cáo nguyên nhân gốc rễ sự cố và các biện pháp phòng ngừa để không tái diễn.',
    structureNotes: [
      { label: 'Ba phần chuẩn', phrase: 'Root Cause / Resolution / Preventive Action', noteVi: 'Cấu trúc không đổ lỗi (blameless post-mortem) tập trung vào cải tiến hệ thống.' },
    ],
  },
  {
    id: 'we-ex-25',
    industry: 'IT / Kỹ thuật',
    channel: 'Email',
    purpose: 'Đề nghị nâng cấp quyền truy cập môi trường staging/production',
    level: 'B1',
    title: 'Email xin cấp quyền truy cập kho dữ liệu / server cho dự án mới',
    subject: 'Access Request: Read-Only Database Permissions for [Project Name]',
    enBody: `Hi [IT / DevOps Team],

I am working on [Feature/Task] for [Project Name] and need read-only access to the staging analytics database to verify query performance.

- Account: [Your Work Email]
- Duration: [Start Date] to [End Date]
- Approver: @[Tech Lead Name] (copied here)

Please let me know if any additional security form is required.

Thanks,
[Your Name]`,
    viSummary: 'Thư xin cấp quyền truy cập hệ thống tạm thời theo nguyên tắc tối thiểu và có người duyệt đính kèm.',
    structureNotes: [
      { label: 'Nêu rõ mức quyền', phrase: 'read-only access to the staging analytics database', noteVi: 'Chỉ xin đúng mức quyền cần thiết giúp IT duyệt nhanh.' },
      { label: 'Gắn người phê duyệt', phrase: 'Approver: @[Tech Lead Name] (copied here)', noteVi: 'CC quản lý ngay từ đầu để tiết kiệm vòng trao đổi.' },
    ],
  },

  // 6. Kinh doanh & CSKH (5)
  {
    id: 'we-ex-26',
    industry: 'Kinh doanh & CSKH',
    channel: 'Email',
    purpose: 'Gửi tóm tắt cuộc gọi tư vấn (Discovery Call Recap)',
    level: 'B2',
    title: 'Email tóm tắt nhu cầu và bước tiếp theo sau buổi tư vấn khách hàng',
    subject: 'Great speaking today – Next Steps for [Client Company]',
    enBody: `Hi [Client Name],

Thank you for taking the time to speak with me today about [Client Company]’s goals for [Area].

To recap our discussion:
- Key Challenge: [Pain Point]
- Target Timeline: [Month/Quarter]
- Proposed Next Step: A tailored product demo for your operations team on [Proposed Date].

I have attached our overview deck for your internal review. Looking forward to your confirmation!

Best regards,
[Your Name]`,
    viSummary: 'Email chốt lại nội dung cuộc gọi tư vấn bán hàng và đề xuất buổi demo tiếp theo.',
    structureNotes: [
      { label: 'Tóm tắt ngắn gọn', phrase: 'Key Challenge / Target Timeline / Proposed Next Step', noteVi: 'Cho thấy bạn lắng nghe kỹ và hiểu đúng bài toán của khách.' },
      { label: 'Định hướng hành động', phrase: 'Proposed Next Step: A tailored product demo...', noteVi: 'Luôn giữ nhịp tiến triển cho thương vụ.' },
    ],
  },
  {
    id: 'we-ex-27',
    industry: 'Kinh doanh & CSKH',
    channel: 'Email',
    purpose: 'Nhắc gia hạn hợp đồng trước 30 ngày',
    level: 'B1',
    title: 'Email nhắc gia hạn gói dịch vụ kèm tổng kết giá trị đã đạt',
    subject: 'Upcoming Renewal for [Company Name] – [Service Name]',
    enBody: `Dear [Client Name],

Your annual subscription for [Service Name] is scheduled for renewal on [Renewal Date]. Over the past year, your team completed [Metric, e.g., 1,200 projects] and saved an estimated [Metric] using our platform.

To ensure uninterrupted service, please review the attached renewal quote and let us know if you would like to adjust your seat count before [Cutoff Date].

Best regards,
[Your Name]`,
    viSummary: 'Thư nhắc gia hạn hợp đồng thường niên, nhắc lại thành quả khách đã đạt được và hỏi nhu cầu điều chỉnh gói.',
    structureNotes: [
      { label: 'Chứng minh giá trị', phrase: 'Over the past year, your team completed...', noteVi: 'Nhắc lại hiệu quả sử dụng giúp khách thấy xứng đáng gia hạn.' },
      { label: 'Tạo sự thuận tiện', phrase: 'let us know if you would like to adjust your seat count', noteVi: 'Mở cơ hội bán thêm (upsell) một cách tự nhiên.' },
    ],
  },
  {
    id: 'we-ex-28',
    industry: 'Kinh doanh & CSKH',
    channel: 'Slack / Teams',
    purpose: 'Chuyển giao thông tin khách hàng vừa ký (Sales-to-CS Handover)',
    level: 'B1',
    title: 'Tin nhắn bàn giao khách hàng mới từ Sales sang Customer Success',
    enBody: `New closed-won account handover! 🎉 Client: [Company Name] (Annual Plan, 25 seats). Main contact: [Name] ([Email]). Key priority: needs data migration completed before [Date]. Full notes are linked in the CRM—@cs-team please claim onboarding!`,
    viSummary: 'Tin nhắn thông báo chốt đơn mới và bàn giao đầy đủ thông tin ưu tiên cho đội triển khai.',
    structureNotes: [
      { label: 'Tóm tắt gói', phrase: 'Annual Plan, 25 seats', noteVi: 'Giúp đội CSKH nắm ngay quy mô khách hàng.' },
      { label: 'Điểm ưu tiên', phrase: 'Key priority: needs data migration completed before...', noteVi: 'Cảnh báo sớm kỳ vọng quan trọng của khách.' },
    ],
  },
  {
    id: 'we-ex-29',
    industry: 'Kinh doanh & CSKH',
    channel: 'Email',
    purpose: 'Xin lỗi khách hàng vì phản hồi hỗ trợ chậm',
    level: 'B1',
    title: 'Email phản hồi ticket bị trễ và cung cấp hướng xử lý ngay',
    subject: 'Update on Your Support Ticket #[Ticket ID]',
    enBody: `Hi [Customer Name],

Thank you for your patience, and please accept our apologies for the delay in getting back to you on Ticket #[Ticket ID].

I have reviewed your account and resolved [specific issue] by [action taken]. Could you please refresh your browser and confirm that everything is working properly on your end?

If you need anything else, simply reply to this thread.

Warm regards,
[Your Name]`,
    viSummary: 'Thư xin lỗi vì phản hồi chậm, thông báo đã xử lý xong vấn đề và nhờ khách kiểm tra lại.',
    structureNotes: [
      { label: 'Xin lỗi chân thành', phrase: 'please accept our apologies for the delay in getting back to you', noteVi: 'Thừa nhận chậm trễ lịch sự rồi đi thẳng vào giải pháp.' },
      { label: 'Xác nhận lại', phrase: 'Could you please refresh your browser and confirm...', noteVi: 'Đảm bảo vấn đề thực sự đã được khắc phục phía khách hàng.' },
    ],
  },
  {
    id: 'we-ex-30',
    industry: 'Kinh doanh & CSKH',
    channel: 'Email',
    purpose: 'Từ chối yêu cầu giảm giá vượt khung một cách khéo léo',
    level: 'C1',
    title: 'Email giữ giá chuẩn nhưng đề xuất phương án thanh toán linh hoạt',
    subject: 'Re: Pricing Discussion for [Company Name]',
    enBody: `Hi [Client Name],

Thank you for sharing your budget considerations. While we are unable to offer an additional discount below our standard enterprise tier, we want to make this partnership work for your team.

As an alternative, we can split the annual fee into two semi-annual installments and include complimentary staff training during onboarding.

Let me know if this structure aligns better with your Q3 budget!

Best regards,
[Your Name]`,
    viSummary: 'Thư từ chối giảm giá thêm một cách mềm mỏng nhưng đưa ra phương án chia kỳ thanh toán và tặng đào tạo.',
    structureNotes: [
      { label: 'Từ chối khéo', phrase: 'While we are unable to offer an additional discount...', noteVi: 'Thể hiện sự tôn trọng ngân sách của khách mà vẫn giữ vững chính sách giá.' },
      { label: 'Phương án thay thế', phrase: 'As an alternative, we can split the annual fee...', noteVi: 'Giữ cuộc đàm phán tiếp tục tiến triển.' },
    ],
  },

  // 7. Phỏng vấn & Nhân sự (5)
  {
    id: 'we-ex-31',
    industry: 'Phỏng vấn & Nhân sự',
    channel: 'Email',
    purpose: 'Mời ứng viên tham gia phỏng vấn vòng chuyên môn',
    level: 'B1',
    title: 'Email mời phỏng vấn kèm danh sách khung giờ lựa chọn',
    subject: 'Interview Invitation: [Job Title] at [Company Name]',
    enBody: `Dear [Candidate Name],

Thank you for applying for the [Job Title] position at [Company Name]. Our hiring team was impressed by your background, and we would love to invite you to a 45-minute video interview with [Interviewer Name & Title].

Please let us know which of the following slots works best for you:
- [Option 1: Day, Date, Time]
- [Option 2: Day, Date, Time]

Once confirmed, I will send over the video meeting link.

Best regards,
[Your Name]`,
    viSummary: 'Thư mời ứng viên phỏng vấn, giới thiệu người phỏng vấn và đưa ra các khung giờ linh hoạt.',
    structureNotes: [
      { label: 'Ghi nhận hồ sơ', phrase: 'Our hiring team was impressed by your background...', noteVi: 'Tạo ấn tượng thân thiện, chuyên nghiệp ngay từ đầu.' },
      { label: 'Thông tin rõ ràng', phrase: '45-minute video interview with [Name & Title]', noteVi: 'Giúp ứng viên chuẩn bị tâm lý và nội dung phù hợp.' },
    ],
  },
  {
    id: 'we-ex-32',
    industry: 'Phỏng vấn & Nhân sự',
    channel: 'Email',
    purpose: 'Gửi thư cảm ơn sau buổi phỏng vấn (Candidate Thank-You)',
    level: 'B1',
    title: 'Email cảm ơn nhà tuyển dụng sau buổi phỏng vấn',
    subject: 'Thank You – [Job Title] Interview ([Your Name])',
    enBody: `Dear [Interviewer Name],

Thank you very much for taking the time to speak with me today about the [Job Title] role. I especially enjoyed learning about your team’s upcoming [Project/Initiative].

Our conversation reinforced my enthusiasm for joining [Company Name], where my experience in [Key Skill] can contribute right away.

Please let me know if you need any additional information from me.

Sincerely,
[Your Name]`,
    viSummary: 'Email ứng viên gửi nhà tuyển dụng trong vòng 24 giờ sau phỏng vấn để cảm ơn và nhấn mạnh sự phù hợp.',
    structureNotes: [
      { label: 'Nhắc lại điểm cụ thể', phrase: 'I especially enjoyed learning about your team’s upcoming...', noteVi: 'Chứng tỏ bạn thực sự chú tâm trong buổi phỏng vấn.' },
      { label: 'Khẳng định giá trị', phrase: 'where my experience in [Key Skill] can contribute...', noteVi: 'Nhắc khéo năng lực nổi bật của bản thân.' },
    ],
  },
  {
    id: 'we-ex-33',
    industry: 'Phỏng vấn & Nhân sự',
    channel: 'Email',
    purpose: 'Gửi thư mời nhận việc chính thức (Job Offer)',
    level: 'B2',
    title: 'Email gửi Offer Letter chính thức cho ứng viên trúng tuyển',
    subject: 'Job Offer: [Job Title] at [Company Name]',
    enBody: `Dear [Candidate Name],

We are thrilled to offer you the position of [Job Title] at [Company Name], reporting to [Manager Name], with a proposed start date of [Start Date].

Please find your formal offer letter attached, outlining your base salary, benefits package, and onboarding schedule. Kindly review and let us know your decision by [Response Deadline].

We would be excited to welcome you to the team!

Warm regards,
[Your Name]`,
    viSummary: 'Thư thông báo trúng tuyển và gửi kèm thư mời nhận việc chi tiết về lương, phúc lợi và ngày bắt đầu.',
    structureNotes: [
      { label: 'Mở đầu hào hứng', phrase: 'We are thrilled to offer you the position of...', noteVi: 'Truyền tải sự trân trọng tới ứng viên.' },
      { label: 'Hạn phản hồi', phrase: 'Kindly review and let us know your decision by...', noteVi: 'Nêu rõ hạn chốt để kịp chuẩn bị thủ tục nhận việc.' },
    ],
  },
  {
    id: 'we-ex-34',
    industry: 'Phỏng vấn & Nhân sự',
    channel: 'Email',
    purpose: 'Từ chối ứng viên một cách tôn trọng và giữ kết nối',
    level: 'B2',
    title: 'Email thông báo kết quả chưa phù hợp nhưng giữ thiện cảm',
    subject: 'Update on Your Application for [Job Title] at [Company Name]',
    enBody: `Dear [Candidate Name],

Thank you for taking the time to interview with our team for the [Job Title] role. We truly appreciated learning about your experience in [Field].

After careful consideration, we have decided to move forward with another candidate whose background aligns more closely with our current project needs. However, with your permission, we would love to keep your profile in our talent pool for future openings.

We wish you every success in your career search.

Best regards,
[Your Name]`,
    viSummary: 'Thư thông báo kết quả phỏng vấn chưa đạt một cách lịch sự, giữ hình ảnh thương hiệu tuyển dụng tốt.',
    structureNotes: [
      { label: 'Từ chối tinh tế', phrase: 'move forward with another candidate whose background aligns more closely...', noteVi: 'Tránh chê bai năng lực ứng viên, nhấn mạnh vào mức độ khớp nhu cầu hiện tại.' },
      { label: 'Giữ kết nối', phrase: 'keep your profile in our talent pool for future openings', noteVi: 'Mở cơ hội cho các vị trí phù hợp hơn về sau.' },
    ],
  },
  {
    id: 'we-ex-35',
    industry: 'Phỏng vấn & Nhân sự',
    channel: 'Slack / Teams',
    purpose: 'Chào đón nhân viên mới trên kênh chung toàn công ty',
    level: 'A2',
    title: 'Tin nhắn giới thiệu nhân sự mới gia nhập công ty',
    enBody: `Please join us in welcoming @Minh Nguyen, who is joining our Product Design team today! Minh brings 4 years of UX experience in fintech and loves trail running. Feel free to drop a hello or grab coffee with him this week!`,
    viSummary: 'Tin nhắn giới thiệu thành viên mới trên Slack gồm vai trò, kinh nghiệm ngắn và sở thích để đồng nghiệp dễ làm quen.',
    structureNotes: [
      { label: 'Kết hợp công việc & cá nhân', phrase: '4 years of UX experience... and loves trail running', noteVi: 'Thêm sở thích cá nhân giúp đồng nghiệp dễ bắt chuyện.' },
    ],
  },

  // 8. Y tế & Sức khỏe (5)
  {
    id: 'we-ex-36',
    industry: 'Y tế & Sức khỏe',
    channel: 'Email',
    purpose: 'Nhắc lịch khám sức khỏe định kỳ cho bệnh nhân/khách hàng',
    level: 'A2',
    title: 'Email nhắc lịch hẹn khám kèm hướng dẫn chuẩn bị trước khi đến',
    subject: 'Appointment Reminder: [Clinic Name] on [Date] at [Time]',
    enBody: `Dear [Patient Name],

This is a friendly reminder of your upcoming appointment with Dr. [Doctor Name] on [Date] at [Time] at [Clinic Address].

Please arrive 15 minutes early with your ID card and previous lab reports. If you are scheduled for a fasting blood test, please avoid food for 8 hours beforehand.

To reschedule, please call us at [Phone] at least 24 hours in advance.

Warm regards,
[Clinic Name]`,
    viSummary: 'Thư nhắc lịch hẹn khám bệnh kèm lưu ý đến sớm, mang giấy tờ và nhịn ăn nếu cần xét nghiệm máu.',
    structureNotes: [
      { label: 'Hướng dẫn chuẩn bị', phrase: 'Please arrive 15 minutes early with... / avoid food for 8 hours...', noteVi: 'Giúp buổi khám diễn ra suôn sẻ, không phải hẹn lại.' },
    ],
  },
  {
    id: 'we-ex-37',
    industry: 'Y tế & Sức khỏe',
    channel: 'Email',
    purpose: 'Gửi hướng dẫn chăm sóc tại nhà sau tiểu phẫu/khám bệnh',
    level: 'B1',
    title: 'Email gửi tóm tắt hướng dẫn theo dõi sức khỏe sau khi ra viện',
    subject: 'Post-Visit Care Instructions – [Patient Name]',
    enBody: `Dear [Patient Name],

Thank you for visiting [Clinic Name] today. As discussed with Dr. [Name], please follow these care guidelines over the next 48 hours:

- Take prescribed medication after meals as labeled.
- Keep the dressing clean and dry.
- Contact our on-call nurse immediately at [Phone] if you notice fever or swelling.

Your follow-up visit is set for [Follow-up Date]. Wishing you a speedy recovery!

Best regards,
[Care Team]`,
    viSummary: 'Thư dặn dò chăm sóc sau khám bệnh, dấu hiệu cần liên hệ gấp và lịch tái khám.',
    structureNotes: [
      { label: 'Dấu hiệu cảnh báo', phrase: 'Contact our on-call nurse immediately if you notice...', noteVi: 'Hướng dẫn rõ trường hợp khẩn cấp giúp bệnh nhân an tâm.' },
    ],
  },
  {
    id: 'we-ex-38',
    industry: 'Y tế & Sức khỏe',
    channel: 'Slack / Teams',
    purpose: 'Báo cáo thiếu vật tư tiêu hao tại phòng khám',
    level: 'B1',
    title: 'Tin nhắn nội bộ yêu cầu bổ sung găng tay và vật tư y tế gấp',
    enBody: `Supply alert for @procurement-team: Examination room 3 & 4 are down to our last two boxes of medium nitrile gloves and alcohol swabs. Could we get an urgent stock transfer from the main storage before the 1 PM clinic session? Thanks!`,
    viSummary: 'Tin nhắn báo gấp tình trạng sắp hết vật tư tiêu hao y tế để kho chính điều chuyển kịp giờ khám chiều.',
    structureNotes: [
      { label: 'Nêu tồn kho thực tế', phrase: 'down to our last two boxes of...', noteVi: 'Báo chính xác lượng còn lại để kho đánh giá mức độ gấp.' },
    ],
  },
  {
    id: 'we-ex-39',
    industry: 'Y tế & Sức khỏe',
    channel: 'Email',
    purpose: 'Mời nhân viên công ty tham gia gói khám sức khỏe doanh nghiệp',
    level: 'B1',
    title: 'Email thông báo lịch khám sức khỏe tổng quát hàng năm cho nhân viên',
    subject: 'Annual Corporate Health Check-up Registration ([Dates])',
    enBody: `Hi team,

Our annual corporate health check-up will take place from [Start Date] to [End Date] at [Hospital/Clinic Name].

Please select your preferred morning slot via [Booking Link] by [Deadline]. Remember to bring your national ID and fast from 10 PM the night before if you plan to take the blood glucose test.

Let HR know if you have any questions!

Best,
[HR / Wellness Team]`,
    viSummary: 'Thông báo chương trình khám sức khỏe định kỳ cho nhân viên, hướng dẫn đăng ký và lưu ý trước khi đi khám.',
    structureNotes: [
      { label: 'Kêu gọi đăng ký', phrase: 'Please select your preferred morning slot via...', noteVi: 'Đưa link đặt lịch trực tiếp giúp tăng tỷ lệ nhân viên tham gia.' },
    ],
  },
  {
    id: 'we-ex-40',
    industry: 'Y tế & Sức khỏe',
    channel: 'Email',
    purpose: 'Phối hợp chuyển tuyến hồ sơ bệnh nhân với chuyên khoa đối tác',
    level: 'B2',
    title: 'Email gửi thư giới thiệu chuyển chuyên khoa (Medical Referral)',
    subject: 'Patient Referral – [Patient Initials/ID] for Cardiology Consultation',
    enBody: `Dear Dr. [Specialist Name],

I am referring [Patient Name] (DOB: [Date]) to your cardiology clinic for further evaluation of [Symptom/Condition].

Attached please find the recent ECG tracing, blood panel results, and current medication list. We would appreciate your assessment and recommended management plan.

Thank you for your collaboration.

Sincerely,
Dr. [Your Name]`,
    viSummary: 'Thư chuyển tuyến chuyên môn giữa hai bác sĩ, đính kèm đầy đủ kết quả cận lâm sàng và đơn thuốc hiện tại.',
    structureNotes: [
      { label: 'Tài liệu đính kèm', phrase: 'Attached please find the recent ECG tracing, blood panel...', noteVi: 'Giúp bác sĩ chuyên khoa tiếp nhận không phải làm lại xét nghiệm.' },
    ],
  },

  // 9. Tài chính & Logistics (4)
  {
    id: 'we-ex-41',
    industry: 'Tài chính & Logistics',
    channel: 'Email',
    purpose: 'Nhắc thanh toán hóa đơn quá hạn lịch sự',
    level: 'B1',
    title: 'Email nhắc công nợ hóa đơn quá hạn lần đầu (Friendly Payment Reminder)',
    subject: 'Friendly Reminder: Invoice #[Number] Past Due ([Amount])',
    enBody: `Dear [Client Billing Contact],

I hope you are doing well. This is a friendly reminder that Invoice #[Number] for [Amount], due on [Due Date], remains open in our records.

I have re-attached a copy of the invoice for your convenience. If payment has already been sent, please disregard this notice or share the remittance advice so we can update our ledger.

Thank you for your prompt attention.

Best regards,
[Your Name]`,
    viSummary: 'Thư nhắc thanh toán hóa đơn quá hạn lịch sự, đính kèm lại bản sao hóa đơn và đề nghị gửi chứng từ nếu đã chuyển.',
    structureNotes: [
      { label: 'Đính kèm lại hóa đơn', phrase: 'I have re-attached a copy of the invoice...', noteVi: 'Giúp kế toán bên khách hàng xử lý ngay mà không mất công tìm lại.' },
      { label: 'Chừa đường lui lịch sự', phrase: 'If payment has already been sent, please disregard...', noteVi: 'Tránh gây khó chịu nếu khách vừa chuyển tiền xong.' },
    ],
  },
  {
    id: 'we-ex-42',
    industry: 'Tài chính & Logistics',
    channel: 'Email',
    purpose: 'Thông báo lịch tàu và gửi bộ chứng từ vận chuyển (Shipping Docs)',
    level: 'B2',
    title: 'Email gửi bộ chứng từ xuất khẩu và thông tin theo dõi lô hàng',
    subject: 'Shipping Advice & Documents – PO #[Number] / BL #[BL Number]',
    enBody: `Dear [Consignee/Import Team],

Please be advised that your shipment under PO #[Number] departed [Origin Port] today aboard [Vessel Name], with an estimated arrival (ETA) at [Destination Port] on [ETA Date].

Attached are the scanned copies of the Commercial Invoice, Packing List, and Bill of Lading for your customs preparation. The original documents are being couriered via DHL (Tracking: [Number]).

Best regards,
[Your Name]`,
    viSummary: 'Email thông báo tàu chạy, ngày dự kiến cập cảng (ETA) và gửi kèm bộ chứng từ xuất nhập khẩu.',
    structureNotes: [
      { label: 'Thông tin vận tải', phrase: 'departed [Origin Port] ... with an estimated arrival (ETA)...', noteVi: 'Cung cấp đầy đủ mã tàu và ETA để bên nhập khẩu lên kế hoạch nhận hàng.' },
    ],
  },
  {
    id: 'we-ex-43',
    industry: 'Tài chính & Logistics',
    channel: 'Slack / Teams',
    purpose: 'Cảnh báo sai lệch số lượng khi nhập kho',
    level: 'B1',
    title: 'Tin nhắn báo cáo chênh lệch hàng thực nhận so với phiếu giao',
    enBody: `Receiving discrepancy on Shipment #SH-904: Packing list states 50 cartons of SKU-210, but physical count at dock 2 shows 47 cartons (3 cartons short). Photos and signed dock receipt are uploaded to the shared drive—@purchasing please follow up with the carrier.`,
    viSummary: 'Tin nhắn báo thiếu hàng ngay tại cửa kho kèm ảnh và biên bản để bộ phận mua hàng khiếu nại nhà vận chuyển.',
    structureNotes: [
      { label: 'Số liệu đối chiếu', phrase: 'Packing list states 50... but physical count shows 47...', noteVi: 'Ghi rõ số trên giấy và số đếm thực tế tại cầu cảng.' },
    ],
  },
  {
    id: 'we-ex-44',
    industry: 'Tài chính & Logistics',
    channel: 'Email',
    purpose: 'Yêu cầu phê duyệt ngân sách bổ sung cho dự án',
    level: 'B2',
    title: 'Email đề xuất duyệt bổ sung ngân sách kèm phân tích ROI',
    subject: 'Budget Adjustment Request – [Project/Department] Q3',
    enBody: `Dear [Finance Director/Manager],

I am writing to request an additional [Amount] in our Q3 [Department] budget to cover [Specific Expense, e.g., peak-season warehouse overtime].

This adjustment is driven by a 25% surge in order volume and is projected to protect $40,000 in on-time fulfillment revenue while avoiding late-delivery penalties.

Please let me know if you would like to review the detailed cost breakdown.

Best regards,
[Your Name]`,
    viSummary: 'Thư xin duyệt bổ sung ngân sách, giải trình nguyên nhân tăng trưởng và lợi ích tài chính mang lại.',
    structureNotes: [
      { label: 'Chứng minh hiệu quả', phrase: 'projected to protect $40,000... while avoiding penalties', noteVi: 'Gắn chi phí xin thêm với doanh thu bảo vệ được để dễ thông qua.' },
    ],
  },

  // 10. Giáo dục & Xã hội (4)
  {
    id: 'we-ex-45',
    industry: 'Giáo dục & Xã hội',
    channel: 'Email',
    purpose: 'Gửi báo cáo tiến độ học tập định kỳ cho phụ huynh',
    level: 'B1',
    title: 'Email cập nhật tình hình học tập và điểm mạnh của học viên',
    subject: 'Monthly Progress Update – [Student Name] ([Course Name])',
    enBody: `Dear [Parent Name],

I am pleased to share [Student Name]’s progress for [Month]. [He/She] has shown strong participation in speaking activities and scored [Score]% on the recent unit check.

To build even greater confidence, we recommend 15 minutes of daily reading practice at home using the assigned audio stories.

Please feel free to reply if you would like to schedule a quick parent-teacher call.

Warm regards,
[Teacher Name]`,
    viSummary: 'Thư gửi phụ huynh nhận xét tích cực về học viên, gợi ý bài tập tại nhà và mời trao đổi thêm nếu cần.',
    structureNotes: [
      { label: 'Khen ngợi trước', phrase: 'has shown strong participation... and scored...', noteVi: 'Mở đầu bằng điểm mạnh giúp phụ huynh cởi mở đón nhận góp ý.' },
      { label: 'Gợi ý khả thi', phrase: '15 minutes of daily reading practice at home', noteVi: 'Đưa giải pháp ngắn gọn, dễ áp dụng cho gia đình.' },
    ],
  },
  {
    id: 'we-ex-46',
    industry: 'Giáo dục & Xã hội',
    channel: 'Email',
    purpose: 'Mời diễn giả khách mời chia sẻ tại hội thảo hướng nghiệp',
    level: 'B2',
    title: 'Email mời chuyên gia làm diễn giả cho chương trình sinh viên',
    subject: 'Speaker Invitation: [Event Name] on [Date]',
    enBody: `Dear [Speaker Name],

On behalf of [Organization/University Name], I would like to invite you to join our upcoming [Event Name] as a guest speaker on [Date] from [Time].

Our audience of 120 final-year students would greatly benefit from your insights on [Topic]. The session includes a 20-minute talk followed by a 15-minute Q&A.

Please let us know if your schedule permits—we would be honored to host you.

Sincerely,
[Your Name]`,
    viSummary: 'Thư mời diễn giả trang trọng, nêu rõ đối tượng tham dự, chủ đề và thời lượng chia sẻ.',
    structureNotes: [
      { label: 'Nêu rõ định dạng', phrase: 'a 20-minute talk followed by a 15-minute Q&A', noteVi: 'Giúp diễn giả bận rộn ước lượng ngay thời gian cần chuẩn bị.' },
    ],
  },
  {
    id: 'we-ex-47',
    industry: 'Giáo dục & Xã hội',
    channel: 'Slack / Teams',
    purpose: 'Điều phối tình nguyện viên trước ngày diễn ra sự kiện cộng đồng',
    level: 'A2',
    title: 'Tin nhắn phân công nhiệm vụ cho nhóm tình nguyện viên',
    enBody: `Hi volunteers! Final check-in for Saturday’s Book Drive: please arrive by 7:45 AM at Gate A for t-shirt pickup and briefing. @Linh and @Nam will manage book sorting, while @Hoa’s team will welcome families at the registration booth. See you all bright and early!`,
    viSummary: 'Tin nhắn dặn dò giờ tập trung, địa điểm và phân công vị trí cho đội ngũ tình nguyện viên.',
    structureNotes: [
      { label: 'Giờ & điểm hẹn rõ', phrase: 'arrive by 7:45 AM at Gate A', noteVi: 'Giảm lúng túng cho người tham gia sáng sớm.' },
    ],
  },
  {
    id: 'we-ex-48',
    industry: 'Giáo dục & Xã hội',
    channel: 'Email',
    purpose: 'Gửi thư cảm ơn nhà tài trợ sau dự án thiện nguyện/giáo dục',
    level: 'B2',
    title: 'Email báo cáo tác động (Impact Report) và cảm ơn nhà tài trợ',
    subject: 'Thank You for Making [Program Name] Possible – Impact Summary',
    enBody: `Dear [Sponsor Name],

Thanks to [Sponsor Company]’s generous support, our [Program Name] successfully provided [Outcome, e.g., 200 STEM kits and 12 workshops] to students across five rural schools.

More than 90% of participating students reported greater interest in science careers. We have attached a brief photo report highlighting the moments your sponsorship made possible.

We are deeply grateful for your partnership.

Warm regards,
[Your Name]`,
    viSummary: 'Thư cảm ơn nhà tài trợ kèm số liệu tác động thực tế và báo cáo hình ảnh sau chương trình.',
    structureNotes: [
      { label: 'Đo lường tác động', phrase: 'successfully provided 200 STEM kits... More than 90% reported...', noteVi: 'Số liệu cụ thể giúp nhà tài trợ thấy rõ giá trị đóng góp của họ.' },
    ],
  },
];

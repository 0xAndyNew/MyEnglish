import { ListeningReadingLesson } from './listeningReadingLessons';

export const LISTENING_BANK_PART2: ListeningReadingLesson[] = [
  // =====================================================================
  // 6. KINH DOANH & CSKH (lr-141 .. lr-160) — 5 A1, 5 A2, 5 B1, 5 B2
  // =====================================================================
  {
    id: 'lr-141',
    level: 'A1',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 141: Chào khách tại quầy lễ tân cửa hàng',
    sourceStyle: 'British Council • Customer Service Basics',
    transcript:
      'Good morning, and welcome to Bright Home Store—can I help you find anything today? Yes, please, I am looking for warm table lamps for my living room. Sure, please follow me to our lighting section on the second floor near the elevator. Here is a convenient shopping basket for you.',
    translation:
      'Chào buổi sáng và chào mừng quý khách đến với cửa hàng Bright Home—hôm nay tôi có thể giúp bạn tìm món gì không? Vâng làm ơn, tôi đang tìm đèn bàn ánh sáng ấm cho phòng khách. Chắc chắn rồi, mời bạn đi theo tôi tới khu vực đèn chiếu sáng ở tầng hai gần thang máy. Đây là giỏ mua hàng tiện lợi dành cho bạn.',
    keyPhrases: [
      { en: 'looking for', vi: 'đang tìm kiếm' },
      { en: 'lighting section', vi: 'khu vực đèn chiếu sáng' },
      { en: 'shopping basket', vi: 'giỏ mua hàng' },
    ],
    question: {
      q: 'Where is the lighting section located?',
      options: ['On the second floor near the elevator', 'On the ground floor', 'Outside the front entrance'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-142',
    level: 'A1',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 142: Đổi áo bị chật tại quầy chăm sóc khách hàng',
    sourceStyle: 'VOA Learning English • Everyday Shopping',
    transcript:
      'Excuse me, I bought this green sweater yesterday, but it is too small for me. Do you still have your paper receipt with you? Yes, here it is right inside my bag. No problem at all, we can exchange it for a large size after I check the shelf for you.',
    translation:
      'Xin lỗi, hôm qua tôi mua chiếc áo len màu xanh lá này nhưng nó hơi nhỏ so với tôi. Bạn vẫn giữ hóa đơn giấy theo người chứ? Có, nó ở ngay trong túi của tôi đây ạ. Không vấn đề gì cả, chúng tôi có thể đổi nó lấy cỡ lớn sau khi tôi kiểm tra trên kệ giúp bạn.',
    keyPhrases: [
      { en: 'paper receipt', vi: 'hóa đơn giấy' },
      { en: 'exchange it for', vi: 'đổi nó lấy' },
      { en: 'large size', vi: 'cỡ lớn (L)' },
    ],
    question: {
      q: 'Why does the customer want to exchange the sweater?',
      options: ['The color is wrong', 'It has a broken zipper', 'It is too small'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-143',
    level: 'A1',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 143: Hỏi giờ mở cửa và bãi đỗ xe chi nhánh',
    sourceStyle: 'BBC Learning English • Service Inquiries',
    transcript:
      'Hello, City Tech Service Center speaking, how may I assist you? Hi, could you tell me what time you open on Saturday mornings? We open at eight thirty and close at six in the evening. Also, customers can use our free parking area right behind our building.',
    translation:
      'Xin chào, Trung tâm Dịch vụ City Tech xin nghe, tôi có thể hỗ trợ gì cho bạn? Chào bạn, bạn cho tôi hỏi sáng thứ Bảy bên mình mở cửa lúc mấy giờ? Chúng tôi mở cửa lúc 8 giờ 30 và đóng cửa lúc 6 giờ tối. Ngoài ra, khách hàng có thể dùng khu đỗ xe miễn phí ngay phía sau tòa nhà của chúng tôi.',
    keyPhrases: [
      { en: 'how may I assist you?', vi: 'tôi có thể hỗ trợ gì cho bạn?' },
      { en: 'free parking', vi: 'chỗ đỗ xe miễn phí' },
      { en: 'behind our building', vi: 'phía sau tòa nhà của chúng tôi' },
    ],
    question: {
      q: 'Where can customers park for free?',
      options: ['Across the street', 'Behind the building', 'In the underground mall'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-144',
    level: 'A1',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 144: Đăng ký thẻ thành viên tích điểm mua sắm',
    sourceStyle: 'British Council • Retail Support',
    transcript:
      'Would you like to join our free member club today? Yes, could you tell me what benefits I get? You get ten percent off your first order and earn points every time you shop here. Please write your full name and phone number on this short form to get your new card.',
    translation:
      'Hôm nay bạn có muốn tham gia câu lạc bộ thành viên miễn phí của chúng tôi không? Có chứ, bạn cho tôi biết tôi nhận được quyền lợi gì nhé? Bạn được giảm 10 phần trăm cho đơn hàng đầu tiên và tích điểm mỗi lần mua sắm tại đây. Vui lòng ghi họ tên đầy đủ và số điện thoại vào mẫu ngắn này để nhận thẻ mới nhé.',
    keyPhrases: [
      { en: 'member club', vi: 'câu lạc bộ thành viên' },
      { en: 'ten percent off', vi: 'giảm giá 10 phần trăm' },
      { en: 'earn points', vi: 'tích lũy điểm thưởng' },
    ],
    question: {
      q: 'What discount do new members get on their first order?',
      options: ['Ten percent off', 'Twenty percent off', 'Five dollars off'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-145',
    level: 'A1',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 145: Kiểm tra hàng tồn kho trong kho cửa hàng',
    sourceStyle: 'VOA • Store Conversations',
    transcript:
      'Excuse me, I only see blue backpacks on this display table, so do you have the black one in stock? Please wait one minute while I check our storage room in the back. Good news, we still have two black backpacks left! Would you like me to bring one to the front counter?',
    translation:
      'Xin lỗi, tôi chỉ thấy ba lô màu xanh dương trên bàn trưng bày này, vậy cửa hàng còn chiếc màu đen trong kho không? Vui lòng đợi một phút để tôi kiểm tra phòng kho ở phía sau nhé. Tin vui đây, chúng tôi vẫn còn hai chiếc ba lô màu đen! Bạn có muốn tôi mang một chiếc ra quầy phía trước không?',
    keyPhrases: [
      { en: 'in stock', vi: 'còn hàng trong kho' },
      { en: 'storage room', vi: 'phòng kho chứa hàng' },
      { en: 'front counter', vi: 'quầy phía trước' },
    ],
    question: {
      q: 'How many black backpacks are left in the storage room?',
      options: ['None', 'One', 'Two'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-146',
    level: 'A2',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 146: Yêu cầu bảo hành tai nghe không dây bị lỗi',
    sourceStyle: 'British Council • Warranty & Repairs',
    transcript:
      'Good afternoon, I bought wireless headphones from your website two weeks ago, and now the left side stops charging. I am sorry to hear that! Since your item is still under our twelve-month warranty, we will send a repair label to your email today. Once you mail it back, our team will ship a brand-new pair within three business days.',
    translation:
      'Chào buổi chiều, hai tuần trước tôi có mua tai nghe không dây trên trang web của bên bạn, nhưng giờ bên trái không sạc được nữa. Tôi rất tiếc khi nghe điều đó! Vì sản phẩm vẫn còn trong thời hạn bảo hành 12 tháng, hôm nay chúng tôi sẽ gửi nhãn gửi trả sửa chữa qua email cho bạn. Sau khi bạn gửi lại, đội ngũ chúng tôi sẽ giao một chiếc mới tinh trong vòng ba ngày làm việc.',
    keyPhrases: [
      { en: 'stops charging', vi: 'ngừng sạc pin' },
      { en: 'twelve-month warranty', vi: 'bảo hành 12 tháng' },
      { en: 'three business days', vi: 'ba ngày làm việc' },
    ],
    question: {
      q: 'How long is the warranty on the headphones?',
      options: ['Two weeks', 'Three months', 'Twelve months'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-147',
    level: 'A2',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 147: Tư vấn nâng cấp gói mạng gia đình',
    sourceStyle: 'BBC Learning English • Customer Advisory',
    transcript:
      'Hello, I work from home now, and my current internet connection feels too slow during video calls. I understand completely. Our standard plan gives fifty megabits per second, while our fiber home package offers three hundred megabits for just eight dollars more per month. Plus, we include a free modern router if you upgrade before Friday.',
    translation:
      'Xin chào, hiện tại tôi làm việc tại nhà và đường truyền mạng hiện giờ hơi chậm khi gọi video. Tôi hoàn toàn hiểu điều đó. Gói tiêu chuẩn cung cấp tốc độ 50 megabit mỗi giây, trong khi gói cáp quang gia đình mang lại 300 megabit chỉ với thêm 8 đô la mỗi tháng. Ngoài ra, chúng tôi tặng kèm bộ phát sóng hiện đại miễn phí nếu bạn nâng cấp trước thứ Sáu.',
    keyPhrases: [
      { en: 'current internet connection', vi: 'kết nối mạng hiện tại' },
      { en: 'fiber home package', vi: 'gói cáp quang gia đình' },
      { en: 'free modern router', vi: 'bộ phát Wi-Fi hiện đại miễn phí' },
    ],
    question: {
      q: 'What bonus do customers get if they upgrade before Friday?',
      options: ['A free modern router', 'One free month', 'Free mobile data'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-148',
    level: 'A2',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 148: Xử lý khiếu nại giao thiếu cốc sứ đặt online',
    sourceStyle: 'VOA • E-Commerce Support',
    transcript:
      'Hi, my online order arrived this morning, and I ordered four ceramic mugs, but only three were inside the box. Please accept our sincere apologies for the packing error! Could you share your order number? Thank you. I have already created a replacement order for the missing mug at no extra cost, and it will reach you tomorrow afternoon.',
    translation:
      'Chào bạn, đơn hàng trực tuyến của tôi giao tới sáng nay, tôi đặt bốn chiếc cốc gốm nhưng trong hộp chỉ có ba chiếc. Xin hãy nhận lời xin lỗi chân thành từ chúng tôi vì sai sót đóng gói! Bạn có thể cung cấp mã đơn hàng được không? Cảm ơn bạn. Tôi đã tạo sẵn đơn gửi bù chiếc cốc bị thiếu hoàn toàn miễn phí và nó sẽ tới tay bạn vào chiều mai.',
    keyPhrases: [
      { en: 'packing error', vi: 'sai sót trong đóng gói' },
      { en: 'replacement order', vi: 'đơn hàng gửi bù' },
      { en: 'at no extra cost', vi: 'không mất thêm chi phí' },
    ],
    question: {
      q: 'When will the missing mug arrive?',
      options: ['This evening', 'Tomorrow afternoon', 'Next Monday'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-149',
    level: 'A2',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 149: Hẹn lịch kỹ thuật viên lắp đặt máy lạnh',
    sourceStyle: 'British Council • Home Services',
    transcript:
      'Good morning, CoolAir Support calling to schedule your air conditioner installation. Are you available this Saturday between nine and eleven AM? Saturday morning works well for me. Great, our technician will call you thirty minutes before arriving at your apartment. Please make sure the balcony area is clear so he can work safely.',
    translation:
      'Chào buổi sáng, bộ phận Hỗ trợ CoolAir gọi để đặt lịch lắp đặt máy điều hòa cho bạn. Thứ Bảy này từ 9 đến 11 giờ sáng bạn có rảnh không? Sáng thứ Bảy rất phù hợp với tôi. Tuyệt vời, kỹ thuật viên của chúng tôi sẽ gọi cho bạn trước khi đến căn hộ 30 phút. Vui lòng dọn trống khu vực ban công để anh ấy làm việc an toàn nhé.',
    keyPhrases: [
      { en: 'schedule your air conditioner installation', vi: 'đặt lịch lắp đặt điều hòa' },
      { en: 'thirty minutes before arriving', vi: '30 phút trước khi tới' },
      { en: 'balcony area is clear', vi: 'khu vực ban công thông thoáng' },
    ],
    question: {
      q: 'What should the customer do before the technician arrives?',
      options: ['Pay cash at the office', 'Turn off the building water', 'Make sure the balcony area is clear'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-150',
    level: 'A2',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 150: Chào gói cung ứng văn phòng phẩm cho quán cà phê',
    sourceStyle: 'BBC • Small Business Sales',
    transcript:
      'Hello Ms. Linh, I represent PaperPlus Supplies, and we work with many local cafes in this district. If your shop orders eco-friendly cups and napkins in monthly boxes, we can lower your supply costs by fifteen percent. We also deliver every Monday morning before seven AM so your staff never runs out during busy hours.',
    translation:
      'Chào chị Linh, tôi đại diện cho PaperPlus Supplies, chúng tôi đang hợp tác với nhiều quán cà phê địa phương trong quận này. Nếu cửa hàng chị đặt cốc và khăn giấy thân thiện môi trường theo thùng hàng tháng, chúng tôi có thể giảm 15 phần trăm chi phí vật tư cho chị. Chúng tôi cũng giao hàng mỗi sáng thứ Hai trước 7 giờ để nhân viên không bao giờ hết đồ vào giờ cao điểm.',
    keyPhrases: [
      { en: 'eco-friendly cups', vi: 'cốc thân thiện với môi trường' },
      { en: 'lower your supply costs', vi: 'giảm chi phí vật tư cho bạn' },
      { en: 'never runs out', vi: 'không bao giờ bị thiếu hụt' },
    ],
    question: {
      q: 'How much can PaperPlus Supplies reduce the cafe supply costs?',
      options: ['Fifteen percent', 'Fifty percent', 'Five percent'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-151',
    level: 'B1',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 151: Đánh giá kết quả khảo sát hài lòng khách hàng',
    sourceStyle: 'British Council • Business & Career',
    transcript:
      'Thank you all for joining our monthly service review. Our latest customer satisfaction score rose from eighty-four to eighty-nine percent, mainly because of faster email replies. However, several shoppers complained about waiting over eight minutes on our phone hotline during lunchtime. Starting next week, we will assign two extra agents to cover peak midday calls.',
    translation:
      'Cảm ơn mọi người đã tham gia buổi đánh giá dịch vụ hàng tháng. Điểm hài lòng khách hàng mới nhất đã tăng từ 84 lên 89 phần trăm, chủ yếu nhờ tốc độ phản hồi email nhanh hơn. Tuy nhiên, một số khách phàn nàn về việc phải chờ hơn tám phút trên đường dây nóng vào giờ nghỉ trưa. Từ tuần tới, chúng ta sẽ bố trí thêm hai nhân viên trực hỗ trợ khung giờ cao điểm buổi trưa.',
    keyPhrases: [
      { en: 'customer satisfaction score', vi: 'điểm số hài lòng khách hàng' },
      { en: 'phone hotline', vi: 'đường dây nóng điện thoại' },
      { en: 'peak midday calls', vi: 'cuộc gọi giờ cao điểm buổi trưa' },
    ],
    question: {
      q: 'Why did some customers complain in the survey?',
      options: ['Emails were rude', 'Phone wait times exceeded eight minutes at lunchtime', 'Product prices increased'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-152',
    level: 'B1',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 152: Thương lượng chiết khấu và điều khoản thanh toán B2B',
    sourceStyle: 'BBC Learning English • Business Negotiations',
    transcript:
      'We really appreciate your reliable furniture quality over the past year. Now that our hotel chain is expanding to three new locations, we plan to double our annual order volume. In return, could your factory offer an eight-percent bulk discount and extend payment terms from fifteen days to thirty days after delivery?',
    translation:
      'Chúng tôi thực sự đánh giá cao chất lượng nội thất ổn định của bên bạn trong năm qua. Hiện chuỗi khách sạn của chúng tôi đang mở rộng thêm ba cơ sở mới và dự kiến sẽ tăng gấp đôi sản lượng đặt hàng hàng năm. Đổi lại, nhà máy bên bạn có thể áp dụng mức chiết khấu số lượng lớn 8 phần trăm và kéo dài thời hạn thanh toán từ 15 ngày lên 30 ngày sau khi giao hàng không?',
    keyPhrases: [
      { en: 'annual order volume', vi: 'sản lượng đặt hàng hàng năm' },
      { en: 'bulk discount', vi: 'chiết khấu mua số lượng lớn' },
      { en: 'payment terms', vi: 'điều khoản thanh toán' },
    ],
    question: {
      q: 'What payment term is the buyer requesting?',
      options: ['Fifteen days before shipping', 'Cash upon arrival', 'Thirty days after delivery'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-153',
    level: 'B1',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 153: Giới thiệu phần mềm quản lý bán hàng cho chuỗi cửa hàng',
    sourceStyle: 'VOA • Tech & Business Solutions',
    transcript:
      'Imagine tracking sales across all five of your clothing boutiques from one single dashboard. Our cloud retail software updates stock numbers instantly whenever a cashier scans an item. Even if your store internet drops temporarily, offline mode keeps saving receipts and syncs everything automatically as soon as the connection returns.',
    translation:
      'Hãy hình dung việc theo dõi doanh số trên cả năm cửa hàng thời trang của bạn chỉ từ một bảng điều khiển duy nhất. Phần mềm bán lẻ đám mây của chúng tôi cập nhật số lượng tồn kho ngay lập tức mỗi khi thu ngân quét mã sản phẩm. Ngay cả khi mạng cửa hàng bị gián đoạn tạm thời, chế độ ngoại tuyến vẫn tiếp tục lưu hóa đơn và tự động đồng bộ mọi thứ ngay khi có kết nối trở lại.',
    keyPhrases: [
      { en: 'single dashboard', vi: 'một bảng điều khiển duy nhất' },
      { en: 'updates stock numbers instantly', vi: 'cập nhật tồn kho ngay lập tức' },
      { en: 'syncs everything automatically', vi: 'tự động đồng bộ mọi thứ' },
    ],
    question: {
      q: 'What happens if the store loses internet connection?',
      options: ['Offline mode saves receipts and syncs later', 'Cashiers must close the shop', 'Stock numbers are deleted'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-154',
    level: 'B1',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 154: Giữ chân khách hàng muốn hủy gói đăng ký',
    sourceStyle: 'British Council • Client Retention',
    transcript:
      'I noticed you submitted a request to cancel your design software subscription today, and I wanted to check if everything was alright. Honestly, our agency only uses the tool during busy summer campaigns, so paying year-round feels expensive. That makes total sense! Rather than canceling and losing your saved templates, you can pause your billing for up to four months at zero cost.',
    translation:
      'Tôi thấy hôm nay bạn đã gửi yêu cầu hủy gói đăng ký phần mềm thiết kế, nên tôi muốn hỏi xem có vấn đề gì không. Thật lòng thì công ty chúng tôi chỉ dùng công cụ này vào các chiến dịch mùa hè bận rộn, nên trả phí quanh năm thấy hơi tốn kém. Điều đó hoàn toàn hợp lý! Thay vì hủy và mất hết các mẫu đã lưu, bạn có thể tạm dừng tính phí tối đa bốn tháng hoàn toàn miễn phí.',
    keyPhrases: [
      { en: 'cancel your design software subscription', vi: 'hủy gói đăng ký phần mềm thiết kế' },
      { en: 'paying year-round', vi: 'trả phí quanh năm' },
      { en: 'pause your billing', vi: 'tạm dừng chu kỳ tính phí' },
    ],
    question: {
      q: 'Why does the client want to cancel the subscription?',
      options: ['The software crashes often', 'They only need it during summer campaigns', 'They switched to a rival agency'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-155',
    level: 'B1',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 155: Chăm sóc khách hàng tiềm năng sau hội chợ triển lãm',
    sourceStyle: 'BBC • B2B Sales Follow-up',
    transcript:
      'Hi Mr. Tanaka, this is Mai from GreenPack Solutions. We spoke briefly at our booth during Tuesday’s packaging trade show in Hanoi. You mentioned wanting biodegradable takeout containers for your restaurant group. I am sending over sample boxes and a customized price sheet today—would Thursday at ten AM work for a quick fifteen-minute call?',
    translation:
      'Chào ông Tanaka, tôi là Mai từ GreenPack Solutions. Chúng ta đã trao đổi ngắn tại gian hàng của chúng tôi trong hội chợ bao bì hôm thứ Ba ở Hà Nội. Ông có nhắc đến việc muốn tìm hộp đựng mang đi phân hủy sinh học cho hệ thống nhà hàng của mình. Hôm nay tôi sẽ gửi bộ mẫu thử cùng bảng giá thiết kế riêng—không biết 10 giờ sáng thứ Năm ông có tiện gọi nhanh 15 phút không ạ?',
    keyPhrases: [
      { en: 'packaging trade show', vi: 'hội chợ triển lãm bao bì' },
      { en: 'biodegradable takeout containers', vi: 'hộp mang đi phân hủy sinh học' },
      { en: 'customized price sheet', vi: 'bảng giá thiết kế riêng' },
    ],
    question: {
      q: 'Where did Mai first meet Mr. Tanaka?',
      options: ['At his restaurant', 'On a video webinar', 'At a packaging trade show'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-156',
    level: 'B2',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 156: Phân tích nguyên nhân khách hàng rời bỏ dịch vụ SaaS',
    sourceStyle: 'BBC • Business Insights',
    transcript:
      'Although our user acquisition numbers exceeded targets this quarter, net revenue growth slowed due to a spike in early-stage churn. Exit surveys reveal that forty percent of departing clients struggled during their first two weeks of onboarding because our setup guide lacked clear industry examples. Redesigning our welcome sequence with interactive walkthroughs should substantially improve ninety-day retention.',
    translation:
      'Mặc dù số lượng thu hút người dùng mới quý này vượt mục tiêu, tăng trưởng doanh thu thuần vẫn chậm lại do tỷ lệ rời bỏ ở giai đoạn đầu tăng vọt. Khảo sát rời dịch vụ cho thấy 40 phần trăm khách hàng rời đi gặp khó khăn trong hai tuần đầu làm quen vì tài liệu hướng dẫn thiết lập thiếu các ví dụ thực tế theo ngành. Việc thiết kế lại chuỗi chào mừng bằng hướng dẫn tương tác trực quan sẽ giúp cải thiện đáng kể tỷ lệ giữ chân sau 90 ngày.',
    keyPhrases: [
      { en: 'user acquisition numbers', vi: 'chỉ số thu hút người dùng mới' },
      { en: 'early-stage churn', vi: 'tỷ lệ khách rời bỏ ở giai đoạn đầu' },
      { en: 'ninety-day retention', vi: 'tỷ lệ giữ chân sau 90 ngày' },
    ],
    question: {
      q: 'What was the main issue reported by forty percent of departing clients?',
      options: ['Unclear onboarding guide lacking industry examples', 'Unexpected price hikes', 'Frequent server outages'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-157',
    level: 'B2',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 157: Đàm phán cam kết chất lượng dịch vụ SLA doanh nghiệp',
    sourceStyle: 'British Council • Enterprise Account Management',
    transcript:
      'Before signing the enterprise agreement, our compliance team needs explicit guarantees in the Service Level Agreement. Specifically, we require ninety-nine point nine percent monthly platform uptime and a dedicated engineer responding within thirty minutes for critical outages. We are comfortable committing to those thresholds, provided scheduled Sunday maintenance windows are excluded from downtime calculations.',
    translation:
      'Trước khi ký hợp đồng cấp doanh nghiệp, đội ngũ tuân thủ của chúng tôi cần các cam kết rõ ràng trong Thỏa thuận Mức độ Dịch vụ. Cụ thể, chúng tôi yêu cầu thời gian hoạt động nền tảng đạt 99,9 phần trăm mỗi tháng và có kỹ sư phụ trách phản hồi trong vòng 30 phút đối với các sự cố nghiêm trọng. Chúng tôi sẵn sàng cam kết các ngưỡng đó, miễn là khung bảo trì định kỳ vào Chủ nhật được loại trừ khỏi phần tính thời gian gián đoạn.',
    keyPhrases: [
      { en: 'Service Level Agreement', vi: 'Thỏa thuận Mức độ Dịch vụ (SLA)' },
      { en: 'critical outages', vi: 'các sự cố gián đoạn nghiêm trọng' },
      { en: 'maintenance windows', vi: 'khung thời gian bảo trì' },
    ],
    question: {
      q: 'What condition does the vendor propose for the uptime guarantee?',
      options: ['Higher monthly fees', 'Excluding scheduled Sunday maintenance windows', 'Reducing engineer response times to two hours'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-158',
    level: 'B2',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 158: Xử lý khủng hoảng thu hồi sản phẩm và giữ niềm tin',
    sourceStyle: 'VOA • Corporate Communications',
    transcript:
      'When an independent lab detected a faulty battery batch in two thousand portable blenders, management opted for an immediate voluntary recall rather than waiting for complaints. Within twenty-four hours, customer service emailed affected buyers directly, arranged prepaid courier pickups, and offered either a full refund or an upgraded model. Transparent crisis communication ultimately strengthened brand loyalty among early buyers.',
    translation:
      'Khi một phòng thí nghiệm độc lập phát hiện lô pin lỗi trong hai nghìn chiếc máy xay cầm tay, ban lãnh đạo đã chọn phương án chủ động thu hồi ngay lập tức thay vì chờ đợi khiếu nại. Trong vòng 24 giờ, bộ phận chăm sóc khách hàng đã gửi email trực tiếp cho người mua bị ảnh hưởng, sắp xếp đơn vị chuyển phát thu hồi miễn phí và đề xuất hoàn tiền 100 phần trăm hoặc đổi sang mẫu nâng cấp. Truyền thông khủng hoảng minh bạch rốt cuộc đã củng cố lòng trung thành thương hiệu trong nhóm khách hàng đầu tiên.',
    keyPhrases: [
      { en: 'voluntary recall', vi: 'chủ động thu hồi tự nguyện' },
      { en: 'prepaid courier pickups', vi: 'dịch vụ chuyển phát thu hồi trả trước' },
      { en: 'transparent crisis communication', vi: 'truyền thông khủng hoảng minh bạch' },
    ],
    question: {
      q: 'How did the company react after discovering the faulty battery batch?',
      options: ['Waited for customer complaints', 'Offered only store vouchers', 'Initiated an immediate voluntary recall and contacted buyers'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-159',
    level: 'B2',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 159: Hợp nhất kênh hỗ trợ khách hàng đa nền tảng',
    sourceStyle: 'BBC • Customer Experience Strategy',
    transcript:
      'Modern shoppers expect seamless transitions whether they message a brand on social media, open live chat on an app, or call support. Previously, fragmented databases forced customers to repeat their order history every time they switched channels. By unifying every interaction into a single customer profile, support specialists resolve complex inquiries twice as fast while delivering consistent, personalized assistance.',
    translation:
      'Người mua hàng hiện đại kỳ vọng sự chuyển tiếp liền mạch dù họ nhắn tin cho thương hiệu trên mạng xã hội, mở khung chat trên ứng dụng hay gọi tổng đài. Trước đây, cơ sở dữ liệu phân mảnh buộc khách hàng phải lặp lại lịch sử đơn hàng mỗi lần đổi kênh. Bằng cách hợp nhất mọi tương tác vào một hồ sơ khách hàng duy nhất, chuyên viên hỗ trợ giải quyết các yêu cầu phức tạp nhanh gấp đôi trong khi vẫn mang lại sự trợ giúp nhất quán và cá nhân hóa.',
    keyPhrases: [
      { en: 'seamless transitions', vi: 'sự chuyển tiếp liền mạch' },
      { en: 'fragmented databases', vi: 'cơ sở dữ liệu phân mảnh' },
      { en: 'single customer profile', vi: 'một hồ sơ khách hàng duy nhất' },
    ],
    question: {
      q: 'What problem existed before the company unified its support channels?',
      options: ['Customers had to repeat order history across channels', 'Social media accounts were blocked', 'Live chat could not accept photos'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-160',
    level: 'B2',
    category: 'Kinh doanh & CSKH',
    title: 'Bài 160: Đề xuất quyền phân phối độc quyền tại thị trường mới',
    sourceStyle: 'British Council • Commercial Partnerships',
    transcript:
      'Having built strong partnerships with forty specialty supermarkets across northern regions, our firm is ideally positioned to launch your organic beverage line. In exchange for exclusive distribution rights during the first twenty-four months, we will commit to minimum quarterly purchase quotas and co-fund regional tasting campaigns. Let us review the projected margin breakdown before finalizing the term sheet.',
    translation:
      'Sau khi xây dựng quan hệ hợp tác vững chắc với 40 siêu thị đặc sản trên khắp các tỉnh phía Bắc, công ty chúng tôi có vị thế lý tưởng để ra mắt dòng đồ uống hữu cơ của quý vị. Đổi lại quyền phân phối độc quyền trong 24 tháng đầu tiên, chúng tôi cam kết hạn mức nhập hàng tối thiểu hàng quý và đồng tài trợ các chiến dịch dùng thử tại khu vực. Hãy cùng rà soát bảng phân tích biên lợi nhuận dự kiến trước khi chốt bản điều khoản sơ bộ.',
    keyPhrases: [
      { en: 'exclusive distribution rights', vi: 'quyền phân phối độc quyền' },
      { en: 'minimum quarterly purchase quotas', vi: 'hạn mức nhập hàng tối thiểu hàng quý' },
      { en: 'projected margin breakdown', vi: 'phân tích biên lợi nhuận dự kiến' },
    ],
    question: {
      q: 'What does the distributor offer in exchange for exclusivity?',
      options: ['Free warehouse storage in southern cities', 'Quarterly purchase quotas and co-funded tasting campaigns', 'Full ownership of the beverage factory'],
      correctIdx: 1,
    },
  },

  // =====================================================================
  // 7. PHỎNG VẤN & NHÂN SỰ (lr-161 .. lr-180) — 5 A1, 5 A2, 5 B1, 5 B2
  // =====================================================================
  {
    id: 'lr-161',
    level: 'A1',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 161: Xác nhận lịch hẹn phỏng vấn qua điện thoại',
    sourceStyle: 'British Council • Job Application Basics',
    transcript:
      'Hello, may I speak with Nam? Yes, speaking—hi, I am calling from the Lotus Media HR team. Could you come for a job interview this Tuesday at ten AM? Yes, I can come then, and I will bring a printed resume to Room 204 on the second floor.',
    translation:
      'Xin chào, tôi có thể nói chuyện với Nam không? Vâng, tôi đang nghe—chào bạn, tôi gọi từ phòng Nhân sự Lotus Media. Bạn có thể tới dự buổi phỏng vấn xin việc vào 10 giờ sáng thứ Ba tuần này không? Vâng, tôi đến được ạ, và tôi sẽ mang một bản CV in giấy tới Phòng 204 ở tầng hai.',
    keyPhrases: [
      { en: 'job interview', vi: 'buổi phỏng vấn xin việc' },
      { en: 'printed resume', vi: 'bản CV in giấy' },
      { en: 'second floor', vi: 'tầng hai' },
    ],
    question: {
      q: 'What should Nam bring to the interview?',
      options: ['His laptop', 'Two passport photos', 'A printed resume'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-162',
    level: 'A1',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 162: Hỏi đường tới phòng Nhân sự trong ngày đầu đi làm',
    sourceStyle: 'VOA Learning English • First Day at Work',
    transcript:
      'Good morning, today is my first day working at this company! Welcome aboard, and what is your name? I am Trang, the new sales assistant here. Nice to meet you, Trang—the human resources office is down this hall, third door on the right.',
    translation:
      'Chào buổi sáng, hôm nay là ngày đầu tiên tôi làm việc tại công ty này! Chào mừng bạn gia nhập, bạn tên gì nhỉ? Tôi là Trang, trợ lý kinh doanh mới ở đây. Rất vui được gặp bạn, Trang—phòng nhân sự nằm cuối hành lang này, cửa thứ ba bên tay phải nhé.',
    keyPhrases: [
      { en: 'first day', vi: 'ngày đầu tiên' },
      { en: 'human resources office', vi: 'phòng nhân sự' },
      { en: 'third door on the right', vi: 'cửa thứ ba bên tay phải' },
    ],
    question: {
      q: 'What is Trang’s new job title?',
      options: ['Sales assistant', 'Office receptionist', 'HR manager'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-163',
    level: 'A1',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 163: Xin nghỉ phép một ngày để dự việc gia đình',
    sourceStyle: 'BBC Learning English • Office Requests',
    transcript:
      'Excuse me, Mark, do you have a minute to talk? Yes, Hoa, come in—could you tell me what you need? I want to take one day off this Friday for my sister’s wedding in Da Nang. Friday is fine because our report is already finished, so submit your leave form online.',
    translation:
      'Xin lỗi Mark, anh có rảnh một phút để trao đổi không? Có chứ Hoa, mời vào—em cần việc gì vậy? Em muốn xin nghỉ phép một ngày vào thứ Sáu này để dự đám cưới chị gái ở Đà Nẵng. Thứ Sáu ổn thôi vì báo cáo của nhóm đã hoàn thành rồi, nên em hãy nộp đơn xin nghỉ phép trực tuyến nhé.',
    keyPhrases: [
      { en: 'take one day off', vi: 'xin nghỉ phép một ngày' },
      { en: 'already finished', vi: 'đã hoàn thành rồi' },
      { en: 'leave form', vi: 'đơn xin nghỉ phép' },
    ],
    question: {
      q: 'Why can Hoa take Friday off?',
      options: ['The office is closed on Friday', 'Their report is already finished', 'Someone else covered her shift'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-164',
    level: 'A1',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 164: Nhận thẻ nhân viên và chìa khóa tủ cá nhân',
    sourceStyle: 'British Council • Workplace Onboarding',
    transcript:
      'Here is your new employee badge, Alex, which opens the front glass doors every morning. Thank you, and what is this small silver key for? That key opens your personal locker right near the break room. Also, free coffee and tea are always available in the kitchen.',
    translation:
      'Đây là thẻ nhân viên mới của bạn, Alex, thẻ này mở cửa kính phía trước mỗi sáng. Cảm ơn bạn, thế chiếc chìa khóa bạc nhỏ này dùng để làm gì? Chìa đó để mở tủ đồ cá nhân của bạn ngay gần phòng nghỉ nhân viên. Ngoài ra, cà phê và trà miễn phí luôn có sẵn trong bếp nhé.',
    keyPhrases: [
      { en: 'employee badge', vi: 'thẻ nhân viên' },
      { en: 'personal locker', vi: 'tủ đồ cá nhân' },
      { en: 'break room', vi: 'phòng nghỉ nhân viên' },
    ],
    question: {
      q: 'What does the employee badge open?',
      options: ['The personal locker', 'The kitchen cabinet', 'The front glass doors'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-165',
    level: 'A1',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 165: Giới thiệu thành viên mới trong nhóm thiết kế',
    sourceStyle: 'VOA • Team Introductions',
    transcript:
      'Everyone, please pause for one minute! I would like to introduce Khoa, our new graphic designer. Hello everyone, I am very excited to join the creative team! Khoa used to design posters in Ho Chi Minh City. Please help him feel at home this week.',
    translation:
      'Mọi người ơi, vui lòng dừng tay một phút nhé! Tôi xin giới thiệu Khoa, chuyên viên thiết kế đồ họa mới của chúng ta. Chào mọi người, mình rất hào hứng khi gia nhập đội ngũ sáng tạo! Khoa từng thiết kế áp phích tại Thành phố Hồ Chí Minh. Tuần này mọi người giúp bạn ấy làm quen nhanh chóng nhé.',
    keyPhrases: [
      { en: 'graphic designer', vi: 'nhà thiết kế đồ họa' },
      { en: 'creative team', vi: 'đội ngũ sáng tạo' },
      { en: 'feel at home', vi: 'cảm thấy thoải mái như ở nhà' },
    ],
    question: {
      q: 'What did Khoa design in his previous job?',
      options: ['Posters', 'Mobile games', 'Company uniforms'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-166',
    level: 'A2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 166: Trả lời phỏng vấn về điểm mạnh cá nhân',
    sourceStyle: 'British Council • Interview Preparation',
    transcript:
      'What would you say is your biggest strength for this receptionist role? My biggest strength is staying calm and polite even during busy rush hours. Last year, at a crowded clinic, I greeted fifty patients a morning while keeping appointment records accurate. I also learn new booking software very quickly.',
    translation:
      'Bạn cho rằng điểm mạnh lớn nhất của mình đối với vị trí lễ tân này là gì? Điểm mạnh lớn nhất của tôi là giữ được sự bình tĩnh và lịch sự ngay cả trong những giờ cao điểm đông đúc. Năm ngoái tại một phòng khám đông khách, tôi tiếp đón 50 bệnh nhân mỗi sáng mà vẫn giữ hồ sơ đặt lịch chính xác. Tôi cũng học các phần mềm đặt lịch mới rất nhanh.',
    keyPhrases: [
      { en: 'biggest strength', vi: 'điểm mạnh lớn nhất' },
      { en: 'staying calm and polite', vi: 'giữ bình tĩnh và lịch sự' },
      { en: 'appointment records', vi: 'hồ sơ đặt lịch hẹn' },
    ],
    question: {
      q: 'How many patients did the candidate greet each morning at the clinic?',
      options: ['Fifteen patients', 'Fifty patients', 'Five hundred patients'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-167',
    level: 'A2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 167: Phổ biến quy định chấm công và giờ nghỉ trưa',
    sourceStyle: 'BBC • HR Orientation',
    transcript:
      'Let me briefly explain our daily office schedule. Standard working hours run from eight thirty AM to five thirty PM, Monday through Friday. Remember to tap your ID card on the scanner beside the main entrance when you arrive and leave. Everyone gets a one-hour lunch break starting at twelve noon.',
    translation:
      'Để tôi giải thích ngắn gọn lịch làm việc hàng ngày tại văn phòng. Giờ làm việc tiêu chuẩn kéo dài từ 8 giờ 30 sáng đến 5 giờ 30 chiều, từ thứ Hai đến thứ Sáu. Hãy nhớ quét thẻ nhân viên vào máy quét cạnh cổng chính khi đến và khi về. Mọi người có một tiếng nghỉ trưa bắt đầu từ 12 giờ đúng.',
    keyPhrases: [
      { en: 'standard working hours', vi: 'giờ làm việc tiêu chuẩn' },
      { en: 'tap your ID card', vi: 'quét thẻ nhân viên' },
      { en: 'one-hour lunch break', vi: 'giờ nghỉ trưa một tiếng' },
    ],
    question: {
      q: 'Where is the ID card scanner located?',
      options: ['Inside the cafeteria', 'In the HR room', 'Beside the main entrance'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-168',
    level: 'A2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 168: Mời nhân viên đăng ký khóa đào tạo Excel',
    sourceStyle: 'VOA • Staff Development',
    transcript:
      'Good morning team, Human Resources is hosting a practical spreadsheet workshop next Wednesday afternoon from two to four PM. You will learn useful shortcuts, quick charts, and simple formulas to save time on weekly reports. Seats are limited to twenty people, so please register on the company portal before Monday evening.',
    translation:
      'Chào buổi sáng cả nhóm, phòng Nhân sự sẽ tổ chức buổi hội thảo thực hành bảng tính vào chiều thứ Tư tuần tới từ 2 giờ đến 4 giờ. Các bạn sẽ học các phím tắt hữu ích, biểu đồ nhanh và công thức đơn giản để tiết kiệm thời gian làm báo cáo tuần. Số chỗ giới hạn 20 người, nên hãy đăng ký trên cổng thông tin nội bộ trước tối thứ Hai nhé.',
    keyPhrases: [
      { en: 'practical spreadsheet workshop', vi: 'hội thảo thực hành bảng tính' },
      { en: 'save time on weekly reports', vi: 'tiết kiệm thời gian làm báo cáo tuần' },
      { en: 'seats are limited', vi: 'số chỗ ngồi có hạn' },
    ],
    question: {
      q: 'When is the deadline to register for the workshop?',
      options: ['Monday evening', 'Wednesday afternoon', 'Friday morning'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-169',
    level: 'A2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 169: Hỏi nhà tuyển dụng về chính sách làm việc kết hợp',
    sourceStyle: 'British Council • Candidate Questions',
    transcript:
      'Before we wrap up this interview, do you have any questions about our workplace? Yes, I noticed the job post mentioned hybrid work. How does that schedule work here? During the two-month probation period, new staff work at the office full-time for coaching. Afterward, employees may work from home every Tuesday and Thursday.',
    translation:
      'Trước khi kết thúc buổi phỏng vấn này, bạn có câu hỏi nào về môi trường làm việc của chúng tôi không? Dạ có, tôi thấy tin tuyển dụng có nhắc đến làm việc kết hợp. Lịch đó ở đây áp dụng thế nào ạ? Trong hai tháng thử việc, nhân viên mới làm toàn thời gian tại văn phòng để được hướng dẫn. Sau đó, nhân viên có thể làm việc tại nhà vào mỗi thứ Ba và thứ Năm.',
    keyPhrases: [
      { en: 'hybrid work', vi: 'làm việc kết hợp (văn phòng và từ xa)' },
      { en: 'probation period', vi: 'thời gian thử việc' },
      { en: 'work from home', vi: 'làm việc tại nhà' },
    ],
    question: {
      q: 'Which days can staff work from home after probation?',
      options: ['Monday and Friday', 'Tuesday and Thursday', 'Wednesday and Saturday'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-170',
    level: 'A2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 170: Thông báo vượt qua kỳ thử việc và ký hợp đồng chính thức',
    sourceStyle: 'BBC Learning English • Career Milestones',
    transcript:
      'Hi Minh, thanks for meeting with me today. I have wonderful news: your manager and team are very pleased with your progress, so you have officially passed your probation! Starting next month, your monthly pay will increase by ten percent, and you will receive twelve paid vacation days per year. Welcome permanently to the company!',
    translation:
      'Chào Minh, cảm ơn bạn đã gặp tôi hôm nay. Tôi có tin tuyệt vời đây: quản lý và cả nhóm rất hài lòng với sự tiến bộ của bạn, vì vậy bạn đã chính thức vượt qua kỳ thử việc! Bắt đầu từ tháng sau, lương hàng tháng của bạn sẽ tăng 10 phần trăm và bạn sẽ có 12 ngày nghỉ phép hưởng lương mỗi năm. Chào mừng bạn chính thức gắn bó lâu dài với công ty!',
    keyPhrases: [
      { en: 'passed your probation', vi: 'vượt qua kỳ thử việc' },
      { en: 'monthly pay will increase', vi: 'lương hàng tháng sẽ tăng' },
      { en: 'paid vacation days', vi: 'ngày nghỉ phép có lương' },
    ],
    question: {
      q: 'How many paid vacation days will Minh receive each year?',
      options: ['Ten days', 'Fifteen days', 'Twelve days'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-171',
    level: 'B1',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 171: Trả lời phỏng vấn theo mô hình STAR về giải quyết bất đồng',
    sourceStyle: 'British Council • Behavioral Interviews',
    transcript:
      'Tell me about a time you disagreed with a colleague at work. Last spring, our content writer and I held different views on a product launch video, which risked delaying the schedule. Instead of arguing over chat, I arranged a quick meeting where we listed audience goals and tested both ideas on five loyal users. Combining her opening script with my visual layout boosted clicks by thirty percent.',
    translation:
      'Hãy kể về một lần bạn bất đồng quan điểm với đồng nghiệp trong công việc. Mùa xuân năm ngoái, người viết nội dung và tôi có quan điểm khác nhau về video ra mắt sản phẩm, điều này có nguy cơ làm trễ tiến độ. Thay vì tranh luận qua tin nhắn, tôi hẹn một buổi họp nhanh để cùng liệt kê mục tiêu khán giả và thử nghiệm cả hai ý tưởng trên năm khách hàng thân thiết. Kết hợp lời mở đầu của cô ấy với bố cục hình ảnh của tôi đã giúp tăng lượt nhấp thêm 30 phần trăm.',
    keyPhrases: [
      { en: 'held different views', vi: 'có quan điểm khác nhau' },
      { en: 'risked delaying the schedule', vi: 'có nguy cơ làm trễ tiến độ' },
      { en: 'tested both ideas', vi: 'thử nghiệm cả hai ý tưởng' },
    ],
    question: {
      q: 'How did the candidate and colleague resolve their disagreement?',
      options: ['Met to align on goals and tested both ideas on users', 'Asked the CEO to choose', 'Canceled the launch video'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-172',
    level: 'B1',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 172: Đánh giá hiệu suất làm việc định kỳ giữa năm',
    sourceStyle: 'BBC • Performance Reviews',
    transcript:
      'Overall, your mid-year performance review is very positive, Linh. Clients consistently praise your thorough documentation, and you hit ninety-five percent of your quarterly targets on time. One area for growth over the next six months is speaking up more confidently during cross-team briefings. I would like to pair you with a mentor to practice presenting short project updates.',
    translation:
      'Nhìn chung, kết quả đánh giá hiệu suất giữa năm của em rất tích cực, Linh ạ. Khách hàng liên tục khen ngợi tài liệu chi tiết của em, và em đã đạt 95 phần trăm mục tiêu hàng quý đúng hạn. Một điểm cần phát triển trong sáu tháng tới là phát biểu tự tin hơn trong các buổi họp giao ban liên phòng ban. Anh muốn ghép cặp em với một người hướng dẫn để luyện trình bày cập nhật dự án ngắn.',
    keyPhrases: [
      { en: 'mid-year performance review', vi: 'đánh giá hiệu suất giữa năm' },
      { en: 'thorough documentation', vi: 'tài liệu chi tiết, kỹ lưỡng' },
      { en: 'area for growth', vi: 'khía cạnh cần phát triển thêm' },
    ],
    question: {
      q: 'What skill does the manager want Linh to develop over the next six months?',
      options: ['Writing faster emails', 'Speaking up more confidently in cross-team briefings', 'Learning accounting software'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-173',
    level: 'B1',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 173: Phỏng vấn sàng lọc ứng viên trực tuyến qua video',
    sourceStyle: 'VOA • Modern Recruitment',
    transcript:
      'Thank you for joining this initial screening call, David. We were impressed by your logistics background in your portfolio. Before we invite you to the technical interview with the department head, could you confirm your current notice period and expected compensation range? Also, let us know whether you are comfortable traveling to regional warehouses twice a month.',
    translation:
      'Cảm ơn bạn đã tham gia cuộc gọi sàng lọc ban đầu này, David. Chúng tôi rất ấn tượng với nền tảng logistics trong hồ sơ năng lực của bạn. Trước khi mời bạn tham dự vòng phỏng vấn chuyên môn với trưởng bộ phận, bạn có thể xác nhận thời gian báo trước nghỉ việc hiện tại và mức thu nhập kỳ vọng không? Ngoài ra, hãy cho chúng tôi biết bạn có thoải mái di chuyển tới các kho hàng khu vực hai lần mỗi tháng không nhé.',
    keyPhrases: [
      { en: 'initial screening call', vi: 'cuộc gọi sàng lọc ban đầu' },
      { en: 'notice period', vi: 'thời gian báo trước khi nghỉ việc' },
      { en: 'expected compensation range', vi: 'khoảng thu nhập kỳ vọng' },
    ],
    question: {
      q: 'What is the next step after this screening call?',
      options: ['Signing the final contract', 'Traveling to a warehouse tomorrow', 'A technical interview with the department head'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-174',
    level: 'B1',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 174: Đề xuất chuyển công tác sang bộ phận vận hành sản phẩm',
    sourceStyle: 'British Council • Internal Mobility',
    transcript:
      'I have loved working in customer operations for the past two years, and it taught me exactly where users get stuck. Lately, however, I noticed an internal opening for a Junior Product Analyst, and I would love to apply. Would you support my transfer if I train my replacement thoroughly before switching teams?',
    translation:
      'Em rất thích khoảng thời gian làm việc ở bộ phận vận hành khách hàng hai năm qua, và công việc đó giúp em hiểu chính xác người dùng hay vướng mắc ở đâu. Tuy nhiên, gần đây em thấy thông báo tuyển dụng nội bộ cho vị trí Chuyên viên Phân tích Sản phẩm sơ cấp và rất muốn ứng tuyển. Anh có ủng hộ em luân chuyển nếu em đào tạo kỹ lưỡng người thay thế trước khi chuyển nhóm không ạ?',
    keyPhrases: [
      { en: 'internal opening', vi: 'vị trí tuyển dụng nội bộ' },
      { en: 'support my transfer', vi: 'ủng hộ việc luân chuyển của tôi' },
      { en: 'train my replacement', vi: 'đào tạo người thay thế' },
    ],
    question: {
      q: 'What is the employee offering to do before changing teams?',
      options: ['Thoroughly train a replacement', 'Work unpaid weekends', 'Take a pay cut'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-175',
    level: 'B1',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 175: Phổ biến quy tắc bảo mật dữ liệu nơi công sở',
    sourceStyle: 'BBC • Workplace Compliance',
    transcript:
      'As part of your onboarding, please follow three essential data protection rules every day. First, always lock your laptop screen whenever you step away from your desk, even for coffee. Second, never open suspicious email attachments or share passwords over chat. Finally, report any lost company device to IT support within one hour so access can be disabled immediately.',
    translation:
      'Là một phần trong quá trình hội nhập, vui lòng tuân thủ ba quy tắc bảo vệ dữ liệu thiết yếu mỗi ngày. Thứ nhất, luôn khóa màn hình máy tính xách tay mỗi khi rời bàn làm việc, kể cả chỉ đi lấy cà phê. Thứ hai, không bao giờ mở tệp đính kèm email đáng ngờ hay chia sẻ mật khẩu qua tin nhắn. Cuối cùng, hãy báo ngay thiết bị công ty bị thất lạc cho bộ phận IT trong vòng một giờ để quyền truy cập được vô hiệu hóa lập tức.',
    keyPhrases: [
      { en: 'data protection rules', vi: 'quy tắc bảo vệ dữ liệu' },
      { en: 'lock your laptop screen', vi: 'khóa màn hình máy tính' },
      { en: 'suspicious email attachments', vi: 'tệp đính kèm email đáng ngờ' },
    ],
    question: {
      q: 'Within what timeframe must a lost company device be reported to IT?',
      options: ['Within one hour', 'Within one day', 'At the end of the week'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-176',
    level: 'B2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 176: Gọi điện kiểm tra thông tin tham chiếu từ quản lý cũ',
    sourceStyle: 'British Council • Executive Hiring',
    transcript:
      'Thank you for speaking with me today regarding Ms. Sarah Kim’s application for Operations Lead. Having supervised her for three years, how would you describe her accountability under shifting deadlines? Sarah consistently took ownership of complex rollouts, communicated delays early to stakeholders, and mentored junior coordinators without being asked. Without hesitation, I would gladly rehire her if our budget allowed.',
    translation:
      'Cảm ơn ông đã trao đổi với tôi hôm nay về hồ sơ ứng tuyển vị trí Trưởng bộ phận Vận hành của cô Sarah Kim. Từng trực tiếp quản lý cô ấy suốt ba năm, ông đánh giá thế nào về tinh thần trách nhiệm của cô ấy khi hạn chót thay đổi liên tục? Sarah luôn chủ động nhận trách nhiệm với các đợt triển khai phức tạp, báo sớm nguy cơ chậm tiến độ cho các bên liên quan và hướng dẫn điều phối viên mới dù không ai yêu cầu. Không chút do dự, tôi sẵn sàng tuyển lại cô ấy nếu ngân sách cho phép.',
    keyPhrases: [
      { en: 'under shifting deadlines', vi: 'dưới áp lực hạn chót thay đổi' },
      { en: 'took ownership of', vi: 'chủ động nhận trách nhiệm về' },
      { en: 'without hesitation', vi: 'không chút do dự' },
    ],
    question: {
      q: 'What does the former manager say about rehiring Sarah?',
      options: ['She needs more training first', 'She only worked well alone', 'He would gladly rehire her if budget allowed'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-177',
    level: 'B2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 177: Phỏng vấn nhân viên nghỉ việc để cải thiện văn hóa công ty',
    sourceStyle: 'BBC • People & Culture',
    transcript:
      'Thank you for sharing candid feedback during your exit interview, Tuan. We value honesty because it helps us improve retention across engineering teams. Could you pinpoint what ultimately prompted your decision to leave? Honestly, the workload stayed manageable, yet unclear promotion criteria made it hard to picture a long-term career path here compared with my new offer.',
    translation:
      'Cảm ơn Tuấn đã chia sẻ phản hồi thẳng thắn trong buổi phỏng vấn nghỉ việc. Chúng tôi trân trọng sự trung thực vì nó giúp công ty cải thiện khả năng giữ chân nhân tài ở các đội kỹ thuật. Bạn có thể chỉ ra điều gì rốt cuộc đã thúc đẩy quyết định rời đi của bạn không? Thật lòng thì khối lượng công việc vẫn ở mức kiểm soát được, nhưng tiêu chí thăng tiến thiếu rõ ràng khiến tôi khó hình dung lộ trình phát triển lâu dài ở đây so với lời mời mới.',
    keyPhrases: [
      { en: 'candid feedback', vi: 'phản hồi thẳng thắn, chân thật' },
      { en: 'exit interview', vi: 'phỏng vấn nghỉ việc' },
      { en: 'unclear promotion criteria', vi: 'tiêu chí thăng tiến thiếu rõ ràng' },
    ],
    question: {
      q: 'Why did Tuan decide to leave the company?',
      options: ['The workload was impossible', 'Promotion criteria were unclear', 'He disliked his teammates'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-178',
    level: 'B2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 178: Xây dựng chính sách gắn kết và giữ chân nhân tài',
    sourceStyle: 'VOA • Talent Strategy',
    transcript:
      'Replacing an experienced specialist typically costs far more than investing in employee growth early on. Forward-thinking human resources teams now combine transparent salary bands with structured cross-departmental mentorship programs. When workers see tangible skill progression and feel recognized for collaborative impact rather than mere overtime hours, turnover rates drop noticeably across every division.',
    translation:
      'Chi phí thay thế một chuyên viên giàu kinh nghiệm thường tốn kém hơn nhiều so với việc đầu tư phát triển nhân viên từ sớm. Các bộ phận nhân sự có tầm nhìn hiện đại nay kết hợp khung lương minh bạch với chương trình cố vấn liên phòng ban bài bản. Khi nhân sự nhìn thấy sự tiến bộ kỹ năng cụ thể và được ghi nhận nhờ tác động hợp tác thay vì chỉ đếm giờ tăng ca, tỷ lệ nghỉ việc giảm rõ rệt ở mọi bộ phận.',
    keyPhrases: [
      { en: 'transparent salary bands', vi: 'khung lương minh bạch' },
      { en: 'tangible skill progression', vi: 'sự tiến bộ kỹ năng rõ rệt' },
      { en: 'turnover rates', vi: 'tỷ lệ nhân sự nghỉ việc' },
    ],
    question: {
      q: 'According to the passage, what lowers turnover rates across divisions?',
      options: ['Transparent salary bands, mentorship, and recognizing impact', 'Stricter attendance penalties', 'Mandatory weekend overtime'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-179',
    level: 'B2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 179: Trao đổi xây dựng khi nhân viên liên tục trễ hạn',
    sourceStyle: 'British Council • Management Coaching',
    transcript:
      'Over the past month, three of your campaign briefs missed the agreed delivery date, which put unexpected strain on the design team. My intention today is not to blame you, but to uncover what bottlenecks are slowing down your workflow. Once we identify whether unclear client inputs or competing priorities are causing delays, we can recalibrate your weekly task allocation together.',
    translation:
      'Trong tháng vừa qua, có ba bản tóm tắt chiến dịch của bạn trễ ngày bàn giao đã thống nhất, gây áp lực ngoài dự kiến cho đội thiết kế. Mục đích của tôi hôm nay không phải để trách móc bạn, mà để tìm hiểu những điểm nghẽn nào đang làm chậm quy trình làm việc của bạn. Một khi xác định được nguyên nhân chậm trễ đến từ yêu cầu khách hàng chưa rõ hay do các đầu việc ưu tiên chồng chéo, chúng ta sẽ cùng điều chỉnh lại phân bổ công việc hàng tuần.',
    keyPhrases: [
      { en: 'unexpected strain', vi: 'áp lực ngoài dự kiến' },
      { en: 'bottlenecks are slowing down', vi: 'những điểm nghẽn đang làm chậm' },
      { en: 'recalibrate your weekly task allocation', vi: 'điều chỉnh lại phân bổ việc hàng tuần' },
    ],
    question: {
      q: 'What is the manager’s main goal in this conversation?',
      options: ['To issue an immediate termination notice', 'To transfer the employee to design', 'To identify workflow bottlenecks and rebalance tasks'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-180',
    level: 'B2',
    category: 'Phỏng vấn & Nhân sự',
    title: 'Bài 180: Hoạch định ngân sách và kế hoạch tuyển dụng quý tới',
    sourceStyle: 'BBC • Workforce Planning',
    transcript:
      'During yesterday’s workforce planning session, department heads submitted requests for twelve new hires across product and sales. However, given conservative revenue projections, finance approved funding for seven permanent positions plus two short-term contractors. Our recruiting team must prioritize revenue-generating roles first while upskilling existing staff to cover secondary administrative duties.',
    translation:
      'Trong phiên họp hoạch định nhân sự hôm qua, các trưởng bộ phận đã đề xuất tuyển mới 12 vị trí ở mảng sản phẩm và kinh doanh. Tuy nhiên, xét theo dự báo doanh thu thận trọng, phòng tài chính chỉ phê duyệt ngân sách cho bảy vị trí chính thức cùng hai nhân sự hợp đồng ngắn hạn. Đội tuyển dụng của chúng ta cần ưu tiên các vai trò trực tiếp tạo ra doanh thu trước, đồng thời đào tạo nâng cao kỹ năng cho nhân sự hiện tại để đảm nhận các nhiệm vụ hành chính phụ trợ.',
    keyPhrases: [
      { en: 'workforce planning session', vi: 'phiên họp hoạch định nhân lực' },
      { en: 'permanent positions', vi: 'các vị trí chính thức lâu dài' },
      { en: 'upskilling existing staff', vi: 'nâng cao kỹ năng cho nhân viên hiện tại' },
    ],
    question: {
      q: 'How many permanent positions did finance approve?',
      options: ['Twelve', 'Seven', 'Two'],
      correctIdx: 1,
    },
  },

  // =====================================================================
  // 8. Y TẾ & SỨC KHỎE (lr-181 .. lr-200) — 5 A1, 5 A2, 5 B1, 5 B2
  // =====================================================================
  {
    id: 'lr-181',
    level: 'A1',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 181: Đặt lịch khám răng định kỳ qua điện thoại',
    sourceStyle: 'British Council • Health Appointments',
    transcript:
      'Hello, Smile Dental Clinic speaking—how can I help you today? Hi, I would like to book a teeth check-up sometime this week. Let me check our calendar: is Wednesday afternoon at three PM good for you? Yes, that is perfect, and here are my name and phone number.',
    translation:
      'Xin chào, Phòng khám Nha khoa Smile xin nghe—hôm nay tôi có thể giúp gì cho bạn? Chào bạn, tôi muốn đặt lịch kiểm tra răng định kỳ trong tuần này. Để tôi kiểm tra lịch hẹn nhé: chiều thứ Tư lúc 3 giờ chiều có phù hợp với bạn không? Vâng, giờ đó rất ổn ạ, và đây là tên cùng số điện thoại của tôi.',
    keyPhrases: [
      { en: 'teeth check-up', vi: 'kiểm tra răng định kỳ' },
      { en: 'check our calendar', vi: 'kiểm tra lịch hẹn' },
      { en: 'Wednesday afternoon', vi: 'chiều thứ Tư' },
    ],
    question: {
      q: 'When is the dental appointment booked?',
      options: ['Wednesday afternoon at three', 'Wednesday morning at nine', 'Friday evening at six'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-182',
    level: 'A1',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 182: Mua thuốc ho tại hiệu thuốc gần nhà',
    sourceStyle: 'VOA Learning English • At the Pharmacy',
    transcript:
      'Good evening, welcome to Care Pharmacy, can I help you find something? Yes, I have a dry cough and need a small bottle of honey cough syrup, please. Please take one small spoon after breakfast and dinner. Also, drink warm water and get lots of rest tonight.',
    translation:
      'Chào buổi tối, chào mừng đến Nhà thuốc Care, tôi có thể giúp bạn tìm gì không? Vâng, tôi bị ho khan và cần một chai nhỏ siro trị ho mật ong. Bạn hãy uống một thìa nhỏ sau bữa sáng và bữa tối nhé. Ngoài ra, hãy uống nước ấm và nghỉ ngơi thật nhiều tối nay.',
    keyPhrases: [
      { en: 'dry cough', vi: 'ho khan' },
      { en: 'cough syrup', vi: 'siro trị ho' },
      { en: 'one small spoon', vi: 'một thìa nhỏ' },
    ],
    question: {
      q: 'When should the customer take the cough syrup?',
      options: ['Before waking up', 'Only at lunchtime', 'After breakfast and dinner'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-183',
    level: 'A1',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 183: Làm thủ tục tiếp nhận tại quầy phòng khám',
    sourceStyle: 'BBC Learning English • Clinic Reception',
    transcript:
      'Hello, I have a morning appointment with Doctor Lin at nine thirty. Good morning, may I see your health card and photo ID? Sure, here they are for you to check. Thank you—please write your current address on this clipboard, then sit in the blue waiting room.',
    translation:
      'Xin chào, tôi có lịch hẹn buổi sáng với Bác sĩ Lin lúc 9 giờ 30. Chào buổi sáng, tôi có thể xem thẻ y tế và giấy tờ tùy thân có ảnh của bạn không? Chắc chắn rồi, đây để bạn kiểm tra. Cảm ơn bạn—vui lòng viết địa chỉ hiện tại lên bảng kẹp giấy này, sau đó ngồi đợi ở phòng chờ màu xanh dương nhé.',
    keyPhrases: [
      { en: 'health card', vi: 'thẻ y tế / thẻ bảo hiểm' },
      { en: 'current address', vi: 'địa chỉ hiện tại' },
      { en: 'waiting room', vi: 'phòng chờ khám' },
    ],
    question: {
      q: 'Where should the patient wait after filling out the form?',
      options: ['Outside the clinic', 'In the blue waiting room', 'At the pharmacy counter'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-184',
    level: 'A1',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 184: Lời khuyên đơn giản về dinh dưỡng hàng ngày',
    sourceStyle: 'VOA • Healthy Habits',
    transcript:
      'Good eating habits start with small daily choices. Try to eat fresh fruit and green vegetables with every lunch and dinner. Choose clean water or unsweetened tea instead of sweet soda drinks. When you eat slowly and stop before feeling too full, your stomach stays comfortable all day.',
    translation:
      'Thói quen ăn uống tốt bắt đầu từ những lựa chọn nhỏ mỗi ngày. Hãy cố gắng ăn trái cây tươi và rau xanh trong mỗi bữa trưa và bữa tối. Chọn nước lọc sạch hoặc trà không đường thay vì đồ uống có ga ngọt. Khi bạn ăn chậm và dừng lại trước khi quá no, dạ dày của bạn sẽ dễ chịu suốt cả ngày.',
    keyPhrases: [
      { en: 'fresh fruit and green vegetables', vi: 'trái cây tươi và rau xanh' },
      { en: 'instead of', vi: 'thay vì' },
      { en: 'eat slowly', vi: 'ăn chậm rãi' },
    ],
    question: {
      q: 'What drinks are recommended instead of sweet soda?',
      options: ['Clean water or unsweetened tea', 'Coffee with sugar', 'Cold milkshakes'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-185',
    level: 'A1',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 185: Khám mắt định kỳ và chọn kính đọc sách',
    sourceStyle: 'British Council • Eye Care',
    transcript:
      'Please sit here and read the third line on the eye chart. Hmm, the last two letters look a bit blurry today. Okay, let us update your reading glasses to a slightly stronger lens. Also, rest your eyes for two minutes every hour when you look at computer screens.',
    translation:
      'Mời bạn ngồi đây và đọc dòng thứ ba trên bảng đo thị lực. Ừm, hai chữ cái cuối hôm nay nhìn hơi mờ một chút. Được rồi, chúng ta hãy đổi kính đọc sách của bạn sang tròng có độ rõ hơn một chút. Ngoài ra, hãy cho mắt nghỉ hai phút mỗi giờ khi bạn nhìn màn hình máy tính nhé.',
    keyPhrases: [
      { en: 'eye chart', vi: 'bảng đo thị lực' },
      { en: 'reading glasses', vi: 'kính đọc sách' },
      { en: 'rest your eyes', vi: 'cho mắt nghỉ ngơi' },
    ],
    question: {
      q: 'How often should the person rest their eyes from screens?',
      options: ['Once a week', 'Ten minutes before bed', 'Two minutes every hour'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-186',
    level: 'A2',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 186: Khai báo tiền sử dị ứng trước khi bác sĩ kê đơn',
    sourceStyle: 'British Council • Medical Safety',
    transcript:
      'Before the doctor writes your prescription, I need to double-check a few safety details. Are you currently taking any daily vitamins or blood pressure medicine? No, I am not. Do you have any food or drug allergies? Yes, I am allergic to peanuts and one antibiotic called penicillin, which always gives me a skin rash.',
    translation:
      'Trước khi bác sĩ kê đơn thuốc cho bạn, tôi cần kiểm tra lại một vài thông tin an toàn. Hiện tại bạn có đang uống vitamin hàng ngày hay thuốc huyết áp nào không? Không, tôi không uống gì cả. Bạn có bị dị ứng thực phẩm hay thuốc nào không? Có, tôi bị dị ứng đậu phộng và một loại kháng sinh tên penicillin, nó luôn khiến tôi bị phát ban ngoài da.',
    keyPhrases: [
      { en: 'writes your prescription', vi: 'kê đơn thuốc cho bạn' },
      { en: 'drug allergies', vi: 'dị ứng thuốc' },
      { en: 'skin rash', vi: 'phát ban ngoài da' },
    ],
    question: {
      q: 'What happens to the patient when taking penicillin?',
      options: ['They get sleepy', 'They get a skin rash', 'Their throat hurts'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-187',
    level: 'A2',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 187: Hướng dẫn nhịn ăn trước khi lấy mẫu xét nghiệm máu',
    sourceStyle: 'VOA • Clinic Instructions',
    transcript:
      'Hello, this is a reminder call from Sunrise Medical Lab about your blood test tomorrow morning at eight AM. Please do not eat any food or drink coffee, milk, or juice for eight hours before your test. You may drink plain water so you stay hydrated. Also, bring a light snack to eat right after we finish drawing blood.',
    translation:
      'Xin chào, đây là cuộc gọi nhắc lịch từ Phòng xét nghiệm Y khoa Sunrise về buổi xét nghiệm máu của bạn vào 8 giờ sáng mai. Vui lòng không ăn bất kỳ thức ăn nào hoặc uống cà phê, sữa hay nước ép trong vòng 8 tiếng trước khi xét nghiệm. Bạn có thể uống nước lọc để giữ đủ nước cho cơ thể. Ngoài ra, hãy mang theo một món ăn nhẹ để ăn ngay sau khi chúng tôi lấy máu xong nhé.',
    keyPhrases: [
      { en: 'blood test', vi: 'xét nghiệm máu' },
      { en: 'plain water', vi: 'nước lọc thông thường' },
      { en: 'light snack', vi: 'món ăn nhẹ' },
    ],
    question: {
      q: 'What is allowed during the eight hours before the blood test?',
      options: ['Black coffee', 'Orange juice', 'Plain water'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-188',
    level: 'A2',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 188: Chăm sóc bong gân cổ chân sau khi chạy bộ',
    sourceStyle: 'BBC Learning English • Sports First Aid',
    transcript:
      'Good news—your X-ray shows no broken bones, just a mild ankle sprain from tripping on the running track. For the next two days, keep your foot raised on a pillow while sitting and place an ice pack wrapped in a towel on it for twenty minutes at a time. Please wear this elastic bandage when walking and avoid running for two weeks.',
    translation:
      'Tin tốt là phim chụp X-quang cho thấy không bị gãy xương, chỉ là bong gân nhẹ ở cổ chân do vấp ngã trên đường chạy. Trong hai ngày tới, hãy kê chân lên gối khi ngồi và chườm túi đá bọc khăn mỗi lần 20 phút. Hãy quấn băng thun co giãn này khi đi lại và tránh chạy bộ trong hai tuần nhé.',
    keyPhrases: [
      { en: 'mild ankle sprain', vi: 'bong gân nhẹ ở cổ chân' },
      { en: 'ice pack', vi: 'túi chườm đá' },
      { en: 'elastic bandage', vi: 'băng thun co giãn' },
    ],
    question: {
      q: 'How long should the patient avoid running?',
      options: ['Two weeks', 'Two days', 'Two months'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-189',
    level: 'A2',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 189: Cải thiện chất lượng giấc ngủ bằng thói quen buổi tối',
    sourceStyle: 'VOA Learning English • Sleep Wellness',
    transcript:
      'Many adults feel tired at work because their minds stay busy late at night. To fall asleep faster, turn off bright phone screens at least forty-five minutes before bedtime and read a paper book instead. Keeping your bedroom dark, quiet, and slightly cool also sends a clear signal to your brain that it is time to rest.',
    translation:
      'Nhiều người trưởng thành cảm thấy mệt mỏi ở chỗ làm vì đầu óc vẫn hoạt động căng thẳng vào đêm muộn. Để dễ ngủ hơn, hãy tắt màn hình điện thoại sáng chói ít nhất 45 phút trước giờ đi ngủ và thay bằng việc đọc sách giấy. Giữ phòng ngủ tối, yên tĩnh và hơi mát cũng gửi tín hiệu rõ ràng tới não bộ rằng đã đến giờ nghỉ ngơi.',
    keyPhrases: [
      { en: 'fall asleep faster', vi: 'dễ đi vào giấc ngủ hơn' },
      { en: 'before bedtime', vi: 'trước giờ đi ngủ' },
      { en: 'clear signal', vi: 'tín hiệu rõ ràng' },
    ],
    question: {
      q: 'What is suggested instead of looking at a bright phone screen?',
      options: ['Drinking hot tea', 'Reading a paper book', 'Listening to loud music'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-190',
    level: 'A2',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 190: Đăng ký hiến máu tình nguyện tại ngày hội sức khỏe',
    sourceStyle: 'British Council • Community Health',
    transcript:
      'Welcome to our Saturday blood drive! Is this your first time donating? Yes, I am a bit nervous, honestly. Do not worry—our nurses are very gentle, and the donation itself only takes ten minutes. First, let us check your iron level and blood pressure, and make sure you have eaten a healthy breakfast and drunk two glasses of water.',
    translation:
      'Chào mừng bạn đến với ngày hội hiến máu thứ Bảy! Đây là lần đầu bạn tham gia hiến máu phải không? Vâng, thú thật là tôi hơi hồi hộp một chút. Đừng lo—các điều dưỡng của chúng tôi rất nhẹ nhàng, và quá trình lấy máu chỉ mất 10 phút thôi. Trước tiên, hãy kiểm tra lượng sắt và huyết áp của bạn, đồng thời đảm bảo bạn đã ăn sáng đầy đủ và uống hai cốc nước nhé.',
    keyPhrases: [
      { en: 'blood drive', vi: 'chiến dịch hiến máu' },
      { en: 'iron level', vi: 'chỉ số sắt trong máu' },
      { en: 'blood pressure', vi: 'huyết áp' },
    ],
    question: {
      q: 'How long does the actual blood donation take?',
      options: ['Only ten minutes', 'Thirty minutes', 'One hour'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-191',
    level: 'B1',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 191: Bác sĩ giải thích kết quả kiểm tra cholesterol định kỳ',
    sourceStyle: 'VOA • Health & Finance',
    transcript:
      'Your annual check-up results look solid overall, though your cholesterol levels sit slightly above the ideal range. Fortunately, you do not need medication right now; simple lifestyle changes over the next three months can bring those numbers back down. Try replacing fried snacks with nuts, adding oatmeal for breakfast, and briskly cycling or jogging four times a week.',
    translation:
      'Kết quả khám sức khỏe tổng quát hàng năm của bạn nhìn chung rất tốt, mặc dù chỉ số cholesterol hơi cao hơn mức lý tưởng một chút. May mắn là hiện tại bạn chưa cần dùng thuốc; những thay đổi lối sống đơn giản trong ba tháng tới có thể đưa các chỉ số đó trở lại bình thường. Hãy thử thay đồ ăn vặt chiên rán bằng các loại hạt, thêm yến mạch vào bữa sáng, và đạp xe nhanh hoặc chạy bộ bốn lần một tuần.',
    keyPhrases: [
      { en: 'annual check-up', vi: 'khám sức khỏe định kỳ hàng năm' },
      { en: 'cholesterol levels', vi: 'chỉ số cholesterol' },
      { en: 'lifestyle changes', vi: 'thay đổi lối sống' },
    ],
    question: {
      q: 'What does the doctor advise instead of prescribing medication?',
      options: ['Surgery next month', 'Stopping all breakfast meals', 'Diet adjustments and exercising four times a week'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-192',
    level: 'B1',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 192: Hướng dẫn tập vật lý trị liệu phục hồi khớp vai',
    sourceStyle: 'British Council • Physical Therapy',
    transcript:
      'Since removing your arm sling last week, stiffness in the shoulder joint is completely normal. This week, our goal is restoring full upward movement without triggering sharp pain. Practice these gentle resistance band stretches for fifteen minutes every morning, and apply a warm towel beforehand to relax tight muscles. Let me know immediately if any exercise causes tingling in your fingers.',
    translation:
      'Kể từ khi tháo đai treo tay tuần trước, cảm giác cứng ở khớp vai là hoàn toàn bình thường. Tuần này, mục tiêu của chúng ta là khôi phục biên độ vận động giơ tay lên hoàn toàn mà không gây đau nhói. Hãy tập các bài kéo giãn nhẹ với dây kháng lực này trong 15 phút mỗi sáng, và chườm khăn ấm trước khi tập để làm mềm các cơ bị căng. Hãy báo ngay cho tôi biết nếu bài tập nào gây tê râm ran ở các ngón tay nhé.',
    keyPhrases: [
      { en: 'shoulder joint', vi: 'khớp vai' },
      { en: 'resistance band stretches', vi: 'bài tập kéo giãn với dây kháng lực' },
      { en: 'relax tight muscles', vi: 'thư giãn các bó cơ bị căng' },
    ],
    question: {
      q: 'Why should the patient apply a warm towel before stretching?',
      options: ['To reduce skin swelling', 'To relax tight muscles', 'To numb finger tingling'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-193',
    level: 'B1',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 193: Nhận biết dấu hiệu kiệt sức tinh thần ở dân văn phòng',
    sourceStyle: 'BBC • Mental Wellbeing',
    transcript:
      'Burnout rarely happens overnight; rather, it builds up gradually when heavy workloads leave no room for recovery. Common warning signs include constant exhaustion, irritability over minor tasks, and trouble concentrating even after sleeping. Taking short screen-free breaks, muting work notifications after evening hours, and talking openly with managers about realistic deadlines protect both health and long-term productivity.',
    translation:
      'Tình trạng kiệt sức hiếm khi xảy ra chỉ sau một đêm; thay vào đó, nó tích tụ dần khi khối lượng công việc nặng nề không để lại khoảng trống để hồi phục. Những dấu hiệu cảnh báo phổ biến gồm mệt mỏi triền miên, dễ cáu gắt với các việc nhỏ nhặt và khó tập trung ngay cả khi đã ngủ đủ. Nghỉ giải lao ngắn không nhìn màn hình, tắt thông báo công việc sau giờ tối và trao đổi thẳng thắn với quản lý về hạn chót hợp lý giúp bảo vệ cả sức khỏe lẫn năng suất lâu dài.',
    keyPhrases: [
      { en: 'warning signs', vi: 'các dấu hiệu cảnh báo' },
      { en: 'screen-free breaks', vi: 'giờ nghỉ không dùng màn hình' },
      { en: 'long-term productivity', vi: 'năng suất làm việc dài hạn' },
    ],
    question: {
      q: 'Which symptom is mentioned as a warning sign of burnout?',
      options: ['Trouble concentrating even after sleeping', 'Sudden fever', 'Increased appetite'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-194',
    level: 'B1',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 194: Khám bệnh từ xa qua ứng dụng y tế trực tuyến',
    sourceStyle: 'VOA • Digital Healthcare',
    transcript:
      'Good morning, Mr. Hung. Thanks for uploading your home blood pressure readings before our video consultation. Your morning numbers have stayed steady all month, which tells me the lower dose is working smoothly. Rather than making you commute across town for a routine visit, I will send an electronic prescription directly to your neighborhood pharmacy for pickup this afternoon.',
    translation:
      'Chào buổi sáng anh Hùng. Cảm ơn anh đã tải lên các chỉ số đo huyết áp tại nhà trước buổi tư vấn qua video của chúng ta. Chỉ số buổi sáng của anh duy trì ổn định suốt cả tháng, điều đó cho thấy liều thuốc thấp hơn đang phát huy tác dụng tốt. Thay vì để anh phải di chuyển xuyên thành phố cho một buổi tái khám định kỳ, tôi sẽ gửi đơn thuốc điện tử thẳng tới nhà thuốc gần nhà để anh lấy vào chiều nay.',
    keyPhrases: [
      { en: 'video consultation', vi: 'buổi tư vấn khám qua video' },
      { en: 'stayed steady', vi: 'duy trì ổn định' },
      { en: 'electronic prescription', vi: 'đơn thuốc điện tử' },
    ],
    question: {
      q: 'How will Mr. Hung get his medicine?',
      options: ['By visiting the hospital clinic', 'By mail next week', 'At his neighborhood pharmacy via electronic prescription'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-195',
    level: 'B1',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 195: Chiến dịch tiêm vắc xin phòng cúm trước mùa lạnh',
    sourceStyle: 'BBC • Public Health Update',
    transcript:
      'As autumn temperatures begin to drop, local clinics are urging seniors and healthcare staff to schedule their annual flu vaccination. Because circulating flu strains mutate slightly each year, getting updated protection every October lowers the risk of severe lung complications by nearly half. Community health centers are offering free walk-in appointments every Saturday morning throughout this month.',
    translation:
      'Khi nhiệt độ mùa thu bắt đầu giảm xuống, các phòng khám địa phương đang khuyến khích người cao tuổi và nhân viên y tế đặt lịch tiêm vắc xin cúm hàng năm. Vì các chủng virus cúm lưu hành biến đổi nhẹ mỗi năm, việc tiêm phòng cập nhật vào mỗi tháng Mười giúp giảm gần một nửa nguy cơ biến chứng phổi nghiêm trọng. Các trạm y tế cộng đồng đang mở lịch tiêm miễn phí không cần hẹn trước vào mỗi sáng thứ Bảy suốt tháng này.',
    keyPhrases: [
      { en: 'annual flu vaccination', vi: 'tiêm phòng cúm hàng năm' },
      { en: 'severe lung complications', vi: 'biến chứng phổi nghiêm trọng' },
      { en: 'walk-in appointments', vi: 'tiếp nhận khám không cần hẹn trước' },
    ],
    question: {
      q: 'Why do people need an updated flu vaccine every year?',
      options: ['Old vaccines expire after one month', 'Circulating flu strains mutate slightly each year', 'Clinics require it for winter travel'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-196',
    level: 'B2',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 196: Bảo vệ cột sống thắt lưng khi ngồi làm việc lâu',
    sourceStyle: 'British Council • Workplace Ergonomics',
    transcript:
      'Prolonged sitting places surprising compressive pressure on the lower spine, particularly when laptop screens sit too low and pull the neck forward. Physical therapists recommend positioning the top of your monitor at eye level while keeping both feet flat on the floor. Equally important, alternating between sitting and standing for five minutes every half hour reactivates core muscles and prevents chronic lumbar stiffness.',
    translation:
      'Việc ngồi lâu tạo ra áp lực nén đáng ngạc nhiên lên vùng cột sống thắt lưng, đặc biệt khi màn hình laptop đặt quá thấp khiến cổ bị kéo chúi về phía trước. Các chuyên gia vật lý trị liệu khuyên nên đặt mép trên màn hình ngang tầm mắt trong khi hai bàn chân đặt phẳng trên sàn. Quan trọng không kém, việc luân phiên giữa ngồi và đứng năm phút sau mỗi nửa giờ giúp kích hoạt lại nhóm cơ lõi và ngăn ngừa tình trạng cứng thắt lưng mãn tính.',
    keyPhrases: [
      { en: 'prolonged sitting', vi: 'việc ngồi liên tục kéo dài' },
      { en: 'at eye level', vi: 'ngang tầm mắt' },
      { en: 'chronic lumbar stiffness', vi: 'cứng vùng thắt lưng mãn tính' },
    ],
    question: {
      q: 'How often do therapists suggest standing up to prevent stiffness?',
      options: ['Five minutes every half hour', 'Once every two hours', 'Only during lunch break'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-197',
    level: 'B2',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 197: Giải quyết hồ sơ bồi thường bảo hiểm chi phí nằm viện',
    sourceStyle: 'VOA • Health & Finance',
    transcript:
      'When submitting a hospital reimbursement claim, missing a single itemized invoice frequently triggers weeks of avoidable processing delays. Under our comprehensive policy, diagnostic scans performed at partner clinics are settled directly, whereas out-of-network emergency visits are reimbursed at eighty percent. Please upload both the discharge summary and stamped payment receipts through our mobile portal within thirty days of treatment.',
    translation:
      'Khi nộp hồ sơ yêu cầu hoàn trả viện phí, việc thiếu dù chỉ một hóa đơn kê chi tiết thường dẫn đến nhiều tuần chậm trễ xử lý vốn có thể tránh được. Theo hợp đồng bảo hiểm toàn diện của chúng tôi, các xét nghiệm chẩn đoán thực hiện tại phòng khám liên kết sẽ được thanh toán trực tiếp, trong khi các ca cấp cứu ngoài hệ thống được bồi hoàn 80 phần trăm. Vui lòng tải lên cả giấy ra viện và biên lai thanh toán có đóng dấu qua cổng ứng dụng di động trong vòng 30 ngày kể từ ngày điều trị.',
    keyPhrases: [
      { en: 'itemized invoice', vi: 'hóa đơn kê chi tiết từng mục' },
      { en: 'out-of-network emergency visits', vi: 'các ca cấp cứu ngoài mạng lưới liên kết' },
      { en: 'discharge summary', vi: 'tóm tắt hồ sơ ra viện' },
    ],
    question: {
      q: 'What percentage is reimbursed for out-of-network emergency visits?',
      options: ['Fifty percent', 'One hundred percent', 'Eighty percent'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-198',
    level: 'B2',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 198: Dinh dưỡng dựa trên chỉ số đường huyết của thực phẩm',
    sourceStyle: 'BBC • Nutrition Science',
    transcript:
      'Understanding how carbohydrates affect blood glucose helps explain why afternoon energy crashes happen after certain lunches. Refined white pastries release sugar rapidly into the bloodstream, triggering a sharp insulin spike followed by sudden fatigue an hour later. By contrast, pairing whole grains, legumes, and healthy fats slows digestion smoothly, sustaining mental alertness throughout demanding afternoon meetings.',
    translation:
      'Hiểu cách tinh bột tác động đến đường huyết giúp giải thích vì sao tình trạng tụt năng lượng buổi chiều thường xảy ra sau một số bữa trưa nhất định. Bánh ngọt làm từ bột tinh chế giải phóng đường rất nhanh vào máu, kích hoạt đợt tăng insulin đột ngột và kéo theo cơn mệt mỏi bất ngờ một giờ sau đó. Ngược lại, việc kết hợp ngũ cốc nguyên hạt, các loại đậu và chất béo lành mạnh làm chậm quá trình tiêu hóa một cách êm dịu, duy trì sự tỉnh táo trí óc suốt các cuộc họp chiều căng thẳng.',
    keyPhrases: [
      { en: 'energy crashes', vi: 'tình trạng tụt năng lượng đột ngột' },
      { en: 'sharp insulin spike', vi: 'đợt tăng vọt insulin đột ngột' },
      { en: 'mental alertness', vi: 'sự tỉnh táo tinh thần' },
    ],
    question: {
      q: 'Why do refined white pastries often lead to sudden fatigue?',
      options: ['They lack enough sodium', 'They release sugar rapidly and cause an insulin spike', 'They take six hours to digest'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-199',
    level: 'B2',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 199: Vai trò của tầm soát định kỳ trong phát hiện bệnh sớm',
    sourceStyle: 'VOA • Preventive Medicine',
    transcript:
      'Too often, busy adults postpone routine medical screenings simply because they feel completely healthy on the surface. Yet silent conditions such as elevated blood pressure or early metabolic shifts rarely produce noticeable symptoms during their most treatable stages. Public health data consistently demonstrates that preventive screening lowers long-term hospitalization expenses while preserving a significantly higher quality of life.',
    translation:
      'Quá thường xuyên, những người trưởng thành bận rộn trì hoãn các buổi tầm soát y khoa định kỳ chỉ vì bề ngoài họ cảm thấy hoàn toàn khỏe mạnh. Thế nhưng những tình trạng âm thầm như tăng huyết áp hoặc biến đổi chuyển hóa giai đoạn đầu hiếm khi bộc lộ triệu chứng rõ rệt trong giai đoạn dễ điều trị nhất. Dữ liệu y tế cộng đồng nhất quán chứng minh rằng tầm soát dự phòng giúp giảm chi phí nhập viện dài hạn đồng thời bảo toàn chất lượng cuộc sống cao hơn đáng kể.',
    keyPhrases: [
      { en: 'routine medical screenings', vi: 'tầm soát y khoa định kỳ' },
      { en: 'noticeable symptoms', vi: 'triệu chứng dễ nhận thấy' },
      { en: 'preventive screening', vi: 'sàng lọc phòng ngừa bệnh' },
    ],
    question: {
      q: 'Why do many busy adults delay routine medical screenings?',
      options: ['Clinics refuse preventive visits', 'Screenings always require hospital stays', 'They feel healthy and notice no symptoms'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-200',
    level: 'B2',
    category: 'Y tế & Sức khỏe',
    title: 'Bài 200: Điều hòa căng thẳng mãn tính qua bài tập thở và chánh niệm',
    sourceStyle: 'BBC • Mind & Body Research',
    transcript:
      'Chronic workplace anxiety keeps the nervous system locked in a constant threat response, elevating stress hormones like cortisol well into the evening. Clinical trials show that just ten minutes of paced breathing—inhaling slowly for four seconds and exhaling for six—activates the body’s calming pathway. Practiced daily, mindful awareness trains individuals to notice tense thoughts objectively rather than reacting impulsively.',
    translation:
      'Lo âu mãn tính tại nơi làm việc giữ hệ thần kinh mắc kẹt trong trạng thái phản ứng cảnh giác liên tục, khiến các hormone căng thẳng như cortisol tăng cao tới tận buổi tối. Các thử nghiệm lâm sàng cho thấy chỉ 10 phút thở điều tiết—hít vào chậm trong bốn giây và thở ra trong sáu giây—sẽ kích hoạt cơ chế làm dịu của cơ thể. Khi thực hành mỗi ngày, sự nhận biết chánh niệm rèn luyện con người quan sát những suy nghĩ căng thẳng một cách khách quan thay vì phản ứng bốc đồng.',
    keyPhrases: [
      { en: 'nervous system', vi: 'hệ thần kinh' },
      { en: 'paced breathing', vi: 'hít thở điều tiết theo nhịp' },
      { en: 'reacting impulsively', vi: 'phản ứng bốc đồng' },
    ],
    question: {
      q: 'What breathing rhythm is described in the clinical trials?',
      options: ['Inhale for six seconds, hold for ten', 'Inhale for four seconds, exhale for six', 'Fast breathing for two minutes'],
      correctIdx: 1,
    },
  },

  // =====================================================================
  // 9. TÀI CHÍNH & LOGISTICS (lr-201 .. lr-220) — 5 A1, 5 A2, 5 B1, 5 B2
  // =====================================================================
  {
    id: 'lr-201',
    level: 'A1',
    category: 'Tài chính & Logistics',
    title: 'Bài 201: Gửi bưu kiện chuyển phát nhanh tại bưu cục',
    sourceStyle: 'British Council • Everyday Services',
    transcript:
      'Hello, I need to send this small box to Da Nang today. Please place it on the scale so I can weigh it—it weighs two kilograms. Would you prefer standard mail or express delivery? Express delivery, please, because I want it to arrive in two days for five dollars.',
    translation:
      'Xin chào, hôm nay tôi cần gửi chiếc hộp nhỏ này đi Đà Nẵng. Vui lòng đặt nó lên cân để tôi cân thử—hộp nặng hai ki-lô-gam. Bạn muốn chọn thư thường hay chuyển phát nhanh? Chuyển phát nhanh giúp tôi nhé, vì tôi muốn hàng tới nơi sau hai ngày với giá năm đô la.',
    keyPhrases: [
      { en: 'place it on the scale', vi: 'đặt nó lên cân' },
      { en: 'express delivery', vi: 'chuyển phát nhanh' },
      { en: 'arrive in two days', vi: 'tới nơi sau hai ngày' },
    ],
    question: {
      q: 'How long will express delivery take?',
      options: ['Two days', 'Five days', 'One week'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-202',
    level: 'A1',
    category: 'Tài chính & Logistics',
    title: 'Bài 202: Hỏi mã theo dõi kiện hàng đang vận chuyển',
    sourceStyle: 'VOA • Delivery Updates',
    transcript:
      'Good morning, Swift Delivery speaking—how can I help you today? Hi, I want to check when my package will arrive, and my tracking number is VN four-eight-two-one. Thank you for sharing that code! Our driver already has your box and will call you around four PM.',
    translation:
      'Chào buổi sáng, Giao hàng Swift xin nghe—hôm nay tôi có thể giúp gì cho bạn? Chào bạn, tôi muốn kiểm tra khi nào kiện hàng của tôi tới, và mã theo dõi đơn hàng của tôi là VN bốn-tám-hai-một. Cảm ơn bạn đã cung cấp mã đó! Tài xế của chúng tôi đang giữ kiện hàng và sẽ gọi cho bạn vào khoảng 4 giờ chiều.',
    keyPhrases: [
      { en: 'check when my package will arrive', vi: 'kiểm tra khi nào kiện hàng tới' },
      { en: 'tracking number', vi: 'mã theo dõi đơn hàng / mã vận đơn' },
      { en: 'call you around', vi: 'gọi cho bạn vào khoảng' },
    ],
    question: {
      q: 'Who currently has the package?',
      options: ['The airport office', 'The warehouse clerk', 'The delivery driver'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-203',
    level: 'A1',
    category: 'Tài chính & Logistics',
    title: 'Bài 203: Đổi ngoại tệ tại quầy ngân hàng sân bay',
    sourceStyle: 'BBC Learning English • Travel Money',
    transcript:
      'Excuse me, I would like to change two hundred US dollars into Vietnamese dong. Of course, may I see your passport first? Here is my passport right here. Today’s exchange rate has zero extra service fee, so please count your cash carefully before leaving.',
    translation:
      'Xin lỗi, tôi muốn đổi 200 đô la Mỹ sang tiền Việt Nam đồng. Tất nhiên rồi, tôi có thể xem hộ chiếu của bạn trước không? Hộ chiếu của tôi đây ạ. Tỷ giá hôm nay không mất thêm phí dịch vụ nào, nên vui lòng đếm kỹ tiền mặt trước khi rời quầy nhé.',
    keyPhrases: [
      { en: 'exchange rate', vi: 'tỷ giá hối đoái' },
      { en: 'service fee', vi: 'phí dịch vụ' },
      { en: 'count your cash', vi: 'đếm tiền mặt của bạn' },
    ],
    question: {
      q: 'What document does the clerk ask to see first?',
      options: ['A flight ticket', 'A passport', 'A credit card'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-204',
    level: 'A1',
    category: 'Tài chính & Logistics',
    title: 'Bài 204: Mở tài khoản tiết kiệm cơ bản tại ngân hàng',
    sourceStyle: 'British Council • Banking Basics',
    transcript:
      'Hello, I want to open a basic savings account with your bank today! Happy to help with that—do you have your national ID card with you? Yes, I brought my card right here in my wallet. Our savings plan needs a minimum deposit of fifty dollars, and you can check your balance anytime on our phone app.',
    translation:
      'Xin chào, hôm nay tôi muốn mở một tài khoản tiết kiệm cơ bản tại ngân hàng của bạn! Rất vui được hỗ trợ—bạn có mang theo căn cước công dân không? Có, tôi có mang thẻ ngay trong ví đây. Gói tiết kiệm của chúng tôi yêu cầu số tiền gửi tối thiểu là 50 đô la, và bạn có thể kiểm tra số dư bất cứ lúc nào trên ứng dụng điện thoại.',
    keyPhrases: [
      { en: 'basic savings account', vi: 'tài khoản tiết kiệm cơ bản' },
      { en: 'minimum deposit', vi: 'số tiền gửi tối thiểu' },
      { en: 'check your balance', vi: 'kiểm tra số dư tài khoản' },
    ],
    question: {
      q: 'What is the minimum deposit needed to open the savings account?',
      options: ['Fifty dollars', 'Fifteen dollars', 'Five hundred dollars'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-205',
    level: 'A1',
    category: 'Tài chính & Logistics',
    title: 'Bài 205: Đóng gói hàng thủy tinh dễ vỡ trong kho',
    sourceStyle: 'VOA • Warehouse Packing',
    transcript:
      'Team, please handle these glass coffee jars very carefully today. Wrap every single jar in thick bubble wrap before putting it inside a strong cardboard box. Also, stick a bright red fragile label on the top and sides so drivers load them gently.',
    translation:
      'Cả nhóm ơi, hôm nay vui lòng xử lý những hũ cà phê thủy tinh này thật cẩn thận nhé. Hãy bọc từng hũ một bằng màng xốp hơi dày trước khi xếp vào thùng các-tông cứng. Ngoài ra, dán nhãn hàng dễ vỡ màu đỏ nổi bật ở mặt trên và các cạnh để tài xế bốc xếp nhẹ nhàng.',
    keyPhrases: [
      { en: 'bubble wrap', vi: 'màng xốp hơi chống sốc' },
      { en: 'cardboard box', vi: 'thùng bìa các-tông' },
      { en: 'fragile label', vi: 'nhãn cảnh báo hàng dễ vỡ' },
    ],
    question: {
      q: 'Where should the red fragile labels be placed?',
      options: ['Inside the glass jars', 'Only on the truck door', 'On the top and sides of the box'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-206',
    level: 'A2',
    category: 'Tài chính & Logistics',
    title: 'Bài 206: Nhắc thanh toán hóa đơn công nợ bị quá hạn',
    sourceStyle: 'British Council • Office Accounting',
    transcript:
      'Good afternoon, Mr. Long. This is Kelly from Pacific Paper Finance calling about invoice number four-one-nine from last month. According to our records, the balance of eight hundred dollars was due five days ago. Could you check with your accounts team whether the bank transfer was sent, or would you like me to resend the PDF invoice?',
    translation:
      'Chào buổi chiều anh Long. Tôi là Kelly từ phòng Tài chính của Pacific Paper gọi về hóa đơn số 419 từ tháng trước. Theo sổ sách của chúng tôi, khoản tiền 800 đô la đã đến hạn thanh toán cách đây năm ngày. Anh có thể kiểm tra với bộ phận kế toán xem lệnh chuyển khoản đã được gửi chưa, hoặc anh có muốn tôi gửi lại hóa đơn PDF không?',
    keyPhrases: [
      { en: 'according to our records', vi: 'theo hồ sơ ghi nhận của chúng tôi' },
      { en: 'due five days ago', vi: 'đến hạn cách đây năm ngày' },
      { en: 'bank transfer', vi: 'chuyển khoản ngân hàng' },
    ],
    question: {
      q: 'Why is Kelly calling Mr. Long?',
      options: ['To cancel a paper order', 'To follow up on an overdue invoice', 'To lower the monthly price'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-207',
    level: 'A2',
    category: 'Tài chính & Logistics',
    title: 'Bài 207: Kiểm đếm hàng nhập kho bằng máy quét mã vạch',
    sourceStyle: 'BBC • Warehouse Operations',
    transcript:
      'Attention dock staff: a truck carrying forty pallets of winter coats just arrived at Loading Bay Three. Before moving anything onto the high shelves, please inspect the outer cartons for water damage and count every box. Then scan each barcode with your handheld device so our stock system updates accurately before noon.',
    translation:
      'Chú ý nhân viên bến bãi: một xe tải chở 40 kiện pallet áo khoác mùa đông vừa cập Cổng bốc dỡ số Ba. Trước khi chuyển hàng lên kệ cao, vui lòng kiểm tra vỏ thùng bên ngoài xem có bị thấm nước không và đếm đủ từng hộp. Sau đó quét từng mã vạch bằng thiết bị cầm tay để hệ thống tồn kho cập nhật chính xác trước buổi trưa.',
    keyPhrases: [
      { en: 'loading bay', vi: 'cổng bốc dỡ hàng hóa' },
      { en: 'water damage', vi: 'hư hại do thấm nước' },
      { en: 'scan each barcode', vi: 'quét từng mã vạch' },
    ],
    question: {
      q: 'What should staff check before moving boxes onto the high shelves?',
      options: ['Water damage and box counts', 'Customer email addresses', 'Fuel receipts'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-208',
    level: 'A2',
    category: 'Tài chính & Logistics',
    title: 'Bài 208: Hướng dẫn chuyển khoản quốc tế và phí giao dịch',
    sourceStyle: 'VOA • Banking Services',
    transcript:
      'I need to pay an overseas supplier in Singapore by Friday. Should I use an international wire transfer? Yes, that is the safest method for business payments. Please bring their bank account number, SWIFT code, and invoice copy. Our transfer fee is twenty dollars, and the funds usually arrive within two to three working days.',
    translation:
      'Tôi cần thanh toán cho một nhà cung cấp ở nước ngoài tại Singapore trước thứ Sáu. Tôi có nên dùng chuyển tiền điện tử quốc tế không? Có, đó là phương thức an toàn nhất cho các khoản thanh toán doanh nghiệp. Vui lòng mang theo số tài khoản ngân hàng của họ, mã SWIFT và bản sao hóa đơn. Phí chuyển tiền của chúng tôi là 20 đô la, và tiền thường tới nơi trong vòng hai đến ba ngày làm việc.',
    keyPhrases: [
      { en: 'international wire transfer', vi: 'chuyển khoản quốc tế' },
      { en: 'transfer fee', vi: 'phí chuyển tiền' },
      { en: 'working days', vi: 'ngày làm việc' },
    ],
    question: {
      q: 'How long does the international transfer usually take to arrive?',
      options: ['One hour', 'Seven business days', 'Two to three working days'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-209',
    level: 'A2',
    category: 'Tài chính & Logistics',
    title: 'Bài 209: Sắp xếp tuyến xe giao hàng tiết kiệm nhiên liệu',
    sourceStyle: 'British Council • Delivery Dispatch',
    transcript:
      'Morning drivers, we adjusted today’s delivery routes to cut down wasted fuel and traffic delays. Instead of crossing the city twice, Truck One will cover all twelve shops in the northern district before lunch. Truck Two will handle southern stops along the ring road, where morning highway traffic moves smoothly.',
    translation:
      'Chào buổi sáng các bác tài, hôm nay chúng tôi đã điều chỉnh các tuyến giao hàng để giảm lượng nhiên liệu lãng phí và tránh kẹt xe. Thay vì phải chạy xuyên thành phố hai lượt, Xe số Một sẽ giao trọn 12 cửa hàng ở quận phía Bắc trước giờ trưa. Xe số Hai sẽ phụ trách các điểm phía Nam dọc đường vành đai, nơi giao thông buổi sáng di chuyển thông thoáng.',
    keyPhrases: [
      { en: 'delivery routes', vi: 'tuyến đường giao hàng' },
      { en: 'wasted fuel', vi: 'nhiên liệu bị lãng phí' },
      { en: 'traffic delays', vi: 'chậm trễ do kẹt xe' },
    ],
    question: {
      q: 'Why were the delivery routes adjusted?',
      options: ['One truck broke down', 'To save fuel and reduce traffic delays', 'To skip northern shops'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-210',
    level: 'A2',
    category: 'Tài chính & Logistics',
    title: 'Bài 210: Khóa thẻ ghi nợ bị mất qua tổng đài khẩn cấp',
    sourceStyle: 'BBC Learning English • Card Security',
    transcript:
      'Hello, emergency card support—I think I dropped my debit card at a train station ten minutes ago. Stay calm, I can freeze your card right now once I verify your full name and birth date. Let me confirm both details for you right now. Done, your old card is blocked and we will mail a replacement card within four days.',
    translation:
      'Xin chào, tổng đài hỗ trợ thẻ khẩn cấp đây—tôi nghĩ mình vừa làm rơi thẻ ghi nợ ở ga tàu mười phút trước. Hãy bình tĩnh, tôi có thể khóa thẻ của bạn ngay bây giờ sau khi xác minh họ tên đầy đủ và ngày sinh của bạn. Để tôi xác nhận cả hai thông tin đó ngay bây giờ. Xong rồi, thẻ cũ đã bị khóa và chúng tôi sẽ gửi thẻ thay thế qua bưu điện trong vòng bốn ngày.',
    keyPhrases: [
      { en: 'debit card', vi: 'thẻ ghi nợ' },
      { en: 'freeze your card', vi: 'khóa thẻ của bạn' },
      { en: 'replacement card', vi: 'thẻ cấp lại thay thế' },
    ],
    question: {
      q: 'When will the customer receive a replacement card?',
      options: ['Within four days', 'In one hour', 'Next month'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-211',
    level: 'B1',
    category: 'Tài chính & Logistics',
    title: 'Bài 211: Xử lý lô hàng xuất khẩu bị giữ lại tại hải quan cảng',
    sourceStyle: 'VOA • Global Trade & Shipping',
    transcript:
      'Hi David, I have an urgent update regarding container number eight-four-two bound for Rotterdam. Customs officers placed a temporary hold on the shipment because the certificate of origin lacked an official chamber stamp. Our export broker is obtaining the corrected document this afternoon, which should clear the cargo by tomorrow morning and avoid extra port storage fees.',
    translation:
      'Chào David, tôi có thông tin cập nhật khẩn về công-ten-nơ số 842 đi cảng Rotterdam. Hải quan đã tạm giữ lô hàng vì giấy chứng nhận xuất xứ thiếu con dấu xác nhận chính thức của phòng thương mại. Đại lý xuất khẩu của chúng ta đang xin cấp lại chứng từ đúng vào chiều nay, việc này sẽ giúp thông quan hàng vào sáng mai và tránh phát sinh thêm phí lưu bãi tại cảng.',
    keyPhrases: [
      { en: 'temporary hold', vi: 'tạm giữ hàng hóa' },
      { en: 'certificate of origin', vi: 'giấy chứng nhận xuất xứ (C/O)' },
      { en: 'port storage fees', vi: 'phí lưu kho bãi tại cảng' },
    ],
    question: {
      q: 'Why was the container temporarily held at customs?',
      options: ['The ship arrived late', 'The cargo exceeded weight limits', 'The certificate of origin missed an official stamp'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-212',
    level: 'B1',
    category: 'Tài chính & Logistics',
    title: 'Bài 212: Kế hoạch cắt giảm chi phí vận hành trong quý ba',
    sourceStyle: 'BBC • Corporate Finance',
    transcript:
      'To keep our operating budget balanced ahead of next quarter, our finance committee reviewed discretionary expenses across every branch. Rather than cutting staff training, we propose canceling unused software subscriptions and consolidating three regional couriers into one national carrier. Together, those two adjustments will trim monthly overhead by nearly twelve percent without affecting service quality.',
    translation:
      'Để giữ ngân sách vận hành cân đối trước quý tới, ủy ban tài chính đã rà soát các khoản chi không cố định ở mọi chi nhánh. Thay vì cắt giảm ngân sách đào tạo nhân viên, chúng tôi đề xuất hủy các gói phần mềm không dùng tới và gộp ba đơn vị chuyển phát khu vực thành một nhà vận chuyển toàn quốc. Kết hợp lại, hai điều chỉnh đó sẽ giảm chi phí gián tiếp hàng tháng gần 12 phần trăm mà không ảnh hưởng chất lượng dịch vụ.',
    keyPhrases: [
      { en: 'operating budget', vi: 'ngân sách vận hành' },
      { en: 'unused software subscriptions', vi: 'các gói phần mềm không sử dụng' },
      { en: 'monthly overhead', vi: 'chi phí vận hành gián tiếp hàng tháng' },
    ],
    question: {
      q: 'What did the finance committee decide NOT to cut?',
      options: ['Unused software licenses', 'Regional couriers', 'Staff training'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-213',
    level: 'B1',
    category: 'Tài chính & Logistics',
    title: 'Bài 213: So sánh báo giá cước vận tải biển và hàng không',
    sourceStyle: 'British Council • Freight Procurement',
    transcript:
      'We received two shipping quotes for bringing five hundred electronic sensors from Seoul before our factory assembly starts. Ocean freight is remarkably affordable at nine hundred dollars, yet transit takes sixteen days including port clearance. Air cargo costs nearly triple that amount, so if we ship one hundred urgent units by air and send the rest by sea, we stay on schedule under budget.',
    translation:
      'Chúng ta đã nhận được hai báo giá vận chuyển cho 500 cảm biến điện tử từ Seoul trước khi dây chuyền lắp ráp nhà máy khởi động. Vận tải đường biển có mức giá rất dễ chịu là 900 đô la, nhưng thời gian vận chuyển mất 16 ngày tính cả thông quan. Hàng không đắt gấp gần ba lần, vì vậy nếu gửi 100 chiếc gấp bằng đường bay và phần còn lại đi đường biển, chúng ta vừa kịp tiến độ vừa đúng ngân sách.',
    keyPhrases: [
      { en: 'shipping quotes', vi: 'báo giá vận chuyển' },
      { en: 'ocean freight', vi: 'vận tải đường biển' },
      { en: 'under budget', vi: 'trong hạn mức ngân sách' },
    ],
    question: {
      q: 'What split-shipping plan is suggested to stay on schedule and under budget?',
      options: ['Send 100 urgent units by air and the rest by sea', 'Send everything by air', 'Delay factory assembly by sixteen days'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-214',
    level: 'B1',
    category: 'Tài chính & Logistics',
    title: 'Bài 214: Giám sát chuỗi cung ứng lạnh cho nông sản tươi sống',
    sourceStyle: 'VOA • Health & Finance',
    transcript:
      'Transporting fresh dairy and berries across long distances requires unbroken cold-chain monitoring from farm to supermarket. Every refrigerated truck now carries wireless temperature sensors that alert dispatchers immediately if cabin cooling rises above four degrees Celsius. Catching cooling glitches within minutes saves entire truckloads from spoiling and prevents costly product shortages on retail shelves.',
    translation:
      'Vận chuyển các sản phẩm sữa tươi và quả mọng đi xa đòi hỏi giám sát chuỗi lạnh không gián đoạn từ nông trại tới siêu thị. Mỗi xe tải đông lạnh nay đều gắn cảm biến nhiệt độ không dây cảnh báo ngay cho điều phối viên nếu nhiệt độ khoang hàng vượt quá bốn độ C. Phát hiện trục trặc làm lạnh chỉ trong vài phút giúp cứu cả chuyến hàng khỏi hư hỏng và tránh tình trạng thiếu hụt hàng hóa tốn kém trên kệ bán lẻ.',
    keyPhrases: [
      { en: 'cold-chain monitoring', vi: 'giám sát chuỗi cung ứng lạnh' },
      { en: 'temperature sensors', vi: 'cảm biến nhiệt độ' },
      { en: 'prevents costly product shortages', vi: 'ngăn thiếu hụt hàng gây tốn kém' },
    ],
    question: {
      q: 'When do the sensors alert dispatchers?',
      options: ['When fuel drops below half', 'If cabin temperature rises above four degrees Celsius', 'Once the truck reaches the farm'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-215',
    level: 'B1',
    category: 'Tài chính & Logistics',
    title: 'Bài 215: Đối chiếu sao kê ngân hàng và phát hiện chi phí trùng lặp',
    sourceStyle: 'BBC • Financial Controls',
    transcript:
      'While completing our monthly bank reconciliation yesterday, I noticed an unusual billing discrepancy on our cloud hosting statement. Our company was charged four hundred fifty dollars twice on March fourteenth under nearly identical reference numbers. I already flagged the duplicate transaction with our vendor’s billing desk, and they confirmed a full credit refund will appear within five business days.',
    translation:
      'Trong lúc hoàn tất đối chiếu sổ sách ngân hàng hàng tháng hôm qua, tôi phát hiện một sai lệch thanh toán bất thường trên bảng sao kê lưu trữ đám mây. Công ty chúng ta bị trừ hai lần số tiền 450 đô la vào ngày 14 tháng Ba dưới hai mã tham chiếu gần giống hệt nhau. Tôi đã báo cáo giao dịch trùng lặp này với bộ phận thu phí của nhà cung cấp và họ xác nhận sẽ hoàn lại toàn bộ số tiền trong vòng năm ngày làm việc.',
    keyPhrases: [
      { en: 'monthly bank reconciliation', vi: 'đối chiếu sao kê ngân hàng hàng tháng' },
      { en: 'billing discrepancy', vi: 'sai lệch trong hóa đơn thanh toán' },
      { en: 'duplicate transaction', vi: 'giao dịch bị trừ trùng lặp' },
    ],
    question: {
      q: 'What error did the bookkeeper find on the March statement?',
      options: ['A four-hundred-fifty-dollar charge billed twice', 'A missing tax receipt', 'An unpaid electric bill'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-216',
    level: 'B2',
    category: 'Tài chính & Logistics',
    title: 'Bài 216: Phòng ngừa rủi ro tỷ giá trong hợp đồng xuất nhập khẩu',
    sourceStyle: 'BBC • International Finance',
    transcript:
      'Because sixty percent of our machinery components are invoiced in euros while local retail sales occur in domestic currency, sharp exchange rate swings can quickly erode profit margins. To stabilize cash flow across upcoming quarters, our treasury team locked in forward currency contracts covering half of next year’s projected imports. Hedging eliminates unwelcome surprises and gives procurement managers predictable unit costs.',
    translation:
      'Do 60 phần trăm linh kiện máy móc của chúng ta được xuất hóa đơn bằng đồng euro trong khi doanh thu bán lẻ thu bằng nội tệ, biến động tỷ giá mạnh có thể nhanh chóng bào mòn biên lợi nhuận. Để ổn định dòng tiền qua các quý sắp tới, bộ phận ngân quỹ đã chốt các hợp đồng tỷ giá kỳ hạn cho một nửa lượng hàng nhập khẩu dự kiến năm sau. Việc phòng vệ rủi ro loại bỏ những biến động bất ngờ và mang lại chi phí đơn vị dễ dự đoán cho đội mua hàng.',
    keyPhrases: [
      { en: 'erode profit margins', vi: 'bào mòn biên lợi nhuận' },
      { en: 'forward currency contracts', vi: 'hợp đồng ngoại tệ kỳ hạn' },
      { en: 'predictable unit costs', vi: 'chi phí đơn vị có thể dự đoán trước' },
    ],
    question: {
      q: 'How is the treasury team protecting profit margins against euro swings?',
      options: ['Raising domestic retail prices weekly', 'Using forward currency contracts for projected imports', 'Switching all sales to cash only'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-217',
    level: 'B2',
    category: 'Tài chính & Logistics',
    title: 'Bài 217: Phân biệt trách nhiệm bảo hiểm theo điều khoản FOB và CIF',
    sourceStyle: 'British Council • International Logistics',
    transcript:
      'When negotiating overseas supply contracts, choosing between FOB and CIF Incoterms significantly shifts who carries transit risk. Under FOB terms, the exporter’s responsibility ends once goods cross the ship’s rail at the departure port, leaving the buyer to arrange freight and marine insurance. Under CIF, the seller pays ocean shipping and baseline insurance to the destination port, though transit risk still transfers at loading.',
    translation:
      'Khi đàm phán hợp đồng cung ứng quốc tế, việc lựa chọn giữa điều khoản Incoterms FOB và CIF thay đổi đáng kể bên nào chịu rủi ro vận chuyển. Theo điều khoản FOB, trách nhiệm của bên xuất khẩu kết thúc ngay khi hàng qua lan can tàu tại cảng đi, còn bên mua tự thu xếp cước tàu và bảo hiểm hàng hải. Theo CIF, bên bán trả cước biển và bảo hiểm cơ bản tới cảng đích, dù rủi ro trên đường đi vẫn chuyển sang người mua lúc xếp hàng lên tàu.',
    keyPhrases: [
      { en: 'carries transit risk', vi: 'chịu rủi ro quá trình vận chuyển' },
      { en: 'departure port', vi: 'cảng xuất phát / cảng đi' },
      { en: 'marine insurance', vi: 'bảo hiểm hàng hải' },
    ],
    question: {
      q: 'Under FOB terms, who arranges ocean freight and marine insurance?',
      options: ['The customs broker', 'The seller', 'The buyer'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-218',
    level: 'B2',
    category: 'Tài chính & Logistics',
    title: 'Bài 218: Tối ưu hóa vòng quay tồn kho bằng dự báo nhu cầu theo mùa',
    sourceStyle: 'VOA • Supply Chain Strategy',
    transcript:
      'Excess inventory ties up working capital in dusty warehouse aisles, whereas stockouts drive impatient shoppers straight toward competitors. By feeding three years of regional weather patterns and promotional calendars into a demand forecasting model, our supply chain team increased inventory turnover by twenty-two percent. Capital previously frozen in slow-moving goods now funds faster replenishment of high-margin seasonal bestsellers.',
    translation:
      'Tồn kho dư thừa làm đọng vốn lưu động trên các dãy kệ kho bám bụi, trong khi hết hàng lại đẩy người mua thiếu kiên nhẫn sang thẳng đối thủ cạnh tranh. Bằng cách đưa dữ liệu thời tiết khu vực và lịch khuyến mãi ba năm vào mô hình dự báo nhu cầu, đội ngũ chuỗi cung ứng đã tăng vòng quay tồn kho thêm 22 phần trăm. Nguồn vốn trước đây bị kẹt trong hàng bán chậm nay được dùng để bổ sung nhanh các mặt hàng bán chạy theo mùa có biên lợi nhuận cao.',
    keyPhrases: [
      { en: 'ties up working capital', vi: 'làm ứ đọng vốn lưu động' },
      { en: 'demand forecasting model', vi: 'mô hình dự báo nhu cầu' },
      { en: 'inventory turnover', vi: 'tốc độ vòng quay hàng tồn kho' },
    ],
    question: {
      q: 'How did the supply chain team boost inventory turnover by twenty-two percent?',
      options: ['By using weather and promotion data in demand forecasting', 'By closing half of their warehouses', 'By offering fifty-percent clearance discounts'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-219',
    level: 'B2',
    category: 'Tài chính & Logistics',
    title: 'Bài 219: Chuẩn bị hồ sơ cho đợt kiểm toán tài chính cuối năm',
    sourceStyle: 'British Council • Audit & Compliance',
    transcript:
      'External auditors arrive next Monday to examine our annual financial statements, so every ledger entry must align cleanly with supporting documentation. Please verify that our fixed asset register accurately reflects retired equipment alongside newly purchased warehouse forklifts. In particular, auditors will sample multi-year service contracts to ensure revenue recognition matches actual milestone completion rather than upfront cash deposits.',
    translation:
      'Kiểm toán viên độc lập sẽ có mặt vào thứ Hai tới để kiểm tra báo cáo tài chính năm, vì vậy mọi bút toán sổ cái phải khớp chính xác với chứng từ gốc. Vui lòng kiểm tra để chắc chắn sổ tài sản cố định phản ánh đúng các thiết bị đã thanh lý cùng xe nâng kho mới mua. Đặc biệt, kiểm toán viên sẽ chọn mẫu các hợp đồng dịch vụ nhiều năm nhằm đảm bảo việc ghi nhận doanh thu khớp với tiến độ hoàn thành thực tế chứ không dựa vào tiền đặt cọc thu trước.',
    keyPhrases: [
      { en: 'supporting documentation', vi: 'chứng từ gốc đối chiếu' },
      { en: 'fixed asset register', vi: 'sổ theo dõi tài sản cố định' },
      { en: 'revenue recognition', vi: 'nguyên tắc ghi nhận doanh thu' },
    ],
    question: {
      q: 'What will auditors check when sampling multi-year service contracts?',
      options: ['That employee overtime was paid in cash', 'That revenue recognition matches milestone completion', 'That warehouse forklifts have valid insurance'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-220',
    level: 'B2',
    category: 'Tài chính & Logistics',
    title: 'Bài 220: Tự động hóa dây chuyền phân loại tại trung tâm logistics',
    sourceStyle: 'BBC • Modern Warehousing',
    transcript:
      'Installing optical barcode scanners along our sorting conveyors has transformed nightly fulfillment capacity across our regional hub. Previously, manual sorting teams struggled during holiday peaks, leading to misrouted parcels and delayed morning dispatches. Today, automated diverter arms route twelve thousand packages per hour with near-perfect accuracy, freeing staff to focus on quality inspections and fragile custom orders.',
    translation:
      'Việc lắp đặt máy quét mã vạch quang học dọc theo băng chuyền phân loại đã thay đổi hoàn toàn năng lực xử lý đơn ban đêm tại trung tâm trung chuyển khu vực. Trước đây, các tổ phân loại thủ công gặp nhiều khó khăn vào mùa cao điểm lễ Tết, dẫn đến nhầm tuyến bưu kiện và xuất kho sáng bị trễ. Ngày nay, cánh tay gạt tự động điều hướng 12 nghìn kiện hàng mỗi giờ với độ chính xác gần như tuyệt đối, giúp nhân viên tập trung kiểm tra chất lượng và xử lý các đơn hàng dễ vỡ đặt riêng.',
    keyPhrases: [
      { en: 'fulfillment capacity', vi: 'năng lực xử lý và hoàn tất đơn hàng' },
      { en: 'misrouted parcels', vi: 'bưu kiện bị chuyển nhầm tuyến' },
      { en: 'near-perfect accuracy', vi: 'độ chính xác gần như tuyệt đối' },
    ],
    question: {
      q: 'What do staff now focus on thanks to automated sorting?',
      options: ['Driving delivery vans overnight', 'Quality inspections and fragile custom orders', 'Manually labeling twelve thousand boxes'],
      correctIdx: 1,
    },
  },

  // =====================================================================
  // 10. GIÁO DỤC & XÃ HỘI (lr-221 .. lr-240) — 5 A1, 5 A2, 5 B1, 5 B2
  // =====================================================================
  {
    id: 'lr-221',
    level: 'A1',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 221: Đăng ký thẻ mượn sách tại thư viện thành phố',
    sourceStyle: 'British Council • Community Spaces',
    transcript:
      'Hello, I would like to make a new library card today. Welcome! It is completely free for city residents. Please fill out this blue card with your name and home address. You can borrow up to five books at one time and keep them for two weeks.',
    translation:
      'Xin chào, hôm nay tôi muốn làm một thẻ thư viện mới. Chào mừng bạn! Thẻ hoàn toàn miễn phí đối với cư dân thành phố. Vui lòng điền họ tên và địa chỉ nhà vào tấm thẻ màu xanh này. Bạn có thể mượn tối đa năm cuốn sách mỗi lần và giữ chúng trong hai tuần.',
    keyPhrases: [
      { en: 'library card', vi: 'thẻ thư viện' },
      { en: 'city residents', vi: 'cư dân thành phố' },
      { en: 'borrow up to five books', vi: 'mượn tối đa năm cuốn sách' },
    ],
    question: {
      q: 'How long can readers keep borrowed books?',
      options: ['Five days', 'Two weeks', 'One month'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-222',
    level: 'A1',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 222: Hỏi lịch học và học phí lớp tiếng Anh buổi tối',
    sourceStyle: 'VOA Learning English • Language Classes',
    transcript:
      'Good afternoon! Do you have beginner English classes in the evening? Yes, we have a class every Tuesday and Thursday from six thirty to eight PM. How much does one month cost? It is forty dollars, and free digital practice sheets are included for every student.',
    translation:
      'Chào buổi chiều! Trung tâm có lớp tiếng Anh cho người mới bắt đầu vào buổi tối không? Có, chúng tôi có lớp vào mỗi tối thứ Ba và thứ Năm từ 6 giờ 30 đến 8 giờ tối. Học phí một tháng là bao nhiêu ạ? Là 40 đô la, và bao gồm sẵn bộ bài tập thực hành kỹ thuật số miễn phí cho mọi học viên.',
    keyPhrases: [
      { en: 'beginner English classes', vi: 'lớp tiếng Anh cho người mới bắt đầu' },
      { en: 'every Tuesday and Thursday', vi: 'mỗi thứ Ba và thứ Năm' },
      { en: 'practice sheets', vi: 'phiếu bài tập thực hành' },
    ],
    question: {
      q: 'When does the evening English class meet?',
      options: ['Monday and Wednesday', 'Saturday mornings', 'Tuesday and Thursday'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-223',
    level: 'A1',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 223: Tham gia dọn dẹp công viên khu phố sáng Chủ nhật',
    sourceStyle: 'BBC • Local Volunteering',
    transcript:
      'Neighbors, join us this Sunday morning at seven AM for our green park cleanup! Please meet by the main lake gate and wear comfortable walking shoes. Our group will provide work gloves, large trash bags, and cold bottles of water. Together we can keep our shared park clean and safe.',
    translation:
      'Bà con hàng xóm ơi, hãy cùng tham gia dọn dẹp công viên xanh vào 7 giờ sáng Chủ nhật tuần này nhé! Vui lòng tập trung tại cổng hồ chính và mang giày đi bộ thoải mái. Nhóm sẽ phát găng tay bảo hộ, túi rác cỡ lớn và nước uống mát lạnh. Cùng nhau, chúng ta có thể giữ cho công viên chung luôn sạch đẹp và an toàn.',
    keyPhrases: [
      { en: 'park cleanup', vi: 'buổi dọn vệ sinh công viên' },
      { en: 'work gloves', vi: 'găng tay làm việc' },
      { en: 'clean and safe', vi: 'sạch sẽ và an toàn' },
    ],
    question: {
      q: 'What should volunteers wear to the park cleanup?',
      options: ['Business suits', 'Raincoats', 'Comfortable walking shoes'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-224',
    level: 'A1',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 224: Quy định phân loại rác tái chế tại chung cư',
    sourceStyle: 'British Council • Green Living',
    transcript:
      'Please help our apartment building recycle properly every day. Put clean newspapers, magazines, and flat cardboard boxes into the blue bin on the ground floor. Empty plastic bottles and aluminum cans belong in the green bin beside it. Remember to rinse food containers quickly before throwing them away.',
    translation:
      'Vui lòng hỗ trợ tòa nhà chung cư của chúng ta phân loại rác đúng cách mỗi ngày. Hãy bỏ báo giấy sạch, tạp chí và hộp các-tông ép phẳng vào thùng màu xanh dương ở tầng trệt. Chai nhựa rỗng và lon nhôm bỏ vào thùng màu xanh lá ngay bên cạnh. Nhớ tráng nhanh hộp đựng thức ăn trước khi vứt bỏ nhé.',
    keyPhrases: [
      { en: 'recycle properly', vi: 'tái chế đúng cách' },
      { en: 'blue bin', vi: 'thùng rác màu xanh dương' },
      { en: 'plastic bottles', vi: 'chai nhựa' },
    ],
    question: {
      q: 'Which items go into the blue bin?',
      options: ['Newspapers, magazines, and cardboard', 'Plastic bottles and cans', 'Wet food scraps'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-225',
    level: 'A1',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 225: Mua vé tháng xe buýt ưu đãi cho sinh viên',
    sourceStyle: 'VOA • City Transit',
    transcript:
      'Excuse me, can I buy a monthly bus pass at this ticket booth? Yes, of course—are you currently a full-time college student? Yes, here is my student ID card right here. With your card, the monthly pass is half price, only twelve dollars for unlimited rides across all city routes.',
    translation:
      'Xin lỗi, tôi có thể mua vé xe buýt tháng tại quầy vé này không? Vâng, tất nhiên rồi—hiện tại bạn có phải là sinh viên đại học chính quy không? Vâng, thẻ sinh viên của tôi ngay đây ạ. Với thẻ sinh viên, vé tháng được giảm một nửa giá, chỉ 12 đô la cho các chuyến đi không giới hạn trên mọi tuyến trong thành phố.',
    keyPhrases: [
      { en: 'monthly bus pass', vi: 'vé xe buýt tháng' },
      { en: 'half price', vi: 'giảm một nửa giá' },
      { en: 'unlimited rides', vi: 'số lượt đi không giới hạn' },
    ],
    question: {
      q: 'How much does the student monthly bus pass cost?',
      options: ['Twelve dollars', 'Twenty-four dollars', 'Six dollars'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-226',
    level: 'A2',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 226: Trao đổi tiến bộ học tập trong buổi họp phụ huynh',
    sourceStyle: 'British Council • School Updates',
    transcript:
      'Thank you for coming to today’s parent-teacher conference, Mrs. An. Your son Minh participates actively in science experiments and always finishes his math homework neatly. Lately, though, he rushes through reading comprehension passages without checking unfamiliar words. Reading one short English story together for fifteen minutes each night will quickly build his confidence.',
    translation:
      'Cảm ơn chị An đã tới buổi họp phụ huynh hôm nay. Bé Minh nhà mình tham gia rất tích cực các thí nghiệm khoa học và luôn làm bài tập toán gọn gàng. Tuy nhiên gần đây con đọc lướt các bài đọc hiểu hơi nhanh mà chưa tra các từ chưa quen. Việc cùng con đọc một truyện tiếng Anh ngắn 15 phút mỗi tối sẽ nhanh chóng giúp con tự tin hơn.',
    keyPhrases: [
      { en: 'parent-teacher conference', vi: 'buổi họp phụ huynh' },
      { en: 'participates actively', vi: 'tham gia tích cực' },
      { en: 'build his confidence', vi: 'xây dựng sự tự tin cho con' },
    ],
    question: {
      q: 'What does the teacher suggest doing for fifteen minutes each night?',
      options: ['Practicing math tables', 'Reading a short English story together', 'Doing extra science projects'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-227',
    level: 'A2',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 227: Thông báo khai giảng câu lạc bộ đọc sách cộng đồng',
    sourceStyle: 'BBC Learning English • Local Clubs',
    transcript:
      'Do you love reading stories and sharing fresh ideas over coffee? Our neighborhood book club welcomes new members on the first Saturday of every month at ten AM in the community center lounge. This month, everyone is reading a short mystery novel available free on our city e-book app. No registration fee is required—just bring your curiosity!',
    translation:
      'Bạn có thích đọc truyện và chia sẻ những ý tưởng mới mẻ bên tách cà phê không? Câu lạc bộ sách khu phố chào đón thành viên mới vào thứ Bảy đầu tiên hàng tháng lúc 10 giờ sáng tại sảnh sinh hoạt trung tâm cộng đồng. Tháng này, mọi người sẽ cùng đọc một tiểu thuyết trinh thám ngắn có sẵn miễn phí trên ứng dụng sách điện tử của thành phố. Không cần đóng phí đăng ký—chỉ cần mang theo niềm đam mê khám phá của bạn!',
    keyPhrases: [
      { en: 'book club', vi: 'câu lạc bộ đọc sách' },
      { en: 'community center', vi: 'trung tâm sinh hoạt cộng đồng' },
      { en: 'no registration fee', vi: 'không thu phí đăng ký' },
    ],
    question: {
      q: 'How often does the book club meet?',
      options: ['Every Sunday evening', 'Every Wednesday afternoon', 'On the first Saturday of every month'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-228',
    level: 'A2',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 228: Hướng dẫn chuẩn bị hồ sơ xin học bổng đại học',
    sourceStyle: 'VOA • Higher Education',
    transcript:
      'Students planning to apply for next autumn’s merit scholarship should organize their documents early this month. Every application packet must include your official grade transcript, two teacher recommendation letters, and a personal essay explaining a community project you helped lead. Please upload all PDF files before five PM on May fifteenth, because late submissions cannot be reviewed.',
    translation:
      'Các bạn học sinh dự định nộp đơn xin học bổng thành tích vào mùa thu tới nên chuẩn bị hồ sơ sớm trong tháng này. Mỗi bộ hồ sơ bắt buộc gồm bảng điểm chính thức, hai thư giới thiệu của giáo viên và một bài luận cá nhân trình bày về dự án cộng đồng bạn từng tham gia dẫn dắt. Vui lòng tải toàn bộ tệp PDF lên trước 5 giờ chiều ngày 15 tháng Năm, vì hồ sơ nộp muộn sẽ không được xét duyệt.',
    keyPhrases: [
      { en: 'merit scholarship', vi: 'học bổng thành tích học tập' },
      { en: 'recommendation letters', vi: 'thư giới thiệu' },
      { en: 'late submissions', vi: 'hồ sơ nộp muộn' },
    ],
    question: {
      q: 'What happens to scholarship files uploaded after May fifteenth?',
      options: ['They cannot be reviewed', 'They receive lower scores', 'They move to the winter round'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-229',
    level: 'A2',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 229: Tình nguyện viên dạy kỹ năng số cho người cao tuổi',
    sourceStyle: 'British Council • Community Outreach',
    transcript:
      'Every Thursday afternoon, local high school volunteers visit Silver Oak Senior Center to teach practical smartphone skills. Last week, twenty-five older residents learned how to make clear video calls with grandchildren abroad and pay utility bills safely online. Volunteers also showed everyone simple ways to spot fake prize messages so seniors protect their personal savings.',
    translation:
      'Mỗi chiều thứ Năm, các tình nguyện viên học sinh trung học địa phương tới Trung tâm Người cao tuổi Silver Oak để hướng dẫn kỹ năng dùng điện thoại thông minh thiết thực. Tuần trước, 25 cư dân lớn tuổi đã học cách gọi video rõ nét cho cháu ở nước ngoài và thanh toán hóa đơn tiện ích trực tuyến an toàn. Các bạn tình nguyện viên cũng chỉ mọi người cách đơn giản nhận biết tin nhắn trúng thưởng giả để bảo vệ tiền tiết kiệm cá nhân.',
    keyPhrases: [
      { en: 'practical smartphone skills', vi: 'kỹ năng dùng điện thoại thiết thực' },
      { en: 'pay utility bills', vi: 'thanh toán hóa đơn điện nước tiện ích' },
      { en: 'spot fake prize messages', vi: 'nhận diện tin nhắn trúng thưởng giả' },
    ],
    question: {
      q: 'Who teaches the smartphone lessons at the senior center?',
      options: ['Bank managers', 'High school volunteers', 'Phone store clerks'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-230',
    level: 'A2',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 230: Mô hình vườn rau cộng đồng trên sân thượng khu phố',
    sourceStyle: 'BBC • Urban Community',
    transcript:
      'Two years ago, neighbors transformed an empty concrete rooftop above our market into a lively community vegetable garden. Forty families now share small wooden planter boxes where they grow herbs, tomatoes, and leafy greens without chemical sprays. Besides enjoying fresh organic food, older and younger neighbors chat while watering plants together every evening, turning strangers into close friends.',
    translation:
      'Hai năm trước, bà con hàng xóm đã biến sân thượng bê tông trống phía trên khu chợ thành vườn rau cộng đồng đầy sức sống. Bốn mươi gia đình nay cùng chia sẻ các bồn gỗ nhỏ để trồng rau thơm, cà chua và rau ăn lá mà không dùng thuốc hóa học. Bên cạnh việc thưởng thức thực phẩm hữu cơ tươi ngon, hàng xóm lớn tuổi và trẻ tuổi trò chuyện khi tưới cây cùng nhau mỗi tối, biến người lạ thành bạn thân thiết.',
    keyPhrases: [
      { en: 'community vegetable garden', vi: 'vườn rau cộng đồng' },
      { en: 'chemical sprays', vi: 'thuốc phun hóa chất' },
      { en: 'strangers into close friends', vi: 'người lạ thành bạn thân' },
    ],
    question: {
      q: 'Where is the community garden located?',
      options: ['Behind a primary school', 'Inside a train station', 'On a rooftop above the market'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-231',
    level: 'B1',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 231: Mô hình lớp học kết hợp tại các trường đại học',
    sourceStyle: 'VOA • Education Trends',
    transcript:
      'Many universities are permanently adopting a blended learning format rather than returning strictly to traditional lectures. Under this model, students watch short recorded explanations at their own pace before coming to campus. Classroom hours then focus entirely on lively debates, problem-solving workshops, and lab experiments where professors give immediate guidance tailored to each student’s questions.',
    translation:
      'Nhiều trường đại học đang áp dụng lâu dài mô hình học tập kết hợp thay vì quay lại hoàn toàn lối giảng bài truyền thống. Theo mô hình này, sinh viên xem các video giải thích ngắn theo tốc độ riêng trước khi lên giảng đường. Giờ học trên lớp sau đó tập trung trọn vẹn vào tranh luận sôi nổi, hội thảo giải quyết vấn đề và thí nghiệm phòng lab, nơi giảng viên hướng dẫn trực tiếp theo từng thắc mắc của sinh viên.',
    keyPhrases: [
      { en: 'blended learning format', vi: 'mô hình học tập kết hợp trực tuyến và trực tiếp' },
      { en: 'at their own pace', vi: 'theo nhịp độ riêng của bản thân' },
      { en: 'immediate guidance', vi: 'sự hướng dẫn trực tiếp ngay lập tức' },
    ],
    question: {
      q: 'What do students do before coming to campus in a blended model?',
      options: ['Watch short recorded explanations', 'Complete final exams online', 'Visit partner companies'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-232',
    level: 'B1',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 232: Làn đường xe đạp riêng giúp giảm ùn tắc nội đô',
    sourceStyle: 'BBC • Global Society',
    transcript:
      'When city planners added protected bicycle lanes along three crowded downtown avenues last year, several shopkeepers worried fewer cars would hurt business. Twelve months later, municipal traffic surveys tell a surprising story: morning road congestion dropped by eighteen percent, and nearby cafes reported higher weekend customer visits. Safer cycling paths encouraged families to ride locally instead of driving past.',
    translation:
      'Khi các nhà quy hoạch đô thị bổ sung làn đường xe đạp có rào bảo vệ dọc ba đại lộ đông đúc ở trung tâm năm ngoái, nhiều chủ cửa hàng lo ngại ít ô tô hơn sẽ làm giảm doanh thu. Mười hai tháng sau, khảo sát giao thông thành phố cho thấy kết quả bất ngờ: ùn tắc đường buổi sáng giảm 18 phần trăm, và các quán cà phê lân cận ghi nhận lượng khách cuối tuần tăng lên. Đường đạp xe an toàn khuyến khích các gia đình dạo quanh khu vực thay vì lái xe lướt qua.',
    keyPhrases: [
      { en: 'protected bicycle lanes', vi: 'làn xe đạp có dải bảo vệ riêng' },
      { en: 'road congestion', vi: 'tình trạng ùn tắc giao thông' },
      { en: 'higher weekend customer visits', vi: 'lượng khách cuối tuần cao hơn' },
    ],
    question: {
      q: 'How did the protected bike lanes affect nearby cafes?',
      options: ['They lost weekend customers', 'They saw higher weekend customer visits', 'They had to close early'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-233',
    level: 'B1',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 233: Bảo tồn làng nghề gốm truyền thống qua trải nghiệm du lịch',
    sourceStyle: 'British Council • Cultural Heritage',
    transcript:
      'For decades, young people left our riverside pottery village because factory jobs in big cities offered steadier pay. Recently, however, local artisans partnered with cultural tour guides to open weekend clay workshops for travelers and school groups. Visitors pay to shape and paint their own bowls while learning centuries-old kiln techniques, giving young craftspeople both pride and sustainable income at home.',
    translation:
      'Suốt nhiều thập kỷ, giới trẻ rời bỏ làng gốm ven sông của chúng tôi vì công việc nhà máy ở thành phố lớn mang lại thu nhập ổn định hơn. Tuy nhiên gần đây, các nghệ nhân địa phương đã hợp tác cùng hướng dẫn viên văn hóa mở các buổi trải nghiệm nặn gốm cuối tuần cho du khách và học sinh. Khách tham quan trả phí để tự tạo hình và vẽ bát của riêng mình đồng thời tìm hiểu kỹ thuật lò nung hàng trăm năm tuổi, mang lại cho thợ trẻ cả niềm tự hào lẫn thu nhập bền vững ngay tại quê nhà.',
    keyPhrases: [
      { en: 'local artisans', vi: 'nghệ nhân địa phương' },
      { en: 'kiln techniques', vi: 'kỹ thuật nung gốm truyền thống' },
      { en: 'sustainable income', vi: 'thu nhập bền vững' },
    ],
    question: {
      q: 'How did the village encourage young people to stay in pottery?',
      options: ['By building large plastic factories', 'By banning city travel', 'By hosting paid weekend clay workshops for visitors'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-234',
    level: 'B1',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 234: Dạy học sinh kỹ năng nhận diện tin giả trên mạng xã hội',
    sourceStyle: 'VOA • Media Literacy',
    transcript:
      'Scrolling through viral posts every day makes it easy for teenagers to mistake dramatic headlines for verified facts. That is why secondary schools across the region now run media literacy classes teaching students three quick verification habits. Learners practice checking who authored a story, tracing original data sources, and comparing claims across independent news outlets before hitting the share button.',
    translation:
      'Lướt qua các bài đăng lan truyền hàng ngày khiến thanh thiếu niên dễ nhầm những tiêu đề giật gân với sự thật đã kiểm chứng. Đó là lý do các trường trung học trong khu vực nay mở lớp năng lực truyền thông dạy học sinh ba thói quen kiểm chứng nhanh. Học sinh thực hành kiểm tra tác giả bài viết, truy ngược nguồn dữ liệu gốc và đối chiếu thông tin trên các trang tin độc lập trước khi bấm nút chia sẻ.',
    keyPhrases: [
      { en: 'verified facts', vi: 'thông tin sự thật đã kiểm chứng' },
      { en: 'media literacy classes', vi: 'lớp học năng lực đọc hiểu truyền thông' },
      { en: 'original data sources', vi: 'nguồn dữ liệu gốc ban đầu' },
    ],
    question: {
      q: 'What should students do before clicking share on a viral post?',
      options: ['Verify the author, data sources, and independent outlets', 'Read only the headline comments', 'Send it to classmates immediately'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-235',
    level: 'B1',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 235: Trải nghiệm trưởng thành sau một học kỳ trao đổi quốc tế',
    sourceStyle: 'British Council • Student Exchange',
    transcript:
      'Spending one semester studying in Melbourne pushed me far outside my comfort zone in the best possible way. At first, navigating unfamiliar bus routes and cooking dinner with my host family felt overwhelming. By the second month, listening closely during group seminars and joining campus clubs turned hesitation into genuine confidence, teaching me adaptability that no textbook alone could provide.',
    translation:
      'Dành một học kỳ học tập tại Melbourne đã đẩy tôi ra khỏi vùng an toàn theo cách tích cực nhất. Ban đầu, việc tự tìm tuyến xe buýt xa lạ và nấu bữa tối cùng gia đình bản xứ khiến tôi hơi choáng ngợp. Đến tháng thứ hai, việc lắng nghe kỹ trong các buổi thảo luận nhóm và tham gia câu lạc bộ trường đã biến sự rụt rè thành tự tin thực sự, dạy tôi khả năng thích nghi mà không giáo trình nào tự thân mang lại được.',
    keyPhrases: [
      { en: 'outside my comfort zone', vi: 'ra khỏi vùng an toàn của bản thân' },
      { en: 'host family', vi: 'gia đình bản xứ bảo trợ' },
      { en: 'genuine confidence', vi: 'sự tự tin thực sự' },
    ],
    question: {
      q: 'What skill did the student gain that textbooks alone could not teach?',
      options: ['Advanced coding', 'Adaptability', 'Financial accounting'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-236',
    level: 'B2',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 236: Thu hẹp khoảng cách tiếp cận công nghệ ở vùng nông thôn',
    sourceStyle: 'BBC • Global Society',
    transcript:
      'While urban classrooms increasingly integrate interactive simulations, remote rural schools frequently confront uneven broadband coverage and outdated hardware. Bridging this digital divide demands far more than simply shipping laptops into isolated districts. Effective education grants pair reliable fiber connectivity with ongoing teacher coaching and localized curriculum content, ensuring rural pupils acquire the same foundational digital fluency as city peers.',
    translation:
      'Trong khi các lớp học đô thị ngày càng tích hợp nhiều mô phỏng tương tác, trường học vùng nông thôn xa xôi thường đối mặt với mạng băng thông rộng chập chờn và thiết bị cũ kỹ. Thu hẹp khoảng cách số này đòi hỏi nhiều hơn hẳn việc chỉ chuyển máy tính xách tay tới các huyện vùng sâu. Các gói tài trợ giáo dục hiệu quả kết hợp kết nối cáp quang ổn định với đào tạo giáo viên liên tục và nội dung chương trình phù hợp địa phương, đảm bảo học sinh nông thôn có năng lực số nền tảng ngang bằng bạn bè thành phố.',
    keyPhrases: [
      { en: 'digital divide', vi: 'khoảng cách tiếp cận công nghệ số' },
      { en: 'ongoing teacher coaching', vi: 'đào tạo hỗ trợ giáo viên liên tục' },
      { en: 'foundational digital fluency', vi: 'năng lực sử dụng công nghệ số nền tảng' },
    ],
    question: {
      q: 'Why is merely shipping laptops not enough to close the digital divide?',
      options: ['Rural schools lack desks', 'Students prefer printed dictionaries', 'Schools also need reliable connectivity, teacher coaching, and localized content'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-237',
    level: 'B2',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 237: Học tập suốt đời và chứng chỉ ngắn hạn trong kỷ nguyên số',
    sourceStyle: 'VOA • Future of Learning',
    transcript:
      'Because workplace technologies evolve far faster than four-year university syllabi, continuous adult learning has shifted from an optional hobby to an economic necessity. Increasingly, mid-career professionals pursue focused micro-credentials—modular six-week courses verified by industry partners—to master data visualization or green manufacturing standards. Employers value this lifelong learning mindset because adaptable workers help entire organizations transition smoothly through industrial change.',
    translation:
      'Bởi công nghệ nơi làm việc tiến hóa nhanh hơn nhiều so với giáo trình đại học bốn năm, việc học tập liên tục ở người trưởng thành đã chuyển từ sở thích tự chọn thành nhu cầu kinh tế thiết yếu. Ngày càng nhiều nhân sự giữa sự nghiệp theo đuổi các vi chứng chỉ chuyên sâu—những khóa học mô-đun sáu tuần được đối tác doanh nghiệp chứng thực—để làm chủ trực quan hóa dữ liệu hoặc tiêu chuẩn sản xuất xanh. Nhà tuyển dụng trân trọng tư duy học tập suốt đời này vì nhân sự thích nghi tốt giúp cả tổ chức chuyển mình êm ái qua biến động ngành nghề.',
    keyPhrases: [
      { en: 'economic necessity', vi: 'nhu cầu kinh tế thiết yếu' },
      { en: 'focused micro-credentials', vi: 'chứng chỉ kỹ năng ngắn hạn chuyên sâu' },
      { en: 'lifelong learning mindset', vi: 'tư duy học tập suốt đời' },
    ],
    question: {
      q: 'What characterizes the micro-credentials mentioned by the speaker?',
      options: ['Modular six-week courses verified by industry partners', 'Four-year theoretical degrees', 'Unpaid weekend internships'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-238',
    level: 'B2',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 238: Quy hoạch không gian công cộng thân thiện với người đi bộ',
    sourceStyle: 'BBC • Urban Design',
    transcript:
      'Converting congested inner-city intersections into shaded pedestrian plazas often sparks fierce debate before construction begins. Yet urban studies consistently reveal that wider sidewalks, native street trees, and public benches invite residents to linger outdoors instead of rushing indoors. When neighborhoods feel welcoming on foot, small family-owned bakeries, bookshops, and cultural markets experience stronger foot traffic and deeper social cohesion.',
    translation:
      'Việc chuyển đổi các nút giao nội đô đông đúc thành quảng trường đi bộ rợp bóng cây thường gây tranh cãi gay gắt trước khi khởi công. Thế nhưng các nghiên cứu đô thị liên tục cho thấy vỉa hè rộng hơn, cây xanh bản địa dọc phố và ghế băng công cộng mời gọi cư dân nán lại ngoài trời thay vì vội vã bước vào nhà. Khi khu phố trở nên thân thiện với người đi bộ, các tiệm bánh gia đình, hiệu sách và chợ văn hóa đón lượng khách ghé qua đông hơn cùng sự gắn kết xã hội sâu sắc hơn.',
    keyPhrases: [
      { en: 'pedestrian plazas', vi: 'quảng trường dành cho người đi bộ' },
      { en: 'stronger foot traffic', vi: 'lượng người qua lại ghé thăm cao hơn' },
      { en: 'social cohesion', vi: 'sự gắn kết cộng đồng xã hội' },
    ],
    question: {
      q: 'How do pedestrian-friendly streets benefit local family-owned shops?',
      options: ['By lowering property rent', 'By increasing foot traffic as residents linger outdoors', 'By adding underground parking'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-239',
    level: 'B2',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 239: Cân bằng công cụ chấm bài AI và vai trò cố vấn của giáo viên',
    sourceStyle: 'British Council • Education & Ethics',
    transcript:
      'Automated writing assistants can highlight grammar slips and structural repetition within seconds, freeing instructors from hours of mechanical proofreading. Nevertheless, educators caution against delegating evaluative judgment entirely to algorithms. Software rarely grasps subtle cultural humor, original critical arguments, or an individual student’s emotional growth. Combining swift digital diagnostics with thoughtful human mentorship ensures technology elevates classroom feedback rather than flattening student voice.',
    translation:
      'Các trợ lý chấm viết tự động có thể chỉ ra lỗi ngữ pháp và sự lặp cấu trúc chỉ trong vài giây, giải phóng giảng viên khỏi hàng giờ soát lỗi cơ học. Tuy nhiên, các nhà giáo dục cảnh báo không nên giao phó hoàn toàn việc đánh giá nhận xét cho thuật toán. Phần mềm hiếm khi nắm bắt được nét hài hước văn hóa tinh tế, lập luận phản biện độc đáo hay sự trưởng thành cảm xúc của từng học sinh. Kết hợp chẩn đoán số nhanh chóng với sự cố vấn sâu sắc của con người đảm bảo công nghệ nâng tầm phản hồi lớp học thay vì làm phai nhạt tiếng nói cá nhân của người học.',
    keyPhrases: [
      { en: 'mechanical proofreading', vi: 'việc soát lỗi kỹ thuật mang tính cơ học' },
      { en: 'evaluative judgment', vi: 'sự đánh giá nhận xét chuyên môn' },
      { en: 'thoughtful human mentorship', vi: 'sự cố vấn tận tâm từ con người' },
    ],
    question: {
      q: 'What limitation of automated grading software do educators highlight?',
      options: ['It takes hours to scan grammar', 'It refuses to check spelling', 'It rarely grasps cultural nuance, original arguments, or personal growth'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-240',
    level: 'B2',
    category: 'Giáo dục & Xã hội',
    title: 'Bài 240: Mô hình kinh tế tuần hoàn tại khuôn viên trường đại học',
    sourceStyle: 'VOA • Sustainability & Campus Life',
    transcript:
      'Across forward-looking university campuses, sustainability initiatives are moving beyond simple recycling posters toward closed-loop circular systems. Student dining halls now weigh daily food scraps, sort organic leftovers into anaerobic digesters, and convert the resulting biogas into kitchen heating energy. Meanwhile, nutrient-rich compost fertilizes campus botanical gardens, turning everyday student habits into living laboratories for environmental stewardship.',
    translation:
      'Tại các khuôn viên đại học có tầm nhìn tiên phong, các sáng kiến bền vững đang vượt ra khỏi những tấm áp phích tái chế đơn thuần để hướng tới hệ thống tuần hoàn khép kín. Nhà ăn sinh viên nay cân đo lượng thức ăn thừa hàng ngày, phân loại rác hữu cơ vào bể phân hủy yếm khí và chuyển hóa khí sinh học thu được thành năng lượng sưởi ấm cho khu bếp. Đồng thời, phân ủ giàu dinh dưỡng được bón cho vườn thực vật trong trường, biến thói quen sinh hoạt thường nhật của sinh viên thành phòng thí nghiệm sống về tinh thần bảo vệ môi trường.',
    keyPhrases: [
      { en: 'closed-loop circular systems', vi: 'hệ thống kinh tế tuần hoàn khép kín' },
      { en: 'organic leftovers', vi: 'rác thải thực phẩm hữu cơ thừa' },
      { en: 'environmental stewardship', vi: 'trách nhiệm gìn giữ và bảo vệ môi trường' },
    ],
    question: {
      q: 'What is the biogas from campus dining scraps used for?',
      options: ['Fueling city buses', 'Providing kitchen heating energy', 'Powering dormitory air conditioners'],
      correctIdx: 1,
    },
  },
];

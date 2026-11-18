import { RoleplayScenario } from '../types/learning';

export const ROLEPLAY_BANK_PART2: RoleplayScenario[] = [
  // ============================================================================
  // 6. Kinh doanh & CSKH (rp-109 .. rp-128)
  // ============================================================================
  {
    id: 'rp-109',
    title: 'Chào Khách Tại Quầy Showroom',
    level: 'A1',
    category: 'Kinh doanh & CSKH',
    context: 'Bạn là nhân viên trực quầy chào đón một vị khách vừa bước vào showroom sản phẩm.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello! Is this the customer service desk?',
        ipa: '',
        vi: 'Xin chào! Đây có phải quầy chăm sóc khách hàng không ạ?',
        suggestedReplies: [
          {
            en: 'Yes, welcome! How can I help you today?',
            ipa: '',
            vi: 'Vâng, chào mừng anh/chị! Hôm nay tôi có thể giúp gì cho anh/chị ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I want to see your new laptops on display.',
        ipa: '',
        vi: 'Tôi muốn xem các mẫu máy tính xách tay mới đang trưng bày.',
        suggestedReplies: [
          {
            en: 'Sure, please follow me. I will show you our newest models.',
            ipa: '',
            vi: 'Vâng, mời anh/chị đi theo tôi. Tôi sẽ giới thiệu các mẫu mới nhất ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-110',
    title: 'Hỏi Giá Túi Xách & Ưu Đãi',
    level: 'A1',
    category: 'Kinh doanh & CSKH',
    context: 'Bạn là khách hàng đang hỏi nhân viên bán hàng về giá và khuyến mãi của một chiếc túi.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi there! Do you like this black leather handbag?',
        ipa: '',
        vi: 'Chào bạn! Bạn có thích chiếc túi xách da màu đen này không?',
        suggestedReplies: [
          {
            en: 'Yes, it looks very nice. How much is it?',
            ipa: '',
            vi: 'Có, trông nó rất đẹp. Chiếc này giá bao nhiêu vậy?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'It is sixty dollars, and today we have ten percent off.',
        ipa: '',
        vi: 'Giá là 60 đô la, và hôm nay bên mình đang giảm 10% đấy ạ.',
        suggestedReplies: [
          {
            en: 'Great, that is a good price. I will take one.',
            ipa: '',
            vi: 'Tuyệt, giá đó hợp lý đấy. Tôi lấy một chiếc nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-111',
    title: 'Đăng Ký Thẻ Thành Viên Cho Khách',
    level: 'A1',
    category: 'Kinh doanh & CSKH',
    context: 'Bạn đang hỗ trợ khách hàng tạo tài khoản thành viên mới tại quầy thu ngân.',
    turns: [
      {
        speaker: 'AI',
        en: 'Excuse me, can I sign up for a member card here?',
        ipa: '',
        vi: 'Xin lỗi, tôi có thể đăng ký thẻ thành viên ở đây không?',
        suggestedReplies: [
          {
            en: 'Of course! May I have your full name, please?',
            ipa: '',
            vi: 'Tất nhiên rồi ạ! Cho tôi xin họ tên đầy đủ của bạn được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'My name is David Park. Do you need my phone number too?',
        ipa: '',
        vi: 'Tên tôi là David Park. Bạn có cần số điện thoại của tôi luôn không?',
        suggestedReplies: [
          {
            en: 'Yes, please tell me your phone number so I can save it.',
            ipa: '',
            vi: 'Có ạ, vui lòng đọc số điện thoại để tôi lưu thông tin nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-112',
    title: 'Hỏi Giờ Mở Cửa Cuối Tuần',
    level: 'A1',
    category: 'Kinh doanh & CSKH',
    context: 'Khách hàng gọi điện tới cửa hàng để hỏi giờ mở cửa vào ngày Chủ nhật.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello, is your store open on Sunday morning?',
        ipa: '',
        vi: 'Xin chào, cửa hàng mình có mở cửa vào sáng Chủ nhật không?',
        suggestedReplies: [
          {
            en: 'Yes, we open at nine AM every Sunday.',
            ipa: '',
            vi: 'Có ạ, chúng tôi mở cửa lúc 9 giờ sáng mỗi Chủ nhật.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Thank you. What time do you close in the evening?',
        ipa: '',
        vi: 'Cảm ơn bạn. Buổi tối mấy giờ cửa hàng đóng cửa vậy?',
        suggestedReplies: [
          {
            en: 'We close at eight PM. See you on Sunday!',
            ipa: '',
            vi: 'Chúng tôi đóng cửa lúc 8 giờ tối. Hẹn gặp bạn vào Chủ nhật nhé!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-113',
    title: 'Thanh Toán & Xuất Hóa Đơn Tại Quầy',
    level: 'A1',
    category: 'Kinh doanh & CSKH',
    context: 'Bạn đang hoàn tất thanh toán bằng thẻ và đưa hóa đơn cho khách hàng.',
    turns: [
      {
        speaker: 'AI',
        en: 'Here is my card. Do I need to sign anything?',
        ipa: '',
        vi: 'Thẻ của tôi đây. Tôi có cần ký tên vào đâu không?',
        suggestedReplies: [
          {
            en: 'No, you do not need to sign. Please tap your card here.',
            ipa: '',
            vi: 'Không cần ký đâu ạ. Bạn vui lòng chạm thẻ vào đây nhé.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Okay, done. Can I get a paper receipt and a small bag?',
        ipa: '',
        vi: 'Xong rồi. Cho tôi xin hóa đơn giấy và một chiếc túi nhỏ nhé?',
        suggestedReplies: [
          {
            en: 'Here is your receipt and your bag. Thank you for shopping with us!',
            ipa: '',
            vi: 'Đây là hóa đơn và túi của bạn. Cảm ơn bạn đã mua sắm cùng chúng tôi!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-114',
    title: 'Đổi Tai Nghe Bị Lỗi Tại Cửa Hàng',
    level: 'A2',
    category: 'Kinh doanh & CSKH',
    context: 'Khách hàng quay lại cửa hàng với chiếc tai nghe mới mua hôm qua nhưng một bên bị mất tiếng.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi, I bought these earbuds yesterday, and the left side has no sound.',
        ipa: '',
        vi: 'Chào bạn, hôm qua tôi mua bộ tai nghe này nhưng bên trái không có tiếng.',
        suggestedReplies: [
          {
            en: 'I am sorry to hear that. Do you still have the receipt with you?',
            ipa: '',
            vi: 'Rất tiếc khi nghe vậy ạ. Bạn vẫn còn giữ hóa đơn mua hàng chứ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Yes, here is the receipt. Can I exchange them for a new pair?',
        ipa: '',
        vi: 'Có, hóa đơn đây ạ. Tôi có thể đổi sang một cặp mới không?',
        suggestedReplies: [
          {
            en: 'Certainly. Let me test them quickly and get you a brand new box.',
            ipa: '',
            vi: 'Chắc chắn rồi ạ. Để tôi kiểm tra nhanh rồi lấy cho bạn hộp mới nguyên seal nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-115',
    title: 'Hẹn Lịch Tư Vấn Dịch Vụ Website',
    level: 'A2',
    category: 'Kinh doanh & CSKH',
    context: 'Bạn phụ trách CSKH đang sắp xếp lịch hẹn tư vấn thiết kế website với khách hàng mới.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello, I would like to meet someone to learn about your website packages.',
        ipa: '',
        vi: 'Xin chào, tôi muốn hẹn gặp để tìm hiểu về các gói thiết kế website bên bạn.',
        suggestedReplies: [
          {
            en: 'We would be happy to meet you. Are you free this Thursday afternoon?',
            ipa: '',
            vi: 'Chúng tôi rất sẵn lòng đón tiếp bạn. Chiều thứ Năm tuần này bạn có rảnh không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Thursday at two PM works well for me. Where is your office located?',
        ipa: '',
        vi: '2 giờ chiều thứ Năm rất ổn với tôi. Văn phòng bên bạn nằm ở đâu nhỉ?',
        suggestedReplies: [
          {
            en: 'Our office is on the fourth floor of Lotus Tower. I will email you the details.',
            ipa: '',
            vi: 'Văn phòng chúng tôi ở tầng 4 tòa nhà Lotus Tower. Tôi sẽ gửi email chi tiết cho bạn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-116',
    title: 'Kiểm Tra Thời Hạn Bảo Hành Máy Xay',
    level: 'A2',
    category: 'Kinh doanh & CSKH',
    context: 'Khách hàng mang máy xay sinh tố bị hỏng đến trung tâm bảo hành để kiểm tra.',
    turns: [
      {
        speaker: 'AI',
        en: 'My blender stopped working this morning. Is it still under warranty?',
        ipa: '',
        vi: 'Máy xay của tôi sáng nay tự nhiên ngừng chạy. Nó vẫn còn bảo hành chứ?',
        suggestedReplies: [
          {
            en: 'Let me check the serial number for you. When did you buy it?',
            ipa: '',
            vi: 'Để tôi kiểm tra số sê-ri giúp bạn. Bạn mua máy từ bao giờ vậy?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I bought it about eight months ago at your downtown branch.',
        ipa: '',
        vi: 'Tôi mua khoảng tám tháng trước ở chi nhánh trung tâm của bên bạn.',
        suggestedReplies: [
          {
            en: 'Good news, it has a twelve-month warranty, so we will repair it for free.',
            ipa: '',
            vi: 'Tin vui là máy được bảo hành 12 tháng nên bên mình sẽ sửa miễn phí cho bạn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-117',
    title: 'Giới Thiệu Chương Trình Tích Điểm',
    level: 'A2',
    category: 'Kinh doanh & CSKH',
    context: 'Một khách hàng mua sắm thường xuyên hỏi bạn về quyền lợi dành cho khách quen.',
    turns: [
      {
        speaker: 'AI',
        en: 'I shop here almost every month. Do you offer any loyalty rewards?',
        ipa: '',
        vi: 'Hầu như tháng nào tôi cũng mua ở đây. Bên bạn có chương trình ưu đãi khách thân thiết không?',
        suggestedReplies: [
          {
            en: 'Yes! Our free loyalty club gives you reward points on every purchase.',
            ipa: '',
            vi: 'Có chứ ạ! Thẻ thành viên miễn phí giúp bạn tích điểm thưởng sau mỗi lần mua.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That sounds useful. How can I use the points later?',
        ipa: '',
        vi: 'Nghe hay đấy. Sau này tôi dùng số điểm đó như thế nào?',
        suggestedReplies: [
          {
            en: 'You can trade your points for discounts or small gifts on your next visit.',
            ipa: '',
            vi: 'Bạn có thể đổi điểm lấy mã giảm giá hoặc quà tặng nhỏ ở lần mua tiếp theo.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-118',
    title: 'Đổi Lịch Hẹn Chăm Sóc Khách Hàng',
    level: 'A2',
    category: 'Kinh doanh & CSKH',
    context: 'Khách hàng gọi điện xin dời lịch hẹn tư vấn trực tiếp sang đầu tuần sau.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi, something urgent came up, so I cannot make my appointment tomorrow.',
        ipa: '',
        vi: 'Chào bạn, tôi có việc đột xuất nên ngày mai không đến buổi hẹn được.',
        suggestedReplies: [
          {
            en: 'No problem at all. Would you like to cancel it or pick another day?',
            ipa: '',
            vi: 'Không sao đâu ạ. Bạn muốn hủy lịch luôn hay chọn sang một ngày khác?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Can we move it to next Monday morning at ten instead?',
        ipa: '',
        vi: 'Mình chuyển sang 10 giờ sáng thứ Hai tuần tới được không?',
        suggestedReplies: [
          {
            en: 'Yes, Monday at ten AM is open. I have updated your booking.',
            ipa: '',
            vi: 'Được ạ, 10 giờ sáng thứ Hai còn trống. Tôi đã cập nhật lịch hẹn mới cho bạn rồi.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-119',
    title: 'Xử Lý Hoàn Tiền Do Giao Nhầm Mẫu',
    level: 'B1',
    category: 'Kinh doanh & CSKH',
    context: 'Khách hàng đặt đèn bàn online nhưng nhận sai màu và yêu cầu hoàn tiền.',
    turns: [
      {
        speaker: 'AI',
        en: 'I ordered a silver desk lamp online, but the box contained a black one instead.',
        ipa: '',
        vi: 'Tôi đặt chiếc đèn bàn màu bạc trên mạng, nhưng trong hộp lại là màu đen.',
        suggestedReplies: [
          {
            en: 'I apologize for our packing mistake. Would you prefer a full refund or a free replacement?',
            ipa: '',
            vi: 'Tôi xin lỗi vì sai sót đóng gói của bên mình. Bạn muốn hoàn tiền 100% hay đổi sang mẫu đúng miễn phí ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I would rather get a refund because I already bought another lamp locally.',
        ipa: '',
        vi: 'Tôi muốn nhận lại tiền hơn vì tôi lỡ mua một chiếc đèn khác ở gần nhà rồi.',
        suggestedReplies: [
          {
            en: 'Understood. I will email you a free return label, and your refund will arrive within five business days.',
            ipa: '',
            vi: 'Tôi hiểu rồi ạ. Tôi sẽ gửi nhãn hoàn hàng miễn phí qua email và tiền sẽ về tài khoản trong vòng 5 ngày làm việc.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-120',
    title: 'Giới Thiệu Phần Mềm Cho Khách Doanh Nghiệp',
    level: 'B1',
    category: 'Kinh doanh & CSKH',
    context: 'Bạn đang thuyết phục quản lý một cửa hàng chuyển từ bảng tính sang phần mềm xếp ca của công ty bạn.',
    turns: [
      {
        speaker: 'AI',
        en: 'We already use spreadsheets to track staff shifts. Why should we switch to your tool?',
        ipa: '',
        vi: 'Chúng tôi đang dùng bảng tính để theo dõi ca làm của nhân viên rồi. Vì sao nên chuyển sang công cụ của bạn?',
        suggestedReplies: [
          {
            en: 'Our tool saves managers hours each week by sending automatic shift reminders and catching schedule conflicts.',
            ipa: '',
            vi: 'Công cụ bên mình giúp quản lý tiết kiệm hàng giờ mỗi tuần nhờ tự động nhắc ca làm và cảnh báo trùng lịch.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Does it take long for a team of twenty people to learn how to use it?',
        ipa: '',
        vi: 'Một nhóm khoảng hai mươi người có mất nhiều thời gian để học cách dùng không?',
        suggestedReplies: [
          {
            en: 'Not at all. Most teams get comfortable within two days, and we include free onboarding support.',
            ipa: '',
            vi: 'Không hề đâu ạ. Đa số các đội ngũ dùng thành thạo sau hai ngày, và bên mình hỗ trợ hướng dẫn ban đầu miễn phí.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-121',
    title: 'Gọi Điện Khảo Sát Mức Độ Hài Lòng',
    level: 'B1',
    category: 'Kinh doanh & CSKH',
    context: 'Bạn gọi điện chăm sóc sau bán hàng để lắng nghe đánh giá của khách về dịch vụ lắp đặt.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello, yes, your team finished setting up our office printer yesterday.',
        ipa: '',
        vi: 'Chào bạn, đúng rồi, đội bên bạn đã lắp đặt xong máy in văn phòng cho chúng tôi hôm qua.',
        suggestedReplies: [
          {
            en: 'Thank you for your time. How has the printer been working for your staff so far?',
            ipa: '',
            vi: 'Cảm ơn anh/chị đã nghe máy. Đến giờ máy in hoạt động cho nhân viên mình có ổn định không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'It prints smoothly, though the technician arrived thirty minutes later than promised.',
        ipa: '',
        vi: 'Máy in chạy êm lắm, chỉ có điều kỹ thuật viên đến trễ hơn giờ hẹn khoảng 30 phút.',
        suggestedReplies: [
          {
            en: 'Thank you for sharing that honest feedback. I will pass it to our dispatch team so we improve.',
            ipa: '',
            vi: 'Cảm ơn anh/chị đã góp ý thẳng thắn. Em sẽ chuyển thông tin này cho bộ phận điều phối để khắc phục tốt hơn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-122',
    title: 'Giải Đáp Chính Sách Gia Hạn Gói Cước',
    level: 'B1',
    category: 'Kinh doanh & CSKH',
    context: 'Khách hàng liên hệ hỏi về việc đổi chu kỳ thanh toán trước ngày tự động gia hạn.',
    turns: [
      {
        speaker: 'AI',
        en: 'I noticed an email saying my subscription will renew next week. Can I switch to a monthly plan?',
        ipa: '',
        vi: 'Tôi nhận được email báo gói dịch vụ sắp gia hạn tuần tới. Tôi có thể chuyển sang gói trả theo tháng không?',
        suggestedReplies: [
          {
            en: 'Yes, you can switch anytime before the renewal date without paying any penalty fee.',
            ipa: '',
            vi: 'Được chứ ạ, bạn có thể chuyển đổi bất kỳ lúc nào trước ngày gia hạn mà không mất phí phạt.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Will I lose my saved files if I change the billing cycle?',
        ipa: '',
        vi: 'Tôi có bị mất các tệp đã lưu nếu đổi chu kỳ thanh toán không?',
        suggestedReplies: [
          {
            en: 'Not at all. All your projects and saved data will stay exactly the same.',
            ipa: '',
            vi: 'Hoàn toàn không nhé. Mọi dự án và dữ liệu đã lưu của bạn vẫn được giữ nguyên vẹn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-123',
    title: 'Tư Vấn Dùng Thử Gói Dịch Vụ Nâng Cao',
    level: 'B1',
    category: 'Kinh doanh & CSKH',
    context: 'Khách hàng đang dùng gói cơ bản nhưng băn khoăn chưa rõ có nên nâng cấp lên gói Pro hay không.',
    turns: [
      {
        speaker: 'AI',
        en: 'We are happy with the basic plan, so I am not sure if we really need the Pro version.',
        ipa: '',
        vi: 'Chúng tôi đang hài lòng với gói cơ bản nên chưa chắc có thật sự cần bản Pro không.',
        suggestedReplies: [
          {
            en: 'The Pro version adds shared team reports and priority chat support, which helps when your team grows.',
            ipa: '',
            vi: 'Bản Pro bổ sung báo cáo dùng chung cho nhóm và hỗ trợ chat ưu tiên, rất hữu ích khi đội ngũ mở rộng.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Can we test it first before committing to a full-year payment?',
        ipa: '',
        vi: 'Chúng tôi có thể dùng thử trước khi cam kết thanh toán cả năm không?',
        suggestedReplies: [
          {
            en: 'Definitely. I can activate a fourteen-day free trial for your account right now.',
            ipa: '',
            vi: 'Chắc chắn rồi ạ. Tôi có thể kích hoạt gói dùng thử miễn phí 14 ngày cho tài khoản của bạn ngay bây giờ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-124',
    title: 'Xoa Dịu Khách VIP Khi Hệ Thống Gián Đoạn',
    level: 'B2',
    category: 'Kinh doanh & CSKH',
    context: 'Khách hàng doanh nghiệp lớn gọi điện bức xúc vì cổng thanh toán bị gián đoạn trước sự kiện cuối tuần.',
    turns: [
      {
        speaker: 'AI',
        en: 'Our checkout page went down for forty minutes this morning, and we lost several orders. This is unacceptable.',
        ipa: '',
        vi: 'Trang thanh toán của chúng tôi bị sập suốt 40 phút sáng nay khiến mất nhiều đơn hàng. Chuyện này không thể chấp nhận được.',
        suggestedReplies: [
          {
            en: 'I completely understand your frustration, especially during a busy morning. Our engineers have restored service and are monitoring it closely.',
            ipa: '',
            vi: 'Tôi hoàn toàn hiểu sự bức xúc của anh/chị, nhất là vào buổi sáng cao điểm. Đội kỹ thuật đã khôi phục hệ thống và đang giám sát sát sao.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'What concrete steps are you taking to make sure this does not happen during our weekend campaign?',
        ipa: '',
        vi: 'Bên bạn có biện pháp cụ thể nào để đảm bảo sự cố này không lặp lại trong chiến dịch cuối tuần tới?',
        suggestedReplies: [
          {
            en: 'We are assigning a dedicated engineer to monitor your traffic all weekend and applying a service credit to your next invoice.',
            ipa: '',
            vi: 'Chúng tôi sẽ phân công riêng một kỹ sư theo dõi lưu lượng cho bên anh/chị suốt cuối tuần và khấu trừ phí bồi thường vào hóa đơn kỳ tới.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-125',
    title: 'Đàm Phán Chiết Khấu Hợp Đồng B2B',
    level: 'B2',
    category: 'Kinh doanh & CSKH',
    context: 'Bạn đang thương lượng mức chiết khấu và điều khoản triển khai với trưởng phòng mua hàng của đối tác.',
    turns: [
      {
        speaker: 'AI',
        en: 'Your quote is slightly above our budget. Could you offer a fifteen percent discount if we sign for one year?',
        ipa: '',
        vi: 'Báo giá bên bạn hơi vượt ngân sách của chúng tôi. Bạn có thể giảm 15% nếu chúng tôi ký hợp đồng một năm không?',
        suggestedReplies: [
          {
            en: 'We really value a long-term partnership, though fifteen percent is tough on a one-year term. Could we meet at ten percent?',
            ipa: '',
            vi: 'Chúng tôi rất trân trọng sự hợp tác lâu dài, tuy nhiên mức giảm 15% cho kỳ hạn một năm khá khó. Chúng ta chốt ở mức 10% được không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Ten percent works if you can also waive the setup fee and include quarterly training.',
        ipa: '',
        vi: 'Mức 10% thì ổn nếu bên bạn miễn luôn phí thiết lập và tặng kèm đào tạo hàng quý.',
        suggestedReplies: [
          {
            en: 'If you sign by the end of this month, I can waive the setup fee and include two live training sessions.',
            ipa: '',
            vi: 'Nếu bên anh/chị ký trước cuối tháng này, tôi có thể miễn phí thiết lập và tặng kèm hai buổi đào tạo trực tiếp.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-126',
    title: 'Từ Chối Khéo Yêu Cầu Ngoài Bảo Hành',
    level: 'B2',
    category: 'Kinh doanh & CSKH',
    context: 'Khách hàng yêu cầu sửa miễn phí máy tính bảng bị vỡ màn hình do làm rơi, không thuộc diện bảo hành.',
    turns: [
      {
        speaker: 'AI',
        en: 'I dropped my tablet by accident, and the screen cracked. Since I bought it two months ago, you should fix it free.',
        ipa: '',
        vi: 'Tôi lỡ tay làm rơi máy tính bảng nên nứt màn hình. Tôi mới mua hai tháng thôi, bên bạn phải sửa miễn phí chứ.',
        suggestedReplies: [
          {
            en: 'I really sympathize, as accidents happen so easily. However, our standard warranty only covers factory defects, not physical damage.',
            ipa: '',
            vi: 'Tôi rất thông cảm vì tai nạn ngoài ý muốn rất dễ xảy ra. Tuy nhiên, bảo hành tiêu chuẩn chỉ áp dụng cho lỗi nhà sản xuất chứ không bao gồm rơi vỡ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That is disappointing. Is there anything at all you can do to help with the repair cost?',
        ipa: '',
        vi: 'Nghe chán quá nhỉ. Bên bạn có cách nào hỗ trợ bớt chi phí sửa chữa không?',
        suggestedReplies: [
          {
            en: 'While I cannot approve a free repair, I can apply a twenty percent loyalty discount on the screen replacement.',
            ipa: '',
            vi: 'Dù tôi không thể duyệt sửa miễn phí, tôi có thể áp dụng mức giảm 20% tri ân khách hàng cho chi phí thay màn hình ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-127',
    title: 'Giữ Chân Khách Doanh Nghiệp Sắp Rời Bỏ',
    level: 'B2',
    category: 'Kinh doanh & CSKH',
    context: 'Khách hàng doanh nghiệp báo sẽ chuyển sang nhà cung cấp giá rẻ hơn vào tháng tới.',
    turns: [
      {
        speaker: 'AI',
        en: 'To be honest, another vendor offered us a lower rate, so we are thinking about canceling next month.',
        ipa: '',
        vi: 'Nói thật là một nhà cung cấp khác chào giá thấp hơn, nên chúng tôi đang cân nhắc hủy gói vào tháng tới.',
        suggestedReplies: [
          {
            en: 'I appreciate your honesty. Before you decide, could you share whether price is the only factor, or if anything fell short?',
            ipa: '',
            vi: 'Tôi rất cảm kích sự thẳng thắn của bạn. Trước khi quyết định, bạn có thể chia sẻ xem giá cả là lý do duy nhất hay còn điểm nào chưa hài lòng không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Mostly cost, though we also wished onboarding new regional staff were much faster.',
        ipa: '',
        vi: 'Chủ yếu là chi phí, ngoài ra chúng tôi cũng mong việc đào tạo nhân viên chi nhánh mới nhanh gọn hơn.',
        suggestedReplies: [
          {
            en: 'If we adjust your pricing tier and provide automated onboarding templates for new branches, would you consider staying another quarter?',
            ipa: '',
            vi: 'Nếu bên mình điều chỉnh lại bậc giá và cung cấp sẵn mẫu hướng dẫn tự động cho chi nhánh mới, bạn có cân nhắc gắn bó thêm một quý không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-128',
    title: 'Chốt Lịch Ký Kết & Bàn Giao Triển Khai',
    level: 'B2',
    category: 'Kinh doanh & CSKH',
    context: 'Đối tác đã thông qua hợp đồng cuối cùng và hỏi quy trình bàn giao sang đội ngũ triển khai.',
    turns: [
      {
        speaker: 'AI',
        en: 'We reviewed the final proposal and our legal team had no objections. What are the next steps to launch?',
        ipa: '',
        vi: 'Chúng tôi đã rà soát bản đề xuất cuối và bộ phận pháp chế không có ý kiến phản đối nào. Các bước tiếp theo để khởi động là gì?',
        suggestedReplies: [
          {
            en: 'That is wonderful news. Once the agreement is signed today, our onboarding lead will host a kickoff call on Wednesday.',
            ipa: '',
            vi: 'Đó là tin rất tuyệt vời. Ngay khi hợp đồng được ký hôm nay, trưởng nhóm triển khai sẽ tổ chức buổi họp khởi động vào thứ Tư.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Who should join from our side to ensure a smooth handover?',
        ipa: '',
        vi: 'Phía chúng tôi nên cử ai tham gia để quá trình bàn giao diễn ra suôn sẻ?',
        suggestedReplies: [
          {
            en: 'Having your operations manager and IT contact join will help us configure permissions and hit your target launch date.',
            ipa: '',
            vi: 'Có quản lý vận hành và đầu mối IT bên anh/chị tham gia sẽ giúp chúng tôi phân quyền nhanh và kịp ngày ra mắt dự kiến.',
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 7. Phỏng vấn & Nhân sự (rp-129 .. rp-148)
  // ============================================================================
  {
    id: 'rp-129',
    title: 'Báo Tên Tại Quầy Lễ Tân Khi Đi Phỏng Vấn',
    level: 'A1',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Bạn vừa tới văn phòng công ty để dự buổi phỏng vấn buổi sáng và gặp lễ tân.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good morning! Welcome to Bright Office. How can I help you?',
        ipa: '',
        vi: 'Chào buổi sáng! Chào mừng đến Bright Office. Tôi có thể giúp gì cho bạn?',
        suggestedReplies: [
          {
            en: 'Good morning! I am here for a job interview at ten o\'clock.',
            ipa: '',
            vi: 'Chào buổi sáng! Tôi đến tham gia buổi phỏng vấn lúc 10 giờ ạ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Sure! What is your full name, please? You can have a seat right there.',
        ipa: '',
        vi: 'Vâng! Cho tôi xin họ tên đầy đủ của bạn nhé? Bạn có thể ngồi đợi ở phía kia.',
        suggestedReplies: [
          {
            en: 'My name is Linh Tran. Thank you very much.',
            ipa: '',
            vi: 'Tên tôi là Trần Linh. Cảm ơn bạn rất nhiều ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-130',
    title: 'Giới Thiệu Quê Quán & Chuyên Ngành Học',
    level: 'A1',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Nhà tuyển dụng mở đầu buổi trao đổi bằng câu hỏi cơ bản về quê quán và ngành học.',
    turns: [
      {
        speaker: 'AI',
        en: 'Nice to meet you, Nam. Where are you from?',
        ipa: '',
        vi: 'Rất vui được gặp bạn, Nam. Bạn quê ở đâu vậy?',
        suggestedReplies: [
          {
            en: 'Nice to meet you too. I am from Da Nang, and I live in Hanoi now.',
            ipa: '',
            vi: 'Tôi cũng rất vui được gặp anh/chị. Tôi quê ở Đà Nẵng và hiện đang sống tại Hà Nội.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'What did you study at university?',
        ipa: '',
        vi: 'Ở trường đại học bạn đã theo học ngành gì?',
        suggestedReplies: [
          {
            en: 'I studied business administration and graduated last June.',
            ipa: '',
            vi: 'Tôi học quản trị kinh doanh và mới tốt nghiệp tháng Sáu năm ngoái.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-131',
    title: 'Kể Ngắn Gọn Về Công Việc Trước Đây',
    level: 'A1',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Bạn đang trả lời câu hỏi về kinh nghiệm làm việc đầu tiên trong buổi phỏng vấn.',
    turns: [
      {
        speaker: 'AI',
        en: 'Tell me about your last job. Where did you work?',
        ipa: '',
        vi: 'Hãy kể cho tôi nghe về công việc gần nhất của bạn. Bạn từng làm ở đâu?',
        suggestedReplies: [
          {
            en: 'I worked at a bookshop as a sales assistant for one year.',
            ipa: '',
            vi: 'Tôi từng làm nhân viên bán hàng tại một hiệu sách trong một năm.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Did you enjoy working with customers there?',
        ipa: '',
        vi: 'Bạn có thích làm việc và tiếp xúc với khách hàng ở đó không?',
        suggestedReplies: [
          {
            en: 'Yes, I liked talking to people and helping them find books.',
            ipa: '',
            vi: 'Có ạ, tôi thích trò chuyện với mọi người và giúp họ tìm sách.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-132',
    title: 'Hỏi Giờ Làm Việc & Nghỉ Trưa',
    level: 'A1',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Cuối buổi phỏng vấn, nhà tuyển dụng mời bạn đặt câu hỏi về lịch làm việc hằng ngày.',
    turns: [
      {
        speaker: 'AI',
        en: 'Do you have any questions for me about this job?',
        ipa: '',
        vi: 'Bạn có câu hỏi nào dành cho tôi về công việc này không?',
        suggestedReplies: [
          {
            en: 'Yes! What are the working hours from Monday to Friday?',
            ipa: '',
            vi: 'Có ạ! Giờ làm việc từ thứ Hai đến thứ Sáu như thế nào ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'We work from nine AM to five PM, with one hour for lunch.',
        ipa: '',
        vi: 'Chúng tôi làm từ 9 giờ sáng đến 5 giờ chiều, nghỉ trưa một tiếng.',
        suggestedReplies: [
          {
            en: 'That schedule is great for me. Thank you!',
            ipa: '',
            vi: 'Lịch làm việc đó rất phù hợp với tôi. Cảm ơn anh/chị ạ!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-133',
    title: 'Đón Nhân Viên Mới Ngày Đầu Đi Làm',
    level: 'A1',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Bạn là nhân sự hỗ trợ đồng nghiệp mới tìm bàn làm việc và nhận thẻ ra vào trong ngày đầu tiên.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi! Today is my first day here. Where is my desk?',
        ipa: '',
        vi: 'Chào bạn! Hôm nay là ngày đầu tiên tôi đi làm. Bàn của tôi ở đâu thế?',
        suggestedReplies: [
          {
            en: 'Welcome to the team! Your desk is near the window on the left.',
            ipa: '',
            vi: 'Chào mừng gia nhập đội ngũ! Bàn của bạn ở gần cửa sổ bên phía tay trái nhé.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Thank you. Where can I get my office ID badge?',
        ipa: '',
        vi: 'Cảm ơn bạn. Tôi lấy thẻ ra vào văn phòng ở đâu nhỉ?',
        suggestedReplies: [
          {
            en: 'Wait one minute, please. I will bring your badge right now.',
            ipa: '',
            vi: 'Bạn đợi một phút nhé. Tôi sẽ mang thẻ qua cho bạn ngay bây giờ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-134',
    title: 'Trả Lời Lý Do Muốn Gia Nhập Công Ty',
    level: 'A2',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Nhà tuyển dụng muốn biết lý do bạn nộp đơn vào vị trí này và kỹ năng bạn mang lại.',
    turns: [
      {
        speaker: 'AI',
        en: 'Why are you interested in working for our company?',
        ipa: '',
        vi: 'Vì sao bạn quan tâm và muốn làm việc tại công ty chúng tôi?',
        suggestedReplies: [
          {
            en: 'I really like your mobile app, and I want to grow in a supportive team.',
            ipa: '',
            vi: 'Tôi rất thích ứng dụng di động của công ty và muốn phát triển trong một tập thể hỗ trợ nhau.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'What practical skills can you bring to this role right away?',
        ipa: '',
        vi: 'Bạn có thể mang lại những kỹ năng thực tế nào cho vị trí này ngay lập tức?',
        suggestedReplies: [
          {
            en: 'I am very organized, good with spreadsheets, and always meet my deadlines.',
            ipa: '',
            vi: 'Tôi làm việc ngăn nắp, thành thạo bảng tính và luôn hoàn thành công việc đúng hạn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-135',
    title: 'Xin Quản Lý Nghỉ Phép Có Bàn Giao',
    level: 'A2',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Bạn gặp trưởng nhóm xin nghỉ phép hai ngày vào tuần tới và báo người hỗ trợ thay.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi Hoa, you said you wanted to talk to me about next week?',
        ipa: '',
        vi: 'Chào Hoa, em bảo muốn trao đổi với anh về lịch tuần tới đúng không?',
        suggestedReplies: [
          {
            en: 'Yes, could I take two days off next Thursday and Friday for a family event?',
            ipa: '',
            vi: 'Vâng, em có thể xin nghỉ hai ngày thứ Năm và thứ Sáu tuần tới để dự việc gia đình không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let me check our team calendar. Who will cover your daily tasks while you are away?',
        ipa: '',
        vi: 'Để anh xem lịch nhóm nhé. Ai sẽ hỗ trợ xử lý các đầu việc hằng ngày giúp em lúc em nghỉ?',
        suggestedReplies: [
          {
            en: 'Tuan agreed to watch my inbox, and I will finish my weekly report on Wednesday.',
            ipa: '',
            vi: 'Tuấn đã nhận lời theo dõi email giúp em, còn báo cáo tuần em sẽ hoàn tất vào thứ Tư ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-136',
    title: 'Xác Nhận Lịch Phỏng Vấn Vòng Hai',
    level: 'A2',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Chuyên viên nhân sự gọi điện thông báo bạn đã qua vòng hồ sơ và mời hẹn lịch phỏng vấn trực tiếp.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello, this is Emily from Bright Tech HR. Are you free for a second interview next Tuesday?',
        ipa: '',
        vi: 'Xin chào, tôi là Emily từ phòng Nhân sự Bright Tech. Bạn có rảnh phỏng vấn vòng hai vào thứ Ba tuần tới không?',
        suggestedReplies: [
          {
            en: 'Thank you for calling! Yes, Tuesday morning works very well for me.',
            ipa: '',
            vi: 'Cảm ơn chị đã gọi báo tin! Vâng, sáng thứ Ba rất thuận tiện với tôi ạ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Great, would you prefer a video call or coming to our downtown office?',
        ipa: '',
        vi: 'Tuyệt quá, bạn muốn gọi video trực tuyến hay đến văn phòng ở trung tâm?',
        suggestedReplies: [
          {
            en: 'I prefer coming to your office so I can meet the team in person.',
            ipa: '',
            vi: 'Tôi thích đến văn phòng hơn để có thể gặp trực tiếp mọi người trong nhóm.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-137',
    title: 'Chia Sẻ Kỹ Năng Đang Cố Gắng Cải Thiện',
    level: 'A2',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Nhà tuyển dụng hỏi về một điểm còn hạn chế của bạn và cách bạn tự khắc phục.',
    turns: [
      {
        speaker: 'AI',
        en: 'Everyone has areas to grow. What is one work skill you are trying to improve?',
        ipa: '',
        vi: 'Ai cũng có điểm cần phát triển thêm. Kỹ năng công việc nào bạn đang cố gắng cải thiện?',
        suggestedReplies: [
          {
            en: 'Sometimes I get nervous when speaking in front of a large group.',
            ipa: '',
            vi: 'Đôi khi tôi hơi hồi hộp khi phải phát biểu trước một nhóm đông người.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'How are you working on building your confidence right now?',
        ipa: '',
        vi: 'Hiện tại bạn đang rèn luyện sự tự tin đó bằng cách nào?',
        suggestedReplies: [
          {
            en: 'I practice short talks with my coworkers every Friday so I feel calmer.',
            ipa: '',
            vi: 'Tôi tập trình bày ngắn với đồng nghiệp vào mỗi thứ Sáu để giữ bình tĩnh tốt hơn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-138',
    title: 'Hỏi Về Thời Gian Thử Việc & Chế Độ',
    level: 'A2',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Bộ phận nhân sự gửi thư mời nhận việc và giải đáp thắc mắc của bạn về hợp đồng thử việc.',
    turns: [
      {
        speaker: 'AI',
        en: 'We would love to offer you the coordinator role. Do you have any questions about the contract?',
        ipa: '',
        vi: 'Chúng tôi rất vui được mời bạn đảm nhận vị trí điều phối viên. Bạn có thắc mắc gì về hợp đồng không?',
        suggestedReplies: [
          {
            en: 'Thank you so much! How long is the probation period for this position?',
            ipa: '',
            vi: 'Cảm ơn công ty rất nhiều! Thời gian thử việc cho vị trí này kéo dài bao lâu ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'It lasts two months, and after that you receive full health insurance and twelve paid leave days.',
        ipa: '',
        vi: 'Thử việc kéo dài hai tháng, sau đó bạn sẽ hưởng đầy đủ bảo hiểm y tế và 12 ngày phép năm có lương.',
        suggestedReplies: [
          {
            en: 'That is very clear. When should I come in to sign the offer letter?',
            ipa: '',
            vi: 'Thông tin rất rõ ràng ạ. Khi nào tôi có thể lên ký thư mời nhận việc?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-139',
    title: 'Kể Tình Huống Xử Lý Sự Cố Tại Chỗ Làm',
    level: 'B1',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Bạn trả lời câu hỏi phỏng vấn hành vi về lần tự giải quyết một rắc rối bất ngờ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Can you share a time when you solved an unexpected problem at work?',
        ipa: '',
        vi: 'Bạn có thể chia sẻ một lần bạn tự giải quyết một sự cố bất ngờ tại nơi làm việc không?',
        suggestedReplies: [
          {
            en: 'Last year, a key print vendor missed our event deadline, so I quickly sourced a reliable local backup shop.',
            ipa: '',
            vi: 'Năm ngoái một nhà in chính trễ hẹn trước ngày sự kiện, nên tôi đã nhanh chóng tìm được xưởng in dự phòng uy tín gần đó.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'How did your manager react to the way you handled the situation?',
        ipa: '',
        vi: 'Quản lý của bạn đã phản ứng thế nào trước cách bạn xử lý tình huống đó?',
        suggestedReplies: [
          {
            en: 'My manager appreciated the fast response because the event launched on time without any missing materials.',
            ipa: '',
            vi: 'Quản lý rất đánh giá cao phản ứng nhanh của tôi vì sự kiện vẫn diễn ra đúng giờ và đủ tài liệu.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-140',
    title: 'Giải Quyết Bất Đồng Ý Kiến Với Đồng Nghiệp',
    level: 'B1',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Nhà tuyển dụng hỏi cách bạn giữ hòa khí và thống nhất phương án khi bất đồng quan điểm trong nhóm.',
    turns: [
      {
        speaker: 'AI',
        en: 'What do you usually do when you disagree with a teammate about a project direction?',
        ipa: '',
        vi: 'Bạn thường làm gì khi bất đồng ý kiến với đồng nghiệp về hướng đi của một dự án?',
        suggestedReplies: [
          {
            en: 'I listen to their reasoning first, then share data so we can compare both options objectively.',
            ipa: '',
            vi: 'Tôi lắng nghe lập luận của họ trước, rồi đưa ra số liệu để cả hai so sánh hai phương án một cách khách quan.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'What if both of you still feel strongly about your own ideas?',
        ipa: '',
        vi: 'Vậy nếu cả hai bên vẫn giữ nguyên quan điểm của mình thì sao?',
        suggestedReplies: [
          {
            en: 'Then we ask our team lead for input or run a small pilot test to see which approach performs better.',
            ipa: '',
            vi: 'Khi đó chúng tôi sẽ xin góc nhìn của trưởng nhóm hoặc thử nghiệm nhỏ xem phương án nào hiệu quả hơn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-141',
    title: 'Trao Đổi Trong Buổi Đánh Giá Giữa Năm',
    level: 'B1',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Bạn và quản lý trực tiếp tổng kết thành tích nửa đầu năm và đặt mục tiêu đào tạo sắp tới.',
    turns: [
      {
        speaker: 'AI',
        en: 'Your client reports have been strong this half. Which achievement are you proudest of?',
        ipa: '',
        vi: 'Các báo cáo khách hàng của em nửa đầu năm nay rất tốt. Em tự hào nhất về thành tích nào?',
        suggestedReplies: [
          {
            en: 'Thank you. I am proudest of cutting weekly report prep time by thirty percent using new templates.',
            ipa: '',
            vi: 'Em cảm ơn anh/chị. Em tự hào nhất là rút ngắn được 30% thời gian làm báo cáo tuần nhờ bộ mẫu mới.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'What kind of support would help you reach your goals for the rest of the year?',
        ipa: '',
        vi: 'Sự hỗ trợ nào sẽ giúp em đạt được các mục tiêu trong nửa cuối năm?',
        suggestedReplies: [
          {
            en: 'I would love to take a presentation workshop and gradually lead more client review calls.',
            ipa: '',
            vi: 'Em rất muốn tham gia khóa kỹ năng thuyết trình và dần chủ trì thêm các buổi họp rà soát với khách hàng.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-142',
    title: 'Giải Thích Khoảng Trống Nghỉ Việc Trong CV',
    level: 'B1',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Nhà tuyển dụng hỏi về giai đoạn sáu tháng tạm ngưng làm việc toàn thời gian trên hồ sơ của bạn.',
    turns: [
      {
        speaker: 'AI',
        en: 'I noticed a six-month gap on your resume last year. Could you tell me what you were doing then?',
        ipa: '',
        vi: 'Tôi thấy trên CV của bạn có khoảng trống sáu tháng vào năm ngoái. Bạn có thể chia sẻ thời gian đó bạn làm gì không?',
        suggestedReplies: [
          {
            en: 'I took time off to care for a family member while completing two online project management certificates.',
            ipa: '',
            vi: 'Tôi tạm nghỉ để chăm sóc người thân trong gia đình, đồng thời hoàn thành hai chứng chỉ quản lý dự án trực tuyến.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Everything sounds well-balanced. Are you ready to commit to a full-time schedule again?',
        ipa: '',
        vi: 'Nghe rất hợp lý. Hiện tại bạn đã sẵn sàng quay lại lịch làm việc toàn thời gian chưa?',
        suggestedReplies: [
          {
            en: 'Yes, everything at home is settled now, and I am eager to jump back into full-time work.',
            ipa: '',
            vi: 'Vâng, mọi việc ở nhà đã ổn định hoàn toàn rồi và tôi rất háo hức quay lại làm việc toàn thời gian.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-143',
    title: 'Phỏng Vấn Năng Lực Làm Việc Từ Xa',
    level: 'B1',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Bạn ứng tuyển vị trí làm việc từ xa và chia sẻ cách giữ kỷ luật, giao tiếp qua tin nhắn.',
    turns: [
      {
        speaker: 'AI',
        en: 'This role is fully remote across different time zones. How do you stay focused when working from home?',
        ipa: '',
        vi: 'Vị trí này làm việc từ xa hoàn toàn qua nhiều múi giờ. Bạn giữ sự tập trung ở nhà bằng cách nào?',
        suggestedReplies: [
          {
            en: 'I keep a dedicated desk, list my top three priorities each morning, and update teammates clearly in chat.',
            ipa: '',
            vi: 'Tôi bố trí bàn làm việc riêng, liệt kê ba ưu tiên chính mỗi sáng và cập nhật tiến độ rõ ràng cho nhóm trên kênh chat.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'How do you prevent misunderstandings when almost everything happens in writing?',
        ipa: '',
        vi: 'Bạn làm sao để tránh hiểu lầm khi gần như mọi trao đổi đều qua văn bản?',
        suggestedReplies: [
          {
            en: 'Whenever a thread gets confusing, I suggest a quick ten-minute video call so everyone aligns right away.',
            ipa: '',
            vi: 'Mỗi khi chuỗi tin nhắn trở nên rối, tôi chủ động đề xuất gọi video nhanh 10 phút để cả nhóm thống nhất ngay.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-144',
    title: 'Thương Lượng Mức Lương Sau Khi Nhận Offer',
    level: 'B2',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Bạn nhận được lời mời làm việc nhưng muốn thương lượng mức lương phù hợp hơn với kinh nghiệm.',
    turns: [
      {
        speaker: 'AI',
        en: 'We are thrilled to extend an offer at two thousand dollars a month. How does that package look to you?',
        ipa: '',
        vi: 'Chúng tôi rất vui gửi bạn thư mời với mức lương 2.000 đô la mỗi tháng. Bạn thấy gói đãi ngộ này thế nào?',
        suggestedReplies: [
          {
            en: 'Thank you, I am genuinely excited about joining. Given my five years in this field, I was hoping for closer to two thousand three hundred.',
            ipa: '',
            vi: 'Cảm ơn anh/chị, tôi thực sự hào hứng được gia nhập công ty. Với năm năm kinh nghiệm trong ngành, tôi kỳ vọng mức gần 2.300 đô la hơn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Our base salary ceiling for this band is two thousand one hundred, though we do offer a quarterly performance bonus.',
        ipa: '',
        vi: 'Mức trần lương cơ bản cho bậc này là 2.100 đô la, tuy nhiên công ty có thêm thưởng hiệu suất theo quý.',
        suggestedReplies: [
          {
            en: 'If we can settle on two thousand one hundred with a formal compensation review after six months, I would be happy to accept.',
            ipa: '',
            vi: 'Nếu chúng ta chốt mức 2.100 đô la kèm kỳ đánh giá điều chỉnh lương sau sáu tháng, tôi rất sẵn lòng nhận lời.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-145',
    title: 'Trả Lời Tình Huống Quản Lý Nhóm Quá Tải',
    level: 'B2',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Phỏng vấn viên đặt tình huống giả định cho vị trí trưởng nhóm khi hai dự án gấp dồn cùng tuần.',
    turns: [
      {
        speaker: 'AI',
        en: 'Imagine two urgent client deadlines land in the same week, and your team is stretched thin. How would you lead?',
        ipa: '',
        vi: 'Giả sử hai hạn chót gấp của khách hàng rơi vào cùng một tuần và nhóm bạn đang quá tải. Bạn sẽ dẫn dắt thế nào?',
        suggestedReplies: [
          {
            en: 'I would audit task impact immediately, renegotiate lower-priority items with stakeholders, and shield the team from non-essential meetings.',
            ipa: '',
            vi: 'Tôi sẽ rà soát ngay mức độ ảnh hưởng từng đầu việc, thương lượng giãn các hạng mục ít ưu tiên và cắt bớt họp không cần thiết cho nhóm.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'How would you maintain morale if a few late evenings became unavoidable?',
        ipa: '',
        vi: 'Bạn sẽ giữ tinh thần đội ngũ ra sao nếu buộc phải tăng ca vài buổi tối?',
        suggestedReplies: [
          {
            en: 'I would stay hands-on alongside them, explain clearly why the push matters, and guarantee paid time off right after delivery.',
            ipa: '',
            vi: 'Tôi sẽ trực tiếp xắn tay làm cùng anh em, giải thích rõ tầm quan trọng của đợt chạy nước rút và đảm bảo nghỉ bù ngay sau khi bàn giao.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-146',
    title: 'Góp Ý Nhân Viên Thường Xuyên Trễ Hạn',
    level: 'B2',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Bạn đóng vai quản lý trao đổi 1-1 mang tính xây dựng với nhân viên gần đây hay nộp báo cáo muộn.',
    turns: [
      {
        speaker: 'AI',
        en: 'You wanted to catch up? I know my last two weekly reports were late—things have just been hectic.',
        ipa: '',
        vi: 'Anh muốn trao đổi với em à? Em biết hai báo cáo tuần vừa rồi bị trễ—mấy hôm nay việc dồn quá.',
        suggestedReplies: [
          {
            en: 'I appreciate your effort on client work, though missing Friday deadlines delays the finance review for the whole department.',
            ipa: '',
            vi: 'Anh ghi nhận nỗ lực của em ở mảng khách hàng, nhưng việc trễ hạn thứ Sáu đang làm chậm khâu rà soát tài chính của cả phòng.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Honestly, I have been struggling to balance sudden requests with the routine reporting.',
        ipa: '',
        vi: 'Thật lòng là em đang xoay xở không kịp giữa các yêu cầu phát sinh đột xuất và báo cáo định kỳ.',
        suggestedReplies: [
          {
            en: 'Let us block two protected hours every Thursday afternoon on your calendar and reprioritize incoming requests together.',
            ipa: '',
            vi: 'Vậy mình khóa cố định hai tiếng chiều thứ Năm trên lịch của em và cùng sắp xếp lại thứ tự ưu tiên các việc phát sinh nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-147',
    title: 'Đánh Giá Mức Độ Phù Hợp Văn Hóa Công Ty',
    level: 'B2',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Giám đốc bộ phận phỏng vấn bạn về phong cách đón nhận góp ý thẳng thắn trong môi trường tốc độ cao.',
    turns: [
      {
        speaker: 'AI',
        en: 'Our culture moves quickly and encourages blunt feedback across all levels. How comfortable are you in that environment?',
        ipa: '',
        vi: 'Văn hóa bên tôi vận hành nhanh và khuyến khích góp ý thẳng thắn ở mọi cấp. Bạn thấy mình có thoải mái với môi trường đó không?',
        suggestedReplies: [
          {
            en: 'I thrive in transparent teams, as long as direct feedback stays focused on the work rather than personal criticism.',
            ipa: '',
            vi: 'Tôi làm việc rất tốt trong môi trường minh bạch, miễn là góp ý thẳng thắn hướng vào hiệu quả công việc chứ không công kích cá nhân.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Can you give an example where tough feedback genuinely improved how you worked?',
        ipa: '',
        vi: 'Bạn có thể nêu một ví dụ khi lời góp ý gay gắt thực sự giúp bạn cải thiện cách làm việc không?',
        suggestedReplies: [
          {
            en: 'A former director told me my presentations buried the main point, so I learned to open every deck with a clear decision summary.',
            ipa: '',
            vi: 'Một giám đốc cũ từng nhận xét bài trình bày của tôi bị giấu ý chính, từ đó tôi tập thói quen mở đầu bằng tóm tắt quyết định rõ ràng.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-148',
    title: 'Phỏng Vấn Thôi Việc Thu Thập Phản Hồi',
    level: 'B2',
    category: 'Phỏng vấn & Nhân sự',
    context: 'Bạn là chuyên viên nhân sự thực hiện buổi trao đổi cuối cùng với nhân viên chuẩn bị nghỉ việc.',
    turns: [
      {
        speaker: 'AI',
        en: 'Thanks for meeting with me. Overall I learned a great deal here, even though it feels like time for a new chapter.',
        ipa: '',
        vi: 'Cảm ơn chị đã dành thời gian gặp em. Nhìn chung em học được rất nhiều ở đây, dù giờ là lúc chuyển sang chặng đường mới.',
        suggestedReplies: [
          {
            en: 'We are truly grateful for your contributions. To help us improve, what main factors shaped your decision to move on?',
            ipa: '',
            vi: 'Công ty thật sự trân trọng những đóng góp của em. Để giúp môi trường tốt hơn, những yếu tố chính nào đã ảnh hưởng tới quyết định nghỉ của em?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Mainly, there was no clear path to senior roles, and cross-team communication often felt fragmented.',
        ipa: '',
        vi: 'Chủ yếu là lộ trình lên vị trí cao hơn chưa rõ ràng, và việc phối hợp giữa các nhóm đôi lúc còn rời rạc.',
        suggestedReplies: [
          {
            en: 'That is really candid, useful insight. We are revising our career ladders this quarter, and I will share your feedback with leadership.',
            ipa: '',
            vi: 'Đây là chia sẻ rất thẳng thắn và giá trị. Quý này công ty đang điều chỉnh lại khung thăng tiến, chị sẽ chuyển góp ý này lên ban lãnh đạo.',
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 8. Y tế & Sức khỏe (rp-149 .. rp-168)
  // ============================================================================
  {
    id: 'rp-149',
    title: 'Đăng Ký Khám Bệnh Không Hẹn Trước',
    level: 'A1',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn đến phòng khám gần nhà khi chưa đặt lịch trước và trao đổi với nhân viên quầy tiếp nhận.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good morning. Do you have an appointment today?',
        ipa: '',
        vi: 'Chào buổi sáng. Hôm nay bạn có đặt lịch hẹn trước không?',
        suggestedReplies: [
          {
            en: 'No, I do not. Can I see a doctor this morning?',
            ipa: '',
            vi: 'Không, tôi chưa đặt ạ. Sáng nay tôi có thể khám bác sĩ được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Yes, you can. Please show me your ID card and phone number.',
        ipa: '',
        vi: 'Được ạ. Vui lòng cho tôi xem giấy tờ tùy thân và số điện thoại của bạn.',
        suggestedReplies: [
          {
            en: 'Here is my ID card. How long do I need to wait?',
            ipa: '',
            vi: 'Thẻ căn cước của tôi đây. Tôi cần đợi khoảng bao lâu ạ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-150',
    title: 'Mô Tả Triệu Chứng Đau Bụng Với Bác Sĩ',
    level: 'A1',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn vào phòng khám và mô tả cơn đau đơn giản cho bác sĩ biết.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello! Please sit down. Where does it hurt today?',
        ipa: '',
        vi: 'Chào bạn! Mời ngồi. Hôm nay bạn thấy đau ở đâu?',
        suggestedReplies: [
          {
            en: 'My stomach hurts, and I feel very tired today.',
            ipa: '',
            vi: 'Tôi bị đau bụng và hôm nay cảm thấy rất mệt ạ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Do you also have a fever or a cough?',
        ipa: '',
        vi: 'Bạn có bị sốt hay ho kèm theo không?',
        suggestedReplies: [
          {
            en: 'No fever, just a stomachache since last night.',
            ipa: '',
            vi: 'Không sốt ạ, chỉ đau bụng âm ỉ từ tối qua thôi.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-151',
    title: 'Mua Viên Ngậm Ho Tại Nhà Thuốc',
    level: 'A1',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn bị ho nhẹ và ghé hiệu thuốc để mua thuốc không kê đơn.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello, welcome to Green Pharmacy. How can I help you?',
        ipa: '',
        vi: 'Xin chào, chào mừng đến Nhà thuốc Xanh. Tôi có thể giúp gì cho bạn?',
        suggestedReplies: [
          {
            en: 'I have a cold. Do you have medicine for a cough?',
            ipa: '',
            vi: 'Tôi bị cảm lạnh. Bên mình có thuốc trị ho không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Yes, we have honey cough drops and syrup. Which one do you prefer?',
        ipa: '',
        vi: 'Có ạ, chúng tôi có viên ngậm mật ong và siro ho. Bạn muốn dùng loại nào?',
        suggestedReplies: [
          {
            en: 'I would like the cough drops, please. How much are they?',
            ipa: '',
            vi: 'Cho tôi lấy viên ngậm ho nhé. Giá bao nhiêu tiền vậy ạ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-152',
    title: 'Hỏi Liều Lượng Uống Thuốc Mỗi Ngày',
    level: 'A1',
    category: 'Y tế & Sức khỏe',
    context: 'Dược sĩ đưa túi thuốc và hướng dẫn bạn cách uống đúng giờ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Here is your medicine. Please read the label carefully.',
        ipa: '',
        vi: 'Thuốc của bạn đây. Hãy đọc kỹ nhãn hướng dẫn nhé.',
        suggestedReplies: [
          {
            en: 'How many pills do I take each day?',
            ipa: '',
            vi: 'Mỗi ngày tôi phải uống mấy viên vậy ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Take one pill in the morning and one at night after eating.',
        ipa: '',
        vi: 'Hãy uống một viên vào buổi sáng và một viên vào buổi tối sau khi ăn.',
        suggestedReplies: [
          {
            en: 'Okay, two pills a day after meals. Thank you very much!',
            ipa: '',
            vi: 'Vâng, hai viên một ngày sau bữa ăn. Cảm ơn bạn nhiều lắm!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-153',
    title: 'Đặt Lịch Hẹn Kiểm Tra Răng Định Kỳ',
    level: 'A1',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn gọi điện tới phòng khám nha khoa để hẹn lịch lấy cao răng và khám tổng quát.',
    turns: [
      {
        speaker: 'AI',
        en: 'Smile Dental Clinic, hello! How may I help you?',
        ipa: '',
        vi: 'Phòng khám Nha khoa Smile xin nghe! Tôi có thể giúp gì cho bạn?',
        suggestedReplies: [
          {
            en: 'Hi, I want to book a dental check-up this week.',
            ipa: '',
            vi: 'Chào bạn, tôi muốn đặt lịch kiểm tra răng trong tuần này.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'We have an opening on Friday at three PM. Is that okay?',
        ipa: '',
        vi: 'Chúng tôi có lịch trống vào thứ Sáu lúc 3 giờ chiều. Giờ đó có ổn với bạn không?',
        suggestedReplies: [
          {
            en: 'Yes, Friday at three PM is fine. My name is Minh.',
            ipa: '',
            vi: 'Được ạ, 3 giờ chiều thứ Sáu rất ổn. Tên tôi là Minh.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-154',
    title: 'Báo Trật Cổ Chân Khi Chạy Bộ',
    level: 'A2',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn bị lật cổ chân khi chạy bộ ngoài công viên và đến phòng khám kiểm tra.',
    turns: [
      {
        speaker: 'AI',
        en: 'What happened to your ankle? It looks quite swollen.',
        ipa: '',
        vi: 'Cổ chân của bạn bị làm sao vậy? Trông nó sưng khá to đấy.',
        suggestedReplies: [
          {
            en: 'I twisted it while running in the park about two hours ago.',
            ipa: '',
            vi: 'Tôi bị lật cổ chân lúc đang chạy bộ ở công viên khoảng hai tiếng trước.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Can you stand on that foot without feeling sharp pain?',
        ipa: '',
        vi: 'Bạn có đứng trụ lên bàn chân đó mà không thấy đau nhói không?',
        suggestedReplies: [
          {
            en: 'It hurts when I walk, so I tried not to put weight on it.',
            ipa: '',
            vi: 'Lúc bước đi nó đau lắm, nên tôi cố không dồn lực lên chân đó.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-155',
    title: 'Nghe Giải Thích Kết Quả Xét Nghiệm Máu',
    level: 'A2',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn quay lại phòng khám để nghe bác sĩ đọc kết quả xét nghiệm kiểm tra sức khỏe định kỳ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Your general blood test results came back from the lab this morning.',
        ipa: '',
        vi: 'Kết quả xét nghiệm máu tổng quát của bạn đã có từ phòng lab sáng nay rồi.',
        suggestedReplies: [
          {
            en: 'Thank you, doctor. Is everything normal with my results?',
            ipa: '',
            vi: 'Cảm ơn bác sĩ. Các chỉ số của tôi đều bình thường chứ ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Most numbers look healthy, though your vitamin D level is a bit low.',
        ipa: '',
        vi: 'Đa số các chỉ số đều khỏe mạnh, chỉ có lượng vitamin D hơi thấp một chút.',
        suggestedReplies: [
          {
            en: 'Should I take vitamin supplements or change what I eat?',
            ipa: '',
            vi: 'Tôi có nên uống thêm viên bổ sung hay thay đổi chế độ ăn không ạ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-156',
    title: 'Khai Báo Tiền Sử Dị Ứng Thuốc & Hải Sản',
    level: 'A2',
    category: 'Y tế & Sức khỏe',
    context: 'Y tá kiểm tra thông tin dị ứng và thuốc đang dùng của bạn trước khi bác sĩ kê đơn.',
    turns: [
      {
        speaker: 'AI',
        en: 'Before the doctor sees you, are you allergic to any medicine or food?',
        ipa: '',
        vi: 'Trước khi bác sĩ vào khám, bạn có bị dị ứng với loại thuốc hay thức ăn nào không?',
        suggestedReplies: [
          {
            en: 'Yes, I am allergic to shellfish, and penicillin gives me a skin rash.',
            ipa: '',
            vi: 'Có ạ, tôi bị dị ứng hải sản có vỏ, còn uống penicillin thì bị nổi mẩn đỏ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Thank you, I will mark that clearly on your chart. Are you taking any daily pills?',
        ipa: '',
        vi: 'Cảm ơn bạn, tôi sẽ ghi chú rõ vào hồ sơ. Hiện bạn có đang uống thuốc nào hằng ngày không?',
        suggestedReplies: [
          {
            en: 'Only mild allergy tablets when the weather gets dusty.',
            ipa: '',
            vi: 'Chỉ uống viên dị ứng nhẹ những hôm trời nhiều bụi thôi ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-157',
    title: 'Xin Giấy Nghỉ Ốm Nộp Cho Công Ty',
    level: 'A2',
    category: 'Y tế & Sức khỏe',
    context: 'Sau khi khám xong, bạn cần xin giấy xác nhận y tế để nộp phòng nhân sự công ty.',
    turns: [
      {
        speaker: 'AI',
        en: 'You have a viral fever, so please rest at home for two days and drink water.',
        ipa: '',
        vi: 'Bạn bị sốt siêu vi, hãy nghỉ ngơi ở nhà hai ngày và uống nhiều nước nhé.',
        suggestedReplies: [
          {
            en: 'Thank you, doctor. Could you give me a medical note for my workplace?',
            ipa: '',
            vi: 'Cảm ơn bác sĩ. Bác sĩ có thể cấp cho tôi giấy xác nhận nghỉ bệnh để nộp công ty không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Of course. Should I address it to a specific manager or leave it general?',
        ipa: '',
        vi: 'Tất nhiên rồi. Tôi nên ghi gửi riêng quản lý nào hay để mẫu chung?',
        suggestedReplies: [
          {
            en: 'Please include my full name and the two dates I need to rest.',
            ipa: '',
            vi: 'Nhờ bác sĩ ghi rõ họ tên tôi và hai ngày cần nghỉ ngơi là được ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-158',
    title: 'Đo Thị Lực & Chọn Kính Tại Tiệm Kính Thuốc',
    level: 'A2',
    category: 'Y tế & Sức khỏe',
    context: 'Gần đây mắt bạn hay mỏi khi nhìn màn hình nên đến tiệm kính đo lại độ cận.',
    turns: [
      {
        speaker: 'AI',
        en: 'Welcome to ClearView Optical. Would you like an eye exam today?',
        ipa: '',
        vi: 'Chào mừng đến tiệm kính ClearView. Hôm nay bạn muốn đo mắt phải không?',
        suggestedReplies: [
          {
            en: 'Yes, my eyes feel tired at work, so I want to check my glasses prescription.',
            ipa: '',
            vi: 'Vâng, dạo này làm việc mắt tôi hay mỏi nên muốn kiểm tra lại độ kính.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Your left eye changed slightly by half a degree. Would you like anti-blue-light lenses?',
        ipa: '',
        vi: 'Mắt trái của bạn tăng nhẹ 0,5 độ đấy. Bạn có muốn chọn tròng chống ánh sáng xanh không?',
        suggestedReplies: [
          {
            en: 'Yes, please! I look at a computer screen for eight hours a day.',
            ipa: '',
            vi: 'Có chứ ạ! Mỗi ngày tôi nhìn màn hình máy tính tới tám tiếng lận.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-159',
    title: 'Thảo Luận Chứng Mất Ngủ Kéo Dài Với Bác Sĩ',
    level: 'B1',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn đi khám vì bị khó ngủ nhiều tuần liền và trao đổi về thói quen sinh hoạt buổi tối.',
    turns: [
      {
        speaker: 'AI',
        en: 'You mentioned having trouble sleeping lately. How long has this been going on?',
        ipa: '',
        vi: 'Bạn có ghi là gần đây bị khó ngủ. Tình trạng này kéo dài bao lâu rồi?',
        suggestedReplies: [
          {
            en: 'For nearly three weeks now. I fall asleep late and wake up several times a night.',
            ipa: '',
            vi: 'Gần ba tuần nay rồi ạ. Tôi rất lâu mới vào giấc và nửa đêm hay tỉnh giấc nhiều lần.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Have you noticed higher stress at work or changed your evening screen and caffeine habits?',
        ipa: '',
        vi: 'Gần đây bạn có áp lực công việc hơn hay thay đổi thói quen dùng điện thoại, cà phê buổi chiều tối không?',
        suggestedReplies: [
          {
            en: 'Yes, I often answer work messages right before bed and sometimes drink coffee after four PM.',
            ipa: '',
            vi: 'Có ạ, tôi hay trả lời tin nhắn công việc ngay trước lúc ngủ và thỉnh thoảng uống cà phê sau 4 giờ chiều.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-160',
    title: 'Hỏi Dược Sĩ Về Tác Dụng Phụ Kháng Sinh',
    level: 'B1',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn nhận đơn thuốc kháng sinh lần đầu và hỏi kỹ dược sĩ về những điều cần lưu ý.',
    turns: [
      {
        speaker: 'AI',
        en: 'The doctor prescribed this antibiotic for seven days. Have you ever taken it before?',
        ipa: '',
        vi: 'Bác sĩ kê loại kháng sinh này dùng trong bảy ngày. Trước đây bạn từng uống thuốc này chưa?',
        suggestedReplies: [
          {
            en: 'No, this is my first time. Are there any common side effects I should watch out for?',
            ipa: '',
            vi: 'Chưa, đây là lần đầu ạ. Có tác dụng phụ phổ biến nào tôi cần lưu ý không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'It can cause mild stomach upset or drowsiness, so take it with food and avoid driving if sleepy.',
        ipa: '',
        vi: 'Thuốc có thể gây cồn cào nhẹ hoặc buồn ngủ, nên hãy uống cùng bữa ăn và tránh lái xe nếu thấy buồn ngủ.',
        suggestedReplies: [
          {
            en: 'Got it. Should I still finish the whole seven-day course even if I feel better after three days?',
            ipa: '',
            vi: 'Tôi rõ rồi. Tôi vẫn phải uống hết đủ bảy ngày ngay cả khi thấy đỡ sau ba ngày đúng không ạ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-161',
    title: 'Theo Dõi Phục Hồi Vật Lý Trị Liệu Vai',
    level: 'B1',
    category: 'Y tế & Sức khỏe',
    context: 'Chuyên viên vật lý trị liệu hỏi thăm tiến triển của khớp vai sau một tuần tập phục hồi tại nhà.',
    turns: [
      {
        speaker: 'AI',
        en: 'How has your shoulder felt since we started the stretching routine last week?',
        ipa: '',
        vi: 'Vai của bạn thấy thế nào kể từ khi bắt đầu bài tập kéo giãn tuần trước?',
        suggestedReplies: [
          {
            en: 'The morning stiffness has improved a lot, though lifting heavy grocery bags still feels tight.',
            ipa: '',
            vi: 'Cảm giác cứng vai buổi sáng đỡ hẳn rồi, nhưng lúc xách túi đồ nặng vẫn còn hơi căng.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That is encouraging progress. Have you been able to do the exercises twice daily at home?',
        ipa: '',
        vi: 'Đó là tiến triển rất khả quan đấy. Ở nhà bạn có duy trì tập đủ hai lần mỗi ngày không?',
        suggestedReplies: [
          {
            en: 'Yes, except for two busy days when I could only fit in one evening session before bed.',
            ipa: '',
            vi: 'Có ạ, trừ hai hôm bận quá tôi chỉ kịp tập một buổi tối trước khi đi ngủ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-162',
    title: 'Thanh Toán Bảo Hiểm Y Tế Trực Tiếp',
    level: 'B1',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn làm thủ tục bảo lãnh viện phí trực tiếp bằng thẻ bảo hiểm sức khỏe tại quầy thu ngân bệnh viện.',
    turns: [
      {
        speaker: 'AI',
        en: 'Your total consultation and lab fee comes to one hundred twenty dollars. Are you using health insurance?',
        ipa: '',
        vi: 'Tổng phí khám và xét nghiệm của bạn là 120 đô la. Bạn có sử dụng bảo hiểm y tế không?',
        suggestedReplies: [
          {
            en: 'Yes, here is my digital insurance card. Does your clinic support direct billing with this provider?',
            ipa: '',
            vi: 'Có ạ, thẻ bảo hiểm điện tử của tôi đây. Phòng khám có hỗ trợ bảo lãnh trực tiếp với hãng này không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'We do, though your policy has a twenty-dollar co-pay per outpatient visit.',
        ipa: '',
        vi: 'Có áp dụng ạ, tuy nhiên gói của bạn có mức đồng chi trả 20 đô la mỗi lần khám ngoại trú.',
        suggestedReplies: [
          {
            en: 'That is totally fine. Could you also print an itemized invoice for my personal records?',
            ipa: '',
            vi: 'Không vấn đề gì ạ. Cho tôi xin thêm bản hóa đơn chi tiết từng mục để lưu hồ sơ nhé?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-163',
    title: 'Tư Vấn Chế Độ Ăn Giảm Muối Cho Huyết Áp',
    level: 'B1',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn gặp chuyên gia dinh dưỡng để điều chỉnh thực đơn bữa trưa văn phòng giúp ổn định huyết áp.',
    turns: [
      {
        speaker: 'AI',
        en: 'Your doctor asked us to look at ways to lower your blood pressure naturally. What is a typical workday lunch for you?',
        ipa: '',
        vi: 'Bác sĩ có nhờ tôi tư vấn cách hạ huyết áp tự nhiên. Bữa trưa ngày đi làm thường lệ của bạn gồm những gì?',
        suggestedReplies: [
          {
            en: 'I usually grab instant noodles or fried rice near my office because I only get a thirty-minute break.',
            ipa: '',
            vi: 'Tôi hay ăn mì hoặc cơm chiên gần văn phòng vì giờ nghỉ trưa chỉ có 30 phút thôi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Those meals tend to pack a lot of hidden sodium. Could you swap two lunches a week for lighter options?',
        ipa: '',
        vi: 'Những món đó thường chứa rất nhiều muối ẩn. Bạn có thể đổi hai bữa trưa mỗi tuần sang món nhẹ hơn không?',
        suggestedReplies: [
          {
            en: 'Yes, I could pack chicken salads at home or ask restaurants to keep sauces on the side.',
            ipa: '',
            vi: 'Được ạ, tôi có thể tự chuẩn bị salad gà mang theo hoặc dặn quán để riêng nước sốt.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-164',
    title: 'Cân Nhắc Phẫu Thuật Hay Tập Phục Hồi Khớp Gối',
    level: 'B2',
    category: 'Y tế & Sức khỏe',
    context: 'Bác sĩ chuyên khoa chấn thương chỉnh hình đọc phim chụp cộng hưởng từ và đưa ra hai hướng điều trị.',
    turns: [
      {
        speaker: 'AI',
        en: 'The MRI confirms a small tear in your knee cartilage. We can try targeted rehab first or schedule keyhole surgery.',
        ipa: '',
        vi: 'Phim MRI xác nhận sụn chêm gối của bạn bị rách nhẹ. Ta có thể thử phục hồi chức năng chuyên sâu trước hoặc xếp lịch nội soi.',
        suggestedReplies: [
          {
            en: 'Before considering surgery, what are the realistic odds that physical therapy alone restores full mobility?',
            ipa: '',
            vi: 'Trước khi tính tới phẫu thuật, tỷ lệ thực tế mà vật lý trị liệu đơn thuần giúp hồi phục hoàn toàn khả năng vận động là bao nhiêu ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Around sixty percent of patients with your activity level recover smoothly after eight weeks of guided strength work.',
        ipa: '',
        vi: 'Khoảng 60% bệnh nhân có mức vận động như bạn hồi phục tốt sau tám tuần tập tăng sức mạnh có hướng dẫn.',
        suggestedReplies: [
          {
            en: 'In that case, I would prefer trying conservative rehab first and reassessing with another check-up if pain persists.',
            ipa: '',
            vi: 'Nếu vậy, tôi muốn ưu tiên tập phục hồi bảo tồn trước rồi tái khám đánh giá lại nếu cơn đau vẫn kéo dài.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-165',
    title: 'Gọi Tổng Đài Cấp Cứu Báo Đồng Nghiệp Ngất Xỉu',
    level: 'B2',
    category: 'Y tế & Sức khỏe',
    context: 'Một đồng nghiệp bất ngờ ngã quỵ tại văn phòng; bạn gọi cấp cứu cung cấp địa chỉ và tình trạng khẩn cấp.',
    turns: [
      {
        speaker: 'AI',
        en: 'Emergency medical dispatch, tell me your exact location and what is happening right now.',
        ipa: '',
        vi: 'Tổng đài cấp cứu y tế xin nghe, hãy báo địa chỉ chính xác và tình trạng đang xảy ra ngay lúc này.',
        suggestedReplies: [
          {
            en: 'We are at 42 Oak Street, fifth floor. A male coworker collapsed two minutes ago and is barely responsive.',
            ipa: '',
            vi: 'Chúng tôi ở tầng 5 số 42 phố Oak. Một nam đồng nghiệp vừa ngất xỉu cách đây hai phút và gần như không phản ứng.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'An ambulance is on the way. Is he breathing normally, and does he have any known medical conditions?',
        ipa: '',
        vi: 'Xe cứu thương đang tới. Anh ấy có thở bình thường không và có tiền sử bệnh lý nào đã biết không?',
        suggestedReplies: [
          {
            en: 'His breathing is shallow, and a teammate said he has severe diabetes. Someone is waiting downstairs to guide paramedics.',
            ipa: '',
            vi: 'Nhịp thở của anh ấy khá nông và một đồng nghiệp nói anh ấy bị tiểu đường nặng. Đã có người đứng dưới sảnh đón nhân viên y tế ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-166',
    title: 'Tư Vấn Tâm Lý Về Tình Trạng Kiệt Sức Nghề Nghiệp',
    level: 'B2',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn chia sẻ với chuyên viên tâm lý về trạng thái mệt mỏi tinh thần kéo dài dù đã nghỉ cuối tuần.',
    turns: [
      {
        speaker: 'AI',
        en: 'You mentioned feeling emotionally drained even after taking a quiet weekend off. How does that burnout show up for you?',
        ipa: '',
        vi: 'Bạn chia sẻ mình vẫn thấy cạn kiệt cảm xúc dù đã nghỉ ngơi cuối tuần. Trạng thái kiệt sức đó biểu hiện ở bạn như thế nào?',
        suggestedReplies: [
          {
            en: 'It feels like constant mental fog—even small routine emails seem overwhelming, and I have lost interest in hobbies.',
            ipa: '',
            vi: 'Cảm giác như đầu óc lúc nào cũng mù mịt—ngay cả vài email thường ngày cũng thấy quá tải và tôi không còn hứng thú với sở thích cũ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That is a classic sign your stress response has been running nonstop. Which boundary feels hardest to enforce at work?',
        ipa: '',
        vi: 'Đó là dấu hiệu điển hình cho thấy hệ thần kinh của bạn đang căng thẳng liên tục. Ranh giới nào trong công việc khiến bạn khó giữ nhất?',
        suggestedReplies: [
          {
            en: 'Turning down late-night urgent messages, because I worry colleagues might think I am not pulling my weight.',
            ipa: '',
            vi: 'Là việc từ chối tin nhắn gấp lúc tối muộn, vì tôi sợ đồng nghiệp nghĩ mình thiếu trách nhiệm với công việc chung.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-167',
    title: 'Giải Đáp Lo Ngại Phản Ứng Sau Tiêm Chủng',
    level: 'B2',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn là điều dưỡng giải thích khoa học và trấn an bệnh nhân đang băn khoăn trước mũi tiêm vắc xin mới.',
    turns: [
      {
        speaker: 'AI',
        en: 'I read online that this vaccine can trigger strong reactions, so I am honestly hesitant about getting it today.',
        ipa: '',
        vi: 'Tôi đọc trên mạng thấy bảo vắc xin này dễ gây phản ứng mạnh, nên thú thật hôm nay tôi hơi ngại tiêm.',
        suggestedReplies: [
          {
            en: 'It is completely natural to feel cautious. Most patients only notice mild arm soreness or a low fever for a day.',
            ipa: '',
            vi: 'Cảm giác thận trọng là hoàn toàn bình thường ạ. Đa số mọi người chỉ hơi nhức bắp tay hoặc sốt nhẹ trong khoảng một ngày thôi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'How will I distinguish between a normal immune response and something that actually requires medical care?',
        ipa: '',
        vi: 'Làm sao tôi phân biệt được đâu là phản ứng miễn dịch bình thường và đâu là dấu hiệu cần đi khám ngay?',
        suggestedReplies: [
          {
            en: 'Mild fatigue or chills within forty-eight hours are expected, whereas trouble breathing or persistent high fever warrants immediate care.',
            ipa: '',
            vi: 'Mệt nhẹ hay ớn lạnh trong 48 giờ đầu là bình thường, còn khó thở hoặc sốt cao kéo dài thì cần liên hệ cơ sở y tế ngay lập tức.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-168',
    title: 'Lập Kế Hoạch Chăm Sóc Người Thân Sau Xuất Viện',
    level: 'B2',
    category: 'Y tế & Sức khỏe',
    context: 'Bạn trao đổi với bác sĩ điều trị trước ngày ông nội xuất viện để nắm rõ dấu hiệu cảnh báo và cách thay băng.',
    turns: [
      {
        speaker: 'AI',
        en: 'Your grandfather is recovering steadily and should be cleared for discharge this Friday afternoon.',
        ipa: '',
        vi: 'Ông của bạn đang hồi phục ổn định và dự kiến có thể làm thủ tục xuất viện vào chiều thứ Sáu này.',
        suggestedReplies: [
          {
            en: 'That is a huge relief. What specific warning signs at home should prompt us to bring him back right away?',
            ipa: '',
            vi: 'Nghe vậy thật nhẹ nhõm quá. Khi về nhà có dấu hiệu cảnh báo cụ thể nào cần đưa ông quay lại viện ngay không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Watch closely for spreading redness around the incision, dizziness when standing, or a fever above thirty-eight degrees.',
        ipa: '',
        vi: 'Gia đình chú ý nếu vết mổ sưng đỏ lan rộng, ông bị chóng mặt khi đứng dậy hoặc sốt trên 38 độ nhé.',
        suggestedReplies: [
          {
            en: 'Understood. Could you also prepare a wound-care summary so our local clinic nurse can change his dressing properly?',
            ipa: '',
            vi: 'Tôi đã ghi nhớ kỹ ạ. Bác sĩ có thể cấp thêm bản tóm tắt chăm sóc vết mổ để y tá trạm y tế gần nhà thay băng đúng cách không ạ?',
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 9. Tài chính & Logistics (rp-169 .. rp-188)
  // ============================================================================
  {
    id: 'rp-169',
    title: 'Mở Tài Khoản Ngân Hàng Cá Nhân',
    level: 'A1',
    category: 'Tài chính & Logistics',
    context: 'Bạn đến quầy giao dịch ngân hàng để đăng ký mở tài khoản thanh toán cá nhân lần đầu.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good morning! Welcome to City Bank. How can I assist you?',
        ipa: '',
        vi: 'Chào buổi sáng! Chào mừng đến Ngân hàng City. Tôi có thể hỗ trợ gì cho bạn?',
        suggestedReplies: [
          {
            en: 'Hello! I would like to open a new bank account.',
            ipa: '',
            vi: 'Xin chào! Tôi muốn mở một tài khoản ngân hàng mới ạ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Sure! Please show me your passport or national ID card.',
        ipa: '',
        vi: 'Vâng ạ! Bạn vui lòng đưa tôi xem hộ chiếu hoặc căn cước công dân nhé.',
        suggestedReplies: [
          {
            en: 'Here is my ID card. Do I need to fill out a form?',
            ipa: '',
            vi: 'Căn cước của tôi đây ạ. Tôi có cần điền mẫu đơn nào không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-170',
    title: 'Kích Hoạt Thẻ Ngân Hàng Mới Tại Quầy',
    level: 'A1',
    category: 'Tài chính & Logistics',
    context: 'Bạn vừa nhận thẻ ghi nợ mới và nhờ nhân viên ngân hàng hướng dẫn kích hoạt, đặt mã PIN.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi! Are you here to pick up your new debit card?',
        ipa: '',
        vi: 'Chào bạn! Bạn đến nhận thẻ ghi nợ mới phải không?',
        suggestedReplies: [
          {
            en: 'Yes, I got a message that my card is ready today.',
            ipa: '',
            vi: 'Vâng, tôi nhận được tin nhắn báo hôm nay thẻ đã sẵn sàng.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Here is your card. Please enter a new six-digit PIN on the keypad.',
        ipa: '',
        vi: 'Thẻ của bạn đây. Hãy nhập mã PIN gồm sáu chữ số mới trên bàn phím nhé.',
        suggestedReplies: [
          {
            en: 'Done! Can I use my card at an ATM right now?',
            ipa: '',
            vi: 'Xong rồi ạ! Bây giờ tôi có thể dùng thẻ ở cây ATM ngay chưa?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-171',
    title: 'Hỏi Phí & Thời Gian Giao Hàng Nội Thành',
    level: 'A1',
    category: 'Tài chính & Logistics',
    context: 'Bạn mang một gói tài liệu đến quầy giao nhận nhanh để hỏi cước phí gửi trong nội thành.',
    turns: [
      {
        speaker: 'AI',
        en: 'Next, please! What do you want to ship today?',
        ipa: '',
        vi: 'Mời khách tiếp theo! Hôm nay bạn cần gửi gì vậy?',
        suggestedReplies: [
          {
            en: 'I want to send this envelope across town. How much is it?',
            ipa: '',
            vi: 'Tôi muốn gửi phong bì tài liệu này trong nội thành. Phí bao nhiêu ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Standard delivery is three dollars, or five dollars for same-day delivery.',
        ipa: '',
        vi: 'Giao tiêu chuẩn là 3 đô la, còn giao trong ngày là 5 đô la ạ.',
        suggestedReplies: [
          {
            en: 'Same-day delivery, please. What time will it arrive?',
            ipa: '',
            vi: 'Cho tôi gói giao trong ngày nhé. Khoảng mấy giờ sẽ tới nơi ạ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-172',
    title: 'Gọi Tổng Đài Khóa Thẻ ATM Bị Mất',
    level: 'A1',
    category: 'Tài chính & Logistics',
    context: 'Bạn phát hiện làm rơi ví nên gọi gấp cho tổng đài ngân hàng yêu cầu khóa thẻ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Thank you for calling Metro Bank support. How can I help?',
        ipa: '',
        vi: 'Cảm ơn bạn đã gọi hỗ trợ Ngân hàng Metro. Tôi giúp gì được cho bạn?',
        suggestedReplies: [
          {
            en: 'I lost my bank card! Can you block it right now?',
            ipa: '',
            vi: 'Tôi làm mất thẻ ngân hàng rồi! Bạn khóa thẻ giúp tôi ngay được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Yes, I can block it immediately. What is your full name and birthday?',
        ipa: '',
        vi: 'Được ạ, tôi khóa ngay lập tức. Cho tôi xin họ tên đầy đủ và ngày sinh của bạn?',
        suggestedReplies: [
          {
            en: 'My name is An Nguyen, born on May twelfth, nineteen ninety-five.',
            ipa: '',
            vi: 'Tên tôi là Nguyễn An, sinh ngày 12 tháng 5 năm 1995.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-173',
    title: 'Hỏi Phí Chuyển Tiền Quốc Tế Cho Người Thân',
    level: 'A1',
    category: 'Tài chính & Logistics',
    context: 'Bạn hỏi giao dịch viên ngân hàng về chi phí và thời gian gửi tiền sang Nhật cho em gái.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello! Are you sending money abroad today?',
        ipa: '',
        vi: 'Xin chào! Hôm nay bạn muốn chuyển tiền ra nước ngoài phải không?',
        suggestedReplies: [
          {
            en: 'Yes, I want to send five hundred dollars to Japan. What is the fee?',
            ipa: '',
            vi: 'Vâng, tôi muốn gửi 500 đô la sang Nhật Bản. Phí chuyển là bao nhiêu ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Our transfer fee is fifteen dollars, and it takes two business days.',
        ipa: '',
        vi: 'Phí chuyển là 15 đô la và mất khoảng hai ngày làm việc tiền sẽ tới nơi.',
        suggestedReplies: [
          {
            en: 'Okay, fifteen dollars is fine. Let us start the transfer.',
            ipa: '',
            vi: 'Vâng, phí 15 đô la cũng ổn ạ. Mình làm thủ tục chuyển tiền nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-174',
    title: 'Tra Cứu Mã Vận Đơn Chậm Cập Nhật',
    level: 'A2',
    category: 'Tài chính & Logistics',
    context: 'Đơn hàng giao nhận không cập nhật trạng thái hai ngày qua nên bạn gọi tổng đài hỏi nguyên nhân.',
    turns: [
      {
        speaker: 'AI',
        en: 'FastShip Logistics, how may I help you today?',
        ipa: '',
        vi: 'Kho vận FastShip xin nghe, hôm nay tôi có thể giúp gì cho bạn?',
        suggestedReplies: [
          {
            en: 'Hi, my tracking number is FS-4029, and it has not moved since Monday.',
            ipa: '',
            vi: 'Chào bạn, mã vận đơn của tôi là FS-4029 mà từ thứ Hai tới giờ không thấy di chuyển.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let me check our hub scan. Oh, it looks like the address label got torn in transit.',
        ipa: '',
        vi: 'Để tôi kiểm tra hệ thống kho nhé. Ồ, có vẻ tem địa chỉ bị rách trong lúc vận chuyển rồi.',
        suggestedReplies: [
          {
            en: 'Could I confirm my street address now so the driver can deliver it tomorrow?',
            ipa: '',
            vi: 'Tôi xác nhận lại địa chỉ nhà ngay bây giờ để tài xế giao vào ngày mai được không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-175',
    title: 'Xin Tăng Hạn Mức Chuyển Khoản Tạm Thời',
    level: 'A2',
    category: 'Tài chính & Logistics',
    context: 'Bạn cần thanh toán khoản đặt cọc lớn trong tuần nên đến ngân hàng nâng hạn mức chuyển khoản online.',
    turns: [
      {
        speaker: 'AI',
        en: 'Welcome to Premier Bank. How can we help you today?',
        ipa: '',
        vi: 'Chào mừng đến Ngân hàng Premier. Hôm nay chúng tôi hỗ trợ được gì cho bạn?',
        suggestedReplies: [
          {
            en: 'I need to raise my daily online transfer limit for a large payment this week.',
            ipa: '',
            vi: 'Tôi cần nâng hạn mức chuyển khoản online mỗi ngày để thanh toán khoản lớn trong tuần này.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Sure, we can update that. How high would you like your new daily limit to be?',
        ipa: '',
        vi: 'Được ạ, chúng tôi hỗ trợ điều chỉnh ngay. Bạn muốn đặt hạn mức mới mỗi ngày là bao nhiêu?',
        suggestedReplies: [
          {
            en: 'Could you set it to ten thousand dollars for the next three days?',
            ipa: '',
            vi: 'Bạn chỉnh lên 10.000 đô la trong ba ngày tới giúp tôi được không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-176',
    title: 'Đặt Lịch Xe Tải Đến Kho Lấy Hàng',
    level: 'A2',
    category: 'Tài chính & Logistics',
    context: 'Bạn gọi điều phối viên nhà xe để hẹn khung giờ xe tải vào kho bốc hàng hóa.',
    turns: [
      {
        speaker: 'AI',
        en: 'GreenLine Freight speaking. Are you ready to book a warehouse pickup?',
        ipa: '',
        vi: 'Vận tải GreenLine xin nghe. Bên bạn muốn đặt lịch xe đến lấy hàng tại kho phải không?',
        suggestedReplies: [
          {
            en: 'Yes, we have twelve pallets ready at Warehouse B. Can a truck come tomorrow morning?',
            ipa: '',
            vi: 'Đúng rồi, chúng tôi có 12 kiện pallet ở Kho B. Sáng mai xe tải qua lấy được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Our driver will be in your district between nine and eleven AM. Will your dock be open?',
        ipa: '',
        vi: 'Tài xế bên mình sẽ qua khu vực đó từ 9 đến 11 giờ sáng. Cửa kho bên bạn mở lúc đó chứ?',
        suggestedReplies: [
          {
            en: 'Yes, our warehouse staff arrives at eight thirty, and the loading bay is completely clear.',
            ipa: '',
            vi: 'Có ạ, nhân viên kho bên mình có mặt từ 8 giờ 30 và bãi bốc dỡ rất thoáng.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-177',
    title: 'Báo Giao Dịch Lạ Trên Thẻ Tín Dụng',
    level: 'A2',
    category: 'Tài chính & Logistics',
    context: 'Bạn phát hiện một khoản trừ tiền lạ trên ứng dụng ngân hàng và gọi bộ phận chống gian lận.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good afternoon, Card Security Desk speaking. Which transaction looks unfamiliar to you?',
        ipa: '',
        vi: 'Chào buổi chiều, bộ phận An ninh Thẻ xin nghe. Giao dịch nào bạn thấy bất thường vậy?',
        suggestedReplies: [
          {
            en: 'There is a charge of eighty-five dollars from an online game store yesterday, and I did not make it.',
            ipa: '',
            vi: 'Hôm qua có khoản trừ 85 đô la từ một cửa hàng game online mà tôi không hề thực hiện.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I will freeze that card right away and open a dispute claim for you.',
        ipa: '',
        vi: 'Tôi sẽ khóa thẻ đó ngay lập tức và mở hồ sơ tra soát hoàn tiền cho bạn.',
        suggestedReplies: [
          {
            en: 'Thank you. How many days will it take for a replacement card to reach my address?',
            ipa: '',
            vi: 'Cảm ơn bạn. Khoảng mấy ngày nữa thì thẻ thay thế sẽ được gửi về nhà tôi ạ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-178',
    title: 'Lập Biên Bản Kiện Hàng Bị Móp Méo',
    level: 'A2',
    category: 'Tài chính & Logistics',
    context: 'Khi nhận lô hàng văn phòng phẩm tại cửa công ty, bạn thấy hai thùng dưới đáy bị móp ướt.',
    turns: [
      {
        speaker: 'AI',
        en: 'Here are all ten cartons for your office. Could you please sign here on my tablet?',
        ipa: '',
        vi: 'Đây là đủ 10 thùng hàng cho văn phòng mình ạ. Bạn ký nhận giúp tôi lên máy tính bảng nhé?',
        suggestedReplies: [
          {
            en: 'Hold on a second—two cartons at the bottom look crushed and wet. Can we inspect them first?',
            ipa: '',
            vi: 'Đợi một chút—hai thùng dưới đáy trông bị móp và thấm nước. Mình mở kiểm tra trước được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Sure, go ahead and check. If anything inside is damaged, I can note it on the delivery slip.',
        ipa: '',
        vi: 'Vâng, bạn cứ kiểm tra đi. Nếu đồ bên trong bị hỏng thì tôi sẽ ghi chú vào phiếu giao nhận.',
        suggestedReplies: [
          {
            en: 'Thanks, let us take two photos together and write the damage note before I sign.',
            ipa: '',
            vi: 'Cảm ơn bạn, mình chụp chung vài tấm ảnh rồi ghi xác nhận hư hỏng trước khi tôi ký nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-179',
    title: 'Đàm Phán Cước Vận Chuyển Theo Sản Lượng Tháng',
    level: 'B1',
    category: 'Tài chính & Logistics',
    context: 'Cửa hàng online của bạn tăng số đơn đều đặn và đang đàm phán bảng giá mới với đơn vị chuyển phát.',
    turns: [
      {
        speaker: 'AI',
        en: 'We noticed your shop shipped over eighty parcels with us last month. How has our delivery service been?',
        ipa: '',
        vi: 'Bên mình thấy tháng trước shop bạn gửi hơn 80 kiện qua hãng mình. Dịch vụ giao hàng ổn chứ bạn?',
        suggestedReplies: [
          {
            en: 'Delivery speed has been reliable, though rising shipping rates are really squeezing our product margins.',
            ipa: '',
            vi: 'Tốc độ giao rất ổn định, chỉ có điều giá cước tăng đang khiến biên lợi nhuận sản phẩm của bên mình bị thu hẹp.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'If you commit to around one hundred twenty parcels a month, we can look at a volume discount tier.',
        ipa: '',
        vi: 'Nếu bên bạn cam kết khoảng 120 kiện mỗi tháng, mình có thể xét bậc chiết khấu theo sản lượng.',
        suggestedReplies: [
          {
            en: 'We expect to hit one hundred thirty parcels next quarter, so could you send me a revised rate card?',
            ipa: '',
            vi: 'Quý tới bên mình dự kiến đạt 130 kiện mỗi tháng, bạn gửi giúp mình bảng giá cước điều chỉnh nhé?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-180',
    title: 'Nộp Hồ Sơ Vay Vốn Mở Rộng Tiệm Bánh',
    level: 'B1',
    category: 'Tài chính & Logistics',
    context: 'Bạn gặp chuyên viên tín dụng ngân hàng trình bày mục đích vay vốn mua thiết bị mở rộng cửa tiệm.',
    turns: [
      {
        speaker: 'AI',
        en: 'Tell me a little about how your bakery plans to use the small business loan.',
        ipa: '',
        vi: 'Bạn chia sẻ thêm một chút về kế hoạch sử dụng khoản vay kinh doanh nhỏ của tiệm bánh nhé.',
        suggestedReplies: [
          {
            en: 'We want to buy a second commercial oven to double daily bread output for local cafes.',
            ipa: '',
            vi: 'Chúng tôi muốn mua thêm một lò nướng công nghiệp thứ hai để tăng gấp đôi sản lượng giao cho các quán cà phê quanh đây.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That sounds like a practical expansion. Which financial documents did you bring for the review?',
        ipa: '',
        vi: 'Nghe rất thực tế đấy. Hôm nay bạn đã mang theo những hồ sơ tài chính nào để thẩm định?',
        suggestedReplies: [
          {
            en: 'I brought twelve months of business bank statements, recent tax filings, and the equipment supplier quote.',
            ipa: '',
            vi: 'Tôi mang theo sao kê ngân hàng 12 tháng gần nhất, tờ khai thuế và báo giá từ nhà cung cấp lò nướng.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-181',
    title: 'Bổ Sung Chứng Từ Cho Lô Hàng Kẹt Hải Quan',
    level: 'B1',
    category: 'Tài chính & Logistics',
    context: 'Đại lý khai báo hải quan báo lô hàng nhập khẩu bị giữ lại cảng vì thiếu mã phân loại hàng hóa.',
    turns: [
      {
        speaker: 'AI',
        en: 'Your shipment arrived at the port, but customs placed a hold because the commercial invoice lacks HS codes.',
        ipa: '',
        vi: 'Lô hàng của bạn đã cập cảng nhưng hải quan tạm giữ do hóa đơn thương mại thiếu mã HS.',
        suggestedReplies: [
          {
            en: 'Thanks for flagging that so fast. If I email the updated invoice today, how soon can it clear?',
            ipa: '',
            vi: 'Cảm ơn bạn đã báo sớm. Nếu hôm nay tôi gửi lại hóa đơn bổ sung qua email thì mất bao lâu để thông quan?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Usually within twenty-four hours once customs verifies the matching packing list.',
        ipa: '',
        vi: 'Thường trong vòng 24 giờ sau khi hải quan đối chiếu khớp với bảng kê đóng gói.',
        suggestedReplies: [
          {
            en: 'Great, I will send both revised documents within the hour—please confirm once you file them.',
            ipa: '',
            vi: 'Tuyệt, trong một tiếng nữa tôi sẽ gửi cả hai chứng từ đã sửa—bạn xác nhận lại ngay khi nộp nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-182',
    title: 'Nhắc Thanh Toán Hóa Đơn Công Nợ Quá Hạn',
    level: 'B1',
    category: 'Tài chính & Logistics',
    context: 'Bạn làm kế toán gọi nhắc khéo bộ phận thanh toán của khách hàng về hóa đơn đã quá hạn mười ngày.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello, Accounts Payable speaking. Which invoice are you calling about today?',
        ipa: '',
        vi: 'Xin chào, phòng Kế toán Thanh toán xin nghe. Bạn gọi hỏi về hóa đơn nào vậy?',
        suggestedReplies: [
          {
            en: 'Hi, I am following up on Invoice 2045 for three thousand dollars, which was due on the tenth.',
            ipa: '',
            vi: 'Chào bạn, mình gọi kiểm tra hóa đơn số 2045 trị giá 3.000 đô la đã đến hạn thanh toán vào ngày mùng 10.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let me pull it up. Oh, it looks like our department lead has not approved the purchase order match yet.',
        ipa: '',
        vi: 'Để mình mở xem. Ồ, có vẻ trưởng bộ phận bên mình chưa bấm duyệt đối chiếu đơn đặt hàng.',
        suggestedReplies: [
          {
            en: 'No problem at all. Once it gets approved, could you let me know which payment batch it will be in?',
            ipa: '',
            vi: 'Không sao đâu ạ. Khi nào được duyệt, bạn báo giúp mình xem hóa đơn sẽ vào đợt chi trả nào nhé?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-183',
    title: 'Tư Vấn Lập Quỹ Dự Phòng Tài Chính Cá Nhân',
    level: 'B1',
    category: 'Tài chính & Logistics',
    context: 'Bạn gặp cố vấn tài chính để bàn cách phân bổ tiền tiết kiệm hằng tháng an toàn hơn.',
    turns: [
      {
        speaker: 'AI',
        en: 'You currently save about ten percent of your monthly income. What is your top financial goal this year?',
        ipa: '',
        vi: 'Hiện tại bạn tiết kiệm khoảng 10% thu nhập hằng tháng. Mục tiêu tài chính ưu tiên nhất năm nay của bạn là gì?',
        suggestedReplies: [
          {
            en: 'I want to build a six-month emergency fund before putting money into riskier investments.',
            ipa: '',
            vi: 'Tôi muốn tích đủ quỹ dự phòng sinh hoạt sáu tháng trước khi bỏ tiền vào các kênh đầu tư rủi ro hơn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That is a smart foundation. Have you considered keeping that cash in a high-yield savings account?',
        ipa: '',
        vi: 'Đó là nền tảng rất khôn ngoan. Bạn đã cân nhắc gửi khoản đó vào tài khoản tiết kiệm lãi suất tốt chưa?',
        suggestedReplies: [
          {
            en: 'Yes, as long as I can withdraw the money within one or two days without losing earned interest.',
            ipa: '',
            vi: 'Có chứ ạ, miễn là tôi vẫn rút được tiền trong một hoặc hai ngày khi cần mà không mất phần lãi đã tích lũy.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-184',
    title: 'Khiếu Nại Thiếu Hàng Trong Container Nhập Khẩu',
    level: 'B2',
    category: 'Tài chính & Logistics',
    context: 'Kho hàng của bạn dỡ container nhập khẩu và phát hiện thiếu hai thùng so với vận đơn và phiếu đóng gói.',
    turns: [
      {
        speaker: 'AI',
        en: 'We received your warehouse discrepancy report. Are you certain every pallet was unloaded from the container?',
        ipa: '',
        vi: 'Chúng tôi đã nhận báo cáo chênh lệch từ kho bên bạn. Bạn có chắc toàn bộ pallet đã được dỡ khỏi container chưa?',
        suggestedReplies: [
          {
            en: 'Yes, our team filmed the container seal opening and counted only forty-eight cartons instead of the fifty invoiced.',
            ipa: '',
            vi: 'Chắc chắn rồi, đội kho bên tôi đã quay video lúc cắt niêm phong chì và kiểm đếm chỉ có 48 thùng thay vì 50 thùng trên hóa đơn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let me audit our warehouse loading footage on this end. Would you prefer a credit note or replacement stock?',
        ipa: '',
        vi: 'Để tôi kiểm tra lại camera xếp hàng tại kho bên này. Bạn muốn nhận phiếu giảm trừ công nợ hay gửi bù hàng thiếu?',
        suggestedReplies: [
          {
            en: 'Since our retail launch is next week, please air-freight the two missing cartons at your cost or issue an immediate credit note.',
            ipa: '',
            vi: 'Vì tuần sau hệ thống bán lẻ mở bán rồi, nhờ bên bạn gửi bù hai thùng thiếu bằng đường hàng không hoặc xuất phiếu khấu trừ ngay lập tức.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-185',
    title: 'Đàm Phán Giãn Hạn Thanh Toán Net 60',
    level: 'B2',
    category: 'Tài chính & Logistics',
    context: 'Bạn đại diện bộ phận thu mua đề nghị nhà cung cấp bao bì đổi hạn công nợ từ 30 ngày lên 60 ngày.',
    turns: [
      {
        speaker: 'AI',
        en: 'Most of our wholesale accounts remain on Net 30 terms. What is driving your request to move to Net 60?',
        ipa: '',
        vi: 'Phần lớn khách sỉ bên tôi vẫn giữ điều khoản thanh toán 30 ngày. Điều gì khiến bên bạn đề xuất giãn lên 60 ngày?',
        suggestedReplies: [
          {
            en: 'Our retail chains settle on sixty-day cycles, so aligning vendor terms helps us maintain healthy cash flow as orders scale.',
            ipa: '',
            vi: 'Các chuỗi bán lẻ thanh toán cho chúng tôi theo chu kỳ 60 ngày, nên đồng bộ kỳ hạn với nhà cung cấp sẽ giúp dòng tiền ổn định khi tăng đơn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Extending to sixty days ties up our working capital unless we see higher guaranteed volume.',
        ipa: '',
        vi: 'Giãn lên 60 ngày sẽ giam vốn lưu động của chúng tôi, trừ khi sản lượng đơn hàng được cam kết cao hơn.',
        suggestedReplies: [
          {
            en: 'If you approve Net 60 on invoices over ten thousand dollars, we can consolidate all regional packaging orders with your plant.',
            ipa: '',
            vi: 'Nếu bên bạn duyệt Net 60 cho các hóa đơn trên 10.000 đô la, chúng tôi sẽ gom toàn bộ đơn bao bì khu vực về đặt tại nhà máy bạn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-186',
    title: 'Phòng Ngừa Rủi Ro Tỷ Giá Hợp Đồng Xuất Khẩu',
    level: 'B2',
    category: 'Tài chính & Logistics',
    context: 'Bạn trao đổi với giám đốc tài chính giải pháp bảo vệ biên lợi nhuận trước biến động tỷ giá ngoại tệ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Currency swings wiped out four percent of our margin on the European shipment last quarter. What options should we weigh?',
        ipa: '',
        vi: 'Biến động tỷ giá đã làm bốc hơi 4% biên lợi nhuận ở đơn hàng châu Âu quý vừa rồi. Ta nên cân nhắc phương án nào?',
        suggestedReplies: [
          {
            en: 'We could lock in a forward exchange contract for half the invoice value and shorten the validity window on new quotes.',
            ipa: '',
            vi: 'Mình có thể ký hợp đồng tỷ giá kỳ hạn cho một nửa giá trị hóa đơn và rút ngắn thời hạn hiệu lực của các báo giá mới.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Does locking in a forward rate expose us to extra fees if the buyer delays payment?',
        ipa: '',
        vi: 'Việc khóa tỷ giá kỳ hạn có khiến mình chịu thêm phí nếu bên mua thanh toán trễ hạn không?',
        suggestedReplies: [
          {
            en: 'Slightly, yes, so pairing the hedge with a thirty percent upfront deposit would shield us from late-payment risk.',
            ipa: '',
            vi: 'Có một chút phí điều chỉnh, nên kết hợp thêm điều khoản đặt cọc trước 30% sẽ bảo vệ mình khỏi rủi ro chậm thanh toán.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-187',
    title: 'Đề Xuất Kho Vệ Tinh Giảm Thời Gian Giao Hàng',
    level: 'B2',
    category: 'Tài chính & Logistics',
    context: 'Bạn họp cùng trưởng bộ phận chuỗi cung ứng để tối ưu thời gian giao hàng tới khu vực phía Đông.',
    turns: [
      {
        speaker: 'AI',
        en: 'East coast deliveries are averaging six days because every order still routes through our single central hub.',
        ipa: '',
        vi: 'Đơn hàng bờ Đông đang mất trung bình sáu ngày vì mọi kiện hàng vẫn phải đi qua một kho trung tâm duy nhất.',
        suggestedReplies: [
          {
            en: 'If we pre-stock fast-moving items at a regional fulfillment partner, could we cut transit time down to two days?',
            ipa: '',
            vi: 'Nếu mình gửi sẵn các mặt hàng bán chạy tại một kho đối tác khu vực, liệu có rút ngắn thời gian giao xuống hai ngày không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Transit time would definitely drop, though splitting inventory across two warehouses raises storage overhead.',
        ipa: '',
        vi: 'Thời gian vận chuyển chắc chắn giảm, nhưng chia tồn kho ra hai điểm sẽ làm tăng chi phí lưu kho.',
        suggestedReplies: [
          {
            en: 'Let us run a ninety-day pilot on our top twenty products to check whether faster shipping lifts repeat orders enough to cover storage.',
            ipa: '',
            vi: 'Vậy mình thử nghiệm 90 ngày với 20 sản phẩm chủ lực xem tốc độ giao nhanh có kéo tỷ lệ mua lại đủ bù chi phí kho không nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-188',
    title: 'Giải Trình Biên Lợi Nhuận Quý Trước Ban Điều Hành',
    level: 'B2',
    category: 'Tài chính & Logistics',
    context: 'Bạn trình bày nguyên nhân chi phí vận hành tăng mạnh dù doanh thu quý vừa qua vượt kế hoạch.',
    turns: [
      {
        speaker: 'AI',
        en: 'Revenue grew eighteen percent this quarter, yet operating profit stayed nearly flat. What drove the extra cost?',
        ipa: '',
        vi: 'Doanh thu quý này tăng 18%, vậy mà lợi nhuận hoạt động gần như đi ngang. Nguyên nhân nào đẩy chi phí tăng lên vậy?',
        suggestedReplies: [
          {
            en: 'Two temporary factors drove it: emergency air freight during port congestion and onboarding seasonal warehouse staff early.',
            ipa: '',
            vi: 'Có hai yếu tố tạm thời tác động: cước hàng không khẩn cấp lúc cảng tắc nghẽn và tuyển sớm nhân sự kho cho mùa cao điểm.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'How confident are you that margins will normalize once ocean shipping lanes clear next quarter?',
        ipa: '',
        vi: 'Bạn tự tin đến mức nào rằng biên lợi nhuận sẽ trở lại bình thường khi tuyến vận tải biển thông suốt ở quý tới?',
        suggestedReplies: [
          {
            en: 'Very confident—our fixed sea-freight contracts reset next month, which should restore roughly five points of gross margin.',
            ipa: '',
            vi: 'Rất tự tin ạ—các hợp đồng cước biển cố định sẽ có hiệu lực lại vào tháng tới, giúp khôi phục khoảng năm điểm phần trăm biên gộp.',
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 10. Giáo dục & Xã hội (rp-189 .. rp-208)
  // ============================================================================
  {
    id: 'rp-189',
    title: 'Đăng Ký Lớp Tiếng Anh Buổi Tối',
    level: 'A1',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn đến trung tâm ngoại ngữ gần nhà để hỏi lịch khai giảng lớp giao tiếp buổi tối.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello! Welcome to Bright Language Center. Are you looking for an English class?',
        ipa: '',
        vi: 'Xin chào! Chào mừng đến Trung tâm Ngoại ngữ Bright. Bạn đang tìm lớp học tiếng Anh đúng không?',
        suggestedReplies: [
          {
            en: 'Yes, I want to join an evening speaking class.',
            ipa: '',
            vi: 'Vâng, tôi muốn đăng ký một lớp luyện nói vào buổi tối.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'We have a class on Monday and Wednesday at seven PM. Does that work for you?',
        ipa: '',
        vi: 'Chúng tôi có lớp vào thứ Hai và thứ Tư lúc 7 giờ tối. Lịch đó có hợp với bạn không?',
        suggestedReplies: [
          {
            en: 'Yes, Monday and Wednesday evenings are good for me.',
            ipa: '',
            vi: 'Có ạ, tối thứ Hai và thứ Tư rất thuận tiện với tôi.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-190',
    title: 'Hỏi Lịch Thi & Phòng Thi Với Bạn Học',
    level: 'A1',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn gặp bạn cùng lớp ở hành lang để hỏi lại ngày giờ và phòng thi cuối kỳ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey Minh! Are you ready for the English exam next week?',
        ipa: '',
        vi: 'Chào Minh! Cậu chuẩn bị xong cho kỳ thi tiếng Anh tuần tới chưa?',
        suggestedReplies: [
          {
            en: 'Almost ready! What day is our exam, and which room is it in?',
            ipa: '',
            vi: 'Gần xong rồi! Bài thi của tụi mình vào thứ mấy và thi ở phòng nào thế?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'It is on Tuesday at nine AM in Room 204 on the second floor.',
        ipa: '',
        vi: 'Thi vào sáng thứ Ba lúc 9 giờ tại phòng 204 trên tầng hai đấy.',
        suggestedReplies: [
          {
            en: 'Tuesday at nine in Room 204. Got it, thank you!',
            ipa: '',
            vi: '9 giờ thứ Ba ở phòng 204. Mình nhớ rồi, cảm ơn cậu nhé!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-191',
    title: 'Tham Gia Nhóm Học Tiếng Anh Cuối Tuần',
    level: 'A1',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn lần đầu tham dự buổi sinh hoạt câu lạc bộ tiếng Anh tại quán sách và làm quen mọi người.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi! Is this your first time at our weekend English study group?',
        ipa: '',
        vi: 'Chào bạn! Đây là lần đầu bạn tới nhóm học tiếng Anh cuối tuần của bọn mình à?',
        suggestedReplies: [
          {
            en: 'Yes, it is! My name is Hoa. Nice to meet everyone.',
            ipa: '',
            vi: 'Đúng rồi! Mình tên là Hoa. Rất vui được làm quen với mọi người.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Welcome, Hoa! What do you like to practice most here?',
        ipa: '',
        vi: 'Chào mừng Hoa! Bạn thích luyện kỹ năng nào nhất khi tham gia ở đây?',
        suggestedReplies: [
          {
            en: 'I want to practice daily speaking and meet new friends.',
            ipa: '',
            vi: 'Mình muốn luyện nói giao tiếp hằng ngày và kết thêm bạn mới.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-192',
    title: 'Hỏi Giáo Viên Về Trang Bài Tập Về Nhà',
    level: 'A1',
    category: 'Giáo dục & Xã hội',
    context: 'Khi giờ học vừa kết thúc, bạn nán lại hỏi cô giáo xem hôm nay cần làm bài ở trang nào.',
    turns: [
      {
        speaker: 'AI',
        en: 'Class is finished for today! Do you have any questions before you go?',
        ipa: '',
        vi: 'Hôm nay lớp mình nghỉ ở đây nhé! Có em nào thắc mắc gì trước khi về không?',
        suggestedReplies: [
          {
            en: 'Excuse me, teacher. Which page is our homework on?',
            ipa: '',
            vi: 'Thưa cô, bài tập về nhà của tụi em ở trang nào ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Please do the short exercises on page twenty-four in your workbook.',
        ipa: '',
        vi: 'Các em làm các bài tập ngắn ở trang 24 trong sách bài tập nhé.',
        suggestedReplies: [
          {
            en: 'Page twenty-four. Thank you, teacher! Have a nice evening.',
            ipa: '',
            vi: 'Trang 24 ạ. Em cảm ơn cô! Chúc cô buổi tối vui vẻ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-193',
    title: 'Rủ Bạn Cùng Lớp Đi Cà Phê Thứ Bảy',
    level: 'A1',
    category: 'Giáo dục & Xã hội',
    context: 'Tan học chiều thứ Sáu, bạn rủ một người bạn cùng lớp đi uống cà phê và ôn bài vào sáng thứ Bảy.',
    turns: [
      {
        speaker: 'AI',
        en: 'I am so glad it is Friday! Do you have any plans for Saturday?',
        ipa: '',
        vi: 'Mừng quá cuối cùng cũng thứ Sáu rồi! Thứ Bảy cậu có kế hoạch gì chưa?',
        suggestedReplies: [
          {
            en: 'Not really. Would you like to get coffee with me on Saturday morning?',
            ipa: '',
            vi: 'Chưa có gì mấy. Sáng thứ Bảy cậu đi uống cà phê với mình không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That sounds great! What time should we meet?',
        ipa: '',
        vi: 'Nghe hay đấy! Mấy giờ tụi mình gặp nhau được nhỉ?',
        suggestedReplies: [
          {
            en: 'Let us meet at ten AM near the school library.',
            ipa: '',
            vi: 'Mình hẹn lúc 10 giờ sáng gần thư viện trường nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-194',
    title: 'Xin Giảng Viên Gia Hạn Nộp Bài Luận',
    level: 'A2',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn bị sốt hai ngày đầu tuần nên đến gặp giảng viên xin nộp bài tiểu luận trễ một ngày.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi Tuan, did you want to talk to me about Friday\'s essay?',
        ipa: '',
        vi: 'Chào Tuấn, em muốn trao đổi với thầy về bài tiểu luận thứ Sáu này phải không?',
        suggestedReplies: [
          {
            en: 'Yes, professor. I had a high fever this week, so could I submit my essay one day late?',
            ipa: '',
            vi: 'Dạ vâng thưa thầy. Tuần này em bị sốt cao nên em có thể xin nộp bài trễ một ngày được không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I hope you are feeling better now. Saturday at six PM is fine if you email it directly to me.',
        ipa: '',
        vi: 'Thầy mong em đã khỏe hơn rồi. 6 giờ chiều thứ Bảy cũng được, nhớ gửi thẳng qua email cho thầy nhé.',
        suggestedReplies: [
          {
            en: 'Thank you so much for understanding. I will email it before six PM on Saturday.',
            ipa: '',
            vi: 'Em cảm ơn thầy đã thông cảm ạ. Em sẽ gửi email trước 6 giờ chiều thứ Bảy.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-195',
    title: 'Đăng Ký Tình Nguyện Dọn Công Viên Cuối Tuần',
    level: 'A2',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn ghé bàn tuyển thành viên của câu lạc bộ xanh tại trường để đăng ký chiến dịch cuối tuần.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey there! Are you interested in joining our Sunday morning park cleanup?',
        ipa: '',
        vi: 'Chào bạn! Bạn có muốn tham gia buổi dọn dẹp công viên sáng Chủ nhật của bọn mình không?',
        suggestedReplies: [
          {
            en: 'Yes, I would love to join! What do volunteers need to bring along?',
            ipa: '',
            vi: 'Có chứ, mình rất muốn tham gia! Tình nguyện viên cần mang theo đồ gì vậy?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Just wear comfortable sneakers and bring a water bottle. We provide gloves and trash bags.',
        ipa: '',
        vi: 'Chỉ cần đi giày thể thao thoải mái và mang bình nước cá nhân thôi. Găng tay với túi rác bọn mình phát sẵn.',
        suggestedReplies: [
          {
            en: 'Sounds easy. Can I sign up my roommate to come with me too?',
            ipa: '',
            vi: 'Nghe gọn nhẹ quá. Mình đăng ký cho bạn cùng phòng đi chung luôn được không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-196',
    title: 'Phân Công Phần Thuyết Trình Môn Học',
    level: 'A2',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn và bạn cùng nhóm chia phần việc cho bài thuyết trình môn học vào tuần sau.',
    turns: [
      {
        speaker: 'AI',
        en: 'We have to present our marketing case study on Wednesday. Which part do you want to cover?',
        ipa: '',
        vi: 'Thứ Tư tuần tới tụi mình phải thuyết trình bài nghiên cứu tiếp thị rồi. Cậu muốn phụ trách phần nào?',
        suggestedReplies: [
          {
            en: 'I can design the slides and give the introduction if you want to explain the main examples.',
            ipa: '',
            vi: 'Mình có thể thiết kế slide và nói phần mở đầu, còn cậu trình bày các ví dụ chính nhé.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Deal! When should we meet to rehearse the whole presentation together?',
        ipa: '',
        vi: 'Chốt luôn! Khi nào tụi mình gặp nhau tập chạy thử cả bài thuyết trình nhỉ?',
        suggestedReplies: [
          {
            en: 'How about Tuesday afternoon right after class in study room four?',
            ipa: '',
            vi: 'Chiều thứ Ba ngay sau giờ học tại phòng tự học số 4 thì sao?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-197',
    title: 'Hỏi Hồ Sơ Xin Học Bổng Cộng Đồng',
    level: 'A2',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn tới văn phòng hỗ trợ sinh viên để hỏi danh sách giấy tờ và cách nộp hồ sơ học bổng.',
    turns: [
      {
        speaker: 'AI',
        en: 'Student Support Office, good morning! How can I help you today?',
        ipa: '',
        vi: 'Văn phòng Hỗ trợ Sinh viên xin chào! Hôm nay tôi giúp gì được cho bạn?',
        suggestedReplies: [
          {
            en: 'Hi, I want to apply for the community scholarship. Which documents do I need?',
            ipa: '',
            vi: 'Chào anh/chị, em muốn nộp đơn xin học bổng cộng đồng. Em cần chuẩn bị những giấy tờ gì ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'You need your latest transcript, one teacher recommendation, and a short essay before May tenth.',
        ipa: '',
        vi: 'Em cần bảng điểm mới nhất, một thư giới thiệu của giảng viên và một bài luận ngắn trước ngày 10 tháng 5.',
        suggestedReplies: [
          {
            en: 'Thank you! Should I upload everything online or bring paper copies to this desk?',
            ipa: '',
            vi: 'Em cảm ơn ạ! Em nên tải toàn bộ lên cổng trực tuyến hay mang bản giấy nộp tại quầy này?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-198',
    title: 'Bàn Kế Hoạch Tri Ân Thầy Giáo Cuối Khóa',
    level: 'A2',
    category: 'Giáo dục & Xã hội',
    context: 'Tuần sau kết thúc khóa học tiếng Anh, bạn bàn với bạn cùng lớp cách chuẩn bị món quà nhỏ tặng thầy.',
    turns: [
      {
        speaker: 'AI',
        en: 'Next Friday is our last class with Mr. Brown. Should we organize a small thank-you surprise?',
        ipa: '',
        vi: 'Thứ Sáu tuần sau là buổi cuối với thầy Brown rồi. Lớp mình làm buổi bất ngờ tri ân nhỏ cho thầy không?',
        suggestedReplies: [
          {
            en: 'Yes! Maybe everyone can write a short note in a card and order some snacks.',
            ipa: '',
            vi: 'Có chứ! Hay là mỗi người viết vài dòng vào tấm thiệp chung rồi đặt thêm ít bánh nhẹ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That is a sweet idea. Can you help buy the card while I collect money for the snacks?',
        ipa: '',
        vi: 'Ý kiến dễ thương đấy. Cậu mua giúp thiệp nhé, còn mình thu tiền góp đặt đồ ăn nhẹ?',
        suggestedReplies: [
          {
            en: 'Sure, I will bring a large card tomorrow so classmates can sign it quietly during break.',
            ipa: '',
            vi: 'Được luôn, mai mình mang tấm thiệp lớn tới để cả lớp tranh thủ ký bí mật vào giờ giải lao.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-199',
    title: 'Chốt Đề Tài Khóa Luận Với Giảng Viên',
    level: 'B1',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn gặp giảng viên hướng dẫn để thu hẹp phạm vi đề tài nghiên cứu khóa luận tốt nghiệp.',
    turns: [
      {
        speaker: 'AI',
        en: 'You emailed two topic ideas for your final paper. Which one feels stronger to you?',
        ipa: '',
        vi: 'Em gửi qua email hai ý tưởng đề tài cho khóa luận rồi. Em thấy hướng nào khả thi hơn?',
        suggestedReplies: [
          {
            en: 'I lean toward studying how short videos affect reading habits, since it is practical to survey local students.',
            ipa: '',
            vi: 'Em nghiêng về đề tài tác động của video ngắn tới thói quen đọc sách, vì khá dễ khảo sát sinh viên quanh đây.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That is a timely topic, though try narrowing it to first-year university students so your data stays focused.',
        ipa: '',
        vi: 'Đề tài rất thời sự, nhưng em nên thu hẹp đối tượng vào sinh viên năm nhất để dữ liệu không bị dàn trải.',
        suggestedReplies: [
          {
            en: 'Good point. I will draft ten survey questions focused on freshmen and send them over by Friday.',
            ipa: '',
            vi: 'Góp ý rất xác đáng ạ. Em sẽ soạn nháp mười câu hỏi khảo sát tập trung vào sinh viên năm nhất và gửi thầy vào thứ Sáu.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-200',
    title: 'Thảo Luận Ưu Nhược Điểm Học Trực Tuyến',
    level: 'B1',
    category: 'Giáo dục & Xã hội',
    context: 'Trong giờ thảo luận nhóm tiếng Anh, bạn trao đổi quan điểm về mô hình học kết hợp online và trực tiếp.',
    turns: [
      {
        speaker: 'AI',
        en: 'Many universities now keep half of their lectures online. Do you think that change helps students overall?',
        ipa: '',
        vi: 'Nhiều trường đại học giờ giữ một nửa số bài giảng dạy online. Cậu thấy thay đổi này nhìn chung có giúp ích cho sinh viên không?',
        suggestedReplies: [
          {
            en: 'Recorded lectures save commute time and let us replay tricky concepts, though staying focused at home is much harder.',
            ipa: '',
            vi: 'Bài giảng ghi hình giúp tiết kiệm thời gian đi lại và xem lại được phần khó, nhưng tự giữ tập trung ở nhà lại khó hơn nhiều.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'True—do you also miss the casual conversations with classmates before and after lectures?',
        ipa: '',
        vi: 'Đúng vậy—cậu có thấy nhớ những cuộc trò chuyện thoải mái với bạn học trước và sau giờ giảng không?',
        suggestedReplies: [
          {
            en: 'Definitely. Combining online theory videos with small in-person discussion workshops seems like the best balance.',
            ipa: '',
            vi: 'Chắc chắn rồi. Kết hợp xem video lý thuyết online với các buổi thảo luận nhóm nhỏ trực tiếp là cân bằng nhất.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-201',
    title: 'Nhờ Thầy Cũ Viết Thư Giới Thiệu Du Học',
    level: 'B1',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn ghé văn phòng thầy giáo cũ để nhờ viết thư giới thiệu cho chương trình trao đổi sinh viên một kỳ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Glad you stopped by! Tell me a bit about the exchange program you are applying to.',
        ipa: '',
        vi: 'Thầy rất vui khi em ghé thăm! Kể cho thầy nghe chút về chương trình trao đổi mà em định nộp hồ sơ nhé.',
        suggestedReplies: [
          {
            en: 'It is a one-semester program in Singapore, and the deadline is in three weeks. Would you feel comfortable writing a letter for me?',
            ipa: '',
            vi: 'Đó là chương trình trao đổi một học kỳ ở Singapore, hạn nộp còn ba tuần nữa. Thầy có tiện viết thư giới thiệu giúp em không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I would be glad to, since you led great discussions in my seminar. Could you send me your updated resume?',
        ipa: '',
        vi: 'Thầy sẵn lòng thôi, vì hồi học chuyên đề em dẫn thảo luận rất tốt. Em gửi cho thầy bản sơ yếu lý lịch mới nhất nhé?',
        suggestedReplies: [
          {
            en: 'Thank you so much! I will email my resume and statement of purpose tonight so you have all the details.',
            ipa: '',
            vi: 'Em cảm ơn thầy nhiều lắm! Tối nay em sẽ gửi email kèm hồ sơ và bài luận mục đích học tập để thầy nắm rõ thông tin.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-202',
    title: 'Thống Nhất Ngân Sách Truyền Thông Sự Kiện',
    level: 'B1',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn làm cầu nối hòa giải hai thành viên bất đồng cách chi ngân sách quảng bá ngày hội đọc sách cộng đồng.',
    turns: [
      {
        speaker: 'AI',
        en: 'Spending half our book-fair budget on printed flyers makes no sense when everyone checks social media.',
        ipa: '',
        vi: 'Chi nửa ngân sách hội sách cho tờ rơi giấy thật vô lý trong khi ai cũng lướt mạng xã hội hết rồi.',
        suggestedReplies: [
          {
            en: 'I see both sides—social posts reach students fast, while printed posters still help reach older neighbors offline.',
            ipa: '',
            vi: 'Mình hiểu cả hai góc nhìn—bài đăng mạng tiếp cận sinh viên rất nhanh, còn áp phích giấy vẫn giúp cô bác lớn tuổi biết tới sự kiện.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Fair enough, so how should we divide the budget without wasting half of it?',
        ipa: '',
        vi: 'Cũng có lý, vậy tụi mình chia ngân sách sao cho hợp lý mà không bị lãng phí?',
        suggestedReplies: [
          {
            en: 'Let us put seventy percent into local social ads and print just a small set of posters for neighborhood bulletin boards.',
            ipa: '',
            vi: 'Mình dành 70% chạy quảng cáo mạng khu vực và chỉ in một lượng nhỏ áp phích dán tại bảng tin các khu phố nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-203',
    title: 'Phỏng Vấn Tham Gia Lớp Dạy Học Tình Nguyện',
    level: 'B1',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn tham gia phỏng vấn ngắn để trở thành gia sư tình nguyện dạy tiếng Anh cho trẻ em có hoàn cảnh khó khăn.',
    turns: [
      {
        speaker: 'AI',
        en: 'Teaching kids with mixed reading levels can be tough. How would you keep the whole group engaged?',
        ipa: '',
        vi: 'Dạy các em nhỏ có trình độ đọc khác nhau khá thử thách đấy. Bạn sẽ làm thế nào để cả lớp cùng hào hứng?',
        suggestedReplies: [
          {
            en: 'I would mix simple storytelling games with pair activities so quieter children feel comfortable joining in.',
            ipa: '',
            vi: 'Mình sẽ kết hợp trò chơi kể chuyện đơn giản với hoạt động theo cặp để các em nhút nhát cũng thấy thoải mái tham gia.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That sounds thoughtful. Are you available to commit every Sunday morning for the next four months?',
        ipa: '',
        vi: 'Nghe rất tâm huyết đấy. Bạn có thể cam kết tham gia đều đặn sáng Chủ nhật trong bốn tháng tới không?',
        suggestedReplies: [
          {
            en: 'Yes, I cleared my Sunday mornings already and even prepared some colorful picture flashcards to start with.',
            ipa: '',
            vi: 'Có ạ, mình đã sắp xếp trống lịch sáng Chủ nhật và chuẩn bị sẵn một bộ thẻ tranh nhiều màu để mở đầu rồi.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-204',
    title: 'Tranh Luận Quy Định Dùng AI Trong Giảng Đường',
    level: 'B2',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn phát biểu trong buổi tọa đàm giữa giảng viên và sinh viên về chính sách sử dụng AI khi làm bài tập.',
    turns: [
      {
        speaker: 'AI',
        en: 'Should universities prohibit generative AI in coursework altogether, or somehow integrate it into grading?',
        ipa: '',
        vi: 'Các trường đại học nên cấm hoàn toàn AI tạo sinh trong bài tập, hay nên tích hợp nó vào quy trình đánh giá?',
        suggestedReplies: [
          {
            en: 'A blanket ban is unenforceable and ignores tools graduates will use at work; instead, courses should require transparent citations and oral checks.',
            ipa: '',
            vi: 'Cấm tuyệt đối là bất khả thi và tách rời công cụ thực tế nơi công sở; thay vào đó, môn học nên yêu cầu trích dẫn minh bạch kèm vấn đáp kiểm tra.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'How do we stop students from skipping deep critical thinking if AI drafts their essay outlines?',
        ipa: '',
        vi: 'Làm sao ngăn sinh viên bỏ qua tư duy phản biện sâu nếu AI đã dựng sẵn dàn ý bài luận cho họ?',
        suggestedReplies: [
          {
            en: 'By grading the reasoning process in class—asking students to critique flawed AI arguments actually sharpens analytical skills.',
            ipa: '',
            vi: 'Bằng cách chấm điểm quá trình lập luận ngay tại lớp—yêu cầu sinh viên phản biện các lỗ hổng trong câu trả lời của AI sẽ rèn tư duy phân tích rất tốt.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-205',
    title: 'Trao Đổi Với Phụ Huynh Về Phương Pháp Học',
    level: 'B2',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn đóng vai giáo viên trao đổi khéo léo với phụ huynh trong buổi họp cuối kỳ về kết quả môn Toán của học sinh.',
    turns: [
      {
        speaker: 'AI',
        en: 'I am worried that Mia\'s math grade dropped this term even though she studies at her desk until eleven every night.',
        ipa: '',
        vi: 'Tôi lo quá vì điểm Toán kỳ này của cháu Mia giảm sút dù tối nào cháu cũng ngồi bàn học tới tận 11 giờ khuya.',
        suggestedReplies: [
          {
            en: 'I see how hard Mia tries in class. What holds her back is rushing through word problems before verifying what the question actually asks.',
            ipa: '',
            vi: 'Tôi thấy rõ nỗ lực của Mia trên lớp. Điều khiến cháu mất điểm là hay làm vội các bài toán đố trước khi kiểm tra kỹ đề bài hỏi gì.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That sounds like test anxiety. What practical habit can we encourage at home without adding more pressure?',
        ipa: '',
        vi: 'Nghe giống tâm lý hồi hộp khi thi quá. Ở nhà gia đình có thể rèn thói quen thực tế nào mà không tạo thêm áp lực cho cháu?',
        suggestedReplies: [
          {
            en: 'Instead of longer study hours, having her solve four timed problems and explain each step aloud builds calm, lasting confidence.',
            ipa: '',
            vi: 'Thay vì kéo dài giờ học khuya, chị để cháu giải bốn bài bấm giờ rồi tự diễn giải từng bước thành lời sẽ rèn sự bình tĩnh và tự tin bền vững hơn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-206',
    title: 'Đề Xuất Dự Án Vườn Cộng Đồng Khu Dân Cư',
    level: 'B2',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn thuyết trình đề xuất biến bãi đất trống thành khu vườn giáo dục thiên nhiên trước ban quản trị chung cư.',
    turns: [
      {
        speaker: 'AI',
        en: 'Several residents worry a community garden might attract insects or add surprise upkeep fees to the building budget.',
        ipa: '',
        vi: 'Một số cư dân lo ngại vườn cộng đồng có thể thu hút côn trùng hoặc phát sinh thêm phí bảo trì vào ngân sách tòa nhà.',
        suggestedReplies: [
          {
            en: 'That is a fair concern. Our volunteer team secured a local green grant for raised beds and will enforce closed-lid composting to keep pests away.',
            ipa: '',
            vi: 'Lo ngại đó rất chính đáng ạ. Nhóm tình nguyện đã xin được gói tài trợ xanh địa phương cho bồn trồng nâng cao và quy định ủ phân nắp kín để tránh côn trùng.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Who takes responsibility if initial volunteers lose momentum after the first summer?',
        ipa: '',
        vi: 'Ai sẽ đứng ra duy trì nếu nhóm tình nguyện ban đầu giảm nhiệt huyết sau mùa hè đầu tiên?',
        suggestedReplies: [
          {
            en: 'We are partnering with the neighborhood primary school\'s science club so tending the garden beds becomes a supervised weekly student project.',
            ipa: '',
            vi: 'Chúng tôi đang liên kết với câu lạc bộ khoa học của trường tiểu học ngay cạnh để việc chăm sóc luống cây trở thành dự án học tập hằng tuần có giáo viên hướng dẫn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-207',
    title: 'Đặt Câu Hỏi Phản Biện Tại Hội Thảo Đô Thị',
    level: 'B2',
    category: 'Giáo dục & Xã hội',
    context: 'Trong phần hỏi đáp sau bài tham luận về giao thông đô thị, bạn đặt câu hỏi phản biện lịch sự cho diễn giả.',
    turns: [
      {
        speaker: 'AI',
        en: 'Widening ring roads around the city remains the fastest way to cut daily commuter congestion. Any questions from the audience?',
        ipa: '',
        vi: 'Mở rộng các tuyến đường vành đai quanh thành phố vẫn là cách nhanh nhất để giảm ùn tắc hằng ngày. Khán giả có câu hỏi nào không ạ?',
        suggestedReplies: [
          {
            en: 'Thank you for the data. Still, urban studies show wider lanes often induce more private car trips—did your model test dedicated bus corridors instead?',
            ipa: '',
            vi: 'Cảm ơn số liệu của diễn giả. Tuy nhiên các nghiên cứu đô thị chỉ ra mở rộng làn đường thường kích thích thêm xe cá nhân—mô hình của ông có thử phương án làn xe buýt riêng chưa?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Fair point—our study focused primarily on heavy freight trucks, which cannot shift onto passenger buses.',
        ipa: '',
        vi: 'Câu hỏi rất hay—nghiên cứu của chúng tôi tập trung chủ yếu vào xe tải hàng nặng, vốn không thể chuyển sang xe buýt chở khách.',
        suggestedReplies: [
          {
            en: 'That distinction makes sense for freight; perhaps pairing off-peak truck corridors with reliable commuter rail could serve both groups sustainably.',
            ipa: '',
            vi: 'Sự phân tách đó rất hợp lý với xe hàng; có lẽ kết hợp hành lang xe tải ngoài giờ cao điểm với tàu điện ngoại ô ổn định sẽ phục vụ bền vững cho cả hai nhóm.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-208',
    title: 'Thuyết Phục Tài Trợ Lớp Kỹ Năng Số Cộng Đồng',
    level: 'B2',
    category: 'Giáo dục & Xã hội',
    context: 'Bạn đại diện dự án xã hội thuyết phục nhà tài trợ công nghệ cấp kinh phí cho lớp phòng tránh lừa đảo mạng cho người cao tuổi.',
    turns: [
      {
        speaker: 'AI',
        en: 'We admire your digital literacy mission, though our foundation usually funds youth coding camps rather than senior workshops.',
        ipa: '',
        vi: 'Chúng tôi rất trân trọng sứ mệnh phổ cập kỹ năng số của bạn, nhưng quỹ thường ưu tiên trại lập trình thanh thiếu niên hơn lớp cho người cao tuổi.',
        suggestedReplies: [
          {
            en: 'Helping seniors recognize online scams directly protects household savings across the exact same working families your youth programs serve.',
            ipa: '',
            vi: 'Giúp người lớn tuổi nhận diện lừa đảo mạng trực tiếp bảo vệ tiền tiết kiệm của chính những gia đình có con em đang theo học chương trình trẻ của quỹ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That is a compelling link. How would you measure tangible impact after a six-month pilot grant?',
        ipa: '',
        vi: 'Cách liên kết đó rất thuyết phục. Bạn sẽ đo lường tác động cụ thể ra sao sau sáu tháng nhận tài trợ thí điểm?',
        suggestedReplies: [
          {
            en: 'We will track pre- and post-course scam-detection test scores, participant confidence ratings, and how many graduates mentor peers at local centers.',
            ipa: '',
            vi: 'Chúng tôi sẽ theo dõi điểm kiểm tra nhận diện lừa đảo trước và sau khóa học, mức độ tự tin của học viên và số người quay lại hướng dẫn bạn bè tại nhà văn hóa phường.',
          },
        ],
      },
    ],
  },
];

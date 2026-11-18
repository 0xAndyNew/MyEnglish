import { RoleplayScenario } from '../types/learning';

export const ROLEPLAY_BANK_PART1: RoleplayScenario[] = [
  // ============================================================================
  // 1. Đời sống & Giao tiếp (rp-9 .. rp-28)
  // ============================================================================
  {
    id: 'rp-9',
    title: 'Làm Quen Hàng Xóm Mới',
    level: 'A1',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn vừa dọn vào căn hộ mới và gặp người hàng xóm thân thiện ở hành lang.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi there! Did you just move in next door? I am Sarah from apartment 3B.',
        ipa: '',
        vi: 'Chào bạn! Bạn mới chuyển đến căn bên cạnh à? Mình là Sarah ở phòng 3B.',
        suggestedReplies: [
          {
            en: 'Hello Sarah! Yes, I moved in yesterday. My name is Minh, nice to meet you.',
            ipa: '',
            vi: 'Chào Sarah! Vâng, mình mới chuyển vào hôm qua. Mình tên là Minh, rất vui được gặp bạn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Nice to meet you too, Minh! Let me know if you need anything around the building.',
        ipa: '',
        vi: 'Rất vui được gặp bạn, Minh! Nếu cần gì quanh tòa nhà thì cứ bảo mình nhé.',
        suggestedReplies: [
          {
            en: 'Thank you so much! Where do we put the trash bags on this floor?',
            ipa: '',
            vi: 'Cảm ơn bạn nhiều nhé! Ở tầng này mình bỏ túi rác ở đâu vậy?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-10',
    title: 'Mượn Sạc Điện Thoại',
    level: 'A1',
    category: 'Đời sống & Giao tiếp',
    context: 'Điện thoại của bạn sắp hết pin ở lớp học và bạn cần mượn sạc từ bạn cùng bàn.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey, are you okay? You look a little worried about your phone.',
        ipa: '',
        vi: 'Này, bạn ổn chứ? Trông bạn hơi lo lắng về điện thoại đấy.',
        suggestedReplies: [
          {
            en: 'My phone battery is very low. Do you have a charger I can borrow?',
            ipa: '',
            vi: 'Pin điện thoại mình yếu quá rồi. Bạn có cục sạc cho mình mượn không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Sure, here is my USB-C cable. You can plug it in right next to my desk.',
        ipa: '',
        vi: 'Được chứ, dây sạc USB-C của mình đây. Bạn cắm ngay cạnh bàn mình này.',
        suggestedReplies: [
          {
            en: 'Thanks a lot! I will give it back to you after class.',
            ipa: '',
            vi: 'Cảm ơn nhiều nhé! Tan học mình sẽ trả lại bạn ngay.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-11',
    title: 'Hỏi Giờ & Chuyến Xe Buýt Tiếp Theo',
    level: 'A1',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn đứng ở trạm xe buýt nhưng điện thoại hết pin nên hỏi người đứng cạnh.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good morning! Are you waiting for the number 14 bus too?',
        ipa: '',
        vi: 'Chào buổi sáng! Bạn cũng đang đợi xe buýt số 14 à?',
        suggestedReplies: [
          {
            en: 'Yes, I am. Excuse me, what time is it right now?',
            ipa: '',
            vi: 'Vâng đúng rồi. Xin lỗi, bây giờ là mấy giờ rồi ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'It is eight fifteen. The bus usually arrives at eight twenty every morning.',
        ipa: '',
        vi: 'Bây giờ là 8 giờ 15. Xe buýt thường tới lúc 8 giờ 20 mỗi sáng.',
        suggestedReplies: [
          {
            en: 'Oh, only five minutes left! Thank you very much.',
            ipa: '',
            vi: 'Ồ, chỉ còn 5 phút nữa thôi! Cảm ơn bạn nhiều nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-12',
    title: 'Khen Áo Khoác & Hỏi Nơi Mua',
    level: 'A1',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn gặp lại bạn cũ ở quán trà sữa và rất thích chiếc áo khoác mới của bạn ấy.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey! Thanks for coming. Sorry I am five minutes late.',
        ipa: '',
        vi: 'Chào bạn! Cảm ơn đã tới nhé. Xin lỗi mình đến trễ 5 phút.',
        suggestedReplies: [
          {
            en: 'No problem at all! By the way, I really love your green jacket.',
            ipa: '',
            vi: 'Không sao đâu! Nhân tiện, mình rất thích chiếc áo khoác xanh của bạn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Thank you! I bought it on sale at a small shop near the park last Sunday.',
        ipa: '',
        vi: 'Cảm ơn nha! Mình mua giảm giá ở một cửa hàng nhỏ gần công viên Chủ Nhật vừa rồi.',
        suggestedReplies: [
          {
            en: 'It looks very warm and stylish. I want to visit that shop too!',
            ipa: '',
            vi: 'Trông ấm áp và thời trang lắm. Mình cũng muốn ghé cửa hàng đó xem thử!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-13',
    title: 'Rủ Bạn Đi Xem Phim Cuối Tuần',
    level: 'A1',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn gọi điện rủ người bạn thân đi xem phim vào tối thứ Bảy.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi! How is your week going? Are you free this weekend?',
        ipa: '',
        vi: 'Chào bạn! Tuần này của bạn thế nào? Cuối tuần này bạn có rảnh không?',
        suggestedReplies: [
          {
            en: 'I am good! Would you like to watch a comedy movie on Saturday night?',
            ipa: '',
            vi: 'Mình khỏe! Tối thứ Bảy bạn có muốn đi xem một bộ phim hài không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That sounds fun! What time does the movie start, and where should we meet?',
        ipa: '',
        vi: 'Nghe vui đấy! Phim chiếu lúc mấy giờ và mình gặp nhau ở đâu?',
        suggestedReplies: [
          {
            en: 'It starts at seven thirty. Let us meet at the cinema entrance at seven.',
            ipa: '',
            vi: 'Phim bắt đầu lúc 7 giờ 30. Mình hẹn ở cổng rạp lúc 7 giờ nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-14',
    title: 'Nhờ Người Chụp Ảnh Giúp Ở Công Viên',
    level: 'A2',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn đi dạo công viên cùng gia đình và muốn nhờ một người qua đường chụp giúp tấm ảnh.',
    turns: [
      {
        speaker: 'AI',
        en: 'The cherry blossoms look amazing today, don\'t they? Were you talking to me?',
        ipa: '',
        vi: 'Hoa anh đào hôm nay đẹp tuyệt vời nhỉ? Bạn vừa gọi tôi à?',
        suggestedReplies: [
          {
            en: 'Yes, excuse me! Could you take a quick photo of us by this tree, please?',
            ipa: '',
            vi: 'Vâng, xin lỗi làm phiền! Bạn có thể chụp giúp bọn mình một tấm cạnh cái cây này không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Of course! Just step back a little bit so I can fit the whole tree in. Ready? Smile!',
        ipa: '',
        vi: 'Được chứ! Lùi lại một chút để mình lấy trọn cả cây nhé. Sẵn sàng chưa? Cười lên nào!',
        suggestedReplies: [
          {
            en: 'Thank you! That turned out great. Have a wonderful afternoon!',
            ipa: '',
            vi: 'Cảm ơn bạn! Tấm ảnh đẹp lắm. Chúc bạn buổi chiều vui vẻ nhé!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-15',
    title: 'Gửi Bưu Phẩm Quốc Tế Tại Bưu Điện',
    level: 'A2',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn đến quầy bưu điện để gửi một hộp quà nhỏ cho người thân ở nước ngoài.',
    turns: [
      {
        speaker: 'AI',
        en: 'Next in line, please! What are you sending today, and where is it going?',
        ipa: '',
        vi: 'Mời người tiếp theo! Hôm nay bạn muốn gửi gì và gửi đi đâu ạ?',
        suggestedReplies: [
          {
            en: 'I would like to send this small gift box to Melbourne, Australia.',
            ipa: '',
            vi: 'Tôi muốn gửi hộp quà nhỏ này tới Melbourne, Úc ạ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Got it. Standard airmail takes ten days for twelve dollars, or express takes four days for twenty-five.',
        ipa: '',
        vi: 'Đã rõ. Gửi thường đường hàng không mất 10 ngày giá 12 đô, còn chuyển phát nhanh mất 4 ngày giá 25 đô.',
        suggestedReplies: [
          {
            en: 'Standard airmail is fine, please. Does it come with a tracking number?',
            ipa: '',
            vi: 'Gửi thường là được rồi ạ. Gói này có mã theo dõi vận đơn không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-16',
    title: 'Hẹn Lịch Cắt Tóc Ở Tiệm',
    level: 'A2',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn bước vào tiệm cắt tóc gần nhà để cắt gọn tóc và mô tả kiểu mong muốn.',
    turns: [
      {
        speaker: 'AI',
        en: 'Welcome in! Do you have an appointment, or are you looking for a walk-in cut?',
        ipa: '',
        vi: 'Chào mừng bạn! Bạn có đặt lịch trước không hay ghé cắt trực tiếp ạ?',
        suggestedReplies: [
          {
            en: 'I am a walk-in. Do you have time for a simple haircut right now?',
            ipa: '',
            vi: 'Mình ghé trực tiếp. Bây giờ tiệm có trống lịch cắt đơn giản không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Yes, have a seat right here. How short would you like me to cut it today?',
        ipa: '',
        vi: 'Có chứ, mời bạn ngồi ở đây. Hôm nay bạn muốn cắt ngắn cỡ nào?',
        suggestedReplies: [
          {
            en: 'Please trim the sides short and leave the top a little longer.',
            ipa: '',
            vi: 'Nhờ bạn cắt gọn hai bên và giữ phần mái trên dài hơn một chút nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-17',
    title: 'Báo Mất Thẻ Thư Viện & Làm Lại',
    level: 'A2',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn làm rơi thẻ thư viện thành phố và tới quầy lễ tân để báo khóa thẻ cũ, cấp lại thẻ mới.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello! Welcome to the city library. How can I help you at the front desk?',
        ipa: '',
        vi: 'Xin chào! Chào mừng đến thư viện thành phố. Tôi có thể giúp gì cho bạn?',
        suggestedReplies: [
          {
            en: 'I lost my library card yesterday, so I need to cancel it and get a new one.',
            ipa: '',
            vi: 'Tôi làm mất thẻ thư viện hôm qua nên muốn khóa thẻ cũ và làm lại thẻ mới.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'No worries, we can replace it right away. May I see your photo ID and confirm your address?',
        ipa: '',
        vi: 'Đừng lo, chúng tôi có thể cấp lại ngay. Cho tôi xem giấy tờ tùy thân có ảnh và xác nhận địa chỉ nhé?',
        suggestedReplies: [
          {
            en: 'Sure, here is my ID card. Is there a fee for the replacement card?',
            ipa: '',
            vi: 'Vâng, thẻ căn cước của tôi đây ạ. Làm lại thẻ mới có mất phí không ạ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-18',
    title: 'Nhắc Hàng Xóm Giảm Tiếng Ồn Ban Đêm',
    level: 'A2',
    category: 'Đời sống & Giao tiếp',
    context: 'Đã hơn 11 giờ đêm nhưng phòng bên cạnh mở nhạc rất to khi mai bạn phải dậy sớm.',
    turns: [
      {
        speaker: 'AI',
        en: 'Oh, hi neighbor! Come on—wait, is everything alright?',
        ipa: '',
        vi: 'Ồ, chào hàng xóm! Có chuyện gì thế bạn?',
        suggestedReplies: [
          {
            en: 'Sorry to bother you so late, could you turn the music down a little bit?',
            ipa: '',
            vi: 'Xin lỗi làm phiền bạn giờ muộn thế này, bạn có thể vặn nhỏ nhạc xuống một chút được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Oh gosh, I did not realize it was past eleven already! I am really sorry about that.',
        ipa: '',
        vi: 'Trời ơi, mình không để ý là đã qua 11 giờ rồi! Mình thành thật xin lỗi nhé.',
        suggestedReplies: [
          {
            en: 'Thanks for understanding! I have an early shift tomorrow morning.',
            ipa: '',
            vi: 'Cảm ơn bạn đã thông cảm! Sáng mai mình phải đi làm ca sớm.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-19',
    title: 'Thương Lượng Tiền Thuê Nhà & Đặt Cọc',
    level: 'B1',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn đi xem một căn hộ studio và trao đổi với chủ nhà về tiền cọc cũng như chi phí điện nước.',
    turns: [
      {
        speaker: 'AI',
        en: 'So that is the apartment! The monthly rent is nine hundred dollars for a one-year lease.',
        ipa: '',
        vi: 'Căn hộ là như vậy đó! Tiền thuê hàng tháng là 900 đô cho hợp đồng một năm.',
        suggestedReplies: [
          {
            en: 'I really like the bright living space. Are water and internet included in the rent?',
            ipa: '',
            vi: 'Mình rất thích không gian sáng sủa này. Tiền nước và internet đã bao gồm trong giá thuê chưa ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Water and trash collection are included, while electricity and Wi-Fi are billed separately. We also ask for a one-month deposit.',
        ipa: '',
        vi: 'Nước và phí thu rác đã bao gồm, còn điện và Wi-Fi tính riêng. Bên mình cũng cần đặt cọc một tháng tiền nhà.',
        suggestedReplies: [
          {
            en: 'That sounds fair. If I sign for twelve months today, could we move in this Saturday?',
            ipa: '',
            vi: 'Nghe hợp lý đấy ạ. Nếu hôm nay mình ký hợp đồng 12 tháng thì thứ Bảy này dọn vào ở được không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-20',
    title: 'Đăng Ký Gói Tập Gym Phù Hợp',
    level: 'B1',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn ghé phòng tập gần công ty để hỏi về gói hội viên linh hoạt và chính sách bảo lưu.',
    turns: [
      {
        speaker: 'AI',
        en: 'Welcome to FitLife Club! Are you thinking about joining for general workouts or group classes too?',
        ipa: '',
        vi: 'Chào mừng đến FitLife Club! Bạn đang muốn đăng ký tập tự do hay kèm cả các lớp tập nhóm ạ?',
        suggestedReplies: [
          {
            en: 'Mostly evening cardio and yoga classes, since I work until six on weekdays.',
            ipa: '',
            vi: 'Chủ yếu là tập tim mạch buổi tối và lớp yoga, vì ngày thường mình làm việc tới 6 giờ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Our Plus plan covers unlimited classes after five PM, and you do not have to pay a joining fee this month.',
        ipa: '',
        vi: 'Gói Plus bên mình bao gồm lớp học không giới hạn sau 5 giờ chiều, và tháng này được miễn phí mở thẻ.',
        suggestedReplies: [
          {
            en: 'That works well for me. Can I freeze my membership if I travel for two weeks?',
            ipa: '',
            vi: 'Gói đó hợp với lịch của mình đấy. Nếu mình đi công tác 2 tuần thì có bảo lưu thẻ được không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-21',
    title: 'Báo Hỏng Điều Hòa Cho Chủ Nhà',
    level: 'B1',
    category: 'Đời sống & Giao tiếp',
    context: 'Máy điều hòa trong phòng ngủ bị chảy nước và không mát, bạn gọi điện cho quản lý tòa nhà.',
    turns: [
      {
        speaker: 'AI',
        en: 'Building maintenance speaking. Which unit are you calling from, and what seems to be the issue?',
        ipa: '',
        vi: 'Bộ phận kỹ thuật tòa nhà xin nghe. Bạn gọi từ căn hộ nào và đang gặp sự cố gì vậy?',
        suggestedReplies: [
          {
            en: 'Hi, this is Lan in unit 604. My bedroom air conditioner is leaking water and blowing warm air.',
            ipa: '',
            vi: 'Chào anh, em là Lan ở căn 604. Điều hòa phòng ngủ nhà em bị rò nước và chỉ thổi gió nóng.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Got it, sounds like a clogged drain line. Could a technician stop by tomorrow morning around nine?',
        ipa: '',
        vi: 'Mình hiểu rồi, nghe giống bị tắc ống thoát nước. Sáng mai khoảng 9 giờ thợ kỹ thuật qua kiểm tra được không?',
        suggestedReplies: [
          {
            en: 'Nine works, or if anyone is free after five today, I will be home from work.',
            ipa: '',
            vi: '9 giờ sáng mai cũng được, hoặc nếu hôm nay có người rảnh sau 5 giờ chiều thì em đã đi làm về rồi ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-22',
    title: 'Đổi Gói Cước Di Động Có Data Cao',
    level: 'B1',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn thường xuyên ra ngoài họp trực tuyến nên muốn nâng cấp gói SIM di động tại cửa hàng.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi there! Looking to upgrade your phone, or do you want to review your current mobile plan?',
        ipa: '',
        vi: 'Xin chào! Bạn muốn nâng cấp máy hay xem lại gói cước di động hiện tại ạ?',
        suggestedReplies: [
          {
            en: 'I keep running out of mobile data before the end of the month, so I need a larger plan.',
            ipa: '',
            vi: 'Mình cứ bị hết dung lượng 4G trước cuối tháng nên muốn đổi sang gói nhiều data hơn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'For ten dollars more per month, you can move up to 60 gigabytes and keep your existing number.',
        ipa: '',
        vi: 'Chỉ thêm 10 đô mỗi tháng, bạn có thể lên gói 60 GB và vẫn giữ nguyên số điện thoại hiện tại.',
        suggestedReplies: [
          {
            en: 'Sounds good. Does that plan also allow hotspot sharing for my laptop?',
            ipa: '',
            vi: 'Nghe ổn đấy. Gói đó có cho phép phát Wi-Fi cho laptop không bạn?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-23',
    title: 'Từ Chối Lời Mời Tiệc Khéo Léo',
    level: 'B1',
    category: 'Đời sống & Giao tiếp',
    context: 'Một người bạn mời bạn dự tiệc tối nhưng bạn đã có hẹn với gia đình nên từ chối khéo.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey! A few of us are getting together for hotpot at my place this Friday night. Can you make it?',
        ipa: '',
        vi: 'Này! Tối thứ Sáu này mấy đứa tụ tập ăn lẩu ở nhà mình. Bạn qua được chứ?',
        suggestedReplies: [
          {
            en: 'I really appreciate the invite, but I already promised to have dinner with my parents that evening.',
            ipa: '',
            vi: 'Mình rất cảm ơn lời mời, nhưng tối hôm đó mình lỡ hứa ăn tối với bố mẹ mất rồi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Aw, no problem at all! Family comes first. Maybe we can catch up over coffee next week instead?',
        ipa: '',
        vi: 'À, không sao đâu! Gia đình là trên hết mà. Tuần sau mình hẹn cà phê bù nhé?',
        suggestedReplies: [
          {
            en: 'Definitely! Let me check my schedule and text you on Monday afternoon.',
            ipa: '',
            vi: 'Chắc chắn rồi! Để mình xem lịch rồi nhắn tin cho bạn vào chiều thứ Hai nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-24',
    title: 'Giải Quyết Bất Đồng Việc Nhà Với Bạn Cùng Phòng',
    level: 'B2',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn và bạn cùng phòng đang nói chuyện thẳng thắn về việc rửa bát và chia tiền sinh hoạt chung.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey, do you have a minute? I wanted to bring up the kitchen dishes before things get awkward between us.',
        ipa: '',
        vi: 'Này, bạn rảnh một phút không? Mình muốn nói về chuyện bát đĩa trong bếp trước khi hai đứa thấy ngại với nhau.',
        suggestedReplies: [
          {
            en: 'Of course, I am glad you brought it up. Honestly, I have also felt our cleaning routine is a bit uneven lately.',
            ipa: '',
            vi: 'Tất nhiên rồi, mừng là bạn chủ động nói. Thật lòng mình cũng thấy việc dọn dẹp gần đây hơi thiếu đều đặn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Right, I sometimes leave pans overnight after late shifts. Would alternating days or setting a nightly rule help?',
        ipa: '',
        vi: 'Đúng rồi, thi thoảng đi làm ca muộn về mình hay để chảo qua đêm. Hay mình chia ngày luân phiên hoặc đặt quy tắc dọn mỗi tối nhé?',
        suggestedReplies: [
          {
            en: 'Setting a simple rule that everyone washes what they use before bed sounds much fairer and easier to stick to.',
            ipa: '',
            vi: 'Đặt một quy tắc đơn giản là ai dùng gì tự rửa sạch trước khi đi ngủ nghe công bằng và dễ duy trì hơn nhiều.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-25',
    title: 'Khiếu Nại Phí Phạt Đỗ Xe Sai Quy Định',
    level: 'B2',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn nhận được vé phạt đỗ xe dù biển báo khu vực bị cây che khuất và đang trình bày với nhân viên thành phố.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good morning, parking enforcement desk. Are you here to pay citation number 4021 or contest it?',
        ipa: '',
        vi: 'Chào buổi sáng, bàn xử lý vi phạm đỗ xe. Bạn đến nộp phạt biên bản 4021 hay khiếu nại ạ?',
        suggestedReplies: [
          {
            en: 'I would like to contest it, actually. The no-parking sign on Oak Street was completely blocked by overgrown tree branches.',
            ipa: '',
            vi: 'Tôi muốn khiếu nại biên bản này. Biển cấm đỗ trên đường Oak bị cành cây mọc rậm che khuất hoàn toàn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I see. Do you have timestamped photos showing the obstructed sign from the spot where your car was parked?',
        ipa: '',
        vi: 'Tôi hiểu rồi. Bạn có ảnh chụp có dấu thời gian cho thấy biển báo bị che khuất từ đúng vị trí bạn đỗ xe không?',
        suggestedReplies: [
          {
            en: 'Yes, I took three clear photos right after finding the ticket, and I also paid the meter for two hours.',
            ipa: '',
            vi: 'Có ạ, tôi chụp 3 tấm rõ nét ngay khi thấy giấy phạt, và tôi cũng đã trả tiền máy thu phí đỗ xe đủ 2 tiếng.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-26',
    title: 'Điều Phối Quyên Góp Sự Kiện Khu Phố',
    level: 'B2',
    category: 'Đời sống & Giao tiếp',
    context: 'Bạn đang họp với trưởng ban tổ chức khu dân cư để phân bổ tình nguyện viên và nguồn quyên góp sách cũ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Thanks for stepping up to help with the neighborhood book drive. We already have twelve boxes, though we are short on weekend volunteers.',
        ipa: '',
        vi: 'Cảm ơn bạn đã đứng ra hỗ trợ đợt quyên góp sách khu phố. Mình đã có 12 thùng sách nhưng đang thiếu tình nguyện viên cuối tuần.',
        suggestedReplies: [
          {
            en: 'Happy to pitch in. If we split Saturday into two-hour shifts, I can recruit three neighbors to cover the afternoon.',
            ipa: '',
            vi: 'Mình rất sẵn lòng phụ một tay. Nếu chia ngày thứ Bảy thành các ca 2 tiếng, mình có thể rủ thêm 3 hàng xóm trực buổi chiều.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Shorter shifts make a huge difference. Should we sort children\'s books separately before delivering them to the community center?',
        ipa: '',
        vi: 'Chia ca ngắn dễ huy động hơn hẳn. Mình có nên phân loại riêng sách thiếu nhi trước khi chuyển tới nhà văn hóa không?',
        suggestedReplies: [
          {
            en: 'Definitely, sorting them by age group on site will save the staff hours of work and prevent damaged covers.',
            ipa: '',
            vi: 'Chắc chắn rồi, phân loại theo độ tuổi ngay tại chỗ sẽ giúp nhân viên tiết kiệm hàng giờ làm việc và tránh hỏng bìa sách.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-27',
    title: 'Đóng Góp Ý Kiến Trong Cuộc Họp Chung Cư',
    level: 'B2',
    category: 'Đời sống & Giao tiếp',
    context: 'Ban quản lý tòa nhà mở cuộc họp lấy ý kiến cư dân về việc mở rộng chỗ để xe và phân loại rác.',
    turns: [
      {
        speaker: 'AI',
        en: 'We have heard mixed feedback on restricting visitor parking to two hours. Would anyone like to share a practical alternative?',
        ipa: '',
        vi: 'Chúng tôi nhận được nhiều ý kiến trái chiều về việc giới hạn xe khách vãng lai đỗ tối đa 2 giờ. Có ai muốn đề xuất giải pháp thực tế hơn không?',
        suggestedReplies: [
          {
            en: 'Rather than a strict two-hour cap, could residents register overnight guest passes through the building app twice a month?',
            ipa: '',
            vi: 'Thay vì giới hạn cứng 2 tiếng, cư dân có thể đăng ký thẻ khách qua đêm trên ứng dụng tòa nhà tối đa 2 lần mỗi tháng được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That is a thoughtful compromise—it stops long-term abuse without penalizing visiting family members. Let us put that to a vote.',
        ipa: '',
        vi: 'Đó là phương án dung hòa rất hợp lý—vừa ngăn đỗ xe dài ngày vừa không làm khó người thân tới chơi. Hãy đưa phương án này ra biểu quyết nhé.',
        suggestedReplies: [
          {
            en: 'Great, and could we also place clearer labels above the recycling bins so new tenants stop mixing glass with cardboard?',
            ipa: '',
            vi: 'Tuyệt vời, và chúng ta cũng có thể dán nhãn rõ hơn phía trên thùng tái chế để cư dân mới không bỏ lẫn thủy tinh vào bìa carton chứ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-28',
    title: 'Tư Vấn Bạn Bè Khi Cân Nhắc Chuyển Việc',
    level: 'B2',
    category: 'Đời sống & Giao tiếp',
    context: 'Người bạn thân đang phân vân giữa lời mời lương cao ở công ty khởi nghiệp và vị trí ổn định hiện tại.',
    turns: [
      {
        speaker: 'AI',
        en: 'I honestly cannot decide. The startup pays twenty percent more, yet staying here means predictable hours and great health benefits.',
        ipa: '',
        vi: 'Thật sự mình không quyết định nổi. Startup trả cao hơn 20%, nhưng ở lại đây thì giờ giấc ổn định và chế độ bảo hiểm rất tốt.',
        suggestedReplies: [
          {
            en: 'Before jumping at the salary bump, look closely at their runway and whether you will have mentorship or wear too many hats.',
            ipa: '',
            vi: 'Trước khi chốt vì mức lương tăng, bạn hãy xem kỹ dòng tiền công ty đó và xem bạn sẽ có người hướng dẫn hay phải ôm đồm quá nhiều việc.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'True, wearing five hats could burn me out quickly. On the other hand, I feel like my learning curve here has completely flattened.',
        ipa: '',
        vi: 'Đúng là ôm 5 đầu việc cùng lúc dễ kiệt sức lắm. Ngược lại, ở chỗ cũ mình cảm giác đường học hỏi đang chững lại hẳn.',
        suggestedReplies: [
          {
            en: 'In that case, ask your current manager for a stretch project first—if nothing changes in three months, take the leap with clarity.',
            ipa: '',
            vi: 'Nếu vậy, hãy thử xin sếp hiện tại một dự án thử thách hơn trước—nếu sau 3 tháng vẫn không đổi thì chuyển việc với tâm thế rõ ràng.',
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 2. Du lịch & Khách sạn (rp-29 .. rp-48)
  // ============================================================================
  {
    id: 'rp-29',
    title: 'Hỏi Đường Tới Nhà Vệ Sinh & Thang Máy',
    level: 'A1',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn vừa đáp xuống sân bay lớn và đang tìm khu vực nhà vệ sinh cùng thang máy lên sảnh đón.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello! Welcome to the terminal. Are you looking for a gate or the baggage area?',
        ipa: '',
        vi: 'Xin chào! Chào mừng đến nhà ga. Bạn đang tìm cổng lên máy bay hay khu lấy hành lý ạ?',
        suggestedReplies: [
          {
            en: 'Excuse me, where are the restrooms and the elevator to the second floor?',
            ipa: '',
            vi: 'Xin lỗi, nhà vệ sinh và thang máy lên tầng 2 ở đâu vậy ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Go straight past the coffee shop, and you will see the restrooms on your right. The elevator is next to them.',
        ipa: '',
        vi: 'Bạn đi thẳng qua quán cà phê, sẽ thấy nhà vệ sinh bên tay phải. Thang máy nằm ngay cạnh đó.',
        suggestedReplies: [
          {
            en: 'Past the coffee shop on the right. Got it, thank you very much!',
            ipa: '',
            vi: 'Qua quán cà phê ở bên phải. Tôi hiểu rồi, cảm ơn bạn nhiều lắm!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-30',
    title: 'Nhờ Lễ Tân Gọi Taxi Ra Sân Bay',
    level: 'A1',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn chuẩn bị trả phòng sáng mai và nhờ nhân viên lễ tân đặt trước một chiếc taxi ra sân bay.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good evening! How was your stay with us? Can I help you with anything for tomorrow?',
        ipa: '',
        vi: 'Chào buổi tối! Kỳ nghỉ của bạn ổn chứ? Ngày mai tôi có thể hỗ trợ gì cho bạn không?',
        suggestedReplies: [
          {
            en: 'Could you please call a taxi for me to the airport at seven in the morning?',
            ipa: '',
            vi: 'Bạn đặt giúp tôi một chiếc taxi ra sân bay lúc 7 giờ sáng mai được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Sure! What is your room number? The ride takes about thirty minutes and costs around twenty-five dollars.',
        ipa: '',
        vi: 'Chắc chắn rồi! Số phòng của bạn là bao nhiêu? Chuyến đi mất khoảng 30 phút và giá tầm 25 đô ạ.',
        suggestedReplies: [
          {
            en: 'I am in room 208. Thank you, I will be ready at the lobby at six fifty.',
            ipa: '',
            vi: 'Tôi ở phòng 208. Cảm ơn bạn, 6 giờ 50 tôi sẽ có mặt ở sảnh.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-31',
    title: 'Xin Thêm Khăn Tắm & Gối Ngủ',
    level: 'A1',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn vừa nhận phòng khách sạn nhưng thiếu một bộ khăn tắm và muốn xin thêm gối mềm.',
    turns: [
      {
        speaker: 'AI',
        en: 'Front desk speaking. How may I assist your room tonight?',
        ipa: '',
        vi: 'Quầy lễ tân xin nghe. Tối nay tôi có thể hỗ trợ gì cho phòng của bạn ạ?',
        suggestedReplies: [
          {
            en: 'Hi, this is room 512. Could we have two more bath towels and one extra pillow, please?',
            ipa: '',
            vi: 'Chào bạn, đây là phòng 512. Cho mình xin thêm 2 khăn tắm và 1 chiếc gối được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Certainly! Housekeeping will bring two towels and a soft pillow up to room 512 in ten minutes.',
        ipa: '',
        vi: 'Được ngay ạ! Nhân viên buồng phòng sẽ mang 2 khăn tắm và 1 gối mềm lên phòng 512 trong 10 phút nữa.',
        suggestedReplies: [
          {
            en: 'That is very kind of you. Thank you!',
            ipa: '',
            vi: 'Bạn thật chu đáo. Cảm ơn nhiều nhé!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-32',
    title: 'Mua Vé Tham Quan Bảo Tàng Tại Quầy',
    level: 'A1',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn đứng trước quầy vé bảo tàng nghệ thuật và muốn mua vé vào cổng cùng giờ đóng cửa.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good afternoon! Welcome to the City Art Museum. How many tickets would you like?',
        ipa: '',
        vi: 'Chào buổi chiều! Chào mừng tới Bảo tàng Nghệ thuật Thành phố. Bạn muốn mua mấy vé ạ?',
        suggestedReplies: [
          {
            en: 'One adult ticket, please. Also, what time does the museum close today?',
            ipa: '',
            vi: 'Cho tôi một vé người lớn ạ. Với lại hôm nay bảo tàng đóng cửa lúc mấy giờ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'One adult ticket is fifteen dollars, and we close at six PM. Here is your map.',
        ipa: '',
        vi: 'Một vé người lớn giá 15 đô, và chúng tôi đóng cửa lúc 6 giờ tối. Bản đồ của bạn đây ạ.',
        suggestedReplies: [
          {
            en: 'Thank you! Can I take photos inside the gallery?',
            ipa: '',
            vi: 'Cảm ơn bạn! Tôi có được chụp ảnh bên trong phòng trưng bày không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-33',
    title: 'Đổi Ngoại Tệ Tại Quầy Sân Bay',
    level: 'A1',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn cần đổi một ít tiền đô la sang tiền địa phương để đi xe buýt và ăn uống.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello! Which currency would you like to exchange today?',
        ipa: '',
        vi: 'Xin chào! Hôm nay bạn muốn đổi loại tiền tệ nào ạ?',
        suggestedReplies: [
          {
            en: 'I would like to change two hundred US dollars into British pounds, please.',
            ipa: '',
            vi: 'Tôi muốn đổi 200 đô la Mỹ sang bảng Anh ạ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Sure, may I see your passport? Would you prefer large notes or smaller bills?',
        ipa: '',
        vi: 'Vâng, cho tôi xem hộ chiếu của bạn nhé? Bạn thích nhận tiền mệnh giá lớn hay tiền lẻ nhỏ hơn?',
        suggestedReplies: [
          {
            en: 'Here is my passport. Please give me smaller bills if you have them.',
            ipa: '',
            vi: 'Hộ chiếu của tôi đây. Cho tôi xin tiền mệnh giá nhỏ nếu có nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-34',
    title: 'Làm Thủ Tục Ký Gửi Hành Lý Sân Bay',
    level: 'A2',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn đứng ở quầy check-in hãng bay để gửi vali và xin chỗ ngồi gần cửa sổ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good morning! Flying to Singapore today? May I have your passport and booking code?',
        ipa: '',
        vi: 'Chào buổi sáng! Hôm nay bạn bay đi Singapore phải không? Cho tôi xem hộ chiếu và mã đặt chỗ nhé?',
        suggestedReplies: [
          {
            en: 'Yes, here they are. I have one suitcase to check in and one small backpack.',
            ipa: '',
            vi: 'Vâng, giấy tờ đây ạ. Tôi có một vali ký gửi và một ba lô nhỏ xách tay.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Your bag is eighteen kilos, which is within the limit. Would you like an aisle or window seat?',
        ipa: '',
        vi: 'Vali của bạn nặng 18 cân, đúng quy định rồi. Bạn muốn ngồi ghế lối đi hay cạnh cửa sổ ạ?',
        suggestedReplies: [
          {
            en: 'A window seat if one is still available, please. Which gate do I go to?',
            ipa: '',
            vi: 'Cho tôi ghế cửa sổ nếu vẫn còn chỗ nhé. Tôi sẽ ra cửa lên máy bay số mấy ạ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-35',
    title: 'Xin Trả Phòng Khách Sạn Muộn',
    level: 'A2',
    category: 'Du lịch & Khách sạn',
    context: 'Chuyến bay về của bạn cất cánh buổi tối nên bạn muốn xin giữ phòng thêm vài tiếng.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good morning! Are you checking out of room 309 today?',
        ipa: '',
        vi: 'Chào buổi sáng! Hôm nay bạn trả phòng 309 đúng không ạ?',
        suggestedReplies: [
          {
            en: 'My flight is not until tonight. Is it possible to request a late check-out until two PM?',
            ipa: '',
            vi: 'Tối nay chuyến bay của tôi mới cất cánh. Tôi có thể xin trả phòng muộn tới 2 giờ chiều được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let me check the room schedule. Yes, we can extend until two PM for a twenty-dollar fee.',
        ipa: '',
        vi: 'Để tôi kiểm tra lịch phòng. Vâng, khách sạn có thể gia hạn tới 2 giờ chiều với mức phí 20 đô ạ.',
        suggestedReplies: [
          {
            en: 'That sounds great, please add it to my bill. Thanks for your help!',
            ipa: '',
            vi: 'Tuyệt quá, nhờ bạn cộng giúp vào hóa đơn phòng nhé. Cảm ơn sự hỗ trợ!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-36',
    title: 'Mua Vé Tàu Khứ Hồi & Hỏi Sân Ga',
    level: 'A2',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn mua vé tàu khứ hồi đi tham quan thị trấn lân cận và hỏi sân ga xuất phát.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi! How can I help you at the ticket office today?',
        ipa: '',
        vi: 'Chào bạn! Hôm nay phòng vé có thể giúp gì cho bạn?',
        suggestedReplies: [
          {
            en: 'I would like a round-trip ticket to Oxford leaving on the next morning train.',
            ipa: '',
            vi: 'Tôi muốn mua một vé khứ hồi đi Oxford khởi hành vào chuyến tàu sáng tiếp theo.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Sure, the 9:40 train leaves from platform four. Your return ticket is valid on any train back tonight.',
        ipa: '',
        vi: 'Vâng, chuyến 9 giờ 40 khởi hành từ sân ga số 4. Vé chiều về có giá trị cho mọi chuyến tàu tối nay.',
        suggestedReplies: [
          {
            en: 'Platform four at nine forty, and do I need to change trains along the way?',
            ipa: '',
            vi: 'Sân ga số 4 lúc 9 giờ 40, vậy giữa đường tôi có phải đổi tàu không ạ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-37',
    title: 'Gửi Hành Lý Trước Giờ Nhận Phòng',
    level: 'A2',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn đến khách sạn lúc 10 giờ sáng nhưng 2 giờ chiều mới được nhận phòng nên muốn gửi vali.',
    turns: [
      {
        speaker: 'AI',
        en: 'Welcome to Riverside Hotel! Checking in today? Our standard check-in starts at two PM.',
        ipa: '',
        vi: 'Chào mừng đến Riverside Hotel! Hôm nay bạn nhận phòng ạ? Giờ nhận phòng tiêu chuẩn bắt đầu từ 2 giờ chiều.',
        suggestedReplies: [
          {
            en: 'I arrived early from the station. Could I leave my two bags here while I walk around?',
            ipa: '',
            vi: 'Tôi vừa từ nhà ga tới sớm. Tôi có thể gửi tạm 2 chiếc túi ở đây trong lúc đi dạo quanh phố không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Of course! We have a locked luggage room right behind the desk. Here is your claim tag.',
        ipa: '',
        vi: 'Được chứ! Chúng tôi có phòng giữ hành lý có khóa ngay sau quầy. Thẻ nhận đồ của bạn đây.',
        suggestedReplies: [
          {
            en: 'Thank you so much! Also, do you recommend a good lunch spot nearby?',
            ipa: '',
            vi: 'Cảm ơn nhiều nhé! Nhân tiện, gần đây có quán ăn trưa nào ngon bạn gợi ý không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-38',
    title: 'Đặt Tour Tham Quan Thành Phố Nửa Ngày',
    level: 'A2',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn ghé bàn thông tin du lịch để tìm tour đi quanh các điểm nổi tiếng trong buổi chiều.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi there! Looking for maps or guided tours around the old town?',
        ipa: '',
        vi: 'Chào bạn! Bạn đang tìm bản đồ hay tour có hướng dẫn quanh khu phố cổ ạ?',
        suggestedReplies: [
          {
            en: 'I only have one afternoon free. Do you have a half-day sightseeing bus tour?',
            ipa: '',
            vi: 'Tôi chỉ rảnh một buổi chiều thôi. Bên bạn có tour xe buýt tham quan nửa ngày không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Yes, there is a three-hour tour starting at one thirty, with an English audio guide included.',
        ipa: '',
        vi: 'Có ạ, có tour 3 tiếng khởi hành lúc 1 giờ 30, đã kèm thuyết minh âm thanh tiếng Anh.',
        suggestedReplies: [
          {
            en: 'That fits perfectly. Where does the tour bus pick us up?',
            ipa: '',
            vi: 'Lịch đó hợp lý quá. Xe buýt du lịch đón khách ở điểm nào vậy bạn?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-39',
    title: 'Xin Đổi Phòng Khách Sạn Vì Tiếng Ồn',
    level: 'B1',
    category: 'Du lịch & Khách sạn',
    context: 'Phòng của bạn nằm ngay sát công trường sửa đường ồn ào nên bạn xuống lễ tân xin đổi phòng yên tĩnh hơn.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good afternoon! Is everything okay with room 202?',
        ipa: '',
        vi: 'Chào buổi chiều! Phòng 202 mọi thứ vẫn ổn chứ ạ?',
        suggestedReplies: [
          {
            en: 'Actually, there is heavy street construction right outside my window. Would it be possible to move to a quieter room?',
            ipa: '',
            vi: 'Thật ra ngay ngoài cửa sổ phòng tôi đang thi công đường rất ồn. Khách sạn có thể đổi cho tôi sang phòng yên tĩnh hơn được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I apologize for the noise! Let me check—we have a courtyard-facing room open on the fifth floor right now.',
        ipa: '',
        vi: 'Tôi xin lỗi vì tiếng ồn đó ạ! Để tôi kiểm tra—hiện tầng 5 đang trống một phòng hướng ra sân trong yên tĩnh.',
        suggestedReplies: [
          {
            en: 'A courtyard room on the fifth floor sounds wonderful. Thank you for arranging that so quickly.',
            ipa: '',
            vi: 'Phòng hướng sân trong trên tầng 5 nghe tuyệt lắm. Cảm ơn bạn đã sắp xếp nhanh chóng như vậy.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-40',
    title: 'Báo Hành Lý Thất Lạc Tại Băng Chuyền',
    level: 'B1',
    category: 'Du lịch & Khách sạn',
    context: 'Băng chuyền đã dừng hẳn nhưng vali ký gửi của bạn không xuất hiện, bạn tới quầy hỗ trợ hành lý.',
    turns: [
      {
        speaker: 'AI',
        en: 'Baggage Services. Did your suitcase not come out from flight VN210?',
        ipa: '',
        vi: 'Quầy dịch vụ hành lý xin nghe. Vali của bạn trên chuyến bay VN210 chưa ra băng chuyền đúng không ạ?',
        suggestedReplies: [
          {
            en: 'Yes, everyone else already left, and my bag is still missing. Here is my baggage claim receipt.',
            ipa: '',
            vi: 'Đúng rồi, mọi người đi hết rồi mà hành lý của tôi vẫn chưa thấy. Biên nhận gửi đồ của tôi đây ạ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I see it was delayed at the transfer hub and will arrive on tonight\'s flight. Where are you staying so we can deliver it?',
        ipa: '',
        vi: 'Hệ thống báo vali bị kẹt ở sân bay trung chuyển và sẽ tới trên chuyến tối nay. Bạn ở khách sạn nào để chúng tôi giao tới?',
        suggestedReplies: [
          {
            en: 'I am staying at the Central Plaza Hotel. Could you also provide an overnight amenity kit in the meantime?',
            ipa: '',
            vi: 'Tôi ở khách sạn Central Plaza. Trong lúc chờ thì hãng có hỗ trợ bộ đồ dùng cá nhân qua đêm không ạ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-41',
    title: 'Làm Thủ Tục Thuê Xe Tự Lái',
    level: 'B1',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn nhận xe thuê tại sân bay và hỏi rõ về bảo hiểm, chính sách xăng xe và kiểm tra vết trầy.',
    turns: [
      {
        speaker: 'AI',
        en: 'Welcome to Horizon Car Rental! Your compact sedan is ready. Would you like to add full collision coverage?',
        ipa: '',
        vi: 'Chào mừng tới Horizon Car Rental! Xe sedan nhỏ của bạn đã sẵn sàng. Bạn có muốn mua thêm bảo hiểm va chạm toàn phần không?',
        suggestedReplies: [
          {
            en: 'My reservation already includes basic insurance, right? What is the deductible if I keep only that?',
            ipa: '',
            vi: 'Đơn đặt của tôi đã bao gồm bảo hiểm cơ bản rồi đúng không? Nếu giữ gói đó thì mức miễn thường là bao nhiêu?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'The standard deductible is five hundred dollars. Also, please return the tank full to avoid our refueling fee.',
        ipa: '',
        vi: 'Mức miễn thường tiêu chuẩn là 500 đô. Ngoài ra vui lòng đổ đầy bình xăng khi trả xe để tránh phí tiếp nhiên liệu.',
        suggestedReplies: [
          {
            en: 'Got it. Before I drive off, can we walk around the car together to note any existing scratches?',
            ipa: '',
            vi: 'Tôi hiểu rồi. Trước khi lái đi, mình đi một vòng quanh xe ghi nhận sẵn các vết xước cũ nhé?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-42',
    title: 'Đổi Chuyến Nối Chuyến Bị Lỡ Tại Sân Bay',
    level: 'B1',
    category: 'Du lịch & Khách sạn',
    context: 'Chuyến bay đầu bị trễ khiến bạn lỡ chuyến nối tiếp, bạn làm việc với nhân viên quầy chuyển tiếp.',
    turns: [
      {
        speaker: 'AI',
        en: 'Next passenger, please! I heard the inbound flight from Tokyo landed forty minutes late. How can I help?',
        ipa: '',
        vi: 'Mời hành khách tiếp theo! Tôi nghe nói chuyến từ Tokyo hạ cánh trễ 40 phút. Tôi có thể giúp gì cho bạn?',
        suggestedReplies: [
          {
            en: 'Because of that delay, I missed my connection to Berlin. Could you put me on the next available flight?',
            ipa: '',
            vi: 'Vì chuyến đó bị hoãn nên tôi lỡ chuyến nối tiếp đi Berlin. Bạn xếp giúp tôi sang chuyến sớm nhất tiếp theo được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let me look—there is one seat left at four thirty this afternoon, and we can also issue a meal voucher.',
        ipa: '',
        vi: 'Để tôi kiểm tra—chiều nay lúc 4 giờ 30 còn đúng một ghế trống, và hãng sẽ cấp thêm phiếu ăn uống cho bạn.',
        suggestedReplies: [
          {
            en: 'Four thirty works well, thank you. Will my checked bag automatically transfer to the new flight?',
            ipa: '',
            vi: '4 giờ 30 ổn đấy, cảm ơn bạn. Hành lý ký gửi của tôi có tự động chuyển sang chuyến mới không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-43',
    title: 'Hỏi Thủ Tục Hoàn Thuế VAT Tại Sân Bay',
    level: 'B1',
    category: 'Du lịch & Khách sạn',
    context: 'Trước khi làm thủ tục xuất cảnh, bạn hỏi nhân viên hải quan cách đóng dấu hóa đơn hoàn thuế mua sắm.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello! Are you here for the VAT tax-refund stamp? Please have your receipts and passport ready.',
        ipa: '',
        vi: 'Xin chào! Bạn tới đóng dấu hoàn thuế VAT đúng không? Vui lòng chuẩn bị sẵn hóa đơn và hộ chiếu nhé.',
        suggestedReplies: [
          {
            en: 'Yes, I bought these clothes yesterday. Do I need to show the actual items before checking in my suitcase?',
            ipa: '',
            vi: 'Vâng, tôi mua số quần áo này hôm qua. Tôi có cần xuất trình hàng hóa thực tế trước khi ký gửi vali không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Yes, if the goods are going into checked luggage, we must inspect them first before you drop off your bag.',
        ipa: '',
        vi: 'Có nhé, nếu hàng bỏ trong hành lý ký gửi thì chúng tôi phải kiểm tra trước khi bạn gửi vali.',
        suggestedReplies: [
          {
            en: 'Good thing I asked first! Once you stamp the forms, do I collect the refund at the counter past security?',
            ipa: '',
            vi: 'May mà tôi hỏi trước! Sau khi đóng dấu tờ khai xong thì tôi nhận tiền hoàn tại quầy qua cửa an ninh đúng không ạ?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-44',
    title: 'Xử Lý Sự Cố Khách Sạn Đặt Trùng Phòng',
    level: 'B2',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn đến nhận phòng lúc tối muộn nhưng khách sạn báo hết loại phòng bạn đã đặt trước.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good evening, Mr. Tuan. I am terribly sorry, but due to an unexpected maintenance issue, your deluxe king room is unavailable tonight.',
        ipa: '',
        vi: 'Chào buổi tối anh Tuấn. Tôi vô cùng xin lỗi, nhưng do sự cố bảo trì đột xuất, hạng phòng Deluxe King của anh tối nay không còn trống.',
        suggestedReplies: [
          {
            en: 'I booked and prepaid three weeks ago, and it is nearly ten PM. What comparable alternative can the hotel arrange tonight?',
            ipa: '',
            vi: 'Tôi đã đặt và thanh toán trước từ 3 tuần nay, giờ cũng gần 10 giờ đêm rồi. Khách sạn có phương án thay thế tương đương nào cho tối nay?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'We can place you in a twin suite for tonight at no extra charge, or relocate you to our sister five-star property five minutes away with free transport.',
        ipa: '',
        vi: 'Chúng tôi có thể nâng hạng sang phòng Suite hai giường miễn phí cho đêm nay, hoặc chuyển anh sang khách sạn 5 sao cùng hệ thống cách 5 phút kèm xe đưa đón.',
        suggestedReplies: [
          {
            en: 'Taking the suite here tonight is much easier than moving again, provided I can switch back to a king room tomorrow morning.',
            ipa: '',
            vi: 'Ở luôn phòng Suite tại đây tối nay tiện hơn nhiều so với di chuyển tiếp, miễn là sáng mai tôi được đổi lại phòng giường King.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-45',
    title: 'Tranh Luận Phí Hư Hỏng Xe Thuê Không Hợp Lý',
    level: 'B2',
    category: 'Du lịch & Khách sạn',
    context: 'Khi trả xe thuê, nhân viên chỉ vào vết xước cũ trên cản sau và định tính phí sửa chữa.',
    turns: [
      {
        speaker: 'AI',
        en: 'I just finished inspecting the rear bumper, and there is a deep scuff here that will require a repair charge under our policy.',
        ipa: '',
        vi: 'Tôi vừa kiểm tra xong cản sau và thấy có vết trầy sâu ở đây nên sẽ phải tính phí sửa chữa theo quy định.',
        suggestedReplies: [
          {
            en: 'Actually, that mark was already on the bumper at pickup—I flagged it on the check-out sheet and took photos before leaving the lot.',
            ipa: '',
            vi: 'Thật ra vết đó đã có sẵn trên cản xe lúc nhận rồi—tôi đã đánh dấu vào biên bản giao xe và chụp ảnh lại trước khi rời bãi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let me pull up the original inspection form and compare it with your photos. Ah, yes—it is faintly noted in section four.',
        ipa: '',
        vi: 'Để tôi mở lại biên bản kiểm tra ban đầu đối chiếu với ảnh của bạn. À, đúng rồi—có ghi chú mờ ở mục số bốn thật.',
        suggestedReplies: [
          {
            en: 'Great, please remove the damage fee from the final invoice and send me an updated clearance email before I head to my gate.',
            ipa: '',
            vi: 'Tốt rồi, nhờ bạn xóa khoản phí hư hỏng khỏi hóa đơn cuối cùng và gửi email xác nhận hoàn tất trước khi tôi ra cổng bay nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-46',
    title: 'Làm Việc Với Bảo Hiểm Du Lịch Khi Hủy Chuyến',
    level: 'B2',
    category: 'Du lịch & Khách sạn',
    context: 'Bão lớn làm hủy chuyến phà và đêm khách sạn không hoàn tiền, bạn gọi tổng đài bảo hiểm để hỏi hồ sơ bồi thường.',
    turns: [
      {
        speaker: 'AI',
        en: 'Travel Guard claims department. I understand your trip was disrupted by severe weather—what documentation have you gathered so far?',
        ipa: '',
        vi: 'Bộ phận bồi thường Travel Guard xin nghe. Tôi hiểu chuyến đi của bạn bị gián đoạn do thời tiết xấu—hiện bạn đã có những giấy tờ gì rồi?',
        suggestedReplies: [
          {
            en: 'I have the official ferry cancellation notice and the hotel invoice showing a non-refundable booking for last night.',
            ipa: '',
            vi: 'Tôi đã có thông báo hủy chuyến chính thức của hãng phà và hóa đơn khách sạn xác nhận đặt phòng đêm qua không hoàn tiền.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Those cover the main claim. To reimburse your extra hotel night as well, please upload the itemized receipt alongside your boarding pass.',
        ipa: '',
        vi: 'Các giấy tờ đó đủ cho khoản chính rồi. Để được hoàn thêm đêm khách sạn phát sinh, vui lòng tải lên hóa đơn chi tiết cùng thẻ lên tàu.',
        suggestedReplies: [
          {
            en: 'Understood. Once I submit everything through the portal, what is the typical turnaround time for reimbursement?',
            ipa: '',
            vi: 'Tôi đã rõ. Sau khi tôi nộp đủ hồ sơ qua cổng trực tuyến thì thời gian xử lý hoàn tiền thông thường mất bao lâu?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-47',
    title: 'Thương Lượng Giá Thuê Căn Hộ Nghỉ Dưỡng Dài Ngày',
    level: 'B2',
    category: 'Du lịch & Khách sạn',
    context: 'Bạn muốn thuê một căn hộ làm việc từ xa trong 2 tuần và trao đổi trực tiếp với chủ nhà về giá ưu đãi.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi! Thanks for inquiring about my seaside apartment. Are you looking to book all fourteen nights in November?',
        ipa: '',
        vi: 'Chào bạn! Cảm ơn đã hỏi thuê căn hộ ven biển của mình. Bạn dự định đặt trọn 14 đêm trong tháng 11 đúng không?',
        suggestedReplies: [
          {
            en: 'Yes, I am working remotely for two weeks. Since November is off-peak, would you consider a fifteen percent discount for a two-week stay?',
            ipa: '',
            vi: 'Đúng rồi, mình kết hợp làm việc từ xa trong 2 tuần. Vì tháng 11 là mùa thấp điểm, bạn có thể giảm giá 15% cho kỳ ở 2 tuần không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I can offer twelve percent off the nightly rate and waive the mid-stay cleaning fee, as long as the booking is confirmed today.',
        ipa: '',
        vi: 'Mình có thể giảm 12% giá mỗi đêm và miễn phí dọn phòng giữa kỳ, miễn là bạn chốt đặt phòng ngay hôm nay.',
        suggestedReplies: [
          {
            en: 'Twelve percent with free mid-stay cleaning sounds very fair. Could you just verify the Wi-Fi upload speed before I pay?',
            ipa: '',
            vi: 'Giảm 12% kèm miễn phí dọn giữa kỳ rất hợp lý. Bạn kiểm tra giúp mình tốc độ tải lên của Wi-Fi trước khi mình thanh toán nhé?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-48',
    title: 'Phản Ánh Tour Du Lịch Thay Đổi Lịch Trình',
    level: 'B2',
    category: 'Du lịch & Khách sạn',
    context: 'Tour tham quan đảo bị cắt bỏ hai điểm lặn ngắm san hô quan trọng mà không báo trước, bạn trao đổi với điều hành tour.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good morning, customer relations. I received your message regarding yesterday\'s island boat tour—could you walk me through what happened?',
        ipa: '',
        vi: 'Chào buổi sáng, bộ phận chăm sóc khách hàng. Tôi đã nhận tin nhắn về tour thuyền đảo hôm qua—bạn có thể kể rõ chuyện gì xảy ra không?',
        suggestedReplies: [
          {
            en: 'We paid for a full-day snorkeling itinerary, yet the crew skipped both coral reefs without explanation and returned ninety minutes early.',
            ipa: '',
            vi: 'Chúng tôi trả tiền cho lịch trình lặn ngắm san hô cả ngày, nhưng thủy thủ đoàn bỏ qua cả hai rạn san hô không lời giải thích và quay về sớm 90 phút.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I completely understand your frustration, especially since sea conditions were calm. Would a partial refund of forty percent resolve this fairly?',
        ipa: '',
        vi: 'Tôi hoàn toàn hiểu sự thất vọng của bạn, nhất là khi thời tiết biển hôm qua khá êm. Hoàn lại 40% giá vé có thỏa đáng cho bạn không?',
        suggestedReplies: [
          {
            en: 'A forty percent refund is reasonable, provided you also follow up with the captain so future guests are informed properly.',
            ipa: '',
            vi: 'Hoàn lại 40% là hợp lý, miễn là bên bạn cũng nhắc nhở thuyền trưởng để những đoàn khách sau được thông báo minh bạch hơn.',
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 3. Ẩm thực & Mua sắm (rp-49 .. rp-68)
  // ============================================================================
  {
    id: 'rp-49',
    title: 'Đặt Bàn Cho Hai Người Tại Nhà Hàng',
    level: 'A1',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn bước vào nhà hàng tối cùng một người bạn và hỏi nhân viên lễ tân xem còn bàn trống không.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good evening! Welcome to Olive Bistro. How many people are in your group?',
        ipa: '',
        vi: 'Chào buổi tối! Chào mừng tới Olive Bistro. Nhóm mình đi mấy người ạ?',
        suggestedReplies: [
          {
            en: 'A table for two, please. Do you have a seat near the window?',
            ipa: '',
            vi: 'Cho mình bàn hai người nhé. Có bàn nào gần cửa sổ không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Yes, we have one window table right over there. Please follow me, and here are your menus.',
        ipa: '',
        vi: 'Có ạ, bên kia còn một bàn cạnh cửa sổ. Mời anh chị đi theo tôi, thực đơn của mình đây ạ.',
        suggestedReplies: [
          {
            en: 'Thank you very much! Can we have two glasses of cold water first?',
            ipa: '',
            vi: 'Cảm ơn nhiều nhé! Cho bọn mình hai ly nước lọc mát trước được không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-50',
    title: 'Gọi Món Chính & Nước Uống Ở Quán Ăn',
    level: 'A1',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn đã xem xong thực đơn tại quán ăn trưa và gọi món cùng đồ uống với phục vụ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Are you ready to order now, or do you need a few more minutes?',
        ipa: '',
        vi: 'Bạn đã sẵn sàng gọi món chưa hay cần xem thêm vài phút nữa ạ?',
        suggestedReplies: [
          {
            en: 'I am ready. I would like the grilled chicken with rice, please.',
            ipa: '',
            vi: 'Mình sẵn sàng rồi. Cho mình phần gà nướng ăn kèm cơm nhé.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Great choice! And what would you like to drink with your meal?',
        ipa: '',
        vi: 'Lựa chọn tuyệt vời! Vậy bạn muốn uống gì kèm với bữa ăn ạ?',
        suggestedReplies: [
          {
            en: 'Just a glass of fresh orange juice without ice, thank you.',
            ipa: '',
            vi: 'Cho mình một ly nước cam tươi không đá thôi, cảm ơn bạn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-51',
    title: 'Hỏi Giá Trái Cây Tại Chợ Địa Phương',
    level: 'A1',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn ghé quầy hoa quả ở chợ địa phương để hỏi giá táo tươi và mua một ít mang về.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello! Everything here is fresh from the farm today. What are you looking for?',
        ipa: '',
        vi: 'Xin chào! Hoa quả ở đây hôm nay đều mới hái từ vườn. Bạn muốn tìm loại nào?',
        suggestedReplies: [
          {
            en: 'These red apples look delicious. How much are they per kilo?',
            ipa: '',
            vi: 'Mấy quả táo đỏ này trông ngon quá. Giá bao nhiêu một cân vậy ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'They are four dollars a kilo, and very sweet! How many would you like?',
        ipa: '',
        vi: 'Táo giá 4 đô một cân, ngọt lắm đấy! Bạn muốn lấy mấy cân ạ?',
        suggestedReplies: [
          {
            en: 'One kilo, please. Can I also take two yellow bananas?',
            ipa: '',
            vi: 'Cho mình một cân nhé. Mình lấy thêm hai quả chuối vàng được không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-52',
    title: 'Thanh Toán Siêu Thị & Tự Mang Túi',
    level: 'A1',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn xếp hàng tính tiền ở quầy thu ngân siêu thị và tự mang túi vải đi chợ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi! Did you find everything you needed today? Do you need a shopping bag?',
        ipa: '',
        vi: 'Chào bạn! Hôm nay bạn tìm đủ đồ cần mua chứ? Bạn có cần túi đựng không?',
        suggestedReplies: [
          {
            en: 'No bag needed, thank you. I brought my own cloth bag.',
            ipa: '',
            vi: 'Không cần túi đâu, cảm ơn bạn. Mình có mang theo túi vải riêng rồi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Awesome, thank you for helping the environment! Your total is eighteen dollars. Card or cash?',
        ipa: '',
        vi: 'Tuyệt vời, cảm ơn bạn đã góp phần bảo vệ môi trường! Tổng của bạn là 18 đô. Thẻ hay tiền mặt ạ?',
        suggestedReplies: [
          {
            en: 'I will pay by card, please. May I have the paper receipt too?',
            ipa: '',
            vi: 'Mình thanh toán bằng thẻ nhé. Cho mình xin luôn hóa đơn giấy được không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-53',
    title: 'Hỏi Đường Tìm Quầy Bánh Mì & Sữa',
    level: 'A1',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn đang đi siêu thị lớn lần đầu và hỏi nhân viên xem quầy bánh mì và sữa tươi nằm ở dãy nào.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good morning! Let me know if you are looking for a specific item.',
        ipa: '',
        vi: 'Chào buổi sáng! Hãy báo mình nếu bạn đang tìm món đồ cụ thể nào nhé.',
        suggestedReplies: [
          {
            en: 'Excuse me, which aisle has fresh bread and milk?',
            ipa: '',
            vi: 'Xin lỗi, bánh mì tươi và sữa nằm ở dãy hàng nào vậy ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Fresh bread is in aisle two on your left, and the dairy fridge is right at the back of aisle three.',
        ipa: '',
        vi: 'Bánh mì tươi ở dãy số 2 bên trái bạn, còn tủ sữa nằm ngay cuối dãy số 3.',
        suggestedReplies: [
          {
            en: 'Aisle two and aisle three. Thank you very much for your help!',
            ipa: '',
            vi: 'Dãy số 2 và dãy số 3. Cảm ơn bạn đã chỉ giúp nhé!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-54',
    title: 'Hỏi Thành Phần Món Ăn Vì Dị Ứng Đậu Phộng',
    level: 'A2',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn bị dị ứng nặng với đậu phộng nên cần hỏi kỹ nhân viên phục vụ trước khi gọi món salad và mì.',
    turns: [
      {
        speaker: 'AI',
        en: 'Welcome! Today our chef recommends the spicy Thai noodle salad. Would you like to try it?',
        ipa: '',
        vi: 'Chào mừng bạn! Hôm nay đầu bếp gợi ý món gỏi mì Thái cay. Bạn muốn thử không?',
        suggestedReplies: [
          {
            en: 'It sounds tasty, but I have a peanut allergy. Does the sauce contain peanuts or peanut oil?',
            ipa: '',
            vi: 'Nghe ngon đấy, nhưng mình bị dị ứng đậu phộng. Nước sốt món đó có đậu phộng hay dầu lạc không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Good thing you told me! That salad uses crushed peanuts, so I suggest our lemon herb pasta instead—it is completely nut-free.',
        ipa: '',
        vi: 'May mà bạn báo trước! Món gỏi đó có đậu phộng giã, nên mình gợi ý món mì Ý chanh thảo mộc—hoàn toàn không có hạt.',
        suggestedReplies: [
          {
            en: 'I will order the lemon herb pasta then. Thank you for checking carefully for me.',
            ipa: '',
            vi: 'Vậy mình gọi món mì Ý chanh thảo mộc nhé. Cảm ơn bạn đã kiểm tra kỹ giúp mình.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-55',
    title: 'Nhờ Gói Phần Thức Ăn Mang Về',
    level: 'A2',
    category: 'Ẩm thực & Mua sắm',
    context: 'Khẩu phần bữa tối quá lớn nên bạn không ăn hết và muốn nhờ nhân viên gói phần còn lại mang về.',
    turns: [
      {
        speaker: 'AI',
        en: 'How was everything tonight? Are you finished with your plate?',
        ipa: '',
        vi: 'Món ăn tối nay thế nào ạ? Bạn đã dùng xong phần ăn của mình chưa?',
        suggestedReplies: [
          {
            en: 'The food was delicious, just a bit too big for me. Could I get a takeaway box for the rest?',
            ipa: '',
            vi: 'Đồ ăn rất ngon, chỉ là khẩu phần hơi lớn so với mình. Cho mình xin hộp mang về phần còn lại được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Of course! I will pack that up for you right now. Would you like to see the dessert menu or the check?',
        ipa: '',
        vi: 'Được ngay ạ! Để mình gói vào hộp giúp bạn nhé. Bạn muốn xem thực đơn tráng miệng hay tính tiền luôn ạ?',
        suggestedReplies: [
          {
            en: 'Just the check, please, I am completely full. Could we split it on two cards?',
            ipa: '',
            vi: 'Tính tiền giúp mình luôn nhé, mình no lắm rồi. Bọn mình tách hóa đơn trả bằng hai thẻ được không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-56',
    title: 'Tìm Giày Chạy Bộ Đúng Cỡ Ở Cửa Hàng',
    level: 'A2',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn vào cửa hàng thể thao tìm mua một đôi giày chạy bộ êm chân và hỏi cỡ giày phù hợp.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey there! Are you shopping for casual sneakers or running shoes today?',
        ipa: '',
        vi: 'Chào bạn! Hôm nay bạn tìm giày đi chơi hàng ngày hay giày chạy bộ ạ?',
        suggestedReplies: [
          {
            en: 'I am looking for lightweight running shoes. Do you have this black pair in size nine?',
            ipa: '',
            vi: 'Mình đang tìm giày chạy bộ nhẹ. Đôi màu đen này có cỡ 9 không bạn?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let me check the stockroom—yes, here is a size nine! Feel free to walk around and test the cushion.',
        ipa: '',
        vi: 'Để mình kiểm tra kho nhé—vâng, có đôi cỡ 9 đây rồi! Bạn cứ đi thử vài vòng để cảm nhận độ êm nhé.',
        suggestedReplies: [
          {
            en: 'The cushion feels very comfortable, though my toes are slightly tight. Could I try a half size up?',
            ipa: '',
            vi: 'Đế êm lắm, nhưng phần mũi chân hơi kích một chút. Cho mình thử tăng lên nửa cỡ được không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-57',
    title: 'Hỏi Chương Trình Giảm Giá & Thẻ Thành Viên',
    level: 'A2',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn chọn được một chiếc ba lô ở cửa hàng và hỏi thu ngân xem mặt hàng có đang giảm giá không.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi! Ready to check out with this backpack? Do you have a store loyalty card with us?',
        ipa: '',
        vi: 'Chào bạn! Bạn thanh toán chiếc ba lô này phải không? Bạn có thẻ thành viên của cửa hàng chưa?',
        suggestedReplies: [
          {
            en: 'Not yet, can I sign up with my phone number? Also, is this backpack part of the weekend sale?',
            ipa: '',
            vi: 'Mình chưa có, đăng ký bằng số điện thoại được không? Với lại chiếc ba lô này có nằm trong đợt giảm giá cuối tuần không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Yes, all travel bags are twenty percent off today, and signing up adds another five percent welcome discount.',
        ipa: '',
        vi: 'Có nhé, tất cả túi du lịch hôm nay giảm 20%, và đăng ký thành viên mới được giảm thêm 5% nữa.',
        suggestedReplies: [
          {
            en: 'That is a great deal! Let me sign up right now before paying.',
            ipa: '',
            vi: 'Ưu đãi hời quá! Để mình đăng ký ngay trước khi thanh toán nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-58',
    title: 'Chọn Quà Sinh Nhật & Nhờ Gói Quà',
    level: 'A2',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn mua một bộ cốc gốm tặng sinh nhật bạn thân và hỏi dịch vụ gói quà miễn phí.',
    turns: [
      {
        speaker: 'AI',
        en: 'Welcome to Craft Corner! Are you picking something out for yourself or looking for a gift?',
        ipa: '',
        vi: 'Chào mừng tới Craft Corner! Bạn chọn đồ cho bản thân hay tìm quà tặng ạ?',
        suggestedReplies: [
          {
            en: 'It is a birthday gift for my close friend. Do you offer free gift wrapping at the counter?',
            ipa: '',
            vi: 'Đây là quà sinh nhật cho bạn thân mình. Quầy có gói quà miễn phí không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Yes, we wrap gifts for free! Would you prefer blue ribbon or gold paper, and do you need a gift receipt?',
        ipa: '',
        vi: 'Có chứ, tụi mình gói quà miễn phí! Bạn thích ruy băng xanh hay giấy gói vàng, và có cần hóa đơn không ghi giá không?',
        suggestedReplies: [
          {
            en: 'Blue ribbon looks lovely, and yes to a gift receipt just in case she wants to exchange the color.',
            ipa: '',
            vi: 'Ruy băng xanh trông xinh đấy, và cho mình xin hóa đơn quà tặng phòng trường hợp bạn ấy muốn đổi màu nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-59',
    title: 'Đổi Món Bị Phục Vụ Nhầm Tại Nhà Hàng',
    level: 'B1',
    category: 'Ẩm thực & Mua sắm',
    context: 'Nhân viên phục vụ mang ra đĩa mì thịt bò trong khi bạn gọi cá hồi nướng, bạn báo lại một cách lịch sự.',
    turns: [
      {
        speaker: 'AI',
        en: 'Here is your main course—the creamy beef pasta! Enjoy your meal, and let me know if you need pepper.',
        ipa: '',
        vi: 'Món chính của bạn đây—mì Ý sốt kem thịt bò! Chúc bạn ngon miệng, cần thêm tiêu cứ gọi mình nhé.',
        suggestedReplies: [
          {
            en: 'Excuse me, I think there might be a mix-up. I actually ordered the grilled salmon rather than the beef pasta.',
            ipa: '',
            vi: 'Xin lỗi bạn, hình như có chút nhầm lẫn rồi. Thật ra mình gọi cá hồi nướng chứ không phải mì bò.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Oh, I am so sorry about that! Our kitchen must have swapped two tickets. I will rush your salmon right away.',
        ipa: '',
        vi: 'Ồ, mình xin lỗi rất nhiều! Chắc bếp bị nhầm hai phiếu gọi món rồi. Để mình báo làm ngay phần cá hồi cho bạn.',
        suggestedReplies: [
          {
            en: 'No worries, mistakes happen. Roughly how long will the salmon take, since my friend already got her meal?',
            ipa: '',
            vi: 'Không sao đâu, nhầm lẫn là bình thường mà. Khoảng bao lâu nữa có cá hồi vậy bạn, vì bạn mình nhận được món rồi?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-60',
    title: 'Trả Lại Tai Nghe Bị Lỗi Âm Thanh',
    level: 'B1',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn mua tai nghe không dây tuần trước nhưng bên trái bị rè và mất kết nối liên tục nên mang ra cửa hàng đổi trả.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello, returns and exchanges desk! What brings you back with those wireless earbuds today?',
        ipa: '',
        vi: 'Xin chào, quầy đổi trả hàng xin nghe! Hôm nay bạn gặp vấn đề gì với chiếc tai nghe không dây này ạ?',
        suggestedReplies: [
          {
            en: 'I bought these six days ago, and the left earbud keeps crackling and disconnecting even after a full charge.',
            ipa: '',
            vi: 'Mình mua bộ này 6 ngày trước, nhưng tai bên trái cứ bị rè và ngắt kết nối liên tục dù đã sạc đầy pin.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Sorry for the hassle! Since you have the receipt and original box within fourteen days, would you like a replacement or a full refund?',
        ipa: '',
        vi: 'Xin lỗi vì sự bất tiện này! Vì bạn còn hóa đơn và hộp gốc trong vòng 14 ngày, bạn muốn đổi bộ mới hay hoàn tiền toàn bộ ạ?',
        suggestedReplies: [
          {
            en: 'A brand-new replacement is great, provided we can test the audio in store before I head home.',
            ipa: '',
            vi: 'Đổi sang bộ mới tinh là được rồi ạ, miễn là mình kiểm tra âm thanh ngay tại cửa hàng trước khi về.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-61',
    title: 'Nhờ Đầu Bếp Điều Chỉnh Độ Cay & Gia Vị',
    level: 'B1',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn đi ăn tối cùng khách hàng không ăn được cay nhiều và muốn điều chỉnh món ăn phù hợp khẩu vị.',
    turns: [
      {
        speaker: 'AI',
        en: 'Our signature stir-fried noodles come fairly spicy by default. How does your table handle chili heat?',
        ipa: '',
        vi: 'Món mì xào đặc trưng của quán mặc định khá cay đấy ạ. Bàn mình ăn được độ cay tới mức nào?',
        suggestedReplies: [
          {
            en: 'My guest prefers mild food, so could the kitchen make it with no chili and serve the spicy sauce on the side?',
            ipa: '',
            vi: 'Khách của mình thích ăn nhạt cay, bếp có thể làm không ớt và để riêng chén sốt cay bên ngoài được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Certainly! We can keep the dish mild and bring chili oil separately. Any other requests on oil or salt?',
        ipa: '',
        vi: 'Chắc chắn rồi! Bếp sẽ làm không cay và mang dầu ớt riêng ra bàn. Mình có yêu cầu thêm về dầu mỡ hay độ mặn không ạ?',
        suggestedReplies: [
          {
            en: 'Using a little less oil would be wonderful, thank you for being so accommodating.',
            ipa: '',
            vi: 'Cho ít dầu hơn một chút nữa thì tuyệt quá, cảm ơn quán đã rất chu đáo hỗ trợ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-62',
    title: 'Đặt Bàn Tiệc Sinh Nhật Nhóm Tám Người',
    level: 'B1',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn gọi điện đặt bàn tiệc cho 8 người vào tối thứ Bảy và hỏi về thực đơn trọn gói cũng như mang bánh kem.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good afternoon, Harbour Grill speaking! Are you calling to book a table for this weekend?',
        ipa: '',
        vi: 'Chào buổi chiều, nhà hàng Harbour Grill xin nghe! Bạn gọi để đặt bàn cho cuối tuần này đúng không ạ?',
        suggestedReplies: [
          {
            en: 'Yes, I would like to reserve a quiet table for eight people this Saturday at seven PM for a birthday dinner.',
            ipa: '',
            vi: 'Đúng rồi, mình muốn đặt một bàn yên tĩnh cho 8 người vào 7 giờ tối thứ Bảy này để tổ chức sinh nhật.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'We can set aside our semi-private corner for eight. Groups of that size usually choose a sharing set menu—would you like me to email it?',
        ipa: '',
        vi: 'Nhà hàng có thể giữ góc bán riêng tư cho 8 người. Nhóm tầm này thường chọn thực đơn gọi chung—bạn có muốn mình gửi qua email không?',
        suggestedReplies: [
          {
            en: 'Please do! Also, is there a cakeage fee if we bring our own birthday cake?',
            ipa: '',
            vi: 'Gửi giúp mình nhé! Với lại nếu tụi mình tự mang bánh sinh nhật theo thì có tính phụ phí cắt bánh không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-63',
    title: 'Hỏi Chính Sách Bảo Hành Máy Pha Cà Phê',
    level: 'B1',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn định mua máy pha cà phê gia đình tại cửa hàng điện máy và hỏi rõ về bảo hành và linh kiện thay thế.',
    turns: [
      {
        speaker: 'AI',
        en: 'That espresso machine is our best-selling home model this year. Do you have any questions about how it works?',
        ipa: '',
        vi: 'Chiếc máy pha espresso này là mẫu bán chạy nhất cho gia đình năm nay đấy. Bạn có thắc mắc gì về cách vận hành không?',
        suggestedReplies: [
          {
            en: 'It looks solid, though I want to know what the two-year warranty covers if the water pump breaks down.',
            ipa: '',
            vi: 'Trông máy chắc chắn đấy, nhưng mình muốn biết gói bảo hành 2 năm có chi trả nếu bơm nước bị hỏng không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'The manufacturer covers both parts and labor for internal defects, while descaling maintenance is up to the owner.',
        ipa: '',
        vi: 'Hãng bảo hành cả linh kiện lẫn công sửa cho lỗi kỹ thuật bên trong, còn việc tẩy cặn định kỳ thì người dùng tự thực hiện.',
        suggestedReplies: [
          {
            en: 'Makes sense. Where is your nearest service center in case I ever need a spare filter basket or repair?',
            ipa: '',
            vi: 'Hợp lý rồi. Trung tâm bảo hành gần nhất ở đâu để sau này nếu cần phin lọc thay thế hoặc sửa chữa mình ghé qua?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-64',
    title: 'Xử Lý Hóa Đơn Nhà Hàng Tính Sai Món',
    level: 'B2',
    category: 'Ẩm thực & Mua sắm',
    context: 'Khi kiểm tra hóa đơn sau bữa tối tiếp khách, bạn phát hiện quán tính thừa hai ly cocktail chưa từng gọi.',
    turns: [
      {
        speaker: 'AI',
        en: 'Thank you for dining with us tonight! Everything looked good on the check—are you ready for me to run your card?',
        ipa: '',
        vi: 'Cảm ơn quý khách đã dùng bữa tối nay! Hóa đơn ổn cả chứ—tôi quẹt thẻ luôn nhé ạ?',
        suggestedReplies: [
          {
            en: 'Hold on a second—before charging the card, could we double-check these two cocktails at the bottom? We only ordered sparkling water.',
            ipa: '',
            vi: 'Khoan một chút—trước khi quẹt thẻ, nhờ bạn kiểm tra lại hai ly cocktail ở cuối hóa đơn được không? Bàn mình chỉ gọi nước khoáng có ga thôi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Oh, let me review the table order right away. You are completely right, those belonged to table nine—I will void them immediately.',
        ipa: '',
        vi: 'Ồ, để tôi xem lại phiếu bàn ngay. Anh nói hoàn toàn đúng, hai món đó của bàn số 9—tôi sẽ hủy ngay lập tức.',
        suggestedReplies: [
          {
            en: 'Thanks for sorting that out quickly. Please print the revised receipt since I need to submit it for company reimbursement.',
            ipa: '',
            vi: 'Cảm ơn đã xử lý nhanh nhé. Nhờ bạn in lại hóa đơn mới giúp mình vì mình cần nộp để công ty thanh toán công tác phí.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-65',
    title: 'Thương Lượng Chiết Khấu Khi Mua Số Lượng Lớn',
    level: 'B2',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn phụ trách mua đồ ăn vặt và cà phê hạt hàng tháng cho văn phòng 40 người và đang đàm phán giá với nhà cung cấp.',
    turns: [
      {
        speaker: 'AI',
        en: 'Thanks for coming by our wholesale counter! For a one-time order of twenty bags of coffee beans, our standard price is fifteen dollars each.',
        ipa: '',
        vi: 'Cảm ơn bạn đã ghé quầy bán sỉ bên mình! Với đơn mua một lần 20 túi hạt cà phê, giá tiêu chuẩn là 15 đô mỗi túi.',
        suggestedReplies: [
          {
            en: 'Actually, we are looking for a recurring monthly supply for a forty-person office. If we commit for six months, what volume discount can you offer?',
            ipa: '',
            vi: 'Thật ra bên mình muốn đặt cung cấp định kỳ hàng tháng cho văn phòng 40 người. Nếu cam kết hợp đồng 6 tháng thì bên bạn chiết khấu sỉ bao nhiêu?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'For a six-month recurring contract at twenty bags a month, I can bring it down to twelve dollars a bag and include free office delivery.',
        ipa: '',
        vi: 'Với hợp đồng định kỳ 6 tháng mỗi tháng 20 túi, mình có thể giảm xuống còn 12 đô một túi và miễn phí giao tới tận văn phòng.',
        suggestedReplies: [
          {
            en: 'Twelve dollars with free delivery works within our budget. Could you send a formal quote by tomorrow so finance can approve it?',
            ipa: '',
            vi: 'Mức 12 đô kèm giao miễn phí vừa khít ngân sách bên mình. Bạn gửi báo giá chính thức trong ngày mai để bên tài chính duyệt nhé?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-66',
    title: 'Phản Hồi Chất Lượng Món Bít Tết Với Quản Lý',
    level: 'B2',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn gọi bít tết chín vừa (medium-rare) ở nhà hàng cao cấp nhưng món dọn ra bị chín kỹ và khô, quản lý ra bàn hỏi thăm.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good evening, I am the floor manager. Our server mentioned your steak was not cooked as requested—may I take a quick look?',
        ipa: '',
        vi: 'Chào buổi tối, tôi là quản lý sảnh. Phục vụ báo món bít tết của anh chưa đúng độ chín yêu cầu—tôi xem qua một chút được không ạ?',
        suggestedReplies: [
          {
            en: 'Yes, I ordered medium-rare, yet it arrived well-done all the way through and quite dry. I barely touched it.',
            ipa: '',
            vi: 'Vâng, tôi gọi chín tái vừa, nhưng khi mang ra lại chín kỹ hoàn toàn từ ngoài vào trong và khá khô. Tôi mới cắt thử một miếng thôi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That falls well below our kitchen standards, and I sincerely apologize. We are firing a fresh medium-rare cut right now and will take this dish off your bill.',
        ipa: '',
        vi: 'Điều này thật sự dưới chuẩn bếp của chúng tôi, tôi thành thật xin lỗi anh. Bếp đang nướng ngay phần mới chuẩn medium-rare và sẽ trừ món này khỏi hóa đơn.',
        suggestedReplies: [
          {
            en: 'I appreciate how professionally you handled that. A fresh remake is more than enough—no need to waive the whole steak if it turns out great.',
            ipa: '',
            vi: 'Tôi đánh giá cao cách xử lý rất chuyên nghiệp của anh. Làm lại một phần mới chuẩn vị là quá ổn rồi—nếu ngon thì không cần miễn phí cả đĩa đâu ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-67',
    title: 'Nhờ Tư Vấn Rượu Vang Kết Hợp Món Tối',
    level: 'B2',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn đặt bữa tối kỷ niệm và nhờ chuyên gia rượu vang của nhà hàng chọn chai rượu hợp với hải sản và ngân sách.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good evening! I see your table ordered seared scallops and herb-crusted sea bass. Would you like a pairing suggestion from our wine cellar?',
        ipa: '',
        vi: 'Chào buổi tối! Tôi thấy bàn mình gọi sò điệp áp chảo và cá vược nướng thảo mộc. Quý khách có muốn tôi gợi ý chai vang kết hợp từ hầm rượu không?',
        suggestedReplies: [
          {
            en: 'Yes, please. We enjoy crisp, dry white wines without heavy oak, ideally around sixty to seventy dollars a bottle.',
            ipa: '',
            vi: 'Có chứ. Tụi mình thích vang trắng thanh, ít ngọt và không quá đậm mùi gỗ sồi, tầm giá khoảng 60 đến 70 đô một chai.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'In that range, a New Zealand Sauvignon Blanc will cut cleanly through the butter sauce, whereas an unoaked Chablis adds bright minerality.',
        ipa: '',
        vi: 'Trong tầm giá đó, chai Sauvignon Blanc từ New Zealand sẽ cân bằng rất tốt vị sốt bơ, còn Chablis không ủ gỗ sồi lại mang vị khoáng thanh thoát.',
        suggestedReplies: [
          {
            en: 'The unoaked Chablis sounds spot-on for both dishes. Could you chill it slightly and pour two tasting sips first?',
            ipa: '',
            vi: 'Chai Chablis không ủ gỗ sồi nghe chuẩn gu cho cả hai món đấy. Nhờ anh ướp lạnh nhẹ và rót thử trước hai ngụm nhé?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-68',
    title: 'Sắp Xếp Lịch Giao & Lắp Đặt Nội Thất Cồng Kềnh',
    level: 'B2',
    category: 'Ẩm thực & Mua sắm',
    context: 'Bạn mua bộ bàn ăn và tủ gỗ tại showroom, giờ cần thống nhất khung giờ giao hàng, thang máy chở hàng và phí lắp ráp.',
    turns: [
      {
        speaker: 'AI',
        en: 'Your dining set is scheduled for warehouse dispatch next Wednesday. Does your apartment building require elevator reservations for bulky deliveries?',
        ipa: '',
        vi: 'Bộ bàn ăn của bạn dự kiến xuất kho vào thứ Tư tới. Chung cư nhà bạn có yêu cầu đặt trước thang máy chở hàng cồng kềnh không?',
        suggestedReplies: [
          {
            en: 'Yes, freight elevators can only be booked between one and four PM on weekdays, and management requires a forty-eight-hour notice.',
            ipa: '',
            vi: 'Có ạ, thang hàng chỉ cho đặt khung từ 1 giờ đến 4 giờ chiều ngày thường, và ban quản lý yêu cầu báo trước 48 tiếng.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Good to know—let us lock in Wednesday from one to three PM. Does your invoice already include in-room assembly and packaging removal?',
        ipa: '',
        vi: 'May mà bạn báo trước—vậy mình chốt khung 1 giờ đến 3 giờ chiều thứ Tư nhé. Hóa đơn của bạn đã gồm công lắp ráp trong phòng và thu dọn thùng bìa chưa?',
        suggestedReplies: [
          {
            en: 'The sales rep promised complimentary assembly on orders over one thousand dollars—could you verify that note is visible to the delivery crew?',
            ipa: '',
            vi: 'Bạn nhân viên bán hàng có hứa miễn phí lắp đặt cho đơn trên 1000 đô—bạn kiểm tra giúp ghi chú đó đã hiển thị cho đội giao hàng chưa nhé?',
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 4. Văn phòng & Email (rp-69 .. rp-88)
  // ============================================================================
  {
    id: 'rp-69',
    title: 'Chào Hỏi Đồng Nghiệp Ngày Đầu Đi Làm',
    level: 'A1',
    category: 'Văn phòng & Email',
    context: 'Hôm nay là ngày đầu tiên bạn nhận việc và một đồng nghiệp ngồi bàn bên cạnh bắt chuyện làm quen.',
    turns: [
      {
        speaker: 'AI',
        en: 'Good morning! Are you the new member joining our marketing team today? I am David.',
        ipa: '',
        vi: 'Chào buổi sáng! Hôm nay bạn là thành viên mới gia nhập đội marketing phải không? Mình là David.',
        suggestedReplies: [
          {
            en: 'Hi David! Yes, I am Linh. Today is my first day here, nice to meet you.',
            ipa: '',
            vi: 'Chào David! Đúng rồi, mình là Linh. Hôm nay là ngày đầu mình đi làm, rất vui được gặp bạn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Welcome to the team, Linh! Feel free to ask me anything about the office or lunch spots around here.',
        ipa: '',
        vi: 'Chào mừng vào đội, Linh! Có gì chưa rõ về văn phòng hay chỗ ăn trưa quanh đây cứ hỏi mình nhé.',
        suggestedReplies: [
          {
            en: 'Thank you so much! Where do people usually have lunch at noon?',
            ipa: '',
            vi: 'Cảm ơn bạn nhiều! Buổi trưa mọi người thường ăn ở đâu vậy?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-70',
    title: 'Hỏi Vị Trí Phòng Họp & Cách Dùng Máy In',
    level: 'A1',
    category: 'Văn phòng & Email',
    context: 'Bạn cần in bản tài liệu trước cuộc họp và hỏi đồng nghiệp xem máy in và phòng họp ở đâu.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey! You look busy with those folders. Do you need a hand with something?',
        ipa: '',
        vi: 'Này! Trông bạn có vẻ bận với đống tài liệu đó. Bạn cần giúp gì không?',
        suggestedReplies: [
          {
            en: 'Yes, please! Where is the office printer, and how do I connect to it?',
            ipa: '',
            vi: 'Vâng giúp mình với! Máy in văn phòng đặt ở đâu và kết nối thế nào vậy?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'The printer is next to the coffee corner, and you just tap your employee badge to print.',
        ipa: '',
        vi: 'Máy in ở ngay cạnh góc pha cà phê, bạn chỉ cần quẹt thẻ nhân viên để in thôi.',
        suggestedReplies: [
          {
            en: 'That is easy! Also, is meeting room B on this same floor?',
            ipa: '',
            vi: 'Dễ thế à! Với lại phòng họp B có nằm cùng tầng này không bạn?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-71',
    title: 'Xin Nghỉ Phép Một Ngày Vì Việc Gia Đình',
    level: 'A1',
    category: 'Văn phòng & Email',
    context: 'Bạn ghé qua bàn quản lý trực tiếp để xin phép nghỉ một ngày vào thứ Sáu tuần này.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi Nam, come on in. Did you want to talk about this week\'s tasks?',
        ipa: '',
        vi: 'Chào Nam, vào đi em. Em muốn trao đổi về công việc tuần này à?',
        suggestedReplies: [
          {
            en: 'Yes, may I take this Friday off for a family matter? I will finish my report on Thursday.',
            ipa: '',
            vi: 'Vâng, em có thể xin nghỉ phép thứ Sáu tuần này vì việc gia đình không ạ? Em sẽ hoàn thành báo cáo vào thứ Năm.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Sure, Friday is fine as long as the report is ready by Thursday afternoon. Please submit it in the HR system too.',
        ipa: '',
        vi: 'Được chứ, thứ Sáu nghỉ ổn thôi miễn là chiều thứ Năm có báo cáo. Em nhớ gửi đơn trên hệ thống nhân sự nhé.',
        suggestedReplies: [
          {
            en: 'I will submit the leave request right now. Thank you very much!',
            ipa: '',
            vi: 'Em sẽ gửi đơn xin nghỉ ngay bây giờ ạ. Em cảm ơn sếp nhiều!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-72',
    title: 'Xác Nhận Giờ Họp Nhóm Buổi Chiều',
    level: 'A1',
    category: 'Văn phòng & Email',
    context: 'Bạn nhận thấy lịch mời họp có hai thông báo khác nhau nên hỏi lại đồng nghiệp cho chắc chắn.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey, are you ready for our weekly design review this afternoon?',
        ipa: '',
        vi: 'Này, bạn chuẩn bị cho buổi rà soát thiết kế chiều nay xong chưa?',
        suggestedReplies: [
          {
            en: 'Almost ready! Excuse me, does the meeting start at two PM or three PM?',
            ipa: '',
            vi: 'Gần xong rồi! Cho mình hỏi cuộc họp bắt đầu lúc 2 giờ chiều hay 3 giờ chiều vậy?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'It starts at two PM in room 4A. Our manager sent a new calendar invite this morning.',
        ipa: '',
        vi: 'Bắt đầu lúc 2 giờ chiều tại phòng 4A nhé. Sáng nay sếp mới gửi lại lịch mời mới rồi.',
        suggestedReplies: [
          {
            en: 'Two PM in room 4A. Good thing I checked—thank you!',
            ipa: '',
            vi: '2 giờ chiều ở phòng 4A. May mà mình hỏi lại—cảm ơn bạn nhé!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-73',
    title: 'Hỏi Địa Chỉ Email Để Gửi Tài Liệu',
    level: 'A1',
    category: 'Văn phòng & Email',
    context: 'Sau buổi trao đổi nhanh với đối tác mới, bạn cần xin chính xác địa chỉ email để gửi hồ sơ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Thanks for explaining the schedule clearly! Could you send me the price list later today?',
        ipa: '',
        vi: 'Cảm ơn bạn đã giải thích lịch trình rõ ràng! Hôm nay bạn gửi cho mình bảng giá nhé?',
        suggestedReplies: [
          {
            en: 'Sure! What is your email address? Could you spell your last name for me?',
            ipa: '',
            vi: 'Chắc chắn rồi! Địa chỉ email của bạn là gì? Bạn đánh vần giúp mình phần họ được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'It is anna.miller@brightco.com—that is M-I-L-L-E-R. Feel free to copy my assistant too.',
        ipa: '',
        vi: 'Địa chỉ là anna.miller@brightco.com—đánh vần là M-I-L-L-E-R nhé. Bạn cc thêm trợ lý của mình giúp luôn nhé.',
        suggestedReplies: [
          {
            en: 'Got it! I will send the file in ten minutes. Please check your inbox.',
            ipa: '',
            vi: 'Mình ghi lại rồi! 10 phút nữa mình sẽ gửi tệp. Bạn kiểm tra hộp thư nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-74',
    title: 'Báo Đến Muộn Vì Kẹt Xe Buổi Sáng',
    level: 'A2',
    category: 'Văn phòng & Email',
    context: 'Trời mưa lớn khiến đường kẹt cứng nên bạn gọi báo cho trưởng nhóm biết sẽ tới họp trễ 15 phút.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello, Mai? The morning stand-up starts in five minutes—are you already on the way?',
        ipa: '',
        vi: 'A lô Mai à? Buổi họp đầu ngày 5 phút nữa bắt đầu rồi—em đang trên đường tới chưa?',
        suggestedReplies: [
          {
            en: 'I am stuck in heavy traffic because of the rain. I will be about fifteen minutes late, sorry!',
            ipa: '',
            vi: 'Em đang bị kẹt xe nặng do trời mưa to ạ. Em sẽ tới trễ khoảng 15 phút, em xin lỗi nhé!',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Thanks for letting me know early! Drive safely. Should I cover your task updates first, or do you want to join by phone?',
        ipa: '',
        vi: 'Cảm ơn em đã báo sớm! Đi đường cẩn thận nhé. Anh cập nhật giúp phần việc của em trước hay em vào họp qua điện thoại?',
        suggestedReplies: [
          {
            en: 'I already posted my update in the team chat, so please go ahead without waiting for me.',
            ipa: '',
            vi: 'Em vừa nhắn phần cập nhật tiến độ vào nhóm chat rồi, mọi người cứ họp trước không cần đợi em đâu ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-75',
    title: 'Nhờ Đồng Nghiệp Đọc Soát Bản Nháp Email',
    level: 'A2',
    category: 'Văn phòng & Email',
    context: 'Bạn vừa viết một email quan trọng bằng tiếng Anh gửi khách hàng nước ngoài và nhờ đồng nghiệp xem lại giọng văn.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey! You mentioned earlier you wanted a second pair of eyes on an email. Is it ready?',
        ipa: '',
        vi: 'Này! Lúc nãy bạn bảo muốn có thêm người xem giúp một email. Viết xong chưa?',
        suggestedReplies: [
          {
            en: 'Yes, I just finished the draft for our Singapore client. Could you check if the tone sounds polite enough?',
            ipa: '',
            vi: 'Xong rồi, mình vừa viết xong bản nháp gửi khách hàng Singapore. Bạn xem giúp giọng văn nghe đủ lịch sự chưa nhé?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Sure, let me read it. Everything looks very clear! I would only soften the second sentence slightly and attach the PDF before clicking send.',
        ipa: '',
        vi: 'Được chứ, để mình đọc. Mọi thứ rất rõ ràng rồi! Mình chỉ chỉnh câu thứ hai mềm mại hơn chút và nhớ đính kèm file PDF trước khi bấm gửi.',
        suggestedReplies: [
          {
            en: 'Good catch on the attachment—I almost forgot! Thanks so much for reviewing it.',
            ipa: '',
            vi: 'May mà bạn nhắc file đính kèm—suýt nữa thì mình quên mất! Cảm ơn bạn nhiều vì đã xem giúp.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-76',
    title: 'Đặt Phòng Họp & Chuẩn Bị Máy Chiếu',
    level: 'A2',
    category: 'Văn phòng & Email',
    context: 'Bạn nhắn nhân viên hành chính giúp đặt phòng họp có màn hình trình chiếu cho buổi gặp đối tác sáng mai.',
    turns: [
      {
        speaker: 'AI',
        en: 'Admin desk here! How can I help with tomorrow\'s schedule?',
        ipa: '',
        vi: 'Bộ phận hành chính xin nghe! Tôi có thể hỗ trợ gì cho lịch ngày mai ạ?',
        suggestedReplies: [
          {
            en: 'Could you book a meeting room for six people tomorrow from ten to eleven AM?',
            ipa: '',
            vi: 'Bạn đặt giúp mình một phòng họp cho 6 người vào sáng mai từ 10 giờ đến 11 giờ được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let me check—the Oak Room is open at ten. Do you need a projector or video conferencing setup?',
        ipa: '',
        vi: 'Để mình xem—phòng Oak trống lúc 10 giờ đấy. Bạn có cần máy chiếu hay thiết bị họp trực tuyến không?',
        suggestedReplies: [
          {
            en: 'Yes, we need a projector and an HDMI cable for my laptop. Thank you for arranging it!',
            ipa: '',
            vi: 'Có ạ, bên mình cần máy chiếu và dây cáp HDMI cắm laptop. Cảm ơn bạn đã sắp xếp giúp!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-77',
    title: 'Gọi Điện Nhắc Khách Hàng Phản Hồi Báo Giá',
    level: 'A2',
    category: 'Văn phòng & Email',
    context: 'Bạn đã gửi bảng báo giá qua email từ tuần trước nhưng chưa thấy khách hàng trả lời nên gọi hỏi thăm khéo.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello, Kevin speaking. Who is calling, please?',
        ipa: '',
        vi: 'A lô, Kevin nghe máy. Xin hỏi ai đang gọi đấy ạ?',
        suggestedReplies: [
          {
            en: 'Hi Kevin, this is Minh from VietDesign. I am following up on the quotation email I sent last Tuesday.',
            ipa: '',
            vi: 'Chào anh Kevin, em là Minh bên VietDesign. Em gọi để hỏi thăm về email báo giá em đã gửi thứ Ba tuần trước ạ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Oh, hello Minh! Sorry for the slow reply—our team is still comparing two options and had a quick question on delivery time.',
        ipa: '',
        vi: 'Ồ, chào Minh! Xin lỗi vì phản hồi chậm—nhóm anh vẫn đang cân nhắc hai phương án và muốn hỏi thêm về thời gian giao hàng.',
        suggestedReplies: [
          {
            en: 'Happy to clarify! Standard delivery takes two weeks after confirmation, and I can resend the updated timeline today.',
            ipa: '',
            vi: 'Em rất sẵn lòng giải đáp ạ! Giao hàng tiêu chuẩn mất 2 tuần sau khi chốt đơn, hôm nay em sẽ gửi lại lịch trình chi tiết qua email nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-78',
    title: 'Xin Phép Về Sớm Đi Khám Răng',
    level: 'A2',
    category: 'Văn phòng & Email',
    context: 'Bạn có lịch hẹn nha sĩ lúc 4 giờ chiều nên xin quản lý về sớm một tiếng và cam kết hoàn tất việc trong ngày.',
    turns: [
      {
        speaker: 'AI',
        en: 'Sure, what is up? Do you need help with the client presentation?',
        ipa: '',
        vi: 'Ừ, có chuyện gì thế em? Em cần hỗ trợ gì cho bài thuyết trình khách hàng à?',
        suggestedReplies: [
          {
            en: 'I finished the slides already. I have a dental appointment at four PM, so may I leave at three thirty today?',
            ipa: '',
            vi: 'Em làm xong slide rồi ạ. Lúc 4 giờ chiều em có hẹn khám răng nên hôm nay em xin phép về lúc 3 giờ rưỡi được không ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Since your slides are done and sent over, leaving at three thirty is totally fine. Make sure to rest well afterward!',
        ipa: '',
        vi: 'Vì slide em làm xong và gửi qua rồi nên về lúc 3 giờ rưỡi hoàn toàn ổn nhé. Nhớ nghỉ ngơi sau khi khám xong đấy!',
        suggestedReplies: [
          {
            en: 'Thank you! I will keep my phone nearby in case anything urgent comes up before five.',
            ipa: '',
            vi: 'Em cảm ơn anh! Em vẫn bật điện thoại phòng trường hợp trước 5 giờ có việc gấp cần trao đổi ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-79',
    title: 'Xin Gia Hạn Thời Hạn Nộp Báo Cáo Tháng',
    level: 'B1',
    category: 'Văn phòng & Email',
    context: 'Số liệu từ đối tác gửi về trễ khiến bạn chưa thể hoàn thành báo cáo tháng đúng 5 giờ chiều nay.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey, just checking in—are we still on track to send the monthly sales report to leadership at five PM?',
        ipa: '',
        vi: 'Này, mình hỏi thăm chút—hôm nay mình vẫn kịp gửi báo cáo doanh số tháng cho ban giám đốc lúc 5 giờ chiều chứ?',
        suggestedReplies: [
          {
            en: 'Actually, the regional team only sent their raw numbers an hour ago. Could we extend the deadline until ten AM tomorrow?',
            ipa: '',
            vi: 'Thật ra đội khu vực mới gửi số liệu thô cách đây một tiếng thôi. Mình có thể dời hạn nộp sang 10 giờ sáng mai được không?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Ten AM tomorrow works if we send a brief note to leadership today. Do you need any help verifying the spreadsheets?',
        ipa: '',
        vi: '10 giờ sáng mai cũng được nếu hôm nay mình gửi thông báo ngắn cho ban giám đốc. Bạn có cần ai phụ kiểm tra bảng tính không?',
        suggestedReplies: [
          {
            en: 'I can handle the analysis myself, and I will email leadership right now so nobody is left waiting at five.',
            ipa: '',
            vi: 'Phần phân tích mình tự xử lý được, và mình sẽ gửi email báo trước cho ban giám đốc ngay để 5 giờ mọi người không chờ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-80',
    title: 'Bàn Giao Công Việc Trước Kỳ Nghỉ Phép',
    level: 'B1',
    category: 'Văn phòng & Email',
    context: 'Bạn sắp nghỉ phép 5 ngày và đang bàn giao đầu việc, tệp tài liệu và đầu mối liên hệ cho đồng nghiệp.',
    turns: [
      {
        speaker: 'AI',
        en: 'Enjoy your upcoming trip! Before you head out tonight, what accounts should I keep an eye on while you are away?',
        ipa: '',
        vi: 'Chúc bạn chuyến đi sắp tới vui vẻ nhé! Trước khi về tối nay, có tài khoản khách hàng nào mình cần theo dõi giúp lúc bạn vắng mặt không?',
        suggestedReplies: [
          {
            en: 'Thanks! Mostly the Orion renewal—I put the latest contract draft and Sarah\'s email in our shared handover folder.',
            ipa: '',
            vi: 'Cảm ơn bạn! Chủ yếu là hợp đồng gia hạn với Orion—mình đã để bản thảo mới nhất và email của Sarah trong thư mục bàn giao chung rồi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Got it, I see the folder here. Should I go ahead and sign off on the invoice if she approves it on Wednesday?',
        ipa: '',
        vi: 'Mình thấy thư mục rồi. Nếu thứ Tư chị ấy duyệt thì mình ký xác nhận hóa đơn luôn hay đợi bạn về?',
        suggestedReplies: [
          {
            en: 'Please go ahead and send it to finance once she confirms, so the campaign launch does not get delayed.',
            ipa: '',
            vi: 'Chị ấy xác nhận là bạn chuyển thẳng sang bộ phận tài chính giúp mình luôn nhé, kẻo trễ lịch chạy chiến dịch.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-81',
    title: 'Điều Phối Giờ Họp Giữa Hai Múi Giờ',
    level: 'B1',
    category: 'Văn phòng & Email',
    context: 'Bạn gọi trao đổi với đối tác ở London hoặc New York để chốt khung giờ họp hợp lý cho cả hai múi giờ.',
    turns: [
      {
        speaker: 'AI',
        en: 'We would love to schedule a kickoff call next Tuesday. Does three PM Eastern time work on your side?',
        ipa: '',
        vi: 'Bên mình rất muốn xếp cuộc gọi khởi động vào thứ Ba tuần tới. 3 giờ chiều giờ miền Đông Mỹ bên bạn có tiện không?',
        suggestedReplies: [
          {
            en: 'Three PM Eastern would be two AM here in Vietnam. Could we try nine AM your time instead, which is eight PM for me?',
            ipa: '',
            vi: '3 giờ chiều giờ miền Đông là 2 giờ sáng ở Việt Nam mất rồi. Mình đổi sang 9 giờ sáng bên bạn được không, lúc đó bên mình là 8 giờ tối?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Oh, sorry for miscalculating the time difference! Nine AM Eastern is completely open on Tuesday—thanks for being flexible at eight PM.',
        ipa: '',
        vi: 'Ồ, xin lỗi vì mình tính nhầm chênh lệch múi giờ! 9 giờ sáng thứ Ba bên mình hoàn toàn trống—cảm ơn bạn đã linh hoạt họp lúc 8 giờ tối nhé.',
        suggestedReplies: [
          {
            en: 'Not a problem at all! I will send over the calendar invite with the video link right after this call.',
            ipa: '',
            vi: 'Không có gì đâu! Ngay sau cuộc gọi này mình sẽ gửi lời mời lịch kèm đường dẫn họp trực tuyến nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-82',
    title: 'Nhắc Bộ Phận Tài Chính Duyệt Hóa Đơn Công Tác',
    level: 'B1',
    category: 'Văn phòng & Email',
    context: 'Bạn đã nộp chứng từ công tác phí hai tuần trước nhưng vẫn chưa nhận được thanh toán nên hỏi lại kế toán.',
    turns: [
      {
        speaker: 'AI',
        en: 'Finance desk, Emily speaking. How can I help you today?',
        ipa: '',
        vi: 'Phòng tài chính, Emily xin nghe. Hôm nay mình giúp gì được cho bạn?',
        suggestedReplies: [
          {
            en: 'Hi Emily, I submitted my Bangkok trip expense claim two weeks ago, and its status still shows pending review.',
            ipa: '',
            vi: 'Chào Emily, mình đã nộp đề nghị hoàn chi phí chuyến công tác Bangkok từ 2 tuần trước mà trạng thái vẫn ghi đang chờ duyệt.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let me check your ticket—ah, it looks like the hotel tax receipt scanned a bit blurry, so the system flagged it.',
        ipa: '',
        vi: 'Để mình kiểm tra phiếu của bạn—à, hóa ra bản quét hóa đơn thuế khách sạn bị hơi mờ nên hệ thống giữ lại.',
        suggestedReplies: [
          {
            en: 'Oh, I still have the clear PDF from the hotel! If I email it over this morning, can it make Friday\'s payout run?',
            ipa: '',
            vi: 'Ồ, mình vẫn giữ bản PDF rõ nét từ khách sạn! Nếu sáng nay mình gửi qua email thì có kịp đợt chi trả thứ Sáu này không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-83',
    title: 'Đề Xuất Cải Tiến Quy Trình Họp Nhóm',
    level: 'B1',
    category: 'Văn phòng & Email',
    context: 'Các cuộc họp tuần gần đây thường kéo dài quá giờ và thiếu kết luận rõ ràng, bạn góp ý trong buổi tổng kết.',
    turns: [
      {
        speaker: 'AI',
        en: 'Several people mentioned our Monday sync feels a bit rushed at the end. What changes do you think would make it better?',
        ipa: '',
        vi: 'Nhiều bạn góp ý buổi họp sáng thứ Hai gần đây cuối giờ hơi gấp gáp. Bạn nghĩ nên thay đổi gì để hiệu quả hơn?',
        suggestedReplies: [
          {
            en: 'We spend too long reading status updates aloud. If everyone writes updates beforehand, we can focus meeting time purely on blockers.',
            ipa: '',
            vi: 'Mình tốn quá nhiều thời gian đọc tiến độ thành tiếng. Nếu mọi người điền cập nhật trước, giờ họp chỉ tập trung giải quyết vướng mắc thôi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I like that idea—it could cut the meeting from an hour down to thirty minutes. Should we also assign someone to summarize action items?',
        ipa: '',
        vi: 'Mình thích ý tưởng đó—có thể rút cuộc họp từ 1 tiếng xuống còn 30 phút đấy. Mình có nên phân công một người tóm tắt đầu việc cuối buổi luôn không?',
        suggestedReplies: [
          {
            en: 'Yes, rotating a note-taker each week and posting three clear action items in chat right after would keep everyone aligned.',
            ipa: '',
            vi: 'Đúng rồi, luân phiên người ghi chú mỗi tuần và đăng ba đầu việc chốt ngay vào nhóm chat sẽ giúp cả đội bám sát nhau hơn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-84',
    title: 'Từ Chối Khéo Yêu Cầu Ngoài Phạm Vi Dự Án',
    level: 'B2',
    category: 'Văn phòng & Email',
    context: 'Khách hàng đột ngột yêu cầu thêm hai tính năng lớn vào phút chót mà không tăng ngân sách hay thời gian.',
    turns: [
      {
        speaker: 'AI',
        en: 'By the way, while you are finishing the mobile redesign, could your team also add a custom analytics dashboard before Friday\'s launch?',
        ipa: '',
        vi: 'Nhân tiện, trong lúc bên bạn hoàn thiện thiết kế lại bản di động, nhóm bạn làm thêm luôn bảng thống kê tùy chỉnh trước ngày ra mắt thứ Sáu nhé?',
        suggestedReplies: [
          {
            en: 'A custom analytics dashboard is definitely valuable, though it falls outside our signed phase-one scope and would risk Friday\'s release stability.',
            ipa: '',
            vi: 'Bảng thống kê tùy chỉnh chắc chắn rất hữu ích, nhưng hạng mục đó nằm ngoài phạm vi giai đoạn một đã ký và sẽ ảnh hưởng độ ổn định khi ra mắt thứ Sáu.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I see your point about keeping the launch smooth. Still, our stakeholders are asking for basic traffic metrics right away—what options do we have?',
        ipa: '',
        vi: 'Tôi hiểu ý bạn về việc giữ ngày ra mắt trơn tru. Tuy nhiên ban lãnh đạo vẫn muốn xem ngay các chỉ số truy cập cơ bản—chúng ta có phương án nào không?',
        suggestedReplies: [
          {
            en: 'We can hook up standard page-view tracking before Friday at no extra delay, then scope the full custom dashboard as phase two next week.',
            ipa: '',
            vi: 'Bên mình có thể gắn đo lượt xem trang tiêu chuẩn trước thứ Sáu mà không làm trễ lịch, rồi tách bảng thống kê tùy chỉnh đầy đủ sang giai đoạn hai vào tuần sau.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-85',
    title: 'Thống Nhất Lại Phạm Vi Khi Đội Thiếu Nhân Sự',
    level: 'B2',
    category: 'Văn phòng & Email',
    context: 'Một thành viên chủ chốt nghỉ ốm đột xuất khiến bạn phải thương lượng lại thứ tự ưu tiên với các bên liên quan.',
    turns: [
      {
        speaker: 'AI',
        en: 'With Alex out on medical leave for ten days, how realistic is it to deliver all four Q3 deliverables by the thirtieth?',
        ipa: '',
        vi: 'Với việc Alex nghỉ phép chữa bệnh 10 ngày, khả năng bàn giao trọn vẹn cả bốn đầu việc quý 3 trước ngày 30 thực tế tới đâu?',
        suggestedReplies: [
          {
            en: 'Honestly, keeping all four without dropping quality is unrealistic. If we protect the client onboarding flow and billing fix, we should defer the internal export tool.',
            ipa: '',
            vi: 'Thành thật mà nói, giữ đủ cả bốn mục mà không giảm chất lượng là bất khả thi. Nếu ưu tiên giữ luồng đón khách mới và sửa lỗi thanh toán, mình nên dời công cụ xuất dữ liệu nội bộ lại.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Deferring the internal tool makes sense from a business standpoint. How long will that push the export feature back once Alex returns?',
        ipa: '',
        vi: 'Dời công cụ nội bộ xét về mặt kinh doanh rất hợp lý. Khi Alex quay lại thì tính năng xuất dữ liệu sẽ bị lùi thêm bao lâu?',
        suggestedReplies: [
          {
            en: 'Only about one sprint—roughly ten business days—and I will send a revised timeline email to all department leads this afternoon.',
            ipa: '',
            vi: 'Chỉ khoảng một chu kỳ sprint thôi—tầm 10 ngày làm việc—và chiều nay mình sẽ gửi email cập nhật lộ trình mới cho tất cả trưởng bộ phận.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-86',
    title: 'Xử Lý Sự Cố Email Gửi Nhầm Bảng Giá Cũ',
    level: 'B2',
    category: 'Văn phòng & Email',
    context: 'Một nhân viên trong nhóm vừa gửi nhầm bảng giá cũ năm ngoái cho đối tác lớn, bạn họp gấp cách gửi email đính chính.',
    turns: [
      {
        speaker: 'AI',
        en: 'I just realized the proposal email I sent to Apex Corp had last year\'s discounted rate sheet attached instead of the updated 2026 pricing.',
        ipa: '',
        vi: 'Mình vừa phát hiện email đề xuất gửi cho Apex Corp bị đính kèm nhầm bảng giá ưu đãi năm ngoái thay vì bảng giá cập nhật 2026.',
        suggestedReplies: [
          {
            en: 'Let us address it right away rather than hoping they miss it. Send a brief, transparent follow-up replacing the attachment before their review meeting.',
            ipa: '',
            vi: 'Mình xử lý thẳng ngay lập tức thay vì hy vọng họ không để ý nhé. Bạn gửi email đính chính ngắn gọn, minh bạch thay tệp mới trước buổi họp duyệt của họ đi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Should I offer to honor part of the old pricing as a goodwill gesture, or simply apologize for the clerical error and attach the correct PDF?',
        ipa: '',
        vi: 'Mình có nên đề xuất giữ một phần mức giá cũ để giữ thiện chí không, hay chỉ xin lỗi vì sai sót văn thư và đính kèm bản PDF chuẩn?',
        suggestedReplies: [
          {
            en: 'Take full ownership cleanly without discounting prematurely—only discuss flexible terms if their procurement lead raises it on the call.',
            ipa: '',
            vi: 'Cứ nhận trách nhiệm rõ ràng mà đừng vội giảm giá trước—chỉ bàn phương án linh hoạt nếu trưởng phòng mua hàng của họ nhắc tới trong cuộc gọi.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-87',
    title: 'Đề Xuất Tăng Ngân Sách Cho Chiến Dịch Quý Tới',
    level: 'B2',
    category: 'Văn phòng & Email',
    context: 'Bạn thuyết trình với giám đốc tài chính để xin tăng 15% ngân sách quảng cáo dựa trên hiệu quả chuyển đổi quý vừa qua.',
    turns: [
      {
        speaker: 'AI',
        en: 'We are tightening discretionary spend across departments next quarter. What justifies increasing your digital ad budget by fifteen percent?',
        ipa: '',
        vi: 'Quý tới công ty đang siết chi tiêu không thiết yếu ở các phòng ban. Cơ sở nào để tăng ngân sách quảng cáo số lên 15%?',
        suggestedReplies: [
          {
            en: 'Our customer acquisition cost dropped twenty-two percent over the last sixty days, meaning every extra dollar currently returns nearly four dollars in qualified pipeline.',
            ipa: '',
            vi: 'Chi phí tìm một khách hàng mới của đội mình đã giảm 22% trong 60 ngày qua, tức là mỗi đô chi thêm hiện mang về gần 4 đô giá trị khách tiềm năng.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Those conversion numbers are compelling. If I approve the fifteen percent bump conditionally, what checkpoint metric can we review after month one?',
        ipa: '',
        vi: 'Các chỉ số chuyển đổi đó rất thuyết phục. Nếu tôi duyệt tạm mức tăng 15% có điều kiện, sau tháng đầu tiên chúng ta sẽ đánh giá theo mốc chỉ số nào?',
        suggestedReplies: [
          {
            en: 'Hold us to keeping acquisition cost under forty-five dollars and delivering at least eighty sales-qualified demos, or we pause the extra spend immediately.',
            ipa: '',
            vi: 'Hãy chốt KPI giữ chi phí thu hút khách dưới 45 đô và mang về tối thiểu 80 buổi demo đạt chuẩn, nếu không đạt bên mình sẽ dừng ngay phần ngân sách tăng thêm.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-88',
    title: 'Hòa Giải Xung Đột Tiến Độ Giữa Hai Phòng Ban',
    level: 'B2',
    category: 'Văn phòng & Email',
    context: 'Đội Kinh doanh hứa giao hàng gấp cho khách VIP khiến đội Vận hành quá tải, bạn chủ trì cuộc họp tháo gỡ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Sales promised Friday delivery on a custom enterprise order without checking warehouse capacity first—our crew simply cannot absorb another rush job.',
        ipa: '',
        vi: 'Đội Kinh doanh hứa giao đơn hàng doanh nghiệp tùy chỉnh vào thứ Sáu mà không hỏi trước sức chứa kho—đội mình thật sự không gánh nổi đơn gấp nữa.',
        suggestedReplies: [
          {
            en: 'That frustration is completely fair, and going forward no rush commitment goes out without ops sign-off. Right now, how can we split this order to save the VIP deal?',
            ipa: '',
            vi: 'Sự bức xúc của đội bạn hoàn toàn hợp lý, và từ nay sẽ không có cam kết gấp nào được chốt nếu thiếu xác nhận từ vận hành. Trước mắt mình chia nhỏ đơn này thế nào để giữ hợp đồng VIP?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'We can ship sixty percent of the standard units by Friday afternoon if Sales confirms the client can accept the custom items next Wednesday.',
        ipa: '',
        vi: 'Kho có thể xuất 60% số hàng tiêu chuẩn vào chiều thứ Sáu nếu Kinh doanh thuyết phục được khách nhận nốt phần tùy chỉnh vào thứ Tư tuần sau.',
        suggestedReplies: [
          {
            en: 'A phased delivery sounds like the smartest way forward. I will draft the client email with Sales now and send Operations a confirmation within the hour.',
            ipa: '',
            vi: 'Giao hàng chia hai đợt là giải pháp khôn ngoan nhất lúc này. Mình sẽ soạn email gửi khách cùng đội Kinh doanh ngay và xác nhận lại cho Vận hành trong vòng một tiếng.',
          },
        ],
      },
    ],
  },

  // ============================================================================
  // 5. IT / Kỹ thuật (rp-89 .. rp-108)
  // ============================================================================
  {
    id: 'rp-89',
    title: 'Hỏi Tên Mạng & Mật Khẩu Wi-Fi Văn Phòng',
    level: 'A1',
    category: 'IT / Kỹ thuật',
    context: 'Bạn mới tới làm việc ở tầng mới và cần hỏi nhân viên IT thông tin kết nối Wi-Fi nội bộ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi there! Welcome to the third floor. Are you trying to connect your laptop to the internet?',
        ipa: '',
        vi: 'Chào bạn! Chào mừng lên tầng ba. Bạn đang tìm cách kết nối laptop vào mạng phải không?',
        suggestedReplies: [
          {
            en: 'Yes, please! What is the office Wi-Fi name and password?',
            ipa: '',
            vi: 'Vâng đúng rồi! Tên mạng Wi-Fi văn phòng và mật khẩu là gì vậy bạn?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Use the network called Office-Staff, and the password is on this card. Let me know if it connects.',
        ipa: '',
        vi: 'Bạn chọn mạng tên Office-Staff nhé, mật khẩu ghi trên tấm thẻ này. Kết nối được chưa thì báo mình biết nha.',
        suggestedReplies: [
          {
            en: 'It works now, thank you very much for your help!',
            ipa: '',
            vi: 'Mạng chạy được rồi, cảm ơn bạn đã giúp đỡ nhiều nhé!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-90',
    title: 'Báo Laptop Không Lên Nguồn',
    level: 'A1',
    category: 'IT / Kỹ thuật',
    context: 'Sáng nay bạn bấm nút nguồn nhưng máy tính làm việc không bật lên được nên mang qua quầy IT.',
    turns: [
      {
        speaker: 'AI',
        en: 'IT support desk! Good morning. What seems to be wrong with your laptop today?',
        ipa: '',
        vi: 'Quầy hỗ trợ IT xin chào! Chào buổi sáng. Hôm nay laptop của bạn gặp vấn đề gì thế?',
        suggestedReplies: [
          {
            en: 'My work laptop will not turn on this morning. Even the charging light is off.',
            ipa: '',
            vi: 'Sáng nay laptop công ty của mình không bật lên được. Đèn sạc cũng không sáng luôn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let us test it with another power cable first. Oh, look—the battery light just turned green!',
        ipa: '',
        vi: 'Để mình thử cắm bằng một dây nguồn khác trước nhé. Ồ, nhìn kìa—đèn pin vừa sáng xanh lại rồi!',
        suggestedReplies: [
          {
            en: 'Oh great! So my old charger is broken. Can I get a new charger today?',
            ipa: '',
            vi: 'Ôi may quá! Vậy là cục sạc cũ của mình bị hỏng rồi. Hôm nay mình đổi cục sạc mới được không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-91',
    title: 'Xin Quyền Truy Cập Thư Mục Chung',
    level: 'A1',
    category: 'IT / Kỹ thuật',
    context: 'Bạn cần xem tài liệu dự án trên ổ đĩa chung nhưng hệ thống báo chưa có quyền truy cập.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey! I saw your message on chat. Which shared folder are you trying to open?',
        ipa: '',
        vi: 'Này! Mình thấy tin nhắn của bạn trên nhóm chat. Bạn đang cần mở thư mục dùng chung nào vậy?',
        suggestedReplies: [
          {
            en: 'I need access to the Marketing-2026 folder on the company drive.',
            ipa: '',
            vi: 'Mình cần quyền truy cập thư mục Marketing-2026 trên ổ đĩa công ty.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'No problem! Do you need read-only access or edit permission for that folder?',
        ipa: '',
        vi: 'Không thành vấn đề! Bạn cần quyền chỉ xem hay quyền chỉnh sửa trong thư mục đó?',
        suggestedReplies: [
          {
            en: 'Edit permission, please, so I can upload my slides this afternoon.',
            ipa: '',
            vi: 'Cho mình quyền chỉnh sửa nhé, để chiều nay mình tải bản trình chiếu lên luôn.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-92',
    title: 'Hỏi Cáp Kết Nối Màn Hình Phụ',
    level: 'A1',
    category: 'IT / Kỹ thuật',
    context: 'Bạn ngồi vào bàn làm việc có sẵn màn hình rời nhưng không biết dùng dây cáp nào để cắm vào laptop.',
    turns: [
      {
        speaker: 'AI',
        en: 'Setting up your second screen? Which port does your laptop have on the side?',
        ipa: '',
        vi: 'Đang gắn màn hình phụ à? Cạnh bên laptop của bạn có những cổng cắm nào?',
        suggestedReplies: [
          {
            en: 'My laptop only has USB-C ports, and there is no big HDMI slot.',
            ipa: '',
            vi: 'Laptop của mình chỉ có cổng USB-C thôi, không có khe cắm HDMI cỡ lớn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Then you need a small USB-C to HDMI adapter. Here, try plugging this white adapter into the left port.',
        ipa: '',
        vi: 'Vậy bạn cần một đầu chuyển USB-C sang HDMI nhỏ. Đây, bạn cắm thử đầu chuyển màu trắng này vào cổng bên trái xem.',
        suggestedReplies: [
          {
            en: 'The screen works right away! Thank you, where can I borrow an adapter for myself?',
            ipa: '',
            vi: 'Màn hình lên hình ngay rồi! Cảm ơn bạn, mình có thể mượn riêng một đầu chuyển ở đâu vậy?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-93',
    title: 'Đổi Chuột Không Dây Bị Hỏng',
    level: 'A1',
    category: 'IT / Kỹ thuật',
    context: 'Con chuột máy tính của bạn bị kẹt nút bấm trái sau khi thay pin mới nên bạn tới phòng IT xin đổi cái khác.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi! Is your keyboard or mouse giving you trouble?',
        ipa: '',
        vi: 'Chào bạn! Bàn phím hay chuột của bạn đang gặp trục trặc à?',
        suggestedReplies: [
          {
            en: 'My wireless mouse stopped clicking properly, even after I put in a new battery.',
            ipa: '',
            vi: 'Chuột không dây của mình không bấm được bình thường nữa, dù mình đã thay pin mới rồi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let us swap it for a fresh one from the supply cabinet. Do you prefer a wireless mouse or a wired one?',
        ipa: '',
        vi: 'Để mình đổi cho bạn con mới từ tủ thiết bị nhé. Bạn thích dùng chuột không dây hay chuột có dây?',
        suggestedReplies: [
          {
            en: 'A wireless mouse, please. Here is the broken one back for you.',
            ipa: '',
            vi: 'Cho mình chuột không dây nhé. Mình gửi lại bạn con chuột hỏng đây ạ.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-94',
    title: 'Nhờ Đặt Lại Mật Khẩu Tài Khoản Công Ty',
    level: 'A2',
    category: 'IT / Kỹ thuật',
    context: 'Bạn nhập sai mật khẩu quá nhiều lần khiến tài khoản email công ty bị khóa tạm thời và cần IT mở khóa.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hello, IT helpdesk! Can you give me your employee email so I can check your account?',
        ipa: '',
        vi: 'Xin chào, bộ phận hỗ trợ IT nghe máy! Bạn đọc giúp mình email công ty để kiểm tra tài khoản nhé?',
        suggestedReplies: [
          {
            en: 'It is tuan.le@techviet.com. I typed my password wrong five times and got locked out.',
            ipa: '',
            vi: 'Là tuan.le@techviet.com ạ. Mình nhập sai mật khẩu 5 lần nên tài khoản bị khóa mất rồi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'I see the lock on your account. After I verify your employee ID, I will send a temporary reset link to your phone.',
        ipa: '',
        vi: 'Mình thấy tài khoản đang bị khóa rồi. Sau khi xác minh mã nhân viên, mình sẽ gửi liên kết đặt lại mật khẩu tạm về điện thoại bạn.',
        suggestedReplies: [
          {
            en: 'My employee ID is 1048. Once I log in, should I change the temporary password right away?',
            ipa: '',
            vi: 'Mã nhân viên của mình là 1048. Sau khi đăng nhập xong mình có cần đổi ngay mật khẩu tạm không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-95',
    title: 'Báo Lỗi Mất Kết Nối VPN Khi Làm Từ Xa',
    level: 'A2',
    category: 'IT / Kỹ thuật',
    context: 'Bạn làm việc tại nhà nhưng ứng dụng VPN cứ tự ngắt kết nối mỗi vài phút khiến không vào được máy chủ nội bộ.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey! You mentioned on Slack that you cannot reach the internal database from home. What error do you see?',
        ipa: '',
        vi: 'Này! Bạn vừa nhắn trên Slack là ở nhà không vào được cơ sở dữ liệu nội bộ. Nó hiện thông báo lỗi gì thế?',
        suggestedReplies: [
          {
            en: 'My VPN client connects for two minutes and then disconnects with a timeout message.',
            ipa: '',
            vi: 'Ứng dụng VPN của mình kết nối được khoảng 2 phút rồi tự ngắt kèm thông báo hết thời gian chờ.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That happens with the older VPN profile. Try switching from Gateway One to the Backup Singapore server in the dropdown menu.',
        ipa: '',
        vi: 'Lỗi đó hay gặp ở cấu hình VPN cũ đấy. Bạn thử chuyển từ Gateway One sang máy chủ dự phòng Singapore trong danh sách thả xuống xem.',
        suggestedReplies: [
          {
            en: 'Let me switch servers and reconnect now. Yes, the connection stays stable on Backup Singapore!',
            ipa: '',
            vi: 'Để mình đổi máy chủ và kết nối lại ngay. Rồi, kết nối trên máy chủ dự phòng Singapore ổn định rồi nè!',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-96',
    title: 'Yêu Cầu Cài Đặt Phần Mềm Thiết Kế Mới',
    level: 'A2',
    category: 'IT / Kỹ thuật',
    context: 'Máy tính công ty không cho phép tự cài ứng dụng ngoài nên bạn gửi yêu cầu nhờ IT cấp phép và cài phần mềm.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi! I saw your software installation request. Why is Figma Desktop blocked on your laptop?',
        ipa: '',
        vi: 'Chào bạn! Mình thấy phiếu yêu cầu cài phần mềm của bạn. Sao máy bạn lại không cài được Figma Desktop vậy?',
        suggestedReplies: [
          {
            en: 'The installer asks for an administrator password, and my user account does not have admin rights.',
            ipa: '',
            vi: 'Trình cài đặt hỏi mật khẩu quản trị viên, mà tài khoản người dùng của mình không có quyền admin.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Got it, our security policy blocks manual installs. I already have manager approval for your ticket, so can I remote into your screen for five minutes?',
        ipa: '',
        vi: 'Mình hiểu rồi, chính sách bảo mật chặn tự cài đặt đấy. Phiếu của bạn đã được quản lý duyệt rồi, mình điều khiển từ xa màn hình bạn 5 phút nhé?',
        suggestedReplies: [
          {
            en: 'Sure, I closed my personal tabs and am ready whenever you send the remote session code.',
            ipa: '',
            vi: 'Được ạ, mình đóng các tab cá nhân rồi và sẵn sàng ngay khi bạn gửi mã kết nối từ xa.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-97',
    title: 'Báo Phần Mềm Bị Đứng & Mạng Chậm',
    level: 'A2',
    category: 'IT / Kỹ thuật',
    context: 'Trình duyệt và phần mềm gọi video của bạn liên tục bị treo khi chia sẻ màn hình, bạn nhờ kỹ thuật viên kiểm tra.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi there! You said your computer keeps freezing during video calls. When did this start happening?',
        ipa: '',
        vi: 'Chào bạn! Bạn bảo máy tính hay bị treo lúc gọi video đúng không? Tình trạng này bắt đầu từ khi nào thế?',
        suggestedReplies: [
          {
            en: 'It started after the system update on Monday. Every time I share my screen, the whole window freezes.',
            ipa: '',
            vi: 'Nó bị từ sau đợt cập nhật hệ thống hôm thứ Hai. Cứ mỗi lần mình chia sẻ màn hình là cả cửa sổ bị đứng luôn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let us check your memory usage—wow, your browser is using ninety percent of RAM, and graphics acceleration might be causing the crash.',
        ipa: '',
        vi: 'Để mình xem mức dùng bộ nhớ—chà, trình duyệt đang ngốn 90% RAM, và tính năng tăng tốc phần cứng đồ họa có thể đang gây đứng máy.',
        suggestedReplies: [
          {
            en: 'Should I turn off hardware acceleration in settings and close unused background apps?',
            ipa: '',
            vi: 'Vậy mình nên tắt tăng tốc phần cứng trong cài đặt và đóng bớt các ứng dụng chạy nền không dùng đúng không?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-98',
    title: 'Hỏi Tiến Độ Vé Hỗ Trợ Đã Gửi Hôm Qua',
    level: 'A2',
    category: 'IT / Kỹ thuật',
    context: 'Bạn đã tạo phiếu yêu cầu nâng cấp dung lượng hộp thư từ chiều qua nhưng chưa thấy phản hồi nên gọi hỏi thăm.',
    turns: [
      {
        speaker: 'AI',
        en: 'IT service desk, Sam speaking. Do you have a ticket number I can look up for you?',
        ipa: '',
        vi: 'Bàn dịch vụ IT, Sam xin nghe. Bạn có mã phiếu hỗ trợ để mình tra cứu giúp không?',
        suggestedReplies: [
          {
            en: 'Yes, it is ticket number 3409, which I submitted yesterday afternoon for a mailbox storage upgrade.',
            ipa: '',
            vi: 'Có ạ, mã phiếu là 3409, mình gửi từ chiều hôm qua để xin nâng cấp dung lượng hộp thư.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Let me check ticket 3409—it was waiting in the tier-two queue, and your inbox is already at ninety-eight percent capacity. I will prioritize it right now.',
        ipa: '',
        vi: 'Để mình xem phiếu 3409—nó đang nằm trong hàng đợi cấp hai, mà hộp thư của bạn đã đầy 98% rồi. Mình đẩy ưu tiên xử lý ngay nhé.',
        suggestedReplies: [
          {
            en: 'Thank you so much! I was worried incoming client emails might bounce back today.',
            ipa: '',
            vi: 'Cảm ơn bạn nhiều lắm! Mình cứ lo hôm nay email khách hàng gửi tới bị trả ngược lại.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-99',
    title: 'Mô Tả Các Bước Tái Hiện Lỗi Giao Diện',
    level: 'B1',
    category: 'IT / Kỹ thuật',
    context: 'Là QA kiểm thử, bạn báo cáo chi tiết các bước tái hiện lỗi trang thanh toán trên điện thoại cho lập trình viên frontend.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey! I looked at the checkout bug you logged, though the Pay button works fine on my desktop browser. How do I reproduce it?',
        ipa: '',
        vi: 'Này! Mình xem lỗi thanh toán bạn tạo rồi, nhưng nút Thanh toán vẫn chạy bình thường trên trình duyệt máy tính của mình. Tái hiện lỗi đó thế nào vậy?',
        suggestedReplies: [
          {
            en: 'It only happens on mobile Safari when you apply a discount code and then switch the shipping method right before tapping Pay.',
            ipa: '',
            vi: 'Lỗi chỉ xảy ra trên Safari di động khi bạn nhập mã giảm giá rồi đổi phương thức giao hàng ngay trước lúc bấm Thanh toán.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Ah, switching shipping triggers a second total calculation! Let me test that flow in the mobile emulator—did you see any console errors?',
        ipa: '',
        vi: 'À, đổi giao hàng kích hoạt tính lại tổng tiền lần hai! Để mình thử luồng đó trên trình giả lập di động—bạn có thấy lỗi nào trong console không?',
        suggestedReplies: [
          {
            en: 'Yes, the Pay button stays disabled because the state gets stuck loading, and I attached a short screen recording to the Jira ticket.',
            ipa: '',
            vi: 'Có đấy, nút Thanh toán bị vô hiệu hóa luôn vì trạng thái kẹt ở đang tải, và mình đã đính kèm video quay màn hình ngắn vào phiếu Jira rồi.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-100',
    title: 'Xin Duyệt Pull Request & Giải Thích Sửa Code',
    level: 'B1',
    category: 'IT / Kỹ thuật',
    context: 'Bạn vừa cập nhật code theo góp ý review và nhờ kỹ sư cấp cao xem lại lần cuối để gộp vào nhánh chính.',
    turns: [
      {
        speaker: 'AI',
        en: 'I saw your notification on GitHub. Did you push the fixes for the token refresh comment I left earlier?',
        ipa: '',
        vi: 'Mình thấy thông báo trên GitHub rồi. Bạn đã đẩy phần sửa cho nhận xét làm mới token lúc nãy mình để lại chưa?',
        suggestedReplies: [
          {
            en: 'Yes, I extracted the retry helper into its own function and added two unit tests covering expired sessions.',
            ipa: '',
            vi: 'Rồi ạ, mình đã tách hàm hỗ trợ thử lại ra riêng và viết thêm hai unit test cho trường hợp phiên đăng nhập hết hạn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Nice, the diff looks much cleaner now! One small question—why did you increase the cache timeout from five minutes to ten?',
        ipa: '',
        vi: 'Tuyệt, phần thay đổi code giờ gọn hơn hẳn! Hỏi nhỏ một câu—tại sao bạn tăng thời gian hết hạn bộ nhớ đệm từ 5 phút lên 10 phút vậy?',
        suggestedReplies: [
          {
            en: 'Because user permissions rarely change mid-session, and ten minutes cuts redundant auth lookups in half. Would you like me to document that in a comment?',
            ipa: '',
            vi: 'Vì quyền người dùng hiếm khi đổi giữa phiên, và 10 phút giúp giảm một nửa số lần gọi kiểm tra quyền thừa. Mình ghi chú lý do đó vào comment trong code luôn nhé?',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-101',
    title: 'Thông Báo Lịch Bảo Trì Hệ Thống Cuối Tuần',
    level: 'B1',
    category: 'IT / Kỹ thuật',
    context: 'Bạn phụ trách hạ tầng và trao đổi với trưởng nhóm sản phẩm về khung giờ bảo trì nâng cấp máy chủ cuối tuần.',
    turns: [
      {
        speaker: 'AI',
        en: 'Before we email customers about Sunday\'s system maintenance, how long will the portal actually be offline?',
        ipa: '',
        vi: 'Trước khi gửi email thông báo cho khách hàng về đợt bảo trì hệ thống Chủ Nhật, cổng dịch vụ thực tế sẽ ngoại tuyến trong bao lâu?',
        suggestedReplies: [
          {
            en: 'We reserved a two-hour window starting at two AM Sunday, though the actual downtime should only be around twenty minutes.',
            ipa: '',
            vi: 'Bên mình dự phòng khung 2 tiếng bắt đầu từ 2 giờ sáng Chủ Nhật, nhưng thời gian ngắt kết nối thực tế chỉ khoảng 20 phút thôi.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Twenty minutes at two AM is very low impact. What happens if a customer tries to submit an order during that window?',
        ipa: '',
        vi: '20 phút lúc 2 giờ sáng thì mức ảnh hưởng rất thấp. Nếu có khách thử gửi đơn hàng đúng lúc đó thì hệ thống xử lý thế nào?',
        suggestedReplies: [
          {
            en: 'They will see a clear maintenance banner asking them to retry shortly, and no partial payments will be processed.',
            ipa: '',
            vi: 'Họ sẽ thấy biểu ngữ thông báo bảo trì rõ ràng mời thử lại sau ít phút, và không có giao dịch thanh toán dở dang nào bị trừ tiền cả.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-102',
    title: 'Kiểm Tra Lỗi API Trả Về Mã 500 Trên Staging',
    level: 'B1',
    category: 'IT / Kỹ thuật',
    context: 'Tính năng tìm kiếm trên môi trường thử nghiệm đột nhiên trả về lỗi máy chủ 500 sau đợt triển khai mới nhất.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hey, the staging search endpoint started throwing a 500 server error right after the noon deployment. Are you seeing anything in the logs?',
        ipa: '',
        vi: 'Này, endpoint tìm kiếm trên staging bắt đầu trả về lỗi máy chủ 500 ngay sau đợt triển khai buổi trưa. Bạn thấy gì trong log không?',
        suggestedReplies: [
          {
            en: 'Yeah, I just checked the server logs—it looks like a missing environment variable for the new search service.',
            ipa: '',
            vi: 'Ừ, mình vừa xem log máy chủ—hình như bị thiếu một biến môi trường cho dịch vụ tìm kiếm mới.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Good catch! That explains why local tests passed on my machine. Once you add the config key, should we re-run the integration suite?',
        ipa: '',
        vi: 'Bắt đúng bệnh rồi! Thảo nào chạy test cục bộ trên máy mình vẫn qua. Sau khi bạn thêm khóa cấu hình, mình chạy lại bộ kiểm thử tích hợp nhé?',
        suggestedReplies: [
          {
            en: 'Definitely, I am updating the staging secrets now and will ping you as soon as the pipeline turns green.',
            ipa: '',
            vi: 'Chắc chắn rồi, mình đang cập nhật khóa bí mật trên staging và sẽ nhắn ngay khi luồng kiểm thử chuyển xanh.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-103',
    title: 'Hướng Dẫn Khách Hàng Bật Xác Thực Hai Yếu Tố',
    level: 'B1',
    category: 'IT / Kỹ thuật',
    context: 'Một khách hàng không rành công nghệ gọi điện nhờ bạn hướng dẫn từng bước kích hoạt bảo mật hai lớp cho tài khoản.',
    turns: [
      {
        speaker: 'AI',
        en: 'Hi, I got a notice saying I have to turn on two-factor authentication by Friday, and honestly I am afraid I might lock myself out.',
        ipa: '',
        vi: 'Chào bạn, tôi nhận được thông báo phải bật xác thực hai yếu tố trước thứ Sáu, thú thật tôi hơi sợ bấm nhầm rồi khóa luôn tài khoản.',
        suggestedReplies: [
          {
            en: 'Do not worry at all, I can walk you through it step by step. First, do you have an authenticator app installed on your phone?',
            ipa: '',
            vi: 'Cô đừng lo chút nào, cháu sẽ hướng dẫn từng bước một ạ. Đầu tiên, trên điện thoại cô đã cài ứng dụng xác thực nào chưa ạ?',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Yes, my son installed Google Authenticator for me yesterday. I opened my security settings on the computer—what do I tap next?',
        ipa: '',
        vi: 'Có rồi, hôm qua con trai tôi cài sẵn Google Authenticator giúp rồi. Tôi đang mở mục cài đặt bảo mật trên máy tính—giờ bấm gì tiếp theo?',
        suggestedReplies: [
          {
            en: 'Scan the QR code on your screen using the app, type in the six-digit code, and make sure to save your backup recovery codes somewhere safe.',
            ipa: '',
            vi: 'Cô quét mã QR trên màn hình bằng ứng dụng, nhập dãy 6 chữ số hiện ra, rồi nhớ lưu lại bộ mã khôi phục dự phòng ở nơi an toàn nhé.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-104',
    title: 'Điều Phối Khắc Phục Sự Cố Production Khẩn Cấp',
    level: 'B2',
    category: 'IT / Kỹ thuật',
    context: 'Hệ thống thanh toán trên môi trường thật bất ngờ báo lỗi hàng loạt sau bản phát hành mới, bạn điều phối cuộc gọi khẩn.',
    turns: [
      {
        speaker: 'AI',
        en: 'Error rates on the payment gateway just spiked to thirty percent after release 4.12 went live. Should we try patching forward or roll back immediately?',
        ipa: '',
        vi: 'Tỷ lệ lỗi trên cổng thanh toán vừa vọt lên 30% sau khi bản 4.12 lên production. Mình nên vá lỗi trực tiếp hay khôi phục bản cũ ngay lập tức?',
        suggestedReplies: [
          {
            en: 'Customer checkout is actively failing, so roll back to release 4.11 right now to stop the bleeding—we can diagnose the regression safely in staging.',
            ipa: '',
            vi: 'Khách hàng đang thanh toán lỗi hàng loạt nên hãy rollback về bản 4.11 ngay lập tức để chặn thiệt hại—mình sẽ tìm nguyên nhân an toàn trên staging sau.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Rollback triggered—traffic is shifting back to 4.11 and error rates are dropping. Who is updating the public status page and support leads?',
        ipa: '',
        vi: 'Đã kích hoạt rollback—lưu lượng đang chuyển về 4.11 và tỷ lệ lỗi bắt đầu giảm rồi. Ai sẽ cập nhật trang trạng thái công khai và báo cho bộ phận hỗ trợ?',
        suggestedReplies: [
          {
            en: 'I will post the incident update on the status page right now and brief Customer Support with an estimated recovery window of ten minutes.',
            ipa: '',
            vi: 'Mình sẽ đăng cập nhật sự cố lên trang trạng thái ngay bây giờ và báo đội Hỗ trợ Khách hàng mốc phục hồi dự kiến trong 10 phút nữa.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-105',
    title: 'Đánh Giá Rủi Ro Khi Nâng Cấp Cơ Sở Dữ Liệu',
    level: 'B2',
    category: 'IT / Kỹ thuật',
    context: 'Đội kỹ thuật chuẩn bị thay đổi cấu trúc bảng dữ liệu lớn và thảo luận chiến lược triển khai không gián đoạn dịch vụ.',
    turns: [
      {
        speaker: 'AI',
        en: 'That orders table has forty million rows. If we run an alter-table migration during daytime traffic, will it lock writes across the app?',
        ipa: '',
        vi: 'Bảng đơn hàng đó có tới 40 triệu dòng. Nếu chạy lệnh sửa cấu trúc bảng vào giờ cao điểm ban ngày, nó có khóa toàn bộ thao tác ghi dữ liệu của ứng dụng không?',
        suggestedReplies: [
          {
            en: 'Running a blocking alter directly definitely risks table locks. Instead, let us use an expand-and-contract pattern with a nullable column first.',
            ipa: '',
            vi: 'Chạy lệnh sửa trực tiếp chắc chắn có rủi ro khóa bảng. Thay vào đó, mình áp dụng mô hình mở rộng dần bằng cách thêm cột cho phép rỗng trước nhé.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Smart approach. Once we backfill historical rows in small batches and dual-write new orders, how do we verify data consistency before switching reads?',
        ipa: '',
        vi: 'Hướng đó rất khéo. Sau khi điền bù dữ liệu cũ theo từng lô nhỏ và ghi song song đơn mới, mình kiểm chứng độ khớp dữ liệu thế nào trước khi chuyển luồng đọc?',
        suggestedReplies: [
          {
            en: 'We can run a shadow comparison script sampling live queries for forty-eight hours and keep a tested rollback switch ready if any mismatch appears.',
            ipa: '',
            vi: 'Mình có thể chạy script đối chiếu ngầm trên các truy vấn thực tế trong 48 giờ và giữ sẵn công tắc quay lui đã kiểm thử phòng khi phát hiện sai lệch.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-106',
    title: 'Thảo Luận Giải Pháp Tối Ưu Tốc Độ Tải Trang',
    level: 'B2',
    category: 'IT / Kỹ thuật',
    context: 'Trang báo cáo khách hàng đang mất gần 5 giây để tải, bạn bàn với đồng nghiệp cách cân bằng giữa caching và tối ưu truy vấn.',
    turns: [
      {
        speaker: 'AI',
        en: 'Enterprise users are complaining that the analytics dashboard takes nearly five seconds to load. Should we drop Redis caching in front of it right away?',
        ipa: '',
        vi: 'Khách hàng doanh nghiệp đang phàn nàn bảng điều khiển phân tích mất gần 5 giây mới tải xong. Mình có nên gắn ngay bộ nhớ đệm Redis phía trước không?',
        suggestedReplies: [
          {
            en: 'Caching helps repeat views, yet our slow query trace shows a missing composite index causing full table scans—fixing that first addresses the root bottleneck.',
            ipa: '',
            vi: 'Caching chỉ giúp các lần mở lại, nhưng dấu vết truy vấn chậm cho thấy đang thiếu chỉ mục kết hợp khiến hệ thống quét toàn bảng—sửa chỗ đó trước mới giải quyết tận gốc nút thắt.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Fair point—caching stale queries just masks bad SQL. If adding that index gets response time under four hundred milliseconds, do we still need client-side pagination?',
        ipa: '',
        vi: 'Chuẩn đấy—cache truy vấn chậm chỉ che giấu câu SQL kém thôi. Nếu thêm index đưa thời gian phản hồi xuống dưới 400 mili-giây thì có cần phân trang phía giao diện nữa không?',
        suggestedReplies: [
          {
            en: 'We should still switch to server-side cursor pagination for accounts with thousands of records so payload sizes stay small over mobile networks.',
            ipa: '',
            vi: 'Mình vẫn nên chuyển sang phân trang theo con trỏ phía máy chủ cho các tài khoản có hàng nghìn bản ghi để dung lượng gói tin luôn nhẹ trên mạng di động.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-107',
    title: 'Tổng Kết Nguyên Nhân Gốc Rễ Sau Sự Cố',
    level: 'B2',
    category: 'IT / Kỹ thuật',
    context: 'Sau sự cố gián đoạn dịch vụ sáng hôm qua, bạn trình bày biên bản rút kinh nghiệm không đổ lỗi cá nhân cùng biện pháp phòng ngừa.',
    turns: [
      {
        speaker: 'AI',
        en: 'Thanks for pulling together the post-mortem doc. Let us keep this blameless—what systemic gaps allowed that expired SSL certificate to break login?',
        ipa: '',
        vi: 'Cảm ơn bạn đã tổng hợp tài liệu rút kinh nghiệm sau sự cố. Giữ tinh thần không đổ lỗi cá nhân nhé—lỗ hổng hệ thống nào khiến chứng chỉ SSL hết hạn làm hỏng đăng nhập vậy?',
        suggestedReplies: [
          {
            en: 'First, certificate auto-renewal failed silently because our alert webhook pointed to an archived Slack channel, and second, staging used a separate cert.',
            ipa: '',
            vi: 'Thứ nhất, hệ thống tự gia hạn chứng chỉ lỗi âm thầm vì cảnh báo gửi vào kênh Slack đã lưu trữ, và thứ hai là staging dùng chứng chỉ tách biệt.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'That explains why nobody caught the thirty-day warning. What concrete safeguards are we putting in place this sprint so it cannot repeat?',
        ipa: '',
        vi: 'Thảo nào không ai nhận được cảnh báo trước 30 ngày. Sprint này mình triển khai rào chắn cụ thể nào để sự cố không thể lặp lại?',
        suggestedReplies: [
          {
            en: 'We are wiring expiry checks directly into PagerDuty with a fourteen-day threshold and scheduling an automated renewal dry run every quarter.',
            ipa: '',
            vi: 'Đội mình đang nối kiểm tra hạn chứng chỉ thẳng vào PagerDuty với ngưỡng cảnh báo 14 ngày và chạy diễn tập gia hạn tự động mỗi quý.',
          },
        ],
      },
    ],
  },
  {
    id: 'rp-108',
    title: 'Giải Thích Giới Hạn Tốc Độ API Với Đối Tác',
    level: 'B2',
    category: 'IT / Kỹ thuật',
    context: 'Một đối tác tích hợp phàn nàn nhận lỗi 429 quá nhiều yêu cầu, bạn giải thích cơ chế giới hạn tốc độ và cách đồng bộ tối ưu.',
    turns: [
      {
        speaker: 'AI',
        en: 'Our engineering team keeps hitting 429 rate-limit errors during morning inventory syncs. Can you simply turn off rate limiting for our API key?',
        ipa: '',
        vi: 'Đội kỹ thuật bên tôi liên tục dính lỗi giới hạn tốc độ 429 khi đồng bộ tồn kho buổi sáng. Bên bạn tắt luôn giới hạn cho khóa API của chúng tôi được không?',
        suggestedReplies: [
          {
            en: 'Removing limits completely puts shared cluster stability at risk, though we can double your burst quota while helping your integration batch requests more efficiently.',
            ipa: '',
            vi: 'Bỏ hẳn giới hạn sẽ đe dọa độ ổn định của cụm máy chủ dùng chung, nhưng bên mình có thể tăng gấp đôi hạn mức đột biến đồng thời hỗ trợ bên bạn gom yêu cầu theo lô hiệu quả hơn.',
          },
        ],
      },
      {
        speaker: 'AI',
        en: 'Doubling the burst quota helps—how should our sync job react if it still touches the ceiling during peak hours?',
        ipa: '',
        vi: 'Tăng gấp đôi hạn mức đột biến sẽ đỡ nhiều đấy—nếu giờ cao điểm tác vụ đồng bộ vẫn chạm trần thì bên tôi nên xử lý thế nào?',
        suggestedReplies: [
          {
            en: 'Respect the Retry-After response header using exponential backoff, and subscribe to our inventory webhooks so you only fetch items that actually changed.',
            ipa: '',
            vi: 'Bên bạn hãy đọc tiêu đề phản hồi Retry-After kết hợp cơ chế chờ tăng dần theo lũy thừa, và đăng ký webhook tồn kho của chúng tôi để chỉ tải những mặt hàng thực sự thay đổi.',
          },
        ],
      },
    ],
  },
];

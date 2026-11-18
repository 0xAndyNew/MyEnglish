import { ListeningReadingLesson } from './listeningReadingLessons';

export const LISTENING_BANK_PART1: ListeningReadingLesson[] = [
  // =========================================================================
  // 1. ĐỜI SỐNG & GIAO TIẾP (lr-41 .. lr-60)
  // =========================================================================
  {
    id: 'lr-41',
    level: 'A1',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 41: Mượn Sạc Điện thoại Từ Bạn Cùng Phòng',
    sourceStyle: 'British Council • Real-Life Dialogue',
    transcript:
      'Excuse me, Minh, my phone battery is almost dead at three percent. Can I borrow your USB charger for thirty minutes? Sure, it is on the small desk next to my bed. Thank you so much, I will give it back before dinner.',
    translation:
      'Xin lỗi Minh, pin điện thoại của mình sắp hết rồi, chỉ còn ba phần trăm thôi. Mình có thể mượn cục sạc USB của bạn khoảng ba mươi phút không? Chắc chắn rồi, nó nằm trên cái bàn nhỏ cạnh giường mình đấy. Cảm ơn bạn nhiều nhé, mình sẽ trả lại trước bữa tối.',
    keyPhrases: [
      { en: 'phone battery', vi: 'pin điện thoại' },
      { en: 'borrow your USB charger', vi: 'mượn cục sạc USB của bạn' },
      { en: 'give it back', vi: 'trả lại nó' },
    ],
    question: {
      q: 'Where is Minh’s charger?',
      options: ['In his backpack', 'On the small desk next to his bed', 'On the dining table'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-42',
    level: 'A1',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 42: Dắt Chó Đi Dạo Buổi Tối Ở Công Viên',
    sourceStyle: 'BBC • Everyday English',
    transcript:
      'Hi, your golden dog is so friendly and cute! What is his name? His name is Milo, and he is two years old. We walk in this park every evening after work because he loves running on the green grass.',
    translation:
      'Chào bạn, chú chó lông vàng của bạn thân thiện và dễ thương quá! Tên của nó là gì vậy? Tên nó là Milo, và nó được hai tuổi rồi. Chúng tôi đi dạo ở công viên này mỗi tối sau giờ làm vì nó thích chạy trên bãi cỏ xanh.',
    keyPhrases: [
      { en: 'friendly and cute', vi: 'thân thiện và dễ thương' },
      { en: 'every evening after work', vi: 'mỗi tối sau giờ làm' },
      { en: 'running on the green grass', vi: 'chạy trên bãi cỏ xanh' },
    ],
    question: {
      q: 'When do the speaker and Milo walk in the park?',
      options: ['Every evening after work', 'Only on Sunday mornings', 'Before breakfast every day'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-43',
    level: 'A1',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 43: Hỏi Giờ Mở Cửa Thư Viện Địa Phương',
    sourceStyle: 'VOA • Everyday English',
    transcript:
      'Good morning, is the city library open on Sundays? Yes, we open from nine in the morning until five in the afternoon on weekends. You can read books upstairs or use the free study tables on the first floor. Please bring your ID card to register.',
    translation:
      'Chào buổi sáng, thư viện thành phố có mở cửa vào Chủ nhật không ạ? Có chứ, cuối tuần chúng tôi mở cửa từ chín giờ sáng đến năm giờ chiều. Bạn có thể đọc sách ở tầng trên hoặc dùng bàn học miễn phí tại tầng một. Vui lòng mang theo thẻ căn cước để đăng ký nhé.',
    keyPhrases: [
      { en: 'open on Sundays', vi: 'mở cửa vào Chủ nhật' },
      { en: 'free study tables', vi: 'bàn học miễn phí' },
      { en: 'bring your ID card', vi: 'mang theo thẻ căn cước' },
    ],
    question: {
      q: 'What does a visitor need to bring to register?',
      options: ['A laptop', 'Two old books', 'An ID card'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-44',
    level: 'A1',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 44: Nhờ Người Lạ Chụp Ảnh Kỷ Niệm',
    sourceStyle: 'British Council • Real-Life Dialogue',
    transcript:
      'Excuse me, could you please take a picture of us in front of this fountain? Of course, just press the white button on the screen when you are ready. Could you take one more so everyone is smiling? Here you go, the lighting looks great!',
    translation:
      'Xin lỗi, bạn có thể chụp giúp chúng tôi một tấm ảnh trước đài phun nước này được không? Tất nhiên rồi, bạn chỉ cần nhấn nút trắng trên màn hình khi sẵn sàng nhé. Bạn chụp giúp thêm một tấm nữa để ai cũng cười tươi được không? Của bạn đây, ánh sáng trông rất đẹp đấy!',
    keyPhrases: [
      { en: 'take a picture of us', vi: 'chụp giúp chúng tôi một tấm ảnh' },
      { en: 'press the white button', vi: 'nhấn nút trắng' },
      { en: 'take one more', vi: 'chụp thêm một tấm nữa' },
    ],
    question: {
      q: 'Why does the speaker ask for one more photo?',
      options: ['So everyone is smiling', 'Because the camera turned off', 'Because the fountain stopped'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-45',
    level: 'A1',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 45: Thông Báo Bảo Trì Nước Tại Chung Cư',
    sourceStyle: 'BBC • Community Notice',
    transcript:
      'Dear residents, the building team will clean the main water tank this Tuesday morning. There will be no running water from eight thirty until eleven thirty. Please store enough water in buckets or bottles the night before. Thank you for your patience and understanding.',
    translation:
      'Kính gửi cư dân, đội ngũ tòa nhà sẽ vệ sinh bể nước chính vào sáng thứ Ba tuần này. Nước sinh hoạt sẽ tạm ngưng từ tám giờ ba mươi đến mười một giờ ba mươi. Vui lòng tích trữ đủ nước vào xô hoặc chai từ tối hôm trước. Xin cảm ơn sự kiên nhẫn và thông cảm của quý vị.',
    keyPhrases: [
      { en: 'no running water', vi: 'không có nước máy sinh hoạt' },
      { en: 'store enough water', vi: 'tích trữ đủ nước' },
      { en: 'the night before', vi: 'tối hôm trước' },
    ],
    question: {
      q: 'When will the water be turned off?',
      options: ['Monday afternoon', 'Tuesday morning', 'Wednesday evening'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-46',
    level: 'A2',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 46: Hẹn Bạn Đi Xem Phim Cuối Tuần',
    sourceStyle: 'British Council • Real-Life Dialogue',
    transcript:
      'Hey Linh, are you free this Saturday night? A new comedy film just came out at the cinema near the river. I already checked the schedule, and there is a show at seven thirty. Let us meet at six forty-five so we have time to buy popcorn first.',
    translation:
      'Này Linh, tối thứ Bảy này cậu có rảnh không? Một bộ phim hài mới vừa ra rạp ở khu gần bờ sông đấy. Tớ đã xem lịch chiếu rồi, có một suất lúc bảy giờ ba mươi. Chúng ta gặp nhau lúc sáu giờ bốn lăm để có thời gian mua bỏng ngô trước nhé.',
    keyPhrases: [
      { en: 'just came out', vi: 'vừa mới ra mắt' },
      { en: 'checked the schedule', vi: 'đã xem lịch chiếu' },
      { en: 'have time to buy popcorn', vi: 'có thời gian mua bỏng ngô' },
    ],
    question: {
      q: 'Why do they plan to meet at 6:45?',
      options: ['To eat dinner at a restaurant', 'To wait for another friend', 'To buy popcorn before the movie'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-47',
    level: 'A2',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 47: Đăng Ký Thẻ Thành Viên Phòng Tập Gym',
    sourceStyle: 'VOA • Everyday English',
    transcript:
      'Welcome to Active Life Gym! I would like to ask about your monthly membership plans. Our standard plan costs thirty-five dollars a month and includes free yoga classes on Tuesdays and Thursdays. You also get a personal locker and clean towels every time you visit.',
    translation:
      'Chào mừng đến với Phòng tập Active Life! Tôi muốn hỏi về các gói thành viên theo tháng bên bạn. Gói tiêu chuẩn có giá ba mươi lăm đô la mỗi tháng và bao gồm các lớp yoga miễn phí vào thứ Ba và thứ Năm. Bạn cũng có tủ đồ cá nhân và khăn sạch mỗi lần tới tập.',
    keyPhrases: [
      { en: 'monthly membership plans', vi: 'các gói hội viên theo tháng' },
      { en: 'free yoga classes', vi: 'các lớp yoga miễn phí' },
      { en: 'personal locker', vi: 'tủ đựng đồ cá nhân' },
    ],
    question: {
      q: 'Which days are the free yoga classes held?',
      options: ['Mondays and Fridays', 'Tuesdays and Thursdays', 'Saturdays and Sundays'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-48',
    level: 'A2',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 48: Báo Mất Chìa Khóa Với Bảo Vệ Tòa Nhà',
    sourceStyle: 'BBC • Everyday English',
    transcript:
      'Excuse me, I think I dropped my apartment key somewhere near the main gate twenty minutes ago. Does it have a blue leather keychain with a tiny silver bell? Yes, that is mine! Someone just handed it in at the security desk five minutes ago, so please sign this logbook.',
    translation:
      'Xin lỗi chú, cháu nghĩ cháu làm rơi chìa khóa căn hộ đâu đó gần cổng chính khoảng hai mươi phút trước. Nó có móc khóa da màu xanh dương gắn chiếc chuông bạc nhỏ không? Đúng rồi, đó là của cháu ạ! Có người vừa nộp lại ở bàn bảo vệ năm phút trước, cháu ký vào sổ ghi chép này nhé.',
    keyPhrases: [
      { en: 'dropped my apartment key', vi: 'làm rơi chìa khóa căn hộ' },
      { en: 'handed it in', vi: 'nộp trả lại đồ nhặt được' },
      { en: 'security desk', vi: 'bàn trực bảo vệ' },
    ],
    question: {
      q: 'How did the security guard get the lost key?',
      options: ['Someone handed it in at the desk', 'The guard found it in the elevator', 'A cleaner brought it from the roof'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-49',
    level: 'A2',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 49: Kể Về Chuyến Về Thăm Quê Cuối Tuần',
    sourceStyle: 'British Council • Story Corner',
    transcript:
      'Last weekend, I took a two-hour coach ride to visit my grandparents in their peaceful village. The air felt much cooler and fresher than in the busy city. On Sunday morning, my grandmother taught me how to pick fresh vegetables from her garden and cook a traditional soup.',
    translation:
      'Cuối tuần vừa rồi, tôi bắt xe khách hai tiếng đồng hồ về thăm ông bà ở ngôi làng yên bình. Không khí ở đó mát mẻ và trong lành hơn hẳn thành phố tấp nập. Sáng Chủ nhật, bà ngoại dạy tôi cách hái rau tươi từ vườn nhà và nấu món canh truyền thống.',
    keyPhrases: [
      { en: 'peaceful village', vi: 'ngôi làng yên bình' },
      { en: 'cooler and fresher', vi: 'mát mẻ và trong lành hơn' },
      { en: 'pick fresh vegetables', vi: 'hái rau tươi' },
    ],
    question: {
      q: 'What did the speaker learn to do on Sunday morning?',
      options: ['Drive a tractor', 'Bake birthday bread', 'Pick vegetables and cook soup'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-50',
    level: 'A2',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 50: Gửi Bưu Phẩm Tại Bưu Điện',
    sourceStyle: 'VOA • Practical Listening',
    transcript:
      'Hello, I need to send this small box of winter clothes to my sister in Da Nang. Would you prefer standard shipping or express delivery? Standard takes four days and costs three dollars, while express arrives tomorrow afternoon for seven dollars. Let me choose standard shipping, please.',
    translation:
      'Xin chào, tôi cần gửi hộp quần áo mùa đông nhỏ này cho em gái ở Đà Nẵng. Anh muốn chọn gửi thường hay chuyển phát nhanh? Gửi thường mất bốn ngày với phí ba đô la, còn chuyển phát nhanh đến vào chiều mai với giá bảy đô la. Cho tôi chọn gửi thường nhé.',
    keyPhrases: [
      { en: 'standard shipping', vi: 'giao hàng tiêu chuẩn' },
      { en: 'express delivery', vi: 'chuyển phát nhanh' },
      { en: 'arrives tomorrow afternoon', vi: 'tới nơi vào chiều mai' },
    ],
    question: {
      q: 'Which shipping option does the customer choose?',
      options: ['Same-day courier', 'Express delivery', 'Standard shipping'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-51',
    level: 'B1',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 51: Nhờ Hàng Xóm Giảm Tiếng Ồn Buổi Tối',
    sourceStyle: 'British Council • Real-Life Dialogue',
    transcript:
      'Hi Sam, sorry to bother you, but I have an early presentation tomorrow and the music from your living room is quite loud. Oh, I had no idea the walls were that thin! I will turn down the volume right away and put on my headphones instead. Thanks so much, I really appreciate your kindness.',
    translation:
      'Chào Sam, xin lỗi vì làm phiền bạn, nhưng sáng mai tôi có buổi thuyết trình sớm mà tiếng nhạc từ phòng khách nhà bạn hơi lớn. Ôi, tôi không biết tường lại cách âm mỏng vậy đâu! Tôi sẽ vặn nhỏ âm lượng ngay và đeo tai nghe thay thế. Cảm ơn bạn rất nhiều, tôi thực sự trân trọng sự tử tế của bạn.',
    keyPhrases: [
      { en: 'sorry to bother you', vi: 'xin lỗi vì làm phiền bạn' },
      { en: 'turn down the volume', vi: 'vặn nhỏ âm lượng' },
      { en: 'put on my headphones', vi: 'đeo tai nghe vào' },
    ],
    question: {
      q: 'How does Sam solve the noise problem?',
      options: ['He turns down the music and uses headphones', 'He moves his speakers to the balcony', 'He stops listening completely until next week'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-52',
    level: 'B1',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 52: Tham Gia Câu Lạc Bộ Chạy Bộ Cộng Đồng',
    sourceStyle: 'BBC • Everyday English',
    transcript:
      'Our neighborhood running club welcomes beginners who want to stay healthy without feeling pressured. We gather by the lake entrance every Wednesday at six PM and jog at a comfortable pace for five kilometers. Afterward, many members stay for fruit juice and friendly conversation.',
    translation:
      'Câu lạc bộ chạy bộ khu phố chúng tôi chào đón những người mới bắt đầu muốn giữ gìn sức khỏe mà không bị áp lực. Chúng tôi tập trung ở cổng hồ vào sáu giờ tối thứ Tư hàng tuần và chạy chậm với nhịp độ thoải mái khoảng năm kilômét. Sau đó, nhiều thành viên ở lại uống nước ép trái cây và trò chuyện thân mật.',
    keyPhrases: [
      { en: 'welcomes beginners', vi: 'chào đón người mới bắt đầu' },
      { en: 'comfortable pace', vi: 'nhịp độ thoải mái' },
      { en: 'friendly conversation', vi: 'trò chuyện thân mật' },
    ],
    question: {
      q: 'How far does the club usually jog on Wednesdays?',
      options: ['Two kilometers', 'Five kilometers', 'Ten kilometers'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-53',
    level: 'B1',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 53: Chia Tiền Nhà & Hóa Đơn Với Bạn Cùng Phòng',
    sourceStyle: 'VOA • Life Skills',
    transcript:
      'Since three of us share this apartment, using a simple expense app makes monthly bills much fairer. Whenever someone buys dish soap or pays the internet bill, they upload the receipt within two days. At the end of each month, the app calculates the exact balance so nobody feels confused.',
    translation:
      'Vì ba đứa mình ở chung căn hộ này, việc dùng một ứng dụng chi tiêu đơn giản giúp tiền hóa đơn hàng tháng công bằng hơn nhiều. Bất cứ khi nào ai mua nước rửa chén hoặc trả tiền mạng, người đó tải hóa đơn lên trong vòng hai ngày. Cuối mỗi tháng, ứng dụng tính toán số dư chính xác để không ai bị rối.',
    keyPhrases: [
      { en: 'monthly bills', vi: 'hóa đơn hàng tháng' },
      { en: 'upload the receipt', vi: 'tải ảnh hóa đơn lên' },
      { en: 'exact balance', vi: 'số tiền chênh lệch chính xác' },
    ],
    question: {
      q: 'What is the benefit of using the expense app?',
      options: ['It gives discounts on internet bills', 'It orders groceries automatically', 'It prevents confusion when splitting monthly costs'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-54',
    level: 'B1',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 54: Thói Quen Giảm Dùng Nhựa Hàng Ngày',
    sourceStyle: 'BBC • Green Living',
    transcript:
      'Cutting down on single-use plastic does not require huge lifestyle changes overnight. I started by keeping a foldable cloth bag in my backpack and carrying a stainless steel water bottle everywhere. Over the past year, those two small habits alone saved hundreds of plastic bags and cups from ending up in landfills.',
    translation:
      'Giảm thiểu đồ nhựa dùng một lần không đòi hỏi phải thay đổi lối sống quá lớn chỉ sau một đêm. Tôi bắt đầu bằng việc luôn để một chiếc túi vải gấp gọn trong ba lô và mang theo bình nước thép không gỉ khắp mọi nơi. Trong suốt năm qua, chỉ riêng hai thói quen nhỏ đó đã giảm hàng trăm túi và ly nhựa thải ra bãi rác.',
    keyPhrases: [
      { en: 'single-use plastic', vi: 'nhựa dùng một lần' },
      { en: 'foldable cloth bag', vi: 'túi vải gấp gọn' },
      { en: 'small habits', vi: 'những thói quen nhỏ' },
    ],
    question: {
      q: 'Which two items does the speaker carry regularly?',
      options: ['A cloth bag and a steel water bottle', 'A glass lunchbox and wooden chopsticks', 'A paper cup and a bicycle lock'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-55',
    level: 'B1',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 55: Gia Hạn Hợp Đồng Thuê Căn Hộ Với Chủ Nhà',
    sourceStyle: 'British Council • Real-Life Dialogue',
    transcript:
      'My current apartment lease expires next month, and I would love to renew it for another twelve months. However, the kitchen sink has been leaking slightly since last week. Could your maintenance team fix the pipe before we sign the new agreement? If everything stays at the same rent, I can transfer the deposit on Friday.',
    translation:
      'Hợp đồng thuê căn hộ hiện tại của tôi sẽ hết hạn vào tháng tới, và tôi rất muốn gia hạn thêm mười hai tháng nữa. Tuy nhiên, bồn rửa nhà bếp bị rò rỉ nhẹ từ tuần trước. Đội bảo trì của anh có thể sửa ống nước trước khi chúng ta ký hợp đồng mới không? Nếu giá thuê giữ nguyên, tôi có thể chuyển tiền cọc vào thứ Sáu.',
    keyPhrases: [
      { en: 'lease expires', vi: 'hợp đồng thuê hết hạn' },
      { en: 'maintenance team', vi: 'đội ngũ bảo trì' },
      { en: 'transfer the deposit', vi: 'chuyển tiền đặt cọc' },
    ],
    question: {
      q: 'What does the tenant ask the landlord to repair first?',
      options: ['The bedroom air conditioner', 'The leaking kitchen sink', 'The front door lock'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-56',
    level: 'B2',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 56: Giải Quyết Hiểu Lầm Lịch Hẹn Với Bạn Thân',
    sourceStyle: 'British Council • Social Nuances',
    transcript:
      'I owe you a sincere apology for missing our coffee catch-up this afternoon. When you texted about meeting at four, I mistakenly wrote Thursday in my calendar instead of Wednesday. Rather than making excuses, I would love to make it up to you by treating you to brunch this weekend whenever suits you best.',
    translation:
      'Mình nợ bạn một lời xin lỗi chân thành vì đã lỡ buổi cà phê trò chuyện chiều nay. Khi bạn nhắn tin hẹn gặp lúc bốn giờ, mình lại ghi nhầm vào lịch là thứ Năm thay vì thứ Tư. Thay vì viện cớ, mình rất muốn bù đắp cho bạn bằng một bữa ăn trưa muộn cuối tuần này bất cứ lúc nào tiện cho bạn nhất.',
    keyPhrases: [
      { en: 'sincere apology', vi: 'lời xin lỗi chân thành' },
      { en: 'making excuses', vi: 'viện cớ / bào chữa' },
      { en: 'make it up to you', vi: 'bù đắp cho bạn' },
    ],
    question: {
      q: 'Why did the speaker miss the coffee catch-up?',
      options: ['They wrote the wrong day in their calendar', 'The cafe closed early for cleaning', 'They forgot to check their phone all week'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-57',
    level: 'B2',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 57: Tình Nguyện Trồng Cây Xanh Đô Thị',
    sourceStyle: 'VOA • Community Spotlight',
    transcript:
      'Last Saturday, over eighty neighborhood volunteers turned an empty concrete lot into a shaded community garden. Although digging through hard soil under the morning sun was exhausting, everyone remained in high spirits. Watching local children water the newly planted saplings reminded us how small collective efforts can transform urban spaces.',
    translation:
      'Thứ Bảy vừa qua, hơn tám mươi tình nguyện viên trong khu phố đã biến một bãi đất bê tông trống thành khu vườn cộng đồng rợp bóng cây. Dù việc đào lớp đất cứng dưới nắng sáng khá vất vả, mọi người vẫn giữ tinh thần rất phấn chấn. Nhìn lũ trẻ địa phương tưới những cây non mới trồng khiến chúng tôi nhận ra những nỗ lực tập thể nhỏ bé có thể biến đổi không gian đô thị như thế nào.',
    keyPhrases: [
      { en: 'community garden', vi: 'khu vườn cộng đồng' },
      { en: 'in high spirits', vi: 'tinh thần phấn chấn' },
      { en: 'collective efforts', vi: 'những nỗ lực tập thể' },
    ],
    question: {
      q: 'What challenge did the volunteers face during the project?',
      options: ['Heavy rain delayed the planting', 'Digging through hard soil in the sun was tiring', 'Too few volunteers showed up'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-58',
    level: 'B2',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 58: Thuyết Phục Gia Đình Phân Loại Rác Tại Nguồn',
    sourceStyle: 'BBC • Everyday Debates',
    transcript:
      'At first, my parents worried that separating food scraps from recyclables would clutter our compact kitchen. Instead of arguing, I placed two color-coded bins under the sink and labeled each one clearly. Once they noticed how much less odor the regular trash produced, sorting waste quickly became second nature to the whole household.',
    translation:
      'Ban đầu, bố mẹ tôi lo rằng việc tách rác thải thực phẩm khỏi rác tái chế sẽ làm căn bếp nhỏ thêm chật chội. Thay vì tranh cãi, tôi đặt hai thùng rác phân biệt theo màu dưới bồn rửa và dán nhãn rõ ràng từng loại. Khi nhận thấy thùng rác thường bớt mùi hôi hẳn đi, việc phân loại rác nhanh chóng trở thành thói quen tự nhiên của cả nhà.',
    keyPhrases: [
      { en: 'separating food scraps', vi: 'tách riêng rác thực phẩm' },
      { en: 'color-coded bins', vi: 'thùng rác phân biệt theo màu' },
      { en: 'became second nature', vi: 'trở thành thói quen tự nhiên' },
    ],
    question: {
      q: 'What convinced the parents to keep sorting their waste?',
      options: ['The city offered cash rewards', 'They bought a larger kitchen table', 'The regular trash produced noticeably less odor'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-59',
    level: 'B2',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 59: Lối Sống Tối Giản & Dọn Dẹp Không Gian Sống',
    sourceStyle: 'BBC • Modern Lifestyle',
    transcript:
      'Moving into a smaller studio forced me to evaluate every possession I had accumulated over five years. By donating unread books and unworn coats to local charities, I realized that clutter had quietly drained my focus every morning. Living with fewer belongings now gives me both physical breathing room and unexpected mental clarity.',
    translation:
      'Việc chuyển sang một căn hộ studio nhỏ hơn buộc tôi phải cân nhắc từng món đồ mình đã tích trữ suốt năm năm qua. Khi quyên góp những cuốn sách chưa đọc và áo khoác ít mặc cho các tổ chức từ thiện địa phương, tôi nhận ra sự bừa bộn từng âm thầm làm giảm sự tập trung của mình mỗi sáng. Sống với ít đồ đạc hơn giờ đây mang lại cho tôi cả khoảng không gian thoáng đãng lẫn sự minh mẫn tinh thần bất ngờ.',
    keyPhrases: [
      { en: 'evaluate every possession', vi: 'đánh giá lại từng món đồ sở hữu' },
      { en: 'drained my focus', vi: 'làm cạn kiệt sự tập trung' },
      { en: 'mental clarity', vi: 'sự minh mẫn về tinh thần' },
    ],
    question: {
      q: 'What did the speaker do with unread books and unworn coats?',
      options: ['Sold them at a night market', 'Donated them to local charities', 'Stored them in a rented garage'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-60',
    level: 'B2',
    category: 'Đời sống & Giao tiếp',
    title: 'Bài 60: Giữ Ranh Giới Thời Gian Cá Nhân Giữa Đô Thị',
    sourceStyle: 'British Council • Urban Life',
    transcript:
      'In a fast-paced city, saying yes to every social invitation can leave you permanently exhausted by Sunday night. Lately, I have started blocking off Friday evenings exclusively for quiet reading, cooking, and resting without guilt. Surprisingly, protecting my personal downtime has made me far more present and enthusiastic when I do meet friends.',
    translation:
      'Ở một thành phố nhịp sống hối hả, việc gật đầu trước mọi lời mời tụ tập có thể khiến bạn kiệt sức triền miên vào tối Chủ nhật. Gần đây, tôi bắt đầu giữ riêng các tối thứ Sáu chỉ để đọc sách yên tĩnh, nấu ăn và nghỉ ngơi mà không cảm thấy áy náy. Thật bất ngờ, việc bảo vệ khoảng thời gian riêng tư lại giúp tôi hào hứng và toàn tâm toàn ý hơn hẳn mỗi khi thực sự gặp gỡ bạn bè.',
    keyPhrases: [
      { en: 'blocking off Friday evenings', vi: 'dành riêng các tối thứ Sáu' },
      { en: 'personal downtime', vi: 'thời gian nghỉ ngơi cá nhân' },
      { en: 'more present and enthusiastic', vi: 'tập trung trọn vẹn và hào hứng hơn' },
    ],
    question: {
      q: 'How has protecting Friday evenings affected the speaker?',
      options: ['Friends stopped inviting them out', 'They started working overtime on weekends', 'They feel more enthusiastic when meeting friends'],
      correctIdx: 2,
    },
  },

  // =========================================================================
  // 2. DU LỊCH & KHÁCH SẠN (lr-61 .. lr-80)
  // =========================================================================
  {
    id: 'lr-61',
    level: 'A1',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 61: Hỏi Đường Tới Bến Xe Buýt Gần Nhất',
    sourceStyle: 'British Council • Travel Listening',
    transcript:
      'Excuse me, where is the nearest bus stop for the city center? Walk straight down this road for two minutes and turn left at the bakery. You will see a blue bus sign right across from the post office. Thank you very much for your help!',
    translation:
      'Xin lỗi, trạm xe buýt gần nhất đi trung tâm thành phố ở đâu vậy ạ? Bạn đi thẳng xuống con đường này khoảng hai phút rồi rẽ trái ở tiệm bánh mì. Bạn sẽ thấy biển báo xe buýt màu xanh ngay đối diện bưu điện. Cảm ơn bạn rất nhiều vì đã giúp đỡ!',
    keyPhrases: [
      { en: 'nearest bus stop', vi: 'trạm xe buýt gần nhất' },
      { en: 'turn left at the bakery', vi: 'rẽ trái ở tiệm bánh' },
      { en: 'across from the post office', vi: 'đối diện bưu điện' },
    ],
    question: {
      q: 'What is directly across from the bus stop?',
      options: ['A bakery', 'A post office', 'A train station'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-62',
    level: 'A1',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 62: Mua Vé Tàu Một Chiều Tại Quầy',
    sourceStyle: 'BBC • Everyday English',
    transcript:
      'Hello, I would like one single ticket to Oxford, please. That is twelve pounds. The next train leaves at ten fifteen from platform four. Is there a quiet car on that train? Yes, the last carriage at the back is quiet.',
    translation:
      'Xin chào, cho tôi mua một vé một chiều đi Oxford ạ. Vé có giá mười hai bảng. Chuyến tàu tiếp theo khởi hành lúc mười giờ mười lăm từ sân ga số bốn. Trên tàu đó có toa yên tĩnh không ạ? Có chứ, toa cuối cùng ở phía sau là toa yên tĩnh.',
    keyPhrases: [
      { en: 'one single ticket', vi: 'một vé một chiều' },
      { en: 'platform four', vi: 'sân ga số bốn' },
      { en: 'quiet car', vi: 'toa tàu yên tĩnh' },
    ],
    question: {
      q: 'Where is the quiet area on the train?',
      options: ['In the front carriage', 'In the middle carriage', 'In the last carriage at the back'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-63',
    level: 'A1',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 63: Hỏi Mật Khẩu Wi-Fi & Giờ Ăn Sáng Khách Sạn',
    sourceStyle: 'VOA • Travel English',
    transcript:
      'Good evening! What is the hotel Wi-Fi password, please? You can connect to Sunrise Guest, and the password is written inside your room folder. Also, what time is breakfast served? Breakfast is open from six thirty to nine thirty every morning.',
    translation:
      'Chào buổi tối! Cho tôi hỏi mật khẩu Wi-Fi của khách sạn là gì ạ? Quý khách có thể kết nối mạng Sunrise Guest, còn mật khẩu được ghi bên trong tập hồ sơ ở phòng mình ạ. Ngoài ra, bữa sáng phục vụ lúc mấy giờ vậy? Bữa sáng mở từ sáu giờ ba mươi đến chín giờ ba mươi mỗi sáng ạ.',
    keyPhrases: [
      { en: 'Wi-Fi password', vi: 'mật khẩu Wi-Fi' },
      { en: 'room folder', vi: 'tập thông tin trong phòng' },
      { en: 'every morning', vi: 'mỗi buổi sáng' },
    ],
    question: {
      q: 'Where can the guest find the Wi-Fi password?',
      options: ['Inside the room folder', 'On the elevator wall', 'At the breakfast buffet'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-64',
    level: 'A1',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 64: Nhờ Lễ Tân Gọi Taxi Ra Sân Bay',
    sourceStyle: 'British Council • Travel Listening',
    transcript:
      'Good morning, could you call a taxi to the airport for me at two PM today? Certainly, madam, just tell me your room number. I am in room three zero five, and I have two large suitcases. No problem, I will book a spacious car and call your room when it arrives.',
    translation:
      'Chào buổi sáng, bạn có thể gọi giúp tôi một chiếc taxi ra sân bay vào lúc hai giờ chiều nay không? Chắc chắn rồi thưa bà, bà chỉ cần cho tôi biết số phòng ạ. Tôi ở phòng ba lẻ năm, và tôi có hai chiếc vali lớn. Không vấn đề gì, tôi sẽ đặt xe rộng rãi và gọi lên phòng khi xe tới.',
    keyPhrases: [
      { en: 'call a taxi', vi: 'gọi xe taxi' },
      { en: 'room number', vi: 'số phòng' },
      { en: 'two large suitcases', vi: 'hai chiếc vali lớn' },
    ],
    question: {
      q: 'Why does the receptionist book a spacious car?',
      options: ['Because five people are traveling', 'Because the guest has two large suitcases', 'Because it is raining outside'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-65',
    level: 'A1',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 65: Xin Thêm Khăn Tắm & Gối Cho Phòng Nghỉ',
    sourceStyle: 'BBC • Travel English',
    transcript:
      'Hello housekeeping, this is room four twelve calling for two extra bath towels and one more soft pillow, please. Of course, and do you also need more bottled water? No thank you, the water is fine. We will bring the towels and pillow up in ten minutes.',
    translation:
      'Alô bộ phận buồng phòng, đây là phòng bốn mười hai gọi xin thêm hai chiếc khăn tắm và một cái gối mềm nữa ạ. Tất nhiên rồi ạ, quý khách có cần thêm nước suối đóng chai không? Không cần đâu cảm ơn bạn, nước uống đủ rồi. Chúng tôi sẽ mang khăn và gối lên trong mười phút ạ.',
    keyPhrases: [
      { en: 'extra bath towels', vi: 'thêm khăn tắm' },
      { en: 'bottled water', vi: 'nước uống đóng chai' },
      { en: 'in ten minutes', vi: 'trong mười phút nữa' },
    ],
    question: {
      q: 'What does the guest say about bottled water?',
      options: ['They need four more bottles', 'They want hot tea instead', 'They do not need any more'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-66',
    level: 'A2',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 66: Làm Thủ Tục Ký Gửi Hành Lý Tại Sân Bay',
    sourceStyle: 'British Council • Travel Listening',
    transcript:
      'Good afternoon, may I see your passport and booking confirmation? Here they are. Please place your suitcase on the scale to check the weight. It is eighteen kilograms, which is well under the limit. Would you prefer a window seat or an aisle seat today?',
    translation:
      'Chào buổi chiều, tôi có thể xem hộ chiếu và xác nhận đặt vé của anh không? Đây ạ. Vui lòng đặt vali của anh lên cân để kiểm tra trọng lượng. Hành lý nặng mười tám kilôgam, thấp hơn nhiều so với mức giới hạn. Hôm nay anh thích ghế cạnh cửa sổ hay ghế sát lối đi?',
    keyPhrases: [
      { en: 'booking confirmation', vi: 'xác nhận đặt vé' },
      { en: 'under the limit', vi: 'dưới mức giới hạn' },
      { en: 'window seat or an aisle seat', vi: 'ghế cửa sổ hay ghế lối đi' },
    ],
    question: {
      q: 'How heavy is the passenger’s suitcase?',
      options: ['Eighteen kilograms', 'Twenty-three kilograms', 'Ten kilograms'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-67',
    level: 'A2',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 67: Gửi Hành Lý Trước Giờ Nhận Phòng Khách Sạn',
    sourceStyle: 'VOA • Travel English',
    transcript:
      'Welcome to Riverview Hotel! Your room is still being cleaned because check-in starts at two PM, and it is only ten thirty now. Would you like to leave your bags in our locked storage room while you explore the old town? Yes, that sounds wonderful! Here is your luggage tag, please keep it safe.',
    translation:
      'Chào mừng đến Khách sạn Riverview! Phòng của bạn vẫn đang được dọn dẹp vì giờ nhận phòng bắt đầu từ hai giờ chiều, mà bây giờ mới mười giờ ba mươi. Bạn có muốn gửi hành lý tại phòng giữ đồ có khóa của chúng tôi trong lúc đi dạo khu phố cổ không? Vâng, nghe tuyệt quá! Đây là thẻ nhận hành lý của bạn, vui lòng giữ cẩn thận nhé.',
    keyPhrases: [
      { en: 'locked storage room', vi: 'phòng giữ đồ có khóa' },
      { en: 'explore the old town', vi: 'khám phá khu phố cổ' },
      { en: 'luggage tag', vi: 'thẻ nhận dạng hành lý' },
    ],
    question: {
      q: 'Why can the guest not enter the room at 10:30?',
      options: ['The hotel is fully booked forever', 'The room is still being cleaned before 2 PM check-in', 'The guest arrived on the wrong date'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-68',
    level: 'A2',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 68: Đặt Tour Tham Quan Thành Phố Nửa Ngày',
    sourceStyle: 'BBC • Tourist Guide',
    transcript:
      'Hi there, do you have any walking tours available for tomorrow morning? Yes, our half-day heritage walk leaves at eight thirty from the central square and finishes around noon. The tour guide speaks clear English and takes small groups of up to ten people. Bottled water and museum entry are both included in the price.',
    translation:
      'Chào bạn, bên bạn có tour đi bộ tham quan nào cho sáng mai không? Có đấy, chuyến đi bộ di sản nửa ngày khởi hành lúc tám giờ ba mươi từ quảng trường trung tâm và kết thúc khoảng trưa. Hướng dẫn viên nói tiếng Anh rõ ràng và dẫn các nhóm nhỏ tối đa mười người. Nước đóng chai và vé vào bảo tàng đều đã bao gồm trong giá.',
    keyPhrases: [
      { en: 'half-day heritage walk', vi: 'chuyến đi bộ di sản nửa ngày' },
      { en: 'central square', vi: 'quảng trường trung tâm' },
      { en: 'included in the price', vi: 'đã bao gồm trong giá' },
    ],
    question: {
      q: 'What is included in the tour price?',
      options: ['Bottled water and museum entry', 'Lunch and hotel pickup', 'A bicycle and raincoat'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-69',
    level: 'A2',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 69: Đổi Tiền Ngoại Tệ Tại Quầy Sân Bay',
    sourceStyle: 'British Council • Travel Listening',
    transcript:
      'Hello, I would like to change three hundred US dollars into Japanese yen, please. Certainly, today’s exchange rate is listed on the screen behind me, and there is a small two-dollar service fee. Would you prefer large bills or a mix of smaller notes? A mix of smaller notes would be much easier for buses and snacks.',
    translation:
      'Xin chào, tôi muốn đổi ba trăm đô la Mỹ sang yên Nhật ạ. Vâng ạ, tỷ giá hôm nay được hiển thị trên màn hình phía sau tôi, và có khoản phí dịch vụ nhỏ là hai đô la. Anh muốn lấy tờ mệnh giá lớn hay trộn lẫn các tờ tiền nhỏ hơn? Trộn lẫn các tờ nhỏ sẽ tiện hơn nhiều khi đi xe buýt và mua đồ ăn vặt.',
    keyPhrases: [
      { en: 'exchange rate', vi: 'tỷ giá hối đoái' },
      { en: 'service fee', vi: 'phí dịch vụ' },
      { en: 'smaller notes', vi: 'các tờ tiền mệnh giá nhỏ' },
    ],
    question: {
      q: 'Why does the traveler want smaller notes?',
      options: ['They are easier for buses and snacks', 'Large bills are out of stock', 'Hotels only accept coins'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-70',
    level: 'A2',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 70: Trả Phòng Khách Sạn & Kiểm Tra Hóa Đơn',
    sourceStyle: 'VOA • Travel English',
    transcript:
      'Good morning, I am checking out of room two zero eight today. Thank you! Did you take anything from the minibar during your stay? Just one bottle of sparkling water last night. That adds three dollars to your final bill, and your original room charge is already paid online.',
    translation:
      'Chào buổi sáng, hôm nay tôi làm thủ tục trả phòng hai lẻ tám. Cảm ơn quý khách! Quý khách có dùng món gì từ tủ lạnh mini trong thời gian lưu trú không ạ? Tối qua tôi chỉ lấy một chai nước khoáng có ga thôi. Khoản đó cộng thêm ba đô la vào hóa đơn cuối, còn tiền phòng ban đầu đã được thanh toán trực tuyến rồi ạ.',
    keyPhrases: [
      { en: 'checking out', vi: 'làm thủ tục trả phòng' },
      { en: 'final bill', vi: 'hóa đơn thanh toán cuối cùng' },
      { en: 'already paid online', vi: 'đã thanh toán trực tuyến' },
    ],
    question: {
      q: 'What extra item does the guest pay for at checkout?',
      options: ['Airport shuttle service', 'Two extra nights', 'One bottle of sparkling water'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-71',
    level: 'B1',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 71: Xử Lý Sự Cố Điều Hòa Ồn Tại Phòng Khách Sạn',
    sourceStyle: 'British Council • Real-Life Dialogue',
    transcript:
      'Excuse me, I just checked into room five ten, and the air conditioner is making a loud rattling noise. I tried restarting it, but the sound continues and makes it hard to sleep. Would it be possible to move me to a quieter room on a higher floor? Let me check availability right away and send a porter to assist with your bags.',
    translation:
      'Xin lỗi, tôi vừa nhận phòng năm mười, và máy điều hòa đang phát ra tiếng lạch cạch rất lớn. Tôi đã thử khởi động lại nhưng tiếng ồn vẫn tiếp tục khiến tôi khó ngủ. Bạn có thể chuyển giúp tôi sang một phòng yên tĩnh hơn ở tầng cao hơn được không? Để tôi kiểm tra phòng trống ngay và cử nhân viên hành lý hỗ trợ mang đồ giúp quý khách.',
    keyPhrases: [
      { en: 'rattling noise', vi: 'tiếng kêu lạch cạch' },
      { en: 'quieter room', vi: 'phòng yên tĩnh hơn' },
      { en: 'check availability', vi: 'kiểm tra tình trạng phòng trống' },
    ],
    question: {
      q: 'What does the receptionist offer to do?',
      options: ['Give a free breakfast coupon only', 'Check for another room and send a porter', 'Turn off electricity on the whole floor'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-72',
    level: 'B1',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 72: Thông Báo Hoãn Chuyến Bay Tại Cổng Khởi Hành',
    sourceStyle: 'BBC • Airport Announcements',
    transcript:
      'Attention passengers traveling on Flight VN214 to Bangkok. Due to heavy thunderstorms along the route, departure has been delayed by ninety minutes until four fifteen PM. Refreshment vouchers are now available at the gate desk upon showing your boarding pass. We appreciate your cooperation and will announce boarding thirty minutes prior to takeoff.',
    translation:
      'Xin lưu ý hành khách đi trên chuyến bay VN214 tới Bangkok. Do mưa giông lớn dọc đường bay, giờ khởi hành bị hoãn chín mươi phút sang bốn giờ mười lăm chiều. Phiếu ăn uống nhẹ hiện đã có sẵn tại quầy cửa ra máy bay khi quý khách xuất trình thẻ lên tàu. Chúng tôi cảm ơn sự hợp tác của quý khách và sẽ thông báo lên máy bay ba mươi phút trước giờ cất cánh.',
    keyPhrases: [
      { en: 'heavy thunderstorms', vi: 'mưa giông lớn' },
      { en: 'refreshment vouchers', vi: 'phiếu ăn uống nhẹ' },
      { en: 'boarding pass', vi: 'thẻ lên máy bay' },
    ],
    question: {
      q: 'What must passengers show to get a refreshment voucher?',
      options: ['Their boarding pass', 'Their hotel reservation', 'A baggage claim receipt'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-73',
    level: 'B1',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 73: Báo Cáo Thất Lạc Hành Lý Tại Quầy Sân Bay',
    sourceStyle: 'VOA • Travel Problem Solving',
    transcript:
      'My flight arrived forty minutes ago, yet my green hard-shell suitcase never appeared on carousel three. Please fill out this missing baggage form with your hotel address and local phone number. Most delayed bags arrive on the next evening flight, and our courier will deliver it straight to your hotel at no extra cost.',
    translation:
      'Chuyến bay của tôi đã hạ cánh bốn mươi phút trước, nhưng chiếc vali vỏ cứng màu xanh lá của tôi vẫn không xuất hiện trên băng chuyền số ba. Vui lòng điền vào mẫu khai báo thất lạc hành lý này kèm địa chỉ khách sạn và số điện thoại liên lạc tại đây. Phần lớn hành lý chậm chuyến sẽ đến trên chuyến bay tối kế tiếp, và nhân viên giao nhận của chúng tôi sẽ giao thẳng tới khách sạn của bạn miễn phí.',
    keyPhrases: [
      { en: 'missing baggage form', vi: 'mẫu khai báo thất lạc hành lý' },
      { en: 'next evening flight', vi: 'chuyến bay tối kế tiếp' },
      { en: 'at no extra cost', vi: 'hoàn toàn miễn phí phát sinh' },
    ],
    question: {
      q: 'How will the passenger receive the delayed suitcase?',
      options: ['They must pick it up at the airport next week', 'The hotel staff will drive to the airport', 'A courier will deliver it to their hotel for free'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-74',
    level: 'B1',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 74: Thuê Xe Tự Lái & Hỏi Quy Định Bảo Hiểm',
    sourceStyle: 'British Council • Travel Listening',
    transcript:
      'Before I sign the car rental contract, could you clarify what the basic insurance covers? It covers third-party damage, though a deductible applies to minor scratches. We also operate a full-to-full fuel policy, meaning you pick up the car with a full tank and refill it before returning. Checking the tires and taking photos before driving off is always wise.',
    translation:
      'Trước khi tôi ký hợp đồng thuê xe, bạn có thể làm rõ bảo hiểm cơ bản chi trả những gì không? Gói này chi trả thiệt hại cho bên thứ ba, tuy nhiên sẽ áp dụng mức khấu trừ với các vết trầy xước nhỏ. Chúng tôi cũng áp dụng chính sách xăng đầy bình giao đầy bình trả, nghĩa là bạn nhận xe đầy xăng và đổ đầy lại trước khi trả. Việc kiểm tra lốp xe và chụp ảnh trước khi lái đi luôn rất khôn ngoan.',
    keyPhrases: [
      { en: 'car rental contract', vi: 'hợp đồng thuê xe' },
      { en: 'full-to-full fuel policy', vi: 'chính sách nhận đầy xăng trả đầy xăng' },
      { en: 'before returning', vi: 'trước khi trả xe' },
    ],
    question: {
      q: 'What does the fuel policy require the driver to do?',
      options: ['Return the car completely empty', 'Refill the fuel tank before returning the car', 'Pay the gas station directly through the hotel'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-75',
    level: 'B1',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 75: Đề Nghị Trả Phòng Muộn Vì Chuyến Bay Tối',
    sourceStyle: 'BBC • Hotel Etiquette',
    transcript:
      'Because my return flight does not depart until nine PM, would it be possible to request a late checkout tomorrow? Normally checkout is at noon, but since tomorrow is fairly quiet, we can extend your stay until three PM free of charge. If you still need to wait afterward, you are welcome to relax in our lobby lounge and use the shower room.',
    translation:
      'Vì chuyến bay về của tôi tận chín giờ tối mới khởi hành, liệu tôi có thể xin trả phòng muộn vào ngày mai không? Thông thường giờ trả phòng là mười hai giờ trưa, nhưng do ngày mai lượng khách khá vắng, chúng tôi có thể gia hạn cho bạn đến ba giờ chiều miễn phí. Nếu sau đó bạn vẫn cần chờ, bạn cứ thoải mái nghỉ ngơi tại sảnh chờ và sử dụng phòng tắm tráng của chúng tôi.',
    keyPhrases: [
      { en: 'request a late checkout', vi: 'xin trả phòng muộn' },
      { en: 'free of charge', vi: 'miễn phí' },
      { en: 'lobby lounge', vi: 'khu vực sảnh chờ' },
    ],
    question: {
      q: 'Until what time can the guest stay in the room at no extra cost?',
      options: ['Noon', 'Nine PM', 'Three PM'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-76',
    level: 'B2',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 76: Xử Lý Việc Lỡ Chuyến Bay Nối Chuyến',
    sourceStyle: 'British Council • Travel Scenarios',
    transcript:
      'Because my inbound flight was delayed by strong headwinds, I missed my connecting flight to Munich twenty minutes ago. I understand how frustrating that is, and I am rebooking you onto our partner airline departing at six forty this evening. Since the layover exceeds five hours, you are also entitled to a complimentary lounge pass and a hot meal.',
    translation:
      'Vì chuyến bay đến của tôi bị trễ do gió ngược mạnh, tôi đã lỡ chuyến bay nối chuyến đi Munich cách đây hai mươi phút. Tôi hiểu điều đó gây khó chịu thế nào, và tôi đang đặt lại vé cho bạn sang hãng hàng không đối tác khởi hành lúc sáu giờ bốn mươi tối nay. Vì thời gian quá cảnh vượt quá năm tiếng, bạn cũng được hưởng một vé vào phòng chờ miễn phí và một bữa ăn nóng.',
    keyPhrases: [
      { en: 'connecting flight', vi: 'chuyến bay nối chuyến' },
      { en: 'rebooking you', vi: 'đặt lại vé cho bạn' },
      { en: 'complimentary lounge pass', vi: 'vé vào phòng chờ miễn phí' },
    ],
    question: {
      q: 'Why does the passenger receive a lounge pass and hot meal?',
      options: ['The layover is longer than five hours', 'They bought a first-class upgrade', 'Their checked bag was lost'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-77',
    level: 'B2',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 77: Phàn Nàn Khéo Về Khoản Phí Sai Trên Hóa Đơn',
    sourceStyle: 'BBC • Business & Travel',
    transcript:
      'Before settling this invoice, I noticed an unexpected forty-dollar room service charge dated Wednesday evening. If memory serves, I dined outside the hotel with local colleagues that night and never ordered anything to my room. Let me pull up the signed receipt from the restaurant system right now. Oh, I see the mistake—our clerk typed the wrong room number, so I will remove that charge immediately.',
    translation:
      'Trước khi thanh toán hóa đơn này, tôi thấy có một khoản phí dịch vụ phòng bốn mươi đô la bất ngờ ghi ngày tối thứ Tư. Nếu tôi nhớ không nhầm, tối hôm đó tôi ăn ngoài cùng đồng nghiệp địa phương và không hề gọi món về phòng. Để tôi tra cứu hóa đơn có chữ ký trên hệ thống nhà hàng ngay bây giờ. Ồ, tôi thấy lỗi rồi—nhân viên bên tôi nhập nhầm số phòng, nên tôi sẽ gỡ bỏ khoản phí đó ngay lập tức.',
    keyPhrases: [
      { en: 'settling this invoice', vi: 'thanh toán hóa đơn này' },
      { en: 'pull up the signed receipt', vi: 'tra cứu hóa đơn có chữ ký' },
      { en: 'remove that charge', vi: 'xóa bỏ khoản phí đó' },
    ],
    question: {
      q: 'How did the extra charge end up on the guest’s bill?',
      options: ['The minibar sensor malfunctioned', 'The guest forgot ordering dinner', 'A clerk entered the wrong room number'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-78',
    level: 'B2',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 78: Du Lịch Bền Vững & Tôn Trọng Văn Hóa Bản Địa',
    sourceStyle: 'VOA • Global Travel Report',
    transcript:
      'Sustainable tourism goes far beyond staying in eco-certified hotels or avoiding plastic straws. It involves learning basic greetings in the local language, dressing modestly at heritage temples, and purchasing crafts directly from village artisans rather than mass-market souvenir chains. When travelers slow down and engage respectfully, tourism money stays inside the community and helps preserve living traditions.',
    translation:
      'Du lịch bền vững không chỉ dừng lại ở việc ở các khách sạn đạt chuẩn sinh thái hay tránh dùng ống hút nhựa. Nó bao gồm việc học vài câu chào cơ bản bằng ngôn ngữ bản địa, ăn mặc trang nhã tại các đền chùa di sản, và mua đồ thủ công trực tiếp từ nghệ nhân làng nghề thay vì các chuỗi cửa hàng lưu niệm đại trà. Khi du khách đi chậm lại và tương tác một cách tôn trọng, nguồn tiền du lịch sẽ ở lại với cộng đồng và giúp bảo tồn các truyền thống sống động.',
    keyPhrases: [
      { en: 'dressing modestly', vi: 'ăn mặc kín đáo trang nhã' },
      { en: 'village artisans', vi: 'các nghệ nhân làng nghề' },
      { en: 'preserve living traditions', vi: 'bảo tồn các truyền thống sống động' },
    ],
    question: {
      q: 'Where should responsible travelers buy handmade crafts according to the passage?',
      options: ['Directly from village artisans', 'At airport duty-free shops', 'From mass-market souvenir chains'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-79',
    level: 'B2',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 79: Lập Kế Hoạch Dự Phòng Khi Gặp Thời Tiết Xấu',
    sourceStyle: 'British Council • Travel Listening',
    transcript:
      'Although we had originally booked a coastal boat trip for tomorrow, the latest marine forecast warns of rough waves and heavy gusts. Rather than risking an unpleasant crossing, we contacted the operator early and secured a full refund without any penalty. Instead, we will spend the morning visiting the regional pottery museum and sampling street food under the covered market.',
    translation:
      'Dù ban đầu chúng tôi đã đặt chuyến đi thuyền ven biển cho ngày mai, bản tin dự báo hàng hải mới nhất cảnh báo có sóng lớn và gió giật mạnh. Thay vì mạo hiểm với một chuyến vượt biển khó chịu, chúng tôi đã liên hệ sớm với đơn vị tổ chức và được hoàn tiền đầy đủ mà không mất phí phạt. Thay vào đó, chúng tôi sẽ dành buổi sáng tham quan bảo tàng gốm sứ địa phương và thưởng thức ẩm thực đường phố trong khu chợ có mái che.',
    keyPhrases: [
      { en: 'rough waves', vi: 'sóng biển dữ dội' },
      { en: 'full refund', vi: 'hoàn tiền toàn bộ' },
      { en: 'covered market', vi: 'khu chợ có mái che' },
    ],
    question: {
      q: 'Why did the travelers cancel their boat trip?',
      options: ['The boat needed engine repairs', 'The marine forecast warned of rough waves and gusts', 'They ran out of cash for tickets'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-80',
    level: 'B2',
    category: 'Du lịch & Khách sạn',
    title: 'Bài 80: Đánh Giá Dịch Vụ Khách Sạn Sinh Thái Độc Đáo',
    sourceStyle: 'BBC • Hospitality Review',
    transcript:
      'Tucked among terraced rice fields, this boutique eco-lodge proved that comfort and environmental care can coexist effortlessly. Every cabin uses solar water heating, natural bamboo ventilation, and refillable ceramic soap dispensers instead of disposable packets. What truly set our stay apart, however, was the staff’s genuine warmth and their insightful recommendations for quiet trails away from crowded tourist buses.',
    translation:
      'Nép mình giữa những thửa ruộng bậc thang, khu nghỉ dưỡng sinh thái nhỏ xinh này đã chứng minh rằng sự tiện nghi và ý thức bảo vệ môi trường có thể song hành nhẹ nhàng. Mỗi căn nhà gỗ đều dùng máy nước nóng năng lượng mặt trời, thông gió tự nhiên bằng tre và bình gốm đựng xà phòng tái nạp thay cho gói dùng một lần. Tuy nhiên, điều thực sự tạo nên dấu ấn cho kỳ nghỉ của chúng tôi chính là sự ấm áp chân thành của nhân viên cùng những gợi ý tinh tế về các cung đường vắng vẻ tách biệt khỏi xe khách đông đúc.',
    keyPhrases: [
      { en: 'coexist effortlessly', vi: 'song hành một cách nhẹ nhàng' },
      { en: 'disposable packets', vi: 'các gói đồ dùng một lần' },
      { en: 'genuine warmth', vi: 'sự ấm áp chân thành' },
    ],
    question: {
      q: 'What stood out most to the reviewer about their stay?',
      options: ['The huge indoor swimming pool', 'The free airport limousine', 'The staff’s warmth and quiet trail tips'],
      correctIdx: 2,
    },
  },

  // =========================================================================
  // 3. ẨM THỰC & MUA SẮM (lr-81 .. lr-100)
  // =========================================================================
  {
    id: 'lr-81',
    level: 'A1',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 81: Đặt Bàn Cho Hai Người Tại Nhà Hàng Tối Nay',
    sourceStyle: 'British Council • Everyday Dialogue',
    transcript:
      'Good afternoon, Lotus Bistro speaking, how can I help you? Hello, I would like to book a table for two people tonight at seven o’clock. Certainly, do you want to sit inside or near the garden? Near the garden please, and my booking name is Nam.',
    translation:
      'Chào buổi chiều, nhà hàng Lotus Bistro xin nghe, tôi có thể giúp gì cho quý khách? Xin chào, tôi muốn đặt một bàn cho hai người vào tối nay lúc bảy giờ. Vâng ạ, anh muốn ngồi bên trong hay gần khu vườn? Cho tôi ngồi gần vườn nhé, và tên đặt bàn của tôi là Nam.',
    keyPhrases: [
      { en: 'book a table for two', vi: 'đặt bàn cho hai người' },
      { en: 'tonight at seven', vi: 'tối nay lúc bảy giờ' },
      { en: 'near the garden', vi: 'gần khu vườn' },
    ],
    question: {
      q: 'Where does Nam want his table to be?',
      options: ['Near the garden', 'Next to the kitchen', 'On the rooftop'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-82',
    level: 'A1',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 82: Mua Trái Cây Tươi Ở Chợ Địa Phương',
    sourceStyle: 'VOA • Everyday English',
    transcript:
      'How much are these red apples, please? They are four dollars per kilogram, and they are very sweet today. Great, please give me one kilogram of apples and five yellow bananas. That will be six dollars in total. Here you go, thank you!',
    translation:
      'Cô ơi, táo đỏ này giá bao nhiêu vậy ạ? Táo giá bốn đô la một ký, hôm nay táo ngọt lắm đấy cháu. Tuyệt quá, cho cháu một ký táo và năm quả chuối vàng nhé. Tổng cộng hết sáu đô la. Tiền đây ạ, cháu cảm ơn cô!',
    keyPhrases: [
      { en: 'per kilogram', vi: 'mỗi kilôgam' },
      { en: 'one kilogram of apples', vi: 'một ký táo' },
      { en: 'in total', vi: 'tổng cộng' },
    ],
    question: {
      q: 'How much is the customer’s entire purchase?',
      options: ['Four dollars', 'Five dollars', 'Six dollars'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-83',
    level: 'A1',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 83: Hỏi Thành Phần Món Ăn Không Cay',
    sourceStyle: 'BBC • Dining & Shopping',
    transcript:
      'Excuse me, is this chicken noodle soup very spicy? No, it is mild and has no chili inside. We cook it with fresh herbs, carrots, and sweet corn. That sounds delicious, I will have one bowl and a glass of iced tea, please.',
    translation:
      'Xin lỗi bạn, món phở gà này có cay lắm không? Không đâu ạ, món này vị dịu nhẹ và không có ớt bên trong. Chúng tôi nấu cùng rau thơm tươi, cà rốt và bắp ngọt. Nghe ngon quá, cho tôi một tô và một ly trà đá nhé.',
    keyPhrases: [
      { en: 'very spicy', vi: 'rất cay' },
      { en: 'no chili inside', vi: 'không có ớt bên trong' },
      { en: 'fresh herbs', vi: 'rau thơm tươi' },
    ],
    question: {
      q: 'Why does the customer choose the chicken noodle soup?',
      options: ['Because it is the cheapest dish', 'Because it is mild and has no chili', 'Because it comes with free dessert'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-84',
    level: 'A1',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 84: Thanh Toán Bằng Thẻ Hay Tiền Mặt Tại Siêu Thị',
    sourceStyle: 'British Council • Real-Life Dialogue',
    transcript:
      'Hello, did you find everything you needed today? Yes thank you, and I brought my own green bag so I do not need a paper bag. Can I pay by credit card at this counter? Sure, please tap your card on the machine right here.',
    translation:
      'Xin chào, hôm nay bạn tìm đủ mọi thứ mình cần rồi chứ? Vâng cảm ơn bạn, và mình có mang theo túi xanh riêng nên không cần túi giấy đâu. Mình có thể thanh toán bằng thẻ tín dụng tại quầy này không? Được chứ, bạn chạm thẻ vào máy ở ngay đây nhé.',
    keyPhrases: [
      { en: 'paper bag', vi: 'túi giấy' },
      { en: 'pay by credit card', vi: 'thanh toán bằng thẻ tín dụng' },
      { en: 'tap your card', vi: 'chạm thẻ của bạn' },
    ],
    question: {
      q: 'Why does the shopper say no to a paper bag?',
      options: ['They only bought one apple', 'Bags cost too much money', 'They brought their own green bag'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-85',
    level: 'A1',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 85: Chọn Bánh Ngọt & Trà Buổi Chiều',
    sourceStyle: 'BBC • Everyday English',
    transcript:
      'Welcome to Sweet Corner Bakery! Everything smells amazing in here. What kind of cake is that with the yellow cream on top? That is our homemade lemon cake, baked fresh at two PM. Let me take one slice of lemon cake and a pot of hot jasmine tea.',
    translation:
      'Chào mừng đến Tiệm bánh Sweet Corner! Mọi thứ trong đây thơm nức mũi. Loại bánh có lớp kem vàng ở trên kia là bánh gì vậy bạn? Đó là bánh chanh nhà làm của tiệm, vừa nướng mới lúc hai giờ chiều. Cho mình một lát bánh chanh và một ấm trà hoa nhài nóng nhé.',
    keyPhrases: [
      { en: 'homemade lemon cake', vi: 'bánh chanh nhà làm' },
      { en: 'baked fresh', vi: 'mới nướng xong' },
      { en: 'one slice of', vi: 'một lát / một miếng' },
    ],
    question: {
      q: 'What drink does the customer order with the cake?',
      options: ['Iced black coffee', 'Hot jasmine tea', 'Fresh orange juice'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-86',
    level: 'A2',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 86: Báo Dị Ứng Đậu Phộng Khi Gọi Món',
    sourceStyle: 'British Council • Dining Out',
    transcript:
      'Before we order, I need to let you know that I have a strong allergy to peanuts. Thank you for telling me right away! Our grilled salmon and vegetable rice are completely nut-free and prepared in a separate pan. I will also make a clear note on your order ticket for the kitchen chef.',
    translation:
      'Trước khi gọi món, tôi cần báo với bạn là tôi bị dị ứng nặng với đậu phộng. Cảm ơn bạn đã nói ngay từ đầu nhé! Món cá hồi nướng và cơm rau củ của bên mình hoàn toàn không có hạt và được chế biến bằng chảo riêng. Mình cũng sẽ ghi chú rõ lên phiếu gọi món gửi đầu bếp.',
    keyPhrases: [
      { en: 'allergy to peanuts', vi: 'dị ứng với đậu phộng' },
      { en: 'completely nut-free', vi: 'hoàn toàn không chứa các loại hạt' },
      { en: 'separate pan', vi: 'chảo nấu riêng biệt' },
    ],
    question: {
      q: 'How does the restaurant keep the customer’s meal safe?',
      options: ['By cooking it in a separate pan and noting it for the chef', 'By serving cold salad without cooking', 'By removing peanuts after cooking'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-87',
    level: 'A2',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 87: Đổi Size Giày Không Vừa Tại Cửa Hàng',
    sourceStyle: 'VOA • Shopping English',
    transcript:
      'Hi, I bought these white running shoes here yesterday, but they feel a little tight around my toes. Could I exchange them for one size larger? Let me check your receipt and our stockroom. Yes, we have a size forty-two right here, and you can try it on by the mirror.',
    translation:
      'Chào bạn, hôm qua mình mua đôi giày chạy màu trắng này ở đây, nhưng đi thấy hơi chật ở phần mũi chân. Mình có thể đổi sang cỡ lớn hơn một số không? Để mình kiểm tra hóa đơn và kho hàng giúp bạn nhé. Có đây rồi, bên mình còn cỡ bốn mươi hai ngay tại đây, bạn thử lại ở chỗ gương kia nhé.',
    keyPhrases: [
      { en: 'feel a little tight', vi: 'cảm thấy hơi chật' },
      { en: 'exchange them for', vi: 'đổi chúng lấy' },
      { en: 'check your receipt', vi: 'kiểm tra hóa đơn của bạn' },
    ],
    question: {
      q: 'Why does the shopper want to exchange the shoes?',
      options: ['The color faded overnight', 'One shoelace is missing', 'They feel tight around the toes'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-88',
    level: 'A2',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 88: Nhờ Gợi Ý Món Đặc Sản Địa Phương',
    sourceStyle: 'BBC • Travel & Food',
    transcript:
      'This is my first time visiting this coastal town, so what local specialty would you recommend? Our guests love the steamed sea bass with ginger and spring onions, which arrives fresh from the harbor each morning. Does it come with rice on the side? Yes, steamed jasmine rice and pickled greens are included.',
    translation:
      'Đây là lần đầu tôi ghé thăm thị trấn ven biển này, vậy bạn gợi ý món đặc sản địa phương nào? Thực khách bên mình rất thích món cá vược hấp gừng hành lá, cá được nhập tươi từ bến cảng mỗi sáng. Món đó có kèm cơm không bạn? Có ạ, cơm gạo thơm và dưa cải muối chua đã đi kèm sẵn rồi ạ.',
    keyPhrases: [
      { en: 'local specialty', vi: 'món đặc sản địa phương' },
      { en: 'fresh from the harbor', vi: 'tươi ngon từ bến cảng' },
      { en: 'on the side', vi: 'ăn kèm bên cạnh' },
    ],
    question: {
      q: 'What comes included with the steamed sea bass?',
      options: ['French fries and garlic bread', 'Jasmine rice and pickled greens', 'Mango smoothie and soup'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-89',
    level: 'A2',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 89: Hỏi Cách Áp Dụng Khuyến Mãi Mua Hai Tặng Một',
    sourceStyle: 'British Council • Shopping Listening',
    transcript:
      'Excuse me, I saw the bright yellow sign saying buy two get one free on cotton shirts. Does that deal apply to all colors on this rack? It works on every plain T-shirt, though striped shirts are twenty percent off instead. When you bring three plain shirts to the counter, the lowest-priced one becomes free automatically.',
    translation:
      'Xin lỗi bạn, mình thấy tấm biển màu vàng rực ghi mua hai tặng một đối với áo sơ mi cotton. Chương trình này áp dụng cho tất cả màu trên giá treo này đúng không? Ưu đãi áp dụng cho mọi áo thun trơn, còn áo kẻ sọc thì giảm hai mươi phần trăm. Khi bạn mang ba áo trơn ra quầy, chiếc có giá thấp nhất sẽ tự động được miễn phí.',
    keyPhrases: [
      { en: 'buy two get one free', vi: 'mua hai tặng một' },
      { en: 'apply to all colors', vi: 'áp dụng cho tất cả màu sắc' },
      { en: 'lowest-priced one', vi: 'chiếc có giá thấp nhất' },
    ],
    question: {
      q: 'What discount applies to striped shirts?',
      options: ['Buy two get one free', 'Fifty percent off', 'Twenty percent off'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-90',
    level: 'A2',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 90: Gọi Đồ Ăn Giao Tận Nhà Qua Điện Thoại',
    sourceStyle: 'VOA • Everyday English',
    transcript:
      'Hello, Mario’s Pizza! Can I order one large mushroom pizza and a Greek salad for delivery? Sure, could you confirm your street address and building gate code? It is forty-two Oak Street, apartment six B, and the gate code is four eight one two. Our driver should reach your door in about thirty-five minutes.',
    translation:
      'Alô, Tiệm Pizza Mario xin nghe! Tôi có thể đặt một chiếc pizza nấm cỡ lớn và một phần salad Hy Lạp giao tận nơi không? Chắc chắn rồi, bạn xác nhận lại địa chỉ đường và mã cổng tòa nhà giúp mình nhé? Địa chỉ là số bốn mươi hai phố Oak, căn hộ sáu B, và mã cổng là bốn tám một hai. Tài xế bên mình sẽ tới cửa nhà bạn trong khoảng ba mươi lăm phút nữa.',
    keyPhrases: [
      { en: 'for delivery', vi: 'để giao tận nơi' },
      { en: 'confirm your street address', vi: 'xác nhận địa chỉ đường' },
      { en: 'reach your door', vi: 'giao tới tận cửa nhà bạn' },
    ],
    question: {
      q: 'How long will the pizza delivery take?',
      options: ['About fifteen minutes', 'About thirty-five minutes', 'About one hour'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-91',
    level: 'B1',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 91: Xử Lý Khéo Khi Món Ăn Đem Ra Bị Nguội',
    sourceStyle: 'British Council • Dining Etiquette',
    transcript:
      'Excuse me, I hate to complain, but this seafood pasta arrived lukewarm and the sauce seems quite dry. I am terribly sorry about that! Let me take it straight back to the kitchen and ask our chef to prepare a fresh hot plate for you immediately. We would also like to offer you a complimentary dessert as an apology.',
    translation:
      'Xin lỗi bạn, tôi không muốn phàn nàn đâu nhưng đĩa mì Ý hải sản này mang ra đã hơi nguội và phần sốt khá khô. Tôi vô cùng xin lỗi về sự cố đó ạ! Hãy để tôi mang ngay vào bếp và nhờ đầu bếp làm lại cho quý khách một đĩa mới nóng hổi lập tức. Chúng tôi cũng xin gửi tặng quý khách một phần tráng miệng miễn phí thay lời xin lỗi.',
    keyPhrases: [
      { en: 'arrived lukewarm', vi: 'được mang ra trong tình trạng nguội' },
      { en: 'prepare a fresh hot plate', vi: 'chuẩn bị một đĩa mới nóng hổi' },
      { en: 'complimentary dessert', vi: 'món tráng miệng miễn phí' },
    ],
    question: {
      q: 'What does the restaurant offer besides making a fresh dish?',
      options: ['A complimentary dessert', 'Half off next month’s dinner', 'A bottle of olive oil to take home'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-92',
    level: 'B1',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 92: Yêu Cầu Hoàn Tiền Ấm Đun Nước Bị Lỗi',
    sourceStyle: 'BBC • Consumer Rights',
    transcript:
      'Hello, I purchased this electric kettle ten days ago, and the automatic shut-off switch stopped working this morning. Since you still have the original receipt and packaging, it is fully covered under our thirty-day return policy. Would you like a brand-new replacement or a full refund back to your bank card? A full refund to my card would be best, thank you.',
    translation:
      'Xin chào, tôi mua chiếc ấm đun siêu tốc này cách đây mười ngày, và sáng nay công tắc tự ngắt của nó bị hỏng rồi. Vì anh vẫn giữ hóa đơn gốc và vỏ hộp, sản phẩm được áp dụng đầy đủ theo chính sách đổi trả trong ba mươi ngày của chúng tôi. Anh muốn đổi lấy một chiếc mới tinh hay hoàn tiền toàn bộ về thẻ ngân hàng? Hoàn tiền về thẻ giúp tôi là tốt nhất, cảm ơn bạn.',
    keyPhrases: [
      { en: 'automatic shut-off switch', vi: 'công tắc tự động ngắt' },
      { en: 'thirty-day return policy', vi: 'chính sách đổi trả 30 ngày' },
      { en: 'brand-new replacement', vi: 'sản phẩm mới thay thế' },
    ],
    question: {
      q: 'What option does the customer choose?',
      options: ['A free repair next month', 'Store credit for groceries', 'A full refund to the bank card'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-93',
    level: 'B1',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 93: Hỏi Thăm Đơn Hàng Trực Tuyến Giao Chậm',
    sourceStyle: 'VOA • Customer Service',
    transcript:
      'Hi, I am calling about order number seven eight four two, which was supposed to arrive two days ago. According to our tracking system, the parcel was delayed at the regional hub due to a sorting error. I have just flagged it for priority dispatch tomorrow morning, and we will waive your shipping fee on this order.',
    translation:
      'Xin chào, tôi gọi để hỏi về đơn hàng số bảy tám bốn hai đáng lẽ phải giao tới từ hai ngày trước. Theo hệ thống theo dõi của chúng tôi, kiện hàng bị kẹt lại ở trạm trung chuyển khu vực do lỗi phân loại. Tôi vừa đánh dấu chuyển phát ưu tiên vào sáng mai, và chúng tôi sẽ miễn phí vận chuyển cho đơn hàng này của bạn.',
    keyPhrases: [
      { en: 'tracking system', vi: 'hệ thống theo dõi vận đơn' },
      { en: 'priority dispatch', vi: 'gửi đi theo diện ưu tiên' },
      { en: 'waive your shipping fee', vi: 'miễn phí vận chuyển cho bạn' },
    ],
    question: {
      q: 'What caused the parcel delay?',
      options: ['A sorting error at the regional hub', 'An incomplete street address', 'Heavy snow closed the post office'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-94',
    level: 'B1',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 94: Đọc Nhãn Dinh Dưỡng Chọn Thực Phẩm Ít Đường',
    sourceStyle: 'BBC • Healthy Shopping',
    transcript:
      'Many packaged fruit yogurts look healthy on the front label yet contain four teaspoons of added sugar per cup. Whenever I shop, I flip the container around to check the nutrition facts and compare grams of sugar per serving. Choosing plain Greek yogurt and topping it with fresh berries tastes cleaner and keeps my energy steady all afternoon.',
    translation:
      'Nhiều loại sữa chua trái cây đóng hộp trông có vẻ lành mạnh ở nhãn mặt trước nhưng lại chứa tới bốn thìa đường bổ sung trong mỗi hũ. Mỗi lần đi mua sắm, tôi đều lật mặt sau hộp để xem bảng thành phần dinh dưỡng và so sánh lượng gam đường trên mỗi khẩu phần. Chọn sữa chua Hy Lạp không đường rồi thêm quả mọng tươi giúp vị thanh hơn và giữ năng lượng ổn định suốt buổi chiều.',
    keyPhrases: [
      { en: 'added sugar', vi: 'đường bổ sung thêm' },
      { en: 'nutrition facts', vi: 'bảng thông tin dinh dưỡng' },
      { en: 'keeps my energy steady', vi: 'giữ năng lượng ổn định' },
    ],
    question: {
      q: 'How does the speaker check for hidden sugar in yogurt?',
      options: ['By reading the nutrition facts on the back', 'By asking the store cashier', 'By picking the brightest package'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-95',
    level: 'B1',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 95: Chia Hóa Đơn & Tiền Tip Trong Bữa Tối Nhóm',
    sourceStyle: 'British Council • Real-Life Dialogue',
    transcript:
      'That dinner was fantastic! How should the four of us split the bill tonight? Since we shared every dish equally, dividing the total of ninety-six dollars by four gives twenty-four dollars each. Let us also add a ten percent tip for the waiter because his service was genuinely attentive throughout the evening.',
    translation:
      'Bữa tối nay tuyệt vời thật đấy! Bốn người chúng mình nên chia hóa đơn tối nay thế nào nhỉ? Vì tụi mình ăn chung tất cả các món đều nhau, lấy tổng chín mươi sáu đô la chia bốn thì mỗi người hết hai mươi bốn đô la. Chúng ta cũng góp thêm mười phần trăm tiền thưởng cho bạn phục vụ nhé vì bạn ấy chăm sóc rất chu đáo suốt cả buổi tối.',
    keyPhrases: [
      { en: 'split the bill', vi: 'chia hóa đơn thanh toán' },
      { en: 'dividing the total', vi: 'chia đều tổng số tiền' },
      { en: 'genuinely attentive', vi: 'thực sự chu đáo tận tâm' },
    ],
    question: {
      q: 'Why do the friends decide to add a ten percent tip?',
      options: ['The restaurant requires it for groups of two', 'The waiter provided attentive service all evening', 'They ordered expensive bottled wine'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-96',
    level: 'B2',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 96: Trải Nghiệm Thực Đơn Theo Mùa Từ Nông Trại Tới Bàn Ăn',
    sourceStyle: 'BBC • Culinary Insights',
    transcript:
      'Instead of printing a fixed menu all year round, this neighborhood kitchen rewrites its dishes every three weeks based on what nearby organic farms harvest. Last night’s roasted squash soup paired with sourdough bread captured the crisp flavor of early autumn without heavy butter or artificial sauces. Dining there feels less like eating out and more like tasting the region’s changing calendar.',
    translation:
      'Thay vì in một thực đơn cố định quanh năm, căn bếp khu phố này viết lại các món ăn sau mỗi ba tuần dựa trên sản vật thu hoạch từ các nông trại hữu cơ lân cận. Món súp bí đỏ nướng tối qua ăn kèm bánh mì men tự nhiên đã lưu giữ trọn vẹn hương vị dịu mát của đầu thu mà không cần quá nhiều bơ hay sốt công nghiệp. Dùng bữa ở đó không giống đi ăn hàng thông thường mà giống như thưởng thức dòng chảy bốn mùa của cả vùng đất.',
    keyPhrases: [
      { en: 'fixed menu', vi: 'thực đơn cố định' },
      { en: 'organic farms', vi: 'các nông trại hữu cơ' },
      { en: 'artificial sauces', vi: 'các loại sốt công nghiệp nhân tạo' },
    ],
    question: {
      q: 'How often does the restaurant change its menu?',
      options: ['Every single morning', 'Twice a year', 'Every three weeks'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-97',
    level: 'B2',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 97: Hỏi Rõ Phạm Vi Bảo Hành Máy Pha Cà Phê',
    sourceStyle: 'VOA • Smart Consumer',
    transcript:
      'Before investing in this espresso machine, I want to clarify what the two-year warranty actually covers. Standard coverage protects the heating boiler and internal pump against manufacturing defects, though rubber seals worn from daily use count as routine maintenance. Keep your digital invoice saved, because our authorized service center requires proof of purchase before ordering spare parts.',
    translation:
      'Trước khi đầu tư vào chiếc máy pha cà phê espresso này, tôi muốn làm rõ gói bảo hành hai năm thực sự bao gồm những gì. Bảo hành tiêu chuẩn bảo vệ bộ đun nhiệt và bơm bên trong khỏi lỗi sản xuất, dù các gioăng cao su bị mòn do sử dụng hàng ngày được tính vào bảo trì định kỳ. Hãy lưu giữ hóa đơn điện tử cẩn thận, vì trung tâm bảo hành ủy quyền của chúng tôi yêu cầu bằng chứng mua hàng trước khi đặt linh kiện thay thế.',
    keyPhrases: [
      { en: 'manufacturing defects', vi: 'lỗi từ nhà sản xuất' },
      { en: 'routine maintenance', vi: 'bảo trì định kỳ' },
      { en: 'proof of purchase', vi: 'chứng từ xác nhận mua hàng' },
    ],
    question: {
      q: 'Which part is NOT covered as a manufacturing defect?',
      options: ['The heating boiler', 'The internal pump', 'Rubber seals worn from daily use'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-98',
    level: 'B2',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 98: Xu Hướng Mua Sắm Thời Trang Bền Vững & Tái Chế',
    sourceStyle: 'British Council • Consumer Trends',
    transcript:
      'Younger consumers are increasingly turning away from cheap fast fashion that shrinks or tears after just three washes. Many shoppers now browse curated secondhand stores or save up for timeless garments stitched from durable natural fabrics like linen and wool. By treating clothing as a long-term investment rather than disposable decor, buyers shrink both their household clutter and textile waste.',
    translation:
      'Người tiêu dùng trẻ đang ngày càng quay lưng với thời trang nhanh giá rẻ vốn dễ co rút hoặc rách chỉ sau ba lần giặt. Nhiều người mua sắm hiện nay thích dạo các cửa hàng đồ cũ tuyển chọn hoặc tiết kiệm để mua những trang phục vượt thời gian may từ vải tự nhiên bền chắc như lanh và len. Khi xem quần áo là khoản đầu tư dài hạn thay vì món đồ trang trí dùng vài lần, người mua giảm được cả sự bừa bộn trong nhà lẫn rác thải dệt may.',
    keyPhrases: [
      { en: 'fast fashion', vi: 'thời trang nhanh' },
      { en: 'timeless garments', vi: 'trang phục không lỗi mốt' },
      { en: 'textile waste', vi: 'rác thải dệt may' },
    ],
    question: {
      q: 'Why are shoppers avoiding cheap fast fashion?',
      options: ['It shrinks or tears after only a few washes', 'It is only sold in winter', 'Natural fabrics are illegal in malls'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-99',
    level: 'B2',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 99: Phản Hồi Chi Tiết Về Dịch Vụ Tiệc Công Ty',
    sourceStyle: 'BBC • Business Dining',
    transcript:
      'Thank you for organizing the buffet for our annual team retreat last Thursday. Overall, the hot dishes and vegetarian spring rolls received glowing praise from everyone at the table. However, labeling allergens more prominently and setting up a second beverage station would prevent long queues during the break. We would gladly hire your catering crew again once those two details are refined.',
    translation:
      'Cảm ơn bên bạn đã chuẩn bị tiệc tự chọn cho buổi nghỉ dưỡng thường niên của nhóm chúng tôi thứ Năm tuần trước. Nhìn chung, các món nóng và nem cuốn chay nhận được rất nhiều lời khen ngợi từ mọi người dự tiệc. Tuy nhiên, việc dán nhãn chất gây dị ứng nổi bật hơn và bố trí thêm một quầy đồ uống thứ hai sẽ giúp tránh tình trạng xếp hàng dài trong giờ nghỉ. Chúng tôi rất sẵn lòng thuê lại đội ngũ ẩm thực của bạn khi hai chi tiết này được cải thiện.',
    keyPhrases: [
      { en: 'glowing praise', vi: 'lời khen ngợi nồng nhiệt' },
      { en: 'labeling allergens', vi: 'ghi nhãn thành phần dễ gây dị ứng' },
      { en: 'prevent long queues', vi: 'tránh cảnh xếp hàng dài' },
    ],
    question: {
      q: 'What two improvements does the client suggest for future events?',
      options: ['Cheaper plates and louder music', 'Clearer allergen labels and a second drink station', 'Shorter breaks and fewer vegetarian dishes'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-100',
    level: 'B2',
    category: 'Ẩm thực & Mua sắm',
    title: 'Bài 100: Khác Biệt Văn Hóa Ẩm Thực Đường Phố & Âu Mỹ',
    sourceStyle: 'VOA • Culture & Cuisine',
    transcript:
      'Sitting on low plastic stools beside a sizzling noodle cart offers a vibrant immediacy you rarely find inside formal dining rooms. You watch raw ingredients transform over open flames within seconds and chat casually with strangers elbow to elbow. Conversely, traditional European dinners treat the meal as a slow three-hour ritual designed for unhurried conversation, showing that hospitality takes radically different yet equally rich forms.',
    translation:
      'Ngồi trên những chiếc ghế nhựa thấp bên cạnh xe mì xèo xèo mang lại cảm giác sống động gần gũi mà bạn hiếm thấy trong các phòng ăn sang trọng. Bạn được ngắm nguyên liệu tươi biến hóa trên ngọn lửa rực chỉ trong vài giây và trò chuyện thân tình với những người xa lạ ngồi sát vai. Ngược lại, bữa tối truyền thống ở châu Âu xem bữa ăn như nghi thức thư thái kéo dài ba tiếng dành cho những cuộc trò chuyện thong thả, cho thấy lòng hiếu khách mang những hình thái rất khác biệt nhưng đều giàu bản sắc.',
    keyPhrases: [
      { en: 'vibrant immediacy', vi: 'sự sống động gần gũi tức thì' },
      { en: 'elbow to elbow', vi: 'ngồi sát vai nhau' },
      { en: 'unhurried conversation', vi: 'cuộc trò chuyện thong thả' },
    ],
    question: {
      q: 'What main contrast does the passage highlight?',
      options: ['Fast street food energy versus slow multi-hour European dining', 'Spicy Asian sauces versus sweet European desserts', 'Cash payments versus digital apps'],
      correctIdx: 0,
    },
  },

  // =========================================================================
  // 4. VĂN PHÒNG & EMAIL (lr-101 .. lr-120)
  // =========================================================================
  {
    id: 'lr-101',
    level: 'A1',
    category: 'Văn phòng & Email',
    title: 'Bài 101: Hỏi Nơi Lấy Giấy In & Mã Máy Photocopier',
    sourceStyle: 'VOA • Workplace English',
    transcript:
      'Excuse me, where can I find white paper for the office printer? Look inside the tall gray cabinet next to the water cooler. Also, what is the code to use the copier? You just type one two three four and press the green start button.',
    translation:
      'Xin lỗi, mình có thể tìm giấy trắng cho máy in văn phòng ở đâu nhỉ? Bạn nhìn bên trong chiếc tủ màu xám cao cạnh cây nước uống ấy. Ngoài ra, mã để dùng máy photocopy là gì vậy? Bạn chỉ cần nhập một hai ba bốn rồi nhấn nút bắt đầu màu xanh lá thôi.',
    keyPhrases: [
      { en: 'office printer', vi: 'máy in văn phòng' },
      { en: 'tall gray cabinet', vi: 'chiếc tủ cao màu xám' },
      { en: 'green start button', vi: 'nút bắt đầu màu xanh lá' },
    ],
    question: {
      q: 'Where is the white printer paper stored?',
      options: ['Under the reception desk', 'Inside the tall gray cabinet', 'Behind the meeting room door'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-102',
    level: 'A1',
    category: 'Văn phòng & Email',
    title: 'Bài 102: Xin Phép Nghỉ Ốm Một Ngày Qua Tin Nhắn',
    sourceStyle: 'British Council • Workplace Basics',
    transcript:
      'Good morning, Manager Hoa. I woke up with a high fever and a bad cough today, so I need to take a sick day off. I already finished the weekly slide deck last night and saved it in our shared drive. I will check my messages if anything urgent comes up.',
    translation:
      'Chào buổi sáng chị Hoa ạ. Sáng nay em thức dậy bị sốt cao và ho nặng nên em xin phép nghỉ ốm một ngày. Tối qua em đã hoàn thành xong bộ slide hàng tuần và lưu trong ổ đĩa dùng chung của nhóm rồi ạ. Em sẽ kiểm tra tin nhắn nếu có việc gì gấp phát sinh.',
    keyPhrases: [
      { en: 'take a sick day off', vi: 'xin nghỉ ốm một ngày' },
      { en: 'shared drive', vi: 'ổ đĩa lưu trữ dùng chung' },
      { en: 'anything urgent', vi: 'bất kỳ việc gì khẩn cấp' },
    ],
    question: {
      q: 'What did the employee already complete last night?',
      options: ['The weekly slide deck', 'The monthly tax report', 'The client lunch booking'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-103',
    level: 'A1',
    category: 'Văn phòng & Email',
    title: 'Bài 103: Xác Nhận Giờ Họp Nhóm Sáng Thứ Hai',
    sourceStyle: 'BBC • English at Work',
    transcript:
      'Hi Tom, is our Monday team meeting still at nine AM? Yes, we start at nine sharp in Meeting Room B on the third floor. Please bring your notebook and the updated sales list. Got it, see you upstairs in ten minutes!',
    translation:
      'Chào Tom, cuộc họp nhóm sáng thứ Hai của mình vẫn diễn ra lúc chín giờ sáng chứ? Đúng rồi, chúng ta bắt đầu đúng chín giờ tại Phòng họp B trên tầng ba. Nhớ mang theo sổ tay và danh sách bán hàng mới cập nhật nhé. Rõ rồi, hẹn gặp bạn trên tầng sau mười phút nữa!',
    keyPhrases: [
      { en: 'at nine sharp', vi: 'đúng chín giờ' },
      { en: 'third floor', vi: 'tầng ba' },
      { en: 'updated sales list', vi: 'danh sách bán hàng đã cập nhật' },
    ],
    question: {
      q: 'Where will the Monday meeting take place?',
      options: ['In the ground floor cafe', 'Online via video call', 'In Meeting Room B on the third floor'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-104',
    level: 'A1',
    category: 'Văn phòng & Email',
    title: 'Bài 104: Hướng Dẫn Đồng Nghiệp Mới Khu Vực Bếp Văn Phòng',
    sourceStyle: 'VOA • Workplace English',
    transcript:
      'Welcome to your first day at Bright Media, Mai! Let me show you our office kitchen and break room down this hall. Free coffee, tea bags, and cold water are always available for every staff member. You can also store your lunchbox inside the refrigerator labeled with your name.',
    translation:
      'Chào mừng ngày đầu tiên làm việc tại Bright Media nhé, Mai! Để mình dẫn bạn đi xem khu bếp văn phòng và phòng nghỉ giải lao cuối hành lang này. Cà phê miễn phí, trà túi lọc và nước mát luôn có sẵn cho mọi nhân viên. Bạn cũng có thể cất hộp cơm trưa vào tủ lạnh và dán tên mình lên nhé.',
    keyPhrases: [
      { en: 'break room', vi: 'phòng nghỉ giải lao' },
      { en: 'staff member', vi: 'nhân viên trong công ty' },
      { en: 'store your lunchbox', vi: 'cất hộp cơm trưa của bạn' },
    ],
    question: {
      q: 'What should Mai put on her lunchbox before putting it in the fridge?',
      options: ['Her phone number', 'Her name label', 'The current time'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-105',
    level: 'A1',
    category: 'Văn phòng & Email',
    title: 'Bài 105: Ghi Lời Nhắn Khi Đồng Nghiệp Ra Ngoài',
    sourceStyle: 'British Council • Real-Life Dialogue',
    transcript:
      'Good morning, Marketing Department. May I speak with David Tran, please? I am sorry, David stepped out for lunch and will be back around one PM. Can I take a message for him? Yes, please tell him that Linda from Alpha Design called about Friday’s brochure.',
    translation:
      'Chào buổi sáng, Phòng Marketing xin nghe. Cho tôi gặp anh David Tran được không ạ? Xin lỗi, anh David vừa ra ngoài ăn trưa và sẽ quay lại khoảng một giờ chiều. Tôi có thể ghi lại lời nhắn giúp anh ấy không? Vâng, nhờ bạn nhắn với anh ấy là Linda từ Alpha Design đã gọi về tờ rơi cho ngày thứ Sáu nhé.',
    keyPhrases: [
      { en: 'stepped out for lunch', vi: 'ra ngoài ăn trưa' },
      { en: 'take a message', vi: 'ghi lại lời nhắn' },
      { en: 'be back around', vi: 'sẽ quay lại vào khoảng' },
    ],
    question: {
      q: 'Who called David while he was at lunch?',
      options: ['Linda from Alpha Design', 'Tom from Accounting', 'His brother from London'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-106',
    level: 'A2',
    category: 'Văn phòng & Email',
    title: 'Bài 106: Đọc Email Đính Kèm Báo Cáo Bán Hàng Tuần',
    sourceStyle: 'VOA • Business Email Reading',
    transcript:
      'Dear Kevin, please find attached the weekly sales spreadsheet covering orders from Monday through Friday. Overall revenue rose by twelve percent compared to last week, mostly thanks to our spring promo campaign. Take a quick look at page two before tomorrow’s morning briefing and let me know if any numbers need updates.',
    translation:
      'Chào Kevin, anh vui lòng xem bảng tính doanh số hàng tuần đính kèm bao gồm các đơn hàng từ thứ Hai đến thứ Sáu. Tổng doanh thu tăng mười hai phần trăm so với tuần trước, phần lớn nhờ chiến dịch khuyến mãi mùa xuân của chúng ta. Anh xem qua trang hai trước buổi họp giao ban sáng mai và cho em biết nếu có số liệu nào cần cập nhật nhé.',
    keyPhrases: [
      { en: 'please find attached', vi: 'vui lòng xem tệp đính kèm' },
      { en: 'rose by twelve percent', vi: 'tăng thêm mười hai phần trăm' },
      { en: 'morning briefing', vi: 'buổi họp ngắn đầu giờ sáng' },
    ],
    question: {
      q: 'What helped boost weekly revenue by twelve percent?',
      options: ['Cutting staff salaries', 'Opening a new factory', 'The spring promo campaign'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-107',
    level: 'A2',
    category: 'Văn phòng & Email',
    title: 'Bài 107: Gọi Điện Xin Dời Lịch Hẹn Sang Chiều Thứ Năm',
    sourceStyle: 'BBC • English at Work',
    transcript:
      'Hello Sarah, this is Ken from Green Tech calling about our Wednesday afternoon review meeting. An urgent supplier visit came up, so could we push our meeting to Thursday at two thirty PM instead? Let me check my calendar for Thursday afternoon. Yes, two thirty works fine for me, and I will send a new calendar invite shortly.',
    translation:
      'Chào Sarah, mình là Ken từ Green Tech gọi về buổi họp rà soát chiều thứ Tư của chúng ta. Vừa có chuyến thăm đột xuất của nhà cung cấp, vậy chúng ta có thể dời cuộc họp sang hai giờ ba mươi chiều thứ Năm được không? Để mình xem lịch chiều thứ Năm nhé. Được đấy, hai giờ ba mươi ổn với mình, mình sẽ sớm gửi thư mời lịch mới ngay.',
    keyPhrases: [
      { en: 'urgent supplier visit', vi: 'chuyến thăm đột xuất của nhà cung cấp' },
      { en: 'push our meeting to', vi: 'dời cuộc họp của chúng ta sang' },
      { en: 'calendar invite', vi: 'lời mời trên lịch họp' },
    ],
    question: {
      q: 'Why does Ken ask to reschedule Wednesday’s meeting?',
      options: ['His laptop stopped working', 'An urgent supplier visit came up', 'He is taking a vacation on Wednesday'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-108',
    level: 'A2',
    category: 'Văn phòng & Email',
    title: 'Bài 108: Đặt Phòng Họp & Kiểm Tra Thiết Bị Trình Chiếu',
    sourceStyle: 'British Council • Workplace Listening',
    transcript:
      'I booked the large glass conference room from ten to eleven thirty for our product demo. Before the guests arrive, please test the HDMI cable and confirm that the ceiling projector connects smoothly to your laptop. I also ordered bottled water and pastries from the cafe downstairs for ten attendees.',
    translation:
      'Mình đã đặt phòng họp kính lớn từ mười giờ đến mười một giờ ba mươi cho buổi giới thiệu sản phẩm. Trước khi khách mời tới, bạn kiểm tra giúp dây cáp HDMI và đảm bảo máy chiếu trần kết nối mượt với laptop của bạn nhé. Mình cũng đặt sẵn nước đóng chai và bánh ngọt từ quán cà phê tầng dưới cho mười người tham dự rồi.',
    keyPhrases: [
      { en: 'conference room', vi: 'phòng hội nghị / phòng họp lớn' },
      { en: 'connects smoothly', vi: 'kết nối mượt mà' },
      { en: 'ten attendees', vi: 'mười người tham dự' },
    ],
    question: {
      q: 'What should be tested before the guests arrive?',
      options: ['The HDMI cable and ceiling projector', 'The coffee maker', 'The elevator music'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-109',
    level: 'A2',
    category: 'Văn phòng & Email',
    title: 'Bài 109: Đọc Email Tự Động Khi Nhân Viên Đi Công Tác',
    sourceStyle: 'VOA • Business Email Reading',
    transcript:
      'Thank you for your email. I am currently attending a trade conference in Singapore and will have limited access to email until Monday, May twelfth. For urgent contract approvals, please reach out to my colleague Anna Le at our main office extension. Otherwise, I will reply to every message as soon as I return.',
    translation:
      'Cảm ơn email của bạn. Hiện tại tôi đang tham dự một hội nghị thương mại tại Singapore và sẽ hạn chế truy cập email cho tới hết thứ Hai, ngày mười hai tháng Năm. Với các phê duyệt hợp đồng khẩn cấp, vui lòng liên hệ đồng nghiệp của tôi là Anna Le qua số máy lẻ văn phòng chính. Nếu không gấp, tôi sẽ phản hồi mọi tin nhắn ngay khi trở về.',
    keyPhrases: [
      { en: 'limited access to email', vi: 'hạn chế truy cập email' },
      { en: 'urgent contract approvals', vi: 'phê duyệt hợp đồng khẩn cấp' },
      { en: 'as soon as I return', vi: 'ngay khi tôi quay trở lại' },
    ],
    question: {
      q: 'Who should people contact for urgent contract approvals?',
      options: ['The Singapore hotel desk', 'The trade conference organizer', 'Anna Le at the main office'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-110',
    level: 'A2',
    category: 'Văn phòng & Email',
    title: 'Bài 110: Xin Cấp Lại Thẻ Ra Vào Văn Phòng Bị Hỏng',
    sourceStyle: 'BBC • Workplace Basics',
    transcript:
      'Hi Human Resources desk, my office access badge snapped in half inside my pocket this morning, and the card reader no longer detects it. Please fill out this quick replacement form so we can deactivate the broken chip right away. Your new card will be printed by four PM, and there is no fee for damaged cards.',
    translation:
      'Chào bộ phận Nhân sự, sáng nay thẻ ra vào văn phòng của tôi bị gãy đôi trong túi quần, và đầu đọc thẻ không còn nhận diện được nữa. Bạn vui lòng điền nhanh mẫu xin cấp lại này để chúng tôi vô hiệu hóa con chip bị hỏng ngay nhé. Thẻ mới của bạn sẽ được in xong trước bốn giờ chiều, và không thu phí đối với thẻ bị hư hỏng.',
    keyPhrases: [
      { en: 'office access badge', vi: 'thẻ ra vào văn phòng' },
      { en: 'replacement form', vi: 'biểu mẫu xin cấp lại' },
      { en: 'deactivate the broken chip', vi: 'vô hiệu hóa con chip bị hỏng' },
    ],
    question: {
      q: 'How much does a replacement badge cost when the card is damaged?',
      options: ['Nothing, there is no fee', 'Five dollars', 'Twenty dollars'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-111',
    level: 'B1',
    category: 'Văn phòng & Email',
    title: 'Bài 111: Email Theo Dõi Tiến Độ Sau Buổi Họp Khách Hàng',
    sourceStyle: 'British Council • Workplace Writing',
    transcript:
      'Thank you for taking the time to review our design proposal yesterday afternoon. As promised during our conversation, I have attached the revised timeline along with two optional pricing packages for your team to compare. Should your directors need a brief walkthrough before Friday, I am happy to jump on a fifteen-minute call anytime.',
    translation:
      'Cảm ơn quý anh chị đã dành thời gian xem xét đề xuất thiết kế của chúng tôi chiều hôm qua. Như đã hứa trong cuộc trao đổi, tôi xin đính kèm lộ trình điều chỉnh cùng hai gói báo giá tùy chọn để đội ngũ bên anh chị so sánh. Nếu ban giám đốc cần phần trình bày ngắn trước thứ Sáu, tôi sẵn sàng tham gia cuộc gọi mười lăm phút bất cứ lúc nào.',
    keyPhrases: [
      { en: 'design proposal', vi: 'bản đề xuất thiết kế' },
      { en: 'revised timeline', vi: 'lộ trình đã được điều chỉnh' },
      { en: 'jump on a fifteen-minute call', vi: 'tham gia cuộc gọi nhanh 15 phút' },
    ],
    question: {
      q: 'What did the sender attach to the follow-up email?',
      options: ['A signed employment contract', 'A revised timeline and two pricing packages', 'Invoices from last quarter'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-112',
    level: 'B1',
    category: 'Văn phòng & Email',
    title: 'Bài 112: Xin Gia Hạn Thời Hạn Nộp Dự Án Có Lý Do Rõ Ràng',
    sourceStyle: 'VOA • Workplace English',
    transcript:
      'Hi Director Linh, I am writing to request a two-day extension on the Q3 market report originally due this Wednesday. Because two regional suppliers only submitted their survey figures late yesterday, our data team needs extra time to verify every chart accurately. Moving the deadline to Friday noon will not delay next week’s client briefing.',
    translation:
      'Chào chị Linh, em viết email này để xin gia hạn thêm hai ngày cho báo cáo thị trường quý ba vốn đến hạn vào thứ Tư tuần này. Do hai nhà cung cấp khu vực mới gửi số liệu khảo sát vào cuối ngày hôm qua, nhóm dữ liệu cần thêm thời gian kiểm tra chính xác từng biểu đồ. Việc dời hạn nộp sang trưa thứ Sáu sẽ không làm chậm buổi họp khách hàng tuần tới.',
    keyPhrases: [
      { en: 'request a two-day extension', vi: 'xin gia hạn thêm hai ngày' },
      { en: 'verify every chart', vi: 'kiểm tra xác minh từng biểu đồ' },
      { en: 'will not delay', vi: 'sẽ không làm chậm trễ' },
    ],
    question: {
      q: 'Why does the employee need two extra days?',
      options: ['Two suppliers submitted their figures late', 'The office printer broke down', 'The client canceled the project'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-113',
    level: 'B1',
    category: 'Văn phòng & Email',
    title: 'Bài 113: Điều Phối Lịch Họp Giữa Hai Múi Giờ Khác Nhau',
    sourceStyle: 'BBC • Business Communication',
    transcript:
      'Scheduling a live video sync between our London designers and our Ho Chi Minh City engineers takes careful coordination. Since Vietnam is six hours ahead of the United Kingdom right now, three PM in Hanoi equals nine AM in London. Holding our weekly stand-up at that slot keeps everyone inside normal daytime working hours without requiring late-night calls.',
    translation:
      'Việc sắp xếp một buổi họp video trực tiếp giữa nhóm thiết kế tại Luân Đôn và đội ngũ kỹ sư tại Thành phố Hồ Chí Minh đòi hỏi sự phối hợp khéo léo. Vì Việt Nam hiện đi trước Vương quốc Anh sáu tiếng, ba giờ chiều ở Hà Nội tương ứng với chín giờ sáng tại Luân Đôn. Tổ chức họp giao ban hàng tuần vào khung giờ đó giúp mọi người đều nằm trong giờ làm việc ban ngày bình thường mà không phải gọi đêm muộn.',
    keyPhrases: [
      { en: 'careful coordination', vi: 'sự phối hợp cẩn thận' },
      { en: 'six hours ahead', vi: 'đi trước sáu múi giờ' },
      { en: 'normal daytime working hours', vi: 'giờ làm việc ban ngày thông thường' },
    ],
    question: {
      q: 'What is the main advantage of meeting at 3 PM Hanoi time?',
      options: ['Both teams stay within normal daytime hours', 'London staff get to leave work early', 'Internet speeds are faster at night'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-114',
    level: 'B1',
    category: 'Văn phòng & Email',
    title: 'Bài 114: Báo Cáo Lỗi Trùng Hóa Đơn Với Bộ Phận Kế Toán',
    sourceStyle: 'British Council • Business English',
    transcript:
      'Hello Finance Team, while reviewing our monthly department expenses, I spotted a duplicate charge from CloudHost Solutions for ninety-five dollars. Both entries carry the exact same invoice reference code and payment date of April fourth. Could you please check whether our corporate card was billed twice and request a credit note if needed?',
    translation:
      'Chào Bộ phận Tài chính, trong lúc rà soát chi phí phòng ban hàng tháng, tôi phát hiện một khoản thu bị trùng từ CloudHost Solutions trị giá chín mươi lăm đô la. Cả hai mục đều mang cùng mã tham chiếu hóa đơn và ngày thanh toán là mùng bốn tháng Tư. Nhờ anh chị kiểm tra giúp xem thẻ doanh nghiệp có bị trừ tiền hai lần không và yêu cầu phiếu ghi có hoàn tiền nếu cần nhé?',
    keyPhrases: [
      { en: 'duplicate charge', vi: 'khoản tính phí bị trùng' },
      { en: 'invoice reference code', vi: 'mã tham chiếu hóa đơn' },
      { en: 'credit note', vi: 'phiếu ghi có hoàn tiền' },
    ],
    question: {
      q: 'What made the speaker suspect a duplicate charge?',
      options: ['The company stopped using CloudHost last year', 'The amount was nine hundred dollars', 'Both entries share the same invoice code and date'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-115',
    level: 'B1',
    category: 'Văn phòng & Email',
    title: 'Bài 115: Tóm Tắt Quyết Định Chính Trong Biên Bản Cuộc Họp',
    sourceStyle: 'VOA • Workplace English',
    transcript:
      'Thanks everyone for joining this morning’s product launch sync. To recap our key decisions, we agreed to delay the public webinar by one week so the tutorial videos can include English subtitles. Tuan will upload the revised brochure by tomorrow evening, while Maya confirms the guest speaker list by Thursday morning.',
    translation:
      'Cảm ơn mọi người đã tham gia buổi họp đồng bộ ra mắt sản phẩm sáng nay. Để tóm tắt các quyết định chính, chúng ta thống nhất lùi hội thảo trực tuyến công khai lại một tuần để các video hướng dẫn có thêm phụ đề tiếng Anh. Tuấn sẽ tải tờ rơi bản chỉnh sửa lên trước tối mai, còn Maya chốt danh sách diễn giả khách mời trước sáng thứ Năm.',
    keyPhrases: [
      { en: 'recap our key decisions', vi: 'tóm tắt các quyết định chính' },
      { en: 'English subtitles', vi: 'phụ đề tiếng Anh' },
      { en: 'guest speaker list', vi: 'danh sách diễn giả khách mời' },
    ],
    question: {
      q: 'Why did the team postpone the public webinar by one week?',
      options: ['To add English subtitles to tutorial videos', 'The guest speaker fell ill', 'Because the meeting room was unavailable'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-116',
    level: 'B2',
    category: 'Văn phòng & Email',
    title: 'Bài 116: Từ Chối Khéo Yêu Cầu Phát Sinh Ngoài Phạm Vi',
    sourceStyle: 'British Council • Executive Communication',
    transcript:
      'We truly appreciate your enthusiasm for expanding the mobile app with an automated loyalty points tracker. However, our current signed agreement covers only the core checkout redesign scheduled for release on June thirtieth. Adding a full loyalty engine mid-sprint would jeopardize our launch quality, so we recommend scoping it into a dedicated phase two proposal starting in July.',
    translation:
      'Chúng tôi thực sự trân trọng sự hào hứng của quý vị khi muốn mở rộng ứng dụng di động với tính năng tích điểm khách hàng thân thiết tự động. Tuy nhiên, hợp đồng hiện tại đã ký chỉ bao gồm phần thiết kế lại luồng thanh toán cốt lõi dự kiến phát hành vào ngày ba mươi tháng Sáu. Việc chèn thêm cả hệ thống tích điểm giữa chu kỳ phát triển sẽ ảnh hưởng tới chất lượng ngày ra mắt, nên chúng tôi đề xuất đưa tính năng này vào bản đề xuất giai đoạn hai riêng biệt bắt đầu từ tháng Bảy.',
    keyPhrases: [
      { en: 'signed agreement', vi: 'hợp đồng đã ký kết' },
      { en: 'jeopardize our launch quality', vi: 'gây rủi ro cho chất lượng ra mắt' },
      { en: 'dedicated phase two proposal', vi: 'đề xuất giai đoạn hai riêng biệt' },
    ],
    question: {
      q: 'What alternative does the writer propose for the loyalty tracker?',
      options: ['Canceling the checkout redesign', 'Putting it into a phase two proposal starting in July', 'Hiring outside interns to build it in two days'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-117',
    level: 'B2',
    category: 'Văn phòng & Email',
    title: 'Bài 117: Soạn Email Xin Lỗi Khách Hàng Doanh Nghiệp Vì Giao Trễ',
    sourceStyle: 'BBC • Client Relations',
    transcript:
      'Dear Partner, please accept our sincere apologies for the three-day delay affecting your wholesale packaging shipment. An unexpected customs inspection held up our container at the port despite all paperwork being submitted early. To minimize disruption to your retail launch, we have upgraded the remaining batch to air freight at our expense and applied a ten percent credit to your invoice.',
    translation:
      'Kính gửi Quý Đối tác, xin vui lòng chấp nhận lời xin lỗi chân thành từ chúng tôi vì sự chậm trễ ba ngày ảnh hưởng tới lô hàng bao bì bán sỉ của quý vị. Một đợt kiểm tra hải quan đột xuất đã giữ container của chúng tôi tại cảng dù toàn bộ hồ sơ đã được nộp sớm. Nhằm giảm thiểu gián đoạn cho đợt ra mắt bán lẻ của quý vị, chúng tôi đã nâng cấp lô còn lại sang vận chuyển hàng không bằng chi phí của mình và khấu trừ mười phần trăm trên hóa đơn.',
    keyPhrases: [
      { en: 'sincere apologies', vi: 'lời xin lỗi chân thành' },
      { en: 'minimize disruption', vi: 'giảm thiểu sự gián đoạn' },
      { en: 'at our expense', vi: 'bằng chi phí của chúng tôi' },
    ],
    question: {
      q: 'How is the supplier compensating for the customs delay?',
      options: ['By postponing all invoices until next year', 'By canceling the wholesale contract', 'By shipping the rest via air freight and giving a ten percent credit'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-118',
    level: 'B2',
    category: 'Văn phòng & Email',
    title: 'Bài 118: Đề Xuất Chính Sách Làm Việc Kết Hợp Linh Hoạt',
    sourceStyle: 'VOA • Modern Workplace',
    transcript:
      'To preserve both deep individual focus and spontaneous team creativity, our new hybrid policy designates Tuesdays and Thursdays as shared office days. Employees may work remotely on Mondays, Wednesdays, and Fridays, provided they stay reachable during core collaboration hours between ten AM and three PM. Early feedback suggests fewer unnecessary status meetings and markedly higher afternoon productivity across departments.',
    translation:
      'Nhằm giữ vững cả sự tập trung cá nhân sâu lẫn tính sáng tạo ngẫu hứng của tập thể, chính sách làm việc kết hợp mới của chúng ta chọn thứ Ba và thứ Năm là hai ngày làm việc chung tại văn phòng. Nhân viên có thể làm việc từ xa vào thứ Hai, thứ Tư và thứ Sáu, miễn là luôn sẵn sàng liên lạc trong khung giờ phối hợp cốt lõi từ mười giờ sáng đến ba giờ chiều. Phản hồi ban đầu cho thấy số cuộc họp báo cáo không cần thiết đã giảm và năng suất buổi chiều tăng rõ rệt ở các phòng ban.',
    keyPhrases: [
      { en: 'hybrid policy', vi: 'chính sách làm việc kết hợp' },
      { en: 'core collaboration hours', vi: 'khung giờ phối hợp cốt lõi' },
      { en: 'higher afternoon productivity', vi: 'năng suất buổi chiều cao hơn' },
    ],
    question: {
      q: 'Which days are designated as shared office days?',
      options: ['Mondays and Fridays', 'Tuesdays and Thursdays', 'Wednesdays and Saturdays'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-119',
    level: 'B2',
    category: 'Văn phòng & Email',
    title: 'Bài 119: Báo Cáo Số Liệu Tăng Trưởng Quý Trước Ban Giám Đốc',
    sourceStyle: 'BBC • Executive Briefing',
    transcript:
      'Good morning, board members. Although new customer acquisition slowed slightly in January, our overall quarterly revenue grew eighteen percent year over year thanks to stronger subscription renewals. Even more encouragingly, customer support response times fell below twelve minutes after we streamlined our onboarding guide. Investing further in retention clearly delivers higher margins than chasing short-term ad clicks.',
    translation:
      'Chào buổi sáng các thành viên hội đồng quản trị. Mặc dù lượng khách hàng mới chững lại nhẹ trong tháng Giêng, tổng doanh thu hàng quý của chúng ta vẫn tăng mười tám phần trăm so với cùng kỳ năm ngoái nhờ tỷ lệ gia hạn gói dịch vụ cao hơn. Đáng khích lệ hơn nữa, thời gian phản hồi của bộ phận hỗ trợ đã giảm xuống dưới mười hai phút sau khi chúng ta tinh gọn tài liệu hướng dẫn người dùng mới. Rõ ràng việc đầu tư sâu vào giữ chân khách hàng mang lại biên lợi nhuận cao hơn so với việc chạy theo lượt nhấp quảng cáo ngắn hạn.',
    keyPhrases: [
      { en: 'year over year', vi: 'so với cùng kỳ năm trước' },
      { en: 'subscription renewals', vi: 'gia hạn gói thuê bao' },
      { en: 'higher margins', vi: 'biên lợi nhuận cao hơn' },
    ],
    question: {
      q: 'What drove the eighteen percent quarterly revenue growth?',
      options: ['Aggressive short-term ad clicks', 'Raising prices by fifty percent', 'Stronger subscription renewals'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-120',
    level: 'B2',
    category: 'Văn phòng & Email',
    title: 'Bài 120: Điều Hòa Xung Đột Ưu Tiên Giữa Hai Phòng Ban',
    sourceStyle: 'British Council • Leadership Skills',
    transcript:
      'When Marketing demanded an urgent homepage banner while Engineering prioritized security patches, both teams felt unheard and deadlines slipped. Rather than picking sides, our operations lead facilitated a joint thirty-minute triage session where every task was scored by customer impact and technical risk. Once both managers viewed the same shared roadmap, compromises emerged naturally without lingering resentment.',
    translation:
      'Khi bộ phận Marketing yêu cầu làm gấp biểu ngữ trang chủ còn bộ phận Kỹ thuật lại ưu tiên các bản vá bảo mật, cả hai đội đều cảm thấy không được lắng nghe và tiến độ bị trượt. Thay vì đứng về một phía, trưởng phòng vận hành đã điều phối một buổi phân loại ưu tiên chung kéo dài ba mươi phút, nơi mọi đầu việc được chấm điểm theo mức độ tác động tới khách hàng và rủi ro kỹ thuật. Khi hai trưởng nhóm cùng nhìn vào một lộ trình chung, các thỏa hiệp đã hình thành tự nhiên mà không để lại sự ấm ức.',
    keyPhrases: [
      { en: 'picking sides', vi: 'chọn phe / thiên vị một bên' },
      { en: 'customer impact', vi: 'tác động tới khách hàng' },
      { en: 'shared roadmap', vi: 'lộ trình chung thống nhất' },
    ],
    question: {
      q: 'How did the operations lead resolve the disagreement between teams?',
      options: ['By postponing all engineering patches', 'By facilitating a joint session scoring customer impact and risk', 'By letting Marketing design the security patch'],
      correctIdx: 1,
    },
  },

  // =========================================================================
  // 5. IT / KỸ THUẬT (lr-121 .. lr-140)
  // =========================================================================
  {
    id: 'lr-121',
    level: 'A1',
    category: 'IT / Kỹ thuật',
    title: 'Bài 121: Kết Nối Laptop Với Mạng Wi-Fi Văn Phòng',
    sourceStyle: 'VOA • Tech Basics',
    transcript:
      'Excuse me, how do I connect my new laptop to the office Wi-Fi? Click the wireless icon at the bottom right corner of your screen. Then choose the network named DevTeam Secure and enter your employee email password. Great, I see the connected symbol right now!',
    translation:
      'Xin lỗi, làm thế nào để mình kết nối laptop mới vào mạng Wi-Fi văn phòng vậy? Bạn nhấp vào biểu tượng mạng không dây ở góc dưới bên phải màn hình nhé. Sau đó chọn mạng tên DevTeam Secure và nhập mật khẩu email nhân viên của bạn. Tuyệt vời, mình thấy biểu tượng đã kết nối ngay rồi!',
    keyPhrases: [
      { en: 'wireless icon', vi: 'biểu tượng mạng không dây' },
      { en: 'bottom right corner', vi: 'góc dưới bên phải' },
      { en: 'employee email password', vi: 'mật khẩu email nhân viên' },
    ],
    question: {
      q: 'Which network name should the employee choose?',
      options: ['Guest Open', 'DevTeam Secure', 'Office Printer'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-122',
    level: 'A1',
    category: 'IT / Kỹ thuật',
    title: 'Bài 122: Nhờ Hỗ Trợ Đặt Lại Mật Khẩu Tài Khoản Công Ty',
    sourceStyle: 'British Council • IT Helpdesk',
    transcript:
      'Hello IT support, I forgot my work account password after the weekend holiday. No worries, I can send a reset link to your backup phone number right away. Please create a strong new password with at least ten letters and numbers. Thank you, I am back inside my inbox now.',
    translation:
      'Chào bộ phận hỗ trợ IT, mình quên mật khẩu tài khoản công việc sau kỳ nghỉ cuối tuần rồi. Đừng lo, mình có thể gửi liên kết đặt lại vào số điện thoại dự phòng của bạn ngay lập tức. Hãy tạo mật khẩu mới đủ mạnh với ít nhất mười chữ cái và chữ số nhé. Cảm ơn bạn, mình đã vào lại được hộp thư rồi.',
    keyPhrases: [
      { en: 'reset link', vi: 'liên kết đặt lại mật khẩu' },
      { en: 'backup phone number', vi: 'số điện thoại dự phòng' },
      { en: 'strong new password', vi: 'mật khẩu mới đủ mạnh' },
    ],
    question: {
      q: 'Where does IT support send the password reset link?',
      options: ['To the user’s backup phone number', 'To a colleague’s desk', 'To the home postal address'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-123',
    level: 'A1',
    category: 'IT / Kỹ thuật',
    title: 'Bài 123: Khởi Động Lại Máy Tính Khi Màn Hình Bị Đơ',
    sourceStyle: 'BBC • Digital Literacy',
    transcript:
      'Help, my computer screen suddenly froze and the mouse arrow will not move at all! First, wait thirty seconds to see if the program responds again. If nothing changes, hold down the power button for five seconds until the laptop turns off completely. Wait a moment, then press the power button once to restart.',
    translation:
      'Cứu với, màn hình máy tính của mình bỗng nhiên bị đứng và mũi tên chuột không di chuyển được chút nào! Đầu tiên, hãy chờ ba mươi giây xem chương trình có phản hồi lại không. Nếu không có gì thay đổi, hãy nhấn giữ nút nguồn trong năm giây cho đến khi laptop tắt hẳn. Chờ một lát rồi bấm nút nguồn một lần để khởi động lại.',
    keyPhrases: [
      { en: 'suddenly froze', vi: 'bỗng nhiên bị đơ / đứng máy' },
      { en: 'hold down the power button', vi: 'nhấn giữ nút nguồn' },
      { en: 'turns off completely', vi: 'tắt nguồn hoàn toàn' },
    ],
    question: {
      q: 'How long should the user hold the power button if the screen stays frozen?',
      options: ['One second', 'Thirty seconds', 'Five seconds'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-124',
    level: 'A1',
    category: 'IT / Kỹ thuật',
    title: 'Bài 124: Cài Đặt Ứng Dụng Chat Nhóm Trên Điện Thoại',
    sourceStyle: 'VOA • Tech Basics',
    transcript:
      'Did you install our team chat app on your work phone yet? Not yet, where can I download it safely? Open the official app store, search for WorkChat, and tap the blue install button. After signing in, remember to allow push notifications so you never miss urgent team alerts.',
    translation:
      'Bạn đã cài ứng dụng trò chuyện nhóm của chúng ta lên điện thoại công việc chưa? Chưa nữa, mình có thể tải nó an toàn ở đâu vậy? Hãy mở kho ứng dụng chính thức, tìm kiếm WorkChat và chạm vào nút cài đặt màu xanh dương. Sau khi đăng nhập, nhớ bật cho phép thông báo đẩy để không bao giờ bỏ lỡ cảnh báo khẩn từ nhóm nhé.',
    keyPhrases: [
      { en: 'official app store', vi: 'kho ứng dụng chính thức' },
      { en: 'after signing in', vi: 'sau khi đăng nhập' },
      { en: 'push notifications', vi: 'thông báo đẩy trên màn hình' },
    ],
    question: {
      q: 'Why should the user allow push notifications?',
      options: ['To save phone battery', 'To avoid missing urgent team alerts', 'To make the screen brighter'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-125',
    level: 'A1',
    category: 'IT / Kỹ thuật',
    title: 'Bài 125: Sao Lưu Tệp Quan Trọng Lên Đám Mây',
    sourceStyle: 'British Council • Digital Skills',
    transcript:
      'Before you travel with your laptop, always back up your important project files to the cloud folder. Saving files only on your desktop is risky if your hard drive breaks or your bag gets lost. Simply drag your weekly reports into the synced drive folder, and the green check mark shows everything is safely backed up.',
    translation:
      'Trước khi mang laptop đi công tác, hãy luôn sao lưu các tệp dự án quan trọng của bạn lên thư mục đám mây. Chỉ lưu tệp trên màn hình chính rất rủi ro nếu ổ cứng hỏng hoặc túi xách bị thất lạc. Chỉ cần kéo các báo cáo hàng tuần vào thư mục ổ đĩa đồng bộ, và dấu tích màu xanh lá sẽ báo hiệu mọi thứ đã được sao lưu an toàn.',
    keyPhrases: [
      { en: 'back up your important project files', vi: 'sao lưu các tệp dự án quan trọng' },
      { en: 'cloud folder', vi: 'thư mục lưu trữ đám mây' },
      { en: 'green check mark', vi: 'dấu tích màu xanh lá' },
    ],
    question: {
      q: 'What tells the user that files are safely backed up?',
      options: ['A green check mark', 'A loud alarm sound', 'A red warning box'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-126',
    level: 'A2',
    category: 'IT / Kỹ thuật',
    title: 'Bài 126: Xử Lý Máy In Mạng Không Nhận Lệnh In',
    sourceStyle: 'VOA • Tech & Support',
    transcript:
      'Hi tech support, I clicked print five times, yet nothing is coming out of the third-floor printer. Let me inspect the printer queue from my computer. Look, a torn sheet of thick paper jammed inside tray two and paused everyone’s print jobs. I am clearing the paper jam now, and your document should print within ten seconds.',
    translation:
      'Chào bộ phận hỗ trợ kỹ thuật, mình bấm in năm lần rồi mà chẳng thấy tờ nào chạy ra từ máy in tầng ba cả. Để mình kiểm tra hàng đợi lệnh in từ máy tính của mình xem. Nhìn này, một tờ giấy dày bị rách kẹt trong khay số hai và làm tạm dừng toàn bộ lệnh in của mọi người. Mình đang gỡ kẹt giấy ngay đây, tài liệu của bạn sẽ in ra trong vòng mười giây nữa.',
    keyPhrases: [
      { en: 'printer queue', vi: 'hàng đợi lệnh in' },
      { en: 'print jobs', vi: 'các lệnh in đang chờ' },
      { en: 'paper jam', vi: 'tình trạng kẹt giấy' },
    ],
    question: {
      q: 'What caused the third-floor printer to stop printing?',
      options: ['The office Wi-Fi router restarted', 'The printer ran out of black ink', 'A torn piece of thick paper jammed in tray two'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-127',
    level: 'A2',
    category: 'IT / Kỹ thuật',
    title: 'Bài 127: Giải Phóng Dung Lượng Ổ Cứng Đang Bị Đầy',
    sourceStyle: 'BBC • Tech Tips',
    transcript:
      'My laptop keeps popping up a warning saying my local disk is almost full. Have you checked your downloads folder and trash bin recently? Old software installers and long meeting recordings often eat up dozens of gigabytes silently. Removing duplicate videos and emptying the recycle bin immediately freed forty gigabytes on my machine yesterday.',
    translation:
      'Laptop của mình cứ hiện thông báo cảnh báo ổ đĩa cục bộ sắp đầy. Gần đây bạn đã kiểm tra thư mục tải xuống và thùng rác chưa? Các bộ cài phần mềm cũ và video ghi hình cuộc họp dài thường âm thầm chiếm hàng chục gigabyte đấy. Hôm qua mình xóa bớt video trùng lặp và dọn sạch thùng rác là giải phóng ngay được bốn mươi gigabyte trên máy.',
    keyPhrases: [
      { en: 'local disk is almost full', vi: 'ổ đĩa cục bộ sắp đầy' },
      { en: 'eat up dozens of gigabytes', vi: 'ngốn hàng chục gigabyte dung lượng' },
      { en: 'emptying the recycle bin', vi: 'dọn sạch thùng rác máy tính' },
    ],
    question: {
      q: 'How much disk space did the speaker free up yesterday?',
      options: ['Four gigabytes', 'Fourteen gigabytes', 'Forty gigabytes'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-128',
    level: 'A2',
    category: 'IT / Kỹ thuật',
    title: 'Bài 128: Bật Xác Thực Hai Yếu Tố Cho Email Công Việc',
    sourceStyle: 'British Council • Cybersecurity Basics',
    transcript:
      'Starting next Monday, every employee must turn on two-factor authentication for their company email account. Even if a hacker steals your password, they still cannot log in without the six-digit code on your smartphone. Simply scan the setup QR code inside your security settings using an authenticator app, and save your backup recovery codes in a safe spot.',
    translation:
      'Bắt đầu từ thứ Hai tuần tới, mọi nhân viên phải bật xác thực hai yếu tố cho tài khoản email công ty. Ngay cả khi tin tặc đánh cắp được mật khẩu của bạn, chúng vẫn không thể đăng nhập nếu thiếu mã sáu chữ số trên điện thoại thông minh của bạn. Chỉ cần quét mã QR thiết lập trong phần cài đặt bảo mật bằng ứng dụng xác thực, và lưu các mã khôi phục dự phòng ở nơi an toàn.',
    keyPhrases: [
      { en: 'two-factor authentication', vi: 'xác thực hai yếu tố' },
      { en: 'six-digit code', vi: 'mã xác nhận sáu chữ số' },
      { en: 'backup recovery codes', vi: 'các mã khôi phục dự phòng' },
    ],
    question: {
      q: 'Why does two-factor authentication make email accounts safer?',
      options: ['It hides your email address from coworkers', 'A stolen password alone is not enough to log in', 'It automatically deletes spam every hour'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-129',
    level: 'A2',
    category: 'IT / Kỹ thuật',
    title: 'Bài 129: Cập Nhật Trình Duyệt & Kiểm Tra Mic Trước Cuộc Họp',
    sourceStyle: 'VOA • Remote Work Tech',
    transcript:
      'Before joining our afternoon video call, please check that your web browser is updated to the latest version. Older browser versions sometimes block camera and microphone permissions without showing a clear warning. Joining the test room five minutes early lets you test your headset audio and verify that your screen sharing works smoothly.',
    translation:
      'Trước khi tham gia cuộc họp video chiều nay, bạn vui lòng kiểm tra xem trình duyệt web đã được cập nhật lên phiên bản mới nhất chưa nhé. Các phiên bản trình duyệt cũ đôi khi chặn quyền máy ảnh và micrô mà không hiện cảnh báo rõ ràng. Vào phòng kiểm tra sớm năm phút giúp bạn thử âm thanh tai nghe và xác nhận tính năng chia sẻ màn hình hoạt động trơn tru.',
    keyPhrases: [
      { en: 'latest version', vi: 'phiên bản mới nhất' },
      { en: 'microphone permissions', vi: 'quyền truy cập micrô' },
      { en: 'screen sharing works smoothly', vi: 'chia sẻ màn hình hoạt động mượt mà' },
    ],
    question: {
      q: 'What problem can an outdated browser cause during a video call?',
      options: ['It can silently block camera and microphone permissions', 'It changes the meeting time', 'It turns off the monitor brightness'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-130',
    level: 'A2',
    category: 'IT / Kỹ thuật',
    title: 'Bài 130: Gửi Ảnh Chụp Màn Hình Lỗi Cho Đội Kỹ Thuật',
    sourceStyle: 'BBC • Tech Support',
    transcript:
      'Whenever our accounting software shows an error pop-up, please avoid closing the window right away. Instead, take a clear screenshot showing both the error message code and the web address bar at the top. Attaching that image to your support ticket helps our engineers spot the exact bug in minutes rather than guessing what happened.',
    translation:
      'Bất cứ khi nào phần mềm kế toán hiển thị hộp thoại báo lỗi, bạn đừng vội đóng cửa sổ ngay nhé. Thay vào đó, hãy chụp ảnh màn hình rõ nét hiển thị cả mã thông báo lỗi lẫn thanh địa chỉ web ở phía trên. Đính kèm hình ảnh đó vào phiếu yêu cầu hỗ trợ giúp kỹ sư bên mình xác định đúng lỗi chỉ trong vài phút thay vì phải đoán mò chuyện gì đã xảy ra.',
    keyPhrases: [
      { en: 'take a clear screenshot', vi: 'chụp ảnh màn hình rõ nét' },
      { en: 'error message code', vi: 'mã thông báo lỗi' },
      { en: 'support ticket', vi: 'phiếu yêu cầu hỗ trợ kỹ thuật' },
    ],
    question: {
      q: 'What two details should be visible in the error screenshot?',
      options: ['Your desktop wallpaper and clock', 'Your bank PIN and user profile photo', 'The error message code and the web address bar'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-131',
    level: 'B1',
    category: 'IT / Kỹ thuật',
    title: 'Bài 131: Họp Đứng Buổi Sáng Cập Nhật Tiến Độ Sprint',
    sourceStyle: 'British Council • Agile Engineering',
    transcript:
      'Good morning team, here is my quick stand-up update. Yesterday I finished writing unit tests for the user login service and resolved the token timeout bug on staging. Today I plan to review Minh’s pull request on the search filter and deploy the payment patch before four PM. My only blocker right now is waiting for updated test keys from the gateway vendor.',
    translation:
      'Chào buổi sáng cả nhóm, đây là phần cập nhật nhanh của mình trong buổi họp đứng. Hôm qua mình đã viết xong kiểm thử đơn vị cho dịch vụ đăng nhập người dùng và xử lý xong lỗi hết hạn mã phiên trên môi trường thử nghiệm. Hôm nay mình dự định duyệt yêu cầu hợp nhất mã của Minh ở bộ lọc tìm kiếm và triển khai bản vá thanh toán trước bốn giờ chiều. Vướng mắc duy nhất lúc này là đang chờ khóa kiểm thử mới từ bên cung cấp cổng thanh toán.',
    keyPhrases: [
      { en: 'unit tests', vi: 'kiểm thử đơn vị' },
      { en: 'pull request', vi: 'yêu cầu hợp nhất mã nguồn' },
      { en: 'only blocker', vi: 'rào cản / vướng mắc duy nhất' },
    ],
    question: {
      q: 'What is currently blocking the developer’s progress?',
      options: ['A broken keyboard', 'Waiting for updated test keys from the gateway vendor', 'Missing coffee in the break room'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-132',
    level: 'B1',
    category: 'IT / Kỹ thuật',
    title: 'Bài 132: Cấp Quyền Truy Cập Kho Mã Nguồn Cho Thành Viên Mới',
    sourceStyle: 'VOA • Engineering Onboarding',
    transcript:
      'Welcome to the backend team, Hung! I have just granted your account write access to our main mobile repository on GitHub. Please remember that direct pushes to the main branch are blocked for everyone, so always create a fresh feature branch for your work. Once automated checks pass, tag at least one senior engineer to review your changes.',
    translation:
      'Chào mừng gia nhập đội ngũ backend nhé, Hùng! Mình vừa cấp quyền ghi cho tài khoản của bạn vào kho mã nguồn di động chính trên GitHub. Hãy nhớ rằng việc đẩy mã trực tiếp lên nhánh chính bị chặn với tất cả mọi người, nên bạn luôn phải tạo một nhánh tính năng mới cho công việc của mình. Khi các bước kiểm tra tự động vượt qua, hãy gắn thẻ ít nhất một kỹ sư cấp cao để xem xét thay đổi nhé.',
    keyPhrases: [
      { en: 'write access', vi: 'quyền ghi / chỉnh sửa mã' },
      { en: 'main branch', vi: 'nhánh mã nguồn chính' },
      { en: 'automated checks pass', vi: 'các bước kiểm tra tự động đạt yêu cầu' },
    ],
    question: {
      q: 'Why must Hung create a fresh feature branch?',
      options: ['Because direct pushes to the main branch are blocked', 'Because the main branch is deleted on Fridays', 'Because GitHub charges extra for main branch commits'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-133',
    level: 'B1',
    category: 'IT / Kỹ thuật',
    title: 'Bài 133: Cảnh Báo Email Lừa Đảo Giả Mạo Bộ Phận IT',
    sourceStyle: 'BBC • Security Awareness',
    transcript:
      'Please stay alert for suspicious emails claiming your company mailbox will expire in two hours unless you verify your password. Notice how the sender address ends with an unfamiliar domain instead of our real corporate website. Never click login links inside urgent messages; instead, report them using the security button in your toolbar so our team can block the sender across all accounts.',
    translation:
      'Vui lòng luôn cảnh giác với các email đáng ngờ thông báo hộp thư công ty của bạn sẽ hết hạn sau hai tiếng nếu không xác minh mật khẩu. Hãy để ý địa chỉ người gửi kết thúc bằng một tên miền lạ thay vì trang web chính thức của doanh nghiệp chúng ta. Đừng bao giờ bấm vào đường dẫn đăng nhập trong các tin nhắn hối thúc khẩn cấp; thay vào đó, hãy báo cáo bằng nút bảo mật trên thanh công cụ để đội ngũ chúng tôi chặn người gửi trên toàn hệ thống.',
    keyPhrases: [
      { en: 'suspicious emails', vi: 'các email đáng ngờ' },
      { en: 'unfamiliar domain', vi: 'tên miền lạ không quen thuộc' },
      { en: 'block the sender', vi: 'chặn người gửi đó' },
    ],
    question: {
      q: 'How can staff spot the fake IT email mentioned in the warning?',
      options: ['The sender address uses an unfamiliar domain', 'It has no subject line', 'It arrives after midnight'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-134',
    level: 'B1',
    category: 'IT / Kỹ thuật',
    title: 'Bài 134: Viết Báo Cáo Lỗi Thanh Toán Trên Ứng Dụng Di Động',
    sourceStyle: 'British Council • QA & Testing',
    transcript:
      'When testing our shopping app on Android fourteen, I found a repeatable crash during checkout. If a user removes a discount coupon and immediately taps Pay Now within one second, the payment screen freezes and closes unexpectedly. I attached the device logs and a short screen recording to our bug tracker so the mobile squad can reproduce the issue reliably.',
    translation:
      'Khi kiểm thử ứng dụng mua sắm trên Android mười bốn, tôi phát hiện một lỗi sập ứng dụng lặp lại được ở bước thanh toán. Nếu người dùng xóa mã giảm giá và chạm ngay vào nút Thanh toán trong vòng một giây, màn hình thanh toán bị treo rồi tự thoát đột ngột. Tôi đã đính kèm nhật ký thiết bị và một đoạn quay màn hình ngắn vào hệ thống theo dõi lỗi để nhóm di động có thể tái hiện lỗi một cách chính xác.',
    keyPhrases: [
      { en: 'repeatable crash', vi: 'lỗi sập ứng dụng tái hiện được' },
      { en: 'device logs', vi: 'nhật ký hoạt động thiết bị' },
      { en: 'reproduce the issue', vi: 'tái hiện lại lỗi đó' },
    ],
    question: {
      q: 'What action triggers the crash on the payment screen?',
      options: ['Switching the app language to Vietnamese', 'Paying with an expired credit card', 'Removing a coupon and tapping Pay Now within one second'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-135',
    level: 'B1',
    category: 'IT / Kỹ thuật',
    title: 'Bài 135: Thông Báo Lịch Bảo Trì Hệ Thống Cuối Tuần',
    sourceStyle: 'VOA • System Operations',
    transcript:
      'Please note that our engineering team will perform scheduled database maintenance this Sunday from two AM to four AM local time. During that two-hour maintenance window, customer dashboards and report exports will be temporarily unavailable. All scheduled automated backups will resume automatically once the upgrade finishes, and no user action is required.',
    translation:
      'Xin lưu ý rằng đội ngũ kỹ sư của chúng tôi sẽ thực hiện bảo trì cơ sở dữ liệu theo lịch vào Chủ nhật tuần này từ hai giờ sáng đến bốn giờ sáng theo giờ địa phương. Trong khoảng thời gian bảo trì hai tiếng đó, bảng điều khiển khách hàng và tính năng xuất báo cáo sẽ tạm thời không khả dụng. Mọi lịch sao lưu tự động sẽ hoạt động lại bình thường ngay sau khi nâng cấp hoàn tất, và người dùng không cần thực hiện thao tác nào.',
    keyPhrases: [
      { en: 'scheduled database maintenance', vi: 'bảo trì cơ sở dữ liệu theo lịch' },
      { en: 'temporarily unavailable', vi: 'tạm thời không khả dụng' },
      { en: 'no user action is required', vi: 'người dùng không cần thao tác gì' },
    ],
    question: {
      q: 'What happens after the Sunday maintenance finishes?',
      options: ['Users must re-upload their files', 'Automated backups resume automatically', 'Dashboards remain offline until Monday noon'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-136',
    level: 'B2',
    category: 'IT / Kỹ thuật',
    title: 'Bài 136: Góp Ý Đánh Giá Mã Nguồn & Tối Ưu Truy Vấn Dữ Liệu',
    sourceStyle: 'BBC • Software Architecture',
    transcript:
      'Overall, this order-history endpoint is clean and easy to follow, yet loading three hundred thousand rows during peak traffic could create a serious bottleneck. Rather than filtering unpaid invoices inside application memory, adding a composite index on customer ID and status will let the database return results in under twenty milliseconds. Please update the migration script and benchmark both queries before merging.',
    translation:
      'Nhìn chung, điểm cuối API lịch sử đơn hàng này gọn gàng và dễ theo dõi, nhưng việc tải ba trăm nghìn dòng dữ liệu trong giờ cao điểm có thể tạo ra nút thắt cổ chai nghiêm trọng. Thay vì lọc các hóa đơn chưa thanh toán bên trong bộ nhớ ứng dụng, việc thêm chỉ mục kết hợp trên mã khách hàng và trạng thái sẽ giúp cơ sở dữ liệu trả kết quả dưới hai mươi mili giây. Hãy cập nhật tệp di trú dữ liệu và đo hiệu năng cả hai câu truy vấn trước khi hợp nhất nhé.',
    keyPhrases: [
      { en: 'serious bottleneck', vi: 'nút thắt cổ chai nghiêm trọng' },
      { en: 'composite index', vi: 'chỉ mục kết hợp nhiều cột' },
      { en: 'benchmark both queries', vi: 'đo kiểm hiệu năng cả hai truy vấn' },
    ],
    question: {
      q: 'How does the reviewer recommend speeding up the order query?',
      options: ['Adding a composite database index on customer ID and status', 'Deleting old order records every night', 'Caching every page inside browser cookies'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-137',
    level: 'B2',
    category: 'IT / Kỹ thuật',
    title: 'Bài 137: Phân Tích Nguyên Nhân Gốc Rễ Sau Sự Cố Hệ Thống',
    sourceStyle: 'VOA • Site Reliability Engineering',
    transcript:
      'Yesterday’s twelve-minute checkout outage stemmed from a misconfigured network timeout deployed during our afternoon release. When a downstream analytics service slowed down, waiting requests piled up and exhausted every available worker thread across the cluster. Rolling back the configuration restored stability swiftly, and we are now adding strict circuit breakers so non-critical services never cascade into core payments.',
    translation:
      'Sự cố gián đoạn thanh toán kéo dài mười hai phút hôm qua bắt nguồn từ một thông số thời gian chờ mạng cấu hình sai được triển khai trong bản phát hành buổi chiều. Khi một dịch vụ phân tích phía sau chạy chậm lại, các yêu cầu chờ xử lý dồn ứ và làm cạn kiệt toàn bộ luồng xử lý khả dụng trên cụm máy chủ. Việc khôi phục cấu hình cũ đã nhanh chóng lấy lại sự ổn định, và hiện chúng tôi đang bổ sung cơ chế ngắt mạch nghiêm ngặt để các dịch vụ phụ không bao giờ kéo sập luồng thanh toán cốt lõi.',
    keyPhrases: [
      { en: 'misconfigured network timeout', vi: 'thông số thời gian chờ mạng cấu hình sai' },
      { en: 'restored stability swiftly', vi: 'nhanh chóng khôi phục sự ổn định' },
      { en: 'circuit breakers', vi: 'cơ chế ngắt mạch bảo vệ hệ thống' },
    ],
    question: {
      q: 'What triggered the twelve-minute checkout outage?',
      options: ['A power outage at the data center', 'An expired domain name certificate', 'A misconfigured timeout when analytics slowed down'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-138',
    level: 'B2',
    category: 'IT / Kỹ thuật',
    title: 'Bài 138: Cân Nhắc Giữa Tốc Độ Triển Khai & Độ Ổn Định Sản Phẩm',
    sourceStyle: 'British Council • Engineering Leadership',
    transcript:
      'Shipping a redesigned search engine to all one million users simultaneously carries unnecessary operational risk, no matter how thorough staging tests appear. By wrapping the new ranking logic behind a feature flag, we can expose it to just five percent of traffic first and monitor error rates in real time. That gradual rollout gives us speed to learn while keeping rollback effortless if metrics dip.',
    translation:
      'Việc tung bộ máy tìm kiếm thiết kế lại cho toàn bộ một triệu người dùng cùng một lúc mang lại rủi ro vận hành không cần thiết, bất kể kiểm thử thử nghiệm kỹ lưỡng đến đâu. Bằng cách bọc logic xếp hạng mới sau một cờ tính năng, chúng ta có thể mở thử chỉ cho năm phần trăm lưu lượng trước và theo dõi tỷ lệ lỗi theo thời gian thực. Cách triển khai từng bước đó mang lại tốc độ học hỏi nhanh trong khi vẫn giúp quay lui nhẹ nhàng nếu các chỉ số sụt giảm.',
    keyPhrases: [
      { en: 'feature flag', vi: 'cờ bật tắt tính năng' },
      { en: 'monitor error rates', vi: 'giám sát tỷ lệ lỗi' },
      { en: 'gradual rollout', vi: 'triển khai mở rộng từng bước' },
    ],
    question: {
      q: 'Why does the team release the new search feature to only five percent of traffic first?',
      options: ['Their servers cannot handle six percent traffic', 'To monitor real-time metrics safely and keep rollback easy', 'Only five percent of users speak English'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-139',
    level: 'B2',
    category: 'IT / Kỹ thuật',
    title: 'Bài 139: Tối Ưu Quy Trình Kiểm Thử Tự Động Trước Khi Hợp Nhất Mã',
    sourceStyle: 'BBC • DevOps Practice',
    transcript:
      'Manual testing alone simply cannot keep pace when twenty developers merge code changes every single day. Upgrading our continuous integration pipeline to run fast type checks, API integration suites, and build verification automatically caught three subtle regressions before they ever reached production last month. Keeping total pipeline execution under six minutes ensures engineers stay productive instead of losing focus while waiting.',
    translation:
      'Chỉ dựa vào kiểm thử thủ công đơn thuần không thể theo kịp khi hai mươi lập trình viên hợp nhất thay đổi mã nguồn mỗi ngày. Việc nâng cấp đường ống tích hợp liên tục để tự động chạy kiểm tra kiểu dữ liệu nhanh, bộ kiểm thử tích hợp API và xác minh bản dựng đã phát hiện ba lỗi hồi quy tinh vi trước khi chúng kịp chạm tới môi trường thực tế tháng trước. Giữ tổng thời gian chạy quy trình dưới sáu phút giúp kỹ sư duy trì năng suất thay vì mất tập trung khi chờ đợi.',
    keyPhrases: [
      { en: 'continuous integration pipeline', vi: 'đường ống tích hợp liên tục CI' },
      { en: 'subtle regressions', vi: 'các lỗi hồi quy tinh vi' },
      { en: 'reached production', vi: 'đưa lên môi trường thực tế' },
    ],
    question: {
      q: 'Why is keeping pipeline execution under six minutes important?',
      options: ['It keeps engineers productive without losing focus', 'Cloud servers shut down after seven minutes', 'Manual testers refuse to wait longer'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-140',
    level: 'B2',
    category: 'IT / Kỹ thuật',
    title: 'Bài 140: Bảo Vệ Dữ Liệu Người Dùng Trong Kiến Trúc Đám Mây',
    sourceStyle: 'VOA • Cloud Security',
    transcript:
      'Designing trustworthy cloud applications requires treating privacy as a foundational architecture choice rather than a last-minute checklist item. Sensitive customer records should remain encrypted both in transit and at rest, while internal microservices follow strict least-privilege permissions so compromised components cannot inspect unrelated data. Regular external audits further verify that our safeguards hold up against evolving threats.',
    translation:
      'Thiết kế các ứng dụng đám mây đáng tin cậy đòi hỏi phải coi quyền riêng tư là lựa chọn kiến trúc nền tảng thay vì mục kiểm tra chót vót phút cuối. Dữ liệu khách hàng nhạy cảm cần được mã hóa cả khi truyền tải lẫn khi lưu trữ tĩnh, trong khi các vi dịch vụ nội bộ tuân thủ quyền tối thiểu nghiêm ngặt để thành phần bị xâm nhập không thể đọc dữ liệu không liên quan. Các đợt kiểm toán độc lập định kỳ giúp xác minh thêm rằng hàng rào bảo vệ của chúng ta đứng vững trước các mối đe dọa luôn biến đổi.',
    keyPhrases: [
      { en: 'encrypted both in transit and at rest', vi: 'mã hóa cả khi truyền và khi lưu trữ' },
      { en: 'least-privilege permissions', vi: 'phân quyền tối thiểu cần thiết' },
      { en: 'evolving threats', vi: 'các mối đe dọa không ngừng biến đổi' },
    ],
    question: {
      q: 'What is the purpose of strict least-privilege permissions for microservices?',
      options: ['To make database queries run faster', 'To stop compromised parts from accessing unrelated data', 'To allow every developer full admin access'],
      correctIdx: 1,
    },
  },
];

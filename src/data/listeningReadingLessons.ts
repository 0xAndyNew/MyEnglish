import { CefrLevel } from '../types/learning';

export interface ListeningReadingLesson {
  id: string;
  level: CefrLevel;
  category: 'Hội thoại đời sống' | 'Bài đọc cơ bản' | 'Giao tiếp công việc';
  title: string;
  sourceStyle: string;
  transcript: string;
  translation: string;
  keyPhrases: { en: string; vi: string }[];
  question: {
    q: string;
    options: string[];
    correctIdx: number;
  };
}

export const LISTENING_READING_LESSONS: ListeningReadingLesson[] = [
  {
    id: 'lr-1',
    level: 'A1',
    category: 'Hội thoại đời sống',
    title: 'Bài 1: Gặp gỡ & Làm quen lần đầu',
    sourceStyle: 'British Council • A1 Everyday Listening',
    transcript:
      'Hello! My name is Anna. I am from London, and I am twenty-four years old. I work as a designer in a small studio. In my free time, I enjoy reading books and drinking green tea. Nice to meet you!',
    translation:
      'Xin chào! Tên tôi là Anna. Tôi đến từ Luân Đôn và tôi 24 tuổi. Tôi làm thiết kế tại một studio nhỏ. Trong thời gian rảnh, tôi thích đọc sách và uống trà xanh. Rất vui được gặp bạn!',
    keyPhrases: [
      { en: 'work as a designer', vi: 'làm nghề thiết kế' },
      { en: 'in my free time', vi: 'trong thời gian rảnh' },
      { en: 'Nice to meet you', vi: 'Rất vui được gặp bạn' },
    ],
    question: {
      q: 'What does Anna do in her free time?',
      options: ['Plays tennis', 'Reads books and drinks tea', 'Watches movies'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-2',
    level: 'A1',
    category: 'Hội thoại đời sống',
    title: 'Bài 2: Gọi đồ uống tại Quán Cà Phê',
    sourceStyle: 'VOA Learning English • Let’s Learn English',
    transcript:
      'Good morning! Welcome to Sunny Cafe. Can I help you? Yes, please. I would like a medium iced coffee with a little milk, and one cheese sandwich. Would you like to eat here or take away? Take away, please. How much is it? That is six dollars.',
    translation:
      'Chào buổi sáng! Chào mừng đến với Sunny Cafe. Tôi có thể giúp gì cho bạn? Vâng, cho tôi một ly cà phê đá cỡ vừa ít sữa và một bánh mì kẹp phô mai. Bạn dùng tại đây hay mang đi? Mang đi ạ. Bao nhiêu tiền vậy? Tổng cộng là 6 đô la.',
    keyPhrases: [
      { en: 'I would like...', vi: 'Tôi muốn gọi...' },
      { en: 'eat here or take away', vi: 'ăn tại chỗ hay mang đi' },
      { en: 'How much is it?', vi: 'Cái này bao nhiêu tiền?' },
    ],
    question: {
      q: 'How does the customer want the order?',
      options: ['Eat at the cafe', 'Take away', 'Delivery at home'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-3',
    level: 'A1',
    category: 'Hội thoại đời sống',
    title: 'Bài 3: Mua sắm & Hỏi giá quần áo',
    sourceStyle: 'BBC Learning English • Easy English',
    transcript:
      'Excuse me, how much is this blue jacket? It is forty-five dollars. Do you have it in a medium size? Let me check for you. Yes, we do! The fitting room is right over there on the left. Thank you very much.',
    translation:
      'Xin lỗi, chiếc áo khoác màu xanh này giá bao nhiêu ạ? Nó giá 45 đô la. Bạn có cỡ vừa (M) không? Để tôi kiểm tra giúp bạn. Vâng, chúng tôi có! Phòng thử đồ ở ngay đằng kia bên tay trái nhé. Cảm ơn bạn rất nhiều.',
    keyPhrases: [
      { en: 'in a medium size', vi: 'ở cỡ vừa (M)' },
      { en: 'fitting room', vi: 'phòng thử đồ' },
      { en: 'on the left', vi: 'ở bên tay trái' },
    ],
    question: {
      q: 'Where is the fitting room?',
      options: ['On the right', 'On the left', 'Upstairs'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-4',
    level: 'A1',
    category: 'Bài đọc cơ bản',
    title: 'Bài 4: Thói quen buổi sáng hàng ngày',
    sourceStyle: 'British Council • A1 Reading',
    transcript:
      'Every morning, David wakes up at six thirty. First, he brushes his teeth and drinks a glass of warm water. Then, he eats breakfast with eggs and bread at seven o’clock. At seven thirty, he takes the bus to his office. He always listens to English podcasts on the bus.',
    translation:
      'Mỗi sáng, David thức dậy lúc 6 giờ 30. Đầu tiên, anh ấy đánh răng và uống một cốc nước ấm. Sau đó, anh ăn sáng với trứng và bánh mì lúc 7 giờ. Lúc 7 giờ 30, anh bắt xe buýt đến văn phòng. Anh ấy luôn nghe podcast tiếng Anh trên xe buýt.',
    keyPhrases: [
      { en: 'wakes up at...', vi: 'thức dậy lúc...' },
      { en: 'takes the bus', vi: 'bắt xe buýt' },
      { en: 'listens to podcasts', vi: 'nghe podcast' },
    ],
    question: {
      q: 'What does David do on the bus?',
      options: ['He sleeps', 'He reads newspapers', 'He listens to English podcasts'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-5',
    level: 'A2',
    category: 'Hội thoại đời sống',
    title: 'Bài 5: Hỏi đường ra Nhà ga & Phương tiện',
    sourceStyle: 'VOA Special English • Everyday Dialogues',
    transcript:
      'Excuse me, could you tell me the way to the central train station? Sure! Go straight along this street for two blocks. Then turn right at the traffic light. You will see a big bookstore on the corner, and the station is right next to it. It takes about five minutes on foot.',
    translation:
      'Xin lỗi, bạn có thể chỉ cho tôi đường đến ga tàu trung tâm không? Chắc chắn rồi! Bạn đi thẳng dọc theo con phố này hai dãy nhà. Sau đó rẽ phải ở đèn giao thông. Bạn sẽ thấy một hiệu sách lớn ở góc đường, và nhà ga nằm ngay bên cạnh nó. Đi bộ mất khoảng 5 phút.',
    keyPhrases: [
      { en: 'Go straight along...', vi: 'Đi thẳng dọc theo...' },
      { en: 'turn right at the traffic light', vi: 'rẽ phải ở đèn giao thông' },
      { en: 'five minutes on foot', vi: '5 phút đi bộ' },
    ],
    question: {
      q: 'How long does it take to walk to the station?',
      options: ['About two minutes', 'About five minutes', 'About fifteen minutes'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-6',
    level: 'A2',
    category: 'Hội thoại đời sống',
    title: 'Bài 6: Khám sức khỏe & Mô tả triệu chứng',
    sourceStyle: 'British Council • A2 Listening',
    transcript:
      'Good afternoon. What seems to be the problem today? I have had a sore throat and a mild headache since yesterday morning. Do you have a fever? Just a little bit last night. Okay, please drink plenty of warm water, rest for two days, and take this medicine after meals.',
    translation:
      'Chào buổi chiều. Hôm nay bạn gặp vấn đề gì vậy? Tôi bị đau họng và đau đầu nhẹ từ sáng hôm qua. Bạn có bị sốt không? Tối qua chỉ hơi sốt nhẹ một chút ạ. Được rồi, hãy uống nhiều nước ấm, nghỉ ngơi hai ngày và uống thuốc này sau bữa ăn nhé.',
    keyPhrases: [
      { en: 'a sore throat', vi: 'đau họng' },
      { en: 'drink plenty of water', vi: 'uống nhiều nước' },
      { en: 'after meals', vi: 'sau bữa ăn' },
    ],
    question: {
      q: 'When should the patient take the medicine?',
      options: ['Before breakfast', 'After meals', 'Only at night'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-7',
    level: 'A2',
    category: 'Bài đọc cơ bản',
    title: 'Bài 7: Ngôi nhà & Gia đình của tôi',
    sourceStyle: 'BBC Learning English • Daily Life Reading',
    transcript:
      'My family lives in a bright apartment near a quiet park. There are three bedrooms, a cozy living room, and a modern kitchen. Every Sunday evening, my parents and I cook dinner together and share stories about our week. The living room is my favorite place because it has a large window with lots of sunlight.',
    translation:
      'Gia đình tôi sống trong một căn hộ sáng sủa gần một công viên yên tĩnh. Có 3 phòng ngủ, một phòng khách ấm cúng và một nhà bếp hiện đại. Mỗi tối Chủ nhật, bố mẹ và tôi cùng nấu bữa tối và chia sẻ những câu chuyện trong tuần. Phòng khách là nơi tôi thích nhất vì có cửa sổ lớn đầy nắng.',
    keyPhrases: [
      { en: 'a cozy living room', vi: 'phòng khách ấm cúng' },
      { en: 'cook dinner together', vi: 'cùng nấu bữa tối' },
      { en: 'favorite place', vi: 'nơi yêu thích nhất' },
    ],
    question: {
      q: 'Why does the writer like the living room best?',
      options: ['It has a big TV', 'It has a large sunny window', 'It is next to the kitchen'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-8',
    level: 'A2',
    category: 'Bài đọc cơ bản',
    title: 'Bài 8: Thời tiết & Kế hoạch cuối tuần',
    sourceStyle: 'VOA Learning English • Weather & Seasons',
    transcript:
      'The weather forecast says this Saturday will be sunny and warm, around twenty-five degrees Celsius. However, it might rain lightly on Sunday afternoon. So my friends and I decided to go hiking on Saturday morning and visit the city museum on Sunday.',
    translation:
      'Dự báo thời tiết nói thứ Bảy này trời sẽ nắng ấm, khoảng 25 độ C. Tuy nhiên, chiều Chủ nhật có thể có mưa nhẹ. Vì vậy bạn bè tôi và tôi quyết định đi leo núi vào sáng thứ Bảy và thăm bảo tàng thành phố vào Chủ nhật.',
    keyPhrases: [
      { en: 'weather forecast', vi: 'dự báo thời tiết' },
      { en: 'go hiking', vi: 'đi leo núi / đi bộ đường dài' },
      { en: 'visit the museum', vi: 'thăm bảo tàng' },
    ],
    question: {
      q: 'What is their plan for Sunday?',
      options: ['Go hiking', 'Visit the city museum', 'Have a picnic'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-9',
    level: 'A2',
    category: 'Giao tiếp công việc',
    title: 'Bài 9: Nhận phòng Khách sạn khi đi Du lịch',
    sourceStyle: 'British Council • Travel English',
    transcript:
      'Good evening! Welcome to Horizon Hotel. How may I assist you? I have a reservation under the name Tuan Nguyen for three nights. Let me check. Yes, a double room with a sea view. Breakfast is served from six thirty to nine thirty on the second floor. Here is your key card.',
    translation:
      'Chào buổi tối! Chào mừng đến với Khách sạn Horizon. Tôi có thể hỗ trợ gì cho quý khách? Tôi có đặt phòng dưới tên Tuấn Nguyễn trong 3 đêm. Để tôi kiểm tra. Vâng, một phòng đôi hướng biển. Bữa sáng được phục vụ từ 6:30 đến 9:30 tại tầng 2. Đây là thẻ phòng của quý khách.',
    keyPhrases: [
      { en: 'have a reservation', vi: 'có đặt phòng trước' },
      { en: 'with a sea view', vi: 'hướng nhìn ra biển' },
      { en: 'key card', vi: 'thẻ khóa phòng' },
    ],
    question: {
      q: 'Where is breakfast served?',
      options: ['In the room', 'On the second floor', 'In the lobby'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-10',
    level: 'B1',
    category: 'Giao tiếp công việc',
    title: 'Bài 10: Lịch trình một ngày tại Văn phòng',
    sourceStyle: 'BBC Learning English • English at Work',
    transcript:
      'At nine AM, our team usually holds a short fifteen-minute stand-up meeting to review daily priorities. After that, I answer urgent client emails and prepare progress reports. Although afternoons are often busy with calls, I always save thirty minutes before five PM to plan tasks for tomorrow.',
    translation:
      'Lúc 9 giờ sáng, nhóm chúng tôi thường họp nhanh 15 phút để rà soát các việc ưu tiên trong ngày. Sau đó, tôi trả lời các email khẩn của khách hàng và chuẩn bị báo cáo tiến độ. Mặc dù buổi chiều thường bận gọi điện, tôi luôn dành 30 phút trước 5 giờ chiều để lên kế hoạch cho ngày mai.',
    keyPhrases: [
      { en: 'review daily priorities', vi: 'rà soát ưu tiên hàng ngày' },
      { en: 'progress reports', vi: 'báo cáo tiến độ' },
      { en: 'plan tasks for tomorrow', vi: 'lên kế hoạch việc ngày mai' },
    ],
    question: {
      q: 'What does the speaker do before 5 PM?',
      options: ['Leaves the office early', 'Plans tasks for tomorrow', 'Has a long team lunch'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-11',
    level: 'B1',
    category: 'Giao tiếp công việc',
    title: 'Bài 11: Thông báo Sân bay & Lịch bay',
    sourceStyle: 'VOA Special English • Practical Listening',
    transcript:
      'Attention please. Passengers on Flight VN two-zero-four to Singapore, please note that the departure gate has changed from Gate A4 to Gate B7. Boarding will begin in twenty minutes. Please have your passport and boarding pass ready for inspection.',
    translation:
      'Xin chú ý. Hành khách trên chuyến bay VN204 đi Singapore, xin lưu ý cổng khởi hành đã thay đổi từ Cổng A4 sang Cổng B7. Việc lên máy bay sẽ bắt đầu trong 20 phút nữa. Vui lòng chuẩn bị sẵn hộ chiếu và thẻ lên máy bay để kiểm tra.',
    keyPhrases: [
      { en: 'departure gate', vi: 'cổng khởi hành' },
      { en: 'boarding pass', vi: 'thẻ lên máy bay' },
      { en: 'ready for inspection', vi: 'sẵn sàng để kiểm tra' },
    ],
    question: {
      q: 'Which gate should passengers go to now?',
      options: ['Gate A4', 'Gate B7', 'Gate C2'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-12',
    level: 'B1',
    category: 'Bài đọc cơ bản',
    title: 'Bài 12: Bí quyết tự học Ngoại ngữ hiệu quả',
    sourceStyle: 'VOA & BBC • Study Skills Digest',
    transcript:
      'Learning a new language does not require studying for five hours once a week. Instead, practicing for just twenty minutes every day brings much better results. When you listen to short stories, read aloud, and repeat natural sentences, your brain remembers vocabulary in real context and builds speaking confidence.',
    translation:
      'Học một ngôn ngữ mới không đòi hỏi phải học 5 tiếng một lần mỗi tuần. Thay vào đó, luyện tập chỉ 20 phút mỗi ngày mang lại kết quả tốt hơn nhiều. Khi bạn nghe những câu chuyện ngắn, đọc thành tiếng và lặp lại các câu tự nhiên, não bộ sẽ nhớ từ vựng theo ngữ cảnh thực tế và xây dựng sự tự tin khi nói.',
    keyPhrases: [
      { en: 'much better results', vi: 'kết quả tốt hơn nhiều' },
      { en: 'read aloud', vi: 'đọc thành tiếng' },
      { en: 'in real context', vi: 'trong ngữ cảnh thực tế' },
    ],
    question: {
      q: 'According to the passage, what brings better results?',
      options: ['Studying 5 hours once a week', 'Practicing 20 minutes every day', 'Memorizing single words only'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-13',
    level: 'A1',
    category: 'Hội thoại đời sống',
    title: 'Bài 13: Đi Siêu thị mua thực phẩm',
    sourceStyle: 'British Council • Everyday Shopping',
    transcript:
      'Excuse me, where can I find fresh apples and bananas? They are in aisle three, right next to the bakery. Thank you! Do you also have milk and eggs? Yes, dairy products are at the back of the store. Would you like a paper bag? Yes, please.',
    translation:
      'Xin lỗi, tôi có thể tìm táo và chuối tươi ở đâu? Chúng ở dãy số 3, ngay cạnh quầy bánh mì. Cảm ơn! Bạn có sữa và trứng không? Có, các sản phẩm từ sữa ở phía cuối cửa hàng. Bạn có muốn lấy túi giấy không? Vâng, cho tôi xin một túi.',
    keyPhrases: [
      { en: 'aisle three', vi: 'dãy hàng số 3' },
      { en: 'dairy products', vi: 'sản phẩm từ sữa' },
      { en: 'paper bag', vi: 'túi giấy' },
    ],
    question: {
      q: 'Where are the dairy products?',
      options: ['In aisle three', 'At the back of the store', 'Near the entrance'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-14',
    level: 'A1',
    category: 'Hội thoại đời sống',
    title: 'Bài 14: Đặt lịch hẹn cắt tóc',
    sourceStyle: 'VOA Learning English • Daily Tasks',
    transcript:
      'Hello, City Hair Salon speaking. How can I help you? Hi, I would like to book a haircut for tomorrow afternoon. What time would you prefer? Is three PM available? Let me check. Yes, three PM with stylist Kevin is open. Great, my name is Linh.',
    translation:
      'Xin chào, City Hair Salon xin nghe. Tôi có thể giúp gì cho bạn? Chào bạn, tôi muốn đặt lịch cắt tóc vào chiều mai. Bạn muốn lúc mấy giờ? 3 giờ chiều có trống không? Để tôi kiểm tra. Vâng, 3 giờ chiều với thợ Kevin còn trống. Tuyệt vời, tên tôi là Linh.',
    keyPhrases: [
      { en: 'book a haircut', vi: 'đặt lịch cắt tóc' },
      { en: 'What time would you prefer?', vi: 'Bạn muốn mấy giờ?' },
      { en: 'is open / available', vi: 'còn trống lịch' },
    ],
    question: {
      q: 'What time is the appointment?',
      options: ['2 PM tomorrow', '3 PM tomorrow', '4 PM today'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-15',
    level: 'A2',
    category: 'Hội thoại đời sống',
    title: 'Bài 15: Mở tài khoản tại Ngân hàng',
    sourceStyle: 'BBC Learning English • Life Skills',
    transcript:
      'Good morning, I would like to open a new savings account. Certainly. Do you have your passport or national ID card with you? Yes, here is my passport. Thank you. Please fill out this short form and sign at the bottom. Your new debit card will arrive in five working days.',
    translation:
      'Chào buổi sáng, tôi muốn mở một tài khoản tiết kiệm mới. Chắc chắn rồi. Bạn có mang theo hộ chiếu hoặc căn cước công dân không? Có, đây là hộ chiếu của tôi. Cảm ơn. Vui lòng điền vào mẫu đơn ngắn này và ký ở phía dưới. Thẻ ghi nợ mới sẽ được gửi tới sau 5 ngày làm việc.',
    keyPhrases: [
      { en: 'savings account', vi: 'tài khoản tiết kiệm' },
      { en: 'fill out this form', vi: 'điền vào mẫu đơn này' },
      { en: 'five working days', vi: '5 ngày làm việc' },
    ],
    question: {
      q: 'When will the debit card arrive?',
      options: ['Today', 'In five working days', 'Next month'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-16',
    level: 'A2',
    category: 'Hội thoại đời sống',
    title: 'Bài 16: Gửi bưu kiện tại Bưu điện',
    sourceStyle: 'VOA Special English • Everyday Life',
    transcript:
      'Hello, I need to send this small package to Tokyo. Would you like standard or express delivery? How long does express delivery take? About three days, and it costs twenty-two dollars. Standard takes seven days and costs twelve dollars. Let’s use express delivery, please.',
    translation:
      'Xin chào, tôi cần gửi gói hàng nhỏ này đi Tokyo. Bạn muốn gửi thường hay chuyển phát nhanh? Chuyển phát nhanh mất bao lâu? Khoảng 3 ngày và phí là 22 đô la. Gửi thường mất 7 ngày và phí 12 đô la. Vậy cho tôi gửi chuyển phát nhanh nhé.',
    keyPhrases: [
      { en: 'express delivery', vi: 'chuyển phát nhanh' },
      { en: 'How long does it take?', vi: 'Mất bao lâu?' },
      { en: 'send a package', vi: 'gửi bưu kiện' },
    ],
    question: {
      q: 'How much does express delivery cost?',
      options: ['Twelve dollars', 'Twenty-two dollars', 'Thirty dollars'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-17',
    level: 'A2',
    category: 'Hội thoại đời sống',
    title: 'Bài 17: Mua thuốc tại Hiệu thuốc',
    sourceStyle: 'British Council • Health & Pharmacy',
    transcript:
      'Hello, how can I help you? I have a runny nose and I keep sneezing since this morning. Do you have any allergies to medicine? No, I don’t. Take one tablet every eight hours after food. It might make you feel a bit sleepy, so avoid driving.',
    translation:
      'Xin chào, tôi có thể giúp gì cho bạn? Tôi bị sổ mũi và hắt hơi liên tục từ sáng nay. Bạn có bị dị ứng với thuốc nào không? Không ạ. Hãy uống 1 viên mỗi 8 tiếng sau khi ăn. Thuốc có thể gây hơi buồn ngủ nên hãy tránh lái xe nhé.',
    keyPhrases: [
      { en: 'a runny nose', vi: 'bị sổ mũi' },
      { en: 'allergies to medicine', vi: 'dị ứng thuốc' },
      { en: 'avoid driving', vi: 'tránh lái xe' },
    ],
    question: {
      q: 'What should the customer avoid after taking the medicine?',
      options: ['Drinking water', 'Driving', 'Eating dinner'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-18',
    level: 'A2',
    category: 'Hội thoại đời sống',
    title: 'Bài 18: Xử lý nhầm món tại Nhà hàng',
    sourceStyle: 'BBC Learning English • Dining Out',
    transcript:
      'Excuse me, I think there is a small mistake with my order. I ordered grilled chicken with salad, but this is fried fish. Oh, I am terribly sorry about that! I will bring your grilled chicken right away, and this drink is on the house. Thank you for being so helpful.',
    translation:
      'Xin lỗi, tôi nghĩ có một chút nhầm lẫn với món của tôi. Tôi gọi gà nướng ăn kèm salad, nhưng đây lại là cá chiên. Ôi, tôi vô cùng xin lỗi về việc này! Tôi sẽ mang món gà nướng ra ngay lập tức, và đồ uống này quán xin mời miễn phí ạ. Cảm ơn bạn đã hỗ trợ nhiệt tình.',
    keyPhrases: [
      { en: 'a small mistake with my order', vi: 'nhầm lẫn nhỏ với đơn món' },
      { en: 'right away', vi: 'ngay lập tức' },
      { en: 'on the house', vi: 'quán mời miễn phí' },
    ],
    question: {
      q: 'What did the customer originally order?',
      options: ['Fried fish', 'Grilled chicken with salad', 'Beef steak'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-19',
    level: 'A2',
    category: 'Bài đọc cơ bản',
    title: 'Bài 19: Khu phố nơi tôi sinh sống',
    sourceStyle: 'British Council • A2 Reading',
    transcript:
      'I live in a peaceful neighborhood on the east side of the city. There is a clean bakery across from my building, and a small library just around the corner. Every Saturday morning, local farmers sell fresh vegetables at the street market. People here are very polite and always smile at each other.',
    translation:
      'Tôi sống ở một khu phố yên bình phía đông thành phố. Có một tiệm bánh sạch sẽ đối diện tòa nhà tôi ở, và một thư viện nhỏ ngay góc phố. Mỗi sáng thứ Bảy, nông dân địa phương bán rau củ tươi tại chợ phiên. Mọi người ở đây rất lịch sự và luôn mỉm cười với nhau.',
    keyPhrases: [
      { en: 'peaceful neighborhood', vi: 'khu phố yên bình' },
      { en: 'across from', vi: 'đối diện với' },
      { en: 'around the corner', vi: 'ngay góc phố' },
    ],
    question: {
      q: 'What happens every Saturday morning?',
      options: ['The library closes', 'Farmers sell fresh vegetables', 'A music concert starts'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-20',
    level: 'A2',
    category: 'Bài đọc cơ bản',
    title: 'Bài 20: Tập thể dục & Lối sống lành mạnh',
    sourceStyle: 'VOA Learning English • Health & Lifestyle',
    transcript:
      'Staying healthy does not require expensive gym memberships. Walking briskly for thirty minutes a day improves heart health and reduces stress. Drinking enough water and sleeping at least seven hours every night also help you stay focused and energetic at work.',
    translation:
      'Giữ gìn sức khỏe không đòi hỏi thẻ tập gym đắt tiền. Đi bộ nhanh 30 phút mỗi ngày giúp cải thiện tim mạch và giảm căng thẳng. Uống đủ nước và ngủ ít nhất 7 tiếng mỗi đêm cũng giúp bạn luôn tập trung và tràn đầy năng lượng khi làm việc.',
    keyPhrases: [
      { en: 'walking briskly', vi: 'đi bộ nhanh' },
      { en: 'reduces stress', vi: 'giảm căng thẳng' },
      { en: 'stay focused and energetic', vi: 'luôn tập trung và tràn đầy năng lượng' },
    ],
    question: {
      q: 'How many hours of sleep are recommended?',
      options: ['Five hours', 'At least seven hours', 'Ten hours'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-21',
    level: 'A2',
    category: 'Hội thoại đời sống',
    title: 'Bài 21: Đi Taxi & Trao đổi lộ trình',
    sourceStyle: 'VOA • Travel & Transport',
    transcript:
      'Good morning, could you take me to the Grand Museum, please? Sure, hop in! Is there much traffic on the main road right now? Yes, there is some roadwork near the bridge, so I will take a faster side street. That sounds great, thank you.',
    translation:
      'Chào buổi sáng, bạn chở tôi đến Bảo tàng Grand nhé? Chắc chắn rồi, mời lên xe! Đường chính lúc này có đông xe không? Có một chút sửa đường gần cầu, nên tôi sẽ đi đường nhánh nhanh hơn. Nghe tuyệt đấy, cảm ơn bạn.',
    keyPhrases: [
      { en: 'hop in', vi: 'mời lên xe' },
      { en: 'roadwork', vi: 'công trình sửa đường' },
      { en: 'side street', vi: 'đường nhánh / đường phụ' },
    ],
    question: {
      q: 'Why will the driver take a side street?',
      options: ['To buy gas', 'Because of roadwork near the bridge', 'Because the museum moved'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-22',
    level: 'B1',
    category: 'Giao tiếp công việc',
    title: 'Bài 22: Phỏng vấn xin việc — Giới thiệu kinh nghiệm',
    sourceStyle: 'British Council • Job Interview Skills',
    transcript:
      'Tell me a little about your previous work experience. I worked as a customer support specialist for three years. In that role, I handled client inquiries by phone and email, and helped reduce response time by twenty percent. I really enjoy solving problems and working in a collaborative team.',
    translation:
      'Hãy kể cho tôi một chút về kinh nghiệm làm việc trước đây của bạn. Tôi đã làm chuyên viên hỗ trợ khách hàng trong 3 năm. Ở vị trí đó, tôi xử lý thắc mắc của khách qua điện thoại và email, đồng thời giúp giảm thời gian phản hồi 20%. Tôi rất thích giải quyết vấn đề và làm việc trong một đội ngũ hợp tác tốt.',
    keyPhrases: [
      { en: 'previous work experience', vi: 'kinh nghiệm làm việc trước đây' },
      { en: 'handled client inquiries', vi: 'xử lý yêu cầu khách hàng' },
      { en: 'reduce response time', vi: 'giảm thời gian phản hồi' },
    ],
    question: {
      q: 'How long did the candidate work as a customer support specialist?',
      options: ['One year', 'Three years', 'Five years'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-23',
    level: 'B1',
    category: 'Giao tiếp công việc',
    title: 'Bài 23: Xin dời lịch họp qua Điện thoại',
    sourceStyle: 'BBC Learning English • Business Calls',
    transcript:
      'Hi Sarah, this is David from the marketing department. Something urgent came up with a client, so could we reschedule our two PM meeting to tomorrow morning at ten? No problem at all, David. Ten AM tomorrow works well for me. I will update the calendar invite.',
    translation:
      'Chào Sarah, mình là David bên phòng marketing. Có việc khẩn phát sinh với khách hàng, nên mình dời cuộc họp 2 giờ chiều nay sang 10 giờ sáng mai được không? Không vấn đề gì đâu David. 10 giờ sáng mai mình rảnh. Mình sẽ cập nhật lại lịch mời họp nhé.',
    keyPhrases: [
      { en: 'Something urgent came up', vi: 'Có việc khẩn phát sinh' },
      { en: 'reschedule our meeting', vi: 'dời lịch họp' },
      { en: 'update the calendar invite', vi: 'cập nhật lịch mời họp' },
    ],
    question: {
      q: 'When is the new meeting time?',
      options: ['2 PM today', '10 AM tomorrow', '3 PM Friday'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-24',
    level: 'B1',
    category: 'Giao tiếp công việc',
    title: 'Bài 24: Hỗ trợ kỹ thuật — Mất kết nối Wifi',
    sourceStyle: 'IT Support • Workplace Dialogues',
    transcript:
      'IT Helpdesk, how can I assist you? Hi, my laptop cannot connect to the office Wi-Fi after the latest update. Have you tried restarting your laptop and forgetting the network? Not yet. Let’s try that first, and if it still fails, I will come to your desk in five minutes.',
    translation:
      'Bộ phận hỗ trợ IT xin nghe, tôi có thể giúp gì? Chào bạn, laptop của tôi không kết nối được Wi-Fi văn phòng sau bản cập nhật mới nhất. Bạn đã thử khởi động lại máy và quên mạng Wi-Fi cũ chưa? Chưa ạ. Hãy thử cách đó trước nhé, nếu vẫn lỗi thì 5 phút nữa tôi sẽ qua bàn bạn kiểm tra.',
    keyPhrases: [
      { en: 'latest update', vi: 'bản cập nhật mới nhất' },
      { en: 'restarting your laptop', vi: 'khởi động lại máy tính' },
      { en: 'forgetting the network', vi: 'quên kết nối mạng cũ' },
    ],
    question: {
      q: 'What does IT support suggest trying first?',
      options: ['Buying a new laptop', 'Restarting and forgetting the network', 'Changing desks'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-25',
    level: 'B1',
    category: 'Giao tiếp công việc',
    title: 'Bài 25: Thuyết trình — Mở đầu & Nêu mục tiêu',
    sourceStyle: 'BBC • Effective Presentations',
    transcript:
      'Good morning everyone, and thank you for joining today’s presentation. My name is Minh, and I lead the product design team. Over the next ten minutes, I will share three key findings from our customer survey and propose practical improvements for next quarter.',
    translation:
      'Chào buổi sáng mọi người và cảm ơn đã tham gia buổi thuyết trình hôm nay. Tôi tên là Minh, phụ trách nhóm thiết kế sản phẩm. Trong 10 phút tới, tôi sẽ chia sẻ 3 phát hiện chính từ khảo sát khách hàng và đề xuất các cải tiến thiết thực cho quý tới.',
    keyPhrases: [
      { en: 'Over the next ten minutes', vi: 'Trong 10 phút tới' },
      { en: 'key findings', vi: 'những phát hiện chính' },
      { en: 'practical improvements', vi: 'các cải tiến thiết thực' },
    ],
    question: {
      q: 'How long will the presentation last?',
      options: ['Ten minutes', 'Thirty minutes', 'One hour'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-26',
    level: 'B1',
    category: 'Bài đọc cơ bản',
    title: 'Bài 26: Xu hướng Làm việc Từ xa (Remote Work)',
    sourceStyle: 'VOA Learning English • Technology & Work',
    transcript:
      'Remote work has become much more common in recent years. Working from home saves commuting time and gives employees greater flexibility. However, clear communication and regular online check-ins are essential so that team members stay connected and aligned on project goals.',
    translation:
      'Làm việc từ xa đã trở nên phổ biến hơn rất nhiều trong những năm gần đây. Làm việc tại nhà tiết kiệm thời gian đi lại và mang lại sự linh hoạt cao hơn cho nhân viên. Tuy nhiên, giao tiếp rõ ràng và trao đổi trực tuyến đều đặn là rất cần thiết để các thành viên luôn gắn kết và đồng bộ mục tiêu dự án.',
    keyPhrases: [
      { en: 'commuting time', vi: 'thời gian đi lại' },
      { en: 'greater flexibility', vi: 'sự linh hoạt cao hơn' },
      { en: 'stay connected and aligned', vi: 'luôn gắn kết và đồng bộ' },
    ],
    question: {
      q: 'What is one benefit of remote work mentioned in the text?',
      options: ['Free office lunch', 'Saves commuting time', 'Longer meetings'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-27',
    level: 'B1',
    category: 'Hội thoại đời sống',
    title: 'Bài 27: Xử lý khẩn cấp — Làm mất Hộ chiếu khi đi Du lịch',
    sourceStyle: 'British Council • Travel Emergencies',
    transcript:
      'Excuse me, officer, I think I lost my passport on the train an hour ago. Stay calm, we will help you. First, we need to file a lost property report with your full name and flight details. Then you should contact your embassy immediately to get an emergency travel document.',
    translation:
      'Xin lỗi anh cảnh sát, tôi nghĩ mình đã làm rơi hộ chiếu trên tàu cách đây 1 tiếng. Hãy bình tĩnh, chúng tôi sẽ giúp bạn. Đầu tiên, chúng ta cần lập biên bản báo mất tài sản gồm họ tên đầy đủ và thông tin chuyến bay. Sau đó bạn nên liên hệ đại sứ quán ngay để xin giấy thông hành khẩn cấp.',
    keyPhrases: [
      { en: 'file a lost property report', vi: 'lập biên bản báo mất tài sản' },
      { en: 'contact your embassy', vi: 'liên hệ đại sứ quán' },
      { en: 'emergency travel document', vi: 'giấy thông hành khẩn cấp' },
    ],
    question: {
      q: 'Who should the traveler contact after filing the report?',
      options: ['The hotel manager', 'Their embassy', 'A travel blog'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-28',
    level: 'B1',
    category: 'Giao tiếp công việc',
    title: 'Bài 28: Trao đổi với Khách hàng về Tiến độ',
    sourceStyle: 'BBC Business English • Client Relations',
    transcript:
      'Thank you for your patience while we tested the new system. We are happy to inform you that all security checks passed without any issues. We will send you the final summary report by four PM today so your team can review it before launch.',
    translation:
      'Cảm ơn quý khách đã kiên nhẫn trong lúc chúng tôi kiểm thử hệ thống mới. Chúng tôi vui mừng thông báo mọi bước kiểm tra bảo mật đều đã đạt mà không gặp lỗi nào. Chúng tôi sẽ gửi báo cáo tổng kết cuối cùng trước 4 giờ chiều nay để đội của bạn xem qua trước khi ra mắt.',
    keyPhrases: [
      { en: 'Thank you for your patience', vi: 'Cảm ơn sự kiên nhẫn của bạn' },
      { en: 'security checks passed', vi: 'kiểm tra bảo mật đã đạt' },
      { en: 'before launch', vi: 'trước khi ra mắt' },
    ],
    question: {
      q: 'When will the final summary report be sent?',
      options: ['By 4 PM today', 'Tomorrow morning', 'Next Monday'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-29',
    level: 'B2',
    category: 'Bài đọc cơ bản',
    title: 'Bài 29: Trí tuệ Nhân tạo (AI) hỗ trợ Học tập',
    sourceStyle: 'VOA Technology Report • Education',
    transcript:
      'Artificial intelligence tools are transforming how people learn foreign languages. Learners can now get instant feedback on pronunciation, practice realistic conversations anytime, and receive personalized writing corrections. Nevertheless, human curiosity and daily practice remain the true keys to fluency.',
    translation:
      'Các công cụ trí tuệ nhân tạo đang thay đổi cách mọi người học ngoại ngữ. Người học giờ đây có thể nhận phản hồi phát âm tức thì, luyện hội thoại thực tế bất cứ lúc nào và được sửa bài viết cá nhân hóa. Tuy nhiên, sự tò mò ham học hỏi của con người và luyện tập hàng ngày vẫn là chìa khóa thực sự để nói trôi chảy.',
    keyPhrases: [
      { en: 'instant feedback', vi: 'phản hồi tức thì' },
      { en: 'personalized corrections', vi: 'sửa lỗi cá nhân hóa' },
      { en: 'keys to fluency', vi: 'chìa khóa để trôi chảy' },
    ],
    question: {
      q: 'What remains the true key to fluency according to the passage?',
      options: ['Buying expensive books', 'Human curiosity and daily practice', 'Studying only grammar rules'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-30',
    level: 'B2',
    category: 'Giao tiếp công việc',
    title: 'Bài 30: Thương lượng Hợp đồng & Cam kết Chất lượng',
    sourceStyle: 'BBC • Executive English',
    transcript:
      'From our perspective, a long-term partnership works best when both sides share transparent goals. If we agree on a twelve-month service plan today, we can include priority technical support and quarterly training sessions at no extra cost. Let us know if these terms meet your expectations.',
    translation:
      'Theo góc nhìn của chúng tôi, một mối quan hệ hợp tác lâu dài hiệu quả nhất khi cả hai bên chia sẻ mục tiêu minh bạch. Nếu chúng ta thống nhất gói dịch vụ 12 tháng hôm nay, chúng tôi có thể tặng kèm hỗ trợ kỹ thuật ưu tiên và các buổi đào tạo hàng quý không tính thêm phí. Hãy cho chúng tôi biết nếu các điều khoản này đáp ứng kỳ vọng của bạn.',
    keyPhrases: [
      { en: 'transparent goals', vi: 'mục tiêu minh bạch' },
      { en: 'at no extra cost', vi: 'không tính thêm chi phí' },
      { en: 'meet your expectations', vi: 'đáp ứng kỳ vọng của bạn' },
    ],
    question: {
      q: 'What is included at no extra cost in the twelve-month plan?',
      options: ['Free hardware upgrades', 'Priority support and quarterly training', 'Office rent'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-31',
    level: 'A2',
    category: 'Hội thoại đời sống',
    title: 'Bài 31: Đặt vé Máy bay & Chọn chỗ ngồi',
    sourceStyle: 'British Council • Travel & Booking',
    transcript:
      'Hello, I would like to book a round-trip ticket from Hanoi to Bangkok next Friday. Would you prefer a morning or an evening flight? A morning flight, please. And may I have a window seat? Sure, flight VN six-one-one departs at nine fifteen AM, seat twelve A is available.',
    translation:
      'Xin chào, tôi muốn đặt vé khứ hồi từ Hà Nội đi Bangkok vào thứ Sáu tới. Quý khách thích chuyến bay buổi sáng hay buổi tối? Cho tôi chuyến buổi sáng nhé. Và tôi có thể ngồi ghế cạnh cửa sổ không? Chắc chắn rồi, chuyến VN611 khởi hành lúc 9:15 sáng, ghế 12A hiện còn trống.',
    keyPhrases: [
      { en: 'round-trip ticket', vi: 'vé khứ hồi' },
      { en: 'window seat', vi: 'ghế cạnh cửa sổ' },
      { en: 'departs at...', vi: 'khởi hành lúc...' },
    ],
    question: {
      q: 'What kind of seat does the passenger ask for?',
      options: ['An aisle seat', 'A window seat', 'A business seat'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-32',
    level: 'A2',
    category: 'Hội thoại đời sống',
    title: 'Bài 32: Đổi trả sản phẩm lỗi tại Cửa hàng',
    sourceStyle: 'VOA Learning English • Consumer Skills',
    transcript:
      'Excuse me, I bought these headphones yesterday, but the left side does not work. May I exchange them or get a refund? Of course, let me check your receipt. Everything looks fine. Would you like a brand new replacement? Yes, please, let me test it before I leave.',
    translation:
      'Xin lỗi, hôm qua tôi mua chiếc tai nghe này nhưng bên trái không nghe được. Tôi có thể đổi chiếc mới hoặc hoàn tiền không? Tất nhiên rồi, cho tôi xem hóa đơn của bạn. Mọi thứ đều hợp lệ. Bạn muốn đổi lấy một chiếc mới nguyên hộp chứ? Vâng, cho tôi kiểm tra thử trước khi về nhé.',
    keyPhrases: [
      { en: 'get a refund', vi: 'được hoàn tiền' },
      { en: 'check your receipt', vi: 'kiểm tra hóa đơn' },
      { en: 'brand new replacement', vi: 'sản phẩm thay thế mới' },
    ],
    question: {
      q: 'What is wrong with the headphones?',
      options: ['The color is wrong', 'The left side does not work', 'The box is missing'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-33',
    level: 'A2',
    category: 'Hội thoại đời sống',
    title: 'Bài 33: Đi xem & Thuê Căn hộ mới',
    sourceStyle: 'BBC Learning English • Everyday Accommodation',
    transcript:
      'Welcome! This one-bedroom apartment gets plenty of natural light and comes with a washing machine and air conditioning. How much is the monthly rent? It is five hundred dollars per month, excluding electricity and internet. Are pets allowed in the building? Small cats are fine, as long as neighbors are not disturbed.',
    translation:
      'Chào mừng bạn! Căn hộ một phòng ngủ này có rất nhiều ánh sáng tự nhiên và trang bị sẵn máy giặt, điều hòa. Tiền thuê hàng tháng là bao nhiêu? Giá là 500 đô la mỗi tháng, chưa tính tiền điện và internet. Tòa nhà có cho nuôi thú cưng không? Mèo nhỏ thì được, miễn là không làm phiền hàng xóm.',
    keyPhrases: [
      { en: 'monthly rent', vi: 'tiền thuê hàng tháng' },
      { en: 'excluding electricity', vi: 'không bao gồm tiền điện' },
      { en: 'pets allowed', vi: 'cho phép thú cưng' },
    ],
    question: {
      q: 'What is excluded from the monthly rent?',
      options: ['Washing machine', 'Electricity and internet', 'Air conditioning'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-34',
    level: 'B1',
    category: 'Giao tiếp công việc',
    title: 'Bài 34: Họp Trực tuyến — Kiểm tra Âm thanh & Màn hình',
    sourceStyle: 'BBC • Remote Work English',
    transcript:
      'Hi everyone, can you hear me clearly? Yes, your audio is crisp! Let me share my screen so we can walk through the quarterly roadmap together. Oh, sorry, I think someone is muted while speaking—Lan, could you unmute your microphone? Thanks, now we can hear you loud and clear.',
    translation:
      'Chào mọi người, mọi người có nghe rõ tôi nói không? Có, âm thanh rất nét! Để tôi chia sẻ màn hình để chúng ta cùng xem lộ trình quý nhé. Ôi xin lỗi, hình như có ai đang tắt tiếng khi nói — Lan ơi, bạn bật mic lên nhé? Cảm ơn, giờ nghe rõ ràng rồi.',
    keyPhrases: [
      { en: 'share my screen', vi: 'chia sẻ màn hình' },
      { en: 'walk through', vi: 'đi qua từng phần' },
      { en: 'unmute your microphone', vi: 'bật lại micro' },
    ],
    question: {
      q: 'Why could they not hear Lan at first?',
      options: ['Her internet dropped', 'Her microphone was muted', 'She joined the wrong link'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-35',
    level: 'B1',
    category: 'Hội thoại đời sống',
    title: 'Bài 35: Đặt lịch Khám Nha khoa & Tư vấn',
    sourceStyle: 'British Council • Medical Appointments',
    transcript:
      'Good morning, Smile Dental Clinic. How can I help you? I have had a mild toothache on the right side for two days, and I would like to see a dentist. Can you come in at four PM today for an X-ray and check-up? Yes, four PM works well. Please arrive ten minutes early to fill out a patient form.',
    translation:
      'Chào buổi sáng, Phòng khám Nha khoa Smile xin nghe. Tôi giúp gì được bạn? Tôi bị đau răng nhẹ ở bên phải 2 ngày nay và muốn đặt lịch khám bác sĩ. Bạn đến lúc 4 giờ chiều nay để chụp X-quang và kiểm tra được không? Vâng, 4 giờ chiều rất ổn. Vui lòng đến sớm 10 phút để điền phiếu bệnh nhân nhé.',
    keyPhrases: [
      { en: 'mild toothache', vi: 'đau răng nhẹ' },
      { en: 'arrive ten minutes early', vi: 'đến sớm 10 phút' },
      { en: 'patient form', vi: 'phiếu thông tin bệnh nhân' },
    ],
    question: {
      q: 'Why should the patient arrive ten minutes early?',
      options: ['To pay in cash', 'To fill out a patient form', 'To pick up medicine'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-36',
    level: 'B1',
    category: 'Hội thoại đời sống',
    title: 'Bài 36: Kiểm tra An ninh & Hải quan Sân bay',
    sourceStyle: 'VOA Special English • International Travel',
    transcript:
      'Good afternoon, may I see your passport and customs declaration form? Here you go. What is the purpose of your visit? I am attending a five-day technology conference and doing a little sightseeing. Where will you be staying? At the Central Plaza Hotel downtown. Enjoy your stay!',
    translation:
      'Chào buổi chiều, cho tôi xem hộ chiếu và tờ khai hải quan của bạn? Đây ạ. Mục đích chuyến đi của bạn là gì? Tôi tham dự hội nghị công nghệ 5 ngày và đi tham quan một chút. Bạn sẽ lưu trú ở đâu? Tại khách sạn Central Plaza ở trung tâm thành phố. Chúc bạn có kỳ nghỉ vui vẻ!',
    keyPhrases: [
      { en: 'purpose of your visit', vi: 'mục đích chuyến đi' },
      { en: 'technology conference', vi: 'hội nghị công nghệ' },
      { en: 'Enjoy your stay', vi: 'Chúc lưu trú vui vẻ' },
    ],
    question: {
      q: 'Why is the traveler visiting?',
      options: ['For a conference and sightseeing', 'To start a university degree', 'To visit relatives'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-37',
    level: 'B1',
    category: 'Bài đọc cơ bản',
    title: 'Bài 37: Quản lý Tài chính Cá nhân thông minh',
    sourceStyle: 'VOA Learning English • Smart Money Habits',
    transcript:
      'Managing personal finances becomes much easier when you follow the fifty-thirty-twenty rule. Spend fifty percent of your income on essential needs like housing and food, thirty percent on personal lifestyle choices, and save or invest the remaining twenty percent every month. Small consistent savings build strong financial security over time.',
    translation:
      'Quản lý tài chính cá nhân trở nên dễ dàng hơn nhiều khi bạn áp dụng quy tắc 50-30-20. Chi 50% thu nhập cho nhu cầu thiết yếu như nhà ở và ăn uống, 30% cho phong cách sống cá nhân, và tiết kiệm hoặc đầu tư 20% còn lại mỗi tháng. Những khoản tiết kiệm nhỏ đều đặn tạo nên nền tảng tài chính vững chắc theo thời gian.',
    keyPhrases: [
      { en: 'essential needs', vi: 'nhu cầu thiết yếu' },
      { en: 'save or invest', vi: 'tiết kiệm hoặc đầu tư' },
      { en: 'financial security', vi: 'an toàn tài chính' },
    ],
    question: {
      q: 'What percentage should be saved or invested under this rule?',
      options: ['Fifty percent', 'Thirty percent', 'Twenty percent'],
      correctIdx: 2,
    },
  },
  {
    id: 'lr-38',
    level: 'B1',
    category: 'Giao tiếp công việc',
    title: 'Bài 38: Tổng kết Cuộc họp & Phân công Việc',
    sourceStyle: 'BBC • Business Meetings',
    transcript:
      'Before we wrap up today’s meeting, let’s quickly confirm our action items. Minh will finalize the user interface mockups by Wednesday afternoon, while Lan will prepare the client presentation deck by Thursday morning. I will send everyone the meeting notes right after this call. Any questions before we finish?',
    translation:
      'Trước khi kết thúc cuộc họp hôm nay, hãy chốt nhanh các đầu việc cần làm. Minh sẽ hoàn thiện bản mẫu giao diện vào chiều thứ Tư, còn Lan chuẩn bị bộ slide thuyết trình khách hàng trước sáng thứ Năm. Tôi sẽ gửi biên bản cuộc họp cho mọi người ngay sau buổi gọi này. Có câu hỏi nào trước khi nghỉ không?',
    keyPhrases: [
      { en: 'wrap up the meeting', vi: 'kết thúc cuộc họp' },
      { en: 'action items', vi: 'các đầu việc cần triển khai' },
      { en: 'meeting notes', vi: 'biên bản cuộc họp' },
    ],
    question: {
      q: 'When will Lan finish the client presentation deck?',
      options: ['Wednesday afternoon', 'Thursday morning', 'Friday evening'],
      correctIdx: 1,
    },
  },
  {
    id: 'lr-39',
    level: 'B2',
    category: 'Giao tiếp công việc',
    title: 'Bài 39: Đàm phán Mức lương & Phúc lợi Khi Nhận Việc',
    sourceStyle: 'British Council • Career Negotiation',
    transcript:
      'We are delighted to offer you the Senior Analyst position with a starting salary of two thousand dollars per month. Thank you very much for the offer! Given my five years of relevant experience and analytics certification, would there be flexibility to adjust the base salary to two thousand three hundred dollars, or include a quarterly performance bonus?',
    translation:
      'Chúng tôi rất vui được mời bạn vào vị trí Chuyên viên Phân tích Cấp cao với mức lương khởi điểm 2.000 đô la mỗi tháng. Cảm ơn quý công ty rất nhiều vì lời mời! Với 5 năm kinh nghiệm liên quan và chứng chỉ phân tích dữ liệu, công ty có thể linh hoạt điều chỉnh lương cơ bản lên 2.300 đô la hoặc bổ sung thưởng hiệu suất hàng quý không ạ?',
    keyPhrases: [
      { en: 'starting salary', vi: 'mức lương khởi điểm' },
      { en: 'relevant experience', vi: 'kinh nghiệm liên quan' },
      { en: 'performance bonus', vi: 'thưởng theo hiệu suất' },
    ],
    question: {
      q: 'How does the candidate support the salary request?',
      options: ['By mentioning five years of experience', 'By refusing the offer immediately', 'By asking for extra vacation'],
      correctIdx: 0,
    },
  },
  {
    id: 'lr-40',
    level: 'B2',
    category: 'Bài đọc cơ bản',
    title: 'Bài 40: Kỹ năng Giao tiếp Thuyết phục Đa văn hóa',
    sourceStyle: 'BBC & VOA • Global Communication',
    transcript:
      'Working in an international team requires more than just accurate grammar. Cultural awareness plays a vital role in building mutual respect. For instance, while direct feedback is appreciated in some countries, softer diplomatic phrasing works better in others. Listening attentively and asking clarifying questions prevents costly misunderstandings.',
    translation:
      'Làm việc trong một đội ngũ quốc tế đòi hỏi nhiều hơn là chỉ đúng ngữ pháp. Sự thấu hiểu văn hóa đóng vai trò thiết yếu trong việc xây dựng sự tôn trọng lẫn nhau. Ví dụ, trong khi góp ý thẳng thắn được đánh giá cao ở một số nước, cách diễn đạt khéo léo mềm mỏng lại hiệu quả hơn ở nơi khác. Lắng nghe chăm chú và đặt câu hỏi làm rõ giúp tránh những hiểu lầm tốn kém.',
    keyPhrases: [
      { en: 'cultural awareness', vi: 'nhận thức đa văn hóa' },
      { en: 'diplomatic phrasing', vi: 'cách diễn đạt khéo léo' },
      { en: 'clarifying questions', vi: 'câu hỏi làm rõ' },
    ],
    question: {
      q: 'What prevents costly misunderstandings in international teams?',
      options: ['Speaking as fast as possible', 'Listening attentively and asking clarifying questions', 'Avoiding all feedback'],
      correctIdx: 1,
    },
  },
];

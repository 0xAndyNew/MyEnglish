import { CefrLevel } from '../types/learning';

export interface GrammarQuizItem {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export interface SentenceDrill {
  vi: string;
  en: string;
}

export interface FormulaRow {
  label?: string;
  code: string;
  note: string;
}

export interface GrammarLesson {
  id: string;
  level: CefrLevel;
  title: string;
  posKey?: 'n' | 'v' | 'adj' | 'adv';
  focusTerms: string[];
  purpose: string;
  signals: string;
  formula: string;
  formulaRows?: FormulaRow[];
  explanation: string;
  commonMistake: string;
  correction: string;
  examples: { en: string; vi: string }[];
  sentenceDrills: SentenceDrill[];
  quiz: GrammarQuizItem[];
}

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    id: 'gl-noun',
    level: 'A1',
    posKey: 'n',
    focusTerms: ['teacher', 'book', 'office', 'Communication', 'trust', 'information', 'investment', 'opportunity', '-tion', '-ment', '-ness', '-er', '-or', '-ity', '-s', '-es', 'books', 'teachers', 'N'],
    title: 'Bài 1: Danh Từ (Noun — ký hiệu: n)',
    purpose: 'Gọi tên người, sự vật, đồ vật, địa điểm, thời gian hoặc khái niệm.',
    signals: 'Đuôi thường gặp: -tion (information), -ment (investment), -ness, -er/-or (teacher), -ity (opportunity).',
    formula: 'N số ít | N + -s / -es | N không đếm được',
    formulaRows: [
      { label: 'Số ít', code: 'Danh từ số ít (1)', note: 'Chỉ 1 người, 1 vật, 1 nơi chốn (vd: teacher, book, office)' },
      { label: 'Số nhiều', code: 'N + -s / -es (≥ 2)', note: 'Từ 2 trở lên thêm -s hoặc -es (vd: books, teachers, boxes)' },
      { label: 'Không đếm được', code: 'N không thêm -s / -es', note: 'Chất lỏng, khái niệm trừu tượng (vd: water, coffee, information, trust)' },
    ],
    explanation:
      'Danh từ là từ dùng để gọi tên người, đồ vật, địa điểm hoặc khái niệm. Khi nhận biết Danh từ, hãy chú ý các đuôi phổ biến (-tion, -ment, -ness, -er/-or, -ity) và phân biệt dạng số ít, số nhiều (-s/-es) hay không đếm được.',
    commonMistake: '❌ I have two book. / She is teacher.',
    correction: '✅ I have two books. / She is a teacher. (Danh từ đếm được số ít phải có a/an!)',
    examples: [
      { en: 'The teacher is reading a book in the office.', vi: 'Giáo viên đang đọc một quyển sách trong văn phòng.' },
      { en: 'Communication builds trust.', vi: 'Giao tiếp xây dựng nên sự tin tưởng.' },
    ],
    sentenceDrills: [
      { vi: 'Tôi có một quyển sách mới.', en: 'I have a new book' },
      { vi: 'Giáo viên đang ở trong văn phòng.', en: 'The teacher is in the office' },
      { vi: 'Gia đình tôi yêu thích âm nhạc.', en: 'My family loves music' },
    ],
    quiz: [
      { q: 'Từ nào sau đây là Danh từ (Noun)?', options: ['quickly', 'teacher', 'happy'], correct: 1, explain: '"teacher" (giáo viên) chỉ người → là Danh từ.' },
      { q: 'Đuôi nào sau đây là dấu hiệu nhận biết Danh từ?', options: ['-tion (information)', '-ly (quickly)', '-ful (wonderful)'], correct: 0, explain: 'Các từ kết thúc bằng -tion, -ment, -ity thường là Danh từ.' },
      { q: 'Chọn câu đúng ngữ pháp:', options: ['I have a new computer.', 'I have new computer.', 'I have a new computers.'], correct: 0, explain: 'Danh từ đếm được số ít "computer" cần có mạo từ "a" đứng trước.' },
      { q: 'Trong câu "She drinks coffee every morning", đâu là Danh từ?', options: ['She', 'drinks', 'coffee'], correct: 2, explain: '"coffee" (cà phê) là đồ vật/thức uống → Danh từ.' },
      { q: 'Từ nào là Danh từ chỉ khái niệm?', options: ['opportunity', 'collaborate', 'confident'], correct: 0, explain: '"opportunity" (cơ hội, đuôi -ity) là Danh từ.' },
      { q: 'Chọn dạng số nhiều đúng của "book":', options: ['a books', 'two books', 'two book'], correct: 1, explain: 'Số lượng từ 2 trở lên phải dùng danh từ số nhiều thêm -s (two books).' },
    ],
  },
  {
    id: 'gl-verb',
    level: 'A1',
    posKey: 'v',
    focusTerms: ['am / is / are', 'am', 'is', 'are', 'to be', 'learn', 'practice', 'collaborate', '-ize', '-ate', '-fy', 'V'],
    title: 'Bài 2: Động Từ (Verb — ký hiệu: v)',
    purpose: 'Diễn tả hành động (học, nói, viết, đi) hoặc trạng thái (là, cảm thấy, trở thành).',
    signals: 'Đuôi thường gặp: -ize (prioritize, optimize), -ate (collaborate), -fy (clarify) hoặc động từ ngắn gốc.',
    formula: 'Động từ hành động (V) | Động từ "to be" (am / is / are)',
    formulaRows: [
      { label: 'Hành động', code: 'Động từ hành động (V)', note: 'Chỉ việc làm, hoạt động có thể thực hiện (vd: learn, work, read, collaborate)' },
      { label: 'Trạng thái', code: 'to be: am / is / are', note: 'Chỉ trạng thái "là / thì / ở" khi không có động từ hành động (vd: am happy, is a book)' },
    ],
    explanation:
      'Động từ là từ chỉ hành động hoặc trạng thái. Khi nhận biết Động từ, hãy phân biệt Động từ hành động (learn, practice, optimize...) với động từ trạng thái "to be" (am / is / are) và chú ý các đuôi động từ thường gặp (-ize, -ate, -fy).',
    commonMistake: '❌ I very happy. (Thiếu động từ) / He work hard.',
    correction: '✅ I am very happy. / He works hard.',
    examples: [
      { en: 'We learn and practice English every day.', vi: 'Chúng tôi học và luyện tập tiếng Anh mỗi ngày.' },
      { en: 'They collaborate closely on this project.', vi: 'Họ hợp tác chặt chẽ trong dự án này.' },
    ],
    sentenceDrills: [
      { vi: 'Tôi học tiếng Anh mỗi ngày.', en: 'I learn English every day' },
      { vi: 'Chúng tôi làm việc trong một văn phòng.', en: 'We work in an office' },
      { vi: 'Cô ấy rất vui hôm nay.', en: 'She is very happy today' },
    ],
    quiz: [
      { q: 'Trong câu "She writes an email", từ nào là Động từ?', options: ['She', 'writes', 'email'], correct: 1, explain: '"writes" (viết) là từ chỉ hành động → Động từ.' },
      { q: 'Từ nào dưới đây là Động từ?', options: ['confident', 'optimize', 'happiness'], correct: 1, explain: '"optimize" (tối ưu hóa, đuôi -ize) là Động từ.' },
      { q: 'Chọn câu có đủ Động từ chuẩn ngữ pháp:', options: ['This book very useful.', 'This book is very useful.', 'This book useful.'], correct: 1, explain: 'Trước tính từ "useful" bắt buộc phải có động từ "to be" (is).' },
      { q: 'Đuôi nào thường là dấu hiệu của Động từ?', options: ['-ize / -ate', '-tion / -ment', '-ly'], correct: 0, explain: 'Các từ đuôi -ize (prioritize), -ate (collaborate) thường là Động từ.' },
      { q: 'Trong câu "I am a student", đâu là Động từ?', options: ['I', 'am', 'student'], correct: 1, explain: '"am" là động từ to be nối Chủ ngữ với Danh từ.' },
      { q: 'Chọn từ chỉ hành động:', options: ['understand', 'solution', 'important'], correct: 0, explain: '"understand" (hiểu) là Động từ.' },
    ],
  },
  {
    id: 'gl-adj',
    level: 'A1',
    posKey: 'adj',
    focusTerms: ['comfortable', 'confident', 'happy', 'red car', 'confident speaker', '-ful', '-ous', '-able', '-ive', '-ent', 'to be'],
    title: 'Bài 3: Tính Từ (Adjective — ký hiệu: adj)',
    purpose: 'Mô tả tính chất, màu sắc, kích thước, cảm xúc hoặc đặc điểm của Danh từ.',
    signals: 'Đuôi thường gặp: -ful (wonderful), -ous (ambitious), -able (comfortable), -ive (effective), -ent (confident).',
    formula: 'Adj + N | to be + Adj',
    formulaRows: [
      { label: 'Trước Danh từ', code: 'Adj + N', note: 'Tính từ đứng TRƯỚC Danh từ để mô tả (vd: a comfortable chair, a red car)' },
      { label: 'Sau to be', code: 'am / is / are + Adj', note: 'Tính từ đứng SAU động từ to be (vd: is happy, is confident)' },
    ],
    explanation:
      'Khác với tiếng Việt ("xe đỏ" — danh từ trước, tính từ sau), trong tiếng Anh Tính từ LUÔN ĐỨNG TRƯỚC Danh từ ("a red car") hoặc đứng SAU động từ "to be" (am/is/are).',
    commonMistake: '❌ A car red. / A speaker confident.',
    correction: '✅ A red car. / A confident speaker.',
    examples: [
      { en: 'This is a comfortable chair.', vi: 'Đây là một chiếc ghế êm ái. (Adj + N)' },
      { en: 'Our team is very confident today.', vi: 'Đội của chúng tôi hôm nay rất tự tin. (to be + Adj)' },
    ],
    sentenceDrills: [
      { vi: 'Đây là một bài học quan trọng.', en: 'This is an important lesson' },
      { vi: 'Tôi có một chiếc xe màu đỏ.', en: 'I have a red car' },
      { vi: 'Cà phê nóng thì rất ngon.', en: 'Hot coffee is very delicious' },
    ],
    quiz: [
      { q: 'Chọn cụm từ đúng trật tự Tính từ + Danh từ:', options: ['A book good', 'A good book', 'A book well'], correct: 1, explain: 'Tính từ (good) luôn đứng TRƯỚC danh từ (book).' },
      { q: 'Từ nào là Tính từ?', options: ['comfortable', 'comfortably', 'collaborate'], correct: 0, explain: '"comfortable" (thoải mái, đuôi -able) là Tính từ.' },
      { q: 'Đặt tính từ "important" đúng vị trí:', options: ['This is an important lesson.', 'This is a lesson important.', 'This is importantly lesson.'], correct: 0, explain: 'Tính từ "important" đứng trước Danh từ "lesson".' },
      { q: 'Trong câu "She looks happy", từ "happy" là loại từ gì?', options: ['Danh từ', 'Tính từ', 'Trạng từ'], correct: 1, explain: '"happy" (vui vẻ) mô tả cảm xúc của "She" → Tính từ.' },
      { q: 'Đuôi nào thường là dấu hiệu của Tính từ?', options: ['-ful / -able / -ive', '-tion / -ment', '-ly'], correct: 0, explain: 'wonderful, comfortable, effective đều là Tính từ.' },
      { q: 'Chọn câu đúng:', options: ['It is a day sunny.', 'It is a sunny day.', 'It is a sun day.'], correct: 1, explain: 'Tính từ "sunny" đứng trước danh từ "day".' },
    ],
  },
  {
    id: 'gl-adv',
    level: 'A1',
    posKey: 'adv',
    focusTerms: ['quickly', 'carefully', 'well', 'good', '-ly', 'speaks English well', 'very happy'],
    title: 'Bài 4: Trạng Từ (Adverb — ký hiệu: adv)',
    purpose: 'Mô tả cách thức hành động (nhanh, chậm, cẩn thận), tần suất (luôn luôn) hoặc mức độ (rất).',
    signals: 'Thường ghép Tính từ + "-ly" (quick → quickly, careful → carefully). Ngoại lệ: good → well.',
    formula: 'Adj + -ly → Adv | V + Adv | Adv + Adj',
    formulaRows: [
      { label: 'Cách tạo', code: 'Adj + -ly → Adv', note: 'Thường thêm -ly sau Tính từ (quick → quickly, careful → carefully; ngoại lệ: good → well)' },
      { label: 'Vị trí', code: 'V + Adv  |  Adv + Adj', note: 'Bổ nghĩa cho Động từ (learns quickly) hoặc đứng trước Tính từ (very happy)' },
    ],
    explanation:
      'Trạng từ dùng để bổ nghĩa cho Động từ (làm việc như thế nào?) hoặc bổ nghĩa cho Tính từ (rất đẹp, cực kỳ quan trọng). Không dùng Tính từ để bổ nghĩa cho Động từ thường!',
    commonMistake: '❌ He speaks English good. / Listen careful!',
    correction: '✅ He speaks English well. / Listen carefully!',
    examples: [
      { en: 'He learns English quickly.', vi: 'Anh ấy học tiếng Anh rất nhanh. (V + Adv)' },
      { en: 'Please listen carefully to the audio.', vi: 'Vui lòng lắng nghe kỹ đoạn âm thanh.' },
    ],
    sentenceDrills: [
      { vi: 'Cô ấy nói tiếng Anh rất trôi chảy.', en: 'She speaks English fluently' },
      { vi: 'Hãy đọc câu này một cách chậm rãi.', en: 'Please read this sentence slowly' },
      { vi: 'Anh ấy làm việc rất chăm chỉ.', en: 'He works very hard' },
    ],
    quiz: [
      { q: 'Từ "carefully" trong câu "Listen carefully!" là từ loại gì?', options: ['Danh từ (N)', 'Tính từ (Adj)', 'Trạng từ (Adv)'], correct: 2, explain: '"carefully" bổ nghĩa cho động từ "Listen" và có đuôi -ly → Trạng từ.' },
      { q: 'Chọn câu đúng ngữ pháp:', options: ['She speaks English well.', 'She speaks English good.', 'She well speaks.'], correct: 0, explain: 'Dùng trạng từ "well" (không dùng tính từ "good") để bổ nghĩa cho động từ "speaks".' },
      { q: 'Chuyển tính từ "slow" (chậm) thành Trạng từ:', options: ['slowly', 'slowness', 'slower'], correct: 0, explain: 'Thêm đuôi -ly vào tính từ "slow" → Trạng từ "slowly".' },
      { q: 'Từ nào là ngoại lệ (không thêm -ly) của "good"?', options: ['goodly', 'well', 'bestly'], correct: 1, explain: 'Tính từ "good" → Trạng từ là "well".' },
      { q: 'Trong câu "I always wake up early", từ "always" là gì?', options: ['Trạng từ tần suất', 'Danh từ', 'Tính từ'], correct: 0, explain: '"always" (luôn luôn) là Trạng từ chỉ tần suất.' },
      { q: 'Chọn câu đúng:', options: ['He drives careful.', 'He drives carefully.', 'He carefully drive.'], correct: 1, explain: 'Bổ nghĩa cho động từ "drives" phải dùng Trạng từ "carefully".' },
    ],
  },
  {
    id: 'gl-article',
    level: 'A1',
    focusTerms: ['a', 'an', 'the', 'The', 'a / an', 'u, e, o, a, i', 'an apple', 'a book', 'the sun'],
    title: 'Bài 5: Mạo Từ (Articles: a / an / the)',
    purpose: 'Xác định danh từ đếm được số ít là chưa xác định (một cái bất kỳ: a/an) hay đã xác định rõ (cái đó: the).',
    signals: 'Đứng ngay trước Danh từ (hoặc trước Tính từ + Danh từ): a book, an orange, the sun.',
    formula: 'a + N | an + N | the + N',
    formulaRows: [
      { label: 'a', code: 'a + N (phụ âm)', note: '1 đối tượng chưa xác định, bắt đầu bằng âm phụ âm (vd: a book)' },
      { label: 'an', code: 'an + N (u, e, o, a, i)', note: '1 đối tượng chưa xác định, bắt đầu bằng âm nguyên âm (vd: an apple, an hour)' },
      { label: 'the', code: 'the + N', note: 'Đối tượng đã xác định rõ hoặc là duy nhất (vd: the book on the table, the sun)' },
    ],
    explanation:
      'Dùng "a" hoặc "an" với danh từ đếm được số ít khi nhắc đến lần đầu ("an" đứng trước âm nguyên âm u, e, o, a, i — ví dụ: an hour, an apple). Dùng "the" khi cả người nói và người nghe đều biết rõ vật nào, hoặc vật duy nhất (the sun, the moon). Không dùng a/an với danh từ số nhiều hoặc không đếm được!',
    commonMistake: '❌ I have a apple. / She drinks a water. / Sun is hot.',
    correction: '✅ I have an apple. / She drinks water. / The sun is hot.',
    examples: [
      { en: 'I bought a new book and an umbrella yesterday.', vi: 'Hôm qua tôi đã mua một cuốn sách mới và một cái ô.' },
      { en: 'The book on the table is very interesting.', vi: 'Cuốn sách ở trên bàn rất thú vị. (Đã xác định rõ)' },
    ],
    sentenceDrills: [
      { vi: 'Tôi ăn một quả táo mỗi sáng.', en: 'I eat an apple every morning' },
      { vi: 'Cô ấy là một bác sĩ giỏi.', en: 'She is a good doctor' },
      { vi: 'Mặt trời rất sáng hôm nay.', en: 'The sun is very bright today' },
    ],
    quiz: [
      { q: 'Chọn mạo từ đúng: "She has ___ orange."', options: ['a', 'an', 'the'], correct: 1, explain: '"orange" bắt đầu bằng nguyên âm "o" → dùng "an".' },
      { q: 'Chọn mạo từ đúng: "He is ___ teacher."', options: ['a', 'an', 'không dùng'], correct: 0, explain: '"teacher" là nghề nghiệp đếm được số ít, bắt đầu bằng phụ âm /t/ → dùng "a".' },
      { q: 'Khi nào dùng mạo từ "the"?', options: ['Khi nhắc đến lần đầu bất kỳ', 'Khi danh từ đã xác định rõ hoặc là duy nhất', 'Chỉ dùng trước động từ'], correct: 1, explain: '"the" dùng cho đối tượng đã xác định rõ hoặc duy nhất (the sun, the earth...).' },
      { q: 'Chọn câu đúng ngữ pháp:', options: ['I need a water.', 'I need an water.', 'I need some water.'], correct: 2, explain: '"water" là danh từ không đếm được → KHÔNG dùng "a" hay "an".' },
      { q: 'Chọn mạo từ đúng: "Wait for ___ hour." (hour đọc là /ˈaʊər/, âm "h" câm)', options: ['a', 'an', 'the'], correct: 1, explain: '"hour" phát âm bắt đầu bằng nguyên âm /aʊ/ (âm h câm) → dùng "an hour".' },
      { q: 'Chọn câu đúng:', options: ['The moon looks bright tonight.', 'A moon looks bright tonight.', 'An moon looks bright tonight.'], correct: 0, explain: 'Mặt trăng là duy nhất → dùng "The moon".' },
    ],
  },
  {
    id: 'gl-2',
    level: 'A1',
    focusTerms: ['S + V', 'am / is / are', 'to be', 'learn', 'are', 'friendly', 'at home', 'every evening'],
    title: 'Bài 6: Cấu Trúc Câu Đơn (S + V + O)',
    purpose: 'Ghép các từ vựng đơn lẻ thành một câu hoàn chỉnh có nghĩa rõ ràng.',
    signals: 'Luôn có Chủ ngữ (S) đứng đầu + Động từ (V) + Tân ngữ (O) + Nơi chốn + Thời gian.',
    formula: 'S + V + O + Nơi chốn + Thời gian',
    formulaRows: [
      { code: 'S + V + O + Nơi chốn + Thời gian', note: 'Trật tự chuẩn của 1 câu đơn tiếng Anh (vd: I learn English at home every evening)' },
      { code: 'S + am / is / are + Adj', note: 'Câu mô tả tính chất bắt buộc có động từ to be ở giữa' },
    ],
    explanation:
      'Khác với tiếng Việt hay bỏ chủ ngữ hoặc thiếu "to be" trước tính từ, câu tiếng Anh chuẩn luôn phải có S + V. Nếu câu dùng tính từ (happy, tired), bắt buộc phải có "am / is / are".',
    commonMistake: '❌ I very happy. / I every morning drink coffee.',
    correction: '✅ I am very happy. / I drink coffee every morning.',
    examples: [
      { en: 'I learn English at home every evening.', vi: 'Tôi học tiếng Anh ở nhà mỗi tối.' },
      { en: 'They are very friendly.', vi: 'Họ rất thân thiện.' },
    ],
    sentenceDrills: [
      { vi: 'Tôi uống cà phê ở nhà mỗi sáng.', en: 'I drink coffee at home every morning' },
      { vi: 'Anh ấy đọc sách trong phòng mỗi tối.', en: 'He reads books in the room every evening' },
      { vi: 'Chúng tôi rất tự tin hôm nay.', en: 'We are very confident today' },
    ],
    quiz: [
      { q: 'Chọn câu đúng cấu trúc S + V + O + Thời gian:', options: ['I every day read books.', 'I read books every day.', 'Read books I every day.'], correct: 1, explain: 'Thời gian (every day) đặt ở cuối câu sau S + V + O.' },
      { q: 'Sửa câu "She very confident" cho đúng:', options: ['She is very confident.', 'She are very confident.', 'She very is confident.'], correct: 0, explain: 'Trước tính từ "confident" phải có động từ to be "is" (đi với She).' },
      { q: 'Trong câu "We drink coffee at a cafe", đâu là Tân ngữ (O)?', options: ['We', 'drink', 'coffee'], correct: 2, explain: '"We" là Chủ ngữ, "drink" là Động từ, "coffee" là Tân ngữ chịu tác động.' },
      { q: 'Thứ tự đúng ở cuối câu là gì?', options: ['Thời gian trước Nơi chốn', 'Nơi chốn trước Thời gian', 'Đứng trước Chủ ngữ'], correct: 1, explain: 'Tiếng Anh thường đặt Nơi chốn (at home) trước Thời gian (every evening).' },
      { q: 'Chọn câu đúng:', options: ['My friend is kind.', 'My friend kind.', 'Is my friend kind.'], correct: 0, explain: 'Câu khẳng định phải có S + to be + Adj.' },
      { q: 'Từ nào làm Chủ ngữ (S) trong "The dog runs fast"?', options: ['The dog', 'runs', 'fast'], correct: 0, explain: '"The dog" thực hiện hành động chạy → Chủ ngữ.' },
    ],
  },
  {
    id: 'gl-3',
    level: 'A1',
    focusTerms: ['every day', 'always', 'usually', 'often', 'sometimes', 'never', '-s', '-es', 'works', 'goes', 'watches', 'do/does', 'practice'],
    title: 'Bài 7: Thì 1 — Hiện Tại Đơn (Present Simple)',
    purpose: 'Diễn tả thói quen lặp lại hàng ngày, lịch trình cố định hoặc sự thật hiển nhiên.',
    signals: 'every day, always, usually, often, sometimes, never.',
    formula: 'Khẳng định: S + V(s/es) | Phủ định: S + do/does not + V | Hỏi: Do/Does + S + V?',
    formulaRows: [
      { label: 'Khẳng định', code: 'S + V(s/es)', note: 'I/You/We/They giữ nguyên V; He/She/It thêm -s/-es (works, goes)' },
      { label: 'Phủ định', code: 'S + do / does + not + V', note: 'Mượn trợ động từ do/does, động từ chính quay về nguyên mẫu' },
      { label: 'Hỏi', code: 'Do / Does + S + V?', note: 'Đảo Do/Does lên đầu câu trước Chủ ngữ' },
    ],
    explanation:
      'Với I/You/We/They giữ nguyên động từ. Với He/She/It phải thêm -s hoặc -es vào động từ (works, goes, watches). Khi phủ định hoặc hỏi dùng trợ động từ do/does.',
    commonMistake: '❌ He work in an office. / She don\'t like tea.',
    correction: '✅ He works in an office. / She doesn\'t like tea.',
    examples: [
      { en: 'I practice English every day.', vi: 'Tôi luyện tiếng Anh mỗi ngày.' },
      { en: 'He works at a software company.', vi: 'Anh ấy làm việc tại một công ty phần mềm.' },
    ],
    sentenceDrills: [
      { vi: 'Cô ấy uống trà mỗi sáng.', en: 'She drinks tea every morning' },
      { vi: 'Tôi luôn thức dậy sớm.', en: 'I always wake up early' },
      { vi: 'Anh ấy không thích cà phê.', en: 'He does not like coffee' },
    ],
    quiz: [
      { q: 'Chọn câu đúng ở thì Hiện tại đơn:', options: ['My brother live in Hanoi.', 'My brother lives in Hanoi.', 'My brother living in Hanoi.'], correct: 1, explain: 'My brother (ngôi số ít = He) → động từ phải thêm -s (lives).' },
      { q: 'Điền trợ động từ đúng: "___ she like coffee?"', options: ['Do', 'Does', 'Is'], correct: 1, explain: 'Câu hỏi với động từ thường "like" và chủ ngữ "she" dùng "Does".' },
      { q: 'Khi nào dùng thì Hiện tại đơn?', options: ['Việc đang xảy ra ngay lúc nói', 'Thói quen hàng ngày & sự thật', 'Việc đã kết thúc hôm qua'], correct: 1, explain: 'Hiện tại đơn dùng cho thói quen lặp lại và sự thật hiển nhiên.' },
      { q: 'Chọn câu phủ định đúng:', options: ['He don\'t work here.', 'He doesn\'t work here.', 'He doesn\'t works here.'], correct: 1, explain: 'He dùng doesn\'t + động từ nguyên mẫu (work).' },
      { q: 'Chia động từ "go" với chủ ngữ "She":', options: ['gos', 'goes', 'going'], correct: 1, explain: 'Động từ kết thúc bằng -o thêm -es → goes.' },
      { q: 'Mặt trời mọc ở đằng Đông thuộc thì nào?', options: ['Hiện tại đơn (sự thật)', 'Quá khứ đơn', 'Tương lai đơn'], correct: 0, explain: 'Sự thật hiển nhiên dùng Hiện tại đơn.' },
    ],
  },
  {
    id: 'gl-4',
    level: 'A1',
    focusTerms: ['now', 'right now', 'at the moment', 'today', 'Look!', 'Listen!', 'am listening', 'are having', 'am/is/are', '-ing'],
    title: 'Bài 8: Thì 2 — Hiện Tại Tiếp Diễn (Present Continuous)',
    purpose: 'Diễn tả hành động ĐANG diễn ra ngay tại thời điểm nói hoặc xung quanh hiện tại.',
    signals: 'now, right now, at the moment, today, Look!, Listen!',
    formula: 'S + am / is / are + V-ing | Phủ định: S + am/is/are + not + V-ing',
    formulaRows: [
      { label: 'Khẳng định', code: 'S + am / is / are + V-ing', note: 'I + am | He/She/It + is | You/We/They + are' },
      { label: 'Phủ định', code: 'S + am / is / are + not + V-ing', note: 'Thêm "not" ngay sau am / is / are' },
      { label: 'Hỏi', code: 'Am / Is / Are + S + V-ing?', note: 'Đảo am / is / are lên đầu câu' },
    ],
    explanation:
      'Bắt buộc phải có đủ cả 2 thành phần: động từ to be (am/is/are) VÀ động từ đuôi -ing. Không được thiếu to be!',
    commonMistake: '❌ I learning English now. (Thiếu "am")',
    correction: '✅ I am learning English now.',
    examples: [
      { en: 'I am listening to an English podcast right now.', vi: 'Ngay lúc này tôi đang nghe một podcast tiếng Anh.' },
      { en: 'They are having a meeting at the moment.', vi: 'Họ đang họp vào lúc này.' },
    ],
    sentenceDrills: [
      { vi: 'Ngay lúc này tôi đang học tiếng Anh.', en: 'I am learning English right now' },
      { vi: 'Họ đang ăn trưa vào lúc này.', en: 'They are having lunch at the moment' },
      { vi: 'Cô ấy đang viết một email.', en: 'She is writing an email' },
    ],
    quiz: [
      { q: 'Điền vào chỗ trống: "Listen! Someone ___ at the door."', options: ['knocks', 'is knocking', 'knocked'], correct: 1, explain: 'Có dấu hiệu "Listen!" (ngay lúc này) → dùng Hiện tại tiếp diễn (is knocking).' },
      { q: 'Chọn câu đúng:', options: ['We are studying English now.', 'We studying English now.', 'We is studying English now.'], correct: 0, explain: 'We đi với "are" + V-ing (studying).' },
      { q: 'Dấu hiệu nào thuộc thì Hiện tại tiếp diễn?', options: ['yesterday, ago', 'right now, at the moment', 'every week'], correct: 1, explain: '"right now, at the moment" chỉ hành động đang diễn ra ngay lúc nói.' },
      { q: 'Chọn câu sai ngữ pháp:', options: ['I am working today.', 'He is reading a book.', 'She cooking dinner now.'], correct: 2, explain: '"She cooking" thiếu động từ to be "is".' },
      { q: 'Chia động từ "run" sang V-ing:', options: ['runing', 'running', 'runs'], correct: 1, explain: 'run gấp đôi phụ âm n → running.' },
      { q: 'Câu "Are you waiting for the bus?" thuộc thì nào?', options: ['Hiện tại đơn', 'Hiện tại tiếp diễn', 'Quá khứ đơn'], correct: 1, explain: 'Cấu trúc Are + S + V-ing là Hiện tại tiếp diễn.' },
    ],
  },
  {
    id: 'gl-5',
    level: 'A2',
    focusTerms: ['yesterday', 'last night', 'last month', 'ago', 'visited', 'did not sleep', "did / didn't", '-ed', 'went', 'saw', 'bought'],
    title: 'Bài 9: Thì 3 — Quá Khứ Đơn (Past Simple)',
    purpose: 'Kể lại sự việc ĐÃ XẢY RA và KẾT THÚC hoàn toàn trong quá khứ.',
    signals: 'yesterday, last night/week/month, ... ago, in 2020.',
    formula: 'S + V2/ed | Phủ định: S + did not (didn\'t) + V nguyên mẫu | Hỏi: Did + S + V?',
    formulaRows: [
      { label: 'Khẳng định', code: 'S + V2 / V-ed', note: 'Có quy tắc thêm -ed (worked); bất quy tắc dùng cột 2 (went, saw, bought)' },
      { label: 'Phủ định', code: 'S + did not (didn\'t) + V', note: 'Đã có didn\'t thì động từ chính quay về nguyên mẫu' },
      { label: 'Hỏi', code: 'Did + S + V?', note: 'Đảo Did lên đầu câu, động từ giữ nguyên mẫu' },
    ],
    explanation:
      'Động từ có quy tắc thêm -ed (worked, played), bất quy tắc dùng cột 2 (go → went, see → saw, buy → bought). Lưu ý: đã có "did / didn\'t" thì động từ quay về nguyên mẫu!',
    commonMistake: '❌ Yesterday I go to work. / Did you went there?',
    correction: '✅ Yesterday I went to work. / Did you go there?',
    examples: [
      { en: 'We visited Hanoi last month.', vi: 'Chúng tôi đã thăm Hà Nội tháng trước.' },
      { en: 'I did not sleep well last night.', vi: 'Tối qua tôi ngủ không ngon.' },
    ],
    sentenceDrills: [
      { vi: 'Hôm qua tôi đã đi đến sân bay.', en: 'Yesterday I went to the airport' },
      { vi: 'Chúng tôi đã hoàn thành dự án tuần trước.', en: 'We finished the project last week' },
      { vi: 'Bạn có xem bộ phim đó tối qua không?', en: 'Did you watch that movie last night' },
    ],
    quiz: [
      { q: 'Chọn câu đúng ở thì Quá khứ đơn:', options: ['I went to the market yesterday.', 'I go to the market yesterday.', 'I am going yesterday.'], correct: 0, explain: 'Có "yesterday" dùng Quá khứ đơn: go → went.' },
      { q: 'Chọn câu hỏi đúng:', options: ['Did you finished the report?', 'Did you finish the report?', 'Do you finished the report?'], correct: 1, explain: 'Sau trợ động từ "Did", động từ luôn giữ nguyên mẫu (finish).' },
      { q: 'Dạng quá khứ của động từ "buy" (mua) là gì?', options: ['buyed', 'bought', 'buys'], correct: 1, explain: '"buy" là động từ bất quy tắc → quá khứ là "bought".' },
      { q: 'Dấu hiệu nào thuộc Quá khứ đơn?', options: ['two days ago', 'tomorrow', 'at the moment'], correct: 0, explain: '"... ago" (cách đây ...) là dấu hiệu của Quá khứ đơn.' },
      { q: 'Dạng quá khứ của "see" (nhìn thấy) là:', options: ['seed', 'saw', 'seen'], correct: 1, explain: 'see → quá khứ đơn là saw.' },
      { q: 'Chọn câu phủ định đúng:', options: ['She didn\'t went home.', 'She didn\'t go home.', 'She don\'t went home.'], correct: 1, explain: 'Sau didn\'t dùng động từ nguyên mẫu (go).' },
    ],
  },
  {
    id: 'gl-6',
    level: 'A2',
    focusTerms: ['at 8 PM yesterday', 'At 9 AM yesterday', 'when', 'while', 'was reading', 'were working', 'was/were + V-ing', 'called'],
    title: 'Bài 10: Thì 4 — Quá Khứ Tiếp Diễn (Past Continuous)',
    purpose: 'Diễn tả hành động ĐANG diễn ra tại một thời điểm cụ thể trong quá khứ (hoặc đang làm thì việc khác xen vào).',
    signals: 'at 8 PM yesterday, at this time last week, when / while.',
    formula: 'S + was / were + V-ing (I/He/She/It + was | You/We/They + were)',
    formulaRows: [
      { label: 'Khẳng định', code: 'S + was / were + V-ing', note: 'I/He/She/It + was | You/We/They + were' },
      { label: 'Phủ định', code: 'S + was / were + not + V-ing', note: 'wasn\'t / weren\'t + V-ing' },
    ],
    explanation:
      'Dùng "was/were + V-ing" cho hành động đang kéo dài ở quá khứ; hành động ngắn xen vào dùng Quá khứ đơn.',
    commonMistake: '❌ At 8 PM yesterday, I watched TV.',
    correction: '✅ At 8 PM yesterday, I was watching TV.',
    examples: [
      { en: 'I was reading a book when you called me.', vi: 'Tôi đang đọc sách thì bạn gọi cho tôi.' },
      { en: 'At 9 AM yesterday, they were working in the office.', vi: 'Lúc 9 giờ sáng hôm qua, họ đang làm việc ở văn phòng.' },
    ],
    sentenceDrills: [
      { vi: 'Lúc 8 giờ tối qua tôi đang đọc sách.', en: 'At 8 PM yesterday I was reading a book' },
      { vi: 'Họ đang làm việc khi tôi đến.', en: 'They were working when I arrived' },
      { vi: 'Trời đang mưa khi chúng tôi rời nhà.', en: 'It was raining when we left home' },
    ],
    quiz: [
      { q: 'Điền vào chỗ trống: "At 8 PM yesterday, I ___ dinner."', options: ['cooked', 'was cooking', 'am cooking'], correct: 1, explain: 'Có giờ cụ thể trong quá khứ (At 8 PM yesterday) → Quá khứ tiếp diễn (was cooking).' },
      { q: 'Chủ ngữ "They" đi với động từ to be quá khứ nào?', options: ['was', 'were', 'are'], correct: 1, explain: 'You/We/They đi với "were".' },
      { q: 'Chọn câu đúng:', options: ['She was sleeping when I arrived.', 'She sleeping when I arrived.', 'She were sleeping when I arrived.'], correct: 0, explain: 'She + was + V-ing (was sleeping).' },
      { q: 'Điền từ đúng: "While I ___ walking, I saw my friend."', options: ['was', 'were', 'am'], correct: 0, explain: 'I đi với "was".' },
      { q: 'Khi đang làm việc A thì việc B bất ngờ xen vào, việc B chia thì nào?', options: ['Quá khứ tiếp diễn', 'Quá khứ đơn', 'Tương lai đơn'], correct: 1, explain: 'Hành động dài đang xảy ra (Quá khứ tiếp diễn), hành động xen vào (Quá khứ đơn).' },
      { q: 'Chọn câu đúng:', options: ['We was studying.', 'We were studying.', 'We are studying yesterday.'], correct: 1, explain: 'We đi với "were" + V-ing.' },
    ],
  },
  {
    id: 'gl-7',
    level: 'A2',
    focusTerms: ['tomorrow', 'tomorrow morning', 'next week', 'soon', 'I think', 'I promise', 'will call', 'will practice', 'will + V'],
    title: 'Bài 11: Thì 5 — Tương Lai Đơn (Future Simple)',
    purpose: 'Nói về quyết định ngay lúc nói, lời hứa, lời đề nghị giúp đỡ hoặc dự đoán tương lai.',
    signals: 'tomorrow, next week/month/year, soon, I think, I promise.',
    formula: 'S + will + V (nguyên mẫu) | Phủ định: S + will not (won\'t) + V',
    formulaRows: [
      { label: 'Khẳng định', code: 'S + will + V', note: 'Mọi chủ ngữ đều dùng will + V nguyên mẫu (không chia -s/-ed)' },
      { label: 'Phủ định', code: 'S + will not (won\'t) + V', note: 'will not viết tắt là won\'t' },
      { label: 'Hỏi', code: 'Will + S + V?', note: 'Đảo Will lên trước Chủ ngữ' },
    ],
    explanation:
      'Cực kỳ dễ dùng: mọi chủ ngữ (I, You, He, She, They...) đều đi với "will + V nguyên mẫu", không cần chia -s/-es hay -ed.',
    commonMistake: '❌ Tomorrow I will to go there. / She will goes.',
    correction: '✅ Tomorrow I will go there. / She will go.',
    examples: [
      { en: 'I will call you back tomorrow morning.', vi: 'Tôi sẽ gọi lại cho bạn vào sáng mai.' },
      { en: 'I promise I will practice every day.', vi: 'Tôi hứa tôi sẽ luyện tập mỗi ngày.' },
    ],
    sentenceDrills: [
      { vi: 'Tôi sẽ gọi cho bạn vào ngày mai.', en: 'I will call you tomorrow' },
      { vi: 'Tuần tới chúng tôi sẽ thăm Hà Nội.', en: 'Next week we will visit Hanoi' },
      { vi: 'Tôi hứa tôi sẽ không quên.', en: 'I promise I will not forget' },
    ],
    quiz: [
      { q: 'Chọn câu đúng ở thì Tương lai đơn:', options: ['He will travels next week.', 'He will travel next week.', 'He will to travel next week.'], correct: 1, explain: 'Sau "will" động từ luôn giữ nguyên mẫu (travel).' },
      { q: 'Dạng viết tắt phủ định của "will not" là gì?', options: ['willn\'t', 'won\'t', 'don\'t'], correct: 1, explain: 'will not viết tắt là won\'t.' },
      { q: 'Khi muốn hứa với ai đó ngay lúc nói, ta dùng thì nào?', options: ['Quá khứ đơn', 'Tương lai đơn (will + V)', 'Hiện tại tiếp diễn'], correct: 1, explain: 'Lời hứa / quyết định tức thì dùng "will + V".' },
      { q: 'Chọn câu hỏi đúng ở Tương lai đơn:', options: ['Will you join us tomorrow?', 'Do you will join us?', 'Are you will join?'], correct: 0, explain: 'Đảo "Will" lên trước chủ ngữ để đặt câu hỏi.' },
      { q: 'Dấu hiệu nào thuộc thì Tương lai đơn?', options: ['last year', 'next month', 'yesterday'], correct: 1, explain: '"next month" (tháng tới) chỉ tương lai.' },
      { q: 'Chọn câu đúng:', options: ['She will comes soon.', 'She will come soon.', 'She willing come soon.'], correct: 1, explain: 'Sau will dùng động từ nguyên mẫu "come".' },
    ],
  },
  {
    id: 'gl-8',
    level: 'B1',
    focusTerms: ['already', 'yet', 'just', 'ever', 'never', 'since', 'for', 'have improved', 'have lived', 'have / has + V3/ed'],
    title: 'Bài 12: Thì 6 — Hiện Tại Hoàn Thành (Present Perfect)',
    purpose: 'Diễn tả kinh nghiệm đã từng làm, việc bắt đầu từ quá khứ kéo dài tới hiện tại, hoặc việc vừa mới xảy ra có kết quả ở hiện tại.',
    signals: 'already, yet, just, ever, never, since (+ mốc thời gian), for (+ khoảng thời gian).',
    formula: 'S + have / has + V3/ed (I/You/We/They + have | He/She/It + has)',
    formulaRows: [
      { label: 'Khẳng định', code: 'S + have / has + V3/ed', note: 'I/You/We/They + have | He/She/It + has' },
      { label: 'Phủ định', code: 'S + have / has + not + V3/ed', note: 'haven\'t / hasn\'t + V3/ed' },
      { label: 'Hỏi', code: 'Have / Has + S + V3/ed?', note: 'Đảo Have / Has lên đầu câu' },
    ],
    explanation:
      'Khác với Quá khứ đơn (có thời gian xác định như yesterday), Hiện tại hoàn thành nhấn mạnh KẾT QUẢ hoặc KINH NGHIỆM tính đến hiện tại.',
    commonMistake: '❌ I have learn English for 3 months.',
    correction: '✅ I have learned English for 3 months. (Phải dùng V3/ed!)',
    examples: [
      { en: 'We have improved our English significantly.', vi: 'Chúng tôi đã cải thiện tiếng Anh một cách đáng kể.' },
      { en: 'I have lived here since 2020.', vi: 'Tôi đã sống ở đây từ năm 2020.' },
    ],
    sentenceDrills: [
      { vi: 'Tôi đã hoàn thành bài học rồi.', en: 'I have already finished the lesson' },
      { vi: 'Cô ấy đã sống ở đây từ năm 2020.', en: 'She has lived here since 2020' },
      { vi: 'Chúng tôi đã học tiếng Anh được ba tháng.', en: 'We have studied English for three months' },
    ],
    quiz: [
      { q: 'Chọn câu đúng ở thì Hiện tại hoàn thành:', options: ['She has finished her work.', 'She have finished her work.', 'She has finish her work.'], correct: 0, explain: 'She đi với "has" + V3/ed (finished).' },
      { q: 'Điền "since" hay "for": "I have studied English ___ two months."', options: ['since', 'for', 'ago'], correct: 1, explain: '"for" đi với khoảng thời gian (two months); "since" đi với mốc thời gian (2024).' },
      { q: 'Thì nào dùng để nói về kinh nghiệm tính đến hiện tại (không nêu rõ lúc nào)?', options: ['Quá khứ đơn', 'Hiện tại hoàn thành', 'Tương lai đơn'], correct: 1, explain: 'Hiện tại hoàn thành dùng cho trải nghiệm/kết quả tới hiện tại.' },
      { q: 'Điền "since" hay "for": "They have worked together ___ 2021."', options: ['since', 'for', 'in'], correct: 0, explain: '2021 là mốc thời gian cụ thể → dùng "since".' },
      { q: 'Dạng V3 của "go" trong "He has ___ to London" là gì?', options: ['went', 'gone', 'going'], correct: 1, explain: 'go → went (V2) → gone (V3).' },
      { q: 'Từ "already" (đã rồi) và "yet" (vẫn chưa) là dấu hiệu của thì nào?', options: ['Hiện tại tiếp diễn', 'Hiện tại hoàn thành', 'Quá khứ đơn'], correct: 1, explain: 'already / yet / just là dấu hiệu đặc trưng của Hiện tại hoàn thành.' },
    ],
  },
  {
    id: 'gl-9',
    level: 'A2',
    focusTerms: ['What', 'Where', 'When', 'Why', 'How', 'Could you', 'Would you like', 'does', 'Do/Does/Did/Is/Are/Can'],
    title: 'Bài 13: Câu Hỏi & Câu Nhờ Vả Lịch Sự',
    purpose: 'Đặt câu hỏi đúng trật tự và giao tiếp lịch sự trong công việc, nhà hàng, sân bay.',
    signals: 'What, Where, When, Why, How | Could you..., Would you like...',
    formula: 'Từ hỏi + Do/Does/Did + S + V? | Could you + V nguyên mẫu?',
    formulaRows: [
      { label: 'Câu hỏi', code: 'Wh- + do / does / did + S + V?', note: 'Wh- = What, Where, When, Why, How (đảo trợ động từ lên trước S)' },
      { label: 'Nhờ vả', code: 'Could you + V (+ please)?', note: 'Mẫu câu nhờ vả lịch sự, động từ sau Could you giữ nguyên mẫu' },
    ],
    explanation:
      'Trong tiếng Anh, câu hỏi phải đảo trợ động từ (Do/Does/Did/Is/Are/Can) lên trước Chủ ngữ. Khi nhờ người khác giúp, dùng "Could you..." sẽ lịch sự hơn nhiều.',
    commonMistake: '❌ Where you live? / You like coffee?',
    correction: '✅ Where do you live? / Do you like coffee?',
    examples: [
      { en: 'Could you speak a little more slowly?', vi: 'Bạn có thể nói chậm hơn một chút được không?' },
      { en: 'What time does the meeting start?', vi: 'Cuộc họp bắt đầu lúc mấy giờ?' },
    ],
    sentenceDrills: [
      { vi: 'Bạn sống ở đâu?', en: 'Where do you live' },
      { vi: 'Bạn có thể nói chậm hơn một chút không?', en: 'Could you speak more slowly' },
      { vi: 'Cuộc họp bắt đầu lúc mấy giờ?', en: 'What time does the meeting start' },
    ],
    quiz: [
      { q: 'Chọn câu hỏi đúng ngữ pháp:', options: ['Where do you work?', 'Where you work?', 'Where are you work?'], correct: 0, explain: 'Câu hỏi với động từ thường "work" phải mượn trợ động từ "do".' },
      { q: 'Câu nào nhờ vả lịch sự nhất?', options: ['Give me the menu.', 'Could you give me the menu, please?', 'You give menu.'], correct: 1, explain: '"Could you + V..., please?" là mẫu câu nhờ vả lịch sự chuẩn mực.' },
      { q: 'Điền vào chỗ trống: "What time ___ the train leave?"', options: ['do', 'does', 'is'], correct: 1, explain: '"the train" là số ít (it) + động từ thường "leave" → dùng "does".' },
      { q: 'Chọn câu hỏi đúng ở quá khứ:', options: ['Did you see him?', 'Did you saw him?', 'Do you saw him?'], correct: 0, explain: 'Sau Did dùng động từ nguyên mẫu "see".' },
      { q: 'Chọn câu mời lịch sự:', options: ['Would you like some tea?', 'Do you want tea now?', 'Take some tea.'], correct: 0, explain: '"Would you like..." là cách mời lịch sự chuẩn bản xứ.' },
      { q: 'Đặt câu hỏi với động từ "to be":', options: ['Are you ready?', 'Do you ready?', 'You are ready?'], correct: 0, explain: 'Với tính từ "ready", đảo động từ to be "Are" lên đầu câu.' },
    ],
  },
  {
    id: 'gl-10',
    level: 'B1',
    focusTerms: ['because', 'although', 'Although', 'however', 'therefore', 'But', 'If', 'will', 'would'],
    title: 'Bài 14: Từ Nối Câu & Câu Điều Kiện',
    purpose: 'Nối các câu đơn thành đoạn văn mạch lạc và biết cách đặt câu giả định.',
    signals: 'because, although, however, therefore | If + S + V, S + will/would + V.',
    formula: 'Although S + V, S + V (KHÔNG thêm but) | If + Hiện tại đơn, S + will + V',
    formulaRows: [
      { label: 'Nhượng bộ', code: 'Although S + V, S + V', note: 'Mặc dù... nhưng... (Đã dùng Although thì KHÔNG thêm "but")' },
      { label: 'Điều kiện 1', code: 'If + S + V(hiện tại), S + will + V', note: 'Trong mệnh đề "If" KHÔNG dùng "will"' },
    ],
    explanation:
      'Dùng từ nối để bài viết/bài nói logic và chuyên nghiệp. Nhớ 2 quy tắc vàng: (1) Đã có Although thì KHÔNG dùng But; (2) Trong mệnh đề If không dùng "will".',
    commonMistake: '❌ Although it rained, but I went to work. / If I will have time...',
    correction: '✅ Although it rained, I went to work. / If I have time, I will call you.',
    examples: [
      { en: 'I practice every day because I want to speak fluently.', vi: 'Tôi luyện tập mỗi ngày vì tôi muốn nói trôi chảy.' },
      { en: 'If we collaborate closely, we will achieve our goal.', vi: 'Nếu chúng ta hợp tác chặt chẽ, chúng ta sẽ đạt mục tiêu.' },
    ],
    sentenceDrills: [
      { vi: 'Tôi học tiếng Anh vì nó rất hữu ích.', en: 'I learn English because it is very useful' },
      { vi: 'Mặc dù trời mưa, tôi vẫn đi làm.', en: 'Although it rained I went to work' },
      { vi: 'Nếu tôi có thời gian, tôi sẽ gọi cho bạn.', en: 'If I have time I will call you' },
    ],
    quiz: [
      { q: 'Chọn câu đúng:', options: ['Although he was tired, but he worked.', 'Although he was tired, he worked.', 'Because he was tired, so he worked.'], correct: 1, explain: 'Không dùng cả "Although" và "but" trong cùng 1 câu.' },
      { q: 'Chọn câu điều kiện loại 1 đúng:', options: ['If it will rain, I will stay home.', 'If it rains, I will stay home.', 'If it rain, I stay home.'], correct: 1, explain: 'Mệnh đề "If" dùng Hiện tại đơn (rains), mệnh đề chính dùng "will + V".' },
      { q: 'Từ nối nào có nghĩa là "Tuy nhiên"?', options: ['because', 'therefore', 'however'], correct: 2, explain: 'however = tuy nhiên; because = bởi vì; therefore = do đó.' },
      { q: 'Từ nối nào có nghĩa là "Do đó / Vì vậy"?', options: ['although', 'therefore', 'while'], correct: 1, explain: 'therefore = do đó, vì vậy.' },
      { q: 'Chọn câu điều kiện loại 2 (giả định ở hiện tại):', options: ['If I had time, I would travel.', 'If I have time, I would travel.', 'If I will have time, I would travel.'], correct: 0, explain: 'Điều kiện loại 2: If + S + V2/ed (had), S + would + V.' },
      { q: 'Điền từ nối đúng: "I stayed home ___ I was sick."', options: ['because', 'although', 'however'], correct: 0, explain: '"I was sick" là nguyên nhân → dùng "because".' },
    ],
  },
];

export const COMPREHENSIVE_GRAMMAR_EXAM: GrammarQuizItem[] = [
  { q: 'Câu 1 [Hiện tại đơn]: "She ___ to work by bus every morning."', options: ['go', 'goes', 'is going', 'went'], correct: 1, explain: 'Có "every morning" (thói quen) + She → Hiện tại đơn: goes.' },
  { q: 'Câu 2 [Hiện tại tiếp diễn]: "Look! The children ___ in the garden right now."', options: ['play', 'are playing', 'played', 'will play'], correct: 1, explain: 'Có "Look!" và "right now" → Hiện tại tiếp diễn: are playing.' },
  { q: 'Câu 3 [Quá khứ đơn]: "Yesterday, we ___ a very interesting movie."', options: ['watch', 'are watching', 'watched', 'will watch'], correct: 2, explain: 'Có "Yesterday" → Quá khứ đơn: watched.' },
  { q: 'Câu 4 [Quá khứ tiếp diễn]: "At 8 PM last night, I ___ an email to my manager."', options: ['write', 'was writing', 'am writing', 'have written'], correct: 1, explain: 'Giờ cụ thể trong quá khứ (At 8 PM last night) → Quá khứ tiếp diễn: was writing.' },
  { q: 'Câu 5 [Tương lai đơn]: "I promise I ___ you with this project tomorrow."', options: ['help', 'helped', 'will help', 'was helping'], correct: 2, explain: 'Lời hứa + "tomorrow" → Tương lai đơn: will help.' },
  { q: 'Câu 6 [Hiện tại hoàn thành]: "They ___ in this city since 2019."', options: ['live', 'lived', 'have lived', 'are living'], correct: 2, explain: 'Có "since 2019" → Hiện tại hoàn thành: have lived.' },
  { q: 'Câu 7 [Từ loại - Trạng từ]: "He drives very ___ because the road is wet."', options: ['careful', 'carefully', 'care'], correct: 1, explain: 'Bổ nghĩa cho động từ "drives" phải dùng Trạng từ (carefully).' },
  { q: 'Câu 8 [Cấu trúc S+V+O]: Chọn câu đúng:', options: ['My sister very smart.', 'My sister is very smart.', 'Is my sister very smart.'], correct: 1, explain: 'Câu trần thuật trước tính từ "smart" phải có "is".' },
  { q: 'Câu 9 [Câu hỏi quá khứ]: "What time ___ the meeting start yesterday?"', options: ['do', 'does', 'did', 'was'], correct: 2, explain: 'Có "yesterday" + động từ thường "start" → mượn trợ động từ "did".' },
  { q: 'Câu 10 [Điều kiện loại 1]: "If we ___ hard, we will achieve great results."', options: ['work', 'will work', 'worked', 'working'], correct: 0, explain: 'Mệnh đề If của điều kiện loại 1 dùng Hiện tại đơn (work).' },
  { q: 'Câu 11 [Từ loại - Tính từ]: Chọn cụm từ đúng:', options: ['A car comfortable', 'A comfortable car', 'A comfortably car'], correct: 1, explain: 'Tính từ (comfortable) đứng TRƯỚC danh từ (car).' },
  { q: 'Câu 12 [Hiện tại đơn - Phủ định]: "He ___ drink coffee in the evening."', options: ['don\'t', 'doesn\'t', 'isn\'t', 'didn\'t'], correct: 1, explain: 'He + động từ thường "drink" ở Hiện tại đơn dùng doesn\'t.' },
  { q: 'Câu 13 [Hiện tại hoàn thành]: "I have studied English ___ six months."', options: ['since', 'for', 'ago', 'last'], correct: 1, explain: '"six months" là khoảng thời gian → dùng "for".' },
  { q: 'Câu 14 [Quá khứ tiếp diễn]: "While she ___ dinner, the phone rang."', options: ['cooked', 'was cooking', 'is cooking', 'cooks'], correct: 1, explain: 'Hành động đang kéo dài khi việc khác xen vào → was cooking.' },
  { q: 'Câu 15 [Từ nối]: Chọn câu đúng ngữ pháp:', options: ['Although it rained, but I went out.', 'Although it rained, I went out.', 'Because it rained, so I stayed.'], correct: 1, explain: 'Không dùng cả "Although" và "but" trong cùng 1 câu.' },
  { q: 'Câu 16 [Từ loại - Danh từ]: Từ nào là Danh từ?', options: ['information', 'inform', 'informative', 'informally'], correct: 0, explain: 'Đuôi -tion là dấu hiệu của Danh từ (information).' },
  { q: 'Câu 17 [Câu hỏi lịch sự]: "___ you show me the way to gate 5?"', options: ['Could', 'Are', 'Did', 'Does'], correct: 0, explain: 'Mẫu câu nhờ vả lịch sự: "Could you + V...?".' },
  { q: 'Câu 18 [Tương lai đơn]: "Next year, our company ___ a new office."', options: ['opens', 'opened', 'will open', 'was opening'], correct: 2, explain: '"Next year" (năm tới) → Tương lai đơn: will open.' },
  { q: 'Câu 19 [Mạo từ a/an/the]: "She bought ___ umbrella because it rained."', options: ['a', 'an', 'the', 'không dùng'], correct: 1, explain: '"umbrella" bắt đầu bằng nguyên âm "u" → dùng "an".' },
  { q: 'Câu 20 [Quá khứ đơn]: "They ___ a new laptop two days ago."', options: ['buy', 'bought', 'have bought', 'will buy'], correct: 1, explain: '"two days ago" → Quá khứ đơn: buy → bought.' },
];

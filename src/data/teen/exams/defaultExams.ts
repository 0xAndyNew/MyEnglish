import { SchoolExamId, SchoolExamSet } from '../types';

export const DEFAULT_SCHOOL_EXAMS: Record<SchoolExamId, SchoolExamSet> = {
  "entrance10": {
    "id": "entrance10",
    "title": "Đề Luyện Thi Tuyển Sinh Vào Lớp 10",
    "subtitle": "25 câu chuẩn cấu trúc Sở GD&ĐT: Ngữ âm, Trọng âm, Ngữ pháp, Giao tiếp, Đọc hiểu & Viết lại câu",
    "badge": "Thi vào lớp 10",
    "durationMinutes": 35,
    "targetDescription": "Dành cho học sinh Lớp 8–9 ôn thi chuyển cấp THPT công lập & chuyên.",
    "questions": [
      {
        "id": "e10-1",
        "section": "Ngữ âm",
        "question": "Choose the word whose underlined part is pronounced differently from the others.",
        "options": [
          "want[[ed]]",
          "decid[[ed]]",
          "visit[[ed]]",
          "watch[[ed]]"
        ],
        "correctIndex": 3,
        "explanationVi": "Các từ \"wanted, decided, visited\" kết thúc bằng âm /t/ hoặc /d/ nên đuôi -ed đọc là /ɪd/. Riêng \"watched\" kết thúc bằng âm vô thanh /tʃ/ nên đuôi -ed đọc là /t/."
      },
      {
        "id": "e10-2",
        "section": "Ngữ âm",
        "question": "Choose the word whose underlined part differs from the other three in pronunciation.",
        "options": [
          "h[[ea]]d",
          "br[[ea]]d",
          "w[[ea]]ther",
          "cl[[ea]]n"
        ],
        "correctIndex": 3,
        "explanationVi": "\"head\" /hed/, \"bread\" /bred/ và \"weather\" /ˈweðə(r)/ có cụm \"ea\" đọc là /e/, còn \"clean\" /kliːn/ đọc là /iː/."
      },
      {
        "id": "e10-3",
        "section": "Trọng âm",
        "question": "Choose the word that differs from the other three in the position of primary stress.",
        "options": [
          "father",
          "teacher",
          "begin",
          "student"
        ],
        "correctIndex": 2,
        "explanationVi": "\"father\", \"teacher\", \"student\" là danh từ 2 âm tiết nhấn trọng âm 1; \"begin\" /bɪˈɡɪn/ là động từ 2 âm tiết nhấn trọng âm 2."
      },
      {
        "id": "e10-4",
        "section": "Trọng âm",
        "question": "Choose the word that has a different primary stress pattern from the others.",
        "options": [
          "industry",
          "charity",
          "energy",
          "tradition"
        ],
        "correctIndex": 3,
        "explanationVi": "\"industry\" /ˈɪndəstri/, \"charity\" /ˈtʃærəti/, \"energy\" /ˈenədʒi/ nhấn âm 1; \"tradition\" /trəˈdɪʃn/ có đuôi -tion nên trọng âm rơi vào âm tiết thứ 2 ngay trước nó."
      },
      {
        "id": "e10-5",
        "section": "Ngữ pháp & Từ vựng",
        "question": "My uncle ______ in Ho Chi Minh City since he graduated from university in 2015.",
        "options": [
          "lives",
          "lived",
          "has lived",
          "is living"
        ],
        "correctIndex": 2,
        "explanationVi": "Có mệnh đề \"since + S + V2/ed (mốc quá khứ)\" nên mệnh đề chính chia thì Hiện tại hoàn thành -> \"has lived\"."
      },
      {
        "id": "e10-6",
        "section": "Ngữ pháp & Từ vựng",
        "question": "I wish I ______ speak English as fluently as my cousin who studies abroad.",
        "options": [
          "can",
          "will",
          "could",
          "am able"
        ],
        "correctIndex": 2,
        "explanationVi": "Câu ước cho khả năng trái với thực tế ở hiện tại dùng \"S + wish + S + could + V(bare)\"."
      },
      {
        "id": "e10-7",
        "section": "Ngữ pháp & Từ vựng",
        "question": "A new community library ______ in our district next month.",
        "options": [
          "builds",
          "will build",
          "will be built",
          "has built"
        ],
        "correctIndex": 2,
        "explanationVi": "Chủ ngữ \"A new community library\" là vật chịu tác động ở tương lai (\"next month\") nên dùng bị động tương lai đơn: \"will be built\"."
      },
      {
        "id": "e10-8",
        "section": "Ngữ pháp & Từ vựng",
        "question": "Before leaving the classroom, please remember to ______ all the lights to save electricity.",
        "options": [
          "turn on",
          "turn off",
          "look after",
          "put on"
        ],
        "correctIndex": 1,
        "explanationVi": "\"turn off\" (tắt đèn) phù hợp với mục đích tiết kiệm điện (\"save electricity\") khi rời phòng học."
      },
      {
        "id": "e10-9",
        "section": "Ngữ pháp & Từ vựng",
        "question": "The artisan ______ made this delicate bamboo basket lives at the end of the village.",
        "options": [
          "which",
          "who",
          "whose",
          "where"
        ],
        "correctIndex": 1,
        "explanationVi": "Danh từ đứng trước chỉ người (\"The artisan\") và làm chủ ngữ cho động từ \"made\" -> dùng đại từ quan hệ \"who\"."
      },
      {
        "id": "e10-10",
        "section": "Ngữ pháp & Từ vựng",
        "question": "______ the weather was rainy, the students went on the heritage field trip as planned.",
        "options": [
          "Because",
          "Despite",
          "Although",
          "However"
        ],
        "correctIndex": 2,
        "explanationVi": "Hai vế mang nghĩa nhượng bộ và phía sau là một mệnh đề đầy đủ S + V (\"the weather was rainy\") nên dùng \"Although\"."
      },
      {
        "id": "e10-11",
        "section": "Ngữ pháp & Từ vựng",
        "question": "If we ______ more plastic waste, our rivers and oceans will stay cleaner for marine life.",
        "options": [
          "recycle",
          "recycled",
          "will recycle",
          "would recycle"
        ],
        "correctIndex": 0,
        "explanationVi": "Câu điều kiện loại 1 diễn tả khả năng có thật: \"If + S + V(Hiện tại đơn), S + will + V\"."
      },
      {
        "id": "e10-12",
        "section": "Ngữ pháp & Từ vựng",
        "question": "The ______ we practise listening to native speakers, the more confident we become.",
        "options": [
          "much",
          "most",
          "more",
          "many"
        ],
        "correctIndex": 2,
        "explanationVi": "Cấu trúc So sánh kép: \"The more + S + V, the + so sánh hơn + S + V\"."
      },
      {
        "id": "e10-13",
        "section": "Chức năng giao tiếp",
        "question": "Minh: \"Congratulations! You won first prize in the English speaking contest.\" — Lan: \"______\"",
        "options": [
          "Thank you very much! That's very kind of you.",
          "You're welcome.",
          "Never mind.",
          "No, I didn't."
        ],
        "correctIndex": 0,
        "explanationVi": "Khi nhận lời chúc mừng, lời đáp lịch sự và tự nhiên nhất là cảm ơn (\"Thank you very much! That's very kind of you.\")."
      },
      {
        "id": "e10-14",
        "section": "Chức năng giao tiếp",
        "question": "Hoa: \"Why don't we cycle around the lake this Sunday morning?\" — Nam: \"______\"",
        "options": [
          "Yes, I am.",
          "Good idea! Let's meet at 7 a.m.",
          "Thank you for asking.",
          "You're quite busy."
        ],
        "correctIndex": 1,
        "explanationVi": "\"Why don't we...?\" là câu rủ/gợi ý cùng làm gì, nên đáp lại đồng tình bằng \"Good idea! Let's meet at 7 a.m.\"."
      },
      {
        "id": "e10-15",
        "section": "Đọc hiểu - Điền từ",
        "passageTitle": "Green School Campaigns",
        "passage": "In recent years, many secondary schools across Viet Nam have launched \"Green School\" campaigns to encourage students to protect the environment. Every morning, students bring reusable water bottles instead (15) ______ buying single-use plastic cups. In addition, each classroom has two separate bins for paper and organic waste. Every Friday afternoon, volunteers from Grade 8 and Grade 9 spend an hour (16) ______ the schoolyard and watering the flower beds. These simple habits not only keep the campus clean (17) ______ also teach teenagers to be responsible citizens. Teachers believe that small daily actions at school will create a (18) ______ impact on the wider community.",
        "question": "Choose the best option for blank (15).",
        "options": [
          "on",
          "of",
          "for",
          "from"
        ],
        "correctIndex": 1,
        "explanationVi": "Cụm giới từ cố định: \"instead of + V-ing/N\" (thay vì làm gì)."
      },
      {
        "id": "e10-16",
        "section": "Đọc hiểu - Điền từ",
        "passageTitle": "Green School Campaigns",
        "passage": "In recent years, many secondary schools across Viet Nam have launched \"Green School\" campaigns to encourage students to protect the environment. Every morning, students bring reusable water bottles instead (15) ______ buying single-use plastic cups. In addition, each classroom has two separate bins for paper and organic waste. Every Friday afternoon, volunteers from Grade 8 and Grade 9 spend an hour (16) ______ the schoolyard and watering the flower beds. These simple habits not only keep the campus clean (17) ______ also teach teenagers to be responsible citizens. Teachers believe that small daily actions at school will create a (18) ______ impact on the wider community.",
        "question": "Choose the best option for blank (16).",
        "options": [
          "clean",
          "to clean",
          "cleaning",
          "cleaned"
        ],
        "correctIndex": 2,
        "explanationVi": "Cấu trúc \"spend + thời gian + V-ing\" (dành thời gian làm gì) -> \"cleaning\"."
      },
      {
        "id": "e10-17",
        "section": "Đọc hiểu - Điền từ",
        "passageTitle": "Green School Campaigns",
        "passage": "In recent years, many secondary schools across Viet Nam have launched \"Green School\" campaigns to encourage students to protect the environment. Every morning, students bring reusable water bottles instead (15) ______ buying single-use plastic cups. In addition, each classroom has two separate bins for paper and organic waste. Every Friday afternoon, volunteers from Grade 8 and Grade 9 spend an hour (16) ______ the schoolyard and watering the flower beds. These simple habits not only keep the campus clean (17) ______ also teach teenagers to be responsible citizens. Teachers believe that small daily actions at school will create a (18) ______ impact on the wider community.",
        "question": "Choose the best option for blank (17).",
        "options": [
          "and",
          "or",
          "so",
          "but"
        ],
        "correctIndex": 3,
        "explanationVi": "Cặp liên từ tương quan: \"not only ... but also ...\" (không những ... mà còn ...)."
      },
      {
        "id": "e10-18",
        "section": "Đọc hiểu - Điền từ",
        "passageTitle": "Green School Campaigns",
        "passage": "In recent years, many secondary schools across Viet Nam have launched \"Green School\" campaigns to encourage students to protect the environment. Every morning, students bring reusable water bottles instead (15) ______ buying single-use plastic cups. In addition, each classroom has two separate bins for paper and organic waste. Every Friday afternoon, volunteers from Grade 8 and Grade 9 spend an hour (16) ______ the schoolyard and watering the flower beds. These simple habits not only keep the campus clean (17) ______ also teach teenagers to be responsible citizens. Teachers believe that small daily actions at school will create a (18) ______ impact on the wider community.",
        "question": "Choose the best option for blank (18).",
        "options": [
          "positive",
          "positively",
          "positiveness",
          "negatively"
        ],
        "correctIndex": 0,
        "explanationVi": "Trước danh từ \"impact\" cần một tính từ mang nghĩa tích cực -> \"positive\" (tác động tích cực)."
      },
      {
        "id": "e10-19",
        "section": "Đọc hiểu - Trả lời câu hỏi",
        "passageTitle": "Smart Study Habits for Grade 9 Students",
        "passage": "Preparing for the Grade 10 entrance exam can be challenging, yet building smart study habits makes a big difference. Educational researchers suggest studying in focused 25-minute blocks followed by a 5-minute break, a technique known as the Pomodoro method. During breaks, students should stand up, stretch, or drink water rather than scrolling through social media, which easily tires the brain.\n\nAnother effective habit is active recall. Instead of simply re-reading textbook pages three or four times, learners should close the book and test themselves with short quizzes or flashcards. Studies show that recalling information from memory strengthens long-term retention far better than passive reading. Finally, getting at least eight hours of sleep before an exam helps the brain organise new vocabulary and grammar patterns overnight.",
        "question": "What is the passage mainly about?",
        "options": [
          "Why social media helps teenagers relax between lessons",
          "Effective study habits for students preparing for exams",
          "How to write a Grade 10 entrance exam paper",
          "The history of the Pomodoro method in schools"
        ],
        "correctIndex": 1,
        "explanationVi": "Toàn bài giới thiệu các thói quen học thông minh (Pomodoro, active recall, ngủ đủ giấc) giúp học sinh ôn thi hiệu quả."
      },
      {
        "id": "e10-20",
        "section": "Đọc hiểu - Trả lời câu hỏi",
        "passageTitle": "Smart Study Habits for Grade 9 Students",
        "passage": "Preparing for the Grade 10 entrance exam can be challenging, yet building smart study habits makes a big difference. Educational researchers suggest studying in focused 25-minute blocks followed by a 5-minute break, a technique known as the Pomodoro method. During breaks, students should stand up, stretch, or drink water rather than scrolling through social media, which easily tires the brain.\n\nAnother effective habit is active recall. Instead of simply re-reading textbook pages three or four times, learners should close the book and test themselves with short quizzes or flashcards. Studies show that recalling information from memory strengthens long-term retention far better than passive reading. Finally, getting at least eight hours of sleep before an exam helps the brain organise new vocabulary and grammar patterns overnight.",
        "question": "According to paragraph 1, what should students avoid during their 5-minute breaks?",
        "options": [
          "Drinking a glass of water",
          "Standing up and stretching",
          "Scrolling through social media",
          "Taking deep breaths"
        ],
        "correctIndex": 2,
        "explanationVi": "Đoạn 1 nêu rõ: \"stand up, stretch, or drink water rather than scrolling through social media\"."
      },
      {
        "id": "e10-21",
        "section": "Đọc hiểu - Trả lời câu hỏi",
        "passageTitle": "Smart Study Habits for Grade 9 Students",
        "passage": "Preparing for the Grade 10 entrance exam can be challenging, yet building smart study habits makes a big difference. Educational researchers suggest studying in focused 25-minute blocks followed by a 5-minute break, a technique known as the Pomodoro method. During breaks, students should stand up, stretch, or drink water rather than scrolling through social media, which easily tires the brain.\n\nAnother effective habit is active recall. Instead of simply re-reading textbook pages three or four times, learners should close the book and test themselves with short quizzes or flashcards. Studies show that recalling information from memory strengthens long-term retention far better than passive reading. Finally, getting at least eight hours of sleep before an exam helps the brain organise new vocabulary and grammar patterns overnight.",
        "question": "The word \"which\" in paragraph 1 refers to ______.",
        "options": [
          "the Pomodoro method",
          "a 5-minute break",
          "the human brain",
          "scrolling through social media"
        ],
        "correctIndex": 3,
        "explanationVi": "Cụm \"...scrolling through social media, which easily tires the brain\": \"which\" thay thế cho việc lướt mạng xã hội làm mỏi não."
      },
      {
        "id": "e10-22",
        "section": "Đọc hiểu - Trả lời câu hỏi",
        "passageTitle": "Smart Study Habits for Grade 9 Students",
        "passage": "Preparing for the Grade 10 entrance exam can be challenging, yet building smart study habits makes a big difference. Educational researchers suggest studying in focused 25-minute blocks followed by a 5-minute break, a technique known as the Pomodoro method. During breaks, students should stand up, stretch, or drink water rather than scrolling through social media, which easily tires the brain.\n\nAnother effective habit is active recall. Instead of simply re-reading textbook pages three or four times, learners should close the book and test themselves with short quizzes or flashcards. Studies show that recalling information from memory strengthens long-term retention far better than passive reading. Finally, getting at least eight hours of sleep before an exam helps the brain organise new vocabulary and grammar patterns overnight.",
        "question": "Why is active recall better than simply re-reading pages?",
        "options": [
          "It strengthens long-term memory retention.",
          "It lets students finish studying in five minutes.",
          "It replaces the need for eight hours of sleep.",
          "It does not require flashcards or short quizzes."
        ],
        "correctIndex": 0,
        "explanationVi": "Đoạn 2 nói: \"recalling information from memory strengthens long-term retention far better than passive reading\"."
      },
      {
        "id": "e10-23",
        "section": "Viết lại câu đồng nghĩa",
        "question": "Choose the sentence closest in meaning: \"I am practising for the maths competition now,\" said Tuan.",
        "options": [
          "Tuan said that he was practising for the maths competition then.",
          "Tuan said that he is practising for the maths competition now.",
          "Tuan said that I was practising for the maths competition then.",
          "Tuan said that he had practised for the maths competition now."
        ],
        "correctIndex": 0,
        "explanationVi": "Câu tường thuật lùi thì: \"I\" -> \"he\", \"am practising\" -> \"was practising\", \"now\" -> \"then\"."
      },
      {
        "id": "e10-24",
        "section": "Viết lại câu đồng nghĩa",
        "question": "Choose the sentence closest in meaning: \"The suitcase was too heavy for the little boy to carry upstairs.\"",
        "options": [
          "The suitcase was so heavy that the little boy couldn't carry it upstairs.",
          "The suitcase was such heavy that the little boy couldn't carry it upstairs.",
          "The suitcase was so heavy that the little boy could carry it upstairs.",
          "The suitcase was enough heavy for the little boy to carry upstairs."
        ],
        "correctIndex": 0,
        "explanationVi": "Cấu trúc \"too + adj + (for O) + to V\" chuyển sang \"so + adj + that + S + couldn't + V + it\" (lưu ý phải thêm tân ngữ \"it\" sau carry)."
      },
      {
        "id": "e10-25",
        "section": "Viết lại câu đồng nghĩa",
        "question": "Choose the sentence closest in meaning: \"No other mountain in Viet Nam is higher than Fansipan.\"",
        "options": [
          "Fansipan is the higher mountain in Viet Nam.",
          "Fansipan is the highest mountain in Viet Nam.",
          "Other mountains in Viet Nam are as high as Fansipan.",
          "Fansipan is not so high as other mountains in Viet Nam."
        ],
        "correctIndex": 1,
        "explanationVi": "\"Không ngọn núi nào ở Việt Nam cao hơn Fansipan\" đồng nghĩa với so sánh nhất: \"Fansipan is the highest mountain in Viet Nam\"."
      }
    ]
  },
  "thpt": {
    "id": "thpt",
    "title": "Đề Luyện Thi Tốt Nghiệp THPT Quốc Gia",
    "subtitle": "25 câu bám sát cấu trúc đề minh họa Bộ GD&ĐT: Ngữ âm, Trọng âm, Hoàn thành câu, Đồng/Trái nghĩa, Đọc hiểu & Sửa lỗi",
    "badge": "Tốt nghiệp THPT",
    "durationMinutes": 40,
    "targetDescription": "Dành cho học sinh Lớp 11–12 ôn thi Tốt nghiệp THPT & Xét tuyển Đại học.",
    "questions": [
      {
        "id": "thpt-1",
        "section": "Ngữ âm",
        "question": "Choose the word whose underlined part differs from the other three in pronunciation.",
        "options": [
          "[[ch]]arity",
          "[[ch]]allenge",
          "[[ch]]emistry",
          "[[ch]]apter"
        ],
        "correctIndex": 2,
        "explanationVi": "\"charity\", \"challenge\", \"chapter\" có cụm \"ch\" phát âm là /tʃ/, còn \"chemistry\" /ˈkemɪstri/ phát âm là /k/."
      },
      {
        "id": "thpt-2",
        "section": "Ngữ âm",
        "question": "Choose the word whose underlined part is pronounced differently from the others.",
        "options": [
          "h[[o]]pe",
          "cl[[o]]se",
          "n[[o]]te",
          "st[[o]]p"
        ],
        "correctIndex": 3,
        "explanationVi": "\"hope\", \"close\", \"note\" có nguyên âm \"o\" đọc là /əʊ/ (hoặc /oʊ/); riêng \"stop\" /stɒp/ đọc là âm ngắn /ɒ/ (US /ɑː/)."
      },
      {
        "id": "thpt-3",
        "section": "Trọng âm",
        "question": "Choose the word that differs from the other three in the position of primary stress.",
        "options": [
          "enjoy",
          "agree",
          "receive",
          "listen"
        ],
        "correctIndex": 3,
        "explanationVi": "\"enjoy\" /ɪnˈdʒɔɪ/, \"agree\" /əˈɡriː/, \"receive\" /rɪˈsiːv/ là các động từ 2 âm tiết nhấn âm 2; \"listen\" /ˈlɪsn/ nhấn âm 1."
      },
      {
        "id": "thpt-4",
        "section": "Trọng âm",
        "question": "Choose the word that has a different primary stress pattern from the others.",
        "options": [
          "environment",
          "technology",
          "communicate",
          "information"
        ],
        "correctIndex": 3,
        "explanationVi": "\"environment\", \"technology\", \"communicate\" đều có trọng âm rơi vào âm tiết thứ 2; riêng \"information\" /ˌɪnfəˈmeɪʃn/ nhấn âm thứ 3 (trước đuôi -tion)."
      },
      {
        "id": "thpt-5",
        "section": "Hoàn thành câu",
        "question": "Your sister has already submitted her university application, ______?",
        "options": [
          "doesn't she",
          "isn't she",
          "hasn't she",
          "didn't she"
        ],
        "correctIndex": 2,
        "explanationVi": "Câu hỏi đuôi (Tag question): vế chính dùng Hiện tại hoàn thành khẳng định (\"has submitted\") nên phần đuôi là \"hasn't she\"."
      },
      {
        "id": "thpt-6",
        "section": "Hoàn thành câu",
        "question": "While the researchers ______ data in the rainforest, they discovered a rare orchid species.",
        "options": [
          "collected",
          "were collecting",
          "have collected",
          "are collecting"
        ],
        "correctIndex": 1,
        "explanationVi": "Hành động đang diễn ra trong quá khứ (\"While...\") bị hành động \"discovered\" xen vào -> dùng Quá khứ tiếp diễn \"were collecting\"."
      },
      {
        "id": "thpt-7",
        "section": "Hoàn thành câu",
        "question": "______ in 1070, the Temple of Literature is Viet Nam's oldest national university.",
        "options": [
          "Founding",
          "Founded",
          "To found",
          "Having founded"
        ],
        "correctIndex": 1,
        "explanationVi": "Rút gọn mệnh đề trạng ngữ/quan hệ đồng chủ ngữ mang nghĩa BỊ ĐỘNG (\"được thành lập vào năm 1070\") dùng Quá khứ phân từ \"Founded\"."
      },
      {
        "id": "thpt-8",
        "section": "Hoàn thành câu",
        "question": "Students should ______ full advantage of free online courses to sharpen their soft skills.",
        "options": [
          "make",
          "take",
          "do",
          "give"
        ],
        "correctIndex": 1,
        "explanationVi": "Collocation cố định: \"take (full) advantage of something\" (tận dụng tối đa cái gì)."
      },
      {
        "id": "thpt-9",
        "section": "Hoàn thành câu",
        "question": "We had to ______ the outdoor graduation rehearsal because of a sudden thunderstorm.",
        "options": [
          "call off",
          "put on",
          "take over",
          "look up"
        ],
        "correctIndex": 0,
        "explanationVi": "\"call off\" = hủy bỏ (tương đương \"cancel\"), phù hợp ngữ cảnh có giông bão bất ngờ."
      },
      {
        "id": "thpt-10",
        "section": "Hoàn thành câu",
        "question": "Graduates who are fluent in English have a clear ______ when applying to multinational firms.",
        "options": [
          "advantage",
          "disadvantage",
          "vacancy",
          "burden"
        ],
        "correctIndex": 0,
        "explanationVi": "\"have a clear advantage\" nghĩa là có lợi thế rõ rệt khi ứng tuyển."
      },
      {
        "id": "thpt-11",
        "section": "Đồng nghĩa & Trái nghĩa",
        "question": "CLOSEST in meaning: Many young volunteers [[devoted]] their summer holidays to teaching children in remote villages.",
        "options": [
          "dedicated",
          "postponed",
          "ignored",
          "reduced"
        ],
        "correctIndex": 0,
        "explanationVi": "\"devote ... to\" (cống hiến, dành trọn cho) đồng nghĩa với \"dedicate ... to\"."
      },
      {
        "id": "thpt-12",
        "section": "Đồng nghĩa & Trái nghĩa",
        "question": "OPPOSITE in meaning: Thanks to modern technology, rural schools now have [[affordable]] access to digital textbooks.",
        "options": [
          "inexpensive",
          "accessible",
          "convenient",
          "expensive"
        ],
        "correctIndex": 3,
        "explanationVi": "\"affordable\" nghĩa là có giá cả phải chăng, vừa túi tiền; trái nghĩa với nó là \"expensive\" (đắt đỏ)."
      },
      {
        "id": "thpt-13",
        "section": "Chức năng giao tiếp",
        "question": "Nam: \"I believe soft skills are just as important as academic grades for future careers.\" — Linh: \"______. Employers always value teamwork and communication.\"",
        "options": [
          "I couldn't agree with you more",
          "That's out of the question",
          "I don't think that's a good idea",
          "You must be joking"
        ],
        "correctIndex": 0,
        "explanationVi": "Câu sau bổ sung lý do ủng hộ quan điểm của Nam -> chọn câu hoàn toàn đồng ý: \"I couldn't agree with you more\" (Tôi hoàn toàn đồng ý với bạn)."
      },
      {
        "id": "thpt-14",
        "section": "Chức năng giao tiếp",
        "question": "David: \"I'm terribly sorry for spilling coffee on your notebook.\" — Mai: \"______\"",
        "options": [
          "Never mind. Accidents happen.",
          "Thank you so much.",
          "Yes, I'd love to.",
          "Congratulations!"
        ],
        "correctIndex": 0,
        "explanationVi": "Đáp lại lời xin lỗi chân thành một cách lịch sự, thông cảm dùng \"Never mind. Accidents happen.\"."
      },
      {
        "id": "thpt-15",
        "section": "Đọc hiểu - Điền từ",
        "passageTitle": "Artificial Intelligence and Future Careers",
        "passage": "Artificial intelligence (AI) is reshaping almost every industry, from healthcare to finance. While some workers worry that automation may replace routine jobs, career experts point out that AI also creates (15) ______ new opportunities. Tasks such as sorting massive datasets or drafting basic summaries can now be completed within seconds, freeing human employees to focus on creativity, empathy, and strategic problem-solving.\n\nTo thrive in this rapidly changing workplace, high school and university students must embrace lifelong learning. (16) ______ technical knowledge, soft skills like critical thinking and cross-cultural communication are becoming increasingly valuable. Students (17) ______ learn how to collaborate effectively with digital tools—while keeping ethical responsibility in mind—will stand out in the job market. Ultimately, technology works best when it (18) ______ human potential rather than replaces it.",
        "question": "Choose the best option for blank (15).",
        "options": [
          "much",
          "every",
          "many",
          "little"
        ],
        "correctIndex": 2,
        "explanationVi": "\"opportunities\" là danh từ đếm được số nhiều nên dùng lượng từ \"many\"."
      },
      {
        "id": "thpt-16",
        "section": "Đọc hiểu - Điền từ",
        "passageTitle": "Artificial Intelligence and Future Careers",
        "passage": "Artificial intelligence (AI) is reshaping almost every industry, from healthcare to finance. While some workers worry that automation may replace routine jobs, career experts point out that AI also creates (15) ______ new opportunities. Tasks such as sorting massive datasets or drafting basic summaries can now be completed within seconds, freeing human employees to focus on creativity, empathy, and strategic problem-solving.\n\nTo thrive in this rapidly changing workplace, high school and university students must embrace lifelong learning. (16) ______ technical knowledge, soft skills like critical thinking and cross-cultural communication are becoming increasingly valuable. Students (17) ______ learn how to collaborate effectively with digital tools—while keeping ethical responsibility in mind—will stand out in the job market. Ultimately, technology works best when it (18) ______ human potential rather than replaces it.",
        "question": "Choose the best option for blank (16).",
        "options": [
          "Besides",
          "However",
          "Although",
          "Therefore"
        ],
        "correctIndex": 0,
        "explanationVi": "Sau chỗ trống là cụm danh từ \"technical knowledge\", mang nghĩa bổ sung (\"Bên cạnh kiến thức chuyên môn, kỹ năng mềm...\") -> dùng giới từ/liên từ \"Besides\"."
      },
      {
        "id": "thpt-17",
        "section": "Đọc hiểu - Điền từ",
        "passageTitle": "Artificial Intelligence and Future Careers",
        "passage": "Artificial intelligence (AI) is reshaping almost every industry, from healthcare to finance. While some workers worry that automation may replace routine jobs, career experts point out that AI also creates (15) ______ new opportunities. Tasks such as sorting massive datasets or drafting basic summaries can now be completed within seconds, freeing human employees to focus on creativity, empathy, and strategic problem-solving.\n\nTo thrive in this rapidly changing workplace, high school and university students must embrace lifelong learning. (16) ______ technical knowledge, soft skills like critical thinking and cross-cultural communication are becoming increasingly valuable. Students (17) ______ learn how to collaborate effectively with digital tools—while keeping ethical responsibility in mind—will stand out in the job market. Ultimately, technology works best when it (18) ______ human potential rather than replaces it.",
        "question": "Choose the best option for blank (17).",
        "options": [
          "which",
          "whom",
          "who",
          "whose"
        ],
        "correctIndex": 2,
        "explanationVi": "Danh từ đứng trước chỉ người (\"Students\") và làm chủ ngữ cho động từ \"learn\" -> dùng \"who\"."
      },
      {
        "id": "thpt-18",
        "section": "Đọc hiểu - Điền từ",
        "passageTitle": "Artificial Intelligence and Future Careers",
        "passage": "Artificial intelligence (AI) is reshaping almost every industry, from healthcare to finance. While some workers worry that automation may replace routine jobs, career experts point out that AI also creates (15) ______ new opportunities. Tasks such as sorting massive datasets or drafting basic summaries can now be completed within seconds, freeing human employees to focus on creativity, empathy, and strategic problem-solving.\n\nTo thrive in this rapidly changing workplace, high school and university students must embrace lifelong learning. (16) ______ technical knowledge, soft skills like critical thinking and cross-cultural communication are becoming increasingly valuable. Students (17) ______ learn how to collaborate effectively with digital tools—while keeping ethical responsibility in mind—will stand out in the job market. Ultimately, technology works best when it (18) ______ human potential rather than replaces it.",
        "question": "Choose the best option for blank (18).",
        "options": [
          "enhances",
          "destroys",
          "hides",
          "avoids"
        ],
        "correctIndex": 0,
        "explanationVi": "\"enhance human potential\" (phát huy/nâng cao tiềm năng con người) đối lập với \"rather than replaces it\"."
      },
      {
        "id": "thpt-19",
        "section": "Đọc hiểu - Trả lời câu hỏi",
        "passageTitle": "Sponge Cities and Urban Resilience",
        "passage": "As urbanisation accelerates and heavy storms become more frequent, traditional concrete cities struggle with sudden flash floods. Impervious surfaces like asphalt roads prevent rainwater from soaking into the ground, forcing drainage systems to overflow. In response, urban planners around the world are adopting the \"sponge city\" model.\n\nRather than fighting water with concrete walls, a sponge city absorbs, filters, and stores rainfall naturally. Designers replace solid pavements with permeable bricks, build sunken green parks that temporarily hold excess water, and restore urban wetlands. During dry seasons, the stored rainwater can be reused to water street trees and clean public spaces. Although building green infrastructure requires significant initial investment, cities that adopt sponge designs save millions in flood repairs and enjoy cooler, healthier urban climates.",
        "question": "Which of the following is the best title for the passage?",
        "options": [
          "Why Concrete Drainage Systems Never Fail",
          "Sponge Cities: A Natural Solution to Urban Flooding",
          "How Dry Seasons Affect Urban Street Trees",
          "The High Cost of Asphalt Roads in Big Cities"
        ],
        "correctIndex": 1,
        "explanationVi": "Cả bài giải thích nguyên nhân ngập úng ở đô thị bê tông hóa và giới thiệu mô hình \"thành phố bọt biển\" (sponge city) như giải pháp tự nhiên."
      },
      {
        "id": "thpt-20",
        "section": "Đọc hiểu - Trả lời câu hỏi",
        "passageTitle": "Sponge Cities and Urban Resilience",
        "passage": "As urbanisation accelerates and heavy storms become more frequent, traditional concrete cities struggle with sudden flash floods. Impervious surfaces like asphalt roads prevent rainwater from soaking into the ground, forcing drainage systems to overflow. In response, urban planners around the world are adopting the \"sponge city\" model.\n\nRather than fighting water with concrete walls, a sponge city absorbs, filters, and stores rainfall naturally. Designers replace solid pavements with permeable bricks, build sunken green parks that temporarily hold excess water, and restore urban wetlands. During dry seasons, the stored rainwater can be reused to water street trees and clean public spaces. Although building green infrastructure requires significant initial investment, cities that adopt sponge designs save millions in flood repairs and enjoy cooler, healthier urban climates.",
        "question": "The word \"Impervious\" in paragraph 1 is closest in meaning to ______.",
        "options": [
          "environmentally friendly",
          "easy to break down",
          "not allowing water to pass through",
          "designed for cyclists only"
        ],
        "correctIndex": 2,
        "explanationVi": "Ngữ cảnh câu sau giải thích \"prevent rainwater from soaking into the ground\" (ngăn nước mưa thấm xuống đất) -> \"impervious\" nghĩa là không thấm nước."
      },
      {
        "id": "thpt-21",
        "section": "Đọc hiểu - Trả lời câu hỏi",
        "passageTitle": "Sponge Cities and Urban Resilience",
        "passage": "As urbanisation accelerates and heavy storms become more frequent, traditional concrete cities struggle with sudden flash floods. Impervious surfaces like asphalt roads prevent rainwater from soaking into the ground, forcing drainage systems to overflow. In response, urban planners around the world are adopting the \"sponge city\" model.\n\nRather than fighting water with concrete walls, a sponge city absorbs, filters, and stores rainfall naturally. Designers replace solid pavements with permeable bricks, build sunken green parks that temporarily hold excess water, and restore urban wetlands. During dry seasons, the stored rainwater can be reused to water street trees and clean public spaces. Although building green infrastructure requires significant initial investment, cities that adopt sponge designs save millions in flood repairs and enjoy cooler, healthier urban climates.",
        "question": "According to paragraph 2, which feature is NOT mentioned as part of a sponge city?",
        "options": [
          "Permeable brick pavements",
          "Sunken green parks",
          "Restored urban wetlands",
          "Underground metro tunnels"
        ],
        "correctIndex": 3,
        "explanationVi": "Đoạn 2 nhắc đến gạch thấm nước (permeable bricks), công viên xanh trũng (sunken green parks) và vùng đất ngập nước (urban wetlands); không nhắc đến đường hầm metro."
      },
      {
        "id": "thpt-22",
        "section": "Đọc hiểu - Trả lời câu hỏi",
        "passageTitle": "Sponge Cities and Urban Resilience",
        "passage": "As urbanisation accelerates and heavy storms become more frequent, traditional concrete cities struggle with sudden flash floods. Impervious surfaces like asphalt roads prevent rainwater from soaking into the ground, forcing drainage systems to overflow. In response, urban planners around the world are adopting the \"sponge city\" model.\n\nRather than fighting water with concrete walls, a sponge city absorbs, filters, and stores rainfall naturally. Designers replace solid pavements with permeable bricks, build sunken green parks that temporarily hold excess water, and restore urban wetlands. During dry seasons, the stored rainwater can be reused to water street trees and clean public spaces. Although building green infrastructure requires significant initial investment, cities that adopt sponge designs save millions in flood repairs and enjoy cooler, healthier urban climates.",
        "question": "What can be inferred from the last sentence of the passage?",
        "options": [
          "The long-term financial and environmental benefits of sponge cities outweigh their initial costs.",
          "Green infrastructure is too expensive for any modern city to build.",
          "Sponge cities still suffer more flood damage than concrete cities.",
          "Traditional concrete walls are cheaper to maintain over 50 years."
        ],
        "correctIndex": 0,
        "explanationVi": "Câu cuối nêu dù đầu tư ban đầu lớn, thành phố tiết kiệm hàng triệu đô sửa chữa lũ lụt và có khí hậu mát lành hơn -> lợi ích dài hạn vượt trội chi phí ban đầu."
      },
      {
        "id": "thpt-23",
        "section": "Tìm lỗi sai & Kết hợp câu",
        "question": "Identify the underlined part that needs correction: [[The number]] (A) of high school students [[who chooses]] (B) vocational training [[has increased]] (C) steadily [[over the past]] (D) five years.",
        "options": [
          "A. The number",
          "B. who chooses",
          "C. has increased",
          "D. over the past"
        ],
        "correctIndex": 1,
        "explanationVi": "Đại từ quan hệ \"who\" thay thế cho danh từ số nhiều \"high school students\", nên động từ theo sau phải chia số nhiều là \"choose\" (sửa \"who chooses\" -> \"who choose\"). Lưu ý \"The number of + N số nhiều\" đi với động từ chính số ít \"has increased\" là đúng."
      },
      {
        "id": "thpt-24",
        "section": "Tìm lỗi sai & Kết hợp câu",
        "question": "Identify the underlined part that needs correction: [[Although]] (A) her busy schedule as a senior student, Minh Anh [[still volunteers]] (B) [[to tutor]] (C) younger pupils [[every Sunday]] (D).",
        "options": [
          "A. Although",
          "B. still volunteers",
          "C. to tutor",
          "D. every Sunday"
        ],
        "correctIndex": 0,
        "explanationVi": "Theo sau chỗ trống là một cụm danh từ (\"her busy schedule as a senior student\"), không phải mệnh đề S + V -> phải sửa \"Although\" thành \"Despite\" hoặc \"In spite of\"."
      },
      {
        "id": "thpt-25",
        "section": "Tìm lỗi sai & Kết hợp câu",
        "question": "Choose the sentence that best combines / rewrites: \"She didn't realise the importance of time management until she entered university.\"",
        "options": [
          "Only after entering university did she realise the importance of time management.",
          "Only after entering university she realised the importance of time management.",
          "Not until she entered university she realised the importance of time management.",
          "Hardly had she entered university than she realised the importance of time management."
        ],
        "correctIndex": 0,
        "explanationVi": "Cấu trúc đảo ngữ với \"Only after + V-ing / Clause + trợ động từ + S + V(bare)\" -> \"Only after entering university did she realise...\". Câu B và C sai vì thiếu đảo ngữ; câu D sai cấu trúc (\"Hardly... when\", không dùng \"than\") và sai nghĩa."
      }
    ]
  }
};

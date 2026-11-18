import type {
  ExamListeningSet,
  ExamMcqQuestion,
  ExamMockTest,
  ExamReadingSet,
  ExamSpeakingTask,
  ExamWritingTask,
} from './examPrepData';

export interface VstepExtraBundle {
  diagnosticQuestions: ExamMcqQuestion[];
  reading: ExamReadingSet[];
  listening: ExamListeningSet[];
  writing: ExamWritingTask[];
  speaking: ExamSpeakingTask[];
  mockTests: ExamMockTest[];
}

export const VSTEP_EXTRA: VstepExtraBundle = {
  diagnosticQuestions: [
    {
      id: 'vstep-diag-ex-1',
      skill: 'listening',
      partLabel: 'Listening Part 1 (Campus Notice)',
      audioScript:
        'Attention all first-year students. Because the Main Auditorium is undergoing lighting repairs this Friday morning, the Academic Integrity Workshop originally scheduled there has been moved to Seminar Room B204 on the second floor of the Humanities Building. The starting time remains nine thirty.',
      question: 'Where will the Academic Integrity Workshop take place on Friday morning?',
      options: [
        'In Seminar Room B204',
        'In the Main Auditorium',
        'In the Student Union Hall',
        'In the Science Lecture Theater',
      ],
      correctIdx: 0,
      explanation:
        'Hội trường chính đang sửa hệ thống đèn nên hội thảo được chuyển sang Seminar Room B204 ở tầng 2 tòa Humanities.',
    },
    {
      id: 'vstep-diag-ex-2',
      skill: 'listening',
      partLabel: 'Listening Part 2 (Everyday Dialogue)',
      audioScript:
        'Hoa: Excuse me, does the number 14 express bus stop near the National History Museum? Driver: Normally yes, miss, but the road outside the museum is closed for a marathon rehearsal until noon. If you get off at Central Market, it is only a five-minute walk north to the museum entrance.',
      question: 'What does the driver advise Hoa to do?',
      options: [
        'Wait until noon for the number 14 bus',
        'Buy a marathon ticket at the entrance',
        'Take a taxi directly to the museum gate',
        'Get off at Central Market and walk north',
      ],
      correctIdx: 3,
      explanation:
        'Tài xế khuyên Hoa xuống tại Central Market rồi đi bộ khoảng 5 phút về phía bắc để tới cổng bảo tàng.',
    },
    {
      id: 'vstep-diag-ex-3',
      skill: 'listening',
      partLabel: 'Listening Part 3 (Short Academic Talk)',
      audioScript:
        'When people memorize vocabulary using isolated flashcards, they often recognize a word on paper yet freeze when hearing it in rapid conversation. Research in second-language acquisition shows that pairing new words with short audio clips and personal example sentences strengthens both auditory recognition and active recall.',
      question: 'According to the speaker, what limitation do isolated flashcards have?',
      options: [
        'They cost too much for university learners.',
        'They take longer to write than full essays.',
        'Learners may recognize words in print but miss them in fast speech.',
        'They prevent learners from reading paper books.',
      ],
      correctIdx: 2,
      explanation:
        'Người học bằng thẻ từ đơn lẻ thường nhận ra mặt chữ trên giấy nhưng bị khựng lại khi nghe trong hội thoại tốc độ nhanh ("freeze when hearing it in rapid conversation").',
    },
    {
      id: 'vstep-diag-ex-4',
      skill: 'reading',
      partLabel: 'Reading (Main Idea)',
      passage:
        'Across several coastal cities, municipal planners are replacing rigid concrete seawalls with restored mangrove belts and oyster reefs. Unlike solid walls, which reflect wave energy and gradually erode nearby beaches, living shorelines absorb storm surges naturally while filtering coastal runoff and providing nursery habitats for juvenile fish.',
      question: 'What is the primary focus of the passage?',
      options: [
        'Why concrete seawalls are becoming cheaper to build',
        'How oyster harvesting increases urban pollution',
        'Methods for relocating coastal towns inland',
        'The ecological and protective advantages of living shorelines',
      ],
      correctIdx: 3,
      explanation:
        'Đoạn văn tập trung giải thích lợi ích của bờ biển sinh thái (rừng ngập mặn, rạn hàu) trong việc hấp thụ sóng bão, lọc nước và tạo nơi sinh trưởng cho cá non.',
    },
    {
      id: 'vstep-diag-ex-5',
      skill: 'reading',
      partLabel: 'Reading (Reference)',
      passage:
        'Although automated translation tools assist travelers with basic street signs and restaurant menus, literary translators argue that these programs still struggle with regional humor and cultural subtext. Consequently, publishing houses continue to rely on human specialists whenever emotional nuance matters.',
      question: 'In the passage, what does the phrase "these programs" refer to?',
      options: [
        'Automated translation tools',
        'Literary translators',
        'Publishing houses',
        'Restaurant menus',
      ],
      correctIdx: 0,
      explanation:
        '"These programs" thay thế trực tiếp cho cụm danh từ "automated translation tools" ở mệnh đề trước.',
    },
    {
      id: 'vstep-diag-ex-6',
      skill: 'reading',
      partLabel: 'Reading (Vocabulary in Context)',
      passage:
        'Because funding for the rural clinic was scarce, the medical team had to improvise affordable storage shelves from recycled timber while waiting for government equipment deliveries.',
      question: 'The word "scarce" in the sentence is closest in meaning to:',
      options: ['abundant', 'limited and insufficient', 'guaranteed', 'overpriced'],
      correctIdx: 1,
      explanation:
        'Vì nguồn kinh phí khan hiếm ("scarce") nên đội ngũ y tế phải tận dụng gỗ tái chế để tự đóng kệ tạm.',
    },
    {
      id: 'vstep-diag-ex-7',
      skill: 'reading',
      partLabel: 'Reading (Inference)',
      passage:
        'During a six-month trial in Copenhagen, offices that introduced quiet focus hours between nine and eleven a.m.—banning internal chat notifications during that window—saw employees complete complex analytical reports nearly twenty percent faster without working overtime.',
      question: 'What can be inferred from the Copenhagen office trial?',
      options: [
        'Employees disliked communicating with colleagues all day.',
        'Analytical reports are easier to write in the evening.',
        'Minimizing digital interruptions boosts deep-work efficiency.',
        'Staff received a twenty percent salary bonus.',
      ],
      correctIdx: 2,
      explanation:
        'Việc tắt thông báo chat trong khung giờ tập trung giúp nhân viên hoàn thành báo cáo phân tích nhanh hơn gần 20% mà không cần làm thêm giờ.',
    },
    {
      id: 'vstep-diag-ex-8',
      skill: 'grammar',
      partLabel: 'Writing & Grammar (Complex Sentences)',
      question: 'Which sentence uses inversion correctly for a C1-level VSTEP essay?',
      options: [
        'Not only public transport reduces traffic jams, but it also cuts emissions.',
        'Not only does public transport reduce traffic jams, but it also cuts emissions.',
        'Not only reduces public transport traffic jams, but also it cuts emissions.',
        'Not only public transport does reduce traffic jams, and it cuts emissions.',
      ],
      correctIdx: 1,
      explanation:
        'Khi "Not only" đứng đầu câu, vế thứ nhất phải đảo ngữ với trợ động từ: "Not only + does + S + V nguyên mẫu, but ... also ...".',
    },
    {
      id: 'vstep-diag-ex-9',
      skill: 'grammar',
      partLabel: 'Writing & Grammar (Participle Clause)',
      question: 'Choose the grammatically accurate sentence:',
      options: [
        'Exhausted after the three-hour exam, the bed looked very inviting to Linh.',
        'Having finished her internship, a full-time offer was given to Mai.',
        'Faced with rising housing costs, many young graduates choose to share apartments.',
        'Walking through the old market, the colorful lanterns amazed the tourists.',
      ],
      correctIdx: 2,
      explanation:
        'Mệnh đề phân từ rút gọn phải có cùng chủ ngữ với mệnh đề chính ("many young graduates" là chủ thể đối mặt với chi phí nhà ở). Ba câu còn lại mắc lỗi chủ ngữ lơ lửng (dangling modifier).',
    },
    {
      id: 'vstep-diag-ex-10',
      skill: 'grammar',
      partLabel: 'Writing Task 1 (Register & Tone)',
      question:
        'You are writing an email to a university admissions officer requesting an extension for submitting your transcript. Which closing sentence is most appropriate?',
      options: [
        'Thanks a bunch for helping me out, see you soon!',
        'Write back quickly because I am super worried.',
        'Catch you later and have a great weekend!',
        'I would be grateful if you could consider my request. Thank you for your time and assistance.',
      ],
      correctIdx: 3,
      explanation:
        'Thư gửi cán bộ tuyển sinh cần văn phong trang trọng, lịch sự; câu D dùng cấu trúc giả định lịch sự "I would be grateful if you could...".',
    },
    {
      id: 'vstep-diag-ex-11',
      skill: 'vocab',
      partLabel: 'Academic Vocabulary (Collocations)',
      question:
        'Governments should ______ strict regulations on single-use plastics to protect marine ecosystems.',
      options: ['impose', 'persuade', 'invent', 'assist'],
      correctIdx: 0,
      explanation:
        'Collocation chuẩn học thuật là "impose strict regulations on sth" (áp đặt quy định nghiêm ngặt lên việc gì).',
    },
    {
      id: 'vstep-diag-ex-12',
      skill: 'vocab',
      partLabel: 'Speaking Part 2 & 3 (Cohesive Devices)',
      question:
        'Which linking expression best introduces a contrasting drawback when evaluating an alternative in Speaking Part 2?',
      options: [
        'For this reason, it is completely flawless.',
        'On the flip side, this option can be rather time-consuming.',
        'To begin with, everyone agrees with my decision.',
        'In addition, it saves both money and effort.',
      ],
      correctIdx: 1,
      explanation:
        '"On the flip side," dùng rất tự nhiên khi chuyển sang nêu mặt hạn chế/nhược điểm của một phương án trong Speaking Part 2.',
    },
  ],

  reading: [
    {
      id: 'vstep-read-ex-1',
      partLabel: 'VSTEP Reading — Passage 1 (B1)',
      title: 'How Public Libraries Are Becoming Community Hubs',
      level: 'B1',
      passage:
        'For many decades, public libraries were known mainly as quiet buildings filled with rows of printed books where visitors whispered and studied alone. In recent years, however, city libraries in many countries have redesigned their spaces to meet the changing needs of modern residents. While lending books remains an essential service, a growing number of branches now feature bright coworking tables, high-speed internet, and small soundproof booths for online job interviews.\n\nIn addition to supporting remote workers and students, libraries increasingly serve as centers for lifelong learning. Every week, local branches host free workshops on basic computer skills for senior citizens, conversational language clubs for newcomers, and weekend storytelling hours for young families. Librarians say these programs help reduce social isolation among elderly residents who live alone and give children a safe, welcoming place outside school hours.\n\nNevertheless, expanding into community hubs brings new challenges. Balancing lively group workshops with quiet reading zones requires thoughtful floor planning. Many older libraries built fifty years ago lack enough electrical outlets or flexible rooms. To solve this, several cities have introduced movable glass walls that divide noisy activity spaces from silent study corners without blocking natural daylight.',
      viSummary:
        'Thư viện công cộng hiện đại không chỉ cho mượn sách mà còn cung cấp bàn làm việc chung, phòng phỏng vấn online và tổ chức lớp tin học cho người cao tuổi, CLB ngôn ngữ, giờ kể chuyện cho trẻ em. Để dung hòa không gian yên tĩnh và khu sinh hoạt chung, nhiều nơi dùng vách kính di động giữ ánh sáng tự nhiên.',
      questions: [
        {
          id: 'vstep-read-ex-1-q1',
          questionType: 'Main Idea',
          question: 'What is the passage mainly about?',
          options: [
            'The decline of printed book collections in schools',
            'How public libraries are adapting into multifunctional community spaces',
            'Why senior citizens prefer working from home',
            'The history of library architecture fifty years ago',
          ],
          correctIdx: 1,
          explanation:
            'Toàn bài nói về sự chuyển mình của thư viện công cộng thành không gian cộng đồng đa chức năng (làm việc, học tập suốt đời, kết nối xã hội) và cách xử lý thách thức bố trí không gian.',
        },
        {
          id: 'vstep-read-ex-1-q2',
          questionType: 'Detail',
          question: 'What new facility is mentioned for people attending online job interviews?',
          options: [
            'Private parking spaces outside the building',
            'Free printed newspapers in multiple languages',
            'Small soundproof booths',
            'Outdoor cafés on the library roof',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 1 nêu rõ: "small soundproof booths for online job interviews" (buồng cách âm nhỏ cho phỏng vấn việc làm trực tuyến).',
        },
        {
          id: 'vstep-read-ex-1-q3',
          questionType: 'EXCEPT Question',
          question: 'Which weekly activity is NOT mentioned in paragraph 2?',
          options: [
            'Basic computer classes for older adults',
            'Conversational language clubs',
            'Weekend storytelling for families',
            'Paid music instrument lessons',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 2 liệt kê lớp tin học miễn phí cho người cao tuổi, CLB giao tiếp ngôn ngữ và giờ kể chuyện cuối tuần; không đề cập lớp nhạc có thu phí.',
        },
        {
          id: 'vstep-read-ex-1-q4',
          questionType: 'Vocabulary in Context',
          question: 'The word "isolation" in paragraph 2 is closest in meaning to:',
          options: [
            'loneliness and separation from others',
            'financial success',
            'physical exercise',
            'rapid transportation',
          ],
          correctIdx: 0,
          explanation:
            '"Social isolation" nghĩa là sự cô lập về mặt xã hội, cảm giác cô đơn tách biệt với cộng đồng, đặc biệt ở người lớn tuổi sống một mình.',
        },
        {
          id: 'vstep-read-ex-1-q5',
          questionType: 'Inference',
          question: 'Why do libraries choose movable glass walls instead of solid brick walls?',
          options: [
            'Glass walls are required by national safety laws.',
            'They block noise while still letting natural daylight pass through.',
            'They provide extra shelves for heavy printed books.',
            'They automatically supply more electrical outlets.',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn cuối cho biết vách kính di động giúp tách khu vực ồn ào khỏi góc đọc yên tĩnh mà không chắn ánh sáng tự nhiên ("without blocking natural daylight").',
        },
      ],
    },
    {
      id: 'vstep-read-ex-2',
      partLabel: 'VSTEP Reading — Passage 2 (B2)',
      title: 'Cooling Overheated Cities with Reflective Roofs',
      level: 'B2',
      passage:
        'As summer heatwaves grow longer and more intense, densely built urban districts frequently record temperatures three to five degrees Celsius higher than surrounding rural farmland. This phenomenon, known as the urban heat island effect, occurs largely because dark asphalt roads and conventional tar rooftops absorb solar radiation throughout the afternoon and slowly release it well into the night. Consequently, households rely heavily on air conditioning, driving up electricity demand just when power grids are already strained.\n\nOne surprisingly cost-effective countermeasure is the adoption of "cool roofs"—rooftop surfaces coated with specialized white or light-colored reflective paint. Unlike standard dark materials that absorb up to ninety percent of incoming sunlight, high-reflectance coatings bounce most solar energy back into the atmosphere. Field measurements conducted across commercial warehouses in warm climates revealed that cool roofs lowered indoor ceiling temperatures by nearly four degrees and reduced peak cooling electricity use by roughly fifteen percent.\n\nCritics occasionally worry that bright white rooftops could increase winter heating bills in cooler regions or create visual glare for neighboring high-rise apartments. Urban engineers respond that cool roofs deliver the greatest net benefit in tropical and subtropical cities where cooling needs far exceed winter heating. Furthermore, newer matte mineral coatings scatter light gently rather than creating mirror-like glare, making the technology practical for residential neighborhoods as well.',
      viSummary:
        'Hiệu ứng đảo nhiệt đô thị khiến thành phố nóng hơn nông thôn do đường nhựa và mái tối màu hấp thụ nhiệt. Giải pháp sơn mái phản quang ("cool roofs") giúp giảm gần 4 độ C nhiệt độ trần nhà và tiết kiệm khoảng 15% điện điều hòa giờ cao điểm, đặc biệt hiệu quả ở vùng nhiệt đới và cận nhiệt đới.',
      questions: [
        {
          id: 'vstep-read-ex-2-q1',
          questionType: 'Cause & Effect',
          question: 'According to paragraph 1, what mainly causes the urban heat island effect?',
          options: [
            'Heavy rainfall trapping warm air above rural farmland',
            'Power grids shutting down during winter storms',
            'Tall trees blocking evening breezes in city parks',
            'Dark roads and roofs absorbing solar heat and releasing it slowly',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 1 giải thích mặt đường nhựa tối màu và mái hắc ín hấp thụ bức xạ mặt trời ban ngày rồi tỏa nhiệt chậm vào ban đêm.',
        },
        {
          id: 'vstep-read-ex-2-q2',
          questionType: 'Detail',
          question: 'What did field measurements on commercial warehouses demonstrate about cool roofs?',
          options: [
            'They doubled electricity bills during peak afternoon hours.',
            'They completely eliminated the need for indoor fans.',
            'They lowered indoor ceiling temperatures and cut peak cooling power use.',
            'They needed to be repainted every three months.',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 2 nêu kết quả đo đạc: nhiệt độ trần giảm gần 4 độ và lượng điện làm mát giờ cao điểm giảm khoảng 15%.',
        },
        {
          id: 'vstep-read-ex-2-q3',
          questionType: 'Reference',
          question: 'In paragraph 1, what does the pronoun "it" in "slowly release it" refer to?',
          options: [
            'Air conditioning',
            'Electricity demand',
            'Rural farmland',
            'Solar radiation',
          ],
          correctIdx: 3,
          explanation:
            'Cụm "absorb solar radiation... and slowly release it" cho thấy "it" thay thế cho "solar radiation" (bức xạ/nhiệt mặt trời).',
        },
        {
          id: 'vstep-read-ex-2-q4',
          questionType: 'Vocabulary in Context',
          question: 'The word "strained" at the end of paragraph 1 is closest in meaning to:',
          options: ['overloaded', 'upgraded', 'abandoned', 'protected'],
          correctIdx: 0,
          explanation:
            'Khi người dân bật điều hòa đồng loạt vào đợt nắng nóng, lưới điện rơi vào tình trạng quá tải ("overloaded").',
        },
        {
          id: 'vstep-read-ex-2-q5',
          questionType: 'Inference',
          question: 'Why are matte mineral coatings mentioned in the final paragraph?',
          options: [
            'They absorb more sunlight than traditional tar roofs.',
            'They help prevent harsh glare for people living in taller nearby buildings.',
            'They make winter heating unnecessary in cold mountain towns.',
            'They are designed only for industrial warehouses.',
          ],
          correctIdx: 1,
          explanation:
            'Lớp phủ khoáng chất dạng lì (matte) tán xạ ánh sáng dịu hơn thay vì chói như gương, giúp khắc phục lo ngại chói mắt cho chung cư cao tầng lân cận.',
        },
      ],
    },
    {
      id: 'vstep-read-ex-3',
      partLabel: 'VSTEP Reading — Passage 3 (B2)',
      title: 'Why Too Many Choices Can Exhaust the Mind',
      level: 'B2',
      passage:
        'Conventional economic theory assumes that offering consumers wider variety always improves satisfaction, because every shopper has a better chance of finding an exact match. Yet behavioral psychologists have repeatedly observed a puzzling contradiction known as "choice overload." When faced with dozens of nearly identical options—whether choosing a mobile phone plan, a streaming subscription, or even a jar of jam—many individuals experience mental fatigue rather than delight.\n\nIn a well-known series of supermarket experiments, shoppers who encountered a tasting table displaying twenty-four varieties of gourmet jam stopped to sample more often than those shown only six flavors. However, when researchers tracked actual purchases, customers at the smaller display were nearly ten times more likely to buy a jar. Having too many options forced shoppers to compare minor differences, raising anxiety about making a suboptimal selection and prompting many people to walk away empty-handed.\n\nFortunately, thoughtful presentation can preserve consumer freedom without overwhelming attention. E-commerce platforms increasingly organize items into clear starter categories, highlight three "most popular" tiers, or allow users to filter out irrelevant features before comparing details. Similarly, productive individuals reduce everyday decision fatigue by standardizing minor routines—such as preparing weekly meal templates—so that mental energy remains available for complex creative work.',
      viSummary:
        'Quá nhiều lựa chọn dễ gây mệt mỏi tâm lý ("choice overload"), khiến người mua do dự và bỏ đi tay không như trong thí nghiệm mứt ở siêu thị. Việc nhóm danh mục rõ ràng hoặc chuẩn hóa thói quen nhỏ hằng ngày giúp giảm gánh nặng ra quyết định.',
      questions: [
        {
          id: 'vstep-read-ex-3-q1',
          questionType: 'Contrast',
          question: 'How do behavioral psychologists challenge conventional economic theory?',
          options: [
            'They show that shoppers ignore mobile phone plans.',
            'They argue that excessive variety can cause stress and reduce satisfaction.',
            'They prove that higher prices always increase sales.',
            'They believe consumers prefer only one brand in every store.',
          ],
          correctIdx: 1,
          explanation:
            'Kinh tế học truyền thống cho rằng càng nhiều lựa chọn càng tốt, nhưng tâm lý học hành vi chỉ ra quá nhiều lựa chọn gây mệt mỏi tinh thần và giảm sự hài lòng.',
        },
        {
          id: 'vstep-read-ex-3-q2',
          questionType: 'Detail',
          question: 'In the supermarket experiment, what happened at the table with six flavors of jam?',
          options: [
            'Fewer people stopped initially, yet far more customers actually bought jam.',
            'Shoppers spent twenty minutes comparing every single flavor.',
            'Nobody stopped to sample the jam at all.',
            'The store ran out of jars within ten minutes.',
          ],
          correctIdx: 0,
          explanation:
            'Quầy 24 vị thu hút nhiều người dừng lại nếm thử hơn, nhưng khách ở quầy 6 vị lại có tỷ lệ mua thực tế cao gấp gần 10 lần.',
        },
        {
          id: 'vstep-read-ex-3-q3',
          questionType: 'Vocabulary in Context',
          question: 'The word "suboptimal" in paragraph 2 is closest in meaning to:',
          options: ['extremely expensive', 'completely free', 'less than ideal', 'universally praised'],
          correctIdx: 2,
          explanation:
            '"Suboptimal" có nghĩa là chưa tối ưu, kém lý tưởng nhất ("less than ideal"), khiến người mua lo sợ chọn nhầm.',
        },
        {
          id: 'vstep-read-ex-3-q4',
          questionType: 'Detail',
          question: 'Which strategy do online platforms use to reduce choice overload?',
          options: [
            'Hiding all product prices until checkout',
            'Removing search bars from websites',
            'Forcing users to view every item in alphabetical order',
            'Grouping items into categories and offering filters',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 3 nêu các nền tảng thương mại điện tử phân nhóm rõ ràng, làm nổi bật 3 mức phổ biến và cung cấp bộ lọc.',
        },
        {
          id: 'vstep-read-ex-3-q5',
          questionType: 'Author’s Purpose',
          question: 'Why does the author mention weekly meal templates in the final sentence?',
          options: [
            'To advertise a new online grocery delivery app',
            'To criticize people who eat at restaurants too often',
            'To give a practical example of how individuals limit trivial daily decisions',
            'To explain why gourmet jam is unhealthy',
          ],
          correctIdx: 2,
          explanation:
            'Ví dụ lên thực đơn mẫu theo tuần minh họa cách mỗi người giảm mệt mỏi khi ra quyết định vặt hằng ngày để dành năng lượng trí óc cho việc sáng tạo.',
        },
      ],
    },
    {
      id: 'vstep-read-ex-4',
      partLabel: 'VSTEP Reading — Passage 4 (C1)',
      title: 'Digital Archives and the Revival of Endangered Languages',
      level: 'C1',
      passage:
        'Linguists estimate that nearly half of the roughly seven thousand languages spoken worldwide today may cease to be learned by children before the end of this century. When an unwritten or minority tongue disappears, humanity loses far more than grammatical structures; embedded within local vocabularies are centuries of ecological observations about medicinal plants, seasonal weather shifts, and sustainable land stewardship that rarely exist in dominant national languages.\n\nHistorically, preservation efforts consisted primarily of academic dictionaries compiled by visiting researchers and stored in distant university vaults, offering minimal practical benefit to the communities themselves. Over the past decade, however, community-led digital archives have transformed this dynamic. Using affordable smartphones and open-source recording software, younger speakers collaborate with village elders to capture oral folk tales, lullabies, and everyday conversations, tagging each clip with phonetic transcriptions and bilingual translations.\n\nCrucially, technology alone cannot guarantee linguistic survival. Scholars emphasize that digital databases risk becoming mere virtual museums unless young families actively use the language in daily life. Recognizing this limitation, several regional initiatives now pair online audio dictionaries with youth radio podcasts, bilingual comic books, and interactive classroom games—shifting minority languages from passive heritage objects back into vibrant tools of modern identity.',
      viSummary:
        'Sự biến mất của ngôn ngữ thiểu số kéo theo mất mát tri thức bản địa về sinh thái và y học. Thay vì chỉ lưu từ điển hàn lâm trong thư viện đại học, các cộng đồng hiện dùng kho lưu trữ số kết hợp podcast, truyện tranh song ngữ và trò chơi để đưa ngôn ngữ trở lại đời sống hằng ngày.',
      questions: [
        {
          id: 'vstep-read-ex-4-q1',
          questionType: 'Inference',
          question: 'According to paragraph 1, why is the loss of a minority language significant beyond linguistics?',
          options: [
            'It prevents neighboring countries from trading crops.',
            'It erases unique local knowledge about nature, medicine, and land care.',
            'It forces universities to close their literature departments.',
            'It reduces the total population of rural provinces.',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn 1 chỉ ra từ vựng bản địa chứa đựng tri thức nhiều thế kỷ về cây thuốc, thời tiết theo mùa và cách gìn giữ đất đai bền vững.',
        },
        {
          id: 'vstep-read-ex-4-q2',
          questionType: 'Contrast',
          question: 'How do modern community-led archives differ from older preservation efforts?',
          options: [
            'Older projects focused on distant academic vaults, whereas modern archives involve local youth and elders directly.',
            'Older dictionaries were written exclusively on smartphones.',
            'Modern archives prohibit bilingual translations and audio clips.',
            'Modern projects rely solely on foreign researchers.',
          ],
          correctIdx: 0,
          explanation:
            'Trước đây tài liệu lưu trong kho đại học xa xôi, ít ích lợi cho cộng đồng; nay thanh niên địa phương hợp tác cùng người lớn tuổi thu âm và gắn phụ đề song ngữ.',
        },
        {
          id: 'vstep-read-ex-4-q3',
          questionType: 'Vocabulary in Context',
          question: 'The phrase "virtual museums" in paragraph 3 suggests that digital databases might:',
          options: [
            'charge expensive admission fees to tourists',
            'replace physical art galleries in capital cities',
            'preserve recordings passively without keeping the language alive in daily speech',
            'automatically teach grammar to every smartphone owner',
          ],
          correctIdx: 2,
          explanation:
            'Tác giả cảnh báo kho dữ liệu số có nguy cơ thành "bảo tàng ảo"—chỉ cất giữ thụ động nếu các gia đình trẻ không nói ngôn ngữ đó trong sinh hoạt hằng ngày.',
        },
        {
          id: 'vstep-read-ex-4-q4',
          questionType: 'EXCEPT Question',
          question: 'Which medium is NOT mentioned in paragraph 3 as encouraging active language use?',
          options: [
            'Youth radio podcasts',
            'Bilingual comic books',
            'Interactive classroom games',
            'Mandatory university entrance exams',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 3 liệt kê podcast phát thanh giới trẻ, truyện tranh song ngữ và trò chơi lớp học tương tác; không nhắc đến kỳ thi đầu vào đại học bắt buộc.',
        },
        {
          id: 'vstep-read-ex-4-q5',
          questionType: 'Tone / Attitude',
          question: 'What is the author’s overall attitude toward digital technology in language preservation?',
          options: [
            'Cautiously optimistic, stressing it must be paired with real-life usage',
            'Completely dismissive, claiming smartphones destroy local culture',
            'Indifferent, believing all minority languages will inevitably vanish',
            'Overconfident, arguing software alone can replace human speakers',
          ],
          correctIdx: 0,
          explanation:
            'Tác giả đánh giá tích cực vai trò kho lưu trữ số nhưng nhấn mạnh công nghệ một mình không đủ mà cần kết hợp sử dụng thực tế trong đời sống.',
        },
      ],
    },
  ],

  listening: [
    {
      id: 'vstep-list-ex-1',
      partLabel: 'VSTEP Listening Part 2 (Campus Conversation)',
      title: 'Renewing a University Sports Center Pass',
      level: 'B1',
      speakerContext: 'Hội thoại giữa sinh viên tên Tuấn và nhân viên lễ tân tại Trung tâm Thể thao Đại học.',
      audioScript:
        'Receptionist: Good afternoon, University Sports Center. How can I help you? Tuan: Hi! My semester gym pass expired yesterday, and I would like to renew it for the summer break. Receptionist: Sure. Are you taking any summer courses on campus, or are you only staying in the dormitory? Tuan: I am doing a research assistantship in the Biology Lab, so I have my valid student card. Receptionist: Great, that qualifies you for the discounted student summer rate of four hundred thousand dong for three months, instead of the standard visitor fee. Would you also like to rent a private locker? Tuan: Yes, please—I carry a heavy backpack after lab sessions. How much is a locker? Receptionist: A small locker is fifty thousand dong per month, and we just ask for a refundable key deposit of one hundred thousand dong. Please note that the indoor swimming pool will be closed for tile maintenance from July tenth to July eighteenth, though the fitness room and badminton courts stay open as usual.',
      viSummary:
        'Tuấn gia hạn thẻ tập thể thao kỳ hè. Nhờ đang làm trợ lý nghiên cứu và có thẻ sinh viên hợp lệ, Tuấn được hưởng giá ưu đãi 400.000đ/3 tháng, thuê tủ đồ nhỏ 50.000đ/tháng (cọc chìa khóa 100.000đ hoàn lại). Bể bơi trong nhà đóng sửa gạch từ 10–18/7, nhưng phòng gym và sân cầu lông vẫn mở.',
      questions: [
        {
          id: 'vstep-list-ex-1-q1',
          question: 'Why does Tuan visit the University Sports Center?',
          options: [
            'To apply for a part-time receptionist job',
            'To renew his expired sports center pass for the summer',
            'To report a broken badminton racket',
            'To register for a swimming competition',
          ],
          correctIdx: 1,
          explanation:
            'Tuấn nói thẻ tập học kỳ đã hết hạn hôm qua và muốn gia hạn cho kỳ nghỉ hè ("renew it for the summer break").',
        },
        {
          id: 'vstep-list-ex-1-q2',
          question: 'Why does Tuan qualify for the discounted student summer rate?',
          options: [
            'He lives off campus with his relatives.',
            'He won a campus sports medal last semester.',
            'He is a research assistant with a valid student card.',
            'He booked a private locker for one full year.',
          ],
          correctIdx: 2,
          explanation:
            'Tuấn đang làm trợ lý nghiên cứu tại phòng thí nghiệm Sinh học và có thẻ sinh viên hợp lệ.',
        },
        {
          id: 'vstep-list-ex-1-q3',
          question: 'How much is the refundable key deposit for a locker?',
          options: [
            '100,000 dong',
            '50,000 dong',
            '150,000 dong',
            '400,000 dong',
          ],
          correctIdx: 0,
          explanation:
            'Nhân viên nói tiền thuê tủ nhỏ là 50.000đ/tháng và tiền đặt cọc chìa khóa có hoàn lại là 100.000đ.',
        },
        {
          id: 'vstep-list-ex-1-q4',
          question: 'Which facility will be temporarily closed from July 10 to July 18?',
          options: [
            'The indoor swimming pool',
            'The fitness room',
            'The badminton courts',
            'The Biology Lab',
          ],
          correctIdx: 0,
          explanation:
            'Bể bơi trong nhà đóng cửa bảo trì gạch lát từ ngày 10 đến 18 tháng 7.',
        },
        {
          id: 'vstep-list-ex-1-q5',
          question: 'What can be inferred about the fitness room in mid-July?',
          options: [
            'It will charge double the usual price.',
            'It will relocate to the Biology building.',
            'It will close earlier at noon.',
            'It will remain open normally.',
          ],
          correctIdx: 3,
          explanation:
            'Lễ tân xác nhận: "though the fitness room and badminton courts stay open as usual" (vẫn mở bình thường).',
        },
      ],
    },
    {
      id: 'vstep-list-ex-2',
      partLabel: 'VSTEP Listening Part 2 & 3 (Campus Radio Interview)',
      title: 'Launching a Student-Run Zero-Waste Café',
      level: 'B2',
      speakerContext: 'Phỏng vấn phát thanh trường đại học với Thảo, đồng sáng lập quán cà phê không rác thải nhựa trong khuôn viên trường.',
      audioScript:
        'Host: Welcome back to Campus Voices. Today we are speaking with Thao, co-founder of Green Cup, a student-run zero-waste café near the Engineering Library. Thao, what sparked this project? Thao: Well, last year our environmental club counted nearly two thousand disposable plastic cups thrown away around campus every single week. We wanted a realistic alternative that busy students would actually enjoy using. Host: How does your cup-borrowing system work? Thao: Customers can bring their own tumbler for a five-thousand-dong discount, or borrow one of our stainless-steel cups by scanning their student ID app. As long as they return the cup to any of our four drop-off bins across campus within forty-eight hours, there is no extra fee. Host: Was it hard to manage food waste and coffee grounds? Thao: Surprisingly, our campus gardening club collects all used coffee grounds twice a week to enrich the flower beds, and our bakery supplier picks up unsold pastries at closing time for a local community shelter. The biggest hurdle at first was dishwashing logistics—we had to install a compact high-temperature sanitizer so borrowed cups are spotless within minutes.',
      viSummary:
        'Quán Green Cup ra đời sau khi CLB môi trường thống kê gần 2.000 ly nhựa thải ra mỗi tuần. Khách tự mang bình được giảm 5.000đ hoặc mượn ly inox qua app thẻ sinh viên và trả trong 48 giờ. Bã cà phê được CLB làm vườn lấy bón cây, bánh thừa chuyển tới mái ấm cộng đồng; khó khăn ban đầu là khâu rửa tiệt trùng ly nhanh.',
      questions: [
        {
          id: 'vstep-list-ex-2-q1',
          question: 'What motivated Thao’s team to start the Green Cup café?',
          options: [
            'The Engineering Library banned all drinks nearby.',
            'No other coffee shops existed within five kilometers.',
            'They observed nearly 2,000 plastic cups discarded weekly on campus.',
            'The university required every club to open a business.',
          ],
          correctIdx: 2,
          explanation:
            'CLB môi trường đếm được gần 2.000 ly nhựa dùng một lần bị vứt bỏ quanh trường mỗi tuần nên muốn tạo giải pháp thay thế thiết thực.',
        },
        {
          id: 'vstep-list-ex-2-q2',
          question: 'Within how many hours must students return a borrowed stainless-steel cup to avoid fees?',
          options: ['12 hours', '24 hours', '48 hours', '72 hours'],
          correctIdx: 2,
          explanation:
            'Thảo nói miễn là trả ly về một trong 4 thùng thu gom trong vòng 48 giờ thì không mất thêm phí.',
        },
        {
          id: 'vstep-list-ex-2-q3',
          question: 'What happens to the café’s used coffee grounds?',
          options: [
            'They are used by the campus gardening club for flower beds.',
            'They are sold to an off-campus soap factory.',
            'They are thrown into regular trash bins.',
            'They are sent back to the bakery supplier.',
          ],
          correctIdx: 0,
          explanation:
            'CLB làm vườn của trường thu gom bã cà phê hai lần một tuần để bón cho các bồn hoa.',
        },
        {
          id: 'vstep-list-ex-2-q4',
          question: 'Where do unsold pastries go at closing time?',
          options: [
            'To library staff',
            'To a local community shelter',
            'To the sports center',
            'To the environmental club meeting',
          ],
          correctIdx: 1,
          explanation:
            'Nhà cung cấp bánh thu lại bánh chưa bán hết lúc đóng cửa để chuyển cho một mái ấm cộng đồng địa phương.',
        },
        {
          id: 'vstep-list-ex-2-q5',
          question: 'What was Green Cup’s biggest initial operational challenge?',
          options: [
            'Designing the student ID mobile app',
            'Finding enough students willing to drink coffee',
            'Convincing the library to allow music',
            'Managing fast and hygienic dishwashing of returned cups',
          ],
          correctIdx: 3,
          explanation:
            'Thảo cho biết trở ngại lớn nhất ban đầu là khâu hậu cần rửa ly ("dishwashing logistics"), nên họ phải lắp máy tiệt trùng nhiệt độ cao.',
        },
      ],
    },
    {
      id: 'vstep-list-ex-3',
      partLabel: 'VSTEP Listening Part 3 (Academic Talk)',
      title: 'Understanding Afternoon Energy Dips and Power Naps',
      level: 'B2',
      speakerContext: 'Bài nói ngắn của chuyên gia khoa học thần kinh về nhịp sinh học và giấc ngủ trưa ngắn.',
      audioScript:
        'Many office workers and university students blame a heavy lunch for feeling sluggish around two o’clock in the afternoon. While high-sugar meals can certainly amplify tiredness, sleep scientists point out that the primary culprit is our internal circadian rhythm. Roughly seven to eight hours after waking up, human alertness naturally dips, signaling a mild drop in core body temperature. Rather than reaching immediately for a third cup of strong coffee—which can linger in the bloodstream and disrupt deep sleep late at night—researchers recommend a structured "power nap" lasting fifteen to twenty minutes. Keeping the nap under twenty minutes is critical: it refreshes concentration and reaction speed without pushing the brain into deep slow-wave sleep. If you sleep for forty-five minutes instead, you often wake up feeling groggy and disoriented, a state known as sleep inertia. For people who cannot nap at work, stepping outside for ten minutes of natural sunlight and brisk walking offers a reliable second-best boost.',
      viSummary:
        'Cơn buồn ngủ tầm 2 giờ chiều chủ yếu do nhịp sinh học tự nhiên chứ không chỉ tại bữa trưa no. Thay vì uống thêm cà phê dễ gây mất ngủ đêm, ngủ trưa ngắn 15–20 phút giúp tỉnh táo; ngủ quá 45 phút dễ rơi vào trạng thái lờ đờ ("sleep inertia"). Nếu không ngủ được, đi bộ nhanh ngoài nắng 10 phút cũng rất hiệu quả.',
      questions: [
        {
          id: 'vstep-list-ex-3-q1',
          question: 'According to sleep scientists, what is the main cause of the 2:00 PM energy dip?',
          options: [
            'The body’s natural circadian rhythm',
            'Drinking too much cold water at noon',
            'Bright office lighting in the morning',
            'Reading long textbooks before breakfast',
          ],
          correctIdx: 0,
          explanation:
            'Các nhà khoa học giấc ngủ chỉ ra nguyên nhân chính là nhịp sinh học bên trong cơ thể ("our internal circadian rhythm").',
        },
        {
          id: 'vstep-list-ex-3-q2',
          question: 'Why does the speaker warn against drinking strong coffee late in the afternoon?',
          options: [
            'It causes immediate stomach cramps.',
            'It raises core body temperature permanently.',
            'It can remain in the bloodstream and disturb nighttime deep sleep.',
            'It prevents people from feeling hungry for dinner.',
          ],
          correctIdx: 2,
          explanation:
            'Cà phê có thể lưu lại trong máu và làm gián đoạn giấc ngủ sâu vào ban đêm.',
        },
        {
          id: 'vstep-list-ex-3-q3',
          question: 'How long should an ideal power nap last?',
          options: ['5 to 10 minutes', '15 to 20 minutes', '35 to 45 minutes', 'At least 60 minutes'],
          correctIdx: 1,
          explanation:
            'Các nhà nghiên cứu khuyến nghị ngủ ngắn có kiểm soát trong khoảng 15 đến 20 phút.',
        },
        {
          id: 'vstep-list-ex-3-q4',
          question: 'What does the term "sleep inertia" refer to?',
          options: [
            'Falling asleep instantly on public transport',
            'Staying awake all night before an exam',
            'Dreaming vividly during a ten-minute walk',
            'Waking up groggy after entering deep slow-wave sleep',
          ],
          correctIdx: 3,
          explanation:
            'Ngủ khoảng 45 phút khiến não đi vào giấc ngủ sâu và khi tỉnh dậy sẽ bị choáng váng, lờ đờ ("groggy and disoriented"), gọi là "sleep inertia".',
        },
        {
          id: 'vstep-list-ex-3-q5',
          question: 'What alternative is suggested for people who cannot nap at their workplace?',
          options: [
            'Taking a cold shower at noon',
            'Eating a sugary snack every hour',
            'Listening to loud music with headphones',
            'Walking briskly outdoors in natural sunlight for ten minutes',
          ],
          correctIdx: 3,
          explanation:
            'Nếu không thể chợp mắt ở nơi làm việc, ra ngoài đón ánh nắng tự nhiên và đi bộ nhanh 10 phút là giải pháp thay thế tốt thứ hai.',
        },
      ],
    },
    {
      id: 'vstep-list-ex-4',
      partLabel: 'VSTEP Listening Part 3 (Academic Lecture)',
      title: 'Behavioral Economics: Why "Free" Trials Are So Persuasive',
      level: 'C1',
      speakerContext: 'Trích đoạn bài giảng Kinh tế học hành vi về tâm lý người tiêu dùng với các gói dùng thử miễn phí.',
      audioScript:
        'Good morning, everyone. Today we examine a pricing strategy you have surely encountered online: the thirty-day free trial that requires entering a payment card upfront. From a purely rational perspective, consumers should evaluate a streaming or software service objectively and cancel before day thirty if it adds insufficient value. In reality, retention rates remain remarkably high—not necessarily because the product is indispensable, but because of two predictable cognitive biases. The first is the endowment effect: once users customize playlists or store files inside an app for three weeks, they psychologically feel they already "own" it, making cancellation feel like a tangible loss. The second factor is simple procrastination, often amplified by friction—when signing up takes two clicks, whereas canceling requires navigating three confirmation menus. Notice how ethical regulators in several countries have begun requiring "click-to-cancel" parity, mandating that terminating a subscription be just as effortless as starting one.',
      viSummary:
        'Bài giảng giải thích vì sao gói dùng thử 30 ngày giữ chân khách hàng hiệu quả nhờ hai thiên kiến nhận thức: hiệu ứng sở hữu ("endowment effect"—người dùng thấy đã sở hữu nên sợ mất) và sự trì hoãn cộng thêm rào cản thao tác hủy phức tạp. Nhiều nước đã yêu cầu quy định nút hủy dễ tương đương lúc đăng ký.',
      questions: [
        {
          id: 'vstep-list-ex-4-q1',
          question: 'What pricing practice does the lecturer introduce at the start?',
          options: [
            'Offering permanent discounts for annual cash payments',
            'Requiring a payment card upfront for a 30-day free trial',
            'Charging double during holiday weekends',
            'Giving free hardware to university students',
          ],
          correctIdx: 1,
          explanation:
            'Giảng viên mở đầu bằng chiến lược dùng thử miễn phí 30 ngày nhưng yêu cầu nhập thẻ thanh toán trước.',
        },
        {
          id: 'vstep-list-ex-4-q2',
          question: 'According to the lecture, how does the "endowment effect" influence subscribers?',
          options: [
            'They forget the exact price of the monthly fee.',
            'They recommend the service to all their coworkers.',
            'They feel psychological ownership after personalizing the app, so canceling feels like a loss.',
            'They compare every feature against three rival apps.',
          ],
          correctIdx: 2,
          explanation:
            'Khi đã cá nhân hóa danh sách phát hoặc lưu tệp trong app, người dùng có cảm giác sở hữu và việc hủy gói giống như mất mát thực sự.',
        },
        {
          id: 'vstep-list-ex-4-q3',
          question: 'What does the speaker mean by "friction" in subscription cancellation?',
          options: [
            'Deliberate extra steps that make canceling harder than signing up',
            'Arguments between customers and bank clerks',
            'Slow internet connections in rural areas',
            'Software crashes caused by outdated phones',
          ],
          correctIdx: 0,
          explanation:
            'Đăng ký chỉ cần 2 cú nhấp chuột trong khi hủy phải qua 3 màn hình xác nhận—đó là rào cản ("friction") khiến người dùng trì hoãn.',
        },
        {
          id: 'vstep-list-ex-4-q4',
          question: 'What is the goal of "click-to-cancel" parity rules?',
          options: [
            'To ban free trials on all educational websites',
            'To require written letters for every subscription',
            'To force companies to extend trials to sixty days',
            'To make canceling a subscription as simple as subscribing',
          ],
          correctIdx: 3,
          explanation:
            'Quy định "click-to-cancel parity" bắt buộc việc chấm dứt gói dịch vụ phải dễ dàng ngang bằng lúc đăng ký.',
        },
        {
          id: 'vstep-list-ex-4-q5',
          question: 'What is the overall purpose of the lecture?',
          options: [
            'To teach software engineers how to design payment menus',
            'To explain psychological reasons behind high free-trial retention rates',
            'To persuade students to avoid all online subscriptions',
            'To compare bank interest rates across countries',
          ],
          correctIdx: 1,
          explanation:
            'Mục đích chính của bài giảng là giải thích các thiên kiến tâm lý khiến tỷ lệ giữ chân khách hàng từ gói dùng thử miễn phí cao.',
        },
      ],
    },
  ],

  writing: [
    {
      id: 'vstep-write-ex-1',
      taskLabel: 'Writing Task 1 (Informal Email — 1/3 điểm)',
      title: 'Inviting a Friend to Join an English Speaking Club',
      recommendedMinutes: 20,
      wordCountRange: '120 – 160 từ',
      minWords: 120,
      prompt:
        'You received an email from your friend, Linh, who wants to improve her spoken English before an upcoming job interview:\n"I really need more speaking practice, and I heard you joined an English club recently. Could you tell me when and where the club meets, what typical activities you do there, and whether a beginner-intermediate speaker like me would fit in?"\nWrite a reply to Linh. Write at least 120 words.',
      promptVi:
        'Trả lời email thân mật cho bạn Linh hỏi về CLB tiếng Anh bạn mới tham gia: nêu thời gian và địa điểm sinh hoạt, các hoạt động tiêu biểu và giải thích vì sao trình độ trung cấp của bạn ấy hoàn toàn phù hợp.',
      outline: [
        'Mở thư (Informal): Hỏi thăm Linh và chúc mừng bạn ấy sắp có buổi phỏng vấn.',
        'Đoạn 1 (Lịch & Địa điểm): Nêu rõ giờ họp (ví dụ tối thứ Tư 18:30–20:00) tại quán cà phê/thư viện gần trường.',
        'Đoạn 2 (Hoạt động & Mức độ phù hợp): Mô tả hoạt động (thảo luận nhóm nhỏ, đóng vai phỏng vấn, trò chơi từ vựng) + trấn an bạn ấy rằng CLB rất thân thiện với mọi trình độ.',
        'Kết thư: Rủ Linh đi cùng buổi tới và hẹn gặp.',
      ],
      scoringCriteriaFocus: [
        'Task Fulfillment: Trả lời đủ 3 ý (thời gian/địa điểm, hoạt động, mức độ phù hợp).',
        'Register: Giọng điệu bạn bè tự nhiên ("Hi Linh,", "Give me a text...", "Best,").',
      ],
      highBandKeywords: [
        { phrase: 'supportive atmosphere', meaningVi: 'bầu không khí cởi mở, hỗ trợ' },
        { phrase: 'mock job interviews', meaningVi: 'phỏng vấn thử' },
        { phrase: 'build fluency without pressure', meaningVi: 'rèn sự trôi chảy không áp lực' },
        { phrase: 'mixed proficiency levels', meaningVi: 'nhiều trình độ kết hợp' },
        { phrase: 'tag along with me', meaningVi: 'đi cùng với mình' },
      ],
      modelAnswer:
        'Hi Linh,\n\nIt is great to hear from you, and best of luck with your upcoming job interview! Joining our English speaking club would definitely be a smart way to prepare.\n\nWe meet every Wednesday evening from 6:30 to 8:00 PM in the second-floor study lounge at Sunrise Café near the main campus gate. Each session usually begins with a quick warm-up game, followed by small-group discussions on everyday topics. Lately, we have also practiced mock job interviews in pairs, where members give each other constructive feedback on pronunciation and body language.\n\nDo not worry at all about your current level. Our members have mixed proficiency levels, and the supportive atmosphere helps everyone build fluency without pressure. Nobody laughs at grammar mistakes—we are all there to improve together.\n\nWhy don’t you tag along with me this Wednesday? Let me know by Tuesday night so I can save you a seat!\n\nBest,\nTrang',
      modelNotesVi:
        'Bài mẫu dài ~160 từ, tự nhiên như email thật giữa hai người bạn, giải quyết đủ cả 3 câu hỏi và dùng từ vựng B2 mượt mà.',
    },
    {
      id: 'vstep-write-ex-2',
      taskLabel: 'Writing Task 1 (Formal Letter — 1/3 điểm)',
      title: 'Inquiring About a Professional Certificate Workshop',
      recommendedMinutes: 20,
      wordCountRange: '120 – 160 từ',
      minWords: 120,
      prompt:
        'You saw an advertisement for an intensive weekend Data Analytics Workshop offered by BrightPath Training Center. Write a formal letter to the Course Coordinator to ask about:\n- the exact tuition fee and whether student discounts are available,\n- any software or prior knowledge required before attending,\n- whether participants receive an official certificate upon completion.\nWrite at least 120 words.',
      promptVi:
        'Viết thư trang trọng gửi Điều phối viên khóa học tại trung tâm BrightPath hỏi 3 thông tin về hội thảo Phân tích Dữ liệu cuối tuần: học phí & ưu đãi sinh viên, phần mềm/kiến thức cần chuẩn bị trước, và chứng chỉ sau khi hoàn thành.',
      outline: [
        'Mở thư (Formal): "Dear Sir or Madam," (hoặc "Dear Course Coordinator,") + nêu rõ mục đích viết thư hỏi thông tin khóa học.',
        'Đoạn 1 (Học phí & Yêu cầu đầu vào): Hỏi tổng học phí, chính sách giảm giá sinh viên và phần mềm/kiến thức nền cần cài đặt trước.',
        'Đoạn 2 (Chứng chỉ & Thông tin thêm): Hỏi về chứng chỉ chính thức khi hoàn thành và hạn chót đăng ký.',
        'Kết thư: Cảm ơn, mong sớm nhận phản hồi + "Yours faithfully,".',
      ],
      scoringCriteriaFocus: [
        'Task Fulfillment: Hỏi đủ 3 nhóm thông tin (học phí + ưu đãi, yêu cầu trước khóa, chứng chỉ).',
        'Formal Style: Không viết tắt ("I am writing...", "Could you please clarify..."), dùng "Yours faithfully,".',
      ],
      highBandKeywords: [
        { phrase: 'with reference to your advertisement', meaningVi: 'liên quan đến quảng cáo của quý trung tâm' },
        { phrase: 'eligible for a student discount', meaningVi: 'đủ điều kiện hưởng ưu đãi sinh viên' },
        { phrase: 'prerequisite knowledge', meaningVi: 'kiến thức tiên quyết cần có trước' },
        { phrase: 'official certificate of completion', meaningVi: 'chứng chỉ hoàn thành chính thức' },
        { phrase: 'look forward to your prompt reply', meaningVi: 'mong nhận được phản hồi sớm' },
      ],
      modelAnswer:
        'Dear Sir or Madam,\n\nI am writing with reference to your advertisement for the upcoming intensive weekend Data Analytics Workshop at BrightPath Training Center. As a final-year university student, I am very interested in enrolling and would appreciate further details on three matters.\n\nFirst, could you please confirm the total tuition fee for the weekend program and let me know whether full-time students are eligible for a student discount? Second, I would like to ask if participants need any prerequisite knowledge of programming, or if specific software must be installed on our personal laptops prior to the first session.\n\nFinally, could you clarify whether attendees receive an official certificate of completion at the end of the workshop, and when the registration deadline closes?\n\nThank you very much for your time and assistance. I look forward to your prompt reply.\n\nYours faithfully,\nNguyen Minh Hoang',
      modelNotesVi:
        'Thư trang trọng chuẩn chỉnh (~155 từ), chia 3 đoạn rõ ràng, dùng câu hỏi gián tiếp lịch sự ("could you please confirm...", "I would like to ask if...").',
    },
    {
      id: 'vstep-write-ex-3',
      taskLabel: 'Writing Task 2 (Advantages & Opinion Essay — 2/3 điểm)',
      title: 'Moving Toward a Cashless Society',
      recommendedMinutes: 40,
      wordCountRange: '250 – 320 từ',
      minWords: 250,
      prompt:
        'In many major cities, QR codes, mobile wallets, and bank cards are rapidly replacing paper cash in daily transactions. Discuss the advantages and disadvantages of moving toward a cashless society, and express your own opinion. Write at least 250 words.',
      promptVi:
        'Phân tích lợi ích và bất cập của xu hướng xã hội không tiền mặt (thanh toán QR, ví điện tử, thẻ ngân hàng), đồng thời nêu quan điểm cá nhân.',
      outline: [
        'Mở bài: Giới thiệu sự phổ biến của thanh toán số + Nêu quan điểm (mang lại hiệu quả vượt trội nhưng vẫn cần duy trì lựa chọn tiền mặt dự phòng).',
        'Thân bài 1 (Ưu điểm): Giao dịch nhanh gọn, giảm rủi ro mang tiền mặt/trộm cắp, minh bạch thuế và dễ quản lý chi tiêu cá nhân.',
        'Thân bài 2 (Nhược điểm): Phụ thuộc điện/mạng và dễ bị lừa đảo mạng, gây khó khăn cho người lớn tuổi hoặc người thu nhập thấp chưa có tài khoản ngân hàng.',
        'Kết bài: Khẳng định nên thúc đẩy thanh toán số song song bảo vệ an ninh mạng và giữ tiền mặt như phương án dự phòng.',
      ],
      scoringCriteriaFocus: [
        'Task Fulfillment: Cân đối đủ ưu điểm, nhược điểm và quan điểm cá nhân.',
        'Lexical Resource & Grammar: Dùng collocations tài chính – xã hội chính xác, câu phức đa dạng.',
      ],
      highBandKeywords: [
        { phrase: 'cashless transactions', meaningVi: 'giao dịch không tiền mặt' },
        { phrase: 'streamline daily payments', meaningVi: 'tinh gọn việc thanh toán hằng ngày' },
        { phrase: 'cybersecurity vulnerabilities', meaningVi: 'lỗ hổng an ninh mạng' },
        { phrase: 'digital literacy gap', meaningVi: 'khoảng cách về kỹ năng công nghệ số' },
        { phrase: 'financial inclusion', meaningVi: 'tài chính toàn diện (ai cũng tiếp cận được)' },
      ],
      modelAnswer:
        'Across major urban centers, digital wallets, QR codes, and contactless cards are swiftly replacing banknotes in everyday commerce. While cashless transactions bring remarkable convenience and financial transparency, shifting away from physical currency entirely also creates social and technical risks that deserve careful attention from policymakers and citizens alike.\n\nOn the positive side, electronic payment systems streamline daily payments for both shoppers and small businesses. Commuters no longer need to carry bulky wallets or wait for exact change at busy cafés, while street vendors can record daily revenue automatically without handling large sums of cash that attract theft. At a broader economic level, transparent digital payment trails help governments reduce tax evasion, lower the cost of printing worn banknotes, and allow young consumers to track monthly spending habits effortlessly through smartphone banking apps.\n\nNevertheless, an exclusively cashless model carries notable drawbacks that cannot be overlooked. First, digital platforms depend heavily on stable electricity and internet connections; a regional network outage or smartphone battery failure can instantly halt essential purchases during emergencies. Second, cybersecurity vulnerabilities expose users to online phishing scams and unauthorized personal data tracking. Equally important is the digital literacy gap: elderly citizens, rural residents, and low-income workers without formal bank accounts may feel excluded from basic public services if cash is refused.\n\nIn my opinion, society should embrace digital payments as the primary option while preserving cash as a legal backup. By strengthening online fraud protection and keeping physical currency accessible for vulnerable groups, cities can enjoy modern efficiency without sacrificing financial inclusion.',
      modelNotesVi:
        'Bài luận ~265 từ, bố cục 4 đoạn chuẩn VSTEP B2–C1, ví dụ thực tế gần gũi (quán cà phê, người bán hàng nhỏ, người cao tuổi) và lập luận cân bằng.',
    },
    {
      id: 'vstep-write-ex-4',
      taskLabel: 'Writing Task 2 (Causes & Solutions Essay — 2/3 điểm)',
      title: 'Sleep Deprivation Among University Students',
      recommendedMinutes: 40,
      wordCountRange: '250 – 320 từ',
      minWords: 250,
      prompt:
        'Many university students today suffer from chronic sleep deprivation, which harms both their physical health and academic concentration. What are the main causes of this problem, and what practical measures can be taken to address it? Write at least 250 words.',
      promptVi:
        'Phân tích nguyên nhân khiến nhiều sinh viên đại học thiếu ngủ kéo dài và đề xuất các giải pháp thiết thực để khắc phục.',
      outline: [
        'Mở bài: Nêu thực trạng sinh viên thiếu ngủ và khẳng định vấn đề xuất phát từ áp lực lịch trình lẫn thói quen công nghệ, có thể cải thiện bằng cả nỗ lực cá nhân và hỗ trợ từ nhà trường.',
        'Thân bài 1 (Nguyên nhân): (1) Áp lực bài vở dồn sát hạn chót + làm thêm buổi tối; (2) Thói quen lướt mạng xã hội/xem video khuya dưới ánh sáng xanh.',
        'Thân bài 2 (Giải pháp): (1) Sinh viên chia nhỏ deadline, thiết lập giờ ngắt thiết bị điện tử trước ngủ 45 phút; (2) Nhà trường điều chỉnh hạn nộp bài hợp lý và tổ chức tư vấn quản lý thời gian.',
        'Kết bài: Tóm tắt ngắn gọn và nhấn mạnh giấc ngủ là nền tảng của hiệu suất học tập bền vững.',
      ],
      scoringCriteriaFocus: [
        'Task Fulfillment: Giải quyết cân xứng cả 2 vế Causes và Solutions.',
        'Coherence: Sử dụng từ nối nguyên nhân – giải pháp tự nhiên ("A primary driver is...", "To tackle this issue...").',
      ],
      highBandKeywords: [
        { phrase: 'chronic sleep deprivation', meaningVi: 'tình trạng thiếu ngủ kéo dài' },
        { phrase: 'poor time management', meaningVi: 'quản lý thời gian kém' },
        { phrase: 'late-night screen exposure', meaningVi: 'tiếp xúc màn hình điện tử khuya' },
        { phrase: 'enforce a digital curfew', meaningVi: 'đặt giờ ngừng dùng thiết bị số' },
        { phrase: 'sustainable academic performance', meaningVi: 'thành tích học tập bền vững' },
      ],
      modelAnswer:
        'In higher education today, chronic sleep deprivation has become a widespread concern among university students across both undergraduate and postgraduate programs. Because insufficient rest impairs memory consolidation, weakens immunity, and undermines classroom focus, identifying its primary root causes and implementing practical long-term solutions are essential priorities.\n\nTwo major factors explain why many undergraduates regularly sleep fewer than six hours a night. First, heavy academic workloads combined with evening part-time jobs frequently push students to study past midnight, especially when poor time management leads to last-minute cramming before major assignment deadlines. Second, late-night screen exposure plays a decisive role: scrolling through short videos, playing online games, or messaging friends in bed stimulates the brain and suppresses natural sleep hormones, delaying deep rest long after evening classes finish.\n\nAddressing this persistent issue requires coordinated action from both individual learners and educational institutions. On a personal level, students can break large research assignments into smaller weekly milestones and enforce a strict digital curfew at least forty-five minutes before bedtime by keeping smartphones outside arm’s reach. Meanwhile, universities can assist by spacing out major coursework deadlines across academic departments rather than clustering exams in the same week, and by offering practical time-management workshops alongside mental health counseling support during freshman orientation.\n\nIn conclusion, student exhaustion stems largely from overloaded weekly schedules, demanding evening part-time jobs, and distracting nighttime technology habits. When learners adopt healthier evening routines alongside more balanced academic planning from university departments, they can effectively safeguard their physical and mental well-being while achieving more sustainable academic performance.',
      modelNotesVi:
        'Bài luận ~260 từ, chia tách rành mạch nguyên nhân (cá nhân/lịch trình + công nghệ) và giải pháp (sinh viên + nhà trường), từ vựng chuẩn học thuật B2–C1.',
    },
  ],

  speaking: [
    {
      id: 'vstep-speak-ex-1',
      partLabel: 'Speaking Part 1 (Social Interaction)',
      title: 'Daily Routines & Public Transportation',
      prepTimeText: 'Trả lời ngay',
      speakTimeText: '30 giây / câu',
      prompt:
        '1. Are you a morning person or a night person? Why?\n2. How do you usually travel to school or work?\n3. What improvements would make public transport better in your city?',
      promptVi: 'Trả lời mỗi câu 2–3 ý tự nhiên, có lý do và ví dụ ngắn.',
      sampleAnswer:
        'I would describe myself as a morning person because my mind feels freshest right after breakfast, so I can tackle difficult reading tasks before noon. On weekdays, I usually commute to campus by bus since it is affordable and lets me review vocabulary flashcards on the way. To make public transport even more attractive, I think the city should add dedicated bus lanes during rush hours and display real-time arrival screens at every shelter.',
      highScoreVocab: [
        { phrase: 'morning person', meaningVi: 'người tỉnh táo làm việc tốt vào buổi sáng' },
        { phrase: 'dedicated bus lanes', meaningVi: 'làn đường riêng cho xe buýt' },
        { phrase: 'real-time arrival screens', meaningVi: 'màn hình báo giờ xe đến theo thời gian thực' },
      ],
      deliveryTips: [
        'Không trả lời cộc lốc "Yes/No"; luôn kèm ít nhất 1 mệnh đề "because..." hoặc "since...".',
      ],
    },
    {
      id: 'vstep-speak-ex-2',
      partLabel: 'Speaking Part 2 (Solution Discussion)',
      title: 'Choosing a Weekend Team-Building Activity',
      prepTimeText: '1 phút chuẩn bị',
      speakTimeText: '2–3 phút trình bày',
      prompt:
        'Your university club is organizing a one-day team-building trip for thirty new members this Sunday. Three options are proposed:\n1. A picnic and team games at a suburban eco-park\n2. A group cooking class in the city center\n3. A one-day mountain hiking tour\nWhich option is the most suitable, and why?',
      cuePoints: [
        'Picnic & team games at an eco-park',
        'Group cooking class in the city center',
        'One-day mountain hiking tour',
      ],
      promptVi:
        'Chọn 1 phương án phù hợp nhất cho nhóm 30 thành viên mới, đưa 2 lý do ủng hộ và giải thích vì sao 2 phương án còn lại kém phù hợp hơn.',
      sampleAnswer:
        'Considering that our club has thirty new members with different fitness levels and budgets, I believe a picnic and team games at a suburban eco-park is the most suitable choice. First, an open park offers plenty of space for ice-breaking games where thirty students can mix and talk comfortably. Second, a picnic is budget-friendly and flexible, allowing everyone to share snacks and relax together.\n\nBy contrast, a city cooking class can feel cramped for a large group of thirty people and usually charges a higher fee per person. Similarly, a mountain hiking tour might be exhausting or risky for members who are not used to steep trails, especially in hot weather. Therefore, the eco-park picnic clearly provides the safest and most inclusive experience.',
      highScoreVocab: [
        { phrase: 'ice-breaking games', meaningVi: 'trò chơi làm quen kết nối ban đầu' },
        { phrase: 'budget-friendly and flexible', meaningVi: 'vừa túi tiền và linh hoạt' },
        { phrase: 'safe and inclusive experience', meaningVi: 'trải nghiệm an toàn và hòa nhập cho mọi người' },
      ],
      deliveryTips: [
        'Gắn lý do vào đặc điểm tình huống đề bài (nhóm đông 30 người, thành viên mới, thể lực khác nhau) để ăn điểm lập luận sắc bén.',
      ],
    },
    {
      id: 'vstep-speak-ex-3',
      partLabel: 'Speaking Part 2 (Solution Discussion)',
      title: 'Best Way to Improve English Listening Outside Class',
      prepTimeText: '1 phút chuẩn bị',
      speakTimeText: '2–3 phút trình bày',
      prompt:
        'Your younger cousin wants to improve her English listening skills during her summer break. Three methods are suggested:\n1. Listening to short educational podcasts daily\n2. Watching foreign movies without subtitles\n3. Memorizing English song lyrics\nWhich method would you recommend most, and why?',
      cuePoints: [
        'Short educational podcasts daily',
        'Foreign movies without subtitles',
        'Memorizing English song lyrics',
      ],
      promptVi:
        'Chọn 1 phương pháp luyện nghe tốt nhất cho em họ vào kỳ nghỉ hè, nêu lợi ích rõ ràng và chỉ ra hạn chế của 2 cách còn lại.',
      sampleAnswer:
        'If my younger cousin wants to improve her English listening steadily over the summer, I would strongly recommend listening to short educational podcasts daily. First, learner-friendly podcasts feature clear pronunciation, natural speed controls, and helpful transcripts so she can verify unfamiliar words right away. Second, episodes cover practical topics like travel, science, and daily life, building useful academic vocabulary at the same time.\n\nOn the other hand, watching movies without any subtitles can be frustrating for a learner because actors speak rapidly with heavy slang, which may cause her to lose motivation. Meanwhile, memorizing song lyrics is fun, yet singers often alter natural word stress and grammar to fit the melody. Consequently, daily educational podcasts offer the clearest and most structured progress.',
      highScoreVocab: [
        { phrase: 'helpful transcripts', meaningVi: 'bản chép lời hỗ trợ đối chiếu' },
        { phrase: 'lose motivation', meaningVi: 'mất động lực học' },
        { phrase: 'structured progress', meaningVi: 'sự tiến bộ có hệ thống' },
      ],
      deliveryTips: [
        'So sánh ưu/nhược thực tế của từng phương tiện học (tốc độ nói, có transcript hay không, ngữ điệu tự nhiên) giúp bài nói rất thuyết phục.',
      ],
    },
    {
      id: 'vstep-speak-ex-4',
      partLabel: 'Speaking Part 3 (Topic Development)',
      title: 'Promoting Eco-Friendly Commuting in Cities',
      prepTimeText: '1 phút chuẩn bị',
      speakTimeText: '3–4 phút trình bày + hỏi đáp',
      prompt:
        'Topic: "Cities should encourage residents to choose eco-friendly ways of commuting."\nMindmap branches:\n• Reducing air and noise pollution\n• Improving citizens’ physical health\n• Easing urban traffic congestion\n• [Your own idea]\nFollow-up: How can local authorities persuade private car or motorbike owners to switch to public buses?',
      cuePoints: [
        'Reducing air and noise pollution',
        'Improving citizens’ physical health',
        'Easing urban traffic congestion',
        'Your own idea (e.g., saving household fuel costs)',
      ],
      promptVi:
        'Triển khai đủ 3 nhánh Mindmap + 1 ý tự chọn (ví dụ tiết kiệm chi phí xăng xe cho hộ gia đình) và trả lời câu hỏi phụ về giải pháp khuyến khích người dân đi xe buýt.',
      sampleAnswer:
        'Encouraging residents to adopt eco-friendly commuting brings tremendous benefits to modern cities. First, shifting from private motorbikes to electric buses or bicycles significantly reduces air and noise pollution, creating cleaner neighborhoods. Second, walking or cycling for short trips improves citizens’ physical health by adding natural daily exercise into busy routines. Third, fewer individual vehicles on the road ease severe traffic congestion during rush hours. In addition, from my own perspective, green commuting helps households save substantial money on fuel and parking fees each month.\n\nTo persuade private vehicle owners to switch to public buses, local authorities should improve bus punctuality, install air-conditioned waiting shelters, and offer affordable monthly passes linked with student or worker ID cards.',
      highScoreVocab: [
        { phrase: 'ease severe traffic congestion', meaningVi: 'giảm ùn tắc giao thông nghiêm trọng' },
        { phrase: 'bus punctuality', meaningVi: 'độ đúng giờ của xe buýt' },
        { phrase: 'substantial money on fuel', meaningVi: 'khoản tiền xăng xe đáng kể' },
      ],
      deliveryTips: [
        'Chừa khoảng 30–40 giây cuối cho câu hỏi Follow-up, giữ câu trả lời ngắn gọn, đúng trọng tâm giải pháp.',
      ],
    },
  ],

  mockTests: [
    {
      title: 'Mini Mock Test #2',
      description:
        'Đề thi thử VSTEP số 2 (30 phút — 25 câu): kết hợp Listening Parts 1–3, Reading 2 bài học thuật B1–B2 và Use of English.',
      durationMinutes: 30,
      questions: [
        {
          id: 'vstep-mock-2-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Attention train passengers. Due to track maintenance near Binh Trieu Station, the 7:15 AM express service to Nha Trang will depart from Platform 5 instead of Platform 2. Boarding begins twenty minutes before departure.',
          question: 'From which platform will the 7:15 AM train to Nha Trang depart?',
          options: ['Platform 5', 'Platform 2', 'Platform 7', 'Platform 20'],
          correctIdx: 0,
          explanation:
            'Thông báo cho biết tàu khởi hành từ Platform 5 thay vì Platform 2 ("depart from Platform 5 instead of Platform 2").',
        },
        {
          id: 'vstep-mock-2-q2',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Reminder to visitors at the City Botanical Conservatory: eating food is permitted only at the outdoor terrace café, while bottled water may be carried inside the glasshouses as long as caps remain tightly closed.',
          question: 'What are visitors allowed to bring inside the glasshouses?',
          options: [
            'Packed lunches from home',
            'Bottled water with closed caps',
            'Hot coffee in paper cups',
            'Fruit snacks from the café',
          ],
          correctIdx: 1,
          explanation:
            'Nước đóng chai đậy nắp chặt được phép mang vào nhà kính; đồ ăn chỉ được phép ở sân hiên ngoài trời.',
        },
        {
          id: 'vstep-mock-2-q3',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Hello everyone, this is an update from the Campus Health Clinic. Free seasonal flu vaccinations will be offered on Tuesday and Thursday afternoons between one and four PM in Room 108. Please bring your student identification card; no advance online booking is required.',
          question: 'What must students bring to receive a free flu vaccination?',
          options: [
            'A printed online reservation form',
            'A medical insurance payment receipt',
            'Their student identification card',
            'A signed note from a professor',
          ],
          correctIdx: 2,
          explanation:
            'Thông báo yêu cầu mang thẻ sinh viên ("bring your student identification card") và không cần đặt lịch online trước.',
        },
        {
          id: 'vstep-mock-2-q4',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Attention library patrons. The main elevator near the front lobby is temporarily out of service for safety inspection. Visitors needing step-free access to the third-floor archive should use the East Wing lift next to the Computer Lab.',
          question: 'How can visitors reach the third floor without using stairs?',
          options: [
            'By waiting for the front lobby elevator until noon',
            'By asking security staff to open the roof gate',
            'By entering through the West Wing parking garage',
            'By taking the East Wing lift near the Computer Lab',
          ],
          correctIdx: 3,
          explanation:
            'Thang máy sảnh chính đang kiểm tra an toàn nên khách cần dùng thang máy cánh Đông cạnh phòng Máy tính ("East Wing lift next to the Computer Lab").',
        },
        {
          id: 'vstep-mock-2-q5',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'Phong: Hi Mai, are you still looking for someone to share your apartment near campus next semester? Mai: Actually, yes! My current roommate is graduating in June and moving back to Da Nang. Phong: My cousin Hung is transferring to our university this August and needs a quiet room within walking distance of the Engineering Building. How much is the monthly rent? Mai: The total rent is six million dong, split evenly at three million each, plus roughly four hundred thousand for electricity and water. The only condition is that the building forbids pets.',
          question: 'Why will Mai’s current roommate leave the apartment in June?',
          options: [
            'She is graduating and returning to Da Nang.',
            'She thinks the rent is too expensive.',
            'She wants to adopt a dog.',
            'She is transferring to another university.',
          ],
          correctIdx: 0,
          explanation:
            'Bạn cùng phòng hiện tại của Mai sắp tốt nghiệp vào tháng Sáu và chuyển về Đà Nẵng.',
        },
        {
          id: 'vstep-mock-2-q6',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'Phong: Hi Mai, are you still looking for someone to share your apartment near campus next semester? Mai: Actually, yes! My current roommate is graduating in June and moving back to Da Nang. Phong: My cousin Hung is transferring to our university this August and needs a quiet room within walking distance of the Engineering Building. How much is the monthly rent? Mai: The total rent is six million dong, split evenly at three million each, plus roughly four hundred thousand for electricity and water. The only condition is that the building forbids pets.',
          question: 'How much does each resident pay per month for rent alone?',
          options: [
            '400,000 dong',
            '3,000,000 dong',
            '3,400,000 dong',
            '6,000,000 dong',
          ],
          correctIdx: 1,
          explanation:
            'Tổng tiền thuê nhà 6 triệu chia đôi đều là 3 triệu mỗi người ("split evenly at three million each"), chưa tính điện nước.',
        },
        {
          id: 'vstep-mock-2-q7',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'Phong: Hi Mai, are you still looking for someone to share your apartment near campus next semester? Mai: Actually, yes! My current roommate is graduating in June and moving back to Da Nang. Phong: My cousin Hung is transferring to our university this August and needs a quiet room within walking distance of the Engineering Building. How much is the monthly rent? Mai: The total rent is six million dong, split evenly at three million each, plus roughly four hundred thousand for electricity and water. The only condition is that the building forbids pets.',
          question: 'What restriction applies to the apartment building?',
          options: [
            'Residents cannot cook after ten PM.',
            'Visitors are banned on weekends.',
            'Pets are not allowed.',
            'Engineering students cannot apply.',
          ],
          correctIdx: 2,
          explanation:
            'Mai nêu điều kiện duy nhất là tòa nhà cấm nuôi thú cưng ("the building forbids pets").',
        },
        {
          id: 'vstep-mock-2-q8',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'In today’s environmental science seminar, let us look at urban tree canopies. Many residents think city trees serve purely decorative purposes, yet municipal forestry data tells a different story. Mature street trees shade paved sidewalks, lowering ground-level surface temperatures by up to ten degrees on sunny afternoons. Moreover, tree roots act like natural sponges during heavy downpours, absorbing stormwater and easing pressure on underground drainage pipes. However, planting trees randomly along narrow pavements often fails unless planners select deep-rooted native species and leave wide permeable soil pits around each trunk.',
          question: 'What common misconception about city trees does the speaker mention?',
          options: [
            'That trees grow faster in polluted streets',
            'That street trees never need rainwater',
            'That underground pipes supply water to roots',
            'That city trees exist merely for decoration',
          ],
          correctIdx: 3,
          explanation:
            'Nhiều người nghĩ cây xanh đô thị chỉ để trang trí ("purely decorative purposes"), nhưng số liệu cho thấy nhiều lợi ích thực tế.',
        },
        {
          id: 'vstep-mock-2-q9',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'In today’s environmental science seminar, let us look at urban tree canopies. Many residents think city trees serve purely decorative purposes, yet municipal forestry data tells a different story. Mature street trees shade paved sidewalks, lowering ground-level surface temperatures by up to ten degrees on sunny afternoons. Moreover, tree roots act like natural sponges during heavy downpours, absorbing stormwater and easing pressure on underground drainage pipes. However, planting trees randomly along narrow pavements often fails unless planners select deep-rooted native species and leave wide permeable soil pits around each trunk.',
          question: 'How do tree roots assist cities during heavy rainstorms?',
          options: [
            'They soak up stormwater and reduce strain on drainage pipes.',
            'They push rainwater onto asphalt roads.',
            'They block wind from reaching underground tunnels.',
            'They raise ground surface temperatures.',
          ],
          correctIdx: 0,
          explanation:
            'Rễ cây đóng vai trò như miếng bọt biển tự nhiên, thấm nước mưa và giảm tải cho hệ thống cống ngầm.',
        },
        {
          id: 'vstep-mock-2-q10',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'In today’s environmental science seminar, let us look at urban tree canopies. Many residents think city trees serve purely decorative purposes, yet municipal forestry data tells a different story. Mature street trees shade paved sidewalks, lowering ground-level surface temperatures by up to ten degrees on sunny afternoons. Moreover, tree roots act like natural sponges during heavy downpours, absorbing stormwater and easing pressure on underground drainage pipes. However, planting trees randomly along narrow pavements often fails unless planners select deep-rooted native species and leave wide permeable soil pits around each trunk.',
          question: 'What is required for street tree planting to succeed along pavements?',
          options: [
            'Covering the entire trunk base with concrete',
            'Choosing deep-rooted native trees and wide permeable soil pits',
            'Planting only imported ornamental shrubs',
            'Removing all underground drainage pipes first',
          ],
          correctIdx: 1,
          explanation:
            'Việc trồng cây ven vỉa hè chỉ thành công khi chọn loài bản địa rễ sâu và chừa hố đất thấm nước rộng quanh gốc.',
        },
        {
          id: 'vstep-mock-2-q11',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'In recent years, "repair cafés" have sprung up in neighborhoods across Europe, North America, and Asia. Organized typically once a month in community centers or church halls, these pop-up workshops invite residents to bring broken household items—such as toasters, bicycles, torn jackets, or slow laptops—and fix them alongside skilled volunteer mechanics and tailors free of charge. Rather than dropping off damaged goods at a commercial shop, visitors sit next to the volunteers, watching each step and learning basic troubleshooting skills themselves. Beyond keeping usable electronics and textiles out of landfills, repair cafés nurture unexpected neighborhood friendships across generations, as retired engineers pass practical know-how on to younger apartment dwellers.',
          question: 'What is the main idea of the passage?',
          options: [
            'Commercial repair shops are going out of business worldwide.',
            'Retired engineers struggle to fix modern laptops.',
            'City governments require residents to fix their own bicycles.',
            'Repair cafés cut waste, teach practical skills, and connect neighbors.',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn văn giới thiệu mô hình "repair cafés" giúp giảm rác thải ra bãi rác, truyền kỹ năng sửa chữa cho người dân và kết nối tình làng nghĩa xóm liên thế hệ.',
        },
        {
          id: 'vstep-mock-2-q12',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'In recent years, "repair cafés" have sprung up in neighborhoods across Europe, North America, and Asia. Organized typically once a month in community centers or church halls, these pop-up workshops invite residents to bring broken household items—such as toasters, bicycles, torn jackets, or slow laptops—and fix them alongside skilled volunteer mechanics and tailors free of charge. Rather than dropping off damaged goods at a commercial shop, visitors sit next to the volunteers, watching each step and learning basic troubleshooting skills themselves. Beyond keeping usable electronics and textiles out of landfills, repair cafés nurture unexpected neighborhood friendships across generations, as retired engineers pass practical know-how on to younger apartment dwellers.',
          question: 'How do repair cafés differ from ordinary commercial repair shops?',
          options: [
            'They charge double for urgent laptop repairs.',
            'They only accept brand-new kitchen appliances.',
            'They operate twenty-four hours a day.',
            'Visitors sit beside volunteers and learn how to fix items for free.',
          ],
          correctIdx: 3,
          explanation:
            'Thay vì gửi đồ rồi đi về như cửa hàng thương mại, khách tại repair café ngồi cạnh tình nguyện viên học sửa miễn phí.',
        },
        {
          id: 'vstep-mock-2-q13',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'In recent years, "repair cafés" have sprung up in neighborhoods across Europe, North America, and Asia. Organized typically once a month in community centers or church halls, these pop-up workshops invite residents to bring broken household items—such as toasters, bicycles, torn jackets, or slow laptops—and fix them alongside skilled volunteer mechanics and tailors free of charge. Rather than dropping off damaged goods at a commercial shop, visitors sit next to the volunteers, watching each step and learning basic troubleshooting skills themselves. Beyond keeping usable electronics and textiles out of landfills, repair cafés nurture unexpected neighborhood friendships across generations, as retired engineers pass practical know-how on to younger apartment dwellers.',
          question: 'What does the pronoun "them" in sentence 2 refer to?',
          options: [
            'Broken household items',
            'Skilled volunteer mechanics',
            'Community centers',
            'Neighborhood friendships',
          ],
          correctIdx: 0,
          explanation:
            '"Bring broken household items... and fix them" — "them" thay thế cho "broken household items".',
        },
        {
          id: 'vstep-mock-2-q14',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'In recent years, "repair cafés" have sprung up in neighborhoods across Europe, North America, and Asia. Organized typically once a month in community centers or church halls, these pop-up workshops invite residents to bring broken household items—such as toasters, bicycles, torn jackets, or slow laptops—and fix them alongside skilled volunteer mechanics and tailors free of charge. Rather than dropping off damaged goods at a commercial shop, visitors sit next to the volunteers, watching each step and learning basic troubleshooting skills themselves. Beyond keeping usable electronics and textiles out of landfills, repair cafés nurture unexpected neighborhood friendships across generations, as retired engineers pass practical know-how on to younger apartment dwellers.',
          question: 'The phrase "sprung up" in the first sentence is closest in meaning to:',
          options: [
            'shut down permanently',
            'appeared rapidly',
            'increased prices',
            'moved underground',
          ],
          correctIdx: 1,
          explanation:
            '"Spring up" có nghĩa là mọc lên, xuất hiện nhanh chóng ở nhiều nơi ("appeared rapidly").',
        },
        {
          id: 'vstep-mock-2-q15',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'In recent years, "repair cafés" have sprung up in neighborhoods across Europe, North America, and Asia. Organized typically once a month in community centers or church halls, these pop-up workshops invite residents to bring broken household items—such as toasters, bicycles, torn jackets, or slow laptops—and fix them alongside skilled volunteer mechanics and tailors free of charge. Rather than dropping off damaged goods at a commercial shop, visitors sit next to the volunteers, watching each step and learning basic troubleshooting skills themselves. Beyond keeping usable electronics and textiles out of landfills, repair cafés nurture unexpected neighborhood friendships across generations, as retired engineers pass practical know-how on to younger apartment dwellers.',
          question: 'Which item is NOT mentioned as something residents bring to repair cafés?',
          options: ['Bicycles', 'Torn jackets', 'Washing machines', 'Toasters'],
          correctIdx: 2,
          explanation:
            'Bài đọc nhắc tới máy nướng bánh mì (toasters), xe đạp, áo khoác rách và laptop chậm; không nhắc tới máy giặt (washing machines).',
        },
        {
          id: 'vstep-mock-2-q16',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'Many bilingual speakers report feeling subtly different when switching from one language to another—perhaps sounding more direct in English yet more formal in Vietnamese. Psycholinguists studying bicultural individuals confirm that this sensation is not mere imagination. Because each language carries distinct cultural norms, politeness markers, and emotional memories, switching languages activates corresponding social scripts in the speaker’s mind. In one experiment, bilingual participants who read identical workplace scenarios in two languages tended to evaluate team conflicts through the cultural lens associated with whichever language they were currently using. However, researchers stress that language does not trap speakers inside a single personality; rather, multilingual minds flexibly draw on broader perspectives to adapt across diverse social settings.',
          question: 'What did the psycholinguistic experiment reveal about bilingual participants?',
          options: [
            'They forgot workplace rules when speaking a second language.',
            'They made slower decisions in Vietnamese than in English.',
            'They interpreted the same conflict differently depending on the language used.',
            'They disliked working in multicultural teams.',
          ],
          correctIdx: 2,
          explanation:
            'Người song ngữ đánh giá cùng một tình huống mâu thuẫn công sở theo lăng kính văn hóa gắn với ngôn ngữ họ đang dùng lúc đó.',
        },
        {
          id: 'vstep-mock-2-q17',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'Many bilingual speakers report feeling subtly different when switching from one language to another—perhaps sounding more direct in English yet more formal in Vietnamese. Psycholinguists studying bicultural individuals confirm that this sensation is not mere imagination. Because each language carries distinct cultural norms, politeness markers, and emotional memories, switching languages activates corresponding social scripts in the speaker’s mind. In one experiment, bilingual participants who read identical workplace scenarios in two languages tended to evaluate team conflicts through the cultural lens associated with whichever language they were currently using. However, researchers stress that language does not trap speakers inside a single personality; rather, multilingual minds flexibly draw on broader perspectives to adapt across diverse social settings.',
          question: 'Why does switching languages make bilingual speakers feel slightly different?',
          options: [
            'Each language activates associated cultural norms and social scripts.',
            'Grammar rules change every speaker’s voice pitch completely.',
            'People only learn polite phrases in their second language.',
            'Memory fades whenever someone speaks two languages daily.',
          ],
          correctIdx: 0,
          explanation:
            'Mỗi ngôn ngữ mang chuẩn mực văn hóa, dấu hiệu lịch sự và ký ức cảm xúc riêng nên kích hoạt "kịch bản xã hội" tương ứng trong tâm trí.',
        },
        {
          id: 'vstep-mock-2-q18',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'Many bilingual speakers report feeling subtly different when switching from one language to another—perhaps sounding more direct in English yet more formal in Vietnamese. Psycholinguists studying bicultural individuals confirm that this sensation is not mere imagination. Because each language carries distinct cultural norms, politeness markers, and emotional memories, switching languages activates corresponding social scripts in the speaker’s mind. In one experiment, bilingual participants who read identical workplace scenarios in two languages tended to evaluate team conflicts through the cultural lens associated with whichever language they were currently using. However, researchers stress that language does not trap speakers inside a single personality; rather, multilingual minds flexibly draw on broader perspectives to adapt across diverse social settings.',
          question: 'The word "subtly" in the first sentence is closest in meaning to:',
          options: ['loudly', 'slightly', 'angrily', 'rarely'],
          correctIdx: 1,
          explanation:
            '"Subtly different" nghĩa là khác biệt một cách tinh tế, nhẹ nhàng ("slightly").',
        },
        {
          id: 'vstep-mock-2-q19',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'Many bilingual speakers report feeling subtly different when switching from one language to another—perhaps sounding more direct in English yet more formal in Vietnamese. Psycholinguists studying bicultural individuals confirm that this sensation is not mere imagination. Because each language carries distinct cultural norms, politeness markers, and emotional memories, switching languages activates corresponding social scripts in the speaker’s mind. In one experiment, bilingual participants who read identical workplace scenarios in two languages tended to evaluate team conflicts through the cultural lens associated with whichever language they were currently using. However, researchers stress that language does not trap speakers inside a single personality; rather, multilingual minds flexibly draw on broader perspectives to adapt across diverse social settings.',
          question: 'In sentence 2, what does "this sensation" refer to?',
          options: [
            'Studying psycholinguistics at university',
            'Reading workplace conflicts slowly',
            'Feeling somewhat different when switching between languages',
            'Forgetting politeness markers in English',
          ],
          correctIdx: 2,
          explanation:
            '"This sensation" quy chiếu về cảm giác hơi khác biệt khi chuyển từ ngôn ngữ này sang ngôn ngữ khác ở câu đầu tiên.',
        },
        {
          id: 'vstep-mock-2-q20',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'Many bilingual speakers report feeling subtly different when switching from one language to another—perhaps sounding more direct in English yet more formal in Vietnamese. Psycholinguists studying bicultural individuals confirm that this sensation is not mere imagination. Because each language carries distinct cultural norms, politeness markers, and emotional memories, switching languages activates corresponding social scripts in the speaker’s mind. In one experiment, bilingual participants who read identical workplace scenarios in two languages tended to evaluate team conflicts through the cultural lens associated with whichever language they were currently using. However, researchers stress that language does not trap speakers inside a single personality; rather, multilingual minds flexibly draw on broader perspectives to adapt across diverse social settings.',
          question: 'What conclusion do researchers emphasize at the end of the passage?',
          options: [
            'Bilingual speakers should avoid mixing cultures at work.',
            'Speaking one language is healthier than speaking two.',
            'Personality depends strictly on vocabulary size.',
            'Multilingual speakers gain flexibility rather than being trapped by language.',
          ],
          correctIdx: 3,
          explanation:
            'Câu cuối khẳng định ngôn ngữ không giam hãm tính cách mà giúp người đa ngữ linh hoạt vận dụng nhiều góc nhìn trong các bối cảnh xã hội đa dạng.',
        },
        {
          id: 'vstep-mock-2-q21',
          skill: 'grammar',
          partLabel: 'Use of English (Grammar)',
          question:
            'Had the city invested in flood barriers earlier, the downtown district ______ such severe damage last autumn.',
          options: [
            'would not have suffered',
            'will not suffer',
            'did not suffer',
            'would not suffer',
          ],
          correctIdx: 0,
          explanation:
            'Đảo ngữ điều kiện loại 3 trái với quá khứ: "Had + S + V3, S + would (not) have + V3".',
        },
        {
          id: 'vstep-mock-2-q22',
          skill: 'grammar',
          partLabel: 'Use of English (Relative Clause)',
          question:
            'The urban planning report, ______ was published last month, recommends expanding shaded cycling lanes.',
          options: ['that', 'which', 'what', 'who'],
          correctIdx: 1,
          explanation:
            'Mệnh đề quan hệ không xác định (có dấu phẩy) thay thế cho danh từ chỉ vật "The urban planning report" bắt buộc dùng "which", không dùng "that".',
        },
        {
          id: 'vstep-mock-2-q23',
          skill: 'grammar',
          partLabel: 'Use of English (Subject-Verb Agreement)',
          question:
            'A growing number of university graduates ______ choosing flexible hybrid careers over traditional office jobs.',
          options: ['is', 'has', 'are', 'was'],
          correctIdx: 2,
          explanation:
            'Cấu trúc "A (growing) number of + danh từ số nhiều" đi với động từ chia số nhiều ("are").',
        },
        {
          id: 'vstep-mock-2-q24',
          skill: 'vocab',
          partLabel: 'Use of English (Collocation)',
          question:
            'Regular physical exercise can significantly ______ the risk of stress-related illnesses.',
          options: ['avoid', 'decline', 'drop', 'reduce'],
          correctIdx: 3,
          explanation:
            'Collocation tự nhiên và chuẩn xác là "reduce the risk of sth" (làm giảm nguy cơ mắc bệnh gì).',
        },
        {
          id: 'vstep-mock-2-q25',
          skill: 'vocab',
          partLabel: 'Use of English (Discourse Marker)',
          question:
            'Solar panels require a noticeable upfront investment; ______, they lower household electricity bills for decades.',
          options: ['nevertheless', 'consequently', 'furthermore', 'similarly'],
          correctIdx: 0,
          explanation:
            'Hai vế mang nghĩa tương phản (chi phí ban đầu cao >< giảm hóa đơn điện nhiều thập kỷ), nên dùng liên từ đối lập "nevertheless" (tuy nhiên).',
        },
      ],
    },
    {
      title: 'Mini Mock Test #3',
      description:
        'Đề thi thử VSTEP số 3 (30 phút — 25 câu): tập trung kỹ năng nghe thông báo & bài giảng B2, đọc hiểu suy luận và ngữ pháp Writing Task 2.',
      durationMinutes: 30,
      questions: [
        {
          id: 'vstep-mock-3-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Good afternoon, shoppers. Our GreenMart supermarket will close thirty minutes earlier than usual tonight—at nine thirty instead of ten o’clock—so staff can complete the monthly inventory check. Thank you for shopping with us.',
          question: 'What time will GreenMart close tonight?',
          options: ['At 9:00 PM', 'At 9:30 PM', 'At 10:00 PM', 'At 10:30 PM'],
          correctIdx: 1,
          explanation:
            'Siêu thị đóng cửa sớm hơn thường lệ 30 phút vào lúc 9:30 tối ("at nine thirty instead of ten o’clock").',
        },
        {
          id: 'vstep-mock-3-q2',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Attention conference attendees. Afternoon coffee and pastries are now being served in the Courtyard Pavilion. Please note that the 2:15 panel on Artificial Intelligence in Healthcare has been moved from Room A to the Grand Auditorium to accommodate extra guests.',
          question: 'Why was the 2:15 AI panel moved to the Grand Auditorium?',
          options: [
            'Room A has a broken air conditioner.',
            'Coffee was spilled inside Room A.',
            'More guests wanted to attend the session.',
            'The speakers arrived early from the airport.',
          ],
          correctIdx: 2,
          explanation:
            'Phiên thảo luận được chuyển sang hội trường lớn để đủ chỗ cho lượng khách tham dự tăng thêm ("to accommodate extra guests").',
        },
        {
          id: 'vstep-mock-3-q3',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'This is a ferry service notice for passengers heading to Cat Ba Island. Due to strong morning winds, the 8:00 AM speedboat is canceled. Ticket holders may transfer free of charge to the 10:30 AM large passenger ferry or request a full refund at Desk 3.',
          question: 'What can ticket holders from the canceled 8:00 AM speedboat do at Desk 3?',
          options: [
            'Buy waterproof raincoats',
            'Book a hotel room on the island',
            'Rent bicycles for the afternoon',
            'Request a full ticket refund',
          ],
          correctIdx: 3,
          explanation:
            'Hành khách có thể đổi miễn phí sang phà lớn lúc 10:30 hoặc yêu cầu hoàn tiền đầy đủ tại Quầy 3 ("request a full refund at Desk 3").',
        },
        {
          id: 'vstep-mock-3-q4',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Dear residents of Oakwood Apartments, water supply to Blocks C and D will be shut off tomorrow from nine AM to one PM for main valve replacement. Blocks A and B will not be affected. Please store sufficient water beforehand.',
          question: 'Which apartment blocks will experience the temporary water shut-off?',
          options: [
            'Blocks C and D',
            'Blocks A and B',
            'All four blocks',
            'Only the ground floor of Block A',
          ],
          correctIdx: 0,
          explanation:
            'Thông báo nói rõ chỉ cắt nước ở tòa C và D ("Blocks C and D"); tòa A và B không bị ảnh hưởng.',
        },
        {
          id: 'vstep-mock-3-q5',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'Khanh: Hey Sarah, did you finish designing the poster for Saturday’s International Food Day? Sarah: Almost! I just need to verify the ticket price with the student council. Are we still charging twenty thousand dong per tasting voucher? Khanh: Actually, the council agreed to lower it to fifteen thousand dong so more freshmen can join, and entry to the cultural music stage remains completely free. Sarah: Oh, great catch! I will update the poster right away and send the file to the print shop before four PM so we can put them up tomorrow morning.',
          question: 'What detail does Sarah need to update on the event poster?',
          options: [
            'The event date',
            'The price of the tasting voucher',
            'The location of the music stage',
            'The name of the print shop',
          ],
          correctIdx: 1,
          explanation:
            'Hội sinh viên giảm giá phiếu nếm món ăn từ 20.000đ xuống 15.000đ nên Sarah cần sửa lại chi tiết giá vé trên áp phích.',
        },
        {
          id: 'vstep-mock-3-q6',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'Khanh: Hey Sarah, did you finish designing the poster for Saturday’s International Food Day? Sarah: Almost! I just need to verify the ticket price with the student council. Are we still charging twenty thousand dong per tasting voucher? Khanh: Actually, the council agreed to lower it to fifteen thousand dong so more freshmen can join, and entry to the cultural music stage remains completely free. Sarah: Oh, great catch! I will update the poster right away and send the file to the print shop before four PM so we can put them up tomorrow morning.',
          question: 'How much does it cost to watch the cultural music stage?',
          options: [
            '15,000 dong',
            '20,000 dong',
            'It is completely free.',
            'Half price for freshmen',
          ],
          correctIdx: 2,
          explanation:
            'Khánh nói khu vực sân khấu ca nhạc văn hóa vẫn hoàn toàn miễn phí ("remains completely free").',
        },
        {
          id: 'vstep-mock-3-q7',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'Khanh: Hey Sarah, did you finish designing the poster for Saturday’s International Food Day? Sarah: Almost! I just need to verify the ticket price with the student council. Are we still charging twenty thousand dong per tasting voucher? Khanh: Actually, the council agreed to lower it to fifteen thousand dong so more freshmen can join, and entry to the cultural music stage remains completely free. Sarah: Oh, great catch! I will update the poster right away and send the file to the print shop before four PM so we can put them up tomorrow morning.',
          question: 'When does Sarah plan to send the poster file to the print shop?',
          options: [
            'Tomorrow morning',
            'On Saturday afternoon',
            'After five PM tonight',
            'Before four PM today',
          ],
          correctIdx: 3,
          explanation:
            'Sarah nói sẽ gửi tệp in trước 4 giờ chiều nay ("before four PM") để sáng mai có thể dán áp phích.',
        },
        {
          id: 'vstep-mock-3-q8',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'Welcome to our workshop on effective teamwork. Many project leaders assume that assigning roles strictly at the first meeting eliminates conflict, yet studies of student engineering teams reveal a different pattern. Groups that spend thirty minutes upfront establishing shared communication norms—such as agreeing on response times for messages and how disagreements will be discussed—consistently outperform groups that rush straight into dividing tasks. Equally vital is holding brief ten-minute check-ins halfway through a project, allowing teams to catch uneven workloads before frustration builds up prior to the final deadline.',
          question: 'What does the speaker say helps teams outperform others?',
          options: [
            'Spending time early on to agree on shared communication norms',
            'Dividing tasks within the first five minutes without discussion',
            'Avoiding all face-to-face check-ins until the deadline',
            'Letting one leader complete every difficult section alone',
          ],
          correctIdx: 0,
          explanation:
            'Các nhóm dành 30 phút đầu thống nhất quy tắc giao tiếp chung luôn đạt kết quả tốt hơn nhóm vội vàng chia việc ngay.',
        },
        {
          id: 'vstep-mock-3-q9',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'Welcome to our workshop on effective teamwork. Many project leaders assume that assigning roles strictly at the first meeting eliminates conflict, yet studies of student engineering teams reveal a different pattern. Groups that spend thirty minutes upfront establishing shared communication norms—such as agreeing on response times for messages and how disagreements will be discussed—consistently outperform groups that rush straight into dividing tasks. Equally vital is holding brief ten-minute check-ins halfway through a project, allowing teams to catch uneven workloads before frustration builds up prior to the final deadline.',
          question: 'Which example of a communication norm is mentioned in the talk?',
          options: [
            'Choosing a team color scheme',
            'Agreeing on message response times',
            'Booking restaurant tables after exams',
            'Using identical laptop brands',
          ],
          correctIdx: 1,
          explanation:
            'Ví dụ quy tắc giao tiếp được nêu là thống nhất thời gian phản hồi tin nhắn và cách thảo luận bất đồng.',
        },
        {
          id: 'vstep-mock-3-q10',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'Welcome to our workshop on effective teamwork. Many project leaders assume that assigning roles strictly at the first meeting eliminates conflict, yet studies of student engineering teams reveal a different pattern. Groups that spend thirty minutes upfront establishing shared communication norms—such as agreeing on response times for messages and how disagreements will be discussed—consistently outperform groups that rush straight into dividing tasks. Equally vital is holding brief ten-minute check-ins halfway through a project, allowing teams to catch uneven workloads before frustration builds up prior to the final deadline.',
          question: 'Why are ten-minute mid-project check-ins recommended?',
          options: [
            'To grade each member’s handwriting',
            'To replace the final presentation',
            'To spot uneven workloads early before frustration grows',
            'To extend the professor’s deadline automatically',
          ],
          correctIdx: 2,
          explanation:
            'Họp nhanh 10 phút giữa dự án giúp phát hiện sớm khối lượng việc phân bổ chưa đều trước khi sự bực bội tích tụ sát hạn chót.',
        },
        {
          id: 'vstep-mock-3-q11',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'For centuries, lighthouses stood on rocky coasts as vital beacons guiding ships safely past hidden reefs. Equipped with rotating glass lenses and bright oil lamps—later upgraded to electric bulbs—each lighthouse flashed a unique pattern of light so sailors could identify their exact location along unfamiliar coastlines even in thick fog. With the arrival of satellite navigation systems like GPS in the late twentieth century, automated radio signals largely replaced visual light signals for commercial vessels. Consequently, most countries have automated their remaining coastal stations, ending the era of full-time lighthouse keepers living in isolated stone towers. Rather than demolishing these historic landmarks, however, coastal communities increasingly preserve them as maritime museums, weather monitoring posts, and scenic eco-tourism stops.',
          question: 'Why did each traditional lighthouse flash a distinct pattern of light?',
          options: [
            'To save electricity during winter nights',
            'To signal fishing boats when markets opened',
            'To attract tourists to rocky cliffs',
            'To help sailors recognize their exact position along a coast',
          ],
          correctIdx: 3,
          explanation:
            'Mỗi hải đăng nhấp nháy theo nhịp riêng để thủy thủ xác định chính xác vị trí dọc bờ biển ngay cả trong sương mù dày.',
        },
        {
          id: 'vstep-mock-3-q12',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'For centuries, lighthouses stood on rocky coasts as vital beacons guiding ships safely past hidden reefs. Equipped with rotating glass lenses and bright oil lamps—later upgraded to electric bulbs—each lighthouse flashed a unique pattern of light so sailors could identify their exact location along unfamiliar coastlines even in thick fog. With the arrival of satellite navigation systems like GPS in the late twentieth century, automated radio signals largely replaced visual light signals for commercial vessels. Consequently, most countries have automated their remaining coastal stations, ending the era of full-time lighthouse keepers living in isolated stone towers. Rather than demolishing these historic landmarks, however, coastal communities increasingly preserve them as maritime museums, weather monitoring posts, and scenic eco-tourism stops.',
          question: 'What technology reduced commercial ships’ reliance on visual lighthouse signals?',
          options: [
            'Satellite navigation systems such as GPS',
            'Rotating glass lenses',
            'Bright oil lamps',
            'Isolated stone towers',
          ],
          correctIdx: 0,
          explanation:
            'Sự xuất hiện của hệ thống định vị vệ tinh như GPS cuối thế kỷ 20 đã thay thế phần lớn tín hiệu ánh sáng truyền thống.',
        },
        {
          id: 'vstep-mock-3-q13',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'For centuries, lighthouses stood on rocky coasts as vital beacons guiding ships safely past hidden reefs. Equipped with rotating glass lenses and bright oil lamps—later upgraded to electric bulbs—each lighthouse flashed a unique pattern of light so sailors could identify their exact location along unfamiliar coastlines even in thick fog. With the arrival of satellite navigation systems like GPS in the late twentieth century, automated radio signals largely replaced visual light signals for commercial vessels. Consequently, most countries have automated their remaining coastal stations, ending the era of full-time lighthouse keepers living in isolated stone towers. Rather than demolishing these historic landmarks, however, coastal communities increasingly preserve them as maritime museums, weather monitoring posts, and scenic eco-tourism stops.',
          question: 'The word "demolishing" in the final sentence is closest in meaning to:',
          options: ['repainting', 'tearing down', 'expanding', 'photographing'],
          correctIdx: 1,
          explanation:
            '"Demolishing" nghĩa là phá dỡ, đánh sập ("tearing down")—trái ngược với việc bảo tồn ("preserve").',
        },
        {
          id: 'vstep-mock-3-q14',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'For centuries, lighthouses stood on rocky coasts as vital beacons guiding ships safely past hidden reefs. Equipped with rotating glass lenses and bright oil lamps—later upgraded to electric bulbs—each lighthouse flashed a unique pattern of light so sailors could identify their exact location along unfamiliar coastlines even in thick fog. With the arrival of satellite navigation systems like GPS in the late twentieth century, automated radio signals largely replaced visual light signals for commercial vessels. Consequently, most countries have automated their remaining coastal stations, ending the era of full-time lighthouse keepers living in isolated stone towers. Rather than demolishing these historic landmarks, however, coastal communities increasingly preserve them as maritime museums, weather monitoring posts, and scenic eco-tourism stops.',
          question: 'In the last sentence, what does the pronoun "them" refer to?',
          options: [
            'Commercial vessels',
            'Hidden reefs',
            'Historic lighthouses',
            'Full-time keepers',
          ],
          correctIdx: 2,
          explanation:
            '"Rather than demolishing these historic landmarks... preserve them" — "them" thay thế cho "these historic landmarks" (các ngọn hải đăng lịch sử).',
        },
        {
          id: 'vstep-mock-3-q15',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'For centuries, lighthouses stood on rocky coasts as vital beacons guiding ships safely past hidden reefs. Equipped with rotating glass lenses and bright oil lamps—later upgraded to electric bulbs—each lighthouse flashed a unique pattern of light so sailors could identify their exact location along unfamiliar coastlines even in thick fog. With the arrival of satellite navigation systems like GPS in the late twentieth century, automated radio signals largely replaced visual light signals for commercial vessels. Consequently, most countries have automated their remaining coastal stations, ending the era of full-time lighthouse keepers living in isolated stone towers. Rather than demolishing these historic landmarks, however, coastal communities increasingly preserve them as maritime museums, weather monitoring posts, and scenic eco-tourism stops.',
          question: 'Which modern role for preserved lighthouses is NOT mentioned in the passage?',
          options: [
            'Maritime museums',
            'Weather monitoring posts',
            'Eco-tourism attractions',
            'Luxury shopping malls',
          ],
          correctIdx: 3,
          explanation:
            'Bài đọc liệt kê bảo tàng hàng hải, trạm quan trắc thời tiết và điểm du lịch sinh thái; không nhắc tới trung tâm mua sắm cao cấp.',
        },
        {
          id: 'vstep-mock-3-q16',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'Public speaking anxiety is frequently listed among adults’ most common workplace fears, yet communication coaches note that nervous energy is often misunderstood. Physiologically, a racing heart and rapid breathing before stepping onto a stage mirror the exact adrenaline response triggered by excitement. Studies at business schools found that speakers who simply told themselves "I am excited" aloud prior to a presentation spoke more persuasively and appeared more confident to evaluators than peers who attempted to force themselves to "calm down." Trying to suppress arousal entirely is difficult because heart rate drops slowly, whereas reframing nervous tension as enthusiasm aligns naturally with an energetic body and sharpens vocal delivery.',
          question: 'What is the main point of the passage?',
          options: [
            'Reframing stage nervousness as excitement improves speaking performance.',
            'Business schools should stop requiring oral presentations.',
            'Drinking water eliminates adrenaline before a speech.',
            'Only extroverted managers can speak persuasively on stage.',
          ],
          correctIdx: 0,
          explanation:
            'Đoạn văn giải thích việc chuyển hóa tâm lý lo lắng trước đám đông thành sự hào hứng ("I am excited") giúp bài thuyết trình tự tin và thuyết phục hơn cố gắng tự trấn an "bình tĩnh lại".',
        },
        {
          id: 'vstep-mock-3-q17',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'Public speaking anxiety is frequently listed among adults’ most common workplace fears, yet communication coaches note that nervous energy is often misunderstood. Physiologically, a racing heart and rapid breathing before stepping onto a stage mirror the exact adrenaline response triggered by excitement. Studies at business schools found that speakers who simply told themselves "I am excited" aloud prior to a presentation spoke more persuasively and appeared more confident to evaluators than peers who attempted to force themselves to "calm down." Trying to suppress arousal entirely is difficult because heart rate drops slowly, whereas reframing nervous tension as enthusiasm aligns naturally with an energetic body and sharpens vocal delivery.',
          question: 'Why does the author compare stage anxiety to excitement?',
          options: [
            'Both are caused by memorizing long scripts.',
            'Both produce similar physical responses such as a faster heartbeat.',
            'Both happen only to inexperienced speakers.',
            'Both disappear instantly after two minutes.',
          ],
          correctIdx: 1,
          explanation:
            'Về mặt sinh lý, tim đập nhanh và thở gấp khi hồi hộp giống hệt phản ứng adrenaline khi phấn khích.',
        },
        {
          id: 'vstep-mock-3-q18',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'Public speaking anxiety is frequently listed among adults’ most common workplace fears, yet communication coaches note that nervous energy is often misunderstood. Physiologically, a racing heart and rapid breathing before stepping onto a stage mirror the exact adrenaline response triggered by excitement. Studies at business schools found that speakers who simply told themselves "I am excited" aloud prior to a presentation spoke more persuasively and appeared more confident to evaluators than peers who attempted to force themselves to "calm down." Trying to suppress arousal entirely is difficult because heart rate drops slowly, whereas reframing nervous tension as enthusiasm aligns naturally with an energetic body and sharpens vocal delivery.',
          question: 'In the business school study, how did evaluators rate speakers who said "I am excited"?',
          options: [
            'Less prepared than silent speakers',
            'Too loud for small meeting rooms',
            'More persuasive and confident than those trying to calm down',
            'Equally nervous as every other group',
          ],
          correctIdx: 2,
          explanation:
            'Những người tự nhủ "I am excited" nói thuyết phục hơn và trông tự tin hơn trước ban giám khảo.',
        },
        {
          id: 'vstep-mock-3-q19',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'Public speaking anxiety is frequently listed among adults’ most common workplace fears, yet communication coaches note that nervous energy is often misunderstood. Physiologically, a racing heart and rapid breathing before stepping onto a stage mirror the exact adrenaline response triggered by excitement. Studies at business schools found that speakers who simply told themselves "I am excited" aloud prior to a presentation spoke more persuasively and appeared more confident to evaluators than peers who attempted to force themselves to "calm down." Trying to suppress arousal entirely is difficult because heart rate drops slowly, whereas reframing nervous tension as enthusiasm aligns naturally with an energetic body and sharpens vocal delivery.',
          question: 'Why is forcing oneself to "calm down" less effective?',
          options: [
            'Evaluators dislike relaxed speakers.',
            'Breathing exercises are forbidden before presentations.',
            'Words spoken aloud make throats dry.',
            'It is hard to slow down a high heart rate immediately.',
          ],
          correctIdx: 3,
          explanation:
            'Nhịp tim giảm chậm nên rất khó dập tắt hoàn toàn trạng thái kích thích sinh lý ngay lập tức.',
        },
        {
          id: 'vstep-mock-3-q20',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'Public speaking anxiety is frequently listed among adults’ most common workplace fears, yet communication coaches note that nervous energy is often misunderstood. Physiologically, a racing heart and rapid breathing before stepping onto a stage mirror the exact adrenaline response triggered by excitement. Studies at business schools found that speakers who simply told themselves "I am excited" aloud prior to a presentation spoke more persuasively and appeared more confident to evaluators than peers who attempted to force themselves to "calm down." Trying to suppress arousal entirely is difficult because heart rate drops slowly, whereas reframing nervous tension as enthusiasm aligns naturally with an energetic body and sharpens vocal delivery.',
          question: 'The word "reframing" in the final sentence is closest in meaning to:',
          options: [
            'reinterpreting positively',
            'forgetting completely',
            'measuring accurately',
            'postponing briefly',
          ],
          correctIdx: 0,
          explanation:
            '"Reframing nervous tension as enthusiasm" có nghĩa là nhìn nhận/diễn giải lại cảm giác căng thẳng theo hướng tích cực thành sự nhiệt huyết.',
        },
        {
          id: 'vstep-mock-3-q21',
          skill: 'grammar',
          partLabel: 'Use of English (Prepositions & Linking)',
          question:
            '______ the heavy morning rain, nearly two hundred volunteers showed up for the river clean-up.',
          options: ['Although', 'Despite', 'Because', 'However'],
          correctIdx: 1,
          explanation:
            'Theo sau chỗ trống là cụm danh từ ("the heavy morning rain") và hai vế mang nghĩa nhượng bộ, nên dùng giới từ "Despite".',
        },
        {
          id: 'vstep-mock-3-q22',
          skill: 'grammar',
          partLabel: 'Use of English (Passive & Tense)',
          question:
            'By the time the new metro line opens next year, the city ______ over five million dollars on station accessibility upgrades.',
          options: [
            'spends',
            'has spent',
            'will have spent',
            'is spending',
          ],
          correctIdx: 2,
          explanation:
            'Cụm "By the time + thì hiện tại đơn (mốc tương lai)" đi với thì Tương lai hoàn thành ("will have spent").',
        },
        {
          id: 'vstep-mock-3-q23',
          skill: 'grammar',
          partLabel: 'Use of English (Subjunctive / Formal Request)',
          question:
            'The committee recommended that every scholarship applicant ______ two academic reference letters.',
          options: ['submitting', 'to submit', 'submitted', 'submit'],
          correctIdx: 3,
          explanation:
            'Cấu trúc giả định sau "recommend that + S + (should) + V nguyên mẫu" dùng "submit".',
        },
        {
          id: 'vstep-mock-3-q24',
          skill: 'vocab',
          partLabel: 'Use of English (Word Choice)',
          question:
            'Remote internships offer valuable industry exposure; ______, interns miss out on casual mentorship beside senior colleagues.',
          options: ['on the other hand', 'as a result', 'in addition', 'for instance'],
          correctIdx: 0,
          explanation:
            'Vế đầu nêu ưu điểm, vế sau nêu mặt hạn chế đối lập nên dùng cụm chuyển ý tương phản "on the other hand".',
        },
        {
          id: 'vstep-mock-3-q25',
          skill: 'vocab',
          partLabel: 'Use of English (Academic Collocation)',
          question:
            'Strict noise limits were introduced to ______ a balance between nightlife tourism and residents’ sleep quality.',
          options: ['do', 'strike', 'make', 'throw'],
          correctIdx: 1,
          explanation:
            'Collocation học thuật chuẩn ở bậc B2–C1 là "strike a balance between A and B" (tạo sự cân bằng giữa A và B).',
        },
      ],
    },
    {
      title: 'Mini Mock Test #4',
      description:
        'Đề thi thử VSTEP số 4 (30 phút — 25 câu): độ khó B2–C1 với nghe hội thoại học thuật, đọc hiểu từ vựng ngữ cảnh và ngữ pháp nâng cao.',
      durationMinutes: 30,
      questions: [
        {
          id: 'vstep-mock-4-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Attention campus cyclists. Starting Monday morning, the bike rack beside the Chemistry Annex will be closed for roof painting. Cyclists should park along the covered pathway behind the Student Center until Friday evening.',
          question: 'Where should campus cyclists park their bicycles from Monday to Friday?',
          options: [
            'Beside the Chemistry Annex',
            'Inside the Chemistry Lab lobby',
            'Along the covered pathway behind the Student Center',
            'In front of the Main Auditorium gate',
          ],
          correctIdx: 2,
          explanation:
            'Bãi xe cạnh khu Hóa đang sơn mái nên người đi xe đạp được hướng dẫn đỗ dọc lối có mái che phía sau Student Center.',
        },
        {
          id: 'vstep-mock-4-q2',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Welcome to City Art Gallery. Today’s guided tour of the Modern Ceramics exhibition begins at eleven AM sharp at the West Fountain. Audio headsets are available free of charge at the information counter in exchange for a photo ID.',
          question: 'What is needed to borrow a free audio headset?',
          options: [
            'A refundable cash deposit',
            'A concert ticket stub',
            'A gallery membership card',
            'A photo ID',
          ],
          correctIdx: 3,
          explanation:
            'Khách tham quan chỉ cần gửi lại giấy tờ tùy thân có ảnh ("a photo ID") tại quầy thông tin để mượn tai nghe miễn phí.',
        },
        {
          id: 'vstep-mock-4-q3',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Attention passengers on Bus Route 9. Because of a street festival on Le Loi Boulevard, buses will skip the City Theater stop today and pick up passengers one block east at Nguyen Hue Park instead.',
          question: 'Why are Route 9 buses skipping the City Theater stop today?',
          options: [
            'A street festival is taking place on Le Loi Boulevard.',
            'The City Theater is closed for winter holidays.',
            'Route 9 drivers are attending a safety meeting.',
            'Road paving has blocked Nguyen Hue Park.',
          ],
          correctIdx: 0,
          explanation:
            'Do lễ hội đường phố trên đại lộ Lê Lợi, xe buýt bỏ qua trạm Nhà hát Thành phố và đón khách tại Công viên Nguyễn Huệ.',
        },
        {
          id: 'vstep-mock-4-q4',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Hi students, this is Professor Tan from the Economics Department. Tomorrow’s ten AM tutorial is canceled because I must attend an external dissertation defense. However, our Friday afternoon lecture will run as scheduled, and I will post extra practice sheets online tonight.',
          question: 'What will Professor Tan do tonight?',
          options: [
            'Hold an online dissertation defense',
            'Post extra practice sheets online',
            'Reschedule Friday’s lecture to Saturday',
            'Grade midterm essays in Room 204',
          ],
          correctIdx: 1,
          explanation:
            'Giáo sư Tân thông báo hủy buổi hướng dẫn sáng mai nhưng sẽ đăng thêm bài tập thực hành lên mạng tối nay ("post extra practice sheets online tonight").',
        },
        {
          id: 'vstep-mock-4-q5',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'Linh: Hi David, have you booked our train tickets for the Mekong field study yet? David: Almost, Linh—I checked the morning schedule, and the 6:40 express is already sold out. There are still seats on the 8:15 train, which arrives in Can Tho right before lunch. Linh: Eight fifteen works nicely because Dr. Hoa asked us to meet the local agricultural cooperative at two PM. Should we reserve seats together online now? David: Yes, let us book them through the student travel portal since it waives the booking fee if we use university email addresses.',
          question: 'Why could David not book tickets on the 6:40 express train?',
          options: [
            'It was canceled due to rain.',
            'It does not stop in Can Tho.',
            'All seats were already sold out.',
            'The student portal rejected his email.',
          ],
          correctIdx: 2,
          explanation:
            'David kiểm tra lịch sáng và thấy chuyến 6:40 đã hết vé ("already sold out").',
        },
        {
          id: 'vstep-mock-4-q6',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'Linh: Hi David, have you booked our train tickets for the Mekong field study yet? David: Almost, Linh—I checked the morning schedule, and the 6:40 express is already sold out. There are still seats on the 8:15 train, which arrives in Can Tho right before lunch. Linh: Eight fifteen works nicely because Dr. Hoa asked us to meet the local agricultural cooperative at two PM. Should we reserve seats together online now? David: Yes, let us book them through the student travel portal since it waives the booking fee if we use university email addresses.',
          question: 'At what time are Linh and David supposed to meet the agricultural cooperative?',
          options: ['6:40 AM', '8:15 AM', '12:00 PM', '2:00 PM'],
          correctIdx: 3,
          explanation:
            'Linh nói Tiến sĩ Hoa hẹn gặp hợp tác xã nông nghiệp địa phương lúc 2 giờ chiều ("at two PM").',
        },
        {
          id: 'vstep-mock-4-q7',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'Linh: Hi David, have you booked our train tickets for the Mekong field study yet? David: Almost, Linh—I checked the morning schedule, and the 6:40 express is already sold out. There are still seats on the 8:15 train, which arrives in Can Tho right before lunch. Linh: Eight fifteen works nicely because Dr. Hoa asked us to meet the local agricultural cooperative at two PM. Should we reserve seats together online now? David: Yes, let us book them through the student travel portal since it waives the booking fee if we use university email addresses.',
          question: 'Why does David suggest using the student travel portal?',
          options: [
            'It removes the booking fee for university emails.',
            'It offers free hotel rooms in Can Tho.',
            'It includes free lunch on the train.',
            'It prints paper tickets at the library.',
          ],
          correctIdx: 0,
          explanation:
            'Cổng đặt vé sinh viên miễn phí đặt chỗ khi dùng email của trường ("waives the booking fee if we use university email addresses").',
        },
        {
          id: 'vstep-mock-4-q8',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'Good afternoon, architecture students. Today we examine "biophilic design"—the practice of integrating natural elements such as daylight, indoor plants, and timber textures into modern buildings. Hospitals that redesigned patient recovery rooms to face leafy courtyards rather than brick walls recorded measurably shorter hospital stays and lower pain-medication requests. Importantly, biophilic design does not require expensive glass domes; even modest offices see higher staff morale when desks are oriented near natural windows and harsh fluorescent bulbs are replaced with warm, daylight-balanced lighting.',
          question: 'What is "biophilic design" according to the speaker?',
          options: [
            'Building skyscrapers entirely out of recycled plastic',
            'Integrating natural elements like daylight and plants into buildings',
            'Removing all windows from hospital recovery rooms',
            'Painting exterior brick walls bright green',
          ],
          correctIdx: 1,
          explanation:
            'Thiết kế ưa sinh học ("biophilic design") là đưa các yếu tố tự nhiên như ánh sáng ban ngày, cây xanh và chất liệu gỗ vào kiến trúc hiện đại.',
        },
        {
          id: 'vstep-mock-4-q9',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'Good afternoon, architecture students. Today we examine "biophilic design"—the practice of integrating natural elements such as daylight, indoor plants, and timber textures into modern buildings. Hospitals that redesigned patient recovery rooms to face leafy courtyards rather than brick walls recorded measurably shorter hospital stays and lower pain-medication requests. Importantly, biophilic design does not require expensive glass domes; even modest offices see higher staff morale when desks are oriented near natural windows and harsh fluorescent bulbs are replaced with warm, daylight-balanced lighting.',
          question: 'What benefit did hospitals observe when recovery rooms faced leafy courtyards?',
          options: [
            'Lower electricity costs for air conditioning',
            'More space for ambulance parking',
            'Shorter recovery stays and fewer pain-medication requests',
            'Faster training for nursing interns',
          ],
          correctIdx: 2,
          explanation:
            'Bệnh viện ghi nhận thời gian nằm viện rút ngắn rõ rệt và nhu cầu thuốc giảm đau ít hơn khi phòng hồi sức nhìn ra sân vườn cây xanh.',
        },
        {
          id: 'vstep-mock-4-q10',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'Good afternoon, architecture students. Today we examine "biophilic design"—the practice of integrating natural elements such as daylight, indoor plants, and timber textures into modern buildings. Hospitals that redesigned patient recovery rooms to face leafy courtyards rather than brick walls recorded measurably shorter hospital stays and lower pain-medication requests. Importantly, biophilic design does not require expensive glass domes; even modest offices see higher staff morale when desks are oriented near natural windows and harsh fluorescent bulbs are replaced with warm, daylight-balanced lighting.',
          question: 'What point does the speaker make about applying biophilic design in modest offices?',
          options: [
            'It always requires building an expensive glass dome.',
            'It only works in rural agricultural buildings.',
            'It lowers employee productivity during winter.',
            'Simple steps like arranging desks near windows and warmer lighting still help.',
          ],
          correctIdx: 3,
          explanation:
            'Không cần mái vòm kính đắt đỏ; văn phòng bình thường vẫn cải thiện tinh thần nhân viên nhờ kê bàn gần cửa sổ tự nhiên và thay đèn dịu ấm.',
        },
        {
          id: 'vstep-mock-4-q11',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'Every spring, thousands of volunteers worldwide take part in "citizen science" projects—collaborations in which non-specialists collect environmental observations for university researchers. Using smartphone apps, amateur birdwatchers log seasonal migration dates, hikers photograph rare wildflowers along mountain trails, and coastal residents measure local rainfall after storms. Because professional scientists cannot station paid observers in every neighborhood simultaneously, public participation supplies vast geographic datasets that would otherwise be impossible to gather. Skeptics once questioned whether volunteer data was reliable enough for peer-reviewed journals; however, modern platforms solve this concern by requiring uploaded photos, GPS timestamps, and automated verification from experienced regional moderators.',
          question: 'What is the main advantage of citizen science projects?',
          options: [
            'Volunteers help researchers gather large-scale geographic data across wide areas.',
            'Smartphone apps replace university biology departments.',
            'Amateur hikers earn full-time salaries from journals.',
            'Tourists can visit mountain trails without safety gear.',
          ],
          correctIdx: 0,
          explanation:
            'Nhờ sự tham gia của cộng đồng, giới nghiên cứu thu thập được kho dữ liệu địa lý rộng lớn mà đội ngũ chuyên gia đơn lẻ không thể tự phủ kín.',
        },
        {
          id: 'vstep-mock-4-q12',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'Every spring, thousands of volunteers worldwide take part in "citizen science" projects—collaborations in which non-specialists collect environmental observations for university researchers. Using smartphone apps, amateur birdwatchers log seasonal migration dates, hikers photograph rare wildflowers along mountain trails, and coastal residents measure local rainfall after storms. Because professional scientists cannot station paid observers in every neighborhood simultaneously, public participation supplies vast geographic datasets that would otherwise be impossible to gather. Skeptics once questioned whether volunteer data was reliable enough for peer-reviewed journals; however, modern platforms solve this concern by requiring uploaded photos, GPS timestamps, and automated verification from experienced regional moderators.',
          question: 'Which volunteer activity is NOT mentioned in the passage?',
          options: [
            'Recording seasonal bird migration dates',
            'Testing drinking water inside hospital labs',
            'Photographing rare wildflowers on trails',
            'Measuring rainfall in coastal neighborhoods',
          ],
          correctIdx: 1,
          explanation:
            'Bài đọc nhắc ghi nhận chim di cư, chụp ảnh hoa dại trên núi và đo lượng mưa vùng biển; không đề cập xét nghiệm nước trong phòng lab bệnh viện.',
        },
        {
          id: 'vstep-mock-4-q13',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'Every spring, thousands of volunteers worldwide take part in "citizen science" projects—collaborations in which non-specialists collect environmental observations for university researchers. Using smartphone apps, amateur birdwatchers log seasonal migration dates, hikers photograph rare wildflowers along mountain trails, and coastal residents measure local rainfall after storms. Because professional scientists cannot station paid observers in every neighborhood simultaneously, public participation supplies vast geographic datasets that would otherwise be impossible to gather. Skeptics once questioned whether volunteer data was reliable enough for peer-reviewed journals; however, modern platforms solve this concern by requiring uploaded photos, GPS timestamps, and automated verification from experienced regional moderators.',
          question: 'How do modern platforms address doubts about the reliability of volunteer data?',
          options: [
            'By banning non-specialists from uploading smartphone notes',
            'By deleting all observations taken outside capital cities',
            'By requiring photos, GPS timestamps, and moderator verification',
            'By publishing data without peer review',
          ],
          correctIdx: 2,
          explanation:
            'Các nền tảng hiện đại yêu cầu ảnh chụp kèm dấu thời gian GPS và kiểm duyệt từ điều phối viên giàu kinh nghiệm.',
        },
        {
          id: 'vstep-mock-4-q14',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'Every spring, thousands of volunteers worldwide take part in "citizen science" projects—collaborations in which non-specialists collect environmental observations for university researchers. Using smartphone apps, amateur birdwatchers log seasonal migration dates, hikers photograph rare wildflowers along mountain trails, and coastal residents measure local rainfall after storms. Because professional scientists cannot station paid observers in every neighborhood simultaneously, public participation supplies vast geographic datasets that would otherwise be impossible to gather. Skeptics once questioned whether volunteer data was reliable enough for peer-reviewed journals; however, modern platforms solve this concern by requiring uploaded photos, GPS timestamps, and automated verification from experienced regional moderators.',
          question: 'The word "vast" in sentence 3 is closest in meaning to:',
          options: ['outdated', 'fragile', 'secret', 'enormous'],
          correctIdx: 3,
          explanation:
            '"Vast geographic datasets" nghĩa là các tập dữ liệu địa lý khổng lồ, rộng lớn ("enormous").',
        },
        {
          id: 'vstep-mock-4-q15',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'Every spring, thousands of volunteers worldwide take part in "citizen science" projects—collaborations in which non-specialists collect environmental observations for university researchers. Using smartphone apps, amateur birdwatchers log seasonal migration dates, hikers photograph rare wildflowers along mountain trails, and coastal residents measure local rainfall after storms. Because professional scientists cannot station paid observers in every neighborhood simultaneously, public participation supplies vast geographic datasets that would otherwise be impossible to gather. Skeptics once questioned whether volunteer data was reliable enough for peer-reviewed journals; however, modern platforms solve this concern by requiring uploaded photos, GPS timestamps, and automated verification from experienced regional moderators.',
          question: 'In the final sentence, what does "this concern" refer to?',
          options: [
            'Doubt about whether volunteer-collected data is accurate enough for research journals',
            'The cost of buying smartphones for coastal residents',
            'Difficulty climbing steep mountain trails in spring',
            'Lack of interest among amateur birdwatchers',
          ],
          correctIdx: 0,
          explanation:
            '"This concern" nối trực tiếp với nghi ngại ở mệnh đề ngay trước đó về độ tin cậy của dữ liệu do tình nguyện viên thu thập.',
        },
        {
          id: 'vstep-mock-4-q16',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'When companies launch innovative products, marketing teams frequently assume that early setbacks stem from insufficient advertising budgets. Yet organizational historians studying decades of consumer inventions point to a different hurdle: "ecosystem readiness." An electric car in 1900 or a smart home thermostat in 1995 may have worked reliably in laboratory tests, yet struggled commercially because supporting infrastructure—such as public charging stations, affordable wireless networks, or standardized repair technicians—did not yet exist. Conversely, once complementary technologies mature together, products that once seemed ahead of their time gain rapid mainstream acceptance within just a few years.',
          question: 'What is the main purpose of the passage?',
          options: [
            'To argue that advertising budgets guarantee instant commercial success',
            'To explain why innovations succeed only when supporting ecosystems are ready',
            'To compare electric cars from 1900 with modern bicycles',
            'To criticize laboratory engineers for ignoring repair costs',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn văn nhấn mạnh nhiều phát minh thất bại ban đầu không phải vì thiếu quảng cáo mà vì "hệ sinh thái hỗ trợ" (hạ tầng, mạng, kỹ thuật viên) chưa sẵn sàng.',
        },
        {
          id: 'vstep-mock-4-q17',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'When companies launch innovative products, marketing teams frequently assume that early setbacks stem from insufficient advertising budgets. Yet organizational historians studying decades of consumer inventions point to a different hurdle: "ecosystem readiness." An electric car in 1900 or a smart home thermostat in 1995 may have worked reliably in laboratory tests, yet struggled commercially because supporting infrastructure—such as public charging stations, affordable wireless networks, or standardized repair technicians—did not yet exist. Conversely, once complementary technologies mature together, products that once seemed ahead of their time gain rapid mainstream acceptance within just a few years.',
          question: 'Why does the author mention the smart home thermostat from 1995?',
          options: [
            'As an invention that failed safety tests in laboratories',
            'As proof that consumers hated wireless internet',
            'As an example of a reliable product held back by missing infrastructure',
            'As a device that needed zero maintenance technicians',
          ],
          correctIdx: 2,
          explanation:
            'Bộ điều nhiệt thông minh năm 1995 chạy tốt trong phòng lab nhưng gặp khó về thương mại vì thiếu mạng không dây giá rẻ và hạ tầng đi kèm.',
        },
        {
          id: 'vstep-mock-4-q18',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'When companies launch innovative products, marketing teams frequently assume that early setbacks stem from insufficient advertising budgets. Yet organizational historians studying decades of consumer inventions point to a different hurdle: "ecosystem readiness." An electric car in 1900 or a smart home thermostat in 1995 may have worked reliably in laboratory tests, yet struggled commercially because supporting infrastructure—such as public charging stations, affordable wireless networks, or standardized repair technicians—did not yet exist. Conversely, once complementary technologies mature together, products that once seemed ahead of their time gain rapid mainstream acceptance within just a few years.',
          question: 'The word "setbacks" in the first sentence is closest in meaning to:',
          options: [
            'rapid profits',
            'clear instructions',
            'early difficulties or failures',
            'long-term partnerships',
          ],
          correctIdx: 2,
          explanation:
            '"Early setbacks" nghĩa là những vấp ngã, trở ngại hoặc thất bại bước đầu ("early difficulties or failures").',
        },
        {
          id: 'vstep-mock-4-q19',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'When companies launch innovative products, marketing teams frequently assume that early setbacks stem from insufficient advertising budgets. Yet organizational historians studying decades of consumer inventions point to a different hurdle: "ecosystem readiness." An electric car in 1900 or a smart home thermostat in 1995 may have worked reliably in laboratory tests, yet struggled commercially because supporting infrastructure—such as public charging stations, affordable wireless networks, or standardized repair technicians—did not yet exist. Conversely, once complementary technologies mature together, products that once seemed ahead of their time gain rapid mainstream acceptance within just a few years.',
          question: 'What happens once complementary technologies develop together?',
          options: [
            'Companies eliminate all marketing departments.',
            'Products that seemed premature can quickly win broad public adoption.',
            'Repair technicians become unnecessary.',
            'Laboratory tests stop being important.',
          ],
          correctIdx: 1,
          explanation:
            'Khi các công nghệ bổ trợ đồng loạt chín muồi, sản phẩm từng đi trước thời đại có thể nhanh chóng được thị trường đại chúng đón nhận.',
        },
        {
          id: 'vstep-mock-4-q20',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'When companies launch innovative products, marketing teams frequently assume that early setbacks stem from insufficient advertising budgets. Yet organizational historians studying decades of consumer inventions point to a different hurdle: "ecosystem readiness." An electric car in 1900 or a smart home thermostat in 1995 may have worked reliably in laboratory tests, yet struggled commercially because supporting infrastructure—such as public charging stations, affordable wireless networks, or standardized repair technicians—did not yet exist. Conversely, once complementary technologies mature together, products that once seemed ahead of their time gain rapid mainstream acceptance within just a few years.',
          question: 'What does "mainstream acceptance" at the end of the passage mean?',
          options: [
            'Approval by a single government committee',
            'Use limited only to university scientists',
            'Immediate removal from retail stores',
            'Widespread adoption by everyday consumers',
          ],
          correctIdx: 3,
          explanation:
            '"Mainstream acceptance" nghĩa là được số đông người tiêu dùng phổ thông chấp nhận và sử dụng rộng rãi.',
        },
        {
          id: 'vstep-mock-4-q21',
          skill: 'grammar',
          partLabel: 'Use of English (Cleft & Emphasis)',
          question:
            'Rarely ______ such strong collaboration between local schools and municipal libraries.',
          options: [
            'have educators witnessed',
            'educators have witnessed',
            'witnessed educators',
            'are educators witness',
          ],
          correctIdx: 0,
          explanation:
            'Trạng từ phủ định/hiếm khi "Rarely" đứng đầu câu yêu cầu đảo ngữ: "Rarely + trợ động từ (have) + S + V3".',
        },
        {
          id: 'vstep-mock-4-q22',
          skill: 'grammar',
          partLabel: 'Use of English (Gerunds & Infinitives)',
          question:
            'To improve writing coherence, learners should avoid ______ unrelated arguments within the same paragraph.',
          options: ['to mix', 'mixing', 'mixed', 'mix'],
          correctIdx: 1,
          explanation:
            'Động từ "avoid" luôn đi với danh động từ (V-ing): "avoid mixing".',
        },
        {
          id: 'vstep-mock-4-q23',
          skill: 'grammar',
          partLabel: 'Use of English (Comparison)',
          question:
            'The earlier residents sort household recyclables at home, ______ the municipal recycling process becomes.',
          options: [
            'the efficient',
            'more efficient',
            'the more efficient',
            'most efficient',
          ],
          correctIdx: 2,
          explanation:
            'Cấu trúc so sánh kép "The + so sánh hơn + S + V, the + so sánh hơn + S + V" ("the more efficient").',
        },
        {
          id: 'vstep-mock-4-q24',
          skill: 'vocab',
          partLabel: 'Use of English (Academic Vocabulary)',
          question:
            'Providing free vocational training can ______ young workers to adapt smoothly to automated industries.',
          options: ['prevent', 'hesitate', 'forbid', 'empower'],
          correctIdx: 3,
          explanation:
            '"Empower sb to V" nghĩa là trao quyền/tạo điều kiện giúp ai có khả năng làm gì ("empower young workers to adapt").',
        },
        {
          id: 'vstep-mock-4-q25',
          skill: 'vocab',
          partLabel: 'Use of English (Phrasal Verb)',
          question:
            'Due to an unexpected power outage in the studio, the podcast team had to ______ the live interview until Friday.',
          options: ['put off', 'turn up', 'carry out', 'look after'],
          correctIdx: 0,
          explanation:
            '"Put off" có nghĩa là trì hoãn ("postpone") buổi phỏng vấn trực tiếp sang thứ Sáu.',
        },
      ],
    },
    {
      title: 'Mini Mock Test #5',
      description:
        'Đề thi thử VSTEP số 5 (30 phút — 25 câu): tổng hợp nâng cao B2–C1 với nghe bài giảng, đọc suy luận sâu và cấu trúc học thuật.',
      durationMinutes: 30,
      questions: [
        {
          id: 'vstep-mock-5-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Attention museum guests. Our special exhibition "Silk Roads of Southeast Asia" will close in fifteen minutes at five thirty PM. Visitors wishing to purchase exhibition catalogs should visit the Ground Floor Gift Shop before five twenty-five.',
          question: 'By what time should guests visit the Gift Shop to buy exhibition catalogs?',
          options: ['5:00 PM', '5:25 PM', '5:30 PM', '5:45 PM'],
          correctIdx: 1,
          explanation:
            'Thông báo nhắc khách mua sách triển lãm tại cửa hàng tầng trệt trước 5:25 chiều ("before five twenty-five").',
        },
        {
          id: 'vstep-mock-5-q2',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Notice to all dormitory residents in Building B. Fire safety inspectors will test the hallway alarm bells tomorrow morning between nine and nine thirty. This is only a routine drill; residents do not need to evacuate their rooms.',
          question: 'What should Building B residents do during tomorrow morning’s alarm test?',
          options: [
            'Gather in the parking lot immediately',
            'Turn off all bedroom lights',
            'Remain inside without evacuating',
            'Meet inspectors at the main gate',
          ],
          correctIdx: 2,
          explanation:
            'Đây chỉ là kiểm tra định kỳ nên cư dân không cần sơ tán khỏi phòng ("do not need to evacuate their rooms").',
        },
        {
          id: 'vstep-mock-5-q3',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Good morning, passengers awaiting Flight VN408 to Da Lat. Due to dense fog at Lien Khuong Airport, our departure is delayed by forty-five minutes. Complimentary meal vouchers are now being distributed at Gate 7.',
          question: 'What is causing the delay of Flight VN408?',
          options: [
            'A shortage of cabin crew',
            'Technical checks on Gate 7',
            'Heavy luggage loading',
            'Dense fog at the destination airport',
          ],
          correctIdx: 3,
          explanation:
            'Chuyến bay bị trễ 45 phút do sương mù dày đặc tại sân bay Liên Khương ("dense fog at Lien Khuong Airport").',
        },
        {
          id: 'vstep-mock-5-q4',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Announcement)',
          audioScript:
            'Hello everyone, this is the Career Services Office. Employers from twelve technology firms will review student resumes during Tuesday’s Mock Interview Day. To reserve a twenty-minute slot, upload your CV in PDF format by Sunday midnight.',
          question: 'What must students do by Sunday midnight to join Mock Interview Day?',
          options: [
            'Upload their CV as a PDF file',
            'Print twelve copies of their transcript',
            'Call the technology firms directly',
            'Attend a workshop on Monday morning',
          ],
          correctIdx: 0,
          explanation:
            'Sinh viên cần tải CV định dạng PDF lên hệ thống trước nửa đêm Chủ Nhật để đặt lịch phỏng vấn thử 20 phút.',
        },
        {
          id: 'vstep-mock-5-q5',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'An: Hi Tom, did Professor Lan approve our research topic on urban noise levels? Tom: She liked our main idea, An, though she advised us to narrow the scope. Measuring traffic noise across the entire city would take months! An: That makes sense. What did she suggest instead? Tom: She recommended comparing noise levels at three types of intersections near campus during morning rush hour and mid-afternoon, and borrowing two digital sound meters from the Environmental Engineering Lab instead of relying on phone apps.',
          question: 'What concern did Professor Lan raise about An and Tom’s original proposal?',
          options: [
            'The topic was uninteresting for urban residents.',
            'Campus intersections were too quiet to measure.',
            'Digital sound meters were too difficult to operate.',
            'Covering the entire city was too broad for the available time.',
          ],
          correctIdx: 3,
          explanation:
            'Giáo sư Lan khuyên thu hẹp phạm vi vì đo tiếng ồn giao thông trên toàn thành phố sẽ mất hàng tháng trời.',
        },
        {
          id: 'vstep-mock-5-q6',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'An: Hi Tom, did Professor Lan approve our research topic on urban noise levels? Tom: She liked our main idea, An, though she advised us to narrow the scope. Measuring traffic noise across the entire city would take months! An: That makes sense. What did she suggest instead? Tom: She recommended comparing noise levels at three types of intersections near campus during morning rush hour and mid-afternoon, and borrowing two digital sound meters from the Environmental Engineering Lab instead of relying on phone apps.',
          question: 'At what times of day does Professor Lan advise taking noise measurements?',
          options: [
            'Dawn and midnight',
            'Noon and late evening',
            'Morning rush hour and mid-afternoon',
            'Only on Sunday afternoons',
          ],
          correctIdx: 2,
          explanation:
            'Cô gợi ý đo tại 3 kiểu ngã tư gần trường vào giờ cao điểm sáng và giữa buổi chiều ("morning rush hour and mid-afternoon").',
        },
        {
          id: 'vstep-mock-5-q7',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Conversation Q5–Q7)',
          audioScript:
            'An: Hi Tom, did Professor Lan approve our research topic on urban noise levels? Tom: She liked our main idea, An, though she advised us to narrow the scope. Measuring traffic noise across the entire city would take months! An: That makes sense. What did she suggest instead? Tom: She recommended comparing noise levels at three types of intersections near campus during morning rush hour and mid-afternoon, and borrowing two digital sound meters from the Environmental Engineering Lab instead of relying on phone apps.',
          question: 'What equipment should the students use instead of smartphone apps?',
          options: [
            'Video cameras from the library',
            'Voice recorders from the media club',
            'Traffic sensors from the police station',
            'Two digital sound meters from the lab',
          ],
          correctIdx: 3,
          explanation:
            'Cô khuyên mượn hai máy đo âm thanh kỹ thuật số từ phòng thí nghiệm Kỹ thuật Môi trường thay vì dùng app điện thoại.',
        },
        {
          id: 'vstep-mock-5-q8',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'Let us examine a counterintuitive discovery in sleep and memory research: why spacing study sessions across several days beats marathon "cramming" the night before a test. Neuroscientists explain that learning occurs in two stages. During active reading, the hippocampus temporarily holds new facts; however, consolidating those fragile traces into long-term cortical networks happens primarily during deep sleep. When a student studies six hours straight in one night without adequate rest, the brain receives little recovery time to stabilize earlier chapters, causing rapid forgetting within forty-eight hours. By contrast, three two-hour sessions separated by full nights of sleep trigger repeated consolidation cycles, producing far stronger recall months later.',
          question: 'According to neuroscientists, when does long-term memory consolidation mainly occur?',
          options: [
            'Primarily during deep sleep',
            'Immediately while highlighting textbooks',
            'Only during six-hour marathon study sessions',
            'Within five minutes after finishing coffee',
          ],
          correctIdx: 0,
          explanation:
            'Quá trình củng cố ký ức ngắn hạn thành mạng lưới vỏ não dài hạn diễn ra chủ yếu trong giấc ngủ sâu ("primarily during deep sleep").',
        },
        {
          id: 'vstep-mock-5-q9',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'Let us examine a counterintuitive discovery in sleep and memory research: why spacing study sessions across several days beats marathon "cramming" the night before a test. Neuroscientists explain that learning occurs in two stages. During active reading, the hippocampus temporarily holds new facts; however, consolidating those fragile traces into long-term cortical networks happens primarily during deep sleep. When a student studies six hours straight in one night without adequate rest, the brain receives little recovery time to stabilize earlier chapters, causing rapid forgetting within forty-eight hours. By contrast, three two-hour sessions separated by full nights of sleep trigger repeated consolidation cycles, producing far stronger recall months later.',
          question: 'What happens within forty-eight hours after one-night cramming without enough sleep?',
          options: [
            'The hippocampus doubles in physical size.',
            'Learners experience rapid forgetting of the material.',
            'Recall becomes stronger than spaced studying.',
            'Students remember every detail months later.',
          ],
          correctIdx: 1,
          explanation:
            'Học dồn 6 tiếng một đêm thiếu ngủ khiến não không kịp ổn định kiến thức cũ, dẫn tới quên nhanh trong vòng 48 giờ.',
        },
        {
          id: 'vstep-mock-5-q10',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Academic Talk Q8–Q10)',
          audioScript:
            'Let us examine a counterintuitive discovery in sleep and memory research: why spacing study sessions across several days beats marathon "cramming" the night before a test. Neuroscientists explain that learning occurs in two stages. During active reading, the hippocampus temporarily holds new facts; however, consolidating those fragile traces into long-term cortical networks happens primarily during deep sleep. When a student studies six hours straight in one night without adequate rest, the brain receives little recovery time to stabilize earlier chapters, causing rapid forgetting within forty-eight hours. By contrast, three two-hour sessions separated by full nights of sleep trigger repeated consolidation cycles, producing far stronger recall months later.',
          question: 'Why are three two-hour study sessions across separate days more effective?',
          options: [
            'They take fewer total study hours than six hours.',
            'They allow learners to skip reading earlier chapters.',
            'They trigger repeated memory consolidation cycles during sleep.',
            'They replace the need for taking exams.',
          ],
          correctIdx: 2,
          explanation:
            'Ba buổi học 2 giờ xen kẽ các đêm ngủ đủ giấc tạo ra nhiều chu kỳ củng cố trí nhớ lặp lại, giúp nhớ bền lâu hơn nhiều tháng sau.',
        },
        {
          id: 'vstep-mock-5-q11',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'Every weekend, pop-up "swap markets" are drawing young urban consumers tired of fast fashion. Instead of buying new outfits that sit unworn in closets after a few months, participants bring three to five clean, gently used garments from home and receive tokens to exchange for items brought by other attendees. Organizers inspect clothing at the entrance to ensure high quality, while leftover pieces at the end of the day are donated to vocational shelters. Participants report two unexpected rewards beyond saving money: discovering unique vintage styles without contributing to textile waste, and learning to pause before impulse shopping because they realize how rarely most new clothes are actually worn.',
          question: 'How does the exchange system work at a pop-up swap market?',
          options: [
            'Shoppers pay full retail prices for vintage jackets.',
            'Visitors donate cash and receive brand-new factory clothes.',
            'Organizers auction leftover clothing online every Monday.',
            'Attendees bring clean used garments and receive tokens to pick other items.',
          ],
          correctIdx: 3,
          explanation:
            'Người tham gia mang 3–5 món đồ sạch còn tốt đến để nhận thẻ đổi (tokens) và chọn lấy quần áo người khác mang tới.',
        },
        {
          id: 'vstep-mock-5-q12',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'Every weekend, pop-up "swap markets" are drawing young urban consumers tired of fast fashion. Instead of buying new outfits that sit unworn in closets after a few months, participants bring three to five clean, gently used garments from home and receive tokens to exchange for items brought by other attendees. Organizers inspect clothing at the entrance to ensure high quality, while leftover pieces at the end of the day are donated to vocational shelters. Participants report two unexpected rewards beyond saving money: discovering unique vintage styles without contributing to textile waste, and learning to pause before impulse shopping because they realize how rarely most new clothes are actually worn.',
          question: 'What happens to unclaimed garments at the end of the event?',
          options: [
            'They are donated to vocational shelters.',
            'They are thrown into municipal landfills.',
            'They are returned to fast-fashion stores.',
            'They are burned for winter heating.',
          ],
          correctIdx: 0,
          explanation:
            'Đồ còn dư cuối ngày được quyên góp cho các cơ sở bảo trợ dạy nghề ("donated to vocational shelters").',
        },
        {
          id: 'vstep-mock-5-q13',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'Every weekend, pop-up "swap markets" are drawing young urban consumers tired of fast fashion. Instead of buying new outfits that sit unworn in closets after a few months, participants bring three to five clean, gently used garments from home and receive tokens to exchange for items brought by other attendees. Organizers inspect clothing at the entrance to ensure high quality, while leftover pieces at the end of the day are donated to vocational shelters. Participants report two unexpected rewards beyond saving money: discovering unique vintage styles without contributing to textile waste, and learning to pause before impulse shopping because they realize how rarely most new clothes are actually worn.',
          question: 'The phrase "impulse shopping" in the final sentence refers to:',
          options: [
            'comparing prices across five online stores',
            'buying things suddenly without careful thought',
            'repairing torn coats at a community center',
            'waiting for annual seasonal discounts',
          ],
          correctIdx: 1,
          explanation:
            '"Impulse shopping" nghĩa là mua sắm bốc đồng theo cảm hứng nhất thời mà không cân nhắc kỹ nhu cầu sử dụng.',
        },
        {
          id: 'vstep-mock-5-q14',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'Every weekend, pop-up "swap markets" are drawing young urban consumers tired of fast fashion. Instead of buying new outfits that sit unworn in closets after a few months, participants bring three to five clean, gently used garments from home and receive tokens to exchange for items brought by other attendees. Organizers inspect clothing at the entrance to ensure high quality, while leftover pieces at the end of the day are donated to vocational shelters. Participants report two unexpected rewards beyond saving money: discovering unique vintage styles without contributing to textile waste, and learning to pause before impulse shopping because they realize how rarely most new clothes are actually worn.',
          question: 'Why do organizers check clothing at the entrance?',
          options: [
            'To calculate each visitor’s annual income',
            'To iron every shirt before the market opens',
            'To maintain good quality among swapped items',
            'To separate winter coats from summer hats',
          ],
          correctIdx: 2,
          explanation:
            'Ban tổ chức kiểm tra quần áo ở lối vào để đảm bảo chất lượng tốt cho đồ trao đổi ("to ensure high quality").',
        },
        {
          id: 'vstep-mock-5-q15',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q11–Q15)',
          passage:
            'Every weekend, pop-up "swap markets" are drawing young urban consumers tired of fast fashion. Instead of buying new outfits that sit unworn in closets after a few months, participants bring three to five clean, gently used garments from home and receive tokens to exchange for items brought by other attendees. Organizers inspect clothing at the entrance to ensure high quality, while leftover pieces at the end of the day are donated to vocational shelters. Participants report two unexpected rewards beyond saving money: discovering unique vintage styles without contributing to textile waste, and learning to pause before impulse shopping because they realize how rarely most new clothes are actually worn.',
          question: 'Which benefit of swap markets is NOT mentioned in the passage?',
          options: [
            'Saving money',
            'Finding distinctive vintage clothing',
            'Reducing impulse buying habits',
            'Receiving university course credits',
          ],
          correctIdx: 3,
          explanation:
            'Bài đọc nêu tiết kiệm tiền, tìm đồ vintage độc đáo không gây rác dệt may và giảm mua sắm bốc đồng; không nhắc tới tín chỉ đại học.',
        },
        {
          id: 'vstep-mock-5-q16',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'In agricultural science, planting a single high-yield crop across vast fields—a practice called monoculture—maximizes short-term harvesting efficiency with standardized machinery. However, ecologists warn that monocultures are remarkably fragile: when every plant shares identical genetics, a single fungus or insect pest can sweep across an entire region unchecked. To restore resilience without sacrificing productivity, progressive farms are reviving "intercropping," growing complementary species side by side, such as nitrogen-fixing beans beneath tall maize stalks. Roots occupy different soil depths, beneficial insects shelter among diverse leaves, and farmers gain multiple harvests that buffer household income if one crop experiences unfavorable weather.',
          question: 'What major risk of monoculture farming do ecologists highlight?',
          options: [
            'Genetically uniform crops can be wiped out rapidly by a single pest or disease.',
            'Standardized machinery cannot harvest single crops quickly.',
            'Nitrogen-fixing beans destroy nearby maize stalks.',
            'Ecologists dislike farms that produce high yields.',
          ],
          correctIdx: 0,
          explanation:
            'Khi cả cánh đồng trồng một giống đồng nhất về di truyền, chỉ một loại nấm hoặc sâu bệnh cũng có thể lây lan tàn phá toàn vùng.',
        },
        {
          id: 'vstep-mock-5-q17',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'In agricultural science, planting a single high-yield crop across vast fields—a practice called monoculture—maximizes short-term harvesting efficiency with standardized machinery. However, ecologists warn that monocultures are remarkably fragile: when every plant shares identical genetics, a single fungus or insect pest can sweep across an entire region unchecked. To restore resilience without sacrificing productivity, progressive farms are reviving "intercropping," growing complementary species side by side, such as nitrogen-fixing beans beneath tall maize stalks. Roots occupy different soil depths, beneficial insects shelter among diverse leaves, and farmers gain multiple harvests that buffer household income if one crop experiences unfavorable weather.',
          question: 'How does intercropping protect farmers economically?',
          options: [
            'It eliminates the need to sell crops at markets.',
            'Having diverse harvests cushions income when bad weather hits one crop.',
            'It doubles government subsidies every winter.',
            'It guarantees identical harvesting dates for all plants.',
          ],
          correctIdx: 1,
          explanation:
            'Thu hoạch nhiều loại cây khác nhau giúp bù đắp thu nhập cho nông dân nếu một vụ mùa gặp thời tiết bất lợi ("buffer household income").',
        },
        {
          id: 'vstep-mock-5-q18',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'In agricultural science, planting a single high-yield crop across vast fields—a practice called monoculture—maximizes short-term harvesting efficiency with standardized machinery. However, ecologists warn that monocultures are remarkably fragile: when every plant shares identical genetics, a single fungus or insect pest can sweep across an entire region unchecked. To restore resilience without sacrificing productivity, progressive farms are reviving "intercropping," growing complementary species side by side, such as nitrogen-fixing beans beneath tall maize stalks. Roots occupy different soil depths, beneficial insects shelter among diverse leaves, and farmers gain multiple harvests that buffer household income if one crop experiences unfavorable weather.',
          question: 'The word "resilience" in sentence 3 is closest in meaning to:',
          options: [
            'heavy machinery cost',
            'short-term profit',
            'ability to withstand and recover from stress',
            'strict chemical control',
          ],
          correctIdx: 2,
          explanation:
            '"Resilience" chỉ sức chống chịu và khả năng phục hồi của hệ sinh thái nông nghiệp trước sâu bệnh hoặc thời tiết xấu.',
        },
        {
          id: 'vstep-mock-5-q19',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'In agricultural science, planting a single high-yield crop across vast fields—a practice called monoculture—maximizes short-term harvesting efficiency with standardized machinery. However, ecologists warn that monocultures are remarkably fragile: when every plant shares identical genetics, a single fungus or insect pest can sweep across an entire region unchecked. To restore resilience without sacrificing productivity, progressive farms are reviving "intercropping," growing complementary species side by side, such as nitrogen-fixing beans beneath tall maize stalks. Roots occupy different soil depths, beneficial insects shelter among diverse leaves, and farmers gain multiple harvests that buffer household income if one crop experiences unfavorable weather.',
          question: 'Why does the passage mention maize and beans growing together?',
          options: [
            'To show why farmers prefer monoculture machinery',
            'To illustrate two species that compete for the exact same soil layer',
            'To warn against planting legumes near tall crops',
            'To give a concrete example of complementary intercropping',
          ],
          correctIdx: 3,
          explanation:
            'Đậu cố định đạm trồng xen dưới tán ngô cao là ví dụ cụ thể về hai loài bổ trợ nhau trong canh tác xen canh.',
        },
        {
          id: 'vstep-mock-5-q20',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q16–Q20)',
          passage:
            'In agricultural science, planting a single high-yield crop across vast fields—a practice called monoculture—maximizes short-term harvesting efficiency with standardized machinery. However, ecologists warn that monocultures are remarkably fragile: when every plant shares identical genetics, a single fungus or insect pest can sweep across an entire region unchecked. To restore resilience without sacrificing productivity, progressive farms are reviving "intercropping," growing complementary species side by side, such as nitrogen-fixing beans beneath tall maize stalks. Roots occupy different soil depths, beneficial insects shelter among diverse leaves, and farmers gain multiple harvests that buffer household income if one crop experiences unfavorable weather.',
          question: 'What ecological benefit occurs beneath the soil in intercropped fields?',
          options: [
            'Plant roots make use of different soil depths.',
            'Roots fuse together into a single solid layer.',
            'Soil moisture evaporates twice as fast.',
            'All earthworms leave the field permanently.',
          ],
          correctIdx: 0,
          explanation:
            'Câu cuối nêu rõ: "Roots occupy different soil depths" (rễ cây phân tầng ở các độ sâu đất khác nhau, tận dụng dinh dưỡng hiệu quả).',
        },
        {
          id: 'vstep-mock-5-q21',
          skill: 'grammar',
          partLabel: 'Use of English (Mixed Conditionals)',
          question:
            'If regional trains were more punctual, more commuters ______ their private motorbikes at home today.',
          options: [
            'would have left',
            'would leave',
            'will leave',
            'left',
          ],
          correctIdx: 1,
          explanation:
            'Câu điều kiện loại 2 diễn tả giả định trái với hiện tại: "If + S + V2/were, S + would + V nguyên mẫu".',
        },
        {
          id: 'vstep-mock-5-q22',
          skill: 'grammar',
          partLabel: 'Use of English (Participle Clauses)',
          question:
            '______ in 1928, the historic post office still serves thousands of local residents every week.',
          options: ['Building', 'Having built', 'Built', 'To build'],
          correctIdx: 2,
          explanation:
            'Chủ ngữ mệnh đề chính ("the historic post office") mang nghĩa bị động ("được xây dựng năm 1928"), nên rút gọn dùng phân từ quá khứ "Built".',
        },
        {
          id: 'vstep-mock-5-q23',
          skill: 'grammar',
          partLabel: 'Use of English (Preposition + Relative Pronoun)',
          question:
            'The scholarship panel interviewed twelve finalists, three ______ received full tuition grants.',
          options: [
            'of who',
            'of that',
            'of them',
            'of whom',
          ],
          correctIdx: 3,
          explanation:
            'Sau dấu phẩy nối hai mệnh đề cần đại từ quan hệ chỉ người sau giới từ "of": "three of whom" (không dùng "of them" vì thiếu từ nối, không dùng "of who/that").',
        },
        {
          id: 'vstep-mock-5-q24',
          skill: 'vocab',
          partLabel: 'Use of English (Academic Word Choice)',
          question:
            'Expanding affordable childcare centers can ______ parents to re-enter the workforce smoothly.',
          options: ['enable', 'insist', 'deprive', 'compliment'],
          correctIdx: 0,
          explanation:
            'Cấu trúc "enable sb to V" (giúp/tạo điều kiện cho ai làm gì) khớp hoàn toàn cả nghĩa lẫn ngữ pháp.',
        },
        {
          id: 'vstep-mock-5-q25',
          skill: 'vocab',
          partLabel: 'Use of English (Essay Register)',
          question:
            'Which sentence is written in an appropriately formal academic tone for VSTEP Writing Task 2?',
          options: [
            'Lots of kids waste tons of hours on phones every single night, which is super bad.',
            'Excessive nighttime smartphone use can negatively affect adolescents’ sleep quality and focus.',
            'I totally hate how people stare at screens 24/7 instead of chatting.',
            'Phones are kinda dangerous if you ask me and my buddies.',
          ],
          correctIdx: 1,
          explanation:
            'Câu B sử dụng danh từ hóa ("Excessive nighttime smartphone use") và từ vựng học thuật trung lập ("negatively affect", "adolescents’ sleep quality"), tránh từ lóng như "tons of", "super bad", "kinda".',
        },
      ],
    },
  ],
};

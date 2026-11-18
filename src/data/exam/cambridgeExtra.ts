import type {
  ExamListeningSet,
  ExamMcqQuestion,
  ExamMockTest,
  ExamReadingSet,
  ExamSpeakingTask,
  ExamWritingTask,
} from './examPrepData';

export const CAMBRIDGE_EXTRA: {
  diagnosticQuestions: ExamMcqQuestion[];
  reading: ExamReadingSet[];
  listening: ExamListeningSet[];
  writing: ExamWritingTask[];
  speaking: ExamSpeakingTask[];
  mockTests: ExamMockTest[];
} = {
  diagnosticQuestions: [
    {
      id: 'cam-diag-ex-1',
      skill: 'listening',
      partLabel: 'KET (A2) Listening',
      audioScript:
        'Boy: Hey Chloe, the natural history museum opens at ten tomorrow, so shall we meet outside the main café at nine thirty? Girl: That café is closed for repainting all week. Let’s meet by the south stone fountain at nine forty-five instead, so we don’t have to wait in the cold.',
      question: 'Where and when will the two friends meet?',
      options: [
        'By the south stone fountain at 9:45',
        'Outside the main café at 9:30',
        'Inside the ticket hall at 10:00',
        'At the north bus stop at 9:15',
      ],
      correctIdx: 0,
      explanation:
        'Quán cà phê đang sơn sửa nên Chloe hẹn gặp ở đài phun nước phía nam lúc 9:45 ("by the south stone fountain at nine forty-five").',
    },
    {
      id: 'cam-diag-ex-2',
      skill: 'listening',
      partLabel: 'PET (B1) Listening',
      audioScript:
        'Teacher: Attention drama club members! Because the school choir needs Room 14 for extra practice this Thursday, our rehearsal will move to the main hall. We will still start at four fifteen, so please bring your scripts straight there after your last lesson.',
      question: 'What has changed about Thursday’s drama club rehearsal?',
      options: [
        'The starting time has moved earlier',
        'The rehearsal will take place in the main hall',
        'Students do not need to bring their scripts',
        'The choir will join the drama rehearsal',
      ],
      correctIdx: 1,
      explanation:
        'Giờ tập vẫn là 4:15 nhưng địa điểm chuyển từ phòng 14 sang hội trường chính ("move to the main hall").',
    },
    {
      id: 'cam-diag-ex-3',
      skill: 'listening',
      partLabel: 'FCE (B2) Listening (Detail)',
      audioScript:
        'Host: What was the trickiest part of photographing glowing sea plankton along the coast? Photographer: People assume staying awake past midnight is tough, yet I actually enjoy working in silence. The real headache was keeping sea spray off the camera lens—every five minutes I had to wipe the glass in near darkness without bumping the tripod.',
      question: 'What did the photographer find most difficult during the shoot?',
      options: [
        'Staying awake until after midnight',
        'Finding a quiet coastal beach',
        'Keeping salty mist off the camera lens',
        'Setting up the heavy tripod before dark',
      ],
      correctIdx: 2,
      explanation:
        'Vấn đề khó nhất ("the real headache") là giữ hơi nước biển không bám lên ống kính ("keeping sea spray off the camera lens").',
    },
    {
      id: 'cam-diag-ex-4',
      skill: 'vocab',
      partLabel: 'Use of English Part 1 (PET/FCE)',
      question:
        'After missing two weeks of training with a sprained ankle, Daniel worked hard to _____ up with the rest of the swim team.',
      options: ['keep', 'hold', 'stay', 'catch'],
      correctIdx: 3,
      explanation:
        'Cụm động từ chuẩn là "catch up with" (theo kịp ai đó sau khi bị tụt lại phía sau).',
    },
    {
      id: 'cam-diag-ex-5',
      skill: 'vocab',
      partLabel: 'FCE Part 3 (Word Formation)',
      question:
        'Choose the correct form of "CONFIDE": "Despite having little stage experience, Nora spoke with remarkable _____ during the regional debate."',
      options: ['confident', 'confidence', 'confidently', 'confide'],
      correctIdx: 1,
      explanation:
        'Sau tính từ "remarkable" cần một danh từ -> "confidence" (sự tự tin).',
    },
    {
      id: 'cam-diag-ex-6',
      skill: 'vocab',
      partLabel: 'Use of English Part 1 (PET)',
      question:
        'The museum curator warned visitors not to touch the medieval silver coins because skin oils can _____ their delicate surface.',
      options: ['injure', 'ache', 'wound', 'damage'],
      correctIdx: 3,
      explanation:
        '"Damage" dùng cho đồ vật/bề mặt bị hư hại; "injure", "wound", "ache" dùng cho cơ thể người hoặc động vật.',
    },
    {
      id: 'cam-diag-ex-7',
      skill: 'grammar',
      partLabel: 'Use of English Part 2 (Open Cloze)',
      question:
        'Complete the gap with ONE word: "Neither of the two forest trails _____ marked clearly on our old paper map, so we asked a ranger for directions."',
      options: ['was', 'were', 'are', 'have'],
      correctIdx: 0,
      explanation:
        '"Neither of + danh từ số nhiều" trong văn phong chuẩn/thi Cambridge đi với động từ chia số ít ("was").',
    },
    {
      id: 'cam-diag-ex-8',
      skill: 'grammar',
      partLabel: 'FCE Part 4 (Key Word Transformation)',
      question:
        '"It wasn’t necessary for Sam to print the boarding pass at home." (NEED) → "Sam _____ the boarding pass at home because mobile tickets were accepted."',
      options: [
        'mustn’t have printed',
        'didn’t need printing',
        'needn’t have printed',
        'can’t have printed',
      ],
      correctIdx: 2,
      explanation:
        '"needn’t have + V3/ed" diễn tả một việc đã làm rồi nhưng thực ra không cần thiết.',
    },
    {
      id: 'cam-diag-ex-9',
      skill: 'grammar',
      partLabel: 'FCE Grammar (Inverted Conditional)',
      question:
        '_____ the ferry departed on schedule, we would not have missed the last bus to the hillside village.',
      options: ['Were', 'Should', 'Did', 'Had'],
      correctIdx: 3,
      explanation:
        'Đảo ngữ câu điều kiện loại 3: "Had + S + V3/ed, S + would (not) have + V3/ed".',
    },
    {
      id: 'cam-diag-ex-10',
      skill: 'reading',
      partLabel: 'KET (A2) Notice Reading',
      passage:
        'PUBLIC LIBRARY — WEEKEND BOOK DROP:\nBooks placed in the outside return box after 5:00 PM on Friday will be checked in on Monday morning. No late fees are charged for items returned over the weekend.',
      question: 'What happens if you return a library book on Saturday afternoon?',
      options: [
        'You will not have to pay a weekend late fee.',
        'A librarian will scan your book immediately.',
        'The outside return box is locked until Monday.',
        'You must pay a small fee on Monday morning.',
      ],
      correctIdx: 0,
      explanation:
        'Thông báo ghi rõ không tính phí trễ hạn cho sách trả vào cuối tuần ("No late fees are charged for items returned over the weekend").',
    },
    {
      id: 'cam-diag-ex-11',
      skill: 'reading',
      partLabel: 'PET (B1) Short Message',
      passage:
        'Hi Runners,\nBecause the stadium track is being resurfaced this Saturday, our 8:00 AM session will move to Cedar Woods Trail. Please wear trail trainers instead of spikes and bring your own water bottle—Coach Ben.',
      question: 'Why did Coach Ben send this message?',
      options: [
        'To cancel Saturday morning training completely',
        'To remind runners to buy new racing spikes',
        'To inform runners of a change in venue and footwear',
        'To ask students to help resurface the stadium track',
      ],
      correctIdx: 2,
      explanation:
        'Huấn luyện viên báo đổi địa điểm sang Cedar Woods Trail và nhắc mang giày chạy đường mòn thay vì giày đinh.',
    },
    {
      id: 'cam-diag-ex-12',
      skill: 'reading',
      partLabel: 'FCE (B2) Reading Inference',
      passage:
        'For thirty years, Arthur has repaired mechanical railway clocks without relying on digital diagnostics. While younger technicians prefer electronic timing sensors, Arthur insists that listening closely to the brass gears reveals subtle friction long before a sensor registers any delay.',
      question: 'Why does Arthur prefer his traditional method of checking clocks?',
      options: [
        'Digital sensors are too expensive for small workshops.',
        'He believes his ears detect early wear that machines overlook.',
        'Mechanical railway clocks cannot be tested electronically.',
        'He refuses to train younger technicians in his shop.',
      ],
      correctIdx: 1,
      explanation:
        'Arthur tin rằng lắng nghe bánh răng đồng giúp phát hiện ma sát tinh vi trước cả khi cảm biến điện tử ghi nhận sai số.',
    },
  ],

  reading: [
    {
      id: 'cam-read-ex-1',
      partLabel: 'KET (A2) Reading Practice',
      title: 'A Weekend at Oakridge Farm',
      level: 'A2',
      passage:
        'Last Saturday, fourteen-year-old Leo spent the weekend helping his aunt at Oakridge Farm in the countryside. On Saturday morning, Leo woke up at six thirty to feed the goats and collect fresh brown eggs from the wooden hen house. At first, he was nervous around the noisy geese, but after an hour he learned how to walk calmly past them.\n\nIn the afternoon, Leo and his cousins picked baskets of red apples in the orchard. Later, his aunt taught everyone how to bake warm oat bread in an outdoor clay oven. On Sunday morning, Leo helped arrange jars of wildflower honey and apple jam on a wooden table near the farm gate so weekend cyclists could buy local snacks before riding back to town.',
      viSummary:
        'Cuối tuần trước, Leo (14 tuổi) về trang trại Oakridge phụ dì cho dê ăn, nhặt trứng gà, hái táo, học nướng bánh mì yến mạch bằng lò đất ngoài trời và bày mật ong, mứt táo bán cho khách đạp xe ngày Chủ nhật.',
      questions: [
        {
          id: 'cam-read-ex-1-q1',
          questionType: 'Detail',
          question: 'What was Leo’s first job on Saturday morning?',
          options: [
            'Feeding the goats and gathering eggs',
            'Baking oat bread in the clay oven',
            'Picking apples in the orchard',
            'Setting up a table near the farm gate',
          ],
          correctIdx: 0,
          explanation:
            'Sáng thứ Bảy lúc 6:30, việc đầu tiên Leo làm là cho dê ăn và nhặt trứng ("feed the goats and collect fresh brown eggs").',
        },
        {
          id: 'cam-read-ex-1-q2',
          questionType: 'Feelings',
          question: 'How did Leo feel about the geese when he first arrived?',
          options: [
            'Bored by how quiet they were',
            'Nervous because they made a lot of noise',
            'Angry that they chased the goats',
            'Excited to feed them oat bread',
          ],
          correctIdx: 1,
          explanation:
            'Ban đầu Leo thấy lo lắng vì đàn ngỗng ồn ào ("nervous around the noisy geese").',
        },
        {
          id: 'cam-read-ex-1-q3',
          questionType: 'Activity',
          question: 'Who taught the children how to bake oat bread?',
          options: [
            'A weekend cyclist',
            'Leo’s older cousin',
            'Leo’s aunt',
            'A local baker from town',
          ],
          correctIdx: 2,
          explanation:
            'Dì của Leo đã dạy cả nhóm nướng bánh mì yến mạch ("his aunt taught everyone how to bake warm oat bread").',
        },
        {
          id: 'cam-read-ex-1-q4',
          questionType: 'Purpose',
          question: 'Why did Leo place honey and jam jars near the farm gate on Sunday?',
          options: [
            'To store them safely away from the kitchen',
            'To give free samples to the farm neighbors',
            'To keep the clay oven clean after baking',
            'To sell local snacks to passing cyclists',
          ],
          correctIdx: 3,
          explanation:
            'Leo bày mật ong và mứt táo ở cổng để những người đạp xe cuối tuần có thể mua đồ ăn vặt địa phương.',
        },
        {
          id: 'cam-read-ex-1-q5',
          questionType: 'Main Idea',
          question: 'What is the main topic of this text?',
          options: [
            'A teenager’s enjoyable weekend helping on a country farm',
            'Instructions for building an outdoor clay bread oven',
            'A cycling race held between two rural villages',
            'The best season for planting apple trees',
          ],
          correctIdx: 0,
          explanation:
            'Bài đọc kể lại trải nghiệm cuối tuần làm việc và học hỏi thú vị của Leo tại trang trại Oakridge.',
        },
      ],
    },
    {
      id: 'cam-read-ex-2',
      partLabel: 'PET (B1) Reading Practice',
      title: 'The Midnight Bookshop of Harbor Street',
      level: 'B1',
      passage:
        'While most shops on Harbor Street pull down their metal shutters by six o’clock, a narrow green-painted bookshop called Lantern Pages unlocks its door again at seven every Friday evening and stays open until eleven. Owner Nadia Silva started the late-night hours two years ago after noticing that hospital nurses, restaurant cooks, and late-shift bus drivers rarely had time to browse books during standard office hours.\n\nInstead of bright ceiling tubes, warm desk lamps glow beside deep armchairs, and a kettle of peppermint tea simmers quietly near the counter. Visitors are asked to keep their phones on silent so the upstairs corner remains a peaceful reading lounge. What surprises many newcomers most are the small handwritten cards tucked inside dozens of paperbacks—notes left not only by staff, but also by previous customers explaining why a particular novel helped them through a long week.',
      viSummary:
        'Hiệu sách Lantern Pages trên phố Harbor mở cửa từ 19:00 đến 23:00 mỗi tối thứ Sáu để phục vụ người làm ca muộn như y tá, đầu bếp, tài xế. Quán có đèn bàn ấm áp, trà bạc hà, góc đọc yên tĩnh và những tấm thẻ viết tay giới thiệu sách do cả nhân viên lẫn khách hàng để lại.',
      questions: [
        {
          id: 'cam-read-ex-2-q1',
          questionType: 'Reason',
          question: 'Why did Nadia decide to open her bookshop late on Friday nights?',
          options: [
            'Rent on Harbor Street was cheaper after seven o’clock.',
            'People working late shifts could not shop during normal daytime hours.',
            'Other bookshops on the street forced her to change her schedule.',
            'She wanted to host loud live music concerts upstairs.',
          ],
          correctIdx: 1,
          explanation:
            'Nadia nhận thấy y tá, đầu bếp và tài xế ca muộn ít có thời gian mua sách vào giờ hành chính thông thường.',
        },
        {
          id: 'cam-read-ex-2-q2',
          questionType: 'Atmosphere',
          question: 'What rule must visitors follow inside Lantern Pages on Friday evenings?',
          options: [
            'They must buy a cup of tea before sitting down.',
            'They are not allowed to visit the upstairs lounge.',
            'They need to switch their mobile phones to silent mode.',
            'They must return borrowed paperbacks before eleven.',
          ],
          correctIdx: 2,
          explanation:
            'Khách được yêu cầu để điện thoại ở chế độ im lặng ("keep their phones on silent") để giữ sự yên tĩnh cho góc đọc.',
        },
        {
          id: 'cam-read-ex-2-q3',
          questionType: 'Detail',
          question: 'Who writes the recommendation cards placed inside the paperbacks?',
          options: [
            'Local hospital doctors only',
            'Famous novelists from the city',
            'Bookshop staff who work on Mondays',
            'Both employees and earlier readers',
          ],
          correctIdx: 3,
          explanation:
            'Thẻ viết tay được để lại bởi cả nhân viên lẫn những khách hàng trước đó ("not only by staff, but also by previous customers").',
        },
        {
          id: 'cam-read-ex-2-q4',
          questionType: 'Vocabulary',
          question: 'What does the word "simmers" suggest about the kettle of tea?',
          options: [
            'It is kept gently hot and ready to pour.',
            'It has been forgotten and turned cold.',
            'It is being sold in sealed plastic bottles.',
            'It makes a loud whistling sound all evening.',
          ],
          correctIdx: 0,
          explanation:
            '"Simmers quietly" nghĩa là đun liu riu giữ ấm nhẹ nhàng, sẵn sàng phục vụ khách.',
        },
        {
          id: 'cam-read-ex-2-q5',
          questionType: 'Writer Purpose',
          question: 'What is the writer’s main purpose in this article?',
          options: [
            'To criticize shops that close before six o’clock',
            'To introduce an unusual neighborhood bookshop welcoming night workers',
            'To advertise a new peppermint tea brand sold in supermarkets',
            'To warn readers against buying second-hand paperbacks',
          ],
          correctIdx: 1,
          explanation:
            'Bài viết giới thiệu nét độc đáo của hiệu sách mở muộn phục vụ người lao động và bạn đọc buổi tối.',
        },
      ],
    },
    {
      id: 'cam-read-ex-3',
      partLabel: 'PET / FCE (B1–B2) Reading Practice',
      title: 'Bringing Back the Rooftop Swifts',
      level: 'B1',
      passage:
        'Every May, small crescent-winged birds called common swifts travel thousands of kilometers from central Africa to spend the summer nesting in European towns. Historically, swifts slipped into tiny gaps beneath clay roof tiles or cracked brick walls. Yet as older apartment blocks have been sealed with modern insulation to save winter heating energy, these natural nesting cavities have rapidly disappeared, causing urban swift numbers to drop.\n\nDetermined to help without sacrificing home warmth, a volunteer group in Bristol teamed up with local roofers to mount lightweight wooden swift boxes directly under shaded roof eaves. Each box sits outside the insulated wall, keeping rooms cozy while giving returning birds a safe shelter. Volunteers also placed small solar-powered speakers nearby to play gentle swift calls for two weeks in spring, guiding young birds searching for their very first home. Within three summers, over sixty pairs had settled into the street.',
      viSummary:
        'Việc bọc cách nhiệt các tòa nhà cũ khiến chim én (swifts) mất hốc làm tổ dưới mái ngói. Nhóm tình nguyện ở Bristol phối hợp thợ lợp mái gắn hộp gỗ bên ngoài tường cách nhiệt và bật loa năng lượng mặt trời phát tiếng gọi bầy vào mùa xuân, thu hút hơn 60 cặp chim quay lại làm tổ.',
      questions: [
        {
          id: 'cam-read-ex-3-q1',
          questionType: 'Cause',
          question: 'Why have urban swift populations declined in recent years?',
          options: [
            'Swifts stopped flying north from Africa in May.',
            'Clay roof tiles became too heavy for apartment buildings.',
            'Modern building insulation sealed up the gaps where swifts used to nest.',
            'Town residents complained about birds eating garden fruit.',
          ],
          correctIdx: 2,
          explanation:
            'Các tòa nhà được bịt kín bằng lớp cách nhiệt hiện đại để giữ ấm mùa đông làm biến mất các khe hốc làm tổ tự nhiên của chim.',
        },
        {
          id: 'cam-read-ex-3-q2',
          questionType: 'Solution',
          question: 'How do the wooden swift boxes protect indoor room temperatures?',
          options: [
            'They are heated automatically by solar panels.',
            'They are built inside unused apartment chimneys.',
            'They replace the glass in south-facing windows.',
            'They are attached outside the building’s insulated wall.',
          ],
          correctIdx: 3,
          explanation:
            'Hộp gỗ gắn bên ngoài bức tường cách nhiệt ("sits outside the insulated wall") nên không làm thất thoát nhiệt trong phòng.',
        },
        {
          id: 'cam-read-ex-3-q3',
          questionType: 'Detail',
          question: 'Why did volunteers play recorded swift calls for two weeks in spring?',
          options: [
            'To help young birds discover the new nesting boxes',
            'To frighten away cats climbing onto the roof eaves',
            'To warn adult swifts about incoming summer storms',
            'To entertain residents walking along the street',
          ],
          correctIdx: 0,
          explanation:
            'Tiếng gọi bầy phát qua loa giúp dẫn đường cho những con chim non đang tìm nơi làm tổ đầu tiên.',
        },
        {
          id: 'cam-read-ex-3-q4',
          questionType: 'Result',
          question: 'What happened within three summers of installing the boxes?',
          options: [
            'All the wooden boxes blew down in winter storms.',
            'More than sixty pairs of swifts moved into the neighborhood.',
            'Roofers had to remove the insulation from older flats.',
            'The solar speakers frightened the birds out of Bristol.',
          ],
          correctIdx: 1,
          explanation:
            'Trong vòng ba mùa hè, hơn 60 cặp chim én đã định cư tại khu phố ("over sixty pairs had settled into the street").',
        },
        {
          id: 'cam-read-ex-3-q5',
          questionType: 'Inference',
          question: 'What does the project in Bristol demonstrate?',
          options: [
            'Saving winter energy always harms city wildlife.',
            'Swifts can only survive in deep countryside forests.',
            'Energy-efficient homes and urban wildlife protection can work together.',
            'Birds prefer plastic boxes over shaded wooden shelters.',
          ],
          correctIdx: 2,
          explanation:
            'Dự án cho thấy có thể vừa giữ ấm nhà tiết kiệm năng lượng vừa bảo tồn chim đô thị nhờ thiết kế hộp tổ phù hợp.',
        },
      ],
    },
    {
      id: 'cam-read-ex-4',
      partLabel: 'FCE (B2) Reading Comprehension',
      title: 'Why Slow Walking Changes How We Notice Cities',
      level: 'B2',
      passage:
        'During a typical weekday commute, most city residents move through familiar streets on autopilot—eyes fixed on a glowing phone screen, ears plugged into a podcast, and minds already rehearsing the morning’s first meeting. Although this routine saves mental effort, urban researchers note that rushing past the same corners every day creates "spatial blindness," leaving people unable to recall even a single architectural detail along a route they have walked for years.\n\nIn response, a growing number of community walking groups promote deliberate "slow walks" lasting forty minutes without headphones or step-counting apps. Participants simply stroll at half their usual pace and look above shop-window level. Almost immediately, overlooked details emerge: carved stone dates on old brickwork, the sudden scent of roasted cardamom drifting from a side-alley bakery, or sparrows bathing in rainwater on a metal awning.\n\nPsychologists studying attention restoration suggest that this unhurried curiosity works differently from intense screen focus. Rather than draining concentration, soft fascination with real-world sights gives overworked brains room to reset. Walkers frequently report returning to their desks feeling noticeably calmer—not because they covered a great distance, but because they briefly stepped out of clock-driven urgency.',
      viSummary:
        'Đi làm vội vã hàng ngày kèm điện thoại và tai nghe dễ gây "mù không gian", khiến ta không nhớ nổi chi tiết phố xá quen thuộc. Phong trào đi bộ chậm 40 phút không tai nghe giúp người đi nhận ra kiến trúc, mùi hương và âm thanh đời thường, qua đó giúp não bộ phục hồi sự tập trung và giảm căng thẳng.',
      questions: [
        {
          id: 'cam-read-ex-4-q1',
          questionType: 'Phrase Meaning',
          question: 'What does the author mean by "spatial blindness" in paragraph 1?',
          options: [
            'Eye strain caused by reading phone screens outdoors',
            'A lack of street lighting along narrow city alleys',
            'Difficulty finding new bus stops without a map app',
            'Failing to notice familiar surroundings while rushing on autopilot',
          ],
          correctIdx: 3,
          explanation:
            '"Spatial blindness" chỉ trạng thái đi qua góc phố quen mỗi ngày nhưng không nhớ nổi chi tiết xung quanh vì mải vội vã và dán mắt vào màn hình.',
        },
        {
          id: 'cam-read-ex-4-q2',
          questionType: 'Detail',
          question: 'What are participants encouraged to do during a community "slow walk"?',
          options: [
            'Leave headphones off and look upward above street-level shops',
            'Track their walking speed with a fitness smartphone app',
            'Finish a five-kilometer route in under forty minutes',
            'Take notes on local traffic noise for urban researchers',
          ],
          correctIdx: 0,
          explanation:
            'Người tham gia được khuyên tắt tai nghe, đi chậm bằng nửa tốc độ thường và ngước nhìn lên phía trên tầng cửa hàng ("look above shop-window level").',
        },
        {
          id: 'cam-read-ex-4-q3',
          questionType: 'Reference',
          question: 'What does "this unhurried curiosity" in paragraph 3 refer to?',
          options: [
            'Rehearsing work meetings while riding public transport',
            'Calmly noticing everyday city details during a slow walk',
            'Comparing step counts with friends after work',
            'Designing new stone carvings for bakery buildings',
          ],
          correctIdx: 1,
          explanation:
            'Cụm từ này quy chiếu về sự tò mò thư thái khi quan sát các chi tiết kiến trúc, hương vị, chim chóc trong lúc đi bộ chậm ở đoạn 2.',
        },
        {
          id: 'cam-read-ex-4-q4',
          questionType: 'Inference',
          question: 'According to psychologists, why do slow walkers return to work feeling calmer?',
          options: [
            'Physical exhaustion makes them fall asleep faster at their desks.',
            'Drinking cardamom coffee boosts afternoon concentration.',
            'Gentle real-world observation lets an overworked mind recover from rushing.',
            'Avoiding colleagues for forty minutes prevents office arguments.',
          ],
          correctIdx: 2,
          explanation:
            'Sự cuốn hút nhẹ nhàng từ cảnh vật thực tế ("soft fascination") giúp não bộ nghỉ ngơi khỏi áp lực thời gian và phục hồi sự tập trung.',
        },
        {
          id: 'cam-read-ex-4-q5',
          questionType: 'Attitude',
          question: 'Which statement best reflects the writer’s view of slow walking?',
          options: [
            'It is impractical for people who live in large modern cities.',
            'It only benefits architects and professional photographers.',
            'It wastes valuable morning commute time.',
            'It offers an easy, refreshing break from fast digital routines.',
          ],
          correctIdx: 3,
          explanation:
            'Tác giả đánh giá tích cực đi bộ chậm như một cách đơn giản giúp thoát khỏi nhịp sống hối hả phụ thuộc thiết bị số.',
        },
      ],
    },
  ],

  listening: [
    {
      id: 'cam-list-ex-1',
      partLabel: 'KET (A2) Listening Practice',
      title: 'Booking a Junior Cooking Day',
      level: 'A2',
      speakerContext: 'Bạn nhỏ Mia gọi điện cho thầy Patel hỏi thông tin lớp học làm pizza vào thứ Bảy.',
      audioScript:
        'Mr. Patel: Good morning, Oak Kitchen, Mr. Patel speaking. Mia: Hi Mr. Patel, I’d like to join Saturday’s junior pizza workshop. What time does it begin? Mr. Patel: We start at ten thirty sharp and finish at one o’clock. Mia: Great. Does the fifteen-pound fee include ingredients? Mr. Patel: Yes, flour, tomato sauce, and cheese are all provided—just remember to bring a clean plastic box so you can carry your baked pizza home! Also, my kitchen is completely nut-free for safety. Mia: Got it. Where should my dad drop me off? Mr. Patel: Right outside the corner bakery on Elm Road; our kitchen entrance is the blue door next to it.',
      viSummary:
        'Lớp làm pizza diễn ra từ 10:30 đến 13:00 thứ Bảy, học phí 15 bảng đã gồm nguyên liệu, phòng bếp hoàn toàn không có các loại hạt. Học viên cần mang hộp nhựa sạch đựng bánh mang về; lối vào là cửa xanh cạnh tiệm bánh góc đường Elm.',
      questions: [
        {
          id: 'cam-list-ex-1-q1',
          question: 'What time does the pizza workshop finish on Saturday?',
          options: ['10:30 AM', '1:00 PM', '12:30 PM', '2:15 PM'],
          correctIdx: 1,
          explanation:
            'Thầy Patel nói lớp bắt đầu lúc 10:30 và kết thúc lúc 1 giờ chiều ("finish at one o’clock").',
        },
        {
          id: 'cam-list-ex-1-q2',
          question: 'What does Mia need to pay fifteen pounds for?',
          options: [
            'Only the kitchen apron',
            'A clean plastic box at the door',
            'A bus ticket from Elm Road',
            'The workshop and all food ingredients',
          ],
          correctIdx: 3,
          explanation:
            'Mức phí 15 bảng đã bao gồm toàn bộ nguyên liệu bột, sốt cà chua và phô mai ("flour, tomato sauce, and cheese are all provided").',
        },
        {
          id: 'cam-list-ex-1-q3',
          question: 'What must Mia bring from home?',
          options: [
            'A clean plastic food box',
            'Her own rolling pin',
            'A bag of mixed nuts',
            'Fresh tomatoes and cheese',
          ],
          correctIdx: 0,
          explanation:
            'Thầy dặn mang theo hộp nhựa sạch để đựng pizza mang về ("bring a clean plastic box").',
        },
        {
          id: 'cam-list-ex-1-q4',
          question: 'Which food item is strictly kept out of Oak Kitchen for safety?',
          options: ['Cheese', 'Flour', 'Nuts', 'Tomatoes'],
          correctIdx: 2,
          explanation:
            'Thầy Patel nhấn mạnh bếp hoàn toàn không dùng các loại hạt vì lý do an toàn ("completely nut-free for safety").',
        },
        {
          id: 'cam-list-ex-1-q5',
          question: 'Where is the entrance to the cooking studio?',
          options: [
            'Behind the Elm Road post office',
            'The blue door beside the corner bakery',
            'Inside the Elm Road supermarket',
            'Opposite the train station car park',
          ],
          correctIdx: 1,
          explanation:
            'Lối vào là cánh cửa màu xanh ngay cạnh tiệm bánh ở góc đường Elm ("the blue door next to it").',
        },
      ],
    },
    {
      id: 'cam-list-ex-2',
      partLabel: 'PET (B1) Listening Practice',
      title: 'Preparing for the School Science Fair',
      level: 'B1',
      speakerContext: 'Hai học sinh Owen và Tessa trao đổi để hoàn thiện mô hình tua-bin gió cho hội chợ khoa học.',
      audioScript:
        'Tessa: Owen, how did the wind-turbine test go yesterday afternoon? Owen: Well, the cardboard blades bent as soon as we turned the fan up to medium! Fortunately, my uncle gave me thin sheets of balsa wood last night, so they’ll spin smoothly without snapping. Tessa: Relief! What about creating the airflow on display day? Owen: Mr. Grant promised we can borrow the compact white desk fan from the physics lab. Tessa: Awesome. I’ve finished designing our energy output graphs, though my home printer ran out of ink. Can we print them during lunch? Owen: Sure, the school library lets science-fair teams print two color posters for free. Oh, and Ms. Lee emailed our table number—we’re at Booth Seven near the gym doors, right across from the robotics club.',
      viSummary:
        'Cánh quạt bìa cứng bị cong nên Owen đổi sang gỗ balsa mỏng. Cả hai mượn quạt bàn trắng từ phòng Lý của thầy Grant, in miễn phí 2 áp-phích màu ở thư viện trường và trưng bày tại Gian số 7 gần cửa phòng gym.',
      questions: [
        {
          id: 'cam-list-ex-2-q1',
          question: 'What went wrong during Owen’s test yesterday afternoon?',
          options: [
            'The desk fan stopped working completely.',
            'Owen forgot to charge the turbine battery.',
            'The cardboard blades bent under medium airflow.',
            'The balsa wood blades snapped in half.',
          ],
          correctIdx: 2,
          explanation:
            'Cánh quạt bằng bìa cứng bị cong ngay khi bật quạt mức trung bình ("the cardboard blades bent").',
        },
        {
          id: 'cam-list-ex-2-q2',
          question: 'Where did Owen get the balsa wood for the new blades?',
          options: [
            'From his uncle',
            'From the school art supply room',
            'From Mr. Grant in the physics lab',
            'From the robotics club',
          ],
          correctIdx: 0,
          explanation:
            'Chú của Owen đã cho cậu những tấm gỗ balsa mỏng tối qua ("my uncle gave me thin sheets of balsa wood").',
        },
        {
          id: 'cam-list-ex-2-q3',
          question: 'How will the students produce wind at their science fair table?',
          options: [
            'By opening the gym doors wide',
            'By using a handheld hairdryer',
            'By spinning the blades manually',
            'By borrowing a small desk fan from Mr. Grant',
          ],
          correctIdx: 3,
          explanation:
            'Thầy Grant cho mượn chiếc quạt bàn nhỏ màu trắng từ phòng thí nghiệm Vật lý.',
        },
        {
          id: 'cam-list-ex-2-q4',
          question: 'How will Tessa print the energy output graphs?',
          options: [
            'At a copy shop after school',
            'Using the school library’s free poster allowance',
            'On Owen’s color printer at home',
            'By drawing them onto cardboard by hand',
          ],
          correctIdx: 1,
          explanation:
            'Thư viện trường cho các đội dự hội chợ khoa học in miễn phí 2 áp-phích màu.',
        },
        {
          id: 'cam-list-ex-2-q5',
          question: 'Where is Booth Seven located?',
          options: [
            'Inside the physics laboratory',
            'Next to the main library desk',
            'Near the gym doors, opposite the robotics club',
            'Outside in the school courtyard',
          ],
          correctIdx: 2,
          explanation:
            'Gian số 7 nằm gần cửa phòng gym, ngay đối diện câu lạc bộ robotics.',
        },
      ],
    },
    {
      id: 'cam-list-ex-3',
      partLabel: 'PET / FCE (B1–B2) Listening Monologue',
      title: 'Welcome to the Maritime Lantern Museum',
      level: 'B1',
      speakerContext: 'Hướng dẫn viên phổ biến quy định và lịch trình cho đoàn học sinh tham quan Bảo tàng Đèn Biển.',
      audioScript:
        'Welcome everyone to the Maritime Lantern Museum! Before we step inside, let me share a few quick details. Our museum first opened in nineteen twenty-four inside a retired lighthouse keeper’s stone cottage, and today holds over ninety coastal lamps. You are very welcome to take photos in every gallery, provided you switch off your camera flash so delicate glass lenses aren’t affected. Please note that our harbor café is closed today for pipe repairs, so at lunchtime you may eat your packed sandwiches in the covered garden courtyard—just keep food out of the exhibition halls. At two fifteen, don’t miss our Storm Wave Simulator in the basement gallery, where you can hear real coastal foghorns. Finally, students showing a school badge receive a fifteen percent discount on postcards and bookmarks at the exit shop.',
      viSummary:
        'Bảo tàng mở cửa năm 1924 trong ngôi nhà đá cũ của người gác hải đăng. Khách được chụp ảnh không bật đèn flash. Quán cà phê đóng cửa sửa ống nước nên đoàn ăn trưa ở sân vườn có mái che. Lúc 14:15 có mô phỏng sóng bão ở tầng hầm; học sinh có thẻ được giảm 15% tại quầy lưu niệm.',
      questions: [
        {
          id: 'cam-list-ex-3-q1',
          question: 'What was the museum building originally used as?',
          options: [
            'A wooden boat repair workshop',
            'A coastal weather radio station',
            'A fish market beside the harbor',
            'A lighthouse keeper’s stone home',
          ],
          correctIdx: 3,
          explanation:
            'Bảo tàng mở năm 1924 bên trong ngôi nhà đá của người gác hải đăng đã nghỉ hưu ("retired lighthouse keeper’s stone cottage").',
        },
        {
          id: 'cam-list-ex-3-q2',
          question: 'What rule applies to photography inside the galleries?',
          options: [
            'Photos are permitted as long as the flash is turned off.',
            'Cameras must be left locked at the front reception desk.',
            'Only the basement gallery allows mobile phone photos.',
            'Visitors must pay extra for a photography pass.',
          ],
          correctIdx: 0,
          explanation:
            'Khách thoải mái chụp ảnh ở mọi phòng trưng bày miễn là tắt đèn flash ("provided you switch off your camera flash").',
        },
        {
          id: 'cam-list-ex-3-q3',
          question: 'Where should students eat their lunch today?',
          options: [
            'Inside the harbor café',
            'In the covered garden courtyard',
            'On the benches inside Gallery Two',
            'On the school bus outside the gate',
          ],
          correctIdx: 1,
          explanation:
            'Quán cà phê đóng cửa sửa ống nước nên học sinh ăn trưa ở sân vườn có mái che ("covered garden courtyard").',
        },
        {
          id: 'cam-list-ex-3-q4',
          question: 'What special demonstration takes place at 2:15 PM?',
          options: [
            'A talk by a retired sailor',
            'A lighthouse glass-cleaning workshop',
            'The Storm Wave Simulator in the basement',
            'A postcard painting competition',
          ],
          correctIdx: 2,
          explanation:
            'Lúc 2:15 chiều có chương trình Storm Wave Simulator ở phòng trưng bày tầng hầm.',
        },
        {
          id: 'cam-list-ex-3-q5',
          question: 'How can students get a 15% discount in the exit shop?',
          options: [
            'By answering a museum quiz sheet',
            'By buying three coastal lamps together',
            'By visiting after four o’clock',
            'By presenting their school badge',
          ],
          correctIdx: 3,
          explanation:
            'Học sinh xuất trình thẻ trường ("showing a school badge") được giảm 15% bưu thiếp và đánh dấu sách.',
        },
      ],
    },
    {
      id: 'cam-list-ex-4',
      partLabel: 'FCE (B2) Listening Interview',
      title: 'Life as a Foley Sound Artist for Animated Films',
      level: 'B2',
      speakerContext: 'Phỏng vấn phát thanh với Nadia Cruz, nghệ sĩ tạo hiệu ứng âm thanh (Foley) cho phim hoạt hình.',
      audioScript:
        'Host: Nadia, most cinema fans assume animated characters’ footsteps and rustling coats come from digital libraries. Why do studios still hire foley artists like you? Nadia: Pre-recorded sound packs rarely match the exact rhythm of a hand-drawn character walking across wet mud or nervously tapping a teacup. Recording live while watching the rough animation gives every gesture weight and personality. Host: What everyday object in your studio surprises visitors most? Nadia: Definitely frozen cabbage! When you squeeze half a head of frozen cabbage next to a sensitive microphone, it sounds remarkably like crisp boots crunching through deep winter snow—much more convincing than actual crushed ice, which melts loudly into the mic. Host: When do you prefer to record quiet scenes? Nadia: Usually after nine at night, once delivery trucks stop rumbling outside our studio street. Ironically, the highest compliment in my job is when an audience walks out praising the animation without mentioning sound once—because if foley feels invisible, it means viewers believed the world completely.',
      viSummary:
        'Nadia Cruz giải thích nghệ sĩ Foley thu âm trực tiếp theo chuyển động phim để tạo cá tính tự nhiên thay vì dùng kho âm thanh có sẵn. Cô dùng bắp cải đông lạnh giả tiếng bước chân trên tuyết và thường thu cảnh tĩnh sau 21:00 khi xe tải ngừng chạy. Với cô, lời khen lớn nhất là khán giả không nhận ra hiệu ứng âm thanh vì họ hoàn toàn đắm chìm vào phim.',
      questions: [
        {
          id: 'cam-list-ex-4-q1',
          question: 'Why does Nadia think live foley recording works better than pre-recorded sound libraries?',
          options: [
            'It matches the precise timing and character of animated movement.',
            'Digital sound packs are too expensive for small studios.',
            'Animated films cannot legally use pre-recorded sounds.',
            'It allows actors to skip recording spoken dialogue.',
          ],
          correctIdx: 0,
          explanation:
            'Thu trực tiếp theo bản nháp hoạt hình khớp từng nhịp điệu cử chỉ và tạo cá tính sống động cho nhân vật.',
        },
        {
          id: 'cam-list-ex-4-q2',
          question: 'What does Nadia use frozen cabbage to imitate?',
          options: [
            'Heavy rain hitting a wooden roof',
            'Dragon wings flapping in a cave',
            'Footsteps crunching through deep snow',
            'Old bicycle wheels rolling over gravel',
          ],
          correctIdx: 2,
          explanation:
            'Bóp bắp cải đông lạnh trước micro tạo âm thanh bước chân lạo xạo trên tuyết dày ("boots crunching through deep winter snow").',
        },
        {
          id: 'cam-list-ex-4-q3',
          question: 'Why does Nadia avoid using real crushed ice in the studio?',
          options: [
            'It freezes the microphone stand.',
            'It makes unwanted melting noises near the microphone.',
            'It takes too long to deliver to the studio.',
            'It sounds too similar to breaking glass.',
          ],
          correctIdx: 1,
          explanation:
            'Đá bào thật bị tan và tạo tiếng chảy nước ồn ào lọt vào micro ("melts loudly into the mic").',
        },
        {
          id: 'cam-list-ex-4-q4',
          question: 'Why does Nadia record delicate, quiet scenes after 9:00 PM?',
          options: [
            'Voice actors prefer working late shifts.',
            'Electricity costs less during evening hours.',
            'Animation directors only send clips at night.',
            'Street traffic from delivery trucks has died down by then.',
          ],
          correctIdx: 3,
          explanation:
            'Sau 9 giờ tối xe tải giao hàng ngoài phố không còn chạy ầm ầm ("once delivery trucks stop rumbling").',
        },
        {
          id: 'cam-list-ex-4-q5',
          question: 'How does Nadia measure whether her work on a film has succeeded?',
          options: [
            'Viewers become so absorbed in the story that they don’t notice the sound effects separately.',
            'Film critics write long articles analyzing every footstep.',
            'The director asks her to make the footsteps louder.',
            'Audiences guess which kitchen items produced each sound.',
          ],
          correctIdx: 0,
          explanation:
            'Khi hiệu ứng Foley "vô hình" — khán giả không để ý tách biệt âm thanh vì họ hoàn toàn tin vào thế giới trong phim.',
        },
      ],
    },
  ],

  writing: [
    {
      id: 'cam-write-ex-1',
      taskLabel: 'PET (B1) Writing Part 1 — Informal Email',
      title: 'Inviting a Pen Pal to Your Town’s Lantern Festival',
      recommendedMinutes: 25,
      wordCountRange: '90 – 120 từ',
      minWords: 80,
      prompt:
        'Read this email from your pen pal Clara:\n"Hi! I heard your town holds a traditional Lantern Festival every autumn! When is it taking place this year? What activities can we do there together, and what should I pack or wear for the evening?"\nWrite a reply to Clara answering all three questions (about 100 words).',
      promptVi:
        'Viết email phản hồi Clara (khoảng 100 từ) trả lời đủ 3 câu hỏi: Lễ hội diễn ra khi nào, hai bạn sẽ tham gia hoạt động gì, và Clara nên mặc/mang theo đồ gì cho buổi tối.',
      outline: [
        'Opening: Chào thân mật và bày tỏ niềm vui mời Clara tham gia lễ hội.',
        'Paragraph 1 (Date & Time): Nêu rõ ngày tổ chức và khung giờ đẹp nhất (ví dụ tối thứ Bảy tuần tới từ 6:00 PM).',
        'Paragraph 2 (Activities): Kể 2 hoạt động thú vị (làm đèn lồng giấy, đi dạo phố cổ, thưởng thức bánh nướng).',
        'Paragraph 3 (What to wear/bring): Nhắc mang áo khoác nhẹ vì tối se lạnh và giày bệt êm chân + máy ảnh.',
      ],
      scoringCriteriaFocus: [
        'Content: Đáp ứng đủ cả 3 ý hỏi của Clara (thời gian, hoạt động, trang phục/đồ mang theo).',
        'Communicative Achievement: Giọng văn thân thiện, tự nhiên chuẩn PET Informal Email.',
      ],
      highBandKeywords: [
        { phrase: 'be thrilled to show you around', meaningVi: 'rất hào hứng được dẫn bạn đi tham quan' },
        { phrase: 'light up the old quarter', meaningVi: 'thắp sáng khu phố cổ' },
        { phrase: 'get a bit chilly after sunset', meaningVi: 'trời hơi se lạnh sau khi mặt trời lặn' },
        { phrase: 'comfortable walking shoes', meaningVi: 'giày đi bộ thoải mái' },
      ],
      modelAnswer:
        'Hi Clara,\n\nI’m thrilled that you want to visit during our Lantern Festival! This year it takes place next Saturday evening, starting around six o’clock when the streets begin to get dark.\n\nFirst, we can join a paper-lantern workshop near the river and paint our own designs. Later, we’ll stroll through the old quarter to watch the folk lion dance and try warm sesame pastries from the night stalls.\n\nSince it gets a bit chilly after sunset, pack a light jacket and wear comfortable walking shoes because the stone lanes are quite long. Don’t forget your camera!\n\nLet me know your train time.\n\nBest,\nLinh',
      modelNotesVi:
        'Bài mẫu dài 107 từ, bám sát độ dài chuẩn PET (~100 từ), trả lời rõ ràng đủ 3 câu hỏi và dùng từ nối tự nhiên ("First", "Later", "Since").',
    },
    {
      id: 'cam-write-ex-2',
      taskLabel: 'PET (B1) Writing Part 2 — Short Story',
      title: 'The Missing Sketchbook on the Train',
      recommendedMinutes: 25,
      wordCountRange: '100 – 130 từ',
      minWords: 90,
      prompt:
        'Your English teacher has asked you to write a story. Your story must begin with this sentence:\n"When Tom looked down at the empty seat beside him, he realized his green sketchbook was gone."\nWrite your story in about 100–120 words.',
      promptVi:
        'Viết truyện ngắn B1 (~100–120 từ) bắt đầu đúng bằng câu đề cho: Tom phát hiện cuốn sổ phác họa màu xanh trên ghế trống bên cạnh đã biến mất.',
      outline: [
        'Beginning: Giữ nguyên câu mở đầu; giải thích nhanh vì sao cuốn sổ quan trọng (chuẩn bị nộp dự án nghệ thuật).',
        'Middle (Action): Tom hốt hoảng kiểm tra ba lô, chạy tới quầy thất lạc (lost-property office) ở ga cuối.',
        'Climax & Ending: Nhân viên tìm thấy sổ nhờ bức vẽ chú chó ở trang bìa / hoặc hành khách tốt bụng gửi lại → kết thúc nhẹ nhõm, vui vẻ.',
      ],
      scoringCriteriaFocus: [
        'Organisation: Có mở đầu, diễn biến căng thẳng và cái kết hợp lý, dùng thì quá khứ nhất quán.',
        'Language: Kết hợp Past Simple và Past Continuous linh hoạt.',
      ],
      highBandKeywords: [
        { phrase: 'my heart sank', meaningVi: 'lòng chùng xuống / hụt hẫng' },
        { phrase: 'trace my steps back', meaningVi: 'lần ngược lại lộ trình vừa đi' },
        { phrase: 'lost-property desk', meaningVi: 'quầy đồ thất lạc' },
        { phrase: 'breathe a huge sigh of relief', meaningVi: 'thở phào nhẹ nhõm' },
      ],
      modelAnswer:
        'When Tom looked down at the empty seat beside him, he realized his green sketchbook was gone. His heart sank because every watercolor drawing for Monday’s art exhibition was inside it. Just five minutes earlier, he had stepped off the morning commuter train without checking the luggage rack.\n\nTom raced back along the platform toward the lost-property desk, hoping someone had spotted the notebook. While he was describing the tiny sunflower sticker on its cover, a station guard walked in holding a familiar green book.\n\n"A passenger found this under seat twelve," the guard smiled. Tom breathed a huge sigh of relief and promised himself never to rush off a train again.',
      modelNotesVi:
        'Độ dài ~115 từ chuẩn PET Part 2, giữ nguyên câu mở đầu bắt buộc, chia 3 đoạn mạch lạc và phối hợp thì quá khứ đơn – quá khứ tiếp diễn tự nhiên.',
    },
    {
      id: 'cam-write-ex-3',
      taskLabel: 'FCE (B2 First) Writing Part 2 — Article',
      title: 'A Hands-On Skill Everyone Should Try Once',
      recommendedMinutes: 40,
      wordCountRange: '140 – 190 từ',
      minWords: 135,
      prompt:
        'You see this announcement on an international student website:\n"Articles Wanted: A Practical Skill Worth Learning!\nWrite an article about a hands-on skill—not involving a computer—that you think young people should try. Describe what it involves, explain why you enjoy it, and say who would benefit most from it."\nWrite your article in 140–190 words.',
      promptVi:
        'Viết bài Article chuẩn FCE (140–190 từ) với tiêu đề hấp dẫn, giọng văn lôi cuốn người đọc trẻ về một kỹ năng thực hành không dùng máy tính (ví dụ: làm bánh mì thủ công).',
      outline: [
        'Catchy Title + Hook: Tiêu đề thu hút + câu hỏi mở đầu kéo người đọc vào chủ đề.',
        'Body 1 (What it involves): Mô tả ngắn gọn các bước làm bánh mì men tự nhiên (nhào bột, chờ ủ, nướng).',
        'Body 2 (Why it’s enjoyable & Who benefits): Giải tỏa áp lực thi cử, rèn tính kiên nhẫn; cực hợp cho học sinh hay căng thẳng vì màn hình.',
        'Closing: Lời kêu gọi vui vẻ khích lệ bạn đọc thử cuối tuần này.',
      ],
      scoringCriteriaFocus: [
        'Communicative Achievement: Giọng văn sống động kiểu tạp chí, có tiêu đề và giao tiếp trực tiếp với độc giả ("Have you ever...?").',
        'Language: Từ vựng miêu tả giác quan sinh động, kiểm soát chặt 140–190 từ.',
      ],
      highBandKeywords: [
        { phrase: 'step away from glowing screens', meaningVi: 'tạm rời xa màn hình sáng rực' },
        { phrase: 'kneading soft dough', meaningVi: 'nhào khối bột mềm' },
        { phrase: 'unbeatable sense of pride', meaningVi: 'cảm giác tự hào khó gì sánh bằng' },
        { phrase: 'busy students glued to desks', meaningVi: 'học sinh bận rộn ngồi lì bên bàn học' },
      ],
      modelAnswer:
        'Flour, Patience, and a Warm Loaf\n\nHave you ever wondered what happens when you spend a Sunday afternoon without touching a phone or laptop? For me, the most rewarding off-screen skill is baking homemade bread from scratch.\n\nUnlike following complicated recipes, basic bread requires only flour, water, yeast, and a pinch of salt. You mix everything in a bowl, spend ten energetic minutes kneading soft dough on the kitchen table, and then wait patiently while it rises before baking.\n\nWhat makes this craft so addictive is its calming rhythm. Kneading releases shoulder tension after a stressful week of exams, and pulling a golden, crackling loaf out of the oven brings an unbeatable sense of pride. Better still, you get to share warm slices with family.\n\nI believe busy students glued to desks and screens benefit most from baking, because it rewards patience with something delicious. Why not roll up your sleeves and bake your first loaf this weekend?',
      modelNotesVi:
        'Độ dài ~163 từ nằm chuẩn trong khung 140–190 từ của FCE. Có tiêu đề cuốn hút, mở đầu bằng câu hỏi tương tác và kết bài kêu gọi tự nhiên đúng văn phong Article.',
    },
    {
      id: 'cam-write-ex-4',
      taskLabel: 'FCE (B2 First) Writing Part 1 — Compulsory Essay',
      title: 'Should Public Museums Offer Free Entry Every Day?',
      recommendedMinutes: 40,
      wordCountRange: '140 – 190 từ',
      minWords: 135,
      prompt:
        'In your English class, you have been discussing public funding for culture. Now your teacher has asked you to write an essay:\n"Should public museums offer free admission to all visitors every day?"\nNotes — Write about:\n1. Access for students and families\n2. Funding for exhibitions and building care\n3. [Your own idea]\nWrite your essay in 140–190 words.',
      promptVi:
        'Viết bài luận FCE (140–190 từ) thảo luận có nên miễn phí vé vào cửa bảo tàng công lập mỗi ngày không. Phải đủ 2 ý gợi ý của đề + 1 ý tự thêm (ví dụ: quá tải khách du lịch / ý thức giữ gìn hiện vật).',
      outline: [
        'Introduction: Giới thiệu tranh luận về vé vào cửa bảo tàng + lập trường cân bằng.',
        'Body 1 (Access for students/families — Ý 1): Miễn phí giúp mọi gia đình, học sinh đều tiếp cận tri thức và di sản bình đẳng.',
        'Body 2 (Funding & Overcrowding — Ý 2 + Ý tự thêm): Tuy nhiên, bảo tàng cần kinh phí bảo tồn hiện vật và nếu miễn phí hoàn toàn dễ quá tải vào cuối tuần.',
        'Conclusion: Kết luận nên miễn phí cho học sinh/người dân địa phương hoặc miễn phí vài ngày cố định thay vì miễn phí toàn bộ.',
      ],
      scoringCriteriaFocus: [
        'Content: Đủ 3 luận điểm (2 gợi ý + 1 ý riêng của thí sinh).',
        'Organisation & Language: Dùng từ nối trang trọng ("Furthermore", "However", "On balance") và giữ văn phong khách quan.',
      ],
      highBandKeywords: [
        { phrase: 'equal access to cultural heritage', meaningVi: 'tiếp cận bình đẳng với di sản văn hóa' },
        { phrase: 'ongoing maintenance costs', meaningVi: 'chi phí bảo trì thường xuyên' },
        { phrase: 'weekend overcrowding', meaningVi: 'tình trạng quá tải vào cuối tuần' },
        { phrase: 'compromise solution', meaningVi: 'giải pháp dung hòa' },
      ],
      modelAnswer:
        'Whether public museums should abolish ticket fees altogether is a frequent topic of debate. While free admission brings clear social benefits, charging modest fees in certain situations may be more sustainable.\n\nOn the one hand, removing entry costs guarantees equal access to cultural heritage for students and low-income families. When young people can walk into a science or history gallery spontaneously, learning extends naturally beyond classroom walls.\n\nOn the other hand, museums face high ongoing maintenance costs, from climate-controlled display cases to fresh temporary exhibitions. Without ticket revenue, smaller galleries might rely entirely on unpredictable government budgets. Another practical concern is weekend overcrowding: free entry every day often produces long queues that reduce visitors’ enjoyment and increase wear on historic floors.\n\nOn balance, a compromise solution works best. Public museums could remain free for students, seniors, and designated monthly open days, while charging visitors a modest fee at peak times to protect exhibitions for future generations.',
      modelNotesVi:
        'Độ dài ~165 từ chuẩn FCE Essay (140–190 từ), xử lý đầy đủ 2 ý đề bài + ý riêng về tình trạng quá tải ("weekend overcrowding"), lập luận chặt chẽ.',
    },
  ],

  speaking: [
    {
      id: 'cam-speak-ex-1',
      partLabel: 'Speaking Part 1 (Interview — KET/PET)',
      title: 'Music, New Hobbies & Evening Routines',
      prepTimeText: 'Trả lời ngay',
      speakTimeText: '20–30 giây / câu',
      prompt:
        '1. What kind of music do you usually listen to when studying or relaxing?\n2. Have you started any new hobby recently, and why?\n3. How do you normally unwind in the evening after a busy day?',
      promptVi:
        'Trả lời mỗi câu 2–3 câu hoàn chỉnh, kèm 1 lý do hoặc ví dụ cụ thể thay vì nói ngắn 1 dòng.',
      sampleAnswer:
        'When I study, I prefer soft instrumental jazz or acoustic guitar without lyrics because vocals easily distract me from reading. Recently, I started learning basic calligraphy with a brush pen—it looked peaceful in online videos, and practicing strokes helps slow down my mind. In the evening, I usually take a short walk around my block after dinner and then read a chapter of a light novel before going to sleep.',
      highScoreVocab: [
        { phrase: 'instrumental music without lyrics', meaningVi: 'nhạc không lời' },
        { phrase: 'slow down my mind', meaningVi: 'giúp tâm trí chậm lại, thư giãn' },
        { phrase: 'unwind after a busy day', meaningVi: 'xả hơi sau một ngày bận rộn' },
      ],
      deliveryTips: [
        'Luôn trả lời theo công thức: Ý chính + Lý do ("because...") + Ví dụ ngắn.',
        'Tránh học thuộc cứng nhắc; nhấn trọng âm vào từ khóa cảm xúc ("peaceful", "distract").',
      ],
    },
    {
      id: 'cam-speak-ex-2',
      partLabel: 'Speaking Part 2 (PET Photo Description — 1 Minute)',
      title: 'Describing a Busy Outdoor Farmers’ Market',
      prepTimeText: 'Nói ngay khi nhận ảnh',
      speakTimeText: '1 phút mô tả liên tục',
      prompt:
        'Describe the photograph:\nA sunny weekend farmers’ market in a town square. Under striped canvas umbrellas, local growers display wooden crates of bright tomatoes, herbs, and fresh bread. A smiling woman in a denim apron hands a paper bag to a young family carrying a woven basket.',
      cuePoints: [
        'Bối cảnh tổng quát (địa điểm, thời tiết, không khí)',
        'Người ở trung tâm bức ảnh đang làm gì, mặc gì',
        'Các chi tiết đồ vật xung quanh (gian hàng, ô che, giỏ mây)',
        'Suy đoán cảm xúc & lý do mọi người thích chợ nông sản',
      ],
      promptVi:
        'Tả từ bao quát đến chi tiết theo thứ tự không gian (ở tiền cảnh / hậu cảnh), dùng thì Hiện tại tiếp diễn cho hành động đang diễn ra.',
      sampleAnswer:
        'This photograph shows a lively outdoor farmers’ market set up in a sunny town square. In the foreground on the left, a friendly stallholder wearing a denim apron is smiling as she hands a brown paper bag to a young couple and their little boy, who is holding a woven shopping basket. Behind them, under colorful striped umbrellas, there are wooden crates overflowing with fresh red tomatoes, green herbs, and loaves of crusty bread. In the background, several other shoppers are strolling slowly between stalls, and old stone buildings frame the square. Everyone looks relaxed and cheerful—they are probably enjoying buying fresh seasonal produce directly from local farmers.',
      highScoreVocab: [
        { phrase: 'in the foreground / background', meaningVi: 'ở tiền cảnh / hậu cảnh bức ảnh' },
        { phrase: 'overflowing with fresh produce', meaningVi: 'đầy ắp nông sản tươi' },
        { phrase: 'strolling between stalls', meaningVi: 'tản bộ giữa các gian hàng' },
      ],
      deliveryTips: [
        'Dùng đúng thì Present Continuous để tả hành động ("is smiling", "are strolling").',
        'Nếu quên từ vựng vật cụ thể, dùng từ mô tả thay thế ("a kind of woven basket") thay vì im lặng.',
      ],
    },
    {
      id: 'cam-speak-ex-3',
      partLabel: 'Speaking Part 2 (FCE Photo Comparison — 1 Minute Long Turn)',
      title: 'Two Ways to Enjoy Nature: Mountain Hiking vs. Kayaking',
      prepTimeText: 'Nói ngay khi nhận 2 ảnh',
      speakTimeText: '1 phút nói liên tục',
      prompt:
        'Compare the two photographs and answer the question:\n• Photo A: Two hikers with backpacks pausing on a rocky mountain ridge overlooking misty green valleys.\n• Photo B: A solo kayaker paddling calmly across a mirror-like lake surrounded by autumn pine trees.\nQuestion: "Why might people choose these different outdoor activities for a weekend break?"',
      promptVi:
        'Dành 35 giây đầu so sánh song song điểm giống và khác của 2 ảnh; dành 25 giây cuối trả lời thẳng câu hỏi phía trên ảnh.',
      sampleAnswer:
        'Both photographs capture people spending their free time surrounded by peaceful natural scenery, yet the experiences feel quite different. In the first picture, two friends are hiking together up a steep mountain ridge, whereas the second photo shows a single person kayaking calmly on a flat, tree-lined lake. Hiking requires greater physical stamina on rocky paths, while kayaking looks gentler and lets you glide quietly close to the water. People might choose mountain hiking when they want an energetic team challenge and sweeping views from the summit. On the other hand, someone feeling stressed from city noise might prefer kayaking alone to enjoy total stillness and clear their head.',
      highScoreVocab: [
        { phrase: 'physical stamina', meaningVi: 'sức bền thể chất' },
        { phrase: 'sweeping views from the summit', meaningVi: 'tầm nhìn bao quát từ đỉnh núi' },
        { phrase: 'enjoy total stillness', meaningVi: 'tận hưởng sự tĩnh lặng tuyệt đối' },
      ],
      deliveryTips: [
        'Không mô tả hết Ảnh A rồi mới sang Ảnh B; hãy ghép cặp so sánh bằng "whereas" và "while".',
        'Nhớ trả lời rõ câu hỏi "Why might people choose..." ở nửa sau lượt nói.',
      ],
    },
    {
      id: 'cam-speak-ex-4',
      partLabel: 'Speaking Part 3 & 4 (FCE Collaborative Task)',
      title: 'Designing an Eco-Friendly School Week',
      prepTimeText: '15 giây xem sơ đồ',
      speakTimeText: '2 phút thảo luận + 1 phút chọn 1 ý',
      prompt:
        'Your school wants to organize an "Eco-Friendly Week" to encourage greener habits. Talk together about how effective each idea would be:\n1. Zero-waste cafeteria challenge\n2. Bike-to-school mornings\n3. Swap-and-share clothing corner\n4. Student herb & vegetable garden beds\nThen decide which ONE idea would be easiest to launch first.',
      promptVi:
        'Thể hiện kỹ năng tương tác cặp đôi: nêu ưu/nhược điểm từng ý, phản hồi lời bạn thi cùng và chủ động đặt câu hỏi để cùng chốt 1 lựa chọn.',
      sampleAnswer:
        'Shall we look at the zero-waste cafeteria challenge first? I think it raises immediate awareness because every student visits the canteen daily, though tracking food waste might take extra effort from kitchen staff. What do you think about bike-to-school mornings? Personally, I love the idea for students living nearby, yet safety and rain could stop people who commute from further away. Moving on to the swap-and-share clothing corner, teenagers really enjoy refreshing their wardrobes without spending money! Still, if we have to pick just one project that is easiest to launch right away, I’d choose the swap-and-share corner because we only need a few tables in the hall—would you go along with that?',
      highScoreVocab: [
        { phrase: 'raises immediate awareness', meaningVi: 'nâng cao nhận thức tức thì' },
        { phrase: 'moving on to', meaningVi: 'chuyển sang ý tiếp theo' },
        { phrase: 'would you go along with that?', meaningVi: 'bạn có đồng tình với phương án đó không?' },
      ],
      deliveryTips: [
        'Duy trì luân phiên lượt nói 20–25 giây mỗi lần rồi chuyển bóng cho bạn thi cùng.',
        'Trong 1 phút chốt lựa chọn cuối, không nhất thiết phải đồng ý hoàn toàn ngay, miễn đạt thỏa thuận tự nhiên.',
      ],
    },
  ],

  mockTests: [
    {
      title: 'Mini Mock Test #2',
      description:
        'Đề thi thử #2 chuẩn PET (B1 Core): Listening đời sống/trường học, Use of English & Reading thực tế (25 câu).',
      durationMinutes: 30,
      questions: [
        {
          id: 'cam-mock-2-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (KET/PET)',
          audioScript:
            'Boy: Mum, I can’t find my blue swimming goggles. Did you put them in my sports bag? Mum: I washed your towel and left it on the hall chair, and your goggles are on the kitchen shelf beside your water bottle.',
          question: 'Where are the boy’s swimming goggles?',
          options: [
            'On the kitchen shelf',
            'Inside his sports bag',
            'On the hall chair',
            'Beside the bathroom sink',
          ],
          correctIdx: 0,
          explanation:
            'Mẹ nói kính bơi đang ở trên kệ bếp cạnh bình nước ("on the kitchen shelf beside your water bottle").',
        },
        {
          id: 'cam-mock-2-q2',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Schedule)',
          audioScript:
            'Girl: Are we catching the two fifteen bus to the shopping center? Boy: That one only runs on weekdays. On Saturdays there’s one at two oh five, or we can walk down to the square for the two thirty express.',
          question: 'Which bus stops running on Saturdays?',
          options: [
            'The 2:05 local bus',
            'The 2:15 bus',
            'The 2:30 express bus',
            'All buses from the square',
          ],
          correctIdx: 1,
          explanation:
            'Chuyến 2:15 chỉ chạy ngày thường ("That one only runs on weekdays").',
        },
        {
          id: 'cam-mock-2-q3',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Announcement)',
          audioScript:
            'Announcement: Passengers waiting for the Brighton ferry, please move to Gate Four instead of Gate Two. Boarding begins in fifteen minutes, and light refreshments are now open on the upper deck.',
          question: 'What should Brighton ferry passengers do now?',
          options: [
            'Wait quietly at Gate Two',
            'Buy tickets at the upper deck',
            'Walk over to Gate Four',
            'Return after fifteen hours',
          ],
          correctIdx: 2,
          explanation:
            'Thông báo yêu cầu hành khách di chuyển sang Cổng 4 thay vì Cổng 2 ("move to Gate Four").',
        },
        {
          id: 'cam-mock-2-q4',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Opinion)',
          audioScript:
            'Sarah: How was the new Thai restaurant on River Street, Luke? Luke: The spicy noodle soup was fantastic, and the portions were huge—though we had to wait twenty-five minutes for our table even with a reservation.',
          question: 'What was Luke disappointed about at the restaurant?',
          options: [
            'The noodle soup was not spicy enough.',
            'The food portions were too small.',
            'The staff forgot to take their order.',
            'They waited a long time despite booking ahead.',
          ],
          correctIdx: 3,
          explanation:
            'Dù đã đặt bàn trước nhưng vẫn phải chờ 25 phút ("wait twenty-five minutes for our table even with a reservation").',
        },
        {
          id: 'cam-mock-2-q5',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Activity Plan)',
          audioScript:
            'Emma: Shall we rent bikes around Cedar Lake this Sunday? Jack: The weather forecast says heavy rain all morning. Why don’t we visit the indoor climbing wall first, and see if the clouds clear after lunch?',
          question: 'What does Jack suggest doing on Sunday morning?',
          options: [
            'Going to the indoor climbing wall',
            'Cycling around Cedar Lake anyway',
            'Staying home to watch a movie',
            'Having lunch beside the lake',
          ],
          correctIdx: 0,
          explanation:
            'Trời dự báo mưa to buổi sáng nên Jack gợi ý đi leo núi trong nhà trước ("visit the indoor climbing wall first").',
        },
        {
          id: 'cam-mock-2-q6',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Short Interview)',
          audioScript:
            'Host: What made you start a neighborhood seed-sharing box outside your garden? Maya: I always bought packets with hundreds of tomato seeds and used only ten. Sharing spare packets lets neighbors grow herbs cheaply, and people now leave painted rocks with thank-you notes inside.',
          question: 'Why did Maya originally set up the seed-sharing box?',
          options: [
            'To sell tomato plants to garden centers',
            'To avoid wasting leftover seeds from large packets',
            'To collect painted rocks from neighbors',
            'To win a town gardening competition',
          ],
          correctIdx: 1,
          explanation:
            'Mỗi gói hạt có hàng trăm hạt mà Maya chỉ dùng 10 hạt nên cô chia sẻ số dư cho hàng xóm.',
        },
        {
          id: 'cam-mock-2-q7',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Collocation)',
          question:
            'Could you please _____ me a favor and water my balcony plants while I am away in Leeds?',
          options: ['make', 'give', 'do', 'take'],
          correctIdx: 2,
          explanation:
            'Collocation cố định: "do someone a favor" (giúp đỡ ai một việc).',
        },
        {
          id: 'cam-mock-2-q8',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Adjective + Prep)',
          question:
            'Although our school choir practiced only twice a week, our music teacher was very _____ of our concert performance.',
          options: ['keen', 'happy', 'glad', 'proud'],
          correctIdx: 3,
          explanation:
            'Chỉ có "proud" đi với giới từ "of" trong ngữ cảnh tự hào về thành tích ("be proud of").',
        },
        {
          id: 'cam-mock-2-q9',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Phrasal Verb)',
          question:
            'Because several players caught the flu, the weekend basketball tournament had to be _____ off until next month.',
          options: ['put', 'turned', 'taken', 'given'],
          correctIdx: 0,
          explanation:
            'Phrasal verb "put off" = trì hoãn, dời lịch sang thời điểm khác.',
        },
        {
          id: 'cam-mock-2-q10',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Word Choice)',
          question:
            'Before leaving the hotel room, remember to check the safe so you don’t _____ anything valuable behind.',
          options: ['forget', 'leave', 'drop', 'miss'],
          correctIdx: 1,
          explanation:
            'Cụm cố định "leave something behind" (bỏ quên đồ lại phía sau); không dùng "forget" kèm tân ngữ + "behind".',
        },
        {
          id: 'cam-mock-2-q11',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Noun Choice)',
          question:
            'The train conductor politely asked passengers to keep their luggage out of the narrow _____ between seats.',
          options: ['path', 'road', 'aisle', 'track'],
          correctIdx: 2,
          explanation:
            '"Aisle" là lối đi hẹp giữa các hàng ghế trên tàu, xe buýt hoặc máy bay.',
        },
        {
          id: 'cam-mock-2-q12',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Phrasal Verb)',
          question:
            'When Ella first moved to Dublin, she found it easy to _____ on with her friendly flatmates.',
          options: ['make', 'keep', 'stay', 'get'],
          correctIdx: 3,
          explanation:
            '"Get on with someone" (hoặc "get along with") = hòa thuận, thân thiết với ai đó.',
        },
        {
          id: 'cam-mock-2-q13',
          skill: 'vocab',
          partLabel: 'Use of English Part 3 (Word Formation)',
          question:
            'Choose the right form of "PROTECT": "Tourists are asked to wear sun _____ and hats during the midday desert walk."',
          options: ['protection', 'protective', 'protecting', 'protectively'],
          correctIdx: 0,
          explanation:
            'Cụm danh từ ghép "sun protection" (kem/đồ chống nắng) phù hợp sau động từ "wear".',
        },
        {
          id: 'cam-mock-2-q14',
          skill: 'grammar',
          partLabel: 'Use of English Part 2 (Open Cloze)',
          question:
            'Choose ONE missing word: "That is the wooden bridge _____ we stopped to watch the sunset last August."',
          options: ['which', 'where', 'whom', 'what'],
          correctIdx: 1,
          explanation:
            'Thay cho "at that bridge" (nơi chốn) trước mệnh đề đầy đủ "we stopped...", dùng trạng từ quan hệ "where".',
        },
        {
          id: 'cam-mock-2-q15',
          skill: 'grammar',
          partLabel: 'Use of English Part 2 (Open Cloze)',
          question:
            'Choose ONE missing word: "Olivia has been learning Mandarin _____ she started secondary school four years ago."',
          options: ['for', 'during', 'since', 'until'],
          correctIdx: 2,
          explanation:
            'Mệnh đề phía sau là mốc thời gian quá khứ ("she started..."), kết hợp thì Hiện tại hoàn thành tiếp diễn -> dùng "since".',
        },
        {
          id: 'cam-mock-2-q16',
          skill: 'grammar',
          partLabel: 'PET Grammar (Verb Pattern)',
          question:
            'My older brother suggested _____ an early ferry so we could spend the whole morning exploring the island.',
          options: ['take', 'to take', 'taken', 'taking'],
          correctIdx: 3,
          explanation:
            'Động từ "suggest" theo sau bởi V-ing ("suggest taking..."), không đi trực tiếp với "to V".',
        },
        {
          id: 'cam-mock-2-q17',
          skill: 'grammar',
          partLabel: 'PET Grammar (Comparison)',
          question:
            'Although this backpack costs slightly less, it isn’t nearly _____ durable as the canvas one we saw earlier.',
          options: ['as', 'so', 'more', 'than'],
          correctIdx: 0,
          explanation:
            'Cấu trúc so sánh bằng phủ định: "isn’t nearly as + adj + as...".',
        },
        {
          id: 'cam-mock-2-q18',
          skill: 'grammar',
          partLabel: 'PET Grammar (Passive Voice)',
          question:
            'The town’s historic stone clock tower _____ carefully last autumn after heavy coastal storms.',
          options: ['repaired', 'was repaired', 'has repaired', 'is repairing'],
          correctIdx: 1,
          explanation:
            'Chủ ngữ là vật ("clock tower") + mốc thời gian quá khứ xác định ("last autumn") -> bị động quá khứ đơn "was repaired".',
        },
        {
          id: 'cam-mock-2-q19',
          skill: 'grammar',
          partLabel: 'PET Key Word Transformation',
          question:
            '"We haven’t visited our grandparents in Hue for six months." (SINCE) → "It is six months _____ our grandparents in Hue."',
          options: [
            'when we visited',
            'that we visit',
            'since we last visited',
            'for visiting',
          ],
          correctIdx: 2,
          explanation:
            'Cấu trúc chuyển đổi kinh điển: "It is + khoảng thời gian + since + S + (last) + V2/ed".',
        },
        {
          id: 'cam-mock-2-q20',
          skill: 'grammar',
          partLabel: 'PET Grammar (Conditionals)',
          question:
            'Unless the city council _____ more bike lanes soon, traffic congestion near the university will get worse.',
          options: ['will build', 'built', 'would build', 'builds'],
          correctIdx: 3,
          explanation:
            'Câu điều kiện loại 1 với "Unless" (= If... not): mệnh đề điều kiện chia Hiện tại đơn ("builds").',
        },
        {
          id: 'cam-mock-2-q21',
          skill: 'reading',
          partLabel: 'Reading Part 1 (Sign)',
          passage:
            'SWIMMING CENTER NOTICE:\nChildren under eight must be accompanied in the water by an adult over eighteen. Spectators may watch free from the upstairs balcony.',
          question: 'What does this notice state about adults?',
          options: [
            'An adult must go into the pool with young children under eight.',
            'Adults have to pay extra to sit on the upstairs balcony.',
            'Only adults over eighteen are allowed to buy pool passes.',
            'Children under eight cannot enter the building at all.',
          ],
          correctIdx: 0,
          explanation:
            'Trẻ dưới 8 tuổi phải có người lớn trên 18 tuổi đi cùng xuống nước ("accompanied in the water").',
        },
        {
          id: 'cam-mock-2-q22',
          skill: 'reading',
          partLabel: 'Reading Part 1 (Text Message)',
          passage:
            'Hi Dan,\nThe concert doors open at 7:00, not 7:30 as printed on the ticket! Can you pick up our snacks on your way so we don’t miss the opening band? — Priya',
          question: 'Why did Priya text Dan?',
          options: [
            'To tell him the opening band cancelled',
            'To warn him the doors open earlier than written on the ticket',
            'To ask him to bring an extra concert ticket',
            'To say she will arrive at 7:30 instead of 7:00',
          ],
          correctIdx: 1,
          explanation:
            'Cửa mở lúc 7:00 chứ không phải 7:30 như trên vé, nên Priya nhắn Dan mua đồ ăn vặt trên đường đi để kịp xem ban nhạc mở màn.',
        },
        {
          id: 'cam-mock-2-q23',
          skill: 'reading',
          partLabel: 'Reading Passage (Q23–Q25)',
          passage:
            'Every August, the tiny coastal village of Millhaven turns its quiet stone pier into an open-air cinema for three nights. Instead of plastic seats, visitors bring folded blankets, beach cushions, and thermoses of hot chocolate. A local boatbuilder hangs a wide white sail between two wooden masts to serve as the screen. Although coastal breezes occasionally ripple the edges of the sail, locals say watching classic adventure films beneath real stars beats any indoor multiplex.',
          question: 'What is used as the cinema screen in Millhaven?',
          options: [
            'A painted stone wall along the pier',
            'A wooden board attached to a fishing boat',
            'A large white boat sail hung between masts',
            'A modern plastic screen rented from town',
          ],
          correctIdx: 2,
          explanation:
            'Thợ đóng thuyền treo một cánh buồm trắng rộng giữa hai cột buồm làm màn chiếu ("a wide white sail between two wooden masts").',
        },
        {
          id: 'cam-mock-2-q24',
          skill: 'reading',
          partLabel: 'Reading Passage (Q23–Q25)',
          passage:
            'Every August, the tiny coastal village of Millhaven turns its quiet stone pier into an open-air cinema for three nights. Instead of plastic seats, visitors bring folded blankets, beach cushions, and thermoses of hot chocolate. A local boatbuilder hangs a wide white sail between two wooden masts to serve as the screen. Although coastal breezes occasionally ripple the edges of the sail, locals say watching classic adventure films beneath real stars beats any indoor multiplex.',
          question: 'What do audience members bring with them?',
          options: [
            'Their own folding plastic chairs',
            'Extra wooden masts for the screen',
            'Flashlights to read film subtitles',
            'Blankets, cushions, and hot drinks',
          ],
          correctIdx: 3,
          explanation:
            'Người xem mang theo chăn gấp, gối tựa biển và bình giữ nhiệt sô-cô-la nóng ("folded blankets, beach cushions, and thermoses of hot chocolate").',
        },
        {
          id: 'cam-mock-2-q25',
          skill: 'reading',
          partLabel: 'Reading Passage (Q23–Q25)',
          passage:
            'Every August, the tiny coastal village of Millhaven turns its quiet stone pier into an open-air cinema for three nights. Instead of plastic seats, visitors bring folded blankets, beach cushions, and thermoses of hot chocolate. A local boatbuilder hangs a wide white sail between two wooden masts to serve as the screen. Although coastal breezes occasionally ripple the edges of the sail, locals say watching classic adventure films beneath real stars beats any indoor multiplex.',
          question: 'How do villagers feel about the slight wind moving the screen?',
          options: [
            'They still prefer the outdoor experience over a normal indoor cinema.',
            'They plan to move the festival inside a sports hall next year.',
            'They refuse to watch classic adventure films near the sea.',
            'They complain that the breeze ruins the sound quality.',
          ],
          correctIdx: 0,
          explanation:
            'Dù gió làm rìa buồm hơi gợn sóng, người dân vẫn thấy xem phim dưới bầu trời sao tuyệt hơn rạp trong nhà.',
        },
      ],
    },

    {
      title: 'Mini Mock Test #3',
      description:
        'Đề thi thử #3 cầu nối PET–FCE (B1–B2): Chủ đề Môi trường, Nghệ thuật & Cộng đồng (25 câu chuẩn Cambridge).',
      durationMinutes: 30,
      questions: [
        {
          id: 'cam-mock-3-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Situation)',
          audioScript:
            'Woman: Excuse me, does this gallery tour cover the twentieth-century sculpture room? Guide: Today’s midday group focuses mainly on watercolor landscapes, while the sculpture rooms are included in our three o’clock architecture walk.',
          question: 'Which tour should the woman join to see the sculpture room?',
          options: [
            'The midday watercolor tour',
            'The 3:00 PM architecture walk',
            'The morning landscape group',
            'The evening painting workshop',
          ],
          correctIdx: 1,
          explanation:
            'Phòng điêu khắc nằm trong chuyến đi bộ kiến trúc lúc 3 giờ chiều ("three o’clock architecture walk").',
        },
        {
          id: 'cam-mock-3-q2',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Radio Notice)',
          audioScript:
            'Presenter: Volunteers joining Saturday’s riverside litter cleanup should wear waterproof boots because yesterday’s rain left muddy banks. Protective gloves and collection bags will be handed out near the stone bridge at eight forty-five.',
          question: 'What are volunteers advised to wear on Saturday?',
          options: [
            'White canvas trainers',
            'Heavy winter coats',
            'Waterproof boots',
            'Their own rubber gloves',
          ],
          correctIdx: 2,
          explanation:
            'Bờ sông lầy lội sau mưa nên tình nguyện viên được khuyên đi ủng chống nước ("wear waterproof boots"); găng tay sẽ được phát.',
        },
        {
          id: 'cam-mock-3-q3',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Dialogue)',
          audioScript:
            'Ben: Did you submit your short film to the youth festival? Nora: Nearly missed the deadline! I spent hours exporting the sound track, only to realize I forgot the English subtitles—thankfully my sister spotted that twenty minutes before midnight.',
          question: 'What problem did Nora’s sister help her avoid?',
          options: [
            'Sending the film to the wrong email address',
            'Missing the sound track during export',
            'Losing the camera memory card',
            'Submitting the film without English subtitles',
          ],
          correctIdx: 3,
          explanation:
            'Chị/em gái Nora kịp phát hiện phim thiếu phụ đề tiếng Anh 20 phút trước hạn chót ("forgot the English subtitles").',
        },
        {
          id: 'cam-mock-3-q4',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Project Feedback)',
          audioScript:
            'Teacher: Liam, your solar-oven poster explains the mirror angles clearly, and the photos look sharp. To earn top marks next week, just add a simple table comparing how fast water heated at noon versus four o’clock.',
          question: 'What does the teacher suggest Liam add to his poster?',
          options: [
            'A chart comparing water heating times',
            'Clearer photographs of the mirrors',
            'A diagram of solar panel batteries',
            'Longer descriptions of mirror angles',
          ],
          correctIdx: 0,
          explanation:
            'Giáo viên khuyên bổ sung bảng so sánh tốc độ làm nóng nước lúc 12 giờ trưa và 4 giờ chiều.',
        },
        {
          id: 'cam-mock-3-q5',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Interview)',
          audioScript:
            'Host: What inspired you to paint murals on dull concrete highway pillars? Artist: Commuters spend forty minutes stuck beneath grey concrete every day. Seeing bright kingfishers and wildflowers instead doesn’t fix traffic, of course, yet it softens everyone’s mood before work.',
          question: 'Why does the artist paint nature murals on highway pillars?',
          options: [
            'To reduce rush-hour traffic speeds',
            'To brighten commuters’ daily mood in grey city spaces',
            'To protect concrete pillars from winter rain',
            'To advertise a wildlife sanctuary nearby',
          ],
          correctIdx: 1,
          explanation:
            'Tranh chim bói cá và hoa dại không giải quyết kẹt xe nhưng giúp làm dịu tâm trạng người đi làm mỗi sáng ("softens everyone’s mood").',
        },
        {
          id: 'cam-mock-3-q6',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Attitude)',
          audioScript:
            'Host: Has local graffiti ever damaged your murals? Artist: Surprisingly, almost never! Because teenagers from the neighboring high school helped prime the walls and paint the background leaves, they treat the artwork like their own.',
          question: 'Why have the murals stayed largely undamaged?',
          options: [
            'Security cameras watch the pillars all night.',
            'City police patrol the highway continuously.',
            'Local teenagers helped create them and feel proud of them.',
            'Special waterproof paint washes graffiti off automatically.',
          ],
          correctIdx: 2,
          explanation:
            'Học sinh trung học địa phương cùng tham gia sơn nền và lá cây nên các em coi bức tranh như tài sản chung của mình.',
        },
        {
          id: 'cam-mock-3-q7',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Collocation)',
          question:
            'City planners hope the new pedestrian plaza will _____ a positive impact on small independent cafés.',
          options: ['do', 'give', 'set', 'have'],
          correctIdx: 3,
          explanation:
            'Collocation chuẩn: "have a positive/negative impact on something" (tạo tác động tích cực/tiêu cực lên).',
        },
        {
          id: 'cam-mock-3-q8',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Meaning Precision)',
          question:
            'Even after living abroad for six years, Marcus could still _____ his childhood friends immediately by their laughter.',
          options: ['recognize', 'remind', 'realize', 'remember'],
          correctIdx: 0,
          explanation:
            '"Recognize" = nhận ra ai/cái gì quen thuộc qua giọng nói, tiếng cười hay ngoại hình.',
        },
        {
          id: 'cam-mock-3-q9',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Phrasal Verb)',
          question:
            'Our camping club is trying to _____ up with creative ways to cut down on single-use plastic bottles.',
          options: ['get', 'come', 'catch', 'keep'],
          correctIdx: 1,
          explanation:
            'Cụm động từ "come up with" = nghĩ ra, nảy ra (ý tưởng, giải pháp).',
        },
        {
          id: 'cam-mock-3-q10',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Word Choice)',
          question:
            'Because the coastal path was flooded, hikers had no _____ but to return along the upper forest road.',
          options: ['decision', 'wish', 'choice', 'chance'],
          correctIdx: 2,
          explanation:
            'Thành ngữ cố định: "have no choice but to + V" (không còn lựa chọn nào khác ngoài việc...).',
        },
        {
          id: 'cam-mock-3-q11',
          skill: 'vocab',
          partLabel: 'Use of English Part 3 (Word Formation)',
          question:
            'Transform "RECYCLE": "Sorting clean glass jars separately makes community _____ far more efficient."',
          options: ['recycled', 'recyclable', 'recycle', 'recycling'],
          correctIdx: 3,
          explanation:
            'Sau tính từ "community" cần danh từ chỉ hoạt động -> "recycling" (hoạt động tái chế).',
        },
        {
          id: 'cam-mock-3-q12',
          skill: 'vocab',
          partLabel: 'Use of English Part 3 (Word Formation)',
          question:
            'Transform "SUCCEED": "Thanks to three months of careful rehearsals, the charity concert was a huge _____."',
          options: ['success', 'successful', 'successfully', 'succeeding'],
          correctIdx: 0,
          explanation:
            'Sau mạo từ và tính từ "a huge" cần danh từ -> "success" (một thành công lớn).',
        },
        {
          id: 'cam-mock-3-q13',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Verb + Prep)',
          question:
            'Every member of the eco-council strongly _____ of banning disposable cups inside the school building.',
          options: ['agrees', 'approves', 'accepts', 'allows'],
          correctIdx: 1,
          explanation:
            'Chỉ có "approve" đi với giới từ "of" ("approve of + V-ing" = tán thành, ủng hộ việc gì).',
        },
        {
          id: 'cam-mock-3-q14',
          skill: 'grammar',
          partLabel: 'Use of English Part 2 (Open Cloze)',
          question:
            'Complete with ONE word: "_____ of the heavy afternoon rain, more than two hundred runners finished the charity fun run."',
          options: ['Although', 'Despite', 'In spite', 'However'],
          correctIdx: 2,
          explanation:
            'Có giới từ "of" đứng ngay sau chỗ trống -> chỉ dùng được "In spite of" ("Despite" không đi với "of").',
        },
        {
          id: 'cam-mock-3-q15',
          skill: 'grammar',
          partLabel: 'Use of English Part 2 (Open Cloze)',
          question:
            'Complete with ONE word: "Rarely _____ students have the opportunity to interview an oceanographer face to face."',
          options: ['did', 'are', 'have', 'do'],
          correctIdx: 3,
          explanation:
            'Đảo ngữ với trạng từ phủ định "Rarely" ở hiện tại đơn cùng động từ thường "have" -> dùng trợ động từ "do".',
        },
        {
          id: 'cam-mock-3-q16',
          skill: 'grammar',
          partLabel: 'Use of English Part 4 (Key Word Transformation)',
          question:
            '"Someone should repair the broken fountain before the festival opens." (BE) → "The broken fountain _____ before the festival opens."',
          options: [
            'should be repaired',
            'should repaired',
            'is being repaired',
            'has to repairing',
          ],
          correctIdx: 0,
          explanation:
            'Bị động với động từ khuyết thiếu "should": "should be + V3/ed" ("should be repaired").',
        },
        {
          id: 'cam-mock-3-q17',
          skill: 'grammar',
          partLabel: 'FCE Grammar (Relative Clause)',
          question:
            'The community orchard, _____ trees were planted by local schoolchildren, now supplies apples to four shelters.',
          options: ['which', 'whose', 'that', 'whom'],
          correctIdx: 1,
          explanation:
            'Mệnh đề quan hệ sở hữu ("trees of the orchard") -> dùng đại từ quan hệ "whose".',
        },
        {
          id: 'cam-mock-3-q18',
          skill: 'grammar',
          partLabel: 'FCE Grammar (Reported Speech)',
          question:
            'The park ranger reminded visitors _____ too close to the nesting seabirds along the cliff.',
          options: [
            'don’t walk',
            'not walking',
            'not to walk',
            'to not walking',
          ],
          correctIdx: 2,
          explanation:
            'Cấu trúc tường thuật lời nhắc nhở: "remind someone (not) to + V nguyên mẫu".',
        },
        {
          id: 'cam-mock-3-q19',
          skill: 'grammar',
          partLabel: 'Use of English Part 4 (Key Word Transformation)',
          question:
            '"I regret not learning to play the cello when I was younger." (WISH) → "I _____ to play the cello when I was younger."',
          options: [
            'wish I learned',
            'wish I would learn',
            'wish learning',
            'wish I had learned',
          ],
          correctIdx: 3,
          explanation:
            'Tiếc nuối điều đã không làm trong quá khứ ("when I was younger") -> dùng "wish + S + had + V3/ed".',
        },
        {
          id: 'cam-mock-3-q20',
          skill: 'grammar',
          partLabel: 'FCE Grammar (Participle Clause)',
          question:
            '_____ from the hillside viewpoint, the winding river looks like a silver ribbon cutting through the valley.',
          options: ['Seen', 'Seeing', 'Having see', 'To seeing'],
          correctIdx: 0,
          explanation:
            'Mệnh đề phân từ mang nghĩa bị động ("the winding river is seen from...") -> dùng quá khứ phân từ "Seen".',
        },
        {
          id: 'cam-mock-3-q21',
          skill: 'reading',
          partLabel: 'Reading Notice',
          passage:
            'BOTANICAL GARDEN GREENHOUSE:\nPlease keep glass doors shut behind you to protect tropical orchids from sudden cold drafts. Tripod photography is permitted on Tuesday mornings only.',
          question: 'When are visitors allowed to use camera tripods inside the greenhouse?',
          options: [
            'Any weekday afternoon',
            'Only on Tuesday mornings',
            'Throughout the entire weekend',
            'Only when the doors are open',
          ],
          correctIdx: 1,
          explanation:
            'Chụp ảnh dùng chân máy (tripod) chỉ được phép vào sáng thứ Ba ("on Tuesday mornings only").',
        },
        {
          id: 'cam-mock-3-q22',
          skill: 'reading',
          partLabel: 'Reading Passage (Q22–Q25)',
          passage:
            'When an abandoned railway line through Westbridge stood overgrown with weeds for twenty years, city officials debated paving it into an extra car lane. Instead, retired botanist Clara Vance persuaded residents to map every wildflower already growing along the rusty tracks. Her survey revealed forty-two native plant species supporting rare butterflies.\n\nArmed with that evidence, neighbors raised grants to build a raised timber walkway curving gently above the meadow. Today, commuters pedal along the elevated path on weekdays while biology classes use wooden viewing platforms on Friday mornings—proving that old industrial corridors can become living classrooms without erasing their history.',
          question: 'What was city officials’ original idea for the old railway line?',
          options: [
            'Turning it into an indoor butterfly museum',
            'Reopening it for fast commuter trains',
            'Paving it to create an additional road lane for cars',
            'Selling the rusty tracks to a timber company',
          ],
          correctIdx: 2,
          explanation:
            'Ban đầu chính quyền tranh luận việc trải nhựa biến đường ray cũ thành làn đường cho ô tô ("paving it into an extra car lane").',
        },
        {
          id: 'cam-mock-3-q23',
          skill: 'reading',
          partLabel: 'Reading Passage (Q22–Q25)',
          passage:
            'When an abandoned railway line through Westbridge stood overgrown with weeds for twenty years, city officials debated paving it into an extra car lane. Instead, retired botanist Clara Vance persuaded residents to map every wildflower already growing along the rusty tracks. Her survey revealed forty-two native plant species supporting rare butterflies.\n\nArmed with that evidence, neighbors raised grants to build a raised timber walkway curving gently above the meadow. Today, commuters pedal along the elevated path on weekdays while biology classes use wooden viewing platforms on Friday mornings—proving that old industrial corridors can become living classrooms without erasing their history.',
          question: 'How did Clara Vance convince the town to protect the area?',
          options: [
            'She bought the land using her own retirement savings.',
            'She threatened to close nearby city schools.',
            'She planted forty-two imported flowers along the road.',
            'She documented native plants and rare butterflies already thriving there.',
          ],
          correctIdx: 3,
          explanation:
            'Khảo sát của bà ghi nhận 42 loài thực vật bản địa nuôi dưỡng các loài bướm quý hiếm, làm bằng chứng thuyết phục cộng đồng.',
        },
        {
          id: 'cam-mock-3-q24',
          skill: 'reading',
          partLabel: 'Reading Passage (Q22–Q25)',
          passage:
            'When an abandoned railway line through Westbridge stood overgrown with weeds for twenty years, city officials debated paving it into an extra car lane. Instead, retired botanist Clara Vance persuaded residents to map every wildflower already growing along the rusty tracks. Her survey revealed forty-two native plant species supporting rare butterflies.\n\nArmed with that evidence, neighbors raised grants to build a raised timber walkway curving gently above the meadow. Today, commuters pedal along the elevated path on weekdays while biology classes use wooden viewing platforms on Friday mornings—proving that old industrial corridors can become living classrooms without erasing their history.',
          question: 'Why was the new timber walkway built above the meadow rather than on the ground?',
          options: [
            'To let people travel and study nature without trampling the wildflowers',
            'To keep cyclists away from Friday morning biology students',
            'To make room for passenger trains to run underneath',
            'To protect commuters from heavy summer flooding',
          ],
          correctIdx: 0,
          explanation:
            'Lối đi gỗ nâng cao uốn lượn phía trên đồng cỏ giúp người đi lại và học sinh quan sát mà không giẫm hỏng hệ thực vật bên dưới.',
        },
        {
          id: 'cam-mock-3-q25',
          skill: 'reading',
          partLabel: 'Reading Passage (Q22–Q25)',
          passage:
            'When an abandoned railway line through Westbridge stood overgrown with weeds for twenty years, city officials debated paving it into an extra car lane. Instead, retired botanist Clara Vance persuaded residents to map every wildflower already growing along the rusty tracks. Her survey revealed forty-two native plant species supporting rare butterflies.\n\nArmed with that evidence, neighbors raised grants to build a raised timber walkway curving gently above the meadow. Today, commuters pedal along the elevated path on weekdays while biology classes use wooden viewing platforms on Friday mornings—proving that old industrial corridors can become living classrooms without erasing their history.',
          question: 'What does "living classrooms" refer to in the final sentence?',
          options: [
            'Indoor school rooms decorated with plant posters',
            'Outdoor spaces where students observe real ecosystems directly',
            'Online courses about railway engineering history',
            'Timber workshops where volunteers build furniture',
          ],
          correctIdx: 1,
          explanation:
            '"Living classrooms" chỉ không gian thực tế ngoài trời nơi các tiết Sinh học học trực tiếp từ thiên nhiên.',
        },
      ],
    },

    {
      title: 'Mini Mock Test #4',
      description:
        'Đề thi thử #4 chuẩn FCE (B2 First): Trọng tâm Use of English Parts 1–4, Công nghệ & Truyền thông (25 câu).',
      durationMinutes: 30,
      questions: [
        {
          id: 'cam-mock-4-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Tech Support)',
          audioScript:
            'Caller: My laptop microphone stops working whenever I join video calls, though it records voice memos fine. Advisor: Usually that means your browser blocked permission after an update—check the padlock icon beside the web address before reinstalling any drivers.',
          question: 'What does the advisor recommend doing first?',
          options: [
            'Reinstalling all audio drivers immediately',
            'Sending the laptop in for hardware repair',
            'Checking browser microphone permissions via the padlock icon',
            'Recording calls using the voice memo app instead',
          ],
          correctIdx: 2,
          explanation:
            'Nhân viên khuyên kiểm tra quyền micro ở biểu tượng ổ khóa trên trình duyệt trước khi cài lại driver.',
        },
        {
          id: 'cam-mock-4-q2',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Podcast Clip)',
          audioScript:
            'Speaker: Many teenagers think turning off phone notifications at night is enough for deep sleep. Yet checking bright screens right before bed tricks the brain into delaying rest, so leaving the charger outside the bedroom makes a far bigger difference.',
          question: 'What does the speaker believe improves sleep quality most?',
          options: [
            'Muting message notifications only',
            'Turning screen brightness down to half',
            'Listening to podcasts until midnight',
            'Charging the phone in another room overnight',
          ],
          correctIdx: 3,
          explanation:
            'Đặt bộ sạc bên ngoài phòng ngủ ("leaving the charger outside the bedroom") tạo khác biệt lớn nhất.',
        },
        {
          id: 'cam-mock-4-q3',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Student Discussion)',
          audioScript:
            'Eva: How are people reacting to our school radio show? Sam: Listeners love the local band interviews, though several mentioned the background music plays a touch too loudly whenever we read sports results.',
          question: 'What improvement did listeners suggest for the radio show?',
          options: [
            'Lowering background music volume during sports news',
            'Cutting out the local band interviews',
            'Adding longer sports summaries',
            'Broadcasting the show earlier in the morning',
          ],
          correctIdx: 0,
          explanation:
            'Thính giả góp ý nhạc nền hơi to khi hai bạn đọc tin thể thao ("plays a touch too loudly").',
        },
        {
          id: 'cam-mock-4-q4',
          skill: 'listening',
          partLabel: 'Listening Part 4 (App Designer Interview)',
          audioScript:
            'Host: Why did your team delete half the buttons from your language-flashcard app? Designer: When users opened version one, they spent ten minutes tweaking fonts and colors instead of reviewing words! Removing extra menus doubled daily study completion within a month.',
          question: 'Why did the designer simplify the flashcard app’s interface?',
          options: [
            'To reduce mobile data usage for travelers',
            'To stop extra settings from distracting learners from studying',
            'Because older smartphones could not display colorful fonts',
            'To copy a competing flashcard application',
          ],
          correctIdx: 1,
          explanation:
            'Người dùng mải chỉnh phông chữ và màu sắc thay vì ôn từ vựng, nên lược bỏ menu giúp tăng gấp đôi tỷ lệ học xong.',
        },
        {
          id: 'cam-mock-4-q5',
          skill: 'listening',
          partLabel: 'Listening Part 4 (User Feedback)',
          audioScript:
            'Host: Did anyone complain after you removed those customization themes? Designer: A handful of longtime users missed the neon background at first, yet nearly all of them admitted their weekly vocabulary scores climbed once they stopped fiddling with settings.',
          question: 'How did longtime users eventually feel about the simpler design?',
          options: [
            'They stopped using the app permanently.',
            'They demanded an immediate return of neon themes.',
            'Most noticed better vocabulary results despite initial hesitation.',
            'They felt the app had become harder to read.',
          ],
          correctIdx: 2,
          explanation:
            'Ban đầu vài người tiếc nền neon nhưng hầu hết thừa nhận điểm từ vựng hàng tuần tăng lên rõ rệt.',
        },
        {
          id: 'cam-mock-4-q6',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Conference Announcement)',
          audioScript:
            'Organizer: Due to overwhelming sign-ups for Dr. Patel’s robotics talk, we have swapped rooms with the design workshop. Robotics will now be in Auditorium B upstairs, while design moves to Seminar Room 3.',
          question: 'Where will Dr. Patel’s robotics talk take place?',
          options: [
            'Seminar Room 3',
            'The ground-floor lobby',
            'The design workshop studio',
            'Auditorium B upstairs',
          ],
          correctIdx: 3,
          explanation:
            'Buổi nói chuyện Robotics chuyển lên Hội trường B trên lầu ("Auditorium B upstairs").',
        },
        {
          id: 'cam-mock-4-q7',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (FCE Collocation)',
          question:
            'Journalists should always verify statistics from two independent sources before jumping to _____ in print.',
          options: ['conclusions', 'decisions', 'opinions', 'results'],
          correctIdx: 0,
          explanation:
            'Thành ngữ FCE chuẩn: "jump to conclusions" (vội vàng đưa ra kết luận khi chưa đủ bằng chứng).',
        },
        {
          id: 'cam-mock-4-q8',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (FCE Phrasal Verb)',
          question:
            'Because the rural town suffered frequent power cuts, engineers decided to _____ out a small backup wind grid.',
          options: ['make', 'try', 'keep', 'turn'],
          correctIdx: 1,
          explanation:
            '"Try out" = thử nghiệm mô hình hoặc thiết bị mới để xem hiệu quả.',
        },
        {
          id: 'cam-mock-4-q9',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Word Precision)',
          question:
            'The new smartwatch features a scratch-resistant screen, which _____ it apart from cheaper models.',
          options: ['puts', 'keeps', 'sets', 'brings'],
          correctIdx: 2,
          explanation:
            'Cụm động từ FCE: "set something apart from..." (làm cái gì trở nên nổi bật, khác biệt hẳn so với...).',
        },
        {
          id: 'cam-mock-4-q10',
          skill: 'vocab',
          partLabel: 'Use of English Part 3 (Word Formation)',
          question:
            'Transform "ACCURATE": "Weather satellites have improved forecast _____ significantly over the past decade."',
          options: ['accurate', 'accurately', 'inaccurate', 'accuracy'],
          correctIdx: 3,
          explanation:
            'Cụm danh từ "forecast accuracy" (độ chính xác của dự báo) làm tân ngữ cho "improved".',
        },
        {
          id: 'cam-mock-4-q11',
          skill: 'vocab',
          partLabel: 'Use of English Part 3 (Negative Prefix)',
          question:
            'Transform "ADVANTAGE": "Slow rural broadband puts home-based learners at a clear _____ during live exams."',
          options: ['disadvantage', 'advantageous', 'advantaged', 'disadvantageous'],
          correctIdx: 0,
          explanation:
            'Sau mạo từ + tính từ "a clear" cần danh từ mang nghĩa tiêu cực -> "disadvantage" (bất lợi).',
        },
        {
          id: 'cam-mock-4-q12',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Collocation)',
          question:
            'Online reviews can sometimes be misleading, so it is wise to _____ them with a pinch of salt.',
          options: ['bring', 'take', 'make', 'hold'],
          correctIdx: 1,
          explanation:
            'Thành ngữ FCE: "take something with a pinch of salt" (đón nhận thông tin một cách thận trọng, không tin tuyệt đối).',
        },
        {
          id: 'cam-mock-4-q13',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Vocab)',
          question:
            'Software developers spent three weekends fixing a minor coding bug that had _____ undetected for months.',
          options: ['kept', 'made', 'gone', 'stayed'],
          correctIdx: 2,
          explanation:
            'Collocation tự nhiên chuẩn B2: "go undetected / unnoticed" (không bị phát hiện).',
        },
        {
          id: 'cam-mock-4-q14',
          skill: 'grammar',
          partLabel: 'Use of English Part 2 (Open Cloze)',
          question:
            'Complete with ONE word: "No sooner had the programmer uploaded the patch _____ users reported faster loading speeds."',
          options: ['when', 'while', 'as', 'than'],
          correctIdx: 3,
          explanation:
            'Đảo ngữ "No sooner had + S + V3 ... than + S + V2" (vừa mới... thì...).',
        },
        {
          id: 'cam-mock-4-q15',
          skill: 'grammar',
          partLabel: 'Use of English Part 2 (Open Cloze)',
          question:
            'Complete with ONE word: "Electric buses are quiet, reliable, and—above _____—far cleaner for crowded city centers."',
          options: ['all', 'everything', 'most', 'top'],
          correctIdx: 0,
          explanation:
            'Cụm liên kết FCE cố định: "above all" (quan trọng hơn hết là).',
        },
        {
          id: 'cam-mock-4-q16',
          skill: 'grammar',
          partLabel: 'Use of English Part 4 (Key Word Transformation)',
          question:
            '"It is possible that Mia left her tablet on the library desk." (MIGHT) → "Mia _____ her tablet on the library desk."',
          options: [
            'might leave',
            'might have left',
            'might be leaving',
            'might had left',
          ],
          correctIdx: 1,
          explanation:
            'Suy đoán khả năng đã xảy ra trong quá khứ: "might have + V3/ed" ("might have left").',
        },
        {
          id: 'cam-mock-4-q17',
          skill: 'grammar',
          partLabel: 'Use of English Part 4 (Key Word Transformation)',
          question:
            '"People say that this tiny island inspired several classic novels." (SAID) → "This tiny island _____ several classic novels."',
          options: [
            'is said inspiring',
            'was said to inspiring',
            'is said to have inspired',
            'said to have inspired',
          ],
          correctIdx: 2,
          explanation:
            'Bị động tường thuật với sự việc quá khứ ("inspired"): "is said to have + V3/ed".',
        },
        {
          id: 'cam-mock-4-q18',
          skill: 'grammar',
          partLabel: 'FCE Grammar (Prefer / Rather)',
          question:
            'I’d rather you _____ photos of my unfinished painting before the art exhibition opens.',
          options: [
            'don’t share',
            'not to share',
            'won’t share',
            'didn’t share',
          ],
          correctIdx: 3,
          explanation:
            'Cấu trúc "would rather + S + V2/didn’t V" khi muốn người khác làm/không làm điều gì ở hiện tại hoặc tương lai.',
        },
        {
          id: 'cam-mock-4-q19',
          skill: 'grammar',
          partLabel: 'Use of English Part 2 (Preposition)',
          question:
            'Complete with ONE word: "The documentary succeeded _____ showing how small towns adapt to renewable energy."',
          options: ['in', 'on', 'at', 'with'],
          correctIdx: 0,
          explanation:
            'Động từ "succeed" luôn đi với giới từ "in" + V-ing ("succeed in showing").',
        },
        {
          id: 'cam-mock-4-q20',
          skill: 'grammar',
          partLabel: 'FCE Grammar (Mixed Conditional)',
          question:
            'If Ethan had backed up his dissertation last Friday, he _____ panicking about the broken hard drive right now.',
          options: [
            'won’t be',
            'wouldn’t be',
            'wouldn’t have been',
            'isn’t',
          ],
          correctIdx: 1,
          explanation:
            'Điều kiện hỗn hợp (3 + 2): giả thiết trái quá khứ ("had backed up") dẫn tới kết quả trái hiện tại ("wouldn’t be panicking right now").',
        },
        {
          id: 'cam-mock-4-q21',
          skill: 'reading',
          partLabel: 'Reading (Notice)',
          passage:
            'TECH LAB POLICY:\nFood and open drinks are strictly banned near 3D printers. Students must sign the safety log before running any print lasting longer than two hours.',
          question: 'When must a student sign the safety log?',
          options: [
            'Every time they bring bottled water into the room',
            'Only after a 3D print finishes',
            'Before starting a print job over two hours long',
            'Whenever a teacher is absent from the lab',
          ],
          correctIdx: 2,
          explanation:
            'Học sinh phải ký sổ an toàn trước khi chạy lệnh in kéo dài hơn 2 tiếng ("before running any print lasting longer than two hours").',
        },
        {
          id: 'cam-mock-4-q22',
          skill: 'reading',
          partLabel: 'Reading (FCE Passage Q22–Q25)',
          passage:
            'For decades, public libraries were stereotyped as silent rooms lined solely with paper books. Today, however, many neighborhood libraries lend out far more than novels. Depending on the town, cardholders can borrow sewing machines, cake pans, thermal cameras for spotting drafty windows, or portable microscopes for weekend nature walks.\n\nCritics initially questioned whether managing tools would distract librarians from literacy programs. Yet branch directors report the opposite: parents who walk in to borrow a carpet cleaner often leave with picture books for their toddlers, while teenagers testing a loaned guitar frequently sign up for music-history clubs. By treating practical objects as shared community knowledge, these "libraries of things" keep closets uncluttered and welcome residents who rarely entered traditional reading rooms.',
          question: 'Why might a homeowner borrow a thermal camera from a modern library?',
          options: [
            'To photograph rare birds during weekend walks',
            'To check where cold air is leaking into their house',
            'To record short films for a school media project',
            'To test whether a sewing machine is overheating',
          ],
          correctIdx: 1,
          explanation:
            'Camera tầm nhiệt được mượn để phát hiện cửa sổ bị lọt gió lạnh ("spotting drafty windows").',
        },
        {
          id: 'cam-mock-4-q23',
          skill: 'reading',
          partLabel: 'Reading (FCE Passage Q22–Q25)',
          passage:
            'For decades, public libraries were stereotyped as silent rooms lined solely with paper books. Today, however, many neighborhood libraries lend out far more than novels. Depending on the town, cardholders can borrow sewing machines, cake pans, thermal cameras for spotting drafty windows, or portable microscopes for weekend nature walks.\n\nCritics initially questioned whether managing tools would distract librarians from literacy programs. Yet branch directors report the opposite: parents who walk in to borrow a carpet cleaner often leave with picture books for their toddlers, while teenagers testing a loaned guitar frequently sign up for music-history clubs. By treating practical objects as shared community knowledge, these "libraries of things" keep closets uncluttered and welcome residents who rarely entered traditional reading rooms.',
          question: 'What did critics worry might happen when libraries started lending tools?',
          options: [
            'Residents would steal expensive sewing machines.',
            'Book shelves would have to be sold for space.',
            'Librarians would have less time or focus for reading programs.',
            'Teenagers would play loud guitars inside quiet reading halls.',
          ],
          correctIdx: 2,
          explanation:
            'Những người phản đối lo rằng quản lý dụng cụ sẽ khiến thủ thư xao nhãng các chương trình khuyến đọc ("distract librarians from literacy programs").',
        },
        {
          id: 'cam-mock-4-q24',
          skill: 'reading',
          partLabel: 'Reading (FCE Passage Q22–Q25)',
          passage:
            'For decades, public libraries were stereotyped as silent rooms lined solely with paper books. Today, however, many neighborhood libraries lend out far more than novels. Depending on the town, cardholders can borrow sewing machines, cake pans, thermal cameras for spotting drafty windows, or portable microscopes for weekend nature walks.\n\nCritics initially questioned whether managing tools would distract librarians from literacy programs. Yet branch directors report the opposite: parents who walk in to borrow a carpet cleaner often leave with picture books for their toddlers, while teenagers testing a loaned guitar frequently sign up for music-history clubs. By treating practical objects as shared community knowledge, these "libraries of things" keep closets uncluttered and welcome residents who rarely entered traditional reading rooms.',
          question: 'According to branch directors, what unexpected benefit has occurred?',
          options: [
            'People borrowing household items often begin using books and clubs too.',
            'Traditional reading rooms have completely disappeared.',
            'Tool rentals have replaced all government library funding.',
            'Parents stopped buying toys for young children.',
          ],
          correctIdx: 0,
          explanation:
            'Khách vào mượn máy giặt thảm hay đàn guitar thường mượn thêm sách tranh hoặc tham gia câu lạc bộ của thư viện.',
        },
        {
          id: 'cam-mock-4-q25',
          skill: 'reading',
          partLabel: 'Reading (FCE Passage Q22–Q25)',
          passage:
            'For decades, public libraries were stereotyped as silent rooms lined solely with paper books. Today, however, many neighborhood libraries lend out far more than novels. Depending on the town, cardholders can borrow sewing machines, cake pans, thermal cameras for spotting drafty windows, or portable microscopes for weekend nature walks.\n\nCritics initially questioned whether managing tools would distract librarians from literacy programs. Yet branch directors report the opposite: parents who walk in to borrow a carpet cleaner often leave with picture books for their toddlers, while teenagers testing a loaned guitar frequently sign up for music-history clubs. By treating practical objects as shared community knowledge, these "libraries of things" keep closets uncluttered and welcome residents who rarely entered traditional reading rooms.',
          question: 'Which phrase best summarizes the writer’s view of "libraries of things"?',
          options: [
            'An outdated experiment that fails to attract new visitors',
            'A temporary trend limited to big university towns',
            'A noisy distraction from serious academic research',
            'A clever way to reduce clutter while drawing wider communities into libraries',
          ],
          correctIdx: 3,
          explanation:
            'Bài viết đánh giá mô hình này giúp giảm bừa bộn đồ đạc ít dùng và thu hút những người vốn ít khi bước vào thư viện truyền thống.',
        },
      ],
    },

    {
      title: 'Mini Mock Test #5',
      description:
        'Đề thi thử #5 thử thách FCE (B2 First / C1 Stretch): Văn hóa, Lịch sử, Khoa học & Suy luận nâng cao (25 câu).',
      durationMinutes: 30,
      questions: [
        {
          id: 'cam-mock-5-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Museum Audio)',
          audioScript:
            'Guide: Although many assume medieval spice merchants traveled mainly by land, this map reveals how heavily coastal cities relied on seasonal wind patterns across the Indian Ocean to time return voyages.',
          question: 'What does the map demonstrate about medieval spice trade?',
          options: [
            'Merchants avoided sailing on the Indian Ocean.',
            'Overland routes were faster than sea voyages.',
            'Traders depended on seasonal winds for round-trip sea journeys.',
            'Spices were grown mostly inside coastal cities.',
          ],
          correctIdx: 2,
          explanation:
            'Bản đồ cho thấy các thành phố ven biển phụ thuộc mạnh vào gió mùa để tính thời điểm chuyến đi về ("relied on seasonal wind patterns").',
        },
        {
          id: 'cam-mock-5-q2',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Lecture Extract)',
          audioScript:
            'Lecturer: Unlike modern synthetic dyes that fade unevenly under strong sunlight, ancient indigo pigments bind tightly inside natural cotton fibers—which explains why five-hundred-year-old fragments still retain a remarkably deep blue.',
          question: 'Why have ancient indigo fabrics kept their blue color for centuries?',
          options: [
            'They were stored in dark underwater caves.',
            'Modern museums repaint them every decade.',
            'Sunlight makes ancient indigo brighter over time.',
            'The pigment bonds strongly within natural cotton threads.',
          ],
          correctIdx: 3,
          explanation:
            'Sắc tố chàm tự nhiên bám chặt vào bên trong sợi bông ("bind tightly inside natural cotton fibers").',
        },
        {
          id: 'cam-mock-5-q3',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Debate)',
          audioScript:
            'Host: Dr. Lin, should rare historical letters be digitized and locked away forever? Dr. Lin: Scanning high-resolution copies certainly protects fragile ink from light, yet letting students occasionally view real parchment in supervised rooms sparks a curiosity no screen can match.',
          question: 'What is Dr. Lin’s opinion on viewing real historical documents?',
          options: [
            'Controlled access to originals inspires students in ways digital scans cannot.',
            'Original letters should never leave underground vaults.',
            'High-resolution scans are completely unnecessary.',
            'Students should be allowed to borrow rare letters overnight.',
          ],
          correctIdx: 0,
          explanation:
            'Quét số giúp bảo vệ mực cổ, nhưng việc cho học sinh quan sát giấy da thật có giám sát khơi dậy hứng thú mà màn hình không thay thế được.',
        },
        {
          id: 'cam-mock-5-q4',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Astronomer Interview)',
          audioScript:
            'Host: What led you from studying civil engineering to becoming an observatory astronomer? Astronomer: Designing bridges taught me patience with measurements, yet one winter night peering through a friend’s backyard telescope at Saturn’s rings shifted my curiosity upward for good.',
          question: 'What prompted the speaker to change careers to astronomy?',
          options: [
            'Civil engineering jobs became scarce.',
            'Seeing Saturn through a friend’s telescope.',
            'Winning a university bridge-design prize.',
            'Reading a childhood book about bridges.',
          ],
          correctIdx: 1,
          explanation:
            'Một đêm mùa đông nhìn thấy vành đai sao Thổ qua kính thiên văn nhà bạn đã khiến cô chuyển hướng hẳn sang thiên văn.',
        },
        {
          id: 'cam-mock-5-q5',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Challenge)',
          audioScript:
            'Host: What is the least glamorous part of observatory life? Astronomer: Movies show astronomers gazing romantically at stars all night, whereas we spend ninety percent of our shift analyzing spreadsheets of faint light curves inside a chilly control room.',
          question: 'What misconception about astronomers does the speaker correct?',
          options: [
            'They work only during sunny summer months.',
            'They spend most of their time building telescopes.',
            'Their work is mostly computer data analysis rather than stargazing.',
            'Observatory control rooms are uncomfortably hot.',
          ],
          correctIdx: 2,
          explanation:
            '90% thời gian làm việc là phân tích bảng dữ liệu đường cong ánh sáng trong phòng điều khiển lạnh chứ không phải ngắm sao lãng mạn.',
        },
        {
          id: 'cam-mock-5-q6',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Workshop Info)',
          audioScript:
            'Coordinator: Welcome to our traditional paper-marbling studio! Before dipping your paper into the tray, remember to drop only three colors onto the water—adding five or six usually turns the pattern muddy brown.',
          question: 'Why does the coordinator limit beginners to three paint colors?',
          options: [
            'The studio is running low on paint supplies.',
            'Three colors dry twice as fast on thick paper.',
            'Extra colors are reserved for weekend classes.',
            'Using too many colors ruins the clarity of the pattern.',
          ],
          correctIdx: 3,
          explanation:
            'Dùng 5–6 màu sẽ làm hoa văn bị đục nâu ("turns the pattern muddy brown").',
        },
        {
          id: 'cam-mock-5-q7',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (FCE Idiom)',
          question:
            'After two weeks of cloudy skies, the sudden clear night came as a blessing in _____ for the meteor watchers.',
          options: ['disguise', 'secret', 'shadow', 'cover'],
          correctIdx: 0,
          explanation:
            'Thành ngữ FCE: "a blessing in disguise" (trong cái rủi có cái may).',
        },
        {
          id: 'cam-mock-5-q8',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Collocation)',
          question:
            'Although the ancient stone inscription was worn away, linguists managed to _____ light on its original meaning.',
          options: ['pour', 'shed', 'drop', 'flash'],
          correctIdx: 1,
          explanation:
            'Collocation học thuật chuẩn FCE: "shed light on something" (làm sáng tỏ vấn đề gì).',
        },
        {
          id: 'cam-mock-5-q9',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Phrasal Verb)',
          question:
            'Archaeologists had to _____ off digging in the northern trench when unexpected spring floods filled the site.',
          options: ['turn', 'take', 'call', 'make'],
          correctIdx: 2,
          explanation:
            'Phrasal verb "call off" = hủy bỏ hoàn toàn (một sự kiện hoặc hoạt động đã lên kế hoạch).',
        },
        {
          id: 'cam-mock-5-q10',
          skill: 'vocab',
          partLabel: 'Use of English Part 3 (Word Formation)',
          question:
            'Transform "DISCOVER": "A team of marine biologists announced the _____ of a glowing deep-sea coral reef."',
          options: ['discover', 'discovering', 'discoverable', 'discovery'],
          correctIdx: 3,
          explanation:
            'Sau mạo từ "the" và trước giới từ "of" cần danh từ -> "discovery" (sự phát hiện, khám phá).',
        },
        {
          id: 'cam-mock-5-q11',
          skill: 'vocab',
          partLabel: 'Use of English Part 3 (Word Formation)',
          question:
            'Transform "SIGNIFY": "Adjusting the telescope mirror by half a millimeter made a _____ difference to image sharpness."',
          options: ['significant', 'significantly', 'significance', 'insignificant'],
          correctIdx: 0,
          explanation:
            'Trước danh từ "difference" cần tính từ mang nghĩa tích cực/rõ rệt -> "significant".',
        },
        {
          id: 'cam-mock-5-q12',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Vocab)',
          question:
            'During the volcanic eruption drill, students calmly followed every instruction without any sign of _____.',
          options: ['worry', 'panic', 'hurry', 'afraid'],
          correctIdx: 1,
          explanation:
            'Cụm danh từ tự nhiên: "without any sign of panic" (không hề có dấu hiệu hoảng loạn).',
        },
        {
          id: 'cam-mock-5-q13',
          skill: 'vocab',
          partLabel: 'Use of English Part 1 (Confusable Words)',
          question:
            'The museum’s newest wing was designed to _____ natural daylight while blocking harmful ultraviolet rays.',
          options: ['let', 'allow', 'admit', 'bring'],
          correctIdx: 2,
          explanation:
            '"Admit" (nghĩa trang trọng/kỹ thuật) = cho phép ánh sáng, không khí đi vào ("admit natural daylight").',
        },
        {
          id: 'cam-mock-5-q14',
          skill: 'grammar',
          partLabel: 'Use of English Part 2 (Open Cloze)',
          question:
            'Complete with ONE word: "Little _____ the young sailor realize that his diary would become a famous historical record."',
          options: ['had', 'was', 'has', 'did'],
          correctIdx: 3,
          explanation:
            'Đảo ngữ quá khứ đơn với từ phủ định "Little": "Little + did + S + V nguyên mẫu".',
        },
        {
          id: 'cam-mock-5-q15',
          skill: 'grammar',
          partLabel: 'Use of English Part 2 (Open Cloze)',
          question:
            'Complete with ONE word: "The mountain expedition went ahead smoothly, _____ spite of freezing morning fog."',
          options: ['in', 'by', 'with', 'for'],
          correctIdx: 0,
          explanation:
            'Cụm giới từ nhượng bộ cố định: "in spite of + cụm danh từ".',
        },
        {
          id: 'cam-mock-5-q16',
          skill: 'grammar',
          partLabel: 'Use of English Part 4 (Key Word Transformation)',
          question:
            '"I last visited the National Science Museum five years ago." (BEEN) → "I _____ the National Science Museum for five years."',
          options: [
            'didn’t go to',
            'haven’t been to',
            'hadn’t been in',
            'am not at',
          ],
          correctIdx: 1,
          explanation:
            'Chuyển từ quá khứ đơn ("last visited... ago") sang hiện tại hoàn thành phủ định ("haven’t been to... for five years").',
        },
        {
          id: 'cam-mock-5-q17',
          skill: 'grammar',
          partLabel: 'FCE Grammar (Modals of Deduction)',
          question:
            'That carved wooden mask _____ have belonged to a 19th-century theater troupe—records confirm the troupe only used painted clay.',
          options: ['must', 'might', 'can’t', 'should'],
          correctIdx: 2,
          explanation:
            'Phủ định chắc chắn dựa trên bằng chứng đối chiếu trong quá khứ: "can’t have + V3/ed" (chắc chắn không thể đã...).',
        },
        {
          id: 'cam-mock-5-q18',
          skill: 'grammar',
          partLabel: 'Use of English Part 4 (Key Word Transformation)',
          question:
            '"It is a waste of time arguing over which route is shorter." (POINT) → "There is _____ over which route is shorter."',
          options: [
            'no point to argue',
            'not point arguing',
            'none point in argue',
            'no point in arguing',
          ],
          correctIdx: 3,
          explanation:
            'Cấu trúc FCE kinh điển: "There is no point (in) + V-ing" (chẳng ích gì khi làm...).',
        },
        {
          id: 'cam-mock-5-q19',
          skill: 'grammar',
          partLabel: 'FCE Grammar (Cleft Sentence)',
          question:
            'It was only after chemists examined the ink under ultraviolet light _____ the hidden signature became visible.',
          options: ['that', 'when', 'which', 'what'],
          correctIdx: 0,
          explanation:
            'Câu chẻ nhấn mạnh thời điểm: "It was only after... that + mệnh đề".',
        },
        {
          id: 'cam-mock-5-q20',
          skill: 'grammar',
          partLabel: 'FCE Grammar (Subjunctive / Suggest)',
          question:
            'The conservation board recommended that every visiting hiker _____ all food wrappers back down the trail.',
          options: ['carries', 'carry', 'carried', 'to carry'],
          correctIdx: 1,
          explanation:
            'Thức giả định sau "recommend that + S + V nguyên mẫu (không chia)": "...every visiting hiker carry...".',
        },
        {
          id: 'cam-mock-5-q21',
          skill: 'reading',
          partLabel: 'Reading (Notice)',
          passage:
            'PLANETARIUM DOME:\nOnce the star show begins and lights dim, latecomers cannot enter until the interval for safety reasons. Please turn off smartwatches as well as phones.',
          question: 'Why are latecomers kept outside after the show starts?',
          options: [
            'Tickets expire ten minutes before the show.',
            'Smartwatches block the dome projector.',
            'Entering the darkened room could cause accidents.',
            'The dome seats only twenty visitors per session.',
          ],
          correctIdx: 2,
          explanation:
            'Khi đèn tắt tối để chiếu sao, người đến muộn không thể vào cho đến giờ giải lao vì lý do an toàn ("for safety reasons").',
        },
        {
          id: 'cam-mock-5-q22',
          skill: 'reading',
          partLabel: 'Reading (FCE Passage Q22–Q25)',
          passage:
            'Until recently, mapmakers charting ocean trenches relied on sonar beams bounced from slow-moving research ships—a method so time-consuming that scientists joked we had better maps of Mars than of our own seafloor. Today, swarms of yellow autonomous underwater gliders are quietly transforming that gap. Driven forward by tiny shifts in buoyancy rather than noisy propellers, a single glider can drift across hundreds of kilometers on less electricity than a kitchen toaster uses.\n\nBecause they move silently without stirring up sediment, gliders capture crystal-clear readings of underwater currents and deep thermal vents. Every few days, a glider rises briefly to the surface, raises its tail antenna to beam compressed measurements via satellite, and slips back down into the dark—leaving marine biologists with live data from storms too fierce for crewed ships to enter.',
          question: 'Why did scientists once compare ocean floor maps unfavorably to maps of Mars?',
          options: [
            'Ocean satellites could not photograph salt water.',
            'Mars had deeper trenches than Earth’s oceans.',
            'Research vessels refused to share seafloor charts.',
            'Sonar ship surveys were extremely slow and incomplete.',
          ],
          correctIdx: 3,
          explanation:
            'Đo bằng tàu thủy dùng sóng âm quá chậm và tốn thời gian ("so time-consuming") nên bản đồ đáy biển kém chi tiết hơn cả sao Hỏa.',
        },
        {
          id: 'cam-mock-5-q23',
          skill: 'reading',
          partLabel: 'Reading (FCE Passage Q22–Q25)',
          passage:
            'Until recently, mapmakers charting ocean trenches relied on sonar beams bounced from slow-moving research ships—a method so time-consuming that scientists joked we had better maps of Mars than of our own seafloor. Today, swarms of yellow autonomous underwater gliders are quietly transforming that gap. Driven forward by tiny shifts in buoyancy rather than noisy propellers, a single glider can drift across hundreds of kilometers on less electricity than a kitchen toaster uses.\n\nBecause they move silently without stirring up sediment, gliders capture crystal-clear readings of underwater currents and deep thermal vents. Every few days, a glider rises briefly to the surface, raises its tail antenna to beam compressed measurements via satellite, and slips back down into the dark—leaving marine biologists with live data from storms too fierce for crewed ships to enter.',
          question: 'How do the yellow underwater gliders move through the ocean?',
          options: [
            'By spinning powerful rear propellers',
            'By riding surface ocean storms',
            'By being towed behind research vessels',
            'By adjusting their buoyancy with very little electricity',
          ],
          correctIdx: 3,
          explanation:
            'Tàu lượn di chuyển nhờ thay đổi nhẹ độ nổi ("tiny shifts in buoyancy") và tiêu thụ ít điện hơn một máy nướng bánh mì.',
        },
        {
          id: 'cam-mock-5-q24',
          skill: 'reading',
          partLabel: 'Reading (FCE Passage Q22–Q25)',
          passage:
            'Until recently, mapmakers charting ocean trenches relied on sonar beams bounced from slow-moving research ships—a method so time-consuming that scientists joked we had better maps of Mars than of our own seafloor. Today, swarms of yellow autonomous underwater gliders are quietly transforming that gap. Driven forward by tiny shifts in buoyancy rather than noisy propellers, a single glider can drift across hundreds of kilometers on less electricity than a kitchen toaster uses.\n\nBecause they move silently without stirring up sediment, gliders capture crystal-clear readings of underwater currents and deep thermal vents. Every few days, a glider rises briefly to the surface, raises its tail antenna to beam compressed measurements via satellite, and slips back down into the dark—leaving marine biologists with live data from storms too fierce for crewed ships to enter.',
          question: 'What advantage does silent movement give the gliders when collecting data?',
          options: [
            'They avoid kicking up seabed mud that would cloud measurements.',
            'They frighten deep-sea sharks away from thermal vents.',
            'They reach the ocean surface twice as quickly.',
            'They can transmit satellite signals while still on the seafloor.',
          ],
          correctIdx: 0,
          explanation:
            'Di chuyển êm không làm khuấy đục lớp trầm tích ("without stirring up sediment") giúp thu được số liệu rõ nét.',
        },
        {
          id: 'cam-mock-5-q25',
          skill: 'reading',
          partLabel: 'Reading (FCE Passage Q22–Q25)',
          passage:
            'Until recently, mapmakers charting ocean trenches relied on sonar beams bounced from slow-moving research ships—a method so time-consuming that scientists joked we had better maps of Mars than of our own seafloor. Today, swarms of yellow autonomous underwater gliders are quietly transforming that gap. Driven forward by tiny shifts in buoyancy rather than noisy propellers, a single glider can drift across hundreds of kilometers on less electricity than a kitchen toaster uses.\n\nBecause they move silently without stirring up sediment, gliders capture crystal-clear readings of underwater currents and deep thermal vents. Every few days, a glider rises briefly to the surface, raises its tail antenna to beam compressed measurements via satellite, and slips back down into the dark—leaving marine biologists with live data from storms too fierce for crewed ships to enter.',
          question: 'Why are gliders especially valuable to marine biologists during severe weather?',
          options: [
            'They rescue stranded research ship crews.',
            'They gather live ocean measurements in storms too dangerous for human ships.',
            'They use storm waves to recharge their satellite antennas.',
            'They prevent warm currents from reaching coastal towns.',
          ],
          correctIdx: 1,
          explanation:
            'Tàu lượn thu và gửi dữ liệu trực tiếp qua vệ tinh ngay cả trong những cơn bão quá dữ dội mà tàu có thủy thủ đoàn không thể đi vào.',
        },
      ],
    },
  ],
};

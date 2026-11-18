import {
  ExamMcqQuestion,
  ExamReadingSet,
  ExamListeningSet,
  ExamWritingTask,
  ExamSpeakingTask,
  ExamMockTest,
} from './examPrepData';

export const IELTS_EXTRA: {
  diagnosticQuestions: ExamMcqQuestion[];
  reading: ExamReadingSet[];
  listening: ExamListeningSet[];
  writing: ExamWritingTask[];
  speaking: ExamSpeakingTask[];
  mockTests: ExamMockTest[];
} = {
  diagnosticQuestions: [
    {
      id: 'ielts-diag-ex-1',
      skill: 'listening',
      partLabel: 'Listening Part 1',
      audioScript:
        'Coordinator: Good morning, Westbridge Adult Education Center. How may I help? Caller: Hi, I would like to sign up for the Tuesday evening pottery workshop. Coordinator: Actually, we had to move pottery to Wednesday evenings at 7:00 PM because the kiln room is shared with a sculpture course on Tuesdays. The eight-week term costs 160 pounds, though if you bring a local library card you receive a 15-pound discount, bringing it down to 145 pounds.',
      question: 'When is the pottery workshop held now, and what is the fee with a library card?',
      options: [
        'Tuesday evenings; 160 pounds',
        'Wednesday evenings; 160 pounds',
        'Wednesday evenings; 145 pounds',
        'Tuesday evenings; 145 pounds',
      ],
      correctIdx: 2,
      explanation:
        'Lớp gốm được dời từ Thứ Ba sang tối Thứ Tư lúc 7:00 PM ("move pottery to Wednesday evenings") và khi xuất trình thẻ thư viện địa phương sẽ được giảm £15 còn £145.',
    },
    {
      id: 'ielts-diag-ex-2',
      skill: 'listening',
      partLabel: 'Listening Part 2 (Facility Update)',
      audioScript:
        'Manager: Welcome to the Northwood Athletics Complex orientation. Before we tour the indoor track, please note that the café on the ground floor is closed until Friday for floor tiling. In the meantime, hot drinks and sandwiches are available from the temporary counter inside the East Lounge, just opposite the locker rooms. Also, remember that outdoor tennis courts close promptly at 9:30 PM.',
      question: 'Where can visitors buy refreshments while the ground-floor café is being renovated?',
      options: [
        'At a temporary counter in the East Lounge',
        'Next to the indoor running track',
        'Outside near the tennis courts',
        'Inside the reception lobby',
      ],
      correctIdx: 0,
      explanation:
        'Quầy tạm thời phục vụ đồ uống nóng và bánh sandwich đặt bên trong East Lounge ("inside the East Lounge, just opposite the locker rooms").',
    },
    {
      id: 'ielts-diag-ex-3',
      skill: 'listening',
      partLabel: 'Listening Part 4 (Lecture)',
      audioScript:
        'Lecturer: Many people assume desert cacti survive solely by storing huge volumes of water in their stems. While water storage is vital, equally crucial is their nocturnal metabolism. Unlike temperate plants that open leaf pores during daylight, cacti open their stomata only after nightfall to absorb carbon dioxide, thereby slashing evaporative water loss under scorching daytime sun.',
      question: 'According to the lecturer, why do desert cacti open their stomata at night?',
      options: [
        'To release excess heat stored in their roots',
        'To attract nocturnal pollinating insects',
        'To absorb nutrients directly from night dew',
        'To take in carbon dioxide while minimizing water evaporation',
      ],
      correctIdx: 3,
      explanation:
        'Bài giảng giải thích xương rồng chỉ mở khí khổng (stomata) vào ban đêm để hấp thụ CO2 và nhờ đó giảm mạnh lượng nước bay hơi dưới nắng gắt ban ngày.',
    },
    {
      id: 'ielts-diag-ex-4',
      skill: 'reading',
      partLabel: 'Reading (Detail & Comparison)',
      passage:
        'Early mechanical clocks in fourteenth-century Europe relied on suspended weights to drive gear trains, meaning they functioned reliably only when mounted upright in stone towers. It was not until the invention of the coiled mainspring a century later that timepieces could be miniaturized into portable pocket watches, though early spring-driven models lost accuracy as the metal gradually unwound.',
      question: 'Why were fourteenth-century mechanical clocks unsuitable for carrying around?',
      options: [
        'Their coiled mainsprings broke easily when shaken.',
        'They depended on hanging weights and had to remain upright.',
        'City authorities prohibited private citizens from owning clocks.',
        'Their gears could only operate in freezing temperatures.',
      ],
      correctIdx: 1,
      explanation:
        'Đồng hồ cơ thế kỷ 14 vận hành bằng quả nặng treo ("suspended weights") nên chỉ chạy ổn định khi gắn thẳng đứng trên tháp đá, chưa thể thu nhỏ mang theo.',
    },
    {
      id: 'ielts-diag-ex-5',
      skill: 'reading',
      partLabel: 'Reading (Inference)',
      passage:
        'Municipal tree-planting drives often celebrate the sheer number of saplings placed in the ground during spring festivals. Yet forestry audits across twelve cities revealed that up to 40 percent of newly planted street trees died within three summers because contracts funded planting alone, leaving no budget for summer irrigation or mulch maintenance.',
      question: 'What does the forestry audit imply about municipal tree-planting programs?',
      options: [
        'Spring festivals are the wrong season for planting saplings.',
        'Counting planted saplings does not guarantee long-term canopy growth without aftercare funding.',
        'Street trees naturally survive better without mulch or watering.',
        'Twelve cities decided to stop planting street trees completely.',
      ],
      correctIdx: 1,
      explanation:
        'Báo cáo chỉ ra tới 40% cây mới chết trong 3 mùa hè vì ngân sách chỉ chi cho việc trồng mà thiếu kinh phí tưới nước và chăm sóc sau trồng.',
    },
    {
      id: 'ielts-diag-ex-6',
      skill: 'reading',
      partLabel: 'Reading (Vocabulary in Context)',
      passage:
        'Rather than eliminating human editors, automated translation tools have shifted their workload toward nuanced cultural adaptation. Routine product manuals are now drafted in seconds, allowing linguists to concentrate on idioms, humor, and regional sensitivities that algorithms still mishandle.',
      question: 'In this passage, the word "nuanced" is closest in meaning to:',
      options: ['repetitive', 'mechanized', 'outdated', 'subtle and context-sensitive'],
      correctIdx: 3,
      explanation:
        '"Nuanced cultural adaptation" ám chỉ sự điều chỉnh tinh tế, nhạy cảm với sắc thái văn hóa và ngữ cảnh mà thuật toán dễ xử lý sai.',
    },
    {
      id: 'ielts-diag-ex-7',
      skill: 'reading',
      partLabel: 'Reading (Writer’s Purpose)',
      passage:
        'Although ultra-processed snacks are frequently blamed solely on individual willpower, food economists point out that price subsidies on refined corn and vegetable oils make calorie-dense packaged goods significantly cheaper per calorie than fresh produce in low-income neighborhoods.',
      question: 'Why does the author mention agricultural price subsidies?',
      options: [
        'To illustrate structural economic factors behind unhealthy dietary patterns',
        'To argue that fresh vegetables should no longer be grown locally',
        'To prove that consumers prefer cooking with corn oil at home',
        'To encourage supermarkets to eliminate all packaged foods immediately',
      ],
      correctIdx: 0,
      explanation:
        'Tác giả dẫn chứng trợ giá nông nghiệp để cho thấy lựa chọn thực phẩm không chỉ do ý chí cá nhân mà chịu tác động từ cấu trúc giá cả kinh tế.',
    },
    {
      id: 'ielts-diag-ex-8',
      skill: 'vocab',
      partLabel: 'Academic Collocation',
      question:
        'Choose the most accurate academic phrase to complete the sentence: "Targeted vocational scholarships can help _____ the widening skills gap in green energy sectors."',
      options: ['polish up', 'close up to', 'bridge', 'scatter'],
      correctIdx: 2,
      explanation:
        '"Bridge the skills gap" (thu hẹp/lấp đầy khoảng cách kỹ năng) là collocation học thuật chuẩn xác và tự nhiên nhất trong IELTS Writing Task 2.',
    },
    {
      id: 'ielts-diag-ex-9',
      skill: 'vocab',
      partLabel: 'Writing Task 1 Precision',
      question:
        'Which verb phrase best describes a line graph that stays almost flat between 2016 and 2020 after rising sharply?',
      options: [
        'plummeted dramatically',
        'surged erratically',
        'skyrocketed continuously',
        'plateaued / leveled off',
      ],
      correctIdx: 3,
      explanation:
        '"Plateaued" hoặc "leveled off" mô tả chính xác giai đoạn số liệu đi ngang, chững lại sau khi tăng mạnh trong Writing Task 1.',
    },
    {
      id: 'ielts-diag-ex-10',
      skill: 'vocab',
      partLabel: 'Academic Hedging',
      question:
        'Select the sentence that uses academic hedging appropriately for an IELTS Writing Task 2 argument:',
      options: [
        'Smartphones definitely destroy every teenager’s memory overnight.',
        'Excessive late-night screen exposure appears to disrupt sleep cycles among adolescents.',
        'All young people without exception are addicted to short videos.',
        'Banning phones from schools will 100% solve academic underachievement.',
      ],
      correctIdx: 1,
      explanation:
        'Văn phong học thuật IELTS tránh khẳng định tuyệt đối ("definitely", "every", "100%") và ưu tiên ngôn ngữ thận trọng như "appears to".',
    },
    {
      id: 'ielts-diag-ex-11',
      skill: 'grammar',
      partLabel: 'Complex Sentence (Participle Clause)',
      question: 'Which sentence combines the two ideas cleanly and grammatically?',
      options: [
        'Having been built in 1920, the municipal bridge still handles heavy commuter traffic.',
        'Having built in 1920, the municipal bridge still handles heavy commuter traffic.',
        'Building in 1920, the municipal bridge still handles heavy commuter traffic.',
        'Being build in 1920, the municipal bridge still handles heavy commuter traffic.',
      ],
      correctIdx: 0,
      explanation:
        'Chủ ngữ "the municipal bridge" chịu tác động bị động ("được xây dựng năm 1920") nên phải dùng phân từ hoàn thành bị động "Having been built".',
    },
    {
      id: 'ielts-diag-ex-12',
      skill: 'grammar',
      partLabel: 'Conditional Inversion (Band 7.5+)',
      question: 'Choose the grammatically accurate formal conditional sentence:',
      options: [
        'Should governments invest earlier in flood barriers, future repair bills would fall sharply.',
        'Had governments invested earlier in flood barriers, future repair bills will fall sharply.',
        'Were governments to invest earlier in flood barriers, future repair bills would fall sharply.',
        'If governments would invest earlier in flood barriers, future repair bills fell sharply.',
      ],
      correctIdx: 2,
      explanation:
        'Đảo ngữ điều kiện loại 2 chuẩn là "Were + S + to V..., S + would + V" (giả định ở hiện tại/tương lai). Câu A trộn loại 1 ("Should") với loại 2 ("would").',
    },
  ],

  reading: [
    {
      id: 'ielts-read-ex-1',
      partLabel: 'Academic Reading — Passage 1',
      title: 'Biophilic Architecture and Urban Recovery',
      level: 'B2',
      passage:
        'In densely built financial districts, glass-and-concrete towers have long prioritized floor-area efficiency over sensory comfort. Over the past fifteen years, however, architectural psychologists have championed "biophilic design"—the deliberate integration of daylight, living plants, natural timber, and water features into interior workspaces and medical facilities. Unlike superficial lobby potted plants, genuine biophilic architecture alters spatial geometry, maximizing cross-ventilation and offering occupants unobstructed sightlines to outdoor greenery.\n\nClinical trials in hospital design underscore the tangible value of this approach. In a landmark multi-year study comparing surgical recovery wards, patients assigned to rooms overlooking mature courtyard trees requested lower doses of pain medication and were discharged roughly a day earlier on average than patients facing blank brick walls. Researchers attribute these outcomes to reduced cortisol production when the human visual system processes organic fractal patterns—such as branching foliage or moving water—rather than sterile right angles.\n\nNevertheless, urban developers remain divided on implementation costs. Retrofitting older office blocks with living green walls requires reinforced waterproofing, automated drip irrigation, and specialized horticultural maintenance. When budgets tighten, these features are often the first items cut during value engineering, even though longitudinal workplace surveys show lower employee absenteeism in daylight-rich buildings.',
      viSummary:
        'Bài đọc trình bày khái niệm kiến trúc ưa sinh học (biophilic design) — đưa ánh sáng tự nhiên, cây xanh và vật liệu tự nhiên vào không gian làm việc và bệnh viện. Nghiên cứu lâm sàng cho thấy bệnh nhân nhìn thấy cây xanh hồi phục nhanh hơn và cần ít thuốc giảm đau hơn, dù chủ đầu tư vẫn e ngại chi phí bảo trì khi cải tạo tòa nhà cũ.',
      questions: [
        {
          id: 'ielts-read-ex-1-q1',
          questionType: 'Detail',
          question: 'How does genuine biophilic design differ from simply placing potted plants in a lobby?',
          options: [
            'It uses artificial plastic foliage to cut maintenance fees.',
            'It restructures spatial layout for natural airflow, daylight, and outdoor views.',
            'It eliminates glass windows completely to keep rooms cool.',
            'It restricts indoor timber to ground-floor reception desks.',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn 1 nêu thiết kế biophilic thực thụ thay đổi cấu trúc không gian ("alters spatial geometry"), tối đa hóa thông gió chéo, ánh sáng tự nhiên và tầm nhìn ra mảng xanh.',
        },
        {
          id: 'ielts-read-ex-1-q2',
          questionType: 'Cause & Effect',
          question: 'According to paragraph 2, why did patients overlooking courtyard trees recover faster?',
          options: [
            'Hospital staff visited rooms with garden views more frequently.',
            'Courtyard trees filtered out all airborne bacteria from the ward.',
            'Fresh air from open windows lowered room humidity below 30%.',
            'Viewing natural organic patterns helped lower stress hormone levels.',
          ],
          correctIdx: 3,
          explanation:
            'Các nhà nghiên cứu cho rằng kết quả này đến từ việc giảm hormone cortisol ("reduced cortisol production") khi mắt người tiếp nhận họa tiết tự nhiên.',
        },
        {
          id: 'ielts-read-ex-1-q3',
          questionType: 'Vocabulary in Context',
          question: 'In paragraph 2, the word "sterile" is closest in meaning to:',
          options: [
            'bare and lifeless',
            'brightly painted',
            'historically valuable',
            'acoustically noisy',
          ],
          correctIdx: 0,
          explanation:
            '"Sterile right angles" đặt đối lập với "organic fractal patterns", mang nghĩa góc cạnh khô cứng, đơn điệu và thiếu sức sống ("bare and lifeless").',
        },
        {
          id: 'ielts-read-ex-1-q4',
          questionType: 'Challenge / Obstacle',
          question: 'Why are living green walls often removed during budget revisions in older buildings?',
          options: [
            'Employees complain that indoor greenery attracts insects.',
            'Municipal fire codes ban wooden furniture in high-rise offices.',
            'Upgrading waterproofing, irrigation, and ongoing plant care raises upfront costs.',
            'Longitudinal surveys failed to show any link to absenteeism.',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 3 giải thích việc cải tạo tòa nhà cũ đòi hỏi chống thấm gia cố, tưới nhỏ giọt tự động và bảo dưỡng chuyên biệt nên dễ bị cắt giảm khi thắt chặt ngân sách.',
        },
        {
          id: 'ielts-read-ex-1-q5',
          questionType: 'Main Idea',
          question: 'Which statement best summarizes the passage as a whole?',
          options: [
            'Biophilic architecture should only be applied to private residential villas.',
            'Integrating nature into buildings offers measurable health and workplace benefits despite higher retrofitting expenses.',
            'Glass skyscrapers have completely disappeared from modern financial districts.',
            'Hospitals no longer need surgical pain medication when trees are planted nearby.',
          ],
          correctIdx: 1,
          explanation:
            'Toàn bài cân bằng giữa lợi ích sức khỏe/năng suất đã được chứng minh của kiến trúc biophilic và rào cản chi phí lắp đặt, bảo trì.',
        },
      ],
    },
    {
      id: 'ielts-read-ex-2',
      partLabel: 'Academic Reading — Passage 2',
      title: 'Reconstructing Ancient Diets Through Dental Calculus',
      level: 'C1',
      passage:
        'For decades, archaeologists trying to understand what prehistoric communities ate relied primarily on animal bones and charred seeds preserved in hearth ash. While informative, those macro-remains overrepresent durable foods—such as mammal bones and hard nutshells—while leaving leafy vegetables, fermented beverages, and starchy tubers virtually invisible in the excavation record.\n\nIn recent years, bioarchaeologists have turned to an unlikely time capsule: dental calculus, the mineralized plaque that accumulates on teeth during a person’s lifetime. Unlike soft tissue, hardened tartar resists soil decay for tens of thousands of years, locking microscopic starch granules, plant phytoliths, pollen grains, and even fragments of ancient proteins directly inside a crystalline mineral matrix. By dissolving tiny flakes of calculus under sterile laboratory conditions, researchers can identify specific plant species chewed by an individual—revealing, for instance, that Neanderthals in certain European caves cooked barley and consumed medicinal herbs.\n\nYet interpreting dental calculus demands methodological caution. Traces trapped on teeth reflect contact rather than exact caloric proportions; a single fibrous root chewed to clean teeth might leave abundant silica residue while meat leaves comparatively sparse protein markers. Consequently, specialists now combine calculus microscopy with stable isotope analysis of bone collagen to build a balanced portrait of ancient nutrition.',
      viSummary:
        'Các nhà khảo cổ sinh học hiện đại phân tích cao răng hóa thạch (dental calculus) để tìm tinh bột vi mô, phấn hoa và protein cổ đại, khắc phục nhược điểm của xương và hạt cháy vốn bỏ sót rau củ mềm. Tuy nhiên do dấu vết trên răng không phản ánh đúng tỷ lệ calo, giới khoa học phải kết hợp thêm phân tích đồng vị bền trong collagen xương.',
      questions: [
        {
          id: 'ielts-read-ex-2-q1',
          questionType: 'Limitation of Earlier Methods',
          question: 'What flaw did traditional archaeological evidence (bones and charred seeds) have?',
          options: [
            'It could not survive in cave environments.',
            'It exaggerated the role of soft leafy greens in ancient meals.',
            'It always belonged to domesticated livestock rather than wild game.',
            'It underreported perishable plants and starchy tubers that rarely fossilize.',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 1 nêu xương và hạt cháy phóng đại thực phẩm bền vững trong khi rau lá, đồ uống lên men và củ giàu tinh bột gần như "vô hình" trong hồ sơ khai quật.',
        },
        {
          id: 'ielts-read-ex-2-q2',
          questionType: 'Process / Mechanism',
          question: 'Why is dental calculus valuable for bioarchaeologists?',
          options: [
            'Its mineralized structure shields microscopic food particles from decaying in soil.',
            'It dissolves naturally in water so no laboratory tools are needed.',
            'It records the exact date and year each meal was eaten.',
            'It only forms on individuals who consumed cooked grains.',
          ],
          correctIdx: 0,
          explanation:
            'Đoạn 2 giải thích cao răng cứng chống lại sự phân hủy của đất suốt hàng chục nghìn năm, khóa chặt hạt tinh bột và protein trong ma trận khoáng tinh thể.',
        },
        {
          id: 'ielts-read-ex-2-q3',
          questionType: 'Example / Evidence',
          question: 'What did microscopic analysis of calculus reveal about some European Neanderthals?',
          options: [
            'They avoided all plant matter during winter months.',
            'They traded medicinal herbs with coastal populations.',
            'They processed cooked barley and used certain medicinal plants.',
            'They suffered from fewer cavities than modern agriculturalists.',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 2 dẫn chứng phát hiện người Neanderthal ở một số hang động châu Âu đã nấu lúa mạch ("cooked barley") và dùng thảo mộc chữa bệnh ("medicinal herbs").',
        },
        {
          id: 'ielts-read-ex-2-q4',
          questionType: 'Methodological Caution',
          question: 'Why do researchers avoid calculating exact calorie shares from dental calculus alone?',
          options: [
            'Modern toothpaste contaminates prehistoric cave samples.',
            'Some non-nutritious or minor fibrous items leave disproportionately heavy residue compared to meat.',
            'Protein fragments disappear within fifty years of burial.',
            'Bone collagen always contradicts starch evidence.',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn 3 nêu ví dụ một mẩu rễ xơ dùng để làm sạch răng có thể để lại nhiều dấu vết silic, trong khi thịt để lại ít dấu vết protein hơn.',
        },
        {
          id: 'ielts-read-ex-2-q5',
          questionType: 'Author’s Conclusion',
          question: 'How do modern specialists overcome the limitations of calculus microscopy?',
          options: [
            'By pairing calculus findings with stable isotope analysis of bone collagen',
            'By returning exclusively to counting animal bones in hearths',
            'By discarding samples that contain pollen grains',
            'By estimating diet solely from tooth wear patterns',
          ],
          correctIdx: 0,
          explanation:
            'Câu cuối đoạn 3 cho biết các chuyên gia kết hợp soi cao răng với phân tích đồng vị bền của collagen xương ("stable isotope analysis of bone collagen").',
        },
      ],
    },
    {
      id: 'ielts-read-ex-3',
      partLabel: 'Academic Reading — Passage 3',
      title: 'The Paradox of Desalination in Arid Coastal Cities',
      level: 'B2',
      passage:
        'As prolonged droughts strain river basins across arid coastal regions, municipal planners increasingly turn to seawater desalination to guarantee tap water independent of rainfall. Modern reverse-osmosis plants force ocean water through semi-permeable membranes at immense pressure, stripping away dissolved salt ions to yield drinking water that meets strict public-health standards. Today, over twenty thousand facilities operate worldwide, supplying a substantial share of urban freshwater in parts of the Arabian Peninsula, Israel, and coastal Australia.\n\nYet this technological lifeline carries two stubborn environmental trade-offs. First, pushing seawater through fine membranes demands vast electrical input, meaning fossil-fuel-powered plants indirectly amplify carbon emissions—the very driver of worsening climate droughts. Second, for every liter of potable water produced, roughly one and a half liters of hypersaline brine laced with anti-scaling chemicals are pumped back into coastal waters. If discharged through poorly designed pipes into calm bays, dense brine sinks to the seabed, depleting dissolved oxygen and suffocating seagrass meadows.\n\nEncouragingly, coastal engineers are testing practical remedies. Pairing desalination plants with adjacent solar farms cuts operational emissions, while multi-port diffuser pipes spray brine upward into strong ocean currents so salinity disperses rapidly before reaching delicate benthic habitats.',
      viSummary:
        'Công nghệ khử mặn thẩm thấu ngược (reverse osmosis) giúp các đô thị ven biển khô hạn chủ động nguồn nước sạch không phụ thuộc lượng mưa. Tuy nhiên, nó tiêu tốn điện năng lớn và thải ra dòng nước muối đặc (brine) có thể làm ngạt thảm cỏ biển. Các giải pháp mới gồm kết hợp điện mặt trời và ống khuếch tán đa cổng vào dòng hải lưu mạnh.',
      questions: [
        {
          id: 'ielts-read-ex-3-q1',
          questionType: 'Main Advantage',
          question: 'What primary appeal drives arid coastal cities to invest in desalination?',
          options: [
            'It is cheaper than pumping groundwater from shallow wells.',
            'It reduces salt levels in nearby agricultural soil automatically.',
            'It provides a reliable drinking-water supply unaffected by local rainfall.',
            'It requires no specialized filtration membranes.',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 1 chỉ rõ các nhà quy hoạch chọn khử mặn để đảm bảo nguồn nước máy độc lập với lượng mưa ("guarantee tap water independent of rainfall").',
        },
        {
          id: 'ielts-read-ex-3-q2',
          questionType: 'Irony / Paradox',
          question: 'Why does the passage describe energy use in conventional desalination as a paradox?',
          options: [
            'Plants produce more electricity than the city consumes.',
            'Fossil-fuel electricity used to make water also worsens climate-driven droughts.',
            'Semi-permeable membranes stop working in sunny weather.',
            'Cities use purified drinking water solely to cool coal boilers.',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn 2 chỉ ra nghịch lý: nếu chạy bằng điện hóa thạch, nhà máy khử mặn gián tiếp làm tăng phát thải carbon — nguyên nhân khiến hạn hán khí hậu trầm trọng hơn.',
        },
        {
          id: 'ielts-read-ex-3-q3',
          questionType: 'Detail (Ratio)',
          question: 'Compared with the volume of drinking water generated, how much brine waste is typically produced?',
          options: [
            'Roughly half as much as the fresh water',
            'An equal one-to-one volume',
            'Less than ten percent of intake water',
            'Approximately 1.5 times the volume of potable water',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 2 nêu rõ: cứ mỗi lít nước uống được tạo ra thì có khoảng 1,5 lít nước muối siêu mặn ("roughly one and a half liters of hypersaline brine") bị thải lại ra biển.',
        },
        {
          id: 'ielts-read-ex-3-q4',
          questionType: 'Environmental Impact',
          question: 'What happens when dense brine is released into calm coastal bays?',
          options: [
            'It sinks to the bottom, lowers oxygen levels, and harms seagrass ecosystems.',
            'It evaporates rapidly into freshwater rain clouds.',
            'It stimulates faster growth of deep-sea coral reefs.',
            'It neutralizes industrial acidity near harbor walls.',
          ],
          correctIdx: 0,
          explanation:
            'Nước muối nặng chìm xuống đáy biển, làm suy giảm oxy hòa tan và gây ngạt cho các thảm cỏ biển ("depleting dissolved oxygen and suffocating seagrass meadows").',
        },
        {
          id: 'ielts-read-ex-3-q5',
          questionType: 'Solutions',
          question: 'How do multi-port diffuser pipes reduce ecological damage from brine?',
          options: [
            'They freeze the brine into solid salt blocks for road de-icing.',
            'They pump brine deep into underground desert aquifers.',
            'They jet brine upward into fast currents so salt dilutes quickly.',
            'They convert anti-scaling chemicals into marine fertilizer.',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 3 giải thích ống khuếch tán đa cổng phun nước muối hướng lên vào các dòng chảy mạnh để độ mặn phân tán nhanh trước khi chạm đáy biển.',
        },
      ],
    },
    {
      id: 'ielts-read-ex-4',
      partLabel: 'Academic Reading — Passage 4',
      title: 'Algorithmic Pricing and Consumer Perception of Fairness',
      level: 'C1',
      passage:
        'Dynamic pricing—adjusting fees in real time based on fluctuating demand—has existed in airline ticketing and hotel reservations for decades. Today, however, machine-learning algorithms allow online retailers, ride-hailing apps, and even digital ticket platforms to recalibrate prices minute by minute using inventory levels, local weather, and competitor rates. Economists generally defend such models as efficient mechanisms that clear markets: higher peak prices discourage casual buyers and preserve supply for urgent trips.\n\nConsumer psychology, however, operates on notions of distributive fairness rather than textbook equilibrium. Behavioral experiments demonstrate that shoppers tolerate higher prices when costs visibly rise—such as paying more for winter coats during an unexpected cold snap if supply chains are strained—yet react with fierce resentment when they suspect a company is exploiting temporary vulnerability. Ride-hailing surge multipliers during severe storms or transit disruptions frequently trigger public backlash precisely because riders perceive profit-seeking during emergencies as opportunistic.\n\nConsequently, several platforms have replaced opaque algorithmic surges with capped multipliers and transparent fee breakdowns showing how much extra fare goes directly to drivers. Early evidence indicates that explaining the operational reason behind a price hike cushions consumer anger far more effectively than concealing the calculation behind a black-box interface.',
      viSummary:
        'Định giá động bằng thuật toán giúp cân bằng cung cầu theo thời gian thực, nhưng thường vấp phải phản ứng dữ dội của người tiêu dùng nếu bị xem là trục lợi trong tình huống khẩn cấp. Thử nghiệm hành vi cho thấy việc đặt trần tăng giá và minh bạch lý do tính phí giúp giảm bất bình tốt hơn giao diện hộp đen.',
      questions: [
        {
          id: 'ielts-read-ex-4-q1',
          questionType: 'Economic Rationale',
          question: 'Why do economists typically view dynamic pricing favorably?',
          options: [
            'It allocates scarce goods to buyers with the highest immediate need.',
            'It guarantees identical ticket prices for every passenger on a flight.',
            'It eliminates the need for online inventory tracking.',
            'It lowers retail prices permanently during peak holidays.',
          ],
          correctIdx: 0,
          explanation:
            'Đoạn 1 nêu các nhà kinh tế xem định giá động là cơ chế hiệu quả: giá cao giờ cao điểm khiến người mua không gấp rút lùi lại, giữ nguồn cung cho người có nhu cầu cấp thiết.',
        },
        {
          id: 'ielts-read-ex-4-q2',
          questionType: 'Contrast',
          question: 'When are shoppers most likely to accept a price increase according to behavioral research?',
          options: [
            'When an app raises fares silently during a sudden thunderstorm',
            'When prices jump solely because a competitor’s website crashed',
            'When higher prices clearly reflect genuine supply-chain or cost pressures',
            'When discounts are hidden behind complex loyalty points',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 2 chỉ ra người mua chấp nhận tăng giá khi thấy chi phí tăng rõ rệt ("when costs visibly rise"), nhưng phẫn nộ khi nghi ngờ doanh nghiệp lợi dụng tình thế khó khăn.',
        },
        {
          id: 'ielts-read-ex-4-q3',
          questionType: 'Vocabulary in Context',
          question: 'In paragraph 3, the word "opaque" is closest in meaning to:',
          options: [
            'legally mandatory',
            'unclear and hidden from view',
            'generously discounted',
            'slow to update',
          ],
          correctIdx: 1,
          explanation:
            '"Opaque algorithmic surges" đối lập với "transparent fee breakdowns", mang nghĩa thiếu minh bạch, che giấu cách tính toán.',
        },
        {
          id: 'ielts-read-ex-4-q4',
          questionType: 'Corporate Strategy',
          question: 'What practical adjustment have some platforms made to reduce customer backlash?',
          options: [
            'Removing all drivers during severe weather alerts',
            'Switching exclusively to annual subscription passes',
            'Eliminating digital receipts after trips end',
            'Setting upper limits on surges and showing how extra fees compensate drivers',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 3 nêu các nền tảng áp dụng hệ số trần ("capped multipliers") và bảng phân tách phí minh bạch chỉ rõ phần thu nhập thêm chuyển trực tiếp cho tài xế.',
        },
        {
          id: 'ielts-read-ex-4-q5',
          questionType: 'Key Takeaway',
          question: 'What does paragraph 3 conclude about price transparency?',
          options: [
            'Customers demand zero price changes under any circumstances.',
            'Black-box interfaces encourage buyers to tip more generously.',
            'Software engineers cannot explain machine-learning formulas simply.',
            'Communicating the reason for an increase softens negative consumer reactions.',
          ],
          correctIdx: 3,
          explanation:
            'Câu cuối khẳng định việc giải thích lý do vận hành đằng sau mức tăng giá làm dịu sự tức giận của khách hàng tốt hơn nhiều so với giao diện hộp đen.',
        },
      ],
    },
  ],

  listening: [
    {
      id: 'ielts-list-ex-1',
      partLabel: 'Listening Part 1 Simulation',
      title: 'Applying for a Community Garden Plot',
      level: 'B1',
      speakerContext: 'Hội thoại giữa người đăng ký thuê luống trồng cây (Hannah) và quản lý vườn cộng đồng (David).',
      audioScript:
        'David: Hello, Elmwood Community Garden, David speaking. Hannah: Hi David, I am calling to ask about renting a vegetable plot for the spring season. David: Wonderful! We have two plot sizes available: a small half-plot for 40 dollars a year, or a full-sized plot for 70 dollars. Wait—let me check the availability list. Actually, all the half-plots were taken yesterday, so only full plots at 70 dollars remain open right now. Hannah: That works for me. Is there an orientation session for new members? David: Yes, we usually run orientations on Saturday mornings, though this month it has been shifted to Sunday at 10 AM because of our annual soil delivery on Saturday. We lend out spades and watering cans from the wooden shed, so you only need to bring your own gardening gloves and seeds. Oh, and please remember we enforce a strict no-chemical-pesticide policy—only organic compost and natural sprays are permitted.',
      viSummary:
        'Hannah gọi điện đăng ký thuê luống trồng rau tại Elmwood. Luống nhỏ ($40) đã hết hôm qua nên chỉ còn luống lớn ($70/năm). Buổi hướng dẫn tháng này chuyển từ sáng Thứ Bảy sang 10 giờ sáng Chủ Nhật do Thứ Bảy giao đất. Vườn cho mượn xẻng và bình tưới, học viên tự mang găng tay và hạt giống, và tuyệt đối cấm thuốc trừ sâu hóa học.',
      questions: [
        {
          id: 'ielts-list-ex-1-q1',
          question: 'How much will Hannah pay per year for the available garden plot?',
          options: ['$35', '$40', '$70', '$85'],
          correctIdx: 2,
          explanation:
            'Luống nhỏ $40 đã được đăng ký hết từ hôm qua ("all the half-plots were taken yesterday"), chỉ còn luống lớn giá $70/năm.',
        },
        {
          id: 'ielts-list-ex-1-q2',
          question: 'When will this month’s new-member orientation take place?',
          options: [
            'Sunday at 10:00 AM',
            'Saturday at 10:00 AM',
            'Saturday afternoon',
            'Wednesday evening',
          ],
          correctIdx: 0,
          explanation:
            'Thông thường diễn ra sáng Thứ Bảy nhưng tháng này chuyển sang 10:00 AM Chủ Nhật ("shifted to Sunday at 10 AM") vì Thứ Bảy nhận đất trồng.',
        },
        {
          id: 'ielts-list-ex-1-q3',
          question: 'Why was the regular orientation day changed this month?',
          options: [
            'The wooden tool shed is being repainted.',
            'David is attending a gardening conference.',
            'Heavy rain flooded the main entrance.',
            'Annual soil supplies are arriving on Saturday.',
          ],
          correctIdx: 3,
          explanation:
            'Lý do đổi lịch là đợt giao đất hàng năm vào Thứ Bảy ("because of our annual soil delivery on Saturday").',
        },
        {
          id: 'ielts-list-ex-1-q4',
          question: 'Which items must Hannah bring herself?',
          options: [
            'A metal spade and watering can',
            'Gardening gloves and seeds',
            'Organic compost bags',
            'A padlock for the shed',
          ],
          correctIdx: 1,
          explanation:
            'Vườn cho mượn xẻng và bình tưới từ nhà kho gỗ, nên Hannah chỉ cần mang găng tay làm vườn và hạt giống.',
        },
        {
          id: 'ielts-list-ex-1-q5',
          question: 'What is strictly prohibited in the community garden?',
          options: [
            'Chemical pesticides',
            'Sharing tools with neighbors',
            'Watering plants before noon',
            'Planting tall sunflowers',
          ],
          correctIdx: 0,
          explanation:
            'David nhấn mạnh quy định nghiêm ngặt không dùng thuốc trừ sâu hóa học ("strict no-chemical-pesticide policy").',
        },
      ],
    },
    {
      id: 'ielts-list-ex-2',
      partLabel: 'Listening Part 2 Simulation',
      title: 'Visitor Briefing at the Maritime Heritage Museum',
      level: 'B2',
      speakerContext: 'Hướng dẫn viên bảo tàng giới thiệu lộ trình tham quan và các thay đổi trong ngày cho nhóm khách.',
      audioScript:
        'Guide: Good morning everyone, and welcome to the Maritime Heritage Museum. Before you explore freely, let me share a few updates for today. First, our centerpiece 19th-century wooden schooner in Hall A is fully open, and you can board the upper deck until 4 PM. However, the Navigation Instruments Room on the second floor is temporarily closed for humidity calibration, so please skip that gallery today. In exchange, we have opened our rare Map Archive Room behind the courtyard—normally reserved for researchers—free of charge with your regular ticket. For anyone interested in the short 20-minute documentary on lighthouse keepers, screenings run at 11:30 AM and 2:15 PM in the Harbor Theater; seats are first-come, first-served, so arrive ten minutes early. Finally, if you brought large backpacks, kindly store them in the coin-free lockers beside the Ticket Desk, as bulky bags are not permitted near the delicate ship models.',
      viSummary:
        'Khách có thể lên boong tàu gỗ thế kỷ 19 ở Sảnh A đến 4 giờ chiều. Phòng Thiết bị Hàng hải tầng 2 tạm đóng để cân chỉnh độ ẩm; bù lại Phòng Lưu trữ Bản đồ hiếm phía sau sân mở miễn phí. Phim tài liệu 20 phút chiếu lúc 11:30 và 14:15 ở Harbor Theater. Ba lô lớn gửi miễn phí tại tủ khóa cạnh Quầy vé.',
      questions: [
        {
          id: 'ielts-list-ex-2-q1',
          question: 'Which gallery is closed to visitors today?',
          options: [
            'Hall A featuring the wooden schooner',
            'The Navigation Instruments Room',
            'The Map Archive Room',
            'The Harbor Theater',
          ],
          correctIdx: 1,
          explanation:
            'Phòng Navigation Instruments Room trên tầng 2 tạm đóng để hiệu chỉnh độ ẩm ("temporarily closed for humidity calibration").',
        },
        {
          id: 'ielts-list-ex-2-q2',
          question: 'What special access is offered to ticket holders today?',
          options: [
            'A free lunch inside the courtyard café',
            'Private climbing access up the ship’s main mast',
            'A free guided boat ride outside the museum',
            'Complimentary entry to the Map Archive Room',
          ],
          correctIdx: 3,
          explanation:
            'Khách được vào miễn phí Phòng Lưu trữ Bản đồ hiếm ("rare Map Archive Room") vốn thường chỉ dành cho nhà nghiên cứu.',
        },
        {
          id: 'ielts-list-ex-2-q3',
          question: 'How should visitors secure a seat for the lighthouse documentary?',
          options: [
            'Arrive ten minutes early as seating is first-come, first-served',
            'Reserve a numbered seat at the Ticket Desk',
            'Pay a five-dollar theater surcharge online',
            'Wait until 4:00 PM when the upper deck closes',
          ],
          correctIdx: 0,
          explanation:
            'Suất chiếu không đặt chỗ trước ("first-come, first-served") nên hướng dẫn viên khuyên đến sớm 10 phút.',
        },
        {
          id: 'ielts-list-ex-2-q4',
          question: 'What is the policy regarding museum lockers?',
          options: [
            'Visitors must insert a refundable two-dollar coin.',
            'Lockers are only available for researchers.',
            'Large backpacks can be stored free of charge near the Ticket Desk.',
            'Lockers close promptly at 2:15 PM.',
          ],
          correctIdx: 2,
          explanation:
            'Tủ khóa không cần tiền xu ("coin-free lockers") nằm cạnh Quầy vé dùng để gửi ba lô lớn.',
        },
        {
          id: 'ielts-list-ex-2-q5',
          question: 'Why are bulky bags prohibited inside the main exhibition halls?',
          options: [
            'To keep emergency exits completely clear',
            'To protect fragile ship models from accidental damage',
            'To reduce crowding inside the courtyard',
            'Because security scanners cannot check large bags',
          ],
          correctIdx: 1,
          explanation:
            'Túi cồng kềnh bị cấm để tránh va chạm vào các mô hình tàu thuyền tinh xảo dễ vỡ ("near the delicate ship models").',
        },
      ],
    },
    {
      id: 'ielts-list-ex-3',
      partLabel: 'Listening Part 3 Simulation',
      title: 'Reviewing Urban Pollinator Fieldwork',
      level: 'B2',
      speakerContext: 'Hai sinh viên sinh thái học (Priya và Sam) thảo luận kết quả khảo sát ong và bướm tại 4 công viên.',
      audioScript:
        'Sam: Priya, I finished entering our pollinator counts from all four city parks into the spreadsheet. Look at Oak Park—we recorded nearly triple the bumblebee visits compared to Riverside Park. Priya: True, though remember we surveyed Oak Park on a sunny Saturday morning, whereas Riverside was sampled on a windy Tuesday afternoon after a brief shower. If we compare raw totals directly, Dr. Chen will definitely flag that weather bias. Sam: Good catch! Should we drop Riverside from the report altogether? Priya: No, losing a quarter of our sites would weaken the geographic comparison. Instead, let us calculate average sightings per sunny hour and explicitly note the weather discrepancy in our limitations section. Also, look at our flower-density chart—the stacked bar format makes it almost impossible to see small wildflower patches. Let us switch to side-by-side column charts before Friday’s seminar.',
      viSummary:
        'Sam nhận thấy công viên Oak có số lượt ong nghệ gấp ba công viên Riverside, nhưng Priya chỉ ra sai lệch thời tiết (Oak khảo sát sáng nắng, Riverside chiều gió sau mưa). Họ quyết định giữ lại dữ liệu Riverside, chuẩn hóa theo số lượt quan sát trung bình mỗi giờ nắng, ghi rõ hạn chế thời tiết và đổi biểu đồ cột chồng sang cột đứng song song.',
      questions: [
        {
          id: 'ielts-list-ex-3-q1',
          question: 'What methodological flaw does Priya notice in the park comparison?',
          options: [
            'The parks were surveyed under noticeably different weather conditions.',
            'Sam forgot to enter the butterfly data from Oak Park.',
            'Riverside Park had fewer flowering trees planted.',
            'The students counted pollinators for too many hours.',
          ],
          correctIdx: 0,
          explanation:
            'Priya lưu ý Oak Park được khảo sát vào sáng nắng đẹp còn Riverside vào chiều gió sau mưa, tạo ra sai lệch thời tiết ("weather bias").',
        },
        {
          id: 'ielts-list-ex-3-q2',
          question: 'Why does Priya reject Sam’s suggestion to remove Riverside Park from the report?',
          options: [
            'Dr. Chen lives near Riverside Park.',
            'It was the only park with rare bumblebee species.',
            'Dropping a site would weaken the geographic scope of their study.',
            'They have no time left to re-type the spreadsheet.',
          ],
          correctIdx: 2,
          explanation:
            'Priya giải thích bỏ mất 1/4 địa điểm khảo sát sẽ làm yếu tính so sánh địa lý ("weaken the geographic comparison").',
        },
        {
          id: 'ielts-list-ex-3-q3',
          question: 'How do the students agree to handle the unequal survey conditions?',
          options: [
            'Re-survey all four parks during the weekend',
            'Compute average sightings per sunny hour and mention the bias in limitations',
            'Multiply the Riverside numbers by three',
            'Hide the weather notes in an appendix',
          ],
          correctIdx: 1,
          explanation:
            'Họ thống nhất tính trung bình mỗi giờ nắng ("average sightings per sunny hour") và nêu rõ chênh lệch thời tiết ở mục hạn chế nghiên cứu.',
        },
        {
          id: 'ielts-list-ex-3-q4',
          question: 'What problem do they find with their current flower-density chart?',
          options: [
            'The axis labels are written in the wrong units.',
            'The font size is too small to print.',
            'The colors look identical in black and white.',
            'The stacked bars obscure small wildflower areas.',
          ],
          correctIdx: 3,
          explanation:
            'Định dạng biểu đồ cột chồng ("stacked bar format") khiến các mảng hoa dại nhỏ gần như không nhìn thấy được.',
        },
        {
          id: 'ielts-list-ex-3-q5',
          question: 'What chart format will they use for Friday’s seminar?',
          options: [
            'A pie chart',
            'A scatter plot',
            'Side-by-side column charts',
            'A hand-drawn park map',
          ],
          correctIdx: 2,
          explanation:
            'Priya đề xuất chuyển sang biểu đồ cột song song ("side-by-side column charts") trước buổi seminar thứ Sáu.',
        },
      ],
    },
    {
      id: 'ielts-list-ex-4',
      partLabel: 'Listening Part 4 Simulation',
      title: 'Acoustic Engineering of Ancient Greek Amphitheaters',
      level: 'C1',
      speakerContext: 'Bài giảng đại học về nguyên lý âm học tại nhà hát cổ đại Epidaurus ở Hy Lạp.',
      audioScript:
        'Lecturer: Visitors to the fourth-century BCE theater of Epidaurus in Greece are routinely astonished that an actor’s whisper on stage can be heard clearly fifty-five rows up without any microphones. Early twentieth-century guidebooks credited favorable hillside breezes or invisible echoes off nearby stone temples. However, acoustic measurements published in 2007 disproved both myths. Researchers found that the stepped limestone seating rows act as an acoustic trap—specifically, a natural low-frequency filter. Everyday background murmurs from the audience and wind rustling sit below 500 hertz; when these low-frequency waves hit the corrugated rows of stone benches, destructive interference cancels them out. Meanwhile, the higher-frequency harmonics of human speech bounce cleanly up the slope unmasked. Intriguingly, when modern engineers tried adding soft padded cushions on similar stone steps, this filtering effect vanished because the smooth upholstery absorbed the acoustic reflections rather than scattering them.',
      viSummary:
        'Bài giảng giải thích bí mật âm học tại nhà hát cổ Epidaurus: không phải nhờ gió đồi hay vọng âm từ đền đài như sách cũ từng viết, mà do các bậc ghế đá vôi xếp nếp hoạt động như bộ lọc tần số thấp tự nhiên, triệt tiêu tiếng ồn nền dưới 500 Hz và giúp âm sắc giọng nói tần số cao truyền rõ tới hàng ghế thứ 55.',
      questions: [
        {
          id: 'ielts-list-ex-4-q1',
          question: 'What earlier explanation for Epidaurus’s clear sound was disproved in 2007?',
          options: [
            'Hollow bronze jars buried beneath the central stage',
            'Stepped stone rows blocking background wind',
            'Actors projecting only at high volume',
            'Hillside breezes and reflections from nearby stone temples',
          ],
          correctIdx: 3,
          explanation:
            'Nghiên cứu năm 2007 bác bỏ giả thuyết cũ cho rằng gió đồi thuận lợi hay tiếng vọng từ các ngôi đền đá lân cận tạo nên âm thanh rõ.',
        },
        {
          id: 'ielts-list-ex-4-q2',
          question: 'How do the stepped limestone rows function acoustically?',
          options: [
            'They amplify every frequency below 500 hertz.',
            'They act as a natural filter that cancels low-frequency background noise.',
            'They trap high-pitched voices at the bottom of the stage.',
            'They absorb all sound waves completely to stop echoes.',
          ],
          correctIdx: 1,
          explanation:
            'Các hàng ghế đá vôi bậc thang hoạt động như bộ lọc tần số thấp tự nhiên, triệt tiêu tiếng gió và tiếng xì xào nền dưới 500 Hz.',
        },
        {
          id: 'ielts-list-ex-4-q3',
          question: 'What physical mechanism eliminates wind and crowd murmurs in the theater?',
          options: [
            'Atmospheric pressure drops above row fifty',
            'Thermal rising air above the limestone',
            'Destructive wave interference off the corrugated stone steps',
            'Resonance inside underground water channels',
          ],
          correctIdx: 2,
          explanation:
            'Khi sóng âm tần số thấp chạm vào các bậc đá gợn sóng, hiện tượng giao thoa triệt tiêu ("destructive interference") làm chúng biến mất.',
        },
        {
          id: 'ielts-list-ex-4-q4',
          question: 'Why does human speech remain audible up to the fifty-fifth row?',
          options: [
            'Higher-frequency vocal harmonics travel up the slope without being masked by low noise.',
            'Actors stand inside curved wooden shells.',
            'The audience is strictly forbidden from whispering.',
            'Limestone vibrates like a giant speaker cone.',
          ],
          correctIdx: 0,
          explanation:
            'Các họa âm tần số cao của giọng nói người dội sạch lên dốc ghế mà không bị tiếng ồn nền che lấp ("unmasked").',
        },
        {
          id: 'ielts-list-ex-4-q5',
          question: 'What happened when modern engineers placed soft cushions on similar stone steps?',
          options: [
            'Vocal clarity improved by another twenty percent.',
            'Low-frequency wind noise became even quieter.',
            'The cushions amplified temple echoes from outside.',
            'The natural noise-filtering effect disappeared due to upholstery absorption.',
          ],
          correctIdx: 3,
          explanation:
            'Đệm bọc êm hấp thụ phản xạ âm thay vì tán xạ chúng, khiến hiệu ứng lọc nhiễu tự nhiên biến mất ("this filtering effect vanished").',
        },
      ],
    },
  ],

  writing: [
    {
      id: 'ielts-write-ex-1',
      taskLabel: 'Writing Task 1 (Academic)',
      title: 'Public Library Visits vs. E-Book Loans in Metro City (2015–2025)',
      recommendedMinutes: 20,
      wordCountRange: '155 – 195 từ',
      minWords: 150,
      prompt:
        'The table below shows annual figures (in thousands) for in-person public library visits, printed book loans, and digital e-book loans in Metro City between 2015 and 2025.\n• In-person visits: 2015 = 620k | 2020 = 410k | 2025 = 490k\n• Printed book loans: 2015 = 840k | 2020 = 520k | 2025 = 470k\n• Digital e-book loans: 2015 = 110k | 2020 = 390k | 2025 = 640k\nSummarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      promptVi:
        'Viết báo cáo Task 1 mô tả bảng số liệu về lượt khách đến thư viện trực tiếp, lượt mượn sách giấy và lượt mượn sách điện tử (nghìn lượt) tại Metro City qua 3 mốc năm 2015, 2020 và 2025.',
      outline: [
        'Introduction: Paraphrase bảng số liệu (đơn vị nghìn lượt, 3 hạng mục trong giai đoạn 2015–2025).',
        'Overview: Sách điện tử tăng trưởng bùng nổ và vượt lên dẫn đầu vào năm 2025; ngược lại mượn sách giấy giảm liên tục, còn lượt đến trực tiếp giảm mạnh năm 2020 rồi phục hồi một phần.',
        'Body 1 (Digital vs. Printed loans): So sánh sự đảo ngược vị thế — sách in giảm từ 840k xuống 470k trong khi e-book tăng gần gấp 6 lần từ 110k lên 640k.',
        'Body 2 (In-person visits): Lượt ghé thăm giảm từ 620k xuống đáy 410k năm 2020 trước khi hồi phục lên 490k năm 2025 (vẫn thấp hơn mốc 2015).',
      ],
      scoringCriteriaFocus: [
        'Task Achievement: Nêu rõ xu hướng đảo chiều giữa sách giấy và e-book trong Overview.',
        'Coherence & Cohesion: Nhóm số liệu theo sự đối lập xu hướng thay vì đọc từng năm rời rạc.',
        'Lexical Resource: Dùng chính xác "overtook", "rebounded", "nearly sixfold", "steady contraction".',
      ],
      highBandKeywords: [
        { phrase: 'experienced a nearly sixfold increase', meaningVi: 'tăng gần gấp sáu lần' },
        { phrase: 'overtook printed loans', meaningVi: 'vượt qua lượt mượn sách in' },
        { phrase: 'steady downward trajectory', meaningVi: 'quỹ đạo đi xuống liên tục' },
        { phrase: 'rebounded partially', meaningVi: 'phục hồi một phần' },
        { phrase: 'dipped to a trough of', meaningVi: 'giảm xuống mức đáy là' },
        { phrase: 'remained well below', meaningVi: 'vẫn thấp hơn đáng kể so với' },
      ],
      modelAnswer:
        'The table compares annual public library activity in Metro City across three categories—in-person visits, printed book borrowing, and digital e-book loans—in 2015, 2020, and 2025.\n\nOverall, reading habits shifted decisively toward digital formats over the decade. While digital e-book loans surged continuously to become the highest figure by 2025, printed book loans followed a steady downward trajectory. Meanwhile, physical visits fell sharply in 2020 before recovering partially by the end of the period.\n\nIn 2015, printed books dominated library circulation at 840,000 loans, nearly eight times the figure for e-books (110,000). Over the next ten years, however, physical borrowing contracted steadily to 520,000 in 2020 and 470,000 in 2025. By contrast, e-book borrowing experienced a nearly sixfold increase, climbing to 390,000 in 2020 and reaching 640,000 in 2025, when it comfortably overtook printed loans.\n\nIn-person library visits showed a V-shaped fluctuation. Starting at 620,000 in 2015, attendance dipped to a trough of 410,000 in 2020, likely reflecting temporary shifts in public habits, before rebounding to 490,000 in 2025—still 130,000 visits below its initial level.',
      modelNotesVi:
        'Bài mẫu ~185 từ, không suy đoán nguyên nhân ngoài bảng ("likely reflecting" chỉ dùng rất nhẹ, an toàn hơn là mô tả thuần số liệu), làm nổi bật sự đổi ngôi năm 2025.',
    },
    {
      id: 'ielts-write-ex-2',
      taskLabel: 'Writing Task 1 (Academic)',
      title: 'Packaging Material Recycling Rates in Four Categories (2012 vs. 2024)',
      recommendedMinutes: 20,
      wordCountRange: '150 – 190 từ',
      minWords: 150,
      prompt:
        'The bar chart data compares recycling rates (as a percentage of total waste generated) for four household packaging materials in a European nation in 2012 and 2024.\n• Paper & Cardboard: 2012 = 64% | 2024 = 78%\n• Glass Containers: 2012 = 52% | 2024 = 70%\n• Metal Cans: 2012 = 45% | 2024 = 66%\n• Plastic Film & Wrappers: 2012 = 14% | 2024 = 29%\nSummarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.',
      promptVi:
        'Tóm tắt và so sánh tỷ lệ tái chế (%) của 4 nhóm bao bì gia đình (Giấy/bìa cứng, Thủy tinh, Lon kim loại, Màng nhựa) tại một nước châu Âu giữa năm 2012 và 2024.',
      outline: [
        'Introduction: Paraphrase nội dung so sánh tỷ lệ tái chế 4 loại bao bì vào 2012 và 2024.',
        'Overview: Tỷ lệ tái chế tăng ở tất cả vật liệu; Giấy/bìa cứng luôn cao nhất, trong khi Màng nhựa thấp nhất dù tăng hơn gấp đôi.',
        'Body 1 (Top three materials): Giấy tăng 14 điểm phần trăm lên 78%; Thủy tinh tăng từ 52% lên 70%; Lon kim loại có mức tăng tuyệt đối mạnh nhất (từ 45% lên 66%).',
        'Body 2 (Plastic outlier): Màng nhựa tăng hơn gấp đôi từ 14% lên 29% nhưng vẫn chưa tới một nửa mức của lon kim loại.',
      ],
      scoringCriteriaFocus: [
        'Task Achievement: Sử dụng đúng khái niệm "percentage points" khi trừ hai số phần trăm.',
        'Coherence & Cohesion: Nhóm 3 vật liệu có tỷ lệ cao vào 1 đoạn và tách riêng nhựa làm điểm đối lập.',
        'Grammar: Kết hợp mệnh đề quan hệ không xác định và cụm phân từ ("climbing by 21 percentage points").',
      ],
      highBandKeywords: [
        { phrase: 'recorded universal gains', meaningVi: 'ghi nhận mức tăng đồng loạt' },
        { phrase: 'percentage points', meaningVi: 'điểm phần trăm (hiệu số giữa hai tỷ lệ %)' },
        { phrase: 'more than doubled', meaningVi: 'tăng hơn gấp đôi' },
        { phrase: 'the widest margin of improvement', meaningVi: 'biên độ cải thiện lớn nhất' },
        { phrase: 'trailed far behind', meaningVi: 'tụt lại khá xa phía sau' },
        { phrase: 'exceeded two-thirds', meaningVi: 'vượt ngưỡng hai phần ba (66,7%)' },
      ],
      modelAnswer:
        'The data illustrates the proportion of four household packaging materials—paper and cardboard, glass containers, metal cans, and plastic film—that were recycled in a European country in 2012 and 2024.\n\nOverall, recycling performance recorded universal gains across all four categories over the twelve-year span. Paper and cardboard maintained the highest recovery rate in both years, whereas plastic film trailed far behind the other materials despite doubling in relative terms.\n\nAmong the higher-performing materials, paper and cardboard rose from 64% in 2012 to 78% in 2024, retaining its leading position. Glass containers followed a similar upward path, advancing by 18 percentage points to reach 70%. Notably, metal cans posted the widest margin of improvement among traditional recyclables, jumping 21 percentage points from 45% to 66%.\n\nIn stark contrast, plastic film and wrappers remained the least recycled category throughout the period. Although its recycling rate more than doubled from a low base of 14% in 2012 to 29% in 2024, that final figure was still well below half the rate achieved for metal cans.',
      modelNotesVi:
        'Bài mẫu ~175 từ, phân biệt chuẩn xác giữa tăng theo tỷ lệ tương đối ("more than doubled" từ 14% lên 29%) và tăng theo điểm phần trăm ("21 percentage points" cho kim loại).',
    },
    {
      id: 'ielts-write-ex-3',
      taskLabel: 'Writing Task 2 (Academic Essay)',
      title: 'Practical Job Training vs. Pure Academic Research in Universities',
      recommendedMinutes: 40,
      wordCountRange: '260 – 310 từ',
      minWords: 250,
      prompt:
        'Some people believe that universities should focus primarily on equipping students with practical skills for the job market, while others argue that their core mission is advancing pure academic knowledge and research. Discuss both views and give your own opinion. Write at least 250 words.',
      promptVi:
        'Một số người cho rằng đại học nên tập trung trang bị kỹ năng nghề nghiệp thực tiễn, trong khi ý kiến khác cho rằng sứ mệnh cốt lõi là nghiên cứu và phát triển tri thức hàn lâm thuần túy. Thảo luận cả hai quan điểm và nêu ý kiến cá nhân.',
      outline: [
        'Introduction: Giới thiệu tranh luận về vai trò của đại học + khẳng định lập trường cân bằng (đào tạo nghề nghiệp rất cần thiết cho sinh viên, nhưng nghiên cứu nền tảng vẫn phải là trụ cột không thể thay thế).',
        'Body 1 (View 1 - Job-market skills): Áp lực học phí cao khiến sinh viên kỳ vọng khả năng có việc làm ngay; thực tập và kỹ năng số giúp rút ngắn khoảng cách với doanh nghiệp.',
        'Body 2 (View 2 + Personal Opinion - Pure Research): Nhiều đột phá y học và công nghệ (vaccine, bán dẫn, thuật toán) bắt nguồn từ nghiên cứu cơ bản không nhằm mục đích thương mại tức thì; nếu đại học chỉ dạy nghề sẽ đánh mất nguồn tri thức dài hạn.',
        'Conclusion: Tóm tắt hai chiều và đề xuất đại học nên kết hợp giảng dạy ứng dụng với bảo vệ ngân sách nghiên cứu cơ bản.',
      ],
      scoringCriteriaFocus: [
        'Task Response: Trả lời đủ cả 3 yêu cầu (thảo luận vế 1, thảo luận vế 2, và nêu rõ quan điểm cá nhân).',
        'Coherence & Cohesion: Lập luận từng đoạn chặt chẽ theo mô hình PEEL.',
        'Lexical Resource: Vốn từ giáo dục đại học tự nhiên ("employability", "curiosity-driven inquiry", "vocational training", "long-term breakthroughs").',
      ],
      highBandKeywords: [
        { phrase: 'tuition debt', meaningVi: 'gánh nặng nợ học phí' },
        { phrase: 'employability prospects', meaningVi: 'triển vọng có việc làm' },
        { phrase: 'curiosity-driven research', meaningVi: 'nghiên cứu thuần túy xuất phát từ khám phá khoa học' },
        { phrase: 'immediate commercial payoff', meaningVi: 'lợi ích thương mại tức thì' },
        { phrase: 'short-sighted compromise', meaningVi: 'sự đánh đổi thiển cận' },
        { phrase: 'dual mandate', meaningVi: 'sứ mệnh kép' },
      ],
      modelAnswer:
        'As university tuition rises globally, debate has intensified over whether higher education should prioritize vocational readiness or pure scholarly inquiry. While equipping graduates for employment is an undeniable social responsibility, I believe that abandoning curiosity-driven research in favor of narrow job training would be a short-sighted compromise.\n\nAdvocates of career-focused curricula raise valid economic concerns. Because many students take on substantial tuition debt, families naturally expect degrees to yield strong employability prospects upon graduation. Incorporating coding bootcamps, industry internships, and project-management workshops bridges the gap between lecture halls and modern workplaces, sparing employers months of basic onboarding and helping young adults achieve financial independence sooner.\n\nNevertheless, universities remain uniquely positioned to pursue pure academic research that private corporations rarely fund. Breakthroughs in areas such as mRNA medicine, renewable battery chemistry, and foundational computing originated in university laboratories with no immediate commercial payoff. If higher education institutions operated strictly as trade schools teaching today’s software tools—which often become obsolete within five years—society would eventually run short of the scientific discoveries that create tomorrow’s industries. Moreover, critical thinking and experimental rigor gained through theoretical study actually make graduates more adaptable when job markets shift.\n\nIn conclusion, universities serve society best through a dual mandate. Although practical career preparation should be woven into undergraduate programs, safeguarding pure academic research must remain at the heart of higher education so that short-term market demands do not erode long-term human progress.',
      modelNotesVi:
        'Bài mẫu ~265 từ, xử lý cân bằng dạng "Discuss both views and give your opinion", tránh cực đoan mà đưa ra lập luận thực tế (công nghệ hôm nay lỗi thời sau 5 năm, còn nghiên cứu cơ bản tạo ra ngành nghề tương lai).',
    },
    {
      id: 'ielts-write-ex-4',
      taskLabel: 'Writing Task 2 (Academic Essay)',
      title: 'Causes and Solutions for Chronic Sleep Deprivation in Cities',
      recommendedMinutes: 40,
      wordCountRange: '260 – 310 từ',
      minWords: 250,
      prompt:
        'In many modern cities, a growing proportion of adults regularly sleep fewer hours than recommended by health experts. What are the main causes of this trend, and what measures can individuals and employers take to address it? Write at least 250 words.',
      promptVi:
        'Tại nhiều đô thị hiện đại, ngày càng nhiều người trưởng thành ngủ ít hơn mức khuyến nghị của chuyên gia y tế. Nguyên nhân chính của xu hướng này là gì, và cá nhân cùng doanh nghiệp có thể áp dụng những giải pháp nào?',
      outline: [
        'Introduction: Paraphrase thực trạng thiếu ngủ mãn tính ở đô thị + nêu rõ bài viết sẽ phân tích nguyên nhân (áp lực kết nối số & thời gian đi lại) và giải pháp từ hai phía (cá nhân & doanh nghiệp).',
        'Body 1 (Causes): Văn hóa làm việc luôn trực tuyến ("always-on culture") xóa nhòa ranh giới giờ nghỉ; cộng thêm thời gian kẹt xe kéo dài và thói quen dùng thiết bị phát ánh sáng xanh khuya.',
        'Body 2 (Solutions - Individuals & Employers): Cá nhân thiết lập giờ tắt màn hình ("digital curfew") và cố định giờ ngủ; doanh nghiệp áp dụng quy định "right to disconnect" (không gửi tin nhắn công việc sau giờ làm) và giờ làm linh hoạt tránh kẹt xe.',
        'Conclusion: Tóm gọn nguyên nhân lối sống/công việc và khẳng định cần phối hợp thay đổi từ cả nhân viên lẫn tổ chức.',
      ],
      scoringCriteriaFocus: [
        'Task Response: Trả lời đủ hai phần câu hỏi (Causes + Solutions cho cả cá nhân VÀ doanh nghiệp).',
        'Coherence & Cohesion: Liên kết mượt mà giữa nguyên nhân ở Body 1 và giải pháp tương ứng ở Body 2.',
        'Lexical Resource: Từ vựng y tế & lao động chính xác ("circadian rhythm", "always-on work culture", "digital curfew", "right to disconnect").',
      ],
      highBandKeywords: [
        { phrase: 'chronic sleep deprivation', meaningVi: 'tình trạng thiếu ngủ mãn tính' },
        { phrase: 'always-on work culture', meaningVi: 'văn hóa làm việc trực tuyến liên tục' },
        { phrase: 'disrupt circadian rhythms', meaningVi: 'làm rối loạn nhịp sinh học' },
        { phrase: 'prolonged daily commutes', meaningVi: 'thời gian di chuyển đi làm kéo dài' },
        { phrase: 'digital curfew', meaningVi: 'giờ giới nghiêm thiết bị điện tử trước khi ngủ' },
        { phrase: 'right-to-disconnect policies', meaningVi: 'chính sách quyền ngắt kết nối ngoài giờ làm' },
      ],
      modelAnswer:
        'Chronic sleep deprivation has quietly become a hallmark of contemporary urban life, with millions of working adults routinely sacrificing rest to keep pace with city schedules. This troubling trend stems largely from extended work expectations and evening screen habits, yet practical adjustments by both individuals and employers can substantially restore healthy sleep.\n\nTwo interconnected pressures explain why urbanites sleep less than previous generations. First, an "always-on" work culture fueled by smartphones blurs the boundary between office hours and private recovery time; employees who feel obliged to reply to late-night emails remain mentally alert well past midnight. Second, prolonged daily commutes in congested cities compress free evening hours into a narrow window, prompting tired workers to stay up late scrolling social media or streaming shows—a habit that exposes the brain to blue light and disrupts natural circadian rhythms.\n\nAddressing this deficit requires coordinated action rather than willpower alone. On a personal level, individuals can adopt a strict digital curfew at least forty-five minutes before bed, leaving phones outside the bedroom and maintaining consistent wake-up times even on weekends. Equally important, forward-thinking employers should enact formal right-to-disconnect policies that prohibit non-urgent messages after evening hours, while offering staggered or hybrid schedules so staff spend less time trapped in rush-hour traffic.\n\nIn conclusion, urban sleep loss is driven not merely by personal choices but by demanding schedules and constant digital connectivity. Only by pairing disciplined household routines with humane workplace boundaries can city residents reclaim the rest essential for long-term health.',
      modelNotesVi:
        'Bài mẫu ~270 từ, trả lời cân đối cả hai vế "individuals and employers" theo đúng đề bài Two-part Causes & Solutions.',
    },
  ],

  speaking: [
    {
      id: 'ielts-speak-ex-1',
      partLabel: 'Speaking Part 1',
      title: 'Reading Habits & Digital News',
      prepTimeText: 'Trả lời ngay',
      speakTimeText: '20 – 30 giây / câu',
      prompt:
        '1. Do you prefer reading physical books or e-books?\n2. How do you usually keep up with daily news?\n3. Did you read more or less when you were a child?',
      promptVi:
        'Trả lời tự nhiên 2–3 câu cho mỗi ý: chọn lập trường rõ ràng + giải thích ngắn + một ví dụ đời thực.',
      sampleAnswer:
        'For leisure novels, I still lean toward paperbacks because turning physical pages gives my eyes a break after staring at a laptop all day. However, for daily news, I rely on curated morning podcasts and a couple of trusted news apps during my commute rather than buying newspapers. Looking back, I probably read more fiction as a child because I had fewer digital distractions and used to spend whole Sunday afternoons borrowing comic books and adventure stories from our local library.',
      highScoreVocab: [
        { phrase: 'lean toward paperbacks', meaningVi: 'nghiêng về sách giấy bìa mềm hơn' },
        { phrase: 'give my eyes a break', meaningVi: 'cho mắt được nghỉ ngơi' },
        { phrase: 'curated morning podcasts', meaningVi: 'podcast buổi sáng được chọn lọc' },
        { phrase: 'digital distractions', meaningVi: 'những yếu tố gây xao nhãng từ thiết bị số' },
      ],
      deliveryTips: [
        'Dùng cụm chuyển ý tự nhiên như "For leisure novels...", "Looking back..." để phân tách 3 câu hỏi rõ ràng.',
        'Tránh nói "I like reading because it is good for me"; hãy nêu lý do cụ thể ("gives my eyes a break").',
      ],
    },
    {
      id: 'ielts-speak-ex-2',
      partLabel: 'Speaking Part 2 (Cue Card)',
      title: 'A Public Place Where You Like to Relax or Study',
      prepTimeText: '1 phút chuẩn bị',
      speakTimeText: '1.5 – 2 phút nói liên tục',
      prompt: 'Describe a public place in your town or city where you enjoy relaxing or studying.',
      cuePoints: [
        'Where this place is located',
        'What it looks like and what facilities it offers',
        'How often you go there and what you usually do',
        'And explain why you find it better than other places',
      ],
      promptVi: 'Triển khai trọn vẹn 4 ý Cue Card bằng mô tả giác quan (ánh sáng, âm thanh, không gian) để đạt điểm Fluency & Lexical Resource cao.',
      sampleAnswer:
        'A public spot I genuinely love spending time in is the newly renovated municipal library overlooking the central lake in my city. It sits just a ten-minute walk from the nearest metro stop, so getting there on weekends is effortless. Unlike the cramped, dim reading rooms of the past, the building features floor-to-ceiling glass windows that flood the upper floor with soft daylight and frame a peaceful view of willow trees along the water. Inside, there is a quiet reading zone with ergonomic wooden desks, power outlets at every seat, and a small sunlit balcony where visitors can step out for fresh air. I usually head there every Saturday morning for about three hours to read academic articles or organize my weekly notes. What makes it far superior to a trendy café is the unspoken sense of shared focus: everyone around you is quietly absorbed in their own work, there is zero background pop music, and you never feel pressured to keep buying overpriced drinks just to keep your seat.',
      highScoreVocab: [
        { phrase: 'floor-to-ceiling glass windows', meaningVi: 'cửa kính lớn từ sàn lên trần' },
        { phrase: 'ergonomic wooden desks', meaningVi: 'bàn gỗ thiết kế công thái học thoải mái' },
        { phrase: 'unspoken sense of shared focus', meaningVi: 'không khí tập trung chung đầy tự giác' },
        { phrase: 'absorbed in their own work', meaningVi: 'đắm mình vào công việc riêng' },
      ],
      deliveryTips: [
        'Mô tả hình ảnh cụ thể ("willow trees along the water", "sunlit balcony") giúp bài nói sống động thay vì liệt kê khô khan.',
        'Đoạn kết giải thích lý do bằng cách so sánh trực tiếp với quán cà phê để kéo dài câu trả lời tự nhiên.',
      ],
    },
    {
      id: 'ielts-speak-ex-3',
      partLabel: 'Speaking Part 3 (Discussion)',
      title: 'Public Libraries, Urban Spaces & Social Cohesion',
      prepTimeText: 'Trả lời ngay',
      speakTimeText: '40 – 60 giây',
      prompt:
        'Why are free public spaces like parks and libraries still essential in an era when most entertainment and information are available online?',
      promptVi:
        'Phân tích ở tầm xã hội: nhấn mạnh vai trò công bằng tiếp cận (không cần trả phí) và gắn kết cộng đồng giữa các thế hệ.',
      sampleAnswer:
        'Even though smartphones give us instant access to information, digital platforms cannot replace physical "third places" where people do not have to spend money just to exist. Free parks and libraries act as social equalizers: retirees reading morning papers, students preparing for exams, and young parents attending weekend storytimes all share the same safe environment regardless of income. Without well-maintained public spaces, city life quickly becomes segregated into commercial malls that exclude lower-income residents, which weakens neighborhood trust and worsens urban loneliness.',
      highScoreVocab: [
        { phrase: 'social equalizers', meaningVi: 'không gian tạo sự bình đẳng xã hội' },
        { phrase: 'regardless of income', meaningVi: 'không phân biệt mức thu nhập' },
        { phrase: 'commercial malls', meaningVi: 'trung tâm thương mại thuần túy tiêu dùng' },
        { phrase: 'neighborhood trust', meaningVi: 'sự tin cậy và gắn kết trong khu dân cư' },
      ],
      deliveryTips: [
        'Áp dụng A.R.E.A: Nêu luận điểm ("cannot replace physical third places") → Giải thích → Ví dụ nhóm người dùng → Hệ quả nếu thiếu.',
        'Phát âm rõ các cụm danh từ học thuật và ngắt nhịp nhẹ trước mệnh đề quan hệ.',
      ],
    },
    {
      id: 'ielts-speak-ex-4',
      partLabel: 'Speaking Part 2 (Cue Card)',
      title: 'A Difficult Decision That Turned Out Well',
      prepTimeText: '1 phút chuẩn bị',
      speakTimeText: '1.5 – 2 phút nói liên tục',
      prompt: 'Describe an important decision you made that felt difficult at first but led to a positive outcome.',
      cuePoints: [
        'What the decision was and when you made it',
        'Why it was hard to make at the time',
        'What actions you took afterward',
        'And explain why you are glad you made that choice',
      ],
      promptVi: 'Kể mạch lạc theo trục thời gian: Bối cảnh phân vân → Bước ngoặt quyết định → Hành động cụ thể → Thành quả.',
      sampleAnswer:
        'One tough decision that ultimately transformed my confidence was turning down a comfortable full-time retail job right after graduation so I could spend four months completing an intensive data-analytics internship instead. At the time, the choice felt terrifying. Most of my classmates were already earning steady monthly salaries, while the internship offered only a modest travel stipend and zero guarantee of a permanent contract afterward. My parents were understandably anxious about the financial uncertainty too. Once I committed, though, I treated those four months like a crash course: I arrived early to shadow senior analysts, volunteered to clean messy spreadsheets nobody wanted to touch, and documented every project carefully in an online portfolio. By the end of the third month, the team offered me a junior analyst position—not just with higher pay than the retail role, but in a field where I genuinely see long-term growth. Looking back, choosing short-term discomfort over immediate safety taught me not to let fear dictate my career direction.',
      highScoreVocab: [
        { phrase: 'modest travel stipend', meaningVi: 'khoản phụ cấp đi lại khiêm tốn' },
        { phrase: 'shadow senior analysts', meaningVi: 'quan sát và học việc trực tiếp từ chuyên viên cao cấp' },
        { phrase: 'short-term discomfort', meaningVi: 'sự bất tiện/khó khăn ngắn hạn' },
        { phrase: 'dictate my career direction', meaningVi: 'chi phối định hướng nghề nghiệp của tôi' },
      ],
      deliveryTips: [
        'Kiểm soát chính xác thì quá khứ đơn ("felt", "offered", "committed", "arrived") xuyên suốt phần kể chuyện.',
        'Kết bài bằng một bài học ngắn gọn ("Looking back, choosing...") tạo cảm giác trọn vẹn.',
      ],
    },
  ],

  mockTests: [
    {
      title: 'Mini Mock Test #2',
      description: 'Đề thi thử IELTS 25 câu (Listening Parts 1–4, 2 bài Academic Reading, Vocab & Grammar Band 6.5–8.0) — 30 phút.',
      durationMinutes: 30,
      questions: [
        {
          id: 'ielts-mock-2-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Q1–Q2)',
          audioScript:
            'Clerk: Good morning, Regional Rail Desk. Caller: Hi, I need a seven-day commuter pass starting Monday. Clerk: Our standard seven-day pass is 68 dollars. However, if you buy it before 5 PM today, the early-bird rate drops to 58 dollars. Caller: Great, can I collect it at Platform 4? Clerk: Platform 4’s booth is unmanned on Mondays; please pick it up from the North Concourse window, opposite the pharmacy.',
          question: 'How much will the caller pay for the seven-day pass if bought before 5 PM today?',
          options: ['$54', '$58', '$62', '$68'],
          correctIdx: 1,
          explanation: 'Giá chuẩn là $68, nhưng mua trước 5 giờ chiều hôm nay được hưởng mức ưu đãi early-bird là $58.',
        },
        {
          id: 'ielts-mock-2-q2',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Q1–Q2)',
          audioScript:
            'Clerk: Good morning, Regional Rail Desk. Caller: Hi, I need a seven-day commuter pass starting Monday. Clerk: Our standard seven-day pass is 68 dollars. However, if you buy it before 5 PM today, the early-bird rate drops to 58 dollars. Caller: Great, can I collect it at Platform 4? Clerk: Platform 4’s booth is unmanned on Mondays; please pick it up from the North Concourse window, opposite the pharmacy.',
          question: 'Where should the caller collect the pass?',
          options: [
            'At Platform 4’s ticket booth',
            'Inside the station pharmacy',
            'From the automated machine on Platform 2',
            'At the North Concourse window',
          ],
          correctIdx: 3,
          explanation: 'Quầy Platform 4 không có nhân viên trực vào Thứ Hai nên nhân viên hướng dẫn nhận vé tại cửa sổ North Concourse.',
        },
        {
          id: 'ielts-mock-2-q3',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Q3–Q4)',
          audioScript:
            'Host: Welcome to the City Planetarium evening program. Please note that tonight’s 8:30 PM rooftop telescope viewing has been cancelled due to incoming cloud cover. Instead, we have added an extra 3D dome show about Saturn’s rings at 8:15 PM in the Main Dome. Meanwhile, our Meteorite Gallery on the basement level will stay open an extra forty-five minutes until 9:45 PM.',
          question: 'Why was the rooftop telescope session cancelled tonight?',
          options: [
            'Heavy cloud cover is moving in.',
            'The rooftop elevator is under repair.',
            'Too few visitors registered in advance.',
            'Cold winds damaged the main lens.',
          ],
          correctIdx: 0,
          explanation: 'Người dẫn chương trình thông báo buổi ngắm kính thiên văn trên sân thượng bị hủy vì mây kéo đến ("due to incoming cloud cover").',
        },
        {
          id: 'ielts-mock-2-q4',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Q3–Q4)',
          audioScript:
            'Host: Welcome to the City Planetarium evening program. Please note that tonight’s 8:30 PM rooftop telescope viewing has been cancelled due to incoming cloud cover. Instead, we have added an extra 3D dome show about Saturn’s rings at 8:15 PM in the Main Dome. Meanwhile, our Meteorite Gallery on the basement level will stay open an extra forty-five minutes until 9:45 PM.',
          question: 'What replacement activity has the planetarium added at 8:15 PM?',
          options: [
            'A lecture on Mars rovers in the basement',
            'A virtual reality walk in the lobby',
            'An extra 3D dome show on Saturn’s rings',
            'A guided tour of the Meteorite Gallery',
          ],
          correctIdx: 2,
          explanation: 'Thay cho hoạt động sân thượng, nhà thiên văn mở thêm suất chiếu vòm 3D về các vành đai Sao Thổ lúc 8:15 PM.',
        },
        {
          id: 'ielts-mock-2-q5',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Q5–Q6)',
          audioScript:
            'Maya: Ben, our linguistics professor warned that interviewing only twenty university students will skew our regional slang study toward young speakers. Ben: Fair enough. If we add twenty older residents from the neighborhood community center, we balance age groups without blowing our two-week schedule. Maya: Agreed. Also, remember to collect signed audio-release forms before hitting record—two volunteers forgot last semester and had to delete half their tapes.',
          question: 'How do Maya and Ben decide to fix the age bias in their sample?',
          options: [
            'By shortening each interview to five minutes',
            'By replacing all university students with retired speakers',
            'By adding twenty older residents from a community center',
            'By using an anonymous online multiple-choice quiz',
          ],
          correctIdx: 2,
          explanation: 'Ben đề xuất thêm 20 cư dân lớn tuổi từ trung tâm cộng đồng để cân bằng độ tuổi mà không trễ hạn hai tuần.',
        },
        {
          id: 'ielts-mock-2-q6',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Q5–Q6)',
          audioScript:
            'Maya: Ben, our linguistics professor warned that interviewing only twenty university students will skew our regional slang study toward young speakers. Ben: Fair enough. If we add twenty older residents from the neighborhood community center, we balance age groups without blowing our two-week schedule. Maya: Agreed. Also, remember to collect signed audio-release forms before hitting record—two volunteers forgot last semester and had to delete half their tapes.',
          question: 'Why does Maya remind Ben about signed audio-release forms?',
          options: [
            'Without prior consent, recorded interviews may have to be deleted.',
            'The community center charges a fee for every signed form.',
            'Professor Miller grades the handwriting on the forms.',
            'Participants receive gift vouchers only after signing.',
          ],
          correctIdx: 0,
          explanation: 'Kỳ trước hai tình nguyện viên quên xin chữ ký đồng ý ghi âm nên phải xóa mất một nửa số băng ("had to delete half their tapes").',
        },
        {
          id: 'ielts-mock-2-q7',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Q7–Q8)',
          audioScript:
            'Lecturer: Dark asphalt roads and tar roofs absorb up to ninety percent of incoming solar radiation, driving urban heat island spikes of four degrees Celsius above surrounding farmland. Coating flat commercial roofs with high-albedo white membranes reflects sunlight back into the sky, cutting peak summer cooling bills by fifteen percent. However, in cold northern cities, this year-round reflectivity can slightly raise winter heating demand because roofs no longer absorb free daytime winter warmth.',
          question: 'How do high-albedo white roof coatings cool commercial buildings in summer?',
          options: [
            'They trap moisture inside concrete slabs.',
            'They power rooftop solar cooling fans.',
            'They vent warm indoor air through tar chimneys.',
            'They reflect incoming solar radiation away from the building.',
          ],
          correctIdx: 3,
          explanation: 'Màng phủ trắng có độ phản xạ cao (high-albedo) phản chiếu ánh nắng trở lại bầu trời, giúp giảm 15% hóa đơn làm mát mùa hè.',
        },
        {
          id: 'ielts-mock-2-q8',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Q7–Q8)',
          audioScript:
            'Lecturer: Dark asphalt roads and tar roofs absorb up to ninety percent of incoming solar radiation, driving urban heat island spikes of four degrees Celsius above surrounding farmland. Coating flat commercial roofs with high-albedo white membranes reflects sunlight back into the sky, cutting peak summer cooling bills by fifteen percent. However, in cold northern cities, this year-round reflectivity can slightly raise winter heating demand because roofs no longer absorb free daytime winter warmth.',
          question: 'What drawback of white roofs does the lecturer mention for cold northern cities?',
          options: [
            'Snow melts too rapidly and floods gutters.',
            'They can slightly increase winter heating needs by reflecting winter sun.',
            'White membranes peel off in sub-zero humidity.',
            'Dark asphalt nearby becomes even hotter.',
          ],
          correctIdx: 1,
          explanation: 'Vào mùa đông ở các thành phố lạnh phía Bắc, mái trắng phản xạ cả ánh nắng ban ngày nên làm tăng nhẹ nhu cầu sưởi ấm.',
        },
        {
          id: 'ielts-mock-2-q9',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Engineered bamboo is emerging as a credible structural complement to steel and concrete in mid-rise architecture. Unlike raw bamboo poles, which vary widely in diameter and taper along their length, laminated bamboo lumber is manufactured by slicing culms into uniform strips, drying them to remove sugars that attract insects, and pressing them with low-emission adhesives into dense rectangular beams. Strength tests reveal that laminated bamboo rivals structural softwood in compression while boasting a higher tensile strength-to-weight ratio than mild steel. Equally compelling is its rapid harvest cycle: whereas temperate oak requires half a century to mature, structural bamboo species regenerate to full height within four to six years without replanting. Nonetheless, building codes in many Western municipalities remain cautious, demanding costly multi-hour fire-resistance certifications before approving bamboo load-bearing frames for multi-story public buildings.',
          question: 'Why are bamboo strips dried and treated before being pressed into structural beams?',
          options: [
            'To remove natural sugars that would otherwise attract pests',
            'To make the beams curve gracefully for arched bridges',
            'To turn the bamboo poles hollow for electrical wiring',
            'To increase the weight of each beam above steel',
          ],
          correctIdx: 0,
          explanation: 'Đoạn văn nêu rõ các thanh tre được sấy khô để loại bỏ đường tự nhiên vốn dễ thu hút côn trùng ("remove sugars that attract insects").',
        },
        {
          id: 'ielts-mock-2-q10',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Engineered bamboo is emerging as a credible structural complement to steel and concrete in mid-rise architecture. Unlike raw bamboo poles, which vary widely in diameter and taper along their length, laminated bamboo lumber is manufactured by slicing culms into uniform strips, drying them to remove sugars that attract insects, and pressing them with low-emission adhesives into dense rectangular beams. Strength tests reveal that laminated bamboo rivals structural softwood in compression while boasting a higher tensile strength-to-weight ratio than mild steel. Equally compelling is its rapid harvest cycle: whereas temperate oak requires half a century to mature, structural bamboo species regenerate to full height within four to six years without replanting. Nonetheless, building codes in many Western municipalities remain cautious, demanding costly multi-hour fire-resistance certifications before approving bamboo load-bearing frames for multi-story public buildings.',
          question: 'What mechanical advantage does laminated bamboo possess compared with mild steel?',
          options: [
            'It melts at much higher furnace temperatures.',
            'It does not require adhesives during production.',
            'It achieves a superior tensile strength relative to its weight.',
            'It resists fire for longer periods without certification.',
          ],
          correctIdx: 2,
          explanation: 'Thử nghiệm độ bền cho thấy tre ép có tỷ lệ cường độ chịu kéo trên trọng lượng cao hơn thép mềm ("higher tensile strength-to-weight ratio than mild steel").',
        },
        {
          id: 'ielts-mock-2-q11',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Engineered bamboo is emerging as a credible structural complement to steel and concrete in mid-rise architecture. Unlike raw bamboo poles, which vary widely in diameter and taper along their length, laminated bamboo lumber is manufactured by slicing culms into uniform strips, drying them to remove sugars that attract insects, and pressing them with low-emission adhesives into dense rectangular beams. Strength tests reveal that laminated bamboo rivals structural softwood in compression while boasting a higher tensile strength-to-weight ratio than mild steel. Equally compelling is its rapid harvest cycle: whereas temperate oak requires half a century to mature, structural bamboo species regenerate to full height within four to six years without replanting. Nonetheless, building codes in many Western municipalities remain cautious, demanding costly multi-hour fire-resistance certifications before approving bamboo load-bearing frames for multi-story public buildings.',
          question: 'Why does the author compare structural bamboo to temperate oak?',
          options: [
            'To show that oak beams are cheaper to glue together',
            'To highlight bamboo’s dramatically faster regeneration cycle',
            'To explain why oak attracts fewer insects',
            'To argue that bamboo cannot grow in rainy climates',
          ],
          correctIdx: 1,
          explanation: 'Tác giả đối chiếu gỗ sồi mất 50 năm ("half a century") với tre chỉ cần 4–6 năm để tái sinh hoàn toàn mà không cần trồng lại.',
        },
        {
          id: 'ielts-mock-2-q12',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Engineered bamboo is emerging as a credible structural complement to steel and concrete in mid-rise architecture. Unlike raw bamboo poles, which vary widely in diameter and taper along their length, laminated bamboo lumber is manufactured by slicing culms into uniform strips, drying them to remove sugars that attract insects, and pressing them with low-emission adhesives into dense rectangular beams. Strength tests reveal that laminated bamboo rivals structural softwood in compression while boasting a higher tensile strength-to-weight ratio than mild steel. Equally compelling is its rapid harvest cycle: whereas temperate oak requires half a century to mature, structural bamboo species regenerate to full height within four to six years without replanting. Nonetheless, building codes in many Western municipalities remain cautious, demanding costly multi-hour fire-resistance certifications before approving bamboo load-bearing frames for multi-story public buildings.',
          question: 'In this passage, the word "taper" refers to raw bamboo poles:',
          options: [
            'splitting easily in dry storage',
            'absorbing excess rainwater',
            'bending under heavy snow',
            'gradually narrowing toward one end',
          ],
          correctIdx: 3,
          explanation: '"Vary widely in diameter and taper along their length" mô tả cây tre thô có đường kính không đều và thuôn nhỏ dần dọc thân.',
        },
        {
          id: 'ielts-mock-2-q13',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Engineered bamboo is emerging as a credible structural complement to steel and concrete in mid-rise architecture. Unlike raw bamboo poles, which vary widely in diameter and taper along their length, laminated bamboo lumber is manufactured by slicing culms into uniform strips, drying them to remove sugars that attract insects, and pressing them with low-emission adhesives into dense rectangular beams. Strength tests reveal that laminated bamboo rivals structural softwood in compression while boasting a higher tensile strength-to-weight ratio than mild steel. Equally compelling is its rapid harvest cycle: whereas temperate oak requires half a century to mature, structural bamboo species regenerate to full height within four to six years without replanting. Nonetheless, building codes in many Western municipalities remain cautious, demanding costly multi-hour fire-resistance certifications before approving bamboo load-bearing frames for multi-story public buildings.',
          question: 'What currently slows wider adoption of load-bearing bamboo frames in Western public buildings?',
          options: [
            'Shortage of skilled foresters to slice bamboo strips',
            'Public preference for bright metallic skyscrapers',
            'Expensive fire-safety testing required by local building regulations',
            'Inability of laminated bamboo to support compression loads',
          ],
          correctIdx: 2,
          explanation: 'Câu cuối cho biết quy chuẩn xây dựng ở nhiều đô thị phương Tây đòi hỏi chứng nhận chống cháy kéo dài nhiều giờ rất tốn kém.',
        },
        {
          id: 'ielts-mock-2-q14',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'Contrary to the old assumption that sleep simply gives a tired brain passive rest, modern neuroimaging demonstrates that deep slow-wave sleep functions as an active filing clerk. During waking hours, newly learned vocabulary, routes, and motor sequences reside temporarily in the hippocampus—a fast-recording neural buffer with limited capacity. Once a person enters deep non-REM sleep, synchronized slow electrical oscillations coordinate brief bursts of activity called sleep spindles, replaying the day’s hippocampal traces at accelerated speed and transferring them into distributed networks across the neocortex for durable storage. Crucially, this transfer depends on uninterrupted sleep architecture: volunteers woken repeatedly every ninety minutes retained facts far more poorly than peers sleeping the same total hours in one continuous block. For learners cramming before exams, pulling an all-nighter may keep notes in short-term view, yet forfeits the very neural consolidation required for recall weeks later.',
          question: 'What role does the hippocampus play during waking hours according to the passage?',
          options: [
            'It serves as a temporary, limited-capacity storage buffer for new memories.',
            'It blocks slow electrical oscillations during daytime study.',
            'It permanently stores every vocabulary word without sleep.',
            'It generates sleep spindles while a person is reading notes.',
          ],
          correctIdx: 0,
          explanation: 'Đoạn văn mô tả hồi hải mã (hippocampus) là bộ đệm thần kinh ghi nhanh tạm thời với dung lượng giới hạn ("fast-recording neural buffer with limited capacity").',
        },
        {
          id: 'ielts-mock-2-q15',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'Contrary to the old assumption that sleep simply gives a tired brain passive rest, modern neuroimaging demonstrates that deep slow-wave sleep functions as an active filing clerk. During waking hours, newly learned vocabulary, routes, and motor sequences reside temporarily in the hippocampus—a fast-recording neural buffer with limited capacity. Once a person enters deep non-REM sleep, synchronized slow electrical oscillations coordinate brief bursts of activity called sleep spindles, replaying the day’s hippocampal traces at accelerated speed and transferring them into distributed networks across the neocortex for durable storage. Crucially, this transfer depends on uninterrupted sleep architecture: volunteers woken repeatedly every ninety minutes retained facts far more poorly than peers sleeping the same total hours in one continuous block. For learners cramming before exams, pulling an all-nighter may keep notes in short-term view, yet forfeits the very neural consolidation required for recall weeks later.',
          question: 'How do "sleep spindles" assist long-term memory?',
          options: [
            'By erasing unused motor sequences from the neocortex',
            'By waking sleepers briefly every ninety minutes',
            'By slowing down brain activity to prevent dreaming',
            'By replaying hippocampal memories rapidly and shifting them to the neocortex',
          ],
          correctIdx: 3,
          explanation: 'Sleep spindles phát lại dấu vết ký ức từ hippocampus ở tốc độ nhanh và chuyển sang mạng lưới vỏ não mới (neocortex) để lưu trữ bền vững.',
        },
        {
          id: 'ielts-mock-2-q16',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'Contrary to the old assumption that sleep simply gives a tired brain passive rest, modern neuroimaging demonstrates that deep slow-wave sleep functions as an active filing clerk. During waking hours, newly learned vocabulary, routes, and motor sequences reside temporarily in the hippocampus—a fast-recording neural buffer with limited capacity. Once a person enters deep non-REM sleep, synchronized slow electrical oscillations coordinate brief bursts of activity called sleep spindles, replaying the day’s hippocampal traces at accelerated speed and transferring them into distributed networks across the neocortex for durable storage. Crucially, this transfer depends on uninterrupted sleep architecture: volunteers woken repeatedly every ninety minutes retained facts far more poorly than peers sleeping the same total hours in one continuous block. For learners cramming before exams, pulling an all-nighter may keep notes in short-term view, yet forfeits the very neural consolidation required for recall weeks later.',
          question: 'What did the experiment waking volunteers every ninety minutes demonstrate?',
          options: [
            'Total sleep duration matters far more than sleep continuity.',
            'Fragmented sleep weakens memory retention even when total sleep hours match.',
            'Waking periodically strengthens the hippocampus.',
            'Ninety-minute naps are superior to overnight sleep.',
          ],
          correctIdx: 1,
          explanation: 'Nhóm bị đánh thức mỗi 90 phút ghi nhớ kém hơn hẳn nhóm ngủ liền mạch cùng tổng thời lượng ("uninterrupted sleep architecture").',
        },
        {
          id: 'ielts-mock-2-q17',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'Contrary to the old assumption that sleep simply gives a tired brain passive rest, modern neuroimaging demonstrates that deep slow-wave sleep functions as an active filing clerk. During waking hours, newly learned vocabulary, routes, and motor sequences reside temporarily in the hippocampus—a fast-recording neural buffer with limited capacity. Once a person enters deep non-REM sleep, synchronized slow electrical oscillations coordinate brief bursts of activity called sleep spindles, replaying the day’s hippocampal traces at accelerated speed and transferring them into distributed networks across the neocortex for durable storage. Crucially, this transfer depends on uninterrupted sleep architecture: volunteers woken repeatedly every ninety minutes retained facts far more poorly than peers sleeping the same total hours in one continuous block. For learners cramming before exams, pulling an all-nighter may keep notes in short-term view, yet forfeits the very neural consolidation required for recall weeks later.',
          question: 'In the final sentence, the word "forfeits" is closest in meaning to:',
          options: ['accelerates', 'verifies', 'duplicates', 'gives up or loses'],
          correctIdx: 3,
          explanation: '"Forfeits the very neural consolidation" có nghĩa là đánh mất / tự tước bỏ quá trình củng cố thần kinh cần thiết.',
        },
        {
          id: 'ielts-mock-2-q18',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'Contrary to the old assumption that sleep simply gives a tired brain passive rest, modern neuroimaging demonstrates that deep slow-wave sleep functions as an active filing clerk. During waking hours, newly learned vocabulary, routes, and motor sequences reside temporarily in the hippocampus—a fast-recording neural buffer with limited capacity. Once a person enters deep non-REM sleep, synchronized slow electrical oscillations coordinate brief bursts of activity called sleep spindles, replaying the day’s hippocampal traces at accelerated speed and transferring them into distributed networks across the neocortex for durable storage. Crucially, this transfer depends on uninterrupted sleep architecture: volunteers woken repeatedly every ninety minutes retained facts far more poorly than peers sleeping the same total hours in one continuous block. For learners cramming before exams, pulling an all-nighter may keep notes in short-term view, yet forfeits the very neural consolidation required for recall weeks later.',
          question: 'What practical advice for students can be inferred from the passage?',
          options: [
            'Study exclusively during slow-wave sleep using audio tapes.',
            'Prioritize continuous overnight sleep rather than staying awake all night before tests.',
            'Set an alarm every ninety minutes to review flashcards.',
            'Avoid learning new vocabulary in the afternoon.',
          ],
          correctIdx: 1,
          explanation: 'Thức trắng đêm ôn thi có thể giữ kiến thức ngắn hạn nhưng đánh mất sự củng cố trí nhớ dài hạn, nên ngủ liền mạch vẫn hiệu quả hơn.',
        },
        {
          id: 'ielts-mock-2-q19',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Select the best collocation for a Task 2 essay: "Strict zoning laws alone cannot _____ housing affordability without increasing construction supply."',
          options: ['guarantee', 'exaggerate', 'confiscate', 'deteriorate'],
          correctIdx: 0,
          explanation: '"Guarantee housing affordability" (đảm bảo khả năng chi trả nhà ở) là cụm động-danh từ chính xác nhất về nghĩa và văn phong.',
        },
        {
          id: 'ielts-mock-2-q20',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Choose the accurate phrase for Writing Task 1: "Between 2010 and 2015, coal consumption fell slightly before _____ a steep decline over the following decade."',
          options: ['inventing', 'colliding with', 'undergoing', 'persuading'],
          correctIdx: 2,
          explanation: '"Undergoing a steep decline" (trải qua một đợt giảm mạnh) là collocation chuẩn Band 7.5+ trong mô tả xu hướng biểu đồ.',
        },
        {
          id: 'ielts-mock-2-q21',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Which adjective best fits the sentence: "Although driverless shuttles show promise, widespread deployment remains _____ until sensor costs fall."',
          options: ['unanimous', 'unviable', 'redundant', 'hospitable'],
          correctIdx: 1,
          explanation: '"Unviable" (không khả thi về kinh tế/vận hành) phù hợp hoàn toàn với điều kiện chi phí cảm biến chưa giảm.',
        },
        {
          id: 'ielts-mock-2-q22',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Choose the closest academic synonym for "worsen" in: "Unplanned coastal development can worsen seasonal flooding."',
          options: ['rectify', 'alleviate', 'stabilize', 'exacerbate'],
          correctIdx: 3,
          explanation: '"Exacerbate" nghĩa là làm trầm trọng thêm (một vấn đề tiêu cực như lũ lụt), thường xuyên xuất hiện trong Writing & Reading.',
        },
        {
          id: 'ielts-mock-2-q23',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Which sentence correctly uses a relative clause to refer to an entire preceding clause?',
          options: [
            'Train fares rose twice last year, that frustrated many daily commuters.',
            'Train fares rose twice last year, what frustrated many daily commuters.',
            'Train fares rose twice last year, which frustrated many daily commuters.',
            'Train fares rose twice last year, which it frustrated many daily commuters.',
          ],
          correctIdx: 2,
          explanation: 'Dùng dấu phẩy + "which" (không dùng "that", "what" hay lặp đại từ "it") để thay thế cho cả mệnh đề đứng trước.',
        },
        {
          id: 'ielts-mock-2-q24',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Select the sentence with accurate subject-verb agreement in formal academic writing:',
          options: [
            'A growing number of municipal libraries now offer free coding workshops.',
            'The number of electric buses in service have doubled since 2021.',
            'Neither solar panels nor wind turbines alone solves seasonal storage.',
            'Each of the surveyed neighborhoods require upgraded drainage pipes.',
          ],
          correctIdx: 0,
          explanation: '"A growing number of + danh từ số nhiều" đi với động từ số nhiều ("offer"). Câu B sai vì "The number of" đi với số ít ("has"); C sai vì "turbines" số nhiều ("solve"); D sai vì "Each" đi với số ít ("requires").',
        },
        {
          id: 'ielts-mock-2-q25',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Which sentence uses "despite" / "although" accurately without structural errors?',
          options: [
            'Despite investing heavily in bus lanes, commuters still favored private cars.',
            'Despite of heavy investment in bus lanes, commuters still favored private cars.',
            'Although the heavy investment in bus lanes, commuters still favored private cars.',
            'Despite the city invested heavily in bus lanes, commuters still favored private cars.',
          ],
          correctIdx: 0,
          explanation: '"Despite" đi với V-ing hoặc cụm danh từ ("Despite investing heavily..."), không có "of" và không đi trực tiếp với mệnh đề S+V.',
        },
      ],
    },
    {
      title: 'Mini Mock Test #3',
      description: 'Đề thi thử IELTS 25 câu (Listening Parts 1–4, 2 bài Academic Reading, Vocab & Grammar Band 6.5–8.0) — 30 phút.',
      durationMinutes: 30,
      questions: [
        {
          id: 'ielts-mock-3-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Q1–Q2)',
          audioScript:
            'Organizer: Hi, thanks for calling the Bridgeview Language Exchange. Caller: I would like to join Thursday’s Spanish conversation table. Organizer: Sure! Normally we meet in Room 204, though because of a choir rehearsal next door we have relocated to Room 312 on the third floor. Just bring a photo ID to pick up your free visitor badge at the reception desk—annual membership is optional at 25 dollars.',
          question: 'In which room will Thursday’s Spanish conversation table meet?',
          options: ['Room 204', 'Room 214', 'Room 312', 'The ground-floor reception'],
          correctIdx: 2,
          explanation: 'Vì phòng bên cạnh có buổi tập hợp xướng nên nhóm chuyển từ Room 204 lên Room 312 tầng ba.',
        },
        {
          id: 'ielts-mock-3-q2',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Q1–Q2)',
          audioScript:
            'Organizer: Hi, thanks for calling the Bridgeview Language Exchange. Caller: I would like to join Thursday’s Spanish conversation table. Organizer: Sure! Normally we meet in Room 204, though because of a choir rehearsal next door we have relocated to Room 312 on the third floor. Just bring a photo ID to pick up your free visitor badge at the reception desk—annual membership is optional at 25 dollars.',
          question: 'What must the caller bring to receive a free visitor badge?',
          options: [
            'A photo identification card',
            '25 dollars in cash',
            'A Spanish textbook',
            'A printed registration receipt',
          ],
          correctIdx: 0,
          explanation: 'Ban tổ chức dặn chỉ cần mang giấy tờ tùy thân có ảnh ("a photo ID") để nhận thẻ khách miễn phí tại lễ tân.',
        },
        {
          id: 'ielts-mock-3-q3',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Q3–Q4)',
          audioScript:
            'Ranger: Welcome to Reed Marsh Wildlife Sanctuary. Please stay strictly on the raised timber boardwalk—the West Reed Path is closed until July to protect nesting herons. Binoculars are available to borrow free at the Visitor Hut until 3:30 PM. Finally, the return electric shuttle leaves the South Gate at 4:45 PM sharp, not 5:00 PM as printed on older trail brochures.',
          question: 'Why is the West Reed Path closed to visitors until July?',
          options: [
            'Flooding damaged the wooden planks.',
            'Electric shuttles use that route for deliveries.',
            'The Visitor Hut is being moved there.',
            'Herons are nesting along that section.',
          ],
          correctIdx: 3,
          explanation: 'Lối đi West Reed đóng đến tháng Bảy để bảo vệ đàn diệc đang làm tổ ("protect nesting herons").',
        },
        {
          id: 'ielts-mock-3-q4',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Q3–Q4)',
          audioScript:
            'Ranger: Welcome to Reed Marsh Wildlife Sanctuary. Please stay strictly on the raised timber boardwalk—the West Reed Path is closed until July to protect nesting herons. Binoculars are available to borrow free at the Visitor Hut until 3:30 PM. Finally, the return electric shuttle leaves the South Gate at 4:45 PM sharp, not 5:00 PM as printed on older trail brochures.',
          question: 'What time does the return electric shuttle actually depart?',
          options: ['3:30 PM', '4:45 PM', '5:00 PM', '5:15 PM'],
          correctIdx: 1,
          explanation: 'Kiểm lâm lưu ý xe điện quay về khởi hành đúng 4:45 PM, không phải 5:00 PM như tờ rơi cũ in sai.',
        },
        {
          id: 'ielts-mock-3-q5',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Q5–Q6)',
          audioScript:
            'Nora: Liam, our tutor praised the courtyard layout on our architecture scale model, yet she thought the balsa-wood staircase looked slightly bulky. Liam: Yeah, slicing thinner cardboard strips for the steps would make it cleaner. What about her comment on lighting? Nora: She suggested placing a warm LED strip beneath the roof overhang rather than shining a bright desk lamp from above, which washed out the window details.',
          question: 'How does Liam suggest improving the staircase on their scale model?',
          options: [
            'Removing the staircase from the courtyard entirely',
            'Replacing balsa wood with thinner cardboard strips',
            'Painting the balsa wood a darker shade',
            'Adding an LED bulb under each step',
          ],
          correctIdx: 1,
          explanation: 'Liam đề nghị cắt các dải bìa cứng mỏng hơn ("thinner cardboard strips") để cầu thang gọn gàng hơn gỗ balsa.',
        },
        {
          id: 'ielts-mock-3-q6',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Q5–Q6)',
          audioScript:
            'Nora: Liam, our tutor praised the courtyard layout on our architecture scale model, yet she thought the balsa-wood staircase looked slightly bulky. Liam: Yeah, slicing thinner cardboard strips for the steps would make it cleaner. What about her comment on lighting? Nora: She suggested placing a warm LED strip beneath the roof overhang rather than shining a bright desk lamp from above, which washed out the window details.',
          question: 'Why did the tutor dislike using a bright desk lamp above the model?',
          options: [
            'It melted the glue on the roof overhang.',
            'It cast dark shadows over the courtyard.',
            'It consumed too much studio electricity.',
            'It bleached out the fine details around the windows.',
          ],
          correctIdx: 3,
          explanation: 'Đèn bàn chiếu mạnh từ trên xuống làm nhòa các chi tiết cửa sổ ("washed out the window details").',
        },
        {
          id: 'ielts-mock-3-q7',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Q7–Q8)',
          audioScript:
            'Lecturer: Forest trees rarely grow in solitary competition. Beneath the leaf litter, threadlike mycorrhizal fungi link the roots of mature trees and shaded seedlings into vast subterranean exchange networks. In this symbiosis, tall canopy trees—which capture abundant sunlight—supply carbon sugars to the fungi, while fungal filaments mine soil phosphorus and water far more efficiently than tree roots alone. Remarkably, isotope-tracing experiments show shaded saplings receiving measurable carbon transfers from older neighboring trees, improving survival in dense forest undergrowth.',
          question: 'What do tall canopy trees provide to mycorrhizal fungi in this symbiosis?',
          options: [
            'Carbon sugars produced through sunlight',
            'Deep soil phosphorus minerals',
            'Protective layers of fallen leaf litter',
            'Extra rainwater from upper branches',
          ],
          correctIdx: 0,
          explanation: 'Cây tầng tán cao đón nhiều nắng cung cấp đường carbon ("supply carbon sugars") cho nấm rễ cộng sinh.',
        },
        {
          id: 'ielts-mock-3-q8',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Q7–Q8)',
          audioScript:
            'Lecturer: Forest trees rarely grow in solitary competition. Beneath the leaf litter, threadlike mycorrhizal fungi link the roots of mature trees and shaded seedlings into vast subterranean exchange networks. In this symbiosis, tall canopy trees—which capture abundant sunlight—supply carbon sugars to the fungi, while fungal filaments mine soil phosphorus and water far more efficiently than tree roots alone. Remarkably, isotope-tracing experiments show shaded saplings receiving measurable carbon transfers from older neighboring trees, improving survival in dense forest undergrowth.',
          question: 'How were scientists able to confirm that older trees transfer carbon to shaded saplings?',
          options: [
            'By measuring sapling height every morning',
            'By digging up entire mature oak roots',
            'Through isotope-tracing experiments',
            'By removing fungi from greenhouse pots',
          ],
          correctIdx: 2,
          explanation: 'Thí nghiệm đánh dấu đồng vị ("isotope-tracing experiments") chứng minh cây non dưới tán râm nhận được lượng carbon đo được từ cây trưởng thành.',
        },
        {
          id: 'ielts-mock-3-q9',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Before railways crisscrossed industrial Europe, inland canals served as the primary arteries for hauling coal, timber, and grain. Following the rise of motorways in the mid-twentieth century, thousands of kilometers of narrow waterways fell into disrepair or were repurposed strictly for leisure boating. Recently, however, logistics planners in countries such as the Netherlands, Belgium, and France have begun dredging forgotten canals and installing electric lock gates to shift bulk freight off congested highways. A single modern river barge can carry the equivalent of thirty-five heavy trucks while emitting roughly a quarter of the carbon dioxide per ton-kilometer. Although water transport cannot match highway speeds for perishable groceries, it excels for non-urgent building materials—sand, steel coils, and recycled glass—whose delivery schedules can tolerate a two-day journey. The main bottleneck remains "last-mile" transfers: unless factories sit directly beside wharves, cargo must be craned onto trucks at port terminals, eroding cost savings unless urban transshipment hubs are modernized.',
          question: 'Why did many European canals stop carrying industrial cargo in the mid-twentieth century?',
          options: [
            'Electric lock gates malfunctioned frequently.',
            'Coal and timber mines closed simultaneously.',
            'Leisure boats were banned from entering ports.',
            'Expanding highway networks drew freight away from waterways.',
          ],
          correctIdx: 3,
          explanation: 'Đoạn văn nêu sau sự phát triển của đường cao tốc giữa thế kỷ 20 ("Following the rise of motorways"), hàng nghìn km kênh đào bị bỏ hoang hoặc chỉ dùng du ngoạn.',
        },
        {
          id: 'ielts-mock-3-q10',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Before railways crisscrossed industrial Europe, inland canals served as the primary arteries for hauling coal, timber, and grain. Following the rise of motorways in the mid-twentieth century, thousands of kilometers of narrow waterways fell into disrepair or were repurposed strictly for leisure boating. Recently, however, logistics planners in countries such as the Netherlands, Belgium, and France have begun dredging forgotten canals and installing electric lock gates to shift bulk freight off congested highways. A single modern river barge can carry the equivalent of thirty-five heavy trucks while emitting roughly a quarter of the carbon dioxide per ton-kilometer. Although water transport cannot match highway speeds for perishable groceries, it excels for non-urgent building materials—sand, steel coils, and recycled glass—whose delivery schedules can tolerate a two-day journey. The main bottleneck remains "last-mile" transfers: unless factories sit directly beside wharves, cargo must be craned onto trucks at port terminals, eroding cost savings unless urban transshipment hubs are modernized.',
          question: 'What environmental advantage does a modern river barge offer over road haulage?',
          options: [
            'It travels twice as fast as motorway trucks.',
            'It emits about 75% less CO2 per ton-kilometer than trucks.',
            'It eliminates the need for port cranes.',
            'It runs without dredging narrow canals.',
          ],
          correctIdx: 1,
          explanation: 'Một sà lan chở tương đương 35 xe tải nặng nhưng chỉ phát thải khoảng 1/4 lượng CO2 trên mỗi tấn-km (tức giảm ~75%).',
        },
        {
          id: 'ielts-mock-3-q11',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Before railways crisscrossed industrial Europe, inland canals served as the primary arteries for hauling coal, timber, and grain. Following the rise of motorways in the mid-twentieth century, thousands of kilometers of narrow waterways fell into disrepair or were repurposed strictly for leisure boating. Recently, however, logistics planners in countries such as the Netherlands, Belgium, and France have begun dredging forgotten canals and installing electric lock gates to shift bulk freight off congested highways. A single modern river barge can carry the equivalent of thirty-five heavy trucks while emitting roughly a quarter of the carbon dioxide per ton-kilometer. Although water transport cannot match highway speeds for perishable groceries, it excels for non-urgent building materials—sand, steel coils, and recycled glass—whose delivery schedules can tolerate a two-day journey. The main bottleneck remains "last-mile" transfers: unless factories sit directly beside wharves, cargo must be craned onto trucks at port terminals, eroding cost savings unless urban transshipment hubs are modernized.',
          question: 'Which goods are described as particularly well suited for restored canal freight?',
          options: [
            'Fresh dairy and chilled berries',
            'Express e-commerce parcels',
            'Heavy, non-perishable construction supplies',
            'Fragile laboratory instruments',
          ],
          correctIdx: 2,
          explanation: 'Đường thủy phù hợp với vật liệu xây dựng không khẩn cấp như cát, cuộn thép và thủy tinh tái chế ("non-urgent building materials").',
        },
        {
          id: 'ielts-mock-3-q12',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Before railways crisscrossed industrial Europe, inland canals served as the primary arteries for hauling coal, timber, and grain. Following the rise of motorways in the mid-twentieth century, thousands of kilometers of narrow waterways fell into disrepair or were repurposed strictly for leisure boating. Recently, however, logistics planners in countries such as the Netherlands, Belgium, and France have begun dredging forgotten canals and installing electric lock gates to shift bulk freight off congested highways. A single modern river barge can carry the equivalent of thirty-five heavy trucks while emitting roughly a quarter of the carbon dioxide per ton-kilometer. Although water transport cannot match highway speeds for perishable groceries, it excels for non-urgent building materials—sand, steel coils, and recycled glass—whose delivery schedules can tolerate a two-day journey. The main bottleneck remains "last-mile" transfers: unless factories sit directly beside wharves, cargo must be craned onto trucks at port terminals, eroding cost savings unless urban transshipment hubs are modernized.',
          question: 'What is the "last-mile" bottleneck mentioned at the end of the passage?',
          options: [
            'Extra cost and handling needed to move goods from river ports to inland factories',
            'Shortage of barge captains willing to work two-day shifts',
            'Noise complaints from residential houseboats',
            'High electricity prices at automated lock gates',
          ],
          correctIdx: 0,
          explanation: 'Nếu nhà máy không nằm sát bến tàu, hàng hóa phải cẩu lên xe tải ở cảng, làm giảm lợi thế tiết kiệm chi phí.',
        },
        {
          id: 'ielts-mock-3-q13',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Before railways crisscrossed industrial Europe, inland canals served as the primary arteries for hauling coal, timber, and grain. Following the rise of motorways in the mid-twentieth century, thousands of kilometers of narrow waterways fell into disrepair or were repurposed strictly for leisure boating. Recently, however, logistics planners in countries such as the Netherlands, Belgium, and France have begun dredging forgotten canals and installing electric lock gates to shift bulk freight off congested highways. A single modern river barge can carry the equivalent of thirty-five heavy trucks while emitting roughly a quarter of the carbon dioxide per ton-kilometer. Although water transport cannot match highway speeds for perishable groceries, it excels for non-urgent building materials—sand, steel coils, and recycled glass—whose delivery schedules can tolerate a two-day journey. The main bottleneck remains "last-mile" transfers: unless factories sit directly beside wharves, cargo must be craned onto trucks at port terminals, eroding cost savings unless urban transshipment hubs are modernized.',
          question: 'In this passage, "eroding" is closest in meaning to:',
          options: ['doubling', 'gradually reducing', 'certifying', 'postponing'],
          correctIdx: 1,
          explanation: '"Eroding cost savings" mang nghĩa làm xói mòn, giảm dần khoản tiết kiệm chi phí.',
        },
        {
          id: 'ielts-mock-3-q14',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'In theory, digital streaming platforms empower listeners and viewers with unprecedented autonomy: instead of settling for three television channels, subscribers browse tens of thousands of films and albums on demand. Yet behavioral psychologists observe a recurring irony known as choice overload. When confronted with excessive, poorly differentiated options, users spend twenty minutes scrolling through trailers, experience decision fatigue, and frequently abandon the menu without watching anything—or feel lingering regret afterward wondering if another title was superior. To counter this friction, platform engineers introduced personalized recommendation carousels and "play something" shuffle buttons. While algorithmic curation clearly boosts immediate viewing hours, media scholars warn that hyper-tailored feeds risk trapping audiences inside narrow aesthetic echo chambers, gradually shrinking exposure to unfamiliar international cinema or experimental music.',
          question: 'What is "choice overload" as described in the passage?',
          options: [
            'Paying simultaneously for too many monthly streaming subscriptions',
            'Buffering delays when thousands of users stream at once',
            'Disappointment caused by low video resolution on mobile screens',
            'Mental exhaustion and indecision caused by facing too many similar options',
          ],
          correctIdx: 3,
          explanation: 'Choice overload xảy ra khi đối mặt với quá nhiều lựa chọn na ná nhau, khiến người dùng mệt mỏi quyết định ("decision fatigue"), bỏ cuộc hoặc hối tiếc.',
        },
        {
          id: 'ielts-mock-3-q15',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'In theory, digital streaming platforms empower listeners and viewers with unprecedented autonomy: instead of settling for three television channels, subscribers browse tens of thousands of films and albums on demand. Yet behavioral psychologists observe a recurring irony known as choice overload. When confronted with excessive, poorly differentiated options, users spend twenty minutes scrolling through trailers, experience decision fatigue, and frequently abandon the menu without watching anything—or feel lingering regret afterward wondering if another title was superior. To counter this friction, platform engineers introduced personalized recommendation carousels and "play something" shuffle buttons. While algorithmic curation clearly boosts immediate viewing hours, media scholars warn that hyper-tailored feeds risk trapping audiences inside narrow aesthetic echo chambers, gradually shrinking exposure to unfamiliar international cinema or experimental music.',
          question: 'Why did streaming engineers add "play something" shuffle buttons?',
          options: [
            'To reduce friction and decision fatigue when browsing huge catalogs',
            'To force subscribers to watch live television commercials',
            'To delete old films automatically after thirty days',
            'To increase internet bandwidth speed during evening hours',
          ],
          correctIdx: 0,
          explanation: 'Các nút phát ngẫu nhiên và băng chuyền gợi ý được tạo ra để giảm ma sát lựa chọn ("counter this friction") khi kho nội dung quá lớn.',
        },
        {
          id: 'ielts-mock-3-q16',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'In theory, digital streaming platforms empower listeners and viewers with unprecedented autonomy: instead of settling for three television channels, subscribers browse tens of thousands of films and albums on demand. Yet behavioral psychologists observe a recurring irony known as choice overload. When confronted with excessive, poorly differentiated options, users spend twenty minutes scrolling through trailers, experience decision fatigue, and frequently abandon the menu without watching anything—or feel lingering regret afterward wondering if another title was superior. To counter this friction, platform engineers introduced personalized recommendation carousels and "play something" shuffle buttons. While algorithmic curation clearly boosts immediate viewing hours, media scholars warn that hyper-tailored feeds risk trapping audiences inside narrow aesthetic echo chambers, gradually shrinking exposure to unfamiliar international cinema or experimental music.',
          question: 'What concern do media scholars raise about algorithmic recommendation feeds?',
          options: [
            'They consistently recommend films that users dislike.',
            'They cause total viewing hours to collapse.',
            'They may limit cultural curiosity by repeatedly showing familiar genres.',
            'They make streaming interfaces visually slower to load.',
          ],
          correctIdx: 2,
          explanation: 'Học giả truyền thông cảnh báo gợi ý quá cá nhân hóa dễ nhốt khán giả vào "buồng vang thẩm mỹ" hẹp ("aesthetic echo chambers"), giảm tiếp xúc điện ảnh quốc tế hay nhạc thử nghiệm.',
        },
        {
          id: 'ielts-mock-3-q17',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'In theory, digital streaming platforms empower listeners and viewers with unprecedented autonomy: instead of settling for three television channels, subscribers browse tens of thousands of films and albums on demand. Yet behavioral psychologists observe a recurring irony known as choice overload. When confronted with excessive, poorly differentiated options, users spend twenty minutes scrolling through trailers, experience decision fatigue, and frequently abandon the menu without watching anything—or feel lingering regret afterward wondering if another title was superior. To counter this friction, platform engineers introduced personalized recommendation carousels and "play something" shuffle buttons. While algorithmic curation clearly boosts immediate viewing hours, media scholars warn that hyper-tailored feeds risk trapping audiences inside narrow aesthetic echo chambers, gradually shrinking exposure to unfamiliar international cinema or experimental music.',
          question: 'In this passage, "unprecedented" is closest in meaning to:',
          options: [
            'never experienced before',
            'strictly regulated',
            'temporarily expensive',
            'rarely appreciated',
          ],
          correctIdx: 0,
          explanation: '"Unprecedented autonomy" nghĩa là quyền tự chủ chưa từng có tiền lệ trước đây.',
        },
        {
          id: 'ielts-mock-3-q18',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'In theory, digital streaming platforms empower listeners and viewers with unprecedented autonomy: instead of settling for three television channels, subscribers browse tens of thousands of films and albums on demand. Yet behavioral psychologists observe a recurring irony known as choice overload. When confronted with excessive, poorly differentiated options, users spend twenty minutes scrolling through trailers, experience decision fatigue, and frequently abandon the menu without watching anything—or feel lingering regret afterward wondering if another title was superior. To counter this friction, platform engineers introduced personalized recommendation carousels and "play something" shuffle buttons. While algorithmic curation clearly boosts immediate viewing hours, media scholars warn that hyper-tailored feeds risk trapping audiences inside narrow aesthetic echo chambers, gradually shrinking exposure to unfamiliar international cinema or experimental music.',
          question: 'Which statement best captures the overall structure of the passage?',
          options: [
            'It compares ticket prices between cinemas and streaming apps.',
            'It traces the history of television broadcasting in the 1960s.',
            'It moves from limitless choice, to decision fatigue, to curation and its side effects.',
            'It argues that listeners should return exclusively to vinyl records.',
          ],
          correctIdx: 2,
          explanation: 'Bố cục đi từ sự tự do lựa chọn khổng lồ → nghịch lý quá tải lựa chọn → giải pháp thuật toán gợi ý và mặt trái thu hẹp gu thưởng thức.',
        },
        {
          id: 'ielts-mock-3-q19',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Choose the most natural academic collocation: "Expanding rural broadband access is vital to _____ regional economic disparities."',
          options: ['inflate', 'narrow', 'collide', 'disguise'],
          correctIdx: 1,
          explanation: '"Narrow regional disparities" (thu hẹp chênh lệch vùng miền) là collocation chuẩn xác trong IELTS Writing Task 2.',
        },
        {
          id: 'ielts-mock-3-q20',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Select the accurate Task 1 comparative phrase: "By 2024, wind power generated 38% of electricity, _____ hydroelectricity at just 19%."',
          options: [
            'doubled over',
            'shrinking to',
            'exceeded beneath',
            'roughly double the share of',
          ],
          correctIdx: 3,
          explanation: '38% bằng đúng gấp đôi 19%, nên cụm danh từ đồng vị "roughly double the share of hydroelectricity" vừa chuẩn ngữ pháp vừa súc tích.',
        },
        {
          id: 'ielts-mock-3-q21',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Which adjective means "lasting only for a short time; not permanent"?',
          options: ['perpetual', 'robust', 'transient', 'indigenous'],
          correctIdx: 2,
          explanation: '"Transient" (thoáng qua, ngắn hạn) thường dùng trong bài đọc học thuật (vd: transient job gains / transient climate effects).',
        },
        {
          id: 'ielts-mock-3-q22',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Choose the correct academic preposition: "Long-term urban planning must be rooted _____ reliable demographic projections."',
          options: ['in', 'toward', 'alongside', 'beyond'],
          correctIdx: 0,
          explanation: '"Be rooted in something" (bắt nguồn từ / dựa trên nền tảng vững chắc là gì) dùng giới từ "in".',
        },
        {
          id: 'ielts-mock-3-q23',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Which sentence correctly uses a reduced relative clause?',
          options: [
            'Applicants who submitting portfolios before June will receive early feedback.',
            'Applicants are submitting portfolios before June will receive early feedback.',
            'Applicants submitted portfolios before June will receive early feedback.',
            'Applicants submitting portfolios before June will receive early feedback.',
          ],
          correctIdx: 3,
          explanation: 'Rút gọn mệnh đề quan hệ chủ động ("who submit") thành cụm phân từ hiện tại "submitting".',
        },
        {
          id: 'ielts-mock-3-q24',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Select the sentence using "hardly... when" inversion accurately:',
          options: [
            'Hardly had the ferry departed than heavy fog rolled across the bay.',
            'Hardly had the ferry departed when heavy fog rolled across the bay.',
            'Hardly the ferry had departed when heavy fog rolled across the bay.',
            'Hardly did the ferry departed when heavy fog rolled across the bay.',
          ],
          correctIdx: 1,
          explanation: 'Cấu trúc đảo ngữ chuẩn là "Hardly + had + S + V3/ed + when + S + V2/ed" ("No sooner" mới đi với "than").',
        },
        {
          id: 'ielts-mock-3-q25',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Choose the sentence with accurate parallel structure for a Task 2 thesis statement:',
          options: [
            'Public transit subsidies lower household costs, ease congestion, and cutting urban emissions.',
            'Public transit subsidies lower household costs, ease congestion, and cut urban emissions.',
            'Public transit subsidies lowering household costs, ease congestion, and to cut urban emissions.',
            'Public transit subsidies lower household costs, easing congestion, and urban emissions are cut.',
          ],
          correctIdx: 1,
          explanation: 'Ba động từ song song cùng chia nguyên mẫu hiện tại số nhiều theo chủ ngữ "subsidies": "lower..., ease..., and cut...".',
        },
      ],
    },
    {
      title: 'Mini Mock Test #4',
      description: 'Đề thi thử IELTS 25 câu (Listening Parts 1–4, 2 bài Academic Reading, Vocab & Grammar Band 6.5–8.0) — 30 phút.',
      durationMinutes: 30,
      questions: [
        {
          id: 'ielts-mock-4-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Q1–Q2)',
          audioScript:
            'Instructor: Harbor Kayaks, this is Sam. Caller: Hi Sam, I booked Saturday’s beginner kayaking lesson—do I need to bring my own life vest? Instructor: No, paddles and life vests are included in the 45-dollar fee; just wear quick-dry shoes that can get wet. Caller: Got it. And we meet at Pier 2, right? Instructor: Actually, ferry maintenance blocked Pier 2 this morning, so please meet us at Pier 5 beside the red boathouse ten minutes before launch.',
          question: 'What does the caller need to wear or bring for the kayaking lesson?',
          options: [
            'A personal life vest',
            'An extra paddle',
            '45 dollars in cash for equipment rental',
            'Quick-dry shoes suitable for getting wet',
          ],
          correctIdx: 3,
          explanation: 'Áo phao và mái chèo đã bao gồm trong học phí $45; học viên chỉ cần đi giày mau khô có thể bị ướt.',
        },
        {
          id: 'ielts-mock-4-q2',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Q1–Q2)',
          audioScript:
            'Instructor: Harbor Kayaks, this is Sam. Caller: Hi Sam, I booked Saturday’s beginner kayaking lesson—do I need to bring my own life vest? Instructor: No, paddles and life vests are included in the 45-dollar fee; just wear quick-dry shoes that can get wet. Caller: Got it. And we meet at Pier 2, right? Instructor: Actually, ferry maintenance blocked Pier 2 this morning, so please meet us at Pier 5 beside the red boathouse ten minutes before launch.',
          question: 'Where should participants gather before launch?',
          options: [
            'At Pier 2 near the ferry gate',
            'At Pier 5 next to the red boathouse',
            'Inside the main harbor ticket hall',
            'On the beach south of Pier 5',
          ],
          correctIdx: 1,
          explanation: 'Bến số 2 đang bị chắn do bảo trì phà nên điểm tập trung chuyển sang Bến số 5 cạnh nhà thuyền màu đỏ.',
        },
        {
          id: 'ielts-mock-4-q3',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Q3–Q4)',
          audioScript:
            'Announcer: Attention shoppers at Central Public Market. While our North Wing skylight is being glazed this week, all handmade craft stalls have temporarily relocated to the covered West Plaza. Fresh produce vendors remain inside the main hall as usual. Also, please note that free evening parking in the underground garage now starts at 6:00 PM instead of 5:30 PM on weekdays.',
          question: 'Where can visitors find the handmade craft stalls this week?',
          options: [
            'Inside the North Wing skylight hall',
            'On the top floor of the parking garage',
            'In the covered West Plaza',
            'Along the fresh produce aisle',
          ],
          correctIdx: 2,
          explanation: 'Các gian hàng thủ công tạm thời dời sang quảng trường có mái che West Plaza trong thời gian lắp kính giếng trời North Wing.',
        },
        {
          id: 'ielts-mock-4-q4',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Q3–Q4)',
          audioScript:
            'Announcer: Attention shoppers at Central Public Market. While our North Wing skylight is being glazed this week, all handmade craft stalls have temporarily relocated to the covered West Plaza. Fresh produce vendors remain inside the main hall as usual. Also, please note that free evening parking in the underground garage now starts at 6:00 PM instead of 5:30 PM on weekdays.',
          question: 'What has changed about weekday evening parking in the underground garage?',
          options: [
            'Free parking now begins at 6:00 PM instead of 5:30 PM.',
            'Free evening parking has been cancelled on Fridays.',
            'Shoppers must validate tickets at produce stalls.',
            'Only electric cars may enter after 5:30 PM.',
          ],
          correctIdx: 0,
          explanation: 'Thông báo nêu rõ giờ gửi xe miễn phí buổi tối ngày thường lùi từ 5:30 PM sang 6:00 PM.',
        },
        {
          id: 'ielts-mock-4-q5',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Q5–Q6)',
          audioScript:
            'Owen: Chloe, we only have eight minutes for our marine microplastics presentation, and slide ten currently crams twenty-four tiny bibliography lines onto one screen. Chloe: True, nobody can read eight-point font from the back row. Let us replace that list with a clean QR code linking to our full reference sheet, and use high-contrast blue and orange bars on slide six so color-blind viewers can distinguish synthetic fibers from tire dust.',
          question: 'How do Owen and Chloe plan to fix slide ten?',
          options: [
            'Replace the tiny reference list with a QR code link',
            'Read all twenty-four sources aloud quickly',
            'Split the bibliography across four extra slides',
            'Remove all citations from their project completely',
          ],
          correctIdx: 0,
          explanation: 'Chloe đề nghị thay danh sách tài liệu tham khảo chữ nhỏ bằng mã QR dẫn tới danh mục đầy đủ.',
        },
        {
          id: 'ielts-mock-4-q6',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Q5–Q6)',
          audioScript:
            'Owen: Chloe, we only have eight minutes for our marine microplastics presentation, and slide ten currently crams twenty-four tiny bibliography lines onto one screen. Chloe: True, nobody can read eight-point font from the back row. Let us replace that list with a clean QR code linking to our full reference sheet, and use high-contrast blue and orange bars on slide six so color-blind viewers can distinguish synthetic fibers from tire dust.',
          question: 'Why does Chloe choose blue and orange bars for the chart on slide six?',
          options: [
            'They match the university’s official logo.',
            'Orange represents ocean water visually.',
            'High contrast helps color-blind audience members tell categories apart.',
            'Red and green ink costs more to print.',
          ],
          correctIdx: 2,
          explanation: 'Cặp màu xanh dương – cam có độ tương phản cao giúp khán giả mù màu phân biệt được sợi tổng hợp và bụi lốp xe.',
        },
        {
          id: 'ielts-mock-4-q7',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Q7–Q8)',
          audioScript:
            'Lecturer: Centuries before European sailors carried magnetic compasses across open oceans, Polynesian navigators crossed thousands of kilometers of the Pacific in double-hulled canoes. Rather than staring at instruments, master wayfinders memorized "star compasses"—tracking where key constellations rose and set along the horizon. When dense clouds hid the night sky, navigators crouched inside the canoe hull to feel subtle ocean swell patterns refracting around distant invisible islands, interpreting wave rhythm like a tactile map.',
          question: 'How did Polynesian wayfinders determine direction on clear nights?',
          options: [
            'By trailing weighted bronze compasses behind the canoe',
            'By memorizing where specific constellations rose and set on the horizon',
            'By following migrating whale pods strictly northward',
            'By lighting signal fires on floating bamboo rafts',
          ],
          correctIdx: 1,
          explanation: 'Các hoa tiêu Polynesia ghi nhớ "la bàn sao", theo dõi vị trí các chòm sao mọc và lặn dọc đường chân trời.',
        },
        {
          id: 'ielts-mock-4-q8',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Q7–Q8)',
          audioScript:
            'Lecturer: Centuries before European sailors carried magnetic compasses across open oceans, Polynesian navigators crossed thousands of kilometers of the Pacific in double-hulled canoes. Rather than staring at instruments, master wayfinders memorized "star compasses"—tracking where key constellations rose and set along the horizon. When dense clouds hid the night sky, navigators crouched inside the canoe hull to feel subtle ocean swell patterns refracting around distant invisible islands, interpreting wave rhythm like a tactile map.',
          question: 'What method did navigators rely on when clouds obscured the stars?',
          options: [
            'Dropping stone anchors until skies cleared',
            'Listening for thunder near coastal cliffs',
            'Measuring water salinity by taste every hour',
            'Sensing subtle ocean swell patterns refracting off distant islands',
          ],
          correctIdx: 3,
          explanation: 'Khi mây che kín sao, hoa tiêu cúi trong thân thuyền để cảm nhận nhịp sóng lừng khúc xạ quanh các hòn đảo xa.',
        },
        {
          id: 'ielts-mock-4-q9',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Over the past decade, community-run "Repair Cafés" have expanded from a single neighborhood initiative in Amsterdam into thousands of monthly pop-up workshops worldwide. At these volunteer-staffed events, residents bring broken toasters, torn winter coats, and sluggish laptops to fix them alongside retired electricians, seamstresses, and computer hobbyists over a cup of coffee. Beyond diverting heavy appliances from municipal landfills, Repair Cafés challenge what sociologists call "planned obsolescence"—the practice of gluing batteries shut or designing proprietary screws that make independent repairs impractical. Momentum from grassroots repair groups has gradually influenced national legislation: both the European Union and several North American jurisdictions have recently enacted "Right-to-Repair" rules requiring electronics manufacturers to publish diagnostic manuals and keep spare parts available for up to ten years after a product leaves store shelves. Critics from industry trade groups warn that mandatory spare-part stockpiles could slightly raise upfront retail prices, yet consumer advocates counter that extending a washing machine’s lifespan by four years yields far greater net savings for families.',
          question: 'What happens at a typical community Repair Café?',
          options: [
            'Manufacturers sell discounted new appliances to local residents.',
            'Municipal workers collect broken electronics for landfill disposal.',
            'Residents collaborate with skilled volunteers to mend household items together.',
            'Lawyers offer free legal advice on consumer warranty disputes.',
          ],
          correctIdx: 2,
          explanation: 'Đoạn văn mô tả người dân mang đồ hỏng đến sửa cùng các tình nguyện viên lành nghề như thợ điện về hưu và thợ may.',
        },
        {
          id: 'ielts-mock-4-q10',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Over the past decade, community-run "Repair Cafés" have expanded from a single neighborhood initiative in Amsterdam into thousands of monthly pop-up workshops worldwide. At these volunteer-staffed events, residents bring broken toasters, torn winter coats, and sluggish laptops to fix them alongside retired electricians, seamstresses, and computer hobbyists over a cup of coffee. Beyond diverting heavy appliances from municipal landfills, Repair Cafés challenge what sociologists call "planned obsolescence"—the practice of gluing batteries shut or designing proprietary screws that make independent repairs impractical. Momentum from grassroots repair groups has gradually influenced national legislation: both the European Union and several North American jurisdictions have recently enacted "Right-to-Repair" rules requiring electronics manufacturers to publish diagnostic manuals and keep spare parts available for up to ten years after a product leaves store shelves. Critics from industry trade groups warn that mandatory spare-part stockpiles could slightly raise upfront retail prices, yet consumer advocates counter that extending a washing machine’s lifespan by four years yields far greater net savings for families.',
          question: 'Which design choice is given as an example of "planned obsolescence"?',
          options: [
            'Gluing batteries shut and using proprietary screws to hinder repairs',
            'Printing diagnostic manuals on recycled paper',
            'Offering a ten-year supply of replacement parts',
            'Building heavier metal frames for kitchen toasters',
          ],
          correctIdx: 0,
          explanation: '"Planned obsolescence" được minh họa bằng việc dán keo kín pin hoặc dùng ốc vít độc quyền khiến việc tự sửa trở nên bất khả thi.',
        },
        {
          id: 'ielts-mock-4-q11',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Over the past decade, community-run "Repair Cafés" have expanded from a single neighborhood initiative in Amsterdam into thousands of monthly pop-up workshops worldwide. At these volunteer-staffed events, residents bring broken toasters, torn winter coats, and sluggish laptops to fix them alongside retired electricians, seamstresses, and computer hobbyists over a cup of coffee. Beyond diverting heavy appliances from municipal landfills, Repair Cafés challenge what sociologists call "planned obsolescence"—the practice of gluing batteries shut or designing proprietary screws that make independent repairs impractical. Momentum from grassroots repair groups has gradually influenced national legislation: both the European Union and several North American jurisdictions have recently enacted "Right-to-Repair" rules requiring electronics manufacturers to publish diagnostic manuals and keep spare parts available for up to ten years after a product leaves store shelves. Critics from industry trade groups warn that mandatory spare-part stockpiles could slightly raise upfront retail prices, yet consumer advocates counter that extending a washing machine’s lifespan by four years yields far greater net savings for families.',
          question: 'What do recent Right-to-Repair regulations require manufacturers to provide?',
          options: [
            'Free lifetime home repair visits by company engineers',
            'Monthly donations to local Amsterdam workshops',
            'Full cash refunds whenever a laptop slows down',
            'Diagnostic guides and replacement parts for up to a decade post-sale',
          ],
          correctIdx: 3,
          explanation: 'Luật Right-to-Repair buộc hãng điện tử công bố tài liệu chẩn đoán lỗi và duy trì linh kiện thay thế tối đa tới 10 năm sau khi ngừng bán.',
        },
        {
          id: 'ielts-mock-4-q12',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Over the past decade, community-run "Repair Cafés" have expanded from a single neighborhood initiative in Amsterdam into thousands of monthly pop-up workshops worldwide. At these volunteer-staffed events, residents bring broken toasters, torn winter coats, and sluggish laptops to fix them alongside retired electricians, seamstresses, and computer hobbyists over a cup of coffee. Beyond diverting heavy appliances from municipal landfills, Repair Cafés challenge what sociologists call "planned obsolescence"—the practice of gluing batteries shut or designing proprietary screws that make independent repairs impractical. Momentum from grassroots repair groups has gradually influenced national legislation: both the European Union and several North American jurisdictions have recently enacted "Right-to-Repair" rules requiring electronics manufacturers to publish diagnostic manuals and keep spare parts available for up to ten years after a product leaves store shelves. Critics from industry trade groups warn that mandatory spare-part stockpiles could slightly raise upfront retail prices, yet consumer advocates counter that extending a washing machine’s lifespan by four years yields far greater net savings for families.',
          question: 'How do consumer advocates respond to industry warnings about higher retail prices?',
          options: [
            'They suggest households stop buying washing machines entirely.',
            'They argue longer appliance lifespans save households more money overall.',
            'They agree that spare-part stockpiles are unnecessary.',
            'They recommend banning community repair volunteers.',
          ],
          correctIdx: 1,
          explanation: 'Người bảo vệ quyền lợi người tiêu dùng phản biện rằng kéo dài tuổi thọ máy giặt thêm 4 năm mang lại khoản tiết kiệm ròng lớn hơn nhiều cho gia đình.',
        },
        {
          id: 'ielts-mock-4-q13',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Over the past decade, community-run "Repair Cafés" have expanded from a single neighborhood initiative in Amsterdam into thousands of monthly pop-up workshops worldwide. At these volunteer-staffed events, residents bring broken toasters, torn winter coats, and sluggish laptops to fix them alongside retired electricians, seamstresses, and computer hobbyists over a cup of coffee. Beyond diverting heavy appliances from municipal landfills, Repair Cafés challenge what sociologists call "planned obsolescence"—the practice of gluing batteries shut or designing proprietary screws that make independent repairs impractical. Momentum from grassroots repair groups has gradually influenced national legislation: both the European Union and several North American jurisdictions have recently enacted "Right-to-Repair" rules requiring electronics manufacturers to publish diagnostic manuals and keep spare parts available for up to ten years after a product leaves store shelves. Critics from industry trade groups warn that mandatory spare-part stockpiles could slightly raise upfront retail prices, yet consumer advocates counter that extending a washing machine’s lifespan by four years yields far greater net savings for families.',
          question: 'In this passage, "proprietary" is closest in meaning to:',
          options: [
            'exclusively owned or patented by a company',
            'rust-resistant and durable',
            'cheaply mass-produced',
            'standardized across all brands',
          ],
          correctIdx: 0,
          explanation: '"Proprietary screws" là loại ốc vít thiết kế riêng độc quyền của hãng để thợ ngoài không có tua-vít mở được.',
        },
        {
          id: 'ielts-mock-4-q14',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'For four billion years, life on Earth evolved under a dependable rhythm of bright days and genuinely dark nights. Over the past century, however, artificial skyglow from unshielded streetlights, illuminated billboards, and glass office towers has washed out the night sky for more than eighty percent of the world’s population. Ecologists warn that this shift is far from harmless to wildlife. Newly hatched sea turtles, programmed by instinct to crawl toward the brightest horizon—historically moonlight reflecting off ocean waves—frequently turn inland toward beachfront hotel floodlights instead, leading to dehydration or traffic fatalities. Similarly, nocturnal pollinators such as hawkmoths reduce flower visits by over half in artificially lit meadows, indirectly lowering seed production in wild plants. Fortunately, light pollution differs from chemical contamination in one encouraging way: it leaves no lasting toxic residue. Switching municipal streetlights to downward-shielded, warm-amber LEDs equipped with motion dimmers cuts wasted skyglow immediately without compromising pedestrian safety.',
          question: 'Why do beachfront hotel floodlights endanger newly hatched sea turtles?',
          options: [
            'The heat from floodlights dries out buried turtle eggs.',
            'Adult turtles refuse to swim within ten kilometers of bright piers.',
            'Bright inland lights mislead hatchlings away from the moonlit ocean.',
            'Floodlights attract extra nocturnal moths to the beach.',
          ],
          correctIdx: 2,
          explanation: 'Rùa biển con có bản năng bò về phía đường chân trời sáng nhất (trước đây là ánh trăng trên mặt biển), nên đèn khách sạn ven biển khiến chúng bò ngược vào đất liền.',
        },
        {
          id: 'ielts-mock-4-q15',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'For four billion years, life on Earth evolved under a dependable rhythm of bright days and genuinely dark nights. Over the past century, however, artificial skyglow from unshielded streetlights, illuminated billboards, and glass office towers has washed out the night sky for more than eighty percent of the world’s population. Ecologists warn that this shift is far from harmless to wildlife. Newly hatched sea turtles, programmed by instinct to crawl toward the brightest horizon—historically moonlight reflecting off ocean waves—frequently turn inland toward beachfront hotel floodlights instead, leading to dehydration or traffic fatalities. Similarly, nocturnal pollinators such as hawkmoths reduce flower visits by over half in artificially lit meadows, indirectly lowering seed production in wild plants. Fortunately, light pollution differs from chemical contamination in one encouraging way: it leaves no lasting toxic residue. Switching municipal streetlights to downward-shielded, warm-amber LEDs equipped with motion dimmers cuts wasted skyglow immediately without compromising pedestrian safety.',
          question: 'How does artificial lighting affect wild plants in meadows at night?',
          options: [
            'It causes meadow flowers to bloom twice as fast.',
            'It lowers seed output because nocturnal pollinators visit far fewer flowers.',
            'It dries out soil moisture faster than daytime sunlight.',
            'It doubles the population of hawkmoths.',
          ],
          correctIdx: 1,
          explanation: 'Các loài thụ phấn ban đêm như bướm đêm hawkmoth giảm hơn nửa số lượt ghé hoa ở đồng cỏ có đèn sáng, làm giảm lượng hạt giống của cây dại.',
        },
        {
          id: 'ielts-mock-4-q16',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'For four billion years, life on Earth evolved under a dependable rhythm of bright days and genuinely dark nights. Over the past century, however, artificial skyglow from unshielded streetlights, illuminated billboards, and glass office towers has washed out the night sky for more than eighty percent of the world’s population. Ecologists warn that this shift is far from harmless to wildlife. Newly hatched sea turtles, programmed by instinct to crawl toward the brightest horizon—historically moonlight reflecting off ocean waves—frequently turn inland toward beachfront hotel floodlights instead, leading to dehydration or traffic fatalities. Similarly, nocturnal pollinators such as hawkmoths reduce flower visits by over half in artificially lit meadows, indirectly lowering seed production in wild plants. Fortunately, light pollution differs from chemical contamination in one encouraging way: it leaves no lasting toxic residue. Switching municipal streetlights to downward-shielded, warm-amber LEDs equipped with motion dimmers cuts wasted skyglow immediately without compromising pedestrian safety.',
          question: 'Why does the author compare light pollution with chemical contamination?',
          options: [
            'To argue that streetlights are more toxic than factory waste',
            'To show that both take centuries to clean up from oceans',
            'To explain why warm-amber LEDs contain dangerous heavy metals',
            'To emphasize that light pollution disappears instantly once fixtures are corrected',
          ],
          correctIdx: 3,
          explanation: 'Ô nhiễm ánh sáng khác ô nhiễm hóa chất ở điểm không để lại tồn dư độc hại lâu dài ("leaves no lasting toxic residue") và có thể giảm ngay lập tức.',
        },
        {
          id: 'ielts-mock-4-q17',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'For four billion years, life on Earth evolved under a dependable rhythm of bright days and genuinely dark nights. Over the past century, however, artificial skyglow from unshielded streetlights, illuminated billboards, and glass office towers has washed out the night sky for more than eighty percent of the world’s population. Ecologists warn that this shift is far from harmless to wildlife. Newly hatched sea turtles, programmed by instinct to crawl toward the brightest horizon—historically moonlight reflecting off ocean waves—frequently turn inland toward beachfront hotel floodlights instead, leading to dehydration or traffic fatalities. Similarly, nocturnal pollinators such as hawkmoths reduce flower visits by over half in artificially lit meadows, indirectly lowering seed production in wild plants. Fortunately, light pollution differs from chemical contamination in one encouraging way: it leaves no lasting toxic residue. Switching municipal streetlights to downward-shielded, warm-amber LEDs equipped with motion dimmers cuts wasted skyglow immediately without compromising pedestrian safety.',
          question: 'Which streetlighting measure is recommended at the end of the passage?',
          options: [
            'Turning off all city streetlamps permanently after sunset',
            'Using downward-shielded warm-amber LEDs with motion dimmers',
            'Installing brighter white-blue billboards near highways',
            'Replacing glass office windows with mirrors',
          ],
          correctIdx: 1,
          explanation: 'Giải pháp được đề xuất là đèn LED ánh vàng ấm có chao che hướng xuống dưới kết hợp cảm biến giảm sáng theo chuyển động.',
        },
        {
          id: 'ielts-mock-4-q18',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'For four billion years, life on Earth evolved under a dependable rhythm of bright days and genuinely dark nights. Over the past century, however, artificial skyglow from unshielded streetlights, illuminated billboards, and glass office towers has washed out the night sky for more than eighty percent of the world’s population. Ecologists warn that this shift is far from harmless to wildlife. Newly hatched sea turtles, programmed by instinct to crawl toward the brightest horizon—historically moonlight reflecting off ocean waves—frequently turn inland toward beachfront hotel floodlights instead, leading to dehydration or traffic fatalities. Similarly, nocturnal pollinators such as hawkmoths reduce flower visits by over half in artificially lit meadows, indirectly lowering seed production in wild plants. Fortunately, light pollution differs from chemical contamination in one encouraging way: it leaves no lasting toxic residue. Switching municipal streetlights to downward-shielded, warm-amber LEDs equipped with motion dimmers cuts wasted skyglow immediately without compromising pedestrian safety.',
          question: 'In this passage, "compromising" is closest in meaning to:',
          options: ['advertising', 'measuring', 'financing', 'jeopardizing or weakening'],
          correctIdx: 3,
          explanation: '"Without compromising pedestrian safety" mang nghĩa không làm suy giảm hay gây tổn hại đến sự an toàn của người đi bộ.',
        },
        {
          id: 'ielts-mock-4-q19',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Choose the best academic noun phrase: "Governments must strike a careful _____ between industrial expansion and wetland conservation."',
          options: ['symptom', 'collision', 'balance', 'fraction'],
          correctIdx: 2,
          explanation: '"Strike a careful balance between A and B" (cân bằng thận trọng giữa hai yếu tố) là cụm cố định rất giá trị trong Writing Task 2.',
        },
        {
          id: 'ielts-mock-4-q20',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Select the accurate verb for Task 1: "Solar capacity in Country X _____ wind capacity for the first time in 2023, reaching 45 GW."',
          options: ['surpassed', 'plummeted', 'hesitated', 'compensated'],
          correctIdx: 0,
          explanation: '"Surpassed" (vượt qua) diễn tả chính xác việc điện mặt trời vượt điện gió lần đầu tiên.',
        },
        {
          id: 'ielts-mock-4-q21',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Which adjective describes a policy or effect that is "present everywhere or very common"?',
          options: ['scarce', 'obsolete', 'ambiguous', 'ubiquitous'],
          correctIdx: 3,
          explanation: '"Ubiquitous" (phổ biến khắp nơi, có mặt ở mọi chỗ) là từ vựng Band 7.5+ rất hữu ích khi nói về công nghệ hoặc nhựa dùng một lần.',
        },
        {
          id: 'ielts-mock-4-q22',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Complete the formal sentence: "High youth unemployment can _____ broader social instability if left unaddressed."',
          options: ['dedicate', 'trigger', 'abstain', 'reconcile'],
          correctIdx: 1,
          explanation: '"Trigger social instability" (kích hoạt / châm ngòi cho bất ổn xã hội) là collocation tự nhiên và chuẩn học thuật.',
        },
        {
          id: 'ielts-mock-4-q23',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Which sentence correctly uses a concessive structure with "While"?',
          options: [
            'While electric scooters cut short car trips, poorly parked fleets often clutter narrow sidewalks.',
            'While electric scooters cut short car trips, but poorly parked fleets often clutter sidewalks.',
            'While electric scooters cutting short car trips, poorly parked fleets clutter sidewalks.',
            'While of electric scooters cutting short car trips, poorly parked fleets clutter sidewalks.',
          ],
          correctIdx: 0,
          explanation: '"While + S + V, S + V" diễn đạt sự nhượng bộ (Mặc dù... nhưng...), không thêm "but" ở mệnh đề sau.',
        },
        {
          id: 'ielts-mock-4-q24',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Select the sentence using a third conditional correctly to analyze a past policy:',
          options: [
            'If the municipality expanded drainage earlier, the 2022 flood would not happen.',
            'If the municipality would have expanded drainage earlier, the 2022 flood had not occurred.',
            'If the municipality had expanded drainage earlier, the 2022 flood would not have occurred.',
            'Had the municipality expanded drainage earlier, the 2022 flood will not have occurred.',
          ],
          correctIdx: 2,
          explanation: 'Điều kiện loại 3 giả định trái ngược quá khứ dùng "If + S + had + V3/ed, S + would (not) have + V3/ed".',
        },
        {
          id: 'ielts-mock-4-q25',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Choose the sentence that avoids a dangling modifier:',
          options: [
            'Walking through the pedestrian plaza, several historic fountains caught our eye.',
            'Having reviewed the quarterly budget, additional funds were denied by the board.',
            'Having analyzed data from forty clinics, the researchers revised their screening guidelines.',
            'To improve air quality in downtown districts, free shuttle buses were introduced by planners.',
          ],
          correctIdx: 2,
          explanation: 'Chủ ngữ mệnh đề chính ("the researchers") trùng khớp với chủ thể thực hiện hành động "Having analyzed data". Các câu còn lại đều mắc lỗi chủ ngữ treo (fountains không biết đi, funds không thể duyệt ngân sách, buses không tự cải thiện không khí).',
        },
      ],
    },
    {
      title: 'Mini Mock Test #5',
      description: 'Đề thi thử IELTS 25 câu (Listening Parts 1–4, 2 bài Academic Reading, Vocab & Grammar Band 6.5–8.0) — 30 phút.',
      durationMinutes: 30,
      questions: [
        {
          id: 'ielts-mock-5-q1',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Q1–Q2)',
          audioScript:
            'Librarian: Graduate Study Desk, good afternoon. Student: Hi, I am writing my master’s thesis and would like to reserve a private study carrel on the fourth floor. Librarian: Certainly. Master’s students can book a carrel for up to four weeks at a time—doctoral students get eight weeks, though yours can be renewed once if nobody is waiting. Also, the fourth-floor doors require an activated keycard after 6 PM; bring your student card to Desk B before 5 PM to get the silent-zone chip enabled.',
          question: 'What is the initial maximum booking period for a master’s student’s study carrel?',
          options: ['Four weeks', 'Two weeks', 'Six weeks', 'Eight weeks'],
          correctIdx: 0,
          explanation: 'Thủ thư nói sinh viên thạc sĩ được đặt phòng nghiên cứu cá nhân tối đa 4 tuần mỗi lượt ("up to four weeks at a time"); 8 tuần là dành cho nghiên cứu sinh tiến sĩ.',
        },
        {
          id: 'ielts-mock-5-q2',
          skill: 'listening',
          partLabel: 'Listening Part 1 (Q1–Q2)',
          audioScript:
            'Librarian: Graduate Study Desk, good afternoon. Student: Hi, I am writing my master’s thesis and would like to reserve a private study carrel on the fourth floor. Librarian: Certainly. Master’s students can book a carrel for up to four weeks at a time—doctoral students get eight weeks, though yours can be renewed once if nobody is waiting. Also, the fourth-floor doors require an activated keycard after 6 PM; bring your student card to Desk B before 5 PM to get the silent-zone chip enabled.',
          question: 'Why must the student visit Desk B before 5:00 PM?',
          options: [
            'To pay a refundable locker deposit',
            'To submit a printed thesis outline',
            'To activate the silent-zone chip on their student card for evening access',
            'To pick up a physical brass padlock key',
          ],
          correctIdx: 2,
          explanation: 'Cửa tầng bốn yêu cầu thẻ kích hoạt sau 6 PM nên sinh viên phải tới Quầy B trước 5 PM để bật chip khu vực yên tĩnh.',
        },
        {
          id: 'ielts-mock-5-q3',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Q3–Q4)',
          audioScript:
            'Guide: Welcome to the Highland Botanical Arboretum. Today’s main loop takes roughly seventy minutes at an unhurried pace. Please take the wooden footbridge detour around the Shaded Fern Gully—stone steps along the original path are slippery after overnight mist. When you finish your walk, kindly drop your rented audio handset into the green return box beside the Gift Shop exit rather than handing it back at the Entrance Booth.',
          question: 'Why are visitors directed to use the wooden footbridge detour?',
          options: [
            'Volunteers are planting new ferns across the bridge.',
            'Stone steps on the regular trail are slippery from overnight mist.',
            'The original path is closed for electric cart races.',
            'Construction crews are repairing the Gift Shop roof.',
          ],
          correctIdx: 1,
          explanation: 'Các bậc đá trên lối cũ bị trơn sau lớp sương đêm ("slippery after overnight mist") nên khách được hướng dẫn đi đường vòng qua cầu gỗ.',
        },
        {
          id: 'ielts-mock-5-q4',
          skill: 'listening',
          partLabel: 'Listening Part 2 (Q3–Q4)',
          audioScript:
            'Guide: Welcome to the Highland Botanical Arboretum. Today’s main loop takes roughly seventy minutes at an unhurried pace. Please take the wooden footbridge detour around the Shaded Fern Gully—stone steps along the original path are slippery after overnight mist. When you finish your walk, kindly drop your rented audio handset into the green return box beside the Gift Shop exit rather than handing it back at the Entrance Booth.',
          question: 'Where should visitors return their rented audio handsets?',
          options: [
            'At the Entrance Booth desk',
            'On the wooden footbridge table',
            'To any uniformed gardener on the path',
            'In the green box near the Gift Shop exit',
          ],
          correctIdx: 3,
          explanation: 'Hướng dẫn viên dặn bỏ máy thuyết minh vào thùng trả màu xanh cạnh lối ra Gift Shop thay vì mang về quầy cổng vào.',
        },
        {
          id: 'ielts-mock-5-q5',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Q5–Q6)',
          audioScript:
            'Tara: Sam, Dr. Brooks left detailed notes on our history paper about medieval craft guilds. She felt covering three entire centuries made the argument too superficial. Sam: Yeah, focusing strictly on the years 1350 to 1420 lets us examine apprenticeship rules in real depth. Did she ask for more secondary books? Tara: Actually, no—she said we already cited enough modern historians, and suggested adding two short excerpts from original guild account ledgers to anchor our claims.',
          question: 'How do Tara and Sam decide to fix the broad scope of their essay?',
          options: [
            'By deleting the section on apprenticeship rules',
            'By adding a comparison with modern factories',
            'By expanding the paper from three to five centuries',
            'By narrowing their timeframe to 1350–1420',
          ],
          correctIdx: 3,
          explanation: 'Sam đề xuất thu hẹp giai đoạn nghiên cứu từ 3 thế kỷ xuống chỉ còn 1350–1420 để phân tích sâu quy định học nghề.',
        },
        {
          id: 'ielts-mock-5-q6',
          skill: 'listening',
          partLabel: 'Listening Part 3 (Q5–Q6)',
          audioScript:
            'Tara: Sam, Dr. Brooks left detailed notes on our history paper about medieval craft guilds. She felt covering three entire centuries made the argument too superficial. Sam: Yeah, focusing strictly on the years 1350 to 1420 lets us examine apprenticeship rules in real depth. Did she ask for more secondary books? Tara: Actually, no—she said we already cited enough modern historians, and suggested adding two short excerpts from original guild account ledgers to anchor our claims.',
          question: 'What kind of source did Dr. Brooks advise them to add?',
          options: [
            'More textbooks by modern historians',
            'Short quotes from original medieval guild account ledgers',
            'Maps of twentieth-century European railways',
            'Interviews with local museum guides',
          ],
          correctIdx: 1,
          explanation: 'Cô Brooks khuyên bổ sung hai trích đoạn ngắn từ sổ kế toán gốc của phường hội ("original guild account ledgers") làm bằng chứng sơ cấp.',
        },
        {
          id: 'ielts-mock-5-q7',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Q7–Q8)',
          audioScript:
            'Lecturer: As mountain glaciers retreat in the Himalayas and Andes, meltwater frequently collects behind unstable ridges of loose rock and gravel known as terminal moraines. Unlike concrete hydroelectric dams, moraine ridges lack internal steel reinforcement; if an ice avalanche triggers a wave over the rim, the loose gravel erodes within minutes, unleashing catastrophic glacial lake outburst floods downstream. Rather than draining entire alpine lakes, engineers in Nepal and Peru have installed automated water-level sensors paired with steel siphon pipes that continuously draw water over the moraine crest to keep lake pressure below critical thresholds.',
          question: 'Why are terminal moraines prone to sudden collapse?',
          options: [
            'They are built from outdated concrete poured decades ago.',
            'Mountain fish dig tunnels beneath the ridges.',
            'They consist of loose rock and gravel with no structural reinforcement.',
            'Siphon pipes freeze solid and crack the rock every spring.',
          ],
          correctIdx: 2,
          explanation: 'Bờ băng tích (terminal moraine) chỉ là đống đá sỏi rời rạc không có cốt thép gia cố nên bị xói lở chỉ trong vài phút nếu sóng tràn qua.',
        },
        {
          id: 'ielts-mock-5-q8',
          skill: 'listening',
          partLabel: 'Listening Part 4 (Q7–Q8)',
          audioScript:
            'Lecturer: As mountain glaciers retreat in the Himalayas and Andes, meltwater frequently collects behind unstable ridges of loose rock and gravel known as terminal moraines. Unlike concrete hydroelectric dams, moraine ridges lack internal steel reinforcement; if an ice avalanche triggers a wave over the rim, the loose gravel erodes within minutes, unleashing catastrophic glacial lake outburst floods downstream. Rather than draining entire alpine lakes, engineers in Nepal and Peru have installed automated water-level sensors paired with steel siphon pipes that continuously draw water over the moraine crest to keep lake pressure below critical thresholds.',
          question: 'How do engineers in Nepal and Peru reduce flood risk from glacial lakes?',
          options: [
            'By using sensors and steel siphon pipes to steadily lower lake water levels',
            'By pumping all meltwater completely dry every summer',
            'By freezing the lake surface with liquid nitrogen',
            'By blowing up terminal moraines before snow falls',
          ],
          correctIdx: 0,
          explanation: 'Kỹ sư lắp cảm biến mực nước tự động kết hợp ống xi-phông thép để rút bớt nước liên tục qua đỉnh đập tự nhiên, giữ áp suất dưới ngưỡng nguy hiểm.',
        },
        {
          id: 'ielts-mock-5-q9',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Across dense European and Asian metropolises, municipal traffic engineers are rethinking the assumption that every residential street must prioritize through-traffic cars. Under "low-traffic neighborhood" and "school street" programs, cities install retractable bollards or wooden planters at selected intersections, allowing emergency vehicles, deliveries, and local residents’ cars to enter at walking pace while preventing outside commuters from cutting through side streets to dodge main-road traffic lights. Skeptics initially feared that closing residential shortcuts would simply displace gridlock onto surrounding avenues—a phenomenon planners call traffic evaporation’s opposite, spillover congestion. Yet long-term traffic counts from London, Ghent, and Barcelona reveal a surprising pattern: after a brief two-month adjustment period, total motor vehicle volume across the wider district often drops by ten to fifteen percent as short local car errands convert into walking or cycling trips. Meanwhile, local corner bakeries and repair shops frequently report steadier footfall once noisy tailpipes give way to shaded benches.',
          question: 'What is the main purpose of placing wooden planters or bollards in low-traffic neighborhoods?',
          options: [
            'To block emergency fire trucks from entering narrow lanes',
            'To stop outside commuters from using residential streets as shortcuts',
            'To reserve all side streets strictly for high-speed delivery vans',
            'To eliminate street parking for residents who live on the block',
          ],
          correctIdx: 1,
          explanation: 'Cọc chắn hoặc bồn cây ngăn tài xế bên ngoài đi tắt qua đường dân cư để né đèn đỏ trục chính, trong khi xe cấp cứu, giao hàng và cư dân vẫn vào chậm được.',
        },
        {
          id: 'ielts-mock-5-q10',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Across dense European and Asian metropolises, municipal traffic engineers are rethinking the assumption that every residential street must prioritize through-traffic cars. Under "low-traffic neighborhood" and "school street" programs, cities install retractable bollards or wooden planters at selected intersections, allowing emergency vehicles, deliveries, and local residents’ cars to enter at walking pace while preventing outside commuters from cutting through side streets to dodge main-road traffic lights. Skeptics initially feared that closing residential shortcuts would simply displace gridlock onto surrounding avenues—a phenomenon planners call traffic evaporation’s opposite, spillover congestion. Yet long-term traffic counts from London, Ghent, and Barcelona reveal a surprising pattern: after a brief two-month adjustment period, total motor vehicle volume across the wider district often drops by ten to fifteen percent as short local car errands convert into walking or cycling trips. Meanwhile, local corner bakeries and repair shops frequently report steadier footfall once noisy tailpipes give way to shaded benches.',
          question: 'What did critics worry would happen when residential shortcuts were closed?',
          options: [
            'Corner bakeries would lose every customer immediately.',
            'Walking and cycling rates would drop sharply.',
            'Wooden planters would require costly daily watering.',
            'Traffic jams would simply spill onto neighboring main avenues.',
          ],
          correctIdx: 3,
          explanation: 'Những người hoài nghi ban đầu lo ngại việc chặn đường tắt sẽ chỉ đẩy ùn tắc tràn sang các đại lộ xung quanh ("spillover congestion").',
        },
        {
          id: 'ielts-mock-5-q11',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Across dense European and Asian metropolises, municipal traffic engineers are rethinking the assumption that every residential street must prioritize through-traffic cars. Under "low-traffic neighborhood" and "school street" programs, cities install retractable bollards or wooden planters at selected intersections, allowing emergency vehicles, deliveries, and local residents’ cars to enter at walking pace while preventing outside commuters from cutting through side streets to dodge main-road traffic lights. Skeptics initially feared that closing residential shortcuts would simply displace gridlock onto surrounding avenues—a phenomenon planners call traffic evaporation’s opposite, spillover congestion. Yet long-term traffic counts from London, Ghent, and Barcelona reveal a surprising pattern: after a brief two-month adjustment period, total motor vehicle volume across the wider district often drops by ten to fifteen percent as short local car errands convert into walking or cycling trips. Meanwhile, local corner bakeries and repair shops frequently report steadier footfall once noisy tailpipes give way to shaded benches.',
          question: 'What did multi-city traffic counts show after the two-month adjustment period?',
          options: [
            'Overall district vehicle volume declined by 10–15% as short trips shifted to walking or cycling.',
            'Surrounding avenues stayed permanently gridlocked twenty-four hours a day.',
            'Emergency vehicles took twice as long to reach hospitals.',
            'Commuters bought more motorcycles to bypass wooden planters.',
          ],
          correctIdx: 0,
          explanation: 'Số liệu tại London, Ghent và Barcelona cho thấy tổng lưu lượng xe toàn quận giảm 10–15% vì các chuyến đi ngắn chuyển sang đi bộ hoặc xe đạp.',
        },
        {
          id: 'ielts-mock-5-q12',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Across dense European and Asian metropolises, municipal traffic engineers are rethinking the assumption that every residential street must prioritize through-traffic cars. Under "low-traffic neighborhood" and "school street" programs, cities install retractable bollards or wooden planters at selected intersections, allowing emergency vehicles, deliveries, and local residents’ cars to enter at walking pace while preventing outside commuters from cutting through side streets to dodge main-road traffic lights. Skeptics initially feared that closing residential shortcuts would simply displace gridlock onto surrounding avenues—a phenomenon planners call traffic evaporation’s opposite, spillover congestion. Yet long-term traffic counts from London, Ghent, and Barcelona reveal a surprising pattern: after a brief two-month adjustment period, total motor vehicle volume across the wider district often drops by ten to fifteen percent as short local car errands convert into walking or cycling trips. Meanwhile, local corner bakeries and repair shops frequently report steadier footfall once noisy tailpipes give way to shaded benches.',
          question: 'How have small neighborhood businesses often reacted once streets became quieter?',
          options: [
            'They moved out to suburban shopping malls.',
            'They requested wider car lanes in front of their doors.',
            'They recorded steadier pedestrian customer visits.',
            'They reduced opening hours during sunny afternoons.',
          ],
          correctIdx: 2,
          explanation: 'Câu cuối nêu các tiệm bánh và cửa hàng sửa chữa nhỏ ghi nhận lượng khách đi bộ ổn định hơn ("steadier footfall") khi đường phố yên tĩnh, có ghế nghỉ.',
        },
        {
          id: 'ielts-mock-5-q13',
          skill: 'reading',
          partLabel: 'Reading Passage 1 (Q9–Q13)',
          passage:
            'Across dense European and Asian metropolises, municipal traffic engineers are rethinking the assumption that every residential street must prioritize through-traffic cars. Under "low-traffic neighborhood" and "school street" programs, cities install retractable bollards or wooden planters at selected intersections, allowing emergency vehicles, deliveries, and local residents’ cars to enter at walking pace while preventing outside commuters from cutting through side streets to dodge main-road traffic lights. Skeptics initially feared that closing residential shortcuts would simply displace gridlock onto surrounding avenues—a phenomenon planners call traffic evaporation’s opposite, spillover congestion. Yet long-term traffic counts from London, Ghent, and Barcelona reveal a surprising pattern: after a brief two-month adjustment period, total motor vehicle volume across the wider district often drops by ten to fifteen percent as short local car errands convert into walking or cycling trips. Meanwhile, local corner bakeries and repair shops frequently report steadier footfall once noisy tailpipes give way to shaded benches.',
          question: 'In this passage, "retractable" means the bollards can be:',
          options: [
            'painted in bright reflective colors',
            'monitored by traffic cameras',
            'built from recycled plastic',
            'lowered or moved aside when authorized vehicles need access',
          ],
          correctIdx: 3,
          explanation: '"Retractable bollards" là trụ chắn có thể thụt xuống hoặc mở ra để xe cấp cứu, xe giao hàng hay xe cư dân đi qua.',
        },
        {
          id: 'ielts-mock-5-q14',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'Throughout much of the early twentieth century, educators worried that raising children with two languages would confuse young minds and delay academic progress. Modern cognitive neuroscience has decisively overturned that view. Functional brain-imaging studies reveal that in a fluent bilingual brain, both language systems remain simultaneously active even when only one language is being spoken. Consequently, selecting the appropriate word requires the brain’s prefrontal cortex to continuously inhibit the competing language—a mental workout akin to exercising executive-control muscles. While bilingual children sometimes display slightly smaller single-language vocabularies in early primary school—though their combined conceptual vocabulary across both languages matches or exceeds monolingual peers—they routinely outperform on tasks requiring rapid attention-switching and ignoring irrelevant distractions. Even more strikingly, large epidemiological cohorts indicate that lifelong bilingualism delays the clinical onset of age-related dementia symptoms by roughly four years on average, likely because dense neural backup pathways compensate longer for physical brain aging.',
          question: 'What misconception did many early twentieth-century educators hold about bilingualism?',
          options: [
            'That children could only learn a second language after age twelve',
            'That speaking two languages would confuse children and slow school learning',
            'That bilingualism caused adults to lose their native accent',
            'That brain imaging proved two languages sit in separate halves of the skull',
          ],
          correctIdx: 1,
          explanation: 'Đầu thế kỷ 20, nhiều nhà giáo dục lo ngại nuôi dạy trẻ song ngữ sẽ gây rối loạn nhận thức và làm chậm tiến độ học tập ("confuse young minds and delay academic progress").',
        },
        {
          id: 'ielts-mock-5-q15',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'Throughout much of the early twentieth century, educators worried that raising children with two languages would confuse young minds and delay academic progress. Modern cognitive neuroscience has decisively overturned that view. Functional brain-imaging studies reveal that in a fluent bilingual brain, both language systems remain simultaneously active even when only one language is being spoken. Consequently, selecting the appropriate word requires the brain’s prefrontal cortex to continuously inhibit the competing language—a mental workout akin to exercising executive-control muscles. While bilingual children sometimes display slightly smaller single-language vocabularies in early primary school—though their combined conceptual vocabulary across both languages matches or exceeds monolingual peers—they routinely outperform on tasks requiring rapid attention-switching and ignoring irrelevant distractions. Even more strikingly, large epidemiological cohorts indicate that lifelong bilingualism delays the clinical onset of age-related dementia symptoms by roughly four years on average, likely because dense neural backup pathways compensate longer for physical brain aging.',
          question: 'Why does speaking one language strengthen executive control in a bilingual brain?',
          options: [
            'The brain turns off one language completely during childhood.',
            'Memorizing two alphabets doubles sleeping hours.',
            'The prefrontal cortex must actively suppress the non-target language that stays active.',
            'Bilingual speakers rely less on the prefrontal cortex than monolinguals.',
          ],
          correctIdx: 2,
          explanation: 'Cả hai hệ thống ngôn ngữ đều hoạt động đồng thời nên vỏ não trước trán phải liên tục ức chế ngôn ngữ còn lại ("continuously inhibit the competing language"), giúp rèn luyện chức năng điều hành.',
        },
        {
          id: 'ielts-mock-5-q16',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'Throughout much of the early twentieth century, educators worried that raising children with two languages would confuse young minds and delay academic progress. Modern cognitive neuroscience has decisively overturned that view. Functional brain-imaging studies reveal that in a fluent bilingual brain, both language systems remain simultaneously active even when only one language is being spoken. Consequently, selecting the appropriate word requires the brain’s prefrontal cortex to continuously inhibit the competing language—a mental workout akin to exercising executive-control muscles. While bilingual children sometimes display slightly smaller single-language vocabularies in early primary school—though their combined conceptual vocabulary across both languages matches or exceeds monolingual peers—they routinely outperform on tasks requiring rapid attention-switching and ignoring irrelevant distractions. Even more strikingly, large epidemiological cohorts indicate that lifelong bilingualism delays the clinical onset of age-related dementia symptoms by roughly four years on average, likely because dense neural backup pathways compensate longer for physical brain aging.',
          question: 'What nuance does the author mention regarding early primary school vocabulary in bilingual children?',
          options: [
            'Their combined conceptual vocabulary across both languages equals or surpasses monolinguals.',
            'They know far fewer total concepts across both languages combined.',
            'They never catch up in reading comprehension after age ten.',
            'They refuse to speak their home language at school.',
          ],
          correctIdx: 0,
          explanation: 'Trẻ song ngữ có thể có vốn từ ở riêng từng ngôn ngữ nhỏ hơn chút ít ở tiểu học, nhưng tổng vốn khái niệm kết hợp cả hai ngôn ngữ bằng hoặc vượt bạn đơn ngữ.',
        },
        {
          id: 'ielts-mock-5-q17',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'Throughout much of the early twentieth century, educators worried that raising children with two languages would confuse young minds and delay academic progress. Modern cognitive neuroscience has decisively overturned that view. Functional brain-imaging studies reveal that in a fluent bilingual brain, both language systems remain simultaneously active even when only one language is being spoken. Consequently, selecting the appropriate word requires the brain’s prefrontal cortex to continuously inhibit the competing language—a mental workout akin to exercising executive-control muscles. While bilingual children sometimes display slightly smaller single-language vocabularies in early primary school—though their combined conceptual vocabulary across both languages matches or exceeds monolingual peers—they routinely outperform on tasks requiring rapid attention-switching and ignoring irrelevant distractions. Even more strikingly, large epidemiological cohorts indicate that lifelong bilingualism delays the clinical onset of age-related dementia symptoms by roughly four years on average, likely because dense neural backup pathways compensate longer for physical brain aging.',
          question: 'According to epidemiological cohorts, how may lifelong bilingualism benefit older adults?',
          options: [
            'It prevents all physical aging of brain cells completely.',
            'It guarantees perfect memory of childhood events.',
            'It appears to postpone dementia symptoms by around four years on average.',
            'It eliminates the need for reading glasses in old age.',
          ],
          correctIdx: 2,
          explanation: 'Các nghiên cứu dịch tễ lớn chỉ ra song ngữ suốt đời làm chậm thời điểm khởi phát triệu chứng sa sút trí tuệ trung bình khoảng 4 năm.',
        },
        {
          id: 'ielts-mock-5-q18',
          skill: 'reading',
          partLabel: 'Reading Passage 2 (Q14–Q18)',
          passage:
            'Throughout much of the early twentieth century, educators worried that raising children with two languages would confuse young minds and delay academic progress. Modern cognitive neuroscience has decisively overturned that view. Functional brain-imaging studies reveal that in a fluent bilingual brain, both language systems remain simultaneously active even when only one language is being spoken. Consequently, selecting the appropriate word requires the brain’s prefrontal cortex to continuously inhibit the competing language—a mental workout akin to exercising executive-control muscles. While bilingual children sometimes display slightly smaller single-language vocabularies in early primary school—though their combined conceptual vocabulary across both languages matches or exceeds monolingual peers—they routinely outperform on tasks requiring rapid attention-switching and ignoring irrelevant distractions. Even more strikingly, large epidemiological cohorts indicate that lifelong bilingualism delays the clinical onset of age-related dementia symptoms by roughly four years on average, likely because dense neural backup pathways compensate longer for physical brain aging.',
          question: 'In this passage, "inhibit" is closest in meaning to:',
          options: ['suppress or hold back', 'translate aloud', 'memorize quickly', 'celebrate publicly'],
          correctIdx: 0,
          explanation: '"Inhibit the competing language" mang nghĩa kìm hãm, ức chế ngôn ngữ đang cạnh tranh để chọn đúng từ ở ngôn ngữ đang nói.',
        },
        {
          id: 'ielts-mock-5-q19',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Select the best academic verb: "Independent safety audits help _____ public confidence in newly approved medicines."',
          options: ['erode', 'neglect', 'deviate', 'bolster'],
          correctIdx: 3,
          explanation: '"Bolster public confidence" (củng cố / tăng cường niềm tin công chúng) là collocation học thuật rất tự nhiên ở Band 7.5+.',
        },
        {
          id: 'ielts-mock-5-q20',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Choose the accurate Task 1 phrase: "Between 2018 and 2022, passenger numbers _____ dramatically from 1.2 million to 420,000."',
          options: ['soared', 'plummeted', 'stabilized', 'hovered'],
          correctIdx: 1,
          explanation: 'Giảm mạnh từ 1,2 triệu xuống 420.000 được diễn tả chính xác bằng "plummeted dramatically".',
        },
        {
          id: 'ielts-mock-5-q21',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Which noun refers to "an unintended disadvantage or negative consequence of a plan"?',
          options: ['drawback', 'incentive', 'milestone', 'blueprint'],
          correctIdx: 0,
          explanation: '"Drawback" (mặt hạn chế, bất lợi) là từ khóa phổ biến trong Writing Task 2 dạng Advantages/Disadvantages.',
        },
        {
          id: 'ielts-mock-5-q22',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary (Q19–Q22)',
          question:
            'Choose the best academic adverb: "Remote healthcare clinics have _____ improved access to prenatal checkups in mountain villages."',
          options: ['reluctantly', 'hostilely', 'substantially', 'accidentally'],
          correctIdx: 2,
          explanation: '"Substantially improved" (cải thiện đáng kể) là cụm trạng-động từ chuẩn mực học thuật.',
        },
        {
          id: 'ielts-mock-5-q23',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Which sentence uses a cleft structure accurately for emphasis in Writing Task 2?',
          options: [
            'There is consistent teacher training rather than tablet hardware which raising literacy scores.',
            'It is consistent teacher training rather than tablet hardware what raises literacy scores.',
            'What raises literacy scores it is consistent teacher training rather than tablet hardware.',
            'It is consistent teacher training rather than tablet hardware that raises literacy scores.',
          ],
          correctIdx: 3,
          explanation: 'Câu chẻ nhấn mạnh chuẩn là "It is [X] that + V..." (không dùng "what" sau cấu trúc "It is...").',
        },
        {
          id: 'ielts-mock-5-q24',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Select the grammatically accurate formal sentence using "provided that":',
          options: [
            'Congestion pricing can win voter support provided that revenue will fund cleaner buses.',
            'Congestion pricing can win voter support provided that revenue funds cleaner buses.',
            'Congestion pricing can win voter support provided that revenue funding cleaner buses.',
            'Congestion pricing can win voter support provided of revenue funding cleaner buses.',
          ],
          correctIdx: 1,
          explanation: '"Provided that" (= if) mở đầu mệnh đề điều kiện hiện tại nên động từ chia ở thì hiện tại đơn ("funds"), không dùng "will".',
        },
        {
          id: 'ielts-mock-5-q25',
          skill: 'grammar',
          partLabel: 'Academic Grammar (Q23–Q25)',
          question: 'Which sentence correctly uses "Only by..." inversion at the start of a conclusion?',
          options: [
            'Only by coordinating regional rail networks cities can cut domestic flight emissions.',
            'Only by coordinating regional rail networks are cut domestic flight emissions.',
            'Only by coordinating regional rail networks did cities can cut domestic flight emissions.',
            'Only by coordinating regional rail networks can cities cut domestic flight emissions.',
          ],
          correctIdx: 3,
          explanation: 'Khi đặt "Only by + V-ing" ở đầu câu, mệnh đề chính phải đảo trợ động từ/động từ khuyết thiếu lên trước chủ ngữ: "...can cities cut...".',
        },
      ],
    },
  ],
};

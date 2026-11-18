import type {
  ExamMcqQuestion,
  ExamReadingSet,
  ExamListeningSet,
  ExamWritingTask,
  ExamSpeakingTask,
  ExamMockTest,
} from './examPrepData';

export const TOEFL_EXTRA: {
  diagnosticQuestions: ExamMcqQuestion[];
  reading: ExamReadingSet[];
  listening: ExamListeningSet[];
  writing: ExamWritingTask[];
  speaking: ExamSpeakingTask[];
  mockTests: ExamMockTest[];
} = {
  diagnosticQuestions: [
    {
      id: 'toefl-diag-ex-1',
      skill: 'listening',
      partLabel: 'Campus Conversation',
      audioScript:
        'Student: Hi, Ms. Lin, I was hoping to apply for the Undergraduate Summer Research Stipend in the biology department, but I noticed the portal asks for a faculty mentor confirmation letter before Friday. Advisor: Right—we require that letter so the committee knows a lab actually has bench space for you. Have you met with Dr. Okafor yet? Student: Yes, she verbally agreed to supervise my algae project yesterday, though she is at a conference in Seattle until Thursday night. Advisor: In that case, ask her to send a quick two-line email to our office address confirming your bench space, and upload a screenshot of that email as a temporary placeholder before Friday’s deadline.',
      question: 'What does the advisor suggest the student do about the missing mentor confirmation letter?',
      options: [
        'Wait until next summer to apply for the stipend.',
        'Switch to a different biology professor who is currently on campus.',
        'Have Dr. Okafor email a brief confirmation and upload a screenshot as a placeholder.',
        'Ask the conference organizers in Seattle to sign the department form.',
      ],
      correctIdx: 2,
      explanation:
        'Cố vấn đề xuất sinh viên nhờ TS. Okafor gửi email ngắn 2 dòng xác nhận chỗ thực tập trong lab rồi tải ảnh chụp màn hình lên làm bản tạm trước hạn thứ Sáu.',
    },
    {
      id: 'toefl-diag-ex-2',
      skill: 'listening',
      partLabel: 'Academic Lecture (Geology)',
      audioScript:
        'Professor: If you visit Giant’s Causeway in Northern Ireland, you’ll walk across thousands of interlocking stone pillars—most of them neat six-sided hexagons. People once wondered whether ancient giants carved them by hand. In reality, those columns form purely through physics. When thick basaltic lava pools and cools slowly, it contracts horizontally. Because a hexagonal fracture network releases thermal stress using the least total crack length per unit area, the cooling rock naturally splits into six-sided columns from the top downward.',
      question: 'Why does basalt lava tend to fracture into hexagonal columns as it cools?',
      options: [
        'A six-sided pattern relieves contraction stress with the minimal total crack length.',
        'Ocean waves polish square rocks into six-sided pillars over centuries.',
        'Minerals inside basalt repel one another at sixty-degree angles.',
        'Volcanic gas bubbles push upward in circles before solidifying.',
      ],
      correctIdx: 0,
      explanation:
        'Giáo sư giải thích mạng nứt hình lục giác giúp giải tỏa ứng suất co ngót nhiệt với tổng chiều dài vết nứt nhỏ nhất trên một đơn vị diện tích.',
    },
    {
      id: 'toefl-diag-ex-3',
      skill: 'listening',
      partLabel: 'Academic Lecture (Music History)',
      audioScript:
        'Professor: When perforated paper-roll player pianos appeared in living rooms around 1900, critics dismissed them as soulless machines that would ruin home musicianship. Yet look closer: piano rolls actually preserved exact finger timing and pedal nuances of legendary composers—details sheet music could never capture. Sure, early rolls sounded mechanical at times, just like first-generation digital synthesizers did in the 1980s, but without those paper rolls, we would have lost authentic performance practices of an entire era.',
      question: 'What is the professor’s attitude toward early player-piano rolls?',
      options: [
        'She agrees with 1900s critics that they destroyed amateur piano playing.',
        'She believes digital synthesizers in the 1980s copied sheet music accurately.',
        'She thinks paper rolls were completely silent compared to live concerts.',
        'She values them as crucial historical recordings of authentic performance style.',
      ],
      correctIdx: 3,
      explanation:
        'Giáo sư đánh giá cao cuộn giấy đàn piano tự động vì chúng lưu giữ được nhịp tay và kỹ thuật bàn đạp chân thực của các nhà soạn nhạc mà bản nhạc giấy không ghi lại hết được.',
    },
    {
      id: 'toefl-diag-ex-4',
      skill: 'reading',
      partLabel: 'Reading (Vocabulary in Context)',
      passage:
        'For years, historians debated whether medieval Scandinavian sailors reached North America before the eleventh century. Excavations at L’Anse aux Meadows in Newfoundland finally settled the question when iron rivets, soapstone spindle whorls, and Norse-style turf foundations corroborated accounts preserved in Icelandic sagas.',
      question: 'The word "corroborated" in the passage is closest in meaning to:',
      options: ['contradicted', 'supported with evidence', 'exaggerated', 'replaced'],
      correctIdx: 1,
      explanation:
        'Các hiện vật khảo cổ tìm thấy đã củng cố, xác thực thêm cho những ghi chép trong sử thi Iceland ("supported with evidence").',
    },
    {
      id: 'toefl-diag-ex-5',
      skill: 'reading',
      partLabel: 'Reading (Negative Factual)',
      passage:
        'Urban forestry programs plant shade trees along asphalt streets to combat the urban heat-island effect. Broad leafy canopies intercept solar radiation before it warms pavement, while transpiration from leaves cools surrounding air. Moreover, permeable tree pits absorb storm runoff, easing pressure on municipal drains. However, species sensitive to road salt often struggle along northern highways unless soil barriers are installed.',
      question: 'According to the passage, all of the following are benefits of urban street trees EXCEPT:',
      options: [
        'Removing dissolved road salt from northern highway snowmelt',
        'Blocking sunlight from heating dark asphalt pavement',
        'Cooling nearby air through moisture released by leaves',
        'Capturing rainwater runoff inside permeable planting pits',
      ],
      correctIdx: 0,
      explanation:
        'Bài đọc nói các loài cây nhạy cảm với muối rải đường thậm chí còn gặp khó khăn dọc cao tốc phía Bắc chứ không hề có chức năng lọc muối.',
    },
    {
      id: 'toefl-diag-ex-6',
      skill: 'reading',
      partLabel: 'Reading (Inference)',
      passage:
        'Traditional navigators in the Marshall Islands crafted lattice-like "stick charts" from coconut palm ribs and cowrie shells to represent how ocean swells bend around distant atolls. Crucially, sailors never carried these charts aboard their outrigger canoes; instead, apprentices memorized the wave patterns on land and read subtle pitch changes beneath the hull with their eyes closed.',
      question: 'What can be inferred about Marshallese stick charts from the passage?',
      options: [
        'They were waterproof maps nailed to the bow of every canoe.',
        'They could only be read during cloudless midday sunlight.',
        'They functioned primarily as onshore training tools rather than in-voyage references.',
        'They measured wind speed using suspended cowrie shells.',
      ],
      correctIdx: 2,
      explanation:
        'Thủy thủ không bao giờ mang biểu đồ que lên thuyền mà học thuộc quy luật sóng từ trên bờ — suy ra đây là công cụ huấn luyện trên đất liền.',
    },
    {
      id: 'toefl-diag-ex-7',
      skill: 'reading',
      partLabel: 'Reading (Rhetorical Purpose)',
      passage:
        'Continuous monoculture of grain quickly depletes soil nitrogen, driving down harvests within a few seasons. To restore fertility without synthetic fertilizer, eighteenth-century European farmers adopted four-field rotation incorporating clover and turnips. Unlike wheat, clover hosts nitrogen-fixing bacteria in tiny root nodules, converting inert atmospheric nitrogen into compounds that subsequent cereal crops can readily absorb.',
      question: 'Why does the author mention "nitrogen-fixing bacteria in tiny root nodules"?',
      options: [
        'To warn farmers against planting turnips near wheat fields',
        'To explain the biological mechanism by which clover replenishes soil fertility',
        'To argue that synthetic fertilizers act faster than crop rotation',
        'To show why cereal crops suffer from root diseases',
      ],
      correctIdx: 1,
      explanation:
        'Tác giả nhắc tới vi khuẩn cố định đạm ở nốt sần rễ cỏ ba lá để lý giải cơ chế sinh học giúp luân canh phục hồi độ màu mỡ cho đất.',
    },
    {
      id: 'toefl-diag-ex-8',
      skill: 'reading',
      partLabel: 'Reading (Sentence Simplification)',
      passage:
        'Target sentence: "Although volcanic sulfate aerosols injected into the stratosphere cool Earth’s surface temporarily by reflecting incoming sunlight, their climate effect fades within three years as gravity slowly clears the fine droplets from the upper air."',
      question: 'Which sentence best expresses the essential information in the target sentence?',
      options: [
        'Stratospheric aerosols permanently block incoming sunlight because gravity cannot pull fine droplets down.',
        'Volcanic eruptions warm Earth’s surface for three years before aerosols enter the stratosphere.',
        'Gravity creates volcanic sulfate aerosols inside the stratosphere every three years.',
        'Volcanic stratospheric aerosols briefly cool the planet by reflecting sunlight, but dissipate within three years.',
      ],
      correctIdx: 3,
      explanation:
        'Phương án D giữ trọn hai mệnh đề cốt lõi: hạt khí dung núi lửa làm mát Trái Đất tạm thời nhờ phản xạ ánh sáng mặt trời, nhưng tác dụng tan biến trong vòng 3 năm.',
    },
    {
      id: 'toefl-diag-ex-9',
      skill: 'reading',
      partLabel: 'Reading (Pronoun Reference)',
      passage:
        'Cognitive psychologists distinguish between raw sensory storage and working memory, which holds only about four unrelated items simultaneously. When learners group individual digits into familiar dates or acronyms—a strategy termed chunking—they dramatically expand how much information remains active during complex problem solving.',
      question: 'In the passage, the word "they" refers to:',
      options: [
        'cognitive psychologists',
        'individual digits',
        'learners',
        'familiar dates',
      ],
      correctIdx: 2,
      explanation:
        'Chủ ngữ của mệnh đề trạng ngữ phía trước là "learners" ("When learners group... they dramatically expand..."), nên "they" chỉ người học.',
    },
    {
      id: 'toefl-diag-ex-10',
      skill: 'vocab',
      partLabel: 'Writing Task 1 (Integrated Strategy)',
      question: 'When summarizing a lecture that refutes a reading passage in TOEFL Integrated Writing, which reporting phrase is most appropriate?',
      options: [
        'The lecturer casts doubt on the reading’s assertion by pointing out that...',
        'Personally, I strongly disagree with the reading passage because...',
        'Both the author and I believe that modern research proves...',
        'You should ignore the reading’s first argument since it makes no sense.',
      ],
      correctIdx: 0,
      explanation:
        'Bài Integrated Writing tuyệt đối khách quan, không dùng ngôi thứ nhất ("I/Personally") và ưu tiên động từ/cụm tường thuật học thuật như "casts doubt on... by pointing out that...".',
    },
    {
      id: 'toefl-diag-ex-11',
      skill: 'grammar',
      partLabel: 'Academic Grammar & Precision',
      question: 'Select the grammatically accurate sentence suitable for a TOEFL academic essay:',
      options: [
        'Measuring nearly forty meters long, the researchers photographed the fossilized whale.',
        'Despite of heavy rainfall, the archaeological team continued mapping the trench.',
        'The survey revealed that students prefer flexible schedules and to work remotely.',
        'Had the municipal council invested earlier, urban transit delays would not have escalated.',
      ],
      correctIdx: 3,
      explanation:
        'D dùng chuẩn đảo ngữ điều kiện loại 3 ("Had + S + V3, S + would not have + V3"). A lỗi chủ ngữ lơ lửng ("Measuring... the researchers"); B sai "Despite of"; C lỗi song song ("flexible schedules" vs "to work").',
    },
    {
      id: 'toefl-diag-ex-12',
      skill: 'vocab',
      partLabel: 'Writing Task 2 (Academic Discussion)',
      question: 'Which opening line best connects your Academic Discussion post to a classmate’s argument while introducing a distinct perspective?',
      options: [
        'My classmate is completely wrong, and here is a list of three unrelated facts.',
        'While Elena raises a valid point about lab costs, shifting basic simulations online need not sacrifice hands-on training if universities adopt hybrid schedules.',
        'In conclusion, I would like to discuss how technology impacts society in general.',
        'I agree 100 percent with Elena and have nothing further to add to her post.',
      ],
      correctIdx: 1,
      explanation:
        'Mở bài Task 2 xuất sắc cần công nhận tự nhiên ý bạn học ("While Elena raises a valid point...") rồi chuyển sang góc nhìn hoặc giải pháp mới của riêng mình.',
    },
  ],

  reading: [
    {
      id: 'toefl-read-ex-1',
      partLabel: 'Academic Reading — Paleoclimatology',
      title: 'Ice Cores as Archives of Ancient Atmospheres',
      level: 'C1',
      passage:
        'High on the polar plateaus of Antarctica and Greenland, snowfall rarely melts; instead, successive winter layers compress deeper snow beneath into dense glacial ice. Drilling hollow cylindrical cores up to three kilometers long enables paleoclimatologists to inspect preserved climate records stretching back hundreds of thousands of years. Each annual band acts like a page in a chronological ledger, trapping windblown volcanic ash, pollen grains, and microscopic sea-salt crystals that reveal past storm intensity and regional vegetation.\n\nEven more valuable are tiny pockets of ancient air sealed inside the ice. As porous snow compacts into impermeable ice—a transition zone known as the firn—air continues circulating through interconnected channels until a depth of roughly sixty to one hundred meters, where overburden pressure finally pinches the pores shut. Consequently, air bubbles trapped at a given depth are always slightly younger than the surrounding frozen water molecules, a chronological offset researchers must calibrate carefully when comparing rapid temperature shifts against greenhouse-gas concentrations.\n\nScientists reconstruct prehistoric temperatures primarily by measuring ratios of heavy to light oxygen isotopes locked in the frozen water itself. During colder glacial intervals, water molecules containing lighter oxygen-16 evaporate more readily from oceans and precipitate at high latitudes, leaving polar ice measurably depleted in heavier oxygen-18. Combined with trapped methane and carbon dioxide readings, these isotopic signatures demonstrate that polar temperatures and atmospheric greenhouse gases rose and fell in close concert across multiple ice-age cycles.',
      viSummary:
        'Lõi băng vùng cực lưu giữ lớp tuyết qua hàng trăm nghìn năm cùng tro bụi, phấn hoa và bọt khí cổ đại. Bọt khí bị niêm phong muộn hơn tuổi băng xung quanh tại vùng firn (độ sâu 60–100m), nên nhà khoa học phải hiệu chỉnh độ lệch thời gian này. Tỷ lệ đồng vị oxy-18/oxy-16 trong băng kết hợp khí CO2/CH4 cho thấy nhiệt độ cực và khí nhà kính biến thiên đồng bộ qua các chu kỳ băng hà.',
      questions: [
        {
          id: 'toefl-read-ex-1-q1',
          questionType: 'Factual Detail',
          question: 'Why are air bubbles inside an ice core younger than the frozen water crystals immediately surrounding them?',
          options: [
            'Volcanic ash melts older air pockets and replaces them with modern air.',
            'Air keeps circulating through porous snow until pores seal at sixty to one hundred meters deep.',
            'Oxygen-18 molecules push younger gases upward through glacial fractures.',
            'Drilling equipment injects surface air into the lower layers of the core.',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn 2 giải thích không khí vẫn lưu thông qua lớp tuyết xốp (firn) cho tới độ sâu khoảng 60–100m mới bị nén kín, khiến khí bị giữ lại trẻ hơn lớp băng bao quanh.',
        },
        {
          id: 'toefl-read-ex-1-q2',
          questionType: 'Vocabulary in Context',
          question: 'The word "impermeable" in paragraph 2 is closest in meaning to:',
          options: [
            'extremely fragile',
            'chemically unstable',
            'brightly transparent',
            'impossible for fluids or gases to pass through',
          ],
          correctIdx: 3,
          explanation:
            'Từ ngữ cảnh "porous snow compacts into impermeable ice", "impermeable" đối lập với "porous" (xốp), nghĩa là đặc khít không cho khí/chất lỏng đi qua.',
        },
        {
          id: 'toefl-read-ex-1-q3',
          questionType: 'Inference',
          question: 'What can be inferred about an Antarctic ice layer containing a very low proportion of oxygen-18?',
          options: [
            'It was deposited during a comparatively cold climate phase.',
            'It formed during an unusually warm tropical storm season.',
            'It contains no trapped greenhouse gases such as methane.',
            'It accumulated near the ocean surface rather than on a polar plateau.',
          ],
          correctIdx: 0,
          explanation:
            'Đoạn 3 nêu rõ trong các giai đoạn băng hà lạnh hơn, băng vùng cực bị suy giảm đồng vị nặng oxy-18 ("measurably depleted in heavier oxygen-18").',
        },
        {
          id: 'toefl-read-ex-1-q4',
          questionType: 'Negative Factual',
          question: 'According to paragraph 1, all of the following are found preserved within glacial ice bands EXCEPT:',
          options: [
            'Windblown volcanic ash',
            'Microscopic sea-salt crystals',
            'Fossilized marine fish skeletons',
            'Pollen grains from past vegetation',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 1 liệt kê tro núi lửa, hạt phấn hoa và tinh thể muối biển nhỏ li ti — không nhắc đến xương cá biển hóa thạch.',
        },
        {
          id: 'toefl-read-ex-1-q5',
          questionType: 'Rhetorical Purpose',
          question: 'Why does the author compare annual ice bands to "a page in a chronological ledger"?',
          options: [
            'To complain that ice-core data is difficult to digitize into spreadsheets',
            'To illustrate that successive ice layers preserve a sequential timeline of environmental clues',
            'To show that early explorers wrote travel logs on sheets of polar ice',
            'To argue that tree rings are less accurate than ocean sediments',
          ],
          correctIdx: 1,
          explanation:
            'Phép ví von như trang sổ cái theo thứ tự thời gian giúp làm rõ đặc tính ghi chép tuần tự qua từng năm của các lớp băng.',
        },
      ],
    },
    {
      id: 'toefl-read-ex-2',
      partLabel: 'Academic Reading — Behavioral Ecology',
      title: 'Tactile Communication and Waggle Signals in Honeybees',
      level: 'B2',
      passage:
        'Inside a pitch-dark beehive, thousands of worker honeybees coordinate nectar foraging without relying on sight. In the mid-twentieth century, ethologist Karl von Frisch demonstrated that a scout returning from a rich flower patch performs a figure-eight movement—called the waggle dance—on the vertical honeycomb. Observers clustering beside the dancer touch her abdomen with their antennae to sense vibrations and follow the dance’s geometry.\n\nVon Frisch’s experiments with scented sugar dishes revealed that two variables encode spatial coordinates. First, the duration of the central straight run corresponds proportionally to flight distance: a longer vibrating run signals a more distant food source. Second, the angle of that straight run relative to straight up on the vertical comb matches the horizontal angle between the sun and the flower patch. Even as the sun moves across the sky over several hours, dancers adjust their orientation accordingly, using an internal circadian clock.\n\nLater critics questioned whether recruits truly read directional angles or simply followed floral odors clinging to the scout’s body. However, robotic bee prototypes programmed by researchers to mimic exact waggle angles—without flying outside to pick up plant scents—successfully steered real nestmates toward designated feeder stations. While the dance also relies on shared scent cues to pinpoint specific blossoms upon arrival, the mechanical bee trials confirmed that symbolic directional encoding lies at the heart of hive communication.',
      viSummary:
        'Trong tổ ong tối đen, ong trinh sát truyền tọa độ nguồn hoa bằng điệu nhảy số 8 (waggle dance). Thời lượng đoạn chạy thẳng biểu thị khoảng cách, còn góc nghiêng so với phương thẳng đứng tương ứng góc lệch so với mặt trời (được điều chỉnh theo đồng hồ sinh học). Thử nghiệm dùng ong robot không mang mùi hoa vẫn dẫn đàn ong bay đúng hướng, chứng tỏ mã hóa tín hiệu định hướng là cốt lõi.',
      questions: [
        {
          id: 'toefl-read-ex-2-q1',
          questionType: 'Factual Detail',
          question: 'How do worker bees inside a dark hive detect the scout’s waggle dance?',
          options: [
            'By watching subtle color changes on the dancer’s wings',
            'By listening to high-pitched buzzing from outside the hive entrance',
            'By touching the dancer’s body with their antennae to feel movement and vibrations',
            'By following ultraviolet light reflected off the honeycomb',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 1 nêu rõ ong thợ chạm râu vào bụng ong trinh sát để cảm nhận rung động và hình dáng điệu nhảy trong bóng tối.',
        },
        {
          id: 'toefl-read-ex-2-q2',
          questionType: 'Factual Comparison',
          question: 'According to paragraph 2, what does a longer straight vibrating run indicate?',
          options: [
            'The flower patch is farther away from the hive.',
            'The nectar has an unusually strong floral scent.',
            'The sun is directly overhead at noon.',
            'The scout encountered bad weather during her return flight.',
          ],
          correctIdx: 0,
          explanation:
            'Đoạn 2 nói thời lượng đoạn chạy thẳng tỷ lệ thuận với khoảng cách bay ("a longer vibrating run signals a more distant food source").',
        },
        {
          id: 'toefl-read-ex-2-q3',
          questionType: 'Rhetorical Purpose',
          question: 'Why does the author describe the robotic bee prototype experiments in paragraph 3?',
          options: [
            'To prove that artificial honeybees produce more nectar than natural colonies',
            'To show that honeybees cannot detect floral odors inside a crowded hive',
            'To argue that Karl von Frisch underestimated the role of circadian clocks',
            'To demonstrate that directional dance geometry works independently of outdoor flower scents',
          ],
          correctIdx: 3,
          explanation:
            'Thí nghiệm ong robot (chưa từng bay ra ngoài dính mùi hoa) vẫn dẫn đường thành công nhằm bác bỏ ý kiến cho rằng ong chỉ lần theo mùi hương.',
        },
        {
          id: 'toefl-read-ex-2-q4',
          questionType: 'Vocabulary in Context',
          question: 'The word "pinpoint" in paragraph 3 is closest in meaning to:',
          options: ['consume', 'locate precisely', 'abandon', 'disguise'],
          correctIdx: 1,
          explanation:
            '"Pinpoint specific blossoms upon arrival" nghĩa là xác định chính xác vị trí bông hoa khi bay tới khu vực đó ("locate precisely").',
        },
        {
          id: 'toefl-read-ex-2-q5',
          questionType: 'Inference',
          question: 'What would likely happen if a scout bee lost its internal circadian clock?',
          options: [
            'Its wings would no longer produce audible vibrations.',
            'Its antennae would stop recognizing sweet sugar solutions.',
            'Its dance angle would become inaccurate as the sun’s position shifted over the day.',
            'Its hive mates would ignore floral scents brought back on its legs.',
          ],
          correctIdx: 2,
          explanation:
            'Ong dùng đồng hồ sinh học (circadian clock) để điều chỉnh góc nhảy theo sự dịch chuyển của mặt trời; nếu mất khả năng này, góc chỉ hướng sẽ sai lệch theo thời gian trong ngày.',
        },
      ],
    },
    {
      id: 'toefl-read-ex-3',
      partLabel: 'Academic Reading — Architecture & Urban History',
      title: 'Cast-Iron Facades and the Rise of Commercial Skyscrapers',
      level: 'C1',
      passage:
        'Before the mid-nineteenth century, tall commercial buildings relied on thick load-bearing brick or stone walls. Because lower walls had to support every story stacked above them, ground-floor masonry on a ten-story structure often exceeded two meters in thickness, leaving cramped interiors and narrow windows. During the 1850s, foundries in New York and St. Louis transformed urban streetscapes by mass-producing cast-iron building fronts—prefabricated columns, arches, and cornices bolted together on site like giant architectural kits.\n\nCast iron excelled under compressive loads, allowing slender exterior pillars to hold up wide floor spans while opening expansive plate-glass storefronts that flooded retail floors with daylight. Just as important, factory molding lowered construction costs and enabled merchants to order ornate classical facades straight from catalog sheets. Within two decades, entire commercial districts boasted gleaming white-painted iron fronts imitating carved marble.\n\nYet cast iron’s structural dominance proved short-lived once buildings climbed beyond eight stories. Under intense tension or sudden fire, cast iron could crack abruptly without bending, and catastrophic urban blazes in Chicago and Boston exposed how uninsulated iron columns buckled when heated. Engineers soon resolved both limitations by encasing rolled steel frames—far stronger in tension—in fire-resistant terracotta tiles. Paired with Elisha Otis’s safety elevator, this steel-skeleton system shifted wall support from exterior facades to an internal grid, inaugurating the true skyscraper era.',
      viSummary:
        'Trước giữa thế kỷ 19, tường gạch chịu lực dày khiến tầng trệt chật hẹp. Mặt tiền bằng gang đúc sẵn (cast iron) ra đời thập niên 1850 giúp cột thanh mảnh hơn, mở rộng cửa kính đón sáng và giảm chi phí đúc hàng loạt. Tuy nhiên gang dễ nứt gãy khi chịu kéo hoặc gặp hỏa hoạn, nên các kỹ sư đã chuyển sang khung thép bọc gạch chịu lửa terracotta kết hợp thang máy an toàn, mở ra kỷ nguyên nhà chọc trời.',
      questions: [
        {
          id: 'toefl-read-ex-3-q1',
          questionType: 'Factual Detail',
          question: 'What architectural drawback of tall load-bearing masonry buildings is mentioned in paragraph 1?',
          options: [
            'Extremely thick ground-floor walls reduced interior space and window size.',
            'Brick walls could not be painted white to resemble marble.',
            'Stone foundations melted rapidly during summer heat waves.',
            'Masonry buildings required safety elevators even at three stories.',
          ],
          correctIdx: 0,
          explanation:
            'Đoạn 1 nêu tường chịu lực tầng trệt có thể dày hơn 2 mét, làm không gian bên trong chật chội và cửa sổ bị thu hẹp.',
        },
        {
          id: 'toefl-read-ex-3-q2',
          questionType: 'Negative Factual',
          question: 'According to paragraph 2, all of the following were advantages of cast-iron fronts EXCEPT:',
          options: [
            'Strong performance under compressive weight',
            'Larger glass windows that brightened retail interiors',
            'Lower costs through standardized factory molding',
            'Natural immunity to buckling during intense city fires',
          ],
          correctIdx: 3,
          explanation:
            'Ngược lại hoàn toàn, đoạn 3 chỉ ra cột gang không bọc cách nhiệt đã bị cong vênh/sụp đổ trong các vụ hỏa hoạn lớn ở Chicago và Boston.',
        },
        {
          id: 'toefl-read-ex-3-q3',
          questionType: 'Sentence Simplification',
          question: 'Which sentence best summarizes the structural shift described in the final sentence of paragraph 3?',
          options: [
            'Safety elevators forced builders to thicken exterior stone walls on skyscrapers.',
            'Terracotta tiles replaced steel beams so exterior facades could stay decorative.',
            'Combining fireproofed steel skeletons with safety elevators transferred structural load inward and launched modern skyscrapers.',
            'Elisha Otis invented rolled steel frames to prevent cast iron from rusting.',
          ],
          correctIdx: 2,
          explanation:
            'Câu cuối nêu việc kết hợp hệ khung thép bọc vật liệu chống cháy cùng thang máy an toàn của Otis đã chuyển tải trọng vào bộ khung bên trong, mở đầu kỷ nguyên nhà chọc trời.',
        },
        {
          id: 'toefl-read-ex-3-q4',
          questionType: 'Vocabulary in Context',
          question: 'The word "abruptly" in paragraph 3 is closest in meaning to:',
          options: ['gradually', 'suddenly', 'silently', 'flexibly'],
          correctIdx: 1,
          explanation:
            '"Crack abruptly without bending" nghĩa là gãy đột ngột mà không uốn dẻo báo trước ("suddenly").',
        },
        {
          id: 'toefl-read-ex-3-q5',
          questionType: 'Inference',
          question: 'Why could builders paint cast-iron fronts to resemble carved marble?',
          options: [
            'Factory molds could reproduce ornate classical decorative shapes cheaply.',
            'Marble quarries in New York supplied dust mixed into iron.',
            'Terracotta tiles were originally carved exclusively from white limestone.',
            'Cast iron weighed less than hollow wooden window frames.',
          ],
          correctIdx: 0,
          explanation:
            'Đoạn 2 nói đúc khuôn tại xưởng giúp tạo ra các chi tiết cổ điển tinh xảo đặt hàng qua danh mục, rồi sơn trắng giả đá cẩm thạch.',
        },
      ],
    },
    {
      id: 'toefl-read-ex-4',
      partLabel: 'Academic Reading — Cognitive Linguistics',
      title: 'Color Categories Across Languages and Perception',
      level: 'B2',
      passage:
        'Although human eyes register millions of subtle wavelength variations along the visible spectrum, spoken languages carve that continuous rainbow into remarkably few basic color terms. In a classic 1969 survey of nearly one hundred languages, anthropologists Brent Berlin and Paul Kay discovered striking cross-cultural patterns: languages with only two color terms always distinguish dark/cool from light/warm; if a third term appears, it is invariably red, followed later by yellow or green, and eventually blue, brown, and purple.\n\nSuch regularities initially suggested that universal human biology—specifically how cone cells in the retina process opposing color channels—dictates color naming regardless of culture. Yet more recent psycholinguistic experiments show that vocabulary can still nudge rapid visual perception in subtle ways. Consider Russian, which lacks a single umbrella term for "blue" and instead requires speakers to separate light blue (goluboy) from dark blue (siniy) as distinct categories, much as English separates red from pink.\n\nWhen researchers timed Russian and English volunteers picking out an odd-colored square from a grid of blue shades, Russian speakers responded significantly faster whenever the target and background crossed their goluboy/siniy boundary than when both squares fell inside the same Russian category. English speakers showed no such boundary speedup. Importantly, both groups could see identical physical color differences when given unlimited time; language did not alter their eyesight, yet habitual lexical boundaries sharpened split-second visual discrimination.',
      viSummary:
        'Dù mắt người phân biệt hàng triệu sắc độ, ngôn ngữ chỉ chia thành ít từ chỉ màu cơ bản theo trình tự phổ quát (Berlin & Kay). Tuy sinh học thị giác là nền tảng chung, thí nghiệm so sánh người nói tiếng Nga (tách biệt xanh nhạt goluboy và xanh đậm siniy) với tiếng Anh cho thấy thói quen phân loại từ vựng giúp tăng tốc độ nhận diện tức thì qua ranh giới màu của ngôn ngữ đó.',
      questions: [
        {
          id: 'toefl-read-ex-4-q1',
          questionType: 'Factual Detail',
          question: 'According to Berlin and Kay’s 1969 survey, what happens when a language possesses exactly three basic color terms?',
          options: [
            'It separates light blue from dark blue.',
            'It includes purple and brown alongside white.',
            'It merges yellow and green into one category.',
            'It always adds red to its dark/cool and light/warm distinction.',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 1 ghi nhận nếu ngôn ngữ có từ chỉ màu thứ ba, từ đó luôn là màu đỏ ("if a third term appears, it is invariably red").',
        },
        {
          id: 'toefl-read-ex-4-q2',
          questionType: 'Rhetorical Purpose',
          question: 'Why does the author compare Russian’s distinction between "goluboy" and "siniy" to English’s "red" and "pink"?',
          options: [
            'To clarify that Russian treats light blue and dark blue as wholly separate basic categories, not mere shades of one color',
            'To argue that English speakers confuse pink and dark blue in timed laboratory tests',
            'To demonstrate that Russian has fewer color words overall than English',
            'To prove that red and pink excite different retinal cone cells',
          ],
          correctIdx: 0,
          explanation:
            'Ví dụ "red vs pink" giúp người đọc tiếng Anh dễ hình dung rằng người Nga coi xanh nhạt và xanh đậm là hai phạm trù màu độc lập chứ không chỉ là biến thể của một màu "blue".',
        },
        {
          id: 'toefl-read-ex-4-q3',
          questionType: 'Factual Detail',
          question: 'In the timed square-matching experiment, when did Russian speakers show a speed advantage over English speakers?',
          options: [
            'When identifying yellow squares against a green background',
            'When given unlimited time to inspect subtle wavelengths',
            'When the target square and background squares crossed the goluboy/siniy boundary',
            'When all squares belonged to the exact same dark blue shade',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 3 nêu người nói tiếng Nga phản xạ nhanh hơn hẳn khi cặp màu nằm vắt qua ranh giới giữa hai từ goluboy và siniy.',
        },
        {
          id: 'toefl-read-ex-4-q4',
          questionType: 'Negative Factual',
          question: 'Which statement about the research findings is NOT supported by paragraph 3?',
          options: [
            'English speakers showed no reaction-time jump across the light/dark blue divide.',
            'With unlimited viewing time, both groups perceived identical color differences.',
            'Routine vocabulary categories influenced split-second visual sorting.',
            'Speaking Russian physically restructures retinal cone cells in the eye.',
          ],
          correctIdx: 3,
          explanation:
            'Bài đọc khẳng định rõ ngôn ngữ không thay đổi thị lực sinh học ("language did not alter their eyesight"), nên D sai.',
        },
        {
          id: 'toefl-read-ex-4-q5',
          questionType: 'Vocabulary in Context',
          question: 'The word "nudge" in paragraph 2 is closest in meaning to:',
          options: ['erase completely', 'gently influence', 'replace biologically', 'measure strictly'],
          correctIdx: 1,
          explanation:
            '"Vocabulary can still nudge rapid visual perception in subtle ways" = từ vựng có thể tác động nhẹ / thúc đẩy tinh tế nhận thức thị giác ("gently influence").',
        },
      ],
    },
  ],

  listening: [
    {
      id: 'toefl-list-ex-1',
      partLabel: 'Campus Conversation (Lab Facilities)',
      title: 'Reserving the Electron Microscopy Suite for a Senior Capstone',
      level: 'B2',
      speakerContext: 'Sinh viên Liam trao đổi với quản lý phòng thí nghiệm (Dr. Patel) về việc đặt lịch dùng kính hiển vi điện tử.',
      audioScript:
        'Liam: Excuse me, Dr. Patel, I’m finishing my materials-science capstone on biodegradable food packaging, and I need to photograph surface fibers under the scanning electron microscope. Dr. Patel: Sure, Liam, our imaging suite is open to seniors, though before booking machine hours you must pass the ninety-minute radiation and vacuum-chamber safety orientation. Have you completed that yet? Liam: Not yet—is it offered this week? Dr. Patel: Every Wednesday at four in Room 108. Once your badge is activated, keep in mind that regular daytime blocks carry a forty-dollar hourly user fee charged to your department grant. Liam: Oh, my advisor told me our small capstone budget is nearly maxed out. Is there any way around that fee? Dr. Patel: Actually, yes! Student bookings scheduled between seven and ten in the evening are fee-waived for undergraduates, provided you already coated your samples in advance. Liam: Evening slots work great for me—and where do I coat the samples? Dr. Patel: Just stop by the prep bench next door at least an hour early so our grad assistant can run the gold-sputter coater with you.',
      viSummary:
        'Liam cần chụp ảnh bề mặt bao bì phân hủy sinh học bằng kính hiển vi điện tử. TS. Patel yêu cầu cậu hoàn thành buổi tập huấn an toàn 90 phút vào thứ Tư lúc 4 giờ (phòng 108). Vì ngân sách nhóm sắp hết, Liam chọn khung giờ tối 19h–22h được miễn phí (thay vì 40 USD/giờ ban ngày), và sẽ tới bàn chuẩn bị kế bên trước ít nhất 1 tiếng để trợ giảng phủ vàng mẫu vật.',
      questions: [
        {
          id: 'toefl-list-ex-1-q1',
          question: 'Why does Liam visit Dr. Patel’s office?',
          options: [
            'To arrange access to an electron microscope for his senior capstone project',
            'To request extra grant money to buy biodegradable food packaging',
            'To apply for a job as a graduate lab assistant',
            'To report a broken vacuum chamber in Room 108',
          ],
          correctIdx: 0,
          explanation:
            'Liam muốn đặt lịch chụp ảnh sợi bề mặt cho đồ án tốt nghiệp bằng kính hiển vi điện tử quét.',
        },
        {
          id: 'toefl-list-ex-1-q2',
          question: 'What prerequisite must Liam complete before his badge is activated to book the microscope?',
          options: [
            'Submit a written proposal signed by the physics chair',
            'Pay a refundable forty-dollar equipment deposit',
            'Attend a ninety-minute safety orientation on Wednesday afternoon',
            'Co-author a safety manual with a graduate assistant',
          ],
          correctIdx: 2,
          explanation:
            'Cậu phải hoàn thành buổi hướng dẫn an toàn 90 phút vào thứ Tư lúc 4 giờ chiều ở phòng 108.',
        },
        {
          id: 'toefl-list-ex-1-q3',
          question: 'How can Liam avoid the forty-dollar hourly machine fee?',
          options: [
            'By sharing daytime slots with three other seniors',
            'By reserving evening hours between seven and ten p.m.',
            'By coating his samples with silver instead of gold',
            'By asking Dr. Patel to photograph the samples for him',
          ],
          correctIdx: 1,
          explanation:
            'Sinh viên đại học đặt lịch buổi tối từ 7h đến 10h sẽ được miễn phí sử dụng máy ("fee-waived for undergraduates").',
        },
        {
          id: 'toefl-list-ex-1-q4',
          question: 'Why does Dr. Patel advise Liam to arrive at least an hour before his evening booking?',
          options: [
            'The imaging suite locks its main doors at six o’clock.',
            'Radiation badges take sixty minutes to print.',
            'Vacuum pumps require an hour to cool down after daytime use.',
            'A graduate assistant needs time to help coat his samples beforehand.',
          ],
          correctIdx: 3,
          explanation:
            'Để được miễn phí ca tối, mẫu phải được phủ vàng trước, nên Liam cần đến bàn chuẩn bị kế bên sớm ít nhất 1 tiếng để trợ giảng chạy máy phủ vàng.',
        },
        {
          id: 'toefl-list-ex-1-q5',
          question: 'What can be inferred about Liam’s reaction to the evening schedule option?',
          options: [
            'He is relieved and willing to adjust his schedule to save project funds.',
            'He is frustrated because he works an off-campus job every evening.',
            'He decides to switch to a standard light microscope instead.',
            'He doubts that the graduate assistant knows how to operate the coater.',
          ],
          correctIdx: 0,
          explanation:
            'Liam đáp ngay "Evening slots work great for me" khi nghe ca tối được miễn phí, cho thấy cậu vui vẻ và sẵn sàng sắp xếp lịch để tiết kiệm ngân sách.',
        },
      ],
    },
    {
      id: 'toefl-list-ex-2',
      partLabel: 'Academic Lecture (Marine Biology)',
      title: 'Bioluminescence in the Mesopelagic Zone',
      level: 'C1',
      speakerContext: 'Bài giảng môn Sinh học Biển về các chiến lược sinh tồn bằng phát quang sinh học ở tầng biển trung sâu.',
      audioScript:
        'Professor: Descend below two hundred meters into the ocean’s mesopelagic—or "twilight"—zone, and sunlight fades to a faint blue haze. Remarkably, over seventy-five percent of animals living here generate their own light, a chemical reaction called bioluminescence. Inside specialized organs, an enzyme named luciferase oxidizes a light-emitting compound called luciferin, releasing cool blue-green photons with almost zero wasted heat. Now, why advertise yourself in pitch darkness? Surprisingly, light often works as camouflage! Take the hatchetfish: predators swimming below look upward and spot dark silhouettes against dim daylight filtering from above. To erase its shadow, the hatchetfish lines its belly with downward-pointing light organs tuned precisely to match overhead brightness—a trick known as counter-illumination. Meanwhile, one predator, the deep-sea loosejaw dragonfish, evolved a sneaky exception to blue-green lighting. Most ocean dwellers cannot see red wavelengths, because red light gets absorbed near the surface. Yet loosejaws produce a narrow beam of far-red light beneath their eyes, acting like an invisible sniper scope to spot shrimp without alerting prey or nearby rivals.',
      viSummary:
        'Ở tầng biển trung sâu (>200m), hơn 75% sinh vật tự phát sáng lạnh qua phản ứng luciferin–luciferase. Cá rìu (hatchetfish) dùng cơ chế "counter-illumination" phát sáng dưới bụng khớp độ sáng từ mặt nước để xóa bóng đen, ngụy trang khỏi thú săn mồi bên dưới. Cá rồng hàm lỏng (loosejaw) lại tiến hóa tia sáng đỏ xa dưới mắt — bước sóng mà đa số sinh vật biển không nhìn thấy — giúp săn mồi như dùng kính ngắm tàng hình.',
      questions: [
        {
          id: 'toefl-list-ex-2-q1',
          question: 'What is the lecture mainly about?',
          options: [
            'Why red wavelengths penetrate deeper into the ocean than blue light',
            'How deep-sea organisms chemically produce and strategically use bioluminescence',
            'Seasonal vertical migrations of shrimp in sunlit coastal waters',
            'Differences between volcanic ocean vents and coral reefs',
          ],
          correctIdx: 1,
          explanation:
            'Bài giảng trình bày cơ chế hóa học tạo ánh sáng sinh học (luciferin/luciferase) và các chiến thuật dùng ánh sáng ở tầng trung sâu (ngụy trang xóa bóng, săn mồi bằng ánh sáng đỏ).',
        },
        {
          id: 'toefl-list-ex-2-q2',
          question: 'What chemical characteristic makes biological light production remarkably efficient?',
          options: [
            'It relies on trapped sunlight stored inside fish scales.',
            'It requires high water temperatures near hydrothermal vents.',
            'It splits saltwater molecules using electrical currents.',
            'It releases cool photons while losing almost no energy as heat.',
          ],
          correctIdx: 3,
          explanation:
            'Giáo sư nhấn mạnh phản ứng oxy hóa luciferin tạo ra photon xanh lam-lục mát lạnh với hầu như không có nhiệt lượng lãng phí ("almost zero wasted heat").',
        },
        {
          id: 'toefl-list-ex-2-q3',
          question: 'How does counter-illumination protect the hatchetfish?',
          options: [
            'Downward belly lights match dim overhead daylight, hiding the fish’s dark silhouette from below.',
            'Bright flashes around its tail blind approaching predators.',
            'Glowing bacteria inside its mouth lure shrimp directly into its jaws.',
            'Blue-green sparks confuse nearby rivals during mating season.',
          ],
          correctIdx: 0,
          explanation:
            'Ánh sáng hướng xuống ở bụng cá rìu cân bằng với ánh sáng yếu từ trên mặt biển chiếu xuống, giúp xóa bỏ bóng tối tương phản khi kẻ săn mồi nhìn từ dưới lên.',
        },
        {
          id: 'toefl-list-ex-2-q4',
          question: 'Why does the professor compare the loosejaw dragonfish’s red light to "an invisible sniper scope"?',
          options: [
            'Because red light travels faster than blue light underwater',
            'Because the fish fires boiling water along the beam',
            'Because the dragonfish can detect prey illuminated by red light that other sea creatures cannot see',
            'Because the beam extends for several kilometers across the ocean floor',
          ],
          correctIdx: 2,
          explanation:
            'Đa số sinh vật biển sâu không cảm nhận được bước sóng đỏ, nên cá rồng hàm lỏng chiếu tia đỏ tìm mồi mà con mồi hay đối thủ không hề hay biết.',
        },
        {
          id: 'toefl-list-ex-2-q5',
          question: 'Why do most mesopelagic marine animals lack eyes sensitive to red wavelengths?',
          options: [
            'Red light is only emitted by coral reefs during summer.',
            'Sunlight’s red wavelengths are absorbed near the ocean surface, leaving none at depth.',
            'Luciferase enzymes destroy red pigment cells in deep-water fish.',
            'High water pressure bends red light upward away from fish eyes.',
          ],
          correctIdx: 1,
          explanation:
            'Ánh sáng đỏ bị nước hấp thụ ngay gần tầng mặt nên xuống sâu không còn ánh sáng đỏ tự nhiên, khiến đa số loài tầng sâu không tiến hóa khả năng nhìn màu đỏ.',
        },
      ],
    },
    {
      id: 'toefl-list-ex-3',
      partLabel: 'Campus Conversation (Academic Advising)',
      title: 'Transferring Field-School Credits and Adjusting Graduation Plans',
      level: 'B2',
      speakerContext: 'Sinh viên Priya gặp cố vấn học tập (Mr. Alvarez) để xử lý tín chỉ thực địa khảo cổ học và môn điều kiện tiên quyết.',
      audioScript:
        'Priya: Hi, Mr. Alvarez. I was accepted into an eight-week archaeological field school in Oaxaca this July, hosted by another university, and I’m trying to figure out how those six credits fit into my anthropology degree here. Mr. Alvarez: Congratulations, Priya—field schools look great on grad-school applications! Let’s check the syllabus. Normally, external summer courses count only as general electives unless the department chair signs a major-equivalency form. Looking at your course outline, though, you’ll spend thirty hours a week excavating and cataloging pottery shards, which easily matches our Field Methods Lab requirement. Priya: Awesome! What about my Statistics for Social Sciences class? I was planning to take it in the fall, and I heard it’s a prerequisite for Senior Seminar in the spring. Mr. Alvarez: Correct, though wait—the fall section of Statistics is already waitlisted with twelve students ahead of you. Have you considered taking the online eight-week Statistics section offered through our Continuing Education division right after you return in August? Priya: Would that count toward my major? Mr. Alvarez: Yes, it uses the exact same textbook and department exam, so clearing it before October keeps your Senior Seminar spot completely safe.',
      viSummary:
        'Priya được nhận đi thực địa khảo cổ 8 tuần (6 tín chỉ) ở Oaxaca. Cố vấn Alvarez cho biết thông thường tín chỉ trường ngoài chỉ tính tự chọn chung, nhưng dựa vào đề cương 30 giờ/tuần, trưởng khoa có thể ký đơn công nhận tương đương môn Field Methods Lab. Ngoài ra, lớp Thống kê mùa thu đã kín chỗ chờ (12 người), nên thầy khuyên Priya học lớp Thống kê online 8 tuần vào tháng 8 của hệ Continuing Education để kịp điều kiện cho Senior Seminar mùa xuân.',
      questions: [
        {
          id: 'toefl-list-ex-3-q1',
          question: 'Why does Priya meet with Mr. Alvarez?',
          options: [
            'To appeal a failing grade from last semester’s statistics exam',
            'To drop her anthropology major in favor of continuing education',
            'To verify how summer field-school credits apply to her degree and plan her fall schedule',
            'To ask for travel funding for a graduate conference in Oaxaca',
          ],
          correctIdx: 2,
          explanation:
            'Priya muốn biết 6 tín chỉ khóa thực địa mùa hè ở Oaxaca được tính thế nào vào chuyên ngành nhân học và sắp xếp lịch học môn Thống kê.',
        },
        {
          id: 'toefl-list-ex-3-q2',
          question: 'What is required for Priya’s external field-school course to satisfy the Field Methods Lab requirement?',
          options: [
            'A major-equivalency form signed by the anthropology department chair',
            'A letter of recommendation from twelve waitlisted students',
            'Retaking the pottery cataloging exam back on campus in October',
            'Enrolling in an extra eight-week seminar during July',
          ],
          correctIdx: 0,
          explanation:
            'Khóa học ngoài trường cần trưởng khoa ký đơn công nhận tương đương chuyên ngành ("major-equivalency form") mới thay thế được môn bắt buộc.',
        },
        {
          id: 'toefl-list-ex-3-q3',
          question: 'Why does Mr. Alvarez advise against waiting for the regular fall Statistics section?',
          options: [
            'The professor teaching Statistics is away at a field school.',
            'It uses a different textbook than Senior Seminar.',
            'It has been permanently canceled by the registrar.',
            'Twelve students are already ahead of Priya on the waitlist.',
          ],
          correctIdx: 3,
          explanation:
            'Lớp Thống kê học kỳ mùa thu đã đầy và có tới 12 sinh viên đang xếp hàng chờ trước Priya.',
        },
        {
          id: 'toefl-list-ex-3-q4',
          question: 'Why is completing Statistics before spring important for Priya?',
          options: [
            'It is required before she can travel to Oaxaca in July.',
            'It serves as a prerequisite for enrolling in Senior Seminar.',
            'It lowers the tuition fee for her summer field school.',
            'It waives the thirty-hour weekly excavation requirement.',
          ],
          correctIdx: 1,
          explanation:
            'Thống kê là môn điều kiện tiên quyết ("prerequisite") để đăng ký Senior Seminar vào học kỳ mùa xuân.',
        },
        {
          id: 'toefl-list-ex-3-q5',
          question: 'What does Mr. Alvarez reassure Priya about the August online Statistics course?',
          options: [
            'It contains no exams or graded assignments.',
            'It counts as six field-work laboratory credits.',
            'It covers the same textbook and department exam, fully satisfying the prerequisite.',
            'It begins in July while she is still excavating in Mexico.',
          ],
          correctIdx: 2,
          explanation:
            'Thầy Alvarez khẳng định lớp trực tuyến tháng 8 dùng đúng giáo trình và bài thi của khoa nên hoàn toàn được công nhận cho chuyên ngành.',
        },
      ],
    },
    {
      id: 'toefl-list-ex-4',
      partLabel: 'Academic Lecture (Economic History)',
      title: 'The Economics of Nineteenth-Century Canal Networks',
      level: 'C1',
      speakerContext: 'Bài giảng môn Lịch sử Kinh tế về tác động và giới hạn của hệ thống kênh đào thế kỷ 19 ở Bắc Mỹ.',
      audioScript:
        'Professor: Before paved highways or freight trains crisscrossed North America, hauling heavy timber, grain, or coal overland by horse-drawn wagon was shockingly expensive. Moving a ton of freight fifty kilometers by mud road could double its market price. Enter the early-nineteenth-century canal boom. When the Erie Canal opened across New York State in 1825, a single mule walking along a towpath could pull a barge carrying thirty tons of wheat—slashing shipping rates by nearly ninety percent! Suddenly, inland farmers could sell grain profitably in Atlantic port cities, while towns seated along canal locks exploded into manufacturing hubs. Yet canal companies soon hit physical bottlenecks. First, northern canals froze solid for four or five months every winter, halting commerce altogether. Second, building watertight stone locks across steep mountain ridges demanded tremendous labor and capital. Thus, when steam railroads arrived in the 1840s—capable of running year-round over steeper grades at triple the speed—many rural canals went bankrupt within a single generation, though a few deep-water routes still carry bulk barges today.',
      viSummary:
        'Trước tàu hỏa và đường nhựa, vận tải đường bộ bằng xe ngựa rất đắt đỏ. Kênh đào Erie (1825) giúp một con la kéo sà lan chở 30 tấn lúa mì, giảm gần 90% cước phí và giúp các thị trấn ven kênh bùng nổ. Tuy nhiên kênh đào đóng băng 4–5 tháng mùa đông và khó vượt địa hình dốc núi, nên nhanh chóng bị đường sắt chạy quanh năm với tốc độ gấp ba thay thế từ thập niên 1840.',
      questions: [
        {
          id: 'toefl-list-ex-4-q1',
          question: 'Why does the professor mention "moving a ton of freight fifty kilometers by mud road"?',
          options: [
            'To show that horse-drawn wagons were faster than canal barges',
            'To prove that grain spoiled faster on water than on land',
            'To explain why Atlantic ports stopped importing coal',
            'To emphasize how prohibitively expensive overland transport was before canals',
          ],
          correctIdx: 3,
          explanation:
            'Ví dụ kéo 1 tấn hàng đi 50 km đường đất làm giá hàng tăng gấp đôi nhằm nhấn mạnh chi phí vận tải đường bộ trước thời kỳ kênh đào đắt đỏ đến mức nào.',
        },
        {
          id: 'toefl-list-ex-4-q2',
          question: 'What economic impact followed the opening of the Erie Canal in 1825?',
          options: [
            'Inland grain prices rose tenfold in port cities.',
            'Shipping costs dropped by roughly ninety percent, turning canal towns into thriving hubs.',
            'Atlantic port cities closed their docks to inland farmers.',
            'Mule-drawn wagons replaced barges along northern rivers.',
          ],
          correctIdx: 1,
          explanation:
            'Cước vận tải giảm gần 90%, nông dân nội địa bán được lúa mì ra cảng Đại Tây Dương và các thị trấn quanh âu thuyền bùng nổ thành trung tâm sản xuất.',
        },
        {
          id: 'toefl-list-ex-4-q3',
          question: 'Which two physical constraints limited nineteenth-century canal networks?',
          options: [
            'Shortage of wooden barges and lack of mule feed',
            'Frequent ocean hurricanes and shallow harbor mud',
            'Winter ice closures and costly lock construction across steep terrain',
            'Competition from paved highways and diesel trucks',
          ],
          correctIdx: 2,
          explanation:
            'Hai điểm nghẽn được nêu là kênh miền Bắc đóng băng suốt 4–5 tháng mùa đông và việc xây âu thuyền đá qua sườn núi dốc rất tốn kém.',
        },
        {
          id: 'toefl-list-ex-4-q4',
          question: 'What advantages enabled steam railroads to overtake most rural canals after the 1840s?',
          options: [
            'Trains operated year-round, climbed steeper slopes, and traveled three times faster.',
            'Railroads required zero upfront capital or steel tracks.',
            'Locomotives carried thirty times more weight than deep-water barges.',
            'State governments banned mules from walking beside waterways.',
          ],
          correctIdx: 0,
          explanation:
            'Đường sắt chạy được quanh năm không ngại đóng băng, leo độ dốc lớn hơn và nhanh gấp ba lần sà lan.',
        },
        {
          id: 'toefl-list-ex-4-q5',
          question: 'What does the professor clarify at the very end of the lecture?',
          options: [
            'No canal in North America remained open after 1850.',
            'Railroads also shut down during snowy winter months.',
            'Erie Canal locks were rebuilt out of cast iron in 1900.',
            'A handful of deep-water canal routes still transport heavy bulk cargo today.',
          ],
          correctIdx: 3,
          explanation:
            'Câu kết lưu ý dù nhiều kênh nông thôn phá sản, một số tuyến kênh nước sâu hiện nay vẫn còn chở hàng rời cỡ lớn.',
        },
      ],
    },
  ],

  writing: [
    {
      id: 'toefl-write-ex-1',
      taskLabel: 'Writing Task 1 (Integrated Synthesis — 20 phút)',
      title: 'Reintroducing Wolves to Restore Forest Watersheds',
      recommendedMinutes: 20,
      wordCountRange: '160 – 225 từ',
      minWords: 150,
      prompt:
        'Summarize the points made in the lecture notes below, explaining how they challenge the claims in the reading.\n[Reading Claims]: (1) Reintroducing gray wolves into national parks causes severe economic ruin for nearby cattle and sheep ranchers. (2) Wolf packs wipe out elk herds, depriving visitors of wildlife sightings. (3) Allowing wild wolves near hiking trails poses an unacceptable threat to human campers.\n[Lecture Counterpoints]: (1) Conservation funds reimburse ranchers at full market value for verified losses, and nonlethal deterrents like guard dogs cut livestock attacks sharply. (2) Wolves cull mainly sick or elderly elk, preventing overgrazing so riverside willows recover and sustain healthier overall wildlife diversity. (3) Wolves instinctively avoid people; verified attacks on park hikers remain virtually nonexistent compared with bear or vehicle incidents.',
      promptVi:
        'Tổng hợp khách quan 3 luận điểm phản bác từ Bài giảng đối với 3 lo ngại mà Bài đọc nêu ra về việc tái thả sói xám vào vườn quốc gia (không đưa ý kiến cá nhân).',
      outline: [
        'Mở bài (2 câu): Nêu chủ đề tái thả sói xám và khẳng định giảng viên phản bác cả 3 quan ngại trong bài đọc.',
        'Thân bài 1 (Ranchers): Bài đọc lo thiệt hại kinh tế cho trang trại; giảng viên chỉ ra quỹ bảo tồn đền bù theo giá thị trường + chó bảo vệ/biện pháp phi sát thương giảm hẳn tấn công.',
        'Thân bài 2 (Elk & Ecosystem): Bài đọc sợ đàn nai sừng tấm biến mất; giảng viên giải thích sói chỉ săn cá thể yếu, giúp giảm gặm cỏ quá mức và phục hồi liễu ven sông.',
        'Thân bài 3 (Human Safety): Bài đọc lo nguy hiểm cho du khách; giảng viên nhấn mạnh sói bản năng tránh người và gần như không có vụ tấn công người đi bộ nào.',
      ],
      scoringCriteriaFocus: [
        'Đối chiếu trọn vẹn cả 3 cặp Reading – Lecture với thông tin chi tiết chính xác.',
        'Giữ văn phong tổng hợp khách quan, sử dụng đa dạng động từ tường thuật ("refutes", "counters", "points out").',
      ],
      highBandKeywords: [
        { phrase: 'casts doubt on', meaningVi: 'đặt nghi vấn / bác bỏ luận điểm' },
        { phrase: 'reimburse ranchers at market value', meaningVi: 'bồi hoàn cho chủ trang trại theo giá thị trường' },
        { phrase: 'nonlethal deterrents', meaningVi: 'biện pháp xua đuổi không gây sát thương' },
        { phrase: 'prevent overgrazing', meaningVi: 'ngăn chặn tình trạng gặm cỏ quá mức' },
        { phrase: 'virtually nonexistent', meaningVi: 'gần như không tồn tại' },
      ],
      modelAnswer:
        'The reading passage raises three objections to reintroducing gray wolves into national parks, yet the lecturer refutes each concern with ecological and practical evidence.\n\nFirst, although the reading argues that returning wolves devastate neighboring ranchers financially, the lecturer points out that dedicated conservation programs reimburse livestock owners at full market value for confirmed kills. Furthermore, nonlethal deterrents—such as specialized guard dogs and acoustic fencing—dramatically reduce cattle losses in practice.\n\nSecond, contrary to the passage’s fear that wolves eliminate elk herds and ruin tourist sightings, the speaker explains that packs primarily target weak or elderly elk. By keeping herd numbers balanced, wolves stop overgrazing along riverbanks, allowing willow trees to regenerate and supporting richer biodiversity across the watershed.\n\nFinally, while the reading warns that wolves endanger human campers, the lecturer counters that wild wolves instinctively steer clear of humans. Statistical records show that verified wolf attacks on park hikers remain virtually nonexistent, far rarer than injuries caused by traffic accidents or other wildlife.',
      modelNotesVi:
        'Bài mẫu đạt ~168 từ, đối chiếu rành mạch 1–1 cả 3 cặp luận điểm, tuyệt đối khách quan và giữ từ khóa chuẩn xác như "nonlethal deterrents", "overgrazing", "virtually nonexistent".',
    },
    {
      id: 'toefl-write-ex-2',
      taskLabel: 'Writing Task 2 (Academic Discussion — 10 phút)',
      title: 'Banning Smartphones During Undergraduate Seminars',
      recommendedMinutes: 10,
      wordCountRange: '110 – 150 từ',
      minWords: 100,
      prompt:
        'Your professor posted a question on the course discussion board:\n"Should universities implement a strict campus-wide ban on smartphones inside undergraduate seminar classrooms, or leave device rules up to individual instructors? Explain your view."\nStudent A (Marcus) argues a strict ban protects attention spans because notifications distract nearby classmates.\nStudent B (Mei) argues bans hurt accessibility and prevent instructors from running live classroom polls.\nWrite a post responding to the professor’s question with your own reasoning (at least 100 words).',
      promptVi:
        'Trả lời thảo luận học thuật (10 phút, ≥100 từ): nên cấm triệt để điện thoại thông minh trong lớp học đại học hay để từng giảng viên tự quyết định? Phản hồi tự nhiên ý của Marcus hoặc Mei.',
      outline: [
        'Mở đầu (1–2 câu): Ghi nhận cả mối lo mất tập trung của Marcus lẫn nhu cầu công cụ lớp học của Mei, chốt lập trường trao quyền linh hoạt cho giảng viên.',
        'Thân bài (3–4 câu): Đề xuất mô hình "segmented device policy" — tắt máy khi thảo luận chuyên sâu, mở máy có chủ đích trong 5 phút làm khảo sát nhanh hoặc tra cứu học liệu.',
        'Kết thúc (1 câu): Khẳng định cách làm linh hoạt vừa rèn tính tự chủ vừa giữ được lợi ích hỗ trợ tiếp cận.',
      ],
      scoringCriteriaFocus: [
        'Đóng góp ý tưởng giải pháp cụ thể ("segmented device policy") thay vì lặp lại y nguyên ý của Marcus hay Mei.',
        'Kiểm soát ngữ pháp câu phức và từ vựng học thuật trong 110–150 từ.',
      ],
      highBandKeywords: [
        { phrase: 'blanket prohibition', meaningVi: 'lệnh cấm đồng loạt tuyệt đối' },
        { phrase: 'peripheral distraction', meaningVi: 'sự xao nhãng từ xung quanh' },
        { phrase: 'instructor autonomy', meaningVi: 'quyền tự chủ của giảng viên' },
        { phrase: 'intentional integration', meaningVi: 'sự tích hợp có chủ đích' },
        { phrase: 'self-regulation', meaningVi: 'khả năng tự điều chỉnh bản thân' },
      ],
      modelAnswer:
        'While Marcus rightly highlights the peripheral distraction caused by glowing screens during seminars, I agree with Mei that a rigid campus-wide blanket prohibition is counterproductive. Course formats vary enormously, so preserving instructor autonomy allows each professor to tailor rules to genuine pedagogical needs.\n\nA practical middle ground is an intentional, segmented policy within the syllabus. For example, a literature seminar can designate the first forty minutes as a strictly screen-free zone for close textual debate, then allocate five structured minutes when students use phones for live comprehension polls or bilingual dictionary checks. Meanwhile, students with documented visual or note-taking accommodations remain seamlessly supported without awkward public exemptions. Ultimately, guided boundaries teach undergraduates real-world digital self-regulation far better than an inflexible campus ban.',
      modelNotesVi:
        'Độ dài ~129 từ, kết nối khéo cả Marcus và Mei rồi đưa cơ chế "segmented policy" vừa giữ sự tập trung vừa bảo vệ học sinh cần hỗ trợ tiếp cận.',
    },
    {
      id: 'toefl-write-ex-3',
      taskLabel: 'Writing Task 1 (Integrated Synthesis — 20 phút)',
      title: 'Deep-Sea Polymetallic Nodule Mining',
      recommendedMinutes: 20,
      wordCountRange: '160 – 225 từ',
      minWords: 150,
      prompt:
        'Summarize the points made in the lecture notes below, explaining how they challenge the claims in the reading.\n[Reading Claims]: (1) Harvesting potato-sized polymetallic nodules from deep ocean plains supplies essential cobalt and nickel needed for clean electric-vehicle batteries. (2) Seabed collection avoids clearing tropical rainforests for open-pit mines on land. (3) Heavy mining crawlers stir up only localized dust that settles quickly near the seafloor.\n[Lecture Counterpoints]: (1) Next-generation lithium-iron-phosphate batteries and closed-loop recycling already cut cobalt demand sharply, making seabed mining unnecessary. (2) Deep-sea ecosystems recover far slower than forests; nodules take millions of years to form, so scraping them erases ancient habitats permanently. (3) Wastewater discharged back into midwater layers creates drifting sediment plumes that travel hundreds of kilometers, suffocating filter-feeding organisms.',
      promptVi:
        'Tổng hợp khách quan 3 luận điểm phản bác của giảng viên đối với 3 lợi ích mà bài đọc đưa ra về khai thác hạch đa kim dưới đáy biển sâu.',
      outline: [
        'Mở bài: Giới thiệu đề tài khai thác khoáng sản đáy biển và khẳng định bài giảng phản bác từng luận điểm của bài đọc.',
        'Điểm 1 (Battery Minerals): Bài đọc nói cần coban/niken cho xe điện; giảng viên chỉ ra pin thế hệ mới LFP và tái chế vòng kín đang giảm mạnh nhu cầu coban.',
        'Điểm 2 (Habitat Impact): Bài đọc so sánh ít phá rừng nhiệt đới; giảng viên phản bác hạch khoáng mất hàng triệu năm hình thành nên phá hủy hệ sinh thái biển sâu là vĩnh viễn.',
        'Điểm 3 (Sediment Plumes): Bài đọc cho rằng bụi chỉ lắng tại chỗ; giảng viên cảnh báo nước thải xả vào tầng giữa tạo dải bùn trôi xa hàng trăm km làm ngạt sinh vật lọc mồi.',
      ],
      scoringCriteriaFocus: [
        'Nêu đầy đủ chi tiết kỹ thuật chính xác (LFP batteries, millions of years, midwater sediment plumes).',
        'Liên kết mạch lạc, không chèn bình luận chủ quan.',
      ],
      highBandKeywords: [
        { phrase: 'casts doubt on', meaningVi: 'đặt nghi vấn đối với' },
        { phrase: 'closed-loop recycling', meaningVi: 'tái chế theo vòng tuần hoàn khép kín' },
        { phrase: 'irreversible habitat loss', meaningVi: 'mất môi trường sống không thể đảo ngược' },
        { phrase: 'drifting sediment plumes', meaningVi: 'các luồng bùn trầm tích trôi dạt' },
        { phrase: 'filter-feeding organisms', meaningVi: 'sinh vật kiếm ăn bằng cách lọc nước' },
      ],
      modelAnswer:
        'Although the reading passage presents deep-sea polymetallic nodule mining as an environmentally helpful way to power clean energy, the lecturer challenges every claim with serious technological and ecological counterevidence.\n\nFirst, while the reading asserts that ocean nodules are indispensable for electric-vehicle batteries, the lecturer counters that rapid advances in cobalt-free lithium-iron-phosphate batteries and closed-loop battery recycling are already curbing global demand for newly mined cobalt and nickel.\n\nSecond, contrary to the passage’s argument that seabed harvesting spares terrestrial rainforests, the speaker stresses that abyssal plain habitats face irreversible habitat loss. Because metallic nodules grow over millions of years, scraping the seafloor strips away structures that deep-sea species cannot rebuild within human timescales.\n\nFinally, the reading claims stirred-up sediment settles rapidly near mining machines, yet the lecturer points out that ships pump mineral-laden wastewater back into midwater currents. These drifting sediment plumes spread across hundreds of kilometers, clogging delicate gills and suffocating distant filter-feeding organisms.',
      modelNotesVi:
        'Độ dài ~164 từ, dùng ngữ pháp chuẩn mực (concessive clauses, participle clauses) và đối chiếu sắc nét 3 cặp Reading – Lecture.',
    },
    {
      id: 'toefl-write-ex-4',
      taskLabel: 'Writing Task 2 (Academic Discussion — 10 phút)',
      title: 'Replacing Timed Final Exams with Applied Capstone Projects',
      recommendedMinutes: 10,
      wordCountRange: '110 – 150 từ',
      minWords: 100,
      prompt:
        'Your professor posted a question on the course discussion board:\n"Should undergraduate courses replace traditional timed final exams with applied capstone projects? Why or why not?"\nStudent A (Elena) argues capstone projects mirror real-world problem solving better than two-hour memorization tests.\nStudent B (Devon) worries that group projects let lazy teammates ride on others’ effort and make individual grading unfair.\nWrite a post contributing your own perspective (at least 100 words).',
      promptVi:
        'Tham gia diễn đàn (10 phút, ≥100 từ): có nên thay thế kỳ thi cuối kỳ bấm giờ truyền thống bằng đồ án ứng dụng (capstone project) không? Đưa lập luận/giải pháp mới phản hồi Elena và Devon.',
      outline: [
        'Mở đầu: Đồng cảm với ưu điểm thực tiễn của Elena nhưng thừa nhận rủi ro chấm điểm cá nhân mà Devon nêu ra.',
        'Phát triển ý mới: Đề xuất giữ đồ án làm trọng tâm nhưng kết hợp bài vấn đáp cá nhân 10 phút ("individual oral defense") hoặc phân tách nhật ký đóng góp từng thành viên.',
        'Kết luận: Đảm bảo công bằng cá nhân mà vẫn đo được tư duy ứng dụng thực tế.',
      ],
      scoringCriteriaFocus: [
        'Nêu rõ giải pháp khắc phục nhược điểm của cả hai hình thức.',
        'Từ vựng học thuật chính xác, độ dài 110–150 từ.',
      ],
      highBandKeywords: [
        { phrase: 'authentic problem solving', meaningVi: 'giải quyết vấn đề thực tế đích thực' },
        { phrase: 'free-riding problem', meaningVi: 'tình trạng ỷ lại công sức của bạn cùng nhóm' },
        { phrase: 'individual accountability', meaningVi: 'trách nhiệm giải trình cá nhân' },
        { phrase: 'oral defense', meaningVi: 'buổi bảo vệ vấn đáp' },
        { phrase: 'rote memorization', meaningVi: 'học vẹt ghi nhớ máy móc' },
      ],
      modelAnswer:
        'I strongly support shifting toward applied capstone projects for the reason Elena mentioned: real careers reward sustained analysis and synthesis rather than two hours of rote memorization. However, Devon raises a legitimate fairness issue regarding the free-riding problem in shared assignments.\n\nFortunately, professors do not have to choose between authentic projects and fair individual grading. By pairing an applied capstone with a brief, individual ten-minute oral defense—or requiring version-tracked personal reflection logs—instructors can verify each student’s exact conceptual mastery. A student who merely formatted slides while teammates built the data model would struggle to defend methodological choices under direct questioning. Combining project work with individual accountability therefore preserves real-world relevance while eliminating unearned grades.',
      modelNotesVi:
        'Độ dài ~122 từ, kết nối tự nhiên với cả Elena và Devon rồi đề xuất giải pháp "individual oral defense + version-tracked reflection logs" rất thuyết phục.',
    },
  ],

  speaking: [
    {
      id: 'toefl-speak-ex-1',
      partLabel: 'Speaking Task 1 (Independent Choice)',
      title: 'Living On Campus in a Dormitory vs Off-Campus Apartment',
      prepTimeText: '15 giây chuẩn bị',
      speakTimeText: '45 giây trả lời',
      prompt:
        'First-year university students often choose between living in an on-campus dormitory and renting a quieter off-campus apartment. Which housing option do you think is better for freshmen, and why?',
      cuePoints: [
        'Chọn dứt khoát 1 phương án trong câu đầu.',
        'Đưa 2 lý do rõ ràng kèm ví dụ ngắn gọn (kết nối bạn bè & tiết kiệm thời gian đi lại).',
      ],
      promptVi:
        'Trả lời trong 45 giây: sinh viên năm nhất nên ở ký túc xá trong trường hay thuê căn hộ ngoài trường? Nêu lập trường và 2 lý do cụ thể.',
      sampleAnswer:
        'I definitely believe living in an on-campus dormitory is the better choice for first-year students. First, dorms make it effortless to build a supportive social network right away. During my freshman orientation, sharing a hallway with classmates from different majors helped me form a study group before midterms even started. Second, living steps away from lecture halls and the library eliminates long morning commutes. Instead of spending an hour stuck in city traffic, freshmen can use that extra time for office hours, club meetings, or extra sleep before early classes.',
      highScoreVocab: [
        { phrase: 'supportive social network', meaningVi: 'mạng lưới bạn bè hỗ trợ nhau' },
        { phrase: 'steps away from', meaningVi: 'chỉ cách vài bước chân' },
        { phrase: 'eliminates long morning commutes', meaningVi: 'loại bỏ quãng đường đi học buổi sáng dài' },
      ],
      deliveryTips: [
        'Giữ nhịp nói chắc chắn ~130–145 từ/phút để hoàn tất đủ 2 lý do trước khi hết 45 giây.',
        'Trong 15s chuẩn bị, chỉ gạch nhanh 2 cụm: "1. social network / study group" và "2. no commute / office hours".',
      ],
    },
    {
      id: 'toefl-speak-ex-2',
      partLabel: 'Speaking Task 2 (Integrated Campus Notice)',
      title: 'Converting the Main Quad Lawn into a Bike-Share Hub',
      prepTimeText: '30 giây chuẩn bị',
      speakTimeText: '60 giây trả lời',
      prompt:
        '[Reading Notice]: Campus Planning Committee proposes paving half of the central grassy quad to build a covered 200-bike sharing hub so students can ride quickly between north and south buildings.\n[Audio Student Opinion]: Hannah strongly opposes the plan. First, the central lawn is the only sunny outdoor area where students relax, eat lunch, and hold informal club meetings between classes. Second, directing hundreds of bicycles straight through the busiest pedestrian walkway will trigger collisions; instead, bike racks belong along the outer perimeter road.',
      promptVi:
        'Tóm tắt thông báo trong 15 giây đầu, sau đó trình bày 2 lý do phản đối của Hannah trong 45 giây còn lại (không nêu ý kiến bản thân).',
      sampleAnswer:
        'The campus planning committee has proposed replacing half of the central grassy quad with a covered two-hundred-bike sharing hub to speed up cross-campus travel. However, in the conversation, Hannah strongly opposes this plan for two main reasons. First, she points out that the central quad is the only open sunny lawn where students unwind, have lunch, and host informal club gatherings between lectures, so paving it over would erase a vital campus gathering spot. Second, she warns that funneling two hundred bicycles directly through the most crowded pedestrian plaza will create dangerous collisions. Instead, she suggests placing the new bike racks along the outer perimeter road where traffic is safer.',
      highScoreVocab: [
        { phrase: 'strongly opposes this plan', meaningVi: 'phản đối mạnh mẽ kế hoạch này' },
        { phrase: 'vital campus gathering spot', meaningVi: 'không gian tụ họp thiết yếu của trường' },
        { phrase: 'funneling bicycles through', meaningVi: 'dồn lượng lớn xe đạp đi xuyên qua' },
      ],
      deliveryTips: [
        'Chỉ dành 1–2 câu tóm tắt Reading Notice (~12–15s), phần lớn thời gian dành trọn cho 2 lý do của Hannah.',
      ],
    },
    {
      id: 'toefl-speak-ex-3',
      partLabel: 'Speaking Task 3 (Integrated Academic Concept)',
      title: 'Explaining "Ecological Traps" via Mayfly Behavior',
      prepTimeText: '30 giây chuẩn bị',
      speakTimeText: '60 giây trả lời',
      prompt:
        '[Concept]: Ecological Trap — a situation where rapid human-made changes to the environment trick animals into choosing poor habitats because those artificial features mimic reliable natural cues.\n[Lecture Example]: Mayflies normally locate streams by sensing horizontally polarized light reflecting off calm water surfaces to lay their eggs. However, smooth black asphalt roads beside rivers reflect polarized light even more strongly than water does. Consequently, swarms of female mayflies lay millions of eggs directly on dry asphalt, where the eggs bake and die within hours.',
      promptVi:
        'Định nghĩa ngắn khái niệm "Ecological Trap" từ bài đọc, rồi thuật lại chi tiết ví dụ loài phù du (mayflies) đẻ trứng trên mặt đường nhựa.',
      sampleAnswer:
        'The reading introduces the concept of an ecological trap, which occurs when rapid human alterations mimic natural environmental signals and mislead animals into selecting fatal habitats. To illustrate this, the professor describes the behavior of mayflies near riverside highways. Normally, female mayflies locate calm streams to lay their eggs by detecting horizontally polarized light reflecting off the water surface. However, smooth black asphalt roads reflect polarized light even more intensely than actual rivers do. Tricked by this exaggerated visual cue, massive swarms of mayflies lay millions of eggs directly onto dry pavement instead of water, causing the entire generation of eggs to dry out and perish.',
      highScoreVocab: [
        { phrase: 'mislead animals into selecting', meaningVi: 'đánh lừa động vật chọn nhầm' },
        { phrase: 'exaggerated visual cue', meaningVi: 'tín hiệu thị giác bị khuếch đại quá mức' },
        { phrase: 'dry out and perish', meaningVi: 'khô héo và chết sạch' },
      ],
      deliveryTips: [
        'Nêu rõ cầu nối giữa lý thuyết và thực tế: ánh sáng phân cực từ nhựa đường giống hệt tín hiệu mặt nước tự nhiên khiến phù du chọn nhầm.',
      ],
    },
    {
      id: 'toefl-speak-ex-4',
      partLabel: 'Speaking Task 4 (Integrated Academic Lecture)',
      title: 'Two Pricing Strategies Retailers Use to Shape Value Perception',
      prepTimeText: '20 giây chuẩn bị',
      speakTimeText: '60 giây trả lời',
      prompt:
        '[Lecture Excerpt]: Professor explains two psychological pricing tactics stores use to influence buying decisions. First is "left-digit bias" (charm pricing): consumers read prices from left to right and focus heavily on the leftmost number, so pricing a jacket at $49.99 instead of $50 makes shoppers perceive a much larger discount than one cent. Second is "decoy pricing": placing an unattractive mid-high option next to a target product makes the target seem like a bargain—for instance, a cinema selling small popcorn for $4, medium for $7.50, and large for $8 nudges customers to buy the $8 large because jumping from medium to large costs only fifty cents.',
      promptVi:
        'Tóm tắt trọn vẹn 2 chiến thuật định giá tâm lý (left-digit bias và decoy pricing) cùng hai ví dụ cụ thể của giáo sư trong 60 giây.',
      sampleAnswer:
        'In the lecture, the professor explains two psychological pricing strategies retailers use to influence how shoppers judge value. First, stores rely on left-digit bias, meaning consumers read numbers from left to right and anchor mentally on the first digit. For example, pricing a jacket at forty-nine dollars and ninety-nine cents instead of fifty dollars leads buyers to perceive it as a much cheaper forty-something purchase rather than a one-cent reduction. Second, businesses use decoy pricing by adding a less attractive option to steer customers toward a higher-margin item. For instance, if a movie theater prices small popcorn at four dollars, medium at seven-fifty, and large at eight dollars, customers feel the eight-dollar large is an irresistible upgrade for just fifty cents more.',
      highScoreVocab: [
        { phrase: 'anchor mentally on', meaningVi: 'neo tâm lý vào con số đầu tiên' },
        { phrase: 'steer customers toward', meaningVi: 'điều hướng khách hàng chọn về phía' },
        { phrase: 'irresistible upgrade', meaningVi: 'nâng cấp khó cưỡng lại' },
      ],
      deliveryTips: [
        'Chia thời gian cân đối ~25 giây cho chiến thuật 1 (áo khoác $49.99) và ~25 giây cho chiến thuật 2 (bỏng ngô rạp phim).',
      ],
    },
  ],

  mockTests: [
    {
      title: 'Mini Mock Test #2',
      description:
        'Đề thi thử 25 câu (30 phút): Campus Radio Conversation, Bài giảng Thiên văn học (Tidal Locking), 2 bài đọc Học thuật (Phiến đá Rosetta & Thực vật xử lý kim loại nặng) và Ngữ pháp Học thuật.',
      durationMinutes: 30,
      questions: [
        {
          id: 'toefl-mock-2-q1',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Hi, Sam, I saw the flyer saying the campus radio station needs volunteer audio editors for the Friday morning news show. Station Manager: Yes! We’re thrilled you stopped by, Maya. Right now our host records interviews on Thursday afternoons, and we need someone to trim pauses and balance volume levels before the seven a.m. broadcast. Student: I’ve edited podcasts in Audacity before—do you use the same software here? Station Manager: Actually, we upgraded our studio consoles to Adobe Audition last fall, though if you already know Audacity, learning our templates takes maybe twenty minutes. The bigger catch is that the mixing booth isn’t open past ten p.m. unless you hold an after-hours keycard. Student: Thursday evening works fine—I finish my lab at five, so I could easily edit from six to eight. Station Manager: Perfect! Just fill out the copyright-clearance agreement on our portal tonight, and I’ll run a quick training session with you tomorrow at noon.',
          question: 'Why does Maya visit the campus radio station?',
          options: [
            'To complain about audio volume on the Friday morning news broadcast',
            'To volunteer as an audio editor for the Friday morning news show',
            'To borrow a microphone for her Thursday afternoon biology lab',
            'To apply for a paid station manager position',
          ],
          correctIdx: 1,
          explanation:
            'Maya thấy tờ rơi tuyển cộng tác viên biên tập âm thanh ("volunteer audio editors") cho chương trình tin tức sáng thứ Sáu nên đến đăng ký.',
        },
        {
          id: 'toefl-mock-2-q2',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Hi, Sam, I saw the flyer saying the campus radio station needs volunteer audio editors for the Friday morning news show. Station Manager: Yes! We’re thrilled you stopped by, Maya. Right now our host records interviews on Thursday afternoons, and we need someone to trim pauses and balance volume levels before the seven a.m. broadcast. Student: I’ve edited podcasts in Audacity before—do you use the same software here? Station Manager: Actually, we upgraded our studio consoles to Adobe Audition last fall, though if you already know Audacity, learning our templates takes maybe twenty minutes. The bigger catch is that the mixing booth isn’t open past ten p.m. unless you hold an after-hours keycard. Student: Thursday evening works fine—I finish my lab at five, so I could easily edit from six to eight. Station Manager: Perfect! Just fill out the copyright-clearance agreement on our portal tonight, and I’ll run a quick training session with you tomorrow at noon.',
          question: 'What does the station manager say about the studio editing software?',
          options: [
            'The station still uses Audacity on all studio computers.',
            'It requires at least four weeks of engineering coursework.',
            'Only the show’s host is allowed to adjust volume templates.',
            'They switched to Adobe Audition, but Maya can learn the templates quickly.',
          ],
          correctIdx: 3,
          explanation:
            'Quản lý nói đài đã nâng cấp lên Adobe Audition từ mùa thu trước, nhưng vì Maya đã quen Audacity nên chỉ mất khoảng 20 phút để làm quen mẫu có sẵn.',
        },
        {
          id: 'toefl-mock-2-q3',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Hi, Sam, I saw the flyer saying the campus radio station needs volunteer audio editors for the Friday morning news show. Station Manager: Yes! We’re thrilled you stopped by, Maya. Right now our host records interviews on Thursday afternoons, and we need someone to trim pauses and balance volume levels before the seven a.m. broadcast. Student: I’ve edited podcasts in Audacity before—do you use the same software here? Station Manager: Actually, we upgraded our studio consoles to Adobe Audition last fall, though if you already know Audacity, learning our templates takes maybe twenty minutes. The bigger catch is that the mixing booth isn’t open past ten p.m. unless you hold an after-hours keycard. Student: Thursday evening works fine—I finish my lab at five, so I could easily edit from six to eight. Station Manager: Perfect! Just fill out the copyright-clearance agreement on our portal tonight, and I’ll run a quick training session with you tomorrow at noon.',
          question: 'Why does the ten p.m. studio restriction NOT pose a problem for Maya?',
          options: [
            'Her lab finishes at five, allowing her to edit between six and eight p.m.',
            'She already owns an after-hours keycard from the music department.',
            'She prefers editing raw interviews at home on Friday morning.',
            'The station manager agreed to edit Thursday interviews for her.',
          ],
          correctIdx: 0,
          explanation:
            'Maya học xong phòng lab lúc 5 giờ chiều nên hoàn toàn có thể chỉnh sửa từ 6h đến 8h tối trước giờ đóng cửa lúc 10h đêm.',
        },
        {
          id: 'toefl-mock-2-q4',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Hi, Sam, I saw the flyer saying the campus radio station needs volunteer audio editors for the Friday morning news show. Station Manager: Yes! We’re thrilled you stopped by, Maya. Right now our host records interviews on Thursday afternoons, and we need someone to trim pauses and balance volume levels before the seven a.m. broadcast. Student: I’ve edited podcasts in Audacity before—do you use the same software here? Station Manager: Actually, we upgraded our studio consoles to Adobe Audition last fall, though if you already know Audacity, learning our templates takes maybe twenty minutes. The bigger catch is that the mixing booth isn’t open past ten p.m. unless you hold an after-hours keycard. Student: Thursday evening works fine—I finish my lab at five, so I could easily edit from six to eight. Station Manager: Perfect! Just fill out the copyright-clearance agreement on our portal tonight, and I’ll run a quick training session with you tomorrow at noon.',
          question: 'What must Maya do on the portal tonight before tomorrow’s training?',
          options: [
            'Upload three sample podcasts from Audacity',
            'Reserve the mixing booth for Friday at seven a.m.',
            'Complete a copyright-clearance agreement',
            'Submit a signature from her laboratory supervisor',
          ],
          correctIdx: 2,
          explanation:
            'Quản lý dặn Maya tối nay điền thỏa thuận bản quyền ("copyright-clearance agreement") trên cổng thông tin trước buổi hướng dẫn trưa mai.',
        },
        {
          id: 'toefl-mock-2-q5',
          skill: 'listening',
          partLabel: 'Academic Lecture: Astronomy (Q5–Q10)',
          audioScript:
            'Professor: Look up at the Moon tonight, and you’ll see the same familiar pattern of dark plains we always see—we never see the Moon’s far side from Earth. That’s because our Moon is tidally locked: its rotation period on its axis equals its orbital period around Earth. Now, why does this matter beyond our solar system? Well, most stars in our galaxy are dim, cool red dwarfs. For an exoplanet orbiting a red dwarf to stay warm enough for liquid water, it must orbit astonishingly close—much closer than Mercury orbits our Sun. At that tight distance, the star’s gravity exerts massive tidal friction, rapidly locking the planet so one hemisphere faces eternal noon while the opposite hemisphere stays frozen in perpetual midnight! Early astronomers dismissed such "eyeball worlds" as uninhabitable: they feared the dayside would boil dry while the nightside froze all atmospheric gases solid. Yet recent 3-D climate simulations paint a gentler picture. If the planet possesses a substantial ocean and thick atmosphere, powerful winds and ocean currents continuously haul heat from the sunlit side to the dark hemisphere, creating a broad, temperate twilight belt—and even liquid-water oceans—where life could realistically thrive.',
          question: 'What is the main topic of the astronomy lecture?',
          options: [
            'How tidal locking works and whether tidally locked exoplanets around red dwarfs can remain habitable',
            'Why Earth’s Moon lacks liquid-water oceans on its far side',
            'How Mercury’s close orbit prevents tidal friction from slowing its spin',
            'Why red dwarf stars emit brighter ultraviolet flares than our Sun',
          ],
          correctIdx: 0,
          explanation:
            'Giáo sư giải thích hiện tượng khóa thủy triều (tidal locking) và phân tích khả năng tồn tại sự sống trên các ngoại hành tinh quanh sao lùn đỏ.',
        },
        {
          id: 'toefl-mock-2-q6',
          skill: 'listening',
          partLabel: 'Academic Lecture: Astronomy (Q5–Q10)',
          audioScript:
            'Professor: Look up at the Moon tonight, and you’ll see the same familiar pattern of dark plains we always see—we never see the Moon’s far side from Earth. That’s because our Moon is tidally locked: its rotation period on its axis equals its orbital period around Earth. Now, why does this matter beyond our solar system? Well, most stars in our galaxy are dim, cool red dwarfs. For an exoplanet orbiting a red dwarf to stay warm enough for liquid water, it must orbit astonishingly close—much closer than Mercury orbits our Sun. At that tight distance, the star’s gravity exerts massive tidal friction, rapidly locking the planet so one hemisphere faces eternal noon while the opposite hemisphere stays frozen in perpetual midnight! Early astronomers dismissed such "eyeball worlds" as uninhabitable: they feared the dayside would boil dry while the nightside froze all atmospheric gases solid. Yet recent 3-D climate simulations paint a gentler picture. If the planet possesses a substantial ocean and thick atmosphere, powerful winds and ocean currents continuously haul heat from the sunlit side to the dark hemisphere, creating a broad, temperate twilight belt—and even liquid-water oceans—where life could realistically thrive.',
          question: 'Why must a habitable planet around a red dwarf orbit closer than Mercury orbits our Sun?',
          options: [
            'To escape strong gravitational pull from neighboring gas giants',
            'To avoid spinning too rapidly on its axis',
            'Because red dwarfs are much dimmer and cooler than our Sun',
            'Because thick atmospheres block starlight at larger distances',
          ],
          correctIdx: 2,
          explanation:
            'Sao lùn đỏ mờ và nguội hơn Mặt Trời nhiều, nên để đủ ấm giữ nước lỏng, hành tinh buộc phải quay ở quỹ đạo rất gần.',
        },
        {
          id: 'toefl-mock-2-q7',
          skill: 'listening',
          partLabel: 'Academic Lecture: Astronomy (Q5–Q10)',
          audioScript:
            'Professor: Look up at the Moon tonight, and you’ll see the same familiar pattern of dark plains we always see—we never see the Moon’s far side from Earth. That’s because our Moon is tidally locked: its rotation period on its axis equals its orbital period around Earth. Now, why does this matter beyond our solar system? Well, most stars in our galaxy are dim, cool red dwarfs. For an exoplanet orbiting a red dwarf to stay warm enough for liquid water, it must orbit astonishingly close—much closer than Mercury orbits our Sun. At that tight distance, the star’s gravity exerts massive tidal friction, rapidly locking the planet so one hemisphere faces eternal noon while the opposite hemisphere stays frozen in perpetual midnight! Early astronomers dismissed such "eyeball worlds" as uninhabitable: they feared the dayside would boil dry while the nightside froze all atmospheric gases solid. Yet recent 3-D climate simulations paint a gentler picture. If the planet possesses a substantial ocean and thick atmosphere, powerful winds and ocean currents continuously haul heat from the sunlit side to the dark hemisphere, creating a broad, temperate twilight belt—and even liquid-water oceans—where life could realistically thrive.',
          question: 'Why does the professor mention Earth’s Moon at the beginning of the talk?',
          options: [
            'To prove that red dwarfs exist inside our own solar system',
            'To give a familiar everyday example of tidal locking',
            'To show that human astronauts landed on the Moon’s far side',
            'To argue that the Moon once had a thick, windy atmosphere',
          ],
          correctIdx: 1,
          explanation:
            'Mặt Trăng luôn quay một mặt về phía Trái Đất là ví dụ quen thuộc giúp sinh viên hiểu ngay khái niệm khóa thủy triều.',
        },
        {
          id: 'toefl-mock-2-q8',
          skill: 'listening',
          partLabel: 'Academic Lecture: Astronomy (Q5–Q10)',
          audioScript:
            'Professor: Look up at the Moon tonight, and you’ll see the same familiar pattern of dark plains we always see—we never see the Moon’s far side from Earth. That’s because our Moon is tidally locked: its rotation period on its axis equals its orbital period around Earth. Now, why does this matter beyond our solar system? Well, most stars in our galaxy are dim, cool red dwarfs. For an exoplanet orbiting a red dwarf to stay warm enough for liquid water, it must orbit astonishingly close—much closer than Mercury orbits our Sun. At that tight distance, the star’s gravity exerts massive tidal friction, rapidly locking the planet so one hemisphere faces eternal noon while the opposite hemisphere stays frozen in perpetual midnight! Early astronomers dismissed such "eyeball worlds" as uninhabitable: they feared the dayside would boil dry while the nightside froze all atmospheric gases solid. Yet recent 3-D climate simulations paint a gentler picture. If the planet possesses a substantial ocean and thick atmosphere, powerful winds and ocean currents continuously haul heat from the sunlit side to the dark hemisphere, creating a broad, temperate twilight belt—and even liquid-water oceans—where life could realistically thrive.',
          question: 'Why did early astronomers assume tidally locked planets could not support life?',
          options: [
            'They calculated that red dwarfs burn out before planets form.',
            'They assumed tidal friction melts rocky crusts into lava.',
            'They believed high winds would blow oceans off the surface.',
            'They feared one side would boil dry while the dark side froze all gases.',
          ],
          correctIdx: 3,
          explanation:
            'Các nhà thiên văn trước kia e ngại bán cầu ngày sẽ bốc hơi khô kiệt còn bán cầu đêm đóng băng cứng toàn bộ khí quyển.',
        },
        {
          id: 'toefl-mock-2-q9',
          skill: 'listening',
          partLabel: 'Academic Lecture: Astronomy (Q5–Q10)',
          audioScript:
            'Professor: Look up at the Moon tonight, and you’ll see the same familiar pattern of dark plains we always see—we never see the Moon’s far side from Earth. That’s because our Moon is tidally locked: its rotation period on its axis equals its orbital period around Earth. Now, why does this matter beyond our solar system? Well, most stars in our galaxy are dim, cool red dwarfs. For an exoplanet orbiting a red dwarf to stay warm enough for liquid water, it must orbit astonishingly close—much closer than Mercury orbits our Sun. At that tight distance, the star’s gravity exerts massive tidal friction, rapidly locking the planet so one hemisphere faces eternal noon while the opposite hemisphere stays frozen in perpetual midnight! Early astronomers dismissed such "eyeball worlds" as uninhabitable: they feared the dayside would boil dry while the nightside froze all atmospheric gases solid. Yet recent 3-D climate simulations paint a gentler picture. If the planet possesses a substantial ocean and thick atmosphere, powerful winds and ocean currents continuously haul heat from the sunlit side to the dark hemisphere, creating a broad, temperate twilight belt—and even liquid-water oceans—where life could realistically thrive.',
          question: 'According to recent 3-D climate models, what stabilizes temperatures on a tidally locked world?',
          options: [
            'Strong winds and ocean currents transferring heat from the dayside to the nightside',
            'Periodic asteroid impacts that tilt the planet’s rotation axis',
            'Volcanic ash clouds blocking starlight across the entire equator',
            'Underground geothermal reservoirs beneath frozen continents',
          ],
          correctIdx: 0,
          explanation:
            'Mô phỏng khí hậu 3D cho thấy gió mạnh và hải lưu trên hành tinh có khí quyển dày và đại dương sẽ luân chuyển nhiệt từ bán cầu sáng sang bán cầu tối.',
        },
        {
          id: 'toefl-mock-2-q10',
          skill: 'listening',
          partLabel: 'Academic Lecture: Astronomy (Q5–Q10)',
          audioScript:
            'Professor: Look up at the Moon tonight, and you’ll see the same familiar pattern of dark plains we always see—we never see the Moon’s far side from Earth. That’s because our Moon is tidally locked: its rotation period on its axis equals its orbital period around Earth. Now, why does this matter beyond our solar system? Well, most stars in our galaxy are dim, cool red dwarfs. For an exoplanet orbiting a red dwarf to stay warm enough for liquid water, it must orbit astonishingly close—much closer than Mercury orbits our Sun. At that tight distance, the star’s gravity exerts massive tidal friction, rapidly locking the planet so one hemisphere faces eternal noon while the opposite hemisphere stays frozen in perpetual midnight! Early astronomers dismissed such "eyeball worlds" as uninhabitable: they feared the dayside would boil dry while the nightside froze all atmospheric gases solid. Yet recent 3-D climate simulations paint a gentler picture. If the planet possesses a substantial ocean and thick atmosphere, powerful winds and ocean currents continuously haul heat from the sunlit side to the dark hemisphere, creating a broad, temperate twilight belt—and even liquid-water oceans—where life could realistically thrive.',
          question: 'What is the professor’s overall conclusion about red-dwarf exoplanets?',
          options: [
            'Only planets orbiting larger yellow stars should be searched for life.',
            'Tidal locking makes liquid water mathematically impossible everywhere.',
            'Many locked worlds with oceans and thick air may possess habitable regions.',
            'Three-dimensional climate models have proven unreliable for exoplanets.',
          ],
          correctIdx: 2,
          explanation:
            'Giáo sư kết luận nhiều hành tinh khóa thủy triều nếu có đại dương và khí quyển dày vẫn tạo ra vùng chạng vạng ôn hòa thuận lợi cho sự sống.',
        },
        {
          id: 'toefl-mock-2-q11',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Archaeology (Q11–Q17)',
          passage:
            'Unearthed by French soldiers in the Nile Delta in 1799, the Rosetta Stone—a fragmented granodiorite stele inscribed in 196 BCE—carries a single royal decree written in three scripts: ancient Egyptian hieroglyphs, cursive Demotic script, and classical Greek. Because scholars already read Greek fluently, the bilingual stone promised the key to deciphering hieroglyphs, a writing system silent for more than fourteen centuries.\n\nEarly attempts stalled because seventeenth- and eighteenth-century thinkers assumed hieroglyphs were purely symbolic picture-writing representing abstract ideas rather than spoken sounds. British physicist Thomas Young made a crucial breakthrough by isolating oval rings called cartouches, correctly guessing they enclosed royal names such as "Ptolemy" spelled phonetically. Yet Young stopped short, assuming phonetic spelling applied only to foreign rulers.\n\nIn 1822, French linguist Jean-François Champollion cracked the full system. Drawing on his mastery of Coptic—the final spoken descendant of ancient Egyptian—Champollion compared Ptolemy’s cartouche with a newly copied obelisk bearing "Cleopatra." Recognizing shared sound signs across native royal names like "Ramesses" as well, he proved hieroglyphs blended phonetic consonants, syllable signs, and silent meaning-determinatives simultaneously.',
          question: 'Why was the Rosetta Stone so valuable to nineteenth-century scholars?',
          options: [
            'It listed the exact construction dates of the Nile Delta pyramids.',
            'It presented one message in both unreadable Egyptian scripts and well-known classical Greek.',
            'It contained a dictionary written personally by Coptic priests.',
            'It was the oldest clay tablet ever uncovered by French soldiers.',
          ],
          correctIdx: 1,
          explanation:
            'Phiến đá khắc cùng một sắc lệnh bằng hai chữ Ai Cập cổ và chữ Hy Lạp cổ mà học giả đã đọc thông thạo, tạo cầu nối giải mã.',
        },
        {
          id: 'toefl-mock-2-q12',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Archaeology (Q11–Q17)',
          passage:
            'Unearthed by French soldiers in the Nile Delta in 1799, the Rosetta Stone—a fragmented granodiorite stele inscribed in 196 BCE—carries a single royal decree written in three scripts: ancient Egyptian hieroglyphs, cursive Demotic script, and classical Greek. Because scholars already read Greek fluently, the bilingual stone promised the key to deciphering hieroglyphs, a writing system silent for more than fourteen centuries.\n\nEarly attempts stalled because seventeenth- and eighteenth-century thinkers assumed hieroglyphs were purely symbolic picture-writing representing abstract ideas rather than spoken sounds. British physicist Thomas Young made a crucial breakthrough by isolating oval rings called cartouches, correctly guessing they enclosed royal names such as "Ptolemy" spelled phonetically. Yet Young stopped short, assuming phonetic spelling applied only to foreign rulers.\n\nIn 1822, French linguist Jean-François Champollion cracked the full system. Drawing on his mastery of Coptic—the final spoken descendant of ancient Egyptian—Champollion compared Ptolemy’s cartouche with a newly copied obelisk bearing "Cleopatra." Recognizing shared sound signs across native royal names like "Ramesses" as well, he proved hieroglyphs blended phonetic consonants, syllable signs, and silent meaning-determinatives simultaneously.',
          question: 'Why did early researchers fail to decipher hieroglyphs before Thomas Young?',
          options: [
            'They had no surviving samples of classical Greek manuscripts.',
            'They refused to examine Demotic cursive inscriptions.',
            'They believed the granite decree was a modern forgery.',
            'They mistakenly thought hieroglyphs expressed ideas purely as symbols without phonetic sounds.',
          ],
          correctIdx: 3,
          explanation:
            'Các học giả thế kỷ 17–18 lầm tưởng chữ tượng hình chỉ là ký hiệu biểu ý thuần túy chứ không ghi âm thanh lời nói.',
        },
        {
          id: 'toefl-mock-2-q13',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Archaeology (Q11–Q17)',
          passage:
            'Unearthed by French soldiers in the Nile Delta in 1799, the Rosetta Stone—a fragmented granodiorite stele inscribed in 196 BCE—carries a single royal decree written in three scripts: ancient Egyptian hieroglyphs, cursive Demotic script, and classical Greek. Because scholars already read Greek fluently, the bilingual stone promised the key to deciphering hieroglyphs, a writing system silent for more than fourteen centuries.\n\nEarly attempts stalled because seventeenth- and eighteenth-century thinkers assumed hieroglyphs were purely symbolic picture-writing representing abstract ideas rather than spoken sounds. British physicist Thomas Young made a crucial breakthrough by isolating oval rings called cartouches, correctly guessing they enclosed royal names such as "Ptolemy" spelled phonetically. Yet Young stopped short, assuming phonetic spelling applied only to foreign rulers.\n\nIn 1822, French linguist Jean-François Champollion cracked the full system. Drawing on his mastery of Coptic—the final spoken descendant of ancient Egyptian—Champollion compared Ptolemy’s cartouche with a newly copied obelisk bearing "Cleopatra." Recognizing shared sound signs across native royal names like "Ramesses" as well, he proved hieroglyphs blended phonetic consonants, syllable signs, and silent meaning-determinatives simultaneously.',
          question: 'The word "stalled" in paragraph 2 is closest in meaning to:',
          options: ['halted without progress', 'accelerated rapidly', 'spread internationally', 'gained public funding'],
          correctIdx: 0,
          explanation:
            '"Early attempts stalled" = những nỗ lực ban đầu bị đình trệ, chững lại ("halted without progress").',
        },
        {
          id: 'toefl-mock-2-q14',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Archaeology (Q11–Q17)',
          passage:
            'Unearthed by French soldiers in the Nile Delta in 1799, the Rosetta Stone—a fragmented granodiorite stele inscribed in 196 BCE—carries a single royal decree written in three scripts: ancient Egyptian hieroglyphs, cursive Demotic script, and classical Greek. Because scholars already read Greek fluently, the bilingual stone promised the key to deciphering hieroglyphs, a writing system silent for more than fourteen centuries.\n\nEarly attempts stalled because seventeenth- and eighteenth-century thinkers assumed hieroglyphs were purely symbolic picture-writing representing abstract ideas rather than spoken sounds. British physicist Thomas Young made a crucial breakthrough by isolating oval rings called cartouches, correctly guessing they enclosed royal names such as "Ptolemy" spelled phonetically. Yet Young stopped short, assuming phonetic spelling applied only to foreign rulers.\n\nIn 1822, French linguist Jean-François Champollion cracked the full system. Drawing on his mastery of Coptic—the final spoken descendant of ancient Egyptian—Champollion compared Ptolemy’s cartouche with a newly copied obelisk bearing "Cleopatra." Recognizing shared sound signs across native royal names like "Ramesses" as well, he proved hieroglyphs blended phonetic consonants, syllable signs, and silent meaning-determinatives simultaneously.',
          question: 'What crucial error limited Thomas Young’s partial breakthrough?',
          options: [
            'He confused the Demotic script with classical Greek.',
            'He assumed hieroglyphic sound spelling was used exclusively for foreign rulers’ names.',
            'He refused to inspect oval cartouches on the Rosetta Stone.',
            'He translated "Ptolemy" backward from right to left.',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn 2 chỉ rõ Young dừng lại giữa chừng vì cho rằng cách đánh vần theo âm chỉ áp dụng cho tên các vị vua ngoại bang.',
        },
        {
          id: 'toefl-mock-2-q15',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Archaeology (Q11–Q17)',
          passage:
            'Unearthed by French soldiers in the Nile Delta in 1799, the Rosetta Stone—a fragmented granodiorite stele inscribed in 196 BCE—carries a single royal decree written in three scripts: ancient Egyptian hieroglyphs, cursive Demotic script, and classical Greek. Because scholars already read Greek fluently, the bilingual stone promised the key to deciphering hieroglyphs, a writing system silent for more than fourteen centuries.\n\nEarly attempts stalled because seventeenth- and eighteenth-century thinkers assumed hieroglyphs were purely symbolic picture-writing representing abstract ideas rather than spoken sounds. British physicist Thomas Young made a crucial breakthrough by isolating oval rings called cartouches, correctly guessing they enclosed royal names such as "Ptolemy" spelled phonetically. Yet Young stopped short, assuming phonetic spelling applied only to foreign rulers.\n\nIn 1822, French linguist Jean-François Champollion cracked the full system. Drawing on his mastery of Coptic—the final spoken descendant of ancient Egyptian—Champollion compared Ptolemy’s cartouche with a newly copied obelisk bearing "Cleopatra." Recognizing shared sound signs across native royal names like "Ramesses" as well, he proved hieroglyphs blended phonetic consonants, syllable signs, and silent meaning-determinatives simultaneously.',
          question: 'How did knowing the Coptic language assist Champollion?',
          options: [
            'Coptic sailors brought him the original obelisk from Alexandria.',
            'Coptic was the third script carved on the bottom of the Rosetta Stone.',
            'Coptic preserved grammatical roots and spoken sounds descended from ancient Egyptian.',
            'Coptic priests taught him how to carve granodiorite tablets.',
          ],
          correctIdx: 2,
          explanation:
            'Tiếng Coptic là hậu duệ nói cuối cùng của tiếng Ai Cập cổ đại, giúp Champollion nhận diện âm đọc và gốc từ bản địa.',
        },
        {
          id: 'toefl-mock-2-q16',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Archaeology (Q11–Q17)',
          passage:
            'Unearthed by French soldiers in the Nile Delta in 1799, the Rosetta Stone—a fragmented granodiorite stele inscribed in 196 BCE—carries a single royal decree written in three scripts: ancient Egyptian hieroglyphs, cursive Demotic script, and classical Greek. Because scholars already read Greek fluently, the bilingual stone promised the key to deciphering hieroglyphs, a writing system silent for more than fourteen centuries.\n\nEarly attempts stalled because seventeenth- and eighteenth-century thinkers assumed hieroglyphs were purely symbolic picture-writing representing abstract ideas rather than spoken sounds. British physicist Thomas Young made a crucial breakthrough by isolating oval rings called cartouches, correctly guessing they enclosed royal names such as "Ptolemy" spelled phonetically. Yet Young stopped short, assuming phonetic spelling applied only to foreign rulers.\n\nIn 1822, French linguist Jean-François Champollion cracked the full system. Drawing on his mastery of Coptic—the final spoken descendant of ancient Egyptian—Champollion compared Ptolemy’s cartouche with a newly copied obelisk bearing "Cleopatra." Recognizing shared sound signs across native royal names like "Ramesses" as well, he proved hieroglyphs blended phonetic consonants, syllable signs, and silent meaning-determinatives simultaneously.',
          question: 'Why does the author mention the native royal name "Ramesses" in paragraph 3?',
          options: [
            'To show that Champollion proved phonetic signs operated even in native Egyptian names, refuting Young’s limit',
            'To explain why the Rosetta Stone was carved during Ramesses’ reign',
            'To prove that Cleopatra and Ramesses ruled Egypt together',
            'To illustrate that hieroglyphs never used silent meaning-determinatives',
          ],
          correctIdx: 0,
          explanation:
            'Việc giải mã được cả tên vua bản địa như "Ramesses" chứng minh chữ tượng hình dùng ký hiệu âm cho tiếng Ai Cập gốc chứ không chỉ tên vua ngoại lai như Young nghĩ.',
        },
        {
          id: 'toefl-mock-2-q17',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Archaeology (Q11–Q17)',
          passage:
            'Unearthed by French soldiers in the Nile Delta in 1799, the Rosetta Stone—a fragmented granodiorite stele inscribed in 196 BCE—carries a single royal decree written in three scripts: ancient Egyptian hieroglyphs, cursive Demotic script, and classical Greek. Because scholars already read Greek fluently, the bilingual stone promised the key to deciphering hieroglyphs, a writing system silent for more than fourteen centuries.\n\nEarly attempts stalled because seventeenth- and eighteenth-century thinkers assumed hieroglyphs were purely symbolic picture-writing representing abstract ideas rather than spoken sounds. British physicist Thomas Young made a crucial breakthrough by isolating oval rings called cartouches, correctly guessing they enclosed royal names such as "Ptolemy" spelled phonetically. Yet Young stopped short, assuming phonetic spelling applied only to foreign rulers.\n\nIn 1822, French linguist Jean-François Champollion cracked the full system. Drawing on his mastery of Coptic—the final spoken descendant of ancient Egyptian—Champollion compared Ptolemy’s cartouche with a newly copied obelisk bearing "Cleopatra." Recognizing shared sound signs across native royal names like "Ramesses" as well, he proved hieroglyphs blended phonetic consonants, syllable signs, and silent meaning-determinatives simultaneously.',
          question: 'Which statement about Egyptian hieroglyphs is NOT supported by the passage?',
          options: [
            'They had gone unread for more than fourteen centuries before 1799.',
            'They combined phonetic sound signs with silent meaning markers.',
            'Royal names were framed inside oval rings called cartouches.',
            'They were replaced instantly by Greek across Egypt in 196 BCE.',
          ],
          correctIdx: 3,
          explanation:
            'Năm 196 TCN sắc lệnh được khắc song song cả chữ tượng hình, Demotic và Hy Lạp — bài đọc không nói chữ tượng hình bị thay thế tức thì năm đó.',
        },
        {
          id: 'toefl-mock-2-q18',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Environmental Science (Q18–Q23)',
          passage:
            'Abandoned industrial sites and former mines frequently leave soils laced with toxic heavy metals such as nickel, zinc, and cadmium. Conventional cleanup relies on "dig-and-haul" excavation—scraping away contaminated topsoil and burying it inside lined landfills—a disruptive process costing millions per hectare. Seeking a gentler alternative, environmental engineers turned to phytoremediation, which deploys living plants to extract, stabilize, or degrade pollutants on site.\n\nCertain wild species called hyperaccumulators thrive atop metal-rich outcrops and absorb astonishing concentrations of metals through their roots, storing them safely inside leaf vacuoles at levels lethal to ordinary crops. After a growing season, crews harvest the metal-laden stems and incinerate them under controlled filters, occasionally recovering valuable nickel ash in a practice termed "phytomining."\n\nNevertheless, phytoremediation faces practical boundaries. Most hyperaccumulators grow slowly with shallow roots reaching only thirty to fifty centimeters deep, making them ineffective against deep groundwater plumes. Additionally, complete cleanup often spans five to fifteen growing seasons—too slow for urgent urban real-estate redevelopment—and grazing deer or insects eating metal-rich leaves risk passing toxins up the food chain unless fields are fenced.',
          question: 'What disadvantage of conventional "dig-and-haul" soil cleanup is mentioned in paragraph 1?',
          options: [
            'It turns heavy metals into airborne radioactive dust.',
            'It kills all wild hyperaccumulator seeds across nearby forests.',
            'It is highly disruptive and costs millions of dollars per hectare.',
            'It takes fifteen growing seasons to complete one landfill.',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 1 nêu phương pháp đào xúc chở đi ("dig-and-haul") gây xáo trộn môi trường và tốn hàng triệu USD cho mỗi hecta.',
        },
        {
          id: 'toefl-mock-2-q19',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Environmental Science (Q18–Q23)',
          passage:
            'Abandoned industrial sites and former mines frequently leave soils laced with toxic heavy metals such as nickel, zinc, and cadmium. Conventional cleanup relies on "dig-and-haul" excavation—scraping away contaminated topsoil and burying it inside lined landfills—a disruptive process costing millions per hectare. Seeking a gentler alternative, environmental engineers turned to phytoremediation, which deploys living plants to extract, stabilize, or degrade pollutants on site.\n\nCertain wild species called hyperaccumulators thrive atop metal-rich outcrops and absorb astonishing concentrations of metals through their roots, storing them safely inside leaf vacuoles at levels lethal to ordinary crops. After a growing season, crews harvest the metal-laden stems and incinerate them under controlled filters, occasionally recovering valuable nickel ash in a practice termed "phytomining."\n\nNevertheless, phytoremediation faces practical boundaries. Most hyperaccumulators grow slowly with shallow roots reaching only thirty to fifty centimeters deep, making them ineffective against deep groundwater plumes. Additionally, complete cleanup often spans five to fifteen growing seasons—too slow for urgent urban real-estate redevelopment—and grazing deer or insects eating metal-rich leaves risk passing toxins up the food chain unless fields are fenced.',
          question: 'In paragraph 2, what happens to the harvested hyperaccumulator stems after the growing season?',
          options: [
            'They are plowed back underground to fertilize ordinary crops.',
            'They are burned in filtered facilities, sometimes yielding recoverable nickel ash.',
            'They are fed directly to grazing deer near former mines.',
            'They are buried inside unlined urban real-estate foundations.',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn 2 nói thân cây chứa kim loại được thu hoạch rồi đốt có lọc kiểm soát, đôi khi thu hồi được tro niken giá trị ("phytomining").',
        },
        {
          id: 'toefl-mock-2-q20',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Environmental Science (Q18–Q23)',
          passage:
            'Abandoned industrial sites and former mines frequently leave soils laced with toxic heavy metals such as nickel, zinc, and cadmium. Conventional cleanup relies on "dig-and-haul" excavation—scraping away contaminated topsoil and burying it inside lined landfills—a disruptive process costing millions per hectare. Seeking a gentler alternative, environmental engineers turned to phytoremediation, which deploys living plants to extract, stabilize, or degrade pollutants on site.\n\nCertain wild species called hyperaccumulators thrive atop metal-rich outcrops and absorb astonishing concentrations of metals through their roots, storing them safely inside leaf vacuoles at levels lethal to ordinary crops. After a growing season, crews harvest the metal-laden stems and incinerate them under controlled filters, occasionally recovering valuable nickel ash in a practice termed "phytomining."\n\nNevertheless, phytoremediation faces practical boundaries. Most hyperaccumulators grow slowly with shallow roots reaching only thirty to fifty centimeters deep, making them ineffective against deep groundwater plumes. Additionally, complete cleanup often spans five to fifteen growing seasons—too slow for urgent urban real-estate redevelopment—and grazing deer or insects eating metal-rich leaves risk passing toxins up the food chain unless fields are fenced.',
          question: 'The word "them" in paragraph 2 ("storing them safely inside leaf vacuoles") refers to:',
          options: ['heavy metals', 'wild species', 'ordinary crops', 'metal-rich outcrops'],
          correctIdx: 0,
          explanation:
            'Cây hấp thụ nồng độ kim loại rất cao qua rễ rồi tích trữ chúng ("them" = metals) an toàn trong không bào lá.',
        },
        {
          id: 'toefl-mock-2-q21',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Environmental Science (Q18–Q23)',
          passage:
            'Abandoned industrial sites and former mines frequently leave soils laced with toxic heavy metals such as nickel, zinc, and cadmium. Conventional cleanup relies on "dig-and-haul" excavation—scraping away contaminated topsoil and burying it inside lined landfills—a disruptive process costing millions per hectare. Seeking a gentler alternative, environmental engineers turned to phytoremediation, which deploys living plants to extract, stabilize, or degrade pollutants on site.\n\nCertain wild species called hyperaccumulators thrive atop metal-rich outcrops and absorb astonishing concentrations of metals through their roots, storing them safely inside leaf vacuoles at levels lethal to ordinary crops. After a growing season, crews harvest the metal-laden stems and incinerate them under controlled filters, occasionally recovering valuable nickel ash in a practice termed "phytomining."\n\nNevertheless, phytoremediation faces practical boundaries. Most hyperaccumulators grow slowly with shallow roots reaching only thirty to fifty centimeters deep, making them ineffective against deep groundwater plumes. Additionally, complete cleanup often spans five to fifteen growing seasons—too slow for urgent urban real-estate redevelopment—and grazing deer or insects eating metal-rich leaves risk passing toxins up the food chain unless fields are fenced.',
          question: 'Why are hyperaccumulators ineffective for cleaning deep groundwater contamination?',
          options: [
            'Heavy groundwater washes away leaf vacuoles before harvest.',
            'Nickel ash blocks roots from penetrating topsoil.',
            'Fencing around real-estate sites cuts off underground water.',
            'Their shallow roots typically reach only thirty to fifty centimeters deep.',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 3 giải thích rễ các loài siêu tích tụ mọc nông, chỉ sâu khoảng 30–50 cm nên không chạm tới các dòng ô nhiễm nước ngầm sâu.',
        },
        {
          id: 'toefl-mock-2-q22',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Environmental Science (Q18–Q23)',
          passage:
            'Abandoned industrial sites and former mines frequently leave soils laced with toxic heavy metals such as nickel, zinc, and cadmium. Conventional cleanup relies on "dig-and-haul" excavation—scraping away contaminated topsoil and burying it inside lined landfills—a disruptive process costing millions per hectare. Seeking a gentler alternative, environmental engineers turned to phytoremediation, which deploys living plants to extract, stabilize, or degrade pollutants on site.\n\nCertain wild species called hyperaccumulators thrive atop metal-rich outcrops and absorb astonishing concentrations of metals through their roots, storing them safely inside leaf vacuoles at levels lethal to ordinary crops. After a growing season, crews harvest the metal-laden stems and incinerate them under controlled filters, occasionally recovering valuable nickel ash in a practice termed "phytomining."\n\nNevertheless, phytoremediation faces practical boundaries. Most hyperaccumulators grow slowly with shallow roots reaching only thirty to fifty centimeters deep, making them ineffective against deep groundwater plumes. Additionally, complete cleanup often spans five to fifteen growing seasons—too slow for urgent urban real-estate redevelopment—and grazing deer or insects eating metal-rich leaves risk passing toxins up the food chain unless fields are fenced.',
          question: 'According to paragraph 3, why should phytoremediation fields be fenced off?',
          options: [
            'To prevent developers from building houses before five years pass',
            'To keep wind from blowing nickel ash onto nearby highways',
            'To stop grazing animals from eating toxic leaves and spreading metals up the food chain',
            'To force hyperaccumulator roots to grow deeper than fifty centimeters',
          ],
          correctIdx: 2,
          explanation:
            'Cần rào khu vực để ngăn hươu nai hay động vật ăn lá giàu kim loại, tránh truyền độc tố lên chuỗi thức ăn.',
        },
        {
          id: 'toefl-mock-2-q23',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Environmental Science (Q18–Q23)',
          passage:
            'Abandoned industrial sites and former mines frequently leave soils laced with toxic heavy metals such as nickel, zinc, and cadmium. Conventional cleanup relies on "dig-and-haul" excavation—scraping away contaminated topsoil and burying it inside lined landfills—a disruptive process costing millions per hectare. Seeking a gentler alternative, environmental engineers turned to phytoremediation, which deploys living plants to extract, stabilize, or degrade pollutants on site.\n\nCertain wild species called hyperaccumulators thrive atop metal-rich outcrops and absorb astonishing concentrations of metals through their roots, storing them safely inside leaf vacuoles at levels lethal to ordinary crops. After a growing season, crews harvest the metal-laden stems and incinerate them under controlled filters, occasionally recovering valuable nickel ash in a practice termed "phytomining."\n\nNevertheless, phytoremediation faces practical boundaries. Most hyperaccumulators grow slowly with shallow roots reaching only thirty to fifty centimeters deep, making them ineffective against deep groundwater plumes. Additionally, complete cleanup often spans five to fifteen growing seasons—too slow for urgent urban real-estate redevelopment—and grazing deer or insects eating metal-rich leaves risk passing toxins up the food chain unless fields are fenced.',
          question: 'For which scenario is phytoremediation LEAST practical according to the passage?',
          options: [
            'Remote rural mine tailings where slow, low-cost cleanup is acceptable',
            'An urgent downtown commercial lot slated for construction next year',
            'Shallow nickel-contaminated topsoil targeted for metal recovery',
            'Fenced industrial buffer zones with pollutants near the surface',
          ],
          correctIdx: 1,
          explanation:
            'Làm sạch bằng thực vật cần 5–15 mùa sinh trưởng nên quá chậm ("too slow for urgent urban real-estate redevelopment") với khu đất đô thị cần xây gấp năm sau.',
        },
        {
          id: 'toefl-mock-2-q24',
          skill: 'grammar',
          partLabel: 'Academic Grammar & Precision (Q24)',
          question: 'Choose the sentence with accurate reduced clause and subject-verb agreement:',
          options: [
            'Built out of prefabricated iron panels, the warehouse withstood decades of coastal storms.',
            'Building out of prefabricated iron panels, coastal storms could not damage the warehouse.',
            'Built out of prefabricated iron panels, engineers admired the warehouse.',
            'Having build out of prefabricated iron panels, the warehouse stood beside the harbor.',
          ],
          correctIdx: 0,
          explanation:
            'A dùng đúng phân từ bị động rút gọn ("Built out of..., the warehouse...") khớp chủ ngữ "the warehouse". B và C mắc lỗi chủ ngữ lơ lửng; D sai dạng quá khứ phân từ ("Having build").',
        },
        {
          id: 'toefl-mock-2-q25',
          skill: 'vocab',
          partLabel: 'Integrated Writing Precision (Q25)',
          question: 'Which sentence best expresses a contrast between a reading claim and a lecture counterpoint?',
          options: [
            'The reading says the mine cleanup is cheap, and I agree that plants are very pretty.',
            'Because the reading praises phytomining, so the lecturer thinks animals are safe.',
            'The reading claims deep-rooted plants clean all aquifers, so both sources match.',
            'While the reading touts phytoremediation as rapid, the lecturer contends that multi-year timelines render it unsuitable for urgent urban sites.',
          ],
          correctIdx: 3,
          explanation:
            'D dùng cấu trúc đối lập học thuật chuẩn xác ("While the reading touts..., the lecturer contends that...") và giữ đúng lập trường khách quan.',
        },
      ],
    },

    {
      title: 'Mini Mock Test #3',
      description:
        'Đề thi thử 25 câu (30 phút): Studio Art Kiln Conversation, Bài giảng Tâm lý học (Spacing Effect), 2 bài đọc Học thuật (Hồ móng ngựa sông uốn khúc & Thương mại đá vỏ chai Mesoamerica) và Ngữ pháp.',
      durationMinutes: 30,
      questions: [
        {
          id: 'toefl-mock-3-q1',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Professor Cho, I know our ceramic sculpture portfolios are due this Friday at noon, but the electric kiln in Studio B tripped a breaker yesterday and shut off mid-firing. Professor Cho: Oh, I heard Facilities came by to inspect that circuit. Did your stoneware pieces crack from cooling too fast? Student: Thankfully no—they stayed intact, though the glaze stayed matte and underfired. Technician Marcus says the replacement relay arrives Thursday morning, so the earliest firing finishes Friday around five p.m. Professor Cho: Well, equipment failure is certainly out of your control. Go ahead and submit high-resolution photos of your clay maquettes and design sketches by Friday noon so the grading system logs an on-time submission, then bring the finished glazed pieces to Monday’s critique.',
          question: 'Why is the student unable to turn in her finished glazed sculptures by Friday noon?',
          options: [
            'She forgot to submit her clay maquettes before Thursday.',
            'Studio B was closed for routine spring cleaning.',
            'An electrical failure interrupted the kiln firing, delaying completion until Friday evening.',
            'All of her stoneware sculptures cracked during rapid cooling.',
          ],
          correctIdx: 2,
          explanation:
            'Lò nung điện ở Studio B bị nhảy cầu dao ngắt giữa chừng; linh kiện thay thế sáng thứ Năm mới tới nên mẻ nung sớm nhất cũng 5h chiều thứ Sáu mới xong.',
        },
        {
          id: 'toefl-mock-3-q2',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Professor Cho, I know our ceramic sculpture portfolios are due this Friday at noon, but the electric kiln in Studio B tripped a breaker yesterday and shut off mid-firing. Professor Cho: Oh, I heard Facilities came by to inspect that circuit. Did your stoneware pieces crack from cooling too fast? Student: Thankfully no—they stayed intact, though the glaze stayed matte and underfired. Technician Marcus says the replacement relay arrives Thursday morning, so the earliest firing finishes Friday around five p.m. Professor Cho: Well, equipment failure is certainly out of your control. Go ahead and submit high-resolution photos of your clay maquettes and design sketches by Friday noon so the grading system logs an on-time submission, then bring the finished glazed pieces to Monday’s critique.',
          question: 'What happened to the student’s sculptures when the kiln shut off early?',
          options: [
            'They remained unbroken, but the glaze was underfired and dull.',
            'They shattered completely inside Studio B.',
            'They melted onto the replacement relay.',
            'They turned bright glossy blue before Thursday.',
          ],
          correctIdx: 0,
          explanation:
            'Tượng đất không bị nứt ("stayed intact"), nhưng lớp men chưa đủ nhiệt nên còn mờ và non ("matte and underfired").',
        },
        {
          id: 'toefl-mock-3-q3',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Professor Cho, I know our ceramic sculpture portfolios are due this Friday at noon, but the electric kiln in Studio B tripped a breaker yesterday and shut off mid-firing. Professor Cho: Oh, I heard Facilities came by to inspect that circuit. Did your stoneware pieces crack from cooling too fast? Student: Thankfully no—they stayed intact, though the glaze stayed matte and underfired. Technician Marcus says the replacement relay arrives Thursday morning, so the earliest firing finishes Friday around five p.m. Professor Cho: Well, equipment failure is certainly out of your control. Go ahead and submit high-resolution photos of your clay maquettes and design sketches by Friday noon so the grading system logs an on-time submission, then bring the finished glazed pieces to Monday’s critique.',
          question: 'What does Professor Cho instruct the student to upload by Friday noon?',
          options: [
            'A repair invoice signed by Technician Marcus',
            'High-resolution photos of her clay models and design sketches',
            'A three-page essay on electric kiln circuits',
            'Video footage of the broken studio breaker',
          ],
          correctIdx: 1,
          explanation:
            'Giáo sư yêu cầu nộp ảnh độ phân giải cao của mẫu phác thảo đất sét và bản vẽ thiết kế trước trưa thứ Sáu để hệ thống ghi nhận đúng hạn.',
        },
        {
          id: 'toefl-mock-3-q4',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Professor Cho, I know our ceramic sculpture portfolios are due this Friday at noon, but the electric kiln in Studio B tripped a breaker yesterday and shut off mid-firing. Professor Cho: Oh, I heard Facilities came by to inspect that circuit. Did your stoneware pieces crack from cooling too fast? Student: Thankfully no—they stayed intact, though the glaze stayed matte and underfired. Technician Marcus says the replacement relay arrives Thursday morning, so the earliest firing finishes Friday around five p.m. Professor Cho: Well, equipment failure is certainly out of your control. Go ahead and submit high-resolution photos of your clay maquettes and design sketches by Friday noon so the grading system logs an on-time submission, then bring the finished glazed pieces to Monday’s critique.',
          question: 'When will the student bring the finished glazed sculptures to class?',
          options: [
            'Thursday morning at eight',
            'Friday evening at five',
            'Saturday afternoon during open studio',
            'Monday during the critique session',
          ],
          correctIdx: 3,
          explanation:
            'Giáo sư dặn: "bring the finished glazed pieces to Monday’s critique".',
        },
        {
          id: 'toefl-mock-3-q5',
          skill: 'listening',
          partLabel: 'Academic Lecture: Cognitive Psychology (Q5–Q10)',
          audioScript:
            'Professor: Raise your hand if you have ever crammed four hours the night before an exam—and forgotten half the material by next Tuesday. Cognitive psychologists call that "massed practice." While cramming feels productive because concepts sit right at the tip of short-term memory, it produces fragile recall. Compare that with the "spacing effect," first documented by Hermann Ebbinghaus in 1885. Studying the same four total hours split into four one-hour sessions spread across two weeks dramatically boosts long-term retention. Why does spacing work? First, allowing a little forgetting between sessions forces the brain to work harder during retrieval, which strengthens neural pathways—a phenomenon researchers call "desirable difficulty." Second, each spaced session occurs in slightly different mental and physical contexts, giving your memory multiple retrieval hooks. Interestingly, students often misjudge spacing because struggling to recall last week’s notes feels harder than rereading fresh notes—so they mistakenly assume cramming works better!',
          question: 'What is the main focus of the psychology lecture?',
          options: [
            'Why four-hour exams cause unnecessary anxiety among students',
            'Why spaced study sessions outperform cramming for durable long-term memory',
            'How Hermann Ebbinghaus designed short-term memory tests in 1885',
            'Why rereading textbooks before bed improves physical health',
          ],
          correctIdx: 1,
          explanation:
            'Bài giảng so sánh học dồn (massed practice) với học phân tán (spacing effect) và giải thích vì sao chia nhỏ thời gian học giúp ghi nhớ dài hạn tốt hơn.',
        },
        {
          id: 'toefl-mock-3-q6',
          skill: 'listening',
          partLabel: 'Academic Lecture: Cognitive Psychology (Q5–Q10)',
          audioScript:
            'Professor: Raise your hand if you have ever crammed four hours the night before an exam—and forgotten half the material by next Tuesday. Cognitive psychologists call that "massed practice." While cramming feels productive because concepts sit right at the tip of short-term memory, it produces fragile recall. Compare that with the "spacing effect," first documented by Hermann Ebbinghaus in 1885. Studying the same four total hours split into four one-hour sessions spread across two weeks dramatically boosts long-term retention. Why does spacing work? First, allowing a little forgetting between sessions forces the brain to work harder during retrieval, which strengthens neural pathways—a phenomenon researchers call "desirable difficulty." Second, each spaced session occurs in slightly different mental and physical contexts, giving your memory multiple retrieval hooks. Interestingly, students often misjudge spacing because struggling to recall last week’s notes feels harder than rereading fresh notes—so they mistakenly assume cramming works better!',
          question: 'What does the term "desirable difficulty" refer to in the lecture?',
          options: [
            'Taking a harder elective course in the first week of semester',
            'Studying without taking any written notes during lectures',
            'Listening to loud music while memorizing vocabulary lists',
            'The extra mental effort required to retrieve partially forgotten material, which strengthens memory',
          ],
          correctIdx: 3,
          explanation:
            '"Desirable difficulty" là nỗ lực truy xuất thông tin hơi phai mờ giữa các buổi học giãn cách, giúp củng cố đường dẫn thần kinh.',
        },
        {
          id: 'toefl-mock-3-q7',
          skill: 'listening',
          partLabel: 'Academic Lecture: Cognitive Psychology (Q5–Q10)',
          audioScript:
            'Professor: Raise your hand if you have ever crammed four hours the night before an exam—and forgotten half the material by next Tuesday. Cognitive psychologists call that "massed practice." While cramming feels productive because concepts sit right at the tip of short-term memory, it produces fragile recall. Compare that with the "spacing effect," first documented by Hermann Ebbinghaus in 1885. Studying the same four total hours split into four one-hour sessions spread across two weeks dramatically boosts long-term retention. Why does spacing work? First, allowing a little forgetting between sessions forces the brain to work harder during retrieval, which strengthens neural pathways—a phenomenon researchers call "desirable difficulty." Second, each spaced session occurs in slightly different mental and physical contexts, giving your memory multiple retrieval hooks. Interestingly, students often misjudge spacing because struggling to recall last week’s notes feels harder than rereading fresh notes—so they mistakenly assume cramming works better!',
          question: 'What is the second reason the professor gives for why spaced practice works?',
          options: [
            'It cuts total study time in half compared to cramming.',
            'It guarantees higher scores without any effort during tests.',
            'Studying across varied mental and physical contexts creates multiple retrieval cues.',
            'Short-term memory holds concepts indefinitely after two weeks.',
          ],
          correctIdx: 2,
          explanation:
            'Lý do thứ hai là học qua nhiều bối cảnh tinh thần/không gian khác nhau tạo ra nhiều móc nối gợi nhớ ("multiple retrieval hooks").',
        },
        {
          id: 'toefl-mock-3-q8',
          skill: 'listening',
          partLabel: 'Academic Lecture: Cognitive Psychology (Q5–Q10)',
          audioScript:
            'Professor: Raise your hand if you have ever crammed four hours the night before an exam—and forgotten half the material by next Tuesday. Cognitive psychologists call that "massed practice." While cramming feels productive because concepts sit right at the tip of short-term memory, it produces fragile recall. Compare that with the "spacing effect," first documented by Hermann Ebbinghaus in 1885. Studying the same four total hours split into four one-hour sessions spread across two weeks dramatically boosts long-term retention. Why does spacing work? First, allowing a little forgetting between sessions forces the brain to work harder during retrieval, which strengthens neural pathways—a phenomenon researchers call "desirable difficulty." Second, each spaced session occurs in slightly different mental and physical contexts, giving your memory multiple retrieval hooks. Interestingly, students often misjudge spacing because struggling to recall last week’s notes feels harder than rereading fresh notes—so they mistakenly assume cramming works better!',
          question: 'Why do many students wrongly believe that cramming is more effective than spacing?',
          options: [
            'Struggling to recall older notes feels harder than fluently rereading fresh material.',
            'Most college professors actively recommend massed practice before midterms.',
            'Ebbinghaus proved that spacing works only for mathematics formulas.',
            'Cramming always produces higher scores even three months after an exam.',
          ],
          correctIdx: 0,
          explanation:
            'Sinh viên đánh giá nhầm vì cảm giác vất vả khi cố nhớ lại kiến thức tuần trước khiến họ tưởng phương pháp giãn cách kém hiệu quả hơn việc đọc lại bài mới.',
        },
        {
          id: 'toefl-mock-3-q9',
          skill: 'listening',
          partLabel: 'Academic Lecture: Cognitive Psychology (Q5–Q10)',
          audioScript:
            'Professor: Raise your hand if you have ever crammed four hours the night before an exam—and forgotten half the material by next Tuesday. Cognitive psychologists call that "massed practice." While cramming feels productive because concepts sit right at the tip of short-term memory, it produces fragile recall. Compare that with the "spacing effect," first documented by Hermann Ebbinghaus in 1885. Studying the same four total hours split into four one-hour sessions spread across two weeks dramatically boosts long-term retention. Why does spacing work? First, allowing a little forgetting between sessions forces the brain to work harder during retrieval, which strengthens neural pathways—a phenomenon researchers call "desirable difficulty." Second, each spaced session occurs in slightly different mental and physical contexts, giving your memory multiple retrieval hooks. Interestingly, students often misjudge spacing because struggling to recall last week’s notes feels harder than rereading fresh notes—so they mistakenly assume cramming works better!',
          question: 'In the professor’s comparison, what remains equal between the cramming scenario and the spacing scenario?',
          options: [
            'The forgetting rate after Tuesday’s exam',
            'The total number of study hours invested (four hours)',
            'The physical room where every session occurs',
            'The year Hermann Ebbinghaus published both studies',
          ],
          correctIdx: 1,
          explanation:
            'Cả hai phương pháp đều dùng tổng cộng 4 tiếng học ("the same four total hours"), chỉ khác cách phân bổ thời gian.',
        },
        {
          id: 'toefl-mock-3-q10',
          skill: 'listening',
          partLabel: 'Academic Lecture: Cognitive Psychology (Q5–Q10)',
          audioScript:
            'Professor: Raise your hand if you have ever crammed four hours the night before an exam—and forgotten half the material by next Tuesday. Cognitive psychologists call that "massed practice." While cramming feels productive because concepts sit right at the tip of short-term memory, it produces fragile recall. Compare that with the "spacing effect," first documented by Hermann Ebbinghaus in 1885. Studying the same four total hours split into four one-hour sessions spread across two weeks dramatically boosts long-term retention. Why does spacing work? First, allowing a little forgetting between sessions forces the brain to work harder during retrieval, which strengthens neural pathways—a phenomenon researchers call "desirable difficulty." Second, each spaced session occurs in slightly different mental and physical contexts, giving your memory multiple retrieval hooks. Interestingly, students often misjudge spacing because struggling to recall last week’s notes feels harder than rereading fresh notes—so they mistakenly assume cramming works better!',
          question: 'What practical advice would the professor most likely endorse?',
          options: [
            'Reread highlighted pages five times in a single marathon evening.',
            'Avoid testing yourself until the morning of the final exam.',
            'Always study at the exact same library desk to eliminate extra cues.',
            'Review course material in shorter sessions spaced over several weeks.',
          ],
          correctIdx: 3,
          explanation:
            'Thông điệp cốt lõi của bài giảng khuyến khích chia nhỏ thời gian ôn tập giãn cách qua nhiều tuần.',
        },
        {
          id: 'toefl-mock-3-q11',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Earth Science (Q11–Q17)',
          passage:
            'Crossing flat floodplains, mature rivers rarely flow in straight lines; instead, they trace sweeping S-shaped loops called meanders. Even a minor disturbance—such as a fallen log or boulder deflecting current slightly toward one bank—starts a self-reinforcing cycle. As water accelerates around the outer edge of a bend, fast current scours sand and clay from the outer bank, carving a steep cutbank. Simultaneously, water along the inner curve slows down dramatically, dropping suspended gravel and silt to build a gently sloping sandbar called a point bar.\n\nOver decades, continued erosion on outer bends and deposition on inner bars exaggerate each loop’s curvature until the river channel nearly doubles back upon itself, leaving only a thin neck of soil between two adjacent curves. During a heavy seasonal flood, swollen waters often breach that narrow neck, carving a shorter, steeper path straight across.\n\nOnce the main current abandons the slower roundabout loop in favor of the straight cutoff, slack water at both ends of the old bend drops fresh silt, sealing it off from the active river. What remains is a crescent-shaped wetland known as an oxbow lake—a temporary aquatic habitat that slowly fills with reeds and organic sediment over centuries.',
          question: 'How does a river bend begin to grow sharper according to paragraph 1?',
          options: [
            'Slow outer currents drop boulders onto the inner bank.',
            'Ice sheets carve straight trenches across flat floodplains.',
            'Faster outer current erodes the outer bank while slower inner current deposits sediment.',
            'Seasonal floods instantly wash away all suspended gravel.',
          ],
          correctIdx: 2,
          explanation:
            'Dòng nước chảy nhanh ở bờ ngoài gây xói mòn tạo vách lõm (cutbank), còn dòng chảy chậm ở bờ trong bồi tụ tạo bãi cát (point bar).',
        },
        {
          id: 'toefl-mock-3-q12',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Earth Science (Q11–Q17)',
          passage:
            'Crossing flat floodplains, mature rivers rarely flow in straight lines; instead, they trace sweeping S-shaped loops called meanders. Even a minor disturbance—such as a fallen log or boulder deflecting current slightly toward one bank—starts a self-reinforcing cycle. As water accelerates around the outer edge of a bend, fast current scours sand and clay from the outer bank, carving a steep cutbank. Simultaneously, water along the inner curve slows down dramatically, dropping suspended gravel and silt to build a gently sloping sandbar called a point bar.\n\nOver decades, continued erosion on outer bends and deposition on inner bars exaggerate each loop’s curvature until the river channel nearly doubles back upon itself, leaving only a thin neck of soil between two adjacent curves. During a heavy seasonal flood, swollen waters often breach that narrow neck, carving a shorter, steeper path straight across.\n\nOnce the main current abandons the slower roundabout loop in favor of the straight cutoff, slack water at both ends of the old bend drops fresh silt, sealing it off from the active river. What remains is a crescent-shaped wetland known as an oxbow lake—a temporary aquatic habitat that slowly fills with reeds and organic sediment over centuries.',
          question: 'The word "scours" in paragraph 1 is closest in meaning to:',
          options: ['erodes and scrapes away', 'freezes solid', 'stabilizes gently', 'colors darkly'],
          correctIdx: 0,
          explanation:
            '"Fast current scours sand and clay from the outer bank" = dòng nước xiết bào mòn, cuốn trôi cát sét khỏi bờ ngoài ("erodes and scrapes away").',
        },
        {
          id: 'toefl-mock-3-q13',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Earth Science (Q11–Q17)',
          passage:
            'Crossing flat floodplains, mature rivers rarely flow in straight lines; instead, they trace sweeping S-shaped loops called meanders. Even a minor disturbance—such as a fallen log or boulder deflecting current slightly toward one bank—starts a self-reinforcing cycle. As water accelerates around the outer edge of a bend, fast current scours sand and clay from the outer bank, carving a steep cutbank. Simultaneously, water along the inner curve slows down dramatically, dropping suspended gravel and silt to build a gently sloping sandbar called a point bar.\n\nOver decades, continued erosion on outer bends and deposition on inner bars exaggerate each loop’s curvature until the river channel nearly doubles back upon itself, leaving only a thin neck of soil between two adjacent curves. During a heavy seasonal flood, swollen waters often breach that narrow neck, carving a shorter, steeper path straight across.\n\nOnce the main current abandons the slower roundabout loop in favor of the straight cutoff, slack water at both ends of the old bend drops fresh silt, sealing it off from the active river. What remains is a crescent-shaped wetland known as an oxbow lake—a temporary aquatic habitat that slowly fills with reeds and organic sediment over centuries.',
          question: 'What event typically triggers the shortcut across a meander’s narrow neck?',
          options: [
            'Drought drying up the point bar completely',
            'Swollen floodwaters breaking through the thin strip of land between adjacent bends',
            'Reeds growing thick enough to block the cutbank',
            'Fallen boulders damming both ends of a straight river',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn 2 nêu khi có lũ lớn theo mùa, dòng nước dâng tràn phá vỡ dải đất hẹp ("narrow neck"), tạo đường chảy thẳng và dốc hơn.',
        },
        {
          id: 'toefl-mock-3-q14',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Earth Science (Q11–Q17)',
          passage:
            'Crossing flat floodplains, mature rivers rarely flow in straight lines; instead, they trace sweeping S-shaped loops called meanders. Even a minor disturbance—such as a fallen log or boulder deflecting current slightly toward one bank—starts a self-reinforcing cycle. As water accelerates around the outer edge of a bend, fast current scours sand and clay from the outer bank, carving a steep cutbank. Simultaneously, water along the inner curve slows down dramatically, dropping suspended gravel and silt to build a gently sloping sandbar called a point bar.\n\nOver decades, continued erosion on outer bends and deposition on inner bars exaggerate each loop’s curvature until the river channel nearly doubles back upon itself, leaving only a thin neck of soil between two adjacent curves. During a heavy seasonal flood, swollen waters often breach that narrow neck, carving a shorter, steeper path straight across.\n\nOnce the main current abandons the slower roundabout loop in favor of the straight cutoff, slack water at both ends of the old bend drops fresh silt, sealing it off from the active river. What remains is a crescent-shaped wetland known as an oxbow lake—a temporary aquatic habitat that slowly fills with reeds and organic sediment over centuries.',
          question: 'How does an abandoned river bend become completely separated into an oxbow lake?',
          options: [
            'Earthquakes lift the old channel above the floodplain.',
            'Evaporation removes every drop of water within weeks.',
            'Gravel from point bars washes upstream against the current.',
            'Slow water at both ends of the old loop deposits silt that seals off the channel.',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 3 giải thích nước đứng ở hai đầu khúc uốn cũ lắng đọng phù sa mới, bịt kín và tách rời nó khỏi dòng sông chính.',
        },
        {
          id: 'toefl-mock-3-q15',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Earth Science (Q11–Q17)',
          passage:
            'Crossing flat floodplains, mature rivers rarely flow in straight lines; instead, they trace sweeping S-shaped loops called meanders. Even a minor disturbance—such as a fallen log or boulder deflecting current slightly toward one bank—starts a self-reinforcing cycle. As water accelerates around the outer edge of a bend, fast current scours sand and clay from the outer bank, carving a steep cutbank. Simultaneously, water along the inner curve slows down dramatically, dropping suspended gravel and silt to build a gently sloping sandbar called a point bar.\n\nOver decades, continued erosion on outer bends and deposition on inner bars exaggerate each loop’s curvature until the river channel nearly doubles back upon itself, leaving only a thin neck of soil between two adjacent curves. During a heavy seasonal flood, swollen waters often breach that narrow neck, carving a shorter, steeper path straight across.\n\nOnce the main current abandons the slower roundabout loop in favor of the straight cutoff, slack water at both ends of the old bend drops fresh silt, sealing it off from the active river. What remains is a crescent-shaped wetland known as an oxbow lake—a temporary aquatic habitat that slowly fills with reeds and organic sediment over centuries.',
          question: 'Why does the author call an oxbow lake "a temporary aquatic habitat"?',
          options: [
            'Seasonal floods always reconnect it to the ocean every spring.',
            'Fish rapidly consume all organic matter inside the lake.',
            'Over centuries, reeds and organic sediment gradually fill it in.',
            'Outer cutbanks collapse inward within two or three days.',
          ],
          correctIdx: 2,
          explanation:
            'Hồ móng ngựa chỉ tồn tại tạm thời trên thang địa chất vì qua nhiều thế kỷ, lau sậy và trầm tích hữu cơ dần lấp đầy lòng hồ.',
        },
        {
          id: 'toefl-mock-3-q16',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Earth Science (Q11–Q17)',
          passage:
            'Crossing flat floodplains, mature rivers rarely flow in straight lines; instead, they trace sweeping S-shaped loops called meanders. Even a minor disturbance—such as a fallen log or boulder deflecting current slightly toward one bank—starts a self-reinforcing cycle. As water accelerates around the outer edge of a bend, fast current scours sand and clay from the outer bank, carving a steep cutbank. Simultaneously, water along the inner curve slows down dramatically, dropping suspended gravel and silt to build a gently sloping sandbar called a point bar.\n\nOver decades, continued erosion on outer bends and deposition on inner bars exaggerate each loop’s curvature until the river channel nearly doubles back upon itself, leaving only a thin neck of soil between two adjacent curves. During a heavy seasonal flood, swollen waters often breach that narrow neck, carving a shorter, steeper path straight across.\n\nOnce the main current abandons the slower roundabout loop in favor of the straight cutoff, slack water at both ends of the old bend drops fresh silt, sealing it off from the active river. What remains is a crescent-shaped wetland known as an oxbow lake—a temporary aquatic habitat that slowly fills with reeds and organic sediment over centuries.',
          question: 'Why does the author mention "a fallen log or boulder" in paragraph 1?',
          options: [
            'To complain about human logging along flat riverbanks',
            'To show how a small initial obstacle can trigger the self-reinforcing meandering cycle',
            'To prove that mature rivers never flow past rocky mountains',
            'To explain why point bars form before cutbanks appear',
          ],
          correctIdx: 1,
          explanation:
            'Khúc gỗ đổ hay tảng đá minh họa tác nhân nhỏ ban đầu làm lệch dòng nước, khởi phát vòng lặp tự khuếch đại tạo khúc uốn.',
        },
        {
          id: 'toefl-mock-3-q17',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Earth Science (Q11–Q17)',
          passage:
            'Crossing flat floodplains, mature rivers rarely flow in straight lines; instead, they trace sweeping S-shaped loops called meanders. Even a minor disturbance—such as a fallen log or boulder deflecting current slightly toward one bank—starts a self-reinforcing cycle. As water accelerates around the outer edge of a bend, fast current scours sand and clay from the outer bank, carving a steep cutbank. Simultaneously, water along the inner curve slows down dramatically, dropping suspended gravel and silt to build a gently sloping sandbar called a point bar.\n\nOver decades, continued erosion on outer bends and deposition on inner bars exaggerate each loop’s curvature until the river channel nearly doubles back upon itself, leaving only a thin neck of soil between two adjacent curves. During a heavy seasonal flood, swollen waters often breach that narrow neck, carving a shorter, steeper path straight across.\n\nOnce the main current abandons the slower roundabout loop in favor of the straight cutoff, slack water at both ends of the old bend drops fresh silt, sealing it off from the active river. What remains is a crescent-shaped wetland known as an oxbow lake—a temporary aquatic habitat that slowly fills with reeds and organic sediment over centuries.',
          question: 'Which statement about river meanders is NOT supported by the passage?',
          options: [
            'Water moves fastest along the inner curve where point bars form.',
            'The outer edge of a meander experiences ongoing erosion.',
            'An oxbow lake retains a crescent shape after being cut off.',
            'Cutoffs follow a shorter, steeper path than the old loop.',
          ],
          correctIdx: 0,
          explanation:
            'Dòng nước ở bờ trong chảy chậm lại ("slows down dramatically") chứ không phải nhanh nhất; nước chỉ chảy nhanh ở rìa ngoài.',
        },
        {
          id: 'toefl-mock-3-q18',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Anthropology (Q18–Q23)',
          passage:
            'Long before iron tools reached Mesoamerica, ancient societies across central Mexico prized obsidian—a glossy volcanic glass formed when silica-rich lava cools too quickly to grow crystals. Struck skillfully at precise angles, obsidian fractures into blades thinner and sharper than modern surgical steel, ideal for harvesting maize, scraping animal hides, and carving wooden masks.\n\nBecause usable obsidian flows existed only in scattered volcanic highlands such as Pachuca—famous for its distinctive translucent green stone—archaeologists can trace prehistoric trade networks with remarkable precision. Using X-ray fluorescence spectroscopy, researchers measure trace elements like rubidium and strontium inside excavated artifacts without damaging them, matching each blade back to its exact quarry hundreds of kilometers away.\n\nBy the Classic Maya period, green Pachuca obsidian traveled more than a thousand kilometers from central Mexico to lowland rainforest cities. Merchants carried pre-shaped cylindrical cores rather than bulky raw boulders to minimize pack weight along footpath trails. Finding high percentages of green obsidian blades in distant royal tombs reveals not merely commercial exchange, but elite diplomatic alliances linking highland empires with lowland Maya courts.',
          question: 'How does obsidian form naturally according to paragraph 1?',
          options: [
            'Water compresses river clay into transparent sheets.',
            'Ancient artisans melt quartz sand inside pottery kilns.',
            'Silica-rich sediment freezes beneath coastal glaciers.',
            'Silica-rich volcanic lava cools rapidly before crystals can develop.',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 1 nêu obsidian hình thành khi dung nham giàu silica nguội quá nhanh khiến tinh thể không kịp phát triển.',
        },
        {
          id: 'toefl-mock-3-q19',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Anthropology (Q18–Q23)',
          passage:
            'Long before iron tools reached Mesoamerica, ancient societies across central Mexico prized obsidian—a glossy volcanic glass formed when silica-rich lava cools too quickly to grow crystals. Struck skillfully at precise angles, obsidian fractures into blades thinner and sharper than modern surgical steel, ideal for harvesting maize, scraping animal hides, and carving wooden masks.\n\nBecause usable obsidian flows existed only in scattered volcanic highlands such as Pachuca—famous for its distinctive translucent green stone—archaeologists can trace prehistoric trade networks with remarkable precision. Using X-ray fluorescence spectroscopy, researchers measure trace elements like rubidium and strontium inside excavated artifacts without damaging them, matching each blade back to its exact quarry hundreds of kilometers away.\n\nBy the Classic Maya period, green Pachuca obsidian traveled more than a thousand kilometers from central Mexico to lowland rainforest cities. Merchants carried pre-shaped cylindrical cores rather than bulky raw boulders to minimize pack weight along footpath trails. Finding high percentages of green obsidian blades in distant royal tombs reveals not merely commercial exchange, but elite diplomatic alliances linking highland empires with lowland Maya courts.',
          question: 'Why is X-ray fluorescence spectroscopy especially useful to archaeologists studying obsidian blades?',
          options: [
            'It sharpens dull volcanic edges for museum displays.',
            'It dates wooden masks buried alongside volcanic boulders.',
            'It identifies unique trace-element fingerprints of quarries without harming the artifacts.',
            'It melts small blade fragments to separate rubidium from green glass.',
          ],
          correctIdx: 2,
          explanation:
            'Phổ huỳnh quang tia X đo nguyên tố vi lượng để truy nguyên mỏ đá gốc mà không làm hư hại hiện vật ("without damaging them").',
        },
        {
          id: 'toefl-mock-3-q20',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Anthropology (Q18–Q23)',
          passage:
            'Long before iron tools reached Mesoamerica, ancient societies across central Mexico prized obsidian—a glossy volcanic glass formed when silica-rich lava cools too quickly to grow crystals. Struck skillfully at precise angles, obsidian fractures into blades thinner and sharper than modern surgical steel, ideal for harvesting maize, scraping animal hides, and carving wooden masks.\n\nBecause usable obsidian flows existed only in scattered volcanic highlands such as Pachuca—famous for its distinctive translucent green stone—archaeologists can trace prehistoric trade networks with remarkable precision. Using X-ray fluorescence spectroscopy, researchers measure trace elements like rubidium and strontium inside excavated artifacts without damaging them, matching each blade back to its exact quarry hundreds of kilometers away.\n\nBy the Classic Maya period, green Pachuca obsidian traveled more than a thousand kilometers from central Mexico to lowland rainforest cities. Merchants carried pre-shaped cylindrical cores rather than bulky raw boulders to minimize pack weight along footpath trails. Finding high percentages of green obsidian blades in distant royal tombs reveals not merely commercial exchange, but elite diplomatic alliances linking highland empires with lowland Maya courts.',
          question: 'Why did long-distance merchants transport pre-shaped cylindrical cores instead of raw obsidian boulders?',
          options: [
            'Raw boulders shattered whenever exposed to rainforest humidity.',
            'Pre-shaped cores weighed far less to carry along pedestrian trade trails.',
            'Maya royal tombs banned unshaped rocks from entering city plazas.',
            'Cylindrical cores had higher concentrations of translucent green strontium.',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn 3 nêu thương nhân mang lõi hình trụ đã đẽo sơ thay vì tảng đá thô cồng kềnh để giảm trọng lượng mang vác trên đường mòn ("minimize pack weight").',
        },
        {
          id: 'toefl-mock-3-q21',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Anthropology (Q18–Q23)',
          passage:
            'Long before iron tools reached Mesoamerica, ancient societies across central Mexico prized obsidian—a glossy volcanic glass formed when silica-rich lava cools too quickly to grow crystals. Struck skillfully at precise angles, obsidian fractures into blades thinner and sharper than modern surgical steel, ideal for harvesting maize, scraping animal hides, and carving wooden masks.\n\nBecause usable obsidian flows existed only in scattered volcanic highlands such as Pachuca—famous for its distinctive translucent green stone—archaeologists can trace prehistoric trade networks with remarkable precision. Using X-ray fluorescence spectroscopy, researchers measure trace elements like rubidium and strontium inside excavated artifacts without damaging them, matching each blade back to its exact quarry hundreds of kilometers away.\n\nBy the Classic Maya period, green Pachuca obsidian traveled more than a thousand kilometers from central Mexico to lowland rainforest cities. Merchants carried pre-shaped cylindrical cores rather than bulky raw boulders to minimize pack weight along footpath trails. Finding high percentages of green obsidian blades in distant royal tombs reveals not merely commercial exchange, but elite diplomatic alliances linking highland empires with lowland Maya courts.',
          question: 'What does the presence of green Pachuca obsidian inside distant Maya royal tombs indicate?',
          options: [
            'Diplomatic and elite political ties connecting central Mexican powers with Maya courts',
            'That Maya rainforests contained hidden Pachuca volcanoes underground',
            'That Maya soldiers conquered central Mexico to seize iron mines',
            'That green obsidian was too brittle for everyday maize harvesting',
          ],
          correctIdx: 0,
          explanation:
            'Câu cuối khẳng định tỷ lệ cao đá xanh Pachuca trong mộ hoàng gia phản ánh liên minh ngoại giao giữa các đế chế vùng cao nguyên và triều đình Maya.',
        },
        {
          id: 'toefl-mock-3-q22',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Anthropology (Q18–Q23)',
          passage:
            'Long before iron tools reached Mesoamerica, ancient societies across central Mexico prized obsidian—a glossy volcanic glass formed when silica-rich lava cools too quickly to grow crystals. Struck skillfully at precise angles, obsidian fractures into blades thinner and sharper than modern surgical steel, ideal for harvesting maize, scraping animal hides, and carving wooden masks.\n\nBecause usable obsidian flows existed only in scattered volcanic highlands such as Pachuca—famous for its distinctive translucent green stone—archaeologists can trace prehistoric trade networks with remarkable precision. Using X-ray fluorescence spectroscopy, researchers measure trace elements like rubidium and strontium inside excavated artifacts without damaging them, matching each blade back to its exact quarry hundreds of kilometers away.\n\nBy the Classic Maya period, green Pachuca obsidian traveled more than a thousand kilometers from central Mexico to lowland rainforest cities. Merchants carried pre-shaped cylindrical cores rather than bulky raw boulders to minimize pack weight along footpath trails. Finding high percentages of green obsidian blades in distant royal tombs reveals not merely commercial exchange, but elite diplomatic alliances linking highland empires with lowland Maya courts.',
          question: 'The word "scattered" in paragraph 2 is closest in meaning to:',
          options: ['exhausted', 'underground', 'deeply buried', 'widely separated'],
          correctIdx: 3,
          explanation:
            '"Scattered volcanic highlands" = các vùng cao nguyên núi lửa nằm rải rác cách xa nhau ("widely separated").',
        },
        {
          id: 'toefl-mock-3-q23',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Anthropology (Q18–Q23)',
          passage:
            'Long before iron tools reached Mesoamerica, ancient societies across central Mexico prized obsidian—a glossy volcanic glass formed when silica-rich lava cools too quickly to grow crystals. Struck skillfully at precise angles, obsidian fractures into blades thinner and sharper than modern surgical steel, ideal for harvesting maize, scraping animal hides, and carving wooden masks.\n\nBecause usable obsidian flows existed only in scattered volcanic highlands such as Pachuca—famous for its distinctive translucent green stone—archaeologists can trace prehistoric trade networks with remarkable precision. Using X-ray fluorescence spectroscopy, researchers measure trace elements like rubidium and strontium inside excavated artifacts without damaging them, matching each blade back to its exact quarry hundreds of kilometers away.\n\nBy the Classic Maya period, green Pachuca obsidian traveled more than a thousand kilometers from central Mexico to lowland rainforest cities. Merchants carried pre-shaped cylindrical cores rather than bulky raw boulders to minimize pack weight along footpath trails. Finding high percentages of green obsidian blades in distant royal tombs reveals not merely commercial exchange, but elite diplomatic alliances linking highland empires with lowland Maya courts.',
          question: 'What can be inferred about Classic Maya lowland cities?',
          options: [
            'They had easy access to local surgical steel quarries.',
            'They outlawed wooden mask carving during the Classic period.',
            'They lacked natural local volcanic glass deposits of their own.',
            'They shipped raw boulders back to Pachuca by river.',
          ],
          correctIdx: 2,
          explanation:
            'Các thành phố rừng mưa vùng thấp phải nhập lõi đá vỏ chai từ cách hơn 1.000 km ở vùng cao nguyên núi lửa, suy ra bản thân vùng đất thấp không có mỏ obsidian tự nhiên.',
        },
        {
          id: 'toefl-mock-3-q24',
          skill: 'grammar',
          partLabel: 'Academic Grammar & Precision (Q24)',
          question: 'Select the sentence that uses formal academic inversion accurately:',
          options: [
            'Not only did spaced retrieval improve recall, than it also lowered exam anxiety.',
            'Not only did spaced retrieval improve recall, but it also lowered exam anxiety.',
            'Not only spaced retrieval improved recall, but also lowered exam anxiety.',
            'Did not only spaced retrieval improve recall, but it lowered exam anxiety too.',
          ],
          correctIdx: 1,
          explanation:
            'Cặp liên từ "Not only... but also..." khi đảo ngữ ở vế đầu chuẩn là: "Not only + trợ động từ (did) + S + V nguyên mẫu, but S + also + V...".',
        },
        {
          id: 'toefl-mock-3-q25',
          skill: 'vocab',
          partLabel: 'Academic Discussion Precision (Q25)',
          question: 'Which sentence contributes the strongest academic reasoning to a discussion about campus transit fees?',
          options: [
            'Subsidizing unlimited bus passes for undergraduates could reduce parking congestion while ensuring low-income commuters attend evening labs reliably.',
            'Buses are nice and everyone should ride them because cars are bad.',
            'I completely agree with Mark’s sentence about buses and nothing else.',
            'Do students even care about parking congestion on campus nowadays?',
          ],
          correctIdx: 0,
          explanation:
            'A nêu rõ cơ chế chính sách ("subsidizing unlimited bus passes") và hai tác động cụ thể (giảm ùn tắc bãi xe, hỗ trợ sinh viên thu nhập thấp học ca tối).',
        },
      ],
    },
    {
      title: 'Mini Mock Test #4',
      description:
        'Đề thi thử 25 câu (30 phút): Graduate TA Tech Support Conversation, Bài giảng Sinh thái Rừng (Mycorrhizal Networks), 2 bài đọc Học thuật (Màu cấu trúc quang học & Không gian thứ ba đô thị) và Ngữ pháp.',
      durationMinutes: 30,
      questions: [
        {
          id: 'toefl-mock-4-q1',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Teaching Assistant: Hi, Jordan, I’m leading three discussion sections for Intro to Macroeconomics this semester, and Professor Vance asked me to set up timed five-minute review quizzes on the course learning portal before Monday. IT Specialist: Happy to help, Elena. Have you enabled the "randomized question bank" toggle yet? Because when two hundred freshmen take an online quiz simultaneously inside the lecture hall, drawing from a question pool prevents neighbors from seeing identical items in the same order. Teaching Assistant: Oh, I wrote ten questions, though I placed them all in a fixed single page. How do I convert them? IT Specialist: Simply export your draft as a QTI package, import it into the Question Library tab, and set the quiz to pull five random items per student. Just remember to publish the module itself—not only the quiz—otherwise students will get an "access denied" error at eight a.m. Monday.',
          question: 'Why does Elena contact the IT Specialist?',
          options: [
            'To repair a broken projector inside the macroeconomics lecture hall',
            'To ask for extra teaching assistant pay for three discussion sections',
            'To reset her forgotten password for the university portal',
            'To set up timed online review quizzes for her macroeconomics sections',
          ],
          correctIdx: 3,
          explanation:
            'Trợ giảng Elena cần cài đặt các bài kiểm tra ôn tập 5 phút có tính giờ trên cổng học tập trực tuyến trước thứ Hai.',
        },
        {
          id: 'toefl-mock-4-q2',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Teaching Assistant: Hi, Jordan, I’m leading three discussion sections for Intro to Macroeconomics this semester, and Professor Vance asked me to set up timed five-minute review quizzes on the course learning portal before Monday. IT Specialist: Happy to help, Elena. Have you enabled the "randomized question bank" toggle yet? Because when two hundred freshmen take an online quiz simultaneously inside the lecture hall, drawing from a question pool prevents neighbors from seeing identical items in the same order. Teaching Assistant: Oh, I wrote ten questions, though I placed them all in a fixed single page. How do I convert them? IT Specialist: Simply export your draft as a QTI package, import it into the Question Library tab, and set the quiz to pull five random items per student. Just remember to publish the module itself—not only the quiz—otherwise students will get an "access denied" error at eight a.m. Monday.',
          question: 'Why does Jordan recommend using a randomized question bank?',
          options: [
            'It automatically doubles the five-minute time limit for freshmen.',
            'It prevents students sitting side by side in a packed lecture hall from getting the same questions in identical order.',
            'It grades handwritten economics graphs without professor review.',
            'It reduces internet bandwidth usage when two hundred laptops log in.',
          ],
          correctIdx: 1,
          explanation:
            'Khi 200 sinh viên làm bài cùng lúc trong giảng đường, ngân hàng câu hỏi ngẫu nhiên giúp tránh việc người ngồi cạnh nhau nhận câu hỏi giống hệt theo cùng thứ tự.',
        },
        {
          id: 'toefl-mock-4-q3',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Teaching Assistant: Hi, Jordan, I’m leading three discussion sections for Intro to Macroeconomics this semester, and Professor Vance asked me to set up timed five-minute review quizzes on the course learning portal before Monday. IT Specialist: Happy to help, Elena. Have you enabled the "randomized question bank" toggle yet? Because when two hundred freshmen take an online quiz simultaneously inside the lecture hall, drawing from a question pool prevents neighbors from seeing identical items in the same order. Teaching Assistant: Oh, I wrote ten questions, though I placed them all in a fixed single page. How do I convert them? IT Specialist: Simply export your draft as a QTI package, import it into the Question Library tab, and set the quiz to pull five random items per student. Just remember to publish the module itself—not only the quiz—otherwise students will get an "access denied" error at eight a.m. Monday.',
          question: 'How should Elena convert her fixed ten-question draft into a randomized quiz?',
          options: [
            'Email the ten questions directly to Jordan to type manually',
            'Delete five questions and split the rest across three discussion portals',
            'Export the draft as a QTI file, import it into Question Library, and pull five random items',
            'Switch from the course portal to printed paper bubble sheets',
          ],
          correctIdx: 2,
          explanation:
            'Jordan hướng dẫn xuất bản nháp thành gói QTI, nhập vào tab Question Library rồi cài đặt rút ngẫu nhiên 5 câu cho mỗi sinh viên.',
        },
        {
          id: 'toefl-mock-4-q4',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Teaching Assistant: Hi, Jordan, I’m leading three discussion sections for Intro to Macroeconomics this semester, and Professor Vance asked me to set up timed five-minute review quizzes on the course learning portal before Monday. IT Specialist: Happy to help, Elena. Have you enabled the "randomized question bank" toggle yet? Because when two hundred freshmen take an online quiz simultaneously inside the lecture hall, drawing from a question pool prevents neighbors from seeing identical items in the same order. Teaching Assistant: Oh, I wrote ten questions, though I placed them all in a fixed single page. How do I convert them? IT Specialist: Simply export your draft as a QTI package, import it into the Question Library tab, and set the quiz to pull five random items per student. Just remember to publish the module itself—not only the quiz—otherwise students will get an "access denied" error at eight a.m. Monday.',
          question: 'What mistake could trigger an "access denied" error on Monday morning?',
          options: [
            'Publishing the quiz without also publishing the parent course module',
            'Setting the quiz duration to five minutes instead of ten',
            'Including more than ten items inside the Question Library tab',
            'Allowing freshmen to open the portal before eight a.m.',
          ],
          correctIdx: 0,
          explanation:
            'Nếu chỉ publish bài quiz mà quên publish cả module chứa nó, sinh viên sẽ gặp lỗi "access denied".',
        },
        {
          id: 'toefl-mock-4-q5',
          skill: 'listening',
          partLabel: 'Academic Lecture: Forest Ecology (Q5–Q10)',
          audioScript:
            'Professor: Walk through an old-growth forest, and it’s easy to assume individual trees compete fiercely in isolation—each fighting alone for sunlight and soil water. Underground, however, most woodland trees are stitched together by microscopic fungal threads called mycorrhizae. This partnership is an ancient mutualism: trees capture solar energy through photosynthesis and pump sugary carbon downward to feed the fungi, which cannot make their own food. In return, hair-thin fungal filaments—far finer than tree roots—thread through tiny soil pores to harvest phosphorus, nitrogen, and water for their tree hosts. Even more astonishing, isotope-tracing studies revealed that carbon can travel from one tree to another through shared fungal strands! For instance, in shaded understory zones where young Douglas-fir seedlings receive too little sunlight to survive on their own, older canopy trees sometimes supply net carbon through the network. Still, ecologists urge caution against overly romantic metaphors: fungi aren’t selfless charity workers—they allocate more nutrients to whichever tree pays the highest carbon "price," behaving much like shrewd subterranean brokers.',
          question: 'What is the main topic of the forest ecology lecture?',
          options: [
            'How Douglas-fir seedlings outgrow canopy trees by blocking sunlight',
            'Why old-growth forests decline when soil fungi disappear in winter',
            'How underground mycorrhizal fungi connect trees in mutualistic—yet selective—resource exchanges',
            'Differences between nitrogen fertilizers and natural forest rainfall',
          ],
          correctIdx: 2,
          explanation:
            'Bài giảng phân tích mối quan hệ cộng sinh giữa rễ cây rừng và mạng nấm mycorrhizae dưới lòng đất, đồng thời lưu ý cơ chế trao đổi chọn lọc chứ không hoàn toàn vị tha.',
        },
        {
          id: 'toefl-mock-4-q6',
          skill: 'listening',
          partLabel: 'Academic Lecture: Forest Ecology (Q5–Q10)',
          audioScript:
            'Professor: Walk through an old-growth forest, and it’s easy to assume individual trees compete fiercely in isolation—each fighting alone for sunlight and soil water. Underground, however, most woodland trees are stitched together by microscopic fungal threads called mycorrhizae. This partnership is an ancient mutualism: trees capture solar energy through photosynthesis and pump sugary carbon downward to feed the fungi, which cannot make their own food. In return, hair-thin fungal filaments—far finer than tree roots—thread through tiny soil pores to harvest phosphorus, nitrogen, and water for their tree hosts. Even more astonishing, isotope-tracing studies revealed that carbon can travel from one tree to another through shared fungal strands! For instance, in shaded understory zones where young Douglas-fir seedlings receive too little sunlight to survive on their own, older canopy trees sometimes supply net carbon through the network. Still, ecologists urge caution against overly romantic metaphors: fungi aren’t selfless charity workers—they allocate more nutrients to whichever tree pays the highest carbon "price," behaving much like shrewd subterranean brokers.',
          question: 'What do trees receive in exchange for supplying sugary carbon to mycorrhizal fungi?',
          options: [
            'Phosphorus, nitrogen, and water gathered from tiny soil pores',
            'Extra sunlight reflected onto shaded understory leaves',
            'Protection from bark beetles during summer droughts',
            'Photosynthetic chlorophyll stored inside fungal spores',
          ],
          correctIdx: 0,
          explanation:
            'Sợi nấm mảnh hơn nhiều so với rễ cây giúp len vào các khe đất nhỏ để hút phốt pho, nitơ và nước cung cấp lại cho cây chủ.',
        },
        {
          id: 'toefl-mock-4-q7',
          skill: 'listening',
          partLabel: 'Academic Lecture: Forest Ecology (Q5–Q10)',
          audioScript:
            'Professor: Walk through an old-growth forest, and it’s easy to assume individual trees compete fiercely in isolation—each fighting alone for sunlight and soil water. Underground, however, most woodland trees are stitched together by microscopic fungal threads called mycorrhizae. This partnership is an ancient mutualism: trees capture solar energy through photosynthesis and pump sugary carbon downward to feed the fungi, which cannot make their own food. In return, hair-thin fungal filaments—far finer than tree roots—thread through tiny soil pores to harvest phosphorus, nitrogen, and water for their tree hosts. Even more astonishing, isotope-tracing studies revealed that carbon can travel from one tree to another through shared fungal strands! For instance, in shaded understory zones where young Douglas-fir seedlings receive too little sunlight to survive on their own, older canopy trees sometimes supply net carbon through the network. Still, ecologists urge caution against overly romantic metaphors: fungi aren’t selfless charity workers—they allocate more nutrients to whichever tree pays the highest carbon "price," behaving much like shrewd subterranean brokers.',
          question: 'How did scientists discover that carbon passes from one tree to another via fungal threads?',
          options: [
            'By digging up entire canopy roots and weighing tree bark',
            'By measuring rainfall runoff beneath shaded seedlings',
            'By dyeing forest soil blue around young Douglas-firs',
            'By conducting isotope-tracing experiments',
          ],
          correctIdx: 3,
          explanation:
            'Các nghiên cứu dò dấu đồng vị ("isotope-tracing studies") đã chứng minh cacbon có thể truyền từ cây này sang cây khác qua mạng sợi nấm chung.',
        },
        {
          id: 'toefl-mock-4-q8',
          skill: 'listening',
          partLabel: 'Academic Lecture: Forest Ecology (Q5–Q10)',
          audioScript:
            'Professor: Walk through an old-growth forest, and it’s easy to assume individual trees compete fiercely in isolation—each fighting alone for sunlight and soil water. Underground, however, most woodland trees are stitched together by microscopic fungal threads called mycorrhizae. This partnership is an ancient mutualism: trees capture solar energy through photosynthesis and pump sugary carbon downward to feed the fungi, which cannot make their own food. In return, hair-thin fungal filaments—far finer than tree roots—thread through tiny soil pores to harvest phosphorus, nitrogen, and water for their tree hosts. Even more astonishing, isotope-tracing studies revealed that carbon can travel from one tree to another through shared fungal strands! For instance, in shaded understory zones where young Douglas-fir seedlings receive too little sunlight to survive on their own, older canopy trees sometimes supply net carbon through the network. Still, ecologists urge caution against overly romantic metaphors: fungi aren’t selfless charity workers—they allocate more nutrients to whichever tree pays the highest carbon "price," behaving much like shrewd subterranean brokers.',
          question: 'Why does the professor mention young Douglas-fir seedlings in shaded understory zones?',
          options: [
            'To prove that young seedlings never connect to mycorrhizal networks',
            'To illustrate how older canopy trees can subsidize shaded seedlings with net carbon',
            'To argue that Douglas-firs need less water than other woodland trees',
            'To show that shade prevents fungi from absorbing soil nitrogen',
          ],
          correctIdx: 1,
          explanation:
            'Ví dụ cây non linh sam Douglas dưới tán rậm thiếu sáng nhận được cacbon ròng từ cây cổ thụ tầng trên thông qua mạng nấm.',
        },
        {
          id: 'toefl-mock-4-q9',
          skill: 'listening',
          partLabel: 'Academic Lecture: Forest Ecology (Q5–Q10)',
          audioScript:
            'Professor: Walk through an old-growth forest, and it’s easy to assume individual trees compete fiercely in isolation—each fighting alone for sunlight and soil water. Underground, however, most woodland trees are stitched together by microscopic fungal threads called mycorrhizae. This partnership is an ancient mutualism: trees capture solar energy through photosynthesis and pump sugary carbon downward to feed the fungi, which cannot make their own food. In return, hair-thin fungal filaments—far finer than tree roots—thread through tiny soil pores to harvest phosphorus, nitrogen, and water for their tree hosts. Even more astonishing, isotope-tracing studies revealed that carbon can travel from one tree to another through shared fungal strands! For instance, in shaded understory zones where young Douglas-fir seedlings receive too little sunlight to survive on their own, older canopy trees sometimes supply net carbon through the network. Still, ecologists urge caution against overly romantic metaphors: fungi aren’t selfless charity workers—they allocate more nutrients to whichever tree pays the highest carbon "price," behaving much like shrewd subterranean brokers.',
          question: 'What point does the professor make by calling fungi "shrewd subterranean brokers"?',
          options: [
            'Fungi destroy tree roots whenever carbon levels fluctuate.',
            'Fungi store phosphorus permanently without ever sharing it.',
            'Fungi distribute more nutrients to hosts offering the greatest carbon return rather than acting purely selflessly.',
            'Fungi prefer connecting only to non-native tree species.',
          ],
          correctIdx: 2,
          explanation:
            'Giáo sư lưu ý nấm phân bổ nhiều dưỡng chất hơn cho cây nào trả "giá" cacbon cao nhất, hoạt động theo quy luật trao đổi có lợi chứ không phải từ thiện vô điều kiện.',
        },
        {
          id: 'toefl-mock-4-q10',
          skill: 'listening',
          partLabel: 'Academic Lecture: Forest Ecology (Q5–Q10)',
          audioScript:
            'Professor: Walk through an old-growth forest, and it’s easy to assume individual trees compete fiercely in isolation—each fighting alone for sunlight and soil water. Underground, however, most woodland trees are stitched together by microscopic fungal threads called mycorrhizae. This partnership is an ancient mutualism: trees capture solar energy through photosynthesis and pump sugary carbon downward to feed the fungi, which cannot make their own food. In return, hair-thin fungal filaments—far finer than tree roots—thread through tiny soil pores to harvest phosphorus, nitrogen, and water for their tree hosts. Even more astonishing, isotope-tracing studies revealed that carbon can travel from one tree to another through shared fungal strands! For instance, in shaded understory zones where young Douglas-fir seedlings receive too little sunlight to survive on their own, older canopy trees sometimes supply net carbon through the network. Still, ecologists urge caution against overly romantic metaphors: fungi aren’t selfless charity workers—they allocate more nutrients to whichever tree pays the highest carbon "price," behaving much like shrewd subterranean brokers.',
          question: 'Why are fungal filaments more effective at gathering soil minerals than bare tree roots?',
          options: [
            'They are far thinner than roots and can penetrate tiny soil pores.',
            'They perform photosynthesis directly beneath fallen forest leaves.',
            'They convert underground rocks into liquid sugar.',
            'They grow upward along tree trunks to capture rainwater.',
          ],
          correctIdx: 0,
          explanation:
            'Sợi nấm mảnh như sợi tóc ("far finer than tree roots") nên len lỏi được vào các lỗ rỗng cực nhỏ trong đất.',
        },
        {
          id: 'toefl-mock-4-q11',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Physics & Biology (Q11–Q17)',
          passage:
            'Most biological colors arise from chemical pigments such as melanin or carotenoids, which absorb certain wavelengths of light and reflect the rest. Yet if you grind a vibrant blue Morpho butterfly wing or a shimmering peacock feather into fine powder, the brilliant color vanishes—leaving only dull brownish dust. Unlike pigment hues, these metallic blues and greens come from structural coloration, produced not by chemistry alone but by microscopic physical architecture.\n\nUnder an electron microscope, Morpho butterfly wing scales display rows of Christmas-tree-shaped ridges spaced only a few hundred nanometers apart—roughly matching half the wavelength of blue light. When white sunlight hits these stacked transparent ribs, light waves bouncing off successive layers interfere with one another. Most red and yellow wavelengths cancel out through destructive interference, while blue waves reinforce one another via constructive interference, flashing an intense iridescent blue visible from hundreds of meters away.\n\nBecause structural color depends on geometric spacing rather than fragile organic dyes, it resists fading even across centuries in museum drawers—indeed, fossilized beetle shells fifty million years old still gleam green under laboratory lamps. Inspired by butterfly scales, materials scientists are now fabricating pigment-free automotive paints and counterfeit-proof banknotes whose colors never bleach under harsh ultraviolet sunlight.',
          question: 'What happens when a blue Morpho butterfly wing is ground into fine powder?',
          options: [
            'Its blue brilliance intensifies due to exposed pigments.',
            'It emits ultraviolet light inside dark museum drawers.',
            'It turns bright green like a fifty-million-year-old beetle.',
            'Its vivid blue disappears, leaving only dull brownish dust.',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 1 nêu rõ nếu nghiền cánh bướm Morpho thành bột mịn, màu xanh rực rỡ biến mất và chỉ còn bụi nâu xỉn vì cấu trúc nano bị phá vỡ.',
        },
        {
          id: 'toefl-mock-4-q12',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Physics & Biology (Q11–Q17)',
          passage:
            'Most biological colors arise from chemical pigments such as melanin or carotenoids, which absorb certain wavelengths of light and reflect the rest. Yet if you grind a vibrant blue Morpho butterfly wing or a shimmering peacock feather into fine powder, the brilliant color vanishes—leaving only dull brownish dust. Unlike pigment hues, these metallic blues and greens come from structural coloration, produced not by chemistry alone but by microscopic physical architecture.\n\nUnder an electron microscope, Morpho butterfly wing scales display rows of Christmas-tree-shaped ridges spaced only a few hundred nanometers apart—roughly matching half the wavelength of blue light. When white sunlight hits these stacked transparent ribs, light waves bouncing off successive layers interfere with one another. Most red and yellow wavelengths cancel out through destructive interference, while blue waves reinforce one another via constructive interference, flashing an intense iridescent blue visible from hundreds of meters away.\n\nBecause structural color depends on geometric spacing rather than fragile organic dyes, it resists fading even across centuries in museum drawers—indeed, fossilized beetle shells fifty million years old still gleam green under laboratory lamps. Inspired by butterfly scales, materials scientists are now fabricating pigment-free automotive paints and counterfeit-proof banknotes whose colors never bleach under harsh ultraviolet sunlight.',
          question: 'How do the nanometer-spaced ridges on Morpho scales produce bright blue color?',
          options: [
            'They secrete blue carotenoid fluid when warmed by sunlight.',
            'Stacked transparent ribs cause constructive interference of blue waves while canceling red and yellow waves.',
            'They absorb blue wavelengths completely and reflect only brown light.',
            'They spin rapidly to scatter white light evenly in all directions.',
          ],
          correctIdx: 1,
          explanation:
            'Các gờ nano xếp tầng gây giao thoa triệt tiêu bước sóng đỏ/vàng và giao thoa tăng cường bước sóng xanh lam.',
        },
        {
          id: 'toefl-mock-4-q13',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Physics & Biology (Q11–Q17)',
          passage:
            'Most biological colors arise from chemical pigments such as melanin or carotenoids, which absorb certain wavelengths of light and reflect the rest. Yet if you grind a vibrant blue Morpho butterfly wing or a shimmering peacock feather into fine powder, the brilliant color vanishes—leaving only dull brownish dust. Unlike pigment hues, these metallic blues and greens come from structural coloration, produced not by chemistry alone but by microscopic physical architecture.\n\nUnder an electron microscope, Morpho butterfly wing scales display rows of Christmas-tree-shaped ridges spaced only a few hundred nanometers apart—roughly matching half the wavelength of blue light. When white sunlight hits these stacked transparent ribs, light waves bouncing off successive layers interfere with one another. Most red and yellow wavelengths cancel out through destructive interference, while blue waves reinforce one another via constructive interference, flashing an intense iridescent blue visible from hundreds of meters away.\n\nBecause structural color depends on geometric spacing rather than fragile organic dyes, it resists fading even across centuries in museum drawers—indeed, fossilized beetle shells fifty million years old still gleam green under laboratory lamps. Inspired by butterfly scales, materials scientists are now fabricating pigment-free automotive paints and counterfeit-proof banknotes whose colors never bleach under harsh ultraviolet sunlight.',
          question: 'The word "vanishes" in paragraph 1 is closest in meaning to:',
          options: ['multiplies', 'stabilizes', 'disappears', 'hardens'],
          correctIdx: 2,
          explanation:
            '"The brilliant color vanishes" = màu sắc rực rỡ biến mất ("disappears").',
        },
        {
          id: 'toefl-mock-4-q14',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Physics & Biology (Q11–Q17)',
          passage:
            'Most biological colors arise from chemical pigments such as melanin or carotenoids, which absorb certain wavelengths of light and reflect the rest. Yet if you grind a vibrant blue Morpho butterfly wing or a shimmering peacock feather into fine powder, the brilliant color vanishes—leaving only dull brownish dust. Unlike pigment hues, these metallic blues and greens come from structural coloration, produced not by chemistry alone but by microscopic physical architecture.\n\nUnder an electron microscope, Morpho butterfly wing scales display rows of Christmas-tree-shaped ridges spaced only a few hundred nanometers apart—roughly matching half the wavelength of blue light. When white sunlight hits these stacked transparent ribs, light waves bouncing off successive layers interfere with one another. Most red and yellow wavelengths cancel out through destructive interference, while blue waves reinforce one another via constructive interference, flashing an intense iridescent blue visible from hundreds of meters away.\n\nBecause structural color depends on geometric spacing rather than fragile organic dyes, it resists fading even across centuries in museum drawers—indeed, fossilized beetle shells fifty million years old still gleam green under laboratory lamps. Inspired by butterfly scales, materials scientists are now fabricating pigment-free automotive paints and counterfeit-proof banknotes whose colors never bleach under harsh ultraviolet sunlight.',
          question: 'Why does the author mention fifty-million-year-old fossilized beetle shells in paragraph 3?',
          options: [
            'To demonstrate how remarkably durable structural coloration is over geological time',
            'To prove that ancient beetles lived alongside modern Morpho butterflies',
            'To show that chemical melanin survives longer than physical nanostructures',
            'To explain why museum lamps emit harmful ultraviolet radiation',
          ],
          correctIdx: 0,
          explanation:
            'Ví dụ vỏ bọ cánh cứng hóa thạch 50 triệu năm tuổi vẫn óng ánh xanh chứng minh màu cấu trúc bền vững hơn hẳn thuốc nhuộm hữu cơ dễ phai.',
        },
        {
          id: 'toefl-mock-4-q15',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Physics & Biology (Q11–Q17)',
          passage:
            'Most biological colors arise from chemical pigments such as melanin or carotenoids, which absorb certain wavelengths of light and reflect the rest. Yet if you grind a vibrant blue Morpho butterfly wing or a shimmering peacock feather into fine powder, the brilliant color vanishes—leaving only dull brownish dust. Unlike pigment hues, these metallic blues and greens come from structural coloration, produced not by chemistry alone but by microscopic physical architecture.\n\nUnder an electron microscope, Morpho butterfly wing scales display rows of Christmas-tree-shaped ridges spaced only a few hundred nanometers apart—roughly matching half the wavelength of blue light. When white sunlight hits these stacked transparent ribs, light waves bouncing off successive layers interfere with one another. Most red and yellow wavelengths cancel out through destructive interference, while blue waves reinforce one another via constructive interference, flashing an intense iridescent blue visible from hundreds of meters away.\n\nBecause structural color depends on geometric spacing rather than fragile organic dyes, it resists fading even across centuries in museum drawers—indeed, fossilized beetle shells fifty million years old still gleam green under laboratory lamps. Inspired by butterfly scales, materials scientists are now fabricating pigment-free automotive paints and counterfeit-proof banknotes whose colors never bleach under harsh ultraviolet sunlight.',
          question: 'What advantage do engineered structural paints offer over traditional pigment-based car paints?',
          options: [
            'They cost less because they are made from ground insect dust.',
            'They change color automatically whenever rain touches the metal.',
            'They contain extra melanin to protect banknotes from moisture.',
            'They do not fade or bleach under intense ultraviolet sunlight.',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 3 nêu sơn ô tô và tiền giấy chống giả mô phỏng màu cấu trúc không bị bạc màu dưới tia cực tím mạnh ("never bleach under harsh ultraviolet sunlight").',
        },
        {
          id: 'toefl-mock-4-q16',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Physics & Biology (Q11–Q17)',
          passage:
            'Most biological colors arise from chemical pigments such as melanin or carotenoids, which absorb certain wavelengths of light and reflect the rest. Yet if you grind a vibrant blue Morpho butterfly wing or a shimmering peacock feather into fine powder, the brilliant color vanishes—leaving only dull brownish dust. Unlike pigment hues, these metallic blues and greens come from structural coloration, produced not by chemistry alone but by microscopic physical architecture.\n\nUnder an electron microscope, Morpho butterfly wing scales display rows of Christmas-tree-shaped ridges spaced only a few hundred nanometers apart—roughly matching half the wavelength of blue light. When white sunlight hits these stacked transparent ribs, light waves bouncing off successive layers interfere with one another. Most red and yellow wavelengths cancel out through destructive interference, while blue waves reinforce one another via constructive interference, flashing an intense iridescent blue visible from hundreds of meters away.\n\nBecause structural color depends on geometric spacing rather than fragile organic dyes, it resists fading even across centuries in museum drawers—indeed, fossilized beetle shells fifty million years old still gleam green under laboratory lamps. Inspired by butterfly scales, materials scientists are now fabricating pigment-free automotive paints and counterfeit-proof banknotes whose colors never bleach under harsh ultraviolet sunlight.',
          question: 'In paragraph 3, the word "bleach" is closest in meaning to:',
          options: ['crack sharply', 'multiply rapidly', 'lose color and fade', 'melt from heat'],
          correctIdx: 2,
          explanation:
            '"Never bleach under harsh ultraviolet sunlight" = không bao giờ bị phai bạc màu dưới ánh nắng cực tím gay gắt.',
        },
        {
          id: 'toefl-mock-4-q17',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Physics & Biology (Q11–Q17)',
          passage:
            'Most biological colors arise from chemical pigments such as melanin or carotenoids, which absorb certain wavelengths of light and reflect the rest. Yet if you grind a vibrant blue Morpho butterfly wing or a shimmering peacock feather into fine powder, the brilliant color vanishes—leaving only dull brownish dust. Unlike pigment hues, these metallic blues and greens come from structural coloration, produced not by chemistry alone but by microscopic physical architecture.\n\nUnder an electron microscope, Morpho butterfly wing scales display rows of Christmas-tree-shaped ridges spaced only a few hundred nanometers apart—roughly matching half the wavelength of blue light. When white sunlight hits these stacked transparent ribs, light waves bouncing off successive layers interfere with one another. Most red and yellow wavelengths cancel out through destructive interference, while blue waves reinforce one another via constructive interference, flashing an intense iridescent blue visible from hundreds of meters away.\n\nBecause structural color depends on geometric spacing rather than fragile organic dyes, it resists fading even across centuries in museum drawers—indeed, fossilized beetle shells fifty million years old still gleam green under laboratory lamps. Inspired by butterfly scales, materials scientists are now fabricating pigment-free automotive paints and counterfeit-proof banknotes whose colors never bleach under harsh ultraviolet sunlight.',
          question: 'What can be inferred about a structurally colored feather if its microscopic spacing were compressed by half?',
          options: [
            'It would immediately release bright carotenoid dyes.',
            'It would reflect a different wavelength—or lose its original blue interference pattern.',
            'It would glow bright orange inside pitch-dark drawers.',
            'It would still flash the exact same blue from hundreds of meters away.',
          ],
          correctIdx: 1,
          explanation:
            'Màu cấu trúc phụ thuộc chính xác vào khoảng cách hình học cỡ nửa bước sóng ánh sáng xanh; nếu bị nén còn một nửa, giao thoa sẽ đổi bước sóng hoặc mất màu xanh ban đầu.',
        },
        {
          id: 'toefl-mock-4-q18',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Sociology & Urban Studies (Q18–Q23)',
          passage:
            'In 1989, urban sociologist Ray Oldenburg coined the term "third places" to describe welcoming public gathering spots separate from both home (the first place) and the workplace (the second place). Neighborhood cafés, community bookshops, barbershops, and public plazas serve as neutral ground where people of diverse ages and professions mingle casually without formal appointments or high membership fees.\n\nSociological surveys consistently link abundant third places to stronger neighborhood trust and civic resilience. When residents cross paths weekly over coffee or board games, weak social ties—acquaintances outside one’s immediate family—multiply naturally. During heat waves or power blackouts, neighborhoods anchored by active third places check on elderly neighbors faster and organize mutual aid more effectively than isolated bedroom suburbs.\n\nHowever, zoning regulations in many post-war suburban developments separated residential cul-de-sacs strictly from commercial strips, forcing residents to drive to regional shopping malls instead of walking to corner cafés. Combined with rising commercial rents that squeeze independent shops and the shift toward remote digital entertainment, sociologists warn that shrinking third places can heighten urban loneliness unless cities encourage mixed-use walkable neighborhoods.',
          question: 'According to paragraph 1, what defines a "third place" in Ray Oldenburg’s framework?',
          options: [
            'An informal, accessible public gathering space distinct from home and work',
            'A private members-only athletic club requiring formal appointments',
            'A quiet home office located inside a residential cul-de-sac',
            'A large regional highway connecting downtown offices to suburbs',
          ],
          correctIdx: 0,
          explanation:
            'Đoạn 1 định nghĩa "third places" là các điểm gặp gỡ công cộng thân thiện tách biệt với nhà ở (nơi thứ nhất) và công sở (nơi thứ hai), không cần hẹn trước hay phí cao.',
        },
        {
          id: 'toefl-mock-4-q19',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Sociology & Urban Studies (Q18–Q23)',
          passage:
            'In 1989, urban sociologist Ray Oldenburg coined the term "third places" to describe welcoming public gathering spots separate from both home (the first place) and the workplace (the second place). Neighborhood cafés, community bookshops, barbershops, and public plazas serve as neutral ground where people of diverse ages and professions mingle casually without formal appointments or high membership fees.\n\nSociological surveys consistently link abundant third places to stronger neighborhood trust and civic resilience. When residents cross paths weekly over coffee or board games, weak social ties—acquaintances outside one’s immediate family—multiply naturally. During heat waves or power blackouts, neighborhoods anchored by active third places check on elderly neighbors faster and organize mutual aid more effectively than isolated bedroom suburbs.\n\nHowever, zoning regulations in many post-war suburban developments separated residential cul-de-sacs strictly from commercial strips, forcing residents to drive to regional shopping malls instead of walking to corner cafés. Combined with rising commercial rents that squeeze independent shops and the shift toward remote digital entertainment, sociologists warn that shrinking third places can heighten urban loneliness unless cities encourage mixed-use walkable neighborhoods.',
          question: 'Why does the author mention "heat waves or power blackouts" in paragraph 2?',
          options: [
            'To argue that neighborhood cafés consume too much municipal electricity',
            'To show that elderly residents dislike visiting public plazas during summer',
            'To complain that regional shopping malls close early during storms',
            'To illustrate how social ties built in third places foster practical mutual aid during crises',
          ],
          correctIdx: 3,
          explanation:
            'Các sự cố như đợt nắng nóng hay mất điện minh họa sức chống chịu cộng đồng: khu phố có nhiều "third places" thăm hỏi người cao tuổi và hỗ trợ nhau nhanh hơn.',
        },
        {
          id: 'toefl-mock-4-q20',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Sociology & Urban Studies (Q18–Q23)',
          passage:
            'In 1989, urban sociologist Ray Oldenburg coined the term "third places" to describe welcoming public gathering spots separate from both home (the first place) and the workplace (the second place). Neighborhood cafés, community bookshops, barbershops, and public plazas serve as neutral ground where people of diverse ages and professions mingle casually without formal appointments or high membership fees.\n\nSociological surveys consistently link abundant third places to stronger neighborhood trust and civic resilience. When residents cross paths weekly over coffee or board games, weak social ties—acquaintances outside one’s immediate family—multiply naturally. During heat waves or power blackouts, neighborhoods anchored by active third places check on elderly neighbors faster and organize mutual aid more effectively than isolated bedroom suburbs.\n\nHowever, zoning regulations in many post-war suburban developments separated residential cul-de-sacs strictly from commercial strips, forcing residents to drive to regional shopping malls instead of walking to corner cafés. Combined with rising commercial rents that squeeze independent shops and the shift toward remote digital entertainment, sociologists warn that shrinking third places can heighten urban loneliness unless cities encourage mixed-use walkable neighborhoods.',
          question: 'The word "abundant" in paragraph 2 is closest in meaning to:',
          options: ['expensive', 'strictly regulated', 'plentiful', 'temporary'],
          correctIdx: 2,
          explanation:
            '"Abundant third places" = nhiều, dồi dào các không gian thứ ba ("plentiful").',
        },
        {
          id: 'toefl-mock-4-q21',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Sociology & Urban Studies (Q18–Q23)',
          passage:
            'In 1989, urban sociologist Ray Oldenburg coined the term "third places" to describe welcoming public gathering spots separate from both home (the first place) and the workplace (the second place). Neighborhood cafés, community bookshops, barbershops, and public plazas serve as neutral ground where people of diverse ages and professions mingle casually without formal appointments or high membership fees.\n\nSociological surveys consistently link abundant third places to stronger neighborhood trust and civic resilience. When residents cross paths weekly over coffee or board games, weak social ties—acquaintances outside one’s immediate family—multiply naturally. During heat waves or power blackouts, neighborhoods anchored by active third places check on elderly neighbors faster and organize mutual aid more effectively than isolated bedroom suburbs.\n\nHowever, zoning regulations in many post-war suburban developments separated residential cul-de-sacs strictly from commercial strips, forcing residents to drive to regional shopping malls instead of walking to corner cafés. Combined with rising commercial rents that squeeze independent shops and the shift toward remote digital entertainment, sociologists warn that shrinking third places can heighten urban loneliness unless cities encourage mixed-use walkable neighborhoods.',
          question: 'Which factor is NOT listed in paragraph 3 as threatening traditional third places?',
          options: [
            'Zoning laws separating homes from neighborhood retail',
            'Municipal rules banning public parks near libraries',
            'Rising commercial rents pressuring independent shops',
            'Increased reliance on remote digital entertainment',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn 3 nêu 3 nguyên nhân: quy hoạch tách biệt khu ở–thương mại, giá thuê mặt bằng tăng và giải trí số từ xa — không nhắc luật cấm công viên gần thư viện.',
        },
        {
          id: 'toefl-mock-4-q22',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Sociology & Urban Studies (Q18–Q23)',
          passage:
            'In 1989, urban sociologist Ray Oldenburg coined the term "third places" to describe welcoming public gathering spots separate from both home (the first place) and the workplace (the second place). Neighborhood cafés, community bookshops, barbershops, and public plazas serve as neutral ground where people of diverse ages and professions mingle casually without formal appointments or high membership fees.\n\nSociological surveys consistently link abundant third places to stronger neighborhood trust and civic resilience. When residents cross paths weekly over coffee or board games, weak social ties—acquaintances outside one’s immediate family—multiply naturally. During heat waves or power blackouts, neighborhoods anchored by active third places check on elderly neighbors faster and organize mutual aid more effectively than isolated bedroom suburbs.\n\nHowever, zoning regulations in many post-war suburban developments separated residential cul-de-sacs strictly from commercial strips, forcing residents to drive to regional shopping malls instead of walking to corner cafés. Combined with rising commercial rents that squeeze independent shops and the shift toward remote digital entertainment, sociologists warn that shrinking third places can heighten urban loneliness unless cities encourage mixed-use walkable neighborhoods.',
          question: 'What urban policy do sociologists recommend at the end of the passage to combat loneliness?',
          options: [
            'Encouraging mixed-use walkable neighborhoods',
            'Building wider highways toward regional shopping malls',
            'Requiring formal membership fees at public plazas',
            'Separating residential cul-de-sacs even farther from cafés',
          ],
          correctIdx: 0,
          explanation:
            'Câu cuối khuyến nghị các thành phố thúc đẩy khu dân cư hỗn hợp dễ đi bộ ("encourage mixed-use walkable neighborhoods").',
        },
        {
          id: 'toefl-mock-4-q23',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Sociology & Urban Studies (Q18–Q23)',
          passage:
            'In 1989, urban sociologist Ray Oldenburg coined the term "third places" to describe welcoming public gathering spots separate from both home (the first place) and the workplace (the second place). Neighborhood cafés, community bookshops, barbershops, and public plazas serve as neutral ground where people of diverse ages and professions mingle casually without formal appointments or high membership fees.\n\nSociological surveys consistently link abundant third places to stronger neighborhood trust and civic resilience. When residents cross paths weekly over coffee or board games, weak social ties—acquaintances outside one’s immediate family—multiply naturally. During heat waves or power blackouts, neighborhoods anchored by active third places check on elderly neighbors faster and organize mutual aid more effectively than isolated bedroom suburbs.\n\nHowever, zoning regulations in many post-war suburban developments separated residential cul-de-sacs strictly from commercial strips, forcing residents to drive to regional shopping malls instead of walking to corner cafés. Combined with rising commercial rents that squeeze independent shops and the shift toward remote digital entertainment, sociologists warn that shrinking third places can heighten urban loneliness unless cities encourage mixed-use walkable neighborhoods.',
          question: 'What are "weak social ties" as defined in paragraph 2?',
          options: [
            'Broken friendships caused by commercial rent increases',
            'Relatives living inside the same household',
            'Formal workplace supervisors who schedule meetings',
            'Casual acquaintances beyond one’s immediate family circle',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 2 giải thích ngay bằng dấu gạch ngang: "weak social ties—acquaintances outside one’s immediate family" (những người quen xã giao ngoài gia đình).',
        },
        {
          id: 'toefl-mock-4-q24',
          skill: 'grammar',
          partLabel: 'Academic Grammar & Parallelism (Q24)',
          question: 'Select the sentence demonstrating correct parallel structure and noun-clause usage:',
          options: [
            'Urban planners debate whether zoning reform encourages walking and reducing car reliance.',
            'Urban planners debate that does zoning reform encourage walking and reduce car reliance.',
            'Urban planners debate whether zoning reform encourages walking and reduces car reliance.',
            'Urban planners debate if zoning reform encouraging walking and to reduce car reliance.',
          ],
          correctIdx: 2,
          explanation:
            'C dùng đúng mệnh đề danh ngữ với "whether" và cấu trúc song song hai động từ chia ngôi thứ 3 số ít: "encourages walking and reduces car reliance".',
        },
        {
          id: 'toefl-mock-4-q25',
          skill: 'vocab',
          partLabel: 'Academic Vocabulary in Context (Q25)',
          question: 'In academic writing, which verb best replaces "disprove" when a lecturer presents evidence weakening a reading’s claim?',
          options: ['applaud', 'undermine', 'replicate', 'embrace'],
          correctIdx: 1,
          explanation:
            '"Undermine" (làm suy yếu, bác bỏ cơ sở lập luận) là động từ học thuật chuẩn mực trong TOEFL Integrated Writing.',
        },
      ],
    },

    {
      title: 'Mini Mock Test #5',
      description:
        'Đề thi thử 25 câu (30 phút): Study Abroad Scholarship Conversation, Bài giảng Kỹ thuật Vật liệu (Roman Marine Concrete), 2 bài đọc Học thuật (Hoàn lưu đại dương & Âm học đàn Stradivari) và Ngữ pháp.',
      durationMinutes: 30,
      questions: [
        {
          id: 'toefl-mock-5-q1',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Hi, Ms. Rivera, I’m putting together my application for the Summer French Immersion Scholarship in Montreal, and the checklist asks for an official language placement evaluation. Advisor: Glad you’re applying, Lucas—that program covers tuition plus housing! For the language evaluation, you don’t need to pay for an external exam; our Modern Languages Lab administers a twenty-minute oral and reading check every Tuesday and Thursday afternoon free of charge. Student: Great! Also, my passport expires in November, five months after the summer program ends in June. Do I need to renew it before applying? Advisor: Hold on—Canada requires a valid passport for the length of your stay, though several European scholarships require six months of extra validity beyond return dates. To be safe, since the Montreal program ends in late June, your November expiration gives you five months’ cushion, which is completely fine for Canada, so don’t delay your scholarship upload waiting for passport renewal.',
          question: 'Why does Lucas visit Ms. Rivera’s office?',
          options: [
            'To clarify application requirements for a summer French immersion scholarship in Montreal',
            'To ask for emergency funds to renew an already expired passport',
            'To appeal a low score on his Tuesday Modern Languages exam',
            'To withdraw from a European study-abroad program',
          ],
          correctIdx: 0,
          explanation:
            'Lucas đang hoàn tất hồ sơ xin học bổng học tiếng Pháp mùa hè ở Montreal và cần hỏi về giấy đánh giá trình độ ngôn ngữ và hạn hộ chiếu.',
        },
        {
          id: 'toefl-mock-5-q2',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Hi, Ms. Rivera, I’m putting together my application for the Summer French Immersion Scholarship in Montreal, and the checklist asks for an official language placement evaluation. Advisor: Glad you’re applying, Lucas—that program covers tuition plus housing! For the language evaluation, you don’t need to pay for an external exam; our Modern Languages Lab administers a twenty-minute oral and reading check every Tuesday and Thursday afternoon free of charge. Student: Great! Also, my passport expires in November, five months after the summer program ends in June. Do I need to renew it before applying? Advisor: Hold on—Canada requires a valid passport for the length of your stay, though several European scholarships require six months of extra validity beyond return dates. To be safe, since the Montreal program ends in late June, your November expiration gives you five months’ cushion, which is completely fine for Canada, so don’t delay your scholarship upload waiting for passport renewal.',
          question: 'How can Lucas obtain the required language placement evaluation?',
          options: [
            'By paying for a certified external French proficiency test downtown',
            'By submitting high school report cards from Montreal',
            'By taking a free twenty-minute assessment at the campus Modern Languages Lab',
            'By asking Ms. Rivera to interview him in French during advising hours',
          ],
          correctIdx: 2,
          explanation:
            'Phòng Modern Languages Lab tổ chức bài đánh giá nói và đọc 20 phút hoàn toàn miễn phí vào chiều thứ Ba và thứ Năm.',
        },
        {
          id: 'toefl-mock-5-q3',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Hi, Ms. Rivera, I’m putting together my application for the Summer French Immersion Scholarship in Montreal, and the checklist asks for an official language placement evaluation. Advisor: Glad you’re applying, Lucas—that program covers tuition plus housing! For the language evaluation, you don’t need to pay for an external exam; our Modern Languages Lab administers a twenty-minute oral and reading check every Tuesday and Thursday afternoon free of charge. Student: Great! Also, my passport expires in November, five months after the summer program ends in June. Do I need to renew it before applying? Advisor: Hold on—Canada requires a valid passport for the length of your stay, though several European scholarships require six months of extra validity beyond return dates. To be safe, since the Montreal program ends in late June, your November expiration gives you five months’ cushion, which is completely fine for Canada, so don’t delay your scholarship upload waiting for passport renewal.',
          question: 'Why does Ms. Rivera mention European scholarships during the conversation?',
          options: [
            'To convince Lucas to apply to Paris instead of Montreal',
            'To warn Lucas that Canada recently adopted a strict six-month cushion rule',
            'To explain why the Modern Languages Lab closes in November',
            'To contrast Europe’s stricter six-month passport validity rule with Canada’s simpler requirement',
          ],
          correctIdx: 3,
          explanation:
            'Cô Rivera đối chiếu quy định khắt khe hơn của một số học bổng châu Âu (cần hộ chiếu còn hạn ít nhất 6 tháng sau khi về) với Canada (chỉ cần còn hạn trong suốt thời gian lưu trú).',
        },
        {
          id: 'toefl-mock-5-q4',
          skill: 'listening',
          partLabel: 'Campus Conversation (Q1–Q4)',
          audioScript:
            'Student: Hi, Ms. Rivera, I’m putting together my application for the Summer French Immersion Scholarship in Montreal, and the checklist asks for an official language placement evaluation. Advisor: Glad you’re applying, Lucas—that program covers tuition plus housing! For the language evaluation, you don’t need to pay for an external exam; our Modern Languages Lab administers a twenty-minute oral and reading check every Tuesday and Thursday afternoon free of charge. Student: Great! Also, my passport expires in November, five months after the summer program ends in June. Do I need to renew it before applying? Advisor: Hold on—Canada requires a valid passport for the length of your stay, though several European scholarships require six months of extra validity beyond return dates. To be safe, since the Montreal program ends in late June, your November expiration gives you five months’ cushion, which is completely fine for Canada, so don’t delay your scholarship upload waiting for passport renewal.',
          question: 'What does Ms. Rivera advise Lucas to do regarding his November passport expiration?',
          options: [
            'Cancel his Tuesday lab evaluation until a new passport arrives',
            'Upload his scholarship application now rather than waiting to renew his passport',
            'Apply for a two-week passport extension in June',
            'Pay extra for overnight housing in Montreal',
          ],
          correctIdx: 1,
          explanation:
            'Cô khuyên Lucas đừng trì hoãn việc nộp hồ sơ học bổng để chờ gia hạn hộ chiếu vì hộ chiếu hết hạn tháng 11 là đủ điều kiện cho chuyến đi kết thúc cuối tháng 6 tại Canada.',
        },
        {
          id: 'toefl-mock-5-q5',
          skill: 'listening',
          partLabel: 'Academic Lecture: Materials Engineering (Q5–Q10)',
          audioScript:
            'Professor: Modern steel-reinforced concrete piers standing in ocean water often begin crumbling within fifty years as saltwater corrodes internal steel bars. Yet Roman breakwaters poured into Mediterranean harbors two thousand years ago still stand solid under crashing waves! How did Roman builders outperform modern concrete? For decades, engineers credited volcanic ash—called pozzolana—harvested near Mount Vesuvius, which Romans mixed with lime and seawater. When seawater percolated into tiny cracks, chemical reactions between volcanic ash and lime grew interlocking mineral crystals called aluminous tobermorite, actually strengthening the concrete over time! Recently, however, materials scientists using electron microprobes uncovered a second secret: tiny white flecks of quicklime trapped inside ancient Roman blocks. Rather than sloppy mixing, researchers realized Romans employed "hot mixing"—blending quicklime directly with dry ash and water at high temperatures. Whenever rainwater or seawater later opens a hairline fracture, those trapped lime pockets dissolve and recrystallize inside the crack, sealing damage automatically in a natural self-healing cycle!',
          question: 'What engineering puzzle introduces the professor’s lecture?',
          options: [
            'Why modern steel bars cost more than Mount Vesuvius limestone',
            'Why Mediterranean waves are gentler than Atlantic tides',
            'Why ancient Roman sea walls rusted inside underwater harbors',
            'How Roman marine concrete outlasted modern ocean concrete by nearly two millennia',
          ],
          correctIdx: 3,
          explanation:
            'Mở bài giảng đặt câu hỏi: bê tông cốt thép hiện đại xuống cấp sau ~50 năm ngâm nước biển, tại sao đê chắn sóng La Mã 2.000 năm tuổi vẫn vững chãi?',
        },
        {
          id: 'toefl-mock-5-q6',
          skill: 'listening',
          partLabel: 'Academic Lecture: Materials Engineering (Q5–Q10)',
          audioScript:
            'Professor: Modern steel-reinforced concrete piers standing in ocean water often begin crumbling within fifty years as saltwater corrodes internal steel bars. Yet Roman breakwaters poured into Mediterranean harbors two thousand years ago still stand solid under crashing waves! How did Roman builders outperform modern concrete? For decades, engineers credited volcanic ash—called pozzolana—harvested near Mount Vesuvius, which Romans mixed with lime and seawater. When seawater percolated into tiny cracks, chemical reactions between volcanic ash and lime grew interlocking mineral crystals called aluminous tobermorite, actually strengthening the concrete over time! Recently, however, materials scientists using electron microprobes uncovered a second secret: tiny white flecks of quicklime trapped inside ancient Roman blocks. Rather than sloppy mixing, researchers realized Romans employed "hot mixing"—blending quicklime directly with dry ash and water at high temperatures. Whenever rainwater or seawater later opens a hairline fracture, those trapped lime pockets dissolve and recrystallize inside the crack, sealing damage automatically in a natural self-healing cycle!',
          question: 'Why do modern marine concrete structures frequently crumble within fifty years?',
          options: [
            'Volcanic ash dissolves rapidly in cold Mediterranean currents.',
            'Saltwater penetrates the concrete and corrodes internal steel reinforcement bars.',
            'Modern builders use too much quicklime during hot mixing.',
            'Aluminous tobermorite crystals push concrete blocks apart.',
          ],
          correctIdx: 1,
          explanation:
            'Nước biển thấm vào làm ăn mòn các thanh cốt thép bên trong ("saltwater corrodes internal steel bars") khiến bê tông hiện đại nứt vỡ.',
        },
        {
          id: 'toefl-mock-5-q7',
          skill: 'listening',
          partLabel: 'Academic Lecture: Materials Engineering (Q5–Q10)',
          audioScript:
            'Professor: Modern steel-reinforced concrete piers standing in ocean water often begin crumbling within fifty years as saltwater corrodes internal steel bars. Yet Roman breakwaters poured into Mediterranean harbors two thousand years ago still stand solid under crashing waves! How did Roman builders outperform modern concrete? For decades, engineers credited volcanic ash—called pozzolana—harvested near Mount Vesuvius, which Romans mixed with lime and seawater. When seawater percolated into tiny cracks, chemical reactions between volcanic ash and lime grew interlocking mineral crystals called aluminous tobermorite, actually strengthening the concrete over time! Recently, however, materials scientists using electron microprobes uncovered a second secret: tiny white flecks of quicklime trapped inside ancient Roman blocks. Rather than sloppy mixing, researchers realized Romans employed "hot mixing"—blending quicklime directly with dry ash and water at high temperatures. Whenever rainwater or seawater later opens a hairline fracture, those trapped lime pockets dissolve and recrystallize inside the crack, sealing damage automatically in a natural self-healing cycle!',
          question: 'What role does aluminous tobermorite play inside Roman marine concrete?',
          options: [
            'Its interlocking mineral crystals form when seawater enters pores, reinforcing the concrete.',
            'It prevents volcanic ash from reacting with Mediterranean waves.',
            'It melts quicklime flecks before construction crews pour the pier.',
            'It coats modern steel bars to block rainwater from entering.',
          ],
          correctIdx: 0,
          explanation:
            'Khi nước biển thấm qua vết nứt nhỏ, tro núi lửa và vôi phản ứng tạo tinh thể khoáng đan xen (aluminous tobermorite) làm khối bê tông ngày càng bền chắc.',
        },
        {
          id: 'toefl-mock-5-q8',
          skill: 'listening',
          partLabel: 'Academic Lecture: Materials Engineering (Q5–Q10)',
          audioScript:
            'Professor: Modern steel-reinforced concrete piers standing in ocean water often begin crumbling within fifty years as saltwater corrodes internal steel bars. Yet Roman breakwaters poured into Mediterranean harbors two thousand years ago still stand solid under crashing waves! How did Roman builders outperform modern concrete? For decades, engineers credited volcanic ash—called pozzolana—harvested near Mount Vesuvius, which Romans mixed with lime and seawater. When seawater percolated into tiny cracks, chemical reactions between volcanic ash and lime grew interlocking mineral crystals called aluminous tobermorite, actually strengthening the concrete over time! Recently, however, materials scientists using electron microprobes uncovered a second secret: tiny white flecks of quicklime trapped inside ancient Roman blocks. Rather than sloppy mixing, researchers realized Romans employed "hot mixing"—blending quicklime directly with dry ash and water at high temperatures. Whenever rainwater or seawater later opens a hairline fracture, those trapped lime pockets dissolve and recrystallize inside the crack, sealing damage automatically in a natural self-healing cycle!',
          question: 'How did researchers’ interpretation of tiny white lime flecks inside Roman concrete change?',
          options: [
            'They realized the flecks were fossilized seashells washed ashore.',
            'They concluded ancient slaves accidentally dropped chalk into molds.',
            'They recognized the flecks as intentional remnants of "hot mixing" that enable self-healing.',
            'They proved quicklime weakened harbor walls near Mount Vesuvius.',
          ],
          correctIdx: 2,
          explanation:
            'Thay vì coi là trộn ẩu ("sloppy mixing"), các nhà khoa học nhận ra các đốm vôi sống là kết quả có chủ đích của kỹ thuật trộn nóng ("hot mixing").',
        },
        {
          id: 'toefl-mock-5-q9',
          skill: 'listening',
          partLabel: 'Academic Lecture: Materials Engineering (Q5–Q10)',
          audioScript:
            'Professor: Modern steel-reinforced concrete piers standing in ocean water often begin crumbling within fifty years as saltwater corrodes internal steel bars. Yet Roman breakwaters poured into Mediterranean harbors two thousand years ago still stand solid under crashing waves! How did Roman builders outperform modern concrete? For decades, engineers credited volcanic ash—called pozzolana—harvested near Mount Vesuvius, which Romans mixed with lime and seawater. When seawater percolated into tiny cracks, chemical reactions between volcanic ash and lime grew interlocking mineral crystals called aluminous tobermorite, actually strengthening the concrete over time! Recently, however, materials scientists using electron microprobes uncovered a second secret: tiny white flecks of quicklime trapped inside ancient Roman blocks. Rather than sloppy mixing, researchers realized Romans employed "hot mixing"—blending quicklime directly with dry ash and water at high temperatures. Whenever rainwater or seawater later opens a hairline fracture, those trapped lime pockets dissolve and recrystallize inside the crack, sealing damage automatically in a natural self-healing cycle!',
          question: 'How does the self-healing cycle described at the end of the lecture work?',
          options: [
            'Divers manually pack fresh Vesuvius ash into underwater seams each decade.',
            'High temperatures from sunlight melt volcanic sand across the pier surface.',
            'Rusting iron rods expand to squeeze tiny hairline gaps shut.',
            'Water entering a crack dissolves trapped lime pockets, which recrystallize to seal the gap.',
          ],
          correctIdx: 3,
          explanation:
            'Khi nước mưa hoặc nước biển lọt vào khe nứt nhỏ, các túi vôi bị giữ lại sẽ hòa tan rồi kết tinh lại lấp kín vết nứt.',
        },
        {
          id: 'toefl-mock-5-q10',
          skill: 'listening',
          partLabel: 'Academic Lecture: Materials Engineering (Q5–Q10)',
          audioScript:
            'Professor: Modern steel-reinforced concrete piers standing in ocean water often begin crumbling within fifty years as saltwater corrodes internal steel bars. Yet Roman breakwaters poured into Mediterranean harbors two thousand years ago still stand solid under crashing waves! How did Roman builders outperform modern concrete? For decades, engineers credited volcanic ash—called pozzolana—harvested near Mount Vesuvius, which Romans mixed with lime and seawater. When seawater percolated into tiny cracks, chemical reactions between volcanic ash and lime grew interlocking mineral crystals called aluminous tobermorite, actually strengthening the concrete over time! Recently, however, materials scientists using electron microprobes uncovered a second secret: tiny white flecks of quicklime trapped inside ancient Roman blocks. Rather than sloppy mixing, researchers realized Romans employed "hot mixing"—blending quicklime directly with dry ash and water at high temperatures. Whenever rainwater or seawater later opens a hairline fracture, those trapped lime pockets dissolve and recrystallize inside the crack, sealing damage automatically in a natural self-healing cycle!',
          question: 'What scientific instrument helped uncover the quicklime flecks inside Roman concrete?',
          options: [
            'High-altitude satellite radar',
            'Electron microprobes',
            'Underwater sonar scanners',
            'Seismic wave detectors',
          ],
          correctIdx: 1,
          explanation:
            'Giáo sư nêu rõ các nhà khoa học vật liệu dùng đầu dò vi điện tử ("electron microprobes") để phát hiện bí mật thứ hai này.',
        },
        {
          id: 'toefl-mock-5-q11',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Oceanography (Q11–Q17)',
          passage:
            'Far beneath wind-driven surface waves, a slow planetary conveyor belt moves colossal volumes of water across every ocean basin. Known as thermohaline circulation—from "thermo" (temperature) and "haline" (salt content)—this deep circulation is powered by subtle differences in seawater density. Cold water is denser than warm water, and salty water is denser than fresh water.\n\nIn the high latitudes of the North Atlantic, warm currents flowing northward from the tropics release immense heat into the winter air, keeping western Europe noticeably milder than regions at matching latitudes in Canada. As surface water cools and sea ice freezes—leaving behind extra salt in the remaining liquid—that cold, hyper-saline water grows heavy enough to plunge kilometers downward toward the abyssal seafloor. Flowing southward past Antarctica and rising gradually in the Pacific and Indian Oceans, the water completes a global circuit roughly every thousand years.\n\nPaleoclimate records extracted from deep-sea sediments show that thermohaline circulation has not always run at a steady pace. During periods when rapid melting of continental ice sheets dumped vast floods of fresh meltwater into the North Atlantic, surface salinity dropped sharply. Less dense water refused to sink, temporarily slowing the oceanic heat conveyor and triggering abrupt cooling shifts across northern Europe.',
          question: 'What primary physical force drives thermohaline circulation according to paragraph 1?',
          options: [
            'Variations in seawater density caused by temperature and salinity differences',
            'Trade winds blowing continuously across the Indian Ocean',
            'Gravitational tides pulling abyssal water toward the equator',
            'Underwater volcanic vents heating the North Atlantic seafloor',
          ],
          correctIdx: 0,
          explanation:
            'Đoạn 1 nêu hoàn lưu nhiệt-muối được thúc đẩy bởi sự chênh lệch mật độ (tỷ trọng) nước biển do nhiệt độ ("thermo") và độ mặn ("haline").',
        },
        {
          id: 'toefl-mock-5-q12',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Oceanography (Q11–Q17)',
          passage:
            'Far beneath wind-driven surface waves, a slow planetary conveyor belt moves colossal volumes of water across every ocean basin. Known as thermohaline circulation—from "thermo" (temperature) and "haline" (salt content)—this deep circulation is powered by subtle differences in seawater density. Cold water is denser than warm water, and salty water is denser than fresh water.\n\nIn the high latitudes of the North Atlantic, warm currents flowing northward from the tropics release immense heat into the winter air, keeping western Europe noticeably milder than regions at matching latitudes in Canada. As surface water cools and sea ice freezes—leaving behind extra salt in the remaining liquid—that cold, hyper-saline water grows heavy enough to plunge kilometers downward toward the abyssal seafloor. Flowing southward past Antarctica and rising gradually in the Pacific and Indian Oceans, the water completes a global circuit roughly every thousand years.\n\nPaleoclimate records extracted from deep-sea sediments show that thermohaline circulation has not always run at a steady pace. During periods when rapid melting of continental ice sheets dumped vast floods of fresh meltwater into the North Atlantic, surface salinity dropped sharply. Less dense water refused to sink, temporarily slowing the oceanic heat conveyor and triggering abrupt cooling shifts across northern Europe.',
          question: 'Why does sea-ice formation in the North Atlantic increase the density of surrounding seawater?',
          options: [
            'Freezing ice heats tropical currents moving northward.',
            'Ice crystals pull heavy sand from the abyssal seafloor.',
            'Freezing excludes salt, leaving the remaining cold water extra salty and heavy.',
            'Sea ice blocks winds from mixing Pacific and Indian Ocean currents.',
          ],
          correctIdx: 2,
          explanation:
            'Đoạn 2 giải thích khi băng biển đóng băng, muối bị đẩy lại vào phần nước lỏng xung quanh khiến nước vừa lạnh vừa cực mặn nên chìm sâu xuống đáy.',
        },
        {
          id: 'toefl-mock-5-q13',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Oceanography (Q11–Q17)',
          passage:
            'Far beneath wind-driven surface waves, a slow planetary conveyor belt moves colossal volumes of water across every ocean basin. Known as thermohaline circulation—from "thermo" (temperature) and "haline" (salt content)—this deep circulation is powered by subtle differences in seawater density. Cold water is denser than warm water, and salty water is denser than fresh water.\n\nIn the high latitudes of the North Atlantic, warm currents flowing northward from the tropics release immense heat into the winter air, keeping western Europe noticeably milder than regions at matching latitudes in Canada. As surface water cools and sea ice freezes—leaving behind extra salt in the remaining liquid—that cold, hyper-saline water grows heavy enough to plunge kilometers downward toward the abyssal seafloor. Flowing southward past Antarctica and rising gradually in the Pacific and Indian Oceans, the water completes a global circuit roughly every thousand years.\n\nPaleoclimate records extracted from deep-sea sediments show that thermohaline circulation has not always run at a steady pace. During periods when rapid melting of continental ice sheets dumped vast floods of fresh meltwater into the North Atlantic, surface salinity dropped sharply. Less dense water refused to sink, temporarily slowing the oceanic heat conveyor and triggering abrupt cooling shifts across northern Europe.',
          question: 'Why does the author compare western Europe with Canada in paragraph 2?',
          options: [
            'To prove that Canada receives more winter rainfall than Europe',
            'To argue that Pacific currents flow faster than Atlantic currents',
            'To show that sea ice forms earlier in Europe than in Canada',
            'To illustrate how northward oceanic heat transport keeps Europe’s climate milder at similar latitudes',
          ],
          correctIdx: 3,
          explanation:
            'So sánh Tây Âu với các vùng cùng vĩ độ ở Canada làm rõ vai trò sưởi ấm khí hậu mùa đông của dòng hải lưu nóng Bắc Đại Tây Dương.',
        },
        {
          id: 'toefl-mock-5-q14',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Oceanography (Q11–Q17)',
          passage:
            'Far beneath wind-driven surface waves, a slow planetary conveyor belt moves colossal volumes of water across every ocean basin. Known as thermohaline circulation—from "thermo" (temperature) and "haline" (salt content)—this deep circulation is powered by subtle differences in seawater density. Cold water is denser than warm water, and salty water is denser than fresh water.\n\nIn the high latitudes of the North Atlantic, warm currents flowing northward from the tropics release immense heat into the winter air, keeping western Europe noticeably milder than regions at matching latitudes in Canada. As surface water cools and sea ice freezes—leaving behind extra salt in the remaining liquid—that cold, hyper-saline water grows heavy enough to plunge kilometers downward toward the abyssal seafloor. Flowing southward past Antarctica and rising gradually in the Pacific and Indian Oceans, the water completes a global circuit roughly every thousand years.\n\nPaleoclimate records extracted from deep-sea sediments show that thermohaline circulation has not always run at a steady pace. During periods when rapid melting of continental ice sheets dumped vast floods of fresh meltwater into the North Atlantic, surface salinity dropped sharply. Less dense water refused to sink, temporarily slowing the oceanic heat conveyor and triggering abrupt cooling shifts across northern Europe.',
          question: 'The word "abrupt" in paragraph 3 is closest in meaning to:',
          options: ['predictable', 'gradual', 'sudden', 'minor'],
          correctIdx: 2,
          explanation:
            '"Abrupt cooling shifts" = những đợt chuyển lạnh đột ngột ("sudden").',
        },
        {
          id: 'toefl-mock-5-q15',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Oceanography (Q11–Q17)',
          passage:
            'Far beneath wind-driven surface waves, a slow planetary conveyor belt moves colossal volumes of water across every ocean basin. Known as thermohaline circulation—from "thermo" (temperature) and "haline" (salt content)—this deep circulation is powered by subtle differences in seawater density. Cold water is denser than warm water, and salty water is denser than fresh water.\n\nIn the high latitudes of the North Atlantic, warm currents flowing northward from the tropics release immense heat into the winter air, keeping western Europe noticeably milder than regions at matching latitudes in Canada. As surface water cools and sea ice freezes—leaving behind extra salt in the remaining liquid—that cold, hyper-saline water grows heavy enough to plunge kilometers downward toward the abyssal seafloor. Flowing southward past Antarctica and rising gradually in the Pacific and Indian Oceans, the water completes a global circuit roughly every thousand years.\n\nPaleoclimate records extracted from deep-sea sediments show that thermohaline circulation has not always run at a steady pace. During periods when rapid melting of continental ice sheets dumped vast floods of fresh meltwater into the North Atlantic, surface salinity dropped sharply. Less dense water refused to sink, temporarily slowing the oceanic heat conveyor and triggering abrupt cooling shifts across northern Europe.',
          question: 'How did massive inflows of fresh glacial meltwater affect northern Europe in the past?',
          options: [
            'They diluted North Atlantic salinity, slowing deep sinking and cooling northern Europe.',
            'They doubled the speed of tropical currents rising toward Britain.',
            'They turned Pacific Ocean water into hyper-saline ice sheets.',
            'They permanently halted all wind-driven surface waves worldwide.',
          ],
          correctIdx: 0,
          explanation:
            'Lượng nước ngọt băng tan làm giảm mạnh độ mặn bề mặt Bắc Đại Tây Dương, nước nhẹ đi không chìm được nên làm chậm băng chuyền tải nhiệt và gây lạnh đột ngột ở Bắc Âu.',
        },
        {
          id: 'toefl-mock-5-q16',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Oceanography (Q11–Q17)',
          passage:
            'Far beneath wind-driven surface waves, a slow planetary conveyor belt moves colossal volumes of water across every ocean basin. Known as thermohaline circulation—from "thermo" (temperature) and "haline" (salt content)—this deep circulation is powered by subtle differences in seawater density. Cold water is denser than warm water, and salty water is denser than fresh water.\n\nIn the high latitudes of the North Atlantic, warm currents flowing northward from the tropics release immense heat into the winter air, keeping western Europe noticeably milder than regions at matching latitudes in Canada. As surface water cools and sea ice freezes—leaving behind extra salt in the remaining liquid—that cold, hyper-saline water grows heavy enough to plunge kilometers downward toward the abyssal seafloor. Flowing southward past Antarctica and rising gradually in the Pacific and Indian Oceans, the water completes a global circuit roughly every thousand years.\n\nPaleoclimate records extracted from deep-sea sediments show that thermohaline circulation has not always run at a steady pace. During periods when rapid melting of continental ice sheets dumped vast floods of fresh meltwater into the North Atlantic, surface salinity dropped sharply. Less dense water refused to sink, temporarily slowing the oceanic heat conveyor and triggering abrupt cooling shifts across northern Europe.',
          question: 'Approximately how long does a complete global thermohaline circuit take?',
          options: ['About ten days', 'About five winters', 'Roughly one hundred years', 'Roughly one thousand years'],
          correctIdx: 3,
          explanation:
            'Đoạn 2 nêu rõ: "completes a global circuit roughly every thousand years".',
        },
        {
          id: 'toefl-mock-5-q17',
          skill: 'reading',
          partLabel: 'Academic Reading 1: Oceanography (Q11–Q17)',
          passage:
            'Far beneath wind-driven surface waves, a slow planetary conveyor belt moves colossal volumes of water across every ocean basin. Known as thermohaline circulation—from "thermo" (temperature) and "haline" (salt content)—this deep circulation is powered by subtle differences in seawater density. Cold water is denser than warm water, and salty water is denser than fresh water.\n\nIn the high latitudes of the North Atlantic, warm currents flowing northward from the tropics release immense heat into the winter air, keeping western Europe noticeably milder than regions at matching latitudes in Canada. As surface water cools and sea ice freezes—leaving behind extra salt in the remaining liquid—that cold, hyper-saline water grows heavy enough to plunge kilometers downward toward the abyssal seafloor. Flowing southward past Antarctica and rising gradually in the Pacific and Indian Oceans, the water completes a global circuit roughly every thousand years.\n\nPaleoclimate records extracted from deep-sea sediments show that thermohaline circulation has not always run at a steady pace. During periods when rapid melting of continental ice sheets dumped vast floods of fresh meltwater into the North Atlantic, surface salinity dropped sharply. Less dense water refused to sink, temporarily slowing the oceanic heat conveyor and triggering abrupt cooling shifts across northern Europe.',
          question: 'Which statement about thermohaline circulation is NOT supported by the passage?',
          options: [
            'Deep water rises gradually back toward the surface in the Pacific and Indian Oceans.',
            'Warm water carries greater density than freezing hyper-saline water.',
            'Deep-sea sediment records reveal historical fluctuations in circulation speed.',
            'Surface currents in the North Atlantic lose warmth to winter air.',
          ],
          correctIdx: 1,
          explanation:
            'Ngược lại, đoạn 1 khẳng định nước lạnh đặc hơn nước ấm và nước mặn đặc hơn nước ngọt ("Cold water is denser than warm water").',
        },
        {
          id: 'toefl-mock-5-q18',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Music & Acoustics (Q18–Q23)',
          passage:
            'For three centuries, violinists have revered instruments crafted in Cremona, Italy, by Antonio Stradivari between 1680 and 1737, attributing their unmatched projection and warm overtones to lost workshop secrets. Early hypotheses pointed to Stradivari’s translucent oil varnish or timber harvested from Alpine spruce trees that grew slowly during Europe’s "Little Ice Age," yielding exceptionally tight, uniform annual growth rings.\n\nTo test whether modern ears actually prefer seventeenth-century violins over top contemporary instruments, acoustician Claudia Fritz organized rigorous double-blind listening trials in Paris and New York. Concert violinists wearing dark welder’s goggles—preventing them from recognizing famous antique labels or varnish patterns—played both Stradivarius violins and newly constructed master instruments inside concert halls while expert audiences scored sound quality.\n\nSurprisingly, soloists and listeners alike slightly favored modern violins for projection and clarity, and players could not tell old from new reliably by sound alone. Still, chemical analyses confirm Stradivari treated his wood with mineral salts—including borax, zinc, and alum—to deter wood-boring beetles, subtly altering wood stiffness. While the mystique of Stradivarius remains partly psychological, unraveling those antique preservation recipes continues guiding modern luthiers.',
          question: 'What early natural explanation did researchers propose for the acoustic quality of Stradivarius violins?',
          options: [
            'Stradivari coated his spruce wood with synthetic plastic varnish.',
            'Slow-growing Alpine spruce from the Little Ice Age produced tight, uniform wood rings.',
            'Cremona concert halls amplified antique violins with hidden marble walls.',
            'Wood-boring beetles carved microscopic sound channels inside the bridge.',
          ],
          correctIdx: 1,
          explanation:
            'Đoạn 1 nêu giả thuyết ban đầu cho rằng gỗ vân sam vùng Alps sinh trưởng chậm thời Tiểu Băng Hà có vòng năm khít và đồng đều đặc biệt.',
        },
        {
          id: 'toefl-mock-5-q19',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Music & Acoustics (Q18–Q23)',
          passage:
            'For three centuries, violinists have revered instruments crafted in Cremona, Italy, by Antonio Stradivari between 1680 and 1737, attributing their unmatched projection and warm overtones to lost workshop secrets. Early hypotheses pointed to Stradivari’s translucent oil varnish or timber harvested from Alpine spruce trees that grew slowly during Europe’s "Little Ice Age," yielding exceptionally tight, uniform annual growth rings.\n\nTo test whether modern ears actually prefer seventeenth-century violins over top contemporary instruments, acoustician Claudia Fritz organized rigorous double-blind listening trials in Paris and New York. Concert violinists wearing dark welder’s goggles—preventing them from recognizing famous antique labels or varnish patterns—played both Stradivarius violins and newly constructed master instruments inside concert halls while expert audiences scored sound quality.\n\nSurprisingly, soloists and listeners alike slightly favored modern violins for projection and clarity, and players could not tell old from new reliably by sound alone. Still, chemical analyses confirm Stradivari treated his wood with mineral salts—including borax, zinc, and alum—to deter wood-boring beetles, subtly altering wood stiffness. While the mystique of Stradivarius remains partly psychological, unraveling those antique preservation recipes continues guiding modern luthiers.',
          question: 'Why did performers in Claudia Fritz’s experiments wear dark welder’s goggles?',
          options: [
            'To keep them from visually recognizing antique labels or varnish and biasing their judgments',
            'To protect their eyes from bright ultraviolet lamps on the Paris stage',
            'To test whether blindfolded violinists play louder than audiences expect',
            'To hide the performers’ facial expressions from the expert listeners',
          ],
          correctIdx: 0,
          explanation:
            'Đeo kính hàn tối màu giúp nghệ sĩ không nhìn thấy nhãn cổ hay hoa văn vecni quen thuộc, đảm bảo thử nghiệm mù đôi khách quan.',
        },
        {
          id: 'toefl-mock-5-q20',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Music & Acoustics (Q18–Q23)',
          passage:
            'For three centuries, violinists have revered instruments crafted in Cremona, Italy, by Antonio Stradivari between 1680 and 1737, attributing their unmatched projection and warm overtones to lost workshop secrets. Early hypotheses pointed to Stradivari’s translucent oil varnish or timber harvested from Alpine spruce trees that grew slowly during Europe’s "Little Ice Age," yielding exceptionally tight, uniform annual growth rings.\n\nTo test whether modern ears actually prefer seventeenth-century violins over top contemporary instruments, acoustician Claudia Fritz organized rigorous double-blind listening trials in Paris and New York. Concert violinists wearing dark welder’s goggles—preventing them from recognizing famous antique labels or varnish patterns—played both Stradivarius violins and newly constructed master instruments inside concert halls while expert audiences scored sound quality.\n\nSurprisingly, soloists and listeners alike slightly favored modern violins for projection and clarity, and players could not tell old from new reliably by sound alone. Still, chemical analyses confirm Stradivari treated his wood with mineral salts—including borax, zinc, and alum—to deter wood-boring beetles, subtly altering wood stiffness. While the mystique of Stradivarius remains partly psychological, unraveling those antique preservation recipes continues guiding modern luthiers.',
          question: 'What surprising outcome emerged from the Paris and New York listening trials?',
          options: [
            'Audiences unanimously identified every Stradivarius within five seconds.',
            'Antique instruments projected twice as loudly as contemporary violins.',
            'Goggles made soloists unable to play Alpine spruce instruments.',
            'Both soloists and listeners slightly preferred modern violins and failed to reliably distinguish old from new.',
          ],
          correctIdx: 3,
          explanation:
            'Đoạn 3 ghi nhận cả nghệ sĩ độc tấu lẫn khán giả đều hơi nghiêng về đàn hiện đại về độ vang/độ rõ, và người chơi không phân biệt chắc chắn được đàn cũ hay mới chỉ qua âm thanh.',
        },
        {
          id: 'toefl-mock-5-q21',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Music & Acoustics (Q18–Q23)',
          passage:
            'For three centuries, violinists have revered instruments crafted in Cremona, Italy, by Antonio Stradivari between 1680 and 1737, attributing their unmatched projection and warm overtones to lost workshop secrets. Early hypotheses pointed to Stradivari’s translucent oil varnish or timber harvested from Alpine spruce trees that grew slowly during Europe’s "Little Ice Age," yielding exceptionally tight, uniform annual growth rings.\n\nTo test whether modern ears actually prefer seventeenth-century violins over top contemporary instruments, acoustician Claudia Fritz organized rigorous double-blind listening trials in Paris and New York. Concert violinists wearing dark welder’s goggles—preventing them from recognizing famous antique labels or varnish patterns—played both Stradivarius violins and newly constructed master instruments inside concert halls while expert audiences scored sound quality.\n\nSurprisingly, soloists and listeners alike slightly favored modern violins for projection and clarity, and players could not tell old from new reliably by sound alone. Still, chemical analyses confirm Stradivari treated his wood with mineral salts—including borax, zinc, and alum—to deter wood-boring beetles, subtly altering wood stiffness. While the mystique of Stradivarius remains partly psychological, unraveling those antique preservation recipes continues guiding modern luthiers.',
          question: 'Why did Stradivari originally apply mineral salts like borax and alum to his violin wood?',
          options: [
            'To imitate the golden color of Italian oil varnish',
            'To soften Alpine spruce rings before carving',
            'To protect the timber from wood-boring beetles',
            'To make old violins heavier than modern master instruments',
          ],
          correctIdx: 2,
          explanation:
            'Phân tích hóa học cho thấy Stradivari xử lý gỗ bằng muối khoáng để chống mọt gỗ ("to deter wood-boring beetles"), vô tình làm thay đổi nhẹ độ cứng của gỗ.',
        },
        {
          id: 'toefl-mock-5-q22',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Music & Acoustics (Q18–Q23)',
          passage:
            'For three centuries, violinists have revered instruments crafted in Cremona, Italy, by Antonio Stradivari between 1680 and 1737, attributing their unmatched projection and warm overtones to lost workshop secrets. Early hypotheses pointed to Stradivari’s translucent oil varnish or timber harvested from Alpine spruce trees that grew slowly during Europe’s "Little Ice Age," yielding exceptionally tight, uniform annual growth rings.\n\nTo test whether modern ears actually prefer seventeenth-century violins over top contemporary instruments, acoustician Claudia Fritz organized rigorous double-blind listening trials in Paris and New York. Concert violinists wearing dark welder’s goggles—preventing them from recognizing famous antique labels or varnish patterns—played both Stradivarius violins and newly constructed master instruments inside concert halls while expert audiences scored sound quality.\n\nSurprisingly, soloists and listeners alike slightly favored modern violins for projection and clarity, and players could not tell old from new reliably by sound alone. Still, chemical analyses confirm Stradivari treated his wood with mineral salts—including borax, zinc, and alum—to deter wood-boring beetles, subtly altering wood stiffness. While the mystique of Stradivarius remains partly psychological, unraveling those antique preservation recipes continues guiding modern luthiers.',
          question: 'The word "revered" in paragraph 1 is closest in meaning to:',
          options: ['ignored', 'deeply admired', 'imitated cheaply', 'criticized harshly'],
          correctIdx: 1,
          explanation:
            '"Violinists have revered instruments crafted in Cremona" = các nghệ sĩ vĩ cầm vô cùng tôn sùng, ngưỡng mộ ("deeply admired").',
        },
        {
          id: 'toefl-mock-5-q23',
          skill: 'reading',
          partLabel: 'Academic Reading 2: Music & Acoustics (Q18–Q23)',
          passage:
            'For three centuries, violinists have revered instruments crafted in Cremona, Italy, by Antonio Stradivari between 1680 and 1737, attributing their unmatched projection and warm overtones to lost workshop secrets. Early hypotheses pointed to Stradivari’s translucent oil varnish or timber harvested from Alpine spruce trees that grew slowly during Europe’s "Little Ice Age," yielding exceptionally tight, uniform annual growth rings.\n\nTo test whether modern ears actually prefer seventeenth-century violins over top contemporary instruments, acoustician Claudia Fritz organized rigorous double-blind listening trials in Paris and New York. Concert violinists wearing dark welder’s goggles—preventing them from recognizing famous antique labels or varnish patterns—played both Stradivarius violins and newly constructed master instruments inside concert halls while expert audiences scored sound quality.\n\nSurprisingly, soloists and listeners alike slightly favored modern violins for projection and clarity, and players could not tell old from new reliably by sound alone. Still, chemical analyses confirm Stradivari treated his wood with mineral salts—including borax, zinc, and alum—to deter wood-boring beetles, subtly altering wood stiffness. While the mystique of Stradivarius remains partly psychological, unraveling those antique preservation recipes continues guiding modern luthiers.',
          question: 'What does the author conclude about the legendary reputation of Stradivarius violins?',
          options: [
            'It stems partly from psychological prestige, though Stradivari’s wood treatments still offer useful insights.',
            'It has been completely disproven because mineral salts ruined every antique instrument.',
            'It proves that modern violin makers cannot afford Alpine spruce timber.',
            'It depends entirely on whether performers wear goggles on stage.',
          ],
          correctIdx: 0,
          explanation:
            'Câu cuối kết luận huyền thoại Stradivarius một phần mang tính tâm lý ("partly psychological"), nhưng công thức bảo quản gỗ cổ vẫn tiếp tục gợi mở hữu ích cho thợ làm đàn hiện đại.',
        },
        {
          id: 'toefl-mock-5-q24',
          skill: 'grammar',
          partLabel: 'Academic Grammar & Precision (Q24)',
          question: 'Choose the sentence with accurate concessive structure and punctuation:',
          options: [
            'Although double-blind trials favored modern violins, yet many collectors still prize antique craftsmanship.',
            'Whereas mineral salts altered wood stiffness; modern luthiers study antique preservation recipes.',
            'Despite antique violins enjoy huge prestige, listeners rarely identify them blindfolded.',
            'Even though double-blind trials favored modern violins, antique instruments continue to inspire contemporary luthiers.',
          ],
          correctIdx: 3,
          explanation:
            'D dùng đúng liên từ nhượng bộ "Even though + mệnh đề, mệnh đề". A sai thừa "yet" sau "Although"; B dùng dấu chấm phẩy sai sau mệnh đề phụ thuộc; C sai dùng mệnh đề sau giới từ "Despite".',
        },
        {
          id: 'toefl-mock-5-q25',
          skill: 'vocab',
          partLabel: 'Academic Discussion Precision (Q25)',
          question: 'Which sentence adds the most nuanced academic contribution to a discussion on funding university arts programs?',
          options: [
            'Arts classes are fun so universities must never cut any budget.',
            'I agree with Sarah’s comment about budgets because money matters.',
            'Beyond preserving cultural heritage, studio-arts training cultivates spatial reasoning and iterative design habits valued in engineering and medicine.',
            'Why do university administrators always spend more on laboratories than music rooms?',
          ],
          correctIdx: 2,
          explanation:
            'C bổ sung góc nhìn liên ngành học thuật sắc bén: đào tạo nghệ thuật rèn tư duy không gian và thiết kế lặp hữu ích cho cả kỹ thuật và y khoa.',
        },
      ],
    },
  ],
};

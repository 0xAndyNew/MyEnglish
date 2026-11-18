import type {
  AcademicWritingPrompt,
  PresentationPhrase,
  SeminarPhrase,
  GraduationQuizQuestion,
} from './academicCurriculumData';

// =========================================================
// 1. ACADEMIC WRITING EXTRA 2 (15 đề: aw-ex-17 .. aw-ex-31)
// =========================================================

export const ACADEMIC_WRITING_EXTRA_2: AcademicWritingPrompt[] = [
  // Email giảng viên (2)
  {
    id: 'aw-ex-17',
    type: 'Email giảng viên',
    title: 'Email xin phép vắng mặt tham dự hội thảo khoa học sinh viên (Conference Absence)',
    level: 'B1',
    recommendedWords: 130,
    promptVi:
      'Bạn được chọn trình bày poster tại một hội thảo khoa học sinh viên cấp thành phố nên phải vắng một buổi thực hành chuyên ngành. Hãy viết email trang trọng gửi giảng viên xin phép vắng mặt, cam kết bù bài và nhờ bạn cùng nhóm cập nhật nội dung.',
    promptEn:
      'Write a formal email to your lecturer requesting excused absence from one upcoming lab session because you have been selected to present a research poster at an inter-university student symposium. Outline how you will catch up on missed coursework.',
    keywordsEn: ['excused absence', 'symposium', 'poster presentation', 'catch up', 'attached', 'Sincerely'],
    structureOutline: [
      'Subject Line: Ghi rõ tên môn học, ngày vắng và họ tên + MSSV',
      'Opening: Xưng hô trang trọng ("Dear Dr./Prof. ..."), giới thiệu lớp/nhóm thực hành',
      'Reason: Trình bày lý do học thuật chính đáng kèm giấy mời/xác nhận đính kèm',
      'Action Plan: Cam kết hoàn thành bài tập trước hạn hoặc làm bù theo hướng dẫn',
      'Closing: Cảm ơn giảng viên và ký tên đầy đủ thông tin sinh viên',
    ],
    sampleBandHigh: `Subject: Request for Excused Absence (Nov 14 Lab) – CS302 – Quoc Anh Do (ID: 20234112)

Dear Dr. Hoang,

I hope you are having a productive week. I am Quoc Anh Do, a third-year student enrolled in your Tuesday afternoon Software Engineering Lab (CS302, Section 02).

I am writing to respectfully request an excused absence from next week's lab session on November 14. My research team has been invited to present our poster at the Regional Undergraduate Computing Symposium, which runs concurrently with our scheduled class. I have attached the official acceptance letter from the organizing committee for your verification.

To ensure I do not fall behind, I will complete the pre-lab coding exercises prior to departure and submit my individual lab report by Friday, November 17. My lab partner, Mai Linh, has also kindly agreed to share detailed session notes with me.

Thank you very much for your understanding and support.

Sincerely,
Quoc Anh Do
Student ID: 20234112`,
    gradingChecklistVi: [
      'Ghi rõ mã học phần, ca học và ngày dự kiến vắng mặt ngay ở tiêu đề và mở đầu',
      'Đính kèm minh chứng xác nhận từ ban tổ chức hội thảo',
      'Chủ động đề xuất phương án bù bài cụ thể thay vì hỏi "em có mất gì không?"',
    ],
  },
  {
    id: 'aw-ex-18',
    type: 'Email giảng viên',
    title: 'Email xin phép đổi hướng đề tài khóa luận & gửi đề cương mới (Topic Revision)',
    level: 'B2',
    recommendedWords: 150,
    promptVi:
      'Sau 2 tuần khảo sát sơ bộ, bạn nhận thấy đề tài khóa luận ban đầu thiếu dữ liệu công khai. Hãy viết email gửi giảng viên hướng dẫn giải thích lý do khách quan và đề xuất phương án đề tài thay thế khả thi hơn.',
    promptEn:
      'Write a respectful email to your thesis supervisor explaining why your initial research topic faces data accessibility barriers, and propose an alternative, feasible direction with an updated preliminary outline attached.',
    keywordsEn: ['supervisor', 'data accessibility', 'feasible', 'alternative', 'preliminary', 'guidance'],
    structureOutline: [
      'Subject: Thesis Topic Revision Proposal – [Your Name, ID]',
      'Context: Nhắc lại đề tài đã đăng ký và kết quả khảo sát dữ liệu bước đầu',
      'Challenge: Nêu rõ rào cản khách quan (thiếu dữ liệu, mẫu quá nhỏ) một cách chuyên nghiệp',
      'Proposal: Trình bày hướng đề tài mới bám sát chuyên môn của thầy/cô và đính kèm đề cương 1 trang',
      'Closing: Xin ý kiến phản hồi hoặc lịch trao đổi ngắn',
    ],
    sampleBandHigh: `Subject: Proposed Revision to Capstone Thesis Topic – Thu Ha Vu (ID: 20220519)

Dear Associate Professor Minh,

Thank you again for approving my preliminary capstone topic on municipal waste-sorting compliance last month. Over the past two weeks, however, I encountered unexpected data accessibility barriers while contacting local sanitation agencies, as disaggregated household records are currently restricted from public release.

Rather than risk delays in data collection, I would like to propose a feasible pivot that preserves my core research interest in urban sustainability. Specifically, I aim to evaluate consumer adoption of QR-based recycling reward programs across three university campuses, where survey access and pilot participation records are readily obtainable.

I have attached a concise one-page revised outline detailing the updated research questions and survey methodology. Could you please review this proposal and let me know if it meets your approval, or if we could briefly discuss it during your Thursday office hours?

I sincerely appreciate your time and continued mentorship.

Best regards,
Thu Ha Vu
Student ID: 20220519`,
    gradingChecklistVi: [
      'Nêu rõ nỗ lực tìm dữ liệu trước khi xin đổi đề tài, tránh cảm giác bỏ cuộc tùy tiện',
      'Chủ động chuẩn bị sẵn đề cương thay thế có tính khả thi cao',
      'Ngôn ngữ cầu thị, tôn trọng quyền quyết định của giảng viên hướng dẫn',
    ],
  },

  // Email xin thực tập (2)
  {
    id: 'aw-ex-19',
    type: 'Email xin thực tập',
    title: 'Email theo dõi kết quả ứng tuyển thực tập sau 2 tuần (Application Follow-up)',
    level: 'B1',
    recommendedWords: 120,
    promptVi:
      'Bạn đã nộp CV và tham gia vòng kiểm tra năng lực cho vị trí Thực tập sinh UX Research cách đây 2 tuần nhưng chưa nhận được phản hồi. Hãy viết email hỏi thăm tiến độ tuyển dụng lịch sự, thể hiện sự nhiệt tình mà không gây áp lực.',
    promptEn:
      'Write a polite follow-up email to a recruiter two weeks after completing an assessment for a UX Research Intern position, reiterating your enthusiasm and inquiring about the hiring timeline.',
    keywordsEn: ['follow up', 'application', 'assessment', 'timeline', 'enthusiasm', 'consideration'],
    structureOutline: [
      'Subject: Follow-up: UX Research Intern Application – [Your Name]',
      'Opening: Nhắc lại vị trí, ngày nộp hồ sơ / hoàn thành bài test',
      'Value & Interest: Khẳng định lại sự hào hứng với sản phẩm/đội ngũ công ty',
      'Inquiry: Hỏi nhẹ nhàng về tiến độ hoặc thời điểm dự kiến có kết quả',
      'Closing: Sẵn sàng bổ sung thông tin nếu cần + lời cảm ơn lịch sự',
    ],
    sampleBandHigh: `Subject: Follow-up on UX Research Intern Application – Khanh Linh Tran

Dear Ms. Thao,

I hope this message finds you well. I am writing to politely follow up on my application for the UX Research Intern position, for which I submitted my usability test critique two weeks ago on October 10.

Exploring your team's recent mobile banking accessibility updates reinforced my enthusiasm for joining VeloFin and contributing to user-centered product discovery. I remain very excited about the prospect of learning from your research team this semester.

When you have a moment, could you kindly share an update on the recruitment timeline or let me know if any additional portfolio samples would be helpful for your review?

Thank you very much for your time and consideration.

Best regards,
Khanh Linh Tran
Phone: 0912-xxx-890`,
    gradingChecklistVi: [
      'Giữ giọng văn kiên nhẫn, lịch sự, tuyệt đối không trách móc việc phản hồi chậm',
      'Nhắc lại chính xác tên vị trí và mốc thời gian đã ứng tuyển/làm bài test',
      'Bày tỏ lại lý do cụ thể khiến bạn hứng thú với công ty',
    ],
  },
  {
    id: 'aw-ex-20',
    type: 'Email xin thực tập',
    title: 'Email từ chối lời mời thực tập một cách chuyên nghiệp (Declining an Offer)',
    level: 'B2',
    recommendedWords: 125,
    promptVi:
      'Bạn nhận được hai lời mời thực tập cùng lúc và quyết định chọn một công ty khác phù hợp hơn với định hướng chuyên ngành. Hãy viết email cảm ơn và từ chối khéo công ty còn lại để giữ mối quan hệ tốt đẹp trong ngành.',
    promptEn:
      'Write a courteous, professional email declining an internship offer after accepting another opportunity that aligns more closely with your academic specialization, while maintaining goodwill with the hiring team.',
    keywordsEn: ['grateful', 'internship offer', 'after careful consideration', 'specialization', 'professionalism', 'paths cross'],
    structureOutline: [
      'Subject: Re: Internship Offer – [Role] – [Your Name]',
      'Appreciation: Cảm ơn chân thành về lời mời và trải nghiệm phỏng vấn tích cực',
      'Decision: Thông báo ngắn gọn, dứt khoát việc không thể nhận offer do chọn hướng phù hợp chuyên ngành hơn',
      'Goodwill: Chúc team tuyển được ứng viên phù hợp và mong có dịp hợp tác tương lai',
      'Closing: Sincerely / Warm regards',
    ],
    sampleBandHigh: `Subject: Re: Offer for Supply Chain Intern – Tuan Kiet Pham

Dear Mr. Duc and the Talent Acquisition Team,

Thank you very much for extending the offer for the Supply Chain Intern position at Pacific Logistics. I truly enjoyed speaking with your operations managers and learning about your automated warehouse expansion.

After careful consideration, however, I must respectfully decline this offer, as I have accepted another internship focused specifically on maritime freight analytics, which aligns directly with my senior thesis specialization. This was not an easy decision, given the professionalism and warmth your team showed throughout the interview process.

I remain deeply appreciative of your time and consideration, and I hope our professional paths may cross again in the future. I wish Pacific Logistics continued success.

Sincerely,
Tuan Kiet Pham`,
    gradingChecklistVi: [
      'Phản hồi sớm ngay khi có quyết định để doanh nghiệp kịp chuyển sang ứng viên khác',
      'Từ chối rõ ràng nhưng giữ thái độ trân trọng, không chê bai chế độ hay công việc',
      'Nêu lý do khéo léo gắn với định hướng học thuật/chuyên môn',
    ],
  },

  // Personal Statement (3)
  {
    id: 'aw-ex-21',
    type: 'Personal Statement',
    title: 'Personal Statement ứng tuyển Học bổng Thạc sĩ Khoa học Dữ liệu (Master in Data Science)',
    level: 'C1',
    recommendedWords: 230,
    promptVi:
      'Viết đoạn Personal Statement (210–250 từ) nộp hồ sơ Thạc sĩ ngành Khoa học Dữ liệu tại châu Âu. Hãy kết nối nền tảng Toán/CNTT bậc đại học, 1 dự án phân tích dữ liệu thực tế và định hướng nghiên cứu ứng dụng sau tốt nghiệp.',
    promptEn:
      'Write a compelling Personal Statement (210–250 words) for a Master of Science in Data Science program, linking your undergraduate quantitative background, one applied machine learning project, and your post-graduation career vision.',
    keywordsEn: ['quantitative', 'empirical', 'predictive modeling', 'interdisciplinary', 'curriculum', 'contribute'],
    structureOutline: [
      'Opening: Vấn đề thực tế khơi gợi đam mê dữ liệu (không dùng sáo ngữ "từ nhỏ em đã thích máy tính")',
      'Academic & Project Proof: Nền tảng đại học + 1 dự án cụ thể (phương pháp, thách thức, kết quả)',
      'Program Fit: Điểm đặc biệt của chương trình Thạc sĩ (môn học, lab nghiên cứu)',
      'Future Goal: Tác động nghề nghiệp hướng tới tại Việt Nam hoặc khu vực',
    ],
    sampleBandHigh: `Working as a part-time data assistant at a local agricultural cooperative during my junior year revealed how millions of small-scale farmers still make harvest decisions without reliable weather-risk forecasts. This gap motivated me to pursue advanced statistical modeling beyond standard undergraduate coursework.

Graduating with honors in Applied Mathematics, I focused my senior thesis on time-series forecasting for Mekong Delta rice yields using open satellite imagery. Processing noisy multispectral bands taught me not only Python-based gradient boosting techniques, but also the discipline of validating model assumptions against field agronomist reports. Our final prototype reduced seasonal yield prediction error by 18 percent compared to baseline averages.

The Master of Science in Data Science at your university offers the exact theoretical depth and applied focus I seek next. I am particularly eager to enroll in the Probabilistic Graphical Models module and contribute to the Environmental AI Lab's work on climate-resilient forecasting. Furthermore, collaborating within an international cohort will sharpen my ability to communicate complex model trade-offs to non-technical stakeholders.

Upon graduation, I intend to return to Southeast Asia as an applied data scientist developing accessible decision-support tools for sustainable agriculture and climate adaptation.`,
    gradingChecklistVi: [
      'Tránh mở đầu sáo rỗng; bắt đầu ngay bằng trải nghiệm thực tế tạo động lực nghiên cứu',
      'Chứng minh năng lực qua số liệu cụ thể của đồ án tốt nghiệp',
      'Chỉ rõ tên môn học/phòng lab của trường mục tiêu để chứng minh đã tìm hiểu kỹ',
    ],
  },
  {
    id: 'aw-ex-22',
    type: 'Personal Statement',
    title: 'Personal Statement xin Học bổng Nghiên cứu Mùa hè (Summer Research Fellowship)',
    level: 'B2',
    recommendedWords: 200,
    promptVi:
      'Viết bài luận cá nhân ngắn (180–220 từ) xin tham gia chương trình Học bổng Nghiên cứu Mùa hè cho sinh viên năm 2–3. Làm nổi bật tính tò mò khoa học, kỹ năng thí nghiệm/đọc tài liệu và tinh thần làm việc nhóm.',
    promptEn:
      'Write a focused Personal Statement (180–220 words) applying for an undergraduate Summer Research Fellowship, highlighting your scientific curiosity, technical readiness from coursework, and collaborative mindset.',
    keywordsEn: ['curiosity', 'methodology', 'laboratory', 'mentorship', 'collaborative', 'hypothesis'],
    structureOutline: [
      'Hook: Câu hỏi khoa học khiến bạn tò mò từ một môn học đại cương/chuyên ngành',
      'Preparation: Kỹ năng đã rèn luyện trong phòng lab hoặc bài tập lớn',
      'Why Fellowship: Mong muốn học quy trình nghiên cứu chuẩn mực từ cố vấn',
      'Outcome: Mục tiêu công bố poster hoặc phát triển thành khóa luận năm cuối',
    ],
    sampleBandHigh: `During an introductory microbiology lab last semester, I was fascinated by how rapidly soil bacteria adapted to trace concentrations of biodegradable plastics. That simple observation sparked a persistent question: which enzymatic pathways govern breakdown efficiency under tropical humidity?

To explore this further, I joined an upper-level biochemistry reading group and mastered spectrophotometric assay preparation alongside basic R statistical analysis. Although our class experiment encountered unexpected contamination on the first trial, troubleshooting sterilization protocols with two lab partners taught me patience, meticulous record-keeping, and the value of peer accountability in experimental science.

The Summer Research Fellowship represents an ideal bridge between classroom learning and independent inquiry. Under Dr. Patel's mentorship, I hope to assist with sample screening while sharpening my ability to formulate testable hypotheses and synthesize peer-reviewed literature. Just as importantly, I look forward to exchanging ideas with fellows from diverse scientific backgrounds during weekly lab seminars.

Ultimately, this intensive summer experience will prepare me to design a rigorous senior honors thesis and pursue a career in sustainable biomaterials research.`,
    gradingChecklistVi: [
      'Thể hiện tư duy khoa học thực chất (biết đặt câu hỏi, xử lý sai số, ghi chép cẩn thận)',
      'Không phóng đại kinh nghiệm; nhấn mạnh thái độ cầu tiến và sẵn sàng học hỏi',
      'Mạch văn tự nhiên, súc tích trong giới hạn 180–220 từ',
    ],
  },
  {
    id: 'aw-ex-23',
    type: 'Personal Statement',
    title: 'Personal Statement chương trình Lãnh đạo Trẻ Đông Nam Á (Youth Leadership Exchange)',
    level: 'B2',
    recommendedWords: 210,
    promptVi:
      'Viết Personal Statement (190–230 từ) ứng tuyển học bổng giao lưu Lãnh đạo Trẻ ASEAN. Trình bày một sáng kiến cộng đồng bạn từng dẫn dắt, bài học vượt qua khó khăn và dự án bạn dự định nhân rộng sau khóa học.',
    promptEn:
      'Write a Personal Statement (190–230 words) for a regional Youth Leadership Exchange Program, describing a community initiative you led, a challenge overcome, and how you will apply regional collaboration skills back home.',
    keywordsEn: ['initiative', 'stakeholders', 'resilience', 'cross-cultural', 'sustainable', 'empower'],
    structureOutline: [
      'Motivation: Vấn đề xã hội địa phương bạn quan tâm (VD: rác thải nhựa học đường, dạy tin học cho trẻ)',
      'Leadership Story: Hành động cụ thể, trở ngại gặp phải và cách giải quyết cùng đội ngũ',
      'Regional Perspective: Vì sao cần học hỏi từ bạn trẻ các nước ASEAN khác',
      'Post-Program Plan: Cam kết hành động cụ thể trong 6–12 tháng sau khi trở về',
    ],
    sampleBandHigh: `Two years ago, I noticed that first-year students from rural provinces at my university often struggled with digital academic tools, leading to avoidable drop-offs in class participation. Rather than treating this as an individual shortcoming, I co-founded "PeerBridge," a student-led digital literacy workshop series.

Launching the initiative was far from effortless. After low turnout at our first session due to scheduling clashes, I surveyed forty freshmen and partnered with dormitory coordinators to host compact 45-minute evening clinics. Over three semesters, our twelve-volunteer team coached more than 260 students on spreadsheet modeling, citation software, and online presentation etiquette. Coordinating diverse stakeholders taught me that inclusive leadership begins with listening before designing solutions.

Joining the ASEAN Youth Leadership Exchange will allow me to test these grassroots strategies against perspectives from peers tackling educational equity across Southeast Asia. I am eager to exchange practical frameworks on volunteer retention and impact measurement during the policy hackathon.

Upon returning, I plan to expand PeerBridge into an open-access bilingual toolkit shared across regional student unions, empowering underrepresented freshmen to thrive from day one.`,
    gradingChecklistVi: [
      'Thể hiện năng lực lãnh đạo qua hành động lắng nghe và điều chỉnh, không chỉ khoe chức danh',
      'Có minh chứng tác động cộng đồng rõ ràng (khảo sát 40 bạn, hỗ trợ 260+ sinh viên)',
      'Nêu kế hoạch hành động khả thi sau khi kết thúc chương trình giao lưu',
    ],
  },

  // Cover Letter (2)
  {
    id: 'aw-ex-24',
    type: 'Cover Letter',
    title: 'Cover Letter ứng tuyển Chương trình Quản trị viên Tập sự (Management Trainee)',
    level: 'C1',
    recommendedWords: 220,
    promptVi:
      'Viết Cover Letter (200–240 từ) ứng tuyển chương trình Management Trainee (khối Thương mại/Vận hành) tại một tập đoàn FMCG đa quốc gia. Làm nổi bật khả năng giải quyết vấn đề, lãnh đạo đội nhóm và định hướng luân chuyển phòng ban.',
    promptEn:
      'Write a persuasive Cover Letter (200–240 words) for a Management Trainee (Commercial/Operations) program at a multinational FMCG company, emphasizing cross-functional leadership, analytical problem-solving, and adaptability.',
    keywordsEn: ['Management Trainee', 'cross-functional', 'commercial acumen', 'streamlined', 'adaptability', 'rotational'],
    structureOutline: [
      'Opening: Vị trí MT + lý do ngưỡng mộ chiến lược thị trường/phát triển bền vững của tập đoàn',
      'Evidence 1 (Commercial/Problem-solving): 1 dự án kinh doanh / cuộc thi giải case có kết quả đo lường',
      'Evidence 2 (Leadership): Kinh nghiệm dẫn dắt đội nhóm đa dạng hoặc làm việc dưới áp lực',
      'Closing: Sự sẵn sàng cho mô hình luân chuyển (rotational program) và lời mời phỏng vấn',
    ],
    sampleBandHigh: `Dear Talent Acquisition Team,

I am writing to express my strong interest in the 2026 Commercial Management Trainee Program at Unilever Vietnam. Having followed your recent initiatives combining rural distribution partnerships with refillable packaging pilots, I am inspired by how your commercial teams balance rapid market growth with measurable sustainability targets.

As a graduating International Business student, I have actively sought fast-paced environments to test my commercial acumen. Leading a four-member team in the National Brand Challenge, I analyzed regional retail audit data and proposed a hyper-local micro-bundling strategy for convenience stores, earning Top 5 Finalist recognition among 180 teams. Additionally, during my six-month trade marketing internship at a domestic beverage distributor, I streamlined weekly point-of-sale tracking sheets across twelve districts, reducing reporting turnaround by 35 percent.

Equally important, serving as Logistics Lead for our university's 1,200-attendee Career Fair taught me how to stay calm under shifting deadlines and align cross-functional volunteer teams toward a shared goal.

I am excited by the steep learning curve of a rotational Management Trainee journey and confident that my analytical rigor and adaptability will add value from day one. Thank you for considering my application.

Sincerely,
Bao Ngoc Le`,
    gradingChecklistVi: [
      'Gắn trực tiếp thành tích với tố chất của Management Trainee (tư duy kinh doanh, lãnh đạo, thích nghi)',
      'Đề cập cụ thể sáng kiến của công ty mục tiêu để tạo sự khác biệt',
      'Kết hợp hài hòa giữa thành tích cuộc thi học thuật, thực tập và hoạt động tổ chức sự kiện',
    ],
  },
  {
    id: 'aw-ex-25',
    type: 'Cover Letter',
    title: 'Cover Letter ứng tuyển Trợ lý Nghiên cứu (Research Assistant) tại Trung tâm Chính sách',
    level: 'B2',
    recommendedWords: 190,
    promptVi:
      'Viết Cover Letter (170–210 từ) gửi Giám đốc một Viện/Trung tâm Nghiên cứu Kinh tế – Xã hội ứng tuyển vị trí Trợ lý Nghiên cứu (Part-time/Full-time) chuyên mảng khảo sát và tổng hợp tài liệu chính sách.',
    promptEn:
      'Write a concise Cover Letter (170–210 words) applying for a Research Assistant role at a socioeconomic policy institute, highlighting your literature review skills, quantitative survey analysis, and attention to academic rigor.',
    keywordsEn: ['Research Assistant', 'policy brief', 'literature synthesis', 'methodology', 'stata/R', 'rigor'],
    structureOutline: [
      'Salutation: Dear Dr. [Name] / Dear Research Hiring Committee,',
      'Opening: Nêu rõ vị trí Research Assistant và mối quan tâm tới báo cáo/chủ đề gần đây của viện',
      'Research Skills: Kỹ năng tổng hợp tài liệu (literature review), xử lý số liệu (Stata/R/SPSS), viết báo cáo',
      'Closing: Đính kèm mẫu bài viết (writing sample) & CV, mong được trao đổi thêm',
    ],
    sampleBandHigh: `Dear Dr. Quang and the Research Hiring Committee,

I am writing to apply for the Research Assistant position at the Institute for Sustainable Development Studies. Your recent policy brief on informal labor resilience in Vietnam's Mekong provinces resonated deeply with my undergraduate coursework in Development Economics.

Through two semesters assisting Professor Lan's faculty research group, I developed practical proficiency in academic literature synthesis and quantitative survey cleaning using R and Stata. Specifically, I coded over 450 household interview transcripts and drafted comparative summary tables that contributed to a working paper on rural credit access. This experience strengthened my commitment to methodological rigor, accurate citation management, and clear policy communication.

I am eager to support your upcoming labor-market transition study by conducting systematic literature searches, verifying dataset consistency, and preparing concise briefing notes. I have attached my CV alongside a five-page empirical writing sample for your consideration.

Thank you very much for your time, and I would welcome the opportunity to discuss how my research training can support your team's objectives.

Sincerely,
Minh Chau Nguyen`,
    gradingChecklistVi: [
      'Nêu rõ công cụ nghiên cứu (R, Stata, mã hóa dữ liệu định tính) và số lượng mẫu đã xử lý',
      'Nhắc tới việc đính kèm mẫu bài viết nghiên cứu (writing sample) — điểm cộng lớn cho vị trí RA',
      'Giọng văn điềm đạm, chuẩn mực học thuật, tránh ngôn từ quảng cáo quá đà',
    ],
  },

  // CV Summary (2)
  {
    id: 'aw-ex-26',
    type: 'CV Summary',
    title: 'CV Summary & XYZ Bullets cho Sinh viên Tài chính – Kiểm toán (Finance/Audit Intern)',
    level: 'B2',
    recommendedWords: 120,
    promptVi:
      'Viết phần Career Summary (3 câu) và 3 bullet points chuẩn công thức Google XYZ cho sinh viên năm 3/năm 4 ngành Tài chính – Kế toán ứng tuyển Thực tập sinh Kiểm toán (Audit Intern) hoặc Phân tích Tài chính.',
    promptEn:
      'Write an ATS-optimized CV Summary (3 lines) and 3 quantified XYZ bullet points tailored for a Finance or Audit Intern applicant, demonstrating spreadsheet accuracy, financial modeling, and reconciliation experience.',
    keywordsEn: ['analytical', 'financial modeling', 'reconciled', 'variance', 'audited', 'compliance'],
    structureOutline: [
      'Professional Summary: Ngành học + GPA/Chứng chỉ (VD: CFA/ACCA level) + Kỹ năng Excel/Financial Analysis + Mục tiêu',
      'Bullet 1 (Financial Analysis Project): Phân tích báo cáo tài chính bao nhiêu doanh nghiệp + Kết quả',
      'Bullet 2 (Treasurer / Club Finance): Quản lý ngân sách CLB/sự kiện + Cắt giảm sai lệch/chi phí',
      'Bullet 3 (Process/Spreadsheet): Tự động hóa bảng tính hoặc kiểm tra đối chiếu chứng từ',
    ],
    sampleBandHigh: `PROFESSIONAL SUMMARY
Analytical third-year Finance and Accounting undergraduate (GPA: 3.7/4.0; ACCA F1–F3 completed) with hands-on training in financial statement analysis and Excel modeling. Experienced in managing student organization budgets and conducting equity valuation case studies. Seeking an Audit Intern role to apply strong numerical accuracy and regulatory compliance skills.

RELEVANT EXPERIENCE & PROJECTS
• Valued three publicly listed retail firms using DCF and comparable-company models in a national equity research challenge, advancing to the Top 8 regional semi-finals.
• Managed an annual budget of 85M VND as Finance Club Treasurer, reconciling 120+ receipts monthly with zero audit discrepancies.
• Automated event expense tracking templates using Excel PivotTables and XLOOKUP, cutting post-event financial reporting time by 50%.`,
    gradingChecklistVi: [
      'Đưa các từ khóa ATS ngành Tài chính – Kiểm toán (DCF, reconciling, discrepancies, compliance)',
      'Không viết "I/My", mở đầu bullet bằng động từ mạnh ở thì quá khứ (Valued, Managed, Automated)',
      'Thể hiện sự chính xác tuyệt đối với con số (zero audit discrepancies, 50% time reduction)',
    ],
  },
  {
    id: 'aw-ex-27',
    type: 'CV Summary',
    title: 'CV Summary & XYZ Bullets cho Sinh viên Truyền thông / Ngôn ngữ Anh (Marketing & PR Intern)',
    level: 'B1',
    recommendedWords: 115,
    promptVi:
      'Viết phần Career Summary (3 câu) và 3 gạch đầu dòng kinh nghiệm CLB/freelance cho sinh viên ngành Truyền thông hoặc Ngôn ngữ Anh ứng tuyển vị trí Content Marketing / PR Intern.',
    promptEn:
      'Write a concise CV Summary (3 sentences) and 3 impact-driven bullet points for an English Linguistics or Communications undergraduate applying for a Content Marketing or PR Intern role.',
    keywordsEn: ['bilingual', 'copywriting', 'engagement', 'editorial', 'collaborated', 'SEO'],
    structureOutline: [
      'Professional Summary: Ngành học + Trình độ tiếng Anh (IELTS/VSTEP) + Kỹ năng biên tập/SEO/Social + Định hướng',
      'Bullet 1 (Content Growth): Viết/biên tập bao nhiêu bài + Tăng trưởng lượt đọc/tương tác (%)',
      'Bullet 2 (PR / Event Media): Phối hợp truyền thông sự kiện + Kết quả người tham dự/báo chí',
      'Bullet 3 (Translation / Editorial): Chuẩn hóa lịch đăng bài hoặc biên dịch tài liệu song ngữ',
    ],
    sampleBandHigh: `PROFESSIONAL SUMMARY
Detail-oriented English Linguistics senior (IELTS 7.5) skilled in bilingual copywriting, SEO blogging, and social media storytelling. Proven track record of growing campus publication readership and coordinating multi-channel event campaigns. Seeking a Content Marketing Intern position to craft clear, audience-driven brand narratives.

COMMUNICATIONS & PROJECT HIGHLIGHTS
• Authored 18 bilingual career-guide articles for the faculty web portal, increasing monthly organic page views by 65% within one semester.
• Co-led digital PR campaigns across Facebook and TikTok for an annual student conference, driving 900+ registrations—30% above initial targets.
• Built a standardized editorial calendar and peer-proofreading checklist in Trello, eliminating missed publishing deadlines across a 6-writer team.`,
    gradingChecklistVi: [
      'Chứng minh năng lực viết bằng kết quả đo lường (65% organic views, 900+ registrations)',
      'Nêu rõ công cụ/kỹ năng thực tế (SEO, bilingual copywriting, editorial calendar, Trello)',
      'Tránh liệt kê chung chung kiểu "chịu trách nhiệm đăng bài Facebook"',
    ],
  },

  // Essay: Problem-Solution (2)
  {
    id: 'aw-ex-28',
    type: 'Essay: Problem-Solution',
    title: 'Academic Essay (Problem–Solution): Tình trạng kiệt sức học đường (Academic Burnout) ở Sinh viên',
    level: 'B2',
    recommendedWords: 240,
    promptVi:
      'Ngày càng nhiều sinh viên đại học rơi vào trạng thái kiệt sức học đường (academic burnout) do áp lực thành tích, làm thêm và so sánh đồng trang lứa. Hãy phân tích các nguyên nhân chính và đề xuất 2 giải pháp thiết thực từ phía nhà trường và cá nhân sinh viên.',
    promptEn:
      'Write a problem-solution essay (220–260 words) analyzing the key drivers of academic burnout among university students and proposing two practical interventions involving both universities and students.',
    keywordsEn: ['burnout', 'workload', 'chronic stress', 'institutional', 'boundaries', 'sustainable'],
    structureOutline: [
      'Introduction: Khái quát hiện tượng burnout ở bậc đại học + Thesis nêu nguyên nhân & 2 giải pháp',
      'Body 1 (Causes/Problems): Quá tải lịch học – làm thêm + văn hóa chạy đua thành tích trên mạng xã hội',
      'Body 2 (Solutions): (1) Nhà trường điều phối lịch đánh giá & dịch vụ tư vấn tâm lý; (2) Sinh viên đặt ranh giới thời gian & kỹ năng phục hồi',
      'Conclusion: Khẳng định hiệu suất bền vững quan trọng hơn cường độ nhất thời',
    ],
    sampleBandHigh: `Academic burnout—characterized by chronic exhaustion, cynicism toward coursework, and declining motivation—has become an increasingly prevalent concern on modern university campuses. While heavy financial and competitive pressures largely trigger this condition, coordinated institutional adjustments and healthier student self-regulation can significantly alleviate its impact.

Two interrelated factors drive undergraduate burnout. First, many students juggle full-time credit loads alongside part-time employment to cover rising living expenses, leaving inadequate time for sleep and cognitive recovery. Second, hyper-competitive campus cultures, amplified by curated achievement posts on social media, push learners to overcommit to internships, clubs, and competitions simultaneously without realistic pacing.

Addressing this challenge requires shared action. At the institutional level, faculties should coordinate assessment calendars across courses to prevent clustered midterm deadlines and expand accessible, stigma-free campus counseling workshops on stress management. Concurrently, students must cultivate sustainable study boundaries by prioritizing core commitments, scheduling deliberate screen-free rest intervals, and seeking peer or advisor support early before fatigue escalates into crisis.

In conclusion, academic burnout stems less from individual weakness than from unsustainable pacing and structural overload. By pairing institutional deadline coordination with deliberate personal boundary-setting, universities can foster both rigorous scholarship and long-term student well-being.`,
    gradingChecklistVi: [
      'Định nghĩa rõ academic burnout ở câu mở đầu bằng văn phong khách quan',
      'Giải pháp đi vào cơ chế cụ thể (điều phối lịch thi giữa các môn, thiết lập ranh giới) chứ không khuyên sáo rỗng "nên thư giãn"',
      'Liên kết mượt mà giữa hai đoạn thân bài (While... / Addressing this challenge...)',
    ],
  },
  {
    id: 'aw-ex-29',
    type: 'Essay: Problem-Solution',
    title: 'Academic Essay (Problem–Solution): Tin giả và Thiếu kỹ năng kiểm chứng thông tin ở Giới trẻ',
    level: 'C1',
    recommendedWords: 250,
    promptVi:
      'Thông tin sai lệch (misinformation) lan truyền nhanh trên mạng xã hội đang ảnh hưởng tiêu cực tới nhận thức xã hội và nghiên cứu học thuật của sinh viên. Hãy phân tích nguyên nhân gốc rễ và đề xuất giải pháp từ góc độ giáo dục đại học và nền tảng số.',
    promptEn:
      'Write a problem-solution essay (230–260 words) examining why digital misinformation spreads rapidly among young adults and proposing realistic solutions involving higher education curricula and platform governance.',
    keywordsEn: ['misinformation', 'algorithmic', 'verification', 'media literacy', 'cognitive bias', 'accountability'],
    structureOutline: [
      'Introduction: Thực trạng tin giả lan truyền nhanh + Thesis nêu nguyên nhân thuật toán/thói quen & giải pháp',
      'Body 1 (Root Causes): Thuật toán ưu tiên nội dung gây sốc + thói quen đọc lướt, thiên kiến xác nhận (confirmation bias)',
      'Body 2 (Solutions): (1) Tích hợp năng lực kiểm chứng thông tin (lateral reading) vào học phần đại cương; (2) Minh bạch nguồn & gắn nhãn cảnh báo trên nền tảng',
      'Conclusion: Kết hợp giáo dục tư duy phản biện với trách nhiệm nền tảng',
    ],
    sampleBandHigh: `The rapid circulation of digital misinformation poses a growing threat not only to civic discourse but also to the integrity of student research. Although algorithmic amplification and passive reading habits accelerate the spread of unverified claims, embedding systematic verification training into higher education alongside stronger platform accountability can curb this trend.

The vulnerability of young audiences stems from both technological design and cognitive shortcuts. Social media recommendation algorithms prioritize emotionally provocative headlines over factual nuance, creating echo chambers that reinforce confirmation bias. Meanwhile, accustomed to rapid scrolling, many undergraduates evaluate a source merely by its visual polish or share count rather than investigating its authorship, funding, or primary evidence.

Mitigating this issue requires intervention on two fronts. First, universities should embed practical information literacy—particularly "lateral reading" techniques where students cross-check claims across independent databases—into compulsory freshman seminars across all majors, not only journalism. Second, regulatory frameworks and digital platforms must increase algorithmic transparency by labeling synthetically altered media and demoting repeatedly debunked posts from trending feeds.

Ultimately, curbing misinformation demands both educated skeptics and responsible digital architectures. Equipping students with critical verification habits while holding platforms accountable for amplification incentives offers the most durable defense against online falsehoods.`,
    gradingChecklistVi: [
      'Phân tích được cả yếu tố công nghệ (thuật toán) và tâm lý nhận thức (confirmation bias)',
      'Đề xuất giải pháp học thuật cụ thể ("lateral reading" trong môn đại cương)',
      'Từ vựng học thuật chính xác, chuẩn C1 (amplification, nuance, demoting, durable defense)',
    ],
  },

  // Essay: Cause-Effect (2)
  {
    id: 'aw-ex-30',
    type: 'Essay: Cause-Effect',
    title: 'Academic Essay (Cause–Effect): Tác động của Video ngắn (Short-form Videos) tới Khả năng Tập trung Sâu',
    level: 'B2',
    recommendedWords: 240,
    promptVi:
      'Việc tiêu thụ video ngắn (dưới 60 giây) hằng ngày đang rất phổ biến trong giới sinh viên. Hãy phân tích nguyên nhân thu hút của định dạng này và những hệ quả chính đối với khả năng đọc sâu (deep reading) và quản lý thời gian học tập.',
    promptEn:
      'Write a cause-and-effect essay (220–260 words) analyzing why short-form video platforms are so compelling to university students and what effects heavy daily consumption has on deep reading stamina and time management.',
    keywordsEn: ['short-form', 'dopamine', 'attention span', 'deep reading', 'fragmented', 'displacement'],
    structureOutline: [
      'Introduction: Sự thống trị của video ngắn trong đời sống sinh viên + Thesis nêu nguyên nhân & hệ quả',
      'Body 1 (Causes): Cơ chế thưởng tức thì (variable rewards) + giải trí nhanh giữa lịch học bận rộn',
      'Body 2 (Effects): Suy giảm sức bền đọc tài liệu học thuật dài (deep reading) + hiệu ứng dịch chuyển thời gian (time displacement)',
      'Conclusion: Tóm lại vấn đề và gợi ý sử dụng có chủ đích',
    ],
    sampleBandHigh: `Short-form video platforms featuring sub-minute clips have become the dominant leisure medium among university students worldwide. Driven by algorithmic personalization and the appeal of effortless micro-breaks, habitual consumption of these rapid feeds exerts measurable effects on students' deep reading stamina and daily time management.

Two psychological and practical mechanisms explain this widespread appeal. First, infinite-scroll feeds deliver unpredictable bursts of novelty, triggering rapid dopamine responses that make passive viewing far easier to initiate than demanding study tasks. Second, students often justify opening short-video apps as harmless five-minute breaks between lectures, unaware of how seamlessly automated playback stretches brief pauses into prolonged sessions.

Consequently, heavy daily exposure creates noticeable academic costs. Accustomed to constant visual stimulation every few seconds, many learners report growing impatience when confronting dense journal articles or textbook chapters that require sustained, uninterrupted concentration. Furthermore, late-night scrolling produces a time-displacement effect: hours intended for sleep or assignment drafting vanish silently, resulting in rushed submissions and diminished next-day classroom alertness.

In summary, while short-form videos satisfy students' desire for instant relaxation, unmoderated use undermines cognitive endurance and scheduling discipline. Recognizing how algorithmic design captures attention is the first step toward reclaiming uninterrupted time for deep academic work.`,
    gradingChecklistVi: [
      'Làm rõ cơ chế nhân – quả logic (tính kích thích nhanh -> khó chịu khi đọc văn bản dài; lướt đêm -> mất ngủ/trễ hạn)',
      'Dùng chính xác các thuật ngữ học thuật (time-displacement effect, cognitive endurance, sustained concentration)',
      'Giọng văn phân tích khách quan, không lên lớp đạo đức',
    ],
  },
  {
    id: 'aw-ex-31',
    type: 'Essay: Cause-Effect',
    title: 'Academic Essay (Cause–Effect): Sự bùng nổ của Khóa học Trực tuyến Đại trà (MOOCs) trong Giáo dục Đại học',
    level: 'C1',
    recommendedWords: 245,
    promptVi:
      'Ngày càng nhiều sinh viên sử dụng các nền tảng học trực tuyến đại trà (MOOCs như Coursera, edX) song song với chương trình trên lớp. Hãy phân tích nguyên nhân của xu hướng này và hai hệ quả lớn đối với sinh viên lẫn mô hình giảng dạy đại học.',
    promptEn:
      'Write a cause-and-effect essay (220–260 words) exploring why undergraduates increasingly supplement degree programs with Massive Open Online Courses (MOOCs), and how this shift affects student self-directed learning and traditional university instruction.',
    keywordsEn: ['supplement', 'accessibility', 'self-directed', 'obsolescence', 'pedagogical', 'credentialing'],
    structureOutline: [
      'Introduction: Xu hướng học kết hợp MOOCs song song giảng đường + Thesis nêu nguyên nhân & tác động kép',
      'Body 1 (Causes): Tốc độ cập nhật kỹ năng ngành nhanh hơn giáo trình truyền thống + chi phí linh hoạt/tiếp cận chuyên gia toàn cầu',
      'Body 2 (Effects): Tăng năng lực tự học của sinh viên; đồng thời buộc đại học chuyển từ giảng bài một chiều sang seminar tương tác & đánh giá thực hành',
      'Conclusion: Tương lai cộng sinh giữa nguồn học mở toàn cầu và cố vấn trực tiếp tại trường',
    ],
    sampleBandHigh: `Over the past decade, Massive Open Online Courses (MOOCs) have evolved from experimental side projects into essential learning companions for ambitious undergraduates. Fuelled by rapidly shifting industry skill requirements and unprecedented global accessibility, the rise of MOOCs has significantly reshaped both student autonomy and conventional university pedagogy.

Two major factors drive students toward external online platforms. First, traditional university curricula often require several years for formal accreditation updates, leaving temporary gaps in fast-moving fields such as cloud computing, digital marketing, or bioinformatics. MOOCs allow learners to bridge these gaps immediately using industry-curated modules. Second, low-cost subscription models and asynchronous video lectures enable students from diverse socioeconomic backgrounds to learn directly from leading international scholars at their own pace.

This trend yields transformative effects for learners and institutions alike. On the student side, navigating self-paced online courses cultivates stronger self-directed learning habits and verifiable micro-credentials that strengthen early-career CVs. Simultaneously, widespread access to recorded expert lectures reduces the value of passive, one-way classroom lecturing, pressuring universities to reallocate face-to-face contact hours toward interactive seminars, laboratory mentorship, and collaborative problem-solving.

In conclusion, rather than replacing higher education institutions, MOOCs are catalyzing a constructive division of labor: online platforms democratize foundational content delivery, while universities focus increasingly on mentorship, community, and applied critical inquiry.`,
    gradingChecklistVi: [
      'Phân tích hai chiều rõ ràng: nguyên nhân từ thị trường lao động + khả năng tiếp cận; hệ quả cho cả SV và nhà trường',
      'Sử dụng cụm từ học thuật tự nhiên (accreditation updates, asynchronous, micro-credentials, division of labor)',
      'Kết luận tổng hợp sâu sắc, tránh lặp lại nguyên văn mở bài',
    ],
  },
];

// =========================================================
// 2. PRESENTATION PHRASES EXTRA (56 cụm: pres-ex-1 .. pres-ex-56)
//    Opening: 12 | Signposting: 11 | Explaining Data/Visuals: 11
//    Handling Q&A: 11 | Concluding: 11
// =========================================================

export const PRESENTATION_PHRASES_EXTRA: PresentationPhrase[] = [
  // Opening (12: pres-ex-1 .. pres-ex-12)
  {
    id: 'pres-ex-1',
    stage: 'Opening',
    en: 'Good afternoon, distinguished panel members and fellow students. My name is Minh, and I am delighted to present our team’s capstone research.',
    vi: 'Chào buổi chiều quý thầy cô trong hội đồng và các bạn sinh viên. Tôi tên là Minh, và rất vinh dự được trình bày nghiên cứu khóa luận của nhóm.',
    usageTip: 'Dùng "distinguished panel members" khi bảo vệ khóa luận hoặc thuyết trình trước hội đồng chấm điểm.',
    level: 'B2',
  },
  {
    id: 'pres-ex-2',
    stage: 'Opening',
    en: 'Have you ever wondered why nearly half of all digital prototypes fail during their first month of user testing?',
    vi: 'Quý vị đã bao giờ tự hỏi tại sao gần một nửa số sản phẩm mẫu kỹ thuật số thất bại ngay trong tháng thử nghiệm người dùng đầu tiên chưa?',
    usageTip: 'Mở đầu bằng câu hỏi tu từ (Rhetorical Question) khơi gợi sự tò mò tự nhiên trước khi nêu đề tài.',
    level: 'B1',
  },
  {
    id: 'pres-ex-3',
    stage: 'Opening',
    en: 'This issue is particularly timely given the rapid shift toward remote internships across Southeast Asia.',
    vi: 'Vấn đề này đặc biệt mang tính thời sự trong bối cảnh xu hướng thực tập từ xa đang diễn ra nhanh chóng tại Đông Nam Á.',
    usageTip: 'Dùng "particularly timely" để chứng minh tính cấp thiết của đề tài ngay phần mở đầu.',
    level: 'B2',
  },
  {
    id: 'pres-ex-4',
    stage: 'Opening',
    en: 'Over the next ten minutes, I will walk you through the background, our experimental design, and the key policy implications.',
    vi: 'Trong mười phút tới, tôi sẽ dẫn dắt quý vị qua bối cảnh nghiên cứu, thiết kế thực nghiệm và các hàm ý chính sách trọng tâm.',
    usageTip: 'Thông báo rõ thời lượng ("Over the next ten minutes") giúp người nghe cảm thấy bài nói được kiểm soát tốt.',
    level: 'B1',
  },
  {
    id: 'pres-ex-5',
    stage: 'Opening',
    en: 'To set the context, let us briefly consider a real-world scenario from a mid-sized logistics firm.',
    vi: 'Để đặt bối cảnh, hãy cùng xem xét nhanh một tình huống thực tế từ một doanh nghiệp logistics quy mô vừa.',
    usageTip: 'Mở bằng một tình huống ngắn (Mini-case) rất hiệu quả cho các môn Kinh tế, Quản trị và Công nghệ.',
    level: 'B2',
  },
  {
    id: 'pres-ex-6',
    stage: 'Opening',
    en: 'Our presentation addresses a critical gap in current literature: how bilingual instruction influences STEM retention.',
    vi: 'Bài thuyết trình của chúng tôi giải quyết một khoảng trống quan trọng trong tài liệu hiện tại: giảng dạy song ngữ ảnh hưởng thế nào tới mức độ ghi nhớ kiến thức STEM.',
    usageTip: 'Cụm "addresses a critical gap in current literature" nâng tầm học thuật ngay từ slide tiêu đề.',
    level: 'C1',
  },
  {
    id: 'pres-ex-7',
    stage: 'Opening',
    en: 'For clarity, I have structured today’s talk around three core questions.',
    vi: 'Để dễ theo dõi, tôi đã cấu trúc bài nói hôm nay xoay quanh ba câu hỏi cốt lõi.',
    usageTip: 'Chia bố cục theo câu hỏi thay vì tiêu đề khô khan giúp khán giả nhớ mạch bài dễ hơn.',
    level: 'B1',
  },
  {
    id: 'pres-ex-8',
    stage: 'Opening',
    en: 'Before diving into the technical architecture, allow me to define two terms central to our study.',
    vi: 'Trước khi đi sâu vào kiến trúc kỹ thuật, xin phép cho tôi định nghĩa hai thuật ngữ trọng tâm của nghiên cứu.',
    usageTip: 'Chốt định nghĩa thuật ngữ sớm giúp tránh việc hội đồng hiểu sai khái niệm xuyên suốt bài nói.',
    level: 'B2',
  },
  {
    id: 'pres-ex-9',
    stage: 'Opening',
    en: 'We chose to investigate this topic after observing a recurring bottleneck in campus waste sorting.',
    vi: 'Chúng tôi chọn nghiên cứu chủ đề này sau khi quan sát thấy một điểm nghẽn lặp đi lặp lại trong việc phân loại rác tại ký túc xá.',
    usageTip: 'Nêu lý do thực tiễn khiến nhóm chọn đề tài giúp bài thuyết trình chân thực và có sức nặng.',
    level: 'B1',
  },
  {
    id: 'pres-ex-10',
    stage: 'Opening',
    en: 'Note that we will reserve detailed Q&A for the final five minutes, though brief clarification questions are welcome at any point.',
    vi: 'Xin lưu ý chúng tôi sẽ dành phần hỏi đáp chi tiết vào năm phút cuối, tuy nhiên các câu hỏi làm rõ ngắn luôn được hoan nghênh bất cứ lúc nào.',
    usageTip: 'Thiết lập quy tắc tương tác (Housekeeping) ngay đầu giờ giúp bạn chủ động kiểm soát thời gian.',
    level: 'B2',
  },
  {
    id: 'pres-ex-11',
    stage: 'Opening',
    en: 'Imagine spending three hours studying a chapter, only to recall less than twenty percent of it a week later.',
    vi: 'Hãy thử tưởng tượng bạn dành ba giờ học một chương sách, nhưng một tuần sau chỉ nhớ được chưa tới hai mươi phần trăm.',
    usageTip: 'Từ "Imagine..." kéo khán giả nhập cuộc về mặt cảm xúc chỉ trong một câu ngắn.',
    level: 'B1',
  },
  {
    id: 'pres-ex-12',
    stage: 'Opening',
    en: 'Specifically, this report synthesizes empirical data gathered from four hundred undergraduate respondents.',
    vi: 'Cụ thể, báo cáo này tổng hợp dữ liệu thực nghiệm thu thập từ bốn trăm sinh viên tham gia khảo sát.',
    usageTip: 'Nêu quy mô mẫu ngay phần mở đầu tạo ấn tượng về độ tin cậy khoa học của nhóm bạn.',
    level: 'C1',
  },

  // Signposting (11: pres-ex-13 .. pres-ex-23)
  {
    id: 'pres-ex-13',
    stage: 'Signposting',
    en: 'That concludes our overview of the theoretical framework. Let us now turn to the empirical findings.',
    vi: 'Phần tổng quan khung lý thuyết đến đây là hết. Bây giờ chúng ta hãy chuyển sang các kết quả thực nghiệm.',
    usageTip: 'Cụm "That concludes..." đóng lại phần cũ gọn gàng trước khi mở slide mới.',
    level: 'B1',
  },
  {
    id: 'pres-ex-14',
    stage: 'Signposting',
    en: 'At this juncture, it is worth pausing to compare the two competing hypotheses.',
    vi: 'Ở điểm chuyển tiếp này, rất đáng để dừng lại so sánh hai giả thuyết đối lập nhau.',
    usageTip: 'Từ "At this juncture" rất trang trọng, thích hợp khi chuyển sang phần phân tích đối chiếu quan trọng.',
    level: 'C1',
  },
  {
    id: 'pres-ex-15',
    stage: 'Signposting',
    en: 'To put that point into concrete terms, let me share an example from our pilot workshop.',
    vi: 'Để cụ thể hóa luận điểm đó, hãy để tôi chia sẻ một ví dụ từ buổi tập huấn thí điểm của nhóm.',
    usageTip: 'Dùng khi vừa trình bày khái niệm trừu tượng và muốn đưa ví dụ minh họa thực tế.',
    level: 'B2',
  },
  {
    id: 'pres-ex-16',
    stage: 'Signposting',
    en: 'Wait—before moving ahead, let me briefly clarify one potential misconception about sample selection.',
    vi: 'Khoan đã—trước khi đi tiếp, hãy để tôi làm rõ nhanh một hiểu lầm tiềm ẩn về cách chọn mẫu.',
    usageTip: 'Chủ động giải đáp trước thắc mắc hiển nhiên giúp bạn ghi điểm tư duy phản biện.',
    level: 'B2',
  },
  {
    id: 'pres-ex-17',
    stage: 'Signposting',
    en: 'Now I would like to hand over to my teammate, Linh, who will walk you through the financial projections.',
    vi: 'Bây giờ tôi xin nhường lời cho bạn cùng nhóm là Linh, người sẽ trình bày phần dự báo tài chính.',
    usageTip: 'Câu chuyển lượt (Handover) mượt mà cho thuyết trình nhóm; nhớ gọi tên và nêu rõ phần bạn ấy phụ trách.',
    level: 'B1',
  },
  {
    id: 'pres-ex-18',
    stage: 'Signposting',
    en: 'Building on what Tuan just explained, let us examine how these variables interact in practice.',
    vi: 'Tiếp nối phần Tuấn vừa giải thích, chúng ta hãy xem các biến số này tương tác thế nào trong thực tế.',
    usageTip: 'Người nói tiếp theo nên nối ý từ người trước thay vì mở đầu rời rạc như một bài riêng biệt.',
    level: 'B2',
  },
  {
    id: 'pres-ex-19',
    stage: 'Signposting',
    en: 'Turning to the opposite perspective, critics often question the long-term scalability of this approach.',
    vi: 'Chuyển sang góc nhìn đối lập, các nhà phê bình thường đặt dấu hỏi về khả năng mở rộng dài hạn của cách tiếp cận này.',
    usageTip: 'Dùng khi giới thiệu phần phản biện hoặc hạn chế (Limitations) trong bài thuyết trình.',
    level: 'C1',
  },
  {
    id: 'pres-ex-20',
    stage: 'Signposting',
    en: 'I want to underscore two critical caveats regarding our data collection period.',
    vi: 'Tôi muốn nhấn mạnh hai lưu ý quan trọng liên quan đến giai đoạn thu thập dữ liệu của chúng tôi.',
    usageTip: '"Underscore" đồng nghĩa học thuật với "emphasize", giúp bài nói C1 tự nhiên và sắc nét hơn.',
    level: 'C1',
  },
  {
    id: 'pres-ex-21',
    stage: 'Signposting',
    en: 'If we return briefly to my earlier point on user onboarding, a clear link becomes visible.',
    vi: 'Nếu quay lại nhanh luận điểm ban đầu của tôi về quy trình hướng dẫn người dùng mới, một mối liên hệ rõ rệt sẽ lộ diện.',
    usageTip: 'Kỹ thuật nhắc lại ý cũ (Callback) giúp bài thuyết trình có cấu trúc chặt chẽ thống nhất.',
    level: 'B2',
  },
  {
    id: 'pres-ex-22',
    stage: 'Signposting',
    en: 'For the sake of time, I will skip the intermediate calculations and focus directly on the final model.',
    vi: 'Để tiết kiệm thời gian, tôi xin lướt qua các bước tính trung gian và tập trung thẳng vào mô hình cuối cùng.',
    usageTip: 'Rất hữu ích khi gần hết giờ thuyết trình mà bạn vẫn muốn giữ phần kết trọn vẹn.',
    level: 'B2',
  },
  {
    id: 'pres-ex-23',
    stage: 'Signposting',
    en: 'Next, let us look at the practical implications for university administrators.',
    vi: 'Tiếp theo, hãy cùng xem xét các hàm ý thực tiễn dành cho ban quản lý nhà trường.',
    usageTip: 'Câu chuyển đơn giản, rõ ràng từ phần kết quả sang phần khuyến nghị ứng dụng.',
    level: 'B1',
  },

  // Explaining Data/Visuals (11: pres-ex-24 .. pres-ex-34)
  {
    id: 'pres-ex-24',
    stage: 'Explaining Data/Visuals',
    en: 'If you direct your attention to the upper-right quadrant of this scatter plot, you will notice a tight cluster of outliers.',
    vi: 'Nếu hướng sự chú ý lên góc phần tư phía trên bên phải của biểu đồ phân tán này, quý vị sẽ thấy một cụm điểm ngoại lai tập trung sát nhau.',
    usageTip: 'Chỉ định rõ vị trí trên slide (upper-right quadrant) để khán giả không phải dò tìm mất tập trung.',
    level: 'C1',
  },
  {
    id: 'pres-ex-25',
    stage: 'Explaining Data/Visuals',
    en: 'The blue line tracks retention among weekly learners, whereas the dashed grey line serves as our control baseline.',
    vi: 'Đường màu xanh theo dõi tỷ lệ duy trì của nhóm học hằng tuần, trong khi đường nét đứt màu xám đóng vai trò đường cơ sở đối chứng.',
    usageTip: 'Luôn giải thích ký hiệu màu sắc hoặc đường nét (dashed line / solid line) trước khi đọc xu hướng.',
    level: 'B2',
  },
  {
    id: 'pres-ex-26',
    stage: 'Explaining Data/Visuals',
    en: 'According to this pie chart, nearly two-thirds of respondents cited time constraints as their primary barrier.',
    vi: 'Theo biểu đồ tròn này, gần hai phần ba số người trả lời nêu hạn chế thời gian là rào cản chính của họ.',
    usageTip: 'Quy đổi tỷ lệ phần trăm lẻ (như 65%) thành phân số ước lượng ("nearly two-thirds") giúp người nghe dễ hình dung hơn.',
    level: 'B1',
  },
  {
    id: 'pres-ex-27',
    stage: 'Explaining Data/Visuals',
    en: 'Despite a brief plateau in quarter two, overall adoption accelerated sharply following the mobile update.',
    vi: 'Mặc dù có giai đoạn đi ngang ngắn trong quý hai, mức độ đón nhận chung đã tăng tốc mạnh sau bản cập nhật di động.',
    usageTip: 'Cụm "brief plateau" (đi ngang tạm thời) và "accelerated sharply" (tăng vọt) rất đắt giá khi tả biểu đồ đường.',
    level: 'B2',
  },
  {
    id: 'pres-ex-28',
    stage: 'Explaining Data/Visuals',
    en: 'Let us zoom in on Table Two, which compares accuracy rates across all four machine learning classifiers.',
    vi: 'Hãy phóng lớn vào Bảng 2, nơi đối chiếu tỷ lệ độ chính xác giữa cả bốn bộ phân loại học máy.',
    usageTip: 'Khi slide có bảng nhiều số, hãy bôi màu hàng cao nhất và dùng "zoom in on" để dẫn mắt người xem.',
    level: 'B2',
  },
  {
    id: 'pres-ex-29',
    stage: 'Explaining Data/Visuals',
    en: 'It is important to read these percentages cautiously because the subgroup sample size was relatively small.',
    vi: 'Điều quan trọng là cần đọc các tỷ lệ phần trăm này một cách thận trọng vì cỡ mẫu của nhóm nhỏ tương đối hạn chế.',
    usageTip: 'Thể hiện sự trung thực khoa học (Hedging) khi diễn giải dữ liệu cỡ mẫu nhỏ trước hội đồng.',
    level: 'C1',
  },
  {
    id: 'pres-ex-30',
    stage: 'Explaining Data/Visuals',
    en: 'As illustrated in the flowchart, each submitted assignment passes through two independent peer checks.',
    vi: 'Như được minh họa trong lưu đồ, mỗi bài tập nộp lên đều đi qua hai lượt kiểm tra chéo độc lập từ bạn học.',
    usageTip: 'Dùng "As illustrated in the flowchart" khi mô tả quy trình kỹ thuật hoặc thuật toán từng bước.',
    level: 'B1',
  },
  {
    id: 'pres-ex-31',
    stage: 'Explaining Data/Visuals',
    en: 'The gap between the two cohorts widened by twelve percentage points over the six-month trial.',
    vi: 'Khoảng cách giữa hai nhóm đối tượng đã nới rộng thêm mười hai điểm phần trăm trong suốt sáu tháng thử nghiệm.',
    usageTip: 'Phân biệt chính xác "percentage points" (điểm phần trăm: từ 20% lên 32% là tăng 12 điểm %) với "percent".',
    level: 'C1',
  },
  {
    id: 'pres-ex-32',
    stage: 'Explaining Data/Visuals',
    en: 'This diagram simplifies a complex supply chain into three sequential stages: sourcing, assembly, and distribution.',
    vi: 'Sơ đồ này đơn giản hóa một chuỗi cung ứng phức tạp thành ba giai đoạn nối tiếp: tìm nguồn, lắp ráp và phân phối.',
    usageTip: 'Nhấn mạnh cấu trúc 3 bước giúp người nghe không bị ngợp trước sơ đồ kiến trúc nhiều chi tiết.',
    level: 'B2',
  },
  {
    id: 'pres-ex-33',
    stage: 'Explaining Data/Visuals',
    en: 'Notice the downward trend on the left side of the graph, which corresponds to the post-exam holiday period.',
    vi: 'Hãy chú ý xu hướng đi xuống ở phía bên trái đồ thị, tương ứng với kỳ nghỉ ngay sau mùa thi.',
    usageTip: 'Đừng chỉ mô tả "tăng/giảm"; luôn gắn ngay nguyên nhân thực tế ("which corresponds to...") cho biến động đó.',
    level: 'B1',
  },
  {
    id: 'pres-ex-34',
    stage: 'Explaining Data/Visuals',
    en: 'Taken together, these three metrics reveal a consistent shift from passive viewing toward active participation.',
    vi: 'Khi gộp chung lại, ba chỉ số này cho thấy một sự dịch chuyển nhất quán từ xem thụ động sang tham gia chủ động.',
    usageTip: 'Câu tổng hợp ("Taken together") giúp chốt ý nghĩa chung của nhiều biểu đồ đặt cạnh nhau.',
    level: 'C1',
  },

  // Handling Q&A (11: pres-ex-35 .. pres-ex-45)
  {
    id: 'pres-ex-35',
    stage: 'Handling Q&A',
    en: 'That is a very pertinent question, especially in light of recent budget constraints.',
    vi: 'Đó là một câu hỏi rất xác đáng, đặc biệt khi xét trong bối cảnh hạn chế ngân sách gần đây.',
    usageTip: '"Pertinent" là cách khen lịch sự, học thuật cho một câu hỏi trúng trọng tâm.',
    level: 'C1',
  },
  {
    id: 'pres-ex-36',
    stage: 'Handling Q&A',
    en: 'Could you please repeat the second part of your question? The microphone cut out briefly.',
    vi: 'Bạn vui lòng nhắc lại vế thứ hai của câu hỏi được không? Micro vừa bị ngắt tiếng một chút ạ.',
    usageTip: 'Đừng ngại xin nhắc lại nếu nghe không rõ; việc hiểu đúng câu hỏi quan trọng hơn phản hồi vội.',
    level: 'B1',
  },
  {
    id: 'pres-ex-37',
    stage: 'Handling Q&A',
    en: 'If I may refer back to Slide Seven, the raw breakdown actually appears in the lower table.',
    vi: 'Nếu được phép quay lại Slide 7, bảng phân rã số liệu thô thực tế có hiển thị ở bảng phía dưới ạ.',
    usageTip: 'Chuẩn bị sẵn các slide phụ lục (Backup slides) để mở ra dẫn chứng ngay khi gặp câu hỏi chi tiết.',
    level: 'B2',
  },
  {
    id: 'pres-ex-38',
    stage: 'Handling Q&A',
    en: 'You are right to point out that limitation; we acknowledge that self-reported surveys carry social desirability bias.',
    vi: 'Thầy/cô rất tinh ý khi chỉ ra hạn chế đó; chúng em thừa nhận khảo sát tự điền có thể chịu thiên kiến trả lời đẹp lòng người hỏi.',
    usageTip: 'Khi giám khảo chỉ ra đúng lỗ hổng phương pháp, hãy thẳng thắn công nhận rồi nêu cách nhóm đã giảm thiểu.',
    level: 'C1',
  },
  {
    id: 'pres-ex-39',
    stage: 'Handling Q&A',
    en: 'Let me pass this technical question to my colleague, Hoa, who engineered the database pipeline.',
    vi: 'Tôi xin phép chuyển câu hỏi kỹ thuật này cho bạn cùng nhóm là Hoa, người trực tiếp xây dựng luồng cơ sở dữ liệu.',
    usageTip: 'Cách phân công trả lời Q&A chuyên nghiệp trong thuyết trình nhóm dựa trên thế mạnh từng thành viên.',
    level: 'B1',
  },
  {
    id: 'pres-ex-40',
    stage: 'Handling Q&A',
    en: 'Does that fully address your concern, or would you like me to clarify the regression output further?',
    vi: 'Câu trả lời vừa rồi đã giải đáp thỏa đáng băn khoăn của bạn chưa, hay bạn muốn tôi làm rõ thêm kết quả hồi quy ạ?',
    usageTip: 'Kiểm tra lại sự hài lòng của người hỏi sau khi trả lời thể hiện phong thái chuyên nghiệp, tôn trọng.',
    level: 'B2',
  },
  {
    id: 'pres-ex-41',
    stage: 'Handling Q&A',
    en: 'While I appreciate that alternative view, our pilot data suggests that automation alone rarely improves accuracy without staff training.',
    vi: 'Dù tôi đánh giá cao góc nhìn thay thế đó, dữ liệu thí điểm của chúng tôi cho thấy tự động hóa đơn lẻ hiếm khi cải thiện độ chính xác nếu thiếu đào tạo nhân sự.',
    usageTip: 'Cách bảo vệ lập luận trước câu hỏi phản biện: tôn trọng ý kiến đối diện trước, dùng dữ liệu đáp lại sau.',
    level: 'C1',
  },
  {
    id: 'pres-ex-42',
    stage: 'Handling Q&A',
    en: 'To be completely candid, we did not test that variable in phase one, though we plan to include it in our next iteration.',
    vi: 'Xin chia sẻ thẳng thắn là chúng tôi chưa kiểm thử biến số đó ở giai đoạn một, nhưng dự kiến sẽ đưa vào vòng cải tiến tiếp theo.',
    usageTip: 'Sự trung thực ("To be completely candid") luôn tạo thiện cảm với hội đồng khoa học hơn việc trả lời vòng vo.',
    level: 'B2',
  },
  {
    id: 'pres-ex-43',
    stage: 'Handling Q&A',
    en: 'There are actually two separate issues embedded in your question; let me tackle them one by one.',
    vi: 'Thực ra có hai vấn đề riêng biệt lồng trong câu hỏi của bạn; hãy để tôi giải quyết từng ý một.',
    usageTip: 'Tách câu hỏi dài thành 2 ý nhỏ giúp bạn trả lời có cấu trúc và không bị sót vế sau.',
    level: 'B2',
  },
  {
    id: 'pres-ex-44',
    stage: 'Handling Q&A',
    en: 'In short, yes—provided that local schools receive adequate bandwidth subsidies first.',
    vi: 'Nói ngắn gọn là có—miễn là các trường địa phương được hỗ trợ đủ kinh phí băng thông trước đã.',
    usageTip: 'Trả lời trực diện ("yes" hoặc "no" kèm điều kiện "provided that...") giúp câu trả lời sắc sảo, không lan man.',
    level: 'B2',
  },
  {
    id: 'pres-ex-45',
    stage: 'Handling Q&A',
    en: 'Thank you for that constructive suggestion; we will certainly incorporate it into our final written report.',
    vi: 'Cảm ơn góp ý mang tính xây dựng đó ạ; chúng em chắc chắn sẽ bổ sung nội dung này vào báo cáo viết hoàn chỉnh.',
    usageTip: 'Khi giảng viên góp ý chỉnh sửa chứ không hỏi, hãy ghi chép lại và cảm ơn ngắn gọn.',
    level: 'B1',
  },

  // Concluding (11: pres-ex-46 .. pres-ex-56)
  {
    id: 'pres-ex-46',
    stage: 'Concluding',
    en: 'As we draw to a close, let me briefly recap the three pillars of our proposed solution.',
    vi: 'Khi đi đến phần kết, hãy để tôi điểm lại ngắn gọn ba trụ cột trong giải pháp đề xuất của chúng tôi.',
    usageTip: 'Báo hiệu rõ sắp kết thúc ("As we draw to a close") để kéo sự chú ý của khán giả trở lại.',
    level: 'B2',
  },
  {
    id: 'pres-ex-47',
    stage: 'Concluding',
    en: 'Ultimately, technology is only an enabler; sustainable change depends on consistent human habits.',
    vi: 'Suy cho cùng, công nghệ chỉ là công cụ hỗ trợ; sự thay đổi bền vững phụ thuộc vào thói quen nhất quán của con người.',
    usageTip: 'Kết bài bằng một nhận định triết lý ngắn gọn giúp bài nói đọng lại ấn tượng sâu sắc.',
    level: 'B2',
  },
  {
    id: 'pres-ex-48',
    stage: 'Concluding',
    en: 'To put our findings in perspective, even a five-percent reduction in waste translates into thousands of saved tons annually.',
    vi: 'Để đặt kết quả vào bối cảnh thực tế, ngay cả mức giảm năm phần trăm chất thải cũng quy đổi thành hàng nghìn tấn được tiết kiệm mỗi năm.',
    usageTip: 'Quy đổi con số % trừu tượng thành giá trị thực tiễn ở phần kết tạo sức thuyết phục cao.',
    level: 'C1',
  },
  {
    id: 'pres-ex-49',
    stage: 'Concluding',
    en: 'Looking ahead, future researchers should examine how these patterns evolve across rural campuses.',
    vi: 'Hướng tới tương lai, các nghiên cứu tiếp theo nên xem xét cách những quy luật này biến đổi tại các cơ sở đại học vùng nông thôn.',
    usageTip: 'Đưa ra hướng mở nghiên cứu tiếp theo là chuẩn mực không thể thiếu khi kết thúc bảo vệ khóa luận.',
    level: 'B2',
  },
  {
    id: 'pres-ex-50',
    stage: 'Concluding',
    en: 'That brings me to the end of my presentation. Thank you all for your time and thoughtful engagement.',
    vi: 'Phần trình bày của tôi đến đây xin kết thúc. Xin cảm ơn tất cả quý vị vì thời gian và sự lắng nghe sâu sắc.',
    usageTip: 'Nói dứt khoát, giữ nụ cười và ánh mắt giao tiếp với hội đồng trước khi chuyển sang Q&A.',
    level: 'B1',
  },
  {
    id: 'pres-ex-51',
    stage: 'Concluding',
    en: 'I would like to leave you with one practical challenge: audit your own weekly screen habits before next Monday.',
    vi: 'Tôi muốn gửi lại các bạn một thử thách nhỏ thực tế: hãy tự kiểm tra lại thói quen dùng màn hình trong tuần của mình trước thứ Hai tới.',
    usageTip: 'Lời kêu gọi hành động (Call to Action) rất phù hợp cho các bài thuyết trình dự án cộng đồng hoặc kỹ năng.',
    level: 'B1',
  },
  {
    id: 'pres-ex-52',
    stage: 'Concluding',
    en: 'In closing, our evidence underscores that early peer mentorship yields measurable gains in freshman retention.',
    vi: 'Để khép lại, bằng chứng của chúng tôi nhấn mạnh rằng cố vấn đồng đẳng sớm mang lại cải thiện rõ rệt về tỷ lệ duy trì học tập của sinh viên năm nhất.',
    usageTip: 'Chốt lại đúng luận điểm trung tâm (Thesis) đã nêu từ slide mở đầu để tạo vòng tròn khép kín.',
    level: 'C1',
  },
  {
    id: 'pres-ex-53',
    stage: 'Concluding',
    en: 'On behalf of my entire team, I appreciate this opportunity to share our work and welcome your feedback.',
    vi: 'Thay mặt cả nhóm, tôi trân trọng cơ hội được chia sẻ công trình này và rất mong nhận được phản hồi từ quý vị.',
    usageTip: 'Dùng "On behalf of my entire team" khi bạn là người chốt bài cho phần thuyết trình nhóm.',
    level: 'B1',
  },
  {
    id: 'pres-ex-54',
    stage: 'Concluding',
    en: 'We have compiled our full reference list and appendix datasets in the QR link displayed on this final slide.',
    vi: 'Chúng tôi đã tổng hợp danh mục tài liệu tham khảo đầy đủ và bộ dữ liệu phụ lục trong mã QR hiển thị trên slide cuối này.',
    usageTip: 'Để mã QR hoặc link tài liệu ở slide cuối thay vì nhồi nhét hàng chục dòng chữ nhỏ xíu.',
    level: 'B2',
  },
  {
    id: 'pres-ex-55',
    stage: 'Concluding',
    en: 'Taken as a whole, this pilot demonstrates that low-cost sensors can match commercial benchmarks under campus conditions.',
    vi: 'Nhìn tổng thể, dự án thí điểm này chứng minh rằng các cảm biến chi phí thấp có thể đạt ngang chuẩn thương mại trong điều kiện khuôn viên trường.',
    usageTip: 'Khẳng định giá trị cốt lõi của đồ án kỹ thuật/sản phẩm ngay câu kết.',
    level: 'C1',
  },
  {
    id: 'pres-ex-56',
    stage: 'Concluding',
    en: 'Thank you again; the floor is now open for questions, critiques, or further discussion.',
    vi: 'Xin cảm ơn một lần nữa; bây giờ hội trường xin mở phần đặt câu hỏi, phản biện hoặc thảo luận sâu hơn.',
    usageTip: 'Cụm "the floor is now open" là cách mời hỏi đáp chuyên nghiệp thường dùng tại hội thảo quốc tế.',
    level: 'B2',
  },
];

// =========================================================
// 3. SEMINAR PHRASES EXTRA (40 cụm: sem-ex-1 .. sem-ex-40)
//    10 cụm / category (4 categories)
// =========================================================

export const SEMINAR_PHRASES_EXTRA: SeminarPhrase[] = [
  // Đồng tình & Phát triển ý (10: sem-ex-1 .. sem-ex-10)
  {
    id: 'sem-ex-1',
    category: 'Đồng tình & Phát triển ý',
    en: 'I completely echo Minh’s observation, and I would extend it to explain why retention drops in semester two.',
    vi: 'Tôi hoàn toàn đồng tình với nhận xét của Minh, và xin mở rộng ý đó để giải thích vì sao tỷ lệ duy trì giảm ở học kỳ hai.',
    toneTip: 'Dùng "echo" thay cho "agree with" giúp văn phong thảo luận seminar tinh tế và học thuật hơn.',
  },
  {
    id: 'sem-ex-2',
    category: 'Đồng tình & Phát triển ý',
    en: 'Adding a brief footnote to that point, regulatory delays often compound the cost problem.',
    vi: 'Bổ sung một chú thích nhỏ cho ý đó, sự chậm trễ về thủ tục pháp lý thường làm trầm trọng thêm bài toán chi phí.',
    toneTip: 'Cụm "Adding a brief footnote to..." báo hiệu bạn chỉ góp thêm ý phụ trợ nhanh, không cướp diễn đàn.',
  },
  {
    id: 'sem-ex-3',
    category: 'Đồng tình & Phát triển ý',
    en: 'That resonates strongly with the case study we reviewed last Tuesday on rural clinics.',
    vi: 'Ý đó khớp rất sát với nghiên cứu tình huống chúng ta đã xem hôm thứ Ba tuần trước về các trạm y tế nông thôn.',
    toneTip: 'Kết nối ý bạn học với bài giảng tuần trước chứng tỏ bạn theo dõi xuyên suốt học phần.',
  },
  {
    id: 'sem-ex-4',
    category: 'Đồng tình & Phát triển ý',
    en: 'To reinforce your argument with a local example, several Vietnamese universities have piloted micro-credential badges.',
    vi: 'Để củng cố thêm lập luận của bạn bằng một ví dụ trong nước, nhiều trường đại học Việt Nam đã thí điểm chứng chỉ kỹ năng vi mô.',
    toneTip: 'Đóng góp ví dụ bối cảnh Việt Nam rất được khuyến khích trong các lớp quốc tế hoặc chương trình tiên tiến.',
  },
  {
    id: 'sem-ex-5',
    category: 'Đồng tình & Phát triển ý',
    en: 'You hit on a crucial mechanism there—namely, how peer norms shape individual behavior.',
    vi: 'Bạn vừa chạm đúng một cơ chế then chốt—cụ thể là cách chuẩn mực nhóm bạn định hình hành vi cá nhân.',
    toneTip: 'Tóm gọn lại hạt nhân hay nhất trong lời bạn trước rồi dùng "namely" để đào sâu thêm.',
  },
  {
    id: 'sem-ex-6',
    category: 'Đồng tình & Phát triển ý',
    en: 'Following that exact logic, we might also expect smaller startups to adapt faster than legacy firms.',
    vi: 'Theo đúng mạch logic đó, chúng ta cũng có thể kỳ vọng các startup nhỏ thích nghi nhanh hơn doanh nghiệp lâu đời.',
    toneTip: 'Dùng suy luận tiếp nối ("Following that exact logic") để chứng minh bạn đang tư duy cùng tập thể.',
  },
  {
    id: 'sem-ex-7',
    category: 'Đồng tình & Phát triển ý',
    en: 'That is a valuable distinction; separating short-term relief from structural reform clarifies the whole debate.',
    vi: 'Đó là một sự phân biệt rất giá trị; tách bạch cứu trợ ngắn hạn khỏi cải cách cấu trúc giúp làm sáng tỏ cả cuộc tranh luận.',
    toneTip: 'Khen đúng điểm phân tích sắc bén của bạn học giúp không khí thảo luận cởi mở và xây dựng.',
  },
  {
    id: 'sem-ex-8',
    category: 'Đồng tình & Phát triển ý',
    en: 'I found myself nodding along to your second point, particularly regarding hidden maintenance expenses.',
    vi: 'Tôi thấy mình rất đồng cảm với luận điểm thứ hai của bạn, đặc biệt về các chi phí bảo trì ẩn.',
    toneTip: 'Cách mở đầu tự nhiên, thân thiện trong buổi seminar nhóm nhỏ.',
  },
  {
    id: 'sem-ex-9',
    category: 'Đồng tình & Phát triển ý',
    en: 'Taking your insight one step further, what if we apply that incentive structure to volunteer retention?',
    vi: 'Đẩy ý tưởng của bạn tiến thêm một bước nữa, sẽ ra sao nếu ta áp dụng cơ chế khuyến khích đó cho việc giữ chân tình nguyện viên?',
    toneTip: 'Dùng "Taking your insight one step further" để chuyển từ nhận xét sang đề xuất sáng tạo.',
  },
  {
    id: 'sem-ex-10',
    category: 'Đồng tình & Phát triển ý',
    en: 'Yes, and this ties directly into Chapter Four’s argument about institutional trust.',
    vi: 'Đúng vậy, và điều này gắn trực tiếp với lập luận ở Chương 4 về niềm tin vào thể chế.',
    toneTip: 'Gắn ý kiến trao đổi với giáo trình giúp bạn ghi điểm tham gia thảo luận trên lớp.',
  },

  // Phản biện lịch sự (10: sem-ex-11 .. sem-ex-20)
  {
    id: 'sem-ex-11',
    category: 'Phản biện lịch sự',
    en: 'I appreciate the elegance of that model, yet I wonder if it overlooks informal economic transactions.',
    vi: 'Tôi đánh giá cao sự tinh gọn của mô hình đó, nhưng băn khoăn liệu nó có bỏ sót các giao dịch kinh tế phi chính thức hay không.',
    toneTip: 'Khen ưu điểm ("elegance") trước rồi dùng "I wonder if..." để đặt nghi vấn nhẹ nhàng.',
  },
  {
    id: 'sem-ex-12',
    category: 'Phản biện lịch sự',
    en: 'Perhaps we should be cautious about generalizing those urban findings to remote provinces.',
    vi: 'Có lẽ chúng ta nên thận trọng khi khái quát hóa các kết quả ở đô thị đó sang các tỉnh vùng sâu vùng xa.',
    toneTip: 'Dùng "we" và "perhaps" biến lời phản biện thành lưu ý chung của cả nhóm, giảm tính đối đầu cá nhân.',
  },
  {
    id: 'sem-ex-13',
    category: 'Phản biện lịch sự',
    en: 'I partly agree with your conclusion, though I think the causal arrow might actually point in the opposite direction.',
    vi: 'Tôi đồng ý một phần với kết luận của bạn, dù tôi nghĩ chiều nhân quả thực tế có thể đi theo hướng ngược lại.',
    toneTip: 'Phản biện kinh điển trong nghiên cứu: nghi ngờ chiều tác động ngược (reverse causality).',
  },
  {
    id: 'sem-ex-14',
    category: 'Phản biện lịch sự',
    en: 'With respect, that assumption holds mainly when users already possess stable broadband access.',
    vi: 'Xin phép góp ý thêm, giả định đó chủ yếu chỉ đúng khi người dùng đã có sẵn đường truyền internet ổn định.',
    toneTip: 'Dùng "With respect" kèm chỉ rõ điều kiện biên giúp phản biện vừa lịch sự vừa sắc bén.',
  },
  {
    id: 'sem-ex-15',
    category: 'Phản biện lịch sự',
    en: 'I hear your point on efficiency; however, have we accounted for the equity trade-off?',
    vi: 'Tôi ghi nhận ý của bạn về tính hiệu quả; tuy nhiên, liệu chúng ta đã tính đến sự đánh đổi về công bằng chưa?',
    toneTip: 'Đưa góc nhìn đánh đổi (trade-off) là cách mở rộng chiều sâu tranh luận rất chuẩn học thuật.',
  },
  {
    id: 'sem-ex-16',
    category: 'Phản biện lịch sự',
    en: 'Could it be argued that the drop in scores reflects test fatigue rather than weaker instruction?',
    vi: 'Liệu có thể lập luận rằng sự sụt giảm điểm số phản ánh sự mệt mỏi khi làm bài thi hơn là chất lượng giảng dạy kém đi không?',
    toneTip: 'Cấu trúc bị động "Could it be argued that..." tạo khoảng cách khách quan tuyệt đối.',
  },
  {
    id: 'sem-ex-17',
    category: 'Phản biện lịch sự',
    en: 'While that policy worked well in Singapore, transplanting it directly might face distinct cultural friction here.',
    vi: 'Dù chính sách đó phát huy tốt ở Singapore, việc áp dụng nguyên bản có thể gặp ma sát văn hóa khác biệt tại đây.',
    toneTip: 'Phản biện bằng bối cảnh địa phương (contextual nuance) rất thuyết phục trong các môn chính sách và quản trị.',
  },
  {
    id: 'sem-ex-18',
    category: 'Phản biện lịch sự',
    en: 'I might push back gently on the claim that grades are obsolete; many employers still rely on GPA as an initial filter.',
    vi: 'Tôi xin phép phản biện nhẹ về nhận định rằng điểm số đã lỗi thời; nhiều nhà tuyển dụng vẫn dùng GPA làm bộ lọc ban đầu.',
    toneTip: '"Push back gently" là cụm tự nhiên của người bản ngữ khi muốn đưa ý kiến trái chiều ôn hòa.',
  },
  {
    id: 'sem-ex-19',
    category: 'Phản biện lịch sự',
    en: 'From a methodological standpoint, relying solely on voluntary responses could skew the averages upward.',
    vi: 'Từ góc độ phương pháp luận, chỉ dựa vào phản hồi tự nguyện có thể làm lệch giá trị trung bình theo hướng cao hơn thực tế.',
    toneTip: 'Tập trung phê bình phương pháp (selection bias) thay vì công kích quan điểm cá nhân của bạn học.',
  },
  {
    id: 'sem-ex-20',
    category: 'Phản biện lịch sự',
    en: 'That sounds promising in the short run, yet I remain skeptical about its financial sustainability after grant funding ends.',
    vi: 'Giải pháp đó nghe đầy hứa hẹn trong ngắn hạn, nhưng tôi vẫn còn hoài nghi về tính bền vững tài chính sau khi nguồn tài trợ kết thúc.',
    toneTip: 'Đặt câu hỏi về tính bền vững hậu dự án thể hiện tư duy thực tế của người làm nghiên cứu.',
  },

  // Hỏi làm rõ & Đào sâu (10: sem-ex-21 .. sem-ex-30)
  {
    id: 'sem-ex-21',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'Could you unpack what you mean by "algorithmic fairness" in this specific hiring context?',
    vi: 'Bạn có thể bóc tách rõ hơn ý bạn khi nói "tính công bằng thuật toán" trong bối cảnh tuyển dụng cụ thể này không?',
    toneTip: 'Động từ "unpack" rất phổ biến trong seminar học thuật, nghĩa là giải thích chi tiết một khái niệm phức tạp.',
  },
  {
    id: 'sem-ex-22',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'Just to clarify, are you referring to absolute poverty rates or relative income inequality?',
    vi: 'Để làm rõ thôi, bạn đang nhắc tới tỷ lệ nghèo tuyệt đối hay bất bình đẳng thu nhập tương đối vậy?',
    toneTip: 'Hỏi phân biệt hai khái niệm gần nhau giúp cả lớp tránh tranh luận "ông nói gà bà nói vịt".',
  },
  {
    id: 'sem-ex-23',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'How did the authors operationalize "student well-being" in their questionnaire?',
    vi: 'Các tác giả đã đo lường hóa khái niệm "sức khỏe tinh thần sinh viên" trong bảng hỏi bằng chỉ báo cụ thể nào vậy?',
    toneTip: '"Operationalize" là từ khóa vàng khi thảo luận bài báo khoa học thực nghiệm.',
  },
  {
    id: 'sem-ex-24',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'What makes this intervention different from earlier peer-tutoring programs tried in the nineties?',
    vi: 'Điều gì khiến biện pháp can thiệp này khác biệt so với các chương trình gia sư đồng đẳng từng thử nghiệm vào thập niên 90?',
    toneTip: 'Hỏi về tính mới so với nghiên cứu tiền nhiệm giúp đào sâu giá trị học thuật.',
  },
  {
    id: 'sem-ex-25',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'Am I right in thinking that your model assumes constant interest rates throughout the forecast window?',
    vi: 'Tôi hiểu rằng mô hình của bạn giả định lãi suất không đổi trong suốt khung thời gian dự báo có đúng không?',
    toneTip: 'Dùng "Am I right in thinking that..." để xác nhận giả định ngầm một cách nhã nhặn.',
  },
  {
    id: 'sem-ex-26',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'Could you walk us through how that outlier affected the overall regression slope?',
    vi: 'Bạn có thể giải thích nhanh cho cả nhóm xem điểm ngoại lai đó đã tác động thế nào tới độ dốc đường hồi quy chung không?',
    toneTip: 'Đào sâu vào chi tiết xử lý dữ liệu giúp cuộc thảo luận vượt khỏi mức tóm tắt bề mặt.',
  },
  {
    id: 'sem-ex-27',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'Why do you think the control group showed nearly identical gains during the first four weeks?',
    vi: 'Theo bạn vì sao nhóm đối chứng cũng cho thấy mức tiến bộ gần như tương đương trong bốn tuần đầu tiên?',
    toneTip: 'Đặt câu hỏi mở ("Why do you think...") khuyến khích bạn học suy luận sâu hơn thay vì chỉ trả lời Có/Không.',
  },
  {
    id: 'sem-ex-28',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'Who stands to lose the most if this carbon-pricing mechanism is enacted without rebates?',
    vi: 'Nhóm đối tượng nào có nguy cơ chịu thiệt thòi lớn nhất nếu cơ chế định giá carbon này được ban hành mà không kèm khoản hoàn trả?',
    toneTip: 'Câu hỏi phân tích tác động phân phối (distributional impact) rất giá trị trong seminar kinh tế – xã hội.',
  },
  {
    id: 'sem-ex-29',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'Would your conclusion change if we looked at median income rather than the mean?',
    vi: 'Liệu kết luận của bạn có thay đổi nếu chúng ta xét thu nhập trung vị thay vì thu nhập trung bình không?',
    toneTip: 'Kiểm tra sự khác biệt giữa Mean (trung bình) và Median (trung vị) luôn là câu hỏi sắc bén.',
  },
  {
    id: 'sem-ex-30',
    category: 'Hỏi làm rõ & Đào sâu',
    en: 'At what threshold does additional regulation begin to stifle small-business innovation?',
    vi: 'Đến ngưỡng nào thì việc siết thêm quy định bắt đầu kìm hãm sự đổi mới của doanh nghiệp nhỏ?',
    toneTip: 'Hỏi về "ngưỡng giới hạn" (threshold) giúp tránh tư duy nhị nguyên đúng/sai tuyệt đối.',
  },

  // Dẫn chứng & Điều phối (10: sem-ex-31 .. sem-ex-40)
  {
    id: 'sem-ex-31',
    category: 'Dẫn chứng & Điều phối',
    en: 'If we check page fourteen of the assigned paper, the authors explicitly report a p-value below zero point zero one.',
    vi: 'Nếu xem lại trang 14 của bài báo được giao, các tác giả nêu rõ giá trị p dưới 0,01.',
    toneTip: 'Dẫn chính xác số trang hoặc bảng biểu trong tài liệu đọc giúp chốt tranh luận nhanh gọn bằng bằng chứng.',
  },
  {
    id: 'sem-ex-32',
    category: 'Dẫn chứng & Điều phối',
    en: 'To synthesize what we have heard so far, the group seems split between regulatory speed and privacy safeguards.',
    vi: 'Để tổng hợp những gì chúng ta vừa nghe tới lúc này, cả nhóm dường như đang chia thành hai hướng: tốc độ quản lý và bảo vệ quyền riêng tư.',
    toneTip: 'Kỹ năng tóm tắt giữa giờ (Mid-discussion synthesis) rất nổi bật nếu bạn làm nhóm trưởng seminar.',
  },
  {
    id: 'sem-ex-33',
    category: 'Dẫn chứng & Điều phối',
    en: 'Before we drift too far from the core prompt, could we reconnect this example to the theme of urban resilience?',
    vi: 'Trước khi đi quá xa khỏi đề bài trọng tâm, chúng ta có thể kết nối lại ví dụ này với chủ đề khả năng chống chịu đô thị được không?',
    toneTip: 'Điều phối nhóm quay về đúng chủ đề một cách nhẹ nhàng mà không làm người vừa nói bị mất mặt.',
  },
  {
    id: 'sem-ex-34',
    category: 'Dẫn chứng & Điều phối',
    en: 'Since we only have five minutes remaining, shall we agree on our top two recommendations for the class summary?',
    vi: 'Vì chúng ta chỉ còn năm phút nữa, cả nhóm thống nhất chọn hai kiến nghị hàng đầu để báo cáo trước lớp nhé?',
    toneTip: 'Nhắc thời gian khéo léo và chuyển sang bước chốt kết quả thảo luận nhóm.',
  },
  {
    id: 'sem-ex-35',
    category: 'Dẫn chứng & Điều phối',
    en: 'Data from the latest World Bank brief reinforces this trend, showing a twelve-percent rise in digital payments.',
    vi: 'Số liệu từ bản tin mới nhất của Ngân hàng Thế giới củng cố xu hướng này, cho thấy mức tăng 12% ở thanh toán số.',
    toneTip: 'Trích nguồn tổ chức uy tín (World Bank, OECD, UNESCO) giúp lập luận nhóm tăng độ tin cậy.',
  },
  {
    id: 'sem-ex-36',
    category: 'Dẫn chứng & Điều phối',
    en: 'Let us make sure both perspectives are captured fairly in our group’s final slide.',
    vi: 'Hãy đảm bảo cả hai góc nhìn trái chiều đều được ghi nhận công bằng trên slide tổng kết của nhóm.',
    toneTip: 'Thể hiện tinh thần hợp tác và trung thực học thuật khi tổng hợp ý kiến đa chiều.',
  },
  {
    id: 'sem-ex-37',
    category: 'Dẫn chứng & Điều phối',
    en: 'An, you mentioned working in retail last summer—how did that look from the store floor?',
    vi: 'An ơi, bạn từng kể hè năm ngoái có đi làm bán lẻ—thực tế tại cửa hàng khi đó diễn ra thế nào vậy?',
    toneTip: 'Kéo thành viên ít nói vào cuộc bằng cách hỏi đúng trải nghiệm liên quan của họ.',
  },
  {
    id: 'sem-ex-38',
    category: 'Dẫn chứng & Điều phối',
    en: 'Contrasting Smith’s 2019 study with Tran’s recent survey reveals how rapidly attitudes shifted post-pandemic.',
    vi: 'Đối chiếu nghiên cứu năm 2019 của Smith với khảo sát gần đây của Tran cho thấy thái độ đã thay đổi nhanh thế nào sau đại dịch.',
    toneTip: 'Tổng hợp chéo hai nguồn tài liệu khác nhau là dấu hiệu của tư duy học thuật bậc cao.',
  },
  {
    id: 'sem-ex-39',
    category: 'Dẫn chứng & Điều phối',
    en: 'Could someone jot down these three action items while we finalize the division of slides?',
    vi: 'Có bạn nào ghi nhanh ba đầu việc này lại giúp nhóm trong lúc chúng ta chốt phần chia slide không?',
    toneTip: 'Phân công thư ký ghi biên bản thảo luận giúp cuộc họp nhóm kết thúc với hành động rõ ràng.',
  },
  {
    id: 'sem-ex-40',
    category: 'Dẫn chứng & Điều phối',
    en: 'On that note, let us wrap up our subgroup discussion and prepare to share our consensus with the seminar.',
    vi: 'Với ý chốt đó, hãy khép lại phần thảo luận nhóm nhỏ của chúng ta và chuẩn bị chia sẻ đồng thuận với cả lớp seminar.',
    toneTip: 'Câu kết gọn gàng, lịch sự khi chuyển từ thảo luận nhóm sang trình bày trước lớp.',
  },
];

// =========================================================
// 4. GRADUATION QUIZ EXTRA (52 câu: grad-ex-1 .. grad-ex-52)
//    correctIndex phân bố ĐỀU: 0 (13), 1 (13), 2 (13), 3 (13)
//    4 categories x 13 câu = 52 câu
// =========================================================

export const GRADUATION_QUIZ_EXTRA: GraduationQuizQuestion[] = [
  // Category 1: Quy đổi chuẩn đầu ra (13 câu: grad-ex-1 .. grad-ex-13)
  {
    id: 'grad-ex-1',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Theo thang điểm 10 của kỳ thi VSTEP, thí sinh cần đạt tối thiểu bao nhiêu điểm để được công nhận trình độ B1 (Bậc 3)?',
    options: ['4.0 / 10 (làm tròn theo quy chế 0.5)', '3.0 / 10', '5.5 / 10', '6.0 / 10'],
    correctIndex: 0,
    explanationVi: 'Theo quy chế VSTEP, điểm trung bình 4 kỹ năng làm tròn đến 0.5 từ 4.0–5.5 đạt Bậc 3 (B1); 6.0–8.0 đạt Bậc 4 (B2); 8.5–10.0 đạt Bậc 5 (C1).',
  },
  {
    id: 'grad-ex-2',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Điểm VSTEP từ 8.5 đến 10.0/10 tương ứng với trình độ nào theo Khung năng lực ngoại ngữ 6 bậc VN?',
    options: ['Bậc 3 (B1)', 'Bậc 5 (C1)', 'Bậc 4 (B2)', 'Bậc 6 (C2)'],
    correctIndex: 1,
    explanationVi: 'Bài thi VSTEP đánh giá 3 bậc (Bậc 3–5): từ 8.5–10.0 tương ứng Bậc 5 (C1).',
  },
  {
    id: 'grad-ex-3',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Chứng chỉ IELTS Academic đạt mức điểm 5.5 thường được các trường ĐH Việt Nam quy đổi tương đương bậc CEFR nào?',
    options: ['A2', 'C1', 'B2 (hoặc B1 cao tùy quy định từng trường)', 'C2'],
    correctIndex: 2,
    explanationVi: 'Theo thang quy đổi của Hội đồng Anh/CEFR, IELTS 5.5–6.5 nằm trong dải B2 (một số trường yêu cầu 6.0 cho B2 và chấp nhận 5.0–5.5 cho B1/B2 đầu vào).',
  },
  {
    id: 'grad-ex-4',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Chứng chỉ Cambridge English nào tương ứng với chuẩn đầu ra B2 (Trung cao cấp)?',
    options: ['A2 Key (KET)', 'B1 Preliminary (PET)', 'IELTS General 4.0', 'B2 First (FCE)'],
    correctIndex: 3,
    explanationVi: 'Hệ thống Cambridge xếp thứ tự: KET (A2), PET (B1), FCE (B2), CAE (C1), CPE (C2).',
  },
  {
    id: 'grad-ex-5',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Thang điểm tối đa của bài thi TOEIC Listening & Reading (2 kỹ năng) là bao nhiêu?',
    options: ['990 điểm (495 Nghe + 495 Đọc)', '400 điểm', '120 điểm', '9.0 điểm'],
    correctIndex: 0,
    explanationVi: 'TOEIC L&R có thang điểm từ 10 đến 990 (mỗi kỹ năng tối đa 495). Thang 400 (200+200) là của TOEIC Speaking & Writing.',
  },
  {
    id: 'grad-ex-6',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Khi trường ĐH yêu cầu chuẩn đầu ra "TOEIC 4 kỹ năng", hai phần thi bổ sung ngoài Nghe & Đọc là gì và có thang điểm tối đa bao nhiêu mỗi phần?',
    options: [
      'Grammar & Vocabulary (tối đa 100 mỗi phần)',
      'Speaking & Writing (tối đa 200 điểm mỗi phần, tổng 400)',
      'Translation & Presentation (tối đa 500 mỗi phần)',
      'Essay & Interview (tối đa 10.0)',
    ],
    correctIndex: 1,
    explanationVi: 'TOEIC 4 kỹ năng gồm L&R (990 điểm) và S&W (Speaking tối đa 200, Writing tối đa 200).',
  },
  {
    id: 'grad-ex-7',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Thời hạn hiệu lực tiêu chuẩn của chứng chỉ IELTS, TOEFL iBT và TOEIC quốc tế là bao lâu kể từ ngày thi?',
    options: ['1 năm', '5 năm', '2 năm', 'Vĩnh viễn'],
    correctIndex: 2,
    explanationVi: 'IELTS, TOEFL iBT và TOEIC đều có thời hạn giá trị chính thức là 2 năm kể từ ngày cấp/ngày thi.',
  },
  {
    id: 'grad-ex-8',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Khi xét miễn học phần tiếng Anh đầu khóa hoặc xét chuẩn đầu ra tốt nghiệp ĐH, sinh viên cần kiểm tra điều kiện nào trước tiên?',
    options: [
      'Chỉ cần điểm tổng cao, không cần quan tâm ngày hết hạn chứng chỉ',
      'Thi chứng chỉ nào rẻ nhất bất kể trường có công nhận hay không',
      'Nộp bản chụp màn hình kết quả thi thử online miễn phí',
      'Quy định danh mục chứng chỉ được trường chấp nhận, điểm sàn từng kỹ năng và thời hạn nộp bản gốc đối chiếu',
    ],
    correctIndex: 3,
    explanationVi: 'Mỗi trường ĐH có danh mục chứng chỉ nội bộ/quốc tế riêng, thời hạn hiệu lực tính đến ngày xét tốt nghiệp và có thể yêu cầu không có kỹ năng liệt.',
  },
  {
    id: 'grad-ex-9',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Với mục tiêu du học bậc Đại học hoặc Thạc sĩ bằng tiếng Anh, loại hình IELTS nào được các trường đại học nước ngoài yêu cầu?',
    options: [
      'IELTS Academic',
      'IELTS General Training',
      'IELTS Life Skills A1',
      'TOEIC 2 kỹ năng Listening & Reading',
    ],
    correctIndex: 0,
    explanationVi: 'IELTS Academic kiểm tra kỹ năng đọc – viết học thuật phục vụ tuyển sinh ĐH/Sau ĐH, còn General Training dùng cho mục đích định cư hoặc lao động phổ thông.',
  },
  {
    id: 'grad-ex-10',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Điểm TOEFL iBT từ khoảng 72 đến 94 thường tương ứng với bậc CEFR nào?',
    options: ['A2 (Sơ cấp)', 'B2 (Trung cao cấp)', 'B1 (Trung cấp)', 'C2 (Thành thạo)'],
    correctIndex: 1,
    explanationVi: 'Theo bảng đối chiếu của ETS, TOEFL iBT 72–94 tương đương trình độ B2; từ 95 trở lên tương đương C1.',
  },
  {
    id: 'grad-ex-11',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Sinh viên ngành Ngôn ngữ Anh hoặc Sư phạm Tiếng Anh ở Việt Nam thường phải đạt chuẩn đầu ra tối thiểu ở bậc nào theo Khung 6 bậc?',
    options: ['Bậc 2 (A2)', 'Bậc 3 (B1)', 'Bậc 5 (C1)', 'Bậc 1 (A1)'],
    correctIndex: 2,
    explanationVi: 'Sinh viên không chuyên thường yêu cầu Bậc 3 (B1) hoặc Bậc 4 (B2 cho CLC), trong khi sinh viên chuyên ngữ/sư phạm tiếng Anh thường yêu cầu Bậc 5 (C1).',
  },
  {
    id: 'grad-ex-12',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Nếu bạn dự kiến tốt nghiệp vào tháng 6 năm thứ 4 nhưng thi IELTS ngay từ đầu năm thứ 1 (cách 3,5 năm), rủi ro nào có thể xảy ra?',
    options: [
      'Điểm IELTS tự động tăng thêm 0.5 sau mỗi năm',
      'Không được đăng ký thi lại lần hai',
      'Bằng đại học sẽ không ghi ngành học',
      'Chứng chỉ hết hạn 2 năm trước kỳ xét tốt nghiệp nếu trường không cho bảo lưu miễn học phần ngay từ năm nhất',
    ],
    correctIndex: 3,
    explanationVi: 'IELTS/TOEIC chỉ có hạn 2 năm. Bạn nên nộp để miễn học phần sớm (nếu trường hỗ trợ) hoặc canh thi vào cuối năm 2 – năm 3 để còn hạn khi xét tốt nghiệp.',
  },
  {
    id: 'grad-ex-13',
    category: 'Quy đổi chuẩn đầu ra',
    question: 'Khác biệt lớn nhất về kỹ năng đánh giá giữa VSTEP và TOEIC L&R truyền thống là gì?',
    options: [
      'VSTEP đánh giá đủ 4 kỹ năng (Nghe, Nói, Đọc, Viết), còn TOEIC L&R chỉ kiểm tra Nghe & Đọc',
      'VSTEP không có phần Nghe hiểu',
      'TOEIC L&R bắt buộc phải thuyết trình trực tiếp với giám khảo',
      'VSTEP chỉ dành cho học sinh tiểu học',
    ],
    correctIndex: 0,
    explanationVi: 'VSTEP là bài thi đánh giá năng lực 4 kỹ năng trọn vẹn, trong khi TOEIC L&R chỉ gồm 200 câu trắc nghiệm Nghe và Đọc.',
  },

  // Category 2: Chiến thuật thi (13 câu: grad-ex-14 .. grad-ex-26)
  {
    id: 'grad-ex-14',
    category: 'Chiến thuật thi',
    question: 'Trong bài thi VSTEP Writing, Task 2 (bài luận khoảng 250 từ) chiếm tỷ trọng điểm như thế nào so với Task 1 (viết thư/email)?',
    options: [
      'Bằng 1/2 điểm của Task 1',
      'Chiếm 2/3 tổng điểm bài thi Viết (gấp đôi Task 1)',
      'Chiếm 10% tổng điểm bài thi Viết',
      'Không tính điểm nếu làm xong Task 1',
    ],
    correctIndex: 1,
    explanationVi: 'Trong VSTEP Writing (60 phút), Task 2 chiếm 2/3 tổng điểm. Thí sinh nên dành khoảng 40 phút cho Task 2 và 20 phút cho Task 1.',
  },
  {
    id: 'grad-ex-15',
    category: 'Chiến thuật thi',
    question: 'Khi làm bài thi TOEIC Reading (Part 5, 6, 7 trong 75 phút), chiến thuật phân bổ thời gian nào giúp tránh bị thiếu giờ ở các bài đọc dài cuối đề?',
    options: [
      'Dành 50 phút cho Part 5 và 25 phút cho Part 6 & 7',
      'Đọc dịch từng chữ mọi văn bản ở Part 7 trước khi xem câu hỏi',
      'Giải quyết nhanh Part 5–6 trong khoảng 18–22 phút để dành hơn 50 phút cho Part 7',
      'Bỏ trống các câu không chắc chắn vì bị trừ điểm câu sai',
    ],
    correctIndex: 2,
    explanationVi: 'Part 5–6 gồm 46 câu ngữ pháp/từ vựng ngắn có thể xử lý nhanh (~20 phút), nhường phần lớn thời gian cho 54 câu đọc hiểu Part 7. TOEIC không trừ điểm câu sai.',
  },
  {
    id: 'grad-ex-16',
    category: 'Chiến thuật thi',
    question: 'Trong IELTS Speaking Part 3 (thảo luận trừu tượng), nếu nhận được câu hỏi khó chưa kịp nghĩ ra ý, cách xử lý nào tự nhiên và giữ được điểm Fluency?',
    options: [
      'Im lặng hoàn toàn 20 giây cho tới khi nghĩ xong cả 3 ý',
      'Xin giám khảo đổi sang câu hỏi khác dễ hơn',
      'Nói "I don’t know" rồi dừng trả lời',
      'Dùng cụm câu giờ tự nhiên (ví dụ: "That’s an interesting angle; off the top of my head, I’d say...") rồi triển khai theo hướng Nguyên nhân – Ví dụ',
    ],
    correctIndex: 3,
    explanationVi: 'Dùng filler học thuật tự nhiên giúp bạn có 2–3 giây tổ chức ý mà không tạo khoảng lặng chết hay làm đứt mạch trôi chảy.',
  },
  {
    id: 'grad-ex-17',
    category: 'Chiến thuật thi',
    question: 'Lỗi phổ biến nhất khiến nhiều thí sinh mất điểm oan ở IELTS Reading dạng câu hỏi True / False / Not Given là gì?',
    options: [
      'Suy diễn dựa vào kiến thức nền ngoài bài đọc để chọn True/False thay vì bám sát xem văn bản có thực sự đề cập hay không',
      'Viết hoa chữ cái đầu của từ True',
      'Đọc câu hỏi trước khi đọc đoạn văn',
      'Gạch chân từ khóa trong câu hỏi',
    ],
    correctIndex: 0,
    explanationVi: 'Nếu bài đọc không khẳng định cũng không phủ định chi tiết đó, đáp án phải là Not Given dù ngoài đời điều đó hiển nhiên đúng.',
  },
  {
    id: 'grad-ex-18',
    category: 'Chiến thuật thi',
    question: 'Trong phần VSTEP Speaking Part 2 (Solution Discussion — lựa chọn 1 trong 3 giải pháp), cấu trúc trả lời nào ghi điểm cao nhất trong 3 phút?',
    options: [
      'Chỉ đọc lại nguyên văn tên 3 lựa chọn rồi chọn bừa 1 phương án',
      'Nêu lựa chọn tối ưu + giải thích 2 lý do chọn + giải thích ngắn gọn vì sao 2 phương án còn lại kém phù hợp hơn',
      'Phân tích sâu 1 phương án và quên nhắc tới 2 phương án kia',
      'Hỏi ngược lại giám khảo xem giám khảo thích phương án nào',
    ],
    correctIndex: 1,
    explanationVi: 'Tiêu chí chấm VSTEP Part 2 đánh giá khả năng lập luận so sánh: phải nêu được cả lý do chọn phương án A và lý do không chọn B, C.',
  },
  {
    id: 'grad-ex-19',
    category: 'Chiến thuật thi',
    question: 'Khi nghe bài giảng học thuật dài (như TOEFL iBT Listening hoặc IELTS Section 4), cách ghi chú (note-taking) nào hiệu quả nhất?',
    options: [
      'Cố gắng chép nguyên văn từng câu người nói phát âm',
      'Không cần ghi chú bất cứ thứ gì để tập trung nhìn màn hình',
      'Dùng ký hiệu viết tắt, mũi tên nguyên nhân–kết quả và tập trung bắt các từ chuyển ý, ví dụ minh họa, sự thay đổi quan điểm',
      'Chỉ chép lại các từ vựng lạ để tra từ điển sau khi thi',
    ],
    correctIndex: 2,
    explanationVi: 'Chép nguyên văn sẽ khiến bạn lỡ đoạn sau. Ghi chú theo cấu trúc ý chính – ví dụ – chuyển hướng bằng ký hiệu ngắn giữ mạch nghe tốt nhất.',
  },
  {
    id: 'grad-ex-20',
    category: 'Chiến thuật thi',
    question: 'Với bài thi IELTS Writing Task 2, nếu thí sinh chỉ viết được khoảng 180 từ (dưới mức tối thiểu 250 từ), điều gì sẽ ảnh hưởng trực tiếp tới điểm số?',
    options: [
      'Bài thi bị hủy ngay lập tức không chấm',
      'Chỉ bị trừ ở tiêu chí Chính tả',
      'Không ảnh hưởng gì nếu dùng nhiều từ khó C2',
      'Bị đánh giá thiếu phát triển ý sâu ở tiêu chí Task Response, khó vượt ngưỡng band cao',
    ],
    correctIndex: 3,
    explanationVi: 'Bài quá ngắn dưới 250 từ thường không đủ độ sâu lập luận và ví dụ để đạt band 6.5+ ở tiêu chí Task Response.',
  },
  {
    id: 'grad-ex-21',
    category: 'Chiến thuật thi',
    question: 'Khi làm bài thi Nghe TOEIC Part 3 & Part 4 (hội thoại và bài nói ngắn), bạn nên tận dụng khoảng thời gian trống giữa các câu hỏi để làm gì?',
    options: [
      'Đọc lướt trước 3 câu hỏi và từ khóa đáp án của đoạn hội thoại kế tiếp để định hướng thông tin cần nghe',
      'Ngồi kiểm tra lại đáp án của Part 1 đã tô xong',
      'Nhắm mắt nghỉ ngơi hoàn toàn tới khi băng đọc câu hỏi mới bắt đầu đọc',
      'Tô đáp án thật chậm để đỡ nhầm ô',
    ],
    correctIndex: 0,
    explanationVi: 'Đọc trước (Previewing) 3 câu hỏi giúp não bộ "bắt sóng" đúng thông tin mục tiêu (ai, ở đâu, yêu cầu gì, bước tiếp theo là gì) ngay khi băng chạy.',
  },
  {
    id: 'grad-ex-22',
    category: 'Chiến thuật thi',
    question: 'Trong bài thi nói trên máy tính (như VSTEP Speaking hoặc TOEIC Speaking), thói quen nào giúp chất lượng file ghi âm rõ nét và ít mất điểm phát âm nhất?',
    options: [
      'Đặt micro chạm sát vào môi và nói thật nhanh để kịp giờ',
      'Chỉnh micro cách miệng khoảng 2–3 ngón tay, nói tốc độ vừa phải, tách rõ âm cuối (-s, -ed, -t) và ngắt nhịp theo cụm ý',
      'Nói thì thầm để không làm ảnh hưởng thí sinh bên cạnh',
      'Đọc liền một hơi không nghỉ dấu phẩy hay dấu chấm',
    ],
    correctIndex: 1,
    explanationVi: 'Micro đặt quá sát gây rè hơi bật (/p/, /t/); nói vừa phải, rõ âm cuối và ngắt nghỉ đúng cụm giúp giám khảo chấm ghi âm nghe rõ từng từ.',
  },
  {
    id: 'grad-ex-23',
    category: 'Chiến thuật thi',
    question: 'Trong IELTS Writing Task 1 (mô tả biểu đồ), lỗi sai nghiêm trọng khiến thí sinh bị kẹt ở mức band 5.0–5.5 là gì?',
    options: [
      'Dùng thì quá khứ đơn cho số liệu năm 2015',
      'Chia phần thân bài thành 2 đoạn logic',
      'Thiếu đoạn Overview (tổng quan xu hướng nổi bật nhất) hoặc tự suy diễn nguyên nhân bên ngoài không có trong biểu đồ',
      'So sánh số liệu cao nhất và thấp nhất',
    ],
    correctIndex: 2,
    explanationVi: 'Task 1 bắt buộc phải có Overview nêu xu hướng chung/điểm nổi bật mà không đưa số liệu quá chi tiết, và tuyệt đối không tự bịa nguyên nhân ngoài biểu đồ.',
  },
  {
    id: 'grad-ex-24',
    category: 'Chiến thuật thi',
    question: 'Khi gặp một câu hỏi từ vựng hoặc ngữ pháp khó trong bài thi trắc nghiệm có giới hạn thời gian chặt, cách xử lý khôn ngoan nhất là gì?',
    options: [
      'Dừng lại 5 phút suy nghĩ cho bằng ra trước khi chuyển câu',
      'Bỏ qua câu đó luôn và để trống ô đáp án trên phiếu trả lời',
      'Chép lại câu hỏi vào nháp để hỏi bạn sau giờ thi',
      'Loại trừ 1–2 phương án chắc chắn sai, chọn tạm phương án hợp lý nhất và đánh dấu nhẹ để quay lại nếu còn dư giờ',
    ],
    correctIndex: 3,
    explanationVi: 'Mỗi câu trắc nghiệm thường có trọng số bằng nhau; không nên để 1 câu khó cướp mất thời gian của 5 câu dễ phía sau.',
  },
  {
    id: 'grad-ex-25',
    category: 'Chiến thuật thi',
    question: 'Trong VSTEP Speaking Part 3 (Topic Development), đề bài luôn cung cấp sẵn một sơ đồ tư duy (mind map) với 3 gợi ý xung quanh chủ đề chính. Thí sinh nên dùng sơ đồ này thế nào?',
    options: [
      'Triển khai mạch lạc cả 3 nhánh gợi ý (có thể thêm ý riêng), dùng từ nối chuyển ý rõ ràng và trả lời thêm các câu hỏi mở rộng cuối phần',
      'Chỉ chọn đúng 1 nhánh để nói rồi kết thúc sau 30 giây',
      'Đọc nguyên văn 3 cụm từ trên màn hình mà không giải thích thêm',
      'Bỏ qua hoàn toàn chủ đề trên màn hình để kể về sở thích cá nhân',
    ],
    correctIndex: 0,
    explanationVi: 'Phát triển đủ 3 nhánh kèm giải thích/ví dụ cụ thể giúp bài nói dài khoảng 2–3 phút, logic và đáp ứng tốt các câu hỏi follow-up của đề.',
  },
  {
    id: 'grad-ex-26',
    category: 'Chiến thuật thi',
    question: 'Trước ngày thi chứng chỉ quốc tế 1 tuần, phương pháp ôn tập nào mang lại hiệu quả thực tế cao nhất?',
    options: [
      'Cố nhồi nhét thêm 500 từ vựng hiếm ít gặp mỗi ngày',
      'Làm đề thi thử đúng áp lực thời gian thật, rà soát kỹ các lỗi sai lặp lại và giữ nhịp ngủ nghỉ ổn định',
      'Thức trắng đêm trước ngày thi để học tủ bài mẫu Writing',
      'Chỉ xem video giải trí không luyện đề nào',
    ],
    correctIndex: 1,
    explanationVi: 'Tuần cuối là giai đoạn tối ưu chiến thuật, quản lý thời gian làm bài và sửa lỗi sai cố hữu (chính tả, chia thì, bẫy nghe) thay vì học nhồi kiến thức mới.',
  },

  // Category 3: CV chuẩn ATS (13 câu: grad-ex-27 .. grad-ex-39)
  {
    id: 'grad-ex-27',
    category: 'CV chuẩn ATS',
    question: 'Hệ thống ATS (Applicant Tracking System) sử dụng CV của ứng viên theo cơ chế chính nào?',
    options: [
      'Chấm điểm dựa trên độ rực rỡ của màu sắc và hình ảnh trang trí',
      'Tự động loại mọi CV viết bằng tiếng Anh',
      'Phân tích cú pháp văn bản (parse text), xếp loại theo các mục tiêu chuẩn và đối chiếu từ khóa kỹ năng với mô tả công việc (JD)',
      'Chỉ đọc trang cuối cùng của hồ sơ',
    ],
    correctIndex: 2,
    explanationVi: 'ATS trích xuất văn bản thuần từ file CV và tìm các từ khóa chuyên môn, chức danh, kỹ năng khớp với JD để nhà tuyển dụng lọc hồ sơ nhanh.',
  },
  {
    id: 'grad-ex-28',
    category: 'CV chuẩn ATS',
    question: 'Định dạng file và quy tắc đặt tên file CV nào chuyên nghiệp và thân thiện nhất với hầu hết các hệ thống ATS?',
    options: [
      'Xuất file ảnh .JPG và đặt tên là "CV_moi_nhat_final2.jpg"',
      'Gửi file nén .RAR chứa 4 file Word rời nhau',
      'Đặt tên file chung chung là "Resume.pdf" không ghi tên mình',
      'File .PDF chuẩn văn bản (có thể bôi đen copy chữ) hoặc .DOCX, đặt tên rõ ràng kiểu "Nguyen-Minh-Anh_Data-Analyst-Intern_CV.pdf"',
    ],
    correctIndex: 3,
    explanationVi: 'File PDF xuất từ văn bản (không phải ảnh scan) giữ nguyên bố cục mà ATS vẫn đọc được text; tên file có họ tên + vị trí giúp HR tìm lại ngay lập tức.',
  },
  {
    id: 'grad-ex-29',
    category: 'CV chuẩn ATS',
    question: 'Với sinh viên mới ra trường hoặc ứng tuyển thực tập (0–1 năm kinh nghiệm), độ dài CV lý tưởng là bao nhiêu?',
    options: [
      'Gọn gàng trong đúng 1 trang A4',
      'Tối thiểu 3–4 trang A4 để kể hết mọi hoạt động từ cấp 2',
      'Nửa trang A4 chỉ ghi tên và số điện thoại',
      '5 trang kèm bản sao toàn bộ bằng khen cấp khoa',
    ],
    correctIndex: 0,
    explanationVi: 'Chuẩn tuyển dụng quốc tế khuyến nghị CV sinh viên/Fresher gói gọn súc tích trong 1 trang A4, chỉ giữ lại thông tin liên quan tới vị trí ứng tuyển.',
  },
  {
    id: 'grad-ex-30',
    category: 'CV chuẩn ATS',
    question: 'Thứ tự sắp xếp thời gian chuẩn trong các mục Education và Experience trên CV tiếng Anh là gì?',
    options: [
      'Từ cũ nhất đến mới nhất (Chronological)',
      'Từ mới nhất đến cũ nhất (Reverse-chronological)',
      'Xếp ngẫu nhiên theo cảm hứng',
      'Xếp theo thứ tự bảng chữ cái A–Z của tên công ty',
    ],
    correctIndex: 1,
    explanationVi: 'Nhà tuyển dụng quan tâm nhất bạn vừa làm/học gì gần đây, nên luôn đặt mốc thời gian gần nhất lên trên cùng (Reverse-chronological).',
  },
  {
    id: 'grad-ex-31',
    category: 'CV chuẩn ATS',
    question: 'Trong phần Skills của CV, vì sao bạn KHÔNG nên dùng các thanh tiến độ (progress bar) hay 4/5 ngôi sao để tự chấm kỹ năng?',
    options: [
      'Vì quá tốn mực in màu xanh',
      'Vì nhà tuyển dụng thích tự vẽ thêm sao vào CV',
      'Vì thang tự chấm mang tính chủ quan, vô nghĩa với HR và các icon đồ họa thường làm hệ thống ATS không đọc được tên kỹ năng',
      'Vì chỉ được phép ghi tối đa 1 kỹ năng',
    ],
    correctIndex: 2,
    explanationVi: 'Thay vì vẽ "Python 4/5 sao", hãy ghi rõ ngữ cảnh/mức độ thực tế (VD: "Python (Pandas, Scikit-learn) — built 3 predictive models") dưới dạng text chuẩn.',
  },
  {
    id: 'grad-ex-32',
    category: 'CV chuẩn ATS',
    question: 'Công thức Google XYZ ("Accomplished [X] as measured by [Y], by doing [Z]") giúp biến đổi câu mô tả CV nào sau đây trở nên thuyết phục nhất?',
    options: [
      'Helped the marketing team with social media content.',
      'In charge of club events and worked very hard.',
      'Good at Canva, Excel, and communication skills.',
      'Boosted club event sign-ups by 38% (320 attendees) by launching a targeted referral campaign and automated email reminders.',
    ],
    correctIndex: 3,
    explanationVi: 'Phương án D nêu đủ kết quả [X] (tăng đăng ký), thước đo [Y] (38% / 320 người) và hành động cụ thể [Z] (chiến dịch giới thiệu & email tự động).',
  },
  {
    id: 'grad-ex-33',
    category: 'CV chuẩn ATS',
    question: 'Khi viết CV bằng tiếng Anh để ứng tuyển thực tập tại doanh nghiệp đa quốc gia (chuẩn US/UK/International), thông tin cá nhân nào thường nên BỎ khỏi CV để đảm bảo tính chuyên nghiệp và tránh thiên kiến?',
    options: [
      'Ngày tháng năm sinh chi tiết, tình trạng hôn nhân, tôn giáo, số CMND/CCCD',
      'Họ tên, email chuyên nghiệp và số điện thoại',
      'Liên kết LinkedIn hoặc GitHub/Portfolio cá nhân',
      'Thành phố đang sinh sống (VD: Ho Chi Minh City, Vietnam)',
    ],
    correctIndex: 0,
    explanationVi: 'CV chuẩn quốc tế bỏ các thông tin nhạy cảm (tuổi, giới tính, hôn nhân, số CCCD) để tuân thủ chính sách tuyển dụng bình đẳng và bảo mật cá nhân.',
  },
  {
    id: 'grad-ex-34',
    category: 'CV chuẩn ATS',
    question: 'Nếu chưa từng đi làm chính thức tại doanh nghiệp, sinh viên năm 2–3 nên đưa nội dung nào vào mục Experience / Projects để CV vẫn có sức nặng?',
    options: [
      'Ghi khống tên một công ty lớn dù chưa từng làm',
      'Đưa các đồ án môn học lớn (Capstone/Course Projects), nghiên cứu khoa học SV, vai trò dẫn dắt CLB hoặc dự án freelance có kết quả đo lường',
      'Để trống hoàn toàn 2/3 trang giấy và chỉ ghi sở thích đọc sách, nghe nhạc',
      'Liệt kê danh sách toàn bộ điểm các môn đại cương từ học kỳ 1',
    ],
    correctIndex: 1,
    explanationVi: 'Đồ án môn học giải quyết bài toán thực tế, NCKH hay thành tích CLB được viết theo Action Verbs & số liệu vẫn chứng minh rất tốt năng lực làm việc.',
  },
  {
    id: 'grad-ex-35',
    category: 'CV chuẩn ATS',
    question: 'Nhóm động từ mở đầu (Action Verbs) nào phù hợp nhất cho kinh nghiệm từng làm Trưởng nhóm / Điều phối dự án?',
    options: [
      'Tried to, Was responsible for, Did',
      'Watched, Attended, Helped',
      'Spearheaded, Coordinated, Delegated, Mentored',
      'Learned, Studied, Read',
    ],
    correctIndex: 2,
    explanationVi: 'Spearheaded (dẫn dắt tiên phong), Coordinated (điều phối), Delegated (phân công) thể hiện rõ vai trò chủ động lãnh đạo hơn hẳn cụm bị động "Was responsible for".',
  },
  {
    id: 'grad-ex-36',
    category: 'CV chuẩn ATS',
    question: 'Vì sao bạn nên điều chỉnh (tailor) phần Professional Summary và Skills theo từng Job Description (JD) trước khi nộp hồ sơ?',
    options: [
      'Để đổi sang ngôn ngữ khác nhau mỗi lần nộp',
      'Để tăng số trang CV lên 3 trang',
      'Vì ATS tự động xóa các CV gửi trước 9 giờ sáng',
      'Để đưa đúng các từ khóa chuyên môn xuất hiện trong JD và nhấn mạnh đúng dự án liên quan nhất với vị trí đó',
    ],
    correctIndex: 3,
    explanationVi: 'Một bản CV chung chung rải 50 công ty thường có tỷ lệ phản hồi rất thấp; tùy chỉnh 15–20% từ khóa và thứ tự dự án theo JD giúp tăng vọt điểm khớp ATS.',
  },
  {
    id: 'grad-ex-37',
    category: 'CV chuẩn ATS',
    question: 'Lỗi trình bày nào dễ khiến thông tin liên hệ ở đầu CV bị phần mềm ATS bỏ sót hoàn toàn?',
    options: [
      'Đặt Email và Số điện thoại vào vùng Header/Footer của file Word hoặc nhúng dưới dạng hình ảnh/hộp văn bản phức tạp',
      'Gõ trực tiếp Email và SĐT ở dòng đầu tiên của thân trang văn bản',
      'Dùng font chữ tiêu chuẩn như Calibri, Arial hoặc Inter cỡ 10.5–11pt',
      'Ghi đường link LinkedIn dưới dạng văn bản rõ ràng',
    ],
    correctIndex: 0,
    explanationVi: 'Nhiều bộ phân tích ATS bỏ qua phần Header/Footer của tài liệu Word. Hãy luôn đặt thông tin liên hệ trực tiếp trong phần nội dung chính (Body) trên cùng.',
  },
  {
    id: 'grad-ex-38',
    category: 'CV chuẩn ATS',
    question: 'Khi viết địa chỉ Email liên hệ trên CV ứng tuyển thực tập/việc làm, lựa chọn nào đạt chuẩn chuyên nghiệp?',
    options: [
      'cutepuppy_99x@gmail.com',
      'minhanh.nguyen2026@gmail.com (dùng tên thật gọn gàng)',
      'boycodon_pro@yahoo.com',
      'Email công ty cũ đang làm việc',
    ],
    correctIndex: 1,
    explanationVi: 'Luôn dùng email cá nhân chứa họ tên thật, tránh biệt danh thiếu nghiêm túc và không dùng email nội bộ công ty cũ.',
  },
  {
    id: 'grad-ex-39',
    category: 'CV chuẩn ATS',
    question: 'Trong CV tiếng Anh, quy tắc chia thì động từ đúng cho công việc ĐÃ KẾT THÚC so với công việc ĐANG LÀM HIỆN TẠI là gì?',
    options: [
      'Dùng thì tương lai đơn cho tất cả các mục',
      'Dùng hiện tại tiếp diễn (V-ing) ở đầu mọi gạch đầu dòng',
      'Dùng thì Quá khứ đơn (V-ed/V2) cho việc đã kết thúc và Hiện tại đơn (V-inf/nguyên thể) cho việc đang làm hiện tại',
      'Không cần quan tâm đến thì động từ trong CV',
    ],
    correctIndex: 2,
    explanationVi: 'Sự nhất quán thì (Tense consistency) trong CV: vị trí hiện tại dùng Hiện tại đơn (VD: Analyze, Coordinate); vị trí/dự án đã xong dùng Quá khứ đơn (Analyzed, Coordinated).',
  },

  // Category 4: Văn phong học thuật (13 câu: grad-ex-40 .. grad-ex-52)
  {
    id: 'grad-ex-40',
    category: 'Văn phong học thuật',
    question: 'Cặp câu nào sau đây thể hiện đúng sắc thái "Hedging" (ngôn ngữ thận trọng, tránh khẳng định tuyệt đối thiếu bằng chứng) trong bài báo khoa học?',
    options: [
      'Social media completely destroys every teenager’s concentration forever.',
      'Obviously, all students hate reading printed textbooks.',
      'Nobody can deny that online classes are 100% useless.',
      'Survey findings suggest that excessive evening screen exposure may impair next-day concentration among undergraduates.',
    ],
    correctIndex: 3,
    explanationVi: 'Văn phong học thuật dùng động từ thận trọng (suggest, indicate, appear to) và động từ khuyết thiếu (may, might) thay cho các từ cực đoan (all, completely, forever).',
  },
  {
    id: 'grad-ex-41',
    category: 'Văn phong học thuật',
    question: 'Khi muốn trích dẫn trực tiếp ý tưởng của tác giả Tran (2024) theo chuẩn APA (in-text citation) ở cuối câu, cách viết nào đúng quy chuẩn?',
    options: [
      '...improves long-term retention (Tran, 2024).',
      '...improves long-term retention (Tran Nguyen Minh Anh, 2024, Hanoi University).',
      '...improves long-term retention [see Tran 2024 book].',
      '...improves long-term retention (2024 - Tran).',
    ],
    correctIndex: 0,
    explanationVi: 'Chuẩn APA trích dẫn trong ngoặc đơn cuối câu chỉ gồm (Họ tác giả, Năm xuất bản), dấu chấm đặt sau dấu ngoặc đóng.',
  },
  {
    id: 'grad-ex-42',
    category: 'Văn phong học thuật',
    question: 'Trong bài luận học thuật, cụm từ nào là phương án thay thế trang trọng nhất cho cụm khẩu ngữ "a lot of / lots of" đứng trước danh từ đếm được?',
    options: [
      'tons of',
      'numerous / a substantial number of',
      'a bunch of',
      'super many',
    ],
    correctIndex: 1,
    explanationVi: 'Dùng "numerous" hoặc "a substantial number of" (cho danh từ đếm được) và "considerable" (cho danh từ không đếm được) thay cho "lots of/tons of".',
  },
  {
    id: 'grad-ex-43',
    category: 'Văn phong học thuật',
    question: 'Hành động nào sau đây vẫn bị xem là ĐẠO VĂN HỌC THUẬT (Plagiarism) dù bạn không copy nguyên văn từng chữ?',
    options: [
      'Đặt trích dẫn nguyên văn trong ngoặc kép kèm tên tác giả và số trang',
      'Lập danh mục Tài liệu tham khảo (References) đầy đủ ở cuối bài',
      'Diễn đạt lại (paraphrase) lập luận hoặc số liệu độc quyền của người khác nhưng cố tình bỏ qua trích dẫn nguồn',
      'Tóm tắt kiến thức phổ thông đã được công nhận rộng rãi như ngày Quốc khánh',
    ],
    correctIndex: 2,
    explanationVi: 'Paraphrase mà không ghi nguồn (Uncited paraphrasing) vẫn là đạo văn vì bạn đang chiếm dụng ý tưởng/dữ liệu gốc của tác giả khác.',
  },
  {
    id: 'grad-ex-44',
    category: 'Văn phong học thuật',
    question: 'Trong phần mở đầu email tiếng Anh gửi giảng viên chưa từng quen biết trước đó, cách kết hợp chủ ngữ và lời chào nào chuẩn mực nhất?',
    options: [
      'Hello Teacher, My name is Tuan.',
      'Dear Mr. Teacher, I want to ask you something.',
      'Hey Sir/Madam, reply me ASAP.',
      'Dear Dr. Le, / Dear Professor Le, (kèm giới thiệu rõ họ tên, MSSV và học phần)',
    ],
    correctIndex: 3,
    explanationVi: 'Trong đại học, giảng viên có học vị Tiến sĩ gọi là "Dr. [Họ]", Giáo sư gọi là "Professor [Họ]". Tránh gọi "Teacher" như ở bậc phổ thông.',
  },
  {
    id: 'grad-ex-45',
    category: 'Văn phong học thuật',
    question: 'Cách sửa câu nói văn phong khẩu ngữ "The government has to fix this big problem fast." sang văn phong học thuật (Academic Register) tốt nhất là gì?',
    options: [
      'Policymakers must implement prompt interventions to address this pressing issue.',
      'The government gotta solve this super huge problem right now.',
      'Big bosses should fix stuff quickly for people.',
      'This problem is very bad and needs fast fixing by the state.',
    ],
    correctIndex: 0,
    explanationVi: 'Thay thế "big problem" -> "pressing issue", "fix fast" -> "implement prompt interventions", "government" -> "policymakers" nâng độ chính xác học thuật.',
  },
  {
    id: 'grad-ex-46',
    category: 'Văn phong học thuật',
    question: 'Chức năng chính của "Thesis Statement" ở cuối đoạn mở bài trong một bài Academic Essay là gì?',
    options: [
      'Chép lại nguyên văn đề bài của giảng viên',
      'Nêu rõ lập trường cốt lõi và vạch ra các hướng lập luận chính sẽ được chứng minh trong phần thân bài',
      'Đưa ra một danh sách 20 tài liệu tham khảo',
      'Lời cảm ơn người đọc đã xem bài luận',
    ],
    correctIndex: 1,
    explanationVi: 'Thesis statement đóng vai trò "xương sống" định hướng toàn bộ bài luận, giúp người đọc biết ngay tác giả đứng ở lập trường nào và sẽ phân tích khía cạnh gì.',
  },
  {
    id: 'grad-ex-47',
    category: 'Văn phong học thuật',
    question: 'Khi muốn chuyển sang một ý đối lập nhưng vẫn giữ liên kết logic chặt chẽ giữa hai đoạn văn, cặp từ nối nào phù hợp nhất?',
    options: [
      'And also / Plus',
      'Anyway / By the way',
      'Conversely, / Nevertheless, (đặt đầu câu có dấu phẩy)',
      'So yeah / Whatever',
    ],
    correctIndex: 2,
    explanationVi: 'Nevertheless (tuy nhiên, nhượng bộ) và Conversely (ngược lại) là các trạng từ liên kết chuẩn mực trong viết học thuật.',
  },
  {
    id: 'grad-ex-48',
    category: 'Văn phong học thuật',
    question: 'Trong báo cáo nghiên cứu khoa học (IMRaD), phần "Abstract" (Tóm tắt) cần đảm bảo nguyên tắc nào?',
    options: [
      'Viết dài khoảng 3–4 trang và chèn nhiều biểu đồ lớn',
      'Chỉ nêu phần mở đầu và bỏ trống kết quả để giữ bí mật tới cuối bài',
      'Chứa nhiều câu hỏi tu từ và cảm xúc cá nhân',
      'Cô đọng (thường 150–250 từ), tóm tắt đủ 4 yếu tố: Mục tiêu, Phương pháp, Kết quả chính và Kết luận/Hàm ý',
    ],
    correctIndex: 3,
    explanationVi: 'Abstract là bản thu nhỏ hoàn chỉnh của cả bài báo, giúp nhà nghiên cứu khác nắm được vấn đề, cách làm và phát hiện chính chỉ trong 1 phút đọc.',
  },
  {
    id: 'grad-ex-49',
    category: 'Văn phong học thuật',
    question: 'Khi cần diễn đạt danh từ hóa (Nominalization) để tăng tính khách quan học thuật cho câu "Because urban populations grew rapidly, traffic congestion worsened.", cách viết lại nào chuẩn nhất?',
    options: [
      'Rapid urban population growth contributed to worsening traffic congestion.',
      'People moved to cities fast so cars got stuck more.',
      'Growing cities quickly made bad traffic happen.',
      'Traffic was worse because cities got super crowded.',
    ],
    correctIndex: 0,
    explanationVi: 'Danh từ hóa biến mệnh đề hành động ("populations grew rapidly") thành cụm danh từ ("Rapid urban population growth") giúp câu súc tích và học thuật hơn.',
  },
  {
    id: 'grad-ex-50',
    category: 'Văn phong học thuật',
    question: 'Trong văn phong viết học thuật chuẩn (như tiểu luận hoặc khóa luận tiếng Anh), quy tắc nào thường được khuyến nghị về dạng viết tắt (contractions) và đại từ?',
    options: [
      'Viết tắt tự do (don’t, isn’t, won’t, gonna) để bài viết gần gũi',
      'Viết đầy đủ (do not, is not, will not), tránh tiếng lóng và hạn chế lạm dụng ngôi thứ nhất cảm tính',
      'Chèn thêm emoji để nhấn mạnh kết quả quan trọng',
      'Dùng dấu chấm than (!) cuối mọi câu khẳng định',
    ],
    correctIndex: 1,
    explanationVi: 'Formal academic writing tránh contractions (don’t -> do not), tránh dấu chấm than và tránh ngôn ngữ cảm tính không có dẫn chứng.',
  },
  {
    id: 'grad-ex-51',
    category: 'Văn phong học thuật',
    question: 'Khi đưa một đoạn phản biện (Counter-argument) vào bài luận nghị luận (Argumentative Essay), mục đích thực sự của đoạn này là gì?',
    options: [
      'Chứng minh tác giả bị bối rối và đổi quan điểm ở giữa bài',
      'Kéo dài số từ cho đủ trang quy định',
      'Thừa nhận một điểm hợp lý của phe đối lập rồi dùng bằng chứng/lập luận sắc bén để bác bỏ hoặc giới hạn lại, khiến quan điểm chính thuyết phục hơn',
      'Lặp lại y nguyên đoạn thân bài thứ nhất',
    ],
    correctIndex: 2,
    explanationVi: 'Biết thừa nhận và phản biện lại góc nhìn trái chiều (Admittedly... However...) cho thấy tư duy đa chiều và giúp lập luận của bạn khó bị bắt bẻ.',
  },
  {
    id: 'grad-ex-52',
    category: 'Văn phong học thuật',
    question: 'Cách dùng cụm từ "respectively" nào sau đây hoàn toàn chính xác về ngữ pháp và nghĩa trong báo cáo số liệu?',
    options: [
      'Respectively, I want to thank Dr. Lan for her support.',
      'The students studied respectively in the library.',
      'Group A scored high, respectively.',
      'Group A and Group B achieved average scores of 78% and 84%, respectively.',
    ],
    correctIndex: 3,
    explanationVi: '"Respectively" (theo thứ tự tương ứng) đặt ở cuối câu để nối tương ứng danh sách thứ nhất (Group A, Group B) với danh sách thứ hai (78%, 84%).',
  },
];

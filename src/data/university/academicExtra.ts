import type {
  AcademicAbstract,
  AcademicWritingPrompt,
  PresentationPhrase,
  SeminarPhrase,
  GraduationQuizQuestion,
} from './academicCurriculumData';

export const ACADEMIC_ABSTRACTS_EXTRA: AcademicAbstract[] = [
  // =========================================================
  // 1. NGHIÊN CỨU & PHÂN TÍCH (5 bài: abs-ex-1 .. abs-ex-5)
  // =========================================================
  {
    id: 'abs-ex-1',
    title: 'Effects of Structured Peer Review on Undergraduate Lab Report Quality',
    domain: 'Nghiên cứu & Phân tích',
    level: 'B1',
    publicationContext: 'Journal of Undergraduate Science Education • Empirical Study',
    abstractEn:
      'Many first-year science students struggle to organize experimental evidence clearly in laboratory reports. This quasi-experimental study investigated whether structured peer review improves analytical writing among 96 chemistry undergraduates at a public university. Over ten weeks, the intervention group evaluated classmates’ drafts using a standardized rubric before submitting final reports, whereas the control group received only instructor grades. Independent raters assessed final submissions across four criteria: hypothesis clarity, data interpretation, error analysis, and citation accuracy. Results revealed that the peer-review cohort scored 14 percent higher overall, with the most substantial gains appearing in error analysis. Post-course surveys also indicated increased confidence in evaluating scientific arguments. Incorporating guided peer feedback into laboratory courses may strengthen students’ critical reasoning without overburdening teaching staff.',
    translationVi:
      'Nhiều sinh viên khoa học năm nhất gặp khó khăn trong việc sắp xếp bằng chứng thực nghiệm mạch lạc trong báo cáo thí nghiệm. Nghiên cứu bán thực nghiệm này khảo sát liệu việc đánh giá chéo có cấu trúc có cải thiện kỹ năng viết phân tích ở 96 sinh viên hóa học tại một trường đại học công lập hay không. Trong mười tuần, nhóm can thiệp đánh giá bản nháp của bạn học theo bảng tiêu chí chuẩn trước khi nộp bài cuối, trong khi nhóm đối chứng chỉ nhận điểm từ giảng viên. Người chấm độc lập đánh giá bài nộp theo bốn tiêu chí: độ rõ của giả thuyết, diễn giải dữ liệu, phân tích sai số và độ chính xác trích dẫn. Kết quả cho thấy nhóm đánh giá chéo đạt điểm tổng cao hơn 14%, với mức tiến bộ rõ nhất ở phần phân tích sai số. Khảo sát sau khóa học cũng ghi nhận sự tự tin tăng lên khi thẩm định lập luận khoa học.',
    keyTerms: ['quasi-experimental', 'intervention', 'standardized rubric', 'cohort', 'error analysis'],
    questions: [
      {
        id: 'abs-ex-1-q1',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What is the primary purpose of this study?',
        questionVi: 'Mục đích chính của nghiên cứu này là gì?',
        options: [
          'To test whether structured peer review improves undergraduate lab report writing',
          'To replace chemistry laboratory experiments with online simulations',
          'To compare grading speed between teaching assistants and professors',
          'To measure how often students cite textbooks in final exams',
        ],
        correctIndex: 0,
        explanationVi: 'Bài viết tập trung kiểm tra xem đánh giá chéo có cấu trúc (structured peer review) có cải thiện chất lượng viết báo cáo thí nghiệm của sinh viên hay không.',
      },
      {
        id: 'abs-ex-1-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How did the intervention group differ from the control group?',
        questionVi: 'Nhóm can thiệp khác nhóm đối chứng ở điểm nào?',
        options: [
          'They completed fewer laboratory experiments during the semester.',
          'They reviewed peers’ drafts with a standardized rubric prior to final submission.',
          'They received weekly one-on-one tutoring from senior researchers.',
          'They were exempt from citation accuracy requirements.',
        ],
        correctIndex: 1,
        explanationVi: 'Nhóm can thiệp đánh giá bản nháp của bạn học bằng rubric chuẩn trước khi nộp bản cuối, còn nhóm đối chứng chỉ nhận điểm của giảng viên.',
      },
      {
        id: 'abs-ex-1-q3',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'In which assessment criterion did the peer-review group show the greatest improvement?',
        questionVi: 'Nhóm đánh giá chéo tiến bộ rõ rệt nhất ở tiêu chí nào?',
        options: [
          'Citation accuracy',
          'Hypothesis clarity',
          'Error analysis',
          'Data formatting',
        ],
        correctIndex: 2,
        explanationVi: 'Đoạn văn nêu rõ: "with the most substantial gains appearing in error analysis."',
      },
      {
        id: 'abs-ex-1-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What practical benefit does the author suggest for university departments?',
        questionVi: 'Tác giả gợi ý lợi ích thực tiễn nào cho các khoa trong trường đại học?',
        options: [
          'Eliminating final lab reports completely',
          'Reducing the number of enrolled chemistry students',
          'Hiring external raters for all undergraduate courses',
          'Improving students’ critical reasoning without adding heavy workload for instructors',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối nhấn mạnh việc đưa phản hồi đồng đẳng có hướng dẫn giúp tăng tư duy phản biện mà không gây quá tải cho giảng viên.',
      },
    ],
  },
  {
    id: 'abs-ex-2',
    title: 'Sample Size Bias in Qualitative Interview Studies: A Meta-Methodological Review',
    domain: 'Nghiên cứu & Phân tích',
    level: 'C1',
    publicationContext: 'Qualitative Inquiry Review • Methodological Analysis',
    abstractEn:
      'Determining an adequate sample size remains a persistent methodological challenge in qualitative social research. Although scholars frequently invoke data saturation to justify small interview cohorts, operational definitions of saturation vary considerably across disciplines. This review examined 140 peer-reviewed articles published between 2019 and 2024 in education and sociology journals. Coding procedures assessed whether authors documented thematic saturation systematically or relied on convenience thresholds. Findings indicated that 62 percent of studies recruited between 12 and 20 participants, yet fewer than one-third provided transparent evidence of how saturation was verified. Moreover, studies lacking explicit stopping criteria tended to overgeneralize findings beyond local contexts. The authors propose a standardized reporting checklist requiring researchers to specify recruitment rationale, code-emergence logs, and analytical boundaries.',
    translationVi:
      'Xác định cỡ mẫu phù hợp vẫn là một thách thức phương pháp luận dai dẳng trong nghiên cứu xã hội định tính. Dù các học giả thường viện dẫn khái niệm bão hòa dữ liệu để biện minh cho nhóm phỏng vấn nhỏ, định nghĩa vận hành của sự bão hòa lại khác nhau đáng kể giữa các ngành. Tổng quan này rà soát 140 bài báo bình duyệt xuất bản giai đoạn 2019–2024 trên các tạp chí giáo dục và xã hội học. Quy trình mã hóa đánh giá xem tác giả có ghi nhận bão hòa chủ đề một cách hệ thống hay chỉ dựa vào ngưỡng tiện lợi. Kết quả cho thấy 62% nghiên cứu tuyển từ 12 đến 20 người tham gia, nhưng chưa tới một phần ba cung cấp bằng chứng minh bạch về cách kiểm chứng bão hòa. Ngoài ra, các nghiên cứu thiếu tiêu chí dừng rõ ràng thường khái quát hóa quá mức vượt ra ngoài bối cảnh địa phương.',
    keyTerms: ['data saturation', 'operational definitions', 'coding procedures', 'stopping criteria', 'overgeneralize'],
    questions: [
      {
        id: 'abs-ex-2-q1',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What central methodological issue does this review address?',
        questionVi: 'Bài tổng quan này giải quyết vấn đề phương pháp luận cốt lõi nào?',
        options: [
          'Low response rates in online quantitative surveys',
          'Inconsistent justification and reporting of sample saturation in qualitative interviews',
          'Ethical violations in clinical medical trials',
          'High costs of translating sociological questionnaires',
        ],
        correctIndex: 1,
        explanationVi: 'Bài nghiên cứu phân tích sự thiếu nhất quán trong cách xác định và báo cáo ngưỡng bão hòa dữ liệu (data saturation) ở các nghiên cứu phỏng vấn định tính.',
      },
      {
        id: 'abs-ex-2-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'What corpus did the authors analyze?',
        questionVi: 'Nhóm tác giả đã phân tích tập dữ liệu nào?',
        options: [
          '140 peer-reviewed articles in education and sociology journals (2019–2024)',
          '20 unpublished doctoral dissertations from one university',
          '120 longitudinal statistical datasets from government agencies',
          '62 interview transcripts conducted by undergraduate students',
        ],
        correctIndex: 0,
        explanationVi: 'Đoạn văn nêu: "examined 140 peer-reviewed articles published between 2019 and 2024 in education and sociology journals."',
      },
      {
        id: 'abs-ex-2-q3',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What weakness was observed in studies without explicit stopping criteria?',
        questionVi: 'Điểm yếu nào được ghi nhận ở các nghiên cứu thiếu tiêu chí dừng rõ ràng?',
        options: [
          'They recruited more than 200 participants unnecessarily.',
          'They refused to publish their interview questions.',
          'They frequently failed to use any coding software.',
          'They tended to overgeneralize conclusions beyond local contexts.',
        ],
        correctIndex: 3,
        explanationVi: 'Tác giả chỉ ra: "studies lacking explicit stopping criteria tended to overgeneralize findings beyond local contexts."',
      },
      {
        id: 'abs-ex-2-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'Why do the authors recommend a standardized reporting checklist?',
        questionVi: 'Vì sao nhóm tác giả đề xuất bảng kiểm báo cáo chuẩn hóa?',
        options: [
          'To force all qualitative studies to interview at least 100 people',
          'To ban convenience sampling from academic journals',
          'To increase transparency around recruitment rationale and saturation verification',
          'To replace peer review with automated text analysis',
        ],
        correctIndex: 2,
        explanationVi: 'Bảng kiểm yêu cầu nêu rõ lý do tuyển mẫu, nhật ký xuất hiện mã (code-emergence logs) và giới hạn phân tích nhằm tăng tính minh bạch.',
      },
    ],
  },
  {
    id: 'abs-ex-3',
    title: 'Comparing Manual and Automated Content Analysis in Media Framing Research',
    domain: 'Nghiên cứu & Phân tích',
    level: 'B2',
    publicationContext: 'Communication Methods Quarterly • Comparative Analysis',
    abstractEn:
      'As digital news archives expand rapidly, communication researchers increasingly combine manual coding with automated natural language processing (NLP) tools. This study evaluated the reliability and efficiency of both approaches when analyzing climate policy framing across 2,400 newspaper articles. Two trained human coders manually annotated a stratified subsample of 400 articles, achieving strong inter-coder agreement (kappa = 0.84). Subsequently, a supervised machine-learning classifier was trained on the annotated corpus and applied to the remaining texts. While the automated model processed the dataset in under ten minutes and matched human accuracy on explicit economic frames, it struggled to detect irony and implicit skepticism. Consequently, the authors advocate a hybrid workflow in which computational tools filter large corpora while human analysts interpret nuanced rhetorical strategies.',
    translationVi:
      'Khi kho lưu trữ tin tức số mở rộng nhanh chóng, các nhà nghiên cứu truyền thông ngày càng kết hợp mã hóa thủ công với công cụ xử lý ngôn ngữ tự nhiên (NLP) tự động. Nghiên cứu này đánh giá độ tin cậy và hiệu suất của hai cách tiếp cận khi phân tích khung truyền thông về chính sách khí hậu trên 2.400 bài báo. Hai người mã hóa được đào tạo đã gắn nhãn thủ công một mẫu phân tầng gồm 400 bài, đạt độ đồng thuận cao (kappa = 0,84). Sau đó, một mô hình phân loại học máy có giám sát được huấn luyện trên tập dữ liệu đã gắn nhãn và áp dụng cho phần văn bản còn lại. Dù mô hình tự động xử lý dữ liệu dưới mười phút và đạt độ chính xác ngang con người ở các khung kinh tế tường minh, nó gặp khó khăn khi nhận diện sự châm biếm và hoài nghi hàm ẩn.',
    keyTerms: ['stratified subsample', 'inter-coder agreement', 'supervised classifier', 'nuanced', 'hybrid workflow'],
    questions: [
      {
        id: 'abs-ex-3-q1',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How was the machine-learning classifier trained in this study?',
        questionVi: 'Mô hình phân loại học máy được huấn luyện bằng cách nào?',
        options: [
          'Using an unlabelled archive of 2,400 social media posts',
          'Using 400 articles manually annotated by two trained coders',
          'By translating climate policy documents into multiple languages',
          'By asking newspaper editors to tag their own articles',
        ],
        correctIndex: 1,
        explanationVi: 'Hai người mã hóa đã gắn nhãn thủ công 400 bài báo, sau đó tập dữ liệu này được dùng để huấn luyện mô hình có giám sát.',
      },
      {
        id: 'abs-ex-3-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'Where did the automated NLP model underperform compared to human coders?',
        questionVi: 'Mô hình NLP tự động kém hơn người mã hóa ở khía cạnh nào?',
        options: [
          'Processing speed on large text datasets',
          'Identifying explicit economic framing',
          'Detecting irony and implicit skepticism',
          'Counting article publication dates',
        ],
        correctIndex: 2,
        explanationVi: 'Bài viết nêu rõ mô hình gặp khó khăn trong việc phát hiện sự châm biếm và hoài nghi hàm ẩn ("struggled to detect irony and implicit skepticism").',
      },
      {
        id: 'abs-ex-3-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What overall workflow do the authors recommend?',
        questionVi: 'Nhóm tác giả khuyến nghị quy trình làm việc tổng thể nào?',
        options: [
          'A hybrid approach combining automated filtering with human rhetorical interpretation',
          'Complete replacement of human coders with unsupervised AI models',
          'Exclusive reliance on manual coding for all digital archives',
          'Avoiding newspaper datasets in climate policy research',
        ],
        correctIndex: 0,
        explanationVi: 'Câu cuối đề xuất quy trình kết hợp (hybrid workflow): công cụ tính toán lọc dữ liệu lớn, còn con người diễn giải chiến lược tu từ tinh tế.',
      },
      {
        id: 'abs-ex-3-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'Why did the researchers report a kappa value of 0.84 before training the model?',
        questionVi: 'Vì sao nhóm nghiên cứu báo cáo chỉ số kappa = 0,84 trước khi huấn luyện mô hình?',
        options: [
          'To prove that 2,400 articles were too few for analysis',
          'To measure the speed of their computer processors',
          'To show that human coders disagreed on economic terms',
          'To confirm that the manual training labels were reliable and consistent',
        ],
        correctIndex: 3,
        explanationVi: 'Chỉ số đồng thuận giữa người mã hóa (inter-coder agreement) cao chứng tỏ bộ dữ liệu huấn luyện gắn nhãn thủ công đáng tin cậy.',
      },
    ],
  },
  {
    id: 'abs-ex-4',
    title: 'Longitudinal Attrition in University Student Mental Health Surveys',
    domain: 'Nghiên cứu & Phân tích',
    level: 'B2',
    publicationContext: 'Assessment & Evaluation in Higher Education • Cohort Study',
    abstractEn:
      'Longitudinal surveys are essential for tracking how student well-being evolves across degree programs, yet participant dropout often distorts statistical conclusions. This study analyzed attrition patterns across four waves of a campus mental health survey involving 1,850 undergraduates. Logistic regression models were constructed to identify demographic and academic predictors of non-response at follow-up waves. Results demonstrated that first-generation students and individuals reporting elevated stress at baseline were significantly more likely to withdraw from subsequent waves. Consequently, unweighted longitudinal analyses underestimated the true prevalence of severe burnout by nearly 9 percentage points. Implementing targeted reminder protocols and flexible mobile completion options in a pilot follow-up reduced attrition among high-risk subgroups by 28 percent. Researchers should routinely apply attrition diagnostics and weighting adjustments in multi-wave campus studies.',
    translationVi:
      'Khảo sát theo chiều dọc rất thiết yếu để theo dõi sức khỏe tinh thần sinh viên biến đổi ra sao qua các năm học, nhưng tình trạng bỏ cuộc của người tham gia thường làm sai lệch kết luận thống kê. Nghiên cứu này phân tích mô hình hao hụt mẫu qua bốn đợt khảo sát sức khỏe tâm thần tại trường với 1.850 sinh viên. Các mô hình hồi quy logistic được xây dựng để xác định yếu tố nhân khẩu và học tập dự báo việc không phản hồi ở các đợt sau. Kết quả cho thấy sinh viên thế hệ đầu tiên và những người có mức căng thẳng cao ở mốc ban đầu có xu hướng rút lui cao hơn đáng kể. Do đó, phân tích không gán trọng số đã đánh giá thấp tỷ lệ kiệt sức nghiêm trọng thực tế gần 9 điểm phần trăm.',
    keyTerms: ['attrition', 'longitudinal', 'logistic regression', 'baseline', 'weighting adjustments'],
    questions: [
      {
        id: 'abs-ex-4-q1',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What methodological problem does participant dropout cause in longitudinal campus surveys?',
        questionVi: 'Việc người tham gia bỏ cuộc giữa chừng gây ra vấn đề phương pháp luận gì?',
        options: [
          'It distorts statistical estimates, underestimating severe burnout.',
          'It doubles the financial cost of printing paper questionnaires.',
          'It prevents universities from offering counseling services.',
          'It makes first-year students perform worse in final exams.',
        ],
        correctIndex: 0,
        explanationVi: 'Sự hao hụt mẫu (attrition) không ngẫu nhiên làm sai lệch thống kê và đánh giá thấp tỷ lệ kiệt sức thực tế gần 9 điểm phần trăm.',
      },
      {
        id: 'abs-ex-4-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'Which students were more likely to drop out of later survey waves?',
        questionVi: 'Nhóm sinh viên nào có khả năng bỏ khảo sát ở các đợt sau cao hơn?',
        options: [
          'Graduating seniors with high GPAs',
          'Students who completed the survey on mobile phones',
          'First-generation students and those with high baseline stress',
          'Postgraduate researchers in engineering departments',
        ],
        correctIndex: 2,
        explanationVi: 'Kết quả hồi quy chỉ ra sinh viên thế hệ đầu tiên và người có mức stress cao ở mốc ban đầu dễ rút lui hơn.',
      },
      {
        id: 'abs-ex-4-q3',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'Which statistical technique was used to identify predictors of non-response?',
        questionVi: 'Kỹ thuật thống kê nào được dùng để xác định yếu tố dự báo việc không phản hồi?',
        options: [
          'Thematic discourse coding',
          'Logistic regression models',
          'Randomized clinical trials',
          'Factor analysis of exam scores',
        ],
        correctIndex: 1,
        explanationVi: 'Bài viết ghi rõ: "Logistic regression models were constructed to identify demographic and academic predictors of non-response..."',
      },
      {
        id: 'abs-ex-4-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'How can future multi-wave studies reduce bias from high-risk subgroup dropout?',
        questionVi: 'Các nghiên cứu nhiều đợt trong tương lai có thể giảm sai lệch do bỏ cuộc bằng cách nào?',
        options: [
          'By surveying only students who have low stress at baseline',
          'By shortening the degree program to two years',
          'By excluding first-generation students from initial waves',
          'By using targeted reminders, mobile options, and statistical weighting adjustments',
        ],
        correctIndex: 3,
        explanationVi: 'Thử nghiệm nhắc nhở có mục tiêu + hoàn thành trên di động giúp giảm 28% hao hụt, kết hợp kiểm tra hao hụt và điều chỉnh trọng số.',
      },
    ],
  },
  {
    id: 'abs-ex-5',
    title: 'Reproducibility Practices in Undergraduate Data Science Theses',
    domain: 'Nghiên cứu & Phân tích',
    level: 'C1',
    publicationContext: 'Data Science Education Journal • Audit Study',
    abstractEn:
      'Computational reproducibility—the ability of independent researchers to regenerate reported results using original data and code—is a cornerstone of modern empirical science. This audit evaluated 75 undergraduate data science theses submitted between 2021 and 2024 at three technical universities. Using a standardized execution protocol, reviewers attempted to rerun analytical scripts in isolated virtual environments. Only 36 percent of theses reproduced all primary tables and figures without manual intervention. Common barriers included undocumented software dependencies, hardcoded local file paths, and missing random-seed specifications for stochastic algorithms. Theses accompanied by containerization files or dependency manifests achieved a 78 percent full-reproducibility rate. Integrating version control and environment-locking tutorials into senior capstone seminars is recommended to cultivate rigorous research habits.',
    translationVi:
      'Khả năng tái lập tính toán — việc các nhà nghiên cứu độc lập có thể tạo lại kết quả đã báo cáo bằng dữ liệu và mã nguồn gốc — là nền tảng của khoa học thực nghiệm hiện đại. Cuộc kiểm định này đánh giá 75 khóa luận tốt nghiệp ngành khoa học dữ liệu nộp giai đoạn 2021–2024 tại ba trường đại học kỹ thuật. Theo quy trình chạy thử chuẩn hóa, người đánh giá cố gắng chạy lại kịch bản phân tích trong môi trường ảo cô lập. Chỉ 36% khóa luận tái lập được toàn bộ bảng biểu chính mà không cần can thiệp thủ công. Các rào cản phổ biến gồm thư viện phần mềm không ghi chép, đường dẫn tệp cục bộ gắn cứng và thiếu thiết lập hạt giống ngẫu nhiên (random-seed). Ngược lại, các khóa luận có tệp đóng gói container đạt tỷ lệ tái lập hoàn toàn tới 78%.',
    keyTerms: ['reproducibility', 'isolated virtual environments', 'dependencies', 'stochastic algorithms', 'containerization'],
    questions: [
      {
        id: 'abs-ex-5-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What percentage of audited theses reproduced all primary results without manual fixes?',
        questionVi: 'Bao nhiêu phần trăm khóa luận được kiểm định tái lập được toàn bộ kết quả chính mà không cần sửa thủ công?',
        options: [
          '36 percent',
          '75 percent',
          '78 percent',
          '24 percent',
        ],
        correctIndex: 0,
        explanationVi: 'Bài viết ghi: "Only 36 percent of theses reproduced all primary tables and figures without manual intervention."',
      },
      {
        id: 'abs-ex-5-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How did reviewers test whether the thesis results could be regenerated?',
        questionVi: 'Người đánh giá kiểm tra khả năng tái lập kết quả khóa luận bằng cách nào?',
        options: [
          'By interviewing the thesis supervisors orally',
          'By rerunning analytical scripts in isolated virtual environments',
          'By checking only the printed PDF appendices',
          'By asking the authors to rewrite their code from scratch',
        ],
        correctIndex: 1,
        explanationVi: 'Họ chạy lại các script phân tích trong môi trường ảo cô lập theo quy trình chuẩn hóa.',
      },
      {
        id: 'abs-ex-5-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'Which technical factor strongly improved full reproducibility in the sample?',
        questionVi: 'Yếu tố kỹ thuật nào giúp cải thiện mạnh mẽ tỷ lệ tái lập hoàn toàn?',
        options: [
          'Using proprietary paid spreadsheet software',
          'Writing shorter literature review chapters',
          'Including containerization files or dependency manifests',
          'Avoiding stochastic algorithms in all analyses',
        ],
        correctIndex: 2,
        explanationVi: 'Các khóa luận kèm tệp containerization hoặc bản kê phụ thuộc (dependency manifests) đạt tỷ lệ tái lập 78%.',
      },
      {
        id: 'abs-ex-5-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What curricular change do the authors propose for technical universities?',
        questionVi: 'Nhóm tác giả đề xuất thay đổi chương trình học nào cho các trường kỹ thuật?',
        options: [
          'Removing coding requirements from undergraduate theses',
          'Evaluating theses solely on presentation slides',
          'Requiring students to publish code only after graduation',
          'Teaching version control and environment locking during capstone seminars',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối khuyến nghị tích hợp hướng dẫn quản lý phiên bản (version control) và khóa môi trường (environment-locking) vào seminar khóa luận.',
      },
    ],
  },

  // =========================================================
  // 2. KINH TẾ & QUẢN TRỊ (5 bài: abs-ex-6 .. abs-ex-10)
  // =========================================================
  {
    id: 'abs-ex-6',
    title: 'Supply Chain Diversification Among Small Manufacturers in Southeast Asia',
    domain: 'Kinh tế & Quản trị',
    level: 'B2',
    publicationContext: 'Asian Business & Management Review • Empirical Survey',
    abstractEn:
      'Following recent global logistics disruptions, small and medium-sized manufacturers (SMEs) face growing pressure to reduce dependence on single-source suppliers. This study examined supplier diversification strategies among 180 electronics and textile SMEs across Vietnam and Thailand. Financial statements and procurement records from 2020 to 2024 were analyzed alongside structured interviews with operations managers. Results revealed that firms sourcing critical components from at least three regional suppliers experienced 31 percent shorter production delays during port congestion events. However, excessive diversification without digital inventory tracking increased unit procurement costs by 6.5 percent due to lost bulk discounts. Enterprises that paired dual-sourcing policies with cloud-based demand forecasting achieved both higher resilience and stable profit margins. Managers should therefore balance supplier redundancy against administrative coordination costs.',
    translationVi:
      'Sau các gián đoạn logistics toàn cầu gần đây, doanh nghiệp sản xuất vừa và nhỏ (SME) chịu áp lực ngày càng lớn phải giảm phụ thuộc vào nhà cung cấp đơn nguồn. Nghiên cứu này khảo sát chiến lược đa dạng hóa nhà cung cấp tại 180 SME ngành điện tử và dệt may ở Việt Nam và Thái Lan. Báo cáo tài chính và hồ sơ thu mua giai đoạn 2020–2024 được phân tích cùng phỏng vấn có cấu trúc với quản lý vận hành. Kết quả cho thấy doanh nghiệp nhập linh kiện thiết yếu từ ít nhất ba nhà cung cấp khu vực giảm được 31% thời gian đình trệ sản xuất khi tắc nghẽn cảng. Tuy nhiên, đa dạng hóa quá mức mà thiếu theo dõi tồn kho số hóa làm tăng chi phí thu mua đơn vị thêm 6,5% do mất chiết khấu số lượng lớn.',
    keyTerms: ['single-source suppliers', 'procurement', 'port congestion', 'resilience', 'profit margins'],
    questions: [
      {
        id: 'abs-ex-6-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What trade-off occurred when SMEs diversified suppliers without digital inventory tracking?',
        questionVi: 'Sự đánh đổi nào xảy ra khi SME đa dạng hóa nhà cung cấp mà thiếu theo dõi tồn kho số hóa?',
        options: [
          'Unit procurement costs rose by 6.5% due to lost bulk discounts.',
          'Production delays increased by 31% during port congestion.',
          'Managers refused to sign contracts with regional suppliers.',
          'Cloud-based forecasting software failed to operate.',
        ],
        correctIndex: 0,
        explanationVi: 'Bài viết chỉ ra: "excessive diversification without digital inventory tracking increased unit procurement costs by 6.5 percent due to lost bulk discounts."',
      },
      {
        id: 'abs-ex-6-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'Which data sources were combined in this study?',
        questionVi: 'Nghiên cứu này kết hợp những nguồn dữ liệu nào?',
        options: [
          'Macroeconomic GDP forecasts and consumer price indices',
          'Financial statements, procurement records, and manager interviews',
          'Social media reviews and retail store foot-traffic counts',
          'Only laboratory simulations of shipping routes',
        ],
        correctIndex: 1,
        explanationVi: 'Dữ liệu gồm báo cáo tài chính, hồ sơ thu mua (2020–2024) và phỏng vấn có cấu trúc với quản lý vận hành.',
      },
      {
        id: 'abs-ex-6-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'Which strategy delivered both supply chain resilience and stable margins?',
        questionVi: 'Chiến lược nào mang lại cả khả năng chống chịu chuỗi cung ứng lẫn biên lợi nhuận ổn định?',
        options: [
          'Relying exclusively on one low-cost overseas supplier',
          'Eliminating all regional suppliers in favor of air freight',
          'Combining dual-sourcing policies with cloud-based demand forecasting',
          'Holding zero safety stock in warehouses',
        ],
        correctIndex: 2,
        explanationVi: 'Doanh nghiệp kết hợp chính sách nguồn cung kép (dual-sourcing) với dự báo nhu cầu trên nền tảng đám mây đạt cả hai mục tiêu.',
      },
      {
        id: 'abs-ex-6-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What does the author imply managers must avoid when redesigning supply chains?',
        questionVi: 'Tác giả ngụ ý nhà quản lý cần tránh điều gì khi tái thiết kế chuỗi cung ứng?',
        options: [
          'Hiring operations managers with electronics backgrounds',
          'Sharing demand forecasts with regional partners',
          'Using any cloud-based software in textile factories',
          'Expanding supplier networks blindly without accounting for coordination costs',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối khuyên nhà quản lý cân bằng giữa dự phòng nhà cung cấp và chi phí điều phối hành chính.',
      },
    ],
  },
  {
    id: 'abs-ex-7',
    title: 'Hybrid Work Policies and Early-Career Employee Retention in Consulting Firms',
    domain: 'Kinh tế & Quản trị',
    level: 'B1',
    publicationContext: 'Human Resource Management Perspectives • Field Study',
    abstractEn:
      'Retaining junior analysts has become a major challenge for management consulting firms competing in tight labor markets. This 18-month field study tracked 420 early-career employees across six regional offices operating under different attendance mandates. Two offices enforced full five-day in-office attendance, two adopted a structured three-day hybrid model, and two permitted fully remote schedules. Turnover rates, mentorship satisfaction, and promotion velocity were compared across cohorts. Junior staff in the structured hybrid offices exhibited a 24 percent lower voluntary resignation rate than those in mandatory full-office locations. Conversely, employees in fully remote offices reported weaker informal mentorship and slower skill acquisition during their first year. A balanced three-day hybrid schedule appears to preserve collaborative learning while satisfying flexibility expectations.',
    translationVi:
      'Giữ chân chuyên viên phân tích trẻ đã trở thành thách thức lớn đối với các công ty tư vấn quản trị trong thị trường lao động cạnh tranh. Nghiên cứu thực địa kéo dài 18 tháng này theo dõi 420 nhân sự mới vào nghề tại sáu văn phòng khu vực áp dụng các quy định hiện diện khác nhau. Hai văn phòng bắt buộc lên văn phòng đủ 5 ngày, hai văn phòng áp dụng mô hình hybrid có cấu trúc 3 ngày và hai văn phòng cho phép làm việc từ xa hoàn toàn. Kết quả cho thấy nhân sự trẻ ở nhóm hybrid 3 ngày có tỷ lệ tự nguyện nghỉ việc thấp hơn 24% so với nhóm bắt buộc lên văn phòng toàn thời gian. Ngược lại, nhân sự làm từ xa hoàn toàn báo cáo sự cố vấn phi chính thức yếu hơn và tốc độ tích lũy kỹ năng chậm hơn trong năm đầu.',
    keyTerms: ['retention', 'attendance mandates', 'turnover rates', 'mentorship', 'promotion velocity'],
    questions: [
      {
        id: 'abs-ex-7-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'How did the structured three-day hybrid model compare to full in-office attendance?',
        questionVi: 'Mô hình hybrid 3 ngày khác biệt ra sao so với làm việc tại văn phòng cả 5 ngày?',
        options: [
          'It resulted in a 24 percent lower voluntary resignation rate.',
          'It doubled the turnover rate among senior partners.',
          'It eliminated the need for annual performance reviews.',
          'It caused junior analysts to lose all mentorship opportunities.',
        ],
        correctIndex: 0,
        explanationVi: 'Nhân viên trẻ ở văn phòng hybrid 3 ngày có tỷ lệ tự nghỉ việc thấp hơn 24% so với nhóm bắt buộc lên văn phòng 5 ngày.',
      },
      {
        id: 'abs-ex-7-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What drawback was observed in the fully remote offices?',
        questionVi: 'Nhược điểm nào được ghi nhận ở các văn phòng làm việc từ xa hoàn toàn?',
        options: [
          'Higher office electricity expenses',
          'Weaker informal mentorship and slower first-year skill acquisition',
          'Excessive commuting time for junior analysts',
          'Strict five-day attendance mandates',
        ],
        correctIndex: 1,
        explanationVi: 'Nhân viên làm từ xa hoàn toàn phản ánh sự cố vấn phi chính thức yếu hơn và học kỹ năng chậm hơn trong năm đầu.',
      },
      {
        id: 'abs-ex-7-q3',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How long did the researchers track the 420 early-career employees?',
        questionVi: 'Nhóm nghiên cứu đã theo dõi 420 nhân sự trẻ trong bao lâu?',
        options: [
          'Six weeks',
          'Three months',
          '18 months',
          'Five years',
        ],
        correctIndex: 2,
        explanationVi: 'Đoạn văn nêu rõ: "This 18-month field study tracked 420 early-career employees..."',
      },
      {
        id: 'abs-ex-7-q4',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What conclusion does the study support for consulting firms?',
        questionVi: 'Nghiên cứu ủng hộ kết luận nào cho các công ty tư vấn?',
        options: [
          'All junior employees should work exclusively from home.',
          'Five-day office mandates maximize early-career retention.',
          'Mentorship programs are unnecessary in regional offices.',
          'A three-day hybrid schedule balances flexibility with collaborative learning.',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối kết luận lịch hybrid 3 ngày cân bằng giữa kỳ vọng linh hoạt và học hỏi cộng tác.',
      },
    ],
  },
  {
    id: 'abs-ex-8',
    title: 'Greenwashing Perceptions and Consumer Brand Trust in E-Commerce',
    domain: 'Kinh tế & Quản trị',
    level: 'B2',
    publicationContext: 'Journal of Consumer Behavior • Experimental Study',
    abstractEn:
      'As sustainability marketing proliferates across online retail platforms, consumers increasingly scrutinize vague environmental claims. This randomized online experiment examined how unverified eco-labels versus third-party certifications influence purchase intent and brand trust among 540 young adult shoppers. Participants viewed identical product pages for everyday apparel featuring either generic green slogans, certified audit badges, or standard non-environmental descriptions. Mediation analysis demonstrated that vague slogans triggered skepticism regarding corporate motives, reducing brand trust by 19 percent compared to neutral descriptions. Conversely, independently verified certifications significantly enhanced perceived credibility and willingness to pay a modest price premium. E-commerce brands should avoid unsubstantiated sustainability rhetoric and instead disclose measurable, externally audited environmental metrics.',
    translationVi:
      'Khi tiếp thị bền vững lan rộng trên các sàn bán lẻ trực tuyến, người tiêu dùng ngày càng soi xét kỹ những tuyên bố môi trường mơ hồ. Thí nghiệm trực tuyến ngẫu nhiên này kiểm tra cách nhãn sinh thái chưa kiểm chứng so với chứng nhận bên thứ ba tác động thế nào đến ý định mua và niềm tin thương hiệu ở 540 người mua sắm trẻ. Người tham gia xem các trang sản phẩm may mặc giống hệt nhau nhưng có khẩu hiệu xanh chung chung, huy hiệu kiểm định độc lập, hoặc mô tả trung tính. Phân tích trung gian cho thấy khẩu hiệu mơ hồ kích hoạt sự hoài nghi về động cơ doanh nghiệp, làm giảm 19% niềm tin thương hiệu so với mô tả trung tính. Ngược lại, chứng nhận được kiểm chứng độc lập nâng cao đáng kể độ tin cậy.',
    keyTerms: ['greenwashing', 'eco-labels', 'mediation analysis', 'skepticism', 'price premium'],
    questions: [
      {
        id: 'abs-ex-8-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What effect did vague green slogans have compared to neutral product descriptions?',
        questionVi: 'Khẩu hiệu xanh mơ hồ tạo ra tác động gì so với mô tả sản phẩm trung tính?',
        options: [
          'They triggered skepticism and lowered brand trust by 19 percent.',
          'They doubled consumers’ willingness to pay a price premium.',
          'They had no measurable impact on shopper perceptions.',
          'They outperformed third-party audit badges in credibility.',
        ],
        correctIndex: 0,
        explanationVi: 'Khẩu hiệu mơ hồ gây hoài nghi và làm giảm 19% niềm tin thương hiệu so với mô tả trung tính.',
      },
      {
        id: 'abs-ex-8-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How was the experiment structured for the 540 participants?',
        questionVi: 'Thí nghiệm với 540 người tham gia được thiết kế như thế nào?',
        options: [
          'Participants visited physical apparel stores in three cities.',
          'Participants were randomly shown identical product pages with three different claim types.',
          'Participants interviewed apparel factory managers online.',
          'Participants tracked their clothing purchases over twelve months.',
        ],
        correctIndex: 1,
        explanationVi: 'Thí nghiệm ngẫu nhiên cho người tham gia xem các trang sản phẩm giống nhau chỉ khác loại tuyên bố (khẩu hiệu chung, chứng nhận kiểm định, hoặc mô tả trung tính).',
      },
      {
        id: 'abs-ex-8-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'Which factor increased consumers’ willingness to pay a modest price premium?',
        questionVi: 'Yếu tố nào làm tăng mức sẵn sàng trả thêm giá của người tiêu dùng?',
        options: [
          'Generic green slogans on packaging',
          'Removal of all product descriptions',
          'Independently verified third-party certifications',
          'Frequent flash-sale discount banners',
        ],
        correctIndex: 2,
        explanationVi: 'Chứng nhận được kiểm chứng độc lập nâng cao độ tin cậy cảm nhận và mức sẵn lòng trả thêm giá.',
      },
      {
        id: 'abs-ex-8-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What practical advice does the study offer to e-commerce marketing teams?',
        questionVi: 'Nghiên cứu đưa ra lời khuyên thực tiễn nào cho đội ngũ tiếp thị thương mại điện tử?',
        options: [
          'Use greener background colors on product thumbnails.',
          'Stop selling everyday apparel online.',
          'Hide environmental metrics from young adult shoppers.',
          'Replace vague sustainability claims with audited, measurable environmental data.',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối khuyên tránh ngôn từ bền vững thiếu căn cứ và công bố các chỉ số môi trường đo lường được, có kiểm toán độc lập.',
      },
    ],
  },
  {
    id: 'abs-ex-9',
    title: 'Microcredit Access and Female Entrepreneurship in Peri-Urban Markets',
    domain: 'Kinh tế & Quản trị',
    level: 'C1',
    publicationContext: 'Development Economics Quarterly • Panel Data Analysis',
    abstractEn:
      'Microfinance programs are widely promoted to alleviate capital constraints among women-led microenterprises, yet their long-term profitability effects remain contested. This study analyzed five-year panel data from 1,120 female-owned retail and food-processing ventures in peri-urban districts. Difference-in-differences estimation compared borrowers who received collateral-free microloans paired with bookkeeping training against matched non-borrowers. While credit access alone produced only modest, short-lived revenue gains, combining loans with practical financial-literacy coaching raised net monthly profits by 22 percent after three years. Furthermore, trained borrowers reinvested a higher share of earnings into productive equipment rather than household consumption. Policymakers should bundle microcredit disbursement with targeted business-management training to foster sustainable enterprise growth.',
    translationVi:
      'Các chương trình tài chính vi mô thường được thúc đẩy nhằm giảm rào cản vốn cho doanh nghiệp siêu nhỏ do phụ nữ làm chủ, nhưng tác động lợi nhuận dài hạn vẫn còn tranh cãi. Nghiên cứu này phân tích dữ liệu bảng 5 năm của 1.120 cơ sở bán lẻ và chế biến thực phẩm do phụ nữ sở hữu tại khu vực ven đô. Phương pháp ước lượng khác biệt trong khác biệt so sánh nhóm vay vốn vi mô không thế chấp kèm đào tạo sổ sách kế toán với nhóm đối chứng tương đồng. Dù tiếp cận tín dụng đơn thuần chỉ giúp tăng doanh thu khiêm tốn và ngắn hạn, việc kết hợp vốn vay với huấn luyện quản trị tài chính thực tế giúp lợi nhuận ròng hàng tháng tăng 22% sau ba năm.',
    keyTerms: ['microfinance', 'panel data', 'difference-in-differences', 'collateral-free', 'reinvested'],
    questions: [
      {
        id: 'abs-ex-9-q1',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What is the central finding regarding microcredit without training?',
        questionVi: 'Phát hiện cốt lõi về tín dụng vi mô khi không đi kèm đào tạo là gì?',
        options: [
          'Credit access alone yielded only modest and temporary revenue gains.',
          'It forced half of the retail ventures to close within one year.',
          'It automatically increased net monthly profits by 22 percent.',
          'It eliminated the need for productive business equipment.',
        ],
        correctIndex: 0,
        explanationVi: 'Bài viết chỉ rõ: "credit access alone produced only modest, short-lived revenue gains".',
      },
      {
        id: 'abs-ex-9-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'Which econometric method did the authors use to evaluate program impact?',
        questionVi: 'Phương pháp kinh tế lượng nào được tác giả sử dụng để đánh giá tác động?',
        options: [
          'Cross-sectional telephone polling',
          'Difference-in-differences estimation on five-year panel data',
          'Qualitative case studies of three urban banks',
          'Laboratory game-theory experiments',
        ],
        correctIndex: 1,
        explanationVi: 'Tác giả dùng ước lượng khác biệt trong khác biệt (difference-in-differences) trên dữ liệu bảng 5 năm.',
      },
      {
        id: 'abs-ex-9-q3',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'How did bookkeeping and financial-literacy coaching change borrower behavior?',
        questionVi: 'Việc huấn luyện sổ sách và tài chính đã thay đổi hành vi người vay như thế nào?',
        options: [
          'They spent all loan funds on immediate household consumption.',
          'They stopped borrowing from formal institutions.',
          'They reinvested a larger share of earnings into productive equipment.',
          'They shifted from food processing to commercial banking.',
        ],
        correctIndex: 2,
        explanationVi: 'Người vay được đào tạo tái đầu tư tỷ trọng thu nhập cao hơn vào thiết bị sản xuất thay vì tiêu dùng hộ gia đình.',
      },
      {
        id: 'abs-ex-9-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What policy design does the study advocate?',
        questionVi: 'Nghiên cứu ủng hộ thiết kế chính sách nào?',
        options: [
          'Requiring high real-estate collateral for all microenterprises',
          'Replacing microcredit programs with cash grants for consumption',
          'Limiting loans strictly to large urban corporations',
          'Bundling microloan disbursement with practical business-management training',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối khuyến nghị gắn giải ngân tín dụng vi mô với đào tạo quản trị kinh doanh có mục tiêu.',
      },
    ],
  },
  {
    id: 'abs-ex-10',
    title: 'Dynamic Pricing Algorithms and Customer Fairness Perceptions in Ride-Hailing',
    domain: 'Kinh tế & Quản trị',
    level: 'B2',
    publicationContext: 'Service Operations & Marketing • Empirical Study',
    abstractEn:
      'Digital ride-hailing platforms rely on surge-pricing algorithms to balance driver supply with fluctuating passenger demand during peak hours. However, opaque price multipliers frequently provoke customer dissatisfaction and platform switching. This study combined transaction logs from 15,000 urban trips with a follow-up survey of 620 commuters to assess how price transparency moderates fairness perceptions. Results showed that sudden 2.5x fare spikes reduced repeat booking probability by 27 percent when no explanation was displayed. In contrast, interfaces displaying real-time driver scarcity metrics and estimated wait-time reductions mitigated negative reactions by nearly half. Furthermore, offering commuters a capped-fare subscription option stabilized platform loyalty during adverse weather. Transparent algorithmic communication can therefore sustain both market efficiency and customer retention.',
    translationVi:
      'Các nền tảng gọi xe công nghệ dựa vào thuật toán giá linh hoạt (surge-pricing) để cân bằng nguồn cung tài xế với nhu cầu hành khách biến động vào giờ cao điểm. Tuy nhiên, hệ số nhân giá thiếu minh bạch thường gây bất mãn và khiến khách hàng chuyển nền tảng. Nghiên cứu này kết hợp nhật ký giao dịch của 15.000 chuyến đi đô thị với khảo sát 620 người đi làm để đánh giá vai trò điều tiết của tính minh bạch giá lên cảm nhận công bằng. Kết quả cho thấy mức tăng giá đột ngột 2,5 lần làm giảm 27% xác suất đặt lại chuyến khi không có giải thích. Ngược lại, giao diện hiển thị mức độ khan hiếm tài xế theo thời gian thực và thời gian chờ được rút ngắn giúp giảm gần một nửa phản ứng tiêu cực.',
    keyTerms: ['surge-pricing', 'opaque', 'moderates', 'scarcity metrics', 'platform loyalty'],
    questions: [
      {
        id: 'abs-ex-10-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What happened when 2.5x fare spikes were shown without any explanation?',
        questionVi: 'Điều gì xảy ra khi mức giá tăng 2,5 lần được hiển thị mà không có giải thích?',
        options: [
          'Repeat booking probability dropped by 27 percent.',
          'Driver supply doubled within five minutes.',
          'Customer loyalty increased during adverse weather.',
          'Wait-time estimates became more accurate.',
        ],
        correctIndex: 0,
        explanationVi: 'Đoạn văn nêu rõ: "sudden 2.5x fare spikes reduced repeat booking probability by 27 percent when no explanation was displayed."',
      },
      {
        id: 'abs-ex-10-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'What two data sources were analyzed in this study?',
        questionVi: 'Hai nguồn dữ liệu nào đã được phân tích trong nghiên cứu?',
        options: [
          'Driver tax returns and municipal traffic camera footage',
          'Transaction logs from 15,000 trips and a survey of 620 commuters',
          'Fuel price indices and automobile manufacturing reports',
          'Interviews with 20 software engineers',
        ],
        correctIndex: 1,
        explanationVi: 'Nghiên cứu kết hợp nhật ký giao dịch 15.000 chuyến đi và khảo sát 620 người đi làm.',
      },
      {
        id: 'abs-ex-10-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'How can ride-hailing apps reduce negative reactions to surge pricing?',
        questionVi: 'Ứng dụng gọi xe có thể giảm phản ứng tiêu cực với giá giờ cao điểm bằng cách nào?',
        options: [
          'By hiding fare estimates until the trip ends',
          'By banning surge pricing during rainy weather',
          'By showing real-time driver scarcity and wait-time benefits',
          'By charging higher subscription fees to infrequent riders',
        ],
        correctIndex: 2,
        explanationVi: 'Giao diện hiển thị số liệu khan hiếm tài xế theo thời gian thực và mức giảm thời gian chờ giúp giảm gần một nửa phản ứng tiêu cực.',
      },
      {
        id: 'abs-ex-10-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What does the capped-fare subscription finding suggest for platform strategy?',
        questionVi: 'Phát hiện về gói đăng ký trần giá (capped-fare) gợi ý điều gì cho chiến lược nền tảng?',
        options: [
          'Commuters never use ride-hailing services in bad weather.',
          'Surge pricing algorithms should be replaced by flat-rate taxis.',
          'Price transparency has no effect on regular commuters.',
          'Predictable pricing options help retain frequent users during demand shocks.',
        ],
        correctIndex: 3,
        explanationVi: 'Gói trần giá giúp ổn định lòng trung thành của khách hàng khi thời tiết xấu (cú sốc nhu cầu).',
      },
    ],
  },

  // =========================================================
  // 3. CÔNG NGHỆ & KỸ THUẬT (5 bài: abs-ex-11 .. abs-ex-15)
  // =========================================================
  {
    id: 'abs-ex-11',
    title: 'Edge Computing Latency Reduction in Smart Campus IoT Networks',
    domain: 'Công nghệ & Kỹ thuật',
    level: 'B2',
    publicationContext: 'IEEE Internet of Things Applications • Systems Evaluation',
    abstractEn:
      'Smart university campuses deploy thousands of environmental and occupancy sensors to automate lighting and ventilation, yet transmitting raw telemetry to remote cloud servers often introduces bandwidth bottlenecks. This engineering study evaluated a decentralized edge-computing gateway architecture across three academic buildings housing 480 IoT nodes. Sensor streams were preprocessed locally on ARM-based edge gateways before sending aggregated summaries to the central cloud. Benchmark measurements over sixty days compared cloud-only routing against the edge-assisted topology under peak network load. Results demonstrated that local aggregation reduced average response latency from 410 milliseconds to 58 milliseconds while cutting upstream bandwidth consumption by 64 percent. Furthermore, automated HVAC controls continued operating uninterrupted during two simulated internet outages. Campus infrastructure teams should prioritize local edge nodes for time-sensitive building automation.',
    translationVi:
      'Khuôn viên đại học thông minh triển khai hàng nghìn cảm biến môi trường và mật độ để tự động hóa chiếu sáng và thông gió, nhưng việc truyền dữ liệu thô lên máy chủ đám mây từ xa thường gây nghẽn băng thông. Nghiên cứu kỹ thuật này đánh giá kiến trúc cổng điện toán biên phi tập trung tại ba tòa nhà học thuật với 480 nút IoT. Luồng cảm biến được tiền xử lý cục bộ trên cổng biên nền tảng ARM trước khi gửi tóm tắt tổng hợp lên đám mây trung tâm. Đo kiểm trong 60 ngày cho thấy tổng hợp cục bộ giảm độ trễ phản hồi trung bình từ 410 mili-giây xuống 58 mili-giây và giảm 64% tiêu thụ băng thông tải lên.',
    keyTerms: ['telemetry', 'edge-computing', 'latency', 'upstream bandwidth', 'topology'],
    questions: [
      {
        id: 'abs-ex-11-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'How much did local edge aggregation reduce average response latency?',
        questionVi: 'Việc tổng hợp tại biên cục bộ đã giảm độ trễ phản hồi trung bình như thế nào?',
        options: [
          'From 410 milliseconds down to 58 milliseconds',
          'From 64 milliseconds down to 41 milliseconds',
          'By 12 percent during off-peak hours only',
          'It slightly increased latency due to local preprocessing',
        ],
        correctIndex: 0,
        explanationVi: 'Kết quả đo kiểm ghi rõ: "reduced average response latency from 410 milliseconds to 58 milliseconds".',
      },
      {
        id: 'abs-ex-11-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'Where was the sensor data preprocessed before reaching the central cloud?',
        questionVi: 'Dữ liệu cảm biến được tiền xử lý ở đâu trước khi lên đám mây trung tâm?',
        options: [
          'On students’ personal smartphones',
          'Locally on ARM-based edge gateways',
          'Inside remote commercial data centers',
          'Manually by campus facility engineers',
        ],
        correctIndex: 1,
        explanationVi: 'Luồng cảm biến được tiền xử lý cục bộ trên các cổng biên dùng vi xử lý ARM ("locally on ARM-based edge gateways").',
      },
      {
        id: 'abs-ex-11-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What resilience advantage did the edge-assisted architecture demonstrate?',
        questionVi: 'Kiến trúc hỗ trợ điện toán biên thể hiện ưu thế chống chịu nào?',
        options: [
          'It doubled the battery life of campus laptops.',
          'It eliminated the need for environmental sensors.',
          'HVAC automation kept running during simulated internet outages.',
          'It prevented physical damage to academic buildings.',
        ],
        correctIndex: 2,
        explanationVi: 'Hệ thống điều khiển HVAC tự động vẫn vận hành liên tục trong hai lần mô phỏng mất kết nối internet.',
      },
      {
        id: 'abs-ex-11-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'Why is edge computing particularly suitable for building automation?',
        questionVi: 'Vì sao điện toán biên đặc biệt phù hợp với tự động hóa tòa nhà?',
        options: [
          'Because cloud servers cannot store temperature records',
          'Because university campuses rarely have electricity',
          'Because it increases raw telemetry traffic to external networks',
          'Because it ensures fast, low-bandwidth responses even when external connectivity drops',
        ],
        correctIndex: 3,
        explanationVi: 'Điện toán biên giảm độ trễ, tiết kiệm băng thông và duy trì hoạt động ổn định khi mất mạng bên ngoài.',
      },
    ],
  },
  {
    id: 'abs-ex-12',
    title: 'Explainable AI Dashboards and Radiologist Diagnostic Trust in Clinical Triage',
    domain: 'Công nghệ & Kỹ thuật',
    level: 'C1',
    publicationContext: 'Artificial Intelligence in Medicine • Human-Computer Interaction',
    abstractEn:
      'Deep learning models achieve high accuracy in screening chest radiographs, yet opaque black-box predictions often face clinician skepticism during urgent triage. This human-computer interaction study examined whether visual explainability overlays improve diagnostic calibration among 48 resident and attending radiologists. Participants reviewed 120 anonymized X-ray cases under three conditions: unassisted reading, AI probability score only, and AI score paired with Grad-CAM saliency heatmaps and uncertainty intervals. Diagnostic accuracy, reading time, and appropriate reliance on correct versus flawed AI advice were recorded. While probability scores alone induced automation bias on borderline false-positive cases, adding saliency heatmaps and uncertainty bounds increased error-rejection accuracy by 23 percent. Clinicians also completed reviews 15 percent faster than in unassisted reading. Medical AI interfaces should pair visual localization with calibrated confidence indicators.',
    translationVi:
      'Các mô hình học sâu đạt độ chính xác cao khi sàng lọc phim X-quang ngực, nhưng dự đoán hộp đen thiếu minh bạch thường vấp phải sự hoài nghi của bác sĩ trong phân loại cấp cứu. Nghiên cứu tương tác người–máy này kiểm tra liệu lớp phủ giải thích trực quan có cải thiện khả năng hiệu chỉnh chẩn đoán ở 48 bác sĩ chẩn đoán hình ảnh hay không. Người tham gia đọc 120 ca X-quang ẩn danh theo ba điều kiện: tự đọc, chỉ có điểm xác suất AI, và điểm AI kèm bản đồ nhiệt Grad-CAM cùng khoảng bất định. Kết quả cho thấy chỉ hiển thị điểm xác suất gây thiên kiến tự động hóa ở các ca dương tính giả sát ngưỡng, nhưng việc thêm bản đồ nhiệt và khoảng bất định tăng độ chính xác bác bỏ lỗi AI thêm 23%.',
    keyTerms: ['black-box predictions', 'triage', 'saliency heatmaps', 'automation bias', 'confidence indicators'],
    questions: [
      {
        id: 'abs-ex-12-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What unintended risk occurred when radiologists saw only AI probability scores?',
        questionVi: 'Rủi ro ngoài ý muốn nào xảy ra khi bác sĩ chỉ nhìn thấy điểm xác suất của AI?',
        options: [
          'It induced automation bias on borderline false-positive cases.',
          'It slowed reading time by 40 percent.',
          'It caused clinicians to ignore all AI recommendations.',
          'It erased anonymized patient identifiers.',
        ],
        correctIndex: 0,
        explanationVi: 'Bài viết chỉ ra: "probability scores alone induced automation bias on borderline false-positive cases".',
      },
      {
        id: 'abs-ex-12-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'What did the third experimental interface add alongside the AI probability score?',
        questionVi: 'Giao diện thử nghiệm thứ ba bổ sung yếu tố gì cùng điểm xác suất AI?',
        options: [
          'Audio voiceovers from senior surgeons',
          'Grad-CAM saliency heatmaps and uncertainty intervals',
          'Patient billing records and insurance codes',
          'Raw source code of the neural network',
        ],
        correctIndex: 1,
        explanationVi: 'Điều kiện thứ ba kết hợp điểm AI với bản đồ nhiệt Grad-CAM và khoảng bất định (uncertainty intervals).',
      },
      {
        id: 'abs-ex-12-q3',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'How did the full explainable dashboard affect error rejection and speed?',
        questionVi: 'Bảng điều khiển giải thích đầy đủ tác động thế nào đến khả năng bác bỏ lỗi và tốc độ?',
        options: [
          'It lowered accuracy by 15 percent.',
          'It doubled the number of false positives.',
          'It raised error-rejection accuracy by 23% and sped up reviews by 15%.',
          'It had no measurable effect on diagnostic time.',
        ],
        correctIndex: 2,
        explanationVi: 'Bản đồ nhiệt và khoảng bất định giúp tăng 23% độ chính xác bác bỏ lỗi AI và rút ngắn 15% thời gian đọc phim.',
      },
      {
        id: 'abs-ex-12-q4',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What design principle do the authors recommend for clinical AI tools?',
        questionVi: 'Nhóm tác giả khuyến nghị nguyên tắc thiết kế nào cho công cụ AI y tế?',
        options: [
          'Removing probability scores completely from X-ray viewers',
          'Replacing attending radiologists with deep learning models',
          'Hiding model uncertainty to boost clinician confidence',
          'Combining visual localization with calibrated uncertainty indicators',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối khuyên giao diện AI y khoa nên kết hợp định vị trực quan với chỉ báo độ tin cậy đã hiệu chỉnh.',
      },
    ],
  },
  {
    id: 'abs-ex-13',
    title: 'Zero-Trust Microsegmentation Against Lateral Movement in University Networks',
    domain: 'Công nghệ & Kỹ thuật',
    level: 'C1',
    publicationContext: 'Computers & Security • Network Architecture Study',
    abstractEn:
      'Higher education networks face frequent ransomware intrusions because open campus wireless environments allow compromised endpoints to communicate freely across internal subnets. This cybersecurity evaluation modeled and deployed zero-trust microsegmentation across a university research VLAN serving 1,400 workstations. Unlike perimeter-only firewalls, the microsegmented architecture enforced identity-verified, least-privilege access policies between individual departmental hosts. Penetration testing conducted by an independent red team simulated credential theft on twenty student lab machines before and after deployment. Prior to microsegmentation, attackers reached core administrative servers within an average of 38 minutes. Following policy enforcement, lateral movement was contained within the originating lab subnet in 95 percent of test runs, with only a 3 percent overhead in authentication latency. Universities should adopt phased microsegmentation to protect sensitive research repositories.',
    translationVi:
      'Mạng lưới giáo dục đại học thường xuyên đối mặt với xâm nhập mã độc tống tiền do môi trường Wi-Fi mở cho phép thiết bị đầu cuối bị chiếm quyền giao tiếp tự do giữa các mạng con nội bộ. Nghiên cứu an ninh mạng này triển khai phân đoạn vi mô không tin cậy (zero-trust microsegmentation) trên một VLAN nghiên cứu phục vụ 1.400 máy trạm. Khác với tường lửa chỉ bảo vệ vòng ngoài, kiến trúc phân đoạn vi mô áp đặt chính sách truy cập đặc quyền tối thiểu có xác thực danh tính giữa từng máy chủ khoa. Kiểm thử xâm nhập của đội đỏ độc lập mô phỏng đánh cắp thông tin đăng nhập trên 20 máy phòng lab cho thấy trước khi phân đoạn, kẻ tấn công chạm tới máy chủ quản trị lõi chỉ trong 38 phút. Sau khi áp dụng chính sách, sự di chuyển ngang bị cô lập trong mạng con ban đầu ở 95% lượt thử.',
    keyTerms: ['ransomware', 'zero-trust', 'microsegmentation', 'lateral movement', 'least-privilege'],
    questions: [
      {
        id: 'abs-ex-13-q1',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'Why are traditional university networks vulnerable to rapid ransomware spread?',
        questionVi: 'Vì sao mạng đại học truyền thống dễ bị mã độc tống tiền lan nhanh?',
        options: [
          'Open internal subnets allow compromised devices to communicate freely.',
          'Universities do not use any antivirus software on servers.',
          'Student lab machines lack physical network cables.',
          'Authentication latency exceeds ten minutes per login.',
        ],
        correctIndex: 0,
        explanationVi: 'Môi trường mạng mở cho phép các thiết bị bị xâm nhập giao tiếp tự do qua các mạng con nội bộ (lateral movement).',
      },
      {
        id: 'abs-ex-13-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How was security effectiveness tested before and after deployment?',
        questionVi: 'Hiệu quả bảo mật được kiểm tra ra sao trước và sau khi triển khai?',
        options: [
          'By surveying 1,400 undergraduate students',
          'Through red-team penetration testing simulating credential theft',
          'By disconnecting the campus from the internet for a week',
          'By monitoring electricity usage on administrative servers',
        ],
        correctIndex: 1,
        explanationVi: 'Đội đỏ độc lập (independent red team) thực hiện kiểm thử xâm nhập mô phỏng đánh cắp thông tin đăng nhập trên 20 máy lab.',
      },
      {
        id: 'abs-ex-13-q3',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What happened after zero-trust microsegmentation policies were enforced?',
        questionVi: 'Điều gì xảy ra sau khi chính sách phân đoạn vi mô zero-trust được áp dụng?',
        options: [
          'Attackers reached core servers twice as fast.',
          'Authentication latency increased by 95 percent.',
          'Lateral movement was contained within the starting subnet in 95% of runs.',
          'All 1,400 workstations lost access to research repositories.',
        ],
        correctIndex: 2,
        explanationVi: 'Sự di chuyển ngang bị cô lập ngay trong mạng con xuất phát ở 95% lượt thử nghiệm, với độ trễ xác thực chỉ tăng 3%.',
      },
      {
        id: 'abs-ex-13-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What does the 3 percent authentication overhead indicate?',
        questionVi: 'Mức phụ tải trễ xác thực chỉ 3% cho thấy điều gì?',
        options: [
          'Microsegmentation is too slow for academic workloads.',
          'Perimeter firewalls should be completely removed.',
          'Red-team tests failed to measure network speed.',
          'Strong internal security isolation can be achieved with minimal performance cost.',
        ],
        correctIndex: 3,
        explanationVi: 'Độ trễ chỉ tăng 3% chứng tỏ bảo mật phân đoạn vi mô mang lại hiệu quả cô lập cao mà gần như không ảnh hưởng hiệu năng.',
      },
    ],
  },
  {
    id: 'abs-ex-14',
    title: 'Solar-Powered Desalination Membranes for Coastal Rural Communities',
    domain: 'Công nghệ & Kỹ thuật',
    level: 'B2',
    publicationContext: 'Desalination & Water Engineering • Prototype Field Trial',
    abstractEn:
      'Freshwater scarcity in coastal agricultural villages is exacerbated by seasonal saltwater intrusion and unreliable grid electricity. This engineering study tested a modular, solar-powered reverse-osmosis (RO) desalination unit equipped with anti-fouling graphene-oxide composite membranes. A six-month field trial was conducted in a coastal commune in southern Vietnam, processing brackish well water with salinity levels up to 12,000 parts per million. System throughput, energy consumption per cubic meter, and membrane flux decline were monitored continuously. Compared with conventional polyamide membranes, the composite modules maintained 26 percent higher permeate flux after 1,500 operating hours and required chemical cleaning half as often. Driven solely by a 4-kilowatt photovoltaic array with battery buffering, the unit supplied 3,200 liters of potable water daily at competitive operating cost.',
    translationVi:
      'Tình trạng khan hiếm nước ngọt tại các làng nông nghiệp ven biển trở nên trầm trọng hơn do xâm nhập mặn theo mùa và điện lưới thiếu ổn định. Nghiên cứu kỹ thuật này thử nghiệm một hệ thống lọc thẩm thấu ngược (RO) mô-đun chạy bằng năng lượng mặt trời sử dụng màng composite oxit graphene chống bám bẩn. Thử nghiệm thực địa 6 tháng tại một xã ven biển miền Nam Việt Nam xử lý nước giếng nhiễm lợ có độ mặn tới 12.000 ppm. So với màng polyamide truyền thống, mô-đun composite duy trì thông lượng nước thấm cao hơn 26% sau 1.500 giờ vận hành và chỉ cần rửa hóa chất ít hơn một nửa. Chạy hoàn toàn bằng dàn pin mặt trời 4 kW có ắc quy đệm, thiết bị cung cấp 3.200 lít nước uống mỗi ngày.',
    keyTerms: ['desalination', 'saltwater intrusion', 'anti-fouling', 'permeate flux', 'photovoltaic'],
    questions: [
      {
        id: 'abs-ex-14-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'How did the graphene-oxide composite membranes outperform conventional polyamide membranes?',
        questionVi: 'Màng composite oxit graphene vượt trội hơn màng polyamide truyền thống ở điểm nào?',
        options: [
          'They maintained 26% higher flux and needed chemical cleaning half as often.',
          'They operated without any solar panels or battery buffering.',
          'They processed seawater with zero electricity consumption.',
          'They eliminated all seasonal saltwater intrusion in the region.',
        ],
        correctIndex: 0,
        explanationVi: 'Màng mới duy trì thông lượng cao hơn 26% sau 1.500 giờ và tần suất rửa hóa chất giảm một nửa.',
      },
      {
        id: 'abs-ex-14-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'Where and how long was the prototype tested?',
        questionVi: 'Nguyên mẫu thiết bị được thử nghiệm ở đâu và trong bao lâu?',
        options: [
          'In an urban laboratory for 1,500 days',
          'In a coastal commune in southern Vietnam for six months',
          'On an offshore oil platform for two weeks',
          'Inside a university chemistry building for one year',
        ],
        correctIndex: 1,
        explanationVi: 'Thử nghiệm thực địa kéo dài 6 tháng tại một xã ven biển ở miền Nam Việt Nam.',
      },
      {
        id: 'abs-ex-14-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What problem does this modular solar RO system aim to solve?',
        questionVi: 'Hệ thống RO năng lượng mặt trời dạng mô-đun này nhằm giải quyết vấn đề gì?',
        options: [
          'High urban electricity prices in industrial zones',
          'Plastic pollution in deep ocean trenches',
          'Freshwater shortages in coastal areas facing salinity and unstable grid power',
          'Excessive rainfall flooding in northern mountain provinces',
        ],
        correctIndex: 2,
        explanationVi: 'Hệ thống giải quyết tình trạng thiếu nước ngọt ở vùng ven biển bị xâm nhập mặn và điện lưới không ổn định.',
      },
      {
        id: 'abs-ex-14-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'Why is reduced chemical cleaning frequency important for rural coastal communes?',
        questionVi: 'Vì sao việc giảm tần suất rửa hóa chất lại quan trọng đối với xã ven biển nông thôn?',
        options: [
          'Because brackish water contains no minerals',
          'Because photovoltaic arrays cannot operate near water',
          'Because residents prefer salty drinking water',
          'Because it lowers maintenance costs, chemical waste, and technical downtime',
        ],
        correctIndex: 3,
        explanationVi: 'Ít phải rửa hóa chất giúp giảm chi phí vận hành, giảm hóa chất thải và hạn chế thời gian ngừng máy ở vùng nông thôn.',
      },
    ],
  },
  {
    id: 'abs-ex-15',
    title: 'Automated Unit-Test Generation Using Large Language Models in Software Engineering',
    domain: 'Công nghệ & Kỹ thuật',
    level: 'B1',
    publicationContext: 'Empirical Software Engineering • Benchmark Study',
    abstractEn:
      'Writing comprehensive unit tests is vital for software reliability, yet developers often skip edge-case coverage under tight release deadlines. This empirical benchmark evaluated three large language models (LLMs) on generating Python unit tests across 300 open-source utility modules. Generated test suites were executed in sandboxed containers to measure syntax validity, branch coverage, and mutation-detection scores. When prompted solely with function signatures, LLMs achieved 68 percent branch coverage but missed subtle boundary exceptions such as empty-list inputs. However, supplying docstring specifications alongside one failing example boosted branch coverage to 87 percent and raised bug-detection rates by 31 percent. Nevertheless, 14 percent of generated assertions contained hallucinated expected values, underscoring that automated test synthesis requires human developer verification.',
    translationVi:
      'Viết kiểm thử đơn vị (unit test) toàn diện rất quan trọng cho độ tin cậy phần mềm, nhưng lập trình viên thường bỏ qua các trường hợp biên khi chạy gấp tiến độ. Nghiên cứu chuẩn đối sánh này đánh giá ba mô hình ngôn ngữ lớn (LLM) trong việc sinh unit test Python cho 300 mô-đun mã nguồn mở. Khi chỉ được cung cấp chữ ký hàm, LLM đạt 68% độ phủ nhánh nhưng bỏ sót các ngoại lệ biên tinh tế như đầu vào danh sách rỗng. Tuy nhiên, khi bổ sung mô tả docstring kèm một ví dụ lỗi, độ phủ nhánh tăng lên 87% và tỷ lệ phát hiện lỗi tăng 31%. Dù vậy, 14% câu khẳng định kiểm thử (assertion) chứa giá trị kỳ vọng bị ảo giác, nhấn mạnh rằng lập trình viên vẫn cần kiểm tra lại.',
    keyTerms: ['unit tests', 'branch coverage', 'boundary exceptions', 'docstring', 'hallucinated assertions'],
    questions: [
      {
        id: 'abs-ex-15-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'How did adding docstring specifications and one failing example affect branch coverage?',
        questionVi: 'Việc bổ sung docstring và một ví dụ lỗi tác động thế nào đến độ phủ nhánh?',
        options: [
          'It increased branch coverage from 68 percent to 87 percent.',
          'It reduced bug-detection rates by 31 percent.',
          'It caused all 300 Python modules to fail syntax checks.',
          'It eliminated all hallucinated test assertions.',
        ],
        correctIndex: 0,
        explanationVi: 'Độ phủ nhánh tăng từ 68% lên 87% và tỷ lệ phát hiện lỗi tăng thêm 31%.',
      },
      {
        id: 'abs-ex-15-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How were the LLM-generated test suites evaluated?',
        questionVi: 'Các bộ test do LLM sinh ra được đánh giá bằng cách nào?',
        options: [
          'By asking university students to grade them on paper',
          'By running them in sandboxed containers for validity, coverage, and mutation scores',
          'By deploying them directly to commercial banking servers',
          'By counting the number of comments in each Python file',
        ],
        correctIndex: 1,
        explanationVi: 'Các bộ kiểm thử được chạy trong container cách ly (sandboxed containers) để đo tính hợp lệ cú pháp, độ phủ nhánh và điểm phát hiện đột biến.',
      },
      {
        id: 'abs-ex-15-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'Why can developers not rely blindly on LLM-generated unit tests?',
        questionVi: 'Vì sao lập trình viên không thể tin tưởng tuyệt đối vào unit test do LLM sinh ra?',
        options: [
          'LLMs cannot generate valid Python syntax.',
          'Open-source modules do not support automated testing.',
          '14 percent of generated assertions contained hallucinated expected values.',
          'Sandboxed containers cannot execute boundary exceptions.',
        ],
        correctIndex: 2,
        explanationVi: '14% assertion được sinh ra chứa giá trị kỳ vọng bị ảo giác (sai sự thật logic), đòi hỏi con người kiểm chứng.',
      },
      {
        id: 'abs-ex-15-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What best practice does this study suggest for software teams using LLMs?',
        questionVi: 'Nghiên cứu gợi ý thực hành tốt nhất nào cho nhóm phần mềm dùng LLM?',
        options: [
          'Delete docstrings from codebases to save prompt tokens',
          'Stop writing edge-case tests for utility modules',
          'Replace senior QA engineers with prompt templates',
          'Provide rich context in prompts and review all generated assertions manually',
        ],
        correctIndex: 3,
        explanationVi: 'Cung cấp ngữ cảnh rõ (docstring, ví dụ lỗi) giúp tăng độ phủ, đồng thời lập trình viên phải rà soát thủ công các assertion.',
      },
    ],
  },

  // =========================================================
  // 4. XÃ HỘI & GIÁO DỤC (5 bài: abs-ex-16 .. abs-ex-20)
  // =========================================================
  {
    id: 'abs-ex-16',
    title: 'Bilingual Instruction and Conceptual Mastery in STEM Undergraduate Lectures',
    domain: 'Xã hội & Giáo dục',
    level: 'B2',
    publicationContext: 'Higher Education Research & Development • Classroom Experiment',
    abstractEn:
      'English-medium instruction (EMI) programs are expanding rapidly across Asian universities, yet students with intermediate English proficiency often experience cognitive overload during dense technical lectures. This classroom experiment investigated whether strategic bilingual scaffolding improves conceptual comprehension among 144 first-year engineering students. One section received exclusively English lectures and slides, while a parallel section received English lectures supplemented by concise Vietnamese concept glossaries and five-minute bilingual wrap-up summaries. Standardized conceptual quizzes administered at week six and week twelve measured mastery of thermodynamics principles without penalizing grammar. The bilingual-scaffolding group scored 16 percent higher on conceptual transfer items, with the largest gains observed among students entering with B1-level English. Strategic use of the first language can therefore accelerate disciplinary learning in EMI settings without sacrificing English exposure.',
    translationVi:
      'Các chương trình giảng dạy bằng tiếng Anh (EMI) đang mở rộng nhanh tại các trường đại học châu Á, nhưng sinh viên có trình độ tiếng Anh trung cấp thường bị quá tải nhận thức trong các bài giảng kỹ thuật dày đặc. Thí nghiệm lớp học này khảo sát liệu giàn giáo song ngữ có chiến lược có cải thiện mức độ hiểu khái niệm ở 144 sinh viên kỹ thuật năm nhất hay không. Một lớp học hoàn toàn bằng tiếng Anh, trong khi lớp song song được cung cấp thêm bảng thuật ngữ tiếng Việt ngắn gọn và 5 phút tóm tắt song ngữ cuối giờ. Kết quả cho thấy nhóm có giàn giáo song ngữ đạt điểm cao hơn 16% ở các câu hỏi vận dụng khái niệm, đặc biệt ở nhóm sinh viên đầu vào mức B1.',
    keyTerms: ['English-medium instruction', 'cognitive overload', 'scaffolding', 'conceptual transfer', 'disciplinary learning'],
    questions: [
      {
        id: 'abs-ex-16-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'Which subgroup benefited most from bilingual scaffolding?',
        questionVi: 'Nhóm sinh viên nào hưởng lợi nhiều nhất từ giàn giáo song ngữ?',
        options: [
          'Students entering with B1-level English proficiency',
          'Native English-speaking exchange students',
          'Graduating seniors in humanities departments',
          'Students who skipped the five-minute wrap-up summaries',
        ],
        correctIndex: 0,
        explanationVi: 'Bài viết ghi rõ mức tăng lớn nhất xuất hiện ở nhóm sinh viên đầu vào trình độ B1 ("with the largest gains observed among students entering with B1-level English").',
      },
      {
        id: 'abs-ex-16-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How did the parallel section differ from the English-only section?',
        questionVi: 'Lớp song song khác lớp chỉ dùng tiếng Anh ở điểm nào?',
        options: [
          'All lectures were taught exclusively in Vietnamese.',
          'It added concise Vietnamese glossaries and 5-minute bilingual summaries.',
          'It removed thermodynamics principles from the syllabus.',
          'It graded students solely on English grammar accuracy.',
        ],
        correctIndex: 1,
        explanationVi: 'Lớp song song vẫn giảng tiếng Anh nhưng bổ sung bảng thuật ngữ tiếng Việt ngắn gọn và 5 phút tổng kết song ngữ.',
      },
      {
        id: 'abs-ex-16-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What does the study conclude about using the first language in EMI classrooms?',
        questionVi: 'Nghiên cứu kết luận gì về việc dùng tiếng mẹ đẻ trong lớp học EMI?',
        options: [
          'It prevents students from learning technical vocabulary.',
          'It should be banned in all engineering faculties.',
          'Strategic use accelerates subject mastery without sacrificing English exposure.',
          'It only works in online asynchronous courses.',
        ],
        correctIndex: 2,
        explanationVi: 'Sử dụng tiếng mẹ đẻ có chiến lược giúp tăng tốc hiểu chuyên ngành mà không làm mất cơ hội tiếp xúc tiếng Anh.',
      },
      {
        id: 'abs-ex-16-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'Why did the conceptual quizzes avoid penalizing English grammar?',
        questionVi: 'Vì sao bài kiểm tra khái niệm không trừ điểm ngữ pháp tiếng Anh?',
        options: [
          'Because lecturers did not know English grammar rules',
          'Because thermodynamics does not require written answers',
          'Because B1 students refused to write in English',
          'To isolate true subject comprehension from language-production errors',
        ],
        correctIndex: 3,
        explanationVi: 'Không trừ điểm ngữ pháp giúp đo lường chính xác mức độ hiểu nguyên lý nhiệt động lực học tách biệt khỏi lỗi diễn đạt ngôn ngữ.',
      },
    ],
  },
  {
    id: 'abs-ex-17',
    title: 'Urban Green Spaces and Social Cohesion in High-Density Apartment Districts',
    domain: 'Xã hội & Giáo dục',
    level: 'B1',
    publicationContext: 'Cities & Society • Mixed-Methods Field Study',
    abstractEn:
      'Rapid vertical urbanization in metropolitan centers often reduces shared neighborhood spaces, raising concerns about social isolation among residents. This mixed-methods study examined how pocket parks influence neighborly trust and civic participation across four high-density apartment districts. Surveys from 680 households were combined with 300 hours of systematic observational mapping across twelve residential courtyards. Regression analysis indicated that residents living within a five-minute walk of well-lit, shaded pocket parks reported 29 percent higher neighborhood trust than those in concrete-only blocks. Observational logs further revealed that multi-use seating and children’s play zones encouraged spontaneous cross-generational conversations, whereas decorative lawns without seating remained largely unused. Urban planners should prioritize accessible, seating-rich micro-parks over purely ornamental landscaping.',
    translationVi:
      'Đô thị hóa theo chiều thẳng đứng nhanh chóng tại các thành phố lớn thường thu hẹp không gian sinh hoạt chung, làm dấy lên lo ngại về sự cô lập xã hội của cư dân. Nghiên cứu đa phương pháp này khảo sát cách các công viên bỏ túi (pocket parks) tác động đến niềm tin hàng xóm và sự gắn kết cộng đồng tại bốn khu chung cư mật độ cao. Khảo sát 680 hộ gia đình được kết hợp với 300 giờ quan sát thực địa tại 12 sân chung cư. Phân tích hồi quy cho thấy cư dân sống cách công viên có bóng mát và đèn chiếu sáng dưới 5 phút đi bộ có mức độ tin cậy hàng xóm cao hơn 29% so với khu chỉ toàn bê tông.',
    keyTerms: ['social cohesion', 'pocket parks', 'mixed-methods', 'cross-generational', 'ornamental'],
    questions: [
      {
        id: 'abs-ex-17-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What difference was found for residents living within five minutes of shaded pocket parks?',
        questionVi: 'Sự khác biệt nào được ghi nhận ở cư dân sống cách công viên bỏ túi có bóng mát dưới 5 phút đi bộ?',
        options: [
          'They reported 29 percent higher neighborhood trust.',
          'They spent 300 hours per month gardening.',
          'They moved out of high-density apartments faster.',
          'They avoided speaking with older neighbors.',
        ],
        correctIndex: 0,
        explanationVi: 'Phân tích hồi quy chỉ ra họ có mức độ tin cậy hàng xóm cao hơn 29% so với khu toàn bê tông.',
      },
      {
        id: 'abs-ex-17-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'Which park design feature failed to attract residents in observational logs?',
        questionVi: 'Đặc điểm thiết kế công viên nào không thu hút được cư dân theo nhật ký quan sát?',
        options: [
          'Well-lit walking paths',
          'Decorative lawns lacking seating areas',
          'Children’s play zones',
          'Multi-use benches under shade trees',
        ],
        correctIndex: 1,
        explanationVi: 'Thảm cỏ trang trí không có chỗ ngồi (decorative lawns without seating) hầu như bị bỏ trống.',
      },
      {
        id: 'abs-ex-17-q3',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'What two research methods were combined in this study?',
        questionVi: 'Hai phương pháp nghiên cứu nào được kết hợp trong bài này?',
        options: [
          'Satellite temperature imaging and property tax audits',
          'Laboratory psychology tests and traffic counts',
          'Household surveys (680) and systematic observational mapping (300 hours)',
          'Historical archive reviews and online focus groups',
        ],
        correctIndex: 2,
        explanationVi: 'Nghiên cứu kết hợp khảo sát 680 hộ gia đình và 300 giờ quan sát thực địa có hệ thống.',
      },
      {
        id: 'abs-ex-17-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What lesson does this study offer for urban housing developers?',
        questionVi: 'Nghiên cứu mang lại bài học gì cho các nhà phát triển khu đô thị?',
        options: [
          'Prohibit children from playing in residential courtyards',
          'Replace all apartment buildings with single-family houses',
          'Remove lighting from parks to save municipal electricity',
          'Design functional, seating-rich micro-parks rather than look-only lawns',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối khuyên ưu tiên công viên nhỏ dễ tiếp cận, nhiều chỗ ngồi thay vì cảnh quan chỉ để ngắm.',
      },
    ],
  },
  {
    id: 'abs-ex-18',
    title: 'Digital Literacy Gaps Among Rural Secondary Teachers Post-Pandemic',
    domain: 'Xã hội & Giáo dục',
    level: 'B2',
    publicationContext: 'International Journal of Educational Development • Policy Survey',
    abstractEn:
      'Although investments in school internet infrastructure expanded substantially after pandemic closures, hardware access alone does not guarantee effective digital pedagogy. This study surveyed 510 secondary school teachers across twelve rural provinces to identify persistent barriers to technology integration. Structural equation modeling analyzed relationships among device availability, technical support, peer mentoring, and classroom use of interactive tools. Results showed that 79 percent of teachers possessed personal laptops and broadband access, yet only 34 percent regularly designed interactive digital lessons. Crucially, the presence of an on-campus peer technology mentor predicted pedagogical adoption three times more strongly than one-off central workshops. Educational authorities should redirect professional development budgets from brief lecture-style seminars toward school-based peer coaching networks.',
    translationVi:
      'Mặc dù đầu tư hạ tầng internet trường học đã mở rộng đáng kể sau đại dịch, việc có sẵn phần cứng không tự động đảm bảo phương pháp sư phạm số hiệu quả. Nghiên cứu này khảo sát 510 giáo viên trung học tại 12 tỉnh nông thôn để xác định các rào cản dai dẳng khi tích hợp công nghệ. Mô hình phương trình cấu trúc (SEM) phân tích mối liên hệ giữa thiết bị, hỗ trợ kỹ thuật, cố vấn đồng nghiệp và mức độ dùng công cụ tương tác trên lớp. Kết quả cho thấy 79% giáo viên có laptop và mạng băng thông rộng, nhưng chỉ 34% thường xuyên thiết kế bài giảng số tương tác. Đáng chú ý, việc có giáo viên cố vấn công nghệ tại trường dự báo mức độ áp dụng sư phạm mạnh gấp ba lần so với các buổi tập huấn tập trung ngắn hạn.',
    keyTerms: ['digital pedagogy', 'structural equation modeling', 'peer mentoring', 'adoption', 'professional development'],
    questions: [
      {
        id: 'abs-ex-18-q1',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What paradox does the survey reveal about rural secondary teachers?',
        questionVi: 'Nghịch lý nào được khảo sát chỉ ra ở giáo viên trung học nông thôn?',
        options: [
          'Most have laptops and internet, yet few regularly create interactive digital lessons.',
          'Teachers prefer interactive lessons even without electricity or devices.',
          'One-off central workshops are more effective than school-based mentoring.',
          'Rural schools have better broadband than urban universities.',
        ],
        correctIndex: 0,
        explanationVi: '79% giáo viên có laptop và internet nhưng chỉ 34% thường xuyên thiết kế bài giảng số tương tác.',
      },
      {
        id: 'abs-ex-18-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'Which factor most strongly predicted classroom adoption of interactive tools?',
        questionVi: 'Yếu tố nào dự báo mạnh nhất việc áp dụng công cụ tương tác trên lớp?',
        options: [
          'Attending a single annual lecture seminar',
          'Having an on-campus peer technology mentor',
          'Purchasing more expensive laptop models',
          'Teaching larger class sizes',
        ],
        correctIndex: 1,
        explanationVi: 'Cố vấn công nghệ đồng nghiệp tại trường dự báo việc áp dụng sư phạm mạnh gấp ba lần hội thảo tập trung một lần.',
      },
      {
        id: 'abs-ex-18-q3',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'Which analytical technique did the researchers apply to the 510 teacher surveys?',
        questionVi: 'Kỹ thuật phân tích nào được áp dụng cho dữ liệu 510 giáo viên?',
        options: [
          'Randomized laboratory testing',
          'Qualitative discourse analysis',
          'Structural equation modeling (SEM)',
          'Time-series economic forecasting',
        ],
        correctIndex: 2,
        explanationVi: 'Bài viết ghi rõ: "Structural equation modeling analyzed relationships among device availability..."',
      },
      {
        id: 'abs-ex-18-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'How should educational authorities reallocate training budgets based on these findings?',
        questionVi: 'Cơ quan giáo dục nên phân bổ lại ngân sách tập huấn như thế nào theo kết quả này?',
        options: [
          'Cancel all internet infrastructure maintenance',
          'Spend 100% of funds on central lecture-style conferences',
          'Require teachers to pay for their own software',
          'Shift funding toward ongoing school-based peer coaching networks',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối khuyên chuyển ngân sách từ hội thảo ngắn kiểu diễn thuyết sang mạng lưới huấn luyện đồng nghiệp tại trường.',
      },
    ],
  },
  {
    id: 'abs-ex-19',
    title: 'Service-Learning Curricula and Civic Empathy Among University Business Majors',
    domain: 'Xã hội & Giáo dục',
    level: 'B1',
    publicationContext: 'Journal of Experiential Education • Quasi-Experimental Study',
    abstractEn:
      'Business schools increasingly integrate community service-learning projects to counterbalance narrow profit-maximization mindsets among undergraduates. This study evaluated whether partnering with local non-profit social enterprises enhances civic empathy and ethical reasoning among 130 junior marketing students. Half of the cohort completed a 12-week consulting project for community disability organizations, whereas the comparison group analyzed traditional corporate case studies. Pre- and post-semester scores on a validated civic-empathy inventory and an ethical dilemma essay were compared. Students in the service-learning track demonstrated a 21 percent increase in stakeholder perspective-taking and proposed more inclusive pricing solutions on final assessments. Interviews confirmed that direct interaction with non-profit beneficiaries challenged prior assumptions. Embedding real-world social partnerships into core business courses can cultivate socially responsible leadership.',
    translationVi:
      'Các trường kinh doanh ngày càng tích hợp dự án học tập phục vụ cộng đồng (service-learning) nhằm cân bằng tư duy chỉ tối đa hóa lợi nhuận ở sinh viên. Nghiên cứu này đánh giá liệu việc hợp tác với doanh nghiệp xã hội phi lợi nhuận địa phương có nâng cao sự thấu cảm công dân và lập luận đạo đức ở 130 sinh viên marketing năm ba hay không. Một nửa khóa học thực hiện dự án tư vấn 12 tuần cho các tổ chức hỗ trợ người khuyết tật, trong khi nhóm đối chứng phân tích tình huống doanh nghiệp truyền thống. Kết quả cho thấy nhóm học qua phục vụ cộng đồng tăng 21% khả năng đặt mình vào góc nhìn các bên liên quan và đề xuất giải pháp định giá bao trùm hơn trong bài đánh giá cuối kỳ.',
    keyTerms: ['service-learning', 'civic empathy', 'ethical reasoning', 'stakeholder perspective-taking', 'inclusive'],
    questions: [
      {
        id: 'abs-ex-19-q1',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'What did the comparison group do instead of the non-profit consulting project?',
        questionVi: 'Nhóm đối chứng đã làm gì thay vì dự án tư vấn cho tổ chức phi lợi nhuận?',
        options: [
          'They analyzed traditional corporate case studies.',
          'They worked part-time at disability organizations.',
          'They skipped the ethical dilemma essay.',
          'They completed a 24-week engineering internship.',
        ],
        correctIndex: 0,
        explanationVi: 'Nhóm đối chứng phân tích các tình huống doanh nghiệp truyền thống ("analyzed traditional corporate case studies").',
      },
      {
        id: 'abs-ex-19-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What measurable gain appeared in the service-learning group?',
        questionVi: 'Mức tiến bộ đo lường được nào xuất hiện ở nhóm học qua phục vụ cộng đồng?',
        options: [
          'A 12 percent rise in personal salary expectations',
          'A 21 percent increase in stakeholder perspective-taking',
          'Complete elimination of marketing coursework',
          'Higher scores on corporate accounting exams only',
        ],
        correctIndex: 1,
        explanationVi: 'Nhóm này tăng 21% khả năng nhìn nhận từ góc độ các bên liên quan (stakeholder perspective-taking).',
      },
      {
        id: 'abs-ex-19-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'Why do business schools incorporate community service-learning?',
        questionVi: 'Vì sao các trường kinh doanh đưa học tập phục vụ cộng đồng vào chương trình?',
        options: [
          'To replace all corporate finance classes',
          'To reduce faculty grading hours by half',
          'To balance narrow profit-only mindsets with civic responsibility',
          'To train students exclusively for government jobs',
        ],
        correctIndex: 2,
        explanationVi: 'Mục tiêu là cân bằng tư duy tối đa hóa lợi nhuận hẹp hòi và nuôi dưỡng năng lực lãnh đạo có trách nhiệm xã hội.',
      },
      {
        id: 'abs-ex-19-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What mechanism drove the shift in students’ assumptions during the project?',
        questionVi: 'Cơ chế nào thúc đẩy sự thay đổi nhận thức của sinh viên trong dự án?',
        options: [
          'Memorizing textbook definitions of corporate ethics',
          'Competing for cash prizes in marketing contests',
          'Listening to recorded lectures from corporate CEOs',
          'Direct interaction with non-profit beneficiaries in real contexts',
        ],
        correctIndex: 3,
        explanationVi: 'Phỏng vấn xác nhận việc tương tác trực tiếp với người thụ hưởng của tổ chức phi lợi nhuận đã thách thức các giả định trước đó.',
      },
    ],
  },
  {
    id: 'abs-ex-20',
    title: 'Screen Time Displacement and Adolescent Sleep Architecture on School Nights',
    domain: 'Xã hội & Giáo dục',
    level: 'B2',
    publicationContext: 'Adolescent Health & Education • Actigraphy Study',
    abstractEn:
      'Insufficient sleep among high school students is frequently attributed to late-night smartphone use, yet self-reported screen logs often suffer from recall bias. This study objectively tracked 210 urban adolescents over fourteen consecutive school nights using wrist actigraphy monitors paired with automated smartphone screen-time telemetry. Multilevel modeling examined whether pre-bedtime social media scrolling delayed sleep onset or fragmented deep sleep stages. Results revealed that each additional thirty minutes of screen activity after 10:00 PM delayed sleep onset by an average of 19 minutes and reduced total school-night sleep by 24 minutes. Notably, interactive messaging and short-form video feeds caused significantly greater sleep disruption than passive e-book reading on grayscale mode. Schools and parents should promote device-free charging zones outside bedrooms rather than relying solely on software time limits.',
    translationVi:
      'Tình trạng thiếu ngủ ở học sinh trung học thường được quy cho việc dùng điện thoại khuya, nhưng nhật ký tự khai thường bị sai lệch trí nhớ. Nghiên cứu này theo dõi khách quan 210 thanh thiếu niên đô thị trong 14 đêm đi học liên tiếp bằng vòng đeo tay đo vận động (actigraphy) kết hợp dữ liệu thời lượng màn hình tự động. Mô hình đa tầng cho thấy cứ mỗi 30 phút dùng màn hình sau 22 giờ làm chậm thời điểm chìm vào giấc ngủ trung bình 19 phút và giảm tổng thời gian ngủ 24 phút. Đáng chú ý, nhắn tin tương tác và lướt video ngắn gây rối loạn giấc ngủ mạnh hơn nhiều so với đọc sách điện tử thụ động ở chế độ thang xám.',
    keyTerms: ['recall bias', 'actigraphy', 'multilevel modeling', 'sleep onset', 'grayscale mode'],
    questions: [
      {
        id: 'abs-ex-20-q1',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How did this study avoid recall bias in measuring adolescent screen use and sleep?',
        questionVi: 'Nghiên cứu này tránh sai lệch trí nhớ trong đo lường giấc ngủ và thời gian màn hình bằng cách nào?',
        options: [
          'By using wrist actigraphy monitors and automated screen-time telemetry',
          'By asking parents to guess their children’s bedtime',
          'By administering a single year-end questionnaire',
          'By observing students inside school cafeterias',
        ],
        correctIndex: 0,
        explanationVi: 'Nghiên cứu dùng thiết bị đeo tay actigraphy và dữ liệu đo tự động (telemetry) từ điện thoại thay vì tự khai.',
      },
      {
        id: 'abs-ex-20-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'Which digital activity disrupted sleep significantly more than grayscale e-book reading?',
        questionVi: 'Hoạt động số nào gây rối loạn giấc ngủ nhiều hơn đáng kể so với đọc e-book chế độ thang xám?',
        options: [
          'Listening to offline classical music',
          'Interactive messaging and short-form video feeds',
          'Setting a morning alarm at 6:00 PM',
          'Checking weather forecasts once at noon',
        ],
        correctIndex: 1,
        explanationVi: 'Nhắn tin tương tác và xem video ngắn (short-form video feeds) gây gián đoạn giấc ngủ mạnh hơn nhiều.',
      },
      {
        id: 'abs-ex-20-q3',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What happened with each extra 30 minutes of screen use after 10:00 PM?',
        questionVi: 'Điều gì xảy ra với mỗi 30 phút dùng màn hình thêm sau 10 giờ tối?',
        options: [
          'Deep sleep stages doubled in duration.',
          'Students woke up 30 minutes earlier refreshed.',
          'Sleep onset was delayed by 19 minutes and total sleep dropped by 24 minutes.',
          'Screen brightness automatically switched to grayscale.',
        ],
        correctIndex: 2,
        explanationVi: 'Mỗi 30 phút thêm sau 22h làm chậm giấc ngủ 19 phút và giảm tổng thời gian ngủ 24 phút.',
      },
      {
        id: 'abs-ex-20-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What practical household rule do the authors favor?',
        questionVi: 'Quy tắc gia đình thực tế nào được nhóm tác giả ủng hộ?',
        options: [
          'Banning all printed books from student bedrooms',
          'Allowing short-form videos until midnight on school nights',
          'Relying exclusively on software app timers',
          'Keeping phone charging stations outside the bedroom',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối khuyến khích khu vực sạc thiết bị ngoài phòng ngủ thay vì chỉ dựa vào giới hạn phần mềm.',
      },
    ],
  },

  // =========================================================
  // 5. LẬP LUẬN & HỌC THUẬT (5 bài: abs-ex-21 .. abs-ex-25)
  // =========================================================
  {
    id: 'abs-ex-21',
    title: 'Hedging Strategies in Applied Linguistics vs. Civil Engineering Research Articles',
    domain: 'Lập luận & Học thuật',
    level: 'C1',
    publicationContext: 'English for Specific Purposes • Corpus Linguistics',
    abstractEn:
      'Academic writers deploy hedging devices—such as modal verbs, epistemic adverbs, and tentative reporting verbs—to calibrate certainty and anticipate peer critique. However, disciplinary conventions shape how frequently and explicitly authors qualify their claims. This corpus-based comparative study analyzed 120 Discussion sections equally drawn from high-impact applied linguistics and civil engineering journals. Automated part-of-speech tagging combined with manual pragmatic coding quantified four hedging categories: modal auxiliaries, lexical verbs, probability adjectives, and approximators. Results revealed that applied linguistics articles employed 42 percent more epistemic lexical verbs (e.g., "suggest," "appear") than engineering papers, whereas civil engineering texts relied predominantly on numerical approximators and passive reporting structures. Explicitly teaching discipline-specific hedging norms in graduate writing workshops can help novice scholars avoid sounding either overly dogmatic or unnecessarily vague.',
    translationVi:
      'Người viết học thuật sử dụng các biện pháp rào đón (hedging) — như động từ khuyết thiếu, trạng từ nhận thức và động từ tường thuật thận trọng — để điều chỉnh mức độ chắc chắn và đón đầu phản biện từ đồng nghiệp. Tuy nhiên, quy ước từng ngành học định hình tần suất và cách thức tác giả giới hạn tuyên bố của mình. Nghiên cứu ngôn ngữ học khối liệu này so sánh 120 phần Thảo luận (Discussion) lấy đều từ các tạp chí ngôn ngữ học ứng dụng và kỹ thuật xây dựng. Kết quả cho thấy bài báo ngôn ngữ học dùng nhiều hơn 42% động từ từ vựng nhận thức (như "suggest", "appear"), trong khi bài kỹ thuật xây dựng chủ yếu dựa vào từ ước lượng số học và cấu trúc bị động.',
    keyTerms: ['hedging devices', 'epistemic adverbs', 'corpus-based', 'pragmatic coding', 'dogmatic'],
    questions: [
      {
        id: 'abs-ex-21-q1',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'Why do academic writers use hedging devices in research papers?',
        questionVi: 'Vì sao tác giả học thuật sử dụng các biện pháp rào đón (hedging) trong bài nghiên cứu?',
        options: [
          'To calibrate claim certainty and anticipate peer critique',
          'To increase the word count of short abstracts',
          'To hide methodological flaws from journal editors',
          'To replace numerical tables with personal opinions',
        ],
        correctIndex: 0,
        explanationVi: 'Rào đón giúp điều chỉnh mức độ chắc chắn của luận điểm và đón đầu sự phản biện từ hội đồng bình duyệt.',
      },
      {
        id: 'abs-ex-21-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'How did civil engineering Discussion sections differ from applied linguistics?',
        questionVi: 'Phần Thảo luận của ngành kỹ thuật xây dựng khác ngôn ngữ học ứng dụng ở điểm nào?',
        options: [
          'They used 42 percent more epistemic lexical verbs.',
          'They relied mainly on numerical approximators and passive reporting structures.',
          'They avoided all hedging devices completely.',
          'They used informal conversational contractions.',
        ],
        correctIndex: 1,
        explanationVi: 'Bài kỹ thuật xây dựng chủ yếu dùng từ ước lượng số học (numerical approximators) và cấu trúc tường thuật bị động.',
      },
      {
        id: 'abs-ex-21-q3',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'What corpus was examined in this comparative study?',
        questionVi: 'Khối liệu nào được khảo sát trong nghiên cứu so sánh này?',
        options: [
          '300 undergraduate admission essays',
          '60 newspaper editorials on climate change',
          '120 Discussion sections split equally between two disciplines',
          '420 lecture transcripts from engineering professors',
        ],
        correctIndex: 2,
        explanationVi: 'Nghiên cứu phân tích 120 phần Discussion chia đều cho ngôn ngữ học ứng dụng và kỹ thuật xây dựng.',
      },
      {
        id: 'abs-ex-21-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What benefit comes from teaching discipline-specific hedging to graduate writers?',
        questionVi: 'Việc dạy rào đón theo đặc thù ngành mang lại lợi ích gì cho học viên cao học?',
        options: [
          'They can submit papers without peer review.',
          'They no longer need to report statistical p-values.',
          'They can copy Discussion sections across unrelated fields.',
          'They avoid sounding overly dogmatic or unnecessarily vague.',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối nêu rõ giúp học giả trẻ tránh giọng điệu quá giáo điều (overly dogmatic) hoặc mơ hồ không cần thiết.',
      },
    ],
  },
  {
    id: 'abs-ex-22',
    title: 'Counter-Argument Integration in Persuasive Essays by L2 University Students',
    domain: 'Lập luận & Học thuật',
    level: 'B2',
    publicationContext: 'Journal of Second Language Writing • Discourse Analysis',
    abstractEn:
      'Constructing persuasive academic arguments requires acknowledging opposing viewpoints rather than presenting one-sided assertions. This discourse study analyzed 160 argumentative essays written by Vietnamese university English majors preparing for C1-level proficiency exams. Trained raters scored each essay for claim-evidence coherence, counter-argument depth, and rebuttal quality. While 84 percent of writers included a recognizable concession phrase such as "although some argue," nearly two-thirds failed to rebut the opposing claim with specific counter-evidence, resulting in logical contradiction. Essays that paired explicit concessions with targeted empirical rebuttals scored on average 1.5 bands higher on task response and coherence. Writing instructors should move beyond teaching isolated concession templates and train students in the three-step concede–evaluate–refute cycle.',
    translationVi:
      'Xây dựng lập luận học thuật thuyết phục đòi hỏi phải thừa nhận các quan điểm đối lập thay vì chỉ đưa ra khẳng định một chiều. Nghiên cứu diễn ngôn này phân tích 160 bài luận nghị luận do sinh viên chuyên ngữ Việt Nam viết khi ôn thi chuẩn C1. Người chấm được đào tạo đánh giá từng bài về tính mạch lạc luận điểm–bằng chứng, độ sâu phản biện và chất lượng bác bỏ. Dù 84% người viết có dùng cụm nhượng bộ quen thuộc như "although some argue", gần hai phần ba không bác bỏ được ý kiến đối lập bằng bằng chứng cụ thể, dẫn đến mâu thuẫn logic. Những bài kết hợp nhượng bộ rõ ràng với phản bác có dẫn chứng đạt điểm cao hơn trung bình 1,5 bậc.',
    keyTerms: ['counter-argument', 'concession', 'rebuttal', 'logical contradiction', 'refute'],
    questions: [
      {
        id: 'abs-ex-22-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What common flaw appeared in nearly two-thirds of the student essays?',
        questionVi: 'Lỗi phổ biến nào xuất hiện ở gần hai phần ba số bài luận sinh viên?',
        options: [
          'They included a concession phrase but failed to rebut it with specific evidence.',
          'They wrote fewer than 100 words on the exam.',
          'They used too many empirical statistics in the introduction.',
          'They omitted a thesis statement completely.',
        ],
        correctIndex: 0,
        explanationVi: '84% có cụm nhượng bộ nhưng gần 2/3 không bác bỏ được ý đối lập bằng bằng chứng cụ thể, gây mâu thuẫn logic.',
      },
      {
        id: 'abs-ex-22-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'How much higher did essays with targeted empirical rebuttals score?',
        questionVi: 'Những bài có phần bác bỏ bằng chứng thực tế đạt điểm cao hơn bao nhiêu?',
        options: [
          '0.25 bands higher',
          '1.5 bands higher on average',
          '5.0 bands higher',
          'No difference in task response scores',
        ],
        correctIndex: 1,
        explanationVi: 'Bài viết nêu rõ: "scored on average 1.5 bands higher on task response and coherence."',
      },
      {
        id: 'abs-ex-22-q3',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'Which three criteria did trained raters use to score the 160 essays?',
        questionVi: 'Người chấm đã dùng ba tiêu chí nào để đánh giá 160 bài luận?',
        options: [
          'Handwriting neatness, spelling, and punctuation',
          'Essay length, vocabulary rarity, and title creativity',
          'Claim-evidence coherence, counter-argument depth, and rebuttal quality',
          'Reading speed, pronunciation, and citation formatting',
        ],
        correctIndex: 2,
        explanationVi: 'Ba tiêu chí được nêu là: độ mạch lạc luận điểm–bằng chứng, độ sâu phản luận điểm và chất lượng bác bỏ.',
      },
      {
        id: 'abs-ex-22-q4',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What pedagogical shift do the authors recommend for writing teachers?',
        questionVi: 'Nhóm tác giả khuyến nghị thay đổi phương pháp dạy viết nào?',
        options: [
          'Banning phrases like "although some argue" in C1 exams',
          'Asking students to agree with both sides equally without taking a stance',
          'Focusing exclusively on memorizing isolated grammar templates',
          'Teaching the full three-step concede–evaluate–refute cycle',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối khuyên vượt qua việc dạy mẫu câu nhượng bộ rời rạc để rèn chu trình 3 bước: nhượng bộ – đánh giá – bác bỏ.',
      },
    ],
  },
  {
    id: 'abs-ex-23',
    title: 'Citation Motivation and Reference Accuracy in Undergraduate Term Papers',
    domain: 'Lập luận & Học thuật',
    level: 'B1',
    publicationContext: 'College & Research Libraries • Audit & Interview Study',
    abstractEn:
      'Accurate citation is central to academic integrity, yet undergraduate term papers frequently contain misattributed claims or secondary citations presented as primary readings. This study audited 420 citations randomly sampled from 70 senior humanities term papers and interviewed 24 student authors about their referencing decisions. Verification against original source texts revealed that 19 percent of citations either overstated the original author’s conclusion or cited a source the student had never directly read. Interviews indicated that time pressure before deadlines and unfamiliarity with reference-management software drove most shortcuts. When a brief 45-minute source-verification workshop was introduced in a follow-up seminar, misattribution rates dropped from 19 percent to 5 percent. Librarians and faculty should co-teach practical citation-checking habits early in degree programs.',
    translationVi:
      'Trích dẫn chính xác là cốt lõi của liêm chính học thuật, nhưng tiểu luận đại học thường mắc lỗi quy kết sai luận điểm hoặc trích dẫn gián tiếp như thể đã đọc nguồn gốc. Nghiên cứu này kiểm định 420 trích dẫn lấy mẫu ngẫu nhiên từ 70 tiểu luận năm cuối ngành nhân văn và phỏng vấn 24 sinh viên tác giả về quyết định trích dẫn. Đối chiếu với văn bản gốc cho thấy 19% trích dẫn phóng đại kết luận của tác giả gốc hoặc trích nguồn mà sinh viên chưa từng đọc trực tiếp. Phỏng vấn chỉ ra áp lực thời gian sát hạn nộp và thiếu quen thuộc với phần mềm quản lý tài liệu là nguyên nhân chính.',
    keyTerms: ['academic integrity', 'misattributed', 'secondary citations', 'reference-management', 'shortcuts'],
    questions: [
      {
        id: 'abs-ex-23-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What percentage of audited citations overstated claims or cited unread sources?',
        questionVi: 'Bao nhiêu phần trăm trích dẫn được kiểm định bị phóng đại kết luận hoặc trích nguồn chưa đọc?',
        options: [
          '19 percent',
          '5 percent',
          '24 percent',
          '70 percent',
        ],
        correctIndex: 0,
        explanationVi: 'Đối chiếu văn bản gốc cho thấy 19% trích dẫn mắc lỗi phóng đại kết luận hoặc trích nguồn chưa từng đọc trực tiếp.',
      },
      {
        id: 'abs-ex-23-q2',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'What caused most citation shortcuts according to student interviews?',
        questionVi: 'Theo phỏng vấn sinh viên, nguyên nhân chính dẫn đến trích dẫn ẩu là gì?',
        options: [
          'Library subscriptions to humanities journals expired.',
          'Deadline time pressure and unfamiliarity with reference-management tools.',
          'Professors forbade students from reading primary sources.',
          'Automated software deleted bibliography pages.',
        ],
        correctIndex: 1,
        explanationVi: 'Áp lực thời gian trước hạn nộp và việc chưa quen dùng phần mềm quản lý tài liệu tham khảo là nguyên nhân chính.',
      },
      {
        id: 'abs-ex-23-q3',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'How did researchers verify the accuracy of the 420 sampled citations?',
        questionVi: 'Nhóm nghiên cứu kiểm chứng độ chính xác của 420 trích dẫn bằng cách nào?',
        options: [
          'By checking only alphabetical order in the bibliography',
          'By running an automated plagiarism-score percentage check',
          'By comparing them directly against the original source texts',
          'By asking librarians to guess whether sources existed',
        ],
        correctIndex: 2,
        explanationVi: 'Họ đối chiếu trực tiếp các trích dẫn với văn bản nguồn gốc ("Verification against original source texts").',
      },
      {
        id: 'abs-ex-23-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What does the follow-up seminar result demonstrate?',
        questionVi: 'Kết quả của buổi hội thảo kiểm chứng nguồn bổ sung chứng minh điều gì?',
        options: [
          'Undergraduate students cannot learn academic integrity.',
          'Citation errors only happen in engineering term papers.',
          '45-minute workshops are too short to change habits.',
          'Brief, targeted training can sharply reduce citation misattributions.',
        ],
        correctIndex: 3,
        explanationVi: 'Một buổi workshop 45 phút đã giúp giảm tỷ lệ quy kết sai từ 19% xuống còn 5%.',
      },
    ],
  },
  {
    id: 'abs-ex-24',
    title: 'Metadiscourse Markers and Reader Engagement in Popular Science vs. Journal Abstracts',
    domain: 'Lập luận & Học thuật',
    level: 'C1',
    publicationContext: 'Written Communication • Genre Analysis',
    abstractEn:
      'Researchers increasingly rewrite specialized findings for public audiences, yet transitioning from peer-reviewed abstracts to popular science summaries demands substantial rhetorical adaptation. This genre-analysis study compared 80 matched pairs of biomedical journal abstracts and their corresponding science-news briefs. Interactional metadiscourse features—including reader pronouns, rhetorical questions, attitude markers, and boosters—were annotated across both corpora. Journal abstracts relied heavily on passive voice and cautious hedges to foreground methodological objectivity, containing minimal direct reader engagement. Conversely, popular science briefs employed four times as many attitude markers and second-person pronouns to establish relevance and narrative momentum. Importantly, oversimplifying hedging markers in news briefs occasionally distorted preliminary findings into definitive breakthroughs. Science communicators must balance engaging storytelling with faithful preservation of epistemic uncertainty.',
    translationVi:
      'Các nhà nghiên cứu ngày càng viết lại kết quả chuyên sâu cho độc giả đại chúng, nhưng chuyển từ tóm tắt bài báo bình duyệt sang tin khoa học phổ thông đòi hỏi điều chỉnh tu từ đáng kể. Nghiên cứu phân tích thể loại này so sánh 80 cặp đối ứng gồm tóm tắt tạp chí y sinh và bản tin khoa học tương ứng. Các yếu tố siêu diễn ngôn tương tác — gồm đại từ hướng tới người đọc, câu hỏi tu từ, dấu hiệu thái độ và từ tăng cường — được gắn nhãn trên cả hai khối liệu. Tóm tắt tạp chí dùng nhiều thể bị động và rào đón thận trọng, trong khi bản tin phổ thông dùng dấu hiệu thái độ và đại từ ngôi thứ hai nhiều gấp bốn lần. Tuy nhiên, việc đơn giản hóa quá mức từ rào đón đôi khi biến kết quả sơ bộ thành đột phá chắc chắn.',
    keyTerms: ['genre-analysis', 'metadiscourse', 'attitude markers', 'narrative momentum', 'epistemic uncertainty'],
    questions: [
      {
        id: 'abs-ex-24-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'How did popular science briefs differ rhetorically from journal abstracts?',
        questionVi: 'Bản tin khoa học phổ thông khác tóm tắt tạp chí về mặt tu từ như thế nào?',
        options: [
          'They used four times as many attitude markers and second-person pronouns.',
          'They relied exclusively on passive voice and cautious hedges.',
          'They avoided all narrative momentum and reader pronouns.',
          'They were four times longer than full biomedical papers.',
        ],
        correctIndex: 0,
        explanationVi: 'Bản tin phổ thông dùng dấu hiệu thái độ và đại từ ngôi thứ hai nhiều gấp bốn lần để tạo sự gần gũi và mạch kể.',
      },
      {
        id: 'abs-ex-24-q2',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What risk arises when science writers remove hedging markers in public summaries?',
        questionVi: 'Rủi ro nào phát sinh khi người viết khoa học loại bỏ từ rào đón trong bản tóm tắt đại chúng?',
        options: [
          'Journal editors reject the original biomedical paper.',
          'Preliminary findings can be distorted into seeming like definitive breakthroughs.',
          'Readers lose interest because the text becomes too emotional.',
          'Attitude markers disappear from the corpus.',
        ],
        correctIndex: 1,
        explanationVi: 'Đơn giản hóa quá mức từ rào đón đôi khi bóp méo kết quả sơ bộ thành đột phá chắc chắn.',
      },
      {
        id: 'abs-ex-24-q3',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'What dataset did the researcher analyze?',
        questionVi: 'Nhà nghiên cứu đã phân tích tập dữ liệu nào?',
        options: [
          '160 student laboratory reports in chemistry',
          '400 social media comments on medical news',
          '80 matched pairs of biomedical abstracts and their science-news briefs',
          '120 textbooks for undergraduate biology majors',
        ],
        correctIndex: 2,
        explanationVi: 'Khối liệu gồm 80 cặp đối ứng giữa tóm tắt tạp chí y sinh và bản tin khoa học tương ứng.',
      },
      {
        id: 'abs-ex-24-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What core principle should guide researchers writing for the general public?',
        questionVi: 'Nguyên tắc cốt lõi nào nên dẫn dắt nhà nghiên cứu khi viết cho công chúng?',
        options: [
          'Copy the exact passive sentences from journal abstracts.',
          'Use rhetorical questions in every single sentence.',
          'Avoid mentioning any uncertainty so the public trusts science.',
          'Keep storytelling engaging while faithfully preserving scientific uncertainty.',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối nhấn mạnh cân bằng giữa lối kể hấp dẫn và việc giữ trung thực mức độ bất định nhận thức.',
      },
    ],
  },
  {
    id: 'abs-ex-25',
    title: 'Socratic Questioning Protocols in Undergraduate Philosophy Seminars',
    domain: 'Lập luận & Học thuật',
    level: 'B2',
    publicationContext: 'Teaching Philosophy & Critical Thinking • Classroom Study',
    abstractEn:
      'Undergraduate seminar discussions frequently stall when students offer brief personal opinions without examining underlying assumptions. This classroom study tested whether a structured Socratic questioning protocol elevates argument depth in introductory ethics seminars. Across two semesters, four seminar sections (112 students total) were assigned either to open instructor-led discussion or to student-facilitated Socratic circles using four mandatory prompt stems: clarification, assumption probing, evidence testing, and implication tracing. Audio transcripts from twelve sessions were coded for multi-turn reasoning chains and peer-to-peer challenges. Students in the Socratic protocol generated 48 percent more multi-turn logical chains and cited textual premises twice as frequently as control sections. Training undergraduates to ask systematic probing questions transforms passive recitation into collaborative inquiry.',
    translationVi:
      'Thảo luận seminar đại học thường bị chững lại khi sinh viên chỉ nêu ý kiến cá nhân ngắn gọn mà không kiểm tra các giả định ngầm. Nghiên cứu lớp học này thử nghiệm xem quy trình đặt câu hỏi kiểu Socrates có cấu trúc có nâng cao chiều sâu lập luận trong các buổi seminar đạo đức nhập môn hay không. Trong hai học kỳ, bốn lớp seminar (tổng 112 sinh viên) được chia thành thảo luận mở do giảng viên dẫn dắt hoặc vòng tròn Socrates do sinh viên điều phối với bốn nhóm câu hỏi bắt buộc: làm rõ, dò giả định, kiểm tra bằng chứng và truy vết hệ quả. Kết quả cho thấy sinh viên nhóm Socrates tạo ra nhiều hơn 48% chuỗi lập luận đa lượt và trích dẫn tiền đề văn bản nhiều gấp đôi.',
    keyTerms: ['Socratic questioning', 'underlying assumptions', 'probing', 'multi-turn reasoning', 'collaborative inquiry'],
    questions: [
      {
        id: 'abs-ex-25-q1',
        focusSkill: 'Bằng chứng & Kết quả (Findings)',
        questionEn: 'How did the Socratic protocol affect student discourse in the seminars?',
        questionVi: 'Quy trình Socrates tác động thế nào đến diễn ngôn của sinh viên trong seminar?',
        options: [
          'It produced 48% more multi-turn logical chains and doubled premise citations.',
          'It reduced student speaking time by half.',
          'It caused students to rely solely on instructor lectures.',
          'It eliminated peer-to-peer challenges during discussions.',
        ],
        correctIndex: 0,
        explanationVi: 'Nhóm Socrates tạo ra nhiều hơn 48% chuỗi lập luận đa lượt và trích dẫn tiền đề văn bản nhiều gấp đôi.',
      },
      {
        id: 'abs-ex-25-q2',
        focusSkill: 'Phương pháp (Methodology)',
        questionEn: 'What were the four mandatory prompt stems in the Socratic circles?',
        questionVi: 'Bốn nhóm câu hỏi bắt buộc trong vòng tròn Socrates là gì?',
        options: [
          'Introduction, body, transition, and conclusion',
          'Clarification, assumption probing, evidence testing, and implication tracing',
          'Memorization, translation, summary, and grading',
          'Agreement, interruption, voting, and adjournment',
        ],
        correctIndex: 1,
        explanationVi: 'Bốn nhóm câu hỏi gồm: làm rõ, dò giả định, kiểm tra bằng chứng và truy vết hệ quả.',
      },
      {
        id: 'abs-ex-25-q3',
        focusSkill: 'Luận điểm chính (Main Argument)',
        questionEn: 'What common weakness in undergraduate seminars motivated this study?',
        questionVi: 'Điểm yếu phổ biến nào trong seminar đại học đã thúc đẩy nghiên cứu này?',
        options: [
          'Students refused to attend morning classes.',
          'Textbooks contained too many logical diagrams.',
          'Discussions stalled when students gave brief opinions without checking assumptions.',
          'Instructors talked too fast during audio recordings.',
        ],
        correctIndex: 2,
        explanationVi: 'Thảo luận thường chững lại khi sinh viên chỉ nêu ý kiến cá nhân ngắn mà không xem xét giả định nền tảng.',
      },
      {
        id: 'abs-ex-25-q4',
        focusSkill: 'Suy luận & Hàm ý (Inference)',
        questionEn: 'What broader implication does the author draw for seminar teaching?',
        questionVi: 'Tác giả rút ra hàm ý rộng hơn nào cho việc giảng dạy seminar?',
        options: [
          'Student-facilitated discussions only work in philosophy.',
          'Audio recording should replace written ethics exams.',
          'Instructors must answer every question themselves.',
          'Teaching students how to ask probing questions turns passive talk into collaborative inquiry.',
        ],
        correctIndex: 3,
        explanationVi: 'Câu cuối khẳng định rèn luyện sinh viên đặt câu hỏi dò sâu có hệ thống giúp biến sự lặp lại thụ động thành tìm tòi cộng tác.',
      },
    ],
  },
];

export const ACADEMIC_WRITING_EXTRA: AcademicWritingPrompt[] = [
  // 1. Email giảng viên (4 đề: aw-ex-1 .. aw-ex-4)
  {
    id: 'aw-ex-1',
    type: 'Email giảng viên',
    title: 'Email xin gia hạn nộp bài tập lớn vì lý do sức khỏe (Deadline Extension)',
    level: 'B1',
    recommendedWords: 120,
    promptVi:
      'Bạn bị sốt cao 3 ngày và có giấy khám của phòng y tế, không kịp hoàn thành bài tiểu luận môn Kinh tế vĩ mô nộp vào thứ Sáu. Hãy viết email lịch sự gửi Dr. Tran xin gia hạn thêm 48 giờ và đính kèm giấy xác nhận.',
    promptEn:
      'Write a formal email to Dr. Tran requesting a 48-hour extension for your Macroeconomics term paper due this Friday due to a documented medical illness, and mention the attached clinic note.',
    keywordsEn: ['extension', 'documented', 'attached', 'appreciate', 'submission'],
    structureOutline: [
      'Subject: Extension Request: [Course Code] Term Paper – [Full Name, Student ID]',
      'Opening: Kính gửi Dr. Tran, nêu tên và lớp học phần',
      'Reason: Trình bày ngắn gọn lý do sức khỏe, đính kèm giấy xác nhận y tế',
      'Request: Đề xuất thời hạn nộp mới cụ thể (thêm 48 giờ — Chủ nhật 5:00 PM)',
      'Closing: Cam kết nộp đúng hạn mới, cảm ơn và ký tên trang trọng',
    ],
    sampleBandHigh: `Subject: Extension Request: ECON201 Term Paper – Linh Pham (ID: 20234412)

Dear Dr. Tran,

I hope you are having a productive week. I am Linh Pham, a student in your Tuesday morning Macroeconomics section (ECON201).

I am writing to respectfully request a 48-hour extension on our upcoming term paper, originally due this Friday at 5:00 PM. Unfortunately, I have been recovering from a high fever over the past three days, which has slowed my final revisions. I have attached a medical note from the university clinic for your verification.

If granted, I will submit the completed paper by Sunday at 5:00 PM without fail. Thank you very much for your understanding and consideration.

Sincerely,
Linh Pham
Student ID: 20234412`,
    gradingChecklistVi: [
      'Tiêu đề ghi rõ mã môn, mục đích xin gia hạn và MSSV',
      'Nêu lý do khách quan ngắn gọn, không kể lể dài dòng',
      'Đề xuất mốc thời gian nộp mới cụ thể và đính kèm minh chứng',
    ],
  },
  {
    id: 'aw-ex-2',
    type: 'Email giảng viên',
    title: 'Email xin thư giới thiệu học bổng trao đổi (Recommendation Letter)',
    level: 'B2',
    recommendedWords: 150,
    promptVi:
      'Bạn dự định nộp học bổng trao đổi sinh viên một học kỳ tại Nhật Bản (hạn chót sau 3 tuần). Hãy viết email nhờ Prof. Le — giảng viên từng dạy bạn 2 môn chuyên ngành — viết thư giới thiệu.',
    promptEn:
      'Write a courteous email to Prof. Le asking if they would be willing to write a letter of recommendation for your one-semester exchange scholarship in Japan, mentioning the deadline and attached documents.',
    keywordsEn: ['recommendation', 'exchange program', 'deadline', 'transcript', 'grateful'],
    structureOutline: [
      'Subject: Request for Recommendation Letter: Japan Exchange Scholarship – [Name]',
      'Context: Nhắc lại 2 môn đã học cùng thầy/cô và kết quả nổi bật',
      'Request: Hỏi thầy/cô có thuận tiện viết thư giới thiệu trước hạn chót 3 tuần nữa không',
      'Support packet: Đính kèm CV, bảng điểm, và bản nháp Statement of Purpose để thầy/cô dễ tham khảo',
      'Closing: Tạo điều kiện nếu thầy/cô bận, cảm ơn chân thành',
    ],
    sampleBandHigh: `Subject: Request for Recommendation Letter: Japan Exchange Scholarship – Huy Nguyen

Dear Professor Le,

I hope this message finds you well. Having completed both your Data Structures and Machine Learning courses last year, I truly valued your guidance on my final neural-network project.

I am currently applying for a one-semester undergraduate exchange scholarship at Osaka University, and the application deadline is November 30. Because you are familiar with my academic performance and analytical work, I would be deeply grateful if you would consider writing a letter of recommendation on my behalf.

To make the process convenient, I have attached my updated CV, unofficial transcript, and a brief draft of my statement of purpose. Please let me know if you feel able to support my application, or if you would prefer to meet briefly during office hours.

Thank you very much for your time and continued mentorship.

Respectfully yours,
Huy Nguyen
Student ID: 20225109`,
    gradingChecklistVi: [
      'Nhắc lại bối cảnh từng học với giảng viên để tạo sự liên kết',
      'Báo trước hạn chót ít nhất 2–3 tuần và đính kèm bộ hồ sơ tham khảo',
      'Dùng ngôn từ lịch sự, cho phép giảng viên từ chối nhẹ nhàng nếu bận',
    ],
  },
  {
    id: 'aw-ex-3',
    type: 'Email giảng viên',
    title: 'Email hỏi làm rõ tiêu chí chấm điểm và nhận phản hồi bài thi (Grade Clarification)',
    level: 'B2',
    recommendedWords: 130,
    promptVi:
      'Bạn vừa nhận điểm bài tiểu luận giữa kỳ thấp hơn kỳ vọng và muốn xin hẹn gặp giảng viên để hiểu rõ nhận xét nhằm cải thiện cho bài cuối kỳ, tuyệt đối không tỏ thái độ tranh cãi.',
    promptEn:
      'Write a respectful email to your instructor asking for clarification on the grading feedback for your midterm essay so that you can improve your final paper.',
    keywordsEn: ['clarification', 'feedback', 'rubric', 'improve', 'office hours'],
    structureOutline: [
      'Subject: Question Regarding Midterm Essay Feedback – [Course Code, Name]',
      'Opening: Cảm ơn giảng viên đã chấm và trả bài đúng hạn',
      'Purpose: Bày tỏ mong muốn hiểu sâu hơn nhận xét ở phần lập luận để cải thiện bài cuối kỳ',
      'Action: Đề xuất hẹn gặp 10 phút trong giờ tiếp sinh viên',
      'Closing: Lịch sự, tôn trọng quyết định chuyên môn của giảng viên',
    ],
    sampleBandHigh: `Subject: Question Regarding Midterm Essay Feedback – ENG302 – Thao Vu

Dear Dr. Hoang,

Thank you for returning our graded midterm essays and providing detailed margin notes.

I am writing to ask if I might stop by during your office hours this Thursday to clarify a few points in your feedback regarding my thesis organization and source synthesis. My goal is to understand where my argument fell short against the grading rubric so that I can apply those lessons directly to the final research paper.

If Thursday afternoon does not suit your schedule, I would be happy to send two specific questions via email instead. Thank you very much for your time and support.

Best regards,
Thao Vu
Student ID: 20231904`,
    gradingChecklistVi: [
      'Giữ thái độ cầu thị, tập trung vào việc học hỏi để cải thiện bài sau',
      'Không đòi tăng điểm hay chất vấn gay gắt',
      'Đề xuất hình thức trao đổi linh hoạt (gặp trực tiếp hoặc hỏi ngắn qua email)',
    ],
  },
  {
    id: 'aw-ex-4',
    type: 'Email giảng viên',
    title: 'Email xin tham gia nhóm nghiên cứu khoa học sinh viên (Research Assistant Inquiry)',
    level: 'C1',
    recommendedWords: 150,
    promptVi:
      'Bạn vừa đọc bài báo mới của Dr. Mai về năng lượng tái tạo và muốn xin làm trợ lý nghiên cứu sinh viên (undergraduate research assistant) bán thời gian trong học kỳ tới.',
    promptEn:
      'Write a formal inquiry email to Dr. Mai expressing interest in joining their renewable-energy lab as a part-time undergraduate research assistant next semester, referencing one of their recent papers.',
    keywordsEn: ['research assistant', 'recent publication', 'methodology', 'contribute', 'CV'],
    structureOutline: [
      'Subject: Undergraduate Research Assistant Inquiry – [Your Major, Name]',
      'Hook: Nêu tên bài báo cụ thể của giảng viên mà bạn đã đọc và điểm bạn tâm đắc',
      'Background: Giới thiệu ngắn chuyên ngành, kỹ năng kỹ thuật/phân tích phù hợp',
      'Ask: Hỏi về cơ hội tham gia lab 8–10 giờ/tuần trong học kỳ tới + đính kèm CV',
      'Closing: Cảm ơn và mong được trao đổi thêm',
    ],
    sampleBandHigh: `Subject: Undergraduate Research Assistant Inquiry – Electrical Engineering – Duc Anh

Dear Dr. Mai,

I am Duc Anh, a third-year Electrical Engineering student maintaining a 3.6/4.0 GPA. I recently read your 2024 article on solar microgrid optimization and was particularly intrigued by your team's approach to battery degradation modeling.

I am writing to inquire whether there might be an opening for an undergraduate research assistant in your laboratory next semester. Over the past year, I have built solid proficiency in Python data analysis and MATLAB simulation, and I am eager to commit 8 to 10 hours per week supporting data cleaning or literature synthesis.

I have attached my CV and academic transcript for your review. Should you have a few minutes next week, I would welcome the chance to discuss how I might contribute to your ongoing projects.

Sincerely,
Duc Anh Tran
Student ID: 20228765`,
    gradingChecklistVi: [
      'Chứng minh đã đọc thật nghiên cứu của giảng viên (nêu tên đề tài/chi tiết)',
      'Nêu rõ số giờ có thể cam kết và kỹ năng cụ thể đóng góp được cho lab',
      'Đính kèm CV và bảng điểm gọn gàng',
    ],
  },

  // 2. Email xin thực tập (4 đề: aw-ex-5 .. aw-ex-8)
  {
    id: 'aw-ex-5',
    type: 'Email xin thực tập',
    title: 'Email ứng tuyển Thực tập sinh Phân tích Dữ liệu (Data Analyst Intern)',
    level: 'B1',
    recommendedWords: 140,
    promptVi:
      'Bạn là sinh viên năm 3 ngành Hệ thống thông tin, thấy tin tuyển Data Analyst Intern tại công ty FinTech ABC. Hãy viết email ứng tuyển nêu rõ kỹ năng SQL, Excel, Power BI và một dự án môn học liên quan.',
    promptEn:
      'Write a professional internship application email for a Data Analyst Intern role at FinTech ABC, highlighting your SQL, Excel, and Power BI skills along with a relevant university project.',
    keywordsEn: ['application', 'Data Analyst Intern', 'proficiency', 'attached', 'interview'],
    structureOutline: [
      'Subject: Application for Data Analyst Intern – [Full Name]',
      'Opening: Kính gửi bộ phận Tuyển dụng, nêu rõ vị trí ứng tuyển và nguồn biết tin',
      'Pitch: 2 câu nêu chuyên ngành + kỹ năng SQL/Power BI + kết quả 1 dự án cụ thể',
      'Availability: Nêu thời gian có thể thực tập (full-time/part-time)',
      'Closing: Đính kèm CV/Portfolio, mong cơ hội phỏng vấn',
    ],
    sampleBandHigh: `Subject: Application for Data Analyst Intern – Khanh Ly Nguyen

Dear Hiring Team at FinTech ABC,

I am writing to apply for the Data Analyst Intern position advertised on your careers portal. I am currently a third-year Management Information Systems student at National Economics University, available to work four days per week starting next month.

Through coursework and a recent capstone project, I have developed strong proficiency in SQL querying, Excel pivot modeling, and Power BI dashboard design. Last semester, I analyzed a 50,000-row retail dataset to identify customer churn drivers and presented actionable retention metrics to our faculty panel.

I have attached my CV and a link to my GitHub portfolio for your review. Thank you for considering my application, and I look forward to the opportunity to discuss how I can support your analytics team.

Best regards,
Khanh Ly Nguyen
Phone: 090-xxx-xxxx`,
    gradingChecklistVi: [
      'Subject rõ ràng đúng chuẩn "[Application for Position] – [Name]"',
      'Nêu được bằng chứng kỹ năng (dự án 50.000 dòng dữ liệu) thay vì chỉ liệt kê từ khóa',
      'Nêu rõ lịch trống có thể bắt đầu thực tập',
    ],
  },
  {
    id: 'aw-ex-6',
    type: 'Email xin thực tập',
    title: 'Email gửi lạnh (Cold Email) xin thực tập tại Agency Marketing chưa đăng tuyển',
    level: 'B2',
    recommendedWords: 145,
    promptVi:
      'Bạn rất thích các chiến dịch truyền thông của agency BrightSpark nhưng họ chưa đăng tin tuyển thực tập. Hãy viết email chủ động giới thiệu bản thân, nêu giá trị bạn có thể hỗ trợ và xin một cuộc trao đổi ngắn.',
    promptEn:
      'Write a proactive cold email to BrightSpark Agency inquiring about potential Content & Social Media Internship opportunities, referencing one of their recent campaigns and highlighting your relevant skills.',
    keywordsEn: ['proactive', 'campaign', 'content creation', 'contribute', 'portfolio'],
    structureOutline: [
      'Subject: Proactive Inquiry: Marketing Internship Opportunity – [Name]',
      'Hook: Khen ngợi cụ thể một chiến dịch gần đây của agency',
      'Value: Nêu kinh nghiệm làm truyền thông CLB/dự án cá nhân + số liệu tương tác',
      'Ask: Hỏi lịch thực tập hè và đính kèm CV + Portfolio',
      'Closing: Lịch sự, không gây áp lực',
    ],
    sampleBandHigh: `Subject: Proactive Inquiry: Content Marketing Internship – Minh Chau Le

Dear BrightSpark Recruitment Team,

I have been closely following BrightSpark Agency’s work, particularly your recent Gen Z sustainability campaign for GreenCup, which stood out for its witty short-form video storytelling.

As a junior Marketing major preparing for my summer internship, I am writing to inquire whether your team might welcome a motivated Content & Social Media Intern starting in June. Over the past year, I managed our university entrepreneurship club’s TikTok and Facebook channels, growing organic reach by 45 percent through data-backed content calendars and Canva visuals.

I have attached my CV and creative portfolio for your consideration. Even if no formal role is currently open, I would greatly appreciate a brief 10-minute chat to learn about upcoming team needs.

Warm regards,
Minh Chau Le`,
    gradingChecklistVi: [
      'Thể hiện đã nghiên cứu kỹ doanh nghiệp qua một chiến dịch cụ thể',
      'Chứng minh năng lực bằng kết quả thực tế (tăng 45% organic reach)',
      'Giọng văn tự tin, chuyên nghiệp, tôn trọng thời gian của nhà tuyển dụng',
    ],
  },
  {
    id: 'aw-ex-7',
    type: 'Email xin thực tập',
    title: 'Email phản hồi xác nhận nhận lời mời phỏng vấn thực tập (Interview Confirmation)',
    level: 'B1',
    recommendedWords: 100,
    promptVi:
      'Phòng Nhân sự công ty TechNova vừa gửi email mời bạn phỏng vấn vị trí Software Engineering Intern vào thứ Năm tuần này lúc 10:00 sáng qua Google Meet. Hãy viết email xác nhận tham dự.',
    promptEn:
      'Write a prompt, polite email confirming your attendance for an online Google Meet interview for the Software Engineering Intern role at TechNova this Thursday at 10:00 AM.',
    keywordsEn: ['confirm', 'scheduled', 'available', 'look forward', 'Sincerely'],
    structureOutline: [
      'Subject: Re: Interview Invitation – Software Engineering Intern – [Name]',
      'Opening: Cảm ơn bộ phận HR đã mời phỏng vấn',
      'Confirmation: Xác nhận rõ ngày, giờ và hình thức (Thứ Năm 10:00 AM qua Google Meet)',
      'Preparation: Hỏi nhẹ xem có cần chuẩn bị thêm tài liệu hay bài test trước không',
      'Closing: Mong được gặp hội đồng phỏng vấn',
    ],
    sampleBandHigh: `Subject: Re: Interview Invitation – Software Engineering Intern – Tuan Kiet

Dear Ms. Lan,

Thank you very much for inviting me to interview for the Software Engineering Intern position at TechNova.

I am pleased to confirm that I am available this Thursday at 10:00 AM via Google Meet, and I have saved the meeting link to my calendar. Please let me know if there are any additional documents or technical preparation guidelines I should review prior to our conversation.

I look forward to speaking with you and the engineering team on Thursday.

Best regards,
Tuan Kiet Pham
Phone: 091-xxx-xxxx`,
    gradingChecklistVi: [
      'Trả lời đúng luồng email (Re: ...) và xác nhận lại chính xác ngày giờ',
      'Ngắn gọn, lịch sự, thể hiện sự chuyên nghiệp và chủ động chuẩn bị',
      'Kèm số điện thoại dự phòng trường hợp sự cố kết nối',
    ],
  },
  {
    id: 'aw-ex-8',
    type: 'Email xin thực tập',
    title: 'Email cảm ơn sau buổi phỏng vấn thực tập (Post-Interview Thank-You)',
    level: 'B2',
    recommendedWords: 120,
    promptVi:
      'Bạn vừa hoàn thành buổi phỏng vấn vị trí Business Development Intern tại công ty GlobalLogistics. Hãy viết email cảm ơn anh/chị phỏng vấn viên, nhắc lại 1 điểm thú vị trong buổi trao đổi và khẳng định sự hứng thú.',
    promptEn:
      'Write a concise thank-you email following your Business Development Intern interview at GlobalLogistics, referencing a specific topic discussed and reiterating your enthusiasm.',
    keywordsEn: ['appreciate', 'insightful', 'discussed', 'enthusiasm', 'contribute'],
    structureOutline: [
      'Subject: Thank You – Business Development Intern Interview – [Name]',
      'Opening: Cảm ơn người phỏng vấn đã dành thời gian trao đổi hôm nay',
      'Connection: Nhắc lại một chủ đề cụ thể đã thảo luận (VD: mở rộng khách hàng SME)',
      'Reiterate: Khẳng định lại sự phù hợp và hào hứng đóng góp',
      'Closing: Chúc tuần làm việc hiệu quả',
    ],
    sampleBandHigh: `Subject: Thank You – Business Development Intern Interview – Ngoc Anh

Dear Mr. Hung,

Thank you very much for taking the time to speak with me today regarding the Business Development Intern role at GlobalLogistics.

I especially enjoyed our discussion about how your team is streamlining onboarding for small and medium-sized exporters. Learning about that challenge reinforced my enthusiasm for joining GlobalLogistics, as my bilingual communication skills and prior cold-outreach experience align closely with your outreach goals.

Please do not hesitate to reach out if you need any further information from my end. I look forward to hearing about the next steps.

Sincerely,
Ngoc Anh Do`,
    gradingChecklistVi: [
      'Gửi trong vòng 24 giờ sau phỏng vấn với tiêu đề rõ ràng',
      'Nhắc lại một chi tiết cụ thể trong cuộc trò chuyện để tạo ấn tượng cá nhân hóa',
      'Ngắn gọn (100–130 từ), không lặp lại toàn bộ CV',
    ],
  },

  // 3. Essay: Cause-Effect (4 đề: aw-ex-9 .. aw-ex-12)
  {
    id: 'aw-ex-9',
    type: 'Essay: Cause-Effect',
    title: 'Nguyên nhân và hệ quả của thói quen trì hoãn học tập ở sinh viên (Procrastination)',
    level: 'B1',
    recommendedWords: 250,
    promptVi:
      'Nhiều sinh viên đại học thường xuyên trì hoãn làm bài tập đến sát hạn chót. Hãy phân tích 2 nguyên nhân chính và 2 hệ quả của tình trạng này.',
    promptEn:
      'Academic procrastination is widespread among university students. Discuss the primary causes of this habit and examine its effects on academic performance and well-being.',
    keywordsEn: ['procrastination', 'fear of failure', 'time management', 'cognitive load', 'consequently'],
    structureOutline: [
      'Introduction: Bối cảnh phổ biến của việc "nước đến chân mới nhảy" + Thesis statement nêu nguyên nhân và hệ quả',
      'Body 1 (Causes): (1) Nỗi sợ thất bại/chủ nghĩa hoàn hảo; (2) Sao nhãng từ mạng xã hội và thiếu kỹ năng chia nhỏ nhiệm vụ',
      'Body 2 (Effects): (1) Suy giảm chất lượng bài làm do thiếu thời gian biên tập; (2) Căng thẳng, thiếu ngủ và kiệt sức tinh thần',
      'Conclusion: Tóm tắt chuỗi nhân–quả và nhấn mạnh tầm quan trọng của kỷ luật tự giác',
    ],
    sampleBandHigh: `Academic procrastination—delaying coursework until the final hours before a deadline—has become a pervasive habit across university campuses. This essay examines the underlying psychological and environmental causes of this behavior and evaluates its consequences for students’ learning and health.

Two primary factors drive undergraduate procrastination. First, perfectionism and fear of failure frequently paralyze students when facing complex assignments such as research papers. Rather than risking an imperfect draft, learners postpone starting altogether. Second, constant digital distractions exacerbate poor time management. Notifications from short-form video platforms fragment attention, making sustained reading feel tedious compared with instant entertainment.

The effects of chronic delay are detrimental to both academic outcomes and personal well-being. When essays or coding projects are rushed overnight, students skip crucial stages such as outlining, peer review, and proofreading, resulting in superficial analysis and lower grades. Furthermore, last-minute cramming disrupts sleep cycles and elevates cortisol levels, leaving students fatigued during subsequent lectures. Over a semester, this cycle of stress can erode intrinsic motivation and trigger burnout.

In conclusion, academic procrastination stems largely from perfectionism and digital overstimulation, and it produces weaker coursework alongside heightened anxiety. Addressing these root triggers early in university life is essential for sustainable academic success.`,
    gradingChecklistVi: [
      'Có luận điểm (thesis statement) bao quát cả nguyên nhân lẫn hệ quả',
      'Dùng từ nối nhân–quả chuẩn xác (drive, exacerbate, resulting in, consequently)',
      'Mỗi đoạn thân bài triển khai rõ 2 ý với giải thích và ví dụ cụ thể',
    ],
  },
  {
    id: 'aw-ex-10',
    type: 'Essay: Cause-Effect',
    title: 'Tác động của việc sử dụng công cụ AI tạo sinh đối với kỹ năng viết học thuật',
    level: 'B2',
    recommendedWords: 270,
    promptVi:
      'Việc sinh viên lạm dụng công cụ AI tạo sinh để viết hộ tiểu luận đang ngày càng phổ biến. Hãy phân tích nguyên nhân dẫn đến xu hướng này và hệ quả đối với năng lực tư duy phản biện.',
    promptEn:
      'Many undergraduates increasingly rely on generative AI tools to draft academic essays. Analyze the causes behind this trend and its long-term effects on critical thinking and writing development.',
    keywordsEn: ['generative AI', 'over-reliance', 'critical thinking', 'atrophy', 'pedagogical'],
    structureOutline: [
      'Introduction: Thực trạng sinh viên dùng AI viết bài + Thesis nêu nguyên nhân & hệ quả',
      'Body 1 (Causes): Áp lực điểm số/hạn nộp dày đặc + thiếu hướng dẫn rõ ràng về cách dùng AI hợp lệ',
      'Body 2 (Effects): Suy giảm kỹ năng lập luận độc lập + nguy cơ tiếp nhận thông tin sai lệch (hallucination)',
      'Conclusion: Khẳng định cần sử dụng AI như công cụ hỗ trợ tư duy chứ không thay thế người viết',
    ],
    sampleBandHigh: `The rapid adoption of generative artificial intelligence has transformed how university students approach written assignments. While these tools offer instant drafting support, uncritical reliance on AI stems from identifiable academic pressures and carries serious consequences for intellectual development.

Two main factors explain why undergraduates turn to AI-generated prose. Primarily, heavy course workloads combined with part-time jobs create acute time scarcity, tempting students to treat automated drafting as a shortcut. In addition, many universities lack clear guidelines distinguishing legitimate brainstorming assistance from unauthorized ghostwriting, leaving students uncertain about acceptable boundaries.

Over-reliance on automated text generation poses significant risks to cognitive growth. Writing is not merely a mechanical transcription of finished thoughts; rather, it is the primary process through which learners organize evidence, test assumptions, and refine arguments. When students outsource drafting to algorithms, their ability to synthesize conflicting sources and construct original rebuttals gradually atrophies. Moreover, because language models occasionally fabricate citations or oversimplify nuanced theories, unverified AI submissions undermine academic integrity and expose students to disciplinary penalties.

In summary, time pressure and ambiguous institutional policies drive excessive AI dependence, which ultimately weakens critical reasoning and scholarly credibility. Universities must therefore pair clear ethics rules with process-focused writing instruction.`,
    gradingChecklistVi: [
      'Phân tích sâu cơ chế "viết là quá trình tư duy" thay vì chỉ nói chung chung',
      'Dùng từ vựng học thuật chính xác (atrophy, outsource, fabricate citations)',
      'Bố cục cân đối giữa nguyên nhân và hệ quả',
    ],
  },
  {
    id: 'aw-ex-11',
    type: 'Essay: Cause-Effect',
    title: 'Hiện tượng chảy máu chất xám ở các đô thị nhỏ (Rural-to-Urban Youth Migration)',
    level: 'B2',
    recommendedWords: 260,
    promptVi:
      'Ngày càng nhiều sinh viên tốt nghiệp đại học từ các tỉnh lẻ ở lại thành phố lớn thay vì quay về quê làm việc. Hãy phân tích nguyên nhân và hệ quả kinh tế – xã hội của hiện tượng này.',
    promptEn:
      'An increasing proportion of university graduates from rural provinces remain in major metropolitan centers after graduation. Examine the causes of this internal brain drain and its socioeconomic effects on smaller regions.',
    keywordsEn: ['brain drain', 'metropolitan', 'wage disparity', 'regional development', 'aging population'],
    structureOutline: [
      'Introduction: Xu hướng sinh viên tỉnh lẻ ở lại siêu đô thị + Thesis statement',
      'Body 1 (Causes): Chênh lệch thu nhập, cơ hội nghề nghiệp chuyên sâu và hạ tầng y tế/giáo dục',
      'Body 2 (Effects): Thiếu hụt nhân lực chất lượng cao ở địa phương + quá tải hạ tầng ở thành phố lớn',
      'Conclusion: Tóm tắt và nhấn mạnh nhu cầu phát triển cụm kinh tế vùng',
    ],
    sampleBandHigh: `Across rapidly developing economies, talented university graduates from provincial towns overwhelmingly choose to launch their careers in major metropolitan hubs. This internal brain drain is fueled by stark economic disparities and generates profound consequences for both sending provinces and overcrowded cities.

The primary driver of this migration is the concentration of specialized industries and higher compensation in capital cities. Graduates in finance, software engineering, and media rarely find comparable entry-level positions or mentorship networks in smaller hometowns. Beyond salary differentials, metropolitan areas offer superior healthcare, cultural amenities, and lifelong learning opportunities that appeal strongly to young professionals.

Consequently, provincial communities suffer a persistent shortage of skilled human capital. Local hospitals, schools, and small enterprises struggle to modernize without young specialists, widening the developmental gap between urban cores and rural regions. Simultaneously, rapid population inflow strains metropolitan housing affordability, public transit, and environmental quality, often reducing real disposable income for recent graduates despite higher nominal wages.

To conclude, uneven job markets and urban amenities draw graduates away from smaller provinces, leaving local economies under-resourced while intensifying urban congestion. Balanced regional investment is therefore vital to reverse this imbalance.`,
    gradingChecklistVi: [
      'Phân tích tác động hai chiều (cả tỉnh lẻ lẫn thành phố lớn)',
      'Từ vựng kinh tế–xã hội chuẩn (disparities, human capital, nominal wages)',
      'Lập luận mạch lạc, không sa vào kể chuyện cá nhân',
    ],
  },
  {
    id: 'aw-ex-12',
    type: 'Essay: Cause-Effect',
    title: 'Hệ quả của làm việc bán thời gian quá nhiều đối với sinh viên đại học',
    level: 'B1',
    recommendedWords: 250,
    promptVi:
      'Nhiều sinh viên đi làm thêm hơn 25 giờ mỗi tuần trong năm học. Hãy phân tích nguyên nhân tài chính/xã hội và tác động của việc này lên kết quả học tập.',
    promptEn:
      'Many full-time undergraduates work over 25 hours a week in part-time jobs. Discuss the causes of heavy student employment and its effects on academic engagement.',
    keywordsEn: ['tuition fees', 'part-time employment', 'academic engagement', 'fatigue', 'balance'],
    structureOutline: [
      'Introduction: Thực trạng sinh viên làm thêm nhiều giờ + Thesis statement',
      'Body 1 (Causes): Chi phí sinh hoạt/học phí tăng + mong muốn tự lập tài chính và tích lũy kinh nghiệm',
      'Body 2 (Effects): Thiếu thời gian tự học, bỏ lỡ hoạt động ngoại khóa/nghiên cứu, mệt mỏi trên lớp',
      'Conclusion: Tóm tắt và khuyên giới hạn giờ làm hợp lý',
    ],
    sampleBandHigh: `Working part-time has become a routine part of university life, with many full-time students logging more than 25 hours per week in retail or hospitality shifts. While financial necessity and career ambition motivate this trend, excessive working hours can significantly undermine academic engagement.

Two main reasons explain why students take on demanding schedules. Most evidently, rising urban living costs and tuition expenses compel learners from modest backgrounds to earn income to cover rent and daily necessities. Additionally, some undergraduates seek early workplace exposure to strengthen their CVs and achieve financial independence from their families.

However, working beyond twenty hours weekly often produces negative academic consequences. Late-night or weekend shifts leave students physically exhausted during morning seminars, reducing concentration and class participation. Moreover, heavy work commitments crowd out essential study habits such as library research, group project meetings, and campus networking. Over time, students may settle for minimum passing grades rather than pursuing deeper mastery or honors research.

In conclusion, economic pressure and the desire for independence push many students into heavy part-time employment, which frequently compromises sleep, study time, and academic achievement. Maintaining a balanced schedule is crucial so that work supports rather than derails higher education.`,
    gradingChecklistVi: [
      'Phân biệt rõ mặt tích cực mong muốn (tự lập) với hệ quả khi vượt ngưỡng (>25 giờ/tuần)',
      'Dùng cấu trúc câu đa dạng (while, moreover, rather than)',
      'Độ dài hợp lý khoảng 240–270 từ',
    ],
  },

  // 4. Essay: Argumentative (4 đề: aw-ex-13 .. aw-ex-16)
  {
    id: 'aw-ex-13',
    type: 'Essay: Argumentative',
    title: 'Có nên bãi bỏ kỳ thi viết truyền thống và thay bằng đánh giá dự án thực tế?',
    level: 'B2',
    recommendedWords: 280,
    promptVi:
      'Một số chuyên gia cho rằng đại học nên thay thế hoàn toàn các kỳ thi viết cuối kỳ bằng bài tập dự án và đánh giá quá trình. Bạn đồng ý hay phản đối quan điểm này?',
    promptEn:
      'Some educators argue that universities should completely replace traditional closed-book final exams with project-based and continuous assessments. To what extent do you agree or disagree?',
    keywordsEn: ['closed-book exams', 'project-based assessment', 'academic integrity', 'balanced', 'competency'],
    structureOutline: [
      'Introduction: Nêu tranh luận + Lập trường rõ ràng (phản đối việc thay thế HOÀN TOÀN; ủng hộ mô hình kết hợp)',
      'Body 1 (Giá trị của dự án): Đo năng lực giải quyết vấn đề thực tế, hợp tác nhóm, tư duy sáng tạo',
      'Body 2 (Vai trò không thể thiếu của thi viết + phản biện): Kiểm tra năng lực cá nhân độc lập, chống gian lận thuê làm hộ',
      'Conclusion: Khẳng định kết hợp cả hai hình thức là tối ưu nhất',
    ],
    sampleBandHigh: `Traditional closed-book final examinations are frequently criticized for rewarding rote memorization rather than genuine understanding. Consequently, some educators advocate replacing them entirely with project-based and continuous assessments. While coursework projects offer undeniable pedagogical advantages, I believe eliminating timed examinations altogether would weaken academic standards; a balanced hybrid assessment model is far more effective.

Admittedly, project-based evaluations reflect real-world professional demands much better than three-hour written tests. By designing prototypes, analyzing real datasets, or conducting field interviews, students cultivate collaboration, research synthesis, and iterative problem-solving skills that employers value. Continuous assessment also reduces the high-stakes anxiety associated with a single end-of-term exam.

Nevertheless, removing closed-book exams completely introduces serious risks regarding individual accountability and academic integrity. In group projects or take-home essays, it is difficult for instructors to verify how much work an individual student genuinely completed, especially given widespread access to generative AI tools. Timed, proctored examinations remain an essential mechanism for testing whether each graduate has independently internalized core theoretical principles and can apply them under pressure without external assistance.

In conclusion, although project-based tasks should occupy a substantial share of university grading, they should complement rather than abolish traditional examinations. Combining both methods ensures that graduates possess both collaborative practical skills and verified individual mastery.`,
    gradingChecklistVi: [
      'Nêu lập trường dứt khoát ngay từ mở bài (không nửa vời)',
      'Có phần nhượng bộ (Admittedly...) và phản bác chặt chẽ (Nevertheless...)',
      'Dùng lập luận thực tế (kiểm chứng năng lực cá nhân, chống gian lận AI)',
    ],
  },
  {
    id: 'aw-ex-14',
    type: 'Essay: Argumentative',
    title: 'Sinh viên có nên được phép sử dụng thiết bị điện tử cá nhân trong lớp học?',
    level: 'B1',
    recommendedWords: 250,
    promptVi:
      'Một số giảng viên cấm hoàn toàn laptop và điện thoại trong giờ giảng vì gây mất tập trung. Bạn đồng ý hay phản đối lệnh cấm tuyệt đối này?',
    promptEn:
      'Some university professors ban laptops and smartphones completely during lectures to prevent distraction. Do you agree or disagree with a strict ban on personal digital devices in class?',
    keywordsEn: ['digital devices', 'distraction', 'accessibility', 'self-regulation', 'strict ban'],
    structureOutline: [
      'Introduction: Bối cảnh tranh cãi về laptop/điện thoại trong giảng đường + Thesis (phản đối cấm tuyệt đối)',
      'Body 1 (Lý do phản đối cấm): Cần cho tra cứu nhanh, ghi chú số hóa, hỗ trợ sinh viên khuyết tật/học bằng tiếng Anh (EMI)',
      'Body 2 (Nhượng bộ & giải pháp): Thừa nhận nguy cơ mất tập trung, nhưng giải pháp là thiết kế bài giảng tương tác & rèn tự chủ thay vì cấm đoán',
      'Conclusion: Tái khẳng định quan điểm',
    ],
    sampleBandHigh: `Because social media notifications and off-task browsing often distract students during lectures, several university instructors have imposed strict bans on laptops and smartphones. Although reducing classroom distraction is a legitimate goal, I disagree with blanket prohibitions because they ignore essential learning needs and fail to cultivate student self-regulation.

First, digital devices serve indispensable academic functions in modern classrooms. Many undergraduates use laptops to annotate lecture slides, organize searchable digital notes, and run statistical or coding software during interactive demonstrations. For students studying in English-medium programs, quick access to digital glossaries is crucial for following unfamiliar technical terminology. A total ban also disadvantages learners with visual or motor impairments who rely on assistive screen readers or typing tools.

Critics rightly point out that multitasking on laptops can lower comprehension for both the user and nearby peers. However, banning technology treats adults like secondary school pupils rather than teaching responsible digital habits needed in modern workplaces. A more constructive approach is establishing clear norms—such as "screens-down" periods during group discussions—while incorporating live polling or collaborative tasks that keep devices focused on course content.

In conclusion, while off-task device use is a genuine challenge, strict classroom bans are counterproductive. Guided digital etiquette and engaging pedagogy offer a far better solution.`,
    gradingChecklistVi: [
      'Đưa ra lý do thuyết phục (hỗ trợ người học EMI, phần mềm chuyên ngành, công cụ trợ năng)',
      'Nhượng bộ hợp lý với phe ủng hộ cấm trước khi đề xuất giải pháp thay thế',
      'Từ vựng rõ ràng, đúng văn phong nghị luận',
    ],
  },
  {
    id: 'aw-ex-15',
    type: 'Essay: Argumentative',
    title: 'Giáo dục đại học nên ưu tiên đào tạo kỹ năng nghề nghiệp hay tư duy học thuật nền tảng?',
    level: 'C1',
    recommendedWords: 280,
    promptVi:
      'Nhiều người cho rằng trường đại học chỉ nên dạy kỹ năng thực hành nghề nghiệp để sinh viên dễ xin việc, thay vì tập trung vào lý thuyết hàn lâm. Bạn đánh giá quan điểm này như thế nào?',
    promptEn:
      'Some people argue that universities should focus primarily on practical vocational skills rather than theoretical academic knowledge so graduates can secure employment faster. To what extent do you agree or disagree?',
    keywordsEn: ['vocational skills', 'theoretical foundation', 'adaptability', 'obsolescence', 'synergy'],
    structureOutline: [
      'Introduction: Tranh luận giữa đào tạo thực hành và lý thuyết hàn lâm + Lập trường (không nên hy sinh lý thuyết nền tảng)',
      'Body 1 (Giá trị của lý thuyết nền): Công nghệ đổi thay nhanh, kỹ năng công cụ dễ lỗi thời; tư duy nền tảng giúp tự học cả đời',
      'Body 2 (Vai trò của thực hành & kết hợp): Thừa nhận sinh viên cần kỹ năng ứng dụng để qua vòng tuyển dụng, nhưng đại học khác trường nghề ở năng lực phân tích gốc rễ',
      'Conclusion: Tóm tắt sự cộng hưởng giữa nền tảng lý thuyết và thực hành',
    ],
    sampleBandHigh: `In an increasingly competitive job market, critics frequently urge universities to replace theoretical coursework with hands-on vocational training. While practical readiness is undeniably important for career entry, I largely disagree with prioritizing narrow job skills at the expense of foundational academic theory.

The primary limitation of purely vocational curricula is rapid skill obsolescence. Software frameworks, marketing platforms, and regulatory tools evolve every few years; graduates trained exclusively on today’s operational procedures risk struggling when industries shift. By contrast, rigorous theoretical foundations—such as microeconomic modeling, statistical reasoning, or algorithmic complexity—equip students with durable mental frameworks. Understanding why a system works enables professionals to adapt independently and learn emerging tools throughout a forty-year career.

That said, universities cannot ignore employability pressures entirely. Employers rightly expect graduates to communicate clearly, collaborate in teams, and apply concepts to real datasets. However, integrating internships, capstone labs, and industry case studies does not require abandoning academic depth. Rather than acting as trade schools, universities fulfill their distinct mission when theory illuminates practice: theoretical principles guide sound judgment, while applied projects test those principles in messy real-world contexts.

In conclusion, sacrificing academic theory for short-term vocational convenience would be shortsighted. Higher education serves students best by uniting deep conceptual mastery with structured practical application.`,
    gradingChecklistVi: [
      'Lập luận sắc bén ở tầm vĩ mô (tốc độ lỗi thời của công cụ vs. độ bền của tư duy nền tảng)',
      'Từ vựng C1 chính xác (obsolescence, durable mental frameworks, shortsighted)',
      'Cân đối giữa nhượng bộ và bảo vệ luận điểm chính',
    ],
  },
  {
    id: 'aw-ex-16',
    type: 'Essay: Argumentative',
    title: 'Có nên bắt buộc sinh viên tham gia một học kỳ thực tập có tín chỉ trước khi tốt nghiệp?',
    level: 'B2',
    recommendedWords: 260,
    promptVi:
      'Một số trường đại học quy định thực tập doanh nghiệp là học phần bắt buộc để tốt nghiệp. Theo bạn, điều này mang lại nhiều lợi ích hơn hay bất cập hơn?',
    promptEn:
      'Some universities make a credit-bearing industry internship mandatory for all undergraduates before graduation. Do the advantages of this requirement outweigh the disadvantages?',
    keywordsEn: ['mandatory internship', 'credit-bearing', 'equity', 'workplace readiness', 'unpaid'],
    structureOutline: [
      'Introduction: Thực trạng quy định thực tập bắt buộc + Lập trường (lợi ích vượt trội nếu trường kiểm soát chất lượng và công bằng)',
      'Body 1 (Bất cập tiềm ẩn): Rủi ro thực tập không lương gây bất lợi cho sinh viên nghèo, hoặc công việc vặt không đúng chuyên môn',
      'Body 2 (Lợi ích vượt trội): Thu hẹp khoảng cách trường học – doanh nghiệp, định hướng nghề nghiệp sớm, tăng tỷ lệ có việc làm',
      'Conclusion: Lợi ích vượt trội khi có cơ chế bảo trợ của nhà trường',
    ],
    sampleBandHigh: `Making industry internships a mandatory graduation requirement has gained traction across higher education institutions. Although poorly regulated placements can create logistical hurdles, I believe the long-term benefits of compulsory internships substantially outweigh the drawbacks, provided universities enforce basic quality safeguards.

Admittedly, mandatory internships can pose equity challenges if left entirely to market forces. Students from low-income backgrounds may struggle to afford unpaid placements in major cities, while weaker oversight can leave interns performing routine clerical errands rather than meaningful professional tasks. Furthermore, students planning purely academic research careers might prefer laboratory assistantships over corporate placements.

Despite these concerns, structured internships deliver transformative advantages that classroom lectures cannot replicate. Exposure to real workplace workflows helps undergraduates test career fit early, build professional networks, and translate abstract coursework into measurable deliverables. Empirical graduate-tracking surveys consistently show that students with relevant internship experience secure full-time employment faster and negotiate higher starting salaries. When universities partner directly with vetted employers, offer stipends or research-lab alternatives, and assign faculty mentors, most inequities can be effectively mitigated.

In conclusion, the career readiness and clarity gained through mandatory internships outweigh their administrative challenges, making them a valuable pillar of undergraduate education.`,
    gradingChecklistVi: [
      'So sánh rõ lợi ích và bất cập (unpaid internships, equity) theo đúng dạng câu hỏi outweigh',
      'Nêu điều kiện đi kèm hợp lý (kiểm soát chất lượng, phương án lab nghiên cứu thay thế)',
      'Mạch văn tự nhiên, học thuật',
    ],
  },
];

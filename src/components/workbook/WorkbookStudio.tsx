import React, { useMemo, useState } from 'react';
import { BookOpenCheck, Printer, X } from 'lucide-react';
import { AudienceId, ExamType } from '../../types/audience';
import { Exercise } from '../../types/exercise';
import {
  SCHOOL_EXAM_SETS,
  SCHOOL_GRADES,
  SCHOOL_REVIEWS,
  SCHOOL_UNITS,
  SchoolGrade,
} from '../../data/teen/schoolCurriculumData';
import {
  KIDS_UNITS,
  KIDS_YLE_CHALLENGES,
  KIDS_YLE_MOCK_TESTS,
  YleLevel,
} from '../../data/kids/kidsCurriculumData';
import {
  ACADEMIC_ABSTRACTS,
  ACADEMIC_WRITING_PROMPTS,
  AWL_DRILLS,
  AWL_WORDS,
  GRADUATION_QUICK_QUIZ,
} from '../../data/university/academicCurriculumData';
import {
  WORKPLACE_CASE_SITUATIONS,
  WORKPLACE_EMAIL_TEMPLATES,
  WORKPLACE_MEETING_PHRASES,
  WORKPLACE_STAR_QUESTIONS,
  WORKPLACE_VOCAB_DRILLS,
} from '../../data/worker/workplaceScenariosData';
import { PRACTICAL_CATEGORIES } from '../../data/practicalCategories';
import { EXAM_ORDER, EXAM_PREP_DATA } from '../../data/exam/examPrepData';

export interface WorkbookStudioProps {
  defaultAudience?: AudienceId;
  onClose?: () => void;
}

interface PrintableAnswer {
  num: string;
  answer: string;
  explain: string;
}

function renderCleanText(text: string): string {
  return text.replace(/\[\[([^\]]+)\]\]/g, '$1');
}

function formatExerciseAnswer(ex: Exercise): string {
  switch (ex.kind) {
    case 'mcq':
      return `${String.fromCharCode(65 + ex.correctIndex)}. ${renderCleanText(ex.options[ex.correctIndex] || '')}`;
    case 'pronunciation':
      return `${String.fromCharCode(65 + ex.correctIndex)}. ${renderCleanText(ex.words[ex.correctIndex] || '')}`;
    case 'error-find':
      return `${String.fromCharCode(65 + ex.wrongIndex)}. ${ex.parts[ex.wrongIndex] || ''} → Sửa: ${ex.correction}`;
    case 'gap-fill':
      return ex.answers.map((a) => a.split('|')[0]).join(' / ');
    case 'word-order':
      return ex.answer;
    case 'transform':
      return `${ex.starter ? ex.starter + ' ' : ''}${ex.answers[0]}`;
    case 'true-false':
      return ex.answer ? 'True (Đúng)' : 'False (Sai)';
    case 'matching':
      return ex.pairs.map((p, i) => `${i + 1}→${p.right}`).join('; ');
  }
}

export const WorkbookStudio: React.FC<WorkbookStudioProps> = ({
  defaultAudience = 'teen',
  onClose,
}) => {
  const [audience, setAudience] = useState<AudienceId>(defaultAudience);
  const [publisherName, setPublisherName] = useState('MyEnglish');
  const [includeAnswers, setIncludeAnswers] = useState(true);

  // Teen filters
  const [teenGrade, setTeenGrade] = useState<SchoolGrade>(9);
  const [teenScope, setTeenScope] = useState<'hk1' | 'hk2' | 'full' | 'reviews' | 'entrance10' | 'thpt'>('hk1');

  // Kids filters
  const [kidsScope, setKidsScope] = useState<'part1' | 'part2' | 'starters' | 'movers' | 'flyers'>('part1');

  // Uni filters
  const [uniScope, setUniScope] = useState<'awl' | 'abstracts' | 'writing-grad'>('awl');

  // Worker filters
  const [workerIndustry, setWorkerIndustry] = useState<string>(PRACTICAL_CATEGORIES[0]);

  // Exam filters
  const [examType, setExamType] = useState<ExamType>('ielts');
  const [examScope, setExamScope] = useState<'all-mocks' | 'skills'>('all-mocks');

  const workbookMeta = useMemo(() => {
    switch (audience) {
      case 'kids':
        return {
          title: 'Sách Bài Tập Tiếng Anh Thiếu Nhi (6–10 Tuổi)',
          subtitle:
            kidsScope === 'part1'
              ? 'Phần 1: 12 Chủ Đề Cốt Lõi & 120 Bài Tập Tương Tác'
              : kidsScope === 'part2'
              ? 'Phần 2: 12 Chủ Đề Mở Rộng & 120 Bài Tập Tương Tác'
              : `Bộ Đề Luyện Thi Cambridge YLE — Cấp độ ${kidsScope.toUpperCase()}`,
        };
      case 'teen':
        return {
          title: `Sách Bài Tập Tiếng Anh ${SCHOOL_GRADES.find((g) => g.grade === teenGrade)?.label || ''}`,
          subtitle:
            teenScope === 'hk1'
              ? 'Học kỳ 1 (Global Success — Biên soạn độc lập)'
              : teenScope === 'hk2'
              ? 'Học kỳ 2 (Global Success — Biên soạn độc lập)'
              : teenScope === 'full'
              ? 'Trọn bộ Cả năm (Từ vựng, Ngữ pháp & 25 bài tập/Unit)'
              : teenScope === 'reviews'
              ? `4 Bài Ôn Tập Định Kỳ ${SCHOOL_GRADES.find((g) => g.grade === teenGrade)?.label}`
              : teenScope === 'entrance10'
              ? 'Tuyển Tập 10 Đề Thi Thử Vào Lớp 10 (Có Đáp Án & Giải Thích)'
              : 'Tuyển Tập 10 Đề Thi Thử Tốt Nghiệp THPT Format 2025',
        };
      case 'university':
        return {
          title: 'Giáo Trình Tiếng Anh Học Thuật Đại Học (EAP)',
          subtitle:
            uniScope === 'awl'
              ? '300 Từ Vựng Học Thuật AWL & 50 Bài Tập Collocation / Word-Form'
              : uniScope === 'abstracts'
              ? '30 Bài Đọc Hiểu Abstract Nghiên Cứu (115 Câu Hỏi)'
              : '40 Đề Viết Học Thuật / CV & 60 Câu Quiz Chuẩn Đầu Ra',
        };
      case 'worker':
        return {
          title: `Giáo Trình Tiếng Anh Công Sở — ${workerIndustry}`,
          subtitle: 'Cụm Câu Họp, Mẫu Email, Phỏng Vấn STAR, Tình Huống & Bài Tập Thực Hành',
        };
      case 'exam':
        return {
          title: `Bộ Đề Luyện Thi Chứng Chỉ ${EXAM_PREP_DATA[examType].title}`,
          subtitle:
            examScope === 'all-mocks'
              ? '5 Đề Thi Thử Bấm Giờ & 20 Câu Chẩn Đoán Trình Độ'
              : 'Chiến Thuật, Bài Đọc Hiểu & Đề Viết / Nói Mẫu Band Cao',
        };
      case 'preschool':
      default:
        return {
          title: 'Giáo Trình Mầm Non (1–6 Tuổi)',
          subtitle: 'Học qua tranh ảnh, bài hát & truyện tương tác trực tiếp trong lớp học của bé',
        };
    }
  }, [audience, teenGrade, teenScope, kidsScope, uniScope, workerIndustry, examType, examScope]);

  const answerKeyList: PrintableAnswer[] = useMemo(() => {
    const list: PrintableAnswer[] = [];
    if (audience === 'teen') {
      if (teenScope === 'entrance10' || teenScope === 'thpt') {
        SCHOOL_EXAM_SETS[teenScope].forEach((set, sIdx) => {
          set.questions.forEach((q, qIdx) => {
            list.push({
              num: `Đề ${sIdx + 1} - Câu ${qIdx + 1}`,
              answer: `${String.fromCharCode(65 + q.correctIndex)}. ${renderCleanText(q.options[q.correctIndex] || '')}`,
              explain: q.explanationVi,
            });
          });
        });
      } else if (teenScope === 'reviews') {
        SCHOOL_REVIEWS.filter((r) => r.grade === teenGrade).forEach((rev) => {
          rev.exercises.forEach((ex, i) => {
            list.push({
              num: `${rev.title} - Câu ${i + 1}`,
              answer: formatExerciseAnswer(ex),
              explain: ex.kind === 'matching' ? '' : ex.explanationVi,
            });
          });
        });
      } else {
        const split = teenGrade <= 9 ? 6 : 5;
        const units = SCHOOL_UNITS.filter((u) => {
          if (u.grade !== teenGrade) return false;
          if (teenScope === 'hk1') return u.unitNumber <= split;
          if (teenScope === 'hk2') return u.unitNumber > split;
          return true;
        });
        units.forEach((u) => {
          (u.exercises || []).forEach((ex, i) => {
            list.push({
              num: `Unit ${u.unitNumber} - Câu ${i + 1}`,
              answer: formatExerciseAnswer(ex),
              explain: ex.kind === 'matching' ? '' : ex.explanationVi,
            });
          });
        });
      }
    } else if (audience === 'kids') {
      if (kidsScope === 'part1' || kidsScope === 'part2') {
        const units = kidsScope === 'part1' ? KIDS_UNITS.slice(0, 12) : KIDS_UNITS.slice(12);
        units.forEach((u) => {
          (u.exercises || []).forEach((ex, i) => {
            list.push({
              num: `${u.title} - Câu ${i + 1}`,
              answer: formatExerciseAnswer(ex),
              explain: ex.kind === 'matching' ? '' : ex.explanationVi,
            });
          });
        });
      } else {
        const lvl = kidsScope as YleLevel;
        KIDS_YLE_CHALLENGES.filter((q) => q.level === lvl).forEach((q, i) => {
          list.push({
            num: `Luyện tập - Câu ${i + 1}`,
            answer: `${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}`,
            explain: q.funExplain,
          });
        });
        KIDS_YLE_MOCK_TESTS.filter((m) => m.level === lvl).forEach((m, mIdx) => {
          m.questions.forEach((q, qIdx) => {
            list.push({
              num: `Đề ${mIdx + 1} - Câu ${qIdx + 1}`,
              answer: `${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}`,
              explain: q.funExplain,
            });
          });
        });
      }
    } else if (audience === 'university') {
      if (uniScope === 'awl') {
        AWL_DRILLS.forEach((ex, i) => {
          list.push({
            num: `AWL Drill - Câu ${i + 1}`,
            answer: formatExerciseAnswer(ex),
            explain: ex.kind === 'matching' ? '' : ex.explanationVi,
          });
        });
      } else if (uniScope === 'abstracts') {
        ACADEMIC_ABSTRACTS.forEach((abs, aIdx) => {
          abs.questions.forEach((q, qIdx) => {
            list.push({
              num: `Abstract ${aIdx + 1} - Câu ${qIdx + 1}`,
              answer: `${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}`,
              explain: q.explanationVi,
            });
          });
        });
      } else {
        GRADUATION_QUICK_QUIZ.forEach((q, i) => {
          list.push({
            num: `Quiz Đầu Ra - Câu ${i + 1}`,
            answer: `${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}`,
            explain: q.explanationVi,
          });
        });
      }
    } else if (audience === 'worker') {
      WORKPLACE_VOCAB_DRILLS.filter((d) => d.industry === workerIndustry).forEach((ex, i) => {
        list.push({
          num: `Drill - Câu ${i + 1}`,
          answer: formatExerciseAnswer(ex),
          explain: ex.kind === 'matching' ? '' : ex.explanationVi,
        });
      });
    } else if (audience === 'exam') {
      const p = EXAM_PREP_DATA[examType];
      if (examScope === 'all-mocks') {
        p.diagnosticQuestions.forEach((q, i) => {
          list.push({
            num: `Diagnostic - Câu ${i + 1}`,
            answer: `${String.fromCharCode(65 + q.correctIdx)}. ${q.options[q.correctIdx]}`,
            explain: q.explanation,
          });
        });
        (p.mockTests || [p.mockTest]).forEach((mt, mIdx) => {
          mt.questions.forEach((q, qIdx) => {
            list.push({
              num: `Mock #${mIdx + 1} - Câu ${qIdx + 1}`,
              answer: `${String.fromCharCode(65 + q.correctIdx)}. ${q.options[q.correctIdx]}`,
              explain: q.explanation,
            });
          });
        });
      } else {
        p.skillPractice.reading.forEach((r, rIdx) => {
          r.questions.forEach((q, qIdx) => {
            list.push({
              num: `Reading ${rIdx + 1} - Câu ${qIdx + 1}`,
              answer: `${String.fromCharCode(65 + q.correctIdx)}. ${q.options[q.correctIdx]}`,
              explain: q.explanation,
            });
          });
        });
      }
    }
    return list;
  }, [audience, teenGrade, teenScope, kidsScope, uniScope, workerIndustry, examType, examScope]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 print:bg-white print:text-black">
      <style>{`
        @media print {
          @page { size: A4; margin: 16mm; }
          .wb-page-break { break-after: page; page-break-after: always; }
          .wb-avoid-break { break-inside: avoid; page-break-inside: avoid; }
        }
      `}</style>

      {/* Control Bar (Hidden when printing) */}
      <div className="print:hidden sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm px-4 py-3">
        <div className="max-w-5xl mx-auto space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base font-black">Xưởng Xuất Sách Bài Tập PDF (Workbook Studio)</h1>
                <p className="text-xs text-slate-500">
                  Chọn đối tượng &amp; phạm vi rồi bấm In / Lưu PDF khổ A4 kèm phụ lục đáp án.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-sm"
              >
                <Printer className="w-4 h-4" /> In / Lưu PDF (A4)
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" /> Đóng
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            <div>
              <label className="block font-bold text-slate-500 mb-1">1. Đối tượng</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as AudienceId)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
              >
                <option value="teen">🎒 Học sinh THCS &amp; THPT (6–12)</option>
                <option value="kids">🧸 Trẻ em (6–10 tuổi) &amp; YLE</option>
                <option value="university">🎓 Sinh viên Đại học (EAP)</option>
                <option value="worker">💼 Người đi làm (10 Ngành)</option>
                <option value="exam">🏆 Luyện thi Chứng chỉ</option>
              </select>
            </div>

            {audience === 'teen' && (
              <>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">2. Khối lớp</label>
                  <select
                    value={teenGrade}
                    onChange={(e) => setTeenGrade(Number(e.target.value) as SchoolGrade)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                  >
                    {SCHOOL_GRADES.map((g) => (
                      <option key={g.grade} value={g.grade}>
                        {g.label} ({g.bookTitle})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">3. Phạm vi nội dung</label>
                  <select
                    value={teenScope}
                    onChange={(e) => setTeenScope(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                  >
                    <option value="hk1">Học kỳ 1 (Units + Bài tập)</option>
                    <option value="hk2">Học kỳ 2 (Units + Bài tập)</option>
                    <option value="full">Cả năm học (Tất cả Units)</option>
                    <option value="reviews">4 Bài Review định kỳ (120 câu)</option>
                    <option value="entrance10">10 Đề Thi vào lớp 10 (385 câu)</option>
                    <option value="thpt">10 Đề Thi THPT Format 2025 (385 câu)</option>
                  </select>
                </div>
              </>
            )}

            {audience === 'kids' && (
              <div>
                <label className="block font-bold text-slate-500 mb-1">2. Phạm vi Trẻ em</label>
                <select
                  value={kidsScope}
                  onChange={(e) => setKidsScope(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                >
                  <option value="part1">12 Chủ đề Phần 1 (120 từ + 120 bài tập)</option>
                  <option value="part2">12 Chủ đề Phần 2 (120 từ + 120 bài tập)</option>
                  <option value="starters">Cambridge YLE Starters (50 câu + 3 đề)</option>
                  <option value="movers">Cambridge YLE Movers (50 câu + 3 đề)</option>
                  <option value="flyers">Cambridge YLE Flyers (50 câu + 3 đề)</option>
                </select>
              </div>
            )}

            {audience === 'university' && (
              <div>
                <label className="block font-bold text-slate-500 mb-1">2. Phạm vi Sinh viên</label>
                <select
                  value={uniScope}
                  onChange={(e) => setUniScope(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                >
                  <option value="awl">300 Từ vựng AWL + 50 Drills</option>
                  <option value="abstracts">30 Bài Đọc Abstract (115 câu)</option>
                  <option value="writing-grad">40 Đề Viết + 60 Quiz Đầu Ra</option>
                </select>
              </div>
            )}

            {audience === 'worker' && (
              <div>
                <label className="block font-bold text-slate-500 mb-1">2. Ngành nghề</label>
                <select
                  value={workerIndustry}
                  onChange={(e) => setWorkerIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                >
                  {PRACTICAL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {audience === 'exam' && (
              <>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">2. Kỳ thi</label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value as ExamType)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                  >
                    {EXAM_ORDER.map((k) => (
                      <option key={k} value={k}>
                        {EXAM_PREP_DATA[k].title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">3. Nội dung</label>
                  <select
                    value={examScope}
                    onChange={(e) => setExamScope(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold"
                  >
                    <option value="all-mocks">20 Câu Chẩn Đoán + 5 Đề Thi Thử</option>
                    <option value="skills">6 Bài Đọc + 6 Đề Viết + 7 Đề Nói</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex flex-col justify-end gap-1.5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={publisherName}
                  onChange={(e) => setPublisherName(e.target.value)}
                  placeholder="Tên đơn vị phát hành"
                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
                />
                <label className="inline-flex items-center gap-1.5 font-bold cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={includeAnswers}
                    onChange={(e) => setIncludeAnswers(e.target.checked)}
                  />
                  Kèm đáp án
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Book Sheet */}
      <div className="max-w-4xl mx-auto my-6 bg-white text-slate-900 p-8 sm:p-12 shadow-lg rounded-2xl print:shadow-none print:rounded-none print:my-0 print:p-0">
        {/* COVER PAGE */}
        <div className="wb-page-break py-16 px-6 border-4 border-double border-indigo-900 rounded-2xl text-center space-y-6">
          <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-indigo-700">
            {publisherName || 'MyEnglish'} • Bộ Giáo Trình Tự Học Tiếng Anh Toàn Diện
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            {workbookMeta.title}
          </h2>
          <p className="text-base sm:text-lg font-semibold text-slate-600 max-w-xl mx-auto">
            {workbookMeta.subtitle}
          </p>
          <div className="pt-8 text-xs text-slate-500 max-w-lg mx-auto border-t border-slate-200 leading-relaxed">
            <strong>Ghi chú bản quyền:</strong> Tài liệu bổ trợ biên soạn độc lập, tham khảo khung
            chương trình GDPT 2018 &amp; chuẩn khảo thí quốc tế — không phải SGK chính thức. Phục
            vụ tự học, giảng dạy và ôn luyện.
          </div>
        </div>

        {/* BODY CONTENT */}
        <div className="space-y-8">
          {audience === 'teen' && (teenScope === 'hk1' || teenScope === 'hk2' || teenScope === 'full') &&
            SCHOOL_UNITS.filter((u) => {
              if (u.grade !== teenGrade) return false;
              const split = teenGrade <= 9 ? 6 : 5;
              if (teenScope === 'hk1') return u.unitNumber <= split;
              if (teenScope === 'hk2') return u.unitNumber > split;
              return true;
            }).map((unit) => (
              <section key={unit.id} className="wb-page-break space-y-4">
                <div className="border-b-2 border-indigo-800 pb-2">
                  <div className="text-xs font-extrabold uppercase text-indigo-700">
                    Lớp {unit.grade} • Unit {unit.unitNumber} ({unit.level})
                  </div>
                  <h3 className="text-xl font-black">
                    {unit.title} — {unit.titleVi}
                  </h3>
                </div>

                <div>
                  <h4 className="text-sm font-extrabold uppercase text-slate-700 mb-2">
                    A. Từ vựng trọng tâm ({unit.vocabulary.length} từ)
                  </h4>
                  <table className="w-full text-xs border-collapse border border-slate-300">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border border-slate-300 p-1.5 text-left">Từ / Loại</th>
                        <th className="border border-slate-300 p-1.5 text-left">IPA</th>
                        <th className="border border-slate-300 p-1.5 text-left">Nghĩa &amp; Ví dụ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unit.vocabulary.map((v) => (
                        <tr key={v.word}>
                          <td className="border border-slate-300 p-1.5 font-bold">
                            {v.word} <span className="font-normal text-slate-500">({v.pos})</span>
                          </td>
                          <td className="border border-slate-300 p-1.5 font-mono">{v.ipa}</td>
                          <td className="border border-slate-300 p-1.5">
                            <strong>{v.meaningVi}</strong> — <em>{v.exampleEn}</em>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-300 rounded-lg text-xs space-y-1">
                  <div className="font-extrabold text-indigo-900">B. Ngữ pháp: {unit.grammar.title}</div>
                  <div className="font-mono font-bold">{unit.grammar.formula}</div>
                  <div>{unit.grammar.explanationVi}</div>
                  <div className="text-amber-900">
                    <strong>Lưu ý bẫy:</strong> {unit.grammar.examTrap}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <h4 className="text-sm font-extrabold uppercase text-slate-700">
                    C. Bài tập thực hành ({unit.exercises?.length || 0} câu)
                  </h4>
                  {(unit.exercises || []).map((ex, i) => (
                    <PrintableExerciseItem key={ex.id} index={i + 1} ex={ex} />
                  ))}
                </div>
              </section>
            ))}

          {audience === 'teen' && teenScope === 'reviews' &&
            SCHOOL_REVIEWS.filter((r) => r.grade === teenGrade).map((rev) => (
              <section key={rev.id} className="wb-page-break space-y-3">
                <h3 className="text-lg font-black border-b-2 border-indigo-800 pb-1">
                  {rev.title} ({rev.unitRange})
                </h3>
                {rev.exercises.map((ex, i) => (
                  <PrintableExerciseItem key={ex.id} index={i + 1} ex={ex} />
                ))}
              </section>
            ))}

          {audience === 'teen' && (teenScope === 'entrance10' || teenScope === 'thpt') &&
            SCHOOL_EXAM_SETS[teenScope].map((set, sIdx) => (
              <section key={set.setKey || sIdx} className="wb-page-break space-y-3">
                <div className="border-b-2 border-slate-900 pb-2">
                  <h3 className="text-lg font-black">
                    Đề số {sIdx + 1}: {set.title} ({set.durationMinutes} phút • {set.questions.length} câu)
                  </h3>
                  <p className="text-xs text-slate-600">{set.subtitle}</p>
                </div>
                {set.questions.map((q, qIdx) => (
                  <div key={q.id} className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
                    {q.passage && (
                      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded mb-1.5 leading-relaxed">
                        {q.passageTitle && <div className="font-bold mb-1">{q.passageTitle}</div>}
                        {q.passage}
                      </div>
                    )}
                    <div className="font-bold">
                      Câu {qIdx + 1} [{q.section}]: {renderCleanText(q.question)}
                    </div>
                    <div className="grid grid-cols-2 gap-1 pl-3">
                      {q.options.map((o, oi) => (
                        <div key={oi}>
                          <strong>{String.fromCharCode(65 + oi)}.</strong> {renderCleanText(o)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            ))}

          {audience === 'kids' && (kidsScope === 'part1' || kidsScope === 'part2') &&
            (kidsScope === 'part1' ? KIDS_UNITS.slice(0, 12) : KIDS_UNITS.slice(12)).map((u) => (
              <section key={u.id} className="wb-page-break space-y-3">
                <h3 className="text-lg font-black border-b-2 border-amber-500 pb-1">
                  {u.emoji} {u.title} — {u.titleVi}
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {u.words.map((w) => (
                    <div key={w.id} className="p-2 border border-slate-200 rounded">
                      <span className="text-lg mr-1.5">{w.emoji}</span>
                      <strong>{w.word}</strong> ({w.ipa}) — {w.meaningVi}
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-extrabold uppercase">Bài tập cho bé:</div>
                  {(u.exercises || []).map((ex, i) => (
                    <PrintableExerciseItem key={ex.id} index={i + 1} ex={ex} />
                  ))}
                </div>
              </section>
            ))}

          {audience === 'kids' && (kidsScope === 'starters' || kidsScope === 'movers' || kidsScope === 'flyers') && (
            <section className="space-y-4">
              <h3 className="text-lg font-black border-b-2 border-amber-500 pb-1">
                Luyện tập nhanh {kidsScope.toUpperCase()} (50 câu)
              </h3>
              {KIDS_YLE_CHALLENGES.filter((q) => q.level === kidsScope).map((q, i) => (
                <div key={q.id} className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
                  <div className="font-bold">
                    Câu {i + 1}. {q.emojiHint} {q.prompt}
                  </div>
                  <div className="grid grid-cols-2 gap-1 pl-3">
                    {q.options.map((o, oi) => (
                      <div key={oi}>
                        <strong>{String.fromCharCode(65 + oi)}.</strong> {o}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {KIDS_YLE_MOCK_TESTS.filter((m) => m.level === kidsScope).map((m, mIdx) => (
                <div key={m.id} className="wb-page-break space-y-2 pt-4">
                  <h4 className="text-base font-black border-b border-slate-400 pb-1">
                    Đề thi thử #{mIdx + 1}: {m.title} ({m.durationMinutes} phút)
                  </h4>
                  {m.questions.map((q, qIdx) => (
                    <div key={q.id} className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
                      <div className="font-bold">
                        Câu {qIdx + 1}. {q.emojiHint} {q.prompt}
                      </div>
                      <div className="grid grid-cols-2 gap-1 pl-3">
                        {q.options.map((o, oi) => (
                          <div key={oi}>
                            <strong>{String.fromCharCode(65 + oi)}.</strong> {o}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          )}

          {audience === 'university' && uniScope === 'awl' && (
            <section className="space-y-4">
              <h3 className="text-lg font-black border-b-2 border-violet-700 pb-1">
                Danh mục 300 Từ vựng Học thuật (AWL)
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {AWL_WORDS.map((w, i) => (
                  <div key={w.id} className="p-2 border border-slate-200 rounded wb-avoid-break">
                    <strong>{i + 1}. {w.word}</strong> ({w.pos}) {w.ipa} — {w.meaningVi}
                  </div>
                ))}
              </div>
              <div className="wb-page-break pt-4 space-y-2">
                <h3 className="text-lg font-black border-b-2 border-violet-700 pb-1">
                  50 Bài Tập Collocation &amp; Word-Form
                </h3>
                {AWL_DRILLS.map((ex, i) => (
                  <PrintableExerciseItem key={ex.id} index={i + 1} ex={ex} />
                ))}
              </div>
            </section>
          )}

          {audience === 'university' && uniScope === 'abstracts' &&
            ACADEMIC_ABSTRACTS.map((abs, aIdx) => (
              <section key={abs.id} className="wb-page-break space-y-3">
                <h3 className="text-base font-black border-b border-violet-700 pb-1">
                  Abstract {aIdx + 1}: {abs.title} ({abs.level})
                </h3>
                <p className="text-xs leading-relaxed p-3 bg-slate-50 border border-slate-200 rounded">
                  {abs.abstractEn}
                </p>
                {abs.questions.map((q, qIdx) => (
                  <div key={q.id} className="wb-avoid-break text-xs space-y-1">
                    <div className="font-bold">
                      Câu {qIdx + 1}: {q.questionEn} ({q.questionVi})
                    </div>
                    <div className="grid grid-cols-1 gap-0.5 pl-3">
                      {q.options.map((o, oi) => (
                        <div key={oi}>
                          <strong>{String.fromCharCode(65 + oi)}.</strong> {o}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            ))}

          {audience === 'university' && uniScope === 'writing-grad' && (
            <section className="space-y-4">
              <h3 className="text-lg font-black border-b-2 border-violet-700 pb-1">
                40 Đề Viết Học Thuật, Email &amp; CV
              </h3>
              {ACADEMIC_WRITING_PROMPTS.map((p, i) => (
                <div key={p.id} className="wb-avoid-break p-3 border border-slate-200 rounded text-xs space-y-1">
                  <div className="font-black">
                    Đề {i + 1} [{p.type} • {p.level}]: {p.title}
                  </div>
                  <div>{p.promptEn}</div>
                </div>
              ))}
              <div className="wb-page-break pt-4 space-y-2">
                <h3 className="text-lg font-black border-b-2 border-violet-700 pb-1">
                  60 Câu Quiz Chuẩn Đầu Ra &amp; ATS CV
                </h3>
                {GRADUATION_QUICK_QUIZ.map((q, i) => (
                  <div key={q.id} className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
                    <div className="font-bold">Câu {i + 1}: {q.question}</div>
                    <div className="grid grid-cols-2 gap-1 pl-3">
                      {q.options.map((o, oi) => (
                        <div key={oi}>
                          <strong>{String.fromCharCode(65 + oi)}.</strong> {o}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {audience === 'worker' && (
            <section className="space-y-5">
              <h3 className="text-lg font-black border-b-2 border-emerald-700 pb-1">
                1. Cụm câu họp &amp; Đàm phán ({workerIndustry})
              </h3>
              <div className="space-y-1.5 text-xs">
                {WORKPLACE_MEETING_PHRASES.filter((m) => m.industry === workerIndustry).map((m, i) => (
                  <div key={m.id} className="wb-avoid-break p-2 border border-slate-200 rounded">
                    <strong>{i + 1}. {m.en}</strong> — {m.vi}
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-black border-b-2 border-emerald-700 pb-1 pt-2">
                2. Mẫu Email / Slack &amp; Phỏng vấn STAR
              </h3>
              <div className="space-y-2 text-xs">
                {WORKPLACE_EMAIL_TEMPLATES.filter((e) => e.industry === workerIndustry).map((e) => (
                  <div key={e.id} className="wb-avoid-break p-2.5 border border-slate-200 rounded space-y-1">
                    <div className="font-bold">{e.title}</div>
                    <pre className="whitespace-pre-wrap font-sans text-[11px] bg-slate-50 p-2 rounded">
                      {e.enBody}
                    </pre>
                  </div>
                ))}
                {WORKPLACE_STAR_QUESTIONS.filter((s) => s.industry === workerIndustry).map((s, i) => (
                  <div key={s.id} className="wb-avoid-break p-2.5 border border-slate-200 rounded">
                    <strong>STAR {i + 1}:</strong> {s.questionEn} ({s.questionVi})
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-black border-b-2 border-emerald-700 pb-1 pt-2">
                3. Bài tập Drill chuyên ngành ({workerIndustry})
              </h3>
              {WORKPLACE_VOCAB_DRILLS.filter((d) => d.industry === workerIndustry).map((ex, i) => (
                <PrintableExerciseItem key={ex.id} index={i + 1} ex={ex} />
              ))}
            </section>
          )}

          {audience === 'exam' && (() => {
            const p = EXAM_PREP_DATA[examType];
            if (examScope === 'all-mocks') {
              return (
                <section className="space-y-4">
                  <div className="wb-page-break space-y-2">
                    <h3 className="text-lg font-black border-b-2 border-rose-700 pb-1">
                      Phần 1: Bài Test Chẩn Đoán ({p.diagnosticQuestions.length} câu)
                    </h3>
                    {p.diagnosticQuestions.map((q, i) => (
                      <div key={q.id} className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
                        {q.passage && <div className="p-2 bg-slate-50 rounded">{q.passage}</div>}
                        <div className="font-bold">Câu {i + 1}: {q.question}</div>
                        <div className="grid grid-cols-2 gap-1 pl-3">
                          {q.options.map((o, oi) => (
                            <div key={oi}><strong>{String.fromCharCode(65 + oi)}.</strong> {o}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {(p.mockTests || [p.mockTest]).map((mt, mIdx) => (
                    <div key={mIdx} className="wb-page-break space-y-2">
                      <h3 className="text-lg font-black border-b-2 border-rose-700 pb-1">
                        Đề Thi Thử #{mIdx + 1}: {mt.title} ({mt.durationMinutes} phút)
                      </h3>
                      {mt.questions.map((q, qIdx) => (
                        <div key={q.id} className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
                          {q.passage && <div className="p-2 bg-slate-50 rounded">{q.passage}</div>}
                          <div className="font-bold">Câu {qIdx + 1} [{q.partLabel}]: {q.question}</div>
                          <div className="grid grid-cols-2 gap-1 pl-3">
                            {q.options.map((o, oi) => (
                              <div key={oi}><strong>{String.fromCharCode(65 + oi)}.</strong> {o}</div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </section>
              );
            }
            return (
              <section className="space-y-4">
                {p.skillPractice.reading.map((r, rIdx) => (
                  <div key={r.id} className="wb-page-break space-y-2">
                    <h3 className="text-base font-black border-b border-rose-700 pb-1">
                      Reading {rIdx + 1}: {r.title}
                    </h3>
                    <p className="text-xs leading-relaxed p-3 bg-slate-50 rounded">{r.passage}</p>
                    {r.questions.map((q, qIdx) => (
                      <div key={q.id} className="wb-avoid-break text-xs space-y-1">
                        <div className="font-bold">Câu {qIdx + 1}: {q.question}</div>
                        <div className="grid grid-cols-2 gap-1 pl-3">
                          {q.options.map((o, oi) => (
                            <div key={oi}><strong>{String.fromCharCode(65 + oi)}.</strong> {o}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="wb-page-break space-y-2">
                  <h3 className="text-base font-black border-b border-rose-700 pb-1">
                    Đề Luyện Writing &amp; Speaking
                  </h3>
                  {p.skillPractice.writing.map((w, i) => (
                    <div key={w.id} className="wb-avoid-break p-2.5 border border-slate-200 rounded text-xs">
                      <strong>Writing {i + 1} ({w.taskLabel}):</strong> {w.prompt}
                    </div>
                  ))}
                  {p.skillPractice.speaking.map((s, i) => (
                    <div key={s.id} className="wb-avoid-break p-2.5 border border-slate-200 rounded text-xs">
                      <strong>Speaking {i + 1} ({s.partLabel}):</strong> {s.prompt}
                    </div>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* APPENDIX: ANSWER KEY */}
          {includeAnswers && answerKeyList.length > 0 && (
            <section className="wb-page-break pt-6 space-y-3">
              <h3 className="text-xl font-black border-b-2 border-emerald-700 pb-2 text-emerald-900">
                PHỤ LỤC: ĐÁP ÁN &amp; GIẢI THÍCH CHI TIẾT ({answerKeyList.length} câu)
              </h3>
              <div className="space-y-1.5 text-xs">
                {answerKeyList.map((item, idx) => (
                  <div key={idx} className="wb-avoid-break pb-1.5 border-b border-slate-100">
                    <span className="font-extrabold text-indigo-900">{item.num}:</span>{' '}
                    <span className="font-bold text-emerald-800">{item.answer}</span>
                    {item.explain && (
                      <span className="text-slate-600"> — {item.explain}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const PrintableExerciseItem: React.FC<{ index: number; ex: Exercise }> = ({ index, ex }) => {
  switch (ex.kind) {
    case 'mcq':
      return (
        <div className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
          {ex.passage && <div className="p-2 bg-slate-50 border border-slate-200 rounded mb-1">{ex.passage}</div>}
          <div className="font-bold">Câu {index}. {renderCleanText(ex.question)}</div>
          <div className="grid grid-cols-2 gap-1 pl-3">
            {ex.options.map((o, oi) => (
              <div key={oi}><strong>{String.fromCharCode(65 + oi)}.</strong> {renderCleanText(o)}</div>
            ))}
          </div>
        </div>
      );
    case 'pronunciation':
      return (
        <div className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
          <div className="font-bold">
            Câu {index}. {ex.question || (ex.focus === 'stress' ? 'Chọn từ có trọng âm khác:' : 'Chọn từ có phần gạch chân phát âm khác:')}
          </div>
          <div className="grid grid-cols-4 gap-1 pl-3">
            {ex.words.map((w, wi) => (
              <div key={wi}><strong>{String.fromCharCode(65 + wi)}.</strong> {renderCleanText(w)}</div>
            ))}
          </div>
        </div>
      );
    case 'gap-fill':
      return (
        <div className="wb-avoid-break text-xs pb-2 border-b border-slate-100">
          <span className="font-bold">Câu {index} (Điền từ).</span> {ex.sentence.replace(/___/g, '____________')}
          {ex.hintVi && <span className="text-slate-500"> (Gợi ý: {ex.hintVi})</span>}
        </div>
      );
    case 'word-order':
      return (
        <div className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
          <div className="font-bold">Câu {index} (Sắp xếp từ thành câu): {ex.words.join(' / ')}</div>
          <div className="text-slate-400 pl-3">→ _________________________________________________________________</div>
        </div>
      );
    case 'error-find':
      return (
        <div className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
          <div className="font-bold">Câu {index} (Tìm lỗi sai): {renderCleanText(ex.sentence)}</div>
          <div className="grid grid-cols-4 gap-1 pl-3">
            {ex.parts.map((p, pi) => (
              <div key={pi}><strong>{String.fromCharCode(65 + pi)}.</strong> {p}</div>
            ))}
          </div>
        </div>
      );
    case 'transform':
      return (
        <div className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
          <div className="font-bold">Câu {index} (Viết lại câu): {ex.prompt}</div>
          <div className="pl-3">{ex.starter} ________________________________________________________</div>
        </div>
      );
    case 'true-false':
      return (
        <div className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
          {ex.passage && <div className="p-2 bg-slate-50 border border-slate-200 rounded">{ex.passage}</div>}
          <div className="font-bold">Câu {index} (True / False): {ex.statement} [  ] True  [  ] False</div>
        </div>
      );
    case 'matching':
      return (
        <div className="wb-avoid-break text-xs space-y-1 pb-2 border-b border-slate-100">
          <div className="font-bold">Câu {index} (Nối cặp):</div>
          <div className="grid grid-cols-2 gap-1 pl-3">
            {ex.pairs.map((p, pi) => (
              <div key={pi}>{pi + 1}. {p.left}  —  [   ] {p.right}</div>
            ))}
          </div>
        </div>
      );
  }
};

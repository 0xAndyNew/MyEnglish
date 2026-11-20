import type { SchoolGrade } from '../../../data/teen/types';
import { getExamMeta, type AudienceId, type ExamType, type LearnerProfile } from '../../../types/audience';
import type { Exercise, MatchingExercise, McqExercise, WordOrderExercise } from '../../../types/exercise';
import type { AppRoute } from '../useHashRoute';

export interface PassageContext {
  title: string;
  subtitle?: string;
  textEn?: string;
  textVi?: string;
  audioScript?: string;
}

export interface ExerciseSetItem {
  id: string;
  category: string;
  skillTag?: 'reading' | 'listening' | 'grammar';
  title: string;
  subtitle: string;
  badge: string;
  exercises: Exercise[];
  passage?: PassageContext;
  /** Optional navigation route instead of ExerciseRunner (e.g. games) */
  launchRoute?: AppRoute;
  launchLabel?: string;
}

export interface CategoryDef {
  id: string;
  label: string;
}

export function buildCategories(aud: AudienceId): CategoryDef[] {
  switch (aud) {
    case 'kids':
      return [
        { id: 'units', label: 'Chủ đề & Từ vựng' },
        { id: 'yle', label: 'Cambridge YLE' },
        { id: 'sentences', label: 'Ghép câu A1' },
        { id: 'games', label: 'Trò chơi' },
        { id: 'srs', label: 'Ôn từ (SRS)' },
      ];
    case 'teen':
      return [
        { id: 'units', label: 'Theo Unit SGK' },
        { id: 'reviews', label: 'Ôn định kỳ' },
        { id: 'skills', label: 'Nghe – Đọc & Ghép câu' },
        { id: 'grammar', label: 'Ngữ pháp' },
        { id: 'exams', label: 'Đề 10 / THPT' },
        { id: 'srs', label: 'Ôn từ (SRS)' },
      ];
    case 'university':
      return [
        { id: 'awl', label: 'Từ vựng AWL' },
        { id: 'abstracts', label: 'Đọc nghiên cứu' },
        { id: 'skills', label: 'Nghe – Đọc & Ghép câu' },
        { id: 'grad', label: 'Chuẩn đầu ra' },
        { id: 'grammar', label: 'Ngữ pháp' },
        { id: 'srs', label: 'Ôn từ (SRS)' },
      ];
    case 'worker':
      return [
        { id: 'industry', label: 'Theo 10 ngành' },
        { id: 'listenread', label: 'Nghe – Đọc công việc' },
        { id: 'sentence', label: 'Ghép câu' },
        { id: 'grammar', label: 'Ngữ pháp' },
        { id: 'srs', label: 'Ôn từ (SRS)' },
      ];
    case 'exam':
    default:
      return [
        { id: 'skills', label: 'Kỹ năng & Ngữ pháp' },
        { id: 'diagnostic', label: 'Chẩn đoán đầu vào' },
        { id: 'mocks', label: 'Thi thử bấm giờ' },
        { id: 'rubric', label: 'Chấm Rubric W&S' },
        { id: 'srs', label: 'Ôn từ (SRS)' },
      ];
  }
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

interface SimpleVocabSource {
  word: string;
  meaningVi: string;
  ipa?: string;
  example?: string;
}

function buildVocabDrillExercises(
  idPrefix: string,
  words: SimpleVocabSource[],
  poolForDistractors: SimpleVocabSource[]
): Exercise[] {
  const mcqs: McqExercise[] = words.map((w, idx) => {
    const distractors: string[] = [];
    for (let j = 1; j <= poolForDistractors.length && distractors.length < 3; j++) {
      const cand = poolForDistractors[(idx + j * 3) % poolForDistractors.length];
      if (cand.meaningVi !== w.meaningVi && !distractors.includes(cand.meaningVi)) {
        distractors.push(cand.meaningVi);
      }
    }
    while (distractors.length < 3) {
      distractors.push(`Nghĩa khác #${distractors.length + 1}`);
    }
    const rawOpts = [w.meaningVi, ...distractors];
    const shift = idx % rawOpts.length;
    const rotated = [...rawOpts.slice(shift), ...rawOpts.slice(0, shift)];
    return {
      id: `${idPrefix}-v-${idx}`,
      kind: 'mcq',
      skill: 'vocab',
      audioScript: w.word,
      question: `Từ "${w.word}"${w.ipa ? ` (${w.ipa})` : ''} có nghĩa là gì?`,
      options: rotated,
      correctIndex: rotated.indexOf(w.meaningVi),
      explanationVi: `"${w.word}" nghĩa là: ${w.meaningVi}.${w.example ? ` Ví dụ: ${w.example}` : ''}`,
    };
  });

  if (words.length >= 4) {
    const pairs = words.slice(0, 5).map((w) => ({
      left: w.word,
      right: w.meaningVi,
    }));
    const matchEx: MatchingExercise = {
      id: `${idPrefix}-match`,
      kind: 'matching',
      skill: 'vocab',
      promptVi: 'Nối từ tiếng Anh với nghĩa tiếng Việt tương ứng:',
      pairs,
      explanationVi: 'Ôn lại cặp từ – nghĩa giúp ghi nhớ lâu hơn.',
    };
    return [...mcqs, matchEx];
  }
  return mcqs;
}

function buildSentenceSets(
  items: { id: string; level: string; topic: string; vi: string; en: string; hint: string }[],
  opts: {
    idPrefix: string;
    category: string;
    skillTag?: 'reading' | 'listening' | 'grammar';
    maxPerSet?: number;
  }
): ExerciseSetItem[] {
  const maxPerSet = opts.maxPerSet ?? 15;
  const built: ExerciseSetItem[] = [];
  const topics = Array.from(new Set(items.map((s) => s.topic)));

  topics.forEach((topic, tIdx) => {
    const topicItems = items.filter((s) => s.topic === topic);
    const chunks = chunkArray(topicItems, maxPerSet);
    chunks.forEach((slice, cIdx) => {
      const partLabel = chunks.length > 1 ? ` (Phần ${cIdx + 1})` : '';
      built.push({
        id: `${opts.idPrefix}-${tIdx}-${cIdx}`,
        category: opts.category,
        skillTag: opts.skillTag,
        title: `Ghép câu: ${topic}${partLabel}`,
        subtitle: `Sắp xếp từ thành câu tiếng Anh hoàn chỉnh (${slice.length} câu)`,
        badge: `${slice[0]?.level || 'A2'} · Ghép câu`,
        exercises: slice.map<WordOrderExercise>((s) => ({
          id: s.id,
          kind: 'word-order',
          skill: 'writing',
          promptVi: s.vi,
          words: s.en.trim().split(/\s+/),
          answer: s.en.trim(),
          explanationVi: s.hint,
        })),
      });
    });
  });

  return built;
}

async function buildListeningComprehensionSets(
  opts: {
    idPrefix: string;
    category: string;
    skillTag?: 'reading' | 'listening' | 'grammar';
    levels?: Set<string>;
    perSet?: number;
  }
): Promise<ExerciseSetItem[]> {
  const { LISTENING_READING_LESSONS } = await import('../../../data/listeningReadingLessons');
  const filtered = opts.levels
    ? LISTENING_READING_LESSONS.filter((l) => opts.levels!.has(l.level))
    : LISTENING_READING_LESSONS;
  const perSet = opts.perSet ?? 10;
  const categories = Array.from(new Set(filtered.map((l) => l.category)));
  const built: ExerciseSetItem[] = [];

  categories.forEach((cat, cIdx) => {
    const catLessons = filtered.filter((l) => l.category === cat);
    const chunks = chunkArray(catLessons, perSet);
    chunks.forEach((slice, pIdx) => {
      const partSuffix = chunks.length > 1 ? ` · Phần ${pIdx + 1}` : '';
      built.push({
        id: `${opts.idPrefix}-lr-${cIdx}-${pIdx}`,
        category: opts.category,
        skillTag: opts.skillTag,
        title: `Nghe hiểu: ${cat}${partSuffix}`,
        subtitle: `Nghe hội thoại/bài đọc và trả lời ${slice.length} câu hỏi hiểu ý chính`,
        badge: `${slice[0]?.level || 'B1'} · Nghe`,
        exercises: slice.map<McqExercise>((l) => ({
          id: `ex-${l.id}`,
          kind: 'mcq',
          skill: 'listening',
          audioScript: l.transcript,
          question: `[${l.title.replace(/^Bài\s+\d+:\s*/i, '')}] ${l.question.q}`,
          options: l.question.options,
          correctIndex: l.question.correctIdx,
          explanationVi: `${l.translation} — Đáp án đúng: "${l.question.options[l.question.correctIdx]}".`,
        })),
      });
    });
  });

  return built;
}

export async function buildExerciseSetsForAudience(params: {
  aud: AudienceId;
  teenGrade: SchoolGrade;
  selectedExam: ExamType;
  profile: LearnerProfile;
}): Promise<{ sets: ExerciseSetItem[]; examMockCount: number }> {
  const { aud, teenGrade, selectedExam, profile } = params;
  const built: ExerciseSetItem[] = [];
  let examMockCount = 5;

  const { GRAMMAR_LESSONS, COMPREHENSIVE_GRAMMAR_EXAM } = await import(
    '../../../data/grammarData'
  );

  const grammarSets: ExerciseSetItem[] = [
    ...GRAMMAR_LESSONS.map((g, idx) => {
      const mcqs: McqExercise[] = g.quiz.map((q, qi) => ({
        id: `${g.id}-q-${qi}`,
        kind: 'mcq',
        skill: 'grammar',
        question: q.q,
        options: q.options,
        correctIndex: q.correct,
        explanationVi: q.explain,
      }));
      const drills: WordOrderExercise[] = (g.sentenceDrills || []).map((d, di) => {
        const words = d.en.trim().split(/\s+/);
        return {
          id: `${g.id}-d-${di}`,
          kind: 'word-order',
          skill: 'grammar',
          promptVi: d.vi,
          words,
          answer: d.en.trim(),
          explanationVi: `Câu chuẩn: "${d.en.trim()}"`,
        };
      });
      return {
        id: `grammar-${g.id}`,
        category: 'grammar',
        title: g.title,
        subtitle: g.purpose,
        badge: `Bài ${idx + 1} · ${g.level}`,
        exercises: [...mcqs, ...drills],
      };
    }),
    {
      id: 'grammar-comprehensive-exam',
      category: 'grammar',
      title: 'Kiểm tra tổng hợp Ngữ pháp (20 câu)',
      subtitle: 'Tổng ôn 12 thì, từ loại, câu điều kiện, mạo từ & từ nối',
      badge: 'Tổng hợp · A1–B1',
      exercises: COMPREHENSIVE_GRAMMAR_EXAM.map((q, qi) => ({
        id: `comp-gram-${qi}`,
        kind: 'mcq',
        skill: 'grammar',
        question: q.q,
        options: q.options,
        correctIndex: q.correct,
        explanationVi: q.explain,
      })),
    },
  ];

  if (aud === 'kids') {
    const [{ KIDS_UNITS }, { KIDS_YLE_EXTRA, KIDS_YLE_MOCK_TESTS }, baseCur, { SENTENCE_EXERCISES }] =
      await Promise.all([
        import('../../../data/kids/kidsCurriculumData'),
        import('../../../data/kids/kidsYleExtra'),
        import('../../../data/kids/kidsCurriculumData'),
        import('../../../data/sentenceExercisesData'),
      ]);
    const allYleQuestions = [...baseCur.KIDS_YLE_CHALLENGES, ...KIDS_YLE_EXTRA];
    const globalKidsWords = KIDS_UNITS.flatMap((u) =>
      u.words.map((w) => ({ word: w.word, meaningVi: w.meaningVi, ipa: w.ipa, example: w.sampleSentence }))
    );

    KIDS_UNITS.forEach((u, idx) => {
      if (u.exercises && u.exercises.length > 0) {
        built.push({
          id: `kids-unit-${u.id}`,
          category: 'units',
          title: `${u.emoji} Chủ đề ${idx + 1}: ${u.titleVi}`,
          subtitle: `${u.title} · Chọn từ, điền chữ, ghép câu, đúng/sai`,
          badge: `Chủ đề ${idx + 1}`,
          exercises: u.exercises,
        });
      }
      if (u.words.length > 0) {
        built.push({
          id: `kids-vocab-${u.id}`,
          category: 'units',
          title: `${u.emoji} Ôn Từ Vựng ${idx + 1}: ${u.titleVi}`,
          subtitle: `Nghe phát âm, chọn nghĩa & nối ${u.words.length} từ vựng chủ đề`,
          badge: `Từ vựng ${idx + 1}`,
          exercises: buildVocabDrillExercises(
            `kv-${u.id}`,
            u.words.map((w) => ({
              word: w.word,
              meaningVi: w.meaningVi,
              ipa: w.ipa,
              example: w.sampleSentence,
            })),
            globalKidsWords
          ),
        });
      }
    });

    KIDS_YLE_MOCK_TESTS.forEach((m) => {
      built.push({
        id: `kids-yle-mock-${m.id}`,
        category: 'yle',
        title: m.title,
        subtitle: `Đề luyện tập Cambridge ${m.level.toUpperCase()} · ${m.durationMinutes} phút`,
        badge: m.level.toUpperCase(),
        exercises: m.questions.map((q) => ({
          id: q.id,
          kind: 'mcq',
          skill: q.type === 'listen-pick' ? 'listening' : 'reading',
          audioScript: q.type === 'listen-pick' ? q.spokenText : undefined,
          question: `${q.emojiHint ? `${q.emojiHint} ` : ''}${q.prompt}`,
          options: q.options,
          correctIndex: q.correctIndex,
          explanationVi: q.funExplain,
        })),
      });
    });

    (['starters', 'movers', 'flyers'] as const).forEach((lv) => {
      const qs = allYleQuestions.filter((q) => q.level === lv);
      const chunks = chunkArray(qs, 15);
      chunks.forEach((slice, pIdx) => {
        built.push({
          id: `kids-yle-bank-${lv}-${pIdx}`,
          category: 'yle',
          title: `Luyện ${lv.toUpperCase()} — Phần ${pIdx + 1}`,
          subtitle: `Nghe chọn hình, điền câu & từ vựng (${slice.length} câu)`,
          badge: lv.toUpperCase(),
          exercises: slice.map((q) => ({
            id: q.id,
            kind: 'mcq',
            skill: q.type === 'listen-pick' ? 'listening' : 'reading',
            audioScript: q.type === 'listen-pick' ? q.spokenText : undefined,
            question: `${q.emojiHint ? `${q.emojiHint} ` : ''}${q.prompt}`,
            options: q.options,
            correctIndex: q.correctIndex,
            explanationVi: q.funExplain,
          })),
        });
      });
    });

    const a1Sentences = SENTENCE_EXERCISES.filter((s) => s.level === 'A1');
    built.push(
      ...buildSentenceSets(a1Sentences, {
        idPrefix: 'kids-sent',
        category: 'sentences',
        maxPerSet: 12,
      })
    );

    built.push({
      id: 'kids-games-launch',
      category: 'games',
      title: '🎮 Trò chơi Ghép Tranh & Nghe Chọn Hình',
      subtitle: 'Học mà chơi với 24 chủ đề sinh động',
      badge: 'Trò chơi',
      exercises: [],
      launchRoute: { tab: 'learn', stepCode: 'K5' },
      launchLabel: 'Mở phòng Trò chơi',
    });
  } else if (aud === 'teen') {
    const [{ getUnitsByGrade, getReviewsByGrade, SCHOOL_EXAM_SETS }, { SENTENCE_EXERCISES }] =
      await Promise.all([
        import('../../../data/teen/schoolCurriculumData'),
        import('../../../data/sentenceExercisesData'),
      ]);

    const gradeUnits = getUnitsByGrade(teenGrade);
    const gradeVocabPool = gradeUnits.flatMap((u) =>
      u.vocabulary.map((v) => ({ word: v.word, meaningVi: v.meaningVi, ipa: v.ipa, example: v.exampleEn }))
    );

    gradeUnits.forEach((u) => {
      const quizAsExercises: McqExercise[] = u.practiceQuiz.map((q) => ({
        id: q.id,
        kind: 'mcq',
        skill: 'grammar',
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanationVi: q.explanationVi,
      }));
      const combined = [...(u.exercises || []), ...quizAsExercises];
      built.push({
        id: `teen-unit-${u.id}`,
        category: 'units',
        title: `Unit ${u.unitNumber}: ${u.titleVi}`,
        subtitle: `${u.title} · Từ vựng, ngữ pháp & bài tập tổng hợp`,
        badge: `Lớp ${u.grade} · ${u.level}`,
        exercises: combined,
      });

      if (u.vocabulary.length > 0) {
        built.push({
          id: `teen-vocab-${u.id}`,
          category: 'units',
          title: `Từ vựng Unit ${u.unitNumber}: ${u.titleVi}`,
          subtitle: `Kiểm tra nhanh ${u.vocabulary.length} từ vựng trọng tâm Unit ${u.unitNumber}`,
          badge: `Từ vựng · Lớp ${u.grade}`,
          exercises: buildVocabDrillExercises(
            `tv-${u.id}`,
            u.vocabulary.map((v) => ({
              word: v.word,
              meaningVi: v.meaningVi,
              ipa: v.ipa,
              example: v.exampleEn,
            })),
            gradeVocabPool
          ),
        });
      }
    });

    getReviewsByGrade(teenGrade).forEach((rev) => {
      built.push({
        id: `teen-review-${rev.id}`,
        category: 'reviews',
        title: `${rev.title} (Lớp ${rev.grade})`,
        subtitle: `Tổng hợp kiến thức ${rev.unitRange}`,
        badge: rev.unitRange,
        exercises: rev.exercises,
      });
    });

    const teenListeningSets = await buildListeningComprehensionSets({
      idPrefix: 'teen-skill',
      category: 'skills',
      perSet: 10,
    });
    const teenSentenceSets = buildSentenceSets(SENTENCE_EXERCISES, {
      idPrefix: 'teen-sent',
      category: 'skills',
      maxPerSet: 15,
    });
    built.push(...teenListeningSets, ...teenSentenceSets);

    built.push(...grammarSets);

    const examIds =
      teenGrade <= 9 ? (['entrance10', 'thpt'] as const) : (['thpt', 'entrance10'] as const);
    examIds.forEach((eid) => {
      const list = SCHOOL_EXAM_SETS[eid] || [];
      list.forEach((ex, i) => {
        built.push({
          id: `teen-exam-${eid}-${i}`,
          category: 'exams',
          title: ex.title,
          subtitle: `${ex.subtitle} · ${ex.durationMinutes} phút`,
          badge: eid === 'entrance10' ? 'Vào 10' : 'THPT',
          exercises: ex.questions.map((q) => ({
            id: q.id,
            kind: 'mcq',
            question: `${q.passage ? `[Đoạn văn]\n${q.passage}\n\n` : ''}${q.question}`,
            options: q.options,
            correctIndex: q.correctIndex,
            explanationVi: q.explanationVi,
          })),
        });
      });
    });
  } else if (aud === 'university') {
    const [
      { AWL_DOMAINS, AWL_WORDS, AWL_DRILLS, ACADEMIC_ABSTRACTS, GRADUATION_QUICK_QUIZ },
      { SENTENCE_EXERCISES },
    ] = await Promise.all([
      import('../../../data/university/academicCurriculumData'),
      import('../../../data/sentenceExercisesData'),
    ]);

    for (let i = 0; i < AWL_DRILLS.length; i += 10) {
      const slice = AWL_DRILLS.slice(i, i + 10);
      const part = Math.floor(i / 10) + 1;
      built.push({
        id: `uni-awl-drill-${part}`,
        category: 'awl',
        title: `Bài tập AWL tổng hợp — Phần ${part}`,
        subtitle: 'Điền từ học thuật, chọn nghĩa & hoàn thành câu',
        badge: `Phần ${part}`,
        exercises: slice,
      });
    }

    AWL_DOMAINS.forEach((domain, dIdx) => {
      const domainWords = AWL_WORDS.filter((w) => w.domain === domain);
      const wordChunks = chunkArray(domainWords, 15);
      wordChunks.forEach((chunk, pIdx) => {
        const qs: McqExercise[] = chunk.map((w, wi) => {
          const distractors = domainWords
            .filter((other) => other.id !== w.id)
            .slice(wi % Math.max(1, domainWords.length - 4), (wi % Math.max(1, domainWords.length - 4)) + 3);
          const rawOpts = [w, ...distractors];
          const shift = wi % rawOpts.length;
          const rotated = [...rawOpts.slice(shift), ...rawOpts.slice(0, shift)];
          const correctIndex = rotated.findIndex((x) => x.id === w.id);
          return {
            id: `awl-q-${w.id}`,
            kind: 'mcq',
            skill: 'vocab',
            audioScript: w.word,
            question: `Từ học thuật "${w.word}" (${w.pos}, ${w.ipa}) có nghĩa phù hợp nhất là gì?`,
            options: rotated.map((o) => o.meaningVi),
            correctIndex,
            explanationVi: `"${w.word}" nghĩa là: ${w.meaningVi}. Ví dụ: ${w.academicExampleEn}`,
          };
        });
        if (qs.length > 0) {
          built.push({
            id: `uni-awl-domain-${dIdx}-${pIdx}`,
            category: 'awl',
            title: `Từ vựng ${domain} — Phần ${pIdx + 1}`,
            subtitle: `Chọn nghĩa chuẩn cho ${qs.length} từ AWL chuyên ngành`,
            badge: `AWL ${dIdx + 1}.${pIdx + 1}`,
            exercises: qs,
          });
        }
      });
    });

    ACADEMIC_ABSTRACTS.forEach((abs, idx) => {
      built.push({
        id: `uni-abs-${abs.id}`,
        category: 'abstracts',
        title: `${idx + 1}. ${abs.title}`,
        subtitle: `${abs.domain} · ${abs.publicationContext}`,
        badge: abs.level,
        passage: {
          title: abs.title,
          subtitle: abs.publicationContext,
          textEn: abs.abstractEn,
          textVi: abs.translationVi,
        },
        exercises: abs.questions.map((q) => ({
          id: q.id,
          kind: 'mcq',
          skill: 'reading',
          question: `${q.questionEn}\n(${q.questionVi})`,
          options: q.options,
          correctIndex: q.correctIndex,
          explanationVi: q.explanationVi,
        })),
      });
    });

    const uniListeningSets = await buildListeningComprehensionSets({
      idPrefix: 'uni-skill',
      category: 'skills',
      levels: new Set(['B1', 'B2', 'C1']),
      perSet: 10,
    });
    const uniSentenceSets = buildSentenceSets(
      SENTENCE_EXERCISES.filter((s) => s.level === 'B1' || s.level === 'B2'),
      { idPrefix: 'uni-sent', category: 'skills', maxPerSet: 15 }
    );
    built.push(...uniListeningSets, ...uniSentenceSets);

    const gradCats = Array.from(new Set(GRADUATION_QUICK_QUIZ.map((q) => q.category)));
    gradCats.forEach((cat, idx) => {
      const qs = GRADUATION_QUICK_QUIZ.filter((q) => q.category === cat);
      built.push({
        id: `uni-grad-${idx}`,
        category: 'grad',
        title: cat,
        subtitle: `Trắc nghiệm kiến thức chuẩn đầu ra (${qs.length} câu)`,
        badge: `Phần ${idx + 1}`,
        exercises: qs.map((q) => ({
          id: q.id,
          kind: 'mcq',
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanationVi: q.explanationVi,
        })),
      });
    });

    built.push(...grammarSets);
  } else if (aud === 'worker') {
    const [{ WORKPLACE_VOCAB_DRILLS }, { PRACTICAL_CATEGORIES }, { SENTENCE_EXERCISES }] =
      await Promise.all([
        import('../../../data/worker/workplaceDrills'),
        import('../../../data/practicalCategories'),
        import('../../../data/sentenceExercisesData'),
      ]);

    const myIndustries = new Set(profile.worker?.industries || []);
    const orderedCategories = [
      ...PRACTICAL_CATEGORIES.filter((c) => myIndustries.has(c)),
      ...PRACTICAL_CATEGORIES.filter((c) => !myIndustries.has(c)),
    ];

    orderedCategories.forEach((cat) => {
      const drills = WORKPLACE_VOCAB_DRILLS.filter((d) => d.industry === cat);
      const chunks = chunkArray(drills, 15);
      chunks.forEach((slice, pIdx) => {
        built.push({
          id: `worker-ind-${cat}-${pIdx}`,
          category: 'industry',
          title: chunks.length > 1 ? `${cat} — Phần ${pIdx + 1}` : cat,
          subtitle: `${
            myIndustries.has(cat) ? '⭐ Ngành bạn đã chọn · ' : ''
          }Bài tập từ vựng & tình huống công sở (${slice.length} câu)`,
          badge: myIndustries.has(cat) ? 'Ngành của bạn' : 'Công sở',
          exercises: slice,
        });
      });
    });

    const workerListenSets = await buildListeningComprehensionSets({
      idPrefix: 'worker-lr',
      category: 'listenread',
      perSet: 10,
    });
    built.push(...workerListenSets);

    built.push(
      ...buildSentenceSets(SENTENCE_EXERCISES, {
        idPrefix: 'worker-sent',
        category: 'sentence',
        maxPerSet: 15,
      })
    );

    built.push(...grammarSets);
  } else {
    // Exam Prep
    const [
      { EXAM_PREP_DATA },
      { getExpandedReadingLessons, getExpandedListeningLessons },
      { SENTENCE_EXERCISES },
    ] = await Promise.all([
      import('../../../data/exam/examPrepData'),
      import('../../../data/exam/examSkillLessons'),
      import('../../../data/sentenceExercisesData'),
    ]);

    const examData = EXAM_PREP_DATA[selectedExam] || EXAM_PREP_DATA.ielts;
    const shortExam = getExamMeta(selectedExam).shortLabel;
    examMockCount =
      examData.mockTests && examData.mockTests.length > 0 ? examData.mockTests.length : 1;

    if (examData.diagnosticQuestions.length > 0) {
      built.push({
        id: `exam-${selectedExam}-diag`,
        category: 'diagnostic',
        title: `Test Chẩn đoán đầu vào ${shortExam} (${examData.diagnosticQuestions.length} câu)`,
        subtitle: 'Đo band/CEFR hiện tại & tìm kỹ năng yếu cần ưu tiên học',
        badge: `Chẩn đoán · ${shortExam}`,
        exercises: examData.diagnosticQuestions.map((q) => ({
          id: q.id,
          kind: 'mcq',
          skill: q.skill,
          audioScript: q.audioScript,
          passage: q.passage,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIdx,
          explanationVi: q.explanation,
        })),
      });
    }

    const allReading = getExpandedReadingLessons(selectedExam, examData.skillPractice.reading);
    allReading.forEach((r, idx) => {
      built.push({
        id: `exam-${selectedExam}-read-${r.id}`,
        category: 'skills',
        skillTag: 'reading',
        title: `Reading ${idx + 1}: ${r.title}`,
        subtitle: `${r.partLabel} · Trình độ ${r.level}`,
        badge: `Reading · ${r.level}`,
        passage: {
          title: r.title,
          subtitle: r.partLabel,
          textEn: r.passage,
          textVi: r.viSummary,
        },
        exercises: r.questions.map((q) => ({
          id: q.id,
          kind: 'mcq',
          skill: 'reading',
          question: q.question,
          options: q.options,
          correctIndex: q.correctIdx,
          explanationVi: q.explanation,
        })),
      });
    });

    const allListening = getExpandedListeningLessons(
      selectedExam,
      examData.skillPractice.listening
    );
    allListening.forEach((l, idx) => {
      built.push({
        id: `exam-${selectedExam}-listen-${l.id}`,
        category: 'skills',
        skillTag: 'listening',
        title: `Listening ${idx + 1}: ${l.title}`,
        subtitle: `${l.partLabel} · ${l.speakerContext}`,
        badge: `Listening · ${l.level}`,
        passage: {
          title: l.title,
          subtitle: l.speakerContext,
          audioScript: l.audioScript,
          textVi: l.viSummary,
        },
        exercises: l.questions.map((q) => ({
          id: q.id,
          kind: 'mcq',
          skill: 'listening',
          question: q.question,
          options: q.options,
          correctIndex: q.correctIdx,
          explanationVi: q.explanation,
        })),
      });
    });

    grammarSets.forEach((gs) => {
      built.push({
        ...gs,
        category: 'skills',
        skillTag: 'grammar',
      });
    });

    built.push(
      ...buildSentenceSets(
        SENTENCE_EXERCISES.filter((s) => s.level === 'B1' || s.level === 'B2'),
        {
          idPrefix: `exam-${selectedExam}-sent`,
          category: 'skills',
          skillTag: 'grammar',
          maxPerSet: 15,
        }
      )
    );
  }

  return { sets: built, examMockCount };
}

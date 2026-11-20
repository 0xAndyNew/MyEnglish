import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Filter,
  Lightbulb,
  Mail,
  MessageSquare,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Turtle,
  Volume2,
  X,
  XCircle,
} from 'lucide-react';
import { PRACTICAL_CATEGORIES, PracticalCategory } from '../../data/practicalCategories';
import {
  MEETING_SUBTYPES,
  MeetingPhraseSubType,
  WORKPLACE_CASE_SITUATIONS,
  WORKPLACE_EMAIL_TEMPLATES,
  WORKPLACE_MEETING_PHRASES,
  WORKPLACE_STAR_QUESTIONS,
  WORKPLACE_VOCAB_DRILLS,
} from '../../data/worker/workplaceScenariosData';
import { ExerciseRunner } from '../practice/ExerciseRunner';
import { PaginationBar, usePagination } from '../common/PaginationBar';
import { LearnerProfile } from '../../types/audience';
import { AccentMode, CefrLevel } from '../../types/learning';
import { speakText } from '../../utils/speechEngine';

export type WorkplaceHubTab = 'meetings' | 'email' | 'star' | 'cases' | 'drills';

export interface WorkplaceCareerHubProps {
  accent: AccentMode;
  profile?: LearnerProfile | null;
  onAddXp: (amount: number) => void;
  allowAllOptions?: boolean;
  hideHeaderNav?: boolean;
  initialTab?: WorkplaceHubTab;
}

type HubTab = WorkplaceHubTab;

const GOAL_LABEL_MAP: Record<string, string> = {
  work: 'Giao tiếp công việc hàng ngày',
  email: 'Viết Email & Tin nhắn chuyên nghiệp',
  interview: 'Chinh phục Phỏng vấn STAR',
  travel: 'Công tác & Giao tiếp quốc tế',
};

function getInitialTabFromProfile(profile?: LearnerProfile | null): HubTab {
  const goal = profile?.worker?.goal;
  if (goal === 'email') return 'email';
  if (goal === 'interview') return 'star';
  return 'meetings';
}

export const WorkplaceCareerHub: React.FC<WorkplaceCareerHubProps> = ({
  accent,
  profile,
  onAddXp,
  allowAllOptions = false,
  hideHeaderNav = false,
  initialTab,
}) => {
  const userIndustries = useMemo(
    () => profile?.worker?.industries ?? [],
    [profile]
  );
  const userIndustrySet = useMemo(() => new Set(userIndustries), [userIndustries]);
  const restrictToMyIndustries = !allowAllOptions && userIndustries.length > 0;

  const [activeTab, setActiveTab] = useState<HubTab>(
    () => initialTab ?? getInitialTabFromProfile(profile)
  );

  // Sync activeTab when initialTab or profile.worker.goal changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    } else {
      setActiveTab(getInitialTabFromProfile(profile));
    }
  }, [initialTab, profile?.worker?.goal]);

  const [industryFilter, setIndustryFilter] = useState<'ALL' | 'MY_INDUSTRIES' | PracticalCategory>(() =>
    restrictToMyIndustries ? 'MY_INDUSTRIES' : 'ALL'
  );
  useEffect(() => {
    if (restrictToMyIndustries) {
      setIndustryFilter('MY_INDUSTRIES');
    }
  }, [restrictToMyIndustries]);

  const [levelFilter, setLevelFilter] = useState<'ALL' | CefrLevel>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileListOpen, setMobileListOpen] = useState(false);

  // Tab 1: Meetings & Negotiation
  const [meetingSubFilter, setMeetingSubFilter] = useState<'ALL' | MeetingPhraseSubType>('ALL');
  const [selectedMeetingId, setSelectedMeetingId] = useState<string>(
    WORKPLACE_MEETING_PHRASES[0]?.id || ''
  );

  // Tab 2: Email & Chat
  const [channelFilter, setChannelFilter] = useState<'ALL' | 'Email' | 'Slack / Teams'>('ALL');
  const [selectedEmailId, setSelectedEmailId] = useState<string>(
    WORKPLACE_EMAIL_TEMPLATES[0]?.id || ''
  );
  const [customDraft, setCustomDraft] = useState<string>(
    WORKPLACE_EMAIL_TEMPLATES[0]?.enBody || ''
  );

  // Tab 3: STAR Interview
  const [selectedStarId, setSelectedStarId] = useState<string>(
    WORKPLACE_STAR_QUESTIONS[0]?.id || ''
  );
  const [showStarOutline, setShowStarOutline] = useState(true);
  const [showStarSample, setShowStarSample] = useState(true);
  const [starNotes, setStarNotes] = useState<Record<string, string>>({});

  // Tab 4: Workplace Case Situations
  const [selectedCaseId, setSelectedCaseId] = useState<string>(
    WORKPLACE_CASE_SITUATIONS[0]?.id || ''
  );
  const [selectedCaseOptions, setSelectedCaseOptions] = useState<Record<string, string>>({});

  // Progress / XP tracking (award once per item)
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const myOrderedIndustries = useMemo(
    () => PRACTICAL_CATEGORIES.filter((cat) => userIndustrySet.has(cat)),
    [userIndustrySet]
  );

  const otherOrderedIndustries = useMemo(
    () => PRACTICAL_CATEGORIES.filter((cat) => !userIndustrySet.has(cat)),
    [userIndustrySet]
  );

  const markCompletedWithXp = (itemId: string, xp: number) => {
    setCompletedIds((prev) => {
      if (prev.includes(itemId)) return prev;
      onAddXp(xp);
      return [...prev, itemId];
    });
  };

  const handleCopyText = async (id: string, text: string) => {
    try {
      await navigator.clipboard?.writeText(text);
    } catch {
      // ignore clipboard permissions error
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((cur) => (cur === id ? null : cur));
    }, 1800);
  };

  const sortAndFilterByIndustry = <T extends { industry: PracticalCategory; level: CefrLevel }>(
    items: T[],
    matchesSearch: (item: T, q: string) => boolean
  ): T[] => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = items.filter((item) => {
      const okIndustry =
        industryFilter === 'ALL'
          ? true
          : industryFilter === 'MY_INDUSTRIES'
          ? userIndustrySet.has(item.industry)
          : item.industry === industryFilter;
      const okLevel = levelFilter === 'ALL' || item.level === levelFilter;
      const okQuery = !q || matchesSearch(item, q);
      return okIndustry && okLevel && okQuery;
    });

    if (userIndustrySet.size === 0) return filtered;
    return [...filtered].sort((a, b) => {
      const aScore = userIndustrySet.has(a.industry) ? 1 : 0;
      const bScore = userIndustrySet.has(b.industry) ? 1 : 0;
      return bScore - aScore;
    });
  };

  const filteredMeetings = useMemo(() => {
    const base = sortAndFilterByIndustry(WORKPLACE_MEETING_PHRASES, (it, q) =>
      `${it.en} ${it.vi} ${it.context} ${it.subType} ${it.industry}`.toLowerCase().includes(q)
    );
    return meetingSubFilter === 'ALL'
      ? base
      : base.filter((it) => it.subType === meetingSubFilter);
  }, [industryFilter, levelFilter, searchQuery, meetingSubFilter, userIndustrySet]);

  const filteredEmails = useMemo(() => {
    const base = sortAndFilterByIndustry(WORKPLACE_EMAIL_TEMPLATES, (it, q) =>
      `${it.title} ${it.purpose} ${it.enBody} ${it.viSummary} ${it.industry}`.toLowerCase().includes(q)
    );
    return channelFilter === 'ALL'
      ? base
      : base.filter((it) => it.channel === channelFilter);
  }, [industryFilter, levelFilter, searchQuery, channelFilter, userIndustrySet]);

  const filteredStars = useMemo(
    () =>
      sortAndFilterByIndustry(WORKPLACE_STAR_QUESTIONS, (it, q) =>
        `${it.questionEn} ${it.questionVi} ${it.focusSkill} ${it.sampleAnswerEn} ${it.industry}`
          .toLowerCase()
          .includes(q)
      ),
    [industryFilter, levelFilter, searchQuery, userIndustrySet]
  );

  const filteredCases = useMemo(
    () =>
      sortAndFilterByIndustry(WORKPLACE_CASE_SITUATIONS, (it, q) =>
        `${it.title} ${it.scenarioVi} ${it.promptEn} ${it.industry}`.toLowerCase().includes(q)
      ),
    [industryFilter, levelFilter, searchQuery, userIndustrySet]
  );

  // Active item & index for Tab 1: Meetings
  const activeMeeting = useMemo(
    () =>
      filteredMeetings.find((m) => m.id === selectedMeetingId) ||
      filteredMeetings[0] ||
      null,
    [filteredMeetings, selectedMeetingId]
  );
  const activeMeetingIdx = useMemo(
    () => (activeMeeting ? filteredMeetings.findIndex((m) => m.id === activeMeeting.id) : -1),
    [filteredMeetings, activeMeeting]
  );

  // Active item & index for Tab 2: Email & Chat
  const activeEmail = useMemo(
    () =>
      filteredEmails.find((e) => e.id === selectedEmailId) ||
      filteredEmails[0] ||
      null,
    [filteredEmails, selectedEmailId]
  );
  const activeEmailIdx = useMemo(
    () => (activeEmail ? filteredEmails.findIndex((e) => e.id === activeEmail.id) : -1),
    [filteredEmails, activeEmail]
  );

  useEffect(() => {
    if (activeEmail) {
      setCustomDraft(activeEmail.enBody);
    }
  }, [activeEmail?.id]);

  // Active item & index for Tab 3: STAR Interview
  const activeStar = useMemo(
    () =>
      filteredStars.find((s) => s.id === selectedStarId) ||
      filteredStars[0] ||
      null,
    [filteredStars, selectedStarId]
  );
  const activeStarIdx = useMemo(
    () => (activeStar ? filteredStars.findIndex((s) => s.id === activeStar.id) : -1),
    [filteredStars, activeStar]
  );

  // Active item & index for Tab 4: Cases
  const activeCase = useMemo(
    () =>
      filteredCases.find((c) => c.id === selectedCaseId) ||
      filteredCases[0] ||
      null,
    [filteredCases, selectedCaseId]
  );
  const activeCaseIdx = useMemo(
    () => (activeCase ? filteredCases.findIndex((c) => c.id === activeCase.id) : -1),
    [filteredCases, activeCase]
  );

  const sharedFilterKey = `${industryFilter}:${levelFilter}:${searchQuery}`;
  const meetingPagination = usePagination(filteredMeetings, 8, {
    resetKey: `${sharedFilterKey}:${meetingSubFilter}`,
    activeIndex: activeMeetingIdx >= 0 ? activeMeetingIdx : undefined,
  });
  const emailPagination = usePagination(filteredEmails, 8, {
    resetKey: `${sharedFilterKey}:${channelFilter}`,
    activeIndex: activeEmailIdx >= 0 ? activeEmailIdx : undefined,
  });
  const starPagination = usePagination(filteredStars, 8, {
    resetKey: sharedFilterKey,
    activeIndex: activeStarIdx >= 0 ? activeStarIdx : undefined,
  });
  const casePagination = usePagination(filteredCases, 8, {
    resetKey: sharedFilterKey,
    activeIndex: activeCaseIdx >= 0 ? activeCaseIdx : undefined,
  });

  const filteredDrills = useMemo(() => {
    if (industryFilter === 'ALL') return WORKPLACE_VOCAB_DRILLS;
    if (industryFilter === 'MY_INDUSTRIES') {
      const myInds = profile?.worker?.industries || [];
      return myInds.length > 0
        ? WORKPLACE_VOCAB_DRILLS.filter((d) => myInds.includes(d.industry))
        : WORKPLACE_VOCAB_DRILLS;
    }
    return WORKPLACE_VOCAB_DRILLS.filter((d) => d.industry === industryFilter);
  }, [industryFilter, profile?.worker?.industries]);

  const totalItemsCount =
    WORKPLACE_MEETING_PHRASES.length +
    WORKPLACE_EMAIL_TEMPLATES.length +
    WORKPLACE_STAR_QUESTIONS.length +
    WORKPLACE_CASE_SITUATIONS.length;

  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    {
      id: 'meetings' as const,
      label: '1. Họp & Đàm phán',
      count: filteredMeetings.length,
      icon: MessageSquare,
    },
    {
      id: 'email' as const,
      label: '2. Email & Chat',
      count: filteredEmails.length,
      icon: Mail,
    },
    {
      id: 'star' as const,
      label: '3. Phỏng vấn STAR',
      count: filteredStars.length,
      icon: Star,
    },
    {
      id: 'cases' as const,
      label: '4. Xử lý Tình huống',
      count: filteredCases.length,
      icon: ShieldCheck,
    },
    ...(!hideHeaderNav || initialTab === 'drills'
      ? [
          {
            id: 'drills' as const,
            label: '5. Drill Từ Vựng Ngành',
            count: filteredDrills.length,
            icon: Award,
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-4">
      {/* Standalone Hero Banner (hidden when mounted from sidebar roadmap with hideHeaderNav) */}
      {!hideHeaderNav && (
        <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 rounded-2xl p-5 sm:p-6 text-white shadow-lg">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-xs font-bold uppercase tracking-wide">
                <Briefcase className="w-3.5 h-3.5" /> Phân Hệ Người Đi Làm & Công Sở (10 Ngành Nghề)
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Workplace Career Hub — Tiếng Anh Thực Chiến Công Sở
              </h2>
              <p className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed">
                Làm chủ mẫu câu họp hành & đàm phán, viết Email/Slack chuẩn quốc tế, trả lời phỏng vấn STAR và xử lý tình huống nhạy bén theo ngành nghề của bạn.
              </p>
              {profile?.worker && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-white/15 font-semibold">
                    🎯 Mục tiêu: {GOAL_LABEL_MAP[profile.worker.goal] || 'Giao tiếp công việc'}
                  </span>
                  {userIndustries.length > 0 && (
                    <span className="px-2.5 py-1 rounded-lg bg-amber-400/20 border border-amber-200/40 font-bold text-amber-100">
                      ⭐ Đang ưu tiên: {userIndustries.join(' • ')}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-extrabold flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-300" />
                <span>
                  Đã luyện: {completedIds.length}/{totalItemsCount} tình huống
                </span>
              </div>
              <span className="text-[11px] text-emerald-100">
                Giọng đọc hiện tại: {accent === 'en-US' ? '🇺🇸 Anh - Mỹ' : '🇬🇧 Anh - Anh'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Clean Horizontal Tabs + Collapsible Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-3 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[42px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shrink-0 transition border ${
                    active
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-xs font-black ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className={`min-h-[42px] px-3 py-2 rounded-xl border text-xs font-extrabold inline-flex items-center gap-1.5 shrink-0 transition ${
              showFilters || industryFilter !== 'ALL' || levelFilter !== 'ALL' || searchQuery
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
            }`}
            title="Lọc theo ngành, cấp độ hoặc tìm kiếm"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Lọc</span>
          </button>
        </div>

        {/* Filter Bar (collapsible on mobile so content appears immediately) */}
        {(!hideHeaderNav || showFilters) && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Industry Select with optgroup (Learner's industries listed first) */}
          <div className="md:col-span-5 flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <label htmlFor="worker-industry-select" className="text-[11px] font-bold text-slate-500 shrink-0">
              Ngành:
            </label>
            <select
              id="worker-industry-select"
              value={industryFilter}
              onChange={(e) =>
                setIndustryFilter(e.target.value as 'ALL' | 'MY_INDUSTRIES' | PracticalCategory)
              }
              className="w-full bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 outline-none truncate cursor-pointer"
            >
              {!restrictToMyIndustries && (
                <option value="ALL" className="bg-white dark:bg-slate-900">
                  Tất cả ngành (Ưu tiên ngành của bạn)
                </option>
              )}
              {userIndustries.length > 0 && (
                <option value="MY_INDUSTRIES" className="bg-white dark:bg-slate-900">
                  ⭐ Ngành của bạn ({userIndustries.length} ngành đã chọn)
                </option>
              )}
              {myOrderedIndustries.length > 0 && (
                <optgroup label="⭐ Ngành nghề của bạn" className="bg-white dark:bg-slate-900">
                  {myOrderedIndustries.map((cat) => (
                    <option key={cat} value={cat} className="bg-white dark:bg-slate-900">
                      ⭐ {cat}
                    </option>
                  ))}
                </optgroup>
              )}
              {!restrictToMyIndustries && otherOrderedIndustries.length > 0 && (
                <optgroup
                  label={
                    myOrderedIndustries.length > 0
                      ? 'Các ngành nghề khác'
                      : 'Danh mục 10 ngành nghề'
                  }
                  className="bg-white dark:bg-slate-900"
                >
                  {otherOrderedIndustries.map((cat) => (
                    <option key={cat} value={cat} className="bg-white dark:bg-slate-900">
                      {cat}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* Search Input */}
          <div className="md:col-span-5 relative flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mẫu câu, email, câu hỏi phỏng vấn..."
              className="w-full pl-8 pr-7 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-500 outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                title="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Level Select */}
          <div className="md:col-span-2 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5">
            <label htmlFor="worker-level-select" className="text-[11px] font-bold text-slate-500 shrink-0">
              Cấp độ:
            </label>
            <select
              id="worker-level-select"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value as 'ALL' | CefrLevel)}
              className="w-full bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer"
            >
              <option value="ALL" className="bg-white dark:bg-slate-900">
                Tất cả
              </option>
              <option value="A2" className="bg-white dark:bg-slate-900">
                A2
              </option>
              <option value="B1" className="bg-white dark:bg-slate-900">
                B1
              </option>
              <option value="B2" className="bg-white dark:bg-slate-900">
                B2
              </option>
            </select>
          </div>
        </div>
        )}
      </div>

      {/* TAB 1: 1. HỌP & ĐÀM PHÁN (2-Column Master-Detail) */}
      {activeTab === 'meetings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Master List (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 h-fit">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase text-slate-500">
                Danh sách mẫu câu ({filteredMeetings.length})
              </span>
              <button
                type="button"
                onClick={() => setMobileListOpen((v) => !v)}
                className="lg:hidden inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"
              >
                <span>{mobileListOpen ? 'Thu gọn' : 'Mở danh sách'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${mobileListOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {/* Meeting subtype filter */}
            <div className="flex flex-wrap gap-1">
              {(['ALL', ...MEETING_SUBTYPES] as const).map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setMeetingSubFilter(sub)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                    meetingSubFilter === sub
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {sub === 'ALL' ? 'Tất cả ngữ cảnh' : sub}
                </button>
              ))}
            </div>

            <div
              className={`${
                mobileListOpen ? 'block' : 'hidden lg:block'
              } space-y-2.5`}
            >
              <div className="space-y-2">
              {meetingPagination.pageItems.map((item, localIdx) => {
                const idx = meetingPagination.startIdx + localIdx;
                const active = activeMeeting?.id === item.id;
                const isMine = userIndustrySet.has(item.industry);
                const done = completedIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedMeetingId(item.id);
                      setMobileListOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition space-y-1 ${
                      active
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
                        #{idx + 1} • {item.subType}
                      </span>
                      {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                      "{item.en}"
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                      <span>
                        {item.level} • {item.industry}
                      </span>
                      {isMine && (
                        <span className="text-amber-700 dark:text-amber-300 font-bold">
                          ⭐ Ngành của bạn
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
              </div>

              <PaginationBar
                page={meetingPagination.page}
                totalPages={meetingPagination.totalPages}
                totalItems={meetingPagination.totalItems}
                startIdx={meetingPagination.startIdx}
                endIdx={meetingPagination.endIdx}
                onPageChange={meetingPagination.setPage}
                itemLabel="kịch bản"
                compact
              />
            </div>
          </div>

          {/* Right Practice Workspace (lg:col-span-8, order-first on mobile) */}
          <div className="lg:col-span-8 order-first lg:order-none bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
            {activeMeeting ? (
              <>
                {/* Top navigation & badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
                      Mẫu {activeMeetingIdx + 1}/{filteredMeetings.length} • {activeMeeting.subType}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {activeMeeting.level} • {activeMeeting.industry}
                    </span>
                    {userIndustrySet.has(activeMeeting.industry) && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800">
                        ⭐ Ngành của bạn
                      </span>
                    )}
                    {completedIds.includes(activeMeeting.id) && (
                      <span className="text-xs font-bold text-emerald-600 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đã thuộc
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={activeMeetingIdx <= 0}
                      onClick={() => {
                        if (activeMeetingIdx > 0) {
                          setSelectedMeetingId(filteredMeetings[activeMeetingIdx - 1].id);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Trước
                    </button>
                    <button
                      type="button"
                      disabled={activeMeetingIdx < 0 || activeMeetingIdx >= filteredMeetings.length - 1}
                      onClick={() => {
                        if (activeMeetingIdx >= 0 && activeMeetingIdx < filteredMeetings.length - 1) {
                          setSelectedMeetingId(filteredMeetings[activeMeetingIdx + 1].id);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Sau <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Focused Phrase Display */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-50/70 to-teal-50/50 dark:from-emerald-950/25 dark:to-teal-950/20 border border-emerald-200/80 dark:border-emerald-800/60 space-y-2.5">
                  <p className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                    "{activeMeeting.en}"
                  </p>
                  <p className="text-xs sm:text-sm font-mono text-indigo-600 dark:text-indigo-400">
                    {activeMeeting.ipa}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 pt-1">
                    🇻🇳 {activeMeeting.vi}
                  </p>
                </div>

                {/* Context & Politeness Tip */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
                  <p className="text-slate-700 dark:text-slate-200">
                    <strong className="text-slate-900 dark:text-white">Ngữ cảnh sử dụng:</strong>{' '}
                    {activeMeeting.context}
                  </p>
                  <p className="text-emerald-800 dark:text-emerald-300 flex items-start gap-1.5 pt-1 border-t border-slate-200/60 dark:border-slate-700">
                    <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                    <span>
                      <strong>Mẹo lịch sự nơi công sở:</strong> {activeMeeting.politenessTip}
                    </span>
                  </p>
                </div>

                {/* Practice Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => speakText(activeMeeting.en, accent, 0.95)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" /> Nghe chuẩn
                  </button>
                  <button
                    type="button"
                    onClick={() => speakText(activeMeeting.en, accent, 0.75)}
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold inline-flex items-center gap-1.5 hover:bg-slate-200"
                  >
                    <Turtle className="w-4 h-4 text-indigo-500" /> Nghe chậm 0.75x
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyText(activeMeeting.id, activeMeeting.en)}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                  >
                    {copiedId === activeMeeting.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã chép
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Sao chép câu
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => markCompletedWithXp(activeMeeting.id, 10)}
                    disabled={completedIds.includes(activeMeeting.id)}
                    className={`ml-auto px-4 py-2 rounded-xl text-xs font-bold transition ${
                      completedIds.includes(activeMeeting.id)
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {completedIds.includes(activeMeeting.id)
                      ? '✓ Đã thuộc (+10 XP)'
                      : 'Đánh dấu đã thuộc (+10 XP)'}
                  </button>
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-sm text-slate-500">
                Không tìm thấy mẫu câu phù hợp với bộ lọc hiện tại. Hãy thử xóa từ khóa hoặc chọn "Tất cả".
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: 2. EMAIL & CHAT (2-Column Master-Detail) */}
      {activeTab === 'email' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Master List (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 h-fit">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase text-slate-500">
                Mẫu Email & Chat ({filteredEmails.length})
              </span>
              <button
                type="button"
                onClick={() => setMobileListOpen((v) => !v)}
                className="lg:hidden inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"
              >
                <span>{mobileListOpen ? 'Thu gọn' : 'Mở danh sách'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${mobileListOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(['ALL', 'Email', 'Slack / Teams'] as const).map((ch) => (
                <button
                  key={ch}
                  type="button"
                  onClick={() => setChannelFilter(ch)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    channelFilter === ch
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {ch === 'ALL' ? `Tất cả (${filteredEmails.length})` : ch}
                </button>
              ))}
            </div>

            <div
              className={`${
                mobileListOpen ? 'block' : 'hidden lg:block'
              } space-y-2.5`}
            >
              <div className="space-y-2">
              {emailPagination.pageItems.map((tpl, localIdx) => {
                const idx = emailPagination.startIdx + localIdx;
                const active = activeEmail?.id === tpl.id;
                const isMine = userIndustrySet.has(tpl.industry);
                const done = completedIds.includes(tpl.id);
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      setSelectedEmailId(tpl.id);
                      setMobileListOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition space-y-1 ${
                      active
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-950 dark:text-emerald-100'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                        #{idx + 1} • {tpl.channel} • {tpl.purpose}
                      </span>
                      {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                    </div>
                    <div className="text-xs font-bold">{tpl.title}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                      <span>
                        {tpl.level} • {tpl.industry}
                      </span>
                      {isMine && (
                        <span className="text-amber-700 dark:text-amber-300 font-bold">
                          ⭐ Ngành của bạn
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
              </div>

              <PaginationBar
                page={emailPagination.page}
                totalPages={emailPagination.totalPages}
                totalItems={emailPagination.totalItems}
                startIdx={emailPagination.startIdx}
                endIdx={emailPagination.endIdx}
                onPageChange={emailPagination.setPage}
                itemLabel="mẫu"
                compact
              />
            </div>
          </div>

          {/* Right Detail & Interactive Customizer (lg:col-span-8, order-first on mobile) */}
          <div className="lg:col-span-8 order-first lg:order-none bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
            {activeEmail ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800">
                        Mẫu {activeEmailIdx + 1}/{filteredEmails.length} • {activeEmail.channel}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {activeEmail.level} • {activeEmail.industry}
                      </span>
                      {userIndustrySet.has(activeEmail.industry) && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800">
                          ⭐ Ngành của bạn
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1.5">
                      {activeEmail.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{activeEmail.viSummary}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      disabled={activeEmailIdx <= 0}
                      onClick={() => {
                        if (activeEmailIdx > 0) {
                          setSelectedEmailId(filteredEmails[activeEmailIdx - 1].id);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Trước
                    </button>
                    <button
                      type="button"
                      disabled={activeEmailIdx < 0 || activeEmailIdx >= filteredEmails.length - 1}
                      onClick={() => {
                        if (activeEmailIdx >= 0 && activeEmailIdx < filteredEmails.length - 1) {
                          setSelectedEmailId(filteredEmails[activeEmailIdx + 1].id);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Sau <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => speakText(activeEmail.enBody, accent, 0.95)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Nghe mẫu
                    </button>
                  </div>
                </div>

                {activeEmail.subject && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="font-bold text-slate-500 mr-1.5">Tiêu đề (Subject):</span>
                      <span className="font-extrabold text-slate-900 dark:text-white">
                        {activeEmail.subject}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyText(`${activeEmail.id}-subj`, activeEmail.subject || '')
                      }
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-bold inline-flex items-center gap-1"
                    >
                      {copiedId === `${activeEmail.id}-subj` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" /> Đã chép tiêu đề
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Chép tiêu đề
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Editable template box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold uppercase text-slate-500">
                      Nội dung mẫu tiếng Anh (Chỉnh sửa trực tiếp chỗ [ngoặc vuông])
                    </label>
                    <button
                      type="button"
                      onClick={() => setCustomDraft(activeEmail.enBody)}
                      className="text-xs font-bold text-slate-500 hover:text-indigo-600 inline-flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Khôi phục mẫu gốc
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    value={customDraft}
                    onChange={(e) => setCustomDraft(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-mono leading-relaxed text-slate-900 dark:text-slate-100 focus:border-emerald-500 outline-none"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyText(activeEmail.id, customDraft)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      {copiedId === activeEmail.id ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {copiedId === activeEmail.id
                        ? 'Đã sao chép nội dung!'
                        : 'Sao chép toàn bộ để gửi'}
                    </button>
                    <button
                      type="button"
                      onClick={() => markCompletedWithXp(activeEmail.id, 15)}
                      disabled={completedIds.includes(activeEmail.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 ${
                        completedIds.includes(activeEmail.id)
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {completedIds.includes(activeEmail.id)
                        ? 'Đã hoàn thành mẫu này (+15 XP)'
                        : 'Hoàn thành thực hành mẫu (+15 XP)'}
                    </button>
                  </div>
                </div>

                {/* Structure breakdown */}
                <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800 space-y-2.5">
                  <div className="text-xs font-extrabold uppercase text-sky-800 dark:text-sky-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Ghi chú cấu trúc ăn điểm trong mẫu này
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeEmail.structureNotes.map((note, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-sky-200/70 dark:border-slate-700 space-y-1 text-xs"
                      >
                        <div className="font-extrabold text-indigo-700 dark:text-indigo-300">
                          {idx + 1}. {note.label}
                        </div>
                        <div className="font-mono text-[11px] text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded">
                          "{note.phrase}"
                        </div>
                        <div className="text-slate-600 dark:text-slate-400">{note.noteVi}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">Không có mẫu phù hợp với bộ lọc.</p>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: 3. PHỎNG VẤN STAR (2-Column Master-Detail) */}
      {activeTab === 'star' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Master List (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 h-fit">
            <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
              <div className="text-xs font-extrabold uppercase text-slate-500">
                Bộ {filteredStars.length} câu hỏi Phỏng vấn STAR
              </div>
              <button
                type="button"
                onClick={() => setMobileListOpen((v) => !v)}
                className="lg:hidden inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"
              >
                <span>{mobileListOpen ? 'Thu gọn' : 'Mở danh sách'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${mobileListOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <div
              className={`${
                mobileListOpen ? 'block' : 'hidden lg:block'
              } space-y-2.5`}
            >
              <div className="space-y-2">
              {starPagination.pageItems.map((q, localIdx) => {
                const idx = starPagination.startIdx + localIdx;
                const active = activeStar?.id === q.id;
                const isMine = userIndustrySet.has(q.industry);
                const done = completedIds.includes(q.id);
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setSelectedStarId(q.id);
                      setMobileListOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition space-y-1 ${
                      active
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
                      <span className="text-indigo-600 dark:text-indigo-400">
                        Câu {idx + 1} • {q.level} • {q.focusSkill}
                      </span>
                      {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                      {q.questionEn}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                      <span>{q.industry}</span>
                      {isMine && (
                        <span className="text-amber-700 dark:text-amber-300 font-bold">
                          ⭐ Ngành của bạn
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
              </div>

              <PaginationBar
                page={starPagination.page}
                totalPages={starPagination.totalPages}
                totalItems={starPagination.totalItems}
                startIdx={starPagination.startIdx}
                endIdx={starPagination.endIdx}
                onPageChange={starPagination.setPage}
                itemLabel="câu hỏi"
                compact
              />
            </div>
          </div>

          {/* Right Practice Workspace (lg:col-span-8, order-first on mobile) */}
          <div className="lg:col-span-8 order-first lg:order-none bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
            {activeStar ? (
              <>
                <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-100 text-indigo-700">
                        Câu {activeStarIdx + 1}/{filteredStars.length} • {activeStar.level} •{' '}
                        {activeStar.focusSkill}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {activeStar.industry}
                      </span>
                      {userIndustrySet.has(activeStar.industry) && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800">
                          ⭐ Ngành của bạn
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        disabled={activeStarIdx <= 0}
                        onClick={() => {
                          if (activeStarIdx > 0) {
                            setSelectedStarId(filteredStars[activeStarIdx - 1].id);
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" /> Trước
                      </button>
                      <button
                        type="button"
                        disabled={activeStarIdx < 0 || activeStarIdx >= filteredStars.length - 1}
                        onClick={() => {
                          if (activeStarIdx >= 0 && activeStarIdx < filteredStars.length - 1) {
                            setSelectedStarId(filteredStars[activeStarIdx + 1].id);
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        Sau <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => speakText(activeStar.questionEn, accent, 0.95)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold inline-flex items-center gap-1.5 hover:bg-indigo-50"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-indigo-600" /> Nghe câu hỏi
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    "{activeStar.questionEn}"
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    🇻🇳 {activeStar.questionVi}
                  </p>
                </div>

                {/* Outline toggle */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowStarOutline((v) => !v)}
                    className="text-xs font-extrabold uppercase text-emerald-700 dark:text-emerald-300 hover:underline"
                  >
                    {showStarOutline ? '▼ Ẩn dàn ý S-T-A-R' : '▶ Hiện dàn ý S-T-A-R'}
                  </button>
                  {showStarOutline && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { k: 'S — Situation (Bối cảnh)', v: activeStar.starOutline.situation },
                        { k: 'T — Task (Nhiệm vụ)', v: activeStar.starOutline.task },
                        { k: 'A — Action (Hành động)', v: activeStar.starOutline.action },
                        { k: 'R — Result (Kết quả đo lường)', v: activeStar.starOutline.result },
                      ].map((part) => (
                        <div
                          key={part.k}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs"
                        >
                          <div className="font-extrabold text-emerald-700 dark:text-emerald-300 mb-0.5">
                            {part.k}
                          </div>
                          <p className="text-slate-700 dark:text-slate-200">{part.v}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Band professional sample */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setShowStarSample((v) => !v)}
                      className="text-xs font-extrabold uppercase text-indigo-700 dark:text-indigo-300 hover:underline"
                    >
                      {showStarSample
                        ? '▼ Ẩn câu mẫu Band chuyên nghiệp'
                        : '▶ Hiện câu mẫu Band chuyên nghiệp'}
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => speakText(activeStar.sampleAnswerEn, accent, 0.95)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold inline-flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Nghe câu trả lời
                      </button>
                      <button
                        type="button"
                        onClick={() => speakText(activeStar.sampleAnswerEn, accent, 0.8)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold inline-flex items-center gap-1"
                      >
                        <Turtle className="w-3.5 h-3.5 text-indigo-500" /> 0.8x
                      </button>
                    </div>
                  </div>

                  {showStarSample && (
                    <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-800 space-y-2.5">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                        {activeStar.sampleAnswerEn}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-emerald-200/70 dark:border-emerald-900 pt-2">
                        <strong>Dịch nghĩa:</strong> {activeStar.sampleAnswerVi}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                          Cụm từ ghi điểm:
                        </span>
                        {activeStar.powerPhrases.map((phrase) => (
                          <span
                            key={phrase}
                            className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300"
                          >
                            {phrase}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Personal draft */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block">
                    ✍️ Tự nháp câu trả lời STAR theo kinh nghiệm thật của bạn:
                  </label>
                  <textarea
                    rows={3}
                    value={starNotes[activeStar.id] || ''}
                    onChange={(e) =>
                      setStarNotes((prev) => ({ ...prev, [activeStar.id]: e.target.value }))
                    }
                    placeholder="Gợi ý: Last year at my company (Situation)... My task was (Task)... I took action by (Action)... As a result (Result)..."
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopyText(activeStar.id, activeStar.sampleAnswerEn)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1"
                    >
                      {copiedId === activeStar.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã chép bài mẫu
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Chép bài mẫu
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => markCompletedWithXp(activeStar.id, 20)}
                      disabled={completedIds.includes(activeStar.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 ${
                        completedIds.includes(activeStar.id)
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {completedIds.includes(activeStar.id)
                        ? 'Đã hoàn thành câu phỏng vấn (+20 XP)'
                        : 'Hoàn thành luyện câu này (+20 XP)'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">Không có câu hỏi phù hợp với bộ lọc.</p>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: 4. XỬ LÝ TÌNH HUỐNG (2-Column Master-Detail) */}
      {activeTab === 'cases' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Master List (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-3 h-fit">
            <div className="flex items-center justify-between gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-extrabold uppercase text-slate-500">
                Danh sách tình huống ({filteredCases.length})
              </span>
              <button
                type="button"
                onClick={() => setMobileListOpen((v) => !v)}
                className="lg:hidden inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400"
              >
                <span>{mobileListOpen ? 'Thu gọn' : 'Mở danh sách'}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${mobileListOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            <div
              className={`${
                mobileListOpen ? 'block' : 'hidden lg:block'
              } space-y-2.5`}
            >
              <div className="space-y-2">
              {casePagination.pageItems.map((c, localIdx) => {
                const idx = casePagination.startIdx + localIdx;
                const active = activeCase?.id === c.id;
                const isMine = userIndustrySet.has(c.industry);
                const done = completedIds.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setSelectedCaseId(c.id);
                      setMobileListOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition space-y-1 ${
                      active
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
                      <span className="text-indigo-600 dark:text-indigo-400">
                        Tình huống {idx + 1} • {c.level}
                      </span>
                      {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                      {c.title}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                      <span>{c.industry}</span>
                      {isMine && (
                        <span className="text-amber-700 dark:text-amber-300 font-bold">
                          ⭐ Ngành của bạn
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
              </div>

              <PaginationBar
                page={casePagination.page}
                totalPages={casePagination.totalPages}
                totalItems={casePagination.totalItems}
                startIdx={casePagination.startIdx}
                endIdx={casePagination.endIdx}
                onPageChange={casePagination.setPage}
                itemLabel="tình huống"
                compact
              />
            </div>
          </div>

          {/* Right Single Case Practice Workspace (lg:col-span-8, order-first on mobile) */}
          <div className="lg:col-span-8 order-first lg:order-none bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-4">
            {activeCase ? (
              <>
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-100 text-indigo-700">
                        Tình huống {activeCaseIdx + 1}/{filteredCases.length} • {activeCase.level}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {activeCase.industry}
                      </span>
                      {userIndustrySet.has(activeCase.industry) && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800">
                          ⭐ Ngành của bạn
                        </span>
                      )}
                      {completedIds.includes(activeCase.id) && (
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Đã xử lý chuẩn (+20 XP)
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white pt-1">
                      {activeCase.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {activeCase.scenarioVi}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      disabled={activeCaseIdx <= 0}
                      onClick={() => {
                        if (activeCaseIdx > 0) {
                          setSelectedCaseId(filteredCases[activeCaseIdx - 1].id);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Trước
                    </button>
                    <button
                      type="button"
                      disabled={activeCaseIdx < 0 || activeCaseIdx >= filteredCases.length - 1}
                      onClick={() => {
                        if (activeCaseIdx >= 0 && activeCaseIdx < filteredCases.length - 1) {
                          setSelectedCaseId(filteredCases[activeCaseIdx + 1].id);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Sau <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Incoming prompt */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-bold uppercase text-slate-400">
                      Đối phương nói / nhắn:
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      "{activeCase.promptEn}"
                    </div>
                    <div className="text-xs text-slate-500">🇻🇳 {activeCase.promptVi}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => speakText(activeCase.promptEn, accent, 0.95)}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold inline-flex items-center gap-1.5 shrink-0"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> Nghe tình huống
                  </button>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-500">
                    Chọn cách phản hồi chuyên nghiệp nhất:
                  </div>
                  {activeCase.options.map((opt) => {
                    const chosenId = selectedCaseOptions[activeCase.id];
                    const picked = chosenId === opt.id;
                    const revealed = Boolean(chosenId);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => {
                          setSelectedCaseOptions((prev) => ({
                            ...prev,
                            [activeCase.id]: opt.id,
                          }));
                          if (opt.isBest) {
                            markCompletedWithXp(activeCase.id, 20);
                          }
                        }}
                        className={`p-3.5 rounded-xl border-2 cursor-pointer transition space-y-1.5 ${
                          revealed
                            ? opt.isBest
                              ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30'
                              : picked
                              ? 'border-rose-400 bg-rose-50/70 dark:bg-rose-950/30'
                              : 'border-slate-200 dark:border-slate-800 opacity-75'
                            : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400 bg-white dark:bg-slate-900'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div className="flex items-start gap-2 min-w-0 flex-1">
                            <span className="mt-0.5 shrink-0">
                              {revealed ? (
                                opt.isBest ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                ) : picked ? (
                                  <XCircle className="w-4 h-4 text-rose-500" />
                                ) : (
                                  <span className="w-4 h-4 rounded-full border border-slate-300 inline-block" />
                                )
                              ) : (
                                <span className="w-4 h-4 rounded-full border-2 border-slate-300 inline-block" />
                              )}
                            </span>
                            <div className="space-y-0.5">
                              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                "{opt.textEn}"
                              </p>
                              <p className="text-xs text-slate-600 dark:text-slate-300">
                                🇻🇳 {opt.textVi}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              speakText(opt.textEn, accent, 0.95);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-bold inline-flex items-center gap-1 shrink-0"
                          >
                            <Volume2 className="w-3 h-3 text-emerald-600" /> Nghe
                          </button>
                        </div>

                        {revealed && (
                          <div className="pt-1.5 border-t border-slate-200/70 dark:border-slate-700/70 flex flex-wrap items-center gap-2 text-xs">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                                opt.isBest
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              Sắc thái: {opt.tone}
                            </span>
                            <span className="text-slate-700 dark:text-slate-200">
                              {opt.explanationVi}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="p-6 text-center text-sm text-slate-500">
                Không tìm thấy tình huống phù hợp với bộ lọc hiện tại.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB 5: INDUSTRY VOCAB DRILLS ==================== */}
      {activeTab === 'drills' && (
        <ExerciseRunner
          key={industryFilter}
          exercises={filteredDrills}
          accent={accent}
          title={`Drill Từ Vựng & Giao Tiếp Công Sở (${industryFilter === 'ALL' ? '10 ngành' : industryFilter === 'MY_INDUSTRIES' ? 'Ngành của bạn' : industryFilter})`}
          subtitle="Luyện tập trắc nghiệm, điền từ, sắp xếp câu & nối thuật ngữ chuyên ngành."
          onComplete={(correct, total) => {
            if (correct >= Math.ceil(total * 0.6)) onAddXp(40);
          }}
        />
      )}
    </div>
  );
};

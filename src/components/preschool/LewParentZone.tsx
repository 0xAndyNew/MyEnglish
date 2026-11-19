import {
  ArrowLeft,
  BookOpen,
  ChartBar,
  LogOut,
  Play,
  Sliders,
  Users,
  Volume2,
} from 'lucide-react';
import React, { useState } from 'react';
import {
  LEW_AGE_LEVELS,
  LEW_AVATARS,
  LEW_LEVEL_ORDER,
  LEW_OBSERVATION_META,
} from '../../data/preschool/lewLevels';
import { LEW_TOPICS } from '../../data/preschool/lewTopics';
import type {
  LewAgeLevelId,
  LewChildProfile,
  LewObservationRecord,
  LewTopic,
} from '../../data/preschool/lewTypes';
import { unitCoverUrl } from '../../data/preschool/types';
import { PaginationBar, usePagination } from '../common/PaginationBar';

interface LewParentZoneProps {
  childrenList: LewChildProfile[];
  activeChild: LewChildProfile;
  completedKeys: string[];
  earnedStickers: string[];
  observations: LewObservationRecord[];
  isPreview?: boolean;
  onBackToKid: () => void;
  onSelectChild: (childId: string) => void;
  onChangeLevel: (levelId: LewAgeLevelId) => void;
  onOpenTopicLesson: (topic: LewTopic) => void;
  onOpenProfileModal: () => void;
  onExitPreview?: () => void;
  onLogout: () => void;
  onSpeak: (text: string) => void;
}

export const LewParentZone: React.FC<LewParentZoneProps> = ({
  childrenList,
  activeChild,
  completedKeys,
  earnedStickers,
  observations,
  isPreview = false,
  onBackToKid,
  onSelectChild,
  onChangeLevel,
  onOpenTopicLesson,
  onOpenProfileModal,
  onExitPreview,
  onLogout,
  onSpeak,
}) => {
  const [tab, setTab] = useState<'guides' | 'reports' | 'levels'>('guides');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(LEW_TOPICS[0].id);

  const levelMeta = LEW_AGE_LEVELS[activeChild.ageLevelId];
  const selectedTopicIdx = Math.max(0, LEW_TOPICS.findIndex((t) => t.id === selectedTopicId));
  const selectedTopic = LEW_TOPICS[selectedTopicIdx] || LEW_TOPICS[0];
  const childObs = observations.filter((o) => o.childId === activeChild.id);

  const guideTopicPagination = usePagination(LEW_TOPICS, 8, { activeIndex: selectedTopicIdx });
  const obsPagination = usePagination(childObs, 5, { resetKey: activeChild.id });

  const needsReviewTopics = LEW_TOPICS.filter((t) =>
    childObs.some((o) => o.topicId === t.id && o.observations.includes('needs_review'))
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToKid}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-sm shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Về Thế giới của bé ({activeChild.name})</span>
          </button>

          <div className="text-center">
            <div className="text-sm font-black text-slate-900">
              Little English World · Góc Phụ Huynh (Parent Zone)
            </div>
            <div className="text-[11px] font-semibold text-slate-500">
              Bé {activeChild.name} · {levelMeta.code} ({levelMeta.name} – {levelMeta.ageRangeVi})
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isPreview && onExitPreview && (
              <button
                type="button"
                onClick={onExitPreview}
                className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Thoát Preview Admin
              </button>
            )}
            <button
              type="button"
              onClick={onOpenProfileModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Đổi nhóm học</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Child & Age Level Selector Bar */}
        <section className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-black text-slate-800">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Hồ sơ bé đang chọn:</span>
              {childrenList.map((c) => {
                const av = LEW_AVATARS.find((a) => a.id === c.avatar) || LEW_AVATARS[0];
                const active = c.id === activeChild.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onSelectChild(c.id)}
                    className={`px-3 py-1.5 rounded-full border text-xs font-extrabold inline-flex items-center gap-1.5 ${
                      active
                        ? 'bg-amber-400 text-slate-900 border-amber-500'
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <img src={av.img} alt={c.name} className="w-5 h-5 object-contain" />
                    <span>Bé {c.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-bold text-slate-500">
              Thời lượng khuyến nghị: <strong className="text-slate-800">{levelMeta.recommendedSessionVi}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {LEW_LEVEL_ORDER.map((lvId) => {
              const lv = LEW_AGE_LEVELS[lvId];
              const active = lvId === activeChild.ageLevelId;
              return (
                <button
                  key={lvId}
                  type="button"
                  onClick={() => onChangeLevel(lvId)}
                  className={`p-3 rounded-2xl border-2 text-left transition ${
                    active ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="text-xs font-black text-slate-900">
                    {lv.code} · {lv.ageRangeVi}
                  </div>
                  <div className="text-[11px] font-bold text-amber-700">{lv.name}</div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">{lv.mainGoalVi}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Sub-navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'guides' as const, label: `📋 Giáo án ${LEW_TOPICS.length} Chủ đề cho Cha Mẹ`, icon: BookOpen },
            { id: 'reports' as const, label: '📊 Báo cáo Tiến bộ & Ghi nhận (4 góc nhìn)', icon: ChartBar },
            { id: 'levels' as const, label: '🎯 Khung kỹ năng 5 Nhóm tuổi & WHO', icon: Users },
          ].map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs inline-flex items-center gap-2 transition ${
                  active
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PARENT LESSON GUIDES FOR ALL TOPICS (8 per page) */}
        {tab === 'guides' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Topic list */}
            <div className="bg-white rounded-3xl border border-slate-200 p-4 space-y-2.5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-extrabold uppercase text-slate-500 px-2 pb-1">
                  <span>Chọn 1 trong {LEW_TOPICS.length} chủ đề</span>
                  <span className="text-amber-600">
                    Trang {guideTopicPagination.page}/{guideTopicPagination.totalPages}
                  </span>
                </div>
                {guideTopicPagination.pageItems.map((t) => {
                  const active = t.id === selectedTopic.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTopicId(t.id)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition ${
                        active
                          ? 'bg-amber-50 border-amber-400 font-extrabold'
                          : 'bg-white border-slate-100 hover:bg-slate-50 font-bold'
                      }`}
                    >
                      <img
                        src={unitCoverUrl(t.coverSlug)}
                        alt={t.titleEn}
                        className="w-16 h-12 rounded-xl bg-white p-1 border border-slate-100 object-contain shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-black text-slate-900 truncate">
                          {t.code}. {t.titleEn}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">{t.titleVi}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <PaginationBar
                page={guideTopicPagination.page}
                totalPages={guideTopicPagination.totalPages}
                totalItems={guideTopicPagination.totalItems}
                startIdx={guideTopicPagination.startIdx}
                endIdx={guideTopicPagination.endIdx}
                onPageChange={guideTopicPagination.setPage}
                variant="kid"
                itemLabel="chủ đề"
                compact
              />
            </div>

            {/* Detailed Parent Lesson Plan Table (Matches Section 6 Spec) */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={unitCoverUrl(selectedTopic.coverSlug)}
                    alt={selectedTopic.titleEn}
                    className="w-24 h-16 rounded-2xl bg-white p-1 object-contain border border-amber-200"
                  />
                  <div>
                    <span className="text-xs font-extrabold text-amber-600">
                      Giáo án Phụ huynh · Chủ đề {selectedTopic.code} ({levelMeta.ageRangeVi})
                    </span>
                    <h2 className="text-xl font-black text-slate-900">
                      {selectedTopic.titleEn} — {selectedTopic.titleVi}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenTopicLesson(selectedTopic)}
                  style={{ backgroundColor: selectedTopic.color }}
                  className="px-4 py-2.5 rounded-xl text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Mở bài học này cùng bé</span>
                </button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <th className="w-1/4 bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                        Mục tiêu ({levelMeta.shortAgeVi})
                      </th>
                      <td className="p-3.5 text-slate-700 font-semibold">
                        <div>{selectedTopic.levels[activeChild.ageLevelId].objectiveVi}</div>
                        <div className="text-emerald-700 mt-1">
                          <strong>Đầu ra kỳ vọng:</strong>{' '}
                          {selectedTopic.levels[activeChild.ageLevelId].expectedOutcomeVi}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                        Từ mục tiêu
                      </th>
                      <td className="p-3.5 text-slate-700 font-semibold">
                        {selectedTopic.parentGuide.targetWordsSummaryVi}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                        Cha mẹ nói câu gì? (Bấm nghe audio)
                      </th>
                      <td className="p-3.5 space-y-2">
                        {selectedTopic.parentGuide.sampleSentences.map((s, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-2 p-2 rounded-xl bg-amber-50/70 border border-amber-200"
                          >
                            <div>
                              <div className="font-extrabold text-slate-900">&ldquo;{s.en}&rdquo;</div>
                              <div className="text-[11px] text-slate-500">{s.vi}</div>
                            </div>
                            <button
                              type="button"
                              onClick={() => onSpeak(s.en)}
                              className="px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold inline-flex items-center gap-1 shrink-0"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Nghe</span>
                            </button>
                          </div>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                        Cha mẹ chuẩn bị
                      </th>
                      <td className="p-3.5 text-slate-700 font-semibold">
                        {selectedTopic.parentGuide.materialsVi}
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                        Cách hướng dẫn
                      </th>
                      <td className="p-3.5 text-slate-700 font-semibold">
                        <ol className="list-decimal list-inside space-y-1">
                          {selectedTopic.parentGuide.howToGuideVi.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-slate-50 p-3.5 text-left font-black text-slate-700 align-top">
                        Hoạt động ngoài màn hình
                      </th>
                      <td className="p-3.5 text-emerald-900 bg-emerald-50/50 font-bold">
                        🏡 {selectedTopic.parentGuide.offlineGameVi}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 4-QUADRANT PROGRESS REPORT & OBSERVATIONS (Section 13) */}
        {tab === 'reports' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-2 shadow-xs">
                <div className="text-xs font-extrabold uppercase text-amber-600">1. Hôm nay & Tổng quan</div>
                <div className="text-lg font-black text-slate-900">
                  Đã khám phá {earnedStickers.length}/{LEW_TOPICS.length} chủ đề · {completedKeys.length} lượt hoàn thành
                </div>
                <p className="text-xs text-slate-600">
                  Hệ thống ghi nhận sự tham gia theo thời gian, không xếp hạng hay chấm điểm gây áp lực cho bé.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-2 shadow-xs">
                <div className="text-xs font-extrabold uppercase text-emerald-600">
                  2. Gợi ý ôn tập tiếp theo
                </div>
                {needsReviewTopics.length > 0 ? (
                  <div className="space-y-1">
                    <div className="text-sm font-black text-slate-900">
                      Chủ đề cha mẹ đánh dấu &ldquo;Cần gặp lại&rdquo;:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {needsReviewTopics.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => onOpenTopicLesson(t)}
                          className="px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-extrabold"
                        >
                          🔁 {t.titleEn} ({t.titleVi})
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-slate-600">
                    Chưa có chủ đề nào cần ôn gấp. Cha mẹ có thể chọn bất kỳ chủ đề nào bé hứng thú hôm nay!
                  </div>
                )}
              </div>
            </div>

            {/* Skill Expression Summary */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-black text-slate-900">
                3. Biểu hiện theo kỹ năng (Dựa trên ghi nhận của cha mẹ)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {(Object.keys(LEW_OBSERVATION_META) as (keyof typeof LEW_OBSERVATION_META)[]).map(
                  (code) => {
                    const meta = LEW_OBSERVATION_META[code];
                    const count = childObs.filter((o) => o.observations.includes(code)).length;
                    return (
                      <div
                        key={code}
                        className="p-3 rounded-2xl border border-slate-200 bg-slate-50 text-center space-y-1"
                      >
                        <div className="text-2xl font-black text-slate-900">{count}</div>
                        <div className="text-xs font-extrabold text-slate-700">{meta.labelVi}</div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Observation Log */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-black text-slate-900">
                4. Nhật ký học tập & Ghi chú của cha mẹ
              </h3>
              {childObs.length === 0 ? (
                <p className="text-xs text-slate-500">
                  Chưa có ghi nhận nào. Khi hoàn thành Bước 6 của mỗi bài học, cha mẹ có thể tích chọn biểu hiện của bé để lưu vào đây.
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {obsPagination.pageItems.map((rec) => {
                      const top = LEW_TOPICS.find((t) => t.id === rec.topicId);
                      return (
                        <div
                          key={rec.id}
                          className="p-3 rounded-2xl border border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2 text-xs"
                        >
                          <div>
                            <span className="font-extrabold text-slate-900">
                              {top?.titleEn || rec.topicId}
                            </span>{' '}
                            <span className="text-slate-400">
                              ({rec.createdAt.slice(0, 10)})
                            </span>
                            {rec.parentNote && (
                              <div className="text-slate-600 mt-0.5">💬 {rec.parentNote}</div>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {rec.observations.map((c) => (
                              <span
                                key={c}
                                className="px-2 py-0.5 rounded-full text-[11px] font-bold"
                                style={{
                                  backgroundColor: LEW_OBSERVATION_META[c]?.badgeBg,
                                  color: LEW_OBSERVATION_META[c]?.badgeText,
                                }}
                              >
                                {LEW_OBSERVATION_META[c]?.labelVi}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <PaginationBar
                    page={obsPagination.page}
                    totalPages={obsPagination.totalPages}
                    totalItems={obsPagination.totalItems}
                    startIdx={obsPagination.startIdx}
                    endIdx={obsPagination.endIdx}
                    onPageChange={obsPagination.setPage}
                    variant="default"
                    itemLabel="ghi nhận"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: 5 AGE LEVELS MATRIX & WHO GUIDELINES */}
        {tab === 'levels' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-black text-slate-900">
              Khung phát triển kỹ năng theo 5 Nhóm tuổi ({levelMeta.code} đang chọn)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <strong>Listening (Nghe hiểu):</strong> {levelMeta.skillsVi.listening}
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <strong>Speaking (Phản hồi / Nói):</strong> {levelMeta.skillsVi.speaking}
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <strong>Vocabulary (Từ vựng):</strong> {levelMeta.skillsVi.vocabulary}
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <strong>Early Literacy (Làm quen đọc sớm):</strong> {levelMeta.skillsVi.literacy}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong>Lưu ý thời lượng màn hình (Tham chiếu WHO):</strong>
              <p>
                • Nhóm 1 tuổi: Không khuyến nghị thời gian màn hình tĩnh độc lập; ứng dụng đóng vai trò công cụ phát audio và gợi ý hoạt động cho cha mẹ.
                <br />• Nhóm 2–4 tuổi: Tổng thời gian màn hình từ mọi nguồn không quá 1 giờ/ngày, càng ít càng tốt, luôn có cha mẹ đồng hành.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

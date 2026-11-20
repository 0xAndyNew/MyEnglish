import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { canViewPage, type TrackStep } from '../../config/audienceTracks';
import type { LearnerProfile } from '../../types/audience';
import type { UserProgress, WordEntry } from '../../types/learning';
import type { CustomLessonRecord } from '../../utils/storage';
import { AlphabetFoundation } from '../AlphabetFoundation';
import { BilingualWritingLab } from '../BilingualWritingLab';
import { CurriculumRoadmap } from '../CurriculumRoadmap';
import { IpaPhonicsLab } from '../IpaPhonicsLab';
import { ListeningSpeakingLab } from '../ListeningSpeakingLab';
import { MemoryGamesSRS } from '../MemoryGamesSRS';
import { OcrSmartReader } from '../OcrSmartReader';
import { SentenceBuilderLab } from '../SentenceBuilderLab';
import { VocabularyLibrary } from '../VocabularyLibrary';
import { WritingGrammarLab } from '../WritingGrammarLab';
import type { AppRoute } from './useHashRoute';
import type { AgeTier } from './theme/ageTiers';
import { AppButton } from './ui/Button';
import { SegmentedTabs, type SegmentedTabItem } from './ui/SegmentedTabs';

const KidsPlayground = lazy(() =>
  import('../kids/KidsPlayground').then((m) => ({ default: m.KidsPlayground }))
);
const SchoolCurriculum = lazy(() =>
  import('../teen/SchoolCurriculum').then((m) => ({ default: m.SchoolCurriculum }))
);
const AcademicSkills = lazy(() =>
  import('../university/AcademicSkills').then((m) => ({ default: m.AcademicSkills }))
);
const WorkplaceCareerHub = lazy(() =>
  import('../worker/WorkplaceCareerHub').then((m) => ({ default: m.WorkplaceCareerHub }))
);
const ExamPrepCenter = lazy(() =>
  import('../exam/ExamPrepCenter').then((m) => ({ default: m.ExamPrepCenter }))
);
const ExamVocabGrammarHub = lazy(() =>
  import('../exam/ExamVocabGrammarHub').then((m) => ({ default: m.ExamVocabGrammarHub }))
);

export interface SubViewOption extends SegmentedTabItem {}

export function getSubViewsForStep(
  step: TrackStep,
  profile: LearnerProfile
): SubViewOption[] {
  if (step.page === 'roadmap') {
    return [
      { id: 'roadmap', label: 'Lộ trình 133 bài' },
      { id: 'vocab', label: 'Kho 980+ từ' },
    ];
  }
  if (step.page === 'vocab' && profile.audience !== 'exam') {
    return [
      { id: 'vocab', label: 'Kho 980+ từ' },
      { id: 'grammar', label: 'Ngữ pháp' },
    ];
  }
  return [];
}

export interface ModuleRendererProps {
  step: TrackStep;
  initialSub?: string;
  tier: AgeTier;
  effectiveProfile: LearnerProfile;
  progress: UserProgress;
  effectiveApiKey: string;
  isAdminUser: boolean;
  devUnlockAll: boolean;
  customLessons: CustomLessonRecord[];
  currentAudienceUnlock: number;
  onUnlockStep: (idx: number) => void;
  onAutoUnlockPracticeStages: () => void;
  onAddXp: (amount: number) => void;
  onSaveWord: (word: WordEntry) => void;
  onCompleteLesson: (lessonId: string) => void;
  onResetLessons: () => void;
  onTogglePhoneme: (id: string) => void;
  onPronunciationScore: (score: number) => void;
  onRateSrs: (wordId: string, quality: 0 | 2 | 4 | 5) => void;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onBackToLearn: () => void;
  onNavigate?: (route: AppRoute) => void;
}

export const ModuleRenderer: React.FC<ModuleRendererProps> = ({
  step,
  initialSub,
  tier,
  effectiveProfile,
  progress,
  effectiveApiKey,
  isAdminUser,
  devUnlockAll,
  customLessons,
  currentAudienceUnlock,
  onUnlockStep,
  onAutoUnlockPracticeStages,
  onAddXp,
  onSaveWord,
  onCompleteLesson,
  onResetLessons,
  onTogglePhoneme,
  onPronunciationScore,
  onRateSrs,
  onUpdateProgress,
  onBackToLearn,
  onNavigate,
}) => {
  const subViews = getSubViewsForStep(step, effectiveProfile);
  const defaultSub = subViews[0]?.id || '';
  const [activeSub, setActiveSub] = useState<string>(() =>
    initialSub && subViews.some((s) => s.id === initialSub) ? initialSub : defaultSub
  );

  useEffect(() => {
    if (initialSub && subViews.some((s) => s.id === initialSub)) {
      setActiveSub(initialSub);
    } else if (!subViews.some((s) => s.id === activeSub)) {
      setActiveSub(defaultSub);
    }
  }, [step.code, initialSub, defaultSub]);

  if (!canViewPage(step.page, effectiveProfile)) {
    return (
      <div className="p-6 rounded-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
          Mục này không thuộc hồ sơ học tập hiện tại.
        </p>
        <AppButton tier={tier} onClick={onBackToLearn}>
          Quay về danh sách bài học
        </AppButton>
      </div>
    );
  }

  const isKidsAudience = effectiveProfile.audience === 'kids';
  const currentSub = subViews.some((s) => s.id === activeSub) ? activeSub : defaultSub;

  const renderGrammar = (onGoNext: () => void) => (
    <WritingGrammarLab
      accent={progress.accent}
      learnerProfile={effectiveProfile}
      geminiApiKey={effectiveApiKey}
      onAddXp={onAddXp}
      isStep3Unlocked={currentAudienceUnlock >= step.idx + 1}
      onUnlockStep3={() => onUnlockStep(step.idx + 1)}
      onAutoUnlockNext={onAutoUnlockPracticeStages}
      onGoToStep3={onGoNext}
      devUnlockAll={devUnlockAll}
      savedCompletedGrammarIds={progress.completedGrammarIds ?? []}
      onCompleteGrammarId={(id) =>
        onUpdateProgress((p) => {
          const prev = p.completedGrammarIds ?? [];
          return prev.includes(id) ? p : { ...p, completedGrammarIds: [...prev, id] };
        })
      }
    />
  );

  return (
    <div className="space-y-4">
      {subViews.length > 0 && (
        <SegmentedTabs
          items={subViews}
          activeId={currentSub}
          onChange={setActiveSub}
          tier={tier}
        />
      )}

      {step.page === 'alphabet' && (
        <AlphabetFoundation
          accent={progress.accent}
          kidsMode={isKidsAudience || step.subView === 'kids'}
          isStepCompleted={currentAudienceUnlock >= step.idx + 1}
          savedPassedLetters={progress.passedLetters ?? []}
          onPassLetter={(letter) =>
            onUpdateProgress((p) => {
              const prev = p.passedLetters ?? [];
              return prev.includes(letter) ? p : { ...p, passedLetters: [...prev, letter] };
            })
          }
        />
      )}

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-16 text-sm font-semibold text-slate-500 gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-brand" />
            <span>Đang tải nội dung bài học...</span>
          </div>
        }
      >
        {step.page === 'kids' && (
          <KidsPlayground
            accent={progress.accent}
            profile={effectiveProfile}
            onAddXp={onAddXp}
            initialTab={(step.subView as 'vocab' | 'stories' | 'sentences' | 'games' | 'yle') || 'vocab'}
            allowAllOptions={isAdminUser}
            hideHeaderNav={true}
          />
        )}

        {step.page === 'school' && (
          <SchoolCurriculum
            accent={progress.accent}
            profile={effectiveProfile}
            onAddXp={onAddXp}
            onSaveWord={onSaveWord}
            initialMode={step.subView === 'exams' ? 'exams' : 'units'}
            allowAllOptions={isAdminUser}
            hideHeaderNav={true}
          />
        )}

        {step.page === 'academic' && (
          <AcademicSkills
            accent={progress.accent}
            geminiApiKey={effectiveApiKey}
            profile={effectiveProfile}
            onAddXp={onAddXp}
            onSaveWord={onSaveWord}
            initialTab={(step.subView as 'awl' | 'presentation' | 'writing' | 'career') || 'awl'}
            hideHeaderNav={true}
          />
        )}

        {step.page === 'workplace' && (
          <WorkplaceCareerHub
            accent={progress.accent}
            profile={effectiveProfile}
            onAddXp={onAddXp}
            initialTab={(initialSub as 'meetings' | 'email' | 'star' | 'cases' | 'drills') || undefined}
            allowAllOptions={isAdminUser}
            hideHeaderNav={true}
          />
        )}

        {step.page === 'exam' && (
          <ExamPrepCenter
            accent={progress.accent}
            geminiApiKey={effectiveApiKey}
            profile={effectiveProfile}
            onAddXp={onAddXp}
            onSaveWord={onSaveWord}
            savedWords={progress.savedWords}
            initialTab={
              (step.subView as 'diagnostic' | 'strategies' | 'practice' | 'mock' | 'rubric') ||
              'diagnostic'
            }
            initialPracticeSkill={
              initialSub === 'listening' ||
              initialSub === 'reading' ||
              initialSub === 'writing' ||
              initialSub === 'speaking'
                ? initialSub
                : undefined
            }
            allowAllOptions={isAdminUser}
            hideHeaderNav={true}
            onNavigate={onNavigate}
          />
        )}
      </Suspense>

      {step.page === 'ipa' && (
        <IpaPhonicsLab
          accent={progress.accent}
          masteredPhonemes={progress.masteredPhonemes}
          onToggleMastered={onTogglePhoneme}
          defaultSubStep="vowels"
          isStepCompleted={currentAudienceUnlock >= step.idx + 1}
          savedPassedPairs={progress.passedIpaPairs ?? []}
          onPassPair={(pairId) =>
            onUpdateProgress((p) => {
              const prev = p.passedIpaPairs ?? [];
              return prev.includes(pairId) ? p : { ...p, passedIpaPairs: [...prev, pairId] };
            })
          }
        />
      )}

      {step.page === 'roadmap' && (
        <>
          {currentSub === 'roadmap' && (
            <CurriculumRoadmap
              accent={progress.accent}
              learnerProfile={effectiveProfile}
              completedLessons={progress.completedLessons}
              savedWords={progress.savedWords}
              onCompleteLesson={onCompleteLesson}
              onResetLessons={onResetLessons}
              onNavigateTab={(tab) => {
                if (tab === 'vocab_srs') setActiveSub('vocab');
              }}
              onSaveWord={onSaveWord}
              onPronunciationScore={onPronunciationScore}
              isStep2BUnlocked={currentAudienceUnlock >= step.idx + 1}
              devUnlockAll={true}
            />
          )}
          {currentSub === 'vocab' && (
            <VocabularyLibrary
              accent={progress.accent}
              learnerProfile={effectiveProfile}
              savedWords={progress.savedWords}
              onSaveWord={onSaveWord}
              onPronunciationScore={onPronunciationScore}
            />
          )}
          {currentSub === 'srs' && (
            <MemoryGamesSRS
              accent={progress.accent}
              savedWords={progress.savedWords}
              srsCards={progress.srsCards}
              onRateSrs={onRateSrs}
              onAddXp={onAddXp}
            />
          )}
        </>
      )}

      {step.page === 'vocab' && effectiveProfile.audience === 'exam' && (
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16 text-sm font-semibold text-slate-500 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-brand" />
              <span>Đang tải từ vựng & ngữ pháp kỳ thi...</span>
            </div>
          }
        >
          <ExamVocabGrammarHub
            accent={progress.accent}
            profile={effectiveProfile}
            geminiApiKey={effectiveApiKey}
            initialSub={
              initialSub === 'grammar' || initialSub === 'srs' ? initialSub : 'vocab'
            }
            savedWords={progress.savedWords}
            srsCards={progress.srsCards}
            savedCompletedGrammarIds={progress.completedGrammarIds ?? []}
            onSaveWord={onSaveWord}
            onRateSrs={onRateSrs}
            onCompleteGrammarId={(id) =>
              onUpdateProgress((p) => {
                const prev = p.completedGrammarIds ?? [];
                return prev.includes(id) ? p : { ...p, completedGrammarIds: [...prev, id] };
              })
            }
            onAddXp={onAddXp}
          />
        </Suspense>
      )}

      {step.page === 'vocab' && effectiveProfile.audience !== 'exam' && (
        <>
          {currentSub === 'vocab' && (
            <VocabularyLibrary
              accent={progress.accent}
              learnerProfile={effectiveProfile}
              savedWords={progress.savedWords}
              onSaveWord={onSaveWord}
              onPronunciationScore={onPronunciationScore}
            />
          )}
          {currentSub === 'grammar' && renderGrammar(() => {})}
          {currentSub === 'srs' && (
            <MemoryGamesSRS
              accent={progress.accent}
              savedWords={progress.savedWords}
              srsCards={progress.srsCards}
              onRateSrs={onRateSrs}
              onAddXp={onAddXp}
            />
          )}
        </>
      )}

      {step.page === 'grammar' && renderGrammar(() => onUnlockStep(step.idx + 1))}

      {step.page === 'sentence' && (
        <>
          {effectiveProfile.audience === 'worker' && currentSub === 'grammar' ? (
            renderGrammar(() => setActiveSub('sentence'))
          ) : (
            <SentenceBuilderLab
              accent={progress.accent}
              learnerProfile={effectiveProfile}
              onAddXp={onAddXp}
              extraExercises={customLessons
                .filter((l) => l.kind === 'sentence')
                .map((l) => l.payload)}
              savedCompletedIds={progress.completedSentenceIds ?? []}
              onCompleteId={(id) =>
                onUpdateProgress((p) => {
                  const prev = p.completedSentenceIds ?? [];
                  return prev.includes(id) ? p : { ...p, completedSentenceIds: [...prev, id] };
                })
              }
              isNextUnlocked={currentAudienceUnlock >= step.idx + 1}
              onUnlockNext={() => onUnlockStep(step.idx + 1)}
            />
          )}
        </>
      )}

      {step.page === 'listenSpeak' && (
        <ListeningSpeakingLab
          accent={progress.accent}
          learnerProfile={effectiveProfile}
          geminiApiKey={effectiveApiKey}
          extraLessons={customLessons.filter((l) => l.kind === 'listening').map((l) => l.payload)}
          extraScenarios={customLessons.filter((l) => l.kind === 'roleplay').map((l) => l.payload)}
          savedWords={progress.savedWords}
          onSaveWord={onSaveWord}
          onPronunciationScore={onPronunciationScore}
          onAddXp={onAddXp}
          isNextUnlocked={true}
        />
      )}

      {step.page === 'writing' && (
        <>
          {currentSub === 'write' ? (
            <BilingualWritingLab
              accent={progress.accent}
              learnerProfile={effectiveProfile}
              geminiApiKey={effectiveApiKey}
              extraPrompts={customLessons.filter((l) => l.kind === 'writing').map((l) => l.payload)}
              onAddXp={onAddXp}
            />
          ) : (
            <OcrSmartReader
              accent={progress.accent}
              savedWords={progress.savedWords}
              onSaveWord={onSaveWord}
              onPronunciationScore={onPronunciationScore}
            />
          )}
        </>
      )}

      {step.page === 'ocr' && (
        <>
          {currentSub === 'ocr' ? (
            <OcrSmartReader
              accent={progress.accent}
              savedWords={progress.savedWords}
              onSaveWord={onSaveWord}
              onPronunciationScore={onPronunciationScore}
            />
          ) : (
            <MemoryGamesSRS
              accent={progress.accent}
              savedWords={progress.savedWords}
              srsCards={progress.srsCards}
              onRateSrs={onRateSrs}
              onAddXp={onAddXp}
            />
          )}
        </>
      )}
    </div>
  );
};

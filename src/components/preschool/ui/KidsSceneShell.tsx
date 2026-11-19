import { ArrowLeft, Play } from 'lucide-react';
import React from 'react';

export const KIDS_PASTEL_TILES = [
  { bg: '#FFD8E8', border: '#FFB6D4', accent: '#E11D74' }, // Hồng phấn
  { bg: '#DDF5C3', border: '#B9E88A', accent: '#2E9A1E' }, // Xanh cốm
  { bg: '#CBEFFF', border: '#95D9FF', accent: '#0C7CE0' }, // Xanh trời
  { bg: '#FFF3B8', border: '#FFE074', accent: '#D98200' }, // Vàng kem
  { bg: '#C9F2F7', border: '#92E1EC', accent: '#0891B2' }, // Xanh ngọc
  { bg: '#FFE1C4', border: '#FFC28A', accent: '#EA580C' }, // Cam đào
] as const;

export const KIDS_CHART_COLORS = [
  '#FF6B6B', // T2
  '#FF9F43', // T3
  '#48B9FF', // T4
  '#A26BFF', // T5
  '#3AD29F', // T6
  '#FF6FB5', // T7
  '#4E8CFF', // CN
] as const;

export function kidTopicIconUrl(topicId: string): string {
  return `/preschool/img/kids-ui/topics/${topicId}.webp`;
}

export function kidAvatarUrl(avatarId: string, fallbackImg: string): string {
  if (avatarId === 'benny') return '/preschool/img/kids-ui/avatar-boy-3d.webp';
  if (avatarId === 'bunny') return '/preschool/img/kids-ui/avatar-girl-3d.webp';
  return fallbackImg;
}

export type KidsSceneVariant =
  | 'sky-meadow'
  | 'sky-soft'
  | 'celebration'
  | 'music'
  | 'story'
  | 'parent';

interface KidsSceneShellProps {
  variant?: KidsSceneVariant;
  className?: string;
  children: React.ReactNode;
}

export const KidsSceneShell: React.FC<KidsSceneShellProps> = ({
  variant = 'sky-meadow',
  className = '',
  children,
}) => {
  const use3DBackdrop =
    variant === 'sky-meadow' ||
    variant === 'celebration' ||
    variant === 'music' ||
    variant === 'story';
  const showConfetti = variant === 'celebration';
  const showNotes = variant === 'music';

  const bgGradient =
    variant === 'parent'
      ? 'linear-gradient(180deg, #CFEFFF 0%, #EAF7FF 34%, #F4FAFF 100%)'
      : 'linear-gradient(180deg, #98DCFF 0%, #D9F3FF 36%, #F4FAFF 100%)';

  return (
    <div
      className={`relative min-h-screen w-full overflow-x-hidden font-kid ${className}`}
      style={{ background: bgGradient }}
    >
      {/* 3D Sky & Flower Meadow Background Layer */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        {use3DBackdrop ? (
          <>
            <img
              src="/preschool/img/kids-ui/sky-meadow-bg.webp"
              alt=""
              className="w-full h-full object-cover object-bottom"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  variant === 'celebration'
                    ? 'radial-gradient(circle at 50% 32%, rgba(255,250,210,0.42) 0%, rgba(255,255,255,0) 65%)'
                    : 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0) 100%)',
              }}
            />
          </>
        ) : (
          <>
            <svg
              className="absolute top-2 -left-10 w-56 sm:w-72 opacity-80"
              viewBox="0 0 240 100"
              fill="none"
            >
              <path
                d="M36 82h164c19 0 34-13 34-29 0-15-12-27-28-29-5-14-19-24-36-24-12 0-23 5-30 14-6-4-13-7-22-7-17 0-31 11-35 26-3-1-6-1-10-1-20 0-37 14-37 31 0 10 8 19 20 19z"
                fill="white"
              />
            </svg>
            <svg
              className="absolute top-6 -right-8 w-52 sm:w-72 opacity-75"
              viewBox="0 0 240 100"
              fill="none"
            >
              <path
                d="M30 82h170c18 0 32-12 32-27 0-14-11-26-26-28-5-13-18-23-34-23-12 0-23 6-29 14-6-4-13-6-21-6-16 0-30 11-34 25-4-1-8-1-12-1-19 0-36 13-36 29 0 9 7 17 20 17z"
                fill="white"
              />
            </svg>
          </>
        )}

        {/* Celebration sparkles & confetti */}
        {showConfetti && (
          <svg className="absolute inset-0 w-full h-full opacity-95" viewBox="0 0 800 900" fill="none">
            <circle cx="110" cy="140" r="8" fill="#FF6B9D" />
            <circle cx="690" cy="170" r="10" fill="#FFD43B" />
            <circle cx="160" cy="310" r="7" fill="#48B9FF" />
            <circle cx="650" cy="340" r="8" fill="#5CE06D" />
            <rect x="210" y="95" width="16" height="8" rx="4" transform="rotate(28 210 95)" fill="#FF9F43" />
            <rect x="570" y="110" width="18" height="8" rx="4" transform="rotate(-24 570 110)" fill="#A26BFF" />
            <rect x="95" y="230" width="15" height="7" rx="3" transform="rotate(-35 95 230)" fill="#FFD43B" />
            <rect x="705" y="265" width="16" height="8" rx="4" transform="rotate(35 705 265)" fill="#FF6B9D" />
            <path d="M135 170l4 9 9 4-9 4-4 9-4-9-9-4 9-4 4-9z" fill="#FFD43B" />
            <path d="M660 220l5 10 10 5-10 5-5 10-5-10-10-5 10-5 5-10z" fill="#FFF2A6" />
          </svg>
        )}

        {/* Floating musical notes for Songs */}
        {showNotes && (
          <svg className="absolute inset-0 w-full h-full opacity-80" viewBox="0 0 800 900" fill="none">
            <text x="65" y="160" fontSize="38" fill="#FF6FB5">🎵</text>
            <text x="700" y="150" fontSize="36" fill="#2498F8">🎶</text>
            <text x="115" y="340" fontSize="30" fill="#FF9F43">♪</text>
            <text x="670" y="320" fontSize="34" fill="#A26BFF">♫</text>
          </svg>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">{children}</div>
    </div>
  );
};

export const KidsStarIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 36 36" className={className} fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="kidsStarGrad" x1="18" y1="2" x2="18" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFF078" />
        <stop offset="55%" stopColor="#FFC727" />
        <stop offset="100%" stopColor="#F59300" />
      </linearGradient>
    </defs>
    <path
      d="M18 3.2l4.4 8.9 9.8 1.4-7.1 6.9 1.7 9.8L18 25.5l-8.8 4.7 1.7-9.8-7.1-6.9 9.8-1.4L18 3.2z"
      fill="url(#kidsStarGrad)"
      stroke="#E67E00"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path
      d="M18 6.5l2.7 5.6 6.1.9-4.4 4.3"
      stroke="#FFFAD1"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.75"
    />
  </svg>
);

export const KidsEnglishLogo: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  inline?: boolean;
}> = ({ size = 'lg', showTagline = true, inline = false }) => {
  const textSize =
    size === 'lg'
      ? 'text-5xl sm:text-6xl'
      : size === 'md'
      ? 'text-3xl sm:text-4xl'
      : 'text-2xl sm:text-3xl';

  return (
    <div className="inline-flex flex-col items-center select-none text-center">
      <div
        className={`relative font-kid font-extrabold tracking-tight leading-[0.95] ${
          inline ? 'flex items-baseline gap-2' : 'flex flex-col items-center'
        }`}
      >
        <span className={`relative inline-block kids-logo-blue ${textSize}`}>
          <svg
            className="absolute -top-5 -left-3 w-10 h-10 sm:w-12 sm:h-12 -rotate-12 drop-shadow-sm"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <polygon points="32,12 60,24 32,36 4,24" fill="#1E88F6" stroke="#FFFFFF" strokeWidth="3.5" strokeLinejoin="round" />
            <path d="M16 30v12c0 4 7 8 16 8s16-4 16-8V30" fill="#1565C0" stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" />
            <path d="M54 26v14" stroke="#FFC832" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="54" cy="42" r="4" fill="#FFC832" />
          </svg>
          Kids
        </span>
        <span className={`kids-logo-orange ${textSize}`}>English</span>
      </div>
      {showTagline && (
        <div className="mt-2 px-4 py-1 rounded-full bg-white/85 backdrop-blur-xs border border-white text-[#143A6B] font-extrabold text-xs sm:text-sm shadow-2xs">
          Học vui - Lớn khôn mỗi ngày
        </div>
      )}
    </div>
  );
};

interface KidsTopHeaderProps {
  title: React.ReactNode;
  onBack?: () => void;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export const KidsTopHeader: React.FC<KidsTopHeaderProps> = ({
  title,
  onBack,
  leftSlot,
  rightSlot,
}) => (
  <header className="sticky top-0 z-30 w-full px-3 sm:px-5 pt-3 pb-2">
    <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
      <div className="min-w-[44px] flex items-center">
        {leftSlot ? (
          leftSlot
        ) : onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Quay lại"
            className="w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#1674DA] border-2 border-white shadow-md flex items-center justify-center active:scale-95 transition"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.75]" />
          </button>
        ) : null}
      </div>

      <div className="flex-1 text-center font-kid font-extrabold text-lg sm:text-2xl text-[#123A6F] drop-shadow-[0_1px_0_rgba(255,255,255,0.85)] truncate">
        {title}
      </div>

      <div className="min-w-[44px] flex items-center justify-end">{rightSlot}</div>
    </div>
  </header>
);

export const KidsRobotHelper: React.FC<{
  mood?: 'happy' | 'listening' | 'cheer';
  className?: string;
}> = ({ mood = 'happy', className = 'w-20 h-20 sm:w-24 sm:h-24' }) => (
  <div
    className={`relative shrink-0 rounded-full flex items-center justify-center ${className} ${
      mood === 'cheer'
        ? 'animate-kid-bounce'
        : mood === 'listening'
        ? 'ring-4 ring-[#4DC0FF] bg-white/60 animate-pulse'
        : 'animate-kid-float'
    }`}
  >
    <img
      src="/preschool/img/kids-ui/robot-cutout.webp"
      alt="Robot trợ giảng"
      className="w-full h-full object-contain drop-shadow-md"
    />
  </div>
);

export const KidsRibbonBanner: React.FC<{ label: string }> = ({ label }) => (
  <div className="relative inline-flex items-center justify-center">
    <svg className="w-64 sm:w-72 h-16 drop-shadow-md" viewBox="0 0 300 72" fill="none">
      <path d="M12 22 L54 22 L44 62 L6 54 L20 38 Z" fill="#E39700" />
      <path d="M288 22 L246 22 L256 62 L294 54 L280 38 Z" fill="#E39700" />
      <path
        d="M42 12 C110 4, 190 4, 258 12 L250 56 C188 48, 112 48, 50 56 Z"
        fill="url(#kidsRibbonGrad)"
        stroke="#FFF7BD"
        strokeWidth="3"
      />
      <defs>
        <linearGradient id="kidsRibbonGrad" x1="150" y1="6" x2="150" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE96A" />
          <stop offset="60%" stopColor="#FFC826" />
          <stop offset="100%" stopColor="#F59F00" />
        </linearGradient>
      </defs>
    </svg>
    <span className="absolute inset-0 flex items-center justify-center pb-1 font-kid font-extrabold text-2xl sm:text-3xl text-[#8A3B00] drop-shadow-[0_1px_0_rgba(255,255,255,0.85)]">
      {label}
    </span>
  </div>
);

export const KidsRocketHeroBanner: React.FC<{
  subtitle: string;
  onStart: () => void;
}> = ({ subtitle, onStart }) => (
  <div
    onClick={onStart}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onStart();
      }
    }}
    className="relative overflow-hidden rounded-[30px] border-[3px] border-white shadow-[0_14px_30px_-8px_rgba(22,128,246,0.42)] cursor-pointer group transition-transform active:scale-[0.99] min-h-[175px] sm:min-h-[215px] flex items-center"
    style={{
      background: 'linear-gradient(135deg, #2FA9FF 0%, #5CCBFF 100%)',
    }}
  >
    {/* Generated 3D Pixar Boy on Rocket Background */}
    <img
      src="/preschool/img/kids-ui/hero-rocket.webp"
      alt="Let's learn English!"
      className="pointer-events-none absolute inset-0 w-full h-full object-cover object-[85%_42%] group-hover:scale-[1.02] transition-transform duration-300"
    />

    {/* Subtle left readability vignette */}
    <div
      className="pointer-events-none absolute inset-y-0 left-0 w-3/4 sm:w-3/5"
      style={{
        background:
          'linear-gradient(90deg, rgba(41,164,255,0.52) 0%, rgba(41,164,255,0.18) 55%, rgba(41,164,255,0) 100%)',
      }}
    />

    <div className="relative z-10 flex flex-col justify-center gap-3 px-5 py-5 sm:px-8 sm:py-6 max-w-[66%] sm:max-w-[58%]">
      <div className="font-kid font-extrabold text-3xl sm:text-5xl leading-[0.98] text-[#0C5AC2] [-webkit-text-stroke:5px_#ffffff] [paint-order:stroke_fill] drop-shadow-[0_4px_0_rgba(11,76,162,0.3)]">
        Let&apos;s learn
        <br />
        English!
      </div>

      <div className="inline-flex items-center gap-2.5 flex-wrap">
        <span className="kids-btn-orange w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white group-hover:scale-105 transition shrink-0">
          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-0.5" />
        </span>
        <span className="text-xs sm:text-sm font-extrabold text-[#123A6F] bg-white/90 px-3.5 py-1.5 rounded-full shadow-xs line-clamp-1">
          {subtitle}
        </span>
      </div>
    </div>
  </div>
);

export const KidsSongStageArt: React.FC<{ coverImg?: string }> = ({ coverImg }) => (
  <div className="relative w-full h-48 sm:h-56 flex items-end justify-center overflow-hidden rounded-[26px]">
    <svg
      className="absolute bottom-0 left-0 w-full h-24"
      viewBox="0 0 400 100"
      preserveAspectRatio="none"
      fill="none"
    >
      <path d="M0 40 Q200 -10 400 40 L400 100 L0 100 Z" fill="#7DE048" />
      <path d="M0 65 Q200 30 400 65 L400 100 L0 100 Z" fill="#4EB92D" />
    </svg>

    <span className="absolute top-3 left-5 text-2xl sm:text-3xl animate-kid-float">🎵</span>
    <span className="absolute top-5 right-6 text-2xl sm:text-3xl animate-kid-bounce">🎶</span>
    <span className="absolute top-14 left-12 text-xl text-pink-500 font-black animate-pulse">♪</span>
    <span className="absolute top-12 right-14 text-xl text-sky-500 font-black animate-pulse">♫</span>

    <div className="relative z-10 flex items-end justify-center gap-1 sm:gap-4 pb-3">
      <img
        src="/preschool/img/kids-ui/brother-cutout.webp"
        alt="Bé hát"
        className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-md -mr-3 animate-kid-bounce"
      />
      <img
        src="/preschool/img/kids-ui/sister-cutout.webp"
        alt="Bé múa hát"
        className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-lg z-10 animate-kid-float"
      />
      <img
        src="/preschool/img/kids-ui/boy-cutout.webp"
        alt="Bé nhảy"
        className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-md -ml-3 animate-kid-bounce"
      />
    </div>

    {coverImg && (
      <div className="absolute top-2.5 right-2.5 w-12 h-12 rounded-2xl bg-white/95 border-2 border-white shadow-md p-1 flex items-center justify-center">
        <img src={coverImg} alt="" className="w-full h-full object-contain" />
      </div>
    )}
  </div>
);

export const KidsStoryForestBackdrop: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="relative overflow-hidden rounded-[28px] border-4 border-white shadow-lg"
    style={{
      background: 'linear-gradient(180deg, #4DC16B 0%, #86DE73 58%, #59B943 100%)',
    }}
  >
    <svg
      className="pointer-events-none absolute inset-0 w-full h-full opacity-90"
      viewBox="0 0 600 320"
      preserveAspectRatio="none"
      fill="none"
    >
      <polygon points="240,0 380,0 470,320 140,320" fill="#FFF8B8" opacity="0.22" />
      <rect x="28" y="120" width="26" height="170" rx="10" fill="#8D5524" />
      <circle cx="42" cy="96" r="58" fill="#2F9E44" />
      <circle cx="88" cy="118" r="42" fill="#3DB852" />
      <rect x="542" y="110" width="28" height="180" rx="10" fill="#8D5524" />
      <circle cx="556" cy="90" r="62" fill="#2F9E44" />
      <circle cx="508" cy="114" r="44" fill="#3DB852" />
      <path d="M180 320 Q290 250 320 225 Q350 250 430 320 Z" fill="#F2D194" opacity="0.7" />
      <circle cx="110" cy="295" r="38" fill="#3AB54A" />
      <circle cx="490" cy="295" r="42" fill="#3AB54A" />
      <circle cx="118" cy="282" r="5" fill="#FFF2A6" />
      <circle cx="478" cy="280" r="5" fill="#FFB3D9" />
    </svg>
    <div className="relative z-10">{children}</div>
  </div>
);

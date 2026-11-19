import { ChevronRight } from 'lucide-react';
import React from 'react';
import { KidsEnglishLogo } from './ui/KidsSceneShell';

interface KidsSplashScreenProps {
  childName: string;
  onStart: () => void;
}

export const KidsSplashScreen: React.FC<KidsSplashScreenProps> = ({ childName, onStart }) => {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-between px-4 py-6 sm:py-9 font-kid"
      style={{
        background:
          'linear-gradient(180deg, #35B6FF 0%, #7CD8FF 46%, #B4EAFF 64%, #9AE74D 78%, #63C82C 100%)',
      }}
    >
      {/* Generated 3D Pixar Welcome Illustration (Fairytale Castle + 2 Kids + Corgi on Meadow) */}
      <div className="pointer-events-none absolute inset-0 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative w-full max-w-[620px] h-full">
          <img
            src="/preschool/img/kids-ui/splash-scene.webp"
            alt="Kids English Welcome"
            className="w-full h-full object-cover object-[50%_72%]"
          />
          {/* Soft horizontal edge fade so desktop side sky/grass blends seamlessly */}
          <div
            className="hidden sm:block absolute inset-y-0 left-0 w-20"
            style={{
              background:
                'linear-gradient(90deg, rgba(84,196,255,0.95) 0%, rgba(84,196,255,0) 100%)',
              maskImage: 'linear-gradient(180deg, black 0%, black 62%, transparent 78%)',
              WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 62%, transparent 78%)',
            }}
          />
          <div
            className="hidden sm:block absolute inset-y-0 right-0 w-20"
            style={{
              background:
                'linear-gradient(270deg, rgba(84,196,255,0.95) 0%, rgba(84,196,255,0) 100%)',
              maskImage: 'linear-gradient(180deg, black 0%, black 62%, transparent 78%)',
              WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 62%, transparent 78%)',
            }}
          />
        </div>
      </div>

      {/* Top Badge & 3D Kids English Logo */}
      <div className="relative z-10 flex flex-col items-center gap-2.5 pt-1">
        <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF5FA2] to-[#FF3D8B] text-white font-extrabold text-xs sm:text-sm shadow-md border-2 border-white/85">
          App học tiếng Anh dành cho bé từ 1–6 tuổi
        </div>
        <KidsEnglishLogo size="lg" showTagline />
      </div>

      {/* Center spacer so the 3D boy, girl, castle & corgi shine unobstructed */}
      <div className="relative z-10 flex-1 min-h-[260px] sm:min-h-[340px]" />

      {/* Bottom Glossy Orange 3D CTA Button */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center gap-2 pb-1">
        <button
          type="button"
          onClick={onStart}
          className="kids-btn-orange w-full py-4 px-8 rounded-full text-white font-kid font-extrabold text-2xl inline-flex items-center justify-center gap-2"
        >
          <span>Bắt đầu học</span>
          <span className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center">
            <ChevronRight className="w-6 h-6 stroke-[3]" />
          </span>
        </button>
        <p className="text-xs font-extrabold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">
          Cùng Bé {childName} khám phá thế giới tiếng Anh thú vị!
        </p>
      </div>
    </div>
  );
};

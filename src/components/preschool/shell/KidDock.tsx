import React from 'react';

export type KidScreenId = 'home' | 'songs' | 'stories' | 'stickers';

interface KidDockProps {
  active: KidScreenId;
  onSelect: (screen: KidScreenId, spokenLabel: string) => void;
}

const DOCK_ITEMS: { id: KidScreenId; img: string; emoji: string; label: string; speakEn: string; bg: string }[] = [
  { id: 'home', img: '/preschool/img/ui/dock-home.webp', emoji: '🏠', label: 'Học', speakEn: 'Home', bg: '#FF9F43' },
  { id: 'songs', img: '/preschool/img/ui/dock-songs.webp', emoji: '🎵', label: 'Bài hát', speakEn: 'Songs', bg: '#EC4899' },
  { id: 'stories', img: '/preschool/img/ui/dock-stories.webp', emoji: '📚', label: 'Truyện', speakEn: 'Stories', bg: '#4CC38A' },
  { id: 'stickers', img: '/preschool/img/ui/dock-stickers.webp', emoji: '⭐', label: 'Sticker', speakEn: 'Stickers', bg: '#5B8DEF' },
];

export const KidDock: React.FC<KidDockProps> = ({ active, onSelect }) => {
  const [failed, setFailed] = React.useState<Record<string, boolean>>({});
  return (
    <nav
      aria-label="Menu chính của bé"
      className="sticky bottom-0 z-30 w-full bg-white/95 backdrop-blur border-t-4 border-amber-100 px-3 py-2 shadow-[0_-6px_24px_rgba(15,23,42,0.06)]"
    >
      <div className="max-w-[720px] mx-auto grid grid-cols-4 gap-2.5 sm:gap-4">
        {DOCK_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id, item.speakEn)}
              style={
                isActive
                  ? {
                      backgroundColor: item.bg,
                      '--kid-btn-shadow': 'rgba(0,0,0,0.2)',
                    } as React.CSSProperties
                  : undefined
              }
              className={`min-h-[76px] sm:min-h-[88px] rounded-[24px] flex flex-col items-center justify-center gap-0.5 transition select-none ${
                isActive
                  ? 'kid-btn-3d text-white scale-[1.03]'
                  : 'bg-amber-50/70 hover:bg-amber-100/80 text-slate-700 border-2 border-amber-100'
              }`}
            >
              {!failed[item.id] ? (
                <img
                  src={item.img}
                  alt={item.label}
                  onError={() => setFailed((p) => ({ ...p, [item.id]: true }))}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-sm select-none pointer-events-none"
                />
              ) : (
                <span className="text-3xl sm:text-4xl leading-none">{item.emoji}</span>
              )}
              <span className="font-kid font-extrabold text-sm sm:text-base">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

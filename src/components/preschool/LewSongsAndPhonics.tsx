import { Music, Pause, Play, SkipBack, SkipForward, Sparkles, Volume2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { PHONICS_LETTERS } from '../../data/preschool/phonics';
import { wordImageUrl } from '../../data/preschool/types';
import { PaginationBar, usePagination } from '../common/PaginationBar';
import { KIDS_PASTEL_TILES, KidsSongStageArt } from './ui/KidsSceneShell';
import type { useKidAudio } from './ui/useKidAudio';

export interface KidsSongEntry {
  id: string;
  titleEn: string;
  titleVi: string;
  audioUrl: string;
  coverWord: string;
  color: string;
  softBg: string;
  actionVi: string;
  keyWords: string[];
}

export const LEW_SONGS_LIST: KidsSongEntry[] = [
  {
    id: 'animals',
    titleEn: 'Animal Friends Song',
    titleVi: 'Bài hát Bạn Thú Quanh Em',
    audioUrl: '/audio/kids-songs/animals.mp3',
    coverWord: 'dog',
    color: '#10B981',
    softBg: '#ECFDF5',
    actionVi: 'Giả tiếng kêu Gâu gâu (dog), Meo meo (cat) và nhảy như thỏ',
    keyWords: ['dog', 'cat', 'bird', 'rabbit'],
  },
  {
    id: 'family',
    titleEn: 'I Love My Family',
    titleVi: 'Bài hát Gia Đình Yêu Thương',
    audioUrl: '/audio/kids-songs/family.mp3',
    coverWord: 'mommy',
    color: '#EC4899',
    softBg: '#FDF2F8',
    actionVi: 'Ôm thật chặt mẹ/bố (hug) mỗi khi nghe đến Mommy, Daddy',
    keyWords: ['Mommy', 'Daddy', 'baby', 'hug'],
  },
  {
    id: 'colors',
    titleEn: 'Rainbow Colors Song',
    titleVi: 'Bài hát Sắc Màu Cầu Vồng',
    audioUrl: '/audio/kids-songs/colors.mp3',
    coverWord: 'rainbow',
    color: '#F59E0B',
    softBg: '#FEFCE8',
    actionVi: 'Chỉ tay tìm đồ chơi có màu Red, Blue, Yellow quanh phòng',
    keyWords: ['red', 'blue', 'yellow', 'green'],
  },
  {
    id: 'numbers',
    titleEn: 'Count With Me 1–6',
    titleVi: 'Bài hát Tập Đếm Vui Nhộn',
    audioUrl: '/audio/kids-songs/numbers.mp3',
    coverWord: 'one',
    color: '#6366F1',
    softBg: '#EEF2FF',
    actionVi: 'Giơ ngón tay đếm từ 1 đến 6 theo nhịp vỗ tay',
    keyWords: ['one', 'two', 'three', 'four'],
  },
  {
    id: 'body-parts',
    titleEn: 'Head, Eyes, Nose & Toes',
    titleVi: 'Bài hát Cơ Thể Của Bé',
    audioUrl: '/audio/kids-songs/body-parts.mp3',
    coverWord: 'head',
    color: '#F43F5E',
    softBg: '#FFF1F2',
    actionVi: 'Chạm tay lên đầu, mũi, tai và lắc đôi bàn tay theo nhạc',
    keyWords: ['head', 'eyes', 'ears', 'nose'],
  },
  {
    id: 'food-drinks',
    titleEn: 'Yummy Apple & Milk',
    titleVi: 'Bài hát Trái Cây & Món Ngon',
    audioUrl: '/audio/kids-songs/food-drinks.mp3',
    coverWord: 'apple',
    color: '#EF4444',
    softBg: '#FEF2F2',
    actionVi: 'Xoa bụng khen "Yummy!" và làm động tác uống sữa',
    keyWords: ['apple', 'banana', 'milk', 'cake'],
  },
  {
    id: 'toys',
    titleEn: 'Play With My Toys',
    titleVi: 'Bài hát Đồ Chơi Của Bé',
    audioUrl: '/audio/kids-songs/toys.mp3',
    coverWord: 'teddy',
    color: '#EA580C',
    softBg: '#FFF7ED',
    actionVi: 'Ôm gấu Teddy, lăn bóng tròn và giả làm đoàn tàu xình xịch',
    keyWords: ['ball', 'teddy', 'train', 'car'],
  },
  {
    id: 'clothes',
    titleEn: 'Put On Your Hat & Shoes',
    titleVi: 'Bài hát Mặc Quần Áo Xinh',
    audioUrl: '/audio/kids-songs/clothes.mp3',
    coverWord: 'hat',
    color: '#DB2777',
    softBg: '#FDF2F8',
    actionVi: 'Giơ tay đội mũ tưởng tượng và cúi xuống buộc dây giày',
    keyWords: ['hat', 'shirt', 'shoes', 'dress'],
  },
  {
    id: 'my-home',
    titleEn: 'Sweet Home Song',
    titleVi: 'Bài hát Ngôi Nhà Ấm Áp',
    audioUrl: '/audio/kids-songs/my-home.mp3',
    coverWord: 'bedroom',
    color: '#8B5CF6',
    softBg: '#F5F3FF',
    actionVi: 'Chắp 2 tay làm mái nhà trên đầu rồi nằm ngủ giả vờ',
    keyWords: ['bedroom', 'kitchen', 'bed', 'door'],
  },
  {
    id: 'school-things',
    titleEn: 'Ready For School',
    titleVi: 'Bài hát Đến Trường Vui Vẻ',
    audioUrl: '/audio/kids-songs/school-things.mp3',
    coverWord: 'school',
    color: '#0284C7',
    softBg: '#F0F9FF',
    actionVi: 'Giả vờ đeo ba lô lên vai và mở sách tranh đọc',
    keyWords: ['book', 'bag', 'pencil', 'teacher'],
  },
  {
    id: 'weather',
    titleEn: 'Sunny & Rainy Day',
    titleVi: 'Bài hát Nắng Mưa Quanh Em',
    audioUrl: '/audio/kids-songs/weather.mp3',
    coverWord: 'sun',
    color: '#059669',
    softBg: '#ECFDF5',
    actionVi: 'Xòe tay làm tia nắng, rồi vẫy ngón tay làm hạt mưa rơi',
    keyWords: ['sun', 'rainy', 'rainbow', 'umbrella'],
  },
  {
    id: 'feelings',
    titleEn: 'Happy Heart Song',
    titleVi: 'Bài hát Cảm Xúc Vui Tươi',
    audioUrl: '/audio/kids-songs/feelings.mp3',
    coverWord: 'happy',
    color: '#D97706',
    softBg: '#FFFBEB',
    actionVi: 'Cười thật tươi "Happy!", vẫy tay "Hello!" cùng cha mẹ',
    keyWords: ['happy', 'hello', 'bye-bye', 'play'],
  },
  {
    id: 'fruits',
    titleEn: 'Sweet Fruits Song',
    titleVi: 'Bài hát Trái Cây Ngọt Lành',
    audioUrl: '/audio/kids-songs/fruits.mp3',
    coverWord: 'strawberry',
    color: '#EF4444',
    softBg: '#FEF2F2',
    actionVi: 'Giả vờ bóc vỏ chuối, cắn táo giòn và xoa bụng "Yummy!"',
    keyWords: ['apple', 'banana', 'grapes', 'watermelon'],
  },
  {
    id: 'seasons',
    titleEn: 'Four Happy Seasons',
    titleVi: 'Bài hát Bốn Mùa Rực Rỡ',
    audioUrl: '/audio/kids-songs/seasons.mp3',
    coverWord: 'spring',
    color: '#10B981',
    softBg: '#ECFDF5',
    actionVi: 'Làm động tác hoa nở mùa xuân và xoay tròn như lá mùa thu',
    keyWords: ['spring', 'summer', 'autumn', 'winter'],
  },
  {
    id: 'shapes',
    titleEn: 'Shapes & Stars Song',
    titleVi: 'Bài hát Hình Khối & Ngôi Sao',
    audioUrl: '/audio/kids-songs/shapes.mp3',
    coverWord: 'star',
    color: '#8B5CF6',
    softBg: '#F5F3FF',
    actionVi: 'Vẽ hình tròn, hình vuông, tam giác bằng ngón tay trên không trung',
    keyWords: ['circle', 'square', 'triangle', 'star'],
  },
  {
    id: 'birthday',
    titleEn: 'Happy Birthday Party',
    titleVi: 'Bài hát Tiệc Sinh Nhật Vui',
    audioUrl: '/audio/kids-songs/birthday.mp3',
    coverWord: 'balloon',
    color: '#EC4899',
    softBg: '#FDF2F8',
    actionVi: 'Vỗ tay chúc mừng, thổi nến phù và bật nhảy như pháo giấy',
    keyWords: ['balloon', 'cake', 'candle', 'gift'],
  },
  {
    id: 'jobs',
    titleEn: 'Brave Community Helpers',
    titleVi: 'Bài hát Những Người Hùng Quanh Em',
    audioUrl: '/audio/kids-songs/jobs.mp3',
    coverWord: 'firefighter',
    color: '#2563EB',
    softBg: '#EFF6FF',
    actionVi: 'Giả làm bác sĩ nghe tim, chú phi công dang cánh bay cao',
    keyWords: ['doctor', 'nurse', 'firefighter', 'pilot'],
  },
  {
    id: 'bedtime',
    titleEn: 'Goodnight & Sweet Dreams',
    titleVi: 'Bài hát Chúc Ngủ Ngon Dịu Êm',
    audioUrl: '/audio/kids-songs/bedtime.mp3',
    coverWord: 'moon',
    color: '#4F46E5',
    softBg: '#EEF2FF',
    actionVi: 'Ôm gấu bông thật chặt, chắp tay nghiêng má chúc ngủ ngon',
    keyWords: ['moon', 'star', 'night', 'sleep'],
  },
];

interface LewSongsViewProps {
  audio: ReturnType<typeof useKidAudio>;
}

export const LewSongsView: React.FC<LewSongsViewProps> = ({ audio }) => {
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const defaultIdx = Math.max(0, LEW_SONGS_LIST.findIndex((s) => s.id === 'body-parts'));
  const [selectedIdx, setSelectedIdx] = useState<number>(defaultIdx);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const songPagination = usePagination(LEW_SONGS_LIST, 6, { activeIndex: selectedIdx });

  const currentSong = LEW_SONGS_LIST[selectedIdx] || LEW_SONGS_LIST[0];

  const stopPlayer = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current = null;
    }
    setIsPlaying(false);
    setProgressPct(0);
  };

  useEffect(() => {
    return () => {
      stopPlayer();
    };
  }, []);

  const playSongAtIndex = (idx: number) => {
    const safeIdx = (idx + LEW_SONGS_LIST.length) % LEW_SONGS_LIST.length;
    const song = LEW_SONGS_LIST[safeIdx];
    audio.stopAll();
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current = null;
    }
    setSelectedIdx(safeIdx);
    const nextAudio = new Audio(song.audioUrl);
    playerRef.current = nextAudio;
    setIsPlaying(true);
    setProgressPct(0);
    nextAudio.ontimeupdate = () => {
      if (nextAudio.duration && Number.isFinite(nextAudio.duration)) {
        setProgressPct(Math.min(100, Math.round((nextAudio.currentTime / nextAudio.duration) * 100)));
      }
    };
    nextAudio.onended = () => {
      setIsPlaying(false);
      setProgressPct(0);
    };
    nextAudio.onerror = () => {
      setIsPlaying(false);
    };
    nextAudio.play().catch(() => setIsPlaying(false));
  };

  const togglePlayCurrent = () => {
    if (isPlaying && playerRef.current) {
      playerRef.current.pause();
      setIsPlaying(false);
      return;
    }
    if (playerRef.current && playerRef.current.src.includes(currentSong.audioUrl)) {
      audio.stopAll();
      playerRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      return;
    }
    playSongAtIndex(selectedIdx);
  };

  return (
    <section ref={sectionRef} className="space-y-4">
      {/* Featured Song Player Stage (Exact Mockup #8: Học qua bài hát) */}
      <div
        className="rounded-[32px] border-4 border-white shadow-[0_14px_32px_-10px_rgba(22,128,246,0.3)] overflow-hidden p-4 sm:p-6 space-y-4"
        style={{
          background: 'linear-gradient(180deg, #74D2FF 0%, #C6EEFF 52%, #E8F9FF 100%)',
        }}
      >
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 text-[#1474DB] text-xs font-extrabold shadow-2xs">
            <Music className="w-3.5 h-3.5 text-pink-500" />
            <span>
              Bài hát {selectedIdx + 1} / {LEW_SONGS_LIST.length}
            </span>
          </div>
          <h2 className="kids-song-title font-kid font-extrabold text-2xl sm:text-4xl leading-tight px-2">
            {currentSong.titleEn}
          </h2>
          <p className="text-xs sm:text-sm font-extrabold text-[#15427A]">
            {currentSong.titleVi}
          </p>
        </div>

        {/* 3 Happy Singing Kids + Floating Notes Stage */}
        <KidsSongStageArt coverImg={wordImageUrl(currentSong.coverWord)} />

        {/* Audio Progress + 3 Glossy Blue Controls (⏮ | ⏸/▶ | ⏭) */}
        <div className="bg-white/95 rounded-[24px] p-4 shadow-sm space-y-3 border-2 border-white">
          <div className="h-2.5 rounded-full bg-[#DCEEFF] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FF6FB5] via-[#4DC0FF] to-[#1684F0] transition-all duration-200"
              style={{ width: `${Math.max(isPlaying ? 4 : 0, progressPct)}%` }}
            />
          </div>

          <div className="flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => playSongAtIndex(selectedIdx - 1)}
              aria-label="Bài trước"
              className="w-12 h-12 rounded-full bg-[#E3F4FF] hover:bg-[#CDEAFF] text-[#1684F0] border-2 border-white shadow-sm flex items-center justify-center active:scale-95 transition"
            >
              <SkipBack className="w-6 h-6 fill-current" />
            </button>

            <button
              type="button"
              onClick={togglePlayCurrent}
              aria-label={isPlaying ? 'Tạm dừng bài hát' : 'Phát bài hát'}
              className="kids-btn-blue w-16 h-16 rounded-full text-white flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 fill-current" />
              ) : (
                <Play className="w-8 h-8 fill-current ml-1" />
              )}
            </button>

            <button
              type="button"
              onClick={() => playSongAtIndex(selectedIdx + 1)}
              aria-label="Bài tiếp theo"
              className="w-12 h-12 rounded-full bg-[#E3F4FF] hover:bg-[#CDEAFF] text-[#1684F0] border-2 border-white shadow-sm flex items-center justify-center active:scale-95 transition"
            >
              <SkipForward className="w-6 h-6 fill-current" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            {currentSong.keyWords.map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => audio.speak(kw, 0.82)}
                className="px-3 py-1 rounded-full bg-[#EAF6FF] hover:bg-[#FFF3B8] text-[#123A6F] font-extrabold text-xs inline-flex items-center gap-1 border border-[#CBE7FF] transition"
              >
                <Volume2 className="w-3.5 h-3.5 text-[#1684F0]" />
                <span>{kw}</span>
              </button>
            ))}
          </div>

          <div className="text-center text-xs font-bold text-[#486B94] bg-[#F4FAFF] rounded-xl px-3 py-2 border border-[#DCEEFF]">
            🤸 Gợi ý vận động: {currentSong.actionVi}
          </div>
        </div>
      </div>

      {/* Playlist Grid (Pastel Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {songPagination.pageItems.map((song, localIdx) => {
          const globalIdx = songPagination.startIdx + localIdx;
          const active = globalIdx === selectedIdx;
          const tile = KIDS_PASTEL_TILES[globalIdx % KIDS_PASTEL_TILES.length];
          return (
            <button
              key={song.id}
              type="button"
              onClick={() => playSongAtIndex(globalIdx)}
              style={{
                backgroundColor: active ? '#1684F0' : tile.bg,
                borderColor: active ? '#0C5BB8' : tile.border,
              }}
              className={`rounded-[24px] border-2 p-3 text-left flex flex-col justify-between gap-2 shadow-xs transition hover:scale-[1.02] active:scale-95 ${
                active ? 'text-white shadow-md' : 'text-[#123A6F]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-white/95 p-1 flex items-center justify-center shrink-0 shadow-2xs">
                  <img
                    src={wordImageUrl(song.coverWord)}
                    alt={song.titleEn}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-extrabold text-xs sm:text-sm leading-tight line-clamp-2">
                    {song.titleEn}
                  </div>
                  <div
                    className={`text-[11px] font-bold line-clamp-1 mt-0.5 ${
                      active ? 'text-sky-100' : 'text-[#4B6F99]'
                    }`}
                  >
                    {song.titleVi}
                  </div>
                </div>
              </div>
              <div
                className={`text-[11px] font-extrabold inline-flex items-center gap-1 ${
                  active ? 'text-[#FFF2A6]' : 'text-[#1674DA]'
                }`}
              >
                {active && isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Đang phát nhạc...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Phát bài hát</span>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <PaginationBar
        page={songPagination.page}
        totalPages={songPagination.totalPages}
        totalItems={songPagination.totalItems}
        startIdx={songPagination.startIdx}
        endIdx={songPagination.endIdx}
        onPageChange={songPagination.setPage}
        variant="kid"
        itemLabel="bài hát"
        scrollTargetRef={sectionRef}
      />
    </section>
  );
};

interface LewPhonicsViewProps {
  audio: ReturnType<typeof useKidAudio>;
}

export const LewPhonicsView: React.FC<LewPhonicsViewProps> = ({ audio }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = PHONICS_LETTERS[selectedIdx] || PHONICS_LETTERS[0];
  const phonicsGridRef = useRef<HTMLDivElement | null>(null);
  const phonicsPagination = usePagination(PHONICS_LETTERS, 12, { activeIndex: selectedIdx });

  return (
    <section className="space-y-4">
      {/* Featured Selected Phonics Flashcard */}
      {current && (
        <div className="kids-glass-card rounded-[32px] p-5 sm:p-6 flex flex-col md:flex-row items-center gap-5">
          <button
            type="button"
            onClick={() => audio.speak(current.exampleWord, 0.85)}
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-[28px] bg-white p-3 border-2 border-[#DCEEFF] shadow-sm flex items-center justify-center shrink-0 hover:scale-[1.02] active:scale-95 transition"
          >
            <img
              src={wordImageUrl(current.exampleImage)}
              alt={current.exampleWord}
              className="w-full h-full object-contain"
            />
          </button>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="kids-btn-orange w-16 h-16 rounded-2xl text-white font-black text-3xl flex items-center justify-center">
                {current.letter.toUpperCase()}
              </span>
              <div>
                <div className="text-xs font-extrabold uppercase text-[#1684F0]">
                  Âm /{current.sound}/
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#123A6F]">
                  {current.exampleWord}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <button
                type="button"
                onClick={() => audio.speak(`${current.letter}. ${current.exampleWord}.`, 0.82)}
                className="kids-btn-blue px-5 py-2.5 rounded-full text-white font-extrabold text-sm inline-flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe chữ & từ mẫu</span>
              </button>
              <button
                type="button"
                onClick={() => audio.speak(current.chant, 0.85)}
                className="px-4 py-2.5 rounded-full bg-[#FFF3B8] hover:bg-[#FFE680] border-2 border-[#FFE074] text-[#8A4F00] font-extrabold text-sm inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>&ldquo;{current.chant}&rdquo;</span>
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-[#E8F8EE] border border-[#BDECC9] text-xs font-bold text-[#1B6B35]">
              👐 Động tác cùng bé: {current.actionVi}
            </div>
          </div>
        </div>
      )}

      {/* Grid of Phonics Letters (Pastel tiles) */}
      <div ref={phonicsGridRef} className="space-y-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3">
          {phonicsPagination.pageItems.map((item, localIdx) => {
            const idx = phonicsPagination.startIdx + localIdx;
            const active = idx === selectedIdx;
            const tile = KIDS_PASTEL_TILES[idx % KIDS_PASTEL_TILES.length];
            return (
              <button
                key={item.letter}
                type="button"
                onClick={() => {
                  setSelectedIdx(idx);
                  audio.speak(item.exampleWord, 0.85);
                }}
                style={{
                  backgroundColor: active ? '#1684F0' : tile.bg,
                  borderColor: active ? '#0C5BB8' : tile.border,
                }}
                className={`rounded-[22px] p-3 border-2 flex flex-col items-center gap-1.5 transition ${
                  active
                    ? 'text-white shadow-md scale-[1.04]'
                    : 'text-[#123A6F] hover:scale-[1.03] shadow-2xs'
                }`}
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <img
                    src={wordImageUrl(item.exampleImage)}
                    alt={item.exampleWord}
                    className={`w-full h-full object-contain ${
                      active ? 'bg-white rounded-xl p-1' : 'mix-blend-multiply'
                    }`}
                  />
                </div>
                <div className="text-center leading-tight">
                  <span className="text-lg font-black block">{item.letter.toUpperCase()}</span>
                  <span
                    className={`text-[11px] font-bold block ${
                      active ? 'text-sky-100' : 'text-[#4B6F99]'
                    }`}
                  >
                    {item.exampleWord}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <PaginationBar
          page={phonicsPagination.page}
          totalPages={phonicsPagination.totalPages}
          totalItems={phonicsPagination.totalItems}
          startIdx={phonicsPagination.startIdx}
          endIdx={phonicsPagination.endIdx}
          onPageChange={phonicsPagination.setPage}
          variant="kid"
          itemLabel="chữ cái"
          scrollTargetRef={phonicsGridRef}
        />
      </div>
    </section>
  );
};

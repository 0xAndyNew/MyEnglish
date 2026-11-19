import { Music, Pause, Play, Sparkles, Volume2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { PHONICS_LETTERS } from '../../data/preschool/phonics';
import { wordImageUrl } from '../../data/preschool/types';
import { PaginationBar, usePagination } from '../common/PaginationBar';
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
  const [playingId, setPlayingId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const songPagination = usePagination(LEW_SONGS_LIST, 6);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.pause();
        playerRef.current = null;
      }
    };
  }, []);

  const togglePlay = (song: KidsSongEntry) => {
    audio.stopAll();
    if (playingId === song.id && playerRef.current) {
      playerRef.current.pause();
      setPlayingId(null);
      return;
    }
    if (playerRef.current) {
      playerRef.current.pause();
    }
    const nextAudio = new Audio(song.audioUrl);
    playerRef.current = nextAudio;
    setPlayingId(song.id);
    nextAudio.onended = () => setPlayingId(null);
    nextAudio.onerror = () => setPlayingId(null);
    nextAudio.play().catch(() => setPlayingId(null));
  };

  return (
    <section ref={sectionRef} className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Music className="w-6 h-6 text-pink-500" />
          <span>Phòng Hát Vận Động ({LEW_SONGS_LIST.length} Bài Hát Thiếu Nhi MP3)</span>
        </h2>
        <p className="text-xs font-bold text-slate-500 mt-0.5">
          Cha mẹ bật nhạc để bé nghe thụ động tự nhiên hoặc vỗ tay, nhún nhảy làm động tác cùng con.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {songPagination.pageItems.map((song) => {
          const isPlaying = playingId === song.id;
          return (
            <div
              key={song.id}
              className="rounded-[28px] bg-white border-3 border-slate-100 hover:border-pink-300 p-4 shadow-sm flex flex-col justify-between gap-3 transition"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className="w-20 h-20 rounded-2xl border-2 border-slate-100 bg-white p-1.5 flex items-center justify-center shrink-0"
                  style={{ backgroundColor: song.softBg }}
                >
                  <img
                    src={wordImageUrl(song.coverWord)}
                    alt={song.titleEn}
                    className="w-full h-full object-contain rounded-xl bg-white p-1"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                    {song.titleEn}
                  </h3>
                  <div className="text-xs font-bold text-slate-500 mt-0.5">{song.titleVi}</div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {song.keyWords.map((kw) => (
                      <button
                        key={kw}
                        type="button"
                        onClick={() => audio.speak(kw, 0.82)}
                        className="px-2 py-0.5 rounded-full bg-slate-100 hover:bg-amber-100 text-[11px] font-bold text-slate-700"
                      >
                        {kw}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-semibold text-slate-600">
                🤸 {song.actionVi}
              </div>

              <button
                type="button"
                onClick={() => togglePlay(song)}
                style={{ backgroundColor: isPlaying ? '#EC4899' : song.color }}
                className="w-full py-2.5 px-4 rounded-2xl text-white font-extrabold text-sm inline-flex items-center justify-center gap-2 shadow-xs transition active:scale-95"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Đang phát — Bấm để dừng' : 'Nghe bài hát'}</span>
              </button>
            </div>
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
    <section className="space-y-5">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-500" />
          <span>Góc Chữ Cái A–Z (26 Âm Phonics Kèm Flashcard)</span>
        </h2>
        <p className="text-xs font-bold text-slate-500 mt-0.5">
          Chạm vào từng chữ cái để nghe phát âm, xem thẻ hình minh họa và làm động tác vui cùng cha mẹ (phù hợp nhất cho bé 3–6 tuổi).
        </p>
      </div>

      {/* Featured Selected Phonics Flashcard */}
      {current && (
        <div className="rounded-[32px] bg-white border-4 border-amber-100 p-5 sm:p-7 shadow-md flex flex-col md:flex-row items-center gap-6">
          <button
            type="button"
            onClick={() => audio.speak(current.exampleWord, 0.85)}
            className="w-56 h-56 sm:w-64 sm:h-64 rounded-[28px] bg-white p-3 border-2 border-slate-100 shadow-sm flex items-center justify-center shrink-0 hover:scale-[1.02] active:scale-95 transition"
          >
            <img
              src={wordImageUrl(current.exampleImage)}
              alt={current.exampleWord}
              className="w-full h-full object-contain"
            />
          </button>

          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-3">
              <span className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-900 font-black text-3xl flex items-center justify-center shadow-xs">
                {current.letter.toUpperCase()}
              </span>
              <div>
                <div className="text-xs font-extrabold uppercase text-amber-600">
                  Âm /{current.sound}/
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                  {current.exampleWord}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              <button
                type="button"
                onClick={() => audio.speak(`${current.letter}. ${current.exampleWord}.`, 0.82)}
                className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-sm inline-flex items-center gap-2 shadow-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe chữ & từ mẫu</span>
              </button>
              <button
                type="button"
                onClick={() => audio.speak(current.chant, 0.85)}
                className="px-4 py-2.5 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-extrabold text-sm inline-flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4" />
                <span>Đọc nhịp: &ldquo;{current.chant}&rdquo;</span>
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs font-bold text-emerald-900">
              👐 Động tác cùng bé: {current.actionVi}
            </div>
          </div>
        </div>
      )}

      {/* Grid of Phonics Letters (12 per page) */}
      <div ref={phonicsGridRef} className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {phonicsPagination.pageItems.map((item, localIdx) => {
            const idx = phonicsPagination.startIdx + localIdx;
            const active = idx === selectedIdx;
            return (
              <button
                key={item.letter}
                type="button"
                onClick={() => {
                  setSelectedIdx(idx);
                  audio.speak(item.exampleWord, 0.85);
                }}
                className={`rounded-2xl bg-white p-3 border-2 flex flex-col items-center gap-2 transition ${
                  active
                    ? 'border-amber-400 bg-amber-50/50 shadow-md scale-[1.03]'
                    : 'border-slate-100 hover:border-amber-300 shadow-xs'
                }`}
              >
                <div className="w-16 h-16 rounded-xl bg-white p-1 border border-slate-100 flex items-center justify-center">
                  <img
                    src={wordImageUrl(item.exampleImage)}
                    alt={item.exampleWord}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <span className="text-lg font-black text-slate-900">{item.letter.toUpperCase()}</span>
                  <span className="text-xs font-bold text-slate-500 block">{item.exampleWord}</span>
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

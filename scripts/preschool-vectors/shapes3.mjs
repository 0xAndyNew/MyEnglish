import { OUTLINE, kawaiiFace, personBust, wrapSvg } from './primitives.mjs';

export const SHAPES_3 = {
  // School
  book: wrapSvg(`
    <rect x="44" y="38" width="112" height="124" rx="16" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="44" y="138" width="112" height="24" rx="10" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="5" />
    <line x1="64" y1="38" x2="64" y2="138" stroke="${OUTLINE}" stroke-width="4.5" />
    <polygon points="110,64 116,78 132,80 120,90 123,106 110,98 97,106 100,90 88,80 104,78" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#EFF6FF'),
  bag: wrapSvg(`
    <path d="M74 52 Q100 26 126 52" fill="none" stroke="${OUTLINE}" stroke-width="8" />
    <rect x="48" y="54" width="104" height="112" rx="30" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="64" y="106" width="72" height="44" rx="14" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="4.5" />
    ${kawaiiFace(100, 84, 0.75)}
  `, '#EFF6FF'),
  chair: wrapSvg(`
    <rect x="64" y="36" width="72" height="62" rx="12" fill="#FBBF24" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="56" y="98" width="88" height="20" rx="8" fill="#F59E0B" stroke="${OUTLINE}" stroke-width="5.5" />
    <line x1="68" y1="118" x2="64" y2="164" stroke="${OUTLINE}" stroke-width="8" />
    <line x1="132" y1="118" x2="136" y2="164" stroke="${OUTLINE}" stroke-width="8" />
  `, '#FFFBEB'),
  table: wrapSvg(`
    <ellipse cx="100" cy="84" rx="68" ry="26" fill="#FDE047" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="44" y="96" width="14" height="64" rx="6" fill="#D97706" stroke="${OUTLINE}" stroke-width="4.5" />
    <rect x="142" y="96" width="14" height="64" rx="6" fill="#D97706" stroke="${OUTLINE}" stroke-width="4.5" />
    <rect x="93" y="106" width="14" height="50" rx="6" fill="#B45309" stroke="${OUTLINE}" stroke-width="4.5" />
  `, '#FEFCE8'),
  crayon: wrapSvg(`
    <g transform="rotate(-35 100 100)">
      <polygon points="80,58 120,58 108,24 92,24" fill="#FF922B" stroke="${OUTLINE}" stroke-width="5" />
      <rect x="76" y="58" width="48" height="108" rx="10" fill="#FFA94D" stroke="${OUTLINE}" stroke-width="5.5" />
      <rect x="76" y="76" width="48" height="14" fill="${OUTLINE}" />
      <rect x="76" y="138" width="48" height="14" fill="${OUTLINE}" />
      ${kawaiiFace(100, 114, 0.65)}
    </g>
  `, '#FFF7ED'),
  ruler: wrapSvg(`
    <g transform="rotate(-30 100 100)">
      <rect x="30" y="76" width="140" height="48" rx="10" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5.5" />
      <line x1="50" y1="76" x2="50" y2="94" stroke="${OUTLINE}" stroke-width="4" />
      <line x1="70" y1="76" x2="70" y2="88" stroke="${OUTLINE}" stroke-width="4" />
      <line x1="90" y1="76" x2="90" y2="94" stroke="${OUTLINE}" stroke-width="4" />
      <line x1="110" y1="76" x2="110" y2="88" stroke="${OUTLINE}" stroke-width="4" />
      <line x1="130" y1="76" x2="130" y2="94" stroke="${OUTLINE}" stroke-width="4" />
      <line x1="150" y1="76" x2="150" y2="88" stroke="${OUTLINE}" stroke-width="4" />
    </g>
  `, '#FEFCE8'),
  eraser: wrapSvg(`
    <g transform="rotate(-15 100 100)">
      <rect x="48" y="64" width="104" height="72" rx="16" fill="#FF9EB5" stroke="${OUTLINE}" stroke-width="5.5" />
      <rect x="48" y="64" width="44" height="72" rx="14" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="5.5" />
      ${kawaiiFace(120, 102, 0.7)}
    </g>
  `, '#FDF2F8'),
  school: wrapSvg(`
    <polygon points="36,88 100,40 164,88" fill="#EF4444" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="48" y="88" width="104" height="74" rx="8" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="84" y="114" width="32" height="48" rx="6" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="100" cy="68" r="11" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#FEF2F2'),

  // House & Daily routine
  bed: wrapSvg(`
    <rect x="34" y="62" width="16" height="96" rx="6" fill="#B45309" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="150" y="88" width="16" height="70" rx="6" fill="#B45309" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="50" y="90" width="36" height="22" rx="10" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="4.5" />
    <rect x="46" y="106" width="108" height="36" rx="10" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5" />
  `, '#EFF6FF'),
  bedroom: wrapSvg(`
    <rect x="30" y="34" width="140" height="132" rx="22" fill="#EDE9FE" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="112" y="48" width="40" height="36" rx="6" fill="#312E81" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="132" cy="64" r="9" fill="#FDE047" />
    <rect x="46" y="108" width="108" height="38" rx="10" fill="#A78BFA" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="52" y="92" width="34" height="18" rx="8" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="4" />
  `, '#F5F3FF'),
  kitchen: wrapSvg(`
    <rect x="34" y="42" width="132" height="118" rx="18" fill="#FFF7ED" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="48" y="96" width="104" height="54" rx="8" fill="#FDBA74" stroke="${OUTLINE}" stroke-width="4.5" />
    <rect x="76" y="110" width="48" height="28" rx="5" fill="#1E293B" stroke="${OUTLINE}" stroke-width="3.5" />
    <ellipse cx="100" cy="84" rx="22" ry="12" fill="#FF6B8B" stroke="${OUTLINE}" stroke-width="4.5" />
  `, '#FFF7ED'),
  bathroom: wrapSvg(`
    <rect x="46" y="92" width="108" height="52" rx="22" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="72" cy="82" r="16" fill="#BAE6FD" stroke="#60A5FA" stroke-width="3" />
    <circle cx="102" cy="76" r="18" fill="#BAE6FD" stroke="#60A5FA" stroke-width="3" />
    <circle cx="130" cy="84" r="14" fill="#BAE6FD" stroke="#60A5FA" stroke-width="3" />
    <path d="M56 92 L56 54 Q56 44 68 44" fill="none" stroke="#94A3B8" stroke-width="7" />
  `, '#ECFEFF'),
  'living-room': wrapSvg(`
    <rect x="30" y="34" width="140" height="132" rx="22" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="46" y="96" width="108" height="44" rx="14" fill="#FB923C" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="78" y="48" width="44" height="34" rx="6" fill="#7DD3FC" stroke="${OUTLINE}" stroke-width="4" />
  `, '#FFFBEB'),
  sofa: wrapSvg(`
    <rect x="38" y="76" width="124" height="56" rx="18" fill="#FB923C" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="26" y="96" width="24" height="48" rx="10" fill="#FDBA74" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="150" y="96" width="24" height="48" rx="10" fill="#FDBA74" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="46" y="114" width="108" height="30" rx="10" fill="#FED7AA" stroke="${OUTLINE}" stroke-width="4.5" />
  `, '#FFF7ED'),
  door: wrapSvg(`
    <rect x="58" y="34" width="84" height="132" rx="12" fill="#B45309" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="70" y="48" width="60" height="44" rx="6" fill="#D97706" stroke="${OUTLINE}" stroke-width="4" />
    <rect x="70" y="106" width="60" height="44" rx="6" fill="#D97706" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="128" cy="100" r="7" fill="#FACC15" stroke="${OUTLINE}" stroke-width="3" />
  `, '#FFFBEB'),
  window: wrapSvg(`
    <rect x="42" y="42" width="116" height="116" rx="16" fill="#BAE6FD" stroke="${OUTLINE}" stroke-width="6" />
    <line x1="100" y1="42" x2="100" y2="158" stroke="${OUTLINE}" stroke-width="6" />
    <line x1="42" y1="100" x2="158" y2="100" stroke="${OUTLINE}" stroke-width="6" />
    <circle cx="72" cy="70" r="10" fill="#FDE047" />
  `, '#EFF6FF'),
  'wake-up': wrapSvg(`
    <circle cx="62" cy="54" r="14" fill="#FACC15" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="138" cy="54" r="14" fill="#FACC15" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="106" r="52" fill="#FF6B8B" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="100" cy="106" r="40" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="4" />
    <line x1="100" y1="106" x2="100" y2="78" stroke="${OUTLINE}" stroke-width="5.5" />
    <line x1="100" y1="106" x2="122" y2="106" stroke="${OUTLINE}" stroke-width="5.5" />
  `, '#FFF1F2'),
  'brush-teeth': wrapSvg(`
    <g transform="rotate(-25 100 100)">
      <rect x="30" y="96" width="140" height="18" rx="9" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5" />
      <rect x="116" y="72" width="44" height="24" rx="6" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="4.5" />
      <path d="M120 68 Q138 56 154 70" fill="#34D399" stroke="${OUTLINE}" stroke-width="4" />
    </g>
  `, '#ECFEFF'),
  breakfast: wrapSvg(`
    <circle cx="100" cy="104" r="58" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="100" cy="104" rx="42" ry="32" fill="#FBBF24" stroke="${OUTLINE}" stroke-width="4.5" />
    <rect x="90" y="92" width="20" height="16" rx="4" fill="#FEF08A" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#FFFBEB'),
  play: wrapSvg(`
    <rect x="40" y="132" width="120" height="16" rx="8" fill="#4ADE80" stroke="${OUTLINE}" stroke-width="4.5" />
    <polygon points="62,56 144,132 118,132 62,80" fill="#FF6B8B" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="52" y="56" width="16" height="76" rx="5" fill="#FACC15" stroke="${OUTLINE}" stroke-width="5" />
  `, '#ECFDF5'),
  bath: wrapSvg(`
    <path d="M40 106 L160 106 Q156 154 100 154 Q44 154 40 106 Z" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="84" cy="84" r="18" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="122" cy="88" r="14" fill="#93C5FD" stroke="#60A5FA" stroke-width="3.5" />
  `, '#ECFEFF'),
  read: wrapSvg(`
    <path d="M38 58 Q70 50 100 66 Q130 50 162 58 L162 146 Q130 138 100 154 Q70 138 38 146 Z" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="5.5" />
    <line x1="100" y1="66" x2="100" y2="154" stroke="${OUTLINE}" stroke-width="5" />
    <line x1="54" y1="84" x2="84" y2="86" stroke="#94A3B8" stroke-width="4" />
    <line x1="54" y1="102" x2="84" y2="104" stroke="#94A3B8" stroke-width="4" />
    <circle cx="130" cy="100" r="14" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#FFFBEB'),
  sleep: wrapSvg(`
    <circle cx="100" cy="104" r="56" fill="#C4B5FD" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 104, 1.05, 'sleepy')}
    <text x="148" y="54" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#6366F1">Z</text>
  `, '#F5F3FF'),
  hug: wrapSvg(`
    <path d="M100 160 C60 132 32 104 32 72 C32 50 50 36 70 36 C84 36 94 44 100 56 C106 44 116 36 130 36 C150 36 168 50 168 72 C168 104 140 132 100 160 Z" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M64 104 Q100 124 136 104" fill="none" stroke="#FFFFFF" stroke-width="8" />
    ${kawaiiFace(100, 86, 0.85)}
  `, '#FDF2F8'),

  // Actions
  run: wrapSvg(`
    <circle cx="106" cy="54" r="22" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M96 76 L86 118 L54 144 M86 118 L122 132 L134 162 M96 86 L62 100 M96 86 L136 92" fill="none" stroke="#3B82F6" stroke-width="14" />
    <line x1="34" y1="74" x2="64" y2="74" stroke="#FACC15" stroke-width="5" />
    <line x1="28" y1="92" x2="54" y2="92" stroke="#FACC15" stroke-width="5" />
  `, '#EFF6FF'),
  jump: wrapSvg(`
    <circle cx="100" cy="52" r="22" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M100 74 L100 114 L74 144 M100 114 L126 144 M100 84 L62 60 M100 84 L138 60" fill="none" stroke="#EC4899" stroke-width="14" />
    <path d="M74 164 L100 152 L126 164" fill="none" stroke="#FACC15" stroke-width="5" />
  `, '#FDF2F8'),
  swim: wrapSvg(`
    <path d="M26 130 Q52 114 78 130 Q104 146 130 130 Q156 114 176 130" fill="none" stroke="#3B82F6" stroke-width="10" />
    <circle cx="76" cy="94" r="20" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M96 108 Q126 96 148 112" fill="none" stroke="#FF922B" stroke-width="16" />
  `, '#EFF6FF'),
  dance: wrapSvg(`
    <circle cx="100" cy="54" r="22" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M100 76 L100 120 L74 156 M100 120 L134 140 M100 86 L60 72 M100 86 L138 66" fill="none" stroke="#A855F7" stroke-width="14" />
    <text x="148" y="64" font-size="28" fill="#EC4899">♪</text>
  `, '#FAF5FF'),
  sing: wrapSvg(`
    <circle cx="112" cy="72" r="26" fill="#CBD5E1" stroke="${OUTLINE}" stroke-width="5.5" />
    <line x1="86" y1="72" x2="138" y2="72" stroke="${OUTLINE}" stroke-width="4" />
    <rect x="90" y="96" width="22" height="62" rx="9" fill="#3B82F6" stroke="${OUTLINE}" stroke-width="5" transform="rotate(24 100 124)" />
    <text x="44" y="66" font-size="30" fill="#EC4899">🎵</text>
  `, '#EFF6FF'),
  climb: wrapSvg(`
    <line x1="68" y1="32" x2="68" y2="168" stroke="#B45309" stroke-width="8" />
    <line x1="132" y1="32" x2="132" y2="168" stroke="#B45309" stroke-width="8" />
    <line x1="68" y1="62" x2="132" y2="62" stroke="#D97706" stroke-width="7" />
    <line x1="68" y1="98" x2="132" y2="98" stroke="#D97706" stroke-width="7" />
    <line x1="68" y1="134" x2="132" y2="134" stroke="#D97706" stroke-width="7" />
  `, '#FFFBEB'),
  fly: wrapSvg(`
    <path d="M36 96 Q74 52 100 94 Q126 52 164 96 Q134 128 100 108 Q66 128 36 96 Z" fill="#FACC15" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="100" cy="98" r="14" fill="#FF922B" stroke="${OUTLINE}" stroke-width="4.5" />
  `, '#FEFCE8'),
  clap: wrapSvg(`
    ${personBust({ hair: '#5C3A21', shirt: '#F59E0B', hairStyle: 'short' })}
    <circle cx="52" cy="150" r="14" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="148" cy="150" r="14" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="4.5" />
  `, '#FFFBEB'),

  // Transport
  bus: wrapSvg(`
    <rect x="34" y="54" width="132" height="82" rx="20" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="48" y="68" width="32" height="32" rx="6" fill="#BAE6FD" stroke="${OUTLINE}" stroke-width="4" />
    <rect x="88" y="68" width="32" height="32" rx="6" fill="#BAE6FD" stroke="${OUTLINE}" stroke-width="4" />
    <rect x="128" y="68" width="24" height="48" rx="6" fill="#BAE6FD" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="66" cy="140" r="18" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="134" cy="140" r="18" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
  `, '#FEFCE8'),
  bike: wrapSvg(`
    <circle cx="58" cy="134" r="28" fill="none" stroke="${OUTLINE}" stroke-width="7" />
    <circle cx="142" cy="134" r="28" fill="none" stroke="${OUTLINE}" stroke-width="7" />
    <path d="M58 134 L94 90 L132 90 L142 134 M94 90 L102 134 L58 134 M124 72 L138 72" fill="none" stroke="#EF4444" stroke-width="7" />
    <rect x="76" y="80" width="22" height="9" rx="4" fill="#334155" />
  `, '#FEF2F2'),
  train: wrapSvg(`
    <rect x="36" y="72" width="128" height="64" rx="14" fill="#4DA6FF" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="52" y="42" width="26" height="30" rx="5" fill="#FF6B6B" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="108" y="54" width="46" height="44" rx="8" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="64" cy="142" r="16" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="142" r="16" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="136" cy="142" r="16" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
  `, '#EFF6FF'),
  plane: wrapSvg(`
    <g transform="rotate(-18 100 100)">
      <polygon points="82,86 58,40 84,40 116,86" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="5" />
      <polygon points="82,114 58,160 84,160 116,114" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="5" />
      <ellipse cx="102" cy="100" rx="64" ry="20" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
      <circle cx="132" cy="96" r="6" fill="#60A5FA" />
    </g>
  `, '#EFF6FF'),
  boat: wrapSvg(`
    <polygon points="100,36 100,114 146,114" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5" />
    <polygon points="94,48 94,114 56,114" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M36 122 L164 122 L144 156 L56 156 Z" fill="#4DA6FF" stroke="${OUTLINE}" stroke-width="5.5" />
  `, '#ECFEFF'),
  taxi: wrapSvg(`
    <rect x="82" y="46" width="36" height="16" rx="5" fill="#FACC15" stroke="${OUTLINE}" stroke-width="4" />
    <path d="M54 94 L72 62 L128 62 L148 94 Z" fill="#FDE047" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="32" y="92" width="136" height="44" rx="16" fill="#FACC15" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="66" cy="138" r="18" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="134" cy="138" r="18" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
  `, '#FEFCE8'),
  truck: wrapSvg(`
    <rect x="30" y="64" width="88" height="72" rx="12" fill="#51CF66" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M118 82 L154 82 L168 108 L168 136 L118 136 Z" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="66" cy="140" r="18" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="142" cy="140" r="18" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
  `, '#ECFDF5'),
  van: wrapSvg(`
    <rect x="34" y="66" width="132" height="70" rx="22" fill="#A78BFA" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="50" y="80" width="36" height="28" rx="6" fill="#BAE6FD" stroke="${OUTLINE}" stroke-width="4" />
    <rect x="96" y="80" width="46" height="28" rx="6" fill="#BAE6FD" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="68" cy="140" r="18" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="134" cy="140" r="18" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
  `, '#F5F3FF'),

  // Weather, Nature, Park, Party, Phonics
  sun: wrapSvg(`
    ${[0,45,90,135,180,225,270,315].map(a => `<line x1="100" y1="24" x2="100" y2="42" stroke="#FF922B" stroke-width="8" transform="rotate(${a} 100 100)" />`).join('')}
    <circle cx="100" cy="100" r="46" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 102, 0.9)}
  `, '#FEFCE8'),
  sunny: wrapSvg(`
    ${[0,45,90,135,180,225,270,315].map(a => `<line x1="100" y1="24" x2="100" y2="42" stroke="#FF922B" stroke-width="8" transform="rotate(${a} 100 100)" />`).join('')}
    <circle cx="100" cy="100" r="46" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 102, 0.9)}
  `, '#FEFCE8'),
  cloudy: wrapSvg(`
    <path d="M54 134 C36 134 26 120 30 104 C34 90 48 84 60 88 C66 64 92 54 114 66 C128 60 150 72 150 92 C166 94 174 112 166 126 C162 132 154 134 144 134 Z" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 108, 0.8)}
  `, '#EFF6FF'),
  rainy: wrapSvg(`
    <path d="M54 108 C36 108 26 94 30 78 C34 64 48 58 60 62 C66 38 92 28 114 40 C128 34 150 46 150 66 C166 68 174 86 166 100 C162 106 154 108 144 108 Z" fill="#CBD5E1" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M68 124 Q60 144 68 150 Q76 144 68 124 Z" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="3.5" />
    <path d="M100 130 Q92 150 100 156 Q108 150 100 130 Z" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="3.5" />
    <path d="M132 124 Q124 144 132 150 Q140 144 132 124 Z" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#EFF6FF'),
  windy: wrapSvg(`
    <path d="M34 84 L126 84 C144 84 144 60 124 60 C114 60 110 68 114 72" fill="none" stroke="#60A5FA" stroke-width="9" />
    <path d="M44 112 L148 112 C166 112 166 136 146 136 C136 136 132 128 136 124" fill="none" stroke="#38BDF8" stroke-width="9" />
    <path d="M56 140 L108 140" fill="none" stroke="#93C5FD" stroke-width="8" />
  `, '#ECFEFF'),
  hot: wrapSvg(`
    <rect x="86" y="34" width="28" height="96" rx="14" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="140" r="24" fill="#EF4444" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="94" y="54" width="12" height="84" rx="6" fill="#EF4444" />
  `, '#FEF2F2'),
  cold: wrapSvg(`
    <line x1="100" y1="32" x2="100" y2="168" stroke="#38BDF8" stroke-width="9" />
    <line x1="38" y1="66" x2="162" y2="134" stroke="#38BDF8" stroke-width="9" />
    <line x1="162" y1="66" x2="38" y2="134" stroke="#38BDF8" stroke-width="9" />
    <circle cx="100" cy="100" r="14" fill="#FFFFFF" stroke="#0284C7" stroke-width="5" />
  `, '#ECFEFF'),
  moon: wrapSvg(`
    <path d="M126 44 C82 40 50 76 56 118 C62 154 98 172 134 156 C104 150 92 126 96 98 C100 72 114 54 126 44 Z" fill="#FDE047" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="136" cy="76" r="6" fill="#FACC15" />
  `, '#EEF2FF'),
  tree: wrapSvg(`
    <rect x="86" y="108" width="28" height="58" rx="8" fill="#B45309" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="72" cy="90" r="34" fill="#51CF66" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="128" cy="90" r="34" fill="#51CF66" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="62" r="38" fill="#69DB7C" stroke="${OUTLINE}" stroke-width="5" />
  `, '#ECFDF5'),
  flower: wrapSvg(`
    <line x1="100" y1="100" x2="100" y2="168" stroke="#22C55E" stroke-width="8" />
    <circle cx="100" cy="56" r="22" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="134" cy="84" r="22" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="122" cy="122" r="22" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="78" cy="122" r="22" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="66" cy="84" r="22" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="100" cy="92" r="22" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5" />
    ${kawaiiFace(100, 94, 0.55)}
  `, '#FDF2F8'),
  slide: wrapSvg(`
    <rect x="46" y="48" width="16" height="114" rx="6" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M58 58 Q106 62 126 112 Q136 142 162 146 L162 162 Q122 158 110 122 Q94 78 58 76 Z" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5" />
  `, '#FDF2F8'),
  swing: wrapSvg(`
    <line x1="46" y1="164" x2="72" y2="42" stroke="${OUTLINE}" stroke-width="7" />
    <line x1="154" y1="164" x2="128" y2="42" stroke="${OUTLINE}" stroke-width="7" />
    <line x1="66" y1="42" x2="134" y2="42" stroke="#EF4444" stroke-width="8" />
    <line x1="82" y1="42" x2="82" y2="134" stroke="#94A3B8" stroke-width="4" />
    <line x1="118" y1="42" x2="118" y2="134" stroke="#94A3B8" stroke-width="4" />
    <rect x="70" y="130" width="60" height="14" rx="6" fill="#FACC15" stroke="${OUTLINE}" stroke-width="4.5" />
  `, '#FEFCE8'),
  grass: wrapSvg(`
    <path d="M40 156 Q46 96 64 78 Q66 114 78 132 Q88 76 104 58 Q108 106 116 128 Q134 80 154 74 Q152 122 160 156 Z" fill="#51CF66" stroke="${OUTLINE}" stroke-width="5.5" />
  `, '#ECFDF5'),
  starfish: wrapSvg(`
    <polygon points="100,32 120,76 168,82 132,116 142,164 100,140 58,164 68,116 32,82 80,76" fill="#FF922B" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 106, 0.8)}
  `, '#FFF7ED'),
  shell: wrapSvg(`
    <path d="M40 124 C36 74 68 46 100 46 C132 46 164 74 160 124 L132 152 L68 152 Z" fill="#FDE68A" stroke="${OUTLINE}" stroke-width="5.5" />
    <line x1="100" y1="48" x2="100" y2="152" stroke="${OUTLINE}" stroke-width="4" />
    <line x1="72" y1="58" x2="86" y2="152" stroke="${OUTLINE}" stroke-width="4" />
    <line x1="128" y1="58" x2="114" y2="152" stroke="${OUTLINE}" stroke-width="4" />
  `, '#FEFCE8'),
  candle: wrapSvg(`
    <rect x="78" y="80" width="44" height="86" rx="10" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M100 32 Q120 56 100 72 Q80 56 100 32 Z" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="4.5" />
  `, '#FDF2F8'),
  balloon: wrapSvg(`
    <path d="M100 132 Q112 156 96 176" fill="none" stroke="${OUTLINE}" stroke-width="4" />
    <ellipse cx="100" cy="84" rx="46" ry="52" fill="#FF5E57" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="80" cy="64" rx="8" ry="14" fill="#FFFFFF" opacity="0.45" transform="rotate(20 80 64)" />
    ${kawaiiFace(100, 88, 0.8)}
  `, '#FEF2F2'),
  present: wrapSvg(`
    <rect x="48" y="76" width="104" height="86" rx="14" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="40" y="58" width="120" height="24" rx="8" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="92" y="58" width="16" height="104" fill="#FACC15" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="84" cy="46" r="14" fill="#FACC15" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="116" cy="46" r="14" fill="#FACC15" stroke="${OUTLINE}" stroke-width="4.5" />
  `, '#EFF6FF'),
  gift: wrapSvg(`
    <rect x="48" y="76" width="104" height="86" rx="14" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="40" y="58" width="120" height="24" rx="8" fill="#FFB3C6" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="92" y="58" width="16" height="104" fill="#FACC15" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="84" cy="46" r="14" fill="#FACC15" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="116" cy="46" r="14" fill="#FACC15" stroke="${OUTLINE}" stroke-width="4.5" />
  `, '#FDF2F8'),
  'party-hat': wrapSvg(`
    <circle cx="100" cy="36" r="14" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="4.5" />
    <polygon points="100,44 154,158 46,158" fill="#A855F7" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="96" cy="100" r="8" fill="#FACC15" />
    <circle cx="118" cy="134" r="9" fill="#FF85B3" />
    <circle cx="76" cy="136" r="8" fill="#60A5FA" />
  `, '#FAF5FF'),
  card: wrapSvg(`
    <rect x="42" y="56" width="116" height="88" rx="14" fill="#FFFBEB" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M44 60 L100 106 L156 60" fill="none" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M100 112 C90 102 82 94 82 86 C82 80 87 76 92 76 C96 76 99 79 100 82 C101 79 104 76 108 76 C113 76 118 80 118 86 C118 94 110 102 100 112 Z" fill="#EF4444" stroke="${OUTLINE}" stroke-width="3" />
  `, '#FFF1F2'),
  nest: wrapSvg(`
    <ellipse cx="90" cy="84" rx="16" ry="20" fill="#BAE6FD" stroke="${OUTLINE}" stroke-width="4.5" />
    <ellipse cx="114" cy="86" rx="16" ry="20" fill="#FDE68A" stroke="${OUTLINE}" stroke-width="4.5" />
    <path d="M40 100 L160 100 Q152 152 100 152 Q48 152 40 100 Z" fill="#B45309" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M48 118 Q100 132 152 118" fill="none" stroke="#78350F" stroke-width="5" />
  `, '#FFFBEB'),
  umbrella: wrapSvg(`
    <path d="M100 96 L100 150 Q100 166 116 164 Q126 162 124 150" fill="none" stroke="${OUTLINE}" stroke-width="7" />
    <path d="M32 100 C34 54 64 36 100 36 C136 36 166 54 168 100 Q146 88 134 100 Q112 88 100 100 Q88 88 66 100 Q54 88 32 100 Z" fill="#FF6B8B" stroke="${OUTLINE}" stroke-width="5.5" />
  `, '#FDF2F8'),
  web: wrapSvg(`
    <circle cx="100" cy="100" r="64" fill="none" stroke="#64748B" stroke-width="4" />
    <circle cx="100" cy="100" r="42" fill="none" stroke="#64748B" stroke-width="4" />
    <circle cx="100" cy="100" r="20" fill="none" stroke="#64748B" stroke-width="4" />
    <line x1="36" y1="100" x2="164" y2="100" stroke="#64748B" stroke-width="4" />
    <line x1="100" y1="36" x2="100" y2="164" stroke="#64748B" stroke-width="4" />
    <line x1="54" y1="54" x2="146" y2="146" stroke="#64748B" stroke-width="4" />
    <line x1="146" y1="54" x2="54" y2="146" stroke="#64748B" stroke-width="4" />
  `, '#F8FAFC'),
  box: wrapSvg(`
    <polygon points="40,76 100,48 160,76 100,104" fill="#FDE68A" stroke="${OUTLINE}" stroke-width="5" />
    <polygon points="40,76 100,104 100,162 40,134" fill="#F59E0B" stroke="${OUTLINE}" stroke-width="5" />
    <polygon points="160,76 100,104 100,162 160,134" fill="#D97706" stroke="${OUTLINE}" stroke-width="5" />
  `, '#FFFBEB'),
};

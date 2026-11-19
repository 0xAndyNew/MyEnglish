import { OUTLINE, kawaiiFace, personBust, wrapSvg } from './primitives.mjs';

function paintSplash(hex, mood = 'happy') {
  return wrapSvg(`
    <path d="M100 32 C122 32 134 52 146 58 C164 66 168 90 156 108 C166 128 150 154 128 152 C112 168 84 166 72 150 C48 154 34 132 44 110 C34 90 44 64 64 58 C74 44 86 32 100 32 Z"
      fill="${hex}" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="76" cy="64" rx="10" ry="6" fill="#FFFFFF" opacity="0.45" transform="rotate(-25 76 64)" />
    <circle cx="156" cy="46" r="8" fill="${hex}" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="44" cy="154" r="6" fill="${hex}" stroke="${OUTLINE}" stroke-width="4" />
    ${kawaiiFace(100, 102, 0.95, mood)}
  `, '#FFF9EE');
}

function numberCard(num, fillHex, dotHex) {
  const dots = [];
  const cols = num <= 5 ? num : Math.ceil(num / 2);
  for (let i = 0; i < num; i++) {
    const row = num <= 5 ? 0 : Math.floor(i / cols);
    const col = num <= 5 ? i : i % cols;
    const rowLen = num <= 5 ? num : row === 0 ? cols : num - cols;
    const x = 100 + (col - (rowLen - 1) / 2) * 22;
    const y = num <= 5 ? 158 : 148 + row * 20;
    dots.push(`<circle cx="${x}" cy="${y}" r="7.5" fill="${dotHex}" stroke="${OUTLINE}" stroke-width="3" />`);
  }
  return wrapSvg(`
    <rect x="26" y="24" width="148" height="152" rx="34" fill="#FFFFFF" stroke="${fillHex}" stroke-width="6" />
    <text x="100" y="106" text-anchor="middle" font-family="'Baloo 2', 'Comic Sans MS', Arial, sans-serif" font-weight="800" font-size="${num === 10 ? 78 : 92}" fill="${fillHex}" stroke="${OUTLINE}" stroke-width="4.5">${num}</text>
    ${dots.join('')}
  `, '#F0F7FF');
}

export const SHAPES_1 = {
  // Colors
  red: paintSplash('#FF5E57'),
  blue: paintSplash('#4DA6FF'),
  yellow: paintSplash('#FFD43B'),
  green: paintSplash('#51CF66'),
  pink: paintSplash('#FF85B3'),
  'orange-color': paintSplash('#FF922B'),

  // Numbers 1–10
  one: numberCard(1, '#FF6B6B', '#FFD43B'),
  two: numberCard(2, '#FF922B', '#74C0FC'),
  three: numberCard(3, '#FCC419', '#69DB7C'),
  four: numberCard(4, '#51CF66', '#FF85B3'),
  five: numberCard(5, '#339AF0', '#FFD43B'),
  six: numberCard(6, '#845EF7', '#74C0FC'),
  seven: numberCard(7, '#F06595', '#FFD43B'),
  eight: numberCard(8, '#20C997', '#FF922B'),
  nine: numberCard(9, '#FF6B6B', '#74C0FC'),
  ten: numberCard(10, '#5C7CFA', '#FFD43B'),

  // Shapes
  circle: wrapSvg(`
    <circle cx="100" cy="100" r="62" fill="#FF85A1" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="76" cy="64" rx="14" ry="7" fill="#FFFFFF" opacity="0.45" transform="rotate(-30 76 64)" />
    ${kawaiiFace(100, 102, 1)}
  `, '#FFF0F5'),
  square: wrapSvg(`
    <rect x="42" y="42" width="116" height="116" rx="18" fill="#74C0FC" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="52" y="52" width="24" height="10" rx="5" fill="#FFFFFF" opacity="0.45" />
    ${kawaiiFace(100, 102, 1)}
  `, '#EFF6FF'),
  triangle: wrapSvg(`
    <path d="M100 32 L164 152 Q168 160 158 160 L42 160 Q32 160 36 152 Z" fill="#69DB7C" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 118, 0.9)}
  `, '#ECFDF5'),
  star: wrapSvg(`
    <polygon points="100,26 121,72 172,78 134,113 144,164 100,139 56,164 66,113 28,78 79,72" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 104, 0.85)}
  `, '#FEFCE8'),
  heart: wrapSvg(`
    <path d="M100 162 C62 134 32 106 32 74 C32 50 50 36 70 36 C84 36 94 44 100 56 C106 44 116 36 130 36 C150 36 168 50 168 74 C168 106 138 134 100 162 Z" fill="#FF6B8B" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 92, 0.9)}
  `, '#FFF1F2'),
  rectangle: wrapSvg(`
    <rect x="24" y="56" width="152" height="88" rx="16" fill="#FFA94D" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="36" y="66" width="30" height="8" rx="4" fill="#FFFFFF" opacity="0.45" />
    ${kawaiiFace(100, 102, 0.95)}
  `, '#FFF7ED'),

  // Body parts
  eyes: wrapSvg(`
    <ellipse cx="68" cy="100" rx="28" ry="34" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="132" cy="100" rx="28" ry="34" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="72" cy="104" r="15" fill="#4DA6FF" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="136" cy="104" r="15" fill="#4DA6FF" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="72" cy="104" r="7" fill="${OUTLINE}" />
    <circle cx="136" cy="104" r="7" fill="${OUTLINE}" />
    <circle cx="67" cy="96" r="5" fill="#FFFFFF" />
    <circle cx="131" cy="96" r="5" fill="#FFFFFF" />
    <path d="M48 64 Q68 52 88 64" fill="none" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M112 64 Q132 52 152 64" fill="none" stroke="${OUTLINE}" stroke-width="5" />
  `, '#EFF6FF'),
  nose: wrapSvg(`
    <circle cx="100" cy="100" r="58" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="100" cy="106" rx="18" ry="14" fill="#FFB5A7" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="92" cy="108" r="3" fill="${OUTLINE}" />
    <circle cx="108" cy="108" r="3" fill="${OUTLINE}" />
    <circle cx="72" cy="84" r="4.5" fill="${OUTLINE}" />
    <circle cx="128" cy="84" r="4.5" fill="${OUTLINE}" />
    <path d="M84 132 Q100 142 116 132" fill="none" stroke="${OUTLINE}" stroke-width="4" />
  `, '#FFF5F5'),
  mouth: wrapSvg(`
    <circle cx="100" cy="100" r="58" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M64 102 Q100 148 136 102 Q100 112 64 102 Z" fill="#FF5D8F" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M82 124 Q100 114 118 124 Q100 132 82 124 Z" fill="#FF9EB5" />
    <rect x="82" y="103" width="36" height="8" rx="3" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="2.5" />
    <ellipse cx="64" cy="92" rx="8" ry="5" fill="#FF9EB5" opacity="0.7" />
    <ellipse cx="136" cy="92" rx="8" ry="5" fill="#FF9EB5" opacity="0.7" />
  `, '#FFF0F5'),
  hands: wrapSvg(`
    <g transform="rotate(-12 68 106)">
      <path d="M44 118 L44 82 Q44 74 51 74 Q58 74 58 82 L58 70 Q58 62 65 62 Q72 62 72 70 L72 68 Q72 60 79 60 Q86 60 86 68 L86 80 Q86 72 92 72 Q98 72 98 80 L98 118 Q98 142 71 142 Q44 142 44 118 Z" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="4.5" />
    </g>
    <g transform="rotate(12 132 106)">
      <path d="M102 118 L102 80 Q102 72 108 72 Q114 72 114 80 L114 68 Q114 60 121 60 Q128 60 128 68 L128 70 Q128 62 135 62 Q142 62 142 70 L142 82 Q142 74 149 74 Q156 74 156 82 L156 118 Q156 142 129 142 Q102 142 102 118 Z" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="4.5" />
    </g>
    <path d="M96 42 L100 32 L104 42 M82 48 L74 38 M118 48 L126 38" stroke="#FACC15" stroke-width="4.5" />
  `, '#FFFBEB'),
  head: wrapSvg(personBust({ hair: '#6D4C3D', shirt: '#60A5FA', hairStyle: 'short' }), '#EFF6FF'),
  shoulders: wrapSvg(`
    ${personBust({ hair: '#6D4C3D', shirt: '#34D399', hairStyle: 'short' })}
    <path d="M36 132 L54 142 M164 132 L146 142" stroke="#F59E0B" stroke-width="5" />
    <circle cx="58" cy="144" r="6" fill="#FACC15" stroke="${OUTLINE}" stroke-width="3" />
    <circle cx="142" cy="144" r="6" fill="#FACC15" stroke="${OUTLINE}" stroke-width="3" />
  `, '#ECFDF5'),
  knees: wrapSvg(`
    <path d="M62 42 L86 42 L86 158 L62 158 Z" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M114 42 L138 42 L138 158 L114 158 Z" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M58 40 L142 40 L144 82 L108 82 L100 66 L92 82 L56 82 Z" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="74" cy="108" r="14" fill="#FFB5A7" stroke="${OUTLINE}" stroke-width="4" opacity="0.8" />
    <circle cx="126" cy="108" r="14" fill="#FFB5A7" stroke="${OUTLINE}" stroke-width="4" opacity="0.8" />
  `, '#FFF7ED'),
  toes: wrapSvg(`
    <ellipse cx="102" cy="122" rx="34" ry="44" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="76" cy="64" r="11" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="96" cy="58" r="9.5" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="114" cy="62" r="8.5" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="130" cy="70" r="7.5" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="142" cy="82" r="6.5" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="4.5" />
  `, '#FFF1F2'),
  ears: wrapSvg(`
    <path d="M74 60 C46 56 40 94 52 120 C60 140 80 146 92 132 C100 122 96 106 86 102 C76 98 84 80 90 74 C94 66 86 60 74 60 Z" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M68 78 C58 84 58 106 68 118" fill="none" stroke="${OUTLINE}" stroke-width="4.5" />
    <path d="M126 60 C154 56 160 94 148 120 C140 140 120 146 108 132 C100 122 104 106 114 102 C124 98 116 80 110 74 C106 66 114 60 126 60 Z" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M132 78 C142 84 142 106 132 118" fill="none" stroke="${OUTLINE}" stroke-width="4.5" />
  `, '#FFF7ED'),

  // Family & People & Jobs
  mommy: wrapSvg(personBust({ hair: '#4A2C1D', shirt: '#FF85A1', hairStyle: 'long' }), '#FFF0F5'),
  daddy: wrapSvg(personBust({ hair: '#3E2723', shirt: '#4DA6FF', hairStyle: 'short', glasses: true }), '#EFF6FF'),
  brother: wrapSvg(personBust({ hair: '#5C3A21', shirt: '#51CF66', hairStyle: 'short' }), '#ECFDF5'),
  sister: wrapSvg(personBust({ hair: '#5C3A21', shirt: '#F472B6', hairStyle: 'pigtails' }), '#FDF2F8'),
  grandma: wrapSvg(personBust({ hair: '#CBD5E1', shirt: '#A78BFA', hairStyle: 'bun', glasses: true }), '#F5F3FF'),
  grandpa: wrapSvg(personBust({ hair: '#CBD5E1', shirt: '#FBBF24', hairStyle: 'short', glasses: true, accessory: `<path d="M84 114 Q100 106 116 114" fill="none" stroke="#CBD5E1" stroke-width="6" />` }), '#FFFBEB'),
  baby: wrapSvg(personBust({ hair: '#78350F', shirt: '#93C5FD', hairStyle: 'curl', accessory: `<circle cx="100" cy="112" r="7" fill="#FDE047" stroke="${OUTLINE}" stroke-width="3" />` }), '#EFF6FF'),
  girl: wrapSvg(personBust({ hair: '#6D4C3D', shirt: '#FB7185', hairStyle: 'pigtails' }), '#FFF1F2'),
  friend: wrapSvg(`
    <g transform="translate(-26 8) scale(0.82)">${personBust({ hair: '#5C3A21', shirt: '#60A5FA', hairStyle: 'short' })}</g>
    <g transform="translate(56 8) scale(0.82)">${personBust({ hair: '#5C3A21', shirt: '#FF85A1', hairStyle: 'pigtails' })}</g>
  `, '#FFFBEB'),
  friends: wrapSvg(`
    <g transform="translate(-26 8) scale(0.82)">${personBust({ hair: '#5C3A21', shirt: '#60A5FA', hairStyle: 'short' })}</g>
    <g transform="translate(56 8) scale(0.82)">${personBust({ hair: '#5C3A21', shirt: '#FF85A1', hairStyle: 'pigtails' })}</g>
  `, '#FFFBEB'),
  teacher: wrapSvg(personBust({ hair: '#4A2C1D', shirt: '#34D399', hairStyle: 'bun', glasses: true, accessory: `<rect x="122" y="126" width="38" height="44" rx="5" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="4" /><line x1="141" y1="126" x2="141" y2="170" stroke="#FFFFFF" stroke-width="3" />` }), '#ECFDF5'),
  doctor: wrapSvg(personBust({ hair: '#4A2C1D', shirt: '#FFFFFF', hairStyle: 'long', accessory: `<path d="M74 134 Q74 162 100 162 Q126 162 126 134" fill="none" stroke="#3B82F6" stroke-width="5" /><circle cx="100" cy="164" r="8" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="3.5" />` }), '#EFF6FF'),
  nurse: wrapSvg(personBust({ hair: '#5C3A21', shirt: '#FCA5A5', hairStyle: 'bun', hat: 'nurse' }), '#FFF1F2'),
  cook: wrapSvg(personBust({ hair: '#5C3A21', shirt: '#FFFFFF', hairStyle: 'short', hat: 'chef', accessory: `<path d="M84 140 L100 150 L116 140" fill="none" stroke="#EF4444" stroke-width="5" />` }), '#FFF7ED'),
  farmer: wrapSvg(personBust({ hair: '#5C3A21', shirt: '#60A5FA', hairStyle: 'short', hat: 'straw' }), '#ECFDF5'),
  'police-officer': wrapSvg(personBust({ hair: '#3E2723', shirt: '#3B82F6', hairStyle: 'short', hat: 'police', accessory: `<polygon points="122,146 125,152 132,153 127,157 128,164 122,160 116,164 117,157 112,153 119,152" fill="#FACC15" stroke="${OUTLINE}" stroke-width="2" />` }), '#EFF6FF'),
  firefighter: wrapSvg(personBust({ hair: '#3E2723', shirt: '#EF4444', hairStyle: 'short', hat: 'fire', accessory: `<rect x="64" y="148" width="72" height="10" rx="3" fill="#FACC15" stroke="${OUTLINE}" stroke-width="3" />` }), '#FEF2F2'),
  driver: wrapSvg(personBust({ hair: '#3E2723', shirt: '#FBBF24', hairStyle: 'short', accessory: `<circle cx="100" cy="158" r="22" fill="none" stroke="${OUTLINE}" stroke-width="5.5" /><line x1="78" y1="158" x2="122" y2="158" stroke="${OUTLINE}" stroke-width="4" /><line x1="100" y1="158" x2="100" y2="180" stroke="${OUTLINE}" stroke-width="4" />` }), '#FFFBEB'),
  queen: wrapSvg(personBust({ hair: '#6D4C3D', shirt: '#A855F7', hairStyle: 'long', hat: 'crown' }), '#FAF5FF'),

  // Feelings
  happy: wrapSvg(`
    <circle cx="100" cy="100" r="62" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 102, 1.15, 'open')}
  `, '#FEFCE8'),
  sad: wrapSvg(`
    <circle cx="100" cy="100" r="62" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 102, 1.15, 'sad')}
  `, '#EFF6FF'),
  angry: wrapSvg(`
    <circle cx="100" cy="100" r="62" fill="#FF6B6B" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 102, 1.15, 'angry')}
  `, '#FEF2F2'),
  sleepy: wrapSvg(`
    <circle cx="100" cy="100" r="62" fill="#C4B5FD" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 102, 1.15, 'sleepy')}
    <text x="150" y="54" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="#6366F1">Z</text>
    <text x="166" y="40" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="#818CF8">z</text>
  `, '#F5F3FF'),
  hungry: wrapSvg(`
    <circle cx="100" cy="100" r="62" fill="#FDBA74" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 102, 1.15, 'hungry')}
  `, '#FFF7ED'),
  scared: wrapSvg(`
    <circle cx="100" cy="100" r="62" fill="#A5F3FC" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 102, 1.15, 'scared')}
  `, '#ECFEFF'),
};

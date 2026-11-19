import { OUTLINE, kawaiiFace, wrapSvg } from './primitives.mjs';

export const SHAPES_2 = {
  // Farm & Pets & Wild Animals & Sea
  dog: wrapSvg(`
    <ellipse cx="48" cy="84" rx="18" ry="34" fill="#D97706" stroke="${OUTLINE}" stroke-width="5" transform="rotate(14 48 84)" />
    <ellipse cx="152" cy="84" rx="18" ry="34" fill="#D97706" stroke="${OUTLINE}" stroke-width="5" transform="rotate(-14 152 84)" />
    <circle cx="100" cy="102" r="52" fill="#FBBF24" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="100" cy="118" rx="26" ry="20" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="4" />
    <ellipse cx="100" cy="110" rx="10" ry="7" fill="${OUTLINE}" />
    <circle cx="78" cy="88" r="5" fill="${OUTLINE}" />
    <circle cx="122" cy="88" r="5" fill="${OUTLINE}" />
    <circle cx="76" cy="86" r="1.8" fill="#FFFFFF" />
    <circle cx="120" cy="86" r="1.8" fill="#FFFFFF" />
    <path d="M90 123 Q100 132 110 123" fill="none" stroke="${OUTLINE}" stroke-width="3.5" />
    <ellipse cx="66" cy="102" rx="7" ry="4" fill="#FF9EB5" opacity="0.7" />
    <ellipse cx="134" cy="102" rx="7" ry="4" fill="#FF9EB5" opacity="0.7" />
  `, '#FFFBEB'),
  cat: wrapSvg(`
    <polygon points="48,80 54,34 86,62" fill="#FFA94D" stroke="${OUTLINE}" stroke-width="5" />
    <polygon points="152,80 146,34 114,62" fill="#FFA94D" stroke="${OUTLINE}" stroke-width="5" />
    <polygon points="55,70 59,46 78,62" fill="#FF9EB5" />
    <polygon points="145,70 141,46 122,62" fill="#FF9EB5" />
    <ellipse cx="100" cy="108" rx="54" ry="46" fill="#FFB366" stroke="${OUTLINE}" stroke-width="5.5" />
    <line x1="34" y1="106" x2="62" y2="110" stroke="${OUTLINE}" stroke-width="3.5" />
    <line x1="34" y1="118" x2="62" y2="118" stroke="${OUTLINE}" stroke-width="3.5" />
    <line x1="166" y1="106" x2="138" y2="110" stroke="${OUTLINE}" stroke-width="3.5" />
    <line x1="166" y1="118" x2="138" y2="118" stroke="${OUTLINE}" stroke-width="3.5" />
    <polygon points="94,110 106,110 100,117" fill="#FF6B8B" stroke="${OUTLINE}" stroke-width="3" />
    ${kawaiiFace(100, 108, 0.95)}
  `, '#FFF7ED'),
  duck: wrapSvg(`
    <ellipse cx="100" cy="134" rx="46" ry="34" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="100" cy="78" r="36" fill="#FFE066" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M94 42 Q100 28 110 42" fill="#FFE066" stroke="${OUTLINE}" stroke-width="4.5" />
    <ellipse cx="100" cy="92" rx="18" ry="10" fill="#FF922B" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="82" cy="72" r="4.5" fill="${OUTLINE}" />
    <circle cx="118" cy="72" r="4.5" fill="${OUTLINE}" />
    <ellipse cx="72" cy="82" rx="6" ry="3.5" fill="#FF9EB5" opacity="0.7" />
    <ellipse cx="128" cy="82" rx="6" ry="3.5" fill="#FF9EB5" opacity="0.7" />
  `, '#FEFCE8'),
  cow: wrapSvg(`
    <ellipse cx="48" cy="76" rx="18" ry="11" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5" transform="rotate(-20 48 76)" />
    <ellipse cx="152" cy="76" rx="18" ry="11" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5" transform="rotate(20 152 76)" />
    <path d="M68 50 Q58 32 70 32 Q78 36 80 50" fill="#FDE047" stroke="${OUTLINE}" stroke-width="4.5" />
    <path d="M132 50 Q142 32 130 32 Q122 36 120 50" fill="#FDE047" stroke="${OUTLINE}" stroke-width="4.5" />
    <ellipse cx="100" cy="100" rx="52" ry="48" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M64 62 Q86 64 82 86 Q64 90 54 78 Z" fill="#4B5563" />
    <circle cx="132" cy="78" r="12" fill="#4B5563" />
    <ellipse cx="100" cy="126" rx="34" ry="22" fill="#FFB5C5" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="88" cy="124" r="4" fill="${OUTLINE}" />
    <circle cx="112" cy="124" r="4" fill="${OUTLINE}" />
    <circle cx="80" cy="90" r="4.5" fill="${OUTLINE}" />
    <circle cx="120" cy="90" r="4.5" fill="${OUTLINE}" />
  `, '#F0FDF4'),
  pig: wrapSvg(`
    <polygon points="48,74 56,36 86,58" fill="#FF9EB5" stroke="${OUTLINE}" stroke-width="5" />
    <polygon points="152,74 144,36 114,58" fill="#FF9EB5" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="104" r="54" fill="#FFB3C6" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="100" cy="114" rx="22" ry="15" fill="#FF85A1" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="92" cy="114" r="3.8" fill="${OUTLINE}" />
    <circle cx="108" cy="114" r="3.8" fill="${OUTLINE}" />
    <circle cx="76" cy="90" r="4.8" fill="${OUTLINE}" />
    <circle cx="124" cy="90" r="4.8" fill="${OUTLINE}" />
    <path d="M88 136 Q100 144 112 136" fill="none" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#FFF1F2'),
  sheep: wrapSvg(`
    <circle cx="62" cy="68" r="24" fill="#F8FAFC" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="138" cy="68" r="24" fill="#F8FAFC" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="54" cy="116" r="24" fill="#F8FAFC" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="146" cy="116" r="24" fill="#F8FAFC" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="100" cy="140" r="26" fill="#F8FAFC" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="100" cy="56" r="26" fill="#F8FAFC" stroke="${OUTLINE}" stroke-width="4.5" />
    <ellipse cx="44" cy="92" rx="16" ry="9" fill="#FDE68A" stroke="${OUTLINE}" stroke-width="4.5" transform="rotate(-18 44 92)" />
    <ellipse cx="156" cy="92" rx="16" ry="9" fill="#FDE68A" stroke="${OUTLINE}" stroke-width="4.5" transform="rotate(18 156 92)" />
    <ellipse cx="100" cy="102" rx="34" ry="32" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="5" />
    ${kawaiiFace(100, 102, 0.85)}
  `, '#F0FDF4'),
  horse: wrapSvg(`
    <polygon points="56,72 64,32 88,58" fill="#D97706" stroke="${OUTLINE}" stroke-width="5" />
    <polygon points="144,72 136,32 112,58" fill="#D97706" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M84 44 Q102 22 116 46 Q104 60 88 54 Z" fill="#78350F" stroke="${OUTLINE}" stroke-width="4.5" />
    <ellipse cx="100" cy="104" rx="46" ry="52" fill="#E09F5A" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="100" cy="128" rx="32" ry="24" fill="#FDE68A" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="88" cy="122" r="3.8" fill="${OUTLINE}" />
    <circle cx="112" cy="122" r="3.8" fill="${OUTLINE}" />
    <circle cx="80" cy="88" r="4.8" fill="${OUTLINE}" />
    <circle cx="120" cy="88" r="4.8" fill="${OUTLINE}" />
    <path d="M90 138 Q100 146 110 138" fill="none" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#FFFBEB'),
  chicken: wrapSvg(`
    <path d="M88 46 Q92 26 102 36 Q110 24 116 40 Q126 32 120 50 Z" fill="#EF4444" stroke="${OUTLINE}" stroke-width="4.5" />
    <ellipse cx="100" cy="116" rx="50" ry="48" fill="#FFFBEB" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M52 114 Q36 126 52 138" fill="#FDE68A" stroke="${OUTLINE}" stroke-width="4.5" />
    <path d="M148 114 Q164 126 148 138" fill="#FDE68A" stroke="${OUTLINE}" stroke-width="4.5" />
    <polygon points="92,102 108,102 100,118" fill="#FF922B" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="80" cy="92" r="4.5" fill="${OUTLINE}" />
    <circle cx="120" cy="92" r="4.5" fill="${OUTLINE}" />
    <ellipse cx="70" cy="104" rx="7" ry="4" fill="#FF9EB5" opacity="0.7" />
    <ellipse cx="130" cy="104" rx="7" ry="4" fill="#FF9EB5" opacity="0.7" />
  `, '#FEFCE8'),
  lion: wrapSvg(`
    <circle cx="100" cy="100" r="64" fill="#FF922B" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="62" cy="58" r="14" fill="#FBBF24" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="138" cy="58" r="14" fill="#FBBF24" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="100" cy="104" r="42" fill="#FDE047" stroke="${OUTLINE}" stroke-width="5" />
    <polygon points="92,106 108,106 100,114" fill="#9A3412" stroke="${OUTLINE}" stroke-width="3" />
    ${kawaiiFace(100, 102, 0.9)}
  `, '#FFF7ED'),
  tiger: wrapSvg(`
    <circle cx="56" cy="58" r="15" fill="#FF922B" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="144" cy="58" r="15" fill="#FF922B" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="104" r="54" fill="#FFA94D" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M92 52 L100 68 L108 52" fill="none" stroke="${OUTLINE}" stroke-width="5" />
    <line x1="50" y1="96" x2="66" y2="96" stroke="${OUTLINE}" stroke-width="5" />
    <line x1="150" y1="96" x2="134" y2="96" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="100" cy="122" rx="24" ry="16" fill="#FFFBEB" stroke="${OUTLINE}" stroke-width="4" />
    ${kawaiiFace(100, 102, 0.95)}
  `, '#FFF7ED'),
  elephant: wrapSvg(`
    <ellipse cx="44" cy="102" rx="26" ry="38" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="156" cy="102" rx="26" ry="38" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="96" r="46" fill="#BFDBFE" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M92 108 Q90 148 110 154 Q122 156 120 142 Q108 140 108 108 Z" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="80" cy="86" r="4.8" fill="${OUTLINE}" />
    <circle cx="120" cy="86" r="4.8" fill="${OUTLINE}" />
    <ellipse cx="70" cy="98" rx="7" ry="4" fill="#FF9EB5" opacity="0.7" />
    <ellipse cx="130" cy="98" rx="7" ry="4" fill="#FF9EB5" opacity="0.7" />
  `, '#EFF6FF'),
  monkey: wrapSvg(`
    <circle cx="44" cy="98" r="16" fill="#FDE68A" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="156" cy="98" r="16" fill="#FDE68A" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="100" r="50" fill="#B45309" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="100" cy="112" rx="38" ry="30" fill="#FDE68A" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="82" cy="86" r="14" fill="#FDE68A" />
    <circle cx="118" cy="86" r="14" fill="#FDE68A" />
    ${kawaiiFace(100, 100, 0.95)}
  `, '#FFFBEB'),
  giraffe: wrapSvg(`
    <rect x="82" y="110" width="36" height="62" rx="14" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="78" cy="40" r="8" fill="#B45309" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="122" cy="40" r="8" fill="#B45309" stroke="${OUTLINE}" stroke-width="4" />
    <line x1="84" y1="62" x2="78" y2="48" stroke="${OUTLINE}" stroke-width="5" />
    <line x1="116" y1="62" x2="122" y2="48" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="100" cy="86" rx="38" ry="34" fill="#FFE066" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="96" cy="144" r="7" fill="#D97706" />
    <circle cx="106" cy="126" r="6" fill="#D97706" />
    <ellipse cx="100" cy="104" rx="22" ry="14" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="4" />
    ${kawaiiFace(100, 86, 0.85)}
  `, '#FEFCE8'),
  zebra: wrapSvg(`
    <polygon points="56,74 62,36 86,60" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5" />
    <polygon points="144,74 138,36 114,60" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="100" cy="104" rx="46" ry="50" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M62 82 L82 88 M60 100 L80 102 M138 82 L118 88 M140 100 L120 102 M100 54 L100 72" stroke="#334155" stroke-width="6" />
    <ellipse cx="100" cy="128" rx="30" ry="20" fill="#CBD5E1" stroke="${OUTLINE}" stroke-width="4.5" />
    ${kawaiiFace(100, 100, 0.9)}
  `, '#F8FAFC'),
  bear: wrapSvg(`
    <circle cx="58" cy="58" r="18" fill="#B45309" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="142" cy="58" r="18" fill="#B45309" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="58" cy="58" r="8" fill="#FDE68A" />
    <circle cx="142" cy="58" r="8" fill="#FDE68A" />
    <circle cx="100" cy="104" r="52" fill="#D97706" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="100" cy="116" rx="24" ry="18" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="4" />
    <ellipse cx="100" cy="108" rx="9" ry="6" fill="${OUTLINE}" />
    ${kawaiiFace(100, 100, 0.95)}
  `, '#FFFBEB'),
  snake: wrapSvg(`
    <path d="M52 152 Q150 152 140 120 Q130 92 74 98 Q46 102 58 72 Q72 44 114 54" fill="none" stroke="#51CF66" stroke-width="28" />
    <path d="M52 152 Q150 152 140 120 Q130 92 74 98 Q46 102 58 72 Q72 44 114 54" fill="none" stroke="${OUTLINE}" stroke-width="34" opacity="0.2" />
    <circle cx="122" cy="60" r="24" fill="#69DB7C" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M146 66 L160 66 L166 60 M160 66 L166 72" fill="none" stroke="#EF4444" stroke-width="3.5" />
    <circle cx="116" cy="54" r="4" fill="${OUTLINE}" />
    <circle cx="132" cy="54" r="4" fill="${OUTLINE}" />
  `, '#ECFDF5'),
  rabbit: wrapSvg(`
    <ellipse cx="76" cy="54" rx="14" ry="34" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5" transform="rotate(-8 76 54)" />
    <ellipse cx="124" cy="54" rx="14" ry="34" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5" transform="rotate(8 124 54)" />
    <ellipse cx="76" cy="54" rx="7" ry="22" fill="#FF9EB5" transform="rotate(-8 76 54)" />
    <ellipse cx="124" cy="54" rx="7" ry="22" fill="#FF9EB5" transform="rotate(8 124 54)" />
    <ellipse cx="100" cy="116" rx="48" ry="42" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
    <polygon points="95,116 105,116 100,122" fill="#FF758F" />
    ${kawaiiFace(100, 114, 0.9)}
  `, '#FFF1F2'),
  goat: wrapSvg(`
    <path d="M74 52 Q62 28 76 26" fill="none" stroke="#CBD5E1" stroke-width="10" />
    <path d="M126 52 Q138 28 124 26" fill="none" stroke="#CBD5E1" stroke-width="10" />
    <ellipse cx="100" cy="106" rx="44" ry="48" fill="#F1F5F9" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M90 150 L100 172 L110 150" fill="#CBD5E1" stroke="${OUTLINE}" stroke-width="4" />
    ${kawaiiFace(100, 104, 0.9)}
  `, '#F8FAFC'),
  bird: wrapSvg(`
    <ellipse cx="100" cy="108" rx="46" ry="40" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="86" cy="116" rx="22" ry="14" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="4" />
    <polygon points="142,96 164,104 142,114" fill="#FBBF24" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="118" cy="92" r="5" fill="${OUTLINE}" />
    <circle cx="116" cy="90" r="1.8" fill="#FFFFFF" />
    <ellipse cx="114" cy="106" rx="6" ry="3.5" fill="#FF9EB5" opacity="0.7" />
  `, '#EFF6FF'),
  butterfly: wrapSvg(`
    <ellipse cx="66" cy="78" rx="34" ry="28" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="134" cy="78" rx="34" ry="28" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="72" cy="124" rx="26" ry="22" fill="#FACC15" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="128" cy="124" rx="26" ry="22" fill="#FACC15" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="92" y="64" width="16" height="78" rx="8" fill="#7C3AED" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M94 64 Q82 40 72 44 M106 64 Q118 40 128 44" fill="none" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="62" cy="76" r="10" fill="#FDE047" />
    <circle cx="138" cy="76" r="10" fill="#FDE047" />
  `, '#FDF2F8'),
  insect: wrapSvg(`
    <circle cx="100" cy="112" r="44" fill="#EF4444" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="100" cy="64" r="24" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
    <line x1="100" y1="74" x2="100" y2="156" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="78" cy="104" r="8" fill="#1E293B" />
    <circle cx="122" cy="104" r="8" fill="#1E293B" />
    <circle cx="82" cy="132" r="7" fill="#1E293B" />
    <circle cx="118" cy="132" r="7" fill="#1E293B" />
    <path d="M90 44 Q82 28 74 32 M110 44 Q118 28 126 32" fill="none" stroke="${OUTLINE}" stroke-width="4" />
  `, '#FEF2F2'),
  fish: wrapSvg(`
    <polygon points="136,100 172,72 172,128" fill="#FF922B" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="92" cy="100" rx="54" ry="38" fill="#FFA94D" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M84 62 Q98 38 112 64" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="64" cy="92" r="6" fill="${OUTLINE}" />
    <circle cx="62" cy="90" r="2" fill="#FFFFFF" />
    <path d="M56 112 Q68 120 78 112" fill="none" stroke="${OUTLINE}" stroke-width="3.5" />
    <ellipse cx="74" cy="106" rx="6" ry="3.5" fill="#FF9EB5" opacity="0.7" />
  `, '#ECFEFF'),
  crab: wrapSvg(`
    <path d="M48 86 Q28 52 48 40 Q62 52 54 70" fill="#EF4444" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M152 86 Q172 52 152 40 Q138 52 146 70" fill="#EF4444" stroke="${OUTLINE}" stroke-width="5" />
    <line x1="56" y1="128" x2="34" y2="146" stroke="${OUTLINE}" stroke-width="5" />
    <line x1="66" y1="138" x2="48" y2="158" stroke="${OUTLINE}" stroke-width="5" />
    <line x1="144" y1="128" x2="166" y2="146" stroke="${OUTLINE}" stroke-width="5" />
    <line x1="134" y1="138" x2="152" y2="158" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="100" cy="112" rx="50" ry="36" fill="#FF5E57" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 112, 0.95)}
  `, '#FEF2F2'),
  shark: wrapSvg(`
    <path d="M84 62 L106 30 L114 66" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5" />
    <polygon points="146,108 176,82 176,134" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="96" cy="108" rx="60" ry="38" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M44 120 Q96 146 146 116 Q100 132 44 120 Z" fill="#FFFFFF" />
    <circle cx="64" cy="96" r="5" fill="${OUTLINE}" />
    <path d="M52 114 Q70 124 88 114" fill="none" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#EFF6FF'),
  whale: wrapSvg(`
    <path d="M96 58 Q88 34 72 40 M104 58 Q112 34 128 40" fill="none" stroke="#60A5FA" stroke-width="5" />
    <path d="M38 114 Q38 62 100 62 Q156 62 158 110 Q162 140 100 140 Q38 140 38 114 Z" fill="#3B82F6" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M154 114 L178 96 L176 132 Z" fill="#3B82F6" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M50 122 Q100 144 146 124 Q100 134 50 122 Z" fill="#DBEAFE" />
    ${kawaiiFace(86, 102, 0.85)}
  `, '#EFF6FF'),
  octopus: wrapSvg(`
    <path d="M58 124 Q44 156 60 158 Q74 158 76 130 Q84 162 100 162 Q116 162 124 130 Q126 158 140 158 Q156 156 142 124" fill="#F472B6" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="86" r="46" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 90, 0.95)}
  `, '#FDF2F8'),
  turtle: wrapSvg(`
    <ellipse cx="52" cy="128" rx="14" ry="10" fill="#69DB7C" stroke="${OUTLINE}" stroke-width="4.5" />
    <ellipse cx="148" cy="128" rx="14" ry="10" fill="#69DB7C" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="154" cy="96" r="20" fill="#69DB7C" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M44 118 Q44 56 98 56 Q146 56 146 118 Z" fill="#22C55E" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="40" y="114" width="110" height="16" rx="8" fill="#FDE047" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="160" cy="92" r="3.5" fill="${OUTLINE}" />
    <path d="M154 104 Q162 108 166 102" fill="none" stroke="${OUTLINE}" stroke-width="3" />
  `, '#ECFDF5'),

  // Food & Drinks
  milk: wrapSvg(`
    <polygon points="62,64 100,40 138,64" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="62" y="64" width="76" height="98" rx="10" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="76" y="34" width="48" height="16" rx="5" fill="#BFDBFE" stroke="${OUTLINE}" stroke-width="4.5" />
    <rect x="64" y="100" width="72" height="30" fill="#60A5FA" opacity="0.3" />
    ${kawaiiFace(100, 114, 0.8)}
  `, '#EFF6FF'),
  apple: wrapSvg(`
    <path d="M100 54 Q102 34 118 32" fill="none" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="118" cy="44" rx="14" ry="8" fill="#51CF66" stroke="${OUTLINE}" stroke-width="4" transform="rotate(-20 118 44)" />
    <path d="M100 58 C74 44 42 62 44 102 C46 142 74 166 96 156 C98 155 102 155 104 156 C126 166 154 142 156 102 C158 62 126 44 100 58 Z" fill="#FF5E57" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="70" cy="80" rx="8" ry="14" fill="#FFFFFF" opacity="0.35" transform="rotate(20 70 80)" />
    ${kawaiiFace(100, 110, 0.9)}
  `, '#FFF1F2'),
  banana: wrapSvg(`
    <path d="M52 138 C76 158 134 146 154 88 C160 70 156 48 144 42 C136 40 136 56 130 74 C118 106 86 122 52 124 C42 124 42 132 52 138 Z" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="140" y="36" width="12" height="10" rx="3" fill="#78350F" stroke="${OUTLINE}" stroke-width="3" />
    ${kawaiiFace(116, 108, 0.65)}
  `, '#FEFCE8'),
  water: wrapSvg(`
    <path d="M100 32 C126 68 148 96 148 122 C148 148 126 168 100 168 C74 168 52 148 52 122 C52 96 74 68 100 32 Z" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="78" cy="112" rx="7" ry="14" fill="#FFFFFF" opacity="0.45" transform="rotate(15 78 112)" />
    ${kawaiiFace(100, 122, 0.85)}
  `, '#EFF6FF'),
  bread: wrapSvg(`
    <path d="M44 96 C38 66 64 46 100 46 C136 46 162 66 156 96 L148 156 Q146 164 136 164 L64 164 Q54 164 52 156 Z" fill="#F59E0B" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M56 102 C52 78 72 62 100 62 C128 62 148 78 144 102 L138 152 L62 152 Z" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="4" />
    ${kawaiiFace(100, 114, 0.85)}
  `, '#FFFBEB'),
  egg: wrapSvg(`
    <path d="M100 34 C132 34 152 84 152 118 C152 150 128 168 100 168 C72 168 48 150 48 118 C48 84 68 34 100 34 Z" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="80" cy="74" rx="8" ry="14" fill="#FFFFFF" opacity="0.6" transform="rotate(18 80 74)" />
    ${kawaiiFace(100, 112, 0.9)}
  `, '#FFFBEB'),
  rice: wrapSvg(`
    <path d="M52 106 C54 68 146 68 148 106 Z" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M42 104 L158 104 Q152 156 100 156 Q48 156 42 104 Z" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="78" y="154" width="44" height="10" rx="4" fill="#3B82F6" stroke="${OUTLINE}" stroke-width="4" />
    ${kawaiiFace(100, 128, 0.75)}
  `, '#EFF6FF'),
  pizza: wrapSvg(`
    <path d="M100 34 L162 152 Q100 172 38 152 Z" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M36 146 Q100 168 164 146 Q168 158 156 164 Q100 182 44 164 Q32 158 36 146 Z" fill="#F59E0B" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="96" cy="86" r="10" fill="#EF4444" stroke="${OUTLINE}" stroke-width="3.5" />
    <circle cx="76" cy="126" r="10" fill="#EF4444" stroke="${OUTLINE}" stroke-width="3.5" />
    <circle cx="122" cy="122" r="10" fill="#EF4444" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#FFF7ED'),
  juice: wrapSvg(`
    <path d="M108 60 L124 32 L140 34" fill="none" stroke="#EF4444" stroke-width="7" />
    <rect x="64" y="58" width="72" height="104" rx="14" fill="#FF922B" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="100" cy="110" r="22" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="4" />
    ${kawaiiFace(100, 112, 0.65)}
  `, '#FFF7ED'),
  noodles: wrapSvg(`
    <path d="M62 84 Q100 58 138 84" fill="#FACC15" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M68 94 Q100 72 132 94" fill="none" stroke="#F59E0B" stroke-width="4" />
    <line x1="112" y1="42" x2="152" y2="86" stroke="#B45309" stroke-width="6" />
    <line x1="126" y1="38" x2="160" y2="82" stroke="#B45309" stroke-width="6" />
    <path d="M42 94 L158 94 Q152 156 100 156 Q48 156 42 94 Z" fill="#FF6B6B" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 124, 0.8)}
  `, '#FEF2F2'),
  cake: wrapSvg(`
    <rect x="50" y="96" width="100" height="60" rx="14" fill="#FF9EB5" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M50 104 Q66 122 82 104 Q98 122 114 104 Q130 122 150 104 L150 96 L50 96 Z" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="4" />
    <rect x="94" y="56" width="12" height="36" rx="4" fill="#74C0FC" stroke="${OUTLINE}" stroke-width="4" />
    <path d="M100 32 Q112 46 100 54 Q88 46 100 32 Z" fill="#FACC15" stroke="${OUTLINE}" stroke-width="3.5" />
    ${kawaiiFace(100, 132, 0.75)}
  `, '#FDF2F8'),
  'ice-cream': wrapSvg(`
    <polygon points="70,104 130,104 100,172" fill="#F59E0B" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="82" cy="86" r="24" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="118" cy="86" r="24" fill="#93C5FD" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="64" r="26" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="36" r="8" fill="#EF4444" stroke="${OUTLINE}" stroke-width="3.5" />
    ${kawaiiFace(100, 68, 0.6)}
  `, '#FDF2F8'),
  carrot: wrapSvg(`
    <path d="M100 62 Q86 34 74 44 M100 62 Q100 30 100 30 M100 62 Q114 34 126 44" fill="none" stroke="#22C55E" stroke-width="9" />
    <path d="M68 68 Q100 56 132 68 L108 164 Q100 174 92 164 Z" fill="#FF922B" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 96, 0.75)}
  `, '#FFF7ED'),
  jam: wrapSvg(`
    <rect x="64" y="42" width="72" height="22" rx="8" fill="#EF4444" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="54" y="64" width="92" height="98" rx="20" fill="#FF758F" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="66" y="88" width="68" height="50" rx="10" fill="#FFFBEB" stroke="${OUTLINE}" stroke-width="4" />
    ${kawaiiFace(100, 114, 0.75)}
  `, '#FFF1F2'),

  // Clothes
  hat: wrapSvg(`
    <ellipse cx="100" cy="134" rx="70" ry="20" fill="#FDE047" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M58 130 Q62 60 100 60 Q138 60 142 130 Z" fill="#FACC15" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="58" y="112" width="84" height="14" rx="5" fill="#FF6B8B" stroke="${OUTLINE}" stroke-width="4" />
  `, '#FEFCE8'),
  shirt: wrapSvg(`
    <path d="M68 46 L34 72 L48 100 L66 88 L66 158 L134 158 L134 88 L152 100 L166 72 L132 46 Q100 64 68 46 Z" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="100" cy="108" r="14" fill="#FDE047" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#EFF6FF'),
  shoes: wrapSvg(`
    <path d="M32 126 Q34 94 62 94 L78 112 L94 118 Q102 126 98 138 L32 138 Z" fill="#EF4444" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="30" y="134" width="70" height="12" rx="5" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="4" />
    <path d="M104 126 Q106 94 134 94 L150 112 L166 118 Q174 126 170 138 L104 138 Z" fill="#EF4444" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="102" y="134" width="70" height="12" rx="5" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="4" />
  `, '#FEF2F2'),
  socks: wrapSvg(`
    <path d="M54 44 L84 44 L84 114 L104 134 Q110 148 94 156 L58 144 Q48 138 54 116 Z" fill="#34D399" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="54" y="54" width="30" height="10" fill="#FACC15" />
    <path d="M114 44 L144 44 L144 114 L164 134 Q170 148 154 156 L118 144 Q108 138 114 116 Z" fill="#34D399" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="114" y="54" width="30" height="10" fill="#FACC15" />
  `, '#ECFDF5'),
  dress: wrapSvg(`
    <path d="M74 44 L126 44 L120 84 L156 156 L44 156 L80 84 Z" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="78" y="80" width="44" height="10" rx="4" fill="#FDE047" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#FDF2F8'),
  pants: wrapSvg(`
    <path d="M58 44 L142 44 L150 158 L114 158 L100 98 L86 158 L50 158 Z" fill="#3B82F6" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="58" y="44" width="84" height="14" rx="4" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="4" />
  `, '#EFF6FF'),

  // Toys
  ball: wrapSvg(`
    <circle cx="100" cy="100" r="60" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M100 40 Q130 100 100 160 Q70 100 100 40 Z" fill="#FF5E57" stroke="${OUTLINE}" stroke-width="4.5" />
    <path d="M40 100 Q100 72 160 100" fill="none" stroke="${OUTLINE}" stroke-width="4.5" />
    <circle cx="100" cy="100" r="14" fill="#FACC15" stroke="${OUTLINE}" stroke-width="4" />
  `, '#FFF7ED'),
  teddy: wrapSvg(`
    <circle cx="62" cy="54" r="16" fill="#D97706" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="138" cy="54" r="16" fill="#D97706" stroke="${OUTLINE}" stroke-width="5" />
    <ellipse cx="100" cy="134" rx="42" ry="38" fill="#F59E0B" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="100" cy="82" r="38" fill="#FBBF24" stroke="${OUTLINE}" stroke-width="5.5" />
    <ellipse cx="100" cy="94" rx="18" ry="13" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="3.5" />
    <ellipse cx="100" cy="88" rx="7" ry="5" fill="${OUTLINE}" />
    <ellipse cx="100" cy="136" rx="22" ry="20" fill="#FEF3C7" />
    ${kawaiiFace(100, 80, 0.78)}
  `, '#FFFBEB'),
  car: wrapSvg(`
    <path d="M54 94 L72 60 L128 60 L148 94 Z" fill="#FF6B6B" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="32" y="92" width="136" height="44" rx="16" fill="#FF5E57" stroke="${OUTLINE}" stroke-width="5.5" />
    <polygon points="74,66 124,66 138,92 62,92" fill="#BFDBFE" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="66" cy="138" r="18" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="134" cy="138" r="18" fill="#334155" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="66" cy="138" r="7" fill="#E2E8F0" />
    <circle cx="134" cy="138" r="7" fill="#E2E8F0" />
  `, '#FEF2F2'),
  blocks: wrapSvg(`
    <rect x="38" y="106" width="56" height="56" rx="10" fill="#FF6B6B" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="106" y="106" width="56" height="56" rx="10" fill="#4DA6FF" stroke="${OUTLINE}" stroke-width="5" />
    <rect x="72" y="44" width="56" height="56" rx="10" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="72" r="12" fill="#FFFFFF" opacity="0.65" />
  `, '#EFF6FF'),
  doll: wrapSvg(`
    <circle cx="52" cy="76" r="18" fill="#78350F" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="148" cy="76" r="18" fill="#78350F" stroke="${OUTLINE}" stroke-width="5" />
    <path d="M74 114 L126 114 L142 164 L58 164 Z" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="100" cy="76" r="34" fill="#FFE0C4" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M68 70 Q100 40 132 70 Z" fill="#78350F" stroke="${OUTLINE}" stroke-width="4.5" />
    ${kawaiiFace(100, 80, 0.8)}
  `, '#FDF2F8'),
  kite: wrapSvg(`
    <path d="M100 148 Q126 164 114 178" fill="none" stroke="${OUTLINE}" stroke-width="4.5" />
    <polygon points="100,32 152,88 100,148 48,88" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5.5" />
    <polygon points="100,32 152,88 100,88" fill="#FACC15" />
    <polygon points="48,88 100,88 100,148" fill="#60A5FA" />
    <line x1="100" y1="32" x2="100" y2="148" stroke="${OUTLINE}" stroke-width="4" />
    <line x1="48" y1="88" x2="152" y2="88" stroke="${OUTLINE}" stroke-width="4" />
  `, '#EFF6FF'),
  'yo-yo': wrapSvg(`
    <path d="M100 28 L100 80" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="116" r="44" fill="#FF6B8B" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="100" cy="116" r="24" fill="#FACC15" stroke="${OUTLINE}" stroke-width="4.5" />
    <polygon points="100,98 105,110 118,111 108,119 111,132 100,125 89,132 92,119 82,111 95,110" fill="#FFFFFF" />
  `, '#FFF1F2'),
};

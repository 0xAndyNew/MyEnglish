export const OUTLINE = '#5C3A21';

export function wrapSvg(inner, bgHex = '#FFFDF7', showAura = true) {
  const aura = showAura
    ? `<circle cx="100" cy="100" r="88" fill="${bgHex}" />`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" stroke-linecap="round" stroke-linejoin="round">
  ${aura}
  ${inner}
</svg>`;
}

export function kawaiiFace(cx = 100, cy = 104, s = 1, mood = 'happy') {
  const eyeDist = 18 * s;
  const eyeR = 4.6 * s;
  const cheekDist = 28 * s;
  const cheekY = cy + 6 * s;

  let eyes = `
    <circle cx="${cx - eyeDist}" cy="${cy - 4 * s}" r="${eyeR}" fill="${OUTLINE}" />
    <circle cx="${cx - eyeDist - 1.5 * s}" cy="${cy - 5.5 * s}" r="${1.5 * s}" fill="#FFFFFF" />
    <circle cx="${cx + eyeDist}" cy="${cy - 4 * s}" r="${eyeR}" fill="${OUTLINE}" />
    <circle cx="${cx + eyeDist - 1.5 * s}" cy="${cy - 5.5 * s}" r="${1.5 * s}" fill="#FFFFFF" />`;

  let mouth = `<path d="M${cx - 8 * s} ${cy + 7 * s} Q${cx} ${cy + 16 * s} ${cx + 8 * s} ${cy + 7 * s}" fill="none" stroke="${OUTLINE}" stroke-width="${3.6 * s}" />`;

  if (mood === 'sleepy') {
    eyes = `
      <path d="M${cx - eyeDist - 6 * s} ${cy - 3 * s} Q${cx - eyeDist} ${cy + 2 * s} ${cx - eyeDist + 6 * s} ${cy - 3 * s}" fill="none" stroke="${OUTLINE}" stroke-width="${3.5 * s}" />
      <path d="M${cx + eyeDist - 6 * s} ${cy - 3 * s} Q${cx + eyeDist} ${cy + 2 * s} ${cx + eyeDist + 6 * s} ${cy - 3 * s}" fill="none" stroke="${OUTLINE}" stroke-width="${3.5 * s}" />`;
    mouth = `<ellipse cx="${cx}" cy="${cy + 10 * s}" rx="${5 * s}" ry="${6 * s}" fill="#FF8FA3" stroke="${OUTLINE}" stroke-width="${3 * s}" />`;
  } else if (mood === 'sad') {
    eyes = `
      <circle cx="${cx - eyeDist}" cy="${cy - 4 * s}" r="${eyeR}" fill="${OUTLINE}" />
      <circle cx="${cx + eyeDist}" cy="${cy - 4 * s}" r="${eyeR}" fill="${OUTLINE}" />
      <ellipse cx="${cx - eyeDist - 3 * s}" cy="${cy + 8 * s}" rx="${3.5 * s}" ry="${5 * s}" fill="#60A5FA" stroke="${OUTLINE}" stroke-width="${2 * s}" />`;
    mouth = `<path d="M${cx - 9 * s} ${cy + 14 * s} Q${cx} ${cy + 5 * s} ${cx + 9 * s} ${cy + 14 * s}" fill="none" stroke="${OUTLINE}" stroke-width="${3.6 * s}" />`;
  } else if (mood === 'angry') {
    eyes += `
      <line x1="${cx - eyeDist - 7 * s}" y1="${cy - 13 * s}" x2="${cx - eyeDist + 6 * s}" y2="${cy - 9 * s}" stroke="${OUTLINE}" stroke-width="${4 * s}" />
      <line x1="${cx + eyeDist + 7 * s}" y1="${cy - 13 * s}" x2="${cx + eyeDist - 6 * s}" y2="${cy - 9 * s}" stroke="${OUTLINE}" stroke-width="${4 * s}" />`;
    mouth = `<path d="M${cx - 10 * s} ${cy + 13 * s} Q${cx} ${cy + 6 * s} ${cx + 10 * s} ${cy + 13 * s}" fill="none" stroke="${OUTLINE}" stroke-width="${3.6 * s}" />`;
  } else if (mood === 'scared') {
    eyes = `
      <circle cx="${cx - eyeDist}" cy="${cy - 4 * s}" r="${7 * s}" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="${3 * s}" />
      <circle cx="${cx - eyeDist}" cy="${cy - 4 * s}" r="${3 * s}" fill="${OUTLINE}" />
      <circle cx="${cx + eyeDist}" cy="${cy - 4 * s}" r="${7 * s}" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="${3 * s}" />
      <circle cx="${cx + eyeDist}" cy="${cy - 4 * s}" r="${3 * s}" fill="${OUTLINE}" />`;
    mouth = `<ellipse cx="${cx}" cy="${cy + 12 * s}" rx="${7 * s}" ry="${8 * s}" fill="#FF8FA3" stroke="${OUTLINE}" stroke-width="${3.2 * s}" />`;
  } else if (mood === 'hungry') {
    mouth = `
      <path d="M${cx - 10 * s} ${cy + 6 * s} Q${cx} ${cy + 16 * s} ${cx + 10 * s} ${cy + 6 * s}" fill="none" stroke="${OUTLINE}" stroke-width="${3.6 * s}" />
      <path d="M${cx + 3 * s} ${cy + 11 * s} Q${cx + 8 * s} ${cy + 20 * s} ${cx + 11 * s} ${cy + 11 * s}" fill="#FB7185" stroke="${OUTLINE}" stroke-width="${2.5 * s}" />`;
  } else if (mood === 'open') {
    mouth = `<path d="M${cx - 11 * s} ${cy + 5 * s} Q${cx} ${cy + 22 * s} ${cx + 11 * s} ${cy + 5 * s} Z" fill="#FF758F" stroke="${OUTLINE}" stroke-width="${3.2 * s}" />`;
  }

  return `
    ${eyes}
    <ellipse cx="${cx - cheekDist}" cy="${cheekY}" rx="${6.5 * s}" ry="${4 * s}" fill="#FF9EB5" opacity="0.75" />
    <ellipse cx="${cx + cheekDist}" cy="${cheekY}" rx="${6.5 * s}" ry="${4 * s}" fill="#FF9EB5" opacity="0.75" />
    ${mouth}`;
}

export function personBust({
  hair = '#5C3A21',
  skin = '#FFE0C4',
  shirt = '#74B9FF',
  hairStyle = 'short',
  glasses = false,
  hat = '',
  accessory = '',
  mood = 'happy',
}) {
  let hairBack = '';
  let hairFront = '';
  if (hairStyle === 'long') {
    hairBack = `<path d="M52 78 Q46 135 60 144 L140 144 Q154 135 148 78 Z" fill="${hair}" stroke="${OUTLINE}" stroke-width="5" />`;
    hairFront = `<path d="M56 76 Q75 40 104 42 Q136 42 144 78 Q126 62 100 66 Q76 62 56 76 Z" fill="${hair}" stroke="${OUTLINE}" stroke-width="5" />`;
  } else if (hairStyle === 'pigtails') {
    hairBack = `
      <circle cx="46" cy="84" r="16" fill="${hair}" stroke="${OUTLINE}" stroke-width="5" />
      <circle cx="154" cy="84" r="16" fill="${hair}" stroke="${OUTLINE}" stroke-width="5" />
      <circle cx="54" cy="74" r="5" fill="#FF758F" stroke="${OUTLINE}" stroke-width="3" />
      <circle cx="146" cy="74" r="5" fill="#FF758F" stroke="${OUTLINE}" stroke-width="3" />`;
    hairFront = `<path d="M58 76 Q78 40 100 42 Q122 40 142 76 Q120 64 100 68 Q80 64 58 76 Z" fill="${hair}" stroke="${OUTLINE}" stroke-width="5" />`;
  } else if (hairStyle === 'bun') {
    hairBack = `<circle cx="100" cy="36" r="18" fill="${hair}" stroke="${OUTLINE}" stroke-width="5" />`;
    hairFront = `<path d="M58 76 Q78 42 100 44 Q122 42 142 76 Q120 62 100 66 Q80 62 58 76 Z" fill="${hair}" stroke="${OUTLINE}" stroke-width="5" />`;
  } else if (hairStyle === 'curl') {
    hairFront = `<path d="M96 42 Q104 28 112 42 Q118 48 106 54 Q94 56 96 42 Z" fill="${hair}" stroke="${OUTLINE}" stroke-width="4" />`;
  } else {
    hairFront = `<path d="M56 78 Q64 40 100 40 Q136 40 144 78 Q124 58 100 62 Q76 58 56 78 Z" fill="${hair}" stroke="${OUTLINE}" stroke-width="5" />`;
  }

  let hatSvg = '';
  if (hat === 'chef') {
    hatSvg = `
      <path d="M68 54 Q56 30 78 28 Q90 16 110 26 Q136 22 132 54 Z" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="5" />
      <rect x="68" y="48" width="64" height="14" rx="5" fill="#F8FAFC" stroke="${OUTLINE}" stroke-width="5" />`;
  } else if (hat === 'police') {
    hatSvg = `
      <path d="M62 56 L72 32 L128 32 L138 56 Z" fill="#3B82F6" stroke="${OUTLINE}" stroke-width="5" />
      <rect x="62" y="50" width="76" height="10" rx="4" fill="#1E3A8A" stroke="${OUTLINE}" stroke-width="4" />
      <circle cx="100" cy="42" r="6" fill="#FACC15" stroke="${OUTLINE}" stroke-width="3" />`;
  } else if (hat === 'fire') {
    hatSvg = `
      <path d="M60 56 Q72 22 100 22 Q128 22 140 56 Z" fill="#EF4444" stroke="${OUTLINE}" stroke-width="5" />
      <rect x="52" y="52" width="96" height="10" rx="5" fill="#FACC15" stroke="${OUTLINE}" stroke-width="4" />`;
  } else if (hat === 'straw') {
    hatSvg = `
      <ellipse cx="100" cy="54" rx="54" ry="12" fill="#FDE047" stroke="${OUTLINE}" stroke-width="5" />
      <path d="M72 52 Q76 26 100 26 Q124 26 128 52 Z" fill="#FACC15" stroke="${OUTLINE}" stroke-width="5" />
      <rect x="72" y="44" width="56" height="7" rx="3" fill="#FB7185" stroke="${OUTLINE}" stroke-width="3" />`;
  } else if (hat === 'nurse') {
    hatSvg = `
      <path d="M72 50 L80 28 L120 28 L128 50 Z" fill="#FFFFFF" stroke="${OUTLINE}" stroke-width="4.5" />
      <rect x="96" y="33" width="8" height="14" rx="2" fill="#EF4444" />
      <rect x="93" y="36" width="14" height="8" rx="2" fill="#EF4444" />`;
  } else if (hat === 'crown') {
    hatSvg = `<path d="M72 52 L68 24 L86 38 L100 20 L114 38 L132 24 L128 52 Z" fill="#FACC15" stroke="${OUTLINE}" stroke-width="5" />`;
  }

  const glassesSvg = glasses
    ? `
      <circle cx="82" cy="90" r="12" fill="rgba(255,255,255,0.3)" stroke="${OUTLINE}" stroke-width="3.5" />
      <circle cx="118" cy="90" r="12" fill="rgba(255,255,255,0.3)" stroke="${OUTLINE}" stroke-width="3.5" />
      <line x1="94" y1="90" x2="106" y2="90" stroke="${OUTLINE}" stroke-width="3.5" />`
    : '';

  return `
    ${hairBack}
    <path d="M54 176 Q56 130 100 130 Q144 130 146 176 Z" fill="${shirt}" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="56" cy="92" r="9" fill="${skin}" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="144" cy="92" r="9" fill="${skin}" stroke="${OUTLINE}" stroke-width="4" />
    <circle cx="100" cy="90" r="42" fill="${skin}" stroke="${OUTLINE}" stroke-width="5" />
    ${hairFront}
    ${kawaiiFace(100, 94, 0.95, mood)}
    ${glassesSvg}
    ${hatSvg}
    ${accessory}`;
}

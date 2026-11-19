import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { ALL_PRESCHOOL_UNITS, PHONICS_LETTERS } from '../src/data/preschool/index.ts';
import { OUTLINE, kawaiiFace, wrapSvg } from './preschool-vectors/primitives.mjs';
import { SHAPES_1 } from './preschool-vectors/shapes1.mjs';
import { SHAPES_2 } from './preschool-vectors/shapes2.mjs';
import { SHAPES_3 } from './preschool-vectors/shapes3.mjs';

const ROOT = process.cwd();
const IMG_ROOT = path.join(ROOT, 'public', 'preschool', 'img');
const PRESERVE_AI_WORDS = new Set(['hello', 'bye-bye', 'boy', 'pencil']);

const WORD_SVGS = {
  ...SHAPES_1,
  ...SHAPES_2,
  ...SHAPES_3,
};

const UI_SVGS = {
  'dock-home': wrapSvg(`
    <polygon points="36,96 100,40 164,96" fill="#FF6B6B" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="48" y="96" width="104" height="68" rx="12" fill="#FEF3C7" stroke="${OUTLINE}" stroke-width="5.5" />
    <rect x="82" y="114" width="36" height="50" rx="10" fill="#FF922B" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="100" cy="76" r="10" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="3.5" />
  `, '#FFF7ED'),
  'dock-songs': wrapSvg(`
    <circle cx="70" cy="138" r="24" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5.5" />
    <circle cx="132" cy="126" r="24" fill="#FF85B3" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M90 138 L90 54 L152 42 L152 126" fill="none" stroke="${OUTLINE}" stroke-width="8" />
    <path d="M90 54 L152 42 L152 62 L90 74 Z" fill="#EC4899" stroke="${OUTLINE}" stroke-width="5" />
    <circle cx="48" cy="54" r="7" fill="#FACC15" />
    <circle cx="166" cy="76" r="6" fill="#60A5FA" />
  `, '#FDF2F8'),
  'dock-stories': wrapSvg(`
    <path d="M34 56 Q68 48 100 66 Q132 48 166 56 L166 150 Q132 142 100 158 Q68 142 34 150 Z" fill="#69DB7C" stroke="${OUTLINE}" stroke-width="5.5" />
    <path d="M44 64 Q72 58 100 72 Q128 58 156 64 L156 142 Q128 136 100 148 Q72 136 44 142 Z" fill="#FFFBEB" stroke="${OUTLINE}" stroke-width="4" />
    <line x1="100" y1="72" x2="100" y2="148" stroke="${OUTLINE}" stroke-width="4.5" />
    <polygon points="130,86 135,96 146,98 138,105 140,116 130,110 120,116 122,105 114,98 125,96" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="3" />
  `, '#ECFDF5'),
  'dock-stickers': wrapSvg(`
    <polygon points="100,28 121,74 172,80 134,115 144,166 100,141 56,166 66,115 28,80 79,74" fill="#FFD43B" stroke="${OUTLINE}" stroke-width="5.5" />
    ${kawaiiFace(100, 106, 0.85)}
    <circle cx="38" cy="44" r="7" fill="#FF85B3" />
    <circle cx="162" cy="48" r="6" fill="#60A5FA" />
  `, '#FEFCE8'),
};

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function svgToWebp(svg, outPath, size = 512) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .webp({ quality: 86 })
    .toFile(outPath);
}

async function main() {
  const wordsDir = path.join(IMG_ROOT, 'words');
  const unitsDir = path.join(IMG_ROOT, 'units');
  const storiesDir = path.join(IMG_ROOT, 'stories');
  const uiDir = path.join(IMG_ROOT, 'ui');
  await Promise.all([
    fs.mkdir(wordsDir, { recursive: true }),
    fs.mkdir(unitsDir, { recursive: true }),
    fs.mkdir(storiesDir, { recursive: true }),
    fs.mkdir(uiDir, { recursive: true }),
  ]);

  // 1. Collect and generate all unique word/phonics slugs
  const allSlugs = new Set();
  for (const u of ALL_PRESCHOOL_UNITS) {
    for (const w of u.words) allSlugs.add(w.image);
  }
  for (const p of PHONICS_LETTERS) {
    allSlugs.add(p.exampleImage);
  }

  let wordCount = 0;
  const missing = [];
  for (const slug of allSlugs) {
    const outPath = path.join(wordsDir, `${slug}.webp`);
    if (PRESERVE_AI_WORDS.has(slug) && (await fileExists(outPath))) {
      continue;
    }
    const svg = WORD_SVGS[slug];
    if (!svg) {
      missing.push(slug);
      continue;
    }
    await svgToWebp(svg, outPath);
    wordCount++;
  }

  if (missing.length > 0) {
    console.error('Missing SVG definitions for slugs:', missing.join(', '));
    process.exit(1);
  }

  // 2. Generate UI Dock illustrations
  for (const [name, svg] of Object.entries(UI_SVGS)) {
    await svgToWebp(svg, path.join(uiDir, `${name}.webp`), 256);
  }

  // 3. Generate 32 Unit covers (pastel framed collage of 3 unit words)
  let unitCount = 0;
  for (const unit of ALL_PRESCHOOL_UNITS) {
    const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <rect x="16" y="16" width="480" height="480" rx="96" fill="${unit.color}22" stroke="${unit.color}" stroke-width="14" />
      <circle cx="96" cy="96" r="20" fill="${unit.color}" opacity="0.25" />
      <circle cx="420" cy="410" r="26" fill="${unit.color}" opacity="0.22" />
    </svg>`;

    const picks = [
      unit.words[0],
      unit.words[Math.floor(unit.words.length / 2)],
      unit.words[unit.words.length - 1],
    ].filter(Boolean);

    const layers = [];
    const coords = [
      { left: 146, top: 44, size: 220 },
      { left: 46, top: 236, size: 205 },
      { left: 262, top: 236, size: 205 },
    ];
    for (let i = 0; i < picks.length; i++) {
      const imgPath = path.join(wordsDir, `${picks[i].image}.webp`);
      const buf = await sharp(imgPath).resize(coords[i].size, coords[i].size).png().toBuffer();
      layers.push({ input: buf, left: coords[i].left, top: coords[i].top });
    }

    await sharp(Buffer.from(bgSvg))
      .composite(layers)
      .webp({ quality: 86 })
      .toFile(path.join(unitsDir, `${unit.id}.webp`));
    unitCount++;
  }

  // 4. Generate Story page illustrations (storybook scene per page)
  const boPath = path.join(IMG_ROOT, 'mascot', 'read.webp');
  const hasBo = await fileExists(boPath);
  const boBuf = hasBo ? await sharp(boPath).resize(150, 150).png().toBuffer() : null;

  let storyCount = 0;
  for (const unit of ALL_PRESCHOOL_UNITS) {
    for (let i = 0; i < unit.story.pages.length; i++) {
      const page = unit.story.pages[i];
      const lower = page.en.toLowerCase();
      const matched = unit.words.filter((w) => lower.includes(w.word.toLowerCase()));
      const mainWords = (matched.length ? matched : [unit.words[i % unit.words.length]]).slice(0, 2);

      const sceneBg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <rect x="14" y="14" width="484" height="484" rx="72" fill="#FFFDF5" stroke="${unit.color}" stroke-width="10" />
        <path d="M14 360 Q140 330 260 356 Q380 380 498 348 L498 426 Q498 498 426 498 L86 498 Q14 498 14 426 Z" fill="${unit.color}20" />
      </svg>`;

      const layers = [];
      if (mainWords.length === 1) {
        const buf = await sharp(path.join(wordsDir, `${mainWords[0].image}.webp`))
          .resize(310, 310)
          .png()
          .toBuffer();
        layers.push({ input: buf, left: 101, top: 68 });
      } else {
        const b1 = await sharp(path.join(wordsDir, `${mainWords[0].image}.webp`))
          .resize(220, 220)
          .png()
          .toBuffer();
        const b2 = await sharp(path.join(wordsDir, `${mainWords[1].image}.webp`))
          .resize(220, 220)
          .png()
          .toBuffer();
        layers.push({ input: b1, left: 36, top: 100 });
        layers.push({ input: b2, left: 256, top: 100 });
      }
      if (boBuf) {
        layers.push({ input: boBuf, left: 24, top: 344 });
      }

      await sharp(Buffer.from(sceneBg))
        .composite(layers)
        .webp({ quality: 85 })
        .toFile(path.join(storiesDir, `${unit.id}-${i + 1}.webp`));
      storyCount++;
    }
  }

  console.log(
    `Generated ${wordCount} word illustrations (kept ${PRESERVE_AI_WORDS.size} AI ones), ${unitCount} unit covers, ${storyCount} story pages, and ${Object.keys(UI_SVGS).length} Dock UI images.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

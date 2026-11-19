import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { LEW_TOPICS } from '../src/data/preschool/lewTopics.ts';

const ROOT = process.cwd();
const ARTIFACTS_DIR =
  'C:/Users/Xuan Hieu/.gemini/antigravity/brain/c5023fe4-660c-4e35-9ac7-db066215a835';
const WORDS_DIR = path.join(ROOT, 'public', 'preschool', 'img', 'words');
const UNITS_DIR = path.join(ROOT, 'public', 'preschool', 'img', 'units');

/**
 * Maps each generated 3x3 sprite sheet (in the conversation artifact directory)
 * to the 9 vocabulary imageSlugs in exact row-major order.
 */
const SHEETS = [
  {
    file: 'animals_sheet_1_1795066138670.jpg',
    slugs: [
      'dog', 'cat', 'bird',
      'duck', 'cow', 'rabbit',
      'lion', 'elephant', null, // fox bonus unused in 85 LEW slugs
    ],
  },
  {
    file: 'objects_sheet_1_1795066140007.jpg',
    slugs: [
      'apple', 'banana', 'milk',
      'water', 'bread', 'rice',
      'egg', 'ball', 'car',
    ],
  },
  {
    file: 'family_sheet_1795066222826.jpg',
    slugs: [
      'mommy', 'daddy', 'baby',
      'sister', 'brother', 'grandma',
      'grandpa', 'hug', 'teacher',
    ],
  },
  {
    file: 'body_feelings_sheet_1795066222289.jpg',
    slugs: [
      'head', 'eyes', 'ears',
      'nose', 'mouth', 'hands',
      'toes', 'happy', 'sad',
    ],
  },
  {
    file: 'actions_comm_sheet_1795066226522.jpg',
    slugs: [
      'sleepy', 'hungry', 'hello',
      'bye-bye', 'wake-up', 'brush-teeth',
      'play', 'jump', 'run',
    ],
  },
  {
    file: 'daily_nature_sheet_1795066227393.jpg',
    slugs: [
      'bath', 'sleep', 'sun',
      'rainy', 'cloudy', 'tree',
      'flower', 'hot', 'cold',
    ],
  },
  {
    file: 'toys_school_sheet_1795066249022.jpg',
    slugs: [
      'doll', 'blocks', 'teddy',
      'train', 'kite', 'book',
      'bag', 'pencil', 'crayon',
    ],
  },
  {
    file: 'home_school_sheet_1795066248896.jpg',
    slugs: [
      'bedroom', 'kitchen', 'bathroom',
      'bed', 'chair', 'table',
      'door', 'school', 'friend',
    ],
  },
  {
    file: 'colors_shapes_sheet_1795066250152.jpg',
    slugs: [
      'red', 'blue', 'yellow',
      'green', 'circle', 'square',
      'triangle', 'star', null, // rainbow bonus
    ],
  },
  {
    file: 'numbers_sheet_1795066284739.jpg',
    slugs: [
      'one', 'two', 'three',
      'four', 'five', 'six',
      null, null, null,
    ],
  },
];

function isNearWhite(data, idx, tol = 242) {
  return data[idx] >= tol && data[idx + 1] >= tol && data[idx + 2] >= tol;
}

/**
 * Finds the widest whitespace band near `target` inside `[minPos, maxPos]`
 * along a boolean `isEmptyLine` array, returning its midpoint index.
 */
function findWidestEmptyCut(isEmptyLine, minPos, maxPos, fallback) {
  let bestStart = -1;
  let bestLen = 0;
  let curStart = -1;

  for (let i = minPos; i <= maxPos; i++) {
    if (isEmptyLine[i]) {
      if (curStart === -1) curStart = i;
    } else if (curStart !== -1) {
      const len = i - curStart;
      if (len > bestLen) {
        bestLen = len;
        bestStart = curStart;
      }
      curStart = -1;
    }
  }
  if (curStart !== -1) {
    const len = maxPos + 1 - curStart;
    if (len > bestLen) {
      bestLen = len;
      bestStart = curStart;
    }
  }

  if (bestStart !== -1 && bestLen >= 2) {
    return Math.round(bestStart + bestLen / 2);
  }
  return fallback;
}

/**
 * Flood-fills outer near-white background pixels of an RGBA buffer to pure transparent,
 * while preserving bright white interiors (white bunny, rice bowl, clouds) enclosed by outlines.
 */
function stripOuterWhiteBackground(raw, w, h, whiteTol = 238) {
  const out = Buffer.from(raw);
  const visited = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0;
  let tail = 0;

  const tryEnqueue = (x, y) => {
    const p = y * w + x;
    if (visited[p]) return;
    const i = p * 4;
    if (out[i] >= whiteTol && out[i + 1] >= whiteTol && out[i + 2] >= whiteTol) {
      visited[p] = 1;
      queue[tail++] = p;
    }
  };

  for (let x = 0; x < w; x++) {
    tryEnqueue(x, 0);
    tryEnqueue(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    tryEnqueue(0, y);
    tryEnqueue(w - 1, y);
  }

  while (head < tail) {
    const p = queue[head++];
    out[p * 4 + 3] = 0;
    const x = p % w;
    const y = (p - x) / w;
    if (x > 0) tryEnqueue(x - 1, y);
    if (x + 1 < w) tryEnqueue(x + 1, y);
    if (y > 0) tryEnqueue(x, y - 1);
    if (y + 1 < h) tryEnqueue(x, y + 1);
  }

  // Compute tight non-transparent bounding box
  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (out[(y * w + x) * 4 + 3] > 20) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  return { rgba: out, minX, minY, maxX, maxY };
}

/**
 * Finds local minimum foreground row in [minPos, maxPos] for a given column span [x0, x1]
 * when no full-width blank row exists (for tall items overlapping neighbor rows' y-span).
 */
function findCleanRowCut(data, W, x0, x1, minY, maxY, fallback) {
  const isEmpty = new Array(maxY + 1).fill(false);
  let bestLowY = fallback;
  let lowestInk = Infinity;

  for (let y = minY; y <= maxY; y++) {
    let ink = 0;
    for (let x = x0; x < x1; x++) {
      if (!isNearWhite(data, (y * W + x) * 4, 240)) ink++;
    }
    isEmpty[y] = ink === 0;
    if (ink < lowestInk) {
      lowestInk = ink;
      bestLowY = y;
    }
  }

  return findWidestEmptyCut(isEmpty, minY, maxY, bestLowY);
}

function findCleanColCut(data, W, y0, y1, minX, maxX, fallback) {
  const isEmpty = new Array(maxX + 1).fill(false);
  let bestLowX = fallback;
  let lowestInk = Infinity;

  for (let x = minX; x <= maxX; x++) {
    let ink = 0;
    for (let y = y0; y < y1; y++) {
      if (!isNearWhite(data, (y * W + x) * 4, 240)) ink++;
    }
    isEmpty[x] = ink === 0;
    if (ink < lowestInk) {
      lowestInk = ink;
      bestLowX = x;
    }
  }

  return findWidestEmptyCut(isEmpty, minX, maxX, bestLowX);
}

/**
 * Slices a 3x3 grid image cleanly by locating column gaps first, then per-column row gaps
 * (or vice versa), returning 9 cell PNG buffers tightly trimmed to each subject's exact bounding box.
 */
async function sliceSheet3x3(filePath, sheetName) {
  const { data, info } = await sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width;
  const H = info.height;

  const xCut1 = findCleanColCut(data, W, 0, H, Math.floor(W * 0.25), Math.floor(W * 0.42), Math.round(W / 3));
  const xCut2 = findCleanColCut(data, W, 0, H, Math.floor(W * 0.58), Math.floor(W * 0.75), Math.round((W * 2) / 3));
  const xRanges = [
    [0, xCut1],
    [xCut1, xCut2],
    [xCut2, W],
  ];

  // Build 3x3 matrix [row][col] -> store row-major
  const cells = new Array(9).fill(null);
  for (let col = 0; col < 3; col++) {
    const [x0, x1] = xRanges[col];
    const yCut1 = findCleanRowCut(data, W, x0, x1, Math.floor(H * 0.24), Math.floor(H * 0.43), Math.round(H / 3));
    const yCut2 = findCleanRowCut(data, W, x0, x1, Math.floor(H * 0.56), Math.floor(H * 0.76), Math.round((H * 2) / 3));
    const yRanges = [
      [0, yCut1],
      [yCut1, yCut2],
      [yCut2, H],
    ];

    for (let row = 0; row < 3; row++) {
      const [y0, y1] = yRanges[row];
      const cw = x1 - x0;
      const ch = y1 - y0;
      const cellBuf = await sharp(data, { raw: { width: W, height: H, channels: 4 } })
        .extract({ left: x0, top: y0, width: cw, height: ch })
        .raw()
        .toBuffer();

      const { rgba, minX, minY, maxX, maxY } = stripOuterWhiteBackground(cellBuf, cw, ch);
      if (maxX <= minX || maxY <= minY) continue;

      if (minX === 0 || minY === 0 || maxX === cw - 1 || maxY === ch - 1) {
        console.warn(
          `[WARN] Edge touch in ${sheetName} R${row + 1}C${col + 1}: box=[${minX},${minY},${maxX},${maxY}] of ${cw}x${ch}`
        );
      }

      const cropW = maxX - minX + 1;
      const cropH = maxY - minY + 1;
      const trimmedPng = await sharp(rgba, { raw: { width: cw, height: ch, channels: 4 } })
        .extract({ left: minX, top: minY, width: cropW, height: cropH })
        .png()
        .toBuffer();

      cells[row * 3 + col] = trimmedPng;
    }
  }

  return cells;
}

/**
 * Places a trimmed transparent sprite dead-center inside a 600x600 pure white card.
 */
async function saveCenteredWordCard(trimmedPng, outPath) {
  const fitted = await sharp(trimmedPng)
    .resize(476, 476, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 600,
      height: 600,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: fitted, gravity: 'center' }])
    .flatten({ background: '#FFFFFF' })
    .webp({ quality: 90 })
    .toFile(outPath);
}

/**
 * Builds an exact pedagogical "four" counting card from the glossy blue numeral "4"
 * paired with exactly 4 shiny golden stars in a neat 2x2 grid (replacing the 5-star quirk).
 */
async function buildExactFourCard(fourCellPng, starWordPath, outPath) {
  const { data: cellRaw, info: cellInfo } = await sharp(fourCellPng)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const cw = cellInfo.width;
  const ch = cellInfo.height;

  // Connected-component extraction of the leftmost foreground shape (the whole numeral "4")
  // so diagonal overlaps with the adjacent column of stars never clip the crossbar of "4".
  const visited = new Uint8Array(cw * ch);
  const digitOut = Buffer.alloc(cw * ch * 4, 0);
  let seed = -1;
  for (let x = 0; x < Math.floor(cw * 0.4) && seed === -1; x++) {
    for (let y = 0; y < ch; y++) {
      if (cellRaw[(y * cw + x) * 4 + 3] > 25) {
        seed = y * cw + x;
        break;
      }
    }
  }

  if (seed !== -1) {
    const queue = [seed];
    visited[seed] = 1;
    let head = 0;
    while (head < queue.length) {
      const p = queue[head++];
      const pi = p * 4;
      digitOut[pi] = cellRaw[pi];
      digitOut[pi + 1] = cellRaw[pi + 1];
      digitOut[pi + 2] = cellRaw[pi + 2];
      digitOut[pi + 3] = cellRaw[pi + 3];

      const px = p % cw;
      const py = (p - px) / cw;
      for (let dy = -2; dy <= 2; dy++) {
        const ny = py + dy;
        if (ny < 0 || ny >= ch) continue;
        for (let dx = -2; dx <= 2; dx++) {
          const nx = px + dx;
          if (nx < 0 || nx >= cw) continue;
          const np = ny * cw + nx;
          if (!visited[np] && cellRaw[np * 4 + 3] > 25) {
            visited[np] = 1;
            queue.push(np);
          }
        }
      }
    }
  }

  const digitRaw = await sharp(digitOut, { raw: { width: cw, height: ch, channels: 4 } })
    .trim({ threshold: 10 })
    .resize({ width: 225, height: 340, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const { data: starData, info: starInfo } = await sharp(starWordPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { rgba: cleanStar } = stripOuterWhiteBackground(starData, starInfo.width, starInfo.height, 242);
  const starBuf = await sharp(cleanStar, { raw: { width: starInfo.width, height: starInfo.height, channels: 4 } })
    .trim({ threshold: 10 })
    .resize(112, 112, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 600,
      height: 600,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([
      { input: digitRaw, left: 68, top: 130 },
      { input: starBuf, left: 298, top: 162 },
      { input: starBuf, left: 422, top: 162 },
      { input: starBuf, left: 298, top: 292 },
      { input: starBuf, left: 422, top: 292 },
    ])
    .flatten({ background: '#FFFFFF' })
    .webp({ quality: 90 })
    .toFile(outPath);
}

/**
 * Generates clean 800x520 pastel-framed trio banners for each of the 12 LEW topics,
 * guaranteeing 3 centered whole characters/objects on crisp bright white/pastel backdrops
 * with zero cropped ears, faces, or dark overlays.
 */
async function buildUnitCoverBanner(topic, outPath) {
  const wSlugs = topic.words.slice(0, 3).map((w) => w.imageSlug);
  const sprites = [];
  for (const slug of wSlugs) {
    const p = path.join(WORDS_DIR, `${slug}.webp`);
    const { data, info } = await sharp(p).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const { rgba } = stripOuterWhiteBackground(data, info.width, info.height, 245);
    const s = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
      .trim({ threshold: 8 })
      .resize(220, 250, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toBuffer();
    sprites.push(s);
  }

  const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
    <rect width="800" height="520" fill="#FFFFFF" />
    <circle cx="155" cy="275" r="122" fill="${topic.softBg}" stroke="${topic.color}28" stroke-width="4" />
    <circle cx="400" cy="255" r="134" fill="${topic.softBg}" stroke="${topic.color}33" stroke-width="4" />
    <circle cx="645" cy="275" r="122" fill="${topic.softBg}" stroke="${topic.color}28" stroke-width="4" />
  </svg>`;

  await sharp(Buffer.from(bgSvg))
    .composite([
      { input: sprites[0], left: 45, top: 150 },
      { input: sprites[1], left: 290, top: 130 },
      { input: sprites[2], left: 535, top: 150 },
    ])
    .flatten({ background: '#FFFFFF' })
    .webp({ quality: 90 })
    .toFile(outPath);
}

async function main() {
  await fs.mkdir(WORDS_DIR, { recursive: true });
  await fs.mkdir(UNITS_DIR, { recursive: true });

  let savedWords = 0;
  let fourCell = null;

  for (const sheet of SHEETS) {
    const fullPath = path.join(ARTIFACTS_DIR, sheet.file);
    const cells = await sliceSheet3x3(fullPath, sheet.file);
    for (let i = 0; i < sheet.slugs.length; i++) {
      const slug = sheet.slugs[i];
      const cell = cells[i];
      if (!slug || !cell) continue;
      if (slug === 'four') {
        fourCell = cell;
        continue;
      }
      await saveCenteredWordCard(cell, path.join(WORDS_DIR, `${slug}.webp`));
      savedWords++;
    }
  }

  if (fourCell) {
    await buildExactFourCard(
      fourCell,
      path.join(WORDS_DIR, 'star.webp'),
      path.join(WORDS_DIR, 'four.webp')
    );
    savedWords++;
  }

  console.log(`Built ${savedWords}/85 centered flashcard illustrations in public/preschool/img/words/.`);

  let savedCovers = 0;
  for (const topic of LEW_TOPICS) {
    await buildUnitCoverBanner(topic, path.join(UNITS_DIR, `${topic.coverSlug}.webp`));
    savedCovers++;
  }
  console.log(`Built ${savedCovers}/12 clean topic cover banners in public/preschool/img/units/.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

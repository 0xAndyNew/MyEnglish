import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { LEW_TOPICS } from '../src/data/preschool/lewTopics.ts';
import { LEW_EXTRA_TOPICS } from '../src/data/preschool/lewTopicsExtra.ts';

const ROOT = process.cwd();
const ARTIFACTS_DIR =
  'C:/Users/Xuan Hieu/.gemini/antigravity/brain/c5023fe4-660c-4e35-9ac7-db066215a835';
const WORDS_DIR = path.join(ROOT, 'public', 'preschool', 'img', 'words');
const UNITS_DIR = path.join(ROOT, 'public', 'preschool', 'img', 'units');
const APP_ART_DIR = path.join(ROOT, 'public', 'img', 'art');

const HEADERS = { 'User-Agent': 'MyEnglishApp/2.0 (Educational)' };

/**
 * 1. All 14 custom 3x3 Studio Sprite Sheets (126 curated kawaii & glossy 3D flashcards).
 */
const SHEETS = [
  {
    file: 'animals_sheet_1_1795066138670.jpg',
    slugs: ['dog', 'cat', 'bird', 'duck', 'cow', 'rabbit', 'lion', 'elephant', 'fox'],
  },
  {
    file: 'objects_sheet_1_1795066140007.jpg',
    slugs: ['apple', 'banana', 'milk', 'water', 'bread', 'rice', 'egg', 'ball', 'car'],
  },
  {
    file: 'family_sheet_1795066222826.jpg',
    slugs: ['mommy', 'daddy', 'baby', 'sister', 'brother', 'grandma', 'grandpa', 'hug', 'teacher'],
  },
  {
    file: 'body_feelings_sheet_1795066222289.jpg',
    slugs: ['head', 'eyes', 'ears', 'nose', 'mouth', 'hands', 'toes', 'happy', 'sad'],
  },
  {
    file: 'actions_comm_sheet_1795066226522.jpg',
    slugs: ['sleepy', 'hungry', 'hello', 'bye-bye', 'wake-up', 'brush-teeth', 'play', 'jump', 'run'],
  },
  {
    file: 'daily_nature_sheet_1795066227393.jpg',
    slugs: ['bath', 'sleep', 'sun', 'rainy', 'cloudy', 'tree', 'flower', 'hot', 'cold'],
  },
  {
    file: 'toys_school_sheet_1795066249022.jpg',
    slugs: ['doll', 'blocks', 'teddy', 'train', 'kite', 'book', 'bag', 'pencil', 'crayon'],
  },
  {
    file: 'home_school_sheet_1795066248896.jpg',
    slugs: ['bedroom', 'kitchen', 'bathroom', 'bed', 'chair', 'table', 'door', 'school', 'friend'],
  },
  {
    file: 'colors_shapes_sheet_1795066250152.jpg',
    slugs: ['red', 'blue', 'yellow', 'green', 'circle', 'square', 'triangle', 'star', 'rainbow'],
  },
  {
    file: 'numbers_sheet_1795066284739.jpg',
    slugs: ['one', 'two', 'three', 'four', 'five', 'six', 'trophy', 'heart', 'medal'],
  },
  {
    file: 'sheet_11_clothes_1795068824512.jpg',
    slugs: ['hat', 'shirt', 'shoes', 'socks', 'dress', 'pants', 'coat', 'glasses', 'umbrella'],
  },
  {
    file: 'sheet_12_vehicles_1795068829390.jpg',
    slugs: ['bus', 'bike', 'plane', 'boat', 'taxi', 'truck', 'helicopter', 'motorbike', 'ship'],
  },
  {
    file: 'sheet_17_veggies_party_1795068962413.jpg',
    slugs: ['mango', 'grapes', 'tomato', 'potato', 'corn', 'jam', 'balloon', 'present', 'candle'],
  },
  {
    file: 'sheet_19_jobs_1795068945797.jpg',
    slugs: [
      'doctor',
      'nurse',
      'farmer',
      'cook',
      'police-officer',
      'firefighter',
      'pilot',
      'driver',
      'singer',
    ],
  },
];

/**
 * 2. FluentUI 3D Studio PNG mapping -> pure white 600x600 flashcards with soft studio shadow.
 */
const FLUENT_3D_WORDS = {
  // Topic 15 Sea Animals
  fish: 'Fish',
  crab: 'Crab',
  shark: 'Shark',
  whale: 'Whale',
  octopus: 'Octopus',
  turtle: 'Turtle',
  dolphin: 'Dolphin',
  shell: 'Spiral shell',

  // Topic 16 Wild Animals
  tiger: 'Tiger face',
  monkey: 'Monkey',
  giraffe: 'Giraffe',
  zebra: 'Zebra',
  bear: 'Bear',
  snake: 'Snake',
  hippo: 'Hippopotamus',

  // Topic 17 Farm Animals
  pig: 'Pig',
  sheep: 'Ewe',
  horse: 'Horse',
  chicken: 'Chicken',
  goat: 'Goat',
  rooster: 'Rooster',
  frog: 'Frog',

  // Topic 18 Yummy Food & Kids Food/Fruit
  pizza: 'Pizza',
  cake: 'Birthday cake',
  'ice-cream': 'Soft ice cream',
  juice: 'Beverage box',
  noodles: 'Steaming bowl',
  cookie: 'Cookie',
  carrot: 'Carrot',
  watermelon: 'Watermelon',
  strawberry: 'Strawberry',

  // Topic 19 Playground & Kids Toys
  slide: 'Playground slide',
  bubble: 'Bubbles',
  robot: 'Robot',
  skateboard: 'Skateboard',
  'yo-yo': 'Yo-yo',

  // Topic 21 Sky, Weather & Seasons
  moon: 'Crescent moon',
  sunny: 'Sun behind small cloud',
  windy: 'Wind face',
  snowy: 'Snowflake',
  stormy: 'Cloud with lightning and rain',
  leaf: 'Leaf fluttering in wind',
  spring: 'Cherry blossom',
  summer: 'Beach with umbrella',
  autumn: 'Fallen leaf',
  winter: 'Snowman',
  river: 'Water wave',
  mountain: 'Snow-capped mountain',

  // Topic 22 Party & Holidays
  candy: 'Candy',
  box: 'Package',
  music: 'Musical notes',
  tet: 'Red paper lantern',
  'lucky-money': 'Red envelope',
  lantern: 'Red paper lantern',
  mooncake: 'Moon cake',
  fireworks: 'Fireworks',
  christmas: 'Christmas tree',
  santa: 'Santa claus',
  halloween: 'Jack-o-lantern',
  card: 'Envelope',

  // Topic 23 Garden & Bugs & Phonics
  butterfly: 'Butterfly',
  bee: 'Honeybee',
  ladybug: 'Lady beetle',
  ant: 'Ant',
  grass: 'Sheaf of rice',
  mushroom: 'Mushroom',
  nest: 'Nest with eggs',
  insect: 'Bug',
  web: 'Spider web',
  van: 'Minibus',
  queen: 'Crown',

  // Topic 24 Actions & Kids Routine/Sports
  swim: 'Person swimming',
  dance: 'Woman dancing',
  sing: 'Studio microphone',
  climb: 'Person climbing',
  clap: 'Clapping hands',
  wave: 'Waving hand',
  read: 'Open book',
  drawing: 'Artist palette',
  cycling: 'Person biking',
  football: 'Soccer ball',
  basketball: 'Basketball',
  badminton: 'Badminton',
  tennis: 'Tennis',

  // Kids 6-10 Extra Words
  pen: 'Fountain pen',
  ruler: 'Straight ruler',
  desk: 'Chair',
  house: 'House',
  window: 'Window',
  garden: 'Blossom',
  sofa: 'Couch and lamp',
  'living-room': 'Couch and lamp',
  angry: 'Angry face',
  thirsty: 'Glass of milk',
  scared: 'Fearful face',
  excited: 'Star-struck',
  park: 'National park',
  library: 'Books',
  hospital: 'Hospital',
  supermarket: 'Shopping cart',
  bakery: 'Croissant',
  cinema: 'Cinema',
  'post-office': 'Post office',
  clock: 'Alarm clock',
  morning: 'Sunrise',
  night: 'Night with stars',
  calendar: 'Calendar',
  hair: 'Person blonde hair',
  'wash-face': 'Soap',
  'have-breakfast': 'Pancakes',
  'have-lunch': 'Bento box',
  'do-homework': 'Memo',
};

/**
 * 3. Audience / Exam / Universal Concept Studio 3D Assets -> public/img/art/
 */
const FLUENT_APP_ART = {
  'aud-preschool': 'Hatching chick',
  'aud-kids': 'Teddy bear',
  'aud-teen': 'Backpack',
  'aud-university': 'Graduation cap',
  'aud-worker': 'Briefcase',
  'aud-exam': 'Trophy',

  'exam-ielts': 'Globe showing europe-africa',
  'exam-toeic': 'Briefcase',
  'exam-toefl': 'Books',
  'exam-vstep': 'Graduation cap',
  'exam-cambridge': 'Crown',

  'concept-laptop': 'Laptop',
  'concept-office': 'Office building',
  'concept-meeting': 'Handshake',
  'concept-chart': 'Chart increasing',
  'concept-contract': 'Memo',
  'concept-globe': 'Globe with meridians',
  'concept-graduation': 'Graduation cap',
  'concept-microscope': 'Microscope',
  'concept-rocket': 'Rocket',
  'concept-brain': 'Brain',
  'concept-health': 'Stethoscope',
  'concept-law': 'Balance scale',
  'concept-money': 'Money bag',
  'concept-lightbulb': 'Light bulb',
  'concept-search': 'Magnifying glass tilted left',
  'concept-writing': 'Fountain pen',
  'concept-headphones': 'Headphone',
  'concept-calendar': 'Calendar',
  'concept-speech': 'Speech balloon',
  'concept-compass': 'Compass',
  'concept-clock': 'Alarm clock',
  'concept-key': 'Key',
  'concept-gear': 'Gear',
  'concept-shield': 'Shield',
  'concept-target': 'Bullseye',
  'concept-fire': 'Fire',
  'concept-camera': 'Camera',
  'concept-music': 'Musical notes',
  'concept-home': 'House',
  'concept-travel': 'Airplane',
  'concept-food': 'Bento box',
  'concept-sports': 'Soccer ball',
  'concept-nature': 'Deciduous tree',
  'concept-people': 'Busts in silhouette',
  'concept-tools': 'Hammer and wrench',
};

function isNearWhite(data, idx, tol = 240) {
  return data[idx] >= tol && data[idx + 1] >= tol && data[idx + 2] >= tol;
}

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
  if (bestStart !== -1 && bestLen >= 2) return Math.round(bestStart + bestLen / 2);
  return fallback;
}

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
        console.warn(`[WARN] Edge touch in ${sheetName} R${row + 1}C${col + 1}`);
      }

      const trimmedPng = await sharp(rgba, { raw: { width: cw, height: ch, channels: 4 } })
        .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
        .png()
        .toBuffer();

      cells[row * 3 + col] = trimmedPng;
    }
  }
  return cells;
}

async function saveCenteredCard(transparentPng, outPath, withShadow = false) {
  const fitted = await sharp(transparentPng)
    .trim({ threshold: 8 })
    .resize(456, 456, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();

  const layers = [];
  if (withShadow) {
    const shadowSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600">
      <defs>
        <radialGradient id="sh" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#64748B" stop-opacity="0.22" />
          <stop offset="100%" stop-color="#64748B" stop-opacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="300" cy="528" rx="165" ry="22" fill="url(#sh)" />
    </svg>`;
    layers.push({ input: Buffer.from(shadowSvg), left: 0, top: 0 });
  }
  layers.push({ input: fitted, gravity: 'center' });

  await sharp({
    create: {
      width: 600,
      height: 600,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite(layers)
    .flatten({ background: '#FFFFFF' })
    .webp({ quality: 90 })
    .toFile(outPath);
}

async function buildExactFourCard(fourCellPng, starWordPath, outPath) {
  const { data: cellRaw, info: cellInfo } = await sharp(fourCellPng)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const cw = cellInfo.width;
  const ch = cellInfo.height;
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

  const { data: starData, info: starInfo } = await sharp(starWordPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { rgba: cleanStar } = stripOuterWhiteBackground(starData, starInfo.width, starInfo.height, 242);
  const starBuf = await sharp(cleanStar, { raw: { width: starInfo.width, height: starInfo.height, channels: 4 } })
    .trim({ threshold: 10 })
    .resize(112, 112, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 600, height: 600, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
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

async function fetchFluent3D(folderName) {
  const keepHyphen = folderName.toLowerCase().replace(/:/g, '').replace(/ /g, '_');
  const underscored = keepHyphen.replace(/-/g, '_');
  const slugs = keepHyphen === underscored ? [keepHyphen] : [keepHyphen, underscored];
  const candidates = [];
  for (const s of slugs) {
    candidates.push(
      `https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/${encodeURIComponent(folderName)}/3D/${s}_3d.png`,
      `https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/${encodeURIComponent(folderName)}/Default/3D/${s}_3d_default.png`
    );
  }
  for (const url of candidates) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (res.ok) return Buffer.from(await res.arrayBuffer());
    } catch {
      // retry next
    }
  }
  return null;
}

/**
 * Custom crisp glossy vector/3D SVGs for abstract colors/shapes/play items
 * not found verbatim in FluentUI 3D.
 */
function buildCustomGlossySvgs() {
  const svgCard = (inner) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
      <defs>
        <radialGradient id="sh" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#64748B" stop-opacity="0.2" />
          <stop offset="100%" stop-color="#64748B" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="600" fill="#FFFFFF" />
      <ellipse cx="300" cy="520" rx="155" ry="20" fill="url(#sh)" />
      ${inner}
    </svg>`;

  const droplet = (c1, c2, stroke) =>
    svgCard(`
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${c1}" />
          <stop offset="100%" stop-color="${c2}" />
        </linearGradient>
      </defs>
      <path d="M300 95 C235 205 155 290 155 375 C155 456 220 510 300 510 C380 510 445 456 445 375 C445 290 365 205 300 95 Z" fill="url(#g)" stroke="${stroke}" stroke-width="10"/>
      <ellipse cx="242" cy="315" rx="22" ry="48" fill="#FFFFFF" opacity="0.45" transform="rotate(-18 242 315)" />
      <circle cx="226" cy="382" r="12" fill="#FFFFFF" opacity="0.4" />
    `);

  return {
    orange: droplet('#FB923C', '#EA580C', '#C2410C'),
    purple: droplet('#C084FC', '#9333EA', '#7E22CE'),
    pink: droplet('#F472B6', '#DB2777', '#BE185D'),
    rectangle: svgCard(`
      <defs><linearGradient id="r" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#A78BFA"/><stop offset="100%" stop-color="#7C3AED"/></linearGradient></defs>
      <rect x="85" y="165" width="430" height="270" rx="34" fill="url(#r)" stroke="#5B21B6" stroke-width="10"/>
      <rect x="108" y="185" width="380" height="45" rx="18" fill="#FFFFFF" opacity="0.28"/>
    `),
    oval: svgCard(`
      <defs><linearGradient id="ov" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#34D399"/><stop offset="100%" stop-color="#059669"/></linearGradient></defs>
      <ellipse cx="300" cy="300" rx="215" ry="145" fill="url(#ov)" stroke="#047857" stroke-width="10"/>
      <ellipse cx="235" cy="225" rx="85" ry="26" fill="#FFFFFF" opacity="0.3" transform="rotate(-12 235 225)"/>
    `),
    diamond: svgCard(`
      <defs><linearGradient id="dm" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#38BDF8"/><stop offset="100%" stop-color="#0284C7"/></linearGradient></defs>
      <polygon points="300,85 495,300 300,515 105,300" fill="url(#dm)" stroke="#0369A1" stroke-width="10" stroke-linejoin="round"/>
      <polygon points="300,115 390,235 300,295 210,235" fill="#FFFFFF" opacity="0.28"/>
    `),
    cube: svgCard(`
      <polygon points="300,110 470,195 300,280 130,195" fill="#FDE047" stroke="#CA8A04" stroke-width="8" stroke-linejoin="round"/>
      <polygon points="130,195 300,280 300,480 130,395" fill="#FACC15" stroke="#CA8A04" stroke-width="8" stroke-linejoin="round"/>
      <polygon points="470,195 300,280 300,480 470,395" fill="#EAB308" stroke="#CA8A04" stroke-width="8" stroke-linejoin="round"/>
    `),
    line: svgCard(`
      <line x1="95" y1="365" x2="505" y2="215" stroke="#F43F5E" stroke-width="34" stroke-linecap="round"/>
      <circle cx="95" cy="365" r="24" fill="#FB7185" stroke="#BE123C" stroke-width="8"/>
      <circle cx="505" cy="215" r="24" fill="#FB7185" stroke="#BE123C" stroke-width="8"/>
    `),
    seesaw: svgCard(`
      <polygon points="300,320 250,475 350,475" fill="#3B82F6" stroke="#1D4ED8" stroke-width="8" stroke-linejoin="round"/>
      <g transform="rotate(-12 300 330)">
        <rect x="85" y="315" width="430" height="32" rx="16" fill="#F59E0B" stroke="#B45309" stroke-width="8"/>
        <rect x="115" y="275" width="60" height="40" rx="12" fill="#EC4899" stroke="#BE185D" stroke-width="7"/>
        <rect x="425" y="275" width="60" height="40" rx="12" fill="#10B981" stroke="#047857" stroke-width="7"/>
      </g>
    `),
    sandbox: svgCard(`
      <rect x="95" y="290" width="410" height="150" rx="24" fill="#D97706" stroke="#92400E" stroke-width="9"/>
      <ellipse cx="300" cy="310" rx="175" ry="60" fill="#FDE68A" stroke="#F59E0B" stroke-width="6"/>
      <polygon points="245,270 355,270 335,190 265,190" fill="#FBBF24" stroke="#B45309" stroke-width="7"/>
      <rect x="275" y="160" width="50" height="35" rx="6" fill="#EF4444" stroke="#B91C1C" stroke-width="6"/>
      <rect x="370" y="240" width="58" height="75" rx="10" fill="#38BDF8" stroke="#0284C7" stroke-width="7" transform="rotate(14 399 277)"/>
    `),
    'party-hat': svgCard(`
      <defs><linearGradient id="ph" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#F472B6"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient></defs>
      <polygon points="300,115 450,475 150,475" fill="url(#ph)" stroke="#6D28D9" stroke-width="10" stroke-linejoin="round"/>
      <circle cx="265" cy="300" r="22" fill="#FDE047"/>
      <circle cx="335" cy="365" r="24" fill="#38BDF8"/>
      <circle cx="245" cy="415" r="20" fill="#4ADE80"/>
      <circle cx="300" cy="105" r="34" fill="#FACC15" stroke="#CA8A04" stroke-width="8"/>
    `),
    eraser: svgCard(`
      <g transform="rotate(-18 300 300)">
        <rect x="135" y="210" width="330" height="175" rx="28" fill="#F472B6" stroke="#BE185D" stroke-width="10"/>
        <rect x="295" y="210" width="170" height="175" rx="20" fill="#38BDF8" stroke="#0369A1" stroke-width="10"/>
        <line x1="295" y1="210" x2="295" y2="385" stroke="#FFFFFF" stroke-width="8"/>
      </g>
    `),
    swing: svgCard(`
      <path d="M130 480 L205 140 L395 140 L470 480" fill="none" stroke="#EF4444" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="255" y1="145" x2="245" y2="375" stroke="#64748B" stroke-width="8"/>
      <line x1="345" y1="145" x2="355" y2="375" stroke="#64748B" stroke-width="8"/>
      <rect x="225" y="368" width="150" height="28" rx="12" fill="#FBBF24" stroke="#B45309" stroke-width="7"/>
    `),
    fly: svgCard(`
      <path d="M135 280 Q215 170 295 255 Q375 170 455 280" fill="none" stroke="#38BDF8" stroke-width="22" stroke-linecap="round"/>
      <circle cx="295" cy="245" r="38" fill="#FBBF24" stroke="#D97706" stroke-width="8"/>
      <circle cx="282" cy="240" r="5" fill="#1E293B"/><circle cx="308" cy="240" r="5" fill="#1E293B"/>
      <path d="M285 258 Q295 268 305 258" fill="none" stroke="#92400E" stroke-width="5" stroke-linecap="round"/>
    `),
  };
}

/**
 * Generates clean Montessori Number Cards for 7..20 (matching Kids 1-20 & Preschool)
 */
async function buildNumberCard(num, hex, itemPath, outPath) {
  const { data, info } = await sharp(itemPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { rgba } = stripOuterWhiteBackground(data, info.width, info.height, 242);
  const badgeItem = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 8 })
    .resize(130, 130, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();

  const cardSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <rect width="600" height="600" fill="#FFFFFF" />
    <rect x="52" y="90" width="496" height="420" rx="56" fill="${hex}18" stroke="${hex}" stroke-width="12" />
    <text x="235" y="385" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="250" fill="${hex}">${num}</text>
  </svg>`;

  await sharp(Buffer.from(cardSvg))
    .composite([{ input: badgeItem, left: 375, top: 235 }])
    .flatten({ background: '#FFFFFF' })
    .webp({ quality: 90 })
    .toFile(outPath);
}

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
  const coversOnly = process.argv.includes('--covers-only');
  await Promise.all([
    fs.mkdir(WORDS_DIR, { recursive: true }),
    fs.mkdir(UNITS_DIR, { recursive: true }),
    fs.mkdir(APP_ART_DIR, { recursive: true }),
  ]);

  if (!coversOnly) {
    // 1. Slice & save all 14 Studio Sprite Sheets (126 crisp illustrations)
    let sheetSaved = 0;
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
        await saveCenteredCard(cell, path.join(WORDS_DIR, `${slug}.webp`), false);
        sheetSaved++;
      }
    }
    if (fourCell) {
      await buildExactFourCard(fourCell, path.join(WORDS_DIR, 'star.webp'), path.join(WORDS_DIR, 'four.webp'));
      sheetSaved++;
    }
    console.log(`[1/5] Sliced & centered ${sheetSaved} custom Studio Sheet illustrations.`);

    // 2. Fetch & compose FluentUI 3D Studio PNGs for Words + Kids Curriculum
    let fluentSaved = 0;
    const fluentEntries = Object.entries(FLUENT_3D_WORDS);
    const CONCURRENCY = 10;
    for (let i = 0; i < fluentEntries.length; i += CONCURRENCY) {
      const batch = fluentEntries.slice(i, i + CONCURRENCY);
      await Promise.all(
        batch.map(async ([slug, folder]) => {
          const buf = await fetchFluent3D(folder);
          if (!buf) {
            console.warn(`[WARN] Fluent 3D not found for ${slug} -> ${folder}`);
            return;
          }
          await saveCenteredCard(buf, path.join(WORDS_DIR, `${slug}.webp`), true);
          fluentSaved++;
        })
      );
    }
    console.log(`[2/5] Built ${fluentSaved}/${fluentEntries.length} FluentUI 3D word cards.`);

    // 3. Build Custom Glossy SVGs + Montessori Numbers 7..20
    const customSvgs = buildCustomGlossySvgs();
    for (const [slug, svg] of Object.entries(customSvgs)) {
      await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(path.join(WORDS_DIR, `${slug}.webp`));
    }
    const numExtras = [
      ['seven', 7, '#0284C7', 'star'],
      ['eight', 8, '#7C3AED', 'apple'],
      ['nine', 9, '#DB2777', 'ball'],
      ['ten', 10, '#EA580C', 'balloon'],
      ['eleven', 11, '#16A34A', 'banana'],
      ['twelve', 12, '#2563EB', 'flower'],
      ['thirteen', 13, '#D97706', 'car'],
      ['fourteen', 14, '#0D9488', 'cookie'],
      ['fifteen', 15, '#E11D48', 'strawberry'],
      ['sixteen', 16, '#9333EA', 'kite'],
      ['seventeen', 17, '#0891B2', 'duck'],
      ['eighteen', 18, '#CA8A04', 'cupcake'],
      ['nineteen', 19, '#4F46E5', 'fish'],
      ['twenty', 20, '#059669', 'trophy'],
    ];
    for (const [slug, num, hex, item] of numExtras) {
      const itemFile = path.join(WORDS_DIR, `${item === 'cupcake' ? 'cake' : item}.webp`);
      await buildNumberCard(num, hex, itemFile, path.join(WORDS_DIR, `${slug}.webp`));
    }
    // Useful aliases for Kids / App components
    await fs.copyFile(path.join(WORDS_DIR, 'coat.webp'), path.join(WORDS_DIR, 'jacket.webp'));
    await fs.copyFile(path.join(WORDS_DIR, 'pants.webp'), path.join(WORDS_DIR, 'shorts.webp'));
    await fs.copyFile(path.join(WORDS_DIR, 'cook.webp'), path.join(WORDS_DIR, 'chef.webp'));
    await fs.copyFile(path.join(WORDS_DIR, 'bed.webp'), path.join(WORDS_DIR, 'go-to-bed.webp'));
    console.log(`[3/5] Built ${Object.keys(customSvgs).length} glossy geometric/play cards + 14 Kids number cards (7..20).`);

    // 4. Fetch & compose App-wide Audience, Exam & Concept Illustrations -> public/img/art/
    let appArtSaved = 0;
    const appEntries = Object.entries(FLUENT_APP_ART);
    for (let i = 0; i < appEntries.length; i += CONCURRENCY) {
      const batch = appEntries.slice(i, i + CONCURRENCY);
      await Promise.all(
        batch.map(async ([slug, folder]) => {
          const buf = await fetchFluent3D(folder);
          if (!buf) {
            console.warn(`[WARN] Fluent 3D missing app art: ${slug} -> ${folder}`);
            return;
          }
          await saveCenteredCard(buf, path.join(APP_ART_DIR, `${slug}.webp`), true);
          appArtSaved++;
        })
      );
    }
    console.log(`[4/5] Built ${appArtSaved}/${appEntries.length} Audience, Exam & Concept cards in public/img/art/.`);
    await fs.copyFile(path.join(WORDS_DIR, 'hug.webp'), path.join(APP_ART_DIR, 'concept-family.webp'));
  }

  // 5. Build all Little English World Topic Cover Banners (currently 36 topics)
  const uniqueTopics = Array.from(new Map(LEW_TOPICS.map((t) => [t.id, t])).values());
  for (const topic of uniqueTopics) {
    await buildUnitCoverBanner(topic, path.join(UNITS_DIR, `${topic.coverSlug}.webp`));
  }
  console.log(`[5/5] Built ${uniqueTopics.length} Little English World topic cover banners.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

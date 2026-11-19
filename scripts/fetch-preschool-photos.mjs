import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const WORDS_DIR = path.join(ROOT, 'public', 'preschool', 'img', 'words');
const UNITS_DIR = path.join(ROOT, 'public', 'preschool', 'img', 'units');

const HEADERS = {
  'User-Agent': 'MyEnglishPreschoolApp/1.0 (https://github.com/0xAndyNew/MyEnglish; educational)',
};

/**
 * Curated Wikipedia article titles (canonical lead photographs) + Commons search query fallback
 * for all 85 Little English World vocabulary slugs.
 */
const WORD_PHOTO_SPECS = {
  // 01 My Family
  mommy: { wiki: 'Motherhood', search: 'happy mother holding smiling child outdoors photo' },
  daddy: { wiki: 'Father', search: 'father smiling child portrait photo' },
  baby: { wiki: 'Infant', search: 'smiling baby toddler portrait photo' },
  sister: { wiki: 'Sister', search: 'happy little girl smiling portrait photo' },
  brother: { wiki: 'Boy', search: 'happy little boy smiling portrait photo' },
  grandma: { wiki: 'Grandparent', search: 'smiling grandmother portrait photo' },
  grandpa: { wiki: 'Grandfather', search: 'smiling grandfather portrait photo' },
  hug: { wiki: 'Maternal_bond', search: 'mother hugging child smiling outdoors photo' },

  // 02 My Body
  head: { wiki: 'Toddler', search: 'happy smiling toddler child face portrait photo' },
  eyes: { wiki: 'Human_eye', search: 'child eyes closeup portrait photo' },
  ears: { wiki: 'Ear', search: 'human ear closeup photo' },
  nose: { wiki: 'Human_nose', search: 'child nose face portrait photo' },
  mouth: { wiki: 'Smile', search: 'happy smiling child mouth teeth photo' },
  hands: { wiki: 'Hand', search: 'child hands open palms photo' },
  toes: { wiki: 'Toe', search: 'baby feet toes photo' },

  // 03 Animals
  dog: { wiki: 'Golden_Retriever', search: 'Golden Retriever puppy dog photo' },
  cat: { wiki: 'Tabby_cat', search: 'cute kitten tabby cat photo' },
  bird: { wiki: 'European_robin', search: 'colorful songbird perched branch photo' },
  duck: { wiki: 'Domestic_duck', search: 'yellow duckling swimming water photo' },
  cow: { wiki: 'Cattle', search: 'dairy cow pasture green grass photo' },
  rabbit: { wiki: 'Domestic_rabbit', search: 'cute white bunny rabbit grass photo' },
  lion: { wiki: 'Lion', search: 'male lion savanna photo' },
  elephant: { wiki: 'African_bush_elephant', search: 'african elephant savanna photo' },

  // 04 Colors (represented by vivid real-world color photos)
  red: { wiki: 'Garden_strawberry', search: 'bright red ripe strawberry closeup photo' },
  blue: { wiki: 'Sky', search: 'bright blue sky white clouds photo' },
  yellow: { wiki: 'Common_sunflower', search: 'bright yellow sunflower bloom photo' },
  green: { wiki: 'Leaf', search: 'fresh green leaf nature closeup photo' },

  // 05 Fruits & Food
  apple: { wiki: 'Apple', search: 'red apple fruit closeup photo' },
  banana: { wiki: 'Banana', search: 'ripe yellow bananas fruit photo' },
  milk: { wiki: 'Milk', search: 'glass of fresh white milk photo' },
  water: { wiki: 'Drinking_water', search: 'clear glass of drinking water photo' },
  bread: { wiki: 'Bread', search: 'sliced loaf of fresh bread photo' },
  rice: { wiki: 'Cooked_rice', search: 'white cooked rice bowl photo' },
  egg: { wiki: 'Egg_as_food', search: 'chicken eggs bowl photo' },

  // 06 My Toys
  ball: { wiki: 'Ball', search: 'colorful beach ball soccer ball toy photo' },
  doll: { wiki: 'Doll', search: 'cute plush doll toy child photo' },
  car: { wiki: 'Model_car', search: 'colorful toy car miniature photo' },
  blocks: { wiki: 'Toy_block', search: 'colorful wooden building blocks toy photo' },
  teddy: { wiki: 'Teddy_bear', search: 'plush brown teddy bear toy photo' },
  train: { wiki: 'Toy_train', search: 'wooden toy train colorful photo' },
  kite: { wiki: 'Kite', search: 'colorful kite flying blue sky photo' },

  // 07 My Home
  bedroom: { wiki: 'Bedroom', search: 'cozy bright bedroom bed pillow photo' },
  kitchen: { wiki: 'Kitchen', search: 'modern home kitchen interior photo' },
  bathroom: { wiki: 'Bathroom', search: 'clean home bathroom bathtub sink photo' },
  bed: { wiki: 'Bed', search: 'cozy bed pillows blanket bedroom photo' },
  chair: { wiki: 'Chair', search: 'wooden chair furniture photo' },
  table: { wiki: 'Table_(furniture)', search: 'wooden dining table furniture photo' },
  door: { wiki: 'Door', search: 'colorful wooden front door house photo' },

  // 08 My School
  teacher: { wiki: 'Kindergarten', search: 'teacher reading book to children classroom photo' },
  friend: { wiki: 'Friendship', search: 'two happy children playing together photo' },
  book: { wiki: 'Book', search: 'open colorful children book reading photo' },
  bag: { wiki: 'Backpack', search: 'colorful school backpack bag photo' },
  pencil: { wiki: 'Colored_pencil', search: 'colorful wooden pencils closeup photo' },
  crayon: { wiki: 'Crayon', search: 'colorful wax crayons closeup photo' },
  school: { wiki: 'Preschool', search: 'elementary school building playground photo' },

  // 10 Nature & Weather
  sun: { wiki: 'Sunlight', search: 'bright sun shining blue sky meadow photo' },
  rainy: { wiki: 'Rain', search: 'raindrops falling green leaf umbrella photo' },
  cloudy: { wiki: 'Cumulus_cloud', search: 'fluffy white cumulus clouds blue sky photo' },
  tree: { wiki: 'Tree', search: 'big green oak tree field summer photo' },
  flower: { wiki: 'Flower', search: 'colorful blooming flower garden closeup photo' },
  hot: { wiki: 'Beach', search: 'sunny summer beach palm tree sunshine photo' },
  cold: { wiki: 'Snowman', search: 'winter snowman snow scarf photo' },

  // 11 Daily Activities
  'wake-up': { wiki: 'Alarm_clock', search: 'morning alarm clock sunlit bedroom photo' },
  'brush-teeth': { wiki: 'Toothbrush', search: 'toothbrush toothpaste bathroom photo' },
  play: { wiki: 'Playground', search: 'children playing outdoor playground slide photo' },
  jump: { wiki: 'Jumping', search: 'happy child jumping park grass photo' },
  run: { wiki: 'Running', search: 'child running green meadow park photo' },
  bath: { wiki: 'Bathtub', search: 'bubble bath rubber duck bathtub photo' },
  sleep: { wiki: 'Sleep', search: 'sleeping child pillow cozy bed photo' },

  // 12 Feelings & Communication
  happy: { wiki: 'Laughter', search: 'laughing happy child smiling outdoors photo' },
  sad: { wiki: 'Crying', search: 'pouting sad toddler child face photo' },
  sleepy: { wiki: 'Yawn', search: 'yawning sleepy baby child bed photo' },
  hungry: { wiki: 'Breakfast', search: 'child eating breakfast bowl spoon photo' },
  hello: { wiki: 'Wave_(gesture)', search: 'child waving hand hello smiling photo' },
  'bye-bye': { wiki: 'Hand_wave', search: 'child waving goodbye smiling photo' },
};

/**
 * 12 Topic cover photo specs (800x520 full-bleed landscape cards)
 */
const UNIT_COVER_SPECS = {
  'ex-u5': { fromWord: 'hug', search: 'happy family parents children outdoors park photo' },
  'tt-u2': { fromWord: 'head', search: 'happy toddler child smiling portrait photo' },
  'tt-u3': { fromWord: 'dog', search: 'cute golden retriever puppy grass photo' },
  'ex-u2': { fromWord: 'crayon', search: 'colorful rainbow crayons blocks art photo' },
  'tt-u4': { fromWord: 'apple', search: 'fresh colorful fruits apples bananas basket photo' },
  'tt-u7': { fromWord: 'teddy', search: 'teddy bear colorful wooden toys room photo' },
  'bs-u5': { fromWord: 'bedroom', search: 'cozy family home living room interior photo' },
  'bs-u1': { fromWord: 'book', search: 'colorful books pencils backpack school desk photo' },
  'ex-u3': { fromWord: 'blocks', search: 'colorful wooden number blocks toys photo' },
  'ex-u11': { fromWord: 'tree', search: 'sunny green nature landscape tree flowers sky photo' },
  'bs-u11': { fromWord: 'play', search: 'happy child playing sunny park morning photo' },
  'ex-u12': { fromWord: 'happy', search: 'happy smiling children friends laughing photo' },
};

async function fetchWikiThumbMap(titles) {
  const map = new Map();
  const chunkSize = 20;
  for (let i = 0; i < titles.length; i += chunkSize) {
    const chunk = titles.slice(i, i + chunkSize);
    const url = `https://en.wikipedia.org/w/api.php?action=query&redirects=1&titles=${encodeURIComponent(
      chunk.join('|')
    )}&prop=pageimages&pithumbsize=720&format=json`;
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (!res.ok) continue;
      const data = await res.json();
      const redirects = new Map();
      for (const r of data.query?.redirects || []) {
        redirects.set(r.to, r.from);
      }
      const norm = new Map();
      for (const n of data.query?.normalized || []) {
        norm.set(n.to, n.from);
      }
      for (const page of Object.values(data.query?.pages || {})) {
        const src = page.thumbnail?.source;
        if (src && !/\.svg(\.png)?$/i.test(src)) {
          const origRedirect = redirects.get(page.title) || page.title;
          const origKey = norm.get(origRedirect) || origRedirect;
          map.set(origKey, src);
          map.set(page.title, src);
          map.set(page.title.replace(/ /g, '_'), src);
        }
      }
    } catch {
      // Fallback handled per item
    }
  }
  return map;
}

async function isVividColorPhoto(buf) {
  try {
    const stats = await sharp(buf).stats();
    if (!stats.channels || stats.channels.length < 3) return false;
    const r = stats.channels[0].mean;
    const g = stats.channels[1].mean;
    const b = stats.channels[2].mean;
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    return spread >= 7.5;
  } catch {
    return false;
  }
}

async function searchCommonsPhotoBuffer(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    `filetype:bitmap ${query}`
  )}&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url&iiurlwidth=720&format=json`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return null;
  const data = await res.json();
  const pages = Object.values(data.query?.pages || {}).sort(
    (a, b) => (a.index ?? 999) - (b.index ?? 999)
  );
  for (const p of pages) {
    const title = p.title || '';
    const thumb = p.imageinfo?.[0]?.thumburl || p.imageinfo?.[0]?.url;
    if (
      thumb &&
      /\.(jpe?g|png|webp)/i.test(thumb) &&
      !/icon|logo|map|diagram|chart|stamp|grave|war|historical|18\d\d|190\d|191\d|192\d/i.test(title)
    ) {
      const buf = await downloadBuffer(thumb);
      if (buf && (await isVividColorPhoto(buf))) {
        return buf;
      }
    }
  }
  return null;
}

async function downloadBuffer(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (res.ok) {
        return Buffer.from(await res.arrayBuffer());
      }
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  return null;
}

async function buildMontessoriNumberCard(slug, num, colorHex, itemFile, outPath) {
  const itemBuf = await sharp(itemFile)
    .resize(150, 150, { fit: 'cover' })
    .composite([
      {
        input: Buffer.from(
          `<svg width="150" height="150"><rect width="150" height="150" rx="28" fill="none" stroke="#FFFFFF" stroke-width="8"/></svg>`
        ),
      },
    ])
    .png()
    .toBuffer();

  const bgSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colorHex}" />
        <stop offset="100%" stop-color="#1E293B" />
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#g)" />
    <circle cx="130" cy="130" r="95" fill="#FFFFFF" />
    <text x="130" y="168" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="115" fill="${colorHex}">${num}</text>
  </svg>`;

  const positions = [
    [{ left: 260, top: 220 }],
    [
      { left: 190, top: 270 },
      { left: 370, top: 270 },
    ],
    [
      { left: 280, top: 170 },
      { left: 170, top: 360 },
      { left: 390, top: 360 },
    ],
    [
      { left: 170, top: 210 },
      { left: 370, top: 210 },
      { left: 170, top: 390 },
      { left: 370, top: 390 },
    ],
    [
      { left: 260, top: 140 },
      { left: 110, top: 280 },
      { left: 410, top: 280 },
      { left: 170, top: 425 },
      { left: 350, top: 425 },
    ],
    [
      { left: 80, top: 240 },
      { left: 240, top: 240 },
      { left: 400, top: 240 },
      { left: 80, top: 410 },
      { left: 240, top: 410 },
      { left: 400, top: 410 },
    ],
  ][num - 1];

  const layers = positions.map((pos) => ({ input: itemBuf, left: pos.left, top: pos.top }));
  await sharp(Buffer.from(bgSvg)).composite(layers).webp({ quality: 86 }).toFile(outPath);
}

async function buildMontessoriShapeCard(slug, photoPath, shapeSvg, outPath) {
  const blurredBg = await sharp(photoPath)
    .resize(600, 600, { fit: 'cover' })
    .modulate({ brightness: 0.85, saturation: 1.15 })
    .blur(8)
    .png()
    .toBuffer();

  const overlay = await sharp(Buffer.from(shapeSvg)).resize(600, 600).png().toBuffer();
  await sharp(blurredBg)
    .composite([{ input: overlay, left: 0, top: 0 }])
    .webp({ quality: 86 })
    .toFile(outPath);
}

async function main() {
  await fs.mkdir(WORDS_DIR, { recursive: true });
  await fs.mkdir(UNITS_DIR, { recursive: true });

  const entries = Object.entries(WORD_PHOTO_SPECS);
  const wikiTitles = entries.map(([, v]) => v.wiki);
  console.log(`Querying Wikipedia lead photos for ${wikiTitles.length} concepts...`);
  const wikiMap = await fetchWikiThumbMap(wikiTitles);

  let downloadedWords = 0;
  for (const [slug, spec] of entries) {
    const outPath = path.join(WORDS_DIR, `${slug}.webp`);
    const wikiUrl = wikiMap.get(spec.wiki) || wikiMap.get(spec.wiki.replace(/_/g, ' '));
    let validBuf = null;
    if (wikiUrl) {
      const candidate = await downloadBuffer(wikiUrl);
      if (candidate && (await isVividColorPhoto(candidate))) {
        validBuf = candidate;
      }
    }
    if (!validBuf) {
      validBuf = await searchCommonsPhotoBuffer(spec.search);
    }
    if (validBuf) {
      try {
        await sharp(validBuf)
          .resize(600, 600, { fit: 'cover', position: 'attention' })
          .webp({ quality: 84 })
          .toFile(outPath);
        downloadedWords++;
      } catch {
        // skip
      }
    }
  }
  console.log(`Saved ${downloadedWords}/${entries.length} real photographic word cards.`);

  // Generate Montessori photo-composite cards for Numbers 1–6
  const numberSpecs = [
    { slug: 'one', num: 1, hex: '#E11D48', item: 'apple' },
    { slug: 'two', num: 2, hex: '#D97706', item: 'duck' },
    { slug: 'three', num: 3, hex: '#0284C7', item: 'ball' },
    { slug: 'four', num: 4, hex: '#16A34A', item: 'car' },
    { slug: 'five', num: 5, hex: '#7C3AED', item: 'flower' },
    { slug: 'six', num: 6, hex: '#EA580C', item: 'teddy' },
  ];
  for (const n of numberSpecs) {
    await buildMontessoriNumberCard(
      n.slug,
      n.num,
      n.hex,
      path.join(WORDS_DIR, `${n.item}.webp`),
      path.join(WORDS_DIR, `${n.slug}.webp`)
    );
  }

  // Generate full-bleed photo-backed Montessori shape cards
  const shapeSpecs = [
    {
      slug: 'circle',
      bgWord: 'red',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="300" r="210" fill="#EF4444" stroke="#FFFFFF" stroke-width="22"/></svg>`,
    },
    {
      slug: 'square',
      bgWord: 'blue',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect x="110" y="110" width="380" height="380" rx="36" fill="#3B82F6" stroke="#FFFFFF" stroke-width="22"/></svg>`,
    },
    {
      slug: 'triangle',
      bgWord: 'green',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><polygon points="300,85 515,475 85,475" fill="#10B981" stroke="#FFFFFF" stroke-width="22" stroke-linejoin="round"/></svg>`,
    },
    {
      slug: 'star',
      bgWord: 'yellow',
      svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><polygon points="300,70 366,214 524,233 407,342 438,498 300,421 162,498 193,342 76,233 234,214" fill="#FACC15" stroke="#FFFFFF" stroke-width="20" stroke-linejoin="round"/></svg>`,
    },
  ];
  for (const s of shapeSpecs) {
    await buildMontessoriShapeCard(
      s.slug,
      path.join(WORDS_DIR, `${s.bgWord}.webp`),
      s.svg,
      path.join(WORDS_DIR, `${s.slug}.webp`)
    );
  }

  // Generate 12 Topic Cover full-bleed landscape photos (800x520)
  let unitCovers = 0;
  for (const [unitId, spec] of Object.entries(UNIT_COVER_SPECS)) {
    const outPath = path.join(UNITS_DIR, `${unitId}.webp`);
    const buf = await searchCommonsPhotoBuffer(spec.search);
    if (buf) {
      try {
        await sharp(buf)
          .resize(800, 520, { fit: 'cover', position: 'attention' })
          .webp({ quality: 85 })
          .toFile(outPath);
        unitCovers++;
        continue;
      } catch {
        // fallback to word photo
      }
    }
    const fallbackWordPath = path.join(WORDS_DIR, `${spec.fromWord}.webp`);
    await sharp(fallbackWordPath)
      .resize(800, 520, { fit: 'cover', position: 'attention' })
      .webp({ quality: 85 })
      .toFile(outPath);
    unitCovers++;
  }
  console.log(`Saved ${unitCovers}/12 full-bleed topic cover photos.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, 'public', 'preschool', 'raw');
const IMG_DIR = path.join(ROOT, 'public', 'preschool', 'img');
const CATEGORIES = ['mascot', 'words', 'units', 'stories', 'phonics'];

async function processCategory(cat) {
  const srcDir = path.join(RAW_DIR, cat);
  const outDir = path.join(IMG_DIR, cat);
  let entries;
  try {
    entries = await fs.readdir(srcDir, { withFileTypes: true });
  } catch {
    return 0;
  }
  await fs.mkdir(outDir, { recursive: true });

  let count = 0;
  for (const ent of entries) {
    if (!ent.isFile() || !/\.(png|jpe?g|webp)$/i.test(ent.name)) continue;
    const base = ent.name.replace(/\.[^.]+$/, '');
    const srcPath = path.join(srcDir, ent.name);
    const outPath = path.join(outDir, `${base}.webp`);

    await sharp(srcPath)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .webp({ quality: 82 })
      .toFile(outPath);
    count++;
  }
  return count;
}

async function main() {
  let total = 0;
  for (const cat of CATEGORIES) {
    const n = await processCategory(cat);
    if (n > 0) console.log(`Converted ${n} images in ${cat}/`);
    total += n;
  }
  console.log(`Done! Optimized ${total} preschool images to WebP.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import fs from 'node:fs';
import path from 'node:path';

const TARGET_DIR = path.resolve(process.cwd(), 'src/components/app');
const MICRO_FONT_RE = /\btext-\[(?:[0-9]|1[01])px\]/g;
const FIXED_GRID_RE = /(?<![a-z]:)\bgrid-cols-[3-9]\b/g;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx|ts|jsx|js)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const files = fs.existsSync(TARGET_DIR) ? walk(TARGET_DIR) : [];
const violations = [];

for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, idx) => {
    const rel = path.relative(process.cwd(), file);
    if (line.includes('ui-ok')) return;
    for (const m of line.matchAll(MICRO_FONT_RE)) {
      violations.push(`${rel}:${idx + 1}: micro-font "${m[0]}" (<12px)`);
    }
    for (const m of line.matchAll(FIXED_GRID_RE)) {
      violations.push(`${rel}:${idx + 1}: fixed "${m[0]}" without mobile breakpoint`);
    }
  });
}

if (violations.length > 0) {
  console.error(`UI rule violations (${violations.length}):`);
  for (const v of violations) console.error('  -', v);
  process.exit(1);
}

console.log(`check-ui-rules passed across ${files.length} files in src/components/app.`);

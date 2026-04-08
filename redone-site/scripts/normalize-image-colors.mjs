/**
 * Re-encode images as sRGB and strip ICC/EXIF/HDR-related metadata so they match
 * in browsers (wide-gamut Display P3 / HDR-tagged JPEGs often look “brighter”).
 *
 * Usage:
 *   node scripts/normalize-image-colors.mjs
 *   node scripts/normalize-image-colors.mjs --dir public/static/food
 *   node scripts/normalize-image-colors.mjs --dry-run
 *
 * Writes files in place (temp file + rename).
 */

import { existsSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'fs';
import { join, relative, extname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');

/** JPEG / PNG / WebP only (GIF omitted — rarely HDR; convert elsewhere if needed). */
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

function parseArgs() {
  const argv = process.argv.slice(2);
  const dryRun = argv.includes('--dry-run');
  const dirIdx = argv.indexOf('--dir');
  const dirArg = dirIdx >= 0 ? argv[dirIdx + 1] : null;
  const dir = dirArg ? join(ROOT, dirArg) : join(ROOT, 'public/static');
  return { dryRun, dir };
}

function listImagesRecursive(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) {
      if (ent.name.startsWith('.')) continue;
      out.push(...listImagesRecursive(p));
    } else if (ent.isFile() && IMAGE_EXT.test(ent.name)) {
      out.push(p);
    }
  }
  return out;
}

async function normalizeToBuffer(absPath) {
  const ext = extname(absPath).toLowerCase();
  const input = readFileSync(absPath);

  const pipeline = sharp(input).rotate().toColorspace('srgb');

  if (ext === '.png') {
    return pipeline.png({ compressionLevel: 9 }).toBuffer();
  }
  if (ext === '.webp') {
    return pipeline.webp({ quality: 88 }).toBuffer();
  }
  return pipeline
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toBuffer();
}

async function main() {
  const { dryRun, dir } = parseArgs();
  const files = listImagesRecursive(dir);
  const relDir = relative(ROOT, dir) || '.';
  console.log(
    `${dryRun ? '[dry-run] ' : ''}${files.length} images under ${relDir} → sRGB, metadata stripped`,
  );

  let ok = 0;
  let failed = 0;

  for (const absPath of files) {
    const rel = relative(ROOT, absPath);
    try {
      if (dryRun) {
        const meta = await sharp(readFileSync(absPath)).metadata();
        console.log(
          `  ${rel}  ${meta.width}×${meta.height}  space=${meta.space || '?'}  profile=${meta.hasProfile ? 'yes' : 'no'}`,
        );
        ok++;
        continue;
      }

      const buf = await normalizeToBuffer(absPath);
      const tmp = `${absPath}.tmp`;
      writeFileSync(tmp, buf);
      renameSync(tmp, absPath);
      console.log(`  ${rel}`);
      ok++;
    } catch (e) {
      console.error(`  FAIL ${rel}:`, e?.message || e);
      failed++;
    }
  }

  console.log(`Done. ${ok} ok, ${failed} failed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

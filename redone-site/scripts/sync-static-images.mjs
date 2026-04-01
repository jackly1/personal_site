/**
 * Scans public/static/{self,books,film,misc,projects} for images and writes
 * data/generated/imagePool.ts.
 *
 * - Captions / omitFromGallery: data/image-meta.json (merged per file).
 * - Title + notes + rank (films/books): data/gallery-notes.json — READ ONLY during sync.
 *   Your edits are never overwritten. imagePool.ts is regenerated from disk + this file.
 *
 * Optional: node scripts/sync-static-images.mjs --init-notes
 *   Appends missing keys only (for new images in static/); does not change existing entries.
 *
 * Usage: node scripts/sync-static-images.mjs
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..');
const STATIC_ROOT = join(ROOT, 'public/static');
const META_PATH = join(ROOT, 'data/image-meta.json');
const GALLERY_NOTES_PATH = join(ROOT, 'data/gallery-notes.json');
const OUT_DIR = join(ROOT, 'data/generated');
const OUT_FILE = join(OUT_DIR, 'imagePool.ts');

const CATEGORY_TO_TYPE = {
  self: 'self',
  books: 'book',
  film: 'film',
  misc: 'misc',
  projects: 'project',
};

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif)$/i;

function loadJson(path, fallback = {}) {
  if (!existsSync(path)) return { ...fallback };
  try {
    const raw = readFileSync(path, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { ...fallback };
  }
}

/** image-meta: alt + omitFromGallery only (notes/rank live in gallery-notes.json). */
function normalizeMetaEntry(prev) {
  const p = prev && typeof prev === 'object' ? prev : {};
  return {
    alt: typeof p.alt === 'string' ? p.alt : '',
    omitFromGallery: Boolean(p.omitFromGallery),
  };
}

function mergeImageMeta(oldMeta, discoveredSrcs) {
  const merged = {};
  const discovered = new Set(discoveredSrcs);

  for (const key of Object.keys(oldMeta)) {
    if (!discovered.has(key)) {
      merged[key] = normalizeMetaEntry(oldMeta[key]);
    }
  }
  for (const src of discoveredSrcs) {
    merged[src] = normalizeMetaEntry(oldMeta[src]);
  }
  return merged;
}

/**
 * Resolve title/notes/rank per discovered file from gallery-notes.json (read-only).
 * Missing keys get in-memory defaults so imagePool still builds; they are NOT written
 * to gallery-notes.json unless you run with --init-notes.
 */
function resolveGalleryNotesForBuild(oldGalleryNotes, discoveredSrcs, imageMeta) {
  const resolved = {};

  for (const src of discoveredSrcs) {
    const gn = oldGalleryNotes[src];
    const im = imageMeta[src] || {};

    let notes = '';
    if (gn && typeof gn === 'object' && typeof gn.notes === 'string') {
      notes = gn.notes;
    } else if (typeof im.notes === 'string') {
      notes = im.notes;
    }

    let rank = null;
    if (gn && typeof gn === 'object' && 'rank' in gn) {
      if (typeof gn.rank === 'number' && !Number.isNaN(gn.rank)) {
        rank = gn.rank;
      } else {
        rank = null;
      }
    } else if (typeof im.rank === 'number' && !Number.isNaN(im.rank)) {
      rank = im.rank;
    } else if (im.rank === null) {
      rank = null;
    }

    let title = '';
    if (gn && typeof gn === 'object' && typeof gn.title === 'string') {
      title = gn.title;
    }

    resolved[src] = { notes, rank, title };
  }

  return resolved;
}

/** Append missing src keys only; preserves existing entries and extra keys on those entries. */
function appendMissingGalleryNoteKeys(existing, discoveredSrcs) {
  const out = { ...existing };
  for (const src of discoveredSrcs) {
    if (out[src] !== undefined && out[src] !== null) continue;
    out[src] = { title: '', notes: '', rank: null };
  }
  return out;
}

function listImagesInCategory(categoryDir, category) {
  if (!existsSync(categoryDir)) return [];
  const names = readdirSync(categoryDir, { withFileTypes: true });
  const out = [];
  for (const ent of names) {
    if (!ent.isFile()) continue;
    if (ent.name.startsWith('.')) continue;
    if (!IMAGE_EXT.test(ent.name)) continue;
    const relUrl = `/static/${category}/${ent.name}`;
    out.push(relUrl);
  }
  return out.sort((a, b) => a.localeCompare(b, 'en'));
}

function rankToTs(rank) {
  if (rank === null || rank === undefined) return 'null';
  return String(rank);
}

function main() {
  const initNotes = process.argv.includes('--init-notes');

  const imageMeta = loadJson(META_PATH);
  let galleryNotesJson = loadJson(GALLERY_NOTES_PATH);

  const discoveredSrcs = [];
  for (const dirName of Object.keys(CATEGORY_TO_TYPE)) {
    const dir = join(STATIC_ROOT, dirName);
    for (const src of listImagesInCategory(dir, dirName)) {
      discoveredSrcs.push(src);
    }
  }

  if (initNotes) {
    const withNewKeys = appendMissingGalleryNoteKeys(galleryNotesJson, discoveredSrcs);
    writeFileSync(GALLERY_NOTES_PATH, JSON.stringify(withNewKeys, null, 2) + '\n', 'utf8');
    galleryNotesJson = withNewKeys;
    console.log(
      `Appended missing keys only → ${relative(ROOT, GALLERY_NOTES_PATH)} (existing entries unchanged)`,
    );
  }

  const galleryNotes = resolveGalleryNotesForBuild(galleryNotesJson, discoveredSrcs, imageMeta);

  const cleanMeta = mergeImageMeta(imageMeta, discoveredSrcs);
  writeFileSync(META_PATH, JSON.stringify(cleanMeta, null, 2) + '\n', 'utf8');

  const entries = [];
  for (const [dirName, type] of Object.entries(CATEGORY_TO_TYPE)) {
    const dir = join(STATIC_ROOT, dirName);
    for (const src of listImagesInCategory(dir, dirName)) {
      const m = cleanMeta[src] || { alt: '', omitFromGallery: false };
      const gn = galleryNotes[src] || { notes: '', rank: null, title: '' };
      entries.push({
        src,
        type,
        alt: m.alt,
        omitFromGallery: m.omitFromGallery,
        notes: gn.notes ?? '',
        rank: gn.rank,
        title: gn.title ?? '',
      });
    }
  }

  entries.sort((a, b) => a.src.localeCompare(b.src, 'en'));

  const lines = entries.map((e, i) => {
    const id = i + 1;
    const omit = e.omitFromGallery ? ', omitFromGallery: true' : '';
    const notesStr = JSON.stringify(e.notes ?? '');
    const titleStr = JSON.stringify(e.title ?? '');
    const rankStr = `, rank: ${rankToTs(e.rank)}`;
    return `  { id: ${id}, src: ${JSON.stringify(e.src)}, type: '${e.type}', alt: ${JSON.stringify(e.alt)}, title: ${titleStr}, notes: ${notesStr}${rankStr}${omit} },`;
  });

  const banner = `/**
 * Auto-generated by scripts/sync-static-images.mjs — do not edit by hand.
 * Edit captions in data/image-meta.json; title, notes + rank in data/gallery-notes.json.
 * Run: npm run sync:images
 */
import type { GalleryImage } from '../images';

export const imagePool: GalleryImage[] = [
${lines.join('\n')}
];
`;

  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, banner, 'utf8');

  const relStatic = relative(ROOT, STATIC_ROOT);
  console.log(
    `Wrote ${entries.length} images → ${relative(ROOT, OUT_FILE)} (from ${relStatic}/); ` +
      `merged ${relative(ROOT, META_PATH)}; read ${relative(ROOT, GALLERY_NOTES_PATH)} (not modified)`,
  );
}

main();

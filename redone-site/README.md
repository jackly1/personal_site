# Jack Lille Yerington — Personal Site

A personal portfolio inspired by Wolfgang Tillmans' gallery installations. The landing page scatters photographs across a white wall at varied sizes, orientations, and heights — no rigid grid.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Swapping In Real Images

1. Drop your images into `public/images/`
2. Edit `data/images.ts` — update each entry's `src` to point to your file (e.g. `/images/my-photo.jpg`)
3. Set the `type` field to control where clicking navigates: `"project"` → `/projects`, `"book"` → `/books`, `"film"` → `/films`, `"self"` → `/bio`
4. Set `alt` text for accessibility

The scatter layout is seeded — positions are deterministic and won't jump on refresh. Adjust the seed in `components/GalleryWall.tsx` (`mulberry32(42)`) to get a different arrangement.

## Structure

```
app/
  page.tsx          — Landing page (gallery wall)
  projects/page.tsx — Projects listing
  books/page.tsx    — Books (placeholder)
  films/page.tsx    — Films (placeholder)
  bio/page.tsx      — About / bio
components/
  GalleryWall.tsx   — Scatter layout algorithm + rendering
  PageHeader.tsx    — Shared header for inner pages
data/
  images.ts         — Image entries with type routing
```

## Tech

- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- No animation libraries

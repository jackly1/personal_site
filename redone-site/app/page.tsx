import Link from 'next/link';
import GalleryWall from '@/components/GalleryWall';

export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-[#fafafa]">
      <header className="relative z-10 flex h-24 shrink-0 items-center px-4 md:px-8">
        <div className="flex min-w-0 flex-1 justify-end pr-2 sm:pr-3 md:pr-4">
          <nav className="flex flex-wrap items-center justify-end gap-3 md:gap-5 text-xs font-bold text-neutral-600 md:text-sm">
            <Link
              href="/bio"
              className="transition-colors hover:text-neutral-900"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="transition-colors hover:text-neutral-900"
            >
              Projects
            </Link>
          </nav>
        </div>

        <h1 className="shrink-0 px-1 text-center text-xl font-bold tracking-wider text-neutral-900 sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
          JACK LILLE YERINGTON
        </h1>

        <div className="flex min-w-0 flex-1 justify-start pl-2 sm:pl-3 md:pl-4">
          <nav className="flex flex-wrap items-center justify-start gap-3 md:gap-5 text-xs font-bold text-neutral-600 md:text-sm">
            <Link
              href="/interests"
              className="transition-colors hover:text-neutral-900"
            >
              Interests
            </Link>
            <Link
              href="/misc"
              className="transition-colors hover:text-neutral-900"
            >
              Misc
            </Link>
          </nav>
        </div>
      </header>

      <GalleryWall />
    </main>
  );
}

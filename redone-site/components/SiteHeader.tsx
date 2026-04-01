'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function navLinkClass(active: boolean) {
  return active
    ? 'font-bold text-neutral-900'
    : 'font-bold text-neutral-500 transition-colors hover:text-neutral-900';
}

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const about = pathname === '/bio';
  const projects = pathname === '/projects';
  const interests =
    pathname === '/interests' ||
    pathname === '/films' ||
    pathname === '/books';
  const misc = pathname === '/misc';

  return (
    <header className="relative z-10 flex h-24 shrink-0 items-center bg-[#fafafa] px-4 md:px-8">
      <div className="flex min-w-0 flex-1 justify-end pr-2 sm:pr-3 md:pr-4">
        <nav className="flex flex-wrap items-center justify-end gap-3 md:gap-5 text-xs md:text-sm">
          <Link href="/bio" className={navLinkClass(about)}>
            About
          </Link>
          <Link href="/projects" className={navLinkClass(projects)}>
            Projects
          </Link>
        </nav>
      </div>

      <Link
        href="/"
        className="shrink-0 px-1 text-center text-xl font-bold tracking-wider text-neutral-900 sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl"
        aria-current={isHome ? 'page' : undefined}
      >
        JACK LILLE YERINGTON
      </Link>

      <div className="flex min-w-0 flex-1 justify-start pl-2 sm:pl-3 md:pl-4">
        <nav className="flex flex-wrap items-center justify-start gap-3 md:gap-5 text-xs md:text-sm">
          <Link href="/interests" className={navLinkClass(interests)}>
            Interests
          </Link>
          <Link href="/misc" className={navLinkClass(misc)}>
            Misc
          </Link>
        </nav>
      </div>
    </header>
  );
}

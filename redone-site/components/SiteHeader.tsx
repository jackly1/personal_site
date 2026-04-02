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
      <header className="relative z-10 flex shrink-0 flex-col bg-[#fafafa] px-4 py-3 md:py-4 xl:h-24 xl:flex-row xl:items-center xl:py-0 md:px-8">
          {/* Mobile: compact stacked */}
          <div className="flex w-full flex-col items-center gap-2 md:hidden">
              <Link
                  href="/"
                  className="text-center text-xl font-bold tracking-wider text-neutral-900"
                  aria-current={isHome ? 'page' : undefined}
              >
                  JACK LILLE YERINGTON
              </Link>
              <nav
                  className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs"
                  aria-label="Main"
              >
                  <Link href="/bio" className={navLinkClass(about)}>
                      About
                  </Link>
                  <Link href="/projects" className={navLinkClass(projects)}>
                      Projects
                  </Link>
                  <Link href="/interests" className={navLinkClass(interests)}>
                      Interests
                  </Link>
                  <Link href="/misc" className={navLinkClass(misc)}>
                      Misc
                  </Link>
              </nav>
          </div>

          {/* Tablet / iPad: larger stacked layout — from md until xl (below desktop) */}
          <div className="hidden w-full flex-col items-center gap-3 md:flex xl:hidden">
              <Link
                  href="/"
                  className="text-center text-2xl font-bold tracking-wider text-neutral-900 sm:text-3xl"
                  aria-current={isHome ? 'page' : undefined}
              >
                  JACK LILLE YERINGTON
              </Link>
              <nav
                  className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm"
                  aria-label="Main"
              >
                  <Link href="/bio" className={navLinkClass(about)}>
                      About
                  </Link>
                  <Link href="/projects" className={navLinkClass(projects)}>
                      Projects
                  </Link>
                  <Link href="/interests" className={navLinkClass(interests)}>
                      Interests
                  </Link>
                  <Link href="/misc" className={navLinkClass(misc)}>
                      Misc
                  </Link>
              </nav>
          </div>

          {/* Desktop: three-column + icons — xl (1280px) and up */}
          <div className="hidden min-h-0 w-full flex-1 flex-nowrap items-center xl:flex">
              <div className="flex min-w-0 flex-1 justify-end pr-2 sm:pr-3 md:pr-4">
                  <nav
                      className="flex flex-row flex-nowrap items-center justify-end gap-3 md:gap-5 text-xs md:text-sm"
                      aria-label="Primary left"
                  >
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

              <div className="flex min-w-0 flex-1 flex-row flex-nowrap items-center justify-start gap-2 pl-2 sm:pl-3 md:pl-4">
                  <nav
                      className="flex flex-row flex-nowrap items-center justify-start gap-3 md:gap-5 text-xs md:text-sm"
                      aria-label="Primary right"
                  >
                      <Link href="/interests" className={navLinkClass(interests)}>
                          Interests
                      </Link>
                      <Link href="/misc" className={navLinkClass(misc)}>
                          Misc
                      </Link>
                  </nav>
                  <div className="ml-auto flex shrink-0 items-center gap-4">
                      <a
                          href="mailto:jacklilleyerington@gmail.com"
                          className="hidden text-neutral-500 transition-colors hover:text-neutral-900 xl:inline-flex"
                          title="Email"
                          aria-label="Email"
                      >
                          <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden
                          >
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                          </svg>
                      </a>
                      <a
                          href="https://linkedin.com/in/jacklilleyerington"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden text-neutral-500 transition-colors hover:text-neutral-900 xl:inline-flex"
                          title="LinkedIn"
                          aria-label="LinkedIn"
                      >
                          <svg
                              className="h-6 w-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden
                          >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                      </a>
                  </div>
              </div>
          </div>
      </header>
  );
}

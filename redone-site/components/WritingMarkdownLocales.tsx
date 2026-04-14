"use client";

import Link from "next/link";
import { useState } from "react";
import { WritingMarkdown } from "@/components/WritingMarkdown";

type Bundle = { label: string; markdown: string };

export function WritingMarkdownLocales({
  bundles,
  title,
  date,
}: {
  bundles: Bundle[];
  title: string;
  date: string;
}) {
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="mb-10 flex flex-nowrap items-center gap-4">
        <Link
          href="/writing"
          className="shrink-0 text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-800"
        >
          ← Writing
        </Link>

        <div
          className="ml-auto inline-flex shrink-0 rounded-full border border-neutral-200 bg-neutral-100/90 p-1 shadow-sm"
          role="group"
          aria-label="Language"
        >
          {bundles.map((b, i) => {
            const active = i === index;
            return (
              <button
                key={b.label}
                type="button"
                onClick={() => setIndex(i)}
                className={
                  active
                    ? "rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-900 shadow-sm ring-1 ring-neutral-200/80"
                    : "rounded-full px-3.5 py-1.5 text-xs font-semibold text-neutral-500 transition-colors hover:text-neutral-800"
                }
                aria-pressed={active}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      <header className="mb-12 text-center">
        <h1 className="text-2xl font-bold text-neutral-800 md:text-3xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-neutral-500">{date}</p>
      </header>

      <WritingMarkdown markdown={bundles[index].markdown} key={bundles[index].label} />
    </>
  );
}

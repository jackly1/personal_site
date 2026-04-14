import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { WritingMarkdown } from "@/components/WritingMarkdown";
import { WritingMarkdownLocales } from "@/components/WritingMarkdownLocales";
import { loadWritingMarkdown } from "@/lib/loadWritingMarkdown";
import { getWritingBySlug, writingPieces } from "@/lib/writing";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return writingPieces.map((piece) => ({ slug: piece.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const piece = getWritingBySlug(params.slug);
  if (!piece) return { title: "Writing" };
  return { title: `${piece.title} · Jack Lille Yerington` };
}

export default function WritingPiecePage({ params }: Props) {
  const piece = getWritingBySlug(params.slug);
  if (!piece) notFound();

  const localeBundles =
    piece.markdownLocales != null && piece.markdownLocales.length > 0
      ? piece.markdownLocales.map(({ label, file }) => ({
          label,
          markdown: loadWritingMarkdown(file),
        }))
      : null;

  const markdown =
    localeBundles == null && piece.markdownFile != null
      ? loadWritingMarkdown(piece.markdownFile)
      : null;
  const inlineBody = piece.body;

  if (
    (localeBundles == null || localeBundles.length === 0) &&
    markdown == null &&
    (!inlineBody || inlineBody.length === 0)
  ) {
    notFound();
  }

  return (
    <main className="flex min-h-0 w-full flex-1 flex-col">
      <div className="flex w-full flex-1 flex-col items-center px-6 py-12 pb-24 md:px-10 md:py-16 md:pb-28">
        <article className="w-full max-w-2xl shrink-0">
          {localeBundles != null && localeBundles.length > 0 ? (
            <WritingMarkdownLocales
              bundles={localeBundles}
              title={piece.title}
              date={piece.date}
            />
          ) : (
            <>
              <p className="mb-10 text-left">
                <Link
                  href="/writing"
                  className="text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-800"
                >
                  ← Writing
                </Link>
              </p>

              <header className="mb-12 text-center">
                <h1 className="text-2xl font-bold text-neutral-800 md:text-3xl">
                  {piece.title}
                </h1>
                <p className="mt-3 text-sm text-neutral-500">{piece.date}</p>
              </header>

              {markdown != null ? (
                <WritingMarkdown markdown={markdown} />
              ) : (
                <div className="w-full space-y-4 text-left text-[12pt] leading-relaxed text-neutral-700">
                  {inlineBody!.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              )}
            </>
          )}
        </article>
      </div>
    </main>
  );
}

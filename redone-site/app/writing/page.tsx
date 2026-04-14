import Link from "next/link";
import { writingPieces } from "@/lib/writing";

export default function WritingPage() {
    return (
        <main className="flex min-h-0 flex-1 flex-col">
            <div className="px-6 pb-20 pt-10 md:px-12 md:pt-18">
                <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16">
                    <div className="min-w-0 flex-1">
                        <h2 className="mb-4 text-2xl font-bold text-neutral-800 md:mb-5">
                            Writing
                        </h2>

                        <ul className="-space-y-4">
                            {writingPieces.map((piece) => (
                                <li
                                    key={piece.slug}
                                    className="mt-10 pb-12 last:border-0 last:pb-0"
                                >
                                    <article>
                                        <Link
                                            href={`/writing/${piece.slug}`}
                                            className="text-lg font-bold text-neutral-700 no-underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
                                        >
                                            {piece.title}
                                        </Link>
                                        <p className="mt-3 text-sm text-neutral-500">
                                            {piece.date}
                                        </p>
                                        <p className="mt-3 leading-relaxed text-neutral-600">
                                            {piece.preview}
                                        </p>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mx-auto w-full shrink-0 md:mx-0 md:w-[min(100%,380px)] lg:w-[min(100%,420px)] md:sticky md:top-24 md:self-start">
                        <div className="overflow-hidden bg-neutral-100 ring-1 ring-neutral-200/80">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/static/writing/writing.jpg"
                                alt=""
                                className="h-auto w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

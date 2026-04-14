import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const base = "text-[12pt] leading-relaxed text-neutral-700";

const components: Components = {
  p: ({ children }) => (
    <p className={`mb-4 last:mb-0 ${base}`}>{children}</p>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-8 text-xl font-bold text-neutral-900 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-6 text-lg font-bold text-neutral-900 first:mt-0">
      {children}
    </h3>
  ),
  ul: ({ children }) => (
    <ul className={`mb-4 list-disc space-y-2 pl-6 ${base}`}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className={`mb-4 list-decimal space-y-2 pl-6 ${base}`}>{children}</ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mb-4 border-l-2 border-neutral-300 pl-4 text-neutral-600">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-neutral-800 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-neutral-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  hr: () => <hr className="my-8 border-neutral-200" />,
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element -- markdown-driven static paths
    <img
      src={src ?? ""}
      alt={alt ?? ""}
      className="mb-6 w-full bg-neutral-100 object-contain ring-1 ring-neutral-200/80"
    />
  ),
};

export function WritingMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="w-full text-left">
      <ReactMarkdown components={components}>{markdown}</ReactMarkdown>
    </div>
  );
}

import Link from 'next/link';

interface PageHeaderProps {
  backLabel?: string;
}

export default function PageHeader({ backLabel = '← back' }: PageHeaderProps) {
  return (
    <header className="px-6 md:px-12 pt-10 pb-6">
      <Link
        href="/"
        className="text-[11px] font-medium tracking-name uppercase text-neutral-800 hover:text-neutral-500 transition-colors"
      >
        Jack Lille Yerington
      </Link>
      <div className="mt-3">
        <Link
          href="/"
          className="text-sm text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          {backLabel}
        </Link>
      </div>
    </header>
  );
}

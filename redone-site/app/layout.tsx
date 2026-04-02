import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jack Lille Yerington',
  description:
    'CS and Spanish double major minoring in Global Media Studies at the University of Michigan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col font-sans">
        <SiteHeader />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}

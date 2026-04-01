import type { Metadata } from 'next';
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
      <body className="font-sans">{children}</body>
    </html>
  );
}

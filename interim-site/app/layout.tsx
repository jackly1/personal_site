import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jack Lille Yerington",
  description:
    "CS and Spanish double major minoring in Film at the University of Michigan.",
  icons: {
    icon: "/avatar.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STREAMLIVE • Live Sports Streaming",
  description:
    "Watch live Soccer, NFL, NBA, MLB, Boxing, UFC, MotoGP & F1 in real-time. Inspired by strikeout.im",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0a] text-zinc-100 antialiased">{children}</body>
    </html>
  );
}

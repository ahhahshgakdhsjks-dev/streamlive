import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STREAMLIVE • Live Sports Streaming",
  description:
    "Watch live Soccer, NFL, NBA, MLB, Boxing, UFC, MotoGP & F1 in real-time. Inspired by strikeout.im",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0a0a0a] text-zinc-100 antialiased">
        {children}
        <Script src="https://annoyingnightmareedit.com/ac/53/d3/ac53d3b27063b75f80678ff245e47f42.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}


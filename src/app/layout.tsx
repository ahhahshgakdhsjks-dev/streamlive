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
   <!-- Histats.com  START  (aync)-->
<script type="text/javascript">var _Hasync= _Hasync|| [];
_Hasync.push(['Histats.start', '1,4288858,4,0,0,0,00010000']);
_Hasync.push(['Histats.fasi', '1']);
_Hasync.push(['Histats.track_hits', '']);
(function() {
var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
hs.src = ('//s10.histats.com/js15_as.js');
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
})();</script>
<noscript><a href="/" target="_blank"><img  src="//sstatic1.histats.com/0.gif?4288858&101" alt="" border="0"></a></noscript>
<!-- Histats.com  END  -->

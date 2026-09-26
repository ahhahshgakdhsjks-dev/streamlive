"use client";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

function isGumlet(src: string) {
  return src.includes("gumlet.tv") || src.includes("gumlet.io") || src.includes("play.gumlet");
}
function toGumletEmbed(src: string) {
  const m = src.match(/\/watch\/([a-z0-9]+)/i);
  if (m) return `https://play.gumlet.io/embed/${m[1]}`;
  if (src.includes("/embed/")) return src;
  return src;
}

export default function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const gumlet = isGumlet(src);
  const embedSrc = gumlet ? toGumletEmbed(src) : src;

  useEffect(() => {
    if (gumlet) return;
    const video = ref.current;
    if (!video) return;
    if (src.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) video.src = src;
    } else video.src = src;
  }, [src, gumlet]);

  if (gumlet) {
    return (
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800">
        <iframe src={embedSrc} title="Live Stream" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen className="w-full h-full border-0" loading="lazy" />
        <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
          <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1.5"><span className="w-2 h-2 bg-white rounded-full animate-pulse-live" />LIVE</span>
          <span className="bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded">HD 1080p</span>
        </div>
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded pointer-events-none">● 12.4K viewers</div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800 group">
      <video ref={ref} controls autoPlay muted playsInline poster={poster} className="w-full h-full object-contain" />
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1.5"><span className="w-2 h-2 bg-white rounded-full animate-pulse-live" />LIVE</span>
        <span className="bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded">HD 1080p</span>
      </div>
      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded">● 12.4K viewers</div>
    </div>
  );
}

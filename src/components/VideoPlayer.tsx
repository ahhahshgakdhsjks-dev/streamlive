"use client";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (src.endsWith(".m3u8")) {
      if (Hls.isSupported()) {
        const hls = new Hls({ enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
      }
    } else {
      video.src = src;
    }
  }, [src]);

  return (
    <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-zinc-800 group">
      <video
        ref={ref}
        controls
        autoPlay
        muted
        playsInline
        poster={poster}
        className="w-full h-full object-contain"
      />
      {/* overlay top */}
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded flex items-center gap-1.5">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse-live" />
          LIVE
        </span>
        <span className="bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded">HD 1080p</span>
      </div>
      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded">
        ● 12.4K viewers
      </div>
    </div>
  );
}

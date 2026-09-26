"use client";
import { useEffect, useRef, useId } from "react";

export default function BannerAd() {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    // atOptions must be global before invoke.js runs
    const s1 = document.createElement("script");
    s1.text = `atOptions = { 'key' : '3b7838f8fd954c7e9b2e4ff76bc2c32f', 'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {} };`;
    const s2 = document.createElement("script");
    s2.src = "https://annoyingnightmareedit.com/3b7838f8fd954c7e9b2e4ff76bc2c32f/invoke.js";
    s2.async = true;
    el.appendChild(s1);
    el.appendChild(s2);
  }, [uid]);

  return (
    <div className="w-full flex justify-center py-2 sm:py-3 overflow-hidden px-2">
      <div
        ref={ref}
        className="w-[320px] max-w-full flex items-center justify-center overflow-hidden shrink-0 [&_iframe]:max-w-full"
        style={{ minHeight: 50 }}
      />
    </div>
  );
}

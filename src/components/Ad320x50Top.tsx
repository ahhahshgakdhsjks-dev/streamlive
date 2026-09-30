"use client";
import { useEffect, useRef } from "react";

export default function Ad320x50Top() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    // atOptions harus global sebelum invoke.js
    const win = window as unknown as Record<string, unknown>;
    win.atOptions = {
      key: "3b7838f8fd954c7e9b2e4ff76bc2c32f",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };
    const s = document.createElement("script");
    s.src = "https://annoyingnightmareedit.com/3b7838f8fd954c7e9b2e4ff76bc2c32f/invoke.js";
    s.async = true;
    el.appendChild(s);
  }, []);

  return (
    <div className="w-full flex justify-center py-2 overflow-hidden">
      <div
        ref={ref}
        className="w-[320px] h-[50px] max-w-full flex items-center justify-center overflow-hidden shrink-0 [&_iframe]:max-w-full border border-zinc-800/50 rounded-lg bg-zinc-900/30"
        style={{ minHeight: 50, minWidth: 320 }}
      />
    </div>
  );
}

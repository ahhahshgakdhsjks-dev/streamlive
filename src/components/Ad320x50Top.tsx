"use client";
import { useEffect, useRef } from "react";

export default function Ad320x50Top() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";

    // Adsterra butuh atOptions sebagai script text SEBELUM invoke.js
    // pakai 2 script tag di dalam container biar tidak bentrok dengan banner lain
    const s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.text = `atOptions = {'key':'3b7838f8fd954c7e9b2e4ff76bc2c32f','format':'iframe','height':50,'width':320,'params':{}};`;

    const s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "https://annoyingnightmareedit.com/3b7838f8fd954c7e9b2e4ff76bc2c32f/invoke.js";
    s2.async = true;

    // debug: cek apakah domain ke-block AdBlock
    s2.onerror = () => {
      console.warn("[Ad320x50] invoke.js gagal load - kemungkinan ke-block AdBlock. Matikan AdBlock & refresh.");
      el.innerHTML = '<span style="font-size:11px;color:#71717a">Ad blocked - disable AdBlock to view</span>';
    };
    s2.onload = () => console.log("[Ad320x50] invoke.js loaded, waiting for iframe...");

    el.appendChild(s1);
    el.appendChild(s2);

    // fallback debug 3 detik: cek apakah iframe ke-create
    const t = setTimeout(() => {
      const hasIframe = el.querySelector("iframe");
      if (!hasIframe) {
        console.warn("[Ad320x50] iframe tidak muncul. Cek: 1) AdBlock aktif? 2) Vercel sudah Ready? 3) Hard refresh Ctrl+Shift+R");
      } else {
        console.log("[Ad320x50] iframe OK", hasIframe);
      }
    }, 3000);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full flex justify-center py-2">
      <div
        ref={ref}
        className="w-[320px] max-w-full flex items-center justify-center overflow-hidden shrink-0 [&_iframe]:max-w-full [&_iframe]:border-0"
        style={{ minHeight: 50, minWidth: 320 }}
      />
    </div>
  );
}

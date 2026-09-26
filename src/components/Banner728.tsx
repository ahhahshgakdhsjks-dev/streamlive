"use client";
import { useEffect, useRef } from "react";

export default function Banner728() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    const s1 = document.createElement("script");
    s1.text = `atOptions = { 'key' : '154af2c23a672bf18e4d376676a23f4e', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} };`;
    const s2 = document.createElement("script");
    s2.src = "https://annoyingnightmareedit.com/154af2c23a672bf18e4d376676a23f4e/invoke.js";
    s2.async = true;
    el.appendChild(s1);
    el.appendChild(s2);
  }, []);
  return (
    <div className="w-full flex justify-center py-2 sm:py-3 overflow-hidden px-2 sm:px-4">
      <div
        ref={ref}
        className="w-full max-w-[728px] flex items-center justify-center overflow-hidden shrink-0 [&_iframe]:max-w-full [&_iframe]:w-full"
        style={{ minHeight: 90, aspectRatio: "728/90", maxHeight: 90 }}
      />
    </div>
  );
}

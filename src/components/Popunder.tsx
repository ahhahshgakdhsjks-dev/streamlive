"use client";

import { useEffect } from "react";

const ADSTERRA_SRC = "https://annoyingnightmareedit.com/61/7c/89/617c8981b212e3b6000690e798261dc6.js";
const STORAGE_KEY = "adsterra_pop_last_shown";
const FREQUENCY_MS = 10 * 60 * 1000; // 10 menit
const SCRIPT_ID = "adsterra-popunder-script";

export default function AdsterraPopunder() {
  useEffect(() => {
    const canShow = () => {
      const last = localStorage.getItem(STORAGE_KEY);
      if (!last) return true;
      return Date.now() - parseInt(last, 10) >= FREQUENCY_MS;
    };

    const getRemainingMs = () => {
      const last = localStorage.getItem(STORAGE_KEY);
      if (!last) return 0;
      const elapsed = Date.now() - parseInt(last, 10);
      return Math.max(0, FREQUENCY_MS - elapsed);
    };

    const injectScript = () => {
      if (document.getElementById(SCRIPT_ID)) return; // sudah ada
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = ADSTERRA_SRC;
      s.async = true;
      document.body.appendChild(s);
      console.log("[Adsterra] Popunder script injected, next click will trigger pop");
    };

    const removeScript = () => {
      const existing = document.getElementById(SCRIPT_ID);
      if (existing) existing.remove();
    };

    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNextInject = () => {
      const remaining = getRemainingMs();
      if (remaining === 0) {
        injectScript();
      } else {
        console.log(`[Adsterra] Popunder cooldown: ${(remaining / 1000 / 60).toFixed(1)} menit lagi`);
        timeoutId = setTimeout(() => {
          injectScript();
          // pasang kembali listener click untuk deteksi pop berikutnya
          document.addEventListener("click", handleClick);
        }, remaining);
      }
    };

    const handleClick = () => {
      // hanya jika script sedang aktif (berarti eligible)
      if (!document.getElementById(SCRIPT_ID)) return;
      if (!canShow()) return;

      // anggap pop terjadi di klik ini
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      console.log("[Adsterra] Pop triggered, cooldown 10 menit dimulai");

      // hapus script biar tidak spam, dan stop listener sampai cooldown selesai
      // Adsterra script akan tetap pop di klik ini karena sudah loaded sebelum klik
      setTimeout(() => {
        removeScript();
        document.removeEventListener("click", handleClick);
        scheduleNextInject();
      }, 1000); // kasih delay 1 detik biar script sempat eksekusi pop
    };

    // init
    if (canShow()) {
      injectScript();
      // delay 1 detik biar tidak bentrok dengan load awal
      setTimeout(() => {
        document.addEventListener("click", handleClick);
      }, 1000);
    } else {
      scheduleNextInject();
      // tetap pasang listener tapi inject belum ada jadi tidak akan trigger
      document.addEventListener("click", handleClick);
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}

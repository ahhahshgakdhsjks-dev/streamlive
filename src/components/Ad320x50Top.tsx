"use client";

export default function Ad320x50Top() {
  // Adsterra invoke.js pakai document.write -> harus di dalam iframe pakai srcDoc
  // kalau pakai createElement after load pasti blank
  const adHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;display:flex;justify-content:center;align-items:center;background:transparent}</style></head><body><script>atOptions={'key':'3b7838f8fd954c7e9b2e4ff76bc2c32f','format':'iframe','height':50,'width':320,'params':{}}<\/script><script src="https://annoyingnightmareedit.com/3b7838f8fd954c7e9b2e4ff76bc2c32f/invoke.js"><\/script></body></html>`;

  return (
    <div className="w-full flex justify-center py-2">
      <iframe
        title="Ad 320x50 Top"
        srcDoc={adHtml}
        width={320}
        height={50}
        scrolling="no"
        frameBorder={0}
        style={{ border: 0, overflow: "hidden", width: 320, height: 50, maxWidth: "100%" }}
        loading="lazy"
      />
    </div>
  );
}

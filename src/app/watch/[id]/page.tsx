import { getMatchById } from "@/lib/data";
import { fetchAllEspn, fetchEspn } from "@/lib/providers/espn";
import VideoPlayer from "@/components/VideoPlayer";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SportId } from "@/lib/types";

async function resolveMatch(id: string) {
  let m = getMatchById(id);
  if (m) return m;
  if (id.startsWith("espn-")) {
    const parts = id.split("-");
    const sport = parts[1] as SportId;
    const list = await fetchEspn(sport);
    m = list.find((x) => x.id === id);
    if (m) return m;
  }
  const all = await fetchAllEspn();
  return all.find((x) => x.id === id);
}

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = await resolveMatch(id);
  if (!match) return notFound();

  return (
    <div className="min-h-screen bg-[#08080a]">
      <header className="sticky top-0 z-40 bg-[#0f0f10] border-b border-zinc-800 h-14 flex items-center px-4 gap-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white">S</div>
          <span className="font-black text-white text-sm">STREAM<span className="text-red-500">LIVE</span></span>
        </Link>
        <span className="text-zinc-600">/</span>
        <span className="text-sm text-zinc-300 truncate">{match.league} • {match.homeTeam} vs {match.awayTeam}</span>
        <Link href="/" className="ml-auto text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1.5 rounded-full font-bold shrink-0">← Back</Link>
      </header>

      <div className="max-w-[1400px] mx-auto p-4 grid lg:grid-cols-[1fr_340px] gap-6">
        <div>
          {match.streamUrl ? <VideoPlayer src={match.streamUrl} /> : (
            <div className="aspect-video bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="text-4xl">⏳</div>
              <div className="text-white font-bold">Stream not available — match not live yet</div>
              <div className="text-sm text-zinc-500">Kickoff {match.time} • Channel will be active when status is LIVE</div>
              <div className="text-xs text-zinc-600 mt-2">Scores & schedule are real-time via ESPN API</div>
            </div>
          )}
          <div className="mt-4 bg-[#141416] border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-3">
                <img src={match.homeLogo} alt={match.homeTeam} className="w-10 h-10 rounded-full bg-zinc-900 p-1 object-contain" />
                <span className="font-bold text-white">{match.homeTeam}</span>
                <span className="text-zinc-500 font-bold">vs</span>
                <img src={match.awayLogo} alt={match.awayTeam} className="w-10 h-10 rounded-full bg-zinc-900 p-1 object-contain" />
                <span className="font-bold text-white">{match.awayTeam}</span>
              </div>
              {match.score && <span className="text-xl font-black text-white">{match.score}</span>}
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs flex-wrap">
              <span className={`px-2 py-1 rounded-full font-bold ${match.isLive ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400"}`}>{match.time}</span>
              <span className="text-zinc-500">{match.league}</span>
              {match.viewers && <span className="text-zinc-500">• 👁 {match.viewers} viewers</span>}
              <span className={`ml-auto text-[10px] px-2 py-1 rounded-full border ${match.isLive ? "border-green-700 bg-green-950 text-green-400" : "border-zinc-700 bg-zinc-900 text-zinc-500"}`}>{match.isLive ? "● REAL-TIME ESPN" : "SCHEDULED"}</span>
            </div>
            <p className="text-xs text-zinc-500 mt-3 leading-relaxed">Scores & schedule update every 15 seconds via <a href="https://site.api.espn.com" target="_blank" className="text-zinc-300 underline">ESPN API (free, no key required)</a>. For paid HLS replace <code className="text-zinc-300">streamUrl</code> in your stream provider.</p>
          </div>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((n) => (
              <button key={n} className={`py-2.5 rounded-xl text-xs font-bold border ${n === 1 && match.streamUrl ? "bg-red-600 border-red-600 text-white" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800"}`}>CHANNEL {n} {n === 1 && match.streamUrl ? "(HD)" : ""}</button>
            ))}
          </div>
        </div>
        <aside className="space-y-4">
          <div className="bg-[#141416] border border-zinc-800 rounded-xl p-4">
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 mb-3">💬 LIVE CHAT</h3>
            <div className="h-64 bg-zinc-900 rounded-lg border border-zinc-800 p-3 flex flex-col gap-2 overflow-y-auto text-xs">
              <div><span className="font-bold text-red-400">Fan123:</span> <span className="text-zinc-300">Gooaal!!</span></div>
              <div><span className="font-bold text-cyan-400">F1Fan:</span> <span className="text-zinc-300">Verstappen is flying 🔥</span></div>
              <div className="text-zinc-500 italic">Demo — connect Firebase/Socket.io for real-time chat.</div>
            </div>
            <div className="mt-3 flex gap-2">
              <input placeholder="Send a message..." className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-2 text-xs text-white placeholder:text-zinc-600" />
              <button className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full">Send</button>
            </div>
          </div>
          <div className="bg-[#141416] border border-zinc-800 rounded-xl p-4">
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 mb-2">⚙️ PLAYER TIPS</h3>
            <ul className="text-xs text-zinc-400 space-y-1 list-disc list-inside"><li>Use latest Chrome/Firefox for HLS.js</li><li>If buffering, try Channel 2 or 3</li></ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

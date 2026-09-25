"use client";
import { useEffect, useState } from "react";
import { SportId, Match, SPORTS } from "@/lib/types";
import Link from "next/link";

const SPORT_META: Record<SportId, { color: string; label: string; emoji: string }> = {
  soccer: { color: "#22c55e", label: "SOCCER", emoji: "⚽" },
  nfl: { color: "#a855f7", label: "NFL", emoji: "🏈" },
  nba: { color: "#f97316", label: "NBA", emoji: "🏀" },
  mlb: { color: "#eab308", label: "MLB", emoji: "⚾" },
  boxing: { color: "#ef4444", label: "BOXING", emoji: "🥊" },
  ufc: { color: "#dc2626", label: "UFC", emoji: "🥋" },
  motogp: { color: "#06b6d4", label: "MotoGP", emoji: "🏁" },
  f1: { color: "#f43f5e", label: "F1", emoji: "🏎️" },
};

function MatchCard({ m }: { m: Match }) {
  const meta = SPORT_META[m.sport];
  return (
    <Link
      href={`/watch/${m.id}`}
      className="group relative flex flex-col bg-[#141416] border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 hover:bg-[#1a1a1e] transition"
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: meta.color }}>
            {meta.label}
          </span>
          <span className="text-[11px] text-zinc-400">{m.league}</span>
        </div>
        {m.isLive ? (
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-red-500">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-live" />
            LIVE
          </span>
        ) : (
          <span className="text-[11px] text-zinc-500">{m.status === "scheduled" ? "UPCOMING" : m.status.toUpperCase()}</span>
        )}
      </div>
      <div className="p-4 flex items-center justify-between gap-2">
        <div className="flex flex-col items-center gap-2 flex-1">
          <img src={m.homeLogo} alt={m.homeTeam} className="w-12 h-12 rounded-full bg-zinc-900 object-contain p-1" />
          <span className="text-sm font-semibold text-white text-center leading-tight">{m.homeTeam}</span>
        </div>
        <div className="flex flex-col items-center gap-1 px-2">
          {m.score ? <span className="text-lg font-black text-white tracking-wider">{m.score}</span> : <span className="text-sm font-bold text-zinc-500">VS</span>}
          <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${m.isLive ? "bg-red-500/15 text-red-400 border border-red-500/30" : "bg-zinc-800 text-zinc-400"}`}>
            {m.time}
          </span>
          {m.viewers && <span className="text-[10px] text-zinc-500">👁 {m.viewers}</span>}
        </div>
        <div className="flex flex-col items-center gap-2 flex-1">
          <img src={m.awayLogo} alt={m.awayTeam} className="w-12 h-12 rounded-full bg-zinc-900 object-contain p-1" />
          <span className="text-sm font-semibold text-white text-center leading-tight">{m.awayTeam}</span>
        </div>
      </div>
      <div className="px-3 pb-3">
        <div className={`w-full text-center text-xs font-bold py-2 rounded-lg transition ${m.streamUrl ? "bg-red-600 text-white group-hover:bg-red-500" : "bg-zinc-800 text-zinc-300 group-hover:bg-zinc-700"}`}>
          {m.streamUrl ? "▶ WATCH LIVE" : "VIEW CHANNELS"}
        </div>
        {m.streamUrl && !m.isLive && <div className="text-[9px] text-center text-zinc-500 mt-1 tracking-wide">DEMO STREAM • Preview</div>}
      </div>
    </Link>
  );
}

export default function Home() {
  const [active, setActive] = useState<SportId | "all">("all");
  const [soccerLeague, setSoccerLeague] = useState<string>("all");
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [now, setNow] = useState("");

  const SOCCER_LEAGUES = [
    { id: "all", label: "All Leagues" },
    { id: "eng.1", label: "Premier League" },
    { id: "esp.1", label: "La Liga" },
    { id: "ita.1", label: "Serie A" },
    { id: "ger.1", label: "Bundesliga" },
    { id: "fra.1", label: "Ligue 1" },
    { id: "uefa.champions", label: "Champions League" },
    { id: "uefa.europa", label: "Europa League" },
  ];

  useEffect(() => {
    const t = setInterval(() => setNow(new Date().toLocaleString("en-US", { weekday: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" })), 1000);
    return () => clearInterval(t);
  }, []);

  async function load(sport: SportId | "all", leagueId: string = "all") {
    setLoading(true);
    let url = "/api/matches";
    if (sport !== "all") {
      url = `/api/matches?sport=${sport}`;
      if (sport === "soccer" && leagueId !== "all") url += `&league=${leagueId}`;
    }
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    setMatches(data.matches);
    setLoading(false);
  }

  useEffect(() => {
    load(active, soccerLeague);
    const iv = setInterval(() => load(active, soccerLeague), 15000);
    return () => clearInterval(iv);
  }, [active, soccerLeague]);

  const filtered = matches.filter((m) => `${m.homeTeam} ${m.awayTeam} ${m.league}`.toLowerCase().includes(search.toLowerCase()));
  const live = filtered.filter((m) => m.isLive);
  const upcoming = filtered.filter((m) => !m.isLive);
  const counts: Record<string, number> = {};
  matches.forEach((m) => (counts[m.sport] = (counts[m.sport] || 0) + 1));

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-[#0f0f10] border-b border-zinc-800">
        <div className="bg-[#e11d48] text-white text-xs font-medium">
          <div className="max-w-[1600px] mx-auto px-4 py-1.5 flex items-center justify-between gap-4">
            <span className="hidden sm:inline">🔴 LIVE NOW: {live.length} matches streaming • Real-time updates</span>
            <span className="sm:hidden">🔴 {live.length} LIVE</span>
            <span className="opacity-90 hidden md:inline">Inspired by strikeout.im • Real-time API ready (TheSportsDB / API-Sports / SportMonks)</span>
            <span className="ml-auto md:ml-0">{now} WIB</span>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 h-[64px] flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center font-black text-white text-lg">S</div>
            <div className="leading-none">
              <div className="font-black tracking-tight text-white text-[18px]">STREAM<span className="text-red-500">LIVE</span></div>
              <div className="text-[10px] tracking-[0.2em] text-zinc-500 font-bold -mt-0.5">SPORTS NETWORK</div>
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-1 ml-2">
            {SPORTS.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)} className={`px-3 py-2 rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 transition ${active === s.id ? "bg-white text-black" : "text-zinc-400 hover:text-white hover:bg-zinc-800"}`}>
                <span>{s.icon}</span> {s.label}
                <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${active === s.id ? "bg-zinc-200 text-zinc-700" : "bg-zinc-800 text-zinc-400"}`}>{counts[s.id] ?? 0}</span>
              </button>
            ))}
            <button onClick={() => setActive("all")} className={`ml-1 px-3 py-2 rounded-lg text-xs font-bold ${active === "all" ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}>ALL</button>
          </nav>
          <div className="flex-1" />
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search team, league..." className="bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-700 w-[220px]" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">⌕</span>
            </div>
            <Link href="#apikey" className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-full font-bold border border-zinc-700">API KEY</Link>
          </div>
        </div>
        <div className="lg:hidden border-t border-zinc-800 overflow-x-auto">
          <div className="flex items-center gap-2 px-4 py-2">
            <button onClick={() => setActive("all")} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${active === "all" ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-300"}`}>ALL</button>
            {SPORTS.map((s) => (
              <button key={s.id} onClick={() => setActive(s.id)} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${active === s.id ? "bg-white text-black" : "bg-zinc-800 text-zinc-300"}`}>{s.icon} {s.label}</button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto w-full flex flex-1">
        <aside className="hidden xl:flex w-[260px] shrink-0 flex-col border-r border-zinc-800 bg-[#0f0f10] sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto">
          <div className="p-4">
            <h3 className="text-[11px] font-bold tracking-widest text-zinc-500 mb-3">CATEGORIES</h3>
            <div className="space-y-1">
              <button onClick={() => setActive("all")} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold ${active === "all" ? "bg-red-600 text-white" : "text-zinc-300 hover:bg-zinc-900"}`}>
                <span className="flex items-center gap-2">⭐ All Sports</span>
                <span className="text-xs bg-black/20 px-2 py-0.5 rounded-full">{matches.length}</span>
              </button>
              {SPORTS.map((s) => (
                <button key={s.id} onClick={() => setActive(s.id)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm ${active === s.id ? "bg-zinc-800 text-white border border-zinc-700" : "text-zinc-400 hover:bg-zinc-900 hover:text-white"}`}>
                  <span className="flex items-center gap-2"><span className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm">{s.icon}</span>{s.label}</span>
                  <span className="text-xs bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">{counts[s.id] ?? 0}</span>
                </button>
              ))}
            </div>
            <div id="apikey" className="mt-6 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <h4 className="text-xs font-bold text-white mb-1">🔑 Real-time API</h4>
              <p className="text-[11px] text-zinc-400 leading-relaxed">For real-time data, add your <code className="text-zinc-200">NEXT_PUBLIC_API_SPORTS_KEY</code> to <code className="text-zinc-200">.env.local</code>. Supported: API-Sports, TheSportsDB, SportMonks.</p>
              <pre className="mt-2 bg-black rounded-lg p-2 text-[10px] text-zinc-300 overflow-x-auto">NEXT_PUBLIC_API_SPORTS_KEY=xxx{"\n"}THESPORTSDB_KEY=3</pre>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-red-600 to-red-800 text-white">
              <div className="text-xs font-bold">⚡ Strikeout Style</div>
              <div className="text-[11px] opacity-90 mt-1">Dark, fast, no ad overlay — inspired by strikeout.im.</div>
            </div>
          </div>
          <div className="mt-auto p-4 text-[11px] text-zinc-600 border-t border-zinc-800">© 2026 STREAMLIVE • v1.0</div>
        </aside>

        <main className="flex-1 min-w-0 bg-[#08080a]">
          <div className="m-4 rounded-2xl overflow-hidden border border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(225,29,72,0.25),transparent_50%)]" />
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse-live" />LIVE STREAMING 24/7
                </div>
                <h1 className="mt-3 text-2xl md:text-3xl font-black text-white tracking-tight">WATCH LIVE SPORTS & FOOTBALL <span className="text-red-500">FREE</span></h1>
                <p className="mt-1 text-sm text-zinc-400">Soccer • NFL • NBA • MLB • Boxing • UFC • MotoGP • F1 — real-time scores & HLS streaming. Auto-refresh every 15s.</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl px-4 py-3 text-center"><div className="text-2xl font-black text-white">{live.length}</div><div className="text-[11px] tracking-widest text-zinc-400 font-bold">LIVE NOW</div></div>
                <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl px-4 py-3 text-center"><div className="text-2xl font-black text-white">{matches.length}</div><div className="text-[11px] tracking-widest text-zinc-400 font-bold">TOTAL</div></div>
              </div>
            </div>
          </div>

          <div className="px-4 flex items-center gap-3 mb-2">
            <h2 className="text-xs font-bold tracking-widest text-zinc-400">SCHEDULE</h2>
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-[11px] text-zinc-500">{new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
          </div>

          {active === "soccer" && (
            <div className="px-4 mb-4 flex items-center gap-2 overflow-x-auto pb-1">
              {SOCCER_LEAGUES.map((lg) => (
                <button key={lg.id} onClick={() => setSoccerLeague(lg.id)} className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition ${soccerLeague === lg.id ? "bg-white text-black border-white" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-white"}`}>{lg.label}</button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-[180px] rounded-xl bg-zinc-900 animate-pulse border border-zinc-800" />)}</div>
          ) : (
            <>
              <section className="px-4">
                <div className="flex items-center gap-2 mb-3"><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-live" /><h2 className="text-sm font-black text-white tracking-wide">LIVE NOW</h2><span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">{live.length}</span></div>
                {live.length === 0 ? <div className="text-sm text-zinc-500 py-6 text-center border border-dashed border-zinc-800 rounded-xl">No live matches right now. Check Upcoming below 👇</div> : <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">{live.map((m) => <MatchCard key={m.id} m={m} />)}</div>}
              </section>
              <section className="px-4 mt-8 pb-8">
                <div className="flex items-center gap-2 mb-3"><h2 className="text-sm font-black text-white tracking-wide">UPCOMING & SCHEDULED</h2><span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-bold border border-zinc-700">{upcoming.length}</span></div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">{upcoming.map((m) => <MatchCard key={m.id} m={m} />)}</div>
              </section>
            </>
          )}
        </main>

        <aside className="hidden 2xl:flex w-[300px] shrink-0 flex-col border-l border-zinc-800 bg-[#0f0f10] sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto p-4 gap-4">
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 mb-3">🔥 POPULAR NOW</h3>
            <div className="space-y-2">
              {matches.filter((m) => m.isLive).slice(0, 5).map((m) => (
                <Link key={m.id} href={`/watch/${m.id}`} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-zinc-800 transition">
                  <div className="text-xs font-semibold text-white truncate">{m.homeTeam} vs {m.awayTeam}</div>
                  <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold shrink-0">LIVE</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 mb-2">📡 API INTEGRATION</h3>
            <ol className="text-[11px] text-zinc-400 space-y-1.5 list-decimal list-inside">
              <li>Sign up at <a href="https://www.api-football.com/" target="_blank" className="text-white underline">API-Sports</a> or <a href="https://www.thesportsdb.com/" target="_blank" className="text-white underline">TheSportsDB</a></li>
              <li>Copy your API key to <code className="text-zinc-200">.env.local</code></li>
              <li>Edit <code className="text-zinc-200">src/lib/data.ts → fetchMatches()</code></li>
              <li>Restart `npm run dev`</li>
            </ol>
            <p className="text-[11px] text-zinc-500 mt-3">Mock HLS test stream included. Replace `streamUrl` with your real HLS provider.</p>
          </div>
        </aside>
      </div>
      <div className="md:hidden sticky bottom-0 bg-[#0f0f10] border-t border-zinc-800 p-3 flex gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search team..." className="flex-1 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-zinc-500" />
        <span className="text-xs bg-zinc-800 text-zinc-400 px-3 py-2.5 rounded-full border border-zinc-700">{filtered.length} results</span>
      </div>
    </div>
  );
}

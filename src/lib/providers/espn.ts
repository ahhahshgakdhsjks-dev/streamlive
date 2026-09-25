/** @format */
import { Match, SportId } from "@/lib/types";

function mapEspnStatus(s: string): Match["status"] {
  if (s === "STATUS_IN_PROGRESS") return "live";
  if (s === "STATUS_FINAL" || s === "STATUS_FULL_TIME") return "finished";
  return "scheduled";
}

function fmtClock(detail: string, shortDetail: string, statusType: string) {
  if (statusType === "STATUS_IN_PROGRESS") return shortDetail || detail || "LIVE";
  if (statusType === "STATUS_FINAL") return "FT";
  return shortDetail || detail || "";
}

// --- SOCCER MULTI-LEAGUE ---
const SOCCER_LEAGUES = [
  { id: "eng.1", label: "Premier League", url: "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard" },
  { id: "esp.1", label: "La Liga", url: "https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard" },
  { id: "ita.1", label: "Serie A", url: "https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard" },
  { id: "ger.1", label: "Bundesliga", url: "https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard" },
  { id: "fra.1", label: "Ligue 1", url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fra.1/scoreboard" },
  { id: "uefa.champions", label: "Champions League", url: "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard" },
  { id: "uefa.europa", label: "Europa League", url: "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa/scoreboard" },
] as const;

const LEAGUE_MAP: Record<SportId, { url: string; label: string }> = {
  soccer: { url: SOCCER_LEAGUES[0].url, label: "Soccer" },
  nfl: { url: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard", label: "NFL" },
  nba: { url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard", label: "NBA" },
  mlb: { url: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard", label: "MLB" },
  boxing: { url: "https://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard", label: "MMA/Boxing" },
  ufc: { url: "https://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard", label: "UFC" },
  motogp: { url: "", label: "MotoGP" },
  f1: { url: "", label: "F1" },
};

function mapEventToMatch(ev: any, sport: SportId, leagueLabel: string): Match {
  const comp = ev.competitions?.[0];
  const competitors: any[] = comp?.competitors ?? [];
  const home = competitors.find((c: any) => c.homeAway === "home") ?? competitors[0];
  const away = competitors.find((c: any) => c.homeAway === "away") ?? competitors[1];
  const status = comp?.status ?? ev.status;
  const statusType: string = status?.type?.name ?? status?.type?.id ?? "STATUS_SCHEDULED";
  const shortDetail: string = status?.type?.shortDetail ?? status?.type?.detail ?? "";
  const detail: string = status?.type?.detail ?? "";
  const homeScore = home?.score ?? "0";
  const awayScore = away?.score ?? "0";
  const isLive = statusType === "STATUS_IN_PROGRESS";
  const st = mapEspnStatus(statusType);
  const time = fmtClock(detail, shortDetail, statusType);
  return {
    id: `espn-${sport}-${ev.id}`,
    sport,
    league: ev.leagues?.[0]?.name ?? comp?.league?.name ?? leagueLabel,
    homeTeam: home?.team?.shortDisplayName ?? home?.team?.displayName ?? "Home",
    awayTeam: away?.team?.shortDisplayName ?? away?.team?.displayName ?? "Away",
    homeLogo: home?.team?.logo ?? `https://a.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F${home?.team?.id}.png&w=100&h=100`,
    awayLogo: away?.team?.logo ?? `https://a.espncdn.com/combiner/i?img=%2Fi%2Fteamlogos%2Fsoccer%2F500%2F${away?.team?.id}.png&w=100&h=100`,
    status: st,
    time: time || (st === "scheduled" ? new Date(ev.date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : ""),
    score: isLive || st === "finished" ? `${homeScore} - ${awayScore}` : undefined,
    isLive,
    // DEMO MODE: every match gets a playable HLS so the player is never empty
    // Replace this URL with your real .m3u8 provider when ready
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    viewers: `${(Math.random() * 80 + 10).toFixed(0)}K`,
  };
}

async function fetchSoccerAll(): Promise<Match[]> {
  const results = await Promise.all(
    SOCCER_LEAGUES.map(async (lg) => {
      try {
        const res = await fetch(lg.url, { next: { revalidate: 15 } });
        if (!res.ok) return [];
        const json = await res.json();
        const events: any[] = json.events ?? [];
        return events.slice(0, 8).map((ev: any) => mapEventToMatch(ev, "soccer", lg.label));
      } catch {
        return [];
      }
    })
  );
  return results.flat();
}

export async function fetchEspn(sport: SportId): Promise<Match[]> {
  if (sport === "soccer") return fetchSoccerAll();

  const cfg = LEAGUE_MAP[sport];
  if (!cfg?.url) return [];
  try {
    const res = await fetch(cfg.url, { next: { revalidate: 15 } });
    if (!res.ok) throw new Error(`ESPN ${res.status}`);
    const json = await res.json();
    const events: any[] = json.events ?? [];
    return events.slice(0, 12).map((ev: any) => mapEventToMatch(ev, sport, cfg.label));
  } catch (e) {
    console.error("[ESPN]", sport, e);
    return [];
  }
}

// For soccer, allow league filter via ?league=eng.1|esp.1|ita.1|uefa.champions etc
export async function fetchSoccerByLeague(leagueId: string): Promise<Match[]> {
  const lg = SOCCER_LEAGUES.find((l) => l.id === leagueId);
  if (!lg) return fetchSoccerAll();
  try {
    const res = await fetch(lg.url, { next: { revalidate: 15 } });
    const json = await res.json();
    const events: any[] = json.events ?? [];
    return events.slice(0, 12).map((ev: any) => mapEventToMatch(ev, "soccer", lg.label));
  } catch {
    return [];
  }
}

export { SOCCER_LEAGUES };

export async function fetchAllEspn(): Promise<Match[]> {
  const [soccer, ...rest] = await Promise.all([fetchSoccerAll(), fetchEspn("nfl"), fetchEspn("nba"), fetchEspn("mlb"), fetchEspn("ufc")]);
  return [soccer, ...rest].flat();
}

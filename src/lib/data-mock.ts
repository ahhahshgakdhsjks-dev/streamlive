/** @format */
import { Match, SportId } from "./types";

const DEMO = "https://gumlet.tv/watch/6ab6a222862b783f466d1653/";

const MOCK_MATCHES: Match[] = [
  { id: "soc-1", sport: "soccer", league: "Premier League", homeTeam: "Man City", awayTeam: "Arsenal", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=mancity", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=arsenal", status: "live", time: "LIVE 67'", score: "2 - 1", isLive: true, streamUrl: DEMO, viewers: "124K" },
  { id: "soc-2", sport: "soccer", league: "La Liga", homeTeam: "Barcelona", awayTeam: "Real Madrid", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=barca", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=rmadrid", status: "live", time: "LIVE 23'", score: "0 - 0", isLive: true, streamUrl: DEMO, viewers: "89K" },
  { id: "soc-3", sport: "soccer", league: "Serie A", homeTeam: "Inter Milan", awayTeam: "AC Milan", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=inter", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=milan", status: "scheduled", time: "20:45", isLive: false, streamUrl: DEMO, viewers: "18K" },
  { id: "soc-4", sport: "soccer", league: "Bundesliga", homeTeam: "Bayern Munich", awayTeam: "Dortmund", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=bayern", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=dortmund", status: "scheduled", time: "18:30", isLive: false, streamUrl: DEMO, viewers: "22K" },
  { id: "nfl-1", sport: "nfl", league: "NFL Week 4", homeTeam: "Chiefs", awayTeam: "Ravens", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=chiefs", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=ravens", status: "live", time: "Q3 08:12", score: "21 - 14", isLive: true, streamUrl: DEMO, viewers: "56K" },
  { id: "nfl-2", sport: "nfl", league: "NFL Week 4", homeTeam: "Cowboys", awayTeam: "49ers", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=cowboys", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=49ers", status: "scheduled", time: "00:25", isLive: false, streamUrl: DEMO, viewers: "14K" },
  { id: "nba-1", sport: "nba", league: "NBA Preseason", homeTeam: "Lakers", awayTeam: "Warriors", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=lakers", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=warriors", status: "live", time: "Q2 05:33", score: "54 - 48", isLive: true, streamUrl: DEMO, viewers: "42K" },
  { id: "nba-2", sport: "nba", league: "NBA Preseason", homeTeam: "Celtics", awayTeam: "Heat", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=celtics", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=heat", status: "scheduled", time: "02:00", isLive: false, streamUrl: DEMO, viewers: "12K" },
  { id: "mlb-1", sport: "mlb", league: "MLB Postseason", homeTeam: "Yankees", awayTeam: "Dodgers", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=yankees", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=dodgers", status: "live", time: "BOT 7th", score: "3 - 2", isLive: true, streamUrl: DEMO, viewers: "31K" },
  { id: "box-1", sport: "boxing", league: "WBC Heavyweight", homeTeam: "Fury", awayTeam: "Usyk", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=fury", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=usyk", status: "live", time: "ROUND 8/12", isLive: true, streamUrl: DEMO, viewers: "210K" },
  { id: "ufc-1", sport: "ufc", league: "UFC 310", homeTeam: "Pereira", awayTeam: "Ankalaev", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=pereira", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=ankalaev", status: "live", time: "MAIN CARD", isLive: true, streamUrl: DEMO, viewers: "180K" },
  { id: "ufc-2", sport: "ufc", league: "UFC Prelims", homeTeam: "Pantoja", awayTeam: "Moreno", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=pantoja", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=moreno", status: "scheduled", time: "22:00", isLive: false, streamUrl: DEMO, viewers: "28K" },
  { id: "mgp-1", sport: "motogp", league: "MotoGP • Valencia GP", homeTeam: "Race", awayTeam: "Live Timing", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=motogp", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=valencia", status: "live", time: "LAP 18/27", isLive: true, streamUrl: DEMO, viewers: "67K" },
  { id: "f1-1", sport: "f1", league: "F1 • Singapore GP", homeTeam: "Race", awayTeam: "Marina Bay", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=f1", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=singapore", status: "live", time: "LAP 42/62", isLive: true, streamUrl: DEMO, viewers: "95K" },
  { id: "f1-2", sport: "f1", league: "F1 • Qualifying", homeTeam: "Q3", awayTeam: "Results", homeLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=q3", awayLogo: "https://api.dicebear.com/7.x/shapes/svg?seed=q3b", status: "scheduled", time: "14:00", isLive: false, streamUrl: DEMO, viewers: "19K" },
];

let matchesCache = [...MOCK_MATCHES];

export async function fetchMatches(sport?: SportId): Promise<Match[]> {
  await new Promise((r) => setTimeout(r, 200));
  if (sport) return matchesCache.filter((m) => m.sport === sport);
  return matchesCache;
}

export function getMatchById(id: string): Match | undefined {
  return matchesCache.find((m) => m.id === id);
}

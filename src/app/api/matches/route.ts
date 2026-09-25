import { NextRequest, NextResponse } from "next/server";
import { Match, SportId } from "@/lib/types";
import { fetchAllEspn, fetchEspn, fetchSoccerByLeague } from "@/lib/providers/espn";

let cache: { at: number; data: Match[]; key: string } | null = null;
const TTL = 15_000;

import { fetchMatches as fetchMock } from "@/lib/data-mock";

export async function GET(req: NextRequest) {
  const sport = req.nextUrl.searchParams.get("sport") as SportId | null;
  const league = req.nextUrl.searchParams.get("league");

  const cacheKey = `${sport ?? "all"}:${league ?? "-"}`;
  if (!league && cache && cache.key === cacheKey && Date.now() - cache.at < TTL) {
    return NextResponse.json({ matches: cache.data, timestamp: cache.at, source: "cache" }, { headers: { "Cache-Control": "no-store" } });
  }

  let matches: Match[] = [];
  try {
    if (sport === "soccer" && league) {
      matches = await fetchSoccerByLeague(league);
      if (matches.length === 0) matches = await fetchMock(sport);
      return NextResponse.json({ matches, timestamp: Date.now(), source: "espn-league" }, { headers: { "Cache-Control": "no-store" } });
    }
    if (sport) {
      matches = await fetchEspn(sport);
      if (matches.length === 0) {
        const mock = await fetchMock(sport);
        matches = mock;
        return NextResponse.json({ matches, timestamp: Date.now(), source: "mock-fallback" }, { headers: { "Cache-Control": "no-store" } });
      }
    } else {
      const [espn, mockFallback] = await Promise.all([fetchAllEspn(), fetchMock()]);
      const mockOnlySports = mockFallback.filter((m) => ["motogp", "f1", "boxing"].includes(m.sport));
      matches = [...espn, ...mockOnlySports];
      if (espn.length === 0) matches = mockFallback;
      cache = { at: Date.now(), data: matches, key: cacheKey };
    }
  } catch (e) {
    console.error(e);
    matches = await fetchMock(sport ?? undefined);
  }
  return NextResponse.json({ matches, timestamp: Date.now(), source: "espn+mock" }, { headers: { "Cache-Control": "no-store" } });
}

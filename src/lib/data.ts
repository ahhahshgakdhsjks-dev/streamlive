/** @format */
import { Match, SportId } from "./types";
import { fetchMatches as fetchMock, getMatchById as getMockById } from "./data-mock";

// Re-export mock for API fallback
export { fetchMock };

export async function fetchMatches(sport?: SportId): Promise<Match[]> {
  return fetchMock(sport);
}

export function getMatchById(id: string): Match | undefined {
  // For ESPN ids, we can't resolve server-side without fetch; return mock if found
  return getMockById(id);
}

// Fetch single match via API (supports ESPN ids) - use on watch page client
export async function fetchMatchByIdViaApi(id: string): Promise<Match | null> {
  try {
    const res = await fetch(`/api/matches`);
    const data = await res.json();
    return (data.matches as Match[]).find((m) => m.id === id) ?? null;
  } catch {
    return null;
  }
}

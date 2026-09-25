/** @format */
export interface Match {
  id: string;
  sport: SportId;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  status: "live" | "scheduled" | "finished";
  time: string; // e.g. "19:45" or "LIVE 42'"
  score?: string; // e.g. "2 - 1"
  isLive?: boolean;
  streamUrl?: string;
  viewers?: string;
}

export type SportId =
  | "soccer"
  | "nfl"
  | "nba"
  | "mlb"
  | "boxing"
  | "ufc"
  | "motogp"
  | "f1";

export interface Sport {
  id: SportId;
  label: string;
  icon: string;
  color: string;
  count: number;
}

export const SPORTS: Sport[] = [
  { id: "soccer", label: "SOCCER", icon: "⚽", color: "#22c55e", count: 0 },
  { id: "nfl", label: "NFL", icon: "🏈", color: "#a855f7", count: 0 },
  { id: "nba", label: "NBA", icon: "🏀", color: "#f97316", count: 0 },
  { id: "mlb", label: "MLB", icon: "⚾", color: "#eab308", count: 0 },
  { id: "boxing", label: "BOXING", icon: "🥊", color: "#ef4444", count: 0 },
  { id: "ufc", label: "UFC/MMA", icon: "🥋", color: "#dc2626", count: 0 },
  { id: "motogp", label: "MotoGP", icon: "🏁", color: "#06b6d4", count: 0 },
  { id: "f1", label: "F1", icon: "🏎️", color: "#f43f5e", count: 0 },
];

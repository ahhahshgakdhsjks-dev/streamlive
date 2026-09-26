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
  | "f1"
  | "ncaaf"
  | "tennis"
  | "golf"
  | "afl"
  | "nascar"
  | "rugby"
  | "volleyball"
  | "cricket";

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
  { id: "ncaaf", label: "NCAAF", icon: "🎓", color: "#7c3aed", count: 0 },
  { id: "tennis", label: "TENNIS", icon: "🎾", color: "#84cc16", count: 0 },
  { id: "golf", label: "GOLF", icon: "⛳", color: "#16a34a", count: 0 },
  { id: "afl", label: "AFL", icon: "🦘", color: "#ea580c", count: 0 },
  { id: "nascar", label: "NASCAR", icon: "🏎️", color: "#e11d48", count: 0 },
  { id: "rugby", label: "RUGBY", icon: "🏉", color: "#0ea5e9", count: 0 },
  { id: "volleyball", label: "VOLLEY", icon: "🏐", color: "#06b6d4", count: 0 },
  { id: "cricket", label: "CRICKET", icon: "🏏", color: "#ca8a04", count: 0 },
];

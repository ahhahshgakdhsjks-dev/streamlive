/**
 * Per-sport video shown in the watch player.
 *
 * There is no legal, copyright-free source of live NFL / NBA / etc. game
 * broadcasts, so these are free-license stock clips from Mixkit
 * (Mixkit Stock Video Free License, no attribution required) — generic
 * gameplay of the same sport, not the actual listed match. Each clip is
 * short, so the player loops it. All URLs were verified to return
 * HTTP 200 video/mp4 (720p) before this was wired in.
 */
import { SportId } from "./types";

export const SPORT_VIDEOS: Record<SportId, string> = {
  soccer: "https://assets.mixkit.co/videos/43499/43499-720.mp4",
  nfl: "https://assets.mixkit.co/videos/41043/41043-720.mp4",
  nba: "https://assets.mixkit.co/videos/44470/44470-720.mp4",
  mlb: "https://assets.mixkit.co/videos/871/871-720.mp4",
  boxing: "https://assets.mixkit.co/videos/40967/40967-720.mp4",
  ufc: "https://assets.mixkit.co/videos/41103/41103-720.mp4",
  motogp: "https://assets.mixkit.co/videos/11953/11953-720.mp4",
  f1: "https://assets.mixkit.co/videos/11949/11949-720.mp4",
  ncaaf: "https://assets.mixkit.co/videos/42553/42553-720.mp4",
  tennis: "https://assets.mixkit.co/videos/44552/44552-720.mp4",
  golf: "https://assets.mixkit.co/videos/12321/12321-720.mp4",
  afl: "https://assets.mixkit.co/videos/2257/2257-720.mp4",
  nascar: "https://assets.mixkit.co/videos/11949/11949-720.mp4",
  rugby: "https://assets.mixkit.co/videos/40950/40950-720.mp4",
  volleyball: "https://assets.mixkit.co/videos/880/880-720.mp4",
  cricket: "https://assets.mixkit.co/videos/12233/12233-720.mp4",
};

export function sportVideo(sport: SportId): string {
  return SPORT_VIDEOS[sport] ?? SPORT_VIDEOS.soccer;
}

import { NextResponse } from "next/server";

interface NowPlayingResponse {
  isPlaying: boolean;
  track?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  url?: string;
}

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_USERNAME = process.env.LASTFM_USERNAME;

export async function GET() {
  // If Last.fm credentials are configured, fetch real data
  if (LASTFM_API_KEY && LASTFM_USERNAME) {
    try {
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`,
        { next: { revalidate: 30 } }
      );
      const data = await res.json();
      const track = data?.recenttracks?.track?.[0];

      if (track) {
        const isPlaying = track["@attr"]?.nowplaying === "true";
        return NextResponse.json({
          isPlaying,
          track: track.name,
          artist: track.artist["#text"],
          album: track.album["#text"],
          albumArt: track.image?.[2]?.["#text"] || undefined,
          url: track.url,
        } satisfies NowPlayingResponse);
      }
    } catch {
      // Fall through to fallback
    }
  }

  // Fallback: return placeholder data
  return NextResponse.json({
    isPlaying: false,
    track: "Connect Last.fm to see live data",
    artist: "Set LASTFM_API_KEY and LASTFM_USERNAME in .env.local",
    album: "",
    albumArt: undefined,
    url: undefined,
  } satisfies NowPlayingResponse);
}

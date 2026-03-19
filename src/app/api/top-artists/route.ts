import { NextResponse } from "next/server";

interface TopArtist {
  name: string;
  playcount: string;
  url: string;
  image: string | null;
}

interface TopArtistsResponse {
  monthly: TopArtist[];
  yearly: TopArtist[];
}

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_USERNAME = process.env.LASTFM_USERNAME;

async function fetchTopArtists(period: string, limit: number): Promise<TopArtist[]> {
  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&period=${period}&limit=${limit}&format=json`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const artists = data?.topartists?.artist || [];

  return artists.map((a: Record<string, unknown>) => ({
    name: (a.name as string) || "",
    playcount: (a.playcount as string) || "0",
    url: (a.url as string) || "",
    image: ((a.image as Array<Record<string, string>>)?.[2]?.["#text"]) || null,
  }));
}

export async function GET() {
  if (LASTFM_API_KEY && LASTFM_USERNAME) {
    try {
      const [monthly, yearly] = await Promise.all([
        fetchTopArtists("1month", 5),
        fetchTopArtists("12month", 1),
      ]);

      return NextResponse.json({ monthly, yearly } satisfies TopArtistsResponse);
    } catch {
      // Fall through to fallback
    }
  }

  return NextResponse.json({
    monthly: [],
    yearly: [],
  } satisfies TopArtistsResponse);
}

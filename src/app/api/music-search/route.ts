import { NextRequest, NextResponse } from "next/server";

interface ITunesResult {
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  trackViewUrl: string;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(
      `https://itunes.apple.com/search?${new URLSearchParams({
        term: q,
        entity: "song",
        limit: "5",
      })}`,
      { next: { revalidate: 0 } }
    );

    if (!res.ok) {
      return NextResponse.json({ results: [] });
    }

    const data = await res.json();
    const results = (data.results as ITunesResult[]).map((r) => ({
      trackName: r.trackName,
      artistName: r.artistName,
      albumName: r.collectionName,
      albumArt: r.artworkUrl100?.replace("100x100", "300x300") || "",
      appleMusicUrl: r.trackViewUrl,
    }));

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}

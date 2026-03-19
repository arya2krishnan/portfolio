import { NextRequest, NextResponse } from "next/server";
import { fetchAppleMusicAPI } from "@/lib/apple-music";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "aryaistheboss";

export async function GET(req: NextRequest) {
  // Password protect via query param
  const pw = req.nextUrl.searchParams.get("pw");
  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await fetchAppleMusicAPI(
      "/v1/me/recent/played/tracks",
      { limit: "30" }
    ) as { data: Array<{ attributes: Record<string, unknown> }> } | null;

    if (!result?.data) {
      return NextResponse.json({ error: "No data returned", raw: result });
    }

    const tracks = result.data.map((t: { attributes: Record<string, unknown> }, i: number) => ({
      index: i + 1,
      name: t.attributes.name,
      artist: t.attributes.artistName,
      album: t.attributes.albumName,
    }));

    // Aggregate artists
    const artistCounts: Record<string, number> = {};
    for (const t of tracks) {
      const artist = t.artist as string;
      if (artist) artistCounts[artist] = (artistCounts[artist] || 0) + 1;
    }
    const topArtists = Object.entries(artistCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return NextResponse.json({
      trackCount: tracks.length,
      tracks,
      topArtists: topArtists.map(([name, plays]) => ({ name, plays })),
    }, { status: 200 });
  } catch (e) {
    return NextResponse.json({
      error: "Failed to fetch",
      message: e instanceof Error ? e.message : String(e),
    }, { status: 500 });
  }
}

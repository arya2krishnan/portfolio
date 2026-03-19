import { NextResponse } from "next/server";
import { fetchAppleMusicAPI } from "@/lib/apple-music";

interface AppleMusicTrack {
  id: string;
  type: string;
  attributes: {
    name: string;
    artistName: string;
    albumName: string;
    artwork?: { url: string };
    url?: string;
  };
}

export const revalidate = 60;

export async function GET() {
  try {
    const result = (await fetchAppleMusicAPI(
      "/v1/me/recent/played/tracks",
      { limit: "10" }
    )) as { data: AppleMusicTrack[] } | null;

    if (!result?.data?.length) {
      return NextResponse.json({ recentTracks: [] });
    }

    const recentTracks = result.data.map((track) => ({
      name: track.attributes.name,
      artistName: track.attributes.artistName,
      albumName: track.attributes.albumName,
      artworkUrl:
        track.attributes.artwork?.url
          ?.replace("{w}", "200")
          .replace("{h}", "200") || null,
      url: track.attributes.url || null,
    }));

    return NextResponse.json({ recentTracks });
  } catch (e) {
    console.error("Apple Music now-playing error:", e);
    return NextResponse.json({ recentTracks: [] });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { put, head } from "@vercel/blob";

const BLOB_KEY = "song-recs.json";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "aryaistheboss";

interface SongRec {
  id: string;
  trackName: string;
  artistName: string;
  albumName: string;
  albumArt: string;
  appleMusicUrl: string;
  submittedBy: string;
  submittedAt: string;
}

async function getRecs(): Promise<SongRec[]> {
  try {
    const blob = await head(BLOB_KEY, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const res = await fetch(blob.url);
    return await res.json();
  } catch {
    return [];
  }
}

async function saveRecs(recs: SongRec[]) {
  await put(BLOB_KEY, JSON.stringify(recs), {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: false,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { trackName, artistName, albumName, albumArt, appleMusicUrl, submittedBy } = body;

    if (!trackName || !artistName) {
      return NextResponse.json({ error: "Track and artist are required" }, { status: 400 });
    }

    const recs = await getRecs();

    const newRec: SongRec = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      trackName,
      artistName,
      albumName: albumName || "",
      albumArt: albumArt || "",
      appleMusicUrl: appleMusicUrl || "",
      submittedBy: submittedBy || "Anonymous",
      submittedAt: new Date().toISOString(),
    };

    recs.unshift(newRec);
    await saveRecs(recs);

    return NextResponse.json({ success: true, rec: newRec });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const pw = req.nextUrl.searchParams.get("pw");

  if (pw !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const recs = await getRecs();
  return NextResponse.json({ recs });
}

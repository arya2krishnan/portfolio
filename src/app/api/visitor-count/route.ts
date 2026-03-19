import { NextResponse } from "next/server";
import { put, head } from "@vercel/blob";

const BLOB_KEY = "visitor-count.json";

interface VisitorData {
  count: number;
}

async function getCount(): Promise<VisitorData> {
  try {
    const blob = await head(BLOB_KEY, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    const res = await fetch(blob.url);
    return await res.json();
  } catch {
    return { count: 0 };
  }
}

async function saveCount(data: VisitorData) {
  await put(BLOB_KEY, JSON.stringify(data), {
    access: "public",
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function GET() {
  const data = await getCount();
  return NextResponse.json(data);
}

export async function POST() {
  const data = await getCount();
  data.count += 1;
  await saveCount(data);
  return NextResponse.json(data);
}

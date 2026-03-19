import { NextResponse } from "next/server";
import { getDeveloperToken } from "@/lib/apple-music";

export async function GET() {
  try {
    const token = getDeveloperToken();
    return NextResponse.json({ token });
  } catch (e) {
    console.error("Failed to generate Apple Music developer token:", e);
    return NextResponse.json(
      { error: "Apple Music not configured" },
      { status: 500 }
    );
  }
}

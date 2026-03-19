import { NextRequest, NextResponse } from "next/server";
import { storeUserToken } from "@/lib/apple-music";

export async function POST(req: NextRequest) {
  try {
    const { userToken } = await req.json();

    if (!userToken || typeof userToken !== "string") {
      return NextResponse.json({ error: "Missing userToken" }, { status: 400 });
    }

    await storeUserToken(userToken);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Failed to store Apple Music user token:", e);
    return NextResponse.json(
      { error: "Failed to store token" },
      { status: 500 }
    );
  }
}

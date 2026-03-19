import jwt from "jsonwebtoken";
import { put, head } from "@vercel/blob";

let cachedDevToken: string | null = null;
let devTokenExpiry = 0;

const USER_TOKEN_BLOB_KEY = "apple-music-user-token.json";

/**
 * Generate a developer token for the Apple Music API / MusicKit JS.
 * Tokens are cached in memory for 23 hours (they expire after 24h max).
 */
export function getDeveloperToken(): string {
  const now = Math.floor(Date.now() / 1000);

  if (cachedDevToken && now < devTokenExpiry - 60) {
    return cachedDevToken;
  }

  const privateKey = process.env.APPLE_MUSIC_PRIVATE_KEY;
  const keyId = process.env.APPLE_MUSIC_KEY_ID;
  const teamId = process.env.APPLE_MUSIC_TEAM_ID;

  if (!privateKey || !keyId || !teamId) {
    throw new Error(
      "Missing Apple Music credentials. Set APPLE_MUSIC_PRIVATE_KEY, APPLE_MUSIC_KEY_ID, and APPLE_MUSIC_TEAM_ID."
    );
  }

  const formattedKey = privateKey.replace(/\\n/g, "\n");

  const expiresIn = 60 * 60 * 23; // 23 hours
  devTokenExpiry = now + expiresIn;

  cachedDevToken = jwt.sign({}, formattedKey, {
    algorithm: "ES256",
    expiresIn,
    issuer: teamId,
    header: {
      alg: "ES256",
      kid: keyId,
    },
  });

  return cachedDevToken;
}

/**
 * Store the user's Apple Music token in Vercel Blob.
 */
export async function storeUserToken(userToken: string): Promise<void> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) throw new Error("BLOB_READ_WRITE_TOKEN not set");

  await put(
    USER_TOKEN_BLOB_KEY,
    JSON.stringify({ userToken, storedAt: Date.now() }),
    { access: "public", token, addRandomSuffix: false }
  );
}

/**
 * Retrieve the stored user Apple Music token from Vercel Blob.
 */
export async function getUserToken(): Promise<string | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;

  try {
    const blob = await head(USER_TOKEN_BLOB_KEY, { token });
    if (!blob) return null;

    const res = await fetch(blob.url, { cache: "no-store" });
    const data = await res.json();
    return data.userToken || null;
  } catch {
    return null;
  }
}

/**
 * Fetch data from Apple Music API using the stored user token.
 */
export async function fetchAppleMusicAPI(
  path: string,
  params: Record<string, string> = {}
): Promise<unknown | null> {
  const devToken = getDeveloperToken();
  const userToken = await getUserToken();

  if (!userToken) return null;

  const url = new URL(`https://api.music.apple.com${path}`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${devToken}`,
      "Music-User-Token": userToken,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`Apple Music API error: ${res.status} ${res.statusText}`);
    return null;
  }

  return res.json();
}

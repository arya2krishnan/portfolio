import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Serve /dj at the root of dj.aryakrishnan.com
  if (hostname.startsWith("dj.")) {
    const url = request.nextUrl.clone();
    if (url.pathname === "/") {
      url.pathname = "/dj";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

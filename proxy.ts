import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, validSession } from "./lib/wedding-access";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/access" || path === "/api/access" || path === "/favicon.svg") return NextResponse.next();
  const allowed = await validSession(request.cookies.get(ACCESS_COOKIE)?.value);
  const response = allowed
    ? NextResponse.next()
    : path.startsWith("/photos/") || path.startsWith("/api/")
      ? new NextResponse("Tilgang krever passord", { status: 401 })
      : NextResponse.redirect(new URL("/access", request.url));
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/((?!_next/|assets/).*)"] };

import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, SESSION_SECONDS, checkPassword, createSession } from "@/lib/wedding-access";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return new NextResponse(null, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return new NextResponse(null, { status: 415 });
  let password: unknown;
  try {
    const body: unknown = await request.json();
    if (typeof body === "object" && body !== null && "password" in body) password = body.password;
  } catch { return new NextResponse(null, { status: 400 }); }
  if (typeof password !== "string" || password.length > 128 || !(await checkPassword(password))) {
    return NextResponse.json({ error: "Feil passord. Prøv igjen." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(ACCESS_COOKIE, await createSession(), {
    httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "lax", path: "/", maxAge: SESSION_SECONDS,
  });
  return response;
}

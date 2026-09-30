import { NextRequest, NextResponse } from "next/server";
import { ACCESS_COOKIE, validSession } from "@/lib/wedding-access";
import photos from "@/lib/private-photos.json";

export async function GET(request: NextRequest, context: { params: Promise<{ name: string }> }) {
  if (!(await validSession(request.cookies.get(ACCESS_COOKIE)?.value))) {
    return new NextResponse("Tilgang krever passord", { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  const { name } = await context.params;
  if (!Object.hasOwn(photos, name)) return new NextResponse(null, { status: 404 });
  const bytes = Uint8Array.from(atob(photos[name as keyof typeof photos]), char => char.charCodeAt(0));
  return new NextResponse(bytes, { headers: { "Content-Type": "image/jpeg", "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
}

import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { tools } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

/**
 * POST /api/views
 * Body: { slug: string }
 * Increments a tool's view_count. Deduplicated per browser (a cookie
 * remembers which tools a visitor has already "viewed"), so refreshes do
 * not create unbounded rows or inflate counts. No per-refresh rows stored.
 */
export async function POST(req: NextRequest) {
  let slug: unknown;
  try {
    const body = await req.json();
    slug = body?.slug;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (typeof slug !== "string" || !/^[a-z0-9-]+$/i.test(slug)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const seen = req.cookies.get("tt_seen")?.value?.split(",") ?? [];
    if (seen.includes(slug)) {
      return NextResponse.json({ ok: true, deduped: true });
    }
    await getDb()
      .update(tools)
      .set({ view_count: sql`${tools.view_count} + 1` })
      .where(eq(tools.slug, slug));

    const next = [...seen.slice(-99), slug];
    const res = NextResponse.json({ ok: true });
    res.cookies.set("tt_seen", next.join(","), {
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  } catch (err) {
    // View tracking should never break the page.
    console.error("API /api/views error:", err);
    return NextResponse.json({ ok: true, deduped: true });
  }
}
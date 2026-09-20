import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { favorites, tools } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * Favorites API for authenticated users.
 * GET  /api/favorites -> list of favorited tool slugs
 * POST /api/favorites {slug} -> add favorite (deduped)
 * DELETE /api/favorites {slug} -> remove favorite
 * Guests use localStorage on the client and don't hit this route.
 */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ items: [] });
  }
  const userId = Number(session.user.id);
  try {
    const rows = await getDb()
      .select({ slug: tools.slug })
      .from(favorites)
      .innerJoin(tools, eq(favorites.tool_id, tools.id))
      .where(eq(favorites.user_id, userId));
    return NextResponse.json({ items: rows.map((r) => r.slug) });
  } catch (err) {
    console.error("API /api/favorites GET error:", err);
    return NextResponse.json({ error: "Could not load favorites." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to save favorites." }, { status: 401 });
  }
  const userId = Number(session.user.id);
  let slug: unknown;
  try {
    const body = await req.json();
    slug = body?.slug;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof slug !== "string" || !/^[a-z0-9-]+$/i.test(slug)) {
    return NextResponse.json({ error: "Invalid tool." }, { status: 400 });
  }

  try {
    const tool = await getDb()
      .select({ id: tools.id })
      .from(tools)
      .where(eq(tools.slug, slug))
      .limit(1);
    if (tool.length === 0) {
      return NextResponse.json({ error: "Tool not found." }, { status: 404 });
    }
    // unique index on (user_id, tool_id) prevents duplicates
    await getDb()
      .insert(favorites)
      .values({ user_id: userId, tool_id: tool[0].id })
      .onConflictDoNothing();
    await getDb()
      .update(tools)
      .set({ favorite_count: sql`${tools.favorite_count} + 1` })
      .where(eq(tools.id, tool[0].id));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API /api/favorites POST error:", err);
    return NextResponse.json({ error: "Could not save favorite." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to manage favorites." }, { status: 401 });
  }
  const userId = Number(session.user.id);
  let slug: unknown;
  try {
    const body = await req.json();
    slug = body?.slug;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof slug !== "string") {
    return NextResponse.json({ error: "Invalid tool." }, { status: 400 });
  }

  try {
    const tool = await getDb()
      .select({ id: tools.id })
      .from(tools)
      .where(eq(tools.slug, slug))
      .limit(1);
    if (tool.length === 0) {
      return NextResponse.json({ ok: true });
    }
    await getDb()
      .delete(favorites)
      .where(and(eq(favorites.user_id, userId), eq(favorites.tool_id, tool[0].id)));
    await getDb()
      .update(tools)
      .set({ favorite_count: sql`greatest(${tools.favorite_count} - 1, 0)` })
      .where(eq(tools.id, tool[0].id));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API /api/favorites DELETE error:", err);
    return NextResponse.json({ error: "Could not remove favorite." }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { toolSubmissions, tools, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { slugify, sanitizeText } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "admin";
}

/** PATCH /api/admin/submissions/:id { status: "approved"|"rejected", admin_notes? } */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const subId = Number(id);
  if (!Number.isInteger(subId)) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const b = body as Record<string, unknown>;
  const status = b.status as "approved" | "rejected" | undefined;
  if (!["approved", "rejected"].includes(String(status))) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  try {
    const sub = await getDb()
      .select()
      .from(toolSubmissions)
      .where(eq(toolSubmissions.id, subId))
      .limit(1);
    if (sub.length === 0) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }
    const s = sub[0];

    if (status === "approved") {
      // Create the approved tool from the submission.
      const slug = slugify(s.name);
      const existing = await getDb().select({ id: tools.id }).from(tools).where(eq(tools.slug, slug)).limit(1);
      if (existing.length === 0) {
        const categoryId = s.category_id ?? (await pickFallbackCategory());
        const rows = await getDb()
          .insert(tools)
          .values({
            name: sanitizeText(s.name, 120),
            slug,
            short_description: sanitizeText(s.description, 500),
            description: sanitizeText(s.description, 2000),
            website_url: s.website_url,
            category_id: categoryId,
            pricing_type: "Free",
            status: "approved",
          })
          .returning({ id: tools.id });
        const cnt = await getDb().$count(tools, eq(tools.category_id, categoryId));
        await getDb().update(categories).set({ tool_count: cnt }).where(eq(categories.id, categoryId));
        void rows;
      }
    }

    await getDb()
      .update(toolSubmissions)
      .set({
        status,
        admin_notes:
          typeof b.admin_notes === "string" ? sanitizeText(b.admin_notes, 1000) : s.admin_notes,
        updatedAt: new Date(),
      })
      .where(eq(toolSubmissions.id, subId));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API /api/admin/submissions PATCH error:", err);
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

async function pickFallbackCategory(): Promise<number> {
  const db = getDb();
  const rows = await db
    .select({ id: categories.id, tool_count: categories.tool_count })
    .from(categories)
    .where(eq(categories.slug, "other"))
    .limit(1);
  if (rows.length > 0) return rows[0].id;
  const anyCat = await db.select({ id: categories.id }).from(categories).limit(1);
  return anyCat.length > 0 ? anyCat[0].id : 1;
}
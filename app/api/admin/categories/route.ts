import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { sanitizeText, slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

const catSchema = z.object({
  name: z.string().min(2).max(80),
  icon: z.string().max(10).optional().default("🔧"),
  description: z.string().max(500).optional().default(""),
});

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "admin";
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = catSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a category name." }, { status: 400 });
  }
  const { name, icon, description } = parsed.data;
  const slug = slugify(name);
  try {
    const existing = await getDb().select({ id: categories.id }).from(categories).where(eq(categories.slug, slug)).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ error: "This category already exists." }, { status: 409 });
    }
    const rows = await getDb()
      .insert(categories)
      .values({ name: sanitizeText(name, 80), slug, icon, description: description || null })
      .returning({ id: categories.id });
    return NextResponse.json({ ok: true, id: rows[0].id }, { status: 201 });
  } catch (err) {
    console.error("API /api/admin/categories POST error:", err);
    return NextResponse.json({ error: "Could not create category." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(new URL(req.url).searchParams.get("id"));
  if (!Number.isInteger(id)) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const parsed = catSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid category data." }, { status: 400 });
  }
  const { name, icon, description } = parsed.data;
  try {
    await getDb()
      .update(categories)
      .set({ name: sanitizeText(name, 80), slug: slugify(name), icon, description: description || null, updatedAt: new Date() })
      .where(eq(categories.id, id));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API /api/admin/categories PATCH error:", err);
    return NextResponse.json({ error: "Could not update category." }, { status: 500 });
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { tools, toolFeatures, toolTags } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { recalcToolRating } from "@/lib/db/queries";
import { sanitizeText, slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

const toolSchema = z.object({
  name: z.string().min(2).max(120),
  short_description: z.string().min(5).max(500),
  description: z.string().max(5000).optional().default(""),
  website_url: z.string().url().max(300),
  logo_url: z.string().url().max(500).optional().nullable(),
  category_id: z.number().int().positive(),
  pricing_type: z.enum(["Free", "Freemium", "Paid", "Free Trial", "Contact for Pricing"]),
  pricing_details: z.string().max(300).optional().default(""),
  is_featured: z.boolean().default(false),
  is_popular: z.boolean().default(false),
  is_new: z.boolean().default(false),
  status: z.enum(["approved", "pending", "rejected"]).default("approved"),
  features: z.array(z.string().min(1).max(80)).max(30).default([]),
  tags: z.array(z.string().min(1).max(40)).max(30).default([]),
});

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "admin";
}

function bad(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

/** PATCH /api/admin/tools/:id { field: value } */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const toolId = Number(id);
  if (!Number.isInteger(toolId)) return bad("Invalid tool id.");

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid request body.");
  }
  const b = body as Record<string, unknown>;

  const allowed: Record<string, (v: unknown) => unknown> = {
    is_featured: (v) => Boolean(v),
    is_popular: (v) => Boolean(v),
    is_new: (v) => Boolean(v),
    status: (v) => (["approved", "pending", "rejected"].includes(String(v)) ? v : undefined),
  };

  const set: Record<string, unknown> = {};
  for (const [key, fn] of Object.entries(allowed)) {
    if (b[key] !== undefined) {
      const val = fn(b[key]);
      if (val !== undefined) set[key] = val;
    }
  }
  if (Object.keys(set).length === 0) return bad("No valid fields to update.");

  try {
    await getDb().update(tools).set(set).where(eq(tools.id, toolId));
    if (set.status === "approved") {
      await recalcToolRating(toolId);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API /api/admin/tools PATCH error:", err);
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

/** PUT /api/admin/tools/:id — full update */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const toolId = Number(id);
  if (!Number.isInteger(toolId)) return bad("Invalid tool id.");

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid request body.");
  }
  const parsed = toolSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill in the required fields correctly." },
      { status: 400 },
    );
  }
  const data = parsed.data;

  try {
    const existing = await getDb().select({ id: tools.id }).from(tools).where(eq(tools.id, toolId)).limit(1);
    if (existing.length === 0) return bad("Tool not found.");

    await getDb()
      .update(tools)
      .set({
        name: sanitizeText(data.name, 120),
        short_description: sanitizeText(data.short_description, 500),
        description: sanitizeText(data.description, 5000) || null,
        website_url: data.website_url,
        logo_url: data.logo_url || null,
        category_id: data.category_id,
        pricing_type: data.pricing_type,
        pricing_details: data.pricing_details || null,
        is_featured: data.is_featured,
        is_popular: data.is_popular,
        is_new: data.is_new,
        status: data.status,
        updatedAt: new Date(),
      })
      .where(eq(tools.id, toolId));

    await getDb().delete(toolFeatures).where(eq(toolFeatures.tool_id, toolId));
    await getDb().delete(toolTags).where(eq(toolTags.tool_id, toolId));
    const features = Array.from(new Set(data.features.map((f) => f.trim()).filter(Boolean)));
    const tags = Array.from(new Set(data.tags.map((t) => t.toLowerCase().trim()).filter(Boolean)));
    if (features.length) {
      await getDb().insert(toolFeatures).values(features.map((f) => ({ tool_id: toolId, feature_name: sanitizeText(f, 80) })));
    }
    if (tags.length) {
      await getDb().insert(toolTags).values(tags.map((t) => ({ tool_id: toolId, tag: sanitizeText(t, 40) })));
    }
    if (data.status === "approved") {
      await recalcToolRating(toolId);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API /api/admin/tools PUT error:", err);
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

/** DELETE /api/admin/tools/:id */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const toolId = Number(id);
  if (!Number.isInteger(toolId)) return bad("Invalid tool id.");
  try {
    await getDb().delete(tools).where(eq(tools.id, toolId));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API /api/admin/tools DELETE error:", err);
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
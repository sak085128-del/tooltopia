import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { tools, toolFeatures, toolTags, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { sanitizeText, slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

const toolSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(120).optional(),
  short_description: z.string().min(5).max(500),
  description: z.string().max(5000).optional().default(""),
  website_url: z.string().url().max(300),
  logo_url: z.string().url().max(500).optional().nullable(),
  category_id: z.number().int().positive(),
  pricing_type: z.enum(["Free", "Freemium", "Paid", "Free Trial", "Contact for Pricing"]),
  pricing_details: z.string().max(300).optional().default(""),
  rating: z.number().min(0).max(5).default(0),
  review_count: z.number().int().min(0).default(0),
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

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
  const parsed = toolSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill in the required fields correctly." },
      { status: 400 },
    );
  }
  const data = parsed.data;
  const slug = data.slug?.trim() ? slugify(data.slug) : slugify(data.name);

  try {
    const existing = await getDb().select({ id: tools.id }).from(tools).where(eq(tools.slug, slug)).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ error: "A tool with this slug already exists." }, { status: 409 });
    }
    const cat = await getDb().select({ id: categories.id }).from(categories).where(eq(categories.id, data.category_id)).limit(1);
    if (cat.length === 0) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    const rows = await getDb()
      .insert(tools)
      .values({
        name: sanitizeText(data.name, 120),
        slug,
        short_description: sanitizeText(data.short_description, 500),
        description: sanitizeText(data.description, 5000) || null,
        website_url: data.website_url,
        logo_url: data.logo_url || null,
        category_id: data.category_id,
        pricing_type: data.pricing_type,
        pricing_details: data.pricing_details || null,
        rating: data.rating,
        review_count: data.review_count,
        is_featured: data.is_featured,
        is_popular: data.is_popular,
        is_new: data.is_new,
        status: data.status,
      })
      .returning({ id: tools.id });
    const toolId = rows[0].id;

    const features = Array.from(new Set(data.features.map((f) => f.trim()).filter(Boolean)));
    const tags = Array.from(new Set(data.tags.map((t) => t.toLowerCase().trim()).filter(Boolean)));
    if (features.length) {
      await getDb().insert(toolFeatures).values(features.map((f) => ({ tool_id: toolId, feature_name: sanitizeText(f, 80) })));
    }
    if (tags.length) {
      await getDb().insert(toolTags).values(tags.map((t) => ({ tool_id: toolId, tag: sanitizeText(t, 40) })));
    }
    return NextResponse.json({ ok: true, id: toolId }, { status: 201 });
  } catch (err) {
    console.error("API /api/admin/tools POST error:", err);
    return NextResponse.json({ error: "Could not create tool." }, { status: 500 });
  }
}
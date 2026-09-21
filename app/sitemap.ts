import type { MetadataRoute } from "next";
import { getDb } from "@/lib/db/client";
import { tools, categories, comparisons } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { getBaseUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const db = getDb();

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "daily", priority: 1 },
    { url: `${base}/ai-tools`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/categories`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/popular`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/new-tools`, changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/featured`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/compare`, changeFrequency: "weekly", priority: 0.7 },
  ];

  try {
    const [toolRows, catRows, cmpRows] = await Promise.all([
      db
        .select({ slug: tools.slug, updatedAt: tools.updatedAt })
        .from(tools)
        .where(eq(tools.status, "approved")),
      db
        .select({ slug: categories.slug, updatedAt: categories.updatedAt })
        .from(categories)
        .where(
          sql`exists (select 1 from ${tools} t where t.category_id = ${categories.id} and t.status = 'approved')`,
        ),
      db.select({ slug: comparisons.slug, updatedAt: comparisons.updatedAt }).from(comparisons),
    ]);

    for (const t of toolRows) {
      entries.push({
        url: `${base}/ai-tools/${t.slug}`,
        lastModified: t.updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
      });
    }
    for (const c of catRows) {
      entries.push({
        url: `${base}/categories/${c.slug}`,
        lastModified: c.updatedAt,
        changeFrequency: "daily",
        priority: 0.7,
      });
    }
    for (const c of cmpRows) {
      entries.push({
        url: `${base}/compare/${c.slug}`,
        lastModified: c.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  } catch (err) {
    // If the DB is unavailable, still return the static sitemap.
    console.error("sitemap DB error:", err);
  }

  return entries;
}
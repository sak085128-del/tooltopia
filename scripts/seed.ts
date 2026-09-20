/* eslint-disable no-console */
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { asc, eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import {
  categories,
  tools,
  toolFeatures,
  toolTags,
  users,
  comparisons,
  type NewTool,
} from "../lib/db/schema";
import { SEED_CATEGORIES, categorySlugByLegacyName } from "../lib/data/categories";
import seedToolsRaw from "../lib/data/tools.seed.json";

type SeedTool = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  category: string;
  logo: string;
  desc: string;
  features: string[];
  website: string;
  url: string;
  price: "Free" | "Freemium" | "Paid" | "Free Trial" | "Contact for Pricing";
  rating: number;
  ratings: number;
  isNew: boolean;
  added: string;
  pop: number;
  tags: string[];
};

const PRESET_COMPARISONS: Array<{
  slug: string;
  title: string;
  description: string;
  toolA: string;
  toolB: string;
}> = [
  {
    slug: "chatgpt-vs-claude",
    title: "ChatGPT vs Claude",
    description:
      "A detailed comparison of OpenAI ChatGPT and Anthropic Claude for writing, coding, and everyday assistance.",
    toolA: "chatgpt",
    toolB: "claude",
  },
  {
    slug: "midjourney-vs-dalle",
    title: "Midjourney vs DALL-E 3",
    description:
      "Two of the most popular AI image generators, compared for artistic quality, control, and speed.",
    toolA: "midjourney",
    toolB: "dalle",
  },
];

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL is not set. Set it and run `npm run db:seed`.");
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
  const db = drizzle({ client: pool });
  const toolList = seedToolsRaw as unknown as SeedTool[];

  console.log(`Seeding ${toolList.length} tools across ${SEED_CATEGORIES.length} categories…`);

  // ---- Categories ----
  for (const cat of SEED_CATEGORIES) {
    const existing = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, cat.slug))
      .limit(1);
    if (existing.length === 0) {
      await db.insert(categories).values({
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        description: cat.description,
      });
      console.log(`  + category ${cat.slug}`);
    }
  }

  // Build slug -> id lookup for categories
  const catRows = await db.select().from(categories);
  const catIdBySlug: Record<string, number> = {};
  catRows.forEach((c) => (catIdBySlug[c.slug] = c.id));

  // ---- Tools ----
  let inserted = 0;
  let updated = 0;
  for (const t of toolList) {
    const catSlug = categorySlugByLegacyName[t.category] ?? "other";
    const categoryId = catIdBySlug[catSlug];
    if (!categoryId) {
      console.warn(`  ! skipping ${t.slug}: unknown category ${t.category}`);
      continue;
    }

    const values: NewTool = {
      name: t.name,
      slug: t.slug,
      short_description: t.desc,
      description: t.desc,
      website_url: t.url.startsWith("http") ? t.url : `https://${t.url}`,
      logo_url: t.logo,
      category_id: categoryId,
      pricing_type: t.price,
      rating: t.rating,
      review_count: t.ratings,
      is_featured: t.pop >= 90,
      is_popular: t.pop >= 75,
      is_new: t.isNew,
      status: "approved",
      createdAt: new Date(t.added),
      updatedAt: new Date(),
    };

    const existing = await db
      .select()
      .from(tools)
      .where(eq(tools.slug, t.slug))
      .limit(1);

    let toolId: number;
    if (existing.length === 0) {
      const rows = await db
        .insert(tools)
        .values(values)
        .returning({ id: tools.id });
      toolId = rows[0].id;
      inserted++;
    } else {
      toolId = existing[0].id;
      await db.update(tools).set(values).where(eq(tools.id, toolId));
      updated++;
    }

    // Features + tags: delete & re-insert for idempotency
    await db.delete(toolFeatures).where(eq(toolFeatures.tool_id, toolId));
    await db.delete(toolTags).where(eq(toolTags.tool_id, toolId));
    if (t.features?.length) {
      await db.insert(toolFeatures).values(
        t.features.map((f) => ({ tool_id: toolId, feature_name: f })),
      );
    }
    const tags = Array.from(new Set((t.tags ?? []).map((g) => g.toLowerCase())));
    if (tags.length) {
      await db.insert(toolTags).values(
        tags.map((tag) => ({ tool_id: toolId, tag })),
      );
    }
  }
  console.log(`  tools: ${inserted} inserted, ${updated} updated`);

  // Refresh category tool counts
  for (const cat of catRows) {
    const cnt = await db.$count(tools, eq(tools.category_id, cat.id));
    await db.update(categories).set({ tool_count: cnt }).where(eq(categories.id, cat.id));
  }
  console.log("  category counts refreshed");

  // ---- Comparisons ----
  for (const c of PRESET_COMPARISONS) {
    const a = await db.select().from(tools).where(eq(tools.slug, c.toolA)).limit(1);
    const b = await db.select().from(tools).where(eq(tools.slug, c.toolB)).limit(1);
    if (!a.length || !b.length) {
      console.warn(`  ! comparison ${c.slug} skipped (missing tool)`);
      continue;
    }
    const existing = await db
      .select()
      .from(comparisons)
      .where(eq(comparisons.slug, c.slug))
      .limit(1);
    if (existing.length === 0) {
      await db.insert(comparisons).values({
        slug: c.slug,
        title: c.title,
        description: c.description,
        tool_a_id: a[0].id,
        tool_b_id: b[0].id,
      });
      console.log(`  + comparison ${c.slug}`);
    }
  }

  // ---- Admin user ----
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@tooltopia.app").toLowerCase();
  const adminPass = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? "ToolTopia Admin";
  const existingAdmin = await db
    .select()
    .from(users)
    .where(eq(users.email, adminEmail))
    .limit(1);
  if (existingAdmin.length === 0) {
    if (!adminPass) {
      console.error(
        `Admin user ${adminEmail} does not exist and ADMIN_PASSWORD is not set. Set ADMIN_PASSWORD to create it.`,
      );
    } else {
      const hash = await bcrypt.hash(adminPass, 10);
      await db.insert(users).values({
        email: adminEmail,
        name: adminName,
        passwordHash: hash,
        role: "admin",
      });
      console.log(`  + admin user ${adminEmail}`);
    }
  } else {
    console.log(`  admin user ${adminEmail} already exists`);
  }

  // Clear unused "other" category if it has no tools
  const otherId = catIdBySlug["other"];
  if (otherId) {
    const cnt = await db.$count(tools, eq(tools.category_id, otherId));
    if (cnt === 0) {
      await db.delete(categories).where(eq(categories.id, otherId));
      console.log("  - removed empty 'other' category");
    }
  }

  await pool.end();
  console.log("Seed complete ✅");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
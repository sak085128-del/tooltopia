import { and, asc, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { getDb } from "./client";
import {
  categories,
  pricingTypeEnum,
  toolFeatures,
  tools,
  toolTags,
  reviews,
  comparisons,
  users,
  type Tool,
} from "./schema";

export type ToolWithDetails = Tool & {
  category: { id: number; name: string; slug: string; icon: string };
  features: string[];
  tags: string[];
};

export type ToolFilters = {
  q?: string;
  categorySlug?: string;
  pricing?: string;
  sort?: string;
  featuredOnly?: boolean;
  popularOnly?: boolean;
  newOnly?: boolean;
  freeOnly?: boolean;
  onlyApproved?: boolean;
  page?: number;
  pageSize?: number;
};

export type PaginatedTools = {
  items: ToolWithDetails[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

const APPROVED = "approved";

/** Return a tool with its category, feature names and tag names. */
export async function getToolWithDetails(
  slug: string,
  opts: { onlyApproved?: boolean } = {},
): Promise<ToolWithDetails | null> {
  const db = getDb();
  const conds = [eq(tools.slug, slug)];
  if (opts.onlyApproved !== false) conds.push(eq(tools.status, APPROVED));

  const rows = await db
    .select({
      tool: tools,
      category: categories,
    })
    .from(tools)
    .innerJoin(categories, eq(tools.category_id, categories.id))
    .where(and(...conds))
    .limit(1);

  if (rows.length === 0) return null;
  const { tool, category } = rows[0];

  const [featRows, tagRows] = await Promise.all([
    db
      .select({ feature_name: toolFeatures.feature_name })
      .from(toolFeatures)
      .where(eq(toolFeatures.tool_id, tool.id)),
    db
      .select({ tag: toolTags.tag })
      .from(toolTags)
      .where(eq(toolTags.tool_id, tool.id)),
  ]);

  return {
    ...tool,
    category: {
      id: category.id,
      name: category.name,
      slug: category.slug,
      icon: category.icon ?? "🔧",
    },
    features: featRows.map((f) => f.feature_name),
    tags: tagRows.map((t) => t.tag),
  };
}

/** Core list query used by the directory, category pages, and collection pages. */
export async function queryTools(filters: ToolFilters = {}): Promise<PaginatedTools> {
  const db = getDb();
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(50, Math.max(1, filters.pageSize ?? 12));
  const offset = (page - 1) * pageSize;

  const conds = [eq(tools.status, APPROVED)];
  if (filters.q) {
    const q = `%${filters.q.trim()}%`;
    conds.push(
      or(
        ilike(tools.name, q),
        ilike(tools.short_description, q),
        ilike(tools.description, q),
      )!,
    );
  }
  if (filters.categorySlug) {
    const cat = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, filters.categorySlug))
      .limit(1);
    if (cat.length === 0) {
      return { items: [], total: 0, page, pageSize, totalPages: 0 };
    }
    conds.push(eq(tools.category_id, cat[0].id));
  }
  if (filters.pricing)
    conds.push(
      eq(tools.pricing_type, filters.pricing as (typeof pricingTypeEnum)["enumValues"][number]),
    );
  if (filters.featuredOnly) conds.push(eq(tools.is_featured, true));
  if (filters.popularOnly) conds.push(eq(tools.is_popular, true));
  if (filters.newOnly) conds.push(eq(tools.is_new, true));
  if (filters.freeOnly)
    conds.push(inArray(tools.pricing_type, ["Free", "Freemium"]));

  const where = and(...conds);

  const [rows, total] = await Promise.all([
    db
      .select({
        tool: tools,
        category: categories,
      })
      .from(tools)
      .innerJoin(categories, eq(tools.category_id, categories.id))
      .where(where)
      .orderBy(...orderByFor(filters.sort))
      .limit(pageSize)
      .offset(offset),
    db.select({ n: sql<number>`count(*)::int` }).from(tools).where(where),
  ]);

  const items: ToolWithDetails[] = [];
  if (rows.length > 0) {
    const toolIds = rows.map((r) => r.tool.id);
    const [featRows, tagRows] = await Promise.all([
      db
        .select()
        .from(toolFeatures)
        .where(inArray(toolFeatures.tool_id, toolIds)),
      db.select().from(toolTags).where(inArray(toolTags.tool_id, toolIds)),
    ]);
    const featByTool = new Map<number, string[]>();
    for (const f of featRows) {
      const arr = featByTool.get(f.tool_id) ?? [];
      arr.push(f.feature_name);
      featByTool.set(f.tool_id, arr);
    }
    const tagByTool = new Map<number, string[]>();
    for (const t of tagRows) {
      const arr = tagByTool.get(t.tool_id) ?? [];
      arr.push(t.tag);
      tagByTool.set(t.tool_id, arr);
    }
    for (const r of rows) {
      items.push({
        ...r.tool,
        category: {
          id: r.category.id,
          name: r.category.name,
          slug: r.category.slug,
          icon: r.category.icon ?? "🔧",
        },
        features: featByTool.get(r.tool.id) ?? [],
        tags: tagByTool.get(r.tool.id) ?? [],
      });
    }
  }

  const totalCount = rows.length > 0 ? (total[0]?.n ?? 0) : 0;
  return {
    items,
    total: totalCount,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(totalCount / pageSize)),
  };
}

function orderByFor(sort?: string) {
  switch (sort) {
    case "rating":
      return [desc(tools.rating), desc(tools.review_count)];
    case "newest":
      return [desc(tools.createdAt)];
    case "az":
      return [asc(tools.name)];
    case "views":
      return [desc(tools.view_count)];
    case "popular":
    default:
      return [desc(tools.is_popular), desc(tools.rating), desc(tools.review_count)];
  }
}

export async function getCategoriesWithCounts() {
  const db = getDb();
  return db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
      icon: categories.icon,
      description: categories.description,
      tool_count: categories.tool_count,
    })
    .from(categories)
    .orderBy(asc(categories.name));
}

export async function getHomepageData() {
  const db = getDb();
  const toolA = alias(tools, "toolA");
  const toolB = alias(tools, "toolB");
  const [stats, categoriesList, featured, popular, newest, free, comparisonRows] =
    await Promise.all([
      db
        .select({
          totalTools: sql<number>`count(*)::int`,
          totalRatings: sql<number>`coalesce(sum(${tools.review_count}),0)::int`,
          totalCategories: sql<number>`count(distinct ${tools.category_id})::int`,
        })
        .from(tools)
        .where(eq(tools.status, APPROVED)),
      getCategoriesWithCounts().then((list) =>
        list.filter((c) => (c.tool_count ?? 0) > 0),
      ),
      queryTools({ featuredOnly: true, pageSize: 8, sort: "rating" }),
      queryTools({ popularOnly: true, pageSize: 8, sort: "popular" }),
      queryTools({ newOnly: true, pageSize: 8, sort: "newest" }),
      queryTools({ freeOnly: true, pageSize: 8, sort: "rating" }),
      db
        .select({
          comparison: comparisons,
          toolA,
          toolB,
        })
        .from(comparisons)
        .innerJoin(toolA, eq(comparisons.tool_a_id, toolA.id))
        .innerJoin(toolB, eq(comparisons.tool_b_id, toolB.id))
        .limit(4),
    ]);

  return {
    stats: stats[0] ?? { totalTools: 0, totalRatings: 0, totalCategories: 0 },
    categories: categoriesList,
    featured: featured.items,
    popular: popular.items,
    newest: newest.items,
    free: free.items,
    comparisons: comparisonRows.map((c) => ({
      id: c.comparison.id,
      slug: c.comparison.slug,
      title: c.comparison.title,
      description: c.comparison.description,
      toolA: c.toolA,
      toolB: c.toolB,
    })),
  };
}

export async function getRelatedTools(tool: ToolWithDetails, limit = 4) {
  return queryTools({
    categorySlug: tool.category.slug,
    pageSize: limit,
    sort: "rating",
  }).then((r) => r.items.filter((t) => t.id !== tool.id).slice(0, limit));
}

export async function getApprovedReviewsForTool(toolId: number) {
  const db = getDb();
  return db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      title: reviews.title,
      content: reviews.content,
      status: reviews.status,
      createdAt: reviews.createdAt,
      userName: users.name,
    })
    .from(reviews)
    .innerJoin(users, eq(reviews.user_id, users.id))
    .where(and(eq(reviews.tool_id, toolId), eq(reviews.status, "approved")))
    .orderBy(desc(reviews.createdAt))
    .limit(20);
}

/** Recompute a tool's average rating and review count from approved reviews. */
export async function recalcToolRating(toolId: number): Promise<void> {
  const db = getDb();
  const agg = await db
    .select({
      avg: sql<number>`coalesce(avg(${reviews.rating}),0)`,
      cnt: sql<number>`count(*)::int`,
    })
    .from(reviews)
    .where(and(eq(reviews.tool_id, toolId), eq(reviews.status, "approved")));
  const { avg, cnt } = agg[0];
  await db
    .update(tools)
    .set({ rating: Math.round(avg * 10) / 10, review_count: cnt })
    .where(eq(tools.id, toolId));
}

export type ComparisonWithTools = {
  id: number;
  slug: string;
  title: string;
  description: string | null;
  toolA: ToolWithDetails | null;
  toolB: ToolWithDetails | null;
};

export async function getComparisons(): Promise<ComparisonWithTools[]> {
  const db = getDb();
  const toolA = alias(tools, "toolA");
  const toolB = alias(tools, "toolB");
  const rows = await db
    .select({
      comparison: comparisons,
      toolA,
      toolB,
    })
    .from(comparisons)
    .innerJoin(toolA, eq(comparisons.tool_a_id, toolA.id))
    .innerJoin(toolB, eq(comparisons.tool_b_id, toolB.id));

  return Promise.all(
    rows.map(async (r) => ({
      id: r.comparison.id,
      slug: r.comparison.slug,
      title: r.comparison.title,
      description: r.comparison.description,
      toolA: await getToolWithDetails(r.toolA.slug),
      toolB: await getToolWithDetails(r.toolB.slug),
    })),
  );
}

export async function getComparisonBySlug(slug: string): Promise<ComparisonWithTools | null> {
  const db = getDb();
  const toolA = alias(tools, "toolA");
  const toolB = alias(tools, "toolB");
  const rows = await db
    .select({
      comparison: comparisons,
      toolA,
      toolB,
    })
    .from(comparisons)
    .innerJoin(toolA, eq(comparisons.tool_a_id, toolA.id))
    .innerJoin(toolB, eq(comparisons.tool_b_id, toolB.id))
    .where(eq(comparisons.slug, slug))
    .limit(1);
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    id: r.comparison.id,
    slug: r.comparison.slug,
    title: r.comparison.title,
    description: r.comparison.description,
    toolA: await getToolWithDetails(r.toolA.slug),
    toolB: await getToolWithDetails(r.toolB.slug),
  };
}
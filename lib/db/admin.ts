import { eq, sql, desc, and } from "drizzle-orm";
import { getDb } from "./client";
import {
  tools,
  categories,
  toolSubmissions,
  reviews,
  users,
  comparisons,
  toolFeatures,
  toolTags,
} from "./schema";

export async function getAdminStats() {
  const db = getDb();
  const [toolStats, catCount, subStats, revStats, userCount, cmpCount] =
    await Promise.all([
      db
        .select({
          total: sql<number>`count(*)::int`,
          pending: sql<number>`count(*) filter (where ${tools.status} = 'pending')::int`,
        })
        .from(tools),
      db.select({ n: sql<number>`count(*)::int` }).from(categories),
      db
        .select({
          total: sql<number>`count(*)::int`,
          pending: sql<number>`count(*) filter (where ${toolSubmissions.status} = 'pending')::int`,
        })
        .from(toolSubmissions),
      db
        .select({
          total: sql<number>`count(*)::int`,
          pending: sql<number>`count(*) filter (where ${reviews.status} = 'pending')::int`,
        })
        .from(reviews),
      db.select({ n: sql<number>`count(*)::int` }).from(users),
      db.select({ n: sql<number>`count(*)::int` }).from(comparisons),
    ]);
  return {
    totalTools: toolStats[0].total,
    pendingTools: toolStats[0].pending,
    totalCategories: catCount[0].n,
    totalSubmissions: subStats[0].total,
    pendingSubmissions: subStats[0].pending,
    totalReviews: revStats[0].total,
    pendingReviews: revStats[0].pending,
    totalUsers: userCount[0].n,
    totalComparisons: cmpCount[0].n,
  };
}

export async function getAdminTools(limit = 50) {
  const db = getDb();
  return db
    .select({
      id: tools.id,
      name: tools.name,
      slug: tools.slug,
      category: categories.name,
      pricing_type: tools.pricing_type,
      status: tools.status,
      is_featured: tools.is_featured,
      is_popular: tools.is_popular,
      rating: tools.rating,
      view_count: tools.view_count,
    })
    .from(tools)
    .innerJoin(categories, eq(tools.category_id, categories.id))
    .orderBy(desc(tools.createdAt))
    .limit(limit);
}

export async function getAdminSubmissions() {
  const db = getDb();
  return db
    .select({
      id: toolSubmissions.id,
      name: toolSubmissions.name,
      website_url: toolSubmissions.website_url,
      description: toolSubmissions.description,
      category: categories.name,
      status: toolSubmissions.status,
      admin_notes: toolSubmissions.admin_notes,
      createdAt: toolSubmissions.createdAt,
    })
    .from(toolSubmissions)
    .leftJoin(categories, eq(toolSubmissions.category_id, categories.id))
    .orderBy(desc(toolSubmissions.createdAt))
    .limit(100);
}

export async function getAdminReviews() {
  const db = getDb();
  return db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      title: reviews.title,
      content: reviews.content,
      status: reviews.status,
      toolName: tools.name,
      toolSlug: tools.slug,
      userName: users.name,
      userEmail: users.email,
      createdAt: reviews.createdAt,
    })
    .from(reviews)
    .innerJoin(tools, eq(reviews.tool_id, tools.id))
    .innerJoin(users, eq(reviews.user_id, users.id))
    .orderBy(desc(reviews.createdAt))
    .limit(100);
}

export async function getAdminCategories() {
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
    .orderBy(categories.name);
}

export async function getAdminToolById(id: number) {
  const db = getDb();
  return db.select().from(tools).where(eq(tools.id, id)).limit(1);
}

export async function getAdminToolEditData(id: number) {
  const db = getDb();
  const toolRows = await db.select().from(tools).where(eq(tools.id, id)).limit(1);
  if (toolRows.length === 0) return null;
  const tool = toolRows[0];
  const [featRows, tagRows] = await Promise.all([
    db.select({ feature_name: toolFeatures.feature_name }).from(toolFeatures).where(eq(toolFeatures.tool_id, id)),
    db.select({ tag: toolTags.tag }).from(toolTags).where(eq(toolTags.tool_id, id)),
  ]);
  return {
    ...tool,
    features: featRows.map((f) => f.feature_name),
    tags: tagRows.map((t) => t.tag),
  };
}
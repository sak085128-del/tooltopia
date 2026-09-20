import {
  pgTable,
  text,
  integer,
  doublePrecision,
  timestamp,
  boolean,
  index,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { sql } from "drizzle-orm";

export const pricingTypeEnum = pgEnum("pricing_type", [
  "Free",
  "Freemium",
  "Paid",
  "Free Trial",
  "Contact for Pricing",
]);

export const roleEnum = pgEnum("role", ["user", "editor", "admin"]);

export const toolStatusEnum = pgEnum("tool_status", [
  "pending",
  "approved",
  "rejected",
]);

export const reviewStatusEnum = pgEnum("review_status", [
  "pending",
  "approved",
  "rejected",
]);

export const submissionStatusEnum = pgEnum("submission_status", [
  "pending",
  "approved",
  "rejected",
]);

export const categories = pgTable(
  "categories",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    icon: text("icon").default("🔧"),
    tool_count: integer("tool_count").default(0),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [uniqueIndex("categories_slug_unique").on(t.slug)],
);

export const tools = pgTable(
  "tools",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    short_description: text("short_description").notNull(),
    description: text("description"),
    website_url: text("website_url").notNull(),
    logo_url: text("logo_url"),
    category_id: integer("category_id")
      .notNull()
      .references(() => categories.id),
    pricing_type: pricingTypeEnum("pricing_type").default("Free").notNull(),
    pricing_details: text("pricing_details"),
    rating: doublePrecision("rating").default(0).notNull(),
    review_count: integer("review_count").default(0).notNull(),
    view_count: integer("view_count").default(0).notNull(),
    favorite_count: integer("favorite_count").default(0).notNull(),
    is_featured: boolean("is_featured").default(false).notNull(),
    is_popular: boolean("is_popular").default(false).notNull(),
    is_new: boolean("is_new").default(false).notNull(),
    status: toolStatusEnum("status").default("approved").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    uniqueIndex("tools_slug_unique").on(t.slug),
    index("tools_category_idx").on(t.category_id),
    index("tools_rating_idx").on(t.rating),
    index("tools_status_idx").on(t.status),
  ],
);

export const toolFeatures = pgTable(
  "tool_features",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    tool_id: integer("tool_id")
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
    feature_name: text("feature_name").notNull(),
  },
  (t) => [index("tool_features_tool_idx").on(t.tool_id)],
);

export const toolTags = pgTable(
  "tool_tags",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    tool_id: integer("tool_id")
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
    tag: text("tag").notNull(),
  },
  (t) => [
    index("tool_tags_tool_idx").on(t.tool_id),
    index("tool_tags_tag_idx").on(t.tag),
  ],
);

export const users = pgTable(
  "users",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    email: text("email").notNull(),
    name: text("name"),
    avatar: text("avatar"),
    passwordHash: text("password_hash"),
    role: roleEnum("role").default("user").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [uniqueIndex("users_email_unique").on(t.email)],
);

export const favorites = pgTable(
  "favorites",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tool_id: integer("tool_id")
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    uniqueIndex("favorites_user_tool_unique").on(t.user_id, t.tool_id),
    index("favorites_user_idx").on(t.user_id),
  ],
);

export const reviews = pgTable(
  "reviews",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    tool_id: integer("tool_id")
      .notNull()
      .references(() => tools.id, { onDelete: "cascade" }),
    user_id: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    title: text("title"),
    content: text("content"),
    status: reviewStatusEnum("status").default("pending").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("reviews_tool_idx").on(t.tool_id),
    index("reviews_status_idx").on(t.status),
    uniqueIndex("reviews_user_tool_unique").on(t.user_id, t.tool_id),
  ],
);

export const toolSubmissions = pgTable(
  "tool_submissions",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    website_url: text("website_url").notNull(),
    description: text("description").notNull(),
    category_id: integer("category_id").references(() => categories.id),
    submitted_by: integer("submitted_by").references(() => users.id),
    status: submissionStatusEnum("status").default("pending").notNull(),
    admin_notes: text("admin_notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [index("submissions_status_idx").on(t.status)],
);

export const comparisons = pgTable(
  "comparisons",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description"),
    tool_a_id: integer("tool_a_id").references(() => tools.id),
    tool_b_id: integer("tool_b_id").references(() => tools.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [uniqueIndex("comparisons_slug_unique").on(t.slug)],
);

// ---- Relations ----

export const categoriesRelations = relations(categories, ({ many }) => ({
  tools: many(tools),
}));

export const toolsRelations = relations(tools, ({ one, many }) => ({
  category: one(categories, {
    fields: [tools.category_id],
    references: [categories.id],
  }),
  features: many(toolFeatures),
  tags: many(toolTags),
  favorites: many(favorites),
  reviews: many(reviews),
}));

export const toolFeaturesRelations = relations(toolFeatures, ({ one }) => ({
  tool: one(tools, { fields: [toolFeatures.tool_id], references: [tools.id] }),
}));

export const toolTagsRelations = relations(toolTags, ({ one }) => ({
  tool: one(tools, { fields: [toolTags.tool_id], references: [tools.id] }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  favorites: many(favorites),
  reviews: many(reviews),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.user_id], references: [users.id] }),
  tool: one(tools, { fields: [favorites.tool_id], references: [tools.id] }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  tool: one(tools, { fields: [reviews.tool_id], references: [tools.id] }),
  user: one(users, { fields: [reviews.user_id], references: [users.id] }),
}));

export const toolSubmissionsRelations = relations(
  toolSubmissions,
  ({ one }) => ({
    category: one(categories, {
      fields: [toolSubmissions.category_id],
      references: [categories.id],
    }),
    submitter: one(users, {
      fields: [toolSubmissions.submitted_by],
      references: [users.id],
    }),
  }),
);

export const comparisonsRelations = relations(comparisons, ({ one }) => ({
  toolA: one(tools, {
    fields: [comparisons.tool_a_id],
    references: [tools.id],
  }),
  toolB: one(tools, {
    fields: [comparisons.tool_b_id],
    references: [tools.id],
  }),
}));

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Tool = typeof tools.$inferSelect;
export type NewTool = typeof tools.$inferInsert;
export type ToolFeature = typeof toolFeatures.$inferSelect;
export type ToolTag = typeof toolTags.$inferSelect;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type ToolSubmission = typeof toolSubmissions.$inferSelect;
export type Comparison = typeof comparisons.$inferSelect;

export const count = sql`count(*)`;
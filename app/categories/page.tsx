import type { Metadata } from "next";
import Link from "next/link";
import { getCategoriesWithCounts } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Tools by Category",
  description:
    "Browse AI tools by category: Writing, Image, Video, Audio, Coding, Productivity, Education, Marketing, Business and more.",
  alternates: { canonical: "/categories" },
};

export default async function CategoriesPage() {
  let categories: Awaited<ReturnType<typeof getCategoriesWithCounts>> = [];
  try {
    categories = (await getCategoriesWithCounts()).filter(
      (c) => (c.tool_count ?? 0) > 0,
    );
  } catch (err) {
    console.error("Categories DB error:", err);
  }

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-head">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Categories</span>
          </nav>
          <h1>
            AI Tools by <span className="gradient-text">Category</span>
          </h1>
          <p className="page-lead">
            Explore every category and find the best AI tools for your workflow.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>We couldn&apos;t load categories right now. Please try again.</p>
          </div>
        ) : (
          <div className="category-grid">
            {categories
              .slice()
              .sort((a, b) => (b.tool_count ?? 0) - (a.tool_count ?? 0))
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="category-card"
                  aria-label={`${c.name} AI tools`}
                >
                  <span className="category-icon">{c.icon}</span>
                  <span className="category-name">{c.name}</span>
                  <span className="category-count">
                    {c.tool_count ?? 0} {Number(c.tool_count) === 1 ? "tool" : "tools"}
                  </span>
                </Link>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
import type { Metadata } from "next";
import Link from "next/link";
import { queryTools, getCategoriesWithCounts } from "@/lib/db/queries";
import { ToolCard } from "@/components/tool-card";
import { DirectoryFilters } from "@/components/directory-filters";
import { Pagination } from "@/components/pagination";
import { SORT_OPTIONS } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description:
    "Browse 100+ real AI tools for writing, images, video, audio, coding, marketing, productivity and more. Search, filter by category and pricing, and compare tools.",
  alternates: { canonical: "/ai-tools" },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const get = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const q = get("q") ?? "";
  const category = get("category") ?? "";
  const pricing = get("pricing") ?? "";
  const sortRaw = get("sort") ?? "popular";
  const sort = SORT_OPTIONS.some((s) => s.value === sortRaw) ? sortRaw : "popular";
  const page = Math.max(1, parseInt(get("page") ?? "1", 10) || 1);

  let result;
  let categories: Awaited<ReturnType<typeof getCategoriesWithCounts>> = [];
  let error = false;
  try {
    const [res, cats] = await Promise.all([
      queryTools({ q, categorySlug: category, pricing, sort, page, pageSize: 24 }),
      getCategoriesWithCounts(),
    ]);
    result = res;
    categories = cats;
  } catch (err) {
    console.error("Directory DB error:", err);
    error = true;
  }

  const paramObj: Record<string, string | undefined> = {};
  if (q) paramObj.q = q;
  if (category) paramObj.category = category;
  if (pricing) paramObj.pricing = pricing;
  paramObj.sort = sort;

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-head">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>AI Tools</span>
          </nav>
          <h1>
            Explore <span className="gradient-text">AI Tools</span>
          </h1>
          <p className="page-lead">
            {result && !error
              ? `Search, filter and compare ${result.total} AI tools.`
              : "Search, filter and compare AI tools."}
          </p>
        </div>

        <DirectoryFilters
          categories={categories.map((c) => ({
            slug: c.slug,
            name: c.name,
            icon: c.icon,
          }))}
          current={{ q, category, pricing, sort }}
        />

        {error ? (
          <div className="empty-state">
            <div className="empty-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>We couldn&apos;t load AI tools right now. Please try again in a moment.</p>
            <Link href="/ai-tools" className="btn btn-primary">
              Try again
            </Link>
          </div>
        ) : !result || result.items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No AI tools found for this search</h3>
            <p>
              Try a different keyword, category or pricing filter. Here are some ideas:
            </p>
            <div className="chip-row">
              <Link href="/ai-tools" className="chip">
                All tools
              </Link>
              <Link href="/ai-tools?pricing=Free" className="chip">
                Free tools
              </Link>
              <Link href="/popular" className="chip">
                Popular
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="result-count" style={{ color: "var(--muted)", fontSize: "0.88rem", marginBottom: "16px" }}>
              Showing {result.items.length} of {result.total} tools
            </p>
            <div className="tool-grid">
              {result.items.map((t, i) => (
                <ToolCard key={t.slug} tool={t} index={i} />
              ))}
            </div>
            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              basePath="/ai-tools"
              searchParams={paramObj}
            />
          </>
        )}
      </div>
    </main>
  );
}
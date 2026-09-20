import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { queryTools, getCategoriesWithCounts } from "@/lib/db/queries";
import { ToolCard } from "@/components/tool-card";
import { Pagination } from "@/components/pagination";
import { SortSelect } from "@/components/sort-select";
import { SORT_OPTIONS } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const cats = await getCategoriesWithCounts().catch(() => []);
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) return {};
  const pretty = cat.name;
  return {
    title: `Best AI ${pretty} Tools in 2026`,
    description:
      cat.description ||
      `Discover the best AI ${pretty} tools. Compare features, pricing and ratings to find the right tool for you.`,
    alternates: { canonical: `/categories/${cat.slug}` },
    openGraph: {
      title: `Best AI ${pretty} Tools in 2026`,
      description: cat.description ?? `Discover the best AI ${pretty} tools on ToolTopia.`,
      url: `/categories/${cat.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const get = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const q = get("q") ?? "";
  const pricing = get("pricing") ?? "";
  const sortRaw = get("sort") ?? "rating";
  const sort = SORT_OPTIONS.some((s) => s.value === sortRaw) ? sortRaw : "rating";
  const page = Math.max(1, parseInt(get("page") ?? "1", 10) || 1);

  let categories: Awaited<ReturnType<typeof getCategoriesWithCounts>> = [];
  let result: Awaited<ReturnType<typeof queryTools>> | null = null;
  let error = false;
  try {
    [categories, result] = await Promise.all([
      getCategoriesWithCounts(),
      queryTools({ categorySlug: slug, q, pricing, sort, page, pageSize: 24 }),
    ]);
  } catch (err) {
    console.error("Category page DB error:", err);
    error = true;
  }

  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const relatedCats = categories.filter((c) => c.slug !== slug).slice(0, 6);

  const paramObj: Record<string, string | undefined> = {};
  if (q) paramObj.q = q;
  if (pricing) paramObj.pricing = pricing;
  paramObj.sort = sort;

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-head">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/categories">Categories</Link>
            <span className="sep">/</span>
            <span>{cat.name}</span>
          </nav>
          <h1>
            Best AI {cat.name} <span className="gradient-text">Tools</span>
          </h1>
          {cat.description && <p className="page-lead">{cat.description}</p>}
        </div>

        <div className="filter-bar">
          <div className="chip-row">
            <Link
              href={`/categories/${cat.slug}`}
              className={`chip price-chip${!pricing ? " active" : ""}`}
            >
              Any price
            </Link>
            {["Free", "Freemium", "Paid", "Free Trial"].map((p) => (
              <Link
                key={p}
                href={`/categories/${cat.slug}?${new URLSearchParams(
                  pricing === p ? {} : { pricing: p },
                )}`}
                className={`chip price-chip${pricing === p ? " active" : ""}`}
              >
                {p}
              </Link>
            ))}
          </div>
          <SortSelect
            basePath={`/categories/${cat.slug}`}
            q={q || undefined}
            pricing={pricing || undefined}
            defaultValue={sort}
          />
        </div>

        {error ? (
          <div className="empty-state">
            <div className="empty-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>We couldn&apos;t load {cat.name} tools right now. Please try again.</p>
          </div>
        ) : !result || result.items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>No AI tools found for this search</h3>
            <p>Try a different filter or explore another category.</p>
            <div className="chip-row">
              <Link href={`/categories/${cat.slug}`} className="chip">
                All {cat.name} tools
              </Link>
              <Link href="/ai-tools" className="chip">
                Full directory
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="result-count" style={{ color: "var(--muted)", fontSize: "0.88rem", marginBottom: "16px" }}>
              Showing {result.items.length} of {result.total} {cat.name} tools
            </p>
            <div className="tool-grid">
              {result.items.map((t, i) => (
                <ToolCard key={t.slug} tool={t} index={i} />
              ))}
            </div>
            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              basePath={`/categories/${cat.slug}`}
              searchParams={paramObj}
            />
          </>
        )}

        {relatedCats.length > 0 && (
          <section className="section section-alt" style={{ marginTop: "40px" }}>
            <div className="section-head">
              <div>
                <h2>
                  Explore Other <span className="gradient-text">Categories</span>
                </h2>
              </div>
            </div>
            <div className="category-grid">
              {relatedCats.map((c) => (
                <Link key={c.slug} href={`/categories/${c.slug}`} className="category-card">
                  <span className="category-icon">{c.icon}</span>
                  <span className="category-name">{c.name}</span>
                  <span className="category-count">
                    {c.tool_count ?? 0} {Number(c.tool_count) === 1 ? "tool" : "tools"}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
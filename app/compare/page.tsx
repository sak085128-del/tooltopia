import type { Metadata } from "next";
import Link from "next/link";
import { getComparisons } from "@/lib/db/queries";
import { ToolLogo } from "@/components/tool-logo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Compare AI Tools",
  description:
    "Side-by-side AI tool comparisons. Compare the best AI tools by features, pricing and ratings to pick the right one.",
  alternates: { canonical: "/compare" },
};

export default async function CompareIndexPage() {
  let comparisons: Awaited<ReturnType<typeof getComparisons>> = [];
  try {
    comparisons = await getComparisons();
  } catch (err) {
    console.error("Compare index DB error:", err);
  }

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-head">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>Compare</span>
          </nav>
          <h1>
            Compare <span className="gradient-text">AI Tools</span>
          </h1>
          <p className="page-lead">
            Side-by-side guides to help you choose the right tool.
          </p>
        </div>

        {comparisons.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">⚖️</div>
            <h3>No comparisons yet</h3>
            <p>We&apos;re working on more comparison guides.</p>
          </div>
        ) : (
          <div
            className="compare-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "18px",
            }}
          >
            {comparisons.map((c) => (
              <Link key={c.slug} href={`/compare/${c.slug}`} className="compare-card">
                <div className="cmp-title">{c.title}</div>
                {c.description && <div className="cmp-desc">{c.description}</div>}
                <div className="cmp-pair">
                  {c.toolA && (
                    <span className="cmp-tool">
                      <ToolLogo name={c.toolA.name} logoUrl={c.toolA.logo_url} categorySlug={""} />
                      {c.toolA.name}
                    </span>
                  )}
                  <span className="vs">VS</span>
                  {c.toolB && (
                    <span className="cmp-tool">
                      <ToolLogo name={c.toolB.name} logoUrl={c.toolB.logo_url} categorySlug={""} />
                      {c.toolB.name}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
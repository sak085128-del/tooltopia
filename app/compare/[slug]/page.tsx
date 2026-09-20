import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getComparisonBySlug } from "@/lib/db/queries";
import { ToolLogo } from "@/components/tool-logo";
import { ratingStars } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const c = await getComparisonBySlug(slug).catch(() => null);
  if (!c) return {};
  return {
    title: c.title,
    description:
      c.description ?? `${c.title}: a side-by-side comparison on ToolTopia.`,
    alternates: { canonical: `/compare/${c.slug}` },
  };
}

export default async function CompareDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  let c;
  try {
    c = await getComparisonBySlug(slug);
  } catch (err) {
    console.error("Compare detail DB error:", err);
  }
  if (!c) notFound();

  const a = c.toolA;
  const b = c.toolB;

  const rows: Array<{ label: string; a?: string | number | null; b?: string | number | null }> =
    [];
  if (a && b) {
    rows.push(
      { label: "Category", a: a.category.name, b: b.category.name },
      { label: "Pricing", a: a.pricing_type, b: b.pricing_type },
      { label: "Rating", a: `${Number(a.rating).toFixed(1)} (${a.review_count})`, b: `${Number(b.rating).toFixed(1)} (${b.review_count})` },
      { label: "Views", a: a.view_count.toLocaleString(), b: b.view_count.toLocaleString() },
      { label: "Favorites", a: a.favorite_count.toLocaleString(), b: b.favorite_count.toLocaleString() },
    );
  }

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-head">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/compare">Compare</Link>
            <span className="sep">/</span>
            <span>{c.title}</span>
          </nav>
          <h1>{c.title}</h1>
          {c.description && <p className="page-lead">{c.description}</p>}
        </div>

        {a && b ? (
          <div className="tool-detail-grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: "24px" }}>
            {[a, b].map((t) => (
              <div key={t.slug} className="side-card">
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <ToolLogo name={t.name} logoUrl={t.logo_url} categorySlug={t.category.slug} large />
                  <div>
                    <Link href={`/ai-tools/${t.slug}`} style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                      {t.name}
                    </Link>
                    <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{t.category.name}</div>
                  </div>
                </div>
                <div className="rating-line" style={{ marginTop: 0 }}>
                  <span className="stars">{ratingStars(t.rating)}</span>
                  <strong>{Number(t.rating).toFixed(1)}</strong>
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.9rem", margin: "10px 0" }}>
                  {t.short_description}
                </p>
                <a href={t.website_url} target="_blank" rel="noopener noreferrer nofollow" className="btn btn-primary">
                  Visit {t.name} ↗
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">⚠️</div>
            <h3>Comparison unavailable</h3>
            <p>The tools in this comparison are temporarily unavailable.</p>
          </div>
        )}

        {a && b && (
          <div className="admin-table-wrap" style={{ marginTop: "20px" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>{a.name}</th>
                  <th>{b.name}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label}>
                    <td style={{ fontWeight: 700 }}>{r.label}</td>
                    <td>{r.a ?? "—"}</td>
                    <td>{r.b ?? "—"}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ fontWeight: 700 }}>Key Features</td>
                  <td>{a.features.slice(0, 5).join(", ") || "—"}</td>
                  <td>{b.features.slice(0, 5).join(", ") || "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
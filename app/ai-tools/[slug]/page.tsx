import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getToolWithDetails,
  getRelatedTools,
  getApprovedReviewsForTool,
} from "@/lib/db/queries";
import { ToolLogo } from "@/components/tool-logo";
import { ToolCard } from "@/components/tool-card";
import { FavoriteButton } from "@/components/favorite-button";
import { ReviewSection } from "@/components/review-section";
import { TrackView } from "@/components/track-view";
import { priceClass, ratingStars } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolWithDetails(slug).catch(() => null);
  if (!tool) return {};
  return {
    title: `${tool.name} — Features, Pricing & Alternatives`,
    description:
      tool.short_description ||
      `Explore ${tool.name}: features, pricing (${tool.pricing_type}), ratings, reviews and the best ${tool.category.name} AI alternatives on ToolTopia.`,
    alternates: { canonical: `/ai-tools/${tool.slug}` },
    openGraph: {
      title: `${tool.name} — Features, Pricing & Alternatives`,
      description: tool.short_description,
      url: `/ai-tools/${tool.slug}`,
      type: "website",
      images: tool.logo_url ? [{ url: tool.logo_url }] : undefined,
    },
    twitter: {
      card: "summary",
      title: `${tool.name} — Features, Pricing & Alternatives`,
      description: tool.short_description,
    },
  };
}

export default async function ToolPage({ params }: { params: Params }) {
  const { slug } = await params;
  let tool;
  try {
    tool = await getToolWithDetails(slug);
  } catch (err) {
    console.error("Tool detail DB error:", err);
  }
  if (!tool) notFound();

  const [related, reviews] = await Promise.all([
    getRelatedTools(tool).catch(() => []),
    getApprovedReviewsForTool(tool.id).catch(() => []),
  ]);

  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://tooltopia.vercel.app";
  const toolUrl = `${baseUrl}/ai-tools/${tool.slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description: tool.short_description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating:
      tool.review_count > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: tool.rating,
            reviewCount: tool.review_count,
          }
        : undefined,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: `${baseUrl}/ai-tools` },
      { "@type": "ListItem", position: 3, name: tool.category.name, item: `${baseUrl}/categories/${tool.category.slug}` },
      { "@type": "ListItem", position: 4, name: tool.name, item: toolUrl },
    ],
  };

  return (
    <main className="page-main">
      <div className="container">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([ld, breadcrumbLd].filter(Boolean)) }}
        />
        <TrackView slug={tool.slug} />
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="sep">/</span>
          <Link href="/ai-tools">AI Tools</Link>
          <span className="sep">/</span>
          <Link href={`/categories/${tool.category.slug}`}>{tool.category.name}</Link>
          <span className="sep">/</span>
          <span>{tool.name}</span>
        </nav>

        <div className="tool-detail-head">
          <div className="tool-detail-logo">
            <ToolLogo
              name={tool.name}
              logoUrl={tool.logo_url}
              icon={tool.category.icon}
              categorySlug={tool.category.slug}
              large
            />
          </div>

          <div className="tool-detail-title">
            <h1>{tool.name}</h1>
            <div className="tool-detail-meta">
              <Link href={`/categories/${tool.category.slug}`} className="badge badge-cat">
                {tool.category.name}
              </Link>
              <span className={`badge badge-price ${priceClass(tool.pricing_type)}`}>
                {tool.pricing_type}
              </span>
              {tool.is_featured && <span className="badge badge-featured">Featured</span>}
              {tool.is_popular && <span className="badge badge-pop">Popular</span>}
              {tool.is_new && <span className="badge badge-new">New</span>}
            </div>
            <div className="rating-line">
              <span className="stars">{ratingStars(tool.rating)}</span>
              <strong>{Number(tool.rating).toFixed(1)}</strong>
              <span>· {tool.review_count.toLocaleString()} ratings</span>
            </div>
          </div>

          <div className="tool-detail-actions">
            <a
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn btn-primary visit-btn"
            >
              Visit Website ↗
            </a>
            <FavoriteButton slug={tool.slug} name={tool.name} />
          </div>
        </div>

        <div className="tool-detail-grid">
          <div className="tool-detail-body">
            <div className="detail-block">
              <h2>About {tool.name}</h2>
              <p>{tool.description || tool.short_description}</p>
            </div>

            {tool.features.length > 0 && (
              <div className="detail-block">
                <h2>Key Features</h2>
                <ul className="feature-list">
                  {tool.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {tool.tags.length > 0 && (
              <div className="detail-block">
                <h2>Tags</h2>
                <div className="tag-list">
                  {tool.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/ai-tools?q=${encodeURIComponent(tag)}`}
                      className="tag-pill"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="tool-detail-side">
            <div className="side-card">
              <h3>Quick Facts</h3>
              <div className="stat-row">
                <span className="label">Category</span>
                <span className="value">
                  <Link href={`/categories/${tool.category.slug}`}>{tool.category.name}</Link>
                </span>
              </div>
              <div className="stat-row">
                <span className="label">Pricing</span>
                <span className="value">{tool.pricing_type}</span>
              </div>
              {tool.pricing_details && (
                <div className="stat-row">
                  <span className="label">Plan</span>
                  <span className="value">{tool.pricing_details}</span>
                </div>
              )}
              <div className="stat-row">
                <span className="label">Views</span>
                <span className="value">{tool.view_count.toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span className="label">Favorites</span>
                <span className="value">{tool.favorite_count.toLocaleString()}</span>
              </div>
              <div className="stat-row">
                <span className="label">Added</span>
                <span className="value">
                  {new Date(tool.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            </div>

            <a
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn btn-primary"
            >
              Visit {tool.name} ↗
            </a>
          </div>
        </div>

        <div className="review-form-card" style={{ marginTop: "24px" }}>
          <ReviewSection toolId={tool.id} initialReviews={reviews} />
        </div>

        {related.length > 0 && (
          <section className="section" style={{ paddingTop: "40px" }}>
            <div className="container" style={{ padding: 0 }}>
              <div className="section-head">
                <div>
                  <h2>
                    Similar <span className="gradient-text">AI Tools</span>
                  </h2>
                  <p>More {tool.category.name} tools worth exploring.</p>
                </div>
                <Link href={`/categories/${tool.category.slug}`} className="btn btn-ghost link-btn">
                  View all {tool.category.name} tools
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                  </svg>
                </Link>
              </div>
              <div className="related-grid">
                {related.map((t, i) => (
                  <ToolCard key={t.slug} tool={t} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
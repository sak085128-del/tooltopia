import Link from "next/link";
import { getHomepageData } from "@/lib/db/queries";
import { HeroSearch } from "@/components/hero-search";
import { ToolCard } from "@/components/tool-card";
import { ToolLogo } from "@/components/tool-logo";
import { formatCount } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let data;
  try {
    data = await getHomepageData();
  } catch (err) {
    console.error("Homepage DB error:", err);
    data = null;
  }

  return (
    <main id="main">
      {/* ============ HERO ============ */}
      <section className="hero" id="home">
        <div className="hero-bg" aria-hidden="true">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
          <div className="grid-overlay"></div>
        </div>

        <div className="container hero-inner">
          <p className="hero-eyebrow">
            <span className="pulse-dot"></span>
            Free AI tools directory · Updated daily
          </p>
          <h1 className="hero-title">
            Discover the Best <span className="gradient-text">AI Tools</span> in One Place.
          </h1>
          <p className="hero-subtitle">
            Find powerful AI tools for writing, images, video, coding, productivity, and more.
          </p>

          <HeroSearch />

          <div className="hero-stats" aria-hidden="true">
            <div className="stat">
              <strong>{data ? formatCount(data.stats.totalTools) : "—"}</strong>
              <span>AI tools</span>
            </div>
            <div className="stat">
              <strong>{data ? data.stats.totalCategories : "—"}</strong>
              <span>Categories</span>
            </div>
            <div className="stat">
              <strong>{data ? formatCount(data.stats.totalRatings) : "—"}</strong>
              <span>Community ratings</span>
            </div>
            <div className="stat">
              <strong>100%</strong>
              <span>Free forever</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ AD: BELOW HERO ============ */}
      <div className="container ad-slot-wrap">
        <div className="ad-container ad-banner" role="complementary" aria-label="Advertisement" data-ad-slot-key="hero">
          <span>ADVERTISEMENT</span>
          <div className="ad-placeholder">Advertisement Space</div>
        </div>
      </div>

      {data && data.popular.length > 0 && (
        <section className="section" id="popular">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>
                  Popular <span className="gradient-text">AI Tools</span>
                </h2>
                <p>Explore tools people are discovering and using.</p>
              </div>
              <Link href="/popular" className="btn btn-ghost link-btn">
                View all
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="tool-grid">
              {data.popular.map((t, i) => (
                <ToolCard key={t.slug} tool={t} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ FEATURE STRIP ============ */}
      <section className="feature-strip" aria-label="Why use ToolTopia">
        <div className="container feature-strip-inner">
          <div className="feature-item">
            <span className="feature-icon">🔍</span>
            <div>
              <h3>Smart Search</h3>
              <p>Find any AI tool in seconds.</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏆</span>
            <div>
              <h3>Honest Rankings</h3>
              <p>Ranked by popularity &amp; quality.</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🆓</span>
            <div>
              <h3>100% Free</h3>
              <p>No paywalls. No premium tiers.</p>
            </div>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚖️</span>
            <div>
              <h3>Compare Tools</h3>
              <p>Side-by-side to pick the best.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      {data && data.categories.length > 0 && (
        <section className="section" id="categories">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>
                  Browse by <span className="gradient-text">Category</span>
                </h2>
                <p>Find the perfect tool by what you want to create.</p>
              </div>
              <Link href="/categories" className="btn btn-ghost link-btn">
                All categories
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="category-grid">
              {data.categories
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
          </div>
        </section>
      )}

      {/* ============ FEATURED ============ */}
      {data && data.featured.length > 0 && (
        <section className="section section-alt" id="featured">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>
                  Featured <span className="gradient-text">AI Tools</span>
                </h2>
                <p>Hand-picked tools worth trying this week.</p>
              </div>
              <Link href="/featured" className="btn btn-ghost link-btn">
                View all featured
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="tool-grid">
              {data.featured.map((t, i) => (
                <ToolCard key={t.slug} tool={t} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ NEW AI TOOLS ============ */}
      {data && data.newest.length > 0 && (
        <section className="section" id="new-tools">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>
                  New <span className="gradient-text">AI Tools</span>
                </h2>
                <p>Recently added tools, just discovered.</p>
              </div>
              <Link href="/new-tools" className="btn btn-ghost link-btn">
                View all new
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="tool-grid">
              {data.newest.map((t, i) => (
                <ToolCard key={t.slug} tool={t} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ FREE AI TOOLS ============ */}
      {data && data.free.length > 0 && (
        <section className="section section-alt" id="free-tools">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>
                  Free <span className="gradient-text">AI Tools</span>
                </h2>
                <p>Great tools you can start using for free today.</p>
              </div>
              <Link href="/ai-tools?pricing=Free" className="btn btn-ghost link-btn">
                View free tools
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="tool-grid">
              {data.free.map((t, i) => (
                <ToolCard key={t.slug} tool={t} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ COMPARISONS ============ */}
      {data && data.comparisons.length > 0 && (
        <section className="section" id="comparisons">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>
                  Tool <span className="gradient-text">Comparisons</span>
                </h2>
                <p>Side-by-side guides to help you choose.</p>
              </div>
            </div>
            <div className="compare-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>
              {data.comparisons.map((c) => (
                <Link key={c.slug} href={`/compare/${c.slug}`} className="compare-card">
                  <div className="cmp-title">{c.title}</div>
                  {c.description && <div className="cmp-desc">{c.description}</div>}
                  <div className="cmp-pair">
                    <span className="cmp-tool">
                      <ToolLogo
                        name={c.toolA.name}
                        logoUrl={c.toolA.logo_url}
                        categorySlug={""}
                        large={false}
                      />
                      {c.toolA.name}
                    </span>
                    <span className="vs">VS</span>
                    <span className="cmp-tool">
                      <ToolLogo
                        name={c.toolB.name}
                        logoUrl={c.toolB.logo_url}
                        categorySlug={""}
                        large={false}
                      />
                      {c.toolB.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ NEWSLETTER ============ */}
      <section className="newsletter" id="newsletter" aria-label="Newsletter">
        <div className="container newsletter-inner">
          <div className="newsletter-glow" aria-hidden="true"></div>
          <h2>
            Stay Ahead of <span className="gradient-text">AI.</span>
          </h2>
          <p>Get new AI tools and useful discoveries delivered to your inbox.</p>
          <p className="newsletter-note">
            ToolTopia is 100% free. New tools added regularly.
          </p>
        </div>
      </section>
    </main>
  );
}
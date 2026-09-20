import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advertising Disclosure",
  description: "How ToolTopia makes money and stays free.",
  robots: { index: false, follow: false },
};

export default function AdDisclosurePage() {
  return (
    <main className="page-main">
      <div className="container">
        <div className="auth-wrap" style={{ maxWidth: "720px" }}>
          <div className="auth-card">
            <h1>Advertising Disclosure</h1>
            <p className="sub">Last updated: September 2026</p>
            <div style={{ fontSize: "0.92rem", lineHeight: "1.75", color: "var(--muted)" }}>
              <p>
                ToolTopia is 100% free for users. To keep it that way, we use two revenue sources:
              </p>
              <h3 style={{ margin: "20px 0 8px", color: "var(--text)" }}>Advertising</h3>
              <p>
                We display advertisements (such as Google AdSense) in dedicated ad placements across
                the site. Ad selection is handled by ad networks and may be based on your browsing
                activity.
              </p>
              <h3 style={{ margin: "20px 0 8px", color: "var(--text)" }}>Affiliate links</h3>
              <p>
                Some &quot;Visit Website&quot; links are affiliate links. If you click through and
                make a purchase, we may earn a small commission at no extra cost to you.
              </p>
              <h3 style={{ margin: "20px 0 8px", color: "var(--text)" }}>Editorial independence</h3>
              <p>
                Advertising and affiliate relationships never influence how we rank, list, or review
                tools. Rankings are based on community ratings and popularity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
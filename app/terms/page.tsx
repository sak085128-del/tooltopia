import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of ToolTopia.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <main className="page-main">
      <div className="container">
        <div className="auth-wrap" style={{ maxWidth: "720px" }}>
          <div className="auth-card">
            <h1>Terms of Service</h1>
            <p className="sub">Last updated: September 2026</p>
            <div style={{ fontSize: "0.92rem", lineHeight: "1.75", color: "var(--muted)" }}>
              <p>By using ToolTopia you agree to these terms.</p>
              <h3 style={{ margin: "20px 0 8px", color: "var(--text)" }}>The directory</h3>
              <p>
                ToolTopia lists third-party AI tools. We do not operate, control, or endorse the
                tools listed. You use them at your own risk and subject to their own terms.
              </p>
              <h3 style={{ margin: "20px 0 8px", color: "var(--text)" }}>User content</h3>
              <p>
                Reviews and tool submissions must be honest and not contain harmful, infringing, or
                misleading content. We may moderate or remove content at our discretion.
              </p>
              <h3 style={{ margin: "20px 0 8px", color: "var(--text)" }}>Affiliate disclosure</h3>
              <p>
                We may earn commissions from some links. This does not affect our rankings or
                reviews.
              </p>
              <h3 style={{ margin: "20px 0 8px", color: "var(--text)" }}>Liability</h3>
              <p>
                ToolTopia is provided &quot;as is&quot; without warranties of any kind. To the maximum
                extent permitted by law, we are not liable for any damages arising from your use of
                the site or the tools listed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ToolTopia collects, uses, and protects your information.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="page-main">
      <div className="container">
        <div className="auth-wrap" style={{ maxWidth: "720px" }}>
          <div className="auth-card">
            <h1>Privacy Policy</h1>
            <p className="sub">Last updated: September 2026</p>
            <div style={{ fontSize: "0.92rem", lineHeight: "1.75", color: "var(--muted)" }}>
              <p>ToolTopia is a free AI tools directory. This policy explains what we collect and why.</p>
              <h3 style={{ margin: "20px 0 8px", color: "var(--text)" }}>Information we collect</h3>
              <p>
                If you create an account, we store your email address, name, and a password hash.
                If you submit a tool or review, we store that content along with your account ID.
                Anonymous visitors&apos; favorites and recently-viewed items are stored only in their
                browser&apos;s local storage.
              </p>
              <h3 style={{ margin: "20px 0 8px", color: "var(--text)" }}>Advertising</h3>
              <p>
                We display advertisements (for example, Google AdSense) and may earn commission from
                affiliate links. Ad networks may use cookies to serve relevant ads. You can manage
                ad personalization in your Google Ads settings.
              </p>
              <h3 style={{ margin: "20px 0 8px", color: "var(--text)" }}>Your rights</h3>
              <p>
                You can request deletion of your account and data by contacting us. We never sell
                your personal information.
              </p>
              <h3 style={{ margin: "20px 0 8px", color: "var(--text)" }}>Contact</h3>
              <p>Questions about this policy can be sent to privacy@tooltopia.vercel.app.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
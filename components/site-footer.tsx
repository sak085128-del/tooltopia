import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="ToolTopia home">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="24" height="24">
                  <defs>
                    <linearGradient id="brand-grad-footer" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#7C5CFF" />
                      <stop offset="1" stopColor="#00D4FF" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#brand-grad-footer)" d="M16 2l3.4 6.9 7.6 1.1-5.5 5.4 1.3 7.6L16 19.3 9.2 22l1.3-7.6L5 10l7.6-1.1z" opacity="0.95" />
                  <circle cx="25" cy="7" r="2.4" fill="#00D4FF" />
                </svg>
              </span>
              <span className="brand-name">
                Tool<span>Topia</span>
              </span>
            </Link>
            <p>Discover the best AI tools in one place.</p>
          </div>

          <nav className="footer-col" aria-label="Explore">
            <h3>Explore</h3>
            <Link href="/ai-tools">AI Tools</Link>
            <Link href="/popular">Popular</Link>
            <Link href="/new-tools">New Tools</Link>
            <Link href="/categories">Categories</Link>
            <Link href="/featured">Featured</Link>
          </nav>

          <nav className="footer-col" aria-label="Community">
            <h3>Community</h3>
            <Link href="/compare">Compare Tools</Link>
            <Link href="/submit">Submit a Tool</Link>
            <Link href="/favorites">Favorites</Link>
            <Link href="/login">Sign In</Link>
          </nav>

          <nav className="footer-col" aria-label="Legal">
            <h3>Legal</h3>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/ad-disclosure">Advertising Disclosure</Link>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ToolTopia. All rights reserved.</p>
          <p className="footer-disclosure">
            ToolTopia is 100% free. We may earn commission from some links and display
            advertisements to support the platform.
          </p>
        </div>
      </div>
    </footer>
  );
}
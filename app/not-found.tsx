import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-main">
      <div className="container">
        <div className="empty-state">
          <div className="empty-icon">🧭</div>
          <h3>Page not found</h3>
          <p>We couldn&apos;t find that page. It may have moved or never existed.</p>
          <div className="chip-row">
            <Link href="/" className="btn btn-primary">
              Back to home
            </Link>
            <Link href="/ai-tools" className="btn btn-ghost">
              Browse AI tools
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
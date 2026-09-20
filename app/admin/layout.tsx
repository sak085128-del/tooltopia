import Link from "next/link";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/tools", label: "Tools" },
  { href: "/admin/submissions", label: "Submissions" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/reviews", label: "Reviews" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return (
      <main className="page-main">
        <div className="container">
          <div className="auth-wrap">
            <div className="auth-card">
              <h1>Admins only</h1>
              <p className="sub">You need an admin account to access this area.</p>
              <Link href="/login" className="btn btn-primary btn-block">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-side">
        <h4>Manage</h4>
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={l.exact ? "active" : ""}>
            {l.label}
          </Link>
        ))}
        <h4 style={{ marginTop: "20px" }}>Site</h4>
        <Link href="/">← Back to site</Link>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
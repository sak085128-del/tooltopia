import Link from "next/link";
import { getAdminStats } from "@/lib/db/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let stats: Awaited<ReturnType<typeof getAdminStats>> | null = null;
  let error = false;
  try {
    stats = await getAdminStats();
  } catch (err) {
    console.error("Admin dashboard DB error:", err);
    error = true;
  }

  if (error || !stats) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⚠️</div>
        <h3>Could not load stats</h3>
        <p>Please check the database connection and try again.</p>
      </div>
    );
  }

  const cards = [
    { num: stats.totalTools, lbl: "Total tools", href: "/admin/tools" },
    { num: stats.pendingSubmissions, lbl: "Pending submissions", href: "/admin/submissions" },
    { num: stats.pendingReviews, lbl: "Pending reviews", href: "/admin/reviews" },
    { num: stats.totalCategories, lbl: "Categories", href: "/admin/categories" },
    { num: stats.totalUsers, lbl: "Users", href: "#" },
    { num: stats.totalComparisons, lbl: "Comparisons", href: "#" },
  ];

  return (
    <>
      <h1>Dashboard</h1>
      <div className="admin-stats">
        {cards.map((c) => (
          <Link key={c.lbl} href={c.href} className="admin-stat">
            <div className="num">{c.num}</div>
            <div className="lbl">{c.lbl}</div>
          </Link>
        ))}
      </div>

      <div className="admin-stats" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <div className="admin-stat" style={{ borderLeft: "4px solid var(--warning)" }}>
          <div className="num">{stats.pendingTools}</div>
          <div className="lbl">Tools awaiting approval</div>
        </div>
        <div className="admin-stat" style={{ borderLeft: "4px solid var(--accent)" }}>
          <div className="num">{stats.totalReviews}</div>
          <div className="lbl">Total reviews</div>
        </div>
        <div className="admin-stat" style={{ borderLeft: "4px solid var(--success)" }}>
          <div className="num">{stats.totalSubmissions}</div>
          <div className="lbl">Total submissions</div>
        </div>
      </div>
    </>
  );
}
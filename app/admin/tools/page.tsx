import Link from "next/link";
import { getAdminTools } from "@/lib/db/admin";
import { AdminToolActions } from "@/components/admin-tool-actions";

export const dynamic = "force-dynamic";

export default async function AdminToolsPage() {
  let tools: Awaited<ReturnType<typeof getAdminTools>> = [];
  let error = false;
  try {
    tools = await getAdminTools();
  } catch (err) {
    console.error("Admin tools DB error:", err);
    error = true;
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Tools</h1>
        <Link href="/admin/tools/new" className="btn btn-primary btn-sm">
          + Add tool
        </Link>
      </div>

      {error ? (
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>Could not load tools</h3>
        </div>
      ) : tools.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🗂️</div>
          <h3>No tools yet</h3>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Pricing</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Views</th>
                <th>Flags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.id}>
                  <td>
                    <Link href={`/ai-tools/${t.slug}`} style={{ fontWeight: 700 }}>
                      {t.name}
                    </Link>
                  </td>
                  <td>{t.category}</td>
                  <td>{t.pricing_type}</td>
                  <td>
                    <span className={`admin-badge ${t.status}`}>{t.status}</span>
                  </td>
                  <td>{Number(t.rating).toFixed(1)}</td>
                  <td>{t.view_count.toLocaleString()}</td>
                  <td style={{ fontSize: "0.85rem" }}>
                    {t.is_featured && <span>⭐ </span>}
                    {t.is_popular && <span>🔥 </span>}
                  </td>
                  <td>
                    <AdminToolActions
                      toolId={t.id}
                      slug={t.slug}
                      isFeatured={t.is_featured}
                      isPopular={t.is_popular}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
import Link from "next/link";
import { getAdminReviews } from "@/lib/db/admin";
import { AdminReviewActions } from "@/components/admin-review-actions";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  let reviews: Awaited<ReturnType<typeof getAdminReviews>> = [];
  let error = false;
  try {
    reviews = await getAdminReviews();
  } catch (err) {
    console.error("Admin reviews DB error:", err);
    error = true;
  }

  return (
    <>
      <h1>Reviews</h1>
      {error ? (
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>Could not load reviews</h3>
        </div>
      ) : reviews.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>No reviews yet</h3>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tool</th>
                <th>User</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td>
                    <Link href={`/ai-tools/${r.toolSlug}`} style={{ fontWeight: 700 }}>
                      {r.toolName}
                    </Link>
                  </td>
                  <td>{r.userName ?? r.userEmail ?? "—"}</td>
                  <td>{r.rating}/5</td>
                  <td style={{ maxWidth: "260px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {r.title || r.content || "—"}
                  </td>
                  <td>
                    <span className={`admin-badge ${r.status}`}>{r.status}</span>
                  </td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td>
                    <AdminReviewActions id={r.id} status={r.status} />
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
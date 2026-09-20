import { getAdminSubmissions } from "@/lib/db/admin";
import { AdminSubmissionActions } from "@/components/admin-submission-actions";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  let submissions: Awaited<ReturnType<typeof getAdminSubmissions>> = [];
  let error = false;
  try {
    submissions = await getAdminSubmissions();
  } catch (err) {
    console.error("Admin submissions DB error:", err);
    error = true;
  }

  return (
    <>
      <h1>Tool submissions</h1>
      {error ? (
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>Could not load submissions</h3>
        </div>
      ) : submissions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📥</div>
          <h3>No submissions yet</h3>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Website</th>
                <th>Category</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 700 }}>{s.name}</td>
                  <td>
                    <a href={s.website_url} target="_blank" rel="noopener noreferrer nofollow">
                      {s.website_url.replace(/^https?:\/\//, "").slice(0, 40)}
                    </a>
                  </td>
                  <td>{s.category ?? "—"}</td>
                  <td>
                    <span className={`admin-badge ${s.status}`}>{s.status}</span>
                  </td>
                  <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td>
                    <AdminSubmissionActions id={s.id} status={s.status} />
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
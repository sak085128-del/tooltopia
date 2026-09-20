import Link from "next/link";
import { getAdminCategories } from "@/lib/db/admin";
import { AddCategoryForm } from "@/components/add-category-form";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  let categories: Awaited<ReturnType<typeof getAdminCategories>> = [];
  let error = false;
  try {
    categories = await getAdminCategories();
  } catch (err) {
    console.error("Admin categories DB error:", err);
    error = true;
  }

  return (
    <>
      <h1>Categories</h1>
      <AddCategoryForm />
      {error ? (
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>Could not load categories</h3>
        </div>
      ) : categories.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🗂️</div>
          <h3>No categories yet</h3>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Tools</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontSize: "1.2rem" }}>{c.icon}</td>
                  <td style={{ fontWeight: 700 }}>{c.name}</td>
                  <td>{c.slug}</td>
                  <td>{c.tool_count ?? 0}</td>
                  <td>
                    <Link href={`/categories/${c.slug}`}>View →</Link>
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
import Link from "next/link";
import { getCategoriesWithCounts } from "@/lib/db/queries";
import { getAdminToolEditData } from "@/lib/db/admin";
import { AdminToolForm } from "@/components/admin-tool-form";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export default async function EditToolPage({ params }: { params: Params }) {
  const { id } = await params;
  const toolId = Number(id);
  let tool: Awaited<ReturnType<typeof getAdminToolEditData>> = null;
  let categories: Awaited<ReturnType<typeof getCategoriesWithCounts>> = [];
  try {
    [tool, categories] = await Promise.all([
      Number.isInteger(toolId) ? getAdminToolEditData(toolId) : Promise.resolve(null),
      getCategoriesWithCounts(),
    ]);
  } catch (err) {
    console.error("Edit tool DB error:", err);
  }

  if (!tool) {
    return (
      <>
        <h1>Edit tool</h1>
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>Tool not found</h3>
          <Link href="/admin/tools" className="btn btn-primary">
            Back to tools
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Edit: {tool.name}</h1>
      <div style={{ maxWidth: "680px" }}>
        <AdminToolForm
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          initial={{
            id: tool.id,
            name: tool.name,
            short_description: tool.short_description,
            description: tool.description ?? "",
            website_url: tool.website_url,
            logo_url: tool.logo_url ?? "",
            category_id: tool.category_id,
            pricing_type: tool.pricing_type,
            pricing_details: tool.pricing_details ?? "",
            is_featured: tool.is_featured,
            is_popular: tool.is_popular,
            is_new: tool.is_new,
            status: tool.status,
            features: tool.features,
            tags: tool.tags,
          }}
        />
      </div>
    </>
  );
}
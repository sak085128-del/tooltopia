import { getCategoriesWithCounts } from "@/lib/db/queries";
import { AdminToolForm } from "@/components/admin-tool-form";

export const dynamic = "force-dynamic";

export default async function NewToolPage() {
  let categories: Awaited<ReturnType<typeof getCategoriesWithCounts>> = [];
  try {
    categories = await getCategoriesWithCounts();
  } catch {
    categories = [];
  }
  return (
    <>
      <h1>Add tool</h1>
      <div style={{ maxWidth: "680px" }}>
        <AdminToolForm
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      </div>
    </>
  );
}
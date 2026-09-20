import type { Metadata } from "next";
import { getCategoriesWithCounts } from "@/lib/db/queries";
import { SubmitForm } from "@/components/submit-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Submit a Tool",
  description:
    "Submit an AI tool to ToolTopia. Get your tool discovered by thousands of users.",
  robots: { index: false, follow: false },
};

export default async function SubmitPage() {
  let categories: Awaited<ReturnType<typeof getCategoriesWithCounts>> = [];
  try {
    categories = await getCategoriesWithCounts();
  } catch {
    categories = [];
  }

  return (
    <main className="page-main">
      <div className="container">
        <div className="page-head">
          <h1>
            Submit a <span className="gradient-text">Tool</span>
          </h1>
          <p className="page-lead">
            Have an AI tool we should list? Submit it below — our team reviews every
            submission before it goes live.
          </p>
        </div>
        <div className="auth-wrap">
          <div className="auth-card">
            <SubmitForm categories={categories.map((c) => ({ id: c.id, name: c.name }))} />
          </div>
        </div>
      </div>
    </main>
  );
}
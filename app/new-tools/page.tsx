import type { Metadata } from "next";
import Link from "next/link";
import { ToolList } from "@/components/tool-list";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New AI Tools",
  description:
    "The latest AI tools added to ToolTopia. Discover new AI products for writing, images, video, coding and more.",
  alternates: { canonical: "/new-tools" },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function NewToolsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const get = (k: string) => {
    const v = sp[k];
    return Array.isArray(v) ? v[0] : v;
  };
  return (
    <main className="page-main">
      <div className="container">
        <div className="page-head">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <span>New Tools</span>
          </nav>
          <h1>
            New <span className="gradient-text">AI Tools</span>
          </h1>
          <p className="page-lead">Freshly added AI tools, just discovered.</p>
        </div>
        <ToolList
          filters={{ newOnly: true }}
          basePath="/new-tools"
          searchParams={{
            q: get("q"),
            pricing: get("pricing"),
            sort: get("sort"),
            page: get("page"),
          }}
        />
      </div>
    </main>
  );
}
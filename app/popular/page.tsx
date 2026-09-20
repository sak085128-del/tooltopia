import type { Metadata } from "next";
import Link from "next/link";
import { ToolList } from "@/components/tool-list";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Popular AI Tools",
  description:
    "The most popular AI tools, ranked by community ratings and reviews. Find the tools everyone is using.",
  alternates: { canonical: "/popular" },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function PopularPage({ searchParams }: { searchParams: SearchParams }) {
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
            <span>Popular</span>
          </nav>
          <h1>
            Popular <span className="gradient-text">AI Tools</span>
          </h1>
          <p className="page-lead">
            The tools people are discovering and using most right now.
          </p>
        </div>
        <ToolList
          filters={{ popularOnly: true }}
          basePath="/popular"
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
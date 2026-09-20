import type { Metadata } from "next";
import Link from "next/link";
import { ToolList } from "@/components/tool-list";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Featured AI Tools",
  description:
    "Hand-picked, featured AI tools worth trying this week. Browse our curated selection of top AI products.",
  alternates: { canonical: "/featured" },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function FeaturedPage({ searchParams }: { searchParams: SearchParams }) {
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
            <span>Featured</span>
          </nav>
          <h1>
            Featured <span className="gradient-text">AI Tools</span>
          </h1>
          <p className="page-lead">Hand-picked tools worth trying this week.</p>
        </div>
        <ToolList
          filters={{ featuredOnly: true }}
          basePath="/featured"
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
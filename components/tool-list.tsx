import { queryTools } from "@/lib/db/queries";
import { ToolCard } from "@/components/tool-card";
import { Pagination } from "@/components/pagination";
import { SORT_OPTIONS } from "@/lib/utils";

type ToolListProps = {
  filters: {
    popularOnly?: boolean;
    newOnly?: boolean;
    featuredOnly?: boolean;
    categorySlug?: string;
  };
  basePath: string;
  searchParams: Record<string, string | undefined>;
  pageSize?: number;
  defaultSort?: string;
};

export async function ToolList({
  filters,
  basePath,
  searchParams,
  pageSize = 24,
  defaultSort = "popular",
}: ToolListProps) {
  const q = searchParams.q ?? "";
  const pricing = searchParams.pricing ?? "";
  const sortRaw = searchParams.sort ?? defaultSort;
  const sort = SORT_OPTIONS.some((s) => s.value === sortRaw) ? sortRaw : defaultSort;
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10) || 1);

  let result: Awaited<ReturnType<typeof queryTools>> | null = null;
  let error = false;
  try {
    result = await queryTools({
      q,
      pricing,
      sort,
      page,
      pageSize,
      ...filters,
    });
  } catch (err) {
    console.error("ToolList DB error:", err);
    error = true;
  }

  const paramObj: Record<string, string | undefined> = {};
  if (q) paramObj.q = q;
  if (pricing) paramObj.pricing = pricing;
  paramObj.sort = sort;

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⚠️</div>
        <h3>Something went wrong</h3>
        <p>We couldn&apos;t load tools right now. Please try again.</p>
      </div>
    );
  }
  if (!result || result.items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🗂️</div>
        <h3>Nothing here yet</h3>
        <p>Check back soon — we&apos;re adding new tools regularly.</p>
      </div>
    );
  }
  return (
    <>
      <p className="result-count" style={{ color: "var(--muted)", fontSize: "0.88rem", marginBottom: "16px" }}>
        {result.total} tools
      </p>
      <div className="tool-grid">
        {result.items.map((t, i) => (
          <ToolCard key={t.slug} tool={t} index={i} />
        ))}
      </div>
      <Pagination
        page={result.page}
        totalPages={result.totalPages}
        basePath={basePath}
        searchParams={paramObj}
      />
    </>
  );
}
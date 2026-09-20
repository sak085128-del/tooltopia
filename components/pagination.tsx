import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  basePath,
  searchParams,
}: {
  page: number;
  totalPages: number;
  basePath: string;
  searchParams: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v && k !== "page") params.set(k, v);
    });
    params.set("page", String(p));
    return `${basePath}?${params.toString()}`;
  };

  const pages: Array<number | "…"> = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) pages.push(i);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      {page > 1 ? (
        <Link href={buildHref(page - 1)} aria-label="Previous page">
          ‹
        </Link>
      ) : (
        <span className="page-disabled">‹</span>
      )}
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e${i}`} className="page-ellipsis">
            …
          </span>
        ) : p === page ? (
          <span key={p} className="page-current" aria-current="page">
            {p}
          </span>
        ) : (
          <Link key={p} href={buildHref(p)}>
            {p}
          </Link>
        ),
      )}
      {page < totalPages ? (
        <Link href={buildHref(page + 1)} aria-label="Next page">
          ›
        </Link>
      ) : (
        <span className="page-disabled">›</span>
      )}
    </nav>
  );
}
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { PRICING_TYPES, SORT_OPTIONS } from "@/lib/utils";

export function DirectoryFilters({
  categories,
  current,
}: {
  categories: { slug: string; name: string; icon: string | null }[];
  current: {
    q?: string;
    category?: string;
    pricing?: string;
    sort?: string;
  };
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const build = useCallback(
    (patch: Record<string, string | undefined>) => {
      const params = new URLSearchParams(sp.toString());
      const merged = { ...current, ...patch };
      if (merged.q) params.set("q", merged.q);
      else params.delete("q");
      if (merged.category) params.set("category", merged.category);
      else params.delete("category");
      if (merged.pricing) params.set("pricing", merged.pricing);
      else params.delete("pricing");
      params.set("sort", merged.sort ?? "popular");
      params.set("page", "1");
      router.push(`/ai-tools?${params.toString()}`);
    },
    [router, sp, current],
  );

  return (
    <div className="filter-bar">
      <div className="search-box">
        <input
          type="search"
          defaultValue={current.q ?? ""}
          placeholder="Search tools by name, description or tag…"
          aria-label="Search AI tools"
          onKeyDown={(e) => {
            if (e.key === "Enter") build({ q: (e.target as HTMLInputElement).value });
          }}
          onBlur={(e) => build({ q: e.target.value || undefined })}
        />
      </div>

      <div className="chip-row">
        <button
          type="button"
          className={`chip${!current.category ? " active" : ""}`}
          onClick={() => build({ category: undefined })}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={`chip${current.category === c.slug ? " active" : ""}`}
            onClick={() => build({ category: c.slug })}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      <div className="chip-row">
        <button
          type="button"
          className={`chip price-chip${!current.pricing ? " active" : ""}`}
          onClick={() => build({ pricing: undefined })}
        >
          Any price
        </button>
        {PRICING_TYPES.map((p) => (
          <button
            key={p}
            type="button"
            className={`chip price-chip${current.pricing === p ? " active" : ""}`}
            onClick={() => build({ pricing: p })}
          >
            {p}
          </button>
        ))}
      </div>

      <select
        aria-label="Sort tools"
        value={current.sort ?? "popular"}
        onChange={(e) => build({ sort: e.target.value })}
      >
        {SORT_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
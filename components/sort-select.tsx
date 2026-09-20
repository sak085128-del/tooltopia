"use client";

import { SORT_OPTIONS } from "@/lib/utils";

export function SortSelect({
  basePath,
  q,
  pricing,
  defaultValue,
}: {
  basePath: string;
  q?: string;
  pricing?: string;
  defaultValue: string;
}) {
  return (
    <select
      aria-label="Sort tools"
      defaultValue={defaultValue}
      onChange={(e) => {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (pricing) params.set("pricing", pricing);
        params.set("sort", e.target.value);
        window.location.href = `${basePath}?${params.toString()}`;
      }}
    >
      {SORT_OPTIONS.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
}
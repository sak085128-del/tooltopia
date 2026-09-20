"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminToolActions({
  toolId,
  slug,
  isFeatured,
  isPopular,
}: {
  toolId: number;
  slug: string;
  isFeatured: boolean;
  isPopular: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const patch = async (field: string, value: unknown) => {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/tools/${toolId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!confirm(`Delete "${slug}" permanently? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await fetch(`/api/admin/tools/${toolId}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="actions">
      <button
        type="button"
        className="btn btn-sm"
        disabled={busy}
        onClick={() => patch("is_featured", !isFeatured)}
        title={isFeatured ? "Unfeature" : "Feature"}
      >
        {isFeatured ? "⭐ ✓" : "⭐"}
      </button>
      <button
        type="button"
        className="btn btn-sm"
        disabled={busy}
        onClick={() => patch("is_popular", !isPopular)}
        title={isPopular ? "Unmark popular" : "Mark popular"}
      >
        {isPopular ? "🔥 ✓" : "🔥"}
      </button>
      <a href={`/admin/tools/${toolId}/edit`} className="btn btn-sm">
        ✏️ Edit
      </a>
      <button
        type="button"
        className="btn btn-sm"
        disabled={busy}
        onClick={remove}
        style={{ color: "var(--danger)" }}
        title="Delete tool"
      >
        🗑️
      </button>
    </div>
  );
}
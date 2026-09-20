"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminReviewActions({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const update = async (next: "approved" | "rejected" | "delete") => {
    if (next === "delete" && !confirm("Delete this review?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: next === "delete" ? "DELETE" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: next === "delete" ? undefined : JSON.stringify({ status: next }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="actions">
      {status === "pending" && (
        <button
          type="button"
          className="btn btn-sm"
          disabled={busy}
          onClick={() => update("approved")}
          style={{ color: "var(--success)" }}
        >
          ✓ Approve
        </button>
      )}
      {status === "pending" && (
        <button
          type="button"
          className="btn btn-sm"
          disabled={busy}
          onClick={() => update("rejected")}
          style={{ color: "var(--danger)" }}
        >
          ✕ Reject
        </button>
      )}
      <button
        type="button"
        className="btn btn-sm"
        disabled={busy}
        onClick={() => update("delete")}
        style={{ color: "var(--danger)" }}
        title="Delete review"
      >
        🗑️
      </button>
    </div>
  );
}
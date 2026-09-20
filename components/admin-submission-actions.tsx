"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminSubmissionActions({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const update = async (next: "approved" | "rejected") => {
    if (next === "rejected" && !confirm("Reject this submission?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  };

  if (status !== "pending") {
    return null;
  }

  return (
    <div className="actions">
      <button
        type="button"
        className="btn btn-sm"
        disabled={busy}
        onClick={() => update("approved")}
        style={{ color: "var(--success)" }}
      >
        ✓ Approve
      </button>
      <button
        type="button"
        className="btn btn-sm"
        disabled={busy}
        onClick={() => update("rejected")}
        style={{ color: "var(--danger)" }}
      >
        ✕ Reject
      </button>
    </div>
  );
}
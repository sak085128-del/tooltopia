"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddCategoryForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("🔧");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2) {
      setError("Enter a category name.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), icon: icon.trim() || "🔧" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Could not create category.");
        return;
      }
      setName("");
      setIcon("🔧");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New category name"
        style={{ padding: "10px 14px", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)", flex: 1, minWidth: "200px" }}
      />
      <input
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        placeholder="Icon"
        maxLength={4}
        style={{ width: "70px", padding: "10px 8px", textAlign: "center", borderRadius: "10px", border: "1px solid var(--border)", background: "var(--card)", color: "var(--text)" }}
      />
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? "Adding…" : "+ Add"}
      </button>
      {error && <span style={{ color: "var(--danger)", fontSize: "0.85rem" }}>{error}</span>}
    </form>
  );
}
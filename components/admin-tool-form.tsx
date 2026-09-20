"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ToolFormData = {
  id?: number;
  name: string;
  short_description: string;
  description: string;
  website_url: string;
  logo_url?: string | null;
  category_id: number;
  pricing_type: string;
  pricing_details: string;
  is_featured: boolean;
  is_popular: boolean;
  is_new: boolean;
  status: string;
  features: string[];
  tags: string[];
};

export function AdminToolForm({
  categories,
  initial,
}: {
  categories: { id: number; name: string }[];
  initial?: Partial<ToolFormData>;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    short_description: initial?.short_description ?? "",
    description: initial?.description ?? "",
    website_url: initial?.website_url ?? "",
    logo_url: initial?.logo_url ?? "",
    category_id: initial?.category_id ?? categories[0]?.id ?? 0,
    pricing_type: initial?.pricing_type ?? "Free",
    pricing_details: initial?.pricing_details ?? "",
    is_featured: initial?.is_featured ?? false,
    is_popular: initial?.is_popular ?? false,
    is_new: initial?.is_new ?? false,
    status: initial?.status ?? "approved",
    features: (initial?.features ?? []).join(", "),
    tags: (initial?.tags ?? []).join(", "),
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const body = {
      name: form.name.trim(),
      short_description: form.short_description.trim(),
      description: form.description.trim(),
      website_url: form.website_url.trim(),
      logo_url: form.logo_url?.trim() || null,
      category_id: Number(form.category_id),
      pricing_type: form.pricing_type,
      pricing_details: form.pricing_details.trim(),
      is_featured: form.is_featured,
      is_popular: form.is_popular,
      is_new: form.is_new,
      status: form.status,
      features: form.features.split(",").map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
    };
    try {
      const res = await fetch(
        isEdit ? `/api/admin/tools/${initial?.id}` : "/api/admin/tools",
        { method: isEdit ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Could not save tool.");
        return;
      }
      router.push("/admin/tools");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="admin-form">
      {error && <div className="form-error">{error}</div>}
      <div className="form-field">
        <label>Name *</label>
        <input value={form.name} onChange={(e) => set("name", e.target.value)} required />
      </div>
      <div className="form-field">
        <label>Short description *</label>
        <input value={form.short_description} onChange={(e) => set("short_description", e.target.value)} required />
      </div>
      <div className="form-field">
        <label>Full description</label>
        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>
      <div className="form-field">
        <label>Website URL *</label>
        <input type="url" value={form.website_url} onChange={(e) => set("website_url", e.target.value)} required />
      </div>
      <div className="form-field">
        <label>Logo URL</label>
        <input type="url" value={form.logo_url} onChange={(e) => set("logo_url", e.target.value)} placeholder="https://..." />
      </div>
      <div className="form-field">
        <label>Category *</label>
        <select value={form.category_id} onChange={(e) => set("category_id", Number(e.target.value))}>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label>Pricing type</label>
        <select value={form.pricing_type} onChange={(e) => set("pricing_type", e.target.value)}>
          {["Free", "Freemium", "Paid", "Free Trial", "Contact for Pricing"].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label>Pricing details</label>
        <input value={form.pricing_details} onChange={(e) => set("pricing_details", e.target.value)} placeholder="e.g. $20/mo" />
      </div>
      <div className="form-field">
        <label>Features (comma separated)</label>
        <input value={form.features} onChange={(e) => set("features", e.target.value)} placeholder="Feature 1, Feature 2" />
      </div>
      <div className="form-field">
        <label>Tags (comma separated)</label>
        <input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="tag1, tag2" />
      </div>
      <div className="form-field">
        <label>Status</label>
        <select value={form.status} onChange={(e) => set("status", e.target.value)}>
          {["approved", "pending", "rejected"].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", gap: "20px", marginBottom: "18px", flexWrap: "wrap" }}>
        <label style={{ display: "flex", gap: "8px", alignItems: "center", cursor: "pointer" }}>
          <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} />
          Featured
        </label>
        <label style={{ display: "flex", gap: "8px", alignItems: "center", cursor: "pointer" }}>
          <input type="checkbox" checked={form.is_popular} onChange={(e) => set("is_popular", e.target.checked)} />
          Popular
        </label>
        <label style={{ display: "flex", gap: "8px", alignItems: "center", cursor: "pointer" }}>
          <input type="checkbox" checked={form.is_new} onChange={(e) => set("is_new", e.target.checked)} />
          New
        </label>
      </div>
      <button type="submit" className="btn btn-primary" disabled={busy}>
        {busy ? "Saving…" : isEdit ? "Save changes" : "Create tool"}
      </button>
    </form>
  );
}
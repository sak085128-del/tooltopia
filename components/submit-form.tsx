"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export function SubmitForm({
  categories,
}: {
  categories: { id: number; name: string }[];
}) {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (name.trim().length < 2 || website.trim().length < 4 || description.trim().length < 20) {
      setError("Please fill in the name, a valid website URL, and a description of at least 20 characters.");
      return;
    }
    setSubmitting(true);
    try {
      let attachment_url: string | undefined;
      if (file) {
        setUploading(true);
        const fd = new FormData();
        fd.append("file", file);
        const up = await fetch("/api/uploads", {
          method: "POST",
          body: fd,
        });
        const upData = await up.json().catch(() => ({}));
        setUploading(false);
        if (!up.ok || !upData?.url) {
          setError(upData?.error ?? "Could not upload the image. Please try again.");
          return;
        }
        attachment_url = upData.url as string;
      }

      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          website_url: website.trim(),
          description: description.trim(),
          attachment_url,
          category_id: categoryId ? Number(categoryId) : undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Something went wrong while submitting your tool. Please try again.");
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="empty-state" style={{ padding: "20px 0" }}>
        <div className="empty-icon">🎉</div>
        <h3>Thank you!</h3>
        <p>
          Your tool has been submitted for review. Once approved, it will appear in the
          directory.
        </p>
        <Link href="/ai-tools" className="btn btn-primary">
          Browse the directory
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="form-field">
        <label htmlFor="tool-name">Tool name *</label>
        <input
          id="tool-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. MyAI Tool"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="tool-website">Website URL *</label>
        <input
          id="tool-website"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://example.com"
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="tool-desc">Description *</label>
        <textarea
          id="tool-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What does this tool do? Who is it for?"
          required
        />
        <p className="hint">{description.length}/2000</p>
      </div>
      <div className="form-field">
        <label htmlFor="tool-cat">Category</label>
        <select
          id="tool-cat"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select a category (optional)</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label htmlFor="tool-file">Logo or screenshot (optional)</label>
        <input
          id="tool-file"
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <p className="hint">
          {file
            ? `${file.name} (${(file.size / 1024).toFixed(0)} KB) — uploaded after submit`
            : "PNG, JPG, WebP, or GIF up to 2 MB."}
        </p>
      </div>
      {error && <div className="form-error">{error}</div>}
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={submitting || uploading}
      >
        {uploading ? "Uploading image…" : submitting ? "Submitting…" : "Submit Tool"}
      </button>
    </form>
  );
}
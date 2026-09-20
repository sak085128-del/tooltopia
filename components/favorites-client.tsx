"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFavorites } from "./use-storage";
import { ToolCard, type ToolCardData } from "./tool-card";

export function FavoritesClient() {
  const { favs } = useFavorites();
  const [tools, setTools] = useState<ToolCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (favs.length === 0) {
      setTools([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/tools?slugs=${encodeURIComponent(favs.join(","))}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setTools(data.items ?? []);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load your favorites. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [favs]);

  if (loading) {
    return (
      <div className="skeleton-row">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line tiny" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⚠️</div>
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (favs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">💜</div>
        <h3>No favorites yet</h3>
        <p>Tap the heart on any tool to save it here.</p>
        <Link href="/ai-tools" className="btn btn-primary">
          Browse AI tools
        </Link>
      </div>
    );
  }

  return (
    <>
      <p style={{ color: "var(--muted)", fontSize: "0.88rem", marginBottom: "16px" }}>
        {tools.length} saved tool{tools.length === 1 ? "" : "s"}
      </p>
      <div className="tool-grid">
        {tools.map((t, i) => (
          <div key={t.slug} style={{ position: "relative" }}>
            <ToolCard tool={t} index={i} />
          </div>
        ))}
      </div>
    </>
  );
}
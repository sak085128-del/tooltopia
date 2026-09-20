"use client";

import { useEffect } from "react";

export function TrackView({ slug }: { slug: string }) {
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
      signal: controller.signal,
    }).catch(() => {});
    return () => controller.abort();
  }, [slug]);

  return null;
}
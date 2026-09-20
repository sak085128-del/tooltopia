"use client";

import { useEffect, useState, useCallback } from "react";

const FAV_KEY = "tooltopia:favorites";
const CMP_KEY = "tooltopia:compare";

function readList(key: string): string[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => {
    setFavs(readList(FAV_KEY));
  }, []);
  const toggle = useCallback((slug: string) => {
    setFavs((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
      return next;
    });
  }, []);
  return { favs, toggle };
}

export function useCompare() {
  const [compare, setCompare] = useState<string[]>([]);
  useEffect(() => {
    setCompare(readList(CMP_KEY));
  }, []);
  const toggle = useCallback((slug: string) => {
    setCompare((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length >= 3
          ? prev
          : [...prev, slug];
      localStorage.setItem(CMP_KEY, JSON.stringify(next));
      return next;
    });
  }, []);
  return { compare, toggle };
}
"use client";

import Link from "next/link";
import { ToolLogo } from "./tool-logo";
import { formatCount, priceClass } from "@/lib/utils";
import { useFavorites, useCompare } from "./use-storage";

export type ToolCardData = {
  slug: string;
  name: string;
  short_description: string;
  rating: number;
  review_count: number;
  pricing_type: string;
  is_new: boolean;
  is_popular: boolean;
  logo_url?: string | null;
  icon?: string | null;
  category?: { name: string; slug: string } | null;
  rank?: number;
};

const Icons = {
  heart: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.5.9-4.5 2.3A5.9 5.9 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
    </svg>
  ),
  heartFilled: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.5.9-4.5 2.3A5.9 5.9 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
    </svg>
  ),
  compare: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.2l-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
    </svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};

export function ToolCard({ tool, index = 0 }: { tool: ToolCardData; index?: number }) {
  const { favs, toggle: toggleFav } = useFavorites();
  const { compare, toggle: toggleCmp } = useCompare();
  const isFav = favs.includes(tool.slug);
  const isCmp = compare.includes(tool.slug);
  const delay = ((index % 9) * 45).toString() + "ms";
  const isTop = (tool.rank ?? 99) <= 3;

  const href = `/ai-tools/${tool.slug}`;

  return (
    <article
      className={`tool-card${isTop ? " card-top" : ""}`}
      data-slug={tool.slug}
      style={{ animationDelay: delay }}
    >
      <div className="tool-card-head">
        <Link href={href} className="tool-card-head-left" aria-label={`Open details for ${tool.name}`}>
          <ToolLogo
            name={tool.name}
            logoUrl={tool.logo_url}
            icon={tool.icon}
            categorySlug={tool.category?.slug ?? "other"}
          />
          {tool.is_new && <span className="badge-new">New</span>}
        </Link>
        {tool.rank ? <span className="rank-badge">#{tool.rank}</span> : null}
        <div className="tool-card-actions">
          <button
            type="button"
            className={`btn-icon mini compare-btn${isCmp ? " is-cmp" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              toggleCmp(tool.slug);
            }}
            aria-label={`Compare ${tool.name}`}
            title="Add to compare"
          >
            {Icons.compare}
          </button>
          <button
            type="button"
            className={`btn-icon mini fav-btn${isFav ? " is-fav" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              toggleFav(tool.slug);
            }}
            aria-label={`Save ${tool.name} to favorites`}
          >
            {isFav ? Icons.heartFilled : Icons.heart}
          </button>
        </div>
      </div>

      <h3 className="tool-card-title">
        <Link href={href}>{tool.name}</Link>
      </h3>
      <p className="tool-desc">{tool.short_description}</p>

      <div className="tool-card-meta">
        {tool.category && <span className="cat-chip">{tool.category.name}</span>}
        <span className="rating">
          {Icons.star}
          {Number(tool.rating).toFixed(1)}
          <span className="rating-count">({formatCount(tool.review_count)})</span>
        </span>
      </div>

      <div className="tool-card-foot">
        <span className={`price-badge ${priceClass(tool.pricing_type)}`}>{tool.pricing_type}</span>
        <Link href={href} className="card-cta">
          View Tool {Icons.arrow}
        </Link>
      </div>
    </article>
  );
}
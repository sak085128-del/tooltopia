"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const POPULAR_SEARCHES = [
  "ChatGPT",
  "Midjourney",
  "Runway",
  "ElevenLabs",
  "Notion AI",
  "Suno",
];

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const submit = (term?: string) => {
    const value = (term ?? q).trim();
    router.push(`/ai-tools?q=${encodeURIComponent(value)}`);
  };

  return (
    <>
      <form
        className="hero-search"
        role="search"
        aria-label="Search AI tools"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <svg
          className="hero-search-icon"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the best AI tools..."
          autoComplete="off"
          spellCheck={false}
          aria-label="Search AI tools"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <div className="popular-searches">
        <span className="label">Popular:</span>
        {POPULAR_SEARCHES.map((s) => (
          <button
            key={s}
            type="button"
            className="chip chip-search"
            onClick={() => submit(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </>
  );
}
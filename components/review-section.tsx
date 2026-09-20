"use client";

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { ratingStars } from "@/lib/utils";

export type ReviewItem = {
  id: number;
  rating: number;
  title: string | null;
  content: string | null;
  createdAt: string | Date;
  userName: string | null;
};

export function ReviewSection({
  toolId,
  initialReviews,
}: {
  toolId: number;
  initialReviews: ReviewItem[];
}) {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (rating < 1 || rating > 5) {
      setError("Please select a rating from 1 to 5 stars.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId, rating, title, content }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Could not submit your review. Please try again.");
        return;
      }
      setRating(0);
      setTitle("");
      setContent("");
      setReviews((prev) => [data.review, ...prev]);
    } catch {
      setError("Something went wrong while submitting your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-section">
      <h2 style={{ fontSize: "1.2rem", marginBottom: "16px" }}>Reviews & Ratings</h2>

      {status === "loading" ? null : status === "authenticated" ? (
        <form className="review-form" onSubmit={submit}>
          <div className="star-input" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={(n <= (hover || rating) ? "on" : "")}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
              >
                ★
              </button>
            ))}
          </div>
          <div className="form-field">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 120))}
              placeholder="Review title (optional)"
              aria-label="Review title"
            />
          </div>
          <div className="form-field">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, 1500))}
              placeholder="Share your experience with this tool (optional)"
              aria-label="Review content"
            />
          </div>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
          <p className="form-note" style={{ textAlign: "left", marginTop: "10px" }}>
            Your review is submitted for moderation before it appears.
          </p>
        </form>
      ) : (
        <p style={{ color: "var(--muted)", marginBottom: "16px" }}>
          <Link href="/login" style={{ color: "var(--accent)", fontWeight: 600 }}>
            Sign in
          </Link>{" "}
          to rate and review this tool.
        </p>
      )}

      <div style={{ marginTop: "20px" }}>
        {reviews.length === 0 ? (
          <p style={{ color: "var(--muted-2)", fontSize: "0.9rem" }}>
            No reviews yet. Be the first to review this tool.
          </p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="review-item">
              <div className="review-head">
                <span className="avatar">{(r.userName ?? "U").charAt(0).toUpperCase()}</span>
                <span className="who">{r.userName ?? "ToolTopia user"}</span>
                <span className="when">
                  {new Date(r.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="review-stars">{ratingStars(r.rating)}</div>
              {r.title && <div className="review-title">{r.title}</div>}
              {r.content && <div className="review-content">{r.content}</div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
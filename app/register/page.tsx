"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error ?? "Could not create your account.");
        return;
      }
      await signIn("credentials", { email, password, redirect: false });
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-main">
      <div className="container">
        <div className="auth-wrap">
          <div className="auth-card">
            <h1>Create your account</h1>
            <p className="sub">Join ToolTopia to rate tools and save favorites.</p>
            {error && <div className="form-error">{error}</div>}
            <form onSubmit={submit}>
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <p className="hint">At least 8 characters.</p>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? "Creating account…" : "Create Account"}
              </button>
            </form>
            <p className="form-note">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
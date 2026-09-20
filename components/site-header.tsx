"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./theme-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const navLinks = [
    { href: "/", label: "Home", match: pathname === "/" },
    { href: "/ai-tools", label: "AI Tools", match: pathname.startsWith("/ai-tools") },
    { href: "/categories", label: "Categories", match: pathname.startsWith("/categories") },
    { href: "/popular", label: "Popular", match: pathname.startsWith("/popular") },
    { href: "/new-tools", label: "New Tools", match: pathname.startsWith("/new-tools") },
    { href: "/compare", label: "Compare", match: pathname.startsWith("/compare") },
  ];

  return (
    <header className="site-header" id="header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="ToolTopia home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="26" height="26">
              <defs>
                <linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#7C5CFF" />
                  <stop offset="1" stopColor="#00D4FF" />
                </linearGradient>
              </defs>
              <path fill="url(#brand-grad)" d="M16 2l3.4 6.9 7.6 1.1-5.5 5.4 1.3 7.6L16 19.3 9.2 22l1.3-7.6L5 10l7.6-1.1z" opacity="0.95" />
              <circle cx="25" cy="7" r="2.4" fill="#00D4FF" />
            </svg>
          </span>
          <span className="brand-name">
            Tool<span>Topia</span>
          </span>
        </Link>

        <nav className={`main-nav${menuOpen ? " open" : ""}`} id="mainNav" aria-label="Primary navigation">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={l.match ? "active" : ""} onClick={() => setMenuOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="btn-icon theme-toggle"
            onClick={toggle}
            aria-label="Toggle dark or light theme"
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>

          <Link href="/favorites" className="btn btn-ghost header-search-btn" aria-label="Your favorites">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.5.9-4.5 2.3A5.9 5.9 0 0 0 7.5 3 5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" />
            </svg>
            <span className="hide-sm">Favorites</span>
          </Link>

          <Link href="/submit" className="btn btn-primary hide-mobile" aria-label="Submit a tool">
            Submit a Tool
          </Link>

          {session?.user ? (
            <div className="header-user" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              {isAdmin && (
                <Link href="/admin" className="btn btn-ghost hide-mobile">
                  Admin
                </Link>
              )}
              <span className="hide-sm" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                {session.user.name ?? session.user.email}
              </span>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => signOut({ callbackUrl: "/" })}
                aria-label="Sign out"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link href="/login" className="btn btn-ghost hide-mobile">
              Sign in
            </Link>
          )}

          <button
            type="button"
            className="btn-icon menu-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mainNav"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
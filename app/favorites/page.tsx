import type { Metadata } from "next";
import { FavoritesClient } from "@/components/favorites-client";

export const metadata: Metadata = {
  title: "My Favorites",
  description: "Your saved AI tools, synced to this browser.",
  robots: { index: false, follow: false },
};

export default function FavoritesPage() {
  return (
    <main className="page-main">
      <div className="container">
        <div className="page-head">
          <h1>
            My <span className="gradient-text">Favorites</span>
          </h1>
          <p className="page-lead">Tools you have saved — synced to this browser.</p>
        </div>
        <FavoritesClient />
      </div>
    </main>
  );
}
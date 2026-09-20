"use client";

import { useFavorites } from "./use-storage";

export function FavoriteButton({ slug, name }: { slug: string; name: string }) {
  const { favs, toggle } = useFavorites();
  const isFav = favs.includes(slug);
  return (
    <button
      type="button"
      className={`btn btn-ghost fav-heart-btn${isFav ? " is-fav" : ""}`}
      onClick={() => toggle(slug)}
      aria-pressed={isFav}
      aria-label={`${isFav ? "Remove" : "Save"} ${name} ${isFav ? "from" : "to"} favorites`}
    >
      {isFav ? "♥ Favorited" : "♡ Add to Favorites"}
    </button>
  );
}
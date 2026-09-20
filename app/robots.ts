import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/ai-tools", "/categories", "/popular", "/new-tools", "/featured", "/compare"],
        disallow: [
          "/admin",
          "/api/",
          "/login",
          "/register",
          "/favorites",
          "/submit",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
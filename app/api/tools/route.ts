import { NextRequest, NextResponse } from "next/server";
import { getToolWithDetails } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

/**
 * GET /api/tools?slugs=chatgpt,claude
 * Returns tools by slug list (for guest favorites / recently-viewed).
 */
export async function GET(req: NextRequest) {
  const slugsParam = req.nextUrl.searchParams.get("slugs");
  if (!slugsParam) {
    return NextResponse.json({ error: "slugs param is required" }, { status: 400 });
  }
  const slugs = slugsParam
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 50);

  try {
    const items = [];
    for (const slug of slugs) {
      const t = await getToolWithDetails(slug);
      if (t) items.push(t);
    }
    return NextResponse.json({ items });
  } catch (err) {
    console.error("API /api/tools error:", err);
    return NextResponse.json(
      { error: "Something went wrong while loading tools." },
      { status: 500 },
    );
  }
}
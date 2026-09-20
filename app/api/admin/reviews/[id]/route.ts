import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { reviews } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { recalcToolRating } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "admin";
}

/** PATCH /api/admin/reviews/:id { status: "approved"|"rejected" } */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const reviewId = Number(id);
  if (!Number.isInteger(reviewId)) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const rawStatus = (body as Record<string, unknown>)?.status;
  const status = rawStatus as "approved" | "rejected" | undefined;
  if (!["approved", "rejected"].includes(String(status))) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  try {
    const row = await getDb()
      .update(reviews)
      .set({ status, updatedAt: new Date() })
      .where(eq(reviews.id, reviewId))
      .returning({ tool_id: reviews.tool_id, status: reviews.status });
    if (row.length === 0) {
      return NextResponse.json({ error: "Review not found." }, { status: 404 });
    }
    await recalcToolRating(row[0].tool_id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API /api/admin/reviews PATCH error:", err);
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

/** DELETE /api/admin/reviews/:id */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const reviewId = Number(id);
  if (!Number.isInteger(reviewId)) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }
  try {
    const row = await getDb()
      .delete(reviews)
      .where(eq(reviews.id, reviewId))
      .returning({ tool_id: reviews.tool_id });
    if (row.length > 0) await recalcToolRating(row[0].tool_id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("API /api/admin/reviews DELETE error:", err);
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
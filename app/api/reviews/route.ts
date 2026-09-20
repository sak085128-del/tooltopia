import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { reviews, tools } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { sanitizeText } from "@/lib/utils";

export const dynamic = "force-dynamic";

const reviewSchema = z.object({
  toolId: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(120).optional().default(""),
  content: z.string().max(1500).optional().default(""),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Please sign in to leave a review." },
      { status: 401 },
    );
  }
  const userId = Number(session.user.id);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = reviewSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide a valid rating (1–5) and a short review." },
      { status: 400 },
    );
  }
  const { toolId, rating, title, content } = parsed.data;

  try {
    const tool = await getDb()
      .select({ id: tools.id })
      .from(tools)
      .where(eq(tools.id, toolId))
      .limit(1);
    if (tool.length === 0) {
      return NextResponse.json({ error: "Tool not found." }, { status: 404 });
    }

    // One review per user per tool (unique index) — update instead of duplicate.
    const existing = await getDb()
      .select({ id: reviews.id })
      .from(reviews)
      .where(and(eq(reviews.user_id, userId), eq(reviews.tool_id, toolId)))
      .limit(1);

    let reviewRow;
    if (existing.length > 0) {
      reviewRow = await getDb()
        .update(reviews)
        .set({
          rating,
          title: sanitizeText(title, 120) || null,
          content: sanitizeText(content, 1500) || null,
          status: "pending",
          updatedAt: new Date(),
        })
        .where(eq(reviews.id, existing[0].id))
        .returning();
    } else {
      reviewRow = await getDb()
        .insert(reviews)
        .values({
          tool_id: toolId,
          user_id: userId,
          rating,
          title: sanitizeText(title, 120) || null,
          content: sanitizeText(content, 1500) || null,
          status: "pending",
        })
        .returning();
    }

    return NextResponse.json(
      {
        ok: true,
        review: {
          id: reviewRow[0].id,
          rating: reviewRow[0].rating,
          title: reviewRow[0].title,
          content: reviewRow[0].content,
          status: reviewRow[0].status,
          createdAt: reviewRow[0].createdAt,
          userName: session.user.name ?? session.user.email,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("API /api/reviews error:", err);
    return NextResponse.json(
      { error: "Something went wrong while submitting your review." },
      { status: 500 },
    );
  }
}
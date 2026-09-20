import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { toolSubmissions, categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { sanitizeText } from "@/lib/utils";

export const dynamic = "force-dynamic";

const submissionSchema = z.object({
  name: z.string().min(2).max(120),
  website_url: z.string().url().max(300),
  description: z.string().min(20).max(2000),
  attachment_url: z.string().url().max(500).optional(),
  category_id: z.number().int().positive().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  const submittedBy = session?.user?.id ? Number(session.user.id) : null;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill in all required fields correctly." },
      { status: 400 },
    );
  }
  const { name, website_url, description, attachment_url, category_id } = parsed.data;

  try {
    if (category_id) {
      const cat = await getDb()
        .select({ id: categories.id })
        .from(categories)
        .where(eq(categories.id, category_id))
        .limit(1);
      if (cat.length === 0) {
        return NextResponse.json({ error: "Invalid category selected." }, { status: 400 });
      }
    }

    const rows = await getDb()
      .insert(toolSubmissions)
      .values({
        name: sanitizeText(name, 120),
        website_url: sanitizeText(website_url, 300),
        description: sanitizeText(description, 2000),
        attachment_url: attachment_url ? sanitizeText(attachment_url, 500) : null,
        category_id: category_id ?? null,
        submitted_by: submittedBy,
        status: "pending",
      })
      .returning({ id: toolSubmissions.id });

    return NextResponse.json({ ok: true, id: rows[0].id }, { status: 201 });
  } catch (err) {
    console.error("API /api/submissions error:", err);
    return NextResponse.json(
      { error: "Something went wrong while submitting your tool. Please try again." },
      { status: 500 },
    );
  }
}
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { sanitizeText } from "@/lib/utils";

export const dynamic = "force-dynamic";

const registerSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(8).max(200),
  name: z.string().min(2).max(80).optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email and a password of at least 8 characters." },
      { status: 400 },
    );
  }
  const { email, password, name } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  try {
    const existing = await getDb()
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);
    const rows = await getDb()
      .insert(users)
      .values({
        email: normalizedEmail,
        name: name ? sanitizeText(name, 80) : null,
        passwordHash: hash,
        role: "user",
      })
      .returning({ id: users.id });

    return NextResponse.json({ ok: true, id: rows[0].id }, { status: 201 });
  } catch (err) {
    console.error("API /api/register error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "./db/client";
import { users } from "./db/schema";
import { z } from "zod";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "user" | "editor" | "admin";
    };
  }
  interface User {
    role?: "user" | "editor" | "admin";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: "user" | "editor" | "admin";
  }
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200),
});

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const parsed = credentialsSchema.safeParse(creds);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;

        const db = getDb();
        const rows = await db
          .select()
          .from(users)
          .where(eq(users.email, email.toLowerCase()))
          .limit(1);
        const user = rows[0];
        if (!user?.passwordHash) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return {
          id: String(user.id),
          name: user.name ?? user.email,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.role = token.role ?? "user";
      }
      return session;
    },
    authorized({ auth, request }) {
      const path = new URL(request.url).pathname;
      if (path.startsWith("/admin")) {
        return auth?.user?.role === "admin";
      }
      return true;
    },
  },
};
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // `authorized` callback in authConfig handles /admin gating.
  return undefined;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
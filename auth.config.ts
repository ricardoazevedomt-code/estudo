import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validation and authentication logic will go in auth.ts
        // which can use Prisma. auth.config.ts is for edge compatibility.
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

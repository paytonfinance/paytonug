import NextAuth from "next-auth";

import { UserData } from "@/lib/user";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

import type { NextAuthConfig } from "next-auth";

export const config = {
  theme: {
    logo: "/images/logo.png",
  },
  session: { strategy: "jwt" },
  providers: [
    // Google,

    Credentials({
      name: "Please Login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "yourEmail@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: Partial<UserData>, req) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error("User not found");
        }

        const isValidPassword = await bcrypt.compare(password!, user.password);
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  basePath: "/auth",
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

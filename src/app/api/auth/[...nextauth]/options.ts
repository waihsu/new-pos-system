import { config } from "@/config/config";
import { prisma } from "@/lib";

import { users } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: config.google_client_id,
      clientSecret: config.google_client_secret,
    }),
  ],
  pages: {
    signIn: "/account/signin",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const existUser = await prisma.users.findFirst({
          where: { email: profile?.email },
        });
        if (existUser) {
          return true;
        } else {
          return false;
        }
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    async session({ session, token }) {
      const existUser = await prisma.users.findFirst({
        where: { email: token.email as string },
      });
      session.user = {
        id: existUser?.id,
        username: existUser?.username,
        email: existUser?.email,
        companies_id: existUser?.companies_id,
      } as users;
      return session;
    },
  },
};

export default NextAuth(authOptions);

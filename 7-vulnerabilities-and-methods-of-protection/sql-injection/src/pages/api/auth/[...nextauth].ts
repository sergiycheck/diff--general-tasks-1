import { findByEmailAndPass, findByEmailAndPassVulnerable } from "@/lib/users";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      id: "signin",
      name: "Sign in by email and password",
      type: "credentials",
      credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          if (credentials) {
            const { email, password } = credentials;

            const result = await findByEmailAndPassVulnerable({
              email,
              password,
            });

            if (result.rowCount) {
              const user = result.rows[0];
              return user;
            }

            return null;
          }

          return null;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt(args) {
      const { token, user, account, profile, isNewUser } = args;

      if (token.user) return token;

      const userWithToken = user as any;

      if (userWithToken) {
        token.user = userWithToken;
      }

      return token;
    },

    async session(args) {
      const { session, user, token } = args;

      let tokenWithUser = token as any;
      return {
        ...session,
        user: tokenWithUser.user,
      };
    },
  },
};

export default NextAuth(authOptions);

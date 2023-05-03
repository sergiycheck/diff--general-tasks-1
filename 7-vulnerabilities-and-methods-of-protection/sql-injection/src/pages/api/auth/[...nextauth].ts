import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const baseUrl = "http://127.0.0.1:3500";

const urls = {
  users: {
    name: "users",
    get login() {
      return `${baseUrl}/${this.name}/login`;
    },
    get login_vulnerable() {
      return `${baseUrl}/${this.name}/login-vulnerable`;
    },
  },
};

export type User = {
  id: number;
  email: string;
  password: string;
  role: string;
};

export type UserLogin = Omit<User, "id" | "role">;

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

            const result = await axios.post<User[]>(
              urls.users.login_vulnerable,
              {
                email,
                password,
              }
            );
            const { data } = result;

            if (data) {
              return data;
            }
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

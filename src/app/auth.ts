import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabase } from "@/config/supabase";
import { CredentialsSignin } from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        console.log(credentials.password);
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();
        console.log(user);
        if (error || !user)
          throw new CredentialsSignin("No user found with this email");

        const isValid = await bcrypt.compare(
          String(credentials?.password),
          user.password_hash
        );
        if (!isValid) throw new CredentialsSignin("Invalid password");

        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user) {
        throw new Error("Account not found");
      }
      return true;
    },
    async jwt({ token, user, profile }) {
      if (user) {
        token.id = user.id ?? profile?.sub; // Credentials user.id or Google sub
        token.name = user.name ?? profile?.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});

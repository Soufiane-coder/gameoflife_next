import NextAuth from "next-auth"
import GoogleProvider  from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"

export const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider ({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn : '/signin'
  }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
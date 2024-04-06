import NextAuth from "next-auth"
import GoogleProvider  from "next-auth/providers/google"
import type { NextAuthOptions, Session } from "next-auth"
import { addNewUser } from "@/lib/firebase/user.apis"
import { AdapterUser } from "next-auth/adapters"

const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider ({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn : '/signin'
  },
  callbacks: {
    signIn : async ({user}) => {
      try{
        await addNewUser(user)
      }catch(err: any){
        console.error(err)
      }
      return true
    },
    jwt: async ({token, account, user}) => {
      return token
    },
    session: async ({session, token ,}) => {
      // (session as any).accessToken = token?.accessToken;
      (session.user as any).id = token.sub
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
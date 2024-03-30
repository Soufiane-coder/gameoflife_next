import NextAuth from "next-auth"
import GoogleProvider  from "next-auth/providers/google"
import type { NextAuthOptions } from "next-auth"
import { addNewUser } from "@/lib/firebase/user.apis"


export const authOptions : NextAuthOptions = {
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
    }
  }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
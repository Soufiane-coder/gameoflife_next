import GoogleProvider  from "next-auth/providers/google"
import type { NextAuthOptions, Session } from "next-auth"
import { addNewUser, getUserFromFirebase } from "@/lib/firebase/user.apis"


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
        console.error('firebase user error ', err)
      }
      return true
    },
    jwt: async ({token, account, user}) => {
      return token
    },
    session: async ({session, token ,}) => {
      // adding user id to session to get when we need it for identifying the user
      const user = await getUserFromFirebase(token.sub as string)
      session.user = user
      return session
    }
  }
}

export default authOptions
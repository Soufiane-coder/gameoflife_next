import GoogleProvider  from "next-auth/providers/google"
import type { NextAuthOptions, Session } from "next-auth"
import { addNewUser, getUserFromFirebase } from "@/lib/firebase/user.apis"
import { signOut } from "next-auth/react"
import { UserType } from "@/types/user.type"

interface NewSessionType extends Session{
  user: UserType;
}

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
      let user;
      try{
        user = await getUserFromFirebase(token.sub as string)
      }catch(err){
        signOut({ callbackUrl: '/signin' })
      }
      // JSON.parse and JSON.stringify to not pass complex object from server compo to client compo
      session.user = JSON.parse(JSON.stringify(user)); 
      return session;
    }
  }
}

export default authOptions
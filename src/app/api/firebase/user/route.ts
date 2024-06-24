import { getUserFromFirebase } from "@/lib/firebase/user.apis";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { z, ZodError } from "zod";
import authOptions from "../../auth/[...nextauth]/authOptions";

export const GET = async (req: NextRequest) => {
    try{
        const session = await getServerSession(authOptions)
        if(!session || !session.user){
            throw new Error('There is no current user')
        }
        const user = await getUserFromFirebase((session.user as any).uid)
        return NextResponse.json(user, {status : 200})
    }catch(error){
        if(error instanceof ZodError){
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status : 500})
    }
}
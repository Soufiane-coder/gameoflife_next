import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getTodoItemsOfRoutine } from "@/lib/firebase/todo-list.apis";
import { UserType } from "@/types/user.type";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async () => {
    try{
        const session = await getServerSession(authOptions)
        if(!session?.user){
            console.error("There is no user in days statistics api")
            throw new Error("There is no user in days statistics api")
        }
        const todoItems = await getTodoItemsOfRoutine((session.user as UserType).uid)
        return NextResponse.json(todoItems, {status: 200})
    }catch(error: any){
        return NextResponse.json({message: error?.message || 'Internale server error', error}, {status: 500})
    }
}
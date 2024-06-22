import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { addNewToDoItemToFirebase, changeTodoItemAttributesInFirebase } from "@/lib/firebase/todo-list.apis";
import { UserType } from "@/types/user.type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const schema = z.object({
    todoItemId: z.string().min(1).max(255),
    isAchieved : z.boolean(),
})

type ReqType = z.infer<typeof schema>;

export const PATCH = async (req: NextRequest) => {
    try{
        const session = await getServerSession(authOptions)
        if(!session?.user){
            console.error("There is no user in days statistics api")
            throw new Error("There is no user in days statistics api")
        }
        const data : ReqType = await req.json()
        schema.parse(data)
        await changeTodoItemAttributesInFirebase((session.user as UserType).uid, data.todoItemId, data.isAchieved)
        return NextResponse.json({message: 'Item has been changed'}, {status: 200})
    }catch(error: any){
        if (error instanceof ZodError) {
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status: 500})
    }
}
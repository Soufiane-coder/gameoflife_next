import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { deleteGoalFromFirebase } from "@/lib/firebase/goal.apis";
import { deleteToDoItemFromFirebase } from "@/lib/firebase/todo-list.apis";
import { UserType } from "@/types/user.type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const schema = z.object({
    todoItemId: z.string().max(255).min(1),
})

type ReqType = z.infer<typeof schema>;

export const DELETE = async (req: NextRequest) => {
    try{
        const session = await getServerSession(authOptions)
        if(!session?.user){
            console.error("There is no user in days statistics api")
            throw new Error("There is no user in days statistics api")
        }

        const {searchParams} = req.nextUrl
        const data : ReqType = {
            todoItemId: searchParams.get('todoItemId') as string,
        }
        schema.parse(data)
        await deleteToDoItemFromFirebase((session.user as UserType).uid, data.todoItemId)
        return NextResponse.json({message: 'todo item deleted successfully'}, {status: 200})
    }catch(error: any){
        if(error instanceof ZodError){
            return NextResponse.json({message: 'Validation Error', error: {errors: error.errors}}, {status: 400})
        }
        return NextResponse.json({message: 'Internale server error', error}, {status: 500})
    }
}
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { addNewToDoItemToFirebase } from "@/lib/firebase/todo-list.apis";
import { UserType } from "@/types/user.type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const schema = z.object({
    description : z.string().max(255),
})

type ReqType = z.infer<typeof schema>;

export const POST = async (req: NextRequest) => {
    try{
        const data : ReqType = await req.json()
        const session = await getServerSession(authOptions)
        if(!session?.user){
            console.error("There is no user in days statistics api")
            throw new Error("There is no user in days statistics api")
        }
        schema.parse(data)
        const todoItemId = await addNewToDoItemToFirebase((session.user as UserType).uid, data.description)
        return NextResponse.json(todoItemId, {status: 201})
    }catch(error: any){
        if (error instanceof ZodError) {
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status: 500})
    }
}
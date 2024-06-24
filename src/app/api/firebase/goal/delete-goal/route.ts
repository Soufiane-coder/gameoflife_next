import { deleteGoalFromFirebase } from "@/lib/firebase/goal.apis";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";


const schema = z.object({
    uid: z.string().max(255).min(1),
    routineId: z.string().max(255).min(1),
    goalId: z.string().max(255).min(1),
})

type ReqType = z.infer<typeof schema>;

export const DELETE = async (req: NextRequest) => {
    try{
        const {searchParams} = req.nextUrl
        const data : ReqType = {
            uid: searchParams.get('uid') as string,
            routineId: searchParams.get('routineId') as string,
            goalId: searchParams.get('goalId') as string,
        }
        schema.parse(data)
        await deleteGoalFromFirebase(data.uid, data.routineId, data.goalId)
        return NextResponse.json({}, {status: 200})
    }catch(error: any){
        if(error instanceof ZodError){
            return NextResponse.json({message: 'Validation Error', error: {errors: error.errors}}, {status: 400})
        }
        return NextResponse.json({message: 'Internale server error', error}, {status: 500})
    }
}
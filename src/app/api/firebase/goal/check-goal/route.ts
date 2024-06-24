
import { checkGoalInFirabase } from "@/lib/firebase/goal.apis";
import { buySkipFromFirebase } from "@/lib/firebase/routine.apis";
import { getUserFromFirebase } from "@/lib/firebase/user.apis";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const schema = z.object({
    uid: z.string().max(255).min(0),
    routineId: z.string().max(255).min(0),  
    goalId: z.string().max(255).min(0),  
})

type ReqType = z.infer<typeof schema>;

export const PUT = async (request: NextRequest) => {
    try {
        const data : ReqType = await request.json()
        schema.parse(data)
        const { uid, routineId, goalId } = data;
        await checkGoalInFirabase(uid, routineId, goalId)
        
        return NextResponse.json({message: 'Goal checked successfully'}, {status: 200})
    }catch(error : any) {
        if (error instanceof ZodError) {
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status : 500})
    }
}
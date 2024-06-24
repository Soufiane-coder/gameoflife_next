import { addNewGoalToFirebase } from "@/lib/firebase/goal.apis";
import { GoalStatus, GoalTypeAttrs } from "@/types/routine.type";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const schema = z.object({
    uid: z.string().max(255).min(1),
    routineId: z.string().max(255).min(1),
    goal: z.object({
        created: z.string().max(255).min(1),
        label: z.string().max(255).min(1),
        description :  z.string().max(255).min(1),
        type: z.nativeEnum(GoalTypeAttrs),
        // status: z.nativeEnum(GoalStatus),
    })
})

type ReqType = z.infer<typeof schema>;

export const PUT = async (req: NextRequest) => {
    try{
        const data : ReqType = await req.json()
        schema.parse(data)
        const goalId = await addNewGoalToFirebase(data.uid, data.routineId, data.goal)
        return NextResponse.json(goalId, {status: 201})
    }catch(error: any){
        if (error instanceof ZodError) {
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status: 500})
    }
}
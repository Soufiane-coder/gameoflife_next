import { deleteRoutineFromFirebase } from "@/lib/firebase/routine.apis";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { getGoalsOfRoutine } from "@/lib/firebase/goal.apis";
import { getStatisticsFromFirebase } from "@/lib/firebase/statistic.apis";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/[...nextauth]/authOptions";

const schema = z.object({
    uid: z.string().max(255).min(1),
})

type ReqType = z.infer<typeof schema>;

export const GET = async (req: NextRequest) => {
    try{
        const session = await getServerSession(authOptions)
        if(!session?.user){
            console.error("There is no user in days statistics api")
            throw new Error("There is no user in days statistics api")
        }
        // const {searchParams} = req.nextUrl
        // const data : ReqType = {
        //     uid: searchParams.get('uid') as string,
        // }
        // schema.parse(data)
        const statistics = await getStatisticsFromFirebase((session?.user as any).uid)
        return NextResponse.json(statistics , {status: 200})
    }catch(error: any){
        if(error instanceof ZodError){
            return NextResponse.json({message: 'Validation Error', error: {errors: error.errors}}, {status: 400})
        }
        return NextResponse.json({message: 'Internale server error', error}, {status: 500})
    }
}
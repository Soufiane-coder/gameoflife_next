import { addTimeToSpentedTime } from "@/lib/firebase/statistic.apis";
import RoutineType from "@/types/routine.type";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";


const schema = z.object({
    uid: z.string().max(255).min(1),
    routineId: z.string().max(255).min(1),
    spentedTime: z.custom((val : unknown) => {
        const dayjsFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
        if(!val || !(typeof val === 'string') || !dayjsFormat.test(val) || !dayjs(val).isValid()){
            throw new Error('Invalid date object')
        }
        return val
    })
})

type ReqType = z.infer<typeof schema>;

export const POST = async (req: NextRequest) => {
    try{
        const data : ReqType = await req.json()
        schema.parse(data)
        const totalSpentedTime = await addTimeToSpentedTime(data.uid, data.routineId, data.spentedTime)
        return NextResponse.json(totalSpentedTime, {status: 200})
    }catch(error: any){
        if (error instanceof ZodError) {
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status: 500})
    }
}
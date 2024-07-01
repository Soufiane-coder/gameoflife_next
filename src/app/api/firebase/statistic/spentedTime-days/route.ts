import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../../auth/[...nextauth]/authOptions";
import { getArraysOfSpentedTime, getDaysRoutineSpentedTime, getStatisticsFromFirebase } from "@/lib/firebase/statistic.apis";
import dayjs from "dayjs";
import { z } from "zod";

export const dynamic = 'force-dynamic' // because we don't take anything from client so server thinks that this is a static api but there is session part that is dynamic

const schema = z.object({
    routineId: z.string().max(255).min(1),
})

export const GET = async (req : NextRequest) => {
    try{
        const {searchParams} = req.nextUrl
        const dataReq = {
            routineId: searchParams.get('routineId') as string,
        }
        schema.parse(dataReq)
        const session = await getServerSession(authOptions)
        if(!(session?.user as any)?.uid){
            throw new Error('There is no user')
        }
        const statistics = await getStatisticsFromFirebase((session?.user as any)?.uid)
        const data = await getDaysRoutineSpentedTime((session?.user as any)?.uid, dataReq.routineId, statistics as any)
        return NextResponse.json(data , {status: 200})
    }catch(error){
        return NextResponse.json({message: (error as any)?.message || 'Internal Server Error' , error})
    }
}
import { NextRequest, NextResponse } from "next/server"
import { getRoutinesFromFirebase } from "@/lib/firebase/routine.apis"
// import { initialProtocol } from './utils'
import {z, ZodError} from 'zod'
import { UserType } from "@/types/user.type"
import { RoutineDeliverableType } from "@/types/routine.type"
import { Timestamp } from "firebase/firestore"
import { initialProtocol } from "./utils"
import dayjsToTimestamp from "@/lib/firebase/utils"
import dayjs from "dayjs"

const schema = z.object({
    uid: z.string().max(50).min(1),
    lastVisit: z.string(),
})

interface RequestBody {
    uid: string
    lastVisit: string;
}

export const PATCH = async (req: NextRequest) => {
    try{
        const data : RequestBody = await req.json()
        schema.parse(data)
        const {uid, lastVisit} = data
        let routines = await getRoutinesFromFirebase(data.uid as string)
        // lastVisit not getting the Timestamp object with their functions so we convert it to timesamp
        routines = await initialProtocol(uid, dayjsToTimestamp(dayjs(lastVisit)), routines) as any
        return NextResponse.json(routines, {status : 200})
    }catch(error : any){
        if(error instanceof ZodError){
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status : 500})
    }
}
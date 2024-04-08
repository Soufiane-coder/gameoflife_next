import { NextRequest, NextResponse } from "next/server"
import { getRoutinesFromFirebase } from "@/lib/firebase/routine.apis"
import {z, ZodError} from 'zod'

const schema = z.object({
    uid: z.string().max(50).min(1),
})

export const GET = async (req: NextRequest) => {
    try{
        const data = {
            uid: req.nextUrl.searchParams.get('uid')
        }
        schema.parse(data)
        const routines = await getRoutinesFromFirebase(data.uid as string)
        return NextResponse.json(routines, {status : 200})
    }catch(error : any){
        if(error instanceof ZodError){
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status : 500})
    }
}
import { deleteRoutineFromFirebase } from "@/lib/firebase/routine.apis";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";


const schema = z.object({
    uid: z.string().max(255).min(1),
    routineId: z.string().max(255).min(1),
})

interface BodyType {
    uid: string;
    routineId: string;
}

export const DELETE = async (req: NextRequest) => {
    try{
        const {searchParams} = req.nextUrl
        const data : BodyType = {
            uid: searchParams.get('uid') as string,
            routineId: searchParams.get('routineId') as string,
        }
        schema.parse(data)
        await deleteRoutineFromFirebase(data.uid, data.routineId)
        return NextResponse.json({}, {status: 200})
    }catch(error: any){
        if(error instanceof ZodError){
            return NextResponse.json({message: 'Validation Error', error: {errors: error.errors}}, {status: 400})
        }
        return NextResponse.json({message: 'Internale server error', error}, {status: 500})
    }
}
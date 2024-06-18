import { NextRequest, NextResponse } from "next/server"
import {z, ZodError} from 'zod'
import { setArchivedOptionInFirebase } from "@/lib/firebase/routine.apis";

const schema = z.object({
    uid: z.string().max(50).min(1),
    routineId: z.string().max(50).min(1),
    archived: z.boolean(),
})

type ReqType = z.infer<typeof schema>;

export const POST = async (request: NextRequest) => {
    try {
        const data : ReqType= await request.json()
        schema.parse(data)
        const {uid, routineId, archived} = data;
        await setArchivedOptionInFirebase(uid, routineId, archived)
        return NextResponse.json({message: `Routine ${archived} successfully`}, {status: 200})
    }catch(error : any) {
        if (error instanceof ZodError) {
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status : 500})
    }
}
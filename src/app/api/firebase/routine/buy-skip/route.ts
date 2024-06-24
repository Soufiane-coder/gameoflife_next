import { buySkipFromFirebase } from "@/lib/firebase/routine.apis";
import { getUserFromFirebase } from "@/lib/firebase/user.apis";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const SKIP_PRICE = 10

const schema = z.object({
    uid: z.string().max(255).min(0),
    routineId: z.string().max(255).min(0),    
})

type ReqType = z.infer<typeof schema>;

export const PUT = async (request: NextRequest) => {
    try {
        const data : ReqType = await request.json()
        schema.parse(data)
        const { uid, routineId } = data;
        const user = await getUserFromFirebase(uid)
        if(user.coins < SKIP_PRICE){
            throw new Error('Coins not sufficient to buy a skip')
        }
        await buySkipFromFirebase(uid, routineId)

        return NextResponse.json({message: 'Adding skip successfully'}, {status: 200})
    }catch(error : any) {
        if (error instanceof ZodError) {
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status : 500})
    }
}
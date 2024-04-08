import { getUserFromFirebase } from "@/lib/firebase/user.apis";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const sheama = z.object({
    uid: z.string().max(50).min(1)
})

export const GET = async (req: NextRequest) => {
    try{
        const data = {
            uid: req.nextUrl.searchParams.get('uid')
        }
        sheama.parse(data)
        const user = await getUserFromFirebase(data.uid as string)
        return NextResponse.json(user, {status : 200})
    }catch(error){
        if(error instanceof ZodError){
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status : 500})
    }
}
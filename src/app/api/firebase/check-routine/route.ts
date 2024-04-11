import { error } from "console";
import { doc, getDoc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server"
import {z, ZodError} from 'zod'
import { db } from "@/lib/firebase/firebaseConfig";
import { checkRoutineInFirebase, getRoutineFromFirebase } from "@/lib/firebase/routine.apis";
import { getUserFromFirebase } from "@/lib/firebase/user.apis";

const SKIP_PRICE = 10

const schema = z.object({
    uid: z.string().max(50).min(1),
    routineId: z.string().max(50).min(1),
    message: z.string().max(255)
})

interface RequestBody{
    uid: string;
    routineId: string;
    message: string
}

export const POST = async (request: NextRequest) => {
    try {
        const data : RequestBody = await request.json()
        schema.parse(data)
        const {uid, routineId, message} = data;

        const routine = await getRoutineFromFirebase(uid, routineId)
        if (routine.isSubmitted){
            throw new Error('This routine is already submitted')
        }

        const user = await getUserFromFirebase(uid)
        if(user.coins < SKIP_PRICE){
            throw new Error('Coins not sufficient to buy a skip')
        }
        await checkRoutineInFirebase(uid, routineId, message)
        return NextResponse.json({message: 'Routine checked successfully'}, {status: 200})
    }catch(error : any) {
        if (error instanceof ZodError) {
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status : 500})
    }
}
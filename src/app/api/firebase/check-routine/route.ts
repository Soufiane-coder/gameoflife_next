import { error } from "console";
import { doc, getDoc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server"
import {z, ZodError} from 'zod'
import { db } from "@/lib/firebase/firebaseConfig";

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

        let docSnap = await getDoc(doc(db, `users/${uid}/routines`, routineId));

        if (!docSnap.exists()) {
            throw new Error('This routine does not exist')
        }
        const routine = docSnap.data();

        if (routine.isSubmitted){
            throw new Error('This routine is already submitted')
        }

        await updateDoc(doc(db, `/users/${uid}/routines`, routineId), {
            combo: increment(1),
            isSubmitted: true,
            lastSubmit: serverTimestamp(),
            message,
        })
        await updateDoc(doc(db, `/users`, uid), {
            coins: increment(1),
        })
        return NextResponse.json({message: 'Routine checked successfully'}, {status: 200})
    }catch(error : any) {
        if (error instanceof ZodError) {
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status : 500})
    }
}
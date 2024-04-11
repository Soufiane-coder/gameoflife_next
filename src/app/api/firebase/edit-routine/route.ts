import { editRoutineInFirebase } from "@/lib/firebase/routine.apis";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

import RoutineType from "@/types/routine.type"

const validateLevel = (val : any) => {
    if (![0, 1, 2, 3, 4, 5].includes(val)) {
        throw new Error('Level must be between 0 and 5');
    }
    return val
}

const validatePriority = (val: any) => {
    if (!['low', 'medium', 'important'].includes(val)) {
        throw new Error('Level must be between 0 and 5');
    }
    return val
}

const validateDays = (val: any) => {
    const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (!val.every((day: string) => weekdays.includes(day))){
        throw new Error('Array must contain only weekdays (monday, tuesday, wednesday, thursday, friday, saturday, sunday)')
    }
    return val
}

const schema = z.object({
    uid: z.string().max(50).min(1),
    routine : z.object({
        title : z.string().max(266).min(1),
        description: z.string().max(266).min(1),
        categoryId: z.string().max(266).min(0),
        level : z.custom(validateLevel),
        combo : z.number().min(0),
        isSubmitted : z.boolean(),
        isArchived: z.boolean(),
        days : z.custom(validateDays),
        skip: z.number().min(0),
        priority : z.custom(validatePriority),
        message: z.string().max(266),
        emoji: z.string().min(0),
        bgEmojiColor: z.string().max(50).min(1),
        character : z.string().max(50).min(0),
        lastSubmit: z.string(),
        rangeTime : z.array(z.string()).length(2),
        spentedTime : z.string(),
    })
})

type ReqType = z.infer<typeof schema>;

export const PUT = async (req: NextRequest) => {
    try{
        const data : ReqType = await req.json()
        schema.parse(data)
        await editRoutineInFirebase(data.uid, data.routine as RoutineType)
        return NextResponse.json({message: 'Routine edited successfully'}, {status: 200})
    }catch(error : any){
        if(error instanceof ZodError){
            return NextResponse.json({message: 'Validation Error', errors: error.errors}, {status: 400})
        }
        return NextResponse.json({message: 'Internal server error', error}, {status: 500})
    }
}
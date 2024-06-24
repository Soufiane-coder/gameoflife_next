import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getStatisticsOfDayRoutineFromFirebase } from "@/lib/firebase/statistic.apis";
import { getTodoItemsOfRoutine } from "@/lib/firebase/todo-list.apis";
import { UserType } from "@/types/user.type";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";

const schema = z.object({
    routineId: z.string().max(255).min(1),
    day: z.string().max(255).min(1),
})


export const GET = async (req: NextRequest) => {
    try{
        const {searchParams} = req.nextUrl
        const data = {
            routineId: searchParams.get('routineId') as string,
            day: searchParams.get('day') as string,
        }
        schema.parse(data)
        const session = await getServerSession(authOptions)
        if(!session?.user){
            console.error("There is no user in days statistics api")
            throw new Error("There is no user in days statistics api")
        }
        console.log({uid: (session.user as any).uid, day: data.day, routineId: data.routineId  })
        const spentedTime = await getStatisticsOfDayRoutineFromFirebase((session.user as UserType).uid , data.day ,data.routineId)
        return NextResponse.json(spentedTime, {status: 200})
    }catch(error: any){ // todo add zod
        return NextResponse.json({message: error?.message || 'Internale server error', error}, {status: 500})
    }
}

// import { deleteRoutineFromFirebase } from "@/lib/firebase/routine.apis";

// import { getGoalsOfRoutine } from "@/lib/firebase/goal.apis";


// export const GET = async (req: NextRequest) => {
//     try{
//         const {searchParams} = req.nextUrl
//         const data : BodyType = {
//             uid: searchParams.get('uid') as string,
//             routineId: searchParams.get('routineId') as string,
//         }
//         schema.parse(data)
//         const goals = await getGoalsOfRoutine(data.uid, data.routineId)
//         return NextResponse.json(goals, {status: 200})
//     }catch(error: any){
//         if(error instanceof ZodError){
//             return NextResponse.json({message: 'Validation Error', error: {errors: error.errors}}, {status: 400})
//         }
//         return NextResponse.json({message: 'Internale server error', error}, {status: 500})
//     }
// }
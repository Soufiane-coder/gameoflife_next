import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import authOptions from "../../auth/[...nextauth]/authOptions";
import { getArraysOfSpentedTime, getStatisticsFromFirebase } from "@/lib/firebase/statistic.apis";
import dayjs from "dayjs";


const sumSpentedTime = (
	arr: { routineId: string; spentedTime: dayjs.Dayjs }[][],) => {
	const result: Record<string, dayjs.Dayjs> = {};

	arr.forEach((subArray) => {
		subArray.forEach((item) => {
			const { routineId, spentedTime } = item;
			if (result[routineId]) {
				result[routineId] = result[routineId].add(
					spentedTime.valueOf(),
				);
			} else {
				result[routineId] = spentedTime;
			}
		});
	});

	// return result;

    return Object.keys(result).map(routineId => ({
        type: routineId,
        value: dayjs(result[routineId]).unix(),
      }));
};

export const GET = async (req: NextRequest) => {
    try{
        const session = await getServerSession(authOptions)
        if(!(session?.user as any)?.uid){
            throw new Error('There is no user')
        }
        console.log((session?.user as any)?.uid)
        const statistics = await getStatisticsFromFirebase((session?.user as any)?.uid)

        const data = await getArraysOfSpentedTime((session?.user as any)?.uid, statistics as any)
        console.log(data)

        

        return NextResponse.json(sumSpentedTime(data) , {status: 200})
    }catch(error){
        if(error instanceof ZodError){
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status : 500})
    }
}
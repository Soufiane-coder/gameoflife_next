import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import authOptions from "../../auth/[...nextauth]/authOptions";
import { getArraysOfSpentedTime, getStatisticsFromFirebase } from "@/lib/firebase/statistic.apis";
import dayjs from "dayjs";


const sumSpentedTime = (
	arr: { routineId: string; spentedTime: dayjs.Dayjs }[][],) => {
	const result: Record<string, number> = {};

	arr.forEach((subArray) => {
		subArray.forEach((item) => {
			const { routineId, spentedTime } = item;
			if (result[routineId]) {
				// result[routineId] = result[routineId].add(
				// 	spentedTime.valueOf(),
				// );
                result[routineId] += dayjs(spentedTime).unix()
			} else {
				result[routineId] = dayjs(spentedTime).unix();
			}
		});
	});

	return result;

    return Object.keys(result).map(routineId => ({
        routineId,
        spentedTime: dayjs(result[routineId]).unix(),
      }));
};

export const GET = async (req: NextRequest) => {
    try{
        const session = await getServerSession(authOptions)
        if(!(session?.user as any)?.uid){
            throw new Error('There is no user')
        }
        const statistics = await getStatisticsFromFirebase((session?.user as any)?.uid)
        // console.log({statistics})
        const data = await getArraysOfSpentedTime((session?.user as any)?.uid, statistics as any)
        return NextResponse.json(sumSpentedTime(data) , {status: 200})
    }catch(error){
        if(error instanceof ZodError){
            return NextResponse.json({message: "Validation Error", errors: error.errors}, {status : 400})
        }
        return NextResponse.json({message: 'Internal Server Error', error}, {status : 500})
    }
}
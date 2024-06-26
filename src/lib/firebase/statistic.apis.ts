import { collection, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import dayjs, { Dayjs } from "dayjs";
import StatisticsType from "@/types/statistics.type";
import dayjsToTimestamp, { TimestampToDayjs } from "./utils";

export const getStatisticsFromFirebase = async (uid : string,) => {
    const colRef = collection(db, `users/${uid}/statistics`);
    const { docs } = await getDocs(colRef);
    return docs.map(doc => ({
        ...doc.data(),
    }))
}

export const getArraysOfSpentedTime = async (uid: string, days: {day: string}[]) => {
    return await Promise.all(
        days.map(async ({day}) => {
            const colRef = collection(db, `users/${uid}/statistics/${day}/routineIds`);
            const { docs } = await getDocs(colRef);
            return docs.map(doc => ({
                ...doc.data(),
                routineId: doc.id,
                spentedTime: TimestampToDayjs(doc.data()?.spentedTime)
            }))
        })
    )
}

export const getDaysRoutineSpentedTime = async (uid: string, routineId: string, days: {day: string}[]) => {
   
   const allData : Record<string, Dayjs> = {}

    await Promise.all(
        days.map(async ({day}) => {
            const dayStatDoc = doc(db, `users/${uid}/statistics/${day}/routineIds`, routineId);
            let docSnap = await getDoc(dayStatDoc);
            if (!docSnap.exists()) {
                return;
            }
            allData[day] = TimestampToDayjs(docSnap.data()?.spentedTime)
        })
    )

    return allData
}

export const addTimeToSpentedTime = async (uid : string, routineId: string, spentedTime : string) => {
    const newSpentedTime = dayjs(spentedTime)
    
    const today = dayjs().format().split("T")[0]

    const dayRef = doc(db, `users/${uid}/statistics`, today) // I aded this so i can retrave date to passit to get routine spendted time
    const daySnap = await getDoc(dayRef)
    if (!daySnap.exists()){
        await setDoc(dayRef, {
            day: today
        });
    }
    
    const docRef = doc(db, `users/${uid}/statistics/${today}/routineIds`, routineId)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()){
        await setDoc(docRef, {
            // created: dayjsToTimestamp(dayjs(dayjs().format())), // don't know why do that rather than simple dayjs()
            spentedTime: dayjsToTimestamp(newSpentedTime)
        });
    }else{
        await updateDoc(docRef, {
            spentedTime: dayjsToTimestamp(newSpentedTime.add(TimestampToDayjs(docSnap.data()?.spentedTime as Timestamp).valueOf()))
        })
    }

    return TimestampToDayjs((await getDoc(docRef)).data()?.spentedTime)
}

export const getStatisticsOfDayRoutineFromFirebase = async (uid : string, day: string, routineId: string) => {
    const dayStatDoc = doc(db, `users/${uid}/statistics/${day}/routineIds`, routineId);
    let docSnap = await getDoc(dayStatDoc);
    if (!docSnap.exists()) {
        return dayjs(0)
    }
    const {spentedTime } = docSnap.data()
    return TimestampToDayjs(spentedTime as Timestamp);
    // return spentedTime;
    // return Promise.resolve(data as UserType)
}

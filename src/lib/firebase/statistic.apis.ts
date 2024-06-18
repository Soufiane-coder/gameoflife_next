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
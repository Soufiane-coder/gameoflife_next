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

export const addTimeToSpentedTime = async (uid : string, routineId: string, spentedTime : string) => {
    const newSpentedTime = dayjs(spentedTime)
    
    const today = dayjs().format().split("T")[0]
    const docRef = doc(db, `users/${uid}/routines/${routineId}/spentedTime`, today)
    const docSnap = await getDoc(docRef)


    if (!docSnap.exists()){
        await setDoc(docRef, {
            created: dayjsToTimestamp(dayjs(dayjs().format())), // don't know why do that rather than simple dayjs()
            spentedTime: dayjsToTimestamp(newSpentedTime)
        });
    }else{
        await updateDoc(docRef, {
            spentedTime: dayjsToTimestamp(newSpentedTime.add(TimestampToDayjs(docSnap.data()?.spentedTime as Timestamp).valueOf()))
        })
    }

    return TimestampToDayjs((await getDoc(docRef)).data()?.spentedTime)
}
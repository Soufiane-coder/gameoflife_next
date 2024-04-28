import { collection, addDoc, Timestamp, updateDoc, doc, getDocs, getDoc, setDoc, increment, serverTimestamp, deleteDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebaseConfig";
import RoutineType, {RoutineDeliverableType} from "@/types/routine.type";
import dayjs, { Dayjs } from "dayjs";
import dayjsToTimestamp, { TimestampToDayjs } from './utils'
import StatisticsType from "@/types/statistics.type";

const fromLocalRoutineToDelivrable = (routine : RoutineType) : RoutineDeliverableType => {
    const routineDeliverable : RoutineDeliverableType = {
        ...routine,
        lastSubmit: dayjsToTimestamp(dayjs(routine.lastSubmit)),
        rangeTime: [dayjsToTimestamp(dayjs(routine.rangeTime[0])), dayjsToTimestamp(dayjs(routine.rangeTime[1]))],
        spentedTime: dayjsToTimestamp(dayjs(routine.spentedTime))
    };
    return routineDeliverable;
}

const fromDelivrableToLocleRoutine = (routine: RoutineDeliverableType) : RoutineType => {
    return {
        ...routine,
        lastSubmit : TimestampToDayjs(routine.lastSubmit),
        rangeTime: [TimestampToDayjs(routine.rangeTime[0]),TimestampToDayjs(routine.rangeTime[1])], // 'HH:mm:ss'
        spentedTime: TimestampToDayjs(routine.spentedTime),
    }
}

export const checkRoutineInFirebase = async (uid: string, routineId: string, message: string) => {
    await updateDoc(doc(db, `/users/${uid}/routines`, routineId), {
        combo: increment(1),
        isSubmitted: true,
        lastSubmit: serverTimestamp(),
        skip: increment(1),
        message,
    })
    await updateDoc(doc(db, `/users`, uid), {
        coins: increment(1),
    })

    const today = dayjs().format().split("T")[0]
    
    const statisticsRef = doc(db, `users/${uid}/statistics`, today);

    const docSnap = await getDoc(statisticsRef)

    if (!docSnap.exists()) {
        await setDoc(statisticsRef, {
            day: today,
            checkedRoutines: [routineId],
        } as StatisticsType);
    }
    else {
        await updateDoc(statisticsRef, {
            checkedRoutines: arrayUnion(routineId)
        })
    }
}

export const getRoutineFromFirebase = async (uid: string, routineId: string) => {
    let docSnap = await getDoc(doc(db, `users/${uid}/routines`, routineId));
    if (!docSnap.exists()) {
        throw new Error('This routine does not exist')
    }
    const routine = docSnap.data();
    return routine
}

export const getRoutinesFromFirebase = async (uid : string,) => {
    const colRef = collection(db, `users/${uid}/routines`);
    const { docs } = await getDocs(colRef);
    return docs.map(doc => {
        const routine : RoutineDeliverableType = {...doc.data(), routineId: doc.id} as RoutineDeliverableType
        return fromDelivrableToLocleRoutine(routine)
    })
    // return docs.map(doc => ({...doc.data(), routineId : doc.id}))
}

export const addRoutineToFirebase = async (uid: string, routine : RoutineType,) => {
    const routineDeliverable = fromLocalRoutineToDelivrable(routine)
    const colRef = collection(db, `users/${uid}/routines`);
    const { id: routineId } = await addDoc(colRef, routineDeliverable);
    return routineId;
}

export const editRoutineInFirebase = async (uid: string , routine : RoutineType) => {
    const routineDeliverable = fromLocalRoutineToDelivrable(routine)
    const { routineId } = routineDeliverable;
    const selectedRoutine = doc(db, `users/${uid}/routines/`, routineId as string);
    await updateDoc(selectedRoutine, {
        ...routineDeliverable
    })
}


export const addTimeToSpentedTime = async (uid : string, routineId: string, spentedTime : Dayjs) => {
 
    const statisticsRef = doc(db, `users/${uid}/routines/`, routineId);
    const docSnap = await getDoc(statisticsRef)

    const selectedRoutine : RoutineDeliverableType = docSnap.data() as RoutineDeliverableType;

    await updateDoc(statisticsRef, {
        spentedTime: dayjsToTimestamp(spentedTime.add(TimestampToDayjs(selectedRoutine.spentedTime).valueOf()))
    })

    return spentedTime.add(TimestampToDayjs(selectedRoutine.spentedTime).valueOf())

    // if (docSnap.exists()){
    //     let updatedArray = docSnap.data()?.routinesSpentedTime

    //     if (updatedArray.length === 0 || updatedArray.some(item => item.routineId !== routineId)){
    //         updatedArray.push({routineId, spentedTime : dayjsToTimestamp(spentedTime)})
    //     }
    //     else {
    //         updatedArray = updatedArray.map((item : {routineId: string, spentedTime : Timestamp})  => {
    //             if(item.routineId === routineId){
    //                 const res = spentedTime.add(TimestampToDayjs(item.spentedTime).valueOf())
    //                 TotalTime = res;
    //                 return {...item, spentedTime : dayjsToTimestamp(res)}
    //             }
    //             return item;
    //         }) ?? []
    //     }
    //     await updateDoc(statisticsRef, {
    //         routinesSpentedTime: updatedArray
    //     })
    // }else{
    //     await setDoc( statisticsRef, { 
    //         day: today,
    //         routinesChecked : [],
    //         routinesSpentedTime : [{
    //             routineId,
    //             spentedTime : dayjsToTimestamp(spentedTime),
    //         }],
    //     });
    // }

    // return TotalTime
    // if (!docSnap.exists()) {
    //     await setDoc( statisticsRef, { 
    //         day: today,
    //         rouitnesChecked : [],
    //         routinesSpentedTime : [{
    //             routineId,
    //             spentedTime : spentedTimeTs,
    //         }],
    //     });
    // }
    // else{
    //     await updateDoc(statisticsRef, {
    //         routinesSpentedTime: arrayUnion({
    //             routineId,
    //             spentedTime : spentedTimeTs,
    //         })
    //     })
    // }

    // if (!docSnap.exists()) {
    //     await setDoc( statisticsRef, { 
    //         day: today,
    //         rouitnesChecked : [],
    //         routinesSpentedTime : [{
    //             routineId,
    //             spentedTime : spentedTimeTs,
    //         }],
    //     });
    // }
    // else{
    //     await updateDoc(statisticsRef, {
    //         routinesSpentedTime: arrayUnion({
    //             routineId,
    //             spentedTime : spentedTimeTs,
    //         })
    //     })
    // }
}

export const uncheckAllRoutinesBelongToUserInFirebase = async (uid : string , routines : RoutineType[]) => {
    const uncheckRoutine = async (routineId : string) => {
        return await updateDoc(doc(db, `/users/${uid}/routines`, routineId), {
            isSubmitted: false,
        })
    }

    await Promise.all(routines.map(routine => uncheckRoutine(routine.routineId as string)))
    return routines;
}


export const updateTheDayOfLastVisitToTodayInFirebase = async (uid : string) => {
    try {
        return await updateDoc(doc(db, `/users`, uid), {
            lastVisit: serverTimestamp(),
        })
    }
    catch (error) {
        console.error(error)
    }
}

export const UpdateSkipAndLastSubmitInFirebase = async (uid : string, routineId : string , skip : number, lastSubmit : Timestamp ,) => {
    await updateDoc(doc(db, `/users/${uid}/routines`, routineId), {
        skip,
        lastSubmit,
    })
}

export const setComboToZeroInFirebase = async (uid: string, routineId: string) => {
    await updateDoc(doc(db, `/users/${uid}/routines`, routineId), {
        combo: 0,
    })
}

export const deleteRoutineFromFirebase = async (uid: string, routineId: string) => {
    await deleteDoc(doc(db, `/users/${uid}/routines/`, routineId));
}

export const buySkipFromFirebase = async (uid: string, routineId: string) => {
    await updateDoc(doc(db, `/users/${uid}/routines`, routineId), {
        skip: increment(1),
    })
    await updateDoc(doc(db, `/users`, uid), {
        coins: increment(-10)
    })
}

import { collection, getDocs, orderBy, query, addDoc, Timestamp, deleteDoc, doc, updateDoc, where, limit, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { GoalStatus, GoalType, GoalTypeAttrs } from "@/types/routine.type";
import { get } from "firebase/database";

interface GoalLite {
    created: string;
    type: GoalTypeAttrs;
    description: string;
    label: string;
}

export const addNewGoalToFirebase = async (uid: string, routineId : string, goal: GoalLite) => {
    const colRef = collection(db, `users/${uid}/routines/${routineId}/goals`);
    const newGoal = {
        ...goal,
        status: GoalStatus.WAITING,
        created:  Timestamp.fromDate(new Date(goal.created)),
    }
    const { id: goalId } = await addDoc(colRef, newGoal);
    return goalId;
}

export const deleteGoalFromFirebase = async (uid : string, routineId : string, goalId: string) => {
    await deleteDoc(doc(db, `/users/${uid}/routines/${routineId}/goals`, goalId));
}

export const checkGoalInFirabase = async (uid : string, routineId: string, goalId: string) => {
    await updateDoc(doc(db, `/users/${uid}/routines/${routineId}/goals`, goalId), {
        status: GoalStatus.DONE,
    })
}

// export const getWaitingGoal = async (uid: string, routineId: string) => {
//     const colRef = collection(db, `users/${uid}/routines/${routineId}/goals`);
//     const q0 = query(colRef, where('status', '==', 'WAITING'))
//     const q = query(q0,  
//         orderBy('created'),
//     )
//     console.log('fired')
//     // const q2 = query(q, limit(1))
//     const {docs} = await getDocs(q);
//     // console.log('fired', docs[0].data())
//     return docs.map(doc => ({
//         ...doc.data(),
//         goalId: doc.id,
//     }) as GoalType)
// }

export const getGoalsOfRoutine = async (uid : string, routineId : string,) : Promise<GoalType[]> => {
    // todo make sure that the user and routine are already exists
    const colRef = collection(db, `users/${uid}/routines/${routineId}/goals`);
    const orderedQuery = query(colRef, orderBy('created'));

    const { docs } = await getDocs(orderedQuery);
    return docs.map(doc => ({
        ...doc.data(),
        goalId: doc.id,
    }) as GoalType)
}
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { GoalType } from "@/types/routine.type";

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
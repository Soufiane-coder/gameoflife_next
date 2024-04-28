import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getStatisticsFromFirebase = async (uid : string,) => {
    const colRef = collection(db, `users/${uid}/statistics`);
    const { docs } = await getDocs(colRef);
    return docs.map(doc => ({
        ...doc.data(),
    }))
}
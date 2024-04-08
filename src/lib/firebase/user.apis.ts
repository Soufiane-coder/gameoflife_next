
import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { UserType } from "@/types/user.type";
import { User, } from "next-auth";
import { AdapterUser } from "next-auth/adapters";


export const addNewUser = async (userLite: User | AdapterUser) => {
    const { id: uid, email, image: photoURL, name: displayName} = userLite;
    const userDoc = doc(db, "users", uid);
    let docSnap = await getDoc(userDoc)

    if (!docSnap.exists()) {
        // User default values with init values
        const user : UserType = { 
            uid,
            email,
            displayName,
            photoURL,
            emailVerified: false,
            phoneNumber : null,
            coins: 0,
            rate: 1,
            xp: 0,
            lastVisit: new Timestamp(0, 0),
        }
        await setDoc(userDoc, user);
    }
    
}

export const getUserFromFirebase = async (uid: string) : Promise<UserType> => {
    const userDoc = doc(db, "users", uid);
    let docSnap = await getDoc(userDoc);

    if (!docSnap.exists()) {
        throw new Error('This user does not exist')
    }
    return docSnap.data() as UserType;
}
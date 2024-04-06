
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

export const getUserData = async (userLite :  User | AdapterUser) : Promise<UserType> => {

    const { id: uid, } = userLite;
    const userDoc = doc(db, "users", uid);
    let docSnap = await getDoc(userDoc);
    return docSnap.data() as UserType;
}
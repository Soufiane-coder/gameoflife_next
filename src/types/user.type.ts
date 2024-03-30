import { Timestamp } from "firebase/firestore";

export interface UserType {
    uid : string,
    email: string | null | undefined,
    displayName: string | null | undefined,
    photoURL: string | null | undefined,
    emailVerified: boolean,
    phoneNumber : null | string,
    coins: number,
    rate: 1 | 2 | 3 | 4 | 5,
    xp: number,
    lastVisit: Timestamp
}
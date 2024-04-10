import CategoryType from "@/types/category.type";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const addCategoryToFirebase = async (uid : string, category : CategoryType,) => {
    const colRef = collection(db, `users/${uid}/categories`);
    const { id: categoryId } = await addDoc(colRef, category);
    return categoryId;
}


export const getCategoriesFromFirebase = async (uid : string,) => {
    const colRef = collection(db, `users/${uid}/categories`);
    const { docs } = await getDocs(colRef);
    return docs.map(doc => ({
        ...doc.data(),
        categoryId: doc.id,
    })) as CategoryType[]
}
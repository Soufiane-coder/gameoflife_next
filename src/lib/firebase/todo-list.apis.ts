import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const getTodoItemsOfRoutine = async (uid : string,) => {
    const colRef = collection(db, `users/${uid}/todoItems`);
    const { docs } = await getDocs(colRef);
    return docs.map(doc => ({
        ...doc.data(),
        todoItemId: doc.id,
    }))
}


export const addNewToDoItemToFirebase = async (uid : string, todoItemDescription : string) => {
    const colRef = collection(db, `users/${uid}/todoItems`);
    const { id: todoItemId } = await addDoc(colRef, {description:todoItemDescription, isAchieved: false });
    return todoItemId;
}

export const deleteAllToDoCheckedItemsFromFirebase = async (uid : string,) => {
    const checkedItems = query(collection(db, `users/${uid}/todoItems`), 
        where('isAchieved', '==', true))
    const allCheckedItems = await getDocs(checkedItems)
    // allCheckedItems
    allCheckedItems.forEach(doc => deleteDoc(doc.ref))
}

export const deleteToDoItemFromFirebase = async (uid : string, todoItemId: string) => {
    await deleteDoc(doc(db, `/users/${uid}/todoItems`, todoItemId));
}

export const changeTodoItemAttributesInFirebase = async (uid : string, todoItemId: string, isAchieved: boolean) => {
    await updateDoc(doc(db, `/users/${uid}/todoItems`, todoItemId), {
        isAchieved
    })
}

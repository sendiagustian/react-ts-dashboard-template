import { firestore } from "../../../configs/keys/FirebaseConfig";
import {
    DocumentData,
    DocumentSnapshot,
    Query,
    QuerySnapshot,
    collection,
    getDocs,
    deleteDoc,
    query,
    where,
    doc,
    setDoc,
    updateDoc,
    AddPrefixToKeys,
} from "firebase/firestore";
import { UserFirestoreModel } from "../../../models/UserFirestoreModel";

export const getDataUsers = async (): Promise<UserFirestoreModel[]> => {
    const listUsers: Array<UserFirestoreModel> = [];
    let refDataUsers: Query<DocumentData, DocumentData> = query(
        collection(firestore, "users"),
        where("appName", "==", "React")
    );

    await getDocs(refDataUsers).then((docs: QuerySnapshot<DocumentData, DocumentData>) => {
        docs.forEach((doc: DocumentSnapshot<DocumentData, DocumentData>) => {
            listUsers.push({
                docUid: doc.id,
                appName: doc.data()!["appName"],
                name: doc.data()!["name"],
                phone: doc.data()!["phone"],
                point: doc.data()!["point"],
                role: doc.data()!["role"],
            });
        });
    });
    return listUsers;
};

export const addUser = async (uid: string, dataAdd: UserFirestoreModel) => {
    const refUserDoc = doc(firestore, "users", uid);
    await setDoc(refUserDoc, dataAdd).catch((err) => console.error(err));
};

export const updateUser = async (uid: string, dataUpdate: AddPrefixToKeys<string, any>) => {
    const refUserDoc = doc(firestore, "users", uid);
    await updateDoc(refUserDoc, dataUpdate).catch((err) => console.error(err));
};

export const deleteUser = async (uid: string) => {
    const refUserDoc = doc(firestore, "users", uid);
    await deleteDoc(refUserDoc).catch((err) => console.error(err));
};

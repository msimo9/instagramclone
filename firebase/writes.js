//imports
import { app } from "./firebase";
import { db } from "./firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 


//functions

export const handleUserSignUp = (email, username, fullName, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    const userID = user.uid;
    handleSaveAdditionalInfo(email, username, fullName, userID)
    console.log("user ", user, " signed up successfully!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, " ", errorMessage);
    });
}

export const handleSaveAdditionalInfo = async (email, username, fullName, userID) => {
    await setDoc(doc(db, "userInfo", userID),
        {
            email: email,
            username: username,
            fullName: fullName,
        }
    );
}
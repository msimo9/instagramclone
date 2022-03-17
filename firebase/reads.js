//imports
import { app } from "./firebase";
import { db } from "./firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

//functions


export const handleUserLogIn = (email, password, navigation) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userID = user.uid;
        console.log("Log in successful!");
        navigation.navigate("Tab");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errorM = errorCode + " " + errorMessage;
        alert(errorM);
    });
}
//imports
import { app } from "./firebase";
import { db } from "./firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


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

export const getProfilePhoto = (userID, handleSetImage, toggleImageReady) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, '/userData/'+userID+'/profilePhoto.png'))
    .then((url) => {
        handleSetImage(url);
        toggleImageReady(toggleImageReady);
    })
    .catch((error) => {
        console.log(error);
    });
}
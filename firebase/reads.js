//imports
import { app } from "./firebase";
import { db } from "./firebase";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";


//functions


export const handleUserLogIn = (email, password, navigation) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userID = user.uid;
        console.log("Log in successful!");
        navigation.navigate("Tabs", {screen: "Tab"});
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errorM = errorCode + " " + errorMessage;
        alert(errorM);
    });
}

export const getProfilePhoto = (userID, handleSetImage, toggleImageReady, saveProfilePhotoURI) => {
    const storage = getStorage();
    getDownloadURL(ref(storage, '/userData/'+userID+'/profilePhoto.png'))
    .then((url) => {
        handleSetImage(url);
        toggleImageReady(toggleImageReady);
        //if(saveProfilePhotoURI){saveProfilePhotoURI(url)}
    })
    .catch((error) => {
        console.log(error);
    });
}



export const readSocialData = async (userID, setData, toggleDataReady) => {
    const docRef = doc(db, "userInfo", userID);
    const docSnap = await getDoc(docRef);
    let tempDataArr = [];

    if (docSnap.exists()) {
        tempDataArr.push(docSnap.data().posts);
        tempDataArr.push(docSnap.data().followers.length);
        tempDataArr.push(docSnap.data().following.length);
        setData(tempDataArr);
        toggleDataReady();
    } else {
        console.log("No such document!");
    }
}

export const readUserInfo = async (userID, setUserData, toggleUserDataReady) => {
    const docRef = doc(db, "userInfo", userID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        setUserData(docSnap.data());
        toggleUserDataReady();
    } else {
        console.log("No such document!");
    }
}
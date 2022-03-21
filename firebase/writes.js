//imports
import { app } from "./firebase";
import { db } from "./firebase";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';

//functions

export const handleUserSignUp = (email, username, fullName, password, navigation) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    const userID = user.uid;
    handleSaveAdditionalInfo(email, username, fullName, userID);
    uploadDefaultProfilePicture(userID);
    console.log("user ", user, " signed up successfully!");
    navigation.navigate("Tab");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const errorM = errorCode + " " + errorMessage;
        alert(errorM);
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

export const uploadDefaultProfilePicture = async(userID) => {
    let file = {
        uri: "https://firebasestorage.googleapis.com/v0/b/instagramclone-a573f.appspot.com/o/defaultProfilePhoto%2Fdefault_avatar.png?alt=media&token=62b298c9-92e7-4cab-9edf-dcbaa9b08f1a",
        cancelled: false,
        type: "image",
        width: 400
    }
    const response = await fetch(file.uri);
    const blob = await response.blob();

    //add to firebase code
    const imagePath = file.uri;
    const storage = getStorage();
    //const imageFormat = imagePath.substring(imagePath.length-3);
    const imageFormat = "png";
    var storageRef = ref(storage, '/userData/'+userID+'/profilePhoto.'+imageFormat);

    /*uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Default profile photo successfuly uploaded');
    }).then(() => {
        getDownloadURL(ref(storage, '/userData/'+userID+'/profilePhoto.'+imageFormat)).then((url) => {console.log(url)})
        console.log("https://firebasestorage.googleapis.com/v0/b/instagramclone-a573f.appspot.com/o/"+'/userData/'+userID+'/profilePhoto.'+imageFormat)
    });*/
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.log("Upload was unsuccessful :(");
        console.log("Error log: ", error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );

}

export const uploadCustomProfilePicture = async(userID) => {
    // No permissions request is necessary for launching the image library
    let file = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      //console.log(file.uri);
  
      if (!file.cancelled) {

        //making a blob response out of picked image
        const response = await fetch(file.uri);
        const blob2 = await response.blob();

        //add to firebase code
        const imagePath = file.uri;
        const storage = getStorage();
        const imageFormat = imagePath.substring(imagePath.length-3);
        var storageRef = ref(storage, uid + '/profilePicture/profilePhoto.'+imageFormat);

        uploadBytes(storageRef, blob2).then((snapshot) => {
            console.log('Profile photo successfuly uploaded :)');
        });
      }
}
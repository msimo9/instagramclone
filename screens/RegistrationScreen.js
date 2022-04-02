import { StyleSheet, Text, View, TextInput, TouchableOpacity, LogBox, Image} from 'react-native'
import React, {useEffect, useState} from 'react'
import registrationStyles from './styles/registrationStyle'
import InstagramLogoCursive from '../components/InstagramLogoCursive'
import BlueButton from '../components/BlueButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { handleUserSignUp, uploadDefaultProfilePicture } from '../firebase/writes';
import { getProfilePhoto, handleUserLogIn } from '../firebase/reads';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { saveUserID } from '../redux';

LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

const authObserver = () => {
  const dispatch = useDispatch();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user) {
      const userID = user.uid;
      dispatch(saveUserID(userID));
  } else {
  }
  });
}

const Footer = ({mode, changeMode}) => {
  return(
    <View style={registrationStyles.footer}>
      <Text style={registrationStyles.footerNormalText}>{mode === "signup" ? "Have an account?": "Don't have an account?"}</Text>
      <TouchableOpacity onPress={() => changeMode()} >
        <Text style={registrationStyles.footerLinkText}>{mode === "signup" ? "Log In": "Sign Up"}</Text>
      </TouchableOpacity>
    </View>
  )
}

const LogInForm = ({username, password, setUsername, setPassword}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  return(
    <View style={registrationStyles.formContainer}>
      <TextInput value={username} placeholder='Username' style={registrationStyles.input} placeholderTextColor={"#505050"} onChangeText={value => setUsername(value)}/>
      <View>
        <TextInput value={password} secureTextEntry={secureTextEntry} placeholder='Password' style={registrationStyles.input} placeholderTextColor={"#505050"} onChangeText={value => setPassword(value)}/>
        <TouchableOpacity style={registrationStyles.showPassword} onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Icon name={secureTextEntry ? "eye-outline" : "eye-off-outline"} size={16} color="#458eff" />
        </TouchableOpacity>
      </View>
      <View style={registrationStyles.forgottenPassword}>
        <Text style={registrationStyles.footerLinkText}>Forgotten password?</Text>
      </View>
    </View>
  )
}

const SignUpForm = ({setEmail, setFullName, setUsername, setPassword}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  return(
    <View style={registrationStyles.formContainer}>
      <TextInput placeholder='Mobile Number or Email' style={registrationStyles.input} placeholderTextColor={"#505050"} onChangeText={value => setEmail(value)}/>
      <TextInput placeholder='Full Name' style={registrationStyles.input} placeholderTextColor={"#505050"} onChangeText={value => setFullName(value)}/>
      <TextInput placeholder='Username' style={registrationStyles.input} placeholderTextColor={"#505050"} onChangeText={value => setUsername(value)}/>
      <View>
        <TextInput secureTextEntry={secureTextEntry} placeholder='Password' style={registrationStyles.input} placeholderTextColor={"#505050"} onChangeText={value => setPassword(value)}/>
        <TouchableOpacity style={registrationStyles.showPassword} onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Icon name={secureTextEntry ? "eye-outline" : "eye-off-outline"} size={16} color="#458eff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const InnerContainer = ({mode, navigation}) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("user@user.com");
  const [password, setPassword] = useState("user1234");

  const dispatch = useDispatch();
  const savePhotoURI = (uri) => {dispatch(saveUserPhoto(uri));}

  const userSignUp = () => {handleUserSignUp(email, fullName, username, password, navigation, savePhotoURI);} 
  const userLogIn = () => {handleUserLogIn(username, password, navigation, savePhotoURI);} 

  return(
    <View style={registrationStyles.innerContainer} > 
      <InstagramLogoCursive />
      {
        mode === "signup"
          ? <SignUpForm setEmail={setEmail} setFullName={setFullName} setUsername={setUsername} setPassword={setPassword}/>
          : <LogInForm username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      }
      <BlueButton text={mode === "signup" ? "Sign Up" : "Log In"} action={mode === "signup" ? () => userSignUp() : () => userLogIn()} />
      <View style={{width: "100%", justifyContent: "center", alignItems: "center",}}>
        <Text style={[registrationStyles.footerNormalText, {marginVertical: 15,}]}>OR</Text>
        <TouchableOpacity onPress={() => null} style={{width: "100%"}}>
          <View style={{width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
            <Icon name="logo-facebook" size={16} color="#458eff" />
            <Text style={[registrationStyles.footerLinkText, {marginLeft: 5, fontWeight: "bold"}]}>
              {
              mode == "signup"
              ? "Sign Up with Facebook"
              : "Log In with Facebook"
              }
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const RegistrationScreen = ({route, navigation}) => {
  authObserver();
  let { mode } = route.params;
  mode = JSON.stringify(mode);
  mode = mode.slice(1,-1);
  const [formMode, setFormMode] = useState(mode);
  const changeMode = () => {
    if(formMode === "signup") setFormMode("login");
    else setFormMode("signup");
  }


  authObserver();

  useEffect(() => {
  }, [formMode])

  return (
    <View style={registrationStyles.container}>
      <InnerContainer mode={formMode} navigation={navigation} />
      <Footer mode={formMode} changeMode={changeMode}/>
    </View>
  )
}

export default RegistrationScreen;
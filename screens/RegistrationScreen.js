import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import registrationStyles from './styles/registrationStyle'
import InstagramLogoCursive from '../components/InstagramLogoCursive'
import BlueButton from '../components/BlueButton';
import Icon from 'react-native-vector-icons/Ionicons';
import { handleUserSignUp } from '../firebase/writes';

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

const LogInForm = () => {
  return(
    <View style={registrationStyles.formContainer}>
      <TextInput placeholder='Username' style={registrationStyles.input} placeholderTextColor={"#505050"}/>
      <TextInput placeholder='Password' style={registrationStyles.input} placeholderTextColor={"#505050"}/>
      <View style={registrationStyles.forgottenPassword}>
        <Text style={registrationStyles.footerLinkText}>Forgotten password?</Text>
      </View>
    </View>
  )
}

const SignUpForm = ({setEmail, setFullName, setUsername, setPassword}) => {
  return(
    <View style={registrationStyles.formContainer}>
      <TextInput placeholder='Mobile Number or Email' style={registrationStyles.input} placeholderTextColor={"#505050"} onChangeText={value => setEmail(value)}/>
      <TextInput placeholder='Full Name' style={registrationStyles.input} placeholderTextColor={"#505050"} onChangeText={value => setFullName(value)}/>
      <TextInput placeholder='Username' style={registrationStyles.input} placeholderTextColor={"#505050"} onChangeText={value => setUsername(value)}/>
      <TextInput placeholder='Password' style={registrationStyles.input} placeholderTextColor={"#505050"} onChangeText={value => setPassword(value)}/>
    </View>
  );
}

const InnerContainer = ({mode}) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return(
    <View style={registrationStyles.innerContainer} > 
      <InstagramLogoCursive />
      {
        mode === "signup"
          ? <SignUpForm setEmail={setEmail} setFullName={setFullName} setUsername={setUsername} setPassword={setPassword}/>
          : <LogInForm />
      }
      <BlueButton text={mode === "signup" ? "Sign Up" : "Log In"} action={mode === "signup" ? () => handleUserSignUp(email, fullName, username, password) : null} />
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
  let { mode } = route.params;
  mode = JSON.stringify(mode);
  mode = mode.slice(1,-1);
  const [formMode, setFormMode] = useState(mode);

  const changeMode = () => {
    if(formMode === "signup") setFormMode("login");
    else setFormMode("signup");
  }

  useEffect(() => {
  }, [formMode])

  return (
    <View style={registrationStyles.container}>
      <InnerContainer mode={formMode}/>
      <Footer mode={formMode} changeMode={changeMode}/>
    </View>
  )
}

export default RegistrationScreen;
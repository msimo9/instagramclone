import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import welcomeStyles from './styles/welcomeStyle'
import BlueButton from '../components/BlueButton'
import InstagramLogoCursive from '../components/InstagramLogoCursive'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { saveUserID } from '../redux';

const InnerContainer = ({navigation}) => {
  return(
    <View style={welcomeStyles.innerContainer}>
      {/*<Image source={require('../assets/ig-logo-cursive.png')} style={welcomeStyles.logo}/>*/}
      <InstagramLogoCursive />
      <View style={{width: "100%", marginVertical: 15,}}>
      <BlueButton text={"Create New Account"} action={() => navigation.navigate("Registration", {
        mode: "signup"
      })}/>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Registration", {
        mode: "login"
      })}>
        <Text style={welcomeStyles.logInText}>Log In</Text>
      </TouchableOpacity>
    </View>
  )
}

const WelcomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user) {
      const userID = user.uid;
      dispatch(saveUserID(userID));
  } else {
  }
  });
  return (
    <View style={welcomeStyles.container}>
      <InnerContainer navigation={navigation}/>
    </View>
  )
}

export default WelcomeScreen
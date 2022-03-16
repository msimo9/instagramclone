import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const InstagramLogoCursive = () => {
  return (
    <Image source={require('../assets/ig-logo-cursive.png')} style={styles.logo}/>
  )
}

export default InstagramLogoCursive

const styles = StyleSheet.create({
    logo:{
        resizeMode: 'contain',
        height: "12%",
        marginVertical: 15,
    }
})
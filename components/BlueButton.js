import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'

const BlueButton = ({text, action}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={action}>
        <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default BlueButton

const styles = StyleSheet.create({
    container:{
        width: "100%",
        height: 40,
        backgroundColor: "#458eff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
    },
    text:{
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 12,
    }
})
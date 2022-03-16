import { StyleSheet } from "react-native";
import { Dimensions } from "react-native-web";

const welcomeStyles = StyleSheet.create({
    container:{
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
    innerContainer:{
        width: "90%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
    },
    logInText:{
        color: "#458eff",
        marginVertical: 15,
    },
    logo:{
        resizeMode: 'contain',
        height: "20%",
        marginVertical: 15,
    }

});

export default welcomeStyles;
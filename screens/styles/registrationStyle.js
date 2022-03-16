import { StyleSheet } from "react-native";

const registrationStyles = StyleSheet.create({
    container:{
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer:{
        width: "90%",
        height: "60%",
        alignItems: "center",
    },
    formContainer:{
        width: "100%",
        marginBottom: "10%"
    },
    input:{
        width: "100%",
        color: "#ffffff",
        backgroundColor: "#030303",
        borderColor: "#808080",
        borderWidth: 0.5,
        height: 40,
        borderRadius: 5,
        marginVertical: 3,
        paddingHorizontal: 5,
    },
    footer:{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "5%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    footerNormalText:{
        color: "gray",
        marginRight: 5,
        fontSize: 12,
    },
    footerLinkText:{
        color: "#458eff",
        fontSize: 12,
    },
    forgottenPassword:{
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-end",
        marginVertical: 5,
    }
});

export default registrationStyles;
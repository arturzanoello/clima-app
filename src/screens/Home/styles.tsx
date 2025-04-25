import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#d4d4d4",
    },
    containerSearch: {
        marginVertical: 20,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#777",
        borderWidth: 1,
        borderRadius: 10,
        width: 250,
    },
    TextInput: {
        backgroundColor: "#fffff",
        borderStyle: "solid",
        padding: 10,
        fontSize: 16,
        width: 200,
    },
    containerLocation: {
        backgroundColor: "#777",
        padding: 10,
        width: 250,
        borderRadius: 10,
        marginBottom: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    textLocation: {
        color: "#fff",
        textAlign: "center"
    }
})
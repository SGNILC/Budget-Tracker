import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../constants/themes";

export default function Button({
    title,
    onPress,
    style, // Used to change background color (e.g., Orange or White)
    textStyle // Used to change text color (e.g., Teal or White)
}) {
    return (
        <TouchableOpacity 
            style={[styles.button, style]} 
            onPress={onPress}
            activeOpacity={0.7} // Adds a nice subtle fade when pressed
        >
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        // Defaulting to the Teal Primary
        backgroundColor: colors.primary, 
        // Increased to 20 or 25 for that "pill" look in your screenshot
        borderRadius: 20, 
        // More vertical padding for a "thicker" professional feel
        paddingVertical: 16, 
        alignItems: "center",
        justifyContent: "center",
        // Standardize width for action rows
        flex: 1, 
        // Soft shadow to match the Cards
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    text: {
        color: colors.white,
        fontSize: 16, // Matches the "Save" text size
        fontWeight: "700", // Bold and punchy
    },
});
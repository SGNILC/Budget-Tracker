import { StyleSheet, View } from "react-native";
import { colors, spacing } from "../../constants/themes";

export default function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    // Increased to 30 to match the "Scan Receipt" and "Input" rounding
    borderRadius: 20, 
    // Spacing inside the card
    padding: spacing.md, 
    marginBottom: spacing.md,
        
    // Ensure content stays within the rounded corners
    overflow: 'hidden', 
  },
});
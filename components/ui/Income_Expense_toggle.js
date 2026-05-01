import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fontSizes, spacing } from "../../constants/themes";

export default function IncomeExpenseToggle({ value, onChange }) {
  return (
    <View style={styles.typeRow}>
      {/* INCOME BUTTON */}
      <TouchableOpacity
        style={[styles.typeButton, value === "income" && styles.activeButton]}
        onPress={() => onChange("income")}
      >
        <Text style={[styles.typeText, value === "income" && styles.activeText]}>
          {/* Force the color to green (colors.income) */}
          <Text style={[styles.arrow, { color: colors.income }]}>↗</Text> Income
        </Text>
      </TouchableOpacity>

      {/* EXPENSE BUTTON */}
      <TouchableOpacity
        style={[styles.typeButton, value === "expense" && styles.activeButton]}
        onPress={() => onChange("expense")}
      >
        <Text style={[styles.typeText, value === "expense" && styles.activeText]}>
          {/* Force the color to red (colors.expense) */}
          <Text style={[styles.arrow, { color: colors.expense }]}>↘</Text> Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  typeRow: {
    flexDirection: "row",
    backgroundColor: colors.white, // Ensure this is white!
    borderRadius: 20,
    padding: 5,
    marginBottom: spacing.md,
    width: '100%', // Makes it match Input length
  },
  typeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 18,
  },
  activeButton: {
    backgroundColor: colors.activeBlue, // This should be the #0061FF blue
  },
  typeText: {
    color: colors.textDark,
    fontSize: fontSizes.regular,
    fontWeight: "600",
  },
  activeText: {
    color: colors.white, // Label text turns white on blue background
  },
  arrow: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 5,
  }
});
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../../components/ui/Card";
import { colors, fontSizes, spacing } from "../../constants/themes";
import { deleteTransaction, getTransactions } from "../../db/database";

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setTransactions(getTransactions());
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>
      
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false} // Cleaner look
        renderItem={({ item }) => (
          <Card style={styles.cardOverride}>
            <TouchableOpacity
              style={styles.rowContent}
              onLongPress={() => {
                deleteTransaction(item.id);
                setTransactions(getTransactions());
              }}
            >
              {/* Left Column: Description and Date */}
              <View style={styles.leftColumn}>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>

              {/* Right Column: Category and Amount */}
              <View style={styles.rightColumn}>
                <Text style={styles.category}>{item.category}</Text>
                <Text
                  style={[
                    styles.amount,
                    item.type === "expense" ? styles.expenseText : styles.incomeText,
                  ]}
                >
                  {item.type === "expense" ? "-" : "+"} ${item.amount.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No transactions yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.statusBarHeight, // Uses the 60px buffer we added to theme
    backgroundColor: colors.primary, // THE VIBRANT TEAL
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  cardOverride: {
    // Overriding Card.jsx defaults if needed, but Card.jsx already has 30px radius
    marginBottom: 12,
    padding: 18,
  },
  rowContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
    alignItems: "flex-end",
  },
  description: {
    color: colors.textDark,
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 4,
  },
  date: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  category: {
    color: colors.activeBlue, // Blue from your design
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  amount: {
    fontWeight: "800",
    fontSize: 16,
  },
  expenseText: {
    color: colors.expense, // The vibrant red from theme
  },
  incomeText: {
    color: colors.income, // The vibrant green/teal from theme
  },
  empty: {
    color: colors.white,
    textAlign: "center",
    marginTop: 50,
    fontSize: fontSizes.regular,
    opacity: 0.8,
  },
});
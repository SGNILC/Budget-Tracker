/**
 * @View used to group elements (similar to div)
 * @Text displays the text
 * @FlatList to render the list of transactions
 * @StyleSheet allows for style to be defined, similar to CSS
 * @TouchableOpacity adds reactivity to the specified element
 */
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

/**
 * @getTransactions function to fetch transactions from the database
 * @deleteTransaction funciton to delete transactions
 */
import { deleteTransaction, getTransactions } from "../../db/database";
/**
 * @useFocusEffect rerenders the screen
 * @useCallback prevents infinite loops in the render
 * 
 */
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

// rendering the screen
export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setTransactions(getTransactions());
    }, []),
  );
  // the rendered list
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}
          onLongPress={() => {
            deleteTransaction(item.id);
            setTransactions(getTransactions());
          }}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text
            style={[
              styles.amount,
              item.type == "expense" ? styles.expense : styles.income,
            ]}
          >
            {item.type === "expense" ? "-" : "+"} ${item.amount.toFixed(2)}
          </Text>
        </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}> No transactions yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#00D09E", // light gray background
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  row: {
    backgroundColor: "#F1FFF3",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2, // Android shadow
  },
  date: {
    flex: 1.2,
    color: "#888",
    fontSize: 13,
  },
  description: {
    flex: 2,
    color: "#222",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },
  category: {
    flex: 1.5,
    color: "#2196F3",
    fontSize: 13,
    marginLeft: 8,
  },
  amount: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "right",
    marginLeft: 8,
  },
  expense: {
    color: "#F44336",
  },
  income: {
    color: "#4CAF50",
  },
  empty: {
    color: "#888",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
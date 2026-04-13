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
              {item.type === "expense" ? "-" : "+"} $
              {item.amount.toFixed(2)}{" "}
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
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  row: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
  },
  category: {
    fontSize: 12,
    color: "#666",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },
  expense: {
    color: "red",
  },
  income: {
    color: "green",
  },
  empty: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 40,
  },
});

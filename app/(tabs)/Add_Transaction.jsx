// Important components to help render the screen based on query.

/**
 * @View used to group elements (similar to div)
 * @Text displays the text
 * @TextInput an input field to type into
 * @TouchableOpacity a button that can be pressed and is visually reacitve
 * @StyleSheet allows for style to be defined, similar to CSS
 */
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
/**
 * @useState stores the changing values of user input
 * @useEffect queries the db only once
 */
import { useEffect, useState } from "react";
/**
 * @initDB function to initialize the database
 * @addTransaction function to add a transaction
 */
import { addTransaction, initDB } from "../../db/database";

// a form that sets the user's transaction information into the respective fields

export default function AddTransaction() {
  const [date, setDate] = useState(""); // setter function is created by react
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense"); // preset so that the system defaults to only expenses (first) unless the user wants to add an income

  useEffect(() => {
    initDB();
  }, []);

  // Checking to save the user's input

  function handleSubmit() {
    if (!date || !amount || !description || !category) {
      alert("Please fill in all fields.");
      return;
    }

    if (isNaN(parseFloat(amount))) {
      alert("Amount must be a number");
      return;
    }

    // Save as a transaction
    addTransaction(date, parseFloat(amount), description, category, type);

    setDate("");
    setAmount("");
    setDescription("");
    setCategory("");
    setType("expense");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Add Transaction</Text>

      {/* Form Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Category (e.g., Food, Rent, Other)"
        value={category}
        onChangeText={setCategory}
      />

      {/* Radio Buttons */}
      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeButton, type === "expense" && styles.activeButton]}
          onPress={() => setType("expense")}
        >
          <Text style={styles.bodyText}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.typeButton, type === "income" && styles.activeButton]}
          onPress={() => setType("income")}
        >
          <Text style={styles.bodyText}>Income</Text>
        </TouchableOpacity>
      </View>

      {/* Button to Save Work */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  typeRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
  bodyText: {
    color: "white",
  },
});

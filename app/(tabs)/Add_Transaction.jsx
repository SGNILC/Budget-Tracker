import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import {
  ScrollView, // Added for scrollability
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { addTransaction, initDB } from "../../db/database"; //

export default function AddTransaction() {
  const [date, setDate] = useState(""); 
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense"); 
  const [showPicker, setShowPicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());

  useEffect(() => {
    initDB(); //
  }, []);

  function handleSubmit() {
    if (!date || !amount || !description || !category) {
      alert("Please fill in all fields.");
      return;
    }
    // Logic from db/database.js
    addTransaction(date, parseFloat(amount), description, category, type);
    
    // Reset state after save
    setDate(""); setAmount(""); setDescription(""); setCategory(""); setType("expense");
  }

  return (
    // style sets the background color, contentContainerStyle sets the internal padding
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" />
      
      <Text style={styles.title}>Add Transaction</Text>

      {/* Scan Receipt Card */}
      <TouchableOpacity style={styles.receiptContainer}>
        
        <View style={styles.receiptInner}>
          <Ionicons name="camera-outline" size={40} color="#555" />
          <Text style={styles.receiptText}>Scan Receipt</Text>
        </View>
      </TouchableOpacity>

      {/* Income / Expense Toggle */}
      <View style={styles.typeRow}>
        <TouchableOpacity
          style={[styles.typeButton, type === "income" && styles.incomeActive]}
          onPress={() => setType("income")}
        >
          <Text style={[styles.typeText, type === "income" && styles.activeText]}>
            <Text style={{fontSize: 18, color:'green'}}>↗</Text> Income
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.typeButton, type === "expense" && styles.expenseActive]}
          onPress={() => setType("expense")}
        >
          <Text style={[styles.typeText, type === "expense" && styles.activeText]}>
            <Text style={{fontSize: 18, color: 'red'}}>↘</Text> Expense
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          placeholderTextColor="#999"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          placeholderTextColor="#999"
          value={category}
          onChangeText={setCategory}
        />
        
        <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
          <Text style={{ color: date ? 'black' : '#999' }}>
            {date || 'YYYY-MM-DD'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Action Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={pickerDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setPickerDate(selectedDate);
              const iso = selectedDate.toISOString().split('T')[0];
              setDate(iso);
            }
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00D094", // Main Teal
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 60, // Pushes the content down from the time/battery bar
    paddingBottom: 40, // Ensures extra space at the bottom when scrolling
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  receiptContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    height: 200,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  receiptInner: {
    alignItems: "center",
  },
  receiptText: {
    marginTop: 10,
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  typeRow: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
    marginBottom: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 9,
    alignItems: "center",
    borderRadius: 15,
  },
  incomeActive: {
    backgroundColor: "#0061FF", // Blue for income selection
  },
  expenseActive: {
    backgroundColor: "#0061FF", // Blue for expense selection (matches your screenshot)
  },
  typeText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },
  activeText: {
    color: "white",
  },
  form: {
    gap: 12,
  },
  input: {
    backgroundColor: "#F1FFF8",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: "black",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  cancelText: {
    color: "#0000000",
    fontWeight: "600",
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#FF9F1C", // Orange
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
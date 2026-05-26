import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import IncomeExpenseToggle from "../../components/ui/Income_Expense_toggle";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/button";
import { addTransaction, initDB } from "../../db/database"; //
// import { useSafeAreaFrame } from 'react-native-safe-area-context';
// import { useRouter } from '@react-navigation/native';

export default function AddTransaction() {
  const [date, setDate] = useState(""); 
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense"); 
  const [showPicker, setShowPicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());
  const { amount:scannedAmount, date: scannedDate, description: scannedDescription, category: scannedCategory } = useLocalSearchParams();

  const amountRef = useRef(null);
  const descriptionRef = useRef(null);

  const CATEGORIES = ["Food","Rent", "Utilities", "Home","Travel", "Healthcare", "Other"].sort();
  const router = useRouter();


  useEffect(() => {
    initDB(); //
  }, []);

  useEffect(() => {
    if (scannedAmount) setAmount(scannedAmount);
    if (scannedDate) setDate(scannedDate);
    if (scannedDescription) setDescription(scannedDescription);
    if (scannedCategory) setCategory(scannedCategory);
  }, [scannedAmount, scannedDate, scannedDescription, scannedCategory]);

  function handleSubmit() {
    if (!date || !amount || !description || !category) {
      alert("Please fill in all fields.");
      return;
    }
    // Logic from db/database.js
    addTransaction(date, parseFloat(amount), description, category, type);
    // Reset state after save
    handleCancel();
  }

  function handleCancel() {
    setDate("");
    setAmount("");
    setDescription("");
    setCategory("");
    setType("expense");
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
      <TouchableOpacity style={styles.receiptContainer} onPress={() => {
        router.push("/modal/camera")
      }}>
        <View style={styles.receiptInner}>
          <Ionicons name="camera-outline" size={40} color="#555" />
          <Text style={styles.receiptText}>Scan Receipt</Text>
        </View>
      </TouchableOpacity>
     

      {/* Income / Expense Toggle */}
      <IncomeExpenseToggle value={type} onChange={setType} />

      {/* Input Fields */}
      <View style={styles.form}>
        <Input
          ref={amountRef}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current?.focus()}
          blurOnSubmit={false}
        />
        <Input
          ref={descriptionRef}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          returnKeyType="done"
        />
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={category}
            onValueChange={(val) => setCategory(val)}
            style={[styles.picker, { color: category ? "black" : "#999" }]}
            dropdownIconColor="black"
          >
            <Picker.Item label="Select a category" value="" color="#999" />
            {CATEGORIES.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
          <Text style={{ color: date ? 'black' : '#999' }}>
            {date || 'YYYY-MM-DD'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Action Row */}
      <View style={styles.actionRow}>
        <Button title="Cancel" onPress={handleCancel}
          style={styles.cancelButton} textStyle={styles.cancelText}/>
        <Button title="Save" onPress={handleSubmit}
          style={styles.saveButton} textStyle={styles.saveText}/>
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
  absoluteBlur: {
    ...StyleSheet.absoluteFillObject, // Makes blur cover the whole container
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: "#00D094", // Main Teal
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
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
  pickerWrapper: {
    backgroundColor: "#F1FFF8",
    borderRadius: 15,
    overflow: "hidden",
    height: 60, // Approximate height of the Input fields with padding
    justifyContent: "center",
    paddingHorizontal: 11, // Helps push the inner picker to align with 18px padding of inputs
  },
  picker: {
    // We handle text color dynamically inline now
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
    marginVertical: 0,
  },
  cancelText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#FF9F1C",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 0,
  },
  saveText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
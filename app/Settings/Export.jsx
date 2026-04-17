import DateTimePicker from "@react-native-community/datetimepicker";
import * as Sharing from 'expo-sharing';
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getTransactionsByRange } from "../../db/database";
// We import the legacy API specifically to avoid SDK 54 object errors
import * as FileSystem from 'expo-file-system/legacy';

export default function Export() {
    const [fromDate, setFromDate] = useState(''); 
    const [toDate, setToDate] = useState('');     
    const [showFromPicker, setShowFromPicker] = useState(false);
    const [showToPicker, setShowToPicker] = useState(false);

    const formatDate = (date) => date.toISOString().split('T')[0];

    async function handleExport() {
        if (!fromDate || !toDate) {
            Alert.alert('Missing Dates', 'Please select both start and end dates.');
            return;
        }

        const fromYYYYMM = fromDate.substring(0, 7);
        const toYYYYMM = toDate.substring(0, 7);

        if (toDate < fromDate) {
            Alert.alert('Invalid Range', 'The start date must be before the end date.');
            return;
        }

        try {
            const transactions = await getTransactionsByRange(fromYYYYMM, toYYYYMM);
            
            if (!transactions || transactions.length === 0) {
                Alert.alert('No Data', 'No transactions found.');
                return;
            }

            // Build CSV
            const csv = "Date,Amount,Description,Category,Transaction Type\n" + 
                        transactions.map(t => `${t.date},${t.amount},${t.description},${t.category},${t.type}`).join("\n");

            const fileName = `transactions_${fromYYYYMM}.csv`;
            // Use the standard string-based pathing
            const fileUri = FileSystem.documentDirectory + fileName;

            // Write using the legacy method (passing 'utf8' directly)
            await FileSystem.writeAsStringAsync(fileUri, csv, {
                encoding: 'utf8',
            });

            const isAvailable = await Sharing.isAvailableAsync();
            if (isAvailable) {
                await Sharing.shareAsync(fileUri, {
                    mimeType: 'text/csv',
                    dialogTitle: 'Export Transactions',
                    UTI: 'public.comma-separated-values-text',
                });
            }
        } catch (error) {
            console.error("Export Error:", error);
            Alert.alert("Export Error", error.message || "Failed to save file.");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Export Data</Text>

            <Text style={styles.bodyText}>From:</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowFromPicker(true)}>
                <Text style={{ color: fromDate ? 'black' : '#999' }}>
                    {fromDate || 'Select Start Date'}
                </Text>
            </TouchableOpacity>
            
            {showFromPicker && (
                <DateTimePicker
                    value={fromDate ? new Date(fromDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowFromPicker(false);
                        if (selectedDate) setFromDate(formatDate(selectedDate));
                    }}
                />
            )}

            <Text style={styles.bodyText}>To:</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowToPicker(true)}>
                <Text style={{ color: toDate ? 'black' : '#999' }}>
                    {toDate || 'Select End Date'}
                </Text>
            </TouchableOpacity>

            {showToPicker && (
                <DateTimePicker
                    value={toDate ? new Date(toDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowToPicker(false);
                        if (selectedDate) setToDate(formatDate(selectedDate));
                    }}
                />
            )}

            <TouchableOpacity style={styles.saveButton} onPress={handleExport}>
                <Text style={styles.saveText}>Generate CSV & Export</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#121212' },
    title: { color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    bodyText: { color: "white", marginBottom: 8 },
    input: { backgroundColor: "white", borderRadius: 8, padding: 12, marginBottom: 20, justifyContent: 'center' },
    saveButton: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
    saveText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
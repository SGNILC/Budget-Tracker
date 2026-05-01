/**
 * @router used to navigate between screens programmatically
 */
import { router } from "expo-router";
/**
 * @StyleSheet allows for styles to be defined, similar to CSS
 * @Text displays text
 * @TouchableOpacity a button that can be pressed and is visually reactive
 * @View used to group elements (similar to div)
 */
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, spacing, fontSizes } from "../../constants/themes";
import Button from "../../components/ui/button";


export default function Settings() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <TouchableOpacity style={styles.row} onPress={() => router.push('/Settings/Profile')}>
        <Text style={styles.rowText}>Profile</Text>
        <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => router.push('/Settings/Currency')}>
        <Text style={styles.rowText}>Currency</Text>
        <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => router.push('/Settings/Export')}>
        <Text style={styles.rowText}>Export Transactions</Text>
        <Text style={styles.arrow}>›</Text>
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
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center"
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: "black",
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
   row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  rowText: {
    color: 'white',
    fontSize: 14,
    fontWeight: "normal",
  },
  arrow: {
    fontSize: 20,
    color: "#999",
  },
});
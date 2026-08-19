/**
 * @router used to navigate between screens programmatically
 */
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


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
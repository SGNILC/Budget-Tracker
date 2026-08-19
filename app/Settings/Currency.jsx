import { StyleSheet, Text, View } from 'react-native';
export default function Currency(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Coming Soon...</Text>
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
});
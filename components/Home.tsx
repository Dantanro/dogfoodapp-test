import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  ProductDetails: { barcode: string };
};

type HomeProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const Home: React.FC<HomeProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>pawdi</Text>
    <Text style={styles.subtitle}>Scan your dog food to see details</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('Scan')}
    >
      <Text style={styles.buttonText}>Scan Dog Food</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 16, color: "#4caf50" },
  subtitle: { fontSize: 18, color: "#888", marginBottom: 32 },
  button: { backgroundColor: "#4caf50", padding: 16, borderRadius: 8 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default Home;
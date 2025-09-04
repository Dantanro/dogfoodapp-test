import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  section: { fontWeight: "bold", fontSize: 18, marginBottom: 8, color: "#e53935" },
  row: { marginBottom: 16, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
  labelValue: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  label: { fontSize: 16, fontWeight: "bold", marginRight: 12 },
  value: { fontSize: 16, color: "#333", fontWeight: "600" },
  description: { fontSize: 14, color: "#888", marginLeft: 2 },
});

type Negative = {
  label: string;
  value: string | number;
  color: string;
  description: string;
};

type NegativesListProps = {
  negatives: Negative[];
};

const NegativesList: React.FC<NegativesListProps> = ({ negatives }) => (
  <View>
    <Text style={styles.section}>Negatives</Text>
    {negatives.map((item, idx) => (
      <View key={idx} style={styles.row}>
        <View style={styles.labelValue}>
          <Text style={[styles.label, { color: item.color }]}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    ))}
  </View>
);

export default NegativesList;
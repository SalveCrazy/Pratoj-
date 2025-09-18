// screens/HomeAdm.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeAdm() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do Administrador 🔐</Text>
      <Text>Aqui você gerencia alunos e tickets.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});

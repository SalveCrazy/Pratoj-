// screens/HomeAluno.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeAluno({ route }) {
  const { aluno } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {aluno.nome} 👋</Text>
      <Text>Aqui você verá seus tickets disponíveis.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});

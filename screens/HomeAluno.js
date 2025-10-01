// screens/HomeAluno.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeAluno({ route, navigation }) {
  // Recebe os dados do aluno passados na rota
  const { aluno } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo(a), {aluno.nome} 👋</Text>
      <Text style={styles.subtitle}>Matrícula: {aluno.matricula}</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#007AFF" }]}
        onPress={() => navigation.navigate("Ticket", { matricula: aluno.matricula })} // Passa a matrícula
      >
        <Text style={styles.buttonText}>🎟️ Receber Ticket</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#34C759" }]}
        onPress={() => navigation.navigate("Intervalo")}
      >
        <Text style={styles.buttonText}>🕒 Status do Intervalo</Text>
      </TouchableOpacity>
      
      {/* Botão para simular o uso de Localização, para fins de demonstração */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#FF9500" }]}
        onPress={() => alert("Simulando verificação de Localização...")}
      >
        <Text style={styles.buttonText}>📍 Minha Localização</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#D62828", marginTop: 40 }]}
        onPress={() => navigation.navigate("HomeMenu")} // Volta para a tela de Menu Inicial
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5", alignItems: 'center' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 5, textAlign: "center" },
  subtitle: { fontSize: 16, marginBottom: 30, textAlign: "center", color: '#555' },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
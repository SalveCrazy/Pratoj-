import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ValidacaoScreen({ navigation }) {
  const [ticketStatus, setTicketStatus] = useState("Nenhum ticket encontrado");
  const [matricula, setMatricula] = useState(null);

  useEffect(() => {
    const loadTicket = async () => {
      const recebido = await AsyncStorage.getItem("ticketData");
      if (recebido) {
        const { date, usado, aluno } = JSON.parse(recebido);
        const hoje = new Date().toLocaleDateString();
        if (date === hoje) {
          setMatricula(aluno || "Aluno não identificado");
          setTicketStatus(usado ? "❌ Ticket já usado" : "✅ Ticket disponível");
        }
      }
    };
    loadTicket();
  }, []);

  const handleUsarTicket = async () => {
    const recebido = await AsyncStorage.getItem("ticketData");
    if (!recebido) {
      Alert.alert("Erro", "Nenhum ticket para validar.");
      return;
    }

    const { date, aluno } = JSON.parse(recebido);
    const hoje = new Date().toLocaleDateString();

    if (date !== hoje) {
      Alert.alert("Erro", "Ticket não é válido para hoje.");
      return;
    }

    await AsyncStorage.setItem(
      "ticketData",
      JSON.stringify({ date: hoje, usado: true, aluno })
    );

    setTicketStatus("❌ Ticket já usado");
    Alert.alert("Sucesso", "Ticket validado e marcado como usado!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔎 Validação do Ticket</Text>
      <Text style={styles.info}>Aluno: {matricula || "Não informado"}</Text>
      <Text style={styles.status}>Status: {ticketStatus}</Text>

      {ticketStatus === "✅ Ticket disponível" && (
        <TouchableOpacity style={styles.button} onPress={handleUsarTicket}>
          <Text style={styles.buttonText}>Validar Ticket</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, { marginTop: 20, backgroundColor: "#007BFF" }]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#e8eaf6" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#1a237e" },
  info: { fontSize: 18, marginBottom: 10, color: "#333" },
  status: { fontSize: 18, marginBottom: 20, color: "#555" },
  button: { backgroundColor: "#3949ab", padding: 15, borderRadius: 8, width: "70%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

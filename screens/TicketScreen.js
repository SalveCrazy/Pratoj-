import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TicketScreen({ navigation }) {
  const [ticketStatus, setTicketStatus] = useState("Nenhum ticket recebido");
  const [naEscola, setNaEscola] = useState(false);
  const [podeReceber, setPodeReceber] = useState(false);

  const horaIntervalo = 10;
  const minutoIntervalo = 0;

  useEffect(() => {
    const checkHorario = () => {
      const agora = new Date();
      const h = agora.getHours();
      const m = agora.getMinutes();

      const diff = (horaIntervalo * 60 + minutoIntervalo) - (h * 60 + m);

      setPodeReceber(diff <= 5 && diff >= 0);
    };

    checkHorario();
    const timer = setInterval(checkHorario, 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadTicket = async () => {
      const hoje = new Date().toLocaleDateString();
      const recebido = await AsyncStorage.getItem("ticketData");
      if (recebido) {
        const { date } = JSON.parse(recebido);
        if (date === hoje) setTicketStatus("✅ Ticket disponível");
      }
    };
    loadTicket();
  }, []);

  const handleReceberTicket = async () => {
    if (!naEscola) {
      Alert.alert("Erro", "Você precisa estar na escola para receber o ticket!");
      return;
    }

    const hoje = new Date().toLocaleDateString();
    const recebido = await AsyncStorage.getItem("ticketData");
    if (recebido && JSON.parse(recebido).date === hoje) {
      Alert.alert("Aviso", "Você já recebeu um ticket hoje!");
      return;
    }

    await AsyncStorage.setItem("ticketData", JSON.stringify({ date: hoje }));
    setTicketStatus("✅ Ticket disponível");
    Alert.alert("Sucesso", "Ticket recebido com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎟️ Recebimento de Ticket</Text>
      <Text style={styles.status}>Status: {ticketStatus}</Text>

      <TouchableOpacity
        style={[styles.toggleButton, naEscola ? styles.inSchool : styles.outSchool]}
        onPress={() => setNaEscola(!naEscola)}
      >
        <Text style={styles.toggleText}>
          {naEscola ? "📍 Estou na Escola" : "🚶‍♂️ Não estou na Escola"}
        </Text>
      </TouchableOpacity>

      {podeReceber && (
        <TouchableOpacity style={styles.button} onPress={handleReceberTicket}>
          <Text style={styles.buttonText}>Receber Ticket</Text>
        </TouchableOpacity>
      )}

      {/* Botão para voltar para Login */}
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
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3e5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#4a148c" },
  status: { fontSize: 18, marginBottom: 20, color: "#333" },
  toggleButton: { padding: 15, borderRadius: 8, marginBottom: 20, width: "70%", alignItems: "center" },
  inSchool: { backgroundColor: "#81c784" },
  outSchool: { backgroundColor: "#e57373" },
  toggleText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  button: { backgroundColor: "#7b1fa2", padding: 15, borderRadius: 8, width: "70%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

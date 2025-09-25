import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TicketScreen({ navigation, route }) {
  const [ticketStatus, setTicketStatus] = useState("Nenhum ticket recebido");
  const [naEscola, setNaEscola] = useState(false);
  const [podeReceber, setPodeReceber] = useState(false);

  const horaIntervalo = 10;
  const minutoIntervalo = 0;

  
  const { matricula } = route.params || {};
  const [alunoNome, setAlunoNome] = useState("");

  useEffect(() => {
    
    const loadAluno = async () => {
      const data = await AsyncStorage.getItem("alunos");
      if (data) {
        const lista = JSON.parse(data);
        const achado = lista.find(a => a.matricula === matricula);
        if (achado) setAlunoNome(achado.nome);
      }
    };
    if (matricula) loadAluno();
  }, [matricula]);

  
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
        const { date, aluno, matricula } = JSON.parse(recebido);
        if (date === hoje) setTicketStatus(`✅ Ticket disponível para ${aluno || matricula}`);
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

    
    const ticketAtual = { date: hoje, aluno: alunoNome || "Aluno", matricula, usado: false };
    await AsyncStorage.setItem("ticketData", JSON.stringify(ticketAtual));

   
    const listaTickets = JSON.parse(await AsyncStorage.getItem("tickets")) || [];
    listaTickets.push(ticketAtual);
    await AsyncStorage.setItem("tickets", JSON.stringify(listaTickets));

    setTicketStatus(`✅ Ticket disponível para ${alunoNome || matricula}`);
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4a148c",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});

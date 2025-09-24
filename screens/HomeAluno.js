// screens/HomeAluno.js
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";

export default function HomeAluno({ route }) {
  const { aluno } = route.params;

  // Lista de tickets fake
  const [tickets, setTickets] = useState([
    { id: "1", nome: "Ticket Aula de Matemática", status: "Disponível" },
    { id: "2", nome: "Ticket Aula de História", status: "Recebido" },
    { id: "3", nome: "Ticket Aula de Química", status: "Disponível" },
  ]);

  const receberTicket = (ticketId) => {
    setTickets((prevTickets) =>
      prevTickets.map((t) =>
        t.id === ticketId
          ? { ...t, status: t.status === "Disponível" ? "Recebido" : t.status }
          : t
      )
    );
    Alert.alert("Sucesso!", "Você recebeu o ticket 😎");
  };

  const renderTicket = ({ item }) => (
    <View style={styles.ticketCard}>
      <Text style={styles.ticketNome}>{item.nome}</Text>
      <Text style={styles.ticketStatus}>Status: {item.status}</Text>
      {item.status === "Disponível" && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => receberTicket(item.id)}
        >
          <Text style={styles.buttonText}>Receber Ticket</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {aluno.nome} 👋</Text>
      <Text style={styles.subtitle}>Aqui você verá seus tickets disponíveis:</Text>

      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={renderTicket}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 5, textAlign: "center" },
  subtitle: { fontSize: 16, marginBottom: 15, textAlign: "center" },

  ticketCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ticketNome: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  ticketStatus: { fontSize: 14, marginBottom: 10 },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

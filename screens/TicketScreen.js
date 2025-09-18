import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TicketScreen() {
  const [canReceive, setCanReceive] = useState(false);
  const [ticketAvailable, setTicketAvailable] = useState(false);
  const [inSchool, setInSchool] = useState(false);

  const intervaloHora = 10; // intervalo às 10h
  const intervaloMinuto = 0;

  // Verifica se o aluno já pegou ticket hoje
  useEffect(() => {
    const checkTicket = async () => {
      const today = new Date().toDateString();
      const lastTicket = await AsyncStorage.getItem("lastTicket");
      if (lastTicket === today) {
        setTicketAvailable(true);
      }
    };
    checkTicket();
  }, []);

  // Verifica se estamos dentro da janela de 5 minutos antes do intervalo
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();

      if (
        hour === intervaloHora &&
        minutes <= intervaloMinuto &&
        minutes >= intervaloMinuto - 5
      ) {
        setCanReceive(true);
      } else {
        setCanReceive(false);
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 1000 * 30); // checa a cada 30s
    return () => clearInterval(interval);
  }, []);

  // Função para receber ticket
  const handleReceiveTicket = async () => {
    if (ticketAvailable) {
      alert("Você já pegou seu ticket hoje!");
      return;
    }
    if (!inSchool) {
      alert("Você precisa estar na escola para pegar o ticket.");
      return;
    }
    const today = new Date().toDateString();
    await AsyncStorage.setItem("lastTicket", today);
    setTicketAvailable(true);
    alert("Ticket recebido com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recebimento de Ticket</Text>

      <Button
        title={inSchool ? "Estou na escola ✅" : "Marcar presença na escola"}
        onPress={() => setInSchool(!inSchool)}
      />

      {ticketAvailable ? (
        <Text style={styles.status}>🎟️ Ticket disponível</Text>
      ) : canReceive ? (
        <Button title="Receber Ticket" onPress={handleReceiveTicket} />
      ) : (
        <Text style={styles.status}>⏳ Aguardando horário do intervalo...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, marginBottom: 20, fontWeight: "bold" },
  status: { marginTop: 20, fontSize: 16 },
});

// screens/IntervaloScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IntervaloScreen() {
  const [status, setStatus] = useState("");
  const [tempoRestante, setTempoRestante] = useState("");

  // Define o horário do intervalo (exemplo: 10:00 até 10:15)
  const horaInicio = 10;
  const minutoInicio = 0;
  const duracao = 15; // minutos

  useEffect(() => {
    const verificarIntervalo = () => {
      const agora = new Date();
      const minutosAtuais = agora.getHours() * 60 + agora.getMinutes();
      const inicio = horaInicio * 60 + minutoInicio;
      const fim = inicio + duracao;

      if (minutosAtuais >= inicio && minutosAtuais < fim) {
        setStatus("✅ Intervalo Ativo");
        setTempoRestante(`${fim - minutosAtuais} min restantes`);
      } else if (minutosAtuais < inicio) {
        setStatus("⏳ Aguardando Intervalo");
        setTempoRestante(`Faltam ${inicio - minutosAtuais} min`);
      } else {
        setStatus("❌ Intervalo Encerrado");
        setTempoRestante("Volte amanhã 😅");
      }
    };

    verificarIntervalo();
    const timer = setInterval(verificarIntervalo, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕒 Intervalo</Text>
      <Text style={styles.status}>{status}</Text>
      <Text style={styles.timer}>{tempoRestante}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  status: { fontSize: 20, marginBottom: 10 },
  timer: { fontSize: 18, color: "#555" },
});

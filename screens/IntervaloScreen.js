import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function IntervaloScreen() {
  const [status, setStatus] = useState("");
  const [tempoRestante, setTempoRestante] = useState("");

  const inicioH = 10, inicioM = 0; // 10:00
  const fimH = 10, fimM = 20;      // 10:20

  useEffect(() => {
    const atualizar = () => {
      const agora = new Date();
      const minutosAgora = agora.getHours() * 60 + agora.getMinutes();
      const inicio = inicioH * 60 + inicioM;
      const fim = fimH * 60 + fimM;

      if (minutosAgora >= inicio && minutosAgora < fim) {
        setStatus("✅ Intervalo ativo!");
        setTempoRestante(`${fim - minutosAgora} minutos restantes`);
      } else if (minutosAgora < inicio) {
        setStatus("⌛ Intervalo ainda não começou");
        setTempoRestante(`${inicio - minutosAgora} minutos até o intervalo`);
      } else {
        setStatus("⏱️ Intervalo já terminou");
        setTempoRestante("");
      }
    };

    atualizar();
    const timer = setInterval(atualizar, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏰ Tela do Intervalo</Text>
      <Text style={styles.status}>{status}</Text>
      <Text style={styles.timer}>{tempoRestante}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f1f8e9" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#33691e" },
  status: { fontSize: 18, marginBottom: 10 },
  timer: { fontSize: 16, color: "#555" },
});

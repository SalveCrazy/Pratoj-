import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const getToday = () => new Date().toLocaleDateString();

export default function TicketScreen({ route }) {
  const { matricula } = route.params || {};
  const [ticketStatus, setTicketStatus] = useState("Carregando...");
  const [naEscola, setNaEscola] = useState(false); 
  const [podeReceber, setPodeReceber] = useState(false);

  
  const horaIntervalo = 10;
  const minutoIntervalo = 0;
  const minutosLimiteReceber = 5; 

  
  useEffect(() => {
    const checkTicketStatus = async () => {
      if (!matricula) return;

      const ticketsData = await AsyncStorage.getItem("tickets");
      const tickets = ticketsData ? JSON.parse(ticketsData) : [];
      const hoje = getToday();

      
      const ticketDoAluno = tickets.find(
        (t) => t.matricula === matricula && t.date === hoje
      );

      if (ticketDoAluno) {
        setTicketStatus(
          ticketDoAluno.usado 
            ? "❌ Ticket Usado Hoje" 
            : "✅ Ticket Disponível"
        );
      } else {
        setTicketStatus("Ainda não recebeu o ticket hoje");
      }
    };
    
    checkTicketStatus();
    
    const intervalId = setInterval(checkTicketStatus, 5000); 
    return () => clearInterval(intervalId);
  }, [matricula]);

  
  useEffect(() => {
    const checkHorario = () => {
      const agora = new Date();
      const h = agora.getHours();
      const m = agora.getMinutes();
      
      const tempoTotalAtual = h * 60 + m;
      const tempoTotalIntervalo = horaIntervalo * 60 + minutoIntervalo;
      
      
      const diff = tempoTotalIntervalo - tempoTotalAtual; 
      
     
      setPodeReceber(diff <= minutosLimiteReceber && diff > 0); 
    };
    checkHorario();
    const timer = setInterval(checkHorario, 5000); 
    return () => clearInterval(timer);
  }, []);

  
  const handleReceberTicket = async () => {
    if (!podeReceber) {
        Alert.alert("Erro", `Você só pode receber o ticket nos ${minutosLimiteReceber} minutos antes do intervalo (${horaIntervalo}:${minutoIntervalo.toString().padStart(2, '0')}).`);
        return;
    }
    
    if (!naEscola) {
      Alert.alert("Erro", "Você precisa estar na escola (Localização) para receber o ticket!");
      return;
    }

    const hoje = getToday();
    const ticketsData = await AsyncStorage.getItem("tickets");
    const listaTickets = ticketsData ? JSON.parse(ticketsData) : [];

    
    const jaRecebeu = listaTickets.some(
      (t) => t.matricula === matricula && t.date === hoje
    );

    if (jaRecebeu) {
      Alert.alert("Aviso", "Você já recebeu um ticket hoje!");
      return;
    }

    
    const novoTicket = { 
        date: hoje, 
        matricula, 
        usado: false,
        horaRecebimento: new Date().toLocaleTimeString(),
    };
    
    listaTickets.push(novoTicket);
    await AsyncStorage.setItem("tickets", JSON.stringify(listaTickets));

    setTicketStatus("✅ Ticket Disponível");
    Alert.alert("Sucesso", "Ticket recebido com sucesso! Aproveite o intervalo!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎟️ Recebimento de Ticket</Text>
      
      <Text style={styles.infoText}>Matrícula: {matricula}</Text>
      <Text style={[styles.infoText, { marginBottom: 20 }]}>Status Atual: <Text style={{fontWeight: 'bold', color: ticketStatus.includes('Disponível') ? 'green' : 'red'}}>{ticketStatus}</Text></Text>

      {/* Simulação de Localização */}
      <TouchableOpacity
        style={[styles.toggleButton, naEscola ? styles.inSchool : styles.outSchool]}
        onPress={() => setNaEscola(!naEscola)}
      >
        <Text style={styles.toggleText}>
          {naEscola ? "📍 Localização: Estou na Escola" : "🚶‍♂️ Localização: Fora da Escola"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.smallText}>Clique acima para simular sua localização na escola.</Text>


      {/* Botão de Receber Ticket */}
      <TouchableOpacity 
        style={[
          styles.button, 
          { 
            backgroundColor: podeReceber && naEscola && !ticketStatus.includes('Disponível') ? "#4CAF50" : "#A9A9A9",
          }
        ]} 
        onPress={handleReceberTicket}
        disabled={!podeReceber || !naEscola || ticketStatus.includes('Disponível')}
      >
        <Text style={styles.buttonText}>
          {podeReceber ? "Receber Ticket" : `Recebimento em ${minutosLimiteReceber} min antes das ${horaIntervalo}:${minutoIntervalo.toString().padStart(2, '0')}`}
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  infoText: { fontSize: 16, marginBottom: 5 },
  smallText: { fontSize: 12, color: '#888', marginBottom: 20, textAlign: 'center' },
  toggleButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  inSchool: { backgroundColor: "#4CAF50" },
  outSchool: { backgroundColor: "#FFC107" },
  toggleText: { color: "#fff", fontWeight: "bold" },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToday = () => new Date().toLocaleDateString();

export default function ValidacaoScreen() {
    const [inputMatricula, setInputMatricula] = useState("");
    const [ticketInfo, setTicketInfo] = useState(null);
    const [alunoNome, setAlunoNome] = useState("---");

    const buscarTicket = async () => {
        if (!inputMatricula) {
            setTicketInfo(null);
            return Alert.alert("Erro", "Digite a matrícula para buscar.");
        }

        const ticketsData = await AsyncStorage.getItem("tickets");
        const tickets = ticketsData ? JSON.parse(ticketsData) : [];
        const hoje = getToday();

        // 1. Encontra o ticket do aluno para hoje
        const ticket = tickets.find(
            (t) => t.matricula === inputMatricula && t.date === hoje
        );
        
        // 2. Busca o nome do aluno
        const alunosData = await AsyncStorage.getItem("alunos");
        const alunos = alunosData ? JSON.parse(alunosData) : [];
        const aluno = alunos.find(a => a.matricula === inputMatricula);
        setAlunoNome(aluno ? aluno.nome : "Aluno não cadastrado");

        if (ticket) {
            setTicketInfo(ticket);
        } else {
            setTicketInfo({ matricula: inputMatricula, usado: true }); // Simula "já usado" para desabilitar o botão
            Alert.alert("Aviso", "Ticket não encontrado para esta matrícula hoje.");
        }
    };

    const handleUsarTicket = async () => {
        if (!ticketInfo || ticketInfo.usado) {
            Alert.alert("Erro", "Ticket não disponível ou já usado.");
            return;
        }

        const ticketsData = await AsyncStorage.getItem("tickets");
        let listaTickets = ticketsData ? JSON.parse(ticketsData) : [];

        // Atualiza o ticket na lista como 'usado: true'
        listaTickets = listaTickets.map(t => 
            t.matricula === ticketInfo.matricula && t.date === getToday()
                ? { ...t, usado: true } 
                : t
        );
        
        await AsyncStorage.setItem("tickets", JSON.stringify(listaTickets));
        
        // Atualiza o estado local
        setTicketInfo(prev => ({ ...prev, usado: true }));
        Alert.alert("Sucesso", `Ticket de ${alunoNome} validado e marcado como USADO!`);
    };
    
    // Status visual
    const statusText = ticketInfo 
        ? (ticketInfo.usado ? "❌ USADO HOJE" : "✅ DISPONÍVEL") 
        : "Aguardando busca...";
    const statusColor = ticketInfo 
        ? (ticketInfo.usado ? "#D62828" : "#4CAF50") 
        : "#888";


    return (
        <View style={styles.container}>
            <Text style={styles.title}>🔎 Validação do Ticket</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Digite a Matrícula do Aluno"
                value={inputMatricula}
                onChangeText={setInputMatricula}
                keyboardType="numeric"
            />
            
            <TouchableOpacity style={styles.searchButton} onPress={buscarTicket}>
                <Text style={styles.buttonText}>Buscar Ticket</Text>
            </TouchableOpacity>

            <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Informações do Ticket:</Text>
                <Text style={styles.infoText}>Matrícula: {inputMatricula || '---'}</Text>
                <Text style={styles.infoText}>Nome: {alunoNome}</Text>
                <Text style={[styles.statusText, { color: statusColor }]}>Status: {statusText}</Text>
            </View>

            <TouchableOpacity 
                style={[
                    styles.validateButton, 
                    { 
                        backgroundColor: ticketInfo && !ticketInfo.usado ? "#007AFF" : "#A9A9A9" 
                    }
                ]} 
                onPress={handleUsarTicket}
                disabled={!ticketInfo || ticketInfo.usado} // Desabilita se não encontrou ou já foi usado
            >
                <Text style={styles.buttonText}>VALIDAR E USAR TICKET</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15, backgroundColor: '#fff' },
    searchButton: { 
        backgroundColor: "#FF9500", 
        padding: 12, 
        borderRadius: 8, 
        alignItems: "center", 
        marginBottom: 30 
    },
    buttonText: { color: "#fff", fontWeight: "bold" },
    infoBox: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 30,
    },
    infoTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    infoText: { fontSize: 16, marginBottom: 5 },
    statusText: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
    validateButton: {
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
});
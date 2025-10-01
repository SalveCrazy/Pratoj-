import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native'; // Para recarregar os dados ao focar na tela

const getToday = () => new Date().toLocaleDateString();

export default function AdmScreen() {
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [alunos, setAlunos] = useState([]);
    const [tickets, setTickets] = useState([]);

    const carregarDados = useCallback(async () => {
        const alunosSalvos = await AsyncStorage.getItem("alunos");
        const ticketsSalvos = await AsyncStorage.getItem("tickets");
        if (alunosSalvos) setAlunos(JSON.parse(alunosSalvos));
        
        // Filtra tickets apenas para o dia de hoje
        if (ticketsSalvos) {
            const listaTickets = JSON.parse(ticketsSalvos);
            const ticketsDeHoje = listaTickets.filter(t => t.date === getToday());
            setTickets(ticketsDeHoje);
        }
    }, []);

    // Recarrega os dados sempre que a tela for focada
    useFocusEffect(
        useCallback(() => {
            carregarDados();
        }, [carregarDados])
    );

    const salvarAluno = async () => {
        if (!nome || !matricula) return Alert.alert("Preencha todos os campos!");
        
        if (alunos.some(a => a.matricula === matricula)) {
            return Alert.alert("Erro", "Matrícula já cadastrada!");
        }

        const novo = { nome, matricula };
        const lista = [...alunos, novo];
        setAlunos(lista);
        await AsyncStorage.setItem("alunos", JSON.stringify(lista));
        setNome("");
        setMatricula("");
        Alert.alert("Sucesso!", "Aluno cadastrado com sucesso!");
    };

    const resetarTickets = async () => {
        // Remove apenas os tickets de hoje para resetar o dia
        const ticketsData = await AsyncStorage.getItem("tickets");
        const listaTickets = ticketsData ? JSON.parse(ticketsData) : [];
        const ticketsAnteriores = listaTickets.filter(t => t.date !== getToday());
        
        await AsyncStorage.setItem("tickets", JSON.stringify(ticketsAnteriores));
        setTickets([]);
        Alert.alert("Sucesso!", "Tickets de hoje foram resetados!");
    };
    
    // NOVO: Renderiza um item de ticket com status detalhado
    const renderTicketItem = ({ item }) => {
        const alunoInfo = alunos.find(a => a.matricula === item.matricula);
        const nomeAluno = alunoInfo ? alunoInfo.nome : 'Aluno não cadastrado';
        const statusText = item.usado ? '🚫 USADO' : '✅ RECEBIDO';
        const statusColor = item.usado ? 'red' : 'green';

        return (
            <View style={styles.listItem}>
                <Text>Matrícula: {item.matricula}</Text>
                <Text>Nome: {nomeAluno}</Text>
                <Text style={{color: statusColor, fontWeight: 'bold'}}>Status: {statusText}</Text>
                <Text style={styles.smallText}>Recebido às: {item.horaRecebimento || 'N/A'}</Text>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Painel ADM</Text>

            {/* Cadastro de Aluno */}
            <Text style={styles.subtitle}>Cadastrar Aluno</Text>
            <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
            <TextInput style={styles.input} placeholder="Matrícula" value={matricula} onChangeText={setMatricula} keyboardType="numeric"/>

            <TouchableOpacity style={styles.button} onPress={salvarAluno}>
                <Text style={styles.buttonText}>Cadastrar Aluno</Text>
            </TouchableOpacity>

            {/* Visualização e Reset */}
            <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetarTickets}>
                <Text style={styles.buttonText}>Resetar Tickets de HOJE</Text>
            </TouchableOpacity>

            <Text style={styles.subtitle}>Tickets Recebidos Hoje ({tickets.length})</Text>
            <FlatList
                data={tickets}
                keyExtractor={(item) => item.matricula + item.date}
                renderItem={renderTicketItem}
                style={{ maxHeight: 200, marginBottom: 20 }}
            />
            
            <Text style={styles.subtitle}>Alunos Cadastrados ({alunos.length})</Text>
            <FlatList
                data={alunos}
                keyExtractor={(item) => item.matricula}
                renderItem={({ item }) => <Text style={styles.listItem}>{item.matricula} - {item.nome}</Text>}
                style={{ maxHeight: 200 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    subtitle: { fontSize: 18, marginTop: 15, marginBottom: 10, fontWeight: "bold" },
    input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
    button: { backgroundColor: "#4a148c", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
    resetButton: { backgroundColor: "red" },
    buttonText: { color: "#fff", fontWeight: "bold" },
    listItem: { padding: 8, borderBottomWidth: 1, borderColor: "#eee" },
    smallText: { fontSize: 10, color: '#888' }
});
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdmScreen() {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [tickets, setTickets] = useState([]);


    carregarDados();
    
    const carregarDados = async () => {
        const alunosSalvos = await AsyncStorage.getItem("alunos");
        const ticketsSalvos = await AsyncStorage.getItem("tickets");
        if (alunosSalvos) setAlunos(JSON.parse(alunosSalvos));
        if (ticketsSalvos) setTickets(JSON.parse(ticketsSalvos));
    };
    
    const salvarAluno = async () => {
    if (!nome || !matricula) return Alert.alert("Preencha todos os campos!");
    const novo = { nome, matricula };
    const lista = [...alunos, novo];
    setAlunos(lista);
    await AsyncStorage.setItem("alunos", JSON.stringify(lista));
    setNome("");
    setMatricula("");
    Alert.alert("Aluno cadastrado!");
};

const resetarTickets = async () => {
    await AsyncStorage.removeItem("tickets");
    setTickets([]);
    Alert.alert("Tickets resetados!");
};

return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel ADM</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Matrícula" value={matricula} onChangeText={setMatricula} />

      <TouchableOpacity style={styles.button} onPress={salvarAluno}>
        <Text style={styles.buttonText}>Cadastrar Aluno</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={resetarTickets}>
        <Text style={styles.buttonText}>Resetar Tickets</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Alunos cadastrados</Text>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.matricula}
        renderItem={({ item }) => <Text>{item.matricula} - {item.nome}</Text>}
        />

      <Text style={styles.subtitle}>Tickets de hoje</Text>
      <FlatList
        data={tickets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.matricula} - {item.status}</Text>}
        />
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

  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#aaa", padding: 10, marginBottom: 10, borderRadius: 6 },
  button: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 6, marginBottom: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  subtitle: { fontSize: 18, marginTop: 15, fontWeight: "600" },

});


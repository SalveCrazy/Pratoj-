import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdmScreen() {
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [ticketsHoje, setTicketsHoje] = useState([]);

  // carregar dados ao abrir
  useEffect(() => {
    loadAlunos();
    loadTicketsHoje();
  }, []);

  const loadAlunos = async () => {
    const data = await AsyncStorage.getItem("alunos");
    if (data) setAlunos(JSON.parse(data));
  };

  const loadTicketsHoje = async () => {
    const hoje = new Date().toLocaleDateString();
    const data = await AsyncStorage.getItem("tickets");
    if (data) {
      const list = JSON.parse(data);
      const filtrados = list.filter(t => t.date === hoje);
      setTicketsHoje(filtrados);
    }
  };

  const handleCadastrar = async () => {
    if (!nome || !matricula) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    const novoAluno = { nome, matricula };
    const novaLista = [...alunos, novoAluno];
    setAlunos(novaLista);
    await AsyncStorage.setItem("alunos", JSON.stringify(novaLista));
    setNome("");
    setMatricula("");
    Alert.alert("Sucesso", "Aluno cadastrado!");
  };

  const handleReset = async () => {
    await AsyncStorage.removeItem("tickets");
    setTicketsHoje([]);
    Alert.alert("Sucesso", "Tickets resetados!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Painel do Administrador</Text>

      <Text style={styles.subtitle}>Cadastrar Aluno</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do aluno"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Alunos que pegaram ticket hoje</Text>
      <FlatList
        data={ticketsHoje}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.aluno} ({item.matricula})</Text>
        )}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "red", marginTop: 20 }]}
        onPress={handleReset}
      >
        <Text style={styles.buttonText}>Resetar Tickets do Dia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  subtitle: { fontSize: 18, marginTop: 20, marginBottom: 10, fontWeight: "bold" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 10 },
  button: { backgroundColor: "#4a148c", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  listItem: { padding: 8, borderBottomWidth: 1, borderColor: "#eee" },
});

// screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";


export default function LoginScreen({ navigation }) {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  // 🔑 Dados mockados (alunos + admin)
  const alunos = [
    { matricula: "A001", nome: "Maria" },
    { matricula: "A002", nome: "João" },
  ];

  const admin = { usuario: "admin", senha: "1234" };

  const handleLoginAluno = () => {
    const aluno = alunos.find((a) => a.matricula === matricula);
    if (aluno) {
      navigation.replace("HomeAluno", { aluno });
    } else {
      Alert.alert("Erro", "Matrícula inválida!");
    }
  };

  const handleLoginAdmin = () => {
    if (senha === admin.senha) {
      navigation.replace("HomeAdm");
    } else {
      Alert.alert("Erro", "Senha incorreta!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎟️ Ticket Refeição</Text>

      {/* Login Aluno */}
      <Text style={styles.label}>Login Aluno (Matrícula):</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginAluno}>
        <Text style={styles.buttonText}>Entrar como Aluno</Text>
      </TouchableOpacity>

      {/* Login Admin */}
      <Text style={styles.label}>Login Administrador (Senha):</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: "#c00" }]} onPress={handleLoginAdmin}>
        <Text style={styles.buttonText}>Entrar como ADM</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

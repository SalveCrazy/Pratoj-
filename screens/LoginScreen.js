import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function LoginScreen({ navigation }) {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    if (isAdmin) {
      // Login do administrador
      if (senha === "1234") {
        Alert.alert("Sucesso", "Bem-vindo, Administrador!");
        navigation.navigate("AdminHome"); // Tela do ADM
      } else {
        Alert.alert("Erro", "Senha incorreta!");
      }
    } else {
      // Login do aluno
      if (matricula.trim() !== "") {
      if (senha === "3212") {
        Alert.alert("Sucesso", `Bem-vindo aluno ${matricula}`);
        navigation.navigate("AlunoHome"); // Tela do Aluno
      } else {
        Alert.alert("Erro", "Digite sua matrícula!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {isAdmin ? (
        <TextInput
          style={styles.input}
          placeholder="Senha do administrador"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      ) : (
        <TextInput
          style={styles.input}
          placeholder="Matrícula do aluno"
          value={matricula}
          onChangeText={setMatricula}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsAdmin(!isAdmin)}>
        <Text style={styles.toggle}>
          {isAdmin ? "Entrar como Aluno" : "Entrar como Administrador"}
        </Text>
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
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  toggle: {
    marginTop: 15,
    textAlign: "center",
    color: "#007BFF",
    fontWeight: "600",
  },
});

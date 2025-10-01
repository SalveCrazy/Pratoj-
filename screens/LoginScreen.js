import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function LoginScreen({ navigation }) {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [logado, setLogado] = useState(false);

  const handleLogin = () => {
    // 🔑 Validação admin
    if (matricula === "admin" && senha === "admin123") {
      Alert.alert("Sucesso", "Bem-vindo administrador!");
      setLogado(true);
      navigation.navigate("AdmScreen"); // redireciona pra tela do admin
    } 
    // 🔑 Validação aluno
    else {
      if (!matricula.trim() || !senha.trim()) {
        Alert.alert("Erro", "Digite sua matrícula e senha!");
        return;
      }

      if (senha === "1234") { // senha padrão de aluno (pode trocar)
        Alert.alert("Sucesso", `Bem-vindo aluno ${matricula}`);
        setLogado(true);
        navigation.navigate("HomeAluno"); // redireciona pra tela do aluno
      } else {
        Alert.alert("Erro", "Senha incorreta!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

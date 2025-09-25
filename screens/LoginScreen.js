import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function LoginScreen({ navigation }) {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [logado, setLogado] = useState(false);

  const handleLogin = () => {
    if (isAdmin) {
      if (senha === "1234") {
        Alert.alert("Sucesso", "Bem-vindo, Administrador!");
        setLogado(true);
      } else {
        Alert.alert("Erro", "Senha incorreta!");
      }
    } else {
      if (matricula.trim() !== "") {
        Alert.alert("Sucesso", `Bem-vindo aluno ${matricula}`);
        setLogado(true);
      } else {
        Alert.alert("Erro", "Digite sua matrícula!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem-vindo</Text>

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

      {/* Botões só aparecem se logado */}
      {logado && !isAdmin && (
        <TouchableOpacity
          style={[styles.button, { marginTop: 20, backgroundColor: "#9c51bdff" }]}
          onPress={() => navigation.navigate("Ticket", { matricula })}
        >
          <Text style={styles.buttonText}>Ir para Receber Ticket</Text>
        </TouchableOpacity>
      )}

      {logado && isAdmin && (
        <>
          <TouchableOpacity
            style={[styles.button, { marginTop: 20, backgroundColor: "#4CAF50" }]}
            onPress={() => navigation.navigate("Adm")}
          >
            <Text style={styles.buttonText}>Ir para Painel ADM</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { marginTop: 20, backgroundColor: "#3f51b5" }]}
            onPress={() => navigation.navigate("Validacao")}
          >
            <Text style={styles.buttonText}>Ir para Validação de Tickets</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#ccc", marginBottom: 12 },
  button: { backgroundColor: "#7ccf7fff", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  toggle: { marginTop: 15, textAlign: "center", color: "#007BFF", fontWeight: "600" },
});

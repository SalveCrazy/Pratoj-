// screens/LoginScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [emailLogin, setEmailLogin] = useState("");
  const [senhaLogin, setSenhaLogin] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [senhaRegister, setSenhaRegister] = useState("");
  const [users, setUsers] = useState([]);

  // 🔑 Admin fixo
  const admin = { email: "admin@escola.com", senha: "1234" };

  // Carregar usuários do AsyncStorage
  useEffect(() => {
    const loadUsers = async () => {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    };
    loadUsers();
  }, []);

  const saveUsers = async (newUsers) => {
    setUsers(newUsers);
    await AsyncStorage.setItem("users", JSON.stringify(newUsers));
  };

  // Cadastro
  const handleRegister = () => {
    if (!emailRegister || !senhaRegister) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    const exists = users.find((u) => u.email === emailRegister);
    if (exists) {
      Alert.alert("Erro", "Usuário já cadastrado!");
      return;
    }
    const newUser = { email: emailRegister, senha: senhaRegister };
    const newUsers = [...users, newUser];
    saveUsers(newUsers);
    Alert.alert("Sucesso", "Cadastro realizado! Agora faça login.");
    setEmailRegister("");
    setSenhaRegister("");
  };

  // Login
  const handleLogin = () => {
    // Se for admin
    if (emailLogin === admin.email && senhaLogin === admin.senha) {
      navigation.replace("HomeAdm");
      return;
    }

    // Senão, procura aluno no AsyncStorage
    const user = users.find(
      (u) => u.email === emailLogin && u.senha === senhaLogin
    );
    if (user) {
      navigation.replace("HomeAluno", { aluno: { email: emailLogin } });
    } else {
      Alert.alert("Erro", "E-mail ou senha inválidos!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎟️ Ticket Refeição</Text>

      {/* LOGIN */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={emailLogin}
          onChangeText={setEmailLogin}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senhaLogin}
          onChangeText={setSenhaLogin}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      {/* CADASTRO */}
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Cadastrar novo aluno</Text>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={emailRegister}
          onChangeText={setEmailRegister}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senhaRegister}
          onChangeText={setSenhaRegister}
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: "#28a745" }]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#6a1b9a",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

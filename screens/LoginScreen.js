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
  const [modo, setModo] = useState("aluno"); // aluno, admin ou cadastro
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [users, setUsers] = useState([]);

  // 🔑 Admin fixo
  const admin = { email: "admin@escola.com", senha: "1234" };

  // Carregar usuários do AsyncStorage
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem("users");
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }
      } catch (error) {
        Alert.alert("Erro", "Falha ao carregar usuários!");
      }
    };
    loadUsers();
  }, []);

  const saveUsers = async (newUsers) => {
    try {
      setUsers(newUsers);
      await AsyncStorage.setItem("users", JSON.stringify(newUsers));
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar usuário!");
    }
  };

  // Cadastro de aluno
  const handleRegister = () => {
    if (!matricula || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    const exists = users.find((u) => u.matricula === matricula);
    if (exists) {
      Alert.alert("Erro", "Matrícula já cadastrada!");
      return;
    }
    const newUser = { matricula, senha };
    const newUsers = [...users, newUser];
    saveUsers(newUsers);
    Alert.alert("Sucesso", "Cadastro realizado! Agora faça login.");
    setMatricula("");
    setSenha("");
    setModo("aluno");
  };

  // Login
  const handleLogin = () => {
    if (modo === "admin") {
      if (!email || !senha) {
        Alert.alert("Erro", "Preencha todos os campos!");
        return;
      }
      if (email === admin.email && senha === admin.senha) {
        navigation.replace("HomeAdm");
      } else {
        Alert.alert("Erro", "E-mail ou senha do admin inválidos!");
      }
    } else {
      if (!matricula || !senha) {
        Alert.alert("Erro", "Preencha todos os campos!");
        return;
      }
      const user = users.find((u) => u.matricula === matricula && u.senha === senha);
      if (user) {
        navigation.replace("HomeAluno", { aluno: { matricula } });
      } else {
        Alert.alert("Erro", "Matrícula ou senha inválidos!");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎟️ Ticket Refeição</Text>

      <View style={styles.box}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, modo === "aluno" && styles.toggleActive]}
            onPress={() => setModo("aluno")}
          >
            <Text style={styles.toggleText}>Aluno</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, modo === "admin" && styles.toggleActive]}
            onPress={() => setModo("admin")}
          >
            <Text style={styles.toggleText}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, modo === "cadastro" && styles.toggleActive]}
            onPress={() => setModo("cadastro")}
          >
            <Text style={styles.toggleText}>Cadastro</Text>
          </TouchableOpacity>
        </View>

        {modo === "admin" ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="E-mail do Admin"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar como Admin</Text>
            </TouchableOpacity>
          </>
        ) : modo === "cadastro" ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Matrícula (ex: 123456)"
              value={matricula}
              onChangeText={setMatricula}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: "#28a745" }]} onPress={handleRegister}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Matrícula (ex: 123456)"
              value={matricula}
              onChangeText={setMatricula}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar como Aluno</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "#007AFF",
  },
  toggleText: {
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
